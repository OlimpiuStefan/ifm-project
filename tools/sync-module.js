// Copies the module to where host 2 serves it from. Plain Node instead of
// `cp`, so `npm run sync:module` works the same in cmd, PowerShell and bash.
import { copyFileSync, existsSync } from 'node:fs';

const FROM = 'modules/gauge-module.js';
const TO = ['hosts/second/wwwroot/js/gauge.js'];
// Once hosts/second/setup.sh has built host 2, the app serves its own copy.
const BUILT = 'hosts/second/app/wwwroot/js';
if (existsSync(BUILT)) TO.push(`${BUILT}/gauge.js`);

for (const to of TO) {
  copyFileSync(FROM, to);
  console.log(`✓ ${FROM} → ${to}`);
}
