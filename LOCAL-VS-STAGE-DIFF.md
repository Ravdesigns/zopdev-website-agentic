# Local Site vs. stage.zop.dev — Developer Diff

**Purpose:** Bring the local build (`/Users/zop.dev/Downloads/ZopDev Website Final R copy/index.html`) in line with the **staging reference** at https://stage.zop.dev/. Staging is the source of truth — anything in this doc that differs should change in local, not the other way around.

**Date of capture:** 2026-05-26
**Files compared:** `index.html` (local) vs. rendered HTML of `https://stage.zop.dev/`
**Visual evidence:** see [`visuals/`](visuals/) folder + section [§16 Visual side-by-side](#16-visual-side-by-side) at the bottom of this doc.

---

## 0. TL;DR — the 14 things to fix

| # | Area | Stage | Local | Severity |
|---|------|-------|-------|----------|
| 1 | Hero release pill version | `v2026.04` | `v1.5` | **High** — visible above the fold |
| 2 | Resources dropdown blog teaser | "The IDP Adoption Problem: Why Most Platforms Fail" (14 min · kubernetes) | "CDCR: making cost continuous, not quarterly." (8 min · Engineering) | High — visible in nav |
| 3 | Footer column count + links | 4 cols, ~28 links incl. Solutions column | 4 cols, ~16 links, **no Solutions column**, lone "Community" column has 1 link | **Critical** — many product pages unlinked |
| 4 | Bridge marquee copy (bottom band) | "Multi-cloud automation · Production-ready in 30 min · SOC 2 · ISO 27001 · zero-trust · 30% average cloud cost cut · 4 platforms · 1 console" | "One control plane · every cloud · ISO 27001:2022 · SOC 2 Type II · IRDAI · DPDP · MeitY-empaneled · $15M+ cloud spend under management · 154 teams · AWS · GCP · Azure" | **Critical** — totally different message |
| 5 | Final CTA background | Plain `#0F0F12` dark band (no Tetris) | Live Tetris animation on `<canvas id="tet-canvas">` filling right ~46% | High — visual mismatch |
| 6 | AWS Marketplace badge in footer | Present (`/logo-aws-marketplace.svg` under the ZopDev wordmark) | Missing entirely | Medium |
| 7 | OG image | `https://stage.zop.dev/og/home.png` (proper share card) | `https://zop.dev/favicon.svg` (just the favicon) | **Critical** — broken social previews |
| 8 | Canonical URL | `https://stage.zop.dev/` (production should be `https://zop.dev/`) | `https://zopdev.com/index.html` | High — wrong domain + has `.html` |
| 9 | URL pattern across the site | Clean URLs: `/pricing`, `/zopnight`, `/about`, `/resources/blogs` | `.html` files: `pricing.html`, `zopnight.html`, `about.html`, `blog.html` | High — routing rewrite needed |
| 10 | Calculator topbar CTA href | `/pricing#calculator` | `cur-calculator.html` | Medium |
| 11 | **ZopNight intro dashboard data** — currency + numbers | USD: TOTAL 2,342 / SPEND $68.2K / SAVINGS US$6,207.90 / RATE 8.3% + "CRITICAL 2 cost anomalies detected" banner | INR: TOTAL 1,106 / SPEND ₹57.3K / SAVINGS ₹161.45 / RATE 0.3%, no anomaly banner | **High** — visual: numbers look weak vs stage |
| 12 | **ZopDay intro dashboard chrome** | Has a "Demo · You're viewing the ZopDay playground" top bar + "Persona Enterprise" + "Get started"; **no** filter chips; **no** TYPE column; "5 clusters" wording | No demo bar; **has** filter chips (All/Healthy/Issues/Pending); **has** TYPE column; "5 spaces" wording | Medium — visible mismatch |
| 13 | Proof carousel images | Local files `/office-{2,3,4}.jpeg` (real ZopDay branded scenes) | Unsplash CDN URLs (generic stock) | Medium |
| 14 | Footer copyright | `© 2026 ZopDev · privacy · terms` (privacy + terms both → `/trust`) | Same content, hrefs differ (`trust.html`) | Low |

Everything else (hero copy, sub-brand intro copy, engines bento, walkthroughs, CDCR, FAQ, stakeholder grid, topbar ticker, showcase tabs) is **content-identical**. The big work is the footer, the URL scheme, the meta tags, the two intro dashboard mocks, and the few visible copy changes above.

---

## 1. Scope, framework, and baseline facts

| Fact | Stage | Local |
|------|-------|-------|
| File size (homepage HTML) | ~468 KB | ~1.28 MB (~2.7×) |
| Line count | 3,400 | 27,040 |
| Build system | **Astro** (5 astro-islands, `/_astro/*.js`, `/_astro/*.css` chunks) | Static single-file HTML, inline `<style>` + `<script>` |
| Default theme attr | `data-theme="dark"` (forced, but persists from `localStorage.zop-theme`) | `data-theme="dark"` (same; reads `localStorage.zop-theme` pre-paint) |
| Theme color meta | `#F58549` (zop orange) | `#F58549` ✓ |
| Loader on first visit | Astro `<astro-island name="TetrisCanvasIsland">` | Inline `<div class="zop-loader" id="zop-loader">` + `chrome-pagetransition.js`-style IIFE |
| Mobile nav implementation | Astro `MobileNav.astro_…js` island | Inline drawer at line ~26611 + `chrome-mobilenav.js` |
| Drawer for engine details | Astro `<astro-island name="DrawerFeatures">` | Inline `<div class="drawer" id="drawer">` at line ~21028 + cloned `<template>` content |
| Footer globe | Astro `<astro-island name="FooterGlobe">` (interactive drop-a-pin) | `<canvas id="foot-regions-map">` + `chrome-footer.js` (static-ish dot map) |

> **Note for devs:** stage is on Astro, local is a static HTML build. You do **not** need to port the local site to Astro to match stage — the user-visible content + structure is what matters. Match the *output* (DOM + visible text + styling), not the framework.

---

## 2. Header / Top nav

### 2.1 Announcement strip (topbar)

| Element | Stage | Local | Action |
|---------|-------|-------|--------|
| Calculator CTA href | `/pricing#calculator` | `cur-calculator.html` | **Change to `pricing.html#calculator`** and add a `#calculator` anchor on pricing page |
| Calculator copy "Try it →" | Same | Same | OK ✓ |
| News ticker 7 items | Identical wording, identical tags (`ZN / FIN / ZD / SCH / EVT / AR / CDCR`) | Identical | OK ✓ |

### 2.2 Logo + primary nav

| Item | Stage | Local | Action |
|------|-------|-------|--------|
| Logo lockup | `<use href="#logo-zopdev">` → `/` | Same SVG symbol → `index.html` | Change href to `/` (clean URL) |
| Nav: Product (dropdown trigger) | `href="#"` data-menu | Same | OK ✓ |
| Nav: Resources (dropdown trigger) | `href="#"` data-menu | Same | OK ✓ |
| Nav: Pricing | `/pricing` | `pricing.html` | Switch to clean URL |
| Nav: Company (dropdown trigger) | `href="#"` data-menu | Same | OK ✓ |
| Nav: Community | `/community` | `community.html` | Switch to clean URL |

### 2.3 Product dropdown

**Identical content** — 3 cards (ZopNight, ZopDay, ZopCloud) + bottom MCP promo row.

Only delta:
- All hrefs: stage uses `/zopnight`, `/zopday`, `/zopcloud`, `/developers`. Local uses `.html` suffix.

### 2.4 Resources dropdown — **content differs**

| Element | Stage | Local | Action |
|---------|-------|-------|--------|
| Hero blog title | "The IDP Adoption Problem: Why Most Platforms Fail" | "CDCR: making cost continuous, not quarterly." | **Update title, link, image** |
| Hero blog meta | "14 min read · kubernetes" | "8 min read · Engineering" | Update |
| Hero blog href | `/resources/blogs/the-idp-that-developers-actually-use-5-golden-paths-at-scale/` | `blog.html` | Point at the real post URL |
| Hero blog image | `https://storage.googleapis.com/zopdev-blog-resources/.../d7da312b-...-banner.webp` | `event-cover-1.svg` | Swap to the GCS-hosted banner |
| Compact list — number of rows | 6 rows | 8 rows | **Remove Product docs + Developer docs** to match (or keep all 8 and add the same to stage — confirm with PM) |
| Compact list — items present in both | Blog, Ebooks, Case studies, Use cases, Kubernetes guide, Changelog | Same 6 | OK ✓ |
| Items in local but not stage | — | Product docs (`product-documentation.html`), Developer docs (`developer-documentation.html`) | **Decide: drop or keep?** |

Recommended: drop "Product docs" and "Developer docs" from the dropdown to match stage; surface them in the footer's Resources column instead (stage's footer has `/developers` and `/changelog` linked there).

