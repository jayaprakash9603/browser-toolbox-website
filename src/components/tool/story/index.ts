export { ChapterHead } from './Chapter'
export { PinnedWalkthrough, type WalkStep } from './PinnedWalkthrough'
export { StoryShell } from './StoryShell'

/** A short, verifiable fact: a value computed from the tool's real logic, never an invented metric. */
export interface Fact {
  value: string
  label: string
}

/** Props every tool `Story` receives from the page. */
export interface StoryProps {
  name: string
  tagline: string
  features: string[]
  useCases: string[]
}
