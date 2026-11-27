# Design Spec — Japanese Manga Mode Home UI ("Shōnen Tankōbon Collector’s Edition")

**Date:** 2026-11-27  
**Scope:** Home page ONLY when the active language is Japanese (`html[lang="ja"]`) in `my-portofolio`.  
**Selected Approach:** **Option A — Shōnen Tankōbon Classic (Max Craft)**, dynamically activated exclusively when the user selects **日本語 (`JA`)** in the language switcher.

---

## 1. Intent & Why

- **Intent:** Turn switching the portfolio language to **Japanese (`日本語` / `ja`)** into an unforgettable visual transformation: the entire **Home page** shifts from the default Warm Editorial Paper / Deep Obsidian aesthetic into a museum-grade **Shōnen Tankōbon Manga Collector’s Edition** (tactile manga paper, sumi ink panel borders, Ben-Day halftone screentones, radial *shūchūsen* speedlines, *tonbo* print crop marks, vermilion *hanko* banner, narration & speech bubbles, Buddy micro-SFX, and ink-to-color chapter cover cards).
- **Why:**
  - The user specifically wants a **manga-style Home UI** pushed to its visual craft limit, **triggered when switching to Japanese (`ja`)** — making the Japanese language mode a signature cultural design experience rather than merely translated strings.
  - Keeping all other 7 languages (`id`, `en`, `zh`, `es`, `ar`, `fr`, `ko`) on the existing Warm Editorial design guarantees zero regression to the default portfolio identity.
  - Keeping all 9 inner interactive scenes (`.pg` overlays: Story, Music, Me, Frame, Skill, Proyek/Depot, Kontak, Fashion, Rumah) untouched preserves every bespoke 3D/WebGL stage.

---

## 2. Goals, Non-Goals & Anti-Goals

### Goals
1. **Strict `html[lang="ja"]` Home Isolation:** Every Manga visual override and injected decorative element activates **only** when `document.documentElement.lang === "ja"`, and targets **only** the Home screen (`.bgfx`, `.grid-marks`, `.hd`, `.stage`, `.lang-menu`, `.stat-toast`, and Home cards/wheel/Buddy). Switching away from `ja` cleanly restores the exact original Home UI with zero leftover styles or artifacts.
2. **Zero Bleed into Detail Pages (`.pg`):** Opening any of the 9 cards while in Japanese mode must render the inner scene (`.pg.p0`–`.pg.p8`) with its existing design intact — no manga frame borders, no speedlines, no halftone dots, and no CSS leaks inside `.pg`.
3. **Max-Craft Tankōbon Authenticity (Light & Dark):**
   - **Light Mode (*Tankōbon Paper*):** Warm off-white manga paper (`#f4efe4`), deep sumi ink (`#111111`), vermilion hanko accent (`#df2e28`), subtle halftone screentones, crisp solid offset ink shadows.
   - **Dark Mode (*Midnight Ink / Climax Spread*):** Deep sumi black (`#0c0c0f`), crisp chalk-paper ink lines (`#f4efe4`), blazing vermilion (`#f03e37`), inverted screentones — evoking black-page climax spreads while staying seamlessly compatible with the circular View Transition theme wipe.
4. **Full Preservation of Home Signature Mechanics:** The 9-card 3D Radial Wheel, critical-damped spring physics, 3D Cardistry Deal & Flip, Buddy letter-sitting/jumping/cursor tracking (re-calibrated for the 7-character Japanese title `ポートフォリオ`), Mascot eye tracking, real-time Medan WIB clock, and Cloudflare KV views/stars badge all continue functioning seamlessly.
5. **60fps Performance & Zero Idle Overhead:** Pure CSS screentones/borders/filters + static/event-triggered SVG speedlines. Zero continuous `requestAnimationFrame` loops added by Manga mode. Full `prefers-reduced-motion: reduce` support.
6. **Responsive & Accessible:** Clean layout across desktop (`1440×900` & ultrawide), tablet, mobile portrait (`390×844` & short `375×667`), and mobile landscape (`<= 480px` height); `>= 4.5:1` text contrast in both Light and Dark modes; `aria-hidden="true"` on purely decorative manga stamps/crop marks/speedlines; touch targets `>= 44px` on coarse pointers.

