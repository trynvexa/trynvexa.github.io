# Card #10 (`Food` v2 — Gesture Lazy-Susan + Scroll-Scrubbed Video) Implementation Plan

> **For agentic workers:** Executing inline (Native) per user preference. Steps use checkbox (`- [ ]`) syntax.

**Goal:** Upgrade Card #10 (`Food` — `TASTE LAB`) into a zero-button, gesture-first culinary showcase featuring a single top-left mascot Home pill, a directly draggable marble lazy-susan turntable (`100svh`), and a `360svh` sticky Canvas 2D scroll-scrubbed cinematic video stage (`72` WebP frames/dish via `ffmpeg`) synchronized with 4 localized editorial narrative beats.

**Architecture:** Extract `5 × 72 = 360` `960×540` WebP frames from `assets/food/videos/*.mp4` into `assets/food/frames/{slug}/00.webp..71.webp`. Rewrite `js/food-data.js`, `css/food.css`, and `js/food.js` strictly scoped to `.pg.p9`, replacing Act 2 cutout drops and all buttons (hamburger, CTA, prev/next/replay) with direct pointer/touch turntable dragging + damped Canvas scroll-scrubbing locked to the centered dish. Clean up obsolete `assets/food/assembly/` and raw `.mp4` originals after visual verification.

**Tech Stack:** Vanilla HTML5, CSS3, ES5/ES6 IIFE JavaScript, Canvas 2D, `ffmpeg` (`libwebp`), Prettier, Playwright MCP.

