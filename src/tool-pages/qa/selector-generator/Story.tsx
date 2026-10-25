'use client'

import { StoryLayout, type StoryConfig, type StoryProps } from '@/components/tool/story'

import Demo from './Demo'
import { DETAILS, FACTS, SELECTORS, STEPS } from './script'

const config: StoryConfig = {
  problem: {
    variant: 'scramble',
    text: 'The test passed for a month. Then someone added a wrapper div and div:nth-child(3) > span broke the build.',
    accent: ['div:nth-child(3) > span'],
    compare: 'stack',
    beforeLabel: 'Copied from DevTools',
    afterLabel: 'Generated',
    before: (
      <p className="break-all font-mono text-sm text-rose">
        body &gt; div:nth-child(2) &gt; div &gt; div:nth-child(3) &gt; div:nth-child(1) &gt; span
      </p>
    ),
    after: (
      <div className="space-y-2 font-mono text-sm">
        <p className="text-emerald">{SELECTORS[0].value}</p>
        <p className="text-ink-soft">{SELECTORS[3].value}</p>
      </div>
    ),
  },
  walk: { title: 'Selectors that', em: 'survive refactors', steps: STEPS, flip: true },
  features: { layout: 'ticker', title: 'Every way to', em: 'find it', details: DETAILS },
  uses: { layout: 'marquee', title: 'Locators for', em: 'every runner' },
  facts: FACTS,
  backdrop: { kind: 'shader-flow', at: 'uses' },
}

export default function Story({ features, useCases }: StoryProps) {
  return <StoryLayout config={config} demo={<Demo />} features={features} useCases={useCases} />
}
