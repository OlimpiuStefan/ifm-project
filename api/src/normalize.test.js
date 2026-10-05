// Tests for the transport shape. Written the way tests usually get
// written: the cases somebody thought of on the day.
import test from 'node:test';
import assert from 'node:assert/strict';
import { normalize, normalizeAll } from './normalize.js';

const frame = (over = {}) => ({
  deviceId: 'PT-1042', name: 'Press line 1', value: 92.4,
  unit: 'C', at: '2026-09-03T14:32:07.000Z', ...over,
});

test('normalize carries the identifying fields through', () => {
  const r = normalize(frame());
  assert.equal(r.deviceId, 'PT-1042');
  assert.equal(r.unit, 'C');
});

test('normalize turns the value into a string', () => {
  assert.equal(normalize(frame({ value: 92.4 })).value, '92.4');
  assert.equal(typeof normalize(frame()).value, 'string');
});

test('normalize emits ISO 8601 in UTC', () => {
  assert.equal(normalize(frame()).at, '2026-09-03T14:32:07.000Z');
});

test('normalizeAll drops nulls', () => {
  const out = normalizeAll([frame(), frame({ value: null })]);
  assert.equal(out.length, 1);
});
