import type { Fact, WalkStep } from '@/components/tool/story'

export const TEXT_LINES = [
  'Good documentation answers the question before it is asked.',
  'It shows a working example first, then explains the parts.',
  'Short sentences help.',
  'So do headings that say what a section is for, and links to the next step.',
]

export const TEXT = TEXT_LINES.join('\n')

const words = TEXT.split(/\s+/).filter(Boolean)
const sentences = TEXT.split(/[.!?]+/).filter((part) => part.trim()).length
const syllables = words.reduce((total, word) => {
  const clean = word
    .toLowerCase()
    .replace(/[^a-z]/g, '')
    .replace(/e$/, '')
  return total + Math.max(1, clean.match(/[aeiouy]+/g)?.length ?? 1)
}, 0)

export const STATS = {
  words: words.length,
  characters: TEXT.length,
  sentences,
  seconds: Math.round((words.length / 238) * 60),
  /** Flesch reading ease, clamped to 0..100. */
  readability: Math.max(
    0,
    Math.min(
      100,
      Math.round(206.835 - 1.015 * (words.length / sentences) - 84.6 * (syllables / words.length)),
    ),
  ),
}

export const READABILITY_LABEL =
  STATS.readability >= 70 ? 'Easy' : STATS.readability >= 50 ? 'Fairly easy' : 'Difficult'

export const LINES = ['Longest line', 'Average line', 'Shortest line']
const lengths = TEXT_LINES.map((line) => line.length)
export const LINE_VALUES = [
  Math.max(...lengths),
  Math.round(lengths.reduce((a, b) => a + b, 0) / lengths.length),
  Math.min(...lengths),
]

export const STEPS: WalkStep[] = [
  {
    title: 'Paste or type',
    body: 'Drop in a draft, a meta description or a whole essay. Everything updates as you type.',
  },
  {
    title: 'Counts, instantly',
    body: 'Words, characters, sentences and reading time, without a word processor.',
  },
  {
    title: 'Readability score',
    body: 'A Flesch reading-ease score tells you whether the text is easy to follow.',
  },
  {
    title: 'Line metrics',
    body: 'See your longest, average and shortest lines to catch the ones that run on.',
  },
]

export const CAPTIONS = STEPS.map((step) => step.title)

export const DETAILS = [
  'With and without spaces, updated on every keystroke.',
  'Know how your text is structured.',
  'Estimated at an average adult reading speed.',
  'Flesch reading ease, from very difficult to very easy.',
  'Spot run-on lines in copy and code comments.',
]

export const FACTS: Fact[] = [
  { value: String(STATS.words), label: 'Words in the demo text, counted live' },
  { value: String(STATS.readability), label: 'Its Flesch reading-ease score' },
  { value: 'Live', label: 'Every metric updates as you type' },
  { value: 'Local', label: 'Your text stays in the panel' },
]
