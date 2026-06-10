# ZopNight · Product Page Design Reference

The canonical visual + interaction spec for the ZopNight marketing page
(`/zopnight.html`). This document is page-specific — for sitewide
tokens, type scale, and brand voice, see `DESIGN.md` at the project
root. This doc covers only what is unique to the ZopNight surface.

---

## 1. Page identity

| | |
|---|---|
| **Route** | `/zopnight.html` (marketing) |
| **Role** | Product page · cloud cost · FinOps console |
| **Hero promise** | *"Stop paying for cloud no one is using."* |
| **Brand color** | `--zop-blue` `#2A4494` (light) · `--logo-blue-on-dark` `#4A66D4` (dark) |
| **Voice register** | Brand (marketing) — bigger type, more whitespace, sharper copy, more accent color than product UIs |
| **Page weight** | 4,912 lines, 11 H2 sections, ~280 KB |
| **Audience** | FinOps leads, CISOs, platform leads at companies spending $50k+/mo on cloud |

The page leans on **security + outcome proof** rather than "savings
potential." Every section either names a control (read-only, audit
log, HIPAA-cleared) or names a number (`$14,820/month recovered in
4 weeks`). No "transform" or "leverage" language anywhere.

---

## 2. Page anatomy

Sections in DOM order. Each is a `<section>` (some unnamed, some with
an `id="…"` anchor for deep-linking from the nav).

| # | Section class / id | H2 | Role |
|---|---|---|---|
| 1 | `.zn-hero` | (h1: hero) | Big-type promise + dashboard mock entry (`.zn-mainthing` orange chip) |
| 2 | `.zn-stats.zn-stats-trust` | (no h2 — number row) | 4-stat trust band: SOC 2, audit, regions, etc. |
| 3 | `.zn-posture` | "Read-only by default. Audit-ready by design." | Security posture · 4 IAM tiles + role boundaries |
| 4 | `#zn-dashboard` `.znd-section` | "The architecture canvas. Every resource, every dependency, mapped." | Interactive dashboard mock — see §4 below |
| 5 | `#section-2-problem` | "Cloud spend grew. Cloud governance didn't." | Problem framing · 4 cost-driver tiles |
| 6 | `#section-engines` | "Three engines. One workspace." | Engines overview · 3 cards (Idle · Right-size · Anomaly) |
| 7 | `#section-3-features` | "The depth behind the three engines." | Feature deep-dive · 9 bento cards |
| 8 | `#section-3-cdcr` | "The fix that stays fixed." | CDCR loop diagram (close-loop iam remediation) |
| 9 | `#section-5-proof` | "$14,820/month recovered in 4 weeks. Production untouched." | Customer proof · 1 large case card + outcome grid |
| 10 | `#section-6-compare` | "We find. We execute. We prove." | Compare matrix · ZopNight vs status quo |
| 11 | `#section-8-pricing` | "Outcome-aligned pricing. Pay when the bill drops." | Pricing · 3-tier with outcome callout |
| 12 | `#section-10-stakeholder` | "Built for every seat in the room." | Stakeholder grid · FinOps / Eng / Security / Finance roles |
| 13 | (no class — FAQ) | "Things teams ask before they sign." | FAQ accordion (5–7 Q&A) |
| 14 | `.final` | (CTA: "Start the loop") | Final CTA strip |
| 15 | `.bridge-marquee` | (marquee · ZopDay/ZopCloud cross-sell) | Bridge to siblings |
| 16 | `#graduation-band.section.tight` | (band) | "Customers graduate from ZopNight to…" (shared chrome) |

The nav anchors (`#zn-dashboard`, `#section-3-features`, etc.) are
referenced by the in-page sub-nav and by the **nav-overlay** Products
pane on every other page — do not rename without updating those.

---

## 3. ZopNight component families

All page-specific CSS is namespaced under two prefixes:

### 3.1 `.zn-*` · marketing components

