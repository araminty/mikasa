#!/usr/bin/env node
/**
 * Local static server for out/html with no-store on every response.
 * Prefer this over file:// when Firefox keeps stale game.js.
 *
 * Usage:
 *   node scripts/serve-dev.js
 *   MIKASA_DEV_PORT=8765 node scripts/serve-dev.js
 *
 * Open http://127.0.0.1:8765/ (WSL2 usually forwards localhost to Windows Firefox).
 */

const http = require('http')
const fs = require('fs')
const path = require('path')

const ROOT = path.join(__dirname, '..', 'out', 'html')
const PORT = parseInt(process.env.MIKASA_DEV_PORT || '8765', 10)

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
}

function send(res, status, body, type) {
  res.writeHead(status, {
    'Content-Type': type || 'text/plain; charset=utf-8',
    'Cache-Control': 'no-store, no-cache, must-revalidate',
    Pragma: 'no-cache',
    Expires: '0',
  })
  res.end(body)
}

const server = http.createServer((req, res) => {
  let rel = decodeURIComponent((req.url || '/').split('?')[0])
  if (rel === '/') rel = '/index.html'
  const file = path.normalize(path.join(ROOT, rel.replace(/^\//, '')))
  if (!file.startsWith(ROOT)) {
    send(res, 403, 'Forbidden')
    return
  }
  fs.readFile(file, (err, data) => {
    if (err) {
      send(res, err.code === 'ENOENT' ? 404 : 500, err.message)
      return
    }
    send(res, 200, data, MIME[path.extname(file)] || 'application/octet-stream')
  })
})

server.listen(PORT, '127.0.0.1', () => {
  console.log(`mikasa dev server: http://127.0.0.1:${PORT}/  (root ${ROOT})`)
})
