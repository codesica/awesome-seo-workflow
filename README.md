# First Crawl

Your website is live. Make it findable.

An English, open-source field guide for someone making their first technical SEO checks. Three complete tutorials, a small source-reviewed Skill directory, and four original before-and-after teaching examples. No accounts, database, paid SEO API, or browser analytics.

Site: https://lab-seo-starter-skills.yk3208724.workers.dev

## Run locally

Requires Node.js 22 or newer.

```sh
npm ci
npm run dev
```

Open `http://127.0.0.1:4173`. Run `npm run build` to generate `dist/`, or `npm run preview` to serve an existing build. Static HTML works without JavaScript; JavaScript only adds clipboard buttons. The sole development dependency is a pinned Markdown renderer. No browser runtime framework is shipped.

## Content and routes

- `/start/` — choose a public page and a manual or optional assistant route
- `/guides/crawlability/` — response, crawl rules and indexing directives
- `/guides/sitemap/` — find, check, submit and record a sitemap
- `/guides/page-check/` — inspect one useful page and verify a small change
- `/skills/` — pinned source, prerequisites, costs, permissions and limits
- `/examples/` — complete synthetic inputs, corrections and offline output
- `/sources/` — source review and publication boundaries

`content/` contains original Markdown guides. `catalog/skills.json` contains public English curation metadata. `examples/` contains synthetic example.com fixtures and the supplied offline checker. `scripts/build.mjs` maps guide filenames deliberately to routes, generates metadata, canonical URLs, sitemap, robots, downloads and the custom HTTP 404 page. Internal planning and QA handoffs are not included.

## Evidence labels

Source review, actual execution and synthetic input are separate dimensions. Read the precise label on each page. Offline fixture checks do not establish crawling, indexing, traffic or rankings. Run the supplied narrow checks with `python3 examples/verify.py`. Third-party Skills are linked rather than redistributed. A compatible assistant can incur model costs even if a local CLI requires no paid SEO API.

One real fixed-version `seo` CLI `audit-page` path was executed on two local synthetic inputs. Read [the execution record](runs/local-seo/README.md) and its complete raw JSON. That run does not establish agent integration or other report behavior.

## Deploy an isolated static Worker

The configuration names only the new `lab-seo-starter-skills` Worker and uses Workers static assets. It does not configure a database, account secret, custom domain or existing production route.

```sh
npm run deploy
```

Deployment requires an existing authorized Cloudflare account. `site.config.mjs` holds the canonical origin. Set `SITE_ORIGIN` only for a confirmed alternate origin. The release command rejects draft content until the implementation's release flag has been set after actual checks. A custom domain requires a separate explicit decision; none is purchased by this project.

## Contribute and license

See [CONTRIBUTING.md](CONTRIBUTING.md). Original code, guides and examples are MIT licensed; third-party dependencies and linked projects retain their own licenses. First Crawl is a working identity, with no claim about domain or trademark availability.
