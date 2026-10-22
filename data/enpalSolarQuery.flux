from(bucket: "solar")
  |> range(start: v.timeRangeStart, stop: v.timeRangeStop)
  |> filter(fn: (r) => r["_measurement"] == "battery" or r["_measurement"] == "inverter" or r["_measurement"] == "iot" or r["_measurement"] == "powerSensor" or r["_measurement"] == "system" or r["_measurement"] == "wallbox")
