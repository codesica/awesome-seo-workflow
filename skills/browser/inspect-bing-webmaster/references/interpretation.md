# Bing 诊断判据
- Sitemap processing success：处理成功的信号，不保证其中 URL 被索引。
- Sitemap discovered URLs：发现规模，不能用它计算“已索引百分比”，除非另有相同范围/日期的可靠已索引分子。
- Indexed snapshot：引擎已存储的信息；Live URL：当前诊断抓取。两者时间不同可产生合理差异。
- Live redirect：记录响应与目标，再判断是否需要检查目标；禁止直接把目标的成功结果套到原 URL。
- SEO/Markup 卡片：规则检查结果，先确认业务影响与具体元素，不能据卡片分数承诺排名。
- 已知但未索引：仅此信息不能判定站点被处罚，也不能保证提交后恢复。
- No data / empty table：先检查站点、过滤器、更新时刻、权限。未知不得转成零。
- 明确分类建议：EXPECTED_EXCLUSION / INVESTIGATE / FIX_CANDIDATE；FIX_CANDIDATE 仍需独立修改授权。

抽样应覆盖用户的重要 URL 和所见主要状态；仅检 5 个 URL 时结论只能覆盖这 5 个及对应报表总量。检查 sitemap index 时不要把父级汇总和子文件数据重复相加。
