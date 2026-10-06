const STATE = Object.freeze({
  OK: 'OK',
  WARNING: 'WARNING',
  CRITICAL: 'CRITICAL',
});

function toViewShipped(reading) {
  if (reading.value == null) return null;

  var label = reading.name ? reading.name : reading.deviceId;

  var out = {};
  out.id = reading.deviceId;
  out.label = label;
  out.unit = reading.unit;
  out.value = reading.value;
  out.state = reading.state || 'OK';

  return out;
}

function toViewClean(reading) {
  if (reading.value == null) return null;
  const { deviceId, name, value, unit, state } = reading;
  return {
    id: deviceId,
    label: name || deviceId,
    unit,
    value,
    state: state || STATE.OK,
  };
}

function createGauge({ min = 0, max = 100, unit = 'C' } = {}) {
  return {
    min,
    max,
    unit,
  };
}
