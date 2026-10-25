'use client'

import { mockImage } from '@/components/tool/stage'
import { StoryLayout, type StoryConfig, type StoryProps } from '@/components/tool/story'

import Demo from './Demo'
import { DETAILS, FACTS, IMAGES, STATS, STEPS } from './script'

const config: StoryConfig = {
  problem: {
    variant: 'blur',
    text: 'Which images are missing alt text? DevTools will tell you, one element at a time.',
    accent: ['one element at a time.'],
    compare: 'stack',
    beforeLabel: 'Inspect element',
    afterLabel: 'Audited',
    before: (
      <pre className="whitespace-pre-wrap font-mono text-sm leading-relaxed text-muted">
        {IMAGES.slice(0, 3)
          .map(
            (image) =>
              `<img src="${image.file}"${image.alt === null ? '' : ` alt="${image.alt}"`}>`,
          )
          .join('\n')}
      </pre>
    ),
    after: (
      <div className="grid grid-cols-3 gap-3">
        {IMAGES.slice(0, 3).map((image, index) => (
          <div
            key={image.file}
            className="relative h-20 rounded-lg"
            style={{ background: mockImage(index + 1) }}
          >
            <span className="absolute left-1.5 top-1.5 rounded bg-black/60 px-1.5 py-0.5 text-xs text-white">
              {image.alt === null ? 'No alt' : image.alt === '' ? 'Decorative' : 'Alt'}
            </span>
          </div>
        ))}
        <p className="col-span-3 text-sm text-ink-soft">
          {STATS.missing} of {STATS.images} images missing alt
        </p>
      </div>
    ),
  },
  walk: { title: 'Every image,', em: 'on one sheet', steps: STEPS },
  features: { layout: 'reel', title: 'Images,', em: 'fully catalogued', details: DETAILS },
  uses: { layout: 'tilt', title: 'Made for', em: 'image hunts' },
  facts: FACTS,
  backdrop: { kind: 'aurora', at: 'uses' },
  order: 'features-first',
}

export default function Story({ features, useCases }: StoryProps) {
  return <StoryLayout config={config} demo={<Demo />} features={features} useCases={useCases} />
}
