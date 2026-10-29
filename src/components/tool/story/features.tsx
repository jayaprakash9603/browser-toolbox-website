'use client'

import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react'
import { useRef, type ReactNode, type RefObject } from 'react'

import { useToolMeta } from '@/components/tool/stage/context'
import { ToolIcon } from '@/components/ui/ToolIcon'
import { cn } from '@/lib/cn'
import { gsap, MOTION_QUERIES, useDeferredGSAP } from '@/motion/gsapExtra'
import { spotlightHandlers } from '@/motion/useSpotlight'

export interface FeatureProps {
  features: string[]
  /** One sentence per feature. */
  details?: string[]
  /** Small bespoke illustration per feature. */
  visuals?: ReactNode[]
  className?: string
}

const pad = (index: number) => String(index + 1).padStart(2, '0')

function useEntrance(
  ref: RefObject<HTMLElement | null>,
  items: string,
  from: gsap.TweenVars,
  stagger: gsap.TweenVars['stagger'] = 0.08,
) {
  useDeferredGSAP(
    () => {
      const root = ref.current
      if (!root) return
      const mm = gsap.matchMedia()
      mm.add(MOTION_QUERIES.motion, () => {
        root.removeAttribute('data-reveal-pending')
        gsap.from(root.querySelectorAll(items), {
          ...from,
          duration: 1,
          stagger,
          ease: 'expo.out',
          scrollTrigger: { trigger: root, start: 'top 80%', once: true },
        })
      })
      mm.add(MOTION_QUERIES.reduce, () => root.removeAttribute('data-reveal-pending'))
      return () => mm.revert()
    },
    { scope: ref },
  )
}

function bentoSpans(count: number) {
  const patterns = [
    [4, 2],
    [2, 4],
    [3, 3],
    [2, 2, 2],
  ]
  const spans: number[] = []
  let row = 0
  while (spans.length < count) {
    const remaining = count - spans.length
    if (remaining === 1) spans.push(6)
    else {
      const pattern = patterns
        .slice(row % patterns.length)
        .concat(patterns)
        .find((candidate) => candidate.length <= remaining) ?? [3, 3]
      spans.push(...pattern)
    }
    row += 1
  }
  return spans
}

const SPAN_CLASS: Record<number, string> = {
  2: 'md:col-span-2',
  3: 'md:col-span-3',
  4: 'md:col-span-4',
  6: 'md:col-span-6',
}

/** Asymmetric bento grid with spotlight borders. */
export function FeatureBento({ features, details, visuals, className }: FeatureProps) {
  const ref = useRef<HTMLUListElement>(null)
  useEntrance(ref, '[data-f]', { y: 50, opacity: 0, rotateX: 10, transformPerspective: 900 })
  const spans = bentoSpans(features.length)
  return (
    <ul ref={ref} data-reveal-pending="" className={cn('grid gap-4 md:grid-cols-6', className)}>
      {features.map((feature, index) => (
        <li
          key={feature}
          data-f=""
          {...spotlightHandlers()}
          className={cn(
            'spotlight group relative flex min-h-56 flex-col overflow-hidden rounded-3xl border border-line bg-surface p-7',
            SPAN_CLASS[spans[index]],
          )}
        >
          <span className="font-mono text-[11px] text-muted">{pad(index)}</span>
          <div className="relative mt-auto flex-1 py-6">{visuals?.[index]}</div>
          <p className="text-2xl font-medium tracking-[-0.035em]">{feature}</p>
          {details?.[index] ? (
            <p className="mt-2 max-w-md text-[15px] leading-relaxed text-muted">{details[index]}</p>
          ) : null}
        </li>
      ))}
    </ul>
  )
}

