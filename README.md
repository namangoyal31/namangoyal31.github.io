# Naman Goyal research website

Personal academic website of Naman Goyal, B.S. (Research) physics undergraduate at the
Indian Institute of Science, Bengaluru. Live at **https://namangoyal31.github.io**.

Static site, built with [Astro](https://astro.build) 5. No client framework: the only
JavaScript is the homepage canvas visual (`src/lib/amp-field.js`), the theme toggle, and
the mobile menu. Math renders to HTML+MathML at build time via KaTeX. Fonts are
self-hosted. Hosting is GitHub Pages, free, redeployed automatically on every push to
`main`.

## Commands

```bash
npm install     # once
npm run dev     # dev server at http://localhost:4321
npm run build   # production build into dist/
npm run preview # serve the production build locally
```

Deployment is automatic: `git push` to `main` triggers the GitHub Actions workflow in
`.github/workflows/deploy.yml`. See [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md).

## Documentation

| File | Contents |
|---|---|
| [docs/PROJECT.md](docs/PROJECT.md) | Architecture and major components |
| [docs/DEVELOPMENT.md](docs/DEVELOPMENT.md) | Local setup, commands, how to modify pages safely |
| [docs/CONTENT.md](docs/CONTENT.md) | Where every piece of content lives |
| [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) | Repository, Pages configuration, troubleshooting |
| [docs/ANIMATION.md](docs/ANIMATION.md) | The homepage visual: physics, code, parameters |

## Key files

| What | Where |
|---|---|
| Identity, email, GitHub handle, canonical URL | `src/data/site.ts` |
| Publications (title, authors, arXiv, abstract, BibTeX) | `src/data/publications.ts` |
| Research projects (summaries, body text, links) | `src/data/projects.ts` |
| Research chronology | `src/data/timeline.ts` |
| SMVac page copy | `src/pages/smvac.astro` |
| Homepage visual | `src/lib/amp-field.js` |
| Design system (colors, type, components) | `src/styles/global.css` |
| Theme, nav, footer, SEO skeleton | `src/layouts/Base.astro` |
| Scientific figures | `public/figures/` |
| CV PDF | `public/cv/Naman_Goyal_CV.pdf` |

## Content accuracy

All scientific claims are sourced from the CV, the paper (arXiv:2602.20261), and the
SMVac repository itself. SMVac is described as an RG-improved Fubini–Lipatov
(semi-analytical) framework: the repository does not solve the full spatial bounce
equation, and the site says so explicitly. Figures are unmodified outputs of the SMVac
pipeline, shown with their original labels and axes.
