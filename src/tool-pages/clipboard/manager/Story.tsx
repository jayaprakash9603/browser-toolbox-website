'use client'

import { PinIcon } from 'lucide-react'

import { StoryLayout, type StoryConfig, type StoryProps } from '@/components/tool/story'

import Demo from './Demo'
import { DETAILS, FACTS, OLDER, SNIPPETS, STEPS } from './script'

const HISTORY = [SNIPPETS.key, SNIPPETS.install, ...OLDER]

const config: StoryConfig = {
  problem: {
    variant: 'blur',
    text: 'You copied it an hour ago. Then you copied something else, and it was gone.',
    accent: ['it was gone.'],
    compare: 'split',
    beforeLabel: 'System clipboard',
    afterLabel: 'Clipboard Manager',
    before: (
      <div className="space-y-3">
        <p className="rounded-xl border border-line bg-canvas/60 px-4 py-3 font-mono text-sm text-ink">
          {OLDER[0]}
        </p>
        {HISTORY.slice(1).map((text) => (
          <p key={text} className="px-4 font-mono text-sm text-muted/40 line-through">
            {text}
          </p>
        ))}
      </div>
    ),
    after: (
      <div className="space-y-2">
        {HISTORY.map((text, index) => (
          <p
            key={text}
            className="flex items-center justify-between rounded-xl border border-line bg-canvas/60 px-4 py-2.5 font-mono text-sm text-ink"
          >
            {text}
            {index === 0 ? (
              <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--accent)]">
                Pinned
              </span>
            ) : null}
          </p>
        ))}
      </div>
    ),
  },
  walk: { title: 'Copy, find, pin,', em: 'paste', steps: STEPS },
  features: {
    layout: 'stack',
    title: 'A memory for',
    em: 'everything you copy',
    details: DETAILS,
    visuals: [
      <p key="a" className="rounded-lg border border-line px-3 py-2 font-mono text-sm">
        <span className="bg-amber/30">api</span>.acme.dev
      </p>,
      <span
        key="b"
        className="inline-flex items-center gap-2 font-mono text-sm text-[var(--accent)]"
      >
        <PinIcon className="size-3.5" /> {SNIPPETS.key}
      </span>,
      <span
        key="c"
        className="rounded-full border border-line-strong px-3 py-1 text-xs text-ink-soft"
      >
        Text only
      </span>,
      <span
        key="d"
        className="rounded-lg bg-[var(--accent)] px-3 py-1.5 text-xs font-medium text-canvas"
      >
        + Add from clipboard
      </span>,
      <span key="e" className="font-mono text-sm text-rose">
        Clear all
      </span>,
    ],
  },
  uses: { layout: 'quotes', title: 'Small moments', em: 'it saves' },
  facts: FACTS,
  backdrop: { kind: 'meteors', at: 'problem' },
}

export default function Story({ features, useCases }: StoryProps) {
  return <StoryLayout config={config} demo={<Demo />} features={features} useCases={useCases} />
}
