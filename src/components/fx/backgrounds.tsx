import type { CSSProperties } from 'react'

import { cn } from '@/lib/cn'

const layer = 'pointer-events-none absolute inset-0 overflow-hidden'

/** Slow drifting blurred colour fields. */
export function Aurora({ className, intensity = 0.5 }: { className?: string; intensity?: number }) {
  return (
    <div aria-hidden="true" className={cn(layer, className)} style={{ opacity: intensity }}>
      <div
        className="absolute -left-1/4 top-0 h-[70%] w-[70%] rounded-full blur-[120px] motion-safe:animate-[aurora-drift_26s_linear_infinite]"
        style={{ background: 'radial-gradient(circle, color-mix(in srgb, var(--accent) 70%, transparent), transparent 65%)' }}
      />
      <div
        className="absolute -right-1/4 bottom-0 h-[60%] w-[60%] rounded-full blur-[120px] motion-safe:animate-[aurora-drift_32s_linear_infinite_reverse]"
        style={{ background: 'radial-gradient(circle, rgb(34 211 238 / 0.55), transparent 65%)' }}
      />
      <div
        className="absolute left-1/3 top-1/3 h-[45%] w-[45%] rounded-full blur-[120px] motion-safe:animate-[aurora-drift_38s_linear_infinite]"
        style={{ background: 'radial-gradient(circle, rgb(139 92 246 / 0.5), transparent 65%)' }}
      />
    </div>
  )
}

/** Dotted field that fades towards the edges. */
export function DotField({ className, size = 22 }: { className?: string; size?: number }) {
  return (
    <div
      aria-hidden="true"
      className={cn(layer, '[mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_72%)]', className)}
      style={{
        backgroundImage: 'radial-gradient(circle at center, color-mix(in srgb, var(--accent) 55%, transparent) 1px, transparent 1.6px)',
        backgroundSize: `${size}px ${size}px`,
        opacity: 0.55,
      }}
    />
  )
}

/** Vertical light beams sweeping down. */
export function Beams({ className, count = 7 }: { className?: string; count?: number }) {
  return (
    <div aria-hidden="true" className={cn(layer, '[mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)]', className)}>
      {Array.from({ length: count }, (_, index) => (
        <span key={index} className="absolute inset-y-0 w-px bg-white/[0.05]" style={{ left: `${((index + 0.5) / count) * 100}%` }}>
          <span
            className="absolute inset-x-0 h-1/3 motion-safe:animate-[beam-sweep_linear_infinite]"
            style={{
              background: 'linear-gradient(to bottom, transparent, var(--accent), transparent)',
              animationDuration: `${6 + ((index * 37) % 7)}s`,
              animationDelay: `${-((index * 53) % 9)}s`,
            }}
          />
        </span>
      ))}
    </div>
  )
}

/** Receding perspective grid with scrolling lines. */
export function GridFloor({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={cn(layer, '[perspective:600px]', className)}>
      <div
        className="absolute -inset-x-1/2 bottom-0 h-[70%] origin-bottom [transform:rotateX(62deg)] [mask-image:linear-gradient(to_top,black,transparent_85%)] motion-safe:animate-[grid-scroll_2.4s_linear_infinite]"
        style={{
          backgroundImage:
            'linear-gradient(to right, color-mix(in srgb, var(--accent) 40%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in srgb, var(--accent) 40%, transparent) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          opacity: 0.45,
        }}
      />
    </div>
  )
}

/** Diagonal streaks. Positions are deterministic so server and client markup match. */
export function Meteors({ className, count = 14 }: { className?: string; count?: number }) {
  return (
    <div aria-hidden="true" className={cn(layer, className)}>
      {Array.from({ length: count }, (_, index) => (
        <span
          key={index}
          className="absolute size-0.5 rounded-full bg-white shadow-[0_0_0_1px_rgb(255_255_255/0.1)] motion-safe:animate-[meteor_linear_infinite] motion-reduce:hidden"
          style={
            {
              top: `${(index * 29) % 50}%`,
              left: `${20 + ((index * 41) % 90)}%`,
              animationDuration: `${3 + ((index * 17) % 6)}s`,
              animationDelay: `${(index * 0.73) % 6}s`,
            } as CSSProperties
          }
        >
          <span className="absolute top-1/2 h-px w-20 -translate-y-1/2 bg-gradient-to-r from-[var(--accent)] to-transparent" />
        </span>
      ))}
    </div>
  )
}

/** Local film grain for a single section. */
export function Grain({ className, opacity = 0.08 }: { className?: string; opacity?: number }) {
  return (
    <div
      aria-hidden="true"
      className={cn(layer, className)}
      style={{
        opacity,
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
      }}
    />
  )
}

/** Concentric rings radiating from the centre. */
export function Rings({ className, count = 6 }: { className?: string; count?: number }) {
  return (
    <div aria-hidden="true" className={cn(layer, 'flex items-center justify-center', className)}>
      {Array.from({ length: count }, (_, index) => (
        <span
          key={index}
          className="absolute rounded-full border"
          style={{
            width: `${(index + 1) * 16}%`,
            aspectRatio: '1',
            borderColor: `color-mix(in srgb, var(--accent) ${Math.max(4, 28 - index * 4)}%, transparent)`,
          }}
        />
      ))}
    </div>
  )
}
