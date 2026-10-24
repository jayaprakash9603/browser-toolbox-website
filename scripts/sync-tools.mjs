#!/usr/bin/env node
// Reads the extension's tool + category registries and emits static data for the website.
// Only string/number/boolean/array literals and bare identifiers (icons) are understood;
// anything else is ignored so the extension can evolve without breaking this script.

import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs'
import { dirname, join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

import ts from 'typescript'

const here = dirname(fileURLToPath(import.meta.url))
const websiteRoot = join(here, '..')
const repoRoot = join(websiteRoot, '..')
const modulesDir = join(repoRoot, 'src', 'modules')
const categoriesFile = join(repoRoot, 'src', 'core', 'registry', 'categories.ts')
const outDir = join(websiteRoot, 'src', 'data')
const jsonOut = join(outDir, 'tools.generated.json')
const iconsOut = join(outDir, 'icons.generated.ts')

const ROUTE_PATTERN = /^\/tools\/([a-z0-9-]+)\/([a-z0-9-]+)$/

function log(message) {
  console.log(`[sync-tools] ${message}`)
}

if (!existsSync(modulesDir) || !existsSync(categoriesFile)) {
  if (existsSync(jsonOut) && existsSync(iconsOut)) {
    log('extension sources not found; keeping existing generated data')
    process.exit(0)
  }
  console.error('[sync-tools] extension sources not found and no generated data exists')
  process.exit(1)
}

function parse(file) {
  return ts.createSourceFile(file, readFileSync(file, 'utf8'), ts.ScriptTarget.Latest, true)
}

function literal(node) {
  if (!node) return undefined
  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) return node.text
  if (ts.isNumericLiteral(node)) return Number(node.text)
  if (node.kind === ts.SyntaxKind.TrueKeyword) return true
  if (node.kind === ts.SyntaxKind.FalseKeyword) return false
  if (ts.isArrayLiteralExpression(node)) {
    return node.elements.map(literal).filter((value) => value !== undefined)
  }
  if (ts.isIdentifier(node)) return { identifier: node.text }
  if (ts.isAsExpression(node) || ts.isSatisfiesExpression(node) || ts.isParenthesizedExpression(node)) {
    return literal(node.expression)
  }
  return undefined
}

function objectToRecord(objectLiteral) {
  const record = {}
  for (const property of objectLiteral.properties) {
    if (!ts.isPropertyAssignment(property)) continue
    const key = property.name.getText()
    const value = literal(property.initializer)
    if (value !== undefined) record[key] = value
  }
  return record
}

function visit(node, callback) {
  callback(node)
  ts.forEachChild(node, (child) => visit(child, callback))
}

// Categories
const categoriesSource = parse(categoriesFile)
const categories = []
visit(categoriesSource, (node) => {
  if (
    ts.isVariableDeclaration(node) &&
    node.name.getText() === 'CATEGORIES' &&
    node.initializer &&
    ts.isArrayLiteralExpression(node.initializer)
  ) {
    for (const element of node.initializer.elements) {
      if (!ts.isObjectLiteralExpression(element)) continue
      const record = objectToRecord(element)
      if (record.enabled === false) continue
      categories.push({
        id: record.id,
        name: record.name,
        description: record.description,
        icon: record.icon?.identifier ?? 'BoxIcon',
        order: record.order ?? 999,
      })
    }
  }
})
categories.sort((a, b) => a.order - b.order)
const categoryOrder = new Map(categories.map((category, index) => [category.id, index]))

// Tools
const tools = []
const registryFiles = readdirSync(modulesDir, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => join(modulesDir, entry.name, 'registry.ts'))
  .filter((file) => existsSync(file))
  .sort()

let skipped = 0
for (const file of registryFiles) {
  const source = parse(file)
  let position = 0
  visit(source, (node) => {
    if (
      !ts.isCallExpression(node) ||
      !ts.isIdentifier(node.expression) ||
      node.expression.text !== 'defineTool'
    ) {
      return
    }
    const [arg] = node.arguments
    if (!arg || !ts.isObjectLiteralExpression(arg)) return
    const record = objectToRecord(arg)
    const status = record.status ?? 'active'
    if (status === 'disabled' || status === 'coming-soon') {
      skipped += 1
      return
    }
    const match = ROUTE_PATTERN.exec(record.route ?? '')
    if (!match) {
      throw new Error(`Unexpected route "${record.route}" for ${record.id} in ${relative(repoRoot, file)}`)
    }
    if (!categoryOrder.has(record.category)) {
      throw new Error(`Unknown category "${record.category}" for ${record.id}`)
    }
    tools.push({
      id: record.id,
      name: record.name,
      description: record.description,
      category: record.category,
      categorySlug: match[1],
      slug: match[2],
      route: record.route,
      icon: record.icon?.identifier ?? 'BoxIcon',
      keywords: record.keywords ?? [],
      aliases: record.aliases ?? [],
      capabilities: record.capabilities ?? [],
      contextSurfaces: record.contextSurfaces ?? [],
      shortcut: typeof record.shortcut === 'string' ? record.shortcut : null,
      status,
      position: position++,
    })
  })
}

tools.sort(
  (a, b) =>
    categoryOrder.get(a.category) - categoryOrder.get(b.category) || a.position - b.position,
)

const seenRoutes = new Set()
for (const tool of tools) {
  if (seenRoutes.has(tool.route)) throw new Error(`Duplicate route ${tool.route}`)
  seenRoutes.add(tool.route)
  delete tool.position
}

const usedCategories = categories.filter((category) => tools.some((tool) => tool.category === category.id))

mkdirSync(outDir, { recursive: true })
writeFileSync(jsonOut, `${JSON.stringify({ categories: usedCategories, tools }, null, 2)}\n`)

const iconNames = [...new Set([...usedCategories.map((c) => c.icon), ...tools.map((t) => t.icon), 'BoxIcon'])].sort()
const iconsFile = `// Generated by scripts/sync-tools.mjs. Do not edit.
import type { LucideIcon } from 'lucide-react'
import {
${iconNames.map((name) => `  ${name},`).join('\n')}
} from 'lucide-react'

export const ICONS: Record<string, LucideIcon> = {
${iconNames.map((name) => `  ${name},`).join('\n')}
}
`
writeFileSync(iconsOut, iconsFile)

log(`${tools.length} tools in ${usedCategories.length} categories (${skipped} hidden), ${iconNames.length} icons`)
