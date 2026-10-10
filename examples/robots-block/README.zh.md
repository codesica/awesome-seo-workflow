# 准备公开的页面被禁止抓取

证据：**合成教学案例。没有检查或修改真实网站。**

## 输入

打开本目录的 `before/robots.txt`，先自己判断问题，再运行检查。

robots.txt 是给爬虫看的抓取规则文件。`User-agent: *` 表示通配爬虫规则组；`Disallow: /` 表示不允许抓取这个来源下的所有路径。

## 检查发现

通配爬虫组禁止所有路径，包括 `/trail-guide/`。

## 如何修正

先确认页面确实应该公开，再移除误设的全站禁止抓取规则。对比 `before/` 和 `after/` 文件。

## 验收标准

修正后的样例规则允许 Googlebot 获取 `/trail-guide/`。这项检查只验证抓取许可，**不验证收录**。

robots 规则控制抓取，不能作为隐私保护措施。被禁止抓取的网址仍可能出现在搜索中。不要把这个开放抓取的样例直接搬到私密网站。

官方参考：[Google Search Central](https://developers.google.com/search/docs/crawling-indexing/robots/intro)。原稿核验日期：2026-10-10。