### Non-Goals
- Do **not** redesign or modify the **Intro screen** (`#intro`).
- Do **not** redesign any of the **9 inner detail pages** (`.pg.p0` through `.pg.p8`).
- Do **not** change the Home UI for `id`, `en`, `zh`, `es`, `ar`, `fr`, or `ko`.
- Do **not** add any npm runtime dependencies, bundlers, or build steps; keep the project 100% static HTML/CSS/JS for GitHub Pages.

### Anti-Goals (Failure Even If It Technically Works)
- Generic "comic book clip-art" look (no Comic Sans, no rainbow neon glow, no blurry glassmorphism over ink lines, no cluttered visual noise obscuring text legibility).
- Broken Buddy positioning floating off-center or clipping into the header when `PORTOFOLIO` (10 Latin chars) changes to `ポートフォリオ` (7 Katakana chars in a Japanese display font).
- Unreadable card labels or cramped mobile headers where the manga outer frame or narration box collides with the radial wheel.
- `i18n.js` MutationObserver fighting or rewriting injected Japanese manga stamps/marginalia.

---

## 3. Constraints

- **Static Architecture:** Plain HTML, CSS, vanilla JS; no build step.
- **Content-Security-Policy (`index.html`):** Permits `fonts.googleapis.com` and `fonts.gstatic.com` for stylesheets/fonts, `'self'` for scripts/styles, and `data:`/`blob:` for images. All new fonts must load via the existing Google Fonts stylesheet link; all SVGs must be inline DOM or CSS data URIs compliant with CSP.
- **Language Engine (`js/i18n.js`):** Sets `document.documentElement.lang = l`, dispatches `window.dispatchEvent(new Event("zk-lang"))`, rewrites `.title .t1` into `<i>` spans for `ポートフォリオ`, and walks the DOM skipping nodes with `data-i18n-own="1"`. Every injected Manga DOM node MUST carry `data-i18n-own="1"` and `aria-hidden="true"` (unless interactive/informative).
- **Theme Engine (`js/theme.js`):** Sets `data-theme="light" | "dark"` on `<html>` (or follows `prefers-color-scheme: dark` when unset), updates `<meta name="theme-color" id="themeColor">`, and dispatches `zk-theme`. Manga styles must handle all three theme selector states: `:root[data-theme="light"]`, `:root[data-theme="dark"]`, and `@media (prefers-color-scheme: dark)` with `:root:not([data-theme="light"])`.

---

## 4. Approaches Considered

| Approach | Summary | Trade-off | Verdict |
|---|---|---|---|
| **Option A — Shōnen Tankōbon Classic (Selected)** | Preserves the 9-card radial wheel & Buddy while transforming Home into a printed Japanese manga collector’s edition (warm paper, sumi ink borders, Ben-Day halftone, radial *shūchūsen* speedlines, vermilion *hanko* banner, narration/speech bubbles, ink-to-color chapter cards, light/dark climax duality). Scoped strictly to `html[lang="ja"]`. | Highest print authenticity, ultra-lightweight CSS/SVG performance, zero impact on other 7 languages or 9 inner scenes, preserves all signature 3D wheel & Cardistry mechanics. | **Selected by user (Max Craft + `ja`-only trigger)** |
| **Option B — Neo-Shōnen Pop** | Keeps radial wheel with extreme high-contrast black + acid yellow `#ffee00` / crimson pop, skewed lettering, and tilted stickers (*Chainsaw Man / Dandadan* aesthetic). | Visually loud/busy; ties tightly to the yellow intro, but feels less timeless and classic than Tankōbon paper/ink. | Not selected |
| **Option C — Full Manga Page Spread** | Replaces the radial wheel layout with an asymmetric multi-panel comic spread showing all 9 sections simultaneously. | Maximum "comic page" layout structure, but discards the signature 3D radial card wheel & Cardistry Deal & Flip choreography. | Not selected |

