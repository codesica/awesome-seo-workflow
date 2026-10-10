# 站点地图地址返回了应用页面外壳

证据：**合成教学案例。没有检查或修改真实网站。**

## 输入

打开本目录的 `before/sitemap.xml`，先自己判断问题，再运行检查。

站点地图应给出搜索引擎可读取的网址清单。“应用页面外壳”指供浏览器加载应用的通用 HTML 页面。文件名叫 sitemap.xml，不代表里面真的装着 XML 地图。

## 检查发现

模拟响应状态为 HTTP 200，但正文是 HTML，不是应该返回的 XML 站点地图。

## 如何修正

让站点地图路由在“所有其他路径都返回 HTML”的兜底路由之前生效，返回真正的站点地图 XML，并使用适当的 XML 内容类型。对比 `before/` 和 `after/` 文件。

## 验收标准

修正后的样例能解析为一个 sitemap `urlset`，其中包含一个绝对网址。**本例没有声称已经提交地图或完成抓取。**

文件名和 HTTP 200 单独都不能证明地图有效。普通 HTML 页面不是 XML 站点地图。Google 也支持其他地图格式，但这项练习特意只检查 XML。地图可访问不保证页面收录。

官方参考：[Google Search Central](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)。原稿核验日期：2026-10-10。
