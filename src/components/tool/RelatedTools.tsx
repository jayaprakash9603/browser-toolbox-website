'use client'

import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

import { ChapterLabel } from '@/components/ui/primitives'
import type { Tool } from '@/lib/types'
import { prefersReducedMotion } from '@/motion/gsap'
import { Reveal } from '@/motion/Reveal'

import { ToolCard } from './ToolCard'

export function RelatedTools({ tools, categoryNames }: { tools: Tool[]; categoryNames: Record<string, string> }) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [edges, setEdges] = useState({ start: true, end: false })

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const update = () => {
      setEdges({
        start: track.scrollLeft <= 4,
        end: track.scrollLeft + track.clientWidth >= track.scrollWidth - 4,
      })
    }
    update()
    track.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      track.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  const scrollByCard = (direction: 1 | -1) => {
    const track = trackRef.current
    const card = track?.querySelector<HTMLElement>('[data-related-card]')
    if (!track || !card) return
    track.scrollBy({ left: direction * (card.offsetWidth + 16), behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
  }

  return (
    <section aria-labelledby="related-title" className="py-24 md:py-32">
      <div className="mx-auto flex max-w-7xl items-end justify-between gap-6 px-6 md:px-10">
        <div>
          <ChapterLabel>Keep going</ChapterLabel>
          <h2 id="related-title" className="mt-5 text-4xl font-medium tracking-[-0.045em] md:text-5xl">
            Pairs well with
          </h2>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            aria-label="Scroll related tools left"
            disabled={edges.start}
            onClick={() => scrollByCard(-1)}
            className="flex size-12 items-center justify-center rounded-full border border-line-strong transition-colors hover:bg-white/5 disabled:cursor-default disabled:opacity-35"
          >
            <ArrowLeftIcon aria-hidden="true" className="size-4" />
          </button>
          <button
            type="button"
            aria-label="Scroll related tools right"
            disabled={edges.end}
            onClick={() => scrollByCard(1)}
            className="flex size-12 items-center justify-center rounded-full border border-line-strong transition-colors hover:bg-white/5 disabled:cursor-default disabled:opacity-35"
          >
            <ArrowRightIcon aria-hidden="true" className="size-4" />
          </button>
        </div>
      </div>
      <div
        ref={trackRef}
        className="no-scrollbar mt-12 snap-x snap-mandatory overflow-x-auto scroll-px-6 md:scroll-px-10"
      >
        <Reveal className="flex w-max gap-4 px-6 md:px-[max(2.5rem,calc((100vw-80rem)/2+2.5rem))]" y={36}>
          {tools.map((tool) => (
            <div key={tool.id} data-related-card="" className="w-[78vw] max-w-[340px] shrink-0 snap-start sm:w-[340px]">
              <ToolCard tool={tool} categoryName={categoryNames[tool.category]} />
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
