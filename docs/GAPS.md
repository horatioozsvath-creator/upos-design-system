# UPOS data-model gaps

Everything the approved design renders that the current POC schema and API cannot express, recorded
for the dev team as entries `GAP-01` to `GAP-13`.

**This register records and prioritizes. It never fixes.** Schema changes are the dev team's call.
Each entry states what is missing, which screens and components it bites, a minimal entity sketch to
weigh, and the release the outline puts it in. The sketches are starting points for that
conversation, not decisions taken here.

**The POC schema is four models.** `MenuItem`, `Table`, `Order` and `OrderItem`, with an
`OrderStatus` enum, five DTOs (`MenuItemDto`, `OrderDto`, `OrderItemDto`, `CreateOrderDto`,
`UpdateOrderStatusDto`), the Menu and Orders controllers, and `/hubs/orders`. Where an entry says a
field does not exist, that is what it is measured against.

**How the IDs are used.** Every screen spec in Part II of `docs/design/UPOS-DESIGN-HANDBOOK.md` and
every affected component in Part III cites these IDs in its **Gaps.** block. A citation is a pointer
to the entry below; the entry is the record. The IDs are stable — a spec that grows a new gap gets a
new ID rather than a renumbering.

**Pure API work is not tracked here.** Where the fields already exist and only an endpoint is
missing, the handbook's own Data sections say so and keep it: the dashboard and report aggregations,
the Menu write endpoints behind the 86 badge and `Add`, a device registry, per-item done flags, and
the assembly label on `Order`. **Ticket printing is on that list too.** The bag ticket binds fields
that all exist — `OrderDto.Id`, `OrderNumber`, `CreatedAt`, `TableNumber`, and per line `Quantity`,
`MenuItemName` and `SpecialInstructions` — and the two things it wants and does not have are a record
of which printer a terminal claims and a record that a label was printed, both of which are new
tables contradicting nothing in the current model. What printing genuinely cannot say is already
carried below: a station to route a line to (GAP-06), an order type on the label (GAP-04), a course
to print rather than the whole check (GAP-03), a server (GAP-09) and a venue (GAP-13). The KDS data contract names a third item alongside those last two — a
station column on `OrderItem` — as the same kind of additive work; this register carries the
item-to-station linkage itself as a schema gap under GAP-06, so the two statements stand side by side
rather than one quietly dropping the other. Those are additive work that contradicts nothing in the
current model. This register is for what the model cannot say at all.

**Priorities and releases** come from `docs/design/reference/outline-extracted.txt` — P0
operational, P1 competitive, P2 nice to have; Release 1 pilot-capable, Release 2 commercially
competitive, Release 3 expansion. Each entry quotes the outline line that sets its priority.

| ID | Gap | Priority | Release |
| --- | --- | --- | --- |
| GAP-01 | Modifier system | P0 | R1 |
| GAP-02 | Combos and meal bundles | P0 | R1 |
| GAP-03 | Coursing and seat tracking | P0 | R1 |
| GAP-04 | Order type and channel | P0 | R1 |
| GAP-05 | Allergens on menu items | P0 | R1 |
| GAP-06 | Recipes, costing and station routing | P1 | R2 |
| GAP-07 | Table status and timing | P0 | R1 |
| GAP-08 | Payments domain | P0 | R1 |
| GAP-09 | Employees, roles and approvals | P0 | R1 |
| GAP-10 | Idempotency and the offline queue | P0 | R1 |
| GAP-11 | Inventory levels and automatic 86 | P1 | R2 |
| GAP-12 | Loyalty accounts | P1 | R2 |
| GAP-13 | Venue, organization and setting scope | P1 | R2, with an R1 caution |

---

## GAP-01 · Modifier system — P0

