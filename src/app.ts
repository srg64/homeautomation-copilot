import "dotenv/config";
import { InfluxDB } from "@influxdata/influxdb-client";
import { isoDateToUnixSeconds, measurements, schema, unixSecondsToIsoDate } from "./constants.js";
export { isoDateToUnixSeconds, measurements, schema, unixSecondsToIsoDate };

function requireEnv(name: string): string {
    const value = process.env[name];
    if (!value) {
        throw new Error(`Missing required environment variable: ${name}`);
    }
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

console.log("App initialized.");
