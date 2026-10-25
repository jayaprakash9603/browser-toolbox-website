'use client'

import { QuoteIcon } from 'lucide-react'
import { useRef, type PointerEvent } from 'react'

import { cn } from '@/lib/cn'
import { gsap, MOTION_QUERIES, prefersReducedMotion, useDeferredGSAP } from '@/motion/gsapExtra'
import { Marquee } from '@/motion/Marquee'

interface UseCaseProps {
  items: string[]
  className?: string
}

function tiltHandlers() {
  return {
    onPointerMove(event: PointerEvent<HTMLElement>) {
      if (event.pointerType !== 'mouse' || prefersReducedMotion()) return
      const card = event.currentTarget
      const rect = card.getBoundingClientRect()
      const x = (event.clientX - rect.left) / rect.width - 0.5
      const y = (event.clientY - rect.top) / rect.height - 0.5
      gsap.to(card, {
        rotateY: x * 14,
        rotateX: -y * 14,
        transformPerspective: 900,
        duration: 0.5,
        ease: 'power3.out',
      })
      card.style.setProperty('--gx', `${(x + 0.5) * 100}%`)
      card.style.setProperty('--gy', `${(y + 0.5) * 100}%`)
    },
    onPointerLeave(event: PointerEvent<HTMLElement>) {
      gsap.to(event.currentTarget, {
        rotateY: 0,
        rotateX: 0,
        duration: 0.8,
        ease: 'elastic.out(1, 0.5)',
      })
    },
  }
}

/** Cards that tilt towards the pointer with a moving glare. */
export function UseCaseTilt({ items, className }: UseCaseProps) {
  const ref = useRef<HTMLUListElement>(null)
  useDeferredGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MOTION_QUERIES.motion, () => {
        gsap.from('[data-u]', {
          y: 80,
          opacity: 0,
          rotateX: -20,
          transformPerspective: 900,
          duration: 1.1,
          stagger: 0.12,
          ease: 'expo.out',
          scrollTrigger: { trigger: ref.current, start: 'top 80%', once: true },
        })
      })
      return () => mm.revert()
    },
    { scope: ref },
  )
  return (
    <ul ref={ref} className={cn('grid gap-5 md:grid-cols-2', className)}>
      {items.map((item, index) => (
        <li
          key={item}
          data-u=""
          {...tiltHandlers()}
          className="relative min-h-64 overflow-hidden rounded-[28px] border border-line-strong bg-elevated p-8 [transform-style:preserve-3d] md:p-10"
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-60"
            style={{
              background:
                'radial-gradient(400px circle at var(--gx, 30%) var(--gy, 20%), color-mix(in srgb, var(--accent) 22%, transparent), transparent 60%)',
            }}
          />
          <span className="relative font-mono text-[11px] text-[var(--accent)]">
            Use case {String(index + 1).padStart(2, '0')}
          </span>
          <p className="relative mt-12 max-w-md font-serif text-3xl italic leading-snug md:text-4xl">
            {item}
          </p>
        </li>
      ))}
    </ul>
  )
}

/** Large quotes that sharpen as they cross the middle of the screen. */
export function UseCaseQuotes({ items, className }: UseCaseProps) {
  const ref = useRef<HTMLOListElement>(null)
  useDeferredGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MOTION_QUERIES.motion, () => {
        gsap.utils.toArray<HTMLElement>('[data-u]', ref.current).forEach((quote) => {
          gsap
            .timeline({
              scrollTrigger: { trigger: quote, start: 'top 90%', end: 'bottom 10%', scrub: 0.6 },
            })
            .fromTo(
              quote,
              { opacity: 0.12, filter: 'blur(8px)', scale: 0.94 },
              { opacity: 1, filter: 'blur(0px)', scale: 1, ease: 'power2.out' },
            )
            .to(quote, { opacity: 0.12, filter: 'blur(8px)', scale: 0.96, ease: 'power2.in' })
        })
      })
      return () => mm.revert()
    },
    { scope: ref },
  )
  return (
    <ol ref={ref} className={cn('mx-auto max-w-5xl space-y-24 md:space-y-36', className)}>
      {items.map((item, index) => (
        <li
          key={item}
          data-u=""
          className={cn('flex gap-6', index % 2 === 1 && 'md:flex-row-reverse md:text-right')}
        >
          <QuoteIcon
            aria-hidden="true"
            className="mt-2 size-8 shrink-0 text-[var(--accent)]"
            strokeWidth={1.4}
          />
          <p className="font-serif text-4xl italic leading-[1.1] md:text-6xl">{item}</p>
        </li>
      ))}
    </ol>
  )
}

