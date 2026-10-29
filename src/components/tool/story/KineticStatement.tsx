'use client'

import { Fragment, useRef, type ReactNode } from 'react'

import { cn } from '@/lib/cn'
import {
  gsap,
  labelSplitText,
  MOTION_QUERIES,
  ScrollTrigger,
  SplitText,
  useDeferredGSAP,
} from '@/motion/gsapExtra'

export type KineticVariant = 'scrub' | 'chars' | 'scramble' | 'outline' | 'blur'

function emphasise(text: string, accent: string[]): ReactNode {
  if (!accent.length) return text
  const pattern = new RegExp(
    `(${accent.map((word) => word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`,
    'g',
  )
  return text.split(pattern).map((part, index) =>
    accent.includes(part) ? (
      <span
        key={index}
        data-k-accent=""
        className="font-serif font-normal italic text-[var(--accent)]"
      >
        {part}
      </span>
    ) : (
      <Fragment key={index}>{part}</Fragment>
    ),
  )
}

interface KineticStatementProps {
  text: string
  accent?: string[]
  variant?: KineticVariant
  className?: string
  eyebrow?: string
}

/** Oversized statement whose words animate with the scroll. */
export function KineticStatement({
  text,
  accent = [],
  variant = 'scrub',
  className,
  eyebrow,
}: KineticStatementProps) {
  const ref = useRef<HTMLDivElement>(null)

  useDeferredGSAP(
    () => {
      const root = ref.current
      const element = root?.querySelector<HTMLElement>('[data-k-text]')
      if (!root || !element) return
      const mm = gsap.matchMedia()
      mm.add(MOTION_QUERIES.motion, () => {
        if (variant === 'outline') {
          const fill = root.querySelector('[data-k-fill]')
          gsap.fromTo(
            fill,
            { clipPath: 'inset(0 100% 0 0)' },
            {
              clipPath: 'inset(0 0% 0 0)',
              ease: 'none',
              scrollTrigger: { trigger: root, start: 'top 75%', end: 'bottom 45%', scrub: 0.8 },
            },
          )
          return
        }
        let split: SplitText | undefined
        const approach = ScrollTrigger.create({
          trigger: root,
          start: 'top bottom+=20%',
          once: true,
          onEnter: () => {
            split = SplitText.create(element, {
              type: variant === 'chars' ? 'words,chars' : 'words',
              autoSplit: true,
              onSplit(self) {
                labelSplitText(element)
                const scroll = { trigger: root, start: 'top 80%', end: 'bottom 50%', scrub: 0.7 }
                if (variant === 'chars') {
                  gsap.set(element, { perspective: 600 })
                  return gsap.from(self.chars, {
                    rotateX: -95,
                    opacity: 0,
                    transformOrigin: '50% 100%',
                    duration: 0.8,
                    stagger: 0.012,
                    ease: 'back.out(2)',
                    scrollTrigger: { trigger: root, start: 'top 75%', once: true },
                  })
                }
                if (variant === 'blur') {
                  return gsap.fromTo(
                    self.words,
                    { opacity: 0, filter: 'blur(14px)', y: 24 },
                    {
                      opacity: 1,
                      filter: 'blur(0px)',
                      y: 0,
                      stagger: 0.1,
                      ease: 'none',
                      scrollTrigger: scroll,
                    },
                  )
                }
                if (variant === 'scramble') {
                  const tl = gsap.timeline({
                    scrollTrigger: { trigger: root, start: 'top 75%', once: true },
                  })
                  tl.from(self.words, { opacity: 0, y: 20, duration: 0.7, stagger: 0.03 })
                  root.querySelectorAll<HTMLElement>('[data-k-accent]').forEach((span, index) => {
                    tl.to(
                      span,
                      {
                        duration: 1.2,
                        scrambleText: {
                          text: span.textContent ?? '',
                          chars: '01<>/{}#*',
                          speed: 0.6,
                        },
                      },
                      0.2 + index * 0.25,
                    )
                  })
                  return tl
                }
                return gsap.fromTo(
                  self.words,
                  { opacity: 0.12 },
                  { opacity: 1, stagger: 0.1, ease: 'none', scrollTrigger: scroll },
                )
              },
            })
          },
        })
        return () => {
          approach.kill()
          split?.revert()
        }
      })
      return () => mm.revert()
    },
    { scope: ref },
  )

  const sizes = 'text-[clamp(2rem,5.4vw,5.25rem)] font-medium leading-[1.02] tracking-[-0.05em]'
  return (
    <div ref={ref} className={cn('mx-auto max-w-6xl', className)}>
      {eyebrow ? (
        <p className="mb-8 font-mono text-[11px] uppercase tracking-[0.28em] text-muted">
          {eyebrow}
        </p>
      ) : null}
      {variant === 'outline' ? (
        <div className="relative">
          <p data-k-text="" className={cn(sizes, 'text-outline')}>
            {text}
          </p>
          <p data-k-fill="" aria-hidden="true" className={cn(sizes, 'absolute inset-0 text-ink')}>
            {emphasise(text, accent)}
          </p>
        </div>
      ) : (
        <p data-k-text="" className={sizes}>
          {emphasise(text, accent)}
        </p>
      )}
    </div>
  )
}
