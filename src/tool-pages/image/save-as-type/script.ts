import type { Fact, WalkStep } from '@/components/tool/story'

export const FORMATS = ['JPG', 'PNG', 'WebP', 'GIF', 'PDF']
export const QUALITY = 92
export const PAGE_TITLE = 'Alpine lake at dawn'

/** The extension's suggestFilename: the tab title wins, with unsafe characters dropped and spaces as dashes. */
export function suggestFilename(format: string, pageTitle: string): string {
  const base = pageTitle
    .trim()
    .replace(/[<>:"/\\|?*\x00-\x1f]/g, '')
    .replace(/\s+/g, '-')
    .slice(0, 80)
    .replace(/\.+$/g, '')
  return `${base}.${format.toLowerCase()}`
}

export const PICKS = [
  { format: 'PNG', color: '#38bdf8', file: suggestFilename('PNG', PAGE_TITLE) },
  { format: 'PDF', color: '#f43f5e', file: suggestFilename('PDF', PAGE_TITLE) },
]

export const STEPS: WalkStep[] = [
  {
    title: 'Right-click any image',
    body: 'A Save image as menu joins Chrome’s right-click menu on every image.',
  },
  {
    title: 'Pick a format',
    body: 'The image is converted in your browser and lands in Downloads, named after the page.',
  },
  {
    title: 'Or save it as a PDF',
    body: 'PDF wraps the image in a one-page document, ready to attach or print.',
  },
]

export const CAPTIONS = STEPS.map((step) => step.title)

export const DETAILS = [
  `Lossy JPG at the quality you set, ${QUALITY}% by default.`,
  'Lossless PNG for screenshots, logos and anything with transparency.',
  'WebP at the same quality setting, often smaller than JPG.',
  'GIF for tools that accept nothing else.',
  'A single-page PDF with the image inside.',
  'Conversion runs in Chrome; images are never uploaded.',
]

export const FACTS: Fact[] = [
  { value: String(FORMATS.length), label: 'Formats in the right-click menu' },
  { value: `${QUALITY}%`, label: 'Default JPG and WebP quality' },
  { value: '2', label: 'Clicks from image to file' },
  { value: '0', label: 'Uploads' },
]
