import type { Fact, WalkStep } from '@/components/tool/story'

/** JSON line, its YAML equivalent (null when the line disappears) and YAML depth. */
export const PAIRS: [string, string | null, number][] = [
  ['{', null, 0],
  ['  "apiVersion": "v1",', 'apiVersion: v1', 0],
  ['  "kind": "Pod",', 'kind: Pod', 0],
  ['  "metadata": {', 'metadata:', 0],
  ['    "name": "web",', 'name: web', 1],
  ['    "namespace": "shop"', 'namespace: shop', 1],
  ['  },', null, 0],
  ['  "spec": {', 'spec:', 0],
  ['    "replicas": 3', 'replicas: 3', 1],
  ['  }', null, 0],
  ['}', null, 0],
]

export const YAML = PAIRS.filter(([, yaml]) => yaml !== null).map(
  ([, yaml, depth]) => `${'  '.repeat(depth)}${yaml}`,
)
export const BROKEN_INDEX = PAIRS.findIndex(([, yaml]) => yaml === 'replicas: 3')
export const BROKEN_LINE = YAML.findIndex((line) => line.trim() === 'replicas: 3') + 1

export const STEPS: WalkStep[] = [
  { title: 'Paste JSON', body: 'A manifest, a config or an API payload, exactly as you have it.' },
  {
    title: 'Convert to YAML',
    body: 'Braces and quotes fall away and indentation carries the structure.',
  },
  {
    title: 'Catch a bad indent',
    body: 'Validation points at the exact line that would break the deploy.',
  },
  {
    title: 'Fix it, validate again',
    body: 'Correct the line and the document validates. Convert back to JSON any time.',
  },
]

export const CAPTIONS = STEPS.map((step) => step.title)

export const DETAILS = [
  'Errors with the line that caused them.',
  'Consistent indentation and spacing.',
  'Turn YAML into JSON for tools that need it.',
  'Turn JSON into readable YAML.',
]

export const FACTS: Fact[] = [
  { value: 'Both', label: 'Directions: YAML to JSON and JSON to YAML' },
  { value: `Line ${BROKEN_LINE}`, label: 'Where the demo’s indentation error is reported' },
  { value: 'Local', label: 'Parsed in the panel' },
  { value: '0', label: 'Uploads' },
]
