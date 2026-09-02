# Restaurant.Blazor · UPOS Fusion Fluid Implementation Plan

> **For agentic workers:** implement task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Apply the UPOS Fusion Fluid design to the back office — token kit, shell, shared components — and build the Menu manager as a working screen against real `MenuItem` data.

**Architecture:** The token kit and every shared component live in `Restaurant.UI.Shared` (a Razor Class Library), so `Restaurant.Blazor` consumes them at `_content/Restaurant.UI.Shared/...` and `Restaurant.Mobile` inherits them later for free. Bootstrap is removed. The Menu manager reads through a `MenuDataSource` that falls back to seed data when the API is unreachable, so the UI renders for design work without standing up PostgreSQL.

**Tech Stack:** .NET 10, Blazor Server (InteractiveServer render mode), plain CSS custom properties. No CSS framework, no JS framework.

**Working directory:** `C:\Users\h_ozs\UPOS\poc` — a local clone of github.com/tpaing00/POC-Razor-Hospitality, on branch `feat/upos-fusion-ui`, tracking `upstream/development`. Nothing is pushed.

## Global Constraints

- **The handbook is the specification.** `C:\Users\h_ozs\UPOS\docs\design\UPOS-DESIGN-HANDBOOK.md` — Part I is the language, Part II-B "Menu manager" is the screen spec, Part III is the component contract (props, states, consumers). Where this plan and the handbook disagree, the handbook wins; say so in your report.
- **Token kit is copied verbatim, never re-authored.** Source: `C:\Users\h_ozs\UPOS\docs\design\tokens\upos-tokens.css` and `upos-components.css`. If a value is wrong, fix it in the handbook repo and re-copy — do not edit the copy in place.
- Tokens are `--upos-*`; component classes are `.u-*`; Razor components take the `Upos*` prefix only where the bare name collides with a BCL or Blazor type (`UposButton`, `UposIconButton`, `UposModal`, `UposSwitch`); everything else is a plain domain noun (`StatusChip`, `DataRow`, `StatCard`).
- **Status semantics:** `Pending`/`Confirmed` → `--upos-status-new`; `Preparing` → `--upos-status-fired`; `Ready`/`Served`/`Completed` → `--upos-status-ready`; `Cancelled` → `--upos-status-late`. Late is derived from elapsed time, never stored.
- Archivo 400/700/800 only; `ui-monospace` for order numbers, table numbers and timers; nothing below 10px.
- Touch targets ≥48px on anything the terminal will reuse.
- Theming is `data-theme="dark"` and `data-accent="slate|teal|indigo|sky"` on `<html>`; a component that hard-codes a hex breaks the contract.
- **Copy voice:** declarative, second person, sentence case, verbs on buttons, no emoji, no exclamation marks.
- **Do not touch** `Restaurant.Mobile`, the KDS, the kiosk, or any schema/migration. Gapped features are rendered as explicitly-marked placeholders citing their `GAP-NN`, never faked as working.
- Every commit message ends with:
  `Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>`

**Verification model.** This is UI work, so the test cycle is: `dotnet build` must succeed with zero warnings introduced, then the page is loaded in a browser and checked against the handbook spec. Both halves are required — a task is not done because it compiles.

**Build and run:**
```bash
cd /c/Users/h_ozs/UPOS/poc && export PATH="/c/Program Files/dotnet:$PATH"
dotnet build src/Restaurant.Blazor/Restaurant.Blazor.csproj -v q --nologo
cd src/Restaurant.Blazor && ASPNETCORE_ENVIRONMENT=Development dotnet run --no-build   # serves http://localhost:5001
```

## Known state of the code (verified 2026-09-01)

- `Restaurant.Blazor` builds clean on .NET 10 and serves the stock Blazor template at `:5001`.
- `App.razor` links `bootstrap/bootstrap.min.css`, `app.css`, `Restaurant.Blazor.styles.css`; sets `theme-color #512bd4`; registers a service worker.
- `MainLayout.razor` / `NavMenu.razor` are the template shell with scoped `.razor.css` (96 and 105 lines).
- Pages: `Home.razor` (template welcome), `Menu.razor` (card grid, read-only), `Orders.razor`, plus template `Counter.razor` and `Weather.razor`.
- `MenuController` implements GET list, GET by id, POST, PUT, DELETE — but **the list filters `.Where(m => m.IsAvailable)`**, so an 86'd item disappears and cannot be restored from the back office.
- `RestaurantApiService` exposes only the two GETs for menu; no create, update or delete.
- `appsettings.json` sets `ApiBaseUrl` to `https://192.168.1.89:7000`; `Program.cs` defaults to `http://192.168.1.89:5000`. Both are unreachable here, and there is no local PostgreSQL.
- Seed data in `RestaurantDbContext`: 6 menu items across Main Course, Salad, Beverage; 4 tables.