---

## 5. Complete Visual & Interactive Architecture (`html[lang="ja"]` Home)

### 5.1 Design Tokens & Dual Edition Palette

Scoped to `html[lang="ja"]` (never mutating global tokens outside `ja`):

| Token | Light Mode (*Tankōbon Paper*) | Dark Mode (*Midnight Ink / Climax*) | Usage |
|---|---|---|---|
| `--mg-paper` / `--bg` | `#f4efe4` | `#0c0c0f` | Main manga page surface |
| `--mg-paper-hi` | `#fffdf8` | `#15151a` | Narration box, caption plaques, obi strip, buttons |
| `--mg-ink` / `--ink` | `#111111` | `#f4efe4` | Primary borders (`2.5px–3px`), text, crop marks, hard shadows |
| `--mg-red` / `--red` | `#df2e28` | `#f03e37` | Vermilion *hanko* pillar, active chapter stamp, seated letter, active shadow accent |
| `--mg-stone` / `--disc` | `#e6dfd0` | `#17171e` | Wheel compass dial fill |
| `--mg-ring` / `--ring` | `#111111` | `#f4efe4` | Wheel dial stroke & circular text |
| `--mg-dot` | `rgba(17, 17, 17, 0.14)` | `rgba(244, 239, 228, 0.13)` | Ben-Day halftone dot screens |
| `--mg-speed` | `rgba(17, 17, 17, 0.18)` | `rgba(244, 239, 228, 0.16)` | Radial *shūchūsen* speedlines |
| `--mg-shadow` | `#111111` | `#000000` (cards) / `#f4efe4` (UI crisp ink offset) | Hard zero-blur offset drop shadows |

- `<meta name="theme-color">` syncs to `#f4efe4` (light) and `#0c0c0f` (dark) while `lang === "ja"`, and reverts cleanly to `#eeebe2` / `#090a0d` for other languages.

### 5.2 Typography (`html[lang="ja"]`)

- Add to the existing Google Fonts `<link>` in `index.html`:
  - **`Dela Gothic One`** (`400`) — heavyweight Japanese manga impact display font for `.title .t1` (`ポートフォリオ`) and Buddy micro-SFX (`ドン!`, `ピョコン!`, `バチッ!`).
  - **`Noto Sans JP`** (`700;900`) — ultra-crisp Japanese editorial UI, narration box heading, vertical *hanko* watermark (`作品集・二〇二六`), chapter stamps (`第01話`), card title plaques, and language menu.
  - **`Space Mono`** (`700`) — technical print marginalia, timestamp clock, page counter (`03 / 09`), and stats counters.
- **Title Sizing & Buddy Geometry Safety:**
  - `ポートフォリオ` (7 Katakana characters) rendered in `Dela Gothic One`, `"Noto Sans JP"`, sans-serif at responsive `clamp(30px, 9.2vw, 114px)` (mobile `clamp(26px, 9.6vw, 46px)`) so all 7 glyphs sit comfortably inside the framed header with zero horizontal clipping.
  - In `js/manga-ja.js` + `js/buddy.js`: whenever `zk-lang` fires OR `document.fonts.ready` / `document.fonts.load('400 48px "Dela Gothic One"')` resolves while in `ja`, invalidate Buddy’s cached `geom.valid` so Buddy immediately re-measures the Katakana glyph bounding boxes and lands accurately on the seated glyph.

### 5.3 Manuscript Page Frame, *Tonbo* Crop Marks & Atmosphere

