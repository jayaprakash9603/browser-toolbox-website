'use client'

import { StoryLayout, type StoryConfig, type StoryProps } from '@/components/tool/story'

import Demo from './Demo'
import { COPY, DETAILS, FACTS, LOOKALIKE, STEPS } from './script'

function Address() {
  return (
    <p className="rounded-full bg-black/5 px-4 py-2 font-mono text-base text-[#0f172a]">
      https://paypa<span className="rounded bg-[#fecaca] px-0.5 text-[#b91c1c]">1</span>
      .com/signin
    </p>
  )
}

function Login() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-6 bg-[#f8fafc] p-8 text-[#0f172a]">
      <Address />
      <div className="w-72 rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
        <p className="text-xl font-bold">Log in to your account</p>
        <span className="mt-4 block h-9 rounded-lg border border-black/15" />
        <span className="mt-3 block h-9 rounded-lg border border-black/15" />
        <span className="mt-4 flex h-9 items-center justify-center rounded-full bg-[#1d4ed8] text-sm font-semibold text-white">
          Log in
        </span>
      </div>
    </div>
  )
}

function Warning() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-6 bg-black/60 p-8">
      <div className="max-w-sm rounded-2xl bg-white p-6 text-[#0f172a] shadow-2xl">
        <p className="text-xl font-bold text-[#b91c1c]">{COPY.lookalikeTitle}</p>
        <p className="mt-2 text-sm leading-relaxed text-black/70">{COPY.lookalikeBody}</p>
        <div className="mt-4 flex gap-2 text-sm">
          <span className="rounded-lg bg-[#b91c1c] px-3 py-1.5 font-semibold text-white">
            Leave this site
          </span>
          <span className="rounded-lg border border-black/15 px-3 py-1.5 text-black/70">
            I trust this site
          </span>
        </div>
      </div>
    </div>
  )
}

const config: StoryConfig = {
  problem: {
    variant: 'scramble',
    text: 'A fake sign-in page can look exactly like the real one. Often the only difference is a single character in the address.',
    accent: ['a single character'],
    compare: 'split',
    height: '28rem',
    beforeLabel: `What ${LOOKALIKE.host} shows`,
    afterLabel: 'What Web Protection shows',
    before: <Login />,
    after: <Warning />,
  },
  walk: { title: 'Threats stopped', em: 'before you type', steps: STEPS, flip: true },
  features: { layout: 'bento', title: 'Layers that are', em: 'already on', details: DETAILS },
  uses: { layout: 'timeline', title: 'For the clicks', em: 'you didn’t mean' },
  facts: FACTS,
  backdrop: { kind: 'shader-flow', at: 'problem' },
}

export default function Story({ features, useCases }: StoryProps) {
  return <StoryLayout config={config} demo={<Demo />} features={features} useCases={useCases} />
}
