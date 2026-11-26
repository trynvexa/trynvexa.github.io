/* ============================================================
   clock.js
   ============================================================ */

/**
 * Live Clock (WIB / Asia-Jakarta)
 * Updates the time badge in header
 */
(function () {
  var el = document.getElementById("clkT");
  if (!el) return;
  var f;
  try {
    f = new Intl.DateTimeFormat("id-ID", {
      timeZone: "Asia/Jakarta",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  } catch (e) {
    return;
  }
  function tk() {
    el.textContent = f.format(new Date()).replace(":", ".");
  }
  tk();
  setInterval(tk, 60000);
})();
