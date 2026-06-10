# ZopDev · Transactional emails · handover bundle

Self-contained handover for the 9 PM-approved transactional emails. Zip this folder, send to the dev, they have everything needed to wire up the transactional pipeline.

---

## What's in here

```
zopdev-emails-handover/
├── README.md                       ← you are here
├── email-showcase.html             ← 9-slide carousel (visual review)
├── email-template.html             ← reusable skeleton (for adding a 10th email later)
├── emails/                         ← the 9 production-ready HTML files
│   ├── index.html                    9-card browser, opens any of the 9
│   ├── 01-new-blog-post.html         single-post blog drop
│   ├── 02-weekly-digest.html         Sunday roundup
│   ├── 03-contact-received.html      form-submission ack
│   ├── 04-welcome.html               subscriber welcome
│   ├── 05-demo-booked.html           demo confirmation + KV context
│   ├── 06-zopcloud-waitlist.html     pre-launch + alternatives
│   ├── 07-changelog.html             changelog subscription confirm
│   ├── 08-ebook-ready.html           ebook download delivery
│   └── 09-reclaim-forecast.html      ZopNight calculator output
└── logo-png-export/                ← source logo PNGs (2876×1120, 124 KB)
    ├── zopdev-logo-black.png
    └── zopdev-logo-white.png
```

---

## How to use this

### To view the emails

Open `emails/index.html` in a browser — it lists all 9 with their subject lines and opens any of them. The base64 logo is embedded in each file so they render without a server or asset host.

For visual stakeholder review, open `email-showcase.html` — it's a carousel of all 9 with arrow-key navigation.

### To ship the emails

For each use case the user signs up for, you have one self-contained HTML file. Drop it into your transactional service:

| Service     | Merge-field syntax                   | Action                                          |
|-------------|--------------------------------------|-------------------------------------------------|
| SendGrid    | `{{first_name}}` (Handlebars-compat) | Paste body as-is, leave `{{vars}}` as-is        |
| Postmark    | `{{first_name}}` (Mustachio)         | Paste body as-is, leave `{{vars}}` as-is        |
| Resend      | `{{first_name}}` (Liquid via JSX)    | Paste body as-is, leave `{{vars}}` as-is        |
| Mailgun     | `%recipient.first_name%`             | Find-replace `{{var}}` → `%recipient.var%`      |
| AWS SES     | `{{first_name}}` (Mustache)          | Paste body as-is                                |
| Customer.io | `{{customer.first_name}}`            | Find-replace `{{var}}` → `{{customer.var}}`     |

The **subject line** and **preheader** are pinned to the comment at the top of each file — copy those into the corresponding service fields.

The **plain-text companion** is in an HTML comment at the bottom of each file — copy that into the text body field. Most services auto-generate plain-text from the HTML, but the hand-authored version handles smartwatch previews and deliverability better.

---

## Per-file engineering

Each of the 9 production files is engineered for cross-client delivery:

- **Table-based layout** — Outlook 2007–19 use Word's HTML rendering engine; flexbox and grid don't render. Classic `<table>` nesting is the safe path.
- **All styles inline** — Gmail and Outlook strip `<style>` blocks (or only honor a subset). Inline survives.
- **Max-width 600 px** — industry standard, fits Gmail's reading pane.
- **MSO conditional VML buttons** — every CTA has a `<v:roundrect>` fallback wrapped in `<!--[if mso]>...<![endif]-->` for Outlook desktop button fidelity. The non-MSO branch is the modern HTML/CSS button for everywhere else.
- **Dark mode** — applied via `@media (prefers-color-scheme: dark)` for Apple Mail / iOS Mail / Outlook.com modern, **plus** `[data-ogsc]` attribute fallback for legacy Outlook.com. Gmail web is partially supported.
- **Base64-embedded logo** — each file is ~60 KB total (~29 KB of base64 logo + ~3 KB of unique body markup). No asset hosting needed.
- **Square corners only** — matches the ZopDev brand. No `border-radius`.
- **System font stack** — `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, ...` — web fonts don't render in Outlook / Yahoo / iOS Mail without `@font-face` declarations + image fallbacks. The system stack lands close to Inter on every client.

---

## Logo strategy

The logo is **base64-embedded** in each file (`data:image/png;base64,...`) so the file is self-contained. No asset hosting needed.

**If Outlook desktop matters** (~5% of B2B traffic strips data URIs), swap the two `data:image/png;base64,...` strings in each file for absolute CDN URLs:

- Black logo (light-mode): `https://your-cdn.zop.dev/zopdev-logo-black.png`
- White logo (dark-mode):  `https://your-cdn.zop.dev/zopdev-logo-white.png`

The source PNGs ship in `logo-png-export/` (2876 × 1120, ~120 KB each) — host these on your CDN or static asset bucket.

---

## The 9 emails — copy + merge-field reference

