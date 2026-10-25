'use client'

import { StoryLayout, type StoryConfig, type StoryProps } from '@/components/tool/story'

import Demo from './Demo'
import { DETAILS, FACTS, MODE, OCTAL, STEPS } from './script'

const config: StoryConfig = {
  problem: {
    variant: 'blur',
    text: `The API says the file mode is ${MODE.input}. chmod wants octal. Quick, what is that?`,
    accent: ['octal'],
    compare: 'stack',
    beforeLabel: 'What the API returns',
    afterLabel: 'What chmod wants',
    before: <p className="font-mono text-3xl text-ink-soft">mode: {MODE.input}</p>,
    after: (
      <p className="font-mono text-3xl text-ink">
        chmod <span className="text-[var(--accent)]">{OCTAL}</span> deploy.sh
      </p>
    ),
  },
  walk: { title: 'Every base', em: 'at a glance', steps: STEPS },
  features: { layout: 'orbit', title: 'Two, eight,', em: 'ten and sixteen', details: DETAILS },
  uses: { layout: 'timeline', title: 'Bits and bytes,', em: 'decoded' },
  facts: FACTS,
  backdrop: { kind: 'dots', at: 'uses' },
}

export default function Story({ features, useCases }: StoryProps) {
  return <StoryLayout config={config} demo={<Demo />} features={features} useCases={useCases} />
}
