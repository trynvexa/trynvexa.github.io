/* Intro: tata letak mobile vertikal + penanda selesai-dimuat untuk hitungan */
(function(){var A=false,B=!document.fonts;function c(){if(A&&B)window.__ld=true}
  if(document.readyState==='complete')A=true;else addEventListener('load',function(){A=true;c()});
  if(document.fonts)document.fonts.ready.then(function(){B=true;c()});c();setTimeout(function(){window.__ld=true},4500);})();
window.__introLayout=function(sc,portrait,vw,vh){
  var NS='http://www.w3.org/2000/svg',vb=sc.querySelector('#vb rect'),W=700,H=1430;
  if(!sc.__pw){
    var P=sc.__pw=[],d=[].slice.call(sc.querySelectorAll('#dD > g > *')),k=[].slice.call(sc.querySelectorAll('#dB > *'));
    var mk=function(els,t,cls){els=els.filter(Boolean);if(!els.length)return;var g=document.createElementNS(NS,'g');
      if(cls)g.setAttribute('class',cls);els[0].parentNode.insertBefore(g,els[0]);els.forEach(function(e){g.appendChild(e);});P.push([g,t||'']);};
    mk([d[0],d[1],d[2],d[4]],'','hm');mk([d[3],d[5]],'','hb');mk(d.slice(7,21),'','hb');mk(d.slice(21,45),'','hm');
    mk([k[0]],'translate(-5.5 467.5) scale(1.25)');mk(k.slice(1,6),'translate(-12.8 313) scale(1.4)');mk([k[6]],'','hm');
    mk([sc.querySelector('.yb2')],'translate(-706 418)');
    mk([sc.querySelector('.head-in')],'translate(-74.2 586) scale(.6)');
    mk([sc.querySelector('#dC')],'translate(-1074.4 546) scale(1.3)');
    mk([sc.querySelector('.star')],'translate(-70 1049) scale(.5)');
    mk([sc.querySelector('#introCount')],'translate(-74.4 -13.2) scale(1.6)');
    sc.__ft=null;[].forEach.call(sc.querySelectorAll('.px text'),function(t){if(t.textContent.trim()==='folio.')sc.__ft=t;});
  }
  sc.__pw.forEach(function(x){if(portrait&&x[1])x[0].setAttribute('transform',x[1]);else x[0].removeAttribute('transform');});
  if(sc.__ft){if(portrait)sc.__ft.setAttribute('transform','translate(-706 418)');else sc.__ft.removeAttribute('transform');}
  sc.classList.toggle('fit-v',portrait);
  if(!portrait){sc.setAttribute('viewBox','0 0 1400 800');if(vb){vb.setAttribute('width',1400);vb.setAttribute('height',800);}
    var q=Math.min(vw/1400,vh/800),lw=1400*q,lh=800*q;
    sc.style.width=lw+'px';sc.style.height=lh+'px';sc.style.left=((vw-lw)/2)+'px';sc.style.top=((vh-lh)/2)+'px';
    return true;}
  var room=vh-84,z=Math.min(vw/W,room/H),fw=W*z,fh=H*z;
  sc.setAttribute('viewBox','0 0 '+W+' '+H);
  if(vb){vb.setAttribute('width',W);vb.setAttribute('height',H);}
  sc.style.width=fw+'px';sc.style.height=fh+'px';
  sc.style.left=((vw-fw)/2)+'px';sc.style.top=Math.max(0,(room-fh)/2)+'px';
  return true;
};

/* ============================================== */

/* ============================================================
   intro.js
   ============================================================ */

/**
 * Cinematic Intro & Head SVG Eye Tracking
 * Handles loader countdown, SVG facial tracking, viewport fitting,
 * and seamless entrance transition.
 */
