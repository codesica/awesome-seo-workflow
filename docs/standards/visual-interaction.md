# 视觉交互规范 / Visual interaction

适用：awesome-seo-workflow，编辑式视觉 v1；只要求当前存在或本次新增的交互，不为检查清单添加功能。MUST / 必须为合入门槛。

Scope: awesome-seo-workflow, editorial visual v1. Apply checks to existing or newly requested interactions; do not add features just to satisfy this checklist. MUST requirements are merge gates.

## 目的 / Purpose

使视觉反馈与真实结果一致，确保用户能用触屏、鼠标或键盘完成 SEO 阅读与资源获取，不依赖动画、悬停或 JavaScript 才能理解主要内容。

Match visual feedback to real outcomes. Readers should navigate SEO guidance and obtain resources with touch, mouse, or keyboard without depending on animation, hover, or JavaScript to understand essential content.

## 输入与输出 / Inputs and outputs

- 输入：受影响页面、核心用户路径、控件清单、各状态与真实目标、语言映射，以及无 JavaScript 和减少动态效果的预期行为。
  Inputs: affected pages, core user paths, controls, states and real destinations, language mapping, and expected behavior without JavaScript or with reduced motion.
- 输出：语义实现、状态说明和可复现的本地验收记录。记录浏览器/版本、viewport、页面/语言、日期、操作、预期、实际、结论及必要截图；录屏可补充但不能取代失败说明。
  Outputs: semantic implementation, state definitions, and reproducible local verification. Record browser/version, viewport, page/language, date, steps, expected and actual outcomes, status, and relevant screenshots. Video may supplement but cannot replace a failure description.

## 核心约束与禁区 / Core constraints and prohibitions

- 渐进增强：主要内容、页面链接与原始资源入口必须无需 JavaScript 仍可阅读/访问。复制、筛选等增强功能不能假装可用；提供选择/复制原文、普通目录等适用回退，不用空白页面代替失败。
  Progressive enhancement: essential content, page links, and original resource entry points MUST remain accessible without JavaScript. Enhancements such as copy/filter controls must not falsely appear functional. Provide appropriate fallbacks such as selectable text or a normal directory instead of blank failure states.
- 操作状态必须真实：复制成功需实际写入剪贴板成功；失败显示可执行回退。链接目标有效，下载能取得预期文件。不可用按钮需说明原因；禁止空 href、占位跳转与假成功 toast。
  Feedback MUST be truthful: report copy success only after a successful clipboard write; show an actionable fallback on failure. Links must reach the intended destination and downloads return the expected file. Explain unavailable controls. Empty href values, placeholder navigation, and false success toasts are prohibited.
- 移动菜单使用带名称的按钮，或带名称的原生 details/summary；按钮的 aria-expanded 与实际状态一致，原生展开状态由浏览器维护；可用键盘打开/关闭、Escape 关闭并合理恢复焦点。隐藏项不得继续接收焦点。仅模态菜单需要焦点约束；普通展开导航不滥用 focus trap 或 ARIA menu。
  Mobile menus use a named button or native, named details/summary. Button aria-expanded matches visibility; native disclosure state is maintained by the browser. Support keyboard open/close, Escape dismissal, and sensible focus restoration. Hidden items must not receive focus. Trap focus only for modal navigation, not ordinary disclosure navigation; do not misuse ARIA menu semantics.
- 链接/控件具有清晰默认、悬停、焦点及适用的激活、展开、禁用、加载和错误状态。键盘 Tab 顺序遵循阅读顺序，Enter/Space 遵循原生语义；不能仅凭悬停或颜色传递关键信息。固定头部不得挡住焦点或锚点标题。
  Links/controls need clear default, hover, focus, and applicable active, expanded, disabled, loading, and error states. Tab order follows reading order; Enter/Space follow native semantics. Essential information cannot rely solely on hover or color. Sticky headers must not obscure focused controls or anchor headings.
- 语言切换保持当前页面/阶段及等价内容，更新 lang 与选中状态。无法保持某一位置时明确回退目的地；不静默重置到无关首页，不把仅导航已翻译显示为整页已翻译。
  Language switching preserves the equivalent page/stage, updates lang and selection state, and exposes an explicit fallback destination when exact preservation is unavailable. Do not silently reset readers to an unrelated home page or imply a fully translated page when only navigation changed.
