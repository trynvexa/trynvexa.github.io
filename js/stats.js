/* ============================================================
   stats.js — Visitor Counter (Mata) & Star / Like Button (Bintang)
   Live API via abacus.jasoncameron.dev
   ============================================================ */
(function () {
  "use strict";

  var API_BASE = "https://abacus.jasoncameron.dev";
  var NAMESPACE = "trynvexa-portfolio";
  var VIEWS_KEY = "views";
  var LIKES_KEY = "likes";

  var viewsEl = document.getElementById("statViewsVal");
  var starsEl = document.getElementById("statStarsVal");
  var starBtn = document.getElementById("statStarBtn");
  var badgeEl = document.getElementById("statsBadge");

  if (!viewsEl || !starsEl || !starBtn) return;

  // Format large numbers cleanly (e.g. 1200 -> 1.2k)
  function formatNum(n) {
    var num = parseInt(n, 10);
    if (isNaN(num) || num < 0) return "--";
    if (num >= 1000000) return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
    if (num >= 1000) return (num / 1000).toFixed(1).replace(/\.0$/, "") + "k";
    return String(num);
  }

  // Restore cached values from localStorage first for instant display
  try {
    var cachedViews = localStorage.getItem("zk_cached_views");
    var cachedLikes = localStorage.getItem("zk_cached_likes");
    if (cachedViews) viewsEl.textContent = formatNum(cachedViews);
    if (cachedLikes) starsEl.textContent = formatNum(cachedLikes);
  } catch (e) {}

  // Check if current visitor has already starred
  var isStarred = false;
  try {
    isStarred = localStorage.getItem("zk_starred") === "true";
  } catch (e) {}

  if (isStarred) {
    starBtn.classList.add("is-starred");
    starBtn.setAttribute("title", "Kamu sudah memberi bintang! Terima kasih ✨");
  }

  // Safe fetch helper with 6s timeout and graceful fallback
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
        if (!res.ok) throw new Error("HTTP " + res.status);
        return res.json();
      })
      .catch(function () {
        if (timer) clearTimeout(timer);
        return null;
      });
  }

  // 1. Manage Views (Count 1 view per session)
  function initViews() {
    var hasViewed = false;
    try {
      hasViewed = sessionStorage.getItem("zk_view_counted") === "1";
    } catch (e) {}

    var endpoint = hasViewed
      ? "/get/" + NAMESPACE + "/" + VIEWS_KEY
      : "/hit/" + NAMESPACE + "/" + VIEWS_KEY;

    apiFetch(endpoint).then(function (data) {
      if (data && typeof data.value === "number") {
        try {
          sessionStorage.setItem("zk_view_counted", "1");
          localStorage.setItem("zk_cached_views", data.value);
        } catch (e) {}
        viewsEl.textContent = formatNum(data.value);
      }
    });
  }

  // 2. Manage Likes / Stars
  function initLikes() {
    apiFetch("/get/" + NAMESPACE + "/" + LIKES_KEY).then(function (data) {
      if (data && typeof data.value === "number") {
        try {
          localStorage.setItem("zk_cached_likes", data.value);
        } catch (e) {}
        starsEl.textContent = formatNum(data.value);
      }
    });
  }

  // Particle effect on star click
  function spawnStarParticles(btn) {
    var count = 6;
    for (var i = 0; i < count; i++) {
      var p = document.createElement("span");
      p.className = "star-particle";
      p.textContent = i % 2 === 0 ? "★" : "✦";
      var angle = (Math.PI * 2 * i) / count + (Math.random() * 0.4 - 0.2);
      var dist = 22 + Math.random() * 20;
      var tx = Math.cos(angle) * dist;
      var ty = Math.sin(angle) * dist - 16; // upward bias
      p.style.setProperty("--tx", tx.toFixed(1) + "px");
      p.style.setProperty("--ty", ty.toFixed(1) + "px");
      p.style.setProperty("--dur", (0.6 + Math.random() * 0.3).toFixed(2) + "s");
      btn.appendChild(p);
      setTimeout(
        (function (el) {
          return function () {
            if (el && el.parentNode) el.parentNode.removeChild(el);
          };
        })(p),
        900
      );
    }
  }

  // Toast / feedback message
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

  // Handle star button click
  starBtn.addEventListener("click", function () {
    if (!isStarred) {
      isStarred = true;
      try {
        localStorage.setItem("zk_starred", "true");
      } catch (e) {}

      starBtn.classList.add("is-starred");
      starBtn.classList.add("pulse");
      setTimeout(function () {
        starBtn.classList.remove("pulse");
      }, 500);

      // Optimistic instant UI update
      var curVal = parseInt(starsEl.textContent.replace(/[^0-9]/g, "") || cachedLikes || "0", 10);
      var nextVal = curVal + 1;
      starsEl.textContent = formatNum(nextVal);
      try {
        localStorage.setItem("zk_cached_likes", nextVal);
      } catch (e) {}

      spawnStarParticles(starBtn);
      showToast("Terima kasih atas bintangnya! ⭐");

      // Sync with server
      apiFetch("/hit/" + NAMESPACE + "/" + LIKES_KEY).then(function (data) {
        if (data && typeof data.value === "number") {
          try {
            localStorage.setItem("zk_cached_likes", data.value);
          } catch (e) {}
          starsEl.textContent = formatNum(data.value);
        }
      });
    } else {
      // Already starred: cheer animation
      starBtn.classList.add("pulse");
      setTimeout(function () {
        starBtn.classList.remove("pulse");
      }, 400);
      spawnStarParticles(starBtn);
      showToast("Bintangmu sudah tersimpan! ✨");
    }
  });

  // Run initialization
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
