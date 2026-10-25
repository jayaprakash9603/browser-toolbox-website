'use client'

import { StoryLayout, type StoryConfig, type StoryProps } from '@/components/tool/story'

import Demo from './Demo'
import { DETAILS, FACTS, PERCENT, PERCENT_RESULT, STEPS } from './script'

const KEYPRESSES = ['1', '2', '4', '0', '×', '1', '8', '=', '÷', '1', '0', '0', '=']

const config: StoryConfig = {
  problem: {
    variant: 'scrub',
    text: 'The spec has the whole formula. The calculator on your desktop wants it one key at a time.',
    accent: ['one key at a time'],
    compare: 'split',
    beforeLabel: 'Key by key',
    afterLabel: 'One expression',
    before: (
      <p className="flex flex-wrap justify-center gap-1 font-mono text-sm">
        {KEYPRESSES.map((key, index) => (
          <span
            key={index}
            className="rounded border border-line-strong px-1.5 py-0.5 text-ink-soft"
          >
            {key}
          </span>
        ))}
      </p>
    ),
    after: (
      <p className="font-mono text-base text-ink">
        {PERCENT.expr} <span className="text-[var(--accent)]">= {PERCENT_RESULT}</span>
      </p>
    ),
  },
  walk: { title: 'Maths,', em: 'as you write it', steps: STEPS },
  features: { layout: 'grid', title: 'A calculator', em: 'without eval', details: DETAILS },
  uses: { layout: 'quotes', title: 'Quick answers,', em: 'mid-review' },
  facts: FACTS,
  backdrop: { kind: 'grid', at: 'features' },
}

export default function Story({ features, useCases }: StoryProps) {
  return <StoryLayout config={config} demo={<Demo />} features={features} useCases={useCases} />
}
