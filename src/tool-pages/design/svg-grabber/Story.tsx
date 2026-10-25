'use client'

import { StoryLayout, type StoryConfig, type StoryProps } from '@/components/tool/story'

import Demo from './Demo'
import { DETAILS, FACTS, ICONS, JSX_PEEK, STEPS } from './script'

const config: StoryConfig = {
  problem: {
    variant: 'chars',
    text: 'The icon you want is right there on the page. Getting it out means digging through DevTools and fixing every attribute by hand for React.',
    accent: ['fixing every attribute by hand'],
    compare: 'split',
    beforeLabel: 'Right-click',
    afterLabel: 'Grabbed',
    before: (
      <p className="text-sm text-muted">
        Save image as… is greyed out. Inspect, find the &lt;svg&gt;, Copy element, then rename
        class, stroke-width…
      </p>
    ),
    after: (
      <div className="space-y-3">
        <div className="flex gap-3 text-[#f472b6]">
          {ICONS.map((icon) => (
            <svg
              key={icon.name}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-8"
              aria-hidden
            >
              {icon.paths.map((path) => (
                <path key={path} d={path} />
              ))}
            </svg>
          ))}
        </div>
        <code className="block break-all font-mono text-xs text-ink-soft">{JSX_PEEK}</code>
      </div>
    ),
  },
  walk: { title: 'Every icon,', em: 'ready to paste', steps: STEPS },
  features: { layout: 'orbit', title: 'Vector graphics,', em: 'set free', details: DETAILS },
  uses: { layout: 'quotes', title: 'Icons you', em: 'already own' },
  facts: FACTS,
  backdrop: { kind: 'meteors', at: 'problem' },
}

export default function Story({ features, useCases }: StoryProps) {
  return <StoryLayout config={config} demo={<Demo />} features={features} useCases={useCases} />
}
