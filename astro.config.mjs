// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
const githubPagesBase = process.env.GITHUB_PAGES_BASE_PATH;
const hasExplicitBaseOverride = githubPagesBase !== undefined;
const normalizedOverride = hasExplicitBaseOverride
  ? (githubPagesBase || '').trim().replace(/^\/+|\/+$/g, '')
  : '';

const repositoryBase = process.env.GITHUB_REPOSITORY
  ? process.env.GITHUB_REPOSITORY.split('/').pop()
  : '';

const effectiveBase = hasExplicitBaseOverride
  ? normalizedOverride
  : repositoryBase || '';
const siteUrl = process.env.SITE_URL || 'https://provenancemanifesto.org';

const normalizedBase = effectiveBase
  ? `/${effectiveBase.replace(/^\/+|\/+$/g, '')}/`
  : '/';

export default defineConfig({
  site: siteUrl,
  base: normalizedBase,
  vite: {
    plugins: [tailwindcss()]
  }
});
