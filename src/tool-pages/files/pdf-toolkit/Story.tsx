'use client'

import { CloudUploadIcon, MonitorSmartphoneIcon } from 'lucide-react'

import { StoryLayout, type StoryConfig, type StoryProps } from '@/components/tool/story'

import Demo from './Demo'
import { CATEGORIES, DETAILS, FACTS, STEPS, TOOLS, categoryCount } from './script'

const ERRANDS = ['Merge two files', 'Shrink a scan', 'Sign a page', 'Add a password']

function Before() {
  return (
    <div className="w-[min(100%,380px)] space-y-1.5 rounded-xl border border-line bg-surface p-3">
      {ERRANDS.map((errand, index) => (
        <p
          key={errand}
          className="flex items-center gap-2 rounded-md border border-line p-2 text-[12px] text-ink"
        >
          <CloudUploadIcon className="size-3.5 shrink-0 text-muted" />
          <span className="flex-1">{errand}</span>
          <span className="text-[11px] text-muted">site {index + 1} · upload</span>
        </p>
      ))}
    </div>
  )
}

function After() {
  return (
    <div className="w-[min(100%,380px)] rounded-xl border border-line bg-surface p-3">
      <p className="flex items-center gap-2 text-[12px] font-semibold text-ink">
        <MonitorSmartphoneIcon className="size-4 text-[var(--accent)]" /> {TOOLS.length} tools · on
        device
      </p>
      <div className="mt-2 grid grid-cols-2 gap-1.5">
        {CATEGORIES.map((category) => (
          <span
            key={category.id}
            className="flex items-center justify-between rounded-md border border-line px-2 py-1.5 text-[11.5px] text-ink"
          >
            {category.name}
            <span className="tabular-nums text-muted">{categoryCount(TOOLS, category.id)}</span>
          </span>
        ))}
      </div>
    </div>
  )
}

const config: StoryConfig = {
  problem: {
    variant: 'scrub',
    text: 'Four PDF errands used to mean four websites and four uploads of the same private file.',
    accent: ['four uploads'],
    compare: 'wipe',
    beforeLabel: 'A site per job',
    afterLabel: 'One panel, no uploads',
    before: <Before />,
    after: <After />,
  },
  walk: { title: 'From catalog to', em: 'finished file', steps: STEPS },
  features: {
    layout: 'reel',
    title: `${CATEGORIES.length} groups,`,
    em: `${TOOLS.length} tools`,
    details: DETAILS,
  },
  uses: { layout: 'fan', title: 'Paperwork that', em: 'stays yours' },
  facts: FACTS,
  backdrop: { kind: 'rings', at: 'problem' },
}

export default function Story({ features, useCases }: StoryProps) {
  return <StoryLayout config={config} demo={<Demo />} features={features} useCases={useCases} />
}