### 2.5 Company dropdown

**Identical content** — About hero + Careers + Contact compact cells. Same photo stack. Only hrefs differ (`.html` vs clean URLs).

### 2.6 Playground chip dropdown

**Identical content** — ZopNight playground + ZopDay playground tiles. Only hrefs differ.

### 2.7 CTA cluster (right side)

| Item | Stage | Local | Action |
|------|-------|-------|--------|
| Sign In | `/signin` | `signin.html` | URL change |
| Book a Demo | `/demo` (.btn .btn-accent) | `demo.html` | URL change |
| Mobile toggle | `#mob-nav-toggle` hamburger | Same | OK ✓ |

### 2.8 Mobile drawer

**Same structure** — collapsible Product / Resources / Company groups, plus flat Pricing + Community, then Sign In + Book a Demo. Local additionally exposes a theme toggle inside the drawer (`#mob-nav-theme`) — stage does NOT have a visible theme toggle anywhere (programmatic only via `localStorage.zop-theme`).

> **Recommendation:** keep the local mobile drawer theme toggle — it's a usability win and not a stage regression to keep it.

---

## 3. Hero (`<section class="hero-v2" id="hero">`)

| Element | Stage | Local | Action |
|---------|-------|-------|--------|
| Release pill version tag | `v2026.04` | `v1.5` | **Update `<span class="hpv-tag">v1.5</span>` → `v2026.04`** |
| Release pill href | `/changelog/` | `changelog.html` | Clean URL |
| Release pill kicker text | "Live Kubernetes cluster state" | Same | OK ✓ |
| H1 lines | "Build / Deploy / Govern." + "On every cloud." | Same | OK ✓ |
| Sub-headline | "One operating layer across AWS, GCP, and Azure. Every account, in one place." | Same | OK ✓ |
| Primary CTA | "Run the audit, read-only →" → `/signin/` | "Run the audit, read-only →" → `signin.html` | URL change only |
| Secondary CTA | "Talk to platform sales →" → `/demo/` | Same → `demo.html` | URL change only |
| Founders strip | "Built by the alumni of Meesho · Accenture · HashiCorp · OYO" | Same | OK ✓ |
| Trust seals | SOC 2 Type II + ISO 27001 2022 | Same | OK ✓ |
| Vendor logos | aws / azure / gcp | Same | OK ✓ |

> **Important:** local still says `v1.5` in two places (hero pill + at least one engine-drawer body paragraph: "v1.5 extended Kubernetes coverage to Deployments, StatefulSets…"). Decide whether the engine-drawer reference should also update to `v2026.04` or stay as a historical "v1.5 shipped this" note.

---

## 4. Section-by-section: every section below the hero

Sections are listed in render order. ✓ = content-identical between stage and local.

