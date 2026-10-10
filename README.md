# First Crawl

English · [简体中文](README.zh-CN.md)

A beginner SEO course and seven original Agent Skills. Follow one fictional five-minute timer example to understand how search can lead to a useful page, then complete one small task at a time. The examples do not establish real demand, indexing, rankings, traffic, or income.

[English website](https://skills.yangluotong.top/en/) · [中文网站](https://skills.yangluotong.top/zh/) · [Using the Skills](USAGE.md) · [Contributing](CONTRIBUTING.md)

## Choose your language

The website, beginner lessons, three full technical guides, and project usage/contribution documents are available in Chinese and English. Each of the seven original Skills has a complete instruction entry and required references in both languages. JSON machine keys and status values stay the same across languages.

| Material | English | 简体中文 |
| --- | --- | --- |
| Project introduction | This README | [README.zh-CN.md](README.zh-CN.md) |
| Use and install a Skill | [USAGE.md](USAGE.md) | [USAGE.zh-CN.md](USAGE.zh-CN.md) |
| Contribute | [CONTRIBUTING.md](CONTRIBUTING.md) | [CONTRIBUTING.zh-CN.md](CONTRIBUTING.zh-CN.md) |
| Original Skill sources | [skills/en/](skills/en/) | [skills/browser/](skills/browser/), [skills/workflow/](skills/workflow/) |
| Download all seven | [English ZIP](https://skills.yangluotong.top/downloads/skills/en/first-crawl-execution-skills.zip) | [中文 ZIP](https://skills.yangluotong.top/downloads/skills/zh/first-crawl-execution-skills.zip) |
| Attribution | [THIRD_PARTY.md](THIRD_PARTY.md) | [THIRD_PARTY.zh-CN.md](THIRD_PARTY.zh-CN.md) |

Choose one language version of each Skill. Its directory still contains a discoverable `SKILL.md`; the name, machine schema, and scope are unchanged. Do not install both same-named versions in one assistant's Skill directory. The older `/downloads/skills/<id>.zip` and combined ZIP addresses remain Chinese-compatible aliases.

## Learn, then use a helper

The [introduction](https://skills.yangluotong.top/en/start/) is separate from lesson 1. Write four lines on your own paper or in your document: whom the page helps, the task, possible help, and unknowns. No website, account, or upload is needed for that exercise.

The [six lessons](https://skills.yangluotong.top/en/roadmap/) cover needs, page planning, content production, publication checks, discovery/promotion, and evidence-led improvement. The existing-site route uses pages you manage that are intended to be public. Keep private pages private. A draft is not a working tool or a published site.

Each lesson puts the small task, completed fictional example, your path, and completion criteria first. Open detailed technical checklists and optional Skills when needed. All six stable stage IDs and 25 original actions remain available.

## Run locally

Requires Node.js 22+ and Python 3. Skill packaging uses the Python standard library.

```sh
npm ci --ignore-scripts
npm run build
PORT=4180 npm run preview
```

Open `http://127.0.0.1:4180/en/` or `/zh/`. `npm run dev` uses port 4173. The build creates `dist/`; it does not install or execute any Skill.

## Source layout and routes

- `content/beginner/`: the bilingual homepage, introduction, and one-task teaching layer.
- `content/workflow/`: six bilingual stages, 25 actions, official sources, and six blank templates.
- `content/concepts/`: 23 bilingual concept explanations.
- `content/` and `content/zh/`: the three original English and Chinese technical guides.
- `skills/browser/` and `skills/workflow/`: retained Chinese Skill entrypoints.
- `skills/en/browser/` and `skills/en/workflow/`: self-contained English entrypoints and required resources.
- `scripts/content-routes.mjs`: stable content IDs and language routes.
- `scripts/package-skills.py`: builds both language download sets and compatibility aliases.

Every page has corresponding `/en/` and `/zh/` routes, its own canonical, and reciprocal hreflang. Unprefixed legacy routes lead to Chinese equivalents and remain outside the sitemap. Raw evidence downloads are language-independent; translated instructions have explicit language paths.

## Evidence and limits

All seven original Skills remain source-reviewed and **live-site NOT_RUN**. Synthetic structure and arithmetic checks are separate from actual SEO execution. Browser Skills use an existing authorized session. A translated package does not grant login, data access, submission, publishing, messaging, or paid-tool permissions.

The four offline fixtures are synthetic. One fixed-version `seo 0.2.41 audit-page` CLI path was actually run against synthetic HTML over loopback HTTP. The after report still contains `canonical_mismatch`; it is not an indexing result or an all-clear. Read [runs/local-seo/README.md](runs/local-seo/README.md).

Stage 3 has no dedicated production Skill. Stage 5 has read-only Bing inspection, not automated promotion. The paper route teaches planning and evidence interpretation; it does not build the example timer. Editorial review and browser QA are not a real beginner usability test.

```sh
python3 examples/verify.py
python3 content/workflow/validate.py
python3 scripts/validate-skill-locales.py
npm run build:release
```

These checks validate the stated local scope, not indexing, rankings, growth, or end-to-end agent execution.

## Publishing and licensing

The confirmed origin is `https://skills.yangluotong.top`, served by the existing `lab-seo-starter-skills` Cloudflare Worker. `npm run deploy` builds a release and updates that Worker. `/build-info.json` records the release version, source commit, and 60 indexable routes. Publishing uses the existing configuration and permissions.

Original code, tutorials, examples, and the seven original bilingual Skills are [MIT licensed](LICENSE). Linked third-party projects retain their own licenses and are not included in these seven-Skill downloads. See [attribution](THIRD_PARTY.md).
