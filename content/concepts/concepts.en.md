# Concepts and metrics

Identify the layer before deciding what to change. All examples are hypothetical, not this site’s results.

SEO guarantees neither indexing nor rankings. Technical rules here refer to Google documentation; verify other engines separately.

Discovered → Crawled → Indexed → Impressions → Clicks → Usage / conversion

This is a conceptual sequence, not a directly divisible analytics report: URLs, impressions, clicks, and conversion events use different units. No traffic or conversion data is invented.

## Search intent · search-intent
The task someone wants to complete with a search.

Suppose someone searches “compress images without losing quality”: they may want a tool now.

Do not confuse: Your sales goal is not necessarily their goal; intent is a hypothesis.
Evidence: Result-page formats, users’ own words, and usability feedback.
Stages: 01-search-opportunity, 02-page-plan
Sources: [Google SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)

## Keyword / query · keyword
A query is what someone searches; a keyword is a term you use to plan content.

Suppose the query is “make png smaller”; you group it under PNG compression.

Do not confuse: Synonyms need not each get a page; repetition is not the goal.
Evidence: Search Console queries, interview language, and related search results.
Stages: 01-search-opportunity, 02-page-plan
Sources: [Google SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)

## Long-tail keyword · long-tail
A less frequently searched query, often expressing a more specific need.

“Batch compress transparent PNGs” is more specific than “images”; volume still needs evidence.

Do not confuse: Long-tail does not just mean more words, or guarantee easy rankings or conversions.
Evidence: Query detail and demand evidence; tool volumes are estimates.
Stages: 01-search-opportunity, 02-page-plan
Sources: [Google SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)

## SERP · serp
The full results page, which can include organic results, ads, and other features.

For “image compression”, note whether leading results are tools, guides, or comparisons.