| Family | Used for | Approx classes |
|---|---|---|
| `.zn-hero` | Hero block (h1, eyebrow, dual CTA, hero side-mock chip) | 3 |
| `.zn-stats` | Trust number row beneath the hero | 2 |
| `.zn-stat` | Single stat cell | 1 |
| `.zn-posture` | Security posture section · 4-tile IAM rail | 13 |
| `.zn-problem` | Problem framing tiles | 9 |
| `.zn-engines`, `.zn-engine` | Three-engines section + each card | 7 |
| `.zn-depth` | Feature bento (the 9-tile depth section) | 6 |
| `.zn-cdcr` | CDCR closed-loop diagram + steps | 34 |
| `.zn-proof` | Customer outcome card + grid | 26 |
| `.zn-compare` | Compare matrix rows | 4 |
| `.zn-pricing` | Pricing 3-col + outcome callout | 7 |
| `.zn-stake` | Stakeholder roles grid | 10 |
| `.zn-narrative` | Narrative text blocks (between bento and proof) | 4 |
| `.zn-3d`, `.zn-cta`, `.zn-mainthing`, `.zn-us`, `.zn-sec` | One-off accent classes | 1 each |

Naming rule: `zn-<section>-<element>-<state>`. E.g.
`zn-posture-tile`, `zn-posture-tile--locked`. Stick to this when
adding new sub-elements.

### 3.2 `.znd-*` · the interactive dashboard mock

The `#zn-dashboard` section renders a static-but-realistic ZopNight
console mock (`.znd-section`). It is the page's centerpiece — devs
implementing the production version should treat this as a tier-1
component, not a hero image.

| Class | Role |
|---|---|
| `.znd-section` | Outer wrapper, full-bleed dark frame |
| `.znd-frame` | The bordered "monitor" frame — gives the mock its console-window feel |
| `.znd-topbar` | The Mac-style traffic-light + tab strip at the top |
| `.znd-nav` (×3) | Left-rail nav of the mock app |
| `.znd-main` | The main canvas area inside the mock |
| `.znd-side` (×2) | Right-rail inspector panel |
| `.znd-canvas` (×3) | The architecture-canvas SVG/HTML graph inside |
| `.znd-cv-*` (×19) | Canvas-view atoms — node, edge, badge, callout, etc. |
| `.znd-view` (×2) | View-toggle pill (table / graph / map) |
| `.znd-brand` (×3) | In-mock brand chip (the small ZopNight wordmark inside the console) |

The mock uses **the same brand tokens as the real product app** — see
DESIGN.md §3 (Colors). Treat the mock as a thin sandbox skin over the
real design system: cream `--paper`, line `--line`, blue `--zop-blue`
for the active state. Don't introduce new colors inside the mock.

### 3.3 Shared chrome on this page

These are sitewide, not ZopNight-specific — listed here because they
appear on the page and contribute to the layout debt budget. Do not
re-implement; reuse from `homepage-chrome.css`:

- `.nav-*` (top nav, ~35 classes on this page)
- `.np-*` (nav-overlay product cards inside the Products pane,
  ~95 classes — much of this is the dropdown content)
- `.is-*` (state modifiers — `.is-active`, `.is-open`, `.is-sticky`)
- `.btn`, `.btn-accent`, `.btn-secondary`
- `.tn-*`, `.topbar-*`, `.ls-*`, `.hmp-*` (small one-offs from the
  shared sticky top-bar, login marquee, and hero mosaic — not unique
  to ZopNight)

---

## 4. Color discipline on this page

ZopNight's brand color is `--zop-blue`. The rule for this page:

| Where | Color | % of pixels |
|---|---|---|
| Hero eyebrow chip + dot | `--zop-blue` | <1% |
| Engines cards · active outline | `--zop-blue` | ~2% |
| Dashboard mock · selected node / active edge | `--zop-blue` | ~3% |
| Pricing CTA · primary button | `--zop-orange` (sitewide accent — *not* blue) | <1% |
| All other accent (hover lifts, CTA shadows, signature dots) | `--zop-orange` | ~5% |

**Counterintuitive but important**: even on the ZopNight page, the
**primary CTA color stays `--zop-orange`**. Blue is for *product
identity moments* (eyebrow, mock selection state, "ZopNight" wordmark
chips). Orange is for *get-the-user-to-act moments*. Don't paint the
"Start the loop" button blue — it weakens the brand recall on the
homepage.

