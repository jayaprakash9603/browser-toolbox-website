import type { Tool } from './types'

function normalize(value: string) {
  return value.toLowerCase().normalize('NFKD').replace(/[^\p{Letter}\p{Number}\s]/gu, ' ').trim()
}

/** Ranks a tool against a query the same way the extension's search does: names first, then aliases and keywords. */
export function scoreTool(tool: Tool, query: string) {
  const q = normalize(query)
  if (!q) return 1
  const name = normalize(tool.name)
  const tokens = q.split(/\s+/)
  let score = 0

  if (name === q) score += 200
  else if (name.startsWith(q)) score += 120
  else if (name.includes(q)) score += 80

  for (const alias of tool.aliases) {
    const a = normalize(alias)
    if (a === q) score += 90
    else if (a.includes(q)) score += 45
  }
  for (const keyword of tool.keywords) {
    const k = normalize(keyword)
    if (k === q) score += 40
    else if (k.startsWith(q)) score += 20
  }

  const haystack = `${name} ${normalize(tool.description)} ${tool.keywords.join(' ')} ${tool.aliases.join(' ')}`.toLowerCase()
  const matchedTokens = tokens.filter((token) => haystack.includes(token)).length
  if (matchedTokens === tokens.length) score += 10 * matchedTokens
  else if (score === 0) return 0

  return score
}

export function searchTools(tools: Tool[], query: string) {
  if (!query.trim()) return tools
  return tools
    .map((tool) => ({ tool, score: scoreTool(tool, query) }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((entry) => entry.tool)
}
