# SecondBrain Design System

The design language of **SecondBrain — AI sales intelligence**: a rep-facing web tool for a
distributor's field sales team. It reads a company's order history, tickets, contracts and
quotes and tells a rep who to call this morning and what to say. The visual direction is
named **SecondBrain Fluid** — Archivo type on a soft, rounded, layered shell, everything
floating on a cool-grey two-lamp ground. Nothing is boxy; nothing is decorated.

## Where this came from

Everything here was read out of one source: a Claude Design handoff bundle mounted as a
local folder.

| Source | Path |
| --- | --- |
| Handoff bundle root | `Sales tool second brain UI-handoff Updated/sales-tool-second-brain-ui/` |
| Primary reference build | `project/SecondBrain Fluid.dc.html` (1,930 lines — the desktop app, 10 screens) |
| Mobile reference build | `project/SecondBrain Mobile.dc.html` (iPhone 17 402×874, Android 412×892) |
| Written style sheet | `project/secondbrain-fluid.md` — palette, type scale, radii, shadows, motion, component recipes |
| Style-sheet screen | `project/SecondBrain Fluid Style Sheet.dc.html` |
| Earlier direction studies | `project/SecondBrain Redesign.dc.html` (includes a recreation of the *live, pre-redesign* app), `project/SecondBrain Prototype.dc.html` |
| Brand mark | `project/assets/skynet-logo.svg`, `skynet-logo_v3.png` |
| Bound design system in the source project | `project/_ds/modernist-…/` — a generic "Modernist" kit (bone ground, red accent, zero radius) |

No Figma file, no repository, no slide deck was provided.

Two notes on provenance, so nobody is misled later:

- **The logo files in the bundle are named `skynet-logo`.** They are used in the source as
  SecondBrain's product mark (a brain-as-network glyph). They are copied here verbatim as
  `assets/secondbrain-logo.svg` / `.png` and renamed only for clarity — nothing was drawn,
  redrawn or reconstructed. The vendor company behind the mark is not named anywhere in the
  bundle, so this system does not claim one.
- **The bound "Modernist" kit is not this system.** The source project's `CLAUDE.md` is
  explicit: *"The sales tool's visual direction is SecondBrain Fluid."* Modernist supplied
  Archivo and a couple of hex values (`#ec3013`, `#ae1800`, `#201e1d`) that survive into the
  Fluid palette as the problem-red family; everything else — the ground, the blues, the
  radii, the shadows — is Fluid and overrides Modernist. Where they conflict, Fluid wins.

## The product

One product, two surfaces.

**SecondBrain (desktop web)** — a 224px dark sidebar plus a scrolling main column, ten
screens:

| Screen | What it is |
| --- | --- |
| Daily Brief | The home screen. Hero statement, a five-account focus queue, one expanded account card with an AI call opener, the rest of the book, and a dark "morning brief" rail. |
| My Accounts | The book of business as a 183-row table with compact/comfortable density. |
| Reminders | Triggered and manual follow-ups, grouped overdue / today / this week. |
| Master Catalog | Every item sold across every customer; status-bordered rows, item detail modal. |
| Reports | KPI strip, monthly revenue trend line, revenue mix, rep scorecard, pipeline, renewals. |
| Commissions | Month → order → line-item drill-down, rate card, splits, clawbacks, payouts. |
| Manager View | Fleet oversight for 6 reps / 1,104 accounts plus a live activity rail. |
| PE Reference | Price-exception bundles, active vs expired. |
| Our Roadmap | Shipped / next / later, with validation notes. |
| Settings | Sync sources, sync logs, audits. |

**SecondBrain (mobile web)** — the same palette, ink, status meaning and keyframes at
390–412pt. The sidebar becomes a five-item floating tab bar, tables become stacked status
cards, modals become bottom sheets, and the 42-second ticker marquee becomes one item plus
a `+N` count. iOS and Android differ only in chrome, spacing and press feedback.

---

## Content fundamentals

The copy is the product. SecondBrain's whole pitch is that it *talks to the rep* instead of
handing them a dashboard, and the writing carries that.

**Voice: a colleague who read the data before you got in.** Declarative, specific,
consequence-first. Never a feature description.

> Five calls stand between you and **$616,000**.

> Five accounts are worth your morning. Farm Boy alone accounts for $545K of the $616K
> you're at risk of losing this year — and nobody has called them since April.

**Second person, always.** *You*, *your morning*, *your book*, *your rate card*. The system
never says "I" and never anthropomorphises itself in first person; when it needs to refer to
itself it is "the brain" — lowercase, matter-of-fact: *"Upsell the brain spotted"*,
*"the five the brain picked this morning"*, *"Ask the brain — 'who should I call about Store
Dynamics renewals?'"*.

