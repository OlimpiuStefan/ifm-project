import test from 'node:test';
import assert from 'node:assert/strict';
import { loadAll } from './devices.js';

const IDS = Array.from({ length: 12 }, (_, i) => `XX-${String(i).padStart(4, '0')}`);
const answer = (id) => Promise.resolve({ deviceId: id, value: '1' });

test('loads every device when all of them answer', async () => {
  const results = await loadAll(IDS, answer);
  assert.equal(results.length, 12);
});

test(
  'one dead sensor does not blank the other eleven',
  { skip: 'block 09' },
  async () => {
    const dead = IDS[7];
    const results = await loadAll(IDS, (id) =>
      id === dead ? Promise.reject(new Error('503')) : answer(id));
    assert.equal(results.filter(Boolean).length, 11);
    assert.equal(results[7], null);
  },
);
