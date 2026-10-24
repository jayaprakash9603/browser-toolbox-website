'use client'

import { ChevronRightIcon, ClipboardPasteIcon, CommandIcon, MousePointerClickIcon, PaletteIcon, SearchIcon, TerminalSquareIcon } from 'lucide-react'
import { useRef, type CSSProperties, type ReactNode } from 'react'

import { ChapterLabel, Keycap } from '@/components/ui/primitives'
import { ToolIcon } from '@/components/ui/ToolIcon'
import { gsap, MOTION_QUERIES, useDeferredGSAP } from '@/motion/gsap'
import { SplitReveal } from '@/motion/SplitReveal'

function PaletteVisual() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="flex justify-center gap-2 text-lg">
        {['Ctrl', 'Shift', 'Space'].map((key) => (
          <Keycap key={key} className="px-3 py-2 text-sm [&[data-pressed]]:translate-y-0.5 [&[data-pressed]]:border-cyan [&[data-pressed]]:text-cyan">
            <span data-key="">{key}</span>
          </Keycap>
        ))}
      </div>
      <div data-palette="" className="overflow-hidden rounded-2xl border border-line-strong bg-canvas/90 shadow-2xl">
        <div className="flex items-center gap-2 border-b border-line px-3 py-2.5 font-mono text-xs">
          <SearchIcon aria-hidden="true" className="size-3.5 text-muted" />
          <span data-typed="" className="text-ink">
            jwt
          </span>
          <span className="h-3.5 w-px animate-pulse bg-cyan" />
        </div>
        {[
          ['TicketIcon', 'JWT Toolkit', 'Security'],
          ['BinaryIcon', 'Encoder / Decoder', 'Security'],
          ['BracesIcon', 'JSON Toolkit', 'Developer'],
        ].map(([icon, name, category], index) => (
          <div
            key={name}
            data-result=""
            className={`flex items-center gap-2.5 px-3 py-2 text-xs ${index === 0 ? 'bg-white/[0.06] text-ink' : 'text-ink-soft'}`}
          >
            <ToolIcon name={icon} className="size-3.5" />
            <span className="flex-1">{name}</span>
            <span className="font-mono text-[10px] text-muted">{category}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function SmartPasteVisual() {
  return (
    <div className="w-full max-w-sm space-y-3">
      <div data-clip="" className="rounded-2xl border border-line-strong bg-canvas/90 p-3">
        <p className="mb-2 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
          <ClipboardPasteIcon aria-hidden="true" className="size-3.5" /> On your clipboard
        </p>
        <p className="break-all font-mono text-[11px] leading-relaxed text-ink-soft">
          eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZGEiLCJleHAiOjE3OTk5OTk5OTl9.Qm9v…
        </p>
      </div>
      <div className="flex flex-wrap gap-2">
        {['JWT detected', 'Base64 segments', 'Expires in 2h'].map((label) => (
          <span key={label} data-detect="" className="rounded-full border border-cyan/40 bg-cyan/10 px-3 py-1 font-mono text-[10.5px] text-cyan">
            {label}
          </span>
        ))}
      </div>
      <div data-suggest="" className="flex items-center justify-between rounded-xl bg-ink px-4 py-3 text-sm font-medium text-canvas">
        Open in JWT Toolkit <ChevronRightIcon aria-hidden="true" className="size-4" />
      </div>
    </div>
  )
}

function ContextMenuVisual() {
  return (
    <div className="relative w-full max-w-sm">
      <p className="rounded-lg bg-indigo/25 px-2 py-1 font-mono text-[11px] text-ink">{'{"user":"ada","roles":["admin"]}'}</p>
      <div data-menu="" className="relative ml-10 mt-3 w-56 origin-top-left rounded-xl border border-line-strong bg-elevated p-1.5 text-xs shadow-2xl">
        {['Copy', 'Search Google for “{"user"…”', 'Inspect'].map((item) => (
          <p key={item} data-menu-item="" className="truncate rounded-md px-2.5 py-1.5 text-ink-soft">
            {item}
          </p>
        ))}
        <p data-menu-item="" className="flex items-center justify-between rounded-md bg-white/[0.07] px-2.5 py-1.5 text-ink">
          One Panel <ChevronRightIcon aria-hidden="true" className="size-3.5" />
        </p>
        <div data-submenu="" className="absolute left-[calc(100%+6px)] top-[calc(75%)] w-44 origin-left rounded-xl border border-line-strong bg-elevated p-1.5 shadow-2xl">
          {['Format JSON', 'JSON → CSV', 'Decode Base64', 'Hash SHA-256'].map((item, index) => (
            <p key={item} data-submenu-item="" className={`rounded-md px-2.5 py-1.5 ${index === 0 ? 'bg-indigo/30 text-ink' : 'text-ink-soft'}`}>
              {item}
            </p>
          ))}
        </div>
      </div>
    </div>
  )
}

function DevToolsVisual() {
  return (
    <div data-devtools="" className="w-full max-w-md overflow-hidden rounded-2xl border border-line-strong bg-canvas/90 text-xs shadow-2xl">
      <div className="flex gap-0.5 border-b border-line bg-elevated/80 px-2 pt-2 font-mono text-[10.5px]">
        {['Elements', 'Console', 'Network', '⚛ Components', 'Interceptor'].map((tab, index) => (
          <span
            key={tab}
            data-tab=""
            className={`rounded-t-md px-2.5 py-1.5 ${index === 4 ? 'border-b-2 border-cyan bg-canvas text-ink' : 'text-muted'}`}
          >
            {tab}
          </span>
        ))}
      </div>
      <div className="space-y-1 p-2 font-mono text-[10.5px]">
        {[
          ['GET', '/api/orders', 'mock 200', 'text-emerald'],
          ['POST', '/graphql · GetUser', 'header +x-debug', 'text-cyan'],
          ['GET', 'cdn.acme.dev/app.js', 'redirect → localhost', 'text-amber'],
          ['GET', '/api/flags', 'pass', 'text-muted'],
        ].map(([method, path, rule, tone]) => (
          <div key={path} data-request="" className="flex items-center gap-3 rounded-md px-2 py-1.5 odd:bg-white/[0.03]">
            <span className="w-9 text-muted">{method}</span>
            <span className="flex-1 truncate text-ink-soft">{path}</span>
            <span className={tone}>{rule}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

const PALETTES = [
  ['Indigo', '#6366f1'],
  ['Coral', '#fb7185'],
  ['Ocean', '#0ea5e9'],
  ['Emerald', '#10b981'],
  ['Sunset', '#f59e0b'],
  ['Graphite', '#94a3b8'],
]

function ThemesVisual() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <div data-theme-preview="" className="rounded-2xl border border-line-strong bg-canvas/90 p-4" style={{ '--theme': '#6366f1' } as CSSProperties}>
        <div className="flex items-center gap-2">
          <span className="size-8 rounded-lg bg-[var(--theme)] transition-colors duration-500" />
          <div className="flex-1 space-y-1.5">
            <span className="block h-2 w-2/3 rounded-full bg-white/25" />
            <span className="block h-2 w-1/3 rounded-full bg-white/10" />
          </div>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2">
          {[0, 1, 2].map((tile) => (
            <span key={tile} className="h-12 rounded-lg border border-line bg-[color-mix(in_srgb,var(--theme)_18%,transparent)] transition-colors duration-500" />
          ))}
        </div>
      </div>
      <div className="flex justify-between">
        {PALETTES.map(([name, color]) => (
          <span key={name} data-swatch-dot="" data-color={color} className="flex flex-col items-center gap-1.5 font-mono text-[9.5px] text-muted">
            <span className="size-7 rounded-full ring-2 ring-transparent ring-offset-2 ring-offset-canvas transition-shadow" style={{ backgroundColor: color }} />
            {name}
          </span>
        ))}
      </div>
    </div>
  )
}

interface Feature {
  id: string
  title: string
  accent: string
  icon: ReactNode
  body: string
  points: string[]
  visual: ReactNode
  animate: (tl: gsap.core.Timeline, q: (selector: string) => Element[]) => void
}

const FEATURES: Feature[] = [
  {
    id: 'palette',
    title: 'A command palette for your whole browser',
    accent: '#6366f1',
    icon: <CommandIcon aria-hidden="true" className="size-5" />,
    body: 'Hit the shortcut on any page, type a few letters, and jump straight to a tool or one of its tabs.',
    points: ['Fuzzy search over names, aliases and keywords', 'Deep links into a specific tab', 'Favourites and recents on the home screen'],
    visual: <PaletteVisual />,
    animate(tl, q) {
      q('[data-key]').forEach((key, index) => {
        const cap = key.parentElement as HTMLElement
        tl.call(() => cap.setAttribute('data-pressed', ''), [], index * 0.14).call(() => cap.removeAttribute('data-pressed'), [], 0.5 + index * 0.05)
      })
      tl.from(q('[data-palette]'), { y: 24, opacity: 0, scale: 0.96, duration: 0.7 }, 0.45).from(q('[data-result]'), { opacity: 0, x: -10, stagger: 0.08 }, 0.75)
    },
  },
  {
    id: 'smart-paste',
    title: 'Smart paste knows what you copied',
    accent: '#22d3ee',
    icon: <ClipboardPasteIcon aria-hidden="true" className="size-5" />,
    body: 'The home screen reads your clipboard when you ask, recognises JSON, JWTs, URLs, colours, timestamps, XML, YAML and Base64, and suggests the right tool.',
    points: ['Detection runs locally', 'Nothing is read until you click', 'One click to the matching tool'],
    visual: <SmartPasteVisual />,
    animate(tl, q) {
      tl.from(q('[data-clip]'), { y: 20, opacity: 0, duration: 0.6 })
        .from(q('[data-detect]'), { scale: 0.6, opacity: 0, stagger: 0.1, ease: 'back.out(2.4)' }, 0.4)
        .from(q('[data-suggest]'), { y: 16, opacity: 0 }, 0.8)
    },
  },
  {
    id: 'context-menus',
    title: 'Right-click anything, send it to a tool',
    accent: '#f472b6',
    icon: <MousePointerClickIcon aria-hidden="true" className="size-5" />,
    body: 'Selections, links, images and pages get a One Panel submenu. The payload opens in the right tool, already filled in.',
    points: ['Selection, link, image and page menus', 'Opens the side panel pre-filled', 'Save images as JPG, PNG, WebP, GIF or PDF'],
    visual: <ContextMenuVisual />,
    animate(tl, q) {
      tl.from(q('[data-menu]'), { scale: 0.85, opacity: 0, duration: 0.4, ease: 'back.out(1.8)' })
        .from(q('[data-menu-item]'), { opacity: 0, x: -8, stagger: 0.05 }, 0.15)
        .from(q('[data-submenu]'), { scaleX: 0.6, opacity: 0, duration: 0.45 }, 0.55)
        .from(q('[data-submenu-item]'), { opacity: 0, x: -8, stagger: 0.05 }, 0.7)
    },
  },
  {
    id: 'devtools',
    title: 'Lives inside DevTools, too',
    accent: '#34d399',
    icon: <TerminalSquareIcon aria-hidden="true" className="size-5" />,
    body: 'Page-aware tools show up as DevTools panels: themed React DevTools, an HTTP interceptor with mocks and redirects, element and storage inspectors.',
    points: ['React Components, Profiler and Suspense', 'Mock, redirect and rewrite requests', 'Inspect localStorage and sessionStorage'],
    visual: <DevToolsVisual />,
    animate(tl, q) {
      tl.from(q('[data-devtools]'), { y: 24, opacity: 0, duration: 0.6 })
        .from(q('[data-tab]'), { opacity: 0, y: 6, stagger: 0.05 }, 0.2)
        .from(q('[data-request]'), { opacity: 0, x: 16, stagger: 0.1 }, 0.45)
    },
  },
  {
    id: 'themes',
    title: 'Yours, down to the accent colour',
    accent: '#fbbf24',
    icon: <PaletteIcon aria-hidden="true" className="size-5" />,
    body: 'Light, dark or system. Six accent palettes, compact or comfortable density, and keyboard shortcuts you can rebind in Chrome.',
    points: ['Light, dark and system themes', 'Six palettes, two densities', 'Shortcuts for capture, palette and PiP'],
    visual: <ThemesVisual />,
    animate(tl, q) {
      const preview = q('[data-theme-preview]')[0] as HTMLElement | undefined
      tl.from(q('[data-swatch-dot]'), { y: 14, opacity: 0, stagger: 0.06, duration: 0.5 })
      q('[data-swatch-dot]').forEach((dot, index) => {
        tl.call(() => preview?.style.setProperty('--theme', (dot as HTMLElement).dataset.color ?? '#6366f1'), [], 0.5 + index * 0.35)
      })
      tl.call(() => preview?.style.setProperty('--theme', '#6366f1'), [], 0.5 + PALETTES.length * 0.35)
    },
  },
]

export function PlatformStack() {
  const rootRef = useRef<HTMLElement>(null)

  useDeferredGSAP(
    () => {
      const root = rootRef.current
      if (!root) return
      const cards = gsap.utils.toArray<HTMLElement>('[data-stack-card]')
      const mm = gsap.matchMedia()

      mm.add(MOTION_QUERIES.motion, () => {
        cards.forEach((card, index) => {
          const q = gsap.utils.selector(card)
          const tl = gsap.timeline({
            defaults: { ease: 'expo.out', duration: 0.6 },
            scrollTrigger: { trigger: card, start: 'top 65%', toggleActions: 'play none none reverse' },
          })
          FEATURES[index].animate(tl, q)
        })
      })

      // Cards are taller than a phone screen, so the stacking effect is desktop-only.
      mm.add(`${MOTION_QUERIES.motion} and ${MOTION_QUERIES.desktop}`, () => {
        cards.forEach((card, index) => {
          const next = cards[index + 1]
          if (!next) return
          gsap.to(card, {
            scale: 0.9,
            ease: 'none',
            scrollTrigger: { trigger: next, start: 'top bottom', end: 'top 20%', scrub: true },
          })
          gsap.to(card.querySelector('[data-stack-shade]'), {
            opacity: 0.65,
            ease: 'none',
            scrollTrigger: { trigger: next, start: 'top bottom', end: 'top 20%', scrub: true },
          })
        })
      })

      return () => mm.revert()
    },
    { scope: rootRef },
  )

  return (
    <section ref={rootRef} id="platform" aria-labelledby="platform-title" className="relative mx-auto max-w-7xl scroll-mt-24 px-6 pb-24 pt-28 md:px-10 md:pt-40">
      <div className="mb-16 grid gap-8 md:grid-cols-[1fr_1fr] md:items-end">
        <div>
          <ChapterLabel index="05">The platform</ChapterLabel>
          <SplitReveal as="h2" id="platform-title" type="words" className="mt-6 text-title font-medium tracking-[-0.045em]">
            Not a pile of tools. One fast, keyboard-first workspace.
          </SplitReveal>
        </div>
        <p className="max-w-md text-lg leading-relaxed text-muted md:justify-self-end">
          Search, shortcuts, context menus and DevTools all lead to the same toolkits, so you can reach the tool you
          need from wherever you are.
        </p>
      </div>

      <ol className="space-y-8">
        {FEATURES.map((feature, index) => (
          <li
            key={feature.id}
            data-stack-card=""
            className="origin-top md:sticky md:top-[var(--stack-top)]"
            style={{ '--stack-top': `calc(6.5rem + ${index * 1.25}rem)` } as CSSProperties}
          >
            <article
              className="relative grid min-h-[min(72vh,560px)] gap-10 overflow-hidden rounded-[32px] border border-line-strong bg-surface p-7 md:grid-cols-[1fr_1.1fr] md:p-12"
              style={{ '--accent': feature.accent } as CSSProperties}
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -left-32 -top-32 size-96 rounded-full opacity-25 blur-3xl"
                style={{ background: `radial-gradient(circle, ${feature.accent}, transparent 65%)` }}
              />
              <div className="relative flex flex-col justify-between gap-10">
                <div>
                  <div className="flex items-center gap-3">
                    <span
                      className="flex size-11 items-center justify-center rounded-xl border border-line-strong"
                      style={{ color: feature.accent, backgroundColor: `${feature.accent}1f` }}
                    >
                      {feature.icon}
                    </span>
                    <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
                      {String(index + 1).padStart(2, '0')} / {String(FEATURES.length).padStart(2, '0')}
                    </span>
                  </div>
                  <h3 className="mt-8 max-w-md text-3xl font-medium tracking-[-0.035em] md:text-5xl">{feature.title}</h3>
                  <p className="mt-5 max-w-md leading-relaxed text-muted">{feature.body}</p>
                </div>
                <ul className="space-y-2.5">
                  {feature.points.map((point) => (
                    <li key={point} className="flex items-center gap-3 text-sm text-ink-soft">
                      <span aria-hidden="true" className="size-1.5 rounded-full" style={{ backgroundColor: feature.accent }} />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
              <div aria-hidden="true" className="relative flex items-center justify-center rounded-3xl border border-line bg-canvas/60 p-6 hairline-grid md:p-10">
                {feature.visual}
              </div>
              <div data-stack-shade="" aria-hidden="true" className="pointer-events-none absolute inset-0 bg-canvas opacity-0" />
            </article>
          </li>
        ))}
      </ol>
    </section>
  )
}
