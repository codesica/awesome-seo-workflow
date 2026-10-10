# Diagnose the stage that blocks discovery

Public-source research checked on 2026-10-10. This is a proposed exercise, not a completed audit or evidence of results. The example is wholly fictional.

## The decision

Is the problem fetching, rendering, index permission, canonical selection, discovery, or simply an index record that has not updated? “The page is live” does not identify a search failure. Check one exact URL before proposing a whole-site rewrite.

## Inputs

Bring the exact public URL, its expected canonical, the sitemap URL and intended index policy. Use only URLs you may access. Owner reports can be supplied later; no account access or submission is required for this exercise. If those reports are unavailable, index status stays UNKNOWN.

## Actions and branches

1. **Response:** Save the GET time, input URL, each redirect status and Location, final URL, headers and relevant body. Inspect an error page that returns 200 as a possible soft-error condition. A 200 response meets only part of Google's technical requirements, not proof of indexing. (S09)
2. **Permission:** Compare the matching robots.txt rule, HTML robots meta and X-Robots-Tag for the intended crawler. Robots controls crawling; noindex controls indexing. A crawler blocked from the page cannot read its noindex. For the same crawler, conflicting HTML robots meta and X-Robots-Tag directives use the more restrictive value. Evaluate robots.txt separately under its path-matching rules: the most specific matching path takes precedence; for equally specific conflicting rules, Google uses the less restrictive rule. (S31) Verify the intended policy before changing it. (S10, S27)
3. **Current versus recorded:** Keep Google indexed inspection and Live Test in different columns, including their timestamps. Live eligibility is not indexed status or a prediction of Google's canonical. Bing Index and Live URL are also distinct. Bing Live does not automatically follow redirects; Google Live follows them but does not show the final tested URL. Retain your independent redirect trace. (S10, S11)
4. **Rendering:** Compare raw and rendered title, main text, crawlable links, canonical and robots instructions. Inspect blocked resources and errors. Client-side rendering is not automatically an SEO failure; missing content or inaccessible resources are the relevant evidence. An initial noindex is not safely undone by hoping JavaScript will remove it. (S12)
5. **Canonical and discovery:** Record intended, declared and engine-selected canonical separately. Look for internal links and sitemap inclusion. An alternate duplicate not indexed on its own can be expected. Do not migrate canonical URLs solely because a preferred URL looks cleaner. (S10)
6. **Sitemap:** Check file retrieval, parse status, last read and discovered URLs independently of page status. A locally successful fetch can coexist with a different engine processing result. “Success” and a discovered count do not prove those pages are indexed. Inspect a small page sample separately. (S13)
7. **Correction and follow-up:** Change only a confirmed unintended condition through the site's normal review process. Read back the deployed response and content. Record “current block removed; index update pending” when that is all you know. Google recrawl requests have quotas, provide no inclusion guarantee, and repeated requests do not speed crawling. (S28)

IndexNow notifies participating engines of URL changes; a successful response acknowledges receipt rather than indexing. Google's Indexing API is restricted to eligible job pages and livestream pages using the specified structured data; it is not a general tutorial-page submission tool. This module performs neither submission. (S29, S30)

## Worked output — fictional

In an invented response fixture for `https://example.com/packing/rain/`, the page returns 200, the body contains its main answer, HTML says index, and the HTTP header says noindex. The sitemap includes the URL. The hypothetical finding is a conflicting unintended directive, if public indexing is indeed intended. After a proposed narrow correction, a new response without noindex would establish only that this response block is gone. The engine-selected canonical and indexed record remain unknown. No network request to this example has been executed.

## Deliverable and evidence

Complete one diagnosis record: expected policy → timed observation → implicated stage → alternative explanation → proposed change → read-back evidence → recheck condition. Preserve exact response snippets and owner-supplied report scope privately; do not publish account screenshots. A successful local HTTP test, a simulated fixture and a search-engine test must have different labels.

## Failure limits

Do not infer a server's cause from one status code, treat all temporary redirects as defects, equate sitemap retrieval with inclusion, or label a whole site indexed from one URL. When conditions look eligible but indexing has not occurred, the cause may remain UNKNOWN; avoid a promise to force indexing.

## Bounded agent task

“Read only these authorized public URLs and supplied report excerpts. Build a stage-by-stage diagnosis with timestamps and response traces. Distinguish observed blocking conditions from unknown engine decisions. Do not change robots, canonical, account settings, deploy, submit URLs or create credentials.”

## Public sources

- [Technical requirements](https://developers.google.com/search/docs/essentials/technical) (S09; checked 2026-10-10).
- [URL Inspection tool](https://support.google.com/webmasters/answer/9012289?hl=en) (S10; checked 2026-10-10).
- [URL Inspection](https://www.bing.com/webmasters/help/url-inspection-55a30305) (S11; checked 2026-10-10).
- [JavaScript SEO basics](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics) (S12; checked 2026-10-10).
- [Sitemaps report](https://support.google.com/webmasters/answer/7451001?hl=en) (S13; checked 2026-10-10).
- [Robots meta and X-Robots-Tag specifications](https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag) (S27; checked 2026-10-10).
- [Ask Google to recrawl your URLs](https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl) (S28; checked 2026-10-10).
- [IndexNow documentation](https://www.indexnow.org/documentation) (S29; checked 2026-10-10).
- [Indexing API Quickstart](https://developers.google.com/search/apis/indexing-api/v3/quickstart) (S30; checked 2026-10-10).

- [How Google interprets the robots.txt specification](https://developers.google.com/crawling/docs/robots-txt/robots-txt-spec) (S31; checked 2026-10-10).
