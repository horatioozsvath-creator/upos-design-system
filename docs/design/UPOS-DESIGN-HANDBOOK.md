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

Part I is complete. Parts II, III and IV carry a written-in marker naming the task that fills them.

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
  - [Part II-B · Back office](#part-ii-b--back-office)
  - [Part II-C · Kitchen display](#part-ii-c--kitchen-display)
  - [Part II-D · Kiosk](#part-ii-d--kiosk)
- [Part III · Component inventory](#part-iii--component-inventory)
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
| Terminal | `Restaurant.Mobile` (MAUI Blazor Hybrid, Android) | 1440×900 tablet, landscape | Dense · 13px body · 48px targets |
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
  deliberate UPOS choice rather than a transcription: the parent's card radii are 20–22px and 18px
  is its Android mobile panel value, picked because the terminal is an Android tablet and the tile
  grid reads tighter at 18px (§7).
- **Shadows** — the parent ships thirteen; the kit exposes three (card · modal · button). Anything
  that needs a fourth borrows the nearest of the three and is recorded in §12.

**Added by UPOS** because a sales tool never needed them: status semantics bound to `OrderStatus`
(§4), allergen violet (§5), food photography as content (§3), the offline pattern, touch targets,
the theming contract, and the kitchen display derivation (§11).

The rule that keeps the language intact: **if a value is not in the token kit, it is not in the
design.** When you need something the kit lacks, add the token and use it — never fork a value into
a component.

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
`--upos-space-gap-section` 26px between sections.

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

| `data-accent` | `--upos-accent` | `--upos-accent-deep` |
| --- | --- | --- |
| slate (default) | `#33648b` | `#22496a` |
| teal | `#2f7d8f` | `#1c4a54` |
| indigo | `#4a5a94` | `#2b3560` |
| sky | `#4d84b8` | `#2a5578` |

**Gradients are used exactly three ways and no others:**

1. `--upos-grad-primary` — `linear-gradient(135deg, accent, accent-deep)`. Primary buttons, the
   active nav pill, the selected tender tile, the AI insight banner, the brand monogram square, and
   clipped text on one figure per screen at most.
2. `--upos-grad-dark` — `linear-gradient(168deg,#20262e,#171c22)`. Dark panels: back-office sidebar,
   kitchen board.
3. `--upos-grad-bar` — `linear-gradient(90deg,#6fa3cf,#2a5578)`. Horizontal bar fills in reports and
   dashboards.

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
not a delete button at rest, not a brand accent, not a divider, and not the kitchen display's house
color (§11).

Status shows up in exactly these places: `.u-chip-status--*` chips, the 1px status border on
`.u-data-row`, the 2px border on a floor-plan table, the top edge of a kitchen chit, and
`.u-chit__timer--late`.

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
else. `--upos-blur-scrim` 6px runs with `--upos-scrim` `rgba(20,25,31,.5)` under modals, drawers and
sheets. Never blur behind a row or card carrying data — it softens the text you are asking someone
to read at speed. The terminal runs one blurred surface at a time: when a scrim is up, the glass top
bar drops its blur.

**Translucent white** covers segmented tracks, secondary panels and de-emphasized tails, in the
range `rgba(255,255,255,.7)` to `rgba(255,255,255,.82)`. `.u-segmented` uses `.75`. No token exists
for it yet (§12).

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
- **A destructive control takes `.u-btn--ghost` at rest** — void, comp, refund, remove line. Red
  marks a problem that exists (§4), and an action nobody has taken yet is not one, so the button
  stays quiet until it is pressed. The red arrives on the confirming step, where the dialog names
  the consequence in `--upos-status-late-text` and the confirm button is `.u-btn--primary` carrying
  the verb. There is no red button variant in the kit, and adding one would make red decorative.
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
- Defaults per surface: terminal light (kitchen glare), back office the user's choice, kitchen
  display always the dark board regardless of `data-theme`, kiosk light.
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
- Per-item strike on tap, whole-chit bump on the bump bar, and expo chits that wait on every
  station before they can be bagged.
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
app's `wwwroot/css/`. There is no build step and no dependency beyond the Google Fonts `@import` at
the top of `upos-tokens.css`.

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
which an offline terminal cannot reach. Drop the three `.woff2` files into
`Restaurant.Mobile/wwwroot/fonts/` and replace the `@import` with `@font-face` rules. The terminal
must render correctly with no network (§11).

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

- **No translucent-white token.** `.u-segmented` uses the literal `rgba(255,255,255,.75)`; the
  parent range is `.7` to `.82`. Add `--upos-surface-veil` when a second consumer needs it.
- **`.u-toast` reuses `--upos-shadow-modal`.** Right family, heavier than a toast needs. The parent
  ships the value the kit is missing — `--shadow-toast: 0 20px 44px -20px rgba(20,25,31,.9)` in
  `tokens/elevation.css`. Transcribe it as `--upos-shadow-toast` and point `.u-toast` at it.
- **Two ink steps only.** `--upos-ink` and `--upos-ink-subtle`; use opacity on `--upos-ink` for
  anything between them.
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
- **The kit implements the hover lift, not the hover fills.** `.u-btn--secondary` and
  `.u-btn--ghost` lift; the fill and ink changes in §8's table are set at the call site.

---

## Part II · Screen specs

Every spec below uses [the screen-spec template](#the-screen-spec-template). Layout dimensions come
from the artboards; styling rules come from Part I.

### Part II-A · Terminal

*Written in Task 5.* Eight specs: Order entry · Modifier modal · Item info modal · Floor plan ·
Table drawer · Payment · Channels queue · Offline behavior.

### Part II-B · Back office

*Written in Task 6.* Five specs: Dashboard · Menu manager · Integrations · Reports · Employees,
Devices, Settings (roadmap).

### Part II-C · Kitchen display

*Written in Task 7.* Four specs: Station board · Chit anatomy · Chit actions · KDS data contract.

### Part II-D · Kiosk

*Written in Task 8.* Three specs: Kiosk flow · Guest-facing rules · Kiosk data contract.

---

## Part III · Component inventory

*Written in Task 9.* One summary table (component · CSS classes · consuming screens · existing or
new), then one block per component covering classes, props, states, consumers and notes — for the
three components `Restaurant.UI.Shared` already has (`MenuItemCard`, `OrderCard`,
`OrderStatusBadge`) and the new set named in §12.

---

## Part IV · Data-model gaps

*Written in Task 10, in `docs/GAPS.md`.* Everything the design renders that the current POC schema
cannot express, as entries `GAP-01` to `GAP-13`, each with affected screens, a minimal entity
suggestion, priority and release. Part II screen specs cite those IDs; this section is the pointer,
and `docs/GAPS.md` is the register.
