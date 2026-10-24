import { CATEGORIES, TOOLS } from '@/lib/tools'

export interface ShellCategory {
  id: string
  name: string
  icon: string
  accent: string
  count: number
}

export interface ShellTool {
  id: string
  name: string
  icon: string
  route: string
  category: string
  categoryName: string
  keywords: string[]
}

/** Slim, serialisable catalogue for client shell components (nav, palette). */
export function getShellData() {
  const categories: ShellCategory[] = CATEGORIES.map((category) => ({
    id: category.id,
    name: category.name,
    icon: category.icon,
    accent: category.accent,
    count: category.tools.length,
  }))
  const categoryName = new Map(categories.map((category) => [category.id, category.name]))
  const tools: ShellTool[] = TOOLS.map((tool) => ({
    id: tool.id,
    name: tool.name,
    icon: tool.icon,
    route: tool.route,
    category: tool.category,
    categoryName: categoryName.get(tool.category) ?? tool.category,
    keywords: [...tool.keywords.slice(0, 6), ...tool.aliases.slice(0, 4)],
  }))
  return { categories, tools }
}