/** Horizontal, snap-scrolling reel of oversized numbered cards. */
export function FeatureReel({ features, details, visuals, className }: FeatureProps) {
  const ref = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLUListElement>(null)
  useEntrance(
    ref,
    '[data-f]',
    { x: 160, opacity: 0, rotateY: -18, transformPerspective: 1200 },
    0.07,
  )
  const nudge = (direction: number) =>
    trackRef.current?.scrollBy({ left: direction * 340, behavior: 'smooth' })
  return (
    <div ref={ref} data-reveal-pending="" className={cn('relative', className)}>
      <div className="mb-6 flex justify-end gap-2">
        <button
          type="button"
          onClick={() => nudge(-1)}
          aria-label="Previous features"
          className="flex size-11 items-center justify-center rounded-full border border-line-strong text-ink-soft hover:text-ink"
        >
          <ArrowLeftIcon aria-hidden="true" className="size-4" />
        </button>
        <button
          type="button"
          onClick={() => nudge(1)}
          aria-label="Next features"
          className="flex size-11 items-center justify-center rounded-full border border-line-strong text-ink-soft hover:text-ink"
        >
          <ArrowRightIcon aria-hidden="true" className="size-4" />
        </button>
      </div>
      <ul
        ref={trackRef}
        className="no-scrollbar -mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-4 md:-mx-10 md:px-10"
      >
        {features.map((feature, index) => (
          <li
            key={feature}
            data-f=""
            className="relative flex min-h-[22rem] w-[19rem] shrink-0 snap-start flex-col overflow-hidden rounded-[28px] border border-line bg-surface p-7 md:w-[22rem]"
          >
            <span
              aria-hidden="true"
              className="text-outline absolute -right-2 -top-6 font-serif text-[9rem] italic leading-none"
            >
              {index + 1}
            </span>
            <div className="relative flex-1">{visuals?.[index]}</div>
            <p className="relative text-2xl font-medium tracking-[-0.035em]">{feature}</p>
            {details?.[index] ? (
              <p className="relative mt-2 text-[15px] leading-relaxed text-muted">
                {details[index]}
              </p>
            ) : null}
            <span
              aria-hidden="true"
              className="relative mt-6 h-px w-full origin-left bg-gradient-to-r from-[var(--accent)] to-transparent"
            />
          </li>
        ))}
      </ul>
    </div>
  )
}

/** Features riding a slowly turning ring around the tool icon. */
export function FeatureOrbit({ features, details, className }: FeatureProps) {
  const ref = useRef<HTMLDivElement>(null)
  const meta = useToolMeta()
  useEntrance(ref, '[data-f]', { scale: 0, opacity: 0 }, { each: 0.08, from: 'random' })
  return (
    <div
      ref={ref}
      data-reveal-pending=""
      className={cn('grid items-center gap-12 lg:grid-cols-2', className)}
    >
      <div
        aria-hidden="true"
        className="group relative mx-auto hidden aspect-square w-full max-w-[34rem] lg:block"
      >
        <span className="absolute inset-[8%] rounded-full border border-dashed border-line-strong" />
        <span className="absolute inset-[26%] rounded-full border border-line" />
        <span className="absolute inset-[40%] flex items-center justify-center rounded-full border border-line-strong bg-[color-mix(in_srgb,var(--accent)_14%,transparent)] text-[var(--accent)] shadow-[0_0_80px_color-mix(in_srgb,var(--accent)_35%,transparent)]">
          <ToolIcon name={meta.icon} className="size-12" strokeWidth={1.4} />
        </span>
        <div className="absolute inset-[8%] motion-safe:animate-[orbit-spin_70s_linear_infinite] group-hover:[animation-play-state:paused]">
          {features.map((feature, index) => {
            const angle = (index / features.length) * Math.PI * 2 - Math.PI / 2
            return (
              <span
                key={feature}
                className="absolute"
                style={{
                  left: `${50 + Math.cos(angle) * 50}%`,
                  top: `${50 + Math.sin(angle) * 50}%`,
                }}
              >
                <span className="block -translate-x-1/2 -translate-y-1/2 motion-safe:animate-[orbit-spin_70s_linear_infinite_reverse] group-hover:[animation-play-state:paused]">
                  <span
                    data-f=""
                    className="block whitespace-nowrap rounded-full border border-line-strong bg-elevated px-4 py-2 text-sm text-ink shadow-[0_10px_30px_-10px_rgb(0_0_0/0.8)]"
                  >
                    {feature}
                  </span>
                </span>
              </span>
            )
          })}
        </div>
      </div>
      <ol className="space-y-px overflow-hidden rounded-3xl border border-line">
        {features.map((feature, index) => (
          <li key={feature} className="flex items-baseline gap-5 bg-surface px-6 py-5">
            <span className="font-mono text-[11px] text-[var(--accent)]">{pad(index)}</span>
            <span>
              <span className="block text-xl font-medium tracking-tight">{feature}</span>
              {details?.[index] ? (
                <span className="mt-1 block text-[15px] text-muted">{details[index]}</span>
              ) : null}
            </span>
          </li>
        ))}
      </ol>
    </div>
  )
}

