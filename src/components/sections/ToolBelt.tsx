'use client'

import { ArrowRightIcon, HandIcon } from 'lucide-react'
import { useRef, type CSSProperties, type MouseEvent } from 'react'

import { ChapterLabel } from '@/components/ui/primitives'
import { ToolIcon } from '@/components/ui/ToolIcon'
import { categoryHref, toolHref } from '@/lib/routes'
import { Draggable, gsap, MOTION_QUERIES, useDeferredGSAP } from '@/motion/gsap'
import { SplitReveal } from '@/motion/SplitReveal'
import { TransitionLink } from '@/motion/TransitionLink'

export interface BeltCategory {
  id: string
  name: string
  description: string
  icon: string
  accent: string
  tools: { id: string; name: string; route: string; icon: string }[]
}

function preventIfDragged(event: MouseEvent<HTMLAnchorElement>) {
  if (event.currentTarget.dataset.dragged === '1') event.preventDefault()
}

function createChipDraggables(area: HTMLElement) {
  return Draggable.create(area.querySelectorAll<HTMLElement>('[data-belt-chip]'), {
    type: 'x,y',
    bounds: area,
    inertia: true,
    edgeResistance: 0.7,
    dragClickables: true,
    minimumMovement: 4,
    onPress() {
      gsap.to(this.target, { scale: 1.08, duration: 0.25, ease: 'power2.out' })
    },
    onDragStart() {
      ;(this.target as HTMLElement).dataset.dragged = '1'
      gsap.to(this.target, { rotate: gsap.utils.random(-12, 12), duration: 0.3 })
    },
    onRelease() {
      const target = this.target as HTMLElement
      gsap.to(target, { scale: 1, duration: 0.5, ease: 'elastic.out(1, 0.5)' })
      setTimeout(() => delete target.dataset.dragged, 60)
    },
  })
}

