# Design Spec — Card #10: `Food` ("TASTE LAB" — Zikri's Favourite Food)

- **Date:** 2026-11-28
- **Target Repo:** `/home/zikripacaryuha/my-portofolio` (vanilla HTML/CSS/JS, zero framework, zero npm runtime build step, GitHub Pages)
- **Card Slot:** Card #10 (0-based index `9`, page class `.pg.p9`)

---

## 1. Intent & Why

Zikri's interactive portfolio treats every card on the radial wheel as its own signature visual stage (e.g., Card #8 `Fashion` 3D Runway, Card #9 `Rumah` 3D Estate). Card #10 **`Food`** showcases Zikri's **5 favourite dishes** (**Tonkotsu Ramen, Grilled Steak, Ayam Geprek, Spaghetti Meatballs, Chicken Katsu Curry**) through a cohesive two-act culinary experience:

1. **Act 1 — Marble Lazy-Susan Top-Down Carousel:** Faithfully adapts the *Gelato Lab* full-screen editorial flat-lay layout (pale marble ring carrying 5 ceramic dishes, 72° rhythmic turn every 1.9 s, smooth pastel background & ink crossfade, giant chunky display title overlapped by the front dish, scattered table props, and clean two-corner navigation).
2. **Act 2 — Interactive Gravity Drop & Real-Time Fluid Assembly:** Clicking the active dish (or CTA button) transitions smoothly into a dedicated plating stage where the empty ceramic plate/bowl appears below, and each separated cooked ingredient drops from above with gravity physics, shadows, and bounce—accompanied by real-time Canvas 2D broth/sauce pouring, ripples, splashes, and rising steam.

---

## 2. Goals, Non-Goals & Anti-Goals

### Goals
- **Faithful Act 1 visual craft:** Preserve *Gelato Lab*'s exact layout proportions, typography (`Dela Gothic One` + `Archivo`), ring geometry, timing (`1400 ms` hold + `500 ms` eased turn), responsive portrait/landscape scaling (`--u`), and visual cleanliness.
- **Delightful Act 2 plating choreography:** Each of the 5 dishes plays a bespoke chef-ordered gravity drop animation using all 30 real photographic ingredient/plate cutouts plus bespoke Canvas 2D liquid pour & steam FX.
- **Seamless portfolio citizenship:** Full integration with `ZK3D.registerPage(9, ...)`, 0% idle CPU/GPU when closed, 8-language i18n + RTL support (`id`, `en`, `zh`, `es`, `ar`, `fr`, `ja`, `ko`), Japanese Manga Home mode (`第10話`), Home wheel backdrop sync (`background.js`), and strict CSS scoping under `.pg.p9`.
- **Lightweight CSP-compliant delivery:** Every image served locally as optimized `.webp` (`~1.5–2.5 MB` total across all assets vs. `~27 MB` raw) with zero external image URLs (strict `img-src 'self' data: blob:` CSP compliance).

### Non-Goals
- No e-commerce cart, checkout, pricing, or ordering flow (this is a personal showcase, not a restaurant store).
- No WebGL / Three.js requirement for this card (pure DOM transforms + lightweight Canvas 2D for fluids/steam guarantees instant load and 60 FPS on 4 GB / mobile devices).
- No modification to existing Cards #0–#8 (`Story` through `Rumah`).