- **Double-Ruled Outer Page Frame:** Drawn via a fixed non-interactive overlay (`.mg-frame`, `pointer-events: none`, `z-index: 9`, hidden when `body.covered` or `html:not([lang="ja"])`) inset cleanly (`10px` desktop, `6px` mobile) with `2.5px solid var(--mg-ink)` outer border + subtle inner hairline keyline.
- ***Tonbo* (トンボ) Crop Marks:** Transform `.grid-marks .cross` (the existing 6 registration marks) into authentic Japanese printing corner crop marks (`L`-shaped twin hairlines) at the 4 corners, plus desktop vertical marginalia print codes along the left/right gutters (`ZIKRI-FOLIO // VOL.01-2026` and `MEDAN · 初版`, desktop `>= 900px` only, hidden on mobile).
- **Ben-Day Halftone Atmosphere & Monochrome Backdrop:**
  - Subtle CSS dual-offset halftone dot gradients masked gently toward top and bottom edges of the viewport (leaving the center reading/title area clean).
  - Replace the blurry full-color `.bg-slide` wash in `ja` with a subtle **monochrome ink-etched wash** (`filter: grayscale(1) contrast(1.4) blur(5px)` at very low opacity `0.07` light / `0.06` dark) underneath the halftone screen, preserving subtle depth without breaking the printed paper illusion.

### 5.4 Header Panel (`.hd`)

1. **Top-Left Narration Caption Box (`.hi`):**
   - Crisp paper card (`var(--mg-paper-hi)`), `2.5px solid var(--mg-ink)`, hard `4px 4px 0 var(--mg-ink)` shadow, compact padding (`8px 13px` desktop; tighter compact box on mobile `<= 700px` so it never crowds `.mark-wrap`).
   - `.hi-k` (`セレクテッド・エディション • 2026`) in vermilion with crisp 2px rule bar; `.hi-m` (`クリエイティブ空間`) in `Noto Sans JP` `900` crisp ink; `.clk` separated by a dashed ink rule with a square vermilion live-pulse indicator (`7×7px`).
2. **Top-Right Control Cluster (`.mark-wrap`):**
   - `.lang-btn` & `.theme-btn`: Sharp-cornered (`border-radius: 3px`) ink buttons with `2px solid var(--mg-ink)` border and `3px 3px 0 var(--mg-ink)` shadow; hover inverts to ink fill + paper text; active press shifts `translate(2px, 2px)` with `1px` shadow.
   - `.lang-menu`: Styled as a clean **Manga Index Panel** (`border: 2.5px solid var(--mg-ink)`, `5px 5px 0 var(--mg-ink)` shadow, crisp `border-radius: 4px`, vermilion indicator dot on active `日本語`) on both desktop dropdown and mobile bottom sheet — making switching back to any other language unmistakable and effortless.
   - `.mark` (Mascot Eye Badge): Framed inside a mini manga cameo box (`border: 2.5px solid var(--mg-ink)`, halftone dot backing, `3px 3px 0 var(--mg-red)` shadow, subtle `-3deg` tilt).
3. **Center Vermilion *Hanko* Pillar (`.block`):**
   - Crisp flat vermilion fill (`var(--mg-red)`), `3px solid var(--mg-ink)` border, zero soft drop blur.
   - `.block::after` transformed into a **45° diagonal crosshatch screentone offset shadow block** (`repeating-linear-gradient(-45deg, var(--mg-ink) 0 1.5px, transparent 1.5px 5px)`).
   - Inside `.block`, a `ja`-only vertical Japanese print seal element (`.mg-hanko-txt`, `data-i18n-own="1"`, `aria-hidden="true"`) displaying `作品集・二〇二六` in vertical writing mode (`writing-mode: vertical-rl`) at high legibility above the title line.
4. **Kinetic Manga Logo (`.title .t1` — `ポートフォリオ`):**
   - Bypass the organic wave SVG filter (`filter: none` in `ja` so the manga ink stroke stays razor-sharp and zero-jank on all screens!).
   - **Light Mode:** Cream-white fill (`#fffdf8`), bold ink stroke (`-webkit-text-stroke: 3px #111` with `paint-order: stroke fill`), stepped solid ink extrusion (`2px 2px 0`, `4px 4px 0`, `6px 6px 0 #111`).
   - **Dark Mode:** Deep ink fill (`#15151a`), crisp chalk-white stroke (`-webkit-text-stroke: 2.5px #f4efe4` with `paint-order: stroke fill`), dual stepped shadow (`3px 3px 0 #f4efe4`, `5px 5px 0 var(--mg-red)`).
   - **Hovered / Buddy-Seated Glyph (`:hover`, `.hot`, `.seated`):** Fills solid vermilion (`var(--mg-red)`) with crisp solid black/chalk outline.
