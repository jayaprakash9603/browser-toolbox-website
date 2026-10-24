'use client'

import { CheckIcon, SearchIcon, ShieldBanIcon } from 'lucide-react'
import { useRef } from 'react'

import { LogoMark } from '@/components/ui/Logo'
import { ChapterLabel } from '@/components/ui/primitives'
import { ToolIcon } from '@/components/ui/ToolIcon'
import { gsap, MOTION_QUERIES, ScrollTrigger, useDeferredGSAP } from '@/motion/gsap'

const STEPS = [
  { tool: 'JSON Toolkit', icon: 'BracesIcon', query: 'json', title: 'Format a payload', body: 'Paste or right-click minified JSON and get a validated, colour-coded tree.' },
  { tool: 'Color Picker', icon: 'PipetteIcon', query: 'color', title: 'Sample any pixel', body: 'The EyeDropper grabs a colour from the page; copy it as HEX, RGB or HSL.' },
  { tool: 'Capture Toolkit', icon: 'CameraIcon', query: 'screenshot', title: 'Capture & annotate', body: 'Select an area, draw arrows, blur secrets, copy to the clipboard.' },
  { tool: 'API Request Builder', icon: 'NetworkIcon', query: 'api', title: 'Fire a request', body: 'Collections, environments and history. Postman-style, beside the page.' },
  { tool: 'Ad Blocker', icon: 'ShieldBanIcon', query: 'block', title: 'Silence the noise', body: 'MV3 filter lists remove ads and trackers before they load.' },
]

const PRETTY_JSON = [
  { indent: 0, parts: [['p', '{']] },
  { indent: 1, parts: [['k', '"id"'], ['p', ': '], ['n', '4821'], ['p', ',']] },
  { indent: 1, parts: [['k', '"status"'], ['p', ': '], ['s', '"paid"'], ['p', ',']] },
  { indent: 1, parts: [['k', '"items"'], ['p', ': [']] },
  { indent: 2, parts: [['p', '{ '], ['k', '"sku"'], ['p', ': '], ['s', '"BT-01"'], ['p', ', '], ['k', '"qty"'], ['p', ': '], ['n', '2'], ['p', ' }']] },
  { indent: 1, parts: [['p', '],']] },
  { indent: 1, parts: [['k', '"total"'], ['p', ': '], ['n', '58.40']] },
  { indent: 0, parts: [['p', '}']] },
] as const

const TOKEN_COLORS: Record<string, string> = { p: '#8b8b9a', k: '#a5b4fc', s: '#6ee7b7', n: '#fcd34d' }

const TRACKERS = ['ads.doubleclick.net', 'connect.facebook.net', 'tracker.hotjar.io', 'pixel.adsrvr.org']

