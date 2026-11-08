# Content map

All research content is sourced from three places: the CV, the published paper
(Eur. Phys. J. C 86, 1280 (2026); arXiv:2602.20261), and the SMVac-Research repository.
When you update any of those, update the matching file below. Keep the abstract verbatim
(the journal and arXiv abstracts are identical), and keep SMVac claims consistent with
the repository's `RESULTS.md` and `docs/limitations.md`.

## Homepage

| Content | Location |
|---|---|
| Hero lede, `published` / `now` record, buttons | `src/pages/index.astro` (hero section) |
| Featured publication | first entry of `src/data/publications.ts` |
| Card excerpts | `src/data/projects.ts` (`summary` of each project; the homepage shows the first sentence for "Selected research") |
| Homepage meta description | `src/pages/index.astro` (`description` prop on `<Base>`) |

## Research page

| Content | Location |
|---|---|
| Page intro | `src/pages/research.astro` (`.lede` paragraph) |
| Research areas and their order | `src/data/projects.ts` (`areas`; each project's `area`) |
| Project descriptions | `src/data/projects.ts` (`body` paragraphs) |
| Tags, mentors, dates, links | `src/data/projects.ts` (per-project fields) |
| Timeline | `src/data/timeline.ts` |
| Experimental (IPT) section | `src/data/projects.ts` (entries with `experimental: true`) |

## SMVac page

`src/pages/smvac.astro`, hand-written. Sections in order: Overview (with the
established / estimated / not established summary), Problem, Method (pipeline list +
equations), Results (Figures 1–2), Conformal estimate vs. trial profile (Figures 3–4),
Validation, Limitations, Code, Future work. Figures in `public/figures/` are unmodified
copies of `figures/01_*.png`, `02_*`, `05_*` and `06_*` from SMVac-Research; captions
are set where each `<Figure>` is used.

## Publications

| Content | Location |
|---|---|
| Title, authors, journal, DOI, dates, licence, arXiv ID | `src/data/publications.ts` (from the publisher's record) |
| Abstract | `src/data/publications.ts` (`abstract`, verbatim) |
| Card + page summaries | `src/data/publications.ts` (`summary`, `description`) |
| BibTeX | generated in `src/components/PubCard.astro` from the record (`bibkey` sets the key) |

## CV

| Content | Location |
|---|---|
| Web summary (education, research, awards, skills, coursework) | `src/pages/cv.astro` |
| Downloadable PDF | `public/cv/Naman_Goyal_CV.pdf` (overwrite the file to replace it) |
| Download link target | `cvPath` in `src/data/site.ts` |

## About page, contact, profiles

| Content | Location |
|---|---|
| Bio paragraphs | `src/pages/about.astro` |
| Email, GitHub handle, site URL | `src/data/site.ts` |
| Google Scholar / ORCID / LinkedIn | `src/data/site.ts` (`profiles` array; uncomment an entry) |
| Photo | see the comment next to `portrait-slot` in `src/pages/about.astro`; drop the image into `public/` |

## Images and assets

- `public/figures/`: scientific figures, served as-is. Keep original axes/labels;
  copy them from SMVac-Research rather than editing the PNGs.
- `public/og/`: per-page 1200×630 social cards (home, research, smvac,
  publications, cv, about), generated from `scripts/og-cards.html`:
  serve the repo root, open the page with `?card=<name>` at a 1200×630
  viewport, and screenshot to `public/og/<name>.png`.
- `public/og-image.png`: legacy shared preview (kept as the default fallback).
- `public/favicon.svg`: monogram mark.
