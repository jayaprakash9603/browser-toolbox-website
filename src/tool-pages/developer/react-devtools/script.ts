import type { Fact, WalkStep } from '@/components/tool/story'

export const TREE = [
  { name: 'App', depth: 0 },
  { name: 'Layout', depth: 1 },
  { name: 'Header', depth: 2 },
  { name: 'Cart', depth: 2 },
  { name: 'CartItem', depth: 3, note: 'key="a"' },
  { name: 'CartItem', depth: 3, note: 'key="b"' },
  { name: 'Checkout', depth: 2 },
]

export const SELECTED = 4

export const PROPS = [
  ['item', '{ id: 42, … }'],
  ['qty', '2'],
  ['onRemove', 'ƒ onRemove()'],
]

export const HOOKS = [
  ['State', 'false'],
  ['Memo', '84.00'],
]

export const FLAME = [
  { name: 'App', width: 100, depth: 0, hot: false },
  { name: 'Layout', width: 94, depth: 1, hot: false },
  { name: 'Cart', width: 68, depth: 2, hot: true },
  { name: 'CartItem', width: 30, depth: 3, hot: true },
  { name: 'Header', width: 18, depth: 2, hot: false },
]

export const STEPS: WalkStep[] = [
  {
    title: 'See the component tree',
    body: 'The live React tree of the page, right in the side panel.',
  },
  {
    title: 'Inspect props and hooks',
    body: 'Select a component to read its props, state and memoised values.',
  },
  {
    title: 'Profile a render',
    body: 'Record an interaction and see which components re-rendered, and how often.',
  },
  {
    title: 'Watch Suspense',
    body: 'Follow each boundary from pending to resolved while the page loads.',
  },
]

export const CAPTIONS = STEPS.map((step) => step.title)

export const DETAILS = [
  'Browse the hierarchy, search by name, jump to the source.',
  'Find the components that render more than they should.',
  'See every boundary and what it is waiting for.',
  'Inspect the DOM element behind a component.',
  'Panels styled to match the rest of One Panel.',
]

export const FACTS: Fact[] = [
  { value: 'Official', label: 'Built on the React DevTools backend' },
  { value: '4', label: 'Views: components, profiler, Suspense and elements' },
  { value: 'Side panel', label: 'Docked next to the page, not in a separate window' },
  { value: 'Local', label: 'Inspection runs in your browser' },
]
