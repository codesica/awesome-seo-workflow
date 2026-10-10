# First Crawl v2 learning workflow content

## Integration contract

- `workflow.json`: canonical bilingual content. Localized values have exactly `zh-CN` and `en` keys.
- `workflow.zh.json` / `workflow.en.json`: ready-to-render localized snapshots with string values. Both preserve the same IDs and source mappings.
- `zh/` and `en/`: complete homepage, six stage pages, source list, and blank output templates in Markdown.
- `templates.json`: six blank deliverables. `value: null` means unfilled, never a measured zero.
- Stable stage IDs are the six `stages[].id` strings. Never translate IDs. Use `contentId` for content references and `actions[].id` for action anchors.
- Routes are proposed contracts, not proof that routes exist on the current site. Route locale `zh` maps to content locale `zh-CN`; `en` maps to `en`.
- Resolve relative links when importing. Existing tutorials must be looked up against the actual destination router; their recorded slugs are identifiers, not verified live links.
- The currently referenced brand host is skills.yangluotong.top. No deployment or host change is performed by this package.
- Render source URLs as ordinary external links. Every source was opened through web retrieval on 2026-10-10; the date is editorial verification, not a claim about the user's site.

## Stage page order

Entry requirement → goal → prerequisite concepts → inputs → actions (instruction + concrete output) → tools → deliverables → acceptance → stop conditions → next step → official sources.

Page sidebar may contain stage order and next/previous links. Show clear locale switching, preserve current stage, and keep full content available rather than only translating navigation.

## Homepage order

1. Outcome-based headline and clear promise limits.
2. Start selector for six existing progress states.
3. Six-stage route, each with one goal and one deliverable.
4. Tutorial versus Agent Skill explanation.
5. Evidence boundary and official sources.
6. Example exercise and blank templates.

The progression is a loop, not a forced onboarding funnel. Existing sites may enter any stage when its inputs exist. Technical blockers go back to stage 4, need/page mismatch to stages 1–2, content problems to stage 3.

## Evidence and release boundaries

All six stage texts have status `editorially-reviewed-not-site-tested`. This means the curriculum is written and official factual guidance checked; it is not a real-world SEO result.

The legacy crawlability/sitemap/page-check tutorials support stage 4 only. This content package did not rerun their fixtures, test a live user website, sign into Search Console, submit any sitemap, install a Skill, publish content, or send promotion. Do not display a global “all stages verified” badge.

Distinct UI badges should mean different things: content reviewed, skill metadata reviewed, local fixture passed, or live target verified. A source-check date must not be reused as a execution-test date.

Six-stage coverage means the complete beginner working loop, not exhaustive coverage of every SEO specialty. Large-site crawling, JavaScript rendering diagnosis, structured-data eligibility, migrations, local listings, ecommerce feeds, international targeting, and log analysis can become optional deeper tracks when a real task requires them. Do not imply those tracks have been implemented here.

The content is original teaching design and paraphrase, with primary-source attribution. No third-party SEO copy is republished. The parent repository should apply its chosen code/content licenses explicitly; this package does not assume every upstream Agent Skill has the same license.

## Rebuild and check

`python build_content.py` regenerates the canonical/localized content and Markdown. `python add_templates.py` generates templates. `python validate.py` validates IDs, locales, fields, source references, legacy placement, null template values, and Markdown presence. Python standard library only.
