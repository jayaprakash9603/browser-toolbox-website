'use client'

import { StoryLayout, type StoryConfig, type StoryProps } from '@/components/tool/story'

import Demo from './Demo'
import { CHANGED, DETAILS, EDITED, FACTS, INPUT, SHA256, STEPS } from './script'

function Digest({ value, marked }: { value: string; marked?: boolean }) {
  return (
    <p className="break-all font-mono text-xl leading-relaxed text-ink">
      {[...value].map((char, index) => (
        <span
          key={index}
          className={marked && CHANGED.includes(index) ? 'text-[var(--accent)]' : undefined}
        >
          {char}
        </span>
      ))}
    </p>
  )
}

const config: StoryConfig = {
  problem: {
    variant: 'chars',
    text: 'Checking a digest usually means looking up a terminal command, and then a different one again for HMAC.',
    accent: ['a different one again'],
    compare: 'wipe',
    beforeLabel: `SHA-256 of “${INPUT}”`,
    afterLabel: `SHA-256 of “${EDITED}”`,
    before: <Digest value={SHA256.before} />,
    after: <Digest value={SHA256.after} marked />,
  },
  walk: { title: 'Five digests,', em: 'one keystroke', steps: STEPS },
  features: { layout: 'bento', title: 'Hashing', em: 'without a terminal', details: DETAILS },
  uses: { layout: 'tilt', title: 'Check it,', em: 'sign it' },
  facts: FACTS,
  backdrop: { kind: 'dots', at: 'problem' },
}

export default function Story({ features, useCases }: StoryProps) {
  return <StoryLayout config={config} demo={<Demo />} features={features} useCases={useCases} />
}
