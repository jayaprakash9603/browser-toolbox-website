import { ArrowUpRightIcon } from 'lucide-react'

import { SITE } from '@/config/site'
import { cn } from '@/lib/cn'
import { Magnetic } from '@/motion/Magnetic'

import { buttonClasses, ChromeGlyph, RollText } from './primitives'

export function InstallButton({
  size = 'md',
  label = 'Add to Chrome',
  shortLabel,
  className,
}: {
  size?: 'md' | 'lg'
  label?: string
  /** Shown below the `sm` breakpoint when `label` is too long for a phone. */
  shortLabel?: string
  className?: string
}) {
  return (
    <Magnetic>
      <a
        href={SITE.chromeStoreUrl}
        target="_blank"
        rel="noreferrer"
        data-cursor="Install"
        className={cn(buttonClasses('primary', size), className)}
      >
        <ChromeGlyph className={size === 'lg' ? 'size-6' : 'size-[18px]'} />
        {shortLabel ? (
          <>
            <span className="max-sm:hidden">
              <RollText>{label}</RollText>
            </span>
            <span className="sm:hidden">
              <RollText>{shortLabel}</RollText>
            </span>
          </>
        ) : (
          <RollText>{label}</RollText>
        )}
        <ArrowUpRightIcon aria-hidden="true" className="size-4 transition-transform duration-500 group-hover/button:rotate-45" />
        <span className="sr-only">(opens the Chrome Web Store in a new tab)</span>
      </a>
    </Magnetic>
  )
}
