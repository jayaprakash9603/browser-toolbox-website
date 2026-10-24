'use client'

import type { PointerEvent } from 'react'

/** Feeds pointer coordinates into `--mx`/`--my` for the `.spotlight` CSS effect. */
export function spotlightHandlers() {
  return {
    onPointerMove(event: PointerEvent<HTMLElement>) {
      const rect = event.currentTarget.getBoundingClientRect()
      event.currentTarget.style.setProperty('--mx', `${event.clientX - rect.left}px`)
      event.currentTarget.style.setProperty('--my', `${event.clientY - rect.top}px`)
    },
  }
}
