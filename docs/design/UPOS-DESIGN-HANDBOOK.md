# UPOS design handbook

**UPOS FUSION FLUID · TERMINAL · BACK OFFICE · KITCHEN DISPLAY · KIOSK**

This handbook is how you build UPOS without opening the design artboards. Part I is the design
language: read it once and you can style a screen nobody has drawn yet. Part II specs every screen
in the handoff, region by region. Part III maps the language onto Razor components. Part IV records
what the design renders that the data model cannot yet express.

## Sources of truth

| Source | Path | What it settles |
| --- | --- | --- |
| Primary artboard | `docs/design/reference/UPOS Fusion (SecondBrain style).dc.html` | Terminal and back office: dimensions, layout, states, interactions |
| Secondary artboard | `docs/design/reference/Kitchen Display and Kiosk.dc.html` | Kitchen display and kiosk content and flow · visual style superseded by §11 |
| Token kit | `docs/design/tokens/upos-tokens.css` · `docs/design/tokens/upos-components.css` | Every value you type |
| This handbook | `docs/design/UPOS-DESIGN-HANDBOOK.md` | Every rule you follow |
| Gap register | `docs/GAPS.md` | Every `GAP-NN` a Part II spec or a Part III component cites |
| Parent design language | `docs/design/reference/_ds/secondbrain-design-system-3cef5c67-b264-4117-ad2f-24f3f1404fe7/readme.md` | Where the language came from |
| Scope and priorities | `docs/design/reference/outline-extracted.txt` | What ships in which release |

The artboards show; the handbook and the token kit tell. When a pixel value differs, the artboard
wins and Part II records it. When a rule differs, this handbook wins — it reconciles two artboards
that were drawn in two different visual styles.

## How to read this handbook

Read Part I once, end to end. After that you use it as a lookup: a screen brief plus §2, §4, §6, §7
and §8 answers most styling questions without a second file open.

Part II is per screen and follows one template, so the same six questions are answered in the same
order every time. Copy that template for any screen the handoff does not cover.

Part III is the lookup between the two: find the component a region needs, then read its props,
states and consumers.

All four parts are complete.

## Contents

