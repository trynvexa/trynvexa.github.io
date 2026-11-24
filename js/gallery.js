/* ============================================================
   gallery.js
   ============================================================ */

/**
 * 3D Circular Frame Gallery & Fullscreen Lightbox
 * 3D cylindrical card placement, inertia fling physics, tilt parallax,
 * and high-performance FLIP-animated lightbox.
 */
/* Galeri Foto: lightbox minimalis (geser, tarik ke bawah, panah, Esc) */
(function(){
  var pgb = document.getElementById('pgb'); if (!pgb) return;
  var rm = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var dr = null, dragMoved = false;
  var EASE = 'cubic-bezier(.22,1,.36,1)';
  var svgX = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>';
  var svgL = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg>';
  var svgR = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7"/></svg>';
  var box = document.createElement('div');
  box.className = 'lbx'; box.setAttribute('role', 'dialog'); box.setAttribute('aria-modal', 'true');
  box.setAttribute('aria-label', 'Pratinjau foto'); box.setAttribute('aria-hidden', 'true');
  box.innerHTML = '<div class="lbx-top"><span class="lbx-n"></span><button type="button" class="lbx-x" aria-label="Tutup foto">' + svgX + '</button></div>' +
    '<div class="lbx-stage"><button type="button" class="lbx-a prev" aria-label="Foto sebelumnya">' + svgL + '</button>' +
    '<img class="lbx-img" alt="" draggable="false">' +
    '<button type="button" class="lbx-a next" aria-label="Foto berikutnya">' + svgR + '</button></div>';
  document.body.appendChild(box);
  var im = box.querySelector('.lbx-img'), nEl = box.querySelector('.lbx-n'), xBtn = box.querySelector('.lbx-x'),
      pBtn = box.querySelector('.prev'), nBtn = box.querySelector('.next');
  var thumbs = [], idx = 0, isOpen = false, lastFocus = null;
  function pad(n) { return (n < 10 ? '0' : '') + n; }

  function flipFrom(t) {
    var to = im.getBoundingClientRect(), tr = t.getBoundingClientRect();
    if (!to.width || !tr.width) return null;
    var s = Math.max(tr.width / to.width, tr.height / to.height);
    var ix = Math.max(0, (to.width - tr.width / s) / 2), iy = Math.max(0, (to.height - tr.height / s) / 2);
    return { tf: 'translate(' + ((tr.left + tr.width / 2) - (to.left + to.width / 2)) + 'px,' + ((tr.top + tr.height / 2) - (to.top + to.height / 2)) + 'px) scale(' + s + ')',
             cp: 'inset(' + iy + 'px ' + ix + 'px round ' + (22 / s) + 'px)' };
  }
  function show(i, dir, first) {
    var t = thumbs[i], src = (window.GAL_FULL && window.GAL_FULL[i]) || t.getAttribute('data-src') || t.querySelector('img').src;
    var rawAlt = 'Foto ' + (i + 1);
    im.src = src; im.alt = (window.ZK && ZK.t && ZK.t(rawAlt, ZK.lang)) || rawAlt;
    nEl.textContent = pad(i + 1) + ' / ' + pad(thumbs.length);
    var ready = im.decode ? im.decode() : Promise.resolve();
    ready.catch(function(){}).then(function(){
      if (rm) return;
      if (first) {
        var f = flipFrom(t);
        if (f) im.animate([{ transform: f.tf, clipPath: f.cp }, { transform: 'none', clipPath: 'inset(0px round 4px)' }], { duration: 600, easing: EASE });
      } else {
        im.animate([{ opacity: 0, transform: 'translateX(' + (dir * 44) + 'px)' }, { opacity: 1, transform: 'none' }], { duration: 340, easing: EASE });
      }
    });
  }
  function open(i, list) {
    thumbs = list ? [].slice.call(list) : [].slice.call(pgb.querySelectorAll('.gc'));
    if (!thumbs.length) return;
    idx = i; isOpen = true; lastFocus = document.activeElement;
    box.style.removeProperty('--a'); im.style.transform = '';
    box.classList.add('on'); box.setAttribute('aria-hidden', 'false');
    show(i, 0, true);
    xBtn.focus({ preventScroll: true });
  }
  function close() {
    if (!isOpen) return;
    isOpen = false;
    var t = thumbs[idx];
    try {
      var r0 = t.getBoundingClientRect();
      if (r0.left < 0 || r0.right > innerWidth) t.scrollIntoView({ inline: 'center', block: 'nearest' });
    } catch (_) {}
    if (!rm) {
      var cs = im.style.transform; im.style.transform = '';
      var f = flipFrom(t), tr = t.getBoundingClientRect();
      if (f && tr.right > 0 && tr.left < innerWidth && tr.bottom > 0 && tr.top < innerHeight) {
        im.animate([{ transform: cs || 'none', clipPath: 'inset(0px round 4px)' }, { transform: f.tf, clipPath: f.cp }], { duration: 440, easing: EASE });
      }
    }
    box.classList.remove('on'); box.setAttribute('aria-hidden', 'true');
    box.style.removeProperty('--a');
    setTimeout(function(){ if (!isOpen) im.style.transform = ''; }, 420);
    if (lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
    try { window.dispatchEvent(new CustomEvent('galclose', { detail: idx })); } catch (_) {}
  }
  function go(d) {
    if (thumbs.length < 2) return;
    idx = (idx + d + thumbs.length) % thumbs.length;
    im.style.transform = '';
    show(idx, d, false);
  }

  pgb.addEventListener('click', function(e){
    if (dragMoved) return;
    var b = e.target.closest('.gc'); if (!b) return;
    open(parseInt(b.getAttribute('data-i'), 10) || 0);
  });

  function cardsOf(r) { return [].slice.call(r.querySelectorAll('.gc')); }
  function padL(r) { return parseFloat(getComputedStyle(r).paddingLeft) || 0; }
  function activeIdx(r) {
    var c = cardsOf(r), p = padL(r), best = 0, bd = 1e9;
    if (r.scrollLeft >= r.scrollWidth - r.clientWidth - 2) return c.length - 1;
    c.forEach(function(el, i){ var d = Math.abs(el.offsetLeft - p - r.scrollLeft); if (d < bd) { bd = d; best = i; } });
    return best;
  }
  function toCard(r, i, smooth) {
    var c = cardsOf(r); i = Math.max(0, Math.min(c.length - 1, i));
    r.scrollTo({ left: c[i].offsetLeft - padL(r), behavior: smooth ? 'smooth' : 'auto' });
  }
  pgb.addEventListener('scroll', function(e){
    var r = e.target; if (!r.classList || !r.classList.contains('rail')) return;
    var a = activeIdx(r), bar = pgb.querySelectorAll('.rail-p i');
    [].forEach.call(bar, function(el, i){ el.classList.toggle('on', i === a); });
  }, true);
  pgb.addEventListener('click', function(e){
    var ar = e.target.closest('.rail-a'); if (!ar) return;
    var r = pgb.querySelector('.rail'); if (!r) return;
    toCard(r, activeIdx(r) + parseInt(ar.getAttribute('data-d'), 10), !rm);
  });
  pgb.addEventListener('pointerdown', function(e){
    var r = e.target.closest('.rail');
    if (!r || e.pointerType !== 'mouse' || e.button !== 0) return;
    dr = { r: r, x: e.clientX, l: r.scrollLeft }; dragMoved = false;
  });
  window.addEventListener('pointermove', function(e){
    if (!dr) return;
    var dx = e.clientX - dr.x;
    if (!dragMoved && Math.abs(dx) > 5) { dragMoved = true; dr.r.classList.add('drag'); }
    if (dragMoved) dr.r.scrollLeft = dr.l - dx;
  });
  window.addEventListener('pointerup', function(){
    if (!dr) return;
    var r = dr.r, moved = dragMoved; dr = null;
    if (moved) { r.classList.remove('drag'); toCard(r, activeIdx(r), !rm); setTimeout(function(){ dragMoved = false; }, 0); }
  });
  xBtn.addEventListener('click', close);
  pBtn.addEventListener('click', function(){ go(-1); });
  nBtn.addEventListener('click', function(){ go(1); });

  window.addEventListener('keydown', function(e){
    if (!isOpen) return;
    var k = e.key;
    if (k === 'Escape') close();
    else if (k === 'ArrowLeft') go(-1);
    else if (k === 'ArrowRight') go(1);
    else if (k === 'Tab') {
      var f = [xBtn, pBtn, nBtn].filter(function(b){ return b.offsetParent !== null; }), cur = f.indexOf(document.activeElement);
      f[(cur + (e.shiftKey ? -1 : 1) + f.length) % f.length].focus();
    } else return;
    e.preventDefault(); e.stopImmediatePropagation();
  }, true);

  var sx = 0, sy = 0, dx = 0, dy = 0, drag = false, axis = '', downT = null;
  box.addEventListener('pointerdown', function(e){
    if (!isOpen || e.target.closest('button')) return;
    drag = true; axis = ''; sx = e.clientX; sy = e.clientY; dx = dy = 0; downT = e.target;
    try { box.setPointerCapture(e.pointerId); } catch (_) {}
  });
  box.addEventListener('pointermove', function(e){
    if (!drag) return;
    dx = e.clientX - sx; dy = e.clientY - sy;
    if (!axis && Math.max(Math.abs(dx), Math.abs(dy)) > 8) axis = Math.abs(dx) > Math.abs(dy) ? 'x' : 'y';
    if (axis === 'x') im.style.transform = 'translateX(' + dx + 'px)';
    else if (axis === 'y') {
      var p = Math.min(Math.abs(dy) / 420, 1);
      im.style.transform = 'translateY(' + dy + 'px) scale(' + (1 - p * .12) + ')';
      box.style.setProperty('--a', (1 - p * .7).toFixed(3));
    }
  });
  function end(e) {
    if (!drag) return; drag = false;
    var t = im.style.transform;
    if (axis === 'x' && Math.abs(dx) > 60) { go(dx < 0 ? 1 : -1); return; }
    if (axis === 'y' && dy > 90) { close(); return; }
    if (!axis && e && e.type === 'pointerup' && downT && !downT.closest('.lbx-img')) { close(); return; }
    if (axis) {
      if (!rm && t) im.animate([{ transform: t }, { transform: 'none' }], { duration: 320, easing: EASE });
      im.style.transform = ''; box.style.removeProperty('--a');
    }
  }
  box.addEventListener('pointerup', end);
  box.addEventListener('pointercancel', end);
  window.galOpen = open;
})();

/* Galeri Foto: cincin kartu mengelilingi potret
   - ketuk kartu: meluncur ke depan & membesar; ketuk lagi: lightbox layar penuh
   - parallax kursor (desktop) / kemiringan HP, berhenti pas di satu kartu + penanda "03 / 08"
   - animasi masuk: kartu keluar dari belakang kepala lalu menyebar jadi cincin */
(function(){
  var pgb = document.getElementById('pgb'); if (!pgb) return;
  var rm = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var TAU = Math.PI * 2, OFF = .39;
  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }
  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function ease(t) { t = clamp(t, 0, 1); return 1 - Math.pow(1 - t, 3); }
  function lbOpen() { return !!document.querySelector('.lbx.on'); }

  function setup(st) {
    if (st._on) return; st._on = true;
    var ks = [].slice.call(st.querySelectorAll('.gk')), N = ks.length; if (!N) return;
    var port = st.querySelector('.gport'), ttl = st.querySelector('.gtitle');
    var idxB = st.querySelector('.gidx b'), idxS = st.querySelector('.gidx span');
    var step = TAU / N;
    if (idxS) idxS.textContent = pad(N);

    var rot = -OFF, rotT = -OFF, vel = 0, drag = false, lx = 0, sx = 0, sy = 0, moved = 0, downT = 0;
    var fling = 0, held = 0, lm = 0, FLING_MIN = 4, FLING_MAX = 18, FRICTION = .5, FLING_END = 1.5; // putaran bebas: rad/dtk, makin kecil FRICTION makin lama berputar
    var foc = -1, anyF = 0, fz = ks.map(function(){ return 0; });
    var last = performance.now(), t0 = 0, introDone = rm, lastAct = last, lastStep = last, cur = -1;
    var pmx = 0, pmy = 0, tmx = 0, tmy = 0, mouseSeen = false, g0 = null, b0 = null, oriOn = false;
    var lw = 0, lh = 0, L = {};
    if (rm) st.classList.add('ready');

    var DPR = Math.min(3, window.devicePixelRatio || 1);
    function hiRes(k, i) {
      var im = k.querySelector('img.art'), src = window.GAL_FULL && window.GAL_FULL[i];
      if (!im || !src || im._hi) return; im._hi = 1;
      var h = new Image(); h.src = src;
      (h.decode ? h.decode() : Promise.resolve()).then(function(){ im.src = src; }).catch(function(){ im.src = src; });
    }
    function snapTo(v) { return Math.round((v + OFF) / step) * step - OFF; }
    function focusIdx(i) {
      i = ((i % N) + N) % N; foc = i; vel = 0;
      var base = -OFF - i * step;
      rotT = base + Math.round((rot - base) / TAU) * TAU;
    }
    function hit(x, y) {
      var best = -1, bz = -9;
      for (var i = 0; i < N; i++) {
        var r = ks[i].getBoundingClientRect();
        if (x >= r.left && x <= r.right && y >= r.top && y <= r.bottom && ks[i]._z > bz) { bz = ks[i]._z; best = i; }
      }
      return best;
    }
    function tap(x, y) {
      if (!introDone) return;
      var i = hit(x, y);
      if (i < 0) { foc = -1; rotT = rot; }
      else if (i === foc) { if (window.galOpen) window.galOpen(i, ks); }
      else focusIdx(i);
    }

    st.addEventListener('pointerdown', function(e){
      drag = true; lx = e.clientX; sx = e.clientX; sy = e.clientY; moved = 0; vel = 0; downT = performance.now(); lastAct = downT; held = fling; fling = 0; lm = downT;
      st.classList.add('drag'); e.stopPropagation(); try { st.setPointerCapture(e.pointerId); } catch (_) {}
    });
    st.addEventListener('pointermove', function(e){
      if (!drag) return;
      var dx = e.clientX - lx; lx = e.clientX;
      moved = Math.max(moved, Math.hypot(e.clientX - sx, e.clientY - sy));
      if (moved > 6) { foc = -1; rot += dx * .006; var dtm = Math.max(4, e.timeStamp - lm) / 1000; lm = e.timeStamp; vel += (dx * .006 / dtm - vel) * .45; }
    });
    function up(e) {
      if (!drag) return; drag = false; st.classList.remove('drag');
      var now = performance.now(); lastAct = now;
      if (e.type === 'pointerup' && moved <= 6 && now - downT < 600) { vel = 0; rotT = rot; tap(e.clientX, e.clientY); }
      else {
        var v = (now - lm > 90) ? 0 : vel;
        if (!rm && Math.abs(v) > FLING_MIN) { fling = clamp((held * v > 0 ? held : 0) + v, -FLING_MAX, FLING_MAX); rotT = rot; }
        else { rotT = rot + clamp(v * .18, -1.4, 1.4); }
        vel = 0;
      }
      held = 0;
    }
    st.addEventListener('pointerup', up); st.addEventListener('pointercancel', up);

    /* parallax: kursor di desktop, kemiringan di HP */
    function onMove(e) {
      if (e.pointerType !== 'mouse') return; mouseSeen = true;
      var r = st.getBoundingClientRect();
      tmx = clamp((e.clientX - (r.left + r.width / 2)) / (r.width / 2), -1, 1);
      tmy = clamp((e.clientY - (r.top + r.height / 2)) / (r.height / 2), -1, 1);
    }
    function onLeave() { tmx = 0; tmy = 0; }
    function onOri(e) {
      if (mouseSeen || e.gamma == null || e.beta == null) return;
      if (g0 === null) { g0 = e.gamma; b0 = e.beta; }
      tmx = clamp((e.gamma - g0) / 20, -1, 1); tmy = clamp((e.beta - b0) / 20, -1, 1);
      g0 += (e.gamma - g0) * .003; b0 += (e.beta - b0) * .003;
    }
    function addOri() { if (oriOn) return; oriOn = true; window.addEventListener('deviceorientation', onOri); }
    function askOri() {
      var D = window.DeviceOrientationEvent; if (!D || oriOn) return;
      if (typeof D.requestPermission === 'function') { D.requestPermission().then(function(r){ if (r === 'granted') addOri(); }).catch(function(){}); }
      else addOri();
    }
    function onClose(e) { if (st.isConnected && typeof e.detail === 'number') { lastAct = performance.now(); focusIdx(e.detail); } }
    if (!rm) {
      window.addEventListener('pointermove', onMove, { passive: true });
      document.documentElement.addEventListener('mouseleave', onLeave);
      if (matchMedia('(pointer: coarse)').matches && !(window.DeviceOrientationEvent && typeof DeviceOrientationEvent.requestPermission === 'function')) addOri();
      st.addEventListener('click', askOri, { once: true });
    }
    window.addEventListener('galclose', onClose);
    function cleanup() {
      window.removeEventListener('pointermove', onMove); window.removeEventListener('deviceorientation', onOri);
      window.removeEventListener('galclose', onClose); document.documentElement.removeEventListener('mouseleave', onLeave);
    }

    function frame(t) {
      if (!st.isConnected) { cleanup(); return; }
      var dt = Math.min(.05, (t - last) / 1000); last = t;
      var W = st.clientWidth, H = st.clientHeight;
      if (W !== lw || H !== lh) {
        lw = W; lh = H;
        L.ph = W < 600 ? Math.min(.74, W * .92 / H) : .9; L.top = H * (1 - L.ph);
        L.cw = Math.max(100, Math.min(178, W * (W < 600 ? .29 : .17))); L.ch = L.cw * 1.4; L.Rx = Math.min(W * .4, 450);
        L.cy = L.top + L.ph * H * .27; var chin = L.top + L.ph * H * .47;
        var yF = Math.min(chin + L.ch * .53 + 6, H - L.ch * .53 - 4);
        L.RyF = Math.max(0, yF - L.cy); L.RyB = H * .07;
        L.sFoc = Math.max(1.07, Math.min(2.3, H * .74 / L.ch, W * .8 / L.cw));
        st.style.setProperty('--ph', (L.ph * 100) + '%'); st.style.setProperty('--cw', L.cw + 'px'); st.style.setProperty('--cy', L.cy + 'px');
        if (ttl) { ttl.style.fontSize = Math.min(W * .97 / 3.85, H * .46) + 'px'; ttl.style.top = (L.top + L.ph * H * .3) + 'px'; }
      }
      var ch = L.ch, Rx = L.Rx, cy = L.cy;

      if (!t0) t0 = t;
      var it = rm ? 9 : (t - t0 - 80) / 1000;
      if (!introDone && it > 0.85) { introDone = true; lastAct = t; lastStep = t; st.classList.add('ready'); }

      if (introDone && !drag) {
        if (fling) {
          rot += fling * dt; fling *= Math.exp(-dt * FRICTION); rotT = rot; lastAct = t; lastStep = t;
          if (Math.abs(fling) < FLING_END) { rotT = rot + fling * .4; fling = 0; }
        } else {
          if (!rm && foc < 0 && t - lastAct > 900 && !lbOpen()) { rotT += .55 * dt; }
          rot += (rotT - rot) * (1 - Math.exp(-dt * 5.2));
        }
      }

      var k2 = 1 - Math.exp(-dt * 6); pmx += (tmx - pmx) * k2; pmy += (tmy - pmy) * k2;
      var spin = rm ? 0 : (1 - ease(it / 1.9)) * -2.3, bestC = -2, bi = 0, mf = 0;

      for (var i = 0; i < N; i++) {
        var k = ks[i], th = rot + i * step + OFF + spin, sn = Math.sin(th), cs = Math.cos(th);
        var depth = (cs + 1) / 2, front = cs > 0;
        var pi = rm ? 1 : ease((it - i * .07) / 1.0);
        fz[i] += ((i === foc ? 1 : 0) - fz[i]) * (1 - Math.exp(-dt * 7));
        var f = fz[i]; if (f > mf) mf = f;
        var a = (front ? 1 : -1) * Math.asin(sn) * .4 * 180 / Math.PI;
        var x = sn * Rx * pi - pmx * 16 * cs;
        var y = cs * (front ? L.RyF : L.RyB) * (1 + pmy * .1) * pi + sn * Rx * pmx * .04 + pmy * 8 * cs - Math.sin(Math.PI * pi) * ch * .2;
        var sc = .8 + .27 * cs; sc = .35 + (sc - .35) * pi;
        x -= x * f; y += ((H * .5 - cy) - y) * f; a *= (1 - f); sc += (L.sFoc - sc) * f;
        var s = Math.max(.2, sc), w = Math.round(L.cw * s * DPR / 2) * 2 / DPR, hh = Math.round(w * 1.4 * DPR / 2) * 2 / DPR;
        x = Math.round(x * DPR) / DPR; y = Math.round(y * DPR) / DPR;
        k.style.width = w + 'px'; k.style.height = hh + 'px'; k.style.setProperty('--m', (w / L.cw).toFixed(3));
        k.style.transform = 'translate(' + x.toFixed(2) + 'px,' + y.toFixed(2) + 'px) perspective(900px) rotateY(' + a.toFixed(2) + 'deg) rotateX(' + (-pmy * 3).toFixed(2) + 'deg)';
        var op = (.76 + .24 * Math.pow(depth, .8)) * Math.min(1, pi * 3) * (1 - .55 * anyF * (1 - f));
        k.style.opacity = op.toFixed(3);
        k.style.filter = 'none';
        k.style.setProperty('--sa', (125 - sn * 45).toFixed(0) + 'deg');
        k.style.zIndex = f > .02 ? 6 : (front && pi > .85 ? 3 : 1);
        k._z = cs + f * 5;
        var fo = f > .5; if (fo !== k._fo) { k._fo = fo; k.classList.toggle('foc', fo); }
        if (fo) hiRes(k, i);
        if (cs > bestC) { bestC = cs; bi = i; }
      }
      anyF = mf;
      if (port) port.style.translate = (-pmx * 6).toFixed(2) + 'px ' + (-pmy * 3).toFixed(2) + 'px';
      if (ttl) ttl.style.translate = (pmx * 14).toFixed(2) + 'px ' + (pmy * 6).toFixed(2) + 'px';
      if (introDone) {
        var show = foc >= 0 ? foc : bi;
        if (show !== cur) {
          cur = show;
          if (idxB) { idxB.textContent = pad(show + 1); idxB.classList.remove('roll'); void idxB.offsetWidth; idxB.classList.add('roll'); }
          var nmEl = st.querySelector('.gidx-nm');
          if (nmEl && ks[show]) {
            var capEl = ks[show].querySelector('.cap');
            if (capEl) nmEl.textContent = capEl.textContent;
          }
        }
      }
      requestAnimationFrame(frame);
    }
    st.addEventListener('click', function(e){
      var btn = e.target.closest('[data-gact]');
      if (!btn) return;
      e.stopPropagation();
      var act = btn.getAttribute('data-gact');
      var activeI = foc >= 0 ? foc : (cur >= 0 ? cur : 0);
      if (act === 'prev') focusIdx(activeI - 1);
      else if (act === 'next') focusIdx(activeI + 1);
      else if (act === 'zoom' && window.galOpen) window.galOpen(activeI, ks);
    });
    var wrap = st.parentElement;
    if (wrap) {
      wrap.addEventListener('click', function(e){
        var vBtn = e.target.closest('[data-gview]');
        if (!vBtn) return;
        var mode = vBtn.getAttribute('data-gview');
        [].forEach.call(wrap.querySelectorAll('[data-gview]'), function(b){
          var on = b.getAttribute('data-gview') === mode;
          b.classList.toggle('on', on);
          b.setAttribute('aria-pressed', on ? 'true' : 'false');
        });
        wrap.classList.toggle('is-grid', mode === 'grid');
      });
      wrap.addEventListener('click', function(e){
        var gCard = e.target.closest('.ggrid-card');
        if (!gCard) return;
        var gi = parseInt(gCard.getAttribute('data-gi'), 10) || 0;
        if (window.galOpen) window.galOpen(gi, ks);
      });
    }
    requestAnimationFrame(function(t){ last = t; frame(t); st.classList.add('in'); });
  }
  function scan() { var st = pgb.querySelector('.gstage'); if (st) setup(st); }
  new MutationObserver(scan).observe(pgb, { childList: true });
  scan();
})();
