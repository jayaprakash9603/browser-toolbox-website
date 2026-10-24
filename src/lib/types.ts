export type ToolCapability =
  | 'SIDE_PANEL'
  | 'POPUP'
  | 'CONTEXT_MENU'
  | 'CONTENT_SCRIPT'
  | 'DEVTOOLS'
  | 'COMMAND'
  | 'OMNIBOX'
  | 'CLIPBOARD'
  | 'PAGE_ACCESS'
  | 'SCREEN_CAPTURE'
  | 'STORAGE'

export interface Tool {
  id: string
  name: string
  description: string
  category: string
  categorySlug: string
  slug: string
  route: string
  icon: string
  keywords: string[]
  aliases: string[]
  capabilities: ToolCapability[]
  contextSurfaces: string[]
  shortcut: string | null
  status: 'active' | 'beta' | 'experimental'
}

export interface Category {
  id: string
  name: string
  description: string
  icon: string
  order: number
}

export interface CategoryWithTools extends Category {
  index: number
  tools: Tool[]
  accent: string
}

export interface ToolContent {
  tagline: string
  features: string[]
  useCases: string[]
}
