'use client'

import { StoryLayout, type StoryConfig, type StoryProps } from '@/components/tool/story'

import Demo from './Demo'
import { ATTRIBUTES, DETAILS, FACTS, STEPS, STYLES } from './script'

const config: StoryConfig = {
  problem: {
    variant: 'scrub',
    text: 'You only wanted the padding on one button. DevTools gave you four hundred lines of DOM and a styles pane of crossed-out rules.',
    accent: ['four hundred lines of DOM'],
    compare: 'split',
    beforeLabel: 'DevTools',
    afterLabel: 'Element Inspector',
    before: (
      <div className="space-y-1 font-mono text-xs text-muted">
        <p>&lt;div class=&quot;layout&quot;&gt;</p>
        <p className="pl-3">&lt;div class=&quot;hero-wrap&quot;&gt;</p>
        <p className="pl-6">&lt;div class=&quot;hero-inner&quot;&gt; … &lt;/div&gt;</p>
        <p className="pl-6 text-ink-soft">&lt;a class=&quot;btn btn-primary&quot;&gt;</p>
        <p className="pl-3 line-through">padding: 8px 16px;</p>
        <p className="pl-3 line-through">padding: 4px 10px;</p>
        <p className="pl-3">padding: 6px 12px;</p>
      </div>
    ),
    after: (
      <div className="space-y-3 font-mono text-sm">
        <p className="text-ink">a.btn.btn-primary</p>
        <p className="text-ink-soft">
          {ATTRIBUTES[2][0]}=&quot;{ATTRIBUTES[2][1]}&quot;
        </p>
        {STYLES.slice(0, 3).map(([name, value]) => (
          <p key={name}>
            <span className="text-[var(--accent)]">{name}:</span>{' '}
            <span className="text-ink-soft">{value}</span>
          </p>
        ))}
      </div>
    ),
  },
  walk: { title: 'Point, click,', em: 'read', steps: STEPS },
  features: {
    layout: 'bento',
    title: 'The element,',
    em: 'not the haystack',
    details: DETAILS,
    visuals: [
      <span
        key="a"
        className="inline-block rounded-[3px] bg-[#312e81] px-2 py-0.5 font-mono text-xs text-white"
      >
        a.btn.btn-primary
      </span>,
      <div key="b" className="flex flex-wrap gap-1.5 font-mono text-xs">
        {['<a>', '.btn', '.btn-primary', 'data-testid'].map((name) => (
          <span
            key={name}
            className="rounded-md border border-line-strong px-2 py-0.5 text-ink-soft"
          >
            {name}
          </span>
        ))}
      </div>,
      <p key="c" className="font-mono text-xs text-ink-soft">
        <span className="text-[var(--accent)]">background-color:</span> {STYLES[0][1]}
      </p>,
      <div key="d" className="grid grid-cols-4 gap-1.5 text-center font-mono text-xs">
        {['W', 'H', 'X', 'Y'].map((name) => (
          <span key={name} className="rounded-md border border-line py-1 text-muted">
            {name}
          </span>
        ))}
      </div>,
    ],
  },
  uses: { layout: 'timeline', title: 'Answers in', em: 'one click' },
  facts: FACTS,
  backdrop: { kind: 'grid', at: 'problem' },
}

export default function Story({ features, useCases }: StoryProps) {
  return <StoryLayout config={config} demo={<Demo />} features={features} useCases={useCases} />
}
