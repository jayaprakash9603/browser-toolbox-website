'use client'

import { StoryLayout, type StoryConfig, type StoryProps } from '@/components/tool/story'

import Demo from './Demo'
import { CSV, DETAILS, FACTS, FORMATS, PRESETS, STEPS } from './script'

const config: StoryConfig = {
  problem: {
    variant: 'outline',
    text: 'Every staging database ends up with a user called test test, an email of asdf@asdf and nothing that looks like real life.',
    accent: ['asdf@asdf'],
    compare: 'split',
    beforeLabel: 'Typed by hand',
    afterLabel: 'Generated',
    before: (
      <div className="space-y-1.5 font-mono text-sm text-muted">
        <p>full_name,email,is_active</p>
        <p>test test,asdf@asdf,true</p>
        <p>test2,test2@test,true</p>
        <p>aaa,a@a.a,true</p>
      </div>
    ),
    after: (
      <div className="space-y-1.5 font-mono text-sm text-ink-soft">
        {CSV.slice(0, 4).map((line, index) => (
          <p key={line} className={index === 0 ? 'text-[var(--accent)]' : undefined}>
            {line}
          </p>
        ))}
      </div>
    ),
  },
  walk: { title: 'Rows that look', em: 'like real users', steps: STEPS },
  features: {
    layout: 'reel',
    title: 'Data you can',
    em: 'reproduce',
    details: DETAILS,
    visuals: [
      <div key="a" className="flex flex-wrap gap-1.5 text-xs">
        {PRESETS.map((name) => (
          <span
            key={name}
            className="rounded-full border border-line-strong px-2.5 py-1 text-ink-soft"
          >
            {name}
          </span>
        ))}
      </div>,
      <p key="b" className="font-mono text-sm text-ink-soft">
        seed <span className="text-[var(--accent)]">4821</span> → same rows, every time
      </p>,
      <div key="c" className="space-y-1 font-mono text-xs text-ink-soft">
        <p>0.30000000000000004</p>
        <p>user@@example.com</p>
        <p>Z̵̡̢͈a̷̧͔l̶̨̛g̸̡̛o̵̢͝</p>
      </div>,
      <div key="d" className="flex flex-wrap gap-1.5 font-mono text-xs">
        {FORMATS.map((name) => (
          <span key={name} className="rounded-md bg-white/[0.06] px-2 py-1 text-ink">
            {name}
          </span>
        ))}
      </div>,
    ],
  },
  uses: { layout: 'quotes', title: 'Fixtures in', em: 'seconds' },
  facts: FACTS,
  backdrop: { kind: 'aurora', at: 'problem' },
  order: 'features-first',
}

export default function Story({ features, useCases }: StoryProps) {
  return <StoryLayout config={config} demo={<Demo />} features={features} useCases={useCases} />
}
