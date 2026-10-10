# Beginner teaching diagrams

The Chinese and English homepages and first practical lesson use the supplied search journey, six-stage roadmap, and Agent workflow illustrations. Each illustration has a separate desktop and vertical mobile SVG. Short visual labels and fictional query wording were adapted to match the existing beginner teaching copy; the full lesson titles and instructions remain in HTML. The four-line first-lesson record is also shown as four readable fields.

## Interaction

- `scripts/teaching-diagrams.mjs` renders self-contained static SVGs and equivalent native HTML details. Every inline SVG ID and reference is prefixed per page instance and layout. Stable `data-node-id` values retain the search nodes, all six existing stage IDs, and Agent steps `step-1` through `step-4`.
- With JavaScript, native HTML buttons cover each SVG node and open its adjacent example. Enter and Space activate the focused button; arrow keys, Home, and End move between nodes. Buttons expose `aria-expanded` and `aria-controls`, have visible focus, and retain at least a 44px target. Only one example per diagram is open at a time.
- Without JavaScript, the full diagram and native text summaries remain available. Readers can expand every example with a keyboard. Full technical checklists, sources, Skills, templates, both learner paths, and completion criteria remain at their existing routes and anchors.
- The vertical layout is used at widths up to 760px. SVG aspect ratios are preserved. No chart is cropped or compressed into a horizontal mobile overview. Diagram selection has no animation, and the existing reduced-motion setting also disables smooth document scrolling.

The diagrams only explain teaching examples. They do not search, time a session, execute an Agent, approve an action, or establish indexing, rankings, traffic, or successful use.

## Verification scope

On 10 October 2026, the local release build and existing offline project checks passed. Actual Chromium checks covered both homepages and both first lessons at 1440px and 375px. Every diagram node was clicked, keyboard expansion and collapse were exercised, native no-JavaScript summaries were opened, and SVG text bounds, unique IDs, mobile overflow, target sizes, and reduced motion were checked. Supplied PNGs and rendered page screenshots were inspected. This is browser QA, not a beginner comprehension study or live SEO validation.
