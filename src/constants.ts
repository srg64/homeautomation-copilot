/**
 * List of all measurements that are used by the enpal influxdb
 */
export const measurements = [
    "battery",
    "inverter",
    "iot",
    "powerSensor",
    "system",
    "wallbox"
] as const;

/**
 * Schema of all measurements that are used by the enpal influxdb.
 * 
 * Central information for the schema is the ISO date of the 
 * commissioning of the PV system, which is used to determine 
 * the start of the lifetime energy measurements:
 * 
 * Betriebserlaubnis PV Anlage:
 * ISO Date:        2024-08-23T00:00:00
 * Unix Timestamp:  1724364000
 * JS Timestamp:    1724364000000
 */
export const schema = {
    battery: [
        "Battery.ChargeLevel.Max",
        "Battery.ChargeLevel.MinOnGrid",
        "Battery.ChargeLevel.Min",
        "Voltage.Battery",
        "Temperature.Battery",
        "Power.Battery.Discharge.Max",
        "Power.Battery.Charge.Max",
        "Power.Battery.Charge.Discharge.Set",
        "Power.Battery.Charge.Discharge",
        "Mode.Forcible.Timeout",
        "Mode.Forcible.Charge.Discharge",
        "Mode.Battery.Safety.Charge",
        "Energy.Battery.Discharge.Day",
        "Energy.Battery.Charge.Load",
        "Energy.Battery.Charge.Level.Absolute",
        "Energy.Battery.Charge.Level",
        "Energy.Battery.Charge.Day",
        "Energy.Battery.Ah",
        "Current.Battery",
        "Battery.SOH"
    ],
    inverter: [
        "Battery.ChargeLevel.Max",
        "Battery.ChargeLevel.Min",
        "Battery.ChargeLevel.MinOnGrid",
        "Battery.SOH",
        "Current.Battery",
        "Current.String.1",
        "Current.String.2",
        "Energy.Battery.Ah",
        "Energy.Battery.Charge.Day",
        "Energy.Battery.Charge.Level",
        "Energy.Battery.Charge.Level.Absolute",
        "Energy.Battery.Charge.Lifetime",
        "Energy.Battery.Charge.Load",
        "Energy.Battery.Discharge.Day",
        "Energy.Battery.Discharge.Lifetime",
        "Energy.Consumption.Total.Day",
        "Energy.Grid.Export.Day",
        "Energy.Grid.Export.Lifetime",
        "Energy.Grid.Import.Day",
        "Energy.Grid.Import.Lifetime",
        "Energy.Production.Total.Day",
        "Energy.Production.Total.Lifetime",
        "Frequency.Grid",
        "Inverter.System.State",
        "Meter.Connect.State",
        "Meter.Enable.Disable",
        "Meter2.AC.Phase.A",
        "Meter2.AC.Phase.B",
        "Meter2.AC.Phase.C",
        "Meter2.AC.Total",
        "Meter2.Connect.State",
        "Meter2.Enable.Disable",
        "Mode.Battery.Safety.Charge",
        "Mode.Forcible.Charge.Discharge",
        "Mode.Forcible.Timeout",
        "Power.AC.Phase.A",
        "Power.AC.Phase.B",
        "Power.AC.Phase.C",
        "Power.Battery.Charge.Discharge",
        "Power.Battery.Charge.Discharge.Set",
        "Power.Battery.Charge.Max",
        "Power.Battery.Discharge.Max",
        "Power.DC.String.1",
        "Power.DC.String.2",
        "Power.DC.Total",
        "Power.Factor",
        "Power.Grid.Export",
        "Power.Grid.Maximum.Feed",
        "Power.House.Total",
        "Power.Reactive",
        "State.ErrorCodes.1",
        "State.ErrorCodes.10",
        "State.ErrorCodes.11",
        "State.ErrorCodes.2",
        "State.ErrorCodes.6",
        "State.ErrorCodes.9",
        "Temperature.Battery",
        "Voltage.Battery",
        "Voltage.Phase.A",
        "Voltage.Phase.B",
        "Voltage.Phase.C",
        "Voltage.String.1",
        "Voltage.String.2"
    ],
    iot: [
        "Cpu.Load",
        "IoT.Data.Consumption.Lan.Down.Month",
        "IoT.Data.Consumption.Lan.Up.Month",
        "IoT.Data.Consumption.Lte.Down.Month",
        "IoT.Data.Consumption.Lte.Up.Month",
        "LTE.Predictor.Result.Passed",
        "LTE.Quality",
        "LTE.RSRP",
        "LTE.RSRQ",
        "LTE.RSSI",
        "LTE.SNR",
        "Memory.Usage"
    ],
    powerSensor: [
        "Meter.Connect.State",
        "Meter.Enable.Disable",
        "Meter2.AC.Phase.A",
        "Meter2.AC.Phase.B",
        "Meter2.AC.Phase.C",
        "Meter2.AC.Total",
        "Meter2.Connect.State",
        "Meter2.Enable.Disable",
        "Power.AC.Phase.A",
        "Power.AC.Phase.B",
        "Power.AC.Phase.C",
        "Power.Factor",
        "Power.Reactive"
    ],
    system: [
        "Energy.Consumption.Total.Day",
        "Energy.Consumption.Total.Lifetime",
        "Energy.External.Total.In.Day",
        "Energy.External.Total.Out.Day",
        "Energy.Production.Total.Day",
        "Energy.Storage.Level",
        "Energy.Storage.Total.In.Day",
        "Energy.Storage.Total.Out.Day",
        "Percent.Storage.Level",
        "Power.Consumption.Total",
        "Power.External.Total",
        "Power.Production.Total",
        "Power.Storage.Total",
        "measureId"
    ],
    wallbox: [
        "Count.Wallbox.Connector.1.Phases.Charging",
        "Current.Wallbox.Connector.1.Phase.A",
        "Current.Wallbox.Connector.1.Phase.B",
        "Current.Wallbox.Connector.1.Phase.C",
        "Energy.Wallbox.Connector.1.Charged.Total",
        "Power.Wallbox.Connector.0.Charging.Requested",
        "Power.Wallbox.Connector.1.Charging",
        "Power.Wallbox.Connector.1.Charging.Requested",
        "Power.Wallbox.Connector.1.Offered",
        "State.Wallbox.Connector.1.Charge",
        "Status.Wallbox.Connected",
        "Voltage.Wallbox.Connector.1.Phase.A",
        "Voltage.Wallbox.Connector.1.Phase.B",
        "Voltage.Wallbox.Connector.1.Phase.C"
    ]
} as const;
