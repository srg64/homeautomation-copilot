// Betriebserlaubnis PV Anlage:
// ISO Date:        2024-08-23T00:00:00
// Unix Timestamp:  1724364000
// JS Timestamp:    1724364000000

function getUnixSeconds(sIsoDate) {
    let iUnixSeconds = 0;
    if (sIsoDate) {
      iUnixSeconds = Math.floor(Date.parse(sIsoDate) / 1000);
    } else {
      iUnixSeconds = Math.floor(Date.now() / 1000);
    }
    return iUnixSeconds;
  }
  
  const sleepNow = (delay) => new Promise((resolve) => setTimeout(resolve, delay));
  
  const iPvStart = Date.parse("2024-08-23T00:00:00");
  let iDaySecs = 60 * 60 * 24;
  
  let iLastQueryStop;
  let iQueryStart = iLastQueryStop ? iLastQueryStop : iPvStart;
  let sFluxQuery = "";
  
  // DebugCode: Must be removed
  iQueryStart = getUnixSeconds() - 60 * 60 * 24 * 10; // 10 Tage zurück
  iDaySecs = 2;
  
  async function replicationLoop() {
  
    for (let iStart = iQueryStart; iStart < getUnixSeconds(); iStart += iDaySecs) {
      sFluxQuery = 'fryom(bucket: "solar") |> range(start: ' + (iStart + 1) + ', stop: ' + (iStart + iDaySecs) + ')';
      node.send({ query: sFluxQuery });
      // // Sleep for 10 min
      // await sleepNow(1000 * 60 * 10)
      // Sleep for 15 minc
      await sleepNow(1000 * 60 * 15);
    }
  }
  replicationLoop();