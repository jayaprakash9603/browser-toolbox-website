'use client'

import { ToolMetaContext, type ToolMeta } from '@/components/tool/stage/context'
import type { ToolId } from '@/data/toolIds.generated'
import { TOOL_PAGES } from '@/tool-pages/registry'

export function ToolDemo({ meta }: { meta: ToolMeta }) {
  const { Demo } = TOOL_PAGES[meta.id as ToolId]
  return (
    <ToolMetaContext.Provider value={meta}>
      <Demo />
    </ToolMetaContext.Provider>
  )
}
