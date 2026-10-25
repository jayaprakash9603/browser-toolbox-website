'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'

import { cn } from '@/lib/cn'
import { ScrollTrigger } from '@/motion/gsapExtra'

/** Wraps a tool's chapters and adds a progress rail listing them on wide screens. */
export function StoryShell({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [chapters, setChapters] = useState<string[]>([])
  const [active, setActive] = useState(-1)

  useEffect(() => {
    const root = ref.current
    if (!root) return
    const sections = Array.from(root.querySelectorAll<HTMLElement>('[data-chapter]'))
    setChapters(sections.map((section) => section.dataset.chapter ?? ''))
    const triggers = sections.map((section, index) =>
      ScrollTrigger.create({
        trigger: section,
        start: 'top 55%',
        end: 'bottom 55%',
        onToggle: (self) => {
          if (self.isActive) setActive(index)
        },
      }),
    )
    const outside = ScrollTrigger.create({
      trigger: root,
      start: 'top 55%',
      end: 'bottom 55%',
      onToggle: (self) => {
        if (!self.isActive) setActive(-1)
      },
    })
    return () => {
      triggers.forEach((trigger) => trigger.kill())
      outside.kill()
    }
  }, [])

  const go = (index: number) => {
    ref.current
      ?.querySelectorAll<HTMLElement>('[data-chapter]')
      [index]?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div ref={ref} className={cn('relative', className)}>
      {children}
      {chapters.length > 1 ? (
        <nav
          aria-label="Page chapters"
          className={cn(
            'fixed left-5 top-1/2 z-30 hidden -translate-y-1/2 transition-opacity duration-500 2xl:block',
            active < 0 ? 'pointer-events-none opacity-0' : 'opacity-100',
          )}
        >
          <ol className="space-y-1">
            {chapters.map((chapter, index) => (
              <li key={chapter}>
                <button
                  type="button"
                  onClick={() => go(index)}
                  aria-current={index === active ? 'true' : undefined}
                  className="group flex h-7 items-center gap-3 text-left"
                >
                  <span
                    className={cn(
                      'h-px transition-all duration-500 ease-[var(--ease-out-expo)]',
                      index === active
                        ? 'w-8 bg-[var(--accent)]'
                        : 'w-4 bg-white/25 group-hover:w-6 group-hover:bg-white/60',
                    )}
                  />
                  <span
                    className={cn(
                      'font-mono text-[10px] uppercase tracking-[0.2em] transition-opacity duration-300',
                      index === active
                        ? 'text-ink opacity-100'
                        : 'text-muted opacity-0 group-hover:opacity-100',
                    )}
                  >
                    {chapter}
                  </span>
                </button>
              </li>
            ))}
          </ol>
        </nav>
      ) : null}
    </div>
  )
}
