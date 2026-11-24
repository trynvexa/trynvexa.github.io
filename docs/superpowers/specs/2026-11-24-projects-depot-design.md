# Design Spec — Halaman Proyek (`p5`): "Zikri's Depot" (3D Container-Crane + Case Study Modal)

**Date:** 2026-11-24  
**Scope:** Redesign of Card #6 (`Proyek`, page index `p5`) in `my-portofolio`  
**Selected Approach:** **Opsi B** — Full 1-screen 3D Shipping Container & Gantry Crane Depot tailored to Zikri's 4 featured projects + 3 supporting containers, paired with an interactive **Case Study Detail Modal** (high-res preview, detail crops, clickable copy-HEX color system, and architecture specs).

---

## 1. Intent & Goals

- **Intent:** Transform `p5 Proyek` into an unforgettable, tactile 3D shipping-depot showcase modeled 1:1 on the "Nadia's Depot" container-crane visual, physical, and lighting spec, while making 100% of the identity, projects, navigation, and copy authentically Zikri's (`M. Zikri Al-Bukhori`).
- **Goals:**
  1. **1:1 Visual & Kinetic Fidelity:** Terracotta `#E27657` stage, giant cream `#F6EDE1` word (`PROYEK` / `PROJECTS` / localized across 8 languages), 7 corrugated 3D shipping containers piled with exact coordinates, rotations, colors, lighting, shadows, and overhead gantry crane physics (travel, lower, grab, hoist, settle swing, gatefold 122°/98° doors, supporting-container gravity drops & bounces).
  2. **Project-First Container Content (Opsi B):** The 4 hero/central containers hold Zikri's 4 live projects (**Mono Living**, **GiGi Energy**, **Compute AI**, **Sweet Heaven**), each offering both **`Lihat Demo ↗`** and **`Detail Proyek`** (Case Study Modal). The 3 surrounding containers hold **Proses**, **Arsip**, and **Hubungi**.
  3. **Zero-Conflict Three.js Architecture:** Isolate `three@0.160.0` + `RoundedBoxGeometry` in an ES Module (`js/projects-depot.js`) via `<script type="importmap">`, completely separate from global UMD `three@0.149.0` used by `js/webgl-scenes.js`. Deterministic disposal of renderer, geometries, materials, textures, listeners, and RAF on page exit.
  4. **Full 8-Language Native Localization & RTL:** Every single element — giant background word, 7 canvas-textured 3D container stencil labels, top nav, pill, eyebrow, projected container card, and Case Study modal — updates cleanly across all 8 languages (`id`, `en`, `zh`, `es`, `ar`, `fr`, `ja`, `ko`) with zero mixed-language leaks and clean RTL support for Arabic (`ar`).
  5. **Responsive & Accessible:** Exact landscape (`vw/vh >= 1.05`) and portrait (`vw/vh < 1.05`) design-frame math (320px phones up to 2560px ultrawides), visually hidden `#dpMenu` keyboard/screen-reader container triggers, `Escape` cascade (Modal → Close Container → Back to Home), and full `prefers-reduced-motion: reduce` support.
- **Non-Goals / Anti-Goals:**
  - No build step or bundler; plain HTML, CSS, and browser-native ESM + jsDelivr CDN.
  - No leftover Nadia branding, no shopping/e-commerce fluff, no cluttered extra nav items duplicating the Home wheel.
  - No GPU/WebGL context leaks when opening and closing `p5` repeatedly.

---

## 2. Approaches Considered

| Approach | Summary | Trade-off | Verdict |
|---|---|---|---|
| **Opsi A** | 1-screen 3D crane with 4 project containers (direct demo link only) + 3 supporting containers | Ultra-minimal, but loses visual screenshots, detail crops, and HEX palette inspection from the previous `p5` | Not selected |
| **Opsi B (Selected)** | 1-screen 3D crane with 4 project containers + 3 supporting containers **plus** an on-demand **Case Study Detail Modal** | Preserves 100% pure 1-screen 3D depot hero on load while giving full case-study depth (screenshots, crops, copy-HEX swatches, specs) one click away | **Selected by user** |
| **Opsi C** | Keep Nadia's exact 7 generic sections (`About`, `What I Do`, `Work`, `Process`, `Kit`, `Archive`, `Hello`) renamed to Zikri | Duplicates content already living on dedicated `Me` (`p2`) and `Skill` (`p4`) cards | Not selected |

---

## 3. Exact Visual, Physics & Layout Architecture

### 3.1 Fonts & Colors
- **Fonts:**
  - `Archivo X` (`font-stretch: 125%`, weight `800–900`, loaded via `@font-face` WOFF2 from `fonts.gstatic.com/s/archivo/v25/...`) — giant background word & 3D container canvas stencil labels.
  - `Manrope` (`200–800`, WOFF2 from `fonts.gstatic.com/s/manrope/v23/...`) — all Depot UI & card copy.
  - `Instrument Serif` italic `400` (already loaded in `index.html`) — italic accent `<em>` word in card titles.
  - `await Promise.all([document.fonts.load('900 40px "Archivo X"'), document.fonts.load('800 20px "Manrope"'), document.fonts.load('italic 400 32px "Instrument Serif"')])` before building 3D canvas textures.
