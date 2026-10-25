'use client'

import { StoryLayout, type StoryConfig, type StoryProps } from '@/components/tool/story'

import Demo from './Demo'
import { DETAILS, FACTS, STEPS } from './script'

const MESSY = [
  '····Quarterly results···draft···¶',
  '¶',
  '¶',
  '→→Revenue grew··12% year on year.··¶',
  '¶',
  '··Costs····stayed flat.····¶',
]
const CLEAN = ['Quarterly results draft', 'Revenue grew 12% year on year.', 'Costs stayed flat.']

const config: StoryConfig = {
  problem: {
    variant: 'outline',
    text: 'The text looks fine until the import fails on a space you cannot see.',
    accent: ['a space you cannot see.'],
    compare: 'split',
    beforeLabel: 'Pasted from a PDF',
    afterLabel: 'Cleaned',
    before: (
      <div className="space-y-1 font-mono text-sm text-ink-soft">
        {MESSY.map((line, index) => (
          <p key={index} className="whitespace-pre">
            {line.split('').map((char, i) => (
              <span key={i} className={'·→¶'.includes(char) ? 'text-rose' : undefined}>
                {char}
              </span>
            ))}
          </p>
        ))}
      </div>
    ),
    after: (
      <div className="space-y-1 font-mono text-sm text-ink">
        {CLEAN.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
    ),
  },
  walk: { title: 'Three sweeps,', em: 'clean text', steps: STEPS },
  features: {
    layout: 'bento',
    title: 'Invisible problems,',
    em: 'visible fixes',
    details: DETAILS,
    visuals: [
      <span key="a" className="font-mono text-lg">
        <span className="text-rose">··</span>text<span className="text-rose">··</span> → text
      </span>,
      <span key="b" className="font-mono text-lg">
        a<span className="text-rose">···</span>b → a b
      </span>,
      <span key="c" className="font-mono text-lg text-rose">
        ¶ ¶ ¶
      </span>,
      <span key="d" className="font-mono text-lg">
        <span className="text-muted">CRLF</span> → <span className="text-[var(--accent)]">LF</span>
      </span>,
    ],
  },
  uses: { layout: 'marquee', title: 'Before it reaches', em: 'your data' },
  facts: FACTS,
  backdrop: { kind: 'dots', at: 'problem' },
  order: 'features-first',
}

export default function Story({ features, useCases }: StoryProps) {
  return <StoryLayout config={config} demo={<Demo />} features={features} useCases={useCases} />
}
