# Agentic-era handover · what changed and where

Two files carry all the changes: **index.html** (homepage) and **zopnight.html**.
`homepage-changes-preview.html` is byte-identical to `index.html` (working copy, ignore or delete).

---

## index.html · homepage

### Statement section (`#zoom-statement`, the scroll-cinematic after the hero)
- New copy, three staged lines: `The control plane` / `that runs AI-powered CloudOps,` / `continuously.`
- Font hierarchy: lines 1–2 are the wind-up (clamp 1.4–2.9rem, weight 600, muted `--g-600`);
  line 3 `continuously.` is the hero word (clamp 3–7rem, weight 700, ink).
- Mobile override carries the same hierarchy (see the phone-portrait `@media` block, `#zl1/#zl2/#zl3` rules).

### CDCR section (`#cdcr`)
- Copy trimmed ~50%: shorter tail line + tighter bodies in all four loop nodes
  (Detect / Classify / Remediate / Verify). All proof points kept (450+ rules, admin-gated writes,
  DBs never touched, audit trail).

### Showcase / sun-moon section (`#showcase`)
- **Videos removed.** The five mp4s (`scheduling/recommendations/event-readiness/infrastructure/deploy.mp4`)
  are no longer referenced. In their place: `#showcase-mocks` — five CSS motion-graphic dashboards
  built from the same `.ftab-mock` / `.fm-*` component classes as the two walkthrough sections.
- Each mock is a **3-scene mini-walkthrough** (scene cross-fades every 2.3s via `data-step`,
  cursor dot moves per scene): Schedule → power-down run → parked · Optimize: scan → right-size → applied ·
  Prove: savings → audit trail → exported · Provision: catalog → job steps → ready ·
  Organize: spaces → clone run → prod gated.
- JS (showcase IIFE): tab dwell 4s → **7.5s**; new scene cycler (`STEP_DWELL`, `restartSteps()`);
  tab swap resets all mocks to scene 0. Old `SOURCES` array + video swap removed.
- **Powered-by chips** (`.showcase-cap-brand--day/--night`): real product marks (sun/moon symbols),
  clickable → zopday.html / zopnight.html, auto-flip with `data-product`, high-contrast (ink-on-orange /
  cream-on-blue). Old subordinate `::after` footer removed.
- **Tab strip**: 6px product tick in every tab (`.showcase-tab::before`, blue=ZopNight, orange=ZopDay);
  group divider moved from tab 4 to tab 3 (the real ZopNight→ZopDay boundary).

### Feature drawers (all 17 `.feat-drawer-tpl` templates)
- First fold rebuilt 2-col (`.drw-rec-hero--v3`): title + sub + lede + CTAs left, visual right
  (big animated visual on engine drawers, scaled SVG diagram on the rest).
- Outcome bullets demoted below the fold into `.drw-rec-detail--v3` (2-col checklist grid).
- Editorial spacing: hairline dividers + 48–64px rhythm between drawer sections
  (`drw-visual-led-css` style block).

### Smaller homepage items
- Hero trust line: added **YC** and **MIT** (`.hero-v2-trust`).
- "ZopNight / Cloud governance + FinOps." and "ZopDay. / Internal Developer Platform." headings:
  descriptor line stepped down via `.h2-subline` (0.55em, weight 600, `--g-600`) — `h2-subline-css` block.

### New/changed style blocks (all inline in `<head>` or near their sections)
`h2-subline-css` · `drw-visual-led-css` · `showcase-mocks-css` · statement-hierarchy rules in the
globe-zoom styles + phone-portrait override · powered-by chip + tab tick rules in the showcase block.

---

## zopnight.html

### CDCR section
- The page's own `zn-cdcr-*` block (`#section-3-cdcr`, "The fix that stays fixed") is **replaced
  verbatim** with the homepage CDCR (`#cdcr`): orange CDCR brand lockup, staggered
  "Continuous Detect. / Continuous Remediation." reveal, 4-node animated loop, "UNIQUE TO CDCR"
  whitepaper callout. Section meta reads "section 4 · cdcr" to fit the page numbering.
- Ported dependencies (new blocks near the section): `cdcr-homepage-port-css` (zh-lockup +
  loop graph + callout styles), `cdcr-entry-css`, `cdcr-cta-css`, and the `.is-vis` reveal IIFE.
- The old `zn-cdcr-*` CSS earlier in the file is now unused (left in place, harmless).

---

## Not in this handover
- `*.bak`, `*.calcbak`, `*.navbak`, `.DS_Store`, `.claude/` are gitignored (local working files).
- zopday.html unchanged in this pass.
