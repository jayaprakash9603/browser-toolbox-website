'use client'

import dynamic from 'next/dynamic'
import type { ComponentType } from 'react'

import type { StoryProps } from '@/components/tool/story'
import type { ToolId } from '@/data/toolIds.generated'

export interface ToolPageEntry {
  Demo: ComponentType
  Story: ComponentType<StoryProps>
}

// Literal imports so each tool's demo and story become their own chunks.
export const TOOL_PAGES: Record<ToolId, ToolPageEntry> = {
  'developer.json-toolkit': {
    Demo: dynamic(() => import('./developer/json-toolkit/Demo')),
    Story: dynamic(() => import('./developer/json-toolkit/Story')),
  },
  'screenshots.capture': {
    Demo: dynamic(() => import('./screenshots/capture/Demo')),
    Story: dynamic(() => import('./screenshots/capture/Story')),
  },
  'design.color-picker': {
    Demo: dynamic(() => import('./design/color-picker/Demo')),
    Story: dynamic(() => import('./design/color-picker/Story')),
  },
  'privacy.ad-blocker': {
    Demo: dynamic(() => import('./privacy/ad-blocker/Demo')),
    Story: dynamic(() => import('./privacy/ad-blocker/Story')),
  },
  'privacy.web-protection': {
    Demo: dynamic(() => import('./privacy/web-protection/Demo')),
    Story: dynamic(() => import('./privacy/web-protection/Story')),
  },
  'security.encoder-decoder': {
    Demo: dynamic(() => import('./security/encoder-decoder/Demo')),
    Story: dynamic(() => import('./security/encoder-decoder/Story')),
  },
  'security.hash-toolkit': {
    Demo: dynamic(() => import('./security/hash-toolkit/Demo')),
    Story: dynamic(() => import('./security/hash-toolkit/Story')),
  },
  'security.jwt-toolkit': {
    Demo: dynamic(() => import('./security/jwt-toolkit/Demo')),
    Story: dynamic(() => import('./security/jwt-toolkit/Story')),
  },
  'security.password-generator': {
    Demo: dynamic(() => import('./security/password-generator/Demo')),
    Story: dynamic(() => import('./security/password-generator/Story')),
  },
  'security.totp': {
    Demo: dynamic(() => import('./security/totp/Demo')),
    Story: dynamic(() => import('./security/totp/Story')),
  },
  'security.random-generator': {
    Demo: dynamic(() => import('./security/random-generator/Demo')),
    Story: dynamic(() => import('./security/random-generator/Story')),
  },
  'sites.youtube': {
    Demo: dynamic(() => import('./sites/youtube/Demo')),
    Story: dynamic(() => import('./sites/youtube/Story')),
  },
  'sites.instagram': {
    Demo: dynamic(() => import('./sites/instagram/Demo')),
    Story: dynamic(() => import('./sites/instagram/Story')),
  },
  'sites.twitter': {
    Demo: dynamic(() => import('./sites/twitter/Demo')),
    Story: dynamic(() => import('./sites/twitter/Story')),
  },
  'sites.linkedin': {
    Demo: dynamic(() => import('./sites/linkedin/Demo')),
    Story: dynamic(() => import('./sites/linkedin/Story')),
  },
  'sites.whatsapp': {
    Demo: dynamic(() => import('./sites/whatsapp/Demo')),
    Story: dynamic(() => import('./sites/whatsapp/Story')),
  },
  'screenshots.recorder': {
    Demo: dynamic(() => import('./screenshots/recorder/Demo')),
    Story: dynamic(() => import('./screenshots/recorder/Story')),
  },
  'image.save-as-type': {
    Demo: dynamic(() => import('./image/save-as-type/Demo')),
    Story: dynamic(() => import('./image/save-as-type/Story')),
  },
  'image.image-toolkit': {
    Demo: dynamic(() => import('./image/image-toolkit/Demo')),
    Story: dynamic(() => import('./image/image-toolkit/Story')),
  },
  'image.image-downloader': {
    Demo: dynamic(() => import('./image/image-downloader/Demo')),
    Story: dynamic(() => import('./image/image-downloader/Story')),
  },
  'files.file-toolkit': {
    Demo: dynamic(() => import('./files/file-toolkit/Demo')),
    Story: dynamic(() => import('./files/file-toolkit/Story')),
  },
  'calculators.calculator': {
    Demo: dynamic(() => import('./calculators/calculator/Demo')),
    Story: dynamic(() => import('./calculators/calculator/Story')),
  },
  'calculators.unit-converter': {
    Demo: dynamic(() => import('./calculators/unit-converter/Demo')),
    Story: dynamic(() => import('./calculators/unit-converter/Story')),
  },
  'calculators.base-converter': {
    Demo: dynamic(() => import('./calculators/base-converter/Demo')),
    Story: dynamic(() => import('./calculators/base-converter/Story')),
  },
  'datetime.toolkit': {
    Demo: dynamic(() => import('./datetime/toolkit/Demo')),
    Story: dynamic(() => import('./datetime/toolkit/Story')),
  },
  'generators.qr-toolkit': {
    Demo: dynamic(() => import('./generators/qr-toolkit/Demo')),
    Story: dynamic(() => import('./generators/qr-toolkit/Story')),
  },
  'seo.toolkit': {
    Demo: dynamic(() => import('./seo/toolkit/Demo')),
    Story: dynamic(() => import('./seo/toolkit/Story')),
  },
  'productivity.notes': {
    Demo: dynamic(() => import('./productivity/notes/Demo')),
    Story: dynamic(() => import('./productivity/notes/Story')),
  },
  'productivity.timer': {
    Demo: dynamic(() => import('./productivity/timer/Demo')),
    Story: dynamic(() => import('./productivity/timer/Story')),
  },
  'productivity.tab-manager': {
    Demo: dynamic(() => import('./productivity/tab-manager/Demo')),
    Story: dynamic(() => import('./productivity/tab-manager/Story')),
  },
  'productivity.form-autofill': {
    Demo: dynamic(() => import('./productivity/form-autofill/Demo')),
    Story: dynamic(() => import('./productivity/form-autofill/Story')),
  },
  'browser.picture-in-picture': {
    Demo: dynamic(() => import('./browser/picture-in-picture/Demo')),
    Story: dynamic(() => import('./browser/picture-in-picture/Story')),
  },
  'browser.internet-monitor': {
    Demo: dynamic(() => import('./browser/internet-monitor/Demo')),
    Story: dynamic(() => import('./browser/internet-monitor/Story')),
  },
  'browser.speed-test': {
    Demo: dynamic(() => import('./browser/speed-test/Demo')),
    Story: dynamic(() => import('./browser/speed-test/Story')),
  },
  'browser.toolkit': {
    Demo: dynamic(() => import('./browser/toolkit/Demo')),
    Story: dynamic(() => import('./browser/toolkit/Story')),
  },
  'storage.inspector': {
    Demo: dynamic(() => import('./storage/inspector/Demo')),
    Story: dynamic(() => import('./storage/inspector/Story')),
  },
  'sites.script-studio': {
    Demo: dynamic(() => import('./sites/script-studio/Demo')),
    Story: dynamic(() => import('./sites/script-studio/Story')),
  },
  'files.pdf-toolkit': {
    Demo: dynamic(() => import('./files/pdf-toolkit/Demo')),
    Story: dynamic(() => import('./files/pdf-toolkit/Story')),
  },
  'accessibility.toolkit': {
    Demo: dynamic(() => import('./accessibility/toolkit/Demo')),
    Story: dynamic(() => import('./accessibility/toolkit/Story')),
  },
  'api.request-builder': {
    Demo: dynamic(() => import('./api/request-builder/Demo')),
    Story: dynamic(() => import('./api/request-builder/Story')),
  },
  'text.case-converter': {
    Demo: dynamic(() => import('./text/case-converter/Demo')),
    Story: dynamic(() => import('./text/case-converter/Story')),
  },
  'clipboard.manager': {
    Demo: dynamic(() => import('./clipboard/manager/Demo')),
    Story: dynamic(() => import('./clipboard/manager/Story')),
  },
  'text.formatter': {
    Demo: dynamic(() => import('./text/formatter/Demo')),
    Story: dynamic(() => import('./text/formatter/Story')),
  },
  'text.whitespace-cleaner': {
    Demo: dynamic(() => import('./text/whitespace-cleaner/Demo')),
    Story: dynamic(() => import('./text/whitespace-cleaner/Story')),
  },
  'text.analyzer': {
    Demo: dynamic(() => import('./text/analyzer/Demo')),
    Story: dynamic(() => import('./text/analyzer/Story')),
  },
  'text.line-tools': {
    Demo: dynamic(() => import('./text/line-tools/Demo')),
    Story: dynamic(() => import('./text/line-tools/Story')),
  },
  'text.find-replace': {
    Demo: dynamic(() => import('./text/find-replace/Demo')),
    Story: dynamic(() => import('./text/find-replace/Story')),
  },
  'text.diff': {
    Demo: dynamic(() => import('./text/diff/Demo')),
    Story: dynamic(() => import('./text/diff/Story')),
  },
  'text.read-aloud': {
    Demo: dynamic(() => import('./text/read-aloud/Demo')),
    Story: dynamic(() => import('./text/read-aloud/Story')),
  },
  'text.dummy-data': {
    Demo: dynamic(() => import('./text/dummy-data/Demo')),
    Story: dynamic(() => import('./text/dummy-data/Story')),
  },
  'developer.react-devtools': {
    Demo: dynamic(() => import('./developer/react-devtools/Demo')),
    Story: dynamic(() => import('./developer/react-devtools/Story')),
  },
  'developer.xml-toolkit': {
    Demo: dynamic(() => import('./developer/xml-toolkit/Demo')),
    Story: dynamic(() => import('./developer/xml-toolkit/Story')),
  },
  'developer.yaml-toolkit': {
    Demo: dynamic(() => import('./developer/yaml-toolkit/Demo')),
    Story: dynamic(() => import('./developer/yaml-toolkit/Story')),
  },
  'developer.sql-toolkit': {
    Demo: dynamic(() => import('./developer/sql-toolkit/Demo')),
    Story: dynamic(() => import('./developer/sql-toolkit/Story')),
  },
  'developer.regex-toolkit': {
    Demo: dynamic(() => import('./developer/regex-toolkit/Demo')),
    Story: dynamic(() => import('./developer/regex-toolkit/Story')),
  },
  'developer.id-toolkit': {
    Demo: dynamic(() => import('./developer/id-toolkit/Demo')),
    Story: dynamic(() => import('./developer/id-toolkit/Story')),
  },
  'api.http-interceptor': {
    Demo: dynamic(() => import('./api/http-interceptor/Demo')),
    Story: dynamic(() => import('./api/http-interceptor/Story')),
  },
  'qa.element-inspector': {
    Demo: dynamic(() => import('./qa/element-inspector/Demo')),
    Story: dynamic(() => import('./qa/element-inspector/Story')),
  },
  'qa.selector-generator': {
    Demo: dynamic(() => import('./qa/selector-generator/Demo')),
    Story: dynamic(() => import('./qa/selector-generator/Story')),
  },
  'qa.xpath-tester': {
    Demo: dynamic(() => import('./qa/xpath-tester/Demo')),
    Story: dynamic(() => import('./qa/xpath-tester/Story')),
  },
  'qa.test-data-generator': {
    Demo: dynamic(() => import('./qa/test-data-generator/Demo')),
    Story: dynamic(() => import('./qa/test-data-generator/Story')),
  },
  'qa.http-status': {
    Demo: dynamic(() => import('./qa/http-status/Demo')),
    Story: dynamic(() => import('./qa/http-status/Story')),
  },
  'qa.bug-reporter': {
    Demo: dynamic(() => import('./qa/bug-reporter/Demo')),
    Story: dynamic(() => import('./qa/bug-reporter/Story')),
  },
  'data.universal-converter': {
    Demo: dynamic(() => import('./data/universal-converter/Demo')),
    Story: dynamic(() => import('./data/universal-converter/Story')),
  },
  'data.data-scraper': {
    Demo: dynamic(() => import('./data/data-scraper/Demo')),
    Story: dynamic(() => import('./data/data-scraper/Story')),
  },
  'design.color-converter': {
    Demo: dynamic(() => import('./design/color-converter/Demo')),
    Story: dynamic(() => import('./design/color-converter/Story')),
  },
  'design.palette-generator': {
    Demo: dynamic(() => import('./design/palette-generator/Demo')),
    Story: dynamic(() => import('./design/palette-generator/Story')),
  },
  'design.contrast-checker': {
    Demo: dynamic(() => import('./design/contrast-checker/Demo')),
    Story: dynamic(() => import('./design/contrast-checker/Story')),
  },
  'design.font-inspector': {
    Demo: dynamic(() => import('./design/font-inspector/Demo')),
    Story: dynamic(() => import('./design/font-inspector/Story')),
  },
  'design.responsive-viewer': {
    Demo: dynamic(() => import('./design/responsive-viewer/Demo')),
    Story: dynamic(() => import('./design/responsive-viewer/Story')),
  },
  'design.svg-grabber': {
    Demo: dynamic(() => import('./design/svg-grabber/Demo')),
    Story: dynamic(() => import('./design/svg-grabber/Story')),
  },
  'design.layout-wireframe': {
    Demo: dynamic(() => import('./design/layout-wireframe/Demo')),
    Story: dynamic(() => import('./design/layout-wireframe/Story')),
  },
  'design.css-generator': {
    Demo: dynamic(() => import('./design/css-generator/Demo')),
    Story: dynamic(() => import('./design/css-generator/Story')),
  },
  'web.url-toolkit': {
    Demo: dynamic(() => import('./web/url-toolkit/Demo')),
    Story: dynamic(() => import('./web/url-toolkit/Story')),
  },
  'web.link-toolkit': {
    Demo: dynamic(() => import('./web/link-toolkit/Demo')),
    Story: dynamic(() => import('./web/link-toolkit/Story')),
  },
  'web.image-links': {
    Demo: dynamic(() => import('./web/image-links/Demo')),
    Story: dynamic(() => import('./web/image-links/Story')),
  },
  'web.page-info': {
    Demo: dynamic(() => import('./web/page-info/Demo')),
    Story: dynamic(() => import('./web/page-info/Story')),
  },
  'web.tech-stack': {
    Demo: dynamic(() => import('./web/tech-stack/Demo')),
    Story: dynamic(() => import('./web/tech-stack/Story')),
  },
  'web.redirect-tracer': {
    Demo: dynamic(() => import('./web/redirect-tracer/Demo')),
    Story: dynamic(() => import('./web/redirect-tracer/Story')),
  },
  'web.link-checker': {
    Demo: dynamic(() => import('./web/link-checker/Demo')),
    Story: dynamic(() => import('./web/link-checker/Story')),
  },
  'web.utm-builder': {
    Demo: dynamic(() => import('./web/utm-builder/Demo')),
    Story: dynamic(() => import('./web/utm-builder/Story')),
  },
  'web.copy-markdown': {
    Demo: dynamic(() => import('./web/copy-markdown/Demo')),
    Story: dynamic(() => import('./web/copy-markdown/Story')),
  },
  'web.html-bundle': {
    Demo: dynamic(() => import('./web/html-bundle/Demo')),
    Story: dynamic(() => import('./web/html-bundle/Story')),
  },
}
