# First Crawl: English Browser Skills

Three self-contained English translations of the First Crawl browser skill packages:

- [Inspect Google Search Console](inspect-search-console/SKILL.md)
- [Inspect Bing Webmaster Tools](inspect-bing-webmaster/SKILL.md)
- [Research Search Results](research-search-results/SKILL.md)

## Use a package
Keep the chosen skill directory intact, including SKILL.md, references/, and assets/. Read its input contract, output contract, and host-environment tool/permission instructions before execution. Each directory can be used independently; no file outside that directory is needed by its SKILL.md. These are distribution artifacts, not evidence of installation in any personal skill directory.

The English and Chinese editions use the same skill IDs and frontmatter. Choose one language edition per skill in an environment that resolves skills by name; do not rely on installing both under duplicate IDs. The Chinese source remains unchanged.

## Output and language compatibility
Each assets/result-template.json is an empty run record. Read the corresponding references/output-contract.md for array record fields, enums, evidence requirements, and examples. JSON keys, skill IDs, schema versions, status values, nulls, arrays, numeric defaults, and source-review dates are preserved. The top-level language metadata is en in this English edition; a null context.language remains unknown, never an inferred observation. Human-readable findings and summaries can follow the user's requested language.

The catalog preserves its original key structure. For English-only presentation, the legacy title.zh and summary.zh slots also contain English text; use title.en and summary.en for explicit English selection. instructionLanguage is en. No workflow features or permissions have been added.

## Verification limits
Source documentation was marked reviewed on 2026-10-10 in the source edition. Source URLs and dates are retained, not newly verified by this translation pass. validation.json is the original source-package validation record, copied unchanged for provenance. translation-validation.json records this edition's local translation/structure checks separately. Neither document proves a browser run, live-site behavior, current UI compatibility, or a successful installation. All execution templates remain NOT_RUN. No private accounts were accessed and no user computer was used.

See translation-manifest.json for the file-by-file source mapping and SHA-256 hashes, and LANGUAGE-COVERAGE.md for the language and compatibility check summary.