### 01 · New blog post
- **Subject:** `New on the ZopDev blog: {{post_title}}`
- **Preheader:** `{{post_excerpt_short}} — {{read_time}} min read.`
- **Merge fields:** `post_title`, `post_slug`, `category`, `read_time`, `publish_date`, `post_excerpt`, `recipient_email`

### 02 · Weekly digest
- **Subject:** `This week on ZopDev — {{week_label}}`
- **Preheader:** `Engineering and FinOps notes shipped this week. Skim it; skip what isn't relevant.`
- **Merge fields:** `first_name`, `week_label`, `recipient_email` · **dynamic items:** the BLOG / EBOOK rows are hard-coded; for production you'll likely templatize this as a loop over an `items[]` array of `{type, title, blurb, url}`

### 03 · Contact received
- **Subject:** `We've received your message — ZopDev`
- **Preheader:** `Confirmed. A specialist will respond within one business day.`
- **Merge fields:** `first_name`, `topic`, `message_text`

### 04 · Welcome
- **Subject:** `Welcome to ZopDev`
- **Preheader:** `One technical email a week, Sundays. Engineering and FinOps writing worth your inbox.`
- **Merge fields:** `first_name`, `source`, `recipient_email`

### 05 · Demo booked
- **Subject:** `You're on the calendar — ZopDev`
- **Preheader:** `A solutions engineer will reach out within 24 hours with timezone-matched slots.`
- **Merge fields:** `first_name`, `company`, `role`, `cloud`, `spend`, `team_size`, `focus`

### 06 · ZopCloud waitlist
- **Subject:** `You're on the ZopCloud waitlist`
- **Preheader:** `One email when ZopCloud ships. No drip. No "behind the scenes."`
- **Merge fields:** `recipient_email` (only for the unsubscribe link)

### 07 · Changelog
- **Subject:** `You're subscribed to the ZopDev changelog`
- **Preheader:** `Every release, every two weeks, written by the engineers who shipped it.`
- **Merge fields:** `recipient_email` (only for the unsubscribe link)

### 08 · Ebook ready
- **Subject:** `Your copy of {{ebook_title}}`
- **Preheader:** `Open it whenever you're ready. The link doesn't expire.`
- **Merge fields:** `first_name`, `ebook_title`, `ebook_url`

### 09 · ZopNight Reclaim Forecast
- **Subject:** `Your ZopNight Reclaim Forecast`
- **Preheader:** `Forecastable reclaim from enforcing scheduling policy on non-production resources — based on your workload profile.`
- **Merge fields:** `first_name`, `provider`, `monthly_reclaim`, `quarterly_reclaim`, `annual_reclaim` · **note:** the stat values in the file (`$4.8k / $14.5k / $57.8k`) are sample values from the PM doc — for production, replace these with `{{monthly_reclaim}}` / `{{quarterly_reclaim}}` / `{{annual_reclaim}}` so they're calculated per-recipient from the calculator inputs

---

## Brand tokens

For reference if you need to tweak anything:

| Token        | Light value | Dark value  | Use                                 |
|--------------|-------------|-------------|-------------------------------------|
| paper (bg)   | `#FAF7EC`   | `#0F0F12`   | wrap background                     |
| card         | `#FAF7EC`   | `#15151B`   | email-card background               |
| line         | `#D9D3BF`   | `#2A2A30`   | dividers, borders                   |
| ink          | `#0A0A0A`   | `#F0EBDB`   | headlines, primary text             |
| ink-2        | `#525252`   | `#C8C2B0`   | body copy                           |
| ink-3        | `#9C9588`   | `#8E8878`   | meta, secondary                     |
| ink-4        | `#B8B0A0`   | `#6A6458`   | small print, footnotes              |
| orange       | `#F58549`   | `#F58549`   | eyebrow dot, accents, link hover    |
| paper-2      | `#F0EBDB`   | `#1B1B22`   | callout backgrounds                 |

---

## Questions

- **Why is each file 60 KB?** ~58 KB of that is the embedded base64 logo. ~2 KB is the unique body markup per email. If you swap the logo to a CDN URL, each file drops to ~3 KB.
- **Why are subject + preheader in HTML comments instead of `<head>`?** They're sent via the ESP's API (SendGrid `subject` field, Postmark `Subject` header, etc.) — they don't go inside the HTML. The comment is the canonical reference for you to copy into the right service field.
- **What happens in dark mode on Gmail web?** Partial. Gmail web honors `@media (prefers-color-scheme: dark)` for color inversions in some places but not all. Apple Mail, iOS Mail, and Outlook.com are fully dark-mode-aware via these files.
- **Will the MSO VML button break anything in non-Outlook clients?** No. It's wrapped in `<!--[if mso]>...<![endif]-->` so anything except Outlook desktop strips it as a comment. The modern HTML button is in the `<!--[if !mso]><!-->...<!--<![endif]-->` block, which Outlook ignores but every other client renders.

---

**Copy from the PM-approved "ZopDev Transactional Emails — Revamped Copy" doc.** Engineering and brand chrome by ZopDev design.
