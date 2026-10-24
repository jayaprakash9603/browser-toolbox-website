import { ChevronRightIcon } from 'lucide-react'
import { Fragment } from 'react'

import { TransitionLink } from '@/motion/TransitionLink'

export interface Crumb {
  href?: string
  label: string
}

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
        {items.map((item, index) => (
          <Fragment key={item.label}>
            {index > 0 ? (
              <li aria-hidden="true">
                <ChevronRightIcon className="size-3.5 text-line-strong" />
              </li>
            ) : null}
            <li>
              {item.href ? (
                <TransitionLink href={item.href} transitionLabel={item.label} className="transition-colors hover:text-ink">
                  {item.label}
                </TransitionLink>
              ) : (
                <span aria-current="page" className="text-ink-soft">
                  {item.label}
                </span>
              )}
            </li>
          </Fragment>
        ))}
      </ol>
    </nav>
  )
}
