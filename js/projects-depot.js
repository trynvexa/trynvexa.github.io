/* ==========================================================================
   js/projects-depot.js — Card #6: Proyek ("Zikri's Depot")
   Classic defer script (works on file://, http://, https:// with zero CORS!)
   Collision-Free 3D Shipping Container Yard & Overhead Gantry Crane
   + Dual Responsive Desktop/Portrait Layouts + Rich Interior Showcase
   + Case Study Modal + Full 8-Language Live Localization & RTL
   ========================================================================== */
(function () {
  var COLORS = {
    navy: 0x1D2C59,
    mustard: 0xE5A935,
    ivory: 0xF3ECE0,
    sky: 0x88C1E6,
    inside: 0x161A28,
    steel: 0xE8E5DF,
    bolts: 0x99948C,
    lockRods: 0xDFDBD3,
    cable: 0xDDD9D2
  };

  var HEX_MAP = {
    0x1D2C59: '#1D2C59',
    0xE5A935: '#E5A935',
    0xF3ECE0: '#F3ECE0',
    0x88C1E6: '#88C1E6'
  };

  /* Balanced ISO shipping container proportions (zero cramped cubes) */
  var SIZES = {
    hero: [384, 144, 128],
    std:  [240, 112, 112],
    mid:  [224, 108, 112]
  };

  var T = 4;
  var F = 7;
  var CORNER = 10;
  var FLOOR_Y_DESKTOP = -744;
  var FLOOR_Y_PORTRAIT = -1040;
  var REST_CABLE = 92;
  var SPREADER_H = 24;
  var BOLT_COUNT = 140;
  var BOLT_STEP = 72;

  /* Ordered 01..07 for prev/next navigation & keyboard stepping */
  var NAV_ORDER = ['work', 'about', 'kit', 'hello', 'process', 'do', 'archive'];

  /* Mathematically verified 0-collision Desktop & Portrait container yard specs */
  var PILE_SPECS = [
    {
      id: 'work', num: '01', iso: '40HC',
      color: COLORS.navy, ink: '#FFFFFF', accent: '#F0653F', size: 'hero',
      desktop:  { pos: [582, 672,   8], rot: [0,  0.04, 0] },
      portrait: { pos: [310, 968,   8], rot: [0,  0.02, 0] },
      projectId: 'mono'
    },
    {
      id: 'about', num: '02', iso: '20ST',
      color: COLORS.mustard, ink: '#162040', accent: '#E5A935', size: 'mid',
      desktop:  { pos: [524, 545,  10], rot: [0,  0.05, 0] },
      portrait: { pos: [188, 841,   4], rot: [0,  0.04, 0] },
      projectId: 'gigi'
    },
    {
      id: 'kit', num: '03', iso: '20ST',
      color: COLORS.sky, ink: '#162040', accent: '#88C1E6', size: 'mid',
      desktop:  { pos: [530, 436,   6], rot: [0,  0.02, 0] },
      portrait: { pos: [432, 841,   4], rot: [0, -0.04, 0] },
      projectId: 'compute'
    },
    {
      id: 'hello', num: '04', iso: '20HC',
      color: COLORS.sky, ink: '#162040', accent: '#88C1E6', size: 'std',
      desktop:  { pos: [924, 575,  -4], rot: [0, -0.04, 0] },
      portrait: { pos: [180, 730,   2], rot: [0,  0.04, 0] },
      projectId: 'sweet'
    },
    {
      id: 'process', num: '05', iso: '20ST',
      color: COLORS.ivory, ink: '#1D2C59', accent: '#F3ECE0', size: 'std',
      desktop:  { pos: [228, 688,  24], rot: [0,  0.14, 0] },
      portrait: { pos: [180, 617,   0], rot: [0,  0.03, 0] }
    },
    {
      id: 'do', num: '06', iso: '20ST',
      color: COLORS.navy, ink: '#FFFFFF', accent: '#88C1E6', size: 'std',
      desktop:  { pos: [1206, 688, 22], rot: [0, -0.14, 0] },
      portrait: { pos: [440, 730,   2], rot: [0, -0.04, 0] },
      github: 'https://github.com/trynvexa'
    },
    {
      id: 'archive', num: '07', iso: '20ST',
      color: COLORS.mustard, ink: '#162040', accent: '#E5A935', size: 'std',
      desktop:  { pos: [930, 688,  -8], rot: [0, -0.07, 0] },
      portrait: { pos: [440, 617,   0], rot: [0, -0.03, 0] },
      contact: true
    }
  ];

  /* Verified collision-free gravity drop rules for both layouts */
  var DESKTOP_DROPS = {
    about:   [{ id: 'kit', dy: -109 }],
    work:    [{ id: 'about', dy: -145 }, { id: 'kit', dy: -145 }],
    archive: [{ id: 'hello', dy: -113 }]
  };

  var PORTRAIT_DROPS = {
    work:  [
      { id: 'about', dy: -145 }, { id: 'kit', dy: -145 },
      { id: 'hello', dy: -145 }, { id: 'do', dy: -145 },
      { id: 'process', dy: -145 }, { id: 'archive', dy: -145 }
    ],
    about: [{ id: 'hello', dy: -109 }, { id: 'process', dy: -109 }],
    kit:   [{ id: 'do', dy: -109 }, { id: 'archive', dy: -109 }],
    hello: [{ id: 'process', dy: -113 }],
    do:    [{ id: 'archive', dy: -113 }]
  };

  var EASE = {
    linear: function (t) { return t; },
    inQuad: function (t) { return t * t; },
    outQuad: function (t) { return 1 - (1 - t) * (1 - t); },
    inOutQuad: function (t) { return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; },
    outCubic: function (t) { return 1 - Math.pow(1 - t, 3); },
    inOutCubic: function (t) { return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }
  };

  /* Zero-dependency RoundedBoxGeometry */
  function createRoundedBoxGeometry(THREE, width, height, depth, segments, radius) {
    segments = Math.max(1, Math.round(segments || 3));
    var segs = segments * 2 + 1;
    var r = Math.min(width, height, depth) / 2;
    radius = Math.min(radius || 4, r);

    var geo = new THREE.BoxGeometry(1, 1, 1, segs, segs, segs).toNonIndexed();
    var pos = geo.attributes.position;
    var nor = geo.attributes.normal;
    var v = new THREE.Vector3();
    var n = new THREE.Vector3();
    var hw = width / 2 - radius;
    var hh = height / 2 - radius;
    var hd = depth / 2 - radius;
    var eps = 0.00001;

    for (var i = 0; i < pos.count; i++) {
      v.fromBufferAttribute(pos, i);
      var ax = Math.abs(v.x), ay = Math.abs(v.y), az = Math.abs(v.z);
      var sx = Math.sign(v.x), sy = Math.sign(v.y), sz = Math.sign(v.z);

      var px = v.x * width;
      var py = v.y * height;
      var pz = v.z * depth;

      var cx = Math.max(-hw, Math.min(hw, px));
      var cy = Math.max(-hh, Math.min(hh, py));
      var cz = Math.max(-hd, Math.min(hd, pz));

      n.set(px - cx, py - cy, pz - cz);
      var nl = n.length();
      if (nl > eps) n.divideScalar(nl);
      else n.fromBufferAttribute(nor, i);

      if (ax >= 0.5 - eps || ay >= 0.5 - eps || az >= 0.5 - eps) {
        pos.setXYZ(i, cx + n.x * radius, cy + n.y * radius, cz + n.z * radius);
        nor.setXYZ(i, n.x, n.y, n.z);
      } else {
        pos.setXYZ(i, sx * width * 0.5, sy * height * 0.5, sz * depth * 0.5);
      }
    }
    pos.needsUpdate = true;
    nor.needsUpdate = true;
    geo.computeBoundingSphere();
    return geo;
  }

  function getLang() {
    var l = (window.ZK && window.ZK.lang) || 'id';
    var depot = window.ZK_PROJECTS && window.ZK_PROJECTS.DEPOT;
    return depot && depot[l] ? l : 'id';
  }

  function getDepotPack(lang) {
    var depot = window.ZK_PROJECTS && window.ZK_PROJECTS.DEPOT;
    return (depot && (depot[lang] || depot.id)) || null;
  }

  function getCasePack(lang) {
    var i18n = window.ZK_PROJECTS && window.ZK_PROJECTS.I18N;
    return (i18n && (i18n[lang] || i18n.id)) || null;
  }

  function getProjectData(projectId) {
    var list = window.ZK_PROJECTS && window.ZK_PROJECTS.DATA;
    if (!list) return null;
    for (var i = 0; i < list.length; i++) {
      if (list[i].id === projectId) return list[i];
    }
    return null;
  }

  function trStack(pack, chip) {
    return (pack && pack.stacks && pack.stacks[chip]) || chip;
  }

  function escHtml(s) {
    return String(s || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function loadDepotFonts() {
    if (!document.fonts || !document.fonts.load) return Promise.resolve();
    var timeout = new Promise(function (r) { setTimeout(r, 1400); });
    var loads = Promise.allSettled([
      document.fonts.load('900 40px "Archivo X"'),
      document.fonts.load('800 20px "Manrope"'),
      document.fonts.load('italic 400 32px "Instrument Serif"')
    ]);
    return Promise.race([loads, timeout]);
  }

  /* Crisp trapezoidal steel corrugation normal map */
  function makeCorrugationCanvas() {
    var w = 64;
    var h = 4;
    var cv = document.createElement('canvas');
    cv.width = w;
    cv.height = h;
    var ctx = cv.getContext('2d');
    var img = ctx.createImageData(w, h);
    var d = img.data;
    for (var x = 0; x < w; x++) {
      var u = x / w;
      /* Trapezoidal steel rib profile: flat ridge, steep bevel, flat valley */
      var nx = 0;
      if (u < 0.22) nx = 0;
      else if (u < 0.34) nx = 0.72 * Math.sin(((u - 0.22) / 0.12) * Math.PI);
      else if (u < 0.72) nx = 0;
      else if (u < 0.84) nx = -0.72 * Math.sin(((u - 0.72) / 0.12) * Math.PI);
      else nx = 0;
      var nz = Math.sqrt(Math.max(0.01, 1 - nx * nx));
      var r = Math.round((nx * 0.5 + 0.5) * 255);
      var g = 128;
      var b = Math.round((nz * 0.5 + 0.5) * 255);
      for (var y = 0; y < h; y++) {
        var idx = (y * w + x) * 4;
        d[idx] = r;
        d[idx + 1] = g;
        d[idx + 2] = b;
        d[idx + 3] = 255;
      }
    }
    ctx.putImageData(img, 0, 0);
    return cv;
  }

  function setColorTextureSpace(THREE, tex) {
    if ('colorSpace' in tex && THREE.SRGBColorSpace) {
      tex.colorSpace = THREE.SRGBColorSpace;
    } else if ('encoding' in tex && THREE.sRGBEncoding) {
      tex.encoding = THREE.sRGBEncoding;
    }
  }

  function setLinearTextureSpace(THREE, tex) {
    if ('colorSpace' in tex && THREE.NoColorSpace !== undefined) {
      tex.colorSpace = THREE.NoColorSpace;
    } else if ('encoding' in tex && THREE.LinearEncoding !== undefined) {
      tex.encoding = THREE.LinearEncoding;
    }
  }

  /* High-craft ISO stencil typography on container front doors */
  function createLabelTexture(THREE, spec, lines, isRtl) {
    var sz = SIZES[spec.size];
    var L = sz[0], H = sz[1];
    var cw = 1024;
    var ch = Math.max(320, Math.round(cw * ((H - 2 * F) / (L - 2 * F))));
    var cv = document.createElement('canvas');
    cv.width = cw;
    cv.height = ch;
    var ctx = cv.getContext('2d');
    ctx.clearRect(0, 0, cw, ch);

    var ink = spec.ink;
    var padX = cw * 0.072;
    var padTop = ch * 0.14;

    /* Subtle center vertical door rubber gasket line */
    ctx.fillStyle = ink === '#FFFFFF' ? 'rgba(0,0,0,0.22)' : 'rgba(22,32,64,0.14)';
    ctx.fillRect(cw * 0.5 - 2, ch * 0.03, 4, ch * 0.94);

    /* Top industrial header: ZK · 01 (left) & ISO code (right) */
    var metaFs = Math.max(24, ch * 0.095);
    ctx.font = '800 ' + metaFs.toFixed(1) + 'px "Manrope", system-ui, sans-serif';
    ctx.textBaseline = 'top';
    ctx.fillStyle = ink;
    ctx.globalAlpha = 0.68;
    ctx.textAlign = 'left';
    ctx.fillText('ZK · ' + spec.num, padX, padTop);

    ctx.globalAlpha = 0.5;
    ctx.textAlign = 'right';
    ctx.fillText(spec.iso, cw - padX, padTop);

    /* Crisp thin structural rule under header */
    var ruleY = padTop + metaFs + ch * 0.045;
    ctx.globalAlpha = 0.22;
    ctx.fillRect(padX, ruleY, cw - padX * 2, Math.max(2, ch * 0.008));

    /* Main bold stencil title cleanly occupying lower 65% of door */
    ctx.globalAlpha = 1;
    var safeLines = Array.isArray(lines) && lines.length ? lines : [String(lines || '')];
    var isTwo = safeLines.length >= 2;
    var fontStack = '"Archivo X", "Archivo", "Unbounded", "Noto Sans KR", "Noto Sans SC", "Noto Sans JP", "Noto Sans Arabic", sans-serif';

    var bodyTop = ruleY + ch * 0.065;
    var bodyBot = ch * 0.90;
    var availH = bodyBot - bodyTop;
    var maxAllowedW = cw - padX * 2;

    var fs = isTwo ? availH * 0.52 : availH * 0.64;

    function measureMax(size) {
      ctx.font = '900 ' + size.toFixed(1) + 'px ' + fontStack;
      var m = 0;
      for (var i = 0; i < safeLines.length; i++) {
        var w = ctx.measureText(safeLines[i]).width;
        if (w > m) m = w;
      }
      return m;
    }

    var widest = measureMax(fs);
    if (widest > maxAllowedW) {
      fs *= maxAllowedW / widest;
    }
    var maxFsByH = isTwo ? (availH / 1.88) : (availH * 0.82);
    if (fs > maxFsByH) fs = maxFsByH;

    ctx.font = '900 ' + fs.toFixed(1) + 'px ' + fontStack;
    ctx.textBaseline = 'alphabetic';
    ctx.direction = isRtl ? 'rtl' : 'ltr';
    ctx.textAlign = isRtl ? 'right' : 'left';

    var lineH = fs * 0.94;
    var mSample = ctx.measureText(safeLines[0]);
    var capH = mSample.actualBoundingBoxAscent || fs * 0.72;
    var totalH = (safeLines.length - 1) * lineH + capH;
    var startY = bodyTop + (availH - totalH) * 0.5 + capH;
    var drawX = isRtl ? (cw - padX) : padX;

    for (var i = 0; i < safeLines.length; i++) {
      ctx.fillText(safeLines[i], drawX, startY + i * lineH);
    }

    var tex = new THREE.CanvasTexture(cv);
    setColorTextureSpace(THREE, tex);
    tex.anisotropy = 4;
    tex.needsUpdate = true;
    return tex;
  }

  function mountDepot(pg, pgb) {
    var stage = pgb.querySelector('.dp-stage');
    if (!stage) return function () {};

    var wordSpan = stage.querySelector('#dpWord');
    var canvas = stage.querySelector('#dpGl');
    var cardEl = stage.querySelector('#dpCard');
    var logoBtn = stage.querySelector('#dpLogo');
    var homeBtn = stage.querySelector('#dpHome');
    var talkBtn = stage.querySelector('#dpTalk');
    var pillEl = stage.querySelector('#dpPill');
    var eyebrowEl = stage.querySelector('#dpEyebrow');
    var srMenu = stage.querySelector('#dpMenu');
    var modalEl = stage.querySelector('#dpModal');
    var modalPanel = stage.querySelector('#dpModalPanel');

    if (!canvas || !wordSpan || !cardEl) return function () {};

    /* Mobile backdrop scrim behind docked showcase sheet */
    var scrimEl = stage.querySelector('.dp-scrim');
    if (!scrimEl) {
      scrimEl = document.createElement('div');
      scrimEl.className = 'dp-scrim';
      scrimEl.setAttribute('aria-hidden', 'true');
      stage.insertBefore(scrimEl, cardEl);
    }

    document.body.classList.add('dp-active');

    /* Preload the 4 project preview images so interior browser thumbnails appear instantly */
    if (window.ZK_PROJECTS && window.ZK_PROJECTS.DATA) {
      for (var pi = 0; pi < window.ZK_PROJECTS.DATA.length; pi++) {
        var pre = new Image();
        pre.src = window.ZK_PROJECTS.DATA[pi].img;
      }
    }

    var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var disposed = false;
    var lang = getLang();
    var activeModalProjectId = null;

    /* ---------- Shared Case Study Modal (Works in both 3D & Offline Fallback) ---------- */
    function renderCaseModal(projectId) {
      if (!modalEl || !modalPanel || !window.ZK_PROJECTS) return;
      var data = window.ZK_PROJECTS.DATA;
      var idx = -1;
      for (var i = 0; i < data.length; i++) {
        if (data[i].id === projectId) { idx = i; break; }
      }
      if (idx < 0) return;

      var p = data[idx];
      var nextP = data[(idx + 1) % data.length];
      var extra = window.ZK_PROJECTS.X[p.id];
      var cPack = getCasePack(lang);
      var dPack = getDepotPack(lang);
      var pOv = cPack && cPack.projects && cPack.projects[p.id];
      var demoUrl = window.ZK_PROJECTS.URL[p.id] || '#';

      var rr = p.r.split('/');
      var imgW = Number(rr[0]) || 1600;
      var imgH = Number(rr[1]) || 900;

      var cropsHtml = extra.crops.map(function (c, ci) {
        var cap = (pOv && pOv.crops && pOv.crops[ci]) || '';
        var ar = (c.w * imgW).toFixed(1) + '/' + (c.h * imgH).toFixed(1);
        return (
          '<figure class="dp-modal-crop-fig' + (c.wide ? ' is-wide' : '') + '">' +
            '<div class="dp-modal-crop-box" style="aspect-ratio:' + ar + '">' +
              '<img src="' + escHtml(p.img) + '" alt="" decoding="async" style="width:' + (100 / c.w).toFixed(2) + '%;left:' + ((-c.x / c.w) * 100).toFixed(2) + '%;top:' + ((-c.y / c.h) * 100).toFixed(2) + '%">' +
            '</div>' +
            '<figcaption>' + escHtml(cap) + '</figcaption>' +
          '</figure>'
        );
      }).join('');

      var palHtml = extra.pal.map(function (hex) {
        var up = hex.toUpperCase();
        return (
          '<button type="button" class="dp-sw-btn" data-hex="' + up + '" aria-label="' + escHtml(cPack.copyColor) + ' ' + up + '">' +
            '<i style="background:' + hex + '"></i>' +
            '<span>' + up + '</span>' +
          '</button>'
        );
      }).join('');

      var rowsHtml = ((pOv && pOv.rows) || []).map(function (r) {
        return '<div><dt>' + escHtml(r[0]) + '</dt><dd>' + escHtml(r[1]) + '</dd></div>';
      }).join('');

      modalPanel.style.setProperty('--ca', p.a);
      modalPanel.innerHTML =
        '<div class="dp-modal-top">' +
          '<div class="dp-modal-meta">' +
            '<span class="dp-modal-num">' + escHtml(p.num) + ' / 04</span>' +
            '<span class="dp-modal-role">' + escHtml(cPack.role) + '</span>' +
            '<span class="dp-modal-sep" aria-hidden="true">&bull;</span>' +
            '<span class="dp-modal-yr">' + escHtml(p.year) + '</span>' +
          '</div>' +
          '<button type="button" class="dp-modal-close" data-dp-close-modal="1" aria-label="' + escHtml(dPack.closeModalAria) + '">&times;</button>' +
        '</div>' +
        '<div class="dp-modal-body">' +
          '<div class="dp-modal-head">' +
            '<div>' +
              '<div class="dp-modal-kind">' + escHtml((pOv && pOv.kind) || '') + '</div>' +
              '<h2 class="dp-modal-title">' + escHtml(p.name) + '</h2>' +
              '<div class="dp-modal-stack">' + p.stack.map(function (s) { return '<span>' + escHtml(trStack(cPack, s)) + '</span>'; }).join('') + '</div>' +
            '</div>' +
            '<div class="dp-modal-desc">' +
              ((pOv && pOv.t) || []).map(function (par) { return '<p>' + escHtml(par) + '</p>'; }).join('') +
            '</div>' +
          '</div>' +
          '<div class="dp-modal-browser">' +
            '<div class="dp-modal-bar">' +
              '<span class="dp-modal-dots" aria-hidden="true"><i></i><i></i><i></i></span>' +
              '<span class="dp-modal-url">' + escHtml(p.domain) + '</span>' +
              '<a class="dp-modal-open-link" href="' + escHtml(demoUrl) + '" target="_blank" rel="noopener noreferrer">' + escHtml(dPack.modalLightboxHint) + '</a>' +
            '</div>' +
            '<img class="dp-modal-shot" src="' + escHtml(p.img) + '" alt="' + escHtml((pOv && pOv.alt) || p.name) + '" decoding="async">' +
          '</div>' +
          '<section class="dp-modal-sec">' +
            '<h3>' + escHtml(cPack.closeTitle) + '</h3>' +
            '<div class="dp-modal-crops">' + cropsHtml + '</div>' +
          '</section>' +
          '<section class="dp-modal-sec dp-modal-two">' +
            '<div>' +
              '<h3>' + escHtml(cPack.palTitle) + ' <small>' + escHtml(cPack.palHint) + '</small></h3>' +
              '<div class="dp-modal-pal">' + palHtml + '</div>' +
            '</div>' +
            '<div>' +
              '<h3>' + escHtml(cPack.rowsTitle) + '</h3>' +
              '<dl class="dp-modal-rows">' + rowsHtml + '</dl>' +
            '</div>' +
          '</section>' +
        '</div>' +
        '<div class="dp-modal-foot">' +
          '<button type="button" class="dp-modal-next" data-dp-case="' + escHtml(nextP.id) + '">' + escHtml(cPack.nextLbl) + ' ' + escHtml(nextP.name) + ' &rarr;</button>' +
          '<div class="dp-modal-foot-acts">' +
            '<a class="dp-btn-pri" href="' + escHtml(demoUrl) + '" target="_blank" rel="noopener noreferrer">' + escHtml(dPack.demoBtn) + '</a>' +
            '<button type="button" class="dp-btn-sec" data-dp-close-modal="1">' + escHtml(cPack.closeBtn) + '</button>' +
          '</div>' +
        '</div>';
    }

    function openCaseModal(projectId) {
      if (!modalEl) return;
      activeModalProjectId = projectId;
      renderCaseModal(projectId);
      modalEl.hidden = false;
      requestAnimationFrame(function () {
        if (!disposed) modalEl.classList.add('open');
      });
      var closeBtn = modalEl.querySelector('[data-dp-close-modal]');
      if (closeBtn) closeBtn.focus({ preventScroll: true });
    }

    function closeCaseModal() {
      if (!modalEl || !activeModalProjectId) return false;
      activeModalProjectId = null;
      modalEl.classList.remove('open');
      setTimeout(function () {
        if (!activeModalProjectId && modalEl) modalEl.hidden = true;
      }, reducedMotion ? 0 : 260);
      return true;
    }

    /* ---------- Check Three.js + WebGL availability (graceful offline fallback) ---------- */
    var THREE = window.THREE;
    var renderer = null;
    if (THREE) {
      try {
        renderer = new THREE.WebGLRenderer({
          canvas: canvas,
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance'
        });
      } catch (_) {
        renderer = null;
      }
    }

    if (!THREE || !renderer) {
      var fb = document.createElement('div');
      fb.className = 'dp-fallback';
      stage.appendChild(fb);

      function renderFallback() {
        lang = getLang();
        var pack = getDepotPack(lang);
        if (!pack) return;
        var isRtl = lang === 'ar';
        stage.setAttribute('data-lang', lang);
        stage.setAttribute('dir', isRtl ? 'rtl' : 'ltr');
        wordSpan.textContent = pack.word;
        if (homeBtn) homeBtn.textContent = isRtl ? pack.navHome + ' →' : '← ' + pack.navHome;
        if (talkBtn) talkBtn.textContent = pack.navTalk;
        if (pillEl) pillEl.textContent = pack.pill;
        if (eyebrowEl) eyebrowEl.textContent = pack.eyebrow;

        fb.innerHTML = PILE_SPECS.map(function (s) {
          var c = pack.containers[s.id];
          var bg = HEX_MAP[s.color] || '#1D2C59';
          return (
            '<button type="button" class="dp-fb-box" data-fb-id="' + s.id + '" style="background:' + bg + ';color:' + s.ink + '">' +
              '<small>' + escHtml(c.eb) + '</small>' +
              '<strong>' + escHtml(c.label.join(' ')) + '</strong>' +
              '<p>' + escHtml(c.body) + '</p>' +
            '</button>'
          );
        }).join('');
        if (activeModalProjectId) renderCaseModal(activeModalProjectId);
      }

      var onFbClick = function (e) {
        var t = e.target;
        if (!t || !t.closest) return;
        if (t === modalEl || t.closest('[data-dp-close-modal]')) { closeCaseModal(); return; }
        var cBtn = t.closest('[data-dp-case]');
        if (cBtn) { openCaseModal(cBtn.getAttribute('data-dp-case')); return; }
        var box = t.closest('[data-fb-id]');
        if (box) {
          var id = box.getAttribute('data-fb-id');
          var spec = PILE_SPECS.find(function (s) { return s.id === id; });
          if (spec && spec.projectId) openCaseModal(spec.projectId);
          else if (spec && spec.github) window.open(spec.github, '_blank', 'noopener,noreferrer');
          else if (spec && spec.contact && window.zkJumpPage) window.zkJumpPage(6);
        }
      };
      stage.addEventListener('click', onFbClick);
      window.addEventListener('zk-lang', renderFallback);
      renderFallback();
      window.__zkDepotEscape = function () { return closeCaseModal(); };
      return function () {
        disposed = true;
        stage.removeEventListener('click', onFbClick);
        window.removeEventListener('zk-lang', renderFallback);
        document.body.classList.remove('dp-active');
        delete window.__zkDepotEscape;
      };
    }

    /* ---------- Three.js Scene Setup (r149 & r160+ exact parity) ---------- */
    var isLegacyLights = !('outputColorSpace' in renderer);
    var lightMul = isLegacyLights ? (1 / Math.PI) : 1;
    function makeColor(hex) {
      var c = new THREE.Color(hex);
      if (isLegacyLights && c.convertSRGBToLinear) c.convertSRGBToLinear();
      return c;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
    if ('outputColorSpace' in renderer && THREE.SRGBColorSpace) {
      renderer.outputColorSpace = THREE.SRGBColorSpace;
    } else if (THREE.sRGBEncoding) {
      renderer.outputEncoding = THREE.sRGBEncoding;
    }
    renderer.toneMapping = THREE.NoToneMapping;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    var rafId = 0;

    /* ---------- Disposables Registry ---------- */
    var geometries = new Set();
    var materials = new Set();
    var textures = new Set();
    function trackGeo(g) { geometries.add(g); return g; }
    function trackMat(m) { materials.add(m); return m; }
    function trackTex(t) { textures.add(t); return t; }

    /* ---------- Layout Frame State ---------- */
    var frame = {
      vw: window.innerWidth || 1440,
      vh: window.innerHeight || 900,
      portrait: false,
      k: 1,
      n: 1,
      tx: 0,
      ty: 0,
      floorY: FLOOR_Y_DESKTOP,
      pileTopY: -382,
      railScreenY: 66,
      railY: -66,
      wordTop: 711,
      c: new THREE.Vector3(720, -450, 0)
    };

    function toWorld(sx, sy) {
      return new THREE.Vector3((sx - frame.tx) / frame.k, -(sy - frame.ty) / frame.k, 0);
    }

    function toScreenY(wy) {
      return frame.ty - wy * frame.k;
    }

    var measureCv = document.createElement('canvas');
    var measureCtx = measureCv.getContext('2d');

    function layoutWordAndFrame() {
      var vw = stage.clientWidth || window.innerWidth || 1440;
      var vh = stage.clientHeight || window.innerHeight || 900;
      var portrait = vw / vh < 1.05;
      var pack = getDepotPack(lang);
      var wordText = (pack && pack.word) || 'PROYEK';
      var isCjkOrAr = lang === 'ar' || lang === 'zh' || lang === 'ja' || lang === 'ko';

      frame.vw = vw;
      frame.vh = vh;
      frame.portrait = portrait;
      stage.classList.toggle('is-portrait', portrait);

      if (!portrait) {
        frame.k = Math.min(vw / 1440, vh / 900);
        frame.n = Math.max(0.68, Math.min(1.08, frame.k));
        frame.floorY = FLOOR_Y_DESKTOP;
        frame.pileTopY = -382;
      } else {
        frame.n = Math.min(1, Math.max(0.68, vw / 520));
        frame.k = Math.min(vw / 620, vh / 1220);
        frame.floorY = FLOOR_Y_PORTRAIT;
        frame.pileTopY = -561;
      }

      var baseGap = portrait ? Math.max(26, 30 * frame.n) : 34 * frame.k;
      var refSize = 100;
      var fontStack = '"Archivo X", "Archivo", "Unbounded", "Noto Sans KR", system-ui, sans-serif';
      measureCtx.font = '900 ' + refSize + 'px ' + fontStack;
      try {
        measureCtx.letterSpacing = isCjkOrAr ? '0.02em' : '-0.035em';
      } catch (_) {}

      var mRef = measureCtx.measureText(wordText);
      var wRef = Math.max(10, mRef.width);
      var fs = (refSize * (vw * 1.005)) / wRef;

      var aARef = mRef.actualBoundingBoxAscent || refSize * 0.72;
      var maxCapH = portrait
        ? Math.min(vw * 0.24, vh * 0.14)
        : Math.min(180 * frame.k, vh * 0.23);
      var unclampedCapH = (aARef / refSize) * fs;
      var clamped = false;
      if (unclampedCapH > maxCapH) {
        fs = (maxCapH * refSize) / Math.max(10, aARef);
        clamped = true;
      }

      measureCtx.font = '900 ' + fs.toFixed(2) + 'px ' + fontStack;
      var m = measureCtx.measureText(wordText);
      var fA = m.fontBoundingBoxAscent || fs * 0.85;
      var fD = m.fontBoundingBoxDescent || fs * 0.20;
      var aA = m.actualBoundingBoxAscent || fs * 0.72;
      var aD = m.actualBoundingBoxDescent || 0;
      var renderedW = m.width;

      var effectiveGap = lang === 'ar' ? Math.max(baseGap, aD + 12 * frame.n) : baseGap;
      var wordB = effectiveGap - ((fs - (fA + fD)) / 2 + fD);
      var wordX = clamped ? (vw - renderedW) / 2 : -vw * 0.004;
      var wordTop = vh - effectiveGap - aA;
      var wordH = aA + effectiveGap;

      frame.wordTop = wordTop;

      if (!portrait) {
        frame.tx = (vw - 1440 * frame.k) / 2;
        frame.ty = vh - 900 * frame.k;
      } else {
        frame.tx = vw / 2 - 310 * frame.k;
        frame.ty = (wordTop + 14 * frame.k) - 1040 * frame.k;
      }

      frame.railScreenY = portrait
        ? Math.max(58, 66 * frame.n)
        : Math.max(60, Math.min(72, 68 * frame.n));
      frame.railY = toWorld(0, frame.railScreenY).y;
      frame.c.copy(toWorld(vw / 2, vh / 2));

      stage.style.setProperty('--k', frame.k.toFixed(4) + 'px');
      stage.style.setProperty('--n', frame.n.toFixed(4) + 'px');
      stage.style.setProperty('--rail', frame.railScreenY.toFixed(2) + 'px');
      stage.style.setProperty('--wordFS', fs.toFixed(2) + 'px');
      stage.style.setProperty('--wordX', wordX.toFixed(2) + 'px');
      stage.style.setProperty('--wordB', wordB.toFixed(2) + 'px');
      stage.style.setProperty('--wordH', wordH.toFixed(2) + 'px');
    }

    /* ---------- Scene, Camera, Tactile Studio Lights, Shadow Catcher ---------- */
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(20, 1440 / 900, 100, 12000);

    var ambLight = new THREE.AmbientLight(makeColor(0xffffff), 1.55 * lightMul);
    scene.add(ambLight);

    var hemiLight = new THREE.HemisphereLight(makeColor(0xfffaf3), makeColor(0xc96649), 0.48 * lightMul);
    scene.add(hemiLight);

    var keyLight = new THREE.DirectionalLight(makeColor(0xfffaf2), 1.08 * lightMul);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.set(1024, 1024);
    keyLight.shadow.radius = 4;
    keyLight.shadow.bias = -0.0005;
    keyLight.shadow.normalBias = 0.5;
    scene.add(keyLight);
    scene.add(keyLight.target);

    var fillLight = new THREE.DirectionalLight(makeColor(0xffe9dc), 0.42 * lightMul);
    scene.add(fillLight);
    scene.add(fillLight.target);

    var floorGeo = trackGeo(new THREE.PlaneGeometry(6000, 3000));
    var floorMat = trackMat(new THREE.ShadowMaterial({ opacity: 0.24 }));
    var floorMesh = new THREE.Mesh(floorGeo, floorMat);
    floorMesh.rotation.x = -Math.PI / 2;
    floorMesh.position.set(720, FLOOR_Y_DESKTOP, 0);
    floorMesh.receiveShadow = true;
    scene.add(floorMesh);

    /* ---------- Cached Corrugation Normal Maps & Studio Materials ---------- */
    var normalSourceCanvas = makeCorrugationCanvas();
    var normalCache = new Map();
    var matCache = new Map();

    function getNormalMap(len, rotated) {
      var rep = Math.max(1, Math.round(len / 11));
      var key = rep + '_' + (rotated ? 1 : 0);
      if (normalCache.has(key)) return normalCache.get(key);
      var tex = trackTex(new THREE.CanvasTexture(normalSourceCanvas));
      setLinearTextureSpace(THREE, tex);
      tex.wrapS = THREE.RepeatWrapping;
      tex.wrapT = THREE.RepeatWrapping;
      tex.center.set(0.5, 0.5);
      if (rotated) tex.rotation = Math.PI / 2;
      tex.repeat.set(rep, 1);
      tex.needsUpdate = true;
      normalCache.set(key, tex);
      return tex;
    }

    function getCorrugatedMat(hexColor, len, rotated) {
      var rep = Math.max(1, Math.round(len / 11));
      var key = hexColor + '_' + rep + '_' + (rotated ? 1 : 0);
      if (matCache.has(key)) return matCache.get(key);
      var mat = trackMat(new THREE.MeshStandardMaterial({
        color: makeColor(hexColor),
        roughness: 0.54,
        metalness: 0.06,
        normalMap: getNormalMap(len, rotated),
        normalScale: new THREE.Vector2(0.72, 0.72)
      }));
      matCache.set(key, mat);
      return mat;
    }

    function getFrameMat(hexColor) {
      var key = 'frame_' + hexColor;
      if (matCache.has(key)) return matCache.get(key);
      var c = new THREE.Color(hexColor).multiplyScalar(0.86);
      if (isLegacyLights && c.convertSRGBToLinear) c.convertSRGBToLinear();
      var mat = trackMat(new THREE.MeshStandardMaterial({
        color: c,
        roughness: 0.42,
        metalness: 0.12
      }));
      matCache.set(key, mat);
      return mat;
    }

    function getCornerMat(hexColor) {
      var key = 'corner_' + hexColor;
      if (matCache.has(key)) return matCache.get(key);
      var c = new THREE.Color(hexColor).multiplyScalar(0.76);
      if (isLegacyLights && c.convertSRGBToLinear) c.convertSRGBToLinear();
      var mat = trackMat(new THREE.MeshStandardMaterial({
        color: c,
        roughness: 0.36,
        metalness: 0.22
      }));
      matCache.set(key, mat);
      return mat;
    }

    var lockRodMat = trackMat(new THREE.MeshStandardMaterial({
      color: makeColor(COLORS.lockRods),
      roughness: 0.34,
      metalness: 0.28
    }));

    var lockCamMat = trackMat(new THREE.MeshStandardMaterial({
      color: makeColor(COLORS.bolts),
      roughness: 0.4,
      metalness: 0.32
    }));

    /* ---------- Build the 7 Precision ISO Shipping Containers ---------- */
    var containers = [];
    var containerMap = new Map();
    var pickMeshes = [];

    function buildContainer(spec) {
      var sz = SIZES[spec.size];
      var L = sz[0], H = sz[1], D = sz[2];
      var group = new THREE.Group();
      var initPose = spec.desktop;
      var homePos = new THREE.Vector3(initPose.pos[0], -initPose.pos[1], initPose.pos[2]);
      var homeEuler = new THREE.Euler(initPose.rot[0], initPose.rot[1], initPose.rot[2], 'XYZ');
      var homeQuat = new THREE.Quaternion().setFromEuler(homeEuler);
      group.position.copy(homePos);
      group.quaternion.copy(homeQuat);
      group.userData.containerId = spec.id;

      var outL = getCorrugatedMat(spec.color, L, false);
      var outD = getCorrugatedMat(spec.color, D, false);
      var outRoof = getCorrugatedMat(spec.color, D, true);
      var inL = getCorrugatedMat(COLORS.inside, L, false);
      var inD = getCorrugatedMat(COLORS.inside, D, false);
      var inRoof = getCorrugatedMat(COLORS.inside, D, true);
      var frameMat = getFrameMat(spec.color);
      var cornerMat = getCornerMat(spec.color);

      function addPart(geo, mat, x, y, z) {
        var m = new THREE.Mesh(trackGeo(geo), mat);
        m.position.set(x, y, z);
        m.castShadow = true;
        m.receiveShadow = true;
        m.userData.containerId = spec.id;
        group.add(m);
        pickMeshes.push(m);
        return m;
      }

      /* Recessed corrugated wall panels cleanly inset inside structural frame (0% Z-fighting!) */
      var innerW = L - 2 * F + 2;
      var innerH = H - 2 * F + 2;
      var innerD = D - 2 * F + 2;

      /* Back wall, roof, floor, left wall, right wall */
      addPart(new THREE.BoxGeometry(innerW, innerH, T), [outL, outL, outL, outL, inL, outL], 0, 0, -D / 2 + T / 2 + 1.5);
      addPart(new THREE.BoxGeometry(innerW, T, innerD), [outD, outD, outRoof, inRoof, outL, outL], 0, H / 2 - T / 2 - 1.5, 0);
      addPart(new THREE.BoxGeometry(innerW, T, innerD), [outD, outD, inRoof, outRoof, outL, outL], 0, -H / 2 + T / 2 + 1.5, 0);
      addPart(new THREE.BoxGeometry(T, innerH, innerD), [inD, outD, outD, outD, outD, outD], -L / 2 + T / 2 + 1.5, 0, 0);
      addPart(new THREE.BoxGeometry(T, innerH, innerD), [outD, inD, outD, outD, outD, outD], L / 2 - T / 2 - 1.5, 0, 0);

      /* 8 Precision ISO Corner Castings (slightly proud, eliminate all corner coplanar artifacts) */
      var cGeo = trackGeo(new THREE.BoxGeometry(CORNER, CORNER, CORNER));
      var cx = L / 2 - CORNER / 2 + 0.5;
      var cy = H / 2 - CORNER / 2 + 0.5;
      var cz = D / 2 - CORNER / 2 + 0.5;
      [-1, 1].forEach(function (sx) {
        [-1, 1].forEach(function (sy) {
          [-1, 1].forEach(function (szSign) {
            var cm = new THREE.Mesh(cGeo, cornerMat);
            cm.position.set(sx * cx, sy * cy, szSign * cz);
            cm.castShadow = true;
            cm.receiveShadow = true;
            cm.userData.containerId = spec.id;
            group.add(cm);
            pickMeshes.push(cm);
          });
        });
      });

      /* 12 Structural frame beams trimmed cleanly BETWEEN corner castings (zero overlap!) */
      var fx = L / 2 - F / 2;
      var fy = H / 2 - F / 2;
      var fz = D / 2 - F / 2;

      var postGeo = trackGeo(new THREE.BoxGeometry(F, Math.max(4, H - 2 * CORNER + 1), F));
      var longGeo = trackGeo(new THREE.BoxGeometry(Math.max(4, L - 2 * CORNER + 1), F, F));
      var shortGeo = trackGeo(new THREE.BoxGeometry(F, F, Math.max(4, D - 2 * CORNER + 1)));

      function addBar(geo, x, y, z) {
        var m = new THREE.Mesh(geo, frameMat);
        m.position.set(x, y, z);
        m.castShadow = true;
        m.receiveShadow = true;
        m.userData.containerId = spec.id;
        group.add(m);
        pickMeshes.push(m);
      }

      [-1, 1].forEach(function (sx) {
        [-1, 1].forEach(function (szSign) { addBar(postGeo, sx * fx, 0, szSign * fz); });
      });
      [-1, 1].forEach(function (sy) {
        [-1, 1].forEach(function (szSign) { addBar(longGeo, 0, sy * fy, szSign * fz); });
      });
      [-1, 1].forEach(function (sx) {
        [-1, 1].forEach(function (sy) { addBar(shortGeo, sx * fx, sy * fy, 0); });
      });

      /* Double front doors pivoted on outer front corners with realistic center seam */
      var dW = L / 2 - F - 0.5;
      var dH = H - 2 * F - 0.8;
      var doorOut = getCorrugatedMat(spec.color, dW, false);
      var doorIn = getCorrugatedMat(COLORS.inside, dW, false);
      var doorMats = [doorOut, doorOut, doorOut, doorOut, doorOut, doorIn];
      var doorGeo = trackGeo(new THREE.BoxGeometry(dW, dH, T));
      var rodGeo = trackGeo(new THREE.CylinderGeometry(1.4, 1.4, dH * 0.9, 8));
      var handleGeo = trackGeo(new THREE.BoxGeometry(7, 2.6, 2.6));

      var leftPivot = new THREE.Group();
      leftPivot.position.set(-(L / 2 - F), 0, D / 2 - F / 2);
      var leftMesh = new THREE.Mesh(doorGeo, doorMats);
      leftMesh.position.set(dW / 2, 0, 0);
      leftMesh.castShadow = true;
      leftMesh.receiveShadow = true;
      leftMesh.userData.containerId = spec.id;
      leftPivot.add(leftMesh);
      pickMeshes.push(leftMesh);

      [0.32, 0.72].forEach(function (frac) {
        var rod = new THREE.Mesh(rodGeo, lockRodMat);
        rod.position.set(dW * frac, 0, -T / 2 - 1.5);
        rod.castShadow = true;
        rod.receiveShadow = true;
        leftPivot.add(rod);

        var cam = new THREE.Mesh(handleGeo, lockCamMat);
        cam.position.set(dW * frac + 3, -dH * 0.14, -T / 2 - 2.4);
        leftPivot.add(cam);
      });
      group.add(leftPivot);

      var rightPivot = new THREE.Group();
      rightPivot.position.set(L / 2 - F, 0, D / 2 - F / 2);
      var rightMesh = new THREE.Mesh(doorGeo, doorMats);
      rightMesh.position.set(-dW / 2, 0, 0);
      rightMesh.castShadow = true;
      rightMesh.receiveShadow = true;
      rightMesh.userData.containerId = spec.id;
      rightPivot.add(rightMesh);
      pickMeshes.push(rightMesh);

      [0.32, 0.72].forEach(function (frac) {
        var rod = new THREE.Mesh(rodGeo, lockRodMat);
        rod.position.set(-dW * frac, 0, -T / 2 - 1.5);
        rod.castShadow = true;
        rod.receiveShadow = true;
        rightPivot.add(rod);

        var cam = new THREE.Mesh(handleGeo, lockCamMat);
        cam.position.set(-dW * frac - 3, -dH * 0.14, -T / 2 - 2.4);
        rightPivot.add(cam);
      });
      group.add(rightPivot);

      /* High-contrast ISO Stencil label plane in front of closed doors */
      var pack = getDepotPack(lang);
      var cCopy = pack && pack.containers && pack.containers[spec.id];
      var labelTex = createLabelTexture(
        THREE,
        spec,
        (cCopy && cCopy.label) || [spec.id.toUpperCase()],
        lang === 'ar' && !spec.projectId
      );
      var labelMat = trackMat(new THREE.MeshStandardMaterial({
        map: labelTex,
        transparent: true,
        opacity: 1,
        roughness: 0.62,
        metalness: 0,
        depthWrite: false,
        polygonOffset: true,
        polygonOffsetFactor: -2
      }));
      var labelMesh = new THREE.Mesh(trackGeo(new THREE.PlaneGeometry(L - 2 * F, H - 2 * F)), labelMat);
      labelMesh.position.set(0, 0, D / 2 - F / 2 + T / 2 + 1.8);
      labelMesh.userData.containerId = spec.id;
      group.add(labelMesh);
      pickMeshes.push(labelMesh);

      scene.add(group);

      var item = {
        spec: spec,
        L: L,
        H: H,
        D: D,
        dW: dW,
        group: group,
        leftPivot: leftPivot,
        rightPivot: rightPivot,
        labelMesh: labelMesh,
        labelMat: labelMat,
        labelTex: labelTex,
        homePos: homePos,
        homeEuler: homeEuler,
        homeQuat: homeQuat,
        restPos: homePos.clone(),
        hover: 0,
        hoverTarget: 0,
        setShadows: function (on) {
          group.traverse(function (obj) {
            if (obj.isMesh && obj !== labelMesh) obj.castShadow = on;
          });
        },
        refreshLabel: function () {
          var curPack = getDepotPack(lang);
          var curCopy = curPack && curPack.containers && curPack.containers[spec.id];
          var nextTex = createLabelTexture(
            THREE,
            spec,
            (curCopy && curCopy.label) || [spec.id.toUpperCase()],
            lang === 'ar' && !spec.projectId
          );
          if (item.labelTex) item.labelTex.dispose();
          item.labelTex = nextTex;
          labelMat.map = nextTex;
          labelMat.needsUpdate = true;
        }
      };
      containers.push(item);
      containerMap.set(spec.id, item);
    }

    for (var si = 0; si < PILE_SPECS.length; si++) buildContainer(PILE_SPECS[si]);

    function getActiveDrops(id) {
      var table = frame.portrait ? PORTRAIT_DROPS : DESKTOP_DROPS;
      return table[id] || [];
    }

    function applyYardLayout(snapContainers) {
      var key = frame.portrait ? 'portrait' : 'desktop';
      var activeDropMap = {};
      if (openItem) {
        var rules = getActiveDrops(openItem.spec.id);
        for (var ri = 0; ri < rules.length; ri++) {
          activeDropMap[rules[ri].id] = rules[ri].dy;
        }
      }

      for (var i = 0; i < containers.length; i++) {
        var item = containers[i];
        var p = item.spec[key];
        item.homePos.set(p.pos[0], -p.pos[1], p.pos[2]);
        item.homeEuler.set(p.rot[0], p.rot[1], p.rot[2], 'XYZ');
        item.homeQuat.setFromEuler(item.homeEuler);

        var dy = activeDropMap[item.spec.id] || 0;
        item.restPos.copy(item.homePos);
        item.restPos.y += dy;

        if (snapContainers && item !== openItem) {
          item.hover = 0;
          item.hoverTarget = 0;
          item.group.position.copy(item.restPos);
          item.group.quaternion.copy(item.homeQuat);
          item.group.scale.setScalar(1);
        }
      }
    }

    /* ---------- Build Overhead Gantry Crane ---------- */
    var steelMat = trackMat(new THREE.MeshStandardMaterial({
      color: makeColor(COLORS.steel),
      roughness: 0.35,
      metalness: 0.14
    }));
    var boltMat = trackMat(new THREE.MeshStandardMaterial({
      color: makeColor(COLORS.bolts),
      roughness: 0.48,
      metalness: 0.24
    }));
    var cableMat = trackMat(new THREE.MeshStandardMaterial({
      color: makeColor(COLORS.cable),
      roughness: 0.42,
      metalness: 0.18
    }));

    var railMesh = new THREE.Mesh(trackGeo(new THREE.CylinderGeometry(6, 6, 9000, 16)), steelMat);
    railMesh.rotation.z = Math.PI / 2;
    railMesh.castShadow = false;
    railMesh.receiveShadow = true;
    scene.add(railMesh);

    var boltsMesh = new THREE.InstancedMesh(
      trackGeo(new THREE.SphereGeometry(2.1, 8, 8)),
      boltMat,
      BOLT_COUNT
    );
    scene.add(boltsMesh);
    var boltDummy = new THREE.Object3D();

    function updateRailAndBolts() {
      railMesh.position.set(frame.c.x, frame.railY, -10);
      var startX = frame.c.x - ((BOLT_COUNT - 1) * BOLT_STEP) / 2;
      for (var i = 0; i < BOLT_COUNT; i++) {
        boltDummy.position.set(startX + i * BOLT_STEP, frame.railY, -3.5);
        boltDummy.updateMatrix();
        boltsMesh.setMatrixAt(i, boltDummy.matrix);
      }
      boltsMesh.instanceMatrix.needsUpdate = true;
    }

    var trolley = new THREE.Group();
    var trolleyBody = new THREE.Mesh(trackGeo(createRoundedBoxGeometry(THREE, 60, 28, 28, 4, 6)), steelMat);
    trolleyBody.castShadow = false;
    trolleyBody.receiveShadow = true;
    trolley.add(trolleyBody);

    var wheelGeo = trackGeo(new THREE.CylinderGeometry(5.8, 5.8, 32, 16));
    [-17, 17].forEach(function (wx) {
      var wh = new THREE.Mesh(wheelGeo, steelMat);
      wh.rotation.x = Math.PI / 2;
      wh.position.set(wx, 6, 0);
      trolley.add(wh);
    });

    var hubMesh = new THREE.Mesh(trackGeo(createRoundedBoxGeometry(THREE, 20, 15, 18, 3, 4)), steelMat);
    hubMesh.position.set(0, -21, 0);
    trolley.add(hubMesh);
    scene.add(trolley);

    var cableMesh = new THREE.Mesh(trackGeo(new THREE.CylinderGeometry(2.3, 2.3, 1, 10)), cableMat);
    scene.add(cableMesh);

    var spreader = new THREE.Group();
    var spPlate = new THREE.Mesh(trackGeo(createRoundedBoxGeometry(THREE, 56, 20, 28, 3, 5)), steelMat);
    spPlate.position.set(0, 1, 0);
    spPlate.castShadow = false;
    spPlate.receiveShadow = true;
    spreader.add(spPlate);

    var spKnob = new THREE.Mesh(trackGeo(new THREE.CylinderGeometry(6.8, 6.8, 10, 14)), steelMat);
    spKnob.position.set(0, 10, 0);
    spreader.add(spKnob);

    var spBar = new THREE.Mesh(trackGeo(new THREE.BoxGeometry(92, 6, 10)), steelMat);
    spBar.position.set(0, -9, 0);
    spBar.castShadow = false;
    spreader.add(spBar);
    scene.add(spreader);

    var trolleyX = 720;
    var spreaderPos = new THREE.Vector3(720, -68 - 30 - REST_CABLE - SPREADER_H / 2, 6);
    var UP_VEC = new THREE.Vector3(0, 1, 0);
    var tmpTop = new THREE.Vector3();
    var tmpBot = new THREE.Vector3();
    var tmpDiff = new THREE.Vector3();

    function syncCraneMeshes() {
      trolley.position.set(trolleyX, frame.railY - 6, 6);
      spreader.position.copy(spreaderPos);

      tmpTop.set(trolleyX, frame.railY - 30, 6);
      tmpBot.set(spreaderPos.x, spreaderPos.y + SPREADER_H / 2, spreaderPos.z);
      tmpDiff.subVectors(tmpBot, tmpTop);
      var len = Math.max(2, tmpDiff.length());
      cableMesh.position.copy(tmpTop).addScaledVector(tmpDiff, 0.5);
      cableMesh.scale.set(1, len, 1);
      tmpDiff.normalize();
      cableMesh.quaternion.setFromUnitVectors(UP_VEC, tmpDiff);
    }

    function restSpreaderY() {
      var cable = frame.portrait ? 78 : REST_CABLE;
      return frame.railY - 30 - cable - SPREADER_H / 2;
    }

    function getAttachWorld(item) {
      item.group.updateMatrixWorld(true);
      return item.group.localToWorld(new THREE.Vector3(0, item.H / 2, 0));
    }

    /* Wingspan-safe, collision-free hanging pose on Desktop, Laptop, Tablet & Mobile */
    function getDoorAngleDeg() {
      return frame.portrait ? 112 : 122;
    }

    function getHangPose(item) {
      var hangZ = 68;
      var theta = (getDoorAngleDeg() * Math.PI) / 180;
      /* Include ~14% perspective safety margin for forward-opening door tips */
      var wingFactor = (1 + Math.abs(Math.cos(Math.PI - theta))) * 1.14;

      if (!frame.portrait) {
        /* Measure real projected screen clearance between rail and top of pile (incl. perspective at z=68) */
        var pileTopScreen = toScreenY(frame.pileTopY);
        var topScreen = frame.railScreenY + Math.max(28, 34 * frame.n);
        var botScreen = pileTopScreen - Math.max(44, 48 * frame.n);
        var availScreenH = Math.max(158, Math.min(242, botScreen - topScreen));

        /* Keep container + wide-open 122deg doors strictly inside viewport width */
        var maxScreenWByWing = (frame.vw * 0.88) / wingFactor;
        var maxScreenW = Math.min(640, maxScreenWByWing);

        var fitH = availScreenH / frame.k;
        var fitW = maxScreenW / frame.k;
        var scale = Math.min(fitW / item.L, fitH / item.H);
        var actualH = item.H * scale;
        var midScreenY = topScreen + availScreenH * 0.48;
        var hangY = toWorld(0, midScreenY).y;

        /* Guarantee spreader never collides with top rail */
        var maxAllowedY = frame.railY - 36 - actualH / 2;
        if (hangY > maxAllowedY) hangY = maxAllowedY;

        return { pos: new THREE.Vector3(frame.c.x, hangY, hangZ), scale: scale };
      }

      /* Portrait (Mobile & Tablet): crisp showcase container cleanly suspended above docked sheet */
      var pMaxScreenWByWing = (frame.vw * 0.88) / wingFactor;
      var pMaxScreenW = Math.min(frame.vw * 0.64, pMaxScreenWByWing, 360);
      var pMaxScreenH = Math.min(frame.vh * 0.17, 138);
      var pFitW = pMaxScreenW / frame.k;
      var pFitH = pMaxScreenH / frame.k;
      var pScale = Math.min(pFitW / item.L, pFitH / item.H);
      var pActualH = item.H * pScale;
      var pTopScreen = frame.railScreenY + Math.max(26, 32 * frame.n);
      var pCenterScreenY = pTopScreen + (pActualH * frame.k) * 0.5;

      return {
        pos: new THREE.Vector3(frame.c.x, toWorld(0, pCenterScreenY).y, hangZ),
        scale: pScale
      };
    }

    /* ---------- Camera & Light Update ---------- */
    function updateCameraAndLights() {
      var vw = frame.vw, vh = frame.vh, k = frame.k, c = frame.c;
      renderer.setSize(vw, vh, false);

      var D = (vh / k / 2) / Math.tan((10 * Math.PI) / 180);
      var pitch = (7.5 * Math.PI) / 180;
      camera.aspect = vw / vh;
      camera.near = Math.max(10, 0.3 * D);
      camera.far = 3.2 * D;
      camera.position.set(c.x, c.y + Math.sin(pitch) * D, Math.cos(pitch) * D);
      camera.lookAt(c.x, c.y, 0);
      camera.updateProjectionMatrix();
      camera.updateMatrixWorld(true);

      keyLight.position.set(c.x - 480, c.y + 1500, 1150);
      keyLight.target.position.set(c.x, c.y, 0);
      keyLight.target.updateMatrixWorld();

      var sBound = (Math.max(vw, vh) / k) * 0.78;
      keyLight.shadow.camera.left = -sBound;
      keyLight.shadow.camera.right = sBound;
      keyLight.shadow.camera.top = sBound;
      keyLight.shadow.camera.bottom = -sBound;
      keyLight.shadow.camera.near = 200;
      keyLight.shadow.camera.far = 4600;
      keyLight.shadow.camera.updateProjectionMatrix();

      fillLight.position.set(c.x + 880, c.y + 220, 920);
      fillLight.target.position.set(c.x, c.y, 0);
      fillLight.target.updateMatrixWorld();

      floorMesh.position.set(c.x, frame.floorY, 0);
      updateRailAndBolts();
    }

    /* ---------- On-Demand Render Scheduler ---------- */
    var activeTweens = new Set();
    var needsRender = true;
    var hoverAnimActive = false;

    function requestRender() {
      needsRender = true;
      if (!rafId && !disposed) {
        rafId = requestAnimationFrame(tick);
      }
    }

    function tween(durSec, easeFn, onUpdate) {
      if (disposed) return Promise.resolve();
      if (reducedMotion || durSec <= 0) {
        onUpdate(1);
        requestRender();
        return Promise.resolve();
      }
      return new Promise(function (resolve) {
        activeTweens.add({
          start: performance.now(),
          dur: durSec * 1000,
          ease: easeFn || EASE.linear,
          onUpdate: onUpdate,
          resolve: resolve
        });
        requestRender();
      });
    }

    function wait(durSec) {
      if (disposed || reducedMotion || durSec <= 0) return Promise.resolve();
      return tween(durSec, EASE.linear, function () {});
    }

    /* ---------- Projected Interior Card & Mobile Cargo Sheet ---------- */
    function projectToScreen(v) {
      var p = v.clone().project(camera);
      return {
        x: ((p.x + 1) * 0.5) * frame.vw,
        y: ((-p.y + 1) * 0.5) * frame.vh
      };
    }

    function positionCardFor(item) {
      var hang = getHangPose(item);

      if (frame.portrait) {
        /* Docked spacious mobile/tablet showcase sheet cleanly below hoisted 3D container */
        var hhOuter = (item.H / 2) * hang.scale;
        var frontZ = (item.D / 2) * hang.scale;
        var botPt = projectToScreen(new THREE.Vector3(hang.pos.x, hang.pos.y - hhOuter, hang.pos.z + frontZ));
        var sheetTop = Math.max(frame.railScreenY + 118, Math.min(frame.vh * 0.34, Math.round(botPt.y + 14)));

        cardEl.classList.add('dp-sheet');
        cardEl.classList.remove('dp-compact', 'narrow', 'tight');
        cardEl.style.left = '';
        cardEl.style.top = '';
        cardEl.style.width = '';
        cardEl.style.height = '';
        cardEl.style.setProperty('--c', '1px');
        stage.style.setProperty('--sheet-top', sheetTop + 'px');
        return;
      }

      /* Desktop / Landscape: precisely nested inside 3D container back-wall cavity */
      cardEl.classList.remove('dp-sheet');
      var inset = F + 4;
      var hw = (item.L / 2 - inset) * hang.scale;
      var hh = (item.H / 2 - inset) * hang.scale;
      var backZ = (-item.D / 2 + T + 2) * hang.scale;

      var corners = [
        new THREE.Vector3(hang.pos.x - hw, hang.pos.y - hh, hang.pos.z + backZ),
        new THREE.Vector3(hang.pos.x + hw, hang.pos.y - hh, hang.pos.z + backZ),
        new THREE.Vector3(hang.pos.x - hw, hang.pos.y + hh, hang.pos.z + backZ),
        new THREE.Vector3(hang.pos.x + hw, hang.pos.y + hh, hang.pos.z + backZ)
      ];

      var minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
      for (var i = 0; i < corners.length; i++) {
        var sp = projectToScreen(corners[i]);
        if (sp.x < minX) minX = sp.x;
        if (sp.x > maxX) maxX = sp.x;
        if (sp.y < minY) minY = sp.y;
        if (sp.y > maxY) maxY = sp.y;
      }

      var w = Math.max(220, maxX - minX);
      var h = Math.max(120, maxY - minY);
      var cUnit = Math.max(0.68, Math.min(1.06, Math.min(h / 206, w / 520)));

      cardEl.style.left = minX.toFixed(1) + 'px';
      cardEl.style.top = minY.toFixed(1) + 'px';
      cardEl.style.width = w.toFixed(1) + 'px';
      cardEl.style.height = h.toFixed(1) + 'px';
      cardEl.style.setProperty('--c', cUnit.toFixed(4) + 'px');
      cardEl.classList.toggle('dp-compact', w < 415 || h < 168);
      cardEl.classList.remove('narrow', 'tight');
    }

    function checkPillOverlap(item) {
      if (!pillEl) return;
      if (!item) {
        pillEl.classList.remove('is-dim');
        return;
      }
      if (frame.portrait) {
        pillEl.classList.add('is-dim');
        return;
      }
      var hang = getHangPose(item);
      var theta = (getDoorAngleDeg() * Math.PI) / 180;
      var extraW = item.dW * Math.abs(Math.cos(Math.PI - theta));
      var hw = (item.L / 2 + extraW) * hang.scale;
      var hh = (item.H / 2) * hang.scale;
      var frontZ = (item.D / 2 + item.dW * Math.sin(theta)) * hang.scale;

      var pts = [
        new THREE.Vector3(hang.pos.x - hw, hang.pos.y - hh, hang.pos.z + frontZ),
        new THREE.Vector3(hang.pos.x + hw, hang.pos.y - hh, hang.pos.z + frontZ),
        new THREE.Vector3(hang.pos.x - hw, hang.pos.y + hh, hang.pos.z + frontZ),
        new THREE.Vector3(hang.pos.x + hw, hang.pos.y + hh, hang.pos.z + frontZ)
      ];

      var minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
      for (var i = 0; i < pts.length; i++) {
        var sp = projectToScreen(pts[i]);
        if (sp.x < minX) minX = sp.x;
        if (sp.x > maxX) maxX = sp.x;
        if (sp.y < minY) minY = sp.y;
        if (sp.y > maxY) maxY = sp.y;
      }

      var pr = pillEl.getBoundingClientRect();
      var overlaps = !(maxX < pr.left - 8 || minX > pr.right + 8 || maxY < pr.top - 8 || minY > pr.bottom + 8);
      pillEl.classList.toggle('is-dim', overlaps);
    }

    function fillCard(item) {
      var pack = getDepotPack(lang);
      var cPack = getCasePack(lang);
      var copy = pack && pack.containers && pack.containers[item.spec.id];
      if (!copy) return;

      var navIdx = NAV_ORDER.indexOf(item.spec.id);
      var prevId = NAV_ORDER[(navIdx + NAV_ORDER.length - 1) % NAV_ORDER.length];
      var nextId = NAV_ORDER[(navIdx + 1) % NAV_ORDER.length];
      var prevLbl = (pack.containers[prevId] && pack.containers[prevId].label.join(' ')) || prevId;
      var nextLbl = (pack.containers[nextId] && pack.containers[nextId].label.join(' ')) || nextId;
      var closeLbl = (cPack && cPack.closeBtn) || 'Tutup';

      var paintHex = HEX_MAP[item.spec.color] || '#1D2C59';
      var accentHex = item.spec.accent || '#F0653F';
      cardEl.style.setProperty('--ct', paintHex);
      cardEl.style.setProperty('--ca', accentHex);

      var proj = item.spec.projectId ? getProjectData(item.spec.projectId) : null;
      var isProcess = item.spec.id === 'process';

      var chipsHtml = (!isProcess && copy.chips && copy.chips.length)
        ? '<div class="dp-chips">' + copy.chips.map(function (c) { return '<span>' + escHtml(c) + '</span>'; }).join('') + '</div>'
        : '';

      var actsHtml = '';
      if (item.spec.projectId) {
        var demoUrl = (window.ZK_PROJECTS && window.ZK_PROJECTS.URL && window.ZK_PROJECTS.URL[item.spec.projectId]) || '#';
        actsHtml =
          '<div class="dp-acts">' +
            '<button type="button" class="dp-btn-pri" data-dp-case="' + escHtml(item.spec.projectId) + '">' + escHtml(pack.caseBtn) + '</button>' +
            '<a class="dp-btn-sec" href="' + escHtml(demoUrl) + '" target="_blank" rel="noopener noreferrer">' + escHtml(pack.demoBtn) + '</a>' +
          '</div>';
      } else if (item.spec.github) {
        actsHtml =
          '<div class="dp-acts">' +
            '<a class="dp-btn-pri" href="' + escHtml(item.spec.github) + '" target="_blank" rel="noopener noreferrer">' + escHtml(pack.githubBtn) + '</a>' +
          '</div>';
      } else if (item.spec.contact) {
        actsHtml =
          '<div class="dp-acts">' +
            '<button type="button" class="dp-btn-pri" data-dp-contact="1">' + escHtml(pack.contactBtn) + '</button>' +
          '</div>';
      }

      /* Rich Visual Right/Top Preview Panel inside Container Interior */
      var visHtml = '';
      if (proj) {
        visHtml =
          '<div class="dp-card-vis">' +
            '<button type="button" class="dp-mini-shot" data-dp-case="' + escHtml(proj.id) + '" aria-label="' + escHtml(pack.caseBtn + ' ' + proj.name) + '">' +
              '<div class="dp-mini-bar" aria-hidden="true">' +
                '<span class="dp-mini-dots"><i></i><i></i><i></i></span>' +
                '<span class="dp-mini-dom">' + escHtml(proj.domain) + '</span>' +
              '</div>' +
              '<div class="dp-mini-frame">' +
                '<img src="' + escHtml(proj.img) + '" alt="' + escHtml(proj.name) + '" decoding="async">' +
                '<span class="dp-mini-zoom" aria-hidden="true">&#8599;</span>' +
              '</div>' +
            '</button>' +
          '</div>';
      } else if (isProcess && copy.chips && copy.chips.length) {
        visHtml =
          '<div class="dp-card-vis">' +
            '<ol class="dp-steps">' +
              copy.chips.map(function (step, idx) {
                return '<li><b>0' + (idx + 1) + '</b><span>' + escHtml(step) + '</span></li>';
              }).join('') +
            '</ol>' +
          '</div>';
      } else if (item.spec.github) {
        visHtml =
          '<div class="dp-card-vis">' +
            '<a class="dp-spec-tile" href="' + escHtml(item.spec.github) + '" target="_blank" rel="noopener noreferrer">' +
              '<span class="dp-spec-k">GITHUB // 2026</span>' +
              '<strong class="dp-spec-v">@trynvexa</strong>' +
              '<span class="dp-spec-sub">PKL DigitalCODE · Medan</span>' +
            '</a>' +
          '</div>';
      } else if (item.spec.contact) {
        visHtml =
          '<div class="dp-card-vis">' +
            '<button type="button" class="dp-spec-tile" data-dp-contact="1">' +
              '<span class="dp-spec-k">MEDAN · WIB</span>' +
              '<strong class="dp-spec-v">2026</strong>' +
              '<span class="dp-spec-sub">WhatsApp &amp; Email &rarr;</span>' +
            '</button>' +
          '</div>';
      }

      cardEl.innerHTML =
        '<div class="dp-card-bar">' +
          '<div class="dp-eb"><i class="dp-eb-dot" aria-hidden="true"></i><span>' + escHtml(copy.eb) + '</span></div>' +
          '<div class="dp-card-ctrls">' +
            '<button type="button" class="dp-card-ico" data-dp-pick="' + escHtml(prevId) + '" aria-label="' + escHtml(pack.openSr + ' ' + prevLbl) + '">&#8249;</button>' +
            '<button type="button" class="dp-card-ico" data-dp-pick="' + escHtml(nextId) + '" aria-label="' + escHtml(pack.openSr + ' ' + nextLbl) + '">&#8250;</button>' +
            '<button type="button" class="dp-card-ico dp-card-x" data-dp-close-card="1" aria-label="' + escHtml(closeLbl) + '">&times;</button>' +
          '</div>' +
        '</div>' +
        '<div class="dp-card-grid">' +
          '<div class="dp-card-main">' +
            '<h2>' + escHtml(copy.titleBefore) + '<em>' + escHtml(copy.titleAccent) + '</em></h2>' +
            '<p class="dp-desc">' + escHtml(copy.body) + '</p>' +
            chipsHtml +
            actsHtml +
          '</div>' +
          visHtml +
        '</div>';
    }

    /* ---------- Supporting-Container Gravity Drops & Restores ---------- */
    var pendingRestore = Promise.resolve();

    function triggerSupportDrops(liftedId) {
      var rules = getActiveDrops(liftedId);
      if (!rules || !rules.length) return;

      function applyDrops() {
        if (disposed) return;
        rules.forEach(function (rule) {
          var sub = containerMap.get(rule.id);
          if (!sub) return;
          var startPos = sub.group.position.clone();
          var endPos = sub.homePos.clone();
          endPos.y += rule.dy;
          sub.restPos.copy(endPos);

          if (reducedMotion) {
            sub.group.position.copy(endPos);
            return;
          }

          tween(0.30, EASE.inQuad, function (a) {
            sub.group.position.lerpVectors(startPos, endPos, a);
          }).then(function () {
            if (disposed) return;
            return tween(0.16, EASE.linear, function (t) {
              sub.group.position.y = endPos.y + Math.sin(Math.PI * t) * (1 - t) * 4.5;
            }).then(function () {
              if (!disposed) sub.group.position.y = endPos.y;
            });
          });
        });
      }

      if (reducedMotion) applyDrops();
      else wait(0.08).then(applyDrops);
    }

    function triggerSupportRestore(returnedId) {
      var rules = getActiveDrops(returnedId);
      if (!rules || !rules.length) {
        pendingRestore = Promise.resolve();
        return;
      }

      function applyRestore() {
        if (disposed) return Promise.resolve();
        var ps = rules.map(function (rule) {
          var sub = containerMap.get(rule.id);
          if (!sub) return Promise.resolve();
          var startPos = sub.group.position.clone();
          sub.restPos.copy(sub.homePos);
          if (reducedMotion) {
            sub.group.position.copy(sub.homePos);
            return Promise.resolve();
          }
          return tween(0.24, EASE.outQuad, function (a) {
            sub.group.position.lerpVectors(startPos, sub.homePos, a);
          });
        });
        return Promise.all(ps);
      }

      if (reducedMotion) pendingRestore = applyRestore();
      else pendingRestore = wait(0.08).then(applyRestore);
    }

    /* ---------- Snappy Crane Pick & Close Choreography ---------- */
    var openItem = null;
    var busy = false;
    var queuedId = null;
    var hoveredId = null;

    function clearHovers() {
      hoveredId = null;
      for (var i = 0; i < containers.length; i++) {
        containers[i].hoverTarget = 0;
      }
      hoverAnimActive = true;
      requestRender();
    }

    function pickUp(id) {
      var item = containerMap.get(id);
      if (!item || disposed) return Promise.resolve();
      clearHovers();

      return pendingRestore.then(function () {
        if (disposed) return;
        item.hover = 0;
        item.group.position.copy(item.homePos);
        item.group.quaternion.copy(item.homeQuat);

        var attach = getAttachWorld(item);
        var startTrolleyX = trolleyX;
        var dist = Math.abs(attach.x - startTrolleyX);
        var travelDur = 0.16 + dist / 3600;
        var startSpreader = spreaderPos.clone();
        var restY = restSpreaderY();

        /* 1. Trolley travels smoothly along overhead steel rail */
        return tween(travelDur, EASE.inOutCubic, function (a) {
          trolleyX = startTrolleyX + (attach.x - startTrolleyX) * a;
          spreaderPos.set(trolleyX, startSpreader.y + (restY - startSpreader.y) * a, 6);
          syncCraneMeshes();
        }).then(function () {
          if (disposed) return;
          /* 2. Spreader lowers onto container roof */
          var lowerStart = spreaderPos.clone();
          var grabPos = new THREE.Vector3(attach.x, attach.y + SPREADER_H / 2, attach.z);
          return tween(0.24, EASE.outQuad, function (a) {
            spreaderPos.lerpVectors(lowerStart, grabPos, a);
            syncCraneMeshes();
          });
        }).then(function () {
          if (disposed) return;
          return wait(0.05);
        }).then(function () {
          if (disposed) return;
          /* 3. Hoist smoothly + trigger vertical gravity drops */
          item.setShadows(false);
          var hoistStartPos = item.group.position.clone();
          var hoistStartQuat = item.group.quaternion.clone();
          var identityQuat = new THREE.Quaternion();
          var hang = getHangPose(item);

          triggerSupportDrops(id);

          return tween(0.38, EASE.outQuad, function (a) {
            item.group.position.lerpVectors(hoistStartPos, hang.pos, a);
            item.group.quaternion.slerpQuaternions(hoistStartQuat, identityQuat, a);
            var sc = 1 + (hang.scale - 1) * a;
            item.group.scale.setScalar(sc);

            var curAttach = getAttachWorld(item);
            trolleyX = curAttach.x;
            spreaderPos.set(curAttach.x, curAttach.y + SPREADER_H / 2, curAttach.z);
            syncCraneMeshes();
          });
        }).then(function () {
          if (disposed) return;
          /* 4. Gentle settling sway */
          openItem = item;
          checkPillOverlap(item);

          tween(0.55, EASE.linear, function (t) {
            if (openItem === item) {
              item.group.rotation.z = 0.022 * Math.sin(3 * Math.PI * t) * (1 - t);
            }
          }).then(function () {
            if (!disposed && openItem === item) item.group.rotation.z = 0;
          });

          /* 5. Fill & show interior card */
          fillCard(item);
          positionCardFor(item);
          if (reducedMotion) {
            cardEl.classList.add('on');
            if (frame.portrait) scrimEl.classList.add('on');
          } else {
            wait(0.08).then(function () {
              if (disposed || openItem !== item) return;
              positionCardFor(item);
              cardEl.classList.add('on');
              if (frame.portrait) scrimEl.classList.add('on');
            });
          }

          /* 6. Double front doors swing open */
          var theta = (getDoorAngleDeg() * Math.PI) / 180;
          return tween(0.34, EASE.outCubic, function (a) {
            item.leftPivot.rotation.y = -theta * a;
            item.rightPivot.rotation.y = theta * a;
            item.labelMat.opacity = Math.max(0, 1 - 7 * a);
            item.labelMesh.visible = item.labelMat.opacity > 0.01;
          });
        });
      });
    }

    function closeOpen(retractAfter) {
      if (!openItem || disposed) return Promise.resolve();
      var item = openItem;
      item.group.rotation.z = 0;

      cardEl.classList.remove('on');
      scrimEl.classList.remove('on');
      var startLeft = item.leftPivot.rotation.y;
      var startRight = item.rightPivot.rotation.y;
      item.labelMesh.visible = true;

      return tween(0.14, EASE.inQuad, function (a) {
        item.leftPivot.rotation.y = startLeft * (1 - a);
        item.rightPivot.rotation.y = startRight * (1 - a);
        item.labelMat.opacity = Math.min(1, a * 1.4);
      }).then(function () {
        if (disposed) return;
        item.leftPivot.rotation.y = 0;
        item.rightPivot.rotation.y = 0;
        item.labelMat.opacity = 1;
        checkPillOverlap(null);
        return wait(0.03);
      }).then(function () {
        if (disposed) return;
        var lowerStartPos = item.group.position.clone();
        var lowerStartQuat = item.group.quaternion.clone();
        var lowerStartScale = item.group.scale.x;

        triggerSupportRestore(item.spec.id);

        return tween(0.30, EASE.inOutQuad, function (a) {
          item.group.position.lerpVectors(lowerStartPos, item.homePos, a);
          item.group.quaternion.slerpQuaternions(lowerStartQuat, item.homeQuat, a);
          var sc = lowerStartScale + (1 - lowerStartScale) * a;
          item.group.scale.setScalar(sc);

          var curAttach = getAttachWorld(item);
          trolleyX = curAttach.x;
          spreaderPos.set(curAttach.x, curAttach.y + SPREADER_H / 2, curAttach.z);
          syncCraneMeshes();
        });
      }).then(function () {
        if (disposed) return;
        item.setShadows(true);
        item.restPos.copy(item.homePos);
        openItem = null;

        return tween(0.15, EASE.linear, function (t) {
          item.group.position.y = item.homePos.y + Math.sin(Math.PI * t) * (1 - t) * 4.5;
        }).then(function () {
          if (disposed) return;
          item.group.position.copy(item.homePos);
          item.group.quaternion.copy(item.homeQuat);
          item.group.scale.setScalar(1);
        });
      }).then(function () {
        if (disposed || !retractAfter) return;
        var retStart = spreaderPos.clone();
        var startTX = trolleyX;
        return tween(0.24, EASE.outQuad, function (a) {
          var targetX = frame.c.x;
          var targetY = restSpreaderY();
          trolleyX = startTX + (targetX - startTX) * a;
          spreaderPos.set(trolleyX, retStart.y + (targetY - retStart.y) * a, 6);
          syncCraneMeshes();
        });
      });
    }

    function runAction(targetId) {
      if (disposed) return;
      busy = true;

      var job;
      if (targetId === '__close__') {
        job = openItem ? closeOpen(true) : Promise.resolve();
      } else if (openItem && openItem.spec.id === targetId) {
        job = closeOpen(true);
      } else if (openItem) {
        job = closeOpen(false).then(function () {
          if (disposed) return;
          if (queuedId === '__close__') {
            queuedId = null;
            var retStart = spreaderPos.clone();
            var startTX = trolleyX;
            var retY = restSpreaderY();
            return tween(0.22, EASE.outQuad, function (a) {
              trolleyX = startTX + (frame.c.x - startTX) * a;
              spreaderPos.set(trolleyX, retStart.y + (retY - retStart.y) * a, 6);
              syncCraneMeshes();
            });
          }
          if (queuedId) {
            targetId = queuedId;
            queuedId = null;
          }
          return pickUp(targetId);
        });
      } else {
        job = pickUp(targetId);
      }

      job.then(function () {
        busy = false;
        if (!disposed && !openItem) {
          applyYardLayout(true);
          trolleyX = frame.c.x;
          spreaderPos.set(trolleyX, restSpreaderY(), 6);
          syncCraneMeshes();
          requestRender();
        }
        if (!disposed && queuedId) {
          var next = queuedId;
          queuedId = null;
          runAction(next);
        }
      }, function () {
        busy = false;
      });
    }

    function handlePick(id) {
      if (disposed) return;
      if (busy) {
        queuedId = id;
        return;
      }
      runAction(id);
    }

    function handleCloseOnly() {
      if (disposed) return;
      if (busy) {
        queuedId = '__close__';
        return;
      }
      if (openItem) runAction('__close__');
    }

    /* ---------- Raycasting (Tactile Hover Lift + Click) ---------- */
    var raycaster = new THREE.Raycaster();
    var pointerNdc = new THREE.Vector2();

    function hitContainerAt(clientX, clientY) {
      var rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return null;
      scene.updateMatrixWorld(true);
      camera.updateMatrixWorld(true);
      pointerNdc.x = ((clientX - rect.left) / rect.width) * 2 - 1;
      pointerNdc.y = -((clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(pointerNdc, camera);
      var hits = raycaster.intersectObjects(pickMeshes, false);
      for (var i = 0; i < hits.length; i++) {
        var obj = hits[i].object;
        if (obj && obj.visible && obj.userData.containerId) {
          return obj.userData.containerId;
        }
      }
      return null;
    }

    var onCanvasMove = function (e) {
      if (activeModalProjectId || e.pointerType === 'touch') {
        canvas.style.cursor = 'default';
        return;
      }
      var id = hitContainerAt(e.clientX, e.clientY);
      canvas.style.cursor = id ? 'pointer' : 'default';

      if (!reducedMotion && !busy) {
        var nextHov = (id && (!openItem || openItem.spec.id !== id)) ? id : null;
        if (nextHov !== hoveredId) {
          hoveredId = nextHov;
          for (var i = 0; i < containers.length; i++) {
            containers[i].hoverTarget = (containers[i].spec.id === hoveredId) ? 1 : 0;
          }
          hoverAnimActive = true;
          requestRender();
        }
      }
    };

    var onCanvasLeave = function () {
      canvas.style.cursor = 'default';
      if (hoveredId) clearHovers();
    };

    var downX = 0;
    var downY = 0;
    var onCanvasDown = function (e) {
      downX = e.clientX;
      downY = e.clientY;
    };
    var onCanvasClick = function (e) {
      if (activeModalProjectId) return;
      if (Math.hypot(e.clientX - downX, e.clientY - downY) > 28) return;
      var id = hitContainerAt(e.clientX, e.clientY);
      if (id) {
        handlePick(id);
      } else if (openItem) {
        handleCloseOnly();
      }
    };

    canvas.addEventListener('pointermove', onCanvasMove, { passive: true });
    canvas.addEventListener('pointerleave', onCanvasLeave, { passive: true });
    canvas.addEventListener('pointerdown', onCanvasDown, { passive: true });
    canvas.addEventListener('click', onCanvasClick);

    /* ---------- Card, Scrim, SR Menu & Modal Interactions ---------- */
    var onStageClick = function (e) {
      var t = e.target;
      if (!t || !t.closest) return;

      if (t === modalEl || t.closest('[data-dp-close-modal]')) {
        closeCaseModal();
        return;
      }

      if (t === scrimEl || t.closest('[data-dp-close-card]')) {
        handleCloseOnly();
        return;
      }

      var swBtn = t.closest('.dp-sw-btn');
      if (swBtn) {
        var hex = swBtn.getAttribute('data-hex') || '';
        var sp = swBtn.querySelector('span');
        var cPack = getCasePack(lang);
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(hex).catch(function () {});
        }
        if (window.ZK3D && window.ZK3D.spawnSparks) {
          var r = swBtn.getBoundingClientRect();
          window.ZK3D.spawnSparks(r.left + r.width / 2, r.top + r.height / 2, hex, 14);
        }
        if (sp) {
          sp.textContent = (cPack && cPack.copied) || 'Copied!';
          swBtn.classList.add('copied');
          setTimeout(function () {
            if (sp.isConnected) {
              sp.textContent = hex;
              swBtn.classList.remove('copied');
            }
          }, 1400);
        }
        return;
      }

      var caseBtn = t.closest('[data-dp-case]');
      if (caseBtn) {
        var pid = caseBtn.getAttribute('data-dp-case');
        if (pid) openCaseModal(pid);
        return;
      }

      var contactBtn = t.closest('[data-dp-contact]');
      if (contactBtn) {
        if (window.zkJumpPage) window.zkJumpPage(6);
        return;
      }

      var pickBtn = t.closest('[data-dp-pick]');
      if (pickBtn) {
        var id = pickBtn.getAttribute('data-dp-pick');
        if (id) handlePick(id);
      }
    };
    stage.addEventListener('click', onStageClick);

    /* Keyboard ArrowLeft / ArrowRight cycling when a container is open */
    var onKeyDown = function (e) {
      if (disposed || activeModalProjectId || !openItem) return;
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        e.preventDefault();
        var idx = NAV_ORDER.indexOf(openItem.spec.id);
        var step = e.key === 'ArrowRight' ? 1 : -1;
        var nextId = NAV_ORDER[(idx + step + NAV_ORDER.length) % NAV_ORDER.length];
        handlePick(nextId);
      }
    };
    document.addEventListener('keydown', onKeyDown);

    /* ---------- Localization Sync (All 8 Languages + RTL) ---------- */
    function syncLanguageUI(rebuildTextures) {
      lang = getLang();
      var pack = getDepotPack(lang);
      if (!pack) return;

      var isRtl = lang === 'ar';
      stage.setAttribute('data-lang', lang);
      stage.setAttribute('dir', isRtl ? 'rtl' : 'ltr');

      wordSpan.textContent = pack.word;
      if (logoBtn) logoBtn.setAttribute('aria-label', pack.logoAria);
      if (homeBtn) {
        homeBtn.textContent = isRtl ? pack.navHome + ' →' : '← ' + pack.navHome;
        homeBtn.setAttribute('aria-label', pack.homeAria);
      }
      if (talkBtn) {
        talkBtn.textContent = pack.navTalk;
        talkBtn.setAttribute('aria-label', pack.talkAria);
      }
      if (pillEl) pillEl.textContent = pack.pill;
      if (eyebrowEl) eyebrowEl.textContent = pack.eyebrow;

      if (srMenu) {
        srMenu.innerHTML = PILE_SPECS.map(function (s) {
          var c = pack.containers[s.id];
          var lbl = c ? c.label.join(' ') : s.id;
          return '<button type="button" data-dp-pick="' + s.id + '">' + escHtml(pack.openSr) + ' ' + escHtml(lbl) + '</button>';
        }).join('');
      }

      if (rebuildTextures) {
        for (var i = 0; i < containers.length; i++) containers[i].refreshLabel();
      }

      layoutWordAndFrame();
      applyYardLayout(!busy);
      updateCameraAndLights();

      if (openItem && !busy) {
        var hang = getHangPose(openItem);
        openItem.group.position.copy(hang.pos);
        openItem.group.scale.setScalar(hang.scale);
        var theta = (getDoorAngleDeg() * Math.PI) / 180;
        openItem.leftPivot.rotation.y = -theta;
        openItem.rightPivot.rotation.y = theta;
        var curAttach = getAttachWorld(openItem);
        trolleyX = curAttach.x;
        spreaderPos.set(curAttach.x, curAttach.y + SPREADER_H / 2, curAttach.z);
        syncCraneMeshes();
        fillCard(openItem);
        positionCardFor(openItem);
        scrimEl.classList.toggle('on', frame.portrait && cardEl.classList.contains('on'));
        checkPillOverlap(openItem);
      } else if (!busy) {
        trolleyX = frame.c.x;
        spreaderPos.set(trolleyX, restSpreaderY(), 6);
        syncCraneMeshes();
      }
      if (activeModalProjectId) {
        renderCaseModal(activeModalProjectId);
      }
      requestRender();
    }

    var onLangChange = function () {
      if (!disposed) syncLanguageUI(true);
    };
    window.addEventListener('zk-lang', onLangChange);

    /* ---------- Responsive Resize & Orientation Handling ---------- */
    var resizeRaf = 0;
    var lastPortraitMode = null;
    var onResize = function () {
      if (resizeRaf || disposed) return;
      resizeRaf = requestAnimationFrame(function () {
        resizeRaf = 0;
        if (disposed) return;
        layoutWordAndFrame();
        var modeFlipped = lastPortraitMode !== null && lastPortraitMode !== frame.portrait;
        lastPortraitMode = frame.portrait;
        applyYardLayout(!busy || modeFlipped);
        updateCameraAndLights();

        if (openItem && !busy) {
          var hang = getHangPose(openItem);
          openItem.group.position.copy(hang.pos);
          openItem.group.scale.setScalar(hang.scale);
          var theta = (getDoorAngleDeg() * Math.PI) / 180;
          openItem.leftPivot.rotation.y = -theta;
          openItem.rightPivot.rotation.y = theta;
          var curAttach = getAttachWorld(openItem);
          trolleyX = curAttach.x;
          spreaderPos.set(curAttach.x, curAttach.y + SPREADER_H / 2, curAttach.z);
          syncCraneMeshes();
          positionCardFor(openItem);
          scrimEl.classList.toggle('on', frame.portrait && cardEl.classList.contains('on'));
          checkPillOverlap(openItem);
        } else if (!openItem) {
          /* Always keep resting trolley & spreader centered cleanly under new rail Y */
          trolleyX = frame.c.x;
          spreaderPos.set(trolleyX, restSpreaderY(), 6);
          syncCraneMeshes();
        }
        requestRender();
      });
    };
    window.addEventListener('resize', onResize, { passive: true });
    window.addEventListener('orientationchange', onResize, { passive: true });

    /* ---------- Escape Cascade (Modal -> Open Container -> Home) ---------- */
    window.__zkDepotEscape = function () {
      if (activeModalProjectId) {
        closeCaseModal();
        return true;
      }
      if (openItem) {
        handleCloseOnly();
        return true;
      }
      return false;
    };

    /* ---------- On-Demand Render Loop (0% idle GPU/CPU when still!) ---------- */
    function tick(now) {
      rafId = 0;
      if (disposed) return;

      if (activeTweens.size) {
        activeTweens.forEach(function (tw) {
          var raw = Math.min(1, (now - tw.start) / tw.dur);
          var eased = tw.ease(raw);
          tw.onUpdate(eased);
          if (raw >= 1) {
            activeTweens.delete(tw);
            tw.resolve();
          }
        });
        needsRender = true;
      }

      /* Smooth tactile Z-pull hover nudge on desktop closed containers */
      if (hoverAnimActive && !busy) {
        var stillHovering = false;
        for (var i = 0; i < containers.length; i++) {
          var c = containers[i];
          if (c === openItem) continue;
          var diff = c.hoverTarget - c.hover;
          if (Math.abs(diff) > 0.004) {
            c.hover += diff * 0.22;
            stillHovering = true;
          } else {
            c.hover = c.hoverTarget;
          }
          c.group.position.set(
            c.restPos.x,
            c.restPos.y + c.hover * 2.5,
            c.restPos.z + c.hover * 12
          );
        }
        hoverAnimActive = stillHovering;
        needsRender = true;
      }

      if (needsRender && !document.hidden) {
        needsRender = false;
        renderer.render(scene, camera);
      }

      if (activeTweens.size || hoverAnimActive || needsRender) {
        rafId = requestAnimationFrame(tick);
      }
    }

    /* ---------- Entrance Reveal Timeline ---------- */
    function runEntrance() {
      stage.classList.add('dp-ready');
      if (reducedMotion || !stage.animate) return;
      var revEls = [].slice.call(stage.querySelectorAll('.dp-rv'));
      revEls.forEach(function (el, idx) {
        var isWord = el === wordSpan;
        try {
          el.animate(
            [
              { opacity: 0, transform: isWord ? 'translateY(18%)' : 'translateY(12px)' },
              { opacity: 1, transform: 'translateY(0)' }
            ],
            {
              duration: isWord ? 1050 : 800,
              delay: 60 + idx * 55,
              easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
              fill: 'backwards'
            }
          );
        } catch (_) {}
      });
    }

    syncLanguageUI(false);
    lastPortraitMode = frame.portrait;
    trolleyX = frame.c.x;
    spreaderPos.set(trolleyX, restSpreaderY(), 6);
    syncCraneMeshes();
    renderer.render(scene, camera);
    rafId = requestAnimationFrame(tick);
    runEntrance();

    loadDepotFonts().then(function () {
      if (!disposed) syncLanguageUI(true);
    });

    /* ---------- Deterministic Cleanup ---------- */
    return function cleanup() {
      disposed = true;
      if (rafId) cancelAnimationFrame(rafId);
      if (resizeRaf) cancelAnimationFrame(resizeRaf);

      activeTweens.forEach(function (tw) { tw.resolve(); });
      activeTweens.clear();

      window.removeEventListener('zk-lang', onLangChange);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('orientationchange', onResize);
      document.removeEventListener('keydown', onKeyDown);
      canvas.removeEventListener('pointermove', onCanvasMove);
      canvas.removeEventListener('pointerleave', onCanvasLeave);
      canvas.removeEventListener('pointerdown', onCanvasDown);
      canvas.removeEventListener('click', onCanvasClick);
      stage.removeEventListener('click', onStageClick);

      document.body.classList.remove('dp-active');
      delete window.__zkDepotEscape;

      for (var i = 0; i < containers.length; i++) {
        if (containers[i].labelTex) containers[i].labelTex.dispose();
      }
      textures.forEach(function (t) { t.dispose(); });
      materials.forEach(function (m) { m.dispose(); });
      geometries.forEach(function (g) { g.dispose(); });
      renderer.dispose();
    };
  }

  function register() {
    if (window.ZK3D && window.ZK3D.registerPage) {
      window.ZK3D.registerPage(5, mountDepot);
    } else {
      window.addEventListener('load', function () {
        if (window.ZK3D && window.ZK3D.registerPage) {
          window.ZK3D.registerPage(5, mountDepot);
        }
      }, { once: true });
    }
  }

  register();
})();
