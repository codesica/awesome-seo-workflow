# 内容与调研的本地校验约定 Content and research validation contract

## 当前实现 / Implemented local checks

`npm run check` builds the site and runs `scripts/validate-standards.py` alongside the existing content/Skill checks. `npm run check:standards` validates an existing `dist` build. These commands are offline and do not trigger Actions.

The current implementation checks the seven image records, original hashes when originals are present, all WebP hashes/dimensions/byte counts, responsive paths/loading/alt/dimensions, bilingual route correspondence, decorative emoji, and the evidence/QA fields and execution statuses described below. A clean checkout without ignored originals reports the actual original-check count; it does not claim to have inspected them. Originals are retained under `output/imagegen/originals/`; web variants and exact public generation records are under `public/images/editorial/`.

`evidence-record.template.json` and `content-qa-checklist.json` are checked as templates, never completed research. New records can be placed in `content/evidence/` or `content/qa/`. Existing content keeps its original schema and checks. The extended proposed command below is a future interface; it has not been implemented. Automated success does not certify aesthetic quality, source support, human testing or business results.


这是建议接口与字段契约，不代表已经实现了校验器，也不会创建或触发 GitHub Actions。先作为显式本地命令接入现有项目；任何自动化工作流另行取得授权。

This is a proposed interface and field contract, not an implemented validator. It does not create or trigger GitHub Actions. Start with an explicit local command; obtain separate authorization for automated workflows.

## 建议接口 Proposed interface

`validate-content-research --content <content-metadata.json> --evidence <record-or-directory> --qa <qa-record.json> --mode structure|release --report <report.json>`

命令本身不联网、不执行技能、不上传材料、不修改输入。退出码：`0` 本地检查通过；`1` 已发现不符合项；`2` 配置、解析或运行失败。报告列出检查 ID、严重程度、状态、文件/字段位置、证据及修复建议。任何内容完整性或隐私扫描通过都不能输出“已验证业务效果”。

The command is read-only and offline. It must not run skills or upload material. Exit codes: `0` local checks passed; `1` noncompliance found; `2` configuration, parsing, or execution failure. Report check ID, severity, status, file/field locator, evidence, and suggested fix. Structural or privacy-scan success must never become a claim of business validation.

`structure` 允许 `record_kind: template` 的空值，但必须报告“模板，非研究结果”；`release` 必须拒绝模板、未替换占位符，以及必需审核的 `NOT_RUN`/`BLOCKED`/`FAIL`。这里的 release 只执行发布前校验，不执行发布。

`structure` permits empty template fields but explicitly reports “template, not research results.” `release` rejects templates, unresolved placeholders, and incomplete or failed mandatory reviews. Release mode checks readiness only; it never publishes.

## 字段契约 Field contract

所有 JSON 使用 UTF-8。日期使用 ISO 8601；具体核查用带时区的时间戳，发布日期可用 YYYY-MM-DD。没有执行不能填当前日期冒充核查。真实记录的 `record_kind` 为 `record`。

Use UTF-8 JSON and ISO 8601 dates. Check timestamps include a timezone; publication dates may use YYYY-MM-DD. Do not insert today's date for an unperformed check. Completed records use `record_kind: record`.

**通用枚举 Common enums**

- `status`: `NOT_RUN | PASS | FAIL | BLOCKED`
- `source_type`: `original_documentation | original_code | original_report | direct_observation | secondary`
- `evidence_type`: `documented_behavior | measured | author_reported | illustrative | inference`
- `effect`: `supports | contradicts | inconclusive`
- `claim_type`: `observation | inference | hypothesis`
- `change`: `new | strengthened | weakened | reversed | unchanged | undetermined`
- `supported_level`: `unverified | artifact | availability | crawling | indexing | ranking | traffic | conversion | revenue`。仅表示结论直接涉及的层级，不是从高到低自动继承验证的分数。
- `supported_level` names the conclusion's observation layer; it is not a score that automatically verifies other layers.

真实记录必须有问题、适用范围、旧判断、新证据（没有时允许空数组且解释）、当前结论、变化原因、未知及下一实验决定。`prior_judgment.basis: NONE` 可表达新问题；无待解未知可用空数组，不能捏造问题。公开 URL 禁止凭证、私有主机名和含敏感查询参数；格式检查不能替代访问范围人工检查。