**Spec:** [docs/superpowers/specs/2026-11-28-food-v2-scroll-video-design.md](file:///home/zikripacaryuha/my-portofolio/docs/superpowers/specs/2026-11-28-food-v2-scroll-video-design.md)

## Global Constraints
- Strictly **1 `<button>`** inside `.pg.p9`: the top-left mascot head (`assets/images/mascot-head.webp`) + `← Beranda` Home button. Zero other buttons anywhere in `.pg.p9`.
- Zero frameworks, zero build step, strict CSP (`img-src 'self' data: blob:`), strict `.pg.p9` CSS scoping (`--u` on `.fd-stage`, never `:root`).
- Brand-lock `TASTE LAB` & 5 2-line Act 1 dish titles in uppercase Latin; localize Home button, gesture cues, all 4 editorial beats per dish, and ingredient notes across all 8 languages (`id`, `en`, `zh`, `es`, `ar`, `fr`, `ja`, `ko`) + RTL (`ar`).
- Deterministic lifecycle: closing `.pg.p9` cancels all rAFs/timers, disconnects observers, removes listeners, and removes `body.fd-active` (`0%` idle CPU/GPU).

## Review Focus
- **Axis-locking conflict between horizontal turntable drag & vertical page scroll:** Touch/mouse dragging vertically must never spin the marble ring or block scroll, while horizontal dragging must rotate smoothly 1:1 without jittering the scroll position.
- **Instant scroll before all 72 frames finish loading:** Preloading `00.webp` for all 5 dishes immediately + coarse 9 keyframes first must ensure the canvas renders the nearest available loaded frame cleanly (never flashes blank/black!).
- **Switching dishes after scrolling back up:** Scrolling down on Ramen, scrolling back up, dragging the turntable to Steak or Chicken Katsu, and scrolling down again must cleanly load and scrub the new dish's frames and 4 editorial beats without ghost frames from Ramen.
- **Mobile portrait text vs. centered bowl framing (`360×640`, `390×844`):** Bottom frosted narrative beat card must leave the centered bowl and pouring stream clearly visible above it, with `0px` horizontal overflow across all 8 languages including Arabic RTL.
- **Reduced motion & idle CPU:** `prefers-reduced-motion: reduce` disables auto-rotation and steps cleanly across 4 key frames (`00, 24, 48, 71`) with zero continuous rAF; when scroll settles in normal mode, the Canvas rAF loop automatically sleeps (`0%` idle CPU).

---

### Task 1: Extract & Verify 360 WebP Scroll Frames via `ffmpeg`
- [ ] Run RED test `test_food_v2_frames.py` verifying failure before extraction.
- [ ] Extract `72` evenly spaced `960×540` WebP frames (`00.webp`..`71.webp`, q=76) per dish from `assets/food/videos/1-ramen.mp4`..`5-chicken-katsu.mp4` into `assets/food/frames/{slug}/`.
- [ ] Run `test_food_v2_frames.py` (GREEN: 360/360 valid WebP, `960×540`, total payload `< 10 MB`).

### Task 2: Rewrite `js/food-data.js` for v2 Scroll Video & 4 Localized Beats
- [ ] Run RED test `test_food_v2_data.mjs`.
- [ ] Update `js/food-data.js` with `FRAME_COUNT: 72`, per-dish `framesDir`, `videoBg`, `videoBgBottom`, 4 chronological localized `beats` (`kicker`, `title`, `body`, optional static `tags`) across all 8 languages, and clean zero-button `UI` strings.
- [ ] Verify `test_food_v2_data.mjs` GREEN + `node --check js/food-data.js`.

### Task 3: Rewrite `css/food.css` for Scrollable `.pg.p9`, Mascot Home Pill & Editorial Beats
- [ ] Run RED test `test_food_v2_css.mjs`.
- [ ] Rewrite `css/food.css` strictly scoped under `.pg.p9`, `body.fd-active`, `.card.foodphoto`, `html[data-rtl="1"] .pg.p9`: scrollable `.pg.p9`, single top-left `.fd-home-btn` with mascot head + arrow + label, draggable `100svh` `.fd-hero-sec` (`cursor: grab/grabbing`, quiet scroll/drag typographic cues, zero CTA/menu), seamless gradient bridge, `360svh` `.fd-story-sec` with `100svh` sticky `.fd-vid-canvas`, high-contrast frosted alternating left/right editorial `.fd-beat` cards (bottom-anchored on mobile portrait), hairline `.fd-progress-rail`, RTL mirroring, reduced motion.
- [ ] Verify `test_food_v2_css.mjs` GREEN.

### Task 4: Rewrite `js/food.js` & Update `js/carousel.js` Touch/Scroll Hooks
- [ ] Run RED test `test_food_v2_engine.mjs`.
- [ ] Rewrite `js/food.js` with horizontal pointer/touch turntable drag + directional axis lock + velocity flick inertia snap, side-dish tap rotate, auto-lock active dish on drag or scroll (`scrollTop >= 30`), progressive coarse-first WebP frame loader with nearest-loaded fallback, HiDPI `<canvas>` smart centered cover framing (desktop centered / mobile nudged up), exponentially damped scroll scrubbing with automatic sleep when settled (`0%` idle CPU), 4-beat smooth scroll transitions, live 8-language sync, reduced-motion 4-keyframe mode, and deterministic cleanup.
- [ ] Verify `js/carousel.js` permits smooth vertical scroll on `.pg.p9` while blocking horizontal card-swipe takeover.
- [ ] Verify `test_food_v2_engine.mjs` GREEN + `node --check`.

### Task 5: Cleanup Obsolete Assets, Multi-Viewport Playwright QA, Whole-Branch Review & Live Chrome Preview
- [ ] Run full multi-viewport Playwright QA (`1440×900`, `768×1024`, `390×844`, `360×640`, `844×390`): assert strictly 1 `<button>` in `.pg.p9`, test horizontal drag → scroll down → scroll up → drag to another dish → scroll down, inspect screenshots across all 4 scroll beats on desktop & mobile, verify 8 languages + RTL + reduced motion + zero errors/regressions.
- [ ] Remove obsolete `assets/food/assembly/` and raw `assets/food/videos/*.mp4`, format with Prettier, commit cleanly on `feat/food-v2-scroll`, run whole-branch code review (`Model: "pro"`), fix any Important findings RED → GREEN, and open live preview for the user in Chrome!
