# Full-Portfolio 3D & Motion Overhaul Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Upgrade Global/Home and all 7 detail pages (`Story`, `Music`, `Me`, `Frame`, `Skill`, `Proyek`, `Kontak`) with cohesive CSS 3D depth, Three.js WebGL centerpieces, Web Audio real-time beat visualizer, and tactile micro-interactions while preserving 100% of existing features and 60fps mobile fluidity.

**Architecture:** Modular vanilla HTML/CSS/JS layered on top of existing files via one new stylesheet (`css/motion3d.css`) and three focused JS modules (`js/motion3d.js`, `js/webgl-scenes.js`, `js/page-enhancers.js`), plus minimal non-breaking hooks in `index.html`, `js/theme.js`, `js/background.js`, and `js/music.js`. A central `window.ZK3D` capability/lifecycle manager handles tiering (`webgl` | `lite` | `reduced`), automatic fallback if Three.js CDN fails, and deterministic cleanup on page close.

**Tech Stack:** HTML5, Modern CSS (`preserve-3d`, `@property`, View Transitions API), Vanilla ES6+ JavaScript, Three.js r160 (CDN with auto-fallback), Web Audio API (`AnalyserNode`), Playwright (browser verification).

**Spec:** `docs/superpowers/specs/2026-11-24-3d-portfolio-overhaul-design.md`

## Global Constraints

- Static vanilla HTML/CSS/JS only — zero build step, deployable directly to GitHub Pages (`trynvexa.github.io`).
- Preserve all existing personal assets (`skill-fig.webp`, `music-cut.webp`, `#bgCinema` blurred card photos), SVG Intro, `#buddy` physics, 3D Cardistry wheel, and 8-language `i18n` without adding untranslated copy.
- Respect `prefers-reduced-motion: reduce` everywhere (disabling heavy 3D loops, cursor morphing, and WebGL).
- Cap WebGL DPR at `<= 1.5`, pause hidden WebGL/RAF loops when `document.hidden`, `intro-on`, or overlaid by `#pg.open`, and dispose WebGL resources on detail page close.
- Bump asset cache-bust query strings in `index.html` from `?v=370` to `?v=380`.

## Review Focus

1. **Three.js CDN unavailable / offline**: Site must degrade silently to `tier: 'lite'` (Canvas 2D + CSS 3D) with zero uncaught errors and working Home backdrop, Music visualizer, and Skill orbit.
2. **Rapid detail page switching (`p0`→`p6`, open/close cycles)**: Previous page's RAF loops, `IntersectionObserver`s, and WebGL renderers must dispose cleanly without stacking contexts or leaking WebGL contexts.
3. **Web Audio autoplay / `file://` CORS restrictions**: Connecting `AnalyserNode` must never mute `<audio>` playback or throw `InvalidStateError` on repeated play/pause or `file://` origin; must fall back seamlessly to BPM-synced synthetic energy curves.
4. **Touch / Mobile viewports (`<= 700px`)**: Magnetic cursor must never appear on coarse pointers, tap targets remain `>= 44px`, and Music/Skill/Kontak 3D enhancements must not clip or overflow horizontally.
5. **View Transitions API fallback**: Clicking `#themeToggle` in browsers without `document.startViewTransition` (or with `prefers-reduced-motion: reduce`) must still toggle theme cleanly and persist to `localStorage`.

---

### Task 1: Core Global 3D System (`css/motion3d.css`, `js/motion3d.js`, `js/theme.js`, `index.html`)

**Files:**
- Create: `css/motion3d.css`
- Create: `js/motion3d.js`
- Modify: `js/theme.js:1-39`
- Modify: `index.html:51-55,110-118,282-296`

**Interfaces:**
- Produces:
  - `window.ZK3D = { tier, isReduced, isFine, hasThree(), whenThree(fn), registerPage(idx, mountFn), attachTilt(el, opts), spawnSparks(x, y, color, count), showStamp(container, text), isDark() }`
  - Custom window event `'zk-theme'` dispatched with `{ detail: { theme: 'light'|'dark' } }` on theme toggle.
  - `#bgWebgl` canvas element inside `.bgfx`.

- [ ] **Step 1: Create `css/motion3d.css`**
  - Define View Transitions circular wipe (`::view-transition-old(root)` / `::view-transition-new(root)` using `--vt-x`, `--vt-y`, `--vt-r`), magnetic desktop cursor (`.zk-cur`, `.zk-cur-ring`), reusable holographic tilt/glare (`.zk-tilt3d`, `.zk-holo-foil`), spark particles (`.zk-spark`), ink-stamp (`.pr-stamp`), and page-specific 3D styles for Home + `p0` through `p6`, all guarded by `@media (prefers-reduced-motion: reduce)`.
