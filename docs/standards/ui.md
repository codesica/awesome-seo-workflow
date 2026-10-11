# UI 规范 / UI standard

适用：awesome-seo-workflow，编辑式视觉 v1；中英双语、手机优先。MUST / 必须为合入门槛。

Scope: awesome-seo-workflow, editorial visual v1; bilingual Chinese/English, mobile-first. MUST requirements are merge gates.

## 目的 / Purpose

让第一次接触 SEO 的读者知道当前阶段、需要准备什么、下一步做什么，以及如何取得原始 Agent skills 和相关资源。视觉服务于阅读与操作，不用装饰掩盖内容缺口。

Help SEO beginners identify their stage, required inputs, next action, and access to original Agent skills and resources. Visual design supports reading and action; decoration must not conceal missing substance.

## 输入与输出 / Inputs and outputs

- 输入：页面目标、目标读者、内容层级、中英对应文案、真实资源链接、已有组件/token、手机与桌面使用场景。引用参考前说明它解决的问题和具体采用的模式；不得漫无目的收集参考或照搬整站。
  Inputs: page goal, audience, content hierarchy, corresponding Chinese/English copy, real resource links, existing components/tokens, and mobile/desktop use cases. Before using a reference, explain the problem it solves and the specific pattern adopted. Do not gather random references or copy entire sites.
- 输出：复用现有结构的语义 HTML/CSS、必要组件或 token 变更、真实页面截图与验收记录。新依赖须说明必要性；能用原生 HTML/CSS 完成的简单 UI 不引入框架。
  Outputs: semantic HTML/CSS reusing the existing structure, necessary component/token changes, actual page screenshots, and an acceptance record. Justify new dependencies; do not add a framework for a simple UI achievable with native HTML/CSS.

## 核心约束与禁区 / Core constraints and prohibitions

- 采用项目 v1 的冷白网页背景、深墨绿、克制柠檬色的编辑式方向；插画可用暖白纸质；颜色、间距、字级、圆角和状态从统一 token 获取。更改方向须先说明范围与原因，不能悄然把本站改成另一套设计系统。
  Use the project's v1 editorial direction: cool white page backgrounds, deep ink green and restrained lemon accents; illustrations may use warm paper whites. Centralize colors, spacing, type scale, radii, and states in shared tokens. Explain scope and reason before changing direction; do not silently replace the design system.
- 每页一个明确主标题和主要任务；阶段信息优先呈现目标、输入、动作、产出/完成判据与资源。详细说明按语义组织、按需展开，但关键操作和完成条件不能藏在默认关闭区域。不得通过堆卡片、标签或长段文字制造“内容丰富”。
  Give each page a clear main heading and primary task. Stage content prioritizes goal, inputs, actions, outputs/completion criteria, and resources. Organize detail semantically and disclose it when useful, but keep essential actions and completion criteria visible. Do not simulate substance with excessive cards, badges, or dense paragraphs.
- 中文与英文的核心流程、链接、状态和错误提示必须等价；不是仅翻译导航。使用正确 lang、合理断行与字体回退，不把固定高度写死到英文文案长度。
  Chinese and English MUST provide equivalent core flows, links, states, and errors, not just translated navigation. Use correct lang, appropriate wrapping, and font fallbacks. Do not freeze component heights around English copy length.
- 导航用链接，状态变更用按钮；标题层级连续，列表和表格保持语义。所有控件都有可理解的可访问名称。禁止点击式 div 冒充控件、仅靠颜色表达状态或取消焦点轮廓。
  Use links for navigation and buttons for state changes. Preserve heading hierarchy and list/table semantics. Every control needs an understandable accessible name. Clickable divs, color-only state communication, and removed focus indicators are prohibited.
- 禁止装饰性 emoji 和图标/箭头堆砌。必要的菜单、关闭、搜索、外链等功能图标允许使用统一的一套 SVG/图标组件；尺寸、线宽、对齐、状态一致，并提供文本或可访问名称。不要为了“去图标”把可靠导航换成生成位图。
  Decorative emoji and piles of decorative icons/arrows are prohibited. Necessary menu, close, search, or external-link icons may use one consistent SVG/icon system with aligned sizing, strokes, placement, and states, plus text or accessible names. Do not replace reliable navigation with generated bitmaps simply to remove icons.
- 普通正文对比度至少 4.5:1，大号文本至少 3:1；关键控件边界与焦点相对相邻颜色至少 3:1。触控目标原则上不小于 44×44 CSS px；密集正文内联链接可例外，但必须易辨认且不误触。
  Normal text contrast MUST be at least 4.5:1; large text at least 3:1. Essential control boundaries and focus indicators need at least 3:1 against adjacent colors. Target touch areas of at least 44×44 CSS px; dense inline prose links may be exempt when distinguishable and safely usable.
- 320px 至桌面宽度不得出现页面级横向溢出；确需宽表或代码时局部滚动并给出提示。图文遵循 [生图规范](image-generation.md)，保留可扫描的文字层级，不能用巨幅图片或重复插画把任务入口挤走。
  From 320px to desktop widths, avoid page-level horizontal overflow. Wide tables/code may scroll locally with a clear cue. Follow the [image standard](image-generation.md), retain scannable text hierarchy, and do not push task entry points away with oversized or repeated illustrations.

## 可复核验收 / Reproducible acceptance

- 本地自动检查：HTML/构建错误、失效的本地链接、资源路径、必需页面/语言入口、缺失 alt/lang、重复 ID、可检测的对比度与可访问性问题。只记录实际运行的命令、结果与适用范围；工具零报错不等于完整无障碍通过。
  Local automated checks: HTML/build errors, broken local links, resource paths, required page/language entry points, missing alt/lang, duplicate IDs, and detectable contrast/accessibility issues. Record only commands actually run, their outcomes, and scope. A clean automated scan is not a complete accessibility pass.
- 人工检查：至少保存首页及受影响阶段/资源页在 360px、390px、1280px 的真实中英文截图；320px 做溢出检查，200% 缩放检查阅读与操作。检查长标题、混排、按钮换行、对比、图文比例与移动端阅读顺序；不以缩小桌面截图冒充手机验证。
  Manual review: capture real Chinese/English home and affected stage/resource pages at 360px, 390px, and 1280px. Check overflow at 320px and reading/operation at 200% zoom. Review long headings, mixed scripts, wrapped controls, contrast, image/copy balance, and mobile reading order. A scaled-down desktop screenshot is not mobile verification.
- 交互验收按 [视觉交互规范](visual-interaction.md) 执行；人工项逐项写通过/失败/未测，注明页面、环境、截图路径和问题。不能用“看起来正常”替代记录。
  Apply the [visual interaction standard](visual-interaction.md). Mark each manual item pass/fail/not tested and record page, environment, screenshot paths, and issues. “Looks fine” is not an acceptance record.

## 失败处理 / Failure handling

发现流程缺失、语言缺页、手机溢出、不可读或无法操作时暂停交付该项，优先回退到已验证的简单组件。修复后重跑受影响检查并更新截图；未测项保持未测，不推定通过。

Block acceptance for missing flows/translations, mobile overflow, unreadable content, or unusable controls. Prefer reverting to a verified simple component. Rerun affected checks and replace screenshots after repair. Untested items remain untested, never assumed passed.

关联 / Related: [生图 / Images](image-generation.md) · [视觉交互 / Interaction](visual-interaction.md) · [内容 / Content](content-standard.md) · [调研 / Research](research-standard.md)
