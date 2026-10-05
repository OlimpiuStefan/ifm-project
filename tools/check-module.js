// The two-host demo rests on one claim: the module is IDENTICAL in both.
// A claim you make in a comment is a hope. This makes it a gate.
import { existsSync, readFileSync } from 'node:fs';

const A = 'modules/gauge-module.js';
const COPIES = ['hosts/second/wwwroot/js/gauge.js'];
// Once hosts/second/setup.sh has built host 2, THAT copy is what it serves.
const BUILT = 'hosts/second/app/wwwroot/js/gauge.js';
if (existsSync(BUILT)) COPIES.push(BUILT);

const a = readFileSync(A);
const diverged = COPIES.filter((B) => !a.equals(readFileSync(B)));

if (diverged.length) {
  for (const B of diverged) console.error(`✗ ${A} and ${B} have diverged.`);
  console.error(`  Run: npm run sync:module`);
  process.exit(1);
}
for (const B of COPIES) console.log(`✓ ${A} === ${B}  (${a.length} bytes)`);
