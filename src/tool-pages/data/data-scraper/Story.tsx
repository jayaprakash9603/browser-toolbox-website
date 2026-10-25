'use client'

import { StoryLayout, type StoryConfig, type StoryProps } from '@/components/tool/story'

import Demo from './Demo'
import { DETAILS, FACTS, PAGE_ONE, STEPS } from './script'

const config: StoryConfig = {
  problem: {
    variant: 'scramble',
    text: 'Forty products across six pages, and the site has no export button. So you copy, paste, fix the columns, and do it again.',
    accent: ['and do it again.'],
    compare: 'stack',
    beforeLabel: 'Copy and paste',
    afterLabel: 'Scraped',
    before: (
      <p className="font-mono text-sm leading-relaxed text-muted">
        Aero Lamp $89 Add to cart Linen Chair $240 Add to cart Oak Desk $410 Add to cart Glass Vase…
      </p>
    ),
    after: (
      <div className="grid grid-cols-[2rem_1fr_auto] gap-x-4 gap-y-1 font-mono text-sm">
        {PAGE_ONE.slice(0, 4).map((row, index) => (
          <p key={row.name} className="contents">
            <span className="text-muted">{index + 1}</span>
            <span className="text-ink">{row.name}</span>
            <span className="text-ink-soft">{row.price}</span>
          </p>
        ))}
      </div>
    ),
  },
  walk: { title: 'From page', em: 'to spreadsheet', steps: STEPS },
  features: { layout: 'ticker', title: 'Scraping without', em: 'the scripts', details: DETAILS },
  uses: { layout: 'fan', title: 'Lists you can', em: 'finally sort' },
  facts: FACTS,
  backdrop: { kind: 'beams', at: 'uses' },
  order: 'features-first',
}

export default function Story({ features, useCases }: StoryProps) {
  return <StoryLayout config={config} demo={<Demo />} features={features} useCases={useCases} />
}
