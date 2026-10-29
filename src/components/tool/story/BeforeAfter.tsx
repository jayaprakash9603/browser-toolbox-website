'use client'

import { MoveHorizontalIcon } from 'lucide-react'
import { useRef, useState, type KeyboardEvent, type PointerEvent, type ReactNode } from 'react'

import { cn } from '@/lib/cn'
import { gsap, MOTION_QUERIES, useDeferredGSAP } from '@/motion/gsapExtra'

interface BeforeAfterProps {
  before: ReactNode
  after: ReactNode
  beforeLabel?: string
  afterLabel?: string
  variant?: 'wipe' | 'split' | 'stack'
  className?: string
  /** Wipe only: height of the comparison frame. */
  height?: string
}

function Tag({ children, accent = false }: { children: ReactNode; accent?: boolean }) {
  return (
    <span
      className={cn(
        'absolute left-4 top-4 z-10 rounded-full border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.2em] backdrop-blur',
        accent
          ? 'border-[color-mix(in_srgb,var(--accent)_50%,transparent)] bg-[color-mix(in_srgb,var(--accent)_18%,transparent)] text-ink'
          : 'border-line-strong bg-canvas/70 text-muted',
      )}
    >
      {children}
    </span>
  )
}

export function BeforeAfter({
  before,
  after,
  beforeLabel = 'Before',
  afterLabel = 'With One Panel',
  variant = 'split',
  className,
  height = '26rem',
}: BeforeAfterProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [split, setSplit] = useState(50)
  const dragging = useRef(false)

  useDeferredGSAP(
    () => {
      const root = ref.current
      if (!root) return
      const mm = gsap.matchMedia()
      mm.add(MOTION_QUERIES.motion, () => {
        if (variant === 'wipe') {
          const proxy = { v: 92 }
          gsap.to(proxy, {
            v: 50,
            duration: 1.6,
            ease: 'expo.inOut',
            onUpdate: () => !dragging.current && setSplit(Math.round(proxy.v * 10) / 10),
            scrollTrigger: { trigger: root, start: 'top 70%', once: true },
          })
        } else if (variant === 'split') {
          const tl = gsap.timeline({
            scrollTrigger: { trigger: root, start: 'top 75%', once: true },
          })
          tl.from('[data-ba-before]', { x: -50, opacity: 0, rotate: -2, duration: 1 })
            .from(
              '[data-ba-arrow] path',
              { drawSVG: '0%', duration: 0.8, ease: 'power2.inOut' },
              0.3,
            )
            .from(
              '[data-ba-after]',
              { x: 50, opacity: 0, rotate: 2, scale: 0.94, duration: 1.1 },
              0.45,
            )
        } else {
          const tl = gsap.timeline({
            scrollTrigger: { trigger: root, start: 'top 70%', end: 'bottom 60%', scrub: 0.8 },
          })
          tl.fromTo(
            '[data-ba-after]',
            { yPercent: 55, rotate: -5, opacity: 0.4 },
            { yPercent: 0, rotate: 0, opacity: 1, ease: 'none' },
          ).to('[data-ba-before]', { scale: 0.92, opacity: 0.35, ease: 'none' }, 0)
        }
      })
      return () => mm.revert()
    },
    { scope: ref },
  )

  if (variant === 'wipe') {
    const fromPointer = (event: PointerEvent<HTMLDivElement>) => {
      const rect = event.currentTarget.getBoundingClientRect()
      setSplit(Math.min(100, Math.max(0, ((event.clientX - rect.left) / rect.width) * 100)))
    }
    const onKey = (event: KeyboardEvent<HTMLDivElement>) => {
      const delta = event.key === 'ArrowLeft' ? -5 : event.key === 'ArrowRight' ? 5 : 0
      if (!delta) return
      event.preventDefault()
      setSplit((value) => Math.min(100, Math.max(0, value + delta)))
    }
    return (
      <div
        ref={ref}
        className={cn(
          'relative touch-pan-y select-none overflow-hidden rounded-[28px] border border-line-strong bg-surface',
          className,
        )}
        style={{ height }}
        onPointerDown={(event) => {
          dragging.current = true
          event.currentTarget.setPointerCapture(event.pointerId)
          fromPointer(event)
        }}
        onPointerMove={(event) => dragging.current && fromPointer(event)}
        onPointerUp={() => {
          dragging.current = false
        }}
      >
        <div className="absolute inset-0">
          <Tag>{beforeLabel}</Tag>
          {before}
        </div>
        <div className="absolute inset-0" style={{ clipPath: `inset(0 0 0 ${split}%)` }}>
          <span className="absolute right-4 top-4 z-10 rounded-full border border-[color-mix(in_srgb,var(--accent)_50%,transparent)] bg-[color-mix(in_srgb,var(--accent)_18%,transparent)] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-ink backdrop-blur">
            {afterLabel}
          </span>
          {after}
        </div>
        <div
          role="slider"
          tabIndex={0}
          aria-label={`Compare ${beforeLabel} and ${afterLabel}`}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(split)}
          onKeyDown={onKey}
          className="absolute inset-y-0 z-20 -ml-px w-0.5 cursor-ew-resize bg-[var(--accent)]"
          style={{ left: `${split}%` }}
        >
          <span className="absolute left-1/2 top-1/2 flex size-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-canvas/90 text-ink shadow-[0_0_40px_color-mix(in_srgb,var(--accent)_60%,transparent)]">
            <MoveHorizontalIcon aria-hidden="true" className="size-4" />
          </span>
        </div>
      </div>
    )
  }

  if (variant === 'stack') {
    return (
      <div ref={ref} className={cn('relative mx-auto max-w-4xl', className)}>
        <div
          data-ba-before=""
          className="relative origin-top overflow-hidden rounded-[28px] border border-line bg-surface p-6 md:p-8"
        >
          <Tag>{beforeLabel}</Tag>
          <div className="pt-8">{before}</div>
        </div>
        <div
          data-ba-after=""
          className="border-beam relative -mt-24 ml-6 overflow-hidden rounded-[28px] border border-line-strong bg-elevated p-6 shadow-[0_40px_100px_-30px_rgb(0_0_0/0.9)] md:ml-16 md:p-8"
        >
          <Tag accent>{afterLabel}</Tag>
          <div className="pt-8">{after}</div>
        </div>
      </div>
    )
  }

  return (
    <div ref={ref} className={cn('grid items-center gap-6 lg:grid-cols-[1fr_auto_1fr]', className)}>
      <div
        data-ba-before=""
        className="relative overflow-hidden rounded-[28px] border border-line bg-surface p-6 md:p-8"
      >
        <Tag>{beforeLabel}</Tag>
        <div className="pt-8">{before}</div>
      </div>
      <svg
        data-ba-arrow=""
        viewBox="0 0 80 24"
        aria-hidden="true"
        className="mx-auto h-6 w-20 rotate-90 text-[var(--accent)] lg:rotate-0"
      >
        <path
          d="M2 12h70M62 4l10 8-10 8"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <div
        data-ba-after=""
        className="border-beam relative overflow-hidden rounded-[28px] border border-line-strong bg-elevated p-6 md:p-8"
      >
        <Tag accent>{afterLabel}</Tag>
        <div className="pt-8">{after}</div>
      </div>
    </div>
  )
}
