'use client'

import { useRef } from 'react'

import { InstallButton } from '@/components/ui/InstallButton'
import { LogoMark } from '@/components/ui/Logo'
import { ChapterLabel, Keycap } from '@/components/ui/primitives'
import { SITE } from '@/config/site'
import { gsap, MOTION_QUERIES, useDeferredGSAP } from '@/motion/gsap'
import { SplitReveal } from '@/motion/SplitReveal'

export function FinalCta({ toolCount }: { toolCount: number }) {
  const rootRef = useRef<HTMLElement>(null)

  useDeferredGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MOTION_QUERIES.motion, () => {
        gsap.fromTo(
          '[data-cta-card]',
          { scale: 0.82, borderRadius: 64, yPercent: 8 },
          {
            scale: 1,
            borderRadius: 36,
            yPercent: 0,
            ease: 'none',
            scrollTrigger: { trigger: rootRef.current, start: 'top bottom', end: 'center center', scrub: 0.8 },
          },
        )
        gsap.to('[data-cta-glow]', {
          rotate: 120,
          ease: 'none',
          scrollTrigger: { trigger: rootRef.current, start: 'top bottom', end: 'bottom top', scrub: true },
        })
      })
      return () => mm.revert()
    },
    { scope: rootRef },
  )

  return (
    <section ref={rootRef} aria-labelledby="cta-title" className="px-4 py-20 md:px-8 md:py-28">
      <div
        data-cta-card=""
        className="relative mx-auto max-w-[1400px] overflow-hidden rounded-[36px] border border-line-strong bg-elevated px-6 py-24 text-center md:px-16 md:py-36"
      >
        <div
          data-cta-glow=""
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 size-[140vmax] -translate-x-1/2 -translate-y-1/2 bg-[conic-gradient(from_0deg,transparent_0deg,rgb(99_102_241/0.28)_60deg,transparent_120deg,rgb(34_211_238/0.18)_200deg,transparent_260deg)] blur-3xl"
        />
        <div aria-hidden="true" className="hairline-grid pointer-events-none absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
        <div className="relative">
          <LogoMark className="mx-auto size-14" />
          <div className="mt-8 flex justify-center">
            <ChapterLabel index="09">Install</ChapterLabel>
          </div>
          <SplitReveal as="h2" id="cta-title" type="words" className="mx-auto mt-6 max-w-5xl text-mega font-medium tracking-[-0.055em]">
            Your browser, fully loaded.
          </SplitReveal>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">
            {toolCount} tools in one side panel. Free to install, no account, and no tracking.
          </p>
          <div className="mt-12 flex flex-col items-center gap-6">
            <InstallButton size="lg" label="Add Browser Toolbox to Chrome" shortLabel="Add to Chrome" />
            <p className="flex flex-wrap items-center justify-center gap-2 text-sm text-muted">
              Then press
              {SITE.paletteShortcut.map((key) => (
                <Keycap key={key}>{key}</Keycap>
              ))}
              anywhere.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
