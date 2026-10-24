import { ImageResponse } from 'next/og'

import { SITE, SOCIAL_IMAGE } from '@/config/site'
import { CATEGORIES, TOOL_COUNT } from '@/lib/tools'

export function renderSocialImage() {
  const chips = CATEGORIES.slice(0, 12)
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 72,
          background: '#07070b',
          backgroundImage:
            'radial-gradient(circle at 85% 15%, rgba(99,102,241,0.45), transparent 45%), radial-gradient(circle at 10% 95%, rgba(34,211,238,0.25), transparent 40%)',
          color: '#f4f4f6',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 16,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'linear-gradient(135deg, #6366f1, #22d3ee)',
              fontSize: 30,
              fontWeight: 700,
            }}
          >
            B
          </div>
          <div style={{ fontSize: 30, letterSpacing: -0.5, display: 'flex' }}>{SITE.name}</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 96, lineHeight: 0.95, letterSpacing: -4, fontWeight: 600, display: 'flex' }}>
            One side panel.
          </div>
          <div style={{ fontSize: 96, lineHeight: 0.95, letterSpacing: -4, fontWeight: 600, color: '#b9c0ff', display: 'flex' }}>
            {`${TOOL_COUNT} tools.`}
          </div>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
          {chips.map((category) => (
            <div
              key={category.id}
              style={{
                display: 'flex',
                padding: '8px 16px',
                borderRadius: 999,
                border: '1px solid rgba(255,255,255,0.16)',
                color: category.accent,
                fontSize: 20,
              }}
            >
              {category.name}
            </div>
          ))}
        </div>
      </div>
    ),
    { width: SOCIAL_IMAGE.width, height: SOCIAL_IMAGE.height },
  )
}
