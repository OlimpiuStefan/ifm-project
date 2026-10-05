// Rolling 95th percentile per device: the value a reading stays under 95%
// of the time, over that device's last WINDOW readings. Dashboards show it
// because a single spike should not raise an alarm on its own.

export const WINDOW = 200;

// For every reading, the p95 over the last `window` readings of the
//    same device.
export function rollingP95(readings, window = WINDOW) {
  const recent = new Map();
  const out = [];
  for (const r of readings) {
    const values = recent.get(r.deviceId) ?? [];
    values.push(Number(r.value));
    if (values.length > window) values.shift();
    recent.set(r.deviceId, values);

    const sorted = [...values].sort((a, b) => a - b);
    out.push({ deviceId: r.deviceId, at: r.at, p95: sorted[Math.floor((sorted.length - 1) * 0.95)] });
  }
  return out;
}

// A day of history for twelve devices, generated so the page has something
// heavy to chew on without a server.
export function syntheticHistory(count = 50_000) {
  const ids = ['VS-0071', 'PT-1042', 'PS-0310', 'MM-0002', 'LS-0120', 'SM-0415',
               'TA-0233', 'PN-0877', 'VS-0072', 'PT-1043', 'FL-0909', 'TA-0234'];
  const start = Date.parse('2026-10-05T06:00:00Z');
  return Array.from({ length: count }, (_, i) => ({
    deviceId: ids[i % ids.length],
    value: String(((i * 7919) % 1000) / 10),
    at: new Date(start + i * 1000).toISOString(),
  }));
}
