const policy = {
  number: 'P001', // a plain value
  holder: { name: 'John Doe', city: 'Boston' }, // an object inside an object
  claims: [
    // a list of objects
    { id: 'C1', amount: 250, settled: true },
    { id: 'C2', amount: 900, settled: false },
  ],
  describe() {
    return `${this.number} belongs to ${this.holder.name}`;
  },
};

console.log(policy.holder.city);
console.log(policy.claims[1].amount);
console.log(policy.describe());

const grid = {};
grid[1] = 'one';
grid['1'] = 'one, again';
grid[{ x: 1 }] = 'an object';
console.log(grid);

console.log(Object.keys(grid));

const cfg = { nested: { x: 0 } };
Object.freeze(cfg);
cfg.nested.x = 1;
console.log(cfg.nested.x);
cfg.nested = {};

const a1 = { v: 1 };
const b1 = a1;
b1.v = 99;
console.log(a1.v);

function flag(reading) {
  reading.state = 'CRITICAL';
  return reading;
}

const r1 = { deviceId: 'PT-1042', value: 234 };
const flagged = flag(r1);
console.log(r1.state);
console.log(flagged === r1);

function flagCopy(reading) {
  return { ...reading, state: 'CRITICAL' };
}

const original = { deviceId: 'PT-1042', value: 234 };
const r2 = flagCopy(original);

console.log(r2.state);
console.log(original.state);

sensor = { deviceId: 'PT-1042', limits: { warn: 50, crit: 95 } };
// copy = { ...sensor };
// copy.deviceId = 'PT-1043';
// copy.limits.warn = 60;
// console.log(sensor.deviceId);
// console.log(sensor.limits.warn);

const safeCopy = { ...sensor, limits: { ...sensor.limits } };
console.log(sensor.limits.crit, safeCopy.limits.crit);

const thresholds = { warn: 50, crit: 95 };
const reading = { deviceId: 'PT-1042', value: 97.4, limits: thresholds };

function withTighterLimit(r) {
  return { ...r, checked: true, limits: { ...r.limits, crit: 90 } };
}

const checked = withTighterLimit(reading);
console.log(reading.checked, thresholds.crit); // → true 90
console.log(checked.checked, checked.limits.crit); // → true 90
