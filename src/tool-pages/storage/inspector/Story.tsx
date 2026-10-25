'use client'

import { StoryLayout, type StoryConfig, type StoryProps } from '@/components/tool/story'

import Demo from './Demo'
import { DETAILS, FACTS, LOCAL, MATCHES, QUERY, STEPS } from './script'

function Console() {
  return (
    <div className="w-[min(100%,380px)] rounded-xl border border-line bg-[#111116] p-4 font-mono text-[12px] leading-relaxed">
      <p className="text-muted">
        &gt; Object.keys(localStorage).filter(k =&gt; k.startsWith(&apos;ff:&apos;))
      </p>
      <p className="mt-1 text-ink-soft">
        (3) [&apos;{MATCHES[0][0]}&apos;, &apos;{MATCHES[1][0]}&apos;, &apos;{MATCHES[2][0]}&apos;]
      </p>
      <p className="mt-2 text-muted">&gt; localStorage.getItem(&apos;{MATCHES[0][0]}&apos;)</p>
      <p className="mt-1 text-ink-soft">&apos;{MATCHES[0][1]}&apos;</p>
    </div>
  )
}

function Listing() {
  return (
    <div className="w-[min(100%,380px)] space-y-1.5 rounded-xl border border-line bg-surface p-3">
      <p className="rounded-md border border-line-strong px-2 py-1 font-mono text-[12px] text-ink">
        {QUERY}
      </p>
      {MATCHES.map(([key, value]) => (
        <div key={key} className="rounded-md border border-line px-2 py-1.5 font-mono text-[12px]">
          <p className="text-[var(--accent)]">{key}</p>
          <p className="text-muted">{value}</p>
        </div>
      ))}
    </div>
  )
}

const config: StoryConfig = {
  problem: {
    variant: 'blur',
    text: `Which flags are on? DevTools, the Application tab, a filter box, or a line of console code you retype every time.`,
    accent: ['every time'],
    compare: 'stack',
    beforeLabel: 'In the console',
    afterLabel: `In the side panel, ${MATCHES.length} of ${LOCAL.length} keys`,
    before: <Console />,
    after: <Listing />,
  },
  walk: { title: 'What this page', em: 'keeps about you', steps: STEPS },
  features: {
    layout: 'ticker',
    title: 'Both storage areas,',
    em: 'nothing changed',
    details: DETAILS,
  },
  uses: { layout: 'tilt', title: 'For flags, carts and', em: 'curiosity' },
  facts: FACTS,
  backdrop: { kind: 'shader-plasma', at: 'problem' },
}

export default function Story({ features, useCases }: StoryProps) {
  return <StoryLayout config={config} demo={<Demo />} features={features} useCases={useCases} />
}
