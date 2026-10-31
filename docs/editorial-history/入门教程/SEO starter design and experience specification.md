# SEO starter: design and experience specification

Status: implementation-ready design handoff. No code changes made.
Language: English throughout the public site.
Product boundary: public, static learning site hosted on Cloudflare Workers, with public GitHub source. No accounts, database, paid API, live crawler, or implied server-side website scan.

## 1. Product and brand

Help someone who has just launched a website complete one useful technical SEO check, understand the result, and take a small next action. Teach a repeatable process rather than promise rankings.

Three working brand candidates (availability and trademark status have not been checked; no domain purchase is proposed):
1. **First Crawl** — recommended working identity. Short, task-oriented, understandable alongside the hero.
2. **Findable Fieldnotes** — editorial and practice-led, with room for future topics.
3. **Open Index Guide** — plain and open-source oriented, although it needs careful distinction from actual indexing services.

Use **First Crawl** in mockups unless another identity is chosen. In navigation its wordmark is text, not a generated logo. A simple small square/line motif may accompany it decoratively, but must not resemble a verified seal. Do not claim name availability.

Core voice: precise, calm, welcoming. Say what was checked, what was not, and what the result means. No invented adoption numbers, testimonials, certification, ranking guarantees, fake terminal animations, or urgency tactics.

Hero headline, exact:
> Your website is live. Make it findable.

Hero supporting copy:
> Learn three practical SEO checks: help crawlers reach your pages, publish a useful sitemap, and inspect one page before you share it.

Primary CTA: **Start your first check**
Secondary text link: **See a worked example →**
Quiet scope line: **Free guides. Open source. No account needed.**

## 2. Information architecture

Routes below are design targets; implementation may retain an established route convention consistently.
- `/` — overview and entry point
- `/start/` — Start here: choose a page, choose a tool, complete the first check
- `/guides/crawlability/` — Can a crawler reach your page?
- `/guides/sitemap/` — Build and check a small sitemap
- `/guides/page-check/` — Inspect one page before publishing
- `/skills/` — curated, inspectable helper workflows; explain what “Skill” means
- `/examples/` — examples index with factual execution labels
- `/examples/first-page-check/` — a synthetic worked report
- `/404.html` — useful missing-page fallback

Desktop navigation, left to right:
Wordmark | Start here | Guides | Skills | Examples | GitHub ↗

“Guides” links to an actual guide directory/section; never make it a hover-only dropdown. If a guides index route is not built, link to `/#guides`, preserving useful behavior from any page. Mark current destination using `aria-current="page"`. A thin underline and stronger text indicate active navigation; color alone is insufficient.

Footer: “Small, repeatable checks for a more findable website.” Links to Start here, Sources or the relevant source section, and verified GitHub repository. Do not render a placeholder GitHub link. Add copyright only with a real year; no unnecessary legal-page scaffolding.

## 3. Visual system

### Palette
- Canvas: `#F7F6F0` — warm near-white
- Paper: `#FFFFFF` — code/output surfaces and selected content
- Main ink: `#172723` — deep near-black green
- Body ink: `#31453E`
- Muted ink: `#52655D`
- Rule: `#CED7CE` — thin dividers; not body text
- Action: `#185C43` — dark green primary buttons and text links
- Action hover: `#104733`
- Soft sage: `#E8EFE5` — understated bands and note surfaces
- Amber ink: `#74530B`; amber surface: `#FFF3D5` — warnings/caveats
- Error ink: `#A72E26`; error surface: `#FFF0EC`
- Focus: `#1469B8` — high-contrast outline with visible offset

No purple gradients. No glows, glass panels, oversized shadows, rainbow syntax, or gradient headings. Main links are underlined in prose. Validate all actual text/background combinations against WCAG AA before release; decorative separator colors need not carry meaning.

