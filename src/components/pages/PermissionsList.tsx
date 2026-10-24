'use client'

import { useRef, useState } from 'react'

import { cn } from '@/lib/cn'
import type { PermissionGroup } from '@/content/permissions'
import { gsap, MOTION_QUERIES, ScrollTrigger, useGSAP } from '@/motion/gsap'
import { TransitionLink } from '@/motion/TransitionLink'

const KIND_LABEL = { required: 'Required', optional: 'Optional', host: 'Host access' } as const

export function PermissionsList({ groups }: { groups: PermissionGroup[] }) {
  const rootRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(groups[0]?.id)

  useGSAP(
    () => {
      const root = rootRef.current
      if (!root) return
      const triggers = groups.map((group) =>
        ScrollTrigger.create({
          trigger: `#group-${group.id}`,
          start: 'top 45%',
          end: 'bottom 45%',
          onToggle: (self) => {
            if (self.isActive) setActive(group.id)
          },
        }),
      )
      const mm = gsap.matchMedia()
      mm.add(MOTION_QUERIES.motion, () => {
        root.querySelectorAll<HTMLElement>('[data-permission-group]').forEach((group) => {
          gsap.from(group.querySelectorAll('[data-permission-row]'), {
            y: 30,
            opacity: 0,
            duration: 0.8,
            stagger: 0.07,
            ease: 'expo.out',
            scrollTrigger: { trigger: group, start: 'top 80%', once: true },
          })
        })
      })
      return () => {
        triggers.forEach((trigger) => trigger.kill())
        mm.revert()
      }
    },
    { scope: rootRef },
  )

  return (
    <div ref={rootRef} className="grid gap-12 lg:grid-cols-[16rem_1fr] lg:gap-20">
      <nav aria-label="Permission groups" className="hidden lg:block">
        <ol className="sticky top-32 space-y-1">
          {groups.map((group, index) => (
            <li key={group.id}>
              <TransitionLink
                href={`#group-${group.id}`}
                aria-current={active === group.id ? 'true' : undefined}
                className={cn(
                  'group flex items-center gap-3 rounded-full px-4 py-2.5 text-sm transition-colors duration-300',
                  active === group.id ? 'bg-white/[0.07] text-ink' : 'text-muted hover:text-ink-soft',
                )}
              >
                <span className="font-mono text-[10.5px]">{String(index + 1).padStart(2, '0')}</span>
                {group.title}
                <span
                  aria-hidden="true"
                  className={cn('ml-auto size-1.5 rounded-full bg-cyan transition-transform duration-500', active === group.id ? 'scale-100' : 'scale-0')}
                />
              </TransitionLink>
            </li>
          ))}
        </ol>
      </nav>

      <div className="space-y-20">
        {groups.map((group, index) => (
          <section key={group.id} id={`group-${group.id}`} data-permission-group="" aria-labelledby={`group-${group.id}-title`} className="scroll-mt-32">
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-muted">
              <span className="text-ink">{String(index + 1).padStart(2, '0')}</span> · {group.permissions.length}{' '}
              {group.permissions.length === 1 ? 'permission' : 'permissions'}
            </p>
            <h2 id={`group-${group.id}-title`} className="mt-4 text-4xl font-medium tracking-[-0.045em] md:text-5xl">
              {group.title}
            </h2>
            <p className="mt-3 max-w-xl text-muted">{group.summary}</p>
            <dl className="mt-10 border-t border-line">
              {group.permissions.map((permission) => (
                <div
                  key={permission.name}
                  data-permission-row=""
                  className="grid gap-3 border-b border-line py-7 md:grid-cols-[15rem_1fr] md:gap-10"
                >
                  <dt className="flex flex-wrap items-center gap-3">
                    <code className="rounded-lg border border-line-strong bg-surface px-2.5 py-1 font-mono text-sm text-ink">{permission.name}</code>
                    <span
                      className={cn(
                        'font-mono text-[10px] uppercase tracking-[0.2em]',
                        permission.kind === 'optional' ? 'text-emerald' : permission.kind === 'host' ? 'text-amber' : 'text-muted',
                      )}
                    >
                      {KIND_LABEL[permission.kind]}
                    </span>
                  </dt>
                  <dd className="leading-relaxed text-ink-soft">{permission.why}</dd>
                </div>
              ))}
            </dl>
          </section>
        ))}
      </div>
    </div>
  )
}
