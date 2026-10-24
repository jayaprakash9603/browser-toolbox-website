import { useId } from 'react'

import { cn } from '@/lib/cn'

/** Toolbox mark: body, lid, handle and latch, plus four orbiting tool dots. Stroke-based so DrawSVG can trace it. */
export function LogoMark({ className, title }: { className?: string; title?: string }) {
  const gradientId = `logo-gradient-${useId().replace(/:/g, '')}`
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      className={cn('shrink-0', className)}
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <defs>
        <linearGradient id={gradientId} x1="6" y1="10" x2="58" y2="56" gradientUnits="userSpaceOnUse">
          <stop stopColor="#a5b4fc" />
          <stop offset="0.55" stopColor="#6366f1" />
          <stop offset="1" stopColor="#22d3ee" />
        </linearGradient>
      </defs>
      <g stroke={`url(#${gradientId})`} strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
        <path data-logo-stroke="" d="M10 29a6 6 0 0 1 6-6h32a6 6 0 0 1 6 6v18a6 6 0 0 1-6 6H16a6 6 0 0 1-6-6z" />
        <path data-logo-stroke="" d="M10 34h44" />
        <path data-logo-stroke="" d="M24 23v-4.5A4.5 4.5 0 0 1 28.5 14h7a4.5 4.5 0 0 1 4.5 4.5V23" />
        <path data-logo-stroke="" d="M28.5 31h7v6h-7z" />
      </g>
      <g fill={`url(#${gradientId})`}>
        <circle data-logo-dot="" cx="6" cy="14" r="2.6" />
        <circle data-logo-dot="" cx="58" cy="12" r="2.6" />
        <circle data-logo-dot="" cx="4" cy="44" r="2" />
        <circle data-logo-dot="" cx="60" cy="40" r="2" />
      </g>
    </svg>
  )
}

export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn('inline-flex items-center gap-2.5 font-medium tracking-tight', className)}>
      <LogoMark className="size-7" />
      <span>
        Browser <span className="font-serif text-[1.08em] italic">Toolbox</span>
      </span>
    </span>
  )
}
