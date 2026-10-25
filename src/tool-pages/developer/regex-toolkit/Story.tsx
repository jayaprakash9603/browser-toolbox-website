'use client'

import { StoryLayout, type StoryConfig, type StoryProps } from '@/components/tool/story'

import Demo from './Demo'
import { DETAILS, FACTS, MATCHES, PATTERN, SAMPLE, STEPS } from './script'

const text = SAMPLE.map((line) =>
  line
    .map((segment) =>
      typeof segment === 'string' ? segment : `${segment.user}@${segment.domain}.com`,
    )
    .join(''),
)

const config: StoryConfig = {
  problem: {
    variant: 'scramble',
    text: 'You wrote the regex, shipped it, and found out in production what it actually matched.',
    accent: ['what it actually matched.'],
    compare: 'stack',
    beforeLabel: 'Guessing',
    afterLabel: 'Seeing',
    before: (
      <div className="space-y-3 font-mono text-sm">
        <p className="text-violet">/{PATTERN}/g</p>
        {text.map((line) => (
          <p key={line} className="text-muted">
            {line}
          </p>
        ))}
      </div>
    ),
    after: (
      <div className="space-y-3 font-mono text-sm">
        <p className="text-violet">/{PATTERN}/g</p>
        {SAMPLE.map((line, row) => (
          <p key={row} className="text-ink-soft">
            {line.map((segment, index) =>
              typeof segment === 'string' ? (
                <span key={index}>{segment}</span>
              ) : (
                <span key={index} className="rounded bg-amber/25 text-ink">
                  <span className="text-[#c4b5fd]">{segment.user}</span>@
                  <span className="text-cyan">{segment.domain}</span>.com
                </span>
              ),
            )}
          </p>
        ))}
        <p className="text-xs text-amber">{MATCHES.length} matches</p>
      </div>
    ),
  },
  walk: { title: 'Draw it, test it,', em: 'trust it', steps: STEPS, flip: true },
  features: {
    layout: 'reel',
    title: 'A regex lab',
    em: 'beside the page',
    details: DETAILS,
    visuals: [
      <span key="a" className="rounded bg-amber/25 px-1.5 font-mono text-sm text-ink">
        ada@acme.com
      </span>,
      <span key="b" className="font-mono text-sm">
        <span className="rounded bg-[#a78bfa]/25 px-1">$1</span>{' '}
        <span className="rounded bg-cyan/20 px-1">$2</span>
      </span>,
      <span key="c" className="font-mono text-sm text-emerald">
        ada at acme
      </span>,
      <span key="d" className="font-mono text-xs text-muted">
        email · url · date · ipv4
      </span>,
      <span key="e" className="font-mono text-sm text-violet">
        /g /i /m /s
      </span>,
    ],
  },
  uses: { layout: 'timeline', title: 'From log dump', em: 'to clean data' },
  facts: FACTS,
  backdrop: { kind: 'meteors', at: 'features' },
}

export default function Story({ features, useCases }: StoryProps) {
  return <StoryLayout config={config} demo={<Demo />} features={features} useCases={useCases} />
}
