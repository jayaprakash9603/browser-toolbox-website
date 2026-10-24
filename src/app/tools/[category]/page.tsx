import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { JsonLd } from '@/components/seo/JsonLd'
import { CategoryHero } from '@/components/tool/CategoryHero'
import { InstallStrip } from '@/components/tool/InstallStrip'
import { Pager } from '@/components/tool/Pager'
import { ToolCard } from '@/components/tool/ToolCard'
import { SITE, SOCIAL_IMAGE } from '@/config/site'
import { CATEGORIES, categoryHref, getCategory, getCategoryNeighbours, toolHref } from '@/lib/tools'
import { Reveal } from '@/motion/Reveal'

interface CategoryPageProps {
  params: Promise<{ category: string }>
}

export const dynamicParams = false

export function generateStaticParams() {
  return CATEGORIES.map((category) => ({ category: category.id }))
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category: id } = await params
  const category = getCategory(id)
  if (!category) return {}
  const title = `${category.name} tools`
  const description = `${category.description} ${category.tools.length} ${category.name.toLowerCase()} tools in the Browser Toolbox side panel: ${category.tools
    .slice(0, 4)
    .map((tool) => tool.name)
    .join(', ')}${category.tools.length > 4 ? ' and more' : ''}.`
  return {
    title,
    description,
    alternates: { canonical: categoryHref(category.id) },
    openGraph: {
      type: 'website',
      siteName: SITE.name,
      title: `${title} · ${SITE.name}`,
      description,
      url: categoryHref(category.id),
      images: [SOCIAL_IMAGE],
    },
    twitter: { card: 'summary_large_image', title: `${title} · ${SITE.name}`, description, images: [SOCIAL_IMAGE.url] },
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category: id } = await params
  const category = getCategory(id)
  if (!category) notFound()
  const { previous, next } = getCategoryNeighbours(category.id)

  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: `${category.name} tools · ${SITE.name}`,
          description: category.description,
          url: `${SITE.url}${categoryHref(category.id)}`,
          mainEntity: {
            '@type': 'ItemList',
            itemListElement: category.tools.map((tool, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              name: tool.name,
              url: `${SITE.url}${toolHref(tool)}`,
            })),
          },
        }}
      />
      <CategoryHero
        key={category.id}
        name={category.name}
        description={category.description}
        icon={category.icon}
        accent={category.accent}
        index={category.index}
        total={CATEGORIES.length}
        toolCount={category.tools.length}
        crumbs={[{ href: '/', label: 'Home' }, { href: '/tools/', label: 'Tools' }, { label: category.name }]}
      />

      <section aria-label={`${category.name} tools`} className="mx-auto max-w-7xl px-6 pb-24 md:px-10 md:pb-32">
        <Reveal as="ul" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" y={36} stagger={0.06}>
          {category.tools.map((tool) => (
            <li key={tool.id}>
              <ToolCard tool={tool} />
            </li>
          ))}
        </Reveal>
      </section>

      <Pager
        label="Category navigation"
        previous={{ href: categoryHref(previous.id), label: previous.name, icon: previous.icon, accent: previous.accent }}
        next={{ href: categoryHref(next.id), label: next.name, icon: next.icon, accent: next.accent }}
      />

      <InstallStrip
        title={`All ${category.tools.length} ${category.name.toLowerCase()} tools, one click away`}
        body="Install once and every category lives in your side panel, ready whenever you need it."
      />
    </>
  )
}