Do not confuse: An ad is not an organic ranking; one screenshot is not everyone’s result.
Evidence: Record query, time, region, device, and result formats.
Stages: 01-search-opportunity, 02-page-plan, 06-measure-iterate
Sources: [How Google Search works](https://developers.google.com/search/docs/fundamentals/how-search-works)

## URL discovery · discovery
The search engine learns that a URL exists.

An existing guide links to a new tool, providing a discovery path.

Do not confuse: Discovery does not mean the URL was crawled or indexed.
Evidence: URL Inspection status and available referring-page or sitemap information.
Stages: 04-publish-check, 05-discovery-promotion
Sources: [How Google Search works](https://developers.google.com/search/docs/fundamentals/how-search-works)

## Crawling · crawl
A crawler requests a page and its resources from the server.

Suppose Googlebot requests /compress and the server returns a page.

Do not confuse: A successful response does not prove indexing.
Evidence: Last crawl and fetch status in URL Inspection; verified server logs when needed.
Stages: 04-publish-check, 05-discovery-promotion
Sources: [How Google Search works](https://developers.google.com/search/docs/fundamentals/how-search-works)

## Rendering · render
Running page code to assemble the readable page.

If JavaScript loads instructions, check that rendered content contains them.

Do not confuse: Working in your browser does not prove equivalent crawler access.
Evidence: Rendered HTML, screenshots, and resource-loading results in URL Inspection.
Stages: 03-content-production, 04-publish-check
Sources: [JavaScript SEO basics](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics)

## Indexing · index
The engine processes a page and stores information in its search index.

Suppose URL Inspection reports the page indexed: it has entered the searchable index.

Do not confuse: Being indexed does not guarantee appearance for a particular query.
Evidence: URL Inspection and Page indexing reports, not just site: result counts.
Stages: 04-publish-check, 05-discovery-promotion, 06-measure-iterate
Sources: [How Google Search works](https://developers.google.com/search/docs/fundamentals/how-search-works)

## Ranking · ranking
How the engine selects and orders results for a query.

A tool may rank differently for “PNG compression” and “shrink JPG”.

Do not confuse: There is no permanent site-wide rank across all queries and regions.
Evidence: Inspect Search Console by query, page, country, and device.
Stages: 01-search-opportunity, 06-measure-iterate
Sources: [How Google Search works](https://developers.google.com/search/docs/fundamentals/how-search-works)

## Impressions · impressions
Your link received a recorded search-result impression under that result type’s rules.

Suppose the report shows 100 impressions: it records 100 qualifying appearances.

Do not confuse: Impressions are neither unique people nor clicks.
Evidence: Search Console impressions with consistent search type, dates, and filters.
Stages: 06-measure-iterate
Sources: [Search Console metric definitions](https://support.google.com/webmasters/answer/7042828?hl=en)

## Clicks · clicks
Recorded clicks from search results to your site.

Suppose Search Console records 10 clicks; next check whether visitors completed their task.

Do not confuse: Clicks are not sessions, unique people, or purchases.
Evidence: Read Search Console clicks and site analytics separately; their definitions differ.
Stages: 06-measure-iterate
Sources: [Search Console metric definitions](https://support.google.com/webmasters/answer/7042828?hl=en)

## CTR · ctr
Clicks divided by impressions within the same reporting scope.

Hypothetical: 5 clicks / 100 impressions = 5% CTR.

Do not confuse: No single good CTR applies to all positions, queries, and result formats.
Evidence: Compare like queries and devices; zero impressions give no meaningful CTR.
Stages: 06-measure-iterate
Sources: [Search Console Performance report](https://support.google.com/webmasters/answer/7576553?hl=en)

## Average position · average-position
GSC’s mean recorded position across impressions; property aggregation uses the topmost result.

Simplified example: positions 2 and 8 across two impressions average to 5.

Do not confuse: An average of 5 does not mean everyone saw you fifth.
Evidence: Hold query, page, country, and device steady; read alongside impressions and clicks.
Stages: 06-measure-iterate
Sources: [Search Console metric definitions](https://support.google.com/webmasters/answer/7042828?hl=en)

## Usage / conversion · conversion
A visitor completes a valuable action you defined in advance.

Suppose the tool’s goal is a successful compressed-file export; track that success event.

Do not confuse: A page visit is not automatically a conversion; a GA4 key event is not automatically revenue.
Evidence: Validate event firing, then inspect real usage, leads, or orders.
Stages: 02-page-plan, 06-measure-iterate
Sources: [Analytics key events and conversions](https://support.google.com/analytics/answer/13965727?hl=en)

## robots.txt · robots-txt
A root-level file giving compliant crawlers rules about which paths they may crawl.

If crawling /drafts/ is disallowed, external links can still reveal those URLs.

Do not confuse: robots.txt is not a reliable deindexing or privacy mechanism.
Evidence: Inspect the live /robots.txt and crawl-allowed status in URL Inspection.
Stages: 04-publish-check
Sources: [Introduction to robots.txt](https://developers.google.com/search/docs/crawling-indexing/robots/intro)

## noindex · noindex
A directive asking supporting engines to exclude the page from search results.

Suppose a public test page has noindex; check it was removed from the intended live page.

Do not confuse: Google must crawl the page to read noindex; it is not access control.
Evidence: Inspect robots meta, X-Robots-Tag, and crawl access.
Stages: 04-publish-check
Sources: [Block indexing with noindex](https://developers.google.com/search/docs/crawling-indexing/block-indexing)

## Canonical URL · canonical
The representative URL you recommend for duplicate or very similar content.

If /compress?ref=news duplicates /compress, recommend the clean URL.

Do not confuse: Canonical is a signal, not a command, redirect, or deletion.
Evidence: Compare declared and Google-selected canonical URLs.
Stages: 02-page-plan, 04-publish-check
Sources: [Specify a canonical URL](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls)

## Sitemap · sitemap
A file listing important URLs you want search engines to discover.

Suppose you add a tool: include its preferred URL and check sitemap processing.

Do not confuse: Successful submission guarantees neither crawling nor indexing and does not replace navigation.
Evidence: Check accessibility, processing status, and correctness of listed URLs.
Stages: 04-publish-check, 05-discovery-promotion
Sources: [Sitemap overview](https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview)

## Internal link · internal-link
A link from one page of your site to another.

A PNG guide links to its tool using “batch compress PNGs”.

Do not confuse: A sitemap entry is not an internal link; important links should be usable and crawlable.
Evidence: Check anchor hrefs, destination responses, and descriptive link text.
Stages: 02-page-plan, 03-content-production, 05-discovery-promotion
Sources: [Link best practices](https://developers.google.com/search/docs/crawling-indexing/links-crawlable)

## Backlink · backlink
A link from another website to yours; your link to another site is outbound.

Suppose a design tutorial independently references your compression tool.

Do not confuse: Link count is not quality; buying or selling links to manipulate rankings is risky.
Evidence: Inspect the source page, context, relevance, and referral visits.
Stages: 05-discovery-promotion
Sources: [Link best practices](https://developers.google.com/search/docs/crawling-indexing/links-crawlable), [Google Search spam policies](https://developers.google.com/search/docs/essentials/spam-policies)

## hreflang · hreflang
An annotation identifying equivalent language or regional versions for Google.

Suppose /zh/compress and /en/compress list both themselves and each other as zh/en alternatives.

Do not confuse: It does not translate pages or make unrelated pages equivalents.
Evidence: Check reciprocal/self references, full URLs, language codes, and equivalent content.
Stages: 02-page-plan, 04-publish-check
Sources: [Localized versions of pages](https://developers.google.com/search/docs/specialty/international/localized-versions)

## Page title / title link · title-link
Your title describes the page; Google may generate the result’s title from multiple sources.

Suppose the title promises a transparent-PNG batch compressor, and the page supports it.

Do not confuse: HTML title, visible H1, and search-result title are distinct.
Evidence: Compare title, visible heading, actual results, and page capabilities.
Stages: 02-page-plan, 03-content-production, 06-measure-iterate
Sources: [Influencing title links](https://developers.google.com/search/docs/appearance/title-link)

## Meta description / snippet · meta-description
You can provide a description; Google may instead build the snippet from page content.

Suppose the description says “preserves transparency and supports batches”; verify both.

Do not confuse: Providing a description does not guarantee it appears verbatim.
Evidence: Compare the description, page text, and snippets for different queries.
Stages: 03-content-production, 06-measure-iterate
Sources: [Search snippets and meta descriptions](https://developers.google.com/search/docs/appearance/snippet)

Verified / 核验日期: 2026-10-10

Search intent, keyword grouping, and long-tail are working definitions for this guide. Linked Google guidance supplies background, not an official Google taxonomy or metric.
