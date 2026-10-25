'use client'

import { StoryLayout, type StoryConfig, type StoryProps } from '@/components/tool/story'

import Demo from './Demo'
import { DETAILS, DUPLICATE_OF, FACTS, LIST, SORTED, STEPS } from './script'

const config: StoryConfig = {
  problem: {
    variant: 'scramble',
    text: 'Two exports, one list, and nobody knows how many duplicates are hiding in it.',
    accent: ['duplicates'],
    compare: 'split',
    beforeLabel: 'Merged by hand',
    afterLabel: 'Deduped and sorted',
    before: (
      <ul className="space-y-1.5 font-mono text-sm">
        {LIST.map((item, index) => (
          <li key={index} className={DUPLICATE_OF[index] === -1 ? 'text-ink-soft' : 'text-rose'}>
            {item}
          </li>
        ))}
      </ul>
    ),
    after: (
      <ol className="space-y-1.5 font-mono text-sm text-ink">
        {SORTED.map((index, slot) => (
          <li key={index}>
            <span className="mr-3 text-muted">{slot + 1}</span>
            {LIST[index]}
          </li>
        ))}
      </ol>
    ),
  },
  walk: { title: 'A list,', em: 'four ways', steps: STEPS },
  features: { layout: 'ticker', title: 'Every list chore', em: 'in one place', details: DETAILS },
  uses: { layout: 'timeline', title: 'From messy export', em: 'to clean list' },
  facts: FACTS,
  backdrop: { kind: 'beams', at: 'problem' },
}

export default function Story({ features, useCases }: StoryProps) {
  return <StoryLayout config={config} demo={<Demo />} features={features} useCases={useCases} />
}
