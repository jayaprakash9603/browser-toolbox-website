import type { Fact, WalkStep } from '@/components/tool/story'

export const QUERY =
  'select u.id, u.name, count(o.id) as orders from users u left join orders o on o.user_id = u.id where u.active = true group by u.id, u.name order by orders desc limit 10'

export const KEYWORDS = new Set([
  'select',
  'count(o.id)',
  'as',
  'from',
  'left',
  'join',
  'on',
  'where',
  'true',
  'group',
  'by',
  'order',
  'desc',
  'limit',
])

export const FORMATTED = `SELECT u.id, u.name, COUNT(o.id) AS orders
FROM users u
LEFT JOIN orders o ON o.user_id = u.id
WHERE u.active = TRUE
GROUP BY u.id, u.name
ORDER BY orders DESC
LIMIT 10`

export const MINIFIED = FORMATTED.replace(/\n/g, ' ')

export const STEPS: WalkStep[] = [
  {
    title: 'Paste the one-liner',
    body: 'The query your ORM logged, all lowercase and on a single line.',
  },
  {
    title: 'Fix keyword casing',
    body: 'Keywords switch to upper case so they stand apart from table and column names.',
  },
  {
    title: 'Format into clauses',
    body: 'Each clause gets its own line, so joins and filters are easy to review.',
  },
  {
    title: 'Minify for code',
    body: 'Collapse it back to a single line when it goes into a string literal.',
  },
]

export const CAPTIONS = STEPS.map((step) => step.title)

export const DETAILS = [
  'One clause per line, joins and conditions aligned.',
  'Back to one line for embedding in code.',
  'Formatting rules for the dialect you actually use.',
  'Upper or lower case keywords, your choice.',
]

export const FACTS: Fact[] = [
  { value: '7', label: 'Clauses in the demo query, one per line after formatting' },
  { value: 'Multi', label: 'Dialects: PostgreSQL, MySQL, SQLite and more' },
  { value: 'Local', label: 'Queries never leave the panel' },
  { value: '0', label: 'Database connections needed' },
]