Light/dark theme: blue swaps to `--logo-blue-on-dark` `#4A66D4` in
dark mode (the AA-compliant variant). The eyebrow rule:
```css
.zn-eyebrow{ color: var(--zop-blue, #2A4494); }
html[data-theme="dark"] .zn-eyebrow{ color: var(--logo-blue-on-dark, #4A66D4); }
```

The `--logo-blue-on-dark` token is already defined in `tokens.css`.

---

## 5. Interactions on this page

| Interaction | Trigger | Behavior | File |
|---|---|---|---|
| Sticky sub-nav | scroll past hero | Sub-nav docks under top nav, highlights current section on scroll | `chrome-pagetransition.js` |
| Hero CTA lift | hover | `translateY(-4px)` + offset `--zop-orange` block shadow | `chrome.css` (`.btn-accent`) |
| Dashboard mock | static | No JS animation — it's a styled HTML mock | — |
| CDCR diagram | scroll into view | Steps fade in sequentially with a 100ms stagger | `chrome-darkfold.js` |
| Compare matrix | hover row | Row background tints; check icon pulses once | inline CSS |
| Stakeholder cards | hover | Tile lifts + orange underline on role title | `.zn-stake-card:hover` |
| FAQ accordion | click | `<details>` native expand. No JS. | — |
| Bridge marquee | always | Horizontal scroll · `animation: marquee 28s linear infinite` | `chrome.css` |

Reduced motion: respect `prefers-reduced-motion: reduce` for all of
the above. The CDCR stagger should collapse to instant. Marquee
keeps moving but slower (60s) so the cross-sell stays legible.

---

## 6. Mobile

Breakpoint: **`max-width: 760px`**.

| Section | Mobile change |
|---|---|
| Hero | h1 drops from clamp(46–72px) to clamp(34–46px). Dual CTAs stack. Side-mock chip hidden. |
| `.zn-stats` | 4 cells → 2×2 grid |
| `.zn-posture` | 4 tiles → vertical stack |
| `#zn-dashboard` | Mock scales down · `.znd-side` panels hidden, only canvas + topbar visible |
| `.zn-engines` | 3 cards → vertical stack |
| `.zn-depth` | 9-tile bento → vertical stack |
| `.zn-cdcr` | Horizontal flow diagram → vertical step list |
| `.zn-proof` | Outcome grid → single column |
| `.zn-compare` | Table → vertical card-per-row |
| `.zn-pricing` | 3 columns → 1, "outcome callout" pinned at top |
| `.zn-stake` | 4 role cards → 2×2 |
| FAQ | Same (already vertical) |

Watch-out: the **dashboard mock** (`#zn-dashboard`) is the easiest
spot to break on mobile. It's a 1280×800-ish landscape composition.
Current approach is to scale-and-clip; production should consider
either (a) a simplified mobile-only mock, or (b) horizontal-swipe
overflow on the mock with a "scroll hint" indicator.

---

## 7. Implementation notes for production

When porting this static page to the Next.js production app
(`zopdev/website`), the recommended component breakdown:

```
<ZopNightPage>
  ├── <Hero zn />                      ← h1, eyebrow, dual CTA, side-mock
  ├── <StatsTrust zn />                ← shared component, theme="zn"
  ├── <PostureSection />               ← unique to ZopNight
  ├── <DashboardMock zn />             ← the big interactive mock
  ├── <ProblemSection />               ← unique
  ├── <EnginesOverview />              ← 3-card section
  ├── <FeatureBento zn />              ← 9-tile bento, reuse with prop
  ├── <CDCRDiagram />                  ← can move to /closed-loop-iam-remediation.html as well
  ├── <CustomerProof case="zn-flexflow" />
  ├── <CompareMatrix vs="status-quo" theme="zn" />
  ├── <Pricing theme="zn" />           ← reuse, theme prop swaps copy + accent
  ├── <StakeholderGrid theme="zn" />   ← reuse
  ├── <FAQ topic="zn" />               ← reuse, content loaded by topic
  ├── <FinalCTA theme="zn" />          ← reuse
  └── <BridgeMarquee siblings />       ← sitewide footer adjunct
```

