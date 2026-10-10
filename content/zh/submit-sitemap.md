---
title: "提交站点地图，并读懂结果究竟代表什么"
slug: "submit-sitemap"
description: "找到并验证站点地图，通过官方站长工具提交，分清处理成功与页面收录。"
level: "新手"
lastReviewed: "2026-10-10"
locale: "zh-CN"
---

# 提交站点地图，并读懂提交结果

**站点地图（sitemap）**是一份你希望搜索引擎发现的网址清单。它不是强制收录或保证排名的指令。完成本练习后，你应该有一份提交记录，并且另外检查过一个重要页面。

## 准备资料与权限

你需要网站的公开来源地址（例如 `https://example.com`）、站点地图的网址，以及几个应该出现在搜索中的重要页面。通过账号提交时，需要登录搜索引擎的官方服务，并拥有相应网站权限。通过 Google 的 Sitemaps（站点地图）报告提交，要求具备所有者权限。

本流程使用免费的官方界面。Skill 可以解释你主动提供的报告，但不会因为被安装就自动登录或读取你的账号。不要把账号凭据或验证秘密放进聊天提示词或 GitHub。

## 1. 先找现有的站点地图

检查 CMS（内容管理系统）或网站生成器的设置和文档。打开 `/robots.txt`，寻找 `Sitemap:` 这一行。常见文件名有 `/sitemap.xml` 和 `/sitemap_index.xml`，但它们只是常见约定，不保证你的站点也使用这些地址。

退出登录后打开候选网址。你应该看到站点地图文档，而不是登录页面或网站正常首页。XML 站点地图包含网址条目；站点地图索引则列出多个子站点地图。如果拿到的是索引，至少再打开一个子地图，确认它也能正常读取。

不要因为第一个猜测的文件名不存在，就立刻再装一套生成器。先确定现有文件由哪个系统维护，避免多个生成器互相冲突。

## 2. 提交前，先检查清单

挑三个重要的已发布页面；如果网站不到三个页面，就全部检查。逐项确认站点地图中写的是预期的最终网址，并且页面能正常打开。你计划让搜索引擎发现的清单中，不应包含私密页面、有意排除的页面、过时的跳转地址或误加的重复页面。

如果是没有生成器的小型静态网站，可以参考下面的起始结构。**这是示范，不是可以不加修改就部署的文件。**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://example.com/</loc></url>
  <url><loc>https://example.com/guides/seed-starting/</loc></url>
</urlset>
```

`urlset` 是这份网址清单的容器，`loc` 中放一个页面的完整网址。使用包含协议和域名的绝对网址，以及合法的 UTF-8 XML。XML 值中的特殊字符需要转义，例如 `&` 要写成 `&amp;`。

单个站点地图最多包含 50,000 个网址，未压缩大小最多 50 MB。更多的网址应拆分成多个地图，再用索引组织。如果提供 `lastmod`（最后修改时间），要填写准确的、内容发生重要更新的日期，不要每次构建网站都改成当时的时间。Google 的[站点地图构建指南](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)说明了这些要求。

通过正常且已获授权的工作流程发布。继续之前，重新打开已部署的文件。文件只是保存在你的电脑里，还不等于搜索引擎可以公开访问它。

## 3. 在 Google Search Console 中提交

打开 [Google Search Console](https://search.google.com/search-console)，登录后选择覆盖该站点地图实际主机名和协议的网站资源。打开 Sitemaps（站点地图），在 Add a new sitemap（添加新的站点地图）中填写地址。如果界面已经显示网址前缀，注意不要重复填写，然后提交。

把界面显示的**原始状态文字**和最后读取日期复制到记录中。如果界面不允许提交，检查当前网站资源和自己的权限，不要反复换账号尝试。

这样解读结果：

- **Success（成功）**：Google 获取并解析了站点地图，不代表其中每个页面都已收录。
- **Couldn't fetch（无法获取）**：检查站点地图文件本身的访问问题。
- **Sitemap had errors（站点地图存在错误）**：打开详情，先保存具体的解析或网址错误，再动手修改。

Google 的这个报告列出通过该报告或其 API 提交的地图。如果文件只是通过 robots.txt 被发现，未必会显示在这里。本流程特意使用官方界面，不做 API 集成。参见 [Sitemaps 报告帮助](https://support.google.com/webmasters/answer/7451001)。

## 4. 在 Bing Webmaster Tools 中提交

打开 [Bing Webmaster Tools](https://www.bing.com/webmasters)，登录并选择正确的已验证网站。在 Sitemaps（站点地图）中，先看文件是否已经被记录、导入或发现。确实需要提交时，再使用 Submit sitemaps（提交站点地图），填入公开可访问的地图网址。

记录处理状态、最后处理日期和发现的网址数量。这些只是对地图处理情况的观察，不是搜索流量承诺。Bing 的[站点地图帮助](https://www2.bing.com/webmasters/help/sitemaps-3b5cf6ed)介绍了这些字段。

不要使用旧教程里复制来的匿名“ping”提交网址。Bing 已经[移除匿名站点地图提交](https://blogs.bing.com/webmaster/2022/5/Spring-cleaning-Removed-Bing-anonymous-sitemap-submission/)，应使用官方界面或在 robots.txt 中声明站点地图。

## 5. 单独核实一个页面

选择清单里最重要的页面，在你有权限使用的站长账号中检查，并保存它实际的索引状态。如果做了实时抓取测试，单独记录。即使页面已通过站点地图提交，搜索引擎仍然需要抓取和评估它。Bing 的[为什么我的网站不在索引中？](https://www.bing.com/webmasters/help/why-is-my-site-not-in-the-index-2141dfab)也明确解释了这一点。

用下面的空白模板保存结果，只填亲自观察到的事实：

```text
网站 / 站点地图网址：
预期的重要网址，以及实际抽查范围：
检查公开文件的时间：
Google 提交时间 / 状态 / 最后读取时间 / 未检查：
Bing 提交时间 / 状态 / 最后处理时间 / 未检查：
抽查页面的网址与实际索引状态证据：
尚未解决的问题与下一次检查：
```

## 完整示例：所谓站点地图其实是 HTML

**这是合成教学案例，不是真实线上结果。** 使用 [XML 地址返回 HTML 的教学示例](/examples/#sitemap-html)。其中的响应信息和正文都是编写的测试样例，不是从服务器采集的输出。设定中的地图地址为 `https://example.com/sitemap.xml`，应该列出 `https://example.com/trail-guide/`。