5. **Buddy Micro-SFX Pop (`.mg-sfx` inside `#buddy`):**
   - A small floating manga sound-effect badge anchored near Buddy’s upper-right (`data-i18n-own="1"`, `aria-hidden="true"`, hidden outside `html[lang="ja"]` and disabled under `prefers-reduced-motion`).
   - Pops briefly (`650ms` snappy scale-in & fade-out) with contextual Japanese katakana SFX:
     - Letter jump -> `ピョコン!`
     - Click/poke -> `ドン!`
     - 3-click angry -> `ガーン!!`
     - Music card react -> `♪ ジャン!`
     - Other card react -> `バチッ!`
6. **Author & Stats *Obi* Strip (`.meta`):**
   - Crisp full-width *obi* divider bar with `2.5px solid var(--mg-ink)` top and bottom borders (`background: var(--mg-paper-hi)`), neatly separating Header Panel from Stage Panel.
   - `.stats-badge`: Sharp-cornered double-cell ink counter (`border: 2px solid var(--mg-ink)`, `3px 3px 0 var(--mg-ink)` shadow, crisp vertical ink divider between Views and Stars; starred state pops solid vermilion/amber print accent).
   - `.stat-toast`: In `ja`, restyled from frosted liquid glass to a sharp **Manga Speech Toast** (`border: 2.5px solid var(--mg-ink)`, `4px 4px 0 var(--mg-ink)` shadow, opaque `var(--mg-paper-hi)` fill).

### 5.5 Radial Wheel Stage (`.stage`)

1. **Dynamic Radial Speedlines (*Shūchūsen* / 集中線):**
   - Injected SVG (`.mg-speedlines`, `data-i18n-own="1"`, `aria-hidden="true"`) placed inside `.stage` behind `#wheel` (`z-index: 0`), radiating outward from the active card focal center with a clean paper ellipse clear-zone behind the center card.
   - Subtle resting opacity (`0.85` on `var(--mg-speed)` ~16–18% ink alpha). When `.stage.moving`, `.stage.drag`, or a brief `220ms` `.mg-snap` class triggers on active card switch, the speedlines pulse gently (`scale(1.035)` + slightly higher stroke contrast) for kinetic manga punch. Static under `prefers-reduced-motion`.
2. **Manga Compass Dial (`#ring`):**
   - Existing rotating SVG `#ring` inherits `--disc` (`var(--mg-stone)`) and `--ring` (`var(--mg-ink)`), plus CSS stroke boldness and subtle halftone backing circle so the dial reads as a sharp Japanese print compass.
3. **Action Arrows (`.arr.l`, `.arr.r`):**
   - **Desktop / Hover-Capable Viewports** (`@media (hover: hover)` or not `hover: none and pointer: coarse`): Square `42×42px` (`38×38px` on narrow mouse viewports `<= 700px`; `44×44px` on hybrid `hover: hover` + `pointer: coarse` devices) ink plates (`border: 2.5px solid var(--mg-ink)`, `background: var(--mg-paper-hi)`, `4px 4px 0 var(--mg-ink)` shadow). Invert on hover; tactile press shift on `:active`.
   - **Touch-Only Phones (`@media (hover: none) and (pointer: coarse)`):** Preserve the project’s existing `v218` rule in `css/pages.css:4140` — `.arr` stays visually hidden (`sr-only`, screen-reader accessible only) so touch users navigate via swipe & card tap without cluttering narrow phone screens. `css/manga-ja.css` MUST NOT override the `sr-only` properties under `(hover: none) and (pointer: coarse)`.
