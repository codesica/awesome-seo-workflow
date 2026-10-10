# Read search reports without inventing a story

Public-source research checked on 2026-10-10. This is a proposed exercise, not a completed audit or evidence of results. The example is wholly fictional.

## The decision

Is a change real within a comparable measurement scope, and which slice should you inspect next? A report is an observation system with omissions and aggregation rules. It is not a diagnosis of demand, product quality or an algorithm update by itself.

## Inputs

Use owner-supplied exports or a synthetic worksheet. Record property, dates, source/search type, country, device, query/page filters, dimension, aggregation, report timezone and export time. No new account or analytics integration is required.

## Actions

1. Save a scope header before reading the numbers. Compare complete windows with the same settings; mark preliminary or incomplete periods. GSC generally dates daily reporting in Pacific Time, while the 24-hour view uses local browser time. A rolling view is not automatically “yesterday.” (S03)
2. Separate the chart total and visible query rows. Anonymous queries may count in an unfiltered chart but do not appear in the query table; query filters exclude them. Tables can also be truncated. The sum of rows or complementary query filters need not equal an unfiltered total. Do not assign the entire gap to one cause without evidence. (S14)
3. Keep property and page aggregation distinct. Multiple pages in the same result event can be counted differently, and much Google performance data is attributed to the selected canonical. A zero on a duplicate URL need not mean nobody arrived there. (S14)
4. Calculate CTR only from same-scope clicks and impressions. `total clicks / total impressions` is not the unweighted average of row CTRs. Average position is an aggregate of relevant highest positions across impressions, not a fixed keyword rank or an average of displayed row averages. (S15)
5. In Bing, record Source first. All combines several surfaces, while Keywords/Pages tables and average position are Web-only. Use a Web scope before comparing Web keyword rows. Do not apply Google's aggregation rules mechanically to Bing. Check available date options rather than hard-coding a retention period from possibly lagging help text. (S16)
6. Compare changes within consistent slices: query, page, device or country. Write an observation, alternative explanations and the next bounded verification. Keep acquisition outcomes separate from successful user tasks; clicks do not establish task completion.

## Worked output — fictional arithmetic

A mock worksheet has 87 unfiltered clicks, 24 under a “contains” query filter and 38 under its complement. The 25-click remainder cannot be assigned entirely to anonymous queries from these values alone. A separate CTR exercise has 3 clicks/60 impressions and 9/300: combined CTR is `12/360 = 3.33%`, not the simple mean `4%`. These are invented arithmetic examples, not actual account exports.

## Deliverable and evidence

Fill a report-scope sheet, a comparable before/after table, any unresolved reconciliation gap and one next question. Attach the unmodified export privately when it belongs to an account; a public lesson should use only a declared synthetic sheet. Record missing data as UNKNOWN and a truly observed zero as 0.

Completion means the denominator, time window and aggregation are reproducible. It does not mean the cause has been identified.

## Failure limits

Do not call a short-term movement an algorithm effect without independent evidence. Do not divide one system's task completions by another system's clicks unless the cohort and coverage are compatible. Edge requests, IPs, measured sessions and people are different units. No inferred identity joins are needed for this exercise.

## Bounded agent task

“Check these supplied report scopes and calculations. Separate missing rows, filters and aggregation effects; compute only compatible rates. Produce observation, possible explanation, unknowns and the smallest next check. Do not infer user identity or a causal growth claim.”

## Public sources

- [Performance report](https://support.google.com/webmasters/answer/7576553?hl=en) (S03; checked 2026-10-10).
- [Dimensions and data grouping](https://support.google.com/webmasters/answer/17011259?hl=en) (S14; checked 2026-10-10).
- [What are impressions, position, and clicks?](https://support.google.com/webmasters/answer/7042828?hl=en) (S15; checked 2026-10-10).
- [Search Performance](https://www.bing.com/webmasters/help/search-performance-c680da36) (S16; checked 2026-10-10).
