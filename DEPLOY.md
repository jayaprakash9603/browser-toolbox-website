# Deploy One Panel website (Cloudflare)

Static export: `npm run build` writes to `out/`.

## Option A — Cloudflare Pages (recommended)

1. [Cloudflare Dashboard](https://dash.cloudflare.com) → **Workers & Pages** → **Create** → **Pages** → **Connect to Git** → `browser-toolbox-website`.
2. **Build settings** (important):
   | Setting | Value |
   |---------|--------|
   | Framework preset | None |
   | Build command | `npm run build` |
   | Build output directory | `out` |
   | Root directory | *(empty)* |
   | **Deploy command** | **Leave empty** |
3. Environment variables (Production + Preview):
   - `NODE_VERSION` = `22` (or use `.node-version`)
   - `NEXT_PUBLIC_SITE_URL` — e.g. `https://onepanel.quickcalci.com`
   - `NEXT_PUBLIC_CHROME_STORE_URL` — your Chrome Web Store URL when ready

Cloudflare uploads `out/` automatically after a successful build. **Do not set the deploy command to `npx wrangler deploy`** — that causes the “Missing entry-point” / Pages warning you saw.

### Custom domain (quickcalci.com)

Pages project → **Custom domains** → add `onepanel.quickcalci.com`. If `quickcalci.com` is on the same account, DNS is usually added for you.

## Option B — Workers Builds (`wrangler deploy`)

Only if the project is a **Worker** (not Pages) and the dashboard **Deploy command** is:

```bash
npx wrangler deploy
```

Then the build command should be `npm run build` only. This repo’s `wrangler.toml` sets `[assets] directory = "./out"` so `wrangler deploy` can publish the static files.

If you see: *“run wrangler deploy on a Pages project, use wrangler pages deploy”* — you are on **Pages**; use **Option A** (empty deploy command) or Option C.

## Option C — CLI / GitHub Actions

```bash
npm ci
npm run build
npx wrangler pages deploy out --project-name=one-panel
```

GitHub: `.github/workflows/cloudflare-pages.yml` uses `pages deploy` (not `wrangler deploy`). Add secrets `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`.

`postbuild` runs `scripts/flatten-segments.mjs` (Windows static-export segment fix; safe on Linux).