**Numbers are the headline, not the footnote.** A number with its consequence attached
beats a label. `$544,656` sits next to `Revenue down 98% YoY`, never alone. Money is
whole-dollar and comma-grouped (`$199,431`), abbreviated to `$K` only when space demands
(`$544K`, `$84,200 at stake`). Recency is a countdown, not a date: `420d ago`,
`391d overdue`, `dormant 18+ months`.

**Headings are statements or plain nouns.** Section heads are bare and unhedged: *The
queue*, *The rest of the book*, *Why this account, today*, *Ask before you hang up*,
*Watch out*, *Who needs coaching*, *Expenses — tracked, not deducted*. Page titles are the
noun of the thing: *My Accounts*, *Reminders*, *Master Catalog*, *Commissions*.

**Kickers carry the scope.** Every page title sits under a 10px uppercase kicker that says
what you're looking at and how much of it: *"Book of business"*, *"Fleet oversight · 6 reps
· 1,104 accounts"*, *"Commissions · paid on gross margin (retail − cost)"*, *"Every item
sold, across every customer"*. The middot is the separator of choice throughout —
`B34181 · Grocery · 63 sites`, `time · text`.

**Casing.** Sentence case for everything readable. UPPERCASE only in the 9.5–10px
letterspaced label class (`REVENUE AT RISK`, `UP NEXT`, `SCORE 5`) and in status words
(`APPROVED`, `PENDING`). Account names come through from the source system in their own
casing, including all-caps (`PATTISON FOOD GROUP LTD`) — they are data, not copy, and are
never re-cased.

**Buttons are verbs, two or three words.** *Log call*, *Brief me*, *Build the quote*,
*Take action →*, *Post to payroll*, *Add reminder*, *Dismiss*, *Skip 3 days →*. A forward
arrow (`→`) trails an action that moves you somewhere; it is never decorative.

**AI-written copy is quoted and shown as a draft, never as a fact.** The call opener is a
real sentence a rep could say out loud, in quotation marks, in the account's own detail:

> "Hi Dave — the Alderwood and Rideau stores have gone quiet since April while six tickets
> sit open on the Trainyards lanes. Is the rollout stalled?"

**Empty and edge states argue a point.** *"No healthy accounts in your book — every account
has either dropped off in revenue, gone 60+ days without contact, or has open tickets.
Start with the five the brain picked this morning."* An unbuilt area says so plainly:
*"This section is wired in the build but not part of the fluid pass yet."*

**No emoji. Anywhere.** Not in labels, not in status, not in empty states. The only
non-alphanumeric glyphs in the copy are `→`, `·`, `▾`, `+N`, `−` and `%`.

**No exclamation marks, no hedging, no metadiscourse.** Nothing is "seamless", "powerful"
or "intelligent". The system never says "here's why this matters" — it says the thing and
lets the number carry it.

---

## Visual foundations

### Ground
The page is never white. It is a two-lamp radial gradient on cool grey — a cool blue lamp
top-right, a green-grey lamp mid-left, `#eef1f5` underneath:

```
radial-gradient(1100px 700px at 88% -8%, #dbe7f2 0%, rgba(219,231,242,0) 62%),
radial-gradient(900px 600px at -6% 12%, #e7eef0 0%, rgba(231,238,240,0) 60%),
#eef1f5
```

Everything sits on it as a detached, rounded panel. Outer page padding is 14px; the main
column is offset 14px from the sidebar. There is no page-width container and no centred
column — the shell fills the viewport and the sidebar is sticky at `top:14px`.

### Colour
Ink runs from `#1b1f24` (body) down a nine-step grey to `#8b95a1` (labels). Dark panels are
`#20262e`. Surfaces are pure white; insets inside a card are `#f4f7fa`; row hover is
`#f2f6fa`; hairlines are `#e3e7ec`.

The working palette is **blues, rotated**: slate deep `#22496a` → slate `#33648b` → slate
light `#4d84b8` → teal-blue `#2f7d8f`, with sky `#6fa3cf` for bar gradients and sky-bright
`#8fc9ff` for accents on dark. Never use one blue for a whole column of numbers — walk down
the rotation (`--value-1` … `--value-4`).

**Status colour means something.** Red `#ec3013` / text `#ae1800` for problems only —
revenue at risk, churn, overdue, health under 35, ticket overflow, sync failure, contract
expiring. Never for a neutral fact. Green `#22c55e` / `#159548` for healthy and active.
Orange `#f97316` / `#d95f06` for stale and expired. Blue for everything neutral. On dark
panels the same three read as `#9ee6b4`, `#8fc9ff`, `#ff8a70`.

