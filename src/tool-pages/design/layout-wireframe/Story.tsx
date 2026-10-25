'use client'

import { StoryLayout, type StoryConfig, type StoryProps } from '@/components/tool/story'

import Demo from './Demo'
import { CSS, DETAILS, FACTS, OUTLINE, STEPS } from './script'

function Sketch({ outlined }: { outlined: boolean }) {
  const line = outlined ? `1px solid ${OUTLINE.replace('0.25', '0.7')}` : 'none'
  return (
    <div
      className="space-y-2 overflow-hidden rounded-xl bg-[#fafafa] p-4"
      style={{ outline: line }}
    >
      <div className="h-4 w-1/2 rounded bg-black/20" style={{ outline: line }} />
      <div className="grid grid-cols-3 gap-2" style={{ outline: line }}>
        {[0, 1, 2].map((index) => (
          <div key={index} className="h-12 rounded-md bg-black/10" style={{ outline: line }} />
        ))}
      </div>
      <div className="flex w-[125%] gap-2" style={{ outline: line }}>
        {[0, 1, 2, 3].map((index) => (
          <div
            key={index}
            className="h-5 flex-1 rounded bg-black/[0.06]"
            style={{ outline: line }}
          />
        ))}
      </div>
    </div>
  )
}

const config: StoryConfig = {
  problem: {
    variant: 'blur',
    text: 'Something is pushing the page sideways. The culprit is invisible until every box on the page has an edge.',
    accent: ['invisible'],
    compare: 'wipe',
    beforeLabel: 'As rendered',
    afterLabel: 'Wireframed',
    before: <Sketch outlined={false} />,
    after: (
      <div className="space-y-3">
        <Sketch outlined />
        <pre className="whitespace-pre-wrap font-mono text-xs text-muted">{CSS}</pre>
      </div>
    ),
  },
  walk: { title: 'See the boxes,', em: 'find the bug', steps: STEPS, flip: true },
  features: { layout: 'grid', title: 'Layout,', em: 'laid bare', details: DETAILS },
  uses: { layout: 'marquee', title: 'When CSS', em: 'misbehaves' },
  facts: FACTS,
  backdrop: { kind: 'grid', at: 'features' },
}

export default function Story({ features, useCases }: StoryProps) {
  return <StoryLayout config={config} demo={<Demo />} features={features} useCases={useCases} />
}
