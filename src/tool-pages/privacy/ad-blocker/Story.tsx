'use client'

import { ShaderBackdrop } from '@/components/fx/ShaderBackdrop'
import { MockPage, useToolMeta } from '@/components/tool/stage'
import {
  BeforeAfter,
  Chapter,
  ChapterHead,
  FactStrip,
  FeatureTicker,
  KineticStatement,
  PinnedWalkthrough,
  StoryShell,
  UseCaseMarquee,
  type StoryProps,
} from '@/components/tool/story'

import Demo from './Demo'
import { DETAILS, FACTS, STEPS } from './script'

function Cluttered() {
  return (
    <div className="relative h-full overflow-hidden bg-[#fafafa]">
      <MockPage variant="article" className="h-full opacity-60" />
      <div className="absolute inset-x-6 top-14 flex h-14 items-center justify-center rounded-lg bg-[#ef4444] text-lg font-black uppercase text-white">
        You won a prize!
      </div>
      <div className="absolute bottom-10 right-6 flex size-40 items-center justify-center rounded-lg bg-[#a21caf] p-4 text-center text-lg font-black uppercase text-white">
        Casino bonus x200
      </div>
      <div className="absolute bottom-24 left-6 flex h-20 w-56 items-center justify-center rounded-lg bg-[#f59e0b] text-base font-black uppercase text-white">
        70% off today
      </div>
      <div className="absolute left-1/3 top-1/3 rounded-xl bg-black/80 p-4 text-sm text-white shadow-2xl">
        Allow notifications?
      </div>
    </div>
  )
}

function Clean() {
  return (
    <div className="h-full overflow-hidden bg-[#fafafa]">
      <MockPage variant="article" className="h-full" />
    </div>
  )
}

export default function Story({ features, useCases }: StoryProps) {
  const { accent } = useToolMeta()
  return (
    <StoryShell>
      <Chapter label="The problem">
        <KineticStatement
          variant="outline"
          eyebrow="01 · The problem"
          text="You came for one article. The page brought fourteen ads, nine trackers and a casino."
          accent={['fourteen ads', 'nine trackers']}
        />
        <BeforeAfter
          variant="wipe"
          className="mt-16"
          height="30rem"
          beforeLabel="Without blocking"
          afterLabel="With Ad Blocker"
          before={<Cluttered />}
          after={<Clean />}
        />
      </Chapter>

      <Chapter
        label="Features"
        bg={<ShaderBackdrop variant="rings" color={accent} opacity={0.4} />}
      >
        <ChapterHead index="02" eyebrow="Features" title="Blocking that lives" em="inside Chrome" />
        <FeatureTicker features={features} details={DETAILS} className="mt-14" />
      </Chapter>

      <PinnedWalkthrough index="03" title="Flip one switch," em="get the page back" steps={STEPS}>
        <Demo />
      </PinnedWalkthrough>

      <Chapter label="Use cases">
        <ChapterHead
          index="04"
          eyebrow="Use cases"
          title="Quieter, faster,"
          em="yours"
          align="center"
        />
        <UseCaseMarquee items={useCases} className="mt-16" />
        <FactStrip facts={FACTS} className="mt-24" />
      </Chapter>
    </StoryShell>
  )
}
