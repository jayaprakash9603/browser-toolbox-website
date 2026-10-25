'use client'

import { StoryLayout, type StoryConfig, type StoryProps } from '@/components/tool/story'

import Demo from './Demo'
import { DETAILS, FACTS, STEPS, WORDS } from './script'

const WAVE = Array.from({ length: 48 }, (_, index) =>
  Math.round(25 + Math.abs(Math.sin(index * 0.7) * Math.cos(index * 0.23)) * 75),
)

const config: StoryConfig = {
  problem: {
    variant: 'chars',
    text: 'Your eyes skip the typo on the fifth read. Your ears catch it on the first listen.',
    accent: ['the first listen.'],
    compare: 'split',
    beforeLabel: 'Reading',
    afterLabel: 'Listening',
    before: <p className="text-lg leading-relaxed text-muted">{WORDS.join(' ')}</p>,
    after: (
      <div className="space-y-5">
        <p className="text-lg leading-relaxed text-ink-soft">
          {WORDS.map((word, index) => (
            <span
              key={index}
              className={index === 9 ? 'rounded bg-[var(--accent)]/40 px-1 text-ink' : undefined}
            >
              {word}{' '}
            </span>
          ))}
        </p>
        <div className="flex h-12 items-center gap-1">
          {WAVE.map((height, index) => (
            <span
              key={index}
              className="w-1.5 rounded-full bg-[var(--accent)]"
              style={{ height: `${height}%`, opacity: index < 20 ? 1 : 0.35 }}
            />
          ))}
        </div>
      </div>
    ),
  },
  walk: { title: 'Press play,', em: 'follow along', steps: STEPS },
  features: {
    layout: 'reel',
    title: 'A narrator for',
    em: 'every tab',
    details: DETAILS,
    visuals: [
      <span key="a" className="rounded-lg border border-line-strong px-3 py-1.5 text-xs">
        Use page text
      </span>,
      <span key="b" className="font-mono text-sm">
        ▶ ❚❚ ■
      </span>,
      <span key="c" className="font-mono text-2xl text-[var(--accent)]">
        1.5×
      </span>,
      <span key="d" className="text-xs text-muted">
        English (UK) · System
      </span>,
    ],
  },
  uses: { layout: 'marquee', title: 'Give your eyes', em: 'a break' },
  facts: FACTS,
  backdrop: { kind: 'shader-waves', at: 'problem' },
}

export default function Story({ features, useCases }: StoryProps) {
  return <StoryLayout config={config} demo={<Demo />} features={features} useCases={useCases} />
}
