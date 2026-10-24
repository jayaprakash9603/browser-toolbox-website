'use client'

import { usePathname } from 'next/navigation'
import { useRef, type ReactNode } from 'react'

import { gsap, MOTION_QUERIES, useGSAP } from '@/motion/gsap'
import { getNavigationKind } from '@/motion/navigation'

function PageEnter({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      // Curtain and view-transition navigations animate the swap themselves.
      if (getNavigationKind() !== 'plain' || !ref.current) return
      const mm = gsap.matchMedia()
      mm.add(MOTION_QUERIES.motion, () => {
        gsap.from(ref.current, { opacity: 0, y: 24, duration: 0.7, ease: 'expo.out', clearProps: 'all' })
      })
      return () => mm.revert()
    },
    { scope: ref },
  )

  return <div ref={ref}>{children}</div>
}

/** Keyed by pathname so every route remounts and rebuilds its scroll animations. */
export default function Template({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  return <PageEnter key={pathname}>{children}</PageEnter>
}
