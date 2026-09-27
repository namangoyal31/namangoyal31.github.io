# Deployment

## Where the site lives

- **Public URL:** https://namangoyal31.github.io
- **Repository:** https://github.com/namangoyal31/namangoyal31.github.io
  (a GitHub *user site* repo, which is why it serves at the account root with no
  path prefix)
- **Hosting:** GitHub Pages, free. No server, no database, no paid service.

## Deployment workflow

`.github/workflows/deploy.yml` runs on every push to `main` (and on manual dispatch
from the Actions tab):

1. checkout
2. `withastro/action@v3`: runs `npm ci` and `npm run build`, uploads `dist/` as the
   Pages artifact
3. `actions/deploy-pages@v4`: publishes the artifact to GitHub Pages

So the entire update workflow is:

```bash
git add .
git commit -m "Update website"
git push
```

Watch progress in the repo's **Actions** tab; a run takes about a minute. When it shows
a green check, the live site is updated (hard-refresh with Ctrl+F5 if you see a cached
page).

## Pages configuration (already done, recorded here for reference)

Repo → Settings → Pages:

- **Build and deployment → Source: GitHub Actions** (not "Deploy from a branch";
  branch mode would publish the raw Astro source instead of the build output).
- No custom domain; the `build_type` is `workflow`. You can verify with
  `GET https://api.github.com/repos/namangoyal31/namangoyal31.github.io/pages`
  (`"build_type": "workflow"`).

## Configuration that depends on the URL

`astro.config.mjs` sets `site: 'https://namangoyal31.github.io'`, which drives
canonical URLs, the sitemap, and Open Graph URLs. If you ever move the site to a
project repo (URL becomes `https://namangoyal31.github.io/<repo>/`), also add
`base: '/<repo>/'` and re-check internal asset paths.

## If a deployment fails

1. Open the **Actions** tab and click the failed run; the failing step says what broke.
   Most failures are a TypeScript/type error or a missing import introduced by an edit;
   the error message names the file.
2. Reproduce locally: `npm run build`. Fix until it succeeds, commit, push again.
3. If the build succeeded but the site looks wrong (404 assets, unstyled page):
   confirm Pages source is still "GitHub Actions", then re-run the workflow from the
   Actions tab ("Re-run all jobs").
4. Nothing here needs a local deploy script. If GitHub is unreachable, the previous
   deployment stays live; push later.

## Manually deploying without Actions (emergency only)

Not recommended, but possible: `npm run build`, then upload `dist/` with any gh-pages
tool. Any manual method must target the `gh-pages`-style artifact flow or switch Pages
back to branch mode, which would fight the workflow above. Prefer fixing Actions.
