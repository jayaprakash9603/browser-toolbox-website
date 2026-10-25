'use client'

import type { ReactNode } from 'react'

import { Btn, Code, DemoStage, highlight, PanelChrome, type Build } from '@/components/tool/stage'

import { CAPTIONS, JSON_OUT, XML_LINES, XML_MIN } from './script'

const INDENT = 16

function Box({ tag, depth, children }: { tag: string; depth: number; children?: ReactNode }) {
  return (
    <div
      data-d={`box box-${depth}`}
      className="origin-top rounded-lg border px-2 pb-1.5 pt-1"
      style={{
        borderColor: ['#6366f1', '#22d3ee', '#f472b6'][depth],
        background: 'rgba(255,255,255,0.02)',
      }}
    >
      <p
        className="font-mono text-[10px]"
        style={{ color: ['#a5b4fc', '#67e8f9', '#f9a8d4'][depth] }}
      >
        {tag}
      </p>
      {children ? <div className="mt-1 space-y-1">{children}</div> : null}
    </div>
  )
}

const build: Build = ({ tl, q, qa, step, final, move, click, type, scramble, wait, cursorOut }) => {
  const swap = (from: string, to: string) => {
    tl.to(q(from), { opacity: 0, duration: 0.25 })
    tl.set(q(to), { opacity: 1 })
  }

  step(0)
  move('editor', { at: 0.3, ax: 0.2, ay: 0.2 })
  click('editor')
  type('min', XML_MIN, { speed: 0.01 })
  scramble('status', 'Valid', { at: '+=0.1', duration: 0.5 })
  tl.to(q('status'), { color: '#34d399', borderColor: 'rgba(52,211,153,0.5)', duration: 0.2 }, '<')

  step(1, '+=0.3')
  move('format')
  click('format')
  swap('min', 'formatted')
  tl.fromTo(
    qa('xml-line'),
    { x: (index) => -XML_LINES[index][0] * INDENT, opacity: 0.3 },
    { x: 0, opacity: 1, duration: 0.6, stagger: 0.05, ease: 'expo.out' },
    '<',
  )

  step(2, '+=0.5')
  move('tree')
  click('tree')
  swap('formatted', 'boxes')
  for (const depth of [0, 1, 2]) {
    tl.fromTo(
      qa(`box-${depth}`),
      { scaleY: 0, opacity: 0 },
      { scaleY: 1, opacity: 1, duration: 0.45, stagger: 0.08, ease: 'back.out(1.6)' },
      depth === 0 ? '<' : '<0.2',
    )
  }

  step(3, '+=0.5')
  move('json')
  click('json')
  swap('boxes', 'json-out')
  tl.fromTo(
    qa('json-line'),
    { opacity: 0, x: 8 },
    { opacity: 1, x: 0, duration: 0.3, stagger: 0.05 },
    '<',
  )
  cursorOut('+=0.2')
  final()
  wait(1.4)
}

export default function Demo() {
  return (
    <DemoStage
      label="XML Toolkit validating, formatting, showing nesting and converting XML to JSON"
      steps={CAPTIONS}
      build={build}
    >
      <PanelChrome
        aside={
          <span
            data-d="status"
            className="rounded-full border border-line-strong px-2.5 py-1 font-mono text-[10px] text-muted"
          >
            —
          </span>
        }
      >
        <div className="flex h-full flex-col gap-3">
          <div
            data-d="editor"
            className="relative min-h-0 flex-1 overflow-hidden rounded-xl border border-line bg-canvas/80 font-mono text-[11px]"
          >
            <p
              data-d="min"
              className="demo-caret absolute inset-3 break-all leading-[18px] text-ink-soft"
            />
            <div data-d="formatted" className="absolute inset-3 opacity-0">
              {XML_LINES.map(([depth, line], index) => (
                <p
                  key={index}
                  data-d="xml-line"
                  className="h-[19px] whitespace-pre"
                  style={{ paddingLeft: depth * INDENT }}
                >
                  {highlight(line)}
                </p>
              ))}
            </div>
            <div data-d="boxes" className="absolute inset-3 opacity-0">
              <Box tag='<order id="7">' depth={0}>
                <Box tag="<customer> Ada" depth={1} />
                <Box tag="<items>" depth={1}>
                  <Box tag='<item sku="A1"> 2' depth={2} />
                  <Box tag='<item sku="B4"> 1' depth={2} />
                </Box>
              </Box>
            </div>
            <div data-d="json-out" className="absolute inset-0 opacity-0">
              <Code
                code={JSON_OUT}
                name="json"
                numbers={false}
                className="rounded-none border-0 bg-transparent text-[10.5px] leading-[16px]"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <Btn d="format">Format</Btn>
            <Btn d="tree">Nesting</Btn>
            <Btn d="json" primary>
              XML → JSON
            </Btn>
          </div>
        </div>
      </PanelChrome>
    </DemoStage>
  )
}
