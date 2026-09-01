# UPOS Design Handbook + Token Kit — Design Spec

**Date:** 2026-09-01
**Status:** Approved structure; spec pending user review
**Author:** Claude (brainstormed with Horatio)

## Context

UPOS is an updated point-of-sale product — a cross between Toast, Shift4, and Square — targeting
both table-service and quick-service restaurants. Priorities: easy to use, intuitive, future-proof,
fast (sub-150ms perceived UI response), Android-first terminal hardware, offline-capable.

Three source inputs feed this work:

1. **Codebase** — [POC-Razor-Hospitality](https://github.com/tpaing00/POC-Razor-Hospitality.git),
   a 5-project .NET solution:
   - `Restaurant.Api` — ASP.NET Core Web API, EF Core → **PostgreSQL** (Azure), **SignalR**
     `OrdersHub` (`ReceiveNewOrder`, `ReceiveOrderStatusUpdate`, `ReceiveOrderCompleted`,
     per-order groups), OpenAPI/Scalar.
   - `Restaurant.Shared` — domain models: `MenuItem`, `Table`, `Order`, `OrderItem`,
     `OrderStatus` (Pending → Confirmed → Preparing → Ready → Served → Completed / Cancelled) + DTOs.
   - `Restaurant.UI.Shared` — Razor class library: `MenuItemCard`, `OrderCard`,
     `OrderStatusBadge`, `RestaurantApiService`.
   - `Restaurant.Blazor` — back-office Blazor Server PWA (currently Bootstrap + template leftovers).
   - `Restaurant.Mobile` — MAUI Blazor Hybrid (Android), mostly template; offline SQLite sync
     is planned but not built (README steps 6–8 remaining).

2. **Design handoff** — Claude Design bundle `Dual menu kiosk design`:
   - **Primary:** `UPOS Fusion (SecondBrain style).dc.html` — two interactive shells in the
     **SecondBrain Fluid** design language: a 1440×900 tablet **terminal** (order entry,
     modifiers, floor plan + coursing, payment/tips/split, channels queue, offline mode) and a
     desktop **back office** (dashboard + AI insight, 3-pane menu manager, integrations, reports).
   - **Secondary:** `Kitchen Display and Kiosk.dc.html` — KDS station board, self-order kiosk,
     daypart menu boards — in a *different, sharper visual style* that must be reconciled.
   - **Design system:** `_ds/secondbrain-design-system-…/` — full token CSS files
     (colors, typography, spacing, shape, elevation, motion) + a 319-line readme defining the
     Fluid language.

3. **Scope outline** — `SD Hospitality 2026 Android Outline.docx` (extracted text in the bundle):
   P0/P1/P2 capability matrix, nonfunctional requirements (offline continuity, <150ms UI,
   WCAG 2.2 AA, idempotency), 3-release delivery sequence, and Derek's must-haves (fast ordering,
   Android, delivery integrations, offline, native KDS, kiosk, loyalty, open API, dashboards).

## Goal

Produce a **design handbook + starter token kit** that lets the dev team implement the handoff
designs correctly in the existing Blazor/MAUI codebase — without guessing at colors, dimensions,
states, component boundaries, or data requirements.

## Non-goals

- No production code changes to the POC repo (no Razor components, no schema migrations).
- No new artboards/mockups (KDS/kiosk are re-specced in prose + tokens, not re-drawn).
- No fixing of data-model gaps — they are *recorded* in `docs/GAPS.md`, not resolved.

## Deliverables

```
docs/
  design/
    UPOS-DESIGN-HANDBOOK.md      ← Parts I–III (language, screens, components)
    tokens/
      upos-tokens.css            ← CSS custom properties (drop-in)
      upos-components.css        ← component recipes built on the tokens
  GAPS.md                        ← Part IV: data-model gap register (project-gaps format)
  PROJECT-OVERVIEW.md            ← project status brief (project-overview format)
```

Plus a shareable HTML artifact rendering of the handbook for the dev team.

## Part I — Design language ("UPOS Fusion Fluid")

