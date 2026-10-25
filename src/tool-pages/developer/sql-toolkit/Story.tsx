'use client'

import { Code } from '@/components/tool/stage'
import { StoryLayout, type StoryConfig, type StoryProps } from '@/components/tool/story'

import Demo from './Demo'
import { DETAILS, FACTS, FORMATTED, QUERY, STEPS } from './script'

const config: StoryConfig = {
  problem: {
    variant: 'blur',
    text: 'The ORM logged the query. All of it. On one line, in lower case, at two in the morning.',
    accent: ['On one line,'],
    compare: 'split',
    beforeLabel: 'From the log',
    afterLabel: 'Formatted',
    before: <p className="font-mono text-sm leading-relaxed text-muted">{QUERY}</p>,
    after: (
      <Code code={FORMATTED} numbers={false} className="border-0 bg-transparent p-0 text-sm" />
    ),
  },
  walk: { title: 'From log line', em: 'to review-ready', steps: STEPS },
  features: {
    layout: 'bento',
    title: 'SQL you can',
    em: 'actually review',
    details: DETAILS,
    visuals: [
      <pre key="a" className="font-mono text-xs leading-relaxed text-ink-soft">
        {'SELECT …\nFROM users u\nLEFT JOIN orders o'}
      </pre>,
      <span key="b" className="font-mono text-xs text-emerald">
        SELECT u.id FROM users u LIMIT 10
      </span>,
      <div key="c" className="flex flex-wrap gap-1.5 text-xs">
        {['PostgreSQL', 'MySQL', 'SQLite', 'MariaDB'].map((dialect) => (
          <span
            key={dialect}
            className="rounded-full border border-line-strong px-2.5 py-1 text-ink-soft"
          >
            {dialect}
          </span>
        ))}
      </div>,
      <span key="d" className="font-mono text-lg">
        select → <span className="text-violet">SELECT</span>
      </span>,
    ],
  },
  uses: { layout: 'tilt', title: 'Queries people', em: 'can read' },
  facts: FACTS,
  backdrop: { kind: 'shader-flow', at: 'problem' },
}

export default function Story({ features, useCases }: StoryProps) {
  return <StoryLayout config={config} demo={<Demo />} features={features} useCases={useCases} />
}
