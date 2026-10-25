import type { Fact, WalkStep } from '@/components/tool/story'

export const LIST = [
  'mia@acme.io',
  'leo@acme.io',
  'ava@acme.io',
  'mia@acme.io',
  'zoe@acme.io',
  'ben@acme.io',
  'leo@acme.io',
  'kai@acme.io',
]

/** Index of the first occurrence for duplicates, or -1 for unique rows. */
export const DUPLICATE_OF = LIST.map((item, index) => {
  const first = LIST.indexOf(item)
  return first === index ? -1 : first
})

export const UNIQUE = LIST.map((_, index) => index).filter((index) => DUPLICATE_OF[index] === -1)
export const SORTED = [...UNIQUE].sort((a, b) => LIST[a].localeCompare(LIST[b]))
export const SHUFFLED = [SORTED[2], SORTED[4], SORTED[0], SORTED[5], SORTED[1], SORTED[3]]

export const STEPS: WalkStep[] = [
  { title: 'Paste a list', body: 'Emails, IDs, keywords or test inputs, one per line.' },
  {
    title: 'Dedupe',
    body: 'Repeated lines merge into the first one, so every entry appears once.',
  },
  {
    title: 'Sort A–Z',
    body: 'Alphabetical in either direction, with every line moving to its new place.',
  },
  {
    title: 'Shuffle and number',
    body: 'Randomise the order for fair test runs, then number the lines for reference.',
  },
]

export const CAPTIONS = STEPS.map((step) => step.title)

export const DETAILS = [
  'Keep the first copy of every line and drop the rest.',
  'Alphabetical, ascending or descending.',
  'Flip the list upside down.',
  'A fresh random order every time.',
  'Prefix each line with its position.',
  'Delete empty lines in one go.',
]

export const FACTS: Fact[] = [
  { value: '6', label: 'List operations, combinable in any order' },
  { value: `${LIST.length} → ${UNIQUE.length}`, label: 'Lines in the demo list after deduping' },
  { value: 'Local', label: 'Lists never leave the panel' },
  { value: '1 click', label: 'Per operation' },
]
