'use client'

import { StoryLayout, type StoryConfig, type StoryProps } from '@/components/tool/story'

import Demo from './Demo'
import { CLEAN, DETAILS, FACTS, STEPS, URL_TEXT } from './script'

function Link({ url, removed }: { url: string; removed?: number }) {
  return (
    <div className="w-[min(100%,380px)] rounded-xl border border-line bg-surface p-4">
      <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted">
        {removed ? `Pasted after Clean URL · ${removed} removed` : 'Pasted from the address bar'}
      </p>
      <p className="mt-2 break-all font-mono text-[13px] leading-relaxed text-ink-soft">{url}</p>
    </div>
  )
}

const config: StoryConfig = {
  problem: {
    variant: 'scramble',
    text: 'You meant to share an article. You shared a newsletter campaign, a medium and a click ID along with it.',
    accent: ['click ID'],
    compare: 'split',
    beforeLabel: 'Copied from the address bar',
    afterLabel: 'Copied as Clean URL',
    before: <Link url={URL_TEXT} />,
    after: <Link url={CLEAN.url} removed={CLEAN.removed} />,
  },
  walk: { title: 'Every quick action', em: 'for the tab you are on', steps: STEPS },
  features: { layout: 'grid', title: 'Small jobs,', em: 'one click each', details: DETAILS },
  uses: { layout: 'timeline', title: 'For the', em: 'in-between moments' },
  facts: FACTS,
  backdrop: { kind: 'dots', at: 'uses' },
}

export default function Story({ features, useCases }: StoryProps) {
  return <StoryLayout config={config} demo={<Demo />} features={features} useCases={useCases} />
}
