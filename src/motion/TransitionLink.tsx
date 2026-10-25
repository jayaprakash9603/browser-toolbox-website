'use client'

import Link from 'next/link'
import { forwardRef, type ComponentProps, type MouseEvent } from 'react'

import { useTransitionNavigate } from './TransitionProvider'

type TransitionLinkProps = Omit<ComponentProps<typeof Link>, 'href'> & {
  href: string
  /** Morph `[data-vt]` children into the destination with the View Transitions API. */
  morph?: boolean
  /** Text shown on the curtain while the next page loads. */
  transitionLabel?: string
}

export const TransitionLink = forwardRef<HTMLAnchorElement, TransitionLinkProps>(
  function TransitionLink({ href, morph = false, transitionLabel, onClick, ...props }, ref) {
    const navigate = useTransitionNavigate()

    const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
      onClick?.(event)
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        props.target === '_blank' ||
        /^https?:\/\//.test(href)
      ) {
        return
      }
      event.preventDefault()
      navigate(href, { morph: morph ? event.currentTarget : null, label: transitionLabel })
    }

    return <Link ref={ref} href={href} onClick={handleClick} {...props} />
  },
)
