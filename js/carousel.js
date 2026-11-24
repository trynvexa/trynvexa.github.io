/* ============================================================
   carousel.js
   ============================================================ */

/**
 * Radial Wheel Carousel & 3D Shards Detail Transition
 * Critical-damped spring physics, free-spinning flywheel, touch/trackpad gestures,
 * glass shatter transition, and card inspection.
 */
(function(){
  // PHOTO_B64 extracted to assets/images/profile-portrait.webp
  // Plain data URI: works everywhere (sandboxed previews, file://, any host) with no extra request
  var STORY_PHOTO = 'assets/images/story-portrait.webp';
  var MUSIC_PHOTO = 'assets/images/music-portrait.webp';
  var MUSIC_CUT = 'assets/images/music-cut.webp';
  var PHOTO = 'assets/images/profile-portrait.webp';
  var photoPre = new Image(); photoPre.src = PHOTO; // decode early so opening the card never waits on it
  var GAL = [];
  var GAL_AR = [];
  var GAL_OP = [];
  function galPad(n) { return (n < 10 ? '0' : '') + n; }
  var GAL_HERO = "assets/images/gallery-hero.webp";
  var GAL_PHOTOS = [
    "assets/images/gallery-photo-1.webp",
    "assets/images/gallery-photo-2.webp",
    "assets/images/gallery-photo-3.webp",
    "assets/images/gallery-photo-4.webp",
    "assets/images/gallery-photo-5.webp",
    "assets/images/gallery-photo-6.webp",
    "assets/images/gallery-photo-7.webp",
    "assets/images/gallery-photo-8.webp"
  ];
  var GAL_THUMBS = ["assets/images/gallery-thumb-1.webp","assets/images/gallery-thumb-2.webp","assets/images/gallery-thumb-3.webp","assets/images/gallery-thumb-4.webp","assets/images/gallery-thumb-5.webp","assets/images/gallery-thumb-6.webp","assets/images/gallery-thumb-7.webp","assets/images/gallery-thumb-8.webp"];
  window.GAL_FULL = GAL_PHOTOS;
  function galScene() {
    var A = '<svg class="art" viewBox="0 0 60 80" preserveAspectRatio="xMidYMid slice" aria-hidden="true">';
    var art = [
      A + '<defs><linearGradient id="ga1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f0f0f1"/><stop offset="1" stop-color="#b3b4b9"/></linearGradient></defs><rect width="60" height="80" fill="url(#ga1)"/><polygon points="0,80 0,54 13,36 21,45 36,21 60,58 60,80" fill="#2a2b2f"/><polygon points="36,21 30,35 36,32 42,38" fill="#ececee"/></svg>',
      A + '<rect width="60" height="80" fill="#141518"/><circle cx="40" cy="44" r="17" fill="#d6d6d9"/><circle cx="46" cy="39" r="16" fill="#141518" opacity=".6"/><circle cx="10" cy="14" r=".9" fill="#fff"/><circle cx="24" cy="8" r=".6" fill="#fff"/><circle cx="50" cy="12" r=".8" fill="#fff"/><circle cx="14" cy="60" r=".7" fill="#fff"/></svg>',
      A + '<rect width="60" height="80" fill="#f2f2f0"/><circle cx="30" cy="34" r="15" fill="#1c1d20"/><rect x="0" y="58" width="60" height="22" fill="#cfd0d3"/><rect x="14" y="50" width="32" height="2" fill="#1c1d20"/></svg>',
      A + '<rect width="60" height="80" fill="#cdced1"/><path d="M-2 30Q15 18 30 30T62 30V80H-2Z" fill="#9c9da2"/><path d="M-2 46Q15 34 30 46T62 46V80H-2Z" fill="#5f6065"/><path d="M-2 62Q15 50 30 62T62 62V80H-2Z" fill="#232427"/></svg>',
      A + '<defs><linearGradient id="ga5" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1f2024"/><stop offset="1" stop-color="#d9d9dc"/></linearGradient></defs><rect width="60" height="80" fill="url(#ga5)"/><circle cx="22" cy="26" r="8" fill="#f3f3f4"/><rect x="0" y="62" width="60" height="18" fill="#101114"/></svg>',
      A + '<defs><radialGradient id="ga6" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#9fb8ff"/><stop offset=".35" stop-color="#2a4aa8"/><stop offset="1" stop-color="#0b0c12"/></radialGradient></defs><rect width="60" height="80" fill="#0b0c12"/><circle cx="30" cy="40" r="24" fill="url(#ga6)"/><circle cx="30" cy="40" r="15" fill="none" stroke="#fff" stroke-opacity=".25" stroke-width=".5"/><circle cx="30" cy="40" r="3" fill="#ffe9a8"/></svg>',
      A + '<rect width="60" height="80" fill="#e0463a"/><circle cx="30" cy="38" r="17" fill="none" stroke="#141414" stroke-width="1.2"/><circle cx="30" cy="38" r="10" fill="none" stroke="#141414" stroke-width="1.2"/><circle cx="30" cy="38" r="4" fill="#141414"/><path d="M30 12V64M4 38H56" stroke="#141414" stroke-width=".6" opacity=".6"/></svg>',
      A + '<rect width="60" height="80" fill="#efe6d2"/><ellipse cx="32" cy="38" rx="6" ry="15" transform="rotate(35 32 38)" fill="#141414"/><path d="M38 28C46 18 50 14 54 12" stroke="#e8923f" stroke-width="3" stroke-linecap="round" fill="none"/><path d="M10 64L26 50M14 70L30 56" stroke="#e8923f" stroke-width="1.2" stroke-linecap="round"/></svg>'
    ];
    var NAMES = ['Jiwoo', 'Carmen', 'Yuha', 'Stella', 'Juun', 'A-na', 'Ian', 'Ye-on'];
    function tl(n) {
      var nm = NAMES[n - 1], ph = GAL_PHOTOS[n - 1];
      var face = ph ? '<img class="art" src="' + (GAL_THUMBS[n - 1] || ph) + '" alt="' + nm + '" decoding="async" draggable="false">' : art[n - 1];
      var fb = ph ? '' : ' data-src="data:image/svg+xml;charset=utf-8,' + encodeURIComponent(art[n - 1].replace('<svg ', '<svg xmlns="http://www.w3.org/2000/svg" width="900" height="1200" ')) + '"';
      return '<div class="gk tl"' + fb + '>' + face + '<span class="cap">' + nm + '</span></div>';
    }
    var gridItems = NAMES.map(function(nm, idx) {
      var ph = GAL_PHOTOS[idx], th = GAL_THUMBS[idx] || ph;
      return '<button type="button" class="ggrid-card" data-gi="' + idx + '" aria-label="Buka potret ' + nm + ' (' + galPad(idx + 1) + ')">' +
        '<div class="ggrid-img"><img src="' + th + '" alt="' + nm + '" loading="lazy" decoding="async"></div>' +
        '<div class="ggrid-meta"><span class="ggrid-no">' + galPad(idx + 1) + '</span><strong class="ggrid-nm">' + nm + '</strong><span class="ggrid-ar" aria-hidden="true">&#8599;</span></div>' +
      '</button>';
    }).join('');
    return '<div class="gstage" aria-label="Frame"><div class="gtitle" aria-hidden="true" data-t="FRAME"><span>FRAME</span></div><div class="gvf" aria-hidden="true"><i></i><i></i><i></i><i></i></div>' +
      '<img class="gport" src="' + GAL_HERO + '" alt="Potret M. Zikri Al-Bukhori" draggable="false">' +
      tl(1) + tl(2) + tl(3) + tl(4) + tl(5) + tl(6) + tl(7) + tl(8) +
      '<div class="gidx">' +
        '<button type="button" class="gidx-btn" data-gact="prev" aria-label="Foto sebelumnya">&#8592;</button>' +
        '<div class="gidx-info"><b>01</b><i>/</i><span>08</span><em class="gidx-nm">Jiwoo</em></div>' +
        '<button type="button" class="gidx-btn" data-gact="next" aria-label="Foto berikutnya">&#8594;</button>' +
        '<button type="button" class="gidx-btn gidx-zoom" data-gact="zoom" aria-label="Perbesar foto aktif">&#8599;</button>' +
      '</div></div>' +
      '<div class="ggrid" aria-label="Grid Galeri Editorial">' + gridItems + '</div>';
  }
  var stage = document.getElementById('stage'),
      wheel = document.getElementById('wheel'),
      ring  = document.getElementById('ring'),
      nm    = document.getElementById('nm'),
      mk    = document.getElementById('mk');

  wheel.insertAdjacentHTML('beforeend', document.getElementById('cards').innerHTML);
  [].forEach.call(wheel.querySelectorAll('[data-photo]'), function(im){ im.src = PHOTO; });
  [].forEach.call(wheel.querySelectorAll('[data-music]'), function(im){ im.src = MUSIC_PHOTO; });
  [].forEach.call(wheel.querySelectorAll('[data-story]'), function(im){ im.src = STORY_PHOTO; });
  var cards = [].slice.call(wheel.querySelectorAll('.card')),
      n = cards.length,
      step = 23,
      pos = 2, // Start upright on About / Portrait card
      R = 0,
      timer = null,
      moved = false;

  // Inject Option 1 Custom Mascot Playing Card Back (.cback) into each card for 3D Cardistry Deal & Flip
  var CBACK_HTML =
    '<div class="cback" aria-hidden="true">' +
      '<div class="cback-glare"></div>' +
      '<div class="cback-inner">' +
        '<span class="cb-corner tl"><b>Z</b><i>&#9830;</i></span>' +
        '<span class="cb-corner br"><b>Z</b><i>&#9830;</i></span>' +
        '<div class="cb-art">' +
          '<img class="cb-mascot top" src="assets/images/mascot-head.webp" alt="" draggable="false" decoding="async">' +
          '<span class="cb-word">Zikri</span>' +
          '<img class="cb-mascot bot" src="assets/images/mascot-head.webp" alt="" draggable="false" decoding="async">' +
        '</div>' +
      '</div>' +
    '</div>';
  cards.forEach(function(c){ c.insertAdjacentHTML('beforeend', CBACK_HTML); });

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.querySelectorAll('#warpdefs animate').forEach(function(a){ a.remove(); });


  // Industrial Gear Polygon Calculation
  var pts = [], T = 14;
  for (var i = 0; i < T * 4; i++) {
    var a = i / (T * 4) * Math.PI * 2,
        k = i % 4,
        r = (k === 1 || k === 2) ? 47 : 39;
    pts.push((Math.cos(a) * r).toFixed(1) + ' ' + (Math.sin(a) * r).toFixed(1));
  }
  document.getElementById('gp').setAttribute('d', 'M' + pts.join('L') + 'ZM0 -14a14 14 0 1 0 .01 0Z');

  var last = cards.map(function(){ return 0; });
  var lean = 0; // slight trailing tilt while the wheel is moving
  var lift = [];
  var dragRaf = null, dragPos = 0, arc = 1; // arc = px of finger travel per card
  var isBusy = false;
  // While the wheel moves, pause the ambient animations (haze drift, title wave) so nothing competes with it
  function busy(on) {
    if (on === isBusy) return;
    isBusy = on;
    document.body.classList.toggle('busy', on);
    if (!document.body.classList.contains('freeze')) {
      try { if (on) warp.pauseAnimations(); else warp.unpauseAnimations(); } catch (_) {}
    }
  }

  var lastW = 0;
  function layout() {
    var isMob = window.innerWidth <= 700;
    var w = cards[0].offsetWidth, h = w * 1.4;
    lastW = w;
    step = isMob ? 17.5 : 23; // Sudut lebih landai & teratur di HP mirip tampilan desktop
    arc = isMob ? w * 0.62 : w * 0.68;
    R = isMob ? w * 2.25 : w * 1.75; // Radius lengkung proporsional

    var stageH = stage.clientHeight || (window.innerHeight - (document.querySelector('.hd') ? document.querySelector('.hd').offsetHeight : 180));
    var cyM = Math.max(h * 0.56 + 14, Math.min(stageH * 0.50, stageH - h * 0.52 - 58));
    var oy = isMob ? Math.round(cyM + R) : Math.round(h * 0.64 + R);
    wheel.style.top = oy + 'px';
    stage.style.minHeight = Math.round(isMob ? stageH : (oy - R * 0.3)) + 'px';

    var r = R * (isMob ? 0.68 : 0.74);
    ring.setAttribute('width', Math.round(r * 2));
    ring.setAttribute('height', Math.round(r * 2));
    ring.style.left = -Math.round(r) + 'px';
    ring.style.top = -Math.round(r) + 'px';
    ring.setAttribute('viewBox', (-r) + ' ' + (-r) + ' ' + (r * 2) + ' ' + (r * 2));

    var rOuter = r * 0.96;
    var rInner = r * 0.72;
    var rText  = r * 0.84;

    var ticks = [];
    for (var ti = 0; ti < 56; ti++) {
      var ang = (ti * 360 / 56) * Math.PI / 180;
      var isMaj = (ti % 8 === 0);
      var r1 = rOuter - (isMaj ? 10 : 5);
      var r2 = rOuter - 1.5;
      var x1 = (Math.sin(ang) * r1).toFixed(1), y1 = (-Math.cos(ang) * r1).toFixed(1);
      var x2 = (Math.sin(ang) * r2).toFixed(1), y2 = (-Math.cos(ang) * r2).toFixed(1);
      ticks.push('<line x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '" stroke="var(--ring)" stroke-width="' + (isMaj ? '1.6' : '0.9') + '" opacity="' + (isMaj ? '0.85' : '0.42') + '"/>');
      if (isMaj) {
        var xd = (Math.sin(ang) * (rInner + 6)).toFixed(1), yd = (-Math.cos(ang) * (rInner + 6)).toFixed(1);
        ticks.push('<circle cx="' + xd + '" cy="' + yd + '" r="1.7" fill="var(--ring)" opacity="0.65"/>');
      }
    }

    var ringW = ((window.__zkWORD && window.__zkWORD[(window.ZK && ZK.lang) || 'id']) || 'PORTOFOLIO');
    var ringRep = [ringW, ringW, ringW, ringW, ringW].join(' • ') + ' •';
    ring.innerHTML = [
      '<defs>',
        '<path id="rp" d="M 0,' + (-rText) + ' A ' + rText + ' ' + rText + ' 0 1 1 0,' + rText + ' A ' + rText + ' ' + rText + ' 0 1 1 0,' + (-rText) + '"/>',
      '</defs>',
      '<circle r="' + rOuter + '" fill="var(--disc)"/>',
      '<circle r="' + (rOuter - 1.5) + '" fill="none" stroke="var(--ring)" stroke-width="0.9" opacity="0.45"/>',
      '<circle r="' + rInner + '" fill="none" stroke="var(--ring)" stroke-width="0.9" stroke-dasharray="3 5" opacity="0.5"/>',
      '<g>' + ticks.join('') + '</g>',
      '<text style="font-size: ' + (isMob ? 9 : 10) + 'px; font-weight: 700; letter-spacing: 0.16em; fill: var(--ring); font-family: inherit;">',
        '<textPath href="#rp" data-i18n-own="1" textLength="' + (Math.PI * 2 * rText * 0.98) + '">' + ringRep + '</textPath>',
      '</text>'
    ].join('');

    mk.style.top = (-r + (isMob ? r * 0.19 : r * 0.3)) + 'px';
    place();
  }

  // ===== 3D Cardistry Masterpiece: Vertical Spring, 360° Orbit, Snap-Flip & Riffle Wave =====
  var E = { on: false, t: 0, t0: 0, raf: 0, ui: [].slice.call(document.querySelectorAll('.top-row, .meta, .arr')), landed: false };
  var flipDeg = cards.map(function(){ return 0; }),
      tFlipDeg = cards.map(function(){ return 0; }),
      vFlipDeg = cards.map(function(){ return 0; }),
      riffleY = cards.map(function(){ return 0; }),
      vRiffleY = cards.map(function(){ return 0; }),
      riffleZ = cards.map(function(){ return 0; }),
      vRiffleZ = cards.map(function(){ return 0; });

  function eClamp(x) { return Math.max(0, Math.min(1, x)); }
  function eOut(x) { return 1 - Math.pow(1 - x, 4); }
  function eInOut(x) { return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2; }
  function eBack(x) { return 1 + 2.1 * Math.pow(x - 1, 3) + 1.1 * Math.pow(x - 1, 2); }
  function eRaw(ad) { return eClamp((E.t - (0.38 + ad * 0.11)) / 1.05); }
  function entrOp(ad) { return eClamp((E.t - ad * 0.04) / 0.35); }

  if (!reduce && document.documentElement.classList.contains('intro-on')) {
    E.on = true;
    cards.forEach(function(c){ c.classList.add('face-down'); });
    stage.style.transition = 'opacity .35s ease';
    E.ui.forEach(function(el){ el.style.transition = 'opacity .55s ease .45s'; });
    document.addEventListener('introdone', entrStart, { once: true });
  }
  function entrStart() {
    if (!E.on || E.raf) return;
    E.t0 = performance.now(); E.t = 0; E.landed = false;
    cards.forEach(function(c){ c.style.transition = 'none'; c.classList.add('face-down'); });
    stage.style.transformOrigin = '50% 45%';
    document.addEventListener('pointerdown', entrSkip, true);
    document.addEventListener('keydown', entrSkip, true);
    E.raf = requestAnimationFrame(entrFrame);
  }
  function entrSkip(e) { if (e.repeat || performance.now() - E.t0 < 750) return; entrEnd(); }
  function entrFrame(now) {
    E.t = (now - E.t0) / 1000;
    place();
    ring.style.opacity = eOut(eClamp((E.t - .15) / 1.35)).toFixed(3);
    mk.style.opacity = eClamp((E.t - 1.95) / .55).toFixed(3);
    stage.style.scale = (1 + .06 * (1 - eOut(eClamp(E.t / 2.6)))).toFixed(4);

    // Trigger landing shockwave & buddy jump when Hero "Me" card snaps into place
    if (!E.landed && E.t >= 2.08) {
      E.landed = true;
      if (window.__zkBgPulse) window.__zkBgPulse(1);
      if (window.__zkBuddyBounce) window.__zkBuddyBounce(-9.5);
      // Mexican riffle wave outward from center card to neighbors
      triggerRiffleWave(activeC >= 0 ? activeC : 2, 26);
    }

    var on = cards[activeC], sw = eClamp((E.t - 2.05) / 0.85);
    if (on && sw > 0 && sw < 1) { on.style.setProperty('--mx', (-20 + 140 * eOut(sw)).toFixed(1) + '%'); on.style.setProperty('--my', '18%'); }
    if (E.t >= 2.95) entrEnd(); else E.raf = requestAnimationFrame(entrFrame);
  }
  function entrEnd() {
    if (!E.on) return;
    E.on = false; cancelAnimationFrame(E.raf); E.raf = 0;
    document.removeEventListener('pointerdown', entrSkip, true);
    document.removeEventListener('keydown', entrSkip, true);
    cards.forEach(function(c){
      c.style.transition = '';
      c.classList.remove('face-down');
    });
    ring.style.opacity = ''; mk.style.opacity = '';
    var on = cards[activeC]; if (on) { on.style.removeProperty('--mx'); on.style.removeProperty('--my'); }
    stage.style.transition = ''; stage.style.scale = ''; stage.style.transformOrigin = '';
    E.ui.forEach(function(el){ el.style.transition = 'opacity .45s ease, transform .55s cubic-bezier(.22,1,.36,1)'; });
    setTimeout(function(){ E.ui.forEach(function(el){ el.style.transition = ''; }); }, 550);
    place();
  }

  function triggerRiffleWave(originIdx, power) {
    if (reduce) return;
    for (var i = 0; i < n; i++) {
      var dist = i - originIdx;
      dist = ((dist + n / 2) % n + n) % n - n / 2;
      var ad = Math.abs(dist);
      if (ad > 0 && ad <= 3.5) {
        (function(idx, d, absD){
          setTimeout(function(){
            var fall = Math.pow(0.68, absD);
            vRiffleY[idx] += (power || 22) * fall;
            vRiffleZ[idx] += (d > 0 ? 1 : -1) * 5.5 * fall;
            kickTilt();
          }, Math.round(absD * 55));
        })(i, dist, ad);
      }
    }
  }

  var farC = [], zC = [], activeC = -1, opC = [], tfC = [], backC = [], lastPos = pos;
  var tiltX = cards.map(function(){ return 0; }),
      tiltY = cards.map(function(){ return 0; }),
      tTiltX = cards.map(function(){ return 0; }),
      tTiltY = cards.map(function(){ return 0; }),
      vTiltX = cards.map(function(){ return 0; }),
      vTiltY = cards.map(function(){ return 0; }),
      tiltRaf = 0;

  function stepCardTilt() {
    var active = false;
    for (var i = 0; i < n; i++) {
      var dx = tTiltX[i] - tiltX[i], dy = tTiltY[i] - tiltY[i];
      vTiltX[i] = (vTiltX[i] + dx * 0.16) * 0.74;
      vTiltY[i] = (vTiltY[i] + dy * 0.16) * 0.74;
      tiltX[i] += vTiltX[i];
      tiltY[i] += vTiltY[i];

      // 3D Flip physics (for right-click / peek trick or riffle)
      var df = tFlipDeg[i] - flipDeg[i];
      vFlipDeg[i] = (vFlipDeg[i] + df * 0.15) * 0.75;
      flipDeg[i] += vFlipDeg[i];

      // Riffle wave bounce physics
      vRiffleY[i] = (vRiffleY[i] - riffleY[i] * 0.22) * 0.74;
      riffleY[i] += vRiffleY[i];
      vRiffleZ[i] = (vRiffleZ[i] - riffleZ[i] * 0.22) * 0.74;
      riffleZ[i] += vRiffleZ[i];

      if (Math.abs(dx) > 0.01 || Math.abs(dy) > 0.01 || Math.abs(vTiltX[i]) > 0.01 || Math.abs(vTiltY[i]) > 0.01 ||
          Math.abs(df) > 0.1 || Math.abs(vFlipDeg[i]) > 0.1 ||
          Math.abs(riffleY[i]) > 0.05 || Math.abs(vRiffleY[i]) > 0.05 || Math.abs(riffleZ[i]) > 0.05) {
        active = true;
      } else {
        tiltX[i] = tTiltX[i];
        tiltY[i] = tTiltY[i];
        flipDeg[i] = tFlipDeg[i];
        riffleY[i] = 0;
        riffleZ[i] = 0;
      }
    }
    place();
    if (active) tiltRaf = requestAnimationFrame(stepCardTilt);
    else tiltRaf = 0;
  }
  function kickTilt() {
    if (!tiltRaf && !reduce) tiltRaf = requestAnimationFrame(stepCardTilt);
  }

  function place() {
    var isMob = window.innerWidth <= 700;
    for (var i = 0; i < n; i++) {
      var c = cards[i];
      var d = i - pos;
      d = ((d + n / 2) % n + n) % n - n / 2;
      var jump = Math.abs(d - last[i]) > n / 2;
      last[i] = d;
      if (jump) {
        c.style.transition = 'none';
        (function(cc){
          requestAnimationFrame(function(){
            requestAnimationFrame(function(){ cc.style.transition = ''; });
          });
        })(c);
      }
      var absD = Math.abs(d);
      var s = 1 + (isMob ? 0.08 : 0.09) * Math.max(0, 1 - absD * (isMob ? 0.8 : 0.7));
      var fan = 1, arr = 1, toss = 0, liftE = 0, arcY = 0;
      var cardFlipY = flipDeg[i] || 0, cardPitchX = 0, orbitSpin = 0;

      if (E.on) {
        // Stage 1: Vertical Card Spring from bottom (0.0s -> 0.85s)
        var springOrder = (n - 1 - i) * 0.055;
        var spP = eOut(eClamp((E.t - springOrder) / 0.78));
        arr = spP;

        // Stage 2: 360° Mid-Air Tornado Orbit & Ribbon Spread (0.2s -> 1.75s)
        var orbP = eInOut(eClamp((E.t - 0.12 - springOrder * 0.6) / 1.52));
        orbitSpin = (1 - orbP) * -185; // Sweeps 185 deg around the wheel into position
        var rw = eRaw(absD);
        fan = eBack(rw);

        // S-Curve aerial spring height
        var springArc = Math.sin(Math.PI * eClamp((E.t - springOrder) / 1.15)) * lastW * 0.36;
        arcY = springArc + (absD > 0.5 ? Math.sin(Math.PI * rw) * lastW * 0.08 : 0);

        // Stage 3: Mexican Wave 3D Snap-Flip (Face-down 180° -> Face-up 0°)
        // Outer cards flip first, culminating in the center "Me" card hero double-flip!
        var flipStart = absD < 0.5 ? 1.38 : (0.92 + (3 - Math.min(3, absD)) * 0.14 + (d < 0 ? 0 : 0.05));
        var flipDur = absD < 0.5 ? 0.72 : 0.56;
        var flipP = eInOut(eClamp((E.t - flipStart) / flipDur));
        var startDeg = absD < 0.5 ? 360 : 180; // Center card does a full 360° showstopper flip, others 180° from back
        cardFlipY = (1 - flipP) * 180 + (absD < 0.5 ? (1 - flipP) * 180 : 0);

        // Mid-flip jump & aerodynamic pitch
        var flipArc = Math.sin(Math.PI * flipP);
        liftE = flipArc * lastW * (absD < 0.5 ? 0.24 : 0.13);
        cardPitchX = flipArc * (absD < 0.5 ? -18 : -11);
        toss = (d > 0 ? 1 : d < 0 ? -1 : 0) * 14 * Math.pow(1 - rw, 2) + (1 - orbP) * -18;

        // Glare sweep across the card back during flip
        c.style.setProperty('--cb-gx', (-70 + flipP * 160).toFixed(1) + '%');
      }

      // Toggle face-down class whenever total Y rotation shows the back of the card (> 90 deg)
      var totalY = (tiltY[i] || 0) + cardFlipY;
      var normY = ((totalY % 360) + 360) % 360;
      var isBack = normY > 90 && normY < 270;
      if (isBack !== backC[i]) {
        backC[i] = isBack;
        c.classList.toggle('face-down', isBack);
      }
      // Mirror horizontally when showing the back so the emblem isn't backwards, and keep front un-mirrored
      var renderY = isBack ? (totalY - 180) : totalY;

      var rx = (tiltX[i] || 0) + cardPitchX;
      var ry = renderY;
      var rz = (riffleZ[i] || 0);
      var has3D = Math.abs(rx) > 0.02 || Math.abs(ry) > 0.02 || Math.abs(rz) > 0.02;
      var tiltStr = has3D
        ? ' perspective(980px) rotateX(' + rx.toFixed(2) + 'deg) rotateY(' + ry.toFixed(2) + 'deg)' + (Math.abs(rz) > 0.02 ? ' rotateZ(' + rz.toFixed(2) + 'deg)' : '')
        : '';

      var totalYShift = -R - (lift[i] || 0) - (riffleY[i] || 0) - liftE - arcY + (1 - arr) * lastW * 0.55;
      var totalRot = d * step * fan + lean + orbitSpin;
      var totalScale = s * (E.on ? (0.84 + 0.16 * arr) * (0.94 + 0.06 * Math.min(1, fan)) : 1);

      var nextTf = 'rotate(' + totalRot.toFixed(2) + 'deg) translateY(' + totalYShift.toFixed(1) + 'px) scale(' + totalScale.toFixed(3) + ')' + (toss ? ' rotate(' + toss.toFixed(2) + 'deg)' : '') + tiltStr;
      if (nextTf !== tfC[i]) {
        tfC[i] = nextTf;
        c.style.transform = nextTf;
      }

      // Kartu muncul mulus saat berputar
      var op = Math.max(0, Math.min(1, 1 - Math.max(0, absD - (isMob ? 1.4 : 1.5)) * (isMob ? 0.52 : 0.44)));
      if (E.on) op *= entrOp(absD);
      if (Math.abs(op - (opC[i] || 0)) > 0.02) {
        opC[i] = op;
        c.style.opacity = op.toFixed(2);
      }
      var far = absD > (isMob ? 3.3 : 3.7);
      if (far !== farC[i]) {
        farC[i] = far;
        c.style.pointerEvents = far ? 'none' : 'auto';
        c.tabIndex = far ? -1 : 0;
      }
      var z = 25 - Math.round(absD * 3);
      if (z !== zC[i]) { zC[i] = z; c.style.zIndex = z; }
    }

    ring.style.transform = 'rotate(' + (-pos * step * 0.6 + (E.on ? (1 - eOut(eClamp(E.t / 2.4))) * -110 : 0)) + 'deg) scale(' + (E.on ? (.82 + .18 * eOut(eClamp(E.t / 1.8))).toFixed(4) : 1) + ')';
    var activeIdx = ((Math.round(pos) % n) + n) % n;
    if (activeIdx !== activeC) {
      var prevActive = activeC;
      var dir = pos >= lastPos ? 1 : -1;
      if (activeC >= 0) cards[activeC].classList.remove('on');
      cards[activeIdx].classList.add('on');
      activeC = activeIdx;
      var rawName = cards[activeIdx].getAttribute('data-n') || '';
      var curLang = (window.ZK && ZK.lang) || 'id';
      var dispName = (window.ZK && ZK.t && ZK.t(rawName, curLang)) || rawName;
      nm.textContent = dispName;
      if (window.__zkBuddyCardReact) window.__zkBuddyCardReact(activeIdx);
      if (window.__zkBgSetCard) window.__zkBgSetCard(activeIdx, cards[activeIdx]);
      if (prevActive >= 0 && window.__zkBgPulse) window.__zkBgPulse(dir);
      if (prevActive >= 0 && !reduce && mk.animate) {
        mk.animate([
          { transform: 'translateX(-50%) translateY(' + (dir * 7) + 'px)', opacity: 0.25 },
          { transform: 'translateX(-50%) translateY(0px)', opacity: 1 }
        ], { duration: 280, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' });
      }
    }
    if (window.__zkBuddyWheelLean && Math.abs(lean) > 0.05) {
      window.__zkBuddyWheelLean(lean * 2.6);
    }
    if (window.__zkBgWheelSync) {
      window.__zkBgWheelSync(pos, lean);
    }
    lastPos = pos;
  }

  function setPos(p) { pos = p; place(); }

  function syncCarouselLang() {
    var curLang = (window.ZK && ZK.lang) || 'id';
    if (activeC >= 0 && cards[activeC]) {
      var rawName = cards[activeC].getAttribute('data-n') || '';
      nm.textContent = (window.ZK && ZK.t && ZK.t(rawName, curLang)) || rawName;
    }
    var tp = ring && ring.querySelector('textPath');
    if (tp && window.__zkWORD) {
      var rw = window.__zkWORD[curLang] || window.__zkWORD.id || 'PORTOFOLIO';
      tp.textContent = [rw, rw, rw, rw, rw].join(' • ') + ' •';
    }
    if (cur >= 0) {
      var pv = (cur + n - 1) % n, nx = (cur + 1) % n;
      var pb = pgb.querySelector('.pnav button[data-go="-1"]');
      var nb = pgb.querySelector('.pnav button[data-go="1"]');
      if (pb) {
        var rPv = cards[pv].getAttribute('data-n') || '';
        pb.textContent = '\u25C2 ' + ((window.ZK && ZK.t && ZK.t(rPv, curLang)) || rPv);
      }
      if (nb) {
        var rNx = cards[nx].getAttribute('data-n') || '';
        nb.textContent = ((window.ZK && ZK.t && ZK.t(rNx, curLang)) || rNx) + ' \u25B8';
      }
    }
  }
  window.addEventListener('zk-lang', syncCarouselLang);

  // Spring physics responsif & cepat (putaran kartu gesit dan mantap)
  var raf = null;
  var afterSettle = null;
  function animateTo(t, v0, cb) {
    if (raf) cancelAnimationFrame(raf);
    afterSettle = cb || null;
    if (reduce) { lean = 0; setPos(t); if (afterSettle) { var f0 = afterSettle; afterSettle = null; f0(); } return; }
    var v = v0 || 0, lastT = performance.now();
    // Stiffness & critical damping tuned for butter-smooth 60fps response on Desktop & Mobile
    var k = 0.00048, c = 1.92 * Math.sqrt(k);
    stage.classList.add('moving');
    busy(true);
    function step(now) {
      var dt = Math.min(32, now - lastT);
      lastT = now;
      v += (k * (t - pos) - c * v) * dt;
      pos += v * dt;
      lean = Math.max(-4, Math.min(4, v * 380));
      place();
      if (afterSettle && Math.abs(t - pos) < 0.04) {
        var fn = afterSettle;
        afterSettle = null;
        fn();
      }
      if (Math.abs(t - pos) < 0.0025 && Math.abs(v) < 0.0003) {
        lean = 0;
        setPos(t);
        stage.classList.remove('moving');
        busy(false);
        raf = null;
        return;
      }
      raf = requestAnimationFrame(step);
    }
    raf = requestAnimationFrame(step);
  }
  function go(p) { animateTo(p, 0); }

  // Putaran bebas gesit dengan perlambatan presisi
  function spin(v0) {
    afterSettle = null;
    if (raf) cancelAnimationFrame(raf);
    var v = Math.max(-0.016, Math.min(0.016, v0)), lastT = performance.now(), tau = 480;
    stage.classList.add('moving');
    busy(true);
    function step(now) {
      var dt = Math.min(32, now - lastT);
      lastT = now;
      pos += v * dt;
      v *= Math.exp(-dt / tau);
      lean = Math.max(-3.5, Math.min(3.5, v * 320));
      place();
      if (Math.abs(v) < 0.0009) {
        raf = null;
        animateTo(Math.round(pos + v * 120), v);
        return;
      }
      raf = requestAnimationFrame(step);
    }
    raf = requestAnimationFrame(step);
  }
  function auto() {
    if (reduce) return;
    clearInterval(timer);
    timer = setInterval(function(){ go(Math.round(pos) + 1); }, 3400);
  }
  function stop() { clearInterval(timer); timer = null; }

  // Detail Pages Specification
  var pg = document.getElementById('pg'),
      pgb = document.getElementById('pgb'),
      cur = -1,
      hideT = null;

  var rowsC = function(items) {
    return '<div class="rows">' + items.map(function(item){
      return item;
    }).join('') + '</div>';
  };

  var PAGES = [
    // 0: Story (bacaan) -- 6 bab autentik perjalanan M. Zikri Al-Bukhori
    [
      '<img src="' + STORY_PHOTO + '" alt="Potret M. Zikri Al-Bukhori dengan sorot cahaya merah">',
      '<div class="st-root" data-i18n-own="1">' + [
        '<h2 class="st-h" data-t="h">Cerita Saya</h2>',
        '<p class="st-sub" data-t="sub">Perjalanan bertumbuh, belajar, dan menemukan arah di dunia pengembangan web &amp; desain antarmuka.</p>',
        '<p class="st-lead" data-t="lead">Dari masa kecil di Medan hingga terjun langsung ke dunia industri perangkat lunak — berikut adalah bab-bab nyata yang membentuk disiplin, rasa ingin tahu, dan karya saya hari ini.</p>',
        '<div class="st-wrap"><svg class="st-thread" aria-hidden="true"></svg><ol class="st-life" aria-label="Garis waktu cerita saya">' +
          '<li class="st-ch" data-m="0.18"><div class="st-hd"><span class="st-n" aria-hidden="true">01</span><span class="st-when" data-t="c1w">2011 · Medan</span></div><h3 data-t="c1t">Akar &amp; Pencapaian Awal</h3><p data-t="c1p1">Lahir pada tahun 2011 di Medan, Sumatera Utara, dan tumbuh dikelilingi kehangatan keluarga besar ayah maupun ibu sebagai cucu pertama dari kedua belah pihak.</p><p data-t="c1p2">Salah satu momen paling berkesan di masa kecil adalah meraih Juara 1 Lomba Tahfidz Tingkat Kota pada usia enam tahun — pelajaran pertama bahwa fokus dan ketekunan akan membuahkan hasil nyata.</p></li>' +
          '<li class="st-ch" data-m="-0.32"><div class="st-hd"><span class="st-n" aria-hidden="true">02</span><span class="st-when" data-t="c2w">Masa Sekolah</span></div><h3 data-t="c2t">Fondasi Karakter &amp; Akademik</h3><p data-t="c2p1">Menempuh pendidikan dasar di MIS Aisyiyah Sumatera Utara dan melanjutkan jenjang menengah pertama di MTs Aisyiyah Sumatera Utara.</p><p data-t="c2p2">Fase ini membentuk kedisiplinan, daya juang untuk bangkit dari masa-masa sulit, persahabatan yang erat, serta ketertarikan awal terhadap cara kerja antarmuka digital.</p></li>' +
          '<li class="st-ch" data-m="0.38"><div class="st-hd"><span class="st-n" aria-hidden="true">03</span><span class="st-when" data-t="c3w">Pendidikan Vokasi</span></div><h3 data-t="c3t">Melangkah ke Dunia Web di SMK Swasta Mandiri</h3><p data-t="c3p1">Melanjutkan pendidikan ke SMK Swasta Mandiri di Medan, tempat rasa penasaran berubah menjadi praktik teknis yang terarah.</p><p data-t="c3p2">Di sini saya mulai mendalami rekayasa web, belajar berpikir mandiri, berani bereksperimen, dan menemukan jalur yang ingin saya tekuni di bidang pengembangan front-end.</p></li>' +
          '<li class="st-ch" data-m="-0.25"><div class="st-hd"><span class="st-n" aria-hidden="true">04</span><span class="st-when" data-t="c4w">Eksplorasi Mandiri</span></div><h3 data-t="c4t">Mendalami Kode, Animasi &amp; Desain UI</h3><p data-t="c4p1">Mengasah struktur HTML5 semantik, arsitektur CSS3 modern dan Tailwind CSS, logika JavaScript (ES6+), serta koreografi animasi dengan GSAP dan Anime.js.</p><p data-t="c4p2">Menyadari bahwa produk digital yang baik menuntut keseimbangan antara ketajaman estetika visual dan kode yang cepat, bersih, serta nyaman diakses di setiap layar.</p></li>' +
          '<li class="st-ch is-now" data-m="0.45"><div class="st-hd"><span class="st-n" aria-hidden="true">05</span><span class="st-when" data-t="c5w">Tahun ke-2 SMK · Industri</span></div><h3 data-t="c5t">Praktik Kerja Lapangan (PKL) di DigitalCODE</h3><p data-t="c5p1">Saat ini berada di tahun kedua SMK dan tengah menjalani pengalaman Praktik Kerja Lapangan (PKL) pertama di perusahaan DigitalCODE.</p><p data-t="c5p2">Terjun ke lingkungan kerja nyata mempertajam alur kerja saya — menerjemahkan teori yang dipelajari di sekolah menjadi antarmuka web fungsional dengan standar produksi.</p></li>' +
          '<li class="st-ch is-next" data-m="1.0"><div class="st-hd"><span class="st-n" aria-hidden="true">06</span><span class="st-when" data-t="c6w">Hari Ini &amp; Visi</span></div><h3 data-t="c6t">Fokus Saat Ini &amp; Langkah Berikutnya</h3><p data-t="c6p1">Merancang halaman depan responsif, sistem UI interaktif, dan pengalaman web modern dari Medan sembari terus memperdalam React, Vue, serta alur kerja berbasis AI.</p><p data-t="c6p2">Terbuka untuk proyek kerja lepas, kolaborasi kreatif, dan kontribusi dalam membangun produk digital yang berkarakter.</p></li>' +
        '</ol></div>',
        '<div class="st-end"><p><strong data-t="e1">Terus belajar, berinovasi, dan berkembang.</strong></p><p data-t="e2">Setiap baris kode adalah langkah untuk menjadi lebih baik.</p>' +
        '<div class="st-cta-row"><button type="button" class="st-cta-btn pri" data-goto="5" data-t="ctaProj">Lihat Proyek Unggulan &#8599;</button><button type="button" class="st-cta-btn sec" data-goto="6" data-t="ctaContact">Hubungi Saya &#8599;</button></div></div>'
      ].join('') + '</div>'
    ],

    // 1: Music -- Studio Synth + MP3 Turntable
    ['<i class="mg"></i><svg class="mw" viewBox="0 0 1200 800" preserveAspectRatio="none" aria-hidden="true"><defs><linearGradient id="mwl" x1="0" x2="1" y1="0" y2="0"><stop offset="0" stop-color="#e0463a" stop-opacity="0"/><stop offset=".25" stop-color="#e0463a" stop-opacity=".9"/><stop offset=".75" stop-color="#e0463a" stop-opacity=".55"/><stop offset="1" stop-color="#e0463a" stop-opacity="0"/></linearGradient></defs><g fill="none" stroke="url(#mwl)" vector-effect="non-scaling-stroke"><path class="ln" style="--i:0;opacity:0.35" stroke-width="1.6" d="M1250 600 C 1020 570, 860 550, 640 500 S 240 290, -60 330"/><path class="ln" style="--i:1;opacity:0.47" stroke-width="1" d="M1250 609 C 1020 579, 860 570, 640 520 S 240 324, -60 364"/><path class="ln" style="--i:2;opacity:0.59" stroke-width="1" d="M1250 618 C 1020 588, 860 590, 640 540 S 240 358, -60 398"/><path class="ln" style="--i:3;opacity:0.71" stroke-width="1.6" d="M1250 627 C 1020 597, 860 610, 640 560 S 240 392, -60 432"/><path class="ln" style="--i:4;opacity:0.35" stroke-width="1" d="M1250 636 C 1020 606, 860 630, 640 580 S 240 426, -60 466"/><path class="ln" style="--i:5;opacity:0.47" stroke-width="1" d="M1250 645 C 1020 615, 860 650, 640 600 S 240 460, -60 500"/><path class="ln" style="--i:6;opacity:0.59" stroke-width="1.6" d="M1250 654 C 1020 624, 860 670, 640 620 S 240 494, -60 534"/><path class="ln" style="--i:7;opacity:0.71" stroke-width="1" d="M1250 663 C 1020 633, 860 690, 640 640 S 240 528, -60 568"/><path class="ln" style="--i:8;opacity:0.35" stroke-width="1" d="M1250 672 C 1020 642, 860 710, 640 660 S 240 562, -60 602"/><path class="ln" style="--i:9;opacity:0.47" stroke-width="1.6" d="M1250 681 C 1020 651, 860 730, 640 680 S 240 596, -60 636"/><path class="ln" style="--i:10;opacity:0.59" stroke-width="1" d="M1250 690 C 1020 660, 860 750, 640 700 S 240 630, -60 670"/><path class="ln" style="--i:11;opacity:0.71" stroke-width="1" d="M1250 699 C 1020 669, 860 770, 640 720 S 240 664, -60 704"/><path class="ln" style="--i:12;opacity:0.35" stroke-width="1.6" d="M1250 708 C 1020 678, 860 790, 640 740 S 240 698, -60 738"/><path class="ln" style="--i:13;opacity:0.47" stroke-width="1" d="M1250 717 C 1020 687, 860 810, 640 760 S 240 732, -60 772"/></g></svg><i class="mn"></i><i class="dim"></i><span class="ghost" id="ghost" aria-hidden="true"></span><img class="cut" src="' + MUSIC_CUT + '" alt="M. Zikri bermain gitar"><i class="lamp"></i><i class="sweep"></i><canvas class="dust" aria-hidden="true"></canvas>', '<div class="me-top"><span class="me-k">Playlist · 06 lagu</span></div><h2 class="pt">Lagi sering<br><em>kuputar.</em></h2><p class="pl-sub">Enam lagu yang lagi nempel di kepala.</p><ol class="pl" id="plist"></ol>'],

    // 2: About (Zikri) — Haldoren-style "Laptop Dive" One-Screen Portfolio Hero
    [
      '',
      '<div class="me-dive md-js" data-i18n-own="1" role="region" aria-label="Profil M. Zikri Al-Bukhori — Studio &amp; Portfolio">' +
        '<div class="md-stage">' +
          '<div class="md-frame d-fade">' +
            '<img class="md-plate md-masked" src="assets/images/me-studio-plate.webp" alt="" draggable="false" decoding="async">' +
            '<div class="md-studio-glow" aria-hidden="true"></div>' +
            '<svg class="md-wm md-pre" viewBox="0 0 1440 295" preserveAspectRatio="none" aria-hidden="true">' +
              '<defs>' +
                '<linearGradient id="mdWmGrad" x1="0" y1="0" x2="0" y2="1">' +
                  '<stop offset="0" stop-color="#ffffff" stop-opacity="1"/>' +
                  '<stop offset="0.5" stop-color="#f1f5f3" stop-opacity="0.9"/>' +
                  '<stop offset="1" stop-color="#d7e6de" stop-opacity="0.28"/>' +
                '</linearGradient>' +
              '</defs>' +
              '<text x="14" y="250" textLength="1412" lengthAdjust="spacingAndGlyphs" fill="url(#mdWmGrad)">ZIKRI</text>' +
            '</svg>' +
            '<div class="md-cut-wrap md-pre">' +
              '<img class="md-cut" src="assets/images/gallery-hero.webp" alt="M. Zikri Al-Bukhori" draggable="false" decoding="async">' +
            '</div>' +
            '<div class="md-badge md-pre">' +
              '<svg class="md-badge-art" viewBox="0 0 582 1030" fill="none" aria-hidden="true">' +
                '<defs>' +
                  '<linearGradient id="mdStrapL" x1="0" y1="0" x2="1" y2="0">' +
                    '<stop offset="0%" stop-color="#d9e0dd"/>' +
                    '<stop offset="30%" stop-color="#f7faf8"/>' +
                    '<stop offset="70%" stop-color="#eef3f0"/>' +
                    '<stop offset="100%" stop-color="#c6d0cc"/>' +
                  '</linearGradient>' +
                  '<linearGradient id="mdStrapR" x1="0" y1="0" x2="1" y2="0">' +
                    '<stop offset="0%" stop-color="#c4ceca"/>' +
                    '<stop offset="45%" stop-color="#f2f6f4"/>' +
                    '<stop offset="100%" stop-color="#d2dad6"/>' +
                  '</linearGradient>' +
                  '<linearGradient id="mdMetal" x1="0" y1="0" x2="1" y2="1">' +
                    '<stop offset="0%" stop-color="#f4f8f6"/>' +
                    '<stop offset="35%" stop-color="#b4bfba"/>' +
                    '<stop offset="68%" stop-color="#707a76"/>' +
                    '<stop offset="100%" stop-color="#dbe3df"/>' +
                  '</linearGradient>' +
                  '<filter id="mdBadgeSh" x="-15%" y="-8%" width="130%" height="120%">' +
                    '<feDropShadow dx="0" dy="22" stdDeviation="18" flood-color="#04180f" flood-opacity="0.46"/>' +
                  '</filter>' +
                '</defs>' +
                '<g filter="url(#mdBadgeSh)">' +
                  '<polygon points="222,0 264,0 294,370 262,370" fill="url(#mdStrapL)"/>' +
                  '<polygon points="354,0 312,0 286,370 318,370" fill="url(#mdStrapR)"/>' +
                  '<rect x="256" y="346" width="68" height="28" rx="6" fill="url(#mdMetal)" stroke="#5b6561" stroke-width="1.5"/>' +
                  '<circle cx="290" cy="390" r="16" fill="none" stroke="url(#mdMetal)" stroke-width="7"/>' +
                  '<path d="M278 400 L302 400 L306 436 C306 446 298 452 290 452 C282 452 274 446 274 436 Z" fill="url(#mdMetal)" stroke="#5c6662" stroke-width="1.5"/>' +
                  '<rect x="283" y="446" width="14" height="36" rx="7" fill="url(#mdMetal)" stroke="#5c6662" stroke-width="1.4"/>' +
                  '<rect x="152" y="468" width="278" height="484" rx="18" fill="rgba(232,244,238,0.18)" stroke="rgba(255,255,255,0.46)" stroke-width="2.5"/>' +
                  '<rect x="160" y="476" width="262" height="468" rx="13" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.22)" stroke-width="1.2"/>' +
                  '<rect x="248" y="492" width="84" height="16" rx="8" fill="#0d3726" stroke="rgba(255,255,255,0.45)" stroke-width="1.5"/>' +
                  '<circle cx="192" cy="500" r="5" fill="#0d3726" opacity="0.55"/>' +
                  '<circle cx="388" cy="500" r="5" fill="#0d3726" opacity="0.55"/>' +
                '</g>' +
              '</svg>' +
              '<img class="md-badge-img" alt="" draggable="false" decoding="async">' +
              '<div class="md-card">' +
                '<h4>DESIGNER<br>CARD</h4>' +
                '<span class="md-yr">2026</span>' +
                '<div class="md-role">FRONT-END // UI DESIGNER</div>' +
                '<div class="md-ph" aria-hidden="true"></div>' +
                '<div class="md-row"><span>NAME</span><b>M. ZIKRI</b></div>' +
                '<div class="md-row"><span>FOCUS</span><b>FRONT-END &amp; UI</b></div>' +
                '<div class="md-row"><span>WORK</span><b>PKL DIGITALCODE</b></div>' +
                '<div class="md-row"><span>WEB</span><b>TRYNVEXA.GITHUB.IO</b></div>' +
              '</div>' +
              '<div class="md-card-glare" aria-hidden="true"></div>' +
              '<div class="md-hit" aria-hidden="true"></div>' +
            '</div>' +
            '<div class="md-script md-pre" aria-hidden="true">front-end &amp; ui</div>' +
            '<video class="md-trans md-masked" muted playsinline preload="auto" aria-hidden="true"></video>' +
            '<video class="md-trans-rev md-masked" muted playsinline preload="auto" aria-hidden="true"></video>' +
            '<img class="md-caseplate md-masked" alt="" draggable="false" decoding="async" aria-hidden="true">' +
            '<div class="md-laptop-rig md-pre">' +
              '<div class="md-laptop-shell" aria-hidden="true">' +
                '<div class="md-laptop-shadow"></div>' +
                '<div class="md-lid"><div class="md-lid-glint"></div></div>' +
                '<div class="md-hinge"></div>' +
                '<div class="md-deck"></div>' +
              '</div>' +
              '<div class="md-screen">' +
                '<div class="md-screen-inner">' +
                '<div class="md-screen-idle" aria-hidden="true">' +
                  '<div class="md-idle-top"><div class="md-idle-dots"><i></i><i></i><i></i></div><span>STUDIO // 2026</span></div>' +
                  '<div class="md-idle-mid"><span>dive into</span>ZIKRI WORK</div>' +
                  '<div class="md-idle-foot"><span>MEDAN &bull; WIB</span><span>04 CASES &rarr;</span></div>' +
                '</div>' +
                '<div class="md-slide" data-case="0">' +
                  '<div class="md-reel"><img src="assets/images/project-mono.webp" alt="Mono Living — Hunian Modular" draggable="false" decoding="async"></div>' +
                  '<div class="md-reel-dock"><span class="md-reel-url"><i></i>v0-mono-ecommerce.vercel.app</span><a class="md-reel-live" href="https://v0-mono-ecommerce.vercel.app/" target="_blank" rel="noopener noreferrer">Live Demo &#8599;</a></div>' +
                '</div>' +
                '<div class="md-slide" data-case="1">' +
                  '<div class="md-reel"><img src="assets/images/project-gigi.webp" alt="GiGi Energy — Minuman Energi" loading="lazy" draggable="false" decoding="async"></div>' +
                  '<div class="md-reel-dock"><span class="md-reel-url"><i></i>gigi-energy.vercel.app</span><a class="md-reel-live" href="https://modern-gen-z-energy-drink-landi-six-eta.vercel.app/" target="_blank" rel="noopener noreferrer">Live Demo &#8599;</a></div>' +
                '</div>' +
                '<div class="md-slide" data-case="2">' +
                  '<div class="md-reel"><img src="assets/images/project-compute.webp" alt="Compute AI — Platform Agen AI" loading="lazy" draggable="false" decoding="async"></div>' +
                  '<div class="md-reel-dock"><span class="md-reel-url"><i></i>compute-ai.vercel.app</span><a class="md-reel-live" href="https://compute-the-platform-to-build-psi-tan.vercel.app/" target="_blank" rel="noopener noreferrer">Live Demo &#8599;</a></div>' +
                '</div>' +
                '<div class="md-slide" data-case="3">' +
                  '<div class="md-reel"><img src="assets/images/project-sweet.jpg" alt="Sweet Heaven — Toko Kue Artisan" loading="lazy" draggable="false" decoding="async"></div>' +
                  '<div class="md-reel-dock"><span class="md-reel-url"><i></i>trynvexa.github.io/toko-kue</span><a class="md-reel-live" href="https://trynvexa.github.io/toko-kue/" target="_blank" rel="noopener noreferrer">Live Demo &#8599;</a></div>' +
                '</div>' +
                '<div class="md-flash" aria-hidden="true"></div>' +
                '</div>' +
              '</div>' +
              '<button type="button" class="md-laptop-hero-hit" aria-label="Masuk ke layar laptop untuk melihat profil dan karya"></button>' +
            '</div>' +
          '</div>' +
        '</div>' +
        '<div class="md-ui">' +
          '<button type="button" class="md-tag t1 md-pre">&larr; beranda</button>' +
          '<button type="button" class="md-tag t2 md-pre">portfolio</button>' +
          '<button type="button" class="md-tag t3 md-pre">proyek</button>' +
          '<button type="button" class="md-tag t4 md-pre">kontak</button>' +
          '<button type="button" class="md-logo" aria-label="Kembali ke studio">ZIKRI</button>' +
          '<svg class="md-m-wm md-m-only md-pre" viewBox="0 0 1440 310" aria-hidden="true">' +
            '<defs>' +
              '<linearGradient id="mdWmGradM" x1="0" y1="0" x2="0" y2="1">' +
                '<stop offset="0" stop-color="#ffffff" stop-opacity="1"/>' +
                '<stop offset="0.5" stop-color="#f1f5f3" stop-opacity="0.9"/>' +
                '<stop offset="1" stop-color="#d7e6de" stop-opacity="0.3"/>' +
              '</linearGradient>' +
            '</defs>' +
            '<text x="10" y="266" textLength="1420" lengthAdjust="spacingAndGlyphs" fill="url(#mdWmGradM)">ZIKRI</text>' +
          '</svg>' +
          '<div class="md-m-script md-m-only md-pre" aria-hidden="true">front-end &amp; ui</div>' +
          '<div class="md-m-badge md-m-only" aria-hidden="true"></div>' +
          '<button type="button" class="md-hint md-pre"><i class="md-hint-line" aria-hidden="true"></i><span>scroll ke dalam karya</span></button>' +
          '<aside class="md-ticket" aria-live="polite">' +
            '<i class="md-hole tl" aria-hidden="true"></i>' +
            '<i class="md-hole tr" aria-hidden="true"></i>' +
            '<i class="md-hole bl" aria-hidden="true"></i>' +
            '<i class="md-hole br" aria-hidden="true"></i>' +
            '<h2>MONO LIVING</h2>' +
            '<div class="md-rows"><div>MODULAR HOUSING</div><div>FRONT-END &amp; UI</div><div>2026</div></div>' +
          '</aside>' +
          '<div class="md-desc">' +
            '<div class="md-k">// mono living</div>' +
            '<p>&mdash; landing page hunian modular dengan tipografi raksasa yang ditimpa arsitektur baja di tepi air.</p>' +
            '<div class="md-num">01 / 04</div>' +
            '<a class="md-desc-live" href="https://v0-mono-ecommerce.vercel.app/" target="_blank" rel="noopener noreferrer">Live Demo &#8599;</a>' +
          '</div>' +
          '<button type="button" class="md-nav-case prev dim" aria-label="Slide sebelumnya">' +
            '<span class="md-c" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M19 12H5M11 6l-6 6 6 6"/></svg></span>' +
            '<span class="md-lbl">slide <br>sebelumnya</span>' +
          '</button>' +
          '<button type="button" class="md-nav-case next" aria-label="Slide berikutnya">' +
            '<span class="md-c" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg></span>' +
            '<span class="md-lbl">slide <br>berikutnya</span>' +
          '</button>' +
        '</div>' +
      '</div>'
    ],

    // 3: Galeri Foto
    [
      '',
      '<div class="ghead">' +
        '<div class="ghead-l"><span class="me-k">Arsip Visual · 08 Potret</span><h2 class="pt">Frame</h2></div>' +
        '<div class="gview-bar" role="group" aria-label="Mode tampilan galeri">' +
          '<button type="button" class="gview-btn on" data-gview="ring" aria-pressed="true">Cincin 3D</button>' +
          '<button type="button" class="gview-btn" data-gview="grid" aria-pressed="false">Grid Editorial</button>' +
        '</div>' +
      '</div>' +
      galScene() +
      (!GAL.length ? '' : '<p class="gal-k">' + galPad(GAL.length) + ' foto</p>' +
      '<div class="rail">' + GAL.map(function(src, i){
        return '<button type="button" class="gc" data-i="' + i + '" style="--i:' + i + ';--op:' + GAL_OP[i] + '" aria-label="Buka foto ' + (i + 1) + ' dari ' + GAL.length + '">' +
          '<img alt="Foto ' + (i + 1) + '" draggable="false" decoding="async" src="' + src + '"><em>' + galPad(i + 1) + '</em></button>';
      }).join('') + '</div>' +
      '<div class="rail-bar"><div class="rail-p">' + GAL.map(function(_, i){ return '<i' + (i === 0 ? ' class="on"' : '') + '></i>'; }).join('') + '</div>' +
      '<div class="rail-ar"><button type="button" class="rail-a" data-d="-1" aria-label="Foto sebelumnya"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg></button>' +
      '<button type="button" class="rail-a" data-d="1" aria-label="Foto berikutnya"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7"/></svg></button></div></div>')
    ],

    // 4: Skill & Keahlian (karakter + cincin skill interaktif)
    [
      '<div class="sk-stage">' + '<img class="skill-fig" alt="" draggable="false" decoding="async" src="assets/images/skill-fig.webp">' + SKR.ring + '</div>',
      SKR.ui
    ],

    // 5: Proyek — Zikri's Depot (3D Container-Crane + Case Study Modal)
    [
      '',
      '<div class="dp-stage" data-i18n-own="1" role="region" aria-label="Zikri’s Depot — Proyek">' +
        '<div class="dp-word" aria-hidden="true"><span id="dpWord" class="dp-rv">PROYEK</span></div>' +
        '<canvas id="dpGl" class="dp-gl"></canvas>' +
        '<article id="dpCard" class="dp-card" aria-live="polite"></article>' +
        '<header class="dp-nav">' +
          '<button type="button" id="dpLogo" class="dp-logo dp-rv" data-close aria-label="Kembali ke beranda">zikri</button>' +
          '<div class="dp-nav-acts">' +
            '<button type="button" id="dpHome" class="dp-nav-link dp-rv" data-close aria-label="Kembali ke daftar kartu">&larr; Beranda</button>' +
            '<button type="button" id="dpTalk" class="dp-nav-link dp-rv" data-jump="6" aria-label="Buka halaman Kontak">Hubungi &#8599;</button>' +
          '</div>' +
        '</header>' +
        '<div id="dpPill" class="dp-pill dp-rv" aria-hidden="true">PILIH KONTAINER &darr;</div>' +
        '<p id="dpEyebrow" class="dp-eyebrow dp-rv">ZIKRI’S DEPOT &middot; 7 KONTAINER &middot; 2026</p>' +
        '<nav id="dpMenu" class="dp-sr" aria-label="Pilih kontainer proyek"></nav>' +
        '<div id="dpModal" class="dp-modal" hidden role="dialog" aria-modal="true" aria-label="Detail Studi Kasus">' +
          '<div id="dpModalPanel" class="dp-modal-panel"></div>' +
        '</div>' +
      '</div>'
    ],

    // 6: Kontak — PAPER RIOT / Edisi 06
    [
      (function(){
        var s = '', i;
        for (i = 0; i < 12; i++) s += '<i style="--i:' + i + '"></i>';
        return '<i class="pr-halftone" aria-hidden="true"></i>' +
          '<i class="pr-fiber" aria-hidden="true"></i>' +
          '<i class="pr-big" aria-hidden="true">06</i>' +
          '<i class="pr-ring r1" aria-hidden="true"></i>' +
          '<i class="pr-ring r2" aria-hidden="true"></i>' +
          '<i class="pr-reg c1" aria-hidden="true">+</i>' +
          '<i class="pr-reg c2" aria-hidden="true">+</i>' +
          '<i class="pr-reg c3" aria-hidden="true">+</i>' +
          '<i class="pr-reg c4" aria-hidden="true">+</i>' +
          '<i class="pr-press" aria-hidden="true">' + s + '</i>' +
          '<i class="pr-noise" aria-hidden="true"></i>';
      })(),
      `<div class="pr-paper" data-i18n-own="1">
        <div class="pr-grid">
          <div class="pr-l">
            <div class="pr-meta pr-rev" style="--d:.2">
              <span class="pr-kick" data-kt="kicker">EDISI 06 — KONTAK</span>
              <span class="pr-place"><span data-kt="loc">MEDAN, INDONESIA — WIB</span><time class="pr-clock">11.40</time></span>
            </div>
            <h2 class="pr-h">
              <span class="pr-h1" data-kt="h1" data-kinetic>ADA PROYEK?</span>
              <span class="pr-h2" data-kt="h2">Mari bicara.</span>
            </h2>
            <p class="pr-p pr-rev" style="--d:.32" data-kt="p">Freelance, kolaborasi, atau sekadar bertukar pikiran seputar web dan desain antarmuka — semuanya terbuka. Ceritakan idemu, sekecil apa pun.</p>
            <div class="pr-cta pr-rev" style="--d:.42">
              <a class="pr-mail wa-btn" href="https://wa.me/6281367381826?text=Halo%20Zikri,%20saya%20tertarik%20bekerja%20sama%20dengan%20Anda" target="_blank" rel="noopener noreferrer">
                <span class="pr-mail-l"><small data-kt="fast">RESPONS CEPAT</small><b data-kt="waChat">Chat Langsung via WhatsApp</b></span>
                <span class="pr-mail-ar" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M7 17L17 7M8 7h9v9"/></svg></span>
              </a>
              <div class="pr-email-row">
                <a class="pr-mail email-sub-btn" href="mailto:zikriganteng2023@gmail.com?subject=Proyek%20baru%20%E2%80%94%20dari%20portofolio">
                  <span class="pr-mail-l"><small data-kt="send">TULIS EMAIL</small><b>zikriganteng2023@gmail.com</b></span>
                  <span class="pr-mail-ar" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M7 17L17 7M8 7h9v9"/></svg></span>
                </a>
                <button type="button" class="pr-copy-btn" id="copyEmailBtn" data-ka="copyMailAria" aria-label="Salin alamat email">
                  <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                  <span data-kt="copyMail">Salin Email</span>
                </button>
              </div>
            </div>
            <div class="pr-composer pr-rev" style="--d:.5">
              <div class="prc-head">
                <span class="prc-k" data-kt="compTitle">KIRIM PESAN CEPAT</span>
                <div class="prc-topics" role="group" data-ka="topicAria" aria-label="Pilih topik diskusi">
                  <button type="button" class="prc-topic on" aria-pressed="true" data-kt="tWeb">Proyek Web</button>
                  <button type="button" class="prc-topic" aria-pressed="false" data-kt="tUi">Desain UI/UX</button>
                  <button type="button" class="prc-topic" aria-pressed="false" data-kt="tCollab">Kolaborasi</button>
                </div>
              </div>
              <div class="prc-fields">
                <input type="text" id="prcName" class="prc-input" placeholder="Nama Anda" data-ka="compName" aria-label="Nama Anda">
                <input type="text" id="prcMsg" class="prc-input" placeholder="Ceritakan singkat proyek atau ide Anda..." data-ka="compMsg" aria-label="Pesan singkat Anda">
              </div>
              <div class="prc-actions">
                <button type="button" class="prc-send wa" id="prcWaBtn" data-kt="compWa">Kirim ke WhatsApp &#8599;</button>
                <button type="button" class="prc-send mail" id="prcMailBtn" data-kt="compMail">Kirim via Email &#8599;</button>
              </div>
            </div>
            <blockquote class="pr-quote pr-rev" style="--d:.58">
              <p data-kt="quote">“Terlalu banyak ide, terlalu sedikit waktu. Mari mulai dari milikmu.”</p>
              <cite data-kt="attrib">— Zikri, Medan</cite>
            </blockquote>
          </div>
          <aside class="pr-r">
            <div class="pass-stage" id="passStage">
              <!-- Kartu 3D Holographic Interaktif (Bebas Melayang & Berotasi Bebas) -->
              <div class="pass-card" id="passCard" tabindex="0" role="region" data-ka="passAria" aria-label="Kartu Identitas 3D Interaktif M. Zikri (Geser untuk memutar)">
                <!-- Lapisan Kilau Holografik Pelangi -->
                <div class="pass-glare" aria-hidden="true"></div>

                <!-- SISI DEPAN (FRONT) -->
                <div class="pass-face pass-front">
                  <div class="pass-hologram-bg" aria-hidden="true"></div>

                  <!-- Official Credential Header (Anti-AI-Slop: NO 'AVAILABLE') -->
                  <div class="pass-header-strip">
                    <div class="pass-accred-left">
                      <span class="pass-kicker" data-kt="passKicker">EDISI 06 &bull; KARTU AKSES</span>
                      <span class="pass-subkicker" data-kt="passSubkicker">MEDAN, ID (WIB)</span>
                    </div>
                    <div class="pass-accred-right">
                      <span class="pass-clearance" data-kt="passClearance">AKSES PENUH</span>
                      <span class="pass-serial-no">#ZK-2026-06</span>
                    </div>
                  </div>

                  <!-- Frame Foto Identitas Presisi -->
                  <div class="pass-photo-wrap">
                    <span class="photo-corner tl" aria-hidden="true"></span>
                    <span class="photo-corner tr" aria-hidden="true"></span>
                    <span class="photo-corner bl" aria-hidden="true"></span>
                    <span class="photo-corner br" aria-hidden="true"></span>

                    <div class="pass-photo-inner">
                      <img class="pass-img" alt="M. Zikri Al-Bukhori" src="__KT_IMG__" draggable="false" decoding="async">
                      <div class="pass-photo-overlay" aria-hidden="true"></div>
                    </div>

                    <!-- 3D Gold Security EMV Chip (Kiri Bawah Foto) -->
                    <div class="pass-chip" aria-hidden="true">
                      <span class="chip-line c1"></span>
                      <span class="chip-line c2"></span>
                      <span class="chip-line c3"></span>
                      <span class="chip-core"></span>
                    </div>

                    <!-- Segel Hologram Keamanan Medallion (Kanan Bawah Foto) -->
                    <div class="pass-hologram-seal" aria-hidden="true">
                      <svg viewBox="0 0 44 44" class="seal-svg">
                        <circle cx="22" cy="22" r="20" fill="none" stroke="currentColor" stroke-dasharray="2 1.5" stroke-width="1"/>
                        <circle cx="22" cy="22" r="16" fill="none" stroke="currentColor" stroke-width="0.8"/>
                        <polygon points="22,7 26,17 37,17 28,24 31,34 22,28 13,34 16,24 7,17 18,17" fill="none" stroke="currentColor" stroke-width="0.8"/>
                        <circle cx="22" cy="22" r="4" fill="currentColor" opacity="0.3"/>
                      </svg>
                      <span class="seal-text" data-kt="passVerified">TERVERIFIKASI</span>
                    </div>
                  </div>

                  <!-- Data Identitas Kredensial -->
                  <div class="pass-info">
                    <div class="pass-identity-row">
                      <h3 class="pass-name">M. ZIKRI AL-BUKHORI</h3>
                      <span class="pass-id-badge" data-kt="passAuth">RESMI</span>
                    </div>
                    <p class="pass-role-line" data-kt="passRole">PENGEMBANG FRONT-END &bull; DESAINER UI</p>

                    <!-- Technical Credential Specs Grid -->
                    <div class="pass-spec-grid">
                      <div class="pass-spec-box">
                        <span class="spec-k" data-kt="specInst">INSTITUSI</span>
                        <span class="spec-v">SMK MANDIRI</span>
                      </div>
                      <div class="pass-spec-box">
                        <span class="spec-k" data-kt="specPkl">UNIT PKL</span>
                        <span class="spec-v">DIGITALCODE</span>
                      </div>
                      <div class="pass-spec-box">
                        <span class="spec-k" data-kt="specBase">BASIS</span>
                        <span class="spec-v" data-kt="specMedan">MEDAN (WIB)</span>
                      </div>
                    </div>
                  </div>

                  <!-- Tombol Aksi Langsung -->
                  <div class="pass-actions">
                    <a class="pass-act-btn wa" href="https://wa.me/6281367381826?text=Halo%20Zikri,%20saya%20tertarik%20bekerja%20sama%20dengan%20Anda" target="_blank" rel="noopener noreferrer">
                      <div class="act-btn-ic">
                        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2C6.48 2 2 6.48 2 12c0 1.93.55 3.73 1.5 5.26L2 22l4.89-1.46C8.36 21.48 10.12 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm4.95 13.92c-.22.62-1.28 1.18-1.78 1.25-.47.07-1.07.1-3.23-.79-2.61-1.07-4.27-3.74-4.4-3.92-.13-.17-1.06-1.41-1.06-2.69 0-1.28.67-1.91.91-2.17.24-.26.53-.33.71-.33.18 0 .36 0 .52.01.17.01.4.07.62.6.24.58.82 2 .89 2.15.07.15.11.33.02.51-.09.18-.13.3-.27.46-.13.17-.28.37-.4.5-.13.13-.27.28-.11.55.15.26.68 1.12 1.46 1.82 1 .89 1.84 1.17 2.11 1.3.26.13.42.11.58-.07.15-.18.66-.77.84-1.04.18-.26.35-.22.6-.13.24.09 1.55.73 1.82.86.26.13.44.2.51.31.07.11.07.64-.15 1.26z"/></svg>
                      </div>
                      <div class="act-btn-text">
                        <span class="act-btn-lbl">WhatsApp</span>
                        <span class="act-btn-sub">+62 813-6738-1826</span>
                      </div>
                      <span class="act-btn-arr">&#8599;</span>
                    </a>

                    <a class="pass-act-btn mail" href="mailto:zikriganteng2023@gmail.com?subject=Proyek%20baru%20%E2%80%94%20dari%20portofolio">
                      <div class="act-btn-ic">
                        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                      </div>
                      <div class="act-btn-text">
                        <span class="act-btn-lbl" data-kt="passEmailLbl">Surel</span>
                        <span class="act-btn-sub">zikriganteng2023@gmail.com</span>
                      </div>
                      <span class="act-btn-arr">&#8599;</span>
                    </a>
                  </div>

                  <!-- Tombol Flip 3D Sisi Belakang -->
                  <button type="button" class="pass-flip-btn" data-ka="passFlipBackAria" aria-label="Balikkan kartu ke sisi belakang">
                    <svg class="flip-ic" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 11a8.1 8.1 0 0 0-15.5-2m-.5-4v4h4M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4"/></svg>
                    <span data-kt="passFlipBack">BALIK KARTU &bull; SPEK &amp; SOSIAL</span>
                  </button>
                </div>

                <!-- SISI BELAKANG (BACK) -->
                <div class="pass-face pass-back">
                  <!-- HiCo 3-Track Magnetic Stripe -->
                  <div class="pass-magnetic-stripe" aria-hidden="true">
                    <div class="mag-sheen"></div>
                    <span class="mag-track-code">T1:%B6502026^ZIKRI/M^26111010000000000000000? &bull; T2:;6502026=26111010000000000?</span>
                  </div>

                  <div class="pass-back-content">
                    <!-- Panel Tanda Tangan Resmi & Kode CVC -->
                    <div class="pass-signature-strip">
                      <div class="sig-panel">
                        <span class="sig-watermark" data-kt="passSig">TANDA TANGAN RESMI &bull; TIDAK DAPAT DIPINDAHTANGANKAN</span>
                        <span class="sig-handwritten">M. Zikri Al-Bukhori</span>
                      </div>
                      <div class="sig-cvc">
                        <span class="cvc-lbl" data-kt="passSec">KODE</span>
                        <span class="cvc-val">062</span>
                      </div>
                    </div>

                    <!-- Hub Saluran Sosial & Repositori Resmi -->
                    <div class="pass-back-socials">
                      <div class="pass-back-head">
                        <span class="pass-back-lbl" data-kt="passNetTitle">JARINGAN &amp; KODE SUMBER</span>
                        <span class="pass-back-subtag" data-kt="passNetTag">TERHUBUNG</span>
                      </div>
                      <div class="pass-soc-links">
                        <a class="pass-soc-pill" href="https://github.com/trynvexa" target="_blank" rel="noopener noreferrer">
                          <span class="pill-ic"><svg viewBox="0 0 24 24"><path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21"/></svg></span>
                          <div class="pill-meta">
                            <span class="pill-t">GitHub</span>
                            <span class="pill-sub" data-kt="socGhSub">@trynvexa &bull; Repositori Kode</span>
                          </div>
                          <span class="pill-ar">&#8599;</span>
                        </a>
                        <a class="pass-soc-pill" href="https://www.instagram.com/yo144484/" target="_blank" rel="noopener noreferrer">
                          <span class="pill-ic"><svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.5 6.5h.01"/></svg></span>
                          <div class="pill-meta">
                            <span class="pill-t">Instagram</span>
                            <span class="pill-sub" data-kt="socIgSub">@yo144484 &bull; Visual &amp; Desain</span>
                          </div>
                          <span class="pill-ar">&#8599;</span>
                        </a>
                        <a class="pass-soc-pill" href="https://www.tiktok.com/@frince_nael7" target="_blank" rel="noopener noreferrer">
                          <span class="pill-ic"><svg viewBox="0 0 24 24"><path d="M14 3v11.5a3.6 3.6 0 1 1-3.6-3.6M14 3c.3 2.7 2 4.4 4.8 4.7"/></svg></span>
                          <div class="pill-meta">
                            <span class="pill-t">TikTok</span>
                            <span class="pill-sub" data-kt="socTtSub">@frince_nael7 &bull; Konten Kreatif</span>
                          </div>
                          <span class="pill-ar">&#8599;</span>
                        </a>
                      </div>
                    </div>

                    <!-- Dossier Spesifikasi Teknis -->
                    <div class="pass-dossier" aria-hidden="true">
                      <div class="dossier-row"><span data-kt="passBuild">MESIN BANGUN</span><b>VANILLA ES6+ &bull; CSS3</b></div>
                      <div class="dossier-row"><span data-kt="passProd">UNIT PRODUKSI</span><b data-kt="passProdVal">PKL DIGITALCODE 2026</b></div>
                    </div>

                    <!-- Vector Barcode & Geographic Stamp -->
                    <div class="pass-barcode-wrap" aria-hidden="true">
                      <div class="pass-barcode">
                        <span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span>
                      </div>
                      <div class="pass-geo">
                        <span class="geo-code">* ZK &bull; 2026 &bull; 06 *</span>
                        <small>3&deg;35'24.8" N &bull; 98&deg;40'20.1" E &bull; MEDAN</small>
                      </div>
                    </div>

                    <!-- Tombol Kembali ke Depan -->
                    <button type="button" class="pass-flip-btn back-btn" data-ka="passFlipFrontAria" aria-label="Balikkan kartu ke sisi depan">
                      <svg class="flip-ic" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 11a8.1 8.1 0 0 0-15.5-2m-.5-4v4h4M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4"/></svg>
                      <span data-kt="passFlipFront">KEMBALI KE SISI DEPAN</span>
                    </button>
                  </div>
                </div>
              </div>
              <div class="pass-shadow" aria-hidden="true"></div>
            </div>
          </aside>
        </div>
        <div class="pr-tick" aria-hidden="true">
          <div class="pr-tick-track">
            <span class="pr-tick-run" data-kt="ticker">ADA PROYEK? • FREELANCE • KOLABORASI • FRONT-END • UI DESIGN • MEDAN, INDONESIA • BALAS &lt;24 JAM •</span>
            <span class="pr-tick-run" data-kt="ticker">ADA PROYEK? • FREELANCE • KOLABORASI • FRONT-END • UI DESIGN • MEDAN, INDONESIA • BALAS &lt;24 JAM •</span>
          </div>
        </div>
      </div>`
    ],
    [
      '',
      function () { return window.ZK_RUNWAY_DATA ? window.ZK_RUNWAY_DATA.renderPage() : ''; }
    ]
  ];

  /* ===== FX Transitions State ===== */
  var FX = { busy: false }, irisC = null, fxHid = [];
  var fxReduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches, fxSmall = innerWidth < 700;

  // Where the card really is right now (pose after hover/press has settled), with its true radius
  function rectClip(c) {
    if (irisC) return 'circle(22px at 50% 50%)';
    var t = c.style.transition;
    c.style.transition = 'none';
    var r = c.getBoundingClientRect(),
        k = c.offsetWidth ? r.width / c.offsetWidth : 1,
        rad = (parseFloat(getComputedStyle(c).borderTopLeftRadius) || 0) * k;
    requestAnimationFrame(function(){ c.style.transition = t; });
    return 'inset(' + r.top.toFixed(1) + 'px ' + (innerWidth - r.right).toFixed(1) + 'px ' +
           (innerHeight - r.bottom).toFixed(1) + 'px ' + r.left.toFixed(1) + 'px round ' + rad.toFixed(1) + 'px)';
  }

  var FULL = 'circle(150vmax at 50% 50%)',
      veil = document.getElementById('veil'),
      warp = document.getElementById('warpdefs'),
      anim = null;

  // Clip-path is driven by the Web Animations API so open and close can use their own easing
  // and can reverse from wherever they are, without a jump.
  function clipTo(from, to, dur, ease, done) {
    if (anim) { anim.onfinish = null; anim.cancel(); anim = null; }
    pg.style.clipPath = to;
    if (reduce || !pg.animate) { if (done) done(); return; }
    var a = anim = pg.animate([{ clipPath: from }, { clipPath: to }], { duration: dur, easing: ease });
    a.onfinish = function(){ if (anim === a) { anim = null; if (done) done(); } };
  }
  function freeze(on) {
    document.body.classList.toggle('freeze', on);
    try { if (on) warp.pauseAnimations(); else warp.unpauseAnimations(); } catch (_) {}
  }

  function pageHTML(i) {
    var pv = (i + n - 1) % n, nx = (i + 1) % n;
    var ktImg = ((document.querySelector('.kontakphoto .portrait-img') || {}).src || 'assets/images/card-contact.webp');
    var bodyRaw = typeof PAGES[i][1] === 'function' ? PAGES[i][1]() : PAGES[i][1];
    return '<div class="bg">' + PAGES[i][0] + '</div>' +
           '<button class="bk" data-close aria-label="Kembali ke daftar kartu"><span class="bk-i" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M15 5l-7 7 7 7"/></svg></span><span class="bk-t">Kembali</span></button>' +
           '<div class="bd">' + bodyRaw.split('__KT_IMG__').join(ktImg) + '</div>' +
           '<nav class="pnav" aria-label="Pindah kartu">' +
             '<button type="button" data-go="-1">&#9666; ' + cards[pv].getAttribute('data-n') + '</button>' +
             '<button type="button" data-go="1">' + cards[nx].getAttribute('data-n') + ' &#9656;</button>' +
           '</nav>';
  }

  var switching = false;
  window.zkGoPage = switchPage; // dipakai halaman Proyek (tombol "Hubungi saya")
  window.zkClosePage = closePage; // dipakai halaman Me (Laptop Dive) untuk kembali ke roda kartu
  window.zkJumpPage = function(targetIdx) {
    targetIdx = ((targetIdx % n) + n) % n;
    if (cur < 0) {
      stop();
      var base = Math.round(pos),
          d = ((targetIdx - base + n / 2) % n + n) % n - n / 2;
      if (d === 0 && Math.abs(pos - base) < 0.04) { openPage(targetIdx); return; }
      animateTo(base + d, 0, function(){ openPage(targetIdx); });
      return;
    }
    if (targetIdx === cur) return;
    switchPage(targetIdx - cur);
  };
  function switchPage(d) {
    if (cur < 0 || switching) return;
    switching = true;
    var i = ((cur + d) % n + n) % n;
    pgb.style.transition = 'opacity .14s ease';
    pgb.style.opacity = '0';
    setTimeout(function(){
      var base = Math.round(pos);
      pos = base + (((i - base + n / 2) % n + n) % n - n / 2);
      place();
      cur = i;
      pg.removeAttribute('dir');
      pg.className = 'pg sw p' + i;
      pgb.innerHTML = pageHTML(i);
      pg.scrollTop = 0;
      pg.getBoundingClientRect(); // paksa reflow supaya animasi muncul berurutan jalan lagi
      pg.classList.add('open');
      pgb.style.transition = 'opacity .22s ease';
      pgb.style.opacity = '1';
      var bkBtn = pgb.querySelector('.bk');
      if (bkBtn) bkBtn.focus({ preventScroll: true });
      setTimeout(function(){
        pgb.style.transition = '';
        pgb.style.opacity = '';
        pg.classList.remove('sw');
        switching = false;
      }, 240);
    }, 140);
  }

  /* ===== v75 FX: kartu pecah jadi serpihan kaca, lalu kembali utuh dengan mulus ===== */
  function fxHost() { var h = document.getElementById('fx'); if (!h) { h = document.createElement('div'); h.id = 'fx'; document.body.appendChild(h); } return h; }
  function fxHide(c) { c.style.visibility = 'hidden'; if (fxHid.indexOf(c) < 0) fxHid.push(c); }
  function fxShow() { fxHid.forEach(function(c){ c.style.visibility = ''; }); fxHid = []; }
  function tf(a, b, z, rx, ry, rz, sc) { return 'translate3d(' + a + 'px,' + b + 'px,' + z + 'px) rotateX(' + rx + 'deg) rotateY(' + ry + 'deg) rotateZ(' + rz + 'deg) scale(' + sc + ')'; }

  // Serpihan kaca tak beraturan. rev = false: pecah dan melayang menjauh. rev = true: serpihan meluncur pulang dan menyatu jadi kartu utuh.
  function fxShards(c, rev) {
    var r = c.getBoundingClientRect(), W = c.offsetWidth, H = c.offsetHeight, k = W ? r.width / W : 1, U = 1 / k;
    var fw = document.createElement('div'), cs = getComputedStyle(c);
    fw.className = 'fw';
    fw.style.cssText = 'left:' + r.left + 'px;top:' + r.top + 'px;width:' + W + 'px;height:' + H + 'px;transform:scale(' + k + ');perspective:1200px';
    ['--w', '--m'].forEach(function(v){ var x = cs.getPropertyValue(v); if (x) fw.style.setProperty(v, x); });
    fxHost().appendChild(fw);
    // Buat satu template clone ringan tanpa elemen tersembunyi (.cback, .gr, .gl, .ht)
    var baseClone = c.cloneNode(true);
    baseClone.setAttribute('aria-hidden', 'true');
    baseClone.setAttribute('tabindex', '-1');
    baseClone.removeAttribute('id');
    baseClone.style.transform = 'none';
    baseClone.style.transition = 'none';
    [].forEach.call(baseClone.querySelectorAll('.cback, .gr, .gl, .ht'), function(n){ n.remove(); });
    var cols = fxSmall ? 2 : 3, rows = fxSmall ? 3 : 4, V = [], x, y, i, j, polys = [], cx = W / 2, cy = H / 2, maxD = Math.hypot(cx, cy);
    for (y = 0; y <= rows; y++) { V[y] = []; for (x = 0; x <= cols; x++) V[y][x] = [
      x / cols * 100 + (x === 0 || x === cols ? 0 : (Math.random() - .5) * 65 / cols),
      y / rows * 100 + (y === 0 || y === rows ? 0 : (Math.random() - .5) * 65 / rows)]; }
    for (j = 0; j < rows; j++) for (i = 0; i < cols; i++) {
      var p00 = V[j][i], p10 = V[j][i + 1], p11 = V[j + 1][i + 1], p01 = V[j + 1][i], q = Math.random();
      if (q < .55) polys.push([p00, p10, p11, p01]);
      else if (q < .78) { polys.push([p00, p10, p11]); polys.push([p00, p11, p01]); }
      else { polys.push([p00, p10, p01]); polys.push([p10, p11, p01]); }
    }
    var frag = document.createDocumentFragment();
    var animSpecs = [];
    polys.forEach(function(pts){
      var mx = 0, my = 0;
      pts.forEach(function(p){ mx += p[0] / pts.length; my += p[1] / pts.length; });
      var sx = mx / 100 * W, sy = my / 100 * H, sh = document.createElement('div'), cl = baseClone.cloneNode(true);
      sh.className = 'sh';
      sh.style.clipPath = 'polygon(' + pts.map(function(p){ return (p[0] + (p[0] - mx) * .012).toFixed(1) + '% ' + (p[1] + (p[1] - my) * .012).toFixed(1) + '%'; }).join(',') + ')';
      sh.style.transformOrigin = sx.toFixed(1) + 'px ' + sy.toFixed(1) + 'px';
      sh.appendChild(cl);
      var z = Math.random(), a = Math.atan2(sy - cy, sx - cx) + (Math.random() - .5) * 1.1, d = (165 + Math.random() * 310) * (.6 + z * .8) * U, dn = Math.hypot(sx - cx, sy - cy) / maxD;
      var dx = Math.cos(a) * d, dy = Math.sin(a) * d - 38 * U, zz = (z - .4) * 480, rx = (Math.random() - .5) * 200, ry = (Math.random() - .5) * 200, rz = (Math.random() - .5) * 140;
      frag.appendChild(sh);
      animSpecs.push({ sh: sh, dx: dx, dy: dy, zz: zz, rx: rx, ry: ry, rz: rz, dn: dn });
    });
    fw.appendChild(frag);
    animSpecs.forEach(function(s){
      if (rev) {
        s.sh.animate([
          { transform: tf(s.dx * 1.22, s.dy * 1.22, s.zz * 1.25, s.rx * 1.35, s.ry * 1.35, s.rz * 1.35, 1), opacity: 0, offset: 0, easing: 'linear' },
          { transform: tf(s.dx * 1.15, s.dy * 1.15, s.zz * 1.15, s.rx * 1.25, s.ry * 1.25, s.rz * 1.25, 1), opacity: 1, offset: .15, easing: 'cubic-bezier(.6,0,.2,1)' },
          { transform: tf(0, 0, 0, 0, 0, 0, 1), opacity: 1, offset: 1 }
        ], { duration: 860, delay: 100 + (1 - s.dn) * 110, fill: 'both' });
      } else {
        s.sh.animate([
          { transform: tf(0, 0, 0, 0, 0, 0, 1), opacity: 1, offset: 0, easing: 'cubic-bezier(.1,.8,.2,1)' },
          { transform: tf(s.dx, s.dy, s.zz, s.rx, s.ry, s.rz, 1), opacity: 1, offset: .34, easing: 'ease-out' },
          { transform: tf(s.dx * 1.24, s.dy * 1.24 - 18 * U, s.zz * 1.22, s.rx * 1.4, s.ry * 1.4, s.rz * 1.4, 1), opacity: 0, offset: 1 }
        ], { duration: 1020, delay: s.dn * 105, fill: 'both' });
      }
    });
  }

  function openPage(i) {
    if (FX.busy) return;
    if (fxReduce) { openCore(i); return; }
    var c = cards[i], done = false, h = fxHost();
    FX.busy = true;
    fxShards(c, false); fxHide(c);
    function go() { if (done) return; done = true; clearTimeout(FX.t); irisC = { x: innerWidth / 2, y: innerHeight / 2 }; openCore(i); irisC = null; }
    FX.t = setTimeout(go, 240);
    setTimeout(function(){ go(); h.remove(); FX.busy = false; }, 820);
    h.onclick = go; // ketuk = lewati ke halaman
  }
  function closePage() {
    if (cur < 0) return;
    var closedIdx = cur;
    if (fxReduce) { closeCore(); return; }
    var c = cards[cur], h = fxHost();
    FX.busy = true;
    fxShards(c, true); fxHide(c);
    irisC = { x: innerWidth / 2, y: innerHeight / 2 }; closeCore(); irisC = null;
    setTimeout(function(){
      fxShow();
      h.remove();
      FX.busy = false;
      // Smooth landing animation on Home radial wheel after returning from detail page
      vRiffleY[closedIdx] += 15;
      kickTilt();
      triggerRiffleWave(closedIdx, 20);
      if (window.__zkBgPulse) window.__zkBgPulse(1);
      if (window.__zkBuddyBounce) window.__zkBuddyBounce(-6.5);
      c.focus({ preventScroll: true });
    }, 750);
  }

  function openCore(i) {
    var c = cards[i];
    cur = i;
    stop();
    clearTimeout(hideT);
    var from = anim ? getComputedStyle(pg).clipPath : rectClip(c);
    var cs = getComputedStyle(c);
    veil.style.backgroundColor = cs.backgroundColor;
    veil.style.backgroundImage = cs.backgroundImage;
    pgb.innerHTML = pageHTML(i);
    pg.removeAttribute('dir');
    pg.className = 'pg p' + i;
    pg.hidden = false;
    pg.scrollTop = 0;
    freeze(true);
    pg.style.clipPath = from;
    pg.getBoundingClientRect(); // force layout reflow
    pg.classList.add('open');
    clipTo(from, FULL, 900, 'cubic-bezier(.22, 1, .36, 1)', function(){
      if (cur === i) document.body.classList.add('covered');
    });

    var bkBtn = pgb.querySelector('.bk');
    if (bkBtn) bkBtn.focus({ preventScroll: true });
  }

  function closeCore() {
    if (cur < 0) return;
    var c = cards[cur], peel = cur === 6;
    document.body.classList.remove('covered');
    var from = anim ? getComputedStyle(pg).clipPath : FULL;
    pg.classList.remove('open');
    if (peel) pg.classList.add('p6-out');
    clipTo(from, rectClip(c), 650, 'cubic-bezier(.65, 0, .25, 1)', function(){
      pg.hidden = true;
      pg.removeAttribute('dir');
      freeze(false);
      pg.classList.remove('p6-out');
    });
    c.focus({ preventScroll: true });
    cur = -1;
  }

  var hov = -1, lastRiffleHov = -1, lastRiffleTime = 0, tmr = [];
  function setFast(i, on) {
    clearTimeout(tmr[i]);
    if (on) cards[i].classList.add('press');
    else tmr[i] = setTimeout(function(){ cards[i].classList.remove('press'); }, 280);
  }
  function unlift() {
    lift.length = 0;
    cards.forEach(function(c, i){ if (i !== hov) setFast(i, false); });
    if (hov >= 0) lift[hov] = 22;
    place();
  }

  cards.forEach(function(c, i) {
    c.addEventListener('pointerenter', function(e){
      if (e.pointerType !== 'mouse' || moved || E.on) return;
      var now = performance.now();
      // Riffle Brush effect: when sweeping cursor across cards quickly, cards flutter like a real deck!
      if (lastRiffleHov >= 0 && lastRiffleHov !== i && now - lastRiffleTime < 260) {
        var sweepDir = i > lastRiffleHov ? 1 : -1;
        vRiffleY[i] += 13;
        vRiffleZ[i] += sweepDir * 4.2;
        vRiffleY[lastRiffleHov] += 6;
        kickTilt();
      }
      lastRiffleHov = i;
      lastRiffleTime = now;
      hov = i;
      lift[i] = 22;
      setFast(i, true);
      place();
    });
    c.addEventListener('pointerleave', function(){
      if (hov === i) hov = -1;
      lift[i] = 0;
      if (tFlipDeg[i] !== 0) { tFlipDeg[i] = 0; kickTilt(); }
      setFast(i, false);
      place();
    });
    // Right-click on any card to perform a 3D Cardistry Flip / Peek at its Playing Card Back!
    c.addEventListener('contextmenu', function(e){
      e.preventDefault();
      if (E.on) return;
      tFlipDeg[i] = tFlipDeg[i] === 0 ? 180 : 0;
      vRiffleY[i] += 16;
      kickTilt();
    });
    c.addEventListener('pointerdown', function(){
      lift[i] = 34;
      setFast(i, true);
      place();
    });
    c.addEventListener('click', function(){
      if (moved) return;
      if (tFlipDeg[i] !== 0) {
        tFlipDeg[i] = 0;
        vRiffleY[i] += 12;
        kickTilt();
        return;
      }
      stop();
      var base = Math.round(pos),
          d = ((i - base + n / 2) % n + n) % n - n / 2;
      if (d === 0 && Math.abs(pos - base) < 0.02) { openPage(i); return; }
      triggerRiffleWave(i, 16);
      animateTo(base + d, 0, function(){ openPage(i); });
    });
  });

  window.addEventListener('pointerup', function(){ unlift(); });
  window.addEventListener('pointercancel', function(){ unlift(); });

  pgb.addEventListener('click', function(e){
    if (e.target.closest('[data-close]')) closePage();
    var g = e.target.closest('[data-go]');
    if (g) switchPage(parseInt(g.getAttribute('data-go'), 10));
    var jmp = e.target.closest('[data-jump],[data-goto]');
    if (jmp) {
      var target = parseInt(jmp.getAttribute('data-jump') || jmp.getAttribute('data-goto'), 10);
      if (!isNaN(target) && window.zkJumpPage) window.zkJumpPage(target);
    }
  });
  document.addEventListener('keydown', function(e){
    if (e.key === 'Escape') {
      if (cur === 2 && window.__zkMeExitHome) { window.__zkMeExitHome(); return; }
      if (cur === 5 && window.__zkDepotEscape && window.__zkDepotEscape()) return;
      if (cur === 7 && window.__zkRunwayEscape && window.__zkRunwayEscape()) return;
      closePage();
    }
  });

  document.getElementById('prev').onclick = function(){ go(Math.round(pos) - 1); stop(); };
  document.getElementById('next').onclick = function(){ go(Math.round(pos) + 1); stop(); };

  document.addEventListener('keydown', function(e){
    if (cur >= 0) {
      if (cur === 2 || cur === 5 || cur === 7) return; // Halaman Me, Proyek Depot & Fashion menangani navigasi sendiri
      if (e.key === 'ArrowLeft') switchPage(-1);
      if (e.key === 'ArrowRight') switchPage(1);
      return;
    }
    if (e.key === 'ArrowLeft') { go(Math.round(pos) - 1); stop(); }
    if (e.key === 'ArrowRight') { go(Math.round(pos) + 1); stop(); }
  });

  // Touch and pointer drag rotation
  var sx = 0, sp = 0, down = false, lx = 0, lt = 0, vel = 0;
  stage.addEventListener('pointerdown', function(e){
    down = true;
    moved = false;
    sx = e.clientX;
    sp = pos;
    lx = e.clientX;
    lt = performance.now();
    vel = 0;
    afterSettle = null;
    if (raf) { cancelAnimationFrame(raf); raf = null; lean = 0; stage.classList.remove('moving'); }
  });
  stage.addEventListener('pointermove', function(e){
    if (!down) return;
    var dx = e.clientX - sx;
    if (!moved && Math.abs(dx) > 7) {
      moved = true;
      unlift();
      stage.classList.add('drag');
      busy(true);
      stop();
      try { stage.setPointerCapture(e.pointerId); } catch(_) {}
    }
    if (moved) {
      // 1:1 follow: the arc between two cards is about 0.68 card widths
      var now = performance.now(), dt = now - lt;
      if (dt > 0) {
        vel = vel * 0.5 + ((e.clientX - lx) / dt) * 0.5; // px per ms, smoothed
        lx = e.clientX;
        lt = now;
      }
      lean = Math.max(-3.5, Math.min(3.5, (-vel / arc) * 450));
      // one render per frame, however many pointer events arrive
      dragPos = sp - dx / arc;
      if (!dragRaf) dragRaf = requestAnimationFrame(function(){ dragRaf = null; setPos(dragPos); });
    }
  });

  function dragEnd() {
    if (!down) return;
    down = false;
    if (dragRaf) { cancelAnimationFrame(dragRaf); dragRaf = null; setPos(dragPos); }
    if (!moved) busy(false);
    if (moved) {
      stage.classList.remove('drag');
      // Momentum: project where a flick would coast to, then settle on a card
      var pv = (performance.now() - lt > 80) ? 0 : -vel / arc; // card positions per ms
      if (reduce || Math.abs(pv) < 0.0007) animateTo(Math.round(pos), pv);
      else spin(pv);
      setTimeout(function(){ moved = false; }, 0);
    }
  }
  stage.addEventListener('pointerup', dragEnd);
  stage.addEventListener('pointercancel', dragEnd);

  // Interactive spring, ripple wave & trampoline physics on PORTOFOLIO title letters (Desktop & Touch)
  var titleEl = document.querySelector('.hd .title');
  if (titleEl && !reduce) {
    var lState = [], lCenters = [], lBounds = null, lRaf = 0, mxL = -9999, myL = -9999, lActive = false;
    var dragIdx = -1, dragY0 = 0, dragMoved = false;

    function cacheLetterRects() {
      var lets = titleEl.querySelectorAll('.t1 i');
      lBounds = titleEl.getBoundingClientRect();
      lCenters = [];
      for (var i = 0; i < lets.length; i++) {
        var r = lets[i].getBoundingClientRect();
        lCenters.push({
          cx: r.left + r.width * 0.5,
          cy: r.top + r.height * 0.5,
          rad: Math.max(95, r.width * 1.85)
        });
      }
    }
    window.addEventListener('resize', function(){ lBounds = null; }, { passive: true });

    function getSt(i) {
      return lState[i] || (lState[i] = { x: 0, y: 0, r: 0, sx: 1, sy: 1, vx: 0, vy: 0, vr: 0, vsx: 0, vsy: 0 });
    }
    function startLetters() {
      if (!lBounds || !lCenters.length) cacheLetterRects();
      if (!lRaf) lRaf = requestAnimationFrame(stepLetters);
    }

    // Gelombang kejut merambat ke huruf-huruf sekitar seperti tuts piano
    window.__zkLetterImpulse = function(centerIdx, strength) {
      var lets = titleEl.querySelectorAll('.t1 i');
      for (var i = 0; i < lets.length; i++) {
        var d = Math.abs(i - centerIdx);
        if (d <= 4) {
          (function(idx, dist){
            setTimeout(function(){
              var st = getSt(idx);
              var falloff = Math.pow(0.56, dist);
              st.vy += strength * falloff;
              st.vsy -= 0.14 * falloff;
              st.vsx += 0.10 * falloff;
              st.vr += (idx < centerIdx ? -1 : idx > centerIdx ? 1 : 0) * 4.5 * falloff;
              startLetters();
            }, dist * 38);
          })(i, d);
        }
      }
    };

    function stepLetters() {
      var lets = titleEl.querySelectorAll('.t1 i');
      var moving = false;
      for (var i = 0; i < lets.length; i++) {
        var el = lets[i];
        var st = getSt(i);
        var tx = 0, ty = 0, tr = 0, tsx = 1, tsy = 1;
        if (dragIdx === i) {
          ty = Math.max(-14, Math.min(34, myL - dragY0));
          tsy = 1 - (ty / 140);
          tsx = 1 + (ty / 200);
        } else if (lActive && lCenters[i]) {
          var lc = lCenters[i];
          var dx = mxL - lc.cx, dy = myL - lc.cy;
          var dist = Math.hypot(dx, dy);
          var rad = lc.rad;
          if (dist < rad) {
            var pull = Math.pow(1 - dist / rad, 1.45);
            tx = -(dx / (dist || 1)) * pull * 16;
            ty = -pull * 24 - (dy / (dist || 1)) * pull * 8;
            tr = -(dx / rad) * pull * 13;
            tsy = 1 + pull * 0.09;
            tsx = 1 - pull * 0.04;
          }
        }
        st.vx = (st.vx + (tx - st.x) * 0.19) * 0.75;
        st.vy = (st.vy + (ty - st.y) * 0.21) * 0.75;
        st.vr = (st.vr + (tr - st.r) * 0.19) * 0.75;
        st.vsx = (st.vsx + (tsx - st.sx) * 0.22) * 0.72;
        st.vsy = (st.vsy + (tsy - st.sy) * 0.22) * 0.72;
        st.x += st.vx; st.y += st.vy; st.r += st.vr;
        st.sx += st.vsx; st.sy += st.vsy;

        var activeMotion = Math.abs(st.x) > 0.05 || Math.abs(st.y) > 0.05 || Math.abs(st.r) > 0.05 ||
                           Math.abs(st.sx - 1) > 0.003 || Math.abs(st.sy - 1) > 0.003 ||
                           Math.abs(st.vx) > 0.05 || Math.abs(st.vy) > 0.05;
        if (activeMotion) {
          moving = true;
          el.style.transform = 'translate3d(' + st.x.toFixed(2) + 'px,' + st.y.toFixed(2) + 'px,0) rotate(' + st.r.toFixed(2) + 'deg) scale(' + st.sx.toFixed(3) + ',' + st.sy.toFixed(3) + ')';
          var hot = Math.hypot(st.x, st.y) > 3.5 || dragIdx === i;
          el.classList.toggle('hot', hot);
        } else if (el.style.transform) {
          st.x = st.y = st.r = 0; st.sx = st.sy = 1;
          el.style.transform = '';
          el.classList.remove('hot');
        }
      }
      if (moving || lActive || dragIdx >= 0) lRaf = requestAnimationFrame(stepLetters);
      else lRaf = 0;
    }

    var hdEl = document.querySelector('.hd');
    if (hdEl) {
      hdEl.addEventListener('pointerenter', cacheLetterRects, { passive: true });
      hdEl.addEventListener('pointermove', function(e){
        if (down) return;
        mxL = e.clientX; myL = e.clientY;
        if (dragIdx >= 0) {
          if (Math.abs(myL - dragY0) > 6) dragMoved = true;
          startLetters();
          return;
        }
        if (!lBounds) cacheLetterRects();
        var tr = lBounds;
        var near = tr && e.clientY >= tr.top - 45 && e.clientY <= tr.bottom + 45 && e.clientX >= tr.left - 45 && e.clientX <= tr.right + 45;
        if (near) {
          lActive = true;
          startLetters();
        } else if (lActive) {
          lActive = false;
        }
      }, { passive: true });
      hdEl.addEventListener('pointerleave', function(){
        lActive = false;
      });
    }

    // Klik huruf -> karakter melompat ke huruf tersebut; Tarik huruf ke bawah -> trampolin
    titleEl.addEventListener('pointerdown', function(e){
      var target = e.target.closest('.t1 i');
      if (!target) return;
      var lets = [].slice.call(titleEl.querySelectorAll('.t1 i'));
      var idx = lets.indexOf(target);
      if (idx < 0) return;
      dragIdx = idx;
      dragY0 = e.clientY;
      myL = e.clientY;
      dragMoved = false;
      startLetters();
    });
    window.addEventListener('pointerup', function(){
      if (dragIdx < 0) return;
      var idx = dragIdx;
      var st = getSt(idx);
      var pulledY = st.y;
      dragIdx = -1;
      if (dragMoved && pulledY > 8) {
        // Lepas tarikan trampolin -> pantulkan huruf ke atas & lontarkan buddy
        st.vy = -pulledY * 0.65 - 6;
        if (window.__zkLetterImpulse) window.__zkLetterImpulse(idx, -pulledY * 0.45);
        if (window.__zkBuddySeatIdx && window.__zkBuddySeatIdx() === idx && window.__zkBuddyBounce) {
          window.__zkBuddyBounce(-Math.min(14, 6 + pulledY * 0.35));
        }
        startLetters();
      } else {
        // Klik biasa pada huruf -> buddy melompat pindah ke huruf ini
        if (window.__zkBuddyJump) window.__zkBuddyJump(idx, true);
      }
    });
    window.addEventListener('pointercancel', function(){ dragIdx = -1; });
  }

  // Pointer effects (desktop only): spotlight, depth parallax, card sheen that follows the cursor
  if (!reduce && window.matchMedia('(pointer: fine)').matches) {
    var rootEl = document.documentElement, fx = 0, fy = 0, fRaf = null;
    window.addEventListener('pointermove', function(e){
      if (down) return; // no spotlight / parallax work while dragging the wheel
      fx = e.clientX; fy = e.clientY;
      if (fRaf) return;
      fRaf = requestAnimationFrame(function(){
        fRaf = null;
        rootEl.style.setProperty('--px', ((fx / innerWidth) * 2 - 1).toFixed(3));
        rootEl.style.setProperty('--py', ((fy / innerHeight) * 2 - 1).toFixed(3));
        rootEl.style.setProperty('--gx', fx + 'px');
        rootEl.style.setProperty('--gy', fy + 'px');
      });
    }, { passive: true });
    cards.forEach(function(c, idx){
      c.addEventListener('pointermove', function(e){
        if (moved || down) return;
        var r = c.getBoundingClientRect();
        var nx = Math.max(0, Math.min(1, (e.clientX - r.left) / r.width));
        var ny = Math.max(0, Math.min(1, (e.clientY - r.top) / r.height));
        var cx = (nx - 0.5) * 2;
        var cy = (ny - 0.5) * 2;
        c.style.setProperty('--mx', (nx * 100).toFixed(1) + '%');
        c.style.setProperty('--my', (ny * 100).toFixed(1) + '%');
        c.style.setProperty('--cx', cx.toFixed(3));
        c.style.setProperty('--cy', cy.toFixed(3));
        c.classList.add('tilting');
        tTiltX[idx] = -cy * 9.5;
        tTiltY[idx] = cx * 11.5;
        kickTilt();
      });
      c.addEventListener('pointerleave', function(){
        c.style.removeProperty('--mx');
        c.style.removeProperty('--my');
        c.style.removeProperty('--cx');
        c.style.removeProperty('--cy');
        c.classList.remove('tilting');
        tTiltX[idx] = 0;
        tTiltY[idx] = 0;
        kickTilt();
      });
    });
  }

  // Trackpad two-finger swipe / mouse wheel: one notch moves one card
  var wAcc = 0, wLock = false;
  stage.addEventListener('wheel', function(e){
    var d = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    if (!d) return;
    e.preventDefault();
    stop();
    wAcc += d;
    if (!wLock && Math.abs(wAcc) > 50) {
      go(Math.round(pos) + (wAcc > 0 ? 1 : -1));
      wAcc = 0;
      wLock = true;
      setTimeout(function(){ wLock = false; }, 380);
    }
  }, { passive: false });

  var wasAuto = false;
  stage.addEventListener('mouseenter', function(){ wasAuto = !!timer; stop(); });
  stage.addEventListener('mouseleave', function(){ if (wasAuto && cur < 0) auto(); wasAuto = false; });
  // Toolbar browser HP yang naik-turun memicu resize; roda hanya disusun ulang kalau ukuran kartu berubah
  window.addEventListener('resize', function(){ if (cards[0].offsetWidth !== lastW) layout(); });
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(layout);
  }
  layout();


  // Auto-play trigger linked to intro completion
  if (document.documentElement.classList.contains("intro-on")) {
    document.addEventListener("introdone", auto, { once: true });
  } else {
    auto();
  }
})();


/* ============================================== */

/* Geser kiri/kanan di halaman detail untuk pindah kartu (hanya layar sentuh; tombol .pnav disembunyikan di sana) */
(function(){
  var pg = document.getElementById('pg'); if (!pg) return;
  var touchOnly = window.matchMedia('(hover: none) and (pointer: coarse)');
  var BLOCK = '.me-dive,.dp-stage,.dp-modal,runway-section,.rw,.rw-sheet-host,#rw-bag-dialog,.rw-site-header,.gstage,.lbx,[class*="rail"],.sk-panel,.sk-card,.sk-orbit,.sk-stage,.sk-ic,.sk-cats,.np-nav,#npShot,.np-shot,dialog,input,textarea,select,button,a';
  var x0 = 0, y0 = 0, t0 = 0, ok = false;
  pg.addEventListener('touchstart', function(e){
    ok = false;
    if (!touchOnly.matches || e.touches.length !== 1 || !pg.classList.contains('open')) return;
    var t = e.target; if (!t.closest || t.closest(BLOCK)) return;
    for (var el = t; el && el !== pg; el = el.parentElement) {
      var cs = getComputedStyle(el);
      if ((cs.overflowX === 'auto' || cs.overflowX === 'scroll') && el.scrollWidth > el.clientWidth + 2) return;
    }
    x0 = e.touches[0].clientX; y0 = e.touches[0].clientY; t0 = Date.now(); ok = true;
  }, { passive: true });
  pg.addEventListener('touchend', function(e){
    if (!ok) return; ok = false;
    var t = e.changedTouches[0], dx = t.clientX - x0, dy = t.clientY - y0;
    if (Math.abs(dx) > 80 && Math.abs(dx) > Math.abs(dy) * 2 && Date.now() - t0 < 800 && window.zkGoPage) window.zkGoPage(dx < 0 ? 1 : -1);
  }, { passive: true });
})();

/* ============================================== */

/* Judul hero di HP: skala otomatis agar selalu pas selebar area, apa pun bahasa/fontnya */
(function(){
  var mq = window.matchMedia('(max-width: 700px)'), raf = 0;
  function fit(){
    raf = 0;
    var t = document.querySelector('.hd .title'); if (!t) return;
    if (!mq.matches) { t.style.removeProperty('font-size'); return; }
    t.style.setProperty('font-size', '100px', 'important');
    var w = 1; [].forEach.call(t.children, function(c){ w = Math.max(w, c.offsetWidth); });
    var size = Math.max(26, Math.min(t.clientWidth * 0.97 / w * 100, 64));
    t.style.setProperty('font-size', size.toFixed(1) + 'px', 'important');
  }
  function queue(){ if (!raf) raf = requestAnimationFrame(fit); }
  fit();
  window.addEventListener('resize', queue); window.addEventListener('orientationchange', queue);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(queue);
  setTimeout(queue, 600);
  var t = document.querySelector('.hd .title');
  if (t && window.MutationObserver) new MutationObserver(queue).observe(t, { childList: true, subtree: true, characterData: true });
})();

/* ============================================== */

/* Indikator progres scroll halaman detail (#zkBar) */
(function(){
  var pg = document.getElementById('pg'), pgb = document.getElementById('pgb');
  if (!pg || !pgb) return;
  var bar = document.createElement('i'); bar.id = 'zkBar'; bar.setAttribute('aria-hidden', 'true'); pg.appendChild(bar);
  var tick = false;
  function prog() {
    tick = false;
    var m = pg.scrollHeight - pg.clientHeight;
    bar.style.opacity = m > 40 ? 1 : 0;
    bar.style.transform = 'scaleX(' + (m > 40 ? Math.min(1, pg.scrollTop / m) : 0) + ')';
  }
  pg.addEventListener('scroll', function(){ if (!tick) { tick = true; requestAnimationFrame(prog); } }, { passive: true });
  new MutationObserver(function(){ setTimeout(prog, 120); }).observe(pgb, { childList: true });
})();

/* ============================================== */

/* Jeda gelombang judul (filter SVG) saat tidak terlihat; di layar sentuh dibekukan agar HP lebih ringan */
(function(){var coarse=matchMedia('(pointer: coarse)').matches;
  function sync(){var s=document.getElementById('warpdefs');if(!s||!s.pauseAnimations)return;
    var pg=document.getElementById('pg'),stop=document.hidden||coarse&&document.documentElement.className.indexOf('intro-on')<0||document.documentElement.classList.contains('intro-on')||(pg&&pg.classList.contains('open'));
    try{stop?s.pauseAnimations():s.unpauseAnimations();}catch(e){}}
  document.addEventListener('visibilitychange',sync);document.addEventListener('introdone',function(){setTimeout(sync,600);});
  addEventListener('load',function(){var pg=document.getElementById('pg');if(pg&&window.MutationObserver)new MutationObserver(sync).observe(pg,{attributes:true,attributeFilter:['class']});sync();});
})();
