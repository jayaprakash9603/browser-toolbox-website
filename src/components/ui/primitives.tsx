import type { ReactNode } from 'react'

import { cn } from '@/lib/cn'

export function ChapterLabel({ index, children, className }: { index?: string; children: ReactNode; className?: string }) {
  return (
    <p className={cn('flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.28em] text-muted', className)}>
      {index ? <span className="text-ink">{index}</span> : null}
      {index ? <span aria-hidden="true" className="h-px w-8 bg-line-strong" /> : null}
      <span>{children}</span>
    </p>
  )
}

export function Keycap({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <kbd
      className={cn(
        'inline-flex min-w-[2.25em] items-center justify-center rounded-md border border-line-strong bg-elevated px-2 py-1 font-mono text-[0.75em] font-medium text-ink-soft shadow-[inset_0_-2px_0_rgb(255_255_255/0.06),0_1px_0_rgb(0_0_0/0.6)]',
        className,
      )}
    >
      {children}
    </kbd>
  )
}

export function Badge({ children, className, tone = 'default' }: { children: ReactNode; className?: string; tone?: 'default' | 'beta' | 'accent' }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[10.5px] uppercase tracking-[0.16em]',
        tone === 'default' && 'border-line-strong text-ink-soft',
        tone === 'beta' && 'border-amber/40 bg-amber/10 text-amber',
        tone === 'accent' && 'border-[color-mix(in_srgb,var(--accent)_45%,transparent)] bg-[color-mix(in_srgb,var(--accent)_12%,transparent)] text-ink',
        className,
      )}
    >
      {children}
    </span>
  )
}

export function buttonClasses(variant: 'primary' | 'ghost' | 'outline' = 'primary', size: 'md' | 'lg' = 'md') {
  return cn(
    'group/button relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-full font-medium tracking-tight transition-[background-color,border-color,color,box-shadow] duration-300 ease-[var(--ease-out-expo)] focus-visible:outline-offset-4',
    size === 'md' && 'h-11 px-5 text-sm',
    size === 'lg' && 'h-14 px-7 text-base md:h-16 md:px-9 md:text-lg',
    variant === 'primary' &&
      'bg-ink text-canvas shadow-[0_0_0_1px_rgb(255_255_255/0.2),0_20px_60px_-20px_rgb(99_102_241/0.9)] hover:bg-white hover:shadow-[0_0_0_1px_rgb(255_255_255/0.4),0_24px_80px_-16px_rgb(34_211_238/0.8)]',
    variant === 'outline' && 'border border-line-strong text-ink hover:border-white/40 hover:bg-white/5',
    variant === 'ghost' && 'text-ink-soft hover:bg-white/5 hover:text-ink',
  )
}

/** Text that rolls up to a duplicate on hover; used inside buttons. */
export function RollText({ children }: { children: string }) {
  return (
    <span className="relative inline-flex overflow-hidden">
      <span className="transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover/button:-translate-y-full motion-reduce:transition-none">
        {children}
      </span>
      <span
        aria-hidden="true"
        className="absolute inset-0 translate-y-full transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover/button:translate-y-0 motion-reduce:transition-none"
      >
        {children}
      </span>
    </span>
  )
}

export function ChromeGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={cn('size-5', className)}>
      <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12 8h9M8.5 14 4 6.2M15.5 14 11 21.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}
