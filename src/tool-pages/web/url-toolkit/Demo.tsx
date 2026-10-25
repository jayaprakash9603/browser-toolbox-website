'use client'

import { CopyIcon, PlusIcon, Trash2Icon } from 'lucide-react'

import { DemoStage, PanelChrome, type Build } from '@/components/tool/stage'
import { cn } from '@/lib/cn'

import { ADDED, CAPTIONS, CLEANED, PARAMS, PARTS, REMOVED, SEGMENTS } from './script'

const COLOR: Record<string, string> = {
  protocol: '#38bdf8',
  host: '#a78bfa',
  path: '#34d399',
  fragment: '#fbbf24',
}
const FLYING = SEGMENTS.flatMap((segment) =>
  segment.part ? [{ text: segment.text, part: segment.part }] : [],
)

const build: Build = ({ tl, q, qa, step, final, move, click, type, fly, wait, cursorOut }) => {
  const tab = (index: number) => {
    move(`tab-${index}`)
    click(`tab-${index}`)
    tl.to(
      qa('tab'),
      { backgroundColor: 'rgba(255,255,255,0)', color: '#8b8b9a', duration: 0.15 },
      '<',
    )
    tl.to(
      q(`tab-${index}`),
      { backgroundColor: 'rgba(56,189,248,0.2)', color: '#f4f4f6', duration: 0.15 },
      '<',
    )
  }

  step(0)
  tl.fromTo(qa('seg'), { opacity: 0 }, { opacity: 1, duration: 0.05, stagger: 0.12 }, 0.3)

  step(1, '+=0.3')
  FLYING.forEach((segment, index) => {
    const at = index === 0 ? undefined : '<0.18'
    tl.to(q(`seg-${segment.part}`), { color: COLOR[segment.part], duration: 0.2 }, at)
    fly(`ghost-${segment.part}`, `seg-${segment.part}`, `part-${segment.part}`, {
      at: '<',
      duration: 0.6,
      lift: 30,
    })
    tl.to(q(`ghost-${segment.part}`), { opacity: 0, duration: 0.12 }, '>-0.05')
    tl.fromTo(q(`part-${segment.part}`), { opacity: 0.25 }, { opacity: 1, duration: 0.2 }, '<')
  })
  tl.to(q('part-port'), { opacity: 1, duration: 0.2 }, '<')
  tl.fromTo(
    qa('param'),
    { opacity: 0, x: -8 },
    { opacity: 1, x: 0, duration: 0.25, stagger: 0.07 },
    '<0.1',
  )

  step(2, '+=0.4')
  move('add-key', { ax: 0.3 })
  click('add-key')
  type('add-key-text', ADDED.key, { speed: 0.08 })
  move('add-value', { ax: 0.3 })
  click('add-value')
  type('add-value-text', ADDED.value, { speed: 0.08 })
  move('add')
  click('add')
  tl.to([q('add-key-text'), q('add-value-text')], { text: '', duration: 0.1 }, '<0.1')
  tl.fromTo(
    q('param-added'),
    { opacity: 0, height: 0 },
    { opacity: 1, height: 22, duration: 0.3, ease: 'power3.out' },
    '<',
  )
  type('param-count', String(PARAMS.length + 1), { at: '<' })
  type('seg-added', `&${ADDED.key}=${ADDED.value}`, { at: '<', speed: 0.04 })

  step(3, '+=0.4')
  tab(2)
  tl.to(q('parse'), { opacity: 0, duration: 0.2 }, '<')
  tl.fromTo(q('clean'), { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.3 }, '<0.1')
  tl.to(q('seg-utm'), { backgroundColor: 'rgba(251,191,36,0.3)', duration: 0.25 })
  tl.to(q('seg-utm'), { textDecorationColor: 'rgba(251,191,36,1)', duration: 0.2 })
  tl.fromTo(q('cleaned'), { opacity: 0 }, { opacity: 1, duration: 0.3 }, '<')
  move('copy', { at: '+=0.2' })
  click('copy')
  tl.to(q('copy'), { color: '#38bdf8', duration: 0.15 }, '<')
  cursorOut('+=0.2')
  final()
  wait(1.4)
}

