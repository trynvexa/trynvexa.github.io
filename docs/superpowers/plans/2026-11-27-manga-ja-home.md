# Japanese Manga Mode Home UI ("Shōnen Tankōbon Collector’s Edition") Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the Home page into an authentic, max-craft **Shōnen Tankōbon Manga Collector’s Edition** (both *Tankōbon Paper* Light Mode and *Midnight Ink* Dark Mode) strictly when the active language is Japanese (`html[lang="ja"]`), leaving the other 7 languages, the Intro screen, and all 9 inner interactive scenes (`.pg`) completely untouched.

**Architecture:** Isolate 100% of the Manga visual system in a dedicated stylesheet (`css/manga-ja.css`) scoped exclusively under `html[lang="ja"]` and away from `.pg`, paired with a zero-rAF event-driven enhancer (`js/manga-ja.js`) that injects `data-i18n-own="1"` / `aria-hidden="true"` manga overlays (manuscript frame, *hanko* vertical stamp, radial SVG *shūchūsen* speedlines, `第01話`–`第09話` chapter stamps, page counter, and Buddy micro-SFX) and hooks cleanly into `carousel.js`, `buddy.js`, `i18n.js`, and `theme.js`.

**Tech Stack:** Vanilla HTML5, CSS3 (Custom Properties, Ben-Day halftone gradients, `-webkit-text-stroke`, View Transitions API), inline SVG, Vanilla ES5/ES6 JavaScript (zero npm runtime deps, zero build step), Google Fonts (`Dela Gothic One`, `Noto Sans JP`, `Space Mono`), Playwright for real-browser verification.

**Spec:** [docs/superpowers/specs/2026-11-27-manga-ja-home-design.md](../specs/2026-11-27-manga-ja-home-design.md)

## Global Constraints

- Static GitHub Pages site: zero npm runtime dependencies, zero build step, plain HTML/CSS/JS only.
- CSP in `index.html` allows `'self'`, `https://fonts.googleapis.com`, `https://fonts.gstatic.com`, `data:`, and `blob:` — all new fonts load via the existing Google Fonts `<link>`, no inline `<script>` blocks, no external SVG/image URLs.
- Strict `html[lang="ja"]` Home isolation: zero visual changes on `id`, `en`, `zh`, `es`, `ar`, `fr`, `ko`; zero CSS or DOM bleed into `#intro` or `.pg.p0`–`.pg.p8`.
- Every injected Manga DOM node MUST have `data-i18n-own="1"` (so `js/i18n.js` MutationObserver skips it) and `aria-hidden="true"` (purely decorative).
- Zero continuous `requestAnimationFrame` loops added; full `prefers-reduced-motion: reduce` support.
- Preserve `css/pages.css:4140` (`v218`) `sr-only` hidden `.arr` buttons on `@media (hover: none) and (pointer: coarse)` and preserve `css/motion3d.css:502` (§10) touch compositing guard (`filter: none` on `.portrait-img` + identical hard ink shadow across `.card` / `.card.on`) on `@media (pointer: coarse), (max-width: 700px)`.
- Dual-mode contrast `>= 4.5:1` across `[data-theme="light"]`, `[data-theme="dark"]`, and `@media (prefers-color-scheme: dark)` with `:root:not([data-theme="light"])`.

## Review Focus

1. **Direct reload with saved `localStorage["zk-lang"] === "ja"`:** `js/manga-ja.js` runs after `js/i18n.js` sets `lang="ja"`, so initial sync MUST run immediately on load without waiting for a future `zk-lang` event — verified in Task 2 & Task 4.
2. **Active `#intro` overlay (`html.intro-on`) with `lang="ja"`:** `.mg-frame` (`z-index: 9`) and `.mg-speedlines` (`z-index: 0`) MUST stay strictly below `#intro` (`z-index: 1000+`) and never flash over the intro scene — verified in Task 3 & Task 4.
3. **Rapid language cycling (`id → ja → ar (RTL) → ja → en`):** Switching out of `ja` into RTL Arabic (`ar`) or Latin languages MUST strip the `第0X話 · ` prefix from `#mk`, hide all `.mg-*` nodes, restore `#themeColor`, and keep `data-rtl` intact — verified in Task 2 & Task 4.
4. **Late/offline `Dela Gothic One` font load affecting Buddy seating on `ポートフォリオ`:** Buddy MUST invalidate `capK` and `geom.valid` both on `zk-lang` AND after `document.fonts.load('400 48px "Dela Gothic One"')` resolves so Buddy lands squarely on a Katakana glyph — verified in Task 1 & Task 4.
5. **Changing theme or language while a `.pg` modal is open (`body.covered`):** `.mg-frame` MUST stay hidden while `body.covered` is set, and closing `.pg` MUST reveal the synchronized Manga Home state (Light or Dark) with zero residual bleed inside `.pg` — verified in Task 3 & Task 4.

