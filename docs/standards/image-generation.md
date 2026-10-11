# 生图规范 / Image generation

适用：awesome-seo-workflow，编辑式视觉 v1。以下为本项目版本约束，不代表永久风格偏好。MUST / 必须为合入门槛。

Scope: awesome-seo-workflow, editorial visual v1. These are project-version constraints, not permanent style preferences. MUST requirements are merge gates.

## 目的 / Purpose

用原创编辑插画帮助新手理解 SEO 阶段、输入与产出；图片不能充当截图、数据、排名结果或研究证据。

Use original editorial illustrations to clarify SEO stages, inputs, and outputs for beginners. Images must never stand in for screenshots, data, ranking results, or research evidence.

## 输入与输出 / Inputs and outputs

- 输入必须包含页面/阶段、读者问题、图要表达的一件事、必要概念、构图安全区、目标比例和移动端用途；先判断是否真的需要图，不为填空而生图。
  Inputs MUST identify the page/stage, reader question, one visual message, required concepts, composition safe area, aspect ratio, and mobile use. Establish a real need before generating.
- v1 延续已选方向：编辑式构图，暖白、深墨绿、少量柠檬色；7 张真实 image_gen 生成的编辑插画构成当前套装，不因本规范另行批量重生或扩量。使用项目现有 token，不凭描述另造一套颜色。
  v1 preserves the selected editorial direction: warm white, deep ink green, and restrained lemon accents. The current set comprises seven actual image_gen editorial illustrations; this standard does not authorize regenerating or expanding it. Reuse project tokens rather than inventing colors from this description.
- 输出必须包含生成原图、用于网页的压缩派生图，以及可追溯记录。每个资产记录稳定 ID、页面用途、实际生成工具/模型（可取得时）、生成时间、完整非敏感 prompt、原图路径与 SHA-256、派生图路径/尺寸/格式/字节数和转换命令。无法确认的信息写 unknown，不补造。
  Outputs MUST include the generated original, compressed web derivatives, and a trace record. Record a stable asset ID, placement, actual tool/model when available, generation time, full non-sensitive prompt, original path and SHA-256, derivative paths/dimensions/formats/byte sizes, and conversion command. Use unknown for unavailable facts; never fabricate them.
- 建议路径为 assets/images/originals/、assets/images/generated/、assets/images/manifest.json；若仓库已有结构，沿用并注明。公开记录不得包含私密聊天、凭据或个人敏感数据；生成前清理 prompt。旧资产来源缺失须列为待补证，不能用新写 prompt 冒充原始记录。
  Suggested paths are assets/images/originals/, assets/images/generated/, and assets/images/manifest.json; retain and document an existing layout instead of duplicating it. Public records MUST exclude private conversations, credentials, and sensitive personal data. Sanitize prompts before generation. Missing legacy provenance is an evidence gap; a reconstructed prompt is not the original prompt.

## 禁区与网页集成 / Prohibitions and web integration

- 必须真正使用 image_gen 完成所声明的生图；禁止拿 SVG 拼装、emoji、图库占位或重复图片冒充生成插画。工具失败时报告，不得偷换到付费 API、购买素材或新增费用。
  Use image_gen for assets described as generated illustrations. Do not misrepresent assembled SVGs, emoji, stock placeholders, or duplicated images as generated artwork. Report tool failures; do not silently switch to paid APIs, buy assets, or incur new charges.
- 插画不承载唯一的标题、操作说明或重要结论；图片中文字不是网页正文。模拟 SERP、漏斗、曲线或仪表盘必须紧邻可见 HTML 说明“示意，非真实数据 / Illustration, not real data”；alt 不能代替该说明。真实产品截图遵循调研与内容规范。
  Illustrations MUST NOT be the sole carrier of headings, instructions, or essential conclusions. Text inside an image is not page copy. Simulated SERPs, funnels, graphs, or dashboards require an adjacent visible HTML label, “Illustration, not real data,” localized into Chinese. Alt text does not replace that label. Real product screenshots follow the research and content standards.
- 禁止装饰性 emoji、装饰图标/箭头堆砌、伪造产品背书，以及未经许可的品牌仿制。功能图标按 [UI 规范](ui.md) 处理，不得一律替换成位图。
  Decorative emoji, piles of decorative icons/arrows, fabricated endorsements, and unauthorized brand imitation are prohibited. Functional icons follow the [UI standard](ui.md); do not blanket-replace them with bitmaps.
- 图片必须有明确宽高或稳定 aspect-ratio；按实际显示尺寸提供压缩格式与候选宽度，通过 srcset/sizes（或等效 picture）响应式加载。装饰图 alt=""，信息图使用简短本地化 alt，完整解释留在 HTML。
  Images MUST reserve layout space with dimensions or a stable aspect ratio, provide compressed responsive variants, and use srcset/sizes or an equivalent picture implementation. Decorative images use empty alt text; informative images use concise localized alt text with full explanation in HTML.
- 首屏主要图按需要优先加载，不盲目 lazy；非首屏图 lazy-load。移动端不得裁掉概念、流程关系或焦点；必要时改用专用构图，不靠把图放大撑高页面解决。
  Prioritize the primary above-the-fold image when needed; do not blindly lazy-load it. Lazy-load below-the-fold imagery. Mobile crops MUST retain concepts, relationships, and focal content; use a dedicated composition if necessary rather than inflating page height.

## 可复核验收 / Reproducible acceptance

- 本地自动检查：manifest 引用的文件存在；哈希与原图一致；尺寸/格式/字节数可读；页面图路径有效；有尺寸、alt、适当加载策略；响应式资源未缺失。检查脚本必须列出覆盖与盲区，不得把 alt 属性存在等同于文案合格。
  Local automated checks: manifest paths exist; original hashes match; dimensions/formats/byte sizes are readable; page image references resolve; dimensions, alt attributes, and loading strategy exist; responsive resources are present. Scripts MUST state coverage and blind spots. An alt attribute existing does not prove its wording is adequate.
- 人工检查：逐张查看原图与实际中英文页面；在 360px 和 390px 手机宽度及 1280px 桌面截图确认焦点、裁切、清晰度、风格一致与图文节奏。每张图应解释其相邻内容，不能把主要行动推到冗长图片之后。截图路径、viewport、页面/语言、日期和结论须记录。
  Manual review: inspect every original and its real Chinese/English page. Capture 360px and 390px mobile and 1280px desktop views to assess focus, crop, legibility, stylistic consistency, and image/copy balance. Each image should clarify adjacent content without burying the primary action behind excessive imagery. Record screenshot path, viewport, page/language, date, and findings.

## 失败处理 / Failure handling

生成失败、来源不明、关键裁切、压缩失真或标注误导，均不得按通过处理。保留已验证的旧图或先用完整 HTML 解释；记录阻塞项并修复后重验。图片数量达标不代表质量达标。

Generation failures, unknown provenance, lost focal content, compression damage, or misleading labels are not passes. Retain a verified prior asset or provide the complete HTML explanation; record the blocker and recheck after repair. Meeting an image count does not establish quality.

关联 / Related: [UI](ui.md) · [视觉交互 / Visual interaction](visual-interaction.md) · [内容 / Content](content-standard.md) · [调研 / Research](research-standard.md)
