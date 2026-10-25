import type { Fact, WalkStep } from '@/components/tool/story'

export const ORIGINAL = [
  'port: 3000',
  'host: localhost',
  'debug: true',
  'cache: memory',
  'timeout: 30',
  'retries: 2',
]
export const CHANGED = [
  'port: 8080',
  'host: localhost',
  'debug: false',
  'cache: memory',
  'timeout: 30',
  'retries: 2',
  'log: json',
]

export const REMOVED = ORIGINAL.filter((line) => !CHANGED.includes(line))
export const ADDED = CHANGED.filter((line) => !ORIGINAL.includes(line))

export const STEPS: WalkStep[] = [
  {
    title: 'Paste the original',
    body: 'The first version goes on the left: a config, a contract, a paragraph of copy.',
  },
  {
    title: 'Paste the new version',
    body: 'The edited text goes on the right, side by side with the original.',
  },
  {
    title: 'Compare',
    body: 'Every line is checked. Removed lines turn red, added lines turn green.',
  },
  {
    title: 'Read the summary',
    body: 'A count of additions and removals tells you how big the change really is.',
  },
]

export const CAPTIONS = STEPS.map((step) => step.title)

export const DETAILS = [
  'Original and changed text next to each other.',
  'Removed lines in red, added lines in green.',
  'Changes are compared line by line, like a code review.',
]

export const FACTS: Fact[] = [
  { value: `+${ADDED.length}`, label: 'Lines added in the demo config' },
  { value: `−${REMOVED.length}`, label: 'Lines removed' },
  { value: 'Line', label: 'Level comparison, like a code review' },
  { value: 'Local', label: 'Both texts stay in the panel' },
]
