'use client'

import { Btn, DemoStage, PanelChrome, type Build } from '@/components/tool/stage'
import { gsap } from '@/motion/gsapExtra'

import { CAPTIONS, LINES, REMOVED, type Token } from './script'

const MARK = { lead: '·', trail: '·', dup: '·', tab: '→' }

function Space({ token }: { token: Exclude<Token, string> }) {
  const extra = token.ws === 'dup' ? token.n - 1 : token.n
  return (
    <>
      {token.ws === 'dup' ? <span className="inline-block w-[1ch]"> </span> : null}
      <span
        data-d={`ws ws-${token.ws === 'dup' ? 'dup' : 'edge'}`}
        className="inline-block overflow-visible whitespace-pre align-bottom"
        style={{ width: `${extra}ch` }}
      >
        {Array.from({ length: extra }, (_, index) => (
          <span
            key={index}
            data-d="dust"
            className="inline-block w-[1ch] text-center text-[var(--accent)]/70"
          >
            {MARK[token.ws]}
          </span>
        ))}
      </span>
    </>
  )
}

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
  const sweep = () =>
    tl.fromTo(
      q('broom'),
      { xPercent: -100, opacity: 1 },
      { xPercent: 420, opacity: 1, duration: 0.7, ease: 'power2.inOut' },
    )
  const burst = (selector: string) => {
    const dust = qa(selector).flatMap((group) =>
      Array.from(group.querySelectorAll<HTMLElement>('[data-d="dust"]')),
    )
    const at = tl.duration()
    dust.forEach((dot, index) => {
      tl.to(
        dot,
        {
          y: gsap.utils.random(-26, -8),
          x: gsap.utils.random(-10, 14),
          scale: 0.3,
          opacity: 0,
          duration: 0.5,
          ease: 'power2.out',
        },
        at + 0.15 + index * 0.012,
      )
    })
    tl.to(qa(selector), { width: 0, duration: 0.35, ease: 'power3.inOut' }, '-=0.25')
  }

  step(0)
  tl.fromTo(
    qa('line'),
    { opacity: 0, y: 6 },
    { opacity: 1, y: 0, duration: 0.4, stagger: 0.06 },
    0.3,
  )
  tl.fromTo(
    qa('dust'),
    { scale: 0.4 },
    { scale: 1.4, duration: 0.25, yoyo: true, repeat: 1, stagger: 0.01, ease: 'power2.out' },
    '+=0.2',
  )

  step(1, '+=0.3')
  move('trim')
  click('trim')
  sweep()
  burst('ws-edge')

  step(2, '+=0.4')
  move('collapse')
  click('collapse')
  sweep()
  burst('ws-dup')

  step(3, '+=0.4')
  move('blank')
  click('blank')
  tl.to(
    qa('blank-line'),
    { height: 0, opacity: 0, duration: 0.4, stagger: 0.06, ease: 'power3.inOut' },
    '+=0.1',
  )
  scramble('eol', 'LF', { at: '<', duration: 0.5, chars: 'CRLF' })
  tl.fromTo(q('removed'), { opacity: 0, y: 6 }, { opacity: 1, y: 0, duration: 0.3 }, '<0.2')
  count('removed-n', REMOVED, { at: '<', duration: 0.7 })
  cursorOut('+=0.2')
  final()
  wait(1.4)
}

export default function Demo() {
  return (
    <DemoStage
      label="Whitespace Cleaner trimming lines, collapsing spaces and removing blank lines"
      steps={CAPTIONS}
      build={build}
    >
      <PanelChrome
        aside={
          <span className="font-mono text-[10px] text-muted">
            EOL{' '}
            <span data-d="eol" className="text-[var(--accent)]">
              CRLF
            </span>
          </span>
        }
      >
        <div className="flex h-full flex-col gap-3">
          <div className="relative min-h-0 flex-1 overflow-hidden rounded-xl border border-line bg-canvas/80 p-3 font-mono text-[11px] leading-[22px] text-ink-soft">
            {LINES.map((line, index) =>
              line === 'blank' ? (
                <p
                  key={index}
                  data-d="line blank-line"
                  className="h-[22px] overflow-hidden text-[var(--accent)]/50"
                >
                  ¶
                </p>
              ) : (
                <p key={index} data-d="line" className="h-[22px] whitespace-nowrap">
                  {line.map((token, part) =>
                    typeof token === 'string' ? (
                      <span key={part}>{token}</span>
                    ) : (
                      <Space key={part} token={token} />
                    ),
                  )}
                  <span className="text-[var(--accent)]/50">¶</span>
                </p>
              ),
            )}
            <span
              data-d="broom"
              className="pointer-events-none absolute inset-y-0 left-0 w-1/4 opacity-0"
              style={{
                background:
                  'linear-gradient(90deg, transparent, rgba(129,140,248,0.28), transparent)',
              }}
            />
          </div>
          <div className="flex items-center gap-2">
            <Btn d="trim">Trim lines</Btn>
            <Btn d="collapse">Collapse spaces</Btn>
            <Btn d="blank">Remove blank</Btn>
          </div>
          <p
            data-d="removed"
            className="absolute bottom-[3.25rem] right-4 rounded-full bg-emerald/15 px-2.5 py-1 font-mono text-[10px] text-emerald opacity-0"
          >
            −<span data-d="removed-n">0</span> characters
          </p>
        </div>
      </PanelChrome>
    </DemoStage>
  )
}
