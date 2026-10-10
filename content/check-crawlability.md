---
title: "Can Search Engines Reach Your Page? A Beginner Crawlability Check"
slug: "check-crawlability"
description: "Check a public page's response, robots rules, and indexing directives, then verify what Google or Bing can actually fetch."
level: "Beginner"
lastReviewed: "2026-10-10"
---

# Can Search Engines Reach Your Page?

A page can work in your signed-in browser and still be inaccessible to search engines. This walkthrough helps you separate four questions: Does the address respond? Can a crawler fetch it? Is indexing allowed? Has a search engine actually indexed it?

Your deliverable is a small evidence log and one prioritized next action. You are not trying to produce a perfect SEO score.

## What you need

- One public URL you own or are authorized to inspect, such as `https://example.com/guides/seed-starting/`. Replace this illustrative address with yours.
- A browser. Developer Tools are optional; no paid API is required.
- Optional access to the matching property in Google Search Console or Bing Webmaster Tools.

A downloadable Skill can guide this process or analyze evidence you provide. Installing one does not grant it Google or Microsoft account access, verify site ownership, or authorize changes. Sign in yourself through the official service. Do not paste passwords, cookies, tokens, or private account exports into a public repository.

## 1. Define the intended result

Write down whether this page should be public and searchable. A customer account page, staging site, or private dashboard may correctly block crawlers. Do not remove authentication or weaken security to make a private page pass this exercise.

Open the URL in a signed-out or private browser window. Note the final address after navigation. Can you read the main content without signing in, clicking a challenge, or dismissing an access gate? Save the time and your observation.

## 2. Inspect the actual response

Open Developer Tools, select Network, reload the page, and select the document request rather than an image or script. Record its status and any redirects. Inspect the Response tab to confirm that the body contains the intended page rather than an error message.

For a terminal alternative, this command performs a GET request and saves its evidence locally:

```sh
curl --location --max-redirs 5 --max-time 30 \
  --dump-header crawl-headers.txt --output crawl-page.html \
  --write-out 'Final URL: %{url_effective}\nStatus: %{http_code}\n' \
  'https://example.com/guides/seed-starting/'
```

Do not disable certificate verification to force a result. If the command fails, save the error and investigate it. These files show what this client received, not what Googlebot received.

For a page intended for indexing, look for a final `200` response with substantive content. A `200` attached to a “page not found” screen is still a problem. A redirect is not automatically wrong; inspect its destination. Google documents a working response and indexable content among its [technical requirements](https://developers.google.com/search/docs/essentials/technical).

## 3. Check crawl rules and indexing rules separately

Open the exact origin's `/robots.txt`, for example `https://example.com/robots.txt`. Record rules that apply to your page and the crawler under investigation. A `Disallow: /` in the applicable group blocks crawling across that origin. More specific groups and matching paths can change the result; do not conclude “allowed” after reading only the first group. Missing robots.txt is not automatically a fault. Robots rules govern crawling and do not protect confidential information. See Google's [robots.txt introduction](https://developers.google.com/search/docs/crawling-indexing/robots/intro).

Next, inspect the page's HTML head for robots meta directives and its response headers for `X-Robots-Tag`. Record any `noindex` or crawler-specific rules. If the page should appear in search, an unintended `noindex` needs attention. However, a crawler must be able to fetch the page to observe that instruction: blocking the same page in robots.txt can prevent that. Google's [noindex guide](https://developers.google.com/search/docs/crawling-indexing/block-indexing) explains this distinction.

## 4. Verify with a search engine, when you have access

In Google Search Console, select the matching property and inspect the full page URL. Record the existing index report separately from a new Test live URL result. Inspect the tested HTML when available, checking for your actual heading and a sentence from the main content. The stored report and the live test answer different questions; neither a public fetch nor a successful live test proves a new indexing event. See [URL Inspection documentation](https://support.google.com/webmasters/answer/9012289).

In Bing Webmaster Tools, choose the verified site, open URL Inspection, and inspect the same address. Keep the Index result separate from Live URL. Bing's live inspection identifies redirects and lets you inspect the destination separately. See [Bing URL Inspection](https://www.bing.com/webmasters/help/URL-Inspection-55a30305).

Without property access, stop at public evidence and label search-engine observations “not checked.” Ask the owner to run the account-only test. Do not invent a dashboard result.

## Save your output

```text
URL and intended audience:
Checked at, including time zone:
Final URL and response status:
Visible main content:
Applicable robots rule and evidence:
Meta/header indexing directives:
Google stored result / live result / not checked:
Bing stored result / live result / not checked:
Next action, owner, and retest condition:
```

## Worked record: a crawl block

**Synthetic example. Not a live result.** The input is the [robots-block teaching example](/examples/#robots-block), representing a public trail guide at `https://example.com/trail-guide/`. No HTTP request, account inspection, or production change is claimed.

```text
URL and intended audience: https://example.com/trail-guide/; public readers
Checked at: Not live-tested; synthetic teaching record
Final URL and response status: Not checked; fixture only contains robots rules
Visible main content: Not checked
Applicable robots rule: User-agent: * / Disallow: /
Meta/header indexing directives: Not checked
Google stored result / live result: Not checked / Not checked
Bing stored result / live result: Not checked / Not checked
Next action: Site owner confirms public intent, removes the accidental block,
then runs the complete live page check after deployment
```

Read the fields in order:

- **URL and intended audience** define the target and establish why a crawl block would be unwanted in this scenario.
- **Checked at** identifies the evidence as teaching material. There is no fabricated crawl timestamp.
- **Final URL and response status** remain unknown because a robots file does not contain a page response.
- **Visible main content** is unknown for the same reason; do not infer it from a URL's name.
- **Applicable robots rule** identifies the concrete issue in this simple fixture: the wildcard group blocks every path. This is the basis for the finding.
- **Meta/header indexing directives** require separate page evidence, which this example does not supply.
- **Google and Bing results** require account observations; all four remain explicitly unchecked.
- **Next action** assigns the decision to the owner and defines the retest. An offline corrected rule only demonstrates changed crawl permission, not live access or indexing.

Continue with [the sitemap walkthrough](/guides/sitemap/) once you understand the access result.

## If something fails

- **401, 403, login, or challenge:** Determine whether the restriction is intentional. For an intended public page, ask the site operator to investigate the relevant access or bot-security logs. Never disable protection site-wide as a diagnostic shortcut.
- **404 or wrong destination:** Confirm the published path and routing. Update links only after choosing the intended address.
- **500-class response or timeout:** Give the host the exact URL, time, and response evidence.
- **Browser works; search-engine test fails:** Compare timestamps and returned content. Caches, rendering, and access controls are possible causes, not established diagnoses.
- **All checks pass; page is absent:** Crawlability is only one prerequisite. Continue to sitemap and page-quality checks; do not promise an indexing deadline.

After an authorized fix is deployed, repeat the same checks and keep before-and-after evidence. Finish when you have either verified the corrected behavior or identified a specific blocker and its owner.
