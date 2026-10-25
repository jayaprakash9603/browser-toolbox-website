'use client'

import { StoryLayout, type StoryConfig, type StoryProps } from '@/components/tool/story'
import { Qr } from '@/components/tool/stage/Qr'

import Demo from './Demo'
import { DETAILS, FACTS, PASSWORD, PAYLOAD, SSID, STEPS } from './script'

const config: StoryConfig = {
  problem: {
    variant: 'outline',
    text: 'Every guest asks for the Wi-Fi, then squints at a sticky note and types a seventeen-character password twice.',
    accent: ['sticky note'],
    compare: 'wipe',
    beforeLabel: 'Read it, type it',
    afterLabel: 'Point a camera',
    before: (
      <div className="-rotate-2 rounded-sm bg-[#fde68a] px-6 py-5 text-left font-mono text-[#3f2d1d] shadow-xl">
        <p className="text-xs uppercase tracking-[0.2em] opacity-70">Wi-Fi</p>
        <p className="mt-1 text-lg font-semibold">{SSID}</p>
        <p className="mt-1 text-xl font-bold">{PASSWORD}</p>
      </div>
    ),
    after: (
      <div className="rounded-xl bg-white p-3 shadow-xl">
        <Qr text={PAYLOAD} size={132} />
      </div>
    ),
  },
  walk: { title: 'Make it,', em: 'then read one back', steps: STEPS },
  features: { layout: 'stack', title: 'Codes that', em: 'look like yours', details: DETAILS },
  uses: { layout: 'tilt', title: 'Wherever people', em: 'point a camera' },
  facts: FACTS,
  backdrop: { kind: 'rings', at: 'problem' },
}

export default function Story({ features, useCases }: StoryProps) {
  return <StoryLayout config={config} demo={<Demo />} features={features} useCases={useCases} />
}
