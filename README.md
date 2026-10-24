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

## Cloudflare Pages

Create a **Pages** project (not Workers) with these settings:

| Setting | Value |
|--------|--------|
| **Project name** | `browser-toolbox-website` |
| **Production branch** | `main` |
| **Framework preset** | None |
| **Build command** | `npm run build` |
| **Build output directory** | `out` |
| **Root directory** | `/` (repository root) |
| **Node.js version** | `20` (or use the repo `.nvmrc`) |

**Environment variables** (Production and Preview):

- `NEXT_PUBLIC_SITE_URL` — your public URL, e.g. `https://toolbox.quickcalci.com` (no trailing slash)
- `NEXT_PUBLIC_CHROME_STORE_URL` — Chrome Web Store listing URL when ready

**Custom domain (e.g. on quickcalci.com):** In the Pages project → **Custom domains** → add something like `toolbox.quickcalci.com`. If `quickcalci.com` is on the same Cloudflare account, DNS is usually added automatically; otherwise create the CNAME record Cloudflare shows.

The `postbuild` step flattens Next.js segment files for prefetch on Windows; on Linux it is a no-op. Committed `src/data/tools.generated.json` is used when the extension repo is not present (CI/Pages).
