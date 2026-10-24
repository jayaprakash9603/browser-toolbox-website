import type { Metadata } from 'next'

import { PermissionsList } from '@/components/pages/PermissionsList'
import { InstallStrip } from '@/components/tool/InstallStrip'
import { ChapterLabel } from '@/components/ui/primitives'
import { NOT_REQUESTED, PERMISSION_COUNT, PERMISSION_GROUPS } from '@/content/permissions'
import { SplitReveal } from '@/motion/SplitReveal'

export const metadata: Metadata = {
  title: 'Permissions',
  description:
    'Every Chrome permission Browser Toolbox requests, and exactly which feature uses it. Optional permissions are only requested when you turn the feature on.',
  alternates: { canonical: '/permissions/' },
}

export default function PermissionsPage() {
  const optionalCount = PERMISSION_GROUPS.flatMap((group) => group.permissions).filter((p) => p.kind === 'optional').length

  return (
    <>
      <section className="relative mx-auto max-w-7xl px-6 pb-20 pt-36 md:px-10 md:pb-28 md:pt-48">
        <div aria-hidden="true" className="pointer-events-none absolute -top-10 right-0 size-[520px] rounded-full bg-amber/10 blur-3xl" />
        <div className="relative">
          <ChapterLabel index={String(PERMISSION_COUNT)}>Permissions</ChapterLabel>
          <SplitReveal as="h1" type="chars" trigger="intro" className="mt-6 max-w-5xl text-mega font-medium tracking-[-0.055em]">
            Every permission, and why.
          </SplitReveal>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted md:text-xl">
            Chrome shows a short warning when you install an extension. Here is the long version: each permission
            Browser Toolbox asks for, and the feature that uses it. {optionalCount} of them are optional and only
            requested when you switch that feature on.
          </p>
        </div>
      </section>

      <section aria-label="Permission details" className="mx-auto max-w-7xl px-6 pb-24 md:px-10">
        <PermissionsList groups={PERMISSION_GROUPS} />
      </section>

      <section aria-labelledby="not-requested-title" className="mx-auto max-w-7xl px-6 py-20 md:px-10">
        <div className="rounded-[32px] border border-dashed border-line-strong p-8 md:p-12">
          <h2 id="not-requested-title" className="text-3xl font-medium tracking-[-0.04em] md:text-4xl">
            Deliberately not requested
          </h2>
          <p className="mt-3 max-w-xl text-muted">
            Browser Toolbox never asks for these. They will only be added if a feature truly needs them.
          </p>
          <ul className="mt-8 flex flex-wrap gap-2">
            {NOT_REQUESTED.map((name) => (
              <li key={name}>
                <code className="rounded-lg border border-line px-3 py-1.5 font-mono text-sm text-muted line-through decoration-rose/70">{name}</code>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <InstallStrip title="Transparent by default." body="Review the permissions above, then add Browser Toolbox to Chrome." />
    </>
  )
}
