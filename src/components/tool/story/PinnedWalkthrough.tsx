'use client'

import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react'

import { DemoScrubContext, type ScrubLink } from '@/components/tool/stage/context'
import { cn } from '@/lib/cn'
import { MOTION_QUERIES, ScrollTrigger, useGSAP } from '@/motion/gsapExtra'

import { ChapterHead } from './Chapter'

export interface WalkStep {
  title: string
  body: string
}

/** How the steps beside the scrubbed demo are drawn. */
export type WalkVariant = 'rail' | 'cards' | 'counter' | 'ticks'

interface PinnedWalkthroughProps {
  /** A bespoke heading; replaces the `index`/`title`/`em` chapter head. */
  head?: ReactNode
  index?: string
  title?: string
  em?: string
  steps: WalkStep[]
  variant?: WalkVariant
  /** Decorative layer behind the pinned frame. */
  art?: ReactNode
  /** The tool's `<Demo />`; it is scrubbed by scroll while the section is pinned. */
  children: ReactNode
  /** Put the demo on the left instead of the right. */
  flip?: boolean
}

/**
 * The page's single pinned section. On wide screens with motion allowed, scrolling scrubs the
 * same demo timeline the hero loops; otherwise it is a plain demo plus an ordered list.
 */
export function PinnedWalkthrough({
  head,
  index = '02',
  title = 'How it works',
  em,
  steps,
  variant = 'rail',
  art,
  children,
  flip = false,
}: PinnedWalkthroughProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const pinRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLSpanElement>(null)
  const listeners = useRef(new Set<(progress: number) => void>())
  const [pinned, setPinned] = useState(false)
  const [active, setActive] = useState(0)
  const axis = variant === 'rail' ? 'scaleY' : 'scaleX'

  const link = useMemo<ScrubLink>(
    () => ({
      subscribe: (listener) => {
        listeners.current.add(listener)
        return () => {
          listeners.current.delete(listener)
        }
      },
      onStep: setActive,
    }),
    [],
  )

  useEffect(() => {
    const query = window.matchMedia(
      `${MOTION_QUERIES.motion} and (min-width: 1024px) and (min-height: 640px)`,
    )
    const update = () => setPinned(query.matches)
    update()
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])

  useGSAP(
    () => {
      if (!pinned || !sectionRef.current || !pinRef.current) return
      const trigger = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: () => `+=${Math.round(steps.length * window.innerHeight * 0.8)}`,
        pin: pinRef.current,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          listeners.current.forEach((listener) => listener(self.progress))
          if (progressRef.current) progressRef.current.style.transform = `${axis}(${self.progress})`
        },
      })
      ScrollTrigger.sort()
      ScrollTrigger.refresh()
      return () => trigger.kill()
    },
    { dependencies: [pinned, steps.length, axis], scope: sectionRef, revertOnUpdate: true },
  )

  const progress = (className: string) => (
    <span
      ref={progressRef}
      aria-hidden="true"
      className={cn('absolute bg-[var(--accent)]', className)}
      style={{ transform: `${axis}(${pinned ? 0 : 1})` }}
    />
  )
  const body = (on: boolean, text: string) => (
    <div
      className={cn(
        'grid transition-[grid-template-rows] duration-500 ease-[var(--ease-out-expo)]',
        on ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
      )}
    >
      <p className="overflow-hidden text-[15px] leading-relaxed text-muted">
        <span className="block pt-1.5">{text}</span>
      </p>
    </div>
  )

  let list: ReactNode
  if (variant === 'cards') {
    list = (
      <ol className="mt-10 space-y-3">
        {steps.map((step, stepIndex) => {
          const on = !pinned || stepIndex === active
          return (
            <li
              key={step.title}
              className={cn(
                'rounded-2xl border px-5 py-4 transition-[border-color,background-color] duration-500',
                pinned && on
                  ? 'border-[color-mix(in_srgb,var(--accent)_55%,transparent)] bg-[color-mix(in_srgb,var(--accent)_8%,transparent)]'
                  : 'border-line bg-white/[0.015]',
              )}
            >
              <p className="flex items-baseline gap-3">
                <span className="font-mono text-xs text-[var(--accent)]">
                  {String(stepIndex + 1).padStart(2, '0')}
                </span>
                <span
                  className={cn(
                    'text-lg font-medium tracking-tight transition-colors duration-500',
                    on ? 'text-ink' : 'text-muted',
                  )}
                >
                  {step.title}
                </span>
              </p>
              {body(on, step.body)}
            </li>
          )
        })}
      </ol>
    )
  } else if (variant === 'counter') {
    list = (
      <div className="mt-10">
        <div className="relative h-px w-full bg-line">{progress('inset-0 origin-left')}</div>
        {pinned ? (
          <p
            aria-hidden="true"
            className="mt-8 font-serif text-[clamp(5rem,9vw,8rem)] italic leading-none text-[var(--accent)]"
          >
            {String(active + 1).padStart(2, '0')}
            <span className="text-3xl text-muted">/{String(steps.length).padStart(2, '0')}</span>
          </p>
        ) : null}
        <ol className={cn('mt-6', pinned ? 'grid [&>*]:[grid-area:1/1]' : 'space-y-6')}>
          {steps.map((step, stepIndex) => {
            const on = !pinned || stepIndex === active
            return (
              <li
                key={step.title}
                className={cn(
                  'transition-[opacity,transform] duration-500',
                  on ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0',
                )}
              >
                <p className="text-2xl font-medium tracking-tight text-ink">
                  {pinned ? null : (
                    <span className="mr-3 font-mono text-sm text-[var(--accent)]">
                      {String(stepIndex + 1).padStart(2, '0')}
                    </span>
                  )}
                  {step.title}
                </p>
                <p className="mt-2 max-w-md text-[15px] leading-relaxed text-muted">{step.body}</p>
              </li>
            )
          })}
        </ol>
      </div>
    )
  } else if (variant === 'ticks') {
    list = (
      <div className="mt-10">
        <div aria-hidden="true" className="flex gap-1.5">
          {steps.map((step, stepIndex) => (
            <span
              key={step.title}
              className={cn(
                'h-1 flex-1 rounded-full transition-colors duration-500',
                !pinned || stepIndex <= active ? 'bg-[var(--accent)]' : 'bg-line',
              )}
            />
          ))}
        </div>
        <ol className="mt-6 space-y-4">
          {steps.map((step, stepIndex) => {
            const on = !pinned || stepIndex === active
            return (
              <li key={step.title}>
                <p
                  className={cn(
                    'flex items-center gap-3 text-lg font-medium tracking-tight transition-colors duration-500',
                    on ? 'text-ink' : 'text-muted',
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      'size-1.5 rounded-full transition-colors duration-500',
                      pinned && on ? 'bg-[var(--accent)]' : 'bg-line-strong',
                    )}
                  />
                  {step.title}
                </p>
                <div className="pl-[18px]">{body(on, step.body)}</div>
              </li>
            )
          })}
        </ol>
      </div>
    )
  } else {
    list = (
      <div className="relative mt-10">
        <span aria-hidden="true" className="absolute bottom-2 left-[13px] top-2 w-px bg-line" />
        {progress('bottom-2 left-[13px] top-2 w-px origin-top')}
        <ol className="space-y-5">
          {steps.map((step, stepIndex) => {
            const on = !pinned || stepIndex === active
            return (
              <li key={step.title} className="relative flex gap-5">
                <span
                  className={cn(
                    'relative z-10 flex size-7 shrink-0 items-center justify-center rounded-full border font-mono text-[11px] transition-colors duration-500',
                    pinned && stepIndex <= active
                      ? 'border-[var(--accent)] bg-[var(--accent)] text-canvas'
                      : 'border-line-strong bg-canvas text-ink-soft',
                  )}
                >
                  {stepIndex + 1}
                </span>
                <div>
                  <p
                    className={cn(
                      'text-lg font-medium tracking-tight transition-colors duration-500 md:text-xl',
                      on ? 'text-ink' : 'text-muted',
                    )}
                  >
                    {step.title}
                  </p>
                  {body(on, step.body)}
                </div>
              </li>
            )
          })}
        </ol>
      </div>
    )
  }

  return (
    <section
      ref={sectionRef}
      data-chapter="How it works"
      aria-label="How it works"
      className="relative isolate"
    >
      <div
        ref={pinRef}
        className={cn(
          'relative mx-auto max-w-7xl px-6 md:px-10',
          pinned ? 'flex h-[100svh] items-center' : 'py-24 md:py-32',
        )}
      >
        {art ? (
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
            {art}
          </div>
        ) : null}
        <div
          className={cn(
            'grid w-full items-center gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16',
            flip && 'lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]',
          )}
        >
          <div className={cn(flip && 'lg:order-2')}>
            {head ?? <ChapterHead index={index} eyebrow="How it works" title={title} em={em} />}
            {list}
          </div>
          <div
            className={cn('mx-auto w-full max-w-xl lg:max-w-none', flip && 'lg:order-1')}
            style={pinned ? { maxWidth: 'calc((100svh - 7rem) * 1.24)' } : undefined}
          >
            {pinned ? (
              <DemoScrubContext.Provider value={link}>{children}</DemoScrubContext.Provider>
            ) : (
              children
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
