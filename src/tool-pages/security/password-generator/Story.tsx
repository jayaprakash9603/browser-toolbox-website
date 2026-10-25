'use client'

import { StoryLayout, type StoryConfig, type StoryProps } from '@/components/tool/story'

import Demo from './Demo'
import { DETAILS, FACTS, FIRST, STEPS } from './script'

const config: StoryConfig = {
  problem: {
    variant: 'blur',
    text: 'Passwords people make up follow patterns, and patterns are exactly what cracking tools try first.',
    accent: ['try first.'],
    compare: 'split',
    beforeLabel: 'Made up',
    afterLabel: 'Generated',
    before: <p className="font-mono text-3xl text-ink">Summer2026!</p>,
    after: <p className="break-all font-mono text-3xl text-ink">{FIRST}</p>,
  },
  walk: { title: 'Random,', em: 'on your terms', steps: STEPS },
  features: { layout: 'orbit', title: 'Strong by default,', em: 'tunable', details: DETAILS },
  uses: { layout: 'fan', title: 'Whenever a field', em: 'says “password”' },
  facts: FACTS,
  backdrop: { kind: 'aurora', at: 'features' },
  order: 'features-first',
}

export default function Story({ features, useCases }: StoryProps) {
  return <StoryLayout config={config} demo={<Demo />} features={features} useCases={useCases} />
}
