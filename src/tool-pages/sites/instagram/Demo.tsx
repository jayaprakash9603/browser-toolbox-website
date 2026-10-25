'use client'

import {
  BookmarkIcon,
  CameraIcon,
  CheckIcon,
  CopyIcon,
  DownloadIcon,
  FileVideoIcon,
  HeartIcon,
  MessageCircleIcon,
  PictureInPicture2Icon,
  SendIcon,
} from 'lucide-react'
import type { ReactNode } from 'react'

import { BrowserChrome, DemoStage, DockHeader, Toggle, type Build } from '@/components/tool/stage'

import { BOLD, CAPTION, CAPTIONS, DEFAULT_ACTIVE, FILE, SEEK, SPEED, SPEEDS, time } from './script'

const SCROLL = 72

const build: Build = ({ tl, q, step, final, move, click, type, count, wait, cursorOut }) => {
  const head = { p: SEEK.from }
  const paint = () => {
    q('fill').style.transform = `scaleX(${head.p})`
    q('time').textContent = `${time(head.p)} / ${time(1)}`
  }
  paint()

  step(0)
  move('track', { at: 0.3, ax: SEEK.from })
  click('track')
  move('track', { ax: SEEK.to, duration: 1.1 })
  tl.to(head, { p: SEEK.to, duration: 1.1, ease: 'power1.inOut', onUpdate: paint }, '<')

  step(1, '+=0.5')
  move('speed-select')
  click('speed-select')
  tl.fromTo(
    q('speed-menu'),
    { opacity: 0, y: -4 },
    { opacity: 1, y: 0, duration: 0.2, immediateRender: false },
    '<',
  )
  move(`speed-${SPEEDS.indexOf(SPEED)}`)
  click(`speed-${SPEEDS.indexOf(SPEED)}`)
  tl.to(q('speed-menu'), { opacity: 0, duration: 0.15 }, '<0.1')
  tl.set(q('speed-value'), { text: `${SPEED}×` }, '<')
  tl.fromTo(
    q('speed-chip'),
    { opacity: 0, scale: 0.6 },
    { opacity: 1, scale: 1, duration: 0.3, ease: 'back.out(3)', immediateRender: false },
    '<',
  )
  count('active', DEFAULT_ACTIVE + 1, { from: DEFAULT_ACTIVE, at: '<', duration: 0.4 })
  tl.to(head, { p: SEEK.to + 0.1, duration: 1, ease: 'none', onUpdate: paint }, '<')

  step(2, '+=0.4')
  move('download-btn')
  click('download-btn')
  tl.fromTo(
    q('status-chip'),
    { opacity: 0, x: 6 },
    { opacity: 1, x: 0, duration: 0.25, immediateRender: false },
    '<',
  )
  tl.fromTo(
    q('toast'),
    { opacity: 0, y: -10 },
    { opacity: 1, y: 0, duration: 0.35, ease: 'power3.out', immediateRender: false },
    '<0.3',
  )
  tl.to(q('status-chip'), { opacity: 0, duration: 0.25 }, '+=1.2')

  step(3, '+=0.3')
  tl.to(q('toast'), { opacity: 0, duration: 0.3 }, '<')
  tl.to(q('panel-body'), { y: -SCROLL, duration: 0.5, ease: 'power2.inOut' }, '<')
  move('caption-in', { dy: -SCROLL })
  click('caption-in')
  type('caption-in', CAPTION, { speed: 0.05 })
  move('bold-btn', { at: '+=0.2', dy: -SCROLL })
  click('bold-btn')
  tl.fromTo(
    q('caption-out'),
    { clipPath: 'inset(0 100% 0 0)' },
    { clipPath: 'inset(0 0% 0 0)', duration: 0.5, ease: 'power2.out', immediateRender: false },
    '<',
  )
  move('copy', { at: '+=0.3', dy: -SCROLL })
  click('copy')
  tl.to(q('copy-icon'), { opacity: 0, duration: 0.15 }, '<')
  tl.fromTo(
    q('copied-icon'),
    { opacity: 0, scale: 0.5 },
    { opacity: 1, scale: 1, duration: 0.3, ease: 'back.out(3)', immediateRender: false },
    '<',
  )
  cursorOut('<0.4')
  final()
  wait(0.8)

  tl.set(
    [q('speed-menu'), q('speed-chip'), q('status-chip'), q('toast'), q('copied-icon')],
    { opacity: 0 },
    0,
  )
  tl.set(q('caption-out'), { clipPath: 'inset(0 100% 0 0)' }, 0)
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <p className="mb-1 text-[9.5px] font-semibold uppercase tracking-[0.12em] text-muted">
        {title}
      </p>
      {children}
    </div>
  )
}

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex items-center justify-between text-[10px] text-ink-soft">
      {label}
      {children}
    </div>
  )
}