## File structure

```
src/Restaurant.UI.Shared/
  wwwroot/css/upos-tokens.css          NEW  copied verbatim from the handbook kit
  wwwroot/css/upos-components.css      NEW  copied verbatim
  Components/Upos/UposButton.razor     NEW
  Components/Upos/UposIconButton.razor NEW
  Components/Upos/StatusChip.razor     NEW
  Components/Upos/AllergenChip.razor   NEW
  Components/Upos/Pill.razor           NEW
  Components/Upos/SegmentedControl.razor NEW
  Components/Upos/StatCard.razor       NEW
  Components/Upos/DataRow.razor        NEW
  Components/Upos/UposSwitch.razor     NEW
  MenuItemCard.razor                   EDIT restyle, drop the inline <style>
  OrderStatusBadge.razor               EDIT restyle onto StatusChip
  Services/RestaurantApiService.cs     EDIT add menu create/update/delete + include-unavailable
  Services/MenuDataSource.cs           NEW  API with seed fallback
  Services/SeedMenuData.cs             NEW  the 6 seeded items, for design-time rendering
  _Imports.razor                       EDIT expose Components.Upos

src/Restaurant.Blazor/
  Components/App.razor                 EDIT drop Bootstrap, link the kit, set theme attributes
  Components/Layout/MainLayout.razor       EDIT Fluid shell
  Components/Layout/MainLayout.razor.css   EDIT replace
  Components/Layout/NavMenu.razor          EDIT 224px dark rail
  Components/Layout/NavMenu.razor.css      EDIT replace
  Components/Pages/Home.razor          EDIT honest landing panel
  Components/Pages/MenuManager.razor   NEW  the three-pane screen at /menu
  Components/Pages/Menu.razor          DELETE superseded
  Components/Pages/Counter.razor       DELETE template leftover
  Components/Pages/Weather.razor       DELETE template leftover
  Components/Pages/Kit.razor           NEW  dev-only component showcase at /kit
  wwwroot/app.css                      EDIT trim to what the kit does not cover
  wwwroot/bootstrap/                   DELETE
  wwwroot/service-worker.js            EDIT drop the bootstrap cache entry
  appsettings.Development.json         NEW  local ApiBaseUrl

src/Restaurant.Api/
  Controllers/MenuController.cs        EDIT includeUnavailable on the list endpoint
```

---

### Task 1: Land the token kit and remove Bootstrap

**Files:** as listed under "Land the kit" below.

**Interfaces:**
- Produces: `_content/Restaurant.UI.Shared/css/upos-tokens.css` and `.../upos-components.css` as linkable static assets; `<html data-accent="slate">` on every page. Tasks 2–6 depend on both.

- [ ] **Step 1: Copy the kit into the RCL**

```bash
cd /c/Users/h_ozs/UPOS/poc
mkdir -p src/Restaurant.UI.Shared/wwwroot/css
cp /c/Users/h_ozs/UPOS/docs/design/tokens/upos-tokens.css src/Restaurant.UI.Shared/wwwroot/css/
cp /c/Users/h_ozs/UPOS/docs/design/tokens/upos-components.css src/Restaurant.UI.Shared/wwwroot/css/
```

- [ ] **Step 2: Rewrite `App.razor`'s head**

Replace the three stylesheet links with the kit, set the theme attributes on `<html>`, and correct the theme color to the design's dark panel. Keep `<base>`, the icon, the manifest, `HeadOutlet` and the service-worker script exactly as they are.

