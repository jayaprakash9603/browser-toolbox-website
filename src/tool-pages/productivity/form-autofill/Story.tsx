'use client'

import { LockIcon } from 'lucide-react'

import { StoryLayout, type StoryConfig, type StoryProps } from '@/components/tool/story'

import Demo from './Demo'
import { DETAILS, FACTS, FIELDS, READY, STEPS } from './script'

function MiniForm({ filled }: { filled: boolean }) {
  return (
    <div className="grid w-[min(100%,360px)] grid-cols-2 gap-x-3 gap-y-2 rounded-xl bg-[#f8fafc] p-4 text-[#0f172a]">
      {FIELDS.filter((field) => field.type !== 'Checkbox').map((field) => (
        <span
          key={field.id}
          className={field.id === 'first' || field.id === 'last' ? '' : 'col-span-2'}
        >
          <span className="block text-[10px] font-medium text-[#334155]">{field.label}</span>
          <span className="mt-0.5 flex h-6 items-center gap-1 rounded border border-[#cbd5e1] bg-white px-2 text-[11px]">
            {field.protected ? (
              <LockIcon className="size-3 text-[#94a3b8]" />
            ) : filled && field.answer ? (
              field.answer
            ) : (
              <span className="h-3 w-px bg-[#0f172a]/60" />
            )}
          </span>
        </span>
      ))}
    </div>
  )
}

const config: StoryConfig = {
  problem: {
    variant: 'outline',
    text: 'Fifth application this week, and the same name, email, phone and LinkedIn go in by hand all over again.',
    accent: ['all over again'],
    compare: 'stack',
    beforeLabel: 'Typed by hand, every time',
    afterLabel: `${READY.length} saved answers in, password left alone`,
    before: <MiniForm filled={false} />,
    after: <MiniForm filled />,
  },
  walk: { title: 'Answers you saved once,', em: 'checked before they land', steps: STEPS },
  features: {
    layout: 'ticker',
    title: 'Fills what it should,',
    em: 'skips what it must',
    details: DETAILS,
  },
  uses: { layout: 'quotes', title: 'For forms you', em: 'fill again and again' },
  facts: FACTS,
  backdrop: { kind: 'shader-waves', at: 'uses' },
}

export default function Story({ features, useCases }: StoryProps) {
  return <StoryLayout config={config} demo={<Demo />} features={features} useCases={useCases} />
}
