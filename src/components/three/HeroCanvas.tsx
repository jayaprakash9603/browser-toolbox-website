'use client'

import dynamic from 'next/dynamic'
import { Component, useEffect, useRef, useState, type ReactNode, type RefObject } from 'react'

import { cn } from '@/lib/cn'
import { prefersReducedMotion } from '@/motion/gsap'
import { onIntroDone } from '@/motion/intro'

import type { HeroProgress } from './HeroScene'

const HeroScene = dynamic(() => import('./HeroScene'), { ssr: false })

class WebGLBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  render() {
    return this.state.failed ? null : this.props.children
  }
}

function supportsWebGL() {
  try {
    const canvas = document.createElement('canvas')
    // Software renderers (SwiftShader, llvmpipe) stall frame production on this scene, so they keep the poster.
    const options: WebGLContextAttributes = { failIfMajorPerformanceCaveat: true }
    const gl = canvas.getContext('webgl2', options) ?? canvas.getContext('webgl', options)
    gl?.getExtension('WEBGL_lose_context')?.loseContext()
    return Boolean(gl)
  } catch {
    return false
  }
}

/** Mounts the particle scene after hydration, pauses it off-screen, and leaves the CSS poster as fallback. */
export function HeroCanvas({ progress, className }: { progress: RefObject<HeroProgress>; className?: string }) {
  const hostRef = useRef<HTMLDivElement>(null)
  const [enabled, setEnabled] = useState(false)
  const [visible, setVisible] = useState(true)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (prefersReducedMotion()) return
    // Defer the WebGL probe and chunk until the preloader hands off and the browser is idle, so neither
    // competes with hydration, first paint or the intro.
    const start = () => setEnabled(supportsWebGL())
    let idleId: number | undefined
    let timeoutId: ReturnType<typeof setTimeout> | undefined
    const stopWaiting = onIntroDone(() => {
      if (typeof window.requestIdleCallback === 'function') idleId = window.requestIdleCallback(start, { timeout: 1200 })
      else timeoutId = setTimeout(start, 300)
    })
    return () => {
      stopWaiting()
      if (idleId !== undefined) window.cancelIdleCallback(idleId)
      clearTimeout(timeoutId)
    }
  }, [])

  useEffect(() => {
    const host = hostRef.current
    if (!host) return
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { rootMargin: '120px' })
    observer.observe(host)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={hostRef}
      aria-hidden="true"
      className={cn(
        'pointer-events-none absolute inset-0 transition-opacity duration-[1600ms] ease-[var(--ease-out-expo)]',
        ready ? 'opacity-100' : 'opacity-0',
        className,
      )}
    >
      {enabled ? (
        <WebGLBoundary>
          <HeroScene progress={progress} active={visible} onReady={() => setReady(true)} />
        </WebGLBoundary>
      ) : null}
    </div>
  )
}
