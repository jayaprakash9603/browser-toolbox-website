import type { LucideProps } from 'lucide-react'

import { ICONS } from '@/data/icons.generated'

/** Renders a lucide icon by its registry export name (e.g. `BracesIcon`). */
export function ToolIcon({ name, ...props }: { name: string } & LucideProps) {
  const Icon = ICONS[name] ?? ICONS.BoxIcon
  return <Icon aria-hidden="true" {...props} />
}
