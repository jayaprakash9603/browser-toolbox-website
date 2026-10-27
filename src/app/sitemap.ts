import type { MetadataRoute } from 'next'

import { SITE } from '@/config/site'
import { CATEGORIES, categoryHref, TOOLS, toolHref } from '@/lib/tools'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path: string) => `${SITE.url}${path}`
  return [
    { url: url('/'), changeFrequency: 'weekly', priority: 1 },
    { url: url('/tools/'), changeFrequency: 'weekly', priority: 0.9 },
    ...CATEGORIES.map((category) => ({
      url: url(categoryHref(category.id)),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    ...TOOLS.map((tool) => ({ url: url(toolHref(tool)), changeFrequency: 'monthly' as const, priority: 0.8 })),
    { url: url('/privacy/'), changeFrequency: 'yearly', priority: 0.4 },
    { url: url('/terms/'), changeFrequency: 'yearly', priority: 0.3 },
    { url: url('/permissions/'), changeFrequency: 'yearly', priority: 0.4 },
  ]
}
