'use client'

import { StoryLayout, type StoryConfig, type StoryProps } from '@/components/tool/story'

import Demo from './Demo'
import { CATEGORIES, DETAILS, FACTS, HITS, STEPS } from './script'

const config: StoryConfig = {
  problem: {
    variant: 'scramble',
    text: 'What is this site built with? The clues are all in the page, scattered across a dozen minified script tags.',
    accent: ['a dozen minified script tags.'],
    compare: 'wipe',
    beforeLabel: 'Script tags',
    afterLabel: 'Detected',
    before: (
      <pre className="whitespace-pre-wrap break-all font-mono text-xs leading-relaxed text-muted">
        {HITS.filter((hit) => hit.evidence.startsWith('http'))
          .map((hit) => `<script src="${hit.evidence}">`)
          .join('\n')}
      </pre>
    ),
    after: (
      <div className="flex flex-wrap gap-2">
        {HITS.map((hit) => {
          const category = CATEGORIES.find((item) => item.key === hit.category)
          return (
            <span
              key={hit.name}
              className="rounded-full border px-3 py-1 text-sm"
              style={{ color: category?.color, borderColor: category?.color }}
            >
              {hit.name}
            </span>
          )
        })}
      </div>
    ),
  },
  walk: { title: 'A site’s stack,', em: 'on the radar', steps: STEPS, flip: true },
  features: { layout: 'ticker', title: 'What it', em: 'can spot', details: DETAILS },
  uses: { layout: 'fan', title: 'Know the stack', em: 'before the call' },
  facts: FACTS,
  backdrop: { kind: 'rings', at: 'features' },
}

export default function Story({ features, useCases }: StoryProps) {
  return <StoryLayout config={config} demo={<Demo />} features={features} useCases={useCases} />
}
