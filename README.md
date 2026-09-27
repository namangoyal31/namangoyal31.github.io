# naman-goyal-research-site

Personal research website of Naman Goyal — built with [Astro](https://astro.build),
deployed free on GitHub Pages at **https://namangoyal31.github.io**.

Static output, no client framework, build-time KaTeX rendering, self-hosted fonts,
structured content data for easy updates.

## Quick start

```bash
npm install
npm run dev      # local dev server at http://localhost:4321
npm run build    # static build into dist/
npm run preview  # serve the production build locally
```

## Where things live

| What | Where |
|---|---|
| Identity, email, GitHub handle, canonical URL | `src/data/site.ts` |
| Publications (title, authors, arXiv, abstract, BibTeX) | `src/data/publications.ts` |
| Research projects (summaries, body text, links) | `src/data/projects.ts` |
| Research chronology | `src/data/timeline.ts` |
| SMVac page copy | `src/pages/smvac.astro` |
| Design system (colors, type, components) | `src/styles/global.css` |
| Scientific figures | `public/figures/` |
| CV PDF (linked by "Download CV") | `public/cv/Naman_Goyal_CV.pdf` |
| Theme, nav, footer, SEO skeleton | `src/layouts/Base.astro` |

## How to update content

- **Add a publication** — append an object to `publications` in
  `src/data/publications.ts` (title, authors, arXiv id, abstract verbatim, a
  summary and, optionally, `description` paragraphs). It appears automatically on
  the Publications page and the homepage teaser. Commit + push; the site
  rebuilds by itself.
- **Add a research project** — append to `projects` in `src/data/projects.ts`.
  Set `experimental: true` to keep it in the separated experimental section.
- **Update current research** — edit the `s-matrix-bootstrap` entry in
  `src/data/projects.ts` (and the homepage "Now" line in `src/pages/index.astro`).
- **Replace the CV** — overwrite `public/cv/Naman_Goyal_CV.pdf` with a file of
  the same name (or update `cvPath` in `src/data/site.ts`).
- **Add Google Scholar / ORCID / LinkedIn** — uncomment/add entries in
  `profiles` in `src/data/site.ts`; they appear in the footer automatically.
- **Add a photo** — see the comment next to `portrait-slot` in
  `src/pages/about.astro`; drop the image into `public/`.
- **Colors / typography** — CSS custom properties at the top of
  `src/styles/global.css` (`:root` for light, `[data-theme='dark']` for dark).

## Deployment

GitHub Actions (`.github/workflows/deploy.yml`) builds and deploys on every push
to `main`, using the official `withastro/action`. The repository is the GitHub
**user site** `namangoyal31.github.io`, which serves at
https://namangoyal31.github.io with no path prefix.

One-time setup (if Pages is not yet enabled): repository → Settings → Pages →
Build and deployment → Source: **GitHub Actions**.

## Content accuracy note

All scientific claims on the site are sourced from the CV, the paper
(arXiv:2602.20261), and the SMVac repository itself. SMVac is described as an
RG-improved Fubini–Lipatov (semi-analytical) framework — the repository does not
solve the full spatial bounce equation, and the site says so explicitly
(see the Limitations section of the SMVac page). Figures are unmodified outputs
of the SMVac pipeline, shown with their original labels and axes.
