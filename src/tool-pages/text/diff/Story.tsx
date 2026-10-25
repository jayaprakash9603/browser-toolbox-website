'use client'

import { StoryLayout, type StoryConfig, type StoryProps } from '@/components/tool/story'

import Demo from './Demo'
import { ADDED, CHANGED, DETAILS, FACTS, ORIGINAL, REMOVED, STEPS } from './script'

const config: StoryConfig = {
  problem: {
    variant: 'outline',
    text: 'Two files, almost identical. Somewhere in there is the line that broke production.',
    accent: ['the line that broke production.'],
    compare: 'wipe',
    bleed: true,
    beforeLabel: 'Squinting',
    afterLabel: 'Diffed',
    before: (
      <div className="grid h-full grid-cols-2 gap-6 p-10 pt-16 font-mono text-base text-ink-soft">
        <div className="space-y-2">
          {ORIGINAL.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
        <div className="space-y-2">
          {CHANGED.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      </div>
    ),
    after: (
      <div className="grid h-full grid-cols-2 gap-6 bg-elevated p-10 pt-16 font-mono text-base">
        <div className="space-y-2">
          {ORIGINAL.map((line) => (
            <p
              key={line}
              className={
                REMOVED.includes(line) ? 'rounded bg-rose/15 px-2 text-rose' : 'px-2 text-muted'
              }
            >
              {line}
            </p>
          ))}
        </div>
        <div className="space-y-2">
          {CHANGED.map((line) => (
            <p
              key={line}
              className={
                ADDED.includes(line) ? 'rounded bg-emerald/15 px-2 text-emerald' : 'px-2 text-muted'
              }
            >
              {line}
            </p>
          ))}
        </div>
      </div>
    ),
  },
  walk: { title: 'Two versions,', em: 'every change', steps: STEPS },
  features: {
    layout: 'bento',
    title: 'See the change,',
    em: 'not the noise',
    details: DETAILS,
    visuals: [
      <div key="a" className="grid w-40 grid-cols-2 gap-1.5">
        <span className="h-10 rounded-md border border-line" />
        <span className="h-10 rounded-md border border-line" />
      </div>,
      <div key="b" className="space-y-1 font-mono text-xs">
        <p className="rounded bg-rose/15 px-2 text-rose">− debug: true</p>
        <p className="rounded bg-emerald/15 px-2 text-emerald">+ debug: false</p>
      </div>,
      <span key="c" className="font-mono text-sm text-muted">
        line 3 of 7
      </span>,
    ],
  },
  uses: { layout: 'tilt', title: 'For configs,', em: 'contracts and copy' },
  facts: FACTS,
  backdrop: { kind: 'grid', at: 'uses' },
}

export default function Story({ features, useCases }: StoryProps) {
  return <StoryLayout config={config} demo={<Demo />} features={features} useCases={useCases} />
}
