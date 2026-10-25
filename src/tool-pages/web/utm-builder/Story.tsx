'use client'

import { StoryLayout, type StoryConfig, type StoryProps } from '@/components/tool/story'

import Demo from './Demo'
import { BASE, DETAILS, FACTS, PIECES, STEPS, URL_OUT } from './script'

const config: StoryConfig = {
  problem: {
    variant: 'blur',
    text: 'One typo in a hand-built campaign link and a whole send lands under the wrong source in analytics.',
    accent: ['under the wrong source'],
    compare: 'wipe',
    beforeLabel: 'Typed by hand',
    afterLabel: 'Built',
    before: (
      <p className="break-all font-mono text-sm leading-relaxed text-muted">{`${BASE}?utm_source=newsleter&utm-medium=email&utm_campaign=spring sale`}</p>
    ),
    after: (
      <div className="space-y-3">
        <div className="flex flex-wrap gap-1.5 font-mono text-xs">
          {PIECES.map((piece) => (
            <span
              key={piece.key}
              className="rounded-md border px-2 py-1"
              style={{ color: piece.color, borderColor: piece.color }}
            >
              {piece.key}={piece.value}
            </span>
          ))}
        </div>
        <p className="break-all font-mono text-sm text-ink">{URL_OUT}</p>
      </div>
    ),
  },
  walk: { title: 'A campaign link,', em: 'piece by piece', steps: STEPS },
  features: { layout: 'bento', title: 'Tagged links', em: 'without typos', details: DETAILS },
  uses: { layout: 'timeline', title: 'From inbox', em: 'to poster' },
  facts: FACTS,
  backdrop: { kind: 'shader-flow', at: 'features' },
}

export default function Story({ features, useCases }: StoryProps) {
  return <StoryLayout config={config} demo={<Demo />} features={features} useCases={useCases} />
}
