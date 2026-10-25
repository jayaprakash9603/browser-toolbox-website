import type { Fact, WalkStep } from '@/components/tool/story'

export const PAGE = { title: 'New arrivals · Northwind', url: 'https://shop.northwind.app/new' }

export const EXPECTED = 'Price sits under the product name'
export const ACTUAL = 'Price overlaps the product image'
export const STEPS_TEXT = [
  '1. Open New arrivals',
  '2. Narrow the window below 400px',
  '3. Look at the second card',
]

/** The tool's Markdown template, filled with the demo values. */
export const REPORT = [
  '## Bug Report',
  `**Page:** ${PAGE.title}`,
  `**URL:** ${PAGE.url}`,
  '**Reported:** 2026-10-24T09:41:07.512Z',
  '**Viewport:** 1440×900',
  '**User agent:** Mozilla/5.0 (Windows NT 10.0; …)',
  '### Expected',
  EXPECTED,
  '### Actual',
  ACTUAL,
  '### Steps to reproduce',
  ...STEPS_TEXT,
]

export const STEPS: WalkStep[] = [
  {
    title: 'The page fills itself in',
    body: 'Title and URL come from the tab you are on, so the report points at the right place.',
  },
  {
    title: 'Say what you expected',
    body: 'Two short fields: what should happen and what actually did.',
  },
  {
    title: 'List the steps',
    body: 'Write the reproduction steps while the bug is still on screen.',
  },
  {
    title: 'Generate the report',
    body: 'One click builds Markdown with the time, viewport and user agent attached.',
  },
]

export const CAPTIONS = STEPS.map((step) => step.title)

export const DETAILS = [
  'Taken from the active tab, no copy and paste.',
  'Screen size and browser string added for you.',
  'A template that keeps every report in the same shape.',
  'Paste straight into Jira, GitHub or Linear.',
]

export const FACTS: Fact[] = [
  { value: '4', label: 'Things captured automatically: title, URL, time and environment' },
  { value: '4', label: 'Fields you fill: expected, actual, steps and notes' },
  { value: 'Markdown', label: 'Output that renders in any tracker' },
  { value: '0', label: 'Accounts or integrations to set up' },
]
