'use client'

import { PictureInPicture2Icon } from 'lucide-react'

import { StoryLayout, type StoryConfig, type StoryProps } from '@/components/tool/story'

import Demo from './Demo'
import { DETAILS, FACTS, OTHER_TAB, SHORTCUT, STEPS, VIDEO } from './script'

function Screen({ floating }: { floating: boolean }) {
  return (
    <div className="relative aspect-[16/10] w-[min(100%,360px)] overflow-hidden rounded-xl border border-line bg-[#1e1e1e] p-4 font-mono text-[11px] leading-5 text-[#d4d4d4]">
      <p className="text-[10px] text-muted">{OTHER_TAB.title}</p>
      {[70, 52, 0, 84, 60, 66, 20].map((width, index) => (
        <span
          key={index}
          className="mt-2 block h-2 rounded-full bg-white/10"
          style={{ width: `${width}%` }}
        />
      ))}
      {floating ? (
        <div className="absolute bottom-3 right-3 aspect-video w-[44%] overflow-hidden rounded-lg border border-white/15 bg-[radial-gradient(circle_at_70%_40%,#3b2a78,#120f24_70%)] p-2 shadow-2xl">
          <p className="font-sans text-[9px] font-bold leading-tight text-white">{VIDEO.title}</p>
          <span className="absolute inset-x-2 bottom-2 block h-[2px] rounded-full bg-white/25">
            <span className="block h-full w-1/5 rounded-full bg-[#ef4444]" />
          </span>
        </div>
      ) : (
        <div className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-md bg-black/50 px-2 py-1 font-sans text-[10px] text-white/60">
          <PictureInPicture2Icon className="size-3" /> The talk is in another tab
        </div>
      )}
    </div>
  )
}

const config: StoryConfig = {
  problem: {
    variant: 'blur',
    text: 'The talk is in one tab, the code is in another, and every switch means losing your place in one of them.',
    accent: ['losing your place'],
    compare: 'split',
    beforeLabel: 'Switching tabs to watch',
    afterLabel: `After ${SHORTCUT.join(' + ')}`,
    before: <Screen floating={false} />,
    after: <Screen floating />,
  },
  walk: { title: 'One key,', em: 'and the video floats', steps: STEPS },
  features: { layout: 'stack', title: 'Three ways', em: 'to keep it in view', details: DETAILS },
  uses: { layout: 'tilt', title: 'Watch while you', em: 'keep working' },
  facts: FACTS,
  backdrop: { kind: 'meteors', at: 'features' },
}

export default function Story({ features, useCases }: StoryProps) {
  return <StoryLayout config={config} demo={<Demo />} features={features} useCases={useCases} />
}