- 动效必须服务于理解状态，优先 opacity/transform；禁止滚动劫持、默认视差、装饰性循环动画或妨碍操作的入场动画。prefers-reduced-motion: reduce 下禁用非必要动态及平滑滚动，不隐藏内容或改变结果。
  Motion must clarify state; prefer opacity/transform. Scroll hijacking, default parallax, decorative infinite loops, and interaction-blocking entrances are prohibited. Under prefers-reduced-motion: reduce, disable nonessential motion and smooth scrolling without hiding content or changing results.

## 可复核验收 / Reproducible acceptance

在受影响中英页面执行下列项目；不存在的功能写 N/A 并说明原因。所有自动检查仅在本地运行，不新增、启用或触发 GitHub Actions。

Run the following on affected Chinese/English pages. Mark nonexistent features N/A with a reason. Run automation locally only; do not add, enable, or trigger GitHub Actions.

1. 自动可查：链接/资源解析、控件属性、状态切换断言、无 JS 内容/链接可达、reduced-motion 媒体状态、viewport 溢出检测。浏览器脚本若存在，保存实际命令和结果；静态 grep 不能证明菜单能操作或焦点正确。
   Automatable: link/resource resolution, control attributes, state transition assertions, no-JS content/link availability, reduced-motion media state, and viewport overflow. If browser scripts exist, retain the actual command/results. Static grep cannot establish menu operability or focus correctness.
2. 人工键盘：从页面起点 Tab 完整走通导航、语言切换、阶段入口及资源入口；确认焦点可见、顺序正确、无陷阱；测试适用的 Enter、Space、Escape 和返回焦点。用辅助技术抽查控件名称与展开状态，不把自动扫描当屏幕阅读器测试。
   Manual keyboard: Tab through navigation, language switch, stage and resource entry points from the page start. Confirm visible, ordered focus and no traps. Test applicable Enter, Space, Escape, and focus restoration. Spot-check names and expanded states with assistive technology; automated scans do not count as screen-reader tests.
3. 人工手机：在 360px 和 390px 下打开菜单、访问阶段、切换语言、获取资源；检查菜单边缘、页面滚动、目标点击区与横竖布局变化。保存菜单打开及关键页面真实截图，不只截默认首屏。
   Manual mobile: at 360px and 390px, open navigation, visit a stage, switch languages, and obtain a resource. Check menu bounds, scrolling, touch targets, and orientation/layout changes. Capture the actual open menu and key pages, not just the default first screen.
4. 人工回退：禁用 JavaScript 后重新载入，确认内容、语言路径与原始资源仍可用；打开系统或浏览器 reduced-motion 后重载并操作，确认无非必要动态、无缺失内容。声明检查条件和实际观察，不能只因样式表有媒体查询就判通过。
   Manual fallback: reload with JavaScript disabled and verify content, language paths, and original resources. Enable system/browser reduced motion, reload, and interact; verify no nonessential motion or missing content. State the conditions and observed behavior; a media query existing is not a pass.
5. 人工结果：打开真实资源并核对内容，测试适用的复制成功和拒绝权限/失败路径；外部链接若当前无法核验，标为未验证并说明，不能从 URL 格式推定有效。
   Manual outcomes: open real resources and confirm their content; test applicable copy success and denied-permission/failure paths. Mark unreachable external links unverified with a reason rather than inferring validity from URL structure.

## 失败处理 / Failure handling

核心路径、键盘、语言或无 JS 访问失败即阻塞交付；先恢复可靠的原生链接/按钮和可读内容，再修增强功能。记录失败复现、修复与重验；受工具限制的测试列为未测并明确交付风险，不伪造截图或测试报告。

Block acceptance for broken core paths, keyboard access, language flows, or no-JS access. Restore reliable native links/buttons and readable content before repairing enhancements. Record reproduction, repair, and retest. Mark tool-limited checks untested and disclose the delivery risk; never fabricate screenshots or test reports.

关联 / Related: [UI](ui.md) · [生图 / Images](image-generation.md) · [内容 / Content](content-standard.md) · [调研 / Research](research-standard.md)
