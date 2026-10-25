import type { Fact, WalkStep } from '@/components/tool/story'

export const SOURCES = ['This tab', 'Window', 'Full screen']
export const COUNTDOWN = 3
export const ELAPSED = 14
export const NAME = 'Recording 2026-10-24 09-00-00'
/** Chrome records MP4 when MediaRecorder supports it and falls back to WebM. */
export const EXT = 'MP4'

export const duration = (seconds: number) =>
  `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`

export const STEPS: WalkStep[] = [
  {
    title: 'Pick a source',
    body: 'Record this tab, a window or the full screen, with tab audio, your microphone and 720p or 1080p.',
  },
  {
    title: 'Count in and record',
    body: 'A 3-2-1 countdown, then a small pill with the timer, Pause and Stop sits on the page while you work.',
  },
  {
    title: 'Review and download',
    body: 'Stopping opens the recording in a viewer where you can rename it, copy a frame or download the file.',
  },
]

export const CAPTIONS = STEPS.map((step) => step.title)

export const DETAILS = [
  'Record the current tab directly, or a window or the whole screen through Chrome’s share picker.',
  'Add your microphone and tab or system audio when Chrome offers it.',
  'Saves MP4 when your browser can record it, WebM otherwise.',
  'Recordings stay in a library on this device until you download or delete them.',
]

export const FACTS: Fact[] = [
  { value: String(SOURCES.length), label: 'Sources: tab, window, full screen' },
  { value: `${COUNTDOWN} s`, label: 'Optional countdown before recording' },
  { value: '1080p', label: 'Top quality setting, or 720p' },
  { value: '0', label: 'Uploads: recordings stay on this device' },
]
