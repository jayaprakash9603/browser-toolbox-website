import type { Fact, WalkStep } from '@/components/tool/story'

export const STEPS: WalkStep[] = [
  {
    title: 'Drag a selection',
    body: 'Choose visible area, full page, a selection or a single element. The rest of the page dims so you frame exactly what matters.',
  },
  {
    title: 'Capture in a flash',
    body: 'The shot lands in the editor instantly. Nothing is uploaded to take it.',
  },
  {
    title: 'Annotate and redact',
    body: 'Add arrows and shapes, then blur emails, tokens or names before anyone sees them.',
  },
  {
    title: 'Keep it in history',
    body: 'Every capture is saved locally, ready to copy or download again later.',
  },
]

export const CAPTIONS = STEPS.map((step) => step.title)

export const DETAILS = [
  'Four modes cover everything from a quick crop to a long page stitched top to bottom.',
  'Capture every open tab in one go when you need a set of screens.',
  'Arrows, boxes and shapes point at the problem without another app.',
  'Blur anything sensitive so screenshots are safe to paste into tickets.',
  'Recent captures stay on this device for quick re-use.',
]

export const FACTS: Fact[] = [
  { value: '4', label: 'Capture modes: visible, full page, selection and element' },
  { value: 'Local', label: 'Images and history stay on your device' },
  { value: '1', label: 'Panel for capture, markup and redaction' },
  { value: 'All tabs', label: 'Batch capture when you need every screen' },
]
