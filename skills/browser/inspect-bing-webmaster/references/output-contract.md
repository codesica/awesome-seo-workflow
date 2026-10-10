# 结果填写契约 / Output contract
result-template.json 是空白运行记录，不是已经完成的报告。保持 null 表示未知，[] 表示本次未采集该类记录；有证据表明数量为零才用 0。时间使用 ISO 8601 并保留时区。所有 URL 使用实际观察 URL，去掉非必要跟踪参数时另保留原始 URL 证据；不要存储带认证 token 的 URL。

## 公共数组记录
- evidence[]：{id, source_type, captured_at, page_url, report_name, observation, artifact_path, data_as_of, scope}。source_type 为 browser_observation / downloaded_report / supplied_screenshot / supplied_transcription；用户转录的缺失采集时间、页面 URL、文件路径可以为 null，不制造来源。id 为本报告唯一标识，如 E1；observation 为实际观察原文/数值；artifact_path 可为 null。
- findings[]：{id, summary, type, priority, confidence, affected_urls, evidence_ids, hypothesis, validation_step}。type 为 observation / inference；priority 为 high / medium / low，基于业务影响，不能只照抄工具颜色；confidence 为 high / medium / low。
- recommended_next_steps[]：{action, reason, evidence_ids, requires_new_authorization, expected_verification}。只建议不执行写操作。
- blocker：null 或 {stage, reason, exact_action_blocked, minimum_user_step}；没有阻塞则 null。
- exports[]（若有）：{path, format, report_url, saved_at, filters, date_range, row_count, completeness, missing_value_caveat, evidence_ids}。completeness 为 UI_SAMPLE / VISIBLE_ONLY / UNKNOWN；只有权威证据支持才另行说明完整性。

空白模板的 schema_version 用来标记字段版本；不是完整 JSON Schema 验证器。交付给普通用户时另给短中文/英文摘要，不要求用户阅读 JSON。

## 该 Skill 的记录
- indexed_url_checks[]：{url, checked_at, verdict, discovered_at, crawled_at, indexed_at, http_status, reason, seo_issues, markup_issues, unavailable_fields, evidence_ids}。
- live_url_checks[]：{url, tested_at, authorization_basis, verdict, http_status, redirect_target, crawl_issue, unavailable_fields, evidence_ids}。重定向目标另起记录，不覆盖源 URL。
- sitemaps[]：{url, parent_index_url, kind, origin, submitted_or_discovered_at, last_processed_at, processing_status, discovered_urls, indexed_urls_if_shown, errors, evidence_ids}。
- site_explorer_samples[]：{path_scope, filters, status_label, count_if_shown, sample_urls, evidence_ids}。

## 解释校验示例（合成）
Sitemap 显示 success、discovered=100，单 URL Live 可抓取：只证明该 sitemap 被处理与该 URL 实时可抓取；indexed_urls_if_shown 必须为 null。Live 得到 301：记录重定向，不写源 URL 200，也不自动触发索引提交。
