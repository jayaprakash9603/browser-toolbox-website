import type { Fact, WalkStep } from '@/components/tool/story'

import { formats, hslToRgb, rgbToHex } from '../_color'

export const INPUTS = [
  { typed: '#3B82F6', hex: '#3b82f6' },
  { typed: 'hsl(160, 84%, 39%)', hex: rgbToHex(hslToRgb({ h: 160, s: 84, l: 39 })) },
  { typed: 'orange', hex: '#ffa500' },
]

export const ROWS = INPUTS.map((input) => formats(input.hex))
export const LABELS = ROWS[0].map((row) => row.label)
export const COPIED = LABELS.indexOf('CMYK')

export const STEPS: WalkStep[] = [
  { title: 'Type a colour', body: 'Paste a HEX code and all six formats appear at once.' },
  { title: 'Any syntax in', body: 'rgb() and hsl() work as input too, and every row follows.' },
  { title: 'Even a name', body: 'Common colour names like orange, purple or pink work too.' },
  {
    title: 'Copy the one you need',
    body: 'Each row has its own copy button, in the exact syntax shown.',
  },
]

export const CAPTIONS = STEPS.map((step) => step.title)

export const DETAILS = [
  'Six-digit HEX, with 3, 4 and 8-digit input accepted.',
  'rgb() with channels 0 to 255.',
  'Hue, saturation and lightness or value, rounded to whole numbers.',
  'Hue, whiteness and blackness, in the modern CSS syntax.',
  'Cyan, magenta, yellow and key percentages for print.',
]

export const FACTS: Fact[] = [
  { value: String(LABELS.length), label: 'Formats from one input' },
  { value: '3', label: 'Input syntaxes: HEX, rgb() and hsl()' },
  { value: '14', label: 'Colour names understood, from black to transparent' },
  { value: '1', label: 'Click to copy any row' },
]
