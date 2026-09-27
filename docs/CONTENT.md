# Content map

All research content is sourced from three places: the CV, the paper
(arXiv:2602.20261), and the SMVac repository. When you update any of those, update the
matching file below. Keep the arXiv abstract verbatim, and keep SMVac claims consistent
with what the repository's code and docs actually support.

## Homepage

| Content | Location |
|---|---|
| Hero lede, "Now" line, buttons | `src/pages/index.astro` (hero section) |
| Card excerpts | `src/data/projects.ts` (`summary` of each project; the homepage shows the first sentence for "Selected research") |
| Homepage meta description | `src/pages/index.astro` (`description` prop on `<Base>`) |

## Research page

| Content | Location |
|---|---|
| Page intro | `src/pages/research.astro` (`.lede` paragraph) |
| Project descriptions | `src/data/projects.ts` (`body` paragraphs) |
| Tags, mentors, dates, links | `src/data/projects.ts` (per-project fields) |
| Timeline | `src/data/timeline.ts` |
| Experimental (IPT) section | `src/data/projects.ts` (entries with `experimental: true`) |

## SMVac page

`src/pages/smvac.astro`, hand-written. Sections in order: Overview, Problem, Method
(pipeline list + equations), Results (Figures 1–2), Analytical vs RG-improved
(Figure 3), Validation, Limitations, Code, Future work. Figures are in
`public/figures/`; captions are set where each `<Figure>` is used.

## Publications

| Content | Location |
|---|---|
| Title, authors, arXiv ID, dates | `src/data/publications.ts` |
| Abstract | `src/data/publications.ts` (`abstract`, verbatim from arXiv) |
| Card + page summaries | `src/data/publications.ts` (`summary`, `description`) |
| BibTeX | generated in `src/components/PubCard.astro` from the record |

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
  regenerate from the SMVac pipeline rather than editing the PNGs.
- `public/og-image.png`: 1200×630 social preview (currently a screenshot of the hero).
- `public/favicon.svg`: monogram mark.
