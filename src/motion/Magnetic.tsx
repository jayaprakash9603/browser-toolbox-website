'use client'

import { useRef, type ReactNode } from 'react'

import { cn } from '@/lib/cn'

import { gsap, MOTION_QUERIES, useGSAP } from './gsap'

interface MagneticProps {
  children: ReactNode
  className?: string
  strength?: number
  max?: number
}

/** Pulls its child toward the pointer and springs back on leave. */
export function Magnetic({ children, className, strength = 0.35, max = 14 }: MagneticProps) {
  const ref = useRef<HTMLSpanElement>(null)

  useGSAP(
    () => {
      const element = ref.current
      if (!element) return
      const mm = gsap.matchMedia()
      mm.add(`${MOTION_QUERIES.motion} and ${MOTION_QUERIES.finePointer}`, () => {
        const xTo = gsap.quickTo(element, 'x', { duration: 0.5, ease: 'power3.out' })
        const yTo = gsap.quickTo(element, 'y', { duration: 0.5, ease: 'power3.out' })
        const clamp = gsap.utils.clamp(-max, max)

        const onMove = (event: PointerEvent) => {
          const rect = element.getBoundingClientRect()
          xTo(clamp((event.clientX - rect.left - rect.width / 2) * strength))
          yTo(clamp((event.clientY - rect.top - rect.height / 2) * strength))
        }
        const onLeave = () => {
          gsap.to(element, { x: 0, y: 0, duration: 0.9, ease: 'elastic.out(1, 0.4)' })
        }

        element.addEventListener('pointermove', onMove)
        element.addEventListener('pointerleave', onLeave)
        return () => {
          element.removeEventListener('pointermove', onMove)
          element.removeEventListener('pointerleave', onLeave)
        }
      })
      return () => mm.revert()
    },
    { scope: ref },
  )

  return (
    <span ref={ref} className={cn('inline-flex will-change-transform', className)}>
      {children}
    </span>
  )
}
