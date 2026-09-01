# UPOS Design Handbook + Token Kit Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Produce the UPOS design handbook, drop-in CSS token kit, gap register, and project overview defined in `docs/superpowers/specs/2026-09-01-upos-design-handbook-design.md`, so the dev team can implement the handoff designs in the Blazor/MAUI codebase without guessing.

**Architecture:** Documentation-first deliverable. Reference design sources are vendored into `docs/design/reference/` (Task 1) so every later task cites stable in-repo paths. The token kit (`upos-tokens.css` + `upos-components.css`) is verified by a static `preview.html` opened in a browser. The handbook is one markdown file built part-by-part; screen-spec tasks follow one shared template and cite gap IDs defined globally in this plan.

**Tech Stack:** Markdown, plain CSS (custom properties, no preprocessor), one static HTML preview page. No build step, no JS frameworks.

## Global Constraints

Copied from the spec — every task implicitly includes these:

- Font: **Archivo 400/700/800 only**; ui-monospace only for IDs, order numbers, KDS/kiosk prices/timers; nothing below 10px.
- Token naming: `--upos-*` custom properties; component classes `.u-*`.
- Theming: `[data-theme="dark"]` and `[data-accent="slate|teal|indigo|sky"]` attribute overrides; accent/theme change must be a single attribute flip.
- Status semantics (exact values): blue `#33648b` = new/seated (Pending–Confirmed); orange `#f97316` = fired (Preparing); red `#ec3013` = late/86'd/void; green `#22c55e` = Ready/Served/paid. Text variants: `#ae1800` red, `#d95f06` orange, `#159548` green. On-dark: `#8fc9ff` blue, `#ff8a70` red, `#9ee6b4` green. "Late" is derived from elapsed time, never stored.
- Allergen color (only non-blue/status hue): bg `rgba(139,92,246,.16)`, text `#7c3aed`.
- Motion: one easing `cubic-bezier(.22,1,.36,1)`, durations .25–.45s; only the six `fl-*` keyframes (`fl-marquee`, `fl-rise`, `fl-pulse`, `fl-sheen`, `fl-drift`, `fl-grow`).
- Radii: panels 26–28px, cards 16–22px, pills/controls 999px; no square corners on terminal/back office/kiosk. KDS derives from the Fluid dark-panel family, drops modernist square-corner chrome.
- Touch targets: ≥48px terminal, ≥60px kiosk primary actions. Kiosk copy/contrast targets WCAG 2.2 AA.
- Copy voice (the handbook itself must comply): declarative, second person, sentence case (UPPERCASE only for 9.5–10px letterspaced labels and status words), verbs on buttons, middot separators, **no emoji, no exclamation marks**.
- Handbook acceptance bar: a developer can style a new screen from `upos-tokens.css` + Part I alone; every interactive element in the two artboards appears in exactly one Part II screen spec; every Part II gap cites a `GAP-NN` ID.

**Global gap ID registry** (defined here so screen tasks can cite them before Task 10 writes GAPS.md):

| ID | Gap |
|----|-----|
| GAP-01 | Modifier groups/options (required/optional/no-remove, min/max, upcharges) — P0 |
| GAP-02 | Combos/bundles (side + drink, price adjustment, auto-detect) — P0 QSR |
| GAP-03 | Courses & seats (course assignment, hold/fire state, seat tracking) — P0 table service |
| GAP-04 | Order channel + order type (counter/kiosk/online/delivery; dine-in/takeout/…) — P0 |
| GAP-05 | Allergens on MenuItem — P0 |
| GAP-06 | Recipes/ingredients/COGS — P1 |
| GAP-07 | Table status model (enum + timestamps vs `IsOccupied` bool; elapsed timers) — P0 |
| GAP-08 | Payments domain (tender, tip, split, refund) — P0 |
| GAP-09 | Employees/roles/auth (PIN login, manager approvals) — P0 |
| GAP-10 | Offline sync queue + idempotency keys — P0 |
| GAP-11 | Inventory/stock levels — P1 |
| GAP-12 | Loyalty accounts — P1 |
| GAP-13 | Multi-location/org scaffolding — P1 |

**Key source line ranges** (in files vendored by Task 1, under `docs/design/reference/`):

- `UPOS Fusion (SecondBrain style).dc.html`: terminal shell lines ~68–505 (top bar ~75–90, order screen ~94–167, item info modal ~170–218, modifier modal ~220–293, tables ~295–372, payment ~374–463, channels ~465–482, bottom nav ~495–501); back office ~507–784 (sidebar ~513–522, dashboard ~526–563, menu manager ~565–662, integrations ~664–678, reports ~680–721, plate view ~723–772); data/logic script ~790–1311 (catalog, tables, status map, accents ~791–872; state ~873–889).
- `Kitchen Display and Kiosk.dc.html`: station board section `#1a` from ~line 47 (1920×800 board, 60px header); kiosk flow ~lines 330–640 (cart/summary ~590–612, done screen ~615–622, 96px in-bag bar ~624–629); chit data model ~lines 1185–1230 (fields: order, ch, name, bag, rush, allergy, age, items).
- `_ds/secondbrain-design-system-*/readme.md`: full design-language description (voice, ground, colour, type, shape, elevation, motion, hover, layout, density, iconography).
- `_ds/secondbrain-design-system-*/tokens/*.css`: canonical token values.

---

### Task 1: Vendor design reference sources

**Files:**
- Create: `docs/design/reference/` (extracted subset of the handoff bundle)
- Create: `docs/design/reference/README.md`