### Anti-Goals (Failure Conditions)
- White halos, jagged edges, or eaten-away white rice / parmesan on transparent cutouts.
- Bowls of inconsistent diameter or off-center alignment on the marble ring (specifically accounting for `ramen`'s protruding nori sheets).
- Clipped ring drop shadow box or overlapping/unreadable typography on any target viewport (`1440×900`, `1440×810`, `768×1024`, `390×844`, `360×640`, `844×390`).
- Leaked `requestAnimationFrame` loops, listeners, or CSS bleed after closing Card #10.

---

## 3. Constraints

1. **Zero frameworks / zero build step:** Plain HTML, CSS, and IIFE-scoped vanilla JavaScript matching `js/runway.js` and `js/estate.js` conventions.
2. **Strict Content-Security-Policy (`index.html`):**
   - `img-src 'self' data: blob:` — NO external image URLs at runtime (the marble ring must be stored locally at `assets/food/ring/marble-ring.webp`).
   - `style-src 'self' 'unsafe-inline' https://fonts.googleapis.com` and `font-src 'self' https://fonts.gstatic.com data:` — append `Archivo:wght@500;600;700` to the existing Google Fonts stylesheet link (`Dela Gothic One` is already loaded).
3. **Strict scoping:** All styles must be scoped to `.pg.p9`, `body.fd-active`, `.card.foodphoto`, and `html[data-rtl="1"] .pg.p9`. Design unit `--u` MUST be set on `.fd-stage` (never on global `:root`) to prevent collisions.
4. **Accessibility & reduced motion:** Keyboard navigation (`ArrowLeft`, `ArrowRight`, `Enter`, `Space`, `Escape`), ARIA labels on all interactive controls, `prefers-reduced-motion: reduce` respected in both Act 1 and Act 2.

---

## 4. Approaches Considered & Chosen Decision

Three architectural approaches were evaluated for Act 2 ("ingredients falling into the bowl + broth/sauce pour") given that all 5 user-generated assembly sprite sheets are 90° top-down studio photography:

1. **Approach 1 — Pure Top-Down Z-Drop:** Plate centered flat; ingredients scale from `2.6×` down to `1.0×` along Z into the viewer's plane. *Trade-off:* Zero perspective distortion, but motion reads as "falling into screen depth" rather than "falling from above into a bowl below".
2. **Approach 2 — Steep Tilted 2.5D (`rotateX(45deg)`):** Plate tilted steeply at the bottom so ingredients drop vertically along Y. *Trade-off:* Dramatic vertical drop, but 90° top-down ceramic plates lack side walls and look noticeably flattened/cardboard at 45°.
3. **Approach 3 — Hybrid Gravity Drop *(Selected & Approved Direction)*:**
   - The assembly platter sits slightly below viewport center inside `perspective(1200px)` with a subtle **`rotateX(14deg)`** table tilt—enough to convey tabletop depth while keeping circular ceramic plates photorealistic and un-flattened.
   - Each ingredient launches from above the stage (`translateY(-115%)` + elevated scale `1.65× → 1.0×` + subtle spin + dynamic shadow tightening + landing squash/bounce) so the eye unmistakably reads **"ingredients dropping from above into the plate below"**.
   - A dedicated Canvas 2D fluid layer renders a top-down pouring stream (broth, glaze, chili oil, marinara, or curry) arcing down from above the platter, expanding with concentric ripples clipped cleanly inside the dish basin, followed by soft rising steam wisps.

---

## 5. Asset Pipeline & Normalization Specification

All 12 user-provided raw assets under `assets/food/` have been visually inspected and verified ready:

| Source Raw File | Output Runtime Asset(s) | Processing & Normalization Rules |
| --- | --- | --- |
| `card/card.png` (`1086×1448`) | `assets/food/card/card-food.webp` | Resize to max `720×960` (3:4 portrait), WebP q=86 (~80–120 KB). Intentional user portrait cover. |
| Gelato Lab Marble Ring (`1024×1024`) | `assets/food/ring/marble-ring.webp` | Download once during implementation from `https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261123_061250_28696685-24a2-408e-8365-47c9b892d5cc.png&w=1024&q=90` and save locally (WebP q=90, ~30 KB). Center `(507.5, 502.5)`, `ro = 462.5`, `ri = 354`, `BAND = 0.8827`. Masked via CSS `radial-gradient` (not pre-masked pixels). |
| `props/food-props.jpg` (`2752×1536`) | `assets/food/props/{chopsticks,chili-lime,herbs-tomato,fork,spoon}.webp` | Split into 5 individual transparent RGBA WebP cutouts (`max dim 480px`, q=88). Clean background removal preserving metallic gold sheen and crisp herb/chili silhouettes. |
| 5 × `dishes/*.png` (`2048×2048`) | `assets/food/dishes/{ramen,steak,ayam-geprek,spaghetti,chicken-katsu}.webp` | Flood-fill + anti-aliased edge alpha matting. **Critical normalization:** detect each dish's circular ceramic rim `(cx, cy, R_plate)` and center it at `(512, 512)` with uniform radius `R_plate = 450px` on a `1024×1024` transparent canvas (`COUPE_FILL = 900 / 1024 = 0.8789`). This guarantees `ramen.webp`'s protruding nori sheets never shrink or offset the bowl relative to the other 4 plates. |
| 5 × `assembly/*/*.{jpg,png}` (3×2 grids) | `assets/food/assembly/{slug}/plate.webp` + `ing-*.webp` (31 files total: 5 plates + 26 ingredients) | Extract 6 cells per sheet. Each `plate.webp` is normalized to the **exact same `1024×1024` rim circle `(512, 512, R=450)`** as its Act 1 dish for seamless transitions. Each ingredient is tightly cropped (`max dim 640px`, transparent RGBA WebP q=88) using border-seeded flood-fill + luminance/chroma edge feathering so white rice (`ayam-geprek`, `chicken-katsu`) and pale parmesan (`spaghetti`) retain 100% crisp grain edges without interior holes. **Special cutout polish (Builder Call):** (a) On `ramen` `ing-1` (square noodle block), apply a soft rounded organic edge mask so the noodles sit submerged naturally in the circular tonkotsu broth without hard 90° corners; (b) On `ramen` cell 5 (narutomaki atop nori), cleanly separate the crisp circular white/pink `narutomaki` into `ing-5-naruto.webp` and patch the dark nori area behind it using surrounding nori texture into `ing-4-nori.webp`, while scallions+sesame become `ing-6-garnish.webp` (giving Ramen 6 distinct layers so nori tucks at the left rim and narutomaki crowns the center just like `dishes/ramen.webp`); (c) On `steak`, keep `ing-3` (3-potato cluster) and `ing-4` (3-tomato cluster) intact as curated balanced clusters framing opposite arcs of the sliced ribeye (no destructive splitting). Live assembled cutouts stay active after landing (no swap to `dishes/*.webp`) so interactive chip bounce always targets the real ingredient layers. |

**Repo Hygiene (Builder Call):** Once all processed `.webp` assets are visually verified in Playwright, delete the ~27 MB raw uncompressed `.png`/`.jpg` duplicates in `assets/food/` so the Git repository and GitHub Pages deployment stay fast and clean.

---

## 6. Dish Data, Palette & Bespoke Plating Choreography

### 6.1 Five Dishes & High-Contrast Pastel Palettes

Every `bg` / `ink` pair maintains WCAG AAA contrast (`≥ 9:1`) while letting each ceramic plate's glaze color pop:

| # | Slug | Act 1 2-Line Title | Ceramic Vessel | `bg` (Pastel Field) | `ink` (Display & UI) | Fluid Pour Accent |
| :-: | --- | --- | --- | --- | --- | --- |
| 0 | `ramen` | `TONKOTSU /` `RAMEN` | Matte Black Bowl + Gold Rim | `#EED9C4` *(Toasted Sesame)* | `#322018` *(Espresso)* | Creamy Tonkotsu Broth (`#F2DFBE` / `#DEC08A`) |
| 1 | `steak` | `GRILLED /` `STEAK` | Cobalt Navy Plate + Gold Rim | `#C9D7EA` *(Slate Sky)* | `#182942` *(Midnight Navy)* | Dark Demi-Glace (`#4A2116` / `#783822`) |
| 2 | `ayam-geprek` | `AYAM /` `GEPREK` | Terracotta Plate + Gold Rim | `#F4CCB8` *(Apricot Peach)* | `#4D1E10` *(Chili Mahogany)* | Sambal Chili Oil (`#D92B1C` / `#F05A28`) |
| 3 | `spaghetti` | `SPAGHETTI /` `MEATBALLS` | Sage Green Bowl + Gold Rim | `#CBDCC8` *(Pistachio Sage)* | `#1D3523` *(Forest Basil)* | Marinara Swirl (`#C82E1E` / `#E5502F`) |
| 4 | `chicken-katsu` | `CHICKEN /` `KATSU` | Deep Burgundy Plate + Gold Rim | `#E9D49B` *(Golden Cream)* | `#441825` *(Wine Burgundy)* | Japanese Curry (`#A67518` / `#CC9324`) |

### 6.2 Act 2 Bespoke Plating Sequences

All ingredient final placement coordinates `(x%, y%, width%, rotationDeg, zIndex)` are calibrated relative to the `1024×1024` normalized plate canvas so the assembled result faithfully mirrors the reference finished dish photo (`dishes/{slug}.webp`):

1. **`ramen` (Tonkotsu Ramen — 6 ingredient layers):**
   - `t=0.00s` Empty black matte bowl lands.
   - `t=0.22s` **Canvas Pour:** Creamy tonkotsu broth pours vertically from top into center basin, filling inner circle (`r ≈ 0.365 × platter`) with concentric glossy ripples + golden tare droplets.
   - `t=0.62s` `ing-1` (organically rounded ramen noodles) drops center-left into broth → broth ripple splash.
   - `t=0.94s` `ing-2` (2 chashu slices) drops lower-right.
   - `t=1.22s` `ing-3` (2 ajitama egg halves) drops upper-right.
   - `t=1.48s` `ing-4-nori` (2 roasted nori sheets) tucks cleanly along the left bowl rim.
   - `t=1.72s` `ing-5-naruto` (pink-swirl narutomaki slice) bounces onto center noodles.
   - `t=1.96s` `ing-6-garnish` (scallions + toasted sesame) rains onto center crown.
   - `t=2.25s+` Warm rising steam wisps drift above bowl.

2. **`steak` (Grilled Steak — 5 ingredient layers):**
   - `t=0.00s` Empty cobalt blue plate lands.
   - `t=0.30s` `ing-3` (3 roasted baby potatoes cluster) drops onto the upper-left arc.
   - `t=0.58s` `ing-4` (3 blistered cherry tomatoes cluster) drops onto the lower-right/edge balance.
   - `t=0.88s` `ing-1` (sliced medium-rare steak) lands diagonally across the center.
   - `t=1.22s` **Canvas Pour:** Glossy dark demi-glace ribbon drizzles down from top across the steak slices.
   - `t=1.54s` `ing-2` (melting garlic herb butter) lands squarely on center steak with golden sheen ripple.
   - `t=1.84s` `ing-5` (rosemary sprig + cracked black peppercorns) flutters beside steak.
   - `t=2.15s+` Subtle sizzling sear steam.

3. **`ayam-geprek` (Ayam Geprek):**
   - `t=0.00s` Empty terracotta plate lands.
   - `t=0.30s` `ing-2` (steamed white rice dome + fried shallots) lands center-right.
   - `t=0.62s` `ing-1` (crispy smashed fried chicken) lands center-left with crisp bounce.
   - `t=0.98s` `ing-3` (coarse red sambal geprek mound) lands directly atop chicken + **Canvas Splash:** glistening red chili oil droplets & burst ring radiate around the chicken.
   - `t=1.34s` `ing-4` (3 fresh cucumber slices) lands upper-left.
   - `t=1.64s` `ing-5` (kemangi lemon basil sprig) lands lower-right.
   - `t=1.95s+` Warm spicy steam wisps.

4. **`spaghetti` (Spaghetti Meatballs):**
   - `t=0.00s` Empty sage green pasta bowl lands.
   - `t=0.30s` `ing-1` (coiled golden spaghetti nest) lands center.
   - `t=0.64s` **Canvas Pour + `ing-3`:** Rich red marinara pours from top onto pasta and blooms cleanly as the marinara swirl settles.
   - `t=1.06s` `ing-2` (4 seared glazed meatballs) drops onto pasta with bouncy settle.
   - `t=1.42s` `ing-4` (grated parmesan snow) rains gently across center.
   - `t=1.74s` `ing-5` (fresh sweet basil leaves) crowns center.
   - `t=2.05s+` Aromatic pasta steam.

5. **`chicken-katsu` (Chicken Katsu Curry):**
   - `t=0.00s` Empty deep burgundy plate lands.
   - `t=0.30s` `ing-2` (steamed white rice w/ black sesame) lands upper-right.
   - `t=0.60s` `ing-4` (shredded crisp green cabbage) lands upper-left.
   - `t=0.92s` **Canvas Pour + `ing-3`:** Thick velvety golden-brown Japanese curry pours from top into the lower-right crescent of the plate, expanding smoothly as the curry pool settles.
   - `t=1.36s` `ing-1` (sliced crispy chicken katsu w/ glaze & sesame) lands lower-left.
   - `t=1.70s` `ing-5` (fresh yellow lemon wedge) tucks between katsu and curry.
   - `t=2.00s+` Hot Japanese curry steam.

---

## 7. Detailed UI Architecture & Interactions

### 7.1 Act 1 — Lazy-Susan Hero (Gelato Lab Spec Fidelity)
- **Scaling (`--u` on `.fd-stage`):**
  - Desktop / landscape (`W / H >= 0.9`): `.fd-canvas-stage` is `1440u × 900u` centered at `left: 50%; top: 50%; transform: translate(-50%, -50%)` with `u = Math.min(W / 1440, H / 900)`. On short landscape screens (`H < 560`, e.g., phones rotated sideways `844×390` / `667×375`), `u = Math.min(W / 1440, H / 770)` so the centered `900u` stage intentionally crops slightly at the top/bottom edges instead of shrinking text too small.
  - Portrait (`W / H < 0.9`): `.fd-stage.is-portrait`, `.fd-canvas-stage` is `390u × hs·u` centered with `u = Math.min(W / 390, H / 760)`, `hs = H / u`.
- **Background Atmosphere Layers (shared across Act 1 & Act 2):**
  - `.fd-waves` (`position: absolute; inset: 0; z-index: 0; opacity: 0.5; pointer-events: none`): static repeating inline SVG wave pattern (`background-size: calc(120 * var(--u)) calc(28 * var(--u))`):
    `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='28' viewBox='0 0 120 28'%3E%3Cpath d='M0 14 C 15 4, 30 4, 45 14 S 75 24, 90 14 S 112 6, 120 14' fill='none' stroke='rgba(30,20,50,0.16)' stroke-width='1.1'/%3E%3C/svg%3E")`.
  - `.fd-vignette` (`position: absolute; inset: 0; z-index: 10; pointer-events: none`): `radial-gradient(ellipse 75% 70% at 50% 45%, transparent 55%, rgba(20, 10, 40, 0.22) 100%)`.
- **Geometry & Ring:**
  - Desktop: `R = 430`, `big = 470`, `small = 292`, `bowlY = 418`, `cx = 720`, `cy = -12`.
  - Portrait: `R = 222`, `big = 262`, `small = 158`, `stackH = big + 22 + 138 + 20 + 50`, `top = 82`, `avail = hs - 70 - top`, `bowlY = top + max(0, (avail - stackH) * 0.45) + big / 2`, `copyTop = bowlY + big / 2 + 22`, `titleTop = copyTop + 158`.
  - `#fdRing`: `D = 2 * R / 0.8827` (`≈ 974u` desktop, `≈ 503u` portrait), `background-image: url("../assets/food/ring/marble-ring.webp")`, `k = D / (2 * 462.5)`, `background-size: 1024·k·u`, `background-position: (D/2 - 507.5·k)·u  (D/2 - 502.5·k)·u`, CSS `mask-image` / `-webkit-mask-image` radial annulus (`ri = D/2 · 354/462.5 · u`, `ro = D/2 · u`), transforms with `translate((cx - D/2)u, (cy - D/2)u) rotate(p * 72deg)`.
  - `#fdRingShadow`: Expanded container `D + 28u` (offset `-14u` in X/Y, shifted down `+10u`) with radial-gradient stops recalculated to the expanded radius so the outer feather never clips against the box edges.
  - Dishes (`5 × button.fd-dish` + `.fd-dish-shadow`): `size = big / 0.8789` (matching `COUPE_FILL = 0.8789` so every visible ceramic rim diameter is exact `big` in front and `small` at sides). Active front dish (`|diff| < 0.35`) is clickable to launch Act 2; side dishes (`diff ≈ ±1`) step the ring directly to that dish.
  - **Props (5 individual transparent cutouts):** Static at exact Gelato Lab edge slots:
    - Desktop: `chopsticks [-34, 168, 210, -14]`, `chili-lime [34, 340, 128, 0]`, `herbs-tomato [1238, 360, 174, 0]`, `fork [86, 760, 210, 0]`, `spoon [1146, 760, 210, 0]`.
    - Portrait (`c = bowlY`, `t = max(titleTop, hs - 170)`): `chopsticks [-46, c+150, 114, -14]`, `chili-lime [-24, c+250, 76, 0]`, `herbs-tomato [310, c+170, 98, 0]`, `fork [-44, t+62, 150, 0]`, `spoon [284, t+62, 150, 0]`.
- **Exact Desktop & Portrait Copy Positions (Gelato Lab §5.3):**
  - **Desktop (`1440×900` frame):**
    - `.fd-eyebrow` (`FAVOURITES`, localized): `left: 158u; top: 455u; z-index: 6`, `Archivo 600`, `font-size: max(9px, 15u)`, `letter-spacing: 0.42em`, color `var(--fd-ink)`, flex row `gap: 18u`, `::before` & `::after` `64u × 1.5u` rules in `currentColor` (`::after` `margin-left: -6u`).
    - `.fd-flavour` (2-line dish title, **brand-locked Latin** — see Localization Call below): `left: 190u; top: 497u; z-index: 6`, `Archivo 700`, `font-size: max(11px, 21u)`, `line-height: 1.28`, `letter-spacing: 0.2em`, color `var(--fd-ink)`, fades up/out for `t < 0.5` and fades in from below for `t >= 0.5`.
    - `.fd-cta` (`RAKIT MENU` / `ASSEMBLE`, localized): `left: 190u; top: 572u; width: 156u; height: 50u; z-index: 6`, `border: 2u solid var(--fd-ink)`, `border-radius: 8u`, transparent bg, `Archivo 600` `max(9px, 14u)`, `letter-spacing: 0.2em`, color `var(--fd-ink)`; hover fills with `var(--fd-ink)` and switches text to `var(--fd-bg)` (`0.25s`). Clicking opens Act 2.
    - `.fd-title` (`TASTE LAB`, **brand-locked Latin**): `left: 190u; top: 632u; z-index: 3`, `Dela Gothic One 400`, `line-height: 1`, `letter-spacing: -0.01em`, `white-space: nowrap`, color `var(--fd-ink)`; measured at `100px` after `document.fonts.ready` and fitted to exact **`1062u`** width; overlapped cleanly at its top edge by the center dish (`bowlY + big/2 = 653u > 632u`, dish `z-index ≥ 4`).
  - **Portrait (`390 × hs` frame, centered column):**
    - `.fd-eyebrow` centered at `top: copyTop`, `max(9px, 12u)`, rules `40u`, `gap: 12u`.
    - `.fd-flavour` centered (`left: 0; right: 0; text-align: center`) at `top: copyTop + 30`, `max(11px, 17u)`.
    - `.fd-cta` centered at `top: copyTop + 92`, `140u × 46u`, `max(9px, 13u)`.
    - `.fd-title` centered at `top: titleTop`, fitted to exact **`350u`** width.
  - **Localization Policy (Builder Call, matching Card #9 `THE GRAND ESTATE` & Card #4 `FRAME`):** Keep the giant display wordmark **`TASTE LAB`** and the 5 2-line Act 1 signature dish titles (`TONKOTSU / RAMEN`, `GRILLED / STEAK`, `AYAM / GEPREK`, `SPAGHETTI / MEATBALLS`, `CHICKEN / KATSU`) brand-locked in uppercase Latin so `Dela Gothic One` and `Archivo` always render with exact display proportions (`1062u` / `350u`, zero glyph fallback collisions). Localize **all UI chrome, eyebrow, CTA button, menu drawer, Act 2 descriptions, ingredient chip names, replay/back buttons, and ARIA labels** across all **8 languages** (`id`, `en`, `zh`, `es`, `ar`, `fr`, `ja`, `ko`) with full RTL (`html[data-rtl="1"] .pg.p9`) mirroring where appropriate.
- **Two-Corner Outlined Square Buttons (Exact Gelato Lab §5.2):**
  - Desktop: `position: absolute; top: 26u; width: 60u; height: 60u; border: 1.5u solid color-mix(in srgb, #fff 55%, transparent); border-radius: 14u; background: transparent; color: #fff; z-index: 20; display: grid; place-items: center; transition: background 0.25s ease`. Left button at `left: 40u`; right button at `right: 40u`; SVG icons `24u × 24u` (`stroke-width: 1.8`, round caps); hover `background: rgba(255, 255, 255, 0.14)`.
  - Portrait: `top: 18u`, `left/right: 18u`, `48u × 48u`, `border-radius: 12u`, icons `21u × 21u`.
  - **Top-Left (`.fd-nav-back`):** Left arrow (`←`) — closes Card #10 and returns smoothly to the Home portfolio wheel.
  - **Top-Right (`.fd-nav-menu`):** 3-line menu icon (`M4 7h16M4 12h16M4 17h16`) — toggles a compact floating frosted menu popover containing:
    - All 5 dishes (click to jump directly to any dish, showing active indicator)
    - Auto-Rotate Play / Pause toggle button
    - Quick "Assemble Active Dish" shortcut
- **Auto-Loop & Ergonomics:**
  - `HOLD = 1400ms`, `TURN = 500ms`, Newton-Raphson `cubic-bezier(0.42, 0, 0.58, 1)`.
  - Gap guard: if `dt > 250ms` (background tab), shift `phaseStart` forward by `dt` to prevent multi-step jumps.
  - Hover pause: hovering `.fd-cta`, the center `.fd-dish`, or opening the top-right popover pauses the hold timer cleanly so users never mis-click a moving plate; resumes smoothly on leave/close.
  - Touch swipe: horizontal swipe on Act 1 steps the lazy-susan left/right (`±1` dish) cleanly.

### 7.2 Act 2 — Hybrid Gravity Drop Assembly Stage (`.fd-asm`)
- **Transition:** Act 1 smoothly recedes (`scale(0.94) opacity: 0`, `360ms`, `pointer-events: none`), Act 1 rAF loop pauses, and `.fd-asm` fades in over the same dish pastel `--fd-bg` + subtle `.fd-waves` & `.fd-vignette`.
- **Layout (Responsive — Desktop 2-column balanced OR Centered Platter + Bottom Strip):**
  - Keep it super iconic, clean, and uncluttered across every viewport:
  - **Top Corner Controls (same visual language as Act 1):**
    - Top-Left square button: **`←`** Back to Act 1 Lazy-Susan.
    - Top-Center quiet badge: `01 / 05` + Dish Title (`TONKOTSU RAMEN`).
    - Top-Right compact square controls: **`‹`** (Prev Dish), **`›`** (Next Dish), and **`↻`** (Replay Drop).
  - **Center Platter Stage:**
    - Elevated subtly tilted 2.5D tabletop container (`perspective: 1200px`, inner `.fd-platter-3d` with `rotateX(14deg)`).
    - Layer stack inside `.fd-platter-3d`:
      1. `.fd-platter-shadow`: deep soft radial contact shadow on the table.
      2. `img.fd-asm-plate`: normalized empty ceramic plate/bowl (`plate.webp`).
      3. `canvas.fd-asm-fluid-under`: for liquids poured *beneath* or *into* the bowl basin before toppings land (Tonkotsu broth, Japanese curry pool).
      4. `5–6 × .fd-asm-ing`: each ingredient cutout (6 layers for Ramen, 5 layers for the other 4 dishes) with its own dynamic ground shadow pseudo-element that tightens & darkens as the piece approaches `translateY(0) scale(1)`.
      5. `canvas.fd-asm-fluid-over`: for top-down pouring streams, sauces drizzled *over* food (Steak demi-glace, Ayam Geprek chili oil splash, Spaghetti marinara pour), and post-landing rising steam wisps!
  - **Bottom Info & Interactive Ingredient Strip:**
    - 1 crisp personal line (localized across 8 languages) describing why Zikri loves this dish.
    - **Interactive Ingredient Chips (5–6 chips):** Light up sequentially in sync with each piece landing. Clicking/tapping any chip after assembly completes gives that specific ingredient a playful lift-bounce + soft glow pulse so visitors can playfully inspect every layer!
    - Primary compact action pill: **`↻ Ulangi Rakit`** (Replay Drop) & **`← Meja Putar`** (Back to Carousel) — cleanly spaced, zero horizontal overflow on 360px phones.
- **Reduced Motion (`prefers-reduced-motion: reduce`):**
  - Act 1: `HOLD = 3000ms`, `TURN = 1ms`, immediate snap with zero ring rotation.
  - Act 2: Plate, static liquid layer (rendered once on canvas), and all 5 ingredients appear immediately in their plated coordinates with no drop trajectory or continuous steam rAF loop.

---

## 8. Portfolio Integration & File Map

### New Files
- `css/food.css` — All Act 1, Act 2, responsive, reduced-motion, and RTL styles strictly scoped under `.pg.p9`, `body.fd-active`, `.card.foodphoto`, `html[data-rtl="1"] .pg.p9`.
- `js/food-data.js` — Exports `window.ZK_FOOD_DATA`: dish catalog (5 dishes), palette tokens, bespoke plating layout coordinates & timings, Canvas fluid parameters, and 8-language UI + culinary copy dictionary.
- `js/food.js` — Self-contained IIFE controller registering `window.ZK3D.registerPage(9, mountFood)`, exposing `window.__zkFoodEscape()` for Escape key hierarchy (Popover → Act 2 → Act 1 → Close Page), managing preloading, Act 1 rAF loop, Act 2 physics + Canvas 2D fluid/steam loop, and deterministic cleanup.
- `assets/food/...` — Processed local WebP assets (card cover, marble ring, 5 dishes, 5 props, 31 assembly cutouts: 5 empty plates + 26 ingredients).

### Modified Files
1. `index.html`:
   - Append `&family=Archivo:wght@500;600;700` to existing Google Fonts `<link>`.
   - Add `<link rel="stylesheet" href="css/food.css?v=1" />`.
   - Add Card #10 (`<button class="card photo foodphoto" data-n="Food" aria-label="Buka kartu Food">`) inside `<template id="cards">` using `assets/food/card/card-food.webp`.
   - Add `<script src="js/food-data.js?v=1" defer></script>` and `<script src="js/food.js?v=1" defer></script>`.
2. `js/carousel.js`:
   - Append index `9` entry to the pages array: `["", '<div class="fd-stage" data-i18n-own="1" role="region" aria-label="Taste Lab — Zikri’s Favourite Food"></div>']`.
   - Add `if (cur === 9 && window.__zkFoodEscape && window.__zkFoodEscape()) return;` in the `Escape` handler.
   - Add `|| cur === 9` to the ArrowLeft/ArrowRight guard so Food handles its own dish stepping.
   - Add `.fd-stage` to the touch-swipe `BLOCK` selector.
3. `js/background.js`:
   - Fix accidental leading whitespace on line 1.
   - Add palette index `9` (`{ a: [224, 132, 86], b: [208, 168, 112] }`) and fallback image `"assets/food/card/card-food.webp"`.
4. `js/i18n.js`:
   - Add 8-language translations for `"Food"`, `"FOOD"`, `"Buka kartu Food"`, and card alt text `"Food — Menu Favorit Zikri"`.
5. `js/manga-ja.js`:
   - Update fallback `totalCards = 10` and initial fallback text `"第 03 / 10 話"`.

---

## 9. Left to the Builder

- Exact per-ingredient pixel coordinates `(x%, y%, width%, rot)` and drop stagger offsets for each of the 5 dishes (to be visually calibrated via headless Playwright screenshots against the reference `dishes/*.webp` so every assembled plate looks appetizing and balanced).
- Exact Python Pillow/NumPy cutout thresholds & edge feather radii per asset (to be visually inspected via rendered contact sheet before wiring into JS).
- Canvas 2D fluid stream bezier curves, ripple wave damping constants, and steam particle pool size (capped tightly for 60 FPS on mobile).
- Exact cache-busting query string bumps (`?v=...`) on updated CSS/JS assets.

---

## 10. Verification Plan

Before claiming completion, verify via local HTTP server + Playwright across **all** target viewports (`1440×900`, `1440×810`, `768×1024`, `390×844`, `360×640`, `844×390`):
1. **Home Wheel & Integration:** 10 cards render cleanly (including `Food` with `card-food.webp`), `background.js` updates backdrop without error, switching to `ja` shows `第 10 / 10 話`, switching all 8 languages + RTL (`ar`) translates card label cleanly.
2. **Act 1 Lazy-Susan:** Zero console errors, zero failed/CSP-blocked requests, all 5 dishes aligned at identical rim diameter on marble ring, unclipped ring shadow, `TASTE LAB` overlapped by center dish, smooth color/ink/name transition across all 5 dishes, top-right menu popover & pause work, zero overflow.
3. **Act 2 Hybrid Gravity Drop:** Clicking center dish or CTA opens Act 2, empty plate + Canvas fluid pour + all 5 ingredients land cleanly on every single one of the 5 dishes (screenshot-verified for all 5 dishes!), ingredient chip bounce works, Replay & Prev/Next dish switching work, `Escape` returns Act 2 → Act 1 → Home wheel cleanly.
4. **Lifecycle & Accessibility:** Closing Card #10 restores Home wheel cleanly with 0 active Food rAF loops and `body.fd-active` removed; `prefers-reduced-motion: reduce` verified in both Act 1 and Act 2.
