'use client'

import { StoryLayout, type StoryConfig, type StoryProps } from '@/components/tool/story'

import Demo from './Demo'
import { ASSETS, DETAILS, FACTS, PICKED, STEPS } from './script'

const config: StoryConfig = {
  problem: {
    variant: 'scramble',
    text: 'The CI report lives on a server that wipes it in a week. Save Page As keeps one page at a time, not the pages it links to.',
    accent: ['one page at a time,'],
    compare: 'split',
    beforeLabel: 'Save Page As',
    afterLabel: 'HTML Bundle',
    before: (
      <div className="space-y-1 font-mono text-sm text-muted">
        <p>index.html</p>
        <p className="line-through">login.html</p>
        <p className="line-through">checkout.html</p>
        <p className="line-through">search.html</p>
      </div>
    ),
    after: (
      <div className="space-y-1 font-mono text-sm">
        <p className="text-ink">nightly-report.zip</p>
        <p className="text-ink-soft">
          {PICKED.length} pages · {ASSETS.length} assets
        </p>
        <p className="text-muted">{ASSETS.slice(0, 4).join(' · ')}</p>
      </div>
    ),
  },
  walk: { title: 'A whole report,', em: 'in one file', steps: STEPS },
  features: { layout: 'orbit', title: 'Reports that', em: 'outlive the server', details: DETAILS },
  uses: { layout: 'fan', title: 'Keep it,', em: 'send it' },
  facts: FACTS,
  backdrop: { kind: 'shader-plasma', at: 'problem' },
}

export default function Story({ features, useCases }: StoryProps) {
  return <StoryLayout config={config} demo={<Demo />} features={features} useCases={useCases} />
}
