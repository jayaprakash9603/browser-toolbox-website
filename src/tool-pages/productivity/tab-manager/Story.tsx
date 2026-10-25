'use client'

import { StoryLayout, type StoryConfig, type StoryProps } from '@/components/tool/story'

import Demo from './Demo'
import { DETAILS, DUPES, FACTS, KEPT, STEPS, TABS, type Tab } from './script'

function Strip({ tabs }: { tabs: Tab[] }) {
  return (
    <div className="flex w-[min(100%,380px)] gap-0.5 rounded-t-lg bg-[#05050a] px-1.5 pt-1.5">
      {tabs.map((tab) => (
        <span
          key={tab.id}
          className={`flex min-w-0 flex-1 items-center gap-1 rounded-t-md px-1.5 py-1 ${tab.active ? 'bg-[#1b1b22]' : 'bg-white/[0.04]'}`}
        >
          <span className="size-2.5 shrink-0 rounded-sm" style={{ backgroundColor: tab.color }} />
          <span className="truncate text-[10px] text-ink-soft">{tab.title}</span>
        </span>
      ))}
    </div>
  )
}

const config: StoryConfig = {
  problem: {
    variant: 'scramble',
    text: 'Nine tabs, three of them copies of pages already open, and the one you need is a favicon you can no longer read.',
    accent: ['already open'],
    compare: 'split',
    beforeLabel: `${TABS.length} tabs`,
    afterLabel: `${KEPT.length} after closing ${DUPES.size} duplicates`,
    before: <Strip tabs={TABS} />,
    after: <Strip tabs={KEPT} />,
  },
  walk: { title: 'Every tab,', em: 'one searchable list', steps: STEPS },
  features: { layout: 'grid', title: 'Tidy tabs', em: 'without hunting', details: DETAILS },
  uses: { layout: 'fan', title: 'For the', em: 'forty-tab afternoon' },
  facts: FACTS,
  backdrop: { kind: 'beams', at: 'features' },
}

export default function Story({ features, useCases }: StoryProps) {
  return <StoryLayout config={config} demo={<Demo />} features={features} useCases={useCases} />
}
