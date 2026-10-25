import type { Fact, WalkStep } from '@/components/tool/story'

export const RULES = [
  { kind: 'Redirect', detail: 'api.acme.com → localhost:3000' },
  { kind: 'Mock', detail: '/api/flags → 200 {"beta":true}' },
  { kind: 'Header', detail: 'add X-Debug: 1' },
]

export const LOG = [
  { method: 'GET', path: '/api/user', note: '200', tone: 'muted' },
  { method: 'GET', path: '/api/flags', note: '200', tone: 'muted' },
  { method: 'GET', path: '/api/user', note: '→ localhost · 200', tone: 'cyan' },
  { method: 'GET', path: '/api/flags', note: 'mocked · 200', tone: 'emerald' },
  { method: 'GET', path: '/api/user', note: 'paused · 200', tone: 'muted' },
] as const

export const STEPS: WalkStep[] = [
  {
    title: 'Watch the traffic',
    body: 'Requests from the page pass through the interceptor and land in the network log.',
  },
  {
    title: 'Redirect to your machine',
    body: 'A redirect rule points production calls at your local API without touching the code.',
  },
  {
    title: 'Mock a response',
    body: 'Answer a request instantly with your own status and body, no backend needed.',
  },
  {
    title: 'Pause in one click',
    body: 'Switch every rule off at once to compare against the real thing.',
  },
]

export const CAPTIONS = STEPS.map((step) => step.title)

export const DETAILS = [
  'Send matching requests to another host or path.',
  'Add, change or remove request and response headers.',
  'Return your own status and body for any URL.',
  'Match GraphQL calls by operation name.',
  'See what was matched and what each rule did.',
  'Turn every rule off and on again in one click.',
]

export const FACTS: Fact[] = [
  { value: '3', label: 'Rule types in the demo: redirect, mock and header' },
  { value: 'MV3', label: 'Rules run on Chrome’s declarative network APIs where possible' },
  { value: '0', label: 'Proxy servers or certificates to install' },
  { value: '1 click', label: 'To pause every rule' },
]
