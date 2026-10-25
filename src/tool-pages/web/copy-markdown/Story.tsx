'use client'

import { StoryLayout, type StoryConfig, type StoryProps } from '@/components/tool/story'

import Demo from './Demo'
import { DETAILS, FACTS, SELECTION_MD, STEPS } from './script'

const config: StoryConfig = {
  problem: {
    variant: 'scrub',
    text: 'Paste a paragraph into your notes and the bold and the links quietly disappear.',
    accent: ['quietly disappear.'],
    compare: 'stack',
    beforeLabel: 'Plain paste',
    afterLabel: 'Markdown',
    before: (
      <p className="text-sm leading-relaxed text-muted">
        {SELECTION_MD.replace(/\*\*/g, '').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')}
      </p>
    ),
    after: <p className="font-mono text-sm leading-relaxed text-ink">{SELECTION_MD}</p>,
  },
  walk: { title: 'From page', em: 'to Markdown', steps: STEPS, flip: true },
  features: {
    layout: 'reel',
    title: 'Clippings that',
    em: 'keep their formatting',
    details: DETAILS,
  },
  uses: { layout: 'marquee', title: 'Straight into', em: 'your notes' },
  facts: FACTS,
  backdrop: { kind: 'dots', at: 'uses' },
}

export default function Story({ features, useCases }: StoryProps) {
  return <StoryLayout config={config} demo={<Demo />} features={features} useCases={useCases} />
}
