# Output Contract
result-template.json is a blank run record, not a completed report. Keep null for unknown values and [] for record categories not collected in this run; use 0 only when evidence establishes a zero count. Use ISO 8601 times and retain time zones. Use actually observed URLs. If unnecessary tracking parameters are removed, separately preserve evidence of the original URL; do not store URLs containing authentication tokens.

## Shared array records
- evidence[]: {id, source_type, captured_at, page_url, report_name, observation, artifact_path, data_as_of, scope}. source_type is browser_observation / downloaded_report / supplied_screenshot / supplied_transcription. Missing collection times, page URLs, and file paths in user transcriptions may be null; do not fabricate provenance. id is unique within the report, such as E1. observation contains actual observed wording/values; artifact_path may be null.
- findings[]: {id, summary, type, priority, confidence, affected_urls, evidence_ids, hypothesis, validation_step}. type is observation / inference. priority is high / medium / low based on business impact, not simply copied from tool colors; confidence is high / medium / low.
- recommended_next_steps[]: {action, reason, evidence_ids, requires_new_authorization, expected_verification}. For write actions, provide recommendations only; do not execute them.
- blocker: null or {stage, reason, exact_action_blocked, minimum_user_step}; null when there is no blocker.
- exports[] (when present): {path, format, report_url, saved_at, filters, date_range, row_count, completeness, missing_value_caveat, evidence_ids}. completeness is UI_SAMPLE / VISIBLE_ONLY / UNKNOWN; describe completeness beyond these only with authoritative supporting evidence.

schema_version in the blank template identifies the field version; it is not a full JSON Schema validator. Provide an additional short English or Chinese summary for ordinary users rather than requiring them to read JSON.

## Skill-specific records
- queries[]: {submitted_query, effective_query, searched_at, search_url, engine, observed_region, language, filters, modules, organic_results, target_visibility, evidence_ids}.
- organic_results[] (nested): {observed_organic_order, title, observed_url, result_type, snippet_summary, evidence_ids}. Ads do not belong in this array.
- modules[] (nested): {type, observed_location, description, evidence_ids}, such as ads, maps, or AI summaries. Do not use these to construct organic rankings.
- competitor_pages[]: {source_query, observed_url, final_url, fetched_at, selection_reason, access_status, title, h1, page_type, audience, task_served, sections_summary, evidence_strengths, missing_needs, observed_updated_date, claims, evidence_ids}.
- opportunities[]: {audience, user_task, proposed_page_type, evidence_gap, original_asset_needed, supporting_evidence_ids, validation_plan, confidence}.

## Interpretation validation examples (synthetic)
The user's page is absent from the first 5 organic results: use target_visibility=NOT_OBSERVED_WITHIN_SAMPLE, not NOT_INDEXED. A page claims a 30% revenue increase: label this self-reported in claims, not a verified outcome. If the current location is unknown, do not deliver "number 1 on Google in the United States."
