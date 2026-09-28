# Project architecture

A static Astro 5 site. Astro compiles `.astro` pages (HTML templates with a small
frontmatter script) into plain HTML in `dist/`. There is no client framework, no SPA
router, and no server. The site ships six HTML pages plus static assets.

```text
Naman-Goyal-Website/
├── src/
│   ├── pages/            one file per URL, compiled to HTML
│   │   ├── index.astro       homepage (hero + canvas visual + sections)
│   │   ├── research.astro    research narrative, timeline, projects
│   │   ├── smvac.astro       SMVac project page (mini research/software paper)
│   │   ├── publications.astro
│   │   ├── cv.astro
│   │   ├── about.astro
│   │   └── 404.astro
│   ├── layouts/
│   │   └── Base.astro        <head>, SEO/OG/JSON-LD, nav, footer, theme + menu JS
│   ├── components/
│   │   ├── Math.astro        server-side KaTeX rendering (inline / block)
│   │   ├── Figure.astro      white panel + caption for scientific figures
│   │   ├── Timeline.astro    chronology list
│   │   └── PubCard.astro     publication card (compact / full modes)
│   ├── data/                 structured content (edit these, not the pages)
│   │   ├── site.ts           identity, links, canonical URL, profiles
│   │   ├── publications.ts   publication records
│   │   ├── projects.ts       research projects
│   │   └── timeline.ts       chronology entries
│   ├── lib/
│   │   ├── amp-field.js      homepage canvas visual (see docs/ANIMATION.md)
│   │   └── rich.ts           renders data-file text (math/links/bold) to HTML
│   └── styles/
│       └── global.css        design tokens + all component styles
├── public/                   copied verbatim into dist/
│   ├── figures/              SMVac figures (unmodified pipeline outputs)
│   ├── cv/Naman_Goyal_CV.pdf
│   ├── og-image.png          1200x630 social preview
│   ├── favicon.svg
│   └── robots.txt
├── docs/                     this documentation set
├── astro.config.mjs          site URL, sitemap, KaTeX markdown pipeline
└── .github/workflows/deploy.yml   build + deploy on push to main
```

## Data flow

Pages import the typed modules in `src/data/`. Card text and project bodies are plain
strings; `src/lib/rich.ts` converts `$...$` math, `[text](href)` links, and `**bold**`
to HTML at build time. Adding a publication or project is a data edit; pages pick it up
on the next build.

## Build-time choices worth knowing

- **KaTeX at build time.** `remark-math` + `rehype-katex` (see `astro.config.mjs`) run
  in the markdown pipeline, and the `Math.astro` component calls KaTeX directly for
  template math. No math library ships to the browser; only KaTeX fonts/CSS.
- **Fonts.** Source Serif 4 (text), Inter (UI labels), JetBrains Mono (code), all
  self-hosted via Fontsource imports in `Base.astro`.
- **Theming.** The site is dark-only by design: CSS custom properties on
  `:root` describe the near-black ground and the single yellow accent. There is
  no theme toggle. The homepage canvas reads its colors from the same tokens.
- **SEO.** Per-page title/description props, canonical URLs derived from `site` in
  `astro.config.mjs`, Open Graph/Twitter tags, JSON-LD (Person, ProfilePage,
  ScholarlyArticle, SoftwareSourceCode), sitemap via `@astrojs/sitemap`, `robots.txt`.
