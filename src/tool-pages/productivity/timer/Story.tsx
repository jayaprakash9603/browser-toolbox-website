'use client'

import { StoryLayout, type StoryConfig, type StoryProps } from '@/components/tool/story'

import Demo from './Demo'
import { COUNTDOWN_NOTICE, DETAILS, FACTS, STEPS } from './script'

const config: StoryConfig = {
  problem: {
    variant: 'chars',
    text: 'A timer in a tab dies with the tab. Close it by accident and the twenty-five minutes you were counting are gone.',
    accent: ['dies with the tab'],
    compare: 'wipe',
    beforeLabel: 'Timer in a tab',
    afterLabel: 'Timer in the background',
    before: (
      <div className="w-72 rounded-xl border border-line-strong bg-surface p-4 text-left">
        <p className="text-xs text-muted">online-timer · tab closed</p>
        <p className="mt-2 font-mono text-4xl font-semibold text-muted line-through">00:17:42</p>
      </div>
    ),
    after: (
      <div className="relative w-72 overflow-hidden rounded-xl border border-[#2a3133] bg-[#1c2022] p-4 pl-5 text-left text-[#f8fafc]">
        <span className="absolute inset-y-0 left-0 w-1 bg-[var(--accent)]" />
        <p className="text-xs text-[#a1a1aa]">One Panel · Timer · {COUNTDOWN_NOTICE.time}</p>
        <p className="mt-1 text-lg font-semibold">{COUNTDOWN_NOTICE.title}</p>
        <p className="text-sm text-[#a1a1aa]">{COUNTDOWN_NOTICE.message}</p>
      </div>
    ),
  },
  walk: { title: 'Set it,', em: 'then forget the panel', steps: STEPS },
  features: { layout: 'orbit', title: 'Three clocks,', em: 'one background', details: DETAILS },
  uses: { layout: 'marquee', title: 'Time you', em: 'can walk away from' },
  facts: FACTS,
  backdrop: { kind: 'shader-rings', at: 'problem' },
}

export default function Story({ features, useCases }: StoryProps) {
  return <StoryLayout config={config} demo={<Demo />} features={features} useCases={useCases} />
}
