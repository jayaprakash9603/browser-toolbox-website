'use client'

import { useRef } from 'react'

import { gsap, MOTION_QUERIES, useDeferredGSAP } from './gsap'

interface CounterProps {
  value: number
  prefix?: string
  suffix?: string
  className?: string
  duration?: number
}

/** Renders the final value for SSR/no-JS, then counts up from zero when scrolled into view. */
export function Counter({ value, prefix = '', suffix = '', className, duration = 2 }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null)

  useDeferredGSAP(
    () => {
      const element = ref.current
      if (!element) return
      const mm = gsap.matchMedia()
      mm.add(MOTION_QUERIES.motion, () => {
        const state = { n: 0 }
        const render = () => {
          element.textContent = `${prefix}${Math.round(state.n)}${suffix}`
        }
        render()
        gsap.to(state, {
          n: value,
          duration,
          ease: 'expo.out',
          onUpdate: render,
          scrollTrigger: { trigger: element, start: 'top 90%', once: true },
        })
        return () => {
          element.textContent = `${prefix}${value}${suffix}`
        }
      })
      return () => mm.revert()
    },
    { scope: ref, dependencies: [value] },
  )

  return (
    <span ref={ref} className={className} style={{ fontVariantNumeric: 'tabular-nums' }}>
      {prefix}
      {value}
      {suffix}
    </span>
  )
}
