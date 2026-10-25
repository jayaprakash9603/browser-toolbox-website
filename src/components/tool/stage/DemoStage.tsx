'use client'

import { PauseIcon, PlayIcon } from 'lucide-react'
import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react'

import { cn } from '@/lib/cn'
import { gsap, MOTION_QUERIES, ScrollTrigger, useGSAP } from '@/motion/gsapExtra'
import { onIntroDone } from '@/motion/intro'

import { createApi, type Build } from './api'
import { useScrubLink } from './context'

const useIsoLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect

interface DemoStageProps {
  /** Accessible summary of what the demo shows. */
  label: string
  /** One caption per `step(i)` label in the build. */
  steps: string[]
  build: Build
  children: ReactNode
  /** Design size; the canvas is scaled to fit, so demos look identical at every width. */
  width?: number
  height?: number
  className?: string
  glow?: boolean
  /** Seconds to rest between loops. */
  rest?: number
}

/**
 * Frame for a scripted tool demo: one GSAP timeline that loops in the hero and is scrubbed by
 * scroll inside `PinnedWalkthrough`. Pauses offscreen, when the tab is hidden, or on request,
 * and shows the finished state under reduced motion.
 */
export function DemoStage({
  label,
  steps,
  build,
  children,
  width = 520,
  height = 420,
  className,
  glow = true,
  rest = 0.8,
}: DemoStageProps) {
  const scrub = useScrubLink()
  const frameRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLDivElement>(null)
  const tlRef = useRef<gsap.core.Timeline | null>(null)
  const playingRef = useRef(true)
  const gateRef = useRef({ visible: false, intro: false })
  const [scale, setScale] = useState(0)
  const [active, setActive] = useState(0)
  const [playing, setPlaying] = useState(true)

  useIsoLayoutEffect(() => {
    const frame = frameRef.current
    if (!frame) return
    const update = () => setScale(Math.min(1.4, frame.clientWidth / width))
    update()
    const observer = new ResizeObserver(update)
    observer.observe(frame)
    return () => observer.disconnect()
  }, [width])

  const sync = () => {
    const tl = tlRef.current
    if (!tl || scrub) return
    const gate = gateRef.current
    if (playingRef.current && gate.visible && gate.intro && !document.hidden) tl.play()
    else tl.pause()
  }

  useGSAP(
    () => {
      const root = canvasRef.current
      if (!root) return
      const mm = gsap.matchMedia()
      mm.add({ motion: MOTION_QUERIES.motion, reduce: MOTION_QUERIES.reduce }, (context) => {
        const { reduce } = context.conditions as { reduce: boolean }
        const starts: number[] = []
        let current = -1
        const tl = gsap.timeline({
          paused: true,
          repeat: scrub ? 0 : -1,
          repeatDelay: rest,
          defaults: { ease: 'expo.out', duration: 0.7 },
          onUpdate: () => {
            const time = tl.time()
            let index = 0
            for (let i = 0; i < starts.length; i += 1) if (time >= starts[i] - 0.001) index = i
            if (index !== current) {
              current = index
              setActive(index)
              scrub?.onStep(index)
            }
          },
        })
        build(createApi(tl, root, width, height))
        steps.forEach((_, i) =>
          starts.push(tl.labels[`step-${i}`] ?? (i === 0 ? 0 : Number.POSITIVE_INFINITY)),
        )
        const finalTime = tl.labels.final ?? tl.duration()
        tlRef.current = tl

        if (reduce) {
          tl.time(finalTime)
          gsap.set(root.querySelector('[data-demo-cursor]'), { opacity: 0 })
          return
        }

        if (scrub) {
          tl.time(0)
          const unsubscribe = scrub.subscribe((progress) => {
            gsap.to(tl, {
              time: progress * finalTime,
              duration: 0.5,
              ease: 'power2.out',
              overwrite: true,
            })
          })
          return () => {
            unsubscribe()
            tlRef.current = null
          }
        }

        const trigger = ScrollTrigger.create({
          trigger: root,
          start: 'top bottom',
          end: 'bottom top',
          onToggle: (self) => {
            gateRef.current.visible = self.isActive
            sync()
          },
        })
        let timer: ReturnType<typeof setTimeout> | undefined
        const stopIntro = onIntroDone(() => {
          timer = setTimeout(() => {
            gateRef.current.intro = true
            sync()
          }, 900)
        })
        document.addEventListener('visibilitychange', sync)
        return () => {
          trigger.kill()
          stopIntro()
          clearTimeout(timer)
          document.removeEventListener('visibilitychange', sync)
          tlRef.current = null
        }
      })
      return () => mm.revert()
    },
    { scope: canvasRef },
  )

  const toggle = () => {
    playingRef.current = !playingRef.current
    setPlaying(playingRef.current)
    sync()
  }

  const jump = (index: number) => {
    const tl = tlRef.current
    if (!tl) return
    const label = `step-${index}`
    // Events stay on so counters, which render through onUpdate, rewind with the jump.
    if (label in tl.labels) tl.seek(label, false)
    setActive(index)
  }

  return (
    <figure aria-label={label} className={cn('relative', className)}>
      {glow ? (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-10 rounded-[48px] opacity-60 blur-3xl"
          style={{
            background:
              'radial-gradient(60% 60% at 50% 40%, color-mix(in srgb, var(--accent) 32%, transparent), transparent 70%)',
          }}
        />
      ) : null}
      <div className="relative overflow-hidden rounded-[26px] border border-line-strong bg-surface shadow-[0_40px_120px_-40px_rgb(0_0_0/0.9)]">
        <div
          ref={frameRef}
          className="relative w-full overflow-hidden"
          style={{ aspectRatio: `${width} / ${height}` }}
        >
          <div
            ref={canvasRef}
            aria-hidden="true"
            className="absolute left-0 top-0 origin-top-left select-none text-[13px] text-ink"
            style={{
              width,
              height,
              transform: `scale(${scale || 1})`,
              visibility: scale ? 'visible' : 'hidden',
            }}
          >
            {children}
            <span
              data-demo-ripple=""
              className="pointer-events-none absolute left-0 top-0 z-40 -ml-7 -mt-7 size-14 rounded-full border-2 border-[var(--accent)] opacity-0"
            />
            <svg
              data-demo-cursor=""
              viewBox="0 0 24 24"
              className="pointer-events-none absolute left-0 top-0 z-50 size-6 opacity-0 drop-shadow-[0_6px_10px_rgb(0_0_0/0.6)]"
            >
              <path
                d="M4 2.5 19.5 11l-6.6 1.9L9.6 19.8z"
                fill="#fff"
                stroke="#07070b"
                strokeWidth="1.4"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
        {scrub ? null : (
          <figcaption className="flex items-center gap-3 border-t border-line px-3 py-2">
            <button
              type="button"
              onClick={toggle}
              aria-label={playing ? 'Pause demo' : 'Play demo'}
              className="flex size-8 shrink-0 items-center justify-center rounded-full border border-line-strong text-ink-soft transition-colors hover:border-white/40 hover:text-ink"
            >
              {playing ? (
                <PauseIcon aria-hidden="true" className="size-3.5" />
              ) : (
                <PlayIcon aria-hidden="true" className="size-3.5" />
              )}
            </button>
            <p className="w-0 min-w-0 flex-1 truncate text-[13px] text-ink-soft">
              <span className="mr-2 font-mono text-[10px] text-muted">
                {String(active + 1).padStart(2, '0')}/{String(steps.length).padStart(2, '0')}
              </span>
              {steps[active]}
            </p>
            <div className="flex shrink-0">
              {steps.map((step, index) => (
                <button
                  key={step}
                  type="button"
                  onClick={() => jump(index)}
                  aria-label={`Step ${index + 1}: ${step}`}
                  aria-current={index === active ? 'step' : undefined}
                  className="group flex h-8 min-w-6 items-center justify-center"
                >
                  <span
                    className={cn(
                      'h-1.5 rounded-full transition-all duration-500 ease-[var(--ease-out-expo)]',
                      index === active
                        ? 'w-5 bg-[var(--accent)]'
                        : 'w-1.5 bg-white/20 group-hover:bg-white/45',
                    )}
                  />
                </button>
              ))}
            </div>
          </figcaption>
        )}
      </div>
    </figure>
  )
}