function Panel() {
  return (
    <div className="flex h-full flex-col">
      <DockHeader />
      <div className="min-h-0 flex-1 overflow-hidden">
        <div data-d="panel-body" className="flex flex-col gap-2 p-2.5">
          <div className="rounded-xl border border-line bg-white/[0.03] p-2.5">
            <div className="flex items-center justify-between gap-2">
              <span className="flex items-center gap-1.5">
                <CameraIcon className="size-4 text-[#ec4899]" />
                <span className="text-[11px] font-semibold text-ink">Instagram Control Panel</span>
              </span>
              <Toggle on />
            </div>
            <p className="mt-1 text-[9.5px] text-muted">
              <span data-d="active">{DEFAULT_ACTIVE}</span> enhancements active
            </p>
          </div>
          <Section title="Player">
            <div className="space-y-1">
              <Row label="Seek bar">
                <Toggle on />
              </Row>
              <Row label="Playback speed">
                <span className="relative">
                  <span
                    data-d="speed-select"
                    className="flex w-12 justify-between rounded border border-line-strong px-1.5 py-px text-ink"
                  >
                    <span data-d="speed-value">1×</span>▾
                  </span>
                  <span
                    data-d="speed-menu"
                    className="absolute right-0 top-full z-10 mt-0.5 w-12 rounded border border-line-strong bg-[#17171c] py-0.5 opacity-0 shadow-lg"
                  >
                    {SPEEDS.map((speed, index) => (
                      <span
                        key={speed}
                        data-d={`speed-${index}`}
                        className={`block px-1.5 text-[9px] leading-[14px] ${speed === SPEED ? 'bg-white/10 text-ink' : 'text-ink-soft'}`}
                      >
                        {speed}×
                      </span>
                    ))}
                  </span>
                </span>
              </Row>
              <Row label="Picture-in-Picture">
                <Toggle on />
              </Row>
            </div>
          </Section>
          <Section title="Download">
            <Row label="Media download button">
              <Toggle on />
            </Row>
          </Section>
          <div className="rounded-xl border border-line bg-white/[0.03] p-2">
            <p className="text-[10px] font-semibold text-ink">Caption formatter</p>
            <p className="text-[8.5px] text-muted">Spacing and Unicode styles for captions.</p>
            <div
              data-d="caption-in"
              className="mt-1.5 h-5 rounded border border-line-strong bg-black/20 px-1.5 text-[9.5px] leading-5 text-ink"
            />
            <div className="mt-1 flex gap-1 text-[8.5px]">
              <span className="rounded bg-white/10 px-1.5 py-0.5 text-ink-soft">
                Fix line breaks
              </span>
              <span data-d="bold-btn" className="rounded bg-white/10 px-1.5 py-0.5 text-ink">
                Bold Unicode
              </span>
              <span className="rounded bg-white/10 px-1.5 py-0.5 text-ink-soft">
                Italic Unicode
              </span>
            </div>
            <div className="mt-1 flex items-center gap-1">
              <div className="h-5 min-w-0 flex-1 rounded border border-line bg-black/20 px-1.5 text-[9.5px] leading-5 text-ink">
                <span data-d="caption-out" className="block">
                  {BOLD}
                </span>
              </div>
              <span
                data-d="copy"
                className="relative flex size-5 items-center justify-center rounded border border-line-strong"
              >
                <CopyIcon data-d="copy-icon" className="size-2.5 text-ink-soft" />
                <CheckIcon
                  data-d="copied-icon"
                  className="absolute size-3 text-[#22c55e] opacity-0"
                />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Demo() {
  return (
    <DemoStage
      label="Instagram Control Panel adding a seek bar to a reel, setting playback speed, downloading the video and formatting a caption in Unicode bold"
      steps={CAPTIONS}
      build={build}
    >
      <BrowserChrome
        url="https://www.instagram.com/reel/northwind-drop/"
        panel={<Panel />}
        panelWidth={214}
      >
        <div className="relative flex h-full justify-center bg-white pt-2.5 text-[#0f172a]">
          <div className="w-[164px]">
            <div className="mb-1.5 flex items-center gap-1.5">
              <span className="size-5 rounded-full bg-[conic-gradient(#f59e0b,#ec4899,#8b5cf6,#f59e0b)] p-[1.5px]">
                <span className="block size-full rounded-full border-2 border-white bg-[#cbd5e1]" />
              </span>
              <span className="text-[9.5px] font-semibold">northwind.studio</span>
            </div>
            <div className="relative aspect-[4/5] overflow-hidden rounded-md bg-[linear-gradient(160deg,#f472b6,#7c3aed_55%,#1e1b4b)]">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-[11px] font-semibold text-white/85">Fall collection</span>
              </div>
              <div className="absolute right-1.5 top-1.5 flex items-center gap-1">
                <span
                  data-d="status-chip"
                  className="rounded-full bg-black/60 px-1.5 py-0.5 text-[8px] font-medium text-white opacity-0"
                >
                  Downloading
                </span>
                <span
                  data-d="speed-chip"
                  className="rounded-full bg-black/60 px-1.5 py-0.5 text-[8px] font-medium text-white opacity-0"
                >
                  {SPEED}×
                </span>
                <span
                  data-d="download-btn"
                  className="flex size-5 items-center justify-center rounded-full bg-black/60"
                >
                  <DownloadIcon className="size-3 text-white" />
                </span>
                <span className="flex size-5 items-center justify-center rounded-full bg-black/60">
                  <PictureInPicture2Icon className="size-3 text-white" />
                </span>
              </div>
              <div className="absolute inset-x-1.5 bottom-1.5">
                <span
                  data-d="time"
                  className="mb-1 inline-block rounded-full bg-black/60 px-1.5 py-px text-[8px] tabular-nums text-white"
                />
                <div data-d="track" className="h-[3px] overflow-hidden rounded-full bg-white/35">
                  <span data-d="fill" className="block h-full origin-left rounded-full bg-white" />
                </div>
              </div>
            </div>
            <div className="mt-1.5 flex items-center gap-2">
              <HeartIcon className="size-3.5" />
              <MessageCircleIcon className="size-3.5" />
              <SendIcon className="size-3.5" />
              <BookmarkIcon className="ml-auto size-3.5" />
            </div>
            <p className="mt-1 truncate text-[9px]">
              <span className="font-semibold">northwind.studio </span>
              {CAPTION}
            </p>
          </div>
          <div
            data-d="toast"
            className="absolute right-2 top-2 flex items-center gap-1.5 rounded-lg border border-black/10 bg-white px-2 py-1.5 opacity-0 shadow-lg"
          >
            <FileVideoIcon className="size-4 text-[#7c3aed]" />
            <span>
              <span className="block text-[8.5px] font-semibold">{FILE}</span>
              <span className="block text-[8px] text-[#64748b]">Saved to Downloads</span>
            </span>
          </div>
        </div>
      </BrowserChrome>
    </DemoStage>
  )
}
