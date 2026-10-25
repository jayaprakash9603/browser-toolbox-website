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

interface PinnedWalkthroughProps {
  index: string
  title: string
  em?: string
  steps: WalkStep[]
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
  index,
  title,
  em,
  steps,
  children,
  flip = false,
}: PinnedWalkthroughProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const pinRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLSpanElement>(null)
  const listeners = useRef(new Set<(progress: number) => void>())
  const [pinned, setPinned] = useState(false)
  const [active, setActive] = useState(0)

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
        refreshPriority: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          listeners.current.forEach((listener) => listener(self.progress))
          if (progressRef.current) progressRef.current.style.transform = `scaleY(${self.progress})`
        },
      })
      ScrollTrigger.sort()
      ScrollTrigger.refresh()
      return () => trigger.kill()
    },
    { dependencies: [pinned, steps.length], scope: sectionRef, revertOnUpdate: true },
  )

  return (
    <section
      ref={sectionRef}
      data-chapter="How it works"
      aria-label="How it works"
      className="relative"
    >
      <div
        ref={pinRef}
        className={cn(
          'relative mx-auto max-w-7xl px-6 md:px-10',
          pinned ? 'flex h-[100svh] items-center' : 'py-24 md:py-32',
        )}
      >
        <div
          className={cn(
            'grid w-full items-center gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16',
            flip && 'lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]',
          )}
        >
          <div className={cn(flip && 'lg:order-2')}>
            <ChapterHead index={index} eyebrow="How it works" title={title} em={em} />
            <div className="relative mt-10">
              <span
                aria-hidden="true"
                className="absolute bottom-2 left-[13px] top-2 w-px bg-line"
              />
              <span
                ref={progressRef}
                aria-hidden="true"
                className="absolute bottom-2 left-[13px] top-2 w-px origin-top bg-[var(--accent)]"
                style={{ transform: pinned ? 'scaleY(0)' : 'scaleY(1)' }}
              />
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
                        <div
                          className={cn(
                            'grid transition-[grid-template-rows] duration-500 ease-[var(--ease-out-expo)]',
                            on ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
                          )}
                        >
                          <p className="overflow-hidden text-[15px] leading-relaxed text-muted">
                            <span className="block pt-1.5">{step.body}</span>
                          </p>
                        </div>
                      </div>
                    </li>
                  )
                })}
              </ol>
            </div>
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
