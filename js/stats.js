/* ============================================================
   stats.js — Real-Time Visitor Counter & Star/Like System
   Live API: abacus.jasoncameron.dev
   Namespace: trynvexa.github.io
   ============================================================ */
(function () {
  "use strict";

  var API_BASE = "https://abacus.jasoncameron.dev";
  var NAMESPACE = "trynvexa.github.io";
  var VIEWS_KEY = "views";
  var STARS_KEY = "stars";

  var viewsEl = document.getElementById("statViewsVal");
  var starsEl = document.getElementById("statStarsVal");
  var starBtn = document.getElementById("statStarBtn");

  if (!viewsEl || !starsEl || !starBtn) return;

  /* ---- helpers ---- */
  function formatNum(n) {
    var num = parseInt(n, 10);
    if (isNaN(num) || num < 0) return "0";
    if (num >= 1000000) return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
    if (num >= 1000) return (num / 1000).toFixed(1).replace(/\.0$/, "") + "k";
    return String(num);
  }

  var isLocal =
    location.hostname === "localhost" ||
    location.hostname === "127.0.0.1" ||
    location.protocol === "file:" ||
    location.hostname === "";

  /* ---- cached restore for instant display ---- */
  try {
    var cv = localStorage.getItem("zk_v2_views");
    var cs = localStorage.getItem("zk_v2_stars");
    if (cv !== null) viewsEl.textContent = formatNum(cv);
    if (cs !== null) starsEl.textContent = formatNum(cs);
  } catch (e) {}

  /* ---- starred state ---- */
  var isStarred = false;
  try {
    isStarred = localStorage.getItem("zk_v2_starred") === "true";
  } catch (e) {}
  if (isStarred) {
    starBtn.classList.add("is-starred");
    starBtn.setAttribute("title", "Sudah memberi bintang");
  }

  /* ---- fetch ---- */
  function apiFetch(path) {
    var ctrl = typeof AbortController !== "undefined" ? new AbortController() : null;
    var t = ctrl
      ? setTimeout(function () {
          ctrl.abort();
        }, 6000)
      : null;
    return fetch(API_BASE + path, {
      signal: ctrl ? ctrl.signal : undefined,
      headers: { Accept: "application/json" },
    })
      .then(function (r) {
        if (t) clearTimeout(t);
        return r.json();
      })
      .then(function (d) {
        return d && typeof d.value === "number" ? d.value : 0;
      })
      .catch(function () {
        if (t) clearTimeout(t);
        return null;
      });
  }

  /* ---- views ---- */
  function initViews() {
    var seen = false;
    try {
      seen = sessionStorage.getItem("zk_v2_view_counted") === "1";
    } catch (e) {}
    var hit = !isLocal && !seen;
    apiFetch((hit ? "/hit/" : "/get/") + NAMESPACE + "/" + VIEWS_KEY).then(function (v) {
      if (typeof v !== "number") return;
      if (hit) {
        try {
          sessionStorage.setItem("zk_v2_view_counted", "1");
        } catch (e) {}
      }
      try {
        localStorage.setItem("zk_v2_views", v);
      } catch (e) {}
      viewsEl.textContent = formatNum(v);
    });
  }

  /* ---- stars/likes ---- */
  function initLikes() {
    apiFetch("/get/" + NAMESPACE + "/" + STARS_KEY).then(function (v) {
      if (typeof v !== "number") return;
      try {
        localStorage.setItem("zk_v2_stars", v);
      } catch (e) {}
      starsEl.textContent = formatNum(v);
    });
  }

  /* ---- sparkle particles ---- */
  function spawnParticles(btn) {
    for (var i = 0; i < 7; i++) {
      var p = document.createElement("span");
      p.className = "star-particle";
      p.textContent = i % 3 === 0 ? "✦" : i % 3 === 1 ? "★" : "⭐";
      var ang = (Math.PI * 2 * i) / 7 + (Math.random() * 0.5 - 0.25);
      var d = 22 + Math.random() * 20;
      p.style.setProperty("--tx", (Math.cos(ang) * d).toFixed(1) + "px");
      p.style.setProperty("--ty", (Math.sin(ang) * d - 16).toFixed(1) + "px");
      p.style.setProperty("--dur", (0.5 + Math.random() * 0.3).toFixed(2) + "s");
      btn.appendChild(p);
      setTimeout(
        (function (el) {
          return function () {
            el && el.parentNode && el.parentNode.removeChild(el);
          };
        })(p),
        850
      );
    }
  }

  /* ================================================================
     MINIMALIST GLASSMORPHISM TOAST
     - Clean frosted glass capsule
     - Mascot head SVG avatar (with eyes)
     - Plain, natural copy
  ================================================================ */
  var toastEl = null;
  var toastTimer = null;

  var HEAD_ICON_SVG =
    '<svg class="toast-avatar" viewBox="0 0 1330 1182" width="32" height="29" aria-hidden="true">' +
    "<defs>" +
    '<radialGradient id="tIr" cx=".5" cy=".45" r=".55">' +
    '<stop offset="0" stop-color="#2b2b2f"/>' +
    '<stop offset=".75" stop-color="#4a4a50"/>' +
    '<stop offset="1" stop-color="#1c1c20"/>' +
    "</radialGradient>" +
    '<clipPath id="thcL"><polygon points="473,787 535,790 585,795 640,806 662,818 618,838 570,842 520,838 485,815"/></clipPath>' +
    '<clipPath id="thcR"><polygon points="820,815 870,813 920,816 965,822 965,829 940,851 890,859 850,857 820,842 812,830"/></clipPath>' +
    "</defs>" +
    '<g clip-path="url(#thcL)">' +
    '<polygon points="473,787 535,790 585,795 640,806 662,818 618,838 570,842 520,838 485,815" fill="#fafafa"/>' +
    '<circle cx="582" cy="800" r="47" fill="url(#tIr)"/>' +
    '<circle cx="582" cy="804" r="23" fill="#0c0c0e"/>' +
    '<circle cx="592" cy="806" r="6" fill="#fff"/>' +
    '<circle cx="570" cy="819" r="3" fill="#fff" opacity=".7"/>' +
    "</g>" +
    '<g clip-path="url(#thcR)">' +
    '<polygon points="820,815 870,813 920,816 965,822 965,829 940,851 890,859 850,857 820,842 812,830" fill="#fafafa"/>' +
    '<circle cx="872" cy="819" r="41" fill="url(#tIr)"/>' +
    '<circle cx="872" cy="823" r="20" fill="#0c0c0e"/>' +
    '<circle cx="881" cy="824" r="5" fill="#fff"/>' +
    '<circle cx="862" cy="835" r="2" fill="#fff" opacity=".7"/>' +
    "</g>" +
    '<image href="assets/images/mascot-head.webp" width="1330" height="1182"/>' +
    "</svg>";

  function getToast() {
    if (!toastEl) {
      toastEl = document.createElement("div");
      toastEl.id = "statToast";
      toastEl.className = "stat-toast";
      toastEl.setAttribute("role", "status");
      toastEl.setAttribute("aria-live", "polite");
      document.body.appendChild(toastEl);
    }
    return toastEl;
  }

  function hideToast() {
    if (!toastEl) return;
    toastEl.classList.remove("show");
    toastEl.classList.add("hide");
    clearTimeout(toastTimer);
  }

  /**
   * @param {string} text — simple, natural message
   * @param {number} [dur] — duration in ms (default 3400)
   */
  function showToast(text, dur) {
    dur = dur || 3400;
    var toast = getToast();

    toast.className = "stat-toast";
    toast.innerHTML =
      '<div class="toast-pill">' +
      HEAD_ICON_SVG +
      '<span class="toast-text">' +
      text +
      "</span>" +
      "</div>";

    toast.onclick = function () {
      hideToast();
    };

    clearTimeout(toastTimer);
    void toast.offsetWidth;
    toast.classList.remove("hide");
    toast.classList.add("show");

    toastTimer = setTimeout(function () {
      hideToast();
    }, dur);
  }

  /* ---- welcome toast on intro done ---- */
  function triggerWelcome() {
    try {
      if (sessionStorage.getItem("zk_welcomed") === "1") return;
      sessionStorage.setItem("zk_welcomed", "1");
    } catch (e) {}
    setTimeout(function () {
      showToast("Halo, selamat datang.", 3400);
    }, 650);
  }

  /* ---- star button ---- */
  starBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    if (!isStarred) {
      isStarred = true;
      try {
        localStorage.setItem("zk_v2_starred", "true");
      } catch (e) {}
      starBtn.classList.add("is-starred", "pulse");
      setTimeout(function () {
        starBtn.classList.remove("pulse");
      }, 500);

      var cur = parseInt(starsEl.textContent.replace(/[^0-9]/g, "") || "0", 10);
      starsEl.textContent = formatNum(cur + 1);
      try {
        localStorage.setItem("zk_v2_stars", cur + 1);
      } catch (e) {}

      spawnParticles(starBtn);
      showToast("Terima kasih atas bintangnya.", 3200);

      apiFetch("/hit/" + NAMESPACE + "/" + STARS_KEY).then(function (v) {
        if (typeof v !== "number") return;
        try {
          localStorage.setItem("zk_v2_stars", v);
        } catch (e) {}
        starsEl.textContent = formatNum(v);
      });
    } else {
      starBtn.classList.add("pulse");
      setTimeout(function () {
        starBtn.classList.remove("pulse");
      }, 400);
      spawnParticles(starBtn);
      showToast("Sudah diberi bintang, terima kasih.", 3000);
    }
  });

  /* ---- init on load ---- */
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      initViews();
      initLikes();
    });
  } else {
    initViews();
    initLikes();
  }

  /* ---- welcome trigger ---- */
  if (document.documentElement.classList.contains("intro-on")) {
    document.addEventListener("introdone", triggerWelcome, { once: true });
  } else if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", triggerWelcome);
  } else {
    triggerWelcome();
  }
})();
