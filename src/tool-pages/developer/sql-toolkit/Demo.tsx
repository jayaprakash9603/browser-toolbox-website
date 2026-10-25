'use client'

import { Btn, Code, DemoStage, PanelChrome, type Build } from '@/components/tool/stage'

import { CAPTIONS, FORMATTED, KEYWORDS, MINIFIED, QUERY } from './script'

const build: Build = ({ tl, q, qa, step, final, move, click, wait, cursorOut }) => {
  step(0)
  tl.fromTo(
    qa('token'),
    { opacity: 0 },
    { opacity: 1, duration: 0.05, stagger: 0.03, ease: 'none' },
    0.3,
  )

  step(1, '+=0.3')
  move('case')
  click('case')
  tl.to(
    qa('kw-lower'),
    { rotateX: 90, opacity: 0, duration: 0.2, stagger: 0.05, ease: 'power2.in' },
    '<0.1',
  )
  tl.fromTo(
    qa('kw-upper'),
    { rotateX: -90, opacity: 0 },
    { rotateX: 0, opacity: 1, duration: 0.3, stagger: 0.05, ease: 'back.out(2)' },
    '<0.12',
  )

  step(2, '+=0.4')
  move('format')
  click('format')
  tl.to(q('raw'), { opacity: 0, y: -6, duration: 0.25 }, '<')
  tl.set(q('formatted'), { opacity: 1 })
  tl.fromTo(
    qa('sql-line'),
    { opacity: 0, x: -18 },
    { opacity: 1, x: 0, duration: 0.45, stagger: 0.08, ease: 'expo.out' },
  )

  step(3, '+=0.5')
  move('minify')
  click('minify')
  tl.to(
    qa('sql-line'),
    { y: (index) => -index * 19, opacity: 0, duration: 0.45, stagger: 0.02, ease: 'power3.in' },
    '<',
  )
  tl.fromTo(
    q('min'),
    { opacity: 0, scaleX: 0.7 },
    { opacity: 1, scaleX: 1, duration: 0.4, ease: 'expo.out' },
    '-=0.1',
  )
  cursorOut('+=0.2')
  final()
  wait(1.4)
}

export default function Demo() {
  return (
    <DemoStage
      label="SQL Toolkit upper-casing keywords, formatting a query into clauses and minifying it"
      steps={CAPTIONS}
      build={build}
    >
      <PanelChrome
        aside={
          <span className="rounded-full border border-line-strong px-2.5 py-1 text-[10px] text-ink-soft">
            PostgreSQL ▾
          </span>
        }
      >
        <div className="flex h-full flex-col gap-3">
          <div className="relative min-h-0 flex-1 overflow-hidden rounded-xl border border-line bg-canvas/80 font-mono text-[11px] leading-[19px] [perspective:500px]">
            <p
              data-d="raw"
              className="absolute inset-3 flex flex-wrap content-start gap-x-[0.6ch] text-ink-soft"
            >
              {QUERY.split(' ').map((token, index) =>
                KEYWORDS.has(token) ? (
                  <span key={index} data-d="token" className="inline-grid">
                    <span data-d="kw-lower" className="[grid-area:1/1]">
                      {token}
                    </span>
                    <span data-d="kw-upper" className="text-violet opacity-0 [grid-area:1/1]">
                      {token.replace(/^[a-z]+/, (word) => word.toUpperCase())}
                    </span>
                  </span>
                ) : (
                  <span key={index} data-d="token">
                    {token}
                  </span>
                ),
              )}
            </p>
            <div data-d="formatted" className="absolute inset-0 opacity-0">
              <Code
                code={FORMATTED}
                name="sql"
                numbers={false}
                className="rounded-none border-0 bg-transparent leading-[19px]"
              />
            </div>
            <p
              data-d="min"
              className="absolute inset-x-3 top-3 origin-left break-all text-emerald opacity-0"
            >
              {MINIFIED}
            </p>
          </div>
          <div className="flex gap-2">
            <Btn d="case">Aa → AA</Btn>
            <Btn d="format" primary>
              Format
            </Btn>
            <Btn d="minify">Minify</Btn>
          </div>
        </div>
      </PanelChrome>
    </DemoStage>
  )
}
