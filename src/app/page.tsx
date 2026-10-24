import type { Metadata } from 'next'

import { CategoryMarquee } from '@/components/sections/CategoryMarquee'
import { Faq } from '@/components/sections/Faq'
import { FinalCta } from '@/components/sections/FinalCta'
import { Hero } from '@/components/sections/Hero'
import { PanelReel } from '@/components/sections/PanelReel'
import { PlatformStack } from '@/components/sections/PlatformStack'
import { PrivacyChapter } from '@/components/sections/PrivacyChapter'
import { Stats } from '@/components/sections/Stats'
import { ToolBelt, type BeltCategory } from '@/components/sections/ToolBelt'
import { ToolBento, type BentoTool } from '@/components/sections/ToolBento'
import { WorkflowScrub } from '@/components/sections/WorkflowScrub'
import { JsonLd } from '@/components/seo/JsonLd'
import { SITE } from '@/config/site'
import { getFaqItems } from '@/content/faq'
import { CATEGORIES, CATEGORY_COUNT, getCategory, getFeaturedTools, getToolContent, TOOL_COUNT, toolAccent } from '@/lib/tools'

export const metadata: Metadata = {
  title: { absolute: `${SITE.name} — ${TOOL_COUNT} tools in one Chrome side panel` },
  description: SITE.description,
  alternates: { canonical: '/' },
}

export default function HomePage() {
  const beltCategories: BeltCategory[] = CATEGORIES.map((category) => ({
    id: category.id,
    name: category.name,
    description: category.description,
    icon: category.icon,
    accent: category.accent,
    tools: category.tools.map((tool) => ({ id: tool.id, name: tool.name, route: tool.route, icon: tool.icon })),
  }))

  const bentoTools: BentoTool[] = getFeaturedTools().map((tool) => ({
    id: tool.id,
    name: tool.name,
    route: tool.route,
    icon: tool.icon,
    accent: toolAccent(tool),
    tagline: getToolContent(tool).tagline,
    categoryName: getCategory(tool.category)?.name ?? '',
  }))

  const faqItems = getFaqItems(TOOL_COUNT)

  return (
    <>
      <JsonLd
        data={[
          {
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: SITE.name,
            description: SITE.description,
            applicationCategory: 'DeveloperApplication',
            operatingSystem: 'Chrome',
            url: SITE.url,
            installUrl: SITE.chromeStoreUrl,
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
            featureList: CATEGORIES.map((category) => category.name).join(', '),
          },
          {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqItems.map((item) => ({
              '@type': 'Question',
              name: item.question,
              acceptedAnswer: { '@type': 'Answer', text: item.text },
            })),
          },
        ]}
      />
      <Hero toolCount={TOOL_COUNT} categoryCount={CATEGORY_COUNT} />
      <CategoryMarquee categories={CATEGORIES} />
      <PanelReel />
      <Stats toolCount={TOOL_COUNT} categoryCount={CATEGORY_COUNT} />
      <ToolBelt categories={beltCategories} toolCount={TOOL_COUNT} />
      <PlatformStack />
      <WorkflowScrub />
      <PrivacyChapter />
      <ToolBento tools={bentoTools} />
      <FinalCta toolCount={TOOL_COUNT} />
      <Faq items={faqItems} />
    </>
  )
}