export default function Demo() {
  const search = SEGMENTS[4].text
  const [beforeUtm, utm] = search.split(/(?=utm_)/)
  return (
    <DemoStage
      label="URL Toolkit splitting a URL into parts, adding a parameter and stripping tracking"
      steps={CAPTIONS}
      build={build}
    >
      <PanelChrome>
        <div className="flex h-full flex-col gap-2">
          <div className="flex gap-1 rounded-lg border border-line bg-canvas/60 p-0.5 text-[10.5px]">
            {['Parse', 'Encode', 'Clean'].map((name, index) => (
              <span
                key={name}
                data-d={`tab tab-${index}`}
                className={cn(
                  'flex-1 rounded-md py-1 text-center',
                  index === 0 ? 'bg-[#38bdf8]/20 text-ink' : 'text-muted',
                )}
              >
                {name}
              </span>
            ))}
          </div>
          <p className="min-h-[38px] break-all rounded-lg border border-line bg-canvas/80 px-2.5 py-2 font-mono text-[10px] leading-[15px] text-ink-soft">
            {SEGMENTS.map((segment, index) =>
              index === 4 ? (
                <span key={index} data-d="seg" className="opacity-0">
                  {beforeUtm}
                  <span
                    data-d="seg-utm"
                    className="rounded-sm line-through decoration-transparent decoration-2"
                  >
                    {utm}
                  </span>
                </span>
              ) : index === 5 ? (
                <span key={index}>
                  <span data-d="seg-added" className="text-[#38bdf8]" />
                  <span data-d={`seg seg-${segment.part}`} className="opacity-0">
                    {segment.text}
                  </span>
                </span>
              ) : (
                <span
                  key={index}
                  data-d={segment.part ? `seg seg-${segment.part}` : 'seg'}
                  className="opacity-0"
                >
                  {segment.text}
                </span>
              ),
            )}
          </p>
          <div className="relative min-h-0 flex-1">
            <div data-d="parse" className="absolute inset-0 flex flex-col gap-2">
              <div className="grid grid-cols-3 gap-1.5">
                {PARTS.map((part) => (
                  <div
                    key={part.key}
                    data-d={`part-${part.key}`}
                    className="rounded-md border border-line bg-canvas/60 px-2 py-1 opacity-25"
                  >
                    <p className="text-[8.5px] text-muted">{part.label}</p>
                    <p
                      className="truncate font-mono text-[10px]"
                      style={{ color: COLOR[part.key] ?? '#8b8b9a' }}
                    >
                      {part.value}
                    </p>
                  </div>
                ))}
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-medium text-ink-soft">
                  <span data-d="param-count">{PARAMS.length}</span> query parameters
                </p>
                {[...PARAMS, ADDED].map((param, index) => (
                  <div
                    key={param.key}
                    data-d={index === PARAMS.length ? 'param-added' : 'param'}
                    className="flex h-[22px] items-center gap-1 overflow-hidden rounded-md border border-line bg-white/[0.03] px-1.5 font-mono text-[9.5px] opacity-0"
                  >
                    <span className="text-[#38bdf8]">{param.key}</span>
                    <span className="text-muted">=</span>
                    <span className="flex-1 truncate text-ink-soft">{param.value}</span>
                    <Trash2Icon className="size-2.5 text-muted" />
                  </div>
                ))}
                <div className="flex gap-1 pt-0.5">
                  {(['add-key', 'add-value'] as const).map((d) => (
                    <span
                      key={d}
                      data-d={d}
                      className="flex h-6 flex-1 items-center rounded-md border border-line bg-canvas/80 px-1.5 font-mono text-[9.5px] text-ink"
                    >
                      <span
                        data-d={`${d}-text`}
                        className={
                          d === 'add-key'
                            ? "empty:before:text-muted empty:before:content-['key']"
                            : "empty:before:text-muted empty:before:content-['value']"
                        }
                      />
                    </span>
                  ))}
                  <span
                    data-d="add"
                    className="flex size-6 items-center justify-center rounded-md bg-[var(--accent)] text-canvas"
                  >
                    <PlusIcon className="size-3" />
                  </span>
                </div>
              </div>
            </div>
            <div data-d="clean" className="absolute inset-0 space-y-2 opacity-0">
              <p className="rounded-md border border-amber/40 bg-amber/5 px-2 py-1.5 text-[10px] text-ink-soft">
                Removed tracking params:{' '}
                <span className="font-medium text-amber">{REMOVED.join(', ')}</span>
              </p>
              <div
                data-d="cleaned"
                className="flex items-center gap-2 rounded-md border border-line bg-white/[0.03] px-2 py-1.5"
              >
                <code className="min-w-0 flex-1 break-all font-mono text-[10px] text-ink">
                  {CLEANED}
                </code>
                <span data-d="copy" className="text-muted">
                  <CopyIcon className="size-3" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </PanelChrome>
      {FLYING.map((segment) => (
        <span
          key={segment.part}
          data-d={`ghost-${segment.part}`}
          className="absolute left-0 top-0 z-30 whitespace-nowrap rounded-md border bg-[#0f1520] px-1.5 py-0.5 font-mono text-[10px] opacity-0 shadow-xl"
          style={{ color: COLOR[segment.part], borderColor: COLOR[segment.part] }}
        >
          {segment.text}
        </span>
      ))}
    </DemoStage>
  )
}
