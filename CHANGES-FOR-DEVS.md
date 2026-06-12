# Agentic-era handover · what changed and where

Three files carry the changes: **index.html** (homepage), **zopnight.html**, **zopday.html**.
`homepage-changes-preview.html` is byte-identical to `index.html` (working copy, ignore or delete).

---

## index.html · homepage

### Statement section (`#zoom-statement`)
- New copy, three staged lines: `The control plane` / `that runs AI-powered CloudOps,` / `continuously.`
- Font hierarchy: lines 1–2 wind-up (1.4–2.9rem, w600, muted); line 3 `continuously.` is the hero
  word (3–7rem, w700, ink). Phone-portrait override carries the same hierarchy (`#zl1/#zl2/#zl3`).

### CDCR section (`#cdcr`)
- Copy trimmed ~50% (tail + all four loop-node bodies). Proof points kept: 450+ rules,
  admin-gated production writes, customer DBs never touched, audit trail.

### Showcase / sun-moon section (`#showcase`)
- **Videos removed** (5 mp4s no longer referenced). Replaced by `#showcase-mocks`: five CSS
  motion-graphic dashboards in the `.ftab-mock` / `.fm-*` vocabulary, each a **4-scene story**:
  Schedule (table → 19:00 power-down → parked → 08:00 wake) · Optimize (scan → right-size →
  applying → applied) · Prove (savings → audit trail → compose → exported) · Provision (catalog →
  job steps → canary health → ready) · Organize (spaces → clone → RBAC gates → prod live).
- In-scene motion: rows/cards stagger in per scene, `.fm-spin` glyphs rotate, cursor dot drifts.
  Reduced-motion: all visible, nothing animated.
- JS (showcase IIFE): scene cycler `STEP_DWELL = 2400`; tab dwell `DWELL = 10600`; tab switch
  resets the incoming mock to scene 1. Old `SOURCES` array + video swap removed.
- **"Looks static" fix — hover scope (root cause).** Auto-advance used to pause on hover of the
  *entire* frame. The section sits far down the page, so users scroll it up under a stationary
  cursor → `mouseenter` fires on the whole dashboard → `isHovered` sticks true → both the tab
  autoplay and the scene cycler freeze on tab 0 / scene 1, so it looked permanently static across
  refreshes. **Fix:** hover-pause is now scoped to the thin **tab strip** (`.showcase-tabs`) only —
  resting the cursor on the dashboard no longer freezes anything; hovering the tabs (where you'd
  click to switch products) still pauses, as intended.
