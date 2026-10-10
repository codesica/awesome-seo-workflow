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
- dimension_rows[]: {dimension, raw_label, raw_metrics, normalized_metrics, date_range, filters, row_scope, evidence_ids}.
- indexed_url_checks[]: {url, checked_at, verdict, reason, last_crawl, crawl_allowed, fetch_result, indexing_allowed, user_canonical, google_canonical, unavailable_fields, evidence_ids}. Populate true/false fields such as crawl_allowed only when an explicit result is available.
- live_url_checks[]: {url, tested_at, authorization_basis, verdict, crawl_allowed, fetch_result, indexing_allowed, unavailable_fields, evidence_ids}. Never populate a live check with canonical data from the indexed view.
- indexing_summary.reasons[]: {label, count, source, validation_status, data_as_of, sample_urls, expected_or_unexpected, evidence_ids}.

## Numeric validation examples (synthetic; formula tests only)
Previous clicks=0 and current clicks=5: delta=5; relative change is null, not infinite growth. For an independent, numerically consistent CTR pair, previous 2% and current 3% is a change of +1 percentage point, not +1%. If the same scope also shows previous clicks=0 with CTR=2%, the values conflict: preserve originals, flag them for checking, and do not directly use this change as a conclusion. For two rows of 1/10 and 9/90, total CTR=10/100=10%. If the page shows '-' but the export shows 0, record missing rather than treating it as a true zero.
