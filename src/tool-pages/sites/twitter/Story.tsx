'use client'

import { StoryLayout, type StoryConfig, type StoryProps } from '@/components/tool/story'

import Demo from './Demo'
import { DETAILS, FACTS, FILLS, STEPS } from './script'

const config: StoryConfig = {
  problem: {
    variant: 'outline',
    text: 'X search can do almost anything, if you remember min_faves, filter:media and the date syntax.',
    accent: ['if you remember'],
    compare: 'stack',
    beforeLabel: 'What you type from memory',
    afterLabel: 'What One Panel builds',
    before: (
      <p className="font-mono text-sm text-ink-soft">
        northwind release notes popular with pictures this year
      </p>
    ),
    after: (
      <p className="flex flex-wrap gap-2 font-mono text-sm">
        {FILLS.map((fill) => (
          <span key={fill.token} className="rounded-md bg-[#1d9bf0]/15 px-2 py-1 text-[#7dd3fc]">
            {fill.token}
          </span>
        ))}
      </p>
    ),
  },
  walk: { title: 'Search X', em: 'like a pro', steps: STEPS, flip: true },
  features: { layout: 'stack', title: 'Operators,', em: 'not guesswork', details: DETAILS },
  uses: { layout: 'tilt', title: 'Find it,', em: 'then post it' },
  facts: FACTS,
  backdrop: { kind: 'meteors', at: 'problem' },
}

export default function Story({ features, useCases }: StoryProps) {
  return <StoryLayout config={config} demo={<Demo />} features={features} useCases={useCases} />
}
