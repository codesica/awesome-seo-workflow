# Bing Diagnostic Criteria
- Sitemap processing success: a signal of successful processing, not a guarantee that its URLs are indexed.
- Sitemap discovered URLs: discovery scale. Do not use it to calculate "percentage indexed" without a reliable indexed numerator for the same scope/date.
- Indexed snapshot: information already stored by the engine. Live URL: a current diagnostic fetch. Different times can produce legitimate differences.
- Live redirect: record the response and target, then decide whether the target needs inspection. Never apply a successful target result directly to the source URL.
- SEO/Markup cards: rule-check results. First verify business impact and specific elements; do not promise rankings from card scores.
- Known but not indexed: this alone does not establish a site penalty or guarantee recovery after submission.
- No data / empty table: first check site, filters, update time, and permissions. Do not convert unknown to zero.
- Recommended explicit classifications: EXPECTED_EXCLUSION / INVESTIGATE / FIX_CANDIDATE. FIX_CANDIDATE still requires separate authorization for modifications.

Sampling should cover the user's important URLs and the main observed states. If only 5 URLs are inspected, conclusions cover only those 5 and the corresponding report totals. When inspecting a sitemap index, do not double-count parent totals and child-file data.
