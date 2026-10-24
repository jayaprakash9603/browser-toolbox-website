import { fileURLToPath } from 'node:url'

import type { NextConfig } from 'next'

const websiteRoot = fileURLToPath(new URL('.', import.meta.url))

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
  // The parent extension repo has its own lockfiles; pin the root so Next does not climb into it.
  outputFileTracingRoot: websiteRoot,
  turbopack: { root: websiteRoot },
}

export default nextConfig
