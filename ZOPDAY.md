# ZopDay · Product Page Design Reference

The canonical visual + interaction spec for the ZopDay marketing page
(`/zopday.html`). This document is page-specific — for sitewide
tokens, type scale, and brand voice, see `DESIGN.md` at the project
root. This doc covers only what is unique to the ZopDay surface.

---

## 1. Page identity

| | |
|---|---|
| **Route** | `/zopday.html` (marketing) |
| **Role** | Product page · deploy · internal developer platform |
| **Hero promise** | *"Ship faster, sleep through your deploys."* |
| **Brand color** | `--zop-orange` `#F58549` (same in light + dark — already AA on cream) |
| **Voice register** | Brand (marketing) — bigger type, more whitespace, sharper copy, more accent color than product UIs |
| **Page weight** | 4,701 lines, 14 H2 sections, ~270 KB |
| **Audience** | Platform leads, eng leaders, SRE leads at companies running 20+ services across multiple clouds |

The page leans on **operational ownership + workflow truth** rather
than "easier deploys." Every section either names a control (your
keys, your audit trail, k8s direct access) or names a workflow
collapse (`14-step ritual → zd push`). No "magical" or "intelligent"
language anywhere.

---

## 2. Page anatomy

Sections in DOM order. Each is a `<section>` (some unnamed, some with
an `id="…"` anchor for deep-linking from the nav).

| # | Section class / id | H2 | Role |
|---|---|---|---|
| 1 | `.zd-hero` | (h1: hero) | Big-type promise + side-mock chip referencing the dashboard |
| 2 | `.zd-stats.zd-stats-trust` | (no h2 — number row) | 4-stat trust band: deploys/day, p99, regions, on-call quiet hours |
| 3 | `.zd-posture` | "Your cloud. Your keys. Your audit trail." | Operational posture · 4 control tiles |
| 4 | `#zd-dashboard` `.zdd-section` | "The console. Every cluster, every cloud, one workspace." | Interactive deploy-log mock — see §4 below |
| 5 | `#section-zd-features` | "One platform. Three stages. Security baked in at every step." | Three-stage overview · Landing Zone / Deployment / Live State |
| 6 | (sub-section · Landing Zone) | "Landing Zone" | Stage 1 detail |
| 7 | (sub-section · Deployment) | "Deployment" | Stage 2 detail |
| 8 | (sub-section · Live State) | "Live State" | Stage 3 detail |
| 9 | `.section.zd-k8s-bridge` | "Operate the cluster directly." | k8s direct-access bridge (k8s-view tie-in) |
| 10 | `.zd-narrative` | "The depth behind the three stages." | Narrative bridge into bento |
| 11 | (no class — bento) | "From git push to live URL, without leaving the editor." | Feature bento · 9 cards |
| 12 | (no class — proof) | "McAfee runs platform engineering on ZopDay." | Customer proof · McAfee large case card |
| 13 | (no class — compare) | "Hosted PaaS rents you their stack. Internal platforms cost you a team." | Compare matrix · ZopDay vs Heroku/Render vs build-your-own |
| 14 | (no class — pricing) | "Aligned pricing. Free where it matters." | Pricing · 3-tier with free-tier callout |
| 15 | (no class — stakeholder) | "Built for every seat in the room." | Stakeholder grid · Platform / Eng / SRE / Security |
| 16 | (no class — FAQ) | "Things teams ask before they sign." | FAQ accordion (6–8 Q&A) |
| 17 | `.final` | (CTA: "Try `zd push`") | Final CTA strip |
| 18 | `.bridge-marquee` | (marquee · ZopNight/ZopCloud cross-sell) | Bridge to siblings |
| 19 | `#graduation-band.section.tight` | (band) | Customer logo band |

The k8s bridge section (`.zd-k8s-bridge`) is a load-bearing tie to
`/k8s-view.html` — it's where users learn that ZopDay isn't a black
box. Do not collapse this into the features bento; users who skim
the bento and then bail are exactly the audience this section is
for.

