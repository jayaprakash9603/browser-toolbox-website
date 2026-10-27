import { MailIcon } from 'lucide-react'
import type { ReactNode } from 'react'

import { ChapterLabel } from '@/components/ui/primitives'
import { SITE } from '@/config/site'
import { SplitReveal } from '@/motion/SplitReveal'

export interface LegalSection {
  id: string
  title: string
  content: ReactNode
}

export function ContactEmail({ subject }: { subject?: string }) {
  const href = `mailto:${SITE.contactEmail}${subject ? `?subject=${encodeURIComponent(subject)}` : ''}`
  return <a href={href}>{SITE.contactEmail}</a>
}

export function LegalDocument({
  label,
  title,
  intro,
  lastUpdated,
  sections,
  contactSubject,
}: {
  label: string
  title: string
  intro: ReactNode
  lastUpdated: string
  sections: LegalSection[]
  contactSubject: string
}) {
  return (
    <>
      <section className="relative mx-auto max-w-7xl px-6 pb-12 pt-36 md:px-10 md:pt-48">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-10 left-1/3 size-[560px] rounded-full bg-emerald/10 blur-3xl"
        />
        <div className="relative">
          <ChapterLabel index="00">{label}</ChapterLabel>
          <SplitReveal
            as="h1"
            type="chars"
            trigger="intro"
            className="mt-6 max-w-5xl text-mega font-medium tracking-[-0.055em]"
          >
            {title}
          </SplitReveal>
          <div className="mt-6 max-w-2xl text-lg leading-relaxed text-muted md:text-xl">{intro}</div>
          <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-3 font-mono text-xs uppercase tracking-[0.18em] text-muted">
            <div className="flex gap-2">
              <dt>Last updated</dt>
              <dd className="text-ink-soft">{lastUpdated}</dd>
            </div>
            <div className="flex gap-2">
              <dt>Developer</dt>
              <dd className="text-ink-soft">{SITE.owner}</dd>
            </div>
            <div className="flex gap-2">
              <dt>Contact</dt>
              <dd className="normal-case tracking-normal text-ink-soft">
                <a
                  href={`mailto:${SITE.contactEmail}?subject=${encodeURIComponent(contactSubject)}`}
                  className="underline decoration-line-strong underline-offset-4 hover:decoration-cyan"
                >
                  {SITE.contactEmail}
                </a>
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <div className="mx-auto grid max-w-7xl gap-12 px-6 pb-24 md:px-10 lg:grid-cols-[16rem_1fr]">
        <nav aria-label="On this page" className="hidden lg:block">
          <div className="sticky top-28">
            <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.24em] text-muted">
              On this page
            </p>
            <ol className="space-y-2 text-sm">
              {sections.map((section, index) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="flex gap-3 text-ink-soft transition-colors hover:text-ink"
                  >
                    <span className="font-mono text-[11px] leading-5 text-muted">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    {section.title}
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </nav>

        <div className="max-w-3xl">
          {sections.map((section, index) => (
            <section
              key={section.id}
              id={section.id}
              aria-labelledby={`${section.id}-title`}
              className="scroll-mt-28 border-t border-line py-10 first:border-t-0 first:pt-0"
            >
              <h2
                id={`${section.id}-title`}
                className="flex items-baseline gap-4 text-2xl font-medium tracking-[-0.03em] md:text-3xl"
              >
                <span className="font-mono text-xs text-muted">
                  {String(index + 1).padStart(2, '0')}
                </span>
                {section.title}
              </h2>
              <div className="mt-5 space-y-4 leading-relaxed text-ink-soft [&_a]:text-ink [&_a]:underline [&_a]:decoration-line-strong [&_a]:underline-offset-4 hover:[&_a]:decoration-cyan [&_code]:font-mono [&_code]:text-[0.9em] [&_code]:text-ink [&_h3]:pt-2 [&_h3]:text-lg [&_h3]:font-medium [&_h3]:text-ink [&_li]:pl-1 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-5 [&_strong]:font-medium [&_strong]:text-ink [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5">
                {section.content}
              </div>
            </section>
          ))}

          <aside className="mt-6 rounded-3xl border border-line bg-surface p-7 md:p-9">
            <MailIcon aria-hidden="true" className="size-5 text-cyan" strokeWidth={1.6} />
            <h2 className="mt-6 text-xl font-medium tracking-tight">Questions? Just write.</h2>
            <p className="mt-2 text-muted">
              If anything here is unclear, or you would like to make a request about your data,
              please email{' '}
              <a
                href={`mailto:${SITE.contactEmail}?subject=${encodeURIComponent(contactSubject)}`}
                className="text-ink underline decoration-line-strong underline-offset-4 hover:decoration-cyan"
              >
                {SITE.contactEmail}
              </a>
              . Every message is read personally, and we aim to reply within 30 days.
            </p>
          </aside>
        </div>
      </div>
    </>
  )
}
