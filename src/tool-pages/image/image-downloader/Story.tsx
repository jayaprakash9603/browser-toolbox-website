'use client'

import { FileArchiveIcon } from 'lucide-react'

import { StoryLayout, type StoryConfig, type StoryProps } from '@/components/tool/story'

import Demo from './Demo'
import { DETAILS, FACTS, PHOTOS, PICKED, STEPS, ZIP } from './script'

const config: StoryConfig = {
  problem: {
    variant: 'blur',
    text: 'Right-click, Save image as, pick a folder. Now do that for every image on the board.',
    accent: ['every image'],
    compare: 'stack',
    beforeLabel: 'One at a time',
    afterLabel: 'All at once',
    before: (
      <div className="flex flex-wrap gap-2">
        {PHOTOS.map((photo) => (
          <span
            key={photo.name}
            className="rounded-md border border-line px-2 py-1 font-mono text-xs text-ink-soft"
          >
            Save image as… {photo.name}.{photo.ext}
          </span>
        ))}
      </div>
    ),
    after: (
      <span className="inline-flex items-center gap-3 rounded-xl border border-line-strong bg-surface px-4 py-3">
        <FileArchiveIcon className="size-7 text-[#f59e0b]" />
        <span className="text-left">
          <span className="block font-mono text-sm text-ink">{ZIP}</span>
          <span className="block text-xs text-muted">
            {PICKED.length} images, named from your template
          </span>
        </span>
      </span>
    ),
  },
  walk: { title: 'The whole page,', em: 'in one go', steps: STEPS, flip: true },
  features: { layout: 'stack', title: 'Only the images', em: 'you want', details: DETAILS },
  uses: { layout: 'fan', title: 'Collect,', em: 'don’t click' },
  facts: FACTS,
  backdrop: { kind: 'meteors', at: 'features' },
}

export default function Story({ features, useCases }: StoryProps) {
  return <StoryLayout config={config} demo={<Demo />} features={features} useCases={useCases} />
}
