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
    - [Order entry](#order-entry)
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
not a delete button at rest (destructive controls: §11), not a brand accent, not a divider, and not
the kitchen display's house color (§11).

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
- **A destructive control takes `.u-btn--ghost` at rest** — void, comp, refund, remove line — with
  its label at `--upos-ink`, not ghost's default `--upos-ink-subtle` (`#8b95a1` on white computes
  3.0:1 and fails AA at 13px; the ink label reads 15.9:1). Red marks a problem that exists (§4),
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

The terminal is one 1440×900 shell at `--upos-radius-panel` 26px (the artboard draws 20px),
`--upos-surface`, clipped, with a fixed 76px top bar and a fixed 78px bottom nav. Everything between
them is a destination, and everything that is not a destination opens over the destination. Order
entry carries the shell; the other seven specs assume it.

Two rulings hold across all eight specs, so no spec below repeats them. **Every round close, mirror
and utility control is `.u-icon-btn`** — 34px at `--upos-radius-pill` — centered in a hit area of at
least `--upos-touch-terminal` 48px. The artboard draws those controls at 30px, and the payment
screen's guest-mirror button at 36px; both are under §11's minimum, and §11's rule outranks the
artboard's pixels. **Every quantity control is `.u-qty-stepper`**, whose buttons already set
`--upos-touch-terminal`; the artboard draws its steppers between 24px and 40px. Where a spec names an
icon button or a stepper it means those shipped sizes.

#### Order entry

**Purpose.** You build a check here — pick a category, tap items, adjust the lines, send them to the
kitchen and charge.

**Layout.** The shell's chrome belongs to this spec because every destination inherits it.

- **Top bar, 76px**, `--upos-surface-inset`, 1px `--upos-border` bottom, padding `0 28px`, three
  groups: a 26px `--upos-grad-primary` mark, the venue and terminal id at 800/15px
  (`Riverside Grill · Counter 2`) and the offline pill slot on the left; the server and clock at
  700/13px in `--upos-ink-subtle` on the right.
- **Bottom nav, 78px**, same inset fill, 1px top hairline, 8px between items. Five `.u-nav-item`
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
  `+ side, + drink · +$3.50` at 400/11px, and a 50×28px switch whose 22px knob slides `3px → 25px`.
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
`OrderItemDto` with no field to carry the selection.

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
- When the item has both views, a `.u-segmented` track: 4px padding on the inset, two options at
  `9px 0` reading `PLATING` and `STACK`, the active one on `--upos-grad-primary`.
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
  track — `EVENLY` · `BY SEAT`; then either the even body (a `.u-qty-stepper` around the count at
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
  wifi-off icon, reading `OFFLINE · 3 QUEUED`.
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
  `--upos-grad-bar` fill under a 700/12px `--upos-ink-subtle` label — Breakfast · Lunch · Dinner ·
  Late Night. These columns grow upward, and §3 scopes `--upos-grad-bar` to horizontal fills, so the
  call site rotates its `90deg` to `180deg` and changes nothing else — same token, same stops, turned
  to follow the bar. The artboard additionally ties the gradient's far stop to the accent; the token
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
that changes restyles in place rather than announcing itself. The banner rises with `fl-rise`; every
bar runs `fl-grow` on mount (§8).

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
  switch the terminal's modifier modal uses for its combo control (Part II-A), and the kit has no
  recipe for it — Part III adds one.

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
  `--upos-grad-bar`. §3 names reports as somewhere that gradient belongs, and this page overrides that
  scope — a bar whose length already carries a number and whose color carries a problem is §4's, and a
  gradient never carries status. The dashboard's daypart chart is where the gradient actually lands on
  this surface, and the two do not swap.

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
allergen chips and the modifier lines all render from artboard fixture. The assembly label is the one
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

- GAP-06 — no recipe, ingredient or plating model, so every panel in plate view — photos, stack,
  ingredient order, timing, hold — is drawn from fixture, and the same entry carries the
  item-to-station linkage that decides which chit a line lands on.
- GAP-01 — no modifier model, so an all-day count aggregates item names and cannot separate a build
  from its variants.

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

- GAP-06 — no recipe, ingredient or station model, so this entry carries the item-to-station linkage
  the board routes on as well as plate view's content: which station makes an item is part of how the
  item is made, so it belongs with the recipe rather than with the order.
- GAP-04 — `Order` has no channel or order type, so the chit's channel badge is unbindable and a
  per-channel target has no field to key on.
- GAP-05 — `MenuItem` has no allergens, so the allergen row cannot be driven by data.
- GAP-01 — no modifier model, so the build lines a cook actually works from arrive as free text.

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
