import { InstallButton } from '@/components/ui/InstallButton'
import { Wordmark } from '@/components/ui/Logo'
import { Keycap } from '@/components/ui/primitives'
import { SITE } from '@/config/site'
import { categoryHref } from '@/lib/routes'
import { TransitionLink } from '@/motion/TransitionLink'

import type { ShellCategory } from './shellData'

const GIANT = 'TOOLBOX'

export function Footer({ categories, toolCount }: { categories: ShellCategory[]; toolCount: number }) {
  return (
    <footer className="relative overflow-hidden border-t border-line bg-canvas">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,var(--color-indigo),var(--color-cyan),transparent)] opacity-60"
      />
      <div className="mx-auto max-w-7xl px-6 pb-8 pt-20 md:px-10">
        <div className="grid gap-12 md:grid-cols-[1.2fr_2fr]">
          <div className="space-y-6">
            <Wordmark className="text-lg" />
            <p className="max-w-sm text-sm leading-relaxed text-muted">
              {toolCount} developer, QA, design and productivity tools in one Chrome side panel. Local-first, no
              account, no tracking.
            </p>
            <InstallButton />
            <p className="flex items-center gap-2 font-mono text-[11px] text-muted">
              Open anywhere with
              {SITE.paletteShortcut.map((key) => (
                <Keycap key={key}>{key}</Keycap>
              ))}
            </p>
          </div>
          <div className="grid gap-10 sm:grid-cols-[2fr_1fr]">
            <nav aria-label="Categories">
              <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.24em] text-muted">Categories</p>
              <ul className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
                {categories.map((category) => (
                  <li key={category.id}>
                    <TransitionLink
                      href={categoryHref(category.id)}
                      transitionLabel={category.name}
                      className="group inline-flex items-center gap-2 text-ink-soft transition-colors hover:text-ink"
                    >
                      <span
                        aria-hidden="true"
                        className="size-1.5 rounded-full transition-transform duration-300 group-hover:scale-150"
                        style={{ backgroundColor: category.accent }}
                      />
                      {category.name}
                      <span className="font-mono text-[10px] text-muted">{category.count}</span>
                    </TransitionLink>
                  </li>
                ))}
              </ul>
            </nav>
            <nav aria-label="Product">
              <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.24em] text-muted">Product</p>
              <ul className="space-y-2 text-sm">
                <li>
                  <TransitionLink href="/tools/" transitionLabel="All tools" className="text-ink-soft hover:text-ink">
                    All tools
                  </TransitionLink>
                </li>
                <li>
                  <TransitionLink href="/#platform" className="text-ink-soft hover:text-ink">
                    Platform
                  </TransitionLink>
                </li>
                <li>
                  <TransitionLink href="/privacy/" transitionLabel="Privacy" className="text-ink-soft hover:text-ink">
                    Privacy policy
                  </TransitionLink>
                </li>
                <li>
                  <TransitionLink href="/permissions/" transitionLabel="Permissions" className="text-ink-soft hover:text-ink">
                    Permissions
                  </TransitionLink>
                </li>
                <li>
                  <a href={SITE.chromeStoreUrl} target="_blank" rel="noreferrer" className="text-ink-soft hover:text-ink">
                    Chrome Web Store
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <p
          aria-hidden="true"
          className="mt-20 flex select-none justify-between font-medium leading-[0.8] tracking-[-0.06em] text-[clamp(4.5rem,19.5vw,19rem)]"
        >
          {GIANT.split('').map((letter, index) => (
            <span
              key={`${letter}-${index}`}
              className="inline-block bg-[linear-gradient(180deg,rgb(255_255_255/0.95),rgb(255_255_255/0.08))] bg-clip-text text-transparent transition-[transform,color] duration-700 ease-[var(--ease-spring)] hover:-translate-y-[0.12em] hover:text-indigo motion-reduce:hover:translate-y-0"
            >
              {letter}
            </span>
          ))}
        </p>

        <div className="mt-8 flex flex-col gap-3 border-t border-line pt-6 font-mono text-[11px] text-muted sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Browser Toolbox · Built for Chrome · Manifest V3</span>
          <span>No analytics on the extension. No remote code. Your data stays on your device.</span>
        </div>
      </div>
    </footer>
  )
}
