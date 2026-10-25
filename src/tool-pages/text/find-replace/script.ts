import type { Fact, WalkStep } from '@/components/tool/story'

export const ROWS = [
  { label: 'Docs', rest: 'acme.dev/docs', upper: false },
  { label: 'API', rest: 'api.acme.dev/v2', upper: false },
  { label: 'Legacy', rest: 'old.acme.dev', upper: true },
  { label: 'Status', rest: 'status.acme.dev', upper: false },
  { label: 'Blog', rest: 'acme.dev/blog', upper: false },
]

export const FIND = 'http://'
export const REPLACE = 'https://'
export const CASE_MATCHES = ROWS.filter((row) => !row.upper).length

export const STEPS: WalkStep[] = [
  {
    title: 'Find',
    body: 'Type what you are looking for and every match lights up, with a live count.',
  },
  { title: 'Match case', body: 'Narrow the search so only the exact capitalisation counts.' },
  {
    title: 'Preview the replacement',
    body: 'Each match shows what it will become before anything changes.',
  },
  {
    title: 'Replace all',
    body: 'One click rewrites every match. Regex and whole-word modes work the same way.',
  },
]

export const CAPTIONS = STEPS.map((step) => step.title)

export const DETAILS = [
  'Use capture groups and patterns, not just literal text.',
  'Tell “http” from “HTTP” when it matters.',
  'Match “cat” without touching “category”.',
  'See how many matches there are as you type.',
]

export const FACTS: Fact[] = [
  { value: String(ROWS.length), label: 'Matches found in the demo before match case' },
  { value: String(CASE_MATCHES), label: 'After turning match case on' },
  { value: '3', label: 'Search modes: regex, match case, whole word' },
  { value: 'Local', label: 'Text never leaves the panel' },
]
