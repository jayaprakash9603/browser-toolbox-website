import type { Fact, WalkStep } from '@/components/tool/story'

/**
 * Codes are RFC 6238 (HMAC-SHA1, 30 s, 6 digits) for each secret at 2026-10-24 09:00:00 UTC and
 * the following window, exactly what the extension's generateTotp returns; regenerate if a secret changes.
 */
export const ACCOUNTS = [
  { label: 'Staging admin', secret: 'JBSWY3DPEHPK3PXP', codes: ['164914', '111621'] },
  { label: 'QA test user', secret: 'KRSXG5CTMVRXEZLUKN2XAZLS', codes: ['163282', '977834'] },
]

export const ADDED = ACCOUNTS[1]
export const START = 24
export const STEP_SECONDS = 30

export const STEPS: WalkStep[] = [
  {
    title: 'Name the account',
    body: 'Give it a label you will recognise, like the environment it logs into.',
  },
  {
    title: 'Paste the secret',
    body: 'Use the Base32 setup key shown next to the QR code; the code appears straight away.',
  },
  {
    title: 'A new code every 30 seconds',
    body: 'The countdown shows when the codes change, and every account rolls over together.',
  },
  { title: 'Copy and sign in', body: 'One click copies the current code for the login form.' },
]

export const CAPTIONS = STEPS.map((step) => step.title)

export const DETAILS = [
  'Standard six-digit TOTP codes, the same ones an authenticator app shows.',
  'Keep as many accounts as you need, each with its own label.',
  'A live “Codes refresh in …s” counter so you never paste a code that is about to expire.',
  'Secrets are saved in the extension’s local storage, not synced to a server.',
]

export const FACTS: Fact[] = [
  { value: String(STEP_SECONDS), label: 'Seconds per code' },
  { value: '6', label: 'Digits, as RFC 6238 specifies' },
  { value: 'SHA-1', label: 'HMAC, the authenticator default' },
  { value: '0', label: 'Phones needed for test accounts' },
]
