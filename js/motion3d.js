/* ============================================================
   motion3d.js — Central 3D Capability, Lifecycle & Micro-FX Engine
   Manages performance tiering (webgl | lite | reduced), Three.js readiness,
   deterministic page-level mount/cleanup, spring 3D tilt, sparks, and stamps.
   ============================================================ */
(function () {
  var isReduced =
    window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var isFine = window.matchMedia && window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  var mqDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)");

  function detectWebGL() {
    if (isReduced) return false;
    try {
      var c = document.createElement("canvas");
      var gl =
        c.getContext("webgl2") || c.getContext("webgl") || c.getContext("experimental-webgl");
      if (!gl) return false;
      var ext = gl.getExtension("WEBGL_lose_context");
      if (ext) ext.loseContext();
      return true;
    } catch (e) {
      return false;
    }
  }

  var isLowMob = window.innerWidth <= 700 && (navigator.hardwareConcurrency || 4) <= 4;
  var webglOK = detectWebGL();
  var tier = isReduced ? "reduced" : webglOK && !isLowMob ? "webgl" : "lite";

  function isDark() {
    var t = document.documentElement.getAttribute("data-theme");
    return t ? t === "dark" : !!(mqDark && mqDark.matches);
  }

  /* ---------- Three.js Readiness Queue ---------- */
  var threeQueue = [];
  var threeResolved = false;

  function hasThree() {
    return typeof window.THREE === "object" && !!window.THREE.WebGLRenderer;
  }

  function flushThree(ok) {
    if (threeResolved) return;
    threeResolved = true;
    if (!ok && tier === "webgl") tier = "lite";
    var q = threeQueue.slice();
    threeQueue.length = 0;
    q.forEach(function (fn) {
      try {
        fn(ok ? window.THREE : null);
      } catch (e) {}
    });
  }

  function whenThree(cb) {
    if (tier !== "webgl") {
      cb(null);
      return;
    }
    if (hasThree()) {
      cb(window.THREE);
      return;
    }
    if (threeResolved) {
      cb(null);
      return;
    }
    threeQueue.push(cb);
  }

  // Wait up to 3.5s for deferred Three.js script; degrade cleanly if offline
  var pollStart = performance.now();
  (function pollThree() {
    if (tier !== "webgl") {
      flushThree(false);
      return;
    }
    if (hasThree()) {
      flushThree(true);
      return;
    }
    if (performance.now() - pollStart > 3500) {
      flushThree(false);
      return;
    }
    setTimeout(pollThree, 60);
  })();
  window.addEventListener(
    "load",
    function () {
      setTimeout(function () {
        flushThree(hasThree());
      }, 200);
    },
    { once: true }
  );

  /* ---------- Page Lifecycle Registry (#pg / #pgb) ---------- */
  var pageRegistry = {};
  var activePageIdx = -1;
  var activeCleanups = [];
  var pg = document.getElementById("pg");
  var pgb = document.getElementById("pgb");

  function runCleanups() {
    var list = activeCleanups.slice();
    activeCleanups.length = 0;
    list.forEach(function (fn) {
      try {
        if (typeof fn === "function") fn();
      } catch (e) {}
    });
  }

  function getCurrentPageIdx() {
    if (!pg || pg.hidden) return -1;
    var m = pg.className.match(/\bp(\d+)\b/);
    return m ? parseInt(m[1], 10) : -1;
  }

  function mountCurrentPage() {
    var idx = getCurrentPageIdx();
    if (idx < 0 || !pgb || !pgb.children.length) {
      if (activePageIdx >= 0) {
        runCleanups();
        activePageIdx = -1;
      }
      return;
    }
    runCleanups();
    activePageIdx = idx;
    var fns = pageRegistry[idx] || [];
    fns.forEach(function (mountFn) {
      try {
        var cleanup = mountFn(pg, pgb);
        if (typeof cleanup === "function") activeCleanups.push(cleanup);
      } catch (e) {}
    });
  }

  var mountTimer = 0;
  function scheduleMount() {
    clearTimeout(mountTimer);
    mountTimer = setTimeout(mountCurrentPage, 40);
  }

  if (pg && pgb && window.MutationObserver) {
    new MutationObserver(scheduleMount).observe(pgb, { childList: true });
    new MutationObserver(function () {
      if (pg.hidden || !pg.classList.contains("open")) {
        if (pg.hidden && activePageIdx >= 0) {
          runCleanups();
          activePageIdx = -1;
        }
      } else if (activePageIdx !== getCurrentPageIdx()) {
        scheduleMount();
      }
    }).observe(pg, { attributes: true, attributeFilter: ["class", "hidden"] });
  }

  function registerPage(idx, mountFn) {
    if (!pageRegistry[idx]) pageRegistry[idx] = [];
    pageRegistry[idx].push(mountFn);
    if (activePageIdx === idx && pg && pgb && !pg.hidden) {
      try {
        var c = mountFn(pg, pgb);
        if (typeof c === "function") activeCleanups.push(c);
      } catch (e) {}
    }
  }

  /* ---------- Reusable Spring 3D Tilt + Holographic Foil ---------- */
  function attachTilt(el, opts) {
    if (!el || isReduced || !isFine) return function () {};
    opts = opts || {};
    var maxX = opts.maxX != null ? opts.maxX : 8;
    var maxY = opts.maxY != null ? opts.maxY : 10;
    var persp = opts.perspective != null ? opts.perspective : 950;
    var scale = opts.scale != null ? opts.scale : 1.02;
    var foil = opts.foil !== false;

    el.classList.add("zk-tilt3d");
    var foilEl = null;
    if (foil && !el.querySelector(":scope > .zk-holo-foil")) {
      foilEl = document.createElement("i");
      foilEl.className = "zk-holo-foil";
      foilEl.setAttribute("aria-hidden", "true");
      el.appendChild(foilEl);
    }

    var rx = 0,
      ry = 0,
      trx = 0,
      tryY = 0,
      sc = 1,
      tsc = 1,
      raf = 0;
    function step() {
      raf = 0;
      rx += (trx - rx) * 0.16;
      ry += (tryY - ry) * 0.16;
      sc += (tsc - sc) * 0.16;
      var moving =
        Math.abs(trx - rx) > 0.04 || Math.abs(tryY - ry) > 0.04 || Math.abs(tsc - sc) > 0.002;
      if (moving || tsc !== 1) {
        el.style.transform =
          "perspective(" +
          persp +
          "px) rotateX(" +
          rx.toFixed(2) +
          "deg) rotateY(" +
          ry.toFixed(2) +
          "deg) scale3d(" +
          sc.toFixed(3) +
          "," +
          sc.toFixed(3) +
          ",1)";
        if (moving) raf = requestAnimationFrame(step);
      } else {
        el.style.transform = "";
      }
    }
    function kick() {
      if (!raf) raf = requestAnimationFrame(step);
    }

    function onMove(e) {
      var r = el.getBoundingClientRect();
      if (!r.width || !r.height) return;
      var nx = Math.max(0, Math.min(1, (e.clientX - r.left) / r.width));
      var ny = Math.max(0, Math.min(1, (e.clientY - r.top) / r.height));
      trx = -(ny - 0.5) * 2 * maxX;
      tryY = (nx - 0.5) * 2 * maxY;
      tsc = scale;
      el.classList.add("is-tilting");
      el.style.setProperty("--gx", (nx * 100).toFixed(1) + "%");
      el.style.setProperty("--gy", (ny * 100).toFixed(1) + "%");
      el.style.setProperty("--ga", ((nx - 0.5) * 55).toFixed(1) + "deg");
      kick();
    }
    function onLeave() {
      trx = 0;
      tryY = 0;
      tsc = 1;
      el.classList.remove("is-tilting");
      kick();
    }

    el.addEventListener("pointermove", onMove, { passive: true });
    el.addEventListener("pointerleave", onLeave, { passive: true });

    return function () {
      if (raf) cancelAnimationFrame(raf);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      el.style.transform = "";
      el.classList.remove("is-tilting");
    };
  }

  /* ---------- Micro-Spark Particle Burst ---------- */
  function spawnSparks(x, y, color, count) {
    if (isReduced || !document.body.animate) return;
    count = count || 14;
    color = color || "#e0463a";
    for (var i = 0; i < count; i++) {
      var sp = document.createElement("i");
      sp.className = "zk-spark";
      sp.style.left = x + "px";
      sp.style.top = y + "px";
      sp.style.background = color;
      sp.style.color = color;
      document.body.appendChild(sp);
      var ang = (i / count) * Math.PI * 2 + (Math.random() - 0.5) * 0.45;
      var dist = 28 + Math.random() * 52;
      var tx = Math.cos(ang) * dist;
      var ty = Math.sin(ang) * dist - 10;
      var sz = 0.45 + Math.random() * 0.85;
      (function (node) {
        var a = node.animate(
          [
            { transform: "translate(-50%,-50%) scale(" + sz + ")", opacity: 1 },
            {
              transform:
                "translate(calc(-50% + " +
                tx.toFixed(1) +
                "px),calc(-50% + " +
                ty.toFixed(1) +
                "px)) scale(0.1)",
              opacity: 0,
            },
          ],
          {
            duration: 540 + Math.random() * 260,
            easing: "cubic-bezier(0.16, 1, 0.3, 1)",
            fill: "forwards",
          }
        );
        a.onfinish = function () {
          if (node.parentNode) node.parentNode.removeChild(node);
        };
      })(sp);
    }
  }

  /* ---------- Editorial Ink-Stamp Confirmation ---------- */
  function showStamp(text) {
    var st = document.createElement("div");
    st.className = "pr-stamp";
    st.setAttribute("aria-hidden", "true");
    st.textContent = text || "SENT ✓";
    document.body.appendChild(st);
    if (isReduced || !st.animate) {
      setTimeout(function () {
        if (st.parentNode) st.parentNode.removeChild(st);
      }, 900);
      return;
    }
    var a = st.animate(
      [
        { opacity: 0, transform: "translate(-50%, -50%) scale(2.2) rotate(-18deg)" },
        { opacity: 1, transform: "translate(-50%, -50%) scale(0.95) rotate(-7deg)", offset: 0.22 },
        { opacity: 1, transform: "translate(-50%, -50%) scale(1.02) rotate(-8deg)", offset: 0.34 },
        { opacity: 1, transform: "translate(-50%, -50%) scale(1) rotate(-8deg)", offset: 0.72 },
        { opacity: 0, transform: "translate(-50%, -62%) scale(0.92) rotate(-5deg)" },
      ],
      { duration: 1250, easing: "cubic-bezier(0.22, 1, 0.36, 1)", fill: "forwards" }
    );
    a.onfinish = function () {
      if (st.parentNode) st.parentNode.removeChild(st);
    };
  }

  window.ZK3D = {
    get tier() {
      return tier;
    },
    isReduced: isReduced,
    isFine: isFine,
    isDark: isDark,
    hasThree: hasThree,
    whenThree: whenThree,
    registerPage: registerPage,
    attachTilt: attachTilt,
    spawnSparks: spawnSparks,
    showStamp: showStamp,
  };
})();
