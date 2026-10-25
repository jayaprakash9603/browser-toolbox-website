'use client'

import { StoryLayout, type StoryConfig, type StoryProps } from '@/components/tool/story'

import Demo from './Demo'
import { DETAILS, FACTS, INPUTS, ROWS, STEPS } from './script'

const config: StoryConfig = {
  problem: {
    variant: 'chars',
    text: 'The brand guide says HEX, the print shop wants CMYK and the stylesheet uses hsl(). Three tabs of converters later, the numbers still disagree.',
    accent: ['the numbers still disagree.'],
    compare: 'wipe',
    beforeLabel: 'One format',
    afterLabel: 'All six',
    before: <p className="font-mono text-3xl text-ink">{INPUTS[0].typed}</p>,
    after: (
      <dl className="grid grid-cols-[4rem_1fr] gap-x-4 gap-y-1.5 font-mono text-sm">
        {ROWS[0].map((row) => (
          <div key={row.label} className="contents">
            <dt className="text-muted">{row.label}</dt>
            <dd className="text-ink">{row.value}</dd>
          </div>
        ))}
      </dl>
    ),
  },
  walk: { title: 'One colour,', em: 'every notation', steps: STEPS },
  features: { layout: 'ticker', title: 'Six formats,', em: 'always in sync', details: DETAILS },
  uses: { layout: 'quotes', title: 'From screen', em: 'to print' },
  facts: FACTS,
  backdrop: { kind: 'shader-waves', at: 'features' },
}

export default function Story({ features, useCases }: StoryProps) {
  return <StoryLayout config={config} demo={<Demo />} features={features} useCases={useCases} />
}
