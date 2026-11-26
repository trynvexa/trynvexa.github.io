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
    starBtn.setAttribute("title", "Kamu sudah memberi bintang! Terima kasih ✨");
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
     LUXURY TOAST SYSTEM — Dynamic Island / Premium Capsule
     - Frosted porcelain / obsidian glass (no pure black)
     - Animated 3D-effect icon badge with glowing ambience
     - Shimmer light sweep, uppercase category tag, bold headline
     - Interactive close button + animated gradient progress bar
     - Spring bounce entrance (cubic-bezier)
  ================================================================ */
  var toastEl = null;
  var toastTimer = null;
  var toastProgressAnim = null;

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
    if (toastProgressAnim) {
      toastProgressAnim.cancel && toastProgressAnim.cancel();
      toastProgressAnim = null;
    }
  }

  /**
   * @param {object} opts
   * @param {string}  opts.tag      — category tag e.g. "BINTANG BARU ⭐"
   * @param {string}  opts.icon     — emoji displayed in the squircle
   * @param {string}  opts.title    — punchy bold headline
   * @param {string}  opts.sub      — charming message subtitle
   * @param {string}  [opts.type]   — "star" | "welcome" | "already"
   * @param {number}  [opts.dur]    — display duration ms (default 4000)
   */
  function showToast(opts) {
    var dur = opts.dur || 4000;
    var toast = getToast();

    /* reset classes */
    toast.className = "stat-toast" + (opts.type ? " " + opts.type : "");

    /* build inner HTML */
    var iconHtml =
      '<div class="toast-icon-wrap">' +
      '<div class="toast-icon">' +
      opts.icon +
      "</div>" +
      '<div class="toast-icon-glow"></div>' +
      "</div>";

    var contentHtml =
      '<div class="toast-content">' +
      '<div class="toast-meta">' +
      '<span class="toast-tag">' +
      (opts.tag || "Notifikasi") +
      "</span>" +
      '<span class="toast-dot">•</span>' +
      '<span class="toast-time">baru saja</span>' +
      "</div>" +
      '<div class="toast-title">' +
      opts.title +
      "</div>" +
      (opts.sub ? '<div class="toast-sub">' + opts.sub + "</div>" : "") +
      "</div>";

    var closeBtnHtml =
      '<button class="toast-close" type="button" aria-label="Tutup">' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">' +
      '<line x1="18" y1="6" x2="6" y2="18"></line>' +
      '<line x1="6" y1="6" x2="18" y2="18"></line>' +
      "</svg>" +
      "</button>";

    var progressHtml =
      '<div class="toast-progress-track">' + '<div class="toast-progress-bar"></div>' + "</div>";

    toast.innerHTML =
      '<div class="toast-card">' +
      '<div class="toast-shimmer"></div>' +
      '<div class="toast-inner">' +
      iconHtml +
      contentHtml +
      closeBtnHtml +
      "</div>" +
      progressHtml +
      "</div>";

    /* attach close button click */
    var closeBtn = toast.querySelector(".toast-close");
    if (closeBtn) {
      closeBtn.onclick = function (e) {
        e.stopPropagation();
        hideToast();
      };
    }

    /* clear existing timers */
    clearTimeout(toastTimer);
    if (toastProgressAnim) {
      toastProgressAnim.cancel && toastProgressAnim.cancel();
      toastProgressAnim = null;
    }

    /* trigger reflow for smooth animation entry */
    void toast.offsetWidth;
    toast.classList.remove("hide");
    toast.classList.add("show");

    /* animate progress bar draining */
    var bar = toast.querySelector(".toast-progress-bar");
    if (bar && bar.animate) {
      toastProgressAnim = bar.animate([{ transform: "scaleX(1)" }, { transform: "scaleX(0)" }], {
        duration: dur,
        easing: "linear",
        fill: "forwards",
      });
    }

    /* auto-hide after dur */
    toastTimer = setTimeout(function () {
      hideToast();
    }, dur);
  }

  /* ---- cute & cheerful message banks ---- */
  var starMsgs = [
    {
      tag: "Bintang Diterima ⭐",
      icon: "⭐",
      title: "Makasih Bintangnya! 💖",
      sub: "Bikin Zikri senyum 7 hari 7 malam nih 😆",
    },
    {
      tag: "Auto Semangat 🔥",
      icon: "🚀",
      title: "Yeay, Dapat Bintang! ✨",
      sub: "Zikri langsung auto semangat ngoding sampai subuh!",
    },
    {
      tag: "Hati Berbunga 🌸",
      icon: "🌸",
      title: "Aww, Hati Meleleh! 💫",
      sub: "Apresiasi darimu bikin hari Zikri jadi luar biasa!",
    },
    {
      tag: "Tamu Spesial 😎",
      icon: "😎",
      title: "Resmi Masuk VIP Zikri! 🎉",
      sub: "Daftar orang paling keren hari ini bertambah 1!",
    },
    {
      tag: "Terima Kasih Banyak 🥰",
      icon: "🥰",
      title: "Bintang Paling Bermakna ✨",
      sub: "Makasih udah luangin waktu apresiasi karya ini yaa!",
    },
  ];

  var alreadyMsgs = [
    {
      tag: "Bintangmu Aman 💛",
      icon: "💛",
      title: "Bintangmu Udah Tersimpan ✨",
      sub: "Aman di hati Zikri selamanya, makasih banyaak!",
    },
    {
      tag: "Apresiasi Hangat 🤗",
      icon: "🤗",
      title: "Kamu Sudah Beri Bintang! 💫",
      sub: "Satu bintang darimu udah bikin Zikri bahagia banget!",
    },
    {
      tag: "Bintang Spesial 🌟",
      icon: "🌟",
      title: "Bintangmu Selalu Bersinar 💖",
      sub: "Terima kasih banyak atas dukungannya yaa!",
    },
  ];

  function pick(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  /* ---- welcome toast on intro done ---- */
  function triggerWelcome() {
    try {
      if (sessionStorage.getItem("zk_welcomed") === "1") return;
      sessionStorage.setItem("zk_welcomed", "1");
    } catch (e) {}
    setTimeout(function () {
      showToast({
        tag: "Selamat Datang 👋",
        icon: "👋",
        title: "Halo! Senang Kamu Mampir ✨",
        sub: "Ini Ruang Karya Zikri — silakan jelajahi & nikmati!",
        type: "welcome",
        dur: 4400,
      });
    }, 700);
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
      var m = pick(starMsgs);
      showToast({
        tag: m.tag,
        icon: m.icon,
        title: m.title,
        sub: m.sub,
        type: "star",
        dur: 4200,
      });

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
      var am = pick(alreadyMsgs);
      showToast({
        tag: am.tag,
        icon: am.icon,
        title: am.title,
        sub: am.sub,
        type: "already",
        dur: 3800,
      });
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
