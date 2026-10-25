'use client'

import { StoryLayout, type StoryConfig, type StoryProps } from '@/components/tool/story'

import Demo from './Demo'
import { DETAILS, FACTS, STATES, STEPS, VALUE } from './script'

const config: StoryConfig = {
  problem: {
    variant: 'chars',
    text: 'A 500 GB drive shows up as 465. Nothing went missing: one number counts in thousands, the other in 1024s.',
    accent: ['1024s'],
    compare: 'wipe',
    beforeLabel: 'On the box (10⁹)',
    afterLabel: 'In binary units (2³⁰)',
    before: <p className="font-mono text-3xl font-semibold text-ink">{VALUE} GB</p>,
    after: (
      <p className="font-mono text-3xl font-semibold text-ink">
        {STATES.typed.result} <span className="text-[var(--accent)]">GiB</span>
      </p>
    ),
  },
  walk: { title: 'Any unit,', em: 'either way round', steps: STEPS, flip: true },
  features: { layout: 'ticker', title: 'Thirteen kinds', em: 'of measurement', details: DETAILS },
  uses: { layout: 'fan', title: 'Numbers you', em: 'can trust' },
  facts: FACTS,
  backdrop: { kind: 'aurora', at: 'problem' },
}

export default function Story({ features, useCases }: StoryProps) {
  return <StoryLayout config={config} demo={<Demo />} features={features} useCases={useCases} />
}
