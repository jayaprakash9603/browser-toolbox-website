import type { Fact, WalkStep } from '@/components/tool/story'

export const STEPS: WalkStep[] = [
  {
    title: 'Copy as you work',
    body: 'Everything you copy lands in the history, newest first, without changing how you copy.',
  },
  {
    title: 'Search the history',
    body: 'Type a few letters and the list narrows to what you meant, even if you copied it an hour ago.',
  },
  {
    title: 'Pin what matters',
    body: 'Pinned items stay at the top for the session, so keys and snippets you reuse are always one click away.',
  },
  {
    title: 'Paste it back',
    body: 'Click any item to put it back on the clipboard, then paste wherever you need it.',
  },
]

export const CAPTIONS = STEPS.map((step) => step.title)

export const SNIPPETS = {
  install: 'npm i @acme/sdk',
  key: 'api.acme.dev/v2/keys',
}

export const OLDER = ['Meeting moved to 3pm', 'margin: 0 auto;', 'Invoice #20418']

export const DETAILS = [
  'Find any snippet by typing part of it.',
  'Keep the things you reuse at the top.',
  'Hide images and rich content when you only want text.',
  'Pull in whatever is on the clipboard right now.',
  'Remove a single item or wipe the whole list.',
]

export const FACTS: Fact[] = [
  { value: 'Local', label: 'History is stored on this device only' },
  { value: '1 click', label: 'To copy any item back' },
  { value: 'Pinned', label: 'Favourites stay above the history' },
  { value: '0', label: 'Accounts or sync servers' },
]
