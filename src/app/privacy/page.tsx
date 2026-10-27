import type { Metadata } from 'next'

import { ContactEmail, LegalDocument, type LegalSection } from '@/components/pages/LegalDocument'
import { InstallStrip } from '@/components/tool/InstallStrip'
import { SITE } from '@/config/site'
import { TransitionLink } from '@/motion/TransitionLink'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'How the One Panel Chrome extension and website handle your information: what stays on your device, the few times anything leaves it, and how to reach us.',
  alternates: { canonical: '/privacy/' },
}

const LAST_UPDATED = 'October 27, 2026'

const THIRD_PARTIES: { service: string; when: string; sent: string }[] = [
  {
    service: 'Websites and APIs you choose',
    when: 'You send an API request, check links, trace redirects, download images, bundle a page or scrape data.',
    sent: 'The request you built, sent straight from your browser to the address you entered.',
  },
  {
    service: 'Cloudflare (speed.cloudflare.com)',
    when: 'You start a speed test.',
    sent: 'Test traffic, plus your IP address as part of any normal connection.',
  },
  {
    service: 'ipwho.is and BigDataCloud (api.bigdatacloud.net)',
    when: 'You start a speed test.',
    sent: 'Your IP address, to show your provider and approximate city.',
  },
  {
    service: 'ipify (api.ipify.org)',
    when: 'The Internet Monitor is on and “Show IP” is enabled.',
    sent: 'Your IP address, to display it back to you.',
  },
  {
    service: 'The ping address you choose',
    when: 'The Internet Monitor is on.',
    sent: 'A small connectivity check, by default to google.com.',
  },
  {
    service: 'Google PageSpeed Insights',
    when: 'You run a PageSpeed check in the SEO Toolkit.',
    sent: 'The URL of the page you are checking.',
  },
  {
    service: 'SponsorBlock (sponsor.ajay.app)',
    when: 'You turn on SponsorBlock in the YouTube Control Panel.',
    sent: 'The ID of the YouTube video you are watching.',
  },
  {
    service: 'Return YouTube Dislike (returnyoutubedislikeapi.com)',
    when: 'You turn on dislike counts in the YouTube Control Panel.',
    sent: 'The ID of the YouTube video you are watching.',
  },
  {
    service: 'Google Translate (translate.googleapis.com)',
    when: 'You turn on translation in the WhatsApp add-on and translate a message.',
    sent: 'The text of the message you asked to translate.',
  },
  {
    service: 'Webhook URLs you add',
    when: 'You add a webhook in the WhatsApp add-on and press Test.',
    sent: 'A test event. No message content is included.',
  },
  {
    service: 'Script sources you choose',
    when: 'You install a userscript from a URL, or a script you installed checks for updates.',
    sent: 'A normal download request to the address the script comes from.',
  },
]

