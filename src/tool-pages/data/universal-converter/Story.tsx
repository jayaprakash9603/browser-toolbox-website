'use client'

import { StoryLayout, type StoryConfig, type StoryProps } from '@/components/tool/story'

import Demo from './Demo'
import { DETAILS, FACTS, JSON_LINES, OUTPUTS, STEPS } from './script'

const config: StoryConfig = {
  problem: {
    variant: 'blur',
    text: 'The API speaks JSON, finance wants a spreadsheet, the config wants YAML and the README wants a table. You become the converter.',
    accent: ['You become the converter.'],
    compare: 'split',
    beforeLabel: 'JSON',
    afterLabel: 'Markdown',
    before: (
      <pre className="font-mono text-xs leading-relaxed text-ink-soft">{JSON_LINES.join('\n')}</pre>
    ),
    after: (
      <pre className="font-mono text-sm leading-relaxed text-ink">
        {OUTPUTS[3].lines.join('\n')}
      </pre>
    ),
  },
  walk: { title: 'One source,', em: 'every format', steps: STEPS },
  features: {
    layout: 'bento',
    title: 'Any format,',
    em: 'any direction',
    details: DETAILS,
    visuals: [
      <pre key="a" className="font-mono text-xs text-ink-soft">
        {JSON_LINES.slice(0, 4).join('\n')}
      </pre>,
      <pre key="b" className="font-mono text-xs text-ink-soft">
        {OUTPUTS[0].lines.join('\n')}
      </pre>,
      <pre key="c" className="font-mono text-xs text-ink-soft">
        {OUTPUTS[1].lines.slice(1, 5).join('\n')}
      </pre>,
      <pre key="d" className="font-mono text-xs text-ink-soft">
        {OUTPUTS[2].lines.slice(0, 3).join('\n')}
      </pre>,
      <pre key="e" className="font-mono text-xs text-ink-soft">
        {OUTPUTS[3].lines.slice(0, 3).join('\n')}
      </pre>,
    ],
  },
  uses: { layout: 'marquee', title: 'Data in the shape', em: 'they asked for' },
  facts: FACTS,
  backdrop: { kind: 'rings', at: 'problem' },
}

export default function Story({ features, useCases }: StoryProps) {
  return <StoryLayout config={config} demo={<Demo />} features={features} useCases={useCases} />
}
