const ids = ['PT-1042', 'VS-0071', 'PT-1043'];
ids.push('PT-1044');

for (const id of ids) {
  console.log('of', id);
}
for (const key in ids) {
  console.log('in', key);
}

const r = { deviceId: 'PT-1042', value: 234 };
const copy = { ...r, state: 'CRITICAL' };
const defaults = { state: 'OK', value: 23 };
console.log({ ...defaults, ...r });

const person = { name: 'Alice', age: 25, 'favorite color': 'blue' };
console.log(person.name); // → Alice
console.log(person['name']); // → Alice
const whichOne = 'age';
console.log(person[whichOne]); // → 25
console.log(person['favorite color']);

const numbers = [1, 2, 3, 4, 5, 6];
const isEven = (num) => num % 2 === 0;
console.log(numbers.map((n) => n * 2));
console.log(numbers.filter(isEven));
console.log(numbers.reduce((sum, n) => sum + n, 0));

console.log(
  numbers
    .filter(isEven)
    .map((n) => n * 2)
    .reduce((sum, n) => sum + n, 0),
);

const readings = [
  { deviceId: 'PT-1042', value: 91, unit: 'C' },
  { deviceId: 'VS-0071', value: 60, unit: 'mm/s' },
  { deviceId: 'PT-1042', value: 97, unit: 'C' },
  { deviceId: 'PS-0310', value: null, unit: 'bar' },
];

const STATE = Object.freeze({
  OK: 'OK',
  WARNING: 'WARNING',
  CRITICAL: 'CRITICAL',
});

const SEVERITY = Object.freeze({ OK: 0, WARNING: 1, CRITICAL: 2 });

const classify = (reading) =>
  reading.value > 95
    ? STATE.CRITICAL
    : reading.value > 50
      ? STATE.WARNING
      : STATE.OK;

const alarms = readings
  .filter((r) => r.value != null)
  .map((r) => ({ ...r, state: classify(r) }))
  .filter((r) => r.state !== STATE.OK);

console.log(alarms);

console.log(
  [1, 2].map((n) => ({
    value: n,
  })),
);

const values = [4, 2, 3, 7, 1];
console.log(values.toSorted((a, b) => a - b));

worstFirst = alarms.toSorted((a, b) => SEVERITY[b.state] - SEVERITY[a.state]);

const grouped = Object.groupBy(readings, (reading) => reading.deviceId);
console.log(grouped);
console.log(Object.keys(grouped));

console.log(readings.some((r) => r.value == null));
console.log(readings.every((r) => r.value != null));
console.log(readings.find((r) => r.value > 95));
