import type { Metadata } from 'next'

import { ContactEmail, LegalDocument, type LegalSection } from '@/components/pages/LegalDocument'
import { InstallStrip } from '@/components/tool/InstallStrip'
import { SITE } from '@/config/site'
import { TransitionLink } from '@/motion/TransitionLink'

export const metadata: Metadata = {
  title: 'Terms and Conditions',
  description:
    'The terms for using the One Panel Chrome extension and website: your licence, fair use, third-party sites, disclaimers and how to contact us.',
  alternates: { canonical: '/terms/' },
}

const LAST_UPDATED = 'October 27, 2026'

const SECTIONS: LegalSection[] = [
  {
    id: 'agreement',
    title: 'Agreement to these terms',
    content: (
      <>
        <p>
          Welcome, and thank you for choosing One Panel. These Terms and Conditions (“Terms”) are
          an agreement between you and {SITE.owner} (“we”, “us”), the developer of the One Panel
          Chrome extension (the “Extension”) and the website at{' '}
          <a href={SITE.url}>{SITE.url.replace(/^https?:\/\//, '')}</a> (the “Website”), together
          the “Service”.
        </p>
        <p>
          By installing the Extension or using the Website, you agree to these Terms and to our{' '}
          <TransitionLink href="/privacy/" transitionLabel="Privacy">
            Privacy Policy
          </TransitionLink>
          . If you do not agree, please do not use the Service. If you use the Service on behalf of
          an organisation, you confirm that you are allowed to accept these Terms for it.
        </p>
      </>
    ),
  },
  {
    id: 'service',
    title: 'About the Service',
    content: (
      <p>
        One Panel is a free browser extension that brings developer, QA, design, privacy and
        productivity tools together in Chrome’s side panel. Most tools work entirely in your
        browser. Some features are optional and, when you turn them on, work on specific websites
        or contact third-party services, as explained in the Privacy Policy.
      </p>
    ),
  },
  {
    id: 'eligibility',
    title: 'Who may use One Panel',
    content: (
      <p>
        You may use the Service if you are at least 13 years old, or the minimum age required to
        use online services in your country, and you are able to form a binding agreement. If you
        are under 18, please make sure a parent or guardian has read these Terms with you.
      </p>
    ),
  },
  {
    id: 'licence',
    title: 'Your licence to use One Panel',
    content: (
      <>
        <p>
          We grant you a personal, worldwide, royalty-free, non-exclusive, non-transferable and
          revocable licence to install and use the Extension for personal or work purposes, in
          line with these Terms.
        </p>
        <p>Unless the law allows it or we agree in writing, please do not:</p>
        <ul>
          <li>sell, rent, sublicense or redistribute the Extension, or publish copies of it;</li>
          <li>
            remove copyright, licence or trademark notices, or present the Extension as your own;
          </li>
          <li>
            modify, decompile or reverse engineer the Extension, except to the extent an open-source
            licence or applicable law permits it.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: 'acceptable-use',
    title: 'Using One Panel responsibly',
    content: (
      <>
        <p>
          One Panel gives you powerful tools, and we trust you to use them fairly. You agree not to
          use the Service to:
        </p>
        <ul>
          <li>break any law or regulation, or infringe anyone’s rights, including privacy and intellectual property rights;</li>
          <li>
            send spam or unsolicited bulk messages, including through the WhatsApp scheduling and
            broadcast features, or contact people who have not agreed to hear from you;
          </li>
          <li>
            collect or scrape personal data, or other content, in a way that breaks the law or the
            terms of the website you are using;
          </li>
          <li>
            access systems, accounts or data you are not authorised to access, test websites you do
            not own or have permission to test, or bypass security measures;
          </li>
          <li>create, install or spread malware, or interfere with other people’s devices or services;</li>
          <li>harass, deceive, impersonate or harm anyone.</li>
        </ul>
        <p>
          You are responsible for how you use the tools, for the requests you send, the scripts you
          install, the webhooks you add and the data you process with them.
        </p>
      </>
    ),
  },
  {
    id: 'third-party-sites',
    title: 'Third-party websites and services',
    content: (
      <>
        <p>
          Some features work on, or with, websites and services run by others, such as YouTube,
          Instagram, WhatsApp, X, LinkedIn, Google, Cloudflare, SponsorBlock and Return YouTube
          Dislike. Your use of those websites remains subject to their own terms and policies, and
          it is your responsibility to follow them.
        </p>
        <p>
          We do not control these services and are not responsible for their content,
          availability or practices. A website may change at any time in a way that stops a
          feature from working.
        </p>
        <p>
          One Panel is an independent project and is not affiliated with, endorsed by or sponsored
          by any of these companies. All product names, logos and trademarks belong to their
          respective owners and are used only to identify which website a feature works with.
        </p>
      </>
    ),
  },
  {
    id: 'user-scripts',
    title: 'Userscripts and content you add',
    content: (
      <p>
        Script Studio and the HTTP Interceptor let you install or write your own scripts and rules.
        Scripts from other sources are created by third parties, not by us. We do not review or
        vouch for them, and you install and run them at your own risk. You keep ownership of
        anything you create in One Panel, such as notes, tasks, scripts and rules.
      </p>
    ),
  },
  {
    id: 'your-data',
    title: 'Your data and backups',
    content: (
      <p>
        One Panel stores your data on your own device and we do not keep a copy. This means we
        cannot restore anything that is deleted, lost when you uninstall the Extension or reset
        your browser, or lost because of a device problem. Where a tool offers export, please use it
        to keep backups of anything important. How we handle information is described in the{' '}
        <TransitionLink href="/privacy/" transitionLabel="Privacy">
          Privacy Policy
        </TransitionLink>
        .
      </p>
    ),
  },
  {
    id: 'protection-limits',
    title: 'Ad blocking and web protection',
    content: (
      <p>
        The ad blocker and web protection rely on filter and threat lists. They help reduce ads,
        trackers and known dangerous sites, but no list is complete and some websites may not work
        correctly while they are on. They are not a replacement for antivirus software, careful
        browsing or Chrome’s own safety features. You can pause them for any site at any time.
      </p>
    ),
  },
  {
    id: 'ownership',
    title: 'Intellectual property',
    content: (
      <>
        <p>
          The Extension and the Website, including their design, code, text and graphics, are owned
          by {SITE.owner} and are protected by copyright and other laws. The One Panel name and logo
          may not be used in a way that suggests we endorse you or your product.
        </p>
        <p>
          One Panel includes open-source software, such as the wa-js library by WPPConnect under the
          Apache License 2.0. Each open-source component is provided under its own licence, which is
          included with the Extension, and nothing in these Terms limits your rights under those
          licences.
        </p>
      </>
    ),
  },
  {
    id: 'feedback',
    title: 'Feedback',
    content: (
      <p>
        We love hearing ideas and bug reports. If you send us feedback or suggestions, you allow us
        to use them to improve One Panel without any obligation to you. Please do not send
        confidential information as feedback.
      </p>
    ),
  },
  {
    id: 'updates',
    title: 'Updates and availability',
    content: (
      <p>
        We may update, change or remove features, release new versions through the Chrome Web
        Store, or stop offering the Service, at any time. We will try to give notice of major
        changes on this website. One Panel is currently free; if we ever introduce paid features,
        they will be clearly marked and will never be charged without your agreement.
      </p>
    ),
  },
  {
    id: 'disclaimer',
    title: 'Disclaimer of warranties',
    content: (
      <p>
        One Panel is provided free of charge, “as is” and “as available”. To the fullest extent the
        law allows, we make no warranties of any kind, whether express or implied, including
        warranties of merchantability, fitness for a particular purpose, accuracy and
        non-infringement. We do not promise that the Service will be uninterrupted, error-free or
        secure, or that results such as conversions, calculations, test data, SEO scores or
        security checks will be accurate. Please double-check anything important before relying
        on it.
      </p>
    ),
  },
  {
    id: 'liability',
    title: 'Limitation of liability',
    content: (
      <>
        <p>
          To the fullest extent the law allows, {SITE.owner} will not be liable for any indirect,
          incidental, special, consequential or punitive damages, or for any loss of data, profits,
          revenue, business or goodwill, arising from or related to your use of, or inability to
          use, the Service, even if we have been told such loss is possible.
        </p>
        <p>
          Because the Service is free, our total liability for any claim relating to it is limited
          to the greater of the amount you paid us for the Service in the previous twelve months
          (which for most users is zero) or INR 1,000. Nothing in these Terms limits liability that
          cannot be limited by law, such as liability for fraud.
        </p>
      </>
    ),
  },
  {
    id: 'indemnity',
    title: 'Indemnity',
    content: (
      <p>
        If you misuse the Service or break these Terms or the law, and this leads to a claim
        against us, you agree to compensate us for reasonable losses and costs that result, to the
        extent the law allows.
      </p>
    ),
  },
  {
    id: 'termination',
    title: 'Ending these terms',
    content: (
      <p>
        You can stop using One Panel at any time by uninstalling the Extension. We may suspend or
        end your licence if you seriously or repeatedly break these Terms. The sections on
        intellectual property, disclaimers, limitation of liability, indemnity and governing law
        continue to apply after these Terms end.
      </p>
    ),
  },
  {
    id: 'law',
    title: 'Governing law',
    content: (
      <p>
        These Terms are governed by the laws of India. Before going to court, we would sincerely
        appreciate the chance to resolve any concern informally, so please write to us first. Any
        dispute that cannot be resolved this way will be handled by the competent courts in India,
        without affecting any mandatory consumer rights you have in the country where you live.
      </p>
    ),
  },
  {
    id: 'changes',
    title: 'Changes to these terms',
    content: (
      <p>
        We may update these Terms from time to time. When we do, we will change the “Last updated”
        date above, and for significant changes we will make a reasonable effort to let you know.
        By continuing to use One Panel after an update, you accept the revised Terms.
      </p>
    ),
  },
  {
    id: 'general',
    title: 'General',
    content: (
      <p>
        These Terms and the Privacy Policy are the whole agreement between you and us about the
        Service. If any part of these Terms is found to be unenforceable, the rest stays in effect.
        If we do not enforce a right straight away, we have not given it up. You may not transfer
        your rights under these Terms without our consent.
      </p>
    ),
  },
  {
    id: 'contact',
    title: 'Contact us',
    content: (
      <p>
        If you have any question about these Terms, please contact {SITE.owner} at{' '}
        <ContactEmail subject="One Panel terms question" />. We are happy to help. Thank you for
        using One Panel.
      </p>
    ),
  },
]

export default function TermsPage() {
  return (
    <>
      <LegalDocument
        label="Terms"
        title="Terms and Conditions"
        intro={
          <p>
            The simple rules for using One Panel: what you may do with it, what we promise, and what
            we cannot promise. We have kept them as short and readable as we could.
          </p>
        }
        lastUpdated={LAST_UPDATED}
        sections={SECTIONS}
        contactSubject="One Panel terms question"
      />
      <InstallStrip
        title="Free, local and yours."
        body="Add One Panel to Chrome and get every tool in one side panel."
      />
    </>
  )
}
