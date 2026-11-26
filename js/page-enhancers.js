/* ============================================================
   page-enhancers.js — Per-Page 3D Motion Choreography (p0, p1, p3, p4, p6)
   Registers deterministic mount + cleanup enhancers via window.ZK3D
   for Story, Music, Frame, Skill, and Kontak.
   (Me p2, Proyek p5, and Fashion p7 use dedicated engine modules.)
   ============================================================ */
(function () {
  var Z = window.ZK3D;
  if (!Z) return;

  /* ========================================================================
     p0: STORY — 3D Scroll-Depth Chapters, Active Aura, Portrait Parallax & Embers
     ======================================================================== */
  Z.registerPage(0, function (pg, pgb) {
    var cleanups = [];
    var chapters = [].slice.call(pgb.querySelectorAll('.st-ch'));
    var endEl = pgb.querySelector('.st-end');
    var bgImg = pgb.querySelector('.bg img');
    var bgWrap = pgb.querySelector('.bg');

    if (!Z.isReduced) {
      chapters.forEach(function (ch) { ch.classList.add('st-3d-ready'); });
      if (endEl) endEl.classList.add('st-3d-ready');

      function checkVisible() {
        var vh = window.innerHeight || 900;
        var activeCh = null;
        chapters.forEach(function (ch) {
          var r = ch.getBoundingClientRect();
          if (r.top < vh * 0.94) {
            ch.classList.add('in-3d');
            if (r.top < vh * 0.58 && r.bottom > 60) activeCh = ch;
          }
        });
        if (activeCh) {
          chapters.forEach(function (c) { c.classList.toggle('st-active-aura', c === activeCh); });
        }
        if (endEl && endEl.getBoundingClientRect().top < vh * 0.96) {
          endEl.classList.add('in-3d');
        }
      }

      var initCheckT = setTimeout(checkVisible, 160);
      var initCheckT2 = setTimeout(checkVisible, 550);
      cleanups.push(function () { clearTimeout(initCheckT); clearTimeout(initCheckT2); });

      // Subtle desktop scroll-parallax on Story portrait + chapter reveal check
      var sRaf = 0;
      function onScroll() {
        if (sRaf) return;
        sRaf = requestAnimationFrame(function () {
          sRaf = 0;
          checkVisible();
          if (!bgImg || window.innerWidth <= 820) return;
          var max = Math.max(1, pg.scrollHeight - pg.clientHeight);
          var p = Math.min(1, pg.scrollTop / max);
          bgImg.style.transform = 'scale(' + (1.03 + p * 0.05).toFixed(3) + ') translate3d(0,' + (-p * 26).toFixed(1) + 'px,0)';
        });
      }
      pg.addEventListener('scroll', onScroll, { passive: true });
      cleanups.push(function () {
        pg.removeEventListener('scroll', onScroll);
        if (sRaf) cancelAnimationFrame(sRaf);
      });

      // Ambient floating crimson embers canvas
      if (bgWrap) {
        var cv = document.createElement('canvas');
        cv.className = 'st-embers';
        cv.setAttribute('aria-hidden', 'true');
        bgWrap.appendChild(cv);
        var ctx = cv.getContext('2d');
        var embers = [];
        for (var i = 0; i < 14; i++) {
          embers.push({
            x: Math.random(), y: Math.random(),
            r: 0.9 + Math.random() * 2.0,
            vx: (Math.random() - 0.5) * 0.00024,
            vy: -0.00024 - Math.random() * 0.00042,
            ph: Math.random() * Math.PI * 2
          });
        }
        var alive = true, eRaf = 0, lastEmb = 0;
        function drawEmbers(now) {
          if (!alive || !cv.isConnected) return;
          eRaf = requestAnimationFrame(drawEmbers);
          if (document.hidden || !ctx || now - lastEmb < 42) return;
          lastEmb = now;
          var w = cv.clientWidth, h = cv.clientHeight;
          if (!w || !h) return;
          if (cv.width !== Math.round(w)) { cv.width = Math.round(w); cv.height = Math.round(h); }
          ctx.setTransform(1, 0, 0, 1, 0, 0);
          ctx.clearRect(0, 0, w, h);
          var t = now * 0.001;
          for (var j = 0; j < embers.length; j++) {
            var e = embers[j];
            e.x += e.vx + Math.sin(t + e.ph) * 0.00012;
            e.y += e.vy;
            if (e.y < -0.04) { e.y = 1.04; e.x = Math.random(); }
            if (e.x < -0.04) e.x = 1.04;
            if (e.x > 1.04) e.x = -0.04;
            var al = 0.22 + 0.36 * (0.5 + 0.5 * Math.sin(t * 2 + e.ph));
            ctx.fillStyle = 'rgba(235, 92, 74,' + al.toFixed(3) + ')';
            ctx.beginPath();
            ctx.arc(e.x * w, e.y * h, e.r, 0, Math.PI * 2);
            ctx.fill();
          }
        }
        eRaf = requestAnimationFrame(drawEmbers);
        cleanups.push(function () {
          alive = false;
          if (eRaf) cancelAnimationFrame(eRaf);
          if (cv.parentNode) cv.parentNode.removeChild(cv);
        });
      }
    }

    return function () { cleanups.forEach(function (f) { f(); }); };
  });

  /* ========================================================================
     p1: MUSIC — Sunlit Acoustic Resonance Stage & Fluid Harmonic Visualizer
     ======================================================================== */
  Z.registerPage(1, function (pg, pgb) {
    var cleanups = [];
    var bg = pgb.querySelector('.bg');
    if (!bg) return function () {};

    var ticks = [];
    for (var tk = 0; tk < 60; tk++) {
      var deg = tk * 6;
      var rad = (deg * Math.PI) / 180;
      var major = tk % 5 === 0;
      var r1 = major ? 156 : 162;
      var r2 = major ? 170 : 167;
      var x1 = (200 + Math.cos(rad) * r1).toFixed(2);
      var y1 = (200 + Math.sin(rad) * r1).toFixed(2);
      var x2 = (200 + Math.cos(rad) * r2).toFixed(2);
      var y2 = (200 + Math.sin(rad) * r2).toFixed(2);
      ticks.push(
        '<line x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 +
        '" stroke="var(--acc, #e0654f)" stroke-width="' + (major ? '1.35' : '0.8') +
        '" stroke-linecap="round" opacity="' + (major ? '0.42' : '0.2') + '"/>'
      );
    }

    var stage = document.createElement('div');
    stage.className = 'music-aura-stage';
    stage.setAttribute('aria-hidden', 'true');
    stage.innerHTML =
      '<div class="music-sun"></div>' +
      '<div class="music-rosette">' +
        '<svg viewBox="0 0 400 400" fill="none">' +
          '<defs>' +
            '<radialGradient id="zkRosetteHalo" cx="46%" cy="42%" r="56%">' +
              '<stop offset="0%" stop-color="#fffdf8" stop-opacity="0.72"/>' +
              '<stop offset="52%" stop-color="#f7e5ce" stop-opacity="0.28"/>' +
              '<stop offset="84%" stop-color="var(--acc2, #f59a72)" stop-opacity="0.1"/>' +
              '<stop offset="100%" stop-color="var(--acc, #e0654f)" stop-opacity="0"/>' +
            '</radialGradient>' +
            '<linearGradient id="zkRosetteArc" x1="0%" y1="0%" x2="100%" y2="100%">' +
              '<stop offset="0%" stop-color="var(--acc, #e0654f)" stop-opacity="0.58"/>' +
              '<stop offset="55%" stop-color="var(--acc2, #f59a72)" stop-opacity="0.24"/>' +
              '<stop offset="100%" stop-color="#ffffff" stop-opacity="0.52"/>' +
            '</linearGradient>' +
          '</defs>' +
          '<g class="music-rosette-core">' +
            '<circle cx="200" cy="200" r="144" fill="url(#zkRosetteHalo)"/>' +
            '<circle cx="200" cy="200" r="144" stroke="#ffffff" stroke-width="1.2" opacity="0.62"/>' +
            '<circle cx="200" cy="200" r="136" stroke="var(--acc, #e0654f)" stroke-width="0.9" opacity="0.22"/>' +
            '<circle cx="200" cy="200" r="106" stroke="var(--acc2, #f59a72)" stroke-width="0.85" stroke-dasharray="2 7" opacity="0.34"/>' +
          '</g>' +
          '<g class="music-rosette-outer">' +
            '<circle cx="200" cy="200" r="176" stroke="var(--acc, #e0654f)" stroke-width="0.85" stroke-dasharray="10 14 2 14" opacity="0.3"/>' +
            ticks.join('') +
            '<circle cx="200" cy="24" r="2.6" fill="var(--acc, #e0654f)" opacity="0.55"/>' +
            '<circle cx="376" cy="200" r="2.6" fill="var(--acc2, #f59a72)" opacity="0.55"/>' +
            '<circle cx="200" cy="376" r="2.6" fill="var(--acc, #e0654f)" opacity="0.55"/>' +
            '<circle cx="24" cy="200" r="2.6" fill="var(--acc2, #f59a72)" opacity="0.55"/>' +
          '</g>' +
          '<g class="music-rosette-inner">' +
            '<path d="M 88 156 A 120 120 0 0 1 256 94" stroke="url(#zkRosetteArc)" stroke-width="1.6" stroke-linecap="round"/>' +
            '<path d="M 312 244 A 120 120 0 0 1 144 306" stroke="url(#zkRosetteArc)" stroke-width="1.6" stroke-linecap="round"/>' +
          '</g>' +
        '</svg>' +
      '</div>' +
      '<canvas class="music-viz-canvas"></canvas>';

    var cutImg = bg.querySelector('img.cut');
    if (cutImg) bg.insertBefore(stage, cutImg);
    else bg.appendChild(stage);

    var vizCanvas = stage.querySelector('.music-viz-canvas');
    var getAudio = function (t) {
      return window.__zkMusicAudio ? window.__zkMusicAudio.getState(t) : null;
    };

    if (Z.mountMusicVisualizer) {
      cleanups.push(Z.mountMusicVisualizer(vizCanvas, getAudio));
    }

    // Gentle desktop pointer parallax + beat reactive CSS custom property
    var tx = 0, ty = 0, px = 0, py = 0;
    if (Z.isFine && !Z.isReduced) {
      var onMove = function (e) {
        if (window.innerWidth <= 820) return;
        var nx = (e.clientX / Math.max(1, window.innerWidth) - 0.5) * 2;
        var ny = (e.clientY / Math.max(1, window.innerHeight) - 0.5) * 2;
        tx = nx * -14;
        ty = ny * -10;
      };
      var onLeave = function () { tx = 0; ty = 0; };
      window.addEventListener('pointermove', onMove, { passive: true });
      window.addEventListener('pointerleave', onLeave, { passive: true });
      cleanups.push(function () {
        window.removeEventListener('pointermove', onMove);
        window.removeEventListener('pointerleave', onLeave);
      });
    }

    var alive = true, bRaf = 0, sBeat = 0, lastBeat = 0;
    if (!Z.isReduced) {
      function beatLoop(now) {
        if (!alive || !stage.isConnected) return;
        bRaf = requestAnimationFrame(beatLoop);
        if (document.hidden || now - lastBeat < 32) return;
        lastBeat = now;
        var st = getAudio(now * 0.001);
        var target = (st && st.playing) ? st.bass : 0;
        if (Math.abs(target - sBeat) >= 0.003 || target !== 0) {
          sBeat += (target - sBeat) * 0.24;
          pg.style.setProperty('--beat', sBeat.toFixed(3));
        }
        if (Math.abs(tx - px) > 0.08 || Math.abs(ty - py) > 0.08) {
          px += (tx - px) * 0.08;
          py += (ty - py) * 0.08;
          stage.style.setProperty('--ma-x', px.toFixed(2) + 'px');
          stage.style.setProperty('--ma-y', py.toFixed(2) + 'px');
        }
      }
      bRaf = requestAnimationFrame(beatLoop);
    }

    cleanups.push(function () {
      alive = false;
      if (bRaf) cancelAnimationFrame(bRaf);
      pg.style.removeProperty('--beat');
      if (stage.parentNode) stage.parentNode.removeChild(stage);
    });

    return function () { cleanups.forEach(function (f) { f(); }); };
  });

  /* ========================================================================
     p2: ME — Handled by dedicated js/me-dive.js ("Laptop Dive" Hero Engine)
     ======================================================================== */

  /* ========================================================================
     p3: FRAME / GALLERY — Live Viewfinder HUD, Shutter Flash & 3D Grid Tilt
     ======================================================================== */
  Z.registerPage(3, function (pg, pgb) {
    var cleanups = [];
    var stage = pgb.querySelector('.gstage');

    if (stage && !stage.querySelector('.gvf-hud')) {
      var hud = document.createElement('div');
      hud.className = 'gvf-hud';
      hud.setAttribute('aria-hidden', 'true');
      hud.setAttribute('data-i18n-own', '1');
      var frameWord = function () {
        var l = (window.ZK && ZK.lang) || 'id';
        return (window.ZK && ZK.t && ZK.t('FRAME', l)) || 'FRAME';
      };
      hud.innerHTML = '<i></i><span class="gvf-frame">' + frameWord() + ' 01</span><span>&bull;</span><span>35MM f/1.8</span>';
      stage.appendChild(hud);
      var hudTxt = hud.querySelector('.gvf-frame');
      var idxInfo = stage.querySelector('.gidx-info');
      var syncHud = function () {
        var b = idxInfo && idxInfo.querySelector('b');
        var nm = idxInfo && idxInfo.querySelector('.gidx-nm');
        if (hudTxt) hudTxt.textContent = frameWord() + ' ' + (b ? b.textContent : '01') + (nm ? ' · ' + nm.textContent : '');
      };
      if (idxInfo && window.MutationObserver) {
        var mo = new MutationObserver(syncHud);
        mo.observe(idxInfo, { childList: true, subtree: true, characterData: true });
        cleanups.push(function () { mo.disconnect(); });
      }
      window.addEventListener('zk-lang', syncHud);
      cleanups.push(function () { window.removeEventListener('zk-lang', syncHud); });
      cleanups.push(function () { if (hud.parentNode) hud.parentNode.removeChild(hud); });
    }

    // Camera shutter blink overlay when Lightbox opens
    var shutter = document.querySelector('.gshutter');
    if (!shutter) {
      shutter = document.createElement('div');
      shutter.className = 'gshutter';
      shutter.setAttribute('aria-hidden', 'true');
      document.body.appendChild(shutter);
    }
    var lbx = document.querySelector('.lbx');
    if (lbx && window.MutationObserver && !Z.isReduced) {
      var wasOn = lbx.classList.contains('on');
      var lbxMo = new MutationObserver(function () {
        var isOn = lbx.classList.contains('on');
        if (isOn && !wasOn) {
          shutter.classList.remove('snap');
          void shutter.offsetWidth;
          shutter.classList.add('snap');
        }
        wasOn = isOn;
      });
      lbxMo.observe(lbx, { attributes: true, attributeFilter: ['class'] });
      cleanups.push(function () { lbxMo.disconnect(); });
    }

    // 3D Tilt + Holographic foil on Editorial Grid cards
    [].forEach.call(pgb.querySelectorAll('.ggrid-card'), function (card) {
      cleanups.push(Z.attachTilt(card, { maxX: 8, maxY: 10, scale: 1.03 }));
    });

    return function () { cleanups.forEach(function (f) { f(); }); };
  });

  /* ========================================================================
     p4: SKILL — Hand-Anchored 3D Orbit Depth, Interactive Drag & WebGL Gyro
     ======================================================================== */
  Z.registerPage(4, function (pg, pgb) {
    var cleanups = [];
    var stage = pgb.querySelector('.sk-stage');
    var orbit = pgb.querySelector('.sk-orbit');

    var gyro = Z.mountSkillWebgl ? Z.mountSkillWebgl(stage) : null;
    if (gyro) cleanups.push(gyro.destroy);

    // Sync WebGL gyroscope color with --cc category variable & skfx events
    function syncColor() {
      if (!gyro) return;
      var cc = getComputedStyle(pg).getPropertyValue('--cc').trim() || '#14181f';
      gyro.setColor(cc);
    }
    syncColor();
    var onSkfx = function (e) {
      if (!gyro) return;
      var d = e.detail || {};
      if (d.d && d.d.c) gyro.setColor(d.d.c);
      if (d.type === 'open') gyro.pulse(1.1);
      else if (d.type === 'down') gyro.pulse(0.45);
      else if (d.type === 'close') syncColor();
    };
    pg.addEventListener('skfx', onSkfx);
    cleanups.push(function () { pg.removeEventListener('skfx', onSkfx); });

    var onTabClick = function (e) {
      if (e.target && e.target.closest && e.target.closest('.sk-tab')) {
        setTimeout(function () { syncColor(); if (gyro) gyro.pulse(0.8); }, 30);
      }
    };
    pgb.addEventListener('click', onTabClick);
    cleanups.push(function () { pgb.removeEventListener('click', onTabClick); });

    // Interactive 3D pointer tilt & drag rotation on hand-anchored .sk-orbit
    if (orbit && !Z.isReduced) {
      var dragging = false, sx = 0, sy = 0, rx = 0, ry = 0;
      var onDown = function (e) {
        if (e.target.closest('.sk-ic')) return;
        dragging = true; sx = e.clientX; sy = e.clientY;
        orbit.classList.add('is-3d-drag');
      };
      var onMove = function (e) {
        var r = orbit.getBoundingClientRect();
        var nx = Math.max(-1, Math.min(1, (e.clientX - (r.left + r.width / 2)) / Math.max(160, r.width)));
        var ny = Math.max(-1, Math.min(1, (e.clientY - (r.top + r.height / 2)) / Math.max(160, r.height)));
        if (gyro) gyro.setTilt(nx, ny);
        if (dragging) {
          ry = Math.max(-28, Math.min(28, (e.clientX - sx) * 0.18));
          rx = Math.max(-24, Math.min(24, -(e.clientY - sy) * 0.16));
          orbit.style.transform = 'perspective(950px) rotateX(' + rx.toFixed(1) + 'deg) rotateY(' + ry.toFixed(1) + 'deg)';
        }
      };
      var onUp = function () {
        if (!dragging) return;
        dragging = false;
        orbit.classList.remove('is-3d-drag');
        orbit.style.transform = '';
      };
      orbit.addEventListener('pointerdown', onDown, { passive: true });
      window.addEventListener('pointermove', onMove, { passive: true });
      window.addEventListener('pointerup', onUp, { passive: true });
      window.addEventListener('pointercancel', onUp, { passive: true });
      cleanups.push(function () {
        orbit.removeEventListener('pointerdown', onDown);
        window.removeEventListener('pointermove', onMove);
        window.removeEventListener('pointerup', onUp);
        window.removeEventListener('pointercancel', onUp);
      });
    }

    // Subtle 3D tilt on principle cards, stats & steps
    [].forEach.call(pgb.querySelectorAll('.sk-pc, .sk-stat'), function (card) {
      cleanups.push(Z.attachTilt(card, { maxX: 6, maxY: 8, scale: 1.02 }));
    });

    return function () { cleanups.forEach(function (f) { f(); }); };
  });

  /* ========================================================================
     p5: PROYEK — Handled by dedicated js/projects-depot.js (3D Container Depot)
     ======================================================================== */

  /* ========================================================================
     p6: KONTAK — Prismatic 3D Dev Pass Layer Depth & Ink-Stamp Confirmation
     ======================================================================== */
  Z.registerPage(6, function (pg, pgb) {
    var cleanups = [];
    var card = pgb.querySelector('.pass-card');
    var glare = card && card.querySelector('.pass-glare');

    // Inject prismatic rainbow diffraction layer synced to --glare-angle
    if (card && !card.querySelector('.pass-prism')) {
      var prism = document.createElement('div');
      prism.className = 'pass-prism';
      prism.setAttribute('aria-hidden', 'true');
      card.insertBefore(prism, card.firstChild);

      if (glare && window.MutationObserver) {
        var mo = new MutationObserver(function () {
          var ang = glare.style.getPropertyValue('--glare-angle');
          if (ang) prism.style.setProperty('--glare-angle', ang);
        });
        mo.observe(glare, { attributes: true, attributeFilter: ['style'] });
        cleanups.push(function () { mo.disconnect(); });
      }
      cleanups.push(function () { if (prism.parentNode) prism.parentNode.removeChild(prism); });
    }

    // Editorial ink-stamp confirmation on email copy & Quick Composer send
    var STAMPS = {
      copied: { id: 'EMAIL TERSALIN ✓', en: 'EMAIL COPIED ✓', zh: '邮箱已复制 ✓', es: 'CORREO COPIADO ✓', ar: 'تم نسخ البريد ✓', fr: 'E-MAIL COPIÉ ✓', ja: 'メールをコピー ✓', ko: '이메일 복사됨 ✓' },
      wa:     { id: 'WHATSAPP ↗', en: 'WHATSAPP ↗', zh: 'WHATSAPP ↗', es: 'WHATSAPP ↗', ar: 'واتساب ↗', fr: 'WHATSAPP ↗', ja: 'WHATSAPP ↗', ko: 'WHATSAPP ↗' },
      sent:   { id: 'TERKIRIM ↗', en: 'DISPATCHED ↗', zh: '已发送 ↗', es: 'ENVIADO ↗', ar: 'تم الإرسال ↗', fr: 'ENVOYÉ ↗', ja: '送信準備完了 ↗', ko: '전송됨 ↗' }
    };
    var onClick = function (e) {
      var t = e.target;
      if (!t || !t.closest) return;
      var l = (window.ZK && ZK.lang) || 'id';
      if (t.closest('#copyEmailBtn')) {
        var r = t.closest('#copyEmailBtn').getBoundingClientRect();
        Z.spawnSparks(r.left + r.width / 2, r.top + r.height / 2, '#47624e', 14);
        Z.showStamp(STAMPS.copied[l] || STAMPS.copied.id);
      } else if (t.closest('#prcWaBtn')) {
        Z.showStamp(STAMPS.wa[l] || STAMPS.wa.id);
      } else if (t.closest('#prcMailBtn')) {
        Z.showStamp(STAMPS.sent[l] || STAMPS.sent.id);
      }
    };
    pgb.addEventListener('click', onClick);
    cleanups.push(function () { pgb.removeEventListener('click', onClick); });

    return function () { cleanups.forEach(function (f) { f(); }); };
  });
})();
