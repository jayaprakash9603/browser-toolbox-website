'use client'

import { SearchIcon } from 'lucide-react'
import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from 'react'

import { LogoMark } from '@/components/ui/Logo'
import { ToolIcon } from '@/components/ui/ToolIcon'
import { cn } from '@/lib/cn'
import { gsap, MOTION_QUERIES, prefersReducedMotion, ScrollTrigger, useGSAP } from '@/motion/gsap'

const CYCLE_SECONDS = 3.6

function hash(value: string) {
  let h = 2166136261
  for (let i = 0; i < value.length; i += 1) h = Math.imul(h ^ value.charCodeAt(i), 16777619)
  return h >>> 0
}

/** Decorative skeleton layouts; the variant is picked from the feature name so every tool looks a little different. */
function Skeleton({ variant, seed }: { variant: number; seed: number }) {
  const widths = Array.from({ length: 9 }, (_, i) => 35 + ((seed >> (i * 3)) & 0x3f) % 60)
  switch (variant) {
    case 0:
      return (
        <div className="space-y-2 rounded-xl border border-line bg-canvas/70 p-3 font-mono">
          {widths.slice(0, 7).map((width, i) => (
            <div key={i} data-mock-item="" className="flex items-center gap-2">
              <span className="w-4 text-right text-[9px] text-muted/60">{i + 1}</span>
              <span className="h-2 rounded-full bg-[var(--accent)]/45" style={{ width: `${width * 0.35}%`, marginLeft: `${(i % 3) * 6}%` }} />
              <span className="h-2 rounded-full bg-white/10" style={{ width: `${width * 0.4}%` }} />
            </div>
          ))}
        </div>
      )
    case 1:
      return (
        <div className="space-y-2">
          {widths.slice(0, 4).map((width, i) => (
            <div key={i} data-mock-item="" className="flex items-center gap-3 rounded-xl border border-line bg-canvas/70 p-2.5">
              <span className="size-7 shrink-0 rounded-lg bg-[var(--accent)]/25" />
              <span className="flex-1 space-y-1.5">
                <span className="block h-2 rounded-full bg-white/20" style={{ width: `${width}%` }} />
                <span className="block h-1.5 rounded-full bg-white/[0.08]" style={{ width: `${width * 0.6}%` }} />
              </span>
              <span className={cn('h-4 w-7 rounded-full p-0.5', i % 2 === 0 ? 'bg-[var(--accent)]' : 'bg-white/15')}>
                <span className={cn('block size-3 rounded-full bg-white', i % 2 === 0 && 'translate-x-3')} />
              </span>
            </div>
          ))}
        </div>
      )
    case 2:
      return (
        <div className="grid grid-cols-3 gap-2">
          {widths.slice(0, 6).map((width, i) => (
            <div key={i} data-mock-item="" className="aspect-square rounded-xl border border-line bg-canvas/70 p-2">
              <span className="block h-full rounded-lg" style={{ backgroundColor: `color-mix(in srgb, var(--accent) ${15 + (width % 40)}%, transparent)` }} />
            </div>
          ))}
        </div>
      )
    default:
      return (
        <div className="rounded-xl border border-line bg-canvas/70 p-3">
          <div className="flex h-28 items-end gap-1.5">
            {widths.map((width, i) => (
              <span
                key={i}
                data-mock-item=""
                className="flex-1 origin-bottom rounded-t-md bg-gradient-to-t from-[var(--accent)]/30 to-[var(--accent)]"
                style={{ height: `${width}%` }}
              />
            ))}
          </div>
          <div className="mt-3 flex justify-between font-mono text-[9px] text-muted">
            <span>min</span>
            <span>avg</span>
            <span>max</span>
          </div>
        </div>
      )
  }
}

interface PanelMockProps {
  toolName: string
  icon: string
  accent: string
  features: string[]
}

