import type { ToolContent } from '@/lib/types'

// Marketing copy keyed by registry id. Tools without an entry fall back to registry text.
export const TOOL_CONTENT: Record<string, ToolContent> = {
  'clipboard.manager': {
    tagline: 'Everything you copied, searchable and pinned.',
    features: [
      'Searchable history',
      'Pin favourites',
      'Text-only filter',
      'Add from clipboard',
      'Clear or delete items',
    ],
    useCases: [
      'Re-use a snippet you copied an hour ago',
      'Keep API keys for a session pinned at the top',
    ],
  },

  'text.formatter': {
    tagline: 'Pretty-print or minify code in one keystroke.',
    features: [
      'JavaScript & TypeScript',
      'HTML & XML',
      'CSS',
      'Markdown',
      'Auto-detect language',
      'Minify',
    ],
    useCases: ['Untangle a minified script from production', 'Tidy a pasted HTML email template'],
  },
  'text.case-converter': {
    tagline: 'camelCase, snake_case, Title Case and six more.',
    features: [
      'lower / UPPER',
      'Title & Sentence',
      'camelCase',
      'PascalCase',
      'snake_case',
      'kebab-case',
      'CONSTANT_CASE',
    ],
    useCases: ['Rename variables across languages', 'Turn a headline into a URL slug'],
  },
  'text.whitespace-cleaner': {
    tagline: 'Strip the invisible mess out of pasted text.',
    features: ['Trim lines', 'Collapse spaces', 'Remove blank lines', 'Normalize line breaks'],
    useCases: ['Clean text copied from PDFs', 'Prepare data before importing a CSV'],
  },
  'text.analyzer': {
    tagline: 'Words, characters, reading time and readability.',
    features: [
      'Word & character count',
      'Lines & paragraphs',
      'Reading time',
      'Readability score',
      'Line metrics',
    ],
    useCases: ['Hit a meta description length', 'Check an essay against a word limit'],
  },
  'text.line-tools': {
    tagline: 'Dedupe, sort, shuffle and number any list.',
    features: ['Dedupe', 'Sort A–Z / Z–A', 'Reverse', 'Shuffle', 'Number lines', 'Remove empty'],
    useCases: ['Merge two email lists without duplicates', 'Randomise a list of test inputs'],
  },
  'text.find-replace': {
    tagline: 'Find and replace with regex, case and whole-word control.',
    features: ['Regex mode', 'Match case', 'Whole word', 'Live match count'],
    useCases: ['Rewrite a batch of URLs', 'Swap placeholder tokens in a template'],
  },
  'text.diff': {
    tagline: 'Spot every change between two texts.',
    features: ['Side-by-side input', 'Added & removed highlights', 'Line-level diff'],
    useCases: ['Compare two config files', 'Review edits a colleague made to copy'],
  },
  'text.read-aloud': {
    tagline: 'Listen to any page with adjustable speed.',
    features: ['Page text picker', 'Play, pause, stop', 'Speed control', 'System voices'],
    useCases: ['Proof-listen your own article', 'Rest your eyes on long documentation'],
  },
  'text.dummy-data': {
    tagline: 'Lorem ipsum and random filler on demand.',
    features: ['Paragraphs', 'Sentences', 'Words', 'Lorem or random text'],
    useCases: ['Fill a design mock with realistic copy', 'Stress-test text overflow in a layout'],
  },

  'developer.react-devtools': {
    tagline: 'React DevTools, restyled to match your toolbox.',
    features: [
      'Components tree',
      'Profiler',
      'Suspense inspector',
      'Elements sidebar',
      'Themed panels',
    ],
    useCases: ['Track down a re-render storm', 'Inspect props and hooks on a live site'],
  },
  'developer.json-toolkit': {
    tagline: 'Validate, format, explore and convert JSON.',
    features: [
      'Format & minify',
      'Validate with line errors',
      'Tree view',
      'JSONPath query',
      'Convert to CSV, XML, TypeScript',
    ],
    useCases: ['Read a huge API response as a tree', 'Generate TypeScript types from a payload'],
  },
  'developer.xml-toolkit': {
    tagline: 'Format, validate and convert XML to JSON.',
    features: ['Format', 'Minify', 'Validate', 'XML → JSON'],
    useCases: ['Debug a SOAP response', 'Read a sitemap or RSS feed'],
  },
  'developer.yaml-toolkit': {
    tagline: 'YAML that validates, formats and round-trips to JSON.',
    features: ['Validate', 'Format', 'YAML → JSON', 'JSON → YAML'],
    useCases: ['Check a Kubernetes manifest', 'Convert a CI config to JSON'],
  },
  'developer.sql-toolkit': {
    tagline: 'Readable SQL across dialects.',
    features: ['Format', 'Minify', 'PostgreSQL, MySQL, SQLite and more', 'Keyword casing'],
    useCases: ['Untangle a one-line ORM query', 'Paste clean SQL into a code review'],
  },
  'developer.regex-toolkit': {
    tagline: 'Test, replace and borrow regular expressions.',
    features: [
      'Live match highlighting',
      'Capture groups',
      'Replace preview',
      'Pattern library',
      'Flags',
    ],
    useCases: ['Build an email validator', 'Extract IDs from a log dump'],
  },
  'developer.id-toolkit': {
    tagline: 'UUID v4, v7 and NanoID — generated and validated.',
    features: ['UUID v4', 'UUID v7', 'NanoID', 'Bulk generate', 'Validate'],
    useCases: ['Seed a database with IDs', 'Check whether a string is a valid UUID'],
  },

  'qa.element-inspector': {
    tagline: 'Point at any element and read its DNA.',
    features: ['Hover picker', 'Tag & attributes', 'Computed styles', 'Box dimensions'],
    useCases: ['Grab exact spacing for a bug report', 'Check which styles actually apply'],
  },
  'qa.selector-generator': {
    tagline: 'Stable CSS and XPath selectors in one click.',
    features: ['CSS selectors', 'XPath', 'Test attributes first', 'One-click copy'],
    useCases: ['Write a test locator that survives refactors', 'Target an element in a script'],
  },
  'qa.xpath-tester': {
    tagline: 'Run XPath against the live page.',
    features: ['Evaluate expressions', 'Match count', 'Sample matches'],
    useCases: ['Debug a failing automation locator', 'Count nodes matching a pattern'],
  },
  'qa.test-data-generator': {
    tagline: 'Realistic, reproducible test datasets.',
    features: ['Schema presets', 'Reproducible seeds', 'Edge-case values', 'JSON, CSV, TSV or SQL'],
    useCases: ['Seed a staging database', 'Build fixtures for a demo'],
  },
  'qa.http-status': {
    tagline: 'The HTTP status codes you meet, with debugging hints.',
    features: ['Searchable reference', '1xx–5xx groups', 'What it means', 'How to debug it'],
    useCases: ['Decode a 429 in a log', 'Explain a 409 to a teammate'],
  },
  'qa.bug-reporter': {
    tagline: 'A complete bug report before you finish describing it.',
    features: [
      'Page URL & title',
      'Viewport & user agent',
      'Expected, actual & steps',
      'Markdown output',
    ],
    useCases: ['File a Jira ticket with full context', 'Report a layout bug from QA'],
  },

  'api.http-interceptor': {
    tagline: 'Rewrite, redirect and mock live traffic.',
    features: [
      'Redirect rules',
      'Header edits',
      'Mock responses',
      'GraphQL matching',
      'Network log',
      'Pause toggle',
    ],
    useCases: ['Point production at a local API', 'Mock a failing endpoint without a backend'],
  },
  'api.request-builder': {
    tagline: 'A Postman-style API client inside your side panel.',
    features: [
      'Collections',
      'Environments',
      'Request editor',
      'Pre/post scripts',
      'History',
      'Response diff',
    ],
    useCases: ['Replay a request from DevTools with new headers', 'Compare two API responses'],
  },

  'data.universal-converter': {
    tagline: 'JSON, CSV, XML, YAML, TSV and Markdown — any direction.',
    features: ['JSON', 'CSV / TSV', 'XML', 'YAML', 'Markdown tables'],
    useCases: ['Turn a JSON export into a spreadsheet', 'Paste a table into a README'],
  },
  'data.data-scraper': {
    tagline: 'Turn tables and lists on any page into a spreadsheet.',
    features: [
      'Auto-detect tables & lists',
      'Manual selectors',
      'Pagination',
      'CSV & Excel export',
    ],
    useCases: ['Export a product listing', 'Collect a directory into a sheet'],
  },

  'web.url-toolkit': {
    tagline: 'Parse, edit, encode and clean URLs.',
    features: ['Parse parts', 'Query editor', 'Encode / decode', 'Strip tracking params'],
    useCases: ['Remove UTM junk before sharing', 'Debug a double-encoded query string'],
  },
  'web.link-toolkit': {
    tagline: 'Every link on the page, sorted and filterable.',
    features: ['Internal vs external', 'Filter & search', 'Copy all'],
    useCases: ['Audit outbound links', 'Collect resources from a docs page'],
  },
  'web.image-links': {
    tagline: 'Image URLs, sizes and alt text at a glance.',
    features: ['Grid or list view', 'Dimensions', 'Alt text', 'Copy URLs'],
    useCases: ['Find images missing alt text', 'Grab a hero image URL'],
  },
  'web.page-info': {
    tagline: 'Meta, canonical, Open Graph and Twitter cards.',
    features: ['Title & description', 'Canonical', 'Open Graph', 'Twitter cards'],
    useCases: ['Check a share preview before launch', 'Verify canonical tags'],
  },
  'web.tech-stack': {
    tagline: 'Find out what a site is built with.',
    features: ['Frameworks', 'CMS', 'Analytics', 'CDN'],
    useCases: ['Research a competitor', 'Qualify a lead by stack'],
  },
  'web.redirect-tracer': {
    tagline: 'Every URL a tab passes through, in order.',
    features: ['Hop timeline', 'Final destination', 'Per-tab history'],
    useCases: ['Debug a redirect loop', 'See where a short link really went'],
  },
  'web.link-checker': {
    tagline: 'Find broken links before your users do.',
    features: ['Batch status check', 'Broken links flagged', 'Up to 80 links per run'],
    useCases: ['Audit a docs page after a migration', 'Pre-launch QA'],
  },
  'web.utm-builder': {
    tagline: 'Campaign URLs with a QR preview.',
    features: ['Source, medium, campaign', 'Live preview', 'QR code', 'Copy link'],
    useCases: ['Tag a newsletter link', 'Print a QR for an event'],
  },
  'web.copy-markdown': {
    tagline: 'Copy any article or selection as clean Markdown.',
    features: ['Selection → Markdown', 'Article mode', 'Links & images kept'],
    useCases: ['Clip research into Notion or Obsidian', 'Quote docs in a PR'],
  },
  'web.html-bundle': {
    tagline: 'Save a page and its linked reports as one ZIP.',
    features: ['Scan linked pages', 'Select pages', 'Offline ZIP', 'file:// fallback'],
    useCases: ['Archive a Cucumber or Allure report', 'Send an offline copy of docs'],
  },

  'design.color-converter': {
    tagline: 'HEX, RGB, HSL, HSV, HWB and CMYK in sync.',
    features: ['HEX', 'RGB', 'HSL / HSV', 'HWB', 'CMYK'],
    useCases: ['Translate a brand colour for print', 'Convert design tokens'],
  },
  'design.color-picker': {
    tagline: 'Pick any colour on screen.',
    features: ['EyeDropper', 'Swatches', 'Copy HEX / RGB / HSL'],
    useCases: ['Match a colour from a screenshot', 'Sample a competitor’s palette'],
  },
  'design.palette-generator': {
    tagline: 'Harmonious palettes, checked for contrast and ready to export.',
    features: [
      'Eight harmonies',
      'Locks & regenerate',
      'OKLCH scales',
      'Contrast & colour vision',
      'Export & library',
    ],
    useCases: ['Start a theme from a logo colour', 'Generate Tailwind colour scales'],
  },
  'design.contrast-checker': {
    tagline: 'WCAG contrast, AA and AAA, instantly.',
    features: ['Contrast ratio', 'AA / AAA badges', 'Large text rules'],
    useCases: ['Validate button colours', 'Fix an accessibility audit finding'],
  },
  'design.font-inspector': {
    tagline: 'Hover any text to see its font.',
    features: ['Font family stack', 'Size & weight', 'Line height', 'Follows your cursor'],
    useCases: ['Identify a font on a landing page', 'Check type scale consistency'],
  },
  'design.responsive-viewer': {
    tagline: 'Load a page in device-labelled frames, side by side.',
    features: ['Device presets', 'Side-by-side frames', 'Any URL'],
    useCases: ['Preview a page in a narrow frame', 'Check whether a page allows framing'],
  },
  'design.svg-grabber': {
    tagline: 'Pull every inline SVG off a page.',
    features: ['SVG gallery', 'Copy SVG', 'Copy as JSX', 'SVG images listed too'],
    useCases: ['Reuse an icon from your own site', 'Inspect an illustration'],
  },
  'design.layout-wireframe': {
    tagline: 'Outline every element to debug layout.',
    features: ['Outline every element', 'One-click toggle', 'Hover highlight'],
    useCases: ['Find the element causing overflow', 'Visualise a grid'],
  },
  'design.css-generator': {
    tagline: 'UI styles, effects and layouts, as CSS, Tailwind or React.',
    features: [
      'Complete UI styles',
      'Animated effects',
      'Classic generators',
      'Motion & layout',
      'CSS, Tailwind or React',
      'Library & one stylesheet',
    ],
    useCases: [
      'Build a shimmer call-to-action button',
      'Try a design language before committing to it',
      'Collect a project’s effects into one stylesheet',
    ],
  },

  'security.encoder-decoder': {
    tagline: 'Base64, URL, HTML, Unicode and Hex both ways.',
    features: ['Base64', 'URL', 'HTML entities', 'Unicode escapes', 'Hex'],
    useCases: ['Decode a Base64 header', 'Escape HTML for a code sample'],
  },
  'security.hash-toolkit': {
    tagline: 'SHA, MD5 and HMAC computed locally.',
    features: ['SHA-1 / 256 / 384 / 512', 'MD5 (legacy)', 'HMAC', 'Web Crypto'],
    useCases: ['Check a digest in a test fixture', 'Sign a webhook payload'],
  },
  'security.jwt-toolkit': {
    tagline: 'Decode any JWT and see when it expires.',
    features: ['Header & payload', 'Expiry status', 'Claim warnings', 'Local only'],
    useCases: ['Debug an auth bug', 'Check which scopes a token has'],
  },
  'security.password-generator': {
    tagline: 'Cryptographically strong passwords.',
    features: ['Length 4 to 256', 'Character sets', 'Exclude look-alikes', 'Up to 50 at once'],
    useCases: ['Create a database password', 'Rotate a shared credential'],
  },
  'security.totp': {
    tagline: 'Two-factor codes without reaching for your phone.',
    features: ['TOTP codes', 'Multiple accounts', 'Countdown', 'Stored locally'],
    useCases: ['Log into staging accounts', 'Keep 2FA for test accounts in one place'],
  },
  'security.random-generator': {
    tagline: 'Random numbers, strings, hex and IDs.',
    features: ['Numbers in a range', 'Strings', 'Hex', 'UUID', 'NanoID'],
    useCases: ['Generate a secret key', 'Pick a random winner'],
  },

  'privacy.ad-blocker': {
    tagline: 'Fast MV3 ad and tracker blocking, YouTube included.',
    features: [
      'Filter lists via DNR',
      'Cosmetic hiding',
      'YouTube scripts',
      'Per-site allowlist',
      'Block stats',
    ],
    useCases: ['Browse without trackers', 'Whitelist a site you support'],
  },
  'privacy.web-protection': {
    tagline: 'Phishing, malware and scam blocking, on by default.',
    features: ['Threat lists', 'Login-page heuristics', 'Download guard', 'Trusted sites'],
    useCases: ['Stop a phishing link from a chat', 'Protect less technical family members'],
  },

  'sites.script-studio': {
    tagline: 'Install, write and run userscripts, and see what ran on each page.',
    features: [
      'Script gallery',
      'Install & update',
      'Code editor',
      'This page status',
      'Library & bulk actions',
    ],
    useCases: ['Make GitHub code use the full window', 'Send AI prompts with Ctrl+Enter only'],
  },
  'sites.youtube': {
    tagline: 'Hide the clutter and tune the player.',
    features: [
      'Hide Shorts & feeds',
      'Player tuning',
      'Custom progress bar',
      'SponsorBlock',
      'Presets',
    ],
    useCases: ['Focus on the video, not the recommendations', 'Skip sponsor segments'],
  },
  'sites.instagram': {
    tagline: 'Reels controls, downloads and private story viewing.',
    features: [
      'Reels player controls',
      'Media download',
      'Caption formatter',
      'Ghost story viewing',
    ],
    useCases: ['Save your own reels', 'Jump to the part of a reel you need'],
  },
  'sites.twitter': {
    tagline: 'Advanced search and a thread length meter for X.',
    features: ['Search operator builder', 'Thread counter', 'Date & media filters'],
    useCases: ['Find popular posts from an account', 'Plan a thread under the limit'],
  },
  'sites.linkedin': {
    tagline: 'Post previews, Unicode styling and a profile CSV row.',
    features: ['“See more” cutoff preview', 'Bold & italic Unicode', 'Profile CSV row'],
    useCases: ['Hook readers above the fold', 'Log a contact as a CSV row'],
  },
  'sites.whatsapp': {
    tagline: 'ChatBoost: privacy and business tools for WhatsApp Web.',
    features: ['Privacy blur', 'Business tools', 'Chat export', 'Broadcasting', 'Utilities'],
    useCases: ['Blur chats while screen sharing', 'Export a conversation'],
  },

  'calculators.calculator': {
    tagline: 'Scientific calculator with history — no eval.',
    features: ['Arithmetic', 'Scientific functions', 'History', 'Keyboard input'],
    useCases: ['Quick maths while reviewing a spec', 'Check a percentage'],
  },
  'calculators.unit-converter': {
    tagline: 'Length, weight, temperature, data and more.',
    features: [
      'Length, area & volume',
      'Weight',
      'Temperature',
      'Data: GB and GiB',
      'Speed & time',
      'Energy, power & more',
    ],
    useCases: [
      'Convert a recipe from cups to millilitres',
      'Check how many GiB a 500 GB drive holds',
    ],
  },
  'calculators.base-converter': {
    tagline: 'Binary, octal, decimal and hex with a bit view.',
    features: ['Binary', 'Octal', 'Decimal', 'Hex', 'Bit visualisation'],
    useCases: ['Decode a bit flag', 'Turn a hex error code into decimal'],
  },

  'datetime.toolkit': {
    tagline: 'Timestamps, date maths, time zones and cron.',
    features: ['Unix ↔ date', 'Now in ms', 'Date difference', 'Time zones', 'Cron explainer'],
    useCases: ['Read an epoch from a log', 'Schedule a meeting across zones'],
  },

  'screenshots.capture': {
    tagline: 'Capture and annotate without leaving the tab.',
    features: [
      'Visible, full, selection, element',
      'All tabs',
      'Shapes & arrows',
      'Blur sensitive data',
      'History',
    ],
    useCases: ['Explain a bug visually', 'Redact data before sharing'],
  },
  'screenshots.recorder': {
    tagline: 'Record a tab, window or screen with audio.',
    features: ['Tab, window or screen', 'Mic & tab audio', 'WebM / MP4', 'Local save'],
    useCases: ['Record a bug repro', 'Make a quick product walkthrough'],
  },

  'image.save-as-type': {
    tagline: 'Right-click any image and save it as JPG, PNG, WebP, GIF or PDF.',
    features: ['JPG', 'PNG', 'WebP', 'GIF', 'PDF', 'Local conversion'],
    useCases: ['Save a WebP as PNG for an old app', 'Turn an image into a PDF'],
  },
  'image.image-toolkit': {
    tagline: 'Resize, crop, convert and inspect images locally.',
    features: ['Resize', 'Crop', 'Convert', 'Base64', 'Info'],
    useCases: ['Shrink a screenshot for a ticket', 'Inline a tiny icon as Base64'],
  },
  'image.image-downloader': {
    tagline: 'Download every image on a page in one go.',
    features: ['Size filters', 'URL filters', 'Name templates', 'Batch download'],
    useCases: ['Collect assets for a mood board', 'Back up your own gallery'],
  },

  'files.file-toolkit': {
    tagline: 'Convert, write, combine, archive, inspect and view files on your device.',
    features: ['Bulk convert', 'Text to document', 'Images → PDF', 'ZIP & GZIP', 'Inspect', 'View'],
    useCases: ['Open a CSV without a spreadsheet app', 'Merge scans into one PDF'],
  },
  'files.pdf-toolkit': {
    tagline: '34 PDF tools that never upload your files.',
    features: [
      'Organize',
      'Optimize',
      'Convert to PDF',
      'Convert from PDF',
      'Edit',
      'Security',
      'On-device AI',
    ],
    useCases: [
      'Merge a contract with its signed page',
      'Black out an account number before sharing',
      'Password-protect a payslip',
    ],
  },

  'generators.qr-toolkit': {
    tagline: 'Generate and decode QR codes.',
    features: ['Nine content types', 'Wi-Fi', 'Contacts & events', 'Design', 'Decode from image'],
    useCases: ['Share Wi-Fi with guests', 'Read a QR from a screenshot'],
  },

  'seo.toolkit': {
    tagline: 'A full on-page SEO audit in your side panel.',
    features: [
      'Overview score',
      'Content & headings',
      'Links & images',
      'Schema',
      'Social',
      'PageSpeed',
      'Issues list',
    ],
    useCases: ['Audit a page before launch', 'Find missing structured data'],
  },

  'productivity.notes': {
    tagline: 'A notepad that lives next to every tab.',
    features: [
      'Formatting toolbar',
      'Checklists',
      'Colours',
      'Find & replace',
      'Export TXT, MD, HTML, Word, PDF',
    ],
    useCases: ['Keep meeting notes beside the agenda', 'Draft a reply while reading a thread'],
  },
  'productivity.timer': {
    tagline: 'Countdown, stopwatch and Pomodoro that keep running.',
    features: ['Countdown', 'Stopwatch', 'Pomodoro', 'Runs when the panel is closed'],
    useCases: ['Time-box a task', 'Run focus sprints'],
  },
  'productivity.tab-manager': {
    tagline: 'Find, group and tame your tabs.',
    features: ['Search tabs', 'Group & pin', 'Mute & sleep', 'Close duplicates', 'Export URLs'],
    useCases: ['Close every duplicate docs tab at once', 'Save a research session as a list'],
  },
  'productivity.form-autofill': {
    tagline: 'Fill long forms from answers you saved once.',
    features: [
      'Saved profiles',
      'Review before filling',
      'Portal adapters',
      'Skips passwords, OTP & payment',
    ],
    useCases: ['Speed through job applications', 'Re-test a signup flow'],
  },

  'browser.picture-in-picture': {
    tagline: 'Float any video above your work.',
    features: ['Alt + P shortcut', 'Right-click to float', 'Auto PiP'],
    useCases: ['Watch a talk while coding', 'Keep a stream in view'],
  },
  'browser.internet-monitor': {
    tagline: 'Know the moment your connection drops.',
    features: ['Live status', 'Latency graph', 'Disconnect log', 'Stats'],
    useCases: ['Prove flaky Wi-Fi to your ISP', 'Watch latency during a call'],
  },
  'browser.speed-test': {
    tagline: 'Download, upload, ping and jitter — with history.',
    features: ['Download & upload', 'Ping & jitter', 'Gauge', 'History'],
    useCases: ['Check a café connection', 'Compare networks over time'],
  },
  'browser.toolkit': {
    tagline: 'Every browser quick action in one place.',
    features: [
      'Copy URL, title, Markdown',
      'Hard reload',
      'Pin & mute',
      'Zoom',
      'Edit page text',
      'Print',
    ],
    useCases: ['Copy every tab URL in this window', 'Edit page text live for a mock-up'],
  },

  'storage.inspector': {
    tagline: 'See what a page keeps in localStorage and sessionStorage.',
    features: ['localStorage', 'sessionStorage', 'Key & value view', 'Copy values'],
    useCases: ['Check which feature flags are set', 'Inspect what a site stores about you'],
  },

  'accessibility.toolkit': {
    tagline: 'A quick accessibility check for any page.',
    features: [
      'Missing alt text',
      'Heading order',
      'Link names',
      'Page language',
      'Contrast link-out',
    ],
    useCases: ['Catch obvious issues before an audit', 'Teach a team the basics'],
  },
}
