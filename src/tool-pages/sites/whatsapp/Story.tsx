'use client'

import { StoryLayout, type StoryConfig, type StoryProps } from '@/components/tool/story'

import Demo from './Demo'
import { CHATS, DETAILS, FACTS, STEPS } from './script'

function ChatList({ blur }: { blur?: boolean }) {
  const style = blur ? { filter: 'blur(5px)' } : undefined
  return (
    <div className="w-64 space-y-1 rounded-xl bg-[#111b21] p-2 text-left text-[#e9edef]">
      {CHATS.slice(0, 4).map((chat) => (
        <div key={chat.name} className="flex items-center gap-2 rounded-lg px-2 py-1.5">
          <span
            className="size-8 shrink-0 rounded-full"
            style={{ background: chat.color, ...style }}
          />
          <span className="min-w-0">
            <span className="block text-xs font-medium" style={style}>
              {chat.name}
            </span>
            <span className="block truncate text-[11px] text-white/50" style={style}>
              {chat.preview}
            </span>
          </span>
        </div>
      ))}
    </div>
  )
}

const config: StoryConfig = {
  problem: {
    variant: 'scramble',
    text: 'You share your screen for a demo, and your whole chat list comes along.',
    accent: ['whole chat list'],
    compare: 'split',
    beforeLabel: 'WhatsApp Web',
    afterLabel: 'Private Mode on',
    before: <ChatList />,
    after: <ChatList blur />,
  },
  walk: { title: 'More from', em: 'WhatsApp Web', steps: STEPS, flip: true },
  features: { layout: 'bento', title: 'Five toolkits,', em: 'one drawer', details: DETAILS },
  uses: { layout: 'timeline', title: 'Chat in', em: 'private' },
  facts: FACTS,
  backdrop: { kind: 'aurora', at: 'features' },
}

export default function Story({ features, useCases }: StoryProps) {
  return <StoryLayout config={config} demo={<Demo />} features={features} useCases={useCases} />
}
