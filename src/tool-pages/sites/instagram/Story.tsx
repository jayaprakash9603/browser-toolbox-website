'use client'

import { DownloadIcon, PictureInPicture2Icon } from 'lucide-react'

import { StoryLayout, type StoryConfig, type StoryProps } from '@/components/tool/story'

import Demo from './Demo'
import { DETAILS, FACTS, SEEK, SPEED, STEPS, time } from './script'

function Reel({ tools }: { tools?: boolean }) {
  return (
    <div className="relative aspect-[4/5] w-56 overflow-hidden rounded-2xl bg-[linear-gradient(160deg,#f472b6,#7c3aed_55%,#1e1b4b)]">
      <span className="absolute inset-0 flex items-center justify-center text-sm font-semibold text-white/85">
        Fall collection
      </span>
      {tools && (
        <>
          <span className="absolute right-3 top-3 flex items-center gap-1.5 text-[11px] text-white">
            <span className="rounded-full bg-black/60 px-2 py-0.5">{SPEED}×</span>
            <span className="flex size-7 items-center justify-center rounded-full bg-black/60">
              <DownloadIcon className="size-3.5" />
            </span>
            <span className="flex size-7 items-center justify-center rounded-full bg-black/60">
              <PictureInPicture2Icon className="size-3.5" />
            </span>
          </span>
          <span className="absolute inset-x-3 bottom-3">
            <span className="mb-1.5 inline-block rounded-full bg-black/60 px-2 py-0.5 text-[11px] tabular-nums text-white">
              {time(SEEK.to)} / {time(1)}
            </span>
            <span className="block h-1 overflow-hidden rounded-full bg-white/35">
              <span
                className="block h-full rounded-full bg-white"
                style={{ width: `${SEEK.to * 100}%` }}
              />
            </span>
          </span>
        </>
      )}
    </div>
  )
}

const config: StoryConfig = {
  problem: {
    variant: 'blur',
    text: 'A reel with no seek bar, no speed control and no way to save the clip you made.',
    accent: ['no way to save'],
    compare: 'wipe',
    beforeLabel: 'Instagram reel',
    afterLabel: 'With One Panel',
    before: <Reel />,
    after: <Reel tools />,
  },
  walk: { title: 'Reels you can', em: 'actually control', steps: STEPS },
  features: { layout: 'orbit', title: 'Four tools,', em: 'one feed', details: DETAILS },
  uses: { layout: 'quotes', title: 'Made for people who', em: 'post' },
  facts: FACTS,
  backdrop: { kind: 'shader-waves', at: 'uses' },
  order: 'features-first',
}

export default function Story({ features, useCases }: StoryProps) {
  return <StoryLayout config={config} demo={<Demo />} features={features} useCases={useCases} />
}
