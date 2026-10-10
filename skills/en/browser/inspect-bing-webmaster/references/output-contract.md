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
- indexed_url_checks[]: {url, checked_at, verdict, discovered_at, crawled_at, indexed_at, http_status, reason, seo_issues, markup_issues, unavailable_fields, evidence_ids}.
- live_url_checks[]: {url, tested_at, authorization_basis, verdict, http_status, redirect_target, crawl_issue, unavailable_fields, evidence_ids}. Create a separate record for a redirect target; do not overwrite the source URL.
- sitemaps[]: {url, parent_index_url, kind, origin, submitted_or_discovered_at, last_processed_at, processing_status, discovered_urls, indexed_urls_if_shown, errors, evidence_ids}.
- site_explorer_samples[]: {path_scope, filters, status_label, count_if_shown, sample_urls, evidence_ids}.

## Interpretation validation examples (synthetic)
A sitemap shows success and discovered=100, and one URL is crawlable in Live: this proves only that the sitemap was processed and that URL is currently crawlable. indexed_urls_if_shown must remain null. If Live returns 301, record the redirect; do not report 200 for the source URL or automatically trigger an indexing submission.
