'use client'

import { StoryLayout, type StoryConfig, type StoryProps } from '@/components/tool/story'

import Demo from './Demo'
import { DETAILS, FACTS, GROUPS, LINKS, STEPS } from './script'

const config: StoryConfig = {
  problem: {
    variant: 'chars',
    text: 'A docs page hides dozens of links in its prose. Finding the one that 404s means hovering every single one.',
    accent: ['hovering every single one.'],
    compare: 'wipe',
    beforeLabel: 'Buried in prose',
    afterLabel: 'Grouped',
    before: (
      <p className="text-sm leading-relaxed text-muted">
        Start with the <u>Install</u> steps, then read the <u>API reference</u>. The source lives on{' '}
        <u>GitHub</u> and ships as an <u>npm package</u>. Upgrading? The <u>Old setup guide</u>{' '}
        still covers it.
      </p>
    ),
    after: (
      <div className="space-y-2 text-sm">
        {GROUPS.slice(0, 3).map((group) => (
          <p key={group.key} className="flex justify-between gap-4">
            <span className="text-ink">{group.label}</span>
            <span className="font-mono text-ink-soft">
              {LINKS.filter((link) => link.group === group.key).length}
            </span>
          </p>
        ))}
        <p className="flex justify-between gap-4 text-rose">
          <span>Broken</span>
          <span className="font-mono">{LINKS.filter((link) => link.status >= 400).length}</span>
        </p>
      </div>
    ),
  },
  walk: { title: 'Every link,', em: 'accounted for', steps: STEPS },
  features: { layout: 'bento', title: 'A link audit', em: 'in one panel', details: DETAILS },
  uses: { layout: 'timeline', title: 'When links', em: 'matter' },
  facts: FACTS,
  backdrop: { kind: 'dots', at: 'features' },
}

export default function Story({ features, useCases }: StoryProps) {
  return <StoryLayout config={config} demo={<Demo />} features={features} useCases={useCases} />
}
