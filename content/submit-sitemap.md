---
title: "Submit a Sitemap and Understand What the Result Actually Means"
slug: "submit-sitemap"
description: "Find and validate your sitemap, submit it through official webmaster tools, and distinguish processing success from page indexing."
level: "Beginner"
lastReviewed: "2026-10-10"
---

# Submit a Sitemap and Understand the Result

A sitemap is a list of URLs you want a search engine to discover. It is not an instruction that forces indexing or ranking. This exercise ends with a submission record and a separate check of one important page.

## Inputs and access

You need your site's public origin, a sitemap URL, and a short list of pages that should appear in search. Account submission requires signing in to the official search-engine service and having the necessary site permissions. Google requires owner permission for submission through its Sitemaps report.

The workflow uses free official interfaces. A Skill may explain a report you choose to share, but it cannot authenticate itself or read your account just because you installed it. Keep credentials and verification secrets out of chat prompts and GitHub.

## 1. Find the existing sitemap first

Check your CMS or site generator's settings and documentation. Look in `/robots.txt` for a `Sitemap:` line. Common filenames include `/sitemap.xml` and `/sitemap_index.xml`, but these are conventions, not guaranteed addresses.

Open the candidate URL while signed out. You should see a sitemap document, not a login screen or your site's normal homepage. An XML sitemap contains URL entries; a sitemap index points to child sitemaps. If you have an index, open one child to confirm that it also works.

Do not create a second competing generator just because the first filename you guessed was missing. Identify which system maintains the existing file.

## 2. Check the inventory before submitting

Choose three important published pages, or every page if the site is smaller. For each, check that the sitemap contains the intended final URL and that the page opens successfully. Exclude private pages, deliberately excluded pages, obsolete redirects, and accidental duplicates from your intended search inventory.

For a tiny static site without a generator, the following is an illustrative starting structure, not a file to deploy unchanged:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://example.com/</loc></url>
  <url><loc>https://example.com/guides/seed-starting/</loc></url>
</urlset>
```

Use full absolute URLs and valid UTF-8 XML. Escape characters such as `&` as `&amp;` inside XML values. A single sitemap is limited to 50,000 URLs and 50 MB uncompressed; split larger inventories and use an index. If you provide `lastmod`, use an accurate significant content-update date, not the time every build ran. Google's [sitemap construction guide](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap) documents these requirements.

Publish through your normal authorized workflow. Reopen the deployed file before proceeding. A local file on your laptop has not yet become a publicly reachable sitemap.

## 3. Submit in Google Search Console

Open [Google Search Console](https://search.google.com/search-console), sign in, and select the property covering the sitemap's actual host and protocol. Open Sitemaps. Enter the sitemap address in Add a new sitemap, respecting any prefix already displayed, and submit.

Copy the exact reported status and last-read date into your log. If the interface does not let you submit, check the property and your permissions rather than repeatedly trying another account.

Interpret the result carefully:

- **Success:** Google fetched and parsed the sitemap. This does not say every listed page was indexed.
- **Couldn't fetch:** Investigate access to the sitemap itself.
- **Sitemap had errors:** Open the details and preserve the specific parsing or URL error before editing.

Google's report lists sitemaps submitted through that report or its API; a file discovered only through robots.txt need not appear there. This workflow deliberately uses the interface, not an API integration. See the [Sitemaps report help](https://support.google.com/webmasters/answer/7451001).

## 4. Submit in Bing Webmaster Tools

Open [Bing Webmaster Tools](https://www.bing.com/webmasters), sign in, and select the correct verified site. In Sitemaps, first check whether the file is already known, imported, or discovered. If needed, use Submit sitemaps and provide the public sitemap URL.

Record the processing status, last processing date, and discovered URL count. These are sitemap-processing observations, not a promise of search traffic. Bing documents these fields in its [Sitemaps help](https://www2.bing.com/webmasters/help/sitemaps-3b5cf6ed).

Do not use old anonymous “ping” URLs copied from outdated tutorials. Bing [removed anonymous sitemap submission](https://blogs.bing.com/webmaster/2022/5/Spring-cleaning-Removed-Bing-anonymous-sitemap-submission/); use the official interface or a sitemap reference in robots.txt.

## 5. Verify one page independently

Pick your most important listed page. Inspect it in the available webmaster account and save its actual index status. If you run a live fetch test, record that separately. Search engines still have to crawl and assess submitted pages; Bing explicitly explains this in [Why is my site not in the index?](https://www.bing.com/webmasters/help/why-is-my-site-not-in-the-index-2141dfab).

Your output should look like this blank record, filled only with observed facts:

```text
Site / sitemap URL:
Expected important URLs and sample checked:
Public file checked at:
Google submitted at / status / last read / not checked:
Bing submitted at / status / last processed / not checked:
Sample page URL and actual index-status evidence:
Unresolved issue and next check:
```

## Worked record: the sitemap is actually HTML

**Synthetic example. Not a live result.** Use the [sitemap-HTML teaching example](/examples/#sitemap-html). Its response metadata and body are invented fixtures, not captured server output. The intended input is `https://example.com/sitemap.xml`, listing `https://example.com/trail-guide/`.

```text
Site / sitemap URL: https://example.com/ / https://example.com/sitemap.xml
Expected important URL: https://example.com/trail-guide/
Public file checked at: Not live-tested; synthetic fixture review only
Modeled response: 200; text/html; body is a generic HTML page
Google submitted at / status / last read: Not submitted / Not checked / Not checked
Bing submitted at / status / last processed: Not submitted / Not checked / Not checked
Sample page index-status evidence: Not checked
Unresolved issue: Sitemap route serves an HTML app shell instead of XML
Next check: Maintainer fixes the route; verify deployed XML before submission
```

What each field tells you:

- **Site / sitemap URL** separates the website origin from the specific file being diagnosed.
- **Expected important URL** is the intended inventory input, not a claim that a crawler found or indexed it.
- **Public file checked at** deliberately contains no pretend live-check time.
- **Modeled response** demonstrates why a success status code alone is insufficient: the body is the wrong document type for this XML workflow.
- **Google submission fields** are unfilled observations, not a failed submission. The file should be corrected before account submission.
- **Bing submission fields** make the same distinction for the other service.
- **Sample page index-status evidence** remains unknown even if the replacement XML looks correct.
- **Unresolved issue** names the specific defect rather than calling the entire site “bad for SEO.”
- **Next check** gives a bounded action and verification sequence. The example's corrected fixture contains one absolute URL; a real deployment and account result must be checked separately.

If access itself fails, return to [the crawlability walkthrough](/guides/crawlability/). After sitemap processing, continue with [the one-page review](/guides/page-check/).

## Troubleshooting without guesswork

- **HTML instead of XML:** A catch-all route may be serving the app shell. Ask the maintainer to check the sitemap route and deployed file.
- **Login or access denial:** Keep private content private. For an intended public sitemap, investigate its specific route's access policy.
- **XML error:** Preserve the line and message. Fix malformed tags or escaping in the generator, then republish and retest.
- **Unexpected URL count:** Check child sitemaps, filters, duplicates, and processing time before claiming missing pages.
- **Success but no indexed sample:** Inspect the page for crawl blocks, exclusion directives, duplicate selection, or content problems. Repeated submission is not evidence of progress.

Return after processing or after a real fix, and compare the actual result. Completion means a valid submission record and an honest account of what remains unknown, not an invented ranking win.
