'use client'

import { StoryLayout, type StoryConfig, type StoryProps } from '@/components/tool/story'

import Demo from './Demo'
import { DETAILS, FACTS, STEPS } from './script'

const config: StoryConfig = {
  problem: {
    variant: 'outline',
    text: 'To test one API change you edit the base URL, rebuild, reload, and remember to change it back.',
    accent: ['remember to change it back.'],
    compare: 'wipe',
    beforeLabel: 'Edit and rebuild',
    afterLabel: 'One rule',
    before: (
      <div className="space-y-2 font-mono text-sm">
        <p className="text-muted">
          <span className="text-rose line-through">
            const API = &apos;https://api.acme.com&apos;
          </span>
        </p>
        <p className="text-ink-soft">
          const API = &apos;http://localhost:3000&apos; // TODO revert
        </p>
        <p className="text-muted">$ npm run build · reload · retry</p>
      </div>
    ),
    after: (
      <div className="space-y-3 font-mono text-sm">
        <p className="text-ink-soft">
          Redirect <span className="text-[#22d3ee]">api.acme.com</span> →{' '}
          <span className="text-emerald">localhost:3000</span>
        </p>
        <p className="text-muted">No code change. Toggle it off when you are done.</p>
      </div>
    ),
  },
  walk: { title: 'Change the network,', em: 'not the code', steps: STEPS },
  features: { layout: 'stack', title: 'Rules for', em: 'every request', details: DETAILS },
  uses: { layout: 'quotes', title: 'When the backend', em: 'is not ready' },
  facts: FACTS,
  backdrop: { kind: 'shader-plasma', at: 'problem' },
}

export default function Story({ features, useCases }: StoryProps) {
  return <StoryLayout config={config} demo={<Demo />} features={features} useCases={useCases} />
}
