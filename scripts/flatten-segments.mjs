#!/usr/bin/env node
// Next 16 static exports built on Windows write RSC segment files into nested folders
// (`__next.tools/__PAGE__.txt`) instead of the flat names the client router requests
// (`__next.tools.__PAGE__.txt`), so every prefetch 404s. https://github.com/vercel/next.js/issues/85374
// Builds on Linux/macOS are already flat, which makes this a no-op there.

import { readdirSync, renameSync, rmSync } from 'node:fs'
import { join, relative, sep } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('../out', import.meta.url))

function filesUnder(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name)
    return entry.isDirectory() ? filesUnder(path) : [path]
  })
}

let moved = 0

function walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue
    const path = join(dir, entry.name)
    if (!entry.name.startsWith('__next.')) {
      walk(path)
      continue
    }
    for (const file of filesUnder(path)) {
      renameSync(file, join(dir, `${entry.name}.${relative(path, file).split(sep).join('.')}`))
      moved += 1
    }
    rmSync(path, { recursive: true, force: true })
  }
}

walk(root)
if (moved) console.log(`Flattened ${moved} RSC segment files in out/`)