### Reuse signals

Three components are **safe to reuse across all 3 product pages**
(ZopNight, ZopDay, ZopCloud) with a `theme` prop:

1. `<StatsTrust>` · cell count + numbers vary, layout is identical
2. `<StakeholderGrid>` · 4 role tiles, copy varies per product
3. `<Pricing>` · 3-tier layout, copy + outcome line vary
4. `<FinalCTA>` · single CTA strip, copy + accent vary

Two are **unique to ZopNight** and should NOT be generalized:

1. `<PostureSection>` · the read-only / audit IAM rail is ZopNight-
   specific (ZopDay has a different posture story under "k8s-bridge")
2. `<CDCRDiagram>` · CDCR is ZopNight terminology; ZopDay has its own
   `zd-stages` flow that should not share a component

### Performance budget

- LCP target: **<2.0 s on 4G simulated** (current static prototype:
  ~1.4 s on the hero h1)
- Critical CSS: extract just `.zn-hero` + nav into a critical bundle
- Lazy-load the dashboard mock SVG/CSS — it's not above-the-fold
- The bridge-marquee should not block FCP — defer
- Sitewide bundle target: <120 KB JS, <60 KB CSS (gzip)

### Accessibility musts

- `<h1>` only once on this page (the hero promise)
- Every `<section>` gets a `<h2>` or an `aria-label`
- Dashboard mock is decorative — wrap in `<div role="img"
  aria-label="ZopNight console showing the resource architecture
  canvas with idle nodes flagged">` and hide individual SVG nodes
  from screen readers
- CDCR step icons need `aria-label` per step
- Compare matrix needs `<th scope="row">` / `scope="col"` on the
  header cells
- FAQ uses `<details><summary>` natively — keyboard accessible by
  default, do not replace with custom JS accordion

### What can ship as-is

The CSS and HTML in the prototype is production-quality for the
following components (lift directly, no rewrite needed):

- `.zn-posture` IAM rail
- `.zn-cdcr` diagram (vector + step list)
- `.zn-compare` matrix
- `.zn-stake` role grid
- `.zn-proof` outcome card

### What needs a rewrite

- Hero animation (currently inline `<style>`, should move to a
  styled-component or CSS module)
- The dashboard mock (`.znd-*`) is hand-coded HTML — port to a
  declarative spec (JSON → React tree) so non-engineers can edit it
- The marquee · current uses CSS keyframes with hardcoded width;
  replace with a JS-driven marquee that pauses on hover + handles
  variable child widths

---

## 8. Don't relitigate

These decisions are settled — bring them up only if there's new data:

- ✗ Don't make the primary CTA blue. It stays orange. (See §4.)
- ✗ Don't replace the dashboard mock with a video. The static mock
  scrolls past at 60fps; a video does not, and burns bandwidth.
- ✗ Don't add a "Free trial" CTA. ZopNight pricing is outcome-aligned
  ("pay when the bill drops") — a trial CTA contradicts the model.
- ✗ Don't shorten the CDCR section. It's the page's strongest proof
  for security-first buyers; trimming it hurts the CISO read.
- ✗ Don't move the proof section before pricing. The order is:
  features → CDCR → proof → compare → pricing. Pricing always
  follows proof.

---

## 9. Open questions for the dev

These need a product-side answer before the production build ships:

1. **Real numbers vs prototype numbers**: the hero side-mock and the
   proof section ("$14,820/month recovered") use illustrative
   numbers. Replace with a real customer's metrics or keep as
   composite?
2. **CDCR licensing**: the diagram has been productized in the
   `cdcr-whitepaper.html` page. Does it warrant a standalone diagram
   library, or stays inline per page?
3. **Dashboard mock fidelity**: should the mock match the actual
   production console layout (currently in progress) or stay as the
   "future state" rendering?
4. **Pricing copy**: "Pay when the bill drops" is the marketing
   promise. Is the contract language ("we take a % of verified
   savings") finalized? If not, marketing copy should soften to
   "outcome-aligned" only.

---

*Last reviewed: 2026-05. Owner: design. Source files:
`zopnight.html`, `homepage-chrome.css`, `chrome.css`, `tokens.css`.*
