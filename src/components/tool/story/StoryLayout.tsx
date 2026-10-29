'use client'

import type { ComponentProps, ReactNode } from 'react'

import {
  Aurora,
  Beams,
  DotField,
  Grain,
  GridFloor,
  Meteors,
  Rings,
} from '@/components/fx/backgrounds'
import { ShaderBackdrop, type ShaderVariant } from '@/components/fx/ShaderBackdrop'
import { useToolMeta } from '@/components/tool/stage'

import { BeforeAfter } from './BeforeAfter'
import { Chapter, ChapterHead } from './Chapter'
import { FactStrip, type Fact } from './FactStrip'
import {
  FeatureBento,
  FeatureGrid,
  FeatureOrbit,
  FeatureReel,
  FeatureStack,
  FeatureTicker,
} from './features'
import { KineticStatement, type KineticVariant } from './KineticStatement'
import { PinnedWalkthrough, type WalkStep } from './PinnedWalkthrough'
import { StoryShell } from './StoryShell'
import { UseCaseFan, UseCaseMarquee, UseCaseQuotes, UseCaseTilt, UseCaseTimeline } from './usecases'

import type { StoryProps } from '.'

const FEATURES = {
  bento: FeatureBento,
  reel: FeatureReel,
  orbit: FeatureOrbit,
  stack: FeatureStack,
  ticker: FeatureTicker,
  grid: FeatureGrid,
}
const USE_CASES = {
  tilt: UseCaseTilt,
  quotes: UseCaseQuotes,
  timeline: UseCaseTimeline,
  marquee: UseCaseMarquee,
  fan: UseCaseFan,
}

export type Backdrop =
  'aurora' | 'dots' | 'beams' | 'grid' | 'meteors' | 'rings' | 'grain' | `shader-${ShaderVariant}`

export interface StoryConfig {
  problem: {
    variant: KineticVariant
    text: string
    accent: string[]
    compare: ComponentProps<typeof BeforeAfter>['variant']
    before: ReactNode
    after: ReactNode
    beforeLabel?: string
    afterLabel?: string
    height?: string
    /** Wipe only: the art lays itself out edge to edge instead of sitting in the padded, centred frame. */
    bleed?: boolean
  }
  walk: { title: string; em: string; steps: WalkStep[]; flip?: boolean }
  features: {
    layout: keyof typeof FEATURES
    title: string
    em: string
    details?: string[]
    visuals?: ReactNode[]
  }
  uses: { layout: keyof typeof USE_CASES; title: string; em: string; center?: boolean }
  facts: Fact[]
  backdrop: { kind: Backdrop; at: 'problem' | 'features' | 'uses' }
  /** `features-first` moves the walkthrough after the feature chapter. */
  order?: 'walk-first' | 'features-first'
}

function BackdropLayer({ kind }: { kind: Backdrop }) {
  const { accent } = useToolMeta()
  if (kind.startsWith('shader-'))
    return <ShaderBackdrop variant={kind.slice(7) as ShaderVariant} color={accent} opacity={0.5} />
  switch (kind) {
    case 'aurora':
      return <Aurora />
    case 'dots':
      return <DotField />
    case 'beams':
      return <Beams />
    case 'grid':
      return <GridFloor />
    case 'meteors':
      return <Meteors />
    case 'rings':
      return <Rings />
    default:
      return <Grain />
  }
}

/** Composes a tool story from per-tool copy, art and layout choices. */
export function StoryLayout({
  config,
  demo,
  features,
  useCases,
}: { config: StoryConfig; demo: ReactNode } & Pick<StoryProps, 'features' | 'useCases'>) {
  const { problem, walk, uses, facts, backdrop, order = 'walk-first' } = config
  const Features = FEATURES[config.features.layout]
  const UseCases = USE_CASES[uses.layout]
  const bg = (at: StoryConfig['backdrop']['at']) =>
    backdrop.at === at ? <BackdropLayer kind={backdrop.kind} /> : undefined
  const walkIndex = order === 'walk-first' ? '02' : '03'
  const featureIndex = order === 'walk-first' ? '03' : '02'
  const framed = problem.compare === 'wipe' && !problem.bleed

  const walkthrough = (
    <PinnedWalkthrough
      index={walkIndex}
      title={walk.title}
      em={walk.em}
      steps={walk.steps}
      flip={walk.flip}
    >
      {demo}
    </PinnedWalkthrough>
  )
  const featureChapter = (
    <Chapter label="Features" bg={bg('features')} wide={config.features.layout === 'reel'}>
      <ChapterHead
        index={featureIndex}
        eyebrow="Features"
        title={config.features.title}
        em={config.features.em}
      />
      <Features
        features={features}
        details={config.features.details}
        visuals={config.features.visuals}
        className={config.features.layout === 'reel' ? 'mt-10' : 'mt-14'}
      />
    </Chapter>
  )

  return (
    <StoryShell>
      <Chapter label="The problem" bg={bg('problem')}>
        <KineticStatement
          variant={problem.variant}
          eyebrow="01 · The problem"
          text={problem.text}
          accent={problem.accent}
        />
        <BeforeAfter
          variant={problem.compare}
          className="mt-16"
          height={problem.height}
          beforeLabel={problem.beforeLabel}
          afterLabel={problem.afterLabel}
          before={
            framed ? (
              <div className="flex h-full items-center justify-center overflow-hidden px-8 pb-8 pt-16 md:px-12 *:max-w-full">
                {problem.before}
              </div>
            ) : (
              problem.before
            )
          }
          after={
            framed ? (
              <div className="flex h-full items-center justify-center overflow-hidden bg-elevated px-8 pb-8 pt-16 md:px-12 *:max-w-full">
                {problem.after}
              </div>
            ) : (
              problem.after
            )
          }
        />
      </Chapter>

      {order === 'walk-first' ? walkthrough : featureChapter}
      {order === 'walk-first' ? featureChapter : walkthrough}

      <Chapter label="Use cases" bg={bg('uses')}>
        <ChapterHead
          index="04"
          eyebrow="Use cases"
          title={uses.title}
          em={uses.em}
          align={uses.center ? 'center' : 'left'}
        />
        <UseCases items={useCases} className="mt-16" />
        <FactStrip facts={facts} className="mt-24" />
      </Chapter>
    </StoryShell>
  )
}
