'use client'

import { AlertTriangleIcon, CheckCircle2Icon, XCircleIcon } from 'lucide-react'

import { StoryLayout, type StoryConfig, type StoryProps } from '@/components/tool/story'

import Demo from './Demo'
import { AFTER, BEFORE, DETAILS, FACTS, STEPS, type Issue } from './script'

function Issues({ issues }: { issues: Issue[] }) {
  return (
    <div className="w-[min(100%,380px)] space-y-1.5 rounded-xl border border-line bg-surface p-3">
      {issues.length === 0 ? (
        <p className="flex items-center gap-2 rounded-md border border-green-500/40 bg-green-500/5 p-2 text-[13px] text-green-400">
          <CheckCircle2Icon className="size-4" /> No obvious accessibility issues found.
        </p>
      ) : (
        issues.map((issue) => (
          <p
            key={issue.message}
            className="flex items-start gap-2 rounded-md border border-line p-2 text-[12px] text-ink"
          >
            {issue.severity === 'error' ? (
              <XCircleIcon className="mt-0.5 size-3.5 shrink-0 text-red-500" />
            ) : (
              <AlertTriangleIcon className="mt-0.5 size-3.5 shrink-0 text-amber-500" />
            )}
            {issue.message}
          </p>
        ))
      )}
    </div>
  )
}

const config: StoryConfig = {
  problem: {
    variant: 'outline',
    text: 'A missing alt, a skipped heading, an icon link with no name. Small things a screen reader user hits first.',
    accent: ['hits first'],
    compare: 'wipe',
    beforeLabel: `Sample page · ${BEFORE.length} issues`,
    afterLabel: 'After the fixes',
    before: <Issues issues={BEFORE} />,
    after: <Issues issues={AFTER} />,
  },
  walk: { title: 'The obvious problems,', em: 'before an audit', steps: STEPS },
  features: {
    layout: 'orbit',
    title: 'Five quick checks,',
    em: 'plain messages',
    details: DETAILS,
  },
  uses: { layout: 'quotes', title: 'For teams', em: 'learning the basics' },
  facts: FACTS,
  backdrop: { kind: 'aurora', at: 'features' },
}

export default function Story({ features, useCases }: StoryProps) {
  return <StoryLayout config={config} demo={<Demo />} features={features} useCases={useCases} />
}
