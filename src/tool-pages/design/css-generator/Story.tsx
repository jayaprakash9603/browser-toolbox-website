'use client'

import { StoryLayout, type StoryConfig, type StoryProps } from '@/components/tool/story'

import Demo from './Demo'
import { CODE, DETAILS, FACTS, PREVIEW, SELECTOR, STEPS } from './script'

const config: StoryConfig = {
  problem: {
    variant: 'scramble',
    text: 'A shimmer button means a pseudo-element, a keyframe, a hover state, a focus ring and a reduced-motion fallback. Writing all of that by hand, every time, is how effects ship half-finished.',
    accent: ['ship half-finished.'],
    compare: 'split',
    beforeLabel: 'From memory',
    afterLabel: 'Generated',
    before: (
      <pre className="whitespace-pre-wrap font-mono text-xs leading-relaxed text-muted">
        {
          '.cta::after {\n  /* content? inset? */\n  animation: shimmer 3s infinite;\n}\n/* keyframes… somewhere */\n/* hover, focus, reduced motion: later */'
        }
      </pre>
    ),
    after: (
      <div className="flex flex-col items-start gap-4">
        <span className="rounded-xl bg-[#f1f5f9] p-4">
          <span style={PREVIEW.shimmer}>
            {PREVIEW.label}
            <span style={{ ...PREVIEW.shimmerSheen, transform: 'translateX(20%)' }} />
          </span>
        </span>
        <pre className="whitespace-pre-wrap font-mono text-xs leading-relaxed text-ink">
          {CODE[3]
            .split('\n\n')
            .map((chunk) => chunk.split('\n')[0])
            .join('\n')}
        </pre>
        <p className="text-xs text-muted">Every rule above, written for {SELECTOR}.</p>
      </div>
    ),
  },
  walk: { title: 'From preset to', em: 'stylesheet', steps: STEPS },
  features: { layout: 'grid', title: 'Every effect,', em: 'one picker', details: DETAILS },
  uses: { layout: 'timeline', title: 'Polish,', em: 'without the guesswork' },
  facts: FACTS,
  backdrop: { kind: 'shader-flow', at: 'uses' },
}

export default function Story({ features, useCases }: StoryProps) {
  return <StoryLayout config={config} demo={<Demo />} features={features} useCases={useCases} />
}