```razor
<html lang="en" data-accent="slate">

<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <base href="/" />
    <link rel="stylesheet" href="_content/Restaurant.UI.Shared/css/upos-tokens.css" />
    <link rel="stylesheet" href="_content/Restaurant.UI.Shared/css/upos-components.css" />
    <link rel="stylesheet" href="app.css" />
    <link rel="stylesheet" href="Restaurant.Blazor.styles.css" />
    <link rel="icon" type="image/png" href="icon-192.png" />

    <link rel="manifest" href="manifest.json" />
    <meta name="theme-color" content="#20262e" />
    <meta name="mobile-web-app-capable" content="yes" />
    <meta name="mobile-web-app-status-bar-style" content="black-translucent" />
    <meta name="mobile-web-app-title" content="Restaurant" />

    <HeadOutlet @rendermode="@InteractiveServer" />
</head>
```

- [ ] **Step 3: Delete Bootstrap and the template pages**

```bash
cd /c/Users/h_ozs/UPOS/poc/src/Restaurant.Blazor
rm -rf wwwroot/bootstrap
rm -f Components/Pages/Counter.razor Components/Pages/Weather.razor
grep -n "bootstrap" wwwroot/service-worker.js
```

Remove any `bootstrap` entry the grep finds from the service worker's cache list. If `Weather.razor` had a supporting data class under `Data/`, leave it — `Restaurant.Blazor` has none.

- [ ] **Step 4: Trim `app.css`**

`app.css` carries template styles that now fight the kit. Reduce it to only what the kit does not cover: the Blazor error UI (`#blazor-error-ui`), focus and validation styles, and a `:focus-visible` outline using `var(--upos-accent)`. Delete every rule that sets page background, typography, `.btn-*`, `.content`, `.top-row`, `.sidebar` or `.page` — those are the shell's job in Task 2. Do not leave commented-out blocks.

- [ ] **Step 5: Build and look**

```bash
cd /c/Users/h_ozs/UPOS/poc && export PATH="/c/Program Files/dotnet:$PATH"
dotnet build src/Restaurant.Blazor/Restaurant.Blazor.csproj -v q --nologo
```

Expected: `Build succeeded. 0 Warning(s) 0 Error(s)`.

Run the app and load `http://localhost:5001/`. Expected: the page now sits on the two-lamp grey ground, body text is Archivo, and no Bootstrap chrome remains. The layout will look unstyled and wrong — that is correct at this stage, because the shell has not been rebuilt yet. Confirm in the browser devtools that `getComputedStyle(document.documentElement).getPropertyValue('--upos-accent')` returns `#33648b`.

- [ ] **Step 6: Commit**

```bash
git add -A && git commit -m "feat: land the UPOS token kit and remove Bootstrap

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

### Task 2: Rebuild the shell

**Files:** `Components/Layout/MainLayout.razor` + `.razor.css`, `Components/Layout/NavMenu.razor` + `.razor.css`, `Components/Pages/Home.razor`.

**Interfaces:**
- Consumes: the kit from Task 1.
- Produces: the back-office shell every page renders inside — a 224px sticky dark rail plus a scrolling main column of floating panels. Tasks 5 and 6 render into it.

Read the handbook's Part II-B shell preamble before writing: the rail is 224px, `--upos-radius-panel`, `--upos-grad-dark`, `position: sticky; top: 14px`, `max-height: calc(100vh - 28px)`; nav items are the `.u-nav-item` recipe **restyled at the call site** — row-horizontal, `12px 14px` padding, 12px gap, label at 700/13px (not the kit's column-stacked 10px bottom-nav form), and the active destination fills with `--upos-grad-primary` and white ink. Icons are inline 24×24 stroke SVG at `stroke-width: 1.7` in the sidebar, `currentColor`, no icon font.

- [ ] **Step 1: `MainLayout.razor`**

```razor
@inherits LayoutComponentBase

<div class="page">
    <NavMenu />
    <main class="main">
        @Body
    </main>
</div>

<div id="blazor-error-ui">
    An unhandled error has occurred.
    <a href="" class="reload">Reload</a>
    <a class="dismiss">Dismiss</a>
