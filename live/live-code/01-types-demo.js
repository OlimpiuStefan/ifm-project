let age = 25;
const firstName = 'Alice';
var name = 'Bob';

const y = 5;
try {
  y = 15;
} catch (e) {
  console.log(e.message);
}

console.log(typeof null);
console.log(typeof []);
console.log(typeof function greet() {});

console.log(10 + '5');
console.log('10' - 5);
console.log(10 == '10');
console.log(10 === '10');

console.log('' == 0);
console.log('0' == 0);
console.log('' == '0');

console.log(null == undefined);
console.log(null === undefined);

console.log(
  Boolean(false),
  Boolean(0),
  Boolean(''),
  Boolean(null),
  Boolean(undefined),
  Boolean(NaN),
);

console.log(Boolean('0'), Boolean([]), Boolean({}));

const reading = { deviceId: 'PT-1042', value: 0 };
if (reading.value == null) console.log('No value');

let username = '';
let displayName = username || 'Guest';
console.log(displayName);

console.log({ v: 0 }.v ?? 20);
console.log({ v: 0 }.v || 20);
