import type { Tool } from './types'

// Data-free helpers so client components can build links without bundling the tool catalogue.
export function toolHref(tool: Pick<Tool, 'route'>) {
  return `${tool.route}/`
}

export function categoryHref(categoryId: string) {
  return `/tools/${categoryId}/`
}