**What's missing:** `MenuItem` has no modifier groups and no options. The design renders required
single-select groups, optional multi-select add-ons with upcharges, no/remove lines, min and max
rules, default selections and kitchen names. `OrderItemDto` carries a quantity and a menu-item name
and nothing else, so a selection reaches the API as nothing at all — worse on the kiosk than at the
terminal, because a server can tell the kitchen what the modal could not carry and a guest cannot.
The POC's only per-line customization today is the free-text `OrderItem.SpecialInstructions` string:
no structured options, no upcharges, no validation.

**Where it bites:** Order entry · Modifier modal · Menu manager · Chit anatomy · Chit actions · KDS
data contract · Kiosk flow · Kiosk data contract · CartLine.

**Minimal suggestion:** `ModifierGroup` (name, type required/optional/no-remove, min, max) →
`ModifierOption` (name, priceDelta, kitchenName, isDefault), with an `OrderItemModifier` join on
`OrderItem` so a build reaches the kitchen as structure rather than as rendered text. Structured
modifiers replace the free-text `OrderItem.SpecialInstructions` (a nullable string on `OrderItem` in
the POC) as the carrier for per-line modifications.

**Release:** R1 (outline: "Modifier system — P0", scoped as "Required/optional modifiers, min/max
selections, nested groups, upcharges, default selections, kitchen names"; Release 1 carries the
"Core menu and modifier engine").

## GAP-02 · Combos and meal bundles — P0

**What's missing:** no combo entity. The design detects a combo from what is in the cart, rewrites
the lines into a combo line with its own price, and shows the saving against à la carte. The combo
switch, its two pickers, its `+$3.50` and the per-line saving have nothing to persist to, and the
kiosk's `COMBO · {side} + {drink}` chip is drawn from client state that does not survive submit.

**Where it bites:** Order entry · Modifier modal · Kiosk flow · Kiosk data contract · CartLine.

**Minimal suggestion:** `Combo` (name, price, availability) → `ComboSlot` (name, min, max) with an
eligible `MenuItem` set per slot, plus a nullable combo reference and slot role on `OrderItem` so a
line knows which bundle it belongs to and what it substituted.

