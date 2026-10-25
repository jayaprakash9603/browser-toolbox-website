'use client'

import { StoryLayout, type StoryConfig, type StoryProps } from '@/components/tool/story'

import Demo from './Demo'
import { ALL, DETAILS, FACTS, REMOTE, REMOTE_MATCHES, ROLES, STEPS } from './script'

const config: StoryConfig = {
  problem: {
    variant: 'blur',
    text: 'The locator works on your machine. In CI it matches nothing, and the only way to find out is another full CI run.',
    accent: ['another full CI run.'],
    compare: 'wipe',
    beforeLabel: 'Guess and rerun',
    afterLabel: 'Test it live',
    before: (
      <div className="space-y-2 font-mono text-sm text-muted">
        <p>$ npm run e2e</p>
        <p className="text-rose">TimeoutError: locator {REMOTE} not found</p>
        <p>✕ 1 failed · retry?</p>
      </div>
    ),
    after: (
      <div className="space-y-2 font-mono text-sm">
        <p className="text-ink-soft">{ALL}</p>
        <p className="text-emerald">{ROLES.length} matches</p>
        <p className="text-ink-soft">{REMOTE}</p>
        <p className="text-emerald">
          {REMOTE_MATCHES.length} matches ·{' '}
          {REMOTE_MATCHES.map((role) => `li#${role.id}`).join(', ')}
        </p>
      </div>
    ),
  },
  walk: { title: 'Ask the page', em: 'directly', steps: STEPS },
  features: {
    layout: 'orbit',
    title: 'XPath with',
    em: 'instant answers',
    details: DETAILS,
  },
  uses: { layout: 'fan', title: 'Locators you', em: 'can trust' },
  facts: FACTS,
  backdrop: { kind: 'dots', at: 'features' },
}

export default function Story({ features, useCases }: StoryProps) {
  return <StoryLayout config={config} demo={<Demo />} features={features} useCases={useCases} />
}
