'use client'

import { StoryLayout, type StoryConfig, type StoryProps } from '@/components/tool/story'

import Demo from './Demo'
import { DETAILS, FACTS, STEPS, TARGETS } from './script'

const config: StoryConfig = {
  problem: {
    variant: 'outline',
    text: 'What font is that? Right-click, Inspect, Computed, scroll, scroll, scroll. Then do it again for the next heading.',
    accent: ['scroll, scroll, scroll.'],
    compare: 'split',
    beforeLabel: 'DevTools',
    afterLabel: 'Hover',
    before: (
      <pre className="font-mono text-xs leading-relaxed text-muted">
        {`align-items: normal\nbackground-color: rgba(0, 0, 0, 0)\nborder-bottom-color: rgb(17, 17, 17)\n…\nfont-family: Geist, ui-sans-serif…\nfont-feature-settings: normal\nfont-kerning: auto\nfont-size: 48px\n…`}
      </pre>
    ),
    after: (
      <div className="space-y-3">
        <p className="text-4xl font-bold tracking-tight text-ink">Ship faster</p>
        <p className="w-fit rounded-md bg-black/80 px-3 py-2 text-sm text-white">
          {TARGETS[0].tip}
        </p>
      </div>
    ),
  },
  walk: { title: 'Hover,', em: 'and read the type', steps: STEPS },
  features: { layout: 'stack', title: 'Typography,', em: 'on contact', details: DETAILS },
  uses: { layout: 'fan', title: 'Name that', em: 'typeface' },
  facts: FACTS,
  backdrop: { kind: 'dots', at: 'features' },
}

export default function Story({ features, useCases }: StoryProps) {
  return <StoryLayout config={config} demo={<Demo />} features={features} useCases={useCases} />
}
