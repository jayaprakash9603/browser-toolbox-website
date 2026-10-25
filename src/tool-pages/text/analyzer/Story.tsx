'use client'

import { StoryLayout, type StoryConfig, type StoryProps } from '@/components/tool/story'

import Demo from './Demo'
import { DETAILS, FACTS, READABILITY_LABEL, STATS, STEPS, TEXT_LINES } from './script'

const config: StoryConfig = {
  problem: {
    variant: 'chars',
    text: 'The limit is 160 characters. You are counting on your fingers in a meeting.',
    accent: ['counting on your fingers'],
    compare: 'stack',
    beforeLabel: 'Guessing',
    afterLabel: 'Measured',
    before: (
      <div className="space-y-2 text-lg text-muted">
        {TEXT_LINES.slice(0, 2).map((line) => (
          <p key={line}>{line}</p>
        ))}
        <p className="font-mono text-sm text-rose">≈ 100 words? maybe?</p>
      </div>
    ),
    after: (
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          ['Words', STATS.words],
          ['Characters', STATS.characters],
          ['Sentences', STATS.sentences],
          ['Readability', `${STATS.readability} · ${READABILITY_LABEL}`],
        ].map(([label, value]) => (
          <div key={label as string}>
            <p className="text-xs text-muted">{label}</p>
            <p className="mt-1 text-2xl font-semibold tracking-tight text-ink">{value}</p>
          </div>
        ))}
      </div>
    ),
  },
  walk: { title: 'Every number', em: 'as you type', steps: STEPS },
  features: { layout: 'orbit', title: 'Five readings of', em: 'the same text', details: DETAILS },
  uses: { layout: 'fan', title: 'When every', em: 'character counts', center: true },
  facts: FACTS,
  backdrop: { kind: 'aurora', at: 'uses' },
}

export default function Story({ features, useCases }: StoryProps) {
  return <StoryLayout config={config} demo={<Demo />} features={features} useCases={useCases} />
}
