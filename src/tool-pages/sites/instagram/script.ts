import type { Fact, WalkStep } from '@/components/tool/story'

export const DURATION = 24
export const SEEK = { from: 0.12, to: 0.58 }
export const SPEEDS = ['0.75', '1', '1.25', '1.5', '2']
export const SPEED = '1.5'
export const FILE = `instagram-${Date.UTC(2026, 9, 24, 9, 0, 0)}.mp4`
/** Seek bar, Picture-in-Picture and the download button are on by default. */
export const DEFAULT_ACTIVE = 3

export const CAPTION = 'New drop today'

/** The extension's toUnicodeBold: Mathematical Sans-Serif Bold letters and digits. */
export function toUnicodeBold(text: string): string {
  let out = ''
  for (const char of text) {
    const code = char.codePointAt(0) ?? 0
    if (code >= 0x41 && code <= 0x5a) out += String.fromCodePoint(0x1d5d4 + code - 0x41)
    else if (code >= 0x61 && code <= 0x7a) out += String.fromCodePoint(0x1d5ee + code - 0x61)
    else if (code >= 0x30 && code <= 0x39) out += String.fromCodePoint(0x1d7ce + code - 0x30)
    else out += char
  }
  return out
}

export const BOLD = toUnicodeBold(CAPTION)

export const time = (ratio: number) => {
  const total = Math.floor(ratio * DURATION)
  return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, '0')}`
}

export const STEPS: WalkStep[] = [
  {
    title: 'Scrub any reel',
    body: 'A thin seek bar with the time appears on every video. Drag it, or use the arrow keys to jump 5 seconds.',
  },
  {
    title: 'Set a playback speed',
    body: 'Keep every video at 0.75× to 2×; a small chip shows the speed you picked.',
  },
  {
    title: 'Download the video',
    body: 'The download button saves the video file straight to your Downloads folder.',
  },
  {
    title: 'Style the caption',
    body: 'Turn caption text into Unicode bold or italic, or keep the blank lines Instagram usually collapses.',
  },
]

export const CAPTIONS = STEPS.map((step) => step.title)

export const DETAILS = [
  'Seek bar, speed from 0.75× to 2× and a Picture-in-Picture button on every video.',
  'A download button in the corner of each video saves it as an MP4.',
  'Fix line breaks, Bold Unicode and Italic Unicode, with one-click copy.',
  'Opt in to block the “seen” beacons stories send, without hiding anything.',
]

export const FACTS: Fact[] = [
  { value: String(SPEEDS.length), label: 'Playback speeds, 0.75× to 2×' },
  { value: '5 s', label: 'Jump per arrow-key press on the seek bar' },
  { value: '3', label: 'Caption styles: spacing, bold, italic' },
  { value: '1', label: 'Click to download a video' },
]
