'use client'

import { StoryLayout, type StoryConfig, type StoryProps } from '@/components/tool/story'

import Demo from './Demo'
import { DETAILS, FACTS, OUTPUTS, STEPS, TEXT } from './script'

const config: StoryConfig = {
  problem: {
    variant: 'scramble',
    text: 'The header is Base64, the query string is percent-encoded and the code sample needs HTML entities. That is three different sites for one string.',
    accent: ['three different sites'],
    compare: 'split',
    beforeLabel: 'One string',
    afterLabel: 'Five encodings',
    before: <p className="font-mono text-3xl text-ink">{TEXT}</p>,
    after: (
      <dl className="grid grid-cols-[5rem_1fr] gap-x-4 gap-y-2 font-mono text-sm">
        {OUTPUTS.map((output) => (
          <div key={output.id} className="contents">
            <dt className="text-muted">{output.label}</dt>
            <dd className="break-all text-ink">{output.value}</dd>
          </div>
        ))}
      </dl>
    ),
  },
  walk: { title: 'Five encodings,', em: 'both directions', steps: STEPS },
  features: { layout: 'grid', title: 'Every escape', em: 'you reach for', details: DETAILS },
  uses: { layout: 'marquee', title: 'Decode it,', em: 'escape it' },
  facts: FACTS,
  backdrop: { kind: 'shader-plasma', at: 'features' },
}

export default function Story({ features, useCases }: StoryProps) {
  return <StoryLayout config={config} demo={<Demo />} features={features} useCases={useCases} />
}
