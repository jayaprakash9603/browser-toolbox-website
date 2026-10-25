'use client'

import { ArrowUpRightIcon } from 'lucide-react'
import { useRef, type CSSProperties, type PointerEvent } from 'react'

import { ToolIcon } from '@/components/ui/ToolIcon'
import { categoryHref } from '@/lib/routes'
import { gsap, MOTION_QUERIES, useGSAP } from '@/motion/gsap'
import { Reveal } from '@/motion/Reveal'
import { TransitionLink } from '@/motion/TransitionLink'

import type { ExplorerCategory } from './ToolsExplorer'

interface IndexCategory extends ExplorerCategory {
  description: string
  preview: string[]
}

/** Editorial category list; a floating card follows the pointer on desktop and shows what's inside. */
export function CategoryIndex({ categories }: { categories: IndexCategory[] }) {
  const rootRef = useRef<HTMLDivElement>(null)
  const floatRef = useRef<HTMLDivElement>(null)
  const moveRef = useRef<{ x: (value: number) => void; y: (value: number) => void } | null>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(
        `${MOTION_QUERIES.motion} and ${MOTION_QUERIES.finePointer} and ${MOTION_QUERIES.desktop}`,
        () => {
          const card = floatRef.current
          if (!card) return
          gsap.set(card, { xPercent: -50, yPercent: -50, scale: 0.6, autoAlpha: 0 })
          moveRef.current = {
            x: gsap.quickTo(card, 'x', { duration: 0.6, ease: 'power3.out' }),
            y: gsap.quickTo(card, 'y', { duration: 0.6, ease: 'power3.out' }),
          }
          return () => {
            moveRef.current = null
          }
        },
      )
      return () => mm.revert()
    },
    { scope: rootRef },
  )

  const show = (category: IndexCategory) => {
    const card = floatRef.current
    if (!card || !moveRef.current) return
    card.style.setProperty('--accent', category.accent)
    const title = card.querySelector('[data-float-title]')
    const list = card.querySelector('[data-float-list]')
    if (title) title.textContent = category.name
    if (list)
      list.innerHTML = category.preview
        .map((name) => `<li>${name.replace(/</g, '&lt;')}</li>`)
        .join('')
    gsap.to(card, { autoAlpha: 1, scale: 1, duration: 0.5, ease: 'expo.out', overwrite: 'auto' })
  }

  const hide = () => {
    if (!floatRef.current || !moveRef.current) return
    gsap.to(floatRef.current, {
      autoAlpha: 0,
      scale: 0.6,
      duration: 0.35,
      ease: 'power3.in',
      overwrite: 'auto',
    })
  }

  const move = (event: PointerEvent<HTMLDivElement>) => {
    const root = rootRef.current
    if (!root || !moveRef.current) return
    const rect = root.getBoundingClientRect()
    moveRef.current.x(event.clientX - rect.left + 180)
    moveRef.current.y(event.clientY - rect.top)
  }

  return (
    <div ref={rootRef} className="relative" onPointerMove={move} onPointerLeave={hide}>
      <Reveal as="ol" className="border-t border-line" y={24} stagger={0.04}>
        {categories.map((category, index) => (
          <li key={category.id} style={{ '--accent': category.accent } as CSSProperties}>
            <TransitionLink
              href={categoryHref(category.id)}
              transitionLabel={category.name}
              data-cursor="View"
              onPointerEnter={() => show(category)}
              onFocus={() => show(category)}
              onBlur={hide}
              className="group relative grid grid-cols-[2.5rem_1fr_auto] items-center gap-4 overflow-hidden border-b border-line py-6 md:grid-cols-[4rem_1.1fr_1fr_auto] md:gap-8 md:py-8"
            >
              <span
                aria-hidden="true"
                className="absolute inset-0 origin-bottom scale-y-0 bg-[color-mix(in_srgb,var(--accent)_10%,transparent)] transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-y-100 group-focus-visible:scale-y-100"
              />
              <span className="relative font-mono text-xs text-muted">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="relative flex items-center gap-4">
                <span className="flex size-0 items-center justify-center overflow-hidden rounded-xl text-[var(--accent)] opacity-0 transition-all duration-500 ease-[var(--ease-out-expo)] group-hover:size-11 group-hover:opacity-100 md:group-hover:size-14">
                  <ToolIcon name={category.icon} className="size-6 shrink-0" strokeWidth={1.6} />
                </span>
                <span className="text-3xl font-medium tracking-[-0.045em] transition-colors duration-300 group-hover:text-white md:text-5xl">
                  {category.name}
                </span>
              </span>
              <span className="relative hidden text-sm leading-relaxed text-muted md:block">
                {category.description}
              </span>
              <span className="relative flex items-center gap-3">
                <span className="font-mono text-xs text-muted">{category.count}</span>
                <span className="flex size-10 items-center justify-center rounded-full border border-line-strong transition-all duration-500 ease-[var(--ease-out-expo)] group-hover:rotate-45 group-hover:border-transparent group-hover:bg-ink group-hover:text-canvas">
                  <ArrowUpRightIcon aria-hidden="true" className="size-4" />
                </span>
              </span>
            </TransitionLink>
          </li>
        ))}
      </Reveal>
      <div
        ref={floatRef}
        aria-hidden="true"
        className="pointer-events-none invisible absolute left-0 top-0 z-10 hidden w-64 rounded-2xl border border-line-strong bg-elevated/95 p-5 shadow-[0_30px_80px_-20px_rgb(0_0_0/0.8)] backdrop-blur md:block"
      >
        <p
          data-float-title=""
          className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-[var(--accent)]"
        />
        <ul data-float-list="" className="mt-3 space-y-1.5 text-sm text-ink-soft" />
      </div>
    </div>
  )
}
