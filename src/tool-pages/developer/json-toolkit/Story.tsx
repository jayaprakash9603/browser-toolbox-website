'use client'

import { DotField } from '@/components/fx/backgrounds'
import { ShaderBackdrop } from '@/components/fx/ShaderBackdrop'
import { Code, useToolMeta } from '@/components/tool/stage'
import {
  BeforeAfter,
  Chapter,
  ChapterHead,
  FactStrip,
  FeatureBento,
  KineticStatement,
  PinnedWalkthrough,
  StoryShell,
  UseCaseFan,
  type StoryProps,
} from '@/components/tool/story'

import Demo from './Demo'
import { DETAILS, FACTS, FORMATTED, MINIFIED, STEPS } from './script'

const VISUALS = [
  <span key="a" className="font-mono text-5xl text-[var(--accent)]">
    {'{ }'}
  </span>,
  <span
    key="b"
    className="inline-flex items-center gap-2 rounded-lg border border-rose/40 bg-rose/10 px-3 py-1.5 font-mono text-xs text-rose"
  >
    Line 4, col 18 · Unexpected ,
  </span>,
  <div key="c" className="space-y-1.5 font-mono text-xs text-muted">
    {['▾ user', '  ▸ roles [2]', '  id: 42'].map((line) => (
      <p key={line} className="whitespace-pre">
        {line}
      </p>
    ))}
  </div>,
  <code key="d" className="rounded-lg bg-white/5 px-3 py-1.5 font-mono text-sm text-cyan">
    $.user.roles[*]
  </code>,
  <div key="e" className="flex gap-2 font-mono text-xs">
    {['CSV', 'XML', 'TS'].map((target) => (
      <span key={target} className="rounded-md border border-line-strong px-2.5 py-1 text-ink-soft">
        {target}
      </span>
    ))}
  </div>,
]

export default function Story({ features, useCases }: StoryProps) {
  const { accent } = useToolMeta()
  return (
    <StoryShell>
      <Chapter label="The problem" bg={<DotField />}>
        <KineticStatement
          variant="scramble"
          eyebrow="01 · The problem"
          text="API responses arrive as one endless line. You need structure, not a wall of braces."
          accent={['one endless line', 'structure']}
        />
        <BeforeAfter
          variant="wipe"
          className="mt-16"
          before={
            <p className="h-full break-all p-8 pt-16 font-mono text-sm leading-relaxed text-muted">
              {MINIFIED.repeat(16)}
            </p>
          }
          after={
            <div className="flex h-full items-center justify-center bg-elevated">
              <Code code={FORMATTED} className="border-0 bg-transparent text-base md:text-lg" />
            </div>
          }
        />
      </Chapter>

      <PinnedWalkthrough
        index="02"
        title="One line to a typed model"
        em="in four moves"
        steps={STEPS}
      >
        <Demo />
      </PinnedWalkthrough>

      <Chapter label="Features">
        <ChapterHead index="03" eyebrow="Features" title="Every JSON chore," em="handled" />
        <FeatureBento features={features} details={DETAILS} visuals={VISUALS} className="mt-14" />
      </Chapter>

      <Chapter
        label="Use cases"
        bg={<ShaderBackdrop variant="grid" color={accent} opacity={0.55} />}
      >
        <ChapterHead
          index="04"
          eyebrow="Use cases"
          title="Where it earns"
          em="its place"
          align="center"
        />
        <UseCaseFan items={useCases} className="mt-16" />
        <FactStrip facts={FACTS} className="mt-24" />
      </Chapter>
    </StoryShell>
  )
}
