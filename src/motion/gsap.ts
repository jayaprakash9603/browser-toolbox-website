'use client'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import type { RefObject } from 'react'
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin'
import { Draggable } from 'gsap/Draggable'
import { Flip } from 'gsap/Flip'
import { InertiaPlugin } from 'gsap/InertiaPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(
    useGSAP,
    ScrollTrigger,
    SplitText,
    Flip,
    Draggable,
    InertiaPlugin,
    DrawSVGPlugin,
  )
  gsap.defaults({ ease: 'expo.out', duration: 0.9 })
  ScrollTrigger.config({ ignoreMobileResize: true })
}

/** Media conditions shared by every `gsap.matchMedia()` block. */
export const MOTION_QUERIES = {
  motion: '(prefers-reduced-motion: no-preference)',
  reduce: '(prefers-reduced-motion: reduce)',
  desktop: '(min-width: 768px)',
  mobile: '(max-width: 767px)',
  finePointer: '(pointer: fine)',
} as const

type Setup = () => void | (() => void)

const pendingSetups: (() => void)[] = []
let flushScheduled = false

function flushSetups() {
  const deadline = performance.now() + 24
  try {
    while (pendingSetups.length > 0 && performance.now() < deadline) pendingSetups.shift()?.()
  } finally {
    if (pendingSetups.length > 0) setTimeout(flushSetups, 0)
    else flushScheduled = false
  }
}

/**
 * `useGSAP` for below-the-fold sections. Setups run after hydration in page order, a few per task,
 * because creating dozens of ScrollTriggers inside React's commit blocks the first paint and input.
 * Their elements are off-screen, or hidden by `data-reveal-pending`, until the setup runs.
 */
export function useDeferredGSAP(
  setup: Setup,
  {
    scope,
    dependencies = [],
    defer = true,
  }: { scope: RefObject<HTMLElement | null>; dependencies?: unknown[]; defer?: boolean },
) {
  useGSAP(
    (context) => {
      if (!defer) return setup()
      let cancelled = false
      pendingSetups.push(() => {
        if (!cancelled) context.add(setup)
      })
      if (!flushScheduled) {
        flushScheduled = true
        setTimeout(flushSetups, 0)
      }
      return () => {
        cancelled = true
      }
    },
    { scope, dependencies },
  )
}

export function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia(MOTION_QUERIES.reduce).matches
}

/**
 * Call from a SplitText `onSplit`. The default `aria: 'auto'` hides the pieces and labels the split
 * element, but `aria-label` is prohibited on generic elements such as <p> and <span>, so the label
 * becomes visually hidden text instead. `split.revert()` restores the original markup.
 */
export function labelSplitText(element: HTMLElement) {
  const text = element.getAttribute('aria-label')
  if (!text) return
  element.removeAttribute('aria-label')
  const label = document.createElement('span')
  label.className = 'sr-only'
  label.textContent = text
  element.append(label)
}

export { DrawSVGPlugin, Draggable, Flip, gsap, InertiaPlugin, ScrollTrigger, SplitText, useGSAP }
