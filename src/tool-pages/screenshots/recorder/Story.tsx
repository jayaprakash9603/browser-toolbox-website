'use client'

import { PlayIcon } from 'lucide-react'

import { StoryLayout, type StoryConfig, type StoryProps } from '@/components/tool/story'

import Demo from './Demo'
import { DETAILS, duration, ELAPSED, FACTS, NAME, STEPS } from './script'

const config: StoryConfig = {
  problem: {
    variant: 'chars',
    text: 'Three paragraphs of repro steps, and the developer still asks you to show them.',
    accent: ['show them.'],
    compare: 'split',
    beforeLabel: 'Bug report in words',
    afterLabel: 'Bug report on video',
    before: (
      <ol className="max-w-xs list-decimal space-y-1.5 pl-5 text-left text-sm text-ink-soft">
        <li>Open Settings, then Notifications</li>
        <li>Turn on Email alerts</li>
        <li>See “Saved” appear</li>
        <li>Wait a few minutes</li>
        <li>No email arrives (sometimes?)</li>
      </ol>
    ),
    after: (
      <div className="w-72">
        <div className="relative flex aspect-video items-center justify-center rounded-xl bg-[linear-gradient(135deg,#e2e8f0,#94a3b8)]">
          <span className="flex size-12 items-center justify-center rounded-full bg-black/60">
            <PlayIcon className="size-5 fill-white text-white" />
          </span>
          <span className="absolute bottom-2 left-2 flex items-center gap-1.5 rounded-full bg-[#111]/90 px-2.5 py-1 text-xs font-semibold text-white">
            <span className="size-2 rounded-full bg-[#ef4444]" />
            {duration(ELAPSED)}
          </span>
        </div>
        <p className="mt-2 truncate text-left text-xs text-ink-soft">{NAME}</p>
      </div>
    ),
  },
  walk: { title: 'Show it,', em: 'don’t describe it', steps: STEPS },
  features: { layout: 'ticker', title: 'Recording without', em: 'the setup', details: DETAILS },
  uses: { layout: 'tilt', title: 'Thirty seconds beats', em: 'three paragraphs' },
  facts: FACTS,
  backdrop: { kind: 'shader-rings', at: 'problem' },
}

export default function Story({ features, useCases }: StoryProps) {
  return <StoryLayout config={config} demo={<Demo />} features={features} useCases={useCases} />
}
