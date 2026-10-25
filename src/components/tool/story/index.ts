export { BeforeAfter } from './BeforeAfter'
export { Chapter, ChapterHead } from './Chapter'
export { FactStrip, type Fact } from './FactStrip'
export {
  FeatureBento,
  FeatureGrid,
  FeatureOrbit,
  FeatureReel,
  FeatureStack,
  FeatureTicker,
  type FeatureProps,
} from './features'
export { KineticStatement, type KineticVariant } from './KineticStatement'
export { PinnedWalkthrough, type WalkStep } from './PinnedWalkthrough'
export { StoryShell } from './StoryShell'
export { StoryLayout, type Backdrop, type StoryConfig } from './StoryLayout'
export { UseCaseFan, UseCaseMarquee, UseCaseQuotes, UseCaseTilt, UseCaseTimeline } from './usecases'

/** Props every tool `Story` receives from the page. */
export interface StoryProps {
  name: string
  tagline: string
  features: string[]
  useCases: string[]
}
