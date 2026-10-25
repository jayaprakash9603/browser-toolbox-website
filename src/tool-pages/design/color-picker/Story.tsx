'use client'

import { Aurora } from '@/components/fx/backgrounds'
import {
  BeforeAfter,
  Chapter,
  ChapterHead,
  FactStrip,
  FeatureOrbit,
  KineticStatement,
  PinnedWalkthrough,
  StoryShell,
  UseCaseTilt,
  type StoryProps,
} from '@/components/tool/story'

import Demo from './Demo'
import { DETAILS, FACTS, FINAL, STEPS } from './script'

const GUESSES = ['#F87171', '#FB7A63', '#F9735F', '#F06A5A']

export default function Story({ features, useCases }: StoryProps) {
  return (
    <StoryShell>
      <Chapter label="The problem" bg={<Aurora intensity={0.35} />}>
        <KineticStatement
          variant="scrub"
          eyebrow="01 · The problem"
          text="Close enough is not the brand colour. Eyeballing a shade from a screenshot gets you four guesses and zero matches."
          accent={['Close enough', 'zero matches']}
        />
        <BeforeAfter
          variant="split"
          className="mt-16"
          beforeLabel="Eyeballed"
          afterLabel="Sampled"
          before={
            <div className="grid grid-cols-2 gap-3">
              {GUESSES.map((hex) => (
                <div key={hex} className="rounded-2xl border border-line p-3">
                  <span className="block h-16 rounded-xl" style={{ background: hex }} />
                  <span className="mt-2 block font-mono text-xs text-muted line-through">
                    {hex}
                  </span>
                </div>
              ))}
            </div>
          }
          after={
            <div>
              <span
                className="block h-36 rounded-2xl shadow-[0_20px_60px_-20px_#F97362]"
                style={{ background: FINAL.hex }}
              />
              <div className="mt-4 space-y-1 font-mono text-sm">
                <p className="text-ink">{FINAL.hex}</p>
                <p className="text-muted">{FINAL.rgb}</p>
                <p className="text-muted">{FINAL.hsl}</p>
              </div>
            </div>
          }
        />
      </Chapter>

      <PinnedWalkthrough index="02" title="Point, hover," em="exact" steps={STEPS}>
        <Demo />
      </PinnedWalkthrough>

      <Chapter label="Features">
        <ChapterHead index="03" eyebrow="Features" title="Small tool," em="perfect aim" />
        <FeatureOrbit features={features} details={DETAILS} className="mt-16" />
      </Chapter>

      <Chapter label="Use cases" bg={<Aurora intensity={0.25} />}>
        <ChapterHead index="04" eyebrow="Use cases" title="Every shade," em="on demand" />
        <UseCaseTilt items={useCases} className="mt-16" />
        <FactStrip facts={FACTS} className="mt-24" />
      </Chapter>
    </StoryShell>
  )
}