---

## File Structure

| File | Action | Responsibility |
|---|---|---|
| `.gitignore` | Modify | Ignore `.superpowers/` temporary brainstorm mockups |
| `index.html` | Modify | Add Japanese display/UI/mono Google Fonts; link `css/manga-ja.css?v=1` after `css/motion3d.css`; load `js/manga-ja.js?v=1` defer after `js/carousel.js` |
| `js/theme.js` | Modify | Sync `<meta name="theme-color">` to `#f4efe4` / `#0c0c0f` when `document.documentElement.lang === "ja"` |
| `js/i18n.js` | Modify | Wrap `#langMenu` `.lang-opt` clicks transitioning into/out of `"ja"` in `document.startViewTransition` originating from `#langBtn` (guarded by `prefers-reduced-motion`) |
| `js/buddy.js` | Modify | Expose `window.__zkBuddyRefreshGeom()`, invalidate `capK`/`geom.valid` on `zk-lang`, and fire guarded `window.__zkMangaBuddySfx(kind)` calls on jump, poke, angry, music, and card react |
| `js/carousel.js` | Modify | Call guarded `window.__zkMangaSyncCard(activeIdx)` when active card changes and inside `syncCarouselLang()` |
| `js/manga-ja.js` | Create | Zero-rAF enhancer: injects `data-i18n-own="1"` Manga DOM nodes, syncs `#mk` chapter prefix + `.mg-page-num` + speedlines `.mg-snap` pulse, triggers Buddy katakana micro-SFX, syncs `#themeColor` on `zk-lang`, and triggers Buddy geometry refresh after Japanese font load |
| `css/manga-ja.css` | Create | Complete `html[lang="ja"]` Tankōbon Paper (Light) & Midnight Ink (Dark) Home stylesheet covering manuscript frame, *tonbo* crop marks, halftones, header narration box, *hanko* pillar, `ポートフォリオ` lettering, *obi* meta strip, stats/toast, language menu, speedlines, ink-to-color cards, touch compositing guard, speech bubble `#mk`, tankōbon `.cback`, responsive breakpoints, and `prefers-reduced-motion` |

---

### Task 1: Project Plumbing, Japanese Fonts & Minimal Hooks (`index.html`, `theme.js`, `i18n.js`, `buddy.js`, `carousel.js`)

**Files:**
- Modify: `.gitignore`
- Modify: `index.html:55-94` and `index.html:1358-1384`
- Modify: `js/theme.js:23-39`
- Modify: `js/i18n.js:6039-6044`
- Modify: `js/buddy.js:160-194`, `js/buddy.js:220-260`, `js/buddy.js:468-526`
- Modify: `js/carousel.js:710-771`

**Interfaces:**
- Consumes (guarded optional calls so Task 1 works even before Task 2 exists):
  - `window.__zkMangaSyncCard(activeIdx: number): void`
  - `window.__zkMangaBuddySfx(kind: "jump" | "poke" | "angry" | "music" | "react"): void`
- Produces:
  - `window.__zkBuddyRefreshGeom(): void` (exported by `js/buddy.js`; clears `capK = ""`, sets `geom.valid = false`, calls `ensureSeat()`)
  - `window.__zkSyncThemeColor(): void` (or re-runs `syncTheme()` on `zk-lang` event inside `js/theme.js`)

- [ ] **Step 1: Add `.superpowers/` to `.gitignore`**

Append `.superpowers/` under the existing tooling ignores in `.gitignore`.

- [ ] **Step 2: Update `index.html` with Japanese Google Fonts and Manga asset tags**

In `index.html`:
- Append `&family=Dela+Gothic+One&family=Noto+Sans+JP:wght@700;900&family=Space+Mono:wght@700` to the existing Google Fonts `<link>` (`lines 57–61`).
- Add `<link rel="stylesheet" href="css/manga-ja.css?v=1" />` immediately after `<link rel="stylesheet" href="css/motion3d.css?v=421" />` (so it can cleanly override Home card sheen/tilt defaults for `html[lang="ja"]` while staying before page-specific CSS).
- Add `<script src="js/manga-ja.js?v=1" defer></script>` immediately after `<script src="js/carousel.js?v=423" defer></script>`.

