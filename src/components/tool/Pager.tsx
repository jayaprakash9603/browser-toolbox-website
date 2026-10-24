import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react'

import { ToolIcon } from '@/components/ui/ToolIcon'
import { cn } from '@/lib/cn'
import { TransitionLink } from '@/motion/TransitionLink'

export interface PagerLink {
  href: string
  label: string
  icon: string
  accent: string
}

function PagerItem({ link, direction }: { link: PagerLink; direction: 'previous' | 'next' }) {
  const next = direction === 'next'
  return (
    <TransitionLink
      href={link.href}
      transitionLabel={link.label}
      data-cursor={next ? 'Next' : 'Back'}
      className={cn(
        'group relative flex min-h-48 flex-col justify-between overflow-hidden p-6 md:min-h-64 md:p-10',
        next ? 'items-end text-right' : 'items-start',
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          'absolute inset-0 scale-x-0 transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-x-100 group-focus-visible:scale-x-100',
          next ? 'origin-right' : 'origin-left',
        )}
        style={{ background: `linear-gradient(${next ? 270 : 90}deg, ${link.accent}29, transparent)` }}
      />
      <span className="relative flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.24em] text-muted">
        {next ? null : <ArrowLeftIcon aria-hidden="true" className="size-3.5" />}
        {next ? 'Next' : 'Previous'}
        {next ? <ArrowRightIcon aria-hidden="true" className="size-3.5" /> : null}
      </span>
      <span className={cn('relative flex items-center gap-4', next && 'flex-row-reverse')}>
        <span
          className="flex size-12 shrink-0 items-center justify-center rounded-xl border border-line-strong transition-transform duration-700 ease-[var(--ease-spring)] group-hover:scale-110 group-hover:rotate-[-8deg]"
          style={{ color: link.accent, backgroundColor: `${link.accent}1a` }}
        >
          <ToolIcon name={link.icon} className="size-5" strokeWidth={1.7} />
        </span>
        <span className="text-2xl font-medium tracking-[-0.04em] transition-transform duration-700 ease-[var(--ease-out-expo)] md:text-4xl">
          {link.label}
        </span>
      </span>
    </TransitionLink>
  )
}

export function Pager({ previous, next, label }: { previous: PagerLink; next: PagerLink; label: string }) {
  return (
    <nav aria-label={label} className="mx-auto max-w-7xl px-6 md:px-10">
      <div className="grid overflow-hidden rounded-[28px] border border-line md:grid-cols-2">
        <PagerItem link={previous} direction="previous" />
        <div className="border-t border-line md:border-l md:border-t-0">
          <PagerItem link={next} direction="next" />
        </div>
      </div>
    </nav>
  )
}
