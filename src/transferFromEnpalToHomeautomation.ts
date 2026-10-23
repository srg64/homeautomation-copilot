import "dotenv/config";
import { InfluxDB, Point } from "@influxdata/influxdb-client";
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { isoDateToUnixSeconds, measurements, schema, unixSecondsToIsoDate } from "./constants.js";
export { isoDateToUnixSeconds, measurements, schema, unixSecondsToIsoDate };

type QueryRecord = Record<string, unknown>;
type QueryRow = {
    record: QueryRecord;
    valueType: string;
};

function requireEnv(name: string): string {
    const value = process.env[name];
    if (!value) {
        throw new Error(`Missing required environment variable: ${name}`);
    }
    console.log(`Environment variable ${name}=${value}`);
    return value;
}

export const sourceClient = new InfluxDB({
    url: requireEnv("SOURCE_URL"),
    token: requireEnv("SOURCE_TOKEN")
});
export const targetClient = new InfluxDB({
    url: requireEnv("TARGET_URL"),
    token: requireEnv("TARGET_TOKEN")
});
export const queryApi = sourceClient.getQueryApi(
    requireEnv("SOURCE_ORG")
);
export const writeApi = targetClient.getWriteApi(
    requireEnv("TARGET_ORG"),
    requireEnv("TARGET_BUCKET")
);

function createPoint(record: QueryRecord, valueType: string): Point {
    const measurement = record["_measurement"];
    const field = record["_field"];
    const timestamp = record["_time"];
    const value = record["_value"];
    if (
        typeof measurement !== "string" ||
        typeof field !== "string" ||
        (typeof timestamp !== "string" && !(timestamp instanceof Date))
    ) {
        throw new Error("Source query returned a record without measurement, field, or timestamp.");
    }

    const point = new Point(measurement).timestamp(timestamp);
    for (const [key, tagValue] of Object.entries(record)) {
        if (!key.startsWith("_") && key !== "result" && key !== "table" && tagValue != null) {
            point.tag(key, String(tagValue));
        }
    }

    switch (typeof value) {
        case "boolean":
            point.booleanField(field, value);
            break;
        case "number":
            if (valueType === "long") {
                point.intField(field, value);
            } else if (valueType === "unsignedLong") {
                point.uintField(field, value);
            } else {
                point.floatField(field, value);
            }
            break;
        case "string":
            point.stringField(field, value);
            break;
        case "bigint":
            if (valueType === "unsignedLong") {
                point.uintField(field, value);
            } else {
                point.intField(field, value);
            }
            break;
        default:
            throw new Error(`Unsupported InfluxDB field value for "${field}".`);
    }
    return point;
}

function csvCell(value: unknown): string {
    const text = value == null ? "" : value instanceof Date ? value.toISOString() : String(value);
    return `"${text.replace(/"/g, '""')}"`;
}

function recordsToCsv(rows: QueryRow[]): string {
    const columns = [...new Set(rows.flatMap(({ record }) => Object.keys(record)))];
    const lines = [
        columns.map(csvCell).join(","),
        ...rows.map(({ record }) => columns.map((column) => csvCell(record[column])).join(","))
    ];
    return `${lines.join("\r\n")}\r\n`;
}

/**
 * Copies today's source data in hourly batches, saves each batch as CSV in SOURCE_PATH,
 * and writes the corresponding points to the configured target bucket.
 * Hour boundaries use the local timezone of the running process.
 */
export async function copyTodayHourlyData(): Promise<number> {
    const sourceBucket = requireEnv("SOURCE_BUCKET");
    const sourcePath = requireEnv("SOURCE_PATH");
    const targetOrg = requireEnv("TARGET_ORG");
    const targetBucket = requireEnv("TARGET_BUCKET");
    console.log(`Environment variables: SOURCE_BUCKET=${sourceBucket}, SOURCE_PATH=${sourcePath}, TARGET_ORG=${targetOrg}, TARGET_BUCKET=${targetBucket}`);
    const now = new Date();
    const hourStart = new Date(now);
    console.log(`Current time: ${now.toISOString()}`);
    console.log(`Copying data from source bucket "${sourceBucket}" to target bucket "${targetBucket}" in hourly batches...`);
    hourStart.setHours(0, 0, 0, 0);
    await mkdir(sourcePath, { recursive: true });

    const hourlyWriteApi = targetClient.getWriteApi(targetOrg, targetBucket);
    console.log(`hourlyWriteApi created for targetOrg=${targetOrg}, targetBucket=${targetBucket}`);
    let copiedRecords = 0;
    try {
        while (hourStart < now) {
            const hourStop = new Date(hourStart);
            hourStop.setTime(hourStart.getTime() + 60 * 60 * 1000);
            if (hourStop > now) {
                hourStop.setTime(now.getTime());
            }

            const query = `from(bucket: ${JSON.stringify(sourceBucket)})
    |> range(start: time(v: "${hourStart.toISOString()}"), stop: time(v: "${hourStop.toISOString()}"))`;
            const rows: QueryRow[] = [];
            for await (const { values, tableMeta } of queryApi.iterateRows(query)) {
                rows.push({
                    record: tableMeta.toObject(values),
                    valueType: tableMeta.column("_value").dataType
                });
            }

            if (rows.length > 0) {
                const firstRecordTime = rows.reduce((first, { record }) => {
                    const rawTime = record["_time"];
                    const time = rawTime instanceof Date
                        ? rawTime
                        : new Date(String(rawTime));
                    if (!Number.isFinite(time.getTime())) {
                        throw new Error("Source query returned an invalid record timestamp.");
                    }
                    return time < first ? time : first;
                }, new Date(String(rows[0]?.record["_time"])));
                const filename = `${firstRecordTime.toISOString().replace(/:/g, "-")}.csv`;
                await writeFile(join(sourcePath, filename), recordsToCsv(rows), "utf8");

                for (const { record, valueType } of rows) {
                    hourlyWriteApi.writePoint(createPoint(record, valueType));
                }
                copiedRecords += rows.length;
            }

            hourStart.setTime(hourStop.getTime());
        }
    } finally {
        await hourlyWriteApi.close();
    }
    return copiedRecords;
}

export async function transferData() {
    await copyTodayHourlyData()
        .then((copiedRecords) => {
            console.log(`Copied ${copiedRecords} records from source to target.`);
        })
        .catch((error) => {
            console.error("Error occurred while transferring data:", error);
        });
}

console.log("App initialized.");

// Run the transfer
transferData();
