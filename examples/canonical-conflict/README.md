# Two canonical tags disagree

Evidence: **Synthetic teaching case.** No real site was inspected or changed.

## Input

Open `before/page.html` in this directory. Predict the problem before running the checks.

## Check result

Two canonical link elements point to different URLs for the same page.

## Correction

Choose the intended representative page and emit one consistent canonical. Keep the sitemap aligned. Compare the `before/` and `after/` files.

## Acceptance

Exactly one canonical remains and matches the fixture sitemap URL. Google-selected canonical remains unverified.

Canonical annotations express a preference; Google can select a different representative. Check the chosen target is appropriate and accessible before copying this pattern.

Official reference: [Google Search Central](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls). Reviewed 2026-10-10.