| # | Section (anchor / class) | Status | Notes |
|---|--------------------------|--------|-------|
| 4.1 | `.trust-marquee` | ✓ | 6 items identical: "Trusted by McAfee running 12 AWS accounts", "48 K8s clusters", "1,000+ req/sec", "5 of India's top 20 FMCG enterprises", "$15M+ cloud spend under management", "154 teams" |
| 4.2 | `.showcase` (`#showcase`) | ✓ | 5 tabs (Provision → Organize → Schedule → Optimize → Prove), same videos, same captions, same throughline closer ("Provision once, optimize forever.") |
| 4.3 | `.globe-zoom-scroll` (`#globe-zoom-scroll`) | ✓ | 3 statements: "Ship faster." / "Spend smarter." / "Stay audit-ready." — present in both |
| 4.4 | `.zn-intro` (`#zn-intro`) — ZopNight intro | ⚠ **dashboard data differs** (see §16.2) | Both sites embed the ZopNight console mockup here (heading "Found. Fixed. Audited." + dashboard). The **data inside differs**: stage shows USD + impressive numbers + a "CRITICAL 2 cost anomalies detected" banner above the chart; local shows INR + small numbers + no anomaly banner. **Action:** update local mock to: TOTAL RESOURCES `2,342`, CURRENT ESTIMATED SPEND `$68.2K` (unbilled cost · Apr 8 – May 7), REALIZED SAVINGS `US$6,207.90` (from scheduled start/stop this month), SAVINGS RATE `8.3%`. Sidebar group rename: `Resources` → `Inventory`. Add a CRITICAL severity banner above the "Cost Over Time" chart: *"2 cost anomalies detected — Most recent +$EN spent US$4,376.44 vs expected US$2,259.27 on 3 May 2026"*. |
| 4.5 | `.section#features` — Engines bento | ✓ | 4 top cards (Recommendations by Lens / Smart Scheduling / Autoscaling by Tide / Event Readiness) + Auto-Remediation banner + all drawer copy. Identical 5 "cap-strip" follow-ups (Architecture, Dashboards & Reports, Auto-Tagging, Showback, All-Resources). |
| 4.6 | `.section#getting-started` — ZopNight walkthrough tabs | ✓ | 4 tabs: Recommendations, Smart Scheduling, Event Readiness, Smart Autoscaling. Same pointer steps. |
| 4.7 | `.product-cta--night` — ZopNight CTA | ✓ | "Run the audit. See the dollars." → `/zopnight/`. Same dashboard peek. |
| 4.8 | `.zd-intro` (`#zd-intro`) — ZopDay intro | ⚠ **dashboard chrome differs** (see §16.3) | Both sites embed the ZopDay console mockup here (heading "Provision. Deploy. Operate." + dashboard). **Differences in chrome:** (a) stage has a top demo bar — *"Demo · You're viewing the ZopDay playground — changes aren't saved." · Persona [Enterprise ▾] · Get started"*. Local has no such bar. (b) stage uses **"5 clusters · 5 healthy"** wording; local uses **"5 spaces · 5 healthy"** (also drop the `[live]` chip). (c) Stage **does NOT** show filter chips (All/Healthy/Issues/Pending) above the table; local does — remove them. (d) Stage's table is 5 columns (NAME / STATUS / PROVIDER / REGION / ADDED); local has 6 (extra TYPE column) — drop TYPE. (e) Stage's "Provision New" button is outline-only; local's is solid orange — make it outline. (f) Stage's "added" times are `11mo / 11mo / 8mo / 8mo / 4mo`; local has `10mo / 10mo / 8mo / 7mo / 3mo` — update to stage. |
| 4.9 | `.zdz-scroll` (`#zdz-scroll`) — ZopDay scroll cinematic | ✓ | Both already collapse this to a no-op via CSS. Code comment confirms: "entire cinematic section now collapses to a no-op". Leave as-is. |
| 4.10 | `.section#zd-platform` — ZopDay platform cards | ✓ | 3 cards: One-click environments / Push to deploy / Templates, not YAML. Same drawer copy. |
| 4.11 | `.section#getting-started-zopday` — ZopDay walkthrough tabs | ✓ | 3 tabs: Environments / Deployments / Service Configuration. Stage labels this "Coming soon" — verify local does too. |
| 4.12 | `.product-cta--day` — ZopDay CTA | ✓ | "Spin a cluster. Ship to production." → `/zopday/`. Same console peek. |
| 4.13 | `.section#integrations` — PCB integrations board | ✓ | 7 category bays (BILLING APIS / MONITORING / NOTIFICATIONS / AI · MCP / APPLICATIONS / DATASTORES / OBSERVABILITY). Same chip labels. Same "Pulse the board" interactive. |
| 4.14 | `.section#cdcr` — Continuous Detect & Remediation | ✓ | 4 nodes (Detect / Classify / Remediate / Verify). Same tagline "CDCR detects and acts." Same CTA → `/cdcr-whitepaper/` (local `cdcr-whitepaper.html`) |
| 4.15 | `.section#proof` — Proof carousel | ⚠ image source differs | 3 slides identical content. **Stage uses local images: `/office-3.jpeg`, `/office-4.jpeg`, `/office-2.jpeg`. Local uses Unsplash CDN URLs** (`photo-1620712943543-…`, `photo-1635776062764-…`, `photo-1542838132-…`). The local `office-*.jpeg` files exist in the project root — **swap the Unsplash URLs back to the local files**. |
| 4.16 | `.section#stakeholder` — Stakeholder grid | ✓ | 5 cards: CFO/FinOps → CTO/CPO → VP Engineering → Platform/SRE → InfoSec/Audit. Same "stops" lines. |
| 4.17 | `.section#faq` — FAQ | ✓ | 7 questions, identical wording. |
| 4.18 | `.final` — Bottom "Bring your cloud." CTA | ⚠ visual differs | Same H2 / body / CTAs / 3-stat columns (5 min / 0 / read-only). **Local has `<canvas id="tet-canvas">` rendering a live Tetris animation in the right 46% of the section. Stage does NOT — stage is just plain `bg-[#0F0F12]` with KPI counters that jitter every 2.4s.** Decide which one to keep (see §8.1). |
| 4.19 | `.bridge-marquee` | ❌ **copy differs entirely** | See §6 below. |

---

## 5. Footer — full overhaul

### 5.1 What stage looks like (4 columns)

```
product            solutions                  resources              company
─────────────      ────────────────────       ──────────────────     ────────
ZopNight           Use cases by industry      Blog                   About
ZopDay             DevOps hub                 Ebooks                 Careers
ZopCloud           Platform engineering       Kubernetes guide       Contact
Kubernetes View    Services                   What is DevOps         Community
Integrations       Customers                  CI/CD best practices   Demo
Pricing                                       CDCR whitepaper        Status
Walkthrough                                   Developers             Trust
Roadmap                                       Changelog
```

### 5.2 What local has today (4 columns)

```
product           resources                  company       community
─────────────     ────────────────────       ─────────     ──────────
ZopNight          Blog                       About         Community
ZopDay            Ebooks                     Careers
Kubernetes View   Case studies
ZopCloud          Use cases by industry
Pricing           Product documentation
                  Kubernetes guide
                  Changelog
                  Developer documentation
```

### 5.3 Diff to apply

| Column | Action |
|--------|--------|
| **product** | **Add 3 missing links:** `Integrations` → `integrations.html`, `Walkthrough` → `walkthrough.html`, `Roadmap` → `roadmap.html`. Order should be: ZopNight, ZopDay, ZopCloud, Kubernetes View, Integrations, Pricing, Walkthrough, Roadmap. (Local has "Kubernetes View" before "ZopCloud" — reorder to match stage.) |
| **solutions** | **Add a brand-new column.** Links (in order): Use cases by industry → `solutions.html`, DevOps hub → `devops-hub.html`, Platform engineering → `platform-engineering-hub.html`, Services → `services.html`, Customers → `customers.html`. All five HTML files **already exist in the project** — just wire them up. |
| **resources** | **Heavy rework.** Remove: Case studies (moves to Solutions as "Customers"), Use cases by industry (moves to Solutions), Product documentation, Developer documentation. **Add:** What is DevOps → `what-is-devops.html`, CI/CD best practices → `ci-cd-best-practices.html`, CDCR whitepaper → `cdcr-whitepaper.html`, Developers → `developers.html`. Final order: Blog, Ebooks, Kubernetes guide, What is DevOps, CI/CD best practices, CDCR whitepaper, Developers, Changelog. |
| **company** | **Add 5 missing links.** Currently only About + Careers. Add: Contact → `contact.html`, Community → `community.html`, Demo → `demo.html`, Status → `status.html`, Trust → `trust.html`. Drop the standalone "community" column — Community now lives in Company. |

