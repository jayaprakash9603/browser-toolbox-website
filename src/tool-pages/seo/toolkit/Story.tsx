'use client'

import { StoryLayout, type StoryConfig, type StoryProps } from '@/components/tool/story'

import Demo from './Demo'
import { AFTER, BEFORE, DETAILS, FACTS, STEPS } from './script'

function Score({ score, note, tone }: { score: number; note: string; tone: string }) {
  return (
    <div className="text-center">
      <p className={`font-mono text-5xl font-semibold tabular-nums ${tone}`}>
        {score}
        <span className="text-xl text-muted">/100</span>
      </p>
      <p className="mt-2 text-sm text-ink-soft">{note}</p>
    </div>
  )
}

const config: StoryConfig = {
  problem: {
    variant: 'scrub',
    text: 'A page can look finished and still ship with no meta description, an image with no alt text and a title search results cut short.',
    accent: ['cut short'],
    compare: 'split',
    beforeLabel: 'As shipped',
    afterLabel: `After ${BEFORE.issues.length} fixes`,
    before: (
      <Score
        score={BEFORE.score}
        note={`${BEFORE.issues.length} issues · ${BEFORE.passed} of ${BEFORE.total} checks pass`}
        tone="text-amber-300"
      />
    ),
    after: (
      <Score
        score={AFTER.score}
        note={`${AFTER.passed} of ${AFTER.total} checks pass`}
        tone="text-emerald-300"
      />
    ),
  },
  walk: { title: 'From score', em: 'to the exact fix', steps: STEPS },
  features: { layout: 'bento', title: 'Ten tabs,', em: 'one page at a time', details: DETAILS },
  uses: { layout: 'quotes', title: 'Before it', em: 'goes live' },
  facts: FACTS,
  backdrop: { kind: 'shader-grid', at: 'features' },
}

export default function Story({ features, useCases }: StoryProps) {
  return <StoryLayout config={config} demo={<Demo />} features={features} useCases={useCases} />
}
