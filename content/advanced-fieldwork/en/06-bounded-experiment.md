# Run a test that can end without a winner

Public-source research checked on 2026-10-10. This is a proposed exercise, not a completed audit or evidence of results. The example is wholly fictional.

## The decision

What evidence would justify the next investment, and what would make this attempt stop? A plan, an adopted change, an executed test and an observed effect are separate facts. One main change makes reasoning easier; it does not remove seasonality or establish causality.

## Inputs

Bring one question, a baseline, a proposed change, a primary outcome, a completion definition, time and cost caps, and the measurement you actually have. Select a method that your traffic and implementation can support.

## Actions

1. Save a dated plan before execution: hypothesis, affected URL/version, task, eligible cohort, numerator, denominator, exclusions, observation window, guardrails, caps, stopping rules and restart evidence. Do not backdate a plan or count self-tests as independent users. Microsoft recommends falsifiable hypotheses and checking experimental capability. (S24)
2. Choose the method honestly. A task-observation pilot can reveal friction but cannot estimate a population rate. A before/after SEO change is observational and subject to confounding. A causal A/B test needs suitable assignment, stable measurement and a sample/precision plan; visitors from different dates or communities are not random groups.
3. Dry-run the measurement on declared test cases and read back the actual stored result. Check missed events, duplication and compatible denominators. An HTTP success or interface confirmation is not sufficient proof of business state. Stop interpretation when measurement is invalid.
4. Keep a change journal: deployments, content changes, channel actions, tracking changes and events that can affect the outcome. Mark any changed metric, segment or stopping condition as a deviation; separate planned and exploratory analyses. A preregistered plan may change, but the change must be transparent. (S22)
5. Review data quality and guardrails before rewards. For a randomized experiment, inspect sample ratio mismatch and handle repeated peeking with a valid statistical plan. For a small pilot, report observed counts and actual failures without declaring an A/B winner. (S23)
6. End at the specified cap or safety/data failure. Report one result: limited support, evidence against the stated benefit, inconclusive, invalid data, or NOT_RUN. A deadline does not create evidence. SEO effects can take variable time and may never produce a visible improvement; choose a review window without promising a fixed payback. (S02)
7. If you measure repeat use, define the full follow-up window relative to each person's first eligible completion. Keep participants whose window is incomplete separate from those observed through the whole period; distinguish voluntary follow-up from measured reuse. This is an exercise design choice, not a universal SEO standard.

## Worked output — fictional plan, no results

SpokeNote considers showing an example printout before the editable checklist. The fictional plan defines success as a usable checklist export, excludes the maker's tests, caps one working session for setup, and stops if export records are missing or at the chosen review date. A limited task-observation pilot is proposed because traffic and randomized assignment are unknown. It has no participants or results. “No winner yet” is the correct status, not a hidden failure to be filled with invented numbers.

## Deliverable and evidence

Submit the plan, change journal, measurement dry-run evidence when executed, numerator/denominator by compatible cohort, missingness and guardrails, deviations, result and next decision. Preserve an original failed record; append the correction rather than overwriting history. A rerun can demonstrate current behavior but cannot recreate a missing original capture.

The exercise passes when the attempt has a bounded decision and honest status. Method efficiency, learning comprehension, ranking and business effects remain separate claims.

## Failure limits

Not statistically significant does not mean no effect. A few interviews do not establish a population percentage. More clicks may reflect novelty or confusion. An immature cohort is not a failed retention cohort. Extending a test because its trend looks promising can bias inference. Stopping this attempt does not permanently reject the entire product.

## Bounded agent task

“Turn this question and available measurement into one dated experiment plan. Identify observational versus randomized claims, specify units, caps and stop/restart conditions, and preserve deviations. Do not claim causal lift or successful execution without supplied evidence; do not deploy, recruit, contact participants or spend.”

## Public sources

- [SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide) (S02; checked 2026-10-10).
- [Preregistration: A Plan, Not a Prison](https://www.cos.io/blog/preregistration-plan-not-prison) (S22; checked 2026-10-10).
- [Patterns of trustworthy experimentation: During-experiment stage](https://www.microsoft.com/en-us/research/articles/patterns-of-trustworthy-experimentation-during-experiment-stage/) (S23; checked 2026-10-10).
- [Patterns of trustworthy experimentation: Pre-experiment stage](https://www.microsoft.com/en-us/research/articles/patterns-of-trustworthy-experimentation-pre-experiment-stage/) (S24; checked 2026-10-10).
