/* ============================================================
   theme.js
   ============================================================ */

/**
 * Theme Toggle (Light / Dark)
 * Manages color theme preference and meta tags
 */
(function () {
  // Theme toggle with localStorage persistence
  var themeBtn = document.getElementById("themeToggle");
  var mqDark = window.matchMedia("(prefers-color-scheme: dark)");
  try {
    var savedTheme = localStorage.getItem("zk-theme");
    if (savedTheme === "dark" || savedTheme === "light") {
      document.documentElement.setAttribute("data-theme", savedTheme);
    }
  } catch (e) {}
  function isDark() {
    var t = document.documentElement.getAttribute("data-theme");
    return t ? t === "dark" : mqDark.matches;
  }
  function syncTheme() {
    if (!themeBtn) return;
    var dark = isDark();
    var isJa = document.documentElement.lang === "ja";
    themeBtn.dataset.mode = dark ? "dark" : "light";
    var tc = document.getElementById("themeColor");
    if (tc) {
      tc.setAttribute("content", isJa ? (dark ? "#0c0c0f" : "#f4efe4") : dark ? "#090a0d" : "#eeebe2");
    }
    themeBtn.setAttribute("aria-label", dark ? "Ganti ke mode terang" : "Ganti ke mode gelap");
  }
  window.addEventListener("zk-lang", syncTheme);
  function applyTheme(next) {
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("zk-theme", next);
    } catch (e) {}
    syncTheme();
    try {
      window.dispatchEvent(new CustomEvent("zk-theme", { detail: { theme: next } }));
    } catch (e) {}
  }
  if (themeBtn) {
    themeBtn.addEventListener("click", function () {
      var next = isDark() ? "light" : "dark";
      var reduce =
        window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (!reduce && typeof document.startViewTransition === "function") {
        var r = themeBtn.getBoundingClientRect();
        var x = r.left + r.width * 0.5;
        var y = r.top + r.height * 0.5;
        var maxR = Math.hypot(
          Math.max(x, window.innerWidth - x),
          Math.max(y, window.innerHeight - y)
        );
        var rootStyle = document.documentElement.style;
        rootStyle.setProperty("--vt-x", x.toFixed(1) + "px");
        rootStyle.setProperty("--vt-y", y.toFixed(1) + "px");
        rootStyle.setProperty("--vt-r", maxR.toFixed(1) + "px");
        try {
          var vt = document.startViewTransition(function () {
            applyTheme(next);
          });
          if (vt && vt.ready && vt.ready.catch) vt.ready.catch(function () {});
          if (vt && vt.finished && vt.finished.catch) vt.finished.catch(function () {});
          if (vt && vt.updateCallbackDone && vt.updateCallbackDone.catch)
            vt.updateCallbackDone.catch(function () {});
          return;
        } catch (e) {}
      }
      applyTheme(next);
    });
  }
  syncTheme();
})();
