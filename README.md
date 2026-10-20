# openspending.org

Source for [www.openspending.org](https://www.openspending.org): the OpenSpending website and its catalog of fiscal datasets.

It's a [Next.js](https://nextjs.org) site built with [PortalJS](https://www.portaljs.com) components:

- **Content:** the blog, stories, help and about pages are Markdown in `content/`, indexed at build time with [MarkdownDB](https://github.com/datopian/markdowndb).
- **Datasets:** dataset pages (`/@<org>/<project>`) are generated at build time from GitHub repos listed in `orgs.json` (e.g. the `os-data` org).

## Develop

Requires Node.js 22.

```bash
npm install
GITHUB_PAT=<a GitHub token> npm run dev
```

`GITHUB_PAT` is read in `next.config.js` and used to fetch dataset repos from the GitHub API at build time. Without it you'll quickly hit GitHub's unauthenticated rate limit.

Other scripts:

| Script | What it does |
|---|---|
| `npm run build` | Indexes `content/` (`mddb`), then builds the site |
| `npm test` | Runs the Vitest tests in `__tests__/` |
| `npm run lint` | ESLint (`next lint`). Not run during builds, see below |

## Deploy

The site is deployed on Vercel (Datopian team, project `portaljs-openspending`), which serves `www.openspending.org` and `openspending.org`. A push to `main` deploys to production; other branches get preview deployments. `GITHUB_PAT` is set in the Vercel project's environment variables.

## History

This code lived in [datopian/portaljs](https://github.com/datopian/portaljs) as `examples/openspending` until October 2026, when it moved here. The last version there is [datopian/portaljs@59d816c](https://github.com/datopian/portaljs/tree/59d816c73aa3569733ce26cf6c471d24b155d760/examples/openspending).

Changes made during the move:

- **Lint during builds:** `next.config.js` sets `eslint.ignoreDuringBuilds`, so lint errors don't block a deploy. Inside the monorepo, lint didn't run against this code.
- **ESLint config:** `.eslintrc.json` pointed `no-html-link-for-pages` at a stale `examples/simple-example/pages`; it now points at `pages`.

Known lint issues to fix: two conditional `useQuery` calls in `components/FlatUiTable.tsx` (`react-hooks/rules-of-hooks`), and an unescaped apostrophe in `components/Hero.tsx`.

## License

MIT
