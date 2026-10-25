import type { Fact, WalkStep } from '@/components/tool/story'

export const LOREM_PARAGRAPHS = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.',
  'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.',
  'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla.',
]

export const LOREM_WORDS =
  'lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna'

export const RANDOM_SENTENCES = [
  'The river kept its own schedule.',
  'Six maps were folded into one drawer.',
  'Nobody noticed the quiet clock.',
  'A green kite circled the harbour twice.',
]

export const STEPS: WalkStep[] = [
  {
    title: 'Paragraphs on demand',
    body: 'Choose how many paragraphs you need and generate them in one click.',
  },
  {
    title: 'Or just words',
    body: 'Switch to words or sentences for labels, buttons and tight spaces.',
  },
  {
    title: 'Lorem or real-looking',
    body: 'Turn off lorem ipsum to get random English that reads more like real copy.',
  },
  { title: 'Copy and paste', body: 'Copy the result straight into your design, template or test.' },
]

export const CAPTIONS = STEPS.map((step) => step.title)

export const DETAILS = [
  'Blocks of filler for articles and cards.',
  'Single lines for captions and list items.',
  'Exact word counts for labels and buttons.',
  'Classic lorem ipsum, or random English sentences.',
]

export const FACTS: Fact[] = [
  { value: '3', label: 'Units: paragraphs, sentences or words' },
  { value: '2', label: 'Styles: lorem ipsum or random text' },
  { value: 'Local', label: 'Generated in the panel' },
  { value: '1 click', label: 'To copy the result' },
]
