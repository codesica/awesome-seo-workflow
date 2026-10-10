# First Crawl

从一个想法，到看懂网站的搜索流量。A bilingual beginner workflow for learning SEO, doing the work, and delegating bounded tasks to an agent.

The bilingual redesign was visually approved for publication on 10 October 2026. The production origin remains https://skills.yangluotong.top, served by the existing `lab-seo-starter-skills` Cloudflare Worker.

## Run locally

Requires Node.js 22+ and Python 3 (standard library only for packaging original Skills).

```sh
npm ci --ignore-scripts
npm run build
PORT=4180 npm run preview
```

Open `http://127.0.0.1:4180/zh/` or `http://127.0.0.1:4180/en/`. Normal development can use `npm run dev`, which serves port 4173. The preview for this task uses 4180 to avoid sharing the original site’s port.

## Bilingual routes and content

Every page has a stable `/zh/` and `/en/` URL, corresponding language links, its own canonical, and reciprocal hreflang. Unprefixed legacy addresses lead to the Chinese equivalent and are outside the sitemap. Evidence downloads remain under `/downloads/`, independent of page language.

- `/{locale}/roadmap/`: choose a starting point, with six progress states.
- `/{locale}/stages/01-search-opportunity/` through `06-measure-iterate/`: six complete stages, 25 actions, official sources, related concepts, Skills, outputs and acceptance.
- `/{locale}/concepts/`: 23 bilingual concepts, stage filtering, and a conceptual discovery-to-use sequence without invented metrics.
- `/{locale}/templates/`: six blank deliverables in each language. Unknown values remain `null`, not zero.
- `/{locale}/skills/`: seven original execution packages inside their matching stages; complete ZIP downloads and original Chinese instructions. Website descriptions and prompts are bilingual. Three third-party source directories remain optional references.
- `/{locale}/guides/`: the three original technical tutorials, in full Chinese and English, supporting stage 4.
- `/{locale}/examples/`: four synthetic before-and-after examples and one real fixed-version local CLI execution record.
- `/{locale}/sources/`, `/contribute/`: sources, scope, licenses and contribution.

`content/workflow/` contains the supplied native bilingual curriculum. `content/concepts/` contains bilingual definitions. `content/zh/` contains full native Chinese technical guides; English originals remain in `content/`. `skills/browser/` and `skills/workflow/` contain original execution instructions and references. `scripts/content-routes.mjs` separates stable content IDs, localized page URLs and raw downloads. The static build ships no browser framework or analytics.

## Interaction and evidence

The homepage’s before/after workbench shows the unchanged canonical-conflict fixture and supports pointer, arrow keys, Home and End. It makes no network request to a user website. The CLI section excerpts actual `runs/local-seo/{before,after}.json`: after still reports `canonical_mismatch` because its canonical target differs from the loopback serving URL. It is not an all-clear or indexing result.

All seven new Skills are source-reviewed and **live-site NOT_RUN**. Synthetic output-shape validation is separate from actual SEO work. Browser Skills require an existing authorized session and prohibit unauthorized submissions or settings changes. The instruction packages are primarily Chinese; machine keys remain English. Stage 3 has no dedicated production Skill; stage 5 includes read-only Bing inspection but no automated promotion package. Full curriculum coverage is a beginner loop, not exhaustive SEO-specialty coverage.

Run offline fixture checks with `python3 examples/verify.py`. The eight expected outcomes do not prove indexing, rankings or traffic. No site-wide growth, private dashboard data or end-to-end agent execution has been claimed.

## Publishing

`site.config.mjs` retains the confirmed formal origin and records visual approval with `releaseReady: true`. `npm run deploy` makes a release build and deploys to the existing Worker. Release metadata at `/build-info.json` records version `2.0.0`, the source commit and all 60 indexable routes. The existing Worker name, custom domain, routes, secrets and account permissions are preserved.

Original project code, guides and examples are MIT licensed. Third-party dependencies and linked projects keep their own licenses. See LICENSE, THIRD_PARTY.md and CONTRIBUTING.md.
