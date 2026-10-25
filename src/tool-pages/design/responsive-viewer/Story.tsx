'use client'

import { StoryLayout, type StoryConfig, type StoryProps } from '@/components/tool/story'

import Demo from './Demo'
import { DETAILS, DEVICES, FACTS, STEPS } from './script'

const config: StoryConfig = {
  problem: {
    variant: 'scrub',
    text: 'Checking a page on more than one screen means resizing the window, again and again, until you forget what the last size looked like.',
    accent: ['again and again,'],
    compare: 'stack',
    beforeLabel: 'One window',
    afterLabel: 'Side by side',
    before: (
      <div className="mx-auto h-28 w-44 rounded-lg border border-line-strong bg-white/[0.04]" />
    ),
    after: (
      <div className="flex items-end gap-3">
        {DEVICES.map((device) => (
          <div key={device.id} className="text-center">
            <div
              className="w-16 rounded-md border border-line-strong bg-white/[0.04]"
              style={{ height: Math.round(device.frame / 4) }}
            />
            <p className="mt-1.5 text-xs text-muted">{device.label}</p>
          </div>
        ))}
      </div>
    ),
  },
  walk: { title: 'Several frames,', em: 'one glance', steps: STEPS },
  features: { layout: 'reel', title: 'Pick your', em: 'screens', details: DETAILS },
  uses: { layout: 'tilt', title: 'A quick look,', em: 'framed' },
  facts: FACTS,
  backdrop: { kind: 'shader-grid', at: 'uses' },
  order: 'features-first',
}

export default function Story({ features, useCases }: StoryProps) {
  return <StoryLayout config={config} demo={<Demo />} features={features} useCases={useCases} />
}