4. **Ink-to-Color Chapter Cover Cards (`.card`):**
   - **Frame & Geometry:** Sharp print corners (`border-radius: 4px`), `3px solid var(--mg-ink)` border, inner margin keyline (`inset: 5px; border: 1.5px solid rgba(255,255,255,0.55)`).
   - **Desktop `(pointer: fine)` — Full Ink-to-Color + Double Vermilion Shadow:**
     - Inactive side cards (`.card:not(.on)`): Photo renders as authentic **monochrome manga ink print** (`filter: grayscale(1) contrast(1.24) brightness(1.04)`) overlaid with a crisp CSS Ben-Day dot screen (`.gr` repurposed as a 4px halftone dot matrix in `ja`), with hard offset ink shadow (`6px 6px 0 var(--mg-shadow)`).
     - Active center card (`.card.on`): Smoothly snaps to **full vivid color** (`filter: saturate(1.08) contrast(1.04)`), halftone overlay fades out (`opacity: 0`), and card projects a dramatic **double offset shadow** (`6px 6px 0 var(--mg-ink), 11px 11px 0 var(--mg-red)`). Disable the rainbow conic holographic prism overlay (`.card.on::before` from `motion3d.css`) in `ja` so the cover stays 100% print-authentic.
   - **Mobile / Touch (`@media (pointer: coarse), (max-width: 700px)`) — Compositing-Safe Manga Contrast *(Architect’s Call)*:**
     - Respect `css/motion3d.css` §10’s anti-flicker compositing guard: keep `filter: none !important; transition: none !important;` on `.portrait-img` and use an **identical** crisp manga hard offset shadow (`5px 5px 0 var(--mg-shadow)`) on both `.card` and `.card.on` so touch dragging never forces shadow/filter re-rasterization or card flicker on mobile Safari/Chrome.
     - Deliver strong visual focus differentiation via pure GPU-composited layers: inactive side cards show an elevated **Ben-Day halftone + muted paper-ink scrim** (`.gr` + `.dim` at higher opacity) that cleanly fades to `opacity: 0` on `.card.on`, paired with the active card’s **Vermilion Red `.mg-ch` chapter stamp** and **Vermilion inner keyline accent**.
   - **Chapter Stamp (`.mg-ch`):** Injected into each of the 9 cards (`data-i18n-own="1"`, `aria-hidden="true"`, hidden outside `ja`) showing `第01話` through `第09話` in the top-left corner (`background: var(--mg-ink)`, `color: var(--mg-paper)`, crisp `1.5px` keyline); turns solid **Vermilion Red (`var(--mg-red)`)** with white text on `.card.on`.
   - **Manga Title Plaque (`.lb`):** Solid `var(--mg-paper-hi)` rectangular plaque at bottom-left with `2px solid var(--mg-ink)` border, `3px 3px 0 var(--mg-ink)` shadow, `Noto Sans JP` `900` crisp ink typography — guaranteeing 100% contrast on every photo.
   - **Collector’s Tankōbon Card Back (`.cback`):** When Cardistry Deal & Flip runs in `ja`, `.cback` uses sharp corners, bold double ink frame, vermilion + diagonal halftone pattern, and crisp ink-framed mascot medallion.
5. **Manga Speech Bubble Indicator (`.mk`) & Stage Marginalia:**
   - `.mk` becomes an authentic **comic speech bubble** (`background: var(--mg-paper-hi)`, `border: 2.5px solid var(--mg-ink)`, `4px 4px 0 var(--mg-ink)` shadow, `padding: 5px 14px`) with a crisp CSS dual-triangle upward speech tail (`::before` ink outline + `::after` paper fill) pointing directly toward the active card, displaying the active chapter & localized name (e.g. `第03話 · プロフィール`, synced cleanly on card change and language change).
   - Bottom-left `.stage::after` (`←   スワイプ  ·  カードをタップ   →`) styled as a crisp ink-bordered reader tag (`background: var(--mg-paper-hi)`, `border: 2px solid var(--mg-ink)`).
   - Bottom-right injected page counter (`.mg-page-num`, `data-i18n-own="1"`, `aria-hidden="true"`, hidden outside `ja` and on compact landscape/small mobile if colliding) showing `第 03 / 09 話` synced live to the active card index.

