# Implementation Plan — Halaman Proyek (`p5`): "Zikri's Depot"

**Spec:** [2026-11-24-projects-depot-design.md](file:///home/zikripacaryuha/my-portofolio/docs/superpowers/specs/2026-11-24-projects-depot-design.md)
**Approach:** Opsi B — Full 1-screen 3D Shipping Container & Overhead Gantry Crane Depot (Three.js `0.160.0` ESM) + interactive Case Study Detail Modal, localized across all 8 portfolio languages (`id, en, zh, es, ar, fr, ja, ko`).

## Tasks

1. **Data & 8-Language Localization ([js/projects.js](file:///home/zikripacaryuha/my-portofolio/js/projects.js))**
   - Preserve `NP_DATA`, `NP_X`, `NP_I18N`, and `NP_URL` for all 4 featured projects (`mono`, `gigi`, `compute`, `sweet`) across all 8 languages.
   - Add `NP_DEPOT_I18N` containing localized giant word, top nav, pill, eyebrow, action labels, and all 7 container stencil + card entries (`work`, `about`, `kit`, `hello`, `process`, `do`, `archive`).
   - Export `window.ZK_PROJECTS = { DATA: NP_DATA, X: NP_X, I18N: NP_I18N, URL: NP_URL, DEPOT: NP_DEPOT_I18N }`.

2. **Depot & Modal Stylesheet ([css/projects-depot.css](file:///home/zikripacaryuha/my-portofolio/css/projects-depot.css))**
   - Register `@font-face` for `"Archivo X"` (weight `800 900`, `font-stretch: 125%`), `"Manrope"` (`200 800`), and `"Instrument Serif"` italic `400`.
   - Isolate `.pg.p5` cleanly (`#E27657` flat terracotta, hide default `.bk`, `.pnav`, `.bg`, `#zkBar`, and `body.dp-active .zk-cur`).
   - Implement exact layer styling for `.dp-stage`, `.dp-word`, `.dp-gl`, `.dp-card` (`.tight` and `.narrow` modifiers + staggered child entrance), `.dp-nav`, `.dp-pill`, `.dp-eyebrow`, visually hidden `#dpMenu`, Case Study modal `.dp-modal`, Arabic `[dir="rtl"]`, and `@media (prefers-reduced-motion: reduce)`.

3. **3D Container-Crane Engine & Case Study Modal ([js/projects-depot.js](file:///home/zikripacaryuha/my-portofolio/js/projects-depot.js))**
   - ES Module importing `three` and `three/addons/geometries/RoundedBoxGeometry.js` via importmap (`0.160.0`).
   - Build responsive `1440×900` landscape & portrait design-frame math + canvas `measureText` giant word sizing.
   - Build camera (`fov 20°`, `8°` downward pitch), renderer (`SRGB`, `NoToneMapping`, `PCFSoftShadowMap`), 4 lights, and `y = -742` shadow catcher.
   - Build procedural `64×4` corrugation normal map, hollow 7-container pile with proud frame bars, outward-hinged double doors + inner lock rods, and `1024`-wide `"Archivo X"` canvas stencil labels.
   - Build overhead steel rail, 140 instanced bolts, `RoundedBoxGeometry` trolley, dynamic cable, and spreader.
   - Implement raycast hover/click, latest-click queueing, exact travel/lower/grab/hoist/swing/doors/close/bounce/retract tweens, supporting-container gravity drops & return rides, back-wall 4-corner card projection, and pill overlap fade-out.
   - Implement Case Study Detail Modal (`openCaseModal`) with full screenshot, 3 zoomed detail crops, copy-HEX swatches, architecture specs, and Next Project cycling.
   - Wire live `zk-lang` updates (redraws all 7 stencil textures, giant word, open card, modal, and RTL), `window.__zkDepotEscape`, and deterministic GPU/RAF/event disposal via `window.ZK3D.registerPage(5, ...)`.

4. **Portfolio Shell Integration ([index.html](file:///home/zikripacaryuha/my-portofolio/index.html), [js/carousel.js](file:///home/zikripacaryuha/my-portofolio/js/carousel.js), [js/page-enhancers.js](file:///home/zikripacaryuha/my-portofolio/js/page-enhancers.js))**
   - Add `<script type="importmap">` in `index.html`, link `css/projects-depot.css`, load `<script type="module" src="js/projects-depot.js">`.
   - Replace `PAGES[5]` in `js/carousel.js` with `.dp-stage` shell (`data-i18n-own="1"`), add `Escape` / arrow / touch-swipe guards for `p5`, remove legacy `initProjectSpatialStage` calls.
   - Remove legacy `Z.registerPage(5, ...)` in `js/page-enhancers.js`.

5. **Verification**
   - Syntax check every file in `js/`.
   - Playwright browser audit across Desktop (`1440×900`), Mobile Portrait (`390×844`), all 8 languages, reduced motion, Case Study modal + HEX copy, and exit/re-entry disposal.
