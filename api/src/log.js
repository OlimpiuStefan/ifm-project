// One timestamped line per message, to stdout.
//    log(`GET /api/readings`)
//    2026-10-07T09:00:00.000Z GET /api/readings
export const log = (message) =>
  console.log(`${new Date().toISOString()} ${message}`);
