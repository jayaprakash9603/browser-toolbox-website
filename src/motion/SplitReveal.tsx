'use client'

import { useRef, type ElementType, type ReactNode } from 'react'

import {
  gsap,
  labelSplitText,
  MOTION_QUERIES,
  ScrollTrigger,
  SplitText,
  useDeferredGSAP,
} from './gsap'
import { onIntroDone } from './intro'

type SplitUnit = 'chars' | 'words' | 'lines'

interface SplitRevealProps {
  as?: ElementType
  children: ReactNode
  className?: string
  id?: string
  type?: SplitUnit
  /** `intro` waits for the preloader, `scroll` waits for the element to enter the viewport. */
  trigger?: 'intro' | 'scroll' | 'mount'
  delay?: number
  stagger?: number
  duration?: number
  start?: string
}

export function SplitReveal({
  as: Tag = 'div',
  children,
  className,
  id,
  type = 'words',
  trigger = 'scroll',
  delay = 0,
  stagger,
  duration = 1.1,
  start = 'top 85%',
}: SplitRevealProps) {
  const ref = useRef<HTMLElement>(null)

  useDeferredGSAP(
    () => {
      const element = ref.current
      if (!element) return
      const mm = gsap.matchMedia()

      mm.add(MOTION_QUERIES.motion, () => {
        let stopWaiting = () => {}
        let split: SplitText | undefined
        const create = () => {
          split = SplitText.create(element, {
            type:
              type === 'chars' ? 'lines,words,chars' : type === 'words' ? 'lines,words' : 'lines',
            mask: 'lines',
            linesClass: 'split-mask',
            autoSplit: true,
            onSplit(self) {
              labelSplitText(element)
              element.removeAttribute('data-reveal-pending')
              const targets =
                type === 'chars' ? self.chars : type === 'words' ? self.words : self.lines
              const animation = gsap.from(targets, {
                yPercent: 118,
                rotate: type === 'lines' ? 0 : 4,
                transformOrigin: '0% 100%',
                duration,
                delay,
                stagger: stagger ?? (type === 'chars' ? 0.022 : type === 'words' ? 0.045 : 0.1),
                ease: 'expo.out',
                paused: trigger === 'intro',
                scrollTrigger:
                  trigger === 'scroll' ? { trigger: element, start, once: true } : undefined,
              })
              if (trigger === 'intro') {
                stopWaiting()
                stopWaiting = onIntroDone(() => animation.play())
              }
              return animation
            },
          })
        }

        // Each split forces a layout, so below-the-fold text waits until it is about to scroll into view.
        let approach: ScrollTrigger | undefined
        if (trigger === 'scroll')
          approach = ScrollTrigger.create({
            trigger: element,
            start: 'top bottom+=25%',
            once: true,
            onEnter: create,
          })
        else create()
        return () => {
          stopWaiting()
          approach?.kill()
          split?.revert()
        }
      })

      mm.add(MOTION_QUERIES.reduce, () => {
        element.removeAttribute('data-reveal-pending')
      })

      return () => mm.revert()
    },
    { scope: ref, defer: trigger === 'scroll' },
  )

  return (
    <Tag ref={ref} id={id} className={className} data-reveal-pending="">
      {children}
    </Tag>
  )
}
