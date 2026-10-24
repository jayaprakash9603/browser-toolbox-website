'use client'

import { ArrowDownIcon, ArrowRightIcon } from 'lucide-react'
import { useRef } from 'react'

import { HeroCanvas } from '@/components/three/HeroCanvas'
import type { HeroProgress } from '@/components/three/HeroScene'
import { InstallButton } from '@/components/ui/InstallButton'
import { buttonClasses, ChapterLabel, Keycap, RollText } from '@/components/ui/primitives'
import { ToolIcon } from '@/components/ui/ToolIcon'
import { SITE } from '@/config/site'
import { cn } from '@/lib/cn'
import { gsap, MOTION_QUERIES, ScrollTrigger, useGSAP } from '@/motion/gsap'
import { onIntroDone } from '@/motion/intro'
import { SplitReveal } from '@/motion/SplitReveal'
import { TransitionLink } from '@/motion/TransitionLink'

// The same orbit of tool glyphs as the extension icon.
const ORBIT_ICONS = [
  { icon: 'ShieldCheckIcon', color: '#34d399' },
  { icon: 'BracesIcon', color: '#818cf8' },
  { icon: 'GaugeIcon', color: '#fbbf24' },
  { icon: 'ShieldBanIcon', color: '#fb7185' },
  { icon: 'PipetteIcon', color: '#f472b6' },
  { icon: 'GlobeIcon', color: '#38bdf8' },
  { icon: 'CameraIcon', color: '#c084fc' },
  { icon: 'NetworkIcon', color: '#22d3ee' },
  { icon: 'ListChecksIcon', color: '#2dd4bf' },
  { icon: 'MessageCircleIcon', color: '#4ade80' },
]

interface HeroProps {
  toolCount: number
  categoryCount: number
}

