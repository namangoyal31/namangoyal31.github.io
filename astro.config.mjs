import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

// Deployed as the GitHub user site: https://namangoyal31.github.io
// If you ever move this to a project site (repo other than namangoyal31.github.io),
// set `base: '/<repo-name>'` here and update `site` accordingly.
export default defineConfig({
  site: 'https://namangoyal31.github.io',
  integrations: [sitemap()],
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
  },
});