- [ ] **Step 2: Create `js/motion3d.js`**
  - Implement `window.ZK3D` tier detection (`webgl` / `lite` / `reduced`), Three.js readiness poll/hook, `MutationObserver` page lifecycle manager (`registerPage` with guaranteed cleanup on page switch/close), `attachTilt(el, opts)`, `spawnSparks(x, y, color, count)`, `showStamp(container, text)`, and magnetic desktop cursor (`pointer: fine` only).
- [ ] **Step 3: Upgrade `js/theme.js`**
  - Wrap theme toggle in `document.startViewTransition` (when supported & motion allowed) computing `--vt-x`, `--vt-y`, `--vt-r` from `#themeToggle`'s bounding rect; dispatch `'zk-theme'` event.
- [ ] **Step 4: Wire `index.html`**
  - Add `css/motion3d.css?v=380`, `#bgWebgl` inside `.bgfx`, Three.js r160 CDN `<script defer>`, and `js/motion3d.js`, `js/webgl-scenes.js`, `js/page-enhancers.js` (`?v=380`), bumping all `?v=370` to `?v=380`.
- [ ] **Step 5: Verify syntax & baseline load**
  - Run `node --check js/motion3d.js js/theme.js` and verify clean parse.

---

### Task 2: Three.js WebGL Centerpieces & Canvas 2D Fallbacks (`js/webgl-scenes.js`, `js/background.js`)

**Files:**
- Create: `js/webgl-scenes.js`
- Modify: `js/background.js:55-120,224-291`

**Interfaces:**
- Consumes: `window.ZK3D`, `window.__zkBgSetCard`, `window.__zkBgWheelSync`, `window.__zkBgPulse`, `'zk-theme'` event.
- Produces:
  - `window.__zkWebglBgActive` (boolean) and `window.__zkWebglBgSync` (`{ setCard(idx), setWheel(pos, lean), pulse() }`).
  - `window.ZK3D.mountMusicVisualizer(container, getAudioState)` -> `cleanup()`.
  - `window.ZK3D.mountSkillWebgl(stageEl)` -> `{ setColor(hex), pulse(strength), setTilt(nx, ny), destroy() }`.

- [ ] **Step 1: Add bridge hooks in `js/background.js`**
  - Forward `setCard`, `wheelSync`, and `pulse` calls to `window.__zkWebglBgSync` when present; skip redundant 2D canvas drawing in `draw()` while `window.__zkWebglBgActive === true` (keeping `#bgCinema` crossfades active).
- [ ] **Step 2: Create `js/webgl-scenes.js`**
  - **Home WebGL Backdrop (`#bgWebgl`)**: Transparent Three.js scene (`alpha: true`, `dpr <= 1.5`) with 2 sculpted translucent liquid-silk wave ribbons + 110 soft bokeh particles driven by active card palette, pointer parallax, wheel velocity, and theme; auto-pauses when hidden/`intro-on`/`#pg.open`.
  - **Music 3D Audio-Reactive Visualizer**: Three.js tilted 3D circular frequency ring (64 harmonic bars + glowing outer torus + beat sparks) around `.vinyl-stage-3d`, with seamless Canvas 2D radial visualizer fallback for `lite` tier; disposes geometries/materials/renderer on cleanup.
  - **Skill 3D Gyroscopic Energy Rings**: Three.js nested translucent wireframe rings + orbiting energy sparks anchored to `.sk-orbit`'s center over `skill-fig.webp`'s hand, reacting to pointer tilt, category color `--cc`, and `skfx` pulses; disposes cleanly on close.
- [ ] **Step 3: Verify syntax**
  - Run `node --check js/webgl-scenes.js js/background.js`.

---

### Task 3: Web Audio Telemetry Hook & All 7 Page 3D Enhancers (`js/music.js`, `js/page-enhancers.js`)

**Files:**
- Modify: `js/music.js:22-105,152-218`
- Create: `js/page-enhancers.js`

