'use client'

import { PlusIcon } from 'lucide-react'
import { useId, useState, type ReactNode } from 'react'

import { ChapterLabel } from '@/components/ui/primitives'
import { cn } from '@/lib/cn'
import { Reveal } from '@/motion/Reveal'
import { SplitReveal } from '@/motion/SplitReveal'

export interface FaqItem {
  question: string
  answer: ReactNode
  /** Plain-text answer for structured data. */
  text: string
}

function FaqRow({ item, open, onToggle }: { item: FaqItem; open: boolean; onToggle: () => void }) {
  const id = useId()
  return (
    <div className="border-b border-line">
      <h3>
        <button
          type="button"
          id={`${id}-button`}
          aria-expanded={open}
          aria-controls={`${id}-panel`}
          onClick={onToggle}
          className="group flex w-full items-center justify-between gap-6 py-7 text-left text-lg font-medium tracking-tight md:text-2xl"
        >
          <span className="transition-colors group-hover:text-white">{item.question}</span>
          <span
            className={cn(
              'flex size-10 shrink-0 items-center justify-center rounded-full border border-line-strong transition-[transform,background-color] duration-500 ease-[var(--ease-out-expo)]',
              open && 'rotate-45 bg-ink text-canvas',
            )}
          >
            <PlusIcon aria-hidden="true" className="size-4" />
          </span>
        </button>
      </h3>
      <div
        id={`${id}-panel`}
        role="region"
        aria-labelledby={`${id}-button`}
        className={cn(
          'grid transition-[grid-template-rows,opacity] duration-500 ease-[var(--ease-out-expo)]',
          open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
        )}
        inert={!open}
      >
        <div className="overflow-hidden">
          <div className="max-w-3xl pb-8 text-base leading-relaxed text-muted md:text-lg">{item.answer}</div>
        </div>
      </div>
    </div>
  )
}

export function Faq({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section aria-labelledby="faq-title" className="section-auto mx-auto grid max-w-7xl gap-12 px-6 py-28 md:grid-cols-[0.8fr_1.2fr] md:px-10 md:py-36">
      <div>
        <ChapterLabel index="10">Questions</ChapterLabel>
        <SplitReveal as="h2" id="faq-title" type="words" className="mt-6 text-title font-medium tracking-[-0.045em]">
          Good to know.
        </SplitReveal>
      </div>
      <Reveal className="border-t border-line" stagger={0.05} y={20}>
        {items.map((item, index) => (
          <FaqRow
            key={item.question}
            item={item}
            open={openIndex === index}
            onToggle={() => setOpenIndex((current) => (current === index ? null : index))}
          />
        ))}
      </Reveal>
    </section>
  )
}