- **Always-on motion = a live mouse cursor (replaces an earlier scan-line idea).** Each scene's
  `.fm-cursor` (the base SVG arrow + ripple at `index.html`'s `.fm-cursor`/`::after`) now runs a
  VISIBLE, infinite `smCursorAct` + `smCursorRipple` (2.6s): the pointer glides from the scene's
  `--cx0/--cy0` to `--cx1/--cy1` and clicks (scale + ripple), looping. Previously the showcase
  overrode it with one-shot `smTravel`/`smClick` that never animated opacity, so the base
  `opacity:0` stuck and the cursor was invisible. Disabled (static pointer at target) under
  `prefers-reduced-motion`.
- **Powered-by chips** (`.showcase-cap-brand--day/--night`): real sun/moon product marks,
  clickable → zopday.html / zopnight.html, flip with `data-product`, high-contrast.
- **Tab strip**: 6px product tick per tab (`.showcase-tab::before`); group divider moved to the
  real ZopNight→ZopDay boundary (tab 3).

### Feature drawers (all 17 `.feat-drawer-tpl`)
- First fold 2-col (`.drw-rec-hero--v3`): title + sub + lede + CTAs left, visual right.
- Outcome bullets demoted below the fold (`.drw-rec-detail--v3`, 2-col checklist).
- Editorial spacing: hairline dividers, 48–64px rhythm (`drw-visual-led-css`).
- **ZopDay platform drawers (`#zd-platform` · `.zd-pcard` env / deploy / yaml) had empty
  hero-vis** — now filled with bespoke animated visuals matching the ZopNight drawers, orange-tinted
  (`style="--fvG:var(--fvO)"`): One-Click Environments → `fv--stack` (provisioning layers),
  Push to Deploy → `fv--pipe` (Commit→Build→Deploy→Live), Service Configuration → **`fv--form`**
  (new — config fields fill in, "Helm renders the chart · no YAML written"). 15 bespoke visuals
  total on the homepage now.

### Smaller homepage items
- Hero trust line: added **YC** and **MIT**.
- "ZopNight / Cloud governance + FinOps." + "ZopDay. / Internal Developer Platform." headings:
  descriptor stepped down via `.h2-subline` (`h2-subline-css`).

---

## zopnight.html

### CDCR section
- `#section-3-cdcr` replaced with the homepage CDCR (`#cdcr`): orange brand lockup, staggered
  "Continuous Detect. / Continuous Remediation." reveal, 4-node animated loop, whitepaper callout.
  Ported deps: `cdcr-homepage-port-css`, `cdcr-entry-css`, `cdcr-cta-css`, `.is-vis` reveal IIFE.

### Trust + numbers (audit fixes)
- Topbar ticker: `$57K/mo recovered` → **$14,820/mo** (now matches the proof card + line-item sum).
- Proof breakdown: added `Misc findings (12 items) · $1,090` so line items sum to the $14,820 headline.
- Final CTA stats: fabricated "7 min first remediation / 42% waste cut" → sourced metrics
  (5-min first finding · $14,820/mo Fortune 1000 · ~24% non-prod FMCG).
- Trust strip: 4th stat added (**450+ audit rules**, AWS/GCP/Azure) + grid 3→4 columns.
- Removed an HTML comment leaking an NDA customer identity + internal reviewer name.

### Copy/UX (audit fixes)
- Narrative chips on sections 4–8 (DEPTH · PROOF · FIT · PRICE · WHO).
- Bridge marquee: "MCP-native · continuous remediation · CloudOps agents soon" replace stale tokens.
- Dashboard mock copy now matches what the mock shows ("Showing 4 of 15 resources").
- `.zn-mainthing` callout: headline → "Detect. Decide. Act." + missing body paragraph added.
- Pricing footnote scoped to Enterprise ("Free/Team/Growth are flat-fee").
- Compare table: † footnote reconciling "147 Azure rules" vs "450+ across all clouds".
- Hero pill → `k8s-view.html` (matches its "Live Kubernetes cluster state" copy).
- **Closing-section order aligned with ZopDay + homepage.** Was `final → bridge-marquee →
  graduation-band → footer`; now `final → graduation-band → bridge-marquee → footer` (marquee is
  the last section before the footer, as on every other page). Pure section reorder, no content
  change.

---

## zopday.html

- **MCP section added** (`#mcp` · "Your coding agent now ships infra"): terminal mockup with three
  deploy-flavored prompts (staging env spin-up, stuck-deploy diagnosis, Black Friday scale plan),
  approval-gated framing. Self-contained `mcp-section-css`.
- **Deploy-loop section added** (`#section-zd-loop` · "Push once. Ship forever."): 4-node animated
  loop (Push → Build → Deploy → Observe) mirroring the CDCR diagram, with `zd-deploy-loop-css`.
- Section metas renumbered to fit the inserts (how-it-works → 5, proof → 6 … stakeholder → 9).
- Hero pill → `k8s-view.html` (same fix as ZopNight).
- McAfee proof stats source-stamped ("vs prior internal-platform baseline / manual quarterly
  cycle / multi-tool stack").
- Deploy-log caption: prominent **MOCK** chip ("Representative timings · flow accurate,
  numbers illustrative").
- Stakeholder grid: missing subhead added.
- `.zd-feature-num` delimiter normalized to `&middot;`.
- **Feature-bento drawers (all 3 · Landing Zone / Deployment / Live State) now use the homepage
  v3 drawer layout.** Ported `#drw-visual-led-css` from index.html and swapped the drawer markup:
  `.drw-rec-hero` → `.drw-rec-hero--v3` (visual-led 2-col, visual column slightly wider),
  `.drw-rec-hero-aside--vis` → `.drw-rec-hero-vis`, `.drw-zd-outcomes` →
  `.drw-rec-detail--v3` (outcomes demoted below the fold in a 2-col grid). Adds hairline dividers
  between hero / outcomes / pillars, muted-italic subhead, 700-weight heading — identical rhythm
  to the homepage drawers. ZopDay note: `--g-600/--g-700` are undefined here, so sub/lede colours
  fall back to `--ink-3/--ink-2` (same warm greys the homepage dark theme uses). Dead
  `.drw-zd-outcomes` / `.drw-rec-hero-aside--vis` rules removed.

---

## Cross-page consistency (ZopNight ↔ ZopDay)
Pass to make the two product pages true siblings (same design system, product accent swapped).

- **Closing-section order** aligned (see ZopNight note above): both now end `final → graduation band
  → bridge-marquee → footer`, like the homepage.
- **Narrative eyebrow chips → 3 labels only (`PROBLEM` · `SOLUTION` · `DEPTH`).** Chips live only on
  those three narrative sections. Removed the extra `PROOF` / `FIT` / `PRICE` / `WHO` chips from
  both pages plus ZopDay's `METHOD` (deploy-loop). Net: ZopNight = PROBLEM (problem) + SOLUTION
  (engines) + DEPTH (features); ZopDay = SOLUTION (stages) + DEPTH (features) — ZopDay has no
  problem section. (`.zd-narrative-chip--depth` colour rule kept — the DEPTH chip uses it.)
- **Trust-posture cards → icon-led on ZopDay.** The 7 posture cards used numbered eyebrows
  (`01 · BYOC` …); they now lead with a 30px line icon (new `.zd-posture-icon`), matching
  ZopNight's icon-led posture cards. Category keyword is retained in each card's foot tag.
- **Stages overview → simple icon cards (`.zd-engine`), matching ZopNight's engines overview.**
  The three "Three stages" cards (Landing Zone / Deployment / Live State) were interactive
  feature cards (numbered eyebrow + 3D canvas preview + drawer). Per direction they're now plain
  icon cards mirroring ZopNight's `.zn-engine` cards (icon → title → tag → body → foot, 3-col
  grid `.zd-engines-grid`). **The per-stage drawers + 3D `zd-stage-3d` canvases were removed**;
  stage detail now lives in the depth bento below + the dashboard. (Leftover dead CSS from the old
  drawers — `drw-visual-led-css`, `drw-feat-vis-*`, `.zd-stages-bento` — can be pruned later.)
- **Depth sections → carousels (both pages).** "The depth behind the three engines/stages" was a
  static multi-column grid (ZopNight 9 tiles, ZopDay 7 cards — all present, nothing was missing).
  Both are now carousels using one shared generic component `.fcar` (`#fcar-css` + `#fcar-js`,
  same transform-based mechanism as the trust-posture carousel): 3 cards visible (2 tablet · 1
  mobile), prev/next arrows + dots. Active-dot tinted per product (ZopNight blue, ZopDay orange).
  Old `.zn-depth-grid` / `.zd-features-grid` grid rules are now unused (prunable).
- **Primary CTA buttons carry each product's brand colour.** Page-scoped
  `body[data-product="zopnight"] .btn-primary` → blue (`#4A66D4`),
  `body[data-product="zopday"] .btn-primary` → orange (`#F58549`). Base buttons were neutral ink;
  the hero + final sections keep their bespoke cream/paper treatments (higher-specificity
  `!important`).

---

## Not in this handover
- `*.bak`, `*.calcbak`, `*.navbak`, `.DS_Store`, `.claude/` are gitignored (local working files).
