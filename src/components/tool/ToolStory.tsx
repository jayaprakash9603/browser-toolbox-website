'use client'

import type { CSSProperties } from 'react'

import { ToolMetaContext, type ToolMeta } from '@/components/tool/stage/context'
import type { StoryProps } from '@/components/tool/story'
import type { ToolId } from '@/data/toolIds.generated'
import { TOOL_PAGES } from '@/tool-pages/registry'

export function ToolStory({ meta, ...props }: StoryProps & { meta: ToolMeta }) {
  const { Story } = TOOL_PAGES[meta.id as ToolId]
  return (
    <ToolMetaContext.Provider value={meta}>
      <div style={{ '--accent': meta.accent } as CSSProperties}>
        <Story {...props} />
      </div>
    </ToolMetaContext.Provider>
  )
}
