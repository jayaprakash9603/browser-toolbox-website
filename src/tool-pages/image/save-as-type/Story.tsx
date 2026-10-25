'use client'

import { FileImageIcon, FileWarningIcon } from 'lucide-react'

import { StoryLayout, type StoryConfig, type StoryProps } from '@/components/tool/story'

import Demo from './Demo'
import { DETAILS, FACTS, PICKS, STEPS } from './script'

function File({ name, note, ok }: { name: string; note: string; ok?: boolean }) {
  const Icon = ok ? FileImageIcon : FileWarningIcon
  return (
    <div className="flex items-center gap-3 rounded-xl border border-line bg-surface px-4 py-3 text-left">
      <Icon className={`size-8 ${ok ? 'text-[#38bdf8]' : 'text-[#f59e0b]'}`} />
      <span>
        <span className="block font-mono text-sm text-ink">{name}</span>
        <span className="block text-xs text-muted">{note}</span>
      </span>
    </div>
  )
}

const config: StoryConfig = {
  problem: {
    variant: 'outline',
    text: 'You saved the image. Your slide deck says it cannot open .webp files.',
    accent: ['cannot open'],
    compare: 'wipe',
    beforeLabel: 'Chrome’s Save image as',
    afterLabel: 'Save image as PNG',
    before: <File name="alpine-lake.webp" note="Format not supported" />,
    after: <File ok name={PICKS[0].file} note="Opens in your deck" />,
  },
  walk: { title: 'Any image,', em: 'any format', steps: STEPS },
  features: { layout: 'grid', title: 'Five formats,', em: 'one menu', details: DETAILS },
  uses: { layout: 'quotes', title: 'For the apps that', em: 'still say no' },
  facts: FACTS,
  backdrop: { kind: 'dots', at: 'uses' },
}

export default function Story({ features, useCases }: StoryProps) {
  return <StoryLayout config={config} demo={<Demo />} features={features} useCases={useCases} />
}
