/* ============================================================
   mascot.js
   ============================================================ */

/**
 * Mascot Eye Follower (Ultra-Light 60fps Edition)
 * Zero layout thrashing: caches bounds on resize and pauses when covered/idle.
 */
(function () {
  var m = document.getElementById("mascot");
  if (!m) return;
  var IL = document.getElementById("mkIL"),
    IR = document.getElementById("mkIR"),
    H = document.getElementById("mkHead");
  var tx = 0,
    ty = 0,
    x = 0,
    y = 0,
    last = -1e9,
    nextIdle = 0;
  var reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) {
    [].forEach.call(m.querySelectorAll("animate,animateTransform"), function (n) {
      n.remove();
    });
    return;
  }

  var mCx = innerWidth * 0.9,
    mCy = 48,
    vw = innerWidth,
    vh = innerHeight;
  function updateRect() {
    vw = innerWidth || 1;
    vh = innerHeight || 1;
    var r = m.getBoundingClientRect();
    if (r.width > 0) {
      mCx = r.left + r.width * 0.5;
      mCy = r.top + r.height * 0.5;
    }
  }
  updateRect();
  addEventListener("resize", updateRect, { passive: true });
  document.addEventListener("introdone", updateRect, { once: true });

  function aim(e) {
    last = performance.now();
    tx = Math.max(-1, Math.min(1, (e.clientX - mCx) / (vw * 0.4)));
    ty = Math.max(-1, Math.min(1, (e.clientY - mCy) / (vh * 0.4)));
  }
  addEventListener("pointermove", aim, { passive: true });
  addEventListener("pointerdown", aim, { passive: true });

  var prevX = 999,
    prevY = 999,
    pgEl = document.getElementById("pg"),
    lastM = 0;
  function f(t) {
    requestAnimationFrame(f);
    if (
      document.hidden ||
      document.documentElement.classList.contains("intro-on") ||
      document.body.classList.contains("covered") ||
      (pgEl && pgEl.classList.contains("open")) ||
      t - lastM < 32
    ) {
      return;
    }
    lastM = t;
    if (t - last > 2400 && t > nextIdle) {
      tx = Math.random() * 2 - 1;
      ty = Math.random() * 1.4 - 0.7;
      nextIdle = t + 1100 + Math.random() * 1800;
    }
    x += (tx - x) * 0.2;
    y += (ty - y) * 0.2;
    if (Math.abs(x - prevX) > 0.002 || Math.abs(y - prevY) > 0.002) {
      prevX = x;
      prevY = y;
      IL.setAttribute(
        "transform",
        "translate(" + (x * 30).toFixed(1) + " " + (y * 14).toFixed(1) + ")"
      );
      IR.setAttribute(
        "transform",
        "translate(" + (x * 26).toFixed(1) + " " + (y * 12).toFixed(1) + ")"
      );
      H.setAttribute(
        "transform",
        "translate(" +
          (x * 14).toFixed(1) +
          " " +
          (y * 8).toFixed(1) +
          ") rotate(" +
          (x * 2.5).toFixed(2) +
          " 665 950)"
      );
    }
  }
  requestAnimationFrame(f);
})();
