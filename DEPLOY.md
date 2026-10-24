# Deploy One Panel website (Cloudflare Pages)

Static export: `npm run build` writes to `out/`.

## GitHub (recommended)

1. In [Cloudflare Dashboard](https://dash.cloudflare.com) → **Workers & Pages** → **Create** → **Pages** → **Connect to Git** → `browser-toolbox-website`.
2. Build settings:
   - **Build command:** `npm run build`
   - **Build output directory:** `out`
   - **Node version:** 22
3. Environment variables:
   - `NEXT_PUBLIC_SITE_URL` — e.g. `https://onepanel.quickcalci.com`
   - `NEXT_PUBLIC_CHROME_STORE_URL` — your Chrome Web Store listing URL
4. For CI deploys via `.github/workflows/cloudflare-pages.yml`, add repository secrets:
   - `CLOUDFLARE_API_TOKEN` (Pages Edit)
   - `CLOUDFLARE_ACCOUNT_ID`
   Optional repository variables: same `NEXT_PUBLIC_*` as above.

## Custom domain (quickcalci.com)

1. Pages project → **Custom domains** → add `onepanel.quickcalci.com` (or your chosen subdomain).
2. If `quickcalci.com` is on the same Cloudflare account, DNS is usually added automatically; otherwise create the CNAME Cloudflare shows.

## Manual CLI

```bash
npm ci
npm run build
npx wrangler login
npx wrangler pages deploy out --project-name=one-panel
```

`postbuild` runs `scripts/flatten-segments.mjs` (Windows static-export segment fix).
