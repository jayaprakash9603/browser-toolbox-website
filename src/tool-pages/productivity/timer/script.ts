import type { Fact, WalkStep } from '@/components/tool/story'

export const PRESETS = [1, 5, 10, 15, 25, 30, 45, 60]
export const PICKED = PRESETS.indexOf(25)
export const LABEL = 'Write the release notes'

export function formatClock(ms: number): string {
  const total = Math.max(0, Math.ceil(ms / 1000))
  const hours = Math.floor(total / 3600)
  const minutes = Math.floor((total % 3600) / 60)
  const seconds = total % 60
  return [hours, minutes, seconds].map((part) => String(part).padStart(2, '0')).join(':')
}

export const COUNTDOWN_MS = PRESETS[PICKED] * 60_000
export const TICK = 3

const clock = (minutes: number) => {
  const hours = 9 + Math.floor(minutes / 60)
  return `${hours}:${String(minutes % 60).padStart(2, '0')} AM`
}
export const STARTED_AT = 0
export const COUNTDOWN_NOTICE = {
  time: clock(STARTED_AT + PRESETS[PICKED]),
  title: "Time's up",
  message: `${LABEL} finished.`,
}

export const POMODORO = { workMin: 25, shortBreakMin: 5, longBreakMin: 15, roundsPerSet: 4 }
export const PHASES = ['Focus', 'Short break', 'Long break']
const POMO_START = STARTED_AT + PRESETS[PICKED] + 1
export const POMODORO_NOTICE = {
  time: clock(POMO_START + POMODORO.workMin),
  title: 'Focus finished',
  message: `Short break started (${POMODORO.shortBreakMin} min).`,
}

type Phase = 'work' | 'break' | 'longBreak'
function cycle(rounds: number) {
  const out: Phase[] = []
  let phase: Phase = 'work'
  let round = 1
  while (out.length < rounds * 2) {
    out.push(phase)
    if (phase === 'work') phase = round >= rounds ? 'longBreak' : 'break'
    else if (phase === 'break') {
      phase = 'work'
      round += 1
    } else break
  }
  return out
}
const minutesOf = {
  work: POMODORO.workMin,
  break: POMODORO.shortBreakMin,
  longBreak: POMODORO.longBreakMin,
}
export const SET_MINUTES = cycle(POMODORO.roundsPerSet).reduce(
  (sum, phase) => sum + minutesOf[phase],
  0,
)
const setLabel = `${Math.floor(SET_MINUTES / 60)} h ${SET_MINUTES % 60} min`

export const STEPS: WalkStep[] = [
  {
    title: 'Pick a length',
    body: 'Eight quick times or any length up to 23:59:59, with a label so you know what it was for.',
  },
  {
    title: 'Close the panel',
    body: 'The timer lives in the background. When it ends, a card appears on the page you are on, plus a system notification.',
  },
  {
    title: 'Or run focus rounds',
    body: `Pomodoro moves from focus to break by itself: ${POMODORO.roundsPerSet} rounds and a long break come to ${setLabel}.`,
  },
]

export const CAPTIONS = STEPS.map((step) => step.title)

export const DETAILS = [
  `Presets from ${PRESETS[0]} to ${PRESETS[PRESETS.length - 1]} minutes, or set hours, minutes and seconds yourself.`,
  'Start, pause and lap, with split and total times for the last 20 laps.',
  `Focus, short and long breaks you can resize, ${POMODORO.roundsPerSet} rounds by default, and an optional automatic hand-off.`,
  'Close the panel or switch tabs: the end still lands as a card on the page and a notification.',
]

export const FACTS: Fact[] = [
  { value: String(PRESETS.length), label: 'Quick times, from 1 minute to an hour' },
  { value: '20', label: 'Laps kept on the stopwatch' },
  { value: String(SET_MINUTES), label: 'Minutes in a default Pomodoro set' },
  { value: '3', label: 'Timers: countdown, stopwatch and Pomodoro' },
]
