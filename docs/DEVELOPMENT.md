# Development guide

## Requirements

- **Node 18.17+ or 20+** (built and tested on Node 24). Check with `node --version`.
- **npm** (ships with Node). The project has no other toolchain dependencies; the C++
  code shown on the SMVac page is not compiled by this site.

## Commands

Run from the project root (`Naman-Goyal-Website/`):

```bash
npm install        # install dependencies (once, or after package.json changes)
npm run dev        # dev server with hot reload at http://localhost:4321
npm run build      # production build into dist/
npm run preview    # serve dist/ locally at http://localhost:4321
```

## Directory map

See [PROJECT.md](PROJECT.md) for the full tree. The short version:

- page content and structure: `src/pages/*.astro`
- shared layout/SEO: `src/layouts/Base.astro`
- all colors/typography: `src/styles/global.css` (custom properties at the top;
  the site is dark-only, accent = yellow)
- content data: `src/data/*.ts`
- homepage visual: `src/lib/amp-field.js`

## Modifying the homepage safely

The homepage (`src/pages/index.astro`) has three parts that fail differently:

1. **Hero text** (name, lede, buttons, "Now" line): plain markup in the first
   `<section class="hero">`. Edit freely; keep the `<canvas class="hero-field">` as the
   first child of `.hero`.
2. **Sections** (Current research, Selected research, Chronology, Publication): rendered
   from `src/data/`. Edit the data files, not the loops.
3. **The canvas script** at the bottom: initializes `src/lib/amp-field.js`. Do not move
   the canvas outside `.hero` (the module sizes itself from the parent element).

After any homepage edit, check desktop (1440px) and mobile (390px) widths with
`npm run dev`, then `npm run build` before pushing.

## Modifying research / project pages

- Research page text lives in `src/data/projects.ts` (each project has `summary` and
  `body` arrays; `$...$` becomes math, `[text](href)` becomes links, `**bold**` bolds).
- The SMVac page is a single hand-written page, `src/pages/smvac.astro`, structured like
  a short paper (Overview, Problem, Method, Results, Validation, Limitations, Code,
  Future work). Math uses the `<Math tex="..." />` component; figures use
  `<Figure ... />`. Keep the Limitations section in sync with the repository's own
  statements if SMVac changes.
- The CV page is `src/pages/cv.astro`; keep it consistent with the PDF in `public/cv/`.

## Deploy checklist

`npm run build` must succeed with no errors, then `git push`. See
[DEPLOYMENT.md](DEPLOYMENT.md).
