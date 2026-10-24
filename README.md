# browser-toolbox-website

Marketing site for the Browser Toolbox Chrome extension: Next.js static export, motion landing page, and per-tool routes synced from the extension registries.

## Commands

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # exports to out/
npm run preview  # serves out/ (default port 4321)
```

Set `NEXT_PUBLIC_CHROME_STORE_URL` and `NEXT_PUBLIC_SITE_URL` before deploying.
