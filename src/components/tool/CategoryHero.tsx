'use client'

import { useRef, type CSSProperties } from 'react'

import { ToolIcon } from '@/components/ui/ToolIcon'
import { gsap, MOTION_QUERIES, SplitText, useGSAP } from '@/motion/gsap'
import { onIntroDone } from '@/motion/intro'
import { getNavigationKind } from '@/motion/navigation'

import { Breadcrumbs, type Crumb } from './Breadcrumbs'

interface CategoryHeroProps {
  name: string
  description: string
  icon: string
  accent: string
  index: number
  total: number
  toolCount: number
  crumbs: Crumb[]
}

export function CategoryHero({
  name,
  description,
  icon,
  accent,
  index,
  total,
  toolCount,
  crumbs,
}: CategoryHeroProps) {
  const rootRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const root = rootRef.current
      if (!root) return
      const mm = gsap.matchMedia()
      mm.add(MOTION_QUERIES.motion, () => {
        const split = SplitText.create('[data-category-title]', {
          type: 'lines,chars',
          mask: 'lines',
          linesClass: 'split-mask',
        })
        const strokes = root.querySelectorAll('[data-category-icon] svg > *')
        const tl = gsap.timeline({
          paused: true,
          delay: getNavigationKind() === 'curtain' ? 0.5 : 0.1,
          defaults: { ease: 'expo.out' },
        })
        tl.from(split.chars, { yPercent: 118, duration: 1.1, stagger: 0.025 }, 0)
          .from(strokes, { drawSVG: '0%', duration: 1.8, stagger: 0.12, ease: 'power2.inOut' }, 0.1)
          .from('[data-category-icon]', { scale: 0.7, rotate: -10, duration: 1.8 }, 0.1)
          .from('[data-category-fade]', { y: 24, opacity: 0, duration: 0.9, stagger: 0.08 }, 0.3)
        root.removeAttribute('data-reveal-pending')
        const stop = onIntroDone(() => tl.play())

        gsap.to('[data-category-icon]', {
          yPercent: 20,
          rotate: 8,
          ease: 'none',
          scrollTrigger: { trigger: root, start: 'top top', end: 'bottom top', scrub: true },
        })
        return () => {
          stop()
          split.revert()
        }
      })
      mm.add(MOTION_QUERIES.reduce, () => root.removeAttribute('data-reveal-pending'))
      return () => mm.revert()
    },
    { scope: rootRef },
  )

  return (
    <section
      ref={rootRef}
      data-reveal-pending=""
      style={{ '--accent': accent } as CSSProperties}
      className="relative overflow-hidden pb-16 pt-32 md:pb-24 md:pt-44"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden [mask-image:linear-gradient(to_bottom,black_35%,transparent)]"
      >
        <div
          className="absolute -right-40 top-0 size-[760px] rounded-full opacity-50 blur-3xl"
          style={{ background: `radial-gradient(circle, ${accent}38, transparent 65%)` }}
        />
      </div>
      <div className="relative mx-auto grid max-w-7xl gap-12 px-6 md:px-10 lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          <div data-category-fade="">
            <Breadcrumbs items={crumbs} />
          </div>
          <p
            data-category-fade=""
            className="mt-10 font-mono text-[11px] uppercase tracking-[0.28em] text-muted"
          >
            Category <span className="text-ink">{String(index + 1).padStart(2, '0')}</span> of{' '}
            {total}
          </p>
          <h1
            data-category-title=""
            className="mt-5 text-[clamp(2.5rem,8.5vw,9rem)] font-medium leading-[0.92] tracking-[-0.06em] [overflow-wrap:anywhere]"
          >
            {name}
          </h1>
          <div data-category-fade="" className="mt-8 flex flex-wrap items-end gap-x-10 gap-y-4">
            <p className="max-w-xl text-lg leading-relaxed text-ink-soft md:text-xl">
              {description}
            </p>
            <p className="font-mono text-sm text-muted">
              <span className="text-3xl font-medium tracking-tight text-ink">{toolCount}</span>{' '}
              {toolCount === 1 ? 'tool' : 'tools'}
            </p>
          </div>
        </div>
        <div
          data-category-icon=""
          aria-hidden="true"
          className="hidden size-64 items-center justify-center rounded-[48px] border border-line-strong lg:flex"
          style={{ color: accent, backgroundColor: `${accent}12` }}
        >
          <ToolIcon name={icon} className="size-32" strokeWidth={1} />
        </div>
      </div>
    </section>
  )
}
