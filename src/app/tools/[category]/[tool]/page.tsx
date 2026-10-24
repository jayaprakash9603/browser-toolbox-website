import { CheckIcon, LockKeyholeIcon, MousePointerClickIcon } from 'lucide-react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { JsonLd } from '@/components/seo/JsonLd'
import { InstallStrip } from '@/components/tool/InstallStrip'
import { Pager } from '@/components/tool/Pager'
import { RelatedTools } from '@/components/tool/RelatedTools'
import { ToolHero } from '@/components/tool/ToolHero'
import { ChapterLabel } from '@/components/ui/primitives'
import { SITE, SOCIAL_IMAGE } from '@/config/site'
import { CAPABILITY_COPY, getOpenSteps, getPrivacyNotes } from '@/lib/capabilities'
import {
  CATEGORIES,
  categoryHref,
  getCategory,
  getRelatedTools,
  getTool,
  getToolContent,
  getToolNeighbours,
  TOOLS,
  toolAccent,
  toolHref,
} from '@/lib/tools'
import { Reveal } from '@/motion/Reveal'

interface ToolPageProps {
  params: Promise<{ category: string; tool: string }>
}

export const dynamicParams = false

export function generateStaticParams() {
  return TOOLS.map((tool) => ({ category: tool.categorySlug, tool: tool.slug }))
}

export async function generateMetadata({ params }: ToolPageProps): Promise<Metadata> {
  const { category, tool: slug } = await params
  const tool = getTool(category, slug)
  if (!tool) return {}
  const content = getToolContent(tool)
  const title = `${tool.name} — ${content.tagline.replace(/\.$/, '')}`
  return {
    title,
    description: tool.description,
    keywords: [...tool.keywords, ...tool.aliases],
    alternates: { canonical: toolHref(tool) },
    openGraph: {
      type: 'website',
      siteName: SITE.name,
      title: `${tool.name} · ${SITE.name}`,
      description: tool.description,
      url: toolHref(tool),
      images: [SOCIAL_IMAGE],
    },
    twitter: { card: 'summary_large_image', title: `${tool.name} · ${SITE.name}`, description: tool.description, images: [SOCIAL_IMAGE.url] },
  }
}

const categoryNames = Object.fromEntries(CATEGORIES.map((category) => [category.id, category.name]))

