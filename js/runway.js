/* ==========================================================================
   js/runway.js — <runway-section> Custom Element (Card #8: Fashion)
   Exact zero-framework 3D Ring + Classic Mobile Runway engine tailored as
   Zikri's cohesive, non-commercial Personal Fashion Lookbook.
   ========================================================================== */
(function () {
  "use strict";

  var REDUCE_MQ = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)");
  var FINE_MQ = window.matchMedia && window.matchMedia("(hover: hover) and (pointer: fine)");

  function isReduced() {
    return !!(REDUCE_MQ && REDUCE_MQ.matches);
  }

  function isFinePointer() {
    return !!(FINE_MQ && FINE_MQ.matches);
  }

  function clamp(v, lo, hi) {
    return v < lo ? lo : v > hi ? hi : v;
  }

  var SHEET_PROPS = [
    "--rw-panel",
    "--rw-text",
    "--rw-muted",
    "--rw-line",
    "--rw-accent",
    "--rw-on-accent",
    "--rw-btn-bg",
    "--rw-btn-fg",
    "--rw-btn-radius",
    "--rw-pill-radius",
    "--rw-bar-r",
    "--rw-thumb-radius",
    "--rw-pt-size",
    "--rw-price",
    "--rw-opt",
    "--rw-ease",
    "--rw-ease-sheet",
    "--rw-ease-spring",
  ];

  class RunwaySection extends HTMLElement {
    connectedCallback() {
      if (this._init) return;
      this._init = true;

      this._stage = this.querySelector("[data-rw-stage]");
      this._actors = this.querySelector("[data-rw-actors]");
      this._heroesWrap = this.querySelector("[data-rw-heroes]");
      this._cursor = this.querySelector("[data-rw-cursor]");
      this._live = this.querySelector("[data-rw-live]");
      this._piecesOut = this.querySelector("[data-rw-pieces]");
      this._autoBtn = this.querySelector("[data-rw-auto]");
      this._lb = this.querySelector("[data-rw-lb]");
      this._lbStage = this.querySelector("[data-rw-lb-stage]");
      this._lbKicker = this.querySelector("[data-rw-lb-kicker]");
      this._lbName = this.querySelector("[data-rw-lb-name]");
      this._panelEl = this.querySelector(".rw__panel");

      if (!this._stage || !this._actors) return;

      this._heroes = Array.prototype.slice.call(this.querySelectorAll("[data-rw-hero]"));
      this._panels = Array.prototype.slice.call(this.querySelectorAll("[data-rw-panel]"));
      this._ticks = Array.prototype.slice.call(this.querySelectorAll("[data-rw-tick]"));
      this._n = this._heroes.length || 6;

      // Exact feel balanced constants: K=95, C=2*sqrt(95), lag=0.04
      this._K = 95;
      this._C = 2 * Math.sqrt(this._K);
      this._lag = 0.04;
      this._speed = parseInt(this.dataset.speed, 10) || 5000;
      this._useBlur = this.dataset.blur !== "false";
      this._autoCfg = this.dataset.autoplay !== "false";

      this._index = 0;
      this._target = 0;
      this._startOffset = isReduced() ? 0 : 1.15;
      this._cur = -this._startOffset;
      this._vel = 0;
      this._still = false;
      this._visible = true;
      this._playing = false;
      this._engaged = false;
      this._panelHover = false;
      this._zoomed = false;
      this._dragging = false;
      this._lastDragEnd = 0;
      this._W = 0;
      this._H = 0;
      this._unit = 200;
      this._mode = "ring";
      this._isMobile = false;
      this._latchedW = window.innerWidth;
      this._latchedVH = window.innerHeight;
      this._raf = 0;
      this._lastTime = 0;
      this._autoTimer = 0;
      this._resizeTimer = 0;
      this._wheelAcc = 0;
      this._wheelLock = 0;
      this._lbClearTimer = 0;
      this._openSheetCard = null;
      this._sheetHost = null;
      this._sheetOriginBtn = null;
      this._curRaf = 0;
      this._cx = 0;
      this._cy = 0;
      this._tcx = 0;
      this._tcy = 0;
      this._curActive = false;

      // Clone bodies 0..5 -> 6..11 (N = n * ceil(8 / n) = 12)
      var origBodies = Array.prototype.slice.call(this._actors.querySelectorAll("[data-rw-model]"));
      var copies = Math.ceil(8 / this._n);
      for (var c = 1; c < copies; c++) {
        for (var j = 0; j < origBodies.length; j++) {
          var clone = origBodies[j].cloneNode(true);
          clone.setAttribute("data-rw-clone", "1");
          var imgs = clone.querySelectorAll("img");
          for (var k = 0; k < imgs.length; k++) imgs[k].setAttribute("loading", "lazy");
          this._actors.appendChild(clone);
        }
      }

      var allBodies = Array.prototype.slice.call(this._actors.querySelectorAll("[data-rw-model]"));
      this._N = allBodies.length;
      this._bodies = allBodies.map(function (el, a) {
        return {
          a: a,
          look: a % this._n,
          el: el,
          hit: el.querySelector(".rw__hit"),
          w: 0,
          lastBlur: "",
          x: a + this._startOffset,
          g: a + this._startOffset,
          v: 0,
          goal: a,
          trip: false,
          from: a,
        };
      }, this);

      this._decodeModels();
      this._probeFeet();

      if (isFinePointer() && this._cursor) {
        this.classList.add("rw--cursor");
      } else if (this._cursor) {
        this._cursor.remove();
        this._cursor = null;
      }

      this.classList.add("rw--js");
      if (isReduced()) {
        this.classList.add("is-revealed");
      }

      this._bindEvents();
      this._measure();
      this._setIndex(0, true);
      this._renderAll();

      var self = this;
      if (!isReduced()) {
        if (window.IntersectionObserver) {
          this._revObs = new IntersectionObserver(
            function (entries) {
              for (var i = 0; i < entries.length; i++) {
                if (entries[i].isIntersecting) {
                  requestAnimationFrame(function () {
                    requestAnimationFrame(function () {
                      self.classList.add("is-revealed");
                    });
                  });
                  if (self._revObs) {
                    self._revObs.disconnect();
                    self._revObs = null;
                  }
                }
              }
            },
            { threshold: 0, rootMargin: "0px 0px -10% 0px" }
          );
          this._revObs.observe(this);
        } else {
          this.classList.add("is-revealed");
        }
        this._revFallback = setTimeout(function () {
          self.classList.add("is-revealed");
        }, 120);
      }

      if (window.IntersectionObserver) {
        this._visObs = new IntersectionObserver(
          function (entries) {
            self._visible = !!(entries[0] && entries[0].isIntersecting);
            if (self._visible) self._kick();
          },
          { threshold: 0 }
        );
        this._visObs.observe(this);
      }

      if (window.ResizeObserver) {
        this._resObs = new ResizeObserver(function () {
          self._measure();
        });
        this._resObs.observe(this._stage);
      }

      if (this._autoCfg && !isReduced()) {
        this._play(true);
      }
      this._kick();
    }

    disconnectedCallback() {
      this._init = false;
      if (this._raf) {
        cancelAnimationFrame(this._raf);
        this._raf = 0;
      }
      if (this._curRaf) {
        cancelAnimationFrame(this._curRaf);
        this._curRaf = 0;
      }
      clearTimeout(this._autoTimer);
      clearTimeout(this._resizeTimer);
      clearTimeout(this._revFallback);
      clearTimeout(this._lbClearTimer);
      clearTimeout(this._lbSwapTimer);
      if (this._revObs) {
        this._revObs.disconnect();
        this._revObs = null;
      }
      if (this._visObs) {
        this._visObs.disconnect();
        this._visObs = null;
      }
      if (this._resObs) {
        this._resObs.disconnect();
        this._resObs = null;
      }

      if (this._onResize) window.removeEventListener("resize", this._onResize);
      if (this._onVisChange) document.removeEventListener("visibilitychange", this._onVisChange);
      if (this._onWinKeyDown) document.removeEventListener("keydown", this._onWinKeyDown);

      this._closeSheet(false);
      if (this._sheetHost && this._sheetHost.parentNode) {
        this._sheetHost.parentNode.removeChild(this._sheetHost);
      }
      this._sheetHost = null;
    }

    /* ---------- Helpers ---------- */
    _mod(x, m) {
      return ((x % m) + m) % m;
    }

    _wrapN(x) {
      return this._mod(x, this._N);
    }

    _setStill(on) {
      if (this._still === on) return;
      this._still = on;
      this.classList.toggle("rw--still", on);
    }

    _decodeModels() {
      var imgs = this.querySelectorAll("img[data-model-image]");
      for (var i = 0; i < imgs.length; i++) {
        (function (img) {
          function reveal() {
            img.classList.add("is-decoded");
          }
          if (img.complete && img.naturalWidth > 0) {
            reveal();
          } else if (typeof img.decode === "function") {
            img
              .decode()
              .then(reveal)
              .catch(function () {
                if (img.naturalWidth > 0) reveal();
                else img.addEventListener("load", reveal, { once: true });
              });
          } else {
            img.addEventListener("load", reveal, { once: true });
          }
        })(imgs[i]);
      }
    }

    _probeFeet() {
      var self = this;
      this._heroes.forEach(function (hero, idx) {
        var url = hero.getAttribute("data-probe");
        if (!url) return;
        var img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = function () {
          try {
            var pw = 48;
            var ph = Math.max(1, Math.round(pw * (img.naturalHeight / (img.naturalWidth || 1))));
            var cv = document.createElement("canvas");
            cv.width = pw;
            cv.height = ph;
            var ctx = cv.getContext("2d");
            if (!ctx) return;
            ctx.drawImage(img, 0, 0, pw, ph);
            var data = ctx.getImageData(0, 0, pw, ph).data;
            var lastRow = ph - 1;
            outer: for (var y = ph - 1; y >= 0; y--) {
              var rowOff = y * pw * 4;
              for (var x = 0; x < pw; x++) {
                if (data[rowOff + x * 4 + 3] > 40) {
                  lastRow = y;
                  break outer;
                }
              }
            }
            var foot = clamp((ph - 1 - lastRow) / ph, 0, 0.4);
            var val = foot.toFixed(4);
            hero.style.setProperty("--rw-foot", val);
            for (var b = 0; b < self._bodies.length; b++) {
              if (self._bodies[b].look === idx) {
                self._bodies[b].el.style.setProperty("--rw-foot", val);
              }
            }
          } catch (_) {}
        };
        img.src = url;
      });
    }

    /* ---------- 7.2 & 8.1 Measure & Resize ---------- */
    _measure() {
      var vw = window.innerWidth;
      var vh = window.innerHeight;
      var wasMobile = this._isMobile;
      this._isMobile = vw <= 749;

      if (Math.abs(vw - this._latchedW) > 1 || Math.abs(vh - this._latchedVH) >= 160) {
        this._latchedW = vw;
        this._latchedVH = vh;
      }

      if (wasMobile && !this._isMobile) {
        this._redockAllDrawers();
      }

      this._mode = this._isMobile ? this.dataset.mstyle || "classic" : this.dataset.style || "ring";

      var frameH;
      if (this._isMobile) {
        var pct = clamp(parseInt(this.dataset.mheightVh, 10) || 109, 50, 120);
        frameH = Math.round((this._latchedVH * pct) / 100);
      } else {
        var headerH = 0;
        var headers = document.querySelectorAll(
          ".shopify-section-group-header-group, #shopify-section-header, #shopify-section-announcement-bar"
        );
        for (var i = 0; i < headers.length; i++) {
          if (!headers[i].contains(this) && headers[i].offsetHeight > 0) {
            headerH += headers[i].offsetHeight;
          }
        }
        frameH = Math.max(380, vh - headerH);
      }
      this.style.setProperty("--rw-frame-h", frameH + "px");

      var rect = this._stage.getBoundingClientRect();
      this._W = rect.width || vw;
      this._H = rect.height || Math.max(320, frameH - 140);

      var fs = this._mode === "ring" ? 1.08 : 1;
      this._fs = fs;
      this._stage.style.setProperty("--rw-fs", String(fs));

      var modelH;
      if (this._mode === "ring") {
        modelH = Math.max(200, Math.round((this._H - 34 - 18) / 1.08));
      } else {
        var ay = this._isMobile ? 24 : 36;
        modelH = Math.max(200, Math.round(this._H - ay - 18));
      }
      this._stage.style.setProperty("--rw-model-h", modelH + "px");

      var hx =
        this._mode === "ring" ? 0.5 * this._W : this._isMobile ? 0.3 * this._W : 0.4 * this._W;
      var hy = this._mode === "ring" ? 34 : this._isMobile ? 22 : 36;
      this._stage.style.setProperty("--rw-hx", hx.toFixed(1) + "px");
      this._stage.style.setProperty("--rw-hy", hy + "px");
      this.style.setProperty("--rw-ax", ((hx / (this._W || 1)) * 100).toFixed(2) + "%");

      if (this._mode === "ring") {
        this._unit = Math.max(this._isMobile ? 90 : 120, 0.3 * this._W);
      } else {
        this._unit = Math.max(90, this._W * (this._isMobile ? 0.32 : 0.125) * 1.6);
      }

      for (var b = 0; b < this._bodies.length; b++) {
        this._bodies[b].w = this._bodies[b].el.offsetWidth || modelH * 0.5625;
      }

      if (wasMobile !== this._isMobile) {
        for (var j = 0; j < this._bodies.length; j++) {
          var s = this._bodies[j];
          var g = this._wrapN(s.a - this._target);
          s.x = g;
          s.g = g;
          s.goal = g;
          s.v = 0;
          s.trip = false;
        }
      }

      this._renderAll();
      this._kick();
    }

    /* ---------- 7.3–7.5 Placement & Renderers ---------- */
    _put(s, x, bottom, scale, opacity, blur, z) {
      var half = (s.w || 260) * scale * 0.5;
      if (x + half < -4 || x - half > this._W + 4) {
        opacity = 0;
      }
      var el = s.el;
      el.style.transform =
        "translate3d(" +
        x.toFixed(1) +
        "px," +
        (-bottom).toFixed(1) +
        "px,0) translateX(-50%) scale(" +
        scale.toFixed(4) +
        ")";
      el.style.opacity = opacity.toFixed(3);
      el.style.zIndex = String(z);
      el.style.visibility = opacity < 0.01 ? "hidden" : "visible";
      el.style.pointerEvents = opacity < 0.5 ? "none" : "auto";

      var bVal =
        this._useBlur && !this._isMobile && blur > 0.05
          ? "blur(" + (Math.round(blur * 10) / 10).toFixed(1) + "px)"
          : "";
      if (bVal !== s.lastBlur) {
        s.lastBlur = bVal;
        el.style.filter = bVal;
      }
    }

    _renderRing() {
      var W = this._W,
        H = this._H;
      var cx = 0.5 * W;
      var R = (this._isMobile ? 0.72 : 0.62) * W;
      var P = (this._isMobile ? 1.9 : 1.65) * W;
      var floor = H - 34;
      var horizon = 0.36 * H;
      var step = (Math.PI * 2) / this._N;
      var fs = this._fs;

      for (var i = 0; i < this._bodies.length; i++) {
        var s = this._bodies[i];
        var raw = (s.a - this._cur) * step;
        var phi = this._mod(raw + Math.PI, Math.PI * 2) - Math.PI;
        if (phi <= -Math.PI) phi += Math.PI * 2;
        var z = R * (1 - Math.cos(phi));
        var persp = P / (P + z);
        var sl = Math.abs(phi) / step;
        var scale = persp * (1 + (fs - 1) * clamp(1 - sl, 0, 1));
        var x = cx + R * Math.sin(phi) * persp;
        var feet = horizon + (floor - horizon) * persp;
        var bottom = H - feet;
        var blur = sl <= 1 ? 1.8 * sl : Math.min(1.8 + (sl - 1) * 2, 6.5);
        var opacity = clamp((Math.cos(phi) + 0.55) / 0.3, 0, 1);
        if (this._still && sl < 0.02) opacity = 0;
        var zi = Math.round(scale * 1000);
        this._put(s, x, bottom, scale, opacity, blur, zi);
      }
    }

    _renderClassic() {
      var W = this._W;
      var mob = this._isMobile;
      var ax = mob ? 0.3 : 0.4;
      var ay = mob ? 22 : 36;
      var sx = mob ? 0.32 : 0.125;
      var sy = mob ? 22 : 58;
      var sr = 0.76;
      var ex = mob ? 0.55 : 0.38;
      var d = mob ? 4 : 5;

      for (var i = 0; i < this._bodies.length; i++) {
        var s = this._bodies[i];
        var k = s.x;
        var e = -1;

        if (s.trip) {
          var span = Math.abs(s.goal - s.from) || 1;
          var u = clamp(Math.abs(s.x - s.from) / span, 0, 1);
          if (s.goal > s.from) {
            if (u < 0.5) e = 2 * u * 1.4;
            else k = s.goal + 2 * (1 - u);
          } else {
            if (u < 0.5) k = s.from + 2 * u;
            else e = 2 * (1 - u) * 1.4;
          }
        } else if (k < 0) {
          e = Math.min(-k, 1.4);
        }

        if (e >= 0) {
          var xE = W * (ax - ex * e);
          var botE = ay - 22 * e;
          var scE = 1 + 0.14 * e;
          var opE = Math.max(0, 1 - 1.05 * e);
          var blE = 4 * Math.min(e, 1);
          this._put(s, xE, botE, scE, opE, blE, 1100);
        } else {
          var xL = W * (ax + sx * k);
          var botL = ay + sy * k;
          var scL = Math.pow(sr, k);
          var opL = k <= d - 1 ? 1 - 0.13 * k : Math.max(0, 0.61 * (d - k));
          var blL = Math.min(0.9 * k, 3.2);
          var zL = 1000 - Math.round(10 * k);
          if (this._still && Math.abs(k) < 0.02) opL = 0;
          this._put(s, xL, botL, scL, opL, blL, zL);
        }
      }
    }

    _renderAll() {
      if (this._mode === "ring") this._renderRing();
      else this._renderClassic();
    }

    /* ---------- 7.8 Physics Loop ---------- */
    _kick() {
      if (this._raf || !this._visible || document.hidden) return;
      this._lastTime = 0;
      var self = this;
      this._raf = requestAnimationFrame(function (ts) {
        self._tick(ts);
      });
    }

    _tick(ts) {
      this._raf = 0;
      if (!this._visible || document.hidden) return;

      var dt = this._lastTime ? Math.min(0.034, (ts - this._lastTime) / 1000) : 1 / 60;
      this._lastTime = ts;
      var h = dt / 3;
      var settled = true;

      if (isReduced()) {
        this._cur = this._target;
        this._vel = 0;
        for (var r = 0; r < this._bodies.length; r++) {
          var sr = this._bodies[r];
          var gr = this._wrapN(sr.a - this._target);
          sr.x = gr;
          sr.g = gr;
          sr.goal = gr;
          sr.v = 0;
          sr.trip = false;
        }
        this._setStill(!this._dragging);
        this._renderAll();
        return;
      }

      if (this._mode === "ring") {
        for (var sub = 0; sub < 3; sub++) {
          var acc = -this._K * (this._cur - this._target) - this._C * this._vel;
          this._vel += acc * h;
          this._cur += this._vel * h;
        }
        if (Math.abs(this._cur - this._target) <= 0.0005 && Math.abs(this._vel) <= 0.0005) {
          this._cur = this._target;
          this._vel = 0;
        } else {
          settled = false;
        }
      } else {
        for (var i = 0; i < this._bodies.length; i++) {
          var s = this._bodies[i];
          var goal = this._wrapN(s.a - this._target);
          if (Math.abs(goal - s.goal) > this._N * 0.5) {
            s.trip = true;
            s.from = s.x;
          }
          s.goal = goal;
          var tau = this._dragging ? 0.016 : s.trip ? 0.1 : 0.03 + this._lag * Math.min(goal, 4);
          s.g += (goal - s.g) * (1 - Math.exp(-dt / tau));

          for (var sb = 0; sb < 3; sb++) {
            var aC = -this._K * (s.x - s.g) - this._C * s.v;
            s.v += aC * h;
            s.x += s.v * h;
          }
          if (s.trip && Math.abs(s.x - goal) < 0.02) s.trip = false;
          if (
            Math.abs(s.x - goal) <= 0.0006 &&
            Math.abs(s.v) <= 0.0006 &&
            Math.abs(s.g - goal) <= 0.0006
          ) {
            s.x = goal;
            s.g = goal;
            s.v = 0;
            s.trip = false;
          } else {
            settled = false;
          }
        }
        this._cur = this._target;
      }

      if (!settled || this._dragging) {
        this._setStill(false);
        this._renderAll();
        var self = this;
        this._raf = requestAnimationFrame(function (t) {
          self._tick(t);
        });
      } else {
        this._setStill(true);
        this._renderAll();
      }
    }

    /* ---------- 8.3 & 8.4 Navigation & Index Change ---------- */
    _rankOf(bodyIndex) {
      var base = Math.round(this._target);
      var diff = this._mod(bodyIndex - base, this._N);
      if (this._mode === "ring") {
        if (diff > this._N / 2) diff -= this._N;
      }
      return diff;
    }

    _updateBodyA11y() {
      var limit = this._mode === "ring" ? 2 : 3;
      for (var i = 0; i < this._bodies.length; i++) {
        var s = this._bodies[i];
        var k = this._rankOf(s.a);
        var focusable = k !== 0 && Math.abs(k) <= limit;
        if (focusable) {
          s.el.removeAttribute("aria-hidden");
          if (s.hit) {
            s.hit.tabIndex = 0;
            s.hit.setAttribute("aria-hidden", "false");
          }
        } else {
          s.el.setAttribute("aria-hidden", "true");
          if (s.hit) {
            s.hit.tabIndex = -1;
            s.hit.setAttribute("aria-hidden", "true");
          }
        }
      }
    }

    _setIndex(i, silent) {
      i = this._mod(i, this._n);
      var prevIdx = this._index;
      this._index = i;
      this._updateBodyA11y();
      this._kick();

      this.style.setProperty("--rw-progress", ((i + 1) / this._n).toFixed(3));

      for (var h = 0; h < this._heroes.length; h++) {
        var hero = this._heroes[h];
        var isOn = h === i;
        hero.classList.toggle("is-on", isOn);
        hero.classList.toggle("was", !silent && h === prevIdx && prevIdx !== i);
        hero.setAttribute("aria-hidden", isOn ? "false" : "true");
        var zm = hero.querySelector("[data-rw-zoom]");
        if (zm) zm.tabIndex = isOn ? 0 : -1;
      }

      for (var t = 0; t < this._ticks.length; t++) {
        var tk = this._ticks[t];
        tk.setAttribute("aria-current", t === i ? "true" : "false");
        tk.classList.toggle("is-past", t < i);
      }

      var activePanel = this._panels[i];
      for (var p = 0; p < this._panels.length; p++) {
        var pnl = this._panels[p];
        pnl.hidden = p !== i;
        if (!silent) pnl.classList.remove("is-in");
      }
      if (!silent && activePanel) {
        void activePanel.offsetWidth;
        activePanel.classList.add("is-in");
      }

      if (activePanel && this._piecesOut) {
        var tpl = activePanel.querySelector("template[data-rw-pieces-text]");
        var txt = tpl
          ? ((tpl.content ? tpl.content.textContent : tpl.textContent) || "").trim()
          : "3 detail";
        this._piecesOut.textContent = txt || "3 detail";
        if (!silent) {
          this._piecesOut.classList.remove("is-swap");
          void this._piecesOut.offsetWidth;
          this._piecesOut.classList.add("is-swap");
        }
      }

      if (!silent) {
        if (this._zoomed && !this._lbSwapping) this._closeLightbox(false, true);
        if (this._isMobile) this._closeSheet(false);
        this._clearHot();

        if (!isReduced()) {
          this._stage.classList.remove("is-sweep");
          void this._stage.offsetWidth;
          this._stage.classList.add("is-sweep");
        }

        if (this._live && this._heroes[i]) {
          this._live.textContent = this._heroes[i].getAttribute("data-label") || "";
        }

        this._restartAutoBar();
      }
    }

    _moveTo(T) {
      this._target = T;
      this._setStill(false);
      this._setIndex(this._mod(Math.round(T), this._n), false);
    }

    next() {
      this._moveTo(Math.round(this._target) + 1);
    }

    prev() {
      this._moveTo(Math.round(this._target) - 1);
    }

    go(i) {
      var d = this._mod(i - this._index, this._n);
      if (d > this._n / 2) d -= this._n;
      this._moveTo(Math.round(this._target) + d);
    }

    /* ---------- 8.5 Autoplay ---------- */
    _play(on) {
      if (isReduced()) on = false;
      this._playing = !!on;
      this.classList.toggle("is-playing", this._playing);
      if (this._autoBtn) {
        this._autoBtn.classList.toggle("is-playing", this._playing);
        this._autoBtn.setAttribute("aria-pressed", this._playing ? "true" : "false");
      }
      this._restartAutoBar();
    }

    _engage() {
      this._engaged = true;
      if (this._playing) this._play(false);
    }

    _restartAutoBar() {
      clearTimeout(this._autoTimer);
      for (var t = 0; t < this._ticks.length; t++) {
        this._ticks[t].classList.remove("is-run");
      }
      if (!this._playing) return;
      var curTick = this._ticks[this._index];
      if (curTick) {
        void curTick.offsetWidth;
        curTick.classList.add("is-run");
      }
      var self = this;
      this._autoTimer = setTimeout(function () {
        if (
          self._playing &&
          self._visible &&
          !self._dragging &&
          !document.hidden &&
          !self._panelHover &&
          !self._zoomed &&
          !self._engaged
        ) {
          self.next();
        } else if (self._playing) {
          self._restartAutoBar();
        }
      }, this._speed);
    }

    /* ---------- 9.4 Hot Linking ---------- */
    _clearHot() {
      var hots = this.querySelectorAll(".is-hot");
      for (var i = 0; i < hots.length; i++) hots[i].classList.remove("is-hot");
    }

    _hot(n, scroll) {
      this._clearHot();
      var pinScope = this._zoomed ? this._lbStage : this._heroes[this._index];
      if (pinScope) {
        var pin = pinScope.querySelector('[data-rw-pin="' + n + '"]');
        if (pin) pin.classList.add("is-hot");
      }
      var pnl = this._panels[this._index];
      if (!pnl) return;
      var card = pnl.querySelector('[data-rw-card="' + n + '"]');
      if (!card) return;
      card.classList.add("is-hot");
      if (scroll) this._revealCard(card);
    }

    _revealCard(card) {
      var list = card.closest(".rw__items");
      var behavior = isReduced() ? "auto" : "smooth";
      if (list) {
        if (list.scrollWidth > list.clientWidth + 4) {
          var lRect = list.getBoundingClientRect();
          var cRect = card.getBoundingClientRect();
          list.scrollTo({
            left: list.scrollLeft + (cRect.left - lRect.left) - 20,
            behavior: behavior,
          });
          return;
        }
        if (list.scrollHeight > list.clientHeight + 4) {
          list.scrollTo({ top: card.offsetTop - list.offsetTop - 12, behavior: behavior });
          return;
        }
      }
      var r = card.getBoundingClientRect();
      if (r.top < 0 || r.bottom > window.innerHeight - 140) {
        var pg = document.getElementById("pg");
        if (pg && pg.scrollHeight > pg.clientHeight + 4) {
          pg.scrollBy({ top: r.top - 0.3 * window.innerHeight, behavior: behavior });
        } else {
          window.scrollBy({ top: r.top - 0.3 * window.innerHeight, behavior: behavior });
        }
      }
    }

    /* ---------- 11.1 FLIP Lightbox ("View Look") ---------- */
    _openLightbox(focusPinNum) {
      if (this._zoomed) {
        if (focusPinNum) this._hot(focusPinNum, false);
        return;
      }
      if (!this._lb || !this._lbStage) return;
      var hero = this._heroes[this._index];
      if (!hero) return;
      var heroFig = hero.querySelector(".rw__figure");
      if (!heroFig) return;

      this._engage();
      this._clearHot();
      clearTimeout(this._lbClearTimer);

      var aRect = heroFig.getBoundingClientRect();
      var wrap = document.createElement("div");
      wrap.className = "rw__lb-model";
      var footVal = hero.style.getPropertyValue("--rw-foot");
      if (footVal) wrap.style.setProperty("--rw-foot", footVal);

      var sh = hero.querySelector(".rw__shadow");
      if (sh) wrap.appendChild(sh.cloneNode(true));
      var figClone = heroFig.cloneNode(true);
      var zm = figClone.querySelector("[data-rw-zoom]");
      if (zm) zm.remove();

      var pins = figClone.querySelectorAll("[data-rw-pin]");
      for (var p = 0; p < pins.length; p++) pins[p].tabIndex = 0;

      var imgs = figClone.querySelectorAll("img");
      for (var m = 0; m < imgs.length; m++) {
        imgs[m].setAttribute("loading", "eager");
        imgs[m].classList.add("is-decoded");
      }

      wrap.appendChild(figClone);
      this._lbStage.innerHTML = "";
      this._lbStage.appendChild(wrap);

      var stRect = this._lbStage.getBoundingClientRect();
      var h = Math.max(160, Math.min(stRect.height || 560, (stRect.width || 400) / 0.5625));
      wrap.style.setProperty("--rw-model-h", Math.round(h) + "px");
      var szAttr = Math.round(h * 0.5625) + "px";
      for (var q = 0; q < imgs.length; q++) imgs[q].setAttribute("sizes", szAttr);

      var word = this._lb.getAttribute("data-word") || "Look";
      if (this._lbKicker) this._lbKicker.textContent = word + " 0" + (this._index + 1);
      if (this._lbName) this._lbName.textContent = hero.getAttribute("data-name") || "";

      this._zoomed = true;
      this._lbOpenIdx = this._index;
      this.classList.remove("rw--lb-fast");
      this.classList.add("rw--zoom");
      this._lb.setAttribute("aria-hidden", "false");

      var bRect = figClone.getBoundingClientRect();
      if (!isReduced() && aRect.height > 10 && bRect.height > 10) {
        var dx = aRect.left - bRect.left;
        var dy = aRect.bottom - bRect.bottom;
        var sc = aRect.height / bRect.height;
        var atTransform =
          "translate3d(" +
          dx.toFixed(1) +
          "px," +
          dy.toFixed(1) +
          "px,0) scale(" +
          sc.toFixed(4) +
          ")";
        wrap.dataset.atTransform = atTransform;
        wrap.style.transition = "none";
        wrap.style.transform = atTransform;
        void wrap.offsetWidth;
        wrap.style.transition = "";
        wrap.style.transform = "";
      }

      if (focusPinNum) {
        var self = this;
        setTimeout(
          function () {
            if (self._zoomed) self._hot(focusPinNum, false);
          },
          isReduced() ? 20 : 620
        );
      }

      var closeBtn = this._lb.querySelector("[data-rw-zoom-close]");
      if (closeBtn) closeBtn.focus({ preventScroll: true });
    }

    _switchLightboxLook(targetIdx) {
      if (!this._zoomed || !this._lb || !this._lbStage) return;
      targetIdx = this._mod(targetIdx, this._n);
      var hero = this._heroes[targetIdx];
      if (!hero) return;
      var heroFig = hero.querySelector(".rw__figure");
      if (!heroFig) return;

      clearTimeout(this._lbClearTimer);
      clearTimeout(this._lbSwapTimer);
      this._clearHot();

      // Sync carousel & side panel cleanly underneath without closing zoom
      var delta = this._mod(targetIdx - this._index, this._n);
      if (delta > this._n / 2) delta -= this._n;
      this._target = Math.round(this._target) + delta;
      this._cur = this._target;
      this._vel = 0;
      for (var b = 0; b < this._bodies.length; b++) {
        var sb = this._bodies[b];
        var gb = this._wrapN(sb.a - this._target);
        sb.x = gb;
        sb.g = gb;
        sb.goal = gb;
        sb.v = 0;
        sb.trip = false;
      }
      this._lbSwapping = true;
      this._setIndex(targetIdx, false);
      this._lbSwapping = false;
      this._setStill(true);
      this._renderAll();

      var self = this;
      var oldWrap = this._lbStage.querySelector(".rw__lb-model");
      var mountNew = function () {
        if (!self._zoomed || !self._lbStage) return;
        var wrap = document.createElement("div");
        wrap.className = "rw__lb-model is-swap-in";
        var footVal = hero.style.getPropertyValue("--rw-foot");
        if (footVal) wrap.style.setProperty("--rw-foot", footVal);

        var sh = hero.querySelector(".rw__shadow");
        if (sh) wrap.appendChild(sh.cloneNode(true));
        var figClone = heroFig.cloneNode(true);
        var zm = figClone.querySelector("[data-rw-zoom]");
        if (zm) zm.remove();

        var pins = figClone.querySelectorAll("[data-rw-pin]");
        for (var p = 0; p < pins.length; p++) pins[p].tabIndex = 0;
        var imgs = figClone.querySelectorAll("img");
        for (var m = 0; m < imgs.length; m++) {
          imgs[m].setAttribute("loading", "eager");
          imgs[m].classList.add("is-decoded");
        }

        wrap.appendChild(figClone);
        self._lbStage.innerHTML = "";
        self._lbStage.appendChild(wrap);

        var stRect = self._lbStage.getBoundingClientRect();
        var h = Math.max(160, Math.min(stRect.height || 560, (stRect.width || 400) / 0.5625));
        wrap.style.setProperty("--rw-model-h", Math.round(h) + "px");
        var szAttr = Math.round(h * 0.5625) + "px";
        for (var q = 0; q < imgs.length; q++) imgs[q].setAttribute("sizes", szAttr);

        var word = self._lb.getAttribute("data-word") || "Look";
        if (self._lbKicker) self._lbKicker.textContent = word + " 0" + (targetIdx + 1);
        if (self._lbName) self._lbName.textContent = hero.getAttribute("data-name") || "";

        if (!isReduced()) {
          void wrap.offsetWidth;
          wrap.classList.remove("is-swap-in");
        } else {
          wrap.classList.remove("is-swap-in");
        }
      };

      if (oldWrap && !isReduced()) {
        oldWrap.classList.add("is-swap-out");
        this._lbSwapTimer = setTimeout(mountNew, 145);
      } else {
        mountNew();
      }
    }

    _closeLightbox(restoreFocus, instant) {
      if (!this._zoomed || !this._lb) return;
      var hadFocus = restoreFocus && this._lb.contains(document.activeElement);
      clearTimeout(this._lbSwapTimer);
      clearTimeout(this._lbClearTimer);
      this._zoomed = false;
      this._clearHot();

      var skipFlip = !!instant || this._index !== this._lbOpenIdx;
      var wrap = this._lbStage ? this._lbStage.querySelector(".rw__lb-model") : null;

      if (skipFlip) {
        this.classList.add("rw--lb-fast");
        if (wrap) wrap.classList.add("is-swap-out");
      } else if (wrap && !isReduced() && wrap.dataset.atTransform) {
        wrap.style.transform = wrap.dataset.atTransform;
      }

      this.classList.remove("rw--zoom");
      this._lb.setAttribute("aria-hidden", "true");

      var self = this;
      var clearDelay = isReduced() ? 0 : skipFlip ? 220 : 820;
      this._lbClearTimer = setTimeout(function () {
        if (!self._zoomed) {
          self.classList.remove("rw--lb-fast");
          if (self._lbStage) self._lbStage.innerHTML = "";
        }
      }, clearDelay);

      if (hadFocus && this._stage) {
        this._stage.focus({ preventScroll: true });
      }
    }

    /* ---------- Editorial Detail Drawers (Desktop Inline / Mobile Bottom Sheet) ---------- */
    _getCardDrawer(card) {
      if (card._pickerEl) return card._pickerEl;
      var pk = card.querySelector("[data-rw-picker]");
      if (pk) {
        card._pickerEl = pk;
        pk._ownerCard = card;
      }
      return pk;
    }

    _ensureSheetHost() {
      if (this._sheetHost && this._sheetHost.isConnected) return this._sheetHost;
      var host = document.createElement("div");
      host.className = "rw-sheet-host";
      var scrim = document.createElement("button");
      scrim.type = "button";
      scrim.className = "rw__pick-scrim";
      scrim.setAttribute("data-rw-pick-close", "");
      scrim.tabIndex = -1;
      scrim.setAttribute("aria-hidden", "true");
      host.appendChild(scrim);

      var cs = getComputedStyle(this);
      for (var i = 0; i < SHEET_PROPS.length; i++) {
        var prop = SHEET_PROPS[i];
        var val = cs.getPropertyValue(prop);
        if (val) host.style.setProperty(prop, val.trim());
      }
      host.style.fontFamily = cs.fontFamily;
      host.style.color = cs.color;

      var self = this;
      host.addEventListener("click", function (e) {
        self._handleClick(e);
      });
      host.addEventListener("keydown", function (e) {
        if (e.key === "Escape") {
          e.preventDefault();
          self._closeSheet(true);
        }
      });

      document.body.appendChild(host);
      this._sheetHost = host;
      return host;
    }

    _openDrawer(card) {
      if (!card) return;
      var drawer = this._getCardDrawer(card);
      if (!drawer) return;
      var addBtn = card.querySelector("[data-rw-add]");

      if (this._isMobile) {
        if (this._openSheetCard && this._openSheetCard !== card) {
          this._closeSheet(false);
        }
        var host = this._ensureSheetHost();
        drawer.hidden = false;
        host.appendChild(drawer);
        this._openSheetCard = card;
        this._sheetOriginBtn = addBtn;
        card.classList.add("is-picking");
        if (addBtn) addBtn.setAttribute("aria-expanded", "true");
        this.classList.add("rw--picking");
        requestAnimationFrame(function () {
          host.classList.add("is-open");
        });
      } else {
        drawer.hidden = false;
        card.classList.add("is-picking");
        if (addBtn) addBtn.setAttribute("aria-expanded", "true");
        this._revealCard(card);
      }
    }

    _closeDrawer(card, returnFocus) {
      if (!card) return;
      var drawer = this._getCardDrawer(card);
      if (!drawer) return;
      var addBtn = card.querySelector("[data-rw-add]");

      if (this._openSheetCard === card) {
        this._closeSheet(returnFocus);
        return;
      }

      drawer.hidden = true;
      card.classList.remove("is-picking");
      if (addBtn) addBtn.setAttribute("aria-expanded", "false");
      if (returnFocus && addBtn) addBtn.focus({ preventScroll: true });
    }

    _closeSheet(returnFocus) {
      var card = this._openSheetCard;
      if (!card) return;
      var drawer = this._getCardDrawer(card);
      var btn = this._sheetOriginBtn;
      this._openSheetCard = null;
      this._sheetOriginBtn = null;
      this.classList.remove("rw--picking");
      if (this._sheetHost) this._sheetHost.classList.remove("is-open");
      if (drawer) {
        drawer.hidden = true;
        card.appendChild(drawer);
      }
      card.classList.remove("is-picking");
      if (btn) btn.setAttribute("aria-expanded", "false");
      if (returnFocus && btn) btn.focus({ preventScroll: true });
    }

    _redockAllDrawers() {
      var card = this._openSheetCard;
      if (!card) return;
      var drawer = this._getCardDrawer(card);
      this._openSheetCard = null;
      this._sheetOriginBtn = null;
      this.classList.remove("rw--picking");
      if (this._sheetHost) this._sheetHost.classList.remove("is-open");
      if (drawer) {
        card.appendChild(drawer);
        drawer.hidden = false;
        card.classList.add("is-picking");
      }
    }

    _toggleDrawer(card) {
      if (!card) return;
      var drawer = this._getCardDrawer(card);
      if (!drawer) return;
      if (!drawer.hidden) this._closeDrawer(card, false);
      else this._openDrawer(card);
    }

    /* ---------- Escape Coordinator ---------- */
    handleEscape() {
      if (this._openSheetCard) {
        this._closeSheet(true);
        return true;
      }
      if (this._zoomed) {
        this._closeLightbox(true);
        return true;
      }
      return false;
    }

    /* ---------- Event Delegation & Gestures ---------- */
    _handleClick(e) {
      if (performance.now() - this._lastDragEnd < 60) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }
      var t = e.target;

      if (t.closest("[data-rw-pick-close]")) {
        this._closeSheet(true);
        return;
      }
      if (t.closest("[data-rw-zoom-close]")) {
        this._closeLightbox();
        return;
      }
      if (this._zoomed && (t === this._lb || t === this._lbStage)) {
        this._closeLightbox();
        return;
      }
      if (t.closest("[data-rw-zoom]")) {
        this._openLightbox();
        return;
      }
      if (t.closest("[data-rw-next]")) {
        if (this._zoomed) this._switchLightboxLook(this._index + 1);
        else this.next();
        return;
      }
      if (t.closest("[data-rw-prev]")) {
        if (this._zoomed) this._switchLightboxLook(this._index - 1);
        else this.prev();
        return;
      }
      var tk = t.closest("[data-rw-tick]");
      if (tk) {
        var tIdx = parseInt(tk.getAttribute("data-rw-tick"), 10) || 0;
        if (this._zoomed) this._switchLightboxLook(tIdx);
        else this.go(tIdx);
        return;
      }
      if (t.closest("[data-rw-auto]")) {
        if (!this._playing) this._engaged = false;
        this._play(!this._playing);
        return;
      }
      var pin = t.closest("[data-rw-pin]");
      if (pin) {
        this._engage();
        var pinNum = pin.getAttribute("data-rw-pin");
        this._hot(pinNum, true);
        var pnl = this._panels[this._index];
        var matchedCard = pnl && pnl.querySelector('[data-rw-card="' + pinNum + '"]');
        if (matchedCard && !this._isMobile) {
          this._openDrawer(matchedCard);
        }
        return;
      }
      var goHit = t.closest("[data-rw-go]");
      if (goHit) {
        var modelEl = goHit.closest("[data-rw-model]");
        var bodyObj = null;
        for (var i = 0; i < this._bodies.length; i++) {
          if (this._bodies[i].el === modelEl) {
            bodyObj = this._bodies[i];
            break;
          }
        }
        if (bodyObj) {
          var k = this._rankOf(bodyObj.a);
          if (k === 0) this._openLightbox();
          else if (Math.abs(k) < 6) this._moveTo(Math.round(this._target) + k);
        }
        return;
      }
      var cfm = t.closest("[data-rw-confirm]");
      if (cfm) {
        this._engage();
        var pinTarget = cfm.getAttribute("data-pin");
        if (this._openSheetCard) this._closeSheet(false);
        this._openLightbox(pinTarget);
        return;
      }
      var addBtn = t.closest("[data-rw-add]");
      if (addBtn) {
        this._engage();
        var cCard = addBtn.closest("[data-rw-card]");
        this._toggleDrawer(cCard);
        return;
      }
      var focusPiece = t.closest("[data-rw-focus-piece]");
      if (focusPiece) {
        this._engage();
        var pieceCard = focusPiece.closest("[data-rw-card]");
        if (pieceCard) {
          this._hot(pieceCard.getAttribute("data-rw-card"), false);
          this._toggleDrawer(pieceCard);
        }
        return;
      }
      var allBtn = t.closest("[data-rw-all]");
      if (allBtn) {
        this._engage();
        if (this._zoomed) {
          this._switchLightboxLook(this._index + 1);
        } else {
          this._openLightbox();
        }
      }
    }

    _bindEvents() {
      var self = this;

      this.addEventListener(
        "click",
        function (e) {
          if (performance.now() - self._lastDragEnd < 60) {
            e.preventDefault();
            e.stopPropagation();
          }
        },
        true
      );

      this.addEventListener("click", function (e) {
        if (e.target.closest(".rw__panel button, .rw__panel a")) {
          self._engage();
        }
        self._handleClick(e);
      });

      if (this._panelEl) {
        this._panelEl.addEventListener("pointerenter", function (e) {
          if (e.pointerType === "mouse") self._panelHover = true;
        });
        this._panelEl.addEventListener("pointerleave", function (e) {
          if (e.pointerType === "mouse") {
            self._panelHover = false;
            self._restartAutoBar();
          }
        });
        this._panelEl.addEventListener("pointerover", function (e) {
          if (e.pointerType !== "mouse") return;
          var card = e.target.closest("[data-rw-card]");
          if (card) self._hot(card.getAttribute("data-rw-card"), false);
        });
        this._panelEl.addEventListener("pointerout", function (e) {
          if (e.pointerType !== "mouse") return;
          var card = e.target.closest("[data-rw-card]");
          if (card && (!e.relatedTarget || !card.contains(e.relatedTarget))) {
            self._clearHot();
          }
        });
      }

      var ptr = null;
      this._stage.addEventListener("pointerdown", function (e) {
        if (self._zoomed) return;
        if (e.pointerType === "mouse" && e.button !== 0) return;
        ptr = {
          id: e.pointerId,
          type: e.pointerType,
          sx: e.clientX,
          sy: e.clientY,
          t: self._target,
          dragged: false,
          abandoned: false,
          samples: [{ x: e.clientX, time: performance.now() }],
        };
      });

      this._stage.addEventListener("pointermove", function (e) {
        if (self._cursor && e.pointerType === "mouse") {
          var sr = self._stage.getBoundingClientRect();
          self._tcx = e.clientX - sr.left;
          self._tcy = e.clientY - sr.top;
          if (!self._curActive) {
            self._cx = self._tcx;
            self._cy = self._tcy;
            self._curActive = true;
            self._cursor.style.transform =
              "translate3d(" + self._cx.toFixed(1) + "px," + self._cy.toFixed(1) + "px,0)";
            self._cursor.classList.add("is-on");
          }
          var under = e.target;
          var isView = !self._dragging && !!under.closest("[data-rw-zoom]");
          var isLink = !self._dragging && !isView && !!under.closest("[data-rw-pin], [data-rw-go]");
          self._cursor.classList.toggle("is-view", isView);
          self._cursor.classList.toggle("is-link", isLink);
          self._kickCursor();
        }

        if (!ptr || e.pointerId !== ptr.id || ptr.abandoned) return;
        if (ptr.type === "mouse" && (e.buttons & 1) === 0) {
          finishDrag(e);
          return;
        }
        var dx = e.clientX - ptr.sx;
        var dy = e.clientY - ptr.sy;

        if (!ptr.dragged) {
          if (Math.abs(dy) > 10 && Math.abs(dy) >= Math.abs(dx)) {
            ptr.abandoned = true;
            return;
          }
          if (Math.abs(dx) > 8 && Math.abs(dx) > 1.2 * Math.abs(dy)) {
            ptr.dragged = true;
            self._dragging = true;
            self.classList.add("is-dragging");
            self._setStill(false);
            try {
              self._stage.setPointerCapture(e.pointerId);
            } catch (_) {}
          }
        }

        if (ptr.dragged) {
          var now = performance.now();
          ptr.samples.push({ x: e.clientX, time: now });
          if (ptr.samples.length > 6) ptr.samples.shift();
          self._target = ptr.t - dx / (self._unit || 200);
          self._kick();
        }
      });

      function finishDrag(e) {
        if (!ptr || e.pointerId !== ptr.id) return;
        var p = ptr;
        ptr = null;
        if (!p.dragged) return;

        self._dragging = false;
        self.classList.remove("is-dragging");
        self._lastDragEnd = performance.now();
        try {
          self._stage.releasePointerCapture(p.id);
        } catch (_) {}

        var samples = p.samples;
        var first = samples[0],
          last = samples[samples.length - 1];
        var dtMs = Math.max(1, last.time - first.time);
        var vx = (last.x - first.x) / dtMs;
        var dx = last.x - p.sx;
        var sign = -1;
        var from = Math.round(p.t);

        if (self._isMobile) {
          if (Math.abs(dx) > 30 || Math.abs(vx) > 0.3) {
            self._moveTo(from + sign * (dx > 0 ? 1 : -1));
          } else {
            self._moveTo(from);
          }
        } else {
          var targetIdx = Math.round(self._target + (sign * vx * 160) / (self._unit || 200));
          if (targetIdx === from && Math.abs(vx) > 0.3) {
            targetIdx = from + sign * (vx > 0 ? 1 : -1);
          }
          targetIdx = clamp(targetIdx, from - 2, from + 2);
          self._moveTo(targetIdx);
        }
      }

      this._stage.addEventListener("pointerup", finishDrag);
      this._stage.addEventListener("pointercancel", finishDrag);

      this._stage.addEventListener("pointerleave", function () {
        if (self._cursor) {
          self._curActive = false;
          self._cursor.classList.remove("is-on", "is-link", "is-view");
        }
      });

      this._stage.addEventListener(
        "wheel",
        function (e) {
          if (self._zoomed) return;
          if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
          e.preventDefault();
          var now = performance.now();
          if (now < self._wheelLock) return;
          self._wheelAcc += e.deltaX;
          if (Math.abs(self._wheelAcc) > 45) {
            if (self._wheelAcc > 0) self.next();
            else self.prev();
            self._wheelAcc = 0;
            self._wheelLock = now + 520;
          }
        },
        { passive: false }
      );

      this._stage.addEventListener("keydown", function (e) {
        if (self._zoomed) return;
        if (e.key === "ArrowRight") {
          e.preventDefault();
          self.next();
        } else if (e.key === "ArrowLeft") {
          e.preventDefault();
          self.prev();
        }
      });

      this._onWinKeyDown = function (e) {
        if (!self.isConnected) return;
        if (self._openSheetCard) return;
        var tag = document.activeElement && document.activeElement.tagName;
        if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
        if (document.activeElement === self._stage) return;
        if (e.key === "ArrowRight") {
          e.preventDefault();
          if (self._zoomed) self._switchLightboxLook(self._index + 1);
          else self.next();
        } else if (e.key === "ArrowLeft") {
          e.preventDefault();
          if (self._zoomed) self._switchLightboxLook(self._index - 1);
          else self.prev();
        }
      };
      document.addEventListener("keydown", this._onWinKeyDown);

      this._onResize = function () {
        clearTimeout(self._resizeTimer);
        self._resizeTimer = setTimeout(function () {
          self._measure();
        }, 120);
      };
      window.addEventListener("resize", this._onResize, { passive: true });

      this._onVisChange = function () {
        if (!document.hidden && self._visible) {
          self._kick();
          if (self._playing) self._restartAutoBar();
        }
      };
      document.addEventListener("visibilitychange", this._onVisChange);
    }

    _kickCursor() {
      if (this._curRaf || !this._cursor) return;
      var self = this;
      this._curRaf = requestAnimationFrame(function step() {
        self._curRaf = 0;
        if (!self._cursor || !self._curActive) return;
        var k = isReduced() ? 1 : 0.18;
        self._cx += (self._tcx - self._cx) * k;
        self._cy += (self._tcy - self._cy) * k;
        self._cursor.style.transform =
          "translate3d(" + self._cx.toFixed(1) + "px," + self._cy.toFixed(1) + "px,0)";
        if (Math.hypot(self._tcx - self._cx, self._tcy - self._cy) > 0.2) {
          self._curRaf = requestAnimationFrame(step);
        }
      });
    }
  }

  if (!customElements.get("runway-section")) {
    customElements.define("runway-section", RunwaySection);
  }

  /* ========================================================================
     Portfolio Page Registration (Card #8 -> p7) via window.ZK3D
     ======================================================================== */
  if (window.ZK3D && typeof window.ZK3D.registerPage === "function") {
    window.ZK3D.registerPage(7, function (pg, pgb) {
      document.body.classList.add("rw-active");

      var section = null;
      var navBtns = [];
      var mL = null;
      var mR = null;

      function syncDir() {
        var lang = (window.ZK && window.ZK.lang) || "id";
        pg.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");
      }

      function onNavClick(e) {
        var act = e.currentTarget.getAttribute("data-rw-nav");
        if (act === "home" && window.zkClosePage) {
          if (section && typeof section._closeSheet === "function") section._closeSheet(false);
          window.zkClosePage();
        }
      }

      function bindLiveRefs() {
        for (var j = 0; j < navBtns.length; j++) {
          navBtns[j].removeEventListener("click", onNavClick);
        }
        section = pgb.querySelector("runway-section");
        navBtns = Array.prototype.slice.call(pgb.querySelectorAll("[data-rw-nav]"));
        for (var i = 0; i < navBtns.length; i++) {
          navBtns[i].addEventListener("click", onNavClick);
        }
        mL = pgb.querySelector("#rwMkL");
        mR = pgb.querySelector("#rwMkR");
        syncDir();
      }

      bindLiveRefs();

      // Live cursor-tracking irises on Home Mascot Head in Fashion header
      function onHeadEyeMove(e) {
        if (isReduced() || !mL || !mR) return;
        var nx = clamp((e.clientX / (window.innerWidth || 1)) * 2 - 1, -1, 1);
        var ny = clamp((e.clientY / (window.innerHeight || 1)) * 2 - 1, -1, 1);
        var dx = (nx * 24).toFixed(1);
        var dy = (ny * 12).toFixed(1);
        mL.setAttribute("transform", "translate(" + dx + " " + dy + ")");
        mR.setAttribute("transform", "translate(" + dx + " " + dy + ")");
      }
      if (isFinePointer() && !isReduced()) {
        window.addEventListener("pointermove", onHeadEyeMove, { passive: true });
      }

      function onLangChange() {
        if (!pg.classList.contains("p7") || !window.ZK_RUNWAY_DATA) return;
        var bd = pgb.querySelector(".bd");
        if (!bd) return;
        var prevIdx = section && typeof section._index === "number" ? section._index : 0;
        if (section && typeof section._closeSheet === "function") section._closeSheet(false);
        bd.innerHTML = window.ZK_RUNWAY_DATA.renderPage();
        bindLiveRefs();
        if (section) {
          section.classList.add("rw--instant", "is-revealed");
          section._startOffset = 0;
          if (prevIdx >= 0) {
            section._target = prevIdx;
            section._cur = prevIdx;
            section._setIndex(prevIdx, true);
            section._renderAll();
          }
          section._setStill(true);
          section._renderAll();
        }
      }
      window.addEventListener("zk-lang", onLangChange);

      window.__zkRunwayEscape = function () {
        if (section && typeof section.handleEscape === "function") {
          return section.handleEscape();
        }
        return false;
      };

      return function cleanup() {
        document.body.classList.remove("rw-active");
        pg.removeAttribute("dir");
        delete window.__zkRunwayEscape;
        window.removeEventListener("pointermove", onHeadEyeMove);
        window.removeEventListener("zk-lang", onLangChange);
        for (var j = 0; j < navBtns.length; j++) {
          navBtns[j].removeEventListener("click", onNavClick);
        }
        var stale = document.querySelectorAll(".rw-sheet-host");
        for (var s = 0; s < stale.length; s++) stale[s].remove();
      };
    });
  }
})();
