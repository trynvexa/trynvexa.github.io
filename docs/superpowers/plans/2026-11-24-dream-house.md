# Zikri's Dream House Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build Card #9 (`p8`, "Zikri's Dream House") — a responsive, 8-language Spatial 3D Cutaway Loft inspired by the blueprint HUD reference, featuring 6 personal rooms (including a Full Gaming Bedroom battlestation), 5 glowing 3D wireframe utility layers, real-time Time-of-Day & Lamp/RGB atmosphere controls, Guided 3D Tour, and an interactive 2D CAD Blueprint mode.

**Architecture:** Modular zero-build vanilla HTML/CSS/classic defer JS isolated inside its own dedicated **`dream-house/`** folder, reusing global `three@0.149.0` and `window.ZK3D.registerPage(8, mountDreamHouse)`. Data, exact room bounds, camera poses, 2D SVG blueprint generator, live telemetry formatters, and 8-language copy live in `dream-house/dream-house-data.js`; strictly scoped visual styling lives in `dream-house/dream-house.css`; procedural 3D architecture, lighting, orbit/tour camera, and HUD interactions live in `dream-house/dream-house.js`; card cover artwork lives in `dream-house/assets/card-home.webp`.

**Tech Stack:** HTML5, CSS3 (Grid, Flexbox, custom properties, backdrop-filter), Vanilla ES5/ES6 classic defer scripts (works on `file://`, `http://`, `https://`), Three.js `0.149.0` (global UMD), Playwright (verification).