### Typography
Prefer self-hosted fonts if available in the existing project. Do not introduce an external font request just to match a screenshot.
- Display/editorial: Georgia, “Times New Roman”, serif. Use for hero, H1, H2, guide titles.
- UI/body: system-ui, -apple-system, BlinkMacSystemFont, “Segoe UI”, sans-serif.
- Code/output: ui-monospace, SFMono-Regular, Consolas, monospace.

Sizes at desktop:
- Hero: clamp(44px, 5.3vw, 76px), line-height 1.02, letter-spacing -0.035em; max 11–13 words across 3 lines
- Content H1: 44–56px / 1.08
- H2: 30–36px / 1.15
- H3: 21–24px / 1.25
- Body: 17–18px / 1.65
- UI: 14–16px / 1.4
- Eyebrow: 12px / 1.4, uppercase, tracking 0.09em; use sparingly
- Code: 13–14px / 1.65

Mobile hero: 42–48px, never forced onto one line. Body remains 17px where practical, minimum 16px. Long tutorial reading measure: 64–72ch. Avoid long passages in all caps or extremely light type.

### Layout
- Site max width: 1200px; desktop margins 48px, tablet 28px, phone 20px
- Navigation height approximately 80px desktop and 64px phone
- Section rhythm: 88–104px desktop; 48–64px phone
- 8px spacing scale, with 4px for compact status items
- Thin ruled rows and generous whitespace establish structure
- Border radii: 3–6px; occasional 10px on a single output frame. No pill-shaped card grid
- Primary button: 48px minimum height, modest 4px radius, dark green fill, white text, 18–22px horizontal padding
- Secondary actions: underlined text or fine outline, never a second competing solid button

## 4. Landing page composition

### A. Header
Wordmark at left; restrained horizontal navigation. GitHub external-link indicator is visual plus accessible name, e.g. “View source on GitHub”. Opening in a new tab is optional, and if used must be disclosed accessibly.

### B. Hero: promise plus evidence shape
Use a 55/45 two-column layout on desktop. Left: eyebrow “A PRACTICAL SEO STARTER”, exact headline, supporting paragraph, primary CTA, example link, scope line. Right: a useful, readable report preview. This is the dominant visual, not an illustration or a decorative browser screenshot.

Report frame specification:
- Small top bar: “ONE-PAGE CHECK” and “Synthetic example” label
- URL: `https://example.com/guides/first-page` (wrap long URLs)
- Subline: “Illustrative output · No live request was made”
- Three readable result rows with icon + text + explanation:
  - “PASS” | “Page response” | “200 OK in this example”
  - “REVIEW” | “Canonical URL” | “Confirm it matches the page you want indexed”
  - “NEXT” | “Search visibility” | “Check indexing separately in your search engine tools”
- Bottom note: “A reachable page is not a guarantee of indexing.”
- Link: “Read the example and its limits →”

This preview is static teaching content. Do not put a URL input or a “Run scan” button beside it; those would suggest unavailable functionality. Never display a rotating “live” dot, recent run timestamp, performance score, or user-owned URL unless genuine verified evidence exists.

### C. A three-step learning path
Section heading: “Three checks. A clearer next step.”
Intro: “Start with access, then discovery, then the page itself.”
Use three spacious full-width ruled rows with step numbers, title, two-sentence description, tangible output, and arrow link. Avoid three identical elevated cards.

01 — **Can a crawler reach your page?**
“Check the response and the rules that affect crawling. Learn why being reachable and being indexed are different things.”
Output: “You’ll keep: a short crawlability checklist.”
Link: “Check crawler access →”

02 — **Does your sitemap point to the right pages?**
“Create a small sitemap and inspect the URLs inside it. Keep it aligned with the pages you actually want discovered.”
Output: “You’ll keep: a checked sitemap example.”
Link: “Check your sitemap →”

03 — **Is this page ready to share?**
“Review its title, canonical URL, headings, and links. Separate a clear fix from something that needs further investigation.”
Output: “You’ll keep: a one-page review.”
Link: “Inspect one page →”