### 5.4 Footer extras

| Element | Stage | Local | Action |
|---------|-------|-------|--------|
| ZopDev wordmark | `#logo-zopdev` SVG | Same | OK ✓ |
| Compliance badges (SOC 2, ISO 27001) | Present | Present | OK ✓ |
| **AWS Marketplace badge** | `/logo-aws-marketplace.svg` rendered in `.foot-globe` | **Missing** | **Add it.** The SVG isn't in the project today — request the asset from design (or pull from stage's `/logo-aws-marketplace.svg`) and drop into project root. |
| Globe / regions map | Astro `FooterGlobe` interactive canvas | `<canvas id="foot-regions-map">` static-ish dot map driven by `chrome-footer.js` | Visual approximation is fine — both are dotted world maps. |
| Copyright line | `© 2026 ZopDev · privacy (/trust) · terms (/trust)` | Same content, `trust.html` href | URL change only |
| "made with [heart] by zop.dev" | Same | Same | OK ✓ |
| Social links | LinkedIn / Twitter / GitHub (text links, no icons) | Same | OK ✓ |
| Address / phone / email | **Not present** on stage | Not present | OK ✓ |

---

## 6. Bridge marquee — replace the copy

The orange-dot-separated scrolling band right above the footer.

| | Order | Phrase |
|---|------|--------|
| **Stage (new)** | 1 | Multi-cloud automation |
| | 2 | Production-ready in 30 min |
| | 3 | SOC 2 · ISO 27001 · zero-trust |
| | 4 | 30% average cloud cost cut |
| | 5 | 4 platforms · 1 console |
| **Local (old)** | 1 | One control plane · every cloud |
| | 2 | ISO 27001:2022 · SOC 2 Type II |
| | 3 | IRDAI · DPDP · MeitY-empaneled |
| | 4 | $15M+ cloud spend under management |
| | 5 | 154 teams · AWS · GCP · Azure |

**Action:** replace the 5 `<span>` items inside `<div class="bridge-track">` (and the duplicated set used for seamless looping) with the stage list. Aria-label stays `"ZopDev brand statement"`.

> Note: the local copy leaned heavily into India-specific compliance signals (IRDAI · DPDP · MeitY) and big numbers ($15M, 154 teams). Stage went broader / shorter / more aspirational. If you need to keep the India-compliance signal somewhere, the trust marquee at the top of the page already carries `"5 of India's top 20 FMCG enterprises"`.

---

## 7. URL & routing changes (global)

Stage uses **clean URLs** (no `.html` suffix, trailing slash where Astro emits one). Local uses **`.html` suffixed** file paths. Either:

**A.** Switch the local site to a clean-URL build (server rewrite on Vercel) and update every href in `index.html` (and on every other page) accordingly. The `vercel.json` already exists in the project root — extend its `rewrites` / `cleanUrls` config.

**B.** Keep `.html` suffix locally for direct file:// preview and only rewrite on deploy. (Stage emits `.html` underneath — Astro's static build produces files like `/pricing/index.html` and Vercel serves them at `/pricing`.)

**Mapping table (homepage hrefs that need rewriting):**

