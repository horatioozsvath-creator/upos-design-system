# Project Overview — UPOS

> Last updated: 2026-09-01 · Maintained by Claude, corrected by Horatio

## What this is

UPOS is a point-of-sale product for restaurants — table service and quick service on the same
system — aimed at the ground Toast, Shift4 and Square already hold. It runs on Android terminals,
keeps working when the network drops, and puts the same design language on four surfaces: the
server's terminal, the manager's back office, the kitchen display, and the self-order kiosk.

This repository is not the product. It is the design authority for it: a handbook, a token kit and
a gap register that together tell a developer exactly what to build, so the team implements the
approved designs without guessing at colors, dimensions, states or data requirements.

## Architecture at a glance

The product being designed is a five-project .NET solution living in a separate repository,
[POC-Razor-Hospitality](https://github.com/tpaing00/POC-Razor-Hospitality):

- **API** (`Restaurant.Api`) — the server every device talks to. An ASP.NET Core Web API storing
  data in PostgreSQL on Azure (through EF Core), with a live-push channel at `/hubs/orders`
  (SignalR) so a new order appears on the kitchen screen without anyone refreshing.
- **Domain** (`Restaurant.Shared`) — the shared vocabulary: four models, `MenuItem`, `Table`,
  `Order` and `OrderItem`, plus the `OrderStatus` enum that tracks an order from placed to paid,
  and the order and menu data-transfer objects the API sends over the wire.
- **Shared UI** (`Restaurant.UI.Shared`) — the building blocks both apps reuse rather than each
  writing its own: a menu-item card, an order card, a status badge, and the client that calls the
  API. Technically a Razor component library.
- **Back office** (`Restaurant.Blazor`) — the manager's app, running in a browser (Blazor Server)
  and installable like a desktop app.
- **Terminal** (`Restaurant.Mobile`) — the tablet app staff carry to tables. Android, built with
  .NET MAUI Blazor Hybrid: the same web-style screens packaged as a native app.

This repository holds no product code. Under `docs/`: the handbook, the token kit (two CSS files
and a preview page), the gap register, the vendored design sources the handbook was written from,
and `docs/superpowers/` — the design spec and implementation plan this work followed. At the root,
`.superpowers/` holds the working briefs and task reports behind each commit.

## Current status

> **This section is behind the code.** It was written when the deliverable was documentation only.
> Since then the token kit has landed in both client projects, the terminal shell and Order entry
> have been built in `Restaurant.UI.Shared`, and the terminal runs on a real Datalogic Memor 20 in
> immersive full screen with a live battery and connectivity readout. `## Recent progress` below is
> current; the paragraphs immediately underneath are not, and are kept until this section is rewritten
> in full rather than patched.

**No product code had been written when this was written.** The POC repository was a working
skeleton, not a product:

- Orders flow end to end — the API persists them, and SignalR broadcasts status changes live.
- The back office and terminal projects both still carry .NET template leftovers (`Counter`,
  `Weather`, `SurveyPrompt`) and Bootstrap styling. Neither looks like the approved design.
- The terminal's offline capability is planned but unbuilt. Its README steps 6 to 8 — the local
  SQLite store and the sync-back — remain open. Offline is a P0 requirement, so this is the single
  largest piece of unbuilt work in the codebase.
- There is no payments code, no employee or login model, and no modifier system.

**In this repository, the design is complete and reviewed.** As of 2026-09-01:

- `docs/design/UPOS-DESIGN-HANDBOOK.md` — roughly 2,800 lines in four parts. Part I is the design
  language in twelve sections. Part II specs twenty screens across the four surfaces, each with
  layout, states, interactions and the data it needs. Part III is a twenty-five component
  inventory. Part IV points at the gap register.
- `docs/design/tokens/` — `upos-tokens.css` (79 custom properties: color, type, spacing, shape,
  elevation, motion, touch targets), `upos-components.css` (21 component recipes with their
  modifiers), and `preview.html`, which renders every token and component for eyeballing. Verified
  in a browser across both themes and all four accent presets, with no console errors.
- `docs/GAPS.md` — thirteen entries, `GAP-01` to `GAP-13`, covering everything the design draws
  that the current four-model schema cannot express.
- `docs/design/reference/` — the vendored design sources: both artboards, the scope outline, and
  two design systems under `_ds/` — SecondBrain, which the language derives from, and the
  modernist kit the secondary artboard was drawn in, kept as the superseded source.

Nothing here is deployed, because there is nothing to deploy. The deliverable is documentation.

## Recent progress

- 2026-09-04 — **The terminal follows the OS theme, with no toggle of its own.** `ISystemTheme` is
  the second question asked in `IDeviceStatus`'s shape: the shared library owns it, MAUI answers it
  from `Application.RequestedTheme` and subscribes to `RequestedThemeChanged`, the back office
  answers null so its rail's toggle keeps the attribute. The shell writes §11's contract —
  `data-theme` on `<html>` — and nothing else. A manual override was considered and refused: a
  terminal's appearance is an estate setting an MDM can push, not a control that gets pressed
  mid-order, and there is nowhere honest on the chrome to put one. Dark is verified with no AA
  failure in any of the three width bands, and the status hues do not move — only the ink roles,
  to §4's on-dark set, stated once in the kit's dark block
- 2026-09-04 — **The 10.1" tablet in portrait has a designed layout.** Order entry now has three
  width bands rather than one step: three panes above 1000px, two panes from 771 to 1000 — rail as
  the handheld's chip row, cart docked at 340px, two tiles abreast — and the handheld's single
  column at 770 and below. 800×1280 used to land on the handheld side of an inclusive
  `max-width: 800px` and got the phone layout stretched across a tablet. The cart stays docked
  because the panel has 1126px of height to stand a check in, and hiding it behind a sheet to buy a
  third grid column would spend the one thing the 1440 design is built around. 1440×900 and 393×785
  are unchanged, proved by computed-style fingerprint
- 2026-09-04 — **The terminal prints.** A bag ticket goes to a Star TSP143IV-UEWB SK over Bluetooth
  Classic RFCOMM when a check is sent, and `MORE` in the bottom nav opens a printer setup screen
  with discovery, pairing, seven honest states and a test print. The command set is Star Line Mode,
  chosen because it is the mode the printer is in out of the box. `IReceiptPrinter` and
  `IPrinterTransport` follow `IDeviceStatus`'s pattern — the shared library owns the question,
  `Restaurant.Mobile` answers it with a radio, the back office answers that it has none — so a
  network transport for the same printer's Ethernet and Wi-Fi side is one new class and nothing
  above it moves. 44 tests cover the ticket bytes and the print state machine. **None of it has
  touched a printer**: no Android device and no printer were reachable, so the Star command
  constants and the status-block bit positions are transcribed from the specification and are
  unverified. `.superpowers/sdd/printer-report.md` lists exactly what the owner has to confirm and
  how
- 2026-09-02 — **The terminal owns the whole screen.** `MainActivity` hides Android's status and
  navigation bars (sticky immersive), because the navigation bar's back and home controls let a
  member of staff leave the app mid-order. The hidden status bar's instruments move into the
  shell's top bar: battery and connectivity, read through a new `IDeviceStatus` abstraction that
  `Restaurant.UI.Shared` owns and each host answers — MAUI Essentials on the device, an explicit
  "no reading" in the back office's preview. The viewport is 393×785 again, the whole panel, and no
  layout rule had to change for it
- 2026-09-02 — **The offline pill is half real.** Connectivity is observed now, so the pill states
  `OFFLINE` truthfully; the queue behind §11's count still does not exist, so it prints no count and
  names GAP-10 beside itself. GAP-10 narrowed, not closed — the P0 is still a doubled order on replay
- 2026-09-02 — **Handheld bottom nav fixed.** At 393px the five labels plus padding and §11's 8px
  gaps summed to 442.93px into 393px, so the strip overflowed and `MORE` clipped to `MO`. Labels drop
  below 800px and the icons step to 20px; smaller labels and a `MORE` overflow were both measured and
  rejected. Every item is now 69×48px with nothing clipped
- 2026-09-01 — Whole-branch review applied: per-accent AA ruling on the four accent presets, a
  theme-aware `--upos-surface-veil` in place of a hard-coded translucent white, `--upos-grad-bar-v`
  for the vertical bars, every `:hover` rule moved behind one `@media (hover:hover)` guard, an
  offline `@font-face` path for the terminal, and two more kit gaps recorded in §12
- 2026-09-01 — Project overview written; acceptance sweep run against the spec's five criteria
- 2026-09-01 — `docs/GAPS.md` register, `GAP-01` to `GAP-13`, cross-checked against every handbook
  citation
- 2026-09-01 — Part III component inventory: 25 components, their classes, props and consumers
- 2026-09-01 — Part II-D kiosk specs (3 screens), re-drawn from the secondary artboard into the
  Fluid language
- 2026-09-01 — Part II-C kitchen display specs (4 screens), same reconciliation
- 2026-09-01 — Part II-B back-office specs (5 screens)
- 2026-09-01 — Part II-A terminal specs (8 screens)
- 2026-09-01 — Part I design language, 12 sections
- 2026-09-01 — Token kit: `upos-tokens.css`, `upos-components.css`, `preview.html`
- 2026-09-01 — Design sources vendored into `docs/design/reference/`

## Next milestones

1. **Hand the handbook to the dev team.** It is written to be read once end to end, then used as a
   reference. Part I plus the token kit is enough to style a screen the handbook never drew.
2. **Drop the token kit into `Restaurant.Blazor` and `Restaurant.Mobile`, and remove Bootstrap.**
   Handbook §12 carries the migration: two stylesheet links, the `data-theme` and `data-accent`
   attributes on `<html>`, a markup translation table, and the template pages to delete. This is
   mechanical work and it unblocks everything visual that follows.
3. **Decide the schema.** Nine of the thirteen gaps are P0 and land in Release 1 — modifiers,
   combos, coursing and seats, order type and channel, allergens, table status and timing, the
   payments domain, employees and approvals, and the offline queue with idempotency keys. Each
   entry in `docs/GAPS.md` sketches a minimal shape to weigh. Those are decisions for the dev team,
   not choices the design made for them; nothing else can be built on top until they are settled.
4. **Build the Release 1 screens.** Order entry, the modifier modal, the floor plan, the table
   drawer and payment on the terminal; the dashboard and menu manager in the back office. Part II
   specs each one down to the pixel.
5. **Build offline.** The SQLite store and sync queue in `Restaurant.Mobile`, plus idempotency keys
   on the API so a replayed write cannot create a second order.

## Health

**Green — the design is fully specified.** Every interactive element in both artboards maps to
exactly one screen spec. Every gap the design exposes is recorded and cross-referenced in both
directions. The token kit resolves standalone: every variable the components and preview reference
is defined in `upos-tokens.css`, and the preview page was verified in a browser in both themes and
all four accents, with no unresolved custom properties and no console errors. Theme and accent are
independent, so either can change without touching the other. A developer can style a new screen
from Part I and the tokens alone, without opening an artboard.

**Amber — the schema decisions are the critical path.** Nine of thirteen gaps are P0 Release 1
work, and several of them (payments, employees and approvals, modifiers) are whole domains that do
not exist in the model at all. The design is drawn as if they do. Until those decisions are taken,
the Release 1 screens can be styled but not wired.

**Amber — the terminal's offline capability is unbuilt.** Offline continuity is a P0 requirement
and the handbook specs the whole UI contract for it, but nothing in `Restaurant.Mobile` implements
it yet, and the API has no idempotency key to make a replay safe (`GAP-10`). This is the biggest
gap between what is designed and what exists.

- **Tests:** none. This repository holds documentation; there is nothing to test. The token kit was
  verified two ways: `docs/design/tokens/preview.html` opened in a browser across both themes and
  all four accents with no console errors, and a structural check that every `var(--upos-*)`
  reference resolves to a defined token.
- **Deploys:** none, and none planned for this repository. The handbook is meant to be read in the
  repository or shared as a rendered page.
- **Risks:** the schema decisions above are the main one. Second, the handbook is long and
  precise — its value depends on the team reading Part I before writing CSS, because the rest of it
  assumes that language. Third, the design targets a POC that is still mostly template; the
  distance from where the code is to where the design assumes it will be is larger than the
  handbook's page count suggests.

## Decision log (append-only)

- 2026-09-01 — Deliver a design specification first; implementation is a later phase. (Horatio)
- 2026-09-01 — Scope: terminal, back office, kitchen display and kiosk unified into one design
  language. Menu boards and the customer-facing display are out of scope. (Horatio)
- 2026-09-01 — Package as one handbook plus a starter token kit; the gap register lives separately
  in `docs/GAPS.md`. (Horatio)
- 2026-09-01 — Adopt the SecondBrain Fluid design language wholesale, renamed UPOS Fusion Fluid,
  with POS-specific extensions. The secondary artboard's sharper modernist styling is superseded;
  its content survives. (Claude recommendation, approved)
- 2026-09-01 — Replace Bootstrap in both client projects with the token kit rather than override
  it. Overriding means shipping two design systems and fighting one on every screen. (Claude
  recommendation, approved)
- 2026-09-01 — Record data-model gaps; do not resolve them. Schema changes are the dev team's call.
  (Horatio)
- 2026-09-02 — The terminal hides Android's system bars. The reason is operational, not cosmetic:
  the navigation bar's back and home controls are a way out of the app mid-order. The status bar's
  battery and signal move into the shell's top bar as the cost of it. (Horatio)
- 2026-09-02 — A blocked control may become partly real. Where a claim is observable it is stated;
  where it is not, the gap is named beside it rather than filled with a zero. The offline pill is
  the first control to ship this way. (Horatio)
- 2026-09-02 — `Restaurant.UI.Shared` never references MAUI. Anything the device knows reaches the
  shared components through an interface the library owns and each host implements, with nullable
  readings so a host with no device renders the absence rather than a plausible number. (Claude
  recommendation, approved)
- 2026-09-04 — The terminal has three width bands and the shell's own width picks between them. No
  device sniffing, no host flag, no manual switch: two container queries on the shell. The 10.1"
  portrait band is a design; the handheld band is still a provisional degradation. (Horatio)
- 2026-09-04 — The terminal's theme follows the operating system and the terminal ships no theme
  control. The room changes and the terminal does not restart, so the setting is subscribed to
  rather than sampled; and a theme control on a POS is an estate setting on the wrong surface. If a
  fleet later needs an override it is three states in MORE → Settings, defaulting to System, and
  never a two-state toggle on the top bar. (Claude recommendation, approved)
