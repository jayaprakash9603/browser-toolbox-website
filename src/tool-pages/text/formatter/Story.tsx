'use client'

import { Code } from '@/components/tool/stage'
import { StoryLayout, type StoryConfig, type StoryProps } from '@/components/tool/story'

import Demo from './Demo'
import { DETAILS, FACTS, JS_FMT, JS_MIN, STEPS } from './script'

const SAMPLES = [
  'const x = () => {}',
  '<div>\n  <p>Hi</p>\n</div>',
  '.btn {\n  color: red;\n}',
  '# Title\n\n- item',
  'Detected: CSS',
  'a{b:c}',
]

const config: StoryConfig = {
  problem: {
    variant: 'scramble',
    text: 'Production code arrives as one unreadable line. Debugging it should not start with counting braces.',
    accent: ['one unreadable line.'],
    compare: 'wipe',
    bleed: true,
    beforeLabel: 'Minified',
    afterLabel: 'Formatted',
    before: (
      <p className="h-full break-all p-8 pt-16 font-mono text-sm leading-relaxed text-muted">
        {JS_MIN.repeat(14)}
      </p>
    ),
    after: (
      <div className="flex h-full items-center justify-center bg-elevated">
        <Code code={JS_FMT} className="border-0 bg-transparent text-base md:text-lg" />
      </div>
    ),
  },
  walk: { title: 'Paste, format,', em: 'ship', steps: STEPS, flip: true },
  features: {
    layout: 'reel',
    title: 'One shortcut,',
    em: 'four languages',
    details: DETAILS,
    visuals: SAMPLES.map((sample) => (
      <pre key={sample} className="font-mono text-xs leading-relaxed text-ink-soft">
        {sample}
      </pre>
    )),
  },
  uses: { layout: 'tilt', title: 'Untangle it', em: 'where you found it' },
  facts: FACTS,
  backdrop: { kind: 'shader-flow', at: 'uses' },
}

export default function Story({ features, useCases }: StoryProps) {
  return <StoryLayout config={config} demo={<Demo />} features={features} useCases={useCases} />
}