- [ ] **Step 3: Update `js/theme.js` to sync `#themeColor` for Japanese Manga palette**

In `syncTheme()`:
- When `document.documentElement.lang === "ja"`, set `#themeColor` `content` to `isDark() ? "#0c0c0f" : "#f4efe4"`.
- Otherwise preserve existing `isDark() ? "#090a0d" : "#eeebe2"`.
- Add `window.addEventListener("zk-lang", syncTheme);` so switching into or out of `ja` immediately updates `<meta name="theme-color">`.

- [ ] **Step 4: Add circular View Transition sweep on `ja` entry/exit in `js/i18n.js`**

Inside `o.onclick` (`js/i18n.js:6039–6042`):
- Capture `var prevLang = lang; var nextLang = x[0];`
- When `(prevLang === "ja" || nextLang === "ja") && prevLang !== nextLang`, `!reduce` (`prefers-reduced-motion: reduce`), and `typeof document.startViewTransition === "function"`:
  - Compute origin from `b.getBoundingClientRect()` (`#langBtn`), set `--vt-x`, `--vt-y`, `--vt-r` on `document.documentElement.style`, call `close(true)`, and run `document.startViewTransition(function () { set(nextLang); })` with `.catch(function () {})` guards on `ready`/`finished`/`updateCallbackDone`.
- Otherwise call `set(nextLang); close(true);` directly.

- [ ] **Step 5: Add geometry refresh & SFX hooks to `js/buddy.js`**

In `js/buddy.js`:
- Define `function refreshBuddyGeom() { capK = ""; geom.valid = false; ensureSeat(); }` and export `window.__zkBuddyRefreshGeom = refreshBuddyGeom;`.
- Add `window.addEventListener("zk-lang", function () { refreshBuddyGeom(); setTimeout(refreshBuddyGeom, 120); });`.
- Trigger guarded SFX hooks:
  - In `jumpToLetter(idx, userTriggered)`: on both same-letter bounce and jump start, call `if (userTriggered && window.__zkMangaBuddySfx) window.__zkMangaBuddySfx("jump");`.
  - In `.bwrap` click handler: call `window.__zkMangaBuddySfx("angry")` on 3-click angry, else `window.__zkMangaBuddySfx("poke")`.
  - In `window.__zkBuddyCardReact(cardIdx)`: call `window.__zkMangaBuddySfx(cardIdx === 1 ? "music" : "react")`.

- [ ] **Step 6: Add card/language sync hook calls to `js/carousel.js`**

In `js/carousel.js`:
- Inside `place()` right after `nm.textContent = dispName;` (`line 720`), call `if (window.__zkMangaSyncCard) window.__zkMangaSyncCard(activeIdx);`.
- Inside `syncCarouselLang()` right after `nm.textContent = ...;` (`line 748`), call `if (activeC >= 0 && window.__zkMangaSyncCard) window.__zkMangaSyncCard(activeC);`.

- [ ] **Step 7: Verify syntax across all modified JS files**

Run: `node --check js/theme.js && node --check js/i18n.js && node --check js/buddy.js && node --check js/carousel.js`
Expected: Exit code `0`, zero syntax errors.

- [ ] **Step 8: Commit Task 1**

```bash
git add .gitignore index.html js/theme.js js/i18n.js js/buddy.js js/carousel.js
git commit -m "feat(home-ja): add Japanese manga fonts, theme sync, view transition, and hooks"
```

---

### Task 2: Event-Driven Manga DOM Enhancer (`js/manga-ja.js`)

**Files:**
- Create: `js/manga-ja.js`

**Interfaces:**
- Consumes:
  - `window.ZK` (`ZK.lang`, `ZK.t`)
  - `window.__zkBuddyRefreshGeom()` from `js/buddy.js`
  - DOM targets: `document.body`, `.hd .block`, `#stage`, `#wheel .card`, `#mk`, `#nm`, `#buddy`
