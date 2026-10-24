import { ToolIcon } from '@/components/ui/ToolIcon'
import type { CategoryWithTools } from '@/lib/types'
import { Marquee } from '@/motion/Marquee'

export function CategoryMarquee({ categories }: { categories: CategoryWithTools[] }) {
  const half = Math.ceil(categories.length / 2)
  const rows = [categories.slice(0, half), categories.slice(half)]
  return (
    <section aria-label="Tool categories" className="relative border-y border-line bg-surface/40 py-8 md:py-10">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-canvas to-transparent md:w-48" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-canvas to-transparent md:w-48" />
      <div className="space-y-4">
        {rows.map((row, rowIndex) => (
          <Marquee key={rowIndex} reverse={rowIndex === 1} duration={rowIndex === 0 ? 46 : 52}>
            {row.map((category) => (
              <span key={category.id} className="flex items-center gap-4 pr-10 md:gap-6 md:pr-16">
                <span
                  className="flex size-10 items-center justify-center rounded-xl border border-line md:size-14 md:rounded-2xl"
                  style={{ color: category.accent, backgroundColor: `${category.accent}14` }}
                >
                  <ToolIcon name={category.icon} className="size-5 md:size-6" strokeWidth={1.6} />
                </span>
                <span className="whitespace-nowrap text-4xl font-medium tracking-[-0.04em] text-ink md:text-6xl">
                  {category.name}
                </span>
                <span className="font-mono text-xs text-muted">{String(category.tools.length).padStart(2, '0')}</span>
                <span aria-hidden="true" className="ml-2 font-serif text-4xl italic text-muted/50 md:ml-6 md:text-6xl">
                  /
                </span>
              </span>
            ))}
          </Marquee>
        ))}
      </div>
    </section>
  )
}
