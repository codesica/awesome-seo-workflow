# Use a Awesome SEO Workflow Skill

English · [简体中文](USAGE.zh-CN.md) · [Project README](README.md)

Start with the [introduction](https://skills.yangluotong.top/en/start/) if you are learning SEO. The four-line paper exercise needs no Skill, account, or installation. Use a helper when you understand the task and can judge its output.

## Pick one task

| Skill name | Task | Inputs you need |
| --- | --- | --- |
| `research-search-results` | Observe public search results and representative pages | A question, audience/language, bounded scope, and an authorized browser |
| `seo-opportunity-evidence` | Organize evidence for one useful page idea | Supplied or authorized audience questions, observations, or feedback |
| `seo-page-brief` | Plan one page | A need, the reader's task, available evidence, and existing-page context |
| `seo-publish-audit` | Check publication evidence | The intended public URL and available HTML, headers, robots, sitemap, language, and link evidence |
| `inspect-search-console` | Read Google search and indexing reports | An exact website property, dates/filters or URL, and existing report access |
| `inspect-bing-webmaster` | Read Bing indexing and existing sitemap reports | An exact site/URL, question, and existing report access |
| `seo-measure-decide` | Choose one change from compatible evidence | Observations, dates/filters, change records, and a baseline if available |

There is no dedicated page-building Skill or automatic outreach Skill. Browser packages require a compatible browser/computer tool in the assistant's current environment. Local analysis packages do not acquire missing evidence or account access automatically.

## Select Chinese or English

- English source: `skills/en/browser/<name>/` or `skills/en/workflow/<name>/`.
- Chinese source: `skills/browser/<name>/` or `skills/workflow/<name>/`.
- [English downloads](https://skills.yangluotong.top/en/skills/) and [Chinese downloads](https://skills.yangluotong.top/zh/skills/) label the package language explicitly; either page also links the other version.
- Each ZIP extracts to `<name>/SKILL.md` with its required relative references and assets. Combined ZIPs contain the seven named folders. The `first-crawl-execution-skills.zip` filenames remain stable after the repository rename to `awesome-seo-workflow`. Review the whole package, including references and the MIT license.

Use one language per Skill name in one installation. The entry filename stays `SKILL.md`, and the frontmatter `name` is the same. A second language copy is an alternative, not an additional same-named installation. Other hosts have their own Skill discovery rules; broad host compatibility has not been executed or certified.

## Install only if you choose to

The website does not install anything. For Codex, copy the selected complete folder into your configured Skill location, such as `~/.codex/skills/`. Keep referenced files beside `SKILL.md`; copying only that entry file is insufficient for browser Skills and the publication audit fixtures.

For example, from a repository checkout, **when the destination does not already contain this Skill**:

```sh
mkdir -p ~/.codex/skills
cp -R skills/en/browser/research-search-results ~/.codex/skills/
```

For Chinese, use `skills/browser/research-search-results` instead. If the name is already installed, inspect it and back it up before replacing that folder; do not nest another same-named directory inside it. Use your host's normal reload/discovery process. An invocation example is `$research-search-results`; its availability depends on the host discovering the selected folder.

Installing instructions does not run them. All seven published packages remain **live-site NOT_RUN**. Installation does not grant browser access, account permissions, authorization to publish, or permission to send messages.

## Give the helper a bounded request

State the task, what it may read, the site/page or artifacts, dates and filters when relevant, and where to save the result. For example:

> Use $seo-opportunity-evidence on the audience question and notes I supply. Keep unsupported demand and search volume unknown. Return one evidence-linked opportunity record and its next validation step. Do not publish or send anything.

Read the Skill's input contract and required references before execution. Missing access, unclear site identity, inconsistent data, or an unavailable tool should produce a clear blocker or unknown; they must not produce a fabricated pass. A paid service is not required by the original local analysis instructions, but your assistant/model or optional host tools may have their own costs.

## Read the result

Field names and enum/status values stay English so programs can consume the same schema. Explanations and report prose can use your chosen language. Browser Skills include translated `references/output-contract.md` and blank `assets/result-template.json`; workflow Skills explain their inline JSON fields in the selected `SKILL.md`.

- `null` means missing or unknown; it is not zero. Empty arrays do not prove that no problems exist.
- `NOT_RUN` means the stated live execution did not occur. Source review or analysis of a supplied screenshot does not make a browser run complete.
- Actual browser work can record `COMPLETE`, `PARTIAL`, or `BLOCKED` for that specific run under its contract. A completed report is not proof of indexing, rankings, growth, or successful use of a page.
- `observed`, `provided`, `inferred`, and `unknown` distinguish evidence provenance. Keep source, time, page context, and limitations.
- The blank templates and synthetic examples are teaching material, not reports from your website. Preserve unknown indexing/traffic and do not substitute their fictional numbers for real data.

Check the evidence and completion criteria yourself. Instructions translated into English have the same scope and limitations as Chinese instructions; translation adds no execution evidence.

## Build or contribute

See [README.md](README.md) for local preview and publishing, [CONTRIBUTING.md](CONTRIBUTING.md) for bilingual maintenance, and [THIRD_PARTY.md](THIRD_PARTY.md) for optional external projects. The seven original download packages do not bundle third-party Skill code or instructions.
