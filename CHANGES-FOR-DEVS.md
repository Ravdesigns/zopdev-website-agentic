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
- **Always-on ambient motion (insurance).** A faint, product-tinted "radar scan" line
  (`.showcase-mock .ftab-mock-main::after`, keyframes `smScanSweep`, 4.6s) sweeps each dashboard
  top→bottom continuously — pure CSS, so the panel reads as a live/monitoring product even between
  scene changes and regardless of the JS cycler's state. Disabled under `prefers-reduced-motion`.
- **Powered-by chips** (`.showcase-cap-brand--day/--night`): real sun/moon product marks,
  clickable → zopday.html / zopnight.html, flip with `data-product`, high-contrast.
- **Tab strip**: 6px product tick per tab (`.showcase-tab::before`); group divider moved to the
  real ZopNight→ZopDay boundary (tab 3).

### Feature drawers (all 17 `.feat-drawer-tpl`)
- First fold 2-col (`.drw-rec-hero--v3`): title + sub + lede + CTAs left, visual right.
- Outcome bullets demoted below the fold (`.drw-rec-detail--v3`, 2-col checklist).
- Editorial spacing: hairline dividers, 48–64px rhythm (`drw-visual-led-css`).

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

---

## Not in this handover
- `*.bak`, `*.calcbak`, `*.navbak`, `.DS_Store`, `.claude/` are gitignored (local working files).
