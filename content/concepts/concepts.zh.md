# 概念与指标速查

先分清发生在哪一层，再决定改什么。所有例子均为假设，不是本站成绩。

SEO 不能保证收录或排名。这里的技术规则以 Google 官方说明为准；其他引擎需另行核对。

发现 → 抓取 → 索引 → 曝光 → 点击 → 实际使用 / 转化

这是概念顺序，不是一张能直接相除的统计报表：URL 数、曝光次数、点击次数和转化事件不是同一单位。没有填入虚构流量或转化率。

## 搜索意图 · search-intent
一个人搜索这句话时，真正想完成的事。

假设搜索“压缩图片不损画质”，可能想马上用工具，而非读格式历史。

不要混淆：你希望卖什么，不一定是对方想找什么；意图是待验证判断。
证据：实际结果页的页面类型、用户原话、试用反馈。
阶段：01-search-opportunity, 02-page-plan
来源：[Google SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)

## 关键词与查询 · keyword
查询是用户实际输入的话；关键词是你研究和组织主题时用的词。

假设用户输入“png 怎么变小”，你把它归到“PNG 压缩”主题。

不要混淆：不必给每个近义词各做一页，也不是重复越多越好。
证据：GSC 查询、访谈用词、同主题结果页。
阶段：01-search-opportunity, 02-page-plan
来源：[Google SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)

## 长尾词 · long-tail
需求分布里较少被单独搜索、通常更具体的一类查询。

假设“批量压缩透明 PNG”比“图片”需求更具体；真实搜索量仍要查。

不要混淆：长尾不是单纯字数多，也不保证低竞争或高转化。
证据：查询细节与需求证据；工具搜索量只作估计。
阶段：01-search-opportunity, 02-page-plan
来源：[Google SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)

## 搜索结果页 · serp
搜索后出现的整页结果，可能包含自然结果、广告与其他模块。

假设搜“图片压缩”，记录前排是工具、教程还是产品对比。

