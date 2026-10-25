'use client'

import { FileImageIcon, FileTextIcon } from 'lucide-react'

import { StoryLayout, type StoryConfig, type StoryProps } from '@/components/tool/story'

import Demo from './Demo'
import { DETAILS, FACTS, SCANS, STEPS, TITLE } from './script'

const config: StoryConfig = {
  problem: {
    variant: 'scramble',
    text: 'Expenses wants one PDF. You have three photos and a website that wants your email first.',
    accent: ['one PDF'],
    compare: 'split',
    beforeLabel: 'Three photos',
    afterLabel: 'One PDF',
    before: (
      <div className="space-y-2 text-left">
        {SCANS.map((scan) => (
          <span key={scan.name} className="flex items-center gap-2 font-mono text-sm text-ink-soft">
            <FileImageIcon className="size-5 text-muted" />
            {scan.name}
          </span>
        ))}
      </div>
    ),
    after: (
      <span className="flex items-center gap-3 text-left">
        <FileTextIcon className="size-9 text-[#f43f5e]" />
        <span>
          <span className="block font-mono text-sm text-ink">{TITLE}.pdf</span>
          <span className="block text-xs text-muted">
            {SCANS.length} pages, made on your device
          </span>
        </span>
      </span>
    ),
  },
  walk: { title: 'File chores,', em: 'done locally', steps: STEPS },
  features: { layout: 'bento', title: 'Six tools for', em: 'everyday files', details: DETAILS },
  uses: { layout: 'timeline', title: 'No upload,', em: 'no sign-up' },
  facts: FACTS,
  backdrop: { kind: 'shader-flow', at: 'uses' },
}

export default function Story({ features, useCases }: StoryProps) {
  return <StoryLayout config={config} demo={<Demo />} features={features} useCases={useCases} />
}
