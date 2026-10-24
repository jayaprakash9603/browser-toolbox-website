# One Panel website

Marketing site for the **One Panel** Chrome extension: Next.js static export, motion landing page, and per-tool routes synced from the extension registries.

## Commands

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # exports to out/
npm run preview  # serves out/ (default port 4321)
```

Set `NEXT_PUBLIC_CHROME_STORE_URL` and `NEXT_PUBLIC_SITE_URL` before deploying (default site URL in code: `https://onepanel.quickcalci.com`).

See [DEPLOY.md](./DEPLOY.md) for Cloudflare Pages (GitHub Actions or `npm run deploy:pages`).
