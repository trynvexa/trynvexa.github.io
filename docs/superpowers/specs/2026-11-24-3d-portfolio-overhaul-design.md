# Design Spec: Full-Portfolio 3D & Motion Overhaul (Hybrid WebGL + CSS 3D)

**Date:** 2026-11-24  
**Author:** M. Zikri Al-Bukhori & Antigravity  
**Project:** `my-portofolio` (`https://trynvexa.github.io`)  
**Approach Selected:** Approach B — Hybrid (Maximal CSS 3D + Selective Three.js WebGL Centerpieces + Web Audio API)

---

## 1. Intent & The Why

The user wants to elevate **every single page** of the portfolio into a visually jaw-dropping (*"sangat memukau"*) experience with rich **3D animations and cohesive motion** across the entire site — while keeping all existing handcrafted features intact (Intro eye-tracking, `#buddy` jumping on 3D `PORTOFOLIO` letters, 3D Cardistry Radial Wheel, 8-language `i18n`, Light/Dark theme, 6 MP3 tracks, and mobile 60fps smoothness).

---

## 2. Goals, Non-Goals & Anti-Goals

### Goals
- Deliver unmistakable **3D depth, lighting, and tactile motion** on **Global/Home + all 7 detail pages** (`Story`, `Music`, `Me`, `Frame`, `Skill`, `Proyek`, `Kontak`).
- Introduce **real WebGL 3D centerpieces (Three.js)** on high-impact surfaces (Home 3D interactive backdrop field, Music 3D audio-reactive visualizer, Skill 3D draggable sphere/constellation) with automatic graceful fallback to lightweight Canvas 2D / CSS 3D on low-power devices or when WebGL is unavailable.
- Unify global micro-interactions: magnetic desktop cursor, View Transitions circular wipe for Light/Dark toggle, holographic foil glare on interactive 3D cards, and consistent scroll-reveal choreography.
- Preserve **100% of existing features**: 8-language i18n, accessibility (`prefers-reduced-motion`, keyboard navigation, ARIA), GitHub Pages static deployment (no build step required), and responsive mobile layouts.

### Non-Goals
- Rewriting the codebase into React/Vite/Next.js or introducing a bundler.
- Replacing the handcrafted SVG Intro (`intro.js`), `#buddy` character physics (`buddy.js`), or the 7-card Radial Wheel (`carousel.js`).
- Changing personal content, copywriting, or existing audio/image assets.

### Anti-Goals (What Would Make This a Failure)
- **Frame drops / jank** on mid-range mobile phones or desktop laptops (must keep compositor-only `transform`/`opacity` animations, pause hidden WebGL/RAF loops when a detail page is open or tab is hidden, and cap DPR).
- **Breaking offline / CDN failure**: if Three.js CDN fails to load, the site must still work seamlessly using the existing Canvas 2D and CSS 3D fallback.
- **Cluttered or unreadable UI**: 3D effects must frame and amplify content, never obscure text contrast or break tap targets (`>= 44px` on touch).

---

## 3. Constraints & Technical Architecture

- **Stack**: Static HTML5, Vanilla CSS (4 modular stylesheets + optional new `css/motion3d.css`), Vanilla ES6+ JS (14 existing modules + new modular 3D engine files, loaded with `defer`).
- **Three.js Integration (Builder Call)**: Load Three.js (`three.min.js`, r160+ UMD/ES module via jsDelivr/unpkg CDN with `defer` or dynamic import) guarded by a central `window.ZK3D` capability & performance tier manager (`tier: 'webgl' | 'lite' | 'reduced'`).
  - `reduced`: `prefers-reduced-motion: reduce` — all heavy 3D loops disabled.
  - `lite`: mobile `<= 700px` with low concurrency (`hardwareConcurrency <= 4`) or WebGL unavailable — uses optimized CSS 3D + existing Canvas 2D.
  - `webgl`: desktop & capable mobile — enables Three.js scenes, capped at `dpr <= 1.5`, automatically paused via `document.hidden` and when another overlay covers the canvas.
- **Cache Busting**: Bump `?v=370` query strings in `index.html` to `?v=380` on release.
- **Lifecycle Hygiene**: Detail pages (`p0`–`p6`) are dynamically injected into `#pgb` by `carousel.js`. Every 3D enhancer must cleanly mount via `MutationObserver` / page-open hooks and **dispose WebGL geometries/materials/RAF loops** when `#pg` closes so memory never leaks.

---

## 4. Approaches Considered

1. **Approach A — Full Native CSS 3D + Canvas 2D + Web Audio (Zero Dependency)**
   - *Trade-off*: Instant load and guaranteed 60fps everywhere, zero external scripts, but capped at 2.5D/CSS perspective without real WebGL 3D shaders or meshes.