const SECTIONS: LegalSection[] = [
  {
    id: 'about',
    title: 'Who we are',
    content: (
      <>
        <p>
          Thank you for using One Panel. One Panel is a Chrome extension and companion website
          built and maintained by {SITE.owner} (“we”, “us”). This policy explains, as plainly as
          we can, what information the extension and the website at{' '}
          <a href={SITE.url}>{SITE.url.replace(/^https?:\/\//, '')}</a> handle, why, and the
          choices you have.
        </p>
        <p>
          If you have any question about privacy, or about anything else to do with One Panel,
          please write to <ContactEmail subject="One Panel privacy question" />. We are always happy
          to help.
        </p>
      </>
    ),
  },
  {
    id: 'summary',
    title: 'The short version',
    content: (
      <ul>
        <li>There is no account, no sign-up and no login.</li>
        <li>We do not use analytics, telemetry, advertising or crash reporting.</li>
        <li>
          We do not run any server that receives your data, and we never sell, rent or share your
          information.
        </li>
        <li>
          Everything you create or save in One Panel stays in your browser’s storage on your own
          device.
        </li>
        <li>
          One Panel has no access to the websites you visit when it is installed. You decide which
          sites, if any, it may work on.
        </li>
        <li>
          Information only leaves your device when you start a tool or turn on a feature that has
          to contact another service. Every one of those cases is listed below.
        </li>
      </ul>
    ),
  },
  {
    id: 'not-collected',
    title: 'Information we do not collect',
    content: (
      <>
        <p>
          We do not collect, receive or store any personal information on our side. In
          particular, we do not collect your name, email address, browsing history, the content of
          pages you visit, your clipboard, your messages, your location, or any identifier that
          could be used to track you.
        </p>
        <p>
          Because none of this reaches us, we also cannot see, recover or hand over the data kept
          in your copy of the extension.
        </p>
      </>
    ),
  },
  {
    id: 'on-device',
    title: 'Information stored on your device',
    content: (
      <>
        <p>
          To remember your work between sessions, One Panel saves the following in Chrome’s
          extension storage (<code>chrome.storage</code>) on your computer. It is not synced to a
          server and is removed when you uninstall the extension.
        </p>
        <ul>
          <li>
            <strong>Settings and preferences</strong>, such as your theme, favourite tools and
            recently used tools.
          </li>
          <li>
            <strong>Clipboard history</strong>, if you keep it switched on. By default it records
            only text you copy inside One Panel. Recording text you copy on websites is a separate
            option that is off until you enable it.
          </li>
          <li>
            <strong>Things you create in tools</strong>, such as notes, tasks, timers, colour
            palettes, saved requests, HTTP Interceptor rules and Script Studio scripts.
          </li>
          <li>
            <strong>API Request Builder history</strong>: recent requests and a capped copy of their
            responses. Credentials are not saved, and common secret fields are hidden.
          </li>
          <li>
            <strong>2FA Authenticator accounts</strong>: the account names and secret keys you add,
            so the tool can show your codes.
          </li>
          <li>
            <strong>Form Autofill data</strong>: answers you save, and entries the tool remembers
            from forms on sites you have given it access to. It never stores passwords, one-time
            codes or payment card details.
          </li>
          <li>
            <strong>Site add-on data</strong>, such as saved replies, scheduled messages, labels
            and broadcast lists you create in the WhatsApp add-on, and your choices in the YouTube
            and Instagram add-ons.
          </li>
          <li>
            <strong>Short-lived handoffs</strong>, such as element-picker results and right-click
            selections. These sit in session storage and expire after five minutes.
          </li>
        </ul>
        <p>
          Screenshots, recordings, converted files and exports are saved only where you choose,
          using Chrome’s normal download flow.
        </p>
      </>
    ),
  },
  {
    id: 'permissions',
    title: 'Permissions and site access',
    content: (
      <>
        <p>
          Chrome extensions must ask for permissions. We keep these to what each feature truly
          needs, and the most sensitive ones are optional.
        </p>
        <ul>
          <li>
            <strong>No site access at install.</strong> When you click the One Panel icon, a menu
            item or a keyboard shortcut, Chrome lets the tool read only the tab you are on, and
            only at that moment.
          </li>
          <li>
            <strong>Access you grant.</strong> Ad blocking, web protection, page clipboard capture
            and the site add-ons work across pages, so Chrome asks your permission when you turn
            them on. You can allow just the current site or all sites.
          </li>
          <li>
            <strong>Optional permissions.</strong> Reading the clipboard, the HTTP Interceptor
            network log, user scripts, cookie access for scripts and the debugger are each
            requested only the first time you use the feature that needs them.
          </li>
          <li>
            <strong>Undo at any time.</strong> You can revoke site access in One Panel under
            Settings › Website access, or remove any permission from <code>chrome://extensions</code>.
          </li>
        </ul>
        <p>
          A full list of every permission and the feature behind it is on our{' '}
          <TransitionLink href="/permissions/" transitionLabel="Permissions">
            permissions page
          </TransitionLink>
          .
        </p>
      </>
    ),
  },
  {
    id: 'leaves-device',
    title: 'When information leaves your device',
    content: (
      <>
        <p>
          Some tools exist to talk to the network, and a few optional features rely on public
          services. Information is sent only in the situations below, only after you start the
          tool or turn on the feature, and directly from your browser to that service. Nothing is
          ever sent to us.
        </p>
        <div className="-mx-1 overflow-x-auto">
          <table className="w-full min-w-[36rem] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-line-strong text-ink">
                <th scope="col" className="py-3 pr-4 font-medium">
                  Service
                </th>
                <th scope="col" className="py-3 pr-4 font-medium">
                  When
                </th>
                <th scope="col" className="py-3 font-medium">
                  What is sent
                </th>
              </tr>
            </thead>
            <tbody>
              {THIRD_PARTIES.map((row) => (
                <tr key={row.service} className="border-b border-line align-top">
                  <td className="py-3 pr-4 text-ink">{row.service}</td>
                  <td className="py-3 pr-4">{row.when}</td>
                  <td className="py-3">{row.sent}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          These services are run by other companies and have their own privacy policies, for
          example <a href="https://policies.google.com/privacy">Google’s</a> and{' '}
          <a href="https://www.cloudflare.com/privacypolicy/">Cloudflare’s</a>. Like any website,
          they can see your IP address when your browser connects to them.
        </p>
        <p>
          A few buttons simply open another website in a new tab, such as “Share via Gmail”,
          “Open in WhatsApp” or SEO links to Google, Ahrefs or the Wayback Machine. Nothing is sent
          until you click them, and what happens next is covered by that website’s own policy.
        </p>
        <p>
          Read Aloud uses the voices built into Chrome. If you pick an online voice, Chrome may
          send the text to its voice provider to speak it. Voices installed on your computer work
          offline.
        </p>
      </>
    ),
  },
  {
    id: 'site-add-ons',
    title: 'Site add-ons',
    content: (
      <>
        <p>
          The YouTube, Instagram, X, LinkedIn and WhatsApp add-ons are off until you turn them on.
          Once on, they run only on that website and only change how the page looks or behaves in
          your own browser.
        </p>
        <ul>
          <li>
            <strong>WhatsApp:</strong> the add-on works inside your signed-in WhatsApp Web tab.
            Your chats, contacts and messages are read and processed locally in your browser to
            power features like exports, labels, analytics and scheduled messages. They are never
            sent to us. Exports are saved only to your computer. Translation, if you use it, is the
            only feature that sends message text anywhere, as described above.
          </li>
          <li>
            <strong>YouTube:</strong> SponsorBlock and Return YouTube Dislike send only the video
            ID, and only when you turn them on.
          </li>
          <li>
            <strong>Instagram, X and LinkedIn:</strong> these tools work on the page in front of
            you and do not send its content anywhere.
          </li>
        </ul>
        <p>
          One Panel is an independent project. It is not affiliated with, endorsed by or
          sponsored by Google, YouTube, Meta, Instagram, WhatsApp, X or LinkedIn, and their names
          are used only to describe which website a feature works on.
        </p>
      </>
    ),
  },
  {
    id: 'clipboard-capture',
    title: 'Clipboard, screenshots and recordings',
    content: (
      <ul>
        <li>
          The clipboard is read only when you press Paste or a similar button in a tool, after
          Chrome asks your permission the first time. Clipboard text is processed on your device.
        </li>
        <li>
          Clipboard history can be paused, limited in size or cleared at any time in Settings.
          Please keep in mind that copied text can include sensitive things such as passwords, and
          switch history off if you would rather not keep it.
        </li>
        <li>
          Screenshots and screen recordings capture only the tab, window or screen you pick, at the
          moment you ask. Chrome shows its own picker and indicator while recording. Files are
          saved to your computer and are not uploaded.
        </li>
      </ul>
    ),
  },
  {
    id: 'scripts',
    title: 'Script Studio and user scripts',
    content: (
      <>
        <p>
          All of One Panel’s own code and its filter lists are included in the extension package.
          Nothing is downloaded and run behind your back.
        </p>
        <p>
          Script Studio is a userscript manager. It runs only scripts that you choose to install or
          write yourself, through Chrome’s official user scripts API, and only after you grant the
          permission and allow user scripts for One Panel in Chrome. Scripts you install are
          written by other people. Please install scripts only from sources you trust, and review
          what each script asks to do on the install screen.
        </p>
      </>
    ),
  },
  {
    id: 'blocking',
    title: 'Ad blocking and web protection',
    content: (
      <p>
        Both are off until you turn them on. They use filter and threat lists that ship inside the
        extension, and every check happens on your device. We do not send the addresses you visit
        to anyone to decide whether a site is safe. Blocked-request counts are kept locally for the
        badge and the Ad Blocker tool.
      </p>
    ),
  },
  {
    id: 'chrome-web-store',
    title: 'Chrome Web Store User Data Policy',
    content: (
      <>
        <p>
          The use of information received through One Panel adheres to the{' '}
          <a href="https://developer.chrome.com/docs/webstore/program-policies/user-data-faq">
            Chrome Web Store User Data Policy
          </a>
          , including its Limited Use requirements. In particular:
        </p>
        <ul>
          <li>Information is used only to provide the features you use in One Panel.</li>
          <li>
            It is never sold, never used for advertising, and never used to determine credit
            worthiness or for lending purposes.
          </li>
          <li>
            It is not transferred to anyone, except to the services listed above when you use the
            matching feature, or if the law requires it.
          </li>
          <li>No person reads your data, because it never reaches us.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'retention',
    title: 'How long data is kept, and how to delete it',
    content: (
      <>
        <p>
          Data stays on your device until you delete it. You can remove it in any of these ways:
        </p>
        <ul>
          <li>Clear individual items inside each tool, such as notes, tasks or history.</li>
          <li>Wipe clipboard history, or reset everything, in One Panel’s Settings.</li>
          <li>Revoke site access and optional permissions as described above.</li>
          <li>Uninstall One Panel, which deletes all of its stored data from Chrome.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'rights',
    title: 'Your rights and choices',
    content: (
      <>
        <p>
          Depending on where you live, laws such as the GDPR, the UK GDPR, California’s CCPA and
          India’s Digital Personal Data Protection Act give you rights to access, correct, delete
          or move your personal data, and to object to how it is used.
        </p>
        <p>
          Because One Panel keeps your data on your own device, you can exercise these rights
          directly: view it in the tools, export it where a tool offers export, and delete it as
          described above. If you have any request or concern, please email{' '}
          <ContactEmail subject="One Panel data request" /> and we will gladly help.
        </p>
      </>
    ),
  },
  {
    id: 'security',
    title: 'Security',
    content: (
      <p>
        We follow Chrome’s security model: the extension uses Manifest V3, ships all of its own
        code in the package, and asks for sensitive permissions only when they are needed. Your
        data is protected by your operating system account and your Chrome profile, so please keep
        your device and browser locked and up to date. If you believe you have found a security
        issue, we would be grateful if you reported it privately to{' '}
        <ContactEmail subject="One Panel security report" />.
      </p>
    ),
  },
  {
    id: 'children',
    title: 'Children’s privacy',
    content: (
      <p>
        One Panel is a general-purpose tool and is not directed at children under 13 (or the
        minimum age in your country). We do not knowingly collect information from children, and
        the extension does not send personal information to us at all.
      </p>
    ),
  },
  {
    id: 'website',
    title: 'This website',
    content: (
      <p>
        This website has no account, no analytics, no advertising and no tracking cookies. It is
        hosted on Cloudflare, which, like any hosting provider, processes basic technical
        information such as your IP address and browser type to deliver the pages and protect them
        from abuse. Links to the Chrome Web Store take you to Google’s site, which has its own
        policy.
      </p>
    ),
  },
  {
    id: 'changes',
    title: 'Changes to this policy',
    content: (
      <p>
        If One Panel changes in a way that affects your privacy, we will update this page and the
        “Last updated” date above before the change is released. If a change would let new kinds of
        information leave your device, the feature will stay off until you choose to turn it on.
      </p>
    ),
  },
  {
    id: 'contact',
    title: 'Contact us',
    content: (
      <p>
        For any question, request or concern about this policy, your data or One Panel in general,
        please contact {SITE.owner} at <ContactEmail subject="One Panel" />. Thank you for trusting
        One Panel.
      </p>
    ),
  },
]

export default function PrivacyPage() {
  return (
    <>
      <LegalDocument
        label="Privacy"
        title="Privacy Policy"
        intro={
          <p>
            One Panel was built so there is nothing to collect. This policy explains what the
            extension keeps, where it keeps it, and the few moments anything leaves your device.
          </p>
        }
        lastUpdated={LAST_UPDATED}
        sections={SECTIONS}
        contactSubject="One Panel privacy question"
      />
      <InstallStrip
        title="Nothing to collect."
        body="Add One Panel to Chrome. No sign-up, no tracking, no surprises."
      />
    </>
  )
}
