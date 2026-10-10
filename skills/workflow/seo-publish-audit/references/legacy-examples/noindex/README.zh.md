# 应当公开参与搜索的页面仍带有 noindex

证据：**合成教学案例。没有检查或修改真实网站。**

## 输入

打开本目录的 `before/page.html`，先自己判断问题，再运行检查。

noindex 是“不要把此页面放进搜索索引”的指令，可以出现在 HTML 元数据或 HTTP 响应头中。公开可访问与允许被收录，是两回事。

## 检查发现

HTML 的 robots meta 标签包含 noindex。

## 如何修正

从生成这条指令的源头移除意外的 noindex。对于真实网站，HTML 元数据和响应头两处都要检查。对比 `before/` 和 `after/` 文件。

## 验收标准

修正后的 HTML 和模拟响应头中都没有 noindex 指令。**Google 是否收录仍未验证。**

Google 必须能抓取页面，才能看到 noindex。不要为了通过检查就移除私密内容或不应参与搜索的内容上有意设置的 noindex。另加一条 `index`，不能覆盖另一条适用的 noindex。

官方参考：[Google Search Central](https://developers.google.com/search/docs/crawling-indexing/block-indexing)。原稿核验日期：2026-10-10。
