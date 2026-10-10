# 指标解释与诊断判据
- 展示（impressions）表示符合该报表定义的搜索展示；点击（clicks）不是 Analytics 会话或转化。CTR = clicks/impressions；分母为零时为 null。
- Average position 是报告聚合值，不能解释为某关键词固定排名。页面/站点与不同展示类型的聚合可能不一致；记录当前维度与 search type。
- 点击下降伴随 impressions 下降：优先比较查询/页面/国家/设备构成、日期与季节性，再看索引证据；这不是“Google 惩罚”的证明。
- Impressions 上升、CTR 下降：先看查询构成和排名变化，再提出标题/摘要意图匹配假设；不把相关性当因果。
- 只看 GSC 不能得知收入、询盘或成交。没有转换数据就将 business_outcome 设为 unknown。
- Page indexing 的总量反映 Google 已知范围；例子不是全量 URL。目标是重要 canonical 页面，而不是所有 URL 100% indexed。
- Discovered/Crawled currently not indexed：原样记录，不从这一标签直接诊断为低质量。检查更新时间、对应 URL 及已有 canonical/抓取证据，再列假设。
- robots.txt 与 noindex 不等价；不要仅凭 robots 阻止抓取推断已从搜索删除。结合 inspection 的实际结果。
- 读取不到某个报告可能是权限、数据尚未生成、站点范围、界面变化，不得直接解释为零。

## 报告中需要揭示的数据限制
Queries 可能省略匿名化及其他低频行；分组、过滤器和表行限制会影响合计。日粒度 PT 不等于用户时区。UI 导出通常至多 1,000 示例行且总量可能包含未导出的数据；记录实际数量与文件内容，不将其称为完整仓库。性能报告与索引报告刷新节奏不同，采集时间不等于数据发生时间。
