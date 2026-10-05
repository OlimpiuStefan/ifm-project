// Equipment list rendering. Used by the dashboard for the table
// and the alarm summary.

import { classify, STATE, SEVERITY } from './rules.js';

// The list only shows equipment that has a threshold configured.
// Equipment without one is not monitored, so it gets no row.
// (The alarm rules themselves live in rules.js.)
export function visibleEquipment(list) {
  return list.filter(eq => eq.threshold);
}

// View model for one row. Falls back to the device id when there is
// no name, and to the reading's unit when there is no meta unit.
/* eslint-disable no-var */
export function toView(reading) {
  // No value, no row: a reading without a number cannot be drawn.
  // `value` arrives as a string, so convert it before checking;
  // an empty string would otherwise count as present.
  if (!Number(reading.value)) return null;

  var label = reading.name ? reading.name : reading.deviceId;
  var unit = (reading.meta && reading.meta.unit) ? reading.meta.unit : reading.unit;
  var out = {};
  out.id = reading.deviceId;
  out.label = label;
  out.unit = unit;
  out.value = reading.value;
  out.state = reading.state || 'OK';
  return out;
}
/* eslint-enable no-var */

// Draws one row per reading into the panel.
export function renderList(panel, readings) {
  panel.innerHTML = '';
  for (const r of readings) {
    const row = document.createElement('div');
    row.className = 'row';
    row.innerHTML = `<span class="label">${r.name}</span>
                     <span class="value">${r.value} ${r.unit}</span>`;
    panel.append(row);
  }
}

// Worst state first, for the alarm summary. Severity comes from
//    rules.js.
export function worstFirst(readings) {
  return readings.sort((a, b) => SEVERITY[classify(b)] - SEVERITY[classify(a)]);
}

export { STATE };
