'use client'

import { StoryLayout, type StoryConfig, type StoryProps } from '@/components/tool/story'

import Demo from './Demo'
import { DETAILS, EPOCH, FACTS, FORMATS, LOG_RELATIVE, STEPS } from './script'

const config: StoryConfig = {
  problem: {
    variant: 'scramble',
    text: `The log line says ${EPOCH}. Was that this morning or last week?`,
    accent: [EPOCH],
    compare: 'split',
    beforeLabel: 'In the log',
    afterLabel: 'In One Panel',
    before: <p className="font-mono text-2xl text-ink-soft">ts={EPOCH}</p>,
    after: (
      <div className="text-left">
        <p className="font-mono text-base text-ink">{FORMATS[2].value}</p>
        <p className="mt-1 text-sm text-[var(--accent)]">{LOG_RELATIVE}</p>
      </div>
    ),
  },
  walk: { title: 'Every kind of', em: 'time question', steps: STEPS },
  features: { layout: 'reel', title: 'Four tools,', em: 'one tab strip', details: DETAILS },
  uses: { layout: 'marquee', title: 'From logs', em: 'to calendars' },
  facts: FACTS,
  backdrop: { kind: 'shader-waves', at: 'features' },
}

export default function Story({ features, useCases }: StoryProps) {
  return <StoryLayout config={config} demo={<Demo />} features={features} useCases={useCases} />
}
