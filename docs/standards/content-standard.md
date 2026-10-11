# 内容规范 Content standard

适用：公开 SEO 入门流程、教程、案例、工具及 Agent skills 资源。目标：让第一次做 SEO 的人知道下一步做什么、做到哪一步算完成。

Scope: public beginner SEO workflows, guides, examples, tools, and Agent skill resources. A first-time reader must know what to do next and how to check completion.

## 输入与输出 Inputs and outputs

输入：目标读者、一个实际问题、前置条件、已核查的证据记录、可公开的原创或许可素材。缺少证据时缩小结论，不用文案补足。

Inputs: audience, one practical question, prerequisites, checked evidence records, and original or licensed publishable material. Narrow unsupported claims rather than writing around missing evidence.

输出：中英对应的页面或条目、可复制的示例、验证方法、下一步、证据引用和 QA 记录。中英文可独立阅读，不要求逐字翻译；结论、限制、风险和证据强度必须一致。

Outputs: equivalent Chinese and English content, a usable example, a check, a next step, evidence references, and a QA record. Each language must stand alone; conclusions, limits, risks, and evidence strength must match.

## 核心规则 Core rules

1. **先解决一个问题。** 首屏说明“你现在遇到什么问题”和“一项可完成的动作”。不要以工具目录或术语定义开场。
   **Start with one problem.** Open with the reader's problem and one achievable action, not a tool directory or a glossary.
2. **按问题 → 动作 → 示例 → 验证 → 下一步组织。** 先让读者做完，再链接原理、特殊情况及替代方法；必要的安全提示和前置条件不能折叠隐藏。
   **Use question → action → example → check → next step.** Put theory, edge cases, and alternatives in optional depth. Keep safety requirements and prerequisites visible.
3. **保留深度，按需展开。** 每节回答一个问题；长解释拆成短段、步骤或可展开内容。术语首次出现时用一句白话解释，再给可选深入链接。不用武断字数上限替代可读性判断。
   **Preserve depth through progressive disclosure.** Give each section one job. Break long explanations into short paragraphs, steps, or optional detail. Explain a new term plainly before linking deeper material. Readability is not a word-count contest.
4. **示例必须可辨识。** 标记为 `illustrative`、`measured` 或 `author_reported`。示意数字不得画成真实业绩；实测必须指向证据与观察范围；自述必须标注是谁的自述。
   **Label examples honestly.** Use `illustrative`, `measured`, or `author_reported`. Synthetic numbers are not performance results; measurements need evidence and scope; self-reports need attribution.
5. **说清楚验证的是哪一层。** 文件生成、页面可访问、抓取、收录、排名、访问、转化、收入分开描述。前一层通过不能写成后一层有效，更不能保证结果。
   **Name the verified layer.** File creation, availability, crawling, indexing, ranking, visits, conversion, and revenue are separate observations. Passing one does not establish another or guarantee outcomes.
6. **工具服务动作。** 每个资源说明用途、适用阶段、输入输出、费用或访问前提（如相关）、已知限制、来源、许可与复核日期。技能说明所需权限、可能副作用、检查方法；提示词或第三方技能不是执行授权。
   **Tools support a task.** Each resource states its job, workflow stage, inputs and outputs, relevant cost/access prerequisites, limits, source, license, and last check. Skills also state permissions, side effects, and verification. A prompt or third-party skill does not authorize execution.
7. **公开内容须重新提炼。** 从私有材料提炼通用方法，重写为独立说明；换成虚构且显式标记的样例。不得公开原始对话、私有仓库信息、个人账户、机器路径、令牌、内部链接、截图残留或可反推身份的组合。
   **Rebuild material for public use.** Extract general methods into standalone wording and clearly fictional examples. Exclude private conversations, repository details, accounts, machine paths, tokens, internal links, screenshot residue, and identifying combinations.
8. **保留来源与权利边界。** 外链可推荐不等于可复制；无许可的代码或技能不得转载。原创摘要不能替代对原始事实的核查。不开“精选”数量指标，不以工具数或作者自评分证明质量。
   **Respect provenance and rights.** Linking is not permission to redistribute. Do not copy unlicensed code or skills. An original summary still needs factual verification. Resource counts and self-scores do not establish quality.

## 最小页面骨架 Minimal page structure

- 用户问题 / Reader question
- 适用情况与前置条件 / Fit and prerequisites
- 现在做这一件事 / One action now
- 示例（带性质标签） / Labeled example
- 怎么判断完成；失败怎么办 / Completion check and recovery
- 下一步 / Next step
- 可选深入内容及来源 / Optional depth and sources

例如，“我不知道第一篇写什么”可让读者先写下一位目标读者会问的一句话，再给一个标记为示意的样例，最后检查该问题是否足够明确、能否由一页回答。此示例仅演示教学结构，不构成需求或流量验证。

For “I don't know what to write first,” ask the reader to write one question a target reader would ask, show a labeled illustrative example, then check whether one page could answer it clearly. This demonstrates teaching structure, not validated demand or traffic.

## 验收与失败 Acceptance and failures

**本地可检查 Local checks:** 必填字段、枚举、语言对照 ID、步骤区块、有效相对引用、证据 ID 是否存在、日期格式、显式示例标签、已知敏感模式、未替换占位符。扫描只能找出部分风险，不能证明已彻底脱敏。

Required fields, enums, paired language IDs, structural sections, relative references, evidence IDs, date formats, example labels, known sensitive patterns, and unresolved placeholders can be checked locally. Scanning cannot certify complete anonymization.

**人工验收 Human review:** 新手能否理解并完成动作；证据是否真正支持原句；中英意义是否一致；示例是否误导；权利是否允许使用；脱敏后是否仍能识别来源或个人。作者自行走通只能称编辑检查，不是新手测试。

A reviewer checks actual usability, claim support, bilingual equivalence, misleading examples, usage rights, and re-identification risk. An author's walkthrough is editorial review, not a novice test.

真实新手测试、线上效果或收入验证未执行时，分别写 `NOT_RUN`，不得用本地检查或模型评分替代。基础内容可在这些项目未运行时发布，但不得声称已经验证；来源、隐私、版权及必要人工审核未通过时不得发布。

Record real novice tests, live effects, and revenue validation separately as `NOT_RUN` when absent. Local checks or model scores cannot replace them. Content may ship without outcome validation only if it makes no such claim. Source, privacy, rights, and required human-review failures block publication.

失败记录保留检查 ID、失败现象、公开安全的证据、影响、修复和复验结果。先固定验收项再修订；确需调整标准时记录原因，保留旧失败，不把失败改名为通过。使用 `content-qa-checklist.json`；模板不是完成证明。

A failure record keeps the check ID, observed failure, public-safe evidence, impact, fix, and retest. Freeze checks before revision. Explain necessary criteria changes and retain earlier failures. Use `content-qa-checklist.json`; a template is not proof of completion.
