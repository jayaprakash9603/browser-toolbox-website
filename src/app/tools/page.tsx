import type { Metadata } from 'next'

import { JsonLd } from '@/components/seo/JsonLd'
import { CategoryIndex } from '@/components/tool/CategoryIndex'
import { InstallStrip } from '@/components/tool/InstallStrip'
import { ToolsExplorer, type ExplorerCategory } from '@/components/tool/ToolsExplorer'
import { ChapterLabel } from '@/components/ui/primitives'
import { SITE } from '@/config/site'
import { CATEGORIES, CATEGORY_COUNT, TOOL_COUNT, TOOLS, toolHref } from '@/lib/tools'
import { SplitReveal } from '@/motion/SplitReveal'

export const metadata: Metadata = {
  title: `All ${TOOL_COUNT} tools`,
  description: `Search every One Panel tool: ${TOOL_COUNT} tools across ${CATEGORY_COUNT} categories, from JSON and API clients to screenshots, SEO audits and privacy controls.`,
  alternates: { canonical: '/tools/' },
}

export default function ToolsPage() {
  const explorerCategories: ExplorerCategory[] = CATEGORIES.map((category) => ({
    id: category.id,
    name: category.name,
    icon: category.icon,
    accent: category.accent,
    count: category.tools.length,
  }))
  const indexCategories = CATEGORIES.map((category) => ({
    id: category.id,
    name: category.name,
    icon: category.icon,
    accent: category.accent,
    count: category.tools.length,
    description: category.description,
    preview: category.tools.slice(0, 6).map((tool) => tool.name),
  }))

  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: `All tools · ${SITE.name}`,
          url: `${SITE.url}/tools/`,
          mainEntity: {
            '@type': 'ItemList',
            numberOfItems: TOOL_COUNT,
            itemListElement: TOOLS.map((tool, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              name: tool.name,
              url: `${SITE.url}${toolHref(tool)}`,
            })),
          },
        }}
      />
      <section className="relative mx-auto max-w-7xl px-6 pb-16 pt-36 md:px-10 md:pt-48">
        <div aria-hidden="true" className="pointer-events-none absolute -top-20 left-1/4 size-[560px] rounded-full bg-indigo/20 blur-3xl" />
        <div className="relative">
          <ChapterLabel index={String(TOOL_COUNT)}>The catalogue</ChapterLabel>
          <SplitReveal as="h1" type="chars" trigger="intro" className="mt-6 max-w-5xl text-mega font-medium tracking-[-0.055em]">
            Every tool, one search away.
          </SplitReveal>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted md:text-xl">
            {TOOL_COUNT} tools across {CATEGORY_COUNT} categories. Filter, search by name or keyword, and open any tool to
            see what it does.
          </p>
        </div>
      </section>

      <section aria-label="Search and filter tools" className="mx-auto max-w-7xl px-6 pb-24 md:px-10">
        <ToolsExplorer tools={TOOLS} categories={explorerCategories} />
      </section>

      <section aria-labelledby="categories-title" className="mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-32">
        <ChapterLabel index={String(CATEGORY_COUNT)}>Categories</ChapterLabel>
        <h2 id="categories-title" className="mb-12 mt-5 text-title font-medium tracking-[-0.045em]">
          Browse by category
        </h2>
        <CategoryIndex categories={indexCategories} />
      </section>

      <InstallStrip
        title={`${TOOL_COUNT} tools. One install.`}
        body="Add One Panel to Chrome and every tool on this page is in your side panel."
      />
    </>
  )
}