**Release:** R1 (outline: "Combos and meal bundles — P0 for QSR; P1 for table service", scoped as
"Fixed and variable bundles, substitutions, price adjustments"; Release 1 carries "QSR fast-entry,
combos and pickup workflows").

## GAP-03 · Coursing and seat tracking — P0

**What's missing:** no course and no seat on `OrderItem`. The design holds and fires courses
independently, shows `COURSE 2 · HOLD` with a delay, and offers a per-course fire. The POC writes a
whole order's status, so a held course and a fired course cannot coexist on one check, and a table's
check cannot say which items run together or which guest they belong to.

**Where it bites:** Floor plan · Table drawer.

**Minimal suggestion:** `Course` (order reference, sequence, status, scheduledFireAt, firedAt) with a
course reference and a seat number on `OrderItem`, and a fire endpoint that moves a course rather
than the order. `firedAt` alone is past-tense only; the Table drawer's delay track picks a pending
fire time before the course fires, and `scheduledFireAt` is where that selection persists.

**Release:** R1 (outline: "Coursing — P0", scoped as "Assign courses, hold/fire individual courses
and display course information in the kitchen", and "Guest and seat tracking — P0"; Release 1
carries "Table-service check/table/course workflows").

## GAP-04 · Order type and channel — P0

**What's missing:** `Order` has no order type and no channel. The design badges every order with its
origin, colors the badge per channel, splits reports by it and routes on it. `Dine In` in the check
header is a literal, `.u-badge-channel` on every chit is a literal, nothing on a submitted order says
it came from a kiosk, and a connected channel cannot mark the orders it sends. Until the field
exists, connecting a channel changes nothing downstream.

**Where it bites:** Order entry · Channels queue · Integrations · Chit anatomy · KDS data contract ·
Kiosk data contract · OrderCard · ChannelBadge · UposSwitch.

**Minimal suggestion:** an `OrderType` enum on `Order` (dine-in, takeout, pickup, delivery, counter)
and a `Channel` reference (name, two-letter code, color, connected state), so an order carries both
its service model and the surface that created it. The outline states the principle this sketch
follows: "The same order model should support table, counter, online, kiosk and delivery channels.
Creating a separate order representation for each channel will make menu synchronization, reporting,
refunds, kitchen routing and integrations much harder."

**Release:** R1 (outline: "Order types — P0", scoped as "Dine-in, takeout, pickup, delivery, counter
service; configurable pricing and taxes by type"; Release 1 carries "Orders, taxes, discounts and
receipts". The queue built on top of the field is "Multi-channel order queue — P1, required by GA").

## GAP-05 · Allergens on menu items — P0

**What's missing:** `MenuItem` carries no allergens. Part I §5 reserves violet for allergen and
nothing else in UPOS, and the chips appear on the menu grid, the item detail, the cart line, the
kiosk list row and the row on a chit a cook is meant to read first. No field backs any of it, and
the Menu manager's toggle pills edit nothing.

**Where it bites:** §5 Allergen color · Order entry · Item info modal · Menu manager · Chit anatomy ·
KDS data contract · Kiosk flow · Guest-facing rules · Kiosk data contract · MenuItemCard ·
AllergenChip.

**Minimal suggestion:** an `Allergen` lookup (code, display name) joined many-to-many to `MenuItem`
and surfaced on `MenuItemDto`, so the terminal, the kitchen and the kiosk read one source rather
than three fixtures.

**Release:** R1. The outline does not name allergens as a capability; it prices the record they
belong on at "Menu management — P0", scoped as "Categories, items, sizes, prices, descriptions,
images, taxes, availability, multiple menus and dayparts", and Release 1 carries the "Core menu and
modifier engine". The design's reserved color makes this a menu field rather than a later addition.

## GAP-06 · Recipes, costing and station routing — P1

**What's missing:** no recipe, ingredient, cost, prep-step or plating model, and no station on an
item. Plate view draws its photos, stack layers, ingredient order, timing and hold from fixture; the
Menu manager's cost cards scale off the item's own price, which makes `COGS $`, `COGS %` and `MARGIN`
partly circular; Reports has nothing to compute COGS by category from. The same absence breaks
routing — `OrderItem` names a menu item and no station, so the station strip, its counts and its
filter are literals and the board cannot decide which chit a line lands on. The station linkage sits
in this entry rather than with the order because which station makes an item is a property of how it
is made.

**Where it bites:** Item info modal · Menu manager · Reports · Station board · Chit actions · KDS
data contract.

**Minimal suggestion:** `Recipe` on `MenuItem` → `RecipeComponent` (ingredient, quantity, unit,
cost), with ordered `PrepStep` rows and plating assets; a `Station` entity with a routing link from
the item or its recipe, so a line resolves to a station without a second lookup.

**Release:** R2. The outline splits this one: "Kitchen routing — P0", scoped as "Route items by
station, order type, menu category, revenue center and fulfillment channel", against "Advanced
ingredient and recipe inventory" among the P2 additions and "Advanced inventory" in Release 3.
Release 2 carries "Production-grade KDS", which is where a routed board lands. Registered at P1
because the P0 routing half cannot ship without part of the model the P2 half defines — a split the
dev team may want to sequence separately.

## GAP-07 · Table status and timing — P0

**What's missing:** `Table` carries an `IsOccupied` bool rather than a status enum with timestamps,
so `SEATED · 4m` and `CHECK PRESENTED` have nothing to bind to and the elapsed figure is derived
client-side from `Order.CreatedAt` and never read from the API. The guest count has no field, and
the tile's position, width, shape and section are room geometry the artboard hard-codes.

**Where it bites:** Floor plan · FloorTable.

**Minimal suggestion:** a `TableStatus` enum on `Table` (seated, ordered, fired, served, check
presented, paid) with the timestamp of the last transition, plus a guest count; room geometry as its
own record if the floor plan is ever to be edited rather than drawn.

**Release:** R1 (outline: "Table status and timing — P0", scoped as "Seated, ordered, fired, served,
check presented, paid; elapsed-time indicators", alongside "Graphical floor plan — P0" for the
geometry; Release 1 carries "Table-service check/table/course workflows").

## GAP-08 · Payments domain — P0

**What's missing:** no payments domain at all — tender, tip, split allocation, refund and comp have
no model, no DTO and no endpoint. The payment screen renders `18% · $NN.NN` and can only write
`PUT /api/orders/{id}/status` to `Completed`, which records that the check closed rather than how it
was paid, so every number the screen produces is lost. A comp has no record either:
`OrderStatus.Cancelled` voids a whole order, not the three lines the dashboard counts. On the kiosk
the card-present step records neither the approval nor the tender.

**Where it bites:** Payment · Dashboard · Kiosk flow · Kiosk data contract · TipPad.

**Minimal suggestion:** `Payment` on `Order` (tender type, amount, tip, authorization reference,
status) with `SplitAllocation` (seat or share, amount) and `Refund` and `Comp` records carrying a
reason and an approver. Card data stays with the processor; the POS stores a token and a reference.
The receipt needs no field of its own — it renders from `Payment` plus the `Order` it settles.

**Release:** R1 (outline: "Payments — P0", scoped as "Credit/debit, EMV, contactless wallets, cash,
gift card, split tender, tips, refunds and partial refunds"; Release 1 carries "Integrated payments
and cash").

## GAP-09 · Employees, roles and approvals — P0

**What's missing:** no employee, role, PIN, shift or approval record. `Server: Maya` is a literal, a
re-fire or a void has nobody to approve it, Employees has no record to list, and `LABOR %` on the
dashboard and labor hours, cost and percent in Reports are all fixtures. Every manager approval
elsewhere in the product has nobody to check it.

**Where it bites:** Table drawer · Dashboard · Reports · Employees, Devices, Settings.

**Minimal suggestion:** `Employee` (name, PIN hash, job code, pay rate) → `Role` with permissions →
`Shift` (clock-in, clock-out, breaks), plus an `Approval` record naming actor, action, target and
timestamp for every manager-gated write. The dashboard and Reports must read labor from one source
or the two figures disagree.

**Release:** R1 (outline: "Staff authentication — P0", "Manager controls — P0", scoped as "Approval
for voids, comps, refunds, price overrides, reopened checks and cash exceptions", and "Time tracking
— P0"; Release 1 carries "Employee roles and audit trail").

## GAP-10 · Idempotency and the offline queue — P0

**What's missing:** nothing in `CreateOrderDto` carries a client-generated key, and there is no queue
table. The terminal's offline queue is a local SQLite table on `Restaurant.Mobile` that is planned
rather than built, and the contract replay has to honor is that a write reaching the API twice must
not produce two orders. On the kiosk the same hole is sharper: a submit retried across a flaky link
can produce two orders and two numbers for one guest.

**Narrowed, not closed.** This gap used to cover the whole of §11's offline pill, including whether
the terminal could tell it was offline at all. **It can now**: `IDeviceStatus` reads the connection
from the platform on `Restaurant.Mobile`, and the pill is real for that half — it appears when the
device has no network and reads `OFFLINE`. What remains is everything behind it: the queue, the
count, the replay and the idempotency key. So the pill ships stating the connection and saying
nothing about a queue, because `OFFLINE · 0 QUEUED` is the sentence a healthy terminal with an empty
queue also prints and could not be read as a gap. **Nothing else about this gap has moved** — the P0
is the doubled order on replay, and that is untouched.

**Where it bites:** §11 Offline · Offline behavior · Kiosk data contract · OfflinePill.

**Minimal suggestion:** a client-generated idempotency key on `CreateOrderDto` and
`UpdateOrderStatusDto`, unique-indexed server-side so a replay returns the original result rather
than a second order; a local queue row holding the pending write, its target endpoint and the time
it was queued.

**Release:** R1 (outline: "Offline operation — P0", scoped as "Continue order entry, kitchen routing
and cash transactions without cloud connectivity", and under nonfunctional requirements
"Idempotency — Retried order and payment requests must not produce duplicate checks, tickets or
charges"; Release 1 carries "Offline operation").

## GAP-11 · Inventory levels and automatic 86 — P1

**What's missing:** no stock model. `MenuItem.IsAvailable` is a manual flag, so 86ing an item is a
hand flip rather than the consequence of a count reaching zero. The Reports low-stock panel needs a
level, a par threshold and a unit per ingredient, and the units the design shows differ per
ingredient (`18 left`, `4 bags left`, `9 heads left`), which puts the unit on the ingredient rather
than on the report.

**Where it bites:** Menu manager · Reports.

**Minimal suggestion:** `Ingredient` (name, unit) with `StockLevel` (quantity on hand, par
threshold) and a depletion rule read off the recipe, so availability can be derived rather than
typed. Depends on GAP-06 for the recipe that connects a sold item to a count.

**Release:** R2. The outline's "Item availability and “86” — P0" is already met for the manual half
by `IsAvailable`; the counted half — "Manual item counts, automatic sold-out status, propagation to
terminals and digital channels" — needs inventory, which the outline places among the P2 additions
as "Advanced ingredient and recipe inventory" and in Release 3 as "Advanced inventory". Registered
at P1/R2 because the approved Reports design shows levels and pars, which pulls it earlier than the
outline's own placement.

## GAP-12 · Loyalty accounts — P1

**What's missing:** no loyalty or customer entity. The cart-header loyalty toggle and the loyalty
pill have nothing to attach to, and a kiosk has nothing to identify the guest it is serving against.

**Where it bites:** Order entry · Guest-facing rules · Kiosk data contract · Pill.

**Minimal suggestion:** `Customer` (contact, consent) → `LoyaltyAccount` (identifier, balance, tier)
with a nullable customer reference on `Order`. Identification at checkout by phone or QR is enough
for what the design renders; a full CRM is not in scope for it.

**Release:** R2 (outline: "Loyalty identification at checkout — P1", scoped as "Phone, QR, app, card
or payment-linked identification", and "Customer profiles — P1"; Release 2 carries "Customer
profiles and basic loyalty").

## GAP-13 · Venue, organization and setting scope — P1

**What's missing:** no venue or organization entity, and therefore no scope to attach a setting to.
`Riverside Grill` is a literal in the dashboard heading and again in Reports, and every aggregation
above it is silently single-location. A channel connects to the installation rather than to a
location, so a second restaurant has nowhere to keep its own. The per-station threshold that `OVER TARGET` counts against, the kiosk's daypart windows,
its tax rate and both its timeouts have no scope to be stored on, and Settings has no scope at all —
which is why it can be specified but not bound.

**Where it bites:** Dashboard · Integrations · Reports · Employees, Devices, Settings · Station
board · Guest-facing rules · UposSwitch.

**Minimal suggestion:** `Organization` → `Location` → `RevenueCenter` → `Device`, with a `Setting`
keyed by scope so a value can be set once and overridden per location; a location reference on every
row that is implicitly single-venue today (`MenuItem`, `Table`, `Order`).

**Release:** R2 for the administration half (outline: "Multi-location management — P1", scoped as
"Central configuration with controlled location-level overrides and consolidated reporting"; Release
2 carries "Multi-location administration").

The scope key itself is an R1 architectural caution rather than deferred work. The outline's
nonfunctional Scale requirement reads "Avoid location-specific assumptions in the data model even if
the first customers have one location", and the configuration it hangs on is "Restaurant/location
configuration — P0", scoped as "Organization, location, revenue center, terminal, timezone, business
day, currency, tax rules, receipt settings". Adding the key in Release 1 costs little; retrofitting
it after Release 1 rows exist costs a migration of every table above. That trade is the dev team's
to make, and this entry records it rather than settling it.
