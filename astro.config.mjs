// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
const githubPagesBase = process.env.GITHUB_PAGES_BASE_PATH || '';
const repositoryBase = process.env.GITHUB_REPOSITORY
  ? process.env.GITHUB_REPOSITORY.split('/').pop()
  : '';
const effectiveBase = githubPagesBase || repositoryBase || '';

const normalizedBase = effectiveBase
  ? `/${effectiveBase.replace(/^\/+|\/+$/g, '')}/`
  : '/';

export default defineConfig({
  base: normalizedBase,
  vite: {
    plugins: [tailwindcss()]
  }
});
