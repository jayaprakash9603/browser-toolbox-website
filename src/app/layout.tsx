import 'lenis/dist/lenis.css'
import './globals.css'

import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono, Instrument_Serif } from 'next/font/google'
import type { ReactNode } from 'react'

import { CommandPalette } from '@/components/shell/CommandPalette'
import { Footer } from '@/components/shell/Footer'
import { Nav } from '@/components/shell/Nav'
import { getShellData } from '@/components/shell/shellData'
import { SITE, SOCIAL_IMAGE } from '@/config/site'
import { Cursor } from '@/motion/Cursor'
import { INTRO_STORAGE_KEY } from '@/motion/introKey'
import { Preloader } from '@/motion/Preloader'
import { SmoothScroll } from '@/motion/SmoothScroll'
import { TransitionProvider } from '@/motion/TransitionProvider'

const geistSans = Geist({ subsets: ['latin'], variable: '--font-geist-sans', display: 'swap' })
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono', display: 'swap' })
const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-instrument-serif',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    template: `%s · ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  keywords: ['chrome extension', 'developer tools', 'side panel', 'json formatter', 'api client', 'screenshot', 'ad blocker'],
  openGraph: {
    type: 'website',
    siteName: SITE.name,
    title: SITE.name,
    description: SITE.description,
    url: '/',
    images: [SOCIAL_IMAGE],
  },
  twitter: { card: 'summary_large_image', title: SITE.name, description: SITE.description, images: [SOCIAL_IMAGE.url] },
  alternates: { canonical: '/' },
}

export const viewport: Viewport = {
  themeColor: '#07070b',
  colorScheme: 'dark',
}

// Runs before paint: enables motion-only CSS and skips the intro for repeat visits.
const bootScript = `(function(){try{var d=document.documentElement;var r=window.matchMedia('(prefers-reduced-motion: reduce)').matches;if(!r)d.classList.add('motion');if(r||sessionStorage.getItem('${INTRO_STORAGE_KEY}'))d.dataset.intro='skip'}catch(e){}})()`

export default function RootLayout({ children }: { children: ReactNode }) {
  const { categories, tools } = getShellData()

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
        <noscript>
          <style>{'[data-preloader]{display:none!important}[data-reveal-pending]{visibility:visible!important}'}</style>
        </noscript>
      </head>
      <body className="grain bg-canvas text-ink">
        <a
          href="#main"
          className="fixed left-4 top-4 z-[110] -translate-y-24 rounded-full bg-ink px-4 py-2 text-sm font-medium text-canvas transition-transform focus:translate-y-0"
        >
          Skip to content
        </a>
        <SmoothScroll>
          <TransitionProvider>
            <Preloader toolCount={tools.length} />
            <Nav categories={categories} toolCount={tools.length} />
            <main id="main" tabIndex={-1} className="overflow-x-clip outline-none">
              {children}
            </main>
            <Footer categories={categories} toolCount={tools.length} />
            <CommandPalette tools={tools} categories={categories} />
            <Cursor />
          </TransitionProvider>
        </SmoothScroll>
      </body>
    </html>
  )
}
