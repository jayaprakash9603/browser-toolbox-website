'use client'

import { StoryLayout, type StoryConfig, type StoryProps } from '@/components/tool/story'

import Demo from './Demo'
import { DETAILS, FACTS, REPORT, STEPS } from './script'

const config: StoryConfig = {
  problem: {
    variant: 'scrub',
    text: '“It’s broken on the shop page.” Which page? Which browser? What did you click? The ticket bounces back three times.',
    accent: ['bounces back three times.'],
    compare: 'wipe',
    beforeLabel: 'The usual ticket',
    afterLabel: 'Generated report',
    before: <p className="text-lg text-muted">“Price thing is broken on the shop page, pls fix”</p>,
    after: (
      <div className="space-y-1 font-mono text-xs text-ink-soft">
        {REPORT.slice(0, 10).map((line) => (
          <p key={line} className={line.startsWith('#') ? 'text-[var(--accent)]' : undefined}>
            {line}
          </p>
        ))}
      </div>
    ),
  },
  walk: { title: 'Reports that', em: 'answer the questions', steps: STEPS, flip: true },
  features: { layout: 'stack', title: 'Context,', em: 'attached', details: DETAILS },
  uses: { layout: 'timeline', title: 'Tickets nobody', em: 'has to chase' },
  facts: FACTS,
  backdrop: { kind: 'shader-waves', at: 'features' },
}

export default function Story({ features, useCases }: StoryProps) {
  return <StoryLayout config={config} demo={<Demo />} features={features} useCases={useCases} />
}
