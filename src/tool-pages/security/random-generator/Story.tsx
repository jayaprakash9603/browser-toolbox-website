'use client'

import { StoryLayout, type StoryConfig, type StoryProps } from '@/components/tool/story'

import Demo from './Demo'
import { DETAILS, FACTS, ROLLS, STEPS, TABS } from './script'

const config: StoryConfig = {
  problem: {
    variant: 'chars',
    text: 'Typing test123 as an ID or picking a winner in your head is how collisions and bias sneak in.',
    accent: ['collisions and bias'],
    compare: 'stack',
    beforeLabel: 'Made up',
    afterLabel: 'Generated',
    before: (
      <ul className="space-y-2 font-mono text-xl text-muted">
        <li>test123</li>
        <li>user-1</li>
        <li>“I’ll pick number 7”</li>
      </ul>
    ),
    after: (
      <dl className="grid grid-cols-[5rem_1fr] gap-x-4 gap-y-2 font-mono text-sm">
        {ROLLS.map((roll) => (
          <div key={roll.tab} className="contents">
            <dt className="text-muted">{TABS[roll.tab]}</dt>
            <dd className="break-all text-ink">{roll.value}</dd>
          </div>
        ))}
      </dl>
    ),
  },
  walk: { title: 'Five kinds', em: 'of random', steps: STEPS, flip: true },
  features: { layout: 'ticker', title: 'Numbers, strings', em: 'and IDs', details: DETAILS },
  uses: { layout: 'marquee', title: 'Fair picks,', em: 'unique keys' },
  facts: FACTS,
  backdrop: { kind: 'meteors', at: 'uses' },
}

export default function Story({ features, useCases }: StoryProps) {
  return <StoryLayout config={config} demo={<Demo />} features={features} useCases={useCases} />
}