Gradients are used exactly three ways and no others: the primary
`linear-gradient(135deg,#33648b,#22496a)` on primary buttons, active nav pills and the AI
opener; the dark-panel `linear-gradient(168deg,#20262e,#171c22)`; and horizontal bar fills
(`linear-gradient(90deg,#6fa3cf,#2a5578)`). One headline uses the primary gradient as
clipped text on a single dollar figure. There are no purple gradients, no rainbow fills, no
gradient borders.

### Type
Archivo, weights 400 / 700 / 800, and nothing else. 800 carries every heading and every
number; 700 carries row titles and button labels; 400 is body copy only. Tracking tightens
as size grows (−.035em at 42px, −.01em at 13px) and opens up for the small-caps label class
(+.15–.2em at 9.5–10px). Monospace (`ui-monospace`) appears only on IDs, part numbers and
quote numbers. Nothing goes below 10px.

### Backgrounds and imagery
There are **no photographs, no illustrations, no textures, no grain and no repeating
patterns** anywhere in the source. Depth comes from three things only: the two-lamp ground,
the shadow system, and one ambient trick — a soft `rgba(111,163,207,.34)` radial glow that
slowly drifts behind dark panels and inside the hero card (`fl-drift`, 14–18s). Charts are
inline SVG line/area plots in the palette blues, no chart library look.

### Shape
No square corners anywhere. Page panels, modals and the hero are 26–28px. Cards, rows and
inset blocks are 16–22px. Chips, pills, buttons, bars, dots, progress tracks and avatars are
`999px` and clipped with `overflow:hidden`. Mobile steps down: panels 22–24px on iOS, 16–20px
on Android; cards 14–20px; pills stay 999px.

