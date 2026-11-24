/* ==========================================================================
   js/projects-depot.js — Card #6: Proyek ("Zikri's Depot")
   Classic defer script (works on file://, http://, https:// with zero CORS!)
   1:1 Three.js Shipping Container & Overhead Gantry Crane Depot
   + Opsi B Case Study Detail Modal + Full 8-Language Live Localization
   ========================================================================== */
(function () {
  var COLORS = {
    navy: 0x1F2E5C,
    mustard: 0xE0A93B,
    ivory: 0xF2EBDD,
    sky: 0x8FC3E6,
    inside: 0x1A1D2B,
    steel: 0xE4E1DC,
    bolts: 0x9b968f,
    lockRods: 0xd8d3cb,
    cable: 0xd9d6d0
  };

  var HEX_MAP = {
    0x1F2E5C: '#1F2E5C',
    0xE0A93B: '#E0A93B',
    0xF2EBDD: '#F2EBDD',
    0x8FC3E6: '#8FC3E6'
  };

  var SIZES = {
    std: [252, 104, 104],
    hero: [430, 158, 140],
    cube: [142, 96, 112]
  };

  var T = 4;
  var F = 7;
  var FLOOR_Y = -742;
  var REST_CABLE = 118;
  var SPREADER_H = 24;
  var BOLT_COUNT = 140;
  var BOLT_STEP = 72;

  /* Exact 7-container pile geometry from spec (world = x, -y, z; Euler XYZ rad) */
  var PILE_SPECS = [
    { id: 'process', color: COLORS.ivory,   ink: '#1F2E5C', size: 'std',  pos: [352,  575,  34],  rot: [0.22, -0.52,  0.27] },
    { id: 'work',    color: COLORS.navy,    ink: '#FFFFFF', size: 'hero', pos: [676,  620,   0],  rot: [0.14,  0.06,  0.00], projectId: 'mono' },
    { id: 'about',   color: COLORS.mustard, ink: '#FFFFFF', size: 'cube', pos: [560,  500,  -6],  rot: [0.16,  0.20,  0.00], projectId: 'gigi' },
    { id: 'kit',     color: COLORS.sky,     ink: '#FFFFFF', size: 'cube', pos: [556,  410, -14],  rot: [0.18,  0.14,  0.00], projectId: 'compute' },
    { id: 'hello',   color: COLORS.sky,     ink: '#FFFFFF', size: 'std',  pos: [792,  474, -40],  rot: [0.24, -0.20, -0.40], projectId: 'sweet' },
    { id: 'do',      color: COLORS.navy,    ink: '#FFFFFF', size: 'std',  pos: [1000, 592,  28],  rot: [0.22, -0.40, -0.40], github: 'https://github.com/trynvexa' },
    { id: 'archive', color: COLORS.mustard, ink: '#FFFFFF', size: 'std',  pos: [1196, 616, 120],  rot: [0.20, -0.28, -0.32], contact: true }
  ];

  /* Exact supporting-container gravity drops */
  var DROP_RULES = {
    about: [
      { id: 'kit', dy: -90, dRotX: 0, dRotZ: 0 }
    ],
    work: [
      { id: 'about', dy: -194, dRotX: 0, dRotZ: 0 },
      { id: 'kit',   dy: -194, dRotX: 0, dRotZ: 0 },
      { id: 'hello', dy: -126, dRotX: -0.05, dRotZ: 0.30 }
    ]
  };

  var EASE = {
    linear: function (t) { return t; },
    inQuad: function (t) { return t * t; },
    outQuad: function (t) { return 1 - (1 - t) * (1 - t); },
    inOutQuad: function (t) { return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; },
    outCubic: function (t) { return 1 - Math.pow(1 - t, 3); },
    inOutCubic: function (t) { return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }
  };

  /* Zero-dependency RoundedBoxGeometry (matches Three.js addons/RoundedBoxGeometry) */
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
      n.copy(v);
      n.x -= Math.sign(n.x) * 0.5;
      n.y -= Math.sign(n.y) * 0.5;
      n.z -= Math.sign(n.z) * 0.5;

      var ax = Math.abs(v.x);
      var ay = Math.abs(v.y);
      var az = Math.abs(v.z);

      var sx = Math.sign(v.x);
      var sy = Math.sign(v.y);
      var sz = Math.sign(v.z);

      /* Map unit cube surface onto smooth corner sphere + flat faces */
      var px = v.x * width;
      var py = v.y * height;
      var pz = v.z * depth;

      var cx = Math.max(-hw, Math.min(hw, px));
      var cy = Math.max(-hh, Math.min(hh, py));
      var cz = Math.max(-hd, Math.min(hd, pz));

      n.set(px - cx, py - cy, pz - cz);
      var nl = n.length();
      if (nl > eps) {
        n.divideScalar(nl);
      } else {
        n.fromBufferAttribute(nor, i);
      }

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
      var nx = Math.cos(2 * Math.PI * u) * 0.62;
      var nz = Math.sqrt(Math.max(0, 1 - nx * nx));
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

  function createLabelTexture(THREE, lines, ink, L, H, isRtl) {
    var cw = 1024;
    var ch = Math.max(256, Math.round(cw * ((H - 2 * F) / (L - 2 * F))));
    var cv = document.createElement('canvas');
    cv.width = cw;
    cv.height = ch;
    var ctx = cv.getContext('2d');
    ctx.clearRect(0, 0, cw, ch);

    var safeLines = Array.isArray(lines) && lines.length ? lines : [String(lines || '')];
    var isTwo = safeLines.length >= 2;
    var fontStack = '"Archivo X", "Archivo", "Unbounded", "Noto Sans KR", "Noto Sans SC", "Noto Sans JP", "Noto Sans Arabic", sans-serif';
    var fs = ch * (isTwo ? 0.27 : 0.30);

    ctx.textBaseline = 'alphabetic';
    ctx.fillStyle = ink;
    ctx.direction = isRtl ? 'rtl' : 'ltr';
    ctx.textAlign = 'left';

    function measureMax(size) {
      ctx.font = '900 ' + size.toFixed(1) + 'px ' + fontStack;
      var m = 0;
      for (var i = 0; i < safeLines.length; i++) {
        var w = ctx.measureText(safeLines[i]).width;
        if (w > m) m = w;
      }
      return m;
    }

    var maxAllowed = cw * 0.82;
    var widest = measureMax(fs);
    if (widest > maxAllowed) {
      fs *= maxAllowed / widest;
      ctx.font = '900 ' + fs.toFixed(1) + 'px ' + fontStack;
    }

    var lineH = fs * 0.90;
    var mSample = ctx.measureText(safeLines[0]);
    var capH = mSample.actualBoundingBoxAscent || fs * 0.72;
    var totalH = (safeLines.length - 1) * lineH + capH;
    var startY = (ch - totalH) / 2 + capH;
    var x = cw * 0.075;

    for (var i = 0; i < safeLines.length; i++) {
      ctx.fillText(safeLines[i], x, startY + i * lineH);
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

    document.body.classList.add('dp-active');

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
            '<span>' + escHtml(cPack.role) + '</span>' +
            '<span>&bull;</span>' +
            '<span>' + escHtml(p.year) + '</span>' +
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
      /* Offline / No-WebGL interactive container fallback so projects are ALWAYS accessible */
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
          var bg = HEX_MAP[s.color] || '#1F2E5C';
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

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
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
      railScreenY: 73,
      railY: -73,
      wordTop: 711,
      c: new THREE.Vector3(720, -450, 0)
    };

    function toWorld(sx, sy) {
      return new THREE.Vector3((sx - frame.tx) / frame.k, -(sy - frame.ty) / frame.k, 0);
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

      if (!portrait) {
        frame.k = Math.min(vw / 1440, vh / 900);
        frame.n = Math.max(0.62, frame.k);
      } else {
        frame.n = Math.min(1, Math.max(0.62, vw / 560));
        frame.k = vw / 1130;
      }

      var baseGap = portrait ? 34 * frame.n : 35 * frame.k;
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
        ? Math.min(vw * 0.25, vh * 0.19)
        : Math.min(182 * frame.k, vh * 0.24);
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
        frame.tx = vw / 2 - 768 * frame.k;
        frame.ty = wordTop - 716 * frame.k;
      }

      frame.railScreenY = Math.max(73 * frame.k, 73 * frame.n);
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

    /* ---------- Scene, Camera, Lights, Shadow Catcher ---------- */
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(20, 1440 / 900, 100, 10000);

    var ambLight = new THREE.AmbientLight(makeColor(0xffffff), 2.2 * lightMul);
    scene.add(ambLight);

    var hemiLight = new THREE.HemisphereLight(makeColor(0xffffff), makeColor(0xd27a5e), 0.22 * lightMul);
    scene.add(hemiLight);

    var keyLight = new THREE.DirectionalLight(makeColor(0xfffaf4), 0.78 * lightMul);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.set(1024, 1024);
    keyLight.shadow.radius = 4;
    keyLight.shadow.bias = -0.0008;
    keyLight.shadow.normalBias = 0.6;
    scene.add(keyLight);
    scene.add(keyLight.target);

    var fillLight = new THREE.DirectionalLight(makeColor(0xffe6d8), 0.35 * lightMul);
    scene.add(fillLight);
    scene.add(fillLight.target);

    var floorGeo = trackGeo(new THREE.PlaneGeometry(6000, 3000));
    var floorMat = trackMat(new THREE.ShadowMaterial({ opacity: 0.22 }));
    var floorMesh = new THREE.Mesh(floorGeo, floorMat);
    floorMesh.rotation.x = -Math.PI / 2;
    floorMesh.position.set(720, FLOOR_Y, 0);
    floorMesh.receiveShadow = true;
    scene.add(floorMesh);

    /* ---------- Cached Corrugation Normal Maps & Materials ---------- */
    var normalSourceCanvas = makeCorrugationCanvas();
    var normalCache = new Map();
    var matCache = new Map();

    function getNormalMap(len, rotated) {
      var rep = Math.max(1, Math.round(len / 10));
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
      var rep = Math.max(1, Math.round(len / 10));
      var key = hexColor + '_' + rep + '_' + (rotated ? 1 : 0);
      if (matCache.has(key)) return matCache.get(key);
      var mat = trackMat(new THREE.MeshStandardMaterial({
        color: makeColor(hexColor),
        roughness: 0.6,
        metalness: 0,
        normalMap: getNormalMap(len, rotated),
        normalScale: new THREE.Vector2(0.55, 0.55)
      }));
      matCache.set(key, mat);
      return mat;
    }

    function getFrameMat(hexColor) {
      var key = 'frame_' + hexColor;
      if (matCache.has(key)) return matCache.get(key);
      var c = new THREE.Color(hexColor).multiplyScalar(0.9);
      if (isLegacyLights && c.convertSRGBToLinear) c.convertSRGBToLinear();
      var mat = trackMat(new THREE.MeshStandardMaterial({
        color: c,
        roughness: 0.45,
        metalness: 0
      }));
      matCache.set(key, mat);
      return mat;
    }

    var lockRodMat = trackMat(new THREE.MeshStandardMaterial({
      color: makeColor(COLORS.lockRods),
      roughness: 0.4,
      metalness: 0.15
    }));

    /* ---------- Build the 7 Shipping Containers ---------- */
    var containers = [];
    var containerMap = new Map();
    var pickMeshes = [];

    function buildContainer(spec) {
      var sz = SIZES[spec.size];
      var L = sz[0], H = sz[1], D = sz[2];
      var group = new THREE.Group();
      var homePos = new THREE.Vector3(spec.pos[0], -spec.pos[1], spec.pos[2]);
      var homeEuler = new THREE.Euler(spec.rot[0], spec.rot[1], spec.rot[2], 'XYZ');
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

      /* Hollow box: back, roof, floor, left, right */
      addPart(new THREE.BoxGeometry(L, H, T), [outL, outL, outL, outL, inL, outL], 0, 0, -D / 2 + T / 2);
      addPart(new THREE.BoxGeometry(L, T, D), [outD, outD, outRoof, inRoof, outL, outL], 0, H / 2 - T / 2, 0);
      addPart(new THREE.BoxGeometry(L, T, D), [outD, outD, inRoof, outRoof, outL, outL], 0, -H / 2 + T / 2, 0);
      addPart(new THREE.BoxGeometry(T, H, D), [inD, outD, outD, outD, outD, outD], -L / 2 + T / 2, 0, 0);
      addPart(new THREE.BoxGeometry(T, H, D), [outD, inD, outD, outD, outD, outD], L / 2 - T / 2, 0, 0);

      /* 12 Frame bars sitting 0.5px proud */
      var fx = L / 2 - F / 2 + 0.5;
      var fy = H / 2 - F / 2 + 0.5;
      var fz = D / 2 - F / 2 + 0.5;

      var postGeo = trackGeo(new THREE.BoxGeometry(F, H + 1, F));
      var longGeo = trackGeo(new THREE.BoxGeometry(L + 1, F, F));
      var shortGeo = trackGeo(new THREE.BoxGeometry(F, F, D + 1));

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

      /* Double front doors pivoted on outer front corners */
      var dW = L / 2 - F;
      var dH = H - 2 * F;
      var doorOut = getCorrugatedMat(spec.color, dW, false);
      var doorIn = getCorrugatedMat(COLORS.inside, dW, false);
      var doorMats = [doorOut, doorOut, doorOut, doorOut, doorOut, doorIn];
      var doorGeo = trackGeo(new THREE.BoxGeometry(dW, dH, T));
      var rodGeo = trackGeo(new THREE.CylinderGeometry(1.4, 1.4, dH * 0.92, 8));

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
      });
      group.add(rightPivot);

      /* Stencil label plane in front of closed doors */
      var pack = getDepotPack(lang);
      var cCopy = pack && pack.containers && pack.containers[spec.id];
      var labelTex = createLabelTexture(
        THREE,
        (cCopy && cCopy.label) || [spec.id.toUpperCase()],
        spec.ink,
        L,
        H,
        lang === 'ar' && !spec.projectId
      );
      var labelMat = trackMat(new THREE.MeshStandardMaterial({
        map: labelTex,
        transparent: true,
        opacity: 1,
        roughness: 0.65,
        metalness: 0,
        depthWrite: false,
        polygonOffset: true,
        polygonOffsetFactor: -2
      }));
      var labelMesh = new THREE.Mesh(trackGeo(new THREE.PlaneGeometry(L - 2 * F, H - 2 * F)), labelMat);
      labelMesh.position.set(0, 0, D / 2 - F / 2 + T / 2 + 2.2);
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
            (curCopy && curCopy.label) || [spec.id.toUpperCase()],
            spec.ink,
            L,
            H,
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

    /* ---------- Build Overhead Gantry Crane ---------- */
    var steelMat = trackMat(new THREE.MeshStandardMaterial({
      color: makeColor(COLORS.steel),
      roughness: 0.38,
      metalness: 0.1
    }));
    var boltMat = trackMat(new THREE.MeshStandardMaterial({
      color: makeColor(COLORS.bolts),
      roughness: 0.5,
      metalness: 0.2
    }));
    var cableMat = trackMat(new THREE.MeshStandardMaterial({
      color: makeColor(COLORS.cable),
      roughness: 0.45,
      metalness: 0.15
    }));

    var railMesh = new THREE.Mesh(trackGeo(new THREE.CylinderGeometry(6.5, 6.5, 9000, 16)), steelMat);
    railMesh.rotation.z = Math.PI / 2;
    railMesh.castShadow = false;
    railMesh.receiveShadow = true;
    scene.add(railMesh);

    var boltsMesh = new THREE.InstancedMesh(
      trackGeo(new THREE.SphereGeometry(2.2, 8, 8)),
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
    var trolleyBody = new THREE.Mesh(trackGeo(createRoundedBoxGeometry(THREE, 62, 30, 30, 4, 7)), steelMat);
    trolleyBody.castShadow = false;
    trolleyBody.receiveShadow = true;
    trolley.add(trolleyBody);

    var wheelGeo = trackGeo(new THREE.CylinderGeometry(6, 6, 34, 16));
    [-17, 17].forEach(function (wx) {
      var wh = new THREE.Mesh(wheelGeo, steelMat);
      wh.rotation.x = Math.PI / 2;
      wh.position.set(wx, 6, 0);
      trolley.add(wh);
    });

    var hubMesh = new THREE.Mesh(trackGeo(createRoundedBoxGeometry(THREE, 22, 16, 20, 3, 4)), steelMat);
    hubMesh.position.set(0, -22, 0);
    trolley.add(hubMesh);
    scene.add(trolley);

    var cableMesh = new THREE.Mesh(trackGeo(new THREE.CylinderGeometry(2.4, 2.4, 1, 10)), cableMat);
    scene.add(cableMesh);

    var spreader = new THREE.Group();
    var spPlate = new THREE.Mesh(trackGeo(createRoundedBoxGeometry(THREE, 58, 22, 30, 3, 5)), steelMat);
    spPlate.position.set(0, 1, 0);
    spPlate.castShadow = false;
    spPlate.receiveShadow = true;
    spreader.add(spPlate);

    var spKnob = new THREE.Mesh(trackGeo(new THREE.CylinderGeometry(7, 7, 10, 14)), steelMat);
    spKnob.position.set(0, 11, 0);
    spreader.add(spKnob);

    var spBar = new THREE.Mesh(trackGeo(new THREE.BoxGeometry(90, 6, 10)), steelMat);
    spBar.position.set(0, -9, 0);
    spBar.castShadow = false;
    spreader.add(spBar);
    scene.add(spreader);

    var trolleyX = 720;
    var spreaderPos = new THREE.Vector3(720, -73 - 31 - REST_CABLE - SPREADER_H / 2, 6);
    var UP_VEC = new THREE.Vector3(0, 1, 0);
    var tmpTop = new THREE.Vector3();
    var tmpBot = new THREE.Vector3();
    var tmpDiff = new THREE.Vector3();

    function syncCraneMeshes() {
      trolley.position.set(trolleyX, frame.railY - 6, 6);
      spreader.position.copy(spreaderPos);

      tmpTop.set(trolleyX, frame.railY - 31, 6);
      tmpBot.set(spreaderPos.x, spreaderPos.y + SPREADER_H / 2, spreaderPos.z);
      tmpDiff.subVectors(tmpBot, tmpTop);
      var len = Math.max(2, tmpDiff.length());
      cableMesh.position.copy(tmpTop).addScaledVector(tmpDiff, 0.5);
      cableMesh.scale.set(1, len, 1);
      tmpDiff.normalize();
      cableMesh.quaternion.setFromUnitVectors(UP_VEC, tmpDiff);
    }

    function restSpreaderY() {
      return frame.railY - 31 - REST_CABLE - SPREADER_H / 2;
    }

    function getAttachWorld(item) {
      item.group.updateMatrixWorld(true);
      return item.group.localToWorld(new THREE.Vector3(0, item.H / 2, 0));
    }

    function getHangPose(item) {
      var hangZ = 70;
      if (!frame.portrait) {
        var bodyH = Math.max(218 * frame.k, Math.min(170, frame.vh * 0.42)) / frame.k;
        var fitH = bodyH;
        var fitW = 2.5 * bodyH;
        var scale = Math.min(fitW / item.L, fitH / item.H);
        var actualH = item.H * scale;
        var hangX = frame.c.x;
        var hangY = frame.railY - 48 * Math.min(1, bodyH / 218) - actualH / 2;
        return { pos: new THREE.Vector3(hangX, hangY, hangZ), scale: scale };
      }

      var pileTop = -410 + 48;
      var topLim = frame.railY - 40;
      var botLim = pileTop + 30;
      var gap = Math.max(160, topLim - botLim);
      var pFitW = (frame.vw * (frame.vw < 360 ? 0.93 : 0.86)) / frame.k;
      var pFitH = Math.min(0.62 * pFitW, gap * 0.8);
      var pScale = Math.min(pFitW / item.L, pFitH / item.H);
      return {
        pos: new THREE.Vector3(frame.c.x, (topLim + botLim) / 2 + 10, hangZ),
        scale: pScale
      };
    }

    /* ---------- Camera & Light Update ---------- */
    function updateCameraAndLights() {
      var vw = frame.vw, vh = frame.vh, k = frame.k, c = frame.c;
      renderer.setSize(vw, vh, false);

      var D = (vh / k / 2) / Math.tan((10 * Math.PI) / 180);
      var pitch = (8 * Math.PI) / 180;
      camera.aspect = vw / vh;
      camera.near = Math.max(10, 0.3 * D);
      camera.far = 3 * D;
      camera.position.set(c.x, c.y + Math.sin(pitch) * D, Math.cos(pitch) * D);
      camera.lookAt(c.x, c.y, 0);
      camera.updateProjectionMatrix();
      camera.updateMatrixWorld(true);

      keyLight.position.set(c.x - 500, c.y + 1500, 1100);
      keyLight.target.position.set(c.x, c.y, 0);
      keyLight.target.updateMatrixWorld();

      var sBound = (Math.max(vw, vh) / k) * 0.75;
      keyLight.shadow.camera.left = -sBound;
      keyLight.shadow.camera.right = sBound;
      keyLight.shadow.camera.top = sBound;
      keyLight.shadow.camera.bottom = -sBound;
      keyLight.shadow.camera.near = 200;
      keyLight.shadow.camera.far = 4200;
      keyLight.shadow.camera.updateProjectionMatrix();

      fillLight.position.set(c.x + 900, c.y + 200, 900);
      fillLight.target.position.set(c.x, c.y, 0);
      fillLight.target.updateMatrixWorld();

      floorMesh.position.set(c.x, FLOOR_Y, 0);
      updateRailAndBolts();
    }

    /* ---------- On-Demand Render Scheduler (0% idle GPU/CPU when still!) ---------- */
    var activeTweens = new Set();
    var needsRender = true;

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

    /* ---------- Projected Content Card & Pill Overlap ---------- */
    function projectToScreen(v) {
      var p = v.clone().project(camera);
      return {
        x: ((p.x + 1) * 0.5) * frame.vw,
        y: ((-p.y + 1) * 0.5) * frame.vh
      };
    }

    function positionCardFor(item) {
      var hang = getHangPose(item);
      var hw = (item.L / 2 - F) * hang.scale;
      var hh = (item.H / 2 - F) * hang.scale;
      var backZ = (-item.D / 2 + T) * hang.scale;

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

      var w = Math.max(120, maxX - minX);
      var h = Math.max(80, maxY - minY);
      var cUnit = Math.min(h / 200, w / 480);

      cardEl.style.left = minX.toFixed(1) + 'px';
      cardEl.style.top = minY.toFixed(1) + 'px';
      cardEl.style.width = w.toFixed(1) + 'px';
      cardEl.style.height = h.toFixed(1) + 'px';
      cardEl.style.setProperty('--c', cUnit.toFixed(4) + 'px');
      cardEl.classList.toggle('tight', h < 112);
      cardEl.classList.toggle('narrow', w < 380);
    }

    function checkPillOverlap(item) {
      if (!pillEl) return;
      if (!item) {
        pillEl.classList.remove('is-dim');
        return;
      }
      var hang = getHangPose(item);
      var theta = ((frame.portrait ? 98 : 122) * Math.PI) / 180;
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

      var chipsHtml = (copy.chips && copy.chips.length)
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

      var closeLbl = (cPack && cPack.closeBtn) || 'Tutup';
      cardEl.innerHTML =
        '<button type="button" class="dp-card-x" data-dp-close-card="1" aria-label="' + escHtml(closeLbl) + '">&times;</button>' +
        '<div class="dp-eb">' + escHtml(copy.eb) + '</div>' +
        '<h2>' + escHtml(copy.titleBefore) + '<em>' + escHtml(copy.titleAccent) + '</em></h2>' +
        '<p>' + escHtml(copy.body) + '</p>' +
        chipsHtml +
        actsHtml;
    }

    /* ---------- Supporting-Container Gravity Drops & Restores ---------- */
    var pendingRestore = Promise.resolve();

    function triggerSupportDrops(liftedId) {
      var rules = DROP_RULES[liftedId];
      if (!rules || !rules.length) return;
      function applyDrops() {
        if (disposed) return;
        rules.forEach(function (rule) {
          var sub = containerMap.get(rule.id);
          if (!sub) return;
          var startPos = sub.group.position.clone();
          var endPos = sub.homePos.clone().add(new THREE.Vector3(0, rule.dy, 0));
          var startQuat = sub.group.quaternion.clone();
          var endEuler = new THREE.Euler(
            sub.homeEuler.x + rule.dRotX,
            sub.homeEuler.y,
            sub.homeEuler.z + rule.dRotZ,
            'XYZ'
          );
          var endQuat = new THREE.Quaternion().setFromEuler(endEuler);

          if (reducedMotion) {
            sub.group.position.copy(endPos);
            sub.group.quaternion.copy(endQuat);
            return;
          }

          tween(0.38, EASE.inQuad, function (a) {
            sub.group.position.lerpVectors(startPos, endPos, a);
            sub.group.quaternion.slerpQuaternions(startQuat, endQuat, a);
          }).then(function () {
            if (disposed) return;
            return tween(0.18, EASE.linear, function (t) {
              sub.group.position.y = endPos.y + Math.sin(Math.PI * t) * (1 - t) * 4;
            }).then(function () {
              if (!disposed) sub.group.position.y = endPos.y;
            });
          });
        });
      }
      if (reducedMotion) applyDrops();
      else wait(0.12).then(applyDrops);
    }

    function triggerSupportRestore(returnedId) {
      var rules = DROP_RULES[returnedId];
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
          var startQuat = sub.group.quaternion.clone();
          if (reducedMotion) {
            sub.group.position.copy(sub.homePos);
            sub.group.quaternion.copy(sub.homeQuat);
            return Promise.resolve();
          }
          return tween(0.30, EASE.outQuad, function (a) {
            sub.group.position.lerpVectors(startPos, sub.homePos, a);
            sub.group.quaternion.slerpQuaternions(startQuat, sub.homeQuat, a);
          });
        });
        return Promise.all(ps);
      }
      if (reducedMotion) {
        pendingRestore = applyRestore();
      } else {
        pendingRestore = wait(0.24).then(applyRestore);
      }
    }

    /* ---------- Crane Pick & Close Choreography ---------- */
    var openItem = null;
    var busy = false;
    var queuedId = null;

    function pickUp(id) {
      var item = containerMap.get(id);
      if (!item || disposed) return Promise.resolve();

      return pendingRestore.then(function () {
        if (disposed) return;
        var attach = getAttachWorld(item);
        var startTrolleyX = trolleyX;
        var dist = Math.abs(attach.x - startTrolleyX);
        var travelDur = 0.22 + dist / 2600;
        var startSpreader = spreaderPos.clone();
        var restY = restSpreaderY();

        /* 1. Trolley travels along rail to container attach X */
        return tween(travelDur, EASE.inOutCubic, function (a) {
          trolleyX = startTrolleyX + (attach.x - startTrolleyX) * a;
          spreaderPos.set(trolleyX, startSpreader.y + (restY - startSpreader.y) * a, 6);
          syncCraneMeshes();
        }).then(function () {
          if (disposed) return;
          /* 2. Cable lowers onto container roof */
          var lowerStart = spreaderPos.clone();
          var grabPos = new THREE.Vector3(attach.x, attach.y + SPREADER_H / 2, attach.z);
          return tween(0.36, EASE.outQuad, function (a) {
            spreaderPos.lerpVectors(lowerStart, grabPos, a);
            syncCraneMeshes();
          });
        }).then(function () {
          if (disposed) return;
          return wait(0.08);
        }).then(function () {
          if (disposed) return;
          /* 3. Hoist 0.55s ease-out quad + supporting-container drops */
          item.setShadows(false);
          var hoistStartPos = item.group.position.clone();
          var hoistStartQuat = item.group.quaternion.clone();
          var identityQuat = new THREE.Quaternion();
          var hang = getHangPose(item);

          triggerSupportDrops(id);

          return tween(0.55, EASE.outQuad, function (a) {
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
          /* 4. Non-blocking settling swing over 0.7s */
          openItem = item;
          checkPillOverlap(item);

          tween(0.7, EASE.linear, function (t) {
            if (openItem === item) {
              item.group.rotation.z = 0.03 * Math.sin(3 * Math.PI * t) * (1 - t);
            }
          }).then(function () {
            if (!disposed && openItem === item) item.group.rotation.z = 0;
          });

          /* 5. After 0.05s fill & place card, fade in 0.15s later */
          if (reducedMotion) {
            fillCard(item);
            positionCardFor(item);
            cardEl.classList.add('on');
          } else {
            wait(0.05).then(function () {
              if (disposed || openItem !== item) return;
              fillCard(item);
              positionCardFor(item);
              wait(0.15).then(function () {
                if (disposed || openItem !== item) return;
                cardEl.classList.add('on');
              });
            });
          }

          /* 6. Doors open 0.42s ease-out cubic */
          var theta = ((frame.portrait ? 98 : 122) * Math.PI) / 180;
          return tween(0.42, EASE.outCubic, function (a) {
            item.leftPivot.rotation.y = -theta * a;
            item.rightPivot.rotation.y = theta * a;
            item.labelMat.opacity = Math.max(0, 1 - 8 * a);
            item.labelMesh.visible = item.labelMat.opacity > 0.01;
          });
        });
      });
    }

    function closeOpen(retractAfter) {
      if (!openItem || disposed) return Promise.resolve();
      var item = openItem;
      item.group.rotation.z = 0;

      /* 1. Card fades out; doors close 0.17s ease-in quad; label fades back in */
      cardEl.classList.remove('on');
      var startLeft = item.leftPivot.rotation.y;
      var startRight = item.rightPivot.rotation.y;
      item.labelMesh.visible = true;

      return tween(0.17, EASE.inQuad, function (a) {
        item.leftPivot.rotation.y = startLeft * (1 - a);
        item.rightPivot.rotation.y = startRight * (1 - a);
        item.labelMat.opacity = Math.min(1, a * 1.4);
      }).then(function () {
        if (disposed) return;
        item.leftPivot.rotation.y = 0;
        item.rightPivot.rotation.y = 0;
        item.labelMat.opacity = 1;
        checkPillOverlap(null);
        return wait(0.06);
      }).then(function () {
        if (disposed) return;
        var lowerStartPos = item.group.position.clone();
        var lowerStartQuat = item.group.quaternion.clone();
        var lowerStartScale = item.group.scale.x;

        triggerSupportRestore(item.spec.id);

        return tween(0.42, EASE.inOutQuad, function (a) {
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
        /* 3. Landing bounce over 0.2s; shadows on again */
        item.setShadows(true);
        openItem = null;

        return tween(0.20, EASE.linear, function (t) {
          item.group.position.y = item.homePos.y + Math.sin(Math.PI * t) * (1 - t) * 5;
        }).then(function () {
          if (disposed) return;
          item.group.position.copy(item.homePos);
          item.group.quaternion.copy(item.homeQuat);
          item.group.scale.setScalar(1);
        });
      }).then(function () {
        if (disposed || !retractAfter) return;
        var retStart = spreaderPos.clone();
        var retEnd = new THREE.Vector3(trolleyX, restSpreaderY(), 6);
        return tween(0.30, EASE.outQuad, function (a) {
          spreaderPos.lerpVectors(retStart, retEnd, a);
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
            var retEnd = new THREE.Vector3(trolleyX, restSpreaderY(), 6);
            return tween(0.30, EASE.outQuad, function (a) {
              spreaderPos.lerpVectors(retStart, retEnd, a);
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

    /* ---------- Raycasting (Hover Cursor + Click) ---------- */
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
      if (activeModalProjectId) {
        canvas.style.cursor = 'default';
        return;
      }
      var id = hitContainerAt(e.clientX, e.clientY);
      canvas.style.cursor = id ? 'pointer' : 'default';
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
    canvas.addEventListener('pointerdown', onCanvasDown, { passive: true });
    canvas.addEventListener('click', onCanvasClick);

    /* ---------- Card, SR Menu & Modal Interactions ---------- */
    var onStageClick = function (e) {
      var t = e.target;
      if (!t || !t.closest) return;

      if (t === modalEl || t.closest('[data-dp-close-modal]')) {
        closeCaseModal();
        return;
      }

      if (t.closest('[data-dp-close-card]')) {
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

      var srBtn = t.closest('[data-dp-pick]');
      if (srBtn) {
        var id = srBtn.getAttribute('data-dp-pick');
        if (id) handlePick(id);
      }
    };
    stage.addEventListener('click', onStageClick);

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

      if (openItem) {
        fillCard(openItem);
        positionCardFor(openItem);
      }
      if (activeModalProjectId) {
        renderCaseModal(activeModalProjectId);
      }

      layoutWordAndFrame();
      updateCameraAndLights();
      if (openItem && !busy) {
        var hang = getHangPose(openItem);
        openItem.group.position.copy(hang.pos);
        openItem.group.scale.setScalar(hang.scale);
        var curAttach = getAttachWorld(openItem);
        trolleyX = curAttach.x;
        spreaderPos.set(curAttach.x, curAttach.y + SPREADER_H / 2, curAttach.z);
        syncCraneMeshes();
        positionCardFor(openItem);
        checkPillOverlap(openItem);
      } else if (!busy) {
        spreaderPos.set(trolleyX, restSpreaderY(), 6);
        syncCraneMeshes();
      }
      requestRender();
    }

    var onLangChange = function () {
      if (!disposed) syncLanguageUI(true);
    };
    window.addEventListener('zk-lang', onLangChange);

    /* ---------- Resize Handling ---------- */
    var resizeRaf = 0;
    var onResize = function () {
      if (resizeRaf || disposed) return;
      resizeRaf = requestAnimationFrame(function () {
        resizeRaf = 0;
        if (disposed) return;
        layoutWordAndFrame();
        updateCameraAndLights();
        if (openItem && !busy) {
          var hang = getHangPose(openItem);
          openItem.group.position.copy(hang.pos);
          openItem.group.scale.setScalar(hang.scale);
          var theta = ((frame.portrait ? 98 : 122) * Math.PI) / 180;
          openItem.leftPivot.rotation.y = -theta;
          openItem.rightPivot.rotation.y = theta;
          var curAttach = getAttachWorld(openItem);
          trolleyX = curAttach.x;
          spreaderPos.set(curAttach.x, curAttach.y + SPREADER_H / 2, curAttach.z);
          syncCraneMeshes();
          positionCardFor(openItem);
          checkPillOverlap(openItem);
        } else if (!busy) {
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

    /* ---------- On-Demand Render Loop (sleeps automatically when idle!) ---------- */
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

      if (needsRender && !document.hidden) {
        needsRender = false;
        renderer.render(scene, camera);
      }

      if (activeTweens.size || needsRender) {
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
              duration: isWord ? 1100 : 850,
              delay: 80 + idx * 60,
              easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
              fill: 'backwards'
            }
          );
        } catch (_) {}
      });
    }

    syncLanguageUI(false);
    trolleyX = frame.portrait ? frame.c.x : 720;
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
      canvas.removeEventListener('pointermove', onCanvasMove);
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