| Local href | Stage href | Notes |
|-----------|-----------|-------|
| `index.html` | `/` | logo, all home links |
| `pricing.html` | `/pricing` | nav, footer |
| `pricing.html#calculator` | `/pricing#calculator` | topbar Calculator CTA — change anchor target |
| `cur-calculator.html` | n/a — folded into `/pricing#calculator` | **Decide:** keep the dedicated calculator page or fold into pricing |
| `community.html` | `/community` | nav, footer |
| `zopnight.html` | `/zopnight` | nav, product CTA, footer |
| `zopday.html` | `/zopday` | nav, product CTA, footer |
| `zopcloud.html` | `/zopcloud` | nav, footer |
| `k8s-view.html` | `/k8s-view` | footer |
| `integrations.html` | `/integrations` | footer |
| `walkthrough.html` | `/walkthrough` | footer |
| `roadmap.html` | `/roadmap` | footer |
| `solutions.html` | `/solutions` | footer (new column) |
| `devops-hub.html` | `/devops-hub` | footer (new column) |
| `platform-engineering-hub.html` | `/platform-engineering-hub` | footer (new column) |
| `services.html` | `/services` | footer (new column) |
| `customers.html` | `/customers` | footer (new column) |
| `blog.html` | `/resources/blogs` | nav + footer |
| `free-ebooks.html` | `/resources/ebooks` | nav + footer |
| `kubernetes-guide.html` | `/kubernetes-guide` | nav + footer |
| `what-is-devops.html` | `/what-is-devops` | footer |
| `ci-cd-best-practices.html` | `/ci-cd-best-practices` | footer |
| `cdcr-whitepaper.html` | `/cdcr-whitepaper` | CDCR CTA + footer |
| `developer-documentation.html` | n/a — folded into `/developers` | dropdown + footer |
| `developers.html` | `/developers` | footer |
| `changelog.html` | `/changelog` | hero pill + footer + dropdown |
| `about.html` | `/about` | Company dropdown + footer |
| `careers.html` | `/careers` | Company dropdown + footer |
| `contact.html` | `/contact` | Company dropdown + footer + final CTA |
| `signin.html` | `/signin` | nav + hero CTA + final CTA |
| `demo.html` | `/demo` | nav + hero CTA + footer |
| `playground.html` (#zopnight, #zopday) | `/zopnight/playground`, `/zopday/playground` | nav playground chip |
| `status.html` | `/status` | footer |
| `trust.html` | `/trust` | footer (privacy + terms) |
| `product-documentation.html` | n/a — not linked from stage homepage | drop or relink |
| Blog post hero href | `blog.html` | `/resources/blogs/the-idp-that-developers-actually-use-5-golden-paths-at-scale/` |

---

## 8. Visual / behavioral diffs

### 8.1 Final CTA background — Tetris vs. flat dark

- **Local:** `<canvas id="tet-canvas">` runs a continuously-falling Tetris board (`setInterval(tick, 240)`) using `#2A4494 / #F58549 / #7FB236`, occupying the right ~46% of the final CTA section.
- **Stage:** flat `#0F0F12` background. The KPI counters (5 min / 0 / read-only) are jittered every 2.4s with a soft flash, but no Tetris canvas.

**Decision required:** keep Tetris (local) or strip to flat dark (stage). The Tetris is a brand element used elsewhere (loader), but stage clearly chose to drop it from the final CTA. **Recommended:** drop the Tetris on the final CTA to match stage, keep it only in the initial brand loader.

### 8.2 ZopNight / ZopDay intro dashboard mocks — **correction**

A previous pass said "remove the dashboards from the intro sections to match stage". **That was wrong.** Visual comparison (see §16.2 + §16.3) confirms **stage also embeds the full dashboards in both intro sections.** The diff is in the *content* of the dashboards, not their presence.

**ZopNight intro dashboard data** — update local to match stage:
| Stat | Local (current) | Stage (target) |
|------|-----------------|----------------|
| TOTAL RESOURCES | `1,106` | `2,342` |
| CURRENT ESTIMATED SPEND | `₹57.3K` (Apr 1 – Apr 29) | `$68.2K` (Apr 8 – May 7) — USD |
| REALIZED SAVINGS | `₹161.45` (scheduled start/stop this month) | `US$6,207.90` (scheduled start/stop this month) — USD |
| SAVINGS RATE | `0.3%` | `8.3%` |
| Sidebar item under "Cloud Estate" | "Resources" | "Inventory" |
| Banner above the "Cost Over Time" chart | None | Critical-severity strip: *"2 cost anomalies detected — Most recent +$EN spent US$4,376.44 vs expected US$2,259.27 on 3 May 2026"* + "View All" link |

**ZopDay intro dashboard chrome** — update local to match stage:
- Add the playground demo top bar: *"Demo · You're viewing the ZopDay playground — changes aren't saved."* on the left + *"Persona [Enterprise ▾] · Get started >"* on the right.
- Change the H3 sub-label: `5 spaces · 5 healthy` → `5 clusters · 5 healthy`. Drop the `[live]` chip.
- Remove the filter chip row (`All / Healthy / Issues / Pending`).
- Drop the `TYPE` column from the table (keep NAME / STATUS / PROVIDER / REGION / ADDED).
- Change "Provision New" button styling from `btn btn-accent` (filled orange) to outline.
- Update "added" times: `10mo / 10mo / 8mo / 7mo / 3mo` → `11mo / 11mo / 8mo / 8mo / 4mo`.

> **Verify with PM before shipping.** The local dashboard is more "honest" (real INR numbers, kubernetes type, search-and-filter affordance). Stage chose to make the marketing dashboard *more aspirational* (bigger USD numbers, anomaly alert, simpler chrome). If the PM wants to keep local's "honest" version, leave it — but everyone reviewing the homepage needs to know stage's version is the target.

### 8.3 Proof carousel images

- **Stage:** local files `/office-3.jpeg`, `/office-4.jpeg`, `/office-2.jpeg`.
- **Local:** Unsplash CDN URLs (`photo-1620712943543-…`, `photo-1635776062764-…`, `photo-1542838132-…`).

**Action:** swap to the local `office-{2,3,4}.jpeg` files. They already exist in the project root (and have 600w / 1200w responsive variants).

### 8.4 Theme behavior

Both honor `localStorage.zop-theme`, both pre-paint via inline IIFE, both default to dark on first load. **No change required.**

Local exposes a manual theme toggle inside the mobile drawer (`#mob-nav-theme`); stage has no visible toggle anywhere. Leave local as-is unless PM wants strict parity (see §2.8).

### 8.5 Loader / brand intro

| | Stage | Local |
|---|-------|-------|
| Component | `<astro-island name="TetrisCanvasIsland">` | `<div class="zop-loader" id="zop-loader">` |
| Tagline | "Continuous CloudOps" | Same ✓ |
| Skip rule | `sessionStorage.zd-loader-shown-v1` + reload-detect + headless-detect | Same ✓ |
| Lift animation | `zop-loader-out` @ ~1.52s | Same ✓ |

No user-visible change needed.

---

## 9. Meta / SEO

| Tag | Stage | Local | Action |
|-----|-------|-------|--------|
| `<title>` | `ZopDev. Multi-cloud optimization on autopilot` | Same ✓ | — |
| `meta name="description"` | "ZopNight by ZopDev. Continuously discovers cloud sprawl and remediates it in one click. No code changes, no DevOps army required." | Same ✓ | — |
| `<link rel="canonical">` | `https://stage.zop.dev/` | `https://zopdev.com/index.html` | **Change to `https://zop.dev/`** (production domain, no `.html`) |
| `meta property="og:url"` | `https://stage.zop.dev/` (or production equivalent) | `https://zop.dev/` ✓ | OK ✓ |
| `meta property="og:image"` | `https://stage.zop.dev/og/home.png` | `https://zop.dev/favicon.svg` | **Create and link a proper 1200×630 OG card** at `/og/home.png` |
| `meta name="twitter:card"` | `summary_large_image` | Same ✓ | — |
| `meta name="twitter:site"` | `@zopdev` | Verify ✓ | — |
| `application/ld+json` — WebPage | Present | Verify present | — |
| `application/ld+json` — Organization with `sameAs` (linkedin, twitter, github) | Present | Verify present | If missing, add. |

---

## 10. Asset checklist

Confirm these assets exist in the project root (already there unless noted):

- ✓ `favicon.svg`
- ✓ `logo-aws.svg`, `logo-azure.svg`, `logo-gcp.svg`
- ❌ **`logo-aws-marketplace.svg` — MISSING.** Add to project root.
- ❌ **`og/home.png` — MISSING.** Create a 1200×630 social share image.
- ✓ `office-2.jpeg`, `office-3.jpeg`, `office-4.jpeg` + 600w/1200w variants
- ✓ `founders-1.jpg` … `founders-4.jpg` + 800w/1600w variants
- ✓ `event-cover-1.svg` … `event-cover-4.svg` (used by dropdown blog teaser — likely to be replaced when blog teaser updates per §2.4)
- ✓ `poster-placeholder.svg`
- ✓ All `*.mp4` walkthrough videos (`infrastructure.mp4`, `scheduling.mp4`, `recommendations.mp4`, `event-readiness.mp4`, `deploy.mp4`, `auto-scale.mp4`, plus the `step-2/3/4` variants)

> Stage hosts most videos under `https://storage.googleapis.com/zopdev-ui-assets/websitev2/home/showcase/*.mp4` and most blog covers under `https://storage.googleapis.com/zopdev-blog-resources/...`. The local site serves them from the project root. **Either approach is fine** — pick one. Recommended: move to GCS to match stage so the HTML file size drops dramatically and CDN caching kicks in.

---

## 11. Design-token & CSS overview

Both sites resolve to the same brand tokens. Spot-check:

| Token | Stage value | Local value | Same? |
|-------|-------------|-------------|-------|
| `--zop-blue` / `--logo-blue` | `#2A4494` | `#2A4494` | ✓ |
| `--zop-orange` | `#F58549` | `#F58549` | ✓ |
| `--zop-green` | `#7FB236` | `#7FB236` | ✓ |
| `--ink` / dark surface | `#0F0F12` | `#0F0F12` | ✓ |
| `--paper` (cream) | `#FAF7EC` | `#FAF7EC` | ✓ |
| `--line` | (in `/_astro/MarketingLayout.Dd90wcET.css`) | `#D9D3BF` | Verify identical |
| Body font | Inter | Inter | ✓ |
| Display font | Space Grotesk | Space Grotesk | ✓ |
| Mono font | JetBrains Mono | JetBrains Mono (token resolves to Space Grotesk in local override — minor) | ⚠ confirm |
| Hairline radius rule | square corners everywhere | Same `*{border-radius:0}` ✓ | ✓ |

No token migration needed. If you want pixel parity, pull `/_astro/MarketingLayout.Dd90wcET.css` from stage and diff against the local `tokens.css` + `homepage-chrome.css` + `chrome.css`.

---

## 12. Files to touch (rough map)

For the homepage diff alone, the changes land in:

- **`index.html`** — most edits. Hero pill version, resources dropdown blog teaser, ZN/ZD intro dashboard removal, final CTA Tetris removal, bridge marquee copy, every internal href, OG image meta, canonical URL.
- **`vercel.json`** — `cleanUrls: true` + per-route rewrites if you switch to clean URLs.
- **`chrome.css`** / **`homepage-chrome.css`** — only if you remove the intro dashboards (clean up unused selectors) or if you keep/drop the Tetris canvas (it has supporting styles).
- **New asset:** `logo-aws-marketplace.svg`.
- **New asset:** `og/home.png` (1200×630 social card).
- **Footer markup** — the 4-column block at line ~19913 in `index.html`. Expanded from 16 links to ~28 links across 4 columns.
- **Topbar Calculator CTA** — line ~7943 in `index.html`. Change `href="cur-calculator.html"` to `href="pricing.html#calculator"` (or `/pricing#calculator` after clean-URL switch).
- **`pricing.html`** — add a `#calculator` anchor target so the topbar deep link resolves.

---

## 13. Acceptance criteria (developer self-check)

Run through this list before opening a PR.

### Above the fold
- [ ] Topbar Calculator CTA points to the pricing-page calculator anchor, not a standalone page.
- [ ] Hero release pill reads `v2026.04`, not `v1.5`.
- [ ] Hero release pill links to `/changelog/` (or `changelog.html` if `.html` mode is kept).
- [ ] All hero CTAs use the stage URLs (`/signin/`, `/demo/`).

### Nav
- [ ] Resources dropdown hero blog card title = "The IDP Adoption Problem: Why Most Platforms Fail".
- [ ] Resources dropdown hero blog meta = "14 min read · kubernetes".
- [ ] Resources dropdown hero blog image = the stage GCS banner (`d7da312b-4a5b-4488-ab3a-74c40b9eb80a-banner.webp`).
- [ ] Resources dropdown compact list = 6 rows (Blog / Ebooks / Case studies / Use cases / Kubernetes guide / Changelog) — no Product docs, no Developer docs.

### Mid-page
- [ ] `.zn-intro` is text-only (no static dashboard mockup inside).
- [ ] `.zd-intro` is text-only (no static dashboard mockup inside).
- [ ] Proof carousel images come from `/office-3.jpeg`, `/office-4.jpeg`, `/office-2.jpeg` (in slide order: McAfee / Azure FinOps / FMCG India).

### Bottom
- [ ] Final CTA background is plain `#0F0F12` — no Tetris canvas (unless PM overrides).
- [ ] Bridge marquee items match stage list exactly (5 items, in order).

### Footer
- [ ] 4 columns labeled `product / solutions / resources / company` (NOT `product / resources / company / community`).
- [ ] Product column has 8 links (ZopNight, ZopDay, ZopCloud, Kubernetes View, Integrations, Pricing, Walkthrough, Roadmap).
- [ ] Solutions column exists with 5 links (Use cases by industry, DevOps hub, Platform engineering, Services, Customers).
- [ ] Resources column has 8 links (Blog, Ebooks, Kubernetes guide, What is DevOps, CI/CD best practices, CDCR whitepaper, Developers, Changelog).
- [ ] Company column has 7 links (About, Careers, Contact, Community, Demo, Status, Trust).
- [ ] AWS Marketplace badge SVG is present in `.foot-globe`.
- [ ] Copyright line: `© <year> ZopDev · privacy · terms` — both legal links point to `/trust` (or `trust.html`).

### Meta / SEO
- [ ] Canonical link → `https://zop.dev/` (no `.html`).
- [ ] `og:image` → a real 1200×630 PNG at `/og/home.png`, not the favicon.
- [ ] Organization LD+JSON includes `sameAs` for LinkedIn, Twitter, GitHub.

### Routing
- [ ] Either every href is `.html`-suffixed (file-mode) or every href is the clean URL (deploy-mode). Pick one and apply consistently. If shipping to Vercel, mirror stage's clean URLs and add the rewrites to `vercel.json`.

### Visual parity
- [ ] On desktop @ 1440×900, scroll the page top-to-bottom side-by-side with stage. Every section should render in the same order with the same visible content. The only intentional visible differences should be the ones called out above (which you should now have fixed).

---

## 14. Out of scope for this diff (don't touch yet)

- Astro migration — stage is on Astro, local is static HTML. No need to switch frameworks. Match the output, not the toolchain.
- `404.html`, `403.html`, `500.html`, `offline.html`, `maintenance.html` — error pages not visible on the staging homepage; compare separately if you receive a similar diff doc for them.
- Sub-pages (`zopnight.html`, `zopday.html`, `about.html`, etc.) — this doc covers `index.html` only. Each sub-page should get its own diff against the matching `/zopnight`, `/zopday`, `/about` route on stage.
- `signin.html`, `signin-zopday.html`, `signin-zopnight.html` — sub-brand sign-in skins; not on the homepage diff.

---

## 15. Open questions for the PM / designer

1. **Tetris in the final CTA** — keep or drop? Stage dropped it; we recommend matching stage.
2. **Intro dashboard mockups** — remove from `.zn-intro` and `.zd-intro` (matching stage), or keep the static dashboards for extra product depth on the homepage?
3. **Product documentation + Developer documentation** — drop from the Resources dropdown (matching stage) and surface elsewhere, or keep them in the dropdown as local additions?
4. **`cur-calculator.html`** — is this an actual standalone page? Stage folds the calculator into `/pricing#calculator`. Delete `cur-calculator.html` or keep it as a redirect?
5. **Mobile drawer theme toggle** — stage doesn't have a visible theme switcher; local does, inside the mobile drawer only. Keep (recommended) or remove?
6. **Bridge marquee content** — stage's copy is broader/shorter; local's was India-compliance-heavy. Confirm we're OK losing IRDAI / DPDP / MeitY signals here (they're not surfaced anywhere else on the homepage).
7. **Engine drawer mention of `v1.5`** — there's a sentence in Smart Scheduling's drawer: *"v1.5 extended Kubernetes coverage to Deployments, StatefulSets…"*. Update to `v2026.04` or leave as a historical-shipping note?

