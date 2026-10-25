'use client'

import { StoryLayout, type StoryConfig, type StoryProps } from '@/components/tool/story'

import Demo from './Demo'
import { BODY_TICKED, DETAILS, FACTS, HEADING, STEPS, TASKS, TICKED } from './script'

const config: StoryConfig = {
  problem: {
    variant: 'blur',
    text: 'Your notes app is one window away, and every trip there costs you the thought you went to write down.',
    accent: ['one window away'],
    compare: 'stack',
    beforeLabel: 'What you type',
    afterLabel: 'What preview shows',
    before: (
      <pre className="text-left font-mono text-sm leading-relaxed text-ink-soft sm:text-base">
        {BODY_TICKED}
      </pre>
    ),
    after: (
      <div className="text-left text-sm text-ink sm:text-base">
        <p className="mb-2 text-xl font-semibold">{HEADING}</p>
        <ul className="space-y-1.5">
          {TASKS.map((task, index) => (
            <li key={task} className="flex items-center gap-2">
              <span
                className={`flex size-4 items-center justify-center rounded border text-[10px] ${index === TICKED ? 'border-[var(--accent)] bg-[var(--accent)] text-canvas' : 'border-line-strong'}`}
              >
                {index === TICKED ? '✓' : ''}
              </span>
              <span className={index === TICKED ? 'line-through opacity-60' : ''}>{task}</span>
            </li>
          ))}
        </ul>
      </div>
    ),
  },
  walk: { title: 'Write it', em: 'where you read it', steps: STEPS, flip: true },
  features: { layout: 'reel', title: 'A real editor,', em: 'in the side panel', details: DETAILS },
  uses: { layout: 'timeline', title: 'Notes right', em: 'beside the work' },
  facts: FACTS,
  backdrop: { kind: 'aurora', at: 'uses' },
}

export default function Story({ features, useCases }: StoryProps) {
  return <StoryLayout config={config} demo={<Demo />} features={features} useCases={useCases} />
}
