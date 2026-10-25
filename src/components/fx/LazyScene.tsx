'use client'

import { useEffect, useRef, useState, type ComponentType, type ReactNode } from 'react'

import { cn } from '@/lib/cn'
import { MOTION_QUERIES } from '@/motion/gsap'

interface LazySceneProps<P extends object> {
  /** Dynamic import of the WebGL scene; only fetched on desktop, with motion allowed, once near the viewport. */
  load: () => Promise<{ default: ComponentType<P> }>
  props: P
  /** Shown on mobile, under reduced motion, and until the scene loads. */
  fallback: ReactNode
  className?: string
}

export function LazyScene<P extends object>({ load, props, fallback, className }: LazySceneProps<P>) {
  const ref = useRef<HTMLDivElement>(null)
  const [Scene, setScene] = useState<ComponentType<P> | null>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return
    const allowed = window.matchMedia(`${MOTION_QUERIES.motion} and ${MOTION_QUERIES.desktop}`).matches
    if (!allowed) return
    let cancelled = false
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        io.disconnect()
        load().then((module) => {
          if (!cancelled) setScene(() => module.default)
        })
      },
      { rootMargin: '300px 0px' },
    )
    io.observe(element)
    return () => {
      cancelled = true
      io.disconnect()
    }
  }, [load])

  return (
    <div ref={ref} className={cn('relative', className)}>
      {Scene ? <Scene {...props} /> : fallback}
    </div>
  )
}
