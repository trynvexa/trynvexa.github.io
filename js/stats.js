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

  // Format numbers (e.g. 1200 -> 1.2k, 0 -> 0)
  function formatNum(n) {
    var num = parseInt(n, 10);
    if (isNaN(num) || num < 0) return "0";
    if (num >= 1000000) return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
    if (num >= 1000) return (num / 1000).toFixed(1).replace(/\.0$/, "") + "k";
    return String(num);
  }

  // Check if we are running in local development mode
  var isLocal =
    location.hostname === "localhost" ||
    location.hostname === "127.0.0.1" ||
    location.protocol === "file:" ||
    location.hostname === "";

  // Restore cached values from localStorage for instant smooth render
  try {
    var cachedViews = localStorage.getItem("zk_v2_views");
    var cachedStars = localStorage.getItem("zk_v2_stars");
    if (cachedViews !== null) viewsEl.textContent = formatNum(cachedViews);
    if (cachedStars !== null) starsEl.textContent = formatNum(cachedStars);
  } catch (e) {}

  // Check if visitor has already given a star
  var isStarred = false;
  try {
    isStarred = localStorage.getItem("zk_v2_starred") === "true";
  } catch (e) {}

  if (isStarred) {
    starBtn.classList.add("is-starred");
    starBtn.setAttribute("title", "Kamu sudah memberi bintang! Terima kasih ✨");
  }

  // Safe fetch helper with timeout and error handling
  function apiFetch(path) {
    var ctrl = typeof AbortController !== "undefined" ? new AbortController() : null;
    var timer = ctrl
      ? setTimeout(function () {
          ctrl.abort();
        }, 6000)
      : null;
    return fetch(API_BASE + path, {
      signal: ctrl ? ctrl.signal : undefined,
      headers: { Accept: "application/json" },
    })
      .then(function (res) {
        if (timer) clearTimeout(timer);
        return res.json();
      })
      .then(function (data) {
        if (data && typeof data.value === "number") return data.value;
        return 0; // default to 0 if key not found yet
      })
      .catch(function () {
        if (timer) clearTimeout(timer);
        return null;
      });
  }

  // 1. Manage Views: Real visitor gets +1; local dev and repeated refreshes do not increment
  function initViews() {
    var hasViewed = false;
    try {
      hasViewed = sessionStorage.getItem("zk_v2_view_counted") === "1";
    } catch (e) {}

    // In local dev, NEVER call /hit so developer testing won't increment the counter.
    // In production, call /hit once per session.
    var shouldHit = !isLocal && !hasViewed;
    var endpoint = shouldHit
      ? "/hit/" + NAMESPACE + "/" + VIEWS_KEY
      : "/get/" + NAMESPACE + "/" + VIEWS_KEY;

    apiFetch(endpoint).then(function (val) {
      if (typeof val === "number") {
        if (shouldHit) {
          try {
            sessionStorage.setItem("zk_v2_view_counted", "1");
          } catch (e) {}
        }
        try {
          localStorage.setItem("zk_v2_views", val);
        } catch (e) {}
        viewsEl.textContent = formatNum(val);
      }
    });
  }

  // 2. Manage Likes / Stars: Fetch global star count
  function initLikes() {
    apiFetch("/get/" + NAMESPACE + "/" + STARS_KEY).then(function (val) {
      if (typeof val === "number") {
        try {
          localStorage.setItem("zk_v2_stars", val);
        } catch (e) {}
        starsEl.textContent = formatNum(val);
      }
    });
  }

  // Sparkles particle animation on star click
  function spawnStarParticles(btn) {
    var count = 6;
    for (var i = 0; i < count; i++) {
      var p = document.createElement("span");
      p.className = "star-particle";
      p.textContent = i % 2 === 0 ? "★" : "✦";
      var angle = (Math.PI * 2 * i) / count + (Math.random() * 0.4 - 0.2);
      var dist = 20 + Math.random() * 18;
      var tx = Math.cos(angle) * dist;
      var ty = Math.sin(angle) * dist - 14;
      p.style.setProperty("--tx", tx.toFixed(1) + "px");
      p.style.setProperty("--ty", ty.toFixed(1) + "px");
      p.style.setProperty("--dur", (0.55 + Math.random() * 0.25).toFixed(2) + "s");
      btn.appendChild(p);
      setTimeout(
        (function (el) {
          return function () {
            if (el && el.parentNode) el.parentNode.removeChild(el);
          };
        })(p),
        850
      );
    }
  }

  // Toast feedback notification
  var toastTimer = null;
  function showToast(msg) {
    var toast = document.getElementById("statToast");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "statToast";
      toast.className = "stat-toast";
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toast.classList.remove("show");
    }, 2400);
  }

  // Handle star button interaction
  starBtn.addEventListener("click", function (e) {
    e.stopPropagation();

    if (!isStarred) {
      isStarred = true;
      try {
        localStorage.setItem("zk_v2_starred", "true");
      } catch (e) {}

      starBtn.classList.add("is-starred");
      starBtn.classList.add("pulse");
      setTimeout(function () {
        starBtn.classList.remove("pulse");
      }, 500);

      // Instant optimistic UI update
      var curVal = parseInt(starsEl.textContent.replace(/[^0-9]/g, "") || "0", 10);
      var nextVal = curVal + 1;
      starsEl.textContent = formatNum(nextVal);
      try {
        localStorage.setItem("zk_v2_stars", nextVal);
      } catch (e) {}

      spawnStarParticles(starBtn);
      showToast("Terima kasih atas bintangnya! ⭐");

      // Persist to server
      apiFetch("/hit/" + NAMESPACE + "/" + STARS_KEY).then(function (val) {
        if (typeof val === "number") {
          try {
            localStorage.setItem("zk_v2_stars", val);
          } catch (e) {}
          starsEl.textContent = formatNum(val);
        }
      });
    } else {
      // Already starred: cheerful pulse
      starBtn.classList.add("pulse");
      setTimeout(function () {
        starBtn.classList.remove("pulse");
      }, 400);
      spawnStarParticles(starBtn);
      showToast("Bintangmu sudah tersimpan! ✨");
    }
  });

  // Run on load
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      initViews();
      initLikes();
    });
  } else {
    initViews();
    initLikes();
  }
})();