不要混淆：广告位不等于自然排名；一次截图不是所有人的结果。
证据：记录查询、时间、地区、设备、结果类型。
阶段：01-search-opportunity, 02-page-plan, 06-measure-iterate
来源：[How Google Search works](https://developers.google.com/search/docs/fundamentals/how-search-works)

## 发现 URL · discovery
搜索引擎知道这个网址存在。

假设旧教程链接到新工具页，爬虫可从链接发现新网址。

不要混淆：被发现不等于已经访问或收录。
证据：URL 检查中的已知状态、引用页或站点地图信息。
阶段：04-publish-check, 05-discovery-promotion
来源：[How Google Search works](https://developers.google.com/search/docs/fundamentals/how-search-works)

## 抓取 · crawl
爬虫向服务器请求页面和资源。

假设 Googlebot 请求 /compress，服务器返回网页。

不要混淆：返回成功不等于内容已被索引。
证据：URL 检查的上次抓取与获取状态；必要时核验服务器日志。
阶段：04-publish-check, 05-discovery-promotion
来源：[How Google Search works](https://developers.google.com/search/docs/fundamentals/how-search-works)

## 渲染 · render
运行页面代码，把页面组装成可读取的内容。

假设说明文字由 JavaScript 加载，检查渲染后是否真的出现。

不要混淆：自己浏览器看得见，不证明爬虫也能得到相同内容。
证据：URL 检查的渲染 HTML、截图与资源加载结果。
阶段：03-content-production, 04-publish-check
来源：[JavaScript SEO basics](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics)

## 索引 / 收录 · index
搜索引擎处理页面，并将相关信息存入搜索索引。

假设 URL 检查报告该页面已编入索引，它才具备被检索的基础。

不要混淆：已收录不保证会在某个查询下展示。
证据：URL 检查与网页索引报告；不要只依赖 site: 搜索计数。
阶段：04-publish-check, 05-discovery-promotion, 06-measure-iterate
来源：[How Google Search works](https://developers.google.com/search/docs/fundamentals/how-search-works)

## 排名 · ranking
搜索引擎针对一次查询选择和排列结果。

假设同一工具在“PNG 压缩”和“缩小 JPG”中位置不同。

不要混淆：没有一个永久、适用于所有查询和地区的站点排名。
证据：按查询、页面、国家、设备拆分观察 GSC。
阶段：01-search-opportunity, 06-measure-iterate
来源：[How Google Search works](https://developers.google.com/search/docs/fundamentals/how-search-works)

## 曝光 · impressions
搜索结果按相应统计规则记录了你的链接展示。

假设报告显示 100 次曝光，只说明被记录了 100 次展示。

不要混淆：曝光不是 100 个独立访客，也不是 100 次点击。
证据：GSC 曝光；保持搜索类型、日期和筛选条件一致。
阶段：06-measure-iterate
来源：[Search Console metric definitions](https://support.google.com/webmasters/answer/7042828?hl=en)

## 点击 · clicks
搜索结果中通往你站点的点击，按报告规则统计。

假设 GSC 有 10 次点击，继续查看这些访问是否完成任务。

不要混淆：点击不等于会话数、独立人数或购买。
证据：GSC 点击与站内分析分开看，口径不必完全一致。
阶段：06-measure-iterate
来源：[Search Console metric definitions](https://support.google.com/webmasters/answer/7042828?hl=en)

## 点击率 · ctr
同一统计范围内，点击次数除以曝光次数。

假设 100 次曝光、5 次点击，CTR 是 5%；这是算例。

不要混淆：没有适用于所有位置、查询和结果样式的好 CTR。
证据：同类查询与设备下比较；零曝光时不能计算有意义的 CTR。
阶段：06-measure-iterate
来源：[Search Console Performance report](https://support.google.com/webmasters/answer/7576553?hl=en)

## 平均位置 · average-position
GSC 对曝光时所记录位置的平均值；站点聚合通常取最靠前的结果。

假设两次曝光位置为 2 和 8，简化算例的平均值为 5。

不要混淆：平均位置 5 不代表每个人都看到你排第五。
证据：先固定查询、页面、国家和设备，再结合曝光与点击看。
阶段：06-measure-iterate
来源：[Search Console metric definitions](https://support.google.com/webmasters/answer/7042828?hl=en)

## 实际使用与转化 · conversion
访问者完成你事先定义的有价值动作。

假设工具页的目标是成功导出压缩图片，记录导出成功事件。

不要混淆：打开页面不是自动完成转化；GA4 关键事件也不自动等于收入。
证据：先测试事件是否正确触发，再查实际使用、线索或订单。
阶段：02-page-plan, 06-measure-iterate
来源：[Analytics key events and conversions](https://support.google.com/analytics/answer/13965727?hl=en)

## 抓取规则文件 · robots-txt
放在网站根目录、告诉守规矩爬虫哪些路径可以抓取的文件。

假设禁止抓取 /drafts/，爬虫可能仍从外链知道那些网址。

不要混淆：robots.txt 不是可靠的去索引或隐私保护手段。
证据：查看真实 /robots.txt 与 URL 检查的抓取允许状态。
阶段：04-publish-check
来源：[Introduction to robots.txt](https://developers.google.com/search/docs/crawling-indexing/robots/intro)

## 不索引指令 · noindex
告诉支持它的搜索引擎不要把这个页面放进搜索结果。

假设公开测试页带 noindex；发布正式页前检查是否误保留。

不要混淆：Google 必须能抓取页面才能读取 noindex；它也不是登录保护。
证据：检查 robots meta、X-Robots-Tag 与抓取权限。
阶段：04-publish-check
来源：[Block indexing with noindex](https://developers.google.com/search/docs/crawling-indexing/block-indexing)

## 规范网址 · canonical
相似或重复内容里，你建议搜索引擎优先认定的代表网址。

假设 /compress?ref=news 与 /compress 内容相同，建议后者为 canonical。

不要混淆：canonical 是信号，不是强制命令、跳转或删页。
证据：核对声明的 canonical 与 Google 选择的 canonical。
阶段：02-page-plan, 04-publish-check
来源：[Specify a canonical URL](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls)

## 站点地图 · sitemap
列出你希望搜索引擎发现的重要网址的文件。

假设新增工具页，把正式网址加入 sitemap 并检查读取情况。

不要混淆：提交成功不保证抓取或收录，也替代不了页面间导航。
证据：站点地图是否可访问、报告是否成功读取、网址是否正确。
阶段：04-publish-check, 05-discovery-promotion
来源：[Sitemap overview](https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview)

## 内链 · internal-link
你网站上的一个页面链接到同一网站的另一个页面。

假设 PNG 教程用“批量压缩 PNG”链接到对应工具页。

不要混淆：内链不是只把页面塞进 sitemap；关键链接要真的能点击和被识别。
证据：检查 a 元素的 href、目标响应和锚文本是否清楚。
阶段：02-page-plan, 03-content-production, 05-discovery-promotion
来源：[Link best practices](https://developers.google.com/search/docs/crawling-indexing/links-crawlable)

## 外链 / 反向链接 · backlink
其他网站指向你页面的链接；你引用外站则是出站链接。

假设设计教程作者自然引用你的压缩工具。

不要混淆：外链数量不等于质量；为操纵排名买卖链接有风险。
证据：查看真实来源页、上下文、相关性及带来的访问。
阶段：05-discovery-promotion
来源：[Link best practices](https://developers.google.com/search/docs/crawling-indexing/links-crawlable), [Google Search spam policies](https://developers.google.com/search/docs/essentials/spam-policies)

## 语言 / 地区版本标注 · hreflang
告诉 Google 哪些网址是同一内容的不同语言或地区版本。

假设 /zh/compress 与 /en/compress 相互标注 zh 与 en，并各自标注自己。

不要混淆：它不会翻译页面，也不应把无关页面强行配成语言版本。
证据：检查双向与自引用、完整网址、语言代码及真实内容对应。
阶段：02-page-plan, 04-publish-check
来源：[Localized versions of pages](https://developers.google.com/search/docs/specialty/international/localized-versions)

## 页面标题与结果标题 · title-link
页面 title 描述主题；搜索结果标题可能由 Google 综合生成。

假设标题是“透明 PNG 批量压缩工具”，正文确实支持这个功能。

不要混淆：HTML title、正文 H1 与搜索结果标题不是同一个字段。
证据：核对 title、可见主标题、实际结果与页面能力。
阶段：02-page-plan, 03-content-production, 06-measure-iterate
来源：[Influencing title links](https://developers.google.com/search/docs/appearance/title-link)

## 页面描述与摘要 · meta-description
你可写页面描述；Google 的结果摘要也可能取自正文。

假设写明“保留透明背景，支持批量处理”，并确保页面能兑现。

不要混淆：写了描述不代表 Google 必须原样展示。
证据：比较 meta description、正文和不同查询下的实际摘要。
阶段：03-content-production, 06-measure-iterate
来源：[Search snippets and meta descriptions](https://developers.google.com/search/docs/appearance/snippet)

Verified / 核验日期: 2026-10-10

搜索意图、关键词分组和长尾词为本教程的工作定义；所链 Google 指南提供相关背景，不宣称这些分类是 Google 的官方指标。
