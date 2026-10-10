# 两个 canonical 标签指向不同网址

证据：**合成教学案例。没有检查或修改真实网站。**

## 输入

打开本目录的 `before/page.html`，先自己判断问题，再运行检查。

canonical 是告诉搜索引擎“我希望这个网址作为此内容的代表”的偏好声明，不是保证搜索引擎一定采用它的命令。

## 检查发现

同一个页面的两个 canonical link 元素分别指向不同网址。

## 如何修正

确认预期的代表页面，只输出一条一致的 canonical，并让站点地图与它保持一致。对比 `before/` 和 `after/` 文件。

## 验收标准

只剩一条 canonical，且与样例站点地图中的网址一致。**Google 实际选中的规范网址仍未验证。**

canonical 声明只表达偏好，Google 可能选择不同的代表页面。复制这个模式前，应先确认所选目标合适且可访问。

官方参考：[Google Search Central](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls)。原稿核验日期：2026-10-10。
