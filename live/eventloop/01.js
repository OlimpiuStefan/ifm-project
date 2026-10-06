function readSensor(id, done) {
  setTimeout(() => done(7), 1000);
}

console.log('1');
readSensor('PT-0234', (reading) => console.log('2', reading));
console.log('3');

console.log('1');
heavyFunction(readings);
console.log('3');
