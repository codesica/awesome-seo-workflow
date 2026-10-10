---
contentId: stage.04-publish-check
locale: zh-CN
reviewedAt: 2026-10-10
status: editorially-reviewed-not-site-tested
---

# 发布与技术检查

区分页面上线、可抓取、被收录和获得排名。

## 从这里开始的条件

页面已准备发布，或已有公开页面需要检查；不要求先重做第 1–3 步。

## 本步目标

发布一个有权公开的页面，并留下可访问性、索引指令和实际部署的检查证据。

## 先弄懂这些概念

- 抓取是搜索引擎读取页面；收录是进入索引；排名是特定查询下的展示顺序。三者不能互相代替。

- robots.txt 管抓取；noindex 用来排除收录且需被爬虫读到；登录保护用于真正私密的内容。不要为了 SEO 去掉隐私保护。

- sitemap 是供发现网址的清单；提交成功不代表收录。canonical 是偏好信号，搜索引擎可能另选代表网址。

## 开始前准备

- 已验收内容包；对目标站点和发布操作的权限；备份/回滚方式。

- 已有站可以直接带一个需要排查的公开 URL 进入；站点应保密时选择公开练习页，保持现有保护。

## 跟着做

### 04.1 先确定发布边界

明确页面应该公开还是私密、目标域名、语言地址和谁批准发布。保存当前版本或可恢复提交。先在预览中检查正文、主要按钮和手机布局；预览通过仅代表预览环境。

产物：发布范围、回滚点、预览检查记录。

### 04.2 检查真实线上页面

通过既有流程发布后，在未登录浏览器打开最终 URL。确认最终页面正常返回、正文可读、关键资源可用、链接可点击。记录重定向和最终地址。需要开发工具时让有经验的人协助，不凭截图猜 HTTP 状态。

产物：线上地址、检查时间、状态/正文/移动端证据。

### 04.3 检查抓取和索引信号

检查适用的 robots.txt 规则、HTML robots meta 和响应头 X-Robots-Tag，确认没有意外阻止；再看 canonical、title、description 与站内入口链接。不要把 robots.txt 放行当作已收录。发现指向错误域名的 canonical 或大范围规则时停止批量修改。

产物：单页技术检查表，每项为通过/失败/未检查。

### 04.4 整理 sitemap 和语言信号

如站点有 sitemap，确认列出应公开的规范 URL，没有混入私密页/测试页；lastmod 只在能准确提供时使用。双语页面检查互相对应的 hreflang 和可点击语言切换；不要把英文版统一 canonical 到中文。

产物：sitemap 检查记录；双语对应检查记录。

### 04.5 由有权限的人检查 Search Console

在正确资源中检查 URL，分别记录已保存的索引信息与实时测试结果；必要时由有权限的人提交 sitemap 或请求编入索引。没有账号权限写“未检查”，不能编造截图或状态。提交后保留时间与结果，等待不等于成功。

产物：部署检查单与索引状态记录，明确证据范围。

## 可用工具

- 浏览器和开发者工具、已有 CMS/部署流程；Search Console 需要对应站点权限。

- 本站旧教程：抓取检查、提交 sitemap、单页检查。这三篇仅支持本阶段，不证明其他阶段已实测。

## 你要交付什么

- 发布记录：版本、最终 URL、时间、回滚点、各检查结果、证据链接、账号内未检查项、下一次复查条件。

## 完成标准

- 目标公开页可正常访问，关键任务可用，无已知意外索引阻碍；私密保护未更改；线上与预览结果分开；收录未知可进入观察，但不能标记收录成功。

## 遇到这些情况先停下

- 登录保护有意存在、无发布权限、页面错误、意外 noindex、错误 canonical 或无法回滚：先修复或交给负责人，暂停扩大发布。

## 下一步

技术阻碍解决后，进入第 5 步帮助合适的人发现页面；同时保留索引观察。

## 官方来源

- [Google Search technical requirements](https://developers.google.com/search/docs/essentials/technical) — 抓取可访问性、HTTP 200、可索引内容与不保证收录。 核查日：2026-10-10

- [Introduction to robots.txt](https://developers.google.com/search/docs/crawling-indexing/robots/intro) — robots.txt 控制抓取，不是隐私保护。 核查日：2026-10-10

- [Block indexing with noindex](https://developers.google.com/search/docs/crawling-indexing/block-indexing) — 爬虫必须能访问页面才能发现 noindex。 核查日：2026-10-10

- [Canonical URL methods](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls) — 规范网址信号及与 sitemap/站内链接的一致性。 核查日：2026-10-10

- [Build and submit a sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap) — 规范 URL、准确 lastmod、发现线索而非收录保证。 核查日：2026-10-10

- [URL Inspection tool](https://support.google.com/webmasters/answer/9012289) — 已保存索引信息、实时测试和权限边界。 核查日：2026-10-10

- [Tell Google about localized versions](https://developers.google.com/search/docs/specialty/international/localized-versions) — 独立语言网址与互相对应的 hreflang。 核查日：2026-10-10



阶段拆分、清单、产物模板与诊断顺序是 First Crawl 的原创教学设计，不是 Google 的官方认证课程或排名公式。
