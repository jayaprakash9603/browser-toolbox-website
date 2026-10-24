'use client'

import { ArrowRightIcon, MenuIcon, SearchIcon, XIcon } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useEffect, useId, useRef, useState } from 'react'

import { Wordmark } from '@/components/ui/Logo'
import { InstallButton } from '@/components/ui/InstallButton'
import { Keycap } from '@/components/ui/primitives'
import { ToolIcon } from '@/components/ui/ToolIcon'
import { NAV_LINKS } from '@/config/site'
import { cn } from '@/lib/cn'
import { categoryHref } from '@/lib/routes'
import { gsap, MOTION_QUERIES, ScrollTrigger, useGSAP } from '@/motion/gsap'
import { useLenis } from '@/motion/SmoothScroll'
import { TransitionLink } from '@/motion/TransitionLink'

import { openCommandPalette } from './CommandPalette'
import type { ShellCategory } from './shellData'

export function Nav({ categories, toolCount }: { categories: ShellCategory[]; toolCount: number }) {
  const rootRef = useRef<HTMLElement>(null)
  const megaRef = useRef<HTMLDivElement>(null)
  const mobileRef = useRef<HTMLDivElement>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const [megaOpen, setMegaOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [modKey, setModKey] = useState('Ctrl')
  const pathname = usePathname()
  const lenis = useLenis()
  const megaId = useId()
  const mobileId = useId()

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- platform is only known on the client
    if (/Mac|iPhone|iPad/.test(navigator.platform)) setModKey('⌘')
  }, [])

  // Close menus whenever the route changes.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reacting to navigation
    setMegaOpen(false)
    setMobileOpen(false)
  }, [pathname])

  useEffect(() => {
    if (mobileOpen) lenis?.stop()
    else lenis?.start()
    document.documentElement.style.overflow = mobileOpen ? 'hidden' : ''
  }, [mobileOpen, lenis])

  useEffect(() => {
    if (!megaOpen && !mobileOpen) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMegaOpen(false)
        setMobileOpen(false)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [megaOpen, mobileOpen])

  // Hide on scroll down, reveal on scroll up.
  useGSAP(
    () => {
      const root = rootRef.current
      if (!root) return
      const mm = gsap.matchMedia()
      mm.add(MOTION_QUERIES.motion, () => {
        const showAnim = gsap
          .from(root, { yPercent: -140, paused: true, duration: 0.5, ease: 'expo.out' })
          .progress(1)
        ScrollTrigger.create({
          start: 'top top',
          end: 'max',
          onUpdate(self) {
            setScrolled(self.scroll() > 24)
            if (self.direction === 1 && self.scroll() > 240) showAnim.reverse()
            else showAnim.play()
          },
        })
      })
      mm.add(MOTION_QUERIES.reduce, () => {
        ScrollTrigger.create({ start: 'top top', end: 'max', onUpdate: (self) => setScrolled(self.scroll() > 24) })
      })
      return () => mm.revert()
    },
    { scope: rootRef },
  )

  // Mega menu entrance.
  useGSAP(
    () => {
      const panel = megaRef.current
      if (!panel || !megaOpen) return
      const mm = gsap.matchMedia()
      mm.add(MOTION_QUERIES.motion, () => {
        gsap.fromTo(
          panel,
          { opacity: 0, y: -12, clipPath: 'inset(0% 0% 100% 0% round 28px)' },
          { opacity: 1, y: 0, clipPath: 'inset(0% 0% 0% 0% round 28px)', duration: 0.7, ease: 'expo.out' },
        )
        gsap.from(panel.querySelectorAll('[data-mega-item]'), {
          opacity: 0,
          y: 14,
          duration: 0.6,
          stagger: 0.015,
          ease: 'expo.out',
          delay: 0.08,
        })
      })
      return () => mm.revert()
    },
    { dependencies: [megaOpen] },
  )

  // Mobile overlay entrance.
  useGSAP(
    () => {
      const panel = mobileRef.current
      if (!panel || !mobileOpen) return
      const mm = gsap.matchMedia()
      mm.add(MOTION_QUERIES.motion, () => {
        gsap.fromTo(panel, { clipPath: 'circle(0% at 92% 4%)' }, { clipPath: 'circle(150% at 92% 4%)', duration: 0.9, ease: 'expo.inOut' })
        gsap.from(panel.querySelectorAll('[data-mobile-item]'), { yPercent: 110, opacity: 0, duration: 0.8, stagger: 0.05, delay: 0.25, ease: 'expo.out' })
      })
      return () => mm.revert()
    },
    { dependencies: [mobileOpen] },
  )

  const scheduleClose = () => {
    clearTimeout(closeTimer.current)
    closeTimer.current = setTimeout(() => setMegaOpen(false), 180)
  }
  const cancelClose = () => clearTimeout(closeTimer.current)

  return (
    <>
      <header
        ref={rootRef}
        className="fixed inset-x-0 top-0 z-[70] px-3 pt-3 md:px-6 md:pt-4"
        onPointerLeave={scheduleClose}
        onPointerEnter={cancelClose}
      >
        <nav
          aria-label="Main"
          className={cn(
            'mx-auto flex h-14 max-w-7xl items-center justify-between gap-4 rounded-full border px-2.5 pl-4 transition-[background-color,border-color,box-shadow,backdrop-filter] duration-500 md:h-16 md:pl-5',
            scrolled || megaOpen
              ? 'border-line-strong bg-surface/75 shadow-[0_20px_60px_-30px_rgb(0_0_0/0.9)] backdrop-blur-xl'
              : 'border-transparent bg-transparent',
          )}
        >
          <TransitionLink href="/" transitionLabel="Home" className="rounded-full text-ink" aria-label="One Panel home">
            <Wordmark className="text-[15px]" />
          </TransitionLink>

          <ul className="hidden items-center gap-1 lg:flex">
            <li>
              <button
                type="button"
                aria-expanded={megaOpen}
                aria-controls={megaId}
                onPointerEnter={() => {
                  cancelClose()
                  setMegaOpen(true)
                }}
                onClick={() => setMegaOpen((value) => !value)}
                className={cn(
                  'rounded-full px-4 py-2 text-sm transition-colors',
                  megaOpen ? 'bg-white/[0.07] text-ink' : 'text-ink-soft hover:text-ink',
                )}
              >
                Tools <span className="ml-1 font-mono text-[11px] text-muted">{toolCount}</span>
              </button>
            </li>
            {NAV_LINKS.slice(1).map((link) => (
              <li key={link.href}>
                <TransitionLink
                  href={link.href}
                  transitionLabel={link.label}
                  className="rounded-full px-4 py-2 text-sm text-ink-soft transition-colors hover:text-ink"
                >
                  {link.label}
                </TransitionLink>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={openCommandPalette}
              className="hidden h-10 items-center gap-2.5 rounded-full border border-line px-3.5 text-sm text-muted transition-colors hover:border-line-strong hover:text-ink md:inline-flex"
            >
              <SearchIcon aria-hidden="true" className="size-4" />
              <span>Search</span>
              <span className="flex gap-1">
                <Keycap className="px-1.5 py-0.5">{modKey}</Keycap>
                <Keycap className="px-1.5 py-0.5">K</Keycap>
              </span>
            </button>
            <button
              type="button"
              onClick={openCommandPalette}
              aria-label="Search tools"
              className="inline-flex size-10 items-center justify-center rounded-full border border-line text-ink-soft md:hidden"
            >
              <SearchIcon aria-hidden="true" className="size-4" />
            </button>
            <div className="hidden sm:block">
              <InstallButton />
            </div>
            <button
              type="button"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              aria-controls={mobileId}
              onClick={() => setMobileOpen((value) => !value)}
              className="inline-flex size-10 items-center justify-center rounded-full bg-ink text-canvas lg:hidden"
            >
              {mobileOpen ? <XIcon aria-hidden="true" className="size-4" /> : <MenuIcon aria-hidden="true" className="size-4" />}
            </button>
          </div>
        </nav>

        {megaOpen ? (
          <div
            ref={megaRef}
            id={megaId}
            className="mx-auto mt-2 hidden max-w-7xl rounded-[28px] border border-line-strong bg-surface/90 p-3 shadow-[0_40px_120px_-30px_rgb(0_0_0/0.9)] backdrop-blur-2xl lg:block"
          >
            <div className="grid grid-cols-[1fr_280px] gap-3">
              <ul className="grid grid-cols-4 gap-1">
                {categories.map((category) => (
                  <li key={category.id} data-mega-item="">
                    <TransitionLink
                      href={categoryHref(category.id)}
                      transitionLabel={category.name}
                      className="group flex items-center gap-3 rounded-2xl px-3 py-2.5 transition-colors hover:bg-white/[0.05]"
                    >
                      <span
                        className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-line transition-transform duration-500 group-hover:scale-110"
                        style={{ color: category.accent, backgroundColor: `${category.accent}1a` }}
                      >
                        <ToolIcon name={category.icon} className="size-4" />
                      </span>
                      <span className="min-w-0 flex-1 truncate text-sm text-ink-soft group-hover:text-ink">{category.name}</span>
                      <span className="font-mono text-[11px] text-muted">{category.count}</span>
                    </TransitionLink>
                  </li>
                ))}
              </ul>
              <div
                data-mega-item=""
                className="relative flex flex-col justify-between overflow-hidden rounded-2xl border border-line bg-[radial-gradient(120%_120%_at_100%_0%,rgb(99_102_241/0.35),transparent_60%),radial-gradient(90%_90%_at_0%_100%,rgb(34_211_238/0.18),transparent_60%)] p-5"
              >
                <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-muted">Catalogue</p>
                <div>
                  <p className="text-3xl font-medium tracking-tight">
                    {toolCount} tools.
                    <br />
                    <span className="font-serif italic text-ink-soft">One panel.</span>
                  </p>
                  <TransitionLink
                    href="/tools/"
                    transitionLabel="All tools"
                    className="mt-4 inline-flex items-center gap-2 text-sm text-cyan hover:underline"
                  >
                    Browse everything <ArrowRightIcon aria-hidden="true" className="size-4" />
                  </TransitionLink>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </header>

      {mobileOpen ? (
        <div
          ref={mobileRef}
          id={mobileId}
          className="fixed inset-0 z-[65] flex flex-col overflow-y-auto bg-canvas px-6 pb-10 pt-24 lg:hidden"
          data-lenis-prevent=""
        >
          <ul className="space-y-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href} className="overflow-hidden">
                <TransitionLink
                  href={link.href}
                  transitionLabel={link.label}
                  data-mobile-item=""
                  className="block py-1 text-5xl font-medium tracking-tight text-ink"
                >
                  {link.label}
                </TransitionLink>
              </li>
            ))}
          </ul>
          <p data-mobile-item="" className="mt-10 font-mono text-[11px] uppercase tracking-[0.24em] text-muted">
            Categories
          </p>
          <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2">
            {categories.map((category) => (
              <li key={category.id} className="overflow-hidden">
                <TransitionLink
                  href={categoryHref(category.id)}
                  transitionLabel={category.name}
                  data-mobile-item=""
                  className="flex items-center gap-2 py-1 text-sm text-ink-soft"
                >
                  <ToolIcon name={category.icon} className="size-4" style={{ color: category.accent }} />
                  {category.name}
                </TransitionLink>
              </li>
            ))}
          </ul>
          <div data-mobile-item="" className="mt-10">
            <InstallButton size="lg" className="w-full" />
          </div>
        </div>
      ) : null}
    </>
  )
}
