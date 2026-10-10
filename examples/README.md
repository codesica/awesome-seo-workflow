# Synthetic SEO case studies

Four tiny, invented failures to inspect without touching a real website.

**Evidence label: SYNTHETIC.** These fixtures are authored examples, not captured HTTP responses, Search Console exports, real-site case studies, or proof of indexing improvements. All site URLs use example.com. No network requests or account access are needed.

## Run the lab

Requires Python 3. From the repository root:

```sh
python3 examples/verify.py
```

The script reads only these fixtures. It checks that each deliberately broken input fails its narrow check and each corrected input passes. A successful run means the lesson is internally consistent; it is not an SEO audit or Google indexing verdict.

## Four exercises

1. [Robots block](robots-block/README.md): permission to crawl.
2. [Accidental noindex](noindex/README.md): permission to index.
3. [HTML at an XML sitemap route](sitemap-html/README.md): inspect the response body.
4. [Conflicting canonicals](canonical-conflict/README.md): consistent preferred URL.

Each exercise follows input → observed problem → correction → acceptance. `catalog.json` is structured content for a lesson browser. `expected-results.json` records expected fixture outcomes, not external measurements.

## Try it yourself

1. Open a `before/` file and identify the exact evidence.
2. Explain why changing a different SEO setting would not address that evidence.
3. Compare its `after/` file.
4. Run the checker. Read its narrow acceptance criterion.
5. Write down what still cannot be established offline.

## Publishing and safe reuse

Keep this directory under `examples/`; never copy the broken robots.txt or metadata into a production root. Display raw source as escaped text or downloads rather than executing lesson HTML in the main page. The JSON response envelopes describe hypothetical HTTP responses: serving them from a static host does not reproduce those response headers.

No credentials, analytics data, private repository content, or personal contact information are included. Real evidence belongs in a separately approved, specifically scoped publication.