Adopt SecondBrain Fluid wholesale, renamed **UPOS Fusion Fluid**, with POS-specific extensions.

**Adopted verbatim from the bundle's token files** (source of truth:
`_ds/secondbrain-design-system-…/tokens/*.css`):

- Ground: two-lamp radial gradient on `#eef1f5`; nothing sits on white pages.
- Ink scale `#1b1f24` → `#8b95a1`; dark panels `#20262e`; surfaces white; insets `#f4f7fa`;
  hairlines `#e3e7ec`.
- Blue rotation: `#22496a` → `#33648b` → `#4d84b8` → `#2f7d8f`; `#8fc9ff` accents-on-dark.
- Exactly three gradient uses (primary button `135deg #33648b→#22496a`, dark panel, bar fills).
- Archivo 400/700/800 only; tracking rules; ui-monospace for IDs/order numbers/prices on KDS &
  kiosk; nothing below 10px.
- Radii: panels 26–28, cards 16–22, pills 999; no square corners on terminal/back office.
- Elevation: wide soft negative-spread shadows; no borders-as-elevation except status-bordered
  data rows.
- Motion: one easing `cubic-bezier(.22,1,.36,1)`, .25–.45s; the six `fl-*` keyframes; hover
  lift/slide rules; mobile press states (scale on iOS, ripple tint on Android — Android rules
  apply to the MAUI terminal).
- Iconography: inline SVG, 24×24 Feather/Lucide model, `currentColor`, no icon fonts, no emoji.
- Copy voice: declarative, second person, numbers-as-headline, statement headings, middot
  separators, verbs on buttons, no exclamation marks.

**POS-specific extensions** (defined by this handbook; the source system never needed them):

1. **Status semantics** (from the primary artboard's legend, mapped to `OrderStatus`):
   blue `#33648b` = new/seated/Pending–Confirmed; orange `#f97316` = fired/Preparing;
   red `#ec3013` = late (SLA breach), 86'd, void; green `#22c55e` = Ready/Served/paid/done.
   Late is a *derived* state (elapsed-time threshold), not a stored status.
2. **Allergen chips**: purple family `rgba(139,92,246,.16)` bg / `#7c3aed` text — the one color
   outside the blue/status set, reserved exclusively for allergens.
3. **Offline pattern**: red pill `OFFLINE · N QUEUED` in the terminal top bar; per-action
   annotations ("will sync on reconnect"); never a blocking modal.
4. **Touch targets**: ≥48px terminal, ≥60px kiosk primary actions; spacing rules for speed
   (Derek: "MUST be FAST" / minimal screen transitions — modals and drawers over navigation).
5. **Theming**: dark mode + 4 accent presets (slate/teal/indigo/sky) as CSS custom-property
   swaps; tokens must be written so accent/theme changes are one class/attribute flip.
6. **KDS dark-board palette**: derive from Fluid's dark-panel family (`#20262e`/`#171c22`,
   inset `rgba(238,241,245,.06–.12)`, on-dark status colors `#8fc9ff`/`#ff8a70`/`#9ee6b4`) —
   replacing the secondary artboard's modernist styling (bone ground, `#ec3013` accent, zero
   radius, monospace-heavy). KDS keeps: monospace order numbers/timers, high-contrast chit
   layout, station tabs, bump-bar affordances. KDS drops: the square-corner modernist chrome.
7. **Bootstrap replacement**: the handbook explicitly recommends removing Bootstrap from
   `Restaurant.Blazor` and `Restaurant.Mobile` in favor of `upos-tokens.css` +
   `upos-components.css`. Rationale: the Fluid look is unreachable through Bootstrap's
   component chrome, and current Bootstrap usage is shallow (template-level).

**Token kit requirements:**

- `upos-tokens.css`: custom properties for every color, type role, radius, shadow, blur,
  easing, duration, spacing step, and the `fl-*` keyframes; `[data-theme="dark"]` and
  `[data-accent="…"]` override blocks; derived KDS block.