</div>
```

Note the template's `🗙` glyph is replaced with the word `Dismiss` — §9 permits no emoji, and §10 wants a verb.

- [ ] **Step 2: `MainLayout.razor.css`**

Replace the file entirely. The shell is flex with `gap: 14px` and `padding: 14px`, `min-height: 100vh`, background `var(--upos-ground)`. `.main` is `flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 14px;`. Add a `.panel` class — `background: var(--upos-surface); border-radius: var(--upos-radius-panel); box-shadow: var(--upos-shadow-card); padding: 32px 36px;` — since every page uses it. Under 900px the shell stacks and the rail goes full-width. Do not style anything else.

- [ ] **Step 3: `NavMenu.razor`**

Six destinations, matching the handbook's back-office sidebar: Dashboard (`/`), Menu (`/menu`), Integrations, Reports, Devices, Settings. Only Dashboard and Menu route anywhere today — render the other four as disabled items carrying the roadmap treatment, with `aria-disabled="true"` and a title explaining they are not built yet. Use `NavLink` with `Match="NavLinkMatch.All"` on Dashboard. Include the brand block: a 34px `--upos-radius-inset` square filled with `--upos-grad-primary` carrying the monogram `UF`, then "UPOS Fusion" at 800/15px and the kicker "BACK OFFICE" at 8.5px/.2em in `#8fc9ff`.

Also render the theme toggle and the four accent swatches at the foot of the rail — this is the fastest way for a reviewer to see the theming contract working, and it exercises `data-theme`/`data-accent` end to end. Drive them with a small `@onclick` handler and JS interop that sets the attributes on `document.documentElement`.

- [ ] **Step 4: `NavMenu.razor.css`**

Replace entirely per the shell preamble above. Delete the template's `.navbar-toggler`, `.bi-*` glyph classes and media queries.

- [ ] **Step 5: `Home.razor` — an honest landing**

Replace the template welcome with a single `.panel` that states what this build is: a kicker, the heading "Riverside Grill · back office", one sentence of body copy, and a short list linking to the Menu manager and the component showcase. Do **not** build the Dashboard's KPI strip or daypart chart — those need aggregation endpoints that do not exist, and inventing numbers here would misrepresent the state. State that in one sentence on the page.

- [ ] **Step 6: Build, then verify in the browser**

Build must succeed. Then load `/` and check against the handbook: rail is 224px and dark with a rounded panel radius; content floats on the grey ground; the active nav item carries the accent gradient; hovering a nav item slides it 3px right; the theme toggle flips the whole shell and the accent swatches recolor the active item. Take a screenshot at 1440 wide.

- [ ] **Step 7: Commit**

```bash
git add -A && git commit -m "feat: rebuild the back-office shell in the Fluid language

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

### Task 3: Shared components

**Files:** the nine new files under `src/Restaurant.UI.Shared/Components/Upos/`, plus `MenuItemCard.razor`, `OrderStatusBadge.razor`, `_Imports.razor`, and a dev-only `Components/Pages/Kit.razor` in the Blazor app.

**Interfaces:**
- Consumes: the kit's `.u-*` classes.
- Produces: `UposButton`, `UposIconButton`, `StatusChip`, `AllergenChip`, `Pill`, `SegmentedControl`, `StatCard`, `DataRow`, `UposSwitch`, plus restyled `MenuItemCard` and `OrderStatusBadge`. Task 5 consumes all of them.

Build each to the props, states and notes in the handbook's Part III. Two rules that catch people:
- **No component hard-codes a hex.** Every color comes from a token.
- **Nothing takes a "late" boolean.** Anything that can show lateness takes the timestamp plus a threshold and derives it.

- [ ] **Step 1: Write the nine components**

Each is a thin wrapper over its recipe. `UposButton` takes `Variant` (`ButtonVariant`: `Primary`/`Secondary`/`Ghost`), `Type`, `Disabled`, `OnClick` (`EventCallback<MouseEventArgs>`), `ChildContent` (`RenderFragment`), and splats extra attributes with `@attributes`. `StatusChip` takes `Status` (`OrderStatus?`), `Tone` (`StatusTone` for non-order states such as an 86'd menu item), `Label`, `Elapsed`/`LateAfter` for derivation. `DataRow` takes `OnClick` (`EventCallback?` — null renders a non-interactive row) and `ChildContent`. `UposSwitch` takes `IsOn` (bool), `IsOnChanged` (`EventCallback<bool>`), `Label` for `aria-label`, and renders `role="switch"` with `aria-checked`. `SegmentedControl` takes `Options` (`IReadOnlyList<string>`), `Value`, `ValueChanged`, and passes a 48px minimum at terminal call sites. Give every interactive component a visible `:focus-visible` state.

Follow existing repo conventions: `@using Restaurant.Shared.Models` where needed, `[Parameter]` attributes, `@code` block at the bottom.

- [ ] **Step 2: Restyle the two existing components**

`OrderStatusBadge` becomes a one-parameter wrapper over `StatusChip` — keep its public `Status` parameter so existing call sites in `Orders.razor` keep compiling. `MenuItemCard` moves to the kit's card treatment, drops its inline `<style>` block entirely, and shows the 86'd state as a `StatusChip` with the late tone plus reduced opacity and a strikethrough name, per Part II-A's Order entry spec.

- [ ] **Step 3: Expose the namespace**

Add `@using Restaurant.UI.Shared.Components.Upos` to `src/Restaurant.UI.Shared/_Imports.razor` and to `src/Restaurant.Blazor/Components/_Imports.razor`.

- [ ] **Step 4: Build a showcase route to verify against**

Create `src/Restaurant.Blazor/Components/Pages/Kit.razor` at `@page "/kit"` rendering every component in every state — all button variants, all four status chips plus an 86'd tone, an allergen chip, a pill, a segmented control, a switch in both states, a stat card, and data rows including a late one. This is the Blazor equivalent of the kit's `preview.html` and the fastest way to catch a broken recipe. Mark it in a comment as a development aid.

- [ ] **Step 5: Build, then verify at `/kit`**

Build must succeed. Load `http://localhost:5001/kit` and compare against `C:\Users\h_ozs\UPOS\docs\design\tokens\preview.html` rendered side by side — the Blazor components must look identical to the raw recipes. Flip the theme and one accent and confirm both hold. Screenshot.

