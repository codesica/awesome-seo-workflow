# First Crawl delivery evidence

Completed 2026-10-10, approximately 12:23 UTC.

- Live site: https://lab-seo-starter-skills.yk3208724.workers.dev
- Public source: https://github.com/codesica/lab-seo-starter-skills
- Commit: 01293c552b4ecd35f57f75a86c2e4cae089fb79b
- Worker version: f9a38f76-10c2-4ee6-b628-fe1bde8cf1c9
- Local project: lab-seo-starter-skills on Jarvis-mac-mini
- Implementation: Node 22.22.3 static build, markdown-it 15.0.2 as the only build dependency, no browser framework or backend.

## Actual results

- Library input ZIP SHA256 matched c4e8309d8c64af6f1f4e4320312b671d8312867f3263085fc3f54dc825bd494a; all 32 manifest entries existed, were readable and matched size/hash.
- npm ci and release build passed. 14 indexable HTML pages and a separate noindex 404 page generated.
- Complete original tutorials rendered at /guides/crawlability/, /guides/sitemap/ and /guides/page-check/.
- 423 local internal-link, asset and anchor occurrences checked without errors; each HTML page has one H1, English language, unique title/description and matching canonical.
- Live curl readback: 38 unique routes/assets/downloads including the unknown-route case. All 37 expected public paths returned 200 and exact build bytes; unknown route returned 404 with the exact custom 404 body.
- Sitemap and robots returned 200 with XML/text content types; canonical origin is the actual workers.dev URL. Downloads return attachment and noindex headers. A browser download of canonical-conflict/before/page.html completed and live clipboard copy succeeded.
- Real screenshots included here: live home at 1440x1100 and 375x850, guide, Skill detail, and a complete input panel at 375x850. They were visually inspected. Eleven key live routes also reported viewport=375 and page width=375, with one H1 each.
- Actual Tab order: skip link, brand, Start here, Guides, Skills, Examples, GitHub, first CTA. Visible 3px focus outline. Skip link activation, native mobile disclosure by Space, copy control and download were exercised. No custom menu or keyboard trap is introduced.
- All 38 external source links checked. 23 responded directly with HTTP 200; 15 GitHub HTML URLs returned transient 503 to the scripted client, and all 15 same-commit raw source files responded 200. All three important original Skill source links opened correctly through the real browser.
- Source and build text privacy/secret screening: 85 text files checked for common key/token signatures, private paths, email addresses and internal Chinese notes; no matches. Original raster/social assets were visually inspected. This is bounded screening, not a comprehensive security certification.
- Public remote main, clean local HEAD and live build-info.json all match the commit above.

## Actual CLI execution

The supplied offline fixture checker ran successfully for eight expected outcomes. Separately, seo@0.2.41 audit-page was actually run on two original synthetic HTML documents over loopback HTTP at 12:09:48 UTC, with DO_NOT_TRACK=1 and isolated state. Complete unmodified reports are in the public repository under runs/local-seo/{before,after}.json and on /examples/local-cli-run/ as downloads.

Before: two canonical targets, canonical_conflict. After: one canonical, with canonical_mismatch because the preserved example.com canonical differs from the loopback fetch address. The second result is not an all-clear. Only this specific raw-HTTP CLI report path was exercised. Agent integration, sitemap reports, broad crawling, Claude SEO and Firecrawl were not executed. Google/Bing account observations, indexing, ranking and traffic remain untested. No paid SEO API or credentials were used.

## Problem → correction → recheck

1. Default sandbox could not use network or listen on loopback → authorized scoped execution → identity/repository checks and preview succeeded.
2. Mobile tutorial directory filled the first screen → native collapsible directory and shorter visible H1 → 375px screenshot and Space-key check passed.
3. Smooth anchor navigation was still animating during inspection → ordinary immediate anchor behavior → target arrived about 62px from the top; screenshot confirms the input panel.
4. A first Python live sweep encountered transient 403 during publication → no access controls changed; normal browser and curl readback → all 38 live checks passed.

## Remaining scope

No delivery blocker. No custom domain was bought, no new paid service was added, no credentials were generated, and no existing permissions or Share/Nearstill/Zone2 production projects were changed. A new domain remains a separate user decision with registration cost. First Crawl is a working brand with no trademark/domain availability claim.

Internal QA, Chinese handoff notes and the original Library transfer package were not published to the website or repository.
