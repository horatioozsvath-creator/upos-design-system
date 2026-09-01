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

The terminal is one 1440×900 shell at `--upos-radius-panel`, `--upos-surface`, clipped, with a fixed
76px top bar and a fixed 78px bottom nav. Everything between them is a destination, and everything
that is not a destination opens over the destination. Order entry carries the shell; the other seven
specs assume it.

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
  `ITEM INFO` mode pill at `--upos-radius-pill`, `6px 14px`, 700/11px. The grid is
  `repeat(auto-fill,minmax(190px,1fr))` at 16px gaps. A tile is `--upos-surface`, 1px
  `--upos-border`, `--upos-radius-card` 18px, `--upos-shadow-card`, 18px padding, 6px column gaps:
  name 700/14px, price 800/15px in `--upos-accent-deep`, then `.u-chip-allergen` chips.
- **Cart panel, 380px**, inset fill, left hairline, three bands. Header `18px 22px` above a
  hairline: the check label at 800/14px and a loyalty pill button. Line list scrolls at `14px 22px`,
  12px between lines. Footer `18px 22px` under a hairline.
- **Cart line**: left, `{qty} × {name}` at 700/14px, the mods line at 400/12px `--upos-ink-subtle`,
  then allergen chips. Right, a round send-one button, a `−`, the line total at 800/14px in a 52px
  right-aligned slot, and a `+`. The artboard draws those at 26px and 24px; ship them at
  `--upos-touch-terminal` 48px through `.u-qty-stepper` and `.u-icon-btn` — §11's rule outranks the
  artboard's pixels.
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

- Header: the item name at 800/18px, `.u-chip-allergen` chips under it, and a 30px round
  `.u-icon-btn` close on the inset fill.
- Burger body, three blocks. `DONENESS · REQUIRED` at 700/10.5px `.08em` `--upos-ink-subtle`, then
  single-select pills at `10px 16px`. `ADD-ONS · OPTIONAL`, then multi-select pills at `9px 14px`
  carrying the upcharge in the label — `Bacon +$1.50`, `Avocado +$1.75`, `Extra Cheese +$1.00`. Then
  a combo block: `--upos-surface-inset`, 16px radius, `14px 16px`, `Make it a combo` at 700/13px over
  `+ side, + drink · +$3.50` at 400/11px, and a 50×28px switch whose 22px knob slides `3px → 25px`.
- Combo on adds `CHOOSE A SIDE` and `CHOOSE A DRINK` pill groups under it.
- Drink body is one block: `SIZE · REQUIRED` and three pills — Small · Medium · Large.
- Footer row: a qty stepper (`.u-qty-stepper`, `−`, the count at 800/15px, `+`) and then a
  full-width 52px `.u-btn--primary` reading `Add to order — $NN.NN`. The artboard draws the stepper
  buttons at 30px; ship them at `--upos-touch-terminal` 48px (§11).

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
24px radius, `--upos-surface`, 26px padding, 16px gaps, `--upos-shadow-modal`, centered on
`--upos-scrim`.

- Header: the item name at 800/18px, the price at 800/15px in `--upos-accent-deep`,
  `.u-chip-allergen` chips at `3px 8px`, and a 30px round `.u-icon-btn` close.
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
- **Table**: 104px tall; 150px wide for two- and four-tops, 230px for the large tops; `--upos-surface`
  fill; a 2px status-colored border; `--upos-shadow-card`; a centered stack of the id at 800/19px,
  the status line at 700/11.5px in the status color, and the guest count at 400/11px
  `--upos-ink-subtle`. Shape carries seating: square tables take 20px (`--upos-radius-card` 18px in
  the kit), rounds take `--upos-radius-pill`.
- **Guest-count dialog**: 380px, 24px radius, 26px padding, 18px gaps, on a lighter scrim
  (`rgba(20,25,31,.45)`, against `--upos-scrim`'s `.5` under the modals). Header `New order · T3` at
  800/18px with a 30px close; a `GUESTS / SEATS` label; a centered stepper — `−`, the count at
  800/32px, `+`, all at `--upos-touch-terminal` (the artboard draws 40px); and a 54px
  `.u-btn--primary` reading `Start order`.

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
kit's `.u-drawer` floats inset at 300px; this one overrides both the width and the inset, and Part
III carries the variant.

- Header `22px 24px` above a hairline: the table id at 800/16px over `4 guests · Server: Maya` at
  700/12px `--upos-ink-subtle`; a 30px round `.u-icon-btn` close.
- `Add to order`, a 46px `.u-btn--primary` at `--upos-radius-inset`, margin `16px 24px 0`.
- Body scrolls at `20px 24px`, 18px between courses.
- A course is a control row then its items. Control row: a status chip at `5px 12px` —
  `COURSE 1 · FIRED` on `--upos-status-fired` — plus that course's actions. Item rows sit on
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
  left; on the right a 36px round guest-mirror `.u-icon-btn` and the amount due at 800/20px.
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
- **Split modal**: 460px, 24px radius, 26px padding, 18px gaps, on `--upos-scrim`. Header
  `Split the check` with a 30px close; a `.u-segmented` track — `EVENLY` · `BY SEAT`; then either the
  even body (a stepper around the count at 800/28px over a `GUESTS` label, then the per-guest amount
  at 800/24px with `per guest` at 400/13px) or the seat body (four inset rows at `12px 14px`, seat
  name left, amount right); and a 52px `.u-btn--primary` reading `Done`.
- **Guest mirror**: a 520px sheet on the right, full height, `--upos-surface`, centered stack — a
  `GUEST-FACING MIRROR` kicker at 700/11px `.15em`, the total at 800/30px with `--upos-grad-primary`
  clipped to the text (the one clipped figure this screen gets, §3), and three tip labels at
  `12px 20px`, `--upos-radius-inset`. A 30px close sits at `top:22px; right:22px`. The artboard draws
  those tip labels as display-only; make them tappable and they take `--upos-touch-kiosk` 60px,
  because the surface is guest-facing (§11).
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
- Empty queue — a statement, not an apology: `No open orders. Every channel is clear.`

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