- **Colors (1:1 from spec):**
  - Page `#E27657`, Word `#F6EDE1`, UI `#FFFFFF`, Accent `#F0653F`, Navy `#1F2E5C`, Mustard `#E0A93B`, Ivory `#F2EBDD`, Sky `#8FC3E6`, Inside `#1A1D2B`, Steel `#E4E1DC`, Bolts `#9b968f`, Lock Rods `#d8d3cb`.

### 3.2 Responsive Design Frame (`1440 × 900`)
- **Landscape (`vw/vh >= 1.05`):** `k = min(vw/1440, vh/900)`, `tx = (vw - 1440*k)/2`, `ty = vh - 900*k`, `n = max(0.62, k)`.
- **Portrait (`vw/vh < 1.05`):** `n = min(1, max(0.62, vw/560))`, `k = vw/1130`, `tx = vw/2 - 768*k`, `ty = wordTop - 716*k`.
- World transform: `x = (sx - tx)/k`, `y = -(sy - ty)/k`, `z = 0`.
- Giant `.dp-word` sized via canvas `measureText` so width = `vw * 1.005`, left offset `-vw * 0.004`, baseline `35*k` above bottom (portrait: `34*n`).

### 3.3 Camera, Lighting & Shadows
- `PerspectiveCamera` FOV `20°`, target `c = toWorld(vw/2, vh/2)`, distance `D = (vh/k/2)/tan(10°)`, position `c + (0, sin(8°)*D, cos(8°)*D)`, `near = 0.3*D`, `far = 3*D`.
- Lights: `AmbientLight(#ffffff, 2.2)`, `HemisphereLight(#ffffff, #d27a5e, 0.22)`, Key `DirectionalLight(#fffaf4, 0.78)` at `c + (-500, 1500, 1100)` (`shadow.mapSize 2048`, `radius 6`, `bias -0.0006`, `normalBias 0.6`, ortho `±max(vw,vh)/k * 0.75`), Fill `DirectionalLight(#ffe6d8, 0.35)` at `c + (900, 200, 900)`.
- Floor shadow catcher: `6000 × 3000` horizontal plane at `y = -742`, `ShadowMaterial({ opacity: 0.22 })`.

### 3.4 The 7 Containers (Pile Geometry + Zikri Opsi B Content)

| Slot ID | Pos `(x, y, z)` | Rot `(x, y, z)` | Size | Color / Ink | Content | Actions Inside Card |
|---|---|---|---|---|---|---|
| `work` | `676, 620, 0` | `.14, .06, 0` | `hero` (`430×158×140`) | Navy `#1F2E5C` / White | **01 / Mono Living** — Modular Housing | `Lihat Demo ↗` + **`Detail Proyek`** |
| `about` | `560, 500, -6` | `.16, .20, 0` | `cube` (`142×96×112`) | Mustard `#E0A93B` / White | **02 / GiGi Energy** — Zero-Sugar Drink | `Lihat Demo ↗` + **`Detail Proyek`** |
| `kit` | `556, 410, -14` | `.18, .14, 0` | `cube` (`142×96×112`) | Sky `#8FC3E6` / White | **03 / Compute AI** — AI Agent Platform | `Lihat Demo ↗` + **`Detail Proyek`** |
| `hello` | `792, 474, -40` | `.24, -.20, -.40` | `std` (`252×104×104`) | Sky `#8FC3E6` / White | **04 / Sweet Heaven** — Artisan Bakery | `Lihat Demo ↗` + **`Detail Proyek`** |
| `process` | `352, 575, 34` | `.22, -.52, .27` | `std` (`252×104×104`) | Ivory `#F2EBDD` / Navy | **05 / Proses** — Riset, Desain, Bangun, Rilis | Workflow chips |
| `do` | `1000, 592, 28` | `.22, -.40, -.40` | `std` (`252×104×104`) | Navy `#1F2E5C` / White | **06 / Arsip** — Eksperimen & GitHub | `GitHub @trynvexa ↗` |
| `archive` | `1196, 616, 120` | `.20, -.28, -.32` | `std` (`252×104×104`) | Mustard `#E0A93B` / White | **07 / Kolaborasi** — Ajak kerja sama | **`Hubungi Saya ↗`** (jumps to `p6`) |

- **Supporting gravity rules (preserved 1:1):**
  - Lifting `about` (GiGi) → `kit` (Compute) drops `90`.
  - Lifting `work` (Mono) → `about` (GiGi) & `kit` (Compute) drop `194`; `hello` (Sweet Heaven) drops `126` & tilts (`rot z +0.30, rot x -0.05`).
- **Crane & Door Timings:** Exact spec timings (`travel 0.22 + dist/2600`, `lower 0.36`, `grab 0.08`, `hoist 0.55`, `swing 0.7`, `doors open 0.42`, `doors close 0.17`, `pause 0.06`, `lower home 0.42`, `bounce 0.2`, `retract 0.3`). Click queueing keeps only latest target.