Do not invent tutorial duration, success percentages, or claim outcomes that the finished content does not support. A “Start here” indicator belongs on step 01 rather than a “most popular” badge.

### D. Explain the operating model
Narrow two-column section, no cards:
Heading: “Use the tools you already have.”
Copy: “Follow the checks in your browser or terminal. Optional Skills package repeatable instructions for a compatible assistant. Read them before you run them.”
Link: “Explore the curated Skills →”
Small note: “This site does not crawl your website or connect to your accounts.”

### E. Trust and sources
A pale sage full-width band with heading “Know what the result can tell you.”
Three short statements, laid out as editorial columns at desktop and a list at mobile:
- “Sources are linked where claims are made.”
- “Examples say whether they were actually run.”
- “Crawl access, indexing, and ranking are different steps.”

Only publish “source checked” and a date when a actual review occurred. No stamp claiming Google approval or official certification.

### F. Final entry
“Start with one page.”
“Choose a public URL you own or have permission to inspect. The first guide helps you record what you find.”
Button: “Start your first check”

## 5. Start here page

H1: “Start with one page.”
Deck: “You don’t need an SEO dashboard to make your first useful check.”

Steps, visible without an interactive wizard:
1. **Choose a page.** “Pick a public page on a website you own or have permission to inspect. Avoid URLs with private tokens or personal information.”
2. **Choose how to follow along.** “Use your browser for a quick inspection, or the terminal commands if you’re comfortable with them.”
3. **Record the result.** “Keep the URL, what you checked, and what remains uncertain.”
4. **Do the first check.** Link/button: “Check crawler access”.

Give users a small vocabulary strip after the steps:
“Crawling: fetching a page. Indexing: considering it for a search index. Ranking: deciding where to show it for a query.” Have content review confirm exact explanatory wording.

A sidebar or inset “Before you begin” lists prerequisites actually used by the guide. Keep prerequisites specific and short. Optional advanced routes must not obscure the beginner path.

## 6. Shared tutorial template

Desktop: content column around 720px, right table of contents around 200px with 48px gap. On wider displays the content should not stretch. TOC can be sticky under the header; avoid a simultaneously oversized sticky header. Mobile: inline collapsible “On this page” before body; not a floating drawer.

Page order:
1. Breadcrumb: “Home / Guides / [Guide title]”
2. Eyebrow “GUIDE 01 OF 03”
3. Clear H1 and one-paragraph goal
4. Small facts line with content version/review date only if real, tool requirements, and factual verification status
5. “What you’ll have at the end” — one concrete outcome
6. Prerequisites
7. Numbered procedural sections
8. Output block after each important command
9. Interpretation: “What this means” / “What this does not tell you”
10. “If your result is different” troubleshooting branches
11. Short completion checklist
12. Sources with precise supporting links
13. Previous/next guide navigation

Command blocks:
- Header describing the command and execution status, e.g. “Terminal command · Not run here”
- Copy button labelled “Copy command”, then “Copied”; if clipboard fails: “Couldn’t copy. Select the command to copy it.”
- Command text must be selectable, horizontally scrollable inside the block, and not force page-level overflow
- Explain placeholders before the command, not after an error
- Never auto-execute commands, and no faux typing animation

Output blocks:
- Use a white bordered panel, mono text, line labels where helpful
- Distinguish command, output, and explanation without relying on color
- Long output can have a disclosure labelled “Show full example output”, retaining the useful summary by default
- “Copy example” must never say “Copy my results”

Callouts:
- “Note” for context, neutral left rule
- “Check carefully” for caveats, amber left rule
- “Stop here” for unsafe assumptions or private URL warnings, text and icon
Keep callouts sparse; normal explanatory copy should remain normal paragraphs.

