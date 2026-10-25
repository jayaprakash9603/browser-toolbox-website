import type { Fact, WalkStep } from '@/components/tool/story'

export const RAW = 'https://shop.example.com/products?id=42&color=red&utm_source=newsletter#reviews'
const url = new URL(RAW)

/** The URL split the way it reads, so each piece can travel to its labelled cell. */
export const SEGMENTS = [
  { text: 'https', part: 'protocol' },
  { text: '://', part: null },
  { text: url.host, part: 'host' },
  { text: url.pathname, part: 'path' },
  { text: url.search, part: null },
  { text: url.hash, part: 'fragment' },
] as const

export const PARTS = [
  { key: 'protocol', label: 'Protocol', value: url.protocol.replace(':', '') },
  { key: 'host', label: 'Host', value: url.host },
  { key: 'port', label: 'Port', value: url.port || '—' },
  { key: 'path', label: 'Path', value: url.pathname },
  { key: 'fragment', label: 'Fragment', value: url.hash || '—' },
]

export const PARAMS = [...url.searchParams.entries()].map(([key, value]) => ({ key, value }))
export const ADDED = { key: 'size', value: 'xl' }

const edited = new URL(RAW)
edited.searchParams.set(ADDED.key, ADDED.value)
export const EDITED = edited.toString()

/** Same rule as the extension: utm_* plus known click ids are dropped. */
const cleaned = new URL(EDITED)
export const REMOVED = [...cleaned.searchParams.keys()].filter((key) => key.startsWith('utm_'))
REMOVED.forEach((key) => cleaned.searchParams.delete(key))
export const CLEANED = cleaned.toString()

export const TRACKING = [
  'utm_*',
  'fbclid',
  'gclid',
  'dclid',
  'gbraid',
  'wbraid',
  'msclkid',
  'mc_cid',
  'mc_eid',
  'igshid',
  'spm',
  'ref_src',
]

export const STEPS: WalkStep[] = [
  { title: 'Paste a URL', body: 'Drop in any link, however long, from the address bar or a log.' },
  {
    title: 'Every part, labelled',
    body: 'Protocol, host, port, path and fragment pulled out and ready to copy.',
  },
  {
    title: 'Edit the query',
    body: 'Add or delete parameters and the URL rebuilds itself, properly encoded.',
  },
  {
    title: 'Strip the tracking',
    body: 'utm tags and click ids come off in one tab, leaving a link you can share.',
  },
]

export const CAPTIONS = STEPS.map((step) => step.title)

export const DETAILS = [
  'Read any URL piece by piece with the built-in URL parser.',
  'Each parameter as a row you can delete, plus add your own.',
  'Percent-encode or decode a value both ways.',
  `${TRACKING.length} tracking patterns removed, from utm_* to fbclid.`,
]

export const FACTS: Fact[] = [
  { value: String(PARTS.length), label: 'Labelled parts per URL' },
  { value: String(TRACKING.length), label: 'Tracking patterns the Clean tab removes' },
  {
    value: `${EDITED.length} → ${CLEANED.length}`,
    label: 'Characters in the demo link before and after cleaning',
  },
  { value: '3', label: 'Tabs: Parse, Encode and Clean' },
]
