/* ==========================================================================
   js/food.js — Card #10: "Food" v2 (TASTE LAB — Zikri's Favourite Food)
   Zero-button gesture-first culinary showcase:
   - Strictly 1 <button> in .pg.p9: top-left mascot Home pill
   - Section 1 (100svh): Directly draggable Marble Lazy-Susan turntable
     with directional axis-locking (never blocks vertical scroll) + flick snap
   - Section 2 (360svh): Sticky HiDPI Canvas 2D scroll-scrubbed cinematic
     video (72 WebP frames/dish, progressive coarse-first preloader, damped
     60fps scrubbing with 0% idle CPU when settled) + 4 localized beats
   Registered via ZK3D.registerPage(9, mountFood) with deterministic cleanup.
   ========================================================================== */
(function () {
  "use strict";

  /* ---------- Pure Math & Color Utilities ---------- */
  function clamp(v, lo, hi) {
    return v < lo ? lo : v > hi ? hi : v;
  }

  function cubicBezierSample(a, b, t) {
    return ((1 - 3 * b + 3 * a) * t + (3 * b - 6 * a)) * t * t + 3 * a * t;
  }

  function cubicBezierDeriv(a, b, t) {
    return (3 * (1 - 3 * b + 3 * a) * t + 2 * (3 * b - 6 * a)) * t + 3 * a;
  }

  // Exact cubic-bezier(0.42, 0, 0.58, 1) solved via 6 Newton-Raphson iterations
  function easeTurn(x) {
    if (x <= 0) return 0;
    if (x >= 1) return 1;
    var t = x;
    for (var i = 0; i < 6; i++) {
      var err = cubicBezierSample(0.42, 0.58, t) - x;
      var d = cubicBezierDeriv(0.42, 0.58, t);
      if (Math.abs(d) < 1e-6) break;
      t -= err / d;
      if (t < 0) t = 0;
      else if (t > 1) t = 1;
    }
    return cubicBezierSample(0.0, 1.0, t);
  }

  function wrapDiff(i, p) {
    var d = (((i - p) % 5) + 5) % 5;
    return d >= 2.5 ? d - 5 : d;
  }

  function mod5(n) {
    return ((n % 5) + 5) % 5;
  }

  function hexToRgb(hex) {
    var h = String(hex || "#eed9c4")
      .replace("#", "")
      .trim();
    if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
    var n = parseInt(h, 16);
    if (isNaN(n)) return [238, 217, 196];
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  }

  function lerpRgb(c1, c2, t) {
    var k = clamp(t, 0, 1);
    return [
      Math.round(c1[0] + (c2[0] - c1[0]) * k),
      Math.round(c1[1] + (c2[1] - c1[1]) * k),
      Math.round(c1[2] + (c2[2] - c1[2]) * k),
    ];
  }

  function rgbToCss(rgb) {
    return "rgb(" + rgb[0] + ", " + rgb[1] + ", " + rgb[2] + ")";
  }

  function clampGap(dt) {
    return dt > 250 ? dt : 0;
  }

  // Smooth editorial beat visibility curve [0..1]
  function beatOpacity(progress, start, end) {
    var p = clamp(progress, 0, 1);
    var span = Math.max(0.01, end - start);
    var fade = Math.min(0.038, span * 0.2);

    if (p <= start) return start <= 0 && p === 0 ? 1 : 0;
    if (p >= end) return end >= 1 ? 1 : 0;

    var inA = start <= 0 ? 1 : clamp((p - start) / fade, 0, 1);
    var outA = end >= 1 ? 1 : clamp((end - p) / fade, 0, 1);
    var k = Math.min(inA, outA);
    return k * k * (3 - 2 * k);
  }

  // Nearest decoded frame index fallback so scrubbing NEVER flashes blank
  function nearestLoadedFrame(cache, targetIdx, maxCount) {
    if (!cache) return -1;
    var limit = maxCount || 72;
    var idx = clamp(Math.round(targetIdx), 0, limit - 1);
    if (cache[idx]) return idx;
    for (var d = 1; d < limit; d++) {
      if (idx + d < limit && cache[idx + d]) return idx + d;
      if (idx - d >= 0 && cache[idx - d]) return idx - d;
    }
    return -1;
  }

  // Flick velocity inertia snap: dragging left (vx < 0) advances curP positively
  function snapTargetFromDrag(curP, vx, dragPxPerStep) {
    var px = dragPxPerStep || 260;
    var throwP = clamp((-(vx || 0) / px) * 0.15, -1.15, 1.15);
    return Math.round(curP + throwP);
  }

  // Expose pure math helpers for automated verification
  window.__ZK_FOOD_MATH = {
    easeTurn: easeTurn,
    wrapDiff: wrapDiff,
    hexToRgb: hexToRgb,
    lerpRgb: lerpRgb,
    rgbToCss: rgbToCss,
    clampGap: clampGap,
    beatOpacity: beatOpacity,
    nearestLoadedFrame: nearestLoadedFrame,
    snapTargetFromDrag: snapTargetFromDrag,
  };

  /* ---------- Asset & Frame Utilities ---------- */
  var ICO_HOME_ARR =
    '<svg class="fd-home-arr" viewBox="0 0 18 10" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17 5H1M5 1L1 5l4 4"/></svg>';

  function pad2(n) {
    return n < 10 ? "0" + n : String(n);
  }

  function preloadImage(src) {
    return new Promise(function (resolve) {
      var img = new Image();
      img.onload = function () {
        if (img.decode) {
          img.decode().then(
            function () {
              resolve(img);
            },
            function () {
              resolve(img);
            }
          );
        } else {
          resolve(img);
        }
      };
      img.onerror = function () {
        resolve(null);
      };
      img.src = src;
    });
  }

  function buildFramePriorityOrder(total) {
    var coarse = [0, 9, 18, 27, 36, 45, 54, 63, total - 1];
    var seen = {};
    var order = [];
    for (var i = 0; i < coarse.length; i++) {
      var c = clamp(coarse[i], 0, total - 1);
      if (!seen[c]) {
        seen[c] = true;
        order.push(c);
      }
    }
    // Mid-stride pass for ultra-fast smooth scrubbing
    for (var step = 3; step >= 1; step -= 2) {
      for (var k = 0; k < total; k += step) {
        if (!seen[k]) {
          seen[k] = true;
          order.push(k);
        }
      }
    }
    for (var m = 0; m < total; m++) {
      if (!seen[m]) order.push(m);
    }
    return order;
  }

  /* ---------- Page Controller (Card #10 / .pg.p9) ---------- */
  function mountFood(pg) {
    var DATA = window.ZK_FOOD_DATA;
    var stage = pg && pg.querySelector(".fd-stage");
    if (!DATA || !stage) return function () {};

    document.body.classList.add("fd-active");
    stage.setAttribute("tabindex", "-1");

    var DISHES = DATA.DISHES;
    var RING = DATA.RING;
    var PROPS = DATA.PROPS;
    var COUPE_FILL = DATA.COUPE_FILL;
    var FRAME_COUNT = DATA.FRAME_COUNT || 72;
    var FRAME_ORDER = buildFramePriorityOrder(FRAME_COUNT);
    var dishRgbs = DISHES.map(function (d) {
      return { bg: hexToRgb(d.bg), ink: hexToRgb(d.ink) };
    });

    var reduceMq = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)");
    var isReduced = function () {
      return !!(reduceMq && reduceMq.matches);
    };

    var getLang = function () {
      return (window.ZK && window.ZK.lang) || document.documentElement.lang || "id";
    };

    var disposed = false;

    // Turntable state
    var step = 0;
    var curP = 0;
    var activeDishIdx = 0;
    var userInteracted = false;
    var phaseStart = 0;
    var lastFrame = 0;
    var manualAnim = null; // { fromP, toP, fromIdx, toIdx, start, dur }
    var act1Raf = 0;
    var lastFlavourIdx = -1;
    var drag = null;

    // Scroll video state
    var frameCaches = {}; // slug -> { [idx]: HTMLImageElement }
    var frameLoading = {}; // slug -> { [idx]: true }
    var loadGen = 0;
    var rawProgress = 0;
    var targetFrame = 0;
    var drawnFrame = 0;
    var lastDrawnKey = "";
    var scrubRaf = 0;
    var readyTimer = 0;
    var resizeRaf = 0;
    var canvasW = 0;
    var canvasH = 0;
    var canvasDpr = 1;

    var geom = {
      u: 1,
      hs: 900,
      isPortrait: false,
      R: 430,
      big: 470,
      small: 292,
      bowlY: 418,
      cx: 720,
      cy: -12,
      D: 974,
      copyTop: 455,
      titleTop: 632,
      heroH: 900,
      storyTop: 900,
      storySpan: 2340,
    };

    /* ---------- Build Strictly One-Button DOM ---------- */
    stage.innerHTML =
      '<button class="fd-home-btn" id="fdHomeBtn" type="button">' +
      '  <span class="fd-home-mascot" aria-hidden="true">' +
      '    <img src="assets/images/mascot-head.webp" alt="" draggable="false" />' +
      "  </span>" +
      ICO_HOME_ARR +
      '  <span class="fd-home-lbl" id="fdHomeLbl"></span>' +
      "</button>" +
      '<section class="fd-hero-sec" id="fdHeroSec">' +
      '  <div class="fd-waves" aria-hidden="true"></div>' +
      '  <div class="fd-canvas-stage" id="fdCanvasStage">' +
      '    <div class="fd-ring-shadow" id="fdRingShadow" aria-hidden="true"></div>' +
      '    <div class="fd-ring" id="fdRing" aria-hidden="true"></div>' +
      '    <h1 class="fd-title" id="fdTitle">TASTE LAB</h1>' +
      '    <div class="fd-dishes-layer" id="fdDishesLayer"></div>' +
      '    <div class="fd-props-layer" id="fdPropsLayer" aria-hidden="true"></div>' +
      '    <div class="fd-eyebrow" id="fdEyebrow"></div>' +
      '    <p class="fd-flavour" id="fdFlavour"></p>' +
      '    <div class="fd-cues" aria-hidden="true">' +
      '      <div class="fd-drag-cue" id="fdDragCue"></div>' +
      '      <div class="fd-scroll-cue">' +
      '        <span class="fd-scroll-line"></span>' +
      '        <span id="fdScrollCue"></span>' +
      "      </div>" +
      "    </div>" +
      "  </div>" +
      '  <div class="fd-vignette" aria-hidden="true"></div>' +
      '  <div class="fd-hero-bridge" aria-hidden="true"></div>' +
      '  <p class="fd-sr-only" id="fdSrHint"></p>' +
      "</section>" +
      '<section class="fd-story-sec" id="fdStorySec">' +
      '  <div class="fd-story-sticky" id="fdStorySticky">' +
      '    <canvas class="fd-vid-canvas" id="fdVidCanvas" aria-hidden="true"></canvas>' +
      '    <div class="fd-story-vignette" aria-hidden="true"></div>' +
      '    <div class="fd-beats" id="fdBeats"></div>' +
      '    <div class="fd-progress-rail" aria-hidden="true">' +
      '      <div class="fd-story-hud">' +
      '        <span class="fd-story-idx" id="fdStoryIdx">01 / 05</span>' +
      '        <span class="fd-story-dot"></span>' +
      '        <span class="fd-story-dish" id="fdStoryDish">TONKOTSU RAMEN</span>' +
      "      </div>" +
      '      <div class="fd-progress-track">' +
      '        <div class="fd-progress-fill" id="fdProgressFill"></div>' +
      "      </div>" +
      "    </div>" +
      "  </div>" +
      "</section>";

    var homeBtn = stage.querySelector("#fdHomeBtn");
    var homeLbl = stage.querySelector("#fdHomeLbl");
    var heroSec = stage.querySelector("#fdHeroSec");
    var ringShadowEl = stage.querySelector("#fdRingShadow");
    var ringEl = stage.querySelector("#fdRing");
    var titleEl = stage.querySelector("#fdTitle");
    var dishesLayer = stage.querySelector("#fdDishesLayer");
    var propsLayer = stage.querySelector("#fdPropsLayer");
    var eyebrowEl = stage.querySelector("#fdEyebrow");
    var flavourEl = stage.querySelector("#fdFlavour");
    var dragCueEl = stage.querySelector("#fdDragCue");
    var scrollCueEl = stage.querySelector("#fdScrollCue");
    var srHintEl = stage.querySelector("#fdSrHint");

    var storySec = stage.querySelector("#fdStorySec");
    var vidCanvas = stage.querySelector("#fdVidCanvas");
    var vidCtx = vidCanvas.getContext("2d");
    var beatsHost = stage.querySelector("#fdBeats");
    var storyIdxEl = stage.querySelector("#fdStoryIdx");
    var storyDishEl = stage.querySelector("#fdStoryDish");
    var progressFillEl = stage.querySelector("#fdProgressFill");

    /* ---------- Build 5 Direct-Manipulation Dish Nodes & 5 Static Props ---------- */
    var dishEls = [];
    var dishShadowEls = [];

    DISHES.forEach(function (dish, idx) {
      var sh = document.createElement("div");
      sh.className = "fd-dish-shadow";
      sh.setAttribute("aria-hidden", "true");
      dishesLayer.appendChild(sh);
      dishShadowEls.push(sh);

      var el = document.createElement("div");
      el.className = "fd-dish";
      el.setAttribute("data-idx", String(idx));
      el.setAttribute("aria-hidden", "true");
      var img = document.createElement("img");
      img.className = "fd-dish-img";
      img.src = dish.dishSrc;
      img.alt = "";
      img.draggable = false;
      el.appendChild(img);
      dishesLayer.appendChild(el);
      dishEls.push(el);
    });

    var propEls = PROPS.map(function (prop) {
      var wrap = document.createElement("div");
      wrap.className = "fd-prop";
      var img = document.createElement("img");
      img.src = prop.src;
      img.alt = "";
      img.draggable = false;
      wrap.appendChild(img);
      propsLayer.appendChild(wrap);
      return wrap;
    });

    /* ---------- Build 4 Reusable Editorial Beat Cards (Zero Buttons) ---------- */
    var beatNodes = [];
    for (var bi = 0; bi < 4; bi++) {
      var art = document.createElement("article");
      art.className = "fd-beat " + (bi % 2 === 0 ? "is-left" : "is-right");
      var kicker = document.createElement("p");
      kicker.className = "fd-beat-kicker";
      var h2 = document.createElement("h2");
      h2.className = "fd-beat-title";
      var body = document.createElement("p");
      body.className = "fd-beat-body";
      var tags = document.createElement("div");
      tags.className = "fd-beat-tags";
      tags.hidden = true;
      var backHint = document.createElement("div");
      backHint.className = "fd-beat-backhint";
      backHint.hidden = true;

      art.appendChild(kicker);
      art.appendChild(h2);
      art.appendChild(body);
      art.appendChild(tags);
      art.appendChild(backHint);
      beatsHost.appendChild(art);

      beatNodes.push({
        el: art,
        kicker: kicker,
        title: h2,
        body: body,
        tags: tags,
        backHint: backHint,
      });
    }

    /* ---------- Theme & Localization Sync ---------- */
    function setThemeColors(bgCss, inkCss) {
      stage.style.setProperty("--fd-bg", bgCss);
      stage.style.setProperty("--fd-ink", inkCss);
      pg.style.setProperty("--fd-bg", bgCss);
      pg.style.setProperty("--fd-ink", inkCss);
    }

    function setStoryBackdrop(dish) {
      stage.style.setProperty("--fd-vid-bg", dish.videoBg);
      stage.style.setProperty("--fd-vid-bg-bottom", dish.videoBgBottom);
    }

    function renderBeatContents(dishIdx) {
      var dish = DISHES[dishIdx];
      var lang = getLang();
      storyIdxEl.textContent = pad2(dishIdx + 1) + " / 05";
      storyDishEl.textContent = dish.fullName;

      for (var i = 0; i < 4; i++) {
        var b = dish.beats[i];
        var node = beatNodes[i];
        var txt = DATA.getBeatText(b, lang);
        node.el.classList.toggle("is-left", b.side !== "right");
        node.el.classList.toggle("is-right", b.side === "right");
        if (!txt) continue;

        node.kicker.textContent = txt.kicker;
        node.title.textContent = txt.title;
        node.body.textContent = txt.body;

        if (txt.tags && txt.tags.length) {
          node.tags.hidden = false;
          node.tags.innerHTML = "";
          for (var ti = 0; ti < txt.tags.length; ti++) {
            var sp = document.createElement("span");
            sp.className = "fd-beat-tag";
            sp.textContent = txt.tags[ti];
            node.tags.appendChild(sp);
          }
        } else {
          node.tags.hidden = true;
          node.tags.innerHTML = "";
        }

        if (i === 3) {
          node.backHint.hidden = false;
          node.backHint.textContent = "↑  " + DATA.t(lang, "backTopHint");
        } else {
          node.backHint.hidden = true;
        }
      }
    }

    function syncLocale() {
      var lang = getLang();
      homeLbl.textContent = DATA.t(lang, "homeLabel");
      homeBtn.setAttribute("aria-label", DATA.t(lang, "backHome"));
      eyebrowEl.textContent = DATA.t(lang, "eyebrow");
      dragCueEl.textContent = "←  " + DATA.t(lang, "dragCue") + "  →";
      scrollCueEl.textContent = DATA.t(lang, "scrollCue");
      srHintEl.textContent = DATA.t(lang, "turntableHint");
      storySec.setAttribute("aria-label", DATA.t(lang, "storyRegion"));
      renderBeatContents(activeDishIdx);
    }

    /* ---------- Progressive Coarse-First WebP Frame Loader ---------- */
    function ensureCache(slug) {
      if (!frameCaches[slug]) frameCaches[slug] = {};
      if (!frameLoading[slug]) frameLoading[slug] = {};
      return frameCaches[slug];
    }

    function loadSingleFrame(dish, idx) {
      var slug = dish.slug;
      var cache = ensureCache(slug);
      if (cache[idx] || frameLoading[slug][idx]) return Promise.resolve(cache[idx] || null);
      frameLoading[slug][idx] = true;
      var url = dish.framesDir + "/" + pad2(idx) + ".webp";
      return preloadImage(url).then(function (img) {
        delete frameLoading[slug][idx];
        if (img) {
          cache[idx] = img;
          // Live-upgrade canvas if this frame belongs to active dish
          if (!disposed && DISHES[activeDishIdx].slug === slug) {
            lastDrawnKey = "";
            drawVideoCanvas(drawnFrame);
          }
        }
        return img;
      });
    }

    function prioritizeDishFrames(dishIdx) {
      var dish = DISHES[dishIdx];
      var myGen = ++loadGen;
      var cache = ensureCache(dish.slug);
      var queue = [];
      for (var i = 0; i < FRAME_ORDER.length; i++) {
        var fIdx = FRAME_ORDER[i];
        if (!cache[fIdx] && !frameLoading[dish.slug][fIdx]) {
          queue.push(fIdx);
        }
      }
      if (!queue.length) return;

      var cursor = 0;
      var CONCURRENCY = 6;

      function worker() {
        if (disposed || myGen !== loadGen) return;
        if (cursor >= queue.length) return;
        var nextIdx = queue[cursor++];
        loadSingleFrame(dish, nextIdx).then(worker);
      }

      for (var w = 0; w < Math.min(CONCURRENCY, queue.length); w++) {
        worker();
      }
    }

    function activateDishForStory(newIdx) {
      var idx = mod5(newIdx);
      if (idx === activeDishIdx && lastDrawnKey !== "") return;
      activeDishIdx = idx;
      var dish = DISHES[idx];
      setStoryBackdrop(dish);
      renderBeatContents(idx);
      lastDrawnKey = "";
      prioritizeDishFrames(idx);
      drawVideoCanvas(drawnFrame);
      updateBeatsAndProgress(rawProgress);
    }

    /* ---------- HiDPI Canvas Video Drawing & Smart Framing ---------- */
    function resizeVideoCanvas() {
      var rect = vidCanvas.getBoundingClientRect();
      var w = Math.max(1, Math.round(rect.width || stage.clientWidth || window.innerWidth));
      var h = Math.max(1, Math.round(rect.height || stage.clientHeight || window.innerHeight));
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      if (w === canvasW && h === canvasH && dpr === canvasDpr) return;
      canvasW = w;
      canvasH = h;
      canvasDpr = dpr;
      vidCanvas.width = Math.round(w * dpr);
      vidCanvas.height = Math.round(h * dpr);
      lastDrawnKey = "";
      drawVideoCanvas(drawnFrame);
    }

    function drawVideoCanvas(frameFloat) {
      if (!vidCtx || canvasW <= 0 || canvasH <= 0) return;
      var dish = DISHES[activeDishIdx];
      var cache = frameCaches[dish.slug];

      var wantedIdx;
      if (isReduced()) {
        wantedIdx = rawProgress < 0.24 ? 0 : rawProgress < 0.52 ? 24 : rawProgress < 0.77 ? 48 : 71;
      } else {
        wantedIdx = clamp(Math.round(frameFloat), 0, FRAME_COUNT - 1);
      }

      var bestIdx = nearestLoadedFrame(cache, wantedIdx, FRAME_COUNT);
      var key = dish.slug + ":" + bestIdx + ":" + canvasW + "x" + canvasH;
      if (key === lastDrawnKey) return;
      lastDrawnKey = key;

      var ctx = vidCtx;
      ctx.save();
      ctx.setTransform(canvasDpr, 0, 0, canvasDpr, 0, 0);

      // Studio-matched seamless vertical backdrop gradient
      var bgGrad = ctx.createLinearGradient(0, 0, 0, canvasH);
      bgGrad.addColorStop(0, dish.videoBg);
      bgGrad.addColorStop(1, dish.videoBgBottom);
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, canvasW, canvasH);

      var img = bestIdx >= 0 && cache ? cache[bestIdx] : null;
      if (img && img.naturalWidth > 0) {
        var iw = img.naturalWidth;
        var ih = img.naturalHeight;
        var isPortrait = canvasW / canvasH < 0.9;

        if (isPortrait) {
          // Keep full centered bowl uncropped & lifted above bottom frosted card
          var dw = canvasW * 1.48;
          var dh = dw * (ih / iw);
          var maxH = canvasH * 0.62;
          if (dh > maxH) {
            dh = maxH;
            dw = dh * (iw / ih);
          }
          var dx = (canvasW - dw) * 0.5;
          var dy = canvasH * 0.41 - dh * 0.5;

          // Edge-pixel studio extension:
          // - Top stretches the full clean studio wall row (zero seam)
          // - Bottom stretches the shadow-free outer table corner + soft shadow fade
          if (dy > 0) {
            ctx.drawImage(img, 0, 0, iw, 8, dx, 0, dw, dy + 2);
          }
          var bottomY = dy + dh;
          if (bottomY < canvasH) {
            ctx.drawImage(img, 4, ih - 8, 20, 8, 0, bottomY - 2, canvasW, canvasH - bottomY + 4);
          }
          ctx.drawImage(img, dx, dy, dw, dh);
          if (bottomY < canvasH) {
            var bFeather = Math.max(22, dh * 0.1);
            var botGrad = ctx.createLinearGradient(0, bottomY - bFeather, 0, bottomY + 2);
            botGrad.addColorStop(0, "rgba(0,0,0,0)");
            botGrad.addColorStop(1, dish.videoBgBottom);
            ctx.fillStyle = botGrad;
            ctx.fillRect(0, bottomY - bFeather, canvasW, bFeather + 4);
          }
        } else {
          // Full-bleed centered cover for landscape desktop & tablets
          var scale = Math.max(canvasW / iw, canvasH / ih);
          var cw = iw * scale;
          var ch = ih * scale;
          var cx = (canvasW - cw) * 0.5;
          var cy = (canvasH - ch) * 0.5;
          ctx.drawImage(img, cx, cy, cw, ch);
        }
      }

      ctx.restore();
    }

    /* ---------- 4-Beat Editorial Choreography & Progress Hairline ---------- */
    function updateBeatsAndProgress(progress) {
      var p = clamp(progress, 0, 1);
      progressFillEl.style.transform = "scaleX(" + p.toFixed(4) + ")";

      var dish = DISHES[activeDishIdx];
      for (var i = 0; i < 4; i++) {
        var b = dish.beats[i];
        var op = beatOpacity(p, b.start, b.end);
        var el = beatNodes[i].el;
        el.style.opacity = op.toFixed(3);
        var dy = (1 - op) * 18;
        el.style.transform = "translate3d(0, " + dy.toFixed(2) + "px, 0)";
      }
    }

    /* ---------- Damped Scroll-Scrub Loop (Auto-Sleeps When Settled) ---------- */
    function computeScrollProgress() {
      var st = stage.scrollTop || 0;
      var span = Math.max(1, geom.storySpan);
      return clamp((st - geom.storyTop) / span, 0, 1);
    }

    function tickScrub() {
      if (disposed) {
        scrubRaf = 0;
        return;
      }
      if (isReduced()) {
        drawnFrame = targetFrame;
        drawVideoCanvas(drawnFrame);
        scrubRaf = 0;
        return;
      }
      var diff = targetFrame - drawnFrame;
      if (Math.abs(diff) < 0.015) {
        drawnFrame = targetFrame;
        drawVideoCanvas(drawnFrame);
        scrubRaf = 0;
        return;
      }
      drawnFrame += diff * 0.22;
      drawVideoCanvas(drawnFrame);
      scrubRaf = requestAnimationFrame(tickScrub);
    }

    function onStageScroll() {
      if (disposed) return;
      var st = stage.scrollTop || 0;

      // Pause auto-rotation when scrolled down; resume if user hasn't dragged and returns to top
      if (st >= 30) {
        if (!manualAnim && !drag) stopAct1Loop();
      } else if (!userInteracted && !isReduced() && !act1Raf) {
        startAct1Loop();
      }

      rawProgress = computeScrollProgress();
      targetFrame = rawProgress * (FRAME_COUNT - 1);
      updateBeatsAndProgress(rawProgress);

      if (isReduced()) {
        drawnFrame = targetFrame;
        drawVideoCanvas(drawnFrame);
      } else if (!scrubRaf) {
        scrubRaf = requestAnimationFrame(tickScrub);
      }
    }

    /* ---------- Act 1 Layout & Title Fit ---------- */
    function fitTitle() {
      var targetW = (geom.isPortrait ? 350 : 1062) * geom.u;
      titleEl.style.fontSize = "100px";
      var measured = titleEl.getBoundingClientRect().width || titleEl.offsetWidth || 600;
      if (measured > 0) {
        titleEl.style.fontSize = ((100 * targetW) / measured).toFixed(2) + "px";
      }
    }

    function updateLayout() {
      var W = stage.clientWidth || window.innerWidth || 1440;
      var H = stage.clientHeight || window.innerHeight || 900;
      var isPortrait = W / Math.max(1, H) < 0.9;
      var u;
      if (isPortrait) {
        u = Math.min(W / 390, H / 760);
      } else if (H < 560) {
        u = Math.min(W / 1440, H / 770);
      } else {
        u = Math.min(W / 1440, H / 900);
      }
      u = Math.max(0.25, u);
      var hs = isPortrait ? H / u : 900;

      stage.classList.toggle("is-portrait", isPortrait);
      stage.style.setProperty("--u", u.toFixed(4) + "px");
      stage.style.setProperty("--hs", hs.toFixed(2));

      var R = isPortrait ? 222 : 430;
      var big = isPortrait ? 262 : 470;
      var small = isPortrait ? 158 : 292;
      var stageW = isPortrait ? 390 : 1440;
      var bowlY, copyTop, titleTop;

      if (isPortrait) {
        var stackH = big + 20 + 144 + 16 + 50;
        var top = 74;
        var avail = hs - 64 - top;
        bowlY = top + Math.max(0, (avail - stackH) * 0.44) + big / 2;
        copyTop = bowlY + big / 2 + 20;
        titleTop = copyTop + 144;
      } else {
        bowlY = 418;
        copyTop = 455;
        titleTop = 632;
      }

      stage.style.setProperty("--copy-top", copyTop.toFixed(2));
      stage.style.setProperty("--title-top", titleTop.toFixed(2));

      var cx = stageW / 2;
      var cy = bowlY - R;
      var D = (2 * R) / RING.band;

      var heroH = heroSec.offsetHeight || H;
      var storyTop = storySec.offsetTop || heroH;
      var storySpan = Math.max(1, (storySec.offsetHeight || H * 3.6) - H);

      geom = {
        u: u,
        hs: hs,
        isPortrait: isPortrait,
        R: R,
        big: big,
        small: small,
        bowlY: bowlY,
        cx: cx,
        cy: cy,
        D: D,
        copyTop: copyTop,
        titleTop: titleTop,
        heroH: heroH,
        storyTop: storyTop,
        storySpan: storySpan,
      };

      // Configure Marble Ring background & radial cutout mask
      var k = D / (2 * RING.ro);
      var dPx = D * u;
      var riPx = (D / 2) * (RING.ri / RING.ro) * u;
      var roPx = (D / 2) * u;
      ringEl.style.width = dPx.toFixed(2) + "px";
      ringEl.style.height = dPx.toFixed(2) + "px";
      ringEl.style.backgroundImage = 'url("' + RING.src + '")';
      ringEl.style.backgroundSize = (RING.size * k * u).toFixed(2) + "px";
      ringEl.style.backgroundPosition =
        ((D / 2 - RING.cx * k) * u).toFixed(2) +
        "px " +
        ((D / 2 - RING.cy * k) * u).toFixed(2) +
        "px";
      var maskGrad =
        "radial-gradient(circle closest-side, transparent " +
        (riPx - 1).toFixed(2) +
        "px, #000 " +
        (riPx + 0.5).toFixed(2) +
        "px, #000 " +
        (roPx - 1.5).toFixed(2) +
        "px, transparent " +
        roPx.toFixed(2) +
        "px)";
      ringEl.style.maskImage = maskGrad;
      ringEl.style.webkitMaskImage = maskGrad;

      // Expanded Ring Shadow (+28u) so outer blur feather never clips
      var shPad = 14;
      var shD = (D + shPad * 2) * u;
      ringShadowEl.style.width = shD.toFixed(2) + "px";
      ringShadowEl.style.height = shD.toFixed(2) + "px";
      ringShadowEl.style.transform =
        "translate3d(" +
        ((cx - D / 2 - shPad) * u).toFixed(2) +
        "px, " +
        ((cy - D / 2 - shPad + 10) * u).toFixed(2) +
        "px, 0)";
      ringShadowEl.style.background =
        "radial-gradient(circle closest-side, transparent " +
        Math.max(0, riPx - 10 * u).toFixed(2) +
        "px, rgba(25,12,45,0.16) " +
        (riPx + 6 * u).toFixed(2) +
        "px, rgba(25,12,45,0.16) " +
        (roPx - 4 * u).toFixed(2) +
        "px, transparent " +
        (roPx + 14 * u).toFixed(2) +
        "px)";

      // Size bowls & shadows
      var bowlBox = (big / COUPE_FILL) * u;
      var shadowBox = 1.12 * big * u;
      for (var i = 0; i < 5; i++) {
        dishEls[i].style.width = bowlBox.toFixed(2) + "px";
        dishEls[i].style.height = bowlBox.toFixed(2) + "px";
        dishShadowEls[i].style.width = shadowBox.toFixed(2) + "px";
        dishShadowEls[i].style.height = shadowBox.toFixed(2) + "px";
      }

      // Position static edge props
      var tAnchor = Math.max(titleTop, hs - 170);
      PROPS.forEach(function (prop, idx) {
        var el = propEls[idx];
        var px, py, pw, prot;
        if (isPortrait) {
          px = prop.portrait[0];
          py = (prop.portrait[4] === "bowl" ? bowlY : tAnchor) + prop.portrait[1];
          pw = prop.portrait[2];
          prot = prop.portrait[3];
        } else {
          px = prop.desktop[0];
          py = prop.desktop[1];
          pw = prop.desktop[2];
          prot = prop.desktop[3];
        }
        el.style.width = (pw * u).toFixed(2) + "px";
        el.style.transform =
          "translate3d(" +
          (px * u).toFixed(2) +
          "px, " +
          (py * u).toFixed(2) +
          "px, 0) rotate(" +
          prot +
          "deg)";
      });

      fitTitle();
      renderAct1Frame(curP, null);
      resizeVideoCanvas();
      rawProgress = computeScrollProgress();
      updateBeatsAndProgress(rawProgress);
    }

    /* ---------- Act 1 Render Frame ---------- */
    function renderFlavourSwap(fromIdx, toIdx, t) {
      var showIdx = t < 0.5 ? fromIdx : toIdx;
      var op = t < 0.5 ? 1 - 2 * t : 1 - 2 * (1 - t);
      var dy = (t < 0.5 ? -2 * t * 8 : 2 * (1 - t) * 8) * geom.u;
      if (showIdx !== lastFlavourIdx) {
        lastFlavourIdx = showIdx;
        var lines = DISHES[showIdx].lines;
        flavourEl.innerHTML = lines[0] + "<br>" + lines[1];
      }
      flavourEl.style.opacity = clamp(op, 0, 1).toFixed(3);
      flavourEl.style.transform = "translate3d(0, " + dy.toFixed(2) + "px, 0)";
    }

    function renderAct1Frame(p, colorPair) {
      var u = geom.u;
      var cx = geom.cx;
      var cy = geom.cy;
      var D = geom.D;
      var R = geom.R;
      var big = geom.big;
      var small = geom.small;

      var fromIdx, toIdx, t;
      if (colorPair) {
        fromIdx = colorPair.fromIdx;
        toIdx = colorPair.toIdx;
        t = colorPair.t;
      } else {
        var base = Math.floor(p);
        fromIdx = mod5(base);
        toIdx = (fromIdx + 1) % 5;
        t = p - base;
      }

      var bgRgb = lerpRgb(dishRgbs[fromIdx].bg, dishRgbs[toIdx].bg, t);
      var inkRgb = lerpRgb(dishRgbs[fromIdx].ink, dishRgbs[toIdx].ink, t);
      setThemeColors(rgbToCss(bgRgb), rgbToCss(inkRgb));
      renderFlavourSwap(fromIdx, toIdx, t);

      // Ring rotation
      ringEl.style.transform =
        "translate3d(" +
        ((cx - D / 2) * u).toFixed(2) +
        "px, " +
        ((cy - D / 2) * u).toFixed(2) +
        "px, 0) rotate(" +
        (p * 72).toFixed(3) +
        "deg)";

      // 5 Dishes & Shadows
      var size = big / COUPE_FILL;
      var shSize = 1.12 * big;
      for (var i = 0; i < 5; i++) {
        var diff = wrapDiff(i, p);
        var angDeg = 90 - diff * 72;
        var angRad = (angDeg * Math.PI) / 180;
        var x = cx + R * Math.cos(angRad);
        var y = cy + R * Math.sin(angRad);
        var ad = Math.abs(diff);
        var sc = ad <= 1 ? 1 + (small / big - 1) * ad : small / big - (ad - 1) * 0.08;
        var rot = (p - i) * 72;
        var z = 4 + Math.round(100 - ad * 20);

        var el = dishEls[i];
        el.style.zIndex = String(z);
        el.style.transform =
          "translate3d(" +
          ((x - size / 2) * u).toFixed(2) +
          "px, " +
          ((y - size / 2) * u).toFixed(2) +
          "px, 0) scale(" +
          sc.toFixed(4) +
          ") rotate(" +
          rot.toFixed(3) +
          "deg)";
        el.classList.toggle("is-front", ad < 0.35);
        el.classList.toggle("is-side", ad >= 0.35 && ad <= 1.35);

        var sh = dishShadowEls[i];
        sh.style.zIndex = String(z - 1);
        sh.style.transform =
          "translate3d(" +
          ((x - shSize / 2) * u).toFixed(2) +
          "px, " +
          ((y - shSize / 2 + 0.05 * big * sc) * u).toFixed(2) +
          "px, 0) scale(" +
          sc.toFixed(4) +
          ")";
      }
    }

    function stepToDish(targetIdx) {
      var idx = mod5(targetIdx);
      var curIdx = mod5(Math.round(curP));
      if (idx === curIdx && !manualAnim) {
        activateDishForStory(idx);
        return;
      }
      var diff = wrapDiff(idx, curP);
      manualAnim = {
        fromP: curP,
        toP: curP + diff,
        fromIdx: curIdx,
        toIdx: idx,
        start: performance.now(),
        dur: isReduced() ? 1 : 440,
      };
      activateDishForStory(idx);
      startAct1Loop();
    }

    function animateSnapTo(targetInt) {
      var idx = mod5(targetInt);
      var fromIdx = mod5(Math.round(curP));
      manualAnim = {
        fromP: curP,
        toP: targetInt,
        fromIdx: fromIdx,
        toIdx: idx,
        start: performance.now(),
        dur: isReduced() ? 1 : 360,
      };
      activateDishForStory(idx);
      startAct1Loop();
    }

    function tickAct1(now) {
      if (disposed) {
        act1Raf = 0;
        return;
      }
      if (!lastFrame) {
        lastFrame = now;
        phaseStart = now;
      }
      var dt = now - lastFrame;
      lastFrame = now;

      var gap = clampGap(dt);
      if (gap > 0) {
        phaseStart += gap;
        if (manualAnim) manualAnim.start += gap;
      }

      if (drag && drag.mode === "horiz") {
        // Driven directly by pointermove
        act1Raf = 0;
        return;
      }

      if (manualAnim) {
        var raw = (now - manualAnim.start) / manualAnim.dur;
        if (raw >= 1) {
          step = manualAnim.toIdx;
          curP = step;
          manualAnim = null;
          phaseStart = now;
          renderAct1Frame(curP, null);
          activateDishForStory(step);
          // Sleep cleanly when user has manually selected a dish or reduced motion
          if (userInteracted || isReduced() || (stage.scrollTop || 0) >= 30) {
            act1Raf = 0;
            return;
          }
        } else {
          var eased = isReduced() ? 1 : easeTurn(raw);
          curP = manualAnim.fromP + (manualAnim.toP - manualAnim.fromP) * eased;
          renderAct1Frame(curP, {
            fromIdx: manualAnim.fromIdx,
            toIdx: manualAnim.toIdx,
            t: eased,
          });
        }
      } else if (userInteracted || isReduced() || (stage.scrollTop || 0) >= 30) {
        // Zero idle CPU once user takes control or scrolls down
        act1Raf = 0;
        return;
      } else {
        var HOLD = 2400;
        var TURN = 550;
        var e = now - phaseStart;
        if (e < HOLD) {
          curP = step;
          renderAct1Frame(curP, null);
        } else if (e < HOLD + TURN) {
          var t = easeTurn((e - HOLD) / TURN);
          curP = step + t;
          renderAct1Frame(curP, null);
        } else {
          step = (step + 1) % 5;
          phaseStart += HOLD + TURN;
          curP = step;
          renderAct1Frame(curP, null);
          activateDishForStory(step);
        }
      }

      act1Raf = requestAnimationFrame(tickAct1);
    }

    function startAct1Loop() {
      if (disposed || act1Raf) return;
      lastFrame = performance.now();
      phaseStart = lastFrame;
      act1Raf = requestAnimationFrame(tickAct1);
    }

    function stopAct1Loop() {
      if (act1Raf) {
        cancelAnimationFrame(act1Raf);
        act1Raf = 0;
      }
    }

    /* ---------- Direct Pointer/Touch Drag on Marble Lazy-Susan ---------- */
    function getDragPxPerStep() {
      return geom.isPortrait ? 175 : 290;
    }

    function onHeroPointerDown(e) {
      if (disposed) return;
      if (e.pointerType === "mouse" && e.button !== 0) return;
      if (e.target && e.target.closest && e.target.closest("#fdHomeBtn")) return;

      var sideEl = e.target && e.target.closest ? e.target.closest(".fd-dish.is-side") : null;
      var tapDishIdx = sideEl ? parseInt(sideEl.getAttribute("data-idx"), 10) : -1;

      drag = {
        id: e.pointerId,
        startX: e.clientX,
        startY: e.clientY,
        lastX: e.clientX,
        lastT: performance.now(),
        startP: curP,
        vx: 0,
        mode: "pending",
        tapDishIdx: isNaN(tapDishIdx) ? -1 : tapDishIdx,
      };
    }

    function onHeroPointerMove(e) {
      if (!drag || e.pointerId !== drag.id) return;
      var dx = e.clientX - drag.startX;
      var dy = e.clientY - drag.startY;

      if (drag.mode === "pending") {
        if (Math.hypot(dx, dy) < 8) return;
        if (Math.abs(dx) >= Math.abs(dy) * 1.15) {
          drag.mode = "horiz";
          userInteracted = true;
          manualAnim = null;
          stopAct1Loop();
          heroSec.classList.add("is-dragging");
          try {
            heroSec.setPointerCapture(drag.id);
          } catch (_) {
            /* ignore unsupported capture */
          }
        } else {
          // Vertical scroll gesture — release immediately so native scroll wins
          drag = null;
          return;
        }
      }

      if (drag.mode === "horiz") {
        var now = performance.now();
        var dtSec = Math.max(0.008, (now - drag.lastT) / 1000);
        var instVx = (e.clientX - drag.lastX) / dtSec;
        drag.vx = drag.vx * 0.45 + instVx * 0.55;
        drag.lastX = e.clientX;
        drag.lastT = now;

        curP = drag.startP - dx / getDragPxPerStep();
        renderAct1Frame(curP, null);

        var nearest = mod5(Math.round(curP));
        if (nearest !== activeDishIdx) {
          activateDishForStory(nearest);
        }
      }
    }

    function finishHeroDrag(e) {
      if (!drag || e.pointerId !== drag.id) return;
      var cur = drag;
      drag = null;
      heroSec.classList.remove("is-dragging");
      try {
        if (heroSec.hasPointerCapture && heroSec.hasPointerCapture(cur.id)) {
          heroSec.releasePointerCapture(cur.id);
        }
      } catch (_) {
        /* ignore */
      }

      if (cur.mode === "horiz") {
        var targetInt = snapTargetFromDrag(curP, cur.vx, getDragPxPerStep());
        animateSnapTo(targetInt);
      } else if (cur.mode === "pending" && cur.tapDishIdx >= 0) {
        userInteracted = true;
        stepToDish(cur.tapDishIdx);
      }
    }

    function onHeroTouchMove(e) {
      if (drag && drag.mode === "horiz" && e.cancelable) {
        e.preventDefault();
      }
    }

    /* ---------- Event Bindings ---------- */
    function onHomeClick() {
      var realBk = pg.querySelector(".pgb > .bk");
      if (realBk) realBk.click();
    }

    function onKeyDown(e) {
      if (!pg.classList.contains("open")) return;
      if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
        e.preventDefault();
        userInteracted = true;
        var base = manualAnim ? manualAnim.toIdx : Math.round(curP);
        stepToDish(mod5(base + (e.key === "ArrowRight" ? 1 : -1)));
      }
    }

    function onResize() {
      if (resizeRaf) return;
      resizeRaf = requestAnimationFrame(function () {
        resizeRaf = 0;
        if (!disposed) updateLayout();
      });
    }

    homeBtn.addEventListener("click", onHomeClick);
    heroSec.addEventListener("pointerdown", onHeroPointerDown);
    heroSec.addEventListener("pointermove", onHeroPointerMove);
    heroSec.addEventListener("pointerup", finishHeroDrag);
    heroSec.addEventListener("pointercancel", finishHeroDrag);
    heroSec.addEventListener("touchmove", onHeroTouchMove, { passive: false });
    stage.addEventListener("scroll", onStageScroll, { passive: true });
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize, { passive: true });

    var langObserver = new MutationObserver(syncLocale);
    langObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["lang", "data-rtl"],
    });

    /* ---------- Boot & Preload ---------- */
    syncLocale();
    activateDishForStory(0);
    stage.scrollTop = 0;
    updateLayout();

    // Move keyboard focus safely into Food without triggering an initial button focus ring
    stage.focus({ preventScroll: true });

    // Preload hero ring, dishes, props + frame 00 of all 5 dishes upfront (~75KB)
    var heroAssets = [RING.src]
      .concat(
        DISHES.map(function (d) {
          return d.dishSrc;
        })
      )
      .concat(
        PROPS.map(function (p) {
          return p.src;
        })
      );

    DISHES.forEach(function (d) {
      loadSingleFrame(d, 0);
    });

    function revealHero() {
      if (disposed || heroSec.classList.contains("ready")) return;
      clearTimeout(readyTimer);
      updateLayout();
      heroSec.classList.add("ready");
      if (!isReduced() && !userInteracted && (stage.scrollTop || 0) < 30) {
        startAct1Loop();
      }
    }

    Promise.all(
      heroAssets
        .map(preloadImage)
        .concat([document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve()])
    ).then(revealHero);
    readyTimer = setTimeout(revealHero, 2200);

    /* ---------- Deterministic Zero-Leak Cleanup ---------- */
    return function cleanupFood() {
      disposed = true;
      loadGen++;
      stopAct1Loop();
      if (scrubRaf) {
        cancelAnimationFrame(scrubRaf);
        scrubRaf = 0;
      }
      clearTimeout(readyTimer);
      if (resizeRaf) {
        cancelAnimationFrame(resizeRaf);
        resizeRaf = 0;
      }

      homeBtn.removeEventListener("click", onHomeClick);
      heroSec.removeEventListener("pointerdown", onHeroPointerDown);
      heroSec.removeEventListener("pointermove", onHeroPointerMove);
      heroSec.removeEventListener("pointerup", finishHeroDrag);
      heroSec.removeEventListener("pointercancel", finishHeroDrag);
      heroSec.removeEventListener("touchmove", onHeroTouchMove);
      stage.removeEventListener("scroll", onStageScroll);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
      langObserver.disconnect();

      document.body.classList.remove("fd-active");
      stage.innerHTML = "";
    };
  }

  if (window.ZK3D && typeof window.ZK3D.registerPage === "function") {
    window.ZK3D.registerPage(9, mountFood);
  }
})();