export function Hero({ toolCount, categoryCount }: HeroProps) {
  const rootRef = useRef<HTMLElement>(null)
  const progress = useRef<HeroProgress>({ intro: 0, morph: 0 })

  useGSAP(
    (_context, contextSafe) => {
      const root = rootRef.current
      if (!root || !contextSafe) return
      const mm = gsap.matchMedia()

      mm.add(MOTION_QUERIES.motion, () => {
        // The preloader fires this from inside its own timeline, so it must not inherit that scope.
        const playIntro = contextSafe(() => {
          gsap.to(progress.current, { intro: 1, duration: 2.6, ease: 'expo.out', delay: 0.1 })
          gsap.from('[data-hero-fade]', { opacity: 0, y: 20, duration: 1, stagger: 0.08, delay: 0.55, ease: 'expo.out' })
        })
        const stopIntro = onIntroDone(playIntro)

        // Scroll morphs the toolbox into the browser + side panel and lifts the copy away.
        const scroll = gsap.timeline({
          scrollTrigger: { trigger: root, start: 'top top', end: 'bottom top', scrub: 0.8 },
        })
        scroll
          .to(progress.current, { morph: 1, ease: 'none', duration: 0.7 }, 0)
          .to('[data-hero-copy]', { yPercent: -18, opacity: 0, ease: 'none', duration: 0.7 }, 0)
          .to('[data-orbit-ring]', { scale: 1.6, opacity: 0, ease: 'none', duration: 0.6 }, 0)

        // Orbit: icons travel an ellipse; depth drives scale, opacity and stacking.
        const items = gsap.utils.toArray<HTMLElement>('[data-orbit-item]')
        const state = { angle: 0 }
        const tick = (_time: number, deltaMs: number) => {
          state.angle += deltaMs * 0.00011
          const ring = root.querySelector<HTMLElement>('[data-orbit-ring]')
          if (!ring) return
          const rx = ring.offsetWidth / 2
          const ry = ring.offsetHeight / 2
          items.forEach((item, index) => {
            const a = state.angle + (index / items.length) * Math.PI * 2
            const depth = (Math.sin(a) + 1) / 2
            gsap.set(item, {
              x: Math.cos(a) * rx,
              y: Math.sin(a) * ry,
              scale: 0.62 + depth * 0.5,
              opacity: 0.3 + depth * 0.7,
              zIndex: Math.round(depth * 10),
            })
          })
        }
        gsap.ticker.add(tick)
        const visibility = ScrollTrigger.create({
          trigger: root,
          start: 'top bottom',
          end: 'bottom top',
          onToggle: (self) => (self.isActive ? gsap.ticker.add(tick) : gsap.ticker.remove(tick)),
        })

        return () => {
          stopIntro()
          gsap.ticker.remove(tick)
          visibility.kill()
        }
      })

      mm.add(MOTION_QUERIES.reduce, () => {
        progress.current.intro = 1
        const items = gsap.utils.toArray<HTMLElement>('[data-orbit-item]')
        const ring = root.querySelector<HTMLElement>('[data-orbit-ring]')
        if (!ring) return
        items.forEach((item, index) => {
          const a = (index / items.length) * Math.PI * 2
          const depth = (Math.sin(a) + 1) / 2
          gsap.set(item, {
            x: (Math.cos(a) * ring.offsetWidth) / 2,
            y: (Math.sin(a) * ring.offsetHeight) / 2,
            scale: 0.62 + depth * 0.5,
            opacity: 0.3 + depth * 0.7,
            zIndex: Math.round(depth * 10),
          })
        })
      })

      return () => mm.revert()
    },
    { scope: rootRef },
  )

  return (
    <section ref={rootRef} aria-labelledby="hero-title" className="relative isolate min-h-[100svh] overflow-hidden">
      {/* CSS poster: the LCP-safe backdrop and the reduced-motion / no-WebGL fallback. */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="hairline-grid absolute inset-0 [mask-image:radial-gradient(70%_60%_at_60%_45%,#000,transparent)]" />
        <div className="absolute right-[-10%] top-[8%] size-[70vmax] rounded-full bg-[radial-gradient(circle,rgb(99_102_241/0.35),rgb(99_102_241/0.12)_38%,transparent_66%)] md:right-[-5%]" />
        <div className="absolute bottom-[-20%] left-[-10%] size-[55vmax] rounded-full bg-[radial-gradient(circle,rgb(34_211_238/0.16),rgb(34_211_238/0.05)_36%,transparent_64%)]" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-canvas" />
      </div>

      {/* On phones the copy fills the screen, so the cloud becomes a dimmed backdrop. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 opacity-45 md:opacity-100">
        <HeroCanvas progress={progress} />
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[58%] -z-10 hidden md:left-[76%] md:top-[48%] md:block lg:left-[80%]"
      >
        <div
          data-orbit-ring=""
          className="relative h-[34vmin] w-[78vmin] -translate-x-1/2 -translate-y-1/2 md:h-[30vw] md:w-[46vw] lg:w-[33vw]"
        >
          {ORBIT_ICONS.map((item) => (
            <span
              key={item.icon}
              data-orbit-item=""
              className="absolute left-1/2 top-1/2 -ml-6 -mt-6 flex size-12 items-center justify-center rounded-2xl border border-white/10 bg-surface/70 shadow-[0_10px_40px_-10px_rgb(0_0_0/0.8)] backdrop-blur-md md:-ml-7 md:-mt-7 md:size-14"
              style={{ color: item.color, boxShadow: `0 0 32px -8px ${item.color}80` }}
            >
              <ToolIcon name={item.icon} className="size-5 md:size-6" strokeWidth={1.6} />
            </span>
          ))}
        </div>
      </div>

      <div
        data-hero-copy=""
        className="relative mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-between px-6 pb-8 pt-32 md:px-10 md:pb-10 md:pt-40"
      >
        <div>
          <div data-hero-fade="">
            <ChapterLabel index="01">Chrome extension · Manifest V3 · Free</ChapterLabel>
          </div>
          <h1
            id="hero-title"
            className="mt-6 max-w-[14ch] text-[clamp(3rem,8.6vw,9.25rem)] font-medium leading-[0.9] tracking-[-0.055em]"
          >
            <SplitReveal as="span" type="chars" trigger="intro" className="block">
              One side panel.
            </SplitReveal>
            <SplitReveal as="span" type="chars" trigger="intro" delay={0.14} className="block font-serif font-normal italic tracking-[-0.03em] text-[#b9c0ff]">
              {`${toolCount} tools.`}
            </SplitReveal>
            <SplitReveal as="span" type="chars" trigger="intro" delay={0.28} className="block text-ink-soft">
              Zero tab-hopping.
            </SplitReveal>
          </h1>
          <p data-hero-fade="" className="mt-8 max-w-xl text-lg leading-relaxed text-ink-soft md:text-xl">
            JSON, an API client, screenshots, colour, SEO, QA, privacy and more, in one fast Chrome side panel.
            Local-first, with no account and no tracking.
          </p>
          <div data-hero-fade="" className="mt-10 flex flex-wrap items-center gap-3">
            <InstallButton size="lg" label="Add to Chrome — free" />
            <TransitionLink href="/tools/" transitionLabel="All tools" className={cn(buttonClasses('outline', 'lg'))} data-cursor="Explore">
              <RollText>{`Explore ${toolCount} tools`}</RollText>
              <ArrowRightIcon aria-hidden="true" className="size-5" />
            </TransitionLink>
          </div>
          <p data-hero-fade="" className="mt-6 flex flex-wrap items-center gap-2 font-mono text-xs text-muted">
            Summon it anywhere:
            {SITE.paletteShortcut.map((key) => (
              <Keycap key={key}>{key}</Keycap>
            ))}
          </p>
        </div>

        <div data-hero-fade="" className="mt-16 flex items-end justify-between gap-6 font-mono text-[11px] uppercase tracking-[0.24em] text-muted">
          <span className="flex items-center gap-3">
            <span className="relative flex h-10 w-6 justify-center rounded-full border border-line-strong">
              <ArrowDownIcon aria-hidden="true" className="mt-2 size-3 animate-bounce text-ink motion-reduce:animate-none" />
            </span>
            Scroll to open the panel
          </span>
          <span className="hidden text-right sm:block">
            {toolCount} tools · {categoryCount} categories
            <br />0 trackers · 100% local
          </span>
        </div>
      </div>
    </section>
  )
}
