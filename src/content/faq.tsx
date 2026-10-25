import type { FaqItem } from '@/components/sections/Faq'
import { SITE } from '@/config/site'
import { TransitionLink } from '@/motion/TransitionLink'

const linkClass =
  'text-ink underline decoration-line-strong underline-offset-4 hover:decoration-cyan'

export function getFaqItems(toolCount: number): FaqItem[] {
  const shortcut = SITE.paletteShortcut.join('+')
  return [
    {
      question: `What is ${SITE.name}?`,
      text: `A Chrome extension that puts ${toolCount} everyday tools for developers, designers, QA and SEO in one side panel next to the page you are working on.`,
      answer: (
        <>
          A Chrome extension that puts {toolCount} everyday tools for developers, designers, QA and
          SEO in one side panel, right next to the page you are working on. Formatters, an API
          client, screenshots, colour tools, audits, privacy controls and more.
        </>
      ),
    },
    {
      question: 'Does it send my data anywhere?',
      text: 'No analytics, no account and no remote code. Settings and history live in chrome.storage.local. Network calls happen only when a tool you use needs one, such as an API request you send.',
      answer: (
        <>
          There is no analytics, no account and no remote code. Settings, favourites and history
          live in <code className="font-mono text-ink-soft">chrome.storage.local</code> on your
          device. Network calls happen only when a tool you use needs one, such as an API request
          you send or an opt-in YouTube add-on. Read the{' '}
          <TransitionLink href="/privacy/" transitionLabel="Privacy" className={linkClass}>
            privacy overview
          </TransitionLink>
          .
        </>
      ),
    },
    {
      question: 'Why does it ask for so many permissions?',
      text: 'Each permission backs a shipped feature, from the side panel and clipboard tools to ad blocking, web protection and screen capture. Every one is explained on the permissions page.',
      answer: (
        <>
          Each permission backs a shipped feature: the side panel, clipboard tools, right-click
          menus, screen capture, ad blocking and web protection. Every one is explained on the{' '}
          <TransitionLink href="/permissions/" transitionLabel="Permissions" className={linkClass}>
            permissions page
          </TransitionLink>
          , and the most invasive ones (like the debugger) are optional and requested only when you
          turn them on.
        </>
      ),
    },
    {
      question: 'Will this many tools slow my browser down?',
      text: 'No. Each tool loads only when you open it, page helpers are injected on demand, and blocking uses Chrome’s built-in declarativeNetRequest engine.',
      answer: (
        <>
          Each tool is a separate chunk that loads only when you open it. Page helpers are injected
          into a tab on demand, and blocking runs on Chrome&apos;s built-in declarativeNetRequest
          engine instead of a script on every request.
        </>
      ),
    },
    {
      question: 'How do I open a tool quickly?',
      text: `Click the toolbar icon to open the side panel, press ${shortcut} for the command palette, right-click a selection, link or image, or open the panels inside DevTools.`,
      answer: (
        <>
          Click the toolbar icon to open the side panel, press{' '}
          <span className="font-mono text-ink-soft">{shortcut}</span> for the command palette,
          right-click any selection, link or image, or use the panels inside Chrome DevTools. You
          can also pin favourites to the home screen.
        </>
      ),
    },
    {
      question: 'Which browsers are supported?',
      text: 'One Panel is built for Chrome on Manifest V3 and uses the side panel API. Chromium browsers with side panel support should work too.',
      answer: (
        <>
          It is built for Chrome on Manifest V3 and relies on the side panel API. Other Chromium
          browsers that support side panels should work too, but Chrome is the one we test against.
        </>
      ),
    },
  ]
}