下面保留英文原始记录，中文解读紧随其后：

```text
Site / sitemap URL: https://example.com/ / https://example.com/sitemap.xml
Expected important URL: https://example.com/trail-guide/
Public file checked at: Not live-tested; synthetic fixture review only
Modeled response: 200; text/html; body is a generic HTML page
Google submitted at / status / last read: Not submitted / Not checked / Not checked
Bing submitted at / status / last processed: Not submitted / Not checked / Not checked
Sample page index-status evidence: Not checked
Unresolved issue: Sitemap route serves an HTML app shell instead of XML
Next check: Maintainer fixes the route; verify deployed XML before submission
```

逐项理解：

- **网站 / 站点地图网址**：区分网站来源地址和本次诊断的具体文件。
- **预期的重要网址**：只是清单里本应出现的输入，不代表爬虫已经发现或收录它。
- **公开文件检查时间**：写明“未做线上测试，仅审阅合成样例”，没有编造实际检查时间。
- **模拟响应**：`200; text/html`，正文是普通 HTML 页面。这说明只看成功状态码不够；对于本次 XML 流程，正文类型就是错的。
- **Google 提交字段**：未提交、未检查、未检查。不是“提交失败”，而是还没有做提交，应先修好文件。
- **Bing 提交字段**：同样明确区分“没提交”和“提交失败”。
- **抽查页面索引证据**：未检查。即使替换后的 XML 看起来正确，也不能据此判断页面已收录。
- **尚未解决的问题**：地图路由返回了 HTML 应用外壳，而不是 XML。它指出具体缺陷，没有给整个网站贴上“SEO 很差”的标签。
- **下一次检查**：维护者修复路由，先验证已部署的 XML，再提交。修正后的教学文件只有一个绝对网址；正式部署和账号结果仍须另行检查。

如果连访问都失败，请回到[抓取检查教程](/guides/crawlability/)。地图处理完后，可以继续[单页 SEO 检查](/guides/page-check/)。

## 有依据地排查问题

- **返回 HTML 而不是 XML**：可能是兜底路由把所有地址都交给了应用首页。请维护者检查地图路由和部署文件。这里是待验证的可能原因，不是已证实的诊断。
- **要求登录或拒绝访问**：私密内容继续保持私密。如果地图本应公开，检查它这一条路由的访问策略。
- **XML 错误**：保存报错行号和信息，在生成器中修正不合法的标签或转义，然后重新发布和测试。
- **网址数量不符合预期**：先检查子地图、过滤条件、重复条目和处理时间，不要马上断言页面丢失。
- **地图成功，但抽查页面未收录**：检查抓取限制、排除收录指令、重复页面选择和内容问题。重复提交本身不证明事情有进展。

处理结束或真正完成修复后再回来，比较实际结果。完成这次练习的标准，是留下有效的提交记录，并诚实说明哪些仍然未知，而不是编造排名提升。
