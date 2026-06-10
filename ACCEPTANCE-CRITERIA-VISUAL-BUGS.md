# Acceptance Criteria · ZopDev Website Visual Bugs

**Audience:** Frontend devs (Naveen + team)
**Source of truth:** `DESIGN.md` in the repo root — refer to it for tokens, spacing, type scale, and component vocabulary.
**Format:** Each section is one ticket. Copy a section into a separate GitHub issue / Jira ticket, or keep as one master ticket — your call.
**Last audit:** May 14, 2026 — see `/tmp/qa-audit.py` and `/tmp/uniformity-audit-v2.py` for the scripts that surfaced these.

---

## How to read this doc

Each ticket below has:
1. **Issue** — what's broken and where.
2. **Affected pages / files** — the concrete locations.
3. **Acceptance Criteria** — a checklist. The ticket is "done" only when every box is testably true.
4. **How to verify** — a quick visual or terminal check.
5. **Priority** + **estimated effort** at the top of each.

The bug findings come from a sitewide automated audit (382 uniformity findings + 343 QA findings before fixes; a recent pass closed ~250 of those — what's listed below is the **remaining visible drift** that requires hand-holding to fix correctly).

---

## TICKET-01 · Footer drift across 40 pages

**Priority:** HIGH
**Estimated effort:** 4–6 hours
**Visible to user:** Yes — different footer treatment across the site.

### Issue
The site ships **two competing footer designs**. The canonical 10 pages use the rich 5-column `<footer class="site-foot">` with trust badges, legal rail, and the regions globe. **40 other pages** use a smaller compact secondary `<footer>` with `foot-grid--equal`. Users see different "site furniture" depending on which page they land on. Footer-discoverable resources (trust anchors, legal rail) are unreachable on half the site.

### Affected pages
about, accessibility, assets, blog, brand-guidelines, brand-kit, brand-launch, careers, case-flexflow, case-helix, changelog, ci-cd-best-practices, closed-loop-iam-remediation, community, contact, customers, demo, devops-hub, features, free-ebooks, integrations, kubernetes-guide, partners, pricing, platform-engineering-hub, roadmap, services, signin, solutions, state-of-cloud-waste-2026, status, sub-brands, trust, what-is-devops, zopcloud, zopday, zopnight, zopping.

### Reference
The canonical footer markup is in `developer-documentation.html` lines 1192–1287. Copy that block.

### Acceptance Criteria
- [ ] Every affected page ships `<footer class="site-foot">` as the **first** and only `<footer>` element.
- [ ] The 5 columns are present in this order: brand-block, product, resources, developers, company.
- [ ] The `foot-trust` badge row is present with: SOC 2 Type II, ISO 27001, HIPAA, GDPR · CCPA, AWS Marketplace, live status link.
- [ ] The `foot-legal-rail` is present with these links, all pointing to `/trust.html#<anchor>` or `/accessibility.html` / `/sitemap.xml`: Privacy, Terms, Cookies, DPA, Subprocessors, SLA, AI policy, Accessibility, Sitemap.
- [ ] No page has TWO `<footer>` blocks.
- [ ] Footer height and spacing are identical across the 40 affected pages and the existing 10 canonical pages (open side-by-side in dev tools, compare).
- [ ] Light + dark theme renders correctly for the canonical footer on every affected page.

### How to verify
```bash
grep -c 'class="site-foot"' *.html
# Every page should output: 1
```

---

## TICKET-02 · Empty SVG brand marks

**Priority:** HIGH
**Estimated effort:** 1–2 hours
**Visible to user:** Yes — empty boxes where ZopNight / ZopDay / ZopCloud icons should appear.

### Issue
17+ pages reference the sub-brand symbols via `<use href="#mark-zopnight">`, `<use href="#mark-zopday">`, `<use href="#mark-zopcloud">` — but they **don't define those `<symbol>` blocks** in their SVG `<defs>`. The marks render as empty / blank squares in the nav dropdown, footer, mobile drawer, and inline product references.

### Affected pages
about, blog, careers, case-flexflow, case-helix, changelog, ci-cd-best-practices, closed-loop-iam-remediation, community, contact, customers, kubernetes-guide, platform-engineering-hub, playground, roadmap, services, state-of-cloud-waste-2026, what-is-devops, zopcloud (missing zopnight + zopday), zopday (missing zopcloud), zopping.

### Reference
The canonical symbol defs block is in `developer-documentation.html` lines 244–263. Has 4 symbols: `mark-zopdev`, `mark-zopnight`, `mark-zopday`, `mark-zopcloud`, plus `logo-zopdev`.

### Acceptance Criteria
- [ ] Every affected page defines all 4 `<symbol>` blocks in its top-of-body SVG `<defs>`: `id="mark-zopdev"`, `id="mark-zopnight"`, `id="mark-zopday"`, `id="mark-zopcloud"`.
- [ ] The `<symbol>` content is byte-identical to the canonical block (same `viewBox`, same shapes, same fills).
- [ ] Nav dropdown product cards show the correct colored marks (ZopNight blue circle, ZopDay orange circle, ZopCloud multi-tile).
- [ ] Footer brand block shows the ZopDev logo (`logo-zopdev`).
- [ ] Mobile drawer product list shows colored marks.
- [ ] **Better long-term fix (optional, follow-up ticket):** extract symbol defs into a shared `sprite.svg` and reference via `<use href="sprite.svg#mark-zopnight">`. Single source of truth, no per-page maintenance.

### How to verify
```bash
# Every page should output: 1 1 1 1
for f in *.html; do
  echo -n "$f: "
  for m in logo-zopdev mark-zopnight mark-zopday mark-zopcloud; do
    grep -c "id=\"$m\"" "$f" | tr -d '\n'; echo -n " "
  done
  echo
done
```

---

## TICKET-03 · Keyboard focus invisible across the site

**Priority:** HIGH
**Estimated effort:** 3–4 hours
**Visible to user:** Tab-key / keyboard-only users — currently they can't see what's focused.
**Accessibility:** WCAG 2.1 SC 2.4.7 (Focus Visible) — currently FAILS.

### Issue
The site has **118 `:hover` rules** but only **9 `:focus-visible` rules** in `homepage-chrome.css`. `chrome.css` has 57 `:hover` and **0 `:focus-visible`**. Tab-key users navigating the site see no indication of which element is focused — buttons, links, cards, nav items all hide the focus ring (via `outline:none` patterns) without providing a replacement.

### Affected files
- `homepage-chrome.css`
- `chrome.css`

### Acceptance Criteria
- [ ] A sitewide focus-visible utility exists once (in `tokens.css` or `chrome.css` base, not duplicated):
  ```css
  *:focus { outline: none; }
  *:focus-visible {
    outline: 2px solid var(--zop-orange);
    outline-offset: 2px;
  }
  a:focus-visible, button:focus-visible { outline-offset: 3px; }
  ```
- [ ] No other rule overrides this with `outline: none` for `:focus-visible`.
- [ ] Every interactive element with a `:hover` style also has a matching `:focus-visible` style with at least the same visual treatment (e.g., color change, lift, underline).
- [ ] Tab through the homepage from top to bottom: every focused element (nav links, dropdown triggers, hero CTAs, showcase tabs, footer links, theme toggle, mobile menu button, every input) shows a visible orange outline.
- [ ] Tab order matches visual order (no jumping around the page).
- [ ] Lighthouse a11y audit ≥ 95.

### How to verify
- Open Chrome DevTools → Lighthouse → run accessibility audit on `index.html`. Score must be ≥ 95.
- Open the homepage, press `Tab` key 30 times. Every focused element must be visually distinguishable.

---

## TICKET-04 · Z-index stacking conflicts

**Priority:** MEDIUM
**Estimated effort:** 2–3 hours
**Visible to user:** Occasionally — overlay layering bugs in edge cases (drawer behind dropdown, etc.).

### Issue
`homepage-chrome.css` has z-index values `0`, `1`, `2` reused 6+ times each across components. The drawer system, nav dropdown overlay, mobile drawer scrim, eb-reader overlay, and page-content layer all compete for stacking. Symptom: in some interactions, an overlay renders behind another.

### Affected files
- `homepage-chrome.css`
- `drawer.css`

### Acceptance Criteria
- [ ] Define a z-index scale as CSS variables in `tokens.css`:
  ```css
  --z-base: 1;
  --z-sticky: 100;          /* sticky nav, sticky headers */
  --z-overlay-scrim: 1000;
  --z-overlay: 1100;        /* nav dropdown */
  --z-drawer: 1200;         /* mobile drawer */
  --z-modal: 1300;          /* eb-reader full-screen */
  --z-toast: 9000;
  ```
- [ ] Every `z-index: <number>` literal in chrome CSS files is replaced with `z-index: var(--z-*)`.
- [ ] Open the mobile drawer while a nav dropdown is open — drawer correctly covers the dropdown.
- [ ] Open the eb-reader overlay (on `cdcr-whitepaper.html` or `state-of-cloud-waste-2026.html`) while a nav dropdown is open — reader correctly covers everything.

---

## TICKET-05 · Border-radius drift (sharp-corners brand violation)

**Priority:** MEDIUM
**Estimated effort:** 1 hour
**Visible to user:** Yes — rounded corners breaking the brand's sharp-corner identity.

### Issue
The brand system specifies **sharp corners (`radius: 0`)** with a single exception of `9999px` for status pills (see `DESIGN.md` section on Borders). Audit found 8+ non-zero, non-pill `border-radius` values in `homepage-chrome.css`.

### Acceptance Criteria
- [ ] Grep for `border-radius` in `homepage-chrome.css` and `chrome.css`. Every value must be either `0` or `9999px` — or remove the property entirely.
- [ ] Permitted exception: status pills (`.badge.ok`, `.live-strip-dot`) keep `9999px`.
- [ ] Visual QA: scan homepage, ZopNight, ZopDay, ZopCloud pages for any rounded corners on cards, buttons, inputs, badges — all should be sharp.

### How to verify
```bash
grep -nE 'border-radius\s*:\s*[1-9]' homepage-chrome.css chrome.css | grep -v 9999
# Expected: no output, OR only documented exceptions
```

---

## TICKET-06 · CSS animations missing reduced-motion gate

**Priority:** MEDIUM
**Estimated effort:** 1 hour
**Accessibility:** WCAG 2.3.3 violation — users with motion-sensitivity preference enabled (OS-level "Reduce Motion") still see animations.

### Issue
`chrome-footer.css` ships `@keyframes` / `animation` rules without a `@media (prefers-reduced-motion: reduce)` override. Inline `@keyframes` rules in `index.html`, `zopday.html`, `zopnight.html` are similarly ungated.

### Acceptance Criteria
- [ ] A sitewide reduced-motion gate exists in `tokens.css` or `chrome.css`:
  ```css
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
  ```
- [ ] OR each animated component has its own targeted reduced-motion override.
- [ ] Enable "Reduce Motion" in macOS System Preferences → Accessibility → Display → reload site → topbar ticker freezes, hover transitions skip, scroll-led animations are instant.

---

## TICKET-07 · `!important` refactor (CSS specificity cleanup)

**Priority:** LOW (refactor — does not block users)
**Estimated effort:** 8–12 hours
**Risk:** Visual regressions if not careful — requires screenshot diff.

### Issue
`homepage-chrome.css` has **407 `!important` declarations**. Indicates selector hierarchy is broken and specificity wars are happening. Hard to maintain — new rules require yet more `!important` to win.

### Acceptance Criteria
- [ ] Audit the top 20 most-used `!important` selectors. For each, raise specificity properly (use parent class, BEM nesting, `:is()` selector, or `:where()` for low-specificity defaults) instead of `!important`.
- [ ] **Target reduction:** from 407 → under 200 `!important` declarations.
- [ ] Visual regression test required: every page renders identically before/after the refactor (use Percy / Chromatic, OR manual screenshot diff on the top 15 pages).

---

## TICKET-08 · Mobile horizontal-scroll on accessibility.html tables

**Priority:** MEDIUM
**Estimated effort:** 30 minutes

### Issue
`accessibility.html` has 3 `<table>` elements without `overflow-x: auto` wrappers. On mobile (< 480px) wide tables cause the **entire page** to scroll horizontally instead of just the table.

### Acceptance Criteria
- [ ] Every `<table>` on `accessibility.html` is wrapped in `<div class="table-scroll">`.
- [ ] CSS `.table-scroll { overflow-x: auto; -webkit-overflow-scrolling: touch; max-width: 100%; }` is added.
- [ ] On a 360px viewport: each table scrolls horizontally inside its container; the page body does NOT scroll horizontally.

---

## TICKET-09 · Fixed pixel widths > 600px breaking tablet layouts

**Priority:** MEDIUM
**Estimated effort:** 1–2 hours

### Issue
`homepage-chrome.css` has 7 components with `width: 720–840px` (nav-overlay, hero showcase, etc.). On tablet portrait (760–820px wide) these can clip or cause horizontal scroll.

### Acceptance Criteria
- [ ] Every fixed `width: NNNpx` > 600px in chrome CSS files has an accompanying `max-width: calc(100vw - 48px)` OR a `@media (max-width: ...)` override that drops it to a fluid value.
- [ ] Pattern already in `.nav-overlay` (line ~361 of `homepage-chrome.css`): `max-width: calc(100vw - 48px)`. Apply the same to all 7 fixed-width components.
- [ ] Resize browser from 1440 → 360 in 100px steps; no component clips outside the viewport or causes horizontal page scroll.

---

## TICKET-10 · Non-brand hex colors in chrome CSS (theme-switching risk)

**Priority:** LOW (refactor)
**Estimated effort:** 3–4 hours
**Risk:** Theme switching can show wrong colors.

### Issue
`homepage-chrome.css` has **47 distinct hex literals** that aren't the canonical brand palette (`#F58549`, `#2A4494`, `#7FB236`, `#4A66D4`, `#0F0F12`, `#F0EBDB`). These should all live in `tokens.css` as CSS variables (`--zop-orange`, `--ink`, `--paper`, etc.) so theme switching works correctly.

### Acceptance Criteria
- [ ] Every non-brand hex in `homepage-chrome.css` is moved to a token in `tokens.css` (use the existing token system documented in `DESIGN.md` section 3).
- [ ] Usages replaced with `var(--token-name)`.
- [ ] Light + dark theme renders identically before/after the refactor.
- [ ] Target: 0 hex literals in `homepage-chrome.css` (except inside SVG `fill=` / `stroke=` attributes — those don't theme-switch).

---

## TICKET-11 · Move skip-to-main link CSS to shared chrome

**Priority:** LOW
**Estimated effort:** 30 minutes

### Issue
The skip-to-main accessibility link was added to 47 pages but uses an inline `<style id="skip-to-main-css">` block per page. Should live in `chrome.css` (or a new `chrome-a11y.css`) for maintainability.

### Acceptance Criteria
- [ ] The `.skip-to-main` CSS is moved from the 47 inline blocks into `chrome.css`.
- [ ] All pages have their inline `<style id="skip-to-main-css">` block removed.
- [ ] Tab on any page → skip-link appears top-left with orange outline.
- [ ] Click → focus jumps to `#main-content`.

---

## TICKET-12 · Index.html DOM weight (1.27 MB)

**Priority:** MEDIUM
**Estimated effort:** 4–8 hours
**Visible to user:** Yes — slow first paint on mobile / low-end devices.

### Issue
`index.html` is **1,266,658 bytes / 26,919 lines** after a recent trim. Most of the remaining weight is 33 inline `<style>` blocks (~196 KB total, 15% of the page) and large SVG diagrams. Mobile devices feel this on initial parse.

### Acceptance Criteria
- [ ] Audit the 33 inline `<style>` blocks. Move any block > 5 KB whose selectors are unique to the homepage into a new external file `index.css` (loaded after `homepage-chrome.css`).
- [ ] Visual regression test: homepage renders identically before/after.
- [ ] **Target:** page size under 800 KB. Long-term target: under 500 KB.

---

## Reference: Design system

When fixing the above, defer to `DESIGN.md` for:
- **Section 3** — colors and tokens
- **Section 4** — spacing and rhythm
- **Section 5** — typography
- **Section 7** — buttons (sizes, states, variants)
- **Section 8** — cards (border, hover, padding)
- **Section 10** — focus and a11y conventions

Do not introduce new tokens or color values without checking `DESIGN.md` first. If a token is missing, add it to `tokens.css` and document it in `DESIGN.md` in the same PR.

---

## Ticket triage summary

| # | Title | Priority | Effort | User-visible |
|---|---|---|---|---|
| 01 | Footer drift across 40 pages | HIGH | 4–6h | Yes |
| 02 | Empty SVG brand marks | HIGH | 1–2h | Yes |
| 03 | Keyboard focus invisible | HIGH | 3–4h | A11y users |
| 04 | Z-index stacking conflicts | MEDIUM | 2–3h | Edge cases |
| 05 | Border-radius drift | MEDIUM | 1h | Yes |
| 06 | Reduced-motion gate | MEDIUM | 1h | Motion-sensitivity users |
| 07 | `!important` refactor | LOW | 8–12h | No (refactor) |
| 08 | Mobile table scroll | MEDIUM | 30 min | Mobile users |
| 09 | Fixed pixel widths | MEDIUM | 1–2h | Tablet users |
| 10 | Hex colors → tokens | LOW | 3–4h | Theme switching |
| 11 | Skip-link extraction | LOW | 30 min | No (refactor) |
| 12 | index.html DOM weight | MEDIUM | 4–8h | Yes (perf) |

**Recommended ship order:** 01, 02, 03 → 05, 06, 08 → 04, 09, 12 → 07, 10, 11.

---

## How to share this with the team

Three options:

1. **Google Doc (recommended for cross-team review):**
   Open Google Docs → File → Open → Upload → drop this `.md` file. Google Docs preserves headings, lists, and tables on import. Share the doc link.

2. **Notion / Confluence:**
   Same — paste the markdown directly into a Notion or Confluence page. Both render `# H1`, tables, and checkboxes natively.

3. **GitHub issues:**
   Copy each `## TICKET-XX` section into a separate GitHub issue. The `[ ]` checkboxes become interactive task lists.

For Naveen: paste this whole doc into his GitHub issue body, then split into sub-tasks as he picks them up.
