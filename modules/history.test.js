import test from 'node:test';
import assert from 'node:assert/strict';
import { rollingP95 } from './history.js';

// `await` on purpose, so these pass whether rollingP95 is sync or async.
test('rollingP95 returns one value per reading', async () => {
  const readings = [1, 2, 3].map((v) => ({ deviceId: 'PT-1042', value: String(v), at: '' }));
  const result = await rollingP95(readings);
  assert.equal(result.length, 3);
});

test('rollingP95 is the 95th percentile of the window', async () => {
  const readings = Array.from({ length: 20 }, (_, i) =>
    ({ deviceId: 'PT-1042', value: String(i + 1), at: '' }));
  const result = await rollingP95(readings, 20);
  assert.equal(result.at(-1).p95, 19);
});

test('rollingP95 keeps devices apart', async () => {
  const readings = [
    { deviceId: 'PT-1042', value: '90', at: '' },
    { deviceId: 'VS-0071', value: '10', at: '' },
  ];
  const [, second] = await rollingP95(readings);
  assert.equal(second.p95, 10);
});
