// ═══════════════════════════════════════════════════════════════════
//  The data service. Participants extend this across all three days.
//  Run:  npm run dev:api   →  http://localhost:3000
//  No framework: node:http is enough to see every moving part.
//
//  Routes:
//     /api/equipment             the public device list
//     /api/readings[?since=]     normalised readings
//     /api/devices/:id/reading   latest reading for one device
//     /api/search?q=             find a device by name
//     /health                    liveness
//  Settings come from config.js, log lines from log.js.
// ═══════════════════════════════════════════════════════════════════
import { createServer } from 'node:http';
import { DEVICES, tick, since, latestFor } from './store.js';
import { normalize, normalizeAll } from './normalize.js';
import { config } from './config.js';
import { log } from './log.js';

setInterval(() => tick(), 1000).unref();
tick();

// ─── Search. `evaluate` stands in for a database: it obeys the clause. ───
function searchDevices(query) {
  const clause = `name = '${query}' AND secret = false`;
  return DEVICES.filter((d) => evaluate(clause, d));
}

const unquote = (t) => t.trim().replace(/^'|'$/g, '');
function evaluate(clause, d) {
  clause = clause.split('--')[0];
  return clause.split(' OR ').some((part) =>
    part.split(' AND ').every((cond) => {
      const [lhs, rhs] = cond.split('=');
      if (rhs === undefined) return false;
      const left = lhs.trim(), right = unquote(rhs);
      if (left === 'name')   return d.name === right;
      if (left === 'secret') return String(Boolean(d.secret)) === right;
      return unquote(left) === right;
    }));
}

// Every route answers through json(): status code and body in,
//    serialised response out. Routes never write to `res`
//    themselves.
const json = (res, code, body) => {
  res.writeHead(code, {
    'content-type': 'application/json',
    // Polled endpoints. Without this, a proxy may serve a stale reading.
    'cache-control': 'no-store',
  });
  res.end(JSON.stringify(body));
};

const publicDevice = (id) => DEVICES.find((d) => d.deviceId === id && !d.secret);
const secretIds = new Set(DEVICES.filter((d) => d.secret).map((d) => d.deviceId));

const routes = {
  '/api/equipment': (url, res) =>
    json(res, 200, DEVICES.filter((d) => !d.secret)
      .map(({ deviceId, name, unit }) => ({ deviceId, name, unit }))),

  '/api/readings': (url, res) =>
    json(res, 200, normalizeAll(since(url.searchParams.get('since')))
      .filter((r) => !secretIds.has(r.deviceId))),

  '/api/search': (url, res) =>
    json(res, 200, searchDevices(url.searchParams.get('q') ?? '')),

  '/health': (url, res) => json(res, 200, { status: 'UP' }),
};

// One device at a time. tools/load-devices.js loads all twelve through this.
const DEVICE_READING = /^\/api\/devices\/([A-Z]{2}-\d{4})\/reading$/;

function deviceReading(id, res) {
  const device = publicDevice(id);
  if (!device) return json(res, 404, { error: 'unknown device' });
  // A dead sensor is an operational failure: answer it, do not crash on it.
  if (device.dead) return json(res, 503, { error: 'sensor not responding' });
  return json(res, 200, normalize(latestFor(id)));
}

function route(url, res) {
  const match = DEVICE_READING.exec(url.pathname);
  if (match) return deviceReading(match[1], res);
  const handler = routes[url.pathname];
  if (!handler) return json(res, 404, { error: 'not found' });
  return handler(url, res);
}
const server = createServer((req, res) => {
  if (!URL.canParse(req.url, 'http://localhost')) return json(res, 400, { error: 'bad request' });
  const url = new URL(req.url, 'http://localhost');
  log(`${req.method} ${url.pathname}`);

  // Promise.resolve() so this keeps catching when a handler becomes async.
  // A bare try/catch only sees synchronous throws.
  Promise.resolve()
    .then(() => route(url, res))
    .catch((err) => {
      // The detail stays in the log. The client gets a shape, not a stack
      // trace: an error message is an information leak (block 16).
      log(`request failed ${url.pathname}: ${err.stack}`);
      if (!res.headersSent) json(res, 500, { error: 'internal error' });
    });
});

server.listen(config.port, '127.0.0.1', () =>
  log(`service listening on http://localhost:${config.port}`));

// "Let it crash" (block 14) only works if the process can also stop cleanly
// when it is ASKED to: drain what is in flight, then exit.
for (const sig of ['SIGTERM', 'SIGINT']) {
  process.on(sig, () => {
    log(`${sig} received, draining`);
    server.close(() => process.exit(0));
    setTimeout(() => process.exit(1), 5000).unref();
  });
}
