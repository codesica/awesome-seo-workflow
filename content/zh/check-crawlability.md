---
title: "搜索引擎能访问你的网页吗？新手抓取检查"
slug: "check-crawlability"
description: "检查公开网页的响应、robots 抓取规则和收录指令，再核实 Google 或 Bing 实际能读取什么。"
level: "新手"
lastReviewed: "2026-10-10"
locale: "zh-CN"
---

# 搜索引擎能访问你的网页吗？

一个网页在你已登录的浏览器里能正常打开，不代表搜索引擎也能访问。本教程帮你分清四件事：这个网址有没有响应？搜索引擎的爬虫能不能读取它？网页是否允许被收录？搜索引擎实际上有没有收录它？

先认识两个词：**抓取（crawl）**是爬虫访问网址、读取内容；**收录（indexing）**是搜索引擎把页面纳入可用于搜索的索引。能抓取、允许收录、实际已收录，是不同的检查结果。

这次要交付的是一份简短的证据记录，以及一个最值得先做的下一步，不是追求“SEO 满分”。

## 你需要准备什么

- 一个你拥有、或已获授权检查的公开网址，例如 `https://example.com/guides/seed-starting/`。这是示例地址，请换成你自己的。
- 一个浏览器。开发者工具不是必需的，也不需要付费 API。
- 可选：对应网站在 Google Search Console 或 Bing Webmaster Tools 中的访问权限。它们是搜索引擎提供给站长的管理工具。

可下载的 Skill（给 AI 助手使用的任务说明与工作流程）可以带你检查，也可以分析你提供的证据。但安装 Skill 不会自动给它 Google 或 Microsoft 账号访问权，不会替你验证网站所有权，也不代表你授权它修改网站。请通过官方服务自行登录。不要把密码、Cookie、令牌或私密账号导出文件粘贴到公开代码仓库。

## 1. 先确认你希望页面处于什么状态

写下：这个页面是否应该公开，并且能在搜索中找到？客户账号页、测试站和私人控制台本来就可能需要限制爬虫。不要为了让私密页面通过练习而移除登录验证或降低安全保护。

在退出登录的浏览器或无痕窗口里打开网址，记下跳转结束后的最终地址。你能否在不登录、不完成验证挑战、不通过访问门槛的情况下读到正文？记录检查时间和你实际看到的情况。

## 2. 检查服务器实际返回了什么

打开开发者工具，选择 Network（网络），刷新网页，然后选中网页文档请求，而不是图片或脚本请求。记录状态码和所有跳转。在 Response（响应）标签里确认：返回的内容是你预期的页面，而不是错误提示。

也可以在终端运行以下命令。它会发送 GET 请求，并把证据保存在本地。代码保留英文原样；运行前只替换示例网址：

```sh
curl --location --max-redirs 5 --max-time 30 \
  --dump-header crawl-headers.txt --output crawl-page.html \
  --write-out 'Final URL: %{url_effective}\nStatus: %{http_code}\n' \
  'https://example.com/guides/seed-starting/'
```

`crawl-headers.txt` 保存响应头，`crawl-page.html` 保存返回的正文。终端里的 `Final URL` 是最终网址，`Status` 是状态码。

不要为了拿到结果而关闭证书验证。如果命令失败，保存错误信息并排查原因。这些文件只能说明**这次请求所用的客户端**拿到了什么，不能说明 Googlebot（Google 的爬虫）拿到了什么。

