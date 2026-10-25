'use client'

import { StoryLayout, type StoryConfig, type StoryProps } from '@/components/tool/story'

import Demo from './Demo'
import { CATEGORY_COLOR, CODES, DETAILS, FACTS, STEPS, search } from './script'

const SAMPLE = [search('422')[0], search('502')[0], search('409')[0]]
const GROUPS = Object.entries(CATEGORY_COLOR)

const config: StoryConfig = {
  problem: {
    variant: 'chars',
    text: 'The log says 422. Is that you, the client, or the server? Cue a search engine and three tabs of forum answers.',
    accent: ['three tabs'],
    compare: 'stack',
    beforeLabel: 'In the log',
    afterLabel: 'In the panel',
    before: (
      <div className="space-y-1.5 font-mono text-sm text-muted">
        <p>POST /api/orders 422</p>
        <p>GET /api/stock 502</p>
        <p>PUT /api/cart/7 409</p>
      </div>
    ),
    after: (
      <div className="space-y-2 text-sm">
        {SAMPLE.map((entry) => (
          <p key={entry.code}>
            <span className="font-mono" style={{ color: CATEGORY_COLOR[entry.category] }}>
              {entry.code}
            </span>{' '}
            <span className="text-ink">{entry.name}</span>{' '}
            <span className="text-muted">· {entry.hint}</span>
          </p>
        ))}
      </div>
    ),
  },
  walk: { title: 'Look it up', em: 'as you type', steps: STEPS },
  features: {
    layout: 'grid',
    title: 'Every answer',
    em: 'on one line',
    details: DETAILS,
    visuals: [
      <span key="a" className="font-mono text-2xl text-ink">
        4<span className="text-muted">29</span>
      </span>,
      <div key="b" className="flex flex-wrap gap-1.5 text-xs">
        {GROUPS.map(([name, color]) => (
          <span
            key={name}
            className="rounded-full border px-2 py-0.5"
            style={{ borderColor: color, color }}
          >
            {name}
          </span>
        ))}
      </div>,
      <span key="c" className="text-sm text-ink">
        {CODES.find((entry) => entry.code === 415)?.name}
      </span>,
      <span key="d" className="text-sm text-ink-soft">
        {CODES.find((entry) => entry.code === 504)?.hint}
      </span>,
    ],
  },
  uses: { layout: 'tilt', title: 'Status codes,', em: 'decoded' },
  facts: FACTS,
  backdrop: { kind: 'meteors', at: 'uses' },
}

export default function Story({ features, useCases }: StoryProps) {
  return <StoryLayout config={config} demo={<Demo />} features={features} useCases={useCases} />
}
