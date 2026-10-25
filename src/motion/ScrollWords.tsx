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

interface ScrollWordsProps {
  as?: ElementType
  children: ReactNode
  className?: string
}

/** Words light up one by one as the paragraph scrolls through the viewport. */
export function ScrollWords({ as: Tag = 'p', children, className }: ScrollWordsProps) {
  const ref = useRef<HTMLElement>(null)

  useDeferredGSAP(
    () => {
      const element = ref.current
      if (!element) return
      const mm = gsap.matchMedia()
      mm.add(MOTION_QUERIES.motion, () => {
        let split: SplitText | undefined
        // Splitting forces a layout, so wait until the paragraph is about to scroll into view.
        const approach = ScrollTrigger.create({
          trigger: element,
          start: 'top bottom+=25%',
          once: true,
          onEnter: () => {
            split = SplitText.create(element, {
              type: 'words',
              autoSplit: true,
              onSplit(self) {
                labelSplitText(element)
                return gsap.fromTo(
                  self.words,
                  { opacity: 0.14 },
                  {
                    opacity: 1,
                    ease: 'none',
                    stagger: 0.12,
                    scrollTrigger: {
                      trigger: element,
                      start: 'top 82%',
                      end: 'bottom 48%',
                      scrub: 0.6,
                    },
                  },
                )
              },
            })
          },
        })
        return () => {
          approach.kill()
          split?.revert()
        }
      })
      return () => mm.revert()
    },
    { scope: ref },
  )

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  )
}