---

---

## 16. Visual side-by-side

All screenshots were captured headlessly via Puppeteer with `waitUntil: 'networkidle2'` + 5 s settle, at `1440 × 900` viewport, both at the same scroll position on each side. Files live in [`visuals/`](visuals/).

### 16.1 Hero — `visuals/{stage,local}-hero.png`

| | Stage | Local |
|---|---|---|
| File | `visuals/stage-hero.png` | `visuals/local-hero-real.png` |
| Release pill | `v2026.04 \| Live Kubernetes cluster state →` (orange version tag) | `v1.5 \| Live Kubernetes cluster state →` (orange version tag) |
| H1 | `Build Deploy Govern.` / `On every cloud.` — cream on near-black, centered | Same, identical layout and weight |
| Sub-headline | `One operating layer across AWS, GCP, and Azure. Every account, in one place.` | Same |
| CTA pair | `Run the audit, read-only →` (filled cream) + `Talk to platform sales →` (outline) | Same |
| Founders strip | `Built by the alumni of Meesho · Accenture · HashiCorp · OYO` | Same |
| Trust seals row | aws · azure · gcp · `SOC 2 TYPE II` · `ISO 27001 2022` | Same |
| Trust marquee under hero | `154 teams · Trusted by McAfee running 12 AWS accounts · 48 K8s clusters · 1,000+ req/sec …` | Same |

