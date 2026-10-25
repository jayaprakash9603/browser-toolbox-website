'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'

import { gsap, MOTION_QUERIES, useGSAP } from './gsap'

/**
 * Decorative follower ring. The native cursor stays visible; elements opt into a label with
 * `data-cursor="View"`.
 */
export function Cursor() {
  const ringRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)
  const resetRef = useRef<() => void>(() => {})
  const pathname = usePathname()

  useGSAP(() => {
    const ring = ringRef.current
    const dot = dotRef.current
    const label = labelRef.current
    if (!ring || !dot || !label) return
    const mm = gsap.matchMedia()

    mm.add(`${MOTION_QUERIES.motion} and ${MOTION_QUERIES.finePointer}`, () => {
      gsap.set([ring, dot], { xPercent: -50, yPercent: -50, autoAlpha: 0 })
      const ringX = gsap.quickTo(ring, 'x', { duration: 0.55, ease: 'power3.out' })
      const ringY = gsap.quickTo(ring, 'y', { duration: 0.55, ease: 'power3.out' })
      const dotX = gsap.quickTo(dot, 'x', { duration: 0.12, ease: 'power2.out' })
      const dotY = gsap.quickTo(dot, 'y', { duration: 0.12, ease: 'power2.out' })
      let visible = false
      let activeTarget: Element | null = null

      const onMove = (event: PointerEvent) => {
        if (event.pointerType !== 'mouse') return
        if (!visible) {
          visible = true
          gsap.to([ring, dot], { autoAlpha: 1, duration: 0.3 })
        }
        ringX(event.clientX)
        ringY(event.clientY)
        dotX(event.clientX)
        dotY(event.clientY)

        applyTarget(
          (event.target as Element | null)?.closest?.(
            '[data-cursor], a, button, [role="button"]',
          ) ?? null,
        )
      }
      const applyTarget = (target: Element | null) => {
        if (target === activeTarget) return
        activeTarget = target
        const text = target?.getAttribute('data-cursor') ?? ''
        label.textContent = text
        gsap.to(ring, {
          scale: text ? 2.6 : target ? 1.6 : 1,
          backgroundColor: text ? 'rgba(99,102,241,0.92)' : 'rgba(255,255,255,0)',
          borderColor: text ? 'rgba(99,102,241,0)' : 'rgba(255,255,255,0.45)',
          duration: 0.45,
          ease: 'expo.out',
        })
        gsap.to(label, { autoAlpha: text ? 1 : 0, duration: 0.25 })
        gsap.to(dot, { scale: target ? 0 : 1, duration: 0.3 })
      }
      const onLeave = () => {
        visible = false
        gsap.to([ring, dot], { autoAlpha: 0, duration: 0.3 })
      }

      window.addEventListener('pointermove', onMove, { passive: true })
      document.documentElement.addEventListener('pointerleave', onLeave)
      resetRef.current = () => applyTarget(null)
      return () => {
        resetRef.current = () => {}
        window.removeEventListener('pointermove', onMove)
        document.documentElement.removeEventListener('pointerleave', onLeave)
      }
    })

    return () => mm.revert()
  })

  // Route changes swap the hovered element out without a pointer event.
  useEffect(() => {
    resetRef.current()
  }, [pathname])

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[90] hidden md:block">
      <div
        ref={ringRef}
        className="invisible fixed left-0 top-0 flex size-9 items-center justify-center rounded-full border border-white/45 mix-blend-normal"
      >
        <span
          ref={labelRef}
          className="invisible scale-[0.385] whitespace-nowrap font-mono text-[11px] font-medium uppercase tracking-widest text-white"
        />
      </div>
      <div ref={dotRef} className="invisible fixed left-0 top-0 size-1.5 rounded-full bg-white" />
    </div>
  )
}