/** Sticky cards that stack and recede as the next one arrives. */
export function FeatureStack({ features, details, visuals, className }: FeatureProps) {
  const ref = useRef<HTMLOListElement>(null)
  useDeferredGSAP(
    () => {
      const root = ref.current
      if (!root) return
      const mm = gsap.matchMedia()
      mm.add(MOTION_QUERIES.motion, () => {
        const cards = gsap.utils.toArray<HTMLElement>('[data-f-card]', root)
        cards.forEach((card, index) => {
          if (index === cards.length - 1) return
          gsap.to(card, {
            scale: 1 - (cards.length - index) * 0.035,
            filter: 'brightness(0.55)',
            ease: 'none',
            scrollTrigger: {
              trigger: cards[index + 1],
              start: 'top bottom',
              end: 'top 30%',
              scrub: true,
            },
          })
        })
      })
      return () => mm.revert()
    },
    { scope: ref },
  )
  return (
    <ol ref={ref} className={cn('relative mx-auto max-w-4xl', className)}>
      {features.map((feature, index) => (
        <li
          key={feature}
          className="sticky mb-8"
          style={{ top: `calc(var(--header-h) + 2rem + ${index * 1.1}rem)` }}
        >
          <div
            data-f-card=""
            className="grid min-h-72 origin-top gap-6 overflow-hidden rounded-[32px] border border-line-strong bg-elevated p-8 shadow-[0_-20px_60px_-30px_rgb(0_0_0/0.9)] md:grid-cols-[1fr_1fr] md:p-10"
          >
            <div className="flex flex-col">
              <span className="font-mono text-[11px] text-[var(--accent)]">
                {pad(index)} / {pad(features.length - 1)}
              </span>
              <p className="mt-auto text-3xl font-medium tracking-[-0.04em] md:text-4xl">
                {feature}
              </p>
              {details?.[index] ? (
                <p className="mt-3 text-[15px] leading-relaxed text-muted">{details[index]}</p>
              ) : null}
            </div>
            <div className="relative min-h-40 overflow-hidden rounded-2xl border border-line bg-canvas/60">
              {visuals?.[index]}
            </div>
          </div>
        </li>
      ))}
    </ol>
  )
}

/** Big rows that decode on entry and fill with the accent on hover. */
export function FeatureTicker({ features, details, className }: FeatureProps) {
  const ref = useRef<HTMLOListElement>(null)
  useDeferredGSAP(
    () => {
      const root = ref.current
      if (!root) return
      const mm = gsap.matchMedia()
      mm.add(MOTION_QUERIES.motion, () => {
        root.querySelectorAll<HTMLElement>('[data-f-title]').forEach((title, index) => {
          gsap.from(title, {
            duration: 1.2,
            delay: index * 0.06,
            scrambleText: { text: '{original}', chars: 'upperCase', speed: 0.5, revealDelay: 0.2 },
            opacity: 0,
            scrollTrigger: { trigger: title, start: 'top 88%', once: true },
          })
        })
      })
      return () => mm.revert()
    },
    { scope: ref },
  )
  return (
    <ol ref={ref} className={cn('border-t border-line', className)}>
      {features.map((feature, index) => (
        <li
          key={feature}
          className="group relative isolate grid gap-2 overflow-hidden border-b border-line py-7 md:grid-cols-[4rem_1fr_minmax(0,22rem)] md:items-baseline md:py-9"
        >
          <span
            aria-hidden="true"
            className="absolute inset-0 -z-10 origin-left scale-x-0 bg-[color-mix(in_srgb,var(--accent)_12%,transparent)] transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-x-100"
          />
          <span className="font-mono text-xs text-muted">{pad(index)}</span>
          <span
            data-f-title=""
            className="text-3xl font-medium tracking-[-0.04em] transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-3 md:text-5xl"
          >
            {feature}
          </span>
          {details?.[index] ? (
            <span className="text-[15px] leading-relaxed text-muted">{details[index]}</span>
          ) : (
            <span />
          )}
        </li>
      ))}
    </ol>
  )
}

/** Card grid that ripples in from its centre. */
export function FeatureGrid({ features, details, visuals, className }: FeatureProps) {
  const ref = useRef<HTMLUListElement>(null)
  useEntrance(
    ref,
    '[data-f]',
    { scale: 0.7, opacity: 0, y: 30 },
    { each: 0.07, from: 'center', grid: 'auto' },
  )
  return (
    <ul
      ref={ref}
      data-reveal-pending=""
      className={cn('grid gap-4 sm:grid-cols-2 lg:grid-cols-3', className)}
    >
      {features.map((feature, index) => (
        <li
          key={feature}
          data-f=""
          {...spotlightHandlers()}
          className="spotlight relative overflow-hidden rounded-3xl border border-line bg-surface p-7"
        >
          <div className="flex h-24 items-center">
            {visuals?.[index] ?? (
              <span className="flex size-12 items-center justify-center rounded-2xl border border-line-strong bg-[color-mix(in_srgb,var(--accent)_12%,transparent)] font-mono text-sm text-[var(--accent)]">
                {pad(index)}
              </span>
            )}
          </div>
          <p className="mt-4 text-xl font-medium tracking-[-0.03em]">{feature}</p>
          {details?.[index] ? (
            <p className="mt-2 text-[15px] leading-relaxed text-muted">{details[index]}</p>
          ) : null}
        </li>
      ))}
    </ul>
  )
}
