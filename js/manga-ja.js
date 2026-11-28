/* ============================================================
   manga-ja.js — Shōnen Tankōbon Collector’s Edition (ja-only Home)
   Zero continuous rAF loops; strictly event-driven & scoped to html[lang="ja"].
   ============================================================ */
(function () {
  "use strict";

  var SFX_MAP = {
    jump: "ピョコン!",
    poke: "ドン!",
    angry: "ガーン!!",
    music: "♪ ジャン!",
    react: "バチッ!",
  };

  var stage = document.getElementById("stage");
  var wheel = document.getElementById("wheel");
  var hd = document.querySelector(".hd");
  var block = hd && hd.querySelector(".block");
  var mk = document.getElementById("mk");
  var nm = document.getElementById("nm");
  var buddy = document.getElementById("buddy");

  var pageNumEl = null;
  var chMkEl = null;
  var sfxEl = null;
  var totalCards = 10;
  var lastIdx = 2;
  var prevSyncedIdx = -1;
  var snapTimer = null;
  var sfxTimer = null;
  var jaFontsRequested = false;

  function isJa() {
    return document.documentElement.lang === "ja";
  }

  function pad2(n) {
    return (n < 10 ? "0" : "") + n;
  }

  function prefersReduced() {
    return !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }

  function markOwnDecorative(el) {
    el.setAttribute("data-i18n-own", "1");
    el.setAttribute("aria-hidden", "true");
    return el;
  }

  function buildSpeedlinesSvg() {
    var NS = "http://www.w3.org/2000/svg";
    var svg = document.createElementNS(NS, "svg");
    svg.setAttribute("class", "mg-speedlines");
    svg.setAttribute("viewBox", "0 0 1200 520");
    svg.setAttribute("preserveAspectRatio", "none");
    markOwnDecorative(svg);

    var g = document.createElementNS(NS, "g");
    g.setAttribute("fill", "var(--mg-speed, rgba(17, 17, 17, 0.18))");

    // 28 G-pen tapered radial rays (shuchusen) centered on active card focal point
    var cx = 600;
    var cy = 238;
    var count = 28;
    for (var i = 0; i < count; i++) {
      var frac = i / count;
      // Slight deterministic organic angle jitter so rays feel hand-inked
      var jitter = Math.sin(i * 7.3) * 0.032;
      var ang = frac * Math.PI * 2 + jitter;
      // Vary inner radius and outer tip thickness deterministically
      var rIn = 185 + ((i * 37) % 95);
      var rOut = 760;
      var halfThick = i % 3 === 0 ? 5.2 : i % 2 === 0 ? 3.1 : 1.9;
      var cos = Math.cos(ang);
      var sin = Math.sin(ang);
      var px = -sin;
      var py = cos;

      // Tapered ink wedge: razor-sharp inner tip -> wide outer stroke
      var x0 = cx + cos * rIn;
      var y0 = cy + sin * rIn * 0.72;
      var x1 = cx + cos * rOut + px * halfThick;
      var y1 = cy + sin * rOut * 0.72 + py * halfThick;
      var x2 = cx + cos * rOut - px * halfThick;
      var y2 = cy + sin * rOut * 0.72 - py * halfThick;

      var poly = document.createElementNS(NS, "polygon");
      poly.setAttribute(
        "points",
        x0.toFixed(1) +
          "," +
          y0.toFixed(1) +
          " " +
          x1.toFixed(1) +
          "," +
          y1.toFixed(1) +
          " " +
          x2.toFixed(1) +
          "," +
          y2.toFixed(1)
      );
      g.appendChild(poly);
    }

    svg.appendChild(g);

    var hole = document.createElementNS(NS, "ellipse");
    hole.setAttribute("class", "mg-speed-hole");
    hole.setAttribute("cx", String(cx));
    hole.setAttribute("cy", String(cy));
    hole.setAttribute("rx", "235");
    hole.setAttribute("ry", "175");
    svg.appendChild(hole);

    return svg;
  }

  function injectMangaElements() {
    // 1. Outer double-ruled manuscript frame + desktop vertical marginalia codes
    if (hd && !document.querySelector(".mg-frame")) {
      var frame = markOwnDecorative(document.createElement("div"));
      frame.className = "mg-frame";

      var codeL = markOwnDecorative(document.createElement("span"));
      codeL.className = "mg-code mg-code-l";
      codeL.textContent = "ZIKRI-FOLIO // VOL.01-2026";

      var codeR = markOwnDecorative(document.createElement("span"));
      codeR.className = "mg-code mg-code-r";
      codeR.textContent = "MEDAN · 初版";

      frame.appendChild(codeL);
      frame.appendChild(codeR);
      hd.parentNode.insertBefore(frame, hd);
    }

    // 2. Vertical Japanese hanko seal inside the vermilion pillar
    if (block && !block.querySelector(".mg-hanko-txt")) {
      var hanko = markOwnDecorative(document.createElement("span"));
      hanko.className = "mg-hanko-txt";
      hanko.textContent = "作品集";
      block.appendChild(hanko);
    }

    // 3. Radial speedlines SVG + page counter inside #stage
    if (stage) {
      if (!stage.querySelector(".mg-speedlines")) {
        stage.insertBefore(buildSpeedlinesSvg(), stage.firstChild);
      }
      pageNumEl = stage.querySelector(".mg-page-num");
      if (!pageNumEl) {
        pageNumEl = markOwnDecorative(document.createElement("span"));
        pageNumEl.className = "mg-page-num";
        pageNumEl.textContent = "第 03 / 10 話";
        stage.appendChild(pageNumEl);
      }
    }

    // 4. Chapter stamp badges (第01話 .. 第09話) inside each Home wheel card
    if (wheel) {
      var cards = wheel.querySelectorAll(".card");
      if (cards.length) {
        totalCards = cards.length;
        for (var i = 0; i < cards.length; i++) {
          if (!cards[i].querySelector(".mg-ch")) {
            var badge = markOwnDecorative(document.createElement("span"));
            badge.className = "mg-ch";
            badge.textContent = "第" + pad2(i + 1) + "話";
            cards[i].insertBefore(badge, cards[i].firstChild);
          }
        }
      }
    }

    // 5. Speech bubble chapter prefix inside #mk right before #nm
    if (mk && nm) {
      chMkEl = mk.querySelector(".mg-ch-mk");
      if (!chMkEl) {
        chMkEl = markOwnDecorative(document.createElement("span"));
        chMkEl.className = "mg-ch-mk";
        mk.insertBefore(chMkEl, nm);
      }
    }

    // 6. Buddy katakana micro-SFX element
    if (buddy) {
      sfxEl = buddy.querySelector(".mg-sfx");
      if (!sfxEl) {
        sfxEl = markOwnDecorative(document.createElement("span"));
        sfxEl.className = "mg-sfx";
        buddy.appendChild(sfxEl);
      }
    }
  }

  function syncCard(idx) {
    var safeTotal = totalCards > 0 ? totalCards : 10;
    var clamped = ((idx % safeTotal) + safeTotal) % safeTotal;
    lastIdx = clamped;

    var chLabel = "第" + pad2(clamped + 1) + "話";
    if (pageNumEl) {
      pageNumEl.textContent = "第 " + pad2(clamped + 1) + " / " + pad2(safeTotal) + " 話";
    }
    if (chMkEl) {
      chMkEl.textContent = isJa() ? chLabel + " · " : "";
    }

    if (stage && isJa() && !prefersReduced() && prevSyncedIdx >= 0 && clamped !== prevSyncedIdx) {
      stage.classList.add("mg-snap");
      clearTimeout(snapTimer);
      snapTimer = setTimeout(function () {
        stage.classList.remove("mg-snap");
      }, 220);
    }
    prevSyncedIdx = clamped;
  }

  function triggerBuddySfx(kind) {
    if (!isJa() || prefersReduced() || !sfxEl) return;
    var text = SFX_MAP[kind] || SFX_MAP.react;
    sfxEl.textContent = text;
    sfxEl.classList.remove("on");
    void sfxEl.offsetWidth;
    sfxEl.classList.add("on");
    clearTimeout(sfxTimer);
    sfxTimer = setTimeout(function () {
      if (sfxEl) sfxEl.classList.remove("on");
    }, 720);
  }

  function detectActiveIndex() {
    if (!wheel) return lastIdx;
    var cards = wheel.querySelectorAll(".card");
    for (var i = 0; i < cards.length; i++) {
      if (cards[i].classList.contains("on")) return i;
    }
    return lastIdx;
  }

  function ensureJaFontsAndBuddy() {
    if (!isJa()) return;
    if (window.__zkFitHeroTitle) window.__zkFitHeroTitle();
    if (window.__zkBuddyRefreshGeom) {
      window.__zkBuddyRefreshGeom();
    }
    if (document.fonts && document.fonts.load && !jaFontsRequested) {
      jaFontsRequested = true;
      Promise.all([
        document.fonts.load('400 48px "Dela Gothic One"', "ポートフォリオ"),
        document.fonts.load('900 24px "Noto Sans JP"', "クリエイティブ空間作品集第話"),
      ])
        .then(function () {
          if (window.__zkFitHeroTitle) window.__zkFitHeroTitle();
          if (window.__zkBuddyRefreshGeom) window.__zkBuddyRefreshGeom();
        })
        .catch(function () {
          jaFontsRequested = false;
        });
    } else if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(function () {
        if (isJa()) {
          if (window.__zkFitHeroTitle) window.__zkFitHeroTitle();
          if (window.__zkBuddyRefreshGeom) window.__zkBuddyRefreshGeom();
        }
      });
    }
  }

  function syncLangState() {
    injectMangaElements();
    var idx = detectActiveIndex();
    var prev = prevSyncedIdx;
    prevSyncedIdx = idx; // avoid speedline snap on pure language toggle
    syncCard(idx);
    if (prev < 0) prevSyncedIdx = idx;
    if (!isJa() && sfxEl) {
      sfxEl.classList.remove("on");
    }
    ensureJaFontsAndBuddy();
  }

  window.__zkMangaSyncCard = syncCard;
  window.__zkMangaBuddySfx = triggerBuddySfx;

  injectMangaElements();
  syncLangState();
  window.addEventListener("zk-lang", syncLangState);
})();
