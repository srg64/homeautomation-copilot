# homeautomation

Sources related to homeautomation

Ziele für Visualisierung:
Ertrag durch E-Auto
Ertrag durch Einspeisung
Ertrag durch günstigeren Tarif
Ertrag durch Eigenverbrauch

Preis €/kWh für Einspeisung
Preis €/kWh für Bezug von Enpal
Preis für Bezug von konventionellem Anbieter (AVU)

Preis für verbrauchtes Benzin, dass nicht verfahren wurde, weil kWh verfahren wurden.
Preis für verbrauchte kWh, die nicht eingespeist wurden, weil sie verfahren wurden.

Es muss ein Faktor bestimmt werden für kWh/100km zu l/100km 

Einfluss von Wirkungsgraden?

## Entwurf für nächste Version

Eine Klasse für einen Datenpunkt:
Enthält alle Infos für einen Datenpunkt.
Getter/Setter für alle Formate:
- CSV
- Result

                // Example for a result
                // {
                //     "result": "_result",
                //     "table": 0,
                //     "_start": "1970-01-01T00:00:00Z",
                //     "_stop": "2025-03-02T00:09:44.472288172Z",
                //     "_time": "2025-02-25T20:37:57.980531Z",
                //     "_value": 24,
                //     "_field": "value",
                //     "_measurement": "temperature",
                //     "sensor_id": "TLM010"
                // },