- Produces:
  - `window.__zkMangaSyncCard(idx: number): void`
  - `window.__zkMangaBuddySfx(kind: "jump" | "poke" | "angry" | "music" | "react"): void`
  - Injected DOM elements (all carrying `data-i18n-own="1"` and `aria-hidden="true"`):
    - `.mg-frame` (direct child of `document.body`, containing `.mg-code.mg-code-l` `"ZIKRI-FOLIO // VOL.01-2026"` and `.mg-code.mg-code-r` `"MEDAN · 初版"`)
    - `.mg-hanko-txt` inside `.hd .block` (`"作品集・二〇二六"`)
    - `.mg-speedlines` inline SVG inside `#stage` (24 variable-width radial rays around focal center + clear-zone ellipse)
    - `.mg-page-num` inside `#stage` (`"第 03 / 09 話"`)
    - `.mg-ch` inside each `.card` (`"第01話"` through `"第09話"`)
    - `.mg-ch-mk` inside `#mk` before `#nm` (displays `"第03話 ·"` in `ja`, empty/hidden outside `ja` so `#nm` text node stays clean for `carousel.js` & `i18n.js`!)
    - `.mg-sfx` inside `#buddy`

- [ ] **Step 1: Implement `js/manga-ja.js` with full idempotent DOM injection**

Create `js/manga-ja.js` wrapped in an IIFE `"use strict"`:
- Helper `isJa()` returning `document.documentElement.lang === "ja"`.
- Helper `pad2(n)` returning `(n < 10 ? "0" : "") + n`.
- Helper `prefersReduced()` checking `window.matchMedia("(prefers-reduced-motion: reduce)").matches`.
- Inject all decorative nodes once (guarded by query checks so double-init never duplicates):
  1. `.mg-frame` (inserted before `.hd`) with `.mg-code.mg-code-l` (`ZIKRI-FOLIO // VOL.01-2026`) and `.mg-code.mg-code-r` (`MEDAN · 初版`).
  2. `.mg-hanko-txt` inside `.hd .block` (`作品集・二〇二六`).
  3. `.mg-speedlines` SVG (`viewBox="0 0 1200 520"`, `preserveAspectRatio="none"`) prepended inside `#stage` with 24 variable-width radial rays radiating from `(600, 240)` and a clean paper-filled `<ellipse cx="600" cy="240" rx="255" ry="185" class="mg-speed-hole"/>`.
  4. `.mg-page-num` appended inside `#stage`.
  5. `.mg-ch` prepended inside each `#wheel .card` with text `"第" + pad2(i + 1) + "話"`.
  6. `.mg-ch-mk` inserted inside `#mk` right before `#nm` (avoiding mutating `#nm.textContent` directly so `carousel.js` and `i18n.js` never conflict when switching `ja → ar → en → id`!).
  7. `.mg-sfx` appended inside `#buddy`.
- Every injected element gets `setAttribute("data-i18n-own", "1")` and `setAttribute("aria-hidden", "true")`.

- [ ] **Step 2: Implement `window.__zkMangaSyncCard(idx)` and `window.__zkMangaBuddySfx(kind)`**

- `window.__zkMangaSyncCard(idx)`:
  - Stores `lastIdx = idx` (0-based, clamped `0..total-1`).
  - Updates `.mg-page-num` text to `"第 " + pad2(idx + 1) + " / " + pad2(total) + " 話"`.
  - Updates `.mg-ch-mk` text to `isJa() ? ("第" + pad2(idx + 1) + "話 · ") : ""`.
  - When `isJa()` and `!prefersReduced()` and `idx !== prevSyncedIdx`, adds `.mg-snap` to `#stage` and removes it after `220ms` (debounced timer).
- `window.__zkMangaBuddySfx(kind)`:
  - Returns immediately if `!isJa()` or `prefersReduced()` or `!sfxEl`.
  - Maps `kind` to katakana SFX: `{ jump: "ピョコン!", poke: "ドン!", angry: "ガーン!!", music: "♪ ジャン!", react: "バチッ!" }`.
  - Sets `sfxEl.textContent`, toggles `sfxEl.classList.remove("on"); void sfxEl.offsetWidth; sfxEl.classList.add("on");`, and clears `.on` after `720ms` (debounced timer).

- [ ] **Step 3: Handle initial `lang="ja"` load, `zk-lang` transitions, and late webfont calibration**

- Create `syncLangState()`:
  - Detects active card index from `#wheel .card.on` (falling back to `lastIdx >= 0 ? lastIdx : 2`), calls `window.__zkMangaSyncCard(activeIdx)`.
  - If `isJa()` and `document.fonts && document.fonts.load`: load `'400 48px "Dela Gothic One"'` and `'900 24px "Noto Sans JP"'`, then call `window.__zkBuddyRefreshGeom && window.__zkBuddyRefreshGeom()` so Buddy aligns precisely on `ポートフォリオ` even when fonts stream in lazily.
