'use client'

import { useRef } from 'react'

import { cn } from '@/lib/cn'
import { gsap, MOTION_QUERIES, useDeferredGSAP } from '@/motion/gsapExtra'

export interface Fact {
  value: string
  label: string
}

/** Short, verifiable facts (never invented metrics) that decode as they enter. */
export function FactStrip({ facts, className }: { facts: Fact[]; className?: string }) {
  const ref = useRef<HTMLDListElement>(null)
  useDeferredGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MOTION_QUERIES.motion, () => {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: ref.current, start: 'top 85%', once: true },
        })
        gsap.utils.toArray<HTMLElement>('[data-fact]', ref.current).forEach((value, index) => {
          tl.from(
            value,
            {
              duration: 1.3,
              scrambleText: { text: '{original}', chars: '0123456789/#%', speed: 0.6 },
            },
            index * 0.12,
          )
        })
        tl.from(
          '[data-fact-line]',
          { scaleX: 0, transformOrigin: '0% 50%', duration: 1.2, stagger: 0.1, ease: 'expo.out' },
          0,
        )
      })
      return () => mm.revert()
    },
    { scope: ref },
  )
  return (
    <dl
      ref={ref}
      className={cn(
        'grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4',
        className,
      )}
    >
      {facts.map((fact) => (
        <div key={fact.label} className="relative flex flex-col bg-canvas p-7 md:p-8">
          <span
            data-fact-line=""
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-[var(--accent)] to-transparent"
          />
          <dt className="order-2 mt-3 text-sm leading-relaxed text-muted">{fact.label}</dt>
          <dd data-fact="" className="order-1 text-4xl font-medium tracking-[-0.05em] md:text-5xl">
            {fact.value}
          </dd>
        </div>
      ))}
    </dl>
  )
}
