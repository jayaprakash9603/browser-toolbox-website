'use client'

import { highlight } from '@/components/tool/stage'
import { StoryLayout, type StoryConfig, type StoryProps } from '@/components/tool/story'

import Demo from './Demo'
import { DETAILS, FACTS, STEPS, XML_LINES, XML_MIN } from './script'

const config: StoryConfig = {
  problem: {
    variant: 'chars',
    text: 'The SOAP response is valid. It is also one line long and nobody can read it.',
    accent: ['one line long'],
    compare: 'stack',
    beforeLabel: 'Raw response',
    afterLabel: 'Formatted',
    before: (
      <p className="break-all font-mono text-sm leading-relaxed text-muted">{XML_MIN.repeat(3)}</p>
    ),
    after: (
      <div className="font-mono text-sm leading-relaxed">
        {XML_LINES.map(([depth, line], index) => (
          <p key={index} style={{ paddingLeft: depth * 20 }}>
            {highlight(line)}
          </p>
        ))}
      </div>
    ),
  },
  walk: { title: 'Read it, check it,', em: 'convert it', steps: STEPS },
  features: { layout: 'ticker', title: 'XML without', em: 'the headache', details: DETAILS },
  uses: { layout: 'quotes', title: 'Feeds, sitemaps', em: 'and old APIs' },
  facts: FACTS,
  backdrop: { kind: 'dots', at: 'problem' },
  order: 'features-first',
}

export default function Story({ features, useCases }: StoryProps) {
  return <StoryLayout config={config} demo={<Demo />} features={features} useCases={useCases} />
}
