'use client'

import { StoryLayout, type StoryConfig, type StoryProps } from '@/components/tool/story'

import Demo from './Demo'
import { BODY, BOLD_HOOK, DETAILS, FACTS, HOOK, MOBILE_CUTOFF, STEPS } from './script'

function Post({ hook }: { hook: string }) {
  const text = hook + BODY
  return (
    <div className="max-w-sm rounded-xl bg-white p-4 text-left text-sm leading-relaxed text-[#191919] shadow-lg">
      <div className="mb-2 flex items-center gap-2">
        <span className="size-8 rounded-full bg-[#0a66c2]/20" />
        <span className="text-xs font-semibold">Ada Park</span>
      </div>
      {text.slice(0, MOBILE_CUTOFF)}
      <span className="text-black/50">…see more</span>
    </div>
  )
}

const config: StoryConfig = {
  problem: {
    variant: 'chars',
    text: 'Most readers decide in the first two lines whether to tap “see more”.',
    accent: ['first two lines'],
    compare: 'wipe',
    beforeLabel: 'Plain hook',
    afterLabel: 'Bold hook, checked against the fold',
    before: <Post hook={HOOK} />,
    after: <Post hook={BOLD_HOOK} />,
  },
  walk: { title: 'Write above', em: 'the fold', steps: STEPS },
  features: { layout: 'grid', title: 'Small tools for', em: 'better posts', details: DETAILS },
  uses: { layout: 'marquee', title: 'Post with', em: 'intent' },
  facts: FACTS,
  backdrop: { kind: 'beams', at: 'uses' },
}

export default function Story({ features, useCases }: StoryProps) {
  return <StoryLayout config={config} demo={<Demo />} features={features} useCases={useCases} />
}
