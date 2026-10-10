# An intended public page still has noindex

Evidence: **Synthetic teaching case.** No real site was inspected or changed.

## Input

Open `before/page.html` in this directory. Predict the problem before running the checks.

## Check result

The HTML robots meta tag contains noindex.

## Correction

Remove the unintended directive at its source. Check both HTML metadata and response headers in production. Compare the `before/` and `after/` files.

## Acceptance

The fixed HTML and modeled headers contain no noindex directive. Google indexing remains unverified.

Google must be able to crawl the page to see noindex. Do not remove an intentional noindex from private or non-search content just to pass a check. `index` does not override another applicable noindex.

Official reference: [Google Search Central](https://developers.google.com/search/docs/crawling-indexing/block-indexing). Reviewed 2026-10-10.