Checklist behavior: plain semantic checkboxes may be local in-page state only. Do not imply persistence. If no persistence exists, label “Use this checklist while you work. It resets when you reload.” A simple noninteractive checklist is also acceptable and lower-complexity.

## 7. Skills directory

Explain the concept before listing:
H1: “Small workflows you can inspect.”
Deck: “A Skill is a set of instructions for a compatible assistant. These selections help with specific checks; they don’t guarantee a result.”

Use a compact editorial list separated by rules. Each entry includes:
- Name and one clear purpose
- “Best for” (beginner/terminal/assistant-supported only if substantiated)
- Compatible tool/environment if verified
- Source repository + author/maintainer from source
- What it reads and what it may change
- Execution status: “Source reviewed” / “Not executed” / “Executed in [documented environment]”
- Explicit limitations and last factual review date, if reviewed
- Link: “Read the instructions” and source link “View source ↗”

Do not label a Skill “safe”, “verified”, “official”, or “recommended by Google” merely because its source is readable. “Source reviewed” does not mean a security audit. Prefer three strong, properly described items over many thin entries. If an item lacks enough evidence, display “Review pending” or omit it. No install button that claims to work without an implemented compatible installation flow.

## 8. Examples and evidence states

These are distinct evidence dimensions; do not compress them into a single green check badge.

A. **Source review**
- “Source reviewed” only after an identifiable claim-to-source review. Detail: “Claims checked against the linked sources on [actual date].”
- “Source review pending” if not reviewed.

B. **Execution**
- “Not executed” / “Not run here” for commands and helper workflows not actually run in a documented context.
- “Executed example” only with actual date, environment, input scope, and reproducible output evidence.

C. **Data provenance**
- “Synthetic example” for invented demonstration data.
- “Captured output” for actual obtained output; identify redactions and scope.

A guide can be “Source reviewed” and “Not executed” simultaneously. A synthetic result can be useful but must not inherit a success status from source review. These labels must be visible near the first output, not hidden in the footer.

Example landing copy:
H1: “See a check from start to next step.”
Deck: “Worked examples show how to read a result, including what it cannot prove.”

Example detail banner:
“Synthetic example. The URL and results below are for teaching. No live check was performed.”

Example report sections:
- Scope: exact checks included
- Inputs: illustrative URL and assumptions
- Findings: condition, evidence, interpretation
- Suggested next action: bounded and practical
- Not checked: indexing status, rankings, traffic, and other unavailable data
- Reproduce the process: links to the matching guides

Status vocabulary within reports:
- “Pass” = only the named check passed in the stated context
- “Review” = human interpretation or evidence is needed
- “Issue” = a concrete observed or illustrated problem
- “Not checked” = unavailable or intentionally outside scope
Never use “SEO score 98/100” or “Your site is optimized” without a real, defined scoring methodology, and do not introduce such scoring for this project.

## 9. Search, empty states, and 404

Search is optional for this small site; default recommendation is visible navigation and a guide directory rather than building a large search component. Do not show a dead search icon.

If lightweight local search is implemented:
- Search only bundled public content, without a backend or account
- Input label: “Search guides and examples”
- Placeholder: “Try ‘sitemap’ or ‘canonical’”
- Empty initial state: “Search the guides, Skills, and worked examples.”
- No results: “No matches for ‘[query]’.” then “Try a shorter phrase, or browse the three starter guides.”
- Clear action: “Clear search”
- Results show title, type, and a short matching excerpt; search terms must be safely rendered as text
- Announce result count using a polite live region, with no focus theft
- No automatic network requests while typing; do not collect or log queries by default

404:
Eyebrow: “404 · PAGE NOT FOUND”
H1: “This page isn’t here.”
Body: “The link may be out of date. You can return to the guides and pick up from there.”
Primary link: “Go to Start here”
Secondary link: “Browse the guides”
Retain header/footer, send a genuine 404 response for unknown paths, and do not redirect every unknown path to the homepage with status 200.

