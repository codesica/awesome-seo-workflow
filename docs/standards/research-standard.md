# 调研规范 Research standard

适用：SEO 判断、方法、工具、案例及 Agent skills 的收集和复核。每次调研的交付应改变或确认一个具体决策，不以轮数、链接数、工具数或自评分作为成果。

Scope: research and review of SEO claims, methods, tools, cases, and Agent skills. A research pass should change or confirm a specific decision. Rounds, links, tools, and self-scores are not outcomes.

## 输入与输出 Inputs and outputs

输入：待决问题、原有判断（没有则明写无）、适用人群和场景、决策所需证据、预先确定的验收条件。

Inputs: decision question, prior judgment (explicitly none if absent), audience and context, evidence needed, and acceptance criteria fixed before evaluation.

输出：简短结论与下一动作、一份逐判断的证据记录、资源来源和权利信息、未解决问题、失败或无法核查项。公开报告只含已脱敏的结论与必要引用；原始私有材料不进入公开仓库，包括 Git 历史和构建产物。

Outputs: a concise conclusion and next action, per-claim evidence records, resource provenance and rights, unknowns, and failed or blocked checks. Public reports contain sanitized findings and necessary citations. Private source material must stay out of the public repository, including Git history and build outputs.

## 核心规则 Core rules

1. **逐判断留下变化链。** 记录原有判断 → 新证据 → 当前结论和变化原因 → 未知 → 下一实验。没有变化也要说明原因；没有新证据就写没有。
   **Keep a per-claim change trail.** Record prior judgment → new evidence → current conclusion and change rationale → unknowns → next experiment. Explain unchanged conclusions. State when no new evidence exists.
2. **查原始来源。** 优先原始文档、源代码、原作者的原文或可复现观测；聚合文章用于找线索。记录原始 URL、作者/发布方、发布日期（未知可空）、核查日期、版本或提交号（适用时）、定位段落、适用范围。
   **Inspect original sources.** Prefer original documentation, source code, original reports, or reproducible observations. Aggregators provide leads. Record URL, author/publisher, publication date (nullable if unknown), checked date, relevant version/commit, locator, and scope.
3. **来源身份不是结论强度。** 官方说明可支持“产品如何定义功能”，不能自动证明业务效果；作者自述只支持“作者报告过”；重复引用同一原文不能算独立佐证。
   **Source identity is not proof strength.** Official documentation can establish a documented feature, not automatic business effectiveness. A self-report establishes what its author reported. Repeated citations of one original are not independent corroboration.
4. **区分事实、推断和假设。** 每条结论标记证据类型、限制及冲突证据。示意不是真实流量；收录、排名、流量、转化、收入分别核查。相关变化不直接写成因果提升。
   **Separate observation, inference, and hypothesis.** Label evidence type, limitations, and contradictory evidence. Illustrations are not traffic measurements. Check indexing, ranking, traffic, conversions, and revenue separately. Correlation alone does not establish causation.
5. **设计有边界的下一实验。** 写清动作、固定验收条件、所需观测、观察窗口/停止条件和权限。未知未必都值得做实验；可选择暂缓并说明触发重查的条件。不为凑轮数继续调研。
   **Design a bounded next experiment.** Specify action, fixed criteria, required observations, observation window/stop condition, and permissions. An unknown may be deferred with a recheck trigger. Do not research merely to meet a round count.
6. **资源须检查可用性与许可。** 保存原始项目地址、维护者、适用版本、许可证标识和许可证原文链接、核查时间、可用状态及复核触发条件。`UNKNOWN` 许可不允许复制；只可清楚标注的参考外链。维护不活跃不等于失效，HTTP 200 不等于内容可用。
   **Check availability and rights.** Record original project URL, maintainer, applicable version, license identifier and text link, check date, availability, and recheck trigger. `UNKNOWN` licensing blocks copying, not a clearly labeled reference link. Inactivity is not automatically failure; HTTP 200 does not establish usability.
