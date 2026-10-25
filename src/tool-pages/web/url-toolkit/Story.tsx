'use client'

import { StoryLayout, type StoryConfig, type StoryProps } from '@/components/tool/story'

import Demo from './Demo'
import { CLEANED, DETAILS, EDITED, FACTS, STEPS } from './script'

const config: StoryConfig = {
  problem: {
    variant: 'outline',
    text: 'The link you are about to share is half tracking tags. Somewhere inside it is the page you actually meant.',
    accent: ['half tracking tags.'],
    compare: 'split',
    beforeLabel: 'As copied',
    afterLabel: 'Cleaned',
    before: <p className="break-all font-mono text-sm leading-relaxed text-muted">{EDITED}</p>,
    after: <p className="break-all font-mono text-sm leading-relaxed text-ink">{CLEANED}</p>,
  },
  walk: { title: 'One URL,', em: 'taken apart', steps: STEPS, flip: true },
  features: { layout: 'grid', title: 'Every piece', em: 'within reach', details: DETAILS },
  uses: { layout: 'quotes', title: 'Links worth', em: 'sharing' },
  facts: FACTS,
  backdrop: { kind: 'shader-grid', at: 'problem' },
}

export default function Story({ features, useCases }: StoryProps) {
  return <StoryLayout config={config} demo={<Demo />} features={features} useCases={useCases} />
}