对希望被收录的页面，应检查最终响应是否为 `200`，并且确实包含有意义的内容。即使状态码是 `200`，正文却显示“找不到页面”，仍然有问题。跳转本身不一定错误，重点是检查它最后去了哪里。Google 的[技术要求](https://developers.google.com/search/docs/essentials/technical)包含正常响应和可用于收录的内容。

## 3. 把“允许抓取”和“允许收录”分开检查

打开该网站**同一来源**的 `/robots.txt`，例如 `https://example.com/robots.txt`。这里的来源指协议、主机名及适用端口的组合，不要误看另一个子域名或协议上的文件。

**robots.txt** 可以理解为网站给爬虫看的抓取规则清单。记录对目标页面和目标爬虫适用的规则。如果适用规则组里写着 `Disallow: /`，就是禁止抓取该来源下的全部路径。但更具体的爬虫规则组和路径匹配可能改变结论，不能只看第一个规则组就说“允许抓取”。没有 robots.txt 也不自动等于故障。robots 规则管理抓取，**不能保护机密信息**。参见 Google 的 [robots.txt 入门说明](https://developers.google.com/search/docs/crawling-indexing/robots/intro)。

接着检查 HTML 的 head 部分是否包含 robots meta 指令，以及响应头里是否有 `X-Robots-Tag`。把发现的 `noindex` 或针对特定爬虫的规则记下来。

**noindex** 的意思是“不要把此页面放进搜索索引”。如果页面本应出现在搜索中，意外存在的 noindex 就需要处理。不过爬虫必须能读取页面，才能看到这个指令；如果同一个页面又被 robots.txt 禁止抓取，爬虫可能根本看不到 noindex。Google 的 [noindex 指南](https://developers.google.com/search/docs/crawling-indexing/block-indexing)解释了这个区别。

## 4. 有账号权限时，再用搜索引擎自己的工具核实

在 Google Search Console 中选择对应的网站资源（property，即账号中管理的那个网站范围），检查完整页面网址。把现有索引报告和新运行的 Test live URL（测试实际网址）结果分开记录。能查看测试 HTML 时，核对其中是否有实际标题和正文中的一句话。

已保存的索引报告和实时测试回答的是不同问题。公开请求成功或实时测试成功，都不能证明刚刚发生了一次新的收录。参见 [URL 检查工具说明](https://support.google.com/webmasters/answer/9012289)。

在 Bing Webmaster Tools 中选择已验证的网站，打开 URL Inspection（URL 检查），检查同一地址。同样把 Index（索引）和 Live URL（实时网址）结果分开。Bing 的实时检查会识别跳转，你可以再单独检查跳转后的地址。参见 [Bing URL 检查说明](https://www.bing.com/webmasters/help/URL-Inspection-55a30305)。

如果没有对应网站的账号权限，就只做到公开证据这一层，把搜索引擎账号内的结果标为“未检查”，并请网站所有者完成需要账号的测试。不要编造后台结果。

## 保存你的检查记录

下面是中文填写模板：

```text
网址与预期读者：
检查时间（包含时区）：
最终网址与响应状态码：
可见的主要内容：
适用的 robots 规则及证据：
HTML meta / 响应头中的收录指令：
Google 已保存结果 / 实时结果 / 未检查：
Bing 已保存结果 / 实时结果 / 未检查：
下一步、负责人、再次检查的条件：
```

## 完整示例：被禁止抓取的页面

**这是合成教学案例，不是真实线上检查结果。** 输入来自 [robots 禁止抓取示例](/examples/#robots-block)，假设有一个公开徒步指南：`https://example.com/trail-guide/`。本例没有声称发送过 HTTP 请求、查看过账号或修改过正式网站。

以下保留英文原始记录，便于逐字核对证据；下一段逐项解释其含义：

```text
URL and intended audience: https://example.com/trail-guide/; public readers
Checked at: Not live-tested; synthetic teaching record
Final URL and response status: Not checked; fixture only contains robots rules
Visible main content: Not checked
Applicable robots rule: User-agent: * / Disallow: /
Meta/header indexing directives: Not checked
Google stored result / live result: Not checked / Not checked
Bing stored result / live result: Not checked / Not checked
Next action: Site owner confirms public intent, removes the accidental block,
then runs the complete live page check after deployment
```

按顺序读懂每一项：

- **网址与预期读者**：目标是公开读者应能阅读的徒步指南，因此在这个设定里，禁止抓取是不符合预期的。
- **检查时间**：写的是“未做线上测试；合成教学记录”，没有伪造抓取时间。
- **最终网址与响应状态**：未检查。测试样例文件只含 robots 规则，不含页面响应。
- **可见主要内容**：同样未检查。不能从网址名字推断正文存在。
- **适用 robots 规则**：`User-agent: * / Disallow: /` 表示这个简单样例中的通配爬虫组禁止所有路径。这才是本次发现问题的直接证据。
- **meta / 响应头收录指令**：未检查，需要独立的页面证据，本例没有提供。
- **Google 和 Bing 结果**：需要账号观察，因此两家的已保存与实时结果，共四项，都明确保留为未检查。
- **下一步**：由网站所有者先确认页面确实应该公开，再移除误设的抓取限制，并在部署后完成整套线上检查。离线修正的规则只能证明“抓取许可发生变化”，不能证明页面在线可访问或已经被收录。

弄清访问情况后，可以继续[站点地图教程](/guides/sitemap/)。

## 遇到失败时怎么办

- **401、403、要求登录或验证挑战**：先判断限制是否有意设置。对于应当公开的页面，请网站维护者排查相关访问日志或反机器人安全日志。不要把全站安全保护关掉来图省事。
- **404 或跳到了错误地址**：确认发布路径和路由。决定正确网址后，再更新链接。
- **500 类响应或超时**：把确切网址、时间和响应证据交给托管服务方。
- **浏览器正常，但搜索引擎测试失败**：比较时间和返回内容。缓存、渲染和访问控制都是可能原因，不能未经证实就当作诊断结论。
- **检查都通过，但搜不到页面**：可抓取只是前提之一。继续检查站点地图和页面质量，不要承诺收录时间。

经授权的修复部署后，重复相同检查，并保留前后证据。确认修正后的行为确实生效，或明确找出具体阻碍及负责人，这次检查才算有一个可信的交代。
