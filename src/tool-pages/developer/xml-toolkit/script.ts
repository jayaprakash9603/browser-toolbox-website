import type { Fact, WalkStep } from '@/components/tool/story'

export const XML_MIN =
  '<order id="7"><customer>Ada</customer><items><item sku="A1">2</item><item sku="B4">1</item></items></order>'

export const XML_LINES: [number, string][] = [
  [0, '<order id="7">'],
  [1, '<customer>Ada</customer>'],
  [1, '<items>'],
  [2, '<item sku="A1">2</item>'],
  [2, '<item sku="B4">1</item>'],
  [1, '</items>'],
  [0, '</order>'],
]

export const JSON_OUT = `{
  "order": {
    "@id": "7",
    "customer": "Ada",
    "items": {
      "item": [
        { "@sku": "A1", "#text": "2" },
        { "@sku": "B4", "#text": "1" }
      ]
    }
  }
}`

export const STEPS: WalkStep[] = [
  {
    title: 'Paste and validate',
    body: 'Drop in a SOAP response, a feed or a sitemap. Errors are reported with their line.',
  },
  { title: 'Format', body: 'Every element moves onto its own line, indented by depth.' },
  {
    title: 'See the nesting',
    body: 'Elements unfold into nested boxes, so the structure is obvious at a glance.',
  },
  { title: 'Convert to JSON', body: 'Attributes and text nodes map to keys you can use in code.' },
]

export const CAPTIONS = STEPS.map((step) => step.title)

export const DETAILS = [
  'Indent nested elements consistently.',
  'Strip whitespace between tags.',
  'Catch unclosed and mismatched tags.',
  'Attributes become @keys, text becomes #text.',
]

export const FACTS: Fact[] = [
  { value: '4', label: 'Actions: format, minify, validate and convert' },
  { value: 'XML → JSON', label: 'With attributes and text nodes preserved' },
  { value: 'Local', label: 'Parsed in the panel with the browser’s own parser' },
  { value: '0', label: 'Uploads' },
]
