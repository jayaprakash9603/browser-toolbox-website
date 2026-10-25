import type { Fact, WalkStep } from '@/components/tool/story'

export const JS_MIN =
  'const total=(items)=>{let s=0;for(const i of items){s+=i.price*i.qty}return s.toFixed(2)}'

export const JS_FMT = `const total = (items) => {
  let s = 0
  for (const i of items) {
    s += i.price * i.qty
  }
  return s.toFixed(2)
}`

export const CSS_MIN = '.card{padding:16px;border-radius:12px;box-shadow:0 4px 12px #0003}'

export const CSS_FMT = `.card {
  padding: 16px;
  border-radius: 12px;
  box-shadow: 0 4px 12px #0003;
}`

export const SAVED = Math.round((1 - CSS_MIN.length / CSS_FMT.length) * 100)

export const STEPS: WalkStep[] = [
  {
    title: 'Paste anything',
    body: 'Drop in a minified bundle or a messy snippet. The language is detected for you.',
  },
  {
    title: 'Format in one keystroke',
    body: 'Indentation, spacing and line breaks are rebuilt so the structure reads at a glance.',
  },
  {
    title: 'It keeps detecting',
    body: 'Paste CSS, HTML or Markdown next and the formatter switches rules on its own.',
  },
  {
    title: 'Minify when you ship',
    body: 'Collapse it back to one line and see how much smaller it got.',
  },
]

export const CAPTIONS = STEPS.map((step) => step.title)

export const DETAILS = [
  'Modern syntax, arrow functions and types included.',
  'Nested markup indented the way you would by hand.',
  'One declaration per line, consistent spacing.',
  'Lists, headings and tables tidied up.',
  'No dropdown to pick from: it reads the code first.',
  'Strip whitespace and comments for production.',
]

export const FACTS: Fact[] = [
  { value: '4', label: 'Language families: JS/TS, HTML/XML, CSS and Markdown' },
  { value: 'Auto', label: 'Language detection on paste' },
  { value: `−${SAVED}%`, label: 'Size of the CSS sample after minifying, measured in characters' },
  { value: 'Local', label: 'Code is formatted in the panel, never uploaded' },
]
