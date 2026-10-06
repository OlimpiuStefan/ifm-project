function readSensor(id, done) {
  setTimeout(() => done({ id, value: '42.0' }), 300);
}

function showReading(reading) {
  console.log('reading is', reading.value);
}

readSensor('PT-234', showReading);
readSensor('PT-565', (reading) => console.log('reading is', reading.value));

const returned = readSensor('PT043', showReading);
console.log(returned);
