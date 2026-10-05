// Minimal static server. No dependencies.
// Run:  node hosts/plain/serve.js   →  http://localhost:5173
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('../../', import.meta.url));
const TYPES = { '.html':'text/html', '.js':'text/javascript', '.json':'application/json', '.css':'text/css' };

// Only the folders the pages load from. Never .env, package.json,
// node_modules or the build output.
const SERVED = new Set(['client', 'modules', 'fixtures', 'hosts', 'contract']);
const servable = (rel) => {
  const parts = rel.split(/[/\\]/).filter(Boolean);
  return SERVED.has(parts[0]) && !parts.some((p) => p.startsWith('.') || p === 'node_modules');
};

createServer(async (req, res) => {
  if (!URL.canParse(req.url, 'http://localhost')) return res.writeHead(400).end('bad request');
  const { pathname } = new URL(req.url, 'http://localhost');   // the path only, without any query string
  const rel = pathname === '/' ? 'hosts/plain/index.html' : normalize(pathname).replace(/^(\.\.[/\\])+/, '');
  if (!servable(rel)) return res.writeHead(404).end('not found');
  try {
    const body = await readFile(join(ROOT, rel));
    res.writeHead(200, { 'content-type': TYPES[extname(rel)] ?? 'text/plain' });
    res.end(body);
  } catch {
    // Could not read it, so there is nothing to send.
    res.writeHead(404).end('not found');
  }
}).listen(5173, '127.0.0.1', () => console.log('host 1 → http://localhost:5173'));
