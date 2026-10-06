function readSensor(id, done) {
  setTimeout(() => done(null, { id, value: '42.0' }), 300);
}

function readSensorAsync(id) {
  return new Promise((resolve, reject) => {
    readSensor(id, (err, data) => {
      if (id === 'PT-1042') {
        reject(new Error('sensor offline'));
      } else {
        resolve(data);
      }
    });
  });
}

const ids = ['PT-1042', 'VS-0071', 'PT-3454'];
const readingsv1 = ids.map(async (id) => await readSensorAsync(id));
console.log(readingsv1);

const readingsv2 = await Promise.all(ids.map((id) => readSensorAsync(id)));

console.log(readingsv2);
