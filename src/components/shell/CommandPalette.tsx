'use client'

import { Command, defaultFilter, useCommandState } from 'cmdk'
import {
  ArrowRightIcon,
  FileTextIcon,
  HomeIcon,
  LayoutGridIcon,
  LockIcon,
  ScaleIcon,
  SearchIcon,
  SearchXIcon,
  XIcon,
  type LucideIcon,
} from 'lucide-react'
import { useEffect, useMemo, useState, type CSSProperties, type ReactNode } from 'react'

import { Keycap } from '@/components/ui/primitives'
import { ToolIcon } from '@/components/ui/ToolIcon'
import { categoryHref, toolHref } from '@/lib/routes'
import { useLenis } from '@/motion/SmoothScroll'
import { useTransitionNavigate } from '@/motion/TransitionProvider'

import type { ShellCategory, ShellTool } from './shellData'

export const PALETTE_EVENT = 'btx:open-palette'

export function openCommandPalette() {
  window.dispatchEvent(new CustomEvent(PALETTE_EVENT))
}

const PAGES: { href: string; label: string; icon: LucideIcon }[] = [
  { href: '/', label: 'Home', icon: HomeIcon },
  { href: '/tools/', label: 'All tools', icon: LayoutGridIcon },
  { href: '/privacy/', label: 'Privacy policy', icon: LockIcon },
  { href: '/terms/', label: 'Terms and conditions', icon: ScaleIcon },
  { href: '/permissions/', label: 'Permissions explained', icon: FileTextIcon },
]

interface Entry {
  key: string
  kind: 'page' | 'category' | 'tool'
  label: string
  /** Text that is ranked against the query; kept unique because cmdk uses it as the item id. */
  value: string
  keywords: string[]
  href: string
  accent: string
  icon: LucideIcon | string
  meta?: string
  group: string
}

const itemClass =
  'group relative flex min-h-11 cursor-pointer items-center gap-3 rounded-xl px-3 py-2 text-sm text-ink-soft transition-colors duration-150 ' +
  'before:absolute before:inset-y-2.5 before:left-0 before:w-[3px] before:rounded-full before:bg-(--item-accent) before:opacity-0 before:transition-opacity before:duration-150 ' +
  'data-[selected=true]:bg-white/[0.07] data-[selected=true]:text-ink data-[selected=true]:shadow-[inset_0_0_0_1px_rgb(255_255_255/0.06)] data-[selected=true]:before:opacity-100 ' +
  'motion-reduce:transition-none motion-reduce:before:transition-none'

const groupClass =
  '[&_[cmdk-group-heading]]:sticky [&_[cmdk-group-heading]]:top-0 [&_[cmdk-group-heading]]:z-10 [&_[cmdk-group-heading]]:-mx-2 [&_[cmdk-group-heading]]:bg-surface [&_[cmdk-group-heading]]:px-5 [&_[cmdk-group-heading]]:pb-1.5 [&_[cmdk-group-heading]]:pt-3 [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:text-[11px] [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-[0.2em] [&_[cmdk-group-heading]]:text-muted'

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function tokenize(search: string) {
  return search.trim().toLowerCase().split(/\s+/).filter(Boolean)
}

/** Real matches first; loose fuzzy hits only when they are strong, so every result visibly relates to the query. */
function rank(entry: Entry, search: string) {
  const query = search.trim().toLowerCase()
  const text = entry.value.toLowerCase()
  if (text.startsWith(query)) return 1
  if (new RegExp(`(^|[\\s./&-])${escapeRegExp(query)}`).test(text)) return 0.9
  if (text.includes(query)) return 0.8
  const tokens = tokenize(search)
  if (tokens.every((token) => text.includes(token))) return 0.7
  const tags = entry.keywords.map((keyword) => keyword.toLowerCase())
  const wordStart = (token: string) => tags.some((tag) => tag.split(/[\s-]+/).some((word) => word.startsWith(token)))
  if (tokens.every((token) => text.includes(token) || wordStart(token))) return 0.6
  const fuzzy = defaultFilter(entry.label, search, [])
  return fuzzy >= 0.3 ? fuzzy * 0.5 : 0
}

function matchedKeyword(entry: Entry, tokens: string[]) {
  const label = entry.label.toLowerCase()
  if (tokens.some((token) => label.includes(token))) return undefined
  return entry.keywords.find((keyword) => tokens.some((token) => keyword.toLowerCase().includes(token)))
}

function Highlight({ text, pattern }: { text: string; pattern: RegExp | null }) {
  if (!pattern) return text
  const parts = text.split(pattern)
  if (parts.length === 1) return text
  return parts.map((part, index) =>
    index % 2 === 1 ? (
      <mark key={index} className="rounded-[4px] bg-cyan/15 px-px text-ink">
        {part}
      </mark>
    ) : (
      part
    ),
  )
}

