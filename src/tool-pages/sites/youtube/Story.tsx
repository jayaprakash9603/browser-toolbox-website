'use client'

import { StoryLayout, type StoryConfig, type StoryProps } from '@/components/tool/story'

import Demo from './Demo'
import { DETAILS, FACTS, RELATED, STEPS } from './script'

function Player({ wide }: { wide?: boolean }) {
  return (
    <div className={wide ? 'w-full' : 'min-w-0 flex-1'}>
      <div className="flex aspect-video items-center justify-center rounded-xl bg-[linear-gradient(135deg,#334155,#0f172a)] text-sm font-semibold text-white/80">
        Building a desk lamp
      </div>
      <span className="mt-2 block h-1 rounded-full bg-white/20">
        <span className="block h-full w-1/3 rounded-full bg-[#22d3ee]" />
      </span>
    </div>
  )
}

const config: StoryConfig = {
  problem: {
    variant: 'scrub',
    text: 'You opened YouTube for one tutorial. Shorts, recommendations and autoplay had other plans.',
    accent: ['had other plans.'],
    compare: 'split',
    beforeLabel: 'Default watch page',
    afterLabel: 'Focus mode',
    before: (
      <div className="flex gap-3">
        <Player />
        <div className="w-24 space-y-2">
          {RELATED.map((video) => (
            <span
              key={video.title}
              className="block aspect-video rounded-md"
              style={{ background: `linear-gradient(135deg, ${video.from}, ${video.to})` }}
            />
          ))}
        </div>
      </div>
    ),
    after: <Player wide />,
  },
  walk: { title: 'Your YouTube,', em: 'your rules', steps: STEPS },
  features: { layout: 'reel', title: 'Ninety-two', em: 'small fixes', details: DETAILS },
  uses: { layout: 'fan', title: 'Watch what', em: 'you came for' },
  facts: FACTS,
  backdrop: { kind: 'grid', at: 'features' },
}

export default function Story({ features, useCases }: StoryProps) {
  return <StoryLayout config={config} demo={<Demo />} features={features} useCases={useCases} />
}
