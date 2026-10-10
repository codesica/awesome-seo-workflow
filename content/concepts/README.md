# First Crawl concepts data

- `concepts.json`: frontend source, 23 bilingual concept cards, six-stage IDs, conceptual funnel and official-source registry.
- `concepts.zh.md` / `concepts.en.md`: review copies.
- All UI strings use `{zh, en}`. Stable IDs support glossary anchors and stage filtering. Render each card with `plain`, `example`, `dontConfuse`, `evidence`, `stageIds`, and source links resolved through `sourceIds`.
- `exampleIsHypothetical` is true for every card; do not render examples as live analytics.
- `funnel` is pedagogical, not a measured cohort. Do not add invented counts or draw percentage drop-offs.
- Google-specific statements must retain their qualification; no claim of equivalent Bing behavior is made.
- Verified 2026-10-10 against linked official documentation.
