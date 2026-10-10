# A launch page is blocked from crawling

Evidence: **Synthetic teaching case.** No real site was inspected or changed.

## Input

Open `before/robots.txt` in this directory. Predict the problem before running the checks.

## Check result

The wildcard crawler group disallows every path, including /trail-guide/.

## Correction

Remove the accidental site-wide disallow only after confirming the page is intended to be public. Compare the `before/` and `after/` files.

## Acceptance

The fixture rule allows Googlebot to fetch /trail-guide/. This checks crawl permission, not indexing.

Robots rules control crawling; they are not a privacy boundary. A blocked URL can still appear in search. Do not copy this open-crawl fixture onto a private site.

Official reference: [Google Search Central](https://developers.google.com/search/docs/crawling-indexing/robots/intro). Reviewed 2026-10-10.
