'use client'

import { ShaderBackdrop } from '@/components/fx/ShaderBackdrop'
import { useToolMeta } from '@/components/tool/stage'
import {
  BeforeAfter,
  Chapter,
  ChapterHead,
  FactStrip,
  FeatureReel,
  KineticStatement,
  PinnedWalkthrough,
  StoryShell,
  UseCaseTilt,
  type StoryProps,
} from '@/components/tool/story'

import Demo from './Demo'
import { DETAILS, FACTS, STEPS, TIMING } from './script'

const VISUALS = [
  <ul key="a" className="space-y-2 font-mono text-xs text-ink-soft">
    {['▾ Users', '   GET  /users', '   POST /users', '▸ Billing'].map((row) => (
      <li key={row} className="whitespace-pre">
        {row}
      </li>
    ))}
  </ul>,
  <div key="b" className="flex flex-wrap gap-2">
    {['local', 'staging', 'production'].map((env, index) => (
      <span
        key={env}
        className={`rounded-full border px-3 py-1 text-xs ${index === 1 ? 'border-[var(--accent)] text-ink' : 'border-line text-muted'}`}
      >
        {env}
      </span>
    ))}
  </div>,
  <p key="c" className="font-mono text-sm">
    <span className="text-emerald">POST</span> <span className="text-ink-soft">/v1/orders</span>
  </p>,
  <pre
    key="d"
    className="font-mono text-xs leading-relaxed text-violet"
  >{`pm.environment.set(\n  'token', res.json().token)`}</pre>,
  <div key="e" className="space-y-1.5 font-mono text-xs text-muted">
    <p>GET /users/42 · 200</p>
    <p>GET /users/41 · 200</p>
    <p className="text-rose">GET /users/0 · 404</p>
  </div>,
  <div key="f" className="space-y-1 font-mono text-xs">
    <p className="rounded bg-rose/15 px-2 text-rose">- &quot;plan&quot;: &quot;free&quot;</p>
    <p className="rounded bg-emerald/15 px-2 text-emerald">+ &quot;plan&quot;: &quot;pro&quot;</p>
  </div>,
]

export default function Story({ features, useCases }: StoryProps) {
  const { accent } = useToolMeta()
  return (
    <StoryShell>
      <Chapter
        label="The problem"
        bg={<ShaderBackdrop variant="waves" color={accent} opacity={0.5} />}
      >
        <KineticStatement
          variant="chars"
          eyebrow="01 · The problem"
          text="Copy as cURL. Open a terminal. Fix the quotes. Do it again for staging."
          accent={['Do it again']}
        />
        <BeforeAfter
          variant="split"
          className="mt-16"
          beforeLabel="Terminal"
          afterLabel="Side panel"
          before={
            <pre className="overflow-hidden whitespace-pre-wrap font-mono text-xs leading-relaxed text-muted">
              {`$ curl 'https://staging.api.dev/users/42' \\\n  -H 'Authorization: Bearer eyJhbGciOi…' \\\n  -H 'Accept: application/json' \\\n  --compressed | jq\n\nparse error: Invalid numeric literal at line 1`}
            </pre>
          }
          after={
            <div className="space-y-3">
              <p className="font-mono text-sm">
                <span className="text-emerald">GET</span>{' '}
                <span className="text-cyan">{'{{base}}'}</span>
                <span className="text-ink-soft">/users/42</span>
              </p>
              <div className="space-y-1.5">
                {TIMING.map((phase) => (
                  <span
                    key={phase.label}
                    className="relative block h-1.5 rounded-full bg-white/[0.06]"
                  >
                    <span
                      className="absolute inset-y-0 rounded-full bg-[var(--accent)]"
                      style={{ left: `${phase.start}%`, width: `${phase.width}%` }}
                    />
                  </span>
                ))}
              </div>
              <p className="font-mono text-xs text-emerald">200 OK · 184 ms · 1.2 KB</p>
            </div>
          }
        />
      </Chapter>

      <PinnedWalkthrough index="02" title="Compose, send," em="compare" steps={STEPS}>
        <Demo />
      </PinnedWalkthrough>

      <Chapter label="Features" wide>
        <ChapterHead index="03" eyebrow="Features" title="An API client," em="minus the app" />
        <FeatureReel features={features} details={DETAILS} visuals={VISUALS} className="mt-10" />
      </Chapter>

      <Chapter label="Use cases">
        <ChapterHead
          index="04"
          eyebrow="Use cases"
          title="Debug the request"
          em="where it happens"
        />
        <UseCaseTilt items={useCases} className="mt-16" />
        <FactStrip facts={FACTS} className="mt-24" />
      </Chapter>
    </StoryShell>
  )
}
