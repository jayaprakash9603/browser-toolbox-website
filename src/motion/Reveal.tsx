'use client'

import { useRef, type ElementType, type ReactNode } from 'react'

import { gsap, MOTION_QUERIES, useDeferredGSAP } from './gsap'

interface RevealProps {
  as?: ElementType
  children: ReactNode
  className?: string
  /** CSS selector for staggered items; defaults to direct children. */
  items?: string
  y?: number
  stagger?: number
  delay?: number
  start?: string
  scale?: number
}

/** Fades and lifts children in once as the container enters the viewport. */
export function Reveal({
  as: Tag = 'div',
  children,
  className,
  items,
  y = 28,
  stagger = 0.08,
  delay = 0,
  start = 'top 86%',
  scale = 1,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null)

  useDeferredGSAP(
    () => {
      const element = ref.current
      if (!element) return
      const mm = gsap.matchMedia()
      mm.add(MOTION_QUERIES.motion, () => {
        const targets = items ? element.querySelectorAll(items) : element.children
        element.removeAttribute('data-reveal-pending')
        gsap.from(targets, {
          y,
          scale,
          opacity: 0,
          duration: 0.9,
          delay,
          stagger,
          ease: 'expo.out',
          scrollTrigger: { trigger: element, start, once: true },
        })
      })
      mm.add(MOTION_QUERIES.reduce, () => element.removeAttribute('data-reveal-pending'))
      return () => mm.revert()
    },
    { scope: ref },
  )

  return (
    <Tag ref={ref} className={className} data-reveal-pending="">
      {children}
    </Tag>
  )
}
