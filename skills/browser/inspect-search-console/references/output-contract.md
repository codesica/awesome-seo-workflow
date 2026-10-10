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
- dimension_rows[]：{dimension, raw_label, raw_metrics, normalized_metrics, date_range, filters, row_scope, evidence_ids}。
- indexed_url_checks[]：{url, checked_at, verdict, reason, last_crawl, crawl_allowed, fetch_result, indexing_allowed, user_canonical, google_canonical, unavailable_fields, evidence_ids}。crawl_allowed 等有明文结果才填 true/false。
- live_url_checks[]：{url, tested_at, authorization_basis, verdict, crawl_allowed, fetch_result, indexing_allowed, unavailable_fields, evidence_ids}。禁止把 indexed 的 canonical 数据填进 live 检查中。
- indexing_summary.reasons[]：{label, count, source, validation_status, data_as_of, sample_urls, expected_or_unexpected, evidence_ids}。

## 数值校验示例（合成，仅测试公式）
此前 clicks=0、现在 clicks=5：Δ=5，相对变化为 null（不能写无限增长）。独立且数值自洽的一组 CTR：此前 2%、现在 3%，变化 +1 个百分点，非 +1%。若同一范围还显示此前 clicks=0，CTR=2% 则与之冲突，保留原值并标记需核对，不直接使用此变化结论。两行分别 1/10 与 9/90：总 CTR=10/100=10%。页面 '-' 与导出 0 冲突：记录 missing，不判为真实 0。
