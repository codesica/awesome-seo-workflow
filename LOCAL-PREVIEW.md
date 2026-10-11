# Local preview snapshot and release follow-up

The local snapshot at `5b8fb505a24827e56fb9b2d82aa592853813bbee` continues the approved editorial homepage through the introduction, roadmap, six lessons, resources, concepts, templates, guides, examples, CLI record, and Skill pages. It adds six fieldwork exercises in Chinese and English with six blank CSVs.

Run `npm ci && npm run dev` with Node 22+, or run `npm run build` followed by `PORT=4186 npm run preview`. Open `http://127.0.0.1:4186/zh/` or `/en/`. `npm run check` validates a local preview by default; `python3 scripts/check-project.py --release` requests release-mode checks. That snapshot kept `releaseReady: false`. The subsequent v2.5.0 release enables publication following the user’s existing request to publish this same site.

The public fieldwork input is `content/advanced-fieldwork`. Its upstream manifest pins 25 sanitized public files. Original article and template bytes are preserved; `integration.json` separately records local integration. Stage mappings follow the existing course topics, not the ordinal numbers of the advanced exercises. No private original source package was read or copied.

The build has 76 bilingual indexable routes, localized 404s, unchanged original routes and compatibility downloads, 7 complete original Skills in both languages, and 6 additional header-only CSVs. Preview package metadata explicitly marks the artifacts as unpublished and leaves remote release URLs empty.

Local browser checks cover every route at 1440px and 375px, keyboard operation, same-page language and fragment preservation, native disclosures, downloads, concept filtering, the retained canonical fixture, and the actual homepage timer. Teaching examples retain SYNTHETIC / NOT_RUN / UNKNOWN distinctions. Live SEO outcomes, live-site Skill execution, and learner validation remain NOT_RUN. The user approved the homepage direction and requested publication; learner validation remains separate.

The archived local preview contained no push or deployment. The v2.5.0 follow-up uses the existing repository, Worker and domain without changing permissions or credentials.