**Interfaces:**
- Consumes: `window.ZK3D`, `window.ZK3D.mountMusicVisualizer`, `window.ZK3D.mountSkillWebgl`, `window.galOpen`.
- Produces:
  - `window.__zkMusicAudio` with `getState()` returning `{ playing, sim, bpm, rot, cur, acc, acc2, bass, mid, treble, bins }`.
  - Registered enhancers for pages `0` (`Story`), `1` (`Music`), `2` (`Me`), `3` (`Frame`), `4` (`Skill`), `5` (`Proyek`), `6` (`Kontak`).

- [ ] **Step 1: Add Web Audio `AnalyserNode` telemetry in `js/music.js`**
  - Lazily attach `AudioContext` + `AnalyserNode` (`fftSize: 128`) to `<audio>` on user play when running on `http:`/`https:`, falling back gracefully to smooth BPM-synced harmonic FFT bins when in Studio Synth mode or `file://` origin. Expose `window.__zkMusicAudio.getState()`.
- [ ] **Step 2: Create `js/page-enhancers.js`**
  - **`p0` (Story)**: `IntersectionObserver` 3D chapter perspective reveal (`.st-ch.in-3d`), desktop portrait scroll parallax, active thread node aura, ambient crimson embers canvas inside `.pg.p0 .bg`.
  - **`p1` (Music)**: Inject `.vinyl-stage-3d` (3D perspective platter + spinning grooves + dynamic label + animated pivoting SVG tonearm) behind `music-cut.webp`, mount `ZK3D.mountMusicVisualizer`, and drive real-time `--beat` glow on `.np`/`.npd` & `.vinyl-stage-3d`.
  - **`p2` (Me)**: `IntersectionObserver` highlighter marker sweep on `.me-bio strong` & `.me-q`, desktop pointer/scroll 3D parallax on `.p2 .bg img`, `ZK3D.attachTilt` on `.me-f` card.
  - **`p3` (Frame)**: Live viewfinder HUD telemetry (`.gvf-hud`) syncing with `.gidx`, camera shutter-blink micro-animation (`.gshutter`) hooked around Lightbox open, and `ZK3D.attachTilt` on `.ggrid-card`.
  - **`p4` (Skill)**: Upgrade `.sk-orbit` with layered 3D ring depths (`translateZ`), interactive 360° pointer/touch drag tilt + `ZK3D.mountSkillWebgl` anchored over Zikri's hand (syncing with `skfx` events & category `--cc`), plus `ZK3D.attachTilt` on `.sk-pc`, `.sk-stat`, `.sk-st`.
  - **`p5` (Proyek)**: Upgrade `#npFrame` to multi-layer `preserve-3d` stage with dynamic glass glare + 3D project-switch flip feel, HEX swatch `ZK3D.spawnSparks` on `.np-sw-btn` click, and `ZK3D.attachTilt` on `.np-all-card` & `.np-cw`.
  - **`p6` (Kontak)**: Inject prismatic rainbow diffraction layer (`.pass-prism`) + multi-layer `translateZ` depth inside `.pass-card`, plus `ZK3D.showStamp` editorial ink-stamp confirmation on `#copyEmailBtn`, `#prcWaBtn`, and `#prcMailBtn`.
- [ ] **Step 3: Verify syntax**
  - Run `node --check js/music.js js/page-enhancers.js`.

---

### Task 4: Full Browser Verification (Desktop + Mobile + All 7 Pages) & Polish

**Files:**
- Verify: `index.html`, `css/motion3d.css`, `js/motion3d.js`, `js/webgl-scenes.js`, `js/page-enhancers.js`, `js/theme.js`, `js/background.js`, `js/music.js`

- [ ] **Step 1: Syntax-check all JS files**
  - Run `for f in js/*.js; do node --check "$f" || exit 1; done`.
- [ ] **Step 2: Serve locally & inspect with Playwright MCP**
  - Launch `python3 -m http.server 8765` as background task.
  - Navigate to `http://127.0.0.1:8765`, dismiss Intro, verify zero console errors, verify Home WebGL backdrop, Light/Dark circular wipe toggle, and open & inspect **all 7 pages** (`p0` Story, `p1` Music + play audio, `p2` Me, `p3` Frame + lightbox, `p4` Skill + modal, `p5` Proyek + switch + HEX copy, `p6` Kontak + flip card + copy email).
  - Resize to mobile viewport (`390x844`) and verify layout & zero horizontal overflow.
  - Take key verification screenshots, fix any visual/CSS/JS issues found, and stop the local HTTP server.
- [ ] **Step 3: Git status & clean commit**
  - Review `git status` and `git diff --stat`, commit cleanly if appropriate (leave repo clean with no leftover scratch files).