---

## 3. ZopDay component families

All page-specific CSS is namespaced under two prefixes:

### 3.1 `.zd-*` · marketing components

| Family | Used for | Approx classes |
|---|---|---|
| `.zd-hero` | Hero block (h1, eyebrow, dual CTA, hero side-mock chip) | 4 |
| `.zd-stats` | Trust number row beneath the hero | 2 |
| `.zd-stat` | Single stat cell | 1 |
| `.zd-posture` | Operational posture · 4-tile control rail | 13 |
| `.zd-stages`, `.zd-stage` | Three-stage section + each stage card | 2 |
| `.zd-feature`, `.zd-features` | Feature bento · 9 cards | 7 |
| `.zd-k8s` | k8s-view bridge section | 8 |
| `.zd-deploylog`, `.zd-dl-*` | Inline deploy-log mini-component (used in posture + bento) | 26 |
| `.zd-proof` | Customer outcome card (McAfee) + grid | 13 |
| `.zd-compare` | Compare matrix rows | 2 |
| `.zd-pricing` | Pricing 3-col + free-tier callout | 5 |
| `.zd-stake` | Stakeholder roles grid | 10 |
| `.zd-narrative` | Narrative text blocks (between bento and proof) | 2 |
| `.zd-faq`, `.zd-howto`, `.zd-3d`, `.zd-sec`, `.zd-us` | One-off accents | 1–3 each |

Naming rule: `zd-<section>-<element>-<state>`. E.g.
`zd-posture-tile`, `zd-posture-tile--locked`. Stick to this when
adding new sub-elements.

### 3.2 `.zdd-*` · the interactive deploy-log mock

The `#zd-dashboard` section renders a ZopDay deploy-console mock
(`.zdd-section`). It is the page's centerpiece — devs implementing
the production version should treat this as a tier-1 component, not
a hero image.

| Class | Role |
|---|---|
| `.zdd-section` | Outer wrapper, full-bleed dark frame |
| `.zdd-frame` | The bordered monitor frame |
| `.zdd-nav` (×3) | Left-rail nav of the mock app |
| `.zdd-main` | The main canvas area |
| `.zdd-side` (×4) | Right-rail inspector panels (×2 columns) |
| `.zdd-page` (×3) | Sub-page surfaces inside the mock (Deployments / Services / Settings) |
| `.zdd-table` | Tabular layout for the deployments view |
| `.zdd-th` (×4) | Table header cells |
| `.zdd-tr`, `.zdd-row` | Table rows |
| `.zdd-tools`, `.zdd-search`, `.zdd-filter`, `.zdd-filters` | Toolbar above the table |
| `.zdd-pill`, `.zdd-status` (×2) | Status pills in the rows (succeeded / running / failed) |
| `.zdd-user` (×4) | User avatar + name pattern inside rows |
| `.zdd-prov`, `.zdd-region`, `.zdd-mono`, `.zdd-meta` | Inline metadata atoms |
| `.zdd-type`, `.zdd-space`, `.zdd-name`, `.zdd-added` | Other row atoms |
| `.zdd-btn` | In-mock button (e.g., "Roll back") |
| `.zdd-brand` (×3) | In-mock brand chip (ZopDay wordmark inside the console) |

The mock uses **the same brand tokens as the real product app** — see
DESIGN.md §3 (Colors). Treat it as a thin sandbox skin over the
real design system: cream `--paper`, line `--line`, orange
`--zop-orange` for the active state. Don't introduce new colors
inside the mock.

### 3.3 The `.drw-*` family

The page also uses a **drawer pattern** (`.drw-*`, ~19 classes) that
opens on row-click in the deploy log to show the full deploy detail.
This is a re-usable pattern — see `drawer.css` and `drawer.js` in the
project root. Devs should componentize this as `<DeployDetailDrawer>`
in production.