### 5.6 Language Switch Transition (Entering / Leaving `ja`)

- When the user clicks a language option in `#langMenu` that switches **into** or **out of** `"ja"`, and `prefers-reduced-motion` is not set:
  - If `document.startViewTransition` is supported, run the switch inside a quick crisp circular wipe originating from `#langBtn` (reusing the existing `--vt-x`, `--vt-y`, `--vt-r` CSS variables from `motion3d.css`!) so switching into Japanese literally floods the Home page with manga ink & paper — and switching back cleanly wipes back to Warm Editorial!
  - Fallback (browsers without View Transitions or `prefers-reduced-motion: reduce`): immediate clean switch with zero flash or broken state.

---

## 6. File & Integration Architecture

### New Files
1. **`css/manga-ja.css`** — All `html[lang="ja"]` Home Manga styles (tokens, light/dark, manuscript frame, *tonbo* crop marks, halftone screens, header narration box, *hanko* banner, `ポートフォリオ` lettering, *obi* meta strip, stats/toast, language menu, speedlines, ink-to-color cards, chapter stamps, title plaques, speech bubble indicator, tankōbon card back, responsive breakpoints, and `prefers-reduced-motion`). Every single selector MUST be prefixed with `html[lang="ja"]` and scoped away from `.pg`.
2. **`js/manga-ja.js`** — Lightweight, zero-rAF event-driven module:
   - Injects `ja`-only decorative elements (`data-i18n-own="1"`, `aria-hidden="true"`): `.mg-frame` + desktop marginalia codes, `.mg-hanko-txt` inside `.hd .block`, `.mg-speedlines` SVG inside `.stage`, `.mg-page-num` inside `.stage`, `.mg-ch` (`第01話`–`第09話`) inside each `.card`, and `.mg-sfx` inside `#buddy`.
   - Exposes `window.__zkMangaSyncCard(idx)` (updates `.mg-page-num`, prefixes `#mk` chapter tag when `ja`, pulses `.mg-snap` on speedlines) and `window.__zkMangaBuddySfx(kind)` (triggers Buddy katakana micro-SFX when `ja`).
   - Listens to `zk-lang` & `zk-theme` to sync `#themeColor` meta tag, refresh `#mk` display, and trigger Buddy geometry recalculation once Japanese webfonts finish loading.

### Minimal Edits to Existing Files
1. **`index.html`**:
   - Append `&family=Dela+Gothic+One&family=Noto+Sans+JP:wght@700;900&family=Space+Mono:wght@700` to the existing Google Fonts `<link>`.
   - Add `<link rel="stylesheet" href="css/manga-ja.css?v=1" />` right after `css/theme.css` (and after `css/motion3d.css` so it cleanly overrides Home card sheen/tilt defaults for `html[lang="ja"]`).
   - Add `<script src="js/manga-ja.js?v=1" defer></script>` after `js/carousel.js`.
2. **`js/carousel.js`** (~6 lines):
   - Call `window.__zkMangaSyncCard && window.__zkMangaSyncCard(activeIdx)` when `activeIdx` changes and inside `syncCarouselLang()`.
3. **`js/buddy.js`** (~10 lines):
   - Listen to `zk-lang` and `document.fonts.ready` to invalidate `geom.valid = false` and re-run `ensureSeat()` (fixes alignment whenever font/glyph count changes).
   - Call `window.__zkMangaBuddySfx && window.__zkMangaBuddySfx(kind)` on letter jump (`"jump"`), click poke (`"poke"`), 3-click angry (`"angry"`), and card react (`"music"` / `"react"`).
4. **`js/i18n.js`** (~15 lines inside `#langMenu` click handler):
   - When switching between `ja` and non-`ja` via clicking a `.lang-opt` button (not initial page load), wrap `set(x[0])` in `document.startViewTransition` originating from `#langBtn` if supported and motion is allowed.
