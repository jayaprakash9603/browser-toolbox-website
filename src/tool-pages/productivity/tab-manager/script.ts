import type { Fact, WalkStep } from '@/components/tool/story'

export type Tab = {
  id: number
  title: string
  url: string
  active?: boolean
  pinned?: boolean
  audible?: boolean
  color: string
}

export const TABS: Tab[] = [
  {
    id: 1,
    title: 'Inbox (3) – Northwind Mail',
    url: 'https://mail.northwind.dev/inbox',
    pinned: true,
    color: '#2563eb',
  },
  {
    id: 2,
    title: 'Q3 planning – Docs',
    url: 'https://docs.northwind.dev/q3-planning',
    active: true,
    color: '#0ea5e9',
  },
  {
    id: 3,
    title: 'Q3 planning – Docs',
    url: 'https://docs.northwind.dev/q3-planning#budget',
    color: '#0ea5e9',
  },
  {
    id: 4,
    title: 'Invoice #1042 – Billing',
    url: 'https://billing.northwind.dev/invoices/1042',
    color: '#16a34a',
  },
  {
    id: 5,
    title: 'Lo-fi beats to focus to – YouTube',
    url: 'https://www.youtube.com/watch?v=jfKfPfyJRdk',
    audible: true,
    color: '#dc2626',
  },
  {
    id: 6,
    title: 'Invoice #1042 – Billing',
    url: 'https://billing.northwind.dev/invoices/1042',
    color: '#16a34a',
  },
  { id: 7, title: 'Pricing – Northwind', url: 'https://northwind.dev/pricing', color: '#7c3aed' },
  {
    id: 8,
    title: 'Q3 planning – Docs',
    url: 'https://docs.northwind.dev/q3-planning',
    color: '#0ea5e9',
  },
  {
    id: 9,
    title: 'Invoices – Billing',
    url: 'https://billing.northwind.dev/invoices',
    color: '#16a34a',
  },
]

export function domainOf(url: string): string {
  return new URL(url).hostname.replace(/^www\./, '')
}
export function pathOf(url: string): string {
  const parsed = new URL(url)
  const rest = `${parsed.pathname}${parsed.search}`
  return rest === '/' ? '' : decodeURI(rest)
}

function duplicateIds(tabs: Tab[]): Set<number> {
  const seen = new Set<string>()
  const dupes = new Set<number>()
  const ordered = [...tabs].sort(
    (a, b) => Number(Boolean(b.active)) - Number(Boolean(a.active)) || a.id - b.id,
  )
  for (const tab of ordered) {
    const key = tab.url.replace(/#.*$/, '')
    if (seen.has(key)) dupes.add(tab.id)
    else seen.add(key)
  }
  return dupes
}

function matchesQuery(tab: Tab, query: string): boolean {
  const q = query.trim().toLowerCase()
  if (!q) return true
  return q
    .split(/\s+/)
    .every((part) => tab.title.toLowerCase().includes(part) || tab.url.toLowerCase().includes(part))
}

export const DUPES = duplicateIds(TABS)
export const QUERY = 'invoice'
export const MATCHES = new Set(TABS.filter((tab) => matchesQuery(tab, QUERY)).map((tab) => tab.id))
export const KEPT = TABS.filter((tab) => !DUPES.has(tab.id))

export const FILTERS = [
  { id: 'all', label: 'All', count: TABS.length, after: KEPT.length },
  { id: 'window', label: 'This window', count: TABS.length, after: KEPT.length },
  {
    id: 'pinned',
    label: 'Pinned',
    count: TABS.filter((tab) => tab.pinned).length,
    after: KEPT.filter((tab) => tab.pinned).length,
  },
  {
    id: 'audio',
    label: 'Audio',
    count: TABS.filter((tab) => tab.audible).length,
    after: KEPT.filter((tab) => tab.audible).length,
  },
  { id: 'duplicates', label: 'Duplicates', count: DUPES.size, after: 0 },
]

export const MARKDOWN = KEPT.map(
  (tab) => `- [${tab.title.replace(/([[\]])/g, '\\$1')}](${tab.url})`,
).join('\n')

export const SUMMARY = `${TABS.length} tabs in 1 window(s) · ${DUPES.size} duplicates`
export const CLOSED = `Closed ${DUPES.size} tabs`
export const COPIED = `Copied ${KEPT.length} URLs.`

export const COPY_FORMATS = ['URL list', 'Markdown links', 'Titles and URLs', 'CSV']
export const PICKED_COPY = COPY_FORMATS.indexOf('Markdown links')

export const STEPS: WalkStep[] = [
  {
    title: 'Find any tab',
    body: 'Search every window by title or URL. Each word narrows the list, and a click jumps to the tab.',
  },
  {
    title: 'Close the duplicates',
    body: 'Copies of the same page, even with a different #section, are flagged and closed in one go, with undo.',
  },
  {
    title: 'Keep the session',
    body: 'Copy what is left as Markdown links, URLs or CSV, or export a bookmarks file.',
  },
]

export const CAPTIONS = STEPS.map((step) => step.title)

export const DETAILS = [
  'Every window in one list. Words match titles and URLs, and filters show pinned, audio, duplicate and sleeping tabs.',
  'Group by window or by site, pin from the list, and select many to move to a new window.',
  'Mute noisy tabs and put inactive ones to sleep to free memory.',
  'Duplicates ignore the #fragment and keep the first copy. Closing comes with undo.',
  'Copy as URLs, Markdown, titles or CSV. Export text, CSV, JSON or a bookmarks file.',
]

export const FACTS: Fact[] = [
  { value: '5', label: 'Filters, from pinned to sleeping' },
  { value: String(COPY_FORMATS.length), label: 'Copy formats' },
  { value: '4', label: 'Export formats, including bookmarks' },
  { value: '4', label: 'Sort orders: tab order, recent, title, website' },
]
