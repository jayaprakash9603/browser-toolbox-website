import type { Fact, WalkStep } from '@/components/tool/story'

export interface PageImage {
  name: string
  file: string
  width: number
  height: number
  /** `null` is a missing alt attribute, `''` marks a decorative image. */
  alt: string | null
}

export const IMAGES: PageImage[] = [
  {
    name: 'Aero Lamp',
    file: 'aero-lamp.webp',
    width: 1200,
    height: 1500,
    alt: 'Brass Aero Lamp on a desk',
  },
  { name: 'Linen Chair', file: 'linen-chair.jpg', width: 1600, height: 1200, alt: null },
  {
    name: 'Oak Desk',
    file: 'oak-desk.webp',
    width: 1400,
    height: 1400,
    alt: 'Oak desk with two drawers',
  },
  { name: 'Glass Vase', file: 'glass-vase.png', width: 900, height: 1200, alt: '' },
  { name: 'Wool Throw', file: 'wool-throw.jpg', width: 1600, height: 1000, alt: null },
  {
    name: 'Clay Mug',
    file: 'clay-mug.webp',
    width: 1000,
    height: 1000,
    alt: 'Hand-thrown clay mug',
  },
]

export const STATS = {
  images: IMAGES.length,
  missing: IMAGES.filter((image) => image.alt === null).length,
  withAlt: IMAGES.filter((image) => image.alt).length,
  decorative: IMAGES.filter((image) => image.alt === '').length,
}
export const COVERED = IMAGES.length - STATS.missing
export const PICKED = 0
export const MARKDOWN = `![${IMAGES[PICKED].alt}](https://cdn.northwind.app/${IMAGES[PICKED].file})`

export const SOURCES = [
  'Image tag',
  'Picture source',
  'CSS background',
  'Inline SVG',
  'Linked file',
  'Social / meta',
  'Video poster',
]
export const ACTIONS = ['Copy URL', 'Copy alt', 'Copy <img>', 'Copy Markdown', 'Download']

export const STEPS: WalkStep[] = [
  {
    title: 'Every image, lifted out',
    body: 'Images on the page peel off into one grid, with their real pixel sizes.',
  },
  {
    title: 'Alt text, audited',
    body: 'Each image is marked as described, decorative or missing alt, with a coverage score.',
  },
  {
    title: 'Filter to the gaps',
    body: 'Narrow by format, source, size or alt status and only the problems stay.',
  },
  {
    title: 'Copy what you need',
    body: 'URL, alt text, an <img> tag or Markdown, or download the file itself.',
  },
]

export const CAPTIONS = STEPS.map((step) => step.title)

export const DETAILS = [
  'Switch between a visual grid and a sortable list.',
  'Natural width and height for every image, plus a minimum size filter.',
  'Missing, decorative and described alt text counted separately.',
  `${ACTIONS.length - 1} copy formats, or download the file.`,
]

export const FACTS: Fact[] = [
  {
    value: String(SOURCES.length),
    label: 'Places images are found, from <img> to CSS backgrounds',
  },
  { value: `${COVERED} of ${IMAGES.length}`, label: 'Demo images with alt or marked decorative' },
  { value: String(ACTIONS.length - 1), label: 'Copy formats per image' },
  { value: '4', label: 'Ways to filter: format, source, size and alt' },
]
