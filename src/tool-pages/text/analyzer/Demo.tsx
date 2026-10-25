'use client'

import { DemoStage, Label, PanelChrome, type Build } from '@/components/tool/stage'

import { CAPTIONS, LINE_VALUES, LINES, READABILITY_LABEL, STATS, TEXT_LINES } from './script'

const MAX_LINE = Math.max(...LINE_VALUES)

const TILES = [
  { d: 'words', label: 'Words', value: STATS.words },
  { d: 'chars', label: 'Characters', value: STATS.characters },
  { d: 'sentences', label: 'Sentences', value: STATS.sentences },
  { d: 'seconds', label: 'Reading time', value: STATS.seconds, suffix: ' s' },
]

const ARC = 'M 14 66 A 46 46 0 0 1 106 66'

const build: Build = ({
  tl,
  q,
  qa,
  step,
  final,
  move,
  click,
  count,
  scramble,
  wait,
  cursorOut,
}) => {
  step(0)
  move('editor', { at: 0.3, ax: 0.15, ay: 0.3 })
  click('editor')
  tl.fromTo(
    qa('word'),
    { opacity: 0 },
    { opacity: 1, duration: 0.05, stagger: 0.025, ease: 'none' },
  )
  cursorOut('<0.6')

  step(1, '+=0.3')
  tl.fromTo(qa('tile'), { y: 10, opacity: 0.3 }, { y: 0, opacity: 1, duration: 0.4, stagger: 0.08 })
  TILES.forEach((tile, index) =>
    count(tile.d, tile.value, {
      at: index === 0 ? '<' : '<0.08',
      duration: 0.9,
      suffix: tile.suffix,
    }),
  )

  step(2, '+=0.6')
  tl.fromTo(
    q('arc'),
    { drawSVG: '0%' },
    { drawSVG: `${STATS.readability}%`, duration: 1, ease: 'power2.out' },
  )
  tl.fromTo(
    q('needle'),
    { rotation: -90, svgOrigin: '60 66' },
    {
      rotation: -90 + (STATS.readability / 100) * 180,
      svgOrigin: '60 66',
      duration: 1,
      ease: 'back.out(1.6)',
    },
    '<',
  )
  count('score', STATS.readability, { at: '<', duration: 1 })
  scramble('grade', READABILITY_LABEL, { at: '<0.4', duration: 0.6 })

  step(3, '+=0.6')
  tl.fromTo(
    qa('line-bar'),
    { scaleX: 0 },
    { scaleX: 1, duration: 0.7, stagger: 0.12, ease: 'expo.out' },
  )
  LINE_VALUES.forEach((value, index) =>
    count(`line-${index}`, value, {
      at: index === 0 ? '<' : '<0.12',
      duration: 0.7,
      suffix: ' ch',
    }),
  )
  final('+=0.4')
  wait(1.4)
}

export default function Demo() {
  return (
    <DemoStage
      label="Text Analyzer counting words and characters, scoring readability and measuring lines"
      steps={CAPTIONS}
      build={build}
    >
      <PanelChrome>
        <div className="flex h-full flex-col gap-2.5">
          <p
            data-d="editor"
            className="h-[86px] overflow-hidden rounded-xl border border-line bg-canvas/80 px-3 py-2 text-[11px] leading-[17px] text-ink-soft"
          >
            {TEXT_LINES.map((line, row) => (
              <span key={row} className="block truncate">
                {line.split(' ').map((word, index) => (
                  <span key={index} data-d="word">
                    {word}{' '}
                  </span>
                ))}
              </span>
            ))}
          </p>
          <div className="grid grid-cols-4 gap-2">
            {TILES.map((tile) => (
              <div
                key={tile.d}
                data-d="tile"
                className="rounded-xl border border-line bg-canvas/60 px-2.5 py-2"
              >
                <p className="text-[9px] text-muted">{tile.label}</p>
                <p className="mt-0.5 text-[18px] font-semibold leading-none tracking-tight">
                  <span data-d={tile.d}>0</span>
                </p>
              </div>
            ))}
          </div>
          <div className="grid min-h-0 flex-1 grid-cols-[150px_1fr] gap-2.5">
            <div className="flex flex-col items-center rounded-xl border border-line bg-canvas/60 pt-2">
              <Label>Readability</Label>
              <svg viewBox="0 0 120 74" className="mt-1 w-[120px]">
                <path
                  d={ARC}
                  fill="none"
                  stroke="rgba(255,255,255,0.08)"
                  strokeWidth="9"
                  strokeLinecap="round"
                />
                <path
                  data-d="arc"
                  d={ARC}
                  fill="none"
                  stroke="#818cf8"
                  strokeWidth="9"
                  strokeLinecap="round"
                />
                <line
                  data-d="needle"
                  x1="60"
                  y1="66"
                  x2="60"
                  y2="30"
                  stroke="#f4f4f6"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <circle cx="60" cy="66" r="4" fill="#f4f4f6" />
              </svg>
              <p className="-mt-1 text-[16px] font-semibold">
                <span data-d="score">0</span>
              </p>
              <p data-d="grade" className="text-[9.5px] text-[var(--accent)]">
                —
              </p>
            </div>
            <div className="space-y-2.5 rounded-xl border border-line bg-canvas/60 p-3">
              <Label>Line metrics</Label>
              {LINES.map((label, index) => (
                <div key={label}>
                  <div className="flex justify-between text-[10px]">
                    <span className="text-muted">{label}</span>
                    <span data-d={`line-${index}`} className="font-mono">
                      0 ch
                    </span>
                  </div>
                  <span className="mt-1 block h-1.5 rounded-full bg-white/[0.06]">
                    <span
                      data-d="line-bar"
                      className="block h-full origin-left scale-x-0 rounded-full bg-[var(--accent)]"
                      style={{ width: `${(LINE_VALUES[index] / MAX_LINE) * 100}%` }}
                    />
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </PanelChrome>
    </DemoStage>
  )
}