### 3.4 Shared chrome on this page

These are sitewide, not ZopDay-specific. Reuse from `homepage-chrome.css`:

- `.nav-*` (top nav, ~30 classes)
- `.np-*` (nav-overlay product cards in the Products pane)
- `.is-*` (state modifiers)
- `.btn`, `.btn-accent`, `.btn-secondary`
- `.hmp-*`, `.container`, `.feat-*`, `.features-*` (small shared
  helpers)

---

## 4. Color discipline on this page

ZopDay's brand color is `--zop-orange`. The rule for this page:

| Where | Color | % of pixels |
|---|---|---|
| Hero eyebrow chip + dot | `--zop-orange` | <1% |
| Stages section · active stage outline | `--zop-orange` | ~2% |
| Deploy-log mock · "running" status pill | `--zop-orange` | ~1% |
| Deploy-log mock · "succeeded" status pill | `--zop-green` | ~1% |
| Deploy-log mock · "failed" status pill | `#D14B4B` (one-off — see DESIGN.md alerts) | <1% |
| Pricing CTA + final CTA | `--zop-orange` | ~2% |
| All other accent (hover lifts, signature dots) | `--zop-orange` | ~6% |

**Convenient overlap**: because ZopDay's brand color is `--zop-orange`
(which is also the sitewide accent), this page doesn't have the
counter-rule that ZopNight has. Both brand identity *and* CTAs use
orange here. Don't introduce a second accent color.

Dark mode: `--zop-orange` stays the same in both themes — it passes
AA on both `#FAF7EC` (cream) and `#0F0F12` (near-black). No swap
needed.

The `.zdd-status--succeeded` green:
```css
.zdd-status--succeeded{ color: var(--zop-green, #7FB236); }
/* On dark surfaces, the `7FB236` passes AA. On light, use the
   darker variant for body-size text: */
.zdd-status--succeeded{ color: #3f6320; }
html[data-theme="dark"] .zdd-status--succeeded{ color: var(--zop-green); }
```

---

## 5. Interactions on this page

| Interaction | Trigger | Behavior | File |
|---|---|---|---|
| Sticky sub-nav | scroll past hero | Sub-nav docks under top nav, highlights current section on scroll | `chrome-pagetransition.js` |
| Hero CTA lift | hover | `translateY(-4px)` + offset block shadow | `chrome.css` (`.btn-accent`) |
| Deploy-log row click | click | Opens `<DeployDetailDrawer>` with the row's metadata | `drawer.js` |
| Deploy-log row hover | hover | Row background tints; arrow appears at right edge | `.zdd-tr:hover` |
| Stages section | scroll | Each of Landing Zone / Deployment / Live State pins for ~80vh on scroll, content scrubs through the stage detail | `chrome-darkfold.js` |
| k8s bridge | scroll into view | Bridge content fades in with the cluster mock | inline CSS |
| Compare matrix | hover row | Row tints; check icon pulses | inline CSS |
| Stakeholder cards | hover | Tile lifts + orange underline on role title | `.zd-stake-card:hover` |
| FAQ accordion | click | `<details>` native expand. No JS. | — |
| Bridge marquee | always | Horizontal scroll · 28s linear loop | `chrome.css` |

Reduced motion: respect `prefers-reduced-motion: reduce`. The
pinned stages section should release pinning and become a normal
vertical scroll; the deploy-log drawer should appear instantly with
no slide animation; marquee slows to 60s.

---

## 6. Mobile

Breakpoint: **`max-width: 760px`**.

