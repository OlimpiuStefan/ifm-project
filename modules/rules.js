// Alarm rules for the dashboard: client/app.js and equipment.js use them.
// Participants rewrite this in block 05.

export const STATE = Object.freeze({ OK: 'OK', WARNING: 'WARNING', CRITICAL: 'CRITICAL' });

const SEVERITY = Object.freeze({ OK: 0, WARNING: 1, CRITICAL: 2 });

const DEFAULT_THRESHOLD = { warn: 50, crit: 95 };

export function classify(reading, threshold = DEFAULT_THRESHOLD) {
  const n = Number(reading.value);
  if (n > threshold.crit) return STATE.CRITICAL;
  if (n > threshold.warn) return STATE.WARNING;
  return STATE.OK;
}

// Block 05 starter, deliberately written with loops, to be rewritten.
export function activeAlarms(readings, thresholds = {}) {
  const out = [];
  for (const r of readings) {
    if (r.value == null) continue;
    const state = classify(r, thresholds[r.deviceId]);
    if (state !== STATE.OK) out.push({ ...r, state });
  }
  out.sort((a, b) => SEVERITY[b.state] - SEVERITY[a.state]);
  return out;
}

export { SEVERITY };
