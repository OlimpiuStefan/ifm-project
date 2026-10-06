function readSensor(id, done) {
  setTimeout(() => done(null, { id, value: '42.0' }), 300);
}

function readSensorAsync(id) {
  return new Promise((resolve, reject) => {
    readSensor(id, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

readSensorAsync('PT-2344')
  .then((data) => console.log(data.value))
  .catch((err) => console.log(err.message));

async function showSensor() {
  try {
    const data = await readSensorAsync('PT-23443');
    console.log(data.value);
  } catch (err) {
    console.log(err.message);
  }
}

const saveBothAsync = (a, b) =>
  new Promise(((resolve) => setTimeout(() => resolve(`${a}+${b}`)), 100));

async function saveTwoReadings() {
  const a = await readSensorAsync('PT-234');
  const b = await readSensorAsync('PT-324');
  return saveBothAsync(a, b);
}

console.log(await saveTwoReadings());

async function parallelSave() {
  const [a, b] = await Promise.all([
    readSensorAsync('PT-234'),
    readSensorAsync('PT-324'),
  ]);
  return [a, b];
}

const ids = ['PT-1042', 'VS-0071'];
ids.map(async (id) => await readSensorAsync(id));
console.log(ids);