**Spec:** [docs/superpowers/specs/2026-11-24-dream-house-design.md](file:///home/zikripacaryuha/my-portofolio/docs/superpowers/specs/2026-11-24-dream-house-design.md)

## Global Constraints
- Zero build tools, bundlers, or additional external CDN scripts; reuse global `window.THREE` (`three@0.149.0`) already loaded in `index.html`.
- All CSS strictly scoped under `.pg.p8` and `body.dh-active` with zero leaks to cards `p0`–`p7` or Home radial wheel.
- Structural floorplan grid (`14.0 m × 10.4 m`, `134 m²`): `0.00 m²` overlap across all 6 rooms + stepped rear architectural core.
- Authentic Zikri identity only — zero real-estate pricing, mortgages, or fabricated metrics; every readout figure is live-computed from sliders or a truthful count of scene objects.
- Full 8-language native localization (`id`, `en`, `zh`, `es`, `ar` RTL, `fr`, `ja`, `ko`) via `data-i18n-own="1"` and `zk-lang` listener.
- Responsive across `360px`, `390px`, `768px`, `1024px`, and `1440px` with `0px` horizontal overflow and `>= 44px` mobile touch targets.
- Deterministic WebGL cleanup on page exit (`renderer.dispose()`, geometries, materials, textures, listeners, RAF) and graceful 2D Blueprint fallback when WebGL is unavailable.

## Review Focus
1. **Mid-drag / touch orbit colliding with portfolio card swipe on mobile:** Dragging the 3D house horizontally on touch screens must orbit the 3D scene smoothly and NEVER trigger `carousel.js`'s page-swipe gesture (pinned in Task 1 & verified in Task 5).
2. **Mobile bottom drawer hiding the 3D house:** At `390×844` and `360×740`, the 3D camera target/framing must shift vertically so the cutaway house sits clearly visible in the upper half above the collapsed Peek drawer, and selecting a room from the Expanded drawer must collapse back to Peek (pinned in Task 3 & Task 5).
3. **Slider extreme values & live telemetry consistency:** Setting `time = 6.0` (dawn), `time = 23.0` (midnight), `lamp = 0%` (lights off), or `lamp = 100%` (full glow) must never produce `NaN`, broken Arabic/RTL strings, or invisible walls/furniture (pinned in Task 2 & Task 4).
4. **Manual drag or room click during active Guided Tour:** Grabbing the 3D canvas, tapping a room, or switching to `Blueprint 2D` while `Guided Tour` is running must immediately cancel the tour timer cleanly without camera fighting the user (pinned in Task 5).
5. **Repeated open → close → reopen lifecycle & WebGL unavailable fallback:** Opening `p8`, exiting back to Home, and re-opening `p8` must cleanly dispose and remount with zero duplicate listeners or WebGL context errors; when `window.THREE` is absent, `Blueprint 2D` must render automatically with full room inspection (pinned in Task 5).

---

### Task 1: Card #9 Artwork & Home Portfolio Wheel Integration

**Files:**
- Create: `assets/images/card-home.webp`
- Modify: `index.html:55-60`, `index.html:267-300`
- Modify: `js/carousel.js:1070-1082`, `js/carousel.js:1398-1416`, `js/carousel.js:1724-1730`
- Modify: `js/background.js:12-34`
- Modify: `js/buddy.js:348-363`
- Modify: `js/i18n.js:10-16`

**Interfaces:**
- Consumes: `window.ZK3D.registerPage` (`js/motion3d.js`), `window.__zkHouseEscape` (registered in Task 5)
- Produces: Card #9 (`p8`) DOM shell `<div class="dh-stage" data-i18n-own="1">...</div>` inside `PAGES[8]`, `.card.housephoto[data-n="Rumah"]` on radial wheel, 8-language card label `"Rumah"` in `js/i18n.js`

- [ ] **Step 1: Generate Card #9 vertical architectural cover artwork (`assets/images/card-home.webp`)**
  Invoke `image-generator` subagent to generate a refined vertical `5:7` isometric night-blueprint cutaway architectural loft cover illustration (deep navy blueprint backdrop `#1E2A47`, warm glowing interior rooms with subtle cyan/violet gaming glow on one side and tropical greenery on the front terrace, crisp editorial minimalist craft matching the aesthetic of existing portfolio cards, zero embedded text). Convert/save optimized `.webp` (`~700px` wide) to `assets/images/card-home.webp`.

- [ ] **Step 2: Wire Card #9, CSS, and scripts into `index.html`**
  Add `<link rel="stylesheet" href="css/dream-house.css?v=402">` in `<head>`, append the 9th card `<button class="card photo housephoto" data-n="Rumah" aria-label="Buka kartu Rumah Impian">` referencing `assets/images/card-home.webp` in `<template id="cards">`, and add `<script src="js/dream-house-data.js?v=402" defer></script>` + `<script src="js/dream-house.js?v=402" defer></script>` before `</body>`.

- [ ] **Step 3: Register `PAGES[8]` shell, Escape/Arrow hooks, and touch swipe blocker in `js/carousel.js`**
  Add `PAGES[8]` returning `['', '<div class="dh-stage" data-i18n-own="1" role="region" aria-label="Zikri’s Dream House"></div>']`. In `keydown`, add `if (cur === 8 && window.__zkHouseEscape && window.__zkHouseEscape()) return;` for `Escape` and include `cur === 8` in the `ArrowLeft`/`ArrowRight` bypass list. Append `,.dh-stage,.dh-drawer` to the mobile swipe `BLOCK` selector string.

- [ ] **Step 4: Add Card #9 accent palette, Buddy reaction, and 8-language wheel label**
  - `js/background.js`: Add index `8` (`{ a: [62, 108, 198], b: [220, 156, 98] }`) to `PALETTES` and `'assets/images/card-home.webp'` to `FALLBACK_IMGS`.
  - `js/buddy.js`: Add `cardIdx === 8` reaction (`set('thumb', 2100)`) in `__zkBuddyCardReact`.
  - `js/i18n.js`: Add `"Rumah": ["House", "理想家", "Casa", "منزلي", "Maison", "理想の家", "드림홈"]` and `"Buka kartu Rumah Impian"` across all 7 non-Indonesian locales in `T`.

- [ ] **Step 5: Verify syntax & integration**
  Run: `node --check js/carousel.js js/background.js js/buddy.js js/i18n.js && ls -lh assets/images/card-home.webp`
  Expected: Exit 0, `card-home.webp` exists and is non-empty.

---

### Task 2: Dream House Data, Zero-Overlap Grid, Live Telemetry & 2D Blueprint SVG (`js/dream-house-data.js`)

**Files:**
- Create: `js/dream-house-data.js`

**Interfaces:**
- Consumes: none (self-contained classic IIFE exporting global `window.ZK_DREAM_HOUSE`)
- Produces: `window.ZK_DREAM_HOUSE`:
  - `ROOMS`: Array of 6 room specs `{ id, num, area, accent, bounds: { x1, x2, z1, z2 }, extraBounds?, floorHex, cam: { az, pol, rad, tx, ty, tz } }` matching exact spec coordinates (`studio`, `kitchen`, `bedroom`, `lounge`, `dining`, `balcony`)
  - `REAR_CORE`: `{ x1: -4.6, x2: 4.6, z1: -6.0, z2: -4.6, area: 12.9 }`
  - `LAYERS`: Array of 5 layer ids & colors (`power`, `daylight`, `acoustics`, `airflow`, `green`)
  - `PRESETS`: `[{ id: 'morning', hour: 8.5, lamp: 25 }, { id: 'dusk', hour: 19.5, lamp: 85 }, { id: 'night', hour: 22.0, lamp: 100 }]`
  - `I18N`: Complete 8-language pack (`id`, `en`, `zh`, `es`, `ar`, `fr`, `ja`, `ko`) with UI chrome, house summary, 4 house badges, 6 room titles/subtitles/descriptions/tags/specs, and 5 layer labels/titles/highlights
  - `formatClock(hour: number) -> string` (e.g., `19.5 -> "19:30"`)
  - `computeLayerReadout(layerId: string, hour: number, lampPct: number, lang: string) -> { title: string, value: string, highlight: string }`
  - `renderBlueprintSvg(opts: { activeRoomId: string|null, activeLayerId: string|null, lang: string, detailed: boolean }) -> string` (returns crisp interactive CAD SVG with clickable `[data-dh-room]` zones, door swing arcs, furniture outlines, and active layer conduit paths)

- [ ] **Step 1: Implement `js/dream-house-data.js` with exact zero-overlap coordinates, 8-language copy, live telemetry calculator, and 2D CAD SVG generator**
  Ensure `bedroom` copy across all 8 languages authentically describes Zikri's **Full Gaming Bedroom** (triple-screen curved setup, glass RGB PC tower, hex wall LEDs, under-bed neon glow, display shelf), and `computeLayerReadout` clamps `hour ∈ [6, 23]` and `lampPct ∈ [0, 100]` cleanly so edge values never yield `NaN`.

- [ ] **Step 2: Run automated Node math, i18n-parity & edge-case verification**
  Run a Node script that loads `js/dream-house-data.js` into a mock `window` and asserts:
  - `0` overlaps across all room rectangles + `REAR_CORE`
  - Total area rounds cleanly to `134` (`133.4 m²`)
  - All 8 languages (`id,en,zh,es,ar,fr,ja,ko`) have non-empty strings for every room, layer, and UI label
  - `computeLayerReadout` returns valid non-`NaN` strings for all 5 layers at `(6.0, 0)`, `(12.5, 50)`, `(19.5, 85)`, and `(23.0, 100)`
  - `renderBlueprintSvg` outputs valid `<svg` containing all 6 `data-dh-room` targets in both mini (`detailed: false`) and full (`detailed: true`) modes.
  Expected: Exit 0 with `ALL DATA TESTS PASSED`.

---

### Task 3: Spatial Blueprint Stylesheet & Responsive Mobile Drawer (`css/dream-house.css`)

**Files:**
- Create: `css/dream-house.css`

**Interfaces:**
- Consumes: DOM classes rendered by `js/dream-house.js` under `.pg.p8` (`.dh-stage`, `.dh-gl`, `.dh-hud`, `.dh-topbar`, `.dh-layers`, `.dh-readout`, `.dh-mini-bp`, `.dh-stats`, `.dh-modes`, `.dh-sidebar`, `.dh-card`, `.dh-slider`, `.dh-presets`, `.dh-rooms`, `.dh-bp-full`, `.dh-drawer`, `.dh-drawer-handle`)
- Produces: Complete responsive styling for Desktop (`>= 1024px`), Tablet (`768–1023px`), Mobile (`360–767px`), Arabic RTL (`[dir="rtl"]`), and `prefers-reduced-motion: reduce`.

- [ ] **Step 1: Author `css/dream-house.css` strictly scoped to `.pg.p8` and `body.dh-active`**
  - Full-bleed viewport lock (`100dvh`), blueprint-navy radial gradient backdrop + subtle `36px` drafting grid, hide default `.pg.p8 > .pgb > .bk`, `.pnav`, `#zkBar`.
  - Desktop 2-column layout (`flex: 1` 3D stage + `clamp(304px, 27vw, 372px)` scrollable right glass sidebar with 3 cards matching [image (1).webp](file:///home/zikripacaryuha/Downloads/image%20(1).webp) proportions).
  - Top-right 2D mini-blueprint container with crisp 4-corner viewfinder brackets (`::before`/`::after` + inner SVG hover/active room highlights).
  - Custom styled range sliders (`Time of Day` & `Lamp / RGB`) with crisp `#3B7BFF` fill track and tactile thumb (`>= 22px` hit area, `44px` wrapper height on touch).
  - Mobile & Tablet (`@media (max-width: 1023px)`):
    - Compact single-row top bar + horizontal touch-scrollable layer pill strip (`scrollbar-width: none`, `overflow-x: auto`).
    - Fixed bottom **Glass Inspector Drawer** (`.dh-drawer`) with smooth `transform` transition between Peek (`~148px` tall showing active title, 3 quick mood chips, `Tur 3D`, and expand toggle) and Expanded (`max-height: 68dvh`, internal scroll) states, ensuring `>= 44px` touch targets and `0px` horizontal overflow.
  - Full-screen `Blueprint 2D` CAD modal/overlay layer (`.dh-bp-full`) with smooth fade.
  - Complete `[dir="rtl"]` mirroring and `@media (prefers-reduced-motion: reduce)` overrides.

- [ ] **Step 2: Validate CSS brace balance and strict `.pg.p8` scoping**
  Run a quick Node check confirming balanced braces and zero unscoped global element selectors leaking outside `.pg.p8` / `.dh-` / `body.dh-active`.
  Expected: `CSS SCOPE & SYNTAX OK`.

---

### Task 4: Procedural 3D Cutaway House, Full Gaming Bedroom & Wireframe Utility Overlays (`js/dream-house.js` — Part 1: 3D World & Atmosphere Engine)

**Files:**
- Create: `js/dream-house.js`

**Interfaces:**
- Consumes: `window.THREE` (`three@0.149.0`), `window.ZK_DREAM_HOUSE` (Task 2), `window.ZK3D.registerPage` (`js/motion3d.js`)
- Produces: Complete Three.js architectural scene graph inside `mountDreamHouse(pg, pgb)`:
  - Stepped plinth & soft shadow catcher plane (`ShadowMaterial`)
  - Outer cutaway walls (`2.65m`), interior partitions (`2.35m`) with clean doorways, front low parapets (`0.85m`) + frameless glass balcony railing, dark-graphite top cutaway rim caps
  - All 6 rooms + stepped rear utility core (`foyer`, `bath`, `server closet`) built with reusable geometric helpers, shared cached materials, CanvasTexture screens/rugs/woodgrain, and detailed **Full Gaming Bedroom** props (bed + under-bed RGB strip, wide black gaming desk, triple glowing curved/angled screens, glass-panel RGB PC tower with lit fans, backlit keyboard/mousepad, gaming chair, glowing hex/linear RGB wall LEDs, illuminated fashion/sneaker display shelf)
  - 5 toggleable glowing wireframe 3D utility overlay groups (`power`, `daylight`, `acoustics`, `airflow`, `green`) + subtle floor selection outline highlight per room
  - `applyAtmosphere(hour, lampPct)` driving real-time directional sun angle/color, ambient/hemisphere balance, warm interior point lights, **Full Gaming Bedroom** cyan/violet RGB point light & emissives, and stage backdrop CSS mood variables.

- [ ] **Step 1: Build the complete procedural 3D architectural world, Full Gaming Bedroom, 5 utility wireframe groups, and real-time atmosphere engine in `js/dream-house.js`**
  Ensure every geometry, material, and CanvasTexture is registered in `trackGeo` / `trackMat` / `trackTex` sets for 100% deterministic disposal, and configure `shadow.mapSize.set(1024, 1024)` + `pixelRatio <= 1.75` + legacy/modern r149 lighting parity (`convertSRGBToLinear` helper where needed).

- [ ] **Step 2: Syntax check**
  Run: `node --check js/dream-house.js`
  Expected: Exit 0.

---

### Task 5: Camera Controller, Guided Tour, HUD Wiring, Mobile Drawer, 8-Language Sync & End-to-End Verification

**Files:**
- Modify: `js/dream-house.js` (complete HUD rendering, damped orbit/pinch/zoom/focus camera, Guided Tour, 2D Blueprint mode & no-WebGL fallback, mobile drawer state, keyboard & `Escape` cascade, `zk-lang` sync, cleanup)

**Interfaces:**
- Consumes: `window.ZK_DREAM_HOUSE` (Task 2), `window.ZK.lang` (`js/i18n.js`), `window.zkClosePage` / `window.zkJumpPage` (`js/carousel.js`)
- Produces: `window.__zkHouseEscape()` cascade (`Blueprint 2D / Expanded Drawer -> Room Focus -> Overview -> return false to Home`), `ZK3D.registerPage(8, mountDreamHouse)` registration.

- [ ] **Step 1: Wire full HUD DOM, damped spherical camera controller, Guided Tour, Blueprint 2D mode, mobile drawer, keyboard shortcuts, and deterministic cleanup in `js/dream-house.js`**
  - On-demand damped RAF loop (sleeps cleanly when damped motion, layer pulse, and tour are settled to keep idle GPU low; gently animates active utility pulse / RGB shimmer when visible and `!reducedMotion`).
  - Automatic portrait camera Y-framing shift so the 3D cutaway house centers visually in the upper `60%` viewport above the collapsed Peek drawer on mobile/tablet.
  - Any pointer drag, wheel zoom, room tap, or view-mode switch immediately cancels `Guided Tour`.
  - Graceful fallback: if `!window.THREE` or WebGL context creation fails, automatically mounts interactive `Blueprint 2D` mode + full inspector sidebar/drawer with zero JS errors.
  - Register `window.__zkHouseEscape` and `ArrowLeft`/`ArrowRight` room stepping.

- [ ] **Step 2: Syntax check across all modified JS files**
  Run: `node --check js/dream-house-data.js js/dream-house.js js/carousel.js js/background.js js/buddy.js js/i18n.js`
  Expected: Exit 0.

- [ ] **Step 3: Full Playwright visual & functional verification across Desktop, Laptop, Tablet, Mobile & 8 Languages**
  Serve locally (`python3 -m http.server`) and inspect screenshots + DOM assertions via Playwright:
  - Home wheel displays 9 cards including Card #9 (`Rumah`) with `card-home.webp` loaded (`naturalWidth > 0`) and opens `p8`.
  - Desktop `1440×900`: Overview with `Power & Tech` wireframe active, Room Focus on **Kamar Full Gaming** (confirm glowing RGB PC tower, triple screens, hex LEDs, under-bed glow!), Room Focus on **Studio Dev & UI**, Time-of-Day Morning (`08:30`) vs Night (`22:00`), all 5 utility layers toggled, `Blueprint 2D` full CAD mode, and `Guided Tour` start + manual cancel.
  - Laptop `1024×768`: Full HUD fits cleanly with zero overlap/clipping.
  - Tablet `768×1024` & Mobile `390×844` & Small Mobile `360×740`: 3D house cleanly centered above collapsed Peek drawer, drawer expands cleanly, room selection focuses 3D and collapses drawer, `>= 44px` touch targets, `0px` horizontal overflow, touch drag orbits without switching portfolio cards.
  - 8-language switch (`id`, `en`, `ar` RTL `dir="rtl"`, `ja`, `ko`) updates all HUD, blueprint labels, and live readouts cleanly.
  - `Escape` cascade and `exit -> re-open p8` WebGL lifecycle pass with **0 console errors and 0 WebGL errors**.

- [ ] **Step 4: Clean up temp verification artifacts & verify `git status`**
  Remove temporary `.playwright-mcp/` files, kill local dev server, and confirm clean diff ready for user review.