- [ ] **Step 6: Commit**

```bash
git add -A && git commit -m "feat: add the shared UPOS component library

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

### Task 4: Menu data — fix the API, complete the client, add a seed fallback

**Files:** `src/Restaurant.Api/Controllers/MenuController.cs`, `src/Restaurant.UI.Shared/Services/RestaurantApiService.cs`, `Services/MenuDataSource.cs`, `Services/SeedMenuData.cs`, `src/Restaurant.Blazor/Program.cs`, `appsettings.Development.json`.

**Interfaces:**
- Produces: `MenuDataSource` with `Task<List<MenuItemDto>> GetAllAsync()`, `Task<MenuItemDto?> CreateAsync(MenuItemDto)`, `Task UpdateAsync(MenuItemDto)`, `Task DeleteAsync(int)`, and a `bool IsLive` flag saying whether the data came from the API or the seed. Task 5 binds to this and to nothing else.

- [ ] **Step 1: Let the back office see 86'd items**

`MenuController.GetMenuItems()` currently filters `.Where(m => m.IsAvailable)`, so an item vanishes the moment it is 86'd and can never be restored from this screen. Add an optional query parameter and apply the filter only when it is false:

```csharp
[HttpGet]
public async Task<ActionResult<IEnumerable<MenuItemDto>>> GetMenuItems(
    [FromQuery] bool includeUnavailable = false)
{
    var query = _context.MenuItems.AsQueryable();

    if (!includeUnavailable)
        query = query.Where(m => m.IsAvailable);

    var items = await query
        .Select(m => new MenuItemDto
        {
            Id = m.Id,
            Name = m.Name,
            Description = m.Description,
            Price = m.Price,
            Category = m.Category,
            IsAvailable = m.IsAvailable,
            ImageUrl = m.ImageUrl
        })
        .ToListAsync();

    return Ok(items);
}
```

The default stays `false`, so the terminal and every existing caller behave exactly as before.

- [ ] **Step 2: Complete the API client**

Add to `RestaurantApiService`, matching the existing style (`GetFromJsonAsync`, `PostAsJsonAsync`, `EnsureSuccessStatusCode`):

```csharp
public async Task<List<MenuItemDto>> GetMenuItemsAsync(bool includeUnavailable)
{
    var url = includeUnavailable ? "api/menu?includeUnavailable=true" : "api/menu";
    return await _httpClient.GetFromJsonAsync<List<MenuItemDto>>(url) ?? new();
}

public async Task<MenuItemDto?> CreateMenuItemAsync(MenuItemDto item)
{
    var response = await _httpClient.PostAsJsonAsync("api/menu", item);
    response.EnsureSuccessStatusCode();
    return await response.Content.ReadFromJsonAsync<MenuItemDto>();
}

