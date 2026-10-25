'use client'

import { StoryLayout, type StoryConfig, type StoryProps } from '@/components/tool/story'

import Demo from './Demo'
import { DETAILS, FACTS, HEADER, PICK, STEPS } from './script'

function CodeView({ wide }: { wide: boolean }) {
  return (
    <div className="w-[min(100%,420px)] rounded-xl border border-line bg-[#0d1117] p-3">
      <div className="mx-auto" style={{ width: wide ? '100%' : '62%' }}>
        <div className="space-y-1.5 rounded-md border border-white/10 p-2">
          {[78, 92, 64, 88, 96, 52, 84].map((width, line) => (
            <span key={line} className="flex items-center gap-2">
              <span className="w-3 text-right font-mono text-[9px] text-[#6e7681]">{line + 1}</span>
              <span
                className="block h-1 rounded-full bg-[#79c0ff55]"
                style={{ width: `${width}%` }}
              />
            </span>
          ))}
        </div>
      </div>
      <p className="mt-2 text-center text-[11px] text-muted">
        {wide
          ? `${PICK.name} · ${HEADER[3].replace('// @match', '').trim()}`
          : 'github.com, default layout'}
      </p>
    </div>
  )
}

const config: StoryConfig = {
  problem: {
    variant: 'chars',
    text: 'The site almost works the way you want. A few lines of script would fix it, if you had somewhere to keep them.',
    accent: ['somewhere to keep them'],
    compare: 'stack',
    beforeLabel: 'As shipped',
    afterLabel: 'With one script',
    before: <CodeView wide={false} />,
    after: <CodeView wide />,
  },
  walk: { title: 'Add it, run it,', em: 'know it ran', steps: STEPS },
  features: {
    layout: 'ticker',
    title: 'A userscript manager',
    em: 'in the side panel',
    details: DETAILS,
  },
  uses: { layout: 'tilt', title: 'Small fixes for', em: 'sites you use daily' },
  facts: FACTS,
  backdrop: { kind: 'beams', at: 'features' },
}

export default function Story({ features, useCases }: StoryProps) {
  return <StoryLayout config={config} demo={<Demo />} features={features} useCases={useCases} />
}
