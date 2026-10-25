// Mirrors manifest.config.ts in the extension; update both together.
export interface PermissionEntry {
  name: string
  kind: 'required' | 'optional' | 'host'
  why: string
}

export interface PermissionGroup {
  id: string
  title: string
  summary: string
  permissions: PermissionEntry[]
}

export const PERMISSION_GROUPS: PermissionGroup[] = [
  {
    id: 'core',
    title: 'Core',
    summary: 'What the side panel, menus and page tools need to exist at all.',
    permissions: [
      {
        name: 'sidePanel',
        kind: 'required',
        why: 'The side panel is the main interface of the extension.',
      },
      {
        name: 'storage',
        kind: 'required',
        why: 'Settings, favourites, recent tools, notes and history persist in chrome.storage.local. Short-lived handoffs such as element-picker results use chrome.storage.session and expire within five minutes.',
      },
      {
        name: 'contextMenus',
        kind: 'required',
        why: 'Adds the right-click One Panel menu that opens tools with the current selection, link, image or page.',
      },
      {
        name: 'activeTab',
        kind: 'required',
        why: 'Lets the element picker and page tools run on the tab you are interacting with, after a click or keyboard command.',
      },
      {
        name: 'scripting',
        kind: 'required',
        why: 'Injects the page-tools helper and the form autofill runtime on demand, and registers ad-blocking and protection scripts while those features are on.',
      },
      {
        name: 'tabs',
        kind: 'required',
        why: 'Reads the active tab’s URL and title, and powers Tab Manager and Browser Toolkit actions.',
      },
    ],
  },
  {
    id: 'clipboard',
    title: 'Clipboard',
    summary: 'Read and write the clipboard, only when you act.',
    permissions: [
      {
        name: 'clipboardRead',
        kind: 'required',
        why: 'Clipboard tools read the current text when you press a button, paste or focus the panel, plus optional “Analyze clipboard” suggestions. History stays on the device and can be disabled or wiped in Settings.',
      },
      {
        name: 'clipboardWrite',
        kind: 'required',
        why: 'Copy buttons write results back to the clipboard.',
      },
    ],
  },
  {
    id: 'capture',
    title: 'Capture and files',
    summary: 'Screenshots, recordings and anything you save to disk.',
    permissions: [
      {
        name: 'downloads',
        kind: 'required',
        why: 'Saves screenshots, converted images, page bundles and exports. The download guard can also cancel files from known threat hosts and pause executables that start without a click.',
      },
      {
        name: 'offscreen',
        kind: 'required',
        why: 'Runs an offscreen document for work a service worker cannot do, such as handling recording streams, blobs and audio playback.',
      },
      { name: 'tabCapture', kind: 'required', why: 'Lets Screen Recorder record the current tab.' },
      {
        name: 'desktopCapture',
        kind: 'required',
        why: 'Lets Screen Recorder record a window or screen you pick in Chrome’s own chooser.',
      },
    ],
  },
  {
    id: 'network',
    title: 'Network and blocking',
    summary: 'Blocking ads and threats, and observing traffic for developer tools.',
    permissions: [
      {
        name: 'declarativeNetRequest',
        kind: 'required',
        why: 'Applies bundled filter rules to block ads, trackers and known phishing or malware hosts. Lists ship inside the extension; nothing is downloaded at runtime.',
      },
      {
        name: 'declarativeNetRequestFeedback',
        kind: 'required',
        why: 'Shows per-tab blocked-request counts on the badge and in the Ad Blocker tool.',
      },
      {
        name: 'webRequest',
        kind: 'required',
        why: 'Observes (never blocks) requests for the HTTP Interceptor network log.',
      },
      {
        name: 'webNavigation',
        kind: 'required',
        why: 'Lets Redirect Tracer follow each navigation hop, and lets web protection check tabs that pages open on their own.',
      },
    ],
  },
  {
    id: 'background',
    title: 'Background',
    summary: 'Waking up on schedule and telling you when something finishes.',
    permissions: [
      {
        name: 'alarms',
        kind: 'required',
        why: 'Wakes the background worker for timers, the internet monitor and scheduled site actions.',
      },
      {
        name: 'notifications',
        kind: 'required',
        why: 'Shows system notifications when a timer ends or a recording or image has been saved.',
      },
    ],
  },
  {
    id: 'optional',
    title: 'Optional',
    summary: 'Not granted at install. Chrome asks only when you turn the feature on.',
    permissions: [
      {
        name: 'userScripts',
        kind: 'optional',
        why: 'Registers HTTP Interceptor “Insert script” rules when you enable user scripts in its settings.',
      },
      {
        name: 'debugger',
        kind: 'optional',
        why: 'Deep intercept attaches to a tab only when you switch it on. Chrome shows its debugging banner while it is attached.',
      },
    ],
  },
  {
    id: 'hosts',
    title: 'Site access',
    summary: 'Why the extension can run on the sites you visit.',
    permissions: [
      {
        name: '<all_urls>',
        kind: 'host',
        why: 'Ad blocking, web protection and site enhancements need to run on the pages you browse, and network tools need to reach the hosts you point them at. Page tools are still injected only when you start them.',
      },
    ],
  },
]

export const NOT_REQUESTED = [
  'cookies',
  'history',
  'bookmarks',
  'sessions',
  'identity',
  'geolocation',
]

export const PERMISSION_COUNT = PERMISSION_GROUPS.reduce(
  (total, group) => total + group.permissions.length,
  0,
)