public async Task UpdateMenuItemAsync(MenuItemDto item)
{
    var response = await _httpClient.PutAsJsonAsync($"api/menu/{item.Id}", item);
    response.EnsureSuccessStatusCode();
}

public async Task DeleteMenuItemAsync(int id)
{
    var response = await _httpClient.DeleteAsync($"api/menu/{id}");
    response.EnsureSuccessStatusCode();
}
```

Leave the existing parameterless `GetMenuItemsAsync()` in place so nothing breaks.

- [ ] **Step 3: Seed data for design-time rendering**

`SeedMenuData.cs` returns the six items `RestaurantDbContext` seeds — Burger 12.99 and Pizza Margherita 14.99, Caesar Salad 8.99, Pasta Carbonara 13.99 (Main Course / Salad), Coca Cola 2.99 and Coffee 3.50 (Beverage) — as `MenuItemDto`s with ids 1-6, matching the seeded categories exactly. Mark one item unavailable so the 86'd state is visible without a database. Add a comment saying this exists so the UI renders without PostgreSQL and is not a substitute for the API.

- [ ] **Step 4: `MenuDataSource`**

Wraps `RestaurantApiService`. `GetAllAsync()` calls the API with `includeUnavailable: true`; on `HttpRequestException` or `TaskCanceledException` it logs a warning, sets `IsLive = false`, and returns the seed list. Writes attempt the API and, when it is unreachable, mutate the in-memory list so the screen still behaves correctly for design review — surface that through `IsLive` so the page can say so out loud rather than pretending. Register it in `Program.cs` as scoped, next to `RestaurantApiService`.

- [ ] **Step 5: Local configuration**

Add `src/Restaurant.Blazor/appsettings.Development.json` with `"ApiBaseUrl": "http://localhost:5000"` so a developer running the API locally is wired up without editing the committed LAN address. Note in your report that `appsettings.json` (`https://192.168.1.89:7000`) and `Program.cs` (`http://192.168.1.89:5000`) disagree with each other — leave both alone, since they are the team's environment, and say so.

- [ ] **Step 6: Build and verify both paths**

Build must succeed. With no API running, load `/menu` (still the old page at this point) or check via the showcase that `MenuDataSource.GetAllAsync()` returns six items and `IsLive` is false. Confirm no unhandled exception reaches the UI.

- [ ] **Step 7: Commit**

