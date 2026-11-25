/* ============================================================
   buddy.js
   ============================================================ */

/**
 * Interactive Mascot Buddy (Zero-Reflow 60fps Edition)
 * Single unified RAF loop, cached typography metrics, mathematical wave sync,
 * parabolic letter jumping, trampoline physics, and card reactions.
 */
(function(){
  var b = document.getElementById('buddy'),
      hd = document.querySelector('.hd'),
      title = document.querySelector('.title');
  if (!b || !hd || !title) return;

  // 1. Split head/hair layers for 3D cursor tracking
  [].slice.call(b.querySelectorAll('.bp')).forEach(function(el){
    var d = el;
    if (el.tagName === 'IMG') {
      d = document.createElement('div');
      d.className = el.className;
      d.setAttribute('data-p', el.getAttribute('data-p'));
      el.className = 'ly';
      el.removeAttribute('data-p');
      el.parentNode.replaceChild(d, el);
      d.appendChild(el);
    }
    var body = [].filter.call(d.querySelectorAll('img.ly'), function(i){
      return !/\b(lgL|lgR|arm)\b/.test(i.className);
    })[0];
    if (!body) return;
    body.classList.add('bdy');
    var w = document.createElement('div'); w.className = 'hdw';
    var h = body.cloneNode(); h.className = 'ly hdi';
    var r = body.cloneNode(); r.className = 'ly hri';
    w.appendChild(h); w.appendChild(r); d.appendChild(w);
  });

  var rd = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var root = document.documentElement;
  var bsh = b.querySelector('.bsh');

  // 2. Pose & Seat State
  var L = null, seatIdx = 5;
  var jump = { on: false, x0: 0, y0: 0, t0: 0, dur: 480, arc: 56, fromIdx: 5, toIdx: 5 };
  var air = { y: 0, vy: 0 };
  var bopT = 0;

  var P = {}, pose = 'idle', pt = null, clicks = [], lastAct = performance.now(), userT = -1e9;
  var lean = 0, tlean = 0, wlean = 0, bw = 0, seat = 0.74, near = false, nearT = null;
  var curX = 0, curY = 0;
  var px = null, py = null, lastPtr = 0, hx = 0, hy = 0, t0 = performance.now(), ox = '', oy = '', orr = '';

  [].forEach.call(b.querySelectorAll('.bp'), function(i){ P[i.dataset.p] = i; });

  function getLets() { return title.querySelectorAll('.t1 i'); }

  // Cached layout geometry so frame() never triggers synchronous layout/reflow
  var cv = document.createElement('canvas').getContext('2d'), capK = '', capH = 40;
  var geom = { valid: false, hrLeft: 0, hrTop: 0, fs: 60, cap: 42, lets: [], lastMeasure: 0 };

  function measureCap(cs) {
    var k = cs.fontWeight + cs.fontSize + cs.fontFamily;
    if (k !== capK) {
      capK = k;
      cv.font = cs.fontWeight + ' ' + cs.fontSize + ' ' + cs.fontFamily;
      var m = cv.measureText('F');
      capH = m.actualBoundingBoxAscent || parseFloat(cs.fontSize) * 0.72;
    }
    return capH;
  }

  function refreshGeom() {
    var lets = getLets();
    if (!lets.length) return;
    var hr = hd.getBoundingClientRect();
    var cs = getComputedStyle(title);
    var fs = parseFloat(cs.fontSize) || 60;
    var cH = measureCap(cs);
    geom.hrLeft = hr.left;
    geom.hrTop = hr.top;
    geom.fs = fs;
    geom.cap = cH;
    geom.lets = [];
    for (var i = 0; i < lets.length; i++) {
      var lr = lets[i].getBoundingClientRect();
      geom.lets.push({
        cx: lr.left + lr.width * 0.5,
        bottom: lr.bottom,
        w: lr.width,
        h: lr.height
      });
    }
    geom.valid = hr.width > 0 && geom.lets.length > 0 && geom.lets[0].w > 2;
    geom.lastMeasure = performance.now();
  }

  function ensureSeat() {
    var lets = getLets();
    if (!lets.length) return null;
    if (seatIdx >= lets.length) seatIdx = Math.min(5, Math.floor(lets.length / 2));
    var target = lets[seatIdx];
    if (L !== target || !L.isConnected) {
      [].forEach.call(lets, function(el, idx){ el.classList.toggle('seated', idx === seatIdx); });
      L = target;
      geom.valid = false;
    }
    return L;
  }
  ensureSeat();
  refreshGeom();

  addEventListener('resize', function(){ geom.valid = false; }, { passive: true });
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(function(){ capK = ''; geom.valid = false; });
  }
  document.addEventListener('introdone', function(){
    geom.valid = false;
    setTimeout(function(){ geom.valid = false; }, 350);
    setTimeout(function(){ geom.valid = false; }, 950);
    b.classList.remove('hop'); void b.offsetWidth; b.classList.add('hop');
  }, { once: true });

  function set(n, ms) {
    if (!P[n]) return;
    if (n !== pose) {
      P[pose].classList.remove('on');
      P[n].classList.add('on');
      pose = n;
      if (!rd) { b.classList.remove('hop'); void b.offsetWidth; b.classList.add('hop'); }
    }
    clearTimeout(pt);
    if (ms) pt = setTimeout(function(){ set('idle'); }, ms);
  }

  function act() {
    lastAct = performance.now();
    if (pose === 'sleep') set('shock', 1500);
    else if (pose === 'chin') set('idle');
  }

  function jumpToLetter(idx, userTriggered) {
    var lets = getLets();
    if (!lets.length) return;
    idx = Math.max(0, Math.min(lets.length - 1, idx));
    if (userTriggered) lastAct = performance.now();
    if (idx === seatIdx && !jump.on) {
      air.vy = -8.5;
      if (window.__zkLetterImpulse) window.__zkLetterImpulse(idx, 18);
      set('wave', 1800);
      return;
    }
    var dist = Math.abs(idx - seatIdx);
    jump.on = true;
    jump.x0 = curX;
    jump.y0 = curY;
    jump.t0 = performance.now();
    jump.dur = Math.min(620, 330 + dist * 50);
    jump.arc = Math.min(102, 36 + dist * 11);
    jump.fromIdx = seatIdx;
    jump.toIdx = idx;
    seatIdx = idx;
    var letsArr = getLets();
    [].forEach.call(letsArr, function(el, i){ el.classList.toggle('seated', i === seatIdx); });
    L = letsArr[seatIdx];
    if (pose === 'sleep' || pose === 'chin') set('idle');
  }

  window.__zkBuddyJump = jumpToLetter;
  window.__zkBuddyBounce = function(vy) {
    air.vy = Math.min(air.vy, vy || -9.5);
    set('shock', 1500);
  };
  window.__zkBuddyWheelLean = function(wl) {
    wlean = Math.max(-14, Math.min(14, wl || 0));
  };
  window.__zkBuddySeatIdx = function() { return seatIdx; };

  // Unified loop (head tracking + sitting/jumping physics without forced reflows)
  var pgElB = document.getElementById('pg');
  function frame(now) {
    if (document.hidden ||
        root.classList.contains('intro-on') ||
        document.body.classList.contains('covered') ||
        (pgElB && pgElB.classList.contains('open'))) {
      requestAnimationFrame(frame);
      return;
    }

    var curL = ensureSeat();
    if (!curL) { requestAnimationFrame(frame); return; }

    // Refresh geometry cache only when invalidated or occasionally when idle
    if (!geom.valid || (now - geom.lastMeasure > 1800 && !document.body.classList.contains('busy'))) {
      refreshGeom();
    }

    var lg = geom.lets[seatIdx];
    if (!lg || lg.w < 4) {
      b.style.visibility = 'hidden';
      requestAnimationFrame(frame);
      return;
    }

    // 1. Head cursor look-at
    if (!rd) {
      var htx, hty;
      if (px !== null && now - lastPtr < 6000) {
        var bCx = geom.hrLeft + curX + bw * 0.5;
        var bCy = geom.hrTop + curY + bw * 0.45;
        htx = Math.max(-1, Math.min(1, (px - bCx) / ((innerWidth || 1) * 0.35)));
        hty = Math.max(-1, Math.min(1, (py - bCy) / ((innerHeight || 1) * 0.35)));
      } else {
        var ht = (now - t0) * 0.001;
        htx = Math.sin(ht * 0.35) * 0.5;
        hty = Math.sin(ht * 0.23 + 1) * 0.25;
      }
      hx += (htx - hx) * 0.08;
      hy += (hty - hy) * 0.08;
      var a = hx.toFixed(3), c = hy.toFixed(3), d = (hx * 2.4).toFixed(2);
      if (a !== ox) { ox = a; b.style.setProperty('--hx', a); }
      if (c !== oy) { oy = c; b.style.setProperty('--hy', c); }
      if (d !== orr) { orr = d; b.style.setProperty('--hr', d); }
    }

    // 2. Body sitting & jumping position
    var fs = geom.fs;
    seat += ((pose === 'idle' ? 0.74 : 0.83) - seat) * 0.12;
    // Mathematical wave offset matching CSS @keyframes hurufWave (3.6s period, -0.32s per letter)
    var wavePhase = ((now * 0.001) - seatIdx * 0.32) / 3.6 * Math.PI * 2;
    var waveY = rd ? 0 : -Math.cos(wavePhase) * (fs * 0.055);
    var sit = (lg.bottom + waveY) - geom.cap - fs * 0.14;
    var availH = Math.max((sit - geom.hrTop - 2) / 0.82, fs * 0.82);
    var h = Math.max(0, Math.min(availH, Math.max(fs * 1.35, 96), 188));

    if (h < 44) {
      b.style.visibility = 'hidden';
    } else {
      var w = h * 420 / 602;
      if (b.style.visibility !== 'visible') b.style.visibility = 'visible';
      if (Math.abs(w - bw) > 0.5) {
        bw = w;
        b.style.width = w.toFixed(1) + 'px';
        b.style.height = h.toFixed(1) + 'px';
      }
      var tx = lg.cx - geom.hrLeft - w * 0.5;
      var ty = sit - geom.hrTop - h * seat;
      var jRot = 0, bshScale = 1;

      if (jump.on && !rd) {
        var p = Math.min(1, (now - jump.t0) / jump.dur);
        var e = 1 - Math.pow(1 - p, 3);
        var arcY = Math.sin(Math.PI * p) * jump.arc;
        curX = jump.x0 + (tx - jump.x0) * e;
        curY = jump.y0 + (ty - jump.y0) * e - arcY;
        jRot = (tx >= jump.x0 ? 1 : -1) * Math.sin(Math.PI * p) * 14;
        bshScale = Math.max(0.35, 1 - Math.sin(Math.PI * p) * 0.65);
        if (p >= 1) {
          jump.on = false;
          air.vy = 2.6;
          if (window.__zkLetterImpulse) window.__zkLetterImpulse(seatIdx, 15);
          b.classList.remove('hop'); void b.offsetWidth; b.classList.add('hop');
        }
      } else {
        if (Math.abs(air.y) > 0.1 || Math.abs(air.vy) > 0.1) {
          air.vy += 0.58;
          air.y += air.vy;
          if (air.y > 0) {
            air.y = 0;
            if (air.vy > 2.2) {
              if (window.__zkLetterImpulse) window.__zkLetterImpulse(seatIdx, Math.min(16, air.vy * 1.8));
              air.vy = -air.vy * 0.32;
            } else {
              air.vy = 0;
            }
          }
        } else {
          air.y = 0; air.vy = 0;
        }
        var bopY = (now < bopT && !rd) ? Math.abs(Math.sin(now / 135)) * -4.5 : 0;
        curX = tx;
        curY = ty + air.y + bopY;
        bshScale = Math.max(0.45, 1 + air.y / 80);
      }

      wlean *= 0.88;
      lean += ((tlean + wlean) - lean) * 0.12;
      var soStr = (seat * 100).toFixed(1) + '%';
      b.style.setProperty('--so', soStr);
      b.style.transformOrigin = '50% ' + soStr;
      b.style.transform = 'translate3d(' + curX.toFixed(1) + 'px,' + curY.toFixed(1) + 'px,0) rotate(' + (lean + jRot).toFixed(2) + 'deg)';
      if (bsh) bsh.style.transform = 'scaleX(' + bshScale.toFixed(2) + ')';
    }
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);

  var tc = 0;
  addEventListener('pointermove', function(e){
    px = e.clientX; py = e.clientY; lastPtr = performance.now();
    if (lastPtr - tc < 75) return;
    tc = lastPtr;
    tlean = Math.max(-1, Math.min(1, (e.clientX / (innerWidth || 1)) * 2 - 1)) * 3;
    act();
    var bLeft = geom.hrLeft + curX, bTop = geom.hrTop + curY;
    var n = e.clientX > bLeft - 30 && e.clientX < bLeft + bw + 30 && e.clientY > bTop - 30 && e.clientY < bTop + bw * 1.4 + 30;
    if (n && !near) {
      near = true;
      clearTimeout(nearT);
      nearT = setTimeout(function(){ if (near && (pose === 'idle' || pose === 'chin')) set('wave', 2400); }, 700);
    } else if (!n && near) {
      near = false;
      clearTimeout(nearT);
    }
  }, { passive: true });

  addEventListener('pointerdown', act, { passive: true });
  addEventListener('keydown', function(e){
    act();
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') userT = performance.now();
  });

  b.querySelector('.bwrap').addEventListener('click', function(){
    var now = performance.now();
    clicks = clicks.filter(function(t){ return now - t < 3000; });
    clicks.push(now);
    lastAct = now;
    if (clicks.length >= 3) {
      clicks = [];
      set('angry', 2600);
      if (!rd) { b.classList.remove('shake'); void b.offsetWidth; b.classList.add('shake'); }
    } else {
      air.vy = -7.5;
      if (window.__zkLetterImpulse) window.__zkLetterImpulse(seatIdx, 14);
      set('shock', 1400);
    }
  });

  var st = document.getElementById('stage');
  ['pointerdown', 'wheel'].forEach(function(n){
    st && st.addEventListener(n, function(){ userT = performance.now(); }, { passive: true });
  });
  ['prev', 'next'].forEach(function(id){
    var el = document.getElementById(id);
    el && el.addEventListener('click', function(){ userT = performance.now(); });
  });

  window.__zkBuddyCardReact = function(cardIdx) {
    if (performance.now() - userT > 2800 || pose === 'angry' || pose === 'shock') return;
    if (cardIdx === 1) {
      bopT = performance.now() + 3200;
      set('idle');
    } else if (cardIdx === 4 || cardIdx === 5) {
      set('thumb', 2000);
    } else if (cardIdx === 2 || cardIdx === 6) {
      set('wave', 2100);
    } else if (cardIdx === 7) {
      set('point', 2000);
    } else if (cardIdx === 8) {
      set('thumb', 2100);
    } else {
      set('point', 1800);
    }
  };

  var tg = document.getElementById('themeToggle');
  tg && tg.addEventListener('click', function(){ lastAct = performance.now(); set('thumb', 1800); });

  function tick() {
    var idle = performance.now() - lastAct;
    if (!document.hidden && !document.body.classList.contains('covered')) {
      if (idle > 26000) { if (pose !== 'sleep') set('sleep'); }
      else if (idle > 14000) { if (pose === 'idle') set('chin'); }
      else if (idle > 2600 && pose === 'idle' && !jump.on) {
        var r = Math.random();
        if (r < 0.55) {
          var lets = getLets();
          if (lets.length > 2) {
            var stepDir = Math.random() < 0.5 ? -1 : 1;
            var nxt = Math.max(1, Math.min(lets.length - 2, seatIdx + stepDir));
            if (nxt === seatIdx) nxt = Math.max(1, Math.min(lets.length - 2, seatIdx - stepDir));
            if (nxt !== seatIdx) jumpToLetter(nxt, false);
          }
        } else if (r < 0.82) {
          set(Math.random() < 0.65 ? 'wave' : 'thumb', 2200);
        }
      }
    }
    setTimeout(tick, 3400 + Math.random() * 2400);
  }
  function go() { lastAct = performance.now(); setTimeout(tick, 5000); }
  if (root.classList.contains('intro-on')) document.addEventListener('introdone', go, { once: true });
  else go();
})();
