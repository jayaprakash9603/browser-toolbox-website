'use client'

import { ArrowUpRightIcon } from 'lucide-react'
import type { CSSProperties } from 'react'

import { ChapterLabel } from '@/components/ui/primitives'
import { ToolIcon } from '@/components/ui/ToolIcon'
import { cn } from '@/lib/cn'
import { toolHref } from '@/lib/routes'
import { Reveal } from '@/motion/Reveal'
import { SplitReveal } from '@/motion/SplitReveal'
import { TransitionLink } from '@/motion/TransitionLink'
import { spotlightHandlers } from '@/motion/useSpotlight'

export interface BentoTool {
  id: string
  name: string
  route: string
  icon: string
  accent: string
  tagline: string
  categoryName: string
}

const SPANS = [
  'md:col-span-4 md:row-span-2',
  'md:col-span-2 md:row-span-2',
  'md:col-span-2',
  'md:col-span-2',
  'md:col-span-2',
  'md:col-span-3',
  'md:col-span-3',
  'md:col-span-6 lg:col-span-6',
]

const ease = 'transition-all duration-700 ease-[var(--ease-out-expo)]'

/** CSS-only previews that play on hover/focus of the tile. */
function Preview({ id }: { id: string }) {
  switch (id) {
    case 'developer.json-toolkit':
      return (
        <div className="space-y-1.5 font-mono text-[11px]">
          {[0.9, 0.55, 0.7, 0.4, 0.8, 0.5, 0.65].map((width, index) => (
            <span
              key={index}
              className={cn('block h-2 origin-left scale-x-25 rounded-full bg-[var(--accent)]/40 tile-on:scale-x-100', ease)}
              style={{ width: `${width * 100}%`, marginLeft: `${(index % 3) * 8}%`, transitionDelay: `${index * 45}ms` }}
            />
          ))}
        </div>
      )
    case 'api.request-builder':
      return (
        <div className="space-y-2 font-mono text-[11px]">
          <div className="flex items-center gap-2 rounded-lg border border-line bg-canvas/70 px-2.5 py-1.5">
            <span className="text-emerald">POST</span>
            <span className="flex-1 truncate text-muted">/v1/orders</span>
          </div>
          <div className={cn('flex items-center justify-between rounded-lg border border-line px-2.5 py-1.5 text-muted tile-on:border-emerald/50 tile-on:text-emerald', ease)}>
            <span>201 Created</span>
            <span>88 ms</span>
          </div>
        </div>
      )
    case 'screenshots.capture':
      return (
        <div className="relative h-24 overflow-hidden rounded-xl bg-[linear-gradient(135deg,#6366f1,#c084fc)]">
          <span className={cn('absolute inset-4 scale-50 rounded-lg border-2 border-dashed border-white opacity-0 tile-on:scale-100 tile-on:opacity-100', ease)} />
          <span className={cn('absolute bottom-3 right-3 h-5 w-16 origin-left scale-x-0 rounded bg-white/40 backdrop-blur tile-on:scale-x-100', ease)} style={{ transitionDelay: '200ms' }} />
        </div>
      )
    case 'privacy.ad-blocker':
      return (
        <div className="space-y-1.5">
          {[0, 1, 2].map((ad) => (
            <span
              key={ad}
              className={cn('flex h-6 origin-left items-center rounded-md border border-amber/30 bg-amber/10 px-2 font-mono text-[9px] uppercase tracking-widest text-amber tile-on:scale-x-0 tile-on:opacity-0', ease)}
              style={{ transitionDelay: `${ad * 90}ms` }}
            >
              Sponsored
            </span>
          ))}
        </div>
      )
    case 'api.http-interceptor':
      return (
        <div className="flex items-center gap-2 font-mono text-[10.5px] text-muted">
          <span className="rounded-md border border-line px-2 py-1">prod.api</span>
          <span className="relative h-px flex-1 overflow-hidden bg-line">
            <span className={cn('absolute inset-y-0 left-0 w-1/3 -translate-x-full bg-[var(--accent)] tile-on:translate-x-[300%]', 'transition-transform duration-[1400ms] ease-[var(--ease-in-out-expo)]')} />
          </span>
          <span className={cn('rounded-md border border-line px-2 py-1 tile-on:border-[var(--accent)] tile-on:text-ink', ease)}>localhost</span>
        </div>
      )
    case 'design.color-picker':
      return (
        <div className="flex gap-1.5">
          {['#4f46e5', '#6366f1', '#ec4899', '#f472b6', '#fbbf24', '#22d3ee'].map((color, index) => (
            <span
              key={color}
              className={cn('h-14 flex-1 origin-bottom scale-y-50 rounded-lg tile-on:scale-y-100', ease)}
              style={{ backgroundColor: color, transitionDelay: `${index * 50}ms` }}
            />
          ))}
        </div>
      )
    case 'seo.toolkit':
      return (
        <div className="flex items-center gap-4">
          <svg viewBox="0 0 40 40" className="size-16 -rotate-90" aria-hidden="true">
            <circle cx="20" cy="20" r="16" fill="none" stroke="rgb(255 255 255 / 0.08)" strokeWidth="4" />
            <circle
              cx="20"
              cy="20"
              r="16"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="4"
              strokeLinecap="round"
              pathLength={100}
              strokeDasharray="100"
              className="[stroke-dashoffset:70] transition-[stroke-dashoffset] duration-1000 ease-[var(--ease-out-expo)] tile-on:[stroke-dashoffset:8]"
            />
          </svg>
          <div className="font-mono text-[11px] text-muted">
            <p className="text-ink">Score 92</p>
            <p>3 issues · 41 checks</p>
          </div>
        </div>
      )
    default:
      return (
        <div className="grid grid-cols-4 gap-1.5">
          {Array.from({ length: 12 }, (_, index) => (
            <span
              key={index}
              className={cn('h-4 rounded bg-white/[0.06] tile-on:bg-[var(--accent)]/40', ease)}
              style={{ transitionDelay: `${index * 30}ms` }}
            />
          ))}
        </div>
      )
  }
}