2. **Approach B — Hybrid: Maximal CSS 3D + Selective Three.js WebGL Centerpieces *(Selected)***
   - *Trade-off*: Delivers true Awwwards-level 3D WebGL centerpieces on Home, Music, and Skill plus full CSS 3D upgrades across all 7 detail pages, while keeping all existing handcrafted 2D/SVG/i18n features intact and protecting mobile performance via `ZK3D` tiering & auto-fallback.
3. **Approach C — Full WebGL / Three.js Rebuild**
   - *Trade-off*: Maximum 3D camera immersion, but high risk of breaking existing handcrafted SVG Intro, `#buddy` letter physics, 8-language responsive typography, and mobile smoothness.

---

## 5. Detailed Design by Area

### 5.1 Global Engine (`js/motion3d.js` + `css/motion3d.css`)
- **Capability & Performance Manager (`window.ZK3D`)**: Detects WebGL, `prefers-reduced-motion`, `pointer: fine`, and device tier; exposes `onPageOpen(idx)` / `onPageClose()` lifecycle hooks and pauses Home background WebGL whenever `#pg.open` is active.
- **Magnetic Desktop Cursor & Interactive Pull** (`pointer: fine` only):
  - Lightweight trailing ring + dot cursor (`transform: translate3d`) that morphs state (`data-cursor="card" | "play" | "zoom" | "link"`) with subtle magnetic pull on primary buttons (`.bk`, `.arr`, `.theme-btn`, `.st-cta-btn`, `.me-btn-pri`, `.np-all-live`).
- **Circular Wipe Theme Transition** (`js/theme.js`):
  - Uses `document.startViewTransition` expanding a circular `clip-path` from `#themeToggle`'s exact click coordinates (graceful instant fallback on unsupported browsers).
- **Reusable 3D Tilt + Holographic Foil Glare Utility (`ZK3D.attachTilt(el, opts)`)**:
  - Spring-damped `rotateX/rotateY` + dynamic `--gx/--gy` rainbow specular sheen overlay, reused across Home cards, Me portrait, Frame grid cards, Proyek browser stage, and Kontak Dev Pass.

### 5.2 Intro & Home Stage
- **Home 3D WebGL Backdrop (`#bgWebgl` replacing only `#bgField`, keeping `#bgCinema` underneath)** *(Architectural Call)*:
  - Interactive Three.js 3D floating particle field & translucent glass-ribbon mesh rendered with `alpha: true` **on top of** `#bgCinema`'s blurred active-card photo crossfade (so the active card's photo mood remains visible in both Light and Dark modes).
  - Colored dynamically by the active card's palette (`__zkBgSetCard`), tilting subtly with pointer movement and swirling with wheel velocity (`__zkBgWheelSync`).
  - Automatically falls back to existing Canvas 2D `#bgField` on `lite`/`reduced` tiers.
- **Enhanced 3D Cardistry & Foil**:
  - Subtle holographic prism edge shimmer on `.card.on` during tilt/hover; crisp 3D depth shadow elevation.

### 5.3 Story (`p0`) — Cinematic 3D Red-Thread Journey
- **3D Scroll-Depth Chapter Cards**: Each existing `.st-ch` chapter enters with a subtle 3D perspective lift (`perspective(900px) rotateX(6deg) translateY(28px)` → flat) synchronized with scroll, with staggered reveals on `.st-life h3` and paragraphs.
- **Thread & Closing Glow** *(Architectural Call — uses existing DOM, no new untranslated `.st-q` added)*: Active chapter nodes on `.st-thread` emit a soft 3D radial aura; `.st-end` closing block enters with a dramatic masked rise; desktop portrait reacts with subtle vertical scroll-parallax.
- **Ambient Floating Embers**: Lightweight CSS/Canvas crimson dust particles drifting behind the dark editorial story canvas.

### 5.4 Music (`p1`) — 3D Vinyl Turntable + Real Web Audio Visualizer
- **Real-Time Audio Analyser**: Connect `<audio>` (`au`) via `AudioContext.createMediaElementSource` + `AnalyserNode` (gracefully handling CORS/autoplay/fallback synth) to extract live bass/mid/treble energy.
- **3D Perspective Turntable & Animated Tonearm (Preserving `music-cut.webp`)** *(Architectural Call)*:
  - Replace the large right-side background CSS pseudo-element (`.pg.p1 .bg::before`) with a real DOM `.vinyl-stage-3d` platter (`z-index: 0`) layered behind `music-cut.webp` (`z-index: 1`), tilted in 3D perspective with a metallic specular sweep and an animated SVG/CSS **tonearm** that smoothly pivots onto the record when playing and lifts when paused.
  - Also enhance the `.np` mini-player's `.npd` vinyl disc with beat-reactive pulse glow so mobile users get the full reactive experience too.
