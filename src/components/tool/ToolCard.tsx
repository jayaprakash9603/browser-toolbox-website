'use client'

import { ArrowUpRightIcon } from 'lucide-react'
import type { CSSProperties } from 'react'

import { Badge } from '@/components/ui/primitives'
import { ToolIcon } from '@/components/ui/ToolIcon'
import { categoryAccent } from '@/lib/accents'
import { cn } from '@/lib/cn'
import { toolHref } from '@/lib/routes'
import type { Tool } from '@/lib/types'
import { TransitionLink } from '@/motion/TransitionLink'
import { spotlightHandlers } from '@/motion/useSpotlight'

interface ToolCardProps {
  tool: Tool
  className?: string
  /** Shown above the name when cards from several categories are mixed. */
  categoryName?: string
  size?: 'md' | 'sm'
}

export function ToolCard({ tool, className, categoryName, size = 'md' }: ToolCardProps) {
  const accent = categoryAccent(tool.category)
  return (
    <TransitionLink
      href={toolHref(tool)}
      morph
      data-cursor="Open"
      data-tool-card={tool.id}
      {...spotlightHandlers()}
      style={{ '--accent': accent } as CSSProperties}
      className={cn(
        'spotlight group flex h-full flex-col justify-between gap-6 rounded-2xl border border-line bg-surface/80 p-5 transition-[transform,background-color,border-color] duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1 hover:border-line-strong hover:bg-elevated motion-reduce:hover:translate-y-0',
        size === 'md' ? 'min-h-52' : 'min-h-40',
        className,
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <span
          data-vt="icon"
          className="flex size-11 items-center justify-center rounded-xl border border-line-strong bg-[color-mix(in_srgb,var(--accent)_14%,transparent)] text-[var(--accent)] transition-transform duration-500 ease-[var(--ease-spring)] group-hover:scale-110 group-hover:-rotate-6"
        >
          <ToolIcon name={tool.icon} className="size-5" strokeWidth={1.75} />
        </span>
        <span className="flex items-center gap-2">
          {tool.status === 'beta' ? <Badge tone="beta">Beta</Badge> : null}
          <ArrowUpRightIcon
            aria-hidden="true"
            className="size-5 text-muted transition-all duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ink"
          />
        </span>
      </div>
      <div>
        {categoryName ? (
          <p className="mb-2 font-mono text-[10.5px] uppercase tracking-[0.2em] text-muted">{categoryName}</p>
        ) : null}
        <h3 data-vt="title" className="text-lg font-medium tracking-tight text-ink">
          {tool.name}
        </h3>
        <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-muted">{tool.description}</p>
      </div>
    </TransitionLink>
  )
}
