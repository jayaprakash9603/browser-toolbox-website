import { TOOL_CONTENT } from '@/content/toolContent'
import data from '@/data/tools.generated.json'

import { categoryAccent } from './accents'
import type { Category, CategoryWithTools, Tool, ToolContent } from './types'

export const TOOLS = data.tools as Tool[]

export const CATEGORIES: CategoryWithTools[] = (data.categories as Category[]).map((category, index) => ({
  ...category,
  index,
  accent: categoryAccent(category.id),
  tools: TOOLS.filter((tool) => tool.category === category.id),
}))

const categoryById = new Map(CATEGORIES.map((category) => [category.id, category]))
const toolByRoute = new Map(TOOLS.map((tool) => [`${tool.categorySlug}/${tool.slug}`, tool]))
const toolById = new Map(TOOLS.map((tool) => [tool.id, tool]))

export function getCategory(id: string) {
  return categoryById.get(id)
}

export function getTool(categorySlug: string, slug: string) {
  return toolByRoute.get(`${categorySlug}/${slug}`)
}

export function getToolById(id: string) {
  return toolById.get(id)
}

export { categoryHref, toolHref } from './routes'

export function toolAccent(tool: Tool) {
  return categoryAccent(tool.category)
}

export function getToolContent(tool: Tool): ToolContent {
  return (
    TOOL_CONTENT[tool.id] ?? {
      tagline: tool.description,
      features: tool.keywords.slice(0, 5).map((keyword) => keyword.replace(/^\w/, (c) => c.toUpperCase())),
      useCases: [],
    }
  )
}

/** Same-category tools first, then neighbours from adjacent categories. */
export function getRelatedTools(tool: Tool, limit = 6) {
  const sameCategory = TOOLS.filter((other) => other.category === tool.category && other.id !== tool.id)
  if (sameCategory.length >= limit) return sameCategory.slice(0, limit)
  const index = TOOLS.indexOf(tool)
  const neighbours = [...TOOLS.slice(index + 1), ...TOOLS.slice(0, index)].filter(
    (other) => other.category !== tool.category,
  )
  return [...sameCategory, ...neighbours].slice(0, limit)
}

export function getToolNeighbours(tool: Tool) {
  const index = TOOLS.indexOf(tool)
  return {
    previous: TOOLS[(index - 1 + TOOLS.length) % TOOLS.length],
    next: TOOLS[(index + 1) % TOOLS.length],
  }
}

export function getCategoryNeighbours(categoryId: string) {
  const index = CATEGORIES.findIndex((category) => category.id === categoryId)
  return {
    previous: CATEGORIES[(index - 1 + CATEGORIES.length) % CATEGORIES.length],
    next: CATEGORIES[(index + 1) % CATEGORIES.length],
  }
}

export const TOOL_COUNT = TOOLS.length
export const CATEGORY_COUNT = CATEGORIES.length

/** Highlight picks for the landing page; skipped silently if an id disappears from the registry. */
export const FEATURED_TOOL_IDS = [
  'developer.json-toolkit',
  'api.request-builder',
  'screenshots.capture',
  'privacy.ad-blocker',
  'api.http-interceptor',
  'design.color-picker',
  'seo.toolkit',
  'data.data-scraper',
]

export function getFeaturedTools() {
  return FEATURED_TOOL_IDS.map((id) => toolById.get(id)).filter((tool): tool is Tool => Boolean(tool))
}
