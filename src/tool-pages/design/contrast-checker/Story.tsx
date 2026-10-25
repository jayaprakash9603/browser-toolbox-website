'use client'

import { StoryLayout, type StoryConfig, type StoryProps } from '@/components/tool/story'

import Demo from './Demo'
import { DETAILS, FACTS, FOREGROUND, STEPS, STOPS } from './script'

const first = STOPS[0]
const last = STOPS[STOPS.length - 1]

const config: StoryConfig = {
  problem: {
    variant: 'scramble',
    text: 'The button looks fine on your monitor. For a lot of readers, white on pastel pink is close to invisible.',
    accent: ['close to invisible.'],
    compare: 'wipe',
    beforeLabel: `${first.ratio}:1`,
    afterLabel: `${last.ratio}:1`,
    before: (
      <span
        className="inline-block rounded-xl px-8 py-4 text-lg font-medium"
        style={{ backgroundColor: first.hex, color: FOREGROUND }}
      >
        Start free trial
      </span>
    ),
    after: (
      <span
        className="inline-block rounded-xl px-8 py-4 text-lg font-medium"
        style={{ backgroundColor: last.hex, color: FOREGROUND }}
      >
        Start free trial
      </span>
    ),
  },
  walk: { title: 'Drag until', em: 'it passes', steps: STEPS, flip: true },
  features: { layout: 'grid', title: 'WCAG,', em: 'without the maths', details: DETAILS },
  uses: { layout: 'timeline', title: 'Readable', em: 'by everyone' },
  facts: FACTS,
  backdrop: { kind: 'beams', at: 'problem' },
}

export default function Story({ features, useCases }: StoryProps) {
  return <StoryLayout config={config} demo={<Demo />} features={features} useCases={useCases} />
}
