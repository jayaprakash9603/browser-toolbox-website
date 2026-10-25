import type { Fact, WalkStep } from '@/components/tool/story'

export const PAGE_URL = 'https://northwind.dev/shoes/trail-runner-2'
export const TITLE = 'Trail Runner 2 – Lightweight Trail Running Shoe | Northwind Outfitters'
export const TITLE_MAX = 60

export const TABS = [
  'Overview',
  'Content',
  'Headings',
  'Links',
  'Images',
  'Schema',
  'Social',
  'Speed',
  'Issues',
  'Advanced',
]
export const ISSUES_TAB = TABS.indexOf('Issues')
export const IMAGES_TAB = TABS.indexOf('Images')

export const PAGE = {
  headings: ['Trail Runner 2', 'Built for rough ground', 'Specs', 'Reviews'],
  images: [
    {
      src: '/img/trail-runner-2.jpg',
      size: '800×600',
      alt: 'Trail Runner 2 in moss green, side view',
    },
    { src: '/img/outsole.jpg', size: '400×300', alt: null },
    { src: '/img/upper.jpg', size: '400×300', alt: 'Mesh upper close-up' },
  ],
  links: 7,
}
export const H1 = 1
export const MISSING_ALT = PAGE.images.filter((image) => image.alt === null).length

export type Severity = 'error' | 'warning'
export type Issue = { severity: Severity; message: string; fix?: string }

export const BEFORE = {
  score: 88,
  passed: 63,
  total: 67,
  issues: [
    {
      severity: 'error',
      message: 'Missing meta description.',
      fix: 'Write a compelling meta description around 120–160 characters.',
    },
    { severity: 'error', message: `${MISSING_ALT} images missing alt attribute.` },
    {
      severity: 'warning',
      message: `Title: ${TITLE.length} chars (~385px).`,
      fix: `Add a unique, descriptive title between 30–${TITLE_MAX} characters.`,
    },
    { severity: 'warning', message: 'Missing og: description, image.' },
  ] satisfies Issue[],
}
export const ERRORS = BEFORE.issues.filter((issue) => issue.severity === 'error')
export const WARNINGS = BEFORE.issues.filter((issue) => issue.severity === 'warning')

export const AFTER = { score: 100, passed: 67, total: 67 }

export const RING = 2 * Math.PI * 28

export const STEPS: WalkStep[] = [
  {
    title: 'Audit the open page',
    body: `Open the panel on any page and it scores what it finds: ${BEFORE.total} weighted checks on this product page.`,
  },
  {
    title: 'Read what to fix',
    body: 'Errors first, then warnings, each with the reason and a fix. Notices stay out of the way.',
  },
  {
    title: 'Point at it on the page',
    body: 'Outline the images with no alt text, the headings or the nofollow links right in the page.',
  },
]

export const CAPTIONS = STEPS.map((step) => step.title)

export const DETAILS = [
  'One score from weighted checks, with indexability, canonical and HTTP status up top.',
  'Word count, text-to-code ratio and the top one-, two- and three-word phrases, plus the heading outline.',
  'Internal, external and nofollow links, and images with missing alt, size or broken status.',
  'Every JSON-LD block, its types and errors, and the hreflang set.',
  'Open Graph and X card tags with a preview of the share image.',
  'This visit’s timings, then Google PageSpeed on mobile and desktop.',
  'Errors and warnings in one list, and the whole report as JSON.',
]

export const FACTS: Fact[] = [
  { value: String(TABS.length), label: 'Report tabs, from overview to advanced' },
  { value: String(BEFORE.total), label: 'Scored checks on the sample product page' },
  { value: '3', label: 'Things it outlines on the page' },
  { value: '2', label: 'PageSpeed runs: mobile and desktop' },
]
