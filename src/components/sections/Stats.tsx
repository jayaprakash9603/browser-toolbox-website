import { ChapterLabel } from '@/components/ui/primitives'
import { Counter } from '@/motion/Counter'
import { Reveal } from '@/motion/Reveal'
import { SplitReveal } from '@/motion/SplitReveal'

export function Stats({ toolCount, categoryCount }: { toolCount: number; categoryCount: number }) {
  const stats = [
    { value: toolCount, suffix: '', label: 'Tools in one panel', note: 'Consolidated toolkits, not a wall of icons.' },
    { value: categoryCount, suffix: '', label: 'Categories', note: 'Developer, QA, design, privacy, productivity…' },
    { value: 0, suffix: '', label: 'Trackers or analytics', note: 'No account. No telemetry.' },
    { value: 100, suffix: '%', label: 'Local processing', note: 'Hashing, JWT, images and notes stay on-device.' },
  ]
  return (
    <section aria-labelledby="stats-title" className="mx-auto max-w-7xl px-6 py-28 md:px-10 md:py-40">
      <div className="grid gap-10 md:grid-cols-[1fr_1.4fr] md:items-end">
        <div>
          <ChapterLabel index="03">By the numbers</ChapterLabel>
          <SplitReveal as="h2" id="stats-title" type="words" className="mt-6 text-title font-medium tracking-[-0.045em]">
            A whole toolbelt that weighs nothing.
          </SplitReveal>
        </div>
        <p className="max-w-lg text-lg leading-relaxed text-muted">
          Every tool loads on demand, so the side panel opens instantly and the browser stays quick. One install
          replaces dozens of single-purpose extensions and the bookmarks you keep for one-off web tools.
        </p>
      </div>
      <Reveal as="dl" className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-line bg-line lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="flex flex-col justify-between gap-10 bg-canvas p-6 md:p-8">
            <dt className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">{stat.label}</dt>
            <dd>
              <Counter
                value={stat.value}
                suffix={stat.suffix}
                className="block text-[clamp(2.5rem,11vw,7rem)] font-medium leading-none tracking-[-0.06em] text-ink lg:text-[clamp(3.5rem,5.4vw,5.75rem)]"
              />
              <span className="mt-3 block text-sm text-muted">{stat.note}</span>
            </dd>
          </div>
        ))}
      </Reveal>
    </section>
  )
}
