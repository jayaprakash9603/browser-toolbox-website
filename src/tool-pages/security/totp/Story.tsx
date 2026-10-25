'use client'

import { StoryLayout, type StoryConfig, type StoryProps } from '@/components/tool/story'

import Demo from './Demo'
import { ACCOUNTS, DETAILS, FACTS, STEPS } from './script'

const config: StoryConfig = {
  problem: {
    variant: 'scrub',
    text: 'Every staging login stops to ask for a code from the phone on the other side of the desk.',
    accent: ['the other side of the desk.'],
    compare: 'wipe',
    beforeLabel: 'Waiting on a phone',
    afterLabel: 'Already in the panel',
    before: <p className="font-mono text-5xl tracking-[0.3em] text-muted">······</p>,
    after: (
      <div>
        <p className="text-sm text-muted">{ACCOUNTS[0].label}</p>
        <p className="font-mono text-5xl tracking-[0.3em] text-ink">{ACCOUNTS[0].codes[0]}</p>
      </div>
    ),
  },
  walk: { title: 'Two-factor,', em: 'one panel over', steps: STEPS },
  features: { layout: 'stack', title: 'Codes for', em: 'every test account', details: DETAILS },
  uses: { layout: 'quotes', title: 'Less reaching', em: 'for your phone' },
  facts: FACTS,
  backdrop: { kind: 'rings', at: 'problem' },
}

export default function Story({ features, useCases }: StoryProps) {
  return <StoryLayout config={config} demo={<Demo />} features={features} useCases={useCases} />
}
