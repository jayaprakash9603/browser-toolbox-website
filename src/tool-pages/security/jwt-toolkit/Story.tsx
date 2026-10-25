'use client'

import { StoryLayout, type StoryConfig, type StoryProps } from '@/components/tool/story'

import Demo from './Demo'
import { DETAILS, FACTS, HEADER_JSON, PARTS, PAYLOAD_JSON, STEPS } from './script'

const config: StoryConfig = {
  problem: {
    variant: 'outline',
    text: 'Reading a token should not mean pasting a live credential into someone else’s website.',
    accent: ['someone else’s website.'],
    compare: 'stack',
    beforeLabel: 'What you copied',
    afterLabel: 'What it says',
    before: (
      <p className="break-all font-mono text-sm leading-relaxed">
        {PARTS.map((part, index) => (
          <span key={part.name} style={{ color: part.color }}>
            {index > 0 ? '.' : ''}
            {part.value}
          </span>
        ))}
      </p>
    ),
    after: (
      <div className="grid gap-4 font-mono text-sm sm:grid-cols-2">
        <pre className="text-[#fb7185]">{HEADER_JSON}</pre>
        <pre className="text-[#a78bfa]">{PAYLOAD_JSON}</pre>
      </div>
    ),
  },
  walk: { title: 'Three parts,', em: 'plainly read', steps: STEPS, flip: true },
  features: { layout: 'reel', title: 'Decode,', em: 'don’t trust blindly', details: DETAILS },
  uses: { layout: 'timeline', title: 'When auth', em: 'misbehaves' },
  facts: FACTS,
  backdrop: { kind: 'beams', at: 'uses' },
}

export default function Story({ features, useCases }: StoryProps) {
  return <StoryLayout config={config} demo={<Demo />} features={features} useCases={useCases} />
}
