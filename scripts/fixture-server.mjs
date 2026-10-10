// Synthetic inputs only. No upstream page is fetched by this server.
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
const root = new URL('../examples/canonical-conflict/', import.meta.url);
createServer(async (req, res) => {
  if (req.url === '/robots.txt') { res.writeHead(200, {'Content-Type':'text/plain'}); res.end('User-agent: *\nAllow: /\n'); return; }
  const state = req.url === '/before/trail-guide/' ? 'before' : req.url === '/after/trail-guide/' ? 'after' : null;
  if (!state) { res.writeHead(404); res.end('Synthetic fixture not found'); return; }
  res.writeHead(200, {'Content-Type':'text/html; charset=utf-8'});
  res.end(await readFile(new URL(state + '/page.html', root)));
}).listen(4174,'127.0.0.1',()=>console.log('Synthetic fixtures: http://127.0.0.1:4174/{before,after}/trail-guide/'));
