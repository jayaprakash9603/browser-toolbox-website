'use client'

import { StoryLayout, type StoryConfig, type StoryProps } from '@/components/tool/story'

import Demo from './Demo'
import { DETAILS, FACTS, FILE, STEPS, TARGET } from './script'

function Frame({ width, height, scale }: { width: number; height: number; scale: number }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className="rounded-lg border border-line-strong bg-[linear-gradient(135deg,#38bdf8,#a78bfa)] shadow-lg"
        style={{ width: 240 * scale, aspectRatio: '16 / 10' }}
      />
      <span className="font-mono text-xs text-ink-soft">
        {width} × {height}
      </span>
    </div>
  )
}

const config: StoryConfig = {
  problem: {
    variant: 'scrub',
    text: 'A Retina screenshot is twice as wide as the ticket it is going into.',
    accent: ['twice as wide'],
    compare: 'split',
    beforeLabel: 'Straight from the screen',
    afterLabel: 'Resized for the ticket',
    before: <Frame width={FILE.width} height={FILE.height} scale={1} />,
    after: <Frame width={TARGET.width} height={TARGET.height} scale={0.5} />,
  },
  walk: { title: 'Five image jobs,', em: 'no editor', steps: STEPS, flip: true },
  features: { layout: 'orbit', title: 'Quick fixes for', em: 'any image', details: DETAILS },
  uses: { layout: 'marquee', title: 'Small images,', em: 'fast' },
  facts: FACTS,
  backdrop: { kind: 'shader-grid', at: 'features' },
  order: 'features-first',
}

export default function Story({ features, useCases }: StoryProps) {
  return <StoryLayout config={config} demo={<Demo />} features={features} useCases={useCases} />
}