/** A line that draws down the page, lighting each use case as it passes. */
export function UseCaseTimeline({ items, className }: UseCaseProps) {
  const ref = useRef<HTMLOListElement>(null)
  useDeferredGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MOTION_QUERIES.motion, () => {
        gsap.fromTo(
          '[data-u-line]',
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: ref.current,
              start: 'top 70%',
              end: 'bottom 60%',
              scrub: 0.5,
            },
          },
        )
        gsap.utils.toArray<HTMLElement>('[data-u]', ref.current).forEach((item) => {
          gsap.from(item, {
            x: 40,
            opacity: 0,
            duration: 0.9,
            ease: 'expo.out',
            scrollTrigger: { trigger: item, start: 'top 75%', once: true },
          })
          gsap.from(item.querySelector('[data-u-dot]'), {
            scale: 0,
            duration: 0.6,
            ease: 'back.out(3)',
            scrollTrigger: { trigger: item, start: 'top 70%', once: true },
          })
        })
      })
      return () => mm.revert()
    },
    { scope: ref },
  )
  return (
    <ol ref={ref} className={cn('relative mx-auto max-w-3xl space-y-16 pl-12', className)}>
      <span aria-hidden="true" className="absolute bottom-0 left-[11px] top-0 w-px bg-line" />
      <span
        data-u-line=""
        aria-hidden="true"
        className="absolute bottom-0 left-[11px] top-0 w-px origin-top bg-gradient-to-b from-[var(--accent)] to-transparent"
      />
      {items.map((item, index) => (
        <li key={item} data-u="" className="relative">
          <span
            data-u-dot=""
            aria-hidden="true"
            className="absolute -left-12 top-2 flex size-6 items-center justify-center rounded-full border border-[var(--accent)] bg-canvas"
          >
            <span className="size-2 rounded-full bg-[var(--accent)]" />
          </span>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
            Moment {index + 1}
          </p>
          <p className="mt-3 text-3xl font-medium leading-tight tracking-[-0.035em] md:text-4xl">
            {item}
          </p>
        </li>
      ))}
    </ol>
  )
}

/** Two counter-scrolling rows of use-case cards. */
export function UseCaseMarquee({ items, className }: UseCaseProps) {
  const card = (item: string, index: number) => (
    <div
      key={`${item}-${index}`}
      className="mx-2 w-[22rem] shrink-0 rounded-3xl border border-line bg-surface p-7"
    >
      <QuoteIcon aria-hidden="true" className="size-5 text-[var(--accent)]" strokeWidth={1.5} />
      <p className="mt-6 font-serif text-2xl italic leading-snug">{item}</p>
    </div>
  )
  const doubled = [...items, ...items, ...items]
  return (
    <div
      className={cn(
        'space-y-4 [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]',
        className,
      )}
    >
      <Marquee duration={48} label="Use cases">
        {doubled.map(card)}
      </Marquee>
      <div aria-hidden="true">
        <Marquee duration={56} reverse>
          {[...doubled].reverse().map(card)}
        </Marquee>
      </div>
    </div>
  )
}

/** A deck of cards that fans out when it scrolls in. */
export function UseCaseFan({ items, className }: UseCaseProps) {
  const ref = useRef<HTMLUListElement>(null)
  useDeferredGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(`${MOTION_QUERIES.motion} and ${MOTION_QUERIES.desktop}`, () => {
        const cards = gsap.utils.toArray<HTMLElement>('[data-u]', ref.current)
        const middle = (cards.length - 1) / 2
        gsap.from(cards, {
          x: (index) => (middle - index) * 260,
          rotate: (index) => (index - middle) * -6,
          y: 40,
          duration: 1.4,
          ease: 'expo.out',
          stagger: 0.05,
          scrollTrigger: { trigger: ref.current, start: 'top 75%', once: true },
        })
      })
      return () => mm.revert()
    },
    { scope: ref },
  )
  return (
    <ul
      ref={ref}
      className={cn('flex flex-col items-center gap-5 md:flex-row md:justify-center', className)}
    >
      {items.map((item, index) => (
        <li
          key={item}
          data-u=""
          className="border-beam relative flex min-h-80 w-full max-w-sm flex-col rounded-[28px] border border-line-strong bg-elevated p-8 shadow-[0_30px_80px_-30px_rgb(0_0_0/0.9)]"
          style={{ rotate: `${(index - (items.length - 1) / 2) * 3}deg` }}
        >
          <span className="font-serif text-6xl italic text-[var(--accent)]">{index + 1}</span>
          <p className="mt-auto text-2xl font-medium leading-snug tracking-[-0.03em]">{item}</p>
        </li>
      ))}
    </ul>
  )
}