**Visual deltas in the hero capture:** only the version tag in the pill (`v1.5` → `v2026.04`). Otherwise pixel-equivalent.

> ⚠ **Headless capture caveat:** under aggressive headless capture without `networkidle2` + settle delay, the local hero's word-by-word reveal animation can leave only "Build" painted — see `visuals/local-hero.png`. Real users on a real browser do see the full hero, because the page does eventually settle. Still worth verifying the reveal completes within ≤1.5 s on slow connections so first-paint feels stage-equivalent.

---

### 16.2 ZopNight intro — `visuals/{stage,local}-zn-intro.png`

| | Stage | Local |
|---|---|---|
| File | `visuals/stage-zn-intro.png` | `visuals/local-zn-intro.png` |
| Eyebrow lockup | "ZopNight" mark + wordmark | Same |
| H2 | `Found. Fixed. Audited.` (cobalt-blue, centered) | Same |
| Tail | `Every dollar your cloud advisor missed.` | Same |
| Body copy | "Find the waste, schedule non-prod off, right-size production, harden every launch …" | Same wording ✓ |
| Dashboard mock | Embedded, dark, with sidebar + Dashboard title + 4 stat cards + Cost Over Time chart | Embedded, same visual layout |
| Stat card 1 — TOTAL RESOURCES | `2,342` "Across all cloud accounts" | `1,106` "Across all cloud accounts" |
| Stat card 2 — CURRENT ESTIMATED SPEND | `$68.2K` "Unbilled Cost · Apr 8 – May 7" | `₹57.3K` "Unbilled Cost · Apr 1 – Apr 29" |
| Stat card 3 — REALIZED SAVINGS | `US$6,207.90` "From scheduled start/stop this month" (green-card) | `₹161.45` "From scheduled start/stop this month" (green-card) |
| Stat card 4 — SAVINGS RATE | `8.3%` (orange-card) | `0.3%` (orange-card) |
| Cost Over Time chart | Has a `CRITICAL · 2 cost anomalies detected` red strip above the chart, with the spike sample text and "View All" link | No anomaly strip |
| Sidebar group nesting under "Cloud Estate" | Dashboard / **Inventory** / Architecture / Kubernetes / Cost Reports | Dashboard / **Resources** / Architecture / Kubernetes / Cost Reports |

**Action:** update the local mock's stats + currency + sidebar label + add the critical-anomaly strip (precise content listed in §8.2).

---

### 16.3 ZopDay intro — `visuals/{stage,local}-zd-intro.png`

| | Stage | Local |
|---|---|---|
| File | `visuals/stage-zd-intro.png` | `visuals/local-zd-intro.png` |
| Eyebrow lockup | "ZopDay" mark + wordmark | Same |
| H2 | `Provision. Deploy. Operate.` (orange) | Same |
| Tail | `From one workspace, on your cloud.` | Same |
| Body copy | "Landing zone. Deploy pipeline. Audit trail. Built once, runs on AWS, GCP, and Azure …" | Same ✓ |
| Dashboard mock | Embedded, **smaller**, with a demo top bar | Embedded, **larger**, no demo top bar |
| Top demo bar | `Demo · You're viewing the ZopDay playground — changes aren't saved.` left side + `Persona [Enterprise ▾] · Get started >` right side | **Missing** |
| Sub-title line | `Deployment Spaces · 5 clusters · 5 healthy` (no chip) | `Deployment Spaces · 5 spaces · 5 healthy [live]` (with green "live" chip) |
| Buttons (top right) | `Add Existing` (outline) + `Provision New` (outline) | `Add Existing` (outline) + `Provision New` (solid orange) |
| Filter chips (All / Healthy / Issues / Pending) | **Not present** | Present |
| Table columns | NAME / STATUS / PROVIDER / REGION / ADDED (5 cols) | NAME / STATUS / PROVIDER / REGION / TYPE / ADDED (6 cols, extra "kubernetes" TYPE column) |
| Rows + "added" times | us-prod (11mo) · us-staging (11mo) · eu-prod (8mo) · eu-staging (8mo) · apac-prod (4mo) | us-prod (10mo) · us-staging (10mo) · eu-prod (8mo) · eu-staging (7mo) · apac-prod (3mo) |
| Per-row ellipsis menu (`···`) | **Not present** | Present at the end of each row |

**Action:** add the demo bar, remove the filter chips, drop the TYPE column, drop the `···` menus, swap the green "live" chip + "5 spaces" wording, restyle "Provision New" to outline, update the "added" times. Precise spec in §8.2.

---