| Section | Mobile change |
|---|---|
| Hero | h1 drops from clamp(46–72px) to clamp(34–46px). Dual CTAs stack. Side-mock chip hidden. |
| `.zd-stats` | 4 cells → 2×2 grid |
| `.zd-posture` | 4 tiles → vertical stack |
| `#zd-dashboard` | Mock scales down · `.zdd-side` panels hidden, only table + topbar visible |
| Stages section | Pinning DISABLED on mobile. Three stages render as a stacked card list, scroll normally. |
| k8s bridge | 2-col → 1, cluster mock placed at top |
| Feature bento | 9-tile bento → vertical stack |
| Proof | McAfee outcome card → single column |
| Compare | Table → vertical card-per-row |
| Pricing | 3 columns → 1, "free-tier callout" pinned at top |
| Stakeholder | 4 role cards → 2×2 |
| FAQ | Same (already vertical) |
| Deploy-log drawer | Slides up from bottom instead of right · full-screen overlay |

Watch-outs:

1. **The stages section** is the single biggest mobile risk. Pinning
   does not translate well to small viewports — the current
   prototype disables pinning at `<=760px`. Production must do the
   same and design the stacked-card fallback explicitly (don't rely
   on the section auto-degrading).
2. **The deploy-log mock** (`#zd-dashboard`) is a wide table that
   doesn't shrink gracefully. Current approach hides the right
   panels and lets the table overflow with horizontal scroll. A
   "scroll hint" indicator on first viewport entry helps.

---

## 7. Implementation notes for production

When porting this static page to the Next.js production app
(`zopdev/website`), the recommended component breakdown:

```
<ZopDayPage>
  ├── <Hero zd />                       ← h1, eyebrow, dual CTA, side-mock
  ├── <StatsTrust zd />                 ← shared component, theme="zd"
  ├── <PostureSection zd />             ← unique to ZopDay (different from zn)
  ├── <DashboardMock zd />              ← the big interactive deploy-log mock
  ├── <StagesSection />                 ← Landing Zone → Deployment → Live State
  │      with pinned-scroll on desktop, stacked on mobile
  ├── <K8sBridge />                     ← unique — points to /k8s-view.html
  ├── <FeatureBento zd />               ← 9-tile bento, reuse with prop
  ├── <CustomerProof case="zd-mcafee" />
  ├── <CompareMatrix vs="hosted-paas|build-your-own" theme="zd" />
  ├── <Pricing theme="zd" />            ← reuse, theme prop swaps copy + accent
  ├── <StakeholderGrid theme="zd" />    ← reuse
  ├── <FAQ topic="zd" />                ← reuse, content by topic
  ├── <FinalCTA theme="zd" />           ← reuse
  ├── <BridgeMarquee siblings />        ← sitewide footer adjunct
  └── <DeployDetailDrawer />            ← portal-rendered, opens on row click
```

### Reuse signals

Four components are **safe to reuse across all 3 product pages**
(ZopNight, ZopDay, ZopCloud) with a `theme` prop:

1. `<StatsTrust>` · cell count + numbers vary, layout identical
2. `<StakeholderGrid>` · 4 role tiles, copy varies per product
3. `<Pricing>` · 3-tier layout, copy + outcome varies
4. `<FinalCTA>` · single CTA strip, copy + accent varies

Three are **unique to ZopDay** and should NOT be generalized:

1. `<StagesSection>` · the 3-stage pinned-scroll pattern is
   ZopDay-only (ZopNight has `<CDCRDiagram>` which serves a similar
   "explain the loop" purpose but with different mechanics)
2. `<K8sBridge>` · ZopDay-specific tie to `/k8s-view.html`
3. `<DeployDetailDrawer>` · the deploy-log drawer is ZopDay only

### Performance budget

- LCP target: **<2.0 s on 4G simulated**
- Critical CSS: extract just `.zd-hero` + nav into a critical bundle
- Lazy-load the deploy-log mock — it's not above-the-fold
- The pinned stages section should defer its scroll-trigger JS until
  the user has scrolled past the hero
- Sitewide bundle target: <120 KB JS, <60 KB CSS (gzip)

### Accessibility musts

