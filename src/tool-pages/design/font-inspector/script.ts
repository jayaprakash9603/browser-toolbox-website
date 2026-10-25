import type { Fact, WalkStep } from '@/components/tool/story'

const FAMILY = 'Geist, ui-sans-serif, system-ui, sans-serif'

/** The tooltip line the content script writes: family · size · weight · line height. */
export const TARGETS = [
  { d: 'page-title', ax: 0.3, size: '48px', weight: '700', lineHeight: '52.8px' },
  { d: 'page-sub', ax: 0.4, size: '16px', weight: '400', lineHeight: '26px' },
  { d: 'page-cta', ax: 0.5, size: '15px', weight: '500', lineHeight: '20px' },
].map((target) => ({
  ...target,
  tip: `${FAMILY} · ${target.size} · ${target.weight} · ${target.lineHeight}`,
}))

export const STEPS: WalkStep[] = [
  {
    title: 'Switch it on',
    body: 'One toggle in the panel turns the current tab into a type inspector.',
  },
  {
    title: 'Hover a heading',
    body: 'A tooltip follows the cursor with the computed font family, size, weight and line height.',
  },
  {
    title: 'Then the body copy',
    body: 'Move on and the readout updates instantly, no clicking or DevTools.',
  },
  {
    title: 'And the buttons',
    body: 'Check every element against your type scale in a few seconds of hovering.',
  },
]

export const CAPTIONS = STEPS.map((step) => step.title)

export const DETAILS = [
  'The full computed font-family stack, fallbacks included.',
  'Computed font size in pixels and the numeric weight.',
  'The computed line height, so spacing problems show up.',
  'The readout sits beside the cursor wherever you hover.',
]

export const FACTS: Fact[] = [
  { value: '4', label: 'Values per readout: family, size, weight, line height' },
  { value: '1', label: 'Toggle to switch it on or off' },
  { value: '0', label: 'Clicks needed while inspecting' },
  { value: 'Computed', label: 'Values come from the browser’s computed style' },
]
