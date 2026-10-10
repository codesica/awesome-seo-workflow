# The sitemap route returns an app shell

Evidence: **Synthetic teaching case.** No real site was inspected or changed.

## Input

Open `before/sitemap.xml` in this directory. Predict the problem before running the checks.

## Check result

The modeled response is HTTP 200 with an HTML body, not the promised XML sitemap.

## Correction

Serve the sitemap before a catch-all HTML route; return sitemap XML and an appropriate XML content type. Compare the `before/` and `after/` files.

## Acceptance

The fixed fixture parses as a sitemap urlset with one absolute URL. No submission or crawl is claimed.

The filename and HTTP 200 alone do not validate a sitemap. A generic HTML page is not an XML sitemap. Google also supports other sitemap formats; this exercise intentionally tests XML. Sitemap availability does not guarantee indexing.

Official reference: [Google Search Central](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap). Reviewed 2026-10-10.