Records require a question, scope, prior judgment, new evidence (an explained empty array is valid), current conclusion, change rationale, unknowns, and next-experiment decision. `prior_judgment.basis: NONE` represents a new question. Unknowns may be empty; do not invent them. Public URLs must exclude credentials, private hostnames, and sensitive query parameters. Syntax checks cannot replace a human access-scope review.

**资源对象 Resource object**

`source.resource` 可为空（非资源类事实）；否则至少包含：

`source.resource` is nullable for non-resource claims; otherwise require:

```json
{
  "kind": "skill",
  "maintainer": "",
  "version": null,
  "license_id": "UNKNOWN",
  "license_url": null,
  "reuse_mode": "link_only",
  "availability": "NOT_RUN",
  "checked_at": null,
  "recheck_trigger": "Before next recommendation or after an upstream version change",
  "limitations": "",
  "permissions_and_side_effects": ""
}
```

`kind`: `skill | tool | code | article | dataset | asset`。`reuse_mode`: `link_only | original_summary | adapted | copied`。`UNKNOWN` 许可只能用前两项；`adapted` 和 `copied` 需有允许相应复用的许可或明确授权及其公开安全引用，保留署名与通知。`version` 不适用可空，不应编造。

For unknown licenses, allow only `link_only` or `original_summary`. Adaptation/copying requires applicable permission and a public-safe reference, with required attribution and notices. A version may be null when inapplicable; never invent one.

**内容元数据 Content metadata**

每页的最小记录：`page_id`、`language_pair`（zh/en 各含 path 与同一 pair_id）、`sections`（question/action/example/check/next_step 的锚点）、`examples`（每个含 kind 和 evidence_ids）、`evidence_record_ids`、`review_status`。内容中的标题可自然表达，不强迫使用字段名作为标题。

Minimum page fields: `page_id`, `language_pair` (zh/en each with path and shared pair_id), `sections` (anchors for question/action/example/check/next_step), `examples` (kind and evidence_ids), `evidence_record_ids`, and `review_status`. Human-facing headings need not copy schema keys.

**结果与失败 Result and failure records**

`PASS` 必须有可检查的实际观察引用；仅写“已检查”不够。`FAIL`、`BLOCKED` 必须有对应失败记录。`NOT_RUN` 不得同时写通过证据。失败最小结构：

`PASS` requires references to actual observations; “checked” alone is insufficient. `FAIL` and `BLOCKED` require matching failure records. `NOT_RUN` must not include claimed passing evidence. Minimal failure shape:

```json
{
  "id": "F-01",
  "check_id": "C03",
  "observed_at": "REPLACE_WITH_ACTUAL_TIMESTAMP",
  "status": "FAIL",
  "symptom": "",
  "impact": "",
  "public_safe_evidence": [],
  "next_action": "",
  "retest": {"status": "NOT_RUN", "evidence": [], "supersedes_failure_id": null}
}
```

验收条件修改另存 `criteria_changes`: `criterion_id`、`previous`、`current`、`reason`、`changed_at`。失败内容也需脱敏；不能把原始秘密复制进扫描报告或测试快照。

Criteria changes retain `criterion_id`, `previous`, `current`, `reason`, and `changed_at`. Sanitize failure records too; scanners and test snapshots must not echo raw secrets.

## 固定的发布门槛 Fixed release gate

C01–C06 与证据记录中的本地检查、来源人工审核、隐私权利审核必须通过。C07（真人新手）、C08（业务效果）未运行可保持 `NOT_RUN`，页面不得声称对应验证已完成；页面一旦声称某项结果，则该项须 `PASS` 并由人工检查真实证据。无业务结果声明时 C08 留 `NOT_RUN`，不人为标成通过。

C01–C06 and evidence-record local checks, human source review, and privacy/rights review must pass. C07 (real novice test) and C08 (business outcomes) may remain `NOT_RUN` only when no corresponding validation claim is made. Claims require `PASS` and human inspection of actual evidence. With no business claim, leave C08 `NOT_RUN` rather than manufacturing a pass.

只有本地结构检查完成时，报告应准确写“本地结构检查通过；人工/真实新手/业务验证状态见记录”。结论是否可公开不能仅由退出码替代。部署、权限、CI 和线上检查属于其他验收范围。

When only local structure checks are complete, report exactly that and retain separate human, novice, and business statuses. An exit code is not a substitute for publication judgment. Deployment, permissions, CI, and live checks belong to other acceptance scopes.
