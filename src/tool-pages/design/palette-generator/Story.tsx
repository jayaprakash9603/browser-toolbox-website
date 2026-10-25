'use client'

import { StoryLayout, type StoryConfig, type StoryProps } from '@/components/tool/story'

import Demo from './Demo'
import {
  BASE,
  CONTRAST,
  DETAILS,
  EXPORT,
  FACTS,
  REGENERATED,
  ROLE_LABELS,
  SCALE,
  STEPS,
  textOn,
} from './script'

function Palette() {
  return (
    <div className="w-[min(100%,420px)] space-y-2">
      <div className="flex h-24 overflow-hidden rounded-xl">
        {REGENERATED.map((hex, index) => (
          <span
            key={hex + index}
            className="flex flex-1 flex-col justify-end p-2 text-[10px]"
            style={{ backgroundColor: hex, color: textOn(hex) }}
          >
            <span className="opacity-70">{ROLE_LABELS[index]}</span>
            <span className="font-mono">{hex.toUpperCase()}</span>
          </span>
        ))}
      </div>
      <div className="flex h-6 gap-0.5">
        {SCALE.map((entry) => (
          <span
            key={entry.step}
            className="flex-1 rounded-sm"
            style={{ backgroundColor: entry.hex }}
          />
        ))}
      </div>
      <p className="font-mono text-[11px] text-muted">
        {EXPORT[1].trim()} · {CONTRAST.passing}/{CONTRAST.total} pairs pass AA
      </p>
    </div>
  )
}

const config: StoryConfig = {
  problem: {
    variant: 'blur',
    text: 'You have one brand colour and a whole interface to paint. Picking the rest by eye is how themes end up muddy.',
    accent: ['muddy.'],
    compare: 'stack',
    beforeLabel: 'One colour',
    afterLabel: 'A checked palette',
    before: <span className="block h-24 w-24 rounded-2xl" style={{ backgroundColor: BASE }} />,
    after: <Palette />,
  },
  walk: { title: 'From one colour', em: 'to a theme', steps: STEPS },
  features: { layout: 'bento', title: 'Harmony,', em: 'then proof', details: DETAILS },
  uses: { layout: 'marquee', title: 'Palettes', em: 'on tap' },
  facts: FACTS,
  backdrop: { kind: 'rings', at: 'uses' },
}

export default function Story({ features, useCases }: StoryProps) {
  return <StoryLayout config={config} demo={<Demo />} features={features} useCases={useCases} />
}
