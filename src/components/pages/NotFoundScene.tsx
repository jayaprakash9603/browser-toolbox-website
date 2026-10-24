'use client'

import { HandIcon, SearchIcon } from 'lucide-react'
import { useRef } from 'react'

import { openCommandPalette } from '@/components/shell/CommandPalette'
import { buttonClasses, Keycap } from '@/components/ui/primitives'
import { ToolIcon } from '@/components/ui/ToolIcon'
import { Draggable, gsap, MOTION_QUERIES, useGSAP } from '@/motion/gsap'
import { TransitionLink } from '@/motion/TransitionLink'

const SCATTER = [
  { icon: 'BracesIcon', color: '#818cf8', x: 8, y: 18, r: -12 },
  { icon: 'PipetteIcon', color: '#f472b6', x: 86, y: 14, r: 10 },
  { icon: 'CameraIcon', color: '#22d3ee', x: 12, y: 74, r: 8 },
  { icon: 'ShieldIcon', color: '#34d399', x: 84, y: 70, r: -8 },
  { icon: 'NetworkIcon', color: '#fbbf24', x: 20, y: 2, r: 4 },
  { icon: 'KeyRoundIcon', color: '#fb7185', x: 93, y: 42, r: 14 },
  { icon: 'PaletteIcon', color: '#a78bfa', x: 2, y: 46, r: -16 },
  { icon: 'QrCodeIcon', color: '#38bdf8', x: 76, y: 90, r: -6 },
]

export function NotFoundScene() {
  const rootRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const root = rootRef.current
      if (!root) return
      const stage = root.querySelector<HTMLElement>('[data-stage]')
      const chips = gsap.utils.toArray<HTMLElement>('[data-scatter]', root)

      const draggables = Draggable.create(chips, {
        type: 'x,y',
        bounds: stage,
        inertia: true,
        edgeResistance: 0.75,
        onPress() {
          gsap.to(this.target, { scale: 1.15, duration: 0.3, ease: 'back.out(3)' })
        },
        onRelease() {
          gsap.to(this.target, { scale: 1, duration: 0.5, ease: 'elastic.out(1, 0.5)' })
        },
      })

      const mm = gsap.matchMedia()
      mm.add(MOTION_QUERIES.motion, () => {
        root.removeAttribute('data-reveal-pending')
        const tl = gsap.timeline({ defaults: { ease: 'expo.out' } })
        tl.from('[data-digit]', { yPercent: -140, rotate: (i) => [-18, 12, -8][i] ?? 0, opacity: 0, duration: 1.4, stagger: 0.1, ease: 'elastic.out(1, 0.55)' })
          .from(chips, { scale: 0, rotate: 'random(-90, 90)', duration: 1, stagger: 0.05, ease: 'back.out(2)' }, 0.3)
          .from('[data-nf-fade]', { y: 24, opacity: 0, duration: 0.9, stagger: 0.08 }, 0.5)

        chips.forEach((chip, index) => {
          gsap.to(chip.firstElementChild, {
            y: index % 2 ? 10 : -10,
            rotate: index % 2 ? 4 : -4,
            duration: 2.4 + (index % 3) * 0.4,
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true,
          })
        })

        const digits = gsap.utils.toArray<HTMLElement>('[data-digit]', root)
        const movers = digits.map((digit) => ({
          x: gsap.quickTo(digit, 'x', { duration: 0.9, ease: 'power3.out' }),
          y: gsap.quickTo(digit, 'y', { duration: 0.9, ease: 'power3.out' }),
        }))
        const onMove = (event: PointerEvent) => {
          const nx = event.clientX / window.innerWidth - 0.5
          const ny = event.clientY / window.innerHeight - 0.5
          movers.forEach((mover, index) => {
            const depth = (index + 1) * 14
            mover.x(nx * depth)
            mover.y(ny * depth)
          })
        }
        window.addEventListener('pointermove', onMove)
        return () => window.removeEventListener('pointermove', onMove)
      })
      mm.add(MOTION_QUERIES.reduce, () => root.removeAttribute('data-reveal-pending'))

      return () => {
        mm.revert()
        draggables.forEach((draggable) => draggable.kill())
      }
    },
    { scope: rootRef },
  )

  return (
    <section ref={rootRef} data-reveal-pending="" aria-labelledby="nf-title" className="relative overflow-hidden px-6 pb-24 pt-32 md:px-10 md:pt-40">
      <div data-stage="" className="relative mx-auto flex min-h-[70vh] max-w-7xl flex-col items-center justify-center text-center">
        <div aria-hidden="true" className="hairline-grid pointer-events-none absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />

        {SCATTER.map((chip) => (
          <div
            key={chip.icon}
            data-scatter=""
            aria-hidden="true"
            className="absolute z-0 cursor-grab touch-none active:cursor-grabbing"
            style={{ left: `${chip.x}%`, top: `${chip.y}%` }}
          >
            <span
              className="flex size-14 items-center justify-center rounded-2xl border border-line-strong bg-elevated/90 shadow-[0_20px_50px_-20px_rgb(0_0_0/0.9)] backdrop-blur md:size-16"
              style={{ color: chip.color, rotate: `${chip.r}deg` }}
            >
              <ToolIcon name={chip.icon} className="size-6" strokeWidth={1.6} />
            </span>
          </div>
        ))}

        <p aria-hidden="true" className="relative flex select-none text-[clamp(8rem,30vw,24rem)] font-medium leading-[0.8] tracking-[-0.08em]">
          {['4', '0', '4'].map((digit, index) => (
            <span key={index} data-digit="" className={index === 1 ? 'font-serif italic text-[#b9c0ff]' : 'text-ink'}>
              {digit}
            </span>
          ))}
        </p>

        <h1 id="nf-title" data-nf-fade="" className="relative mt-8 text-3xl font-medium tracking-[-0.04em] md:text-5xl">
          This tool isn&apos;t in the box.
        </h1>
        <p data-nf-fade="" className="relative mt-4 max-w-md text-muted">
          The page moved or never existed. Search the catalogue instead, or toss the tools around while you think.
        </p>

        <form data-nf-fade="" action="/tools/" method="get" role="search" className="relative mt-10 flex w-full max-w-md items-center gap-2 rounded-full border border-line-strong bg-surface p-1.5 pl-5 focus-within:outline focus-within:outline-2 focus-within:outline-cyan">
          <SearchIcon aria-hidden="true" className="size-4 text-muted" />
          <label htmlFor="nf-search" className="sr-only">
            Search tools
          </label>
          <input id="nf-search" name="q" type="search" placeholder="Search tools" className="h-10 flex-1 bg-transparent text-ink outline-none placeholder:text-muted" />
          <button type="submit" className={buttonClasses('primary', 'md')}>
            Search
          </button>
        </form>

        <div data-nf-fade="" className="relative mt-8 flex flex-wrap items-center justify-center gap-3 text-sm">
          <TransitionLink href="/" transitionLabel="Home" className={buttonClasses('outline', 'md')}>
            Back home
          </TransitionLink>
          <TransitionLink href="/tools/" transitionLabel="All tools" className={buttonClasses('ghost', 'md')}>
            Browse all tools
          </TransitionLink>
          <button type="button" onClick={openCommandPalette} className={buttonClasses('ghost', 'md')}>
            Open palette <Keycap>Ctrl</Keycap>
            <Keycap>K</Keycap>
          </button>
        </div>
        <p data-nf-fade="" className="relative mt-10 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
          <HandIcon aria-hidden="true" className="size-3.5" /> The icons are draggable
        </p>
      </div>
    </section>
  )
}
