import type { Fact, WalkStep } from '@/components/tool/story'

export const PARAGRAPH =
  'Listening to your own writing is the fastest way to hear the sentence that runs too long.'
export const WORDS = PARAGRAPH.split(' ')

export const STEPS: WalkStep[] = [
  {
    title: 'Pick the page text',
    body: 'Grab the article you are reading, or paste your own draft into the panel.',
  },
  {
    title: 'Press play',
    body: 'A system voice reads it aloud and the current word is highlighted as it goes.',
  },
  {
    title: 'Set the speed',
    body: 'Slow down for proofreading or speed up for long documentation.',
  },
  {
    title: 'Pause any time',
    body: 'Pause, resume or stop. Your place is kept while you look something up.',
  },
]

export const CAPTIONS = STEPS.map((step) => step.title)

export const DETAILS = [
  'Pull the readable text out of the current page.',
  'Familiar controls that keep your place.',
  'From a slow proofreading pace to a quick skim.',
  'Uses the voices already installed on your system.',
]

export const FACTS: Fact[] = [
  { value: 'System', label: 'Voices: the ones your OS already provides' },
  { value: 'Local', label: 'Speech is generated on your device' },
  { value: '0', label: 'Text sent to a speech server' },
  { value: 'Any', label: 'Page or pasted text' },
]
