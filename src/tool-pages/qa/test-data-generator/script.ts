import type { Fact, WalkStep } from '@/components/tool/story'

export const COLUMNS = [
  { name: 'full_name', type: 'fullName' },
  { name: 'email', type: 'email' },
  { name: 'is_active', type: 'boolean' },
]

type Row = [string, string, boolean]

export const ROWS: Row[] = [
  ['Amara Okafor', 'amara.okafor@example.com', true],
  ['Lucas Pereira', 'lucas.p@example.net', true],
  ['Mei Tanaka', 'mei.tanaka@example.org', false],
  ['Jonas Berg', 'jberg@example.com', true],
  ['Priya Nair', 'priya.nair@example.io', false],
]

export const RESEEDED: Row[] = [
  ['Tomás Ruiz', 'truiz@example.org', true],
  ['Hana Kim', 'hana.kim@example.com', false],
  ['Olu Adeyemi', 'olu.a@example.net', true],
  ['Sofia Rossi', 'sofia.rossi@example.io', true],
  ['Ben Carter', 'bcarter@example.com', false],
]

export const SEEDS = ['4821', '9137']

const csv = (rows: Row[]) => [
  COLUMNS.map((column) => column.name).join(','),
  ...rows.map((row) => row.join(',')),
]

export const CSV = csv(ROWS)
export const CSV_RESEEDED = csv(RESEEDED)

const bytes = (text: string) => new TextEncoder().encode(text).length
const json = (rows: Row[]) =>
  JSON.stringify(
    rows.map((row) =>
      Object.fromEntries(COLUMNS.map((column, index) => [column.name, row[index]])),
    ),
    null,
    2,
  )

export const SIZE = { json: bytes(json(ROWS)), csv: bytes(CSV.join('\n')) }

export const FORMATS = ['JSON', 'NDJSON', 'CSV', 'TSV', 'SQL']
export const PRESETS = [
  'User account',
  'E-commerce order',
  'Employee record',
  'Geo point',
  'API log',
  'Payment',
]

export const STEPS: WalkStep[] = [
  {
    title: 'Start from a preset',
    body: 'Pick a schema like User account, then keep only the columns you need.',
  },
  { title: 'Generate the rows', body: 'Realistic names, emails and flags, previewed as a table.' },
  { title: 'Switch the format', body: 'The same rows as JSON, NDJSON, CSV, TSV or SQL inserts.' },
  {
    title: 'Reseed when you need new data',
    body: 'A seed fixes the output, so the same seed and schema always give the same rows.',
  },
]

export const CAPTIONS = STEPS.map((step) => step.title)

export const DETAILS = [
  'User, e-commerce, employee, geo, API log and payment schemas.',
  'The same seed and schema always produce the same data.',
  'A separate tab of nasty strings to break validation and rendering.',
  'Copy or download in the format your fixtures use.',
]

export const FACTS: Fact[] = [
  { value: String(PRESETS.length), label: 'Schema presets to start from' },
  { value: String(FORMATS.length), label: 'Export formats: JSON, NDJSON, CSV, TSV and SQL' },
  { value: '10,000', label: 'Rows per generation, at most' },
  { value: `${SIZE.csv} B`, label: 'Size of the five-row CSV in this demo' },
]
