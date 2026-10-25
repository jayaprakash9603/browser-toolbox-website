import type { Fact, WalkStep } from '@/components/tool/story'

export const PATTERN = '(\\w+)@(\\w+)\\.com'
export const REPLACEMENT = '$1 at $2'

/** Sample text as segments: plain strings or matches with their two groups. */
export type Segment = string | { user: string; domain: string }

export const SAMPLE: Segment[][] = [
  ['Contact ', { user: 'ada', domain: 'acme' }, ' or ', { user: 'leo', domain: 'globex' }, '.'],
  ['Old: mia@acme.org (no match)'],
  ['Support: ', { user: 'help', domain: 'initech' }],
]

export const MATCHES = SAMPLE.flat().filter(
  (segment): segment is { user: string; domain: string } => typeof segment !== 'string',
)

export const STEPS: WalkStep[] = [
  {
    title: 'Write the pattern',
    body: 'As you type, the expression is drawn as a diagram so you can see what it will accept.',
  },
  {
    title: 'Matches light up',
    body: 'Every match in the sample text is highlighted, with a live count.',
  },
  {
    title: 'Read the groups',
    body: 'Capture groups get their own colour and a table of what each one caught.',
  },
  {
    title: 'Preview the replace',
    body: 'Use $1 and $2 in a replacement and see the result before you run it.',
  },
]

export const CAPTIONS = STEPS.map((step) => step.title)

export const DETAILS = [
  'Matches update with every keystroke.',
  'See exactly what each group captured.',
  'Try a replacement with back-references.',
  'Start from common patterns: emails, URLs, dates.',
  'Global, ignore case, multiline and dot-all.',
]

export const FACTS: Fact[] = [
  { value: String(MATCHES.length), label: 'Matches in the demo sample' },
  { value: '2', label: 'Capture groups, coloured separately' },
  { value: 'JS', label: 'The browser’s own regex engine, so results match your code' },
  { value: 'Local', label: 'Patterns and text stay in the panel' },
]
