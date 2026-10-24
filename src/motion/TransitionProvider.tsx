'use client'

import { usePathname, useRouter } from 'next/navigation'
import { createContext, useCallback, useContext, useLayoutEffect, useMemo, useRef, type ReactNode } from 'react'

import { gsap, prefersReducedMotion, ScrollTrigger } from './gsap'
import { setNavigationKind } from './navigation'
import { useLenis } from './SmoothScroll'

interface NavigateOptions {
  /** Element whose `[data-vt="icon"]`/`[data-vt="title"]` children morph into the next page. */
  morph?: HTMLElement | null
  label?: string
}

interface TransitionContextValue {
  navigate: (href: string, options?: NavigateOptions) => void
}

const TransitionContext = createContext<TransitionContextValue | null>(null)

export function useTransitionNavigate() {
  const context = useContext(TransitionContext)
  if (!context) throw new Error('useTransitionNavigate must be used inside <TransitionProvider>')
  return context.navigate
}

const VT_NAMES = { icon: 'vt-tool-icon', title: 'vt-tool-title' } as const

function setMorphNames(root: HTMLElement | null | undefined, on: boolean) {
  if (!root) return
  for (const [key, name] of Object.entries(VT_NAMES)) {
    const element = root.querySelector<HTMLElement>(`[data-vt="${key}"]`)
    if (element) element.style.viewTransitionName = on ? name : ''
  }
}

export function TransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const lenis = useLenis()
  const curtainRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)
  const commitResolver = useRef<(() => void) | null>(null)
  const busy = useRef(false)

  useLayoutEffect(() => {
    if (!window.location.hash) {
      lenis?.scrollTo(0, { immediate: true, force: true })
    }
    commitResolver.current?.()
    commitResolver.current = null
    const frame = requestAnimationFrame(() => ScrollTrigger.refresh())
    return () => cancelAnimationFrame(frame)
  }, [pathname, lenis])

  const waitForCommit = useCallback(
    () =>
      new Promise<void>((resolve) => {
        const timeout = window.setTimeout(resolve, 3000)
        commitResolver.current = () => {
          window.clearTimeout(timeout)
          // Let the new page paint its first frame before revealing it.
          requestAnimationFrame(() => resolve())
        }
      }),
    [],
  )

  const navigate = useCallback(
    (href: string, options: NavigateOptions = {}) => {
      const url = new URL(href, window.location.href)
      if (url.pathname === window.location.pathname) {
        if (url.hash) {
          const target = document.querySelector<HTMLElement>(url.hash)
          if (target) {
            if (lenis) lenis.scrollTo(target, { offset: -104 })
            else target.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
          }
          history.replaceState(null, '', url.hash)
        } else {
          lenis?.scrollTo(0)
        }
        return
      }
      if (busy.current) return

      if (prefersReducedMotion()) {
        setNavigationKind('plain')
        router.push(href)
        return
      }

      busy.current = true

      if (options.morph && typeof document.startViewTransition === 'function') {
        setNavigationKind('view-transition')
        document.querySelectorAll<HTMLElement>('[data-vt]').forEach((element) => {
          element.style.viewTransitionName = ''
        })
        setMorphNames(options.morph, true)
        const transition = document.startViewTransition(async () => {
          router.push(href)
          await waitForCommit()
        })
        transition.finished.finally(() => {
          setMorphNames(options.morph, false)
          setNavigationKind('plain')
          busy.current = false
        })
        return
      }

      const curtain = curtainRef.current
      if (!curtain) {
        busy.current = false
        router.push(href)
        return
      }
      setNavigationKind('curtain')
      const layers = curtain.querySelectorAll('[data-curtain-layer]')
      if (labelRef.current) labelRef.current.textContent = options.label ?? ''

      gsap
        .timeline({ defaults: { ease: 'expo.inOut' } })
        .set(curtain, { autoAlpha: 1 })
        .fromTo(layers, { yPercent: 100 }, { yPercent: 0, duration: 0.7, stagger: 0.08 })
        .fromTo(labelRef.current, { yPercent: 100, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.6 }, '-=0.35')
        .add(async () => {
          router.push(href)
          await waitForCommit()
          gsap
            .timeline({
              defaults: { ease: 'expo.inOut' },
              onComplete: () => {
                gsap.set(curtain, { autoAlpha: 0 })
                setNavigationKind('plain')
                busy.current = false
              },
            })
            .to(labelRef.current, { yPercent: -100, opacity: 0, duration: 0.4 })
            .to([...layers].reverse(), { yPercent: -100, duration: 0.8, stagger: 0.08 }, '-=0.2')
        })
    },
    [lenis, router, waitForCommit],
  )

  const value = useMemo(() => ({ navigate }), [navigate])

  return (
    <TransitionContext.Provider value={value}>
      {children}
      <div
        ref={curtainRef}
        aria-hidden="true"
        className="pointer-events-none invisible fixed inset-0 z-[80] overflow-hidden"
      >
        <div data-curtain-layer="" className="absolute inset-0 bg-indigo" />
        <div data-curtain-layer="" className="absolute inset-0 flex items-end bg-canvas p-6 md:p-12">
          <div className="overflow-hidden">
            <span
              ref={labelRef}
              className="block font-mono text-sm uppercase tracking-[0.3em] text-muted md:text-base"
            />
          </div>
        </div>
      </div>
    </TransitionContext.Provider>
  )
}
