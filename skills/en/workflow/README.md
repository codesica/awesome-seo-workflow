# First Crawl: English execution-skill package

Four independently usable skills, translated from the original Chinese workflow package without adding execution capabilities:

- `seo-opportunity-evidence/SKILL.md`: search opportunity evidence
- `seo-page-brief/SKILL.md`: page brief and intent
- `seo-publish-audit/SKILL.md`: publish technical audit, with bundled synthetic before/after references
- `seo-measure-decide/SKILL.md`: measurement and one bounded iteration decision

Read the selected SKILL.md directly. Each contains its own required inputs, steps, full JSON template, acceptance checks, stopping rules, permissions boundary and official-source links. No shared runtime or separate template file is required. The synthetic example at `examples/EXAMPLE.md` shows the four handoffs. Stages 03 and 05 remain unimplemented; translation does not add them.

## Evidence and validation

Status remains `source-reviewed`; production_status remains `NOT_RUN`. Official-source review dates are inherited from the source package (2026-10-10), not claims of a new web review during translation. No real site, search account, publication or indexing outcome was tested. Run `python qa/validate.py` for local structure/arithmetic checks, and `python qa/check-translation.py` for language and source-preservation checks when the original package is available at the path stated in the translation manifest.

## Preserved Chinese content

Executable instructions and required explanations are English. Original `zh-CN` metadata fields and `README.zh.md` companions are retained for bilingual compatibility. Raw Chinese HTML/link text in the synthetic input is intentionally unchanged, together with its `zh-CN` locale and lang checks. The English example guide explains this boundary. These are declared exceptions, not untranslated execution instructions.

## Packaging

Old ZIP archives and their stale download manifest were not copied. The repository build creates fresh English packages from this translated tree. The top-level `skills/locales.json` is the current source/download mapping; relative download fields in this category index are retained compatibility metadata. Download complete English packages at https://skills.yangluotong.top/en/skills/. Chinese source files are unchanged. See `qa/translation-manifest.json` for file-by-file source mappings and hashes.
