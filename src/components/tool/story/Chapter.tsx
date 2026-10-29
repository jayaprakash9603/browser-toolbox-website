import type { ReactNode } from 'react'

import { ChapterLabel } from '@/components/ui/primitives'
import { cn } from '@/lib/cn'
import { SplitReveal } from '@/motion/SplitReveal'

interface ChapterHeadProps {
  index: string
  eyebrow: string
  title: string
  /** Serif italic tail of the title, in the accent colour. */
  em?: string
  body?: ReactNode
  className?: string
  align?: 'left' | 'center'
}

export function ChapterHead({
  index,
  eyebrow,
  title,
  em,
  body,
  className,
  align = 'left',
}: ChapterHeadProps) {
  return (
    <div className={cn(align === 'center' && 'mx-auto text-center', 'max-w-3xl', className)}>
      <ChapterLabel index={index} className={align === 'center' ? 'justify-center' : undefined}>
        {eyebrow}
      </ChapterLabel>
      <SplitReveal as="h2" type="words" className="mt-5 text-title font-medium tracking-[-0.05em]">
        {title}
        {em ? (
          <>
            {' '}
            <span className="font-serif font-normal italic tracking-[-0.02em] text-[var(--accent)]">
              {em}
            </span>
          </>
        ) : null}
      </SplitReveal>
      {body ? (
        <div
          className={cn(
            'mt-6 max-w-xl text-lg leading-relaxed text-muted',
            align === 'center' && 'mx-auto',
          )}
        >
          {body}
        </div>
      ) : null}
    </div>
  )
}
