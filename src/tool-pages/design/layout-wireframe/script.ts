import type { Fact, WalkStep } from '@/components/tool/story'

/** The two rules the extension injects into the page. */
export const OUTLINE = 'rgba(255, 0, 0, 0.25)'
export const HOVER = 'rgba(0, 128, 255, 0.55)'
export const CSS = `* { outline: 1px solid ${OUTLINE} !important; }\n*:hover { outline: 1px solid ${HOVER} !important; }`

export const STEPS: WalkStep[] = [
  {
    title: 'Switch it on',
    body: 'One toggle outlines every element on the page, without touching the layout.',
  },
  { title: 'Every box, visible', body: 'Margins, gaps and nesting show up as thin red lines.' },
  {
    title: 'Hover to isolate',
    body: 'Whatever is under the cursor turns blue, so you can follow one box at a time.',
  },
  { title: 'Catch the overflow', body: 'The element that pushes past the edge gives itself away.' },
]

export const CAPTIONS = STEPS.map((step) => step.title)

export const DETAILS = [
  'A 1px outline on every element, so layout boxes appear without shifting anything.',
  'Switch it off and the injected style is removed again.',
  'The element under the cursor gets a blue outline.',
]

export const FACTS: Fact[] = [
  { value: '2', label: 'CSS rules injected' },
  { value: '1px', label: 'Outline width, which never shifts layout' },
  { value: '0', label: 'Changes to the page’s own styles' },
  { value: '1', label: 'Toggle to switch it off again' },
]