function PageMock() {
  return (
    <div className="relative flex-1 overflow-hidden p-4 md:p-6">
      <div className="flex items-center justify-between">
        <span className="h-2.5 w-16 rounded-full bg-white/15" />
        <span className="flex gap-2">
          <span className="h-2 w-8 rounded-full bg-white/10" />
          <span className="h-2 w-8 rounded-full bg-white/10" />
          <span className="h-2 w-8 rounded-full bg-white/10" />
        </span>
      </div>
      <div className="mt-6 space-y-2">
        <span className="block h-4 w-4/5 rounded bg-white/20 md:h-5" />
        <span className="block h-4 w-3/5 rounded bg-white/20 md:h-5" />
      </div>
      <div className="mt-4 space-y-1.5">
        <span className="block h-1.5 w-full rounded-full bg-white/10" />
        <span className="block h-1.5 w-11/12 rounded-full bg-white/10" />
        <span className="block h-1.5 w-4/6 rounded-full bg-white/10" />
      </div>
      <div className="mt-5 grid grid-cols-[1.4fr_1fr] gap-3">
        <div data-page-image="" className="relative aspect-[4/3] overflow-hidden rounded-xl bg-[linear-gradient(135deg,#6366f1,#22d3ee_60%,#a78bfa)]">
          <span data-eyedropper="" className="absolute left-1/4 top-1/3 flex size-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-[#6366f1] opacity-0 shadow-[0_0_0_4px_rgb(0_0_0/0.35)]" />
          <span data-capture-box="" className="absolute inset-[12%] rounded-lg border-2 border-dashed border-cyan bg-cyan/10 opacity-0" />
        </div>
        <div className="space-y-2">
          {[0, 1, 2].map((ad) => (
            <div
              key={ad}
              data-page-ad=""
              className="flex h-10 origin-top items-center justify-center rounded-lg border border-amber/30 bg-amber/10 font-mono text-[9px] uppercase tracking-[0.2em] text-amber/80 md:h-12"
            >
              Sponsored
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function SceneJson() {
  return (
    <div data-scene="" className="absolute inset-0 space-y-3">
      <div data-json-min="" className="truncate rounded-lg border border-line bg-canvas/80 px-3 py-2 font-mono text-[10px] text-muted md:text-[11px]">
        {'{"id":4821,"status":"paid","items":[{"sku":"BT-01","qty":2}],"total":58.40}'}
      </div>
      <div className="rounded-xl border border-line bg-canvas/80 p-3 font-mono text-[10.5px] leading-[1.75] md:text-xs">
        {PRETTY_JSON.map((line, index) => (
          <div key={index} data-json-line="" style={{ paddingLeft: `${line.indent * 1.1}em` }}>
            {line.parts.map(([type, text], partIndex) => (
              <span key={partIndex} style={{ color: TOKEN_COLORS[type] }}>
                {text}
              </span>
            ))}
          </div>
        ))}
      </div>
      <span data-json-badge="" className="inline-flex items-center gap-1.5 rounded-full border border-emerald/40 bg-emerald/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-emerald">
        <CheckIcon aria-hidden="true" className="size-3" /> Valid JSON · 8 lines
      </span>
    </div>
  )
}

function SceneColor() {
  return (
    <div data-scene="" className="invisible absolute inset-0 space-y-3">
      <div className="flex items-center gap-3 rounded-xl border border-line bg-canvas/80 p-3">
        <span data-swatch="" className="size-14 origin-left rounded-xl bg-[#6366f1] shadow-[0_0_40px_-6px_#6366f1]" />
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">Picked</p>
          <p className="font-mono text-xl font-medium text-ink">#6366F1</p>
        </div>
      </div>
      {[
        ['RGB', '99, 102, 241'],
        ['HSL', '239°, 84%, 67%'],
        ['OKLCH', '0.59 0.2 277'],
      ].map(([label, value]) => (
        <div key={label} data-color-row="" className="flex items-center justify-between rounded-lg border border-line bg-canvas/60 px-3 py-2 font-mono text-[11px]">
          <span className="text-muted">{label}</span>
          <span className="text-ink-soft">{value}</span>
        </div>
      ))}
      <div className="flex gap-1.5">
        {['#4f46e5', '#6366f1', '#818cf8', '#a5b4fc', '#c7d2fe'].map((color) => (
          <span key={color} data-palette-chip="" className="h-6 flex-1 rounded-md" style={{ backgroundColor: color }} />
        ))}
      </div>
    </div>
  )
}

function SceneCapture() {
  return (
    <div data-scene="" className="invisible absolute inset-0 space-y-3">
      <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-line bg-[linear-gradient(135deg,#6366f1,#22d3ee_60%,#a78bfa)]">
        <span data-blur-block="" className="absolute bottom-[14%] right-[10%] h-[22%] w-[38%] origin-left rounded-md bg-white/30 backdrop-blur-md" />
        <svg viewBox="0 0 100 75" className="absolute inset-0 size-full" aria-hidden="true">
          <path data-arrow="" d="M18 62 C 30 40, 42 34, 58 30" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" />
          <path data-arrow="" d="M50 25 L 59 30 L 51 37" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
          <rect data-arrow="" x="60" y="14" width="30" height="26" rx="3" fill="none" stroke="#fb7185" strokeWidth="2" />
        </svg>
      </div>
      <div data-capture-toast="" className="flex items-center gap-2 rounded-lg border border-emerald/40 bg-emerald/10 px-3 py-2 font-mono text-[11px] text-emerald">
        <CheckIcon aria-hidden="true" className="size-3.5" /> Copied to clipboard · 1280×960
      </div>
    </div>
  )
}

function SceneApi() {
  return (
    <div data-scene="" className="invisible absolute inset-0 space-y-3">
      <div className="flex items-center gap-2 rounded-xl border border-line bg-canvas/80 p-2">
        <span className="rounded-md bg-emerald/15 px-2 py-1 font-mono text-[10px] font-semibold text-emerald">GET</span>
        <span className="flex-1 truncate font-mono text-[11px] text-ink-soft">api.acme.dev/v1/orders/4821</span>
        <span data-send="" className="rounded-md bg-indigo px-2.5 py-1 text-[11px] font-medium text-white">Send</span>
      </div>
      <div data-api-status="" className="flex items-center justify-between rounded-lg border border-line bg-canvas/60 px-3 py-2 font-mono text-[11px]">
        <span className="flex items-center gap-2 text-emerald">
          <span className="size-1.5 rounded-full bg-emerald" /> 200 OK
        </span>
        <span className="text-muted">142 ms · 1.2 kB</span>
      </div>
      <div className="space-y-1.5 rounded-xl border border-line bg-canvas/80 p-3 font-mono text-[10.5px] md:text-[11px]">
        {['"id": 4821', '"status": "paid"', '"customer": "ada@acme.dev"', '"shipped": true'].map((line) => (
          <p key={line} data-api-line="" className="text-ink-soft">
            {line}
          </p>
        ))}
      </div>
    </div>
  )
}

function SceneBlock() {
  return (
    <div data-scene="" className="invisible absolute inset-0 space-y-3">
      <div className="flex items-center gap-3 rounded-xl border border-line bg-canvas/80 p-3">
        <span data-shield="" className="flex size-12 items-center justify-center rounded-xl bg-rose/15 text-rose">
          <ShieldBanIcon aria-hidden="true" className="size-6" />
        </span>
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">Blocked on this page</p>
          <p data-block-count="" className="font-mono text-2xl font-medium text-ink tabular-nums">
            0
          </p>
        </div>
      </div>
      <ul className="space-y-1.5">
        {TRACKERS.map((tracker) => (
          <li key={tracker} data-tracker="" className="relative flex items-center justify-between rounded-lg border border-line bg-canvas/60 px-3 py-2 font-mono text-[11px] text-muted">
            <span className="relative">
              {tracker}
              <span data-strike="" className="absolute left-0 top-1/2 h-px w-full origin-left bg-rose" />
            </span>
            <span className="text-rose">blocked</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function PanelReel() {
  const rootRef = useRef<HTMLElement>(null)

  useDeferredGSAP(
    () => {
      const root = rootRef.current
      if (!root) return
      const q = gsap.utils.selector(root)
      const scenes = q('[data-scene]')
      const queries = q('[data-query]')
      const toolLabels = q('[data-tool-label]')
      const steps = q('[data-step]')
      const counter = root.querySelector<HTMLElement>('[data-block-count]')
      const rail = root.querySelector<HTMLElement>('[data-rail]')
      const mm = gsap.matchMedia()

      const setActive = (index: number) => {
        steps.forEach((step, i) => step.toggleAttribute('data-active', i === index))
      }

      const build = () => {
        gsap.set(scenes, { autoAlpha: 0, y: 24 })
        gsap.set([...queries, ...toolLabels], { autoAlpha: 0, yPercent: 100 })
        const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 0.5 } })
        const show = (index: number, at: number) => {
          tl.to(scenes[index], { autoAlpha: 1, y: 0 }, at)
            .to([queries[index], toolLabels[index]], { autoAlpha: 1, yPercent: 0, duration: 0.4 }, at)
          if (index > 0) {
            tl.to(scenes[index - 1], { autoAlpha: 0, y: -24, duration: 0.4 }, at - 0.15)
              .to([queries[index - 1], toolLabels[index - 1]], { autoAlpha: 0, yPercent: -100, duration: 0.3 }, at - 0.15)
          }
        }

        // 1 · JSON
        show(0, 0)
        tl.from(q('[data-json-line]'), { opacity: 0, x: -12, stagger: 0.07 }, 0.35)
          .from(q('[data-json-min]'), { opacity: 0.2 }, 0.2)
          .from(q('[data-json-badge]'), { scale: 0.6, opacity: 0, ease: 'back.out(2.5)' }, 0.95)
        // 2 · Color
        show(1, 1.6)
        tl.fromTo(q('[data-eyedropper]'), { opacity: 0, left: '15%', top: '70%' }, { opacity: 1, left: '38%', top: '42%', duration: 0.6 }, 1.55)
          .from(q('[data-swatch]'), { scaleX: 0.1, opacity: 0 }, 2.05)
          .from(q('[data-color-row]'), { opacity: 0, x: 16, stagger: 0.08 }, 2.15)
          .from(q('[data-palette-chip]'), { scaleY: 0, transformOrigin: '50% 100%', stagger: 0.05 }, 2.3)
          .to(q('[data-eyedropper]'), { opacity: 0, duration: 0.3 }, 2.95)
        // 3 · Capture
        show(2, 3.2)
        tl.fromTo(q('[data-capture-box]'), { opacity: 0, scale: 0.4 }, { opacity: 1, scale: 1, duration: 0.5 }, 3.15)
          .from(q('[data-arrow]'), { drawSVG: '0%', stagger: 0.12, duration: 0.5, ease: 'power2.inOut' }, 3.45)
          .from(q('[data-blur-block]'), { scaleX: 0 }, 3.75)
          .from(q('[data-capture-toast]'), { opacity: 0, y: 10 }, 3.95)
          .to(q('[data-capture-box]'), { opacity: 0, duration: 0.3 }, 4.5)
        // 4 · API
        show(3, 4.8)
        tl.to(q('[data-send]'), { scale: 0.88, duration: 0.12, yoyo: true, repeat: 1 }, 5.15)
          .from(q('[data-api-status]'), { opacity: 0, scale: 0.9, ease: 'back.out(2)' }, 5.35)
          .from(q('[data-api-line]'), { opacity: 0, y: 8, stagger: 0.08 }, 5.5)
        // 5 · Block
        show(4, 6.4)
        const count = { n: 0 }
        tl.from(q('[data-shield]'), { scale: 0.5, rotate: -20, ease: 'back.out(2.5)' }, 6.5)
          .to(count, { n: 1284, duration: 0.9, ease: 'power2.out', onUpdate: () => counter && (counter.textContent = Math.round(count.n).toLocaleString('en-US')) }, 6.55)
          .from(q('[data-tracker]'), { opacity: 0, x: 16, stagger: 0.07 }, 6.6)
          .from(q('[data-strike]'), { scaleX: 0, stagger: 0.07 }, 6.9)
          .to(q('[data-page-ad]'), { scaleY: 0, opacity: 0, stagger: 0.06, duration: 0.45 }, 6.9)
          .to({}, { duration: 0.6 })
        return tl
      }

      mm.add(`${MOTION_QUERIES.motion} and ${MOTION_QUERIES.desktop}`, () => {
        const tl = build()
        const total = tl.duration()
        const marks = [0, 1.6, 3.2, 4.8, 6.4]
        ScrollTrigger.create({
          trigger: root,
          start: 'top top',
          end: () => `+=${window.innerHeight * 4.2}`,
          pin: q('[data-reel-pin]')[0],
          scrub: 0.6,
          animation: tl,
          onUpdate(self) {
            const time = self.progress * total
            let index = 0
            marks.forEach((mark, i) => {
              if (time >= mark - 0.1) index = i
            })
            setActive(index)
            if (rail) rail.style.transform = `scaleY(${self.progress})`
          },
        })
        setActive(0)
      })

      mm.add(`${MOTION_QUERIES.motion} and ${MOTION_QUERIES.mobile}`, () => {
        const tl = build()
        tl.repeat(-1).repeatDelay(0.6).pause()
        const marks = [0, 1.6, 3.2, 4.8, 6.4]
        tl.eventCallback('onUpdate', () => {
          let index = 0
          marks.forEach((mark, i) => {
            if (tl.time() >= mark - 0.1) index = i
          })
          setActive(index)
        })
        ScrollTrigger.create({
          trigger: root,
          start: 'top 70%',
          end: 'bottom 30%',
          onToggle: (self) => (self.isActive ? tl.play() : tl.pause()),
        })
      })

      mm.add(MOTION_QUERIES.reduce, () => {
        gsap.set(scenes.slice(1), { autoAlpha: 0 })
        gsap.set([...queries.slice(1), ...toolLabels.slice(1)], { autoAlpha: 0 })
        setActive(0)
        if (counter) counter.textContent = '1,284'
      })

      return () => mm.revert()
    },
    { scope: rootRef },
  )

  return (
    <section ref={rootRef} aria-labelledby="reel-title" className="relative">
      <div data-reel-pin="" className="flex min-h-[100svh] items-center py-20 md:h-[100svh] md:py-0">
        <div className="mx-auto grid w-full max-w-7xl gap-12 px-6 md:grid-cols-[0.8fr_1.4fr] md:items-center md:px-10">
          <div>
            <ChapterLabel index="02">See it work</ChapterLabel>
            <h2 id="reel-title" className="mt-6 text-title font-medium tracking-[-0.045em]">
              Open the panel.
              <br />
              <span className="font-serif font-normal italic text-ink-soft">Pick a tool.</span> Done.
            </h2>
            <div className="relative mt-10 pl-6">
              <span aria-hidden="true" className="absolute left-0 top-1 h-[calc(100%-0.5rem)] w-px bg-line" />
              <span
                data-rail=""
                aria-hidden="true"
                className="absolute left-0 top-1 hidden h-[calc(100%-0.5rem)] w-px origin-top bg-gradient-to-b from-indigo to-cyan md:block"
                style={{ transform: 'scaleY(0)' }}
              />
              {/* Phones show only the active step as a caption so the mock stays in view. */}
              <ol className="max-md:min-h-[7.5rem] md:space-y-5">
                {STEPS.map((step, index) => (
                  <li
                    key={step.tool}
                    data-step=""
                    data-active={index === 0 ? '' : undefined}
                    className="group max-md:hidden max-md:data-[active]:block"
                  >
                    <p className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
                      <span className="transition-colors duration-500 group-data-[active]:text-ink">0{index + 1}</span>
                      {step.tool}
                    </p>
                    <p className="mt-1 text-lg font-medium tracking-tight text-muted transition-colors duration-500 group-data-[active]:text-ink">
                      {step.title}
                    </p>
                    <p className="mt-1 hidden max-w-sm text-sm leading-relaxed text-muted group-data-[active]:block">
                      {step.body}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div
            aria-hidden="true"
            className="relative overflow-hidden rounded-[22px] border border-line-strong bg-surface shadow-[0_60px_160px_-40px_rgb(99_102_241/0.45),0_0_0_1px_rgb(255_255_255/0.04)]"
          >
            <div className="flex items-center gap-3 border-b border-line bg-elevated/70 px-4 py-3">
              <span className="flex gap-1.5">
                <span className="size-2.5 rounded-full bg-[#ff5f57]" />
                <span className="size-2.5 rounded-full bg-[#febc2e]" />
                <span className="size-2.5 rounded-full bg-[#28c840]" />
              </span>
              <span className="flex-1 truncate rounded-full bg-canvas/70 px-3 py-1 font-mono text-[11px] text-muted">
                acme.dev/orders/4821
              </span>
              <LogoMark className="size-5" />
            </div>
            <div className="flex aspect-[16/11] md:aspect-[16/10]">
              <PageMock />
              <aside className="flex w-[52%] flex-col border-l border-line bg-canvas/70 md:w-[44%]">
                <div className="flex items-center gap-2 border-b border-line px-3 py-2.5">
                  <LogoMark className="size-4" />
                  <span className="text-xs font-medium text-ink">Toolbox</span>
                  <span className="ml-auto flex h-7 flex-1 items-center gap-1.5 overflow-hidden rounded-full border border-line bg-surface px-2.5">
                    <SearchIcon className="size-3 shrink-0 text-muted" />
                    <span className="relative h-4 flex-1 overflow-hidden font-mono text-[11px] text-ink">
                      {STEPS.map((step, index) => (
                        <span key={step.query} data-query="" className={index ? 'invisible absolute inset-0' : 'absolute inset-0'}>
                          {step.query}
                          <span className="ml-px inline-block h-3 w-px animate-pulse bg-cyan align-middle" />
                        </span>
                      ))}
                    </span>
                  </span>
                </div>
                <div className="relative h-6 overflow-hidden border-b border-line px-3">
                  {STEPS.map((step, index) => (
                    <span
                      key={step.tool}
                      data-tool-label=""
                      className={`${index ? 'invisible ' : ''}absolute inset-x-3 top-1 flex items-center gap-1.5 text-[11px] font-medium text-ink-soft`}
                    >
                      <ToolIcon name={step.icon} className="size-3.5 text-cyan" />
                      {step.tool}
                    </span>
                  ))}
                </div>
                <div className="relative flex-1 p-3">
                  <SceneJson />
                  <SceneColor />
                  <SceneCapture />
                  <SceneApi />
                  <SceneBlock />
                </div>
              </aside>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
