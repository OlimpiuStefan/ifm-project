function report() {
  return `reading from ${this.id}`;
}
const press = { id: 'PT-1042', report }; // the same function, stored in two objects
const conveyor = { id: 'VS-0071', report };

console.log(typeof report); // → function
console.log(press.report === conveyor.report); // → true      one function, not two
console.log(press.report()); // → reading from PT-1042
console.log(conveyor.report());

function testVar() {
  if (true) {
    var message = 'I used var';
  }
  console.log(message); // → I used var
}

function testLet() {
  if (true) {
    let message = 'I used let';
  }
  console.log(message); // → ReferenceError: message is not defined
}
testVar();
try {
  testLet();
} catch (error) {
  console.error(error.message);
}

function sayHello() {
  console.log(`Hello, ${this.name}`);
}
sayHello(); // → Hello, undefined

function calculateRectangleAre(width, height) {
  console.log(this);
  return width * height;
}
console.log(calculateRectangleAre(5, 10)); // → NaN

const substract = function (a, b) {
  console.log(this);
  return a - b;
};
console.log(substract(10, 5));

console.log(((num) => num % 2 === 0)(4));

const isEven2 = function (num) {
  return num % 2 === 0;
};

const items = ['PT-1042', 'VS-0071', 'PT-1043'];
items.forEach((item) => console.log(item));

const add = (a, b) => a + b; // one line: the answer is implied
console.log(add(3, 4));

const area = (radius) => {
  const pi = 3.14159;
  return pi * radius * radius;
};
console.log(area(5));

const broken = (name) => ({
  name: name,
});
console.log(broken('Alice'));

const person = {
  name: 'Alice',
  greet: function () {
    console.log(`Hello, ${this.name}`);
  },
};
console.log(person.greet()); // → Hello, Alice

const dog = {
  name: 'Fido',
  speakv1: function () {
    console.log(`Woof, I'm ${this.name}`);
  },
  speakv2: () => console.log(`Woof, I'm ${this.name}`),
};
dog.speakv1(); // → Woof, I'm Fido
dog.speakv2(); // → Woof, I'm undefined

class Gauge {
  constructor(id) {
    this.id = id;
    this.value = 42;
  }
  report() {
    console.log(`Reporting for ${this.id}: ${this.value}`);
  }
}

const g = new Gauge('PT-1042');
g.report(); // → Reporting for PT-1042: 42

const loose = g.report;
try {
  loose();
} catch (error) {
  console.error(error.message);
}

const button = new EventTarget();
button.addEventListener('click', () => g.report());
button.dispatchEvent(new Event('click'));

const sensor = {
  id: 'PT-1042',
  value: 42,
  report() {
    console.log(`Reporting for ${this.id}: ${this.value}`);
  },
};

const bound = sensor.report.bind(sensor);
bound(); // → Reporting for PT-1042: 42
const arrow = () => sensor.report();
arrow(); // → Reporting for PT-1042: 42

function makeCounter() {
  let n = 0;
  return () => ++n;
}

const next = makeCounter();
console.log(next(), next(), next());

function attachCounter(el, id) {
  let count = 0;
  el.addEventListener('click', () => {
    count++;
    console.log(`Clicked ${count} times on ${id}`);
  });
}

const counted = new EventTarget();
attachCounter(counted, 'PT-1042');
counted.dispatchEvent(new Event('click'));
counted.dispatchEvent(new Event('click'));

let state = 'OK';

const readState = () => state;

state = 'CRITICAL';

console.log(readState()); // → CRITICAL

function attachPayload(bigThing) {
  const payload = new Array(250_000).fill('x'); // ~1 MB
  return () => `${bigThing.id} ${payload.length}`;
}
const handler = attachPayload({ id: 'PT-1042' });
console.log(handler());
//window.addEventListener('resize', handler);

function createGauge(el, unit) {
  let value = 0;
  const onClick = () => console.log(`${unit}: ${value}`);
  el.addEventListener('click', onClick);
  return {
    setValue: (v) => (value = v),
    destroy: () => el.removeEventListener('click', onClick),
  };
}

const el = new EventTarget();
const gauge = createGauge(el, 'C');
gauge.setValue(42);
el.dispatchEvent(new Event('click'));
gauge.destroy();
el.dispatchEvent(new Event('click'));

const account = {
  owner: 'Ana',

  normal() {
    return this.owner;
  },

  arrow: () => {
    return this?.owner;
  },
};

console.log(account.normal());
console.log(account.arrow());

const user = {
  name: 'Claudia',

  greet() {
    console.log(`Hello ${this.name}`);
  },
};

const button2 = new EventTarget();

button2.addEventListener('click', () => user.greet());

button2.dispatchEvent(new Event('click'));

function attachClicks(el, name) {
  let count = 0;
  const onClick = () => {
    count++;
    console.log(`${name} ${count}`);
  };
  el.addEventListener('click', onClick);
  return () => el.removeEventListener('click', onClick);
}

const button3 = new EventTarget();
const cleanup = attachClicks(button3, 'save');
button3.dispatchEvent(new Event('click'));
// save 1
button3.dispatchEvent(new Event('click'));
// save 2
cleanup();
button3.dispatchEvent(new Event('click'));
// nothing
