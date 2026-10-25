'use client'

import { createContext, useContext } from 'react'

/** Supplied by `PinnedWalkthrough`: scroll progress drives the demo timeline instead of the loop. */
export interface ScrubLink {
  subscribe: (listener: (progress: number) => void) => () => void
  onStep: (index: number) => void
}

export const DemoScrubContext = createContext<ScrubLink | null>(null)

export function useScrubLink() {
  return useContext(DemoScrubContext)
}

export interface ToolMeta {
  id: string
  name: string
  icon: string
  accent: string
}

export const ToolMetaContext = createContext<ToolMeta>({
  id: '',
  name: 'One Panel',
  icon: 'BoxIcon',
  accent: '#6366f1',
})

export function useToolMeta() {
  return useContext(ToolMetaContext)
}
