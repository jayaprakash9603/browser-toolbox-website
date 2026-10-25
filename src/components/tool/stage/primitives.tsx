import type { CSSProperties, ReactNode } from 'react'

import { cn } from '@/lib/cn'

const TOKEN =
  /("(?:[^"\\]|\\.)*"(?=\s*:))|("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')|(\b-?\d+(?:\.\d+)?\b)|(\b(?:true|false|null|undefined)\b)|(\b(?:SELECT|FROM|WHERE|JOIN|LEFT|ON|AND|OR|ORDER|BY|GROUP|LIMIT|AS|INSERT|INTO|VALUES|UPDATE|SET|const|let|function|return|import|export|from|await|async|new|if|else)\b)|(<\/?[\w:-]+|\/?>)|([{}[\](),:;=])/g

const TOKEN_CLASS = [
  '',
  'text-[var(--accent)]',
  'text-emerald',
  'text-amber',
  'text-rose',
  'text-violet',
  'text-cyan',
  'text-muted',
]

/** Tiny syntax colouring for JSON, JS, SQL and markup samples. */
export function highlight(code: string): ReactNode[] {
  const out: ReactNode[] = []
  let last = 0
  let key = 0
  for (const match of code.matchAll(TOKEN)) {
    const index = match.index ?? 0
    if (index > last) out.push(code.slice(last, index))
    const group = match.slice(1).findIndex(Boolean) + 1
    out.push(
      <span key={key++} className={TOKEN_CLASS[group]}>
        {match[0]}
      </span>,
    )
    last = index + match[0].length
  }
  if (last < code.length) out.push(code.slice(last))
  return out
}

/** Code block; each line is addressable as `data-d="{name}-line"` for staggered reveals. */
export function Code({
  code,
  name = 'code',
  className,
  numbers = true,
}: {
  code: string
  name?: string
  className?: string
  numbers?: boolean
}) {
  return (
    <div
      className={cn(
        'rounded-xl border border-line bg-canvas/80 p-3 font-mono text-[11.5px] leading-[1.65]',
        className,
      )}
    >
      {code.split('\n').map((line, index) => (
        <div key={index} data-d={`${name}-line`} className="flex whitespace-pre">
          {numbers ? (
            <span className="mr-3 w-4 shrink-0 select-none text-right text-muted/50">
              {index + 1}
            </span>
          ) : null}
          <span>{highlight(line)}</span>
        </div>
      ))}
    </div>
  )
}

export function Btn({
  children,
  d,
  primary = false,
  className,
}: {
  children: ReactNode
  d?: string
  primary?: boolean
  className?: string
}) {
  return (
    <span
      data-d={d}
      className={cn(
        'inline-flex h-7 items-center justify-center gap-1.5 rounded-lg px-3 text-[11.5px] font-medium',
        primary
          ? 'bg-[var(--accent)] text-canvas'
          : 'border border-line-strong bg-white/[0.04] text-ink-soft',
        className,
      )}
    >
      {children}
    </span>
  )
}

export function Chip({
  children,
  d,
  active = false,
  className,
  style,
}: {
  children: ReactNode
  d?: string
  active?: boolean
  className?: string
  style?: CSSProperties
}) {
  return (
    <span
      data-d={d}
      style={style}
      className={cn(
        'inline-flex h-6 items-center gap-1 whitespace-nowrap rounded-full border px-2.5 text-[10.5px]',
        active
          ? 'border-[color-mix(in_srgb,var(--accent)_60%,transparent)] bg-[color-mix(in_srgb,var(--accent)_16%,transparent)] text-ink'
          : 'border-line text-muted',
        className,
      )}
    >
      {children}
    </span>
  )
}

export function Toggle({
  d,
  on = false,
  className,
}: {
  d?: string
  on?: boolean
  className?: string
}) {
  return (
    <span
      data-d={d}
      className={cn('relative inline-flex h-4 w-7 shrink-0 rounded-full bg-white/15', className)}
    >
      <span
        data-d={d ? `${d}-fill` : undefined}
        className={cn(
          'absolute inset-0 rounded-full bg-[var(--accent)]',
          on ? 'opacity-100' : 'opacity-0',
        )}
      />
      <span
        data-d={d ? `${d}-knob` : undefined}
        className={cn(
          'absolute left-0.5 top-0.5 size-3 rounded-full bg-white',
          on && 'translate-x-3',
        )}
      />
    </span>
  )
}

export function Field({
  label,
  children,
  d,
  className,
  mono = false,
}: {
  label?: string
  children?: ReactNode
  d?: string
  className?: string
  mono?: boolean
}) {
  return (
    <div className={className}>
      {label ? (
        <p className="mb-1 text-[10px] uppercase tracking-[0.14em] text-muted">{label}</p>
      ) : null}
      <div
        className={cn(
          'flex min-h-8 items-center rounded-lg border border-line bg-canvas/80 px-2.5 text-[12px]',
          mono && 'font-mono text-[11px]',
        )}
      >
        <span data-d={d} className="min-w-0 flex-1 truncate">
          {children}
        </span>
      </div>
    </div>
  )
}

/** Skeleton text bar. */
export function Bar({
  w = '100%',
  className,
  d,
  style,
}: {
  w?: string | number
  className?: string
  d?: string
  style?: CSSProperties
}) {
  const custom = className ?? ''
  return (
    <span
      data-d={d}
      className={cn(
        'block rounded-full',
        !/(^|\s)h-/.test(custom) && 'h-2',
        !/(^|\s)bg-/.test(custom) && 'bg-white/10',
        className,
      )}
      style={{ width: w, ...style }}
    />
  )
}

export function Label({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn('font-mono text-[9.5px] uppercase tracking-[0.2em] text-muted', className)}>
      {children}
    </p>
  )
}

export function Card({
  children,
  className,
  d,
  style,
}: {
  children: ReactNode
  className?: string
  d?: string
  style?: CSSProperties
}) {
  return (
    <div
      data-d={d}
      style={style}
      className={cn('rounded-xl border border-line bg-canvas/70 p-3', className)}
    >
      {children}
    </div>
  )
}
