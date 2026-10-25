# homeautomation-copilot

Reimplementation of homeautomation with github copilot

## Init typescript based node project

``` terminal
# In base directory of project:
code .

# Continue in terminal of vscode:
node -v 
npm -v
npm init -y
npm install --save-dev typescript @types/node tsx
npx tsc --init

# Run the application during development: 
npm run dev

# Run the application for production: 
npm run build
npm start
```

## Github Copilot mit VS Studio

Next to VS search click on copilot resp. toggle chat icon.

## Copy today's InfluxDB data

`copyTodayHourlyData` queries the source bucket from local midnight through the current time,
one hour at a time. Non-empty hourly results are written as CSV files to `SOURCE_PATH` and
copied to the configured target bucket. CSV filenames use the ISO timestamp of the earliest
record in that hour; colons are replaced with hyphens so the filenames are valid on Windows.
Empty hours do not produce a file. The function returns the number of records copied.

After building, it can be called from another ESM script:

```js
import { copyTodayHourlyData } from "./dist/transferFromEnpalToHomeautomation.js";

const copiedRecords = await copyTodayHourlyData();
console.log(`Copied ${copiedRecords} records.`);
```

## Convert old InfluxDB input files

The converter reads `influx.data.*` and `queryResult.json` files from `data` and writes
each record as one JSON line to a file with the same name in `data/work`.

```sh
npm run convert:dev
npm run build
npm run convert
```

Optional source and destination directories can be passed to the development command:

```sh
npm run convert:dev -- <source-directory> <destination-directory>
```