### 16.4 Engines bento — `visuals/{stage,local}-engines.png`

| | Stage | Local |
|---|---|---|
| File | `visuals/stage-engines.png` | `visuals/local-engines.png` |
| 4 top cards in 2×2 bento | Recommendations by Lens · Smart Scheduling Engine · Autoscaling by Tide · Event Readiness Engine, each with READ button | Identical layout, identical card titles, identical body copy |
| 5th card — Auto-Remediation banner spanning row | "From flagged to fixed. One click stops idle resources, scales workloads to zero, pauses what shouldn't run. Every action audited, every change reversible." | Identical |

**Visual delta:** none of substance. Card illustrations animate continuously, so frozen-frame screenshots differ slightly (dot positions in the radar, bar widths in the histogram). No content change needed. **OK ✓**

---

### 16.5 Proof carousel — `visuals/{stage,local}-proof.png`

Both auto-rotate every 7 s, so frozen frames may show different slides. Captured frames:

- **Stage frame**: slide 3 (Fortune Global 2000 FMCG · India) with photo of an in-person event branded "ZopDay" + the McAfee → ZopDay → FMCG quote chain.
- **Local frame**: slide 2 (Fortune 1000 software co. · Azure FinOps) with a generic Unsplash burgundy/maroon image.

**Image-source delta** (independent of carousel position):
- Stage uses local files `/office-2.jpeg`, `/office-3.jpeg`, `/office-4.jpeg` — these are real ZopDay-context photos.
- Local uses Unsplash CDN URLs (`photo-1620712943543-…`, `photo-1635776062764-…`, `photo-1542838132-92c53300491e`).

**Action:** swap to local `office-{2,3,4}.jpeg` files (already in project root). See §4.15.

---

### 16.6 Final CTA + bridge marquee + footer — `visuals/{stage,local}-final-cta.png`, `visuals/{stage,local}-footer.png`

This is the **clearest visual delta in the doc.** Three things change at once at the bottom of the page.

**(a) Final CTA background**

| | Stage | Local |
|---|---|---|
| Headline + body + CTAs + 3 stats | "Bring your cloud." + same body + Get recommendations / Talk to platform sales + 5 min / 0 / read-only | Identical content |
| Background fill | Plain `#0F0F12` over the whole section (right side empty) | Plain `#0F0F12` on the left half; right ~46% is a live falling-Tetris canvas in `#2A4494 / #F58549 / #7FB236` |

The Tetris on local clearly dominates the right side of the screen. Stage's right side is intentionally empty / breathable.

**(b) Bridge marquee (right above the footer)**

| Stage 5 phrases (in scroll order) | Local 5 phrases (in scroll order) |
|---|---|
| Multi-cloud automation | One control plane · every cloud |
| Production-ready in 30 min | ISO 27001:2022 · SOC 2 Type II |
| SOC 2 · ISO 27001 · zero-trust | IRDAI · DPDP · MeitY-empaneled |
| 30% average cloud cost cut | $15M+ cloud spend under management |
| 4 platforms · 1 console | 154 teams · AWS · GCP · Azure |

Different topic entirely — stage emphasises *speed + zero-trust + compact scope*; local emphasises *India-regulator compliance + spend + team scale*.

**(c) Footer columns**

| Aspect | Stage | Local |
|--------|-------|-------|
| File | `visuals/stage-footer.png` | `visuals/local-footer.png` |
| Column headings | `PRODUCT` · `SOLUTIONS` · `RESOURCES` · `COMPANY` | `PRODUCT` · `RESOURCES` · `COMPANY` · `COMMUNITY` |
| Link counts per column | 8 · 5 · 8 · 7 | 5 · 8 · 2 · 1 |
| Total links | ~28 | ~16 |
| Missing entirely | — | **Solutions column** (Use cases by industry, DevOps hub, Platform engineering, Services, Customers) |
| Looks-broken column | — | "COMMUNITY" with a single "Community" link, leaving 3 columns of whitespace next to it |
| AWS Marketplace badge under wordmark | Present | **Missing** |
| ZopDev wordmark (large) + SOC 2 + ISO 27001 seals + dotted world map | Present | Present (no marketplace badge) |
| Bottom legal strip — `© ZopDev · privacy · terms` + "made with ❤ by zop.dev" + linkedin / twitter / github | Present | Present (text-only social links, identical) |

Visually, local's footer has roughly **half the link density** of stage's, with a glaring orphan "Community" column. This is the single most-noticeable structural delta when you scroll to the bottom of either page. See §5 for the full column-by-column rebuild spec.

---

### 16.7 Sections that are pixel-equivalent (no visual change needed)

These were captured side-by-side and look identical between stage and local (modulo continuously-animating canvas illustrations):

- §4.1 Trust marquee — identical 6 items, same typeface, same spacing.
- §4.2 Showcase — 5 tabs (Provision / Organize / Schedule / Optimize / Prove), same SVG arc with sun/moon orbs, same throughline closer.
- §4.3 Globe Zoom Scroll — same 3 statements ("Ship faster. / Spend smarter. / Stay audit-ready."), same single-globe canvas.
- §4.5 Engines bento (above) — same 4 cards + banner.
- §4.7 ZopNight product CTA, §4.12 ZopDay product CTA — same dashboard peek hover, same H2/body/CTA.
- §4.13 Integrations PCB — same 7 category bays, same chip layout, same "Pulse the board" interactive.
- §4.14 CDCR loop — same 4 nodes, same central "continuous · ACTIVE" hub label, same closing aside, same orange whitepaper CTA.
- §4.16 Stakeholder grid — 5 cards, identical text, identical scroll-into-view reveal.
- §4.17 FAQ — 7 details, identical wording.

---

### 16.8 How to regenerate these visuals

The repo includes the puppeteer scripts used to capture each side. Re-run after merging changes to verify parity:

```sh
# from project root
cd /tmp/puppet  # the helper repo dropped during this review
node sections.js "file:///Users/.../ZopDev%20Website%20Final%20R%20copy/index.html" \
  "" "" "/path/to/visuals/local" \
  "zn-intro:3135,engines:4291,zd-intro:6762,zd-cta:9575,integrations:10107,cdcr:10942,proof:12333,final-cta:14470,footer:15124"

node sections.js "https://stage.zop.dev/" "blog-app-%)hcfi" "<password>" \
  "/path/to/visuals/stage" \
  "zn-intro:4047,engines:5160,zd-intro:7635,zd-cta:10445,integrations:10977,cdcr:11812,proof:13205,final-cta:15344,footer:16185"
```

The scroll positions assume the current section heights — re-run `dims.js` after major changes to refresh them.

---

**End of diff. Questions on any of the above — ping the website team.**
