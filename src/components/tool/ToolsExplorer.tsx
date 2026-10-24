'use client'

import { LayoutGridIcon, SearchIcon, XIcon } from 'lucide-react'
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'

import { Keycap } from '@/components/ui/primitives'
import { ToolIcon } from '@/components/ui/ToolIcon'
import { cn } from '@/lib/cn'
import { searchTools } from '@/lib/search'
import type { Tool } from '@/lib/types'
import { Flip, gsap, prefersReducedMotion } from '@/motion/gsap'

import { ToolCard } from './ToolCard'

export interface ExplorerCategory {
  id: string
  name: string
  icon: string
  accent: string
  count: number
}

interface ToolsExplorerProps {
  tools: Tool[]
  categories: ExplorerCategory[]
}

function isTypingTarget(target: EventTarget | null) {
  return target instanceof HTMLElement && (target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName))
}

export function ToolsExplorer({ tools, categories }: ToolsExplorerProps) {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('all')
  const gridRef = useRef<HTMLUListElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const flipState = useRef<Flip.FlipState | null>(null)
  const categoryNames = useMemo(() => Object.fromEntries(categories.map((item) => [item.id, item.name])), [categories])

  const results = useMemo(() => {
    const pool = category === 'all' ? tools : tools.filter((tool) => tool.category === category)
    return searchTools(pool, query)
  }, [tools, category, query])

  const ordered = useMemo(() => {
    if (!query.trim()) return tools
    const visible = new Set(results.map((tool) => tool.id))
    return [...results, ...tools.filter((tool) => !visible.has(tool.id))]
  }, [tools, results, query])
  const visibleIds = useMemo(() => new Set(results.map((tool) => tool.id)), [results])

  const captureFlip = useCallback(() => {
    if (prefersReducedMotion() || !gridRef.current) return
    flipState.current = Flip.getState(gridRef.current.querySelectorAll('[data-flip-item]'))
  }, [])

  const updateQuery = (value: string) => {
    captureFlip()
    setQuery(value)
  }
  const updateCategory = (value: string) => {
    captureFlip()
    setCategory(value)
  }

  useLayoutEffect(() => {
    const state = flipState.current
    if (!state || !gridRef.current) return
    flipState.current = null
    Flip.from(state, {
      duration: 0.65,
      ease: 'expo.out',
      scale: true,
      absolute: true,
      nested: true,
      onEnter: (elements) => gsap.fromTo(elements, { opacity: 0, scale: 0.92 }, { opacity: 1, scale: 1, duration: 0.5, ease: 'expo.out' }),
      onLeave: (elements) => gsap.to(elements, { opacity: 0, scale: 0.92, duration: 0.3, ease: 'power2.in' }),
    })
  }, [ordered, visibleIds])

  // Read ?q= and ?category= once on mount; static export has no server-side search params.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const initialQuery = params.get('q') ?? ''
    const initialCategory = params.get('category') ?? 'all'
    /* eslint-disable react-hooks/set-state-in-effect -- one-time sync from the URL after hydration */
    if (initialQuery) setQuery(initialQuery)
    if (initialCategory !== 'all' && categories.some((item) => item.id === initialCategory)) setCategory(initialCategory)
    /* eslint-enable react-hooks/set-state-in-effect */
  }, [categories])

  useEffect(() => {
    const params = new URLSearchParams()
    if (query.trim()) params.set('q', query.trim())
    if (category !== 'all') params.set('category', category)
    const search = params.toString()
    const next = `${window.location.pathname}${search ? `?${search}` : ''}`
    if (next !== `${window.location.pathname}${window.location.search}`) window.history.replaceState(null, '', next)
  }, [query, category])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== '/' || isTypingTarget(event.target)) return
      event.preventDefault()
      inputRef.current?.focus()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const pills = [{ id: 'all', name: 'All', icon: '', accent: '#f4f4f6', count: tools.length }, ...categories]

  return (
    <div>
      <div className="sticky top-[calc(var(--header-h)+0.75rem)] z-20 -mx-2 rounded-[28px] border border-line bg-canvas/85 p-2 backdrop-blur-xl">
        <label className="flex items-center gap-3 rounded-[22px] bg-surface px-5 focus-within:outline focus-within:outline-2 focus-within:outline-cyan">
          <SearchIcon aria-hidden="true" className="size-5 text-muted" />
          <span className="sr-only">Search tools</span>
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(event) => updateQuery(event.target.value)}
            placeholder={`Search ${tools.length} tools — try “jwt”, “contrast” or “screenshot”`}
            className="h-16 flex-1 bg-transparent text-lg text-ink outline-none placeholder:text-muted [&::-webkit-search-cancel-button]:hidden"
          />
          {query ? (
            <button
              type="button"
              aria-label="Clear search"
              onClick={() => {
                updateQuery('')
                inputRef.current?.focus()
              }}
              className="flex size-8 items-center justify-center rounded-full text-muted hover:bg-white/10 hover:text-ink"
            >
              <XIcon aria-hidden="true" className="size-4" />
            </button>
          ) : (
            <span aria-hidden="true" className="hidden sm:inline-flex">
              <Keycap>/</Keycap>
            </span>
          )}
        </label>
        <div role="group" aria-label="Filter by category" className="no-scrollbar mt-2 flex gap-1.5 overflow-x-auto px-1 pb-1">
          {pills.map((pill) => {
            const selected = category === pill.id
            return (
              <button
                key={pill.id}
                type="button"
                aria-pressed={selected}
                onClick={() => updateCategory(pill.id)}
                className={cn(
                  'flex shrink-0 items-center gap-2 rounded-full border px-3.5 py-2 text-sm transition-colors duration-300',
                  selected ? 'border-transparent bg-ink text-canvas' : 'border-line text-ink-soft hover:border-line-strong hover:text-ink',
                )}
              >
                {pill.id === 'all' ? (
                  <LayoutGridIcon aria-hidden="true" className="size-3.5" strokeWidth={2} />
                ) : (
                  <ToolIcon name={pill.icon} className="size-3.5" style={selected ? undefined : { color: pill.accent }} strokeWidth={2} />
                )}
                {pill.name}
                <span className={cn('font-mono text-[10.5px]', selected ? 'text-canvas/60' : 'text-muted')}>{pill.count}</span>
              </button>
            )
          })}
        </div>
      </div>

      <p aria-live="polite" className="mt-8 font-mono text-xs uppercase tracking-[0.2em] text-muted">
        {results.length === tools.length ? `All ${tools.length} tools` : `${results.length} of ${tools.length} tools`}
        {query.trim() ? ` matching “${query.trim()}”` : ''}
      </p>

      <ul ref={gridRef} className="relative mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {ordered.map((tool) => (
          <li
            key={tool.id}
            data-flip-item=""
            data-flip-id={tool.id}
            style={visibleIds.has(tool.id) ? undefined : { display: 'none' }}
          >
            <ToolCard tool={tool} categoryName={categoryNames[tool.category]} size="sm" />
          </li>
        ))}
      </ul>

      {results.length === 0 ? (
        <div className="mt-6 rounded-3xl border border-dashed border-line-strong p-12 text-center">
          <p className="text-2xl font-medium tracking-tight">Nothing matches “{query}”.</p>
          <p className="mt-2 text-muted">Try a shorter word, or search across every category.</p>
          <button
            type="button"
            onClick={() => {
              updateQuery('')
              updateCategory('all')
            }}
            className="mt-6 rounded-full border border-line-strong px-5 py-2.5 text-sm hover:bg-white/5"
          >
            Reset filters
          </button>
        </div>
      ) : null}
    </div>
  )
}