- **3D Audio-Reactive Visualizer Ring (Three.js / Canvas fallback)**:
  - A glowing 3D circular frequency wave/ring around `.vinyl-stage-3d` that pulses and ripples in real time with the MP3 bass & treble, tinted by the active track's `--acc` / `--acc2`.

### 5.5 Me (`p2`) — 3D Editorial Portrait & Living Typography
- **3D Parallax Portrait Stage** *(Architectural Call — uses existing `.p2 .bg img`, no new `.me-cap` injected)*: Desktop right-side portrait gains smooth pointer-driven 3D parallax & subtle depth vignette while scrolling.
- **Animated Highlighter Strokes**: `.me-bio strong` yellow highlight sweeps left-to-right like a real marker stroke when scrolled into view.
- **3D Staggered Fact Cards & Tech Chips**: `.me-f > div` and `.me-chip` get tactile 3D lift + specular border highlight on hover.

### 5.6 Frame / Gallery (`p3`) — 3D Viewfinder & Aperture Studio
- **3D Depth Ring & Tilt**: Enhance existing 3D ring stage with deeper perspective tilt + subtle viewfinder HUD telemetry (dynamic focal/angle readout that updates live as the ring spins).
- **Camera Shutter Micro-Animation**: Opening a photo into the existing FLIP Lightbox triggers a crisp 180ms shutter-corner pulse and subtle aperture flash.
- **Editorial Grid 3D Tilt**: `.ggrid-card` cards get `ZK3D.attachTilt` with 3D elevated caption badges.

### 5.7 Skill (`p4`) — Hand-Anchored 3D Skill Sphere + Animated Telemetry
- **Hand-Anchored 3D Skill Sphere (Preserving `skill-fig.webp` & `skfx`)** *(Architectural Call)*:
  - Keep Zikri's iconic `assets/images/skill-fig.webp` and existing `skfx` category dock/modal intact, and upgrade `.sk-orbit` anchored over his hand into an **interactive 3D spherical/orbital constellation** (3D depth Z-sorting, pointer/touch drag tilt, glowing WebGL orbital energy ring behind the hand on `webgl` tier, smooth CSS 3D fallback on `lite` tier). Clicking any orbiting icon still opens the existing detail modal and respects category filters.
- **Animated Count-Up Conic Rings**: `.sk-bar .sk-rg` animates `--rp` from `0` to target percentage and counts up the bold number via `IntersectionObserver` when scrolled into view.

### 5.8 Proyek (`p5`) — 3D Floating Spatial Browser Stage
- **Multi-Layer 3D Browser Mockup**: `#npFrame` becomes a true `preserve-3d` stage where the browser chrome, live screenshot, floating project number badge, and ambient glow sit on distinct `translateZ` planes that tilt smoothly with the pointer.
- **3D Curtain/Flip Case Study Switch**: Switching between *Mono, GiGi, Compute, Sweet Heaven* plays a crisp 3D perspective transition.
- **HEX Copy Micro-Spark**: Clicking any color palette swatch triggers a localized particle spark burst + tactile pill bounce.
- **All-Projects Grid 3D Cards**: `.np-all-card` gets `ZK3D.attachTilt` + accent rim glow.

### 5.9 Kontak (`p6`) — Prismatic 3D Dev Pass & Tactile Print Studio
- **Upgraded Prismatic Holographic 3D Dev Pass**:
  - Add multi-layer `translateZ` depth inside `.pass-card` (background foil, portrait/text layer, holographic rainbow sheen mask responding to tilt angle) for both front and back faces.
- **Tactile Stamp / Paper-Slip Animation**:
  - Clicking "Salin Email" or submitting Quick Composer triggers an animated editorial ink-stamp confirmation ("TERKIRIM / COPIED") with spring bounce.

---

## 6. Decisions Left to the Builder

- Exact Three.js CDN URL & pinned version (e.g., `three@0.160.0` via `cdn.jsdelivr.net` with `onerror` fallback to `lite` mode).
- Exact spring stiffness/damping constants and `translateZ` pixel depths tuned during visual verification in browser.
- Internal helper naming inside `js/motion3d.js` and `css/motion3d.css`.
- Whether Music's `AudioContext` uses `crossOrigin="anonymous"` only when served over HTTP(S) (to avoid `file://` tainting) with automatic fallback to BPM-synced synthetic energy curves when running locally via `file://`.