**Interfaces:**
- Consumes: `C:\Users\h_ozs\Downloads\Dual menu kiosk design-handoff.zip` (must exist)
- Produces: stable in-repo paths every later task cites, notably `docs/design/reference/UPOS Fusion (SecondBrain style).dc.html`, `docs/design/reference/Kitchen Display and Kiosk.dc.html`, `docs/design/reference/outline-extracted.txt`, `docs/design/reference/_ds/secondbrain-design-system-3cef5c67-b264-4117-ad2f-24f3f1404fe7/` (readme + tokens/*.css + styles.css)

- [ ] **Step 1: Extract and copy the needed subset**

```powershell
$tmp = Join-Path $env:TEMP "upos-handoff-extract"
Expand-Archive -Path "C:\Users\h_ozs\Downloads\Dual menu kiosk design-handoff.zip" -DestinationPath $tmp -Force
$src = Join-Path $tmp "design-handoff\dual-menu-kiosk-design\project"
$dst = "C:\Users\h_ozs\UPOS\docs\design\reference"
New-Item -ItemType Directory -Force $dst | Out-Null
Copy-Item "$src\UPOS Fusion (SecondBrain style).dc.html" $dst
Copy-Item "$src\Kitchen Display and Kiosk.dc.html" $dst
Copy-Item "$src\support.js" $dst
Copy-Item "$src\image-slot.js" $dst
Copy-Item "$src\uploads\outline-extracted.txt" $dst
Copy-Item "$src\_ds" $dst -Recurse -Force
Remove-Item $tmp -Recurse -Force -Confirm:$false
```

Note: if the extracted zip lacks the top-level `design-handoff\` folder, the project path is `dual-menu-kiosk-design\project` directly under `$tmp` — check with `Get-ChildItem $tmp`.

- [ ] **Step 2: Write the provenance README**

Create `docs/design/reference/README.md`:

```markdown
# Design reference sources

Vendored subset of the Claude Design handoff bundle
`Dual menu kiosk design-handoff.zip` (received 2026-09-01). These are
**prototypes, not production code** — the source of truth for visuals,
dimensions, and interactions.

| File | What it is |
| --- | --- |
| `UPOS Fusion (SecondBrain style).dc.html` | Primary artboard: tablet terminal + back office shells |
| `Kitchen Display and Kiosk.dc.html` | Secondary artboard: KDS, kiosk, menu boards (visual style superseded — see handbook Part I) |
| `support.js`, `image-slot.js` | Prototype runtime, needed only to open artboards in a browser |
| `outline-extracted.txt` | SD Hospitality 2026 scope outline (P0/P1/P2 + Derek's features) |
| `_ds/secondbrain-design-system-…/` | SecondBrain Fluid design system: readme + canonical token CSS |
| `_ds/modernist-…/` | Legacy kit; superseded by Fluid wherever they conflict |

Not vendored: `UPOS Fusion.dc.html`, `UPOS Fusion (SecondBrain style) v1.dc.html`
(earlier iterations), screenshot PNGs, and the .docx (its text is
`outline-extracted.txt`).
```

- [ ] **Step 3: Verify the files landed**

```powershell
Get-ChildItem "C:\Users\h_ozs\UPOS\docs\design\reference" -Recurse -File | Measure-Object
Test-Path "C:\Users\h_ozs\UPOS\docs\design\reference\_ds\secondbrain-design-system-3cef5c67-b264-4117-ad2f-24f3f1404fe7\tokens\colors.css"
```

Expected: count ≥ 20 files; `True`.

- [ ] **Step 4: Commit**

```powershell
git add docs/design/reference; git commit -m "docs: vendor design handoff reference sources"
```

---

### Task 2: Token kit — `upos-tokens.css` + preview scaffold

**Files:**
- Create: `docs/design/tokens/upos-tokens.css`
- Create: `docs/design/tokens/preview.html`

**Interfaces:**
- Consumes: `docs/design/reference/_ds/secondbrain-design-system-*/tokens/*.css` (canonical values), Global Constraints (status/allergen/accent hex values).
- Produces: every `--upos-*` custom property name below; the six `fl-*` keyframes; `[data-theme="dark"]` and `[data-accent="…"]` override blocks; `.upos-kds` scope class. Tasks 3, 4, 9 use these exact names.

- [ ] **Step 1: Write the failing check — preview.html scaffold**

Create `docs/design/tokens/preview.html` (this page IS the test; before tokens exist it renders obviously unstyled):

```html
<!DOCTYPE html>
<html lang="en" data-accent="slate">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>UPOS token kit preview</title>
<link rel="stylesheet" href="upos-tokens.css">
<link rel="stylesheet" href="upos-components.css">
<style>
  .pv-grid{display:flex;flex-wrap:wrap;gap:14px;margin:10px 0 26px}
  .pv-swatch{width:120px;border-radius:14px;overflow:hidden;font:700 10px/1.4 Archivo,system-ui,sans-serif}
  .pv-swatch > div:first-child{height:56px}
  .pv-swatch > div:last-child{padding:6px 8px;background:var(--upos-surface)}
  .pv-controls{position:fixed;top:14px;right:14px;display:flex;gap:8px;z-index:10}
</style>
</head>
<body>
<div class="pv-controls">
  <button onclick="document.documentElement.toggleAttribute('data-theme') || document.documentElement.setAttribute('data-theme','dark')">theme</button>
  <select onchange="document.documentElement.setAttribute('data-accent',this.value)">
    <option>slate</option><option>teal</option><option>indigo</option><option>sky</option>
  </select>
</div>
<main style="max-width:1100px;margin:0 auto;padding:40px 24px">
  <h1>UPOS Fusion Fluid · token kit preview</h1>

  <h2>Ground and surfaces</h2>
  <div class="pv-grid">
    <div class="pv-swatch"><div style="background:var(--upos-surface)"></div><div>--upos-surface</div></div>
    <div class="pv-swatch"><div style="background:var(--upos-surface-inset)"></div><div>--upos-surface-inset</div></div>
    <div class="pv-swatch"><div style="background:var(--upos-panel-dark)"></div><div>--upos-panel-dark</div></div>
    <div class="pv-swatch"><div style="background:var(--upos-border)"></div><div>--upos-border</div></div>
  </div>

  <h2>Ink and blues</h2>
  <div class="pv-grid">
    <div class="pv-swatch"><div style="background:var(--upos-ink)"></div><div>--upos-ink</div></div>
    <div class="pv-swatch"><div style="background:var(--upos-ink-subtle)"></div><div>--upos-ink-subtle</div></div>
    <div class="pv-swatch"><div style="background:var(--upos-value-1)"></div><div>--upos-value-1</div></div>
    <div class="pv-swatch"><div style="background:var(--upos-value-2)"></div><div>--upos-value-2</div></div>
    <div class="pv-swatch"><div style="background:var(--upos-value-3)"></div><div>--upos-value-3</div></div>
    <div class="pv-swatch"><div style="background:var(--upos-value-4)"></div><div>--upos-value-4</div></div>
  </div>

  <h2>Status</h2>
  <div class="pv-grid">
    <div class="pv-swatch"><div style="background:var(--upos-status-new)"></div><div>--upos-status-new</div></div>
    <div class="pv-swatch"><div style="background:var(--upos-status-fired)"></div><div>--upos-status-fired</div></div>
    <div class="pv-swatch"><div style="background:var(--upos-status-late)"></div><div>--upos-status-late</div></div>
    <div class="pv-swatch"><div style="background:var(--upos-status-ready)"></div><div>--upos-status-ready</div></div>
    <div class="pv-swatch"><div style="background:var(--upos-allergen-bg)"></div><div>--upos-allergen-bg</div></div>
  </div>

  <h2>Type roles</h2>
  <div style="font:var(--upos-type-display)">Display 800 · $4,820</div>
  <div style="font:var(--upos-type-heading)">Heading 800 · Riverside Grill · Today</div>
  <div style="font:var(--upos-type-row)">Row title 700 · Classic Cheeseburger</div>
  <div style="font:var(--upos-type-body);color:var(--upos-ink-subtle)">Body 400 · Tap the menu to build the order.</div>
  <div style="font:var(--upos-type-label);letter-spacing:.15em;color:var(--upos-ink-subtle)">LABEL · NET SALES</div>

  <h2>Elevation and motion</h2>
  <div class="pv-grid">
    <div style="width:180px;height:90px;border-radius:var(--upos-radius-card);background:var(--upos-surface);box-shadow:var(--upos-shadow-card)"></div>
    <div style="width:180px;height:90px;border-radius:var(--upos-radius-panel);background:var(--upos-surface);box-shadow:var(--upos-shadow-modal)"></div>
    <div style="width:180px;height:90px;border-radius:var(--upos-radius-card);background:var(--upos-grad-primary);box-shadow:var(--upos-shadow-button);animation:fl-rise .6s var(--upos-ease)"></div>
  </div>

  <h2 id="pv-components">Component recipes (Task 3)</h2>
  <section id="pv-components-body"><!-- Task 3 fills this in --></section>

  <h2>KDS scope</h2>
  <div class="upos-kds" style="padding:24px;border-radius:8px;background:var(--upos-kds-board)">
    <span style="color:var(--upos-kds-ink);font:800 15px/1 Archivo,system-ui,sans-serif;letter-spacing:.14em">GRILL STATION</span>
    <span style="color:var(--upos-kds-status-late);font:800 15px/1 ui-monospace,Menlo,monospace"> 12:41</span>
  </div>
</main>
</body>
</html>
```

- [ ] **Step 2: Open preview to verify it fails**

Open `docs/design/tokens/preview.html` in a browser (`file://` is fine). Expected: unstyled serif text, empty/transparent swatches — tokens are not defined yet.

- [ ] **Step 3: Write `upos-tokens.css`**

Structure (complete the values by transcribing from the vendored `tokens/*.css` — colors.css, typography.css, spacing.css, shape.css, elevation.css, motion.css — renaming to `--upos-*`; exact hex values for status/accents/allergen are in Global Constraints and must match):

```css
/* UPOS Fusion Fluid — design tokens. Source of truth:
   docs/design/reference/_ds/secondbrain-design-system-*/tokens/*.css
   Renamed --sb-* → --upos-* per handbook Part I. */
@import url('https://fonts.googleapis.com/css2?family=Archivo:wght@400;700;800&display=swap');

:root {
  /* Ground */
  --upos-ground: radial-gradient(1100px 700px at 88% -8%, #dbe7f2 0%, rgba(219,231,242,0) 62%),
                 radial-gradient(900px 600px at -6% 12%, #e7eef0 0%, rgba(231,238,240,0) 60%),
                 #eef1f5;
  /* Surfaces */
  --upos-surface: #ffffff;
  --upos-surface-inset: #f4f7fa;
  --upos-surface-hover: #f2f6fa;
  --upos-border: #e3e7ec;
  --upos-panel-dark: #20262e;
  --upos-grad-dark: linear-gradient(168deg,#20262e,#171c22);
  /* Ink */
  --upos-ink: #1b1f24;
  --upos-ink-subtle: #8b95a1;
  /* Blue rotation */
  --upos-value-1: #22496a;
  --upos-value-2: #33648b;
  --upos-value-3: #4d84b8;
  --upos-value-4: #2f7d8f;
  --upos-on-dark-accent: #8fc9ff;
  /* Accent (default slate; overridden by [data-accent]) */
  --upos-accent: #33648b;
  --upos-accent-deep: #22496a;
  --upos-grad-primary: linear-gradient(135deg,var(--upos-accent),var(--upos-accent-deep));
  --upos-grad-bar: linear-gradient(90deg,#6fa3cf,#2a5578);
  /* Status */
  --upos-status-new: #33648b;
  --upos-status-fired: #f97316;   --upos-status-fired-text: #d95f06;
  --upos-status-late: #ec3013;    --upos-status-late-text: #ae1800;
  --upos-status-ready: #22c55e;   --upos-status-ready-text: #159548;
  --upos-allergen-bg: rgba(139,92,246,.16);
  --upos-allergen-text: #7c3aed;
  /* Type roles (font shorthand: weight size/line-height family) */
  --upos-type-display: 800 28px/1.1 Archivo,system-ui,sans-serif;
  --upos-type-heading: 800 18px/1.25 Archivo,system-ui,sans-serif;
  --upos-type-row: 700 13px/1.35 Archivo,system-ui,sans-serif;
  --upos-type-body: 400 13px/1.5 Archivo,system-ui,sans-serif;
  --upos-type-label: 700 10px/1 Archivo,system-ui,sans-serif; /* pair with letter-spacing .1–.2em, uppercase */
  --upos-type-mono: 800 13px/1 ui-monospace,Menlo,monospace;
  /* Shape */
  --upos-radius-panel: 26px;
  --upos-radius-card: 18px;
  --upos-radius-inset: 14px;
  --upos-radius-pill: 999px;
  /* Elevation */
  --upos-shadow-card: 0 22px 54px -36px rgba(27,31,36,.5);
  --upos-shadow-modal: 0 40px 90px -40px rgba(20,25,31,.9);
  --upos-shadow-button: 0 12px 24px -14px rgba(34,73,106,.95);
  --upos-scrim: rgba(20,25,31,.5);
  --upos-blur-glass: 14px;
  --upos-blur-scrim: 6px;
  /* Motion */
  --upos-ease: cubic-bezier(.22,1,.36,1);
  --upos-dur-fast: .25s;
  --upos-dur-slow: .45s;
  /* Touch targets */
  --upos-touch-terminal: 48px;
  --upos-touch-kiosk: 60px;
  /* KDS derived scope */
  --upos-kds-board: var(--upos-grad-dark);
  --upos-kds-inset: rgba(238,241,245,.06);
  --upos-kds-inset-hover: rgba(238,241,245,.12);
  --upos-kds-ink: #f4f7fa;
  --upos-kds-status-new: #8fc9ff;
  --upos-kds-status-late: #ff8a70;
  --upos-kds-status-ready: #9ee6b4;
}

[data-accent="teal"]   { --upos-accent:#2f7d8f; --upos-accent-deep:#1c4a54; }
[data-accent="indigo"] { --upos-accent:#4a5a94; --upos-accent-deep:#2b3560; }
[data-accent="sky"]    { --upos-accent:#4d84b8; --upos-accent-deep:#2a5578; }

[data-theme="dark"] {
  --upos-ground: #14181d;
  --upos-surface: #1c2229;
  --upos-surface-inset: #171c22;
  --upos-surface-hover: #20262e;
  --upos-border: #2a323b;
  --upos-ink: #eef1f5;
  --upos-ink-subtle: #8b95a1;
}

body {
  margin: 0;
  background: var(--upos-ground);
  color: var(--upos-ink);
  font: var(--upos-type-body);
  transition: background var(--upos-dur-fast) var(--upos-ease);
}

@keyframes fl-rise   { from { opacity:0; transform:translateY(14px); } to { opacity:1; transform:none; } }
@keyframes fl-pulse  { 0%,100% { opacity:1; } 50% { opacity:.35; } }
@keyframes fl-grow   { from { transform:scaleX(0); transform-origin:left; } to { transform:scaleX(1); transform-origin:left; } }
@keyframes fl-sheen  { from { transform:translateX(-120%); } to { transform:translateX(220%); } }
@keyframes fl-drift  { 0%,100% { transform:translate(0,0); } 50% { transform:translate(30px,-20px); } }
@keyframes fl-marquee{ from { transform:translateX(0); } to { transform:translateX(-50%); } }
```

Transcribe any spacing-step and mobile-radius values present in the vendored `spacing.css`/`shape.css` as additional `--upos-space-*` / `--upos-radius-*-mobile` properties; verify keyframe timing/details against the vendored `motion.css` and correct where the source differs.

- [ ] **Step 4: Open preview to verify tokens render**

Reload `preview.html`. Expected: two-lamp grey ground, Archivo type, all swatches filled (status row shows blue/orange/red/green + violet), three elevation cards with soft shadows, gradient card animates in, KDS strip dark with light ink. Theme button flips to dark (ground/surfaces/ink change, status hues unchanged); accent select changes the gradient card.

- [ ] **Step 5: Grep-check required names**

```powershell
Select-String -Path "docs/design/tokens/upos-tokens.css" -Pattern "--upos-status-late|--upos-allergen-bg|--upos-grad-primary|data-theme=.dark.|data-accent=.sky.|fl-rise|fl-marquee|--upos-kds-board" | Measure-Object
```

Expected: Count ≥ 8.

- [ ] **Step 6: Commit**

```powershell
git add docs/design/tokens; git commit -m "feat: add UPOS Fusion Fluid token kit and preview page"
```

---

### Task 3: Component recipes — `upos-components.css`

**Files:**
- Create: `docs/design/tokens/upos-components.css`
- Modify: `docs/design/tokens/preview.html` (fill `#pv-components-body`)

**Interfaces:**
- Consumes: all `--upos-*` tokens from Task 2 (exact names above).
- Produces: component classes used by Task 9's inventory: `.u-btn`, `.u-btn--primary`, `.u-btn--secondary`, `.u-btn--ghost`, `.u-icon-btn`, `.u-pill`, `.u-chip-status`, `.u-chip-status--new|--fired|--late|--ready`, `.u-chip-allergen`, `.u-segmented`, `.u-segmented__opt`, `.u-stat-card`, `.u-data-row`, `.u-modal`, `.u-scrim`, `.u-drawer`, `.u-toast`, `.u-nav-item`, `.u-nav-bottom`, `.u-tender-tile`, `.u-tip-btn`, `.u-chit`, `.u-chit__timer`, `.u-badge-channel`, `.u-pill-offline`, `.u-qty-stepper`.

- [ ] **Step 1: Extend preview.html to exercise every class (the failing check)**

Replace `<section id="pv-components-body"><!-- Task 3 fills this in --></section>` with markup exercising each produced class at least once — buttons row (primary/secondary/ghost/icon), status chips (all four), allergen chip, segmented control, stat card, data row with status border, tip buttons, tender tile, qty stepper, offline pill, channel badges, a chit (inside `.upos-kds` wrapper) with timer states, a modal + scrim block (rendered statically inside a positioned container), drawer, toast, bottom-nav strip with one active item. Reload: everything renders as unstyled text — classes undefined.

- [ ] **Step 2: Write `upos-components.css`**

Recipes must follow the vendored readme's rules — key excerpts to honor: buttons lift `translateY(-2px)` on hover and deepen shadow; cards `-4px`, rows `-3px`; nav/list items `translateX(3px)`; no borders-as-elevation except `.u-data-row` (white fill + 1px status-colored border, no shadow at rest); scrim uses `--upos-scrim` + `backdrop-filter: blur(var(--upos-blur-scrim))`; segmented control track is translucent white on a pill. Representative recipes (write all of them in this style):

```css
.u-btn { display:inline-flex; align-items:center; justify-content:center; gap:8px;
  min-height:var(--upos-touch-terminal); padding:0 20px; border:none; cursor:pointer;
  border-radius:var(--upos-radius-inset); font:700 13px/1 Archivo,system-ui,sans-serif;
  transition:transform var(--upos-dur-fast) var(--upos-ease), box-shadow var(--upos-dur-fast) var(--upos-ease); }
.u-btn--primary { background:var(--upos-grad-primary); color:#fff; box-shadow:var(--upos-shadow-button); font-weight:800; }
.u-btn--secondary { background:var(--upos-surface); color:var(--upos-ink); border:1px solid var(--upos-border); }
.u-btn--ghost { background:transparent; color:var(--upos-ink-subtle); }
.u-btn:hover { transform:translateY(-2px); }

.u-chip-status { display:inline-flex; align-items:center; gap:6px; padding:5px 12px;
  border-radius:var(--upos-radius-pill); color:#fff;
  font:700 10.5px/1 Archivo,system-ui,sans-serif; letter-spacing:.03em; text-transform:uppercase; }
.u-chip-status--new   { background:var(--upos-status-new); }
.u-chip-status--fired { background:var(--upos-status-fired); }
.u-chip-status--late  { background:var(--upos-status-late); }
.u-chip-status--ready { background:var(--upos-status-ready); }

.u-data-row { display:flex; align-items:center; gap:14px; padding:12px 16px;
  border-radius:var(--upos-radius-inset); background:var(--upos-surface);
  border:1px solid var(--upos-border);
  transition:transform var(--upos-dur-fast) var(--upos-ease); }
.u-data-row:hover { transform:translateY(-3px); box-shadow:var(--upos-shadow-card); }

.u-chit { width:280px; border-radius:10px; background:var(--upos-kds-inset);
  color:var(--upos-kds-ink); display:flex; flex-direction:column; overflow:hidden; }
.u-chit__timer { font:var(--upos-type-mono); }
.u-chit__timer--late { color:var(--upos-kds-status-late); }

.u-pill-offline { display:inline-flex; align-items:center; gap:6px; padding:6px 12px;
  border-radius:var(--upos-radius-pill); background:var(--upos-status-late); color:#fff;
  font:800 11px/1 Archivo,system-ui,sans-serif; letter-spacing:.05em; }
```

- [ ] **Step 3: Verify in browser, light and dark, all four accents**

Reload preview. Expected: every block styled; hover lifts on buttons/rows; dark theme keeps chips legible; accent switch recolors primary button, active nav item, tender tile highlight. Nothing renders with square corners outside the `.upos-kds` block.

- [ ] **Step 4: Grep-check class coverage**

```powershell
$classes = ".u-btn--primary",".u-chip-status--late",".u-chip-allergen",".u-segmented",".u-stat-card",".u-data-row",".u-modal",".u-drawer",".u-toast",".u-nav-bottom",".u-tender-tile",".u-tip-btn",".u-chit",".u-badge-channel",".u-pill-offline",".u-qty-stepper"
$css = Get-Content "docs/design/tokens/upos-components.css" -Raw
$classes | Where-Object { $css -notmatch [regex]::Escape($_) }
```

Expected: no output (every class defined).

- [ ] **Step 5: Commit**

```powershell
git add docs/design/tokens; git commit -m "feat: add component recipe stylesheet and preview coverage"
```

---

### Task 4: Handbook scaffold + Part I (design language)

**Files:**
- Create: `docs/design/UPOS-DESIGN-HANDBOOK.md`

**Interfaces:**
- Consumes: vendored `_ds/secondbrain-design-system-*/readme.md` (language rules), Task 2/3 token and class names.
- Produces: the handbook file with Parts II–IV as headed placeholders-with-templates (see Step 1 — the *template* is real content; tasks 5–9 replace section stubs); the **screen-spec template** used verbatim by Tasks 5–8.

- [ ] **Step 1: Write the scaffold**

Top matter + table of contents + this exact screen-spec template (Tasks 5–8 must copy it per screen):

```markdown
#### [Screen name]

**Purpose.** [One sentence.]

**Layout.** [Regions with px dimensions from the artboard.]

**States.** [Enumerated UI states and what triggers each.]

**Interactions.** [Tap/keyboard flows, modals/drawers opened, animations used (named fl-* only).]

**Data.** [Bindings: models/DTOs/API endpoints/SignalR events from the POC. Derived values called out.]

**Gaps.** [GAP-NN citations with one line each, or "None".]
```

Part II–IV section stubs each carry a one-line "Written in Task N" marker so a partial handbook is honest about what's pending.

- [ ] **Step 2: Write Part I — the design language**

Sections, each grounded in the vendored readme and pointing at token names (not hex) wherever a token exists:

1. **What this is** — UPOS Fusion Fluid = SecondBrain Fluid adopted for POS; artboards are the visual source of truth; this handbook + token kit are the implementation source of truth.
2. **Ground and surfaces** — two-lamp ground (`--upos-ground`), floating panels, no white pages, no page-width container.
3. **Color** — ink scale, blue rotation (`--upos-value-1…4`, never one blue for a column), the three permitted gradient uses, dark panels.
4. **Status semantics** — the four-color system mapped to `OrderStatus` (table: Pending/Confirmed→new-blue, Preparing→fired-orange, Ready/Served→ready-green, late = derived client-side from `CreatedAt` + SLA threshold, 86'd/void→red). Red is never decorative.
5. **Allergen color** — violet chips, reserved exclusively.
6. **Type** — Archivo roles (`--upos-type-*`), tracking rules, monospace scope, 10px floor.
7. **Shape, elevation, blur** — radius scale, shadow trio, scrim/glass budget.
8. **Motion** — one easing, durations, six keyframes with their jobs; hover lift/slide table; Android press = ripple tint, no transform (applies to the MAUI terminal).
9. **Iconography** — inline 24×24 stroke SVG (Feather/Lucide model), `currentColor`, no icon fonts, no emoji; Lucide is the sanctioned source for missing glyphs.
10. **Copy voice** — the rules from Global Constraints, with three POS-flavored example rewrites (e.g. "Payment failed!" → "Card declined · try another tender").
11. **POS extensions** — offline pattern (top-bar `.u-pill-offline`, per-action "will sync on reconnect", never a blocking modal), touch targets, theming contract (`data-theme`/`data-accent`), KDS derivation (what KDS keeps from the secondary artboard — monospace numerals, station tabs, bump affordances, chit density — and what it drops — bone ground, `#ec3013`-as-accent, square corners).
12. **Using the kit in Blazor/MAUI** — link both CSS files, set attributes on `<html>`, naming conventions (`--upos-*`, `.u-*`, Razor components `Upos*`/domain names per Part III); **Bootstrap replacement recommendation** with rationale and migration note (delete bootstrap.min.css links from `Restaurant.Blazor/wwwroot` and `Restaurant.Mobile/wwwroot`, template pages Counter/Weather/SurveyPrompt are deletable).

- [ ] **Step 3: Verify Part I stands alone**

Check against the acceptance bar: pick two elements NOT yet specced (e.g. a manager-approval dialog, an order-ready notification toast) and confirm Part I + tokens answer: which surface color, which radius, which type role, which status color, which motion. If either check fails, the missing rule goes into Part I now.

- [ ] **Step 4: Commit**

```powershell
git add docs/design/UPOS-DESIGN-HANDBOOK.md; git commit -m "docs: handbook scaffold and Part I design language"
```

---

### Task 5: Part II-A — Terminal screen specs

**Files:**
- Modify: `docs/design/UPOS-DESIGN-HANDBOOK.md` (Part II-A section)

**Interfaces:**
- Consumes: screen-spec template (Task 4), primary artboard (vendored; line ranges in Global Constraints), POC models/DTOs/hub (summarized in the spec's Context), gap IDs GAP-01…GAP-13.
- Produces: eight screen specs titled exactly: Order entry · Modifier modal · Item info modal · Floor plan · Table drawer · Payment · Channels queue · Offline behavior.

- [ ] **Step 1: Write the eight specs using the template**

Non-negotiable content per screen (verify each against the artboard, don't trust memory):

1. **Order entry** — shell: 76px top bar (venue · terminal id · offline pill slot · server · clock), 78px bottom nav (ORDER/TABLES/PAYMENTS/CHANNELS/MORE); 170px category rail; item grid `repeat(auto-fill,minmax(190px,1fr))` with 86'd state (strikethrough + red `86'D` pill + reduced opacity, still tappable=no) and allergen chips; 380px cart panel — line rows (qty × name, mods line, allergen chips, per-line sent-to-kitchen toggle button, − qty +, line total), subtotal/tax/total, send-to-kitchen secondary button, `Charge $NN.NN` primary. Data: `MenuItemDto` list by `Category`; cart is client state; send → `CreateOrderDto` → POST /api/orders → `ReceiveNewOrder`. Gaps: GAP-01, GAP-02, GAP-04, GAP-05.
2. **Modifier modal** — 480px, max-height 820, scrim; required group (single-select pills), optional add-ons (multi-select, upcharge labels `Bacon +$1.50`), combo toggle (switch + side/drink picker sections, `+$3.50`), drink size group with price deltas; qty stepper + full-width primary `Add N · $NN.NN`. Gaps: GAP-01, GAP-02.
3. **Item info modal** — ingredients inset list, allergen chips, plating photo (circle image slot) / stack view tab toggle. Data: none today. Gaps: GAP-05, GAP-06.
4. **Floor plan** — header strip (room name · seated count); absolutely positioned tables 104px tall, width 150/230px, radius 20px (square tables) or 999px (rounds), 2px status-colored border, label + status line (`ORDERED · 6m`) + guest count; status legend. Open table → guest-count dialog (stepper, `Start order`); occupied → table drawer. Data: `Table` + open `Order` per table; elapsed from `Order.CreatedAt`. Gaps: GAP-03, GAP-07.
5. **Table drawer** — 420px right drawer over scrim; header (table id, guests, server); `Add to order` primary; course sections — Course 1 `FIRED` orange chip + refire ghost button; Course 2 hold state: `NOW / +5M / +10M` segmented + `Fire course` primary; item rows with prices; footer total + `Split & go to payment`. Gaps: GAP-03, GAP-09 (refire/void approval).
6. **Payment** — left: tender grid 2×2 (CREDIT/DEBIT primary-styled, CASH, GIFT CARD, SPLIT CHECK dashed); guest-mirror icon button; right rail 400px: tip presets (18/20/25/none with computed dollar labels), totals, `CONFIRM PAYMENT` 60px primary. Split modal: EVENLY (guest stepper + per-guest amount) / BY SEAT (per-seat rows). Guest mirror: 520px right sheet, total in gradient-clipped text, tip buttons ≥60px. Confirmation: check circle, `Order #NNN confirmed`, email/print receipt secondaries, `Start new order` primary. Data: none today — the entire tender/tip/split model is GAP-08; order number from `Order.OrderNumber`.
7. **Channels queue** — header (`Order queue · every channel, one line` · open count); rows: 34px channel badge, `channel · id`, items summary, price, status pill. Data: `OrderDto` list + `ReceiveOrderStatusUpdate`; channel field is GAP-04.
8. **Offline behavior** — not a screen, a cross-cutting spec: top-bar pill `OFFLINE · N QUEUED`, card tender annotation "will sync on reconnect", queue drains via replay on reconnect; UI must never block on connectivity. Data: local SQLite queue (planned, POC step 7); idempotency GAP-10.

- [ ] **Step 2: Verify coverage against the artboard**

Skim the primary artboard's terminal region (lines ~68–505) top to bottom; every `onClick`/`sc-if` interactive element must appear in one of the eight specs (the `{{ }}` bindings are the checklist). Add anything missed.

- [ ] **Step 3: Commit**

```powershell
git add docs/design/UPOS-DESIGN-HANDBOOK.md; git commit -m "docs: Part II-A terminal screen specs"
```

---

### Task 6: Part II-B — Back-office screen specs

**Files:**
- Modify: `docs/design/UPOS-DESIGN-HANDBOOK.md` (Part II-B section)

**Interfaces:**
- Consumes: template (Task 4), primary artboard back-office region (lines ~507–784), gap IDs.
- Produces: five specs titled exactly: Dashboard · Menu manager · Integrations · Reports · Employees, Devices, Settings (roadmap).

- [ ] **Step 1: Write the five specs**

Non-negotiable content:

1. **Dashboard** — 224px dark sidebar (logo block, 7 nav items with icons); AI insight banner (gradient card, kicker `ASK THE BRAIN`, quoted one-sentence insight, dismissible/toggleable — AI copy is always quoted-as-draft per Part I voice rules); 4 stat cards (NET SALES / LABOR % / COVERS / AVG TICKET, each value + comparison line in status color); sales-by-daypart bar chart (`--upos-grad-bar`, `fl-grow` on mount); top items list; exception row (`3 comps flagged for review →`, red text). Data: aggregations over `Order`/`OrderItem` (endpoint needed — note as API work, not a schema gap); labor GAP-09.
2. **Menu manager** — 3 panes: 200px major categories; 400px item list (header count + `+ ADD ITEM`, minor-category filter chips, inline add form name+price, rows with price + availability badge toggling 86 state); detail pane: name/price header, `VIEW PLATING` button, recipe ingredients with costs, COGS $/% /margin cards (over-target % in red text), prep steps, allergen toggle pills, modifier groups (list + `+ ADD GROUP` inline form: name, REQUIRED/OPTIONAL/NO-REMOVE segmented, comma-separated options). Plate-view modal: PLATING (photo) / STACK (reorderable layer list + palette + reset). Data: `MenuItem` covers name/price/category/availability/image; everything else GAP-01, GAP-05, GAP-06.
3. **Integrations** — toggle rows (Uber Eats, DoorDash, SkipTheDish, Online Ordering): icon tile, name, one-line description, switch; page intro states the one-pipeline rule ("Every connected channel injects into the same order pipeline as counter and kiosk — one queue, one kitchen routing."). Gaps: GAP-04; integration config storage noted as API work.
4. **Reports** — Low stock (status-dot rows + level bars + qty), COGS by category vs target (labeled progress bars, over-target red), Labor by role (hours · cost rows + Labor % footer vs target). Gaps: GAP-06, GAP-09, GAP-11.
5. **Employees, Devices, Settings (roadmap)** — one page each is out of scope for the artboards; spec the pattern to reuse: list+detail with `.u-data-row`, Fluid empty-state copy (statement sentence, no apology), and cite which Fluid source screens to crib (My Accounts table density; Settings sync rows). Gaps: GAP-09 (employees), device registry noted as API work.

- [ ] **Step 2: Verify coverage against artboard lines ~507–784** (same `{{ }}`-bindings sweep as Task 5)

- [ ] **Step 3: Commit**

```powershell
git add docs/design/UPOS-DESIGN-HANDBOOK.md; git commit -m "docs: Part II-B back-office screen specs"
```

---

### Task 7: Part II-C — KDS spec (restyled into Fluid)

**Files:**
- Modify: `docs/design/UPOS-DESIGN-HANDBOOK.md` (Part II-C section)

**Interfaces:**
- Consumes: template; `Kitchen Display and Kiosk.dc.html` station board `#1a` (content only — style is superseded per Part I §11); `.upos-kds` tokens; `OrdersHub` events; gap IDs.
- Produces: specs titled exactly: Station board · Chit anatomy · Chit actions · KDS data contract.

- [ ] **Step 1: Write the four specs**

1. **Station board** — target hardware 1280×800–1920×800 touchscreen; 60px header (station identity block, station tabs as filters — ALL/GRILL/FRY/ASSEMBLY/EXPO pattern, clock, load count); chit rail/grid below, newest right or left (pick one: left-to-right by age, oldest leftmost — matches bump-bar muscle memory); board surface `--upos-kds-board`, chit surface `--upos-kds-inset`. Radius exception: chits 8–10px (denser than terminal cards, still not square).
2. **Chit anatomy** — from the artboard's data model (order, ch, name, bag, rush, allergy, age, items): header row (monospace order number `#B-118`, `.u-badge-channel` KIOSK/COUNTER/ONLINE/DELIVERY, customer name), `.u-chit__timer` elapsed mm:ss with thresholds — 0–5m default ink, 5–10m `--upos-status-fired`, >10m `--upos-kds-status-late` + `fl-pulse` (thresholds configurable per station; state derived, never stored); rush flag row; allergy callout row (violet, always top of items); item lines with modifiers indented; bag/assembly grouping footer.
3. **Chit actions** — tap item = strike (made); tap header / bump zone = whole-chit bump to next status; recall lane for last 3 bumped; plate-view (long-press or PLATE VIEW arm + tap → plating photo modal from menu data); all-day aggregation panel note (count by item across visible chits).
4. **KDS data contract** — status flow mapped to `OrderStatus`: board shows Confirmed→Preparing→Ready; bump = PUT status + `NotifyOrderStatusChanged`; listens to `ReceiveNewOrder`/`ReceiveOrderStatusUpdate`; timers client-side from `CreatedAt`. Gaps: GAP-04 (channel badge), station routing = GAP-01-adjacent routing note (record under GAP-04 entry, kitchen routing needs item→station mapping — actually cite GAP-06 for recipe/station linkage and say so explicitly in the entry).

- [ ] **Step 2: Verify no modernist styling leaked** — grep your new section for `#ec3013` used as accent, "bone", or square-corner language; the only hex values allowed in Part II-C are inside token names.

- [ ] **Step 3: Commit**

```powershell
git add docs/design/UPOS-DESIGN-HANDBOOK.md; git commit -m "docs: Part II-C KDS spec in Fluid language"
```

---

### Task 8: Part II-D — Kiosk spec (restyled into Fluid)

**Files:**
- Modify: `docs/design/UPOS-DESIGN-HANDBOOK.md` (Part II-D section)

**Interfaces:**
- Consumes: template; kiosk flow content from `Kitchen Display and Kiosk.dc.html` (~lines 330–640); gap IDs.
- Produces: specs titled exactly: Kiosk flow · Guest-facing rules · Kiosk data contract.

- [ ] **Step 1: Write the three specs**

1. **Kiosk flow** — portrait guest device; screens: attract (full-bleed brand + `Tap to start`) → browse (category tabs, grid/list toggle, item cards with photo slots and prices in monospace) → item detail (modifier groups reusing the terminal modal spec's group logic at kiosk scale) → cart (persistent 96px `IN BAG · count · total` bar; cart page with combo auto-detect line `Combo savings −$N.NN` in accent-700 treatment) → pay (card-present instructions; `START OVER` ghost + `SUBMIT ORDER · $NN.NN` primary, both full-height ≥60px) → done (accent full-screen, `ORDER SENT TO THE KITCHEN` kicker, giant order number ~200px/.86 monospace-weighted, pickup note, `NEW ORDER` outline button; auto-reset timeout 30s).
2. **Guest-facing rules** — type scale ×1.4 over terminal (body ≥19px); targets ≥`--upos-touch-kiosk`; WCAG 2.2 AA contrast (call out: `--upos-ink-subtle` on white fails for body text at kiosk sizes — use `--upos-ink` for anything the guest must read); no staff jargon (86'd items simply absent, never labeled); dayparting hides unavailable menus; upsell = one combo prompt max, never interstitial; idle timeout wipes cart with a 10s countdown warning.
3. **Kiosk data contract** — same catalog and order pipeline as the terminal: `MenuItemDto` browse, `CreateOrderDto` submit, channel=kiosk (GAP-04), confirmation number = `OrderNumber`; payments GAP-08; combo detection GAP-02; loyalty identification at kiosk GAP-12.

- [ ] **Step 2: Verify flow completeness** — every kiosk screen state in the artboard (`isDone`, cart states, grid/list toggle) maps to a spec sentence; check the artboard's `sc-if` blocks in the kiosk region.

- [ ] **Step 3: Commit**

```powershell
git add docs/design/UPOS-DESIGN-HANDBOOK.md; git commit -m "docs: Part II-D kiosk spec in Fluid language"
```

---

### Task 9: Part III — Component inventory

**Files:**
- Modify: `docs/design/UPOS-DESIGN-HANDBOOK.md` (Part III section)

**Interfaces:**
- Consumes: Task 3 class names (exact list in Task 3's Produces), Parts II-A…D screen specs (consumer mapping).
- Produces: inventory table + per-component blocks for exactly: restyled `MenuItemCard`, `OrderCard`, `OrderStatusBadge`; new `UposButton`, `UposIconButton`, `StatusChip`, `AllergenChip`, `Pill`, `SegmentedControl`, `StatCard`, `DataRow`, `UposModal`, `UposDrawer`, `Toast`, `BottomNav`, `SideNav`, `FloorTable`, `CartLine`, `QtyStepper`, `TipPad`, `TenderTile`, `ChitCard`, `ChannelBadge`, `OfflinePill`.

- [ ] **Step 1: Write the inventory**

Format — summary table (Component · CSS classes · Screens that consume it · Status existing/new), then one block per component:

```markdown
#### StatusChip

**Classes:** `.u-chip-status`, modifier `--new|--fired|--late|--ready`
**Props:** `Status` (OrderStatus), `Label` (string, optional override), `ElapsedMinutes` (int?, drives late derivation)
**States:** the four status variants; pulses (`fl-pulse`) only when late.
**Consumed by:** Floor plan, Table drawer, Channels queue, Station board, Back-office dashboard exceptions.
**Notes:** late is computed by the consumer (threshold config), never passed as a stored status.
```

Every component block must name real props with types (C#/Razor parameter style), its Task 3 classes verbatim, and at least one consuming screen from Part II. Components with no Task 3 class (e.g. `FloorTable`, `CartLine` are composites) list the primitive classes they compose.

- [ ] **Step 2: Cross-check both directions**

(a) Every class in Task 3's Produces list appears in at least one component block — run the Task 3 Step 4 grep against the handbook file. (b) Every Part II screen's Layout section names only components that exist in Part III (or raw primitives). Fix mismatches now.

- [ ] **Step 3: Commit**

```powershell
git add docs/design/UPOS-DESIGN-HANDBOOK.md; git commit -m "docs: Part III component inventory"
```

---

### Task 10: `docs/GAPS.md` — gap register

**Files:**
- Create: `docs/GAPS.md`

**Interfaces:**
- Consumes: Global gap ID registry (this plan), Part II gap citations, spec Part IV entries, outline priorities (`docs/design/reference/outline-extracted.txt`).
- Produces: `docs/GAPS.md` with entries `GAP-01`…`GAP-13` under the exact IDs cited by Parts II-A…D.

- [ ] **Step 1: Write the register (project-gaps format: prioritized, records only, never fixes)**

Header states scope ("what the approved design renders that the current POC schema/API cannot express — recorded for the dev team; schema changes are their call"). Then one entry per gap:

```markdown
## GAP-01 · Modifier system — P0
**What's missing:** MenuItem has no modifier groups/options. The design renders required
groups (doneness), optional add-ons with upcharges, and no/remove options with min/max rules.
**Where it bites:** Terminal modifier modal · Menu manager groups CRUD · Kiosk item detail ·
KDS chit modifier lines.
**Minimal suggestion:** `ModifierGroup` (name, type required/optional/no-remove, min, max) →
`ModifierOption` (name, priceDelta, kitchenName, isDefault); `OrderItemModifier` join on
OrderItem. Replaces free-text `OrderItem.SpecialInstructions` for structured mods.
**Release:** R1 (outline: "Modifier system — P0").
```

All 13 entries follow that shape. Priorities and release mapping come from the outline (R1 pilot / R2 competitive / R3 expansion); GAP-11, GAP-12, GAP-13 are P1/R2 — say so.

- [ ] **Step 2: Verify citation integrity both ways**

```powershell
$hb = Get-Content "docs/design/UPOS-DESIGN-HANDBOOK.md" -Raw
$gp = Get-Content "docs/GAPS.md" -Raw
1..13 | ForEach-Object { $id = "GAP-{0:d2}" -f $_
  if ($gp -notmatch $id) { "MISSING IN GAPS.md: $id" }
  if ($hb -notmatch $id) { "NEVER CITED IN HANDBOOK: $id" } }
```

Expected: no output. (A gap never cited by any screen means either a screen spec is incomplete or the gap doesn't belong — resolve, don't delete silently.)

- [ ] **Step 3: Commit**

```powershell
git add docs/GAPS.md; git commit -m "docs: data-model gap register GAP-01..13"
```

---

### Task 11: `docs/PROJECT-OVERVIEW.md` + acceptance sweep

**Files:**
- Create: `docs/PROJECT-OVERVIEW.md`
- Modify (fixes only): any file failing the sweep

**Interfaces:**
- Consumes: everything produced by Tasks 1–10; spec acceptance criteria.
- Produces: the completed deliverable set; a clean acceptance checklist.

- [ ] **Step 1: Write PROJECT-OVERVIEW.md (project-overview format — senior-dev briefing, plain language)**

Sections: What UPOS is (2 sentences) · What exists today (POC repo state — 5 projects, what works, what's template; design assets in this repo) · What just shipped (handbook + token kit + gap register, dated) · What's next (dev team: token kit into Restaurant.Blazor/Mobile, then Release-1 screens; schema decisions from GAPS.md) · Health (green: design fully specified; amber: 10 of 13 gaps are P0 schema work; POC mobile offline sync unbuilt).

- [ ] **Step 2: Run the acceptance sweep (spec's acceptance criteria, one by one)**

1. Standalone-styling test: repeat Task 4 Step 3 with one fresh element (a void-approval dialog). Part I + tokens must answer every styling question.
2. Artboard coverage: spot-check 10 random `onClick` bindings across both artboards → each maps to one Part II spec.
3. Gap cross-refs: re-run Task 10 Step 2 script → silent.
4. Token kit standalone: reload `preview.html` from `file://` in light/dark × 4 accents → renders correctly, Archivo loads, no console errors.
5. Voice check: `Select-String -Path "docs/design/UPOS-DESIGN-HANDBOOK.md" -Pattern "!(?![=\[])" -AllMatches` — no exclamation marks in prose (allow `!=`, `![` image syntax if any); skim headings for statement style.

Fix any failure inline before committing.

- [ ] **Step 3: Commit**

```powershell
git add docs; git commit -m "docs: project overview and acceptance sweep fixes"
```

---

### Task 12: Publish the handbook artifact (orchestrator-only)

**Files:**
- Create: scratchpad HTML rendering of the handbook (not committed)

**Interfaces:**
- Consumes: `docs/design/UPOS-DESIGN-HANDBOOK.md`, `docs/GAPS.md`, token kit (for authentic styling of the page itself).
- Produces: a private artifact URL Horatio can share with the dev team.

This task runs in the main session (the Artifact tool is session-bound — do not delegate to a subagent). Load the `artifact-design` skill first, author the page styled with the UPOS tokens (the handbook rendered in its own design language), publish, and hand Horatio the URL.

- [ ] **Step 1: Load artifact-design skill, author HTML in scratchpad**
- [ ] **Step 2: Publish via Artifact tool (favicon stable across redeploys)**
- [ ] **Step 3: Report URL to Horatio**

---

## Self-review notes

- Spec coverage: Part I → Task 4; Part II → Tasks 5–8; Part III → Task 9; Part IV → Task 10; token kit → Tasks 2–3; PROJECT-OVERVIEW/GAPS standing rule → Tasks 10–11; artifact → Task 12; "sources of truth" durability → Task 1.
- Gap IDs are defined globally so Tasks 5–8 can cite them before Task 10 exists; Task 10 Step 2 enforces closure both ways.
- Type/name consistency: Task 3's Produces list is the single class registry; Tasks 2's token names are the single token registry; Task 9 cross-checks both.