5. **`js/theme.js`** (~4 lines):
   - In `syncTheme()`, let `#themeColor` use `#0c0c0f` / `#f4efe4` when `document.documentElement.lang === "ja"`.
6. **`.gitignore`**:
   - Add `.superpowers/` so temporary brainstorming mockup files are never accidentally committed.

---

## 7. Decisions Left to the Builder

- Exact SVG coordinate tuning of the ~20–28 variable-width radial speedlines inside `.mg-speedlines` so the clear-zone ellipse adapts cleanly across ultrawide, standard desktop, and portrait mobile viewports.
- Exact micro-spacing and font-size clamping adjustments for `<= 700px`, `<= 400px`, and `<= 480px` landscape media queries so zero overlap occurs between the narration box, Buddy, `ポートフォリオ`, obi meta strip, and cards.
- Exact CSS specificity handling against existing `!important` rules in `css/theme.css`, `css/layout.css`, `css/pages.css`, and `css/motion3d.css` (prefer clean `html[lang="ja"] body ...` selectors, while strictly respecting `pages.css:4140` hidden arrows on `(hover: none) and (pointer: coarse)` and `motion3d.css:502` touch compositing guard on `.portrait-img` / uniform `.card` shadow).

---

## 8. Verification Plan

1. **Syntax & Formatting Check:** Run `node --check` on all modified/created JS files (`js/manga-ja.js`, `js/carousel.js`, `js/buddy.js`, `js/i18n.js`, `js/theme.js`).
2. **Real Browser Audit (Playwright) across Desktop (`1440×900`) & Mobile Portrait Touch (`390×844`):**
   - **Default (`id`) Regression Check:** Confirm Home page in Indonesian looks and behaves 100% identically to before (no manga frame, no speedlines, no chapter badges, no console errors).
   - **Switch to Japanese (`ja`) Light Mode (Desktop `1440×900`):** Click `#langBtn` → `日本語` → verify `html[lang="ja"]` activates Tankōbon Paper aesthetic: manuscript frame, *tonbo* crop marks, narration box, vermilion *hanko* with `作品集・二〇二六`, `ポートフォリオ` bold outline lettering with Buddy cleanly seated on a Katakana glyph, obi meta strip, speedlines, `第01話`–`第09話` chapter stamps, monochrome side cards vs vivid color center card with double vermilion shadow, speech bubble indicator (`第03話 · ...`), ink-plate `.arr.l`/`.arr.r` arrows, and `0` console errors.
   - **Interactive Checks (Desktop `ja`):** Click next/prev arrows and cards → confirm Ink-to-Color transition, speedline pulse, page counter update, speech bubble update, and Buddy micro-SFX pop on letter click/jump.
   - **Mobile Portrait Touch (`390×844`, `hasTouch: true`):** Confirm clean responsive spacing with zero header/card overlap, `.arr` remains visually hidden (`sr-only` per `v218`), touch drag/swipe & card tap switch active cards smoothly without flicker (compositing-safe halftone scrim + vermilion chapter stamp/keyline focus), and touch controls (`#langBtn`, `#themeToggle`) remain comfortably tappable (`>= 44px` on coarse pointers).
   - **Dark Mode (`ja` Midnight Ink):** Click `#themeToggle` → confirm inverted chalk-ink panel borders, black paper surface, vermilion accents, and crisp contrast (`>= 4.5:1`).
   - **Zero Bleed Check (`.pg`):** While in `ja`, open multiple cards (e.g. `Me`, `Proyek`, `Skill`, `Kontak`) → confirm inner scenes render cleanly without manga frame/speedline bleed, then close back to Home and confirm Manga Home resumes cleanly.
   - **Switch Back to `id` / `en`:** Confirm every Manga Home override disappears completely and original Warm Editorial Home restores cleanly.
   - **Reduced Motion Check:** Emulate `prefers-reduced-motion: reduce` in `ja` and confirm static speedlines, no SFX bounce, and instant crisp switches.