7. **保护原始材料。** 公开仓库只接收新写的通用方法和必要的短引用，不接收私有仓库镜像、原始调研转储、聊天摘录、个人账户或本机路径。不能通过简单替换姓名就认定安全。截图须同时审查像素、文件名和元数据。
   **Protect source material.** Publish newly written general methods and necessary brief quotations, not private repository mirrors, raw research dumps, chat excerpts, accounts, or local paths. Replacing names alone is insufficient. Review screenshot pixels, filenames, and metadata.
8. **真实结果单独验证。** `NOT_RUN`、`PASS`、`FAIL`、`BLOCKED` 描述实际执行状态。作者审阅、静态检查、演示和合成数据不能冒充真人新手测试或业务结果。结论必须注明证据到哪一层。
   **Verify real outcomes separately.** Use `NOT_RUN`, `PASS`, `FAIL`, and `BLOCKED` for actual execution status. Editorial review, static checks, demos, and synthetic data are not real novice tests or business outcomes. State the observation level supported by evidence.

## 最小执行顺序 Minimal working sequence

1. 写下问题、旧判断和验收条件。 / Write the question, prior judgment, and criteria.
2. 查直接相关原始证据，记录支持和冲突。 / Inspect relevant originals, including supporting and conflicting evidence.
3. 形成有边界的结论，补齐未知及下一实验。 / Form a bounded conclusion, unknowns, and next experiment.
4. 核查权利与脱敏，再做本地检查和人工审阅。 / Review rights and privacy, then local checks and human review.

不要求固定来源数量。若一个来源足以支持一个狭窄事实，可以停止；若证据冲突或支持不了高影响结论，收窄结论或继续核查。

No fixed source quota applies. One source may establish a narrow fact. Conflicting or inadequate evidence requires a narrower conclusion or further checks.

## 验收边界 Acceptance boundaries

**本地可检查 Local:** JSON 能解析；字段和枚举齐全；ID 唯一；引用存在；日期合法；`checked_at` 不在未来；URL 是公开安全格式；许可状态与复用方式不矛盾；所有 `PASS` 有观测证据；所有失败/阻塞有解释；占位符不能作为真实记录过关。网络检查另行显式执行，记录时间、重定向和访问限制，不绕过登录或访问控制。

Check JSON structure, fields, enums, unique IDs, references, dates, nonfuture check timestamps, public-safe URL shape, license/reuse consistency, evidence for every `PASS`, and explanations for failures/blocks. Placeholders cannot pass as completed research. Network checks are separate explicit runs with timestamps, redirects, and access limits; do not bypass authentication or access controls.

**人工必须判断 Human:** 是否读到了原始内容、引用是否准确支持原句、证据独立性、过时程度、可复现性、样本和适用范围、因果措辞、重识别风险、许可条款是否允许具体使用。自动化通过不能替代这些判断。

A human evaluates actual source inspection, claim support, independence, freshness, reproducibility, sample and scope, causal wording, re-identification risk, and permission for the proposed use. Automated success cannot certify these judgments.

失败保留原记录：来源失效、无法登录、证据冲突、许可不明、脱敏不足、实验失败各自记录；说明影响与下一步。来源暂时不可达写 `BLOCKED`，不能写“已证实错误”；找不到证据写未知，不能写“证明不存在”。复验创建新结果并引用旧失败，不覆盖掉不利结果。

Retain failures for unavailable sources, login barriers, conflicts, unclear rights, privacy defects, and unsuccessful experiments. Explain impact and next action. An inaccessible source is `BLOCKED`, not disproven. Missing evidence means unknown, not proof of absence. Retests retain links to earlier failures rather than overwriting them.

模板见 `evidence-record.template.json`；字段说明与建议本地校验接口见 `content-research-validation.md`。模板为待填结构，没有任何验证通过的含义。

See `evidence-record.template.json` and `content-research-validation.md`. Templates are unfilled structures, not evidence of validation.