- Register `window.addEventListener("zk-lang", syncLangState);` AND invoke `syncLangState()` immediately on script boot (handles Review Focus #1: returning user with saved `localStorage["zk-lang"] === "ja"`).

- [ ] **Step 4: Verify JS syntax and DOM isolation contract**

Run: `node --check js/manga-ja.js`
Expected: Exit code `0`, zero syntax errors.

- [ ] **Step 5: Commit Task 2**

```bash
git add js/manga-ja.js
git commit -m "feat(home-ja): add event-driven Japanese manga DOM enhancer"
```

---

### Task 3: Complete Tankōbon Collector’s Edition Stylesheet (`css/manga-ja.css`)

**Files:**
- Create: `css/manga-ja.css`

**Interfaces:**
- Consumes DOM & classes from `index.html`, `js/carousel.js`, `js/i18n.js`, `js/stats.js`, `js/manga-ja.js`:
  - `html[lang="ja"]`, `html:not([lang="ja"])`, `body.covered`, `[data-theme="light"]`, `[data-theme="dark"]`
  - `.mg-frame`, `.mg-code`, `.mg-hanko-txt`, `.mg-speedlines`, `.mg-speed-hole`, `.mg-page-num`, `.mg-ch`, `.mg-ch-mk`, `.mg-sfx`
  - `.bgfx`, `.bg-slide`, `.grid-marks .cross`, `.hd`, `.top-row`, `.hi`, `.hi-k`, `.hi-m`, `.clk`, `.mark-wrap`, `.lang-btn`, `.lang-menu`, `.lang-opt`, `.theme-btn`, `.mark`, `.block`, `.title .t1`, `.meta`, `.meta-author`, `.meta-name`, `.stats-badge`, `.stat-pill`, `.stat-star`, `.meta-role`, `.stat-toast`, `.arr`, `.stage`, `#ring`, `.card`, `.card.on`, `.card .gr`, `.card .gl`, `.card .dim`, `.card .lb`, `.cback`, `.mk`
- Produces: Complete visual styling strictly active under `html[lang="ja"]` Home (never styling anything inside `.pg`).

- [ ] **Step 1: Write non-`ja` & `body.covered` hide guards + Dual Edition color tokens**

In `css/manga-ja.css`:
- Section 1 (Isolation Guard): Hide `.mg-frame, .mg-hanko-txt, .mg-speedlines, .mg-page-num, .mg-ch, .mg-ch-mk, .mg-sfx` via `display: none !important` whenever `html:not([lang="ja"])`. Also hide `.mg-frame` when `body.covered` or `html.intro-on` is active (pins Review Focus #2 and #5).
- Section 2 (Tokens): Define `html[lang="ja"]` light mode (*Tankōbon Paper*: `--bg: #f4efe4; --mg-paper: #f4efe4; --mg-paper-hi: #fffdf8; --ink: #111111; --mg-ink: #111111; --red: #df2e28; --mg-red: #df2e28; --disc: #e6dfd0; --mg-stone: #e6dfd0; --ring: #111111; --mg-dot: rgba(17,17,17,0.14); --mg-speed: rgba(17,17,17,0.18); --mg-shadow: #111111; --mg-ui-shadow: #111111; --glow: transparent;`) and dark mode (*Midnight Ink*: `--bg: #0c0c0f; --mg-paper: #0c0c0f; --mg-paper-hi: #15151a; --ink: #f4efe4; --mg-ink: #f4efe4; --red: #f03e37; --mg-red: #f03e37; --disc: #17171e; --mg-stone: #17171e; --ring: #f4efe4; --mg-dot: rgba(244,239,228,0.13); --mg-speed: rgba(244,239,228,0.16); --mg-shadow: #000000; --mg-ui-shadow: #f4efe4; --glow: transparent;`) for BOTH `html[lang="ja"][data-theme="dark"]` AND `@media (prefers-color-scheme: dark)` with `html[lang="ja"]:not([data-theme="light"])`.

- [ ] **Step 2: Style Manuscript Page Frame, *Tonbo* Crop Marks, Halftone Atmosphere & Monochrome Backdrop**

- `html[lang="ja"] body`: flat manga paper background + subtle top/bottom Ben-Day halftone dot gradients (suppressing soft spotlight `body::before` glow in `ja`).
- `html[lang="ja"] .mg-frame`: fixed double-ruled inset frame (`inset: 10px`, `border: 2.5px solid var(--mg-ink)`, inner hairline shadow, `pointer-events: none`, `z-index: 9`) + rotated vertical desktop marginalia `.mg-code` (`display: none` below `900px`).
- `html[lang="ja"] .grid-marks .cross`: transform 4 corner marks into authentic `L`-shaped Japanese *tonbo* crop marks (`font-size: 0` + crisp `::before`/`::after` `1.5px` ink hairlines), hide middle marks cleanly.
- `html[lang="ja"] .bg-slide`: subtle monochrome ink-etched photo wash (`grayscale(1) contrast(1.4) blur(5px)`, `.on` opacity `0.07` light / `0.06` dark) under subtle halftone overlay.

- [ ] **Step 3: Style Header Panel (`.hd`) — Narration Box, Ink Controls, Cameo Mascot, *Hanko* Pillar, `ポートフォリオ` Logo, Buddy SFX & *Obi* Strip**

- `.hd`: clean manga panel header framed within `.mg-frame` inset with a crisp bottom ink divider (`border-bottom: 2.5px solid var(--mg-ink)` via `.meta`).
- `.hi`: manga narration caption box (`background: var(--mg-paper-hi)`, `border: 2.5px solid var(--mg-ink)`, `box-shadow: 4px 4px 0 var(--mg-ui-shadow)`), `.hi-k` vermilion eyebrow, `.hi-m` `Noto Sans JP` `900`, `.clk` dashed top rule + crisp `7×7px` square vermilion live dot.
- `.lang-btn` & `.theme-btn`: sharp `border-radius: 3px`, `2px solid var(--mg-ink)`, `3px 3px 0 var(--mg-ui-shadow)`, invert on hover, `translate(2px, 2px)` tactile press on `:active`.
- `.lang-menu` & `.lang-opt`: Manga Index Panel (`border: 2.5px solid var(--mg-ink)`, `border-radius: 4px`, `5px 5px 0 var(--mg-ui-shadow)`, vermilion active dot, crisp contrast in light & dark).
- `.mark`: cameo manga panel (`border: 2.5px solid var(--mg-ink)`, halftone dot backing, `3px 3px 0 var(--mg-red)` shadow, `transform: rotate(-3deg)`, `border-radius: 3px`).
- `.block`: flat vermilion *hanko* pillar (`background: var(--mg-red) !important`, `border: 3px solid var(--mg-ink)`, zero blur shadow), `.block::after` 45° diagonal crosshatch screentone offset block, `.mg-hanko-txt` vertical Japanese seal (`writing-mode: vertical-rl`, `Noto Sans JP` `900`).
- `.title` & `.title .t1`: `font-family: "Dela Gothic One", "Noto Sans JP", sans-serif`, `filter: none !important`, `font-size: clamp(30px, 9.2vw, 114px)`, cream-white fill + `3px` sumi stroke (`paint-order: stroke fill`) + stepped solid extrusion shadow in Light Mode; deep ink fill + `2.5px` chalk-white stroke + dual chalk & vermilion stepped shadow in Dark Mode; solid vermilion fill on `:hover`, `.hot`, `.seated`.
- `#buddy .mg-sfx`: crisp tilted katakana SFX badge (`Dela Gothic One`, vermilion text, `var(--mg-paper-hi)` background, `2px solid var(--mg-ink)`, `2.5px 2.5px 0 var(--mg-ui-shadow)`, pop keyframe animation).
- `.meta`: full-bleed *obi* strip (`background: var(--mg-paper-hi)`, `border-top/bottom: 2.5px solid var(--mg-ink)`), `.meta-name` crisp `Noto Sans JP` / `Instrument Serif`, `.stats-badge` sharp double-cell ink counter (`border: 2px solid var(--mg-ink)`, `3px 3px 0 var(--mg-ui-shadow)`), `.meta-role` crisp `Space Mono` / `Noto Sans JP` with red square bullet, `.stat-toast .toast-pill` opaque manga speech toast.

- [ ] **Step 4: Style Stage Panel (`.stage`) — Speedlines, Compass Dial, Arrows, Ink-to-Color Chapter Cards, Tankōbon Card Back & Speech Bubble**

- `.mg-speedlines`: full-stage SVG behind `#wheel`, `.mg-speed-hole` filled with `var(--mg-paper)`, gentle scale pulse on `.stage.moving`, `.stage.drag`, `.stage.mg-snap`.
- `#ring`: crisp sumi compass dial strokes and bold ring text.
- `.arr`: scoped so it styles square ink plates (`42×42px`, `2.5px solid var(--mg-ink)`, `4px 4px 0 var(--mg-ui-shadow)`, invert hover) ONLY outside `@media (hover: none) and (pointer: coarse)` — never overriding `css/pages.css:4140` `v218` hidden touch arrows!
- `.card`: sharp `border-radius: 4px`, `3px solid var(--mg-ink)`, inner print keyline via `.gl` or `::after`, hard ink offset shadow.
  - Desktop `@media (pointer: fine)`: inactive `.card:not(.on) .portrait-img` `filter: grayscale(1) contrast(1.24) brightness(1.04)` + Ben-Day halftone `.gr` overlay (`opacity: 0.42`); active `.card.on .portrait-img` vivid `filter: saturate(1.08) contrast(1.04)` + `.gr` fades to `0` + double offset shadow (`6px 6px 0 var(--mg-ink), 11px 11px 0 var(--mg-red) !important`); disable rainbow conic foil (`html[lang="ja"] .card.on::before { display: none !important; }`).
  - Touch / narrow `@media (pointer: coarse), (max-width: 700px)`: preserve `motion3d.css` §10 anti-flicker guard (`filter: none !important; transition: none !important;` on `.portrait-img`, identical `5px 5px 0 var(--mg-shadow)` on both `.card` and `.card.on`); differentiate inactive vs active cleanly with elevated halftone `.gr` + paper-ink `.dim` veil fading via compositor-only `opacity: 0` on `.card.on`, plus vermilion `.mg-ch` badge and vermilion inner frame accent on `.card.on`.
- `.mg-ch`: top-left chapter stamp (`第01話`–`第09話`) in ink-black / paper-white, flipping to solid `var(--mg-red)` on `.card.on`.
- `.lb`: opaque manga title plaque (`background: var(--mg-paper-hi)`, `border: 2px solid var(--mg-ink)`, `box-shadow: 3px 3px 0 var(--mg-ui-shadow)`, `Noto Sans JP` `900`, high contrast on every card).
- `.cback`: sharp-cornered collector’s tankōbon back cover (double ink frame, vermilion + diagonal halftone pattern, ink-framed mascot medallion).
- `.mk`: manga speech bubble with CSS upward dual-triangle comic tail (`::before` border + `::after` paper fill), displaying `.mg-ch-mk` + `#nm`.
- `.stage::after` & `.mg-page-num`: crisp ink-bordered reader tag bottom-left and `第 03 / 09 話` counter bottom-right.

- [ ] **Step 5: Add Responsive Mobile/Short/Landscape Rules & `prefers-reduced-motion: reduce`**

- `@media (max-width: 700px)`: tighter `.mg-frame` (`inset: 6px`), compact `.hi` narration box that never collides with `.mark-wrap`, crisp 7-glyph `ポートフォリオ` font sizing (`clamp(25px, 9.2vw, 44px)`), balanced `.hd` height, clean `.meta` obi bar, mobile `.lang-menu` drawer styled in manga ink frame, hide `.mg-page-num` on narrow `< 540px` so `.stage::after` stays centered cleanly.
- `@media (max-width: 700px) and (max-height: 740px)` and `@media (max-height: 480px) and (orientation: landscape)`: compact guards so zero vertical collision occurs.
- `@media (pointer: coarse)`: ensure `#langBtn` and `#themeToggle` maintain `>= 44px` tap target dimensions.
- `@media (prefers-reduced-motion: reduce)`: disable speedlines pulse, SFX animation, live clock blink, and button transitions.

- [ ] **Step 6: Verify CSS integrity (balanced braces & zero `.pg` selectors)**

Run: `node -e 'const fs=require("fs"), c=fs.readFileSync("css/manga-ja.css","utf8"); const o=(c.match(/\{/g)||[]).length, cl=(c.match(/\}/g)||[]).length; if(o!==cl) throw new Error("Unbalanced braces: "+o+" vs "+cl); if(/\.pg\b/.test(c)) throw new Error("Found .pg selector bleed!"); console.log("OK braces="+o);'`
Expected: `OK braces=...` with exit code `0`.

- [ ] **Step 7: Commit Task 3**

```bash
git add css/manga-ja.css
git commit -m "feat(home-ja): add Shonen Tankobon light/dark manga stylesheet"
```

---

### Task 4: Real-Browser Playwright Verification, Visual Craft Audit & Polish

**Files:**
- Verify & polish if needed: `css/manga-ja.css`, `js/manga-ja.js`, `js/buddy.js`, `js/i18n.js`

**Interfaces:**
- Verifies all 8 spec verification checks + all 5 Review Focus failure modes in a real headless Chromium browser served over `http://127.0.0.1:4173`.

- [ ] **Step 1: Start local static server and run comprehensive Playwright audit script**

Using Playwright MCP tools (or a scratch verification script against `python3 -m http.server 4173`):
1. **Baseline `id` Desktop (`1440×900`):** Skip intro, assert 0 console errors, assert `.mg-frame` and `.mg-speedlines` have `display: none`, assert `#nm` has no `第` prefix.
2. **Switch to `ja` Light Mode (`1440×900`):** Click `#langBtn` → `日本語`, verify `html[lang="ja"]`, verify `#themeColor` is `#f4efe4`, verify `.mg-frame`, `.mg-hanko-txt` (`作品集・二〇二六`), `.mg-speedlines`, `.mg-ch` (`第01話`–`第09話`), `.mg-ch-mk` (`第03話 ·`), and Buddy bounding box sits cleanly above a Katakana glyph in `ポートフォリオ` (no vertical clipping or horizontal drift). Take full screenshot and visually inspect it!
3. **Interactive Desktop `ja` Checks:** Click `#next` and a side card → verify active card updates, `.mg-page-num` updates, `#mk` updates, side cards have `grayscale(1)` filter while `.card.on` has vivid color + double vermilion shadow, click a `ポートフォリオ` letter → verify `.mg-sfx` pops with `ピョコン!`.
4. **Dark Mode (`ja` Midnight Ink `1440×900`):** Click `#themeToggle` → verify `data-theme="dark"`, `#themeColor` is `#0c0c0f`, take screenshot and visually inspect chalk-white borders, dark ink surfaces, and vermilion contrast.
5. **Zero-Bleed Check (`.pg`):** While in `ja`, open `Me` and `Proyek` (or `Kontak`) → verify `body.covered` hides `.mg-frame` (`display: none`), verify inner `.pg` renders with 0 console errors, toggle theme inside `.pg` if applicable, close back to Home → verify Manga Home resumes cleanly.
6. **Direct Reload in `ja` + Intro Layering (Review Focus #1 & #2):** Reload page with `localStorage["zk-lang"] = "ja"` while intro is enabled (`sessionStorage` cleared) → verify `#intro` sits cleanly above `.mg-frame` (`display: none` under `html.intro-on`), dismiss intro → verify Manga Home initializes completely on first paint.
7. **Rapid Language Cycling (`ja → ar → ja → id` — Review Focus #3):** Switch `ja → ar` (verify `data-rtl="1"`, `.mg-ch-mk` empty, `.mg-frame` hidden), switch `ar → id` (verify exact baseline Warm Editorial restored, `#themeColor` back to `#eeebe2`/`#090a0d`).
8. **Mobile Portrait Touch (`390×844`, `hasTouch: true`):** Load `ja` Light & Dark → verify `.arr` stays visually hidden (`opacity: 0` / `1px`), verify `.card .portrait-img` keeps `filter: none`, verify zero horizontal overflow (`scrollWidth <= clientWidth`), verify zero header/narration-box/card overlap via screenshot inspection, verify touch targets `#langBtn`/`#themeToggle` `>= 44px`, and simulate horizontal touch swipe across `#stage` cleanly.
9. **Reduced Motion (`prefers-reduced-motion: reduce` in `ja`):** Verify static speedlines and suppressed SFX animations.

- [ ] **Step 2: Fix any visual craft, alignment, spacing, or contrast issues found during inspection**

Inspect every captured screenshot carefully (typography clarity, Buddy seating on `ポートフォリオ`, narration box spacing, obi strip balance, card plaques, speech bubble tail alignment, mobile proportions, dark mode contrast). Apply targeted refinements to `css/manga-ja.css` / `js/manga-ja.js`, then re-run the affected Playwright checks and re-inspect screenshots until spotless.

- [ ] **Step 3: Final syntax check, formatting check, and clean git status**

Run:
```bash
node --check js/theme.js && node --check js/i18n.js && node --check js/buddy.js && node --check js/carousel.js && node --check js/manga-ja.js && git status -s
```
Expected: All syntax checks pass with exit code `0`, no untracked scratch artifacts left in workspace, `.superpowers/` ignored cleanly.

- [ ] **Step 4: Commit any Task 4 polish edits**

```bash
git add css/manga-ja.css js/manga-ja.js
git commit -m "polish(home-ja): refine manga layout alignment, contrast, and mobile spacing"
```
