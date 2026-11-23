/* ============================================================
   theme.js
   ============================================================ */

/**
 * Theme Toggle (Light / Dark)
 * Manages color theme preference and meta tags
 */
(function(){
  // Theme toggle with localStorage persistence
  var themeBtn = document.getElementById('themeToggle');
  var mqDark = window.matchMedia('(prefers-color-scheme: dark)');
  try {
    var savedTheme = localStorage.getItem('zk-theme');
    if (savedTheme === 'dark' || savedTheme === 'light') {
      document.documentElement.setAttribute('data-theme', savedTheme);
    }
  } catch (e) {}
  function isDark() {
    var t = document.documentElement.getAttribute('data-theme');
    return t ? t === 'dark' : mqDark.matches;
  }
  function syncTheme() {
    if (!themeBtn) return;
    themeBtn.dataset.mode = isDark() ? 'dark' : 'light';
    var tc = document.getElementById('themeColor');
    if (tc) tc.setAttribute('content', isDark() ? '#101312' : '#eeebe2');
    themeBtn.setAttribute('aria-label', isDark() ? 'Ganti ke mode terang' : 'Ganti ke mode gelap');
  }
  if (themeBtn) {
    themeBtn.addEventListener('click', function(){
      var next = isDark() ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      try { localStorage.setItem('zk-theme', next); } catch (e) {}
      syncTheme();
    });
  }
  syncTheme();
})();
