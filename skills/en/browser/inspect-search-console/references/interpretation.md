# Metric Interpretation and Diagnostic Criteria
- Impressions mean search appearances meeting this report's definition; clicks are not Analytics sessions or conversions. CTR = clicks/impressions; use null when the denominator is zero.
- Average position is an aggregate report value, not a fixed ranking for a keyword. Page/site aggregation and different search appearance types may differ; record the active dimension and search type.
- When clicks and impressions both decline, first compare query/page/country/device composition, dates, and seasonality, then examine indexing evidence. This is not proof of a "Google penalty."
- When impressions rise and CTR falls, first examine query composition and position changes, then propose hypotheses about title/snippet intent match. Do not confuse correlation with causation.
- GSC alone cannot establish revenue, inquiries, or sales. Without conversion data, set business_outcome to unknown.
- Page indexing totals reflect the scope known to Google; examples are not the complete URL set. The goal is important canonical pages, not 100% indexing of every URL.
- Discovered/Crawled currently not indexed: preserve the original label; do not diagnose low quality from this label alone. Check update time, the URL, and available canonical/crawl evidence before listing hypotheses.
- robots.txt and noindex are not equivalent. Do not infer removal from search solely from crawling being blocked by robots. Consider the actual inspection results.
- An unreadable report may reflect permissions, data not yet generated, site scope, or UI changes; do not interpret it directly as zero.

## Data limitations to disclose
Queries may omit anonymized and other low-frequency rows; grouping, filters, and table row limits affect totals. Daily PT is not the user's time zone. UI exports generally provide at most 1,000 example rows, and totals may include data not exported. Record actual counts and file contents rather than describing them as a complete data warehouse. Performance and indexing reports update at different cadences; collection time is not the time the data occurred.
