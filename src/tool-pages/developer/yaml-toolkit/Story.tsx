'use client'

import { highlight } from '@/components/tool/stage'
import { StoryLayout, type StoryConfig, type StoryProps } from '@/components/tool/story'

import Demo from './Demo'
import { BROKEN_LINE, DETAILS, FACTS, PAIRS, STEPS, YAML } from './script'

const config: StoryConfig = {
  problem: {
    variant: 'outline',
    text: 'One space out of place and the deploy fails with an error that points nowhere useful.',
    accent: ['One space'],
    compare: 'wipe',
    bleed: true,
    beforeLabel: 'JSON',
    afterLabel: 'YAML',
    before: (
      <div className="h-full p-10 pt-16 font-mono text-base leading-relaxed">
        {PAIRS.map(([json], index) => (
          <p key={index} className="whitespace-pre">
            {highlight(json)}
          </p>
        ))}
      </div>
    ),
    after: (
      <div className="flex h-full items-center justify-center bg-elevated font-mono text-lg leading-relaxed text-ink">
        <div>
          {YAML.map((line) => (
            <p key={line} className="whitespace-pre">
              {line}
            </p>
          ))}
        </div>
      </div>
    ),
  },
  walk: { title: 'JSON in,', em: 'valid YAML out', steps: STEPS },
  features: {
    layout: 'grid',
    title: 'Round trips,',
    em: 'no surprises',
    details: DETAILS,
    visuals: [
      <span key="a" className="font-mono text-sm text-rose">
        Line {BROKEN_LINE}: bad indentation
      </span>,
      <pre key="b" className="font-mono text-sm text-ink-soft">
        {'spec:\n  replicas: 3'}
      </pre>,
      <span key="c" className="font-mono text-sm text-[var(--accent)]">
        YAML → {'{ }'}
      </span>,
      <span key="d" className="font-mono text-sm text-[var(--accent)]">
        {'{ }'} → YAML
      </span>,
    ],
  },
  uses: { layout: 'marquee', title: 'Manifests, pipelines', em: 'and configs' },
  facts: FACTS,
  backdrop: { kind: 'aurora', at: 'uses' },
}

export default function Story({ features, useCases }: StoryProps) {
  return <StoryLayout config={config} demo={<Demo />} features={features} useCases={useCases} />
}
