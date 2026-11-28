/* ==========================================================================
   js/food.js — Card #10: "Food" (TASTE LAB — Zikri's Favourite Food)
   Act 1: Exact Gelato Lab Marble Lazy-Susan Flavour Carousel Hero
   Act 2: Hybrid Gravity Drop + Real-Time Canvas 2D Fluid Pour & Steam Engine
   Registered via ZK3D.registerPage(9, mountFood) with 0% idle CPU cleanup.
   ========================================================================== */
(function () {
  "use strict";

  /* ---------- Pure Math & Color Utilities ---------- */
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
    var k = t < 0 ? 0 : t > 1 ? 1 : t;
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

  function nextStepTarget(curP, manualAnim, dir) {
    var base = manualAnim ? manualAnim.toIdx : Math.round(curP);
    return (((base + dir) % 5) + 5) % 5;
  }

  function clamp(v, lo, hi) {
    return v < lo ? lo : v > hi ? hi : v;
  }

  function easeOutCubic(t) {
    var k = 1 - clamp(t, 0, 1);
    return 1 - k * k * k;
  }

  // Expose pure math helpers for automated verification
  window.__ZK_FOOD_MATH = {
    easeTurn: easeTurn,
    wrapDiff: wrapDiff,
    hexToRgb: hexToRgb,
    lerpRgb: lerpRgb,
    rgbToCss: rgbToCss,
    clampGap: clampGap,
    nextStepTarget: nextStepTarget,
  };

  /* ---------- SVG Icon Templates ---------- */
  var ICO_BACK =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/></svg>';
  var ICO_MENU =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>';
  var ICO_PREV =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 18l-6-6 6-6"/></svg>';
  var ICO_NEXT =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 18l6-6-6-6"/></svg>';
  var ICO_REPLAY =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/></svg>';

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

  /* ---------- Page Controller (Card #10 / .pg.p9) ---------- */
  function mountFood(pg) {
    var DATA = window.ZK_FOOD_DATA;
    var stage = pg && pg.querySelector(".fd-stage");
    if (!DATA || !stage) return function () {};

    document.body.classList.add("fd-active");

    var DISHES = DATA.DISHES;
    var RING = DATA.RING;
    var PROPS = DATA.PROPS;
    var COUPE_FILL = DATA.COUPE_FILL;
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
    var mode = "carousel"; // 'carousel' | 'assembly'
    var menuOpen = false;
    var userPaused = false;
    var hoverPaused = false;

    // Act 1 state
    var step = 0;
    var curP = 0;
    var phaseStart = 0;
    var lastFrame = 0;
    var manualAnim = null; // { fromP, toP, fromIdx, toIdx, start, dur }
    var act1Raf = 0;
    var lastFlavourIdx = -1;
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
    };

    // Act 2 state
    var asmDishIdx = 0;
    var asmRaf = 0;
    var asmStart = 0;
    var asmLast = 0;
    var asmToken = 0;
    var asmIngNodes = [];
    var asmChipNodes = [];
    var asmRipples = [];
    var asmDroplets = [];
    var asmSteam = [];
    var asmTimers = [];
    var readyTimer = 0;
    var resizeRaf = 0;

    /* ---------- Build Complete Two-Act DOM ---------- */
    stage.innerHTML =
      '<div class="fd-waves" aria-hidden="true"></div>' +
      '<div class="fd-hero" id="fdHero">' +
      '  <div class="fd-canvas-stage" id="fdCanvasStage">' +
      '    <div class="fd-ring-shadow" id="fdRingShadow" aria-hidden="true"></div>' +
      '    <div class="fd-ring" id="fdRing" aria-hidden="true"></div>' +
      '    <h1 class="fd-title" id="fdTitle">TASTE LAB</h1>' +
      '    <div class="fd-dishes-layer" id="fdDishesLayer"></div>' +
      '    <div class="fd-props-layer" id="fdPropsLayer" aria-hidden="true"></div>' +
      '    <div class="fd-eyebrow" id="fdEyebrow"></div>' +
      '    <p class="fd-flavour" id="fdFlavour"></p>' +
      '    <button class="fd-cta" id="fdCta" type="button"></button>' +
      "  </div>" +
      '  <button class="fd-nav-btn fd-nav-back" id="fdBackHome" type="button">' +
      ICO_BACK +
      "</button>" +
      '  <button class="fd-nav-btn fd-nav-menu" id="fdMenuBtn" type="button" aria-expanded="false">' +
      ICO_MENU +
      "</button>" +
      '  <div class="fd-popover" id="fdPopover" role="menu" aria-hidden="true">' +
      '    <div class="fd-pop-head" id="fdPopHead"></div>' +
      '    <div class="fd-pop-list" id="fdPopList"></div>' +
      '    <div class="fd-pop-foot">' +
      '      <button class="fd-pop-btn" id="fdPauseBtn" type="button"></button>' +
      '      <button class="fd-pop-btn" id="fdPopAsmBtn" type="button"></button>' +
      "    </div>" +
      "  </div>" +
      "</div>" +
      '<section class="fd-asm" id="fdAsm" aria-hidden="true">' +
      '  <div class="fd-asm-topbar">' +
      '    <button class="fd-asm-sqbtn fd-asm-back" id="fdAsmBack" type="button">' +
      ICO_BACK +
      "</button>" +
      '    <div class="fd-asm-badge">' +
      '      <span class="fd-asm-count" id="fdAsmCount">01 / 05</span>' +
      '      <span class="fd-asm-name" id="fdAsmName">TONKOTSU RAMEN</span>' +
      "    </div>" +
      '    <div class="fd-asm-controls">' +
      '      <button class="fd-asm-sqbtn" id="fdAsmPrev" type="button">' +
      ICO_PREV +
      "</button>" +
      '      <button class="fd-asm-sqbtn" id="fdAsmNext" type="button">' +
      ICO_NEXT +
      "</button>" +
      '      <button class="fd-asm-sqbtn" id="fdAsmReplayIcon" type="button">' +
      ICO_REPLAY +
      "</button>" +
      "    </div>" +
      "  </div>" +
      '  <div class="fd-platter-wrap">' +
      '    <div class="fd-platter-3d" id="fdPlatter3d">' +
      '      <div class="fd-platter-shadow" aria-hidden="true"></div>' +
      '      <img class="fd-asm-plate" id="fdAsmPlate" alt="" draggable="false" />' +
      '      <canvas class="fd-asm-fluid-under" id="fdFluidUnder" aria-hidden="true"></canvas>' +
      '      <div class="fd-asm-ings" id="fdAsmIngs"></div>' +
      '      <canvas class="fd-asm-fluid-over" id="fdFluidOver" aria-hidden="true"></canvas>' +
      "    </div>" +
      "  </div>" +
      '  <div class="fd-asm-panel">' +
      '    <p class="fd-asm-story" id="fdAsmStory"></p>' +
      '    <div class="fd-chips" id="fdChips"></div>' +
      '    <div class="fd-asm-actions">' +
      '      <button class="fd-asm-pill is-primary" id="fdAsmReplay" type="button">' +
      ICO_REPLAY +
      '        <span id="fdAsmReplayLbl"></span>' +
      "</button>" +
      '      <button class="fd-asm-pill" id="fdAsmBackPill" type="button">' +
      '        <span id="fdAsmBackLbl"></span>' +
      "</button>" +
      "    </div>" +
      "  </div>" +
      "</section>" +
      '<div class="fd-vignette" aria-hidden="true"></div>';

    var heroEl = stage.querySelector("#fdHero");
    var ringShadowEl = stage.querySelector("#fdRingShadow");
    var ringEl = stage.querySelector("#fdRing");
    var titleEl = stage.querySelector("#fdTitle");
    var dishesLayer = stage.querySelector("#fdDishesLayer");
    var propsLayer = stage.querySelector("#fdPropsLayer");
    var eyebrowEl = stage.querySelector("#fdEyebrow");
    var flavourEl = stage.querySelector("#fdFlavour");
    var ctaEl = stage.querySelector("#fdCta");
    var backHomeBtn = stage.querySelector("#fdBackHome");
    var menuBtn = stage.querySelector("#fdMenuBtn");
    var popoverEl = stage.querySelector("#fdPopover");
    var popHeadEl = stage.querySelector("#fdPopHead");
    var popListEl = stage.querySelector("#fdPopList");
    var pauseBtn = stage.querySelector("#fdPauseBtn");
    var popAsmBtn = stage.querySelector("#fdPopAsmBtn");

    var asmEl = stage.querySelector("#fdAsm");
    var asmBackBtn = stage.querySelector("#fdAsmBack");
    var asmCountEl = stage.querySelector("#fdAsmCount");
    var asmNameEl = stage.querySelector("#fdAsmName");
    var asmPrevBtn = stage.querySelector("#fdAsmPrev");
    var asmNextBtn = stage.querySelector("#fdAsmNext");
    var asmReplayIconBtn = stage.querySelector("#fdAsmReplayIcon");
    var platter3dEl = stage.querySelector("#fdPlatter3d");
    var asmPlateEl = stage.querySelector("#fdAsmPlate");
    var fluidUnderCanvas = stage.querySelector("#fdFluidUnder");
    var fluidOverCanvas = stage.querySelector("#fdFluidOver");
    var asmIngsEl = stage.querySelector("#fdAsmIngs");
    var asmStoryEl = stage.querySelector("#fdAsmStory");
    var chipsEl = stage.querySelector("#fdChips");
    var asmReplayBtn = stage.querySelector("#fdAsmReplay");
    var asmReplayLbl = stage.querySelector("#fdAsmReplayLbl");
    var asmBackPill = stage.querySelector("#fdAsmBackPill");
    var asmBackLbl = stage.querySelector("#fdAsmBackLbl");

    /* ---------- Build 5 Dish Elements, 5 Props, and Popover Items ---------- */
    var dishEls = [];
    var dishShadowEls = [];
    var popItems = [];

    DISHES.forEach(function (dish, idx) {
      var sh = document.createElement("div");
      sh.className = "fd-dish-shadow";
      sh.setAttribute("aria-hidden", "true");
      dishesLayer.appendChild(sh);
      dishShadowEls.push(sh);

      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "fd-dish";
      btn.setAttribute("data-idx", String(idx));
      btn.setAttribute("aria-label", dish.fullName);
      var img = document.createElement("img");
      img.className = "fd-dish-img";
      img.src = dish.dishSrc;
      img.alt = "";
      img.draggable = false;
      btn.appendChild(img);
      dishesLayer.appendChild(btn);
      dishEls.push(btn);

      var pi = document.createElement("button");
      pi.type = "button";
      pi.className = "fd-pop-item";
      pi.setAttribute("role", "menuitem");
      pi.innerHTML =
        '<span class="fd-pop-dot" style="background:' +
        dish.bg +
        ";border-color:" +
        dish.ink +
        '"></span>' +
        "<span>" +
        dish.fullName +
        "</span>" +
        '<span class="fd-pop-idx">0' +
        (idx + 1) +
        "</span>";
      pi.addEventListener("click", function () {
        setMenuOpen(false);
        stepToDish(idx);
      });
      popListEl.appendChild(pi);
      popItems.push(pi);
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

    /* ---------- Localization Sync ---------- */
    function syncLocale() {
      var lang = getLang();
      eyebrowEl.textContent = DATA.t(lang, "eyebrow");
      ctaEl.textContent = DATA.t(lang, "cta");
      backHomeBtn.setAttribute("aria-label", DATA.t(lang, "backHome"));
      menuBtn.setAttribute("aria-label", DATA.t(lang, "menuLabel"));
      popHeadEl.textContent = DATA.t(lang, "menuTitle");
      pauseBtn.textContent = userPaused ? DATA.t(lang, "play") : DATA.t(lang, "pause");
      popAsmBtn.textContent = DATA.t(lang, "cta");

      asmBackBtn.setAttribute("aria-label", DATA.t(lang, "backCarousel"));
      asmPrevBtn.setAttribute("aria-label", DATA.t(lang, "prevDish"));
      asmNextBtn.setAttribute("aria-label", DATA.t(lang, "nextDish"));
      asmReplayIconBtn.setAttribute("aria-label", DATA.t(lang, "replay"));
      asmReplayLbl.textContent = DATA.t(lang, "replay");
      asmBackLbl.textContent = DATA.t(lang, "backCarousel");

      var hint = DATA.t(lang, "assembleHint");
      dishEls.forEach(function (btn, idx) {
        btn.setAttribute("aria-label", DISHES[idx].fullName + " — " + hint);
      });

      if (mode === "assembly") {
        var d = DISHES[asmDishIdx];
        asmStoryEl.textContent = DATA.getDishStory(d, lang);
        d.ingredients.forEach(function (ing, i) {
          if (asmChipNodes[i]) {
            asmChipNodes[i].textContent = DATA.getIngLabel(ing, lang);
          }
        });
      }
    }

    function syncMenuActive() {
      var active = ((Math.round(curP) % 5) + 5) % 5;
      popItems.forEach(function (el, i) {
        el.classList.toggle("is-active", i === active);
      });
    }

    function setMenuOpen(open) {
      var wasOpen = menuOpen;
      menuOpen = !!open;
      popoverEl.classList.toggle("is-open", menuOpen);
      popoverEl.setAttribute("aria-hidden", menuOpen ? "false" : "true");
      popoverEl.inert = !menuOpen;
      menuBtn.setAttribute("aria-expanded", menuOpen ? "true" : "false");
      if (menuOpen) {
        syncMenuActive();
      } else if (wasOpen && popoverEl.contains(document.activeElement)) {
        menuBtn.focus({ preventScroll: true });
      }
    }

    function setThemeColors(bgCss, inkCss) {
      stage.style.setProperty("--fd-bg", bgCss);
      stage.style.setProperty("--fd-ink", inkCss);
      pg.style.setProperty("--fd-bg", bgCss);
      pg.style.setProperty("--fd-ink", inkCss);
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
        var stackH = big + 22 + 138 + 20 + 50;
        var top = 82;
        var avail = hs - 70 - top;
        bowlY = top + Math.max(0, (avail - stackH) * 0.45) + big / 2;
        copyTop = bowlY + big / 2 + 22;
        titleTop = copyTop + 158;
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
      };

      // Configure Marble Ring background & CSS radial mask
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

      // Expanded Ring Shadow (+28u container) so outer blur feather NEVER clips
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

      // Interpolate bg & ink + flavour swap
      var fromIdx, toIdx, t;
      if (colorPair) {
        fromIdx = colorPair.fromIdx;
        toIdx = colorPair.toIdx;
        t = colorPair.t;
      } else {
        var base = Math.floor(p);
        fromIdx = ((base % 5) + 5) % 5;
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
      var idx = ((targetIdx % 5) + 5) % 5;
      var curIdx = ((Math.round(curP) % 5) + 5) % 5;
      if (idx === curIdx && !manualAnim) {
        phaseStart = performance.now();
        return;
      }
      var diff = wrapDiff(idx, curP);
      var fromP = curP;
      var toP = curP + diff;
      var now = performance.now();
      manualAnim = {
        fromP: fromP,
        toP: toP,
        fromIdx: curIdx,
        toIdx: idx,
        start: now,
        dur: isReduced() ? 1 : 500,
      };
    }

    function tickAct1(now) {
      if (disposed || mode !== "carousel") {
        act1Raf = 0;
        return;
      }
      if (!lastFrame) {
        lastFrame = now;
        phaseStart = now;
      }
      var dt = now - lastFrame;
      lastFrame = now;

      // Tab-gap protection (>250ms pushes phaseStart forward so no multi-step jump)
      var gap = clampGap(dt);
      if (gap > 0) {
        phaseStart += gap;
        if (manualAnim) manualAnim.start += gap;
      }

      if (manualAnim) {
        var raw = (now - manualAnim.start) / manualAnim.dur;
        if (raw >= 1) {
          step = manualAnim.toIdx;
          curP = step;
          manualAnim = null;
          phaseStart = now;
          renderAct1Frame(curP, null);
          syncMenuActive();
        } else {
          var eased = isReduced() ? 1 : easeTurn(raw);
          curP = manualAnim.fromP + (manualAnim.toP - manualAnim.fromP) * eased;
          renderAct1Frame(curP, {
            fromIdx: manualAnim.fromIdx,
            toIdx: manualAnim.toIdx,
            t: eased,
          });
        }
      } else if (userPaused || hoverPaused || menuOpen) {
        // Freeze phase clock cleanly while paused or hovering interactive controls
        phaseStart += dt;
      } else {
        var reduced = isReduced();
        var HOLD = reduced ? 3000 : 1400;
        var TURN = reduced ? 1 : 500;
        var e = now - phaseStart;
        if (e < HOLD) {
          curP = step;
          renderAct1Frame(curP, null);
        } else if (e < HOLD + TURN) {
          var t = reduced ? 1 : easeTurn((e - HOLD) / TURN);
          curP = step + t;
          renderAct1Frame(curP, null);
        } else {
          step = (step + 1) % 5;
          phaseStart += HOLD + TURN;
          curP = step;
          renderAct1Frame(curP, null);
          syncMenuActive();
        }
      }

      act1Raf = requestAnimationFrame(tickAct1);
    }

    function startAct1Loop() {
      if (disposed || mode !== "carousel" || act1Raf) return;
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

    /* ========================================================================
       ACT 2 — Hybrid Gravity Drop + Real-Time Canvas 2D Fluid & Steam Engine
       ======================================================================== */
    function clearAsmTimers() {
      for (var i = 0; i < asmTimers.length; i++) clearTimeout(asmTimers[i]);
      asmTimers.length = 0;
    }

    function stopAct2Loop() {
      if (asmRaf) {
        cancelAnimationFrame(asmRaf);
        asmRaf = 0;
      }
      clearAsmTimers();
    }

    function syncFluidCanvasSize(canvas) {
      var w = canvas.clientWidth || 400;
      var h = canvas.clientHeight || 460;
      var dpr = Math.min(2, window.devicePixelRatio || 1);
      var pw = Math.round(w * dpr);
      var ph = Math.round(h * dpr);
      if (canvas.width !== pw || canvas.height !== ph) {
        canvas.width = pw;
        canvas.height = ph;
      }
      var ctx = canvas.getContext("2d");
      if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      return { ctx: ctx, w: w, h: h };
    }

    // Convert platter normalized coordinates (0..1) into the expanded fluid canvas (-12%..+12%, -32%..+12%)
    function toCanvasXY(px, py, cw, ch) {
      return {
        x: ((0.12 + px) / 1.24) * cw,
        y: ((0.32 + py) / 1.44) * ch,
        unit: cw / 1.24,
      };
    }

    function spawnRipple(px, py, color, maxRFrac) {
      if (asmRipples.length > 14) asmRipples.shift();
      asmRipples.push({
        px: px,
        py: py,
        r: 0.02,
        maxR: maxRFrac || 0.24,
        alpha: 0.62,
        color: color,
      });
    }

    function spawnDroplets(px, py, color, count) {
      for (var i = 0; i < count; i++) {
        var ang = (i / count) * Math.PI * 2 + (Math.random() - 0.5) * 0.5;
        var spd = 0.08 + Math.random() * 0.14;
        asmDroplets.push({
          px: px,
          py: py,
          vx: Math.cos(ang) * spd,
          vy: Math.sin(ang) * spd - 0.04,
          r: 2.2 + Math.random() * 3.8,
          alpha: 0.92,
          color: color,
        });
      }
    }

    function initSteamPool() {
      asmSteam = [];
      for (var i = 0; i < 9; i++) {
        asmSteam.push({
          xOff: (Math.random() - 0.5) * 0.34,
          yOff: (Math.random() - 0.5) * 0.18,
          phase: (i / 9) * Math.PI * 2,
          age: Math.random(),
          speed: 0.22 + Math.random() * 0.12,
          radius: 0.055 + Math.random() * 0.045,
        });
      }
    }

    function drawPourStream(ctx, tx, ty, unit, pourT, fluid) {
      // Pouring stream enters smoothly from y=0 down to (tx, ty), then retracts cleanly at tail
      var headT = clamp(pourT / 0.26, 0, 1);
      var tailT = pourT > 0.72 ? clamp((pourT - 0.72) / 0.28, 0, 1) : 0;
      if (tailT >= 1) return;

      var yStart = tailT * ty;
      var yEnd = easeOutCubic(headT) * ty;
      var sway = Math.sin(pourT * Math.PI * 5) * unit * 0.012;
      var baseWidth =
        fluid.kind === "broth"
          ? unit * 0.048
          : fluid.kind === "curry" || fluid.kind === "marinara"
            ? unit * 0.044
            : unit * 0.026;
      var thickness = baseWidth * (1 - tailT * 0.75);

      ctx.save();
      ctx.lineCap = "round";

      // Main viscous ribbon
      ctx.beginPath();
      ctx.moveTo(tx + sway * 0.4, yStart);
      ctx.quadraticCurveTo(tx + sway, (yStart + yEnd) * 0.5, tx, yEnd);
      ctx.strokeStyle = fluid.fillColor;
      ctx.lineWidth = thickness;
      ctx.stroke();

      // Deep core shadow edge
      ctx.beginPath();
      ctx.moveTo(tx + thickness * 0.16, yStart);
      ctx.quadraticCurveTo(
        tx + sway + thickness * 0.16,
        (yStart + yEnd) * 0.5,
        tx + thickness * 0.12,
        yEnd
      );
      ctx.strokeStyle = fluid.deepColor;
      ctx.lineWidth = Math.max(1.5, thickness * 0.26);
      ctx.globalAlpha = 0.55;
      ctx.stroke();

      // Glossy specular highlight streak
      ctx.beginPath();
      ctx.moveTo(tx - thickness * 0.22, yStart);
      ctx.quadraticCurveTo(
        tx + sway - thickness * 0.22,
        (yStart + yEnd) * 0.5,
        tx - thickness * 0.16,
        yEnd
      );
      ctx.strokeStyle = fluid.highlightColor || "#ffffff";
      ctx.lineWidth = Math.max(1.5, thickness * 0.24);
      ctx.globalAlpha = 0.72;
      ctx.stroke();

      ctx.restore();
    }

    function drawFluidUnder(dish, elapsedMs, isStatic) {
      var info = syncFluidCanvasSize(fluidUnderCanvas);
      var ctx = info.ctx;
      if (!ctx) return;
      ctx.clearRect(0, 0, info.w, info.h);

      var fluid = dish.fluid;
      if (fluid.layer !== "under") return;

      var center = toCanvasXY(0.5, 0.5, info.w, info.h);
      var target = toCanvasXY(fluid.targetX, fluid.targetY, info.w, info.h);
      var unit = center.unit;
      var basinR = (fluid.basinR || 0.345) * unit;

      var pourT = isStatic ? 1 : clamp((elapsedMs - fluid.startMs) / fluid.durationMs, 0, 1);
      if (pourT <= 0) return;

      var fillFrac = isStatic ? 1 : easeOutCubic(clamp((pourT - 0.12) / 0.76, 0, 1));

      ctx.save();
      // Clip cleanly inside circular bowl basin
      ctx.beginPath();
      ctx.arc(center.x, center.y, basinR, 0, Math.PI * 2);
      ctx.clip();

      if (fluid.kind === "broth") {
        // Creamy Tonkotsu broth expanding smoothly from center
        var curR = Math.max(4, basinR * 1.04 * fillFrac);
        var grad = ctx.createRadialGradient(
          target.x - curR * 0.15,
          target.y - curR * 0.15,
          curR * 0.06,
          center.x,
          center.y,
          curR
        );
        grad.addColorStop(0, fluid.highlightColor);
        grad.addColorStop(0.55, fluid.fillColor);
        grad.addColorStop(0.92, fluid.deepColor);
        grad.addColorStop(1, fluid.deepColor);

        ctx.beginPath();
        ctx.arc(target.x, target.y, curR, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();

        // Subtle inner-wall meniscus shadow so broth looks deep inside the ceramic bowl
        var rimGrad = ctx.createRadialGradient(
          center.x,
          center.y,
          basinR * 0.72,
          center.x,
          center.y,
          basinR
        );
        rimGrad.addColorStop(0, "rgba(40, 22, 8, 0)");
        rimGrad.addColorStop(1, "rgba(32, 18, 8, 0.24)");
        ctx.fillStyle = rimGrad;
        ctx.fillRect(center.x - basinR, center.y - basinR, basinR * 2, basinR * 2);

        // Shimmering golden tare oil droplets floating on tonkotsu surface
        if (fillFrac > 0.35) {
          var oilA = clamp((fillFrac - 0.35) / 0.5, 0, 1) * 0.58;
          ctx.fillStyle = fluid.oilColor;
          ctx.globalAlpha = oilA;
          for (var d = 0; d < 14; d++) {
            var a = d * 2.39996 + (isStatic ? 0 : elapsedMs * 0.00012);
            var dist = (0.28 + ((d * 37) % 58) / 100) * curR * 0.9;
            var ox = center.x + Math.cos(a) * dist;
            var oy = center.y + Math.sin(a) * dist;
            var or = (2.2 + (d % 4) * 1.6) * (unit / 420);
            ctx.beginPath();
            ctx.ellipse(ox, oy, or * 1.25, or, a, 0, Math.PI * 2);
            ctx.fill();
          }
          ctx.globalAlpha = 1;
        }
      } else if (fluid.kind === "curry") {
        // Thick velvety Japanese curry blooming in lower-right crescent under the curry cutout
        var cr = Math.max(4, unit * 0.25 * fillFrac);
        var cGrad = ctx.createRadialGradient(
          target.x - cr * 0.2,
          target.y - cr * 0.2,
          cr * 0.08,
          target.x,
          target.y,
          cr
        );
        cGrad.addColorStop(0, fluid.highlightColor);
        cGrad.addColorStop(0.6, fluid.fillColor);
        cGrad.addColorStop(1, fluid.deepColor);
        ctx.beginPath();
        ctx.ellipse(target.x, target.y, cr * 1.12, cr * 0.96, 0.3, 0, Math.PI * 2);
        ctx.fillStyle = cGrad;
        ctx.globalAlpha = 0.85;
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      // Draw active liquid surface ripples clipped to basin
      for (var i = 0; i < asmRipples.length; i++) {
        var rp = asmRipples[i];
        var rPos = toCanvasXY(rp.px, rp.py, info.w, info.h);
        ctx.beginPath();
        ctx.arc(rPos.x, rPos.y, rp.r * unit, 0, Math.PI * 2);
        ctx.strokeStyle = rp.color || "rgba(255,255,255,0.6)";
        ctx.lineWidth = Math.max(1.2, 2.2 * (unit / 420));
        ctx.globalAlpha = rp.alpha;
        ctx.stroke();
      }

      ctx.restore();
    }

    function drawFluidOver(dish, elapsedMs, dtSec, isStatic) {
      var info = syncFluidCanvasSize(fluidOverCanvas);
      var ctx = info.ctx;
      if (!ctx) return;
      ctx.clearRect(0, 0, info.w, info.h);

      var fluid = dish.fluid;
      var target = toCanvasXY(fluid.targetX, fluid.targetY, info.w, info.h);
      var unit = target.unit;
      var pourT = isStatic ? 1 : clamp((elapsedMs - fluid.startMs) / fluid.durationMs, 0, 1);

      // 1. Active pouring stream from above the plate (all pouring dishes except chili splash)
      if (!isStatic && pourT > 0 && pourT < 1 && fluid.kind !== "chili") {
        drawPourStream(ctx, target.x, target.y, unit, pourT, fluid);
      }

      // 2. Persistent organic chef-style glossy demi-glace drizzle across grilled steak (sweeping across upper & lower slices around center butter)
      if (fluid.kind === "glaze" && pourT > 0.18) {
        var gProg = isStatic ? 1 : easeOutCubic(clamp((pourT - 0.18) / 0.72, 0, 1));
        ctx.save();
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        var pStart = toCanvasXY(0.62, 0.35, info.w, info.h);
        var pEnd = toCanvasXY(0.41, 0.66, info.w, info.h);
        var segs = 26;
        var maxSeg = Math.max(1, Math.floor(segs * gProg));
        for (var k = 0; k < maxSeg; k++) {
          var t0 = k / segs;
          var t1 = (k + 1) / segs;
          // Gently break/thin slightly across center butter pat (0.40..0.56) so yellow herb butter stays hero
          var overButter = t0 > 0.38 && t0 < 0.56;
          var x0 = pStart.x + (pEnd.x - pStart.x) * t0 + Math.sin(t0 * Math.PI * 2.2) * unit * 0.02;
          var y0 = pStart.y + (pEnd.y - pStart.y) * t0;
          var x1 = pStart.x + (pEnd.x - pStart.x) * t1 + Math.sin(t1 * Math.PI * 2.2) * unit * 0.02;
          var y1 = pStart.y + (pEnd.y - pStart.y) * t1;
          var taper = (Math.sin(t0 * Math.PI) * 0.68 + 0.25) * (overButter ? 0.35 : 1);

          ctx.beginPath();
          ctx.moveTo(x0, y0);
          ctx.lineTo(x1, y1);
          ctx.strokeStyle = fluid.fillColor;
          ctx.lineWidth = unit * 0.026 * taper;
          ctx.globalAlpha = overButter ? 0.26 : 0.74;
          ctx.stroke();

          if (!overButter) {
            ctx.beginPath();
            ctx.moveTo(x0 - unit * 0.004, y0 - unit * 0.003);
            ctx.lineTo(x1 - unit * 0.004, y1 - unit * 0.003);
            ctx.strokeStyle = fluid.highlightColor;
            ctx.lineWidth = Math.max(1.2, unit * 0.007 * taper);
            ctx.globalAlpha = 0.42;
            ctx.stroke();
          }
        }
        ctx.restore();
      }

      // 3. Expanding ripples for over-layer sauces (marinara, chili, glaze)
      if (!isStatic && fluid.layer === "over") {
        for (var r = 0; r < asmRipples.length; r++) {
          var rp = asmRipples[r];
          var rPos = toCanvasXY(rp.px, rp.py, info.w, info.h);
          ctx.beginPath();
          ctx.arc(rPos.x, rPos.y, rp.r * unit, 0, Math.PI * 2);
          ctx.strokeStyle = rp.color;
          ctx.lineWidth = 2.2;
          ctx.globalAlpha = rp.alpha;
          ctx.stroke();
        }
        ctx.globalAlpha = 1;
      }

      // 4. Splash droplets (chili oil / broth / marinara impact droplets)
      if (!isStatic && asmDroplets.length) {
        for (var d = asmDroplets.length - 1; d >= 0; d--) {
          var dr = asmDroplets[d];
          dr.px += dr.vx * dtSec;
          dr.py += dr.vy * dtSec;
          dr.vx *= 0.94;
          dr.vy *= 0.94;
          dr.alpha -= dtSec * 1.45;
          if (dr.alpha <= 0.02) {
            asmDroplets.splice(d, 1);
            continue;
          }
          var dp = toCanvasXY(dr.px, dr.py, info.w, info.h);
          ctx.beginPath();
          ctx.arc(dp.x, dp.y, dr.r * (unit / 420), 0, Math.PI * 2);
          ctx.fillStyle = dr.color;
          ctx.globalAlpha = clamp(dr.alpha, 0, 1);
          ctx.fill();
        }
        ctx.globalAlpha = 1;
      }

      // 5. Soft rising steam wisps once assembly finishes (disabled under reduced motion)
      var lastDrop = dish.ingredients[dish.ingredients.length - 1].delayMs + 380;
      if (!isStatic && elapsedMs > lastDrop) {
        var steamFade = clamp((elapsedMs - lastDrop) / 900, 0, 1);
        var center = toCanvasXY(0.5, 0.46, info.w, info.h);
        for (var s = 0; s < asmSteam.length; s++) {
          var st = asmSteam[s];
          st.age += dtSec * st.speed;
          if (st.age >= 1) {
            st.age -= 1;
            st.xOff = (Math.random() - 0.5) * 0.34;
          }
          var sx = center.x + (st.xOff + Math.sin(st.age * Math.PI * 2 + st.phase) * 0.045) * unit;
          var sy = center.y + st.yOff * unit - st.age * unit * 0.42;
          var sr = st.radius * unit * (0.7 + st.age * 1.35);
          var op = Math.sin(st.age * Math.PI) * 0.16 * steamFade;
          if (op <= 0.005) continue;

          var sg = ctx.createRadialGradient(sx, sy, 0, sx, sy, sr);
          sg.addColorStop(0, "rgba(255, 255, 255, " + op.toFixed(3) + ")");
          sg.addColorStop(0.55, "rgba(255, 252, 246, " + (op * 0.45).toFixed(3) + ")");
          sg.addColorStop(1, "rgba(255, 255, 255, 0)");
          ctx.fillStyle = sg;
          ctx.beginPath();
          ctx.arc(sx, sy, sr, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    function updateRipples(dtSec) {
      for (var i = asmRipples.length - 1; i >= 0; i--) {
        var rp = asmRipples[i];
        rp.r += (rp.maxR - rp.r) * Math.min(1, dtSec * 3.8) + dtSec * 0.04;
        rp.alpha -= dtSec * 0.85;
        if (rp.alpha <= 0.015 || rp.r >= rp.maxR) {
          asmRipples.splice(i, 1);
        }
      }
    }

    function bounceIngredient(idx) {
      var node = asmIngNodes[idx];
      var chip = asmChipNodes[idx];
      if (!node || !node.landed) return;
      node.el.classList.remove("is-pop");
      void node.el.offsetWidth;
      node.el.classList.add("is-pop");
      if (chip) {
        chip.classList.add("is-active");
        asmTimers.push(
          setTimeout(function () {
            if (chip) chip.classList.remove("is-active");
          }, 560)
        );
      }
      var dish = DISHES[asmDishIdx];
      var ing = dish.ingredients[idx];
      if (ing && !isReduced()) {
        spawnRipple(ing.x / 100, ing.y / 100, dish.fluid.highlightColor || "#fff", 0.22);
      }
    }

    function tickAct2(now) {
      if (disposed || mode !== "assembly") {
        asmRaf = 0;
        return;
      }
      if (!asmLast) asmLast = now;
      var rawDt = now - asmLast;
      asmLast = now;
      var dt = Math.min(rawDt, 60);
      var dtSec = dt * 0.001;
      var elapsed = now - asmStart;
      var dish = DISHES[asmDishIdx];

      // Plate gentle landing (0..340ms)
      var plateT = clamp(elapsed / 340, 0, 1);
      var pEase = easeOutCubic(plateT);
      var plateY = (1 - pEase) * 14;
      var plateSc = 0.88 + 0.12 * pEase;
      asmPlateEl.style.opacity = clamp(plateT * 1.4, 0, 1).toFixed(3);
      asmPlateEl.style.transform =
        "translate3d(0, " + plateY.toFixed(2) + "%, 0) scale(" + plateSc.toFixed(4) + ")";
      if (plateT >= 0.45 && !platter3dEl.classList.contains("has-plate")) {
        platter3dEl.classList.add("has-plate");
      }

      // Pour splash triggers
      if (!dish._pourSplashed && elapsed >= dish.fluid.startMs + dish.fluid.durationMs * 0.22) {
        dish._pourSplashed = true;
        spawnRipple(
          dish.fluid.targetX,
          dish.fluid.targetY,
          dish.fluid.highlightColor || "#fff",
          0.32
        );
        spawnDroplets(
          dish.fluid.targetX,
          dish.fluid.targetY,
          dish.fluid.oilColor || dish.fluid.fillColor,
          dish.fluid.kind === "chili" ? 14 : 8
        );
      }

      // Update each ingredient's Hybrid Gravity Drop physics
      var DROP_DUR = 540;
      for (var i = 0; i < asmIngNodes.length; i++) {
        var n = asmIngNodes[i];
        var ing = n.ing;
        var local = elapsed - ing.delayMs;
        if (local < 0) {
          n.el.style.opacity = "0";
          continue;
        }
        var u = clamp(local / DROP_DUR, 0, 1);
        var curX, curY, scX, scY, curRot, op, shOp, shSc, shY;

        if (u < 0.72) {
          var f = u / 0.72;
          // Cubic gravity acceleration: starts poised above, drops briskly into plate
          var g = Math.pow(f, 2.15);
          curX = ing.fromX * (1 - g);
          curY = -128 * (1 - g);
          var sc = 1.68 - 0.68 * g;
          scX = sc;
          scY = sc;
          curRot = ing.fromRot + (ing.rot - ing.fromRot) * g;
          op = clamp(f * 3.8, 0, 1);
          shOp = 0.06 + 0.24 * g;
          shSc = 1.5 - 0.5 * g;
          shY = 44 * (1 - g) + 4;
        } else {
          // Impact squash & damped elastic settle
          var b = (u - 0.72) / 0.28;
          var damp = Math.exp(-3.4 * b) * Math.sin(b * Math.PI * 2.1);
          curX = 0;
          curY = -Math.abs(damp) * 5.5;
          scX = 1 + damp * 0.08;
          scY = 1 - damp * 0.07;
          curRot = ing.rot;
          op = 1;
          shOp = 0.3;
          shSc = 1;
          shY = 4;

          if (!n.landed) {
            n.landed = true;
            if (asmChipNodes[i]) asmChipNodes[i].classList.add("is-landed");
            spawnRipple(
              ing.x / 100,
              ing.y / 100,
              dish.fluid.highlightColor || "rgba(255,255,255,0.65)",
              0.2
            );
            if (dish.fluid.kind === "broth" && i <= 2) {
              spawnDroplets(ing.x / 100, ing.y / 100, dish.fluid.fillColor, 5);
            }
          }
        }

        n.el.style.opacity = op.toFixed(3);
        n.el.style.transform =
          "translate3d(calc(-50% + " +
          curX.toFixed(2) +
          "%), calc(-50% + " +
          curY.toFixed(2) +
          "%), 0) rotate(" +
          curRot.toFixed(2) +
          "deg) scale(" +
          scX.toFixed(4) +
          ", " +
          scY.toFixed(4) +
          ")";
        n.shadowEl.style.opacity = shOp.toFixed(3);
        n.shadowEl.style.transform =
          "translate3d(0, " + shY.toFixed(1) + "%, 0) scale(" + shSc.toFixed(3) + ")";
      }

      updateRipples(dtSec);
      drawFluidUnder(dish, elapsed, false);
      drawFluidOver(dish, elapsed, dtSec, false);

      asmRaf = requestAnimationFrame(tickAct2);
    }

    function clearFluidCanvases() {
      var uCtx = fluidUnderCanvas.getContext("2d");
      if (uCtx) uCtx.clearRect(0, 0, fluidUnderCanvas.width, fluidUnderCanvas.height);
      var oCtx = fluidOverCanvas.getContext("2d");
      if (oCtx) oCtx.clearRect(0, 0, fluidOverCanvas.width, fluidOverCanvas.height);
    }

    function openAssembly(dishIdx) {
      var idx = ((dishIdx % 5) + 5) % 5;
      asmDishIdx = idx;
      step = idx;
      curP = idx;
      manualAnim = null;
      hoverPaused = false;
      setMenuOpen(false);
      stopAct1Loop();
      stopAct2Loop();
      clearFluidCanvases();

      mode = "assembly";
      var myToken = ++asmToken;
      var dish = DISHES[idx];
      var lang = getLang();

      // Match page pastel palette to chosen dish
      setThemeColors(dish.bg, dish.ink);
      stage.classList.add("is-assembling");
      heroEl.inert = true;
      heroEl.setAttribute("aria-hidden", "true");
      asmEl.classList.add("is-open");
      asmEl.inert = false;
      asmEl.setAttribute("aria-hidden", "false");
      if (!asmEl.contains(document.activeElement)) {
        asmBackBtn.focus({ preventScroll: true });
      }

      // Update header & story
      asmCountEl.textContent = "0" + (idx + 1) + " / 05";
      asmNameEl.textContent = dish.fullName;
      asmStoryEl.textContent = DATA.getDishStory(dish, lang);

      // Reset platter & chips
      platter3dEl.classList.remove("has-plate");
      asmPlateEl.src = dish.plateSrc;
      asmPlateEl.style.opacity = "0";
      asmIngsEl.innerHTML = "";
      chipsEl.innerHTML = "";
      asmIngNodes = [];
      asmChipNodes = [];
      asmRipples = [];
      asmDroplets = [];
      dish._pourSplashed = false;
      initSteamPool();

      dish.ingredients.forEach(function (ing, i) {
        var wrap = document.createElement("div");
        wrap.className = "fd-asm-ing";
        wrap.style.left = ing.x + "%";
        wrap.style.top = ing.y + "%";
        wrap.style.width = ing.w + "%";
        wrap.style.zIndex = String(ing.z);

        var sh = document.createElement("div");
        sh.className = "fd-ing-shadow";
        wrap.appendChild(sh);

        var img = document.createElement("img");
        img.className = "fd-ing-img";
        img.src = ing.src;
        img.alt = "";
        img.draggable = false;
        wrap.appendChild(img);

        asmIngsEl.appendChild(wrap);
        asmIngNodes.push({ el: wrap, shadowEl: sh, ing: ing, landed: false });

        var chip = document.createElement("button");
        chip.type = "button";
        chip.className = "fd-chip";
        chip.textContent = DATA.getIngLabel(ing, lang);
        chip.setAttribute("title", DATA.t(lang, "ingredientsHint"));
        chip.addEventListener("click", function () {
          bounceIngredient(i);
        });
        chipsEl.appendChild(chip);
        asmChipNodes.push(chip);
      });

      // Preload plate + dish ingredients before firing drop clock so zero blank drops occur
      var srcs = [dish.plateSrc].concat(
        dish.ingredients.map(function (ing) {
          return ing.src;
        })
      );
      var preloadDone = Promise.all(srcs.map(preloadImage));
      var timeoutFallback = new Promise(function (resolve) {
        asmTimers.push(setTimeout(resolve, 1200));
      });

      Promise.race([preloadDone, timeoutFallback]).then(function () {
        if (disposed || mode !== "assembly" || myToken !== asmToken) return;
        if (isReduced()) {
          // Instant static render under prefers-reduced-motion: reduce (0 continuous rAF)
          platter3dEl.classList.add("has-plate");
          asmPlateEl.style.opacity = "1";
          asmPlateEl.style.transform = "translate3d(0,0,0) scale(1)";
          asmIngNodes.forEach(function (n, i) {
            n.landed = true;
            n.el.style.opacity = "1";
            n.el.style.transform =
              "translate3d(-50%, -50%, 0) rotate(" + n.ing.rot + "deg) scale(1, 1)";
            n.shadowEl.style.opacity = "0.28";
            n.shadowEl.style.transform = "translate3d(0, 4%, 0) scale(1)";
            if (asmChipNodes[i]) asmChipNodes[i].classList.add("is-landed");
          });
          drawFluidUnder(dish, 9999, true);
          drawFluidOver(dish, 9999, 0, true);
          return;
        }
        asmStart = performance.now();
        asmLast = asmStart;
        asmRaf = requestAnimationFrame(tickAct2);
      });
    }

    function closeAssembly() {
      if (mode !== "assembly") return;
      stopAct2Loop();
      clearFluidCanvases();
      hoverPaused = false;
      mode = "carousel";
      stage.classList.remove("is-assembling");
      asmEl.classList.remove("is-open");
      asmEl.inert = true;
      asmEl.setAttribute("aria-hidden", "true");
      heroEl.inert = false;
      heroEl.setAttribute("aria-hidden", "false");
      renderAct1Frame(curP, null);
      syncMenuActive();
      ctaEl.focus({ preventScroll: true });
      startAct1Loop();
    }

    function closeFoodPage() {
      var bk = pg.querySelector(".pgb > .bk");
      if (bk) {
        bk.click();
      } else if (window.zkClosePage) {
        window.zkClosePage();
      }
    }

    /* ---------- Event Bindings ---------- */
    backHomeBtn.addEventListener("click", closeFoodPage);

    menuBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      setMenuOpen(!menuOpen);
    });

    pauseBtn.addEventListener("click", function () {
      userPaused = !userPaused;
      syncLocale();
      if (!userPaused) phaseStart = performance.now();
    });

    popAsmBtn.addEventListener("click", function () {
      var active = ((Math.round(curP) % 5) + 5) % 5;
      openAssembly(active);
    });

    ctaEl.addEventListener("click", function () {
      var active = ((Math.round(curP) % 5) + 5) % 5;
      openAssembly(active);
    });

    ctaEl.addEventListener("pointerenter", function (e) {
      if (e.pointerType === "mouse") hoverPaused = true;
    });
    ctaEl.addEventListener("pointerleave", function () {
      hoverPaused = false;
    });

    dishEls.forEach(function (btn, idx) {
      btn.addEventListener("pointerenter", function (e) {
        if (e.pointerType === "mouse" && btn.classList.contains("is-front")) hoverPaused = true;
      });
      btn.addEventListener("pointerleave", function () {
        hoverPaused = false;
      });
      btn.addEventListener("click", function () {
        if (menuOpen) {
          setMenuOpen(false);
          return;
        }
        var active = ((Math.round(curP) % 5) + 5) % 5;
        if (idx === active) {
          openAssembly(idx);
        } else {
          stepToDish(idx);
        }
      });
    });

    asmBackBtn.addEventListener("click", closeAssembly);
    asmBackPill.addEventListener("click", closeAssembly);
    asmReplayBtn.addEventListener("click", function () {
      openAssembly(asmDishIdx);
    });
    asmReplayIconBtn.addEventListener("click", function () {
      openAssembly(asmDishIdx);
    });
    asmPrevBtn.addEventListener("click", function () {
      openAssembly((asmDishIdx + 4) % 5);
    });
    asmNextBtn.addEventListener("click", function () {
      openAssembly((asmDishIdx + 1) % 5);
    });

    // Click outside popover closes it
    function onStageClick(e) {
      if (menuOpen && !popoverEl.contains(e.target) && !menuBtn.contains(e.target)) {
        setMenuOpen(false);
      }
    }
    stage.addEventListener("click", onStageClick);

    // Horizontal swipe on Act 1 / Act 2 switches dishes cleanly
    var swipeX = 0;
    var swipeY = 0;
    var swipeTime = 0;
    function onTouchStart(e) {
      if (e.touches.length !== 1) return;
      swipeX = e.touches[0].clientX;
      swipeY = e.touches[0].clientY;
      swipeTime = Date.now();
    }
    function onTouchEnd(e) {
      if (!swipeTime || e.changedTouches.length !== 1) return;
      var dx = e.changedTouches[0].clientX - swipeX;
      var dy = e.changedTouches[0].clientY - swipeY;
      var dt = Date.now() - swipeTime;
      swipeTime = 0;
      if (dt < 700 && Math.abs(dx) > 54 && Math.abs(dx) > Math.abs(dy) * 1.5) {
        var dir = dx < 0 ? 1 : -1;
        if (mode === "carousel") {
          stepToDish(nextStepTarget(curP, manualAnim, dir));
        } else {
          openAssembly((asmDishIdx + dir + 5) % 5);
        }
      }
    }
    stage.addEventListener("touchstart", onTouchStart, { passive: true });
    stage.addEventListener("touchend", onTouchEnd, { passive: true });

    // Keyboard navigation scoped while .pg.p9 is open
    function onKeyDown(e) {
      if (disposed || pg.hidden) return;
      if (e.key === "ArrowRight") {
        e.preventDefault();
        if (mode === "carousel") stepToDish(nextStepTarget(curP, manualAnim, 1));
        else openAssembly((asmDishIdx + 1) % 5);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        if (mode === "carousel") stepToDish(nextStepTarget(curP, manualAnim, -1));
        else openAssembly((asmDishIdx + 4) % 5);
      } else if (e.key === " " && mode === "carousel") {
        if (e.target && (e.target.tagName === "BUTTON" || e.target.tagName === "A")) return;
        e.preventDefault();
        userPaused = !userPaused;
        syncLocale();
        if (!userPaused) phaseStart = performance.now();
      } else if (e.key === "Enter" && mode === "carousel") {
        if (e.target && (e.target.tagName === "BUTTON" || e.target.tagName === "A")) return;
        e.preventDefault();
        openAssembly(((Math.round(curP) % 5) + 5) % 5);
      }
    }
    window.addEventListener("keydown", onKeyDown);

    // Escape hierarchy: Popover -> Act 2 -> Act 1 (false lets carousel.js close .pg.p9)
    window.__zkFoodEscape = function () {
      if (menuOpen) {
        setMenuOpen(false);
        return true;
      }
      if (mode === "assembly") {
        closeAssembly();
        return true;
      }
      return false;
    };

    function onResize() {
      if (resizeRaf) return;
      resizeRaf = requestAnimationFrame(function () {
        resizeRaf = 0;
        if (disposed) return;
        updateLayout();
        if (mode === "assembly" && isReduced()) {
          var dish = DISHES[asmDishIdx];
          drawFluidUnder(dish, 9999, true);
          drawFluidOver(dish, 9999, 0, true);
        }
      });
    }
    window.addEventListener("resize", onResize);

    // Live language observer
    var langObs = null;
    if (window.MutationObserver) {
      langObs = new MutationObserver(syncLocale);
      langObs.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["lang"],
      });
    }

    function onReducedChange() {
      if (disposed) return;
      if (mode === "assembly") openAssembly(asmDishIdx);
    }
    if (reduceMq && reduceMq.addEventListener) {
      reduceMq.addEventListener("change", onReducedChange);
    }

    /* ---------- Initial Load & Reveal ---------- */
    heroEl.inert = false;
    asmEl.inert = true;
    popoverEl.inert = true;
    syncLocale();
    syncMenuActive();
    updateLayout();

    var act1Srcs = [RING.src]
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

    var fontsReady =
      document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve();

    function revealHero() {
      if (disposed || heroEl.classList.contains("ready")) return;
      updateLayout();
      heroEl.classList.add("ready");
      if (!stage.contains(document.activeElement)) {
        backHomeBtn.focus({ preventScroll: true });
      }
      requestAnimationFrame(function () {
        if (!disposed && mode === "carousel") startAct1Loop();
      });
    }

    // Safety fallback so hero never stays hidden if fonts/images are slow
    readyTimer = setTimeout(revealHero, 2500);

    Promise.all([Promise.all(act1Srcs.map(preloadImage)), fontsReady]).then(function () {
      clearTimeout(readyTimer);
      revealHero();
    });

    // Re-fit display wordmark once fonts settle even if safety timeout fired early
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(function () {
        if (!disposed) fitTitle();
      });
    }

    /* ---------- Deterministic Cleanup (0% Idle CPU/GPU) ---------- */
    return function cleanup() {
      disposed = true;
      stopAct1Loop();
      stopAct2Loop();
      clearTimeout(readyTimer);
      if (resizeRaf) {
        cancelAnimationFrame(resizeRaf);
        resizeRaf = 0;
      }
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
      stage.removeEventListener("click", onStageClick);
      stage.removeEventListener("touchstart", onTouchStart);
      stage.removeEventListener("touchend", onTouchEnd);
      if (langObs) langObs.disconnect();
      if (reduceMq && reduceMq.removeEventListener) {
        reduceMq.removeEventListener("change", onReducedChange);
      }
      if (window.__zkFoodEscape) delete window.__zkFoodEscape;
      document.body.classList.remove("fd-active");
    };
  }

  function register() {
    if (window.ZK3D && typeof window.ZK3D.registerPage === "function") {
      window.ZK3D.registerPage(9, mountFood);
      return true;
    }
    return false;
  }

  if (!register()) {
    window.addEventListener(
      "DOMContentLoaded",
      function () {
        register();
      },
      { once: true }
    );
  }
})();