export function ToolBelt({ categories, toolCount }: { categories: BeltCategory[]; toolCount: number }) {
  const rootRef = useRef<HTMLElement>(null)

  useDeferredGSAP(
    () => {
      const root = rootRef.current
      if (!root) return
      const pin = root.querySelector<HTMLElement>('[data-belt-pin]')
      const track = root.querySelector<HTMLElement>('[data-belt-track]')
      const bar = root.querySelector<HTMLElement>('[data-belt-progress]')
      if (!pin || !track) return
      const mm = gsap.matchMedia()

      mm.add(`${MOTION_QUERIES.motion} and ${MOTION_QUERIES.desktop}`, () => {
        const panels = gsap.utils.toArray<HTMLElement>('[data-belt-panel]')
        const icons = panels.map((panel) => panel.querySelector<HTMLElement>('[data-belt-icon]'))
        // Panels tilt up and icons spin as they slide in over the right half of the viewport. One pass
        // over cached offsets per frame: a containerAnimation ScrollTrigger per panel would re-measure
        // all of them on every refresh.
        let offsets: number[] = []
        let viewport = window.innerWidth
        const shown: number[] = []
        const revealPanels = () => {
          const x = gsap.getProperty(track, 'x') as number
          panels.forEach((panel, index) => {
            const progress = gsap.utils.clamp(0, 1, (viewport - offsets[index] - x) / (viewport * 0.5))
            if (progress === shown[index]) return
            shown[index] = progress
            const rest = 1 - Math.min(1, progress / 0.9)
            panel.style.transform = `translateY(${8 * rest}%) rotate(${2.5 * rest}deg)`
            panel.style.opacity = String(1 - 0.65 * rest)
            const icon = icons[index]
            if (icon) icon.style.transform = `rotate(${-120 * (1 - progress)}deg) scale(${0.4 + 0.6 * progress})`
          })
        }

        const distance = () => Math.max(0, track.scrollWidth - window.innerWidth)
        gsap.to(track, {
          x: () => -distance(),
          ease: 'none',
          onUpdate: revealPanels,
          scrollTrigger: {
            trigger: root,
            start: 'top top',
            // Track moves ~1.8px per scrolled px so 22 panels don't take ten screens.
            end: () => `+=${distance() * 0.55}`,
            pin,
            scrub: 0.8,
            invalidateOnRefresh: true,
            onRefresh: () => {
              viewport = window.innerWidth
              offsets = panels.map((panel) => panel.offsetLeft)
              revealPanels()
            },
            onUpdate: (self) => {
              if (bar) bar.style.transform = `scaleX(${self.progress})`
            },
          },
        })
        return () => {
          panels.forEach((panel) => panel.style.removeProperty('transform'))
          panels.forEach((panel) => panel.style.removeProperty('opacity'))
          icons.forEach((icon) => icon?.style.removeProperty('transform'))
        }
      })

      // Throwable chips, desktop pointers only.
      mm.add(`${MOTION_QUERIES.motion} and ${MOTION_QUERIES.desktop} and ${MOTION_QUERIES.finePointer}`, () => {
        const areas = gsap.utils.toArray<HTMLElement>('[data-belt-chips]')
        const draggables: Draggable[] = []
        // Each Draggable measures its bounds on creation, so creating all ~80 up front stalls the first
        // paint. An area arms its chips on first hover instead, which always precedes a press.
        const arm = (event: PointerEvent) => {
          const area = event.currentTarget as HTMLElement
          area.removeEventListener('pointerenter', arm)
          draggables.push(...createChipDraggables(area))
        }
        areas.forEach((area) => area.addEventListener('pointerenter', arm))
        return () => {
          areas.forEach((area) => area.removeEventListener('pointerenter', arm))
          draggables.forEach((draggable) => draggable.kill())
        }
      })

      return () => mm.revert()
    },
    { scope: rootRef },
  )

  return (
    <section ref={rootRef} aria-labelledby="belt-title" className="relative">
      <div data-belt-pin="" className="relative flex flex-col justify-center overflow-hidden py-24 md:h-[100svh] md:py-0">
        <div className="mx-auto mb-10 flex w-full max-w-7xl flex-col gap-6 px-6 md:mb-14 md:flex-row md:items-end md:justify-between md:px-10">
          <div>
            <ChapterLabel index="04">The tool belt</ChapterLabel>
            <SplitReveal as="h2" id="belt-title" type="words" className="mt-6 text-title font-medium tracking-[-0.045em]">
              {`${categories.length} categories. ${toolCount} tools.`}
            </SplitReveal>
          </div>
          <div className="flex flex-col gap-3 md:items-end">
            <p className="hidden items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-muted md:flex">
              <HandIcon aria-hidden="true" className="size-4" /> Go on, throw the chips around
            </p>
            <div aria-hidden="true" className="hidden h-px w-56 overflow-hidden bg-line md:block">
              <span data-belt-progress="" className="block h-full origin-left bg-gradient-to-r from-indigo to-cyan" style={{ transform: 'scaleX(0)' }} />
            </div>
          </div>
        </div>

        <div
          data-belt-track=""
          className="no-scrollbar flex snap-x snap-mandatory scroll-px-6 gap-4 overflow-x-auto px-6 md:w-max md:snap-none md:gap-5 md:overflow-visible md:px-10"
        >
          {categories.map((category, index) => (
            <article
              key={category.id}
              data-belt-panel=""
              aria-labelledby={`belt-${category.id}`}
              style={{ '--accent': category.accent } as CSSProperties}
              className="relative flex h-[min(68vh,540px)] w-[84vw] shrink-0 snap-start flex-col overflow-hidden rounded-[28px] border border-line bg-surface p-6 sm:w-[420px] md:p-7"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-28 -top-28 size-80 rounded-full opacity-40"
                style={{ background: `radial-gradient(circle, ${category.accent}, ${category.accent}59 32%, transparent 68%)` }}
              />
              <div className="relative flex items-start justify-between">
                <span
                  data-belt-icon=""
                  className="flex size-14 items-center justify-center rounded-2xl border border-line-strong"
                  style={{ color: category.accent, backgroundColor: `${category.accent}1f` }}
                >
                  <ToolIcon name={category.icon} className="size-6" strokeWidth={1.6} />
                </span>
                <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
                  {String(index + 1).padStart(2, '0')} / {String(categories.length).padStart(2, '0')}
                </span>
              </div>
              <h3 id={`belt-${category.id}`} className="relative mt-8 text-4xl font-medium tracking-[-0.045em] md:text-5xl">
                {category.name}
              </h3>
              <p className="relative mt-3 max-w-[30ch] text-sm leading-relaxed text-ink-soft">{category.description}</p>

              <ul data-belt-chips="" className="relative mt-6 flex flex-1 flex-wrap content-start gap-2" aria-label={`${category.name} tools`}>
                {category.tools.map((tool) => (
                  <li key={tool.id}>
                    <TransitionLink
                      href={toolHref(tool)}
                      transitionLabel={tool.name}
                      data-belt-chip=""
                      onClick={preventIfDragged}
                      draggable={false}
                      className="inline-flex touch-manipulation select-none items-center gap-2 rounded-full border border-line-strong bg-elevated/90 px-3.5 py-2 text-sm text-ink-soft shadow-[0_8px_24px_-12px_rgb(0_0_0/0.9)] transition-colors hover:border-[var(--accent)] hover:text-ink"
                    >
                      <ToolIcon name={tool.icon} className="size-4 text-[var(--accent)]" />
                      {tool.name}
                    </TransitionLink>
                  </li>
                ))}
              </ul>

              <TransitionLink
                href={categoryHref(category.id)}
                transitionLabel={category.name}
                className="relative mt-4 inline-flex items-center gap-2 self-start text-sm text-ink-soft transition-colors hover:text-ink"
              >
                {category.tools.length === 1 ? 'View the tool' : `View all ${category.tools.length}`}
                <ArrowRightIcon aria-hidden="true" className="size-4" />
              </TransitionLink>
            </article>
          ))}
          <div aria-hidden="true" className="w-2 shrink-0 md:w-[10vw]" />
        </div>
      </div>
    </section>
  )
}
