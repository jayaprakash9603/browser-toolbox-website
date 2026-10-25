'use client'

import { StoryLayout, type StoryConfig, type StoryProps } from '@/components/tool/story'

import Demo from './Demo'
import { DETAILS, FACTS, LINKS, STEPS, isOk } from './script'

const SAMPLE = LINKS.slice(3, 10)

const config: StoryConfig = {
  problem: {
    variant: 'chars',
    text: 'After the migration, every link looks fine. You only learn which ones are dead when a reader clicks them.',
    accent: ['when a reader clicks them.'],
    compare: 'split',
    beforeLabel: 'Looks fine',
    afterLabel: 'Checked',
    before: (
      <div className="flex flex-wrap gap-2 text-sm text-ink-soft">
        {SAMPLE.map((link) => (
          <span key={link.href} className="underline decoration-line-strong">
            {link.text}
          </span>
        ))}
      </div>
    ),
    after: (
      <div className="space-y-1.5 text-sm">
        {SAMPLE.map((link) => (
          <p key={link.href} className="flex items-center gap-3">
            <span className={isOk(link) ? 'w-10 font-mono text-muted' : 'w-10 font-mono text-rose'}>
              {link.status ?? 'ERR'}
            </span>
            <span className={isOk(link) ? 'text-ink-soft' : 'text-ink'}>{link.text}</span>
          </p>
        ))}
        <p className="pt-1 text-xs text-muted">
          {SAMPLE.filter((link) => !isOk(link)).length} broken of {SAMPLE.length} checked
        </p>
      </div>
    ),
  },
  walk: { title: 'Dead links,', em: 'found first', steps: STEPS },
  features: { layout: 'grid', title: 'A broken-link sweep', em: 'in one click', details: DETAILS },
  uses: { layout: 'tilt', title: 'Before anyone', em: 'clicks' },
  facts: FACTS,
  backdrop: { kind: 'meteors', at: 'problem' },
  order: 'features-first',
}

export default function Story({ features, useCases }: StoryProps) {
  return <StoryLayout config={config} demo={<Demo />} features={features} useCases={useCases} />
}
