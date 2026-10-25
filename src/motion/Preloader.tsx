'use client'

import { useRef, useState } from 'react'

import { LogoMark } from '@/components/ui/Logo'

import { gsap, prefersReducedMotion, useGSAP } from './gsap'
import { markIntroDone } from './intro'
import { INTRO_STORAGE_KEY } from './introKey'

/**
 * First-visit intro: the logo traces itself while a counter runs, then the screen splits open.
 * An inline head script marks `html[data-intro="skip"]` for repeat visits and reduced motion so
 * CSS hides this before hydration.
 */
export function Preloader({ toolCount }: { toolCount: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(true)

  useGSAP(
    () => {
      const root = ref.current
      if (!root) return
      if (document.documentElement.dataset.intro === 'skip' || prefersReducedMotion()) {
        markIntroDone()
        setMounted(false)
        return
      }
      try {
        sessionStorage.setItem(INTRO_STORAGE_KEY, '1')
      } catch {
        // Private mode or storage disabled: the intro simply plays again next time.
      }

      const counter = root.querySelector<HTMLElement>('[data-counter]')
      const state = { n: 0 }
      const strokes = root.querySelectorAll('[data-logo-stroke]')
      const dots = root.querySelectorAll('[data-logo-dot]')

      gsap
        .timeline({ defaults: { ease: 'expo.inOut' }, onComplete: () => setMounted(false) })
        .set(root, { autoAlpha: 1 })
        .from(strokes, { drawSVG: '0%', duration: 1, stagger: 0.12, ease: 'power2.inOut' })
        .from(
          dots,
          {
            scale: 0,
            transformOrigin: '50% 50%',
            duration: 0.5,
            stagger: 0.06,
            ease: 'back.out(3)',
          },
          0.5,
        )
        .to(
          state,
          {
            n: 100,
            duration: 1.25,
            ease: 'power3.inOut',
            onUpdate: () => {
              if (counter) counter.textContent = String(Math.round(state.n)).padStart(3, '0')
            },
          },
          0,
        )
        .from(
          '[data-intro-meta]',
          { yPercent: 120, duration: 0.7, stagger: 0.08, ease: 'expo.out' },
          0.1,
        )
        .to(
          '[data-intro-content]',
          { opacity: 0, scale: 0.96, duration: 0.45, ease: 'power2.in' },
          1.3,
        )
        .add(() => markIntroDone(), 1.45)
        .to('[data-intro-top]', { yPercent: -100, duration: 0.9 }, 1.4)
        .to('[data-intro-bottom]', { yPercent: 100, duration: 0.9 }, 1.4)
    },
    { scope: ref },
  )

  if (!mounted) return null

  return (
    <div
      ref={ref}
      data-preloader=""
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[100] overflow-hidden"
    >
      <div data-intro-top="" className="absolute inset-x-0 top-0 h-1/2 bg-canvas" />
      <div data-intro-bottom="" className="absolute inset-x-0 bottom-0 h-1/2 bg-canvas" />
      <div
        data-intro-content=""
        className="absolute inset-0 flex flex-col justify-between p-6 md:p-10"
      >
        <div className="flex justify-between overflow-hidden font-mono text-xs uppercase tracking-[0.3em] text-muted">
          <span data-intro-meta="">One Panel</span>
          <span data-intro-meta="">Loading {toolCount} tools</span>
        </div>
        <div className="flex items-center justify-center">
          <LogoMark className="size-24 md:size-32" />
        </div>
        <div className="flex items-end justify-between">
          <span className="overflow-hidden font-mono text-xs uppercase tracking-[0.3em] text-muted">
            <span data-intro-meta="" className="block">
              Local-first · Manifest V3
            </span>
          </span>
          <span
            data-counter=""
            className="font-mono text-6xl font-medium tabular-nums text-ink md:text-8xl"
          >
            000
          </span>
        </div>
      </div>
    </div>
  )
}