function ResultCount() {
  const count = useCommandState((state) => state.filtered.count)
  return (
    <span aria-live="polite">
      {count} {count === 1 ? 'result' : 'results'}
    </span>
  )
}

function Hint({ keys, children }: { keys: string[]; children: ReactNode }) {
  return (
    <span className="flex items-center gap-1.5">
      {keys.map((key) => (
        <Keycap key={key}>{key}</Keycap>
      ))}
      <span className="ml-0.5">{children}</span>
    </span>
  )
}

function PaletteItem({
  entry,
  pattern,
  tokens,
  onSelect,
}: {
  entry: Entry
  pattern: RegExp | null
  tokens: string[]
  onSelect: (entry: Entry) => void
}) {
  const keyword = entry.kind === 'tool' && tokens.length ? matchedKeyword(entry, tokens) : undefined
  const iconClass =
    entry.kind === 'category'
      ? 'size-4 shrink-0 text-(--item-accent)'
      : 'size-4 shrink-0 text-muted transition-colors group-data-[selected=true]:text-(--item-accent)'
  return (
    <Command.Item
      value={entry.value}
      onSelect={() => onSelect(entry)}
      className={itemClass}
      style={{ '--item-accent': entry.accent } as CSSProperties}
    >
      {typeof entry.icon === 'string' ? (
        <ToolIcon name={entry.icon} className={iconClass} />
      ) : (
        <entry.icon aria-hidden="true" className={iconClass} />
      )}
      <span className="min-w-0 flex-1 truncate">
        <Highlight text={entry.label} pattern={pattern} />
      </span>
      {keyword ? (
        <span className="hidden max-w-[45%] truncate font-mono text-[11px] text-muted sm:inline">
          <Highlight text={keyword} pattern={pattern} />
        </span>
      ) : entry.meta ? (
        <span
          className={
            entry.kind === 'category'
              ? 'font-mono text-xs text-muted'
              : 'hidden font-mono text-[11px] uppercase tracking-[0.16em] text-muted sm:inline'
          }
        >
          {entry.meta}
        </span>
      ) : null}
      {entry.kind === 'page' ? (
        <ArrowRightIcon
          aria-hidden="true"
          className="size-4 shrink-0 -translate-x-1 opacity-0 transition-[opacity,translate] duration-150 group-data-[selected=true]:translate-x-0 group-data-[selected=true]:opacity-100 motion-reduce:transition-none"
        />
      ) : null}
    </Command.Item>
  )
}

