import type { Fact, WalkStep } from '@/components/tool/story'

/** The extension’s presets. Each frame is as tall as the device times 0.35, capped at 360px. */
export const DEVICES = [
  { id: 'iphone', label: 'iPhone 15', width: 393, height: 852 },
  { id: 'ipad', label: 'iPad Pro', width: 1024, height: 1366 },
  { id: 'laptop', label: 'Laptop 13"', width: 1280, height: 800 },
  { id: 'desktop', label: 'Desktop', width: 1920, height: 1080 },
].map((device) => ({ ...device, frame: Math.min(360, Math.round(device.height * 0.35)) }))

export const STATES = [
  ['iphone', 'laptop'],
  ['iphone', 'ipad', 'laptop'],
  ['ipad', 'laptop'],
]

export const URLS = ['https://northwind.app', 'https://northwind.app/blog/builds']

export const STEPS: WalkStep[] = [
  {
    title: 'Opens on this page',
    body: 'The current tab’s URL is filled in, with iPhone and laptop frames ready.',
  },
  { title: 'Add a device', body: 'Tap a preset and its frame slots into the stack.' },
  { title: 'Drop one', body: 'Tap it again and the others close the gap.' },
  { title: 'Point it anywhere', body: 'Change the URL and every frame loads the new page.' },
]

export const CAPTIONS = STEPS.map((step) => step.title)

export const DETAILS = [
  `${DEVICES.length} presets: ${DEVICES.map((device) => device.label).join(', ')}.`,
  'Pick as many frames as you like and see them together.',
  'Starts on the current tab, or type any URL that allows framing.',
]

export const FACTS: Fact[] = [
  { value: String(DEVICES.length), label: 'Device presets' },
  { value: String(STATES[0].length), label: 'Frames open by default' },
  { value: `${DEVICES[0].frame}px`, label: 'Height of the iPhone frame' },
  { value: '360px', label: 'Tallest a frame gets' },
]
