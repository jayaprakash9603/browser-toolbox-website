'use client'

import { Beams } from '@/components/fx/backgrounds'
import { MockPage } from '@/components/tool/stage'
import {
  BeforeAfter,
  Chapter,
  ChapterHead,
  FactStrip,
  FeatureStack,
  KineticStatement,
  PinnedWalkthrough,
  StoryShell,
  UseCaseQuotes,
  type StoryProps,
} from '@/components/tool/story'

import Demo from './Demo'
import { DETAILS, FACTS, STEPS } from './script'

function Shot({ redacted }: { redacted: boolean }) {
  return (
    <div className="relative h-full overflow-hidden">
      <MockPage variant="article" title="Your invoice is ready" className="h-full" />
      <div className="absolute left-[8%] top-[46%] rounded bg-white px-2 py-1 font-mono text-sm text-[#111] shadow">
        ada.lovelace@northwind.app
        {redacted ? (
          <span className="absolute inset-0 rounded bg-white/40 backdrop-blur-md" />
        ) : null}
      </div>
      {redacted ? (
        <svg
          viewBox="0 0 400 300"
          className="absolute inset-0 size-full"
          preserveAspectRatio="none"
        >
          <path
            d="M330 60 C 290 50, 260 80, 230 120 M230 120 l2 -16 M230 120 l15 -6"
            fill="none"
            stroke="#fb7185"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <rect
            x="200"
            y="132"
            width="170"
            height="60"
            rx="10"
            fill="none"
            stroke="#fb7185"
            strokeWidth="3"
          />
        </svg>
      ) : null}
    </div>
  )
}

const VISUALS = [
  <div key="a" className="grid h-full grid-cols-2 gap-2 p-4">
    {['Visible', 'Full page', 'Selection', 'Element'].map((mode) => (
      <span
        key={mode}
        className="flex items-center justify-center rounded-xl border border-dashed border-[var(--accent)]/50 text-sm text-ink-soft"
      >
        {mode}
      </span>
    ))}
  </div>,
  <div key="b" className="flex h-full items-center justify-center gap-2 p-4">
    {[0, 1, 2, 3].map((tab) => (
      <span
        key={tab}
        className="h-20 w-14 rounded-lg border border-line-strong bg-white/5"
        style={{ transform: `rotate(${(tab - 1.5) * 6}deg)` }}
      />
    ))}
  </div>,
  <svg key="c" viewBox="0 0 200 120" className="size-full p-6">
    <path
      d="M30 90 C 70 30, 120 30, 160 60 M160 60 l-14 -2 M160 60 l-4 14"
      fill="none"
      stroke="var(--accent)"
      strokeWidth="4"
      strokeLinecap="round"
    />
  </svg>,
  <div key="d" className="flex h-full items-center justify-center">
    <span className="rounded bg-white/30 px-6 py-2 font-mono text-sm text-transparent backdrop-blur-md [text-shadow:0_0_8px_rgb(255_255_255/0.8)]">
      api_key_sk_live_9f2
    </span>
  </div>,
  <div key="e" className="flex h-full items-end gap-2 p-4">
    {[60, 80, 45, 90].map((height, index) => (
      <span
        key={index}
        className="flex-1 rounded-md bg-gradient-to-t from-[var(--accent)]/20 to-[var(--accent)]/60"
        style={{ height: `${height}%` }}
      />
    ))}
  </div>,
]

export default function Story({ features, useCases }: StoryProps) {
  return (
    <StoryShell>
      <Chapter label="The problem" bg={<Beams />}>
        <KineticStatement
          variant="blur"
          eyebrow="01 · The problem"
          text="A screenshot should take one second. Instead it takes three apps, a crop and a prayer that nobody spots the email you forgot to hide."
          accent={['one second', 'the email you forgot to hide']}
        />
        <BeforeAfter
          variant="wipe"
          className="mt-16"
          beforeLabel="Raw capture"
          afterLabel="Annotated & redacted"
          before={<Shot redacted={false} />}
          after={<Shot redacted />}
        />
      </Chapter>

      <PinnedWalkthrough index="02" title="Frame it, mark it," em="ship it" steps={STEPS} flip>
        <Demo />
      </PinnedWalkthrough>

      <Chapter label="Features">
        <ChapterHead
          index="03"
          eyebrow="Features"
          title="A full capture studio"
          em="in the sidebar"
        />
        <FeatureStack features={features} details={DETAILS} visuals={VISUALS} className="mt-16" />
      </Chapter>

      <Chapter label="Use cases">
        <ChapterHead
          index="04"
          eyebrow="Use cases"
          title="Pictures that"
          em="explain themselves"
          align="center"
        />
        <UseCaseQuotes items={useCases} className="mt-24" />
        <FactStrip facts={FACTS} className="mt-28" />
      </Chapter>
    </StoryShell>
  )
}
