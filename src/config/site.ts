export const SITE = {
  name: 'Browser Toolbox',
  shortName: 'Toolbox',
  tagline: 'One side panel. Every tool you reach for.',
  description:
    'Browser Toolbox is an all-in-one Chrome extension: JSON, API client, screenshots, color, SEO, QA, privacy and dozens more tools in one fast, local-first side panel.',
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://browsertoolbox.app').replace(/\/$/, ''),
  // Replace with the Chrome Web Store listing once the extension is published.
  chromeStoreUrl:
    process.env.NEXT_PUBLIC_CHROME_STORE_URL ?? 'https://chromewebstore.google.com/search/browser%20toolbox',
  paletteShortcut: ['Ctrl', 'Shift', 'Space'],
  version: '1.0',
} as const

export const SOCIAL_IMAGE = {
  url: '/og.png',
  width: 1200,
  height: 630,
  alt: `${SITE.name}: every everyday web tool in one Chrome side panel`,
}

export const NAV_LINKS = [
  { href: '/tools/', label: 'Tools' },
  { href: '/#platform', label: 'Platform' },
  { href: '/privacy/', label: 'Privacy' },
  { href: '/permissions/', label: 'Permissions' },
] as const
