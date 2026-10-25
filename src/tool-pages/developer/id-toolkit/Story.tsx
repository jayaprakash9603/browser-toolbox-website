'use client'

import { StoryLayout, type StoryConfig, type StoryProps } from '@/components/tool/story'

import Demo from './Demo'
import { DETAILS, FACTS, NANO, STEPS, V4, V7, V7_TIME } from './script'

const config: StoryConfig = {
  problem: {
    variant: 'chars',
    text: 'You need one UUID for a test fixture. You open a website full of ads to get it.',
    accent: ['full of ads'],
    compare: 'split',
    beforeLabel: 'Hand-typed',
    afterLabel: 'Generated',
    before: (
      <div className="space-y-2 font-mono text-sm text-muted">
        <p>11111111-1111-1111-1111-111111111111</p>
        <p>12345678-abcd-…</p>
        <p className="text-rose">not-a-real-uuid</p>
      </div>
    ),
    after: (
      <div className="space-y-2 font-mono text-sm">
        <p className="text-ink">{V4}</p>
        <p className="text-ink">
          <span className="text-amber">{V7.slice(0, 13)}</span>
          {V7.slice(13)}
        </p>
        <p className="text-xs text-amber">v7 timestamp prefix → {V7_TIME} UTC</p>
        <p className="text-ink">{NANO}</p>
      </div>
    ),
  },
  walk: { title: 'Generate, batch,', em: 'validate', steps: STEPS },
  features: { layout: 'orbit', title: 'Every ID', em: 'you reach for', details: DETAILS },
  uses: { layout: 'fan', title: 'Seeds, fixtures', em: 'and keys', center: true },
  facts: FACTS,
  backdrop: { kind: 'rings', at: 'uses' },
}

export default function Story({ features, useCases }: StoryProps) {
  return <StoryLayout config={config} demo={<Demo />} features={features} useCases={useCases} />
}
