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
- queries[]：{submitted_query, effective_query, searched_at, search_url, engine, observed_region, language, filters, modules, organic_results, target_visibility, evidence_ids}。
- organic_results[]（嵌套）：{observed_organic_order, title, observed_url, result_type, snippet_summary, evidence_ids}。广告不在此数组。
- modules[]（嵌套）：{type, observed_location, description, evidence_ids}，如广告、地图、AI 摘要；不要用它们构造自然排名。
- competitor_pages[]：{source_query, observed_url, final_url, fetched_at, selection_reason, access_status, title, h1, page_type, audience, task_served, sections_summary, evidence_strengths, missing_needs, observed_updated_date, claims, evidence_ids}。
- opportunities[]：{audience, user_task, proposed_page_type, evidence_gap, original_asset_needed, supporting_evidence_ids, validation_plan, confidence}。

## 解释校验示例（合成）
前 5 个自然结果未见用户页：target_visibility=NOT_OBSERVED_WITHIN_SAMPLE，不能写 NOT_INDEXED。页面自称提高收入 30%：claims 中标 self-reported，不能转成已验证效果。当前位置 unknown：不能交付“美国 Google 排名第 1”。
