#!/usr/bin/env node
// Minimal static server for previewing the exported `out/` directory.

import { createReadStream, existsSync, statSync } from 'node:fs'
import { createServer } from 'node:http'
import { extname, join, normalize, sep } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createGzip } from 'node:zlib'

const root = fileURLToPath(new URL('../out', import.meta.url))
const port = Number(process.env.PORT ?? 4321)

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.woff2': 'font/woff2',
}

function resolve(urlPath) {
  const clean = normalize(decodeURIComponent(urlPath.split('?')[0])).replace(/^([/\\])+/, '')
  let file = join(root, clean)
  if (!file.startsWith(root)) return null
  if (existsSync(file) && statSync(file).isDirectory()) file = join(file, 'index.html')
  if (!existsSync(file) && existsSync(`${file}.html`)) file = `${file}.html`
  return existsSync(file) ? file : null
}

const COMPRESSIBLE = new Set(['.html', '.js', '.css', '.json', '.svg', '.txt', '.xml'])
const IMMUTABLE = join(root, '_next', 'static') + sep

// Mirrors what a static host does: gzip text assets and cache hashed build output forever.
function send(request, response, status, file) {
  const headers = { 'content-type': TYPES[extname(file)] ?? 'application/octet-stream' }
  headers['cache-control'] = file.startsWith(IMMUTABLE) ? 'public, max-age=31536000, immutable' : 'no-cache'
  const gzip = COMPRESSIBLE.has(extname(file)) && /\bgzip\b/.test(request.headers['accept-encoding'] ?? '')
  if (gzip) headers['content-encoding'] = 'gzip'
  response.writeHead(status, headers)
  const stream = createReadStream(file)
  ;(gzip ? stream.pipe(createGzip()) : stream).pipe(response)
}

createServer((request, response) => {
  const file = resolve(request.url ?? '/')
  if (!file) {
    send(request, response, 404, join(root, '404.html'))
    return
  }
  send(request, response, 200, file)
}).listen(port, () => {
  console.log(`Serving out/ at http://localhost:${port}`)
})