(function(){
  // Intro: hitung mundur, lalu tirai naik. Bisa dilewati dengan klik, Escape, Enter, atau Spasi.
  var introEl = document.getElementById('intro'), rootCls = document.documentElement.classList;
  if (introEl && rootCls.contains('intro-on')) {
    var iDone = false, cnt = document.getElementById('introCount'), t0 = performance.now(), cRaf = null; var pv = 0;
    var tick = function(now) {
      var tp = Math.min(1, (now - t0) / 2400), tg = window.__ld ? tp : Math.min(tp, .62);
      pv += (tg - pv) * .18;
      var e = 1 - Math.pow(1 - pv, 3), done = !!window.__ld && tp >= 1 && pv > .995;
      cnt.textContent = String(done ? 100 : Math.min(99, Math.round(e * 100))).padStart(3, '0');
      if (done) introEl.classList.add("ready");
      if (!done && !iDone) cRaf = requestAnimationFrame(tick);
    };
    cRaf = requestAnimationFrame(tick);
    // Adegan pembuka selalu menutup seluruh layar (tanpa pita kosong di atas/bawah)
    var fitIntro = function() {
      var sc = document.getElementById('headSvg');
      if (!sc) return;
      var vw = innerWidth, vh = innerHeight, sw = vh * 1.75;
      sc.classList.remove('fit-p','pan');
      if (window.__introLayout(sc, vw <= 700 && vh > vw, vw, vh)) return;
      if (false) {
        // HP portrait: tampilkan ±650 dari 1400 unit adegan sekaligus, sisanya lewat geseran kamera, supaya "Port" dan "folio." terlihat utuh
        var k = vw / 650, fw = 1400 * k, fh = 800 * k;
        sc.style.width = fw + 'px';
        sc.style.height = fh + 'px';
        sc.style.top = Math.max(0, (vh - fh) * 0.46) + 'px';
        sc.classList.add('fit-p'); // tepi bawah dipudarkan lewat CSS agar tidak ada potongan rata
        sc.style.left = '0px';
        sc.style.setProperty('--pan', (vw - fw) + 'px');
        sc.classList.add('pan');
        return;
      }
      if (sw >= vw) {
        // Layar lebih sempit dari adegan: tinggi penuh, kamera bergeser kalau selisihnya besar
        var d = vw - sw, pan = Math.abs(d) > 60;
        sc.style.width = sw + 'px';
        sc.style.height = vh + 'px';
        sc.style.top = '0px';
        sc.style.left = pan ? '0px' : (d / 2) + 'px';
        sc.style.setProperty('--pan', d + 'px');
        sc.classList.toggle('pan', pan);
      } else {
        // Layar lebih lebar dari adegan: lebar penuh, bagian atas-bawah dipotong rata
        var sh = vw / 1.75;
        sc.style.width = vw + 'px';
        sc.style.height = sh + 'px';
        sc.style.left = '0px';
        sc.style.top = ((vh - sh) / 2) + 'px';
        sc.classList.remove('pan');
      }
    };
    fitIntro();
    window.addEventListener('resize', fitIntro);
    // Mata karakter: mengikuti kursor/sentuhan, melirik sendiri saat diam, dan berkedip
    var eyesStop = (function(){
      var D = {"L": {"T": [[587.5, 533.0], [605.0, 535.0], [625.0, 538.8], [645.0, 542.5], [665.0, 545.5], [685.0, 548.8], [705.0, 552.5], [720.0, 555.5], [732.5, 563.0]], "B": [[587.5, 541.2], [605.0, 555.5], [625.0, 570.5], [645.0, 580.0], [665.0, 583.0], [685.0, 584.0], [705.0, 583.0], [720.0, 573.8], [732.5, 565.0]]}, "R": {"T": [[815.0, 576.5], [827.5, 575.5], [845.0, 574.0], [862.5, 573.0], [880.0, 573.5], [892.5, 575.0], [900.0, 577.0]], "B": [[815.0, 587.0], [827.5, 597.5], [845.0, 607.0], [862.5, 610.5], [880.0, 608.5], [892.5, 597.5], [900.0, 583.0]]}};
      var gi = function(i){ return document.getElementById(i); };
      var iL = gi('irL'), iR = gi('irR'), hd = gi('headSvg'), hm = gi('hdMove'), E = { lidL: gi('lidL'), edgeL: gi('edgeL'), lidR: gi('lidR'), edgeR: gi('edgeR') };
      if (!iL || !iR || !hd) return function(){};
      var PX = [['dA', -6, -4], ['dB', -10, -6], ['dC', 11, 7], ['dD', -4, -3], ['dE', 14, 9]].map(function(a){ return [gi(a[0]), a[1], a[2]]; });
      var tx = 0, ty = 0, x = 0, y = 0, last = -1e9, nextIdle = 0, raf = null, run = true, bs = -1, nb = 1100, lb = -1;
      function lid(b) {
        if (b === lb) return; lb = b;
        ['L', 'R'].forEach(function(k){
          var T = D[k].T, B = D[k].B, up = [], lo = [];
          for (var i = 0; i < T.length; i++) {
            up.push(T[i][0] + ',' + T[i][1]);
            lo.push(T[i][0] + ',' + (T[i][1] + b * (B[i][1] - T[i][1])).toFixed(1));
          }
          E['lid' + k].setAttribute('points', b > 0 ? up.concat(lo.slice().reverse()).join(' ') : '');
          E['edge' + k].setAttribute('points', b > 0 ? lo.join(' ') : '');
        });
      }
      function aim(e) {
        last = performance.now();
        var r = hd.getBoundingClientRect(), cx = r.left + r.width * .52, cy = r.top + r.height * .55;
        tx = Math.max(-1, Math.min(1, (e.clientX - cx) / (innerWidth * .35)));
        ty = Math.max(-1, Math.min(1, (e.clientY - cy) / (innerHeight * .35)));
      }
      window.addEventListener('pointermove', aim, { passive: true });
      window.addEventListener('pointerdown', aim, { passive: true });
      function frame(t) {
        if (!run) return;
        if (t - last > 1600 && t > nextIdle) { tx = Math.random() * 2 - 1; ty = Math.random() * 1.2 - .5; nextIdle = t + 700 + Math.random() * 1300; }
        x += (tx - x) * .2; y += (ty - y) * .2;
        var yy = y < 0 ? y * 3 : y * 5;
        iL.setAttribute('transform', 'translate(' + (x * 14).toFixed(2) + ' ' + yy.toFixed(2) + ')');
        iR.setAttribute('transform', 'translate(' + (x * 10).toFixed(2) + ' ' + (yy * .8).toFixed(2) + ')');
        // Kedip: kelopak turun mengikuti lengkung mata (110 md), menutup sebentar, lalu naik (170 md)
        var b = 0;
        if (bs < 0 && t > nb) bs = t;
        if (bs >= 0) {
          var dt = t - bs;
          if (dt < 110) b = .5 - .5 * Math.cos(Math.PI * dt / 110);
          else if (dt < 170) b = 1;
          else if (dt < 340) b = .5 + .5 * Math.cos(Math.PI * (dt - 170) / 170);
          else { bs = -1; nb = t + (Math.random() < .2 ? 140 : 2200 + Math.random() * 3200); }
        }
        lid(b);
        if (hm) hm.setAttribute('transform', 'translate(' + (x * 9).toFixed(2) + ' ' + (y * 5 + Math.sin(t / 900) * 3).toFixed(2) + ') rotate(' + (x * 1.1).toFixed(2) + ' 720 420)');
        PX.forEach(function(p){ if (p[0]) p[0].setAttribute('transform', 'translate(' + (x * p[1]).toFixed(2) + ' ' + (y * p[2]).toFixed(2) + ')'); });
        raf = requestAnimationFrame(frame);
      }
      raf = requestAnimationFrame(frame);
      return function(){ run = false; cancelAnimationFrame(raf); window.removeEventListener('pointermove', aim); window.removeEventListener('pointerdown', aim); };
    })();
    var endIntro = function() {
      if (iDone) return;
      iDone = true;
      window.removeEventListener('resize', fitIntro);
      eyesStop();
      cancelAnimationFrame(cRaf);
      cnt.textContent = '100';

      var bl = document.querySelector('.hd .block');
      var br = bl ? bl.getBoundingClientRect() : null;
      var vw = window.innerWidth, vh = window.innerHeight;
      var ct = 0, cl = 0, cr = 0, cb = 0;

      if (br && br.width > 0 && br.height > 0) {
        ct = Math.max(0, Math.round(br.top));
        cl = Math.max(0, Math.round(br.left));
        cr = Math.max(0, Math.round(vw - br.right));
        cb = Math.max(0, Math.round(vh - br.bottom));
        introEl.style.setProperty('--ct', ct + 'px');
        introEl.style.setProperty('--cl', cl + 'px');
        introEl.style.setProperty('--cr', cr + 'px');
        introEl.style.setProperty('--cb', cb + 'px');
        rootCls.add('intro-out');
      }

      introEl.classList.add('out');

      // Multi-stage choreographed morph from Fullscreen Intro -> Red Banner Block
      if (br && introEl.animate && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        introEl.classList.add('waapi-morph');
        var sc = document.getElementById('headSvg');
        if (sc && sc.animate) {
          var bCx = br.left + br.width * 0.5 - vw * 0.5;
          var bCy = br.top + br.height * 0.5 - vh * 0.5;
          sc.animate([
            { transform: 'translate3d(0px, 0px, 0) scale(1)', opacity: 1, offset: 0 },
            { transform: 'translate3d(' + (bCx * 0.22).toFixed(1) + 'px, ' + (bCy * 0.22).toFixed(1) + 'px, 0) scale(1.03)', opacity: 0.78, offset: 0.26 },
            { transform: 'translate3d(' + (bCx * 0.62).toFixed(1) + 'px, ' + (bCy * 0.62).toFixed(1) + 'px, 0) scale(0.76)', opacity: 0, offset: 0.76 },
            { transform: 'translate3d(' + bCx.toFixed(1) + 'px, ' + bCy.toFixed(1) + 'px, 0) scale(0.62)', opacity: 0, offset: 1 }
          ], { duration: 420, easing: 'cubic-bezier(0.32, 0, 0.2, 1)', fill: 'forwards' });
        }

        // Single-owner WAAPI clip-path compression:
        // 0%: Fullscreen -> 40%: Horizontal center red column -> 86%: Elastic lock into .hd .block -> 100%: Seamless hand-off
        var sqT = Math.min(vh - 10, ct + 4), sqB = Math.min(vh - 10, cb + 4);
        var sqL = Math.min(vw - 10, cl + 2), sqR = Math.min(vw - 10, cr + 2);
        introEl.animate([
          { clipPath: 'inset(0px 0px 0px 0px round 0px)', opacity: 1, offset: 0, easing: 'cubic-bezier(0.65, 0, 0.22, 1)' },
          { clipPath: 'inset(0px ' + cl + 'px 0px ' + cr + 'px round 0px)', opacity: 1, offset: 0.42, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' },
          { clipPath: 'inset(' + sqT + 'px ' + sqR + 'px ' + sqB + 'px ' + sqL + 'px round 2px)', opacity: 1, offset: 0.82, easing: 'cubic-bezier(0.34, 1.45, 0.64, 1)' },
          { clipPath: 'inset(' + ct + 'px ' + cr + 'px ' + cb + 'px ' + cl + 'px round 0px)', opacity: 1, offset: 0.91 },
          { clipPath: 'inset(' + ct + 'px ' + cr + 'px ' + cb + 'px ' + cl + 'px round 0px)', opacity: 0, offset: 1 }
        ], { duration: 680, fill: 'forwards' });
      }

      // Reveal Home right as the curtain locks into the center red banner
      setTimeout(function(){
        rootCls.remove('intro-on');
        rootCls.add('home-enter');
        if (bl) {
          bl.classList.add('morph-hit');
          setTimeout(function(){ bl.classList.remove('morph-hit'); }, 950);
        }
        document.dispatchEvent(new Event('introdone'));
        setTimeout(function(){ rootCls.remove('home-enter'); }, 1700);
      }, 360);

      setTimeout(function(){ introEl.remove(); }, 760);
    };
    introEl.addEventListener('click', endIntro);
    document.addEventListener('keydown', function(e){
      if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') endIntro();
    });

    introEl.setAttribute("tabindex", "-1");
    introEl.focus({ preventScroll: true });
  } else {
    if (introEl) introEl.remove();
    document.dispatchEvent(new Event("introdone"));
  }
})();
