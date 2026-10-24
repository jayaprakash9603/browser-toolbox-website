import { renderSocialImage } from '@/components/seo/socialImage'

// A route handler (instead of opengraph-image.tsx) so the static export writes a real `og.png`.
export const dynamic = 'force-static'

export function GET() {
  return renderSocialImage()
}
