import type { Fact, WalkStep } from '@/components/tool/story'

/** Counts from the extension's YOUTUBE_FEATURES, YOUTUBE_PRESETS and PROGRESS_THEMES; update them together. */
export const OPTION_COUNT = 92
export const SECTION_COUNT = 9
export const THEME_COUNT = 28
export const FOCUS_ACTIVE = 7

export const PRESETS = ['Recommended', 'Focus mode', 'Player power-user', 'Reset all']
export const PLAYER_ROWS = ['Loop Button', 'Video Snapshot']
export const THEMES = [
  { id: 'default', label: 'YouTube default', bar: '#ff0000' },
  { id: 'neon', label: 'Neon', bar: '#22d3ee' },
  { id: 'fire', label: 'Fire', bar: '#f97316' },
  { id: 'violet', label: 'Violet', bar: '#a855f7' },
  { id: 'mint', label: 'Mint', bar: '#6ee7b7' },
  { id: 'sunset', label: 'Sunset', bar: 'linear-gradient(90deg,#f43f5e,#f97316,#fbbf24)' },
]
export const PICKED_THEME = 1

export const RELATED = [
  { title: 'Soldering for beginners', from: '#f97316', to: '#7c2d12' },
  { title: '10 desk setups', from: '#38bdf8', to: '#1e3a8a' },
  { title: 'Cable management', from: '#a3e635', to: '#365314' },
  { title: 'Wood finishing 101', from: '#fbbf24', to: '#78350f' },
]

/** Where the sponsor segment sits on the demo video, as fractions of its length. */
export const SPONSOR = { start: 0.34, end: 0.46 }

export const STEPS: WalkStep[] = [
  {
    title: 'One click to focus',
    body: `Focus mode hides related videos, comments, Shorts and the Next button: ${FOCUS_ACTIVE} options in one go.`,
  },
  {
    title: 'Add player tools',
    body: 'Switch on a loop button and a snapshot button right in the player controls.',
  },
  {
    title: 'Restyle the progress bar',
    body: `Pick from ${THEME_COUNT} themes, or use your own colours, height and scrubber emoji.`,
  },
  {
    title: 'Skip sponsor segments',
    body: 'Opt in to SponsorBlock and the player jumps past community-marked sponsor reads.',
  },
]

export const CAPTIONS = STEPS.map((step) => step.title)

export const DETAILS = [
  'Hide the Shorts shelf, mixes, live streams, members-only videos or the whole home feed.',
  'Default speed and quality, speed hotkeys, wheel volume, loop and snapshot buttons.',
  `${THEME_COUNT} themes plus emoji or image scrubbers and your own colours.`,
  'Off by default. When on, it asks the SponsorBlock API which parts of a video to skip.',
  'Recommended, Focus mode and Player power-user set many options at once; Reset all undoes them.',
]

export const FACTS: Fact[] = [
  { value: String(OPTION_COUNT), label: 'Options to tune YouTube' },
  { value: String(SECTION_COUNT), label: 'Sections, from ads to embedded players' },
  { value: String(THEME_COUNT), label: 'Progress bar themes' },
  { value: '3', label: 'One-click presets, plus Reset all' },
]