export function PanelMock({ toolName, icon, accent, features }: PanelMockProps) {
  const tabs = features.slice(0, 4)
  const rootRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const [inView, setInView] = useState(false)
  const progressRef = useRef<HTMLSpanElement>(null)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])

  // Viewport visibility gates the auto-cycle.
  useGSAP(
    () => {
      const trigger = ScrollTrigger.create({
        trigger: rootRef.current,
        start: 'top bottom',
        end: 'bottom top',
        onToggle: (self) => setInView(self.isActive),
      })
      return () => trigger.kill()
    },
    { scope: rootRef },
  )

  // Progress bar drives the cycle so it can pause and resume exactly where it was.
  useEffect(() => {
    const bar = progressRef.current
    if (!bar || tabs.length < 2 || prefersReducedMotion()) return
    const tween = gsap.fromTo(
      bar,
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: CYCLE_SECONDS,
        ease: 'none',
        paused: true,
        onComplete: () => setActive((index) => (index + 1) % tabs.length),
      },
    )
    if (inView && !paused) tween.play()
    return () => {
      tween.kill()
    }
  }, [active, paused, inView, tabs.length])

  // Content swap animation.
  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MOTION_QUERIES.motion, () => {
        gsap.from('[data-mock-pane] [data-mock-item]', {
          y: 14,
          opacity: 0,
          scale: 0.97,
          duration: 0.6,
          stagger: 0.045,
          ease: 'expo.out',
        })
        gsap.from('[data-mock-caption]', { y: 10, opacity: 0, duration: 0.5, ease: 'expo.out' })
      })
      return () => mm.revert()
    },
    { scope: rootRef, dependencies: [active] },
  )

  const onTabKey = (event: KeyboardEvent<HTMLButtonElement>) => {
    const delta = event.key === 'ArrowRight' ? 1 : event.key === 'ArrowLeft' ? -1 : 0
    if (!delta) return
    event.preventDefault()
    const next = (active + delta + tabs.length) % tabs.length
    setActive(next)
    tabRefs.current[next]?.focus()
  }

  const feature = tabs[active] ?? toolName
  const seed = hash(`${toolName}:${feature}`)
  const variant = (hash(toolName) + active) % 4

  return (
    <div
      ref={rootRef}
      style={{ '--accent': accent } as CSSProperties}
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      className="relative"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-10 rounded-[48px] opacity-70 blur-3xl"
        style={{ background: `radial-gradient(60% 60% at 50% 40%, ${accent}40, transparent 70%)` }}
      />
      <div className="relative overflow-hidden rounded-[28px] border border-line-strong bg-surface/95 shadow-[0_40px_120px_-40px_rgb(0_0_0/0.9)] backdrop-blur">
        <div className="flex items-center gap-2 border-b border-line px-4 py-3">
          <LogoMark className="size-4" />
          <span className="text-xs font-medium text-ink-soft">Toolbox</span>
          <span className="ml-auto flex h-7 w-40 items-center gap-2 rounded-full border border-line bg-canvas/80 px-2.5 text-[11px] text-muted">
            <SearchIcon aria-hidden="true" className="size-3" /> Search tools
          </span>
        </div>
        <div className="flex items-center gap-3 px-5 pt-5">
          <span className="flex size-10 items-center justify-center rounded-xl border border-line-strong text-[var(--accent)]" style={{ backgroundColor: `${accent}1f` }}>
            <ToolIcon name={icon} className="size-5" strokeWidth={1.7} />
          </span>
          <div>
            <p className="text-sm font-medium">{toolName}</p>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">Side panel</p>
          </div>
        </div>

        {tabs.length > 1 ? (
          <div role="tablist" aria-label={`${toolName} features`} className="no-scrollbar mx-5 mt-5 flex gap-1 overflow-x-auto rounded-full border border-line bg-canvas/70 p-1">
            {tabs.map((tab, index) => (
              <button
                key={tab}
                ref={(element) => {
                  tabRefs.current[index] = element
                }}
                type="button"
                role="tab"
                id={`mock-tab-${index}`}
                aria-selected={index === active}
                aria-controls="mock-pane"
                tabIndex={index === active ? 0 : -1}
                onClick={() => setActive(index)}
                onKeyDown={onTabKey}
                className={cn(
                  'relative shrink-0 overflow-hidden whitespace-nowrap rounded-full px-3 py-1.5 text-[11.5px] transition-colors duration-300',
                  index === active ? 'bg-white/10 text-ink' : 'text-muted hover:text-ink-soft',
                )}
              >
                {tab}
                {index === active ? (
                  <span ref={progressRef} aria-hidden="true" className="absolute inset-x-3 bottom-0.5 h-px origin-left bg-[var(--accent)]" />
                ) : null}
              </button>
            ))}
          </div>
        ) : null}

        <div id="mock-pane" role={tabs.length > 1 ? 'tabpanel' : undefined} aria-labelledby={tabs.length > 1 ? `mock-tab-${active}` : undefined} data-mock-pane="" className="p-5">
          <p data-mock-caption="" className="mb-4 text-sm text-ink-soft">
            {feature}
          </p>
          <div aria-hidden="true">
            <Skeleton variant={variant} seed={seed} />
          </div>
        </div>
        <div className="flex items-center justify-between border-t border-line px-5 py-3 font-mono text-[10px] text-muted">
          <span className="flex items-center gap-1.5">
            <span className="size-1.5 rounded-full bg-emerald" /> Ready
          </span>
          <span>
            {String(active + 1).padStart(2, '0')} / {String(Math.max(tabs.length, 1)).padStart(2, '0')}
          </span>
        </div>
      </div>
    </div>
  )
}
