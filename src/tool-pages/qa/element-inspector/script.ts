import type { Fact, WalkStep } from '@/components/tool/story'

/** Hover targets on the mock landing page, labelled the way the picker labels them. */
export const TARGETS = [
  { d: 'page-title', label: 'h1.hero-title' },
  { d: 'page-card', label: 'div.card' },
  { d: 'page-cta', label: 'a.btn.btn-primary' },
]

export const ATTRIBUTES = [
  ['href', '/signup'],
  ['class', 'btn btn-primary'],
  ['data-testid', 'hero-cta'],
]

/** The CTA's real styles in the mock page (px-3 py-1.5, 9.5px, white on #7c3aed), limited to properties the inspector reports. */
export const STYLES = [
  ['background-color', 'rgb(124, 58, 237)'],
  ['color', 'rgb(255, 255, 255)'],
  ['padding', '6px 12px'],
  ['font-size', '9.5px'],
  ['display', 'inline'],
]

export const STEPS: WalkStep[] = [
  { title: 'Start the picker', body: 'One click arms a crosshair on the page you are looking at.' },
  {
    title: 'Hover anything',
    body: 'An outline and a tag label follow the element under the pointer.',
  },
  {
    title: 'Click to inspect',
    body: 'Tag, classes and the exact box size land in the side panel.',
  },
  {
    title: 'Read the styles',
    body: 'Attributes and computed styles, each section one click from your clipboard.',
  },
]

export const CAPTIONS = STEPS.map((step) => step.title)

export const DETAILS = [
  'Outline and label follow the pointer, click to capture.',
  'Tag, id, classes and every attribute.',
  'The values the browser actually applied.',
  'Width, height and position in pixels.',
]

export const FACTS: Fact[] = [
  { value: '4', label: 'Box values per element: width, height, x and y' },
  { value: '1 click', label: 'To copy any section as text or JSON' },
  { value: '0', label: 'DevTools panels to open' },
  { value: 'Local', label: 'The picked element stays in this browser session' },
]