export function CommandPalette({ tools, categories }: { tools: ShellTool[]; categories: ShellCategory[] }) {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const navigate = useTransitionNavigate()
  const lenis = useLenis()

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === 'k' && (event.metaKey || event.ctrlKey)) {
        event.preventDefault()
        setSearch('')
        setOpen((value) => !value)
      }
    }
    const onOpen = () => {
      setSearch('')
      setOpen(true)
    }
    window.addEventListener('keydown', onKey)
    window.addEventListener(PALETTE_EVENT, onOpen)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener(PALETTE_EVENT, onOpen)
    }
  }, [])

  useEffect(() => {
    if (!open || !lenis) return
    lenis.stop()
    return () => lenis.start()
  }, [open, lenis])

  const groups = useMemo(() => {
    const pages: Entry[] = PAGES.map((page) => ({
      key: `page:${page.href}`,
      kind: 'page',
      label: page.label,
      value: page.label,
      keywords: [],
      href: page.href,
      accent: 'var(--color-cyan)',
      icon: page.icon,
      group: 'Pages',
    }))
    const sections = categories.map((category) => {
      const all: Entry = {
        key: `category:${category.id}`,
        kind: 'category',
        label: `All ${category.name} tools`,
        value: `${category.name} tools`,
        keywords: [category.id],
        href: categoryHref(category.id),
        accent: category.accent,
        icon: category.icon,
        meta: String(category.count),
        group: category.name,
      }
      const items = tools
        .filter((tool) => tool.category === category.id)
        .map<Entry>((tool) => ({
          key: `tool:${tool.id}`,
          kind: 'tool',
          label: tool.name,
          value: `${tool.name} ${tool.id}`,
          keywords: tool.keywords,
          href: toolHref(tool),
          accent: category.accent,
          icon: tool.icon,
          meta: tool.categoryName,
          group: category.name,
        }))
      return { heading: category.name, entries: [all, ...items] }
    })
    return [{ heading: 'Pages', entries: pages }, ...sections]
  }, [tools, categories])

  const tokens = useMemo(() => tokenize(search), [search])

  const pattern = useMemo(
    () => (tokens.length ? new RegExp(`(${tokens.map(escapeRegExp).join('|')})`, 'gi') : null),
    [tokens],
  )

  const results = useMemo(() => {
    if (!tokens.length) return null
    return groups
      .flatMap((group) => group.entries)
      .map((entry, order) => ({ entry, order, score: rank(entry, search) }))
      .filter((result) => result.score > 0)
      .sort((a, b) => b.score - a.score || a.order - b.order)
      .map((result) => result.entry)
  }, [groups, tokens, search])

  const close = () => {
    setOpen(false)
    setSearch('')
  }

  const select = (entry: Entry) => {
    close()
    navigate(entry.href, { label: entry.kind === 'category' ? entry.group : entry.label })
  }

  return (
    <Command.Dialog
      open={open}
      onOpenChange={(next) => (next ? setOpen(true) : close())}
      label="Search tools"
      shouldFilter={false}
      loop
      overlayClassName="fixed inset-0 z-[95] bg-canvas/70 backdrop-blur-md data-[state=open]:animate-[palette-fade_240ms_var(--ease-out-expo)] motion-reduce:animate-none"
      contentClassName="fixed left-1/2 top-[12vh] z-[96] flex w-[min(640px,calc(100vw-2rem))] -translate-x-1/2 flex-col overflow-hidden rounded-3xl border border-line-strong bg-surface/95 shadow-[0_40px_120px_-20px_rgb(0_0_0/0.8),0_0_0_1px_rgb(99_102_241/0.15)] data-[state=open]:animate-[palette-in_420ms_var(--ease-out-expo)] motion-reduce:animate-none"
    >
      <div className="group/search relative flex items-center gap-3 border-b border-line pl-5 pr-3 after:pointer-events-none after:absolute after:inset-x-5 after:-bottom-px after:h-px after:bg-[linear-gradient(90deg,transparent,var(--color-cyan),transparent)] after:opacity-0 after:transition-opacity after:duration-300 focus-within:after:opacity-100 motion-reduce:after:transition-none">
        <SearchIcon
          aria-hidden="true"
          className="size-5 shrink-0 text-muted transition-colors duration-200 group-focus-within/search:text-cyan"
        />
        <Command.Input
          autoFocus
          value={search}
          onValueChange={setSearch}
          placeholder={`Search ${tools.length} tools…`}
          className="h-16 w-full min-w-0 bg-transparent text-base text-ink caret-cyan placeholder:text-muted"
        />
        <button
          type="button"
          onClick={close}
          aria-label="Close search"
          className="grid size-11 shrink-0 place-items-center rounded-xl text-muted transition-colors hover:bg-white/[0.06] hover:text-ink"
        >
          <Keycap className="hidden sm:inline-flex">Esc</Keycap>
          <XIcon aria-hidden="true" className="size-5 sm:hidden" />
        </button>
      </div>

      <Command.List
        data-lenis-prevent=""
        className="h-[calc(var(--cmdk-list-height)+0.5rem)] max-h-[min(60vh,520px)] scroll-pb-2 scroll-pt-10 overflow-y-auto overscroll-contain px-2 pb-2 transition-[height] duration-200 ease-out motion-reduce:transition-none"
      >
        <Command.Empty className="flex flex-col items-center gap-3 px-4 py-12 text-center text-sm text-muted">
          <SearchXIcon aria-hidden="true" className="size-6" strokeWidth={1.6} />
          <p>
            Nothing matches <span className="text-ink">“{search.trim()}”</span>.
            <br />
            Try “json”, “color” or “screenshot”.
          </p>
        </Command.Empty>
        {results ? (
          results.length ? (
            <Command.Group heading="Best matches" className={groupClass}>
              {results.map((entry) => (
                <PaletteItem key={entry.key} entry={entry} pattern={pattern} tokens={tokens} onSelect={select} />
              ))}
            </Command.Group>
          ) : null
        ) : (
          groups.map((group) => (
            <Command.Group key={group.heading} heading={group.heading} className={groupClass}>
              {group.entries.map((entry) => (
                <PaletteItem key={entry.key} entry={entry} pattern={null} tokens={tokens} onSelect={select} />
              ))}
            </Command.Group>
          ))
        )}
      </Command.List>

      <div className="flex items-center justify-between gap-4 border-t border-line px-5 py-3 font-mono text-[11px] text-muted">
        <ResultCount />
        <span className="hidden items-center gap-4 sm:flex">
          <Hint keys={['↑', '↓']}>navigate</Hint>
          <Hint keys={['↵']}>open</Hint>
        </span>
      </div>
    </Command.Dialog>
  )
}
