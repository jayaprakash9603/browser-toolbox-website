'use client'

import { StoryLayout, type StoryConfig, type StoryProps } from '@/components/tool/story'

import Demo from './Demo'
import { DETAILS, FACTS, HOPS, STEPS } from './script'

const config: StoryConfig = {
  problem: {
    variant: 'outline',
    text: 'You clicked one link and ended up somewhere else. The address bar only remembers the last stop.',
    accent: ['the last stop.'],
    compare: 'stack',
    beforeLabel: 'Address bar',
    afterLabel: 'Traced',
    before: <p className="font-mono text-sm text-muted">{HOPS[HOPS.length - 1].url}</p>,
    after: (
      <ol className="space-y-2 text-sm">
        {HOPS.map((hop, index) => (
          <li key={hop.url} className="flex gap-3">
            <span className="text-muted">#{index + 1}</span>
            <span>
              <span className="block break-all font-mono text-ink">{hop.url}</span>
              <span className="text-xs text-muted">{hop.note}</span>
            </span>
          </li>
        ))}
      </ol>
    ),
  },
  walk: { title: 'Follow the link', em: 'all the way', steps: STEPS },
  features: { layout: 'stack', title: 'Every stop', em: 'on the way', details: DETAILS },
  uses: { layout: 'quotes', title: 'When a link', em: 'takes a detour' },
  facts: FACTS,
  backdrop: { kind: 'beams', at: 'uses' },
}

export default function Story({ features, useCases }: StoryProps) {
  return <StoryLayout config={config} demo={<Demo />} features={features} useCases={useCases} />
}
