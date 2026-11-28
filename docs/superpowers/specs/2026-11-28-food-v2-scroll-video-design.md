# Design Spec — Card #10: `Food` v2 (`TASTE LAB` — Gesture Lazy-Susan + Scroll-Scrubbed Cinematic Video)

- **Date:** 2026-11-28
- **Target Repo:** `/home/zikripacaryuha/my-portofolio` (vanilla HTML/CSS/JS, zero framework, zero npm build step, GitHub Pages)
- **Supersedes:** Act 2 cutout-drop overlay from `2026-11-28-food-card-design.md` (Card #10 `.pg.p9`)

---

## 1. Intent & Why

Upgrade Card #10 (`Food` — `TASTE LAB`) from a button-triggered cutout drop modal into a **zero-button, gesture-first editorial culinary showcase**:

1. **Pure Gesture & Zero Button Clutter:** Remove the top-right 3-line hamburger menu button, remove the `RAKIT MENU` CTA button, and remove all prev/next/replay/switcher buttons. The **only** clickable chrome on the entire page is the portfolio-consistent **Home Back button** in the top-left corner featuring Zikri's mascot head (`assets/images/mascot-head.webp` + `← Beranda`, matching Card #8 `Fashion`).
2. **Direct-Manipulation Draggable Marble Lazy-Susan (Hero — `100svh`):** Visitors physically drag/swipe the marble turntable left or right with mouse or finger to rotate the 5 dishes into center position (live 1:1 rotation + pastel crossfade + smooth flick inertia snap).
3. **Scroll-Scrubbed Cinematic Video Storytelling (`~360svh` Sticky Track):** Scrolling down locks onto whichever dish is currently centered on the turntable and scrubs that dish's real slow-motion cinematic studio video forward/backward at 60 FPS (`ffmpeg`-processed WebP frame sequence on `<canvas>`), paired with 4 synchronized editorial narrative beats explaining the vessel, pour, falling ingredients, and Zikri's personal story. Scrolling back up smoothly rewinds the video to the turntable so the visitor can spin to another dish and scroll again.

---

## 2. Goals, Non-Goals & Anti-Goals

### Goals
- **One button only:** Top-left mascot head + `← Beranda` back button (consistent with `Fashion` & other portfolio cards, localized across 8 languages + RTL). Zero other buttons anywhere in `.pg.p9`.
- **Tactile lazy-susan drag:** Horizontal mouse drag & touch swipe rotate the marble ring directly (`cursor: grab`/`grabbing`), with directional axis-locking so vertical scroll down to the video stage is never blocked or hijacked. Clicking a side dish (`diff ≈ ±1`) smoothly rotates it to center without adding buttons.
- **Active-dish synchronized scroll video:** Scrolling past the hero plays the **currently centered dish's** cinematic video scrubbed 1:1 to scroll progress (`0% → 100%`) with smooth exponential damping (`60 FPS`, instant reverse rewind on scroll up, zero iOS/Android `<video>` seek stutter).
- **Editorial 4-beat narrative:** Crisp, high-contrast (`≥ 9:1`) floating text cards reveal & dissolve across 4 scroll ranges (`0–24%`, `24–52%`, `52–78%`, `78–100%`) synchronized with each dish's actual video beats, localized across all **8 languages** (`id`, `en`, `zh`, `es`, `ar`, `fr`, `ja`, `ko`) + RTL (`ar`).
- **Lean GitHub Pages delivery & cleanup:** Process all 5 `1920×1080` raw `.mp4` videos (`24 MB`) via `ffmpeg` into 5 lightweight `960×540` WebP frame sequences (`72 frames/dish`, `~1.0–1.6 MB/dish`, lazy-loaded on demand for the active dish only), then delete the unused `assets/food/assembly/` folder (`~2 MB`) and the 24 MB raw `.mp4` originals so repo weight stays lean.

### Non-Goals
- No modal overlays, drawer menus, CTA buttons, replay buttons, or dish-switcher button bars.
- No audio playback (pure silent editorial cinema; avoids autoplay blockers and keeps mobile light).
- No changes to Cards #0–#8 (`Story` through `Rumah`) or the Home radial wheel.

### Anti-Goals (Failure Conditions)
- Horizontal drag hijacking vertical scroll (or vertical scroll accidentally spinning the turntable).
- Blank/black canvas frames when scrolling down immediately after opening or changing dishes.
- Text overlays covering the falling food or becoming unreadable over the studio video backdrop on desktop or mobile (`360×640`, `390×844`, `844×390`).
- Stuttering scroll playback, memory leaks across dish switches, or active rAF loops after closing `.pg.p9`.

---

## 3. Verified Source Videos & Asset Pipeline

All 5 user-generated Google Flow videos under `assets/food/videos/` have been visually verified (`1920×1080`, `24fps`, rock-solid tripod lock, subject strictly centered in middle 55% safe zone):

| # | Slug | Source Video | Duration | Studio Edge Tint (top / bottom) | Runtime Output Folder |
| :-: | --- | --- | :-: | --- | --- |
| 0 | `ramen` | `1-ramen.mp4` | `14.92s` | `#C8B99C` / `#DCD0B9` | `assets/food/frames/ramen/00.webp`..`71.webp` |
| 1 | `steak` | `2-steak.mp4` | `14.92s` | `#708793` / `#A6BAC6` | `assets/food/frames/steak/00.webp`..`71.webp` |
| 2 | `ayam-geprek` | `3-ayam-geprek.mp4` | `14.92s` | `#BF9270` / `#DBB28E` | `assets/food/frames/ayam-geprek/00.webp`..`71.webp` |
| 3 | `spaghetti` | `4-spaghetti.mp4` | `14.92s` | `#94A685` / `#A8BA9F` | `assets/food/frames/spaghetti/00.webp`..`71.webp` |
| 4 | `chicken-katsu` | `5-chicken-katsu.mp4` | `12.62s` | `#9B835C` / `#DCCEA6` | `assets/food/frames/chicken-katsu/00.webp`..`71.webp` |

### Frame Sequence Processing Rules (`ffmpeg`)
- Extract **72 evenly spaced frames** (`00.webp` .. `71.webp`) per dish at `960×540` (`16:9`), `libwebp` quality `76`, `-compression_level 6`.
- Target size: `~1.0–1.8 MB` per dish (`~6–8.5 MB` total across all 5 dishes vs `24 MB` raw `.mp4`).
- **Progressive Preloading Strategy:**
  1. On opening `.pg.p9`: immediately load `00.webp` (empty plate) of all 5 dishes (`~75 KB` total) so the canvas ALWAYS has a crisp first frame ready.
  2. For the active centered dish: fetch 9 coarse key frames first (`0, 9, 18, 27, 36, 45, 54, 63, 71`) so instant scrolling scrubs cleanly within milliseconds, then fill the remaining 63 frames in parallel batches (`concurrency = 6`) into an in-memory `Image` cache.
  3. Switching to another dish on the turntable cancels any low-priority fetches for the previous dish and immediately prioritizes the newly selected dish (retaining already-cached dishes in memory for instant re-visits).
- **Cleanup:** After visual verification in Playwright, remove obsolete `assets/food/assembly/` and raw `assets/food/videos/*.mp4`.

---

## 4. Two-Section Vertical Scroll Architecture (`.pg.p9`)

Unlike v1's fixed `overflow: hidden` single screen, `.pg.p9` becomes a **smooth vertical scroll container** (`overflow-y: auto; overflow-x: hidden; -webkit-overflow-scrolling: touch;`) hosting two seamless sections over `--fd-bg`:

### 4.1 Fixed Portfolio-Consistent Home Button (Only Interactive Chrome)
- Top-left fixed pill (`.fd-home-btn`, matching Card #8 `Fashion` header aesthetic):
  - Zikri mascot head icon (`assets/images/mascot-head.webp`, `28px` circular badge) + hairline arrow `←` + localized `Beranda` / `Home` label.
  - High-contrast frosted pill (`background: rgba(255, 252, 247, 0.82); backdrop-filter: blur(12px); color: #1a1614; border: 1px solid rgba(26, 22, 20, 0.16);`), crisp `:focus-visible` ring, full RTL mirroring (`right` in `ar`, arrow flipped).
  - Clicking closes `.pg.p9` back to the Home radial wheel cleanly.

### 4.2 Section 1 — Draggable Marble Lazy-Susan Hero (`.fd-hero-sec`, `height: 100svh`)
- Preserves the exact Gelato Lab layout (`--u` design unit, `.fd-waves`, veined marble ring + unclipped shadow, 5 dishes, 5 static props, `TASTE LAB` in `Dela Gothic One` overlapped by the center dish, `—— FAVORIT ——` eyebrow, 2-line brand-locked dish title).
- **Removed:** Top-right hamburger button, popover drawer, and `RAKIT MENU` button.
- **Added Pure-Typography Affordances (`pointer-events: none`, zero buttons):**
  - Subtle animated hairline cue below the dish title: **`↓  SCROLL`** (localized, e.g. `↓ GULIR KE BAWAH` / `↓ SCROLL DOWN`) + micro drag whisper **`← GESER MEJA →`** (`← DRAG TABLE →`).
- **Direct Drag & Swipe Mechanics:**
  - Pointer drag (`pointerdown` → axis detection after `8px` move: if `|dx| >= |dy| * 1.15`, lock horizontal turntable drag; otherwise yield immediately to native vertical scroll!).
  - Live 1:1 rotation: `curP = startP - dx / dragPxPerStep` (`dragPxPerStep = isPortrait ? 175 : 290`), continuously updating marble ring angle, bowl positions/scales, `--fd-bg`, `--fd-ink`, and dish title in real time!
  - Release inertia & spring settle: estimates release velocity (`vx`), projects target integer step (`Math.round(curP - vx * 0.14)`), and eases smoothly onto that dish via `easeTurn`.
  - Side-dish tap/click: tapping a visible side bowl (`diff ≈ ±1`) rotates it smoothly into center.
  - Auto-rotation: gentle idle rotation (`HOLD = 2400ms`, `TURN = 550ms`) ONLY while at the top (`scrollTop < 30`) and before the user manually drags a dish; once the user drags or scrolls down (`scrollTop >= 30`), the selected dish locks cleanly so it never switches unexpectedly mid-scroll.
  - Keyboard (`ArrowLeft`/`ArrowRight` step dishes when near top; `Escape` closes `.pg.p9`).

### 4.3 Section 2 — Scroll-Scrubbed Cinematic Video Stage (`.fd-story-sec`, `height: 360svh`)
- Seamless top blend: subtle gradient mask bridging `--fd-bg` (Hero pastel) into the active dish's real studio edge color (`dish.videoBg`) so there is zero abrupt seam between Section 1 and Section 2.
- Inside `.fd-story-sec`, `.fd-story-sticky` (`position: sticky; top: 0; height: 100svh; width: 100%; overflow: hidden`) contains:
  1. **`<canvas class="fd-vid-canvas">`:** Full-viewport HiDPI (`dpr <= 2`) canvas drawing the nearest loaded WebP frame using smart centered `cover` projection (keeping the middle 55% safe zone centered on both `16:9` desktop and `9:16` mobile portrait, with slight vertical lift on mobile so the lower narrative card never overlaps the bowl!).
  2. **Smooth Frame Damping:** Scroll progress `rawProgress = clamp((scrollTop - storyTop) / storyScrollSpan, 0, 1)` sets `targetFrame = rawProgress * 71`; rAF smoothly damps `drawnFrame += (targetFrame - drawnFrame) * 0.18` and stops idling once settled (`|targetFrame - drawnFrame| < 0.01`, **0% CPU when not scrolling!**).
  3. **4 Synchronized Editorial Narrative Beats (`.fd-beat`, `pointer-events: none`, zero buttons):**
     - Each beat renders in a refined frosted editorial card (`background: rgba(255, 252, 247, 0.82); backdrop-filter: blur(14px); color: #1c1614; border: 1px solid rgba(28, 22, 20, 0.12)` — guaranteeing `≥ 11:1` WCAG AAA legibility over every single video's lighting gradient!).
     - Desktop positioning: alternates tastefully on the **left** (`left: clamp(28px, 4.5vw, 72px)`) and **right** (`right: clamp(28px, 4.5vw, 72px)`) margins (`max-width: 340px`), keeping the center 55% bowl & falling ingredients 100% unobstructed!
     - Mobile portrait (`W/H < 0.9`): anchored cleanly at the bottom safe area (`bottom: 24px`, compact `max-width: calc(100vw - 32px)`) while the canvas nudges the dish gently upward (`centerY ≈ 42%`) so the bowl & pour stream stay completely visible above the text!
     - **4 Bespoke Beats per Dish (localized across all 8 languages):**
       - **Beat 1 (`0.00–0.23`):** Chapter number (`01 / 05`), Latin dish title, & vessel introduction (e.g., matte black gold-rimmed bowl awaiting broth).
       - **Beat 2 (`0.23–0.51`):** The pour / foundation narrative (e.g., creamy tonkotsu broth ripples, smoky demi-glace ribbon, crispy smashed chicken crumbs, marinara coat, velvety Japanese curry stream).
       - **Beat 3 (`0.51–0.77`):** The slow-motion drop & key ingredients typographic tags (static editorial tags — NOT buttons!).
       - **Beat 4 (`0.77–1.00`):** Completed dish + Zikri's personal 1-sentence tasting note + quiet non-button cue `↑ Gulir ke atas untuk ganti menu`.
  4. **Minimal Progress Hairline (`.fd-progress-rail`):** Thin `2px` progress fill line + `01 / 05` quiet counter showing exact scroll progress through the video (`pointer-events: none`, zero buttons).
- **Reduced Motion (`prefers-reduced-motion: reduce`):**
  - Hero does not auto-rotate (`drag` / `ArrowLeft` / `ArrowRight` snap directly).
  - Scroll video snaps cleanly across 4 key frames (`00`, `24`, `48`, `71`) aligned with the 4 editorial beats without continuous motion interpolation.

---

## 5. Files Touched

- **Create:** `assets/food/frames/{ramen,steak,ayam-geprek,spaghetti,chicken-katsu}/00.webp`..`71.webp` (360 optimized WebP frames total)
- **Delete:** `assets/food/assembly/` (obsolete v1 cutouts) & `assets/food/videos/*.mp4` (raw source videos after frame verification)
- **Update:**
  - `js/food-data.js`: replace `ingredients` pixel-drop configs with `framesDir`, `frameCount: 72`, `videoBg`, and 4 localized editorial `beats` per dish + updated `UI` strings (8 languages).
  - `css/food.css`: rewrite cleanly for scrollable `.pg.p9`, single top-left mascot Home pill, draggable Hero (zero buttons), seamless gradient bridge, sticky 100svh Canvas video stage, alternating left/right desktop editorial beat cards, mobile bottom card + lifted dish framing, RTL mirroring, and reduced motion.
  - `js/food.js`: rewrite cleanly with direct horizontal turntable pointer/touch drag + inertia snap, progressive WebP frame loader & damped Canvas 2D scroll-scrubber (`0%` idle CPU when scroll settles), 4-beat scroll interpolation, live 8-language observer, and deterministic cleanup.
  - `js/carousel.js`: remove unused `window.__zkFoodEscape` check (or keep optional guard) and ensure `.fd-stage` vertical scroll works cleanly inside `#pg` while horizontal touch swipe on `.fd-hero-sec` does not trigger portfolio card switch.

---

## 6. Verification Plan

1. **Asset & Payload Audit:** Verify `360` WebP frames (`72 × 5`) exist, valid `960×540` WebP, total size lean, and old `assembly/` + raw `.mp4` removed.
2. **Automated Tests:** Updated `test_food_data.mjs` (all 8 languages × 4 beats × 5 dishes + frame paths), `test_food_css.mjs` (strict `.pg.p9` scoping + zero stray buttons), `test_food_engine.mjs` (drag math, scroll-to-frame mapping, beat opacity curve).
3. **Live Multi-Viewport Playwright QA (`1440×900`, `768×1024`, `390×844`, `360×640`, `844×390`):**
   - Verify **ONLY 1 `<button>` exists inside `.pg.p9`** (the top-left mascot Home button!).
   - Verify dragging the marble turntable horizontally rotates smoothly and locks onto a new dish (e.g. Steak or Chicken Katsu), and scrolling down plays THAT dish's scrubbed frames (`0% → 35% → 65% → 98%`) with all 4 narrative beats visually clean and zero overlap with the dish!
   - Verify scrolling back up rewinds cleanly to frame 0 and allows dragging to another dish.
   - Verify all 8 languages + Arabic RTL, `prefers-reduced-motion: reduce`, 0 console errors, 0 failed HTTP/CSP requests, 0px horizontal overflow, and zero regressions on Home & Cards #0–#8.