- `<h1>` only once on this page (the hero promise)
- Every `<section>` gets a `<h2>` or an `aria-label`
- Deploy-log mock is decorative — wrap in `<div role="img"
  aria-label="ZopDay deploy console showing recent deployments with
  status, region, and operator">` and hide individual table cells
  from screen readers
- Stages section: each stage gets `role="region"` and an `aria-label`
  so screen reader users can jump between stages
- k8s bridge: the cluster mock needs `aria-label="Kubernetes cluster
  view showing namespaces, workloads, and live resource state"`
- Compare matrix needs `<th scope="row">` / `scope="col"` on the
  header cells
- FAQ uses `<details><summary>` natively — keyboard accessible by
  default, do not replace with custom JS accordion

### What can ship as-is

The CSS and HTML in the prototype is production-quality for the
following components (lift directly, no rewrite needed):

- `.zd-posture` control rail
- `.zd-k8s` bridge section
- `.zd-compare` matrix
- `.zd-stake` role grid
- `.zd-proof` outcome card (McAfee case)
- Deploy-log row pattern (`.zdd-tr`, `.zdd-row`)

### What needs a rewrite

- **Hero animation** (currently inline `<style>`, move to a
  styled-component or CSS module)
- **The deploy-log mock** (`.zdd-*`) is hand-coded HTML — port to a
  declarative spec (JSON array of deploy rows → React table) so
  non-engineers can edit it
- **The stages pinned-scroll**: the prototype uses
  `chrome-darkfold.js` which is hand-rolled. Production should use
  GSAP ScrollTrigger or Framer Motion's `useScroll` for predictable
  cross-browser pinning behavior
- **The drawer** (`.drw-*`): the prototype renders the drawer inline
  with the page. Production should portal it to `document.body`,
  manage focus trap, and handle ESC + scrim click

---

## 8. Don't relitigate

These decisions are settled — bring them up only if there's new data:

- ✗ Don't drop the k8s-view bridge. The "ZopDay is not a black box"
  message is core to the buy decision for SRE / platform leads.
- ✗ Don't replace the deploy-log mock with a video. The interactive
  feel (hover row, click to drawer) is the proof point.
- ✗ Don't add a "Trial" CTA. ZopDay has a real **Free tier** —
  marketing should send people to the free tier sign-up, not a trial.
- ✗ Don't shorten the stages section. Three stages is the page's
  structural backbone; trimming any of them breaks the narrative
  arc (Landing Zone → Deployment → Live State).
- ✗ Don't move the proof section before pricing. The order is:
  bento → proof → compare → pricing. Pricing always follows proof.
- ✗ Don't replace `zd push` with a generic command name. It's the
  brand verb — appears in the hero, the bento, the final CTA, and
  the signin sub copy. Consistent across all surfaces.

---

## 9. Open questions for the dev

These need a product-side answer before the production build ships:

1. **Real McAfee numbers**: the proof section uses placeholder
   numbers ("4× shipping cadence, on-call quiet"). Final case study
   metrics need a customer-facing review.
2. **Stages section copy**: Landing Zone / Deployment / Live State —
   are these the official stage names that engineering uses
   internally? If they ever rename internally, marketing has to
   follow within a release.
3. **Deploy-log fidelity**: should the mock data match the actual
   schema of the production deploy log (operator, region, succeeded
   etc.) or stay aspirational?
4. **Free tier limits**: pricing page says "Free where it matters"
   — the actual limits (envs, services, build minutes) need to be
   locked before this ships.
5. **CLI naming**: `zd` is short for ZopDay. Confirm with engineering
   that the binary is shipping as `zd` and not `zopday-cli` or
   similar — marketing leans heavily on the short form.

---

*Last reviewed: 2026-05. Owner: design. Source files:
`zopday.html`, `homepage-chrome.css`, `chrome.css`, `tokens.css`,
`drawer.css`, `drawer.js`.*