Unavailable source link or network failure in any optional fetch:
“We couldn’t load this resource. You can still follow the guide below.”
Only show this if a real fetch exists. Do not create theatrical error states for a purely static page.

## 10. Mobile and responsive behavior

At 900px and below, hero columns stack. Keep the CTA above the example frame; the example must still appear early enough to make the premise tangible. Reduce decorative whitespace before reducing readable type.

At 760px and below:
- Header: wordmark, “Start here” text link, explicit “Menu” button
- Menu expands in document flow with navigation links, not a complex modal if unnecessary
- Button exposes `aria-expanded` and `aria-controls`; escape closes it if focus is managed as a overlay
- No horizontal navigation clipping or unlabeled hamburger-only button
- Learning rows stack number, title, description, output, and link
- Tutorial sidebar becomes “On this page” disclosure
- Report rows wrap into readable label/value stacks; no miniaturized desktop table
- Buttons and touch targets at least 44×44px; primary action 48px high
- No fixed bottom bar covering content

Check at 320, 375, 390, 768, 1024, and 1440px widths. At 200% zoom everything remains readable and usable. Long URLs and unbroken strings must not widen the viewport.

## 11. Accessibility and motion

Required:
- Semantic header/nav/main/footer and one H1 per page
- Logical heading hierarchy, descriptive document titles
- Skip link “Skip to content”, visible on focus
- Fully keyboard-operable navigation, menus, search, disclosures, and copy controls
- Visible focus ring around all interactive elements; never remove outline without replacement
- Text contrast AA; status always expressed in words as well as icons/colors
- Decorative icons `aria-hidden`; meaningful icons have an accessible label or adjacent text
- No text rendered as images; no essential content behind hover
- Respect `prefers-reduced-motion`; no autoscroll or auto-playing animation
- If used, transitions limited to 120–180ms color/opacity; content should never wait for animation to appear
- Copy success politely announced and never announced repeatedly on render
- Anchor targets account for sticky header using scroll margin
- External navigation uses true links; controls use real buttons
- Page language `en`; meaningful title and description for every route

## 12. Complete user paths

### First-time beginner
Landing → “Start your first check” → Start here prerequisites → crawler guide → inspect an output → record the result → next guide: sitemap → single-page guide → worked example → optional Skills.
Success is understanding and completing a bounded check, not a fabricated account conversion.

### Search visitor arriving on a tutorial
Search result → clear tutorial goal and prerequisites → first action → annotated output → limits/troubleshooting → completion checklist → next logical guide. Offer Start here quietly near the opening, without obstructing the tutorial.

### Skeptical or technical visitor
Landing preview → provenance label → full example limits → linked sources → GitHub source. Evidence should be accessible within one or two clicks, with no marketing gate.

### Skills visitor
Skills list → inspect purpose/permissions/compatibility → read source → choose whether to use in their own environment → return to tutorial for interpretation. The site never pretends the workflow has already run.

### Lost visitor
Unknown URL → real 404 → Start here or guides → continue. No dead ends.

## 13. Implementation acceptance checklist

- Exact requested hero headline appears in HTML as text.
- Main CTA has a functioning destination and first-screen hierarchy is unmistakable.
- Preview visibly says “Synthetic example” and “No live request was made”.
- Three guides have distinct goals, output interpretation, sources, and next steps.
- Sources, execution, and provenance labels remain separate and truthful.
- No invented data, review date, run date, GitHub URL, badge, popularity number, or testimonial.
- No account, database, paid API, live-scan UI, or hidden analytics dependency added.
- Every public route has useful unique title/description; unknown routes return 404.
- Canonical and sitemap URLs use the actual deployed origin, not a guessed domain.
- All published navigation, tutorial/source links, copy controls, and mobile navigation tested.
- Keyboard path, focus visibility, 320px width, 200% zoom, and reduced-motion behavior verified.
- The result feels like a small maintained field manual: readable, specific, and honest about uncertainty.
