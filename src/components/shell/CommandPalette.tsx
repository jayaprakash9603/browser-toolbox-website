'use client'

import { Command } from 'cmdk'
import { ArrowRightIcon, FileTextIcon, HomeIcon, LayoutGridIcon, LockIcon, SearchIcon } from 'lucide-react'
import { useEffect, useState } from 'react'

import { Keycap } from '@/components/ui/primitives'
import { ToolIcon } from '@/components/ui/ToolIcon'
import { categoryHref, toolHref } from '@/lib/routes'
import { useTransitionNavigate } from '@/motion/TransitionProvider'

import type { ShellCategory, ShellTool } from './shellData'

export const PALETTE_EVENT = 'btx:open-palette'

export function openCommandPalette() {
  window.dispatchEvent(new CustomEvent(PALETTE_EVENT))
}

const PAGES = [
  { href: '/', label: 'Home', icon: HomeIcon },
  { href: '/tools/', label: 'All tools', icon: LayoutGridIcon },
  { href: '/privacy/', label: 'Privacy policy', icon: LockIcon },
  { href: '/permissions/', label: 'Permissions explained', icon: FileTextIcon },
]

const itemClass =
  'group flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-ink-soft data-[selected=true]:bg-white/[0.07] data-[selected=true]:text-ink'

export function CommandPalette({ tools, categories }: { tools: ShellTool[]; categories: ShellCategory[] }) {
  const [open, setOpen] = useState(false)
  const navigate = useTransitionNavigate()

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === 'k' && (event.metaKey || event.ctrlKey)) {
        event.preventDefault()
        setOpen((value) => !value)
      }
    }
    const onOpen = () => setOpen(true)
    window.addEventListener('keydown', onKey)
    window.addEventListener(PALETTE_EVENT, onOpen)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener(PALETTE_EVENT, onOpen)
    }
  }, [])

  const go = (href: string, label?: string) => {
    setOpen(false)
    navigate(href, { label })
  }

  return (
    <Command.Dialog
      open={open}
      onOpenChange={setOpen}
      label="Search tools"
      loop
      overlayClassName="fixed inset-0 z-[95] bg-canvas/70 backdrop-blur-md data-[state=open]:animate-[palette-fade_240ms_var(--ease-out-expo)]"
      contentClassName="fixed left-1/2 top-[12vh] z-[96] w-[min(640px,calc(100vw-2rem))] -translate-x-1/2 overflow-hidden rounded-3xl border border-line-strong bg-surface/95 shadow-[0_40px_120px_-20px_rgb(0_0_0/0.8),0_0_0_1px_rgb(99_102_241/0.15)] data-[state=open]:animate-[palette-in_420ms_var(--ease-out-expo)]"
    >
      <div className="flex items-center gap-3 border-b border-line px-5">
        <SearchIcon aria-hidden="true" className="size-5 text-muted" />
        <Command.Input
          autoFocus
          placeholder={`Search ${tools.length} tools…`}
          className="h-16 w-full bg-transparent text-base text-ink outline-none placeholder:text-muted"
        />
        <Keycap>Esc</Keycap>
      </div>
      <Command.List className="max-h-[min(60vh,520px)] overflow-y-auto overscroll-contain p-2" data-lenis-prevent="">
        <Command.Empty className="px-4 py-10 text-center text-sm text-muted">No tool matches that. Try “json” or “color”.</Command.Empty>
        <Command.Group heading="Pages" className="[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:pb-1 [&_[cmdk-group-heading]]:pt-3 [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:text-[10.5px] [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-[0.2em] [&_[cmdk-group-heading]]:text-muted">
          {PAGES.map((page) => (
            <Command.Item key={page.href} value={page.label} onSelect={() => go(page.href, page.label)} className={itemClass}>
              <page.icon aria-hidden="true" className="size-4 text-muted group-data-[selected=true]:text-cyan" />
              <span className="flex-1">{page.label}</span>
              <ArrowRightIcon aria-hidden="true" className="size-4 opacity-0 group-data-[selected=true]:opacity-100" />
            </Command.Item>
          ))}
        </Command.Group>
        {categories.map((category) => (
          <Command.Group
            key={category.id}
            heading={category.name}
            className="[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:pb-1 [&_[cmdk-group-heading]]:pt-3 [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:text-[10.5px] [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-[0.2em] [&_[cmdk-group-heading]]:text-muted"
          >
            <Command.Item
              value={`${category.name} category`}
              keywords={['category', category.id]}
              onSelect={() => go(categoryHref(category.id), category.name)}
              className={itemClass}
            >
              <ToolIcon name={category.icon} className="size-4" style={{ color: category.accent }} />
              <span className="flex-1">All {category.name} tools</span>
              <span className="font-mono text-xs text-muted">{category.count}</span>
            </Command.Item>
            {tools
              .filter((tool) => tool.category === category.id)
              .map((tool) => (
                <Command.Item
                  key={tool.id}
                  value={`${tool.name} ${tool.id}`}
                  keywords={tool.keywords}
                  onSelect={() => go(toolHref(tool), tool.name)}
                  className={itemClass}
                >
                  <ToolIcon name={tool.icon} className="size-4 text-muted group-data-[selected=true]:text-ink" />
                  <span className="flex-1">{tool.name}</span>
                  <span className="hidden font-mono text-[10.5px] uppercase tracking-[0.16em] text-muted sm:inline">
                    {tool.categoryName}
                  </span>
                </Command.Item>
              ))}
          </Command.Group>
        ))}
      </Command.List>
      <div className="flex items-center justify-between border-t border-line px-5 py-3 font-mono text-[11px] text-muted">
        <span className="flex items-center gap-2">
          <Keycap>↑</Keycap>
          <Keycap>↓</Keycap> navigate
        </span>
        <span className="flex items-center gap-2">
          <Keycap>↵</Keycap> open
        </span>
      </div>
    </Command.Dialog>
  )
}