### Elevation
Shadows are wide, soft and very low opacity with a big negative spread, so they read as
float rather than as a drop shadow — `0 22px 54px -36px rgba(27,31,36,.5)` for a card,
`0 40px 90px -40px rgba(20,25,31,.9)` for a modal, `0 12px 24px -14px rgba(34,73,106,.95)`
for a primary button (note: tinted with the button's own blue, not neutral). There are no
inner shadows and no borders-as-elevation. Cards are shadow + radius, no border; **data rows
are the exception** — white fill plus a 1px status-coloured border, no shadow at rest.

### Transparency and blur
Frosted glass is rationed: `backdrop-filter: blur(14px)` on the search bar only, `blur(6px)`
on modal and sheet scrims (`rgba(20,25,31,.5)`). Never on a row or card carrying data — it
softens the text. Translucent white (`rgba(255,255,255,.7–.82)`) is used for segmented-control
tracks, secondary panels and the de-emphasised tail of the focus queue. On dark panels,
inset blocks are `rgba(238,241,245,.06)` rising to `.12` on hover.

Edges fade with masks, not with a gradient div: the ticker content is clipped with
`mask-image: linear-gradient(90deg,transparent,#000 40px,#000 calc(100% - 40px),transparent)`.

### Motion
One easing curve for everything: `cubic-bezier(.22,1,.36,1)`, durations .25–.45s. Six named
keyframes, and no others: `fl-marquee` (42s linear ticker scroll, list duplicated for a
seamless loop), `fl-rise` (.6s, 14px up + fade — hero, modals, toast, expanding drawers),
`fl-pulse` (1.6s live dot), `fl-sheen` (5.5s light sweep across the AI opener), `fl-drift`
(14–18s ambient glow), `fl-grow` (.8–.9s `scaleX` from left — every bar on mount).

### Hover, press, focus
Cards and rows **lift**: `translateY(-3px)` for a row, `-4px` for a card, picking up a
shadow. List items and nav items **slide**: `translateX(3px)`. Buttons lift `-2px` and
deepen their shadow. Secondary buttons go white → `#eef3f8` and their border goes
`rgba(27,31,36,.12)` → `#9dbdd8`. Ghost buttons go `#8b95a1` → `#2c353f`. Table rows tint to
`#f2f6fa`. The modal close button rotates 90°. Focus on an input: border → `#33648b`,
background → white.

Mobile replaces all of it. There is no hover. iOS presses are `scale(.985)` on a card,
`scale(.94)` on an icon button, plus an `#eef3f8` tint. Android uses a
`rgba(51,100,139,.12–.14)` ripple tint and no transform at all.

### Layout rules
Flex and grid with `gap` — never margins between siblings. Rows are individual elements
8–9px apart; they never share a table border. Table header strips sit on `#f4f7fa` inside
the card. The sidebar and the right rail are `position:sticky; top:14px` with
`max-height: calc(100vh - 28px)`. Data tables are explicit `grid-template-columns` in px,
repeated identically on the header strip and the row so they line up.

### Density
This is a dense professional tool, and it does not apologise for it. Body copy is 12.5–13px;
a 1440px-wide Daily Brief carries a hero, five queue rows, a six-row table and a full rail
without scrolling twice. My Accounts offers a Compact / Comfortable toggle that changes only
row padding.

---

## Iconography

**One set, drawn as inline SVG: 24×24 viewBox, `stroke:currentColor`, `fill:none`,
`stroke-width:1.7` in the sidebar and `2` elsewhere, round caps and joins.** The paths in the
source are the Feather / Lucide set — brain-ish head for Daily Brief, four-square grid for My
Accounts, bell for Reminders, list+blocks for Master Catalog, bar-chart for Reports,
dollar-sign for Commissions, users for Manager View, file-text for PE Reference, map for
Our Roadmap, settings cog for Settings, magnifier for search, chevrons for
collapse/prev/next, X for close.

There is **no icon font, no sprite sheet and no PNG icon** in the bundle — the glyphs are
written as path data inline. This system keeps them that way in `components/core/Icon.jsx`,
which carries the exact path data lifted from the source so a consumer never has to guess.
Where a glyph the source doesn't define is needed, use
[Lucide](https://cdn.jsdelivr.net/npm/lucide-static@0.469.0/icons/) — same 24px grid, same
stroke model, so it drops in without a visual seam. *(Flagged substitution: Lucide is a
stand-in for glyphs beyond the ten navigation icons and five utility icons the source
defines. Everything actually in the source is reproduced exactly.)*

Icons are always 15–18px rendered, always `currentColor`, and always paired with a text
label except in a 34/36px round icon button. **Emoji are never used.** Unicode is used as
typography, not as iconography: `→` on actions, `·` as a separator, `▾` on a select, `+N` on
a collapsed count.

The brand mark (`assets/secondbrain-logo.svg` / `.png`) is a brain-as-network glyph. In the
Fluid direction the sidebar does **not** show it — it shows a 34px, 14px-radius gradient
square with the monogram `SB`, then "SecondBrain" at 15px/800 and the kicker "AI SALES
INTELLIGENCE" at 8.5px/.2em. The full mark is reserved for login, marketing and the legacy
shell.

---

## Intentional additions

Everything in `components/` has a counterpart in the source. Two wrappers were added for
consumers' benefit and are flagged here:

- **`Icon`** — a wrapper over the source's inline path data, so glyphs can be referenced by
  name instead of pasted. The paths themselves are copied verbatim.
- **`Stack`** is *not* provided. Layout stays hand-written flex/grid with `gap`, as in the
  source.

---

## Index

| File | What it is |
| --- | --- |
| `styles.css` | The single entry point consumers link. `@import`s only. |
| `tokens/colors.css` | Ground, ink, blues, status, gradients, semantic aliases. |
| `tokens/typography.css` | Archivo stack, sizes, tracking, leading, composed roles. |
| `tokens/spacing.css` | Page/panel/row/button padding, gaps, shell dimensions, hit targets. |
| `tokens/shape.css` | Radii — panel, card, inset, control, pill; mobile variants. |
| `tokens/elevation.css` | The six shadows and the two blurs. |
| `tokens/motion.css` | Easing, durations, lifts, and all six `fl-*` keyframes. |
| `tokens/base.css` | Thin element reset: body, headings, links, scrollbars. |
| `tokens/fonts.css` | Archivo via Google Fonts. |
| `assets/` | Brand mark (SVG + PNG). |
| `guidelines/` | Foundation specimen cards for the Design System tab. |
| `components/core/` | `Button`, `IconButton`, `Chip`, `Badge`, `SegmentedControl`, `Input`, `Icon` |
| `components/data/` | `StatCard`, `DataRow`, `ProgressBar`, `TableGrid`, `LegendPill` |
| `components/shell/` | `Sidebar`, `NavItem`, `SearchBar`, `Ticker`, `SectionHead`, `DarkPanel`, `AiOpener` |
| `components/overlay/` | `Modal`, `Toast` |
| `ui_kits/secondbrain-desktop/` | Click-through recreation: Daily Brief, My Accounts, Commissions, Master Catalog, Reports. |
| `ui_kits/secondbrain-mobile/` | iOS and Android recreations of the brief, account sheet and tab bar. |
| `SKILL.md` | Agent-skill entry point. |
| `thumbnail.html` | Homepage tile. |

## Caveats

- **Fonts ship from Google Fonts, not as binaries.** The handoff bundle contained no font
  files; Archivo is a Google font and the source loads it the same way. If there are licensed
  Archivo binaries, drop them in `assets/fonts/` and swap `tokens/fonts.css` for `@font-face`
  rules.
- **No marketing site, no docs site, no login screen** exists in the source, so none is
  recreated here.