```bash
git add -A && git commit -m "feat: let the back office read 86'd items, and render without a database

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

### Task 5: The Menu manager

**Files:** `src/Restaurant.Blazor/Components/Pages/MenuManager.razor` (new, `@page "/menu"`), delete `Components/Pages/Menu.razor`.

**Interfaces:**
- Consumes: every component from Task 3 and `MenuDataSource` from Task 4.

Build to the handbook's Part II-B "Menu manager" spec. Three panes: a 200px category rail, a 400px item list, and a detail pane taking the rest.

**What the POC can actually support, and what it cannot.** `MenuItem` carries name, description, price, category, availability and image. That is enough for the category rail, the item list, the add-item form and the 86 toggle. It is **not** enough for the detail pane's recipe, COGS and margin block (GAP-06), its allergen toggles (GAP-05), or its modifier groups (GAP-01), and the design's minor-category filter chips have nothing to filter on because `Category` is a single flat string (GAP-01's sibling problem, recorded under GAP-13's scope discussion). Render those sections in place, in the correct layout position, as clearly-marked blocked panels naming the gap — do not fake them with invented data, and do not silently omit them. A reader must be able to see both what the screen becomes and what stands between here and there.

- [ ] **Step 1: Category rail**

Distinct `Category` values off the loaded items, each an item in the rail's own restyled nav treatment, plus an "All" entry at the top showing the total count. Selecting one filters the list pane. Include the `MAJOR CATEGORIES` kicker at 10px/.15em uppercase in `--upos-ink-subtle`.

- [ ] **Step 2: Item list pane**

Header strip carrying `{Category} · {n} items` at 800/14px and an `+ ADD ITEM` ghost action in `--upos-accent`. Below it the minor-category chip row, rendered disabled with a note citing the gap. Then the rows: each a `DataRow` with the item name, its price right-aligned, and a `UposSwitch` or availability chip toggling the 86 state. An 86'd row dims and strikes through the name. Selecting a row loads the detail pane. Empty state per §10 — a statement, not an apology.

- [ ] **Step 3: Add-item form**

Inline in the list pane, opened by `+ ADD ITEM`, per the artboard: a name field, a price field, a category field, then Cancel and Add. **The kit has no `.u-input` recipe** (recorded in §12) — write the inputs to §2's stated behavior: inset fill, hairline border, `--upos-radius-inset`, focus takes an `--upos-accent` border and a white fill. Put those rules in the page's scoped CSS, and note in your report that they are a candidate for promotion into the kit.

Validate before submitting: a blank name is rejected with a message, and a price that is not a number is rejected rather than silently coerced to zero. The POC's own `addNewItem` prototype does both silently — do not reproduce that.

- [ ] **Step 4: Detail pane**

For the selected item: name at 800/18px with its price in `--upos-accent` at 800/16px, the description, the category, the availability control, and the image if `ImageUrl` is set. Then the blocked sections in their designed positions — recipe and ingredient costs, the COGS/margin trio, prep steps, allergen toggles, modifier groups — each a panel stating plainly what it needs and citing its gap, styled quietly (`--upos-surface-inset`, `--upos-ink-subtle`), never as an error.

- [ ] **Step 5: Wire the writes**

The 86 toggle calls `UpdateAsync`; Add calls `CreateAsync`. Both refresh the list. When `MenuDataSource.IsLive` is false, show a single quiet line at the top of the page saying the screen is running on seed data because the API is unreachable, so nobody mistakes a design session for a working integration.

- [ ] **Step 6: Delete the superseded page**

```bash
rm src/Restaurant.Blazor/Components/Pages/Menu.razor
```

- [ ] **Step 7: Build, then verify against the spec**

Build must succeed. Load `/menu` and check every one of these: the three panes hold their widths; selecting a category filters; selecting a row loads the detail; the 86 toggle flips the row's treatment and persists across a refresh when the API is live; the add form validates and rejects a bad price; blocked sections are visibly blocked and name their gaps; the theme toggle and all four accents hold. Screenshot at 1440 wide in both themes.

- [ ] **Step 8: Commit**

```bash
git add -A && git commit -m "feat: build the Menu manager in the Fluid language

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

### Task 6: Hand-off pass

**Files:** `MIGRATION-NOTES.md` at the clone root; screenshots to the scratchpad.

- [ ] **Step 1: Capture before-and-after**

Screenshot `/`, `/menu` and `/kit` at 1440 wide in light and dark. Save them to the scratchpad directory and list the paths in your report so they can be shown to the project owner.

- [ ] **Step 2: Write `MIGRATION-NOTES.md`**

For the POC's maintainer, who did not follow this work. Cover: what changed and why (with the handbook path); that Bootstrap is gone and what replaced it; the `MenuController` filter fix and why the back office needed it; the new `RestaurantApiService` methods; that `MenuDataSource`'s seed fallback is a design-time affordance, not a caching layer; the `appsettings` mismatch left untouched; that `Restaurant.Mobile` is unchanged but inherits the component library; and the exact commands to build and run. Keep it under a page.

- [ ] **Step 3: Verify the whole branch**

```bash
cd /c/Users/h_ozs/UPOS/poc && export PATH="/c/Program Files/dotnet:$PATH"
dotnet build Restaurant.sln -v q --nologo
git log --oneline upstream/development..HEAD
git status --short
```

Expected: the whole solution builds (the API and Mobile projects must not have been broken), the log shows this task sequence, and the tree is clean. If `Restaurant.Mobile` fails for a reason unrelated to this work (missing MAUI workloads), say so explicitly rather than reporting a clean build.

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "docs: migration notes for the Fusion UI pass

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

## Self-review notes

- Scope is the agreed foundation plus the Menu manager. The Dashboard's KPI strip, Integrations, Reports and the terminal preview are deliberately out — Home says so on the page rather than implying they are coming.
- Task 4 fixes a real defect (the availability filter) rather than working around it, because the design cannot work otherwise and the fix is backward-compatible.
- Every gapped feature is rendered as a marked placeholder in its designed position. That is the honest way to answer "what effect would this have" without pretending the schema is further along than it is.
