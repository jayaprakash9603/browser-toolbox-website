'use client'

import { useRef, type CSSProperties } from 'react'

import { InstallButton } from '@/components/ui/InstallButton'
import { Badge, Keycap } from '@/components/ui/primitives'
import { ToolIcon } from '@/components/ui/ToolIcon'
import { SITE } from '@/config/site'
import { gsap, MOTION_QUERIES, SplitText, useGSAP } from '@/motion/gsap'
import { onIntroDone } from '@/motion/intro'
import { getNavigationKind } from '@/motion/navigation'

import { Breadcrumbs, type Crumb } from './Breadcrumbs'
import { ToolDemo } from './ToolDemo'

interface ToolHeroProps {
  id: string
  name: string
  icon: string
  accent: string
  tagline: string
  description: string
  beta: boolean
  capabilityLabels: string[]
  crumbs: Crumb[]
}

export function ToolHero({
  id,
  name,
  icon,
  accent,
  tagline,
  description,
  beta,
  capabilityLabels,
  crumbs,
}: ToolHeroProps) {
  const rootRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const root = rootRef.current
      if (!root) return
      const kind = getNavigationKind()
      const morphing = kind === 'view-transition'
      const mm = gsap.matchMedia()

      mm.add(MOTION_QUERIES.motion, () => {
        const tl = gsap.timeline({
          paused: true,
          defaults: { ease: 'expo.out' },
          delay: kind === 'curtain' ? 0.5 : 0.1,
        })
        let split: SplitText | null = null
        if (!morphing) {
          split = SplitText.create('[data-hero-title]', {
            type: 'lines,words',
            mask: 'lines',
            linesClass: 'split-mask',
          })
          tl.from(
            split.words,
            { yPercent: 118, rotate: 3, transformOrigin: '0% 100%', duration: 1.1, stagger: 0.05 },
            0,
          )
          tl.from(
            '[data-hero-icon]',
            { scale: 0.4, rotate: -24, opacity: 0, duration: 1.1, ease: 'back.out(1.8)' },
            0,
          )
        }
        tl.from(
          '[data-hero-fade]',
          { y: 26, opacity: 0, duration: 0.9, stagger: 0.07 },
          morphing ? 0.15 : 0.25,
        )
        tl.from(
          '[data-hero-mock]',
          { y: 70, rotateX: 14, opacity: 0, transformPerspective: 1400, duration: 1.4 },
          morphing ? 0.1 : 0.3,
        )
        root.removeAttribute('data-reveal-pending')

        const stop = onIntroDone(() => tl.play())

        gsap.to('[data-hero-mock]', {
          yPercent: -8,
          ease: 'none',
          scrollTrigger: { trigger: root, start: 'top top', end: 'bottom top', scrub: true },
        })

        return () => {
          stop()
          split?.revert()
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
      className="relative overflow-hidden pb-20 pt-32 md:pb-28 md:pt-40"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 h-[720px] w-[1100px] -translate-x-1/2 opacity-60 blur-3xl"
        style={{ background: `radial-gradient(50% 50% at 50% 50%, ${accent}33, transparent 70%)` }}
      />
      <div
        aria-hidden="true"
        className="hairline-grid pointer-events-none absolute inset-0 opacity-40 [mask-image:linear-gradient(to_bottom,black,transparent_80%)]"
      />

      <div className="relative mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)] gap-14 px-6 md:px-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center">
        <div>
          <div data-hero-fade="">
            <Breadcrumbs items={crumbs} />
          </div>
          <div className="mt-10 flex items-center gap-4">
            <span
              data-vt="icon"
              data-hero-icon=""
              className="flex size-16 items-center justify-center rounded-2xl border border-line-strong text-[var(--accent)] md:size-20"
              style={{ backgroundColor: `${accent}1f`, viewTransitionName: 'vt-tool-icon' }}
            >
              <ToolIcon name={icon} className="size-8 md:size-9" strokeWidth={1.5} />
            </span>
            {beta ? (
              <span data-hero-fade="">
                <Badge tone="beta">Beta</Badge>
              </span>
            ) : null}
          </div>
          <h1
            data-vt="title"
            data-hero-title=""
            className="mt-8 w-fit text-mega font-medium tracking-[-0.055em]"
            style={{ viewTransitionName: 'vt-tool-title' }}
          >
            {name}
          </h1>
          <p
            data-hero-fade=""
            className="mt-6 max-w-xl font-serif text-2xl italic leading-snug text-ink-soft md:text-3xl"
          >
            {tagline}
          </p>
          <p
            data-hero-fade=""
            className="mt-5 max-w-xl text-base leading-relaxed text-muted md:text-lg"
          >
            {description}
          </p>
          <ul data-hero-fade="" aria-label="Works through" className="mt-8 flex flex-wrap gap-2">
            {capabilityLabels.map((label) => (
              <li key={label}>
                <Badge tone="accent">{label}</Badge>
              </li>
            ))}
          </ul>
          <div data-hero-fade="" className="mt-10 flex flex-wrap items-center gap-5">
            <InstallButton />
            <span className="flex items-center gap-1.5 text-sm text-muted">
              or press
              {SITE.paletteShortcut.map((key) => (
                <Keycap key={key}>{key}</Keycap>
              ))}
            </span>
          </div>
        </div>
        <div data-hero-mock="" className="mx-auto w-full max-w-md lg:max-w-none">
          <ToolDemo meta={{ id, name, icon, accent }} />
        </div>
      </div>
    </section>
  )
}
