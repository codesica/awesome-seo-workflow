# Contributing

English · [简体中文](CONTRIBUTING.zh-CN.md) · [Project README](README.md)

Start with one correction or one complete teaching example. Explain the reader problem, the proposed change and how you verified it. Use official primary sources for factual search-engine behavior, and retain the source-review date and pinned Skill commit.

Keep source review, runtime execution and data provenance separate. Do not label an unrun Skill as tested. An executed example needs its command, version, input scope, output and limitations. Synthetic examples must say so beside their inputs and findings. Unknown indexing, rankings or traffic remain unknown.

Use original example.com fixtures. Do not include real account screenshots, secrets, cookies, tokens, personal email addresses, private URLs, customer exports, internal paths or third-party Skill source without appropriate permission. Review source, generated HTML and downloadable files before proposing public changes.

Build with `npm ci --ignore-scripts && npm run build`. Inspect any changed route in the browser, its links, small-screen layout, keyboard behavior and code-copy/download controls. A content-only change does not need a new testing framework. Preserve one main heading, unique title and description, canonical URL and meaningful link text. Do not change another production project or purchase a domain as part of a contribution.

Original contributions are accepted under this repository's MIT license. Linked third-party projects are outside that license.

## Maintain both languages

Keep English project documents in README.md, USAGE.md, CONTRIBUTING.md and THIRD_PARTY.md, with corresponding *.zh-CN.md files and reciprocal language links. Update both versions for a change in behavior, prerequisites, or evidence limits.

The Chinese Skill entrypoints remain under skills/browser and skills/workflow. Full English counterparts are under skills/en/browser and skills/en/workflow. Each selected language folder must include a discoverable SKILL.md and every referenced relative file. Preserve the Skill name, machine keys, enum values, nulls, and live-site NOT_RUN provenance. Translation is not an execution test. Do not translate immutable raw run/fixture evidence into a different claimed observation.

Run `python3 scripts/validate-skill-locales.py` and `npm run build:release` after changing Skill instructions or packaging. Check each language's full ZIP, relative references, license, raw instruction download, and website language links. Keep old Chinese download addresses working; prefer explicit /downloads/skills/zh/ and /en/ paths for new links. Update catalogs, website package text, and reference explanations together.

Run `npm run check` for the single offline check: synthetic fixtures, content IDs, internal links/anchors, complete zh/en packages, and release version/commit/checksums. This project has no automatic GitHub Actions workflow. Keep checks local; add or run Actions only when the user explicitly requests it. Keep private thread IDs, handoff notes and personal machine paths out of public source and release assets. For a new release, change `site.config.mjs` version first; publish a new tag and do not replace existing fixed-version assets.
