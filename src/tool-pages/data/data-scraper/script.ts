import type { Fact, WalkStep } from '@/components/tool/story'

export const PAGE_ONE = [
  { name: 'Aero Lamp', price: '$89' },
  { name: 'Linen Chair', price: '$240' },
  { name: 'Oak Desk', price: '$410' },
  { name: 'Glass Vase', price: '$36' },
  { name: 'Wool Throw', price: '$64' },
  { name: 'Clay Mug', price: '$18' },
]

export const PAGE_TWO = [
  { name: 'Arc Lamp', price: '$129' },
  { name: 'Cane Stool', price: '$75' },
  { name: 'Ash Shelf', price: '$180' },
  { name: 'Stone Bowl', price: '$42' },
  { name: 'Jute Rug', price: '$150' },
  { name: 'Tin Tray', price: '$22' },
]

export const ROW_SELECTOR = 'div.grid > div.card'
export const NEXT_SELECTOR = 'a.pager-next'
export const HOST = 'shop.northwind.app'

export const EXPORTS = ['CSV', 'XLSX', 'Copy TSV', 'JSON']

export const STEPS: WalkStep[] = [
  {
    title: 'Auto-detect the grid',
    body: 'The repeating cards are found for you, with a row selector and sample columns.',
  },
  {
    title: 'Rows fill the table',
    body: 'Each card becomes a row, previewed before you export anything.',
  },
  {
    title: 'Crawl the next pages',
    body: 'Point at the Next link and the crawl clicks through, pausing between pages.',
  },
  {
    title: 'Export the sheet',
    body: 'CSV, Excel, JSON or tab-separated text for pasting into a sheet.',
  },
]

export const CAPTIONS = STEPS.map((step) => step.title)

export const DETAILS = [
  'Finds repeating tables, lists and card grids.',
  'Pick rows and columns yourself when detection guesses wrong.',
  'Click-next or infinite scroll, with delays between pages.',
  'XLSX built in the browser, no upload.',
]

export const FACTS: Fact[] = [
  { value: String(PAGE_ONE.length + PAGE_TWO.length), label: 'Rows from two pages in this demo' },
  { value: '50', label: 'Pages per crawl by default' },
  { value: '1.5 s', label: 'Minimum pause between pages by default' },
  { value: String(EXPORTS.length), label: 'Ways out: CSV, XLSX, JSON and Copy TSV' },
]
