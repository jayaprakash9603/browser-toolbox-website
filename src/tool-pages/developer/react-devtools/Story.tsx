'use client'

import { StoryLayout, type StoryConfig, type StoryProps } from '@/components/tool/story'

import Demo from './Demo'
import { DETAILS, FACTS, FLAME, STEPS, TREE } from './script'

const config: StoryConfig = {
  problem: {
    variant: 'scrub',
    text: 'The page feels slow, the console says nothing, and the DevTools window just covered your app.',
    accent: ['covered your app.'],
    compare: 'split',
    beforeLabel: 'Console',
    afterLabel: 'Component tree',
    before: (
      <pre className="font-mono text-xs leading-relaxed text-muted">
        {
          '> render CartItem\n> render CartItem\n> render CartItem\n> render CartItem\n> render CartItem\n> …'
        }
      </pre>
    ),
    after: (
      <div className="space-y-1 font-mono text-sm">
        {TREE.map((node, index) => (
          <p
            key={index}
            className={index >= 3 && index <= 5 ? 'text-amber' : 'text-[#c4b5fd]'}
            style={{ paddingLeft: node.depth * 18 }}
          >
            {node.name}
          </p>
        ))}
      </div>
    ),
  },
  walk: { title: 'From tree to', em: 'root cause', steps: STEPS, flip: true },
  features: {
    layout: 'stack',
    title: 'Every React panel,',
    em: 'docked beside the page',
    details: DETAILS,
    visuals: [
      <p key="a" className="font-mono text-sm text-[#c4b5fd]">
        {'<App> › <Cart> › <CartItem>'}
      </p>,
      <div key="b" className="w-48 space-y-1">
        {FLAME.slice(0, 3).map((bar) => (
          <span
            key={bar.name}
            className="block h-3 rounded"
            style={{
              width: `${bar.width}%`,
              background: bar.hot ? 'rgba(251,191,36,0.8)' : 'rgba(99,102,241,0.7)',
            }}
          />
        ))}
      </div>,
      <p key="c" className="font-mono text-sm">
        &lt;Suspense&gt; <span className="text-emerald">resolved</span>
      </p>,
      <p key="d" className="font-mono text-sm text-cyan">
        {'<li class="item">'}
      </p>,
      <div key="e" className="flex gap-1.5">
        {['#6366f1', '#818cf8', '#c4b5fd'].map((color) => (
          <span key={color} className="size-6 rounded-full" style={{ background: color }} />
        ))}
      </div>,
    ],
  },
  uses: { layout: 'timeline', title: 'From a slow click', em: 'to a fix' },
  facts: FACTS,
  backdrop: { kind: 'beams', at: 'features' },
}

export default function Story({ features, useCases }: StoryProps) {
  return <StoryLayout config={config} demo={<Demo />} features={features} useCases={useCases} />
}