export default async function ToolPage({ params }: ToolPageProps) {
  const { category: categorySlug, tool: slug } = await params
  const tool = getTool(categorySlug, slug)
  if (!tool) notFound()

  const category = getCategory(tool.category)
  const content = getToolContent(tool)
  const accent = toolAccent(tool)
  const { previous, next } = getToolNeighbours(tool)
  const related = getRelatedTools(tool)
  const openSteps = getOpenSteps(tool)
  const privacyNotes = getPrivacyNotes(tool)
  const capabilityLabels = tool.capabilities.map((capability) => CAPABILITY_COPY[capability]?.label).filter(Boolean)
  const categoryName = category?.name ?? 'Tools'

  return (
    <>
      <JsonLd
        data={[
          {
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: `${tool.name} · ${SITE.name}`,
            description: tool.description,
            url: `${SITE.url}${toolHref(tool)}`,
            isPartOf: { '@type': 'WebSite', name: SITE.name, url: SITE.url },
            about: {
              '@type': 'SoftwareApplication',
              name: SITE.name,
              applicationCategory: 'DeveloperApplication',
              operatingSystem: 'Chrome',
              featureList: [tool.name, ...content.features].join(', '),
            },
          },
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE.url}/` },
              { '@type': 'ListItem', position: 2, name: 'Tools', item: `${SITE.url}/tools/` },
              { '@type': 'ListItem', position: 3, name: categoryName, item: `${SITE.url}${categoryHref(tool.category)}` },
              { '@type': 'ListItem', position: 4, name: tool.name, item: `${SITE.url}${toolHref(tool)}` },
            ],
          },
        ]}
      />

      <ToolHero
        key={tool.id}
        name={tool.name}
        icon={tool.icon}
        accent={accent}
        tagline={content.tagline}
        description={tool.description}
        beta={tool.status === 'beta'}
        capabilityLabels={capabilityLabels}
        features={content.features}
        crumbs={[
          { href: '/', label: 'Home' },
          { href: '/tools/', label: 'Tools' },
          { href: categoryHref(tool.category), label: categoryName },
          { label: tool.name },
        ]}
      />

      <section aria-labelledby="features-title" className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28">
        <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <ChapterLabel index="01">Features</ChapterLabel>
            <h2 id="features-title" className="mt-5 text-4xl font-medium tracking-[-0.045em] md:text-5xl">
              What it does
            </h2>
          </div>
          <Reveal as="ol" className="border-t border-line" y={20} stagger={0.06}>
            {content.features.map((feature, index) => (
              <li key={feature} className="group flex items-baseline gap-6 border-b border-line py-6 md:gap-10 md:py-7">
                <span className="font-mono text-xs text-muted">{String(index + 1).padStart(2, '0')}</span>
                <span className="text-2xl font-medium tracking-[-0.035em] transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-2 md:text-3xl">
                  {feature}
                </span>
                <span
                  aria-hidden="true"
                  className="ml-auto h-px flex-1 origin-left scale-x-0 self-center transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-x-100"
                  style={{ backgroundColor: accent }}
                />
              </li>
            ))}
          </Reveal>
        </div>
      </section>

      {content.useCases.length > 0 ? (
        <section aria-labelledby="usecases-title" className="mx-auto max-w-7xl px-6 py-12 md:px-10 md:py-20">
          <ChapterLabel index="02">Use cases</ChapterLabel>
          <h2 id="usecases-title" className="mt-5 text-4xl font-medium tracking-[-0.045em] md:text-5xl">
            When you&apos;ll reach for it
          </h2>
          <Reveal className="mt-12 grid gap-4 md:grid-cols-2" y={30}>
            {content.useCases.map((useCase, index) => (
              <figure key={useCase} className="relative overflow-hidden rounded-3xl border border-line bg-surface p-8 md:p-10">
                <span aria-hidden="true" className="absolute right-6 top-2 font-serif text-[7rem] italic leading-none" style={{ color: `${accent}33` }}>
                  {index + 1}
                </span>
                <blockquote className="relative max-w-md font-serif text-2xl italic leading-snug text-ink md:text-3xl">
                  {useCase}
                </blockquote>
              </figure>
            ))}
          </Reveal>
        </section>
      ) : null}

      <section aria-label="How to open and privacy" className="mx-auto grid max-w-7xl gap-4 px-6 py-16 md:grid-cols-2 md:px-10 md:py-24">
        <Reveal className="rounded-3xl border border-line bg-surface p-8 md:p-10" items="[data-step]" y={18}>
          <MousePointerClickIcon aria-hidden="true" className="size-6" style={{ color: accent }} strokeWidth={1.6} />
          <h2 className="mt-6 text-2xl font-medium tracking-tight md:text-3xl">How to open it</h2>
          <ol className="mt-8 space-y-6">
            {openSteps.map((step, index) => (
              <li key={step.label} data-step="" className="flex gap-4">
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full border border-line-strong font-mono text-[11px] text-ink-soft">
                  {index + 1}
                </span>
                <div>
                  <p className="font-medium">{step.label}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>
        <Reveal className="rounded-3xl border border-line bg-surface p-8 md:p-10" items="[data-note]" y={18}>
          <LockKeyholeIcon aria-hidden="true" className="size-6 text-emerald" strokeWidth={1.6} />
          <h2 className="mt-6 text-2xl font-medium tracking-tight md:text-3xl">Privacy</h2>
          <ul className="mt-8 space-y-5">
            {privacyNotes.map((note) => (
              <li key={note} data-note="" className="flex gap-3 text-sm leading-relaxed text-ink-soft">
                <CheckIcon aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-emerald" />
                {note}
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      <RelatedTools tools={related} categoryNames={categoryNames} />

      <Pager
        label="Tool navigation"
        previous={{ href: toolHref(previous), label: previous.name, icon: previous.icon, accent: toolAccent(previous) }}
        next={{ href: toolHref(next), label: next.name, icon: next.icon, accent: toolAccent(next) }}
      />

      <InstallStrip
        title={`Get ${tool.name} and ${TOOLS.length - 1} more`}
        body="One install adds every tool to your side panel. No account, nothing to configure."
      />
    </>
  )
}
