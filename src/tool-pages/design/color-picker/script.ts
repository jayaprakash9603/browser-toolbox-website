import type { Fact, WalkStep } from '@/components/tool/story'

export const STEPS: WalkStep[] = [
  {
    title: 'Open the eyedropper',
    body: 'One click starts Chrome’s native EyeDropper, so you can sample any pixel on screen, not just the page.',
  },
  {
    title: 'Hover to find the shade',
    body: 'The loupe magnifies pixels as you move, so you land on the exact colour instead of a blurry edge.',
  },
  {
    title: 'Click to capture',
    body: 'The colour drops into the panel with HEX, RGB and HSL ready side by side.',
  },
  {
    title: 'Copy and keep a swatch',
    body: 'Copy the format you need. Every pick is kept as a swatch for later.',
  },
]

export const CAPTIONS = STEPS.map((step) => step.title)

export const PICKS = [
  { d: 'art-a', hex: '#6366F1' },
  { d: 'art-b', hex: '#FBBF24' },
  { d: 'art-c', hex: '#F97362' },
]

export const FINAL = { hex: '#F97362', rgb: 'rgb(249, 115, 98)', hsl: 'hsl(7, 93%, 68%)' }

export const DETAILS = [
  'Uses the browser’s EyeDropper API, so it works on images, video frames and other windows.',
  'Picked colours collect as swatches you can click to copy again.',
  'One click copies HEX, RGB or HSL in the exact syntax CSS expects.',
]

export const FACTS: Fact[] = [
  { value: 'Native', label: 'Chrome’s own EyeDropper, no injected overlay' },
  { value: '3', label: 'Formats: HEX, RGB and HSL' },
  { value: 'Any pixel', label: 'Images, gradients, video and other apps' },
  { value: 'Local', label: 'Swatches are saved on this device' },
]
