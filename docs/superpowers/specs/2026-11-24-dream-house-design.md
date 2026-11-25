# Design Spec — Kartu #9 (`p8`): "Zikri's Dream House" (Spatial 3D Cutaway Blueprint)

**Date:** 2026-11-24  
**Scope:** New 9th portfolio card (`Rumah` / `Dream House`, page index `p8`) in `my-portofolio`  
**Selected Approach:** **Opsi A — Modern Tropical Loft ("Studio & Sanctuary")**, 1-story open architectural 3D cutaway modeled on the spatial HUD aesthetic of [image (1).webp](file:///home/zikripacaryuha/Downloads/image%20(1).webp), tailored 100% to M. Zikri Al-Bukhori's personal dream house.

---

## 1. Intent & Why

- **Intent:** Add a deeply personal, memorable 9th card to Zikri's radial card portfolio — an interactive **Spatial 3D Cutaway Dream House** where visitors can inspect Zikri's ideal living-and-working sanctuary (`134 m²`, 6 interactive zones + stepped rear entry/bath core) in real-time 3D, toggle glowing architectural utility layers, shift time of day from sunrise to late-night coding ambiance, and tour each room.
- **Why this fits the portfolio:** Existing cards showcase Zikri's story (`p0`), music (`p1`), studio profile (`p2`), portraits (`p3`), skills (`p4`), live projects (`p5`), contact (`p6`), and fashion (`p7`). `p8 Dream House` unifies those personal threads into one tangible spatial artifact — a designer-developer's dream loft pairing a calm creative UI/dev studio, a **full gaming bedroom battlestation** (triple-screen rig, glass RGB PC tower, hex wall LEDs, under-bed glow & fashion/sneaker rack), an acoustic guitar/vinyl lounge, a coffee bar, a collaboration table, and a tropical Medan balcony.

### Goals, Non-Goals & Anti-Goals
- **Goals:**
  1. **Spatial Blueprint Aesthetic:** Deep blueprint-navy studio backdrop (`#24304E`–`#1A233A`), warm-lit 3D isometric cutaway floating cleanly with soft contact shadows, glowing wireframe architectural overlays (`Power & Tech`, `Daylight`, `Acoustics`, `Airflow`, `Green`), crisp translucent glass HUD panels, 2D viewfinder mini-blueprint, and electric blueprint-blue (`#3B7BFF`) active accents.
  2. **100% Authentic Personal Content:** Zero fabricated real-estate pricing, mortgages, or AI-gibberish copy. Every number, room story, and interactive control reflects Zikri's real interests and directly drives visual changes in the 3D scene.
  3. **Truly Interactive 3D & Real-Time Atmosphere:** Drag-to-orbit, zoom, click/tap rooms in 3D or via the 2D blueprint/sidebar to smoothly focus camera, real-time **Time of Day (`06:00 → 23:00`)** and **Interior Lamp Warmth** sliders that live-update sun angle, shadows, sky tint, and interior point lights/emissives, plus automated **`Guided Room Tour`**.
  4. **First-Class Responsive UX (Desktop, Tablet & Mobile):** 2-column spatial HUD on desktop (`>= 1024px`), adaptive collapsible glass bottom drawer on tablet/mobile (`< 1024px`) so the 3D house stays roomy and interactive with 1-finger touch orbit, pinch zoom, `>= 44px` touch targets, and `0px` horizontal overflow.
  5. **Zero-Dependency Portfolio Parity:** Plain HTML/CSS/classic defer JS (works over `file://`, `http://`, `https://`), reuses global `three@0.149.0` already in `index.html`, deterministic WebGL cleanup via `ZK3D.registerPage(8, ...)`, full 8-language localization (`id`, `en`, `zh`, `es`, `ar` RTL, `fr`, `ja`, `ko`), keyboard navigation, `prefers-reduced-motion: reduce`, and crisp 2D Blueprint fallback if WebGL is unavailable.
- **Non-Goals:**
  - No build tools, bundlers, external GLTF/HDRI asset downloads, or real-estate backend/pricing calculators.
  - No multi-floor elevator mechanics (single-level open loft keeps all 6 rooms readable at once).
- **Anti-Goals (Failure Conditions):**
  - Any fake mortgage/price text or decorative sliders/buttons that do not visibly change the 3D scene.
  - Overlapping/clipping 3D walls or furniture, sluggish continuous idle GPU drain, or a squished mobile screen where the sidebar covers the 3D house.

---

## 2. Approaches Considered

| Approach | Summary | Trade-off | Verdict |
|---|---|---|---|
| **Opsi A — Modern Tropical Loft (1 Lantai Luas)** | 1-story stepped architectural 3D cutaway with 6 personal rooms, 5 glowing 3D layer overlays, real-time Time-of-Day/Lamp controller, 2D viewfinder blueprint, and 3-card glass inspector | Highest visual parity with the reference HUD, all 6 rooms visible simultaneously, smooth 60fps across desktop & mobile | **Selected by user** |
| **Opsi B — 2-Story Modern Villa + Exploded View** | Ground floor + upper studio/rooftop with floor switcher and exploded vertical separation | Almost 2× geometry complexity; hides half the house in single-floor view and crowds small mobile viewports | Not selected |
| **Opsi C — Minimalist White Maquette + Room Modals** | Abstract white architectural blocks with text modals per room | Lightest GPU footprint, but loses the warm illuminated interior & furniture richness that defines the reference look | Not selected |

---

## 3. Architecture & Visual Specification

### 3.1 Color & Typography System (Scoped to `.pg.p8`)
- **Canvas Backdrop:** `radial-gradient(ellipse 75% 68% at 44% 52%, #33456E 0%, #24304E 54%, #182138 100%)` overlaid with an ultra-subtle `36px` blueprint drafting grid (`rgba(255,255,255,0.025)`).
- **Glass Surfaces:**
  - Primary card: `rgba(38, 50, 79, 0.74)` with `backdrop-filter: blur(18px)` and `1px solid rgba(255, 255, 255, 0.13)`.
  - Interactive pill/chip: `rgba(255, 255, 255, 0.06)` resting, `rgba(255, 255, 255, 0.14)` hover, `#3B7BFF` / `rgba(59, 123, 255, 0.24)` active.
- **Accents:**
  - Blueprint Primary CTA: `#3B7BFF` (hover `#548EFF`, text `#FFFFFF`).
  - Interior Warm Lamp Accent: `#FFB969`.
  - Layer Wireframe Glows: Power `#E8F3FF` / `#64A2FF`, Daylight `#FFE29A`, Acoustics `#C8B6FF`, Airflow `#8AE6FF`, Green `#82E6B1`.
- **Typography:**
  - UI & tabular metrics: `"Manrope", "Noto Sans KR", system-ui, sans-serif` (using existing WOFF2 font-face).
  - Editorial display accent: `"Instrument Serif", Georgia, serif` (italic accents matching portfolio identity).
  - Coordinates / specs: `ui-monospace, SFMono-Regular, Menlo, monospace`.

### 3.2 Stepped 3D Architectural Cutaway Geometry (`14.0 m × 10.4 m`, `134 m²`) *(Refined Grid — Builder Call)*
All coordinates use `1 unit = 1 meter`, centered near `(0, 0, -0.8)`, resting on a stepped architectural concrete plinth (`Y = -0.32..0.0`, subtly floating above a `ShadowMaterial` plane at `Y = -0.36` so the house casts a realistic grounded studio shadow onto the blueprint canvas). All room partitions snap strictly to the structural grid (`X ∈ {-7.0, -6.4, -4.6, -1.8, +1.8, +4.6, +6.4, +7.0}`, `Z ∈ {-6.0, -4.6, -1.2, -0.2, +2.6, +4.4}`) guaranteeing **0.00 m² overlap and 0.00 m² stray gaps**.

**Wall Cutaway Rules (Zero Clipped Views):**
- Outer back walls (`Z = -6.0` / `Z = -4.6`) and outer side wings: height **`2.65 m`**, thickness **`0.22 m`**, clean matte architectural off-white `#ECE8DF` interior / slate-warm `#C9C5BD` exterior, capped with crisp dark-graphite cutaway top rims (`#3B4358`) so walls read unmistakably as a precision architectural section cut.
- Front exterior edges (`Z = +4.4`): stepped low parapet **`0.85 m`** (and frameless glass balustrade on the balcony) so the isometric camera always has an unobstructed view into every room.
- Interior partition walls: height **`2.35 m`**, thickness **`0.16 m`**, with clean open archways/door openings (`1.1 m` wide) between rooms so rooms visibly connect.

**6 Interactive Personal Zones + Stepped Rear Architectural Core (Exact Zero-Overlap Bounds):**

| ID | Room Name (ID / EN) | Bounds `(X, Z)` | Exact Area | Flooring | Key Procedural 3D Props |
|---|---|---|---|---|---|
| `studio` | **Studio Dev & UI** / Dev & UI Studio | `X:[-7.0, -1.8]`, `Z:[-4.6, -0.2]` | `22.9 m²` (`23 m²`) | Dark smoked oak `#3D362F` | L-desk, dual glowing monitors (live UI CanvasTexture), keyboard, studio speakers, ergonomic chair, bookshelf, ambient LED strip behind desk |
| `kitchen` | **Dapur & Coffee Bar** / Kitchen & Coffee Bar | `X:[-1.8, +1.8]`, `Z:[-4.6, -1.2]` | `12.2 m²` (`12 m²`) | Matte terrazzo `#4A505A` | Charcoal cabinets, quartz island counter, induction hob, sink, espresso machine & pour-over kettle, 2 bar stools, warm under-cabinet light bar |
| `bedroom` | **Kamar Full Gaming** / Full Gaming Bedroom | `X:[+1.8, +7.0]`, `Z:[-4.6, -0.2]` | `22.9 m²` (`23 m²`) | Dark matte slate-wood `#2C303D` | Low dark platform bed with glowing under-bed LED strip, **full gaming battlestation** (wide matte-black desk, triple/curved glowing screens, glass-panel RGB PC tower with lit fans, backlit keyboard/mousepad, ergonomic gaming chair, glowing hexagonal/linear RGB wall LED panels), plus illuminated display/wardrobe shelf |
| `lounge` | **Sudut Musik & Santai** / Music & Lounge | `X:[-6.4, -1.8]`, `Z:[-0.2, +4.4]` | `21.2 m²` (`21 m²`) | Warm oak `#B68B64` | Cream L-sectional sofa, terracotta throw pillows, walnut coffee table, cream rug, media credenza, wooden acoustic guitar on stand, vinyl turntable cabinet |
| `dining` | **Meja Makan & Ide** / Dining & Idea Hub | `X:[-1.8, +1.8]`, `Z:[-1.2, +2.6]` | `13.7 m²` (`14 m²`) | Light oak `#C49B70` | Sculptural walnut table, 4 modern chairs, woven rug, ceramic centerpiece, subtle warm pendant pool |
| `balcony` | **Balkon Tropis** / Tropical Terrace | L-wrap `X:[+1.8, +6.4], Z:[-0.2, +4.4]` + front deck `X:[-1.8, +1.8], Z:[+2.6, +4.4]` | `27.7 m²` (`28 m²`) | Slatted teak `#866141` | 2 curved lounge chairs, round bistro table, 2 warm floor lanterns, glass balustrade, timber louver overhang, 6 tropical potted palms & monstera plants |
| *(core — non-selectable)* | Stepped Rear Utility Wing (Foyer, Bath Alcove, Server Closet) | `X:[-4.6, +4.6]`, `Z:[-6.0, -4.6]` | `12.9 m²` (`13 m²`) | Matte stone `#434955` | Minimalist entry door & shoe bench (center), sleek shower & vanity (right), smart-home/UPS rack cabinet (left) — creates the authentic stepped architectural silhouette |

**Total Verified Area:** `22.9 + 12.2 + 22.9 + 21.2 + 13.7 + 27.7 + 12.9 = 133.5 m²` → displayed cleanly as **`134 m²`**.

### 3.3 Five Interactive 3D Utility Layers (Hovering Wireframe Conduits) *(Readout Strategy — Builder Call)*
Triggered by the top-left segmented pill bar. Only one layer is active at a time (clicking the active tab toggles the overlay off to admire the clean house; clicking another tab switches immediately with smooth opacity fade). Every readout figure is **either live-computed from the user's sliders or an exact factual count of 3D scene elements** (zero fabricated real-estate specs):
1. **`power` (Default Active — Power & Tech):** Translucent glowing white-blue rectangular duct/conduit tree (`Y = 2.62 m`) with crisp `EdgesGeometry` wireframe edges and pulsing node cubes connecting **Rear Server Closet → Dev Studio → Kitchen Coffee Bar → Music Lounge → Full Gaming Bedroom Rig**.
   - *Live Readout:* Active interior light & RGB fixture count + live dimmer % from the Lamp slider (e.g., `6 Zona Lampu & RGB · 85%` + `Jalur Smart Studio & Gaming Rig`).
2. **`daylight` (Daylight & Sun):** Warm golden translucent directional sun-beam planes angled from the **Tropical Balcony** across **Dining** and **Lounge**, plus a floating solar arc path.
   - *Live Readout:* Live daylight percentage & phase computed from the Time-of-Day slider (`06:00–23:00`, e.g., `Senja · 35% Cahaya Alami` + `Bukaan Kaca Tropis`).
3. **`acoustics` (Acoustics & Audio):** Concentric glowing lavender-white soundwave rings radiating from the **Music & Lounge** vinyl/guitar corner, paired with a crisp acoustic-isolation wireframe divider along **Dev Studio**.
   - *Scene-Derived Readout:* `2 Zona Akustik · Studio Terpisah` + `Sudut Gitar & Vinyl + Dinding Isolasi`.
4. **`airflow` (Tropical Airflow):** Smooth curved cyan-white translucent wind ribbons sweeping diagonally from the **Tropical Balcony** across **Dining & Lounge** toward rear high vents.
   - *Scene-Derived Readout:* `3 Jalur Angin Silang` + `Balkon Tropis → Tengah → Studio`.
5. **`green` (Biophilic & Eco):** Crisp mint-emerald glowing rings & vertical beacons over the balcony greenery and indoor planters.
   - *Scene-Derived Readout:* Exact count of 3D botanical planters built in the scene (`8 Titik Tanaman · 28 m² Teras` + `Palem & Monstera Tropis Medan`).

All readouts update reactively when sliders or language (`zk-lang`) change across all 8 languages.

### 3.4 Real-Time Atmosphere & Camera Controls
- **Orbit & Interaction (Zero External OrbitControls Needed):**
  - Custom lightweight damped spherical camera controller (`azimuth`, `polar`, `radius`, `target` with smooth exponential damping).
  - Mouse drag / 1-finger touch drag to orbit (`azimuth` 360°, `polar` clamped `24°–68°` so user never clips under the floor).
  - Mouse wheel / 2-finger pinch to zoom (`radius` clamped `12–28`).
  - Raycast click/tap on any room floor or furniture selects that room, smoothly flies camera to an optimal close-up framing for that room, highlights a subtle glowing floor perimeter outline in 3D, syncs the 2D mini-blueprint highlight, and updates Sidebar Card 1 with that room's details!
- **Real-Time Time of Day Slider (`06:00` → `23:00`, default `19:30` Golden-Blue Dusk matching the warm-interior-on-dark-navy magic of the reference!):**
  - Continuously interpolates:
    - Key directional sun color, intensity, and azimuth/elevation angle (casts shifting shadows!).
    - Ambient & hemisphere cool/warm balance.
    - Stage background subtle mood shift (brighter slate-blue morning → rich warm-indigo dusk → deep midnight blueprint).
    - Interior warm point lights (Studio, Lounge, Dining, Balcony lanterns) + cool cyan/violet RGB accent point light & emissive glow inside the **Full Gaming Bedroom** (hex wall LEDs, glass PC tower, triple monitors, under-bed strip — subtle in midday, popping vividly at dusk/night!).
  - Quick preset buttons right above/beside the slider: **Pagi (`08:30`)**, **Senja (`17:45`)**, **Malam (`20:30`)** for 1-tap instant mood switching.
- **Lamp Brightness / Warmth Slider (`0%` → `100%`, default `85%`):**
  - Directly scales the interior warm lights & desk/bedside emissive lamps so users can tune the exact studio mood.
- **Guided Tour (`Mulai Tur 3D` / `Stop Tour`):**
  - Cycles smoothly through all 6 rooms (`~3.4s` per room) with damped camera fly-to, syncing room highlight + inspector card automatically. Any manual drag/click immediately pauses the tour so the user stays in full control.
- **3 Bottom View Modes:**
  - **`Orbit 3D`:** Default interactive isometric cutaway overview.
  - **`Room Focus`:** Zooms closely into the currently selected room (defaults to `Dev & UI Studio` if none selected), with quick `‹` / `›` stepping.
  - **`Blueprint 2D`:** Smoothly reveals a full high-craft **interactive 2D architectural CAD floorplan SVG** (with room dimensions, door swing arcs, furniture outlines, active utility layer paths, and clickable rooms that jump straight back to 3D or inspect details!). Also serves as the automatic zero-WebGL fallback.

### 3.5 Responsive Layout Adaptation
- **Desktop (`>= 1024px`):**
  - Left `flex: 1`: Full-height 3D WebGL stage with floating HUD (top-left back button `←`, house title, 5 layer tabs, metric readout; top-right interactive 2D mini-blueprint with viewfinder corners; bottom-left compact 3-metric badge stack `6` rooms / `134` m² / `1` floor; bottom-right 3 view-mode toggle tiles).
  - Right `clamp(304px, 27vw, 372px)`: Dedicated scrollable vertical column containing 3 crisp glass cards (Card 1: House/Room Summary; Card 2: Atmosphere & Tour Controls; Card 3: Explore 6 Rooms List).
- **Tablet & Mobile (`< 1024px`):**
  - 3D WebGL stage fills `100%` width and upper stage area (`~58–64%` visible height above collapsed drawer), with camera framing auto-shifted slightly upward (`offsetY`) so the 3D house sits dead-center in the visible upper zone — NEVER hidden behind the bottom drawer!
  - Compact top HUD: Back `←` button (`44×44px`), concise title, and quick `2D` blueprint toggle button; horizontally scrollable 5-pill layer bar directly underneath (zero wrap overflow).
  - Bottom **Interactive Glass Drawer (`.dh-drawer`)** with 2 clean states:
    - **Peek State (default):** Drag/tap handle bar + active House/Room title & area + quick 3-chip mood presets (`Pagi`/`Senja`/`Malam`) + **`Tur 3D`** button + **"Detail & Ruangan ↑"** toggle.
    - **Expanded State (`max-height: 68dvh`):** Smooth spring slide-up revealing the full 3-section inspector (Room summary, Time & Lamp sliders, and all 6 tappable room cards), tapping a room smoothly focuses the 3D camera and collapses back to Peek so the user immediately sees the room in 3D!

### 3.6 Portfolio Integration & Files Touched
All Dream House feature files live strictly inside their own dedicated **`dream-house/`** folder (isolated from root `css/`, `js/`, and `assets/images/`):
1. **New Asset (`dream-house/assets/card-home.webp` — Builder Call):** Generated up front via the built-in `image-generator` subagent (vertical 5:7 editorial architectural isometric night-blueprint illustration matching the dark navy & warm tungsten aesthetic of the Dream House, converted to optimized `700×980` `.webp`) so Card #9 on the Home wheel and `js/background.js` can be wired immediately without blocking on 3D capture. *(Fallback if generator is unavailable: Playwright dusk render capture + WebP export.)*
2. **New Files (Isolated Folder `dream-house/`):**
   - `dream-house/dream-house.css` — Strictly scoped under `.pg.p8` and `body.dh-active` (full-bleed blueprint isolation, glass cards, viewfinder mini-blueprint, sliders, 2D CAD view, mobile expandable drawer, RTL & reduced-motion).
   - `dream-house/dream-house-data.js` — Room definitions, exact 3D coordinates/camera poses, 5 utility layers, 2D SVG blueprint paths, and complete **8-language native localization** (`id`, `en`, `zh`, `es`, `ar`, `fr`, `ja`, `ko`).
   - `dream-house/dream-house.js` — Procedural Three.js r149 cutaway house builder, glowing wireframe utility overlays, damped orbit/focus/tour camera engine, real-time atmosphere lighting engine, 2D blueprint sync, responsive drawer controller, keyboard & `Escape` cascade, and deterministic `ZK3D.registerPage(8, ...)` cleanup.
3. **Existing Files Updated (Minimal, Surgical Hooks):**
   - `index.html` — Add Card #9 (`<button class="card photo housephoto" data-n="Rumah">`) in `<template id="cards">` pointing to `dream-house/assets/card-home.webp`, link `dream-house/dream-house.css?v=402`, load `dream-house/dream-house-data.js?v=402` and `dream-house/dream-house.js?v=402`.
   - `js/carousel.js` — Add `PAGES[8]` shell (`data-i18n-own="1"`), delegate `Escape` (`window.__zkHouseEscape`) & `ArrowLeft`/`ArrowRight` for `cur === 8`, add `.dh-stage,.dh-drawer` to touch swipe `BLOCK`.
   - `js/background.js` — Add index `8` navy-blueprint/amber palette and `dream-house/assets/card-home.webp` fallback.
   - `js/buddy.js` — Add index `8` reaction (`thumb`).
   - `js/i18n.js` — Add 8-language card wheel label for `"Rumah"` (`Rumah` / `House` / `理想家` / `Casa` / `منزلي` / `Maison` / `理想の家` / `드림홈`).

---

## 4. Builder Decisions Left Open (Safe Defaults)
- Exact furniture micro-dimensions, pillow/book/plant leaf counts, and procedural CanvasTexture monitor graphics are left to the builder as long as every prop fits strictly within its room bounds with zero wall clipping.
- Exact CSS spring curves and icon SVGs (inline crisp 1.6px stroke icons) are left to the builder.

---

## 5. Verification Plan
1. `node --check` on all new & edited JS files.
2. Math/bounds audit confirming zero overlapping room/furniture footprints.
3. Live Playwright browser verification across Desktop (`1440×900`), Laptop (`1024×768`), Tablet (`768×1024`), and Mobile (`390×844`, `360×740`):
   - Home wheel renders all 9 cards cleanly including Card #9 (`Rumah`) and opens `p8` smoothly.
   - 0 console errors & 0 WebGL errors.
   - Toggle all 5 utility layers (`power`, `daylight`, `acoustics`, `airflow`, `green`) and verify 3D wireframe overlays & left readout update.
   - Click rooms via 3D canvas, 2D mini-blueprint, and sidebar list → verify camera focuses and Card 1 updates.
   - Slide Time of Day (`06:00` → `23:00`) and Lamp brightness → verify real-time lighting transition.
   - Toggle `Blueprint 2D` view mode and `Guided Tour`.
   - Verify Mobile drawer peek/expand, `>= 44px` touch targets, `0px` horizontal overflow, and unobscured 3D stage.
   - Verify all 8 languages including Arabic RTL (`dir="rtl"`), `Escape` cascade (Blueprint/Room Focus → Overview → Home), and exit/re-open clean WebGL disposal.
