import type { Tool, ToolCapability } from './types'

interface CapabilityCopy {
  label: string
  /** How the user reaches the tool through this surface. */
  access?: string
  /** What the capability means for the user's data, shown in the privacy block. */
  privacy?: string
}

export const CAPABILITY_COPY: Record<ToolCapability, CapabilityCopy> = {
  SIDE_PANEL: {
    label: 'Side panel',
    access: 'Click the toolbar icon to open the side panel, then search for the tool.',
  },
  POPUP: { label: 'Popup', access: 'Available from the toolbar popup.' },
  CONTEXT_MENU: {
    label: 'Right-click menu',
    access: 'Right-click selected text, a link, an image or the page and choose One Panel.',
  },
  CONTENT_SCRIPT: {
    label: 'On-page overlay',
    privacy: 'Injects its helper into the page only when you start it, never in the background.',
  },
  DEVTOOLS: { label: 'DevTools', access: 'Also lives in Chrome DevTools as its own panel.' },
  COMMAND: { label: 'Command palette', access: 'Press Ctrl + Shift + Space anywhere and type its name.' },
  OMNIBOX: { label: 'Address bar', access: 'Type the toolbox keyword in the address bar.' },
  CLIPBOARD: {
    label: 'Clipboard',
    privacy: 'Reads the clipboard only when you paste or press add, and keeps history on this device.',
  },
  PAGE_ACCESS: {
    label: 'Active tab',
    privacy: 'Reads the current tab only when you use it, through Chrome’s activeTab permission.',
  },
  SCREEN_CAPTURE: {
    label: 'Screen capture',
    privacy: 'Captures only what you choose. Images and recordings stay on your device.',
  },
  STORAGE: {
    label: 'Saved locally',
    privacy: 'Saves its data in chrome.storage.local on this device. Nothing is synced to a server.',
  },
}

export const DEFAULT_PRIVACY_NOTE = 'Runs entirely inside your browser. No account, no analytics, no remote code.'

const SURFACE_COPY: Record<string, string> = {
  SELECTION: 'selected text',
  LINK: 'a link',
  IMAGE: 'an image',
  PAGE: 'the page',
  ELEMENT: 'an element',
}

export interface OpenStep {
  label: string
  text: string
}

/** Ways to reach a tool, derived from the registry's capabilities and context surfaces. */
export function getOpenSteps(tool: Tool): OpenStep[] {
  const steps: OpenStep[] = [
    { label: 'Side panel', text: `Click the One Panel icon in the toolbar and search for “${tool.name}”.` },
  ]
  if (tool.capabilities.includes('COMMAND')) {
    steps.push({ label: 'Command palette', text: 'Press Ctrl + Shift + Space on any page and type its name.' })
  }
  const surfaces = tool.contextSurfaces.map((surface) => SURFACE_COPY[surface]).filter(Boolean)
  if (tool.capabilities.includes('CONTEXT_MENU') && surfaces.length > 0) {
    const list = surfaces.length > 1 ? `${surfaces.slice(0, -1).join(', ')} or ${surfaces.at(-1)}` : surfaces[0]
    steps.push({ label: 'Right-click menu', text: `Right-click ${list}, then choose One Panel → ${tool.name}.` })
  }
  if (tool.contextSurfaces.includes('OVERLAY')) {
    steps.push({ label: 'On-page overlay', text: 'Start it from the panel and it draws its overlay right on top of the page.' })
  }
  if (tool.capabilities.includes('DEVTOOLS')) {
    steps.push({ label: 'DevTools', text: 'Open Chrome DevTools and switch to the One Panel panel.' })
  }
  return steps
}

export function getPrivacyNotes(tool: Tool) {
  const notes = tool.capabilities
    .map((capability) => CAPABILITY_COPY[capability]?.privacy)
    .filter((note): note is string => Boolean(note))
  return notes.length > 0 ? notes : [DEFAULT_PRIVACY_NOTE]
}
