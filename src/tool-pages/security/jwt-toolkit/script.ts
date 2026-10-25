import type { Fact, WalkStep } from '@/components/tool/story'

/** The token behind the panel's own “Try example” link. */
export const TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkFkYSBMb3ZlbGFjZSIsImlhdCI6MTUxNjIzOTAyMiwiZXhwIjo5OTk5OTk5OTk5fQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'

const [headerPart, payloadPart, signaturePart] = TOKEN.split('.')

function decodeSegment(segment: string): Record<string, unknown> {
  const base64 = segment.replace(/-/g, '+').replace(/_/g, '/')
  const padded = base64 + '='.repeat((4 - (base64.length % 4)) % 4)
  const bytes = Uint8Array.from(atob(padded), (char) => char.charCodeAt(0))
  return JSON.parse(new TextDecoder().decode(bytes)) as Record<string, unknown>
}

export const HEADER = decodeSegment(headerPart)
export const PAYLOAD = decodeSegment(payloadPart)
export const PARTS = [
  { name: 'header', value: headerPart, color: '#fb7185' },
  { name: 'payload', value: payloadPart, color: '#a78bfa' },
  { name: 'signature', value: signaturePart, color: '#22d3ee' },
]

export const HEADER_JSON = JSON.stringify(HEADER, null, 2)
export const PAYLOAD_JSON = JSON.stringify(PAYLOAD, null, 2)
export const EXP = Number(PAYLOAD.exp)
export const EXPIRES = new Date(EXP * 1000).toLocaleString('en-US', { timeZone: 'UTC' })
export const STATUS = 'Valid (not expired)'
export const ALG = String(HEADER.alg)
export const NOT_VERIFIED =
  'Decoding reads the token — it does NOT verify the signature. Treat contents as untrusted.'
export const WARNINGS = [
  ...(PAYLOAD.iss ? [] : ['Missing iss (issuer) claim.']),
  'Decoding does NOT verify the signature. Treat contents as untrusted.',
]

export const STEPS: WalkStep[] = [
  {
    title: 'Paste a token',
    body: 'A leading “Bearer ” is stripped for you, so copy it straight from a header.',
  },
  {
    title: 'Split into three',
    body: 'Header and payload are Base64URL-decoded into readable JSON. The signature is left as it is.',
  },
  {
    title: 'Check the claims',
    body: 'Badges show the expiry status and algorithm, with warnings for missing or suspicious claims.',
  },
  {
    title: 'See when it expires',
    body: 'The exp claim is shown as a local date, and each part copies as JSON.',
  },
]

export const CAPTIONS = STEPS.map((step) => step.title)

export const DETAILS = [
  'Pretty-printed JSON for both parts, each with its own copy button.',
  'Valid, expired, not yet valid or no expiry, read from exp and nbf.',
  'Flags a missing issuer, a future iat and the unsigned “none” algorithm.',
  'The token never leaves the panel, and nothing claims the signature is checked.',
]

export const FACTS: Fact[] = [
  { value: '3', label: 'Segments split and decoded' },
  { value: '4', label: 'Expiry states: valid, expired, not yet valid, none' },
  { value: '0', label: 'Signatures verified, and the panel says so' },
  { value: '1', label: 'Click to load an example token' },
]
