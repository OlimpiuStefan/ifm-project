const MISSING = 'http://localhost:3000/api/devices/XX-9999/reading';
const res = await fetch(MISSING);

console.log(await res.json());
console.log(res.status);
console.log(res.ok);

const text = JSON.stringify({
  deviceId: 'PT-1042',
  value: '97.4',
});

const obj = JSON.parse(text);

const x = {
  at: new Date('2026-10-06T09:00:00Z'),
  missing: undefined,
  calculate() {},
};

const copy = JSON.parse(JSON.stringify(x));
console.log(copy);

const res2 = await fetch(url);
const data = await res2.json();
