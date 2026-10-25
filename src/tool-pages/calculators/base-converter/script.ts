import type { Fact, WalkStep } from '@/components/tool/story'

export type Base = 2 | 8 | 10 | 16
export const BASES: Base[] = [2, 8, 10, 16]
export const LABELS: Record<Base, string> = {
  2: 'Binary',
  8: 'Octal',
  10: 'Decimal',
  16: 'Hexadecimal',
}

const DIGITS = '0123456789abcdef'

type Parsed = { ok: true; value: bigint } | { ok: false; error: string }

/** The extension's parseBaseValue. */
export function parse(input: string, base: Base): Parsed {
  const trimmed = input.trim().toLowerCase()
  const negative = trimmed.startsWith('-')
  const stripped = (negative ? trimmed.slice(1) : trimmed)
    .replace(/^0[box]/, '')
    .replace(/[\s_]/g, '')
  if (!stripped) return { ok: false, error: 'Input is empty.' }
  let value = 0n
  for (const char of stripped) {
    const digit = DIGITS.indexOf(char)
    if (digit === -1 || digit >= base)
      return { ok: false, error: `"${char}" is not a valid ${LABELS[base].toLowerCase()} digit.` }
    value = value * BigInt(base) + BigInt(digit)
  }
  return { ok: true, value: negative ? -value : value }
}

/** formatBaseValue with grouping for binary and hex, as the result rows show it. */
export function format(value: bigint, base: Base): string {
  const digits = value.toString(base)
  if (base === 16) return digits.replace(/\B(?=(?:[\da-f]{2})+(?![\da-f]))/g, ' ')
  if (base === 2) return digits.replace(/\B(?=(?:[01]{4})+(?![01]))/g, ' ')
  return digits
}

/** bitRepresentation: padded to whole bytes, grouped in fours. */
export function bits(value: bigint): string {
  const raw = value.toString(2)
  return raw
    .padStart(Math.ceil(raw.length / 8) * 8, '0')
    .replace(/\B(?=(?:[01]{4})+(?![01]))/g, ' ')
}

function rows(input: string, base: Base) {
  const parsed = parse(input, base)
  if (!parsed.ok) throw new Error(parsed.error)
  return [...BASES.map((entry) => format(parsed.value, entry)), bits(parsed.value)]
}

export const ROW_LABELS = [...BASES.map((base) => LABELS[base]), 'Bits']

export const MODE = { input: '493', base: 10 as Base }
export const ERROR_CODE = { input: '0x80070005', base: 16 as Base }
export const TYPO = { input: '1012', base: 2 as Base }
export const FIXED = { input: '101', base: 2 as Base }

export const SCENES = {
  mode: rows(MODE.input, MODE.base),
  errorCode: rows(ERROR_CODE.input, ERROR_CODE.base),
  fixed: rows(FIXED.input, FIXED.base),
  typo: (() => {
    const parsed = parse(TYPO.input, TYPO.base)
    return parsed.ok ? '' : parsed.error
  })(),
}

export const OCTAL = SCENES.mode[1]
export const DECIMAL_ROW = 2

export const STEPS: WalkStep[] = [
  {
    title: 'Type a number',
    body: 'Every base fills in at once, with a byte-padded bit view underneath.',
  },
  {
    title: 'Paste hex as it is',
    body: 'Switch the input base and paste. A 0x, 0b or 0o prefix is ignored, and big values keep every digit.',
  },
  {
    title: 'Spot the bad digit',
    body: 'A digit that does not belong to the base is named in the error, so you know what to fix.',
  },
]

export const CAPTIONS = STEPS.map((step) => step.title)

export const DETAILS = [
  'Binary grouped in fours so long values stay readable.',
  'Octal, the base behind chmod permissions.',
  'Decimal worked out with BigInt, so 64-bit values keep every digit.',
  'Hex grouped by byte. A 0x prefix on the input is ignored.',
  `The bit view pads to whole bytes, so ${MODE.input} reads ${SCENES.mode[4]}.`,
]

export const FACTS: Fact[] = [
  { value: String(BASES.length), label: 'Bases, all shown at once' },
  { value: '8', label: 'Bits per byte in the padded bit view' },
  { value: '0', label: 'Digits lost to floating point: values are BigInt' },
  { value: OCTAL, label: `Octal for ${MODE.input}, the chmod you were after` },
]