- [Sources of truth](#sources-of-truth)
- [How to read this handbook](#how-to-read-this-handbook)
- [The screen-spec template](#the-screen-spec-template)
- [Part I · The design language](#part-i--the-design-language)
  - [1 · What this is](#1--what-this-is)
  - [2 · Ground and surfaces](#2--ground-and-surfaces)
  - [3 · Color](#3--color)
  - [4 · Status semantics](#4--status-semantics)
  - [5 · Allergen color](#5--allergen-color)
  - [6 · Type](#6--type)
  - [7 · Shape, elevation, blur](#7--shape-elevation-blur)
  - [8 · Motion](#8--motion)
  - [9 · Iconography](#9--iconography)
  - [10 · Copy voice](#10--copy-voice)
  - [11 · POS extensions](#11--pos-extensions)
  - [12 · Using the kit in Blazor and MAUI](#12--using-the-kit-in-blazor-and-maui)
- [Part II · Screen specs](#part-ii--screen-specs)
  - [Part II-A · Terminal](#part-ii-a--terminal)
    - [Order entry](#order-entry)
      - [Width bands](#width-bands)
      - [Tablet portrait](#tablet-portrait)
      - [Handheld](#handheld) · provisional
      - [Dark](#dark)
    - [Modifier modal](#modifier-modal)
    - [Item info modal](#item-info-modal)
    - [Floor plan](#floor-plan)
    - [Table drawer](#table-drawer)
    - [Payment](#payment)
    - [Channels queue](#channels-queue)
    - [Offline behavior](#offline-behavior)
  - [Part II-B · Back office](#part-ii-b--back-office)
    - [Dashboard](#dashboard)
    - [Menu manager](#menu-manager)
    - [Integrations](#integrations)
    - [Reports](#reports)
    - [Employees, Devices, Settings (roadmap)](#employees-devices-settings-roadmap)
  - [Part II-C · Kitchen display](#part-ii-c--kitchen-display)
    - [Station board](#station-board)
    - [Chit anatomy](#chit-anatomy)
    - [Chit actions](#chit-actions)
    - [KDS data contract](#kds-data-contract)
  - [Part II-D · Kiosk](#part-ii-d--kiosk)
    - [Kiosk flow](#kiosk-flow)
    - [Guest-facing rules](#guest-facing-rules)
    - [Kiosk data contract](#kiosk-data-contract)
- [Part III · Component inventory](#part-iii--component-inventory)
  - [MenuItemCard](#menuitemcard)
  - [OrderCard](#ordercard)
  - [OrderStatusBadge](#orderstatusbadge)
  - [UposButton](#uposbutton)
  - [UposIconButton](#uposiconbutton)
  - [StatusChip](#statuschip)
  - [AllergenChip](#allergenchip)
  - [Pill](#pill)
  - [SegmentedControl](#segmentedcontrol)
  - [StatCard](#statcard)
  - [DataRow](#datarow)
  - [UposModal](#uposmodal)
  - [UposDrawer](#uposdrawer)
  - [Toast](#toast)
  - [BottomNav](#bottomnav)
  - [SideNav](#sidenav)
  - [FloorTable](#floortable)
  - [CartLine](#cartline)
  - [QtyStepper](#qtystepper)
  - [TipPad](#tippad)
  - [TenderTile](#tendertile)
  - [ChitCard](#chitcard)
  - [ChannelBadge](#channelbadge)
  - [OfflinePill](#offlinepill)
  - [UposSwitch](#uposswitch)
- [Part IV · Data-model gaps](#part-iv--data-model-gaps)

## The screen-spec template

Every screen spec in Part II uses this template verbatim. Use it for any screen you add.

```markdown
#### [Screen name]

**Purpose.** [One sentence.]

**Layout.** [Regions with px dimensions from the artboard.]

**States.** [Enumerated UI states and what triggers each.]

**Interactions.** [Tap/keyboard flows, modals/drawers opened, animations used (named fl-* only).]

**Data.** [Bindings: models/DTOs/API endpoints/SignalR events from the POC. Derived values called out.]

**Gaps.** [GAP-NN citations with one line each, or "None".]
```

---

## Part I · The design language

### 1 · What this is

UPOS Fusion Fluid is SecondBrain Fluid adopted for point of sale. Archivo type on a soft, rounded,
layered shell, everything floating on a cool-grey two-lamp ground. Nothing is boxy; nothing is
decorated.

Four surfaces run the same language at four densities:

| Surface | Project | Hardware | Density |
| --- | --- | --- | --- |
| Terminal | `Restaurant.Mobile` (MAUI Blazor Hybrid, Android) | 1440×900 tablet, landscape; 800×1280 and 393×785 have bands | Dense · 13px body · 48px targets |
| Back office | `Restaurant.Blazor` (Blazor Server) | Desktop web, 224px dark sidebar | Dense · 13px body · pointer input |
| Kitchen display | New surface | 1280×800 to 1920×800 touchscreen | Dark board · read at two metres |
| Kiosk | New surface | Portrait guest device | Guest scale · body ≥19px · 60px targets |

**Adopted from the parent language without change:** the two-lamp ground, the blue rotation, the
three gradient uses, Archivo 400/700/800 with its tracking scale, the one easing curve and the six
`fl-*` keyframes, the hover and press rules, inline-SVG iconography, and the copy voice.

**Adopted reduced**, because a POS does not need the range a sales tool carried:

- **Ink** — the parent ships a nine-step ramp from `#1b1f24` to `#9aa5b1`; the kit exposes two of
  them, `--upos-ink` (`#1b1f24`, step one) and `--upos-ink-subtle` (`#8b95a1`, the parent's label
  step), and reaches the rest with opacity (§3).
- **Radii** — the parent ships nine plus three mobile variants; the kit exposes four
  (panel · card · inset · pill) plus the three mobile values. `--upos-radius-card` is **18px**, a
  deliberate UPOS choice rather than a transcription of the parent: the parent's card radii are
  20–22px; 18px transcribes the UPOS Fusion artboard itself, whose menu-item cards render at
  `border-radius:18px` (§7).
- **Shadows** — the parent ships thirteen; the kit exposes three (card · modal · button). Anything
  that needs a fourth borrows the nearest of the three and is recorded in §12.

**Added by UPOS** because a sales tool never needed them: status semantics bound to `OrderStatus`
(§4), allergen violet (§5), food photography as content (§3), the offline pattern, touch targets,
the theming contract, and the kitchen display derivation (§11).

The rule that keeps the language intact: **if a value is not in the token kit, it is not in the
design.** When you need something the kit lacks, add the token and use it — never fork a value into
a component.

**That rule binds color, type, radius, shadow and motion.** It does not bind per-screen layout
geometry. A panel's 32px padding, a grid's 22px gap, a rail's 170px width and a modal's 480px are
transcribed from the artboards, carried in Part II per screen, and do not become tokens — §2's
padding and gap steps are what you reach for when no artboard settles the value, not a set every
measurement has to round to.

### 2 · Ground and surfaces

**The page is never white.** `--upos-ground` is a two-lamp radial gradient — a cool blue lamp at
88% -8%, a green-grey lamp at -6% 12% — over `#eef1f5`. `upos-tokens.css` already sets it on `body`.
A white page is a bug, not a blank state.

**Everything floats.** Panels, cards and rails sit on the ground as detached rounded objects. Outer
page padding is `--upos-space-page` 14px; the main column stands `--upos-space-main-offset` 14px off
the sidebar. There is no page-width container and no centered column: the shell fills the viewport.
Sidebars and rails are `position:sticky; top:14px` with `max-height:calc(100vh - 28px)`.

**The surface ladder:**

| Token | Value | Carries |
| --- | --- | --- |
| `--upos-surface` | `#ffffff` | Panels, cards, modals, drawers, tiles |
| `--upos-surface-inset` | `#f4f7fa` | Blocks inside a card: table header strips, ingredient lists, stepper tracks, inputs |
| `--upos-surface-hover` | `#f2f6fa` | Row tint under the pointer |
| `--upos-border` | `#e3e7ec` | Hairlines that divide, never elevate |
| `--upos-panel-dark` | `#20262e` | Flat dark surfaces: toasts, chit headers |
| `--upos-grad-dark` | `linear-gradient(168deg,#20262e,#171c22)` | Large dark surfaces: back-office sidebar, kitchen board |

On a dark surface, inset blocks are `--upos-kds-inset` `rgba(238,241,245,.06)`, rising to
`--upos-kds-inset-hover` `rgba(238,241,245,.12)` under the pointer. Ink on dark is
`--upos-kds-ink` `#f4f7fa`.

**Inputs and selects sit on the inset, not the surface.** Fill `--upos-surface-inset`, 1px
`--upos-border`, radius `--upos-radius-inset`, text `--upos-type-body`, placeholder
`--upos-ink-subtle`, and minimum height `--upos-touch-terminal` on the terminal and
`--upos-touch-kiosk` on the kiosk. On focus the border goes
`--upos-accent` and the fill goes `--upos-surface`, so the focused field is the one white box on the
card. This is the only place a control changes surface color to show state.

**Dark theme** swaps ground to `#14181d`, surface `#1c2229`, inset `#171c22`, hover `#20262e`,
border `#2a323b` and ink `#eef1f5` through `[data-theme="dark"]`. Status hues do not move (§11).

**Layout is flex and grid with `gap`, never margins between siblings.** Rows are individual
elements `--upos-space-gap-row` 8px or `--upos-space-gap-row-loose` 9px apart; they never share a
table border. Data tables are explicit `grid-template-columns` in px, repeated identically on the
header strip and on the row so the columns line up.

**Padding steps:**

| Token | Value | Applies to |
| --- | --- | --- |
| `--upos-space-pad-panel` | `26px 24px 28px` | Page panels |
| `--upos-space-pad-hero` | `30px 32px 26px` | Hero and full-width feature cards |
| `--upos-space-pad-card` | `24px 26px` | Cards |
| `--upos-space-pad-card-sm` | `17px 19px` | Compact cards, stat tiles |
| `--upos-space-pad-row` | `15px 20px` | List rows |
| `--upos-space-pad-row-table` | `12px 14px` | Grid rows and header strips |
| `--upos-space-pad-inset` | `12px 15px` | Inset blocks |
| `--upos-space-pad-btn` | `11px 22px` | Buttons |
| `--upos-space-pad-btn-sm` | `8px 16px` | Compact buttons |
| `--upos-space-pad-chip` | `3px 10px` | Chips |
| `--upos-space-pad-pill` | `6px 14px` | Pills |

Gaps come from the same family: `--upos-space-gap-card` 16px between cards,
`--upos-space-gap-chip` 7px between chips, `--upos-space-gap-inline` 10px inside a row,
`--upos-space-gap-line` 12px between two lines on a check, `--upos-space-gap-section` 26px between
sections. `--upos-space-gap-line` is the one gap that is not vendored: the check's list has always
stacked at 12px, a step above `--upos-space-gap-inline` and below `--upos-space-gap-card` and neither
of them, and it was a literal at its one call site until Part II-A · Handheld had to size a region
from it — three lines and their gaps is a height, and a height built half from a token and half from
a literal is a height nobody can re-derive.

**Two component recipes override a step on purpose.** `.u-chip-status` and `.u-chip-allergen` use
`5px 12px` instead of `--upos-space-pad-chip` `3px 10px`, because a status chip is read across a
kitchen and 3px does not carry that far. `.u-btn` uses `0 20px` with
`min-height:var(--upos-touch-terminal)` instead of `--upos-space-pad-btn` `11px 22px`, because on a
terminal the 48px touch target sets the button's height and padding only sets its width (§11). The
table above is the step set to reach for; where a component recipe states its own value, the recipe
is the authority for that component.

**Density is the point.** Body copy is 13px and a 1440×900 terminal carries a 170px category rail,
an item grid and a 380px cart panel without the shell scrolling. A screen that needs more room loses
words, not density.

### 3 · Color

**Ink.** `--upos-ink` `#1b1f24` carries body copy and every number. `--upos-ink-subtle` `#8b95a1`
carries labels, meta lines and quiet text. Those are the two steps the kit exposes; for a step
between them use opacity on `--upos-ink` rather than a new hex.

**The working palette is blues, rotated.** Walk them down a column of numbers and restart at the
top; one blue repeated for a whole column flattens the data.

| Token | Value |
| --- | --- |
| `--upos-value-1` | `#22496a` |
| `--upos-value-2` | `#33648b` |
| `--upos-value-3` | `#4d84b8` |
| `--upos-value-4` | `#2f7d8f` |

On dark surfaces, accents are `--upos-on-dark-accent` `#8fc9ff`.

**Accent is a brand dial, not a meaning.** `--upos-accent` and `--upos-accent-deep` drive primary
actions, the active nav pill and the selected control. Never use the accent to say something is
late, ready or wrong — that is §4's job.

| `data-accent` | `--upos-accent` | `--upos-accent-deep` | White on accent | White on accent-deep |
| --- | --- | --- | --- | --- |
| slate (default) | `#33648b` | `#22496a` | 6.29:1 | 9.4:1 |
| teal | `#2f7d8f` | `#1c4a54` | 4.72:1 | 9.7:1 |
| indigo | `#4a5a94` | `#2b3560` | 6.60:1 | 11.8:1 |
| sky | `#4d84b8` | `#2a5578` | 3.96:1 | 7.9:1 |

**The four accents are not equally safe under white text**, and §11 makes WCAG 2.2 AA binding on the
kiosk. White on `--upos-accent` is certified for slate and indigo. Teal clears the 4.5:1 floor with
nothing in hand — 4.72:1 holds for normal text and leaves no margin for a lighter weight.
**Sky does not clear it at all**, and `--upos-grad-primary` carries the same figure at its accent
end, so on sky a guest-facing surface fills any white label with `--upos-accent-deep` `#2a5578`
rather than with `--upos-accent` or the gradient. Part II-D's contrast table restates this for the
kiosk.

**Gradients are used exactly three ways and no others:**

1. `--upos-grad-primary` — `linear-gradient(135deg, accent, accent-deep)`. Primary buttons, the
   active nav pill, the selected tender tile, the AI insight banner, the brand monogram square, and
   clipped text on one figure per screen at most.
2. `--upos-grad-dark` — `linear-gradient(168deg,#20262e,#171c22)`. Dark panels: back-office sidebar,
   kitchen board.
3. `--upos-grad-bar` — `linear-gradient(90deg,#6fa3cf,#2a5578)` — and `--upos-grad-bar-v`, the same
   stops at `180deg` for a bar that grows upward. Bar fills that carry a quantity and nothing else:
   the dashboard's daypart columns take the vertical token. **A bar whose color carries a problem
   takes a status token instead**, which is why Reports uses neither (§4, Part II-B). One use, two
   axes.

There are no gradient borders, no rainbow fills, no purple gradients. A gradient never carries
status.

**No photographs, illustrations, textures, grain or repeating patterns.** Depth comes from three
things: the two-lamp ground, the shadow trio (§7), and one ambient glow — a soft
`rgba(111,163,207,.34)` radial that drifts behind dark panels with `fl-drift` (§8). Charts are
inline SVG line and area plots in the palette blues; nothing looks like a chart library.

Food photography is the exception the product needs: plating photos and kiosk item images are
content, not decoration. They sit in circular or `--upos-radius-card` frames, never full-bleed
behind text.

### 4 · Status semantics

Color carries meaning. Four hues, each with one job, on every surface.

| Meaning | Fill | Text on white | On dark | Chip |
| --- | --- | --- | --- | --- |
| New · sent · seated · neutral | `--upos-status-new` `#33648b` | `--upos-status-new` (6.3:1 on white) | `--upos-kds-status-new` `#8fc9ff` | `.u-chip-status--new` |
| Fired · on the line · aging | `--upos-status-fired` `#f97316` | `--upos-status-fired-text` `#d95f06` | `--upos-status-fired` unchanged (5.4:1 on `--upos-panel-dark`) | `.u-chip-status--fired` |
| Late · 86'd · void · problem | `--upos-status-late` `#ec3013` | `--upos-status-late-text` `#ae1800` | `--upos-kds-status-late` `#ff8a70` | `.u-chip-status--late` |
| Ready · served · paid · healthy | `--upos-status-ready` `#22c55e` | `--upos-status-ready-text` `#159548` | `--upos-kds-status-ready` `#9ee6b4` | `.u-chip-status--ready` |

Fill tokens go on chips, dots, borders and bars. Text tokens go on text. The two are not
interchangeable: `#22c55e` as body text on white does not hold contrast, which is why
`--upos-status-ready-text` exists.

**The on-dark set applies to every dark surface**, not only the kitchen display: a toast, a dark
sidebar and the board all take `--upos-kds-status-*`. The `kds` in the token name is history, not
scope (§12).

**`OrderStatus` maps like this:**

| `OrderStatus` | Color | Chip label | Meaning on screen |
| --- | --- | --- | --- |
| `Pending` | new-blue | `PENDING` | Built on the terminal, not sent to the kitchen |
| `Confirmed` | new-blue | `SENT` | Accepted by the kitchen, not started |
| `Preparing` | fired-orange | `FIRED` | On the line |
| `Ready` | ready-green | `READY` | Waiting to be run or picked up |
| `Served` | ready-green | `SERVED` | At the table |
| `Completed` | ready-green | `PAID` | Closed and paid · drops off live boards, stays green in history |
| `Cancelled` | late-red | `VOID` | Voided or refunded |

**Late is derived, never stored.** A row is late when
`DateTime.UtcNow - order.CreatedAt > slaThreshold`, where the threshold is per station and per
channel configuration. Late overrides the status color for as long as it holds: a `Preparing`
order that breaches its SLA renders red, not orange, and its timer pulses with `fl-pulse`. Nothing
is written back to `OrderStatus`, and no API returns a "late" value.

**86'd is a menu-item state, not an order state.** An unavailable item keeps its tile in the grid at
reduced opacity, strikes its name, carries a red `86'D` pill, and does not respond to a tap.
Removing it from the grid loses the staff's muscle memory for where it lives.

**Red is never decorative.** Red means a problem someone has to act on: late tickets, 86'd items,
voids, comps flagged for review, the offline queue, COGS over target, stock under threshold. Red is
not a delete button at rest (destructive controls: §11), not a brand accent, not a divider, and not
the kitchen display's house color (§11).

**Status takes a shape of its own in exactly five places**: `.u-chip-status--*` chips, the 1px
status border on `.u-data-row`, the 2px border on a floor-plan table, the top edge of a kitchen
chit, and `.u-chit__timer--late`. Nothing else gets a new element to carry status. Coloring
something already on the screen is the other rule above and it is not restricted to those five: a
fill token also colors a report dot or level bar, a station tab's live dot, a chit's `NO` · `SUB` ·
`ADD` prefix and a dashboard comparison line, and a text token colors the words that go with them.

### 5 · Allergen color

Violet is the only hue outside the blues and the four status colors, and it is reserved
exclusively for allergens and dietary flags.

| Token | Value | Use |
| --- | --- | --- |
| `--upos-allergen-bg` | `rgba(139,92,246,.16)` | Chip fill on light surfaces |
| `--upos-allergen-text` | `#7c3aed` | Chip text on light surfaces |

`.u-chip-allergen` matches the status chip's geometry: `5px 12px`, 700 10.5px, uppercase, `.03em`
tracking, `--upos-radius-pill`.

- Nothing else in UPOS is violet. A violet chip always means an allergen.
- The chip rides the item everywhere the item appears: grid tile, cart line, modifier modal,
  item info modal, kitchen chit, kiosk card and kiosk detail.
- The label is the allergen word in uppercase — `GLUTEN`, `DAIRY`, `NUTS`, `SHELLFISH`. Never an
  icon alone, never an emoji, never a color-only signal.
- On a chit the allergen row sits directly under the header, above the build, so a cook reads it
  before the items.
- **On dark surfaces the chip inverts**: fill `--upos-allergen-text` `#7c3aed`, text
  `--upos-kds-ink` `#f4f7fa` (5.3:1). The light-surface pairing does not hold contrast on a dark
  board.

Allergen data does not exist on `MenuItem` today — the chips are real in the design and empty in
the schema (GAP-05).

### 6 · Type

Archivo, weights 400, 700 and 800, and nothing else. `upos-tokens.css` loads all three.

| Token | Value | Carries |
| --- | --- | --- |
| `--upos-type-display` | `800 28px/1.1` | Headline numbers: order total, KPI value, kiosk order number |
| `--upos-type-heading` | `800 18px/1.25` | Panel, modal and screen headings |
| `--upos-type-row` | `700 13px/1.35` | Row titles, item names, button labels |
| `--upos-type-body` | `400 13px/1.5` | Body copy only |
| `--upos-type-label` | `700 10px/1` | Kickers and small-caps labels · pair with `letter-spacing` and `text-transform:uppercase` |
| `--upos-type-mono` | `800 13px/1 ui-monospace` | IDs, order numbers, timers, kiosk prices |

Every role resolves to the stack `Archivo,system-ui,sans-serif`; `--upos-type-mono` resolves to
`ui-monospace,Menlo,monospace`.

**Weight discipline.** 800 carries every heading and every number. 700 carries row titles and
button labels. 400 is body copy only. There is no 500 and no 600. The secondary artboard's 900
weights map to 800.

**Tracking tightens as size grows and opens as it shrinks.** Set `letter-spacing` alongside the
`font:` shorthand — tracking is not tokenized.

| Size | Tracking |
| --- | --- |
| 42px hero | `-.035em` |
| 32px page title | `-.03em` |
| 26–30px value | `-.03em` |
| 28px card headline | `-.025em` |
| 21px section head | `-.02em` |
| 15px row title | `-.01em` |
| 9.5–10px label | `+.16em`, up to `+.2em` for a wide kicker |

**Monospace has a scope, and it is small.** `--upos-type-mono` covers IDs, order numbers, table
numbers, kitchen elapsed timers and kiosk prices — values a person reads digit by digit or compares
down a column. Money in the terminal and the back office is Archivo 800 so it aligns with the
headings around it. Body copy is never monospace.

**The tie-break, where a figure is both.** A column of money on a staff surface — a drawer count's
denominations, a split's per-seat amounts, a labor column — is a column to compare and it is money,
and money wins: it renders Archivo 800, right-aligned so the decimals line up, because alignment is
what the column actually needed. Mono keeps the values that are not money: IDs, order and table
numbers, elapsed timers. The kiosk is the one place money is mono, as the scope line above says, and
it is a guest reading one price rather than a manager reading down twelve.

**Nothing goes below 10px.** The 10px label class is the floor on every surface. If a label does not
fit at 10px, cut the words.

**Casing.** Sentence case for everything readable. UPPERCASE only in the 10px label class and in
status words — `FIRED`, `READY`, `VOID`, `86'D`, `OFFLINE · 3 QUEUED`. Data keeps its own casing: an
item entered as `CHICKEN SHAWARMA` renders that way, because it is data, not copy.

**Numbers.** Money is whole-dollar and comma-grouped — `$1,284.50` — abbreviated to `$K` only where
space demands. Elapsed time counts up (`6m`, `12:41`), never a wall-clock timestamp on a live view.

### 7 · Shape, elevation, blur

**Radius scale:**

| Token | Value | Applies to |
| --- | --- | --- |
| `--upos-radius-panel` | `26px` | Page panels, modals, drawers, hero cards |
| `--upos-radius-card` | `18px` | Cards, tiles, stat cards, tender tiles |
| `--upos-radius-inset` | `14px` | Inset blocks, buttons, toasts, nav items, data rows, inputs |
| `--upos-radius-pill` | `999px` | Chips, pills, segmented tracks and options, dots, bars, avatars, icon buttons |

Anything at `--upos-radius-pill` is clipped with `overflow:hidden` so its fill follows the corner.
Mobile steps down a notch: `--upos-radius-panel-ios-mobile` 24px,
`--upos-radius-panel-android-mobile` 18px, `--upos-radius-card-mobile` 16px. The MAUI terminal runs
the Android values.

**Nothing in UPOS has a zero radius.** The tightest corner in the product is the kitchen chit at
10px, scoped under `.upos-kds` (§11). Everything else is 14px or more.

**Elevation is three shadows, and there is no fourth:**

| Token | Value | Carries |
| --- | --- | --- |
| `--upos-shadow-card` | `0 22px 54px -36px rgba(27,31,36,.5)` | Cards, tiles, floating strips, segmented tracks, hovered rows |
| `--upos-shadow-modal` | `0 40px 90px -40px rgba(20,25,31,.9)` | Modals, drawers, toasts |
| `--upos-shadow-button` | `0 12px 24px -14px rgba(34,73,106,.95)` | Primary buttons and selected tender or tip controls |

The big negative spread is deliberate: these read as float, not as drop shadow. The button shadow is
tinted with the button's own blue rather than neutral grey.

There are no inner shadows and **no borders as elevation** — a card is shadow plus radius, never a
border. The one exception is `.u-data-row`: white fill plus a 1px status-colored border and no
shadow at rest, picking up `--upos-shadow-card` when it lifts.

**Blur is rationed.** `--upos-blur-glass` 14px belongs to a sticky search or top bar and nothing
else; the terminal's 76px top bar is the one element that takes it, over `--upos-surface-veil`
because a blur behind an opaque fill does nothing (Order entry). `--upos-blur-scrim` 6px runs with `--upos-scrim` `rgba(20,25,31,.5)` under modals, drawers and
sheets. Never blur behind a row or card carrying data — it softens the text you are asking someone
to read at speed. The terminal runs one blurred surface at a time: when a scrim is up, the glass top
bar drops its blur.

**The translucent veil** covers segmented tracks, the glass top bar, secondary panels and
de-emphasized tails. `--upos-surface-veil` carries it: `rgba(255,255,255,.75)` in light, inside the
parent's `.7` to `.82` range, and `rgba(238,241,245,.05)` in dark — the on-dark ink at low alpha, the
same move `--upos-kds-inset` makes. It inverts because a white veil in dark theme puts near-white ink
on a near-white track — an inactive segmented label lands at 1.3:1 — while the inverted value carries
it at 6.3:1. A component that writes the literal instead breaks the theming contract (§11).

**A label on the veil takes `--upos-ink` at `.66`, not `--upos-ink-subtle`.** The veil composites
toward white in light theme, and `--upos-ink-subtle` on it reads 3.0:1, the same failure §11 rules
out for a destructive control's label. The opacity step reads 5.3:1 in light and 6.3:1 in dark from
one declaration, because `--upos-ink` flips with the theme and the veil flips under it (§3, §12).

**Edges fade with masks, not with a gradient div** — a scrolling strip is clipped with
`mask-image: linear-gradient(90deg,transparent,#000 40px,#000 calc(100% - 40px),transparent)`.

### 8 · Motion

**One easing curve for everything.** `--upos-ease` is `cubic-bezier(.22,1,.36,1)`. There is no
second curve in UPOS.

**Durations.** UI transitions run from `--upos-dur-fast` `.25s` to `--upos-dur-slow` `.45s`. Use
`.25s` for color, tint and opacity; use `.45s` for anything that moves a panel. The named keyframes
carry their own durations from the parent system and are not bound by that range.

| Keyframe | Duration | What it does | Where it runs |
| --- | --- | --- | --- |
| `fl-rise` | `.6s` | 14px up plus fade in | Modals, drawers, toasts, expanding sections, screen entry |
| `fl-pulse` | `1.6s` | opacity 1 → `.35`, scale 1 → `.7` | Live dots: late timer, offline pill, a station tab holding a late chit |
| `fl-sheen` | `5.5s` | light sweep across a background | The AI insight banner, and nothing else |
| `fl-drift` | `14–18s` | ambient glow translate and scale | Behind dark panels and inside hero cards |
| `fl-grow` | `.8–.9s` | `scaleX` from the left | Every bar on mount: daypart bars, COGS bars, stock levels |
| `fl-marquee` | `42s` linear | `translateX(0 → -50%)` | Ticker strips · duplicate the list for a seamless loop |

**`fl-grow` grows on `scaleX`, so a vertical bar turns it rather than replacing it.** The dashboard's
daypart columns grow upward: they set `transform-origin: bottom` and run the same growth on `scaleY`
at the call site, over `fl-grow`'s own `.8–.9s` on `--upos-ease`. Same motion, other axis — it is not
a seventh keyframe, and the vocabulary above is still six. A horizontal bar runs `fl-grow` unchanged
from `transform-origin: left`.

Those six are the whole vocabulary. Do not add a keyframe; override a duration at the call site
instead. The component kit already does this: `.u-modal` and `.u-drawer` run `fl-rise` at
`--upos-dur-slow` and `.u-toast` runs it at `--upos-dur-fast`, because the terminal is a speed-first
surface. Same keyframe, faster call.

**A toast rises with `fl-rise`, holds 4s, then leaves by fading over `--upos-dur-fast`.** A toast
carrying an action holds until it is dismissed or acted on. Toasts stack upward from one corner and
never cover the primary action of the screen underneath.

**Hover, on pointer surfaces:**

| Element | On hover |
| --- | --- |
| Card, tile, stat card, tender tile | `translateY(-4px)` and pick up `--upos-shadow-card` |
| Data row, list row | `translateY(-3px)` and pick up `--upos-shadow-card` |
| Button, icon button, tip button | `translateY(-2px)`, shadow deepens |
| Nav item, list item | `translateX(3px)`, ink `--upos-ink-subtle` → `--upos-ink` |
| Grid row | Background → `--upos-surface-hover` |
| Secondary button | Fill white → `#eef3f8`, border `rgba(27,31,36,.12)` → `#9dbdd8` |
| Ghost button | Ink `--upos-ink-subtle` → `#2c353f` |
| Modal close button | `rotate(90deg)` · it does not lift |
| Input on focus | Border → `--upos-accent`, fill → `--upos-surface` |

**Touch surfaces replace all of it.** The Android terminal and the kiosk have no hover: press
feedback is a ripple tint `rgba(51,100,139,.14)` with no transform at all. Do not ship `:hover`
transforms to `Restaurant.Mobile` — a hover state left standing after a tap reads as a stuck button.
(The parent system's iOS presses, `scale(.985)` on a card and `scale(.94)` on an icon button, are
recorded here for reference; UPOS ships Android.)

**Reduced motion.** Under `prefers-reduced-motion: reduce`, drop `fl-drift`, `fl-sheen` and
`fl-marquee` entirely and reduce `fl-rise` to an opacity fade. `fl-pulse` on a late timer stays — it
carries status, not decoration.

### 9 · Iconography

One set, drawn as inline SVG: `24×24` viewBox, `fill:none`, `stroke:currentColor`,
`stroke-width:2` (`1.7` in the back-office sidebar), round caps and joins. Rendered at 15–18px in
dense UI and 20–24px on the kitchen display and kiosk.

- **`currentColor`, always.** An icon takes the ink of its parent, so a status chip's icon is white
  and a ghost button's icon is `--upos-ink-subtle` with no extra rule.
- **No icon fonts, no sprite sheets, no PNG icons.** Path data lives inline in the component.
- **No emoji.** Not in labels, statuses, empty states, receipts or chits.
- **Unicode is typography, not iconography.** The permitted glyphs are `→` on an action that moves
  you somewhere, `·` as the separator, `▾` on a select, `×` for quantity (`2 × Ribeye`) and on a
  small close control, `+N` on a collapsed count, `−` for negatives and the stepper's minus, and `%`.
  `→` is never decorative.
- **Icons pair with a text label**, except inside a 34px round `.u-icon-btn`.
- **Missing glyph?** Take it from [Lucide](https://cdn.jsdelivr.net/npm/lucide-static@0.469.0/icons/)
  — same 24px grid, same stroke model, so it drops in without a seam. Paste the path data inline;
  do not add a runtime icon dependency.

The POS glyph set to expect beyond the parent's navigation and utility icons: receipt, credit card,
cash, gift card, split, printer, mail, table grid, users, clock, flame (fire a course), bell
(ready), check, x, chevrons, search, settings, wifi-off (offline).

**Brand mark.** A 34px square at 14px radius filled with `--upos-grad-primary`, carrying the
monogram `UF` in white 800/13px, followed by "UPOS Fusion" at 15px/800 and an 8.5px `.2em` kicker
naming the surface — `BACK OFFICE`, the terminal id, or the station name.

### 10 · Copy voice

The product talks like a colleague who already read the numbers. This handbook holds itself to the
same rules.

- **Declarative and second person.** Your shift, your check, your board. The system never says "I"
  and never anthropomorphises itself.
- **Numbers carry the message.** `$84.20 · 4 items` beats "Order total". A number with its
  consequence attached beats a label.
- **Statement headings and plain nouns.** Destinations are the noun of the thing — Order, Tables,
  Payments, Channels, More — rendered in the 10px label class in the nav (`ORDER`, `TABLES`) and in
  sentence case as a heading. Section heads are bare and unhedged: "Open checks", "The queue",
  "Why this table is late".
- **Kickers carry the scope.** A 10px uppercase letterspaced line above the title says what you are
  looking at and how much of it: `TABLE 12 · 4 GUESTS · SERVER DANA`. The middot is the separator
  throughout.
- **Buttons are verbs, two or three words.** Send to kitchen · Fire course · Split check ·
  Charge $84.20 · Start new order.
- **Sentence case everywhere readable**, UPPERCASE only in the label class and status words (§6).
- **AI copy is quoted and shown as a draft, never as a fact.** The dashboard insight is a sentence
  in quotation marks, attributed to the brain, with the data it rests on beside it.
- **Empty states argue a point, they do not apologize.** "No open checks. The floor is clear." beats
  "Nothing to show here."
- **No emoji. No exclamation marks. No hedging, no metadiscourse.** Nothing is seamless, powerful or
  intelligent. The system never explains why something matters — it states the thing and lets the
  number carry it.
- **Errors name the cause and the next move**, in one line, middot-separated.

Three rewrites. The left column quotes copy UPOS does not ship, and holds the only exclamation mark
in this handbook.

| Instead of | Write |
| --- | --- |
| "Payment failed!" | `Card declined · try another tender` |
| "Are you sure you want to void this item?" | `Void Ribeye · $42.00 · needs a manager` |
| "Your order has been successfully submitted to the kitchen." | `Order #1184 · sent to the kitchen` |

### 11 · POS extensions

#### Offline

The terminal keeps taking orders with no network. Offline is a state, never a wall.

- **One pill in the top bar.** `.u-pill-offline` — `--upos-status-late` fill, white 800/11px at
  `.05em`, pill radius — reading `OFFLINE · N QUEUED`, where N is the count of writes waiting to
  replay. It stays until the queue drains.
- **The pill makes two claims, and they became true at different times.** *The terminal is offline*
  is observable now: the host reads it from the platform and the terminal states it. *N writes are
  waiting to replay* is not, because no queue exists to hold them (GAP-10). Until it does, **the
  pill ships the half it can prove and says nothing about the half it cannot**: it reads `OFFLINE`,
  with no count and no `QUEUED`, and the missing queue is named beside it in the Menu manager's
  blocked treatment rather than implied by a zero. A pill reading `OFFLINE · 0 QUEUED` would be the
  worst available answer — it is a sentence about a queue, and it is the sentence a working terminal
  with an empty queue would also print, so it cannot be read as a gap. The count and the word
  `QUEUED` arrive together with the table, and not before.
- **Per-action annotation, not a dialog.** The card tender carries "will sync on reconnect" at
  400/10.5px under its label; a kitchen-sent line reads `QUEUED` instead of `SENT`.
- **Never a blocking modal**, never a disabled Charge button, never a toast for each queued action.
  One pill, and one line on each action it touches.
- **On reconnect the pill counts down and disappears.** There is no success toast; the absence of
  the pill is the message.
- The UI contract for replay: a queued write that reaches the API twice must not produce two orders.
  Idempotency keys do not exist in the POC (GAP-10).

#### Touch targets and speed

- `--upos-touch-terminal` `48px` is the minimum for anything tappable on the terminal. `.u-btn`,
  `.u-tip-btn`, `.u-tender-tile` and the `.u-qty-stepper` buttons already set it.
- `--upos-touch-kiosk` `60px` is the minimum for kiosk primary actions.
- Adjacent targets sit at least `--upos-space-gap-row` 8px apart, and two irreversible controls are
  never adjacent — void does not touch send.
- **A destructive control takes `.u-btn--ghost` at rest** — void, comp, refund, remove line — with
  its label at `--upos-ink`, not ghost's default `--upos-ink-subtle` (`#8b95a1` on white computes
  3.0:1 and fails AA at 13px; the ink label reads 16.6:1 — §12 records how far that failure
  reaches beyond this one control). Red marks a problem that exists (§4),
  and an action nobody has taken yet is not one, so the button stays quiet until it is pressed. The
  red arrives on the confirming step, where the dialog names the consequence in
  `--upos-status-late-text` and the confirm button is `.u-btn--primary` carrying the verb. There is
  no red button variant in the kit, and adding one would make red decorative.
- **Prefer a modal or drawer over navigation.** The five bottom-nav destinations are the only
  full-screen transitions in the order flow; everything else opens over the current screen so the
  check stays visible behind it.
- **Perceived response under 150ms.** Apply the local state change first, reconcile with the API
  after. A tap never waits on the network.

#### Theming contract

- Two attributes on `<html>`: `data-theme="dark"` and `data-accent="slate|teal|indigo|sky"`. Absent
  means light and slate.
- **One attribute flip changes the theme.** No recompilation, no class sweep, no per-component
  override. A component that hard-codes a hex breaks this contract.
- Dark theme moves ground, surfaces, border and ink. Status hues, allergen violet and the accent
  presets are identical in both themes — a color that means "late" means it under any lighting.
  **The ink roles are not hues and they do move**: `[data-theme="dark"]` points
  `--upos-status-late-text`, `--upos-status-ready-text` and `--upos-status-fired-text` at §4's
  on-dark column, which is the same statement §4 makes, in the place a theme is declared. The hue a
  reader sees is the same; the pairing that carries it holds contrast on the ground it is on.
- Defaults per surface: **terminal follows the operating system's setting** and offers no control of
  its own (Part II-A · Order entry · [Dark](#dark)), back office the user's choice, kitchen display
  always the dark board regardless of `data-theme`, kiosk light. The terminal's default was "light
  (kitchen glare)" while nothing on the terminal could read the room; the OS can, and a venue that
  dims the lights at six should not have to power-cycle a terminal to say so.
- Accent is per-venue branding, stored with the venue and applied at app start.

#### Kitchen display derivation

The secondary artboard drew the kitchen display in a different language — a bone-ground modernist
kit with `#ec3013` as its house accent and zero-radius chrome. Its content survives; its styling
does not.

**KDS keeps:**

- Monospace numerals for order numbers and elapsed timers (`--upos-type-mono`), sized up to read at
  two metres.
- A 60px board header carrying station identity, load counters (open tickets, average ticket, over
  target) and the clock.
- Station tabs as filters across a 78px strip — each tab showing the station name and its active
  count, with a pulsing dot when a chit on that station is late.
- A dedicated bump affordance per chit, full width, not a small target: a gloved hand must not be
  able to fire the wrong ticket.
- Chit density: a 5-column by 2-row grid at 1920×800, chits 9px apart on 12px board padding.
- Whole-chit bump on the bump bar, and expo chits that wait on every station before they can be
  bagged. (Per-item strike on tap is a UPOS addition, not artboard content — the artboard's item
  `done` state is derived from station bumps and shown only on expo chits; Part II-C specs the
  addition.)
- Plate view armed from the header, then tap a chit.

**KDS drops:**

- The bone ground `#e4e2df` and the modernist chrome. The board is `--upos-kds-board`, chits are
  `--upos-kds-inset`, ink is `--upos-kds-ink`.
- `#ec3013` as a house accent. On a board, red means late and nothing else; the accent role belongs
  to `--upos-accent`.
- Zero-radius corners and 1px rules as structure. Chits are 10px radius and separate by the 9px gap,
  not by borders.
- Archivo 900. Weights are 400, 700 and 800.
- The `rushpulse`, `upflash` and `plateflash` keyframes. Use `fl-pulse`.

Status colors on the board come from the on-dark set — `--upos-kds-status-new`,
`--upos-kds-status-late`, `--upos-kds-status-ready` — plus `--upos-status-fired` unchanged, which
holds 5.4:1 on `--upos-panel-dark`. The board root carries `.upos-kds`, the scope marker that owns
the one radius exception in the product.

### 12 · Using the kit in Blazor and MAUI

**Link two stylesheets, tokens first.**

Copy `docs/design/tokens/upos-tokens.css` and `docs/design/tokens/upos-components.css` into each
app's `wwwroot/css/`. There is no build step. The one external dependency is the Google Fonts
`@import` at the top of `upos-tokens.css`, and **the terminal does not ship it** — the file carries
the replacement as a commented `@font-face` block directly under the `@import`, and the terminal
build swaps one for the other before anything else below happens. Self-hosting is not an optional
hardening step: the terminal must render with no network (§11).

Back office — the host page, `Components/App.razor` in a .NET 8 Blazor Web App or
`Pages/_Host.cshtml` in an older Blazor Server host:

```html
<html lang="en" data-accent="slate">
<head>
    <link rel="stylesheet" href="css/upos-tokens.css" />
    <link rel="stylesheet" href="css/upos-components.css" />
</head>
```

Terminal — `Restaurant.Mobile/wwwroot/index.html`: the same two links, in the same order.
`upos-components.css` reads tokens defined by `upos-tokens.css`, so reversing them leaves every
component unstyled.

**Self-host Archivo on the terminal.** The `@import` fetches Archivo 400/700/800 from Google Fonts,
which an offline terminal cannot reach, and a terminal that loses its typeface offline fails a P0
requirement (§11). `upos-tokens.css` carries the fix in the file rather than only here: drop
`archivo-400.woff2`, `archivo-700.woff2` and `archivo-800.woff2` into
`Restaurant.Mobile/wwwroot/fonts/`, delete the `@import` line, and uncomment the three `@font-face`
rules beneath it. The back office runs on a network and keeps the `@import`; nothing else in either
file changes.

**Set the attributes on `<html>`.**

```razor
<html lang="en" data-theme="@(_dark ? "dark" : null)" data-accent="@_accent">
```

At runtime, flip them through interop:

```js
document.documentElement.setAttribute('data-accent', 'teal');
document.documentElement.setAttribute('data-theme', 'dark');   // light: removeAttribute('data-theme')
```

**Naming conventions:**

| Layer | Convention | Example |
| --- | --- | --- |
| Custom properties | `--upos-*` | `--upos-status-late` |
| Component classes | `.u-*` with `--modifier` and `.is-state` | `.u-chip-status--late`, `.u-segmented__opt.is-active` |
| Scope classes | `.upos-*` | `.upos-kds` |
| Razor primitives | `Upos*` | `UposButton`, `UposIconButton`, `UposModal`, `UposDrawer` |
| Razor domain components | plain domain nouns | `StatusChip`, `AllergenChip`, `FloorTable`, `CartLine`, `ChitCard`, `TenderTile`, `TipPad`, `QtyStepper`, `OfflinePill`, `ChannelBadge` |

Part III is the full component inventory with props and consumers. Scoped Razor CSS
(`Component.razor.css`) may read the tokens; it must never redefine them. Never write a hex in a
component — if the value you need has no token, add the token.

**Reading the device from a shared component: `IDeviceStatus`.**

`Restaurant.UI.Shared` is a plain Razor class library. It holds the terminal shell and every screen
both hosts render, and it has no MAUI reference — which is the point of it, because a component that
referenced MAUI could not be stood up in the back office's preview at all. So when the shell needed
the battery level and the connection state, it could not call `Battery.Default` or
`Connectivity.Default` to get them.

**The library owns the question and each host answers it.** `IDeviceStatus` is declared beside the
components that consume it, exposing `BatteryLevel`, `IsOnline` and a `Changed` event.
`Restaurant.Mobile` registers the implementation that reads MAUI Essentials; the back office
registers the one that reads nothing. The dependency points from the host to the library and never
the other way, which is the arrangement that lets one shell render truthfully in two places.

**Both readings are nullable, and the null is the whole design.** `double?` and `bool?` rather than
`0` and `false`, because a host that cannot read a battery has not read a flat one and a host that
cannot see a network has not seen it fail. The back office's implementation returns null for both and
is named for what it is rather than for the host that registers it — it is the library's own answer
for any host without a device, and a WASM build or a test would want the same one. **A design system
must not ship a placeholder that is indistinguishable from data.** Every other blocked control in
this product is drawn quiet and named as a gap (the Menu manager's treatment); an invented battery
would be the first one drawn as though it were real, and it would be the one a person acts on. So the
rule is stated once, here, and Order entry's instrument cluster implements it: **render the reading,
or render the absence of the reading, and never render a number nobody measured.**

**Reading the OS theme from the same shared component: `ISystemTheme`.**

The terminal follows Android's light/dark setting (Part II-A · Order entry · [Dark](#dark)), and the
setting is a MAUI reading the shared library cannot take. So it is answered in exactly the shape
above and deliberately not in a second one: `ISystemTheme` is declared beside `IDeviceStatus`,
exposing a nullable `Theme` and a `Changed` event; `Restaurant.Mobile` registers the implementation
that reads `Application.Current.RequestedTheme` and subscribes to `RequestedThemeChanged`; the back
office registers the one that reads nothing. **Two questions in one shape is one thing to learn.**

Three details are load-bearing.

- **The reading is nullable and null writes nothing.** A host that cannot read a system theme has not
  read a light one. If it answered light, the shell would strip a `data-theme` attribute it never
  set — and in the back office it would strip the one the rail's own toggle just wrote, flipping the
  whole page around the preview frame standing in it. Answering null leaves the attribute alone,
  which is why the preview shows the terminal in whichever theme the person working on it chose.
- **`RequestedTheme` and not `UserAppTheme`.** The first is the platform setting; the second is the
  app's own override of it. The terminal sets no override, and reading the override would have the
  implementation report its own answer back to itself.
- **Subscribed, not sampled.** The event is the whole point: a reading taken once at startup leaves a
  unit in the theme it was switched on in.

The shell writes §11's contract and nothing else — `data-theme` on `<html>`, through the same
`uposShell.setTheme` interop the back office's rail calls. It lives in the shell because the shell is
the terminal's only chrome, which is the same reason the shell carries the clock.

**Bootstrap: remove it.**

Rationale:

- The Fluid look is unreachable through Bootstrap's component chrome. Its radii, shadows, focus
  rings, buttons and modals all have to be overridden before one UPOS screen looks right, which
  means shipping two design systems and fighting one of them on every screen.
- Current usage is shallow. Both projects carry Bootstrap from the .NET template, and no screen the
  artboards define depends on its grid or components.
- Layout here is flex and grid with `gap` (§2). A 12-column grid has nothing to do.
- Weight and offline: every byte ships to an Android device that has to work without a network. The
  token kit is two CSS files and no JavaScript.

Migration:

1. Delete the Bootstrap `<link>` tags and the vendored `bootstrap/` folders from
   `Restaurant.Blazor/wwwroot` and `Restaurant.Mobile/wwwroot`.
2. Add the two UPOS stylesheets in their place.
3. Delete the template pages that only exist to demo the template — `Counter`, `Weather`,
   `SurveyPrompt` — and their nav entries.
4. Translate the markup: `btn btn-primary` → `u-btn u-btn--primary`; `card` → `.u-stat-card` or a
   panel `div` at `--upos-radius-panel`; `modal` → `.u-modal` over `.u-scrim`; nav links →
   `.u-nav-item`; `<table>` → a list of `.u-data-row` elements, because rows never share a table
   border (§2).
5. Keep `app.css` for layout scaffolding only. Any color, radius, shadow or font value still in it
   moves to a token reference.
6. Verify each app in light and dark across all four accents.
   `docs/design/tokens/preview.html` renders every token and component class for comparison.

**What the kit does not cover yet.** These are honest gaps, not oversights to work around silently:

- **`.u-chip-allergen` has no theme rule.** §5 specifies the inversion — on a dark surface the fill
  becomes `--upos-allergen-text` and the ink `--upos-kds-ink` — and `AllergenChip` ships the class
  for it, but nothing selects it from `data-theme`, so a call site that does not pass the flag
  renders the light pairing on a dark ground at 2.81:1. It is latent rather than live: no allergen
  chip renders anywhere today, because `MenuItem` has no allergens (GAP-05). The fix is a
  `[data-theme="dark"]` rule in the kit rather than at each call site, and it has to be written so
  that the Menu manager's toggled-off state still outranks it.
- **Elevation does not move with the theme.** `--upos-shadow-card`, `--upos-shadow-modal` and
  `--upos-shadow-button` are tuned against a light ground and read as almost nothing on the dark
  one. Nothing loses its outline today, because every surface that depends on a shadow for its edge
  also carries a 1px `--upos-border`, but a dark elevation set is missing and the terminal's dark
  treatment is the first surface that would spend one.
- **`.u-toast` reuses `--upos-shadow-modal`.** Right family, heavier than a toast needs. The parent
  ships the value the kit is missing — `--shadow-toast: 0 20px 44px -20px rgba(20,25,31,.9)` in
  `tokens/elevation.css`. Transcribe it as `--upos-shadow-toast` and point `.u-toast` at it.
- **Two ink steps only.** `--upos-ink` and `--upos-ink-subtle`; use opacity on `--upos-ink` for
  anything between them. The one intermediate step the kit ships today is `--upos-ink` at `.66`, on
  `.u-segmented__opt`. Read the next entry before reaching for `--upos-ink-subtle`.
- **`--upos-ink-subtle` does not meet AA on a light surface.** `#8b95a1` is the parent system's label
  step, transcribed unchanged (§1), and it is the ink under every kicker, label, caption, meta line
  and subtext in the product. It measures **3.0:1 on `--upos-surface`**, **2.8:1 on
  `--upos-surface-inset`** and 2.7:1 on the ground — under the 4.5:1 floor §11 makes binding, at
  every size UPOS ships it, since the large-text allowance starts at 24px regular and this token's
  largest role is 13px. In dark theme the token does not move and the surfaces do, so the same
  pairing reads 5.3:1 on `--upos-surface` and 5.6:1 on `--upos-surface-inset` and holds: **this is a
  light-theme exposure.** In the kit it is the default ink of four recipes that render text —
  `.u-pill`, `.u-badge-channel`, `.u-btn--ghost` and `.u-nav-item` — and in Part II it is every line
  specced `--upos-ink-subtle` over white. `.u-icon-btn` is the one use that is not text: an icon is
  governed by the 3:1 non-text rule (1.4.11) rather than by 4.5:1, and 3.0:1 clears that with nothing
  in hand. The threshold is whether text carries information, not whether it
  is interactive — a badge reading `KIOSK` at 10px owes the floor whether or not it can be tapped.
  **Three rulings already override it, and every call site under them is compliant**: §11 forces a
  destructive control's label to `--upos-ink`, `.u-segmented__opt` takes `--upos-ink` at `.66` (§7),
  and Guest-facing rules gives the token no role on the kiosk at all. **The remedy is the step the
  kit already ships** — `--upos-ink` at `.66`, which measures 5.3:1 on `--upos-surface` and 5.2:1 on
  `--upos-surface-inset` — applied either recipe by recipe or by re-basing the token itself onto that
  value, which clears every call site at once and shifts the tone of every quiet line in the product.
  **This is a live AA exposure against the target §11 states, not a cosmetic preference.** How far to
  take it is the dev team's call, and this entry records it rather than settling it.
- **The on-dark status tokens are named `--upos-kds-status-*`** but apply to every dark surface
  (§4). Read the name as "on dark", not "kitchen only".
- **`.upos-kds` is a scope marker by convention.** It has no rule of its own; the KDS tokens sit on
  `:root` and resolve anywhere they are referenced.
- **Chrome dimensions are literals, not tokens** — `.u-icon-btn` 34px, back-office sidebar 224px,
  terminal top bar 76px, bottom nav 78px, KDS header 60px. Part II carries them per screen.
- **Tracking is not tokenized.** Set `letter-spacing` from §6's table.
- **`overflow:hidden` on pill-radius elements is not applied kit-wide.** §7 states the rule; the kit
  sets it on `.u-qty-stepper` and `.u-chit` only. Chips, pills, the segmented track and bars rely on
  their own fills not overflowing today — set it at the call site whenever a child could paint past
  the corner, and fold it into the recipes when one does.
- **No numeric-entry or keypad pattern.** Nothing in the language covers a number a person types.
  `.u-qty-stepper` is a two-button increment, which is right for a cover count and wrong for a
  cash-drawer count — a dozen denomination fields on a touch terminal, each taking a figure. A price
  override, a manual discount, a partial-refund amount and a manager PIN all want the same missing
  thing: a numeric field at `--upos-touch-terminal`, and behind it an on-screen keypad, since a MAUI
  terminal has no keyboard. Neither is drawn in either artboard. The `.u-input` entry below is the
  same hole seen from one screen; the need is wider than that screen.
- **No selection control.** There is no checkbox, no radio and no multi-select row anywhere in the
  language, and neither `CartLine` nor `DataRow` exposes a selection prop. Any list a person picks
  from — the lines of a partial refund, a bulk 86, a set of records to export — has nothing to build
  from. The option pills in the Modifier modal and on the kiosk item screen are call-site controls
  bound to one purpose, not a general selection recipe, and the segmented control picks a view rather
  than a set.
- **No input recipe.** There is no `.u-input`. The one screen that needs it in this handoff is the
  menu manager's add-item and add-group forms, which Part II-B sends to §2's input contract by name,
  but the need is not menu-manager-shaped: every field in the numeric-entry entry above wants the
  same recipe, and so does the manager PIN behind an approval, which no screen draws yet and which
  GAP-09 records has no model to draw from. §2 specs the behavior in prose instead: fill
  `--upos-surface-inset`, 1px `--upos-border`, `--upos-radius-inset`, `--upos-type-body`,
  placeholder `--upos-ink-subtle`, minimum height `--upos-touch-terminal` on the terminal and
  `--upos-touch-kiosk` on the kiosk, and on focus the border goes `--upos-accent` while the fill
  goes `--upos-surface`. Write that at the call site until a recipe exists. Every value is already
  a token, so nothing is hard-coded meanwhile.
- **The kit implements the hover lift, not the hover fills.** `.u-btn--secondary` and
  `.u-btn--ghost` lift; the fill and ink changes in §8's table are set at the call site.

---

## Part II · Screen specs

Every spec below uses [the screen-spec template](#the-screen-spec-template). Layout dimensions come
from the artboards; styling rules come from Part I.

### Part II-A · Terminal

The terminal is one 1440×900 shell at `--upos-radius-panel` 26px (the artboard draws 20px),
`--upos-surface`, clipped, with a fixed 76px top bar and a fixed 78px bottom nav. Everything between
them is a destination, and everything that is not a destination opens over the destination. Order
entry carries the shell; the other seven specs assume it.

**1440×900 is the terminal.** Two narrower layouts exist and both are declared in one place:
[Order entry · Width bands](#width-bands) puts that screen into two panes at or below 1000px of
shell width and into one column at or below 770px. The first is a design — a 10.1" panel in portrait
is a fleet candidate and 800×1280 is a shape somebody chose. The second is still a provisional
degradation, because it reached a 393px device before the fleet was chosen. Both apply to that
screen and to no other spec below.

**The terminal follows the operating system's light/dark setting**, and that ruling does apply to
every spec below, because it moves no layout at all: it is §11's theming contract, driven by the
host. [Order entry · Dark](#dark) states it, and it is the one thing in Part II-A written once for
all eight screens.

Three rulings hold across all eight specs, so no spec below repeats them. **Every round close, mirror
and utility control is `.u-icon-btn`** — 34px at `--upos-radius-pill` — centered in a hit area of at
least `--upos-touch-terminal` 48px. The artboard draws those controls at 30px, and the payment
screen's guest-mirror button at 36px; both are under §11's minimum, and §11's rule outranks the
artboard's pixels. **Every quantity control is `.u-qty-stepper`**, whose buttons already set
`--upos-touch-terminal`; the artboard draws its steppers between 24px and 40px. **Every
`.u-segmented` track clears `--upos-touch-terminal` 48px**, passed as the control's minimum height;
the artboard draws its segmented options between 9px and 33px tall, and the same minimum holds
whether the track picks a view, a delay or a split. Where a spec names an icon button, a stepper or a
segmented track it means those shipped sizes.

#### Order entry

**Purpose.** You build a check here — pick a category, tap items, adjust the lines, send them to the
kitchen and charge.

**Layout.** The shell's chrome belongs to this spec because every destination inherits it.

- **Top bar, 76px**. This is the glass top bar §7 rations `--upos-blur-glass` for, and the only
  element in the product that takes it: `--upos-surface-veil` under
  `backdrop-filter: blur(var(--upos-blur-glass))`, 1px `--upos-border` bottom, padding `0 28px`. The
  artboard fills it flat with `--upos-surface-inset`; the veil is what makes the blur mean anything,
  and it is the same token `.u-segmented` takes (§7). Three
  groups: a 26px `--upos-grad-primary` mark, the venue and terminal id at 800/15px
  (`Riverside Grill · Counter 2`) and the offline pill slot on the left; the server, then the
  **instrument cluster**, then the clock at 700/13px in `--upos-ink-subtle` on the right.
- **The instrument cluster — connectivity and battery — sits between the server and the clock**, at
  `--upos-space-gap-inline` 10px, and it exists because the terminal hides Android's status bar
  (Handheld · *The host's system bars*). That bar carried the clock, the signal and the battery; the
  clock was already here and the other two had nowhere else to go. Identity reads left, instruments
  read right, and the clock ends the bar where it always did — so on the handheld, where the server
  drops, the right of the bar is exactly the three things the status bar used to show.
  - **Connectivity** is a 15px stroke glyph (§9's dense band), `currentColor` on the bar's
    `--upos-ink-subtle`: a wifi mark when the terminal has a network, the wifi-off mark in
    `--upos-status-late-text` when it does not. It is an instrument and it is drawn in both states,
    which is what separates it from the offline pill below.
  - **Battery** is a 15px battery glyph whose fill is the charge, followed by the level at
    `--upos-type-mono` and `--upos-space-gap-chip` 7px. It inks `--upos-status-late-text` at or below
    **20%** — §4's rule that red marks a problem that exists, and a terminal about to die mid-service
    is one. The 20 is a policy literal recorded here, like the 770 and 1000 of the width bands; it is a
    threshold a condition tests, not a value a declaration takes, so §12's add-the-token rule does
    not reach it.
  - **Neither is ever drawn from a guess.** A host that cannot read the device renders no glyph, no
    percentage and no plausible-looking dial; the cluster is replaced by one blocked chip in the
    Menu manager's treatment reading `BATTERY AND SIGNAL · NO DEVICE READING`, short form
    `NO READING`. The development preview is that host, and a preview showing a battery would be
    inventing the one thing on the bar a person would act on.
  - **The cluster and the offline pill are not the same statement.** The cluster is instrumentation:
    permanent, quiet, present online and offline, answering *what is the device doing*. The pill is
    §11's operational mode banner: absent while online, red when the terminal is running without a
    network, answering *what is this terminal doing about it*. They agree when the terminal is
    offline, and a phone's status bar and an app's offline banner are the same pair.
- **Bottom nav, 78px**, `--upos-surface-inset` and no blur, 8px between items — `--upos-space-gap-row`
  and §11's floor for adjacent targets, which the handheld rule leans on. 1px top hairline. Five `.u-nav-item`
  buttons, each `flex:1` capped at 150px, `--upos-radius-inset`, a 17px icon over a 700/10.5px
  label — ORDER · TABLES · PAYMENTS · CHANNELS · MORE. The active destination fills with
  `--upos-grad-primary` and white ink; the rest are `--upos-ink-subtle` on transparent. MORE is a
  placeholder in this handoff and renders one statement line.
- **Category rail, 170px**, inset fill, right hairline, padding `14px 10px`, 6px gaps. One button per
  category at `--upos-radius-inset`, 700/13px, active on `--upos-grad-primary`.
- **Item grid**, fills the middle, 22px padding, its own scroll. Above it, right-aligned, the
  `ITEM INFO` mode pill at `--upos-radius-pill` and `--upos-space-pad-pill` (the artboard draws
  `8px 14px`), 700/11px. The grid is
  `repeat(auto-fill,minmax(190px,1fr))` at 16px gaps. A tile is `--upos-surface`, 1px
  `--upos-border`, `--upos-radius-card` 18px, `--upos-shadow-card`, 18px padding, 6px column gaps:
  name 700/14px, price 800/15px in `--upos-accent-deep`, then `.u-chip-allergen` chips.
- **Cart panel, 380px**, inset fill, left hairline, three bands. Header `18px 22px` above a
  hairline: the check label at 800/14px and a loyalty pill button. Line list scrolls at `14px 22px`,
  12px between lines. Footer `18px 22px` under a hairline.
- **Cart line**: left, `{qty} × {name}` at 700/14px, the mods line at 400/12px `--upos-ink-subtle`,
  then allergen chips. Right, a send-one `.u-icon-btn`, then a `.u-qty-stepper` whose `−` and `+`
  bracket the line total at 800/14px in a 52px right-aligned slot.
- **Footer**: Subtotal and Tax rows 700/13px `--upos-ink-subtle`, Total 800/20px, a 48px
  `.u-btn--secondary` send-all button, and a 58px `.u-btn--primary` carrying `Charge $NN.NN` and
  `--upos-shadow-button`.

**States.**

- Category selected or not; exactly one is always selected.
- Item available, or 86'd — opacity `.5`, the name struck through, the price replaced by a red `86'D`
  pill (`.u-chip-status--late`), and no response to a tap. The tile keeps its place in the grid (§4).
- Item info mode armed or off. Armed, the pill fills with `--upos-grad-primary`.
- Cart empty — `No items yet — tap the menu to build the order.` at 400/13px `--upos-ink-subtle`.
- Line not sent (paper-plane glyph on the inset) or sent (check on `--upos-grad-primary`).
- Send-all at rest reads `SEND ALL TO KITCHEN` and confirms as `SENT TO KITCHEN` for 2s. Draw the
  confirmation's check as an inline SVG, not a `✓` character (§9).
- Loyalty control: `Identify guest`, or the identified guest at `M. RIVERA · 420 PTS` in
  `--upos-accent-deep`.
- Check label: `Order #482 · Dine In` for a counter check, `Table T5` once the check belongs to a
  table.
- Offline adds the top-bar pill and the per-action annotations — see Offline behavior.

**Interactions.**

- Tap a category to filter the grid. Nothing navigates.
- Tap a tile: a plain item joins the cart directly and merges with a matching line at `qty + 1`; a
  burger or a drink opens the Modifier modal; any tile in info mode opens the Item info modal; an
  86'd tile does nothing.
- The `ITEM INFO` pill toggles info mode and closes any open info item.
- `−` removes one and drops the line at zero; `+` adds one.
- Send-one marks that line sent; send-all marks every line. Either one moves the active table to
  `ORDERED` on the floor plan.
- `Charge` goes to Payment. The loyalty pill toggles the guest identity.
- The bottom nav is the only full-screen transition in this flow; everything else opens over the
  check (§11). Modals rise with `fl-rise` at `--upos-dur-slow`. Press feedback is the ripple tint —
  ship no `:hover` transforms to `Restaurant.Mobile` (§8).

**Data.**

- Grid: `MenuItemDto` from `GET /api/menu`, grouped by `Category` to build the rail; the 86'd state
  reads the DTO's availability flag.
- The cart is client state. No `Order` exists until you send.
- Send builds a `CreateOrderDto` with one `OrderItemDto` per line, posts it to `POST /api/orders`,
  and the API broadcasts `ReceiveNewOrder` on `/hubs/orders`. The order comes back as an `OrderDto`
  at `OrderStatus.Pending`, then `Confirmed` when the kitchen accepts it.
- Sending one line has no endpoint — the POC posts a whole order.
- Money is client-side: subtotal from the lines, tax at the venue's rate, total from both.
- The loyalty control has no binding; no loyalty entity exists in the POC.

**Gaps.**

- GAP-01 — `MenuItem` has no modifier groups or options, so a line's mods text has nothing to bind to.
- GAP-02 — no combo entity, so a combo line and its upcharge are free text.
- GAP-04 — `Order` has no channel or order type, so `Dine In` in the check header is a literal.
- GAP-05 — `MenuItem` has no allergens, so every violet chip in the grid and the cart is design-only.
- GAP-12 — no loyalty account entity; the cart-header loyalty toggle has nothing to attach to.

##### Width bands

Order entry is drawn three ways and the shell's own width picks between them. Nothing sniffs a
device, nothing reads a user agent, and no host passes a flag: the two steps are container queries
on the shell, so the layout that suits the panel is the layout that appears on it.

| Band | Shell width | Layout |
| --- | --- | --- |
| Wide | 1001px and up | Three panes. The whole spec above. |
| Tablet | 771-1000px | Two panes. Rail as a chip row, cart docked at 340px. |
| Handheld | 770px and below | One column. Cart behind a summary bar as a sheet. |

**Both steps are `max-width` and the narrower one is written second.** They overlap on purpose. An
exclusive pair - `max-width: 1000px` for the tablet and `min-width: 771px` for the wide layout -
leaves a shell 770.5px wide matching neither and falling back to the layout it fits least. Two
overlapping ceilings with the narrower stated last cannot have a hole in them: every width matches
at least the widest condition it is under, and the last matching block wins.

**1000 is where the three panes stop meaning anything.** 170px rail + 380px cart + 44px of grid
padding + two 190px tiles and their 16px gap is 990px. Under that the grid falls to one column and
draws a single tile stretched - 306px wide at 900px of shell, which is a card with a hole in it. 990
rounded up to the nearest hundred, so the number reads as what it is. The top bar agrees from inside
the band: measured in the preview, the 1440 bar's content wraps at 946px.

**770 is where the two panes stop.** A 340px cart, the page step at each grid edge and two 190px
tiles with their 16px gap is 764px, rounded up to the nearest ten. Up and not down, because the
rounding has to fall on the side that keeps the band honest - a tablet band reaching under 764 draws
the same stretched tile the 1000 step exists to remove. Measured at 771px the grid gives two columns
of 193.5px; at 770 the layout is the handheld's.

**770 replaces the old handheld step of 800**, which was the three-pane's own floor - 170 + 380 + 44
+ one 190px tile = 784, rounded up - and which is no longer the question being asked. It also could
not stay: `max-width` is inclusive, the 10.1" tablet in portrait is exactly 800px wide, and a step at
800 handed the named tablet the phone's layout.

**The density inverts at the top step, and that is the point.** At 1001px the wide layout draws two
tiles; at 1000px the tablet draws three. The rail and the cart together cost 550px and the cart alone
costs 340, so the band is exactly where the rail stops paying for itself. The rail is not lost - it
is the chip row, in the same fill with the same selection rule.

**Neither number becomes a token.** A custom property cannot be read inside a `@container` or
`@media` condition, so `--upos-bp-tablet` would be a token nothing could spend. §12's add-the-token
rule governs a value a declaration takes; these are values a condition takes, and they stay literals,
recorded here.

**The steps measure the shell, not the window.** Container queries on the element Part II-A calls
"one 1440x900 shell", not viewport media queries, because the shell is what the panes have to fit
inside and the viewport is only sometimes the same thing. On the device they are identical. In the
back office's development preview they are not: the preview stands the shell in a fixed frame, so a
viewport rule would flip a 1440px frame to a narrow layout the moment the browser window narrowed,
and would report the opposite of the truth.

##### Tablet portrait

**The case.** A 10.1" Android tablet is 1280x800 CSS pixels whichever panel it ships - a 1920x1200
screen at roughly 224ppi buckets to hdpi at a device pixel ratio of 1.5, a 1280x800 screen at roughly
149ppi is mdpi at 1, and both land on the same viewport. Portrait is that pair rotated: **800x1280**.
It is a named fleet candidate and portrait is a real orientation, so this is a design and not a
degradation.

**What the shape asks for.** Not enough width for three panes, and a great deal of height. 800x1280
leaves 1126px between the shell's two bars, which is 226px more than the whole 1440x900 terminal is
tall. Every decision below spends that height rather than fighting the width.

**Two arrangements fit, and the docked cart wins.**

- **Cart docked, rail as chips - what ships.** The check is never off the glass, which is the one
  thing the 1440 design is built around, and the height pays for it: measured, the line list stands
  11 lines before it scrolls at 800x1280, against 5 at 1440x900. What it costs is a grid column -
  two tiles abreast at 208px rather than the three a full-width grid fits.
- **Cart as the handheld's sheet, grid full width.** It buys that third column and pays for it by
  putting the check behind a tap and a scrim, on a device with 600px of spare height to stand the
  check in. It also carries the summary bar, the sheet, the scrim and the three-lines rule, every one
  of which exists because a 393px phone has nowhere to put a panel. This panel has somewhere.

A third arrangement - the cart docked along the bottom edge under a full-width grid - was not taken.
The cart is a tall narrow column of three bands; a wide short box is a different component, so it
would be a redesign rather than a reuse, and it turns the 1440 design's left-to-right reading through
ninety degrees for no gain the height does not already give.

**So the tablet is the 1440 layout with one move made, and the move is the handheld's.** Everything
below that is not the grid template is a rule the handheld already ships, hoisted up a band so both
spend it. Nothing here is a new pattern and no new component exists.

**Layout.** Everything not named below is unchanged from the spec above.

- **Two columns, two rows.** `minmax(0,1fr) 340px` across, `auto minmax(0,1fr)` down. The chip row
  takes row 1 of column 1 and the menu row 2; **the cart spans both rows of column 2**, so it keeps
  the full-height panel identity it has at 1440 - one pane, top bar to bottom nav, behind its left
  hairline. The chip row therefore sits over the menu only, and its own bottom hairline reads as the
  menu's header rule rather than as a band laid across the whole destination.
- **Category rail, 170px column to the handheld's chip row, 62px.** Identical:
  `--upos-surface-inset` behind a 1px `--upos-border` bottom, `7px var(--upos-space-page)`,
  `--upos-space-gap-chip` between chips, `overflow-x:auto`, no wrap, each chip `--upos-radius-pill`
  at `0 16px` clearing `--upos-touch-terminal`, filled `--upos-grad-primary` when selected.
  `flex:none` and not the kiosk strip's `flex:1`, which is what keeps a chip the same size at 800px
  as it is at 393px.
- **Item grid: the tile, unchanged, at `auto-fill minmax(190px,1fr)`.** No rule is written for it.
  The grid gets 432px - 800 less the cart and less the page step at each edge - and draws two tiles
  at 208px, measured. The tile does not take the handheld's `ListRow` form: two abreast is a grid,
  and the row form is for the width where a grid is no longer available.
- **Grid padding 22px to `var(--upos-space-page)`.** Those 16px are 16px of tile, and they are what
  turn a two-tile fit with 20px of slack into one with 36px - more than a classic scrollbar takes on
  a host that draws one, which matters because a grid sized to the last pixel drops to one stretched
  column the moment anything takes a pixel from it.
- **Cart panel, 380px to 340px, docked, otherwise untouched.** Same three bands, same inset fill,
  same left hairline, same scroll. No summary bar, no sheet, no scrim, no close control: those
  elements are in the DOM at every width and stay `display:none` above the handheld step.
- **The 340 comes from the check, not from the leftovers.** A cart line is two boxes: 211.94px of
  controls at `flex:none` - the send button and the stepper bracketing a 52px total slot - and the
  title, which takes the rest and wraps. Measured across the seed menu, the widest line's own
  min-content is 293.24px, and with the page step at each side this pane gives the line 312px. No
  line overflows the pane, with 18.76px in hand. The grid is then *checked* against what is left
  rather than sized by it, and it clears by 36px. **376px is the widest cart two tiles would still
  allow and it was not taken**: it leaves the grid nothing and the check gains 36px it does not need.
- **The check's three bands keep 18px top and bottom and take the page step at their sides.** 22px is
  a 1440 figure; on a 340px pane it is 13% of the width. The handheld sheet one band down makes the
  same move on all four edges and states its reason as "a sheet is a page"; this pane is not a page,
  so only the sides move.
- **What the narrower pane costs is wrapping, and it is a difference of degree.** The 1440 pane gives
  the line 336px and already wraps two of the five seed names. The tablet gives 312px and wraps more
  of them. Below the min-content floor a title wraps to a further row rather than the panel breaking,
  so this is a tighter check and not a fragile one.
- **The cart header wraps to two rows**, and the order is set rather than left to the source. The
  design header is three things - label, loyalty, close - and it would fit one row; what does not fit
  is this build's two blocked GAP pills, which are development annotations rather than screen
  content. So the second row is an artefact of the scaffolding and not of the design.
- **Top bar: 76px, unchanged, with the blocked chips on their short labels.** The height stays
  because height is the thing this panel has; the server name stays, because a 10.1" counter tablet
  is not a device whose holder is self-evidently the server; the offline pill keeps its wifi-off
  mark. Only the chips shorten - `OFFLINE QUEUE · GAP-10` becomes `GAP-10` - and that is forced for
  most of the band and chosen over the top of it: the 1440 bar's content is measured to wrap at
  946px, and rather than a third threshold 54px above the break, the band that stops drawing the rail
  also stops drawing the long form of a label whose short form names the same gap.
- **Bottom nav: 78px with its labels.** The handheld's icon-only strip is not taken here. The five
  labels floor the strip at 442.93px, which overflows 393px and fits 800px with 329px to spare, so
  the words stay and the icons stay at 17px.
- **The footer's tax-and-tender paragraph stays.** The handheld folds it for want of 72px; this panel
  has 1126px of height and no reason to.

**States.** Every state in the spec above holds unchanged, and the three the handheld adds do not
exist here: there is no sheet to open or close, no summary bar to empty, and the chip row's
scrolled-or-at-rest state is the handheld's, carried over with the row. Nothing is added.

**Interactions.** Tap a chip to filter and tap a tile to add, exactly as at 1440. No hover, at any
width - §8 puts every lift inside `@media (hover:hover)` and a tablet reports `hover: none`. The
horizontal scroll belongs to the chip row and to nothing else on the screen.

**Not solved at this width, deliberately.**

- **Landscape.** 1280x800 is a wide-band shell and takes the three panes with a three-column grid; it
  needs no rule and has none. It is not verified on hardware.
- **The other seven Part II-A screens.** Unchanged from the handheld subsection's answer: they are
  drawn at 1440x900 and get no rule here. Order entry is the screen with a band scheme because it is
  the screen that reached a device.
- **Legibility.** A CSS pixel on Android is 1/160 inch against the preview's 1/96, so §6's ramp
  renders smaller in the hand than in the frame - the same exposure the handheld subsection records,
  and the same answer: if the fleet settles on a panel that needs it, the fix is a type role in
  Part I and not a local override in a screen spec.
- **Density.** No second cart column, no compact row, no swipe-to-remove. Every action is a tap on a
  target clearing `--upos-touch-terminal` 48px.

**Gaps.** The same five the spec above cites - GAP-01, GAP-02, GAP-04, GAP-05, GAP-12 - carried
across unchanged. Width changes no binding and this subsection introduces no new gap.

##### Handheld

**This subsection is provisional.** Order entry went to a real device before the fleet was chosen: a
Datalogic Memor 20, a rugged 5.7" Android handheld at 1080×2160 and 440dpi, which the WebView reports
as a **393×785 CSS-pixel portrait viewport** — the whole panel, because the terminal hides Android's
status and navigation bars rather than sharing the screen with them (see *The host's system bars*
below). That figure has moved twice and it is worth reading the sequence, because two of the three
numbers were right about a terminal this one is not. It read 393×785 while the window drew edge to
edge *underneath* both bars, and that 785 was a defect: the shell was measuring 72px of chrome it did
not own, and it was clipped at both ends. It read 393×713 once the window was fitted to the bars —
correct, for a terminal that shares its screen with the host. It reads 393×785 again now that the
bars are gone, and this 785 is the device: the same number, arrived at by removing the bars rather
than by ignoring them. The three-pane layout above cannot be drawn there. It
spends 170px on the rail and 380px on the cart before a single item exists, and the grid's own
`minmax(190px,1fr)` tile inside 22px of padding needs 234px more — **784px before the screen has one
item on it, into 393px of glass.** The panes collide and the cart leaves the screen entirely.

The counter unit and this 5.7" device are both still candidates, so what follows
is a **graceful-degradation rule, not a designed-for target**: it keeps the screen usable on anything
narrow. It is not a second design. Nothing else in Part II has been drawn for it, no artboard covers
it, and when the fleet is settled this subsection is either promoted to a spec of its own or deleted.
**1440×900 stays the primary design and nothing below changes it.**

**The breakpoint.** The lower of the two steps [Width bands](#width-bands) defines: **770px**, the
point at which the tablet's two panes stop fitting. It stood at 800 when this was the only step
below 1440 and the number it was rounded from was the three-pane's floor of 784; it moved because a
band scheme was drawn above it and because `max-width` is inclusive, so a step at 800 handed a
800px-wide tablet the phone's layout. The derivation, the rounding direction, the overlap between
the two conditions and the reason neither number is a token are all stated once in
[Width bands](#width-bands) and not repeated here.

**Layout.** Everything not named below is unchanged from the spec above.

- **Top bar, 76px → 58px**, padding `0 28px` → `0 var(--upos-space-page)`. It keeps the 26px
  `--upos-grad-primary` mark, the venue and terminal id — now 700/13px, truncating from the terminal
  id with an ellipsis — the offline pill slot, the instrument cluster and the clock. **The server
  name drops.** Of the right-hand items it is the one whose reader already knows the answer: the
  person holding the device is the server. The clock stays because a check is a thing that gets
  stamped, the instrument cluster stays because this is the terminal it was added for, and the
  offline pill stays because §11 gives it a permanent slot and a handheld carried away from the
  counter is the most likely thing in the venue to lose the network. The glass treatment is
  unchanged — this is still the one element in the product that spends `--upos-blur-glass` (§7).
- **The bar is full at 393px, and two things give way when the terminal is offline.** Measured into
  365px of content: the mark and its gap take 36px, the instrument cluster and the clock take 123px
  with their gaps, and an offline pill with §11's wifi-off icon takes 95px more — leaving the venue
  and terminal id 18px, which is not a truncation, it is a deletion. Two rules recover it, and both
  drop the redundant half of a pair rather than shrinking anything.
  - **The blocked queue chip drops below 770px.** The tablet band shortens it to `GAP-10`; here it
    goes entirely. The 1440 bar carries `OFFLINE QUEUE · GAP-10`
    beside the pill; the handheld bar does not. Of the two, the red pill states the terminal's
    condition and the grey chip names a gap in the model, and on 393px of glass the condition wins.
    This is the move the footer's tax-and-tender paragraph already makes one screen over: the gap
    stands in full in the 1440 design, which is the primary one.
  - **The pill drops its wifi-off icon and keeps its word.** The instrument cluster's connectivity
    glyph is on the same bar, eight pixels away, saying the same thing in the same mark. `OFFLINE`
    is not ambiguous without a picture of it.
- **Bottom nav, 78px → the labels drop and the icons carry the destinations**, at 17px → 20px. The
  strip's own geometry does not move: 78px tall, `--upos-surface-inset`, the 1px top hairline,
  `--upos-space-gap-row` 8px between items, every item still `flex:1` over
  `--upos-touch-terminal` 48px, and the active destination still filled `--upos-grad-primary` with
  white ink. Only the word goes, and it goes because it does not fit.

  **The previous claim here was arithmetic, and the arithmetic was wrong.** It read "five items into
  393px is 72px each, and `PAYMENTS` measures under that", which divided the strip as though `flex:1`
  could shrink an item to any width. It cannot: a flex item's default `min-width:auto` floors it at
  its own min-content, an unbreakable word is its own min-content, and so **each item's floor is its
  label plus its padding.** Measured in the browser at 393px, the five floors are ORDER 67px,
  TABLES 71.63px, PAYMENTS 92.25px, CHANNELS 93px and MORE 59.05px — 382.93px — and with four 8px
  gaps and the strip's 28px of side padding that is **442.93px into 393px.** The strip does not
  compress, it overflows by 49.93px, and the shell's own `overflow:hidden` cuts whatever is last:
  MORE begins at 369.88px, so 23px of a 59px item survives and the label renders as `MO`. That is
  the clipping, and its cause is a sum. **No distribution rule fixes a sum**, which is why nothing
  about `flex`, `max-width` or the item order was ever going to help.

  Three treatments were measured against that sum before the labels were dropped.
  - **Smaller labels.** The five labels are 302.93px of the 442.93px, so they have to lose 49.93px —
    16.5%. Dropping the label class's `.16em` tracking alone saves 52.08px across the 31 characters
    and closes it, *by 2.15px*, with every label then exactly touching its own padding. That is a fit
    with no tolerance, decided by a font metric: the terminal self-hosts Archivo (§12) and any frame
    rendered on the fallback stack clips. It also spends the one property §6's label class is defined
    by — 10px uppercase paired with `.1–.2em` — to buy two pixels. Going after the size instead needs
    roughly 9px at `.06em` to leave any margin, and **a CSS pixel on this device is 1/160 inch against
    the preview's 1/96**, so a 9px label in the hand is what a 5.4px label looks like in the frame.
    This subsection already records 13px body here as legible rather than comfortable; 9px is neither.
  - **`MORE` collapsing into an overflow.** It is circular — `MORE` *is* the overflow destination, and
    folding it into another one names the same drawer twice — and it does not reach the defect. Four
    items into 393px leaves each label 65.25px, and CHANNELS needs 73px. The strip still overflows.
    MORE is where the clipping showed, not where it came from.
  - **Icon-only, which is what ships.** An item becomes a 20px glyph over nothing: five of them with
    8px gaps and 8px of strip padding fit in 393px with room to spare, every target clears
    `--upos-touch-terminal` by 30px, and the sum stops being the constraint instead of being narrowly
    beaten.

  **It stays recognisable against 1440 because everything that identifies a destination is still
  there**: the same five glyphs, in the same order, with the same active fill and the same on-dark
  ink. What the handheld drops is the redundant gloss on a strip the reader is looking straight at,
  and it drops it uniformly — a strip where only the active item keeps its word was considered and
  rejected, because one wide item beside four narrow ones reads as a broken grid rather than as a
  quiet one, and because the active destination is the one whose name the screen behind it already
  gives away. **The label does not leave the document**, only the layout: every item carries its word
  as its accessible name, so the strip is unchanged to a screen reader and the four unbuilt
  destinations still announce themselves as what they are.

  **The icon steps 17px → 20px** because it is now carrying the destination alone. §9 draws dense UI
  at 15–18px and the kitchen display and kiosk at 20–24px, and an unlabelled glyph is the second case
  regardless of how small the screen is: 20px is the bottom of that band and the smallest step that
  reads as a nav rather than as a row of specks in a 78px strip.
- **Category rail, 170px column → a horizontally scrolling chip row, 62px**, sitting at the head of
  the item area under the top bar. `--upos-surface-inset` behind a 1px `--upos-border` bottom — the
  rail's fill and its hairline, turned through ninety degrees — padding `7px var(--upos-space-page)`,
  `--upos-space-gap-chip` 7px between chips, `overflow-x:auto`, no wrap. A chip clears
  `--upos-touch-terminal` 48px, takes `--upos-radius-pill` and `0 16px`, carries the category at
  700/13px, and fills with `--upos-grad-primary` when it is selected. Same fill, same type, same
  selection rule as the rail's buttons; only the radius moves, because a row of `--upos-radius-inset`
  buttons reads as a broken grid and a row of pills reads as a filter strip. **This is Part II-D's
  browse strip** — "a strip of `flex:1` category buttons ... selected on `--upos-grad-primary`" —
  with `flex:1` dropped, because at 393px the categories have to be allowed to run off the edge
  rather than share it.
- **Item grid → one column in `MenuItemCard`'s `ListRow` form** (Part III), which is the layout the
  kiosk's list view already consumes and which already ships: `.u-menu-card--list` is a row at
  `--upos-radius-inset` that clears `--upos-touch-terminal`. **The form is reached by the container,
  not by the `Layout` parameter.** Part III rules that no component takes a touch flag, because a
  host should not have to suppress an affordance the CSS already withholds; the same argument holds
  one step over, so **no component takes a width flag either**. The screen passes `Tile` at every
  width and the container query puts the tile into the row form below 770px. `MenuItemCard` never
  learns how wide the shell is, and its call sites outside the shell — the Menu manager's cards —
  are untouched, because a container query on a container they do not sit in cannot match. Grid
  padding drops 22px →
  `var(--upos-space-page)` 14px and the gap drops `--upos-space-gap-card` 16px →
  `--upos-space-gap-row` 8px. The name sits left at 700/14px, the price right at 800/15px in
  `--upos-accent-deep` — the tile's two type overrides, kept, because they are what the terminal's
  menu reads like. **The tile does not survive one column**: a 190px square stretched to 365px is a
  card with a hole in it.
- **One column, not `auto-fill`.** A row grid at `minmax` would put two abreast at 560px and three at
  780px, which is neither the tile grid nor a list, and it would put a third layout into a rule whose
  whole purpose is that there is one. Between 393px and 770px a single column of rows is wide. It is
  also unambiguous, and the 5.7" device is the case this rule exists for. Two abreast is what the
  tablet band draws, in tiles rather than rows, above this step.
- **Cart panel, 380px → a persistent summary bar plus a sheet.** The panel has nowhere to stand, so
  it collapses behind a bar directly above the bottom nav and opens over the menu on demand.
- **Summary bar, 64px. This is Part II-D's bag bar, brought to the terminal.** The kiosk's is 96px on
  `--upos-surface` under a 1px `--upos-border` carrying `IN BAG` in the label class, the line count,
  the running total in mono, and a primary filling the bar's height; the terminal's is the same bar
  at staff scale — `--upos-surface`, 1px `--upos-border` top, padding `0 var(--upos-space-page)`:
  `IN CHECK` in the 10px label class at `.12em`, the line count and the running total at 800/15px
  with the total in `--upos-accent-deep`, then a `.u-btn--primary` at `--upos-touch-terminal` reading
  `Review`. It reads `IN CHECK` and not `IN BAG` because a guest has a bag and a server has a check
  (§10), and it says `Review` and not `Charge` because Charge lives inside the sheet, where the check
  is actually worked. The amount is on the bar and not on the button, which is the kiosk's division
  of the same two jobs: the bar reports and the button acts.
- **The sheet is the `UposDrawer` recipe on the bottom edge, not a new component.** `.u-drawer`'s
  inset flips from `top/right/bottom` to `left/right/bottom`: full width, `--upos-radius-panel` on
  the two top corners only, `--upos-surface`, `--upos-shadow-modal`, over `.u-scrim` at
  `--upos-blur-scrim`. It rises with `fl-rise` at `--upos-dur-slow` — the kit's own drawer call,
  unchanged, and no seventh keyframe (§8). Inside it the cart's three bands are structurally
  identical to the panel above and lose only their left hairline and the panel's padding, which
  becomes `var(--upos-space-page)` **on every edge** — a 393px sheet is a page, and a page has a page
  step: a header carrying the check label, the loyalty control and a close `.u-icon-btn`; the line
  list scrolling; the footer carrying Subtotal, Tax, Total, the 48px `.u-btn--secondary` send-all and
  the 58px `.u-btn--primary` Charge. Nothing in the cart is redesigned. It is the same panel, given
  the side of the screen it can have.
- **The line region asks for three lines; the cap is a band, not a percentage.** The drawer recipe's
  `max-height:82%` is a 1440 figure and it did not survive contact with the device: the sheet's own
  header and pinned footer are 339px, and against the 577px destination the device had while it still
  shared its screen with Android's bars, 82% — 473px — left the line list 98px and the totals cut the
  second line in half. The destination is 649px now that the terminal owns the whole screen and 82%
  would no longer bind, which is exactly the objection to it: a percentage that is wrong on one host
  and accidentally right on the next is not a rule. Two rules replace it.
  - The list takes `flex:1 1 calc(var(--upos-touch-terminal) * 3 + var(--upos-space-gap-line) * 3)`.
    A cart line is exactly `--upos-touch-terminal` tall — `CartLine` sets no height of its own and the
    `QtyStepper` inside it carries the touch floor — and the list stacks lines at
    `--upos-space-gap-line`. So the request is three touch floors and three gaps: the two between the
    lines, and one more so the top of the fourth line's gap is inside the region and a full check
    reads as scrollable rather than as finished. It is a **basis and not a floor**, so on a host too
    short to hold header + three lines + footer the list gives way and the totals, `SEND ALL TO
    KITCHEN` and Charge stay whole rather than falling off the bottom. It is a floor as well as a
    ceiling in practice, which is deliberate: the sheet stands the same height at zero, one, two and
    three lines, so it does not grow under the thumb as items are tapped in and Charge does not move.
  - The cap is `calc(100% - var(--upos-space-gap-section))`. The scrim keeps one section gap at the
    head of the destination and the sheet takes the rest, which is a visible strip of the menu on
    every host rather than a percentage that has to be re-derived for each one. Measured on the Memor
    20 at 393×785: the destination is 649px, the cap is 623px, and the sheet asks for 548px — 109px of
    header, 208px of list, 230px of footer — so the cap does not bind and the scrim band is 101px. It
    was 29px against the 577px destination the device had while the system bars were still on screen,
    and **nothing had to be re-derived when they went**: the sheet stands the same 548px and the
    recovered 72px went to the band. That is the difference between a cap expressed as a gap and a cap
    expressed as a percentage, and it is why the rule survived a change in the viewport it was written
    against.
- **The footer's tax-and-tender paragraph folds at this width, and only at this width.** It is the
  one thing in the pinned footer that is not the check, and on a 393px sheet it is 72px — more than a
  line and a half of the check it annotates. Nothing it names goes unsaid: the Tax row still reads
  `NO TAX RULE · GAP-08` in position and the Charge block still reads `PAYMENT SCREEN AND PAYMENTS
  DOMAIN · GAP-08` under it. GAP-13 is the one statement the fold costs, and it stands in full in the
  1440 panel, which is the primary design.
- §11 already prefers a drawer over navigation, and this is that rule doing its job at a width where
  the grid and the check cannot both be on the glass: the check is one tap away and the menu is never
  navigated off.

**The host's system bars.** The account belongs here because it is what sets the viewport every
figure above is measured against, and it has two chapters.

*The first was a defect.* The WebView filled the whole 1080×2160 panel while Android still drew both
bars over it, so the shell ran under the 66px status bar at the head and the 132px navigation bar at
the foot: the 26px mark clipped from above, the lower half of the 78px nav underneath. The cause was
the host and not the stylesheet. .NET MAUI 10 puts every Android window into edge to edge on every
API level — `Microsoft.Maui` calls `WindowCompat.SetDecorFitsSystemWindows(window, false)` in the
activity's `OnCreate`, and the generated theme's `maui_edgetoedge_optout` is only read on API 35 and
up, while the Memor 20 is API 28. `MainActivity` answered it by calling the same method with `true`,
so the WebView was laid out between the bars and the shell's `height:100%` was 393×713. **No rule in
any stylesheet changed**, which was the point: the shell was always right about the box it was
handed, and it was handed the wrong box. `env(safe-area-inset-*)` was never the answer — that WebView
reports zero for all four, because Android exposes display-cutout insets there and not system-bar
insets, and padding by four zeroes is a rule that looks like a fix and is not.

*The second is a ruling, and it supersedes the first.* **The terminal owns the whole screen. Both
system bars are hidden.** The reason is operational and not cosmetic: the navigation bar's back and
home controls are a way out of the app, and a terminal a member of staff can leave mid-order is a
terminal that loses a check. Hiding the bars is the only thing that removes the control; making the
app the launcher's default or trapping `onBackPressed` covers one door and leaves the other open.

**The two are one knob, turned opposite ways, and only one of them can win.** Below API 30
`WindowCompat.SetDecorFitsSystemWindows` is not a distinct API — it clears (for `true`) or sets (for
`false`) exactly three bits on the decor view, `SYSTEM_UI_FLAG_LAYOUT_STABLE`,
`SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION` and `SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN`, and those are the
same three bits `WindowInsetsControllerCompat.SystemBarsBehavior` sets when it is given
`BEHAVIOR_SHOW_TRANSIENT_BARS_BY_SWIPE`. Calling both leaves the result decided by call order, which
is not a design. So the activity states the edge-to-edge layout it wants — `SetDecorFitsSystemWindows
(window, false)`, which is also what MAUI itself does — and then hides the bars through
`WindowInsetsControllerCompat.Hide(WindowInsetsCompat.Type.SystemBars())`. **The inset fix is not
reverted so much as made unnecessary**: it existed to stop the shell being laid out under two bars
that were taking screen, and there are no longer two bars taking screen. Its premise is gone, and
what is left in its place is the same statement made once instead of twice.

**A transient bar does not clip the shell, and the reason is that it does not re-lay-out anything.**
`BEHAVIOR_SHOW_TRANSIENT_BARS_BY_SWIPE` is sticky immersive: an edge swipe brings a bar back as a
translucent overlay for a few seconds and then takes it away again, and the system dispatches no new
window insets for it, because a bar that is about to leave is not a bar the layout should be built
around. So the shell keeps its 393×785 box for the whole episode. The bar floats over the top or the
foot of it, covers the mark or part of the nav while it is up, and retreats leaving both intact.
**Momentarily covered is not clipped**: nothing is resized, nothing reflows, and no content is lost —
which is precisely what the first chapter's defect did do, permanently, and what the fitted layout
avoided by giving 72px away. Sticky immersive gives the 72px back and pays for it only during a
swipe.

The bars are re-hidden when the window regains focus. A system dialog, the notification shade or the
keyboard can restore them and leave them restored, and a terminal that quietly grows a back button
after an interruption is the failure this ruling exists to prevent.

**What the hidden status bar costs, and where it is paid.** The status bar carried three things a
person holding a device on a floor actually reads: the clock, the signal and the battery. The clock
was already in the shell's top bar. The other two are not, and they do not stop mattering because
they stopped being drawn — a handheld carried around a venue is the one terminal in the fleet that
can run out of charge or walk out of coverage. So **the top bar takes them on**, as the instrument
cluster specced under Order entry · Layout above. This is the ruling's own cost, paid in the same
place it is incurred, and not a feature that arrived alongside it.

**States.** Every state in the spec above holds unchanged — the 86'd row, the empty check, the
sent/unsent line, the send-all confirmation, the check label, the offline annotations. Three are
added.

- Cart sheet **closed** (the default, and the state a fresh check opens in) or **open**.
- Summary bar **empty** — no button, and the cart's own empty line, `No items yet — tap the menu to
  build the order.` at 400/13px `--upos-ink-subtle`, in place of the counter and total. A bar with a
  live-looking `Review` over an empty check is a control that refuses a tap, which §11 rules out.
- Chip row **scrolled** or at rest. Nothing scrolls it programmatically and nothing needs to: the
  row opens at the first category, which is the one selected on load, and every later selection is a
  chip the server has just touched, so the selected chip is on screen by construction.

**Interactions.**

- Tap a chip to filter, exactly as tapping a rail button does. Nothing navigates.
- Tap a row to add — the same tap the tile takes, with the same merge at `qty + 1` and the same
  refusal on an 86'd item.
- `Review` opens the sheet. The scrim and the close `.u-icon-btn` close it.
- **Send-all does not close the sheet.** It confirms as `SENT TO KITCHEN` for 2s where it was
  pressed, with the emptied check behind it, and the server closes it. Animating the panel away from
  the confirmation the person is reading trades a message for a transition.
- Horizontal scrolling belongs to the chip row and to nothing else on the screen.
- No hover, at any width. §8 already puts every lift inside `@media (hover:hover)` and this device
  reports `hover: none`; press feedback is `--upos-press-tint` with no transform.

**Not solved at this width, deliberately.**

- **Whether an unlabelled nav survives the other four destinations being built.** Today ORDER is the
  only one that routes, so the four quiet glyphs are a roadmap and nobody has to learn them. When
  TABLES, PAYMENTS, CHANNELS and MORE become places a server goes twenty times a shift, a strip of
  five wordless glyphs is a real question and not this one. It is not answered here because the
  answer depends on the fleet: on a wider handheld the labels fit and the question never arises, and
  on this one it is a choice between an unlabelled nav and a type ramp §6 does not have. Both are
  decisions for the pass that promotes or deletes this subsection.
- **The offline pill is half-built and looks whole.** It states a fact the host observes and it is
  styled exactly as the finished control will be, so nothing on the bar signals that the count is
  missing rather than zero. The blocked chip beside it carries that at 1440 and is dropped at 393px,
  which means **the handheld bar is the one surface where the gap is invisible.** It is left that way
  because the alternative is spending a third of the bar naming a table that does not exist, and
  because GAP-10's real cost is a doubled order on replay, not an absent number.
- **The other seven Part II-A screens.** Floor plan, table drawer, payment, channels queue, both
  modals and offline behavior are drawn at 1440×900 and get no rule here. The Modifier modal is
  480px wide and the Item info modal wider; `.u-modal`'s `max-width:100%` stops them clipping and
  nothing beyond that is tuned. Order entry is the screen that reached a device, so it is the screen
  that has a rule — writing seven more against a fleet nobody has chosen is seven designs to throw
  away.
- **Legibility, which is the real open question.** A CSS pixel on Android is 1/160 inch and in the
  preview's browser it is 1/96, so §6's 13px body renders roughly a third smaller in the hand than it
  does in the frame. Nothing here compensates. Raising the ramp for one candidate device would fork
  §6, which is one scale for the whole product; if the Memor 20 becomes the fleet, the correct fix is
  a handheld type role in Part I, not a local override in a screen spec. That decision waits on the
  fleet, and until it lands this subsection is legible rather than comfortable.
- **Landscape.** 785×393 is a different problem — the bottom nav and the summary bar together take
  142px out of 393px of height — and no rule is written for it. The device is used in portrait.
- **The touch floor does not move and the type scale does not move.** Handheld keeps Part I's
  terminal roles and `--upos-touch-terminal` 48px. It does not take `--upos-touch-kiosk`: a smaller
  screen is not a guest-facing one, and §11 sizes 60px for a stranger with nobody to ask, not for a
  narrow viewport.
- **The system back gesture does not close the sheet.** Android's back is a host concern — a MAUI
  page override, not a rule any stylesheet can carry — and wiring one host's hardware gesture to one
  screen's transient state before the fleet is chosen buys a habit that may not survive the device.
  The scrim is a full-width target and the close control clears 48px.
- **Density.** No second column, no compact row, no swipe-to-remove on a line, no long-press. Every
  action is a tap on a target that clears 48px, which is the whole of §11's speed contract and the
  only part of it a narrow screen makes harder.
- **The range between 393px and 770px is degraded, not designed.** One column of rows is correct at
  393px and merely acceptable at 760px. The rule keeps that range usable; it does not claim to have
  drawn it. What has changed is how much of it there is: 771px and up is now a designed layout
  ([Tablet portrait](#tablet-portrait)), so what is left undrawn is 377px of range rather than 407px,
  and the widest thing in it is a 7" tablet in portrait rather than a 10.1" one.

**Gaps.** The same five the spec above cites — GAP-01, GAP-02, GAP-04, GAP-05, GAP-12 — carried
across unchanged. Width changes no binding, and this subsection introduces no new gap: every element
in it reads the data the 1440 spec already reads.

##### Dark

**The terminal follows the operating system's light/dark setting, and offers no control of its own.**
This supersedes §11's "terminal light (kitchen glare)", which was a default chosen when nothing on
the terminal could read the room.

**Why the OS and not a startup default.** The room changes and the terminal does not restart. A
counter under service lights at noon and a dining room at nine are different problems, and Android
already has the answer to both — one setting, in one place, that every app on the device agrees
about. Reading it costs nothing, keeps the terminal consistent with its own launcher and any other
app on the panel, and can be pushed across a fleet by an MDM policy. Reading it **once at startup**
would not: a venue that dims at six does not power-cycle its terminals to do it, so the setting is
subscribed to and not sampled.

**Why no manual override on the terminal, and it is a decision rather than an omission.**

- **A terminal's appearance is an estate setting, not a personal preference.** Two units on the same
  counter in two themes is a support call, and it is a support call whose cause is invisible: the
  person who pressed the control was not the person who reports the fault. The OS setting is
  administrable across a fleet; a control on the glass is not.
- **The one thing a stray control on a POS reliably does is get pressed mid-order.** §11 already
  refuses controls that do nothing for the check on the surfaces where a check is built. A theme
  toggle is the purest example: it changes everything on the screen and nothing about the order.
- **There is nowhere honest to put it.** The top bar is full at 393px — the handheld subsection
  spends three paragraphs recovering 95px of it — and the bottom nav has five destinations. The only
  available home is MORE, which is not built.
- **The back office keeps its toggle, and that is not an inconsistency.** It is one person at one
  desk in a browser, with no fleet and no check in flight. Its toggle is also what themes the
  terminal *preview*, which is exactly where the terminal's dark treatment is worked on.

**If the fleet later needs an override, this is the shape it takes**: three states in MORE →
Settings — `System`, `Light`, `Dark`, defaulting to `System` — and never a two-state toggle. A
two-state control cannot express "follow the room", which is the behavior that should stay the
default, and it cannot be returned to it. It does not go on the top bar at any point.

**What moves and what does not.** §11's theming contract, unchanged: one attribute on `<html>` and
nothing else. Ground, surfaces, border and ink move. **Status hues do not** — `--upos-status-late` is
`#ec3013` under any lighting, and so are fired, ready, new and the allergen violet, because a color
that means "late" has to mean it in both themes. What moves with the theme is the **ink role**, and
§4 already publishes the values: on a dark surface the on-dark set applies, so
`--upos-status-late-text` `#ae1800` becomes `--upos-kds-status-late` `#ff8a70`,
`--upos-status-ready-text` `#159548` becomes `--upos-kds-status-ready` `#9ee6b4`, and
`--upos-status-fired-text` `#d95f06` becomes `--upos-status-fired` `#f97316`, which §4's on-dark
column already lists as unchanged. That statement lives in the kit's `[data-theme="dark"]` block,
once, rather than at each call site — it is the same statement §4 makes, in the place a theme is
declared.

**Accent ink is the one thing a screen has to restate.** §3 rules that on dark surfaces accents are
`--upos-on-dark-accent`, and the accent presets themselves do not move between themes, so the ink
role does. Two elements in Order entry are inked in `--upos-accent-deep` — the tile's price and the
handheld summary bar's running total — and both take `--upos-on-dark-accent` under
`[data-theme="dark"]`. This is the Menu manager's own rule, already in the product for the same two
reasons.

**Measured.** In the preview, in dark, across all three bands: no text on the terminal falls under
§11's AA floor. 48 text nodes at 1440×900, 59 at 800×1280 and 39 at 393×785, worst case 4.63:1 (the
clock, `--upos-ink-subtle` over the glass bar). The status inks land at 6.96:1 for late, 11.01:1 for
ready and 5.72:1 for fired over `--upos-surface`; without the ink-role rule above they would be
2.24:1, 4.14:1 and 3.40:1.

**Not solved, deliberately.**

- **The allergen chip's dark inversion is specified and not wired.** §5 states it — fill
  `--upos-allergen-text`, ink `--upos-kds-ink` — and the component ships the class for it, but
  nothing selects it by theme, so a light-pairing chip on a dark surface would land at 2.81:1. No
  chip renders on the terminal today because `MenuItem` has no allergens (GAP-05), so this is latent
  rather than live. It is recorded in §12's "what the kit does not cover yet" list and it is not
  fixed here.
- **First paint.** The host page loads before the shell renders, so a dark terminal shows one light
  frame at startup. Nothing on the glass depends on it and no reading is wrong during it.
- **Shadows.** `--upos-shadow-card` and `--upos-shadow-modal` do not move with the theme and read as
  almost nothing on the dark ground. Every surface that depends on them for its edge also carries a
  1px `--upos-border`, so nothing loses its outline; a dark elevation set is a kit question and not a
  screen one.

#### Modifier modal

**Purpose.** You resolve the choices an item requires before it joins the check.

**Layout.** 480px wide, `max-height:820px`, its own scroll, `--upos-radius-panel` (the artboard draws
24px), `--upos-surface`, 26px padding, 16px gaps, `--upos-shadow-modal`, centered on `--upos-scrim`.

- Header: the item name at 800/18px, `.u-chip-allergen` chips under it, and a close `.u-icon-btn` on
  the inset fill.
- Burger body, three blocks. `DONENESS · REQUIRED` at 700/10.5px `.08em` `--upos-ink-subtle`, then
  single-select pills at `10px 16px`. `ADD-ONS · OPTIONAL`, then multi-select pills at `9px 14px`
  carrying the upcharge in the label — `Bacon +$1.50`, `Avocado +$1.75`, `Extra Cheese +$1.00`. Then
  a combo block: `--upos-surface-inset`, 16px radius, `14px 16px`, `Make it a combo` at 700/13px over
  `+ side, + drink · +$3.50` at 400/11px, and a `.u-switch` at 50×28px whose 22px knob slides
  `3px → 25px`.
- Combo on adds `CHOOSE A SIDE` and `CHOOSE A DRINK` pill groups under it.
- Drink body is one block: `SIZE · REQUIRED` and three pills — Small · Medium · Large.
- Footer row: a `.u-qty-stepper` around the count at 800/15px, then a 52px `.u-btn--primary` taking
  the remaining width (`flex:1`) and reading `Add to order — $NN.NN`.

**States.**

- A pill is selected (`--upos-grad-primary`, white ink) or not (`--upos-surface-inset`, `--upos-ink`).
- Doneness and size are single-select; add-ons, sides and drinks toggle independently.
- Combo off or on; on reveals the two picker sections and adds `$3.50` to the unit price.
- Quantity floors at 1. The primary's amount recomputes on every change.
- Burger variant and drink variant are mutually exclusive; a plain item never opens this modal.

**Interactions.** Opens from an Order entry tile when the item carries choices. Selecting a required
option replaces the previous one; selecting an add-on toggles it. The combo switch reveals the side
and drink groups. Confirm pushes one cart line carrying a middot-joined mods string —
`Medium · Bacon · Combo w/ Fries + Iced Tea` — and closes. Close discards everything. The modal rises
with `fl-rise` at `--upos-dur-slow` over `--upos-scrim` at `--upos-blur-scrim`; while it is up the top
bar drops its blur (§7).

**Data.** `MenuItemDto` supplies the name and base price and nothing else. Every group, option,
upcharge and delta on this screen is artboard fixture. Pricing is client-side: a burger's unit is
base plus selected add-ons plus the combo price; a drink's unit is base plus the size delta
(`−$0.50` small, `$0` medium, `+$0.75` large — applied to the price, not shown in the label); the
line is unit × quantity. The confirmed line reaches the API only inside `CreateOrderDto`, as an
`OrderItemDto` with no field to carry the selection. **The POC's one per-line customization carrier
is `OrderItem.SpecialInstructions`**, a nullable free-text string on the entity — the field a server
types a modification into today, and the field structured modifier groups replace. `OrderItemDto`
carries nothing that maps to it, so the middot-joined mods string this modal builds reaches the API
as nothing at all (GAP-01).

**Gaps.**

- GAP-01 — no modifier group or option model, so required, optional, single- and multi-select, and
  upcharges all live in the client.
- GAP-02 — no combo entity, so the combo switch, its two pickers and its `+$3.50` have nothing to
  persist to.

#### Item info modal

**Purpose.** You answer a guest's question about an item without touching the check.

**Layout.** 480px wide, `max-height:800px` — 20px shorter than the Modifier modal — its own scroll,
`--upos-radius-panel` 26px (the artboard draws 24px), `--upos-surface`, 26px padding, 16px gaps,
`--upos-shadow-modal`, centered on `--upos-scrim`.

- Header: the item name at 800/18px, the price at 800/15px in `--upos-accent-deep`,
  `.u-chip-allergen` chips at `3px 8px`, and a close `.u-icon-btn`.
- `INGREDIENTS` label at 700/10.5px `.08em`, then an inset list — `--upos-surface-inset`, 16px
  radius, `14px 16px`, 6px gaps, one row per ingredient at 700/12.5px.
- When the item has both views, a `.u-segmented` track: 4px padding on the inset, two options
  reading `PLATING` and `STACK`, the active one on `--upos-grad-primary`. The artboard draws the
  options at `9px 0`; ship the track at `--upos-touch-terminal` 48px, the preamble's ruling.
- Plating view: a 220×220 circular image slot on the inset fill, centered — food photography as
  content, framed, never behind text (§3).
- Stack view: an inset block at `--upos-radius-inset`, 10px padding, layers 30px tall in ingredient
  colors rendered bottom-up (`column-reverse`), each carrying its name at 800/11px. The artboard
  rounds the layers at 8px; ship `--upos-radius-inset` — nothing outside `.upos-kds` goes under 14px
  (§7).

**States.**

- Reachable only while `ITEM INFO` mode is armed on Order entry.
- Open on plating, or open on stack.
- An item with no stack shows no tabs and only the plating view.
- An item with no allergens shows no chips.

**Interactions.** Arm `ITEM INFO`, then tap a tile to open. The tabs swap the view under the
ingredient list. Close returns to the grid with info mode still armed, so you can read a second item
without re-arming. This modal never adds anything to the check — that is the whole point of arming a
mode instead of adding a second control to every tile. It rises with `fl-rise` at `--upos-dur-slow`.

**Data.** None today. `MenuItem` carries a name, a price, a category, availability and an image; the
ingredient rows, the plating photo and the stack layers are all artboard fixtures with no field
behind them. The allergen chips have no field either.

**Gaps.**

- GAP-05 — `MenuItem` has no allergens, so the chips in the header are design-only.
- GAP-06 — no recipe, ingredient or plating model, so the ingredient list, the photo slot and the
  stack layers have nothing to read.

#### Floor plan

**Purpose.** You read the room at a glance and open the check you need.

**Layout.**

- **Header strip, 60px**, `--upos-surface-inset`, bottom hairline, padding `0 28px`: the room name at
  800/14px (`Floor Plan · Dining Room`) on the left; the seated count and the instruction at 700/12px
  `--upos-ink-subtle` (`18 / 24 seated · tap a table`) on the right.
- **Status legend** sits at the right end of that strip: four 11px dots at `--upos-radius-pill` with
  700/12px labels — NEW / SEATED, FIRED / ORDERED, LATE, READY / DONE. The artboard draws the legend
  in the demo chrome above the shell; on the terminal it belongs where the statuses are.
- **Canvas** fills the rest at 36px padding, tables positioned absolutely on the room's geometry.
- **Table**: 104px tall and either 150px or 230px wide as the room's geometry demands, not as the
  cover count implies — the artboard runs a six-top at 150px and its eight- and ten-tops at 230px;
  `--upos-surface` fill; a 2px status-colored border; `--upos-shadow-card`; a centered stack of the
  id at 800/19px,
  the status line at 700/11.5px in the status color, and the guest count at 400/11px
  `--upos-ink-subtle`. Shape carries seating: square tables take 20px (`--upos-radius-card` 18px in
  the kit), rounds take `--upos-radius-pill`.
- **Guest-count dialog**: 380px, `--upos-radius-panel` 26px (the artboard draws 24px), 26px padding,
  18px gaps, on a lighter scrim (`rgba(20,25,31,.45)`, against `--upos-scrim`'s `.5` under the
  modals). Header `New order · T3` at 800/18px with a close `.u-icon-btn`; a `GUESTS / SEATS` label;
  a centered `.u-qty-stepper` around the count at 800/32px; and a 54px `.u-btn--primary` reading
  `Start order`.

**States.** One per table, each setting the border, the status line and the guest line:

- Seated — `--upos-status-new`, `SEATED · 4m`.
- Ordered — `--upos-status-fired`, `ORDERED · 6m`.
- Late — `--upos-status-late`, `LATE · 24m`. Late is derived client-side by measuring
  `Order.CreatedAt` against the configured SLA; it overrides the underlying status for as long as it
  holds and nothing writes it back (§4).
- Check presented — `--upos-status-ready`, `CHECK PRESENTED`.
- Open — no status hue, no guest line, label `OPEN`. The artboard uses a neutral `#c7ced6`; ship
  `--upos-border`.
- Selected — the border goes `--upos-accent` while its dialog or drawer is up.

**Interactions.** Tap an open table to open the guest-count dialog; `−` and `+` clamp the count
between 1 and 12; `Start order` seats the table at that count, makes it the active check, clears the
cart and switches to Order entry. Tap any other table to open the Table drawer. Close returns to the
plan. Sending a line from a table's check moves that table to `ORDERED` without you coming back here.
Both overlays rise with `fl-rise` at `--upos-dur-slow`.

**Data.** One `Table` per tile. Position, width and radius are room geometry the artboard hard-codes
and the model has no place for. The status line is `Table.IsOccupied` plus the open `Order`'s
`OrderStatus` mapped through §4; the elapsed figure is derived client-side from `Order.CreatedAt`,
never read from the API. The guest count and the server name have no fields. `Start order` writes
nothing until the first line is sent, when the check posts as a `CreateOrderDto`.

**Gaps.**

- GAP-03 — no course or seat model, so a table's check cannot say which items run together.
- GAP-07 — `Table` carries an `IsOccupied` bool, not a status enum with timestamps, so `SEATED · 4m`
  and `CHECK PRESENTED` have nothing to bind to.

#### Table drawer

**Purpose.** You work an occupied table's check — read its courses, fire the next one, take it to
payment.

**Layout.** A 420px drawer on the right, full height, flush to the shell edge, `--upos-surface`, a
left-cast `-30px 0 60px -30px rgba(20,25,31,.5)` shadow, over the `rgba(20,25,31,.45)` scrim. The
kit's `.u-drawer` floats inset 16px precisely so all four corners stay rounded — §7 allows no square
corner outside `.upos-kds`. This drawer overrides the width and runs full height flush to the shell
edge, so round its two inboard corners at `--upos-radius-panel` and let the outboard edge meet the
shell's own rounded clip; no square corner is exposed either way. Part III carries the variant.

- Header `22px 24px` above a hairline: the table id at 800/16px over `4 guests · Server: Maya` at
  700/12px `--upos-ink-subtle`; a close `.u-icon-btn`.
- `Add to order`, a 46px `.u-btn--primary` at `--upos-radius-inset`, margin `16px 24px 0`.
- Body scrolls at `20px 24px`, 18px between courses.
- A course is a control row then its items. Control row: a `.u-chip-status` at its recipe's
  `5px 12px` (the artboard draws `5px 14px`) reading `COURSE 1 · FIRED` on `--upos-status-fired`,
  plus that course's actions. Item rows sit on
  `--upos-surface-inset` at `--upos-radius-inset`, `12px 14px`, 8px apart, the name at 700/13px left
  and the price at 800/13px right.
- Course 1's action is a re-fire pill button, `7px 14px`, 1px `--upos-border`, transparent at rest.
- A held course adds a `.u-segmented` track on the inset carrying `NOW` · `+5M` · `+10M`, then the
  fire button on `--upos-grad-primary` in white 700/11px. The artboard draws both between 25px and
  33px tall; ship them at `--upos-touch-terminal` 48px (§11).
- Footer `20px 24px` under a hairline: `Total` at 800/18px and a 52px `.u-btn--primary` reading
  `Split & go to payment`.

**States.**

- Course fired — orange chip, re-fire available.
- Re-fire at rest reads `RE-FIRE TO KDS` as a quiet bordered control; pressed it fills with
  `--upos-grad-primary` and reads `RE-FIRED` for 2s, then returns. Draw the artboard's `✓` as an
  inline check icon (§9).
- Course held — the chip sits on `--upos-surface-inset` in `--upos-ink-subtle` reading
  `COURSE 2 · HOLD`, with the delay track and the fire button beside it.
- Course sending — `COURSE 2 · SENDING` on a pale orange with dark-orange ink, controls gone, for
  2.5s.
- Delay selected: now, +5m or +10m. The fire button follows — `FIRE NOW`, or
  `QUEUE · SEND IN 5M`.
- Re-fire and void both need a manager. The control stays quiet at rest — `.u-btn--ghost` with its
  label at `--upos-ink` — and the red arrives on the confirming step, which names the consequence in
  `--upos-status-late-text` (§11).

**Interactions.** Opens from any occupied table on the floor plan. `Add to order` closes the drawer
and returns to Order entry with that table as the active check. Re-fire re-sends the course to the
kitchen display. The delay track picks when the held course goes, and the fire button commits it —
immediately on `NOW`, or after the timer, passing through the sending state. `Split & go to payment`
closes the drawer, goes to Payment and opens the split modal on `EVENLY`. Close returns to the plan.

**Data.** Item rows are `OrderItem` on the table's open `Order`; the total sums them client-side.
Firing and re-firing both mean a status write — `PUT /api/orders/{id}/status` with an
`UpdateOrderStatusDto` moving the order to `Preparing`, broadcast as `ReceiveOrderStatusUpdate` to
the `Order_{id}` group — but the POC writes a whole order, not a course, so a held course and a fired
course cannot coexist on one order today. The guest count and the server name have no fields.

**Gaps.**

- GAP-03 — no course or seat model, so `COURSE 2 · HOLD`, the delay and the per-course fire have
  nowhere to persist.
- GAP-09 — no employee, role or approval record, so `Server: Maya` is a literal and a re-fire or a
  void has nobody to approve it.

#### Payment

**Purpose.** You take the money — pick a tender, set the tip, split when you have to, and close the
check.

**Layout.** Two panes and three overlays.

- **Left pane** fills, 32px padding, 20px gaps. Header row: `Payment · Order #482` at 800/15px on the
  left; on the right a guest-mirror `.u-icon-btn` and the amount due at 800/20px.
- **Tender grid**: 2×2, `1fr 1fr` by `1fr 1fr`, 20px gaps, filling the pane. Each tile is a
  `.u-tender-tile` at 22px radius (`--upos-radius-card` in the kit), an icon over its label at
  800/14px.
  `CREDIT / DEBIT` is the selected tender — `--upos-grad-primary`, white ink, `--upos-shadow-button`.
  `CASH` and `GIFT CARD` sit on `--upos-surface-inset`. `SPLIT CHECK` takes the inset fill with a 2px
  dashed `--upos-border`.
- **Right rail, 400px**, inset fill, left hairline, 26px padding, 14px gaps: an `ADD A TIP` label at
  800/12px `.05em`; a 2×2 grid of `.u-tip-btn` at 10px gaps, `16px 0`, `--upos-radius-inset`, 1px
  border, 800/15px, labeled `18% · $NN.NN`, `20% · $NN.NN`, `25% · $NN.NN` and `NO TIP`; a hairline;
  Subtotal and Tip rows at 700/13px `--upos-ink-subtle`; Total at 800/22px; and `CONFIRM PAYMENT`, a
  60px `.u-btn--primary` pinned to the bottom with `margin-top:auto`.
- **Split modal**: 460px, `--upos-radius-panel` 26px (the artboard draws 24px), 26px padding, 18px
  gaps, on `--upos-scrim`. Header `Split the check` with a close `.u-icon-btn`; a `.u-segmented`
  track at `--upos-touch-terminal` 48px (the preamble's ruling) — `EVENLY` · `BY SEAT`; then either
  the even body (a `.u-qty-stepper` around the count at
  800/28px over a `GUESTS` label, then the per-guest amount at 800/24px with `per guest` at
  400/13px) or the seat body (four inset rows at `12px 14px`, seat name left, amount right); and a
  52px `.u-btn--primary` reading `Done`.
- **Guest mirror**: a 520px sheet on the right, full height, `--upos-surface`, centered stack — a
  `GUEST-FACING MIRROR` kicker at 700/11px `.15em`, the total at 800/30px with `--upos-grad-primary`
  clipped to the text (the one clipped figure this screen gets, §3), and three tip labels at
  `12px 20px`, `--upos-radius-inset`. A close `.u-icon-btn` sits at `top:22px; right:22px`. The sheet
  runs flush to the shell edge like the table drawer, so it takes the same treatment `.u-drawer`'s
  16px inset exists to guarantee: inboard corners at `--upos-radius-panel`, outboard edge inside the
  shell's rounded clip, no square corner exposed (§7). The artboard draws those tip labels as
  display-only; make them tappable and they take `--upos-touch-kiosk` 60px, because the surface is
  guest-facing (§11).
- **Confirmation** replaces the whole pane set: centered, 420px max — a 64px `--upos-grad-primary`
  circle carrying a white check, `Order #482 confirmed` at 800/24px,
  `$NN.NN charged · receipt ready to send` at 400/14px, `Email receipt` and `Print receipt` as
  `.u-btn--secondary`, and `Start new order` as a `.u-btn--primary`.

**States.**

- Tender selected — `CREDIT / DEBIT` by default. Offline it drops `--upos-grad-primary` for a flat
  neutral fill with `--upos-ink-subtle` ink and gains `will sync on reconnect` at 400/10.5px (see
  Offline behavior).
- Tip selected — one of 18%, 20%, 25% or none; the selected `.u-tip-btn` takes `--upos-grad-primary`
  and white ink, and every dollar figure recomputes off the subtotal.
- Split mode — evenly (2 to 6 guests) or by seat.
- Guest mirror hidden or shown.
- Screen taking payment, or confirmed.

**Interactions.** The mirror button opens the sheet and the sheet's own close returns it.
`SPLIT CHECK` opens the split modal and `Done` closes it; arriving from the table drawer opens it
already on `EVENLY`. The tip buttons set the percentage. `CONFIRM PAYMENT` swaps the panes for the
confirmation. `Start new order` clears the cart, resets the tip to 20%, releases the active table,
increments the order number and returns to Order entry. `CASH`, `GIFT CARD`, `Email receipt` and
`Print receipt` are drawn but unwired in the artboard — wire them to the same tender and receipt
flows as their neighbors. Overlays rise with `fl-rise` at `--upos-dur-slow`.

**Data.** Almost none today. `Order.OrderNumber` supplies the number in the header and the
confirmation; every amount is summed client-side from the check — tax at the venue's rate, tip as a
percentage of subtotal, the split as an even division or a per-seat allocation. Tender type, tip
amount, split allocation, the paid transition and the receipt have no model, no DTO and no endpoint.
Confirming a payment can only mean `PUT /api/orders/{id}/status` with an `UpdateOrderStatusDto`
moving the order to `Completed`, broadcast as `ReceiveOrderCompleted` — which records that the check
closed, not how it was paid.

**Gaps.**

- GAP-08 — no payments domain: tender, tip, split allocation and refund have nowhere to be stored, so
  every number this screen writes is lost at `Completed`.

#### Channels queue

**Purpose.** You watch every order the venue has taken, whatever took it, one line each.

**Layout.**

- **Header, 60px**, `--upos-surface-inset`, bottom hairline, padding `0 28px`:
  `Order queue · every channel, one line` at 800/14px on the left, the open count at 700/12px
  `--upos-ink-subtle` on the right.
- **List** scrolls at `20px 28px`, 10px between rows.
- **Row**: `.u-data-row` geometry — `--upos-surface`, 1px `--upos-border`, `--upos-radius-inset`,
  `14px 18px`, 16px gaps, no shadow at rest. Left, a 34px round channel badge carrying a two-letter
  code in white 800/11px on the channel's own color. Middle, flexible: `Counter · #482` at 700/13.5px
  over the item summary at 400/12px `--upos-ink-subtle`. Right, the price at 800/13px and a status
  chip at `5px 12px`, 700/10.5px, `.03em`.
- The badge is `.u-badge-channel` rendered as a 34px circle rather than the kit's pill; the status
  chip is `.u-chip-status--*`, which fills solid with white ink where the artboard tints the pill and
  inks it with the matching text token. Ship the kit chip — §4 names it as where status shows.

**States.**

- Per row, one of `NEW` (`--upos-status-new`), `FIRED` (`--upos-status-fired`), `READY`
  (`--upos-status-ready`) or `LATE` (`--upos-status-late`). `LATE` is derived client-side from
  `Order.CreatedAt` against the channel's SLA and overrides the row's real status while it holds; the
  API never returns it (§4).
- Empty queue — a statement, not an apology: `No open orders. Every channel is clear.` The artboard
  draws no empty state; this one is a UPOS addition under §10's empty-state rule.

**Interactions.** Reached from `CHANNELS` in the bottom nav. The rows are a monitor: the artboard
gives them no tap, and a status change restyles the row in place rather than announcing itself. A new
order joins the list without a toast.

**Data.** The Orders controller's list endpoint (`GET /api/orders`) returns the `OrderDto` list, one
row each: the id from `Order.OrderNumber`, the summary counting `OrderItemDto` lines, the price
summing them, and the chip mapping `OrderStatus` through §4. Live behavior comes off `/hubs/orders`
— `ReceiveNewOrder` adds a row, `ReceiveOrderStatusUpdate` restyles its chip, `ReceiveOrderCompleted`
drops it — with the `Order_{id}` groups carrying per-order detail. The channel name, its two-letter
badge and its color have no field behind them.

**Gaps.**

- GAP-04 — `Order` has no channel or order type, so every badge, channel name and per-channel color
  on this screen is unbindable.

#### Offline behavior

**Purpose.** The terminal keeps taking orders with no network, and says so in one place.

**Layout.** Three elements, and nothing else moves.

- **One pill in the top bar**, in the slot beside the venue name: `.u-pill-offline` —
  `--upos-status-late` fill, white 800/11px at `.05em`, `--upos-radius-pill`, `6px 12px`, a 13px
  wifi-off icon, reading `OFFLINE · 3 QUEUED`. **What ships today reads `OFFLINE` and stops there** —
  the connection is observed through `IDeviceStatus` (§12) and the count is not, so §11's two-claim
  rule applies and the queue is named beside the pill in the blocked treatment rather than counted at
  zero. The handheld bar drops that chip and keeps the pill (Handheld).
- **One annotation per affected action.** On the card tender tile, `will sync on reconnect` at
  400/10.5px under the label; on a line sent to the kitchen, `QUEUED` in place of `SENT`.
- **No banner, no blocking modal, no disabled primary, and no toast per queued write** (§11).

**States.**

- Online — no pill, no annotations, the card tender renders as the selected tile on
  `--upos-grad-primary`.
- Offline with a queue — the pill carries the count; the card tender drops to a flat neutral fill
  with `--upos-ink-subtle` ink and takes its sync line. Every control stays live.
- Draining — the count falls as writes replay, and the pill leaves at zero. There is no success
  toast; the absence of the pill is the message.
- The pill pulses with `fl-pulse`, and keeps pulsing under `prefers-reduced-motion` because it
  carries status rather than decoration (§8).

**Interactions.** Connectivity is observed, never chosen — the artboard's offline toggle is demo
scaffolding, not product UI. Offline you still build a check, send it, take a tender and confirm:
each write applies to local state first and is enqueued, so no tap waits on the network (§11's 150ms
rule). On reconnect the queue replays in order and the pill counts down to nothing.

**Data.** The queue is a local SQLite table on `Restaurant.Mobile` — planned, not built (POC step 7).
A row holds one pending write: a `CreateOrderDto` bound for `POST /api/orders`, or an
`UpdateOrderStatusDto` bound for `PUT /api/orders/{id}/status`, with the time it was queued. Replay
reissues them in order and the API answers on `/hubs/orders` — `ReceiveNewOrder`,
`ReceiveOrderStatusUpdate`, `ReceiveOrderCompleted` — as each one lands. Losing the hub connection is
what puts the terminal offline; it changes what the UI says, never what it lets you do. The contract
replay has to honor: a write that reaches the API twice must not produce two orders, and nothing in
`CreateOrderDto` carries a client-generated key to make that true.

**Gaps.**

- GAP-10 — no offline queue table and no idempotency key on `CreateOrderDto`, so a replayed write can
  double an order.

### Part II-B · Back office

The back office is one desktop-web shell: a 224px dark sidebar and a main panel standing
`--upos-space-main-offset` 14px off it, both floating on the ground. Five specs share that chrome, so
none of them repeats it.

- **Sidebar, 224px**, `--upos-grad-dark`, `--upos-radius-panel` 26px, padding `22px 16px`, 8px gaps,
  `--upos-shadow-modal`. It opens with §9's brand mark — a 34px `--upos-grad-primary` square carrying
  `UF`, `UPOS Fusion` at 800/15px in white, and a `BACK OFFICE` kicker at 700/8.5px `.2em` in
  `--upos-on-dark-accent` — then seven `.u-nav-item` buttons at `--upos-radius-inset`, `12px 14px`,
  12px gaps, a 16px icon beside a 700/13px label: Dashboard · Menu · Integrations · Employees ·
  Reports · Devices · Settings. The active destination fills with `--upos-grad-primary` and white ink;
  the rest are `--upos-ink-subtle` on transparent. The kit's `.u-nav-item` is the terminal's
  bottom-nav item — a column of a 17px icon over a 700/10px label at `6px 10px`, active by tinting its
  ink `--upos-accent` — so the sidebar is a call-site restyle of it, not a plain use: the row runs
  horizontal at `12px 14px` and 12px gaps, the label goes 700/13px, and the active state fills rather
  than tints. Part III carries the variant. Sidebar icons run `stroke-width:1.7` (§9); the artboard
  draws them at 2.
- **The rail is sticky** — `top:14px`, `max-height:calc(100vh - 28px)` (§2). The artboard is a fixed
  canvas and draws it static.
- **Main panel** fills the rest at `min-width:1000px`, `--upos-radius-panel` 26px, `--upos-surface`,
  `--upos-shadow-card`, `overflow:hidden` and `position:relative`, so an overlay scrims the panel and
  leaves the sidebar lit.
- **Blocks inside that white panel take `--upos-surface-inset` and no shadow** — §2's ladder, and the
  reason the dashboard's stat cards and every report card below are flat rather than floating. The
  kit's `.u-stat-card` ships `--upos-surface` plus `--upos-shadow-card`, which is right for a card on
  the ground and wrong for one inside a panel; take its geometry and override the fill at the call
  site.
- **This surface is pointer input.** §8's hover table applies in full, and §11's touch minimums do
  not: `.u-icon-btn` is 34px with no enlarged hit area, and a control is sized by its density, not by
  `--upos-touch-terminal`.
- Nav swaps the panel's content and nothing else navigates. The artboard's `BACK OFFICE` kicker strip
  above the shell, and its theme and accent pickers, are demo chrome — §11 owns the theming contract.

#### Dashboard

**Purpose.** You read the day in one screen — what sold, what it cost, and the one exception worth
acting on.

**Layout.** Panel padding 32px, `--upos-space-gap-section` between blocks (the artboard draws 24px).

- **AI insight banner**, full width, `--upos-radius-panel` (the artboard draws 22px),
  `--upos-grad-primary`, white ink, `--upos-shadow-button`, padding `22px 26px`, 8px gaps: an
  `ASK THE BRAIN` kicker at 700/9.5px `.18em` in `--upos-on-dark-accent`, then the insight at
  700/17px/1.5 inside quotation marks. This banner is the only surface in the product that runs
  `fl-sheen` (§8).
- **Title row**: `Riverside Grill · Today` at 800/24px on the left; the AI toggle on the right as a
  700/11px underlined text button in `--upos-ink-subtle`.
- **Stat strip**, `repeat(4,1fr)` at `--upos-space-gap-card` 16px. Each card is `.u-stat-card`
  geometry on `--upos-surface-inset` — `--upos-radius-card` 18px, 20px padding, 8px gaps — carrying a
  700/9.5px `.15em` label in `--upos-ink-subtle`, the value at `--upos-type-display`, then one 700/12px
  comparison line in its own status color: `NET SALES` `$4,820` over `↑ 12% vs last Tue` in
  `--upos-status-ready-text`; `LABOR %` `27%` over `target 24%` in `--upos-status-fired-text`;
  `COVERS` `212` over `avg 1.9 turns` in `--upos-ink-subtle`; `AVG TICKET` `$22.70` over `↑ 4%` in
  `--upos-status-ready-text`. Draw the direction arrow as an inline SVG — §9's glyph list carries no
  `↑`.
- **Charts row**, `1.3fr 1fr` at 20px, both cards `--upos-surface-inset` at `--upos-radius-card` (the
  artboard draws 20px), 24px padding.
- **Sales by daypart**: a 700/13px title, then four columns 22px apart in a 180px band, each a
  `--upos-grad-bar-v` fill under a 700/12px `--upos-ink-subtle` label — Breakfast · Lunch · Dinner ·
  Late Night. These columns grow upward, so they take the vertical token — `--upos-grad-bar`'s stops
  at `180deg`, the same fill turned to follow the bar (§3). The columns carry a quantity and no
  status, which is what keeps them on the gradient at all (§4). The artboard additionally ties the
  gradient's far stop to the accent; the token
  does not, and the token wins. Round the top pair at `--upos-radius-inset` (the artboard draws
  `10px 10px 0 0`) and let the foot sit flush on the chart baseline, where §7 has no exposed corner to
  govern.
- **Top items**: a 700/13px title, then three 700/13px rows — the item name left, `142 · $1,491`
  (units then revenue) right in `--upos-ink-subtle` — over a hairline and the exception row,
  `3 comps flagged for review` with a trailing `→` at 700/12px in `--upos-status-late-text`.

**States.**

- AI banner shown or hidden. The toggle reads `Hide insight` while the banner is up and
  `Ask the brain` while it is down; hiding it collapses the block and the page rises into the space.
- Each stat card's comparison line is the only colored thing on the card: ready-green when the figure
  beats its comparison, fired-orange when it misses a target, `--upos-ink-subtle` when it is neither
  (§4). The value itself never takes a status color.
- Exception row present or absent. Absent, the top-items card ends at its third row. The artboard
  always draws it.
- Empty day — before the first check closes, the values read `$0` and `0`, the daypart band draws no
  bars, and the top-items card carries one statement line: `No sales yet today. The first check sets
  the baseline.` The artboard draws no empty state; this one is a UPOS addition under §10.

**Interactions.** The AI toggle hides and restores the banner, and touches nothing else on the page.
The exception row is drawn without a handler — wire the row and its `→` to the flagged comps. Nothing
else here is interactive: the stat cards, the bars and the top-items rows are read-only, and a figure
that changes restyles in place rather than announcing itself. The banner rises with `fl-rise`; the
daypart columns grow on mount, and because they grow upward they run `fl-grow`'s growth on `scaleY`
from `transform-origin: bottom` rather than the keyframe's `scaleX` (§8).

**Data.** Every figure on this screen is an artboard fixture; none of it has an endpoint today.

- Net sales, covers and avg ticket are computable from what already exists: sum the `OrderItem` lines
  across the day's `Order` rows, count the checks, divide one by the other. The Orders controller
  lists orders; it does not aggregate, and that endpoint is API work rather than a schema gap.
- The daypart split buckets those same orders by `Order.CreatedAt`, and the service-period boundaries
  have nowhere to be configured. Top items groups `OrderItem` by its `MenuItem`, counts and sums —
  same shape, same missing endpoint.
- Every comparison figure (`vs last Tue`, `target 24%`, `avg 1.9 turns`) is derived at read time
  against a prior window or a configured target. Nothing stores it, and no API returns a
  "vs last Tuesday" value.
- The insight has no model, no endpoint and no prompt store. Whatever produces it, §10 rules how it
  renders: quoted, attributed to the brain, shown as a draft beside the data it rests on.

**Gaps.**

- GAP-08 — no payments domain, so a comp has no record: `OrderStatus.Cancelled` voids a whole order,
  not the three lines this row counts.
- GAP-09 — no employee, role or shift model, so `LABOR %` and the insight resting on it have no
  source.
- GAP-13 — no venue or organization entity, so `Riverside Grill` is a literal and every aggregation
  above is silently single-location.

#### Menu manager

**Purpose.** You keep the menu true — what is in a dish, what it costs, what a guest can change about
it, and what is 86'd right now.

**Layout.** Three panes across the panel, plus one modal.

- **Major categories, 200px**, right hairline, padding `24px 0`: a `MAJOR CATEGORIES` label at
  700/9.5px `.15em` `--upos-ink-subtle` at `0 22px 14px`, then one button per major at
  `--upos-radius-inset`, `12px 14px`, margin `2px 12px`, 700/13px — the selected one on
  `--upos-surface-inset` in `--upos-ink`, the rest transparent in `--upos-ink-subtle` — a quieter
  selection than the sidebar's accent pill, because two accent pills in one row of chrome compete.
- **Item list, 400px**, right hairline. Header `16px 24px` above a hairline: `{major} · {n} items` at
  800/14px and `+ ADD ITEM` as a bare text button at 700/12px in `--upos-accent-deep`. Filter chips at
  `12px 24px` above a second hairline, `--upos-space-gap-chip` apart (the artboard draws 6px),
  wrapping — `All` then the major's minors at `--upos-radius-pill` and `6px 12px`, the active one on
  `--upos-grad-primary` in white. Then the add-item form when open — an inset block at
  `--upos-radius-inset`, 12px padding, 8px gaps, carrying a name field, a price field placeheld
  `Price (e.g. 9.50)`, and `Cancel` on a bordered fill beside `Add` on `--upos-grad-primary`. Then the
  rows at `12px 14px`, `--upos-radius-inset`, margin `6px 10px 0`: the name at 700/13px left, the
  price at 700/13px and the availability badge right, the selected row filled `--upos-surface-inset`.
  The artboard fills both inputs white at a 10px radius; ship §2's input contract at
  `--upos-radius-inset`, here and in the add-group form.
- **Detail pane** fills the rest at `24px 28px`, 16px gaps, its own scroll to 760px. Header: the item
  name at 800/18px; right, a `VIEW PLATING` bordered pill at `8px 14px`, `--upos-radius-pill`,
  700/11px with a 14px aperture icon, then the price at 800/16px in `--upos-accent-deep`. Under it,
  `RECIPE · INGREDIENTS` at 700/11px `.08em` over an inset block at `--upos-radius-card` (the artboard
  draws 16px), `14px 16px`, 8px gaps, one 700/12.5px row per ingredient with its cost right in
  `--upos-ink-subtle`; then three cost cards at `repeat(3,1fr)` and 10px, inset at
  `--upos-radius-inset`, 14px, centered — `COGS $`, `COGS %` and `MARGIN` at 700/9.5px over 800/16px
  values. `COGS %` takes `--upos-status-late-text` over the 32% target and `--upos-status-ready-text`
  under it; the artboard inks it with the fill tokens, and §4 gives text the text tokens.
- **`PREP STEPS`, `ALLERGENS`, then modifier groups.** Steps are one 400/12.5px `--upos-ink-subtle`
  line each, numbered (the artboard prefixes an em dash, and §9's glyph list has no bullet). Allergens
  are toggle pills at `7px 14px` — `.u-chip-allergen` when on, `--upos-surface-inset` in
  `--upos-ink-subtle` when off, labels uppercase per §5 against the artboard's sentence case. Modifier
  groups take a 800/14px heading with `+ ADD GROUP` beside it and one card per group: inset at
  `--upos-radius-card`, 16px padding, the name at 800/13px, its type chip at `3px 10px` on
  `--upos-surface`, its options as 700/12px pills on `--upos-surface`. Its form matches the add-item
  form, commits on `Add group`, and adds a three-way segmented row — `REQUIRED` · `OPTIONAL` ·
  `NO / REMOVE`, the selected one on `--upos-grad-primary` — over a comma-separated options field.
- **Plate-view modal**, 520px, `--upos-radius-panel` (the artboard draws 24px), 26px padding, 16px
  gaps, `--upos-shadow-modal`, on `--upos-scrim` inside the panel: `{item} · plating` at 800/18px with
  a close `.u-icon-btn` at the preamble's 34px (the artboard draws 30px), then the `.u-segmented`
  `PLATING` · `STACK` track when the item has both
  views. It is the terminal's Item info modal with editing added — a 280×280 circular image slot
  rather than 220×220, numbered `ON THE PLATE` callouts under it at 800/10px in 20px round chips, and
  the stack turned from a read-only diagram into a builder: a 180px `column-reverse` column at
  `--upos-radius-inset`, 10px padding, 30px layers 3px apart in their ingredient colors carrying down,
  up and remove controls at `--upos-radius-pill` (the artboard draws 5px), beside `TAP A SLICE TO ADD`
  palette pills with 10px color dots and `Reset to default stack` pinned to the bottom. Draw `▲` and
  `▼` as inline SVG chevrons (§9); `×` on remove is permitted.

**States.**

- Exactly one major and one minor filter are selected, and switching majors returns the filter to
  `All`. Exactly one item is selected, its row on the inset fill, and the detail pane follows it. That
  item has both plate views (burgers and sandwiches) or plating only; with plating only the modal
  draws no tabs, and with both, `VIEW PLATING` opens on stack.
- Item available — the badge reads `86` on `--upos-border` in `--upos-ink`: an instruction, not a
  status. Item 86'd — the row dims to `.5`, the name strikes through, and the badge reads `ON` on
  `--upos-status-late` in white. The row holds its place in the list (§4).
- Both forms open empty and close on cancel or commit. The artboard leaves them open when the
  selection changes; close them with it, because the group form writes to whichever item is selected
  when you press `Add group`. Two silent failures ship with the artboard and neither should: a blank
  name makes the commit button do nothing at all, and a non-numeric price is parsed to zero, so the
  item lands on the list at `$0.00` with no warning. Both need a one-line message under the field
  naming the cause and the next move (§10).

**Interactions.** Pick a major to refilter the list, a chip to filter within it, a row to load the
detail pane; the sidebar is the only navigation here. The availability badge toggles in place with no
dialog, since 86ing an item is something you do mid-service. `Add` appends an item to the current
major, gives it that major's first minor and selects it. `Add group` splits options on commas and
drops the blanks; a `NO / REMOVE` group prefixes each with `No ` and labels itself
`REMOVE · NO CHARGE`. An allergen pill toggles that allergen on the selected item.
`VIEW PLATING` opens the modal on `fl-rise` at `--upos-dur-slow`; inside it, up and down swap a layer
with its neighbor, remove deletes it, a palette pill appends one on top, and `Reset to default stack`
restores the item's default build.

**Data.**

- `MenuItem` carries the spine — `Name` and `Price` in the row and the detail header, `Category` in
  the major rail, `IsAvailable` behind the 86 badge, `ImageUrl` for the plating photo — read as
  `MenuItemDto` from the Menu controller. `Description` exists and this screen never renders it.
- The badge writes `IsAvailable`; `Add` writes `Name`, `Price` and `Category`. Both need Menu write
  endpoints — API work, not a schema gap, since the fields are already there. `Category` is one
  string, so the major and minor levels share it: the artboard assigns minors client-side and the
  chips filter a value nothing stores. Everything else is client state, lost on reload. Each recipe
  also has exactly one costed line that scales with the item's own price — the patty at ×0.16, the
  syrup at ×0.14, a plain item's components at ×0.30 — with the remaining lines flat constants, which
  makes `COGS $`, `COGS %` and `MARGIN` partly circular: they restate the price rather than measure
  it.

**Gaps.**

- GAP-01 — no modifier group or option model, so every group, type and option this screen creates has
  nowhere to be written.
- GAP-05 — `MenuItem` has no allergens, so the toggle pills edit nothing.
- GAP-06 — no recipe, ingredient, cost, prep-step or plating model, so the ingredient list, the cost
  cards, the steps, the callouts and the stack are design-only.
- GAP-11 — no stock model, so 86ing an item is a manual flag rather than the consequence of a count
  reaching zero.

#### Integrations

**Purpose.** You connect the channels that send you orders, and you see at a glance which of them are
live.

**Layout.** Panel padding 32px.

- `Delivery & ordering channels` at 800/20px, then the pipeline rule as one 400/13px
  `--upos-ink-subtle` line capped at 560px: `Every connected channel injects into the same order
  pipeline as counter and kiosk — one queue, one kitchen routing.` That sentence is the whole argument
  for the screen, so it sits above the controls rather than inside a tooltip.
- **Channel row**, one per channel, 8px apart, `16px 18px` at `--upos-radius-card` (the artboard draws
  16px) on `--upos-surface-inset`, 16px gaps: a 38px icon tile at `--upos-radius-inset` (the artboard
  draws 12px) filled `--upos-accent` with an 18px white glyph; the channel name at 700/14px over its
  one-line description at 400/12px `--upos-ink-subtle`; the switch on the right.
- **Switch**: a 50×28 track at `--upos-radius-pill` carrying a 22px white knob that slides
  `3px → 25px`. On, the track is `--upos-grad-primary`; off, `--upos-border`. The artboard animates it
  at `.2s` linear; ship `--upos-dur-fast` on `--upos-ease`, the one curve (§8). This is the same
  switch the terminal's modifier modal uses for its combo control (Part II-A). Part III routed it
  into the kit: the recipe is `.u-switch` with `.is-on`, and the Razor primitive is `UposSwitch`.

**States.**

- Per row, connected or not, carried by the track fill and the knob position and nothing else.
- The artboard opens with Uber Eats, DoorDash and Online Ordering on, and SkipTheDish off.
- The description is static per channel and does not follow the switch: SkipTheDish's
  `Not yet connected` still reads that way once you turn it on. Either derive that line from the state
  or write descriptions that hold in both.
- No loading, authorizing or failing state exists in the artboard, and a real connection has all
  three. Carry them on one status line under the name, in §4's colors — awaiting authorization in
  new-blue, connected in ready-green, failing in late-red.
- Every row draws the same glyph on the same accent tile. Per-channel color exists only on the
  terminal's channels queue, where `.u-badge-channel` carries it (Part II-A); bring those colors here
  or keep both surfaces neutral, but do not split the difference.

**Interactions.** The switch is the only control on the screen: one press connects or disconnects,
applied immediately, with no confirm step. That is right for a toggle you flip during a rush and wrong
for one that stops a revenue channel — pair a disconnect with the confirming step §11 describes, where
the dialog names the consequence in `--upos-status-late-text` and the control stays quiet until then.
The rows open nothing: menu mapping, store hours, prep-time padding and commission all belong to a
channel and have nowhere to live here, so give the row a detail pane on the list-and-detail pattern
the roadmap spec sets out.

**Data.**

- The four switches are a client dictionary in the artboard, and nothing reads them.
- Nothing about a channel — its name, its description, its on state, its credentials, its menu-sync
  settings — has a model or an endpoint. A settings store is API work the POC has not started.
- What a channel is actually for sits on the order side: an order arriving from Uber Eats has to say
  so, and `Order` has no field that can. Until it does, connecting a channel changes nothing
  downstream — the terminal's channels queue, kitchen routing and any report split by channel all read
  the same missing field.

**Gaps.**

- GAP-04 — `Order` has no channel or order type, so a connected channel cannot mark the orders it
  sends.
- GAP-13 — no venue or organization entity, so a channel connects to the installation rather than to a
  location, and a second restaurant has nowhere to keep its own.

#### Reports

**Purpose.** You check the three numbers that move margin — what is running out, what food costs, and
what labor costs.

**Layout.** Panel padding 32px, `--upos-space-gap-section` between blocks (the artboard draws 22px),
under `Reports · Riverside Grill` at 800/24px.

- **Low stock**: a 700/13px title, then full-width rows 8px apart at `12px 16px`,
  `--upos-radius-inset`, `--upos-surface-inset`, 14px gaps — an 8px status dot at
  `--upos-radius-pill`, the ingredient name at 700/13px filling the row, a 120×6 level bar at
  `--upos-radius-pill` with `overflow:hidden` over an `--upos-border` track, and the quantity at
  700/12px `--upos-ink-subtle` right-aligned in a 100px slot.
- **Two cards below**, `1fr 1fr` at 20px, each a 700/13px title over an inset card at
  `--upos-radius-card` (the artboard draws 20px), 20px padding, 12px gaps.
- **COGS by category**: one row per category — the name at 700/12.5px left, `{pct}% · target {n}%`
  right in the row's status color — over an 8px bar at `--upos-radius-pill` on an `--upos-border`
  track.
- **Labor by role**: one 700/13px row per role, the role left and `38.5 hrs · $770` right in
  `--upos-ink-subtle`; then a hairline and the footer — `Labor %` at 800/13px against
  `27% · target 24%` in `--upos-status-fired-text`.
- Every bar here is colored by status, not by the palette: its fill is a status token and never
  `--upos-grad-bar` or `--upos-grad-bar-v`. That is §3's own split — a bar whose length already
  carries a number and whose color carries a problem is §4's, and a gradient never carries status.
  The dashboard's daypart chart is the one bar on this surface that carries a quantity alone, so it
  is where the gradient lands, and the two do not swap.

**States.**

- Low stock, per row: under threshold `--upos-status-late`, near it `--upos-status-fired`, healthy
  `--upos-status-ready`. The dot and the bar take the same token, and both are fills (§4).
- COGS, per category: over target fills `--upos-status-late`, under fills `--upos-status-ready`. The
  label repeats that color as text, so ship `--upos-status-late-text` and `--upos-status-ready-text`
  there; the artboard inks it with the fill tokens.
- The bar length is the COGS percentage itself, not progress toward the target, so a 34% category
  against a 30% target draws a bar barely past a third of the track. Mark the target on the track with
  a 1px rule, or the bar says nothing the label has not already said.
- The labor footer is over or under target, colored the same way.
- Empty — with nothing under threshold, the low-stock block carries one statement line:
  `Every tracked item is above its par level.` The artboard draws no empty state (§10).

**Interactions.** None in the artboard: no row has a handler, no row opens a detail, and every figure
is today's. Two things have to arrive before this page ships. A date-range control, because a report
without a range is a dashboard. And a row detail on the list-and-detail pattern the roadmap spec sets
out, because an ingredient at 8% and a category 4 points over target are both questions, and this page
only states them. Bars grow with `fl-grow` on mount (§8).

**Data.** Nothing on this screen binds today.

- Low stock needs a level, a par threshold and a unit per ingredient. The units the artboard shows
  (`18 left`, `4 bags left`, `9 heads left`) differ per ingredient, which puts the unit on the
  ingredient rather than on the report.
- COGS by category needs ingredient costs on a recipe, plus revenue by category — an aggregation over
  `OrderItem` grouped through `MenuItem.Category`, which is API work once the costs exist. The
  per-category targets have nowhere to be configured.
- Labor by role needs hours and a pay rate per employee. The `Labor %` footer is the same figure as
  the dashboard's `LABOR %` stat card, and it reads from one source or the two disagree.
- `Riverside Grill` in the heading is the same literal the dashboard carries.

**Gaps.**

- GAP-06 — no recipe or ingredient cost, so COGS by category has nothing to compute from.
- GAP-09 — no employee, role, shift or pay record, so labor hours, labor cost and labor percent are
  all fixtures.
- GAP-11 — no inventory model, so a level, its par threshold and its unit have nowhere to live, and
  nothing can 86 an item automatically.
- GAP-13 — no venue or organization entity, so `Riverside Grill` in the heading is the same literal
  the dashboard carries, and the per-category COGS targets have no scope to be configured on.

#### Employees, Devices, Settings (roadmap)

**Purpose.** You manage who works here, what hardware is registered and how the venue is configured —
three destinations the sidebar already carries, the artboards do not draw, and one spec covers,
because they ship the same pattern.

**Layout.** The artboard renders one placeholder for all three: a centered block at 60px padding and a
500px minimum height, the destination name at 800/20px over one 400/14px `--upos-ink-subtle` line. Its
copy — `This section is wired in the build but not part of the fluid pass yet.` — is metadiscourse
about the build, which §10 does not allow on a product surface. Replace it per destination with a
statement of what belongs there.

What each screen ships instead is list plus detail inside the panel:

- **List column, 320px**, right hairline, its own scroll: a header at `16px 24px` above a hairline
  carrying `{noun} · {n}` at 800/14px and one bare `+ ADD` text button in `--upos-accent-deep`, filter
  chips where the set needs them, then `.u-data-row` rows 8px apart — `--upos-surface`,
  `--upos-radius-inset`, 1px border, no shadow at rest, lifting `translateY(-3px)` onto
  `--upos-shadow-card` under the pointer (§7, §8). The border carries status where a row has one: an
  offline device is `--upos-status-late`, everything else is `--upos-border`.
- **Detail pane** fills the rest at `24px 28px`, 16px gaps: the record name at 800/18px with its
  actions on the right, then labeled inset blocks in the menu manager's geometry — a
  `--upos-space-pad-inset` block at `--upos-radius-card` under a 700/11px `.08em` `--upos-ink-subtle`
  label.
- **Empty states are statements** (§10): `No employees yet. Add the first one and they can clock in.`
  · `No devices registered. Pair a terminal and it appears here.` · `Nothing is overridden. This venue
  runs the defaults.`
- **Crib the density rather than inventing it.** The parent language's My Accounts is a 183-row table
  at two row densities and settles how tight a long list goes; its Settings screen is sync sources,
  sync logs and audits, and settles how a configuration row reads — a label, its current value, when
  it last changed, and one control. Master Catalog settles the status-bordered row that became
  `.u-data-row`.

**States.** Four per destination: list loaded with a selection; list loaded with none, the detail pane
carrying the empty statement; the record in edit; the record saving. Employees adds active or
inactive on the row. Devices adds online, offline and unpaired, colored by §4 and never by the accent.
Settings adds changed-not-saved, which keeps the save control live and changes nothing else.

**Interactions.** Pick a row to load the detail. The sidebar is the only navigation, and everything
else opens inside the panel. Destructive actions — deactivate an employee, unpair a device, reset a
setting — take `.u-btn--ghost` at rest with the label at `--upos-ink`; the red arrives on the
confirming step, which names the consequence in `--upos-status-late-text` (§11). Rows lift on hover
and the detail rises with `fl-rise`.

**Data.** Nothing. None of the three destinations has a model, a DTO, a controller or an endpoint:
`MenuItem`, `Table`, `Order` and `OrderItem` are the whole schema, and none of them describes a
person, a device or a preference. That is why one spec covers three screens — there is nothing to bind
that would make them differ. Devices is the one of the three that no gap ID covers, and none should:
a registry of devices, their pairing and their last-seen time is a new table contradicting nothing in
the current schema, so it is API work rather than a hole in an existing model.

**Gaps.**

- GAP-09 — no employee, role, PIN or approval model, so Employees has no record to list, and every
  manager approval elsewhere in the product has nobody to check it.
- GAP-13 — no venue or organization entity, so Settings has no scope to attach a setting to, and a
  second location has nowhere to keep its own.

### Part II-C · Kitchen display

The kitchen display is one board on a fixed landscape screen — 1280×800 through 1920×800 — mounted
above a station and read at two metres by someone wearing gloves. Its root carries `.upos-kds`, and it
stays dark whatever `data-theme` says (§11).

**This whole section is a restyle, and this is the one place it is declared.** The secondary artboard
settles what a board shows and what a cook does with it: chit fields, station tabs, timers, bump,
plate view. Every visual value below comes from §11's derivation instead — `--upos-kds-board` under
the grid, `--upos-kds-inset` under a chit, `--upos-kds-ink` on top, status hues from the on-dark set,
and the product's one radius exception at 10px. §11 already reconciled the two languages, so no spec
below repeats the comparison per element the way Part II-A records the terminal's pixels.

Two rulings hold across all four specs. **Every control on the board clears `--upos-touch-terminal`
48px**, and the bump affordance clears it twice over: it runs the full width of its chit, so a gloved
hand cannot fire the wrong ticket (§11). **The artboard's timing constants — amber at four minutes,
red at seven — are demo props over a demo ticket set.** UPOS thresholds are in Chit anatomy, they are
configuration rather than data, and no number in this section is a default a venue cannot change.

#### Station board

**Purpose.** You see one station's open work, oldest first, from across the line.

**Layout.**

- **Board root**, `.upos-kds` on `--upos-kds-board` with `--upos-kds-ink`, landscape at 1280×800
  through 1920×800. The board never scrolls: it is a fixed canvas for a whole shift, and what does not
  fit is counted rather than scrolled to.
- **Header, 60px**, `--upos-kds-inset`, three groups. Left, §9's brand mark — the 34px
  `--upos-grad-primary` tile carrying `UF` in white 800/13px — beside the station name at 800/15px,
  `.14em`. Middle, three load counters, each a 10px label class line over its value: `OPEN TICKETS` at
  800/20px, `AVG TICKET` as mean elapsed in `--upos-type-mono` sized to 20px, `OVER TARGET` at 800/20px
  in `--upos-kds-status-late` when it is above zero and `--upos-kds-ink` when it is not. Right,
  `PLATE VIEW`, `ALL DAY` and `RECALL · N` at 800/11px `.08em`, then the clock in `--upos-type-mono` at
  15px, 24-hour. All-day and recall are UPOS additions, specified in Chit actions. The artboard's
  A/B/C chit-layout switch is demo chrome — this board ships one chit, and it is Chit anatomy.
- **Station strip, 78px** (§11). Tabs are `flex:1`, each carrying its station name at 800/17px `.04em`
  over `{n} ACTIVE` in the 10px label class at `.72` opacity. The selected tab fills
  `--upos-grad-primary` with white ink and a 4px bottom edge; the rest sit on `--upos-kds-inset`. A
  station holding a late chit shows an 8px `--upos-radius-pill` dot in `--upos-kds-status-late` running
  `fl-pulse` beside its count.
- **Paddles, 56px** at each end of the strip, `--upos-kds-inset`, carrying `‹` and `›`. They page the
  strip when a venue runs more stations than the width fits. The drawn set is six — `COLD / PREP` ·
  `FRYER` · `SANDWICHES` · `GRILL` · `EXPO / PASS` · `DRINKS` — and stations are venue configuration,
  not a fixed list. There is no ALL tab: `EXPO / PASS` is the whole-ticket view, and every other tab is
  a filter over the lines routed to it.
- **Chit grid** fills the rest — 12px board padding, `--upos-space-gap-row-loose` 9px gaps,
  `repeat(auto-fill,minmax(340px,1fr))` over two rows. That is five columns at 1920 (§11's density),
  three at 1280, and a chit about 314px tall at either width.
- **Oldest leftmost.** The grid fills left to right, then down, by elapsed time: the oldest ticket sits
  top-left and the newest joins at the tail. That is bump-bar muscle memory — the ticket you are most
  likely to fire next is where your hand already goes.
- **Depth is stated, not hidden.** A station holding more chits than the grid renders `+N WAITING` in
  the last cell at the 10px label class. The artboard caps the grid at ten and drops the rest in
  silence; nobody should work a board that understates its own queue.

**States.**

- Exactly one station is selected, and the grid holds only the lines routed to it.
- A tab holds a late chit, or it does not. The pulsing dot is the only motion on the strip.
- `OVER TARGET` at zero reads in `--upos-kds-ink`; above zero it turns `--upos-kds-status-late`. The
  count carries the message and there is no banner behind it.
- Station clear — a statement, not an apology: `Nothing on the grill. The station is clear.` at
  400/15px in `--upos-kds-ink`. The artboard draws no empty state; this one is a UPOS addition under
  §10's empty-state rule.
- Board, plate view or all-day. The two alternate views replace the grid, keep the header, and return
  from the same `‹ BOARD` control at the head of their own strip.

**Interactions.**

- Tap a tab to filter the grid; tap a paddle to page the strip. Nothing on this screen navigates away.
- Everything a chit does is Chit actions. The grid itself only orders, counts and clears them.
- A new chit enters with `fl-rise`; a bumped chit leaves by fading over `--upos-dur-fast`. `fl-pulse`
  on a late timer and on a late station dot is the only animation that repeats, and it survives
  `prefers-reduced-motion` because it carries status (§8).
- The board is touch. Ship no `:hover` transforms to it — press feedback is the ripple tint (§8).

**Data.** The board is the live `OrderDto` set at `OrderStatus.Confirmed` and `Preparing`, sorted by
`Order.CreatedAt` ascending and filtered to the selected station. `GET /api/orders` fills it on load
and `/hubs/orders` keeps it current — the wiring is the KDS data contract. All three counters are
derived and none is stored: open tickets counts the chits, avg ticket means their elapsed times, over
target counts the ones past the station's threshold. The station filter has nothing behind it —
`OrderItem` names a menu item and no station — so the strip, its counts and its filter are literals
today.

**Gaps.**

- GAP-06 — no recipe, ingredient or station model, so item-to-station routing has nothing to bind to
  and the whole strip is a literal; the station linkage belongs with the recipe entry, because which
  station makes an item is a property of how it is made.
- GAP-13 — no venue or organization entity, so the per-station threshold that `OVER TARGET` counts
  against has no scope to be stored on.

#### Chit anatomy

**Purpose.** You read one ticket's build in the order you work it, without leaning in.

**Layout.** `.u-chit` — `--upos-kds-inset`, `--upos-kds-ink`, 10px radius, `overflow:hidden`, no border
and no shadow. Chits separate by the 9px grid gap (§11). The kit's 280px width is the floor; on the
board a chit takes its grid column.

- **Status edge, 5px**, across the top, carrying the chit's current age color. This is §4's named place
  for status on a chit, and late overrides it for as long as it holds.
- **Header row**, `--upos-kds-inset-hover`, padding `10px 12px`: the order number `#B-118` in
  `--upos-type-mono` sized to 800/20px on the left (§6 — an order number is read digit by digit), the
  elapsed `mm:ss` on the right as `.u-chit__timer` at the same call-site size.
- **Identity row**, `10px 12px`, 8px gaps: `.u-badge-channel` carrying `KIOSK` · `COUNTER` · `ONLINE` ·
  `DELIVERY`, then the guest at 700/13px — `MARTA G.`, `WALK-IN`, `RIDER 4`, `TABLE 3`, data in its own
  casing (§6). On the board the badge takes `--upos-kds-inset-hover` with `--upos-kds-ink`; the kit's
  light pairing does not hold contrast here. A rushed ticket adds `RUSH` at `--upos-radius-pill`,
  `--upos-accent` fill, white 800/10px `.05em` — the accent role is `--upos-accent` on a board (§11),
  and it does not pulse, because `fl-pulse` marks late (§8).
- **Allergen row**, directly under the header and above the build, always (§5). `.u-chip-allergen`
  inverted for dark: fill `--upos-allergen-text`, ink `--upos-kds-ink`. The label is the allergen word
  alone — `GLUTEN`, `DAIRY`, `NUTS` — so a chit reading `NO GLUTEN` in the source renders `GLUTEN`, and
  the violet says the rest.
- **Item lines**, `10px 12px`, 10px between lines: quantity at 800/16px in a fixed 26px column, then
  the item name at 800/17px. Modifiers indent under the name at 700/13px, each prefixed by its kind at
  the 10px label class — `NO` in `--upos-kds-status-late`, `SUB` in `--upos-status-fired`, `ADD` in
  `--upos-kds-status-ready`. Those are §4's hues doing §4's job: a removal is the line that sends a
  plate back, a substitution is a change to catch, an addition is a normal build step.
- **Expo lines add two marks**: the station that owes the item, at the 10px label class in
  `--upos-kds-ink` at `.72`, and `UP` on `--upos-kds-status-ready` once that station has bumped it.
- **Footer**, full width, two parts. Left, the assembly label — `BAG 1`, `TRAY`, and on an expo chit
  `{n}/{m} UP` — at the 10px label class. Right and dominant, the bump bar: 56px tall, the full
  remaining width, `--upos-grad-primary`, white 800/13px `.1em`. Its labels and its refusals are Chit
  actions.

The timer's thresholds, measured from `Order.CreatedAt`:

| Elapsed | Timer | Status edge |
| --- | --- | --- |
| 0–5m | `--upos-kds-ink` | `--upos-kds-status-new` |
| 5–10m | `--upos-status-fired` | `--upos-status-fired` |
| Over 10m | `.u-chit__timer--late` `--upos-kds-status-late`, pulsing `fl-pulse` | `--upos-kds-status-late` |

Both thresholds are configured per station — a fry station's five minutes is not a braise's — and the
state is derived on every tick and never stored (§4).

**States.**

- Nothing started · some items struck · every item struck. An expo chit adds a fourth: every station
  up and waiting to be bagged.
- Item made — the name drops to `--upos-kds-ink` at `.4` with `line-through`, its modifiers fall to
  `.35` opacity, and `UP` appears on the line.
- Allergen present or absent. Rush or not. Late or not, which overrides the edge and pulses the timer.
- Station chit or expo chit: a station chit holds only the lines routed to that station, an expo chit
  holds every line on the order with its station tag.

**Interactions.** Every tap on a chit is Chit actions. What belongs to the chit itself is the timer:
it counts up once a second, recolors at its thresholds, and pulses past the second one. Nothing else
on a chit moves.

**Data.** The order number is `Order.OrderNumber`. The timer is derived from `Order.CreatedAt` and
nothing else. Item lines are `OrderItemDto` — quantity and menu-item name, which is the whole of what
binds. Everything else on the chit is unbound: the channel badge, the guest name, the rush flag, the
allergen chips and the modifier lines all render from artboard fixture. The one field a modification
can live in today is the free-text `OrderItem.SpecialInstructions`, which is not on `OrderItemDto` and
carries no kind, so a cook cannot read `NO` from `SUB` from `ADD` out of it (GAP-01). The assembly label is the one
field that is plain API work rather than a hole — a bag or tray number is a new column on `Order`
contradicting nothing in the schema.

**Gaps.**

- GAP-01 — no modifier group or option model, so `NO`, `ADD` and `SUB` lines have no structured source
  and the kitchen reads free text.
- GAP-04 — `Order` has no channel or order type, so `.u-badge-channel` on every chit is a literal.
- GAP-05 — `MenuItem` has no allergens, so the row a cook is meant to read first is design-only.

#### Chit actions

**Purpose.** You work a ticket with one hand, in a glove, without a mis-tap costing you a plate.

**Layout.** Three zones on a chit, and each one is either large or armed.

- **Item line**, the full chit width and at least `--upos-touch-terminal` 48px tall.
- **Bump bar**, the full chit width at 56px — the one control on the board that is deliberately
  oversized (§11).
- **Armed chit**, the whole card, live only while plate view is armed: it takes a 2px `--upos-accent`
  outline and every other tap on it is suspended.

The artboard puts a 46px recipe button beside the bump bar. It is dropped: a small target next to the
one control that must not misfire is exactly what §11's full-width bump rule exists to prevent, and
§11 already routes plate view through the header instead.

**States.**

- Item not made, or made — struck per Chit anatomy. Tapping it again undoes the strike.
- Bump bar live (`BUMP`, `--upos-grad-primary`) or refusing. An expo chit reads `WAITING` on
  `--upos-kds-inset` and does not respond until every station line is up, then turns `BAG IT`.
- Plate view armed or off. Armed, the header button fills and every chit outlines.
- All-day open or closed; recall lane open or closed.

**Interactions.**

- **Tap an item line to strike it** on a station chit — that item is made. On an expo chit the strikes
  are not tappable: they mirror the station bumps, which is what the artboard implements. Per-item
  strike by tap is a UPOS addition, and it is local state (see Data).
- **Tap the bump bar to fire the whole chit.** A station chit leaves that station's grid; an expo chit
  bags the ticket and moves the order to `Ready`. The chit leaves on the tap and the write follows —
  no tap waits on the network (§11's 150ms rule).
- **Recall.** The last three bumps stay recoverable for 60 seconds behind `RECALL · N` in the header,
  which opens a 120px lane under the station strip: each recalled chit shows its order number, its
  still-running timer and a full-width `RETURN` bar that puts it back in the grid at its true age. Both
  numbers are configuration. The artboard has no recall — its bump is one-way — and a board without one
  makes an irreversible control out of the largest target on the screen.
- **Plate view.** Arm `PLATE VIEW` in the header, then tap a chit: the board is replaced by the plating
  reference for that chit's item. There is no long press — a long press through a glove is a coin
  flip, and arm-then-tap says out loud what the next tap will do. The view runs a 64px strip
  (`‹ BOARD`, the chit and item it came from, a tab per item, the target time in
  `--upos-kds-status-ready`) over three columns: plated reference photos with the cut-and-present note,
  the stack top to bottom with a quantity per layer, and the ingredient order with timing, hold and
  what sends the plate back.
- **All day.** `ALL DAY` replaces the grid with one row per item across the station's open chits —
  quantity at `--upos-type-display` in a 90px column, item name at 800/17px, and the number of tickets
  it spans at the 10px label class — sorted by quantity. It answers the station's real question — how
  many fries, not how many chits. The artboard does not implement it; it is a UPOS addition, and it is
  pure derivation over the same chit set.

**Data.** A strike is client state. A bump is the only action here that writes, and it writes a whole
order's status (KDS data contract), so a station bump on a multi-station order is local until the last
station goes — the POC has no per-item and no per-station status to write. Recall re-posts the chit's
previous status through the same endpoint, so it needs no new API. Plate view has no source at all.
A per-item done flag is API work rather than a hole: a column on `OrderItem` contradicts nothing in
the current model.

**Gaps.**

- GAP-01 — no modifier model, so an all-day count aggregates item names and cannot separate a build
  from its variants.
- GAP-06 — no recipe, ingredient or plating model, so every panel in plate view — photos, stack,
  ingredient order, timing, hold — is drawn from fixture, and the same entry carries the
  item-to-station linkage that decides which chit a line lands on.

#### KDS data contract

**Purpose.** You know what the board reads, what a bump writes, and what nothing behind it can say.

**Layout.** This spec has no geometry of its own. The board's regions are Station board, the ticket is
Chit anatomy, and what follows is the wiring under both.

**States.** `OrderStatus` decides what is on the board at all:

| `OrderStatus` | On the board |
| --- | --- |
| `Pending` | Not shown — built on a terminal, not yet sent |
| `Confirmed` | A new chit, status edge `--upos-kds-status-new` |
| `Preparing` | Working; from here the age color owns the edge |
| `Ready` | Bumped off — the expo `BAG IT` is what writes it |
| `Served` · `Completed` | Never on the board |
| `Cancelled` | Pulled from the grid on arrival, with no confirmation step |

Late is not in that table and never will be. It is derived from `DateTime.UtcNow - Order.CreatedAt`
against the station's threshold, it overrides the edge and the timer for as long as it holds, and no
endpoint returns it (§4).

**Interactions.**

- **A bump writes status.** `PUT /api/orders/{id}/status` with an `UpdateOrderStatusDto` — `Preparing`
  when the first station fires, `Ready` when expo bags it. The API broadcasts
  `ReceiveOrderStatusUpdate` on `/hubs/orders` to the `Order_{id}` group, and every other board and
  terminal restyles in place.
- **New work arrives on the hub.** `ReceiveNewOrder` adds a chit at `Confirmed`;
  `ReceiveOrderCompleted` drops one that closed elsewhere.
- **A recall is the same call in reverse** — the previous `OrderStatus` back through
  `PUT /api/orders/{id}/status`. Nothing records that a recall happened.
- **On reconnect the board refetches** `GET /api/orders` and rebuilds rather than replaying missed
  events. A board that missed a bump must not keep a chit that is already bagged.

**Data.**

- The chit set is `GET /api/orders` filtered to `Confirmed` and `Preparing`, ordered by
  `Order.CreatedAt`.
- **Timers are derived client-side from `Order.CreatedAt`, every second, and never stored.** No elapsed
  value, no late flag and no threshold breach is written back or returned by any endpoint. The
  thresholds themselves are configuration, not data.
- **The POC writes a whole order's status, not a station's or an item's.** A five-station board still
  moves one `OrderStatus`, so per-station progress lives in the client until expo closes the order —
  the single largest thing this contract cannot express.
- Header counters, all-day counts and the recall lane are all derived from the same chit set; none of
  the three needs an endpoint.
- Per-item done flags, a station column on `OrderItem` and an assembly label on `Order` are additive
  API work — new fields that contradict nothing in the current model, and the dev team's call.

**Gaps.**

- GAP-01 — no modifier model, so the build lines a cook actually works from arrive as free text.
- GAP-04 — `Order` has no channel or order type, so the chit's channel badge is unbindable and a
  per-channel target has no field to key on.
- GAP-05 — `MenuItem` has no allergens, so the allergen row cannot be driven by data.
- GAP-06 — no recipe, ingredient or station model, so this entry carries the item-to-station linkage
  the board routes on as well as plate view's content: which station makes an item is part of how the
  item is made, so it belongs with the recipe rather than with the order.

### Part II-D · Kiosk

The kiosk is one portrait floor unit — 1080×1920 — standing in a lobby and used once, by a stranger,
with nobody to ask. It ships the standard light Fluid surfaces: `--upos-ground` behind,
`--upos-surface` panels floating on it (§2), light whatever `data-theme` says (§11). What changes for
the guest is scale, not language — the kiosk type scale and `--upos-touch-kiosk` 60px, both set in
Guest-facing rules.

**This whole section is a restyle, and this is the one place it is declared.** The secondary artboard
settles what a kiosk shows and what a guest does with it: the screen sequence, the two-concept brand
bar, the grid/list toggle, the modifier groups, the automatic combo, the cart and its savings line,
the bag bar and the done screen. Every visual value below comes from Part I instead — the surface
ladder, the radius scale, the shadow trio, `--upos-accent` and `--upos-accent-deep` in the accent
role, `--upos-grad-primary` on the primary. The artboard's bone ground, its house red, its
zero-radius chrome, its rules-as-structure and its Archivo 900 do not survive. §11 already reconciled
the two languages for the kitchen display and the same reconciliation runs here, so no spec below
repeats the comparison per element.

**One recasing, declared once.** The artboard sets every control in uppercase Archivo 900 at display
sizes. §6 puts UPPERCASE in the 10px label class and in status words only, and §10 makes a button a
sentence-case verb, so the controls ship as `Start over`, `Submit order`, `Add to order`,
`Keep it plain`, `Add the combo`, `Start a new order`, `Review and pay →`, `Add more`, `Back` and
`Remove`. Kickers keep their case, because a kicker is the label class doing its job: `IN BAG`,
`ORDER SENT TO THE KITCHEN`, `AUTO-COMBO FOUND`, `SUGGESTED WITH YOUR ORDER`, the step line, the
category names and the group titles. `›` becomes `→`, and the em dash in the step line becomes the
middot (§9, §10).

Two rulings hold across all three specs. **Every control a guest can touch clears
`--upos-touch-kiosk` 60px**, including the ones the artboard draws smaller — the layout toggle, the
promo dots, the back control and the per-line `Remove`. `.u-btn` sets `--upos-touch-terminal`, so
every kiosk call site raises `min-height` to `--upos-touch-kiosk`. **And nothing on this surface is
staff-facing**: no 86 badge, no void, no `OrderStatus` word, no station name, no channel badge.
Guest-facing rules holds that list in full.

The artboard's second kiosk — the smoothie bar at 1F — draws one concept with the order building in a
side rail and no item, combo or done step. It is a layout study of the same browse-and-add loop, not
a second product, and the flow below is what UPOS ships.

#### Kiosk flow

**Purpose.** A guest orders and pays alone, and the order lands in the same queue a counter order
lands in.

**Layout.** One `--upos-surface` panel at `--upos-radius-panel`, clipped, filling 1080×1920 over
`--upos-ground` at `--upos-space-page` 14px. A fixed 124px concept bar sits at the top and a fixed
96px bag bar at the foot; everything between them is a screen.

- **Concept bar, 124px**, `--upos-surface-inset` under a 1px `--upos-border`. One `flex:1` button per
  concept at padding `0 32px`: the 34px `--upos-grad-primary` mark (§9), the concept name at 800/23px
  `.13em` over its line in the 14px label class; selected, it fills `--upos-grad-primary` in white and
  the rest sit on the inset at `--upos-ink`. A 280px right block carries the step kicker —
  `STEP 1 · BROWSE BOTH MENUS` through `SENT` — over a `.u-segmented` grid/list toggle. A
  single-concept venue drops the buttons and keeps the mark and the kicker.
- **Attract** fills the panel with `--upos-grad-primary` in white, no bag bar: the mark at 96px, the
  venue name at 800/72px `-.035em`, one line at 400/26px, and `Tap to start` on a 96px
  `.u-btn--secondary`. A touch anywhere starts the order. UPOS addition — the artboard opens on browse.
- **Promo band, 190px**, browse only, `--upos-grad-dark` with `--upos-kds-ink` (§2, §4): a kicker in
  the label class at 14px `.16em` in `--upos-on-dark-accent`, the headline at 800/40px `-.02em`, one
  line at 400/19px, a 120px column of three `--upos-radius-pill` dots each in a 60px hit area, and a
  300px `--upos-radius-card` photo frame. It is merchandising and never carries status (§3, §4).
- **Browse, grid.** The screen title at 800/62px `-.03em` over one line at 400/22px; a strip of
  `flex:1` category buttons at 800/21px, selected on `--upos-grad-primary`; then `1fr 1fr` cards at
  24px gaps. A card is `--upos-surface` at `--upos-radius-card` with `--upos-shadow-card`: a 220px
  photo frame, then `20px 22px 22px` carrying the name at 800/27px `-.015em` beside the price in
  `--upos-type-mono` at 24px in `--upos-accent-deep`, the description at 400/19px, `.u-chip-allergen`
  chips (§5), and the merchandising tag — `MOST ORDERED`, `NEW` — at `--upos-radius-pill` on
  `--upos-accent` in white 800/14px `.1em`.
- **Browse, list.** A 280px category rail on `--upos-grad-dark` with `--upos-kds-ink`, the same move
  as the back-office sidebar (§2, §3): `MENU` in the label class, one 88px button per category at
  800/20px, selected on `--upos-grad-primary`, and a closing note at 400/19px at `.72`. The rest
  carries the category title at 800/66px `-.03em` beside its count, then full-width rows — a 104px
  photo at `--upos-radius-inset`, the name at 800/30px with its tag, the description at 400/19px,
  `.u-chip-allergen` chips (§5), the price in `--upos-type-mono` at 28px, and a 60px `+` on
  `--upos-grad-primary`.
- **Suggestion strip**, at the foot of browse above the bag bar, `--upos-surface` at `20px 40px 24px`:
  `SUGGESTED WITH YOUR ORDER` in the label class beside its note at 400/19px, then three `1fr` cards
  at 14px gaps — a 56px photo at `--upos-radius-inset`, the name at 800/19px over its counter in the
  label class, the price in `--upos-type-mono` at 19px, and a 60px `+` on `--upos-grad-primary`. On a
  list row and on a suggestion card the whole element is the target and the `+` is its affordance.
- **Item detail.** A 420×300 photo frame at `--upos-radius-card` beside a block at `30px 36px`: a
  `Back` `.u-btn--secondary`, the item name at 800/48px `-.02em`, `.u-chip-allergen` chips under it
  (§5), the description at 400/19px, and the running unit price pinned to the bottom in
  `--upos-type-mono` at 32px in `--upos-accent-deep`. Below
  at `26px 40px`, groups 24px apart: the title at 800/22px `.02em` beside its rule — `PICK ONE` or
  `ANY` — in the label class at `--upos-ink`, then `1fr 1fr 1fr` options at 12px gaps, each at
  `--upos-radius-inset` on `--upos-surface-inset` with its label at 800/19px and its delta in
  `--upos-type-mono` at 19px, selected on `--upos-grad-primary`. The footer is one full-width 96px
  `.u-btn--primary` reading `Add to order · $NN.NN`. **The artboard's `CANCEL` beside it is dropped**:
  a discard against a commit is what §11's adjacency rule prevents, and `Back` already exits.
- **Combo sheet**, 940px wide, `max-height:1400px`, its own scroll, `--upos-radius-panel`,
  `--upos-surface`, `--upos-shadow-modal`, on `--upos-scrim`. Head on `--upos-grad-primary` in white:
  `AUTO-COMBO FOUND` in the label class at 15px `.16em`, `Make it a combo, save $N.NN.` at 800/50px
  `-.025em`, one line at 400/22px naming the item it found. Body: `1 · PICK A SIDE` and
  `2 · PICK A DRINK` at 800/24px over `1fr 1fr 1fr` tiles carrying the name at 800/22px over
  `à la carte $N.NN` in `--upos-type-mono` at 19px, selected on `--upos-grad-primary`. Then a summary
  on `--upos-surface-inset`: `À LA CARTE $NN.NN` in the label class over `Combo $NN.NN` at 800/30px
  with `You save $N.NN` at 800/20px in `--upos-accent-deep`. Footer, 96px: `Keep it plain` as a
  `.u-btn--ghost` at `--upos-ink` (§11), then the confirm.
- **Cart.** Head at `36px 40px 24px`: `Review your order` at 800/56px `-.02em` over
  `4 items · 2 from the deli · 2 from the tea bar · nothing is sent until you submit` at 400/19px,
  with `Add more` as a `.u-btn--secondary` and `Start over` as a `.u-btn--ghost` at `--upos-ink`
  (§11) on the right. Lines group by concept under a header row — a 22px `--upos-radius-pill` mark,
  the concept name at 800/20px `.12em`, its counter note in the label class, a `--upos-border`
  hairline, and the group sum in `--upos-type-mono` at 18px. A line runs `{n}×` in `--upos-type-mono`
  at 26px in a 52px column, the item name at 800/28px `-.015em`, the middot-joined mods at 400/19px,
  `.u-chip-allergen` chips (§5), and the combo chip `COMBO · Fries + Fountain Soda` at
  `--upos-radius-pill` on `--upos-surface-inset` in `--upos-accent-deep` 800/14px; right, the line
  price in `--upos-type-mono` at 26px over a `Remove` `.u-btn--ghost` at `--upos-ink` (§11).
- **Cart totals**, under a hairline: `Subtotal` at 400/19px, `Combo savings` `−$N.NN` at 800/19px in
  `--upos-accent-deep`, `Tax`, a 2px `--upos-border` rule, then `Total` at 800/42px with its amount in
  `--upos-type-mono`. The 96px footer band carries one full-width `Submit order · $NN.NN` as a
  `.u-btn--primary`. **The artboard has no pay screen**, so it lands `START OVER` and `SUBMIT ORDER`
  together on this band, flush and adjacent; **`Start over` moves to the head** for the reason
  `CANCEL` was dropped from the item screen — width is not separation, and on both screens the commit
  owns the footer alone with every exit a scroll region away in the head.
- **Pay** is centered on `--upos-surface`: the amount at 800/96px in `--upos-type-mono`,
  `Insert, tap or swipe` at 800/34px, a reader illustration at `--upos-radius-card`, and `Cancel` as a
  60px `.u-btn--ghost` at `--upos-ink`. No tip prompt and no signature — neither has anywhere to be
  stored. UPOS addition; the artboard's submit goes straight to done.
- **Done** fills the panel with `--upos-grad-primary` in white, no bag bar, `0 40px`, 34px gaps:
  `ORDER SENT TO THE KITCHEN` in the label class at 17px `.18em`; the order number at
  `--upos-type-display` sized to 200px/.86 at `-.04em`, the role §6 names for it, tracking continuing
  §6's ramp past its 42px row; the pickup note at 400/30px; then `Start a new order` as a 96px
  `.u-btn--secondary`. The number renders bare, with no `#` — the kicker already says what it is.
- **Bag bar, 96px**, on `--upos-surface` under a 1px `--upos-border`: `IN BAG` in the label class at
  14px `.12em`, the line count at 800/30px, the running total in `--upos-type-mono` at 30px in
  `--upos-accent-deep`, then a 420px `Review and pay →` `.u-btn--primary` filling the bar's height. It
  rides browse, item detail and the combo sheet, and is hidden on attract, cart, pay and done — the
  artboard renders it on every screen, which on done offers a second review of an order already sent.

**States.**

- Attract · browse · item · combo · cart · pay · done. The artboard implements the middle five;
  attract and pay are UPOS additions.
- Browse renders in grid or in list, and the toggle survives every category and concept change.
- Exactly one concept is selected and exactly one category within it; switching concept resets the
  category to that concept's first.
- Promo band rotating, one panel every six seconds, or pinned by its dot. Pinning is one-way —
  nothing resumes the rotation but a reset.
- Item detail arrives with the first option of every single-select group chosen and every
  multi-select group empty. Required and optional are carried by the words `PICK ONE` and `ANY` and
  never by color: the artboard tints the required note red, and red marks a problem someone has to
  act on (§4).
- Combo sheet with neither, one, or both of side and drink chosen. Until both are, the confirm is a
  `.u-btn--secondary` reading `Pick a side and a drink` and does not respond; the second choice makes
  it a `.u-btn--primary` reading `Add the combo · +$4.50`. The artboard greys it instead, and a grey
  control on a guest screen reads as broken rather than as waiting.
- Cart empty — `Nothing in the bag yet. Tap Add more to start.` at 400/22px in `--upos-ink`. The
  artboard stops at the first sentence; the next move is a UPOS addition under §10's empty-state
  rule. The savings line, a line's mods and a line's combo chip each render only when there is one.
- Bag bar at zero reads `0` and `$0.00` with a `.u-btn--secondary`; the first line makes it primary.
- Idle, then warned, then wiped — Guest-facing rules holds the timing. 86'd never appears: an
  unavailable item is absent from the menu, not marked in it.

**Interactions.**

- **Tapping a concept** switches the menu, resets the category and returns to browse; the bag
  survives, because one order carries both counters. **The layout toggle** swaps grid for list over
  the same menu. **A promo dot pins its panel.** **A category** filters the menu and returns to browse
  from wherever you were.
- **Tapping an item opens the item detail**, from a grid card or a list row in either layout. Every
  item opens it, so a guest never learns that some taps ask questions and others do not.
- **The group logic is the terminal Modifier modal's, unchanged**: a single-select option replaces the
  group's choice, a multi-select option toggles, the upcharge rides in the label (`+$2.50`, `−$1.50`,
  nothing at zero), and every tap recomputes the running price in the header and on the primary. Only
  the container differs — at 1080px with 60px targets and four groups the terminal's 480px modal
  cannot hold it, so the kiosk builds an item on a screen rather than over one, and §11's
  prefer-a-modal rule yields where the content does not fit.
- **`Add to order` pushes one cart line** carrying the item, the middot-joined mods and the computed
  unit price, then returns to browse — or raises the combo sheet.
- **The combo prompt fires at most once per order.** The artboard raises it on every combo-eligible
  item; UPOS raises it on the first and adds the rest silently. It is a sheet over browse, never a
  step between the guest and their order (§11).
- **`Keep it plain`** closes the sheet and leaves the line in the bag at à la carte price.
  **`Add the combo`** rewrites the line just added: the price takes the combo price, the label takes
  `COMBO · {side} + {drink}`, and the difference from à la carte becomes that line's saving, which is
  what the cart's savings line sums.
- **A suggestion adds in one tap**, at base price, with its mods line reading `as it comes` — no item
  detail and no combo sheet. **`Remove` drops a line** with no confirmation: nothing is sent until
  submit, and the line is one tap to add back.
- **`Review and pay →` opens the cart and `Add more` returns to browse.** `Submit order` opens pay,
  and an approved card opens done. **`Start over` and `Start a new order` are the same reset** — the
  bag empties, the concept and category return to their first, and the kiosk goes back to attract.
- Screens enter with `fl-rise` and the combo sheet rises with it at `--upos-dur-slow` over
  `--upos-scrim` at `--upos-blur-scrim` (§7, §8). The kiosk is touch: ship no `:hover` transforms to
  it, and press feedback is the ripple tint (§8).

**Data.** Everything on these screens is client state until the card approves. The menu is
`MenuItemDto` and the submit is a `CreateOrderDto` — both are the Kiosk data contract. The cart, the
selections, the running price, the combo rewrite, the totals and the tax are all computed in the
client and none of it survives a reset. Prices are held in cents and formatted once (`$14.95`), which
is what keeps the savings arithmetic exact. The order number on the done screen is
`Order.OrderNumber`; the artboard's is a fixture that never increments.

**Gaps.**

- GAP-01 — no modifier group or option model, so every group, option and upcharge on the item screen
  lives in the client.
- GAP-02 — no combo entity, so the auto-detection, the combo price and the per-line saving have
  nothing to persist to.
- GAP-05 — `MenuItem` has no allergens, so the chips on the grid card, the list row, the item detail
  and the cart line are design-only.
- GAP-08 — no payments domain, so the pay screen records nothing it does.

#### Guest-facing rules

**Purpose.** You can hand this screen to someone who has never seen it and they finish without asking
a question.

**Layout.** This spec has no geometry of its own. Kiosk flow places the regions; what follows is the
scale, the target minimum and the contrast floor every one of them is drawn to.

**The kiosk type scale is Part I's roles at ×1.4**, rounded up to the whole pixel. Same six roles,
same three weights, same family — nothing new is invented for the guest.

| Role | Terminal | Kiosk | Carries at the kiosk |
| --- | --- | --- | --- |
| `--upos-type-display` | 28px | 40px | Screen totals · scaled again for the order number |
| `--upos-type-heading` | 18px | 26px | Group and section titles |
| `--upos-type-row` | 13px | 19px | Item names, control labels |
| `--upos-type-body` | 13px | 19px | Descriptions, notes, every sentence |
| `--upos-type-label` | 10px | 14px | Kickers, counts, the bag label, the step line |
| `--upos-type-mono` | 13px | 19px | Prices, totals, line amounts |

**19px is the floor for anything a guest reads and 14px is the floor for a label.** Screen titles,
item names and the order number run well above the scale at the call-site sizes Kiosk flow records —
62px, 48px, 200px — with tracking from §6's ramp. The scale is a minimum, not a cap.

**Every target clears `--upos-touch-kiosk` 60px**, and the two order-committing controls —
`Add to order` and `Submit order` — take the full 96px band. Adjacent targets stand at least
`--upos-space-gap-row` 8px apart, and two irreversible controls are never adjacent (§11): every footer
band that commits the order carries its commit alone, and the discard the artboard draws flush beside it —
`CANCEL` on the item screen, `START OVER` on the cart — is dropped or moved up into that screen's
head. Width is not separation.

**WCAG 2.2 AA, and one pairing fails it.** `--upos-ink-subtle` on `--upos-surface` computes 3.0:1
(§11). Size does not rescue it here — the large-text allowance starts at 24px regular and kiosk body
copy is 19px — so **anything the guest must read takes `--upos-ink`**, which reads 16.6:1 (§11).
`--upos-ink-subtle` has no role on this surface at all: not on the description, not on the mods line,
not on the quantity column, not on a ghost button's label. The pairings that do hold:

| Pairing | Ratio | Where |
| --- | --- | --- |
| `--upos-ink` on `--upos-surface` | 16.6:1 | Every sentence and every name |
| `--upos-accent-deep` on `--upos-surface` | 9.4:1 | Prices, the combo chip, the savings line |
| White on `--upos-accent` | 6.29:1 slate · 6.60:1 indigo · 4.72:1 teal · 3.96:1 sky | The merchandising tag, whose fill is flat rather than the gradient |
| White on `--upos-grad-primary` | 6.29:1 to 9.4:1 on slate; the accent end is the floor, so 4.72:1 on teal and 3.96:1 on sky | Primary buttons, the attract and done screens |
| `--upos-kds-ink` on `--upos-grad-dark` | 14.2:1 | The promo band and the list rail |

**Two of the four accents do not hold white text on this surface** (§3). Slate and indigo are
certified; teal at 4.72:1 clears the floor with nothing in hand; **sky at 3.96:1 fails it**. A kiosk
running sky fills every white label — the merchandising tag, the primary buttons, the attract and
done screens — with `--upos-accent-deep` `#2a5578` at 7.9:1 rather than with `--upos-accent` or
`--upos-grad-primary`. The accent is per-venue branding (§11), so this is a rule the venue's accent
picks, not one a screen picks.

WCAG 2.2's target-size minimum is 24×24 (2.5.8) and this surface clears it two and a half times over.

**States.**

- Available or absent. **An 86'd item is not on the kiosk menu at all** — no struck name, no `86'D`
  pill, no dimmed tile. §4 keeps the tile on the terminal because a server has muscle memory for where
  it lives; a guest has none, and `86'D` is staff jargon before it is a label.
- Daypart open or closed. A menu outside its window is absent the same way: no greyed section and no
  "available from 11". The promo band is where a venue announces what is coming, and it is the only
  place.
- Attended or idle. Idle has two steps, below.
- Reader idle, reading, approved or declined. A decline names the cause and the next move on one line
  (§10): `Card declined · try another card`.

**Interactions.**

- **Idle wipes the cart, and warns first.** After 60 seconds untouched on any screen holding a cart, a
  560px sheet rises — inside `UposModal`'s 380-to-940 range (Part III) — carrying `Still there?` at
  800/40px, `Your order clears in 10 seconds` at 400/26px counting down, and a `Keep going`
  `.u-btn--primary` at 96px. A touch anywhere dismisses it. At zero the kiosk
  resets to attract with an empty bag. Neither timer is in the artboard; both are UPOS additions and
  both are configuration.
- **The done screen resets itself after 30 seconds**, running the same reset `Start a new order` runs.
  A kiosk left showing a stranger's order number is a kiosk out of service.
- **Upsell is one combo prompt per order plus one suggestion band**, and neither stands between the
  guest and the bag. The prompt is a sheet over browse; the band is a strip at the foot of browse.
  Nothing on this surface is interstitial.
- **No staff vocabulary reaches the guest.** Not `86'D`, not `VOID`, not `FIRED`, not `SENT` as a
  status word, not a station name, not a seat or cover count, not a channel badge. The done screen
  says the order went to the kitchen because that is the fact a guest needs, and nothing else on the
  surface names an `OrderStatus` value.
- **Loyalty, where a venue asks for it**, is one optional control on the cart above the totals — never
  a gate in front of the menu and never a keypad a guest has to clear to order.
- **No hover, ever** (§8). And `fl-pulse` does not run on this surface: it marks late, and nothing a
  guest sees is late.

**Data.** Availability is the one rule here with a field behind it — `MenuItem.IsAvailable`, read
through `MenuItemDto`, which the kiosk filters on rather than renders. The type scale, the target
minimum, the contrast floor and both timeouts are configuration and CSS, not data. Dayparting has no
source at all: `IsAvailable` is a bool with no schedule behind it, so a daypart is a hand flip today
and a menu-period window is schema work.

**Gaps.**

- GAP-05 — `MenuItem` has no allergens, so the one thing a guest may need to read before ordering is
  design-only.
- GAP-12 — no loyalty account entity, so a kiosk loyalty control has nothing to identify a guest
  against.
- GAP-13 — no venue or organization entity, so the daypart windows, the tax rate and both timeouts
  have no scope to be stored on.

#### Kiosk data contract

**Purpose.** You know what the kiosk reads, what a submit writes, and what nothing behind it can say.

**Layout.** This spec has no geometry of its own. Kiosk flow holds the screens; what follows is the
wiring under them.

**States.** The kiosk is a write-once client — it posts one order and stops — so `OrderStatus` shows
the guest almost nothing:

| `OrderStatus` | What the guest sees |
| --- | --- |
| `Pending` | Nothing — the order exists for the moment between the post and the kitchen accepting it |
| `Confirmed` | The done screen, where the kiosk tracks status at all |
| `Preparing` · `Ready` | Nothing — pickup is called from the board, not from the kiosk |
| `Served` · `Completed` · `Cancelled` | Nothing |

Nothing on the done screen changes after the number lands, and the auto-reset is a timer rather than a
status.

**Interactions.**

- **Browse reads the menu.** `GET /api/menu` on the Menu controller returns `MenuItemDto`. The kiosk
  uses `Name`, `Price`, `Category`, `Description` and `ImageUrl`, and filters on `IsAvailable`. It is
  the one screen in UPOS that renders `Description`, because a guest has nobody to ask. Categories
  come from grouping on `Category`, the same way the terminal builds its rail.
- **Submit writes one order, after the reader approves.** `Submit order` opens pay; an approval builds
  a `CreateOrderDto` with one `OrderItemDto` per cart line and posts it to `POST /api/orders` on the
  Orders controller. The API broadcasts `ReceiveNewOrder` on `/hubs/orders` and the order reaches the
  kitchen board like any other. The response is an `OrderDto` at `OrderStatus.Pending`, and its
  `Order.OrderNumber` is the number the done screen prints. The kitchen never receives an order the
  reader declined.
- **The done screen may listen, and it may not.** Where a venue wants a live pickup line, the kiosk
  joins `Order_{id}` on `/hubs/orders` and takes `ReceiveOrderStatusUpdate` for the thirty seconds it
  is up, and the note under the number is the only thing that changes. Nothing else on this surface
  subscribes.
- **One tap waits on the network, and only one** (§11). Every control before pay applies its local
  state change first; the done screen's number cannot, because the number is the response.
- **No network means no orders.** A kiosk that cannot reach the API cannot take a card and cannot
  promise a number, so it returns to attract and says so in one line. It does not queue the way the
  terminal does — an unattended device holding writes nobody is watching is worse than a dark screen.

**Data.**

- The menu is the only read: one `GET /api/menu` on wake, refreshed on every reset. A kiosk that
  caches a menu for a shift sells an item the kitchen 86'd an hour ago.
- **The arithmetic is entirely client-side.** Unit price is base plus the selected upcharges; the
  combo rewrite adds the combo price and records the difference from à la carte; subtotal sums the
  lines; tax is the venue's rate on the subtotal; total is both. None of it is sent —
  `CreateOrderDto` carries lines, not money.
- **`OrderItemDto` has no field for a selection.** A guest's bread, toppings, sugar level and combo
  pairing reach the API as nothing at all, and this is worse here than at the terminal: a server can
  tell the kitchen what the modal could not carry, and a kiosk guest cannot.
- **Nothing marks the order as a kiosk order.** The `KIOSK` badge a chit prints (Part II-C) is a
  literal, and the same hole means a venue cannot route, price or count kiosk orders separately.
- **Quantity is per line, not merged.** The artboard pushes a new line on every tap, so `qty` is
  always 1 and two of the same sandwich are two lines. The terminal merges (Part II-A) and the kiosk
  should; `OrderItemDto` carries the quantity either way, so this is a client fix rather than API
  work.
- An order-number sequence, a kiosk device identifier and a per-item note field are additive API work
  — new fields that contradict nothing in the current model.

**Gaps.**

- GAP-01 — no modifier group or option model, so every choice a guest makes reaches the API as
  nothing.
- GAP-02 — no combo entity, so the auto-detection, the combo price and the savings line have no source
  and nowhere to be stored.
- GAP-04 — `Order` has no channel or order type, so nothing on a submitted order says it came from a
  kiosk.
- GAP-05 — `MenuItem` has no allergens, so every chip §5 puts on a kiosk surface is design-only.
- GAP-08 — no payments domain, so the card-present step records neither the approval nor the tender.
- GAP-10 — no idempotency key on `CreateOrderDto`, so a submit retried across a flaky link can produce
  two orders and two numbers for one guest.
- GAP-12 — no loyalty account entity, so a kiosk cannot identify the guest it is serving.

---

## Part III · Component inventory

Part I is the language and Part II is the screens. This is what sits between them: the Razor
components `Restaurant.UI.Shared` ships so that a screen is assembled rather than styled. All four
surfaces read the same library — the terminal in `Restaurant.Mobile`, the back office in
`Restaurant.Blazor`, and the kitchen display and kiosk when they are built.

Twenty-five components. Three exist in the POC and are restyled onto the kit; twenty-two are new,
and between them they consume every class in `upos-components.css`. **Nothing else in Part II is a
component.** The AI insight banner, the promo band, the concept and bag bars, the KDS station strip,
the report bars, the plate-stack builder, the Integrations channel row with its accent icon tile, and
the kiosk suggestion strip with its three cards are screen-level markup over the same tokens, and
their screen specs are their whole definition.

**Naming follows §12.** Five primitives take the `Upos*` prefix, because their bare names would
collide with a BCL or Blazor type — `UposButton`, `UposIconButton`, `UposModal`, `UposDrawer` and
`UposSwitch`, the last of these against `System.Diagnostics.Switch`. Everything else is a plain
domain noun. The prefix is a Razor-side rule only: the CSS class stays `.u-switch`, because §12's
class convention is `.u-*` and nothing collides in a stylesheet.

**Prop types are the POC's wherever the POC has one**: `MenuItemDto`, `OrderDto`, `OrderItemDto`,
`Table`, `OrderStatus`, `decimal` for money, `EventCallback` and `EventCallback<T>` for events,
`RenderFragment` for a slot. An enum or record named in a props line that is not one of those —
`ButtonVariant`, `StatusTone`, `TypeScale`, `NavItem` — ships with the component and describes
rendering, not data. No component invents a DTO, and none takes a model the schema does not have.

**Lateness is a parameter, never a field.** Every component that can show late takes an elapsed
value or a timestamp plus the threshold to measure it against, and derives the state on render.
Nothing takes an `IsLate` bool, because nothing upstream stores one and no endpoint returns one
(§4).

**No component takes a touch flag.** Every `:hover` rule in `upos-components.css` is declared inside
one `@media (hover:hover)` block, so the lift reaches a pointer surface and never reaches
`Restaurant.Mobile`, the board or the kiosk, all three of which report `hover: none`. There is
nothing for a host to suppress. The same component ships to all four surfaces, and press feedback
stays the ripple tint set at the call site (§8).

**One recipe this part added to the kit.** Part II-B's Integrations spec routes the channel switch
here and the kit had no recipe for it. `.u-switch` now ships in `upos-components.css`, and
`UposSwitch` is the last block below.

| Component | CSS classes | Screens that consume it | Status |
| --- | --- | --- | --- |
| `MenuItemCard` | composes `.u-chip-allergen`, `.u-chip-status--late` | Order entry · Kiosk flow | Existing · restyle |
| `OrderCard` | a `DataRow` (`.u-data-row`, `.is-late`) | Channels queue | Existing · restyle |
| `OrderStatusBadge` | `.u-chip-status`, `.u-chip-status--new`, `.u-chip-status--fired`, `.u-chip-status--late`, `.u-chip-status--ready` | Channels queue | Existing · restyle |
| `UposButton` | `.u-btn`, `.u-btn--primary`, `.u-btn--secondary`, `.u-btn--ghost` | Order entry · Modifier modal · Floor plan · Table drawer · Payment · Employees, Devices, Settings (roadmap) · Kiosk flow · Guest-facing rules | New |
| `UposIconButton` | `.u-icon-btn` | Order entry · Modifier modal · Item info modal · Floor plan · Table drawer · Payment · Menu manager | New |
| `StatusChip` | `.u-chip-status`, `.u-chip-status--new`, `.u-chip-status--fired`, `.u-chip-status--late`, `.u-chip-status--ready` | Order entry · Table drawer · Channels queue | New |
| `AllergenChip` | `.u-chip-allergen` | Order entry · Modifier modal · Item info modal · Menu manager · Chit anatomy · Kiosk flow | New |
| `Pill` | `.u-pill` | Order entry · Modifier modal · Table drawer · Menu manager · Kiosk flow | New |
| `SegmentedControl` | `.u-segmented`, `.u-segmented__opt`, `.is-active` | Item info modal · Table drawer · Payment · Menu manager · Kiosk flow | New |
| `StatCard` | `.u-stat-card` | Dashboard | New |
| `DataRow` | `.u-data-row`, `.is-late` | Channels queue · Employees, Devices, Settings (roadmap) | New |
| `UposModal` | `.u-modal`, `.u-scrim` | Modifier modal · Item info modal · Floor plan · Payment · Menu manager · Kiosk flow · Guest-facing rules | New |
| `UposDrawer` | `.u-drawer` | Table drawer · Payment | New |
| `Toast` | `.u-toast` | None today — Order entry, Channels queue and Offline behavior each rule one out | New |
| `BottomNav` | `.u-nav-bottom`, `.u-nav-item`, `.is-active` | Order entry (the shell every terminal destination inherits) | New |
| `SideNav` | `.u-nav-item` restyled at the call site | Dashboard · Menu manager · Integrations · Reports · Employees, Devices, Settings (roadmap) | New |
| `FloorTable` | none of its own — status border, `--upos-shadow-card`, `--upos-radius-card` or `--upos-radius-pill` | Floor plan | New |
| `CartLine` | composes `.u-qty-stepper`, `.u-icon-btn`, `.u-chip-allergen` | Order entry · Offline behavior · Kiosk flow | New |
| `QtyStepper` | `.u-qty-stepper` | Order entry · Modifier modal · Floor plan · Payment | New |
| `TipPad` | `.u-tip-btn`, `.is-selected` | Payment | New |
| `TenderTile` | `.u-tender-tile`, `.is-selected` | Payment · Offline behavior | New |
| `ChitCard` | `.u-chit`, `.u-chit__timer`, `.u-chit__timer--late`; composes `.u-badge-channel`, `.u-chip-allergen` | Station board · Chit anatomy · Chit actions · KDS data contract | New |
| `ChannelBadge` | `.u-badge-channel` | Channels queue · Chit anatomy | New |
| `OfflinePill` | `.u-pill-offline` | Order entry · Offline behavior | New |
| `UposSwitch` | `.u-switch`, `.is-on` | Integrations · Modifier modal | New |

#### MenuItemCard

**Classes:** none of its own; composes `<AllergenChip>` and a `<StatusChip>` at
`.u-chip-status--late` for the `86'D` pill.
**Props:** `Item` (MenuItemDto), `Layout` (CardLayout: `Tile` · `GridCard` · `ListRow`), `Scale`
(TypeScale: `Terminal` · `Kiosk`), `Tag` (string?, the kiosk merchandising word), `OnTap`
(EventCallback<MenuItemDto>).
**States:** available; 86'd — opacity `.5`, the name struck, the price replaced by the red `86'D` pill,
and no response to a tap.
**Consumed by:** Order entry, Kiosk flow (the grid card and the list row).
**Notes:** the POC card is a Bootstrap `card`; the restyle is `--upos-surface` at `--upos-radius-card`
with 1px `--upos-border` and `--upos-shadow-card`. **Info mode is not a card state** — the `ITEM INFO`
pill carries the visible change, and the parent routes `OnTap` to the Item info modal while it is armed
(Order entry). `Kiosk` scale is Part I's roles at ×1.4 and lifts the whole element to
`--upos-touch-kiosk` (Guest-facing rules). **The kiosk never renders the 86'd state** — an unavailable
item is filtered out of the menu, not marked in it, because `86'D` is staff jargon before it is a
label. Allergen chips are design-only until `MenuItem` carries allergens (GAP-05).

#### OrderCard

**Classes:** none of its own — **a `DataRow` bound to an `OrderDto`**, composing `<ChannelBadge>` into
its leading slot and `<OrderStatusBadge>` into its trailing one.
**Props:** `Order` (OrderDto), `Now` (DateTime, the parent's ticking clock), `LateAfter` (TimeSpan, the
channel's SLA), `OnSelect` (EventCallback<int>?).
**States:** the order's status through its chip, and late, which passes `Late` to the row's
`BorderTone` and overrides the chip. The rest fill, the hover lift and the border belong to `DataRow`
and are specified there.
**Consumed by:** Channels queue.
**Notes:** the POC card renders an order and its lines as a panel; the restyle is **one order, one
line** — the badge, `Counter · #482` over the item summary, the price and the chip. `OnSelect` is
nullable and is null on the channels queue: the rows are a monitor, and the artboard gives them no tap.
Late is derived here from `Order.CreatedAt` against `LateAfter` and written back nowhere (§4). The
channel name, its two-letter code and its color have no field behind them (GAP-04). A status change
restyles the row in place; nothing announces itself.

#### OrderStatusBadge

**Classes:** `.u-chip-status`, `.u-chip-status--new`, `.u-chip-status--fired`, `.u-chip-status--late`,
`.u-chip-status--ready`.
**Props:** `Status` (OrderStatus).
**States:** one per `OrderStatus`, mapped through §4 — `Pending` `PENDING` and `Confirmed` `SENT` in
new-blue, `Preparing` `FIRED` in fired-orange, `Ready` `READY`, `Served` `SERVED` and `Completed`
`PAID` in ready-green, `Cancelled` `VOID` in late-red.
**Consumed by:** Channels queue, through `OrderCard`.
**Notes:** the POC badge is a Bootstrap `badge bg-*`; the restyle points it at the kit chip and nothing
else changes, so existing call sites keep compiling. **It is a one-parameter wrapper over `StatusChip`**
— it has no late derivation and no label override, because an `OrderStatus` is all it is given. A
screen that needs either of those uses `StatusChip` directly.

#### UposButton

**Classes:** `.u-btn` with `.u-btn--primary`, `.u-btn--secondary` or `.u-btn--ghost`.
**Props:** `Variant` (ButtonVariant: `Primary` · `Secondary` · `Ghost`), `Label` (string), `Icon`
(RenderFragment?), `MinHeight` (int?, px), `Disabled` (bool), `OnClick` (EventCallback).
**States:** rest; hover `translateY(-2px)` on pointer surfaces; pressed, which is the ripple tint on
touch; disabled; and the two-second confirmed label some call sites hold — `SENT TO KITCHEN`,
`RE-FIRED` — whose check is an inline SVG, never a `✓` character (§9).
**Consumed by:** Order entry, Modifier modal, Floor plan, Table drawer, Payment, Kiosk flow,
Guest-facing rules, and the Employees, Devices, Settings (roadmap) spec.
**Notes:** `.u-btn` sets `--upos-touch-terminal` 48px, so `MinHeight` is how a call site reaches the
kiosk's `--upos-touch-kiosk` 60px and the 96px commit bands (Part II-D). **A destructive control is
`Ghost` with its label forced to `--upos-ink`**, never a red variant: there is none in the kit, and the
red arrives on the confirming step (§11). The kit implements the hover lift, not the hover fills — set
those from §8's table at the call site.

#### UposIconButton

**Classes:** `.u-icon-btn`; `.u-modal .u-icon-btn` when it closes a modal.
**Props:** `Icon` (RenderFragment), `Label` (string, the accessible name), `HitArea` (int, px),
`OnClick` (EventCallback).
**States:** rest; hover — `translateY(-2px)` with ink to `--upos-ink`, or `rotate(90deg)` on a modal
close, which does not lift (§8); pressed; disabled.
**Consumed by:** Order entry (send-one), Modifier modal, Item info modal, Floor plan, Table drawer,
Payment (close and guest mirror), Menu manager (the plate-view close).
**Notes:** **the glyph is 34px on every surface and only the hit area moves.** The terminal centres it
in at least `--upos-touch-terminal` 48px, against the artboard's 30px and the payment mirror's 36px,
because §11's minimum outranks the artboard's pixels (Part II-A). The back office is pointer input, so
it takes the bare 34px with no enlargement and is sized by density (Part II-B). 34px is a literal
rather than a token (§12). Icons are inline SVG at `stroke-width:2`, `1.7` in the sidebar (§9).

#### StatusChip

**Classes:** `.u-chip-status`, `.u-chip-status--new`, `.u-chip-status--fired`, `.u-chip-status--late`,
`.u-chip-status--ready`.
**Props:** `Status` (OrderStatus?), `Tone` (StatusTone?: `New` · `Fired` · `Late` · `Ready`, for a state
that is not an `OrderStatus`), `Label` (string?, overriding §4's word), `Elapsed` (TimeSpan?),
`LateAfter` (TimeSpan?, the station or channel threshold).
**States:** the four hues, with §4's map supplying the word from `Status`. **Late is derived when
`Elapsed > LateAfter`**, takes `.u-chip-status--late`, and overrides the mapped color while it holds.
**Consumed by:** Order entry (the `86'D` pill on a tile), Table drawer (`COURSE 1 · FIRED`), Channels
queue (the row chip).
**Notes:** late is computed from those two parameters and never passed as a stored status — no endpoint
returns one (§4). `Tone` is what the 86'd pill uses: an unavailable item is a menu-item state, not an
order state, and it still belongs in late-red. `Label` carries the words the map has no entry for, and
a held course is not one of them — it sits on `--upos-surface-inset` in `--upos-ink-subtle`, because a
hold is not a status (Table drawer). `fl-pulse` belongs to a timer and a live dot, not to a chip (§8).

#### AllergenChip

**Classes:** `.u-chip-allergen`.
**Props:** `Allergen` (string, rendered uppercase), `OnDark` (bool), `Interactive` (bool), `IsOn`
(bool), `OnToggle` (EventCallback<string>).
**States:** on light, `--upos-allergen-bg` under `--upos-allergen-text`; on dark, inverted — fill
`--upos-allergen-text`, ink `--upos-kds-ink`, because the light pairing does not hold contrast on a
board; toggled off in the menu manager, `--upos-surface-inset` in `--upos-ink-subtle`.
**Consumed by:** Order entry (grid tile and cart line), Modifier modal, Item info modal, Menu manager,
Chit anatomy, Kiosk flow (grid card, list row, item detail and cart line).
**Notes:** **the label is the allergen word alone, uppercase** — a chit reading `NO GLUTEN` in the
source renders `GLUTEN`, and the violet says the rest (§5, Chit anatomy). Never an icon alone, never an
emoji, never a color-only signal. Violet means allergen and nothing else in UPOS. On a chit the row
sits under the header and above the build, so a cook reads it first. No field backs any of it (GAP-05).

#### Pill

**Classes:** `.u-pill`.
**Props:** `Label` (string), `Leading` (RenderFragment?, a dot or an icon), `Selected` (bool),
`Bordered` (bool), `OnClick` (EventCallback?, null renders a static tag).
**States:** static tag; selectable, selected — `--upos-grad-primary` in white — or not; bordered-quiet,
the transparent fill under 1px `--upos-border` that the re-fire and `VIEW PLATING` controls take.
**Consumed by:** Order entry (the `ITEM INFO` mode pill and the loyalty pill), Modifier modal (the
option pills), Table drawer (re-fire), Menu manager (minor filter chips, `VIEW PLATING`, a group's type
chip and its options), Kiosk flow (the merchandising tag and the combo chip).
**Notes:** `.u-pill` is the neutral tag. Anything carrying a status word is a `StatusChip` and anything
carrying an allergen is an `AllergenChip`, because the four hues and the violet are reserved (§4, §5).
Padding is `--upos-space-pad-pill` at the call site; a tappable pill clears `--upos-touch-terminal` on
the terminal and `--upos-touch-kiosk` on the kiosk. **The kiosk merchandising tag overrides the recipe
outright** — `--upos-accent` fill under white 800/14px `.1em`, against `.u-pill`'s inset fill and
700/11px ink — the same kind of call-site restyle `SideNav` makes of `.u-nav-item`, and it is
disclosed here rather than folded into the recipe (Kiosk flow). On a venue running sky that fill goes
`--upos-accent-deep`, because white on sky does not clear AA (§3, Guest-facing rules). The loyalty
pill has nothing to bind to (GAP-12).

#### SegmentedControl

**Classes:** `.u-segmented`, `.u-segmented__opt`, `.is-active`.
**Props:** `Options` (IReadOnlyList<string>), `Selected` (string), `OnSelect` (EventCallback<string>),
`MinHeight` (int?, px).
**States:** exactly one option active, on `--upos-surface` with `--upos-shadow-card`; the inactive
options in `--upos-ink` at `.66`; hover on an inactive option, pointer surfaces only.
**Consumed by:** Item info modal (`PLATING` · `STACK`), Table drawer (`NOW` · `+5M` · `+10M`), Payment
(`EVENLY` · `BY SEAT`), Menu manager (the plate-view tabs and the `REQUIRED` · `OPTIONAL` ·
`NO / REMOVE` row), Kiosk flow (the grid and list toggle).
**Notes:** terminal call sites pass `MinHeight` 48 to reach `--upos-touch-terminal`, against the
artboard's 25–33px (Part II-A's preamble). The track is `--upos-surface-veil`, which inverts on dark
rather than staying white (§7). **An inactive option is a tappable choice, not a disabled control, so
it owes AA like any other label**: it takes `--upos-ink` at `.66` — 5.3:1 in light, 6.3:1 in dark —
rather than `--upos-ink-subtle`, which fails at 3.0:1 on the light track. That is §12's one
intermediate ink step, and it is the same ruling §11 makes for a destructive control's label.
**The KDS station strip is not this component** — it pages with paddles and carries per-station counts
and a late dot, and Station board specs it whole. `UposSwitch` is its two-state cousin, the last
block below.

#### StatCard

**Classes:** `.u-stat-card`.
**Props:** `Label` (string), `Value` (string, formatted upstream), `Comparison` (RenderFragment?),
`ComparisonTone` (StatusTone?, null for `--upos-ink-subtle`), `Fill` (SurfaceFill: `Ground` · `Panel`).
**States:** with or without a comparison line; ready-green when the figure beats its comparison,
fired-orange when it misses a target, `--upos-ink-subtle` when it is neither; the empty day, where the
value reads `$0` or `0`.
**Consumed by:** Dashboard.
**Notes:** **`Fill` is the ruling Part II-B's preamble makes.** The kit ships `--upos-surface` plus
`--upos-shadow-card`, which is right for a card on the ground and wrong for one inside the white panel,
where §2's ladder puts blocks on `--upos-surface-inset` with no shadow. `Ground` is the kit recipe
unchanged; `Panel` overrides the fill and drops the shadow, and it is what the dashboard passes. **`Comparison`
is a fragment rather than a string** because the dashboard's line opens with a direction arrow drawn
as an inline SVG — §9's permitted glyphs carry no `↑`, so the arrow cannot be a character in a string
(Dashboard). The comparison line is the only colored thing on the card and takes the text tokens,
never the fills; the value never takes a status color (§4). Nothing on this card is interactive.

#### DataRow

**Classes:** `.u-data-row`, `.is-late`.
**Props:** `Leading` (RenderFragment?), `ChildContent` (RenderFragment), `Trailing` (RenderFragment?),
`BorderTone` (StatusTone?, null keeps `--upos-border`), `OnClick` (EventCallback?).
**States:** rest — white fill, 1px border, no shadow; hover `translateY(-3px)` onto `--upos-shadow-card`
on pointer surfaces; status-bordered where the record has a status; selected, where a list drives a
detail pane.
**Consumed by:** Channels queue, and the Employees, Devices, Settings (roadmap) spec.
**Notes:** the one exception to "no borders as elevation" in the whole kit (§7), and one of §4's five
named places where status shows. An offline device takes `--upos-status-late` on the border and every
other record `--upos-border` (roadmap spec). **Rows never share a table border** — a list of these
replaces `<table>` in the Bootstrap migration (§12). On the channels queue the rows are a monitor and
`OnClick` is null: the artboard gives them no tap.

#### UposModal

**Classes:** `.u-modal`, `.u-scrim`; the close control is `.u-modal .u-icon-btn`.
**Props:** `Title` (RenderFragment, plain text at most call sites), `Width` (int, px — 380 through
940 across the specs), `MaxHeight` (int?),
`ChildContent` (RenderFragment), `Footer` (RenderFragment?), `Scrim` (ScrimWeight: `Standard` ·
`Light`), `OnClose` (EventCallback).
**States:** open or closed; scrolling its own body past `MaxHeight`; the `Light` scrim the floor plan's
guest-count dialog takes against `--upos-scrim`'s weight under every other modal.
**Consumed by:** Modifier modal, Item info modal, Floor plan (the guest-count dialog), Payment (the
split modal), Menu manager (plate view), Kiosk flow (the combo sheet), Guest-facing rules (the idle
warning).
**Notes:** it rises with `fl-rise` at `--upos-dur-slow` over `--upos-scrim` at `--upos-blur-scrim`, and
while it is up the terminal's top bar drops its blur (§7). In the back office it scrims the main panel
and leaves the sidebar lit, which is what `position:relative` on the panel is for. `Light` is the
literal `rgba(20,25,31,.45)` today, and §12's rule is that a value with no token gets one, so **add
`--upos-scrim-light`** rather than writing it in the component. **`Title` is a fragment** because one
call site's head is not a line of text: the kiosk combo sheet fills its head with
`--upos-grad-primary` and stacks a kicker, a 50px headline and a supporting line inside it (Kiosk
flow). Every other call site passes a string into it. Prefer a modal over navigation, and
yield where the content does not fit — the kiosk builds an item on a screen rather than over one
(§11, Kiosk flow).

#### UposDrawer

**Classes:** `.u-drawer`.
**Props:** `Width` (int, px), `Edge` (DrawerEdge: `Right` · `Left`), `Flush` (bool), `ChildContent`
(RenderFragment), `Footer` (RenderFragment?), `OnClose` (EventCallback).
**States:** open or closed; inset, the kit's floating 16px default; flush, full height against the shell
edge.
**Consumed by:** Table drawer, Payment (the guest-mirror sheet).
**Notes:** **`Flush` is the variant Part II-A routes here.** The kit floats the drawer inset 16px so all
four corners stay rounded; a full-height drawer flush to the shell edge instead rounds its two inboard
corners at `--upos-radius-panel` and lets the outboard edge meet the shell's own rounded clip. No square
corner is exposed either way, which is what §7 asks for. The table drawer is 420px with a left-cast
shadow; the mirror sheet is the same variant at 520px, and its tip labels take `--upos-touch-kiosk`
because that surface is guest-facing (§11). It rises with `fl-rise` at `--upos-dur-slow`.

#### Toast

**Classes:** `.u-toast`.
**Props:** `Message` (string), `Action` (RenderFragment?), `Duration` (TimeSpan, 4s), `OnDismiss`
(EventCallback).
**States:** rising, holding, leaving by a fade over `--upos-dur-fast`; a toast carrying an action holds
until it is dismissed or acted on (§8).
**Consumed by:** None today. Order entry, Channels queue and Offline behavior each name a toast to rule
one out — the send-all confirmation is the button's own label for two seconds, a status change restyles
a row in place, and the offline queue is one pill rather than a toast per queued write.
**Notes:** the component ships because the kit does, and because a screen outside this handoff will
raise one; it stays off all four surfaces specced here. Toasts stack upward from one corner and never
cover the primary action underneath (§8). Its chrome is dark whatever the theme, so it takes the on-dark
status set (§4). `.u-toast` currently reuses `--upos-shadow-modal` — transcribe the parent's
`--shadow-toast` as `--upos-shadow-toast` and point the recipe at it (§12).

#### BottomNav

**Classes:** `.u-nav-bottom`, `.u-nav-item`, `.is-active`.
**Props:** `Items` (IReadOnlyList<NavItem>: `Key` · `Label` · `Icon`), `Active` (string), `OnNavigate`
(EventCallback<string>).
**States:** exactly one destination active, filled `--upos-grad-primary` with white ink; the rest
`--upos-ink-subtle` on transparent. `MORE` is a placeholder in this handoff and renders one statement
line.
**Consumed by:** Order entry — the shell's 78px bottom nav, which every terminal destination inherits.
**Notes:** five items, each `flex:1` capped at 150px at `--upos-radius-inset`, a 17px icon over a
700/10.5px label. **The kit's `.is-active` tints the ink `--upos-accent` and both consumers fill
instead** — the terminal here, the sidebar in `SideNav` — so the active fill is a call-site override on
both and the tint has no consumer in this handoff. Leave the recipe as it is; set the fill where it is
used. This nav is the only full-screen transition in the order flow: everything else opens over the
check (§11). The strip is touch, so it ships no `:hover` transform.
**Below 770px of shell width the labels are laid out away and the icon steps to 20px** (Order entry ·
Handheld, which carries the measurement and the three treatments weighed against it). **The component
takes no width flag for this**, on the same rule `MenuItemCard` follows one screen over: the form is
reached by a container query on the terminal shell, so the strip never learns how wide it is and the
recipe's other call sites — none in this handoff, `SideNav` being a separate rail — cannot match a
container they do not sit in. **The label is hidden, never removed:** every item carries its `Label`
as its accessible name at every width, so the strip reads identically to a screen reader and an
unbuilt destination still announces what it is.

#### SideNav

**Classes:** `.u-nav-item` restyled at the call site; the rail itself is a `--upos-grad-dark` panel at
`--upos-radius-panel`, not `.u-nav-bottom`.
**Props:** `Items` (IReadOnlyList<NavItem>), `Active` (string), `Brand` (RenderFragment), `Kicker`
(string), `OnNavigate` (EventCallback<string>).
**States:** one destination active, filled `--upos-grad-primary` in white; the rest `--upos-ink-subtle`
on transparent; hover slides `translateX(3px)` and inks `--upos-ink`, this being a pointer surface.
**Consumed by:** Dashboard, Menu manager, Integrations, Reports and the Employees, Devices, Settings
(roadmap) spec — the rail is the back office's shared chrome and all five inherit it.
**Notes:** **this is the five-override variant Part II-B's preamble declares and routes here.** The kit
item is the terminal's bottom-nav item, and the sidebar changes exactly five things: the row runs
horizontal rather than as a column, padding goes `12px 14px`, the gap goes 12px, the label goes 700/13px
from 700/10px, and the active state fills rather than tints. Everything else is `.u-nav-item` unchanged.
The rail is 224px, sticky at `top:14px` with `max-height:calc(100vh - 28px)` (§2), and its icons run
`stroke-width:1.7` (§9). The kiosk's list-layout category rail makes the same dark-panel move at guest
scale and is a candidate second consumer, at `--upos-touch-kiosk` and the 14px label class (Kiosk flow).

#### FloorTable

**Classes:** none of its own — a composite on `--upos-surface`, `--upos-shadow-card`, a 2px
status-colored border, and `--upos-radius-card` or `--upos-radius-pill` for shape.
**Props:** `Table` (Table), `Order` (OrderDto?, the open check), `Now` (DateTime), `LateAfter`
(TimeSpan), `Shape` (TableShape: `Square` · `Round`), `Width` (int, px — 150 or 230), `Guests` (int?),
`Selected` (bool), `OnTap` (EventCallback<int>).
**States:** open, with no status hue and no guest line; seated; ordered; late; check presented; selected,
where the border goes `--upos-accent` while its dialog or drawer is up.
**Consumed by:** Floor plan.
**Notes:** **shape carries seating** — square tables take `--upos-radius-card` and rounds take
`--upos-radius-pill` — and width is the room's geometry rather than the cover count. Late is derived from
`Order.CreatedAt` against `LateAfter`, overrides the underlying status while it holds, and is written
back nowhere (§4). Status shows on the 2px border, one of §4's five named places. Position, width and
shape have no fields, and `Table` carries an `IsOccupied` bool rather than a status enum with timestamps,
so `SEATED · 4m` and `CHECK PRESENTED` are literals (GAP-07); the guest count has no field either.

#### CartLine

**Classes:** none of its own; composes `<QtyStepper>`, `<UposIconButton>` and `<AllergenChip>`.
**Props:** `Item` (OrderItemDto), `Mods` (string, the middot-joined selection), `Allergens`
(IReadOnlyList<string>), `LineTotal` (decimal), `Sent` (bool), `Queued` (bool), `Scale` (TypeScale),
`OnQuantityChange` (EventCallback<int>), `OnSend` (EventCallback), `OnRemove` (EventCallback).
**States:** not sent, a paper-plane glyph on the inset; sent, a check on `--upos-grad-primary`; queued,
where an offline line reads `QUEUED` in place of `SENT`; quantity at zero, which drops the line.
**Consumed by:** Order entry, Offline behavior, Kiosk flow (the cart's concept-grouped lines).
**Notes:** the terminal merges a repeat tap into the matching line at `qty + 1`; the kiosk pushes a new
line per tap today and should merge the same way, since `OrderItemDto` carries the quantity either way
(Kiosk data contract). `Mods` is a rendered string because no field carries a selection (GAP-01), and
the kiosk line adds its `COMBO · {side} + {drink}` chip as a `<Pill>` in `--upos-accent-deep` (GAP-02).
The kiosk `Remove` is a ghost button at `--upos-ink` and drops the line with no confirmation: nothing
is sent until submit, and the line is one tap to add back.

#### QtyStepper

**Classes:** `.u-qty-stepper`, and its `button` and `span` children.
**Props:** `Value` (int), `Min` (int), `Max` (int?), `ValueChanged` (EventCallback<int>), `ValueSize`
(int, px).
**States:** at `Min`, where `−` is inert or drops the line it sits on; at `Max`, where `+` is inert;
hover tints a button `--upos-surface-hover` on pointer surfaces.
**Consumed by:** Order entry (the cart line), Modifier modal (the footer count, floored at 1), Floor plan
(the guest-count dialog, clamped 1 to 12), Payment (the split modal's even body, 2 to 6).
**Notes:** **the buttons already set `--upos-touch-terminal` 48px**, against the artboard's 24–40px, and
Part II-A's preamble makes that shipped size the rule wherever a spec names a stepper. What changes per
call site is `ValueSize` — 13px on a cart line, 32px in the guest-count dialog — never the target.
`overflow:hidden` is on the recipe, so no child paints past the pill corner (§7).

#### TipPad

**Classes:** `.u-tip-btn`, `.is-selected`.
**Props:** `Subtotal` (decimal), `Percentages` (IReadOnlyList<int>), `Selected` (int?), `OnSelect`
(EventCallback<int?>), `GuestFacing` (bool).
**States:** one percentage selected, on `--upos-grad-primary` with white ink and `--upos-shadow-button`,
or none — `NO TIP` is a fourth button rather than an absence. Every dollar figure recomputes off
`Subtotal`.
**Consumed by:** Payment.
**Notes:** the labels read `18% · $NN.NN`, so the pad renders money it never stores: tender, tip and
split allocation have no model, no DTO and no endpoint, and `Completed` records that the check closed
rather than how it was paid (GAP-08). `GuestFacing` raises the buttons to `--upos-touch-kiosk` 60px for
the mirror sheet, where the artboard draws the tip labels as display-only and Part II-A makes them
tappable (§11). A new order resets the selection to 20%.

#### TenderTile

**Classes:** `.u-tender-tile`, `.is-selected`.
**Props:** `Label` (string), `Icon` (RenderFragment), `Selected` (bool), `Annotation` (string?),
`Dashed` (bool), `OnSelect` (EventCallback<string>).
**States:** unselected on `--upos-surface-inset`; selected on `--upos-grad-primary` with
`--upos-shadow-button`; offline, where the selected card tender drops the gradient for a flat neutral
fill with `--upos-ink-subtle` ink; `SPLIT CHECK` on the inset under a 2px dashed `--upos-border`.
**Consumed by:** Payment, Offline behavior.
**Notes:** **`Annotation` is §11's per-action offline rule in one parameter** — `will sync on reconnect`
at 400/10.5px under the label, never a dialog, never a disabled primary and never a toast per queued
write. The recipe already clears `--upos-touch-terminal`, and the tile lifts `-4px` on pointer surfaces
like any card (§8). `CASH` and `GIFT CARD` are drawn but unwired in the artboard; wire them to the same
tender flow as their neighbor (Payment).

#### ChitCard

**Classes:** `.u-chit`, `.u-chit__timer`, `.u-chit__timer--late`; composes `<ChannelBadge>` and
`<AllergenChip>`, both on their dark pairings, all inside the `.upos-kds` scope.
**Props:** `Order` (OrderDto), `Lines` (IReadOnlyList<OrderItemDto>), `Station` (string?, null on an
expo chit), `LineStations` (IReadOnlyList<string>?, the station that owes each line — expo chits
only), `LinesUp` (IReadOnlyList<int>, the lines whose station has bumped them), `Now` (DateTime),
`WarnAfter` (TimeSpan), `LateAfter` (TimeSpan), `Rush` (bool), `Struck` (IReadOnlyList<int>, client
state), `Armed` (bool), `OnStrike` (EventCallback<int>), `OnBump` (EventCallback<int>).
**States:** nothing started · some items struck · every item struck, and on an expo chit every station
up and waiting to be bagged. The timer bands are `--upos-kds-ink` under `WarnAfter`,
`--upos-status-fired` between, and `.u-chit__timer--late` pulsing `fl-pulse` past `LateAfter`, with
the 5px status edge following. The bump bar is live (`BUMP`), refusing (`WAITING`) or bagging (`BAG IT`).
`Armed` outlines the whole card 2px `--upos-accent` under plate view and suspends every other tap.
An expo line carries two more marks: its station from `LineStations`, at the 10px label class in
`--upos-kds-ink` at `.72`, and `UP` on `--upos-kds-status-ready` once that line is in `LinesUp`.
**Consumed by:** Station board, Chit anatomy, Chit actions, KDS data contract.
**Notes:** **both thresholds are per-station configuration**, derived on every tick and never stored —
no endpoint returns an elapsed value or a late flag (§4). The 10px radius is the product's one square-ish
exception and it lives here, under `.upos-kds` (§7). The board restyle is declared once in Part II-C:
`--upos-kds-inset` under the chit, `--upos-kds-ink` on top, the on-dark status set, and the channel
badge on `--upos-kds-inset-hover`, because the kit's light pairing does not hold contrast there. The bump
bar runs 56px at the full chit width so a gloved hand cannot fire the wrong ticket (§11), and a bump
writes the whole order's status, so per-station progress stays client state until expo closes it.
**`LineStations` and `LinesUp` are what the expo chit draws its two marks from**, and both arrive as
parameters for the same reason: no station sits on `OrderItem` and no endpoint returns a per-station
bump, so the parent holds them (Chit anatomy, Chit actions).

#### ChannelBadge

**Classes:** `.u-badge-channel`.
**Props:** `Channel` (string), `Code` (string, the two-letter form), `Color` (string?), `Shape`
(BadgeShape: `Pill` · `Circle`), `OnDark` (bool).
**States:** pill on light, `--upos-surface-inset` under `--upos-ink-subtle`; a 34px circle carrying the
code in white 800/11px on the channel's own color (Channels queue); on dark, `--upos-kds-inset-hover`
under `--upos-kds-ink` (Chit anatomy).
**Consumed by:** Channels queue, Chit anatomy.
**Notes:** **`Color` is the split Part II-B's Integrations spec calls out.** Per-channel color exists on
the terminal's queue and nowhere else today: either the integrations rows carry the same colors or both
surfaces stay neutral, and the difference is not to be split. **Integrations is not a consumer of this
component** — its rows draw a 38px `--upos-radius-inset` icon tile filled `--upos-accent` with an 18px
white glyph, not a badge pill, and that tile is screen-level markup (Part II-B). If the split resolves
toward color, this is the component the row would take. Nothing behind it binds — `Order` has no
channel or order type, so the name, the code and the color are literals (GAP-04). **It never reaches the
kiosk**: no channel badge is guest-facing (Guest-facing rules).

#### OfflinePill

**Classes:** `.u-pill-offline`.
**Props:** `QueuedCount` (int?, null while no queue exists), `Visible` (bool, the observed connection
state).
**States:** hidden while online; offline with a queue, reading `OFFLINE · N QUEUED`; **offline with no
queue behind it, reading `OFFLINE` alone**; draining, where the count falls as writes replay; gone at
zero.
**Consumed by:** Order entry (the top-bar slot beside the venue name), Offline behavior.
**Notes:** it pulses with `fl-pulse` and **keeps pulsing under `prefers-reduced-motion`**, because it
carries status rather than decoration (§8). Connectivity is observed, never chosen — the artboard's
offline toggle is demo scaffolding, not product UI, and the observation now comes from `IDeviceStatus`
(§12) rather than from nothing. There is no success toast on reconnect: the absence of the pill is the
message (§11). **The pill is the product's one half-built control, and the split is deliberate**: it
states the connection because the connection is observable, and it omits the count because the queue
behind it is a local SQLite table on `Restaurant.Mobile` that is planned rather than built. A null
`QueuedCount` prints nothing — not `0 QUEUED`, which is the sentence a healthy terminal with an empty
queue prints and therefore cannot be read as a gap. The gap is named beside the pill instead, in the
blocked treatment, and with no idempotency key on `CreateOrderDto` a replayed write can still double
an order (GAP-10).

#### UposSwitch

**Classes:** `.u-switch`, `.is-on`.
**Props:** `Checked` (bool), `CheckedChanged` (EventCallback<bool>), `Label` (string, the accessible
name), `Disabled` (bool).
**States:** off — a 50×28 `--upos-border` track with its 22px white knob at `3px`; on —
`--upos-grad-primary` with the knob at `25px`. The knob slides at `--upos-dur-fast` on `--upos-ease`,
the one curve, and the fill swaps rather than fading — a gradient is `background-image` and does not
interpolate, which `.u-tip-btn` already does the same way. The artboard runs `.2s` linear and the kit
wins (§8, Integrations).
**Consumed by:** Integrations (the per-channel connection toggle), Modifier modal (the combo control).
**Notes:** **this is the recipe Part II-B routes to this part, and it now ships in
`upos-components.css`.** The knob sits inside the track at pill radius, so §7's overflow rule has
nothing to clip. It renders as a `<button role="switch">`, which keeps it reachable from a keyboard on
the pointer surface that owns it. **A disconnect is not a bare toggle** — one press stops a revenue
channel, so pair it with the confirming step §11 describes, where the dialog names the consequence in
`--upos-status-late-text` (Integrations). Nothing behind it binds: a channel has no model and no
endpoint, and a connected channel cannot mark the orders it sends (GAP-04, GAP-13).

---

## Part IV · Data-model gaps

Everything the design renders that the current POC schema cannot express lives in `docs/GAPS.md`, as
entries `GAP-01` to `GAP-13`, each with affected screens, a minimal entity suggestion, priority and
release. Part II screen specs and Part III components cite those IDs; this section is the pointer,
and `docs/GAPS.md` is the register.
