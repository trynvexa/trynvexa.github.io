/* ============================================================
   Halaman Proyek (P5) - Studi Kasus Interaktif, 3D Browser Stage & Indeks Proyek
   ============================================================ */
var NP_DATA = [
 {id:"mono",num:"01",year:"2026",role:"Front-End & UI Design",domain:"v0-mono-ecommerce.vercel.app",stack:["HTML5","CSS3","Responsive UI","Editorial Typography"],r:"1711/919",name:"Mono",kind:"Hunian modular",a:"#c4622d",img:"assets/images/project-mono.webp",alt:"Halaman depan Mono: huruf besar menimpa foto bangunan baja karat di tepi air",
  t:["Landing page untuk produk hunian modular yang ringan dan tahan lama.","Nama merek dibuat sebesar layar dan ditimpa foto bangunannya, jadi orang langsung tahu ini tentang apa tanpa membaca. Menu dan tombol kontak sengaja dibuat kecil supaya tidak mengganggu."]},
 {id:"gigi",num:"02",year:"2026",role:"Front-End & UI Design",domain:"modern-gen-z-energy-drink-landi-six-eta.vercel.app",stack:["HTML5","Tailwind CSS","Conversion UI","Product Showcase"],r:"1690/931",name:"GiGi",kind:"Minuman energi",a:"#7fc400",img:"assets/images/project-gigi.webp",alt:"Halaman depan GiGi: judul tebal, tombol daftar diskon, dan kaleng rasa lemon lime",
  t:["Landing page minuman energi tanpa gula.","Latar dibuat putih bersih supaya warna hijau kaleng yang bicara. Judulnya tebal dan padat, tombol diskon ada di menu dan di bawah judul, dan empat keunggulan produk diringkas dalam satu baris."]},
 {id:"compute",num:"03",year:"2026",role:"Front-End & UI Design",domain:"compute-the-platform-to-build-psi-tan.vercel.app",stack:["Modern CSS","Dark UI System","Interactive Layout","SaaS Landing"],r:"1707/921",name:"Compute",kind:"Layanan agen AI",a:"#ff4d8d",img:"assets/images/project-compute.webp",alt:"Halaman depan Compute: judul putih di latar gelap dengan pohon bercahaya merah muda",
  t:["Halaman depan untuk layanan agen AI yang berjalan di banyak mesin sekaligus.","Latar gelap dengan satu gambar pohon bercahaya di kanan. Judul besar di kiri, tiga angka performa di bawahnya, dan satu tombol putih yang jelas untuk mulai memakai layanan."]},
 {id:"sweet",num:"04",year:"2026",role:"Front-End & UI Design",domain:"trynvexa.github.io/toko-kue",stack:["HTML5","CSS3","JavaScript","E-Commerce Catalog"],r:"1901/922",name:"Sweet Heaven",kind:"Toko kue artisan",a:"#c9a227",img:"assets/images/project-sweet.jpg",alt:"Halaman depan Sweet Heaven: judul serif putih di latar krem dengan tombol emas",
  t:["Halaman depan toko kue artisan.","Warna krem dan emas, judul serif besar di tengah, dan hanya satu tombol menuju koleksi. Tidak ada elemen lain yang bersaing dengan judulnya."]}
];
var NP_X = {"mono": {"crops": [{"x": 0.22, "y": 0, "w": 0.58, "h": 0.11, "cap": "Menu dan tombol kontak dibuat kecil supaya tidak menyaingi judul.", "wide": 1}, {"x": 0.22, "y": 0.2, "w": 0.6, "h": 0.68, "cap": "Bangunan baja karat di depan huruf yang dibuat raksasa."}, {"x": 0.34, "y": 0.76, "w": 0.32, "h": 0.17, "cap": "Satu kalimat utama di atas pantulan air."}], "rows": [["Menu", "Design, Gallery, Models, About"], ["Tombol", "Contact"], ["Kalimat utama", "Lightweight, durable and adventure-ready."], ["Fokus Desain", "Tipografi monumental, kontras material baja & air, navigasi minimalis"]], "pal": ["#e9d7c3", "#b4572a", "#5a5c5c", "#1d2223", "#8d8c88"]}, "gigi": {"crops": [{"x": 0.04, "y": 0, "w": 0.94, "h": 0.1, "cap": "Menu dengan satu tombol diskon berwarna hijau.", "wide": 1}, {"x": 0.12, "y": 0.25, "w": 0.34, "h": 0.56, "cap": "Judul, deskripsi singkat, dan dua tombol dengan fungsi berbeda."}, {"x": 0.58, "y": 0.1, "w": 0.28, "h": 0.82, "cap": "Kaleng lemon lime jadi pusat perhatian di sisi kanan."}], "rows": [["Menu", "Home, Flavours, Creators, Distributors, Careers"], ["Tombol", "Get 25% Off, Sign Up & Save 25%, Explore Flavours"], ["Keunggulan", "Zero Sugar, 7+mg Caffeine, Natural Flavours, Vitamin B Rich"], ["Fokus Desain", "Hierarki konversi tinggi, aksen neon segar di atas kanvas putih bersih"]], "pal": ["#b7fc08", "#fdfdf9", "#64b102", "#060606", "#ddded9"]}, "compute": {"crops": [{"x": 0, "y": 0, "w": 1, "h": 0.12, "cap": "Menu lengkap dengan Sign in dan tombol putih Deploy agent.", "wide": 1}, {"x": 0.03, "y": 0.28, "w": 0.6, "h": 0.35, "cap": "Judul besar, dengan kata terakhir diberi warna gradasi."}, {"x": 0.03, "y": 0.74, "w": 0.42, "h": 0.2, "cap": "Tiga angka performa di bagian bawah."}], "rows": [["Menu", "Capabilities, Process, Infra, Integrations, Security"], ["Tombol", "Sign in, Deploy agent"], ["Angka", "3500+ agen aktif, 99.7% uptime, kurang dari 50 ms"], ["Fokus Desain", "Atmosfer dark-mode teknis, metrik performa real-time, CTA kontras tinggi"]], "pal": ["#000000", "#d94f87", "#cdc2fc", "#2e0a1a", "#fefefe"]}, "sweet": {"crops": [{"x": 0.08, "y": 0.04, "w": 0.86, "h": 0.12, "cap": "Menu berhuruf kapital renggang dan tombol Order Now berwarna emas.", "wide": 1}, {"x": 0.18, "y": 0.24, "w": 0.64, "h": 0.45, "cap": "Judul serif putih besar dan satu tombol menuju koleksi."}, {"x": 0.08, "y": 0.05, "w": 0.18, "h": 0.1, "cap": "Logo dua warna, cokelat dan emas."}], "rows": [["Menu", "Home, Philosophy, Menu, Questions, Contact"], ["Tombol", "Order Now, Discover Collection"], ["Fokus Desain", "Editorial hangat bernuansa krem & emas, tipografi serif klasik yang elegan"]], "pal": ["#e8dacd", "#fef7ef", "#caab52", "#8b6145", "#a28e83"]}};
var NP_I18N = {
  en: {
    kicker: "Selected Works · 04 Case Studies",
    visit: "Live Demo",
    nextLbl: "Next:",
    closeTitle: "Closer Inspection",
    palTitle: "Color System",
    palHint: "(Click swatch to copy HEX)",
    rowsTitle: "Architecture & Specs",
    allTitle: "All Projects Index (04)",
    allSub: "Compare all four featured projects or launch their live demos directly.",
    moreNext: "Next Project",
    moreQ: "Have a page or product that needs a redesign?",
    moreCta: "Let's Talk",
    closeBtn: "Close",
    inspectBtn: "Read Case Study",
    zoomHint: "Expand ↗",
    copied: "Copied!",
    projects: {
      mono: {
        kind: "Modular Housing",
        t: ["Landing page for a lightweight, durable modular housing concept.", "The brand name spans the full viewport behind the architectural photography so visitors grasp the scale immediately. Navigation and contact triggers stay understated to preserve visual calm."],
        crops: ["Compact navigation and contact button that never compete with the hero title.", "Weathered steel structure layered in front of monumental display typography.", "A single positioning statement anchored above the water reflection."],
        rows: [["Navigation", "Design, Gallery, Models, About"], ["Action", "Contact"], ["Key Copy", "Lightweight, durable and adventure-ready."], ["Design Focus", "Monumental typography, steel & water material contrast, minimal chrome"]]
      },
      gigi: {
        kind: "Energy Drink",
        t: ["High-energy landing page for a zero-sugar Gen-Z energy drink.", "A crisp white canvas lets the electric lime can command attention. Bold condensed typography, dual conversion triggers, and a four-pillar benefit strip drive immediate action."],
        crops: ["Top bar featuring a high-contrast green discount CTA.", "Punchy headline, concise copy, and dual primary/secondary action buttons.", "The lemon-lime can positioned as the unmistakable visual anchor on the right."],
        rows: [["Navigation", "Home, Flavours, Creators, Distributors, Careers"], ["Actions", "Get 25% Off, Sign Up & Save 25%, Explore Flavours"], ["Highlights", "Zero Sugar, 7+mg Caffeine, Natural Flavours, Vitamin B Rich"], ["Design Focus", "High-conversion hierarchy, fresh neon accents on a clean white stage"]]
      },
      compute: {
        kind: "AI Agent Platform",
        t: ["Front page for a distributed AI agent execution platform.", "Deep obsidian background paired with a glowing neural tree on the right, left-aligned display headline, three live performance metrics, and a crisp white deployment CTA."],
        crops: ["Full product navigation with Sign in and a high-contrast white Deploy agent CTA.", "Large display headline with a gradient-accented terminal word.", "Three key infrastructure performance metrics anchored below the fold."],
        rows: [["Navigation", "Capabilities, Process, Infra, Integrations, Security"], ["Actions", "Sign in, Deploy agent"], ["Metrics", "3500+ active agents, 99.7% uptime, < 50 ms latency"], ["Design Focus", "Technical dark-mode atmosphere, real-time telemetry, clear CTA hierarchy"]]
      },
      sweet: {
        kind: "Artisan Bakery",
        t: ["Editorial storefront for an artisan cake and pastry studio.", "Warm cream and gold palette, centered classic serif headline, and a single focused call-to-action leading into the curated pastry collection."],
        crops: ["Wide-tracked uppercase navigation paired with a golden Order Now button.", "Large white serif headline with a single focused collection trigger.", "Two-tone chocolate and gold brand mark."],
        rows: [["Navigation", "Home, Philosophy, Menu, Questions, Contact"], ["Actions", "Order Now, Discover Collection"], ["Design Focus", "Warm cream & gold editorial palette, timeless serif typography"]]
      }
    }
  }
};
var NP_URL = {mono:'https://v0-mono-ecommerce.vercel.app/', gigi:'https://modern-gen-z-energy-drink-landi-six-eta.vercel.app/', compute:'https://compute-the-platform-to-build-psi-tan.vercel.app/', sweet:'https://trynvexa.github.io/toko-kue/'};
var npIdx = 0;
function initProjectSpatialStage() {
  var root = document.querySelector('.pg.p5');
  if (!root) return;
  var $ = function(id){ return root.querySelector('#' + id); };
  var nav = $('npNav'), view = $('npView'), nameEl = $('npName'), info = $('npInfo'), shot = $('npShot'), frame = $('npFrame'), dlg = $('npDlg');
  if (!nav || !view || !nameEl) return;
  nav.innerHTML = ''; view.innerHTML = '';
  var cur = -1, z = 1;
  var motionOK = matchMedia('(prefers-reduced-motion: no-preference)').matches;
  function getLang() { return (window.ZK && ZK.lang) || 'id'; }
  function trText(idStr) {
    var l = getLang();
    if (l === 'id') return idStr;
    return (window.ZK && ZK.t && ZK.t(idStr, l)) || idStr;
  }

  NP_DATA.forEach(function(p, i) {
    var b = document.createElement('button'); b.type = 'button'; b.setAttribute('role', 'tab');
    b.innerHTML = '<span class="np-tab-no">' + p.num + '</span><span>' + p.name + '</span>';
    b.onclick = function(){ go(i); }; nav.appendChild(b);
    var m = document.createElement('img'); m.src = p.img; m.alt = p.alt; m.decoding = 'async'; view.appendChild(m);
  });

  function watch() { [].forEach.call(root.querySelectorAll('.np-rv:not(.in), .np-pal:not(.in)'), function(el){ if (el.getBoundingClientRect().top < innerHeight * .95) el.classList.add('in'); }); }
  function cropEl(c, p, capText) {
    var rr = p.r.split('/'), W = +rr[0], H = +rr[1];
    var f = document.createElement('figure'); f.className = 'np-cw' + (c.wide ? ' np-wide' : '');
    f.innerHTML = '<div class="np-crop np-rv" style="aspect-ratio:' + (c.w * W) + '/' + (c.h * H) + '"><img alt="" decoding="async" src="' + p.img + '" style="width:' + (100 / c.w) + '%;left:' + (-c.x / c.w * 100) + '%;top:' + (-c.y / c.h * 100) + '%"></div><figcaption>' + capText + '</figcaption>';
    return f;
  }
  function buildAllGrid() {
    var grid = $('npAllGrid');
    if (!grid) return;
    var l = getLang(), enP = (l !== 'id' && NP_I18N.en) ? NP_I18N.en.projects : null;
    var visitLbl = (l !== 'id' && NP_I18N.en) ? trText(NP_I18N.en.visit) : 'Lihat situs';
    var inspectLbl = (l !== 'id' && NP_I18N.en) ? NP_I18N.en.inspectBtn : 'Baca Studi Kasus';
    grid.innerHTML = NP_DATA.map(function(item, idx) {
      var pOv = enP && enP[item.id];
      var kindTxt = pOv ? pOv.kind : trText(item.kind);
      var descTxt = pOv ? pOv.t[0] : item.t[0];
      var activeCls = idx === cur ? ' is-current' : '';
      return '<article class="np-all-card' + activeCls + '" style="--ca:' + item.a + '">' +
        '<div class="np-all-thumb" data-pick="' + idx + '">' +
          '<img src="' + item.img + '" alt="' + item.name + '" loading="lazy" decoding="async">' +
          '<span class="np-all-no">' + item.num + '</span>' +
        '</div>' +
        '<div class="np-all-body">' +
          '<div class="np-all-meta"><span>' + kindTxt + '</span><i>&bull;</i><span>' + item.year + '</span></div>' +
          '<h4>' + item.name + '</h4>' +
          '<p>' + descTxt + '</p>' +
          '<div class="np-all-tags">' + item.stack.map(function(s){ return '<span>' + s + '</span>'; }).join('') + '</div>' +
          '<div class="np-all-acts">' +
            '<button type="button" class="np-all-pick" data-pick="' + idx + '">' + inspectLbl + '</button>' +
            '<a class="np-all-live" href="' + NP_URL[item.id] + '" target="_blank" rel="noopener noreferrer">' + visitLbl + ' &#8599;</a>' +
          '</div>' +
        '</div>' +
      '</article>';
    }).join('');
    [].forEach.call(grid.querySelectorAll('[data-pick]'), function(el) {
      el.onclick = function() {
        var idx = parseInt(el.getAttribute('data-pick'), 10);
        if (!isNaN(idx)) {
          go(idx);
          root.scrollTo({ top: 0, behavior: motionOK ? 'smooth' : 'auto' });
        }
      };
    });
  }
  function build(p, nx) {
    var l = getLang(), i18n = l !== 'id' ? NP_I18N.en : null, pOv = i18n && i18n.projects[p.id];
    var x = NP_X[p.id], box = $('npCrops'); box.innerHTML = '';
    x.crops.forEach(function(c, idx){
      var cap = (pOv && pOv.crops && pOv.crops[idx]) ? pOv.crops[idx] : c.cap;
      box.appendChild(cropEl(c, p, cap));
    });
    if ($('npKicker')) $('npKicker').textContent = i18n ? i18n.kicker : 'Karya Pilihan · 04 Studi Kasus';
    if ($('npCloseTitle')) $('npCloseTitle').textContent = i18n ? i18n.closeTitle : 'Dilihat dari dekat';
    if ($('npPalTitle')) $('npPalTitle').innerHTML = (i18n ? i18n.palTitle : 'Warna yang dipakai') + ' <small class="np-pal-hint">' + (i18n ? i18n.palHint : '(Klik untuk salin HEX)') + '</small>';
    if ($('npRowsTitle')) $('npRowsTitle').textContent = i18n ? i18n.rowsTitle : 'Isi halaman & spesifikasi';
    if ($('npAllTitle')) $('npAllTitle').textContent = i18n ? i18n.allTitle : 'Indeks Semua Proyek (04)';
    if ($('npAllSub')) $('npAllSub').textContent = i18n ? i18n.allSub : 'Bandingkan keempat proyek unggulan atau buka demo langsung.';
    if ($('npClose')) $('npClose').textContent = i18n ? i18n.closeBtn : 'Tutup';

    var palBox = $('npPal');
    palBox.classList.remove('in');
    palBox.innerHTML = x.pal.map(function(c, k){
      return '<button type="button" class="np-sw-btn" data-hex="' + c.toUpperCase() + '" aria-label="Salin warna ' + c.toUpperCase() + '"><i style="--k:' + k + ';background:' + c + '"></i><span>' + c.toUpperCase() + '</span></button>';
    }).join('');
    [].forEach.call(palBox.querySelectorAll('.np-sw-btn'), function(btn){
      btn.onclick = function(){
        var hex = btn.getAttribute('data-hex');
        var sp = btn.querySelector('span');
        var copiedTxt = i18n ? i18n.copied : 'Tersalin!';
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(hex).catch(function(){});
        }
        if (sp) {
          sp.textContent = copiedTxt;
          btn.classList.add('copied');
          setTimeout(function(){ sp.textContent = hex; btn.classList.remove('copied'); }, 1400);
        }
      };
    });

    var rowsData = (pOv && pOv.rows) ? pOv.rows : x.rows;
    $('npRows').innerHTML = rowsData.map(function(r){ return '<div><dt>' + r[0] + '</dt><dd>' + r[1].replace(/&/g, '&amp;') + '</dd></div>'; }).join('');
    var mo = $('npMore');
    var nextProjectLbl = i18n ? i18n.moreNext : 'Proyek berikutnya';
    var moreQ = i18n ? i18n.moreQ : 'Punya halaman yang perlu dirombak?';
    var moreCta = i18n ? i18n.moreCta : 'Hubungi saya';
    mo.innerHTML = '<div><small>' + nextProjectLbl + '</small><button type="button" class="np-nx2">' + nx.name + ' <span aria-hidden="true">\u2192</span></button></div><div class="np-cta-w"><p>' + moreQ + '</p><button type="button" class="np-cta">' + moreCta + '</button></div>';
    mo.querySelector('.np-nx2').onclick = function(){ go(cur + 1); root.scrollTo({ top: 0, behavior: motionOK ? 'smooth' : 'auto' }); };
    mo.querySelector('.np-cta').onclick = function(){ if (window.zkJumpPage) window.zkJumpPage(6); else if (window.zkGoPage) window.zkGoPage(1); };
    buildAllGrid();
    setTimeout(watch, 80);
  }
  function fit() {
    if (!nameEl.isConnected) return;
    nameEl.style.removeProperty('font-size');
  }
  function go(i, force) {
    i = (i + NP_DATA.length) % NP_DATA.length;
    if (i === cur && !force) return;
    cur = npIdx = i;
    var p = NP_DATA[cur], nx = NP_DATA[(cur + 1) % NP_DATA.length];
    var l = getLang(), i18n = l !== 'id' ? NP_I18N.en : null, pOv = i18n && i18n.projects[p.id];
    root.style.setProperty('--a', p.a);
    [].forEach.call(nav.children, function(b, k){ b.setAttribute('aria-selected', k === cur); });
    view.style.aspectRatio = p.r;
    [].forEach.call(view.children, function(imgEl, idx){
      var isAct = idx === cur;
      imgEl.classList.toggle('is-active', isAct);
      if (isAct) {
        imgEl.style.zIndex = ++z;
        imgEl.classList.remove('enter');
        void imgEl.offsetWidth;
        imgEl.classList.add('enter');
      }
    });
    var h = '', k = 0;
    p.name.split(' ').forEach(function(w){
      h += '<span class="np-w">';
      w.split('').forEach(function(c){ h += '<span class="np-l"><i style="--k:' + (k++) + '">' + c + '</i></span>'; });
      h += '</span>';
    });
    nameEl.innerHTML = h; nameEl.setAttribute('aria-label', p.name);
    var metaBar = $('npMetaBar');
    if (metaBar) {
      metaBar.innerHTML = '<span class="np-badge-num">' + p.num + ' / 04</span><span class="np-badge-role">' + p.role + '</span><span class="np-badge-yr">' + p.year + '</span>';
    }
    var stackEl = $('npStack');
    if (stackEl) {
      stackEl.innerHTML = p.stack.map(function(s){ return '<span class="np-chip">' + s + '</span>'; }).join('');
    }
    var urlPill = $('npUrlPill');
    if (urlPill) urlPill.textContent = p.domain;
    var kindTxt = pOv ? pOv.kind : trText(p.kind);
    var t0 = pOv ? pOv.t[0] : p.t[0];
    var t1 = pOv ? pOv.t[1] : p.t[1];
    var visitTxt = i18n ? trText(i18n.visit) : 'Lihat situs';
    var nextTxt = i18n ? i18n.nextLbl : 'Berikutnya:';
    info.innerHTML = '<h2>' + kindTxt + '</h2><p>' + t0 + '</p><p>' + t1 + '</p><div class="np-act-row"><a class="np-visit" href="' + NP_URL[p.id] + '" target="_blank" rel="noopener noreferrer">' + visitTxt + ' <span aria-hidden="true">\u2197</span></a><button type="button" class="np-next" id="npNx">' + nextTxt + ' ' + nx.name + ' \u2192</button></div>';
    $('npNx').onclick = function(){ go(cur + 1); };
    $('npBig').src = p.img; $('npBig').alt = p.alt;
    build(p, nx);
    fit();
  }
  go(npIdx, true);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fit);
  setTimeout(fit, 350);
  if (!window.__npResize) {
    window.__npResize = true;
    window.addEventListener('zk-lang', function(){
      if (document.querySelector('.pg.p5')) initProjectSpatialStage();
    });
  }

  if (motionOK && matchMedia('(pointer: fine)').matches) {
    shot.onpointermove = function(e){
      var rect = shot.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      var nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      var ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      frame.style.setProperty('--ry', (nx * 4.5).toFixed(2) + 'deg');
      frame.style.setProperty('--rx', (-ny * 3.5).toFixed(2) + 'deg');
    };
    shot.onpointerleave = function(){
      frame.style.setProperty('--ry', '0deg');
      frame.style.setProperty('--rx', '0deg');
    };
  }
  var tk = 0;
  var sc = function(){
    tk = 0;
    var h = root.scrollHeight - root.clientHeight, pr = $('npProg');
    watch();
    if (pr) pr.style.setProperty('--pr', h > 0 ? (root.scrollTop / h).toFixed(4) : 0);
    if (motionOK) { var r = shot.getBoundingClientRect(), t = Math.min(1, Math.max(0, (innerHeight - r.top) / (innerHeight * .9))); frame.style.setProperty('--sc', (.95 + .05 * t).toFixed(3)); }
  };
  root.onscroll = function(){ if (!tk) tk = requestAnimationFrame(sc); };
  sc();
  var sx = null, mv = false;
  shot.onpointerdown = function(e){ sx = e.clientX; mv = false; };
  shot.onpointerup = function(e){ if (sx === null) return; var d = e.clientX - sx; sx = null; if (Math.abs(d) > 50) { mv = true; go(cur + (d < 0 ? 1 : -1)); } };
  shot.onclick = function(){ if (mv) { mv = false; return; } if (dlg.showModal) dlg.showModal(); };
  $('npClose').onclick = function(){ dlg.close(); };
  dlg.onclick = function(e){ if (e.target === dlg || e.target.id === 'npBig') dlg.close(); };
}
