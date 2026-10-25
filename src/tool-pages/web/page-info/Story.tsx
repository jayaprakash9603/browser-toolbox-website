'use client'

import { StoryLayout, type StoryConfig, type StoryProps } from '@/components/tool/story'

import Demo from './Demo'
import { BASICS, DETAILS, FACTS, OPEN_GRAPH, STEPS, TWITTER } from './script'

const config: StoryConfig = {
  problem: {
    variant: 'scrub',
    text: 'Launch day, and nobody is sure what the share card will say. The answer is in the page source, somewhere around line 40.',
    accent: ['somewhere around line 40.'],
    compare: 'split',
    beforeLabel: 'View source',
    afterLabel: 'Page Info',
    before: (
      <pre className="whitespace-pre-wrap font-mono text-xs leading-relaxed text-muted">
        {`<meta charset="utf-8">\n<link rel="preload" href="/f.woff2">\n<meta property="og:title"\n  content="${OPEN_GRAPH[0].value}">\n<script src="/a.js" defer></script>\n<meta name="twitter:card"\n  content="${TWITTER[0].value}">`}
      </pre>
    ),
    after: (
      <dl className="space-y-2 text-sm">
        {[
          ['Title', BASICS[0].value],
          ['Canonical', BASICS[3].value],
          ['og:title', OPEN_GRAPH[0].value],
          ['twitter:card', TWITTER[0].value],
        ].map(([label, value]) => (
          <div key={label}>
            <dt className="text-xs text-muted">{label}</dt>
            <dd className="text-ink">{value}</dd>
          </div>
        ))}
      </dl>
    ),
  },
  walk: { title: 'The page’s', em: 'paperwork', steps: STEPS },
  features: { layout: 'orbit', title: 'Every tag', em: 'that matters', details: DETAILS },
  uses: { layout: 'marquee', title: 'Before you', em: 'hit publish' },
  facts: FACTS,
  backdrop: { kind: 'grid', at: 'problem' },
}

export default function Story({ features, useCases }: StoryProps) {
  return <StoryLayout config={config} demo={<Demo />} features={features} useCases={useCases} />
}
