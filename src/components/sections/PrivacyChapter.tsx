'use client'

import { EyeOffIcon, HardDriveIcon, MousePointerClickIcon } from 'lucide-react'
import { useRef } from 'react'

import { ChapterLabel } from '@/components/ui/primitives'
import { gsap, MOTION_QUERIES, useDeferredGSAP } from '@/motion/gsap'
import { Reveal } from '@/motion/Reveal'
import { ScrollWords } from '@/motion/ScrollWords'
import { TransitionLink } from '@/motion/TransitionLink'

const POINTS = [
  {
    icon: HardDriveIcon,
    title: 'Stored on this device',
    body: 'Settings, favourites, notes, clipboard and API history live in chrome.storage.local. Nothing syncs to a server.',
  },
  {
    icon: MousePointerClickIcon,
    title: 'Page tools on demand',
    body: 'Inspectors and pickers inject their helper into a tab only when you start them. Blocking and protection rules ship inside the package.',
  },
  {
    icon: EyeOffIcon,
    title: 'No telemetry, no remote code',
    body: 'No analytics, no account and no scripts downloaded at runtime. Network calls happen only when a tool you use needs one, like an API request you send.',
  },
]

export function PrivacyChapter() {
  const rootRef = useRef<HTMLElement>(null)

  useDeferredGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MOTION_QUERIES.motion, () => {
        gsap.from('[data-shield-path]', {
          drawSVG: '0%',
          ease: 'none',
          stagger: 0.1,
          scrollTrigger: { trigger: rootRef.current, start: 'top 75%', end: 'center center', scrub: 0.6 },
        })
        gsap.to('[data-shield]', {
          yPercent: -12,
          rotate: 4,
          ease: 'none',
          scrollTrigger: { trigger: rootRef.current, start: 'top bottom', end: 'bottom top', scrub: true },
        })
      })
      return () => mm.revert()
    },
    { scope: rootRef },
  )

  return (
    <section ref={rootRef} aria-labelledby="privacy-title" className="relative overflow-hidden py-28 md:py-44">
      <svg
        data-shield=""
        aria-hidden="true"
        viewBox="0 0 200 240"
        className="pointer-events-none absolute -right-24 top-10 h-[120%] max-h-[900px] opacity-[0.22] md:right-[-4%]"
        fill="none"
      >
        <defs>
          <linearGradient id="shield-gradient" x1="0" y1="0" x2="200" y2="240" gradientUnits="userSpaceOnUse">
            <stop stopColor="#34d399" />
            <stop offset="1" stopColor="#22d3ee" />
          </linearGradient>
        </defs>
        <path data-shield-path="" d="M100 8 186 40v66c0 58-37 104-86 126C51 210 14 164 14 106V40z" stroke="url(#shield-gradient)" strokeWidth="1.6" />
        <path data-shield-path="" d="M100 32 164 56v52c0 44-27 79-64 96-37-17-64-52-64-96V56z" stroke="url(#shield-gradient)" strokeWidth="1.2" />
        <path data-shield-path="" d="m66 120 24 24 46-52" stroke="url(#shield-gradient)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>

      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        <ChapterLabel index="07">Privacy by architecture</ChapterLabel>
        <h2 id="privacy-title" className="sr-only">
          Your data stays in your browser
        </h2>
        <ScrollWords className="mt-8 max-w-5xl text-[clamp(2rem,4.8vw,4.5rem)] font-medium leading-[1.05] tracking-[-0.045em]">
          Your data stays in your browser. No account, no analytics, no remote code. Just tools that run where you
          already work.
        </ScrollWords>

        <Reveal className="mt-20 grid gap-4 md:grid-cols-3">
          {POINTS.map((point) => (
            <article key={point.title} className="rounded-3xl border border-line bg-surface/80 p-7 backdrop-blur">
              <point.icon aria-hidden="true" className="size-6 text-emerald" strokeWidth={1.6} />
              <h3 className="mt-8 text-xl font-medium tracking-tight">{point.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{point.body}</p>
            </article>
          ))}
        </Reveal>
        <p className="mt-10 text-sm text-muted">
          Every permission is explained, line by line, on the{' '}
          <TransitionLink href="/permissions/" transitionLabel="Permissions" className="text-ink underline decoration-line-strong underline-offset-4 hover:decoration-cyan">
            permissions page
          </TransitionLink>
          .
        </p>
      </div>
    </section>
  )
}
