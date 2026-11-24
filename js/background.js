/* ============================================================
   Cinematic Hybrid Background (A + B) v3 (Ultra-Smooth 60fps):
   A. Dual-Depth Blurred Active-Card Photo Backdrop Crossfade
   B. Flowing 3D Silk Light Drapes, Studio Sunbeams & Bokeh Dust
   ============================================================ */
(function(){
  var cv = document.getElementById('bgField');
  var slideA = document.getElementById('bgSlideA');
  var slideB = document.getElementById('bgSlideB');
  if (!cv) return;
  var ctx = cv.getContext('2d', { alpha: true });
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var W = 0, H = 0, dpr = 1, isMob = false;
  var mx = 0.5, my = 0.35, smx = 0.5, smy = 0.35, vx = 0, vy = 0;
  var wheelPos = 2, wheelLean = 0, sWheelPos = 2, sWheelLean = 0;
  var waveBoost = 0;
  var curSlide = 0, lastCardIdx = -1;
  var mqDark = window.matchMedia('(prefers-color-scheme: dark)');

  var PALETTES = [
    { a: [224, 70, 58],   b: [185, 85, 62]  }, // 0: Story
    { a: [196, 86, 68],   b: [110, 128, 165] }, // 1: Music
    { a: [216, 98, 72],   b: [165, 148, 120] }, // 2: Me
    { a: [175, 152, 128], b: [130, 145, 138] }, // 3: Frame
    { a: [130, 162, 136], b: [204, 154, 108] }, // 4: Skill
    { a: [212, 112, 58],  b: [172, 132, 96]  }, // 5: Proyek
    { a: [138, 168, 142], b: [198, 142, 110] }, // 6: Kontak
    { a: [118, 152, 186], b: [178, 102, 98] }   // 7: Fashion
  ];
  var curPal = { a: [216, 98, 72], b: [165, 148, 120] };
  var tgtPal = PALETTES[2];

  var FALLBACK_IMGS = [
    'assets/images/story-portrait.webp',
    'assets/images/music-portrait.webp',
    'assets/images/profile-portrait.webp',
    'assets/images/card-gallery.webp',
    'assets/images/card-skills.webp',
    'assets/images/card-projects.webp',
    'assets/images/card-contact.webp',
    'assets/runway/card-runway.webp'
  ];

  var motes = [];
  for (var m = 0; m < 10; m++) {
    motes.push({
      x: Math.random(),
      y: Math.random(),
      r: 1.2 + Math.random() * 2.1,
      spX: (Math.random() - 0.5) * 0.00015,
      spY: -0.0001 - Math.random() * 0.00018,
      ph: Math.random() * Math.PI * 2,
      dp: 0.45 + Math.random() * 0.75
    });
  }

  function isDark() {
    var t = document.documentElement.getAttribute('data-theme');
    return t ? t === 'dark' : mqDark.matches;
  }

  window.__zkBgSetCard = function(idx, cardEl) {
    if (idx === lastCardIdx) return;
    lastCardIdx = idx;
    tgtPal = PALETTES[idx % PALETTES.length] || PALETTES[2];
    document.documentElement.style.setProperty('--bg-acc', tgtPal.a.join(', '));
    if (window.__zkWebglBgSync && window.__zkWebglBgSync.setCard) {
      window.__zkWebglBgSync.setCard(idx, tgtPal);
    }
    if (!slideA || !slideB) return;
    var imgEl = cardEl && cardEl.querySelector('.portrait-img');
    var src = (imgEl && imgEl.getAttribute('src')) || FALLBACK_IMGS[idx] || FALLBACK_IMGS[2];
    var nextSlide = curSlide === 0 ? slideA : slideB;
    var prevSlide = curSlide === 0 ? slideB : slideA;
    curSlide = 1 - curSlide;
    nextSlide.style.backgroundImage = 'url("' + src + '")';
    nextSlide.classList.add('on');
    prevSlide.classList.remove('on');
  };

  setTimeout(function(){
    var activeCard = document.querySelector('.card.on') || document.querySelectorAll('.card')[2];
    if (lastCardIdx < 0) window.__zkBgSetCard(2, activeCard);
  }, 50);

  function resize() {
    W = window.innerWidth;
    H = window.innerHeight;
    isMob = W <= 700;
    dpr = isMob ? 0.55 : 0.72;
    cv.width = Math.round(W * dpr);
    cv.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  resize();
  window.addEventListener('resize', resize, { passive: true });

  var lastBgFrame = 0;

  window.addEventListener('pointermove', function(e){
    var nmx = e.clientX / (W || 1);
    var nmy = e.clientY / (H || 1);
    var spd = Math.hypot(nmx - mx, nmy - my);
    waveBoost = Math.min(1.5, waveBoost + spd * 2.0);
    mx = nmx;
    my = nmy;
  }, { passive: true });

  window.addEventListener('pointerdown', function(e){
    mx = e.clientX / (W || 1);
    my = e.clientY / (H || 1);
    waveBoost = Math.min(1.5, waveBoost + 0.65);
  }, { passive: true });

  window.__zkBgWheelSync = function(pos, lean) {
    wheelPos = pos;
    wheelLean = lean || 0;
    if (window.__zkWebglBgSync && window.__zkWebglBgSync.setWheel) {
      window.__zkWebglBgSync.setWheel(pos, lean || 0);
    }
  };
  window.__zkBgPulse = function() {
    waveBoost = Math.min(1.5, waveBoost + 0.8);
    if (window.__zkWebglBgSync && window.__zkWebglBgSync.pulse) {
      window.__zkWebglBgSync.pulse();
    }
  };

  function drawSunbeams(t, dark, colA, colB) {
    ctx.save();
    ctx.globalCompositeOperation = dark ? 'screen' : 'soft-light';
    for (var b = 0; b < 2; b++) {
      var bx = W * (0.28 + b * 0.42 + Math.sin(t * 0.22 + b * 1.7) * 0.08 + (smx - 0.5) * -0.16);
      var bw = W * (0.20 + b * 0.04);
      var beamGrad = ctx.createLinearGradient(bx - bw, 0, bx + bw * 0.8, H * 0.95);
      var cStr = (b % 2 === 0 ? colA : colB).join(',');
      var aPeak = dark ? (0.07 + waveBoost * 0.025) : (0.20 + waveBoost * 0.05);
      beamGrad.addColorStop(0, 'rgba(' + (dark ? cStr : '255, 253, 248') + ',' + aPeak.toFixed(3) + ')');
      beamGrad.addColorStop(0.55, 'rgba(' + cStr + ',' + (aPeak * 0.45).toFixed(3) + ')');
      beamGrad.addColorStop(1, 'rgba(' + cStr + ', 0)');

      ctx.fillStyle = beamGrad;
      ctx.beginPath();
      ctx.moveTo(bx - bw * 0.55, -20);
      ctx.lineTo(bx + bw * 0.55, -20);
      ctx.lineTo(bx + bw * 1.45 + sWheelLean * 12, H + 20);
      ctx.lineTo(bx - bw * 0.35 + sWheelLean * 12, H + 20);
      ctx.closePath();
      ctx.fill();
    }
    ctx.restore();
  }

  function drawSilkRibbon(t, dark, layerIdx, colRgb, alphaBase) {
    ctx.save();
    ctx.beginPath();
    var yBase = H * (0.22 + layerIdx * 0.24) + (smy - 0.5) * (layerIdx - 1) * -24;
    var amp1 = (H * (0.07 + (layerIdx % 2) * 0.02)) * (1 + waveBoost * 0.34);
    var amp2 = (H * 0.038) * (1 + Math.abs(sWheelLean) * 0.14);
    var phase = t * (0.36 + layerIdx * 0.13) + layerIdx * 1.7 + sWheelPos * 0.46;
    var stepX = Math.max(44, Math.round(W / (isMob ? 12 : 18)));
    var pts = [];

    for (var x = -40; x <= W + 40; x += stepX) {
      var nx = x / (W || 1);
      var distCursor = nx - smx;
      var cursorPull = Math.exp(-distCursor * distCursor * 7) * ((smy - 0.45) * H * 0.12 + vy * H * 0.8);
      var y = yBase +
              Math.sin(nx * 3.2 + phase) * amp1 +
              Math.cos(nx * 5.8 - phase * 0.75) * amp2 +
              cursorPull;
      pts.push([x, y]);
    }

    ctx.moveTo(-40, H + 40);
    for (var p = 0; p < pts.length; p++) {
      ctx.lineTo(pts[p][0], pts[p][1]);
    }
    ctx.lineTo(W + 40, H + 40);
    ctx.closePath();

    var grad = ctx.createLinearGradient(0, yBase - amp1 * 1.5, 0, H);
    var cStr = colRgb[0] + ',' + colRgb[1] + ',' + colRgb[2];
    if (dark) {
      grad.addColorStop(0, 'rgba(' + cStr + ',' + (alphaBase * 1.4).toFixed(3) + ')');
      grad.addColorStop(0.38, 'rgba(' + cStr + ',' + (alphaBase * 0.45).toFixed(3) + ')');
      grad.addColorStop(1, 'rgba(16, 19, 18, 0)');
    } else {
      grad.addColorStop(0, 'rgba(255, 253, 248,' + (alphaBase * 1.95).toFixed(3) + ')');
      grad.addColorStop(0.3, 'rgba(' + cStr + ',' + (alphaBase * 1.0).toFixed(3) + ')');
      grad.addColorStop(1, 'rgba(238, 235, 226, 0)');
    }
    ctx.fillStyle = grad;
    ctx.fill();

    ctx.beginPath();
    for (var k = 0; k < pts.length; k++) {
      if (k === 0) ctx.moveTo(pts[k][0], pts[k][1]);
      else ctx.lineTo(pts[k][0], pts[k][1]);
    }
    var rimCol = dark ? cStr : '255, 255, 255';
    var rimAlpha = dark ? (0.18 + waveBoost * 0.1) : (0.52 + waveBoost * 0.14);
    ctx.strokeStyle = 'rgba(' + rimCol + ',' + Math.min(0.85, rimAlpha).toFixed(3) + ')';
    ctx.lineWidth = dark ? 1.4 : 2.0;
    ctx.stroke();
    ctx.restore();
  }

  function drawDustMotes(t, dark, colA) {
    ctx.save();
    var cStr = colA.join(',');
    for (var i = 0; i < motes.length; i++) {
      var m = motes[i];
      m.x += m.spX + Math.sin(t * 0.5 + m.ph) * 0.00012 - vx * 0.016 * m.dp;
      m.y += m.spY - vy * 0.012 * m.dp;
      if (m.y < -0.05) { m.y = 1.05; m.x = Math.random(); }
      if (m.x < -0.05) m.x = 1.05;
      if (m.x > 1.05) m.x = -0.05;

      var px = m.x * W;
      var py = m.y * H;
      var twinkle = 0.45 + 0.55 * Math.sin(t * 1.4 + m.ph);
      var al = (dark ? 0.22 : 0.32) * twinkle * m.dp;

      ctx.beginPath();
      ctx.arc(px, py, m.r * (1 + waveBoost * 0.2), 0, Math.PI * 2);
      ctx.fillStyle = dark
        ? 'rgba(' + cStr + ',' + al.toFixed(3) + ')'
        : 'rgba(255, 252, 244,' + (al * 1.3).toFixed(3) + ')';
      ctx.fill();
    }
    ctx.restore();
  }

  var pgEl = document.getElementById('pg');
  function draw(now) {
    var hidden = document.hidden ||
                 window.__zkWebglBgActive ||
                 document.documentElement.classList.contains('intro-on') ||
                 document.body.classList.contains('covered') ||
                 document.body.classList.contains('busy') ||
                 (pgEl && pgEl.classList.contains('open'));
    if (hidden) {
      requestAnimationFrame(draw);
      return;
    }
    if (now - lastBgFrame < (isMob ? 34 : 24)) {
      requestAnimationFrame(draw);
      return;
    }
    lastBgFrame = now;

    var t = now * 0.001;
    var dark = isDark();

    var dx = mx - smx;
    var dy = my - smy;
    vx = vx * 0.82 + dx * 0.18;
    vy = vy * 0.82 + dy * 0.18;
    smx += dx * 0.075;
    smy += dy * 0.075;
    sWheelPos += (wheelPos - sWheelPos) * 0.085;
    sWheelLean += (wheelLean - sWheelLean) * 0.14;
    waveBoost *= 0.93;

    for (var i = 0; i < 3; i++) {
      curPal.a[i] += (tgtPal.a[i] - curPal.a[i]) * 0.05;
      curPal.b[i] += (tgtPal.b[i] - curPal.b[i]) * 0.05;
    }
    var colA = [Math.round(curPal.a[0]), Math.round(curPal.a[1]), Math.round(curPal.a[2])];
    var colB = [Math.round(curPal.b[0]), Math.round(curPal.b[1]), Math.round(curPal.b[2])];

    ctx.clearRect(0, 0, W, H);

    var spotX = W * (0.5 + (smx - 0.5) * 0.58);
    var spotY = H * (0.38 + (smy - 0.4) * 0.45);
    var spotR = Math.max(W, H) * 0.65;
    var spot = ctx.createRadialGradient(spotX, spotY, 10, spotX, spotY, spotR);
    if (dark) {
      spot.addColorStop(0, 'rgba(' + colA.join(',') + ', 0.17)');
      spot.addColorStop(0.45, 'rgba(' + colB.join(',') + ', 0.07)');
      spot.addColorStop(1, 'rgba(16, 19, 18, 0)');
    } else {
      spot.addColorStop(0, 'rgba(255, 255, 255, 0.62)');
      spot.addColorStop(0.42, 'rgba(' + colA.join(',') + ', 0.13)');
      spot.addColorStop(1, 'rgba(238, 235, 226, 0)');
    }
    ctx.fillStyle = spot;
    ctx.fillRect(0, 0, W, H);

    if (!isMob) drawSunbeams(t, dark, colA, colB);

    drawSilkRibbon(t, dark, 0, colB, dark ? 0.12 : 0.17);
    drawSilkRibbon(t, dark, 1, colA, dark ? 0.16 : 0.22);
    if (!isMob) drawSilkRibbon(t, dark, 2, colB, dark ? 0.11 : 0.15);

    drawDustMotes(t, dark, colA);

    if (!reduce) requestAnimationFrame(draw);
  }

  requestAnimationFrame(draw);
})();
