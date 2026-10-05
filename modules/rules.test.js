import test from 'node:test';
import assert from 'node:assert/strict';
import { classify, activeAlarms, STATE } from './rules.js';

const r = (value, deviceId = 'PT-1042') => ({ deviceId, value });

test('classify returns CRITICAL above the critical threshold', () => {
  assert.equal(classify(r('96')), STATE.CRITICAL);
});

test('classify returns WARNING above the warning threshold', () => {
  assert.equal(classify(r('60')), STATE.WARNING);
});

test('classify returns OK below both', () => {
  assert.equal(classify(r('20')), STATE.OK);
});

test('activeAlarms keeps only the non-OK readings', () => {
  const out = activeAlarms([r('20'), r('60'), r('96')]);
  assert.equal(out.length, 2);
});

test('activeAlarms puts the worst first', () => {
  const out = activeAlarms([r('60'), r('96')]);
  assert.equal(out[0].state, STATE.CRITICAL);
});
