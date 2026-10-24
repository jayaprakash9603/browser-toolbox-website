'use client'

import { CheckIcon, ClipboardCheckIcon, PauseIcon, PlayIcon, RotateCcwIcon } from 'lucide-react'
import { useRef, useState, type KeyboardEvent } from 'react'

import { LogoMark } from '@/components/ui/Logo'
import { ChapterLabel } from '@/components/ui/primitives'
import { Draggable, gsap, MOTION_QUERIES, prefersReducedMotion, ScrollTrigger, useDeferredGSAP } from '@/motion/gsap'
import { SplitReveal } from '@/motion/SplitReveal'

const BEATS = ['Copy a token', 'Smart paste detects it', 'Decode in place', 'Copy the claims']
const SEGMENTS = [
  { text: 'eyJhbGciOiJIUzI1NiJ9', color: '#fb7185' },
  { text: 'eyJzdWIiOiJhZGEiLCJleHAiOjE3OTl9', color: '#a78bfa' },
  { text: 'Qm9vdHN0cmFw', color: '#22d3ee' },
]

export function WorkflowScrub() {
  const rootRef = useRef<HTMLElement>(null)
  const timelineRef = useRef<gsap.core.Timeline | null>(null)
  const [playing, setPlaying] = useState(false)
  const [ended, setEnded] = useState(false)

  useDeferredGSAP(
    () => {
      const root = rootRef.current
      if (!root) return
      const q = gsap.utils.selector(root)
      const track = root.querySelector<HTMLElement>('[data-scrub-track]')
      const handle = root.querySelector<HTMLElement>('[data-scrub-handle]')
      const fill = root.querySelector<HTMLElement>('[data-scrub-fill]')
      const beats = q('[data-beat]')
      if (!track || !handle || !fill) return

      let atEnd = false
      const syncUi = (progress: number) => {
        if ((progress >= 1) !== atEnd) {
          atEnd = progress >= 1
          setEnded(atEnd)
        }
        const width = track.offsetWidth
        gsap.set(handle, { x: progress * width })
        fill.style.transform = `scaleX(${progress})`
        handle.setAttribute('aria-valuenow', String(Math.round(progress * 100)))
        const index = Math.min(BEATS.length - 1, Math.floor(progress * BEATS.length * 0.999))
        handle.setAttribute('aria-valuetext', BEATS[index])
        beats.forEach((beat, i) => beat.toggleAttribute('data-active', i <= index && progress > 0.01))
      }

      const tl = gsap.timeline({
        paused: true,
        defaults: { ease: 'power3.out', duration: 0.5 },
        onUpdate: () => syncUi(tl.progress()),
        onComplete: () => setPlaying(false),
      })
      // 1 · copy
      tl.from(q('[data-token-highlight]'), { scaleX: 0, duration: 0.6, ease: 'power2.inOut' }, 0)
        .from(q('[data-copy-toast]'), { y: 12, opacity: 0 }, 0.55)
        .to(q('[data-copy-toast]'), { y: -8, opacity: 0, duration: 0.3 }, 1.1)
        // 2 · detect
        .from(q('[data-panel]'), { x: 40, opacity: 0, duration: 0.6 }, 1.1)
        .from(q('[data-detected]'), { scale: 0.6, opacity: 0, ease: 'back.out(2.4)' }, 1.45)
        // 3 · decode
        .from(q('[data-segment]'), { y: 18, opacity: 0, stagger: 0.12 }, 2.1)
        .from(q('[data-decoded]'), { y: 16, opacity: 0, stagger: 0.14 }, 2.45)
        .from(q('[data-claim]'), { opacity: 0, x: -8, stagger: 0.06 }, 2.7)
        .from(q('[data-expiry]'), { scale: 0.7, opacity: 0, ease: 'back.out(2)' }, 3)
        // 4 · copy claims
        .from(q('[data-claims-toast]'), { y: 16, opacity: 0, scale: 0.94 }, 3.45)
        .to({}, { duration: 0.4 })
      timelineRef.current = tl

      const mm = gsap.matchMedia()
      mm.add(MOTION_QUERIES.reduce, () => {
        tl.progress(1)
      })
      mm.add(MOTION_QUERIES.motion, () => {
        syncUi(0)
        ScrollTrigger.create({
          trigger: root,
          start: 'top 55%',
          once: true,
          onEnter: () => {
            tl.play()
            setPlaying(true)
          },
        })
      })

      const [draggable] = Draggable.create(handle, {
        type: 'x',
        bounds: { minX: 0, maxX: track.offsetWidth },
        onPress() {
          tl.pause()
          setPlaying(false)
        },
        onDrag() {
          tl.progress(gsap.utils.clamp(0, 1, this.x / track.offsetWidth))
        },
      })

      const onTrackPointer = (event: PointerEvent) => {
        if (event.target === handle) return
        const rect = track.getBoundingClientRect()
        tl.pause()
        setPlaying(false)
        const progress = gsap.utils.clamp(0, 1, (event.clientX - rect.left) / rect.width)
        if (prefersReducedMotion()) tl.progress(progress)
        else gsap.to(tl, { progress, duration: 0.6, ease: 'power3.out' })
      }
      track.addEventListener('pointerdown', onTrackPointer)
      const onResize = () => {
        draggable.applyBounds({ minX: 0, maxX: track.offsetWidth })
        syncUi(tl.progress())
      }
      window.addEventListener('resize', onResize)

      return () => {
        mm.revert()
        draggable.kill()
        tl.kill()
        track.removeEventListener('pointerdown', onTrackPointer)
        window.removeEventListener('resize', onResize)
      }
    },
    { scope: rootRef },
  )

  const togglePlay = () => {
    const tl = timelineRef.current
    if (!tl) return
    if (tl.isActive()) {
      tl.pause()
      setPlaying(false)
      return
    }
    if (tl.progress() >= 1) tl.restart()
    else tl.play()
    setPlaying(true)
  }

  const onHandleKey = (event: KeyboardEvent<HTMLDivElement>) => {
    const tl = timelineRef.current
    if (!tl) return
    const step = event.shiftKey ? 0.25 : 0.05
    let next: number | null = null
    if (event.key === 'ArrowRight' || event.key === 'ArrowUp') next = tl.progress() + step
    if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') next = tl.progress() - step
    if (event.key === 'Home') next = 0
    if (event.key === 'End') next = 1
    if (next === null) return
    event.preventDefault()
    tl.pause()
    setPlaying(false)
    tl.progress(gsap.utils.clamp(0, 1, next))
  }

  const atEnd = !playing && ended

  return (
    <section ref={rootRef} aria-labelledby="scrub-title" className="mx-auto max-w-7xl px-6 py-28 md:px-10 md:py-40">
      <div className="grid gap-8 md:grid-cols-[1fr_1fr] md:items-end">
        <div>
          <ChapterLabel index="06">Scrub the workflow</ChapterLabel>
          <SplitReveal as="h2" id="scrub-title" type="words" className="mt-6 text-title font-medium tracking-[-0.045em]">
            Copy it. Paste it. Decode it. Ship it.
          </SplitReveal>
        </div>
        <p className="max-w-md text-lg leading-relaxed text-muted md:justify-self-end">
          Drag the playhead to step through a real flow: a JWT copied from a response is recognised, decoded and
          checked for expiry. No tabs, no pasting into a random website.
        </p>
      </div>

      <div className="mt-14 overflow-hidden rounded-[32px] border border-line-strong bg-surface">
        <div aria-hidden="true" className="relative grid min-h-[420px] gap-6 p-6 hairline-grid md:grid-cols-[1fr_1fr] md:p-10">
          <div className="space-y-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">Response · /api/session</p>
            <div className="rounded-2xl border border-line bg-canvas/80 p-4 font-mono text-[12px] leading-relaxed text-ink-soft">
              <p>{'{'}</p>
              <p className="pl-4">
                <span className="text-[#a5b4fc]">&quot;token&quot;</span>:{' '}
                <span className="relative inline break-all">
                  <span data-token-highlight="" className="absolute -inset-x-1 -inset-y-0.5 origin-left rounded bg-indigo/35" />
                  <span className="relative text-[#6ee7b7]">&quot;eyJhbGciOiJIUzI1NiJ9.eyJzdWIi…&quot;</span>
                </span>
              </p>
              <p className="pl-4">
                <span className="text-[#a5b4fc]">&quot;refresh&quot;</span>: <span className="text-[#fcd34d]">true</span>
              </p>
              <p>{'}'}</p>
            </div>
            <span data-copy-toast="" className="inline-flex items-center gap-2 rounded-full bg-ink px-3 py-1.5 text-xs font-medium text-canvas">
              <ClipboardCheckIcon className="size-3.5" /> Copied
            </span>
            <div className="flex flex-wrap gap-1 font-mono text-[11px]">
              {SEGMENTS.map((segment, index) => (
                <span key={segment.text} data-segment="" className="flex items-center gap-1">
                  <span className="rounded-md px-2 py-1" style={{ color: segment.color, backgroundColor: `${segment.color}1f` }}>
                    {segment.text}
                  </span>
                  {index < SEGMENTS.length - 1 ? <span className="text-muted">.</span> : null}
                </span>
              ))}
            </div>
          </div>

          <div data-panel="" className="relative rounded-2xl border border-line-strong bg-canvas/90 p-4 shadow-[0_30px_90px_-30px_rgb(99_102_241/0.6)]">
            <div className="flex items-center gap-2 border-b border-line pb-3">
              <LogoMark className="size-4" />
              <span className="text-xs font-medium">One Panel · Smart paste</span>
              <span data-detected="" className="ml-auto rounded-full border border-cyan/40 bg-cyan/10 px-2.5 py-0.5 font-mono text-[10px] text-cyan">
                JWT detected
              </span>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div data-decoded="" className="rounded-xl border border-line p-3 font-mono text-[11px]">
                <p className="mb-2 text-[10px] uppercase tracking-[0.2em] text-rose">Header</p>
                <p data-claim="" className="text-ink-soft">alg: <span className="text-ink">HS256</span></p>
                <p data-claim="" className="text-ink-soft">typ: <span className="text-ink">JWT</span></p>
              </div>
              <div data-decoded="" className="rounded-xl border border-line p-3 font-mono text-[11px]">
                <p className="mb-2 text-[10px] uppercase tracking-[0.2em] text-violet">Payload</p>
                <p data-claim="" className="text-ink-soft">sub: <span className="text-ink">ada</span></p>
                <p data-claim="" className="text-ink-soft">role: <span className="text-ink">admin</span></p>
                <p data-claim="" className="text-ink-soft">exp: <span className="text-ink">1799999999</span></p>
              </div>
            </div>
            <span data-expiry="" className="mt-3 inline-flex items-center gap-2 rounded-full border border-emerald/40 bg-emerald/10 px-3 py-1 font-mono text-[10.5px] text-emerald">
              <span className="size-1.5 rounded-full bg-emerald" /> Valid · expires in 2h 14m
            </span>
            <div data-claims-toast="" className="absolute bottom-4 right-4 flex items-center gap-2 rounded-xl bg-ink max-md:static max-md:mt-3 max-md:w-fit px-3.5 py-2 text-xs font-medium text-canvas shadow-xl">
              <CheckIcon className="size-3.5" /> Claims copied as JSON
            </div>
          </div>
        </div>

        {/* Timeline controls */}
        <div className="border-t border-line bg-elevated/60 px-6 py-6 md:px-10">
          <div className="flex items-center gap-5">
            <button
              type="button"
              onClick={togglePlay}
              aria-label={playing ? 'Pause workflow' : atEnd ? 'Replay workflow' : 'Play workflow'}
              className="flex size-12 shrink-0 items-center justify-center rounded-full bg-ink text-canvas transition-transform hover:scale-105"
            >
              {playing ? <PauseIcon className="size-5" /> : atEnd ? <RotateCcwIcon className="size-5" /> : <PlayIcon className="size-5" />}
            </button>
            <div className="relative flex-1 py-5">
              <div data-scrub-track="" className="relative h-1.5 cursor-pointer rounded-full bg-white/10">
                <span data-scrub-fill="" className="absolute inset-0 origin-left rounded-full bg-gradient-to-r from-indigo via-violet to-cyan" style={{ transform: 'scaleX(0)' }} />
                {BEATS.map((beat, index) => (
                  <span
                    key={beat}
                    aria-hidden="true"
                    className="absolute top-1/2 size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-surface bg-white/40"
                    style={{ left: `${(index / BEATS.length) * 100 + 100 / BEATS.length / 2}%` }}
                  />
                ))}
                <div
                  data-scrub-handle=""
                  role="slider"
                  tabIndex={0}
                  aria-label="Workflow playhead"
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={0}
                  aria-valuetext={BEATS[0]}
                  onKeyDown={onHandleKey}
                  className="absolute -left-3 top-1/2 flex size-6 -translate-y-1/2 cursor-grab items-center justify-center rounded-full bg-white shadow-[0_0_0_6px_rgb(99_102_241/0.35),0_8px_24px_rgb(0_0_0/0.6)] active:cursor-grabbing"
                >
                  <span className="h-2.5 w-0.5 rounded-full bg-canvas/60" />
                </div>
              </div>
            </div>
          </div>
          <ol className="mt-3 grid grid-cols-4 gap-2 pl-[4.25rem]">
            {BEATS.map((beat, index) => (
              <li
                key={beat}
                data-beat=""
                className="font-mono text-[10px] uppercase leading-snug tracking-[0.16em] text-muted transition-colors duration-300 data-[active]:text-ink md:text-[11px]"
              >
                <span className="text-cyan">0{index + 1}</span> {beat}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
