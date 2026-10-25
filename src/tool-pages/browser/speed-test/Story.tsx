'use client'

import { StoryLayout, type StoryConfig, type StoryProps } from '@/components/tool/story'

import Demo from './Demo'
import { DETAILS, DOWN_COLOR, DOWNLOAD, FACTS, PLAIN_AVERAGE, STEPS, formatMbps } from './script'

const W = 340
const H = 120
const MAX = Math.max(...DOWNLOAD.live) * 1.1
const SKIP = 10

function Curve({ skipRampUp }: { skipRampUp: boolean }) {
  const points = DOWNLOAD.live.map((mbps, i) => {
    const x = (i / (DOWNLOAD.live.length - 1)) * W
    return `${i ? 'L' : 'M'}${x.toFixed(1)} ${(H - (mbps / MAX) * (H - 10)).toFixed(1)}`
  })
  const skipX = (SKIP / (DOWNLOAD.live.length - 1)) * W
  const value = skipRampUp ? DOWNLOAD.final : PLAIN_AVERAGE
  return (
    <div className="w-[min(100%,360px)] rounded-xl border border-line bg-surface p-3">
      <p className="flex items-baseline gap-1.5">
        <span className="font-mono text-[28px] font-bold" style={{ color: DOWN_COLOR }}>
          {formatMbps(value)}
        </span>
        <span className="text-[12px] text-muted">Mbps</span>
      </p>
      <svg viewBox={`0 0 ${W} ${H}`} className="mt-2 block w-full" aria-hidden>
        {skipRampUp ? (
          <rect x="0" y="0" width={skipX} height={H} fill="rgba(255,255,255,0.05)" />
        ) : null}
        <path d={points.join('')} fill="none" stroke={DOWN_COLOR} strokeWidth="2" />
        {skipRampUp ? (
          <text x={skipX / 2} y="14" textAnchor="middle" className="fill-[#71717a] text-[10px]">
            skipped
          </text>
        ) : null}
      </svg>
    </div>
  )
}

const config: StoryConfig = {
  problem: {
    variant: 'chars',
    text: 'Averaging from the first byte counts the seconds a connection spends warming up, and reports a line slower than the one you pay for.',
    accent: ['warming up'],
    compare: 'stack',
    beforeLabel: 'Averaged from the first byte',
    afterLabel: 'After skipping the first 2 s',
    before: <Curve skipRampUp={false} />,
    after: <Curve skipRampUp />,
  },
  walk: { title: 'One button,', em: 'four honest numbers', steps: STEPS },
  features: {
    layout: 'reel',
    title: 'Speed, latency',
    em: 'and a record of both',
    details: DETAILS,
  },
  uses: { layout: 'fan', title: 'For every', em: 'new network' },
  facts: FACTS,
  backdrop: { kind: 'shader-flow', at: 'features' },
}

export default function Story({ features, useCases }: StoryProps) {
  return <StoryLayout config={config} demo={<Demo />} features={features} useCases={useCases} />
}
