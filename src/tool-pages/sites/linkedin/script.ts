import type { Fact, WalkStep } from '@/components/tool/story'

import { toUnicodeBold } from '../instagram/script'

export const MOBILE_CUTOFF = 140
export const DESKTOP_CUTOFF = 210

export const HOOK = 'We cut our build time in half.'
export const BOLD_HOOK = toUnicodeBold(HOOK)
export const BODY =
  ' No new hardware, no rewrite. Three changes did it: caching dependencies between runs, splitting tests by timing and dropping a lint step nobody read. Here is how each one worked and what it cost us to set up.'
export const POST = BOLD_HOOK + BODY

/** The extension slices the raw string, so bold letters count as two UTF-16 units each. */
export const preview = (cutoff: number) => POST.slice(0, cutoff) + (POST.length > cutoff ? '…' : '')
export const MOBILE = preview(MOBILE_CUTOFF)
export const DESKTOP = preview(DESKTOP_CUTOFF)

export const PROFILE = { name: 'Ada Park', headline: 'Staff Engineer at Northwind' }
export const CSV = `name,headline\n${[PROFILE.name, PROFILE.headline].map((value) => `"${value.replace(/"/g, '""')}"`).join(',')}`

export const STEPS: WalkStep[] = [
  {
    title: 'Bold the hook',
    body: 'Bold and Italic turn the text into Unicode letters that keep their style when pasted into LinkedIn.',
  },
  {
    title: 'See where “see more” lands',
    body: `Previews show what readers see before the fold: about ${MOBILE_CUTOFF} characters on mobile, ${DESKTOP_CUTOFF} on desktop.`,
  },
  {
    title: 'Copy a profile as CSV',
    body: 'Type a name and headline to get a quoted CSV row for your spreadsheet or CRM.',
  },
]

export const CAPTIONS = STEPS.map((step) => step.title)

export const DETAILS = [
  `Mobile and desktop previews cut at roughly ${MOBILE_CUTOFF} and ${DESKTOP_CUTOFF} characters.`,
  'Bold, italic and line-break fixes, applied to the whole draft.',
  'A name,headline CSV row with quotes escaped, ready to paste.',
]

export const FACTS: Fact[] = [
  { value: `~${MOBILE_CUTOFF}`, label: 'Characters before “see more” on mobile' },
  { value: `~${DESKTOP_CUTOFF}`, label: 'Characters before “see more” on desktop' },
  { value: '3', label: 'Formatting actions: spacing, bold, italic' },
  { value: '1', label: 'Click to copy a CSV row' },
]
