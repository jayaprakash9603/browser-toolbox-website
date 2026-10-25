import { InstallButton } from '@/components/ui/InstallButton'
import { LogoMark } from '@/components/ui/Logo'

export function InstallStrip({ title, body }: { title: string; body: string }) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-32">
      <div className="relative flex flex-col items-start gap-8 overflow-hidden rounded-[32px] border border-line-strong bg-elevated p-8 md:flex-row md:items-center md:justify-between md:p-14">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 -top-24 size-80 rounded-full bg-indigo/25 blur-3xl"
        />
        <div className="relative flex items-start gap-5">
          <LogoMark className="mt-1 size-12 shrink-0" />
          <div>
            <h2 className="text-3xl font-medium tracking-[-0.045em] md:text-4xl">{title}</h2>
            <p className="mt-3 max-w-lg text-muted">{body}</p>
          </div>
        </div>
        <div className="relative">
          <InstallButton size="lg" />
        </div>
      </div>
    </section>
  )
}
