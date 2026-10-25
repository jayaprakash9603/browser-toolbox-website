'use client'

import { StoryLayout, type StoryConfig, type StoryProps } from '@/components/tool/story'

import Demo from './Demo'
import { DETAILS, FACTS, FIND, REPLACE, ROWS, STEPS } from './script'

function Lines({ after }: { after: boolean }) {
  return (
    <div className="space-y-2 font-mono text-sm">
      {ROWS.map((row) => (
        <p key={row.label} className="text-ink-soft">
          <span className="text-muted">{row.label}: </span>
          <span
            className={
              row.upper
                ? 'text-ink-soft'
                : after
                  ? 'rounded bg-emerald/20 text-emerald'
                  : 'rounded bg-amber/20 text-amber'
            }
          >
            {row.upper ? FIND.toUpperCase() : after ? REPLACE : FIND}
          </span>
          {row.rest}
        </p>
      ))}
    </div>
  )
}

const config: StoryConfig = {
  problem: {
    variant: 'blur',
    text: 'Forty links to update, one at a time, hoping you did not miss the one in the footer.',
    accent: ['one at a time,'],
    compare: 'stack',
    beforeLabel: 'Matches found',
    afterLabel: 'Replaced',
    before: <Lines after={false} />,
    after: <Lines after />,
  },
  walk: { title: 'Find it, preview it,', em: 'replace it', steps: STEPS, flip: true },
  features: {
    layout: 'grid',
    title: 'Precise when',
    em: 'it has to be',
    details: DETAILS,
    visuals: [
      <code key="a" className="font-mono text-sm text-violet">
        {'/v(\\d+)/g → v$1.0'}
      </code>,
      <span key="b" className="font-mono text-sm">
        <span className="text-amber">http</span> · <span className="text-muted">HTTP</span>
      </span>,
      <span key="c" className="font-mono text-sm">
        <span className="text-amber">cat</span> · <span className="text-muted">category</span>
      </span>,
      <span key="d" className="font-mono text-2xl text-amber">
        4
      </span>,
    ],
  },
  uses: { layout: 'quotes', title: 'Batch edits,', em: 'no script needed' },
  facts: FACTS,
  backdrop: { kind: 'shader-plasma', at: 'features' },
}

export default function Story({ features, useCases }: StoryProps) {
  return <StoryLayout config={config} demo={<Demo />} features={features} useCases={useCases} />
}
