'use client'

import { StoryLayout, type StoryConfig, type StoryProps } from '@/components/tool/story'

import Demo from './Demo'
import {
  CSV,
  DETAILS,
  FACTS,
  LOG,
  STATUS_COLOR,
  STEPS,
  formatClockDuration,
  formatTime,
} from './script'

function Hunch() {
  return (
    <div className="w-[min(100%,360px)] rounded-xl border border-line bg-surface p-4 text-[13px] leading-relaxed text-ink-soft">
      <p className="font-medium text-ink">To: support@isp.example</p>
      <p className="mt-2">
        Hi, my Internet keeps dropping. I think it happened this morning? Maybe around nine. It came
        back after a bit.
      </p>
    </div>
  )
}

function Proof() {
  return (
    <div className="w-[min(100%,360px)] overflow-hidden rounded-xl border border-line bg-surface">
      {LOG.map((row) => (
        <div
          key={row.at}
          className="flex items-center gap-3 border-b border-line px-4 py-2 font-mono text-[12px] last:border-b-0"
        >
          <span className="text-ink-soft">{formatTime(row.at)}</span>
          <span style={{ color: STATUS_COLOR[row.status] }}>{row.short}</span>
          <span className="ml-auto text-ink">{formatClockDuration(row.durationMs)}</span>
        </div>
      ))}
      <p className="truncate bg-canvas/60 px-4 py-1.5 font-mono text-[10px] text-muted">
        {CSV.split('\n')[0]}
      </p>
    </div>
  )
}

const config: StoryConfig = {
  problem: {
    variant: 'scrub',
    text: '“It keeps dropping” is a feeling. Times, durations and a log you can send are proof.',
    accent: ['proof'],
    compare: 'wipe',
    beforeLabel: 'From memory',
    afterLabel: 'From the log',
    before: <Hunch />,
    after: <Proof />,
  },
  walk: { title: 'Know the moment', em: 'your connection drops', steps: STEPS },
  features: {
    layout: 'bento',
    title: 'A connection you can',
    em: 'see and prove',
    details: DETAILS,
  },
  uses: { layout: 'marquee', title: 'For calls, uploads and', em: 'arguments with your ISP' },
  facts: FACTS,
  backdrop: { kind: 'grid', at: 'problem' },
}

export default function Story({ features, useCases }: StoryProps) {
  return <StoryLayout config={config} demo={<Demo />} features={features} useCases={useCases} />
}
