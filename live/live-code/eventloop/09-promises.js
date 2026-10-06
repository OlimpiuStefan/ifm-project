import { createServer } from 'node:http';

const readSensor = (id, ms = 300) =>
  new Promise((resolve, reject) =>
    setTimeout(
      () =>
        id === 'FL-0909'
          ? reject(new Error('sensor offline'))
          : resolve({ id, value: '42.0' }),
      ms,
    ),
  );

const ids = [
  'VS-0071',
  'PT-1042',
  'PS-0310',
  'MM-0002',
  'LS-0120',
  'SM-0415',
  'TA-0233',
  'PN-0877',
  'VS-0072',
  'PT-1043',
  'FL-0909',
  'TA-0234',
];

async function readMultipleV1() {
  try {
    await Promise.all(ids.map((id) => readSensor(id)));
  } catch (err) {
    console.log(err.message);
  }
  const results = await Promise.allSettled(ids.map((id) => readSensor(id)));
  console.log(results);
}

//await readMultipleV1();
const hang = createServer(() => {});
await new Promise((resolve) => hang.listen(0, '127.0.0.1', resolve));
const url = `http://127.0.0.1:${hang.address().port}/slow`;
//http://127.0.0.1:3455/slow

async function cancel() {
  const controller = new AbortController();
  const request = fetch(url, {
    signal: controller.signal,
  });

  controller.abort();
  try {
    await request;
  } catch (err) {
    console.log('cancelled', err.name);
  }
}

await cancel();