### 3.5 Projected Content Card & Case Study Modal (Opsi B)
- **Interior Card (`.dp-card`):** Projected from the 4 back-wall corners `(±(L/2-F), ±(H/2-F), -D/2+T)` of the hanging container; uses `--c = min(height/200, width/480) px` and `.tight` below `112px` height. Supports compact action row (`.dp-acts`) with accent primary button (`Detail Proyek` / `Case Study`) + outline link (`Lihat Demo ↗` / `Live Demo ↗`) that fits cleanly even inside cube containers (`GiGi`, `Compute`).
- **Case Study Modal (`.dp-modal`):** Dark slate editorial overlay (`#141724`, backdrop blur) triggered by `Detail Proyek`:
  - Top bar: project number (`01 / 04`), role, year, close `×` button.
  - Hero browser mockup frame with full screenshot (clickable to open live demo or fullscreen lightbox).
  - Description paragraphs + stack chips.
  - 3 zoomed detail crops (`NP_X[id].crops`) with localized captions.
  - Interactive color palette swatches (click to copy HEX with `Tersalin!` feedback).
  - Architecture & specs table (`rows`).
  - Footer: `Proyek Berikutnya →` button (cycles `01→02→03→04`) + `Lihat Demo ↗` button.

### 3.6 Header & Portfolio Integration
- Hide default `.pg.p5 > .pgb > .bk`, `.pnav`, and global custom cursor (`body.dp-active .zk-cur`) just like `p7 Fashion`, giving `p5` a clean, full-bleed 1-screen stage.
- Top nav (`.dp-nav`):
  - Left: **`zikri`** logo button (clicks return to Home wheel).
  - Right: **`← Beranda`** (returns to Home wheel) and **`Hubungi ↗`** (jumps to `p6 Kontak`).
- Escape handling (`window.__zkDepotEscape`):
  1. If Case Study modal is open → close modal.
  2. Else if a container is open → close container.
  3. Else → return `false` so `carousel.js` closes `p5` back to Home wheel.

---

## 4. Planned File Changes

1. [index.html](file:///home/zikripacaryuha/my-portofolio/index.html): Add `<script type="importmap">` for `three@0.160.0` + `three/addons/`, link `css/projects-depot.css`, load `<script type="module" src="js/projects-depot.js">`.
2. `css/projects-depot.css` *(new)*: Scoped `.pg.p5` layout, `@font-face` (`Archivo X`, `Manrope`), `.dp-stage`, `.dp-word`, `.dp-nav`, `.dp-pill`, `.dp-eyebrow`, `.dp-card`, `.dp-modal`, responsive & reduced-motion & RTL rules.
3. [js/projects.js](file:///home/zikripacaryuha/my-portofolio/js/projects.js): Keep & export all 8-language project case study data (`NP_DATA`, `NP_X`, `NP_I18N`, `NP_URL`) and add `NP_DEPOT_I18N` (all 8 languages for Depot UI, 7 container stencils, and 7 container card interiors).
4. `js/projects-depot.js` *(new ESM)*: Full Three.js `0.160.0` shipping depot + gantry crane physics + projected card + Case Study modal + live 8-language rebuild + deterministic `ZK3D.registerPage(5, ...)` cleanup.
5. [js/carousel.js](file:///home/zikripacaryuha/my-portofolio/js/carousel.js): Replace `PAGES[5]` with clean Depot HTML shell (`data-i18n-own="1"`), delegate `Escape` & arrow keys for `cur === 5`, remove legacy `initProjectSpatialStage` timeout calls.
6. [js/page-enhancers.js](file:///home/zikripacaryuha/my-portofolio/js/page-enhancers.js): Remove legacy `Z.registerPage(5, ...)` browser-flip enhancer so `projects-depot.js` is the sole controller of `p5`.

---

## 5. Verification Plan

1. Syntax check across all JS files (`node --check`, including ESM check on `js/projects-depot.js`).
2. Real browser verification via Playwright on Desktop (`1440×900`) and Mobile Portrait (`390×844`) + `prefers-reduced-motion: reduce`:
   - Confirm 0 console errors & 0 WebGL errors.
   - Click hero container `MONO LIVING` → verify crane travels, grabs, hoists, opens doors 122°, displays projected card, and drops `GIGI` / `COMPUTE` / tilts `SWEET HEAVEN`.
   - Click `Detail Proyek` → verify Case Study modal opens with screenshot, detail crops, and HEX swatch copy.
   - Close modal & container → verify reverse physics & clean return to pile.
   - Switch across all 8 languages (`id`, `en`, `zh`, `es`, `ar`, `fr`, `ja`, `ko`) → verify giant word, 3D container stencils, pill, card, and modal translate 100% with 0 mixed-language leaks.
   - Exit `p5` → return to Home → re-open `p5` → confirm WebGL cleanly disposes and remounts with zero errors.
