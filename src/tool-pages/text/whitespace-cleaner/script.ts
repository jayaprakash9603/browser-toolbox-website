import type { Fact, WalkStep } from '@/components/tool/story'

export type Token = string | { ws: 'lead' | 'trail' | 'dup' | 'tab'; n: number }
export type Line = Token[] | 'blank'

export const LINES: Line[] = [
  [
    { ws: 'lead', n: 4 },
    'Quarterly',
    ' ',
    'results',
    { ws: 'dup', n: 3 },
    'draft',
    { ws: 'trail', n: 3 },
  ],
  'blank',
  'blank',
  [
    { ws: 'tab', n: 2 },
    'Revenue',
    ' ',
    'grew',
    { ws: 'dup', n: 2 },
    '12%',
    ' ',
    'year',
    ' ',
    'on',
    ' ',
    'year.',
    { ws: 'trail', n: 2 },
  ],
  'blank',
  [
    { ws: 'lead', n: 2 },
    'Costs',
    { ws: 'dup', n: 4 },
    'stayed',
    ' ',
    'flat.',
    { ws: 'trail', n: 4 },
  ],
]

/** Characters the three passes remove: edge whitespace, extra spaces and the blank lines' breaks. */
export const REMOVED = LINES.reduce((total, line) => {
  if (line === 'blank') return total + 1
  return (
    total +
    line.reduce(
      (sum, token) =>
        typeof token === 'string' ? sum : sum + (token.ws === 'dup' ? token.n - 1 : token.n),
      0,
    )
  )
}, 0)

export const STEPS: WalkStep[] = [
  {
    title: 'Paste the mess',
    body: 'Text from PDFs, emails and spreadsheets carries invisible spaces, tabs and empty lines.',
  },
  {
    title: 'Trim every line',
    body: 'Leading and trailing whitespace is swept off each line in one pass.',
  },
  {
    title: 'Collapse runs of spaces',
    body: 'Double and triple spaces between words shrink to a single one.',
  },
  {
    title: 'Drop blank lines',
    body: 'Empty lines disappear and line endings are normalised, ready to paste or import.',
  },
]

export const CAPTIONS = STEPS.map((step) => step.title)

export const DETAILS = [
  'Strip spaces and tabs from the start and end of every line.',
  'Turn runs of spaces into one.',
  'Remove empty lines so paragraphs sit together.',
  'Convert Windows and old Mac line endings to plain newlines.',
]

export const FACTS: Fact[] = [
  { value: '4', label: 'Cleaning passes you can combine' },
  { value: String(REMOVED), label: 'Invisible characters removed from the demo text' },
  { value: 'Local', label: 'Text never leaves the panel' },
  { value: '1 click', label: 'To copy the clean result' },
]
