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

- **API** (`Restaurant.Api`) — ASP.NET Core Web API over PostgreSQL on Azure (EF Core), with a
  SignalR hub at `/hubs/orders` pushing live order events, and OpenAPI docs.
- **Domain** (`Restaurant.Shared`) — four models: `MenuItem`, `Table`, `Order`, `OrderItem`, plus an
  `OrderStatus` enum and five data-transfer objects.
- **Shared UI** (`Restaurant.UI.Shared`) — a Razor component library: `MenuItemCard`, `OrderCard`,
  `OrderStatusBadge`, and the API client.
- **Back office** (`Restaurant.Blazor`) — a Blazor Server progressive web app.
- **Terminal** (`Restaurant.Mobile`) — .NET MAUI Blazor Hybrid, targeting Android.

This repository holds `docs/` and nothing else: the handbook, the token kit (two CSS files and a
preview page), the gap register, and the vendored design sources the handbook was written from.

## Current status

**No product code has been written yet.** The POC repository is a working skeleton, not a product:

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
- `docs/design/tokens/` — `upos-tokens.css` (77 custom properties: color, type, spacing, shape,
  elevation, motion, touch targets), `upos-components.css` (21 component recipes with their
  modifiers), and `preview.html`, which renders every token and component for eyeballing. Checked
  in a browser in light and dark; the four accent presets switch independently of the theme.
- `docs/GAPS.md` — thirteen entries, `GAP-01` to `GAP-13`, covering everything the design draws
  that the current four-model schema cannot express.
- `docs/design/reference/` — the vendored design sources: both artboards, the SecondBrain design
  system the language derives from, and the scope outline.

Nothing here is deployed, because there is nothing to deploy. The deliverable is documentation.

## Recent progress

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
is defined in `upos-tokens.css`, the page was checked in a browser in light and dark, and the four
accent presets are independent of the theme so either can change without touching the other. A
developer can style a new screen from Part I and the tokens alone, without opening an artboard.

**Amber — the schema decisions are the critical path.** Nine of thirteen gaps are P0 Release 1
work, and several of them (payments, employees and approvals, modifiers) are whole domains that do
not exist in the model at all. The design is drawn as if they do. Until those decisions are taken,
the Release 1 screens can be styled but not wired.

**Amber — the terminal's offline capability is unbuilt.** Offline continuity is a P0 requirement
and the handbook specs the whole UI contract for it, but nothing in `Restaurant.Mobile` implements
it yet, and the API has no idempotency key to make a replay safe (`GAP-10`). This is the biggest
gap between what is designed and what exists.

- **Tests:** none. This repository holds documentation; there is nothing to test. The token kit was
  verified by opening `docs/design/tokens/preview.html` in a browser and by a structural check that
  every `var(--upos-*)` reference resolves.
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