- `upos-components.css`: recipes for button (primary/secondary/ghost), pill/chip, segmented
  control, stat card, data row, modal + scrim, drawer, toast, nav items (sidebar + bottom bar),
  chit card, tender tile, tip button — class-based, framework-agnostic, consumable from Razor.
- Naming convention: `--upos-*` custom properties; `.u-*` component classes; documented in
  Part I.

## Part II — Screen specs

Every screen gets the same template: **Purpose · Layout regions (with px dimensions from the
artboards) · States · Interactions · Data bindings (existing models/DTOs/SignalR events) ·
Gaps (cross-referenced to GAPS.md)**.

**Terminal** (→ `Restaurant.Mobile`, MAUI Blazor Hybrid, Android tablet 1440×900 landscape +
10.1" handheld notes; bottom nav ORDER / TABLES / PAYMENTS / CHANNELS / MORE):

1. Order entry — 170px category rail · item grid (auto-fill minmax 190px; 86'd and allergen
   states) · 380px cart panel (per-line send-to-kitchen, qty steppers, subtotal/tax/total,
   send + charge actions).
2. Modifier modal — required groups (doneness), optional add-ons with upcharges, combo toggle
   (side + drink pickers, +$ pricing), size selection for drinks, qty, line-total CTA.
3. Item info modal — ingredients, allergens, plating photo / stack view toggle.
4. Floor plan — absolute-positioned tables with shape/capacity/status/elapsed-time; legend;
   tap-to-open flows (open table → guest count → start order; occupied table → drawer).
5. Table drawer — courses with per-course status; fire / hold (NOW / +5M / +10M) / refire;
   add-to-order; split & pay handoff.
6. Payment — tender grid (credit/cash/gift/split), tip presets (18/20/25/none, computed
   labels), guest-facing mirror panel, split evenly (guest count stepper, per-guest amount) /
   by seat, confirmation screen (order number, receipt email/print, new order).
7. Channels queue — unified list across counter/kiosk/online/delivery: channel badge, items,
   price, status pill.
8. Offline behavior — top-bar pill, queued count, card-payment store-and-forward annotation,
   reconnect sync expectations (bindings: SQLite queue → API replay; idempotency flagged as gap).

**Back office** (→ `Restaurant.Blazor`, desktop web, 224px dark sidebar):

1. Dashboard — AI insight banner ("Ask the brain" pattern; toggleable), 4 KPI stat cards
   (net sales, labor %, covers, avg ticket), sales-by-daypart bars, top items, exception
   flags (comps for review).
2. Menu manager — 3-pane: major categories → item list (minor-category filter chips, add item,
   86 toggle, price) → item detail (recipe/ingredients with costs, COGS $/%/margin with
   over-target flagging, prep steps, allergen toggles, modifier groups CRUD, plating photo +
   stack builder).
3. Integrations — channel toggle rows (Uber Eats, DoorDash, SkipTheDish, Online Ordering);
   copy: every channel injects into the same order pipeline.
4. Reports — low stock, COGS by category vs target, labor by role.
5. Employees / Devices / Settings — roadmap placeholders with layout guidance (list + detail
   patterns from the Fluid source's My Accounts / Settings screens).

**KDS** (new spec, Fluid-derived dark board; hardware 1280×800–1920×800 touchscreens):

1. Station board — header (station identity, clock, load), station tabs as filters, chit
   grid/rail.
2. Chit anatomy — order number (monospace), channel badge (KIOSK/COUNTER/ONLINE/DELIVERY),
   customer name, elapsed timer with color thresholds (new → aging orange → late red mapped to
   configurable SLA), items with modifiers and allergy callouts, rush flag, bag/assembly
   grouping.
3. Actions — bump / recall, per-item vs whole-chit states, plate-view (tap chit for plating
   reference), all-day aggregation note.
4. Bindings — `OrderStatus` transitions via `OrdersHub`; timers derived client-side from
   `CreatedAt`.

**Kiosk** (new spec, Fluid language, portrait guest-facing):

1. Flow — attract → browse (grid/list toggle) → item + modifiers → cart ("in bag" bar) →
   combo auto-detect with savings line → pay → order-number confirmation (giant numeral,
   "order sent to the kitchen").
2. Guest-facing rules — larger type scale, ≥60px targets, WCAG 2.2 AA contrast, no staff
   jargon, dayparting, upsell placement.
3. Bindings — same catalog + order pipeline as terminal; channel = kiosk (gap: channel field).

## Part III — Component inventory

Mapped to `Restaurant.UI.Shared`. Each component: name, props, states, token usage, which
screens consume it.

- **Restyle existing:** `MenuItemCard`, `OrderCard`, `OrderStatusBadge`.
- **New (~20):** `UposButton`, `UposIconButton`, `StatusChip`, `AllergenChip`, `Pill`,
  `SegmentedControl`, `StatCard`, `DataRow`, `UposModal`, `UposDrawer`, `Toast`,
  `BottomNav`/`SideNav` items, `FloorTable`, `CartLine`, `QtyStepper`, `TipPad`, `TenderTile`,
  `ChitCard`, `ChannelBadge`, `OfflinePill`.
- Shared across all four surfaces; Razor naming + CSS class conventions defined in Part I.

## Part IV — Gap register (`docs/GAPS.md`)

Everything the design renders that the current schema cannot express. Each entry: affected
screens · minimal entity/field suggestion · priority (aligned to the outline's P0/P1 and
Release 1–3 sequence). Known entries to record:

1. Modifier groups/options (required/optional/no-remove, min/max, upcharges) — P0.
2. Combos/bundles (side + drink, price adjustment, auto-detect) — P0 QSR.
3. Courses & seats (course assignment, hold/fire state, seat tracking) — P0 table service.
4. Order channel + order type (counter/kiosk/online/delivery; dine-in/takeout/…) — P0.
5. Allergens (item-level, chip codes) — P0 for the design as drawn.
6. Recipes/ingredients/COGS (menu manager detail pane, reports) — P1.
7. Table status model (status enum + timestamps vs current `IsOccupied` bool; elapsed timers) — P0.
8. Payments domain (tender, tip, split, refund; none exists today) — P0.
9. Employees/roles/auth (server names, PIN login, manager approvals) — P0.
10. Offline sync queue + idempotency keys (mobile SQLite → API replay) — P0.
11. Inventory/stock levels (low-stock report) — P1.
12. Loyalty accounts (terminal loyalty toggle) — P1.
13. Multi-location/org scaffolding (avoid single-location assumptions) — P1, flagged early per
    outline's scale requirement.

## Sources of truth (for implementation)

- Artboards: `Dual menu kiosk design-handoff.zip → project/UPOS Fusion (SecondBrain style).dc.html`
  (primary), `Kitchen Display and Kiosk.dc.html` (KDS/kiosk content, style superseded).
- Tokens: `project/_ds/secondbrain-design-system-3cef5c67-…/tokens/*.css` + `readme.md`.
- Scope: `project/uploads/SD Hospitality 2026 Android Outline.docx` / `outline-extracted.txt`.
- Code: the POC repo as cloned 2026-09-01.

## Acceptance criteria

- A developer can style a new screen using only `upos-tokens.css` + Part I, without opening
  the artboards.
- Every interactive element visible in the two artboards appears in exactly one Part II screen
  spec with its states and bindings.
- Every Part II "gap" cross-references a GAPS.md entry; no gap is silently dropped.
- Token kit loads standalone in a blank page and renders the component recipes correctly in
  light, dark, and all four accents.
- Handbook uses the Fluid copy voice itself (practice what it specifies).

## Decisions log

- Deliverable: spec/handbook first; implementation is a later phase. (Horatio, 2026-09-01)
- Scope: terminal + back office + KDS/kiosk unified into Fluid; menu boards & customer display
  out of scope. (Horatio, 2026-09-01)
- Packaging: single handbook + starter token kit; gap register lives in `docs/GAPS.md`.
  (Horatio, 2026-09-01)
- Bootstrap: recommend replacement with token kit. (Claude recommendation, approved via design)
