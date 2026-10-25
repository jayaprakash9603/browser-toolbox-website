import type { Fact, WalkStep } from '@/components/tool/story'

/** Illustrative hosts: one letter off a protected brand label (the typosquat heuristic) and reserved .example domains. */
export const LOOKALIKE = { host: 'paypa1.com', url: 'https://paypa1.com/signin', brand: 'paypal' }
export const BLOCKED = { host: 'wallet-verify.example', url: 'https://wallet-verify.example/claim' }
export const DOWNLOAD = {
  host: 'free-codecs.example',
  url: 'https://free-codecs.example/player',
  file: 'codec-pack.exe',
}
export const TRUSTED = 'intranet.northwind.app'

export const COPY = {
  lookalikeTitle: 'Suspicious sign-in page',
  lookalikeBody: `This page asks for a password but the address does not match the real ${LOOKALIKE.brand}. Leaving is recommended.`,
  blockedTitle: 'Dangerous site blocked',
  blockedSubtitle: 'One Panel stopped this page from loading.',
  blockedReason:
    'This address is on our phishing blocklist. Navigation was stopped before the page loaded.',
  downloadTitle: 'Review this download',
  downloadBody:
    'A program file started downloading without a click on that page. Web protection is holding it until you choose.',
  downloadTip: 'Nothing has been saved to your computer yet.',
}

export const RECENT = [
  { host: LOOKALIKE.host, category: 'Suspicious login' },
  { host: BLOCKED.host, category: 'Phishing' },
  { host: DOWNLOAD.host, category: 'Download' },
]

export const STEPS: WalkStep[] = [
  {
    title: 'Spot a look-alike login',
    body: 'A password form on an address one letter away from a real brand gets a warning before you type.',
  },
  {
    title: 'Stop a known bad site',
    body: 'Hosts on the phishing, malware, scam and cryptominer lists are stopped before the page loads.',
  },
  {
    title: 'Hold a sneaky download',
    body: 'A program that starts downloading without a click is held until you choose to keep or delete it.',
  },
  {
    title: 'Trust the sites you know',
    body: 'Add a domain once and list blocking skips it from then on.',
  },
]

export const CAPTIONS = STEPS.map((step) => step.title)

export const DETAILS = [
  'Phishing, malware, scam and cryptominer blocklists bundled with the extension.',
  'Flags password forms on look-alike, punycode or brand-impersonating domains.',
  'Cancels downloads from blocklisted sites and holds programs that start without a click.',
  'Your own allowlist for intranets and sites you know are safe.',
]

export const FACTS: Fact[] = [
  { value: '4', label: 'Blocklists: phishing, malware, scams, cryptominers' },
  { value: '6', label: 'Real-time guards, from fake logins to notification spam' },
  { value: '3', label: 'Ad, tracker and cookie-banner shields alongside' },
  { value: '0', label: 'Switches to flip: every layer starts on' },
]
