import { CloudOffIcon, CodeXmlIcon, HardDriveIcon, SlidersHorizontalIcon, UserXIcon, WifiIcon } from 'lucide-react'
import type { Metadata } from 'next'

import { InstallStrip } from '@/components/tool/InstallStrip'
import { ChapterLabel } from '@/components/ui/primitives'
import { Reveal } from '@/motion/Reveal'
import { ScrollWords } from '@/motion/ScrollWords'
import { SplitReveal } from '@/motion/SplitReveal'
import { TransitionLink } from '@/motion/TransitionLink'

export const metadata: Metadata = {
  title: 'Privacy',
  description:
    'Browser Toolbox has no account, no analytics and no remote code. Here is what stays on your device, when anything leaves it, and how to turn things off.',
  alternates: { canonical: '/privacy/' },
}

const PRINCIPLES = [
  { icon: UserXIcon, title: 'No account', body: 'Nothing to sign up for. The extension works the moment it is installed.' },
  { icon: CloudOffIcon, title: 'No analytics', body: 'No telemetry, usage tracking or crash reporting is collected or sent anywhere.' },
  { icon: CodeXmlIcon, title: 'No remote code', body: 'Every script and filter list ships inside the package. Nothing is fetched and executed at runtime.' },
  { icon: HardDriveIcon, title: 'Local storage', body: 'Data lives in chrome.storage on this device and is removed when you uninstall the extension.' },
]

const STORED = [
  ['Settings and favourites', 'Your preferences, pinned tools and recently opened tools.'],
  ['Clipboard history', 'Text you copy, if history is on. It can be disabled, size-limited or wiped in Settings.'],
  ['Notes, timers and tool state', 'Whatever you write or configure inside a tool, so it is there next time.'],
  ['API history', 'Recent requests and capped responses. Credentials are not saved, and common secret fields are redacted.'],
  ['Form autofill answers', 'Saved answers for the autofill tool. It never fills passwords, one-time codes or payment fields.'],
  ['Short-lived handoffs', 'Element-picker results and right-click payloads live in session storage and expire after five minutes.'],
]

const LEAVES = [
  {
    title: 'Network tools you run',
    body: 'Some tools are network tools by nature. Sending an API request, tracing redirects, checking links or running a speed test contacts the hosts involved, and only when you start it.',
  },
  {
    title: 'Opt-in YouTube add-ons',
    body: 'SponsorBlock and Return YouTube Dislike are off by default. When you turn them on, they request segment and dislike data for the video you are watching from their public APIs.',
  },
  {
    title: 'Web protection stays local',
    body: 'Phishing and malware checks use lists bundled with the extension. No URLs are sent to a third party to decide whether a site is safe.',
  },
]

const CONTROLS = [
  'Turn clipboard history off, or wipe it, in Settings.',
  'Switch ad blocking and web protection off globally, or allow a single site.',
  'Pause ad blocking on a site from the right-click menu.',
  'Revoke optional permissions any time from chrome://extensions.',
  'Uninstall to remove every piece of stored data.',
]

export default function PrivacyPage() {
  return (
    <>
      <section className="relative mx-auto max-w-7xl px-6 pb-16 pt-36 md:px-10 md:pt-48">
        <div aria-hidden="true" className="pointer-events-none absolute -top-10 left-1/3 size-[560px] rounded-full bg-emerald/10 blur-3xl" />
        <div className="relative">
          <ChapterLabel index="00">Privacy</ChapterLabel>
          <SplitReveal as="h1" type="chars" trigger="intro" className="mt-6 max-w-5xl text-mega font-medium tracking-[-0.055em]">
            Private by design, not by policy.
          </SplitReveal>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted md:text-xl">
            Browser Toolbox was built so there is nothing to collect. This page explains what it keeps, where it keeps
            it, and the few moments anything leaves your device.
          </p>
        </div>
      </section>

      <section aria-label="Principles" className="mx-auto max-w-7xl px-6 py-12 md:px-10">
        <Reveal className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PRINCIPLES.map((principle) => (
            <article key={principle.title} className="rounded-3xl border border-line bg-surface p-7">
              <principle.icon aria-hidden="true" className="size-6 text-emerald" strokeWidth={1.6} />
              <h2 className="mt-10 text-xl font-medium tracking-tight">{principle.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">{principle.body}</p>
            </article>
          ))}
        </Reveal>
      </section>

      <section aria-labelledby="stored-title" className="mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-32">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <ChapterLabel index="01">On your device</ChapterLabel>
            <h2 id="stored-title" className="mt-5 text-4xl font-medium tracking-[-0.045em] md:text-5xl">
              What stays here
            </h2>
            <p className="mt-4 max-w-sm text-muted">
              Everything below lives in <code className="font-mono text-ink-soft">chrome.storage</code> and never syncs to
              a server.
            </p>
          </div>
          <Reveal as="dl" className="border-t border-line" y={20} stagger={0.05}>
            {STORED.map(([title, body]) => (
              <div key={title} className="grid gap-2 border-b border-line py-6 md:grid-cols-[14rem_1fr] md:gap-8">
                <dt className="font-medium">{title}</dt>
                <dd className="text-muted">{body}</dd>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="leaves-title" className="relative overflow-hidden py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <ChapterLabel index="02">Leaving the device</ChapterLabel>
          <h2 id="leaves-title" className="sr-only">
            When anything leaves your device
          </h2>
          <ScrollWords className="mt-8 max-w-5xl text-[clamp(1.9rem,4.4vw,4rem)] font-medium leading-[1.06] tracking-[-0.045em]">
            Data leaves your browser only when a tool you started has to talk to the network, and never to us.
          </ScrollWords>
          <Reveal className="mt-16 grid gap-4 md:grid-cols-3">
            {LEAVES.map((item) => (
              <article key={item.title} className="rounded-3xl border border-line bg-surface p-7">
                <WifiIcon aria-hidden="true" className="size-5 text-cyan" strokeWidth={1.6} />
                <h3 className="mt-8 text-lg font-medium tracking-tight">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.body}</p>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="controls-title" className="mx-auto max-w-7xl px-6 py-24 md:px-10">
        <div className="grid gap-12 rounded-[32px] border border-line bg-elevated/70 p-8 md:p-14 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SlidersHorizontalIcon aria-hidden="true" className="size-6 text-ink" strokeWidth={1.6} />
            <h2 id="controls-title" className="mt-6 text-4xl font-medium tracking-[-0.045em]">
              You are in control
            </h2>
            <p className="mt-4 text-muted">
              Want the details on each Chrome permission?{' '}
              <TransitionLink href="/permissions/" transitionLabel="Permissions" className="text-ink underline decoration-line-strong underline-offset-4 hover:decoration-cyan">
                Read the permissions page
              </TransitionLink>
              .
            </p>
          </div>
          <Reveal as="ol" className="space-y-4" y={16} stagger={0.06}>
            {CONTROLS.map((control, index) => (
              <li key={control} className="flex gap-4 text-lg leading-relaxed text-ink-soft">
                <span className="font-mono text-xs leading-8 text-muted">{String(index + 1).padStart(2, '0')}</span>
                {control}
              </li>
            ))}
          </Reveal>
        </div>
      </section>

      <InstallStrip title="Nothing to collect." body="Add Browser Toolbox to Chrome. No sign-up, no tracking, no surprises." />
    </>
  )
}