export function ToolBento({ tools }: { tools: BentoTool[] }) {
  return (
    <section aria-labelledby="bento-title" className="mx-auto max-w-7xl px-6 py-28 md:px-10 md:py-36">
      <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <ChapterLabel index="08">Highlights</ChapterLabel>
          <SplitReveal as="h2" id="bento-title" type="words" className="mt-6 max-w-3xl text-title font-medium tracking-[-0.045em]">
            The tools people open every day.
          </SplitReveal>
        </div>
        <TransitionLink href="/tools/" transitionLabel="All tools" className="inline-flex items-center gap-2 text-sm text-ink-soft hover:text-ink">
          See the full catalogue <ArrowUpRightIcon aria-hidden="true" className="size-4" />
        </TransitionLink>
      </div>

      <Reveal className="grid auto-rows-[minmax(220px,auto)] gap-4 md:grid-cols-6" y={40} stagger={0.07}>
        {tools.map((tool, index) => (
          <TransitionLink
            key={tool.id}
            href={toolHref(tool)}
            morph
            data-cursor="Open"
            {...spotlightHandlers()}
            style={{ '--accent': tool.accent } as CSSProperties}
            className={cn(
              'spotlight group relative flex flex-col justify-between gap-8 overflow-hidden rounded-[28px] border border-line bg-surface p-6 transition-colors duration-500 hover:border-line-strong md:p-7',
              SPANS[index] ?? 'md:col-span-2',
            )}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <span
                  data-vt="icon"
                  className="flex size-11 items-center justify-center rounded-xl border border-line-strong text-[var(--accent)]"
                  style={{ backgroundColor: `${tool.accent}1f` }}
                >
                  <ToolIcon name={tool.icon} className="size-5" strokeWidth={1.7} />
                </span>
                <span className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-muted">{tool.categoryName}</span>
              </div>
              <ArrowUpRightIcon aria-hidden="true" className="size-5 text-muted transition-transform duration-500 tile-on:rotate-45 tile-on:text-ink" />
            </div>
            <div aria-hidden="true" className="max-w-md">
              <Preview id={tool.id} />
            </div>
            <div>
              <h3 data-vt="title" className={cn('font-medium tracking-[-0.035em]', index < 2 ? 'text-3xl md:text-4xl' : 'text-2xl')}>
                {tool.name}
              </h3>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">{tool.tagline}</p>
            </div>
          </TransitionLink>
        ))}
      </Reveal>
    </section>
  )
}
