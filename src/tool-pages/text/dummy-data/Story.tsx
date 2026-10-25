'use client'

import { Bar } from '@/components/tool/stage'
import { StoryLayout, type StoryConfig, type StoryProps } from '@/components/tool/story'

import Demo from './Demo'
import { DETAILS, FACTS, LOREM_PARAGRAPHS, STEPS } from './script'

function Card({ filled }: { filled: boolean }) {
  return (
    <div className="w-full max-w-xs rounded-2xl border border-line bg-canvas/60 p-5">
      <div
        className="h-24 rounded-xl"
        style={{
          background: 'linear-gradient(135deg, rgb(129 140 248 / 0.5), rgb(244 114 182 / 0.4))',
        }}
      />
      {filled ? (
        <>
          <p className="mt-4 font-semibold text-ink">Lorem ipsum dolor sit</p>
          <p className="mt-1 text-sm text-ink-soft">{LOREM_PARAGRAPHS[0]}</p>
        </>
      ) : (
        <>
          <p className="mt-4 font-semibold text-muted">Title goes here</p>
          <p className="mt-1 text-sm text-muted">Text text text text text</p>
        </>
      )}
    </div>
  )
}

const config: StoryConfig = {
  problem: {
    variant: 'blur',
    text: '“Text text text” does not show you where the layout breaks. Real-length copy does.',
    accent: ['Real-length copy'],
    compare: 'stack',
    beforeLabel: 'Placeholder',
    afterLabel: 'Generated',
    before: <Card filled={false} />,
    after: <Card filled />,
  },
  walk: { title: 'Spin up', em: 'the right amount', steps: STEPS },
  features: {
    layout: 'stack',
    title: 'Filler, by',
    em: 'the paragraph or word',
    details: DETAILS,
    visuals: [
      <div key="a" className="w-40 space-y-1.5">
        {[96, 88, 70].map((width) => (
          <Bar key={width} w={`${width}%`} className="bg-white/20" />
        ))}
      </div>,
      <p key="b" className="text-sm text-ink-soft">
        The river kept its own schedule.
      </p>,
      <p key="c" className="font-mono text-sm text-[var(--accent)]">
        lorem ipsum dolor
      </p>,
      <p key="d" className="font-mono text-xs text-muted">
        Lorem ⇄ Random
      </p>,
    ],
  },
  uses: { layout: 'fan', title: 'Fill it, then', em: 'stress it', center: true },
  facts: FACTS,
  backdrop: { kind: 'rings', at: 'features' },
}

export default function Story({ features, useCases }: StoryProps) {
  return <StoryLayout config={config} demo={<Demo />} features={features} useCases={useCases} />
}
