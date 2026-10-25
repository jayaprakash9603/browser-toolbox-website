'use client'

import { GridFloor } from '@/components/fx/backgrounds'
import {
  BeforeAfter,
  Chapter,
  ChapterHead,
  FactStrip,
  FeatureGrid,
  KineticStatement,
  PinnedWalkthrough,
  StoryShell,
  UseCaseTimeline,
  type StoryProps,
} from '@/components/tool/story'

import Demo from './Demo'
import { CASES, FACTS, STEPS } from './script'

const SAMPLES: Record<string, string[]> = {
  'lower / UPPER': ['lower', 'upper'],
  'Title & Sentence': ['title', 'sentence'],
  camelCase: ['camel'],
  PascalCase: ['pascal'],
  snake_case: ['snake'],
  'kebab-case': ['kebab'],
  CONSTANT_CASE: ['constant'],
}

const DETAILS = [
  'Shout it or whisper it, in one click each.',
  'Capitalise every word for headings, or only the first for sentences.',
  'For JavaScript and JSON keys.',
  'For classes, components and types.',
  'For Python, Ruby and database columns.',
  'For URLs, CSS classes and file names.',
  'For environment variables and enums.',
]

function sample(feature: string) {
  const ids = SAMPLES[feature] ?? []
  return (
    <div className="space-y-1 font-mono text-sm">
      {ids.map((id) => (
        <p key={id} className="truncate text-[var(--accent)]">
          {CASES.find((item) => item.id === id)?.value}
        </p>
      ))}
    </div>
  )
}

export default function Story({ features, useCases }: StoryProps) {
  return (
    <StoryShell>
      <Chapter label="The problem">
        <KineticStatement
          variant="scrub"
          eyebrow="01 · The problem"
          text="Retyping user_profile_settings as userProfileSettings, by hand, one underscore at a time."
          accent={['by hand,']}
        />
        <BeforeAfter
          variant="stack"
          className="mt-16"
          beforeLabel="By hand"
          afterLabel="With Case Converter"
          before={
            <div className="space-y-2 font-mono text-lg text-muted">
              <p>
                user<span className="rounded bg-rose/25 text-rose">_p</span>rofile
                <span className="rounded bg-rose/25 text-rose">_s</span>ettings
              </p>
              <p className="text-sm">← delete, shift, retype, repeat</p>
            </div>
          }
          after={
            <div className="space-y-2 font-mono text-lg">
              {['camel', 'pascal', 'kebab', 'constant'].map((id) => (
                <p key={id} className="text-ink">
                  {CASES.find((item) => item.id === id)?.value}
                </p>
              ))}
            </div>
          }
        />
      </Chapter>

      <PinnedWalkthrough index="02" title="One phrase," em="every convention" steps={STEPS}>
        <Demo />
      </PinnedWalkthrough>

      <Chapter label="Features" bg={<GridFloor />}>
        <ChapterHead index="03" eyebrow="Features" title="Nine cases," em="zero retyping" />
        <FeatureGrid
          features={features}
          details={DETAILS}
          visuals={features.map((feature) => sample(feature))}
          className="mt-14"
        />
      </Chapter>

      <Chapter label="Use cases">
        <ChapterHead index="04" eyebrow="Use cases" title="Where names" em="change shape" />
        <UseCaseTimeline items={useCases} className="mt-16" />
        <FactStrip facts={FACTS} className="mt-24" />
      </Chapter>
    </StoryShell>
  )
}
