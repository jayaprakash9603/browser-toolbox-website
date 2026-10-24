'use client'

import { useRef, type CSSProperties, type ReactNode } from 'react'

import { cn } from '@/lib/cn'

import { gsap, MOTION_QUERIES, ScrollTrigger, useGSAP } from './gsap'

interface MarqueeProps {
  children: ReactNode
  className?: string
  reverse?: boolean
  /** Seconds per loop. */
  duration?: number
  label?: string
}

/**
 * CSS-driven infinite loop (cheap on the main thread) with a GSAP skew that follows scroll
 * velocity. Pauses on hover/focus; static under reduced motion.
 */
export function Marquee({ children, className, reverse = false, duration = 40, label }: MarqueeProps) {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const track = ref.current?.querySelector<HTMLElement>('[data-marquee-track]')
      if (!track) return
      const mm = gsap.matchMedia()
      mm.add(MOTION_QUERIES.motion, () => {
        const skewTo = gsap.quickTo(track, 'skewX', { duration: 0.6, ease: 'power3.out' })
        const clamp = gsap.utils.clamp(-12, 12)
        const trigger = ScrollTrigger.create({
          trigger: ref.current,
          start: 'top bottom',
          end: 'bottom top',
          onUpdate(self) {
            skewTo(clamp(self.getVelocity() / -250))
          },
          onLeave: () => skewTo(0),
          onLeaveBack: () => skewTo(0),
        })
        let idle: ReturnType<typeof setTimeout> | undefined
        const settle = () => {
          clearTimeout(idle)
          idle = setTimeout(() => skewTo(0), 120)
        }
        window.addEventListener('scroll', settle, { passive: true })
        return () => {
          trigger.kill()
          clearTimeout(idle)
          window.removeEventListener('scroll', settle)
        }
      })
      return () => mm.revert()
    },
    { scope: ref },
  )

  return (
    <div
      ref={ref}
      role={label ? 'region' : undefined}
      aria-label={label}
      className={cn('group relative flex overflow-hidden', className)}
      style={{ '--marquee-duration': `${duration}s` } as CSSProperties}
    >
      <div
        data-marquee-track=""
        className={cn(
          'flex w-max shrink-0 group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused] motion-reduce:animate-none',
          reverse ? 'animate-marquee-reverse' : 'animate-marquee',
        )}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden="true" inert>
          {children}
        </div>
      </div>
    </div>
  )
}
