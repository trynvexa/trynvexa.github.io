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
   theme.js
   ============================================================ */

/**
 * Theme Toggle (Light / Dark)
 * Manages color theme preference and meta tags
 */
(function(){
  // Theme toggle with localStorage persistence
  var themeBtn = document.getElementById('themeToggle');
  var mqDark = window.matchMedia('(prefers-color-scheme: dark)');
  try {
    var savedTheme = localStorage.getItem('zk-theme');
    if (savedTheme === 'dark' || savedTheme === 'light') {
      document.documentElement.setAttribute('data-theme', savedTheme);
    }
  } catch (e) {}
  function isDark() {
    var t = document.documentElement.getAttribute('data-theme');
    return t ? t === 'dark' : mqDark.matches;
  }
  function syncTheme() {
    if (!themeBtn) return;
    themeBtn.dataset.mode = isDark() ? 'dark' : 'light';
    var tc = document.getElementById('themeColor');
    if (tc) tc.setAttribute('content', isDark() ? '#101312' : '#eeebe2');
    themeBtn.setAttribute('aria-label', isDark() ? 'Ganti ke mode terang' : 'Ganti ke mode gelap');
  }
  if (themeBtn) {
    themeBtn.addEventListener('click', function(){
      var next = isDark() ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      try { localStorage.setItem('zk-theme', next); } catch (e) {}
      syncTheme();
    });
  }
  syncTheme();
})();


/* ============================================================
   clock.js
   ============================================================ */

/**
 * Live Clock (WIB / Asia-Jakarta)
 * Updates the time badge in header
 */
(function(){var el=document.getElementById("clkT");if(!el)return;
var f;try{f=new Intl.DateTimeFormat("id-ID",{timeZone:"Asia/Jakarta",hour:"2-digit",minute:"2-digit",hour12:false});}catch(e){return;}
function tk(){el.textContent=f.format(new Date()).replace(":",".");}
tk();setInterval(tk,60000);})();


/* ============================================================
   mascot.js
   ============================================================ */

/**
 * Mascot Eye Follower
 * Tracks cursor/touch movement with the mascot character in header
 */
/* Mata karakter mengikuti kursor / sentuhan; saat diam, melirik sendiri */
(function(){
  var m=document.getElementById('mascot'); if(!m) return;
  var IL=document.getElementById('mkIL'), IR=document.getElementById('mkIR'), H=document.getElementById('mkHead');
  var tx=0,ty=0,x=0,y=0,last=-1e9,nextIdle=0,reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(reduce) [].forEach.call(m.querySelectorAll('animate,animateTransform'),function(n){n.remove();});
  function aim(e){ last=performance.now(); var r=m.getBoundingClientRect(); tx=Math.max(-1,Math.min(1,(e.clientX-(r.left+r.width/2))/(innerWidth*.4))); ty=Math.max(-1,Math.min(1,(e.clientY-(r.top+r.height/2))/(innerHeight*.4))); }
  addEventListener('pointermove',aim,{passive:true}); addEventListener('pointerdown',aim,{passive:true});
  function f(t){
    if(!reduce && t-last>2200 && t>nextIdle){ tx=Math.random()*2-1; ty=Math.random()*1.4-.7; nextIdle=t+900+Math.random()*1600; }
    x+=(tx-x)*.14; y+=(ty-y)*.14;
    IL.setAttribute('transform','translate('+(x*30).toFixed(1)+' '+(y*14).toFixed(1)+')');
    IR.setAttribute('transform','translate('+(x*26).toFixed(1)+' '+(y*12).toFixed(1)+')');
    H.setAttribute('transform','translate('+(x*14).toFixed(1)+' '+(y*8).toFixed(1)+') rotate('+(x*2.5).toFixed(2)+' 665 950)');
    requestAnimationFrame(f);
  }
  requestAnimationFrame(f);
})();


/* ============================================================
   buddy.js
   ============================================================ */

/**
 * Interactive Mascot Buddy
 * 3D head/body layer split, cursor tracking, sitting on typography,
 * interactive poses, and emotional reactions.
 */
/* Karakter v12: pisahkan kepala/rambut ke lapisan sendiri + kepala mengikuti kursor */
(function(){
  var b=document.getElementById('buddy'); if(!b) return;
  [].slice.call(b.querySelectorAll('.bp')).forEach(function(el){
    var d=el;
    if(el.tagName==='IMG'){
      d=document.createElement('div'); d.className=el.className; d.setAttribute('data-p',el.getAttribute('data-p'));
      el.className='ly'; el.removeAttribute('data-p'); el.parentNode.replaceChild(d,el); d.appendChild(el);
    }
    var body=[].filter.call(d.querySelectorAll('img.ly'),function(i){ return !/\b(lgL|lgR|arm)\b/.test(i.className); })[0];
    if(!body) return;
    body.classList.add('bdy');
    var w=document.createElement('div'); w.className='hdw';
    var h=body.cloneNode(); h.className='ly hdi';
    var r=body.cloneNode(); r.className='ly hri';
    w.appendChild(h); w.appendChild(r); d.appendChild(w);
  });
  if(matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var px=null,py=null,last=0,hx=0,hy=0,t0=performance.now(),ox='',oy='',orr='';
  addEventListener('pointermove',function(e){ px=e.clientX; py=e.clientY; last=performance.now(); },{passive:true});
  function f(now){
    var tx,ty;
    if(px!==null && now-last<6000){
      var r=b.getBoundingClientRect(), cx=r.left+r.width/2, cy=r.top+r.height*.3;
      tx=Math.max(-1,Math.min(1,(px-cx)/(innerWidth*.35))); ty=Math.max(-1,Math.min(1,(py-cy)/(innerHeight*.35)));
    } else { var t=(now-t0)/1000; tx=Math.sin(t*.35)*.5; ty=Math.sin(t*.23+1)*.25; }
    hx+=(tx-hx)*.07; hy+=(ty-hy)*.07;
    var a=hx.toFixed(3), c=hy.toFixed(3), d=(hx*2.4).toFixed(2);
    if(a!==ox){ ox=a; b.style.setProperty('--hx',a); }
    if(c!==oy){ oy=c; b.style.setProperty('--hy',c); }
    if(d!==orr){ orr=d; b.style.setProperty('--hr',d); }
    requestAnimationFrame(f);
  }
  requestAnimationFrame(f);
  document.addEventListener('introdone',function(){ b.classList.remove('hop'); void b.offsetWidth; b.classList.add('hop'); },{once:true});
})();

/* Karakter: duduk di atas huruf bergelombang, bisa melompat pindah huruf, memantul trampolin, & bereaksi sesuai kartu */
(function(){
  var b=document.getElementById('buddy'), hd=document.querySelector('.hd'), title=document.querySelector('.title');
  if(!b||!hd||!title) return;
  var probe=document.createElement('b'); probe.style.cssText='display:inline-block;width:0;height:0;vertical-align:baseline';
  var L=null, seatIdx=5;
  var jump={on:false, x0:0, y0:0, t0:0, dur:480, arc:56, fromIdx:5, toIdx:5};
  var air={y:0, vy:0};
  var bopT=0;

  function getLets(){ return title.querySelectorAll('.t1 i'); }
  function ensureSeat(){
    var lets=getLets();
    if(!lets.length) return null;
    if(seatIdx>=lets.length) seatIdx=Math.min(5, Math.floor(lets.length/2));
    var target=lets[seatIdx];
    if(L!==target || !L.isConnected || !probe.isConnected){
      [].forEach.call(lets, function(el, idx){ el.classList.toggle('seated', idx===seatIdx); });
      L=target;
      if(L && !L.contains(probe)) L.appendChild(probe);
    }
    return L;
  }
  ensureSeat();

  var cv=document.createElement('canvas').getContext('2d'), capK='', capH=40;
  function cap(cs){ var k=cs.fontWeight+cs.fontSize+cs.fontFamily; if(k!==capK){ capK=k; cv.font=cs.fontWeight+' '+cs.fontSize+' '+cs.fontFamily; var m=cv.measureText('F'); capH=m.actualBoundingBoxAscent||parseFloat(cs.fontSize)*.72; } return capH; }
  if(document.fonts&&document.fonts.ready) document.fonts.ready.then(function(){ capK=''; });
  var P={}, pose='idle', pt=null, rd=matchMedia('(prefers-reduced-motion: reduce)').matches, clicks=[], lastAct=performance.now(), userT=-1e9, lean=0, tlean=0, wlean=0, bw=0, seat=.74, near=false, nearT=null, root=document.documentElement;
  var curX=0, curY=0;
  [].forEach.call(b.querySelectorAll('.bp'),function(i){P[i.dataset.p]=i;});
  function set(n,ms){
    if(!P[n]) return;
    if(n!==pose){ P[pose].classList.remove('on'); P[n].classList.add('on'); pose=n; if(!rd){ b.classList.remove('hop'); void b.offsetWidth; b.classList.add('hop'); } }
    clearTimeout(pt); if(ms) pt=setTimeout(function(){ set('idle'); },ms);
  }
  function act(){ lastAct=performance.now(); if(pose==='sleep') set('shock',1500); else if(pose==='chin') set('idle'); }

  function jumpToLetter(idx, userTriggered){
    var lets=getLets();
    if(!lets.length) return;
    idx=Math.max(0, Math.min(lets.length-1, idx));
    if(userTriggered) lastAct=performance.now();
    if(idx===seatIdx && !jump.on){
      // Trampolin di huruf tempat duduk sekarang
      air.vy = -8.5;
      if(window.__zkLetterImpulse) window.__zkLetterImpulse(idx, 18);
      set('wave', 1800);
      return;
    }
    var dist=Math.abs(idx-seatIdx);
    jump.on=true;
    jump.x0=curX;
    jump.y0=curY;
    jump.t0=performance.now();
    jump.dur=Math.min(640, 340 + dist*52);
    jump.arc=Math.min(105, 38 + dist*11);
    jump.fromIdx=seatIdx;
    jump.toIdx=idx;
    seatIdx=idx;
    ensureSeat();
    if(pose==='sleep'||pose==='chin') set('idle');
  }
  window.__zkBuddyJump = jumpToLetter;
  window.__zkBuddyBounce = function(vy){
    air.vy = Math.min(air.vy, vy || -9.5);
    set('shock', 1500);
  };
  window.__zkBuddyWheelLean = function(wl){
    wlean = Math.max(-14, Math.min(14, wl || 0));
  };
  window.__zkBuddySeatIdx = function(){ return seatIdx; };

  function frame(now){
    var curL=ensureSeat();
    if(!curL){ requestAnimationFrame(frame); return; }
    var hr=hd.getBoundingClientRect(), lr=curL.getBoundingClientRect(), cs=getComputedStyle(title), fs=parseFloat(cs.fontSize)||60, pr=probe.getBoundingClientRect();
    seat+=((pose==='idle'?.74:.83)-seat)*.12;
    var sit=(pr.top>0?pr.top:lr.bottom)-cap(cs)+fs*.04;
    var availH=Math.max((sit-hr.top-2)/.82, fs*.82);
    var h=Math.max(0,Math.min(availH,Math.max(fs*1.35,96),188));
    if(h<44 || lr.width<4){ b.style.visibility='hidden'; }
    else {
      var w=h*420/602; b.style.visibility='visible';
      if(Math.abs(w-bw)>.5){ bw=w; b.style.width=w.toFixed(1)+'px'; b.style.height=h.toFixed(1)+'px'; }
      var tx = lr.left+lr.width/2-hr.left-w/2;
      var ty = sit-hr.top-h*seat;
      var jRot = 0, bshScale = 1;

      if(jump.on && !rd){
        var p = Math.min(1, (now - jump.t0) / jump.dur);
        var e = 1 - Math.pow(1 - p, 3);
        var arcY = Math.sin(Math.PI * p) * jump.arc;
        curX = jump.x0 + (tx - jump.x0) * e;
        curY = jump.y0 + (ty - jump.y0) * e - arcY;
        jRot = (tx >= jump.x0 ? 1 : -1) * Math.sin(Math.PI * p) * 14;
        bshScale = Math.max(0.35, 1 - Math.sin(Math.PI * p) * 0.65);
        if(p >= 1){
          jump.on = false;
          air.vy = 2.6;
          if(window.__zkLetterImpulse) window.__zkLetterImpulse(seatIdx, 15);
          b.classList.remove('hop'); void b.offsetWidth; b.classList.add('hop');
        }
      } else {
        // Fisika pantulan udara (trampolin)
        if(Math.abs(air.y)>0.1 || Math.abs(air.vy)>0.1){
          air.vy += 0.58; // gravitasi
          air.y += air.vy;
          if(air.y > 0){
            air.y = 0;
            if(air.vy > 2.2){
              if(window.__zkLetterImpulse) window.__zkLetterImpulse(seatIdx, Math.min(16, air.vy * 1.8));
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
      lean += ((tlean + wlean) - lean) * .12;
      b.style.setProperty('--so',(seat*100).toFixed(1)+'%');
      b.style.transformOrigin='50% '+(seat*100).toFixed(1)+'%';
      b.style.transform='translate3d('+curX.toFixed(1)+'px,'+curY.toFixed(1)+'px,0) rotate('+(lean+jRot).toFixed(2)+'deg)';
      var bsh=b.querySelector('.bsh');
      if(bsh) bsh.style.transform='scaleX('+bshScale.toFixed(2)+')';
    }
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
  var tc=0;
  addEventListener('pointermove',function(e){
    var now=performance.now(); if(now-tc<60) return; tc=now;
    tlean=Math.max(-1,Math.min(1,(e.clientX/innerWidth)*2-1))*3; act();
    var r=b.getBoundingClientRect(), n=e.clientX>r.left-30&&e.clientX<r.right+30&&e.clientY>r.top-30&&e.clientY<r.bottom+30;
    if(n&&!near){ near=true; clearTimeout(nearT); nearT=setTimeout(function(){ if(near&&(pose==='idle'||pose==='chin')) set('wave',2400); },700); }
    else if(!n&&near){ near=false; clearTimeout(nearT); }
  },{passive:true});
  addEventListener('pointerdown',act,{passive:true});
  addEventListener('keydown',function(e){ act(); if(e.key==='ArrowLeft'||e.key==='ArrowRight') userT=performance.now(); });
  b.querySelector('.bwrap').addEventListener('click',function(){
    var now=performance.now(); clicks=clicks.filter(function(t){return now-t<3000;}); clicks.push(now); lastAct=now;
    if(clicks.length>=3){ clicks=[]; set('angry',2600); if(!rd){ b.classList.remove('shake'); void b.offsetWidth; b.classList.add('shake'); } }
    else {
      air.vy = -7.5;
      if(window.__zkLetterImpulse) window.__zkLetterImpulse(seatIdx, 14);
      set('shock',1400);
    }
  });
  var st=document.getElementById('stage');
  ['pointerdown','wheel'].forEach(function(n){ st&&st.addEventListener(n,function(){ userT=performance.now(); },{passive:true}); });
  ['prev','next'].forEach(function(id){ var el=document.getElementById(id); el&&el.addEventListener('click',function(){ userT=performance.now(); }); });

  // Reaksi spesifik terhadap kartu yang aktif
  window.__zkBuddyCardReact = function(cardIdx){
    if(performance.now()-userT>2800 || pose==='angry' || pose==='shock') return;
    if(cardIdx===1){ // Music -> head-bop mengikuti irama
      bopT = performance.now() + 3200;
      set('idle');
    } else if(cardIdx===4 || cardIdx===5){ // Skill / Proyek -> jempol
      set('thumb', 2000);
    } else if(cardIdx===2 || cardIdx===6){ // Me / Kontak -> melambai
      set('wave', 2100);
    } else {
      set('point', 1800);
    }
  };

  var tg=document.getElementById('themeToggle'); tg&&tg.addEventListener('click',function(){ lastAct=performance.now(); set('thumb',1800); });
  function tick(){
    var idle=performance.now()-lastAct;
    if(idle>26000){ if(pose!=='sleep') set('sleep'); }
    else if(idle>14000){ if(pose==='idle') set('chin'); }
    else if(idle>2400 && pose==='idle' && !jump.on){
      var r=Math.random();
      if(r<.55){
        var lets=getLets();
        if(lets.length>2){
          var stepDir = Math.random()<.5 ? -1 : 1;
          var nxt = Math.max(1, Math.min(lets.length-2, seatIdx + stepDir));
          if(nxt===seatIdx) nxt = Math.max(1, Math.min(lets.length-2, seatIdx - stepDir));
          if(nxt!==seatIdx) jumpToLetter(nxt, false);
        }
      } else if(r<.82){
        set(Math.random()<.65?'wave':'thumb',2200);
      }
    }
    setTimeout(tick,3400+Math.random()*2400);
  }
  function go(){ lastAct=performance.now(); setTimeout(tick,5000); }
  if(root.classList.contains('intro-on')) document.addEventListener('introdone',go,{once:true}); else go();
})();


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
      try {
        var bl = document.querySelector('.hd .block'), hd = bl && bl.offsetParent;
        if (bl && hd) {
          var hr = hd.getBoundingClientRect(), bw = bl.offsetWidth, bh = bl.offsetHeight,
              tr = (getComputedStyle(bl).translate || '').split(' ').map(parseFloat),
              bx = hr.left + bl.offsetLeft - bw / 2 + (tr[0] || 0), by = hr.top + bl.offsetTop + (tr[1] || 0);
          introEl.style.setProperty('--ct', Math.max(0, by) + 'px');
          introEl.style.setProperty('--cl', Math.max(0, bx) + 'px');
          introEl.style.setProperty('--cr', Math.max(0, innerWidth - bx - bw) + 'px');
          introEl.style.setProperty('--cb', Math.max(0, innerHeight - by - bh) + 'px');
          rootCls.add('intro-out');
        }
      } catch (e) {}
      introEl.classList.add('out');
      setTimeout(function(){
        rootCls.remove('intro-on');
        rootCls.add('home-enter');
        document.dispatchEvent(new Event('introdone'));
        setTimeout(function(){ rootCls.remove('home-enter'); }, 2200);
      }, 450);
      setTimeout(function(){ introEl.remove(); }, 1800);
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


/* ============================================================
   i18n.js
   ============================================================ */

/**
 * Multi-Language Internationalization Engine
 * Dictionaries and real-time DOM translation (8 languages).
 */
(function(){
var L=[["id","Indonesia","ID"],["en","English","EN"],["zh","中文","ZH"],["es","Español","ES"],["ar","العربية","AR"],["fr","Français","FR"],["ja","日本語","JA"],["ko","한국어","KO"]],
I={en:0,zh:1,es:2,ar:3,fr:4,ja:5,ko:6},T={"Klik atau ketuk untuk masuk": ["Click or tap to enter", "点击或轻触进入", "Haz clic o toca para entrar", "انقر أو المس للدخول", "Cliquez ou touchez pour entrer", "クリックまたはタップして入る", "클릭하거나 탭해서 입장"], "Proyek": ["Projects", "项目", "Proyectos", "المشاريع", "Projets", "プロジェクト", "프로젝트"], "Kontak": ["Contact", "联系", "Contacto", "تواصل", "Contact", "連絡先", "연락처"], "Cerita Saya": ["My Story", "我的故事", "Mi historia", "قصتي", "Mon histoire", "私のストーリー", "나의 이야기"], "Ganti mode warna": ["Switch color mode", "切换颜色模式", "Cambiar modo de color", "تبديل وضع الألوان", "Changer de mode de couleur", "カラーモードを切り替え", "색상 모드 전환"], "Kartu sebelumnya": ["Previous card", "上一张卡片", "Tarjeta anterior", "البطاقة السابقة", "Carte précédente", "前のカード", "이전 카드"], "Kartu berikutnya": ["Next card", "下一张卡片", "Tarjeta siguiente", "البطاقة التالية", "Carte suivante", "次のカード", "다음 카드"], "Skill & Keahlian": ["Skills & Expertise", "技能与专长", "Habilidades y experiencia", "المهارات والخبرات", "Compétences et expertise", "スキルと専門性", "스킬 & 전문성"], "Dari kode kosong": ["From an empty file", "从一片空白的代码", "Desde un archivo vacío", "من ملف فارغ", "D’un fichier vide", "空っぽのコードから", "빈 코드에서"], "sampai layar yang hidup": ["to a living screen", "到鲜活的界面", "hasta una pantalla viva", "إلى شاشة نابضة بالحياة", "à un écran vivant", "生きた画面まで", "살아 움직이는 화면까지"], "Semua tool": ["All tools", "全部工具", "Todas las herramientas", "كل الأدوات", "Tous les outils", "すべてのツール", "모든 도구"], "Keahlian utama": ["Core skills", "核心技能", "Habilidades principales", "المهارات الأساسية", "Compétences clés", "主なスキル", "핵심 역량"], "Prinsip kerja": ["Working principles", "工作原则", "Principios de trabajo", "مبادئ العمل", "Principes de travail", "仕事の原則", "작업 원칙"], "Cara kerja": ["How I work", "工作方式", "Cómo trabajo", "طريقة عملي", "Ma méthode", "進め方", "작업 방식"], "Sedang dipelajari": ["Currently learning", "正在学习", "Aprendiendo ahora", "أتعلمه الآن", "En cours d’apprentissage", "学習中", "배우는 중"], "Tanya jawab": ["Q&A", "问答", "Preguntas y respuestas", "أسئلة وأجوبة", "Questions-réponses", "Q&A", "질문과 답변"], "Lihat proyek ▸": ["See projects ▸", "查看项目 ▸", "Ver proyectos ▸", "عرض المشاريع ▸", "Voir les projets ▸", "プロジェクトを見る ▸", "프로젝트 보기 ▸"], "← Sebelumnya": ["← Previous", "← 上一个", "← Anterior", "← السابق", "← Précédent", "← 前へ", "← 이전"], "Berikutnya →": ["Next →", "下一个 →", "Siguiente →", "التالي →", "Suivant →", "次へ →", "다음 →"], "Cukup bicaranya. Lihat hasil nyatanya.": ["Enough talk. See the real work.", "话不多说,看实际成果。", "Basta de hablar. Mira el resultado real.", "كفى كلامًا. شاهد النتيجة الفعلية.", "Assez parlé. Voyez le vrai résultat.", "話はここまで。実際の成果をどうぞ。", "말은 여기까지. 실제 결과를 보세요."]},lang="id";
try{var sv=localStorage.getItem("zk-lang");if(sv&&(sv==="id"||sv in I))lang=sv;}catch(e){}
var K=function(s){return s.replace(/\s+/g," ").trim();};
var D=Object.assign({"Tools": "Alat", "AI Assistant": "Asisten AI", "Web Stack": "Teknologi Web", "UI Design": "Desain UI", "AI Workflow": "Alur Kerja AI", "Front-End · UI Design · AI Workflow": "Front-End · Desain UI · Alur Kerja AI", "Markup Language": "Bahasa Markup", "Styling Language": "Bahasa Penataan Gaya", "CSS Framework": "Kerangka CSS", "Front-End Framework": "Kerangka Front-End", "Animation Library": "Pustaka Animasi", "PHP Framework": "Kerangka PHP", "Front-End Library": "Pustaka Front-End", "Code Editor": "Penyunting Kode", "Version Control": "Kontrol Versi", "AI Prompting": "Prompt AI", "Mobile-First": "Utamakan HP", "Review AI": "Tinjauan AI", "Layout": "Tata Letak"},{"Welcome": "Selamat datang", "to my": "di", "FRONT-END DEVELOPER & UI DESIGNER": "PENGEMBANG ANTARMUKA WEB & DESAINER UI", "Story": "Cerita", "Music": "Musik", "Me": "Saya", "ME": "SAYA", "Frame": "Galeri", "Skill": "Keahlian", "SKILL": "KEAHLIAN"});
function t0(k,l){if(l==="id")return D[k]||null;var e=T[k];return e?(e[I[l]]||null):null;}
function t(s,l){var k=K(s),r=t0(k,l);if(r)return r;var m=k.match(/^([\u25C2\u25B8\s]*)([^\u25C2\u25B8]*?)([\u25C2\u25B8\s]*)$/);if(m&&(m[1]||m[3])&&m[2]){var c=t0(K(m[2]),l);if(c)return m[1]+c+m[3];}return null;}
Object.assign(T,{"Tool dan AI yang saya pakai tiap hari untuk mengubah ide jadi halaman yang rapi dan enak dipakai.": ["The tools and AI I use daily to turn ideas into neat, pleasant pages.", "我每天用来把想法变成整洁、好用的页面的工具和 AI。", "Las herramientas y la IA que uso a diario para convertir ideas en páginas ordenadas y agradables de usar.", "الأدوات والذكاء الاصطناعي التي أستخدمها يوميًا لتحويل الأفكار إلى صفحات مرتبة وممتعة الاستخدام.", "Les outils et l’IA que j’utilise chaque jour pour transformer des idées en pages soignées et agréables à utiliser.", "アイデアを整った使いやすいページに変えるために、毎日使っているツールとAIです。", null], "Cincin di tangan itu kotak alat saya. Tekan satu ikon, lepas, lalu baca cerita saya dengannya.": ["The ring on the hand is my toolbox. Press an icon, release, and read my story with it.", "手上的圆环就是我的工具箱。按住一个图标再松开，就能读到我与它的故事。", "El anillo en la mano es mi caja de herramientas. Pulsa un icono, suéltalo y lee mi historia con él.", "الحلقة في اليد هي صندوق أدواتي. اضغط على أيقونة ثم أفلتها واقرأ قصتي معها.", "L’anneau dans la main, c’est ma boîte à outils. Appuyez sur une icône, relâchez, puis lisez mon histoire avec elle.", "手の中のリングは私の道具箱です。アイコンを押して離すと、そのツールとの物語が読めます。", null], "Tools": ["Tools", "工具", "Herramientas", "أدوات", "Outils", "ツール", null], "AI Assistant": ["AI assistants", "AI 助手", "Asistentes de IA", "مساعدو ذكاء اصطناعي", "Assistants IA", "AIアシスタント", null], "Web Stack": ["Web stack", "网页技术栈", "Stack web", "تقنيات الويب", "Stack web", "Web技術", null], "Lima belas tool,": ["Fifteen tools,", "十五个工具，", "Quince herramientas,", "خمس عشرة أداة،", "Quinze outils,", "15のツール、", null], "semuanya pernah bikin begadang": ["every one has kept me up at night", "每一个都让我熬过夜", "y todas me han quitado el sueño", "وكلها أسهرتني ليلًا", "et chacun m’a déjà fait veiller tard", "どれも徹夜させられたことがあります", null], "Ketuk kartu mana pun. Saya tulis apa adanya, termasuk yang masih bikin bingung.": ["Tap any card. I wrote it as it is, including what still confuses me.", "点任意卡片。我如实写下，包括仍然让我困惑的部分。", "Toca cualquier tarjeta. Lo escribí tal cual, incluso lo que todavía me confunde.", "المس أي بطاقة. كتبتُ الأمر كما هو، بما في ذلك ما يزال يحيّرني.", "Touchez une carte. J’ai écrit les choses telles quelles, y compris ce qui me déroute encore.", "どのカードもタップしてみてください。まだ迷っていることも含め、ありのままに書きました。", null], "Jujur,": ["Honestly,", "说实话，", "Con franqueza,", "بصراحة،", "Franchement,", "正直に言うと、", null], "seberapa jago saya?": ["how good am I?", "我到底有多厉害？", "¿qué tan bueno soy?", "ما مدى إتقاني؟", "quel est vraiment mon niveau ?", "私はどれくらい得意なのか？", null], "Estimasi penguasaan teknologi berdasarkan pengalaman proyek saat ini.": ["These are today’s numbers, not goals. They will rise with each project.", "这是今天的数字，不是目标，会随着项目一起增长。", "Estas son las cifras de hoy, no metas. Subirán con cada proyecto.", "هذه أرقام اليوم وليست أهدافًا، وستزداد مع كل مشروع.", "Ce sont les chiffres d’aujourd’hui, pas des objectifs. Ils monteront avec les projets.", "これは今日の数字で、目標ではありません。プロジェクトとともに上がっていきます。", null], "Aturan main": ["House rules", "游戏规则", "Reglas del juego", "قواعد اللعبة", "Règles du jeu", "ルール", null], "yang tidak saya langgar": ["that I never break", "我从不违反", "que no rompo", "التي لا أخالفها", "que je ne transgresse pas", "絶対に破らないもの", null], "Dari coretan": ["From a rough sketch", "从草图", "Del boceto", "من الرسم التقريبي", "Du croquis", "ラフスケッチから", null], "sampai tayang": ["to going live", "到上线", "hasta la publicación", "حتى النشر", "à la mise en ligne", "公開まで", null], "Yang masih": ["What still", "那些仍然", "Lo que todavía", "ما يزال", "Ce qui", "まだまだ", null], "bikin penasaran": ["makes me curious", "让我好奇的东西", "me da curiosidad", "يثير فضولي", "me rend curieux", "気になるもの", null], "Pertanyaan": ["Questions", "经常被问到的", "Preguntas", "أسئلة", "Les questions", "よくいただく", null], "yang sering mampir": ["people often ask", "问题", "frecuentes", "تصلني كثيرًا", "qui reviennent souvent", "質問", null], "Kenapa saya betah": ["Why I stick with it", "我为什么爱用它", "Por qué me quedo con ella", "لماذا أرتاح له", "Pourquoi j’y reste", "気に入っている理由", null], "Yang saya kerjakan dengannya": ["What I do with it", "我用它做什么", "Lo que hago con ella", "ما أفعله به", "Ce que j’en fais", "これで取り組んでいること", null], "Tips": ["Tip", "小建议", "Consejo", "نصيحة", "Conseil", "ヒント", null], "Teman setianya": ["Its usual companions", "最佳搭档", "Sus compañeras habituales", "رفقاؤه الدائمون", "Ses compagnons habituels", "相性のいい仲間", null], "Tekan & lepas ikon · geser ke bawah": ["Press & release an icon · swipe down", "按住并松开图标 · 向下滑动", "Pulsa y suelta un icono · desliza hacia abajo", "اضغط على أيقونة وأفلتها · اسحب للأسفل", "Appuyez et relâchez une icône · glissez vers le bas", "アイコンを押して離す · 下にスワイプ", null], "Antarmuka rapi & responsif": ["Neat, responsive interfaces", "整洁且自适应的界面", "Interfaces ordenadas y adaptables", "واجهات مرتبة ومتجاوبة", "Interfaces soignées et adaptatives", "整っていてレスポンシブな画面", null], "Bersih, lega, konsisten": ["Clean, airy, consistent", "简洁、宽松、一致", "Limpio, aireado, coherente", "نظيف، رحب، متسق", "Épuré, aéré, cohérent", "すっきり、ゆとり、一貫性", null], "AI jadi partner berpikir": ["AI as a thinking partner", "让 AI 成为思考伙伴", "La IA como compañera de pensamiento", "الذكاء الاصطناعي شريكًا في التفكير", "L’IA comme partenaire de réflexion", "AIは考えるパートナー", null], "Web Ringan": ["Lightweight Web", "轻量网页", "Web ligera", "ويب خفيف", "Web légère", "軽量Web", null], "Cepat dimuat di HP": ["Loads fast on phones", "在手机上快速加载", "Carga rápido en el móvil", "يُحمَّل بسرعة على الهاتف", "Charge vite sur mobile", "スマホでも素早く表示", null], "Front-End": ["Front-End", "前端", "Front-end", "الواجهة الأمامية", "Front-end", "フロントエンド", null], "UI Design": ["UI Design", "UI 设计", "Diseño UI", "تصميم الواجهات", "Design UI", "UIデザイン", null], "AI Workflow": ["AI Workflow", "AI 工作流", "Flujo con IA", "سير عمل الذكاء الاصطناعي", "Workflow IA", "AIワークフロー", null], "Front-End · UI Design · AI Workflow": ["Front-End · UI Design · AI Workflow", "前端 · UI 设计 · AI 工作流", "Front-end · Diseño UI · Flujo con IA", "الواجهة الأمامية · تصميم الواجهات · سير عمل الذكاء الاصطناعي", "Front-end · Design UI · Workflow IA", "フロントエンド · UIデザイン · AIワークフロー", null], "Semua": ["All", "全部", "Todo", "الكل", "Tout", "すべて", null], "Animasi": ["Animation", "动画", "Animación", "الحركة", "Animation", "アニメーション", null], "Back-End": ["Back-End", "后端", "Back-end", "الواجهة الخلفية", "Back-end", "バックエンド", null], "AI": ["AI", "AI", "IA", "ذكاء اصطناعي", "IA", "AI", null], "Dasar": ["Basic", "入门", "Básico", "أساسي", "Notions", "基礎", null], "Berkembang": ["Developing", "进阶中", "En desarrollo", "قيد التطور", "En progrès", "成長中", null], "Menengah": ["Intermediate", "中级", "Intermedio", "متوسط", "Intermédiaire", "中級", null], "Mahir": ["Proficient", "熟练", "Avanzado", "متقدم", "Avancé", "上級", null], "Ahli": ["Expert", "精通", "Experto", "خبير", "Expert", "エキスパート", null], "Markup Language": ["Markup language", "标记语言", "Lenguaje de marcado", "لغة ترميز", "Langage de balisage", "マークアップ言語", null], "Styling Language": ["Styling language", "样式语言", "Lenguaje de estilos", "لغة تنسيق", "Langage de style", "スタイル言語", null], "CSS Framework": ["CSS framework", "CSS 框架", "Framework CSS", "إطار CSS", "Framework CSS", "CSSフレームワーク", null], "Front-End Framework": ["Front-end framework", "前端框架", "Framework front-end", "إطار الواجهة الأمامية", "Framework front-end", "フロントエンドフレームワーク", null], "Animation Library": ["Animation library", "动画库", "Librería de animación", "مكتبة حركة", "Bibliothèque d’animation", "アニメーションライブラリ", null], "PHP Framework": ["PHP framework", "PHP 框架", "Framework PHP", "إطار PHP", "Framework PHP", "PHPフレームワーク", null], "Front-End Library": ["Front-end library", "前端库", "Librería front-end", "مكتبة الواجهة الأمامية", "Bibliothèque front-end", "フロントエンドライブラリ", null], "Code Editor": ["Code editor", "代码编辑器", "Editor de código", "محرر أكواد", "Éditeur de code", "コードエディタ", null], "Version Control": ["Version control", "版本控制", "Control de versiones", "التحكم في الإصدارات", "Gestion de versions", "バージョン管理", null], "Menyusun struktur halaman yang rapi, lalu menata layout responsif dengan Flexbox, Grid, dan animasi CSS.": ["Building clean page structure, then laying out responsive designs with Flexbox, Grid, and CSS animation.", "搭建整洁的页面结构，再用 Flexbox、Grid 和 CSS 动画排出自适应布局。", "Estructuro páginas con orden y luego maqueto diseños adaptables con Flexbox, Grid y animaciones CSS.", "بناء بنية صفحة مرتبة ثم تخطيط تصاميم متجاوبة باستخدام Flexbox وGrid وحركات CSS.", "Je structure proprement les pages, puis je compose des mises en page adaptatives avec Flexbox, Grid et les animations CSS.", "整ったページ構造を作り、Flexbox・Grid・CSSアニメーションでレスポンシブなレイアウトを組みます。", null], "Merancang tampilan yang bersih dan elegan dengan hierarki jelas, spasi lega, dan warna yang konsisten.": ["Designing clean, elegant interfaces with clear hierarchy, generous spacing, and consistent color.", "设计简洁优雅的界面，层次分明，留白充足，色彩统一。", "Diseño interfaces limpias y elegantes, con jerarquía clara, espacios amplios y color coherente.", "تصميم واجهات نظيفة وأنيقة بتسلسل واضح ومساحات رحبة وألوان متسقة.", "Je conçois des interfaces épurées et élégantes, avec une hiérarchie claire, des espaces généreux et des couleurs cohérentes.", "階層が明確で、余白にゆとりがあり、色に統一感のある、すっきり上品な画面を設計します。", null], "Layout": ["Layout", "布局", "Maquetación", "التخطيط", "Mise en page", "レイアウト", null], "Tipografi": ["Typography", "排版", "Tipografía", "الطباعة", "Typographie", "タイポグラフィ", null], "Warna": ["Color", "色彩", "Color", "اللون", "Couleur", "配色", null], "AI Prompting": ["AI prompting", "AI 提示词", "Prompts de IA", "صياغة أوامر الذكاء الاصطناعي", "Prompts IA", "AIプロンプト", null], "Menulis instruksi yang jelas dan bertahap supaya AI memberi hasil tepat sasaran, lalu memeriksa hasilnya sendiri.": ["Writing clear, step-by-step instructions so AI gives on-target results, then checking the output myself.", "写出清晰、分步的指令，让 AI 给出精准的结果，再亲自检查输出。", "Escribo instrucciones claras y graduales para que la IA dé resultados precisos, y luego reviso yo mismo el resultado.", "كتابة تعليمات واضحة ومتدرجة ليعطي الذكاء الاصطناعي نتائج دقيقة، ثم مراجعة المخرجات بنفسي.", "J’écris des consignes claires et progressives pour que l’IA donne des résultats justes, puis je vérifie moi-même.", "AIが的確な結果を返せるよう、明確で段階的な指示を書き、出力は自分で確認します。", null], "Konteks": ["Context", "上下文", "Contexto", "السياق", "Contexte", "文脈", null], "Iterasi": ["Iteration", "迭代", "Iteración", "التكرار", "Itération", "反復", null], "Verifikasi": ["Verification", "验证", "Verificación", "التحقق", "Vérification", "検証", null], "Menambah interaksi seperti klik, gestur, dan animasi halus dengan memanipulasi tampilan langsung di browser.": ["Adding interactions like clicks, gestures, and smooth animation by manipulating the page directly in the browser.", "直接在浏览器中操作页面，加入点击、手势和流畅动画等交互。", "Añado interacciones como clics, gestos y animaciones fluidas manipulando la página directamente en el navegador.", "إضافة تفاعلات مثل النقر والإيماءات والحركات السلسة عبر التحكم بالصفحة مباشرة في المتصفح.", "J’ajoute des interactions (clics, gestes, animations fluides) en manipulant directement la page dans le navigateur.", "ブラウザ上でページを直接操作し、クリックやジェスチャー、なめらかなアニメーションを加えます。", null], "Masih tahap berkembang. Fokus saya sekarang di cara membagi komponen dan mengatur alur data.": ["Still developing. My focus now is how to split components and manage data flow.", "仍在进阶中。目前我关注如何拆分组件和管理数据流。", "Aún en desarrollo. Ahora me centro en cómo dividir componentes y gestionar el flujo de datos.", "ما زلت في طور التطور. أركّز الآن على تقسيم المكوّنات وإدارة تدفق البيانات.", "Encore en progression. Je me concentre sur le découpage en composants et la gestion du flux de données.", "まだ成長中です。今はコンポーネントの分け方とデータの流れの管理に集中しています。", null], "Komponen": ["Components", "组件", "Componentes", "المكوّنات", "Composants", "コンポーネント", null], "Menyusun tampilan responsif dengan cepat lewat utility class dan komponen siap pakai, lalu disesuaikan supaya punya karakter sendiri.": ["Building responsive layouts fast with utility classes and ready-made components, then customizing them to have their own character.", "借助工具类和现成组件快速搭出自适应界面，再调整出自己的风格。", "Creo diseños adaptables rápido con clases utilitarias y componentes listos, y luego los personalizo para darles carácter propio.", "بناء تصاميم متجاوبة بسرعة عبر فئات الأدوات والمكوّنات الجاهزة، ثم تخصيصها لتحمل طابعًا خاصًا.", "Je monte vite des mises en page adaptatives avec des classes utilitaires et des composants prêts à l’emploi, puis je les personnalise.", "ユーティリティクラスと既製コンポーネントで素早くレスポンシブな画面を作り、自分らしく調整します。", null], "Animasi Web": ["Web animation", "网页动画", "Animación web", "حركة الويب", "Animation web", "Webアニメーション", null], "Menghidupkan halaman dengan GSAP dan Anime.js: urutan animasi, gerakan saat digulir, dan easing yang halus.": ["Bringing pages to life with GSAP and Anime.js: animation sequences, scroll-driven motion, and smooth easing.", "用 GSAP 和 Anime.js 让页面动起来：动画序列、滚动联动效果和流畅的缓动。", "Doy vida a las páginas con GSAP y Anime.js: secuencias, movimiento al hacer scroll y un easing suave.", "إحياء الصفحات باستخدام GSAP وAnime.js: تسلسلات الحركة وحركة التمرير وتسارع سلس.", "J’anime les pages avec GSAP et Anime.js : séquences, mouvements au scroll et easing tout en douceur.", "GSAPとAnime.jsでページに命を吹き込みます。アニメーションの連なり、スクロール連動、なめらかなイージング。", null], "Masih tahap belajar. Fokus saya di reaktivitas data dan cara menyusun komponen dengan template.": ["Still learning. My focus is data reactivity and building components with templates.", "仍在学习中。我关注数据响应式以及用模板构建组件。", "Todavía aprendiendo. Me centro en la reactividad de los datos y en construir componentes con plantillas.", "ما زلت أتعلم. أركّز على تفاعلية البيانات وبناء المكوّنات بالقوالب.", "J’apprends encore. Je me concentre sur la réactivité des données et la création de composants avec des templates.", "まだ学習中です。データのリアクティビティと、テンプレートによるコンポーネント作りに取り組んでいます。", null], "Reaktivitas": ["Reactivity", "响应式", "Reactividad", "التفاعلية", "Réactivité", "リアクティビティ", null], "Baru mulai. Saya belajar routing, controller, dan database supaya paham sisi server di balik tampilan.": ["Just starting. I’m learning routing, controllers, and databases to understand the server side behind the interface.", "刚刚起步。我在学习路由、控制器和数据库，以理解界面背后的服务器端。", "Acabo de empezar. Aprendo rutas, controladores y bases de datos para entender el servidor que hay tras la interfaz.", "في البداية فقط. أتعلم التوجيه والمتحكمات وقواعد البيانات لأفهم جانب الخادم خلف الواجهة.", "Je débute. J’apprends le routing, les contrôleurs et les bases de données pour comprendre le côté serveur derrière l’interface.", "始めたばかりです。画面の裏側のサーバー側を理解するため、ルーティング、コントローラー、データベースを学んでいます。", null], "Bersih": ["Clean", "简洁", "Limpio", "نظيف", "Épuré", "すっきり", null], "Tampilan lega dan tidak ramai, supaya mata langsung tahu harus melihat ke mana.": ["Airy, uncluttered layouts so the eye knows right away where to look.", "宽松不杂乱的版面，让视线一眼就知道该看哪里。", "Diseños aireados y sin ruido, para que la vista sepa enseguida adónde mirar.", "تخطيطات رحبة وغير مزدحمة ليعرف النظر فورًا أين يتجه.", "Des mises en page aérées et sans encombrement, pour que l’œil sache tout de suite où regarder.", "余白のあるすっきりした画面で、視線がすぐ見るべき場所に向かいます。", null], "Ringan": ["Light", "轻量", "Ligero", "خفيف", "Léger", "軽さ", null], "Dimuat cepat dan tidak menumpuk library yang sebenarnya tidak perlu.": ["Loads fast and doesn’t pile on libraries that aren’t really needed.", "加载迅速，不堆砌真正用不上的库。", "Carga rápido y no acumula librerías que no hacen falta.", "سريع التحميل ولا يكدّس مكتبات غير ضرورية.", "Charge vite et n’empile pas de bibliothèques inutiles.", "読み込みが速く、本当に必要のないライブラリは積み上げません。", null], "Mobile-First": ["Mobile-first", "移动优先", "Mobile-first", "الهاتف أولًا", "Mobile-first", "モバイルファースト", null], "Dirancang dari layar kecil lebih dulu, lalu dilebarkan untuk layar yang besar.": ["Designed for small screens first, then widened for larger ones.", "先为小屏幕设计，再扩展到大屏幕。", "Se diseña primero para pantallas pequeñas y luego se amplía para las grandes.", "يُصمَّم للشاشات الصغيرة أولًا ثم يُوسَّع للشاشات الكبيرة.", "Conçu d’abord pour les petits écrans, puis élargi pour les grands.", "まず小さな画面向けに設計し、その後大きな画面へ広げます。", null], "Nyaman Dipakai": ["Comfortable to use", "用着舒服", "Cómodo de usar", "مريح في الاستخدام", "Agréable à utiliser", "使いやすさ", null], "Kontras jelas, tombol cukup besar untuk jari, dan bisa dioperasikan lewat keyboard.": ["Clear contrast, buttons big enough for fingers, and fully usable by keyboard.", "对比清晰，按钮大小适合手指，也能完全用键盘操作。", "Contraste claro, botones del tamaño de un dedo y uso completo con teclado.", "تباين واضح وأزرار بحجم مناسب للأصابع وإمكانية الاستخدام بلوحة المفاتيح.", "Contraste net, boutons assez grands pour les doigts, et utilisable au clavier.", "コントラストがはっきりし、指で押しやすい大きさのボタンで、キーボードでも操作できます。", null], "Riset": ["Research", "调研", "Investigación", "البحث", "Recherche", "リサーチ", null], "Memahami kebutuhan dan pengguna sebelum menyentuh kode.": ["Understanding needs and users before touching code.", "在动手写代码之前，先了解需求和用户。", "Entender las necesidades y a los usuarios antes de tocar código.", "فهم الاحتياجات والمستخدمين قبل لمس الكود.", "Comprendre les besoins et les utilisateurs avant de toucher au code.", "コードに触れる前に、ニーズとユーザーを理解します。", null], "Saya mulai dengan bertanya: siapa yang memakai, untuk apa, dan apa yang paling penting bagi mereka. Referensi dikumpulkan dulu supaya arah desain tidak meraba-raba.": ["I start by asking: who will use it, for what, and what matters most to them. References are gathered first so the design direction doesn’t grope in the dark.", "我先问：谁会用、为了什么、对他们最重要的是什么。先收集参考资料，让设计方向不再盲目摸索。", "Empiezo preguntando quién lo usará, para qué y qué es lo más importante para esas personas. Antes reúno referencias para que el diseño no avance a ciegas.", "أبدأ بالسؤال: من سيستخدمه ولماذا وما الأهم بالنسبة له. أجمع المراجع أولًا حتى لا يتخبّط اتجاه التصميم.", "Je commence par me demander : qui l’utilisera, pour quoi, et ce qui compte le plus pour eux. Je rassemble d’abord des références pour que la direction ne tâtonne pas.", "まず「誰が、何のために使い、何が一番大切か」を問います。デザインの方向が手探りにならないよう、先に参考資料を集めます。", null], "Tujuan": ["Goals", "目标", "Objetivos", "الأهداف", "Objectifs", "目的", null], "Pengguna": ["Users", "用户", "Usuarios", "المستخدمون", "Utilisateurs", "ユーザー", null], "Referensi": ["References", "参考", "Referencias", "المراجع", "Références", "参考資料", null], "Desain": ["Design", "设计", "Diseño", "التصميم", "Design", "デザイン", null], "Menyusun tampilan yang bersih, elegan, dan mobile-first.": ["Shaping a clean, elegant, mobile-first interface.", "打造简洁、优雅、移动优先的界面。", "Dar forma a una interfaz limpia, elegante y pensada primero para móvil.", "صياغة واجهة نظيفة وأنيقة تبدأ من الهاتف.", "Façonner une interface épurée, élégante et pensée mobile d’abord.", "すっきり上品で、モバイルを第一に考えた画面を形にします。", null], "Sketsa kasar dibuat dulu, lalu dirapikan jadi pilihan warna, huruf, dan jarak yang konsisten. Layar ponsel jadi acuan utama.": ["A rough sketch comes first, then it’s refined into consistent choices of color, type, and spacing. The phone screen is the main reference.", "先画粗略草图，再整理成统一的配色、字体和间距。手机屏幕是主要参照。", "Primero un boceto rápido y luego lo refino en decisiones coherentes de color, tipografía y espacios. La pantalla del móvil es la referencia principal.", "أبدأ برسم تقريبي ثم أصقله إلى خيارات متسقة للألوان والخطوط والمسافات. شاشة الهاتف هي المرجع الأساسي.", "Un croquis d’abord, puis je l’affine en choix cohérents de couleurs, de polices et d’espacements. L’écran du téléphone sert de référence.", "まずラフスケッチを描き、色・書体・余白の一貫した選択へ整えていきます。基準はスマホの画面です。", null], "Sketsa": ["Sketch", "草图", "Boceto", "رسم تخطيطي", "Croquis", "スケッチ", null], "Bangun": ["Build", "开发", "Construcción", "البناء", "Réalisation", "制作", null], "Menulis front-end yang ringan, dengan AI sebagai partner berpikir.": ["Writing lightweight front-end, with AI as a thinking partner.", "编写轻量的前端，让 AI 做思考伙伴。", "Escribo front-end ligero, con la IA como compañera de pensamiento.", "كتابة واجهة أمامية خفيفة مع الذكاء الاصطناعي شريكًا في التفكير.", "J’écris du front-end léger, avec l’IA comme partenaire de réflexion.", "軽量なフロントエンドを書きます。AIは考えるパートナーです。", null], "Kode ditulis bertahap dan diuji di setiap langkah. AI membantu menjelaskan dan meninjau, sementara keputusan akhirnya tetap di tangan saya.": ["Code is written in stages and tested at every step. AI helps explain and review, while the final decisions stay with me.", "代码分阶段编写，每一步都测试。AI 协助讲解和审查，最终决定仍由我做出。", "El código se escribe por etapas y se prueba en cada paso. La IA ayuda a explicar y revisar, pero las decisiones finales son mías.", "يُكتب الكود على مراحل ويُختبر في كل خطوة. يساعد الذكاء الاصطناعي في الشرح والمراجعة، بينما تبقى القرارات النهائية بيدي.", "Le code s’écrit par étapes et se teste à chaque fois. L’IA aide à expliquer et relire, mais les décisions finales restent les miennes.", "コードは段階的に書き、各ステップでテストします。AIは説明やレビューを手伝い、最終判断は私が下します。", null], "Review AI": ["AI review", "AI 审查", "Revisión con IA", "مراجعة الذكاء الاصطناعي", "Revue par IA", "AIレビュー", null], "Rilis": ["Launch", "上线", "Lanzamiento", "الإطلاق", "Mise en ligne", "公開", null], "Publikasi lewat GitHub Pages, lalu dirapikan dari masukan.": ["Publishing through GitHub Pages, then polishing based on feedback.", "通过 GitHub Pages 发布，再根据反馈打磨。", "Publico con GitHub Pages y luego pulo según los comentarios.", "النشر عبر GitHub Pages ثم التحسين بناءً على الملاحظات.", "Publication via GitHub Pages, puis ajustements selon les retours.", "GitHub Pagesで公開し、フィードバックをもとに磨き上げます。", null], "Setelah tayang, saya mengecek di beberapa ukuran layar dan perangkat, lalu memperbaiki hal kecil yang baru terlihat saat dipakai.": ["Once it’s live, I check several screen sizes and devices, then fix small things that only show up in real use.", "上线后，我会在多种屏幕尺寸和设备上检查，并修复只有实际使用时才会发现的小问题。", "Una vez publicado, lo reviso en varios tamaños de pantalla y dispositivos, y corrijo detalles que solo se ven al usarlo.", "بعد النشر أفحصه على عدة أحجام شاشات وأجهزة، ثم أصلح التفاصيل الصغيرة التي لا تظهر إلا عند الاستخدام الفعلي.", "Une fois en ligne, je vérifie plusieurs tailles d’écran et appareils, puis je corrige les petits défauts qui n’apparaissent qu’à l’usage.", "公開後は複数の画面サイズや端末で確認し、実際に使って初めて気づく細かな点を直します。", null], "Uji Layar": ["Screen testing", "屏幕测试", "Prueba de pantallas", "اختبار الشاشات", "Test d’écrans", "画面テスト", null], "Revisi": ["Revisions", "修订", "Revisiones", "المراجعات", "Révisions", "改善", null], "React lanjutan": ["Advanced React", "进阶 React", "React avanzado", "React المتقدم", "React avancé", "React応用", null], "Pola komponen yang lebih rapi dan pengelolaan state di proyek yang lebih besar.": ["Neater component patterns and state management in bigger projects.", "更整洁的组件模式，以及大型项目中的状态管理。", "Patrones de componentes más limpios y gestión del estado en proyectos más grandes.", "أنماط مكوّنات أنظف وإدارة الحالة في المشاريع الكبيرة.", "Des patrons de composants plus propres et la gestion d’état sur de plus gros projets.", "より整ったコンポーネントパターンと、大規模プロジェクトでの状態管理。", null], "JavaScript modern": ["Modern JavaScript", "现代 JavaScript", "JavaScript moderno", "JavaScript الحديثة", "JavaScript moderne", "モダンJavaScript", null], "Animasi yang halus, penanganan gestur, dan cara menjaga performa.": ["Smooth animation, gesture handling, and ways to keep performance up.", "流畅的动画、手势处理，以及保持性能的方法。", "Animaciones fluidas, gestión de gestos y formas de mantener el rendimiento.", "حركات سلسة ومعالجة الإيماءات وطرق الحفاظ على الأداء.", "Des animations fluides, la gestion des gestes et des moyens de préserver les performances.", "なめらかなアニメーション、ジェスチャー処理、パフォーマンスを保つ工夫。", null], "Alur kerja Git": ["Git workflow", "Git 工作流", "Flujo de trabajo con Git", "سير عمل Git", "Workflow Git", "Gitワークフロー", null], "Memakai branch dan commit yang tertata supaya riwayat proyek mudah dibaca.": ["Using well-organized branches and commits so the project history is easy to read.", "使用有条理的分支和提交，让项目历史易于阅读。", "Usar ramas y commits bien ordenados para que el historial del proyecto sea fácil de leer.", "استخدام فروع والتزامات منظمة ليسهل قراءة سجل المشروع.", "Utiliser des branches et des commits bien rangés pour un historique lisible.", "整理されたブランチとコミットで、プロジェクトの履歴を読みやすくします。", null], "Aksesibilitas web": ["Web accessibility", "网页无障碍", "Accesibilidad web", "إمكانية الوصول للويب", "Accessibilité web", "Webアクセシビリティ", null], "Memastikan tampilan nyaman dipakai semua orang, termasuk lewat keyboard.": ["Making sure the interface is comfortable for everyone, including by keyboard.", "确保界面对所有人都友好，包括使用键盘的人。", "Asegurar que la interfaz sea cómoda para todos, también con teclado.", "التأكد من أن الواجهة مريحة للجميع، بما في ذلك عبر لوحة المفاتيح.", "S’assurer que l’interface est confortable pour tous, y compris au clavier.", "キーボード操作も含め、誰にとっても使いやすい画面にします。", null], "Animasi dengan GSAP": ["Animation with GSAP", "用 GSAP 做动画", "Animación con GSAP", "الحركة باستخدام GSAP", "Animation avec GSAP", "GSAPでアニメーション", null], "Menyusun timeline dan animasi saat halaman digulir tanpa mengorbankan performa.": ["Building timelines and scroll-triggered animation without sacrificing performance.", "构建时间轴和滚动触发的动画，同时不牺牲性能。", "Crear timelines y animaciones al hacer scroll sin sacrificar rendimiento.", "بناء خطوط زمنية وحركات تُفعَّل بالتمرير دون التضحية بالأداء.", "Construire des timelines et des animations au scroll sans sacrifier les performances.", "パフォーマンスを犠牲にせず、タイムラインやスクロール連動アニメーションを組みます。", null], "Dasar Laravel dan Vue": ["Laravel and Vue basics", "Laravel 与 Vue 基础", "Fundamentos de Laravel y Vue", "أساسيات Laravel وVue", "Bases de Laravel et Vue", "LaravelとVueの基礎", null], "Memahami alur data dari server ke tampilan, dari routing sampai komponen.": ["Understanding how data flows from server to interface, from routing to components.", "理解数据如何从服务器流向界面，从路由到组件。", "Entender cómo fluyen los datos del servidor a la interfaz, del enrutamiento a los componentes.", "فهم كيف تتدفق البيانات من الخادم إلى الواجهة، من التوجيه إلى المكوّنات.", "Comprendre le trajet des données du serveur à l’interface, du routing aux composants.", "サーバーから画面へのデータの流れを、ルーティングからコンポーネントまで理解します。", null], "Kenapa memakai banyak asisten AI?": ["Why use so many AI assistants?", "为什么用这么多 AI 助手？", "¿Por qué uso tantos asistentes de IA?", "لماذا أستخدم كل هذه المساعدات الذكية؟", "Pourquoi autant d’assistants IA ?", "なぜこんなに多くのAIアシスタントを使うの？", null], "Setiap AI punya kelebihan masing-masing. Saya membandingkan jawabannya, lalu memutuskan sendiri mana yang paling masuk akal untuk kasus saya.": ["Each AI has its own strengths. I compare their answers, then decide myself which makes the most sense for my case.", "每个 AI 各有所长。我会对比它们的回答，再自己判断哪个最适合我的情况。", "Cada IA tiene sus puntos fuertes. Comparo sus respuestas y decido yo cuál tiene más sentido para mi caso.", "لكل ذكاء اصطناعي مزاياه. أقارن إجاباتها ثم أقرر بنفسي أيها الأنسب لحالتي.", "Chaque IA a ses points forts. Je compare leurs réponses, puis je décide moi-même laquelle convient le mieux à mon cas.", "AIにはそれぞれ得意分野があります。回答を比べ、自分のケースに一番合うものを自分で判断します。", null], "Apakah semua kode dibuat oleh AI?": ["Is all the code written by AI?", "所有代码都是 AI 写的吗？", "¿Todo el código lo escribe la IA?", "هل كل الكود يكتبه الذكاء الاصطناعي؟", "Tout le code est-il écrit par l’IA ?", "コードはすべてAIが書いているの？", null], "AI membantu menjelaskan, memberi alternatif, dan meninjau. Struktur, keputusan desain, dan pengujian hasil akhirnya tetap saya yang pegang.": ["AI helps explain, offer alternatives, and review. Structure, design decisions, and testing the final result stay with me.", "AI 负责讲解、提供备选方案和审查。结构、设计决策和最终测试仍由我负责。", "La IA ayuda a explicar, ofrecer alternativas y revisar. La estructura, las decisiones de diseño y las pruebas finales son cosa mía.", "يساعد الذكاء الاصطناعي في الشرح وتقديم البدائل والمراجعة. أما البنية وقرارات التصميم واختبار النتيجة النهائية فعليّ أنا.", "L’IA aide à expliquer, proposer des alternatives et relire. La structure, les choix de design et les tests finaux restent à ma charge.", "AIは説明や代替案の提示、レビューを手伝います。構成、デザインの判断、最終テストは私が担当します。", null], "Apa stack favorit untuk proyek kecil?": ["What’s the favorite stack for small projects?", "小项目最喜欢用什么技术栈？", "¿Cuál es el stack favorito para proyectos pequeños?", "ما التقنيات المفضلة للمشاريع الصغيرة؟", "Quelle stack préférée pour les petits projets ?", "小さなプロジェクトで好きな構成は？", null], "HTML, CSS, dan JavaScript yang dipublikasikan lewat GitHub Pages. Ringan, murah, dan mudah dirawat tanpa server database.": ["HTML, CSS, and JavaScript published via GitHub Pages. Light, cheap, and easy to maintain without a database server.", "HTML、CSS 和 JavaScript，通过 GitHub Pages 发布。轻量、便宜，没有数据库服务器也容易维护。", "HTML, CSS y JavaScript publicados con GitHub Pages. Ligero, barato y fácil de mantener sin servidor de base de datos.", "HTML وCSS وJavaScript منشورة عبر GitHub Pages. خفيفة ورخيصة وسهلة الصيانة دون خادم قاعدة بيانات.", "HTML, CSS et JavaScript publiés via GitHub Pages. Léger, économique et facile à maintenir sans serveur de base de données.", "GitHub Pagesで公開するHTML・CSS・JavaScript。軽くて安く、データベースサーバーなしで保守しやすい構成です。", null], "Bisa diajak kolaborasi?": ["Open to collaboration?", "可以合作吗？", "¿Se puede colaborar?", "هل يمكن التعاون؟", "Ouvert à la collaboration ?", "コラボはできますか？", null], "Bisa. Saya terbuka untuk freelance, proyek bersama, dan diskusi seputar pengembangan web dan desain antarmuka.": ["Yes. I’m open to freelance work, joint projects, and discussions about web development and interface design.", "可以。我欢迎自由职业合作、联合项目，以及围绕网页开发和界面设计的交流。", "Sí. Estoy abierto a trabajos freelance, proyectos conjuntos y conversaciones sobre desarrollo web y diseño de interfaces.", "نعم. أنا منفتح على العمل الحر والمشاريع المشتركة والنقاش حول تطوير الويب وتصميم الواجهات.", "Oui. Je suis ouvert au freelance, aux projets communs et aux échanges sur le développement web et le design d’interface.", "はい。フリーランスの仕事、共同プロジェクト、Web開発やUIデザインの相談も歓迎です。", null]});Object.assign(T,{"Welcome": ["Welcome", "欢迎来到", "Bienvenido", "أهلًا بك", "Bienvenue", "ようこそ", "환영합니다"], "to my": ["to my", "我的", "a mi", "في", "dans mon", "私の", "나의"], "FRONT-END DEVELOPER & UI DESIGNER": ["FRONT-END DEVELOPER & UI DESIGNER", "前端开发者 & UI 设计师", "DESARROLLADOR FRONT-END Y DISEÑADOR UI", "مطوّر واجهات أمامية ومصمم UI", "DÉVELOPPEUR FRONT-END ET DESIGNER UI", "フロントエンド開発者 & UIデザイナー", "프론트엔드 개발자 & UI 디자이너"], "Story": ["Story", "故事", "Historia", "قصتي", "Histoire", "ストーリー", "스토리"], "Music": ["Music", "音乐", "Música", "موسيقى", "Musique", "音楽", "음악"], "Me": ["Me", "关于我", "Yo", "أنا", "Moi", "私", "나"], "ME": ["ME", "关于我", "YO", "أنا", "MOI", "私", "나"], "Frame": ["Frame", "影像", "Galería", "معرض الصور", "Galerie", "ギャラリー", "갤러리"], "Skill": ["Skill", "技能", "Habilidades", "مهارات", "Compétences", "スキル", "스킬"], "SKILL": ["SKILL", "技能", "HABILIDADES", "مهارات", "COMPÉTENCES", "スキル", "스킬"], "Tentang saya": ["About me", "关于我", "Sobre mí", "عنّي", "À propos de moi", "私について", "소개"], "Fokus": ["Focus", "方向", "Enfoque", "التركيز", "Axe", "注力分野", "분야"], "Minat": ["Interests", "兴趣", "Intereses", "الاهتمامات", "Intérêts", "興味", "관심사"], "Sekolah": ["School", "学校", "Escuela", "المدرسة", "École", "学校", "학교"], "Domisili": ["Location", "所在地", "Residencia", "الإقامة", "Résidence", "居住地", "거주지"], "Medan, Sumatera Utara": ["Medan, North Sumatra", "北苏门答腊省棉兰", "Medan, Sumatra del Norte", "ميدان، شمال سومطرة", "Medan, Sumatra du Nord", "北スマトラ州メダン", "북수마트라 메단"], "Front-end development & desain antarmuka": ["Front-end development & interface design", "前端开发与界面设计", "Desarrollo front-end y diseño de interfaces", "تطوير الواجهات الأمامية وتصميمها", "Développement front-end et design d’interface", "フロントエンド開発とUIデザイン", "프론트엔드 개발 & 인터페이스 디자인"], "Teknologi dan pengembangan diri": ["Technology and self-development", "科技与自我提升", "Tecnología y desarrollo personal", "التقنية وتطوير الذات", "Technologie et développement personnel", "テクノロジーと自己成長", "기술과 자기계발"], "Hubungi saya": ["Contact me", "联系我", "Contáctame", "تواصل معي", "Me contacter", "お問い合わせ", "연락하기"], "Kembali": ["Back", "返回", "Volver", "رجوع", "Retour", "戻る", "뒤로"]});var H={"Perkenalkan, saya M. Zikri Al-Bukhori, berusia 16 tahun dan berdomisili di Medan, Sumatera Utara. Saat ini saya merupakan pelajar di SMK Swasta Mandiri yang memiliki semangat untuk terus belajar, berkembang, dan mengeksplorasi berbagai hal baru.": ["Hi, I’m <strong>M. Zikri Al-Bukhori</strong>, <strong>16 years old</strong>, based in <strong>Medan, North Sumatra</strong>. I’m currently a student at <strong>SMK Swasta Mandiri</strong>, eager to keep learning, growing, and exploring new things.", "你好，我是 <strong>M. Zikri Al-Bukhori</strong>，<strong>16 岁</strong>，住在<strong>北苏门答腊省棉兰</strong>。我目前就读于 <strong>SMK Swasta Mandiri</strong>，始终热衷于学习、成长和探索新事物。", "Hola, soy <strong>M. Zikri Al-Bukhori</strong>, tengo <strong>16 años</strong> y vivo en <strong>Medan, Sumatra del Norte</strong>. Actualmente estudio en <strong>SMK Swasta Mandiri</strong> y tengo muchas ganas de seguir aprendiendo, creciendo y explorando cosas nuevas.", "مرحبًا، أنا <strong>M. Zikri Al-Bukhori</strong>، عمري <strong>16 عامًا</strong> وأقيم في <strong>ميدان، شمال سومطرة</strong>. أدرس حاليًا في <strong>SMK Swasta Mandiri</strong>، ولديّ شغف بمواصلة التعلّم والنمو واستكشاف كل جديد.", "Bonjour, je suis <strong>M. Zikri Al-Bukhori</strong>, j’ai <strong>16 ans</strong> et je vis à <strong>Medan, Sumatra du Nord</strong>. Je suis actuellement élève au <strong>SMK Swasta Mandiri</strong>, avec l’envie de continuer à apprendre, à grandir et à explorer de nouvelles choses.", "はじめまして、<strong>M. Zikri Al-Bukhori</strong>です。<strong>16歳</strong>で、<strong>北スマトラ州メダン</strong>に住んでいます。現在は<strong>SMK Swasta Mandiri</strong>の生徒で、学び、成長し、新しいことに挑戦し続けたいと思っています。", null], "Saya percaya bahwa usia bukanlah batas untuk mulai membangun masa depan. Bagi saya, setiap proses pembelajaran merupakan kesempatan untuk mengembangkan kemampuan, memperluas wawasan, serta membentuk karakter yang lebih baik.": ["I believe age is no barrier to building a future. To me, every learning process is a chance to grow my skills, broaden my view, and shape a better character.", "我相信年龄不是构建未来的门槛。对我来说，每一次学习都是提升能力、开阔视野、塑造更好品格的机会。", "Creo que la edad no es un límite para empezar a construir el futuro. Para mí, cada proceso de aprendizaje es una oportunidad de desarrollar mis habilidades, ampliar mi visión y formar un mejor carácter.", "أؤمن بأن العمر ليس حاجزًا أمام بناء المستقبل. وبالنسبة لي، كل تجربة تعلّم فرصة لتنمية مهاراتي وتوسيع آفاقي وبناء شخصية أفضل.", "Je crois que l’âge n’est pas un frein pour construire son avenir. Pour moi, chaque apprentissage est une occasion de développer mes compétences, d’élargir mes horizons et de former un meilleur caractère.", "年齢は未来を築くうえで障壁にならないと信じています。私にとって学びの一つひとつは、力をつけ、視野を広げ、より良い人間性を育てる機会です。", null], "Saya memiliki ketertarikan terhadap dunia teknologi dan pengembangan diri. Saya senang mempelajari hal-hal baru, mencoba berbagai tantangan, dan membangun pengalaman yang dapat menjadi bekal untuk masa depan.": ["I’m drawn to technology and self-development. I enjoy learning new things, taking on challenges, and building experience that will serve me in the future.", "我对科技和自我提升很感兴趣。我喜欢学习新事物、尝试各种挑战，并积累将来用得上的经验。", "Me interesan la tecnología y el desarrollo personal. Disfruto aprender cosas nuevas, afrontar retos y acumular experiencia que me servirá en el futuro.", "تستهويني التقنية وتطوير الذات. أستمتع بتعلّم أشياء جديدة وخوض التحديات وبناء خبرات تفيدني في المستقبل.", "La technologie et le développement personnel m’attirent. J’aime apprendre de nouvelles choses, relever des défis et accumuler une expérience utile pour l’avenir.", "テクノロジーと自己成長に興味があります。新しいことを学び、さまざまな課題に挑戦し、将来の糧になる経験を積むのが好きです。", null], "Prinsip saya sederhana: terus belajar, berani mencoba, dan tidak berhenti berkembang.": ["<span>My principle is simple:</span> keep learning, dare to try, and never stop growing.", "<span>我的原则很简单：</span>不断学习，勇于尝试，永不停止成长。", "<span>Mi principio es sencillo:</span> seguir aprendiendo, atreverme a probar y no dejar de crecer.", "<span>مبدئي بسيط:</span> أن أواصل التعلّم، وأجرؤ على التجربة، ولا أتوقف عن النمو.", "<span>Mon principe est simple :</span> continuer à apprendre, oser essayer et ne jamais cesser de grandir.", "<span>私の信条はシンプルです：</span>学び続け、挑戦を恐れず、成長をやめないこと。", null]};
Object.assign(T,{"Dipakai setiap hari": ["Used every day", "每天都在用", "Lo uso todos los días", "أستخدمه كل يوم", "Utilisé tous les jours", "毎日使っています", "매일 사용해요"], "Semantik": ["Semantics", "语义化", "Semántica", "الدلالية", "Sémantique", "セマンティクス", "시맨틱"], "Struktur": ["Structure", "结构", "Estructura", "البنية", "Structure", "構造", "구조"], "Aksesibilitas": ["Accessibility", "无障碍", "Accesibilidad", "إمكانية الوصول", "Accessibilité", "アクセシビリティ", "접근성"], "HTML adalah kerangka halaman: tag yang memberi tahu browser mana judul, navigasi, artikel, formulir, dan tombol. HTML5 menambah tag semantik (header, nav, main, section, article, footer), elemen media seperti video dan canvas, serta input bawaan untuk email, tanggal, dan slider. Tanpa HTML yang benar, CSS dan JavaScript menempel di fondasi yang goyang.": ["HTML is the skeleton of a page: tags that tell the browser what is a title, navigation, article, form, and button. HTML5 adds semantic tags (header, nav, main, section, article, footer), media elements like video and canvas, and built-in inputs for email, dates, and sliders. Without correct HTML, CSS and JavaScript sit on a shaky foundation.", "HTML 是页面的骨架：用标签告诉浏览器哪里是标题、导航、文章、表单和按钮。HTML5 增加了语义标签（header、nav、main、section、article、footer）、video 和 canvas 等媒体元素，以及邮箱、日期和滑块的内置输入控件。没有正确的 HTML，CSS 和 JavaScript 就建在不稳的地基上。", "HTML es el esqueleto de una página: etiquetas que le dicen al navegador qué es un título, la navegación, un artículo, un formulario o un botón. HTML5 añade etiquetas semánticas (header, nav, main, section, article, footer), elementos multimedia como video y canvas, y campos nativos para correo, fechas y deslizadores. Sin un HTML correcto, CSS y JavaScript se apoyan en una base inestable.", "HTML هو الهيكل العظمي للصفحة: وسوم تخبر المتصفح أين العنوان والتنقل والمقال والنموذج والزر. يضيف HTML5 وسومًا دلالية (header وnav وmain وsection وarticle وfooter) وعناصر وسائط مثل video وcanvas ومدخلات مدمجة للبريد الإلكتروني والتواريخ والمنزلقات. بدون HTML صحيح، يقوم CSS وJavaScript على أساس مهتز.", "HTML est le squelette d’une page : des balises qui indiquent au navigateur ce qui est un titre, la navigation, un article, un formulaire ou un bouton. HTML5 ajoute des balises sémantiques (header, nav, main, section, article, footer), des éléments média comme video et canvas, et des champs natifs pour l’e-mail, les dates et les curseurs. Sans HTML correct, CSS et JavaScript reposent sur des fondations fragiles.", "HTML はページの骨組みです。どこがタイトルで、ナビゲーションで、記事で、フォームで、ボタンなのかをブラウザに伝えるタグです。HTML5 では、セマンティックなタグ（header、nav、main、section、article、footer）、video や canvas などのメディア要素、メール・日付・スライダー用の標準入力が加わりました。正しい HTML がなければ、CSS と JavaScript はぐらついた土台の上に載ることになります。", "HTML은 페이지의 뼈대입니다. 어디가 제목이고, 내비게이션이고, 기사이고, 양식이고, 버튼인지 브라우저에 알려 주는 태그입니다. HTML5는 시맨틱 태그(header, nav, main, section, article, footer)와 video, canvas 같은 미디어 요소, 이메일·날짜·슬라이더용 기본 입력 요소를 더했습니다. 올바른 HTML이 없으면 CSS와 JavaScript는 흔들리는 토대 위에 서게 됩니다."], "Struktur yang benar membuat halaman terbaca oleh pembaca layar, mesin pencari, dan mode baca browser tanpa kerja tambahan. CSS saya juga jadi lebih pendek, karena elemen yang tepat sudah membawa perilaku bawaan.": ["Proper structure makes a page readable by screen readers, search engines, and browser reading modes with no extra work. My CSS also gets shorter, because the right element already brings built-in behavior.", "结构正确，屏幕阅读器、搜索引擎和浏览器的阅读模式无需额外工作就能读懂页面。我的 CSS 也因此更短，因为合适的元素本身就自带默认行为。", "Una buena estructura hace que la página sea legible para lectores de pantalla, buscadores y modos de lectura del navegador sin trabajo extra. Mi CSS también se acorta, porque el elemento adecuado ya trae un comportamiento integrado.", "البنية الصحيحة تجعل الصفحة مقروءة لقارئات الشاشة ومحركات البحث ووضع القراءة في المتصفح دون جهد إضافي. كما يصبح CSS عندي أقصر، لأن العنصر المناسب يأتي أصلًا بسلوك مدمج.", "Une bonne structure rend la page lisible par les lecteurs d’écran, les moteurs de recherche et les modes lecture des navigateurs, sans effort supplémentaire. Mon CSS devient aussi plus court, car le bon élément apporte déjà un comportement natif.", "正しい構造にしておけば、スクリーンリーダーや検索エンジン、ブラウザのリーダーモードが追加の作業なしでページを読み取れます。適切な要素にはもともと標準の挙動があるので、CSS も短くなります。", "구조가 올바르면 화면 낭독기, 검색 엔진, 브라우저의 읽기 모드가 추가 작업 없이 페이지를 읽을 수 있습니다. 알맞은 요소가 이미 기본 동작을 갖고 있어서 제 CSS도 더 짧아집니다."], "Menyusun kerangka halaman dengan header, main, section, dan footer": ["Building the page skeleton with header, main, section, and footer", "用 header、main、section 和 footer 搭建页面骨架", "Armar el esqueleto de la página con header, main, section y footer", "بناء هيكل الصفحة باستخدام header وmain وsection وfooter", "Construire le squelette de la page avec header, main, section et footer", "header、main、section、footer でページの骨組みを作る", "header, main, section, footer로 페이지 뼈대 만들기"], "Memakai button untuk aksi dan a untuk pindah halaman, bukan div yang diberi klik": ["Using button for actions and a for navigation, instead of a div with a click handler", "用 button 处理操作、用 a 处理跳转，而不是给 div 绑定点击事件", "Usar button para acciones y a para navegar, en lugar de un div con un clic", "استخدام button للإجراءات وa للانتقال بين الصفحات، بدل div مربوط بحدث نقر", "Utiliser button pour les actions et a pour la navigation, plutôt qu’un div avec un clic", "クリック処理を付けた div ではなく、操作には button、ページ移動には a を使う", "클릭을 붙인 div 대신 동작에는 button, 페이지 이동에는 a 사용하기"], "Menulis formulir dengan label, tipe input yang pas, dan validasi bawaan": ["Writing forms with labels, the right input types, and built-in validation", "编写带 label、合适输入类型和内置验证的表单", "Escribir formularios con label, los tipos de input adecuados y validación integrada", "كتابة نماذج بعناصر label وأنواع الإدخال المناسبة والتحقق المدمج", "Écrire des formulaires avec des label, les bons types d’input et la validation native", "label、適切な input の種類、標準のバリデーションを使ってフォームを書く", "label, 알맞은 input 유형, 기본 유효성 검사를 갖춘 양식 작성하기"], "Menambahkan alt pada gambar dan aria-label pada tombol ikon": ["Adding alt to images and aria-label to icon buttons", "为图片添加 alt，为图标按钮添加 aria-label", "Añadir alt a las imágenes y aria-label a los botones con icono", "إضافة alt للصور وaria-label لأزرار الأيقونات", "Ajouter alt aux images et aria-label aux boutons à icône", "画像に alt、アイコンボタンに aria-label を付ける", "이미지에 alt, 아이콘 버튼에 aria-label 추가하기"], "Mengatur urutan heading h1 sampai h3 agar outline halaman masuk akal": ["Keeping heading order from h1 to h3 so the page outline makes sense", "按 h1 到 h3 的顺序安排标题，让页面大纲合理", "Mantener el orden de los encabezados de h1 a h3 para que el esquema de la página tenga sentido", "ترتيب العناوين من h1 إلى h3 ليكون مخطط الصفحة منطقيًا", "Respecter l’ordre des titres de h1 à h3 pour que le plan de la page ait du sens", "ページのアウトラインが筋の通ったものになるよう、見出しを h1 から h3 の順に整える", "페이지 개요가 말이 되도록 제목 순서를 h1에서 h3까지 지키기"], "Sebelum menulis CSS, matikan stylesheet sebentar. Kalau halaman masih terbaca urut dan masuk akal, struktur HTML-nya sudah benar.": ["Before writing CSS, switch off the stylesheet for a moment. If the page still reads in order and makes sense, the HTML structure is right.", "写 CSS 之前，先暂时关掉样式表。如果页面依然读起来有顺序、合乎逻辑，说明 HTML 结构是对的。", "Antes de escribir CSS, apaga la hoja de estilos un momento. Si la página aún se lee en orden y tiene sentido, la estructura HTML es correcta.", "قبل كتابة CSS، أوقف ورقة الأنماط للحظة. إذا بقيت الصفحة مقروءة بترتيب منطقي، فبنية HTML سليمة.", "Avant d’écrire du CSS, désactivez un instant la feuille de style. Si la page reste lisible dans l’ordre et cohérente, la structure HTML est bonne.", "CSS を書く前に、スタイルシートを一時的にオフにしてみましょう。それでもページが順序よく読めて筋が通っていれば、HTML の構造は正しいです。", "CSS를 쓰기 전에 스타일시트를 잠깐 꺼 보세요. 그래도 페이지가 순서대로 읽히고 말이 된다면 HTML 구조는 올바른 것입니다."], "Biodata satu halaman dengan teks biru bergaris bawah. Jelek, tapi itu pertama kalinya sesuatu yang saya tulis hidup di browser.": ["A one-page bio with blue underlined text. Ugly, but it was the first time something I wrote came alive in the browser.", "一页纸的自我介绍，蓝色带下划线的文字。很丑，但那是我写的东西第一次在浏览器里活了起来。", "Una biografía de una sola página con texto azul subrayado. Fea, pero fue la primera vez que algo que escribí cobró vida en el navegador.", "سيرة ذاتية من صفحة واحدة بنص أزرق مسطّر. قبيحة، لكنها كانت أول مرة يعيش فيها شيء كتبته داخل المتصفح.", "Un CV d’une page avec du texte bleu souligné. Moche, mais c’était la première fois que quelque chose que j’avais écrit prenait vie dans le navigateur.", "青い下線付きの文字だけの 1 ページの自己紹介。見た目は悪かったけれど、自分で書いたものが初めてブラウザの中で動いた瞬間でした。", "파란 밑줄 글씨만 있는 한 장짜리 자기소개. 못생겼지만, 제가 쓴 것이 처음으로 브라우저에서 살아 움직인 순간이었습니다."], "Pilih tag karena artinya, bukan karena tampilannya.": ["Pick a tag for what it means, not for how it looks.", "选标签看它的含义，而不是看它的样子。", "Elige una etiqueta por lo que significa, no por cómo se ve.", "اختر الوسم لمعناه، لا لشكله.", "Choisissez une balise pour ce qu’elle signifie, pas pour son apparence.", "タグは見た目ではなく、意味で選びましょう。", "태그는 겉모습이 아니라 의미로 고르세요."], "Memakai div untuk semuanya, lalu bingung kenapa tombol tidak bisa difokus dengan keyboard.": ["Using div for everything, then wondering why buttons can't be focused with the keyboard.", "什么都用 div，然后纳闷为什么按钮无法用键盘聚焦。", "Usar div para todo y luego preguntarme por qué los botones no se pueden enfocar con el teclado.", "استخدام div لكل شيء، ثم التساؤل لماذا لا يمكن تركيز الأزرار بلوحة المفاتيح.", "Utiliser div pour tout, puis me demander pourquoi les boutons ne reçoivent pas le focus au clavier.", "何でも div にしてしまい、キーボードでボタンにフォーカスできない理由が分からず悩んだこと。", "모든 것을 div로 만들고는 왜 키보드로 버튼에 포커스가 안 되는지 어리둥절했던 일."], "CSS mengatur semua yang terlihat: warna, huruf, jarak, tata letak, dan gerak. Flexbox menata satu arah, Grid menata dua arah, custom property menyimpan nilai yang dipakai ulang, dan media query menyesuaikan tampilan dengan ukuran layar. Transisi dan animasi bawaan menutup banyak kebutuhan yang dulu butuh library.": ["CSS controls everything you see: color, type, spacing, layout, and motion. Flexbox lays out in one direction, Grid in two, custom properties store reusable values, and media queries adapt the look to screen size. Built-in transitions and animations cover many needs that used to require a library.", "CSS 掌管所有看得见的东西：颜色、字体、间距、布局和动效。Flexbox 负责一维排布，Grid 负责二维排布，自定义属性保存可复用的值，媒体查询让界面适应屏幕尺寸。内置的过渡和动画满足了许多过去需要依赖库才能做到的需求。", "CSS controla todo lo que se ve: color, tipografía, espaciado, diseño y movimiento. Flexbox ordena en una dirección, Grid en dos, las propiedades personalizadas guardan valores reutilizables y las media queries adaptan el aspecto al tamaño de pantalla. Las transiciones y animaciones nativas cubren muchas necesidades que antes exigían una biblioteca.", "يتحكم CSS في كل ما تراه: الألوان والخطوط والمسافات والتخطيط والحركة. يرتّب Flexbox في اتجاه واحد وGrid في اتجاهين، وتخزّن الخصائص المخصصة قيمًا قابلة لإعادة الاستخدام، وتكيّف استعلامات الوسائط المظهر مع حجم الشاشة. والانتقالات والرسوم المتحركة المدمجة تغطي كثيرًا من الاحتياجات التي كانت تتطلب مكتبة.", "CSS gère tout ce que l’on voit : couleurs, typographie, espacements, mise en page et mouvement. Flexbox organise dans une direction, Grid dans deux, les propriétés personnalisées stockent des valeurs réutilisables et les media queries adaptent l’apparence à la taille de l’écran. Les transitions et animations natives couvrent de nombreux besoins qui exigeaient autrefois une bibliothèque.", "CSS は目に見えるすべてを制御します。色、文字、余白、レイアウト、動きです。Flexbox は一方向、Grid は二方向に配置し、カスタムプロパティは再利用する値を保存し、メディアクエリは画面サイズに合わせて見た目を調整します。標準のトランジションやアニメーションで、以前はライブラリが必要だった多くのことがまかなえます。", "CSS는 눈에 보이는 모든 것을 다룹니다. 색, 글꼴, 간격, 레이아웃, 움직임입니다. Flexbox는 한 방향, Grid는 두 방향으로 배치하고, 사용자 정의 속성은 재사용할 값을 저장하며, 미디어 쿼리는 화면 크기에 맞게 모양을 조정합니다. 기본 제공되는 전환과 애니메이션만으로도 예전엔 라이브러리가 필요했던 많은 것을 해결할 수 있습니다."], "Browser mengerjakan CSS langsung di engine-nya, jadi animasi transform dan opacity mulus tanpa JavaScript. Satu file gaya yang rapi juga lebih ringan daripada setumpuk dependensi.": ["The browser runs CSS directly in its engine, so transform and opacity animations are smooth without JavaScript. One tidy stylesheet is also lighter than a pile of dependencies.", "浏览器直接在引擎里处理 CSS，所以 transform 和 opacity 动画不用 JavaScript 也很流畅。一份整洁的样式表也比一堆依赖更轻。", "El navegador ejecuta CSS directamente en su motor, así que las animaciones de transform y opacity van fluidas sin JavaScript. Una sola hoja de estilos ordenada también pesa menos que un montón de dependencias.", "ينفّذ المتصفح CSS مباشرة في محركه، لذا تكون حركات transform وopacity سلسة دون JavaScript. وملف أنماط واحد مرتب أخف أيضًا من كومة من الاعتمادات.", "Le navigateur exécute CSS directement dans son moteur, donc les animations de transform et d’opacity sont fluides sans JavaScript. Une seule feuille de style bien rangée est aussi plus légère qu’un tas de dépendances.", "ブラウザは CSS をエンジン内で直接処理するため、transform と opacity のアニメーションは JavaScript なしでも滑らかです。整理された 1 つのスタイルシートは、依存ライブラリの山よりも軽くなります。", "브라우저가 CSS를 엔진에서 직접 처리하므로 transform과 opacity 애니메이션은 JavaScript 없이도 부드럽습니다. 깔끔한 스타일시트 하나는 의존성 더미보다 가볍기도 합니다."], "Menata halaman dengan Grid dan komponen dengan Flexbox": ["Laying out pages with Grid and components with Flexbox", "用 Grid 排页面，用 Flexbox 排组件", "Maquetar páginas con Grid y componentes con Flexbox", "تخطيط الصفحات بـ Grid والمكوّنات بـ Flexbox", "Mettre en page avec Grid et les composants avec Flexbox", "ページは Grid、コンポーネントは Flexbox でレイアウトする", "페이지는 Grid로, 컴포넌트는 Flexbox로 배치하기"], "Menyimpan warna, jarak, dan tema terang-gelap sebagai variabel CSS": ["Storing colors, spacing, and light/dark themes as CSS variables", "把颜色、间距和明暗主题保存为 CSS 变量", "Guardar colores, espaciados y temas claro/oscuro como variables CSS", "حفظ الألوان والمسافات والسمات الفاتحة/الداكنة كمتغيرات CSS", "Stocker couleurs, espacements et thèmes clair/sombre en variables CSS", "色、余白、ライト／ダークテーマを CSS 変数として保存する", "색, 간격, 라이트/다크 테마를 CSS 변수로 저장하기"], "Membuat animasi dengan transform dan opacity supaya tetap lancar": ["Making animations with transform and opacity so they stay smooth", "用 transform 和 opacity 做动画，保持流畅", "Crear animaciones con transform y opacity para que sigan fluidas", "صنع الحركات بـ transform وopacity لتبقى سلسة", "Créer des animations avec transform et opacity pour qu’elles restent fluides", "滑らかさを保つため、transform と opacity でアニメーションを作る", "부드러움을 유지하도록 transform과 opacity로 애니메이션 만들기"], "Menulis mobile-first lalu menambah breakpoint seperlunya": ["Writing mobile-first, then adding breakpoints only where needed", "先按移动端优先来写，再按需增加断点", "Escribir primero para móvil y añadir breakpoints solo donde hagan falta", "الكتابة بمنهج الجوال أولًا ثم إضافة نقاط التوقف عند الحاجة فقط", "Écrire d’abord pour mobile, puis ajouter des points de rupture seulement si nécessaire", "モバイルファーストで書き、必要なところだけブレークポイントを足す", "모바일 우선으로 작성하고 필요한 곳에만 브레이크포인트 추가하기"], "Memakai clamp() agar ukuran huruf mengalir mengikuti lebar layar": ["Using clamp() so font sizes flow with the screen width", "使用 clamp() 让字号随屏幕宽度自然变化", "Usar clamp() para que el tamaño de la fuente fluya con el ancho de pantalla", "استخدام clamp() ليتدفق حجم الخط مع عرض الشاشة", "Utiliser clamp() pour que la taille de police suive la largeur de l’écran", "clamp() を使って、文字サイズが画面幅に合わせて変化するようにする", "clamp()로 글자 크기가 화면 너비에 맞춰 흐르게 하기"], "Animasikan transform dan opacity saja. Mengubah width, top, atau box-shadow terus-menerus membuat HP kelas menengah tersendat.": ["Animate only transform and opacity. Constantly changing width, top, or box-shadow makes mid-range phones stutter.", "只对 transform 和 opacity 做动画。持续改变 width、top 或 box-shadow 会让中端手机卡顿。", "Anima solo transform y opacity. Cambiar constantemente width, top o box-shadow hace que los móviles de gama media se atasquen.", "حرّك transform وopacity فقط. تغيير width أو top أو box-shadow باستمرار يجعل الهواتف المتوسطة تتقطع.", "N’animez que transform et opacity. Modifier sans cesse width, top ou box-shadow fait saccader les téléphones milieu de gamme.", "アニメーションさせるのは transform と opacity だけにしましょう。width、top、box-shadow を絶えず変えると、ミドルクラスのスマホではカクつきます。", "transform과 opacity만 애니메이션하세요. width, top, box-shadow를 계속 바꾸면 중급 기종 휴대폰은 버벅입니다."], "Memusatkan satu kotak memakan satu sore dan tiga tab StackOverflow. Sekarang itu dua baris.": ["Centering one box used to take an afternoon and three StackOverflow tabs. Now it's two lines.", "以前让一个盒子居中要花一下午和三个 StackOverflow 标签页，现在只要两行。", "Centrar una caja antes llevaba una tarde y tres pestañas de StackOverflow. Ahora son dos líneas.", "كان توسيط صندوق واحد يستغرق عصرًا كاملًا وثلاث علامات تبويب من StackOverflow. الآن صار سطرين.", "Centrer une boîte prenait un après-midi et trois onglets StackOverflow. Aujourd’hui, c’est deux lignes.", "ボックスを 1 つ中央に置くのに、昔は午後いっぱいと StackOverflow のタブ 3 つが必要でした。今では 2 行です。", "상자 하나를 가운데 두는 데 예전엔 오후 한나절과 StackOverflow 탭 세 개가 필요했어요. 이제는 두 줄입니다."], "Layout itu soal alur dan ruang, bukan menghafal properti.": ["Layout is about flow and space, not memorizing properties.", "布局讲的是流动和空间，不是死记属性。", "El diseño trata de flujo y espacio, no de memorizar propiedades.", "التخطيط يدور حول التدفق والمساحة، لا حفظ الخصائص.", "La mise en page est une question de flux et d’espace, pas de mémorisation de propriétés.", "レイアウトとは流れと空間のことであり、プロパティの暗記ではありません。", "레이아웃은 흐름과 공간의 문제이지, 속성을 외우는 문제가 아닙니다."], "Memberi z-index 9999 ke mana-mana, sampai semuanya saling menimpa dan saya harus belajar stacking context.": ["Putting z-index 9999 everywhere until everything overlapped and I had to learn stacking contexts.", "到处写 z-index 9999，结果全都互相覆盖，我只好去学层叠上下文。", "Poner z-index 9999 en todas partes hasta que todo se superponía y tuve que aprender los contextos de apilamiento.", "وضع z-index 9999 في كل مكان حتى تداخل كل شيء واضطررت لتعلّم سياقات التراص.", "Mettre z-index 9999 partout jusqu’à ce que tout se chevauche et que je doive apprendre les contextes d’empilement.", "あちこちに z-index 9999 を付けた結果、すべてが重なり合い、スタッキングコンテキストを学ぶはめになったこと。", "z-index 9999를 여기저기 붙였다가 전부 서로 겹쳐서 쌓임 맥락을 공부해야 했던 일."], "Untuk proyek yang butuh cepat": ["For projects that need speed", "适合需要快速完成的项目", "Para proyectos que necesitan rapidez", "للمشاريع التي تحتاج إلى سرعة", "Pour les projets qui demandent de la rapidité", "スピードが求められるプロジェクト向け", "빠르게 만들어야 하는 프로젝트에"], "Responsif": ["Responsive", "响应式", "Adaptable", "متجاوب", "Adaptatif", "レスポンシブ", "반응형"], "Prototipe": ["Prototyping", "原型", "Prototipado", "نماذج أولية", "Prototypage", "プロトタイピング", "프로토타입"], "Tailwind adalah kumpulan utility class kecil seperti flex, p-4, dan text-lg yang disusun langsung di markup. Hanya class yang terpakai yang masuk ke CSS akhir, dan ada prefix responsif seperti md: dan lg: serta varian state seperti hover: dan focus:.": ["Tailwind is a set of small utility classes like flex, p-4, and text-lg, written directly in the markup. Only the classes you use end up in the final CSS, and it has responsive prefixes like md: and lg: plus state variants like hover: and focus:.", "Tailwind 是一组小型工具类，例如 flex、p-4 和 text-lg，直接写在标记里。只有用到的类才会进入最终的 CSS，还带有 md:、lg: 这样的响应式前缀，以及 hover:、focus: 这样的状态变体。", "Tailwind es un conjunto de pequeñas clases de utilidad como flex, p-4 y text-lg, escritas directamente en el marcado. Solo las clases que usas llegan al CSS final, y tiene prefijos responsivos como md: y lg: además de variantes de estado como hover: y focus:.", "Tailwind مجموعة من الفئات الصغيرة مثل flex وp-4 وtext-lg تُكتب مباشرة في الشيفرة. لا يدخل في CSS النهائي إلا ما تستخدمه من فئات، وله بوادئ متجاوبة مثل md: وlg: ومتغيرات حالة مثل hover: وfocus:.", "Tailwind est un ensemble de petites classes utilitaires comme flex, p-4 et text-lg, écrites directement dans le balisage. Seules les classes utilisées arrivent dans le CSS final, avec des préfixes responsives comme md: et lg: et des variantes d’état comme hover: et focus:.", "Tailwind は flex、p-4、text-lg のような小さなユーティリティクラスの集まりで、マークアップに直接書きます。使ったクラスだけが最終的な CSS に含まれ、md: や lg: といったレスポンシブ用の接頭辞や、hover: や focus: といった状態のバリアントもあります。", "Tailwind는 flex, p-4, text-lg 같은 작은 유틸리티 클래스 모음으로, 마크업에 바로 씁니다. 사용한 클래스만 최종 CSS에 들어가며, md:, lg: 같은 반응형 접두사와 hover:, focus: 같은 상태 변형도 있습니다."], "Jarak dan warna datang dari satu skala yang sama, jadi desain konsisten. Saya juga tidak lagi menamai class dan tidak bolak-balik antara file HTML dan CSS.": ["Spacing and color come from one shared scale, so the design stays consistent. I also no longer have to name classes or jump back and forth between HTML and CSS files.", "间距和颜色来自同一套刻度，所以设计保持一致。我也不再需要给类命名，不用在 HTML 和 CSS 文件之间来回切换。", "El espaciado y el color salen de una misma escala, así que el diseño es coherente. Además ya no tengo que ponerle nombre a las clases ni saltar entre archivos HTML y CSS.", "المسافات والألوان تأتي من مقياس واحد مشترك، فيبقى التصميم متسقًا. كما لم أعد أسمّي الفئات أو أتنقل بين ملفات HTML وCSS.", "Espacements et couleurs viennent d’une même échelle, donc le design reste cohérent. Je n’ai plus non plus à nommer des classes ni à faire des allers-retours entre fichiers HTML et CSS.", "余白と色が同じスケールから来るので、デザインに一貫性が出ます。クラスに名前を付けたり、HTML と CSS のファイルを行き来したりする必要もなくなりました。", "간격과 색이 같은 기준에서 나오기 때문에 디자인이 일관됩니다. 클래스 이름을 짓거나 HTML과 CSS 파일 사이를 오갈 필요도 없어졌습니다."], "Membuat prototipe halaman dalam satu file tanpa pindah-pindah": ["Prototyping a page in a single file without switching around", "在单个文件里做页面原型，不用来回切换", "Prototipar una página en un solo archivo sin cambiar de un lado a otro", "بناء نموذج أولي للصفحة في ملف واحد دون التنقل بين ملفات", "Prototyper une page dans un seul fichier sans changer de contexte", "ファイルを行き来せず、1 つのファイルでページのプロトタイプを作る", "파일을 오가지 않고 한 파일에서 페이지 프로토타입 만들기"], "Menyetel layout responsif dengan prefix sm, md, dan lg": ["Setting up responsive layouts with the sm, md, and lg prefixes", "用 sm、md 和 lg 前缀设置响应式布局", "Configurar diseños adaptables con los prefijos sm, md y lg", "إعداد تخطيطات متجاوبة بالبوادئ sm وmd وlg", "Configurer des mises en page adaptatives avec les préfixes sm, md et lg", "sm、md、lg の接頭辞でレスポンシブなレイアウトを設定する", "sm, md, lg 접두사로 반응형 레이아웃 설정하기"], "Mengubah warna dan font di konfigurasi agar punya karakter sendiri": ["Changing colors and fonts in the config to give it its own character", "在配置里修改颜色和字体，让它有自己的个性", "Cambiar colores y fuentes en la configuración para darle carácter propio", "تغيير الألوان والخطوط في الإعدادات ليكون له طابعه الخاص", "Modifier couleurs et polices dans la configuration pour lui donner son propre caractère", "設定で色とフォントを変え、独自の個性を出す", "설정에서 색과 글꼴을 바꿔 나만의 개성 주기"], "Memadukannya dengan komponen React supaya class berulang jadi satu komponen": ["Combining it with React components so repeated classes become one component", "与 React 组件结合，把重复的类变成一个组件", "Combinarlo con componentes de React para que las clases repetidas se conviertan en un componente", "دمجه مع مكوّنات React لتتحول الفئات المتكررة إلى مكوّن واحد", "L’associer aux composants React pour que les classes répétées deviennent un seul composant", "React のコンポーネントと組み合わせ、繰り返すクラスを 1 つのコンポーネントにまとめる", "React 컴포넌트와 결합해 반복되는 클래스를 하나의 컴포넌트로 만들기"], "Memakai varian hover, focus, dan dark untuk keadaan interaktif": ["Using hover, focus, and dark variants for interactive states", "用 hover、focus 和 dark 变体处理交互状态", "Usar las variantes hover, focus y dark para los estados interactivos", "استخدام متغيرات hover وfocus وdark للحالات التفاعلية", "Utiliser les variantes hover, focus et dark pour les états interactifs", "インタラクティブな状態に hover、focus、dark のバリアントを使う", "인터랙티브한 상태에 hover, focus, dark 변형 사용하기"], "Kalau satu rangkaian class muncul lebih dari tiga kali, jadikan komponen. Jangan salin-tempel.": ["If a group of classes appears more than three times, turn it into a component. Don't copy and paste.", "如果一组类出现超过三次，就把它做成组件，别复制粘贴。", "Si un grupo de clases aparece más de tres veces, conviértelo en un componente. No copies y pegues.", "إذا تكررت مجموعة فئات أكثر من ثلاث مرات، حوّلها إلى مكوّن. لا تنسخ وتلصق.", "Si un groupe de classes apparaît plus de trois fois, faites-en un composant. Ne faites pas de copier-coller.", "クラスのまとまりが 3 回以上出てきたら、コンポーネントにしましょう。コピー＆ペーストはやめましょう。", "클래스 묶음이 세 번 넘게 나오면 컴포넌트로 만드세요. 복사해서 붙여 넣지 마세요."], "Awalnya risih melihat belasan class di satu tag. Seminggu kemudian saya tidak mau kembali.": ["At first, a dozen classes on one tag felt messy. A week later I didn't want to go back.", "一开始看到一个标签上有十几个类觉得很乱，一周后我就不想回去了。", "Al principio, una docena de clases en una etiqueta me parecía un desorden. Una semana después no quería volver atrás.", "في البداية بدت لي اثنتا عشرة فئة على وسم واحد فوضى. وبعد أسبوع لم أعد أريد العودة.", "Au début, une douzaine de classes sur une balise me semblait brouillon. Une semaine plus tard, je ne voulais plus revenir en arrière.", "最初は 1 つのタグに十数個のクラスが付くのが煩雑に思えました。1 週間後には戻りたくなくなりました。", "처음에는 태그 하나에 클래스가 십여 개 붙는 게 지저분해 보였습니다. 일주일 뒤에는 돌아가고 싶지 않았어요."], "Tailwind tidak menggantikan CSS. Ia mempercepat orang yang sudah paham CSS.": ["Tailwind doesn't replace CSS. It speeds up people who already understand CSS.", "Tailwind 不会取代 CSS，它是让已经懂 CSS 的人更快。", "Tailwind no reemplaza a CSS. Acelera a quien ya entiende CSS.", "Tailwind لا يحلّ محل CSS. إنه يسرّع من يفهم CSS أصلًا.", "Tailwind ne remplace pas CSS. Il accélère ceux qui comprennent déjà CSS.", "Tailwind は CSS の代わりにはなりません。すでに CSS を理解している人を速くしてくれるものです。", "Tailwind는 CSS를 대체하지 않습니다. CSS를 이미 이해하는 사람을 더 빠르게 해 줍니다."], "Menumpuk class tanpa aturan sampai satu tombol butuh dua baris. Sejak itu saya pecah jadi komponen.": ["Piling up classes with no rules until one button needed two lines. Since then I split things into components.", "不加约束地堆类，堆到一个按钮要占两行。从那以后我就把它们拆成组件。", "Acumular clases sin reglas hasta que un botón necesitaba dos líneas. Desde entonces lo divido en componentes.", "تكديس الفئات بلا قواعد حتى احتاج زر واحد إلى سطرين. ومنذ ذلك الحين أقسّمها إلى مكوّنات.", "Empiler des classes sans règle jusqu’à ce qu’un bouton occupe deux lignes. Depuis, je découpe en composants.", "ルールなしにクラスを積み上げ、ボタン 1 つで 2 行も必要になったこと。それ以来、コンポーネントに分けています。", "규칙 없이 클래스를 쌓다가 버튼 하나에 두 줄이 필요해진 일. 그 뒤로는 컴포넌트로 나눕니다."], "Sedang dijelajahi": ["Currently exploring", "正在探索中", "Lo estoy explorando", "قيد الاستكشاف", "En cours d’exploration", "いま探求中", "탐색 중"], "Vue adalah framework JavaScript untuk antarmuka. Data dibuat reaktif lewat ref dan computed, sehingga tampilan ikut berubah saat data berubah. Template ditulis mirip HTML dengan directive seperti v-if, v-for, dan v-model, dan satu komponen disimpan dalam satu file .vue.": ["Vue is a JavaScript framework for interfaces. Data is made reactive with ref and computed, so the view updates when the data changes. Templates look like HTML with directives such as v-if, v-for, and v-model, and one component lives in one .vue file.", "Vue 是用于构建界面的 JavaScript 框架。数据通过 ref 和 computed 变成响应式，数据变化时视图随之更新。模板写法类似 HTML，带有 v-if、v-for 和 v-model 等指令，一个组件放在一个 .vue 文件里。", "Vue es un framework de JavaScript para interfaces. Los datos se vuelven reactivos con ref y computed, de modo que la vista se actualiza cuando cambian. Las plantillas se parecen a HTML con directivas como v-if, v-for y v-model, y un componente vive en un solo archivo .vue.", "Vue إطار عمل JavaScript للواجهات. تُجعل البيانات تفاعلية عبر ref وcomputed، فتتحدث الواجهة عند تغيّر البيانات. تُكتب القوالب بشكل يشبه HTML مع توجيهات مثل v-if وv-for وv-model، ويعيش المكوّن الواحد في ملف .vue واحد.", "Vue est un framework JavaScript pour les interfaces. Les données deviennent réactives avec ref et computed, donc la vue se met à jour quand elles changent. Les templates ressemblent à du HTML avec des directives comme v-if, v-for et v-model, et un composant tient dans un seul fichier .vue.", "Vue はインターフェース向けの JavaScript フレームワークです。データは ref と computed でリアクティブになり、データが変わると画面も更新されます。テンプレートは HTML に似ていて、v-if、v-for、v-model などのディレクティブがあり、1 つのコンポーネントは 1 つの .vue ファイルに収まります。", "Vue는 인터페이스를 위한 JavaScript 프레임워크입니다. 데이터는 ref와 computed로 반응형이 되어, 데이터가 바뀌면 화면도 함께 바뀝니다. 템플릿은 HTML과 비슷하게 쓰며 v-if, v-for, v-model 같은 디렉티브가 있고, 컴포넌트 하나는 .vue 파일 하나에 담깁니다."], "Kurva belajarnya landai dan model reaktivitasnya jelas. Saya memakainya sebagai pembanding supaya paham bahwa ide komponen dan state bukan milik satu library saja.": ["The learning curve is gentle and the reactivity model is clear. I use it as a point of comparison to understand that the ideas of components and state don't belong to just one library.", "学习曲线平缓，响应式模型清晰。我把它当作对照，借此明白组件和状态的思想并不属于某一个库。", "La curva de aprendizaje es suave y el modelo de reactividad es claro. Lo uso como punto de comparación para entender que las ideas de componentes y estado no pertenecen a una sola biblioteca.", "منحنى التعلم لطيف ونموذج التفاعلية واضح. أستخدمه للمقارنة كي أفهم أن فكرتي المكوّنات والحالة لا تخصّان مكتبة واحدة.", "La courbe d’apprentissage est douce et le modèle de réactivité est clair. Je m’en sers comme point de comparaison pour comprendre que les idées de composants et d’état n’appartiennent pas à une seule bibliothèque.", "学習曲線がなだらかで、リアクティビティの仕組みが明快です。コンポーネントや状態という考え方が 1 つのライブラリだけのものではないと理解するために、比較対象として使っています。", "학습 곡선이 완만하고 반응성 모델이 명확합니다. 컴포넌트와 상태라는 개념이 어느 한 라이브러리만의 것이 아님을 이해하려고 비교 대상으로 씁니다."], "Membuat komponen kecil dengan props dan emit": ["Building small components with props and emit", "用 props 和 emit 构建小组件", "Crear componentes pequeños con props y emit", "بناء مكوّنات صغيرة باستخدام props وemit", "Créer de petits composants avec props et emit", "props と emit で小さなコンポーネントを作る", "props와 emit으로 작은 컴포넌트 만들기"], "Memakai ref dan computed untuk data yang saling bergantung": ["Using ref and computed for data that depends on other data", "用 ref 和 computed 处理相互依赖的数据", "Usar ref y computed para datos que dependen unos de otros", "استخدام ref وcomputed للبيانات المعتمدة على بعضها", "Utiliser ref et computed pour des données interdépendantes", "互いに依存するデータに ref と computed を使う", "서로 의존하는 데이터에 ref와 computed 사용하기"], "Menampilkan daftar dengan v-for dan kondisi dengan v-if": ["Showing lists with v-for and conditions with v-if", "用 v-for 显示列表，用 v-if 处理条件", "Mostrar listas con v-for y condiciones con v-if", "عرض القوائم بـ v-for والشروط بـ v-if", "Afficher des listes avec v-for et des conditions avec v-if", "v-for でリストを、v-if で条件を表示する", "v-for로 목록을, v-if로 조건을 표시하기"], "Mengikat input dengan v-model untuk formulir sederhana": ["Binding inputs with v-model for simple forms", "用 v-model 绑定输入，做简单的表单", "Enlazar campos con v-model en formularios sencillos", "ربط المدخلات بـ v-model في نماذج بسيطة", "Lier des champs avec v-model dans des formulaires simples", "簡単なフォームで v-model を使って入力を結びつける", "간단한 양식에서 v-model로 입력 연결하기"], "Membangun proyek latihan seperti daftar tugas dan kalkulator": ["Building practice projects like a to-do list and a calculator", "做练习项目，比如待办清单和计算器", "Hacer proyectos de práctica como una lista de tareas y una calculadora", "بناء مشاريع تدريبية مثل قائمة مهام وآلة حاسبة", "Réaliser des projets d’entraînement comme une liste de tâches et une calculatrice", "ToDo リストや電卓など、練習用のプロジェクトを作る", "할 일 목록, 계산기 같은 연습 프로젝트 만들기"], "Mulai dari satu komponen dan satu ref. Tambah fitur setelah yang itu benar-benar paham.": ["Start with one component and one ref. Add features only after that one is fully understood.", "先从一个组件和一个 ref 开始。等完全理解后，再增加功能。", "Empieza con un componente y un ref. Añade funciones solo cuando ese esté bien entendido.", "ابدأ بمكوّن واحد وref واحد. وأضف الميزات بعد أن تفهم ذلك فهمًا كاملًا.", "Commencez par un composant et un ref. Ajoutez des fonctions une fois celui-là bien compris.", "1 つのコンポーネントと 1 つの ref から始めましょう。それが完全に理解できてから機能を足します。", "컴포넌트 하나와 ref 하나로 시작하세요. 그것을 완전히 이해한 뒤에 기능을 더하세요."], "Saya buka karena penasaran kenapa orang bilang ramah pemula. v-model langsung membuat saya paham.": ["I opened it out of curiosity about why people call it beginner-friendly. v-model made it click right away.", "我出于好奇点开它，想知道为什么大家说它对新手友好。v-model 一下子就让我明白了。", "Lo abrí por curiosidad sobre por qué dicen que es amigable para principiantes. Con v-model lo entendí al instante.", "فتحته بدافع الفضول لأعرف لماذا يقولون إنه مناسب للمبتدئين. وجعلني v-model أفهم فورًا.", "Je l’ai ouvert par curiosité, pour savoir pourquoi on dit qu’il est adapté aux débutants. v-model m’a fait comprendre tout de suite.", "初心者に優しいと言われる理由が気になって開いてみました。v-model で一気に分かりました。", "왜 초보자에게 친절하다고들 하는지 궁금해서 열어 봤습니다. v-model 덕분에 바로 이해됐어요."], "Belajar framework kedua membuat saya mengerti framework pertama lebih dalam.": ["Learning a second framework helped me understand the first one more deeply.", "学第二个框架，让我对第一个框架理解得更深。", "Aprender un segundo framework me ayudó a entender mejor el primero.", "تعلّم إطار عمل ثانٍ جعلني أفهم الأول بعمق أكبر.", "Apprendre un deuxième framework m’a fait comprendre le premier plus en profondeur.", "2 つ目のフレームワークを学んだことで、最初のフレームワークをより深く理解できました。", "두 번째 프레임워크를 배우니 첫 번째 프레임워크를 더 깊이 이해하게 됐습니다."], "Lupa memakai .value pada ref di script, lalu heran kenapa datanya tidak berubah.": ["Forgetting .value on a ref in the script, then wondering why the data didn't change.", "在 script 里忘了给 ref 加 .value，然后纳闷数据为什么没变。", "Olvidar .value en un ref dentro del script y preguntarme por qué los datos no cambian.", "نسيان .value على ref داخل السكربت، ثم الاستغراب من عدم تغيّر البيانات.", "Oublier .value sur un ref dans le script, puis me demander pourquoi les données ne changent pas.", "script 内で ref に .value を付け忘れて、なぜデータが変わらないのか首をひねったこと。", "script에서 ref에 .value를 붙이는 걸 잊고는 왜 데이터가 안 바뀌는지 의아해했던 일."], "Bootstrap adalah framework CSS dengan grid 12 kolom, breakpoint standar, dan komponen siap pakai: navbar, card, modal, accordion, dan form. Versi terbarunya memakai variabel CSS sehingga tema bisa diubah tanpa menulis ulang.": ["Bootstrap is a CSS framework with a 12-column grid, standard breakpoints, and ready-made components: navbar, card, modal, accordion, and form. Its latest version uses CSS variables so themes can be changed without rewriting.", "Bootstrap 是一个 CSS 框架，提供 12 列网格、标准断点和现成组件：navbar、card、modal、accordion 和 form。最新版本使用 CSS 变量，无需重写就能更换主题。", "Bootstrap es un framework CSS con cuadrícula de 12 columnas, breakpoints estándar y componentes listos: navbar, card, modal, accordion y form. Su versión más reciente usa variables CSS para cambiar el tema sin reescribir.", "Bootstrap إطار عمل CSS بشبكة من 12 عمودًا ونقاط توقف قياسية ومكوّنات جاهزة: navbar وcard وmodal وaccordion وform. يستخدم إصداره الأحدث متغيرات CSS ليمكن تغيير السمة دون إعادة كتابة.", "Bootstrap est un framework CSS avec une grille à 12 colonnes, des points de rupture standard et des composants prêts à l’emploi : navbar, card, modal, accordion et form. Sa dernière version utilise des variables CSS pour changer de thème sans tout réécrire.", "Bootstrap は、12 列のグリッド、標準的なブレークポイント、すぐ使えるコンポーネント（navbar、card、modal、accordion、form）を備えた CSS フレームワークです。最新版は CSS 変数を使っており、書き直さずにテーマを変えられます。", "Bootstrap은 12열 그리드, 표준 브레이크포인트, 바로 쓸 수 있는 컴포넌트(navbar, card, modal, accordion, form)를 갖춘 CSS 프레임워크입니다. 최신 버전은 CSS 변수를 사용해 다시 쓰지 않고도 테마를 바꿀 수 있습니다."], "Untuk halaman yang harus cepat jadi dan aman di banyak layar, grid dan komponennya sudah teruji. Ini framework pertama yang saya pelajari, jadi cara berpikir grid saya berawal dari sini.": ["For pages that must be built fast and work safely on many screens, its grid and components are well tested. It was the first framework I learned, so my way of thinking about grids started here.", "对于需要快速完成、又要在多种屏幕上稳妥运行的页面，它的网格和组件久经考验。这是我学的第一个框架，我对网格的思考方式就是从这里开始的。", "Para páginas que deben salir rápido y funcionar bien en muchas pantallas, su cuadrícula y sus componentes están muy probados. Fue el primer framework que aprendí, así que mi forma de pensar en cuadrículas empezó aquí.", "للصفحات التي يجب إنجازها بسرعة وتعمل بأمان على شاشات كثيرة، شبكته ومكوّناته مجرَّبة جيدًا. كان أول إطار عمل أتعلمه، فبدأ تفكيري في الشبكات من هنا.", "Pour les pages qui doivent être prêtes vite et fonctionner sur de nombreux écrans, sa grille et ses composants ont fait leurs preuves. C’est le premier framework que j’ai appris, donc ma façon de penser la grille vient de là.", "素早く仕上げて、多くの画面で安全に動かしたいページには、グリッドとコンポーネントが十分に検証されています。最初に学んだフレームワークなので、グリッドの考え方はここから始まりました。", "빠르게 만들어야 하고 여러 화면에서 안전하게 동작해야 하는 페이지에는 그리드와 컴포넌트가 충분히 검증되어 있습니다. 제가 처음 배운 프레임워크라서 그리드에 대한 사고방식이 여기서 시작됐습니다."], "Menyusun halaman dengan container, row, dan col": ["Building pages with container, row, and col", "用 container、row 和 col 搭建页面", "Armar páginas con container, row y col", "بناء الصفحات باستخدام container وrow وcol", "Construire des pages avec container, row et col", "container、row、col でページを組む", "container, row, col로 페이지 구성하기"], "Memakai navbar yang otomatis melipat di layar kecil": ["Using a navbar that collapses automatically on small screens", "使用在小屏幕上自动折叠的 navbar", "Usar un navbar que se pliega solo en pantallas pequeñas", "استخدام navbar ينطوي تلقائيًا على الشاشات الصغيرة", "Utiliser une navbar qui se replie automatiquement sur petit écran", "小さい画面で自動的に折りたたまれる navbar を使う", "작은 화면에서 자동으로 접히는 navbar 사용하기"], "Membuat modal dan accordion tanpa menulis JavaScript sendiri": ["Making modals and accordions without writing my own JavaScript", "不用自己写 JavaScript 就做出 modal 和 accordion", "Hacer modales y acordeones sin escribir mi propio JavaScript", "صنع modal وaccordion دون كتابة JavaScript خاص بي", "Créer des modales et des accordéons sans écrire mon propre JavaScript", "自分で JavaScript を書かずに modal と accordion を作る", "JavaScript를 직접 쓰지 않고 modal과 accordion 만들기"], "Mengganti warna utama lewat variabel agar tidak terlihat seperti bawaan": ["Changing the primary color through variables so it doesn't look stock", "通过变量修改主色，让它不像默认样子", "Cambiar el color principal con variables para que no parezca el de fábrica", "تغيير اللون الأساسي عبر المتغيرات حتى لا يبدو افتراضيًا", "Changer la couleur principale via les variables pour qu’il n’ait pas l’air d’origine", "既定のままに見えないよう、変数でメインカラーを変える", "기본 모습처럼 보이지 않도록 변수로 메인 색상 바꾸기"], "Menyiapkan prototipe untuk klien yang ingin melihat bentuknya dulu": ["Preparing prototypes for clients who want to see the shape first", "为想先看到大致样子的客户准备原型", "Preparar prototipos para clientes que quieren ver primero la forma", "إعداد نماذج أولية لعملاء يريدون رؤية الشكل أولًا", "Préparer des prototypes pour des clients qui veulent d’abord voir la forme", "まず形を見たいというクライアント向けにプロトタイプを用意する", "먼저 모양을 보고 싶어 하는 클라이언트를 위해 프로토타입 준비하기"], "Jangan biarkan bawaan. Ganti warna utama, radius, dan font, dan hasilnya langsung tidak terlihat seperti template.": ["Don't leave the defaults. Change the primary color, radius, and font, and it instantly stops looking like a template.", "别保留默认样式。改掉主色、圆角和字体，它立刻就不像模板了。", "No dejes los valores por defecto. Cambia el color principal, el radio y la fuente, y deja de parecer una plantilla al instante.", "لا تترك الإعدادات الافتراضية. غيّر اللون الأساسي ونصف القطر والخط، فيتوقف فورًا عن الظهور كقالب.", "Ne gardez pas les réglages par défaut. Changez la couleur principale, le rayon et la police, et il cesse aussitôt de ressembler à un modèle.", "既定のまま放置しないでください。メインカラー、角丸、フォントを変えれば、テンプレートっぽさがすぐに消えます。", "기본값 그대로 두지 마세요. 메인 색상, 모서리 둥글기, 글꼴을 바꾸면 바로 템플릿처럼 보이지 않습니다."], "Menempel class col-md-6 dan melihat kolom otomatis turun di HP. Saat itu saya sadar responsif ternyata bisa dipelajari.": ["Adding the class col-md-6 and watching the columns drop down on a phone automatically. That's when I realized responsive design could be learned.", "加上 col-md-6 类，看到列在手机上自动换行。那一刻我意识到，响应式是可以学会的。", "Añadir la clase col-md-6 y ver cómo las columnas bajan solas en el móvil. Ahí me di cuenta de que el diseño adaptable se podía aprender.", "إضافة الفئة col-md-6 ومشاهدة الأعمدة تنزل تلقائيًا على الهاتف. عندها أدركت أن التصميم المتجاوب يمكن تعلّمه.", "Ajouter la classe col-md-6 et voir les colonnes passer automatiquement les unes sous les autres sur téléphone. C’est là que j’ai compris que le responsive s’apprenait.", "col-md-6 クラスを付けて、スマホで列が自動的に縦に積み重なるのを見たとき、レスポンシブは学べるものだと気づきました。", "col-md-6 클래스를 붙이고 열이 휴대폰에서 저절로 내려가는 걸 봤을 때, 반응형도 배울 수 있는 것이라는 걸 깨달았습니다."], "Framework mempercepat langkah, tapi karakter tampilan tetap harus saya buat sendiri.": ["A framework speeds up the steps, but the character of the design still has to come from me.", "框架能加快步骤，但设计的个性还是得我自己来做。", "Un framework acelera los pasos, pero el carácter del diseño tengo que ponerlo yo.", "إطار العمل يسرّع الخطوات، لكن طابع التصميم ما زال عليّ أن أصنعه بنفسي.", "Un framework accélère les étapes, mais le caractère du design, c’est à moi de le créer.", "フレームワークは作業を速くしてくれますが、デザインの個性は自分で作らなければなりません。", "프레임워크가 단계를 빠르게 해 주지만, 디자인의 개성은 제가 직접 만들어야 합니다."], "Menimpa class bawaan dengan !important berlapis-lapis. Mengubah variabelnya jauh lebih bersih.": ["Overriding built-in classes with layers of !important. Changing the variable is far cleaner.", "层层叠叠地用 !important 覆盖内置类。改变量要干净得多。", "Sobrescribir clases integradas con capas de !important. Cambiar la variable es mucho más limpio.", "تجاوز الفئات المدمجة بطبقات من !important. تغيير المتغير أنظف بكثير.", "Écraser les classes natives avec des couches de !important. Modifier la variable est bien plus propre.", "!important を何重にも重ねて標準のクラスを上書きしたこと。変数を変えるほうがずっとすっきりします。", "!important를 겹겹이 써서 기본 클래스를 덮어쓴 일. 변수를 바꾸는 편이 훨씬 깔끔합니다."], "Untuk animasi yang rumit": ["For complex animation", "适合复杂的动画", "Para animaciones complejas", "للحركات المعقدة", "Pour les animations complexes", "複雑なアニメーション向け", "복잡한 애니메이션에"], "GSAP adalah library animasi JavaScript dengan kendali waktu yang presisi. Timeline menyusun urutan animasi, ScrollTrigger mengaitkan gerak dengan posisi gulir, dan easing mengatur rasa gerakan, dari lembut sampai memantul. Ia bisa menganimasikan CSS, SVG, dan objek JavaScript biasa.": ["GSAP is a JavaScript animation library with precise control over timing. Timelines sequence animations, ScrollTrigger ties motion to scroll position, and easing sets the feel of movement, from soft to bouncy. It can animate CSS, SVG, and plain JavaScript objects.", "GSAP 是一个 JavaScript 动画库，对时间有精确的控制。Timeline 负责排列动画顺序，ScrollTrigger 把动作与滚动位置绑定，缓动（easing）决定动作的质感，从柔和到弹跳都可以。它能为 CSS、SVG 和普通 JavaScript 对象制作动画。", "GSAP es una biblioteca de animación en JavaScript con control preciso del tiempo. Las timelines ordenan las animaciones, ScrollTrigger vincula el movimiento a la posición del scroll y el easing define la sensación del movimiento, de suave a rebotante. Puede animar CSS, SVG y objetos JavaScript comunes.", "GSAP مكتبة حركة JavaScript بتحكم دقيق في التوقيت. تُرتّب Timeline تسلسل الحركات، وتربط ScrollTrigger الحركة بموضع التمرير، ويحدد easing إحساس الحركة من الناعم إلى المرتد. ويمكنها تحريك CSS وSVG وكائنات JavaScript العادية.", "GSAP est une bibliothèque d’animation JavaScript au contrôle précis du temps. Les timelines ordonnent les animations, ScrollTrigger relie le mouvement à la position du défilement, et l’easing règle la sensation du mouvement, du doux au rebondissant. Elle peut animer CSS, SVG et de simples objets JavaScript.", "GSAP は、タイミングを精密に制御できる JavaScript のアニメーションライブラリです。Timeline がアニメーションの順序を組み、ScrollTrigger が動きをスクロール位置に結びつけ、イージングがやわらかさから弾むようなものまで動きの質感を決めます。CSS、SVG、通常の JavaScript オブジェクトをアニメーションさせられます。", "GSAP은 시간을 정밀하게 제어하는 JavaScript 애니메이션 라이브러리입니다. Timeline이 애니메이션 순서를 짜고, ScrollTrigger가 움직임을 스크롤 위치와 연결하며, 이징이 부드러움부터 튕김까지 움직임의 느낌을 정합니다. CSS, SVG, 일반 JavaScript 객체를 애니메이션할 수 있습니다."], "Kalau urutan animasinya banyak, CSS saja cepat berantakan. Timeline membuat semuanya bisa dijeda, diputar balik, dan diatur ulang dari satu tempat.": ["When there are many animations in sequence, CSS alone gets messy fast. A timeline lets everything be paused, reversed, and reset from one place.", "当动画顺序很多时，只靠 CSS 很快就会变乱。Timeline 让一切都能在一处暂停、倒放和重置。", "Cuando hay muchas animaciones en secuencia, solo con CSS se vuelve un lío rápido. Una timeline permite pausar, invertir y reiniciar todo desde un solo lugar.", "عندما تكثر الحركات المتسلسلة، يصبح CSS وحده فوضويًا بسرعة. تتيح Timeline إيقاف كل شيء وعكسه وإعادة ضبطه من مكان واحد.", "Quand il y a beaucoup d’animations en séquence, CSS seul devient vite brouillon. Une timeline permet de tout mettre en pause, inverser et réinitialiser depuis un seul endroit.", "アニメーションが何段も連なると、CSS だけではすぐに散らかります。Timeline なら、一か所からすべてを一時停止、逆再生、リセットできます。", "애니메이션이 순서대로 많아지면 CSS만으로는 금세 어수선해집니다. Timeline을 쓰면 한곳에서 모두 일시 정지, 되감기, 초기화할 수 있습니다."], "Menyusun animasi masuk halaman dengan timeline berurutan": ["Building page-entry animations with sequenced timelines", "用按顺序排列的 timeline 制作页面入场动画", "Crear animaciones de entrada de página con timelines en secuencia", "بناء حركات دخول الصفحة بـ timeline متسلسلة", "Créer des animations d’entrée de page avec des timelines séquencées", "順番に並べた timeline でページの登場アニメーションを作る", "순서대로 이어지는 timeline으로 페이지 진입 애니메이션 만들기"], "Mengaitkan gerak elemen dengan posisi gulir lewat ScrollTrigger": ["Linking element motion to scroll position with ScrollTrigger", "用 ScrollTrigger 把元素的动作与滚动位置关联起来", "Vincular el movimiento de un elemento a la posición del scroll con ScrollTrigger", "ربط حركة العناصر بموضع التمرير عبر ScrollTrigger", "Relier le mouvement d’un élément à la position du défilement avec ScrollTrigger", "ScrollTrigger で要素の動きをスクロール位置に連動させる", "ScrollTrigger로 요소의 움직임을 스크롤 위치와 연결하기"], "Memilih easing agar gerakan terasa berat, ringan, atau lentur": ["Choosing easing so movement feels heavy, light, or springy", "选择缓动，让动作显得沉重、轻盈或有弹性", "Elegir el easing para que el movimiento se sienta pesado, ligero o elástico", "اختيار easing ليبدو الحركة ثقيلة أو خفيفة أو مرنة", "Choisir l’easing pour que le mouvement paraisse lourd, léger ou élastique", "動きが重く、軽く、またはしなやかに感じられるようイージングを選ぶ", "움직임이 무겁게, 가볍게, 혹은 탄력 있게 느껴지도록 이징 고르기"], "Menganimasikan SVG, misalnya menggambar garis dari awal sampai akhir": ["Animating SVG, such as drawing a line from start to finish", "为 SVG 制作动画，比如把一条线从头画到尾", "Animar SVG, por ejemplo dibujar una línea de principio a fin", "تحريك SVG، كرسم خط من بدايته إلى نهايته", "Animer du SVG, par exemple tracer une ligne du début à la fin", "SVG をアニメーションさせる（例：線を最初から最後まで描く）", "SVG 애니메이션하기. 예를 들어 선을 처음부터 끝까지 그리기"], "Membersihkan animasi saat komponen dilepas supaya memori tidak bocor": ["Cleaning up animations when a component unmounts so memory doesn't leak", "在组件卸载时清理动画，避免内存泄漏", "Limpiar las animaciones al desmontar un componente para que la memoria no se filtre", "تنظيف الحركات عند إزالة المكوّن حتى لا تتسرب الذاكرة", "Nettoyer les animations au démontage d’un composant pour éviter les fuites de mémoire", "メモリが漏れないよう、コンポーネントが外れるときにアニメーションを片付ける", "메모리가 새지 않도록 컴포넌트가 해제될 때 애니메이션 정리하기"], "Pilih easing sebelum durasi. Gerakan yang kaku jarang diselamatkan oleh durasi yang lebih panjang.": ["Choose the easing before the duration. Stiff motion is rarely saved by a longer duration.", "先选缓动，再定时长。僵硬的动作很少能靠拉长时长来挽救。", "Elige el easing antes que la duración. Un movimiento rígido rara vez se salva con una duración más larga.", "اختر الـ easing قبل المدة. نادرًا ما تنقذ المدة الأطول حركة متصلبة.", "Choisissez l’easing avant la durée. Un mouvement raide est rarement sauvé par une durée plus longue.", "所要時間より先にイージングを選びましょう。硬い動きが、時間を長くしたくらいで救われることはほとんどありません。", "지속 시간보다 이징을 먼저 고르세요. 뻣뻣한 움직임은 시간을 늘린다고 살아나는 경우가 드뭅니다."], "Timeline pertama saya cuma tiga kotak yang masuk bergantian. Saya memutarnya ulang belasan kali.": ["My first timeline was just three boxes entering one after another. I replayed it a dozen times.", "我的第一个 timeline 只是三个方块依次进入。我把它重播了十几遍。", "Mi primera timeline fueron solo tres cajas entrando una tras otra. La repetí una docena de veces.", "كانت أول timeline لي مجرد ثلاثة صناديق تدخل واحدًا تلو الآخر. أعدت تشغيلها اثنتي عشرة مرة.", "Ma première timeline, c’étaient juste trois boîtes qui entraient l’une après l’autre. Je l’ai rejouée une douzaine de fois.", "最初の timeline は、3 つの四角が順に入ってくるだけのものでした。十数回も再生し直しました。", "제 첫 timeline은 상자 세 개가 차례로 들어오는 것뿐이었습니다. 열 번 넘게 다시 재생했어요."], "Gerakan yang bagus terasa alami. Yang terlihat justru mengganggu.": ["Good motion feels natural. It's the motion you can see that gets in the way.", "好的动效让人觉得自然。真正显眼的反而是碍事的那种。", "El buen movimiento se siente natural. Lo que se nota es el que estorba.", "الحركة الجيدة تبدو طبيعية. أما التي تُرى بوضوح فهي التي تزعج.", "Un bon mouvement paraît naturel. C’est celui qu’on remarque qui gêne.", "良い動きは自然に感じられます。目立ってしまう動きは、むしろ邪魔です。", "좋은 움직임은 자연스럽게 느껴집니다. 눈에 띄는 것은 오히려 방해되는 것이에요."], "Membuat terlalu banyak animasi sekaligus, sampai halaman sendiri kehilangan fokus.": ["Making too many animations at once, until the page itself lost focus.", "一次做太多动画，结果页面自己失去了重点。", "Hacer demasiadas animaciones a la vez, hasta que la propia página perdió el foco.", "صنع حركات كثيرة جدًا دفعة واحدة، حتى فقدت الصفحة نفسها تركيزها.", "Faire trop d’animations à la fois, jusqu’à ce que la page elle-même perde son focus.", "一度にアニメーションを作りすぎて、ページ自体の焦点がぼやけてしまったこと。", "한꺼번에 애니메이션을 너무 많이 만들어서 페이지 자체가 초점을 잃은 일."], "Untuk animasi ringan": ["For lightweight animation", "适合轻量动画", "Para animación ligera", "للحركات الخفيفة", "Pour les animations légères", "軽いアニメーション向け", "가벼운 애니메이션에"], "Sekuens": ["Sequences", "序列", "Secuencias", "التسلسلات", "Séquences", "シーケンス", "시퀀스"], "Anime.js adalah library animasi ringan untuk CSS, SVG, DOM, dan objek JavaScript. Sintaksnya pendek, ada timeline dan stagger untuk animasi berjenjang, dan ukurannya kecil.": ["Anime.js is a lightweight animation library for CSS, SVG, the DOM, and JavaScript objects. Its syntax is short, it has timelines and stagger for staggered animations, and it's small.", "Anime.js 是一个轻量动画库，适用于 CSS、SVG、DOM 和 JavaScript 对象。语法简短，带有 timeline 和用于错落动画的 stagger，体积也小。", "Anime.js es una biblioteca de animación ligera para CSS, SVG, el DOM y objetos JavaScript. Su sintaxis es corta, tiene timelines y stagger para animaciones escalonadas, y es pequeña.", "Anime.js مكتبة حركة خفيفة لـ CSS وSVG وDOM وكائنات JavaScript. صياغتها قصيرة، وفيها timeline وstagger للحركات المتدرجة، وحجمها صغير.", "Anime.js est une bibliothèque d’animation légère pour CSS, SVG, le DOM et les objets JavaScript. Sa syntaxe est courte, elle propose des timelines et du stagger pour les animations échelonnées, et elle est petite.", "Anime.js は、CSS、SVG、DOM、JavaScript オブジェクト向けの軽量なアニメーションライブラリです。構文が短く、timeline と、時間差アニメーション用の stagger があり、サイズも小さいです。", "Anime.js는 CSS, SVG, DOM, JavaScript 객체를 위한 가벼운 애니메이션 라이브러리입니다. 문법이 짧고, timeline과 시차 애니메이션용 stagger가 있으며, 크기도 작습니다."], "Untuk gerak kecil seperti ikon, garis, dan hover, saya tidak perlu memuat library besar. Ini cukup, ringan, dan cepat ditulis.": ["For small motion like icons, lines, and hover effects, I don't need to load a large library. This is enough, lightweight, and quick to write.", "对于图标、线条和悬停这类小动作，我不需要加载大型库。它够用、轻巧，写起来也快。", "Para movimientos pequeños como iconos, líneas y efectos hover, no necesito cargar una biblioteca grande. Esta basta, es ligera y rápida de escribir.", "للحركات الصغيرة مثل الأيقونات والخطوط وتأثيرات hover لا أحتاج إلى تحميل مكتبة كبيرة. هذه كافية وخفيفة وسريعة الكتابة.", "Pour de petits mouvements comme les icônes, les lignes et le survol, je n’ai pas besoin de charger une grosse bibliothèque. Celle-ci suffit, elle est légère et rapide à écrire.", "アイコン、線、ホバーといった小さな動きには、大きなライブラリを読み込む必要はありません。これで十分で、軽く、書くのも速いです。", "아이콘, 선, 호버 같은 작은 움직임에는 큰 라이브러리를 불러올 필요가 없습니다. 이것으로 충분하고, 가볍고, 쓰기도 빠릅니다."], "Menganimasikan jalur SVG agar tergambar perlahan": ["Animating an SVG path so it draws itself slowly", "为 SVG 路径制作动画，让它缓缓画出来", "Animar un trazo SVG para que se dibuje poco a poco", "تحريك مسار SVG ليُرسم ببطء", "Animer un tracé SVG pour qu’il se dessine lentement", "SVG のパスをアニメーションさせ、ゆっくり描かれるようにする", "SVG 경로를 애니메이션해 천천히 그려지게 하기"], "Memberi jeda berjenjang antar elemen dengan stagger": ["Adding staggered delays between elements with stagger", "用 stagger 在元素之间加入错落的延迟", "Añadir retardos escalonados entre elementos con stagger", "إضافة تأخيرات متدرجة بين العناصر باستخدام stagger", "Ajouter des délais échelonnés entre les éléments avec stagger", "stagger で要素ごとに時間差の遅延を付ける", "stagger로 요소 사이에 시차 지연 주기"], "Membuat angka statistik berhitung naik": ["Making statistic numbers count up", "让统计数字滚动递增", "Hacer que los números de estadísticas cuenten hacia arriba", "جعل أرقام الإحصاءات تعدّ تصاعديًا", "Faire compter les chiffres de statistiques vers le haut", "統計の数字をカウントアップさせる", "통계 숫자가 올라가며 세어지게 하기"], "Menyusun urutan pendek dengan timeline": ["Building short sequences with a timeline", "用 timeline 编排简短的序列", "Armar secuencias cortas con una timeline", "بناء تسلسلات قصيرة بـ timeline", "Construire de courtes séquences avec une timeline", "timeline で短いシーケンスを組む", "timeline으로 짧은 시퀀스 짜기"], "Menambah umpan balik kecil saat tombol ditekan": ["Adding small feedback when a button is pressed", "在按下按钮时加入小小的反馈", "Añadir pequeñas respuestas visuales al pulsar un botón", "إضافة ردود فعل صغيرة عند الضغط على زر", "Ajouter un petit retour visuel quand on appuie sur un bouton", "ボタンを押したときに小さなフィードバックを加える", "버튼을 누를 때 작은 피드백 더하기"], "Pakai stagger untuk daftar. Jeda 40 sampai 80 milidetik antar item sudah cukup untuk memberi kesan mengalir.": ["Use stagger for lists. A delay of 40 to 80 milliseconds between items is enough to give a flowing feel.", "列表用 stagger。每项之间延迟 40 到 80 毫秒，就足以营造出流动的感觉。", "Usa stagger en las listas. Un retraso de 40 a 80 milisegundos entre elementos basta para dar sensación de fluidez.", "استخدم stagger للقوائم. يكفي تأخير من 40 إلى 80 مللي ثانية بين العناصر لإعطاء إحساس بالانسياب.", "Utilisez stagger pour les listes. Un délai de 40 à 80 millisecondes entre les éléments suffit à donner une impression de fluidité.", "リストには stagger を使いましょう。項目間に 40〜80 ミリ秒の遅延を入れれば、流れるような印象になります。", "목록에는 stagger를 쓰세요. 항목 사이에 40~80밀리초 지연이면 흐르는 느낌을 주기에 충분합니다."], "Saya mencari yang lebih ringan dari GSAP untuk efek kecil. Ketemu ini dan langsung cocok.": ["I was looking for something lighter than GSAP for small effects. I found this and it fit right away.", "我想找个比 GSAP 更轻的，用来做小效果。找到它，立刻就合适。", "Buscaba algo más ligero que GSAP para efectos pequeños. Encontré esta y encajó de inmediato.", "كنت أبحث عن شيء أخف من GSAP للتأثيرات الصغيرة. وجدت هذه فناسبتني فورًا.", "Je cherchais quelque chose de plus léger que GSAP pour de petits effets. J’ai trouvé celle-ci et elle m’a tout de suite convenu.", "小さな効果のために GSAP より軽いものを探していました。これを見つけて、すぐにしっくりきました。", "작은 효과에 쓸 GSAP보다 가벼운 것을 찾고 있었어요. 이걸 발견했고 바로 잘 맞았습니다."], "Animasi kecil yang tepat sasaran lebih membekas daripada yang besar tapi berlebihan.": ["A small animation that hits the mark leaves more of an impression than a big one that overdoes it.", "一个恰到好处的小动画，比夸张的大动画更让人印象深刻。", "Una animación pequeña y certera deja más huella que una grande y exagerada.", "حركة صغيرة تصيب الهدف تترك أثرًا أكبر من حركة كبيرة مبالغ فيها.", "Une petite animation bien ciblée marque plus qu’une grande qui en fait trop.", "的を射た小さなアニメーションは、やりすぎた大きなものより印象に残ります。", "딱 맞는 작은 애니메이션이 과한 큰 애니메이션보다 더 기억에 남습니다."], "Menganimasikan properti layout seperti width, padahal transform sudah cukup.": ["Animating layout properties like width, when transform was enough.", "对 width 这样的布局属性做动画，而 transform 就已经足够。", "Animar propiedades de diseño como width, cuando transform bastaba.", "تحريك خصائص التخطيط مثل width بينما كان transform كافيًا.", "Animer des propriétés de mise en page comme width, alors que transform suffisait.", "transform で十分なのに、width のようなレイアウトのプロパティをアニメーションさせたこと。", "transform이면 충분한데 width 같은 레이아웃 속성을 애니메이션한 일."], "Laravel adalah framework PHP untuk aplikasi web sisi server. Ia menyediakan routing, controller, Eloquent ORM untuk bicara dengan database, migration untuk versi skema, Blade untuk template, serta autentikasi dan validasi yang sudah jadi.": ["Laravel is a PHP framework for server-side web apps. It provides routing, controllers, Eloquent ORM for talking to the database, migrations for schema versions, Blade for templates, plus ready-made authentication and validation.", "Laravel 是用于服务端网页应用的 PHP 框架。它提供路由、controller、用于和数据库交互的 Eloquent ORM、管理数据结构版本的 migration、用于模板的 Blade，以及现成的认证与验证。", "Laravel es un framework PHP para aplicaciones web del lado del servidor. Ofrece rutas, controladores, Eloquent ORM para hablar con la base de datos, migraciones para versionar el esquema, Blade para plantillas, además de autenticación y validación ya listas.", "Laravel إطار عمل PHP لتطبيقات الويب من جهة الخادم. يوفّر التوجيه وcontroller وEloquent ORM للتعامل مع قاعدة البيانات وmigration لإصدارات المخطط وBlade للقوالب، إضافة إلى المصادقة والتحقق الجاهزين.", "Laravel est un framework PHP pour les applications web côté serveur. Il fournit le routage, les controllers, Eloquent ORM pour dialoguer avec la base de données, les migrations pour versionner le schéma, Blade pour les templates, ainsi que l’authentification et la validation prêtes à l’emploi.", "Laravel は、サーバーサイドの Web アプリ向けの PHP フレームワークです。ルーティング、controller、データベースとやり取りする Eloquent ORM、スキーマのバージョンを管理する migration、テンプレート用の Blade、そして認証とバリデーションが最初から用意されています。", "Laravel은 서버 측 웹 앱을 위한 PHP 프레임워크입니다. 라우팅, controller, 데이터베이스와 소통하는 Eloquent ORM, 스키마 버전을 관리하는 migration, 템플릿용 Blade, 그리고 이미 갖춰진 인증과 유효성 검사를 제공합니다."], "Strukturnya jelas dan dokumentasinya baik, jadi saya bisa melihat apa yang terjadi di balik tampilan: dari permintaan browser sampai data keluar dari database.": ["The structure is clear and the documentation is good, so I can see what happens behind the interface: from the browser's request to data coming out of the database.", "结构清晰、文档完善，所以我能看清界面背后发生的事：从浏览器发出请求，到数据从数据库中取出。", "La estructura es clara y la documentación es buena, así que puedo ver lo que ocurre detrás de la interfaz: desde la petición del navegador hasta los datos que salen de la base de datos.", "البنية واضحة والتوثيق جيد، فأستطيع أن أرى ما يحدث خلف الواجهة: من طلب المتصفح إلى خروج البيانات من قاعدة البيانات.", "La structure est claire et la documentation bonne, donc je peux voir ce qui se passe derrière l’interface : de la requête du navigateur jusqu’aux données qui sortent de la base.", "構造が明快でドキュメントも充実しているので、ブラウザのリクエストからデータベースのデータが出てくるまで、画面の裏側で何が起きているかを見渡せます。", "구조가 명확하고 문서가 좋아서 화면 뒤에서 무슨 일이 일어나는지, 브라우저의 요청부터 데이터베이스에서 데이터가 나오기까지 볼 수 있습니다."], "Membuat route dan controller untuk halaman dan aksi dasar": ["Creating routes and controllers for basic pages and actions", "为基础页面和操作创建 route 与 controller", "Crear rutas y controladores para páginas y acciones básicas", "إنشاء route وcontroller للصفحات والإجراءات الأساسية", "Créer des routes et des controllers pour des pages et actions de base", "基本的なページと操作のための route と controller を作る", "기본 페이지와 동작을 위한 route와 controller 만들기"], "Mendefinisikan tabel lewat migration dan mengelolanya dengan Eloquent": ["Defining tables through migrations and managing them with Eloquent", "通过 migration 定义数据表，并用 Eloquent 管理", "Definir tablas mediante migraciones y gestionarlas con Eloquent", "تعريف الجداول عبر migration وإدارتها بـ Eloquent", "Définir des tables via des migrations et les gérer avec Eloquent", "migration でテーブルを定義し、Eloquent で管理する", "migration으로 테이블을 정의하고 Eloquent로 관리하기"], "Menyusun tampilan dengan Blade dan layout bersama": ["Building views with Blade and shared layouts", "用 Blade 和共用布局构建视图", "Armar vistas con Blade y diseños compartidos", "بناء العروض بـ Blade وتخطيطات مشتركة", "Construire des vues avec Blade et des mises en page partagées", "Blade と共通レイアウトで画面を組み立てる", "Blade와 공통 레이아웃으로 화면 구성하기"], "Memvalidasi input formulir di sisi server": ["Validating form input on the server side", "在服务端验证表单输入", "Validar la entrada de formularios en el servidor", "التحقق من مدخلات النماذج على جهة الخادم", "Valider les entrées de formulaire côté serveur", "サーバー側でフォーム入力を検証する", "서버 측에서 양식 입력 검증하기"], "Memahami alur request, middleware, dan response secara utuh": ["Understanding the whole flow of request, middleware, and response", "完整理解请求、middleware 和响应的整个流程", "Entender el flujo completo de petición, middleware y respuesta", "فهم دورة الطلب وmiddleware والاستجابة فهمًا كاملًا", "Comprendre tout le cycle requête, middleware et réponse", "リクエスト、middleware、レスポンスの流れ全体を理解する", "요청, middleware, 응답의 전체 흐름 이해하기"], "Bangun satu proyek kecil sampai selesai, misalnya daftar tugas dengan login. Itu menunjukkan seluruh alurnya.": ["Build one small project all the way through, like a to-do list with login. It shows you the entire flow.", "把一个小项目从头做到尾，比如带登录的待办清单。它能让你看清整个流程。", "Construye un proyecto pequeño de principio a fin, como una lista de tareas con inicio de sesión. Te muestra todo el flujo.", "ابنِ مشروعًا صغيرًا واحدًا حتى النهاية، مثل قائمة مهام مع تسجيل دخول. فهو يُظهر لك الدورة كاملة.", "Construisez un petit projet jusqu’au bout, comme une liste de tâches avec connexion. Il montre tout le déroulement.", "ログイン付きの ToDo リストなど、小さなプロジェクトを 1 つ最後まで作ってみましょう。全体の流れが見えてきます。", "로그인이 있는 할 일 목록처럼 작은 프로젝트 하나를 끝까지 만들어 보세요. 전체 흐름이 보입니다."], "Saat pertama melihat sisi server, saya sadar tampilan cuma separuh cerita.": ["The first time I looked at the server side, I realized the interface is only half the story.", "第一次看到服务端时，我意识到界面只是故事的一半。", "La primera vez que miré el lado del servidor, me di cuenta de que la interfaz es solo la mitad de la historia.", "حين نظرت إلى جهة الخادم أول مرة، أدركت أن الواجهة ليست سوى نصف القصة.", "La première fois que j’ai regardé le côté serveur, j’ai compris que l’interface n’était que la moitié de l’histoire.", "初めてサーバー側を見たとき、見た目は物語の半分でしかないと気づきました。", "서버 쪽을 처음 봤을 때, 화면은 이야기의 절반일 뿐이라는 걸 깨달았습니다."], "Back-end mengajarkan sabar: satu titik koma bisa menahan seluruh aplikasi.": ["Back-end teaches patience: one missing semicolon can hold up an entire app.", "后端教会人耐心：一个分号就可能卡住整个应用。", "El back-end enseña paciencia: un punto y coma puede detener toda una aplicación.", "الـ back-end يعلّم الصبر: فاصلة منقوطة واحدة قد تعطّل تطبيقًا كاملًا.", "Le back-end apprend la patience : un point-virgule peut bloquer toute une application.", "バックエンドは忍耐を教えてくれます。セミコロン 1 つがアプリ全体を止めることもあります。", "백엔드는 인내심을 가르쳐 줍니다. 세미콜론 하나가 앱 전체를 멈출 수 있어요."], "Mengubah migration yang sudah dijalankan, bukan membuat migration baru.": ["Editing a migration that had already been run, instead of creating a new migration.", "去修改已经执行过的 migration，而不是新建一个 migration。", "Editar una migración que ya se había ejecutado, en lugar de crear una nueva.", "تعديل migration سبق تشغيلها بدل إنشاء migration جديدة.", "Modifier une migration déjà exécutée, au lieu d’en créer une nouvelle.", "新しい migration を作らず、すでに実行した migration を書き換えてしまったこと。", "새 migration을 만들지 않고 이미 실행한 migration을 고친 일."], "Masih terus dipelajari": ["Still learning", "仍在学习中", "Sigo aprendiendo", "ما زلت أتعلمه", "Toujours en apprentissage", "いまも学習中", "계속 배우는 중"], "React membangun antarmuka dari komponen: potongan kecil yang menerima props, menyimpan state, dan menggambar dirinya sendiri. Hooks seperti useState dan useEffect mengelola data dan efek samping, dan React hanya memperbarui bagian layar yang memang berubah.": ["React builds interfaces from components: small pieces that receive props, hold state, and render themselves. Hooks like useState and useEffect manage data and side effects, and React only updates the parts of the screen that actually changed.", "React 用组件来构建界面：小块的单元，接收 props、保存 state，并渲染自己。useState 和 useEffect 这样的 Hooks 管理数据和副作用，React 只更新屏幕上真正发生变化的部分。", "React construye interfaces a partir de componentes: piezas pequeñas que reciben props, guardan estado y se dibujan a sí mismas. Los Hooks como useState y useEffect gestionan datos y efectos secundarios, y React solo actualiza las partes de la pantalla que realmente cambiaron.", "يبني React الواجهات من مكوّنات: قطع صغيرة تستقبل props وتحتفظ بالحالة وترسم نفسها. تدير Hooks مثل useState وuseEffect البيانات والآثار الجانبية، ولا يحدّث React إلا الأجزاء التي تغيّرت فعلًا على الشاشة.", "React construit les interfaces à partir de composants : de petites pièces qui reçoivent des props, gardent un état et se dessinent elles-mêmes. Les Hooks comme useState et useEffect gèrent les données et les effets de bord, et React ne met à jour que les parties de l’écran qui ont vraiment changé.", "React はコンポーネントからインターフェースを作ります。props を受け取り、state を持ち、自分自身を描画する小さな部品です。useState や useEffect といった Hooks がデータと副作用を管理し、React は画面で実際に変わった部分だけを更新します。", "React는 컴포넌트로 인터페이스를 만듭니다. props를 받고, state를 보관하고, 스스로를 그리는 작은 조각들입니다. useState, useEffect 같은 Hooks가 데이터와 부수 효과를 관리하고, React는 화면에서 실제로 바뀐 부분만 업데이트합니다."], "Tampilan yang rumit jadi bisa dirawat. Ubah satu komponen, dan semua tempat yang memakainya ikut berubah tanpa menyisir satu per satu.": ["Complex interfaces become maintainable. Change one component, and every place that uses it changes too, without hunting them down one by one.", "复杂的界面变得可维护。改动一个组件，所有用到它的地方都会随之改变，不必逐个去找。", "Las interfaces complejas se vuelven mantenibles. Cambias un componente y todos los lugares que lo usan cambian también, sin buscarlos uno por uno.", "تصبح الواجهات المعقدة قابلة للصيانة. تغيّر مكوّنًا واحدًا فيتغير كل موضع يستخدمه دون البحث عنها واحدًا واحدًا.", "Les interfaces complexes deviennent maintenables. On change un composant et tous les endroits qui l’utilisent changent aussi, sans les chercher un par un.", "複雑な画面でも保守しやすくなります。1 つのコンポーネントを変えれば、それを使うすべての場所が変わり、1 つずつ探して回る必要がありません。", "복잡한 화면도 유지보수가 가능해집니다. 컴포넌트 하나를 바꾸면 그것을 쓰는 모든 곳이 함께 바뀌어, 하나씩 찾아다닐 필요가 없습니다."], "Membuat komponen yang bisa dipakai ulang dengan props": ["Creating reusable components with props", "用 props 创建可复用的组件", "Crear componentes reutilizables con props", "إنشاء مكوّنات قابلة لإعادة الاستخدام بـ props", "Créer des composants réutilisables avec des props", "props で再利用できるコンポーネントを作る", "props로 재사용 가능한 컴포넌트 만들기"], "Mengelola data tampilan dengan useState dan useReducer": ["Managing view data with useState and useReducer", "用 useState 和 useReducer 管理视图数据", "Gestionar los datos de la vista con useState y useReducer", "إدارة بيانات العرض بـ useState وuseReducer", "Gérer les données d’affichage avec useState et useReducer", "useState と useReducer で画面のデータを管理する", "useState와 useReducer로 화면 데이터 관리하기"], "Mengambil data dan menjalankan efek samping lewat useEffect": ["Fetching data and running side effects with useEffect", "用 useEffect 获取数据并执行副作用", "Obtener datos y ejecutar efectos secundarios con useEffect", "جلب البيانات وتنفيذ الآثار الجانبية بـ useEffect", "Récupérer des données et lancer des effets de bord avec useEffect", "useEffect でデータを取得し、副作用を実行する", "useEffect로 데이터를 가져오고 부수 효과 실행하기"], "Memecah halaman besar jadi komponen kecil yang jelas tanggung jawabnya": ["Breaking a big page into small components with clear responsibilities", "把大页面拆成职责清晰的小组件", "Dividir una página grande en componentes pequeños con responsabilidades claras", "تقسيم صفحة كبيرة إلى مكوّنات صغيرة واضحة المسؤولية", "Découper une grande page en petits composants aux responsabilités claires", "大きなページを、責任の明確な小さなコンポーネントに分割する", "큰 페이지를 책임이 분명한 작은 컴포넌트로 나누기"], "Membuat daftar, formulir, dan tampilan bersyarat yang responsif": ["Building responsive lists, forms, and conditional views", "构建响应式的列表、表单和条件视图", "Crear listas, formularios y vistas condicionales adaptables", "بناء قوائم ونماذج وعروض شرطية متجاوبة", "Construire des listes, formulaires et affichages conditionnels adaptatifs", "レスポンシブなリスト、フォーム、条件付き表示を作る", "반응형 목록, 양식, 조건부 화면 만들기"], "Taruh state sesedikit dan sedekat mungkin dengan yang memakainya. Naikkan hanya kalau memang perlu dibagi.": ["Keep state as little and as close to where it's used as possible. Lift it up only when it really needs to be shared.", "state 尽量放得少，也尽量靠近使用它的地方。只有确实需要共享时才提升上去。", "Mantén el estado lo más pequeño y cercano posible a donde se usa. Súbelo solo cuando de verdad haya que compartirlo.", "اجعل الحالة أقل ما يمكن وأقرب ما يمكن إلى من يستخدمها. ارفعها فقط عندما تحتاج فعلًا إلى المشاركة.", "Gardez l’état aussi réduit et aussi proche que possible de ce qui l’utilise. Ne le remontez que s’il doit vraiment être partagé.", "state はできるだけ少なく、使う場所のできるだけ近くに置きましょう。本当に共有が必要なときだけ上に持ち上げます。", "state는 되도록 적게, 그것을 쓰는 곳 가까이에 두세요. 정말 공유해야 할 때만 위로 올리세요."], "Saya bingung kenapa semuanya harus komponen. Sekarang sulit membayangkan cara lain.": ["I was confused about why everything had to be a component. Now it's hard to imagine another way.", "我曾疑惑为什么一切都要是组件。现在已经很难想象别的做法了。", "No entendía por qué todo tenía que ser un componente. Ahora me cuesta imaginar otra forma.", "كنت محتارًا لماذا يجب أن يكون كل شيء مكوّنًا. الآن يصعب عليّ تخيّل طريقة أخرى.", "Je ne comprenais pas pourquoi tout devait être un composant. Maintenant, j’ai du mal à imaginer autre chose.", "なぜ何でもコンポーネントにしなければならないのか分かりませんでした。今では他のやり方が想像しにくいです。", "왜 모든 게 컴포넌트여야 하는지 헷갈렸습니다. 이제는 다른 방식이 상상이 잘 안 됩니다."], "Pecah kecil dulu, gabungkan belakangan.": ["Break things up small first, combine later.", "先拆小，再合并。", "Divide en pequeño primero, combina después.", "قسّم إلى قطع صغيرة أولًا، ثم اجمع لاحقًا.", "Découpez petit d’abord, combinez ensuite.", "まず小さく分け、あとでまとめましょう。", "먼저 작게 쪼개고, 나중에 합치세요."], "Menaruh semua state di komponen paling atas, sampai seluruh halaman dirender ulang tiap ketikan.": ["Putting all the state in the top-level component, until the whole page re-rendered on every keystroke.", "把所有 state 放在最顶层组件，结果每敲一个键整个页面都重新渲染。", "Poner todo el estado en el componente superior, hasta que toda la página se volvía a renderizar con cada tecla.", "وضع كل الحالة في المكوّن الأعلى، حتى أُعيد رسم الصفحة كلها مع كل ضغطة مفتاح.", "Mettre tout l’état dans le composant du haut, jusqu’à ce que toute la page se re-rende à chaque frappe.", "すべての state を最上位のコンポーネントに置き、キーを打つたびにページ全体が再描画されてしまったこと。", "모든 state를 최상위 컴포넌트에 두었다가 키를 칠 때마다 페이지 전체가 다시 그려진 일."], "VS Code adalah editor kode utama saya. Ada terminal terpadu, debugger, kontrol Git, pencarian ke seluruh proyek, dan ribuan extension untuk format, linting, serta autocomplete.": ["VS Code is my main code editor. It has an integrated terminal, debugger, Git controls, project-wide search, and thousands of extensions for formatting, linting, and autocomplete.", "VS Code 是我主要的代码编辑器。它内置终端、调试器、Git 控制、全项目搜索，还有数以千计用于格式化、代码检查和自动补全的扩展。", "VS Code es mi editor de código principal. Tiene terminal integrada, depurador, control de Git, búsqueda en todo el proyecto y miles de extensiones para formato, linting y autocompletado.", "VS Code هو محرر الشيفرة الرئيسي عندي. فيه طرفية مدمجة ومصحّح أخطاء وأدوات Git وبحث في المشروع كله وآلاف الإضافات للتنسيق والفحص والإكمال التلقائي.", "VS Code est mon éditeur de code principal. Il a un terminal intégré, un débogueur, des commandes Git, la recherche dans tout le projet et des milliers d’extensions pour le formatage, le linting et l’autocomplétion.", "VS Code は私のメインのコードエディタです。統合ターミナル、デバッガー、Git 操作、プロジェクト全体の検索、フォーマットや lint、オートコンプリート用の数千もの拡張機能があります。", "VS Code는 제 주력 코드 편집기입니다. 통합 터미널, 디버거, Git 제어, 프로젝트 전체 검색, 포맷·린트·자동 완성용 수천 개의 확장 프로그램이 있습니다."], "Cepat dibuka, ringan, dan bisa dibentuk sesuai kebiasaan. Satu jendela cukup untuk menulis, menjalankan, menguji, dan mengirim perubahan.": ["Quick to open, lightweight, and shapeable to my habits. One window is enough to write, run, test, and push changes.", "打开很快、体积轻巧，还能按我的习惯调整。一个窗口就足够编写、运行、测试和提交更改。", "Se abre rápido, es ligero y se adapta a mis hábitos. Una sola ventana basta para escribir, ejecutar, probar y enviar cambios.", "يفتح بسرعة وخفيف ويمكن تشكيله وفق عاداتي. تكفي نافذة واحدة للكتابة والتشغيل والاختبار وإرسال التغييرات.", "Rapide à ouvrir, léger et adaptable à mes habitudes. Une seule fenêtre suffit pour écrire, exécuter, tester et envoyer les changements.", "起動が速く、軽く、自分の習慣に合わせて形を整えられます。1 つのウィンドウで、書く、実行する、テストする、変更を送るまでがそろいます。", "빨리 열리고, 가볍고, 제 습관에 맞게 다듬을 수 있습니다. 창 하나로 쓰기, 실행, 테스트, 변경 사항 전송까지 충분합니다."], "Menulis HTML, CSS, dan JavaScript sepanjang hari": ["Writing HTML, CSS, and JavaScript all day long", "整天编写 HTML、CSS 和 JavaScript", "Escribir HTML, CSS y JavaScript durante todo el día", "كتابة HTML وCSS وJavaScript طوال اليوم", "Écrire du HTML, du CSS et du JavaScript toute la journée", "一日中 HTML、CSS、JavaScript を書く", "하루 종일 HTML, CSS, JavaScript 작성하기"], "Memakai multi-cursor dan pencarian global untuk mengubah banyak tempat sekaligus": ["Using multi-cursor and global search to change many places at once", "用多光标和全局搜索一次修改多处", "Usar multicursor y búsqueda global para cambiar muchos lugares a la vez", "استخدام المؤشرات المتعددة والبحث العام لتغيير أماكن كثيرة دفعة واحدة", "Utiliser le multi-curseur et la recherche globale pour modifier plusieurs endroits à la fois", "マルチカーソルと全体検索で、多くの箇所を一度に変更する", "멀티 커서와 전체 검색으로 여러 곳을 한꺼번에 바꾸기"], "Merapikan kode otomatis saat disimpan dengan Prettier": ["Auto-formatting code on save with Prettier", "保存时用 Prettier 自动整理代码", "Dar formato automático al guardar con Prettier", "تنسيق الشيفرة تلقائيًا عند الحفظ بـ Prettier", "Formater automatiquement le code à l’enregistrement avec Prettier", "保存時に Prettier でコードを自動整形する", "저장할 때 Prettier로 코드 자동 정리하기"], "Mencari error lewat debugger dan terminal bawaan": ["Tracking down errors with the built-in debugger and terminal", "用内置调试器和终端查找错误", "Rastrear errores con el depurador y la terminal integrados", "تتبّع الأخطاء بالمصحّح والطرفية المدمجين", "Traquer les erreurs avec le débogueur et le terminal intégrés", "内蔵のデバッガーとターミナルでエラーを探す", "내장 디버거와 터미널로 오류 찾기"], "Melihat perubahan dan commit langsung dari panel Git": ["Viewing changes and commits straight from the Git panel", "直接在 Git 面板里查看更改和提交", "Ver cambios y commits directamente desde el panel de Git", "عرض التغييرات وcommit مباشرة من لوحة Git", "Voir les changements et les commits directement depuis le panneau Git", "Git パネルから変更とコミットを直接確認する", "Git 패널에서 바로 변경 사항과 커밋 확인하기"], "Hafalkan lima shortcut: palet perintah, pindah file cepat, multi-cursor, cari global, dan pindah baris. Hematnya terasa dalam seminggu.": ["Memorize five shortcuts: command palette, quick file switch, multi-cursor, global search, and move line. The savings show within a week.", "记住五个快捷键：命令面板、快速切换文件、多光标、全局搜索和移动行。一周内就能感受到省下的时间。", "Memoriza cinco atajos: paleta de comandos, cambio rápido de archivo, multicursor, búsqueda global y mover línea. El ahorro se nota en una semana.", "احفظ خمسة اختصارات: لوحة الأوامر، والتبديل السريع بين الملفات، والمؤشرات المتعددة، والبحث العام، ونقل السطر. يظهر التوفير خلال أسبوع.", "Mémorisez cinq raccourcis : palette de commandes, changement rapide de fichier, multi-curseur, recherche globale et déplacement de ligne. Le gain se voit en une semaine.", "5 つのショートカットを覚えましょう。コマンドパレット、ファイルの素早い切り替え、マルチカーソル、全体検索、行の移動です。1 週間で効果を実感できます。", "단축키 다섯 개를 외우세요. 명령 팔레트, 빠른 파일 이동, 멀티 커서, 전체 검색, 줄 이동입니다. 일주일이면 시간이 절약되는 게 느껴집니다."], "Dulu saya menulis di editor apa saja. Sejak pindah ke sini, tidak pernah kembali.": ["I used to write in whatever editor was around. Since moving here, I've never gone back.", "以前我随便用什么编辑器写代码。自从换到这里，就再也没回去过。", "Antes escribía en cualquier editor. Desde que me mudé aquí, nunca volví.", "كنت أكتب في أي محرر متاح. ومنذ انتقلت إلى هنا لم أعد أبدًا.", "J’écrivais dans n’importe quel éditeur. Depuis que je suis passé ici, je n’y suis jamais retourné.", "以前は手近なエディタで書いていました。こちらに移ってからは、一度も戻っていません。", "예전에는 손에 잡히는 아무 편집기에서나 썼어요. 여기로 옮긴 뒤로는 한 번도 돌아가지 않았습니다."], "Shortcut kecil yang dipakai tiap hari menghemat jam-jam yang besar.": ["Small shortcuts used every day save big chunks of hours.", "每天都用的小快捷键，能省下大把时间。", "Los atajos pequeños que usas cada día ahorran muchas horas.", "اختصارات صغيرة تُستخدم كل يوم توفّر ساعات كثيرة.", "Les petits raccourcis utilisés chaque jour font gagner de longues heures.", "毎日使う小さなショートカットが、大きな時間を節約してくれます。", "매일 쓰는 작은 단축키가 큰 시간을 아껴 줍니다."], "Memasang terlalu banyak extension sampai editor terasa berat. Sekarang saya pasang yang benar-benar dipakai.": ["Installing too many extensions until the editor felt heavy. Now I only install what I actually use.", "装了太多扩展，结果编辑器变得很卡。现在我只装真正会用的。", "Instalar demasiadas extensiones hasta que el editor se sentía pesado. Ahora solo instalo las que realmente uso.", "تثبيت إضافات كثيرة جدًا حتى صار المحرر ثقيلًا. الآن أثبّت فقط ما أستخدمه فعلًا.", "Installer trop d’extensions jusqu’à ce que l’éditeur devienne lourd. Maintenant, je n’installe que ce que j’utilise vraiment.", "拡張機能を入れすぎて、エディタが重くなったこと。今は本当に使うものだけを入れています。", "확장 프로그램을 너무 많이 설치해서 편집기가 무겁게 느껴진 일. 지금은 정말 쓰는 것만 설치합니다."], "Setiap ada perubahan": ["Whenever something changes", "每当有改动时", "Cada vez que hay un cambio", "كلما حدث تغيير", "À chaque changement", "変更があるたび", "변경이 있을 때마다"], "Kolaborasi": ["Collaboration", "协作", "Colaboración", "التعاون", "Collaboration", "コラボレーション", "협업"], "GitHub menyimpan repositori Git di cloud. Setiap commit tercatat dengan pesan dan pembuatnya, branch memisahkan eksperimen dari versi utama, dan pull request memberi tempat meninjau sebelum digabung. GitHub Pages juga bisa menerbitkan situs statis langsung dari repositori.": ["GitHub stores Git repositories in the cloud. Every commit is recorded with a message and an author, branches separate experiments from the main version, and pull requests give a place to review before merging. GitHub Pages can also publish a static site straight from a repository.", "GitHub 把 Git 仓库存放在云端。每次 commit 都会记录说明和作者，branch 把实验与主版本分开，pull request 则提供合并前的审查场所。GitHub Pages 还能直接从仓库发布静态网站。", "GitHub guarda repositorios de Git en la nube. Cada commit queda registrado con un mensaje y un autor, las ramas separan los experimentos de la versión principal y los pull requests ofrecen un lugar para revisar antes de fusionar. GitHub Pages también puede publicar un sitio estático directamente desde un repositorio.", "يخزّن GitHub مستودعات Git في السحابة. يُسجَّل كل commit برسالة وصاحبه، وتفصل branch التجارب عن النسخة الرئيسية، وتوفر pull request مكانًا للمراجعة قبل الدمج. ويمكن لـ GitHub Pages نشر موقع ثابت مباشرة من المستودع.", "GitHub héberge les dépôts Git dans le cloud. Chaque commit est enregistré avec un message et un auteur, les branches séparent les expériences de la version principale, et les pull requests offrent un endroit où relire avant de fusionner. GitHub Pages peut aussi publier un site statique directement depuis un dépôt.", "GitHub は Git のリポジトリをクラウドに保存します。コミットごとにメッセージと作成者が記録され、branch は実験をメインのバージョンから切り離し、pull request はマージ前にレビューする場になります。GitHub Pages なら、リポジトリから静的サイトを直接公開することもできます。", "GitHub는 Git 저장소를 클라우드에 보관합니다. 커밋마다 메시지와 작성자가 기록되고, branch는 실험을 주 버전과 분리하며, pull request는 병합 전에 검토하는 자리를 제공합니다. GitHub Pages로 저장소에서 바로 정적 사이트를 게시할 수도 있습니다."], "Riwayat yang lengkap membuat saya berani bereksperimen, karena versi lama selalu bisa dikembalikan. Ia juga jadi etalase proyek saya.": ["A complete history makes me brave enough to experiment, because the old version can always be restored. It also serves as a showcase for my projects.", "完整的历史让我敢于尝试，因为旧版本随时都能恢复。它也成了我项目的展示橱窗。", "Un historial completo me da valor para experimentar, porque la versión anterior siempre se puede recuperar. También sirve como escaparate de mis proyectos.", "السجل الكامل يجعلني أجرؤ على التجريب، لأن النسخة القديمة يمكن استعادتها دائمًا. وهو أيضًا واجهة عرض لمشاريعي.", "Un historique complet me donne le courage d’expérimenter, car l’ancienne version peut toujours être restaurée. Il sert aussi de vitrine à mes projets.", "完全な履歴があるので、古いバージョンにいつでも戻せるという安心感から、思い切って試せます。自分のプロジェクトのショーケースにもなっています。", "완전한 기록 덕분에 옛 버전을 언제든 되돌릴 수 있어서 과감히 실험할 수 있습니다. 제 프로젝트의 쇼케이스 역할도 합니다."], "Menyimpan riwayat perubahan lewat commit dengan pesan jelas": ["Saving change history through commits with clear messages", "通过说明清楚的 commit 保存更改历史", "Guardar el historial de cambios con commits de mensajes claros", "حفظ سجل التغييرات عبر commit برسائل واضحة", "Conserver l’historique des changements via des commits aux messages clairs", "分かりやすいメッセージ付きのコミットで変更履歴を残す", "명확한 메시지의 커밋으로 변경 기록 남기기"], "Membuat branch untuk mencoba fitur tanpa merusak versi utama": ["Creating branches to try features without breaking the main version", "创建 branch 试验新功能，不破坏主版本", "Crear ramas para probar funciones sin romper la versión principal", "إنشاء branch لتجربة الميزات دون كسر النسخة الرئيسية", "Créer des branches pour tester des fonctions sans casser la version principale", "メインのバージョンを壊さずに機能を試すため、branch を作る", "주 버전을 망가뜨리지 않고 기능을 시험해 보려고 branch 만들기"], "Menerbitkan demo lewat GitHub Pages": ["Publishing demos through GitHub Pages", "通过 GitHub Pages 发布演示", "Publicar demos con GitHub Pages", "نشر العروض التجريبية عبر GitHub Pages", "Publier des démos via GitHub Pages", "GitHub Pages でデモを公開する", "GitHub Pages로 데모 게시하기"], "Memamerkan proyek di profil @trynvexa": ["Showing off projects on the @trynvexa profile", "在 @trynvexa 的主页上展示项目", "Mostrar proyectos en el perfil @trynvexa", "عرض المشاريع على الملف الشخصي @trynvexa", "Présenter les projets sur le profil @trynvexa", "@trynvexa のプロフィールでプロジェクトを紹介する", "@trynvexa 프로필에서 프로젝트 소개하기"], "Mencadangkan seluruh proyek di luar laptop": ["Backing up all projects outside my laptop", "把所有项目备份到笔记本电脑之外", "Respaldar todos los proyectos fuera de mi portátil", "نسخ المشاريع كلها احتياطيًا خارج حاسوبي المحمول", "Sauvegarder tous les projets en dehors de mon ordinateur portable", "すべてのプロジェクトをノート PC の外にバックアップする", "모든 프로젝트를 노트북 밖에 백업하기"], "Commit kecil dan sering, dengan pesan yang menjawab apa yang berubah dan kenapa. Dirimu enam bulan lagi akan berterima kasih.": ["Commit small and often, with messages that say what changed and why. Six months from now, you will thank yourself.", "commit 要小而勤，说明要写清改了什么、为什么改。半年后的你会感谢现在的自己。", "Haz commits pequeños y frecuentes, con mensajes que digan qué cambió y por qué. Dentro de seis meses te lo agradecerás.", "اجعل الـ commit صغيرًا ومتكررًا، برسالة تبيّن ما الذي تغيّر ولماذا. بعد ستة أشهر ستشكر نفسك.", "Faites des commits petits et fréquents, avec des messages qui disent ce qui a changé et pourquoi. Dans six mois, vous vous en remercierez.", "コミットは小さく、こまめに。何が変わったか、なぜ変えたかを書いたメッセージを付けましょう。半年後の自分が感謝します。", "커밋은 작게, 자주 하고, 무엇이 왜 바뀌었는지 답하는 메시지를 쓰세요. 반년 뒤의 내가 고마워할 겁니다."], "Saya gugup menekan push pertama kali. Ternyata tidak ada yang rusak.": ["I was nervous the first time I pressed push. Nothing broke after all.", "第一次按下 push 时我很紧张，结果什么也没坏。", "Estaba nervioso la primera vez que hice push. Al final no se rompió nada.", "كنت متوترًا حين ضغطت push أول مرة. ولم ينكسر شيء في النهاية.", "J’étais nerveux la première fois que j’ai fait un push. Finalement, rien n’a cassé.", "初めて push を押すときは緊張しました。結局、何も壊れませんでした。", "처음 push를 누를 때 긴장했습니다. 결국 아무것도 망가지지 않았어요."], "Berani bereksperimen karena apa pun bisa dikembalikan.": ["Dare to experiment because anything can be restored.", "敢于尝试，因为一切都能恢复。", "Atrévete a experimentar porque todo se puede recuperar.", "تجرأ على التجريب لأن كل شيء يمكن استعادته.", "Osez expérimenter, car tout peut être restauré.", "何でも元に戻せるから、思い切って試せる。", "무엇이든 되돌릴 수 있으니 과감히 실험해 보세요."], "Satu commit berpesan update berisi sepuluh perubahan, lalu tidak bisa melacak mana yang merusak.": ["One commit with the message \"update\" holding ten changes, then not being able to trace which one broke things.", "一个说明写着“update”的 commit 里装了十处改动，之后就没法追查是哪一处弄坏的。", "Un commit con el mensaje «update» que contenía diez cambios, y luego no poder rastrear cuál lo rompió.", "commit واحد برسالة «update» يحمل عشرة تغييرات، ثم العجز عن تتبّع أيها كسر الشيفرة.", "Un commit au message « update » contenant dix changements, puis l’impossibilité de retrouver lequel a tout cassé.", "メッセージが「update」だけのコミットに 10 件の変更が入っていて、どれが壊したのかたどれなくなったこと。", "메시지가 “update”인 커밋 하나에 변경이 열 개나 들어 있어서 무엇이 문제를 일으켰는지 추적하지 못한 일."], "Hampir setiap sesi kerja": ["Almost every work session", "几乎每次工作都会用到", "Casi en cada sesión de trabajo", "في كل جلسة عمل تقريبًا", "Presque à chaque séance de travail", "ほぼ毎回の作業で", "거의 모든 작업 시간에"], "Debugging": ["Debugging", "调试", "Depuración", "تصحيح الأخطاء", "Débogage", "デバッグ", "디버깅"], "Claude adalah asisten AI dari Anthropic. Ia menulis dan membaca kode, menjelaskan konsep dari nol, meninjau struktur, dan membantu menyusun tulisan, dengan jawaban yang runtut dan mampu mengikuti percakapan panjang.": ["Claude is an AI assistant from Anthropic. It writes and reads code, explains concepts from scratch, reviews structure, and helps draft writing, with coherent answers and the ability to follow long conversations.", "Claude 是 Anthropic 推出的 AI 助手。它能编写和阅读代码、从零讲解概念、审查结构，并协助撰写文字，回答条理清晰，还能跟上很长的对话。", "Claude es un asistente de IA de Anthropic. Escribe y lee código, explica conceptos desde cero, revisa estructuras y ayuda a redactar textos, con respuestas coherentes y capaz de seguir conversaciones largas.", "Claude مساعد ذكاء اصطناعي من Anthropic. يكتب الشيفرة ويقرؤها، ويشرح المفاهيم من الصفر، ويراجع البنية، ويساعد في صياغة النصوص، بإجابات مترابطة وقدرة على متابعة المحادثات الطويلة.", "Claude est un assistant IA d’Anthropic. Il écrit et lit du code, explique des notions depuis zéro, relit la structure et aide à rédiger, avec des réponses cohérentes et la capacité de suivre de longues conversations.", "Claude は Anthropic が開発した AI アシスタントです。コードを書き、読み、概念をゼロから説明し、構造をレビューし、文章づくりも手伝ってくれます。回答は筋が通っていて、長い会話にもついてきます。", "Claude는 Anthropic의 AI 어시스턴트입니다. 코드를 쓰고 읽고, 개념을 처음부터 설명하고, 구조를 검토하고, 글쓰기도 도와주며, 답변이 조리 있고 긴 대화도 따라갈 수 있습니다."], "Penjelasannya runtut, jadi saya bisa paham kenapa sebuah kode bekerja, bukan cuma menyalinnya. Ia juga terus terang saat tidak yakin.": ["Its explanations are coherent, so I can understand why a piece of code works, not just copy it. It's also upfront when it isn't sure.", "它的讲解条理清晰，让我明白一段代码为什么能运行，而不只是照抄。它在不确定时也会坦率说明。", "Sus explicaciones son coherentes, así que puedo entender por qué funciona un código y no solo copiarlo. También es franco cuando no está seguro.", "شروحاته مترابطة، فأفهم لماذا تعمل الشيفرة بدل أن أنسخها فقط. كما أنه صريح حين لا يكون متأكدًا.", "Ses explications sont cohérentes, donc je peux comprendre pourquoi un code fonctionne, pas seulement le copier. Il est aussi franc quand il n’est pas sûr.", "説明に筋が通っているので、コードをただ写すのではなく、なぜ動くのかを理解できます。自信がないときは正直にそう言ってくれます。", "설명이 조리 있어서 코드를 그냥 베끼는 데 그치지 않고 왜 동작하는지 이해할 수 있습니다. 확실하지 않을 때는 솔직하게 말해 주기도 합니다."], "Mencari penyebab bug dari pesan error dan potongan kode": ["Finding the cause of bugs from error messages and code snippets", "根据错误信息和代码片段找出 bug 的原因", "Encontrar la causa de errores a partir de mensajes de error y fragmentos de código", "إيجاد سبب الأخطاء من رسائل الخطأ ومقتطفات الشيفرة", "Trouver la cause de bugs à partir des messages d’erreur et d’extraits de code", "エラーメッセージとコードの断片からバグの原因を探す", "오류 메시지와 코드 조각에서 버그 원인 찾기"], "Menjelaskan konsep baru dengan bahasa yang saya pahami": ["Explaining new concepts in words I understand", "用我能理解的话讲解新概念", "Explicar conceptos nuevos con palabras que entiendo", "شرح المفاهيم الجديدة بكلمات أفهمها", "Expliquer de nouvelles notions avec des mots que je comprends", "新しい概念を自分に分かる言葉で説明してもらう", "새로운 개념을 제가 이해하는 말로 설명받기"], "Merapikan nama, struktur, dan duplikasi di kode saya": ["Tidying names, structure, and duplication in my code", "整理我代码里的命名、结构和重复部分", "Ordenar nombres, estructura y duplicación en mi código", "ترتيب الأسماء والبنية والتكرار في شيفرتي", "Mettre de l’ordre dans les noms, la structure et les doublons de mon code", "コードの名前、構造、重複を整える", "코드의 이름, 구조, 중복 정리하기"], "Meninjau ulang hasil kerja sebelum dirilis": ["Reviewing my work before release", "在发布前复查我的成果", "Revisar mi trabajo antes de publicarlo", "مراجعة عملي قبل الإصدار", "Relire mon travail avant la publication", "公開前に自分の作業を見直す", "배포 전에 제 작업물 다시 검토하기"], "Menyusun dan memperbaiki teks, termasuk tulisan di halaman ini": ["Drafting and improving text, including the writing on this page", "撰写和润色文字，包括这个页面上的文字", "Redactar y mejorar textos, incluido lo escrito en esta página", "صياغة النصوص وتحسينها، بما فيها المكتوب في هذه الصفحة", "Rédiger et améliorer des textes, y compris ceux de cette page", "このページの文章を含め、文章を作成・改善する", "이 페이지의 글을 포함해 글 작성하고 다듬기"], "Beri tujuan, potongan kode, dan pesan error sekaligus. Jawabannya jauh lebih tepat daripada pertanyaan pendek.": ["Give the goal, the code snippet, and the error message all at once. The answer is far more accurate than from a short question.", "一次性给出目标、代码片段和错误信息。得到的回答比简短提问准确得多。", "Da el objetivo, el fragmento de código y el mensaje de error de una vez. La respuesta es mucho más precisa que con una pregunta corta.", "أعطِه الهدف ومقتطف الشيفرة ورسالة الخطأ دفعة واحدة. تكون الإجابة أدق بكثير من سؤال قصير.", "Donnez l’objectif, l’extrait de code et le message d’erreur en une seule fois. La réponse est bien plus juste qu’avec une question courte.", "目的、コードの断片、エラーメッセージを一度にすべて渡しましょう。短い質問よりずっと的確な答えが返ってきます。", "목표, 코드 조각, 오류 메시지를 한꺼번에 주세요. 짧은 질문보다 답이 훨씬 정확해집니다."], "Awalnya saya cuma menyalin jawabannya. Lama-lama saya mulai bertanya kenapa.": ["At first I only copied the answers. Gradually I started asking why.", "起初我只是复制答案。渐渐地，我开始问为什么。", "Al principio solo copiaba las respuestas. Poco a poco empecé a preguntar por qué.", "في البداية كنت أنسخ الإجابات فقط. ومع الوقت بدأت أسأل لماذا.", "Au début, je ne faisais que copier les réponses. Peu à peu, j’ai commencé à demander pourquoi.", "最初は答えをコピーするだけでした。だんだん「なぜ」と聞くようになりました。", "처음에는 답을 그냥 복사하기만 했어요. 점점 왜 그런지 묻기 시작했습니다."], "AI paling berguna ketika saya tetap memegang kemudi dan memeriksa hasilnya.": ["AI is most useful when I keep my hands on the wheel and check the results.", "当我自己掌握方向并检查结果时，AI 最有用。", "La IA es más útil cuando yo sigo al volante y reviso los resultados.", "الذكاء الاصطناعي أنفع ما يكون حين أبقى ممسكًا بالمقود وأفحص النتائج.", "L’IA est la plus utile quand je garde les mains sur le volant et que je vérifie les résultats.", "AI がいちばん役に立つのは、自分がハンドルを握り続け、結果を確認するときです。", "AI는 제가 계속 운전대를 잡고 결과를 확인할 때 가장 유용합니다."], "Menempel kode hasil AI tanpa dibaca. Beberapa kali itu melahirkan bug yang lebih sulit dicari.": ["Pasting AI-generated code without reading it. Several times that produced bugs that were harder to find.", "不读就粘贴 AI 生成的代码。有几次因此产生了更难查找的 bug。", "Pegar código generado por IA sin leerlo. Varias veces eso produjo errores más difíciles de encontrar.", "لصق شيفرة مولّدة بالذكاء الاصطناعي دون قراءتها. مرات عدة أنتج ذلك أخطاء أصعب في الكشف.", "Coller du code généré par l’IA sans le lire. Plusieurs fois, cela a produit des bugs plus difficiles à trouver.", "AI が作ったコードを読まずに貼り付けたこと。何度か、見つけにくいバグを生みました。", "AI가 만든 코드를 읽지 않고 붙여 넣은 일. 몇 번은 찾기 더 어려운 버그로 이어졌습니다."], "Saat butuh ide dan draf": ["When I need ideas and drafts", "需要想法和草稿时", "Cuando necesito ideas y borradores", "حين أحتاج إلى أفكار ومسودات", "Quand j’ai besoin d’idées et de brouillons", "アイデアや下書きが必要なとき", "아이디어와 초안이 필요할 때"], "Brainstorming": ["Brainstorming", "头脑风暴", "Lluvia de ideas", "العصف الذهني", "Remue-méninges", "ブレインストーミング", "브레인스토밍"], "Draf Kode": ["Code Drafts", "代码草稿", "Borradores de código", "مسودات الشيفرة", "Brouillons de code", "コードの下書き", "코드 초안"], "Ringkasan": ["Summaries", "摘要", "Resúmenes", "الملخصات", "Résumés", "要約", "요약"], "ChatGPT adalah asisten AI dari OpenAI untuk percakapan bebas. Saya memakainya untuk melempar ide, menguji sudut pandang, merangkum bacaan panjang, dan mengubah catatan berantakan menjadi draf.": ["ChatGPT is an AI assistant from OpenAI for open-ended conversation. I use it to throw out ideas, test perspectives, summarize long readings, and turn messy notes into drafts.", "ChatGPT 是 OpenAI 推出的 AI 助手，适合自由对话。我用它抛出想法、检验不同视角、总结长篇阅读材料，并把凌乱的笔记整理成草稿。", "ChatGPT es un asistente de IA de OpenAI para conversaciones abiertas. Lo uso para lanzar ideas, probar puntos de vista, resumir lecturas largas y convertir notas desordenadas en borradores.", "ChatGPT مساعد ذكاء اصطناعي من OpenAI للمحادثة الحرة. أستخدمه لطرح الأفكار واختبار وجهات النظر وتلخيص القراءات الطويلة وتحويل الملاحظات المبعثرة إلى مسودات.", "ChatGPT est un assistant IA d’OpenAI pour la conversation libre. Je m’en sers pour lancer des idées, tester des points de vue, résumer de longues lectures et transformer des notes en désordre en brouillons.", "ChatGPT は OpenAI の AI アシスタントで、自由な会話に向いています。アイデアを出す、視点を試す、長い読み物を要約する、散らかったメモを下書きに変えるといった使い方をしています。", "ChatGPT는 자유로운 대화를 위한 OpenAI의 AI 어시스턴트입니다. 아이디어를 던지고, 관점을 시험하고, 긴 글을 요약하고, 어수선한 메모를 초안으로 바꾸는 데 씁니다."], "Cepat menghasilkan banyak kemungkinan sekaligus, jadi saya bisa memilih arah sebelum membuang waktu di jalan yang salah.": ["It quickly produces many possibilities at once, so I can pick a direction before wasting time on the wrong path.", "它能一次快速给出许多可能性，让我在浪费时间走错路之前先选好方向。", "Produce rápidamente muchas posibilidades a la vez, así que puedo elegir una dirección antes de perder tiempo en el camino equivocado.", "يولّد بسرعة كثيرًا من الاحتمالات دفعة واحدة، فأستطيع اختيار الاتجاه قبل أن أضيّع الوقت في الطريق الخطأ.", "Il produit vite beaucoup de possibilités d’un coup, donc je peux choisir une direction avant de perdre du temps sur la mauvaise voie.", "一度にたくさんの可能性をすばやく出してくれるので、間違った道で時間を無駄にする前に方向を選べます。", "한 번에 많은 가능성을 빠르게 내놓아서, 잘못된 길에서 시간을 낭비하기 전에 방향을 고를 수 있습니다."], "Menggali ide fitur dan alur halaman": ["Digging into feature ideas and page flows", "挖掘功能点子和页面流程", "Explorar ideas de funciones y flujos de página", "التعمق في أفكار الميزات ومسارات الصفحات", "Creuser des idées de fonctions et des parcours de page", "機能のアイデアやページの流れを掘り下げる", "기능 아이디어와 페이지 흐름 파고들기"], "Merangkum dokumentasi panjang jadi poin utama": ["Summarizing long documentation into key points", "把冗长的文档总结成要点", "Resumir documentación larga en puntos clave", "تلخيص التوثيق الطويل في نقاط رئيسية", "Résumer une longue documentation en points clés", "長いドキュメントを要点にまとめる", "긴 문서를 핵심 요점으로 요약하기"], "Menyusun draf awal teks dan potongan kode": ["Writing first drafts of text and code snippets", "撰写文字和代码片段的初稿", "Escribir primeros borradores de texto y fragmentos de código", "كتابة مسودات أولى للنصوص ومقتطفات الشيفرة", "Rédiger des premiers jets de textes et d’extraits de code", "文章やコードの断片の最初の下書きを作る", "글과 코드 조각의 첫 초안 쓰기"], "Menguji ide dari sudut pandang pengguna yang berbeda": ["Testing ideas from different users' perspectives", "从不同用户的角度检验想法", "Probar ideas desde la perspectiva de distintos usuarios", "اختبار الأفكار من منظور مستخدمين مختلفين", "Tester des idées du point de vue de différents utilisateurs", "さまざまなユーザーの視点でアイデアを試す", "다양한 사용자의 관점에서 아이디어 시험하기"], "Menyiapkan pertanyaan sebelum bertanya ke sumber lain": ["Preparing questions before asking other sources", "在向其他来源提问前先整理好问题", "Preparar preguntas antes de consultar otras fuentes", "تجهيز الأسئلة قبل سؤال مصادر أخرى", "Préparer des questions avant d’interroger d’autres sources", "ほかの情報源に聞く前に質問を整理する", "다른 자료에 묻기 전에 질문 준비하기"], "Minta lima alternatif sekaligus, lalu gabungkan bagian terbaiknya sendiri. Jangan ambil satu mentah-mentah.": ["Ask for five alternatives at once, then combine the best parts yourself. Don't take one as-is.", "一次要五个备选方案，再自己把最好的部分组合起来。别照单全收一个。", "Pide cinco alternativas a la vez y luego combina tú las mejores partes. No aceptes una tal cual.", "اطلب خمسة بدائل دفعة واحدة، ثم اجمع أفضل أجزائها بنفسك. لا تأخذ واحدًا كما هو.", "Demandez cinq alternatives d’un coup, puis combinez vous-même les meilleures parties. N’en prenez pas une telle quelle.", "代案を一度に 5 つ頼み、いちばん良い部分を自分で組み合わせましょう。1 つをそのまま採用しないでください。", "대안을 한 번에 다섯 개 요청하고, 가장 좋은 부분을 직접 조합하세요. 하나를 그대로 가져가지 마세요."], "Saya pakai pertama untuk mencari judul. Sekarang jadi teman coret-coret harian.": ["I first used it to find titles. Now it's my daily scribbling buddy.", "我最初用它来想标题。现在它成了我日常的涂鸦伙伴。", "Lo usé primero para buscar títulos. Ahora es mi compañero diario de garabatos.", "استخدمته أول مرة لإيجاد العناوين. والآن هو رفيقي اليومي في الخربشة.", "Je l’ai d’abord utilisé pour chercher des titres. Aujourd’hui, c’est mon compagnon de gribouillage quotidien.", "最初はタイトル探しに使いました。今では毎日の落書き相手です。", "처음엔 제목을 찾는 데 썼습니다. 지금은 매일의 끄적임 친구예요."], "Draf pertama dari AI adalah bahan, bukan hasil akhir.": ["An AI's first draft is material, not the final result.", "AI 的初稿是素材，不是最终成果。", "El primer borrador de una IA es material, no el resultado final.", "المسودة الأولى من الذكاء الاصطناعي مادة خام، لا نتيجة نهائية.", "Le premier brouillon d’une IA est de la matière, pas le résultat final.", "AI の最初の下書きは素材であって、完成品ではありません。", "AI의 첫 초안은 재료이지 최종 결과가 아닙니다."], "Mempercayai nama fungsi yang terdengar yakin padahal salah. Sekarang saya cek ke dokumentasi.": ["Trusting a function name that sounded confident but was wrong. Now I check the documentation.", "相信一个听起来很自信、实际上错误的函数名。现在我会去查文档。", "Confiar en el nombre de una función que sonaba segura pero era incorrecta. Ahora reviso la documentación.", "الثقة باسم دالة بدا واثقًا لكنه خاطئ. الآن أتحقق من التوثيق.", "Faire confiance à un nom de fonction qui sonnait sûr mais qui était faux. Maintenant, je vérifie dans la documentation.", "自信ありげなのに間違っていた関数名を信じてしまったこと。今はドキュメントで確認しています。", "자신 있게 들렸지만 틀렸던 함수 이름을 믿은 일. 이제는 문서를 확인합니다."], "Saat perlu riset": ["When I need research", "需要做调研时", "Cuando necesito investigar", "حين أحتاج إلى بحث", "Quand j’ai besoin de faire des recherches", "調べものが必要なとき", "조사가 필요할 때"], "Perbandingan": ["Comparison", "对比", "Comparación", "المقارنة", "Comparaison", "比較", "비교"], "Cek Ulang": ["Double-Checking", "复查", "Verificación", "إعادة التحقق", "Revérification", "再確認", "재확인"], "Gemini adalah AI dari Google yang terhubung dengan ekosistemnya, termasuk pencarian. Saya memakainya untuk riset cepat, membandingkan beberapa pendekatan, dan mengecek ulang jawaban dari AI lain.": ["Gemini is an AI from Google connected to its ecosystem, including search. I use it for quick research, comparing several approaches, and double-checking answers from other AIs.", "Gemini 是 Google 推出的 AI，与其生态（包括搜索）相连。我用它做快速调研、比较几种方案，以及复查其他 AI 的回答。", "Gemini es una IA de Google conectada a su ecosistema, incluida la búsqueda. La uso para investigar rápido, comparar varios enfoques y volver a comprobar respuestas de otras IA.", "Gemini ذكاء اصطناعي من Google مرتبط بمنظومتها، ومنها البحث. أستخدمه للبحث السريع ومقارنة عدة مقاربات وإعادة التحقق من إجابات الذكاءات الأخرى.", "Gemini est une IA de Google reliée à son écosystème, dont la recherche. Je m’en sers pour des recherches rapides, comparer plusieurs approches et revérifier les réponses d’autres IA.", "Gemini は Google の AI で、検索を含む同社のエコシステムとつながっています。素早い調べもの、複数のアプローチの比較、ほかの AI の回答の再確認に使っています。", "Gemini는 검색을 포함한 Google 생태계와 연결된 Google의 AI입니다. 빠른 조사, 여러 접근법 비교, 다른 AI의 답변 재확인에 씁니다."], "Memeriksa silang itu penting. Satu sumber jarang cukup, dan Gemini memberi saya pembanding yang cepat.": ["Cross-checking matters. One source is rarely enough, and Gemini gives me a quick point of comparison.", "交叉核对很重要。只靠一个来源往往不够，而 Gemini 能给我一个快速的对照。", "Contrastar es importante. Rara vez basta una sola fuente, y Gemini me da un punto de comparación rápido.", "التحقق المتبادل مهم. نادرًا ما يكفي مصدر واحد، وGemini يعطيني نقطة مقارنة سريعة.", "Le recoupement est important. Une seule source suffit rarement, et Gemini me donne un point de comparaison rapide.", "クロスチェックは大事です。情報源が 1 つだけでは足りないことが多く、Gemini はすぐに比較対象を出してくれます。", "교차 확인은 중요합니다. 출처 하나로는 부족한 경우가 많고, Gemini는 빠른 비교 대상을 줍니다."], "Riset cepat soal teknologi dan tren terbaru": ["Quick research on technology and the latest trends", "快速调研技术和最新趋势", "Investigación rápida sobre tecnología y las últimas tendencias", "بحث سريع في التقنية وأحدث الاتجاهات", "Recherches rapides sur la technologie et les dernières tendances", "技術や最新トレンドについて素早く調べる", "기술과 최신 트렌드를 빠르게 조사하기"], "Membandingkan beberapa solusi sebelum memutuskan": ["Comparing several solutions before deciding", "在决定之前比较几种解决方案", "Comparar varias soluciones antes de decidir", "مقارنة عدة حلول قبل اتخاذ القرار", "Comparer plusieurs solutions avant de décider", "決める前に複数の解決策を比較する", "결정하기 전에 여러 해결책 비교하기"], "Memeriksa ulang jawaban AI lain": ["Double-checking answers from other AIs", "复查其他 AI 的回答", "Volver a comprobar respuestas de otras IA", "إعادة التحقق من إجابات ذكاءات اصطناعية أخرى", "Revérifier les réponses d’autres IA", "ほかの AI の回答を再確認する", "다른 AI의 답변 다시 확인하기"], "Mencari referensi dan contoh penerapan": ["Finding references and examples of how things are applied", "查找参考资料和应用示例", "Buscar referencias y ejemplos de aplicación", "البحث عن مراجع وأمثلة تطبيقية", "Trouver des références et des exemples d’application", "参考資料や活用例を探す", "참고 자료와 적용 사례 찾기"], "Menguraikan istilah baru dalam bahasa sederhana": ["Breaking down new terms into plain language", "把新术语拆解成通俗的话", "Desglosar términos nuevos en lenguaje sencillo", "تبسيط المصطلحات الجديدة بلغة سهلة", "Expliquer simplement de nouveaux termes", "新しい用語を平易な言葉でかみ砕く", "새로운 용어를 쉬운 말로 풀어 보기"], "Untuk hal penting, buka dokumentasi resmi yang disebut. Jawaban AI adalah petunjuk, bukan bukti.": ["For anything important, open the official documentation it cites. An AI's answer is a hint, not proof.", "遇到重要的事，就打开它引用的官方文档。AI 的回答是线索，不是证据。", "Para lo importante, abre la documentación oficial que menciona. La respuesta de una IA es una pista, no una prueba.", "في الأمور المهمة، افتح التوثيق الرسمي الذي يذكره. إجابة الذكاء الاصطناعي إشارة وليست دليلًا.", "Pour ce qui est important, ouvrez la documentation officielle qu’il cite. La réponse d’une IA est un indice, pas une preuve.", "大切なことは、示された公式ドキュメントを開きましょう。AI の回答はヒントであって、証拠ではありません。", "중요한 일이라면 언급된 공식 문서를 직접 열어 보세요. AI의 답변은 단서일 뿐, 증거가 아닙니다."], "Saya coba karena ingin pembanding. Ternyata paling berguna untuk cek silang.": ["I tried it because I wanted a point of comparison. It turned out to be most useful for cross-checking.", "我试它是因为想要一个对照。结果发现它最适合用来交叉核对。", "La probé porque quería un punto de comparación. Resultó ser lo más útil para contrastar.", "جرّبته لأنني أردت نقطة مقارنة. واتضح أنه الأنفع في التحقق المتبادل.", "Je l’ai essayé parce que je voulais un point de comparaison. Il s’est révélé surtout utile pour le recoupement.", "比較対象がほしくて試しました。結果的に、クロスチェックにいちばん役立ちました。", "비교 대상이 필요해서 써 봤습니다. 알고 보니 교차 확인에 가장 유용했어요."], "Satu sumber saja jarang cukup.": ["A single source is rarely enough.", "只靠单一来源往往不够。", "Una sola fuente rara vez basta.", "نادرًا ما يكفي مصدر واحد.", "Une seule source suffit rarement.", "情報源が 1 つだけでは足りないことが多いです。", "출처 하나로는 부족한 경우가 많습니다."], "Menelan rekomendasi library yang ternyata sudah tidak dirawat. Sekarang saya cek tanggal rilis terakhirnya.": ["Swallowing a library recommendation that turned out to be unmaintained. Now I check the date of its last release.", "轻信了一个其实已经无人维护的库的推荐。现在我会查它最近一次发布的日期。", "Tragarme la recomendación de una biblioteca que resultó estar sin mantenimiento. Ahora reviso la fecha de su último lanzamiento.", "ابتلاع توصية بمكتبة تبيّن أنها لم تعد مصانة. الآن أتحقق من تاريخ آخر إصدار لها.", "Avaler la recommandation d’une bibliothèque qui s’est avérée non maintenue. Maintenant, je vérifie la date de sa dernière version.", "メンテナンスが止まっていたライブラリのおすすめを鵜呑みにしたこと。今は最終リリース日を確認しています。", "더 이상 관리되지 않는 것으로 드러난 라이브러리 추천을 그대로 믿은 일. 이제는 마지막 릴리스 날짜를 확인합니다."], "Saat ketemu soal logika": ["When I hit a logic problem", "遇到逻辑难题时", "Cuando me topo con un problema de lógica", "حين أواجه مسألة منطقية", "Quand je tombe sur un problème de logique", "論理の問題にぶつかったとき", "논리 문제를 만났을 때"], "Logika": ["Logic", "逻辑", "Lógica", "المنطق", "Logique", "ロジック", "논리"], "Algoritma": ["Algorithms", "算法", "Algoritmos", "الخوارزميات", "Algorithmes", "アルゴリズム", "알고리즘"], "Sudut Pandang": ["Perspective", "视角", "Perspectiva", "زاوية النظر", "Point de vue", "視点", "관점"], "DeepSeek adalah model AI yang kuat di penalaran dan logika. Ia sering memaparkan langkah berpikirnya, jadi alur jawabannya bisa diikuti dan diperiksa.": ["DeepSeek is an AI model that is strong at reasoning and logic. It often lays out its thinking steps, so the flow of the answer can be followed and checked.", "DeepSeek 是一个擅长推理和逻辑的 AI 模型。它常常把思考步骤列出来，所以回答的思路可以跟随和检验。", "DeepSeek es un modelo de IA fuerte en razonamiento y lógica. Suele exponer sus pasos de pensamiento, así que el hilo de la respuesta se puede seguir y revisar.", "DeepSeek نموذج ذكاء اصطناعي قوي في الاستدلال والمنطق. كثيرًا ما يعرض خطوات تفكيره، فيمكن تتبّع مسار الإجابة وفحصه.", "DeepSeek est un modèle d’IA fort en raisonnement et en logique. Il expose souvent ses étapes de réflexion, donc le fil de la réponse peut être suivi et vérifié.", "DeepSeek は推論とロジックに強い AI モデルです。思考の手順をよく示してくれるので、回答の流れを追って確かめられます。", "DeepSeek은 추론과 논리에 강한 AI 모델입니다. 사고 단계를 자주 펼쳐 보여 주기 때문에 답변의 흐름을 따라가며 확인할 수 있습니다."], "Untuk masalah algoritma, saya butuh melihat prosesnya, bukan hanya jawabannya. Di situ saya bisa menemukan celah logika.": ["For algorithm problems, I need to see the process, not just the answer. That's where I can find the gaps in the logic.", "遇到算法问题，我需要看到过程，而不只是答案。这样我才能找出逻辑上的漏洞。", "En problemas de algoritmos necesito ver el proceso, no solo la respuesta. Ahí es donde puedo encontrar los huecos en la lógica.", "في مسائل الخوارزميات أحتاج إلى رؤية العملية لا الإجابة فقط. وهناك أستطيع اكتشاف ثغرات المنطق.", "Pour les problèmes d’algorithmes, j’ai besoin de voir le processus, pas seulement la réponse. C’est là que je peux trouver les failles de la logique.", "アルゴリズムの問題では、答えだけでなく過程を見る必要があります。そこで論理の穴を見つけられます。", "알고리즘 문제에서는 답만이 아니라 과정을 봐야 합니다. 거기서 논리의 빈틈을 찾을 수 있습니다."], "Memecahkan soal logika dan algoritma yang buntu": ["Cracking logic and algorithm problems that are stuck", "攻克卡住的逻辑和算法问题", "Resolver problemas de lógica y algoritmos que están atascados", "حل مسائل المنطق والخوارزميات العالقة", "Résoudre des problèmes de logique et d’algorithmes bloqués", "行き詰まった論理やアルゴリズムの問題を解く", "막혀 있던 논리와 알고리즘 문제 풀기"], "Menjelaskan langkah berpikir secara berurutan": ["Explaining thinking steps in order", "按顺序解释思考步骤", "Explicar los pasos de pensamiento en orden", "شرح خطوات التفكير بالترتيب", "Expliquer les étapes de réflexion dans l’ordre", "考える手順を順番に説明してもらう", "사고 단계를 순서대로 설명하기"], "Mencari alternatif solusi yang lebih ringkas": ["Finding more concise alternative solutions", "寻找更简洁的替代方案", "Buscar soluciones alternativas más concisas", "البحث عن حلول بديلة أكثر إيجازًا", "Chercher des solutions alternatives plus concises", "より簡潔な代替の解決策を探す", "더 간결한 대안 해결책 찾기"], "Menguji ulang logika yang terasa janggal": ["Re-testing logic that feels off", "重新检验感觉不对劲的逻辑", "Volver a probar la lógica que se siente rara", "إعادة اختبار المنطق الذي يبدو غريبًا", "Retester une logique qui semble étrange", "おかしいと感じる論理を改めて検証する", "이상하게 느껴지는 논리 다시 시험하기"], "Memeriksa kasus batas yang terlewat": ["Checking edge cases that were missed", "检查被遗漏的边界情况", "Revisar los casos límite que se pasaron por alto", "فحص الحالات الحدّية التي فاتت", "Vérifier les cas limites oubliés", "見落としていた境界ケースを確認する", "놓친 경계 사례 확인하기"], "Minta ia menunjukkan langkahnya, lalu uji satu per satu dengan contoh angka kecil.": ["Ask it to show its steps, then test them one by one with small example numbers.", "让它展示步骤，然后用小数字的例子逐一验证。", "Pídele que muestre sus pasos y luego pruébalos uno por uno con números pequeños de ejemplo.", "اطلب منه إظهار خطواته، ثم اختبرها واحدة تلو الأخرى بأمثلة رقمية صغيرة.", "Demandez-lui de montrer ses étapes, puis testez-les une à une avec de petits exemples chiffrés.", "手順を示してもらい、小さな数字の例で一つずつ試しましょう。", "단계를 보여 달라고 하고, 작은 숫자 예시로 하나씩 시험해 보세요."], "Saya pakai saat satu masalah logika buntu seharian. Langkahnya membuat saya sadar di mana saya salah.": ["I used it when one logic problem was stuck all day. Its steps made me realize where I went wrong.", "有一个逻辑问题卡了我一整天，我就用了它。它的步骤让我意识到自己错在哪里。", "Lo usé cuando un problema de lógica estuvo atascado todo el día. Sus pasos me hicieron ver dónde me equivocaba.", "استخدمته حين علقت مسألة منطقية عندي طوال اليوم. وجعلتني خطواته أدرك أين أخطأت.", "Je l’ai utilisé quand un problème de logique m’a bloqué toute une journée. Ses étapes m’ont fait voir où je m’étais trompé.", "論理の問題で一日中行き詰まったときに使いました。その手順のおかげで、どこで間違えたかに気づけました。", "논리 문제 하나에 하루 종일 막혔을 때 썼습니다. 그 단계 덕분에 어디서 틀렸는지 알게 됐어요."], "Cara berpikir yang berbeda kadang membuka pintu yang selama ini ada di depan mata.": ["A different way of thinking sometimes opens a door that was right in front of me all along.", "不同的思考方式，有时会打开一扇一直就在眼前的门。", "Una forma distinta de pensar a veces abre una puerta que estuvo delante de mis ojos todo el tiempo.", "طريقة تفكير مختلفة تفتح أحيانًا بابًا كان أمام عيني طوال الوقت.", "Une autre façon de penser ouvre parfois une porte qui était sous mes yeux depuis le début.", "違う考え方が、ずっと目の前にあった扉を開いてくれることもあります。", "다른 사고방식이 때로는 내내 눈앞에 있던 문을 열어 줍니다."], "Percaya pada langkah yang rapi padahal ada satu asumsi keliru di awal.": ["Trusting neat steps when there was one wrong assumption at the start.", "相信整洁的步骤，却没发现一开始就藏着一个错误的假设。", "Confiar en pasos ordenados cuando había una suposición equivocada al principio.", "الوثوق بخطوات مرتبة بينما كان هناك افتراض خاطئ واحد في البداية.", "Faire confiance à des étapes bien rangées alors qu’une hypothèse fausse se cachait au départ.", "最初に間違った前提が 1 つあったのに、整った手順を信じてしまったこと。", "처음에 잘못된 가정이 하나 있었는데 깔끔한 단계를 믿어 버린 일."], "Menyimpan riwayat kerja, mencoba ide di cabang terpisah, dan mempublikasikan proyek lewat GitHub Pages.": ["Saving work history, trying ideas on separate branches, and publishing projects through GitHub Pages.", "保存工作历史，在独立分支上试验想法，并通过 GitHub Pages 发布项目。", "Guardar el historial de trabajo, probar ideas en ramas separadas y publicar proyectos con GitHub Pages.", "حفظ سجل العمل وتجربة الأفكار في فروع منفصلة ونشر المشاريع عبر GitHub Pages.", "Conserver l’historique du travail, tester des idées sur des branches séparées et publier des projets via GitHub Pages.", "作業履歴を残し、別の branch でアイデアを試し、GitHub Pages でプロジェクトを公開する。", "작업 기록을 남기고, 별도의 branch에서 아이디어를 시험하고, GitHub Pages로 프로젝트를 게시하기."], "Penjelasan skill": ["Skill explanation", "技能说明", "Explicación de la habilidad", "شرح المهارة", "Explication de la compétence", "スキルの説明", "스킬 설명"], "Tutup penjelasan": ["Close explanation", "关闭说明", "Cerrar explicación", "إغلاق الشرح", "Fermer l’explication", "説明を閉じる", "설명 닫기"], "Filter kategori": ["Category filter", "分类筛选", "Filtro de categoría", "تصفية الفئات", "Filtre de catégorie", "カテゴリーで絞り込む", "카테고리 필터"], "Skill sebelumnya": ["Previous skill", "上一个技能", "Habilidad anterior", "المهارة السابقة", "Compétence précédente", "前のスキル", "이전 스킬"], "Skill berikutnya": ["Next skill", "下一个技能", "Habilidad siguiente", "المهارة التالية", "Compétence suivante", "次のスキル", "다음 스킬"], "Pertama kali pakai": ["First time using it", "第一次使用", "La primera vez que lo usé", "أول استخدام", "Première utilisation", "初めて使ったとき", "처음 써 본 때"], "Pelajaran terbesar": ["Biggest lesson", "最大的收获", "La mayor lección", "أكبر درس", "Plus grande leçon", "いちばんの学び", "가장 큰 교훈"], "Kesalahan yang pernah saya buat": ["A mistake I've made", "我犯过的一个错误", "Un error que he cometido", "خطأ ارتكبته", "Une erreur que j’ai commise", "私がやった失敗", "제가 저지른 실수"], "Tekan ikon untuk membaca detailnya": ["Tap an icon to read the details", "点按图标阅读详情", "Toca un icono para leer los detalles", "اضغط على أيقونة لقراءة التفاصيل", "Touchez une icône pour lire les détails", "アイコンをタップして詳細を読む", "아이콘을 눌러 자세한 내용 읽기"], "Gulir ke bawah: keahlian, cara kerja, tanya jawab": ["Scroll down: skills, process, Q&A", "向下滚动：技能、工作流程、问答", "Desplázate hacia abajo: habilidades, proceso y preguntas", "مرّر لأسفل: المهارات وطريقة العمل والأسئلة", "Faites défiler : compétences, méthode, questions", "下にスクロール：スキル、進め方、Q&A", "아래로 스크롤: 스킬, 작업 방식, 질문과 답변"], "Level: Dasar": ["Level: Basic", "等级：入门", "Nivel: Básico", "المستوى: أساسي", "Niveau : Débutant", "レベル：基礎", "레벨: 기초"], "Level: Berkembang": ["Level: Developing", "等级：成长中", "Nivel: En desarrollo", "المستوى: قيد التطور", "Niveau : En progression", "レベル：成長中", "레벨: 성장 중"], "Level: Menengah": ["Level: Intermediate", "等级：中级", "Nivel: Intermedio", "المستوى: متوسط", "Niveau : Intermédiaire", "レベル：中級", "레벨: 중급"], "Level: Mahir": ["Level: Advanced", "等级：熟练", "Nivel: Avanzado", "المستوى: متقدم", "Niveau : Avancé", "レベル：上級", "레벨: 고급"], "Level: Ahli": ["Level: Expert", "等级：专家", "Nivel: Experto", "المستوى: خبير", "Niveau : Expert", "レベル：エキスパート", "레벨: 전문가"], "HTML5: lihat penjelasan": ["HTML5: see explanation", "HTML5: 查看说明", "HTML5: ver explicación", "HTML5: عرض الشرح", "HTML5: voir l’explication", "HTML5: 説明を見る", "HTML5: 설명 보기"], "HTML5: buka penjelasan": ["HTML5: open explanation", "HTML5: 打开说明", "HTML5: abrir explicación", "HTML5: فتح الشرح", "HTML5: ouvrir l’explication", "HTML5: 説明を開く", "HTML5: 설명 열기"], "CSS3: lihat penjelasan": ["CSS3: see explanation", "CSS3: 查看说明", "CSS3: ver explicación", "CSS3: عرض الشرح", "CSS3: voir l’explication", "CSS3: 説明を見る", "CSS3: 설명 보기"], "CSS3: buka penjelasan": ["CSS3: open explanation", "CSS3: 打开说明", "CSS3: abrir explicación", "CSS3: فتح الشرح", "CSS3: ouvrir l’explication", "CSS3: 説明を開く", "CSS3: 설명 열기"], "Tailwind CSS: lihat penjelasan": ["Tailwind CSS: see explanation", "Tailwind CSS: 查看说明", "Tailwind CSS: ver explicación", "Tailwind CSS: عرض الشرح", "Tailwind CSS: voir l’explication", "Tailwind CSS: 説明を見る", "Tailwind CSS: 설명 보기"], "Tailwind CSS: buka penjelasan": ["Tailwind CSS: open explanation", "Tailwind CSS: 打开说明", "Tailwind CSS: abrir explicación", "Tailwind CSS: فتح الشرح", "Tailwind CSS: ouvrir l’explication", "Tailwind CSS: 説明を開く", "Tailwind CSS: 설명 열기"], "Vue.js: lihat penjelasan": ["Vue.js: see explanation", "Vue.js: 查看说明", "Vue.js: ver explicación", "Vue.js: عرض الشرح", "Vue.js: voir l’explication", "Vue.js: 説明を見る", "Vue.js: 설명 보기"], "Vue.js: buka penjelasan": ["Vue.js: open explanation", "Vue.js: 打开说明", "Vue.js: abrir explicación", "Vue.js: فتح الشرح", "Vue.js: ouvrir l’explication", "Vue.js: 説明を開く", "Vue.js: 설명 열기"], "Bootstrap: lihat penjelasan": ["Bootstrap: see explanation", "Bootstrap: 查看说明", "Bootstrap: ver explicación", "Bootstrap: عرض الشرح", "Bootstrap: voir l’explication", "Bootstrap: 説明を見る", "Bootstrap: 설명 보기"], "Bootstrap: buka penjelasan": ["Bootstrap: open explanation", "Bootstrap: 打开说明", "Bootstrap: abrir explicación", "Bootstrap: فتح الشرح", "Bootstrap: ouvrir l’explication", "Bootstrap: 説明を開く", "Bootstrap: 설명 열기"], "GSAP: lihat penjelasan": ["GSAP: see explanation", "GSAP: 查看说明", "GSAP: ver explicación", "GSAP: عرض الشرح", "GSAP: voir l’explication", "GSAP: 説明を見る", "GSAP: 설명 보기"], "GSAP: buka penjelasan": ["GSAP: open explanation", "GSAP: 打开说明", "GSAP: abrir explicación", "GSAP: فتح الشرح", "GSAP: ouvrir l’explication", "GSAP: 説明を開く", "GSAP: 설명 열기"], "Anime.js: lihat penjelasan": ["Anime.js: see explanation", "Anime.js: 查看说明", "Anime.js: ver explicación", "Anime.js: عرض الشرح", "Anime.js: voir l’explication", "Anime.js: 説明を見る", "Anime.js: 설명 보기"], "Anime.js: buka penjelasan": ["Anime.js: open explanation", "Anime.js: 打开说明", "Anime.js: abrir explicación", "Anime.js: فتح الشرح", "Anime.js: ouvrir l’explication", "Anime.js: 説明を開く", "Anime.js: 설명 열기"], "Laravel: lihat penjelasan": ["Laravel: see explanation", "Laravel: 查看说明", "Laravel: ver explicación", "Laravel: عرض الشرح", "Laravel: voir l’explication", "Laravel: 説明を見る", "Laravel: 설명 보기"], "Laravel: buka penjelasan": ["Laravel: open explanation", "Laravel: 打开说明", "Laravel: abrir explicación", "Laravel: فتح الشرح", "Laravel: ouvrir l’explication", "Laravel: 説明を開く", "Laravel: 설명 열기"], "React: lihat penjelasan": ["React: see explanation", "React: 查看说明", "React: ver explicación", "React: عرض الشرح", "React: voir l’explication", "React: 説明を見る", "React: 설명 보기"], "React: buka penjelasan": ["React: open explanation", "React: 打开说明", "React: abrir explicación", "React: فتح الشرح", "React: ouvrir l’explication", "React: 説明を開く", "React: 설명 열기"], "VS Code: lihat penjelasan": ["VS Code: see explanation", "VS Code: 查看说明", "VS Code: ver explicación", "VS Code: عرض الشرح", "VS Code: voir l’explication", "VS Code: 説明を見る", "VS Code: 설명 보기"], "VS Code: buka penjelasan": ["VS Code: open explanation", "VS Code: 打开说明", "VS Code: abrir explicación", "VS Code: فتح الشرح", "VS Code: ouvrir l’explication", "VS Code: 説明を開く", "VS Code: 설명 열기"], "GitHub: lihat penjelasan": ["GitHub: see explanation", "GitHub: 查看说明", "GitHub: ver explicación", "GitHub: عرض الشرح", "GitHub: voir l’explication", "GitHub: 説明を見る", "GitHub: 설명 보기"], "GitHub: buka penjelasan": ["GitHub: open explanation", "GitHub: 打开说明", "GitHub: abrir explicación", "GitHub: فتح الشرح", "GitHub: ouvrir l’explication", "GitHub: 説明を開く", "GitHub: 설명 열기"], "Claude: lihat penjelasan": ["Claude: see explanation", "Claude: 查看说明", "Claude: ver explicación", "Claude: عرض الشرح", "Claude: voir l’explication", "Claude: 説明を見る", "Claude: 설명 보기"], "Claude: buka penjelasan": ["Claude: open explanation", "Claude: 打开说明", "Claude: abrir explicación", "Claude: فتح الشرح", "Claude: ouvrir l’explication", "Claude: 説明を開く", "Claude: 설명 열기"], "ChatGPT: lihat penjelasan": ["ChatGPT: see explanation", "ChatGPT: 查看说明", "ChatGPT: ver explicación", "ChatGPT: عرض الشرح", "ChatGPT: voir l’explication", "ChatGPT: 説明を見る", "ChatGPT: 설명 보기"], "ChatGPT: buka penjelasan": ["ChatGPT: open explanation", "ChatGPT: 打开说明", "ChatGPT: abrir explicación", "ChatGPT: فتح الشرح", "ChatGPT: ouvrir l’explication", "ChatGPT: 説明を開く", "ChatGPT: 설명 열기"], "Gemini: lihat penjelasan": ["Gemini: see explanation", "Gemini: 查看说明", "Gemini: ver explicación", "Gemini: عرض الشرح", "Gemini: voir l’explication", "Gemini: 説明を見る", "Gemini: 설명 보기"], "Gemini: buka penjelasan": ["Gemini: open explanation", "Gemini: 打开说明", "Gemini: abrir explicación", "Gemini: فتح الشرح", "Gemini: ouvrir l’explication", "Gemini: 説明を開く", "Gemini: 설명 열기"], "DeepSeek: lihat penjelasan": ["DeepSeek: see explanation", "DeepSeek: 查看说明", "DeepSeek: ver explicación", "DeepSeek: عرض الشرح", "DeepSeek: voir l’explication", "DeepSeek: 説明を見る", "DeepSeek: 설명 보기"], "DeepSeek: buka penjelasan": ["DeepSeek: open explanation", "DeepSeek: 打开说明", "DeepSeek: abrir explicación", "DeepSeek: فتح الشرح", "DeepSeek: ouvrir l’explication", "DeepSeek: 説明を開く", "DeepSeek: 설명 열기"]});
var KO=["안녕하세요, <strong>M. Zikri Al-Bukhori</strong>입니다. <strong>16세</strong>이고 <strong>북수마트라 메단</strong>에 살고 있습니다. 현재 <strong>SMK Swasta Mandiri</strong>에 다니는 학생으로, 계속 배우고 성장하며 새로운 것을 탐구하고 싶습니다.", "나이는 미래를 만들어 가는 데 장벽이 아니라고 믿습니다. 저에게 모든 배움은 역량을 키우고 시야를 넓히며 더 나은 인성을 갖출 기회입니다.", "기술과 자기계발에 관심이 많습니다. 새로운 것을 배우고, 여러 도전에 나서고, 미래에 밑거름이 될 경험을 쌓는 것을 좋아합니다.", "<span>제 원칙은 단순합니다:</span> 계속 배우고, 용기 내어 시도하고, 성장을 멈추지 않는 것."];Object.keys(H).forEach(function(k,i){H[k][6]=KO[i];});

/* === Patch bahasa murni: satu bahasa saja per pilihan === */
(function(){
  var NT={"Medan": ["Medan", "棉兰", "Medan", "ميدان", "Medan", "メダン", "메단"], "Playlist · 06 lagu": ["Playlist · 06 songs", "播放列表 · 06 首歌", "Lista de reproducción · 06 canciones", "قائمة التشغيل · 06 أغانٍ", "Playlist · 06 morceaux", "プレイリスト · 06曲", "플레이리스트 · 06곡"], "Enam lagu yang lagi nempel di kepala.": ["Six songs stuck in my head right now.", "最近脑子里一直循环的六首歌。", "Seis canciones que se me han quedado pegadas en la cabeza.", "ست أغنيات لا تفارق رأسي هذه الأيام.", "Six chansons qui me trottent dans la tête en ce moment.", "最近ずっと頭から離れない6曲。", "요즘 머릿속에서 떠나지 않는 여섯 곡."], "Pemutar": ["Player", "播放器", "Reproductor", "المشغّل", "Lecteur", "プレーヤー", "플레이어"], "Pilih lagu": ["Pick a song", "选择歌曲", "Elige una canción", "اختر أغنية", "Choisis un morceau", "曲を選ぶ", "곡을 선택하세요"], "Ketuk satu lagu di playlist": ["Tap a song in the playlist", "点按播放列表中的一首歌", "Toca una canción de la lista", "اضغط على أغنية في القائمة", "Touche un morceau de la playlist", "プレイリストの曲をタップ", "플레이리스트에서 곡을 눌러 보세요"], "Lagu belum bisa diputar. Coba ketuk lagi.": ["This song can't play yet. Try tapping again.", "这首歌暂时无法播放，请再点一次。", "Esta canción aún no se puede reproducir. Intenta tocar de nuevo.", "لا يمكن تشغيل هذه الأغنية الآن. حاول الضغط مرة أخرى.", "Ce morceau ne peut pas être lu pour l’instant. Touche à nouveau.", "まだこの曲を再生できません。もう一度タップしてください。", "아직 이 곡을 재생할 수 없어요. 다시 눌러 보세요."], "File lagu tidak bisa dibaca di perangkat ini.": ["The song file can't be read on this device.", "此设备无法读取这首歌的文件。", "Este dispositivo no puede leer el archivo de la canción.", "لا يمكن قراءة ملف الأغنية على هذا الجهاز.", "Ce fichier audio ne peut pas être lu sur cet appareil.", "このデバイスでは曲のファイルを読み込めません。", "이 기기에서는 곡 파일을 읽을 수 없어요."], "tool": ["tools", "工具", "herramientas", "أدوات", "outils", "ツール", "도구"], "Studi kasus: web toko kue dan restoran lokal. Pelanggan memilih menu di katalog, lalu memesan langsung lewat WhatsApp, tanpa server database yang mahal.": ["Case study: a website for a bakery and a local restaurant. Customers pick items from the catalog, then order directly via WhatsApp, with no expensive database server.", "案例研究：一家蛋糕店和本地餐厅的网站。顾客在目录中挑选菜单，然后直接通过 WhatsApp 下单，无需昂贵的数据库服务器。", "Caso de estudio: sitio web de una pastelería y un restaurante local. Los clientes eligen del catálogo y piden directamente por WhatsApp, sin un costoso servidor de base de datos.", "دراسة حالة: موقع لمحل حلويات ومطعم محلي. يختار الزبائن من الكتالوج ثم يطلبون مباشرة عبر واتساب، دون خادم قاعدة بيانات باهظ.", "Étude de cas : site web d’une pâtisserie et d’un restaurant local. Les clients choisissent dans le catalogue puis commandent directement via WhatsApp, sans serveur de base de données coûteux.", "ケーススタディ：ケーキ店と地元レストランのウェブサイト。お客様はカタログからメニューを選び、WhatsAppで直接注文できます。高価なデータベースサーバーは不要です。", "사례 연구: 케이크 가게와 동네 식당을 위한 웹사이트예요. 손님이 카탈로그에서 메뉴를 고르고 WhatsApp으로 바로 주문하며, 비싼 데이터베이스 서버가 필요 없어요."], "Katalog Interaktif": ["Interactive Catalog", "交互式目录", "Catálogo interactivo", "كتالوج تفاعلي", "Catalogue interactif", "インタラクティブカタログ", "인터랙티브 카탈로그"], "Pilih menu dengan mudah": ["Pick items with ease", "轻松挑选菜单", "Elige del menú con facilidad", "اختر من القائمة بسهولة", "Choisis facilement dans le menu", "メニューを簡単に選べる", "메뉴를 쉽게 고르세요"], "Pesan via WhatsApp": ["Order via WhatsApp", "通过 WhatsApp 下单", "Pedir por WhatsApp", "اطلب عبر واتساب", "Commander via WhatsApp", "WhatsAppで注文", "WhatsApp으로 주문"], "Satu ketukan": ["One tap", "轻点一下", "Un solo toque", "نقرة واحدة", "Une seule touche", "ワンタップ", "한 번의 터치"], "Ringan & cepat": ["Light & fast", "轻量又快速", "Ligero y rápido", "خفيف وسريع", "Léger et rapide", "軽くて速い", "가볍고 빠름"], "Buka demo langsung ↗": ["Open live demo ↗", "打开在线演示 ↗", "Abrir demo en vivo ↗", "افتح العرض المباشر ↗", "Ouvrir la démo en direct ↗", "ライブデモを開く ↗", "라이브 데모 열기 ↗"], "Mari": ["Let's", "让我们", "Vamos a", "هيّا", "Restons", "つながり", "우리"], "Terhubung": ["Connect", "保持联系", "conectar", "نتواصل", "en contact", "ましょう", "연결해요"], "Terbuka untuk tawaran kerja freelance, proyek kolaboratif, maupun diskusi seputar pengembangan web dan desain antarmuka.": ["Open to freelance offers, collaborative projects, and conversations about web development and interface design.", "欢迎自由职业邀约、合作项目，以及围绕网页开发和界面设计的交流。", "Abierto a ofertas freelance, proyectos colaborativos y conversaciones sobre desarrollo web y diseño de interfaces.", "منفتح على عروض العمل الحر والمشاريع التعاونية والنقاشات حول تطوير الويب وتصميم الواجهات.", "Ouvert aux missions freelance, aux projets collaboratifs et aux échanges sur le développement web et le design d’interface.", "フリーランスのご依頼、共同プロジェクト、ウェブ開発やインターフェースデザインについてのご相談をお待ちしています。", "프리랜서 제안, 협업 프로젝트, 웹 개발과 인터페이스 디자인에 관한 대화에 열려 있어요."], "Email": ["Email", "邮箱", "Correo", "البريد الإلكتروني", "E-mail", "メール", "이메일"], "M. Zikri Al-Bukhori": ["M. Zikri Al-Bukhori", "M. Zikri Al-Bukhori", "M. Zikri Al-Bukhori", "M. Zikri Al-Bukhori", "M. Zikri Al-Bukhori", "M. Zikri Al-Bukhori", "엠. 지크리 알부카리"], "M. Zikri": ["M. Zikri", "M. Zikri", "M. Zikri", "M. Zikri", "M. Zikri", "M. Zikri", "엠. 지크리"], "Al-Bukhori": ["Al-Bukhori", "Al-Bukhori", "Al-Bukhori", "Al-Bukhori", "Al-Bukhori", "Al-Bukhori", "알부카리"], "Zikri.": ["Zikri.", "Zikri.", "Zikri.", "Zikri.", "Zikri.", "Zikri.", "지크리."], "PORTOFOLIO • PORTOFOLIO • PORTOFOLIO • PORTOFOLIO • PORTOFOLIO •": ["PORTFOLIO • PORTFOLIO • PORTFOLIO • PORTFOLIO • PORTFOLIO •", "作品集 • 作品集 • 作品集 • 作品集 • 作品集 •", "PORTAFOLIO • PORTAFOLIO • PORTAFOLIO • PORTAFOLIO • PORTAFOLIO •", "معرض الأعمال • معرض الأعمال • معرض الأعمال • معرض الأعمال • معرض الأعمال •", "PORTFOLIO • PORTFOLIO • PORTFOLIO • PORTFOLIO • PORTFOLIO •", "ポートフォリオ • ポートフォリオ • ポートフォリオ • ポートフォリオ • ポートフォリオ •", "포트폴리오 • 포트폴리오 • 포트폴리오 • 포트폴리오 • 포트폴리오 •"], "Portofolio": ["Portfolio", "作品集", "Portafolio", "معرض الأعمال", "Portfolio", "ポートフォリオ", "포트폴리오"], "Port": ["Port", "作品", "Porta", "الأعمال", "Port", "ポート", "포트"], "folio.": ["folio.", "集。", "folio.", "معرض", "folio.", "フォリオ。", "폴리오."], "> Front-End Developer": ["> Front-End Developer", "> 前端开发者", "> Desarrollador Front-End", "> مطوّر واجهات أمامية", "> Développeur Front-End", "> フロントエンド開発者", "> 프론트엔드 개발자"], "& UI Designer": ["& UI Designer", "& UI 设计师", "& Diseñador UI", "& مصمم واجهات", "& Designer UI", "& UIデザイナー", "& UI 디자이너"], "Build.": ["Build.", "构建。", "Construye.", "ابنِ.", "Construire.", "つくる。", "구축."], "Design.": ["Design.", "设计。", "Diseña.", "صمّم.", "Concevoir.", "デザインする。", "디자인."], "Innovate.": ["Innovate.", "创新。", "Innova.", "ابتكر.", "Innover.", "革新する。", "혁신."], "Turning ideas": ["Turning ideas", "把创意", "Convirtiendo ideas", "نحوّل الأفكار", "Transformer les idées", "アイデアを", "아이디어를"], "into interactive": ["into interactive", "变成可互动的", "en experiencias", "إلى تجارب", "en expériences", "インタラクティブな", "인터랙티브한"], "experiences.": ["experiences.", "体验。", "interactivas.", "تفاعلية.", "interactives.", "体験に。", "경험으로."], "Pembuka": ["Intro", "开场", "Introducción", "المقدمة", "Intro", "イントロ", "인트로"], "Portofolio 2026, Zikri, Front-End Developer dan UI Designer": ["Portfolio 2026, Zikri, Front-End Developer and UI Designer", "2026 作品集，Zikri，前端开发者与 UI 设计师", "Portafolio 2026, Zikri, desarrollador Front-End y diseñador UI", "معرض أعمال 2026، زكري، مطوّر واجهات أمامية ومصمم واجهات", "Portfolio 2026, Zikri, développeur Front-End et designer UI", "2026年ポートフォリオ、Zikri、フロントエンド開発者兼UIデザイナー", "2026 포트폴리오, 지크리, 프론트엔드 개발자 겸 UI 디자이너"], "Ganti ke mode gelap": ["Switch to dark mode", "切换到深色模式", "Cambiar a modo oscuro", "التبديل إلى الوضع الداكن", "Passer en mode sombre", "ダークモードに切り替え", "다크 모드로 전환"], "Ganti ke mode terang": ["Switch to light mode", "切换到浅色模式", "Cambiar a modo claro", "التبديل إلى الوضع الفاتح", "Passer en mode clair", "ライトモードに切り替え", "라이트 모드로 전환"], "Ilustrasi karakter, matanya mengikuti kursor": ["Character illustration whose eyes follow the cursor", "眼睛会跟随光标的角色插画", "Ilustración de un personaje cuyos ojos siguen el cursor", "رسم لشخصية تتبع عيناها المؤشر", "Illustration d’un personnage dont les yeux suivent le curseur", "目がカーソルを追うキャラクターのイラスト", "눈이 커서를 따라오는 캐릭터 일러스트"], "Karusel Kartu Radial": ["Radial card carousel", "环形卡片轮播", "Carrusel radial de tarjetas", "دوّار البطاقات الدائري", "Carrousel radial de cartes", "放射状カードカルーセル", "방사형 카드 캐러셀"], "Buka kartu Profil Zikri": ["Open Zikri’s profile card", "打开 Zikri 的个人资料卡片", "Abrir la tarjeta del perfil de Zikri", "افتح بطاقة الملف الشخصي لزكري", "Ouvrir la carte de profil de Zikri", "Zikri のプロフィールカードを開く", "지크리 프로필 카드 열기"], "Buka kartu Proyek Unggulan": ["Open the Featured Project card", "打开“精选项目”卡片", "Abrir la tarjeta del proyecto destacado", "افتح بطاقة المشروع المميز", "Ouvrir la carte du projet vedette", "「注目プロジェクト」カードを開く", "대표 프로젝트 카드 열기"], "Potret dengan sorot cahaya merah": ["Portrait lit by a red spotlight", "红色聚光灯下的肖像", "Retrato con un foco de luz roja", "صورة شخصية بإضاءة حمراء", "Portrait sous un projecteur rouge", "赤いスポットライトを浴びた肖像", "붉은 조명을 받은 인물 사진"], "Bermain gitar": ["Playing guitar", "弹吉他", "Tocando la guitarra", "يعزف على الغيتار", "Jouant de la guitare", "ギターを弾いている", "기타를 연주하는 모습"], "M. Zikri bermain gitar": ["M. Zikri playing guitar", "M. Zikri 在弹吉他", "M. Zikri tocando la guitarra", "M. Zikri يعزف على الغيتار", "M. Zikri jouant de la guitare", "M. Zikri がギターを弾いている", "엠. 지크리가 기타를 연주하는 모습"], "Foto": ["Photo", "照片", "Foto", "صورة", "Photo", "写真", "사진"], "Foto keahlian": ["Skills photo", "技能照片", "Foto de habilidades", "صورة المهارات", "Photo des compétences", "スキルの写真", "스킬 사진"], "Potret berkacamata hitam membaca koran di bawah langit biru": ["Portrait of a person in sunglasses reading a newspaper under a blue sky", "戴着墨镜、在蓝天下读报纸的肖像", "Retrato de una persona con gafas de sol leyendo un periódico bajo un cielo azul", "صورة لشخص بنظارة شمسية يقرأ جريدة تحت سماء زرقاء", "Portrait d’une personne en lunettes de soleil lisant un journal sous un ciel bleu", "青空の下、サングラスをかけて新聞を読む人物の肖像", "푸른 하늘 아래 선글라스를 끼고 신문을 읽는 인물 사진"], "Potret berjaket hitam dikelilingi koran yang beterbangan": ["Portrait of a person in a black jacket surrounded by flying newspapers", "身穿黑夹克、被漫天飞舞的报纸环绕的肖像", "Retrato de una persona con chaqueta negra rodeada de periódicos volando", "صورة لشخص بسترة سوداء تحيط به جرائد متطايرة", "Portrait d’une personne en veste noire entourée de journaux qui volent", "黒いジャケット姿で、舞い散る新聞に囲まれた人物の肖像", "검은 재킷을 입고 날아다니는 신문에 둘러싸인 인물 사진"], "Potret M. Zikri Al-Bukhori": ["Portrait of M. Zikri Al-Bukhori", "M. Zikri Al-Bukhori 的肖像", "Retrato de M. Zikri Al-Bukhori", "صورة M. Zikri Al-Bukhori", "Portrait de M. Zikri Al-Bukhori", "M. Zikri Al-Bukhori のポートレート", "엠. 지크리 알부카리의 초상 사진"], "Detail Kartu": ["Card details", "卡片详情", "Detalle de la tarjeta", "تفاصيل البطاقة", "Détails de la carte", "カードの詳細", "카드 상세"], "Pratinjau foto": ["Photo preview", "照片预览", "Vista previa de la foto", "معاينة الصورة", "Aperçu de la photo", "写真のプレビュー", "사진 미리보기"], "Tutup foto": ["Close photo", "关闭照片", "Cerrar foto", "إغلاق الصورة", "Fermer la photo", "写真を閉じる", "사진 닫기"], "Foto sebelumnya": ["Previous photo", "上一张照片", "Foto anterior", "الصورة السابقة", "Photo précédente", "前の写真", "이전 사진"], "Foto berikutnya": ["Next photo", "下一张照片", "Foto siguiente", "الصورة التالية", "Photo suivante", "次の写真", "다음 사진"], "Pindah kartu": ["Switch card", "切换卡片", "Cambiar de tarjeta", "تبديل البطاقة", "Changer de carte", "カードを切り替える", "카드 이동"], "Lagi sering kuputar.": ["On repeat lately.", "最近常听的歌。", "Lo que suena en bucle últimamente.", "ما أكرره هذه الأيام.", "Ce que j’écoute en boucle.", "最近よく聴いている曲。", "요즘 자주 듣는 노래."], "Pemutar musik": ["Music player", "音乐播放器", "Reproductor de música", "مشغّل الموسيقى", "Lecteur de musique", "音楽プレーヤー", "음악 플레이어"], "Lagu sebelumnya": ["Previous song", "上一首", "Canción anterior", "الأغنية السابقة", "Morceau précédent", "前の曲", "이전 곡"], "Putar atau jeda": ["Play or pause", "播放或暂停", "Reproducir o pausar", "تشغيل أو إيقاف مؤقت", "Lecture ou pause", "再生または一時停止", "재생 또는 일시정지"], "Lagu berikutnya": ["Next song", "下一首", "Canción siguiente", "الأغنية التالية", "Morceau suivant", "次の曲", "다음 곡"], "Posisi lagu": ["Song position", "歌曲进度", "Posición de la canción", "موضع الأغنية", "Position du morceau", "曲の再生位置", "곡 재생 위치"], "Suara": ["Volume", "音量", "Volumen", "مستوى الصوت", "Volume", "音量", "음량"], "Event": ["Event", "Event", "Event", "Event", "Event", "Event", "이벤트"], "Commit": ["Commit", "Commit", "Commit", "Commit", "Commit", "Commit", "커밋"], "Branch": ["Branch", "Branch", "Branch", "Branch", "Branch", "Branch", "브랜치"], "Pages": ["Pages", "Pages", "Pages", "Pages", "Pages", "Pages", "페이지"], "State": ["State", "State", "State", "State", "State", "State", "상태"], "Hooks": ["Hooks", "Hooks", "Hooks", "Hooks", "Hooks", "Hooks", "훅"], "Utility": ["Utility", "Utility", "Utility", "Utility", "Utility", "Utility", "유틸리티"], "Timeline": ["Timeline", "Timeline", "Timeline", "Timeline", "Timeline", "Timeline", "타임라인"], "Template": ["Template", "Template", "Template", "Template", "Template", "Template", "템플릿"], "Routing": ["Routing", "Routing", "Routing", "Routing", "Routing", "Routing", "라우팅"], "Controller": ["Controller", "Controller", "Controller", "Controller", "Controller", "Controller", "컨트롤러"], "Database": ["Database", "Database", "Database", "Database", "Database", "Database", "데이터베이스"], "Flexbox": ["Flexbox", "Flexbox", "Flexbox", "Flexbox", "Flexbox", "Flexbox", "플렉스박스"], "Grid": ["Grid", "Grid", "Grid", "Grid", "Grid", "Grid", "그리드"]}, ND={"FRAME": "GALERI", "Skill & Keahlian": "Keahlian & Kemampuan", "tool": "alat", "Semua tool": "Semua alat", "Lima belas tool,": "Lima belas alat,", "Tool dan AI yang saya pakai tiap hari untuk mengubah ide jadi halaman yang rapi dan enak dipakai.": "Alat dan AI yang saya pakai tiap hari untuk mengubah ide jadi halaman yang rapi dan enak dipakai.", "Front-end development & desain antarmuka": "Pengembangan front-end & desain antarmuka", "Playlist · 06 lagu": "Daftar putar · 06 lagu", "Event": "Peristiwa", "Commit": "Komit", "Branch": "Cabang", "Pages": "Halaman", "State": "Status", "Hooks": "Kait", "Utility": "Utilitas", "Timeline": "Lini masa", "Template": "Templat", "Routing": "Perutean", "Controller": "Pengendali", "Database": "Basis data", "Port": "Porto", "folio.": "folio.", "> Front-End Developer": "> Pengembang Front-End", "& UI Designer": "& Desainer UI", "Build.": "Bangun.", "Design.": "Rancang.", "Innovate.": "Berinovasi.", "Turning ideas": "Mengubah ide", "into interactive": "jadi pengalaman", "experiences.": "yang interaktif.", "Portofolio 2026, Zikri, Front-End Developer dan UI Designer": "Portofolio 2026, Zikri, Pengembang Front-End dan Desainer UI", "Menyusun struktur halaman yang rapi, lalu menata layout responsif dengan Flexbox, Grid, dan animasi CSS.": "Menyusun struktur halaman yang rapi, lalu menata tata letak responsif dengan Flexbox, Grid, dan animasi CSS.", "Menambah interaksi seperti klik, gestur, dan animasi halus dengan memanipulasi tampilan langsung di browser.": "Menambah interaksi seperti klik, gestur, dan animasi halus dengan memanipulasi tampilan langsung di peramban.", "Masih tahap belajar. Fokus saya di reaktivitas data dan cara menyusun komponen dengan template.": "Masih tahap belajar. Fokus saya di reaktivitas data dan cara menyusun komponen dengan templat.", "Dimuat cepat dan tidak menumpuk library yang sebenarnya tidak perlu.": "Dimuat cepat dan tidak menumpuk pustaka yang sebenarnya tidak perlu.", "Kontras jelas, tombol cukup besar untuk jari, dan bisa dioperasikan lewat keyboard.": "Kontras jelas, tombol cukup besar untuk jari, dan bisa dioperasikan lewat papan ketik.", "Menyusun tampilan yang bersih, elegan, dan mobile-first.": "Menyusun tampilan yang bersih, elegan, dan mengutamakan layar HP.", "Memastikan tampilan nyaman dipakai semua orang, termasuk lewat keyboard.": "Memastikan tampilan nyaman dipakai semua orang, termasuk lewat papan ketik.", "Apa stack favorit untuk proyek kecil?": "Apa susunan teknologi favorit untuk proyek kecil?", "Bisa. Saya terbuka untuk freelance, proyek bersama, dan diskusi seputar pengembangan web dan desain antarmuka.": "Bisa. Saya terbuka untuk kerja lepas, proyek bersama, dan diskusi seputar pengembangan web dan desain antarmuka.", "Terbuka untuk tawaran kerja freelance, proyek kolaboratif, maupun diskusi seputar pengembangan web dan desain antarmuka.": "Terbuka untuk tawaran kerja lepas, proyek kolaboratif, maupun diskusi seputar pengembangan web dan desain antarmuka.", "Back-End": "Sisi Server", "AI Prompting": "Perintah AI", "Penjelasan skill": "Penjelasan keahlian", "Skill sebelumnya": "Keahlian sebelumnya", "Skill berikutnya": "Keahlian berikutnya", "Buka kartu Story": "Buka kartu Cerita", "Buka kartu Music": "Buka kartu Musik", "Buka kartu Frame": "Buka kartu Galeri"}, KOF={"Tool dan AI yang saya pakai tiap hari untuk mengubah ide jadi halaman yang rapi dan enak dipakai.": "제가 매일 쓰는 도구와 AI로, 아이디어를 깔끔하고 쓰기 편한 페이지로 바꿉니다.", "Cincin di tangan itu kotak alat saya. Tekan satu ikon, lepas, lalu baca cerita saya dengannya.": "손에 낀 반지는 제 도구 상자예요. 아이콘 하나를 누르고 놓은 다음, 그 도구와 함께한 제 이야기를 읽어 보세요.", "Tools": "도구", "AI Assistant": "AI 어시스턴트", "Web Stack": "웹 스택", "Lima belas tool,": "열다섯 가지 도구,", "semuanya pernah bikin begadang": "모두 밤샘을 하게 만들었던 것들", "Ketuk kartu mana pun. Saya tulis apa adanya, termasuk yang masih bikin bingung.": "아무 카드나 눌러 보세요. 아직 헷갈리는 부분까지 있는 그대로 적었어요.", "Jujur,": "솔직히,", "seberapa jago saya?": "저는 얼마나 잘할까요?", "Ini angka hari ini, bukan target. Akan naik seiring proyek.": "오늘 기준의 숫자일 뿐 목표가 아니에요. 프로젝트를 할수록 올라갈 거예요.", "Aturan main": "작업 원칙", "yang tidak saya langgar": "제가 어기지 않는 것들", "Dari coretan": "낙서에서", "sampai tayang": "공개까지", "Yang masih": "아직도", "bikin penasaran": "궁금한 것들", "Pertanyaan": "질문", "yang sering mampir": "자주 받는", "Kenapa saya betah": "계속하게 되는 이유", "Yang saya kerjakan dengannya": "이걸로 하는 일", "Tips": "팁", "Teman setianya": "늘 함께하는 짝꿍", "Tekan & lepas ikon · geser ke bawah": "아이콘을 눌렀다 놓기 · 아래로 스와이프", "Antarmuka rapi & responsif": "깔끔하고 반응형인 인터페이스", "Bersih, lega, konsisten": "깨끗하고 여유롭고 일관된", "AI jadi partner berpikir": "생각을 나누는 파트너, AI", "Web Ringan": "가벼운 웹", "Cepat dimuat di HP": "휴대폰에서도 빠르게 로딩", "Front-End": "프론트엔드", "UI Design": "UI 디자인", "AI Workflow": "AI 워크플로", "Front-End · UI Design · AI Workflow": "프론트엔드 · UI 디자인 · AI 워크플로", "Semua": "전체", "Animasi": "애니메이션", "Back-End": "백엔드", "AI": "AI", "Dasar": "기초", "Berkembang": "성장 중", "Menengah": "중급", "Mahir": "숙련", "Ahli": "전문가", "Markup Language": "마크업 언어", "Styling Language": "스타일링 언어", "CSS Framework": "CSS 프레임워크", "Front-End Framework": "프론트엔드 프레임워크", "Animation Library": "애니메이션 라이브러리", "PHP Framework": "PHP 프레임워크", "Front-End Library": "프론트엔드 라이브러리", "Code Editor": "코드 에디터", "Version Control": "버전 관리", "Menyusun struktur halaman yang rapi, lalu menata layout responsif dengan Flexbox, Grid, dan animasi CSS.": "깔끔한 페이지 구조를 짜고, Flexbox와 Grid, CSS 애니메이션으로 반응형 레이아웃을 구성합니다.", "Merancang tampilan yang bersih dan elegan dengan hierarki jelas, spasi lega, dan warna yang konsisten.": "명확한 위계, 여유로운 여백, 일관된 색으로 깔끔하고 우아한 화면을 설계합니다.", "Layout": "레이아웃", "Tipografi": "타이포그래피", "Warna": "색상", "AI Prompting": "AI 프롬프트", "Menulis instruksi yang jelas dan bertahap supaya AI memberi hasil tepat sasaran, lalu memeriksa hasilnya sendiri.": "AI가 정확한 결과를 내도록 명확하고 단계적인 지시문을 쓰고, 결과는 직접 검토합니다.", "Konteks": "맥락", "Iterasi": "반복 개선", "Verifikasi": "검증", "Menambah interaksi seperti klik, gestur, dan animasi halus dengan memanipulasi tampilan langsung di browser.": "브라우저에서 화면을 직접 조작해 클릭, 제스처, 부드러운 애니메이션 같은 인터랙션을 더합니다.", "Masih tahap berkembang. Fokus saya sekarang di cara membagi komponen dan mengatur alur data.": "아직 성장 단계예요. 지금은 컴포넌트를 나누는 법과 데이터 흐름을 다루는 데 집중하고 있어요.", "Komponen": "컴포넌트", "Menyusun tampilan responsif dengan cepat lewat utility class dan komponen siap pakai, lalu disesuaikan supaya punya karakter sendiri.": "유틸리티 클래스와 기성 컴포넌트로 반응형 화면을 빠르게 만들고, 저만의 개성이 드러나도록 다듬습니다.", "Animasi Web": "웹 애니메이션", "Menghidupkan halaman dengan GSAP dan Anime.js: urutan animasi, gerakan saat digulir, dan easing yang halus.": "GSAP와 Anime.js로 페이지에 생동감을 줍니다. 애니메이션 순서, 스크롤에 따른 움직임, 부드러운 이징까지.", "Masih tahap belajar. Fokus saya di reaktivitas data dan cara menyusun komponen dengan template.": "아직 배우는 단계예요. 데이터 반응성과 템플릿으로 컴포넌트를 구성하는 데 집중하고 있어요.", "Reaktivitas": "반응성", "Baru mulai. Saya belajar routing, controller, dan database supaya paham sisi server di balik tampilan.": "막 시작했어요. 화면 뒤의 서버 쪽을 이해하려고 라우팅, 컨트롤러, 데이터베이스를 배우고 있어요.", "Bersih": "깔끔함", "Tampilan lega dan tidak ramai, supaya mata langsung tahu harus melihat ke mana.": "화면이 여유롭고 복잡하지 않아서, 눈이 어디를 봐야 할지 바로 알 수 있어요.", "Ringan": "가벼움", "Dimuat cepat dan tidak menumpuk library yang sebenarnya tidak perlu.": "빠르게 로딩되고, 정말 필요 없는 라이브러리는 쌓아 두지 않아요.", "Mobile-First": "모바일 우선", "Dirancang dari layar kecil lebih dulu, lalu dilebarkan untuk layar yang besar.": "작은 화면부터 먼저 설계한 다음, 큰 화면에 맞게 넓힙니다.", "Nyaman Dipakai": "쓰기 편함", "Kontras jelas, tombol cukup besar untuk jari, dan bisa dioperasikan lewat keyboard.": "대비가 분명하고, 버튼은 손가락으로 누르기에 충분히 크며, 키보드로도 조작할 수 있어요.", "Riset": "리서치", "Memahami kebutuhan dan pengguna sebelum menyentuh kode.": "코드를 만지기 전에 필요와 사용자를 먼저 이해합니다.", "Saya mulai dengan bertanya: siapa yang memakai, untuk apa, dan apa yang paling penting bagi mereka. Referensi dikumpulkan dulu supaya arah desain tidak meraba-raba.": "누가 쓰는지, 무엇을 위해 쓰는지, 그들에게 가장 중요한 게 무엇인지 먼저 묻는 것부터 시작해요. 디자인 방향이 헤매지 않도록 레퍼런스를 먼저 모읍니다.", "Tujuan": "목표", "Pengguna": "사용자", "Referensi": "레퍼런스", "Desain": "디자인", "Menyusun tampilan yang bersih, elegan, dan mobile-first.": "깔끔하고 우아하며 모바일 우선인 화면을 구성합니다.", "Sketsa kasar dibuat dulu, lalu dirapikan jadi pilihan warna, huruf, dan jarak yang konsisten. Layar ponsel jadi acuan utama.": "먼저 대략적인 스케치를 만든 뒤, 일관된 색, 글꼴, 간격으로 다듬어요. 휴대폰 화면이 주된 기준이에요.", "Sketsa": "스케치", "Bangun": "구축", "Menulis front-end yang ringan, dengan AI sebagai partner berpikir.": "가벼운 프론트엔드를 만들고, AI는 생각을 나누는 파트너로 씁니다.", "Kode ditulis bertahap dan diuji di setiap langkah. AI membantu menjelaskan dan meninjau, sementara keputusan akhirnya tetap di tangan saya.": "코드는 단계적으로 쓰고 매 단계마다 테스트해요. AI는 설명과 검토를 돕고, 최종 결정은 제가 합니다.", "Review AI": "AI 검토", "Rilis": "출시", "Publikasi lewat GitHub Pages, lalu dirapikan dari masukan.": "GitHub Pages로 공개한 뒤, 받은 피드백으로 다듬습니다.", "Setelah tayang, saya mengecek di beberapa ukuran layar dan perangkat, lalu memperbaiki hal kecil yang baru terlihat saat dipakai.": "공개한 뒤에는 여러 화면 크기와 기기에서 확인하고, 실제로 써 봐야 보이는 사소한 부분을 고칩니다.", "Uji Layar": "화면 테스트", "Revisi": "수정", "React lanjutan": "React 심화", "Pola komponen yang lebih rapi dan pengelolaan state di proyek yang lebih besar.": "더 큰 프로젝트에서 더 깔끔한 컴포넌트 패턴과 상태 관리를 익히고 싶어요.", "JavaScript modern": "최신 JavaScript", "Animasi yang halus, penanganan gestur, dan cara menjaga performa.": "부드러운 애니메이션, 제스처 처리, 성능을 유지하는 방법.", "Alur kerja Git": "Git 작업 흐름", "Memakai branch dan commit yang tertata supaya riwayat proyek mudah dibaca.": "브랜치와 커밋을 잘 정리해서 프로젝트 기록을 읽기 쉽게 만들어요.", "Aksesibilitas web": "웹 접근성", "Memastikan tampilan nyaman dipakai semua orang, termasuk lewat keyboard.": "키보드를 포함해 누구에게나 편한 화면인지 확인합니다.", "Animasi dengan GSAP": "GSAP 애니메이션", "Menyusun timeline dan animasi saat halaman digulir tanpa mengorbankan performa.": "성능을 희생하지 않으면서 타임라인과 스크롤 애니메이션을 구성합니다.", "Dasar Laravel dan Vue": "Laravel과 Vue 기초", "Memahami alur data dari server ke tampilan, dari routing sampai komponen.": "서버에서 화면까지 데이터가 어떻게 흐르는지, 라우팅부터 컴포넌트까지 이해하고 싶어요.", "Kenapa memakai banyak asisten AI?": "왜 AI 어시스턴트를 여러 개 쓰나요?", "Setiap AI punya kelebihan masing-masing. Saya membandingkan jawabannya, lalu memutuskan sendiri mana yang paling masuk akal untuk kasus saya.": "AI마다 강점이 달라요. 답변을 서로 비교해 본 뒤, 제 경우에 가장 맞는 것을 제가 직접 결정해요.", "Apakah semua kode dibuat oleh AI?": "코드를 전부 AI가 만드나요?", "AI membantu menjelaskan, memberi alternatif, dan meninjau. Struktur, keputusan desain, dan pengujian hasil akhirnya tetap saya yang pegang.": "AI는 설명하고, 대안을 제시하고, 검토하는 걸 도와줘요. 구조, 디자인 결정, 최종 결과 테스트는 제가 맡아요.", "Apa stack favorit untuk proyek kecil?": "작은 프로젝트에 즐겨 쓰는 스택은 무엇인가요?", "HTML, CSS, dan JavaScript yang dipublikasikan lewat GitHub Pages. Ringan, murah, dan mudah dirawat tanpa server database.": "GitHub Pages로 공개하는 HTML, CSS, JavaScript예요. 가볍고, 저렴하고, 데이터베이스 서버 없이도 관리하기 쉬워요.", "Bisa diajak kolaborasi?": "협업도 가능한가요?", "Bisa. Saya terbuka untuk freelance, proyek bersama, dan diskusi seputar pengembangan web dan desain antarmuka.": "네. 프리랜서 작업, 공동 프로젝트, 웹 개발과 인터페이스 디자인에 관한 논의에 열려 있어요."}, WORD={"id": "PORTOFOLIO", "en": "PORTFOLIO", "zh": "作品集", "es": "PORTAFOLIO", "ar": "معرض الأعمال", "fr": "PORTFOLIO", "ja": "ポートフォリオ", "ko": "포트폴리오"}, DT={"id": "M. Zikri Al-Bukhori — Portofolio", "en": "M. Zikri Al-Bukhori — Portfolio", "zh": "M. Zikri Al-Bukhori — 作品集", "es": "M. Zikri Al-Bukhori — Portafolio", "ar": "M. Zikri Al-Bukhori — معرض الأعمال", "fr": "M. Zikri Al-Bukhori — Portfolio", "ja": "M. Zikri Al-Bukhori — ポートフォリオ", "ko": "엠. 지크리 알부카리 — 포트폴리오"};
  Object.keys(NT).forEach(function(k){T[k]=NT[k];});
  Object.keys(ND).forEach(function(k){D[k]=ND[k];});
  delete D["Port"];
  D["to my"] = "di ruang karya";
  D["SKILL"] = "SKILL";
  D["FRAME"] = "FRAME";
  Object.keys(KOF).forEach(function(k){if(T[k])T[k][6]=KOF[k];});
  /* Additional complete 8-language translations for updated About (Me), Hero, Cards, Frame, Music, Projects & Contact */
  Object.assign(D, {
    "Edisi Pilihan • 2026": "Edisi Pilihan • 2026",
    "Ruang Karya": "Ruang Karya",
    "Creative Front-End Developer & UI Designer": "Creative Front-End Developer & Desainer UI"
  });
  Object.assign(T, {
    "Edisi Pilihan • 2026": ["Selected Edition • 2026", "精选特辑 • 2026", "Edición Seleccionada • 2026", "إصدار مختار • 2026", "Édition Sélectionnée • 2026", "セレクテッド・エディション • 2026", "셀렉티드 에디션 • 2026"],
    "Ruang Karya": ["Creative Space", "创意作品空间", "Espacio Creativo", "مساحة الإبداع", "Espace Créatif", "クリエイティブ空間", "크리에이티브 공간"],
    "Creative Front-End Developer & UI Designer": ["Creative Front-End Developer & UI Designer", "创意前端开发者与 UI 设计师", "Desarrollador Front-End Creativo y Diseñador UI", "مطوّر واجهات أمامية إبداعي ومصمم UI", "Développeur Front-End Créatif & Designer UI", "クリエイティブ・フロントエンド開発者 & UIデザイナー", "크리에이티브 프론트엔드 개발자 & UI 디자이너"],
    "to my": ["to my space", "我的作品空间", "a mi espacio", "في مساحة أعمالي", "dans mon espace", "私の制作空間へ", "나의 작업 공간에"],
    "Jurnal": ["Journal", "历程", "Diario", "السيرة", "Journal", "ジャーナル", "저널"],
    "Audio": ["Audio", "音乐", "Audio", "صوتيات", "Audio", "オーディオ", "오디오"],
    "Profil": ["Profile", "简介", "Perfil", "الملف", "Profil", "プロフィール", "프로필"],
    "Visual": ["Visual", "视觉", "Visual", "مرئيات", "Visuel", "ビジュアル", "비주얼"],
    "Stack": ["Stack", "技术", "Stack", "التقنيات", "Stack", "スタック", "스택"],
    "Karya": ["Works", "作品", "Obras", "أعمال", "Projets", "ワークス", "작업물"],
    "Koneksi": ["Connect", "联系", "Conexión", "تواصل", "Contact", "コネクト", "커넥트"],
    "Pengalaman Industri": ["Industry Experience", "行业实践", "Experiencia en la industria", "الخبرة العملية", "Expérience en entreprise", "実務経験", "실무 경험"],
    "PKL di DigitalCODE (Web & UI)": ["Internship (PKL) at DigitalCODE (Web & UI)", "DigitalCODE 职场实习 (Web & UI)", "Prácticas (PKL) en DigitalCODE (Web & UI)", "تدريب ميداني في DigitalCODE (ويب وواجهات)", "Stage (PKL) chez DigitalCODE (Web & UI)", "DigitalCODE での実務インターン (Web & UI)", "DigitalCODE 현장 실습 (Web & UI)"],
    "Pendidikan": ["Education", "教育背景", "Educación", "التعليم", "Formation", "学歴", "학력"],
    "SMK Swasta Mandiri — Medan": ["SMK Swasta Mandiri — Medan", "SMK Swasta Mandiri 职业高中 — 棉兰", "SMK Swasta Mandiri — Medan", "ثانوية SMK Swasta Mandiri — ميدان", "SMK Swasta Mandiri — Medan", "SMK Swasta Mandiri — メダン", "SMK Swasta Mandiri — 메단"],
    "Teknologi & Keahlian Utama": ["Core Technologies & Skills", "核心技术与专长", "Tecnologías y habilidades clave", "التقنيات والمهارات الأساسية", "Technologies et compétences clés", "主要技術・コアスキル", "핵심 기술 및 역량"],
    "Lihat Proyek Unggulan": ["View Featured Projects", "查看精选项目", "Ver proyectos destacados", "عرض المشاريع المميزة", "Voir les projets phares", "注目プロジェクトを見る", "대표 프로젝트 보기"],
    "Hubungi saya": ["Contact me", "联系我", "Contáctame", "تواصل معي", "Me contacter", "お問い合わせ", "문의하기"],
    "Prinsip saya:": ["My principle:", "我的原则：", "Mi principio:", "مبدئي:", "Mon principe :", "私の信条：", "제 원칙:"],
    "Senang mengeksplorasi teknologi baru, merancang tata letak yang bersih, serta menerjemahkan ide kreatif menjadi kode yang solid dan interaktif.": ["I enjoy exploring modern web technologies, crafting clean editorial layouts, and translating creative ideas into solid, interactive code.", "我热衷于探索前沿网络技术、设计简洁优雅的版面，并将创意构想转化为稳健且富有互动感的代码。", "Disfruto explorando nuevas tecnologías web, diseñando maquetaciones limpias y traduciendo ideas creativas en código sólido e interactivo.", "أستمتع باستكشاف تقنيات الويب الحديثة، وتصميم تخطيطات نظيفة، وترجمة الأفكار الإبداعية إلى كود متين وتفاعلي.", "J’aime explorer les nouvelles technologies web, concevoir des mises en page épurées et traduire des idées créatives en un code solide et interactif.", "新しいWeb技術を探求し、洗練されたレイアウトを設計し、クリエイティブな発想を堅牢でインタラクティブなコードへと形にすることを楽しんでいます。", "새로운 웹 기술을 탐구하고 깔끔한 레이아웃을 설계하며, 창의적인 아이디어를 탄탄하고 인터랙티브한 코드로 구현하는 것을 좋아합니다."],
    "Cincin 3D": ["3D Ring", "3D 环廊", "Anillo 3D", "حلقة ثلاثية الأبعاد", "Anneau 3D", "3Dリング", "3D 링"],
    "Grid Editorial": ["Editorial Grid", "画廊网格", "Cuadrícula editorial", "شبكة المعرض", "Grille éditoriale", "グリッド表示", "에디토리얼 그리드"],
    "Perbesar Foto": ["Expand Photo", "放大照片", "Ampliar foto", "تكبير الصورة", "Agrandir la photo", "写真を拡大", "사진 확대"],
    "Suara Synth": ["Synth Audio", "合成音效", "Audio Synth", "صوت سينث", "Audio Synth", "シンセ音", "신스 사운드"],
    "Aktif": ["On", "开启", "Activo", "مفعّل", "Activé", "ON", "켜짐"],
    "Bisu": ["Muted", "静音", "Silencio", "صامت", "Muet", "ミュート", "음소거"],
    "Mode Studio Interaktif": ["Interactive Studio Mode", "交互式录音室模式", "Modo Estudio Interactivo", "وضع الاستوديو التفاعلي", "Mode Studio Interactif", "インタラクティブ・スタジオ", "인터랙티브 스튜디오 모드"],
    "Lihat Semua Proyek": ["All Projects", "全部项目", "Todos los proyectos", "جميع المشاريع", "Tous les projets", "全プロジェクト一覧", "전체 프로젝트"],
    "Studi Kasus": ["Case Study", "案例研究", "Caso de estudio", "دراسة حالة", "Étude de cas", "ケーススタディ", "케이스 스터디"],
    "Peran": ["Role", "角色", "Rol", "الدور", "Rôle", "担当", "역할"],
    "Tahun": ["Year", "年份", "Año", "السنة", "Année", "制作年", "연도"],
    "Teknologi": ["Tech Stack", "技术栈", "Tecnologías", "التقنيات", "Technologies", "使用技術", "기술 스택"],
    "Dilihat dari dekat": ["Closer inspection", "细节特写", "Vista de cerca", "نظرة عن قرب", "Vu de près", "ディテール解説", "디테일 클로즈업"],
    "Warna yang dipakai": ["Color palette", "配色方案", "Paleta de colores", "لوحة الألوان", "Palette de couleurs", "カラーパレット", "컬러 팔레트"],
    "Ketuk warna untuk menyalin kode HEX": ["Tap any swatch to copy HEX code", "点击色块复制 HEX 色值", "Toca un color para copiar el código HEX", "اضغط على اللون لنسخ كود HEX", "Touchez une couleur pour copier le code HEX", "色をタップしてHEXコードをコピー", "색상을 탭하여 HEX 코드 복사"],
    "Isi halaman": ["Page architecture", "页面架构", "Estructura de la página", "بنية الصفحة", "Architecture de la page", "ページ構成", "페이지 구조"],
    "Lihat situs": ["Visit live site", "访问在线网站", "Visitar sitio web", "زيارة الموقع المباشر", "Visiter le site", "ライブサイトを見る", "라이브 사이트 방문"],
    "Perbesar layar": ["Fullscreen view", "全屏预览", "Vista completa", "عرض ملء الشاشة", "Plein écran", "フルスクリーン表示", "전체 화면 보기"],
    "Proyek berikutnya": ["Next project", "下一个项目", "Siguiente proyecto", "المشروع التالي", "Projet suivant", "次のプロジェクト", "다음 프로젝트"],
    "Semua Proyek Unggulan": ["All Featured Projects", "全部精选项目", "Todos los proyectos destacados", "جميع المشاريع المميزة", "Tous les projets phares", "注目プロジェクト一覧", "전체 대표 프로젝트"],
    "Baca Studi Kasus": ["Read Case Study", "阅读案例", "Leer caso", "اقرأ الدراسة", "Lire l’étude", "詳細を見る", "케이스 스터디 읽기"],
    "Buka Demo ↗": ["Live Demo ↗", "在线演示 ↗", "Demo en vivo ↗", "عرض مباشر ↗", "Démo live ↗", "ライブデモ ↗", "라이브 데모 ↗"],
    "Tutup": ["Close", "关闭", "Cerrar", "إغلاق", "Fermer", "閉じる", "닫기"],
    "Salin Email": ["Copy Email", "复制邮箱", "Copiar correo", "نسخ البريد", "Copier l’e-mail", "メールをコピー", "이메일 복사"],
    "Tersalin!": ["Copied!", "已复制！", "¡Copiado!", "تم النسخ!", "Copié !", "コピーしました！", "복사됨!"]
  });
  Object.assign(H, {
    "Halo, saya M. Zikri Al-Bukhori, seorang Front-End Developer & UI Designer yang berdomisili di Medan, Sumatera Utara. Saya berfokus pada perancangan antarmuka web modern yang responsif, rapi, dan mudah digunakan.": [
      "Hello, I’m <strong>M. Zikri Al-Bukhori</strong>, a <strong>Front-End Developer &amp; UI Designer</strong> based in <strong>Medan, North Sumatra</strong>. I focus on crafting modern web interfaces that are responsive, clean, and effortless to use.",
      "你好，我是 <strong>M. Zikri Al-Bukhori</strong>，一名常驻<strong>印尼北苏门答腊省棉兰</strong>的<strong>前端开发者与 UI 设计师</strong>。我专注于打造现代、响应式、整洁且好用的网页界面。",
      "Hola, soy <strong>M. Zikri Al-Bukhori</strong>, <strong>Desarrollador Front-End y Diseñador UI</strong> radicado en <strong>Medan, Sumatra del Norte</strong>. Me enfoco en diseñar interfaces web modernas, adaptables, limpias y fáciles de usar.",
      "مرحبًا، أنا <strong>M. Zikri Al-Bukhori</strong>، <strong>مطوّر واجهات أمامية ومصمم UI</strong> مقيم في <strong>ميدان، شمال سومطرة</strong>. أركّز على تصميم واجهات ويب حديثة ومتجاوبة وأنيقة وسهلة الاستخدام.",
      "Bonjour, je suis <strong>M. Zikri Al-Bukhori</strong>, <strong>Développeur Front-End &amp; Designer UI</strong> basé à <strong>Medan, Sumatra du Nord</strong>. Je conçois des interfaces web modernes, réactives, soignées et intuitives.",
      "こんにちは、<strong>北スマトラ・メダン</strong>を拠点に活動する<strong>フロントエンド開発者・UIデザイナー</strong>の <strong>M. Zikri Al-Bukhori</strong> です。レスポンシブで美しく、使いやすいモダンなWebインターフェースの設計に注力しています。",
      "안녕하세요, <strong>북수마트라 메단</strong>에서 활동하는 <strong>프론트엔드 개발자 &amp; UI 디자이너</strong> <strong>엠. 지크리 알부카리</strong>입니다. 반응형이고 깔끔하며 사용하기 편한 모던 웹 인터페이스를 설계하고 구현합니다."
    ],
    "Prinsip saya: Mengutamakan kualitas visual, performa kode, dan pengalaman pengguna yang optimal.": [
      "<span>My principle:</span> Prioritizing visual craft, code performance, and an optimal user experience.",
      "<span>我的原则：</span> 坚持视觉品质、代码性能与最佳用户体验并重。",
      "<span>Mi principio:</span> Priorizar la calidad visual, el rendimiento del código y una experiencia de usuario óptima.",
      "<span>مبدئي:</span> إعطاء الأولوية للجودة البصرية، وأداء الكود، وتجربة المستخدم المثالية.",
      "<span>Mon principe :</span> Donner la priorité à la qualité visuelle, à la performance du code et à une expérience utilisateur optimale.",
      "<span>私の信条：</span> ビジュアルの品質、コードのパフォーマンス、そして最適なユーザー体験を最優先にすること。",
      "<span>제 원칙:</span> 시각적 완성도, 코드 퍼포먼스, 그리고 최적의 사용자 경험을 최우선으로 합니다."
    ]
  });
  /* FRAME huruf besar mengikuti terjemahan "Frame" */
  if(T["Frame"])T["FRAME"]=T["Frame"].map(function(x){return x.toUpperCase();});
  /* aria "Buka kartu X" mengikuti nama kartu tiap bahasa */
  var OPEN={en:"Open the {} card",zh:"打开“{}”卡片",es:"Abrir la tarjeta {}",ar:"افتح بطاقة {}",fr:"Ouvrir la carte {}",ja:"「{}」カードを開く",ko:"{} 카드 열기"};
  var LN=["en","zh","es","ar","fr","ja","ko"];
  [["Buka kartu Story","Story"],["Buka kartu Music","Music"],["Buka kartu Frame","Frame"],["Buka kartu Keahlian","Keahlian"],["Buka kartu Kontak","Kontak"]].forEach(function(p){
    var nm=T[p[1]]||T["Skill"]; if(!nm)return;
    T[p[0]]=LN.map(function(l,i){return OPEN[l].replace("{}",nm[i]);});
  });
  /* Isian Korea: nama pada paragraf Perkenalan ditulis dengan Hangul */
  Object.keys(H).forEach(function(k){if(H[k][6])H[k][6]=H[k][6].split("M. Zikri Al-Bukhori").join("엠. 지크리 알부카리");});
  /* Tanpa jatuh balik ke bahasa Inggris: kalau belum ada terjemahannya, teks asli dipertahankan */
  window.__zkWORD=WORD; window.__zkDT=DT;
})();
/* Terjemahan tambahan (en, zh, es, ar, fr, ja, ko) */
Object.assign(T,{"Balikkan kartu ke sisi belakang": ["Flip the card to its back side", "将卡片翻到背面", "Girar la tarjeta al reverso", "اقلب البطاقة إلى الوجه الخلفي", "Retourner la carte côté verso", "カードを裏面に返す", "카드를 뒷면으로 뒤집기"], "Balikkan kartu ke sisi depan": ["Flip the card to its front side", "将卡片翻到正面", "Girar la tarjeta al anverso", "اقلب البطاقة إلى الوجه الأمامي", "Retourner la carte côté recto", "カードを表面に返す", "카드를 앞면으로 뒤집기"], "Dan perjalanan saya masih terus berlanjut.": ["And my journey is still going.", "我的旅程仍在继续。", "Y mi camino sigue adelante.", "ورحلتي لا تزال مستمرة.", "Et mon parcours continue.", "そして、私の旅はまだ続いています。", "그리고 저의 여정은 아직 계속되고 있습니다."], "Punya halaman yang perlu dirombak?": ["Have a page that needs a rework?", "有需要改版的页面吗？", "¿Tienes una página que necesita un rediseño?", "هل لديك صفحة تحتاج إلى إعادة تصميم؟", "Une page à refondre ?", "作り直したいページはありますか？", "개편이 필요한 페이지가 있나요?"], "Judul, deskripsi singkat, dan dua tombol dengan fungsi berbeda.": ["A headline, a short description, and two buttons with different jobs.", "标题、简短说明，以及两个功能不同的按钮。", "Un título, una descripción breve y dos botones con funciones distintas.", "عنوان ووصف قصير وزران لكلٍّ منهما وظيفة مختلفة.", "Un titre, une courte description et deux boutons aux fonctions différentes.", "見出し、短い説明、役割の異なる2つのボタン。", "제목, 짧은 설명, 그리고 역할이 다른 두 개의 버튼."], "Tiga angka performa di bagian bawah.": ["Three performance figures at the bottom.", "底部的三个性能数据。", "Tres cifras de rendimiento en la parte inferior.", "ثلاثة أرقام للأداء في الأسفل.", "Trois chiffres de performance en bas.", "下部に並ぶ3つのパフォーマンス数値。", "하단의 성능 수치 세 가지."], "Minta beberapa alternatif sekaligus, lalu pilih dan gabungkan sendiri bagian yang paling pas.": ["Ask for several alternatives at once, then pick and combine the best parts yourself.", "一次要求几个方案，再自己挑选并组合最合适的部分。", "Pide varias alternativas a la vez y luego elige y combina tú mismo las partes que mejor encajen.", "اطلب عدة بدائل دفعة واحدة، ثم اختر ودمج بنفسك الأجزاء الأنسب.", "Demandez plusieurs alternatives à la fois, puis choisissez et combinez vous-même les meilleures parties.", "複数の案をまとめて出してもらい、いちばん合う部分を自分で選んで組み合わせます。", "여러 대안을 한꺼번에 요청한 뒤, 가장 알맞은 부분을 직접 골라 조합하세요."], "Halaman depan Sweet Heaven: judul serif putih di latar krem dengan tombol emas": ["Sweet Heaven homepage: a white serif headline on a cream background with a gold button", "Sweet Heaven 首页：奶油色背景上的白色衬线标题和金色按钮", "Página de inicio de Sweet Heaven: título serif blanco sobre fondo crema con un botón dorado", "الصفحة الرئيسية لـ Sweet Heaven: عنوان أبيض بخط سيريف على خلفية كريمية مع زر ذهبي", "Page d’accueil de Sweet Heaven : titre serif blanc sur fond crème avec un bouton doré", "Sweet Heaven のトップページ：クリーム色の背景に白いセリフ体の見出しと金色のボタン", "Sweet Heaven 홈페이지: 크림색 배경 위의 흰색 세리프 제목과 금색 버튼"]});

(function(){
  function setTitle(){
    var l=(window.ZK&&ZK.lang)||"id",W=window.__zkWORD||{},w=W[l]||W.id||"PORTOFOLIO";
    var h=document.querySelector(".title"),box=h&&h.querySelector(".t1");
    if(box&&box.getAttribute("data-zl")!==l){
      var parts=l==="ar"?w.split(" "):Array.from(w);
      box.innerHTML=parts.map(function(c,i){return '<i style="--i:'+i+'">'+c+'</i>';}).join("");
      box.setAttribute("data-zl",l);
      h.style.letterSpacing=l==="ar"?"0":"";
    }
    var D2=window.__zkDT||{};document.title=D2[l]||D2.id||document.title;
  }
  window.addEventListener("zk-lang",setTitle);
})();
var ZK=window.ZK={lang:lang,t:t};
var R=new WeakMap(),RH=new WeakMap(),AT=["aria-label","alt","title"];
function txt(n,l){var c=n.nodeValue,r=R.get(n),o=r&&c===r.t?r.o:c;if(!K(o))return;
  var m=o.match(/^(\s*)([\s\S]*?)(\s*)$/),x=t(o,l),out=x?m[1]+x+m[3]:o;
  if(out!==c)n.nodeValue=out;R.set(n,{o:o,t:out});}
function att(e,l){var r=R.get(e)||{};R.set(e,r);AT.forEach(function(a){var c=e.getAttribute(a);if(c==null)return;
  var q=r[a],o=q&&c===q.t?q.o:c,x=t(o,l),out=x||o;if(out!==c)e.setAttribute(a,out);r[a]={o:o,t:out};});}
function walk(root,l){if(!root)return;if(root.nodeType===3){txt(root,l);return;}if(root.nodeType!==1)return;
  var tg=root.nodeName;if(tg==="SCRIPT"||tg==="STYLE"||tg==="TEXTAREA")return;if((tg==="P"||tg==="BLOCKQUOTE")&&root.children.length<5&&!root.querySelector("svg,img")){
    var h=RH.get(root),cur=root.innerHTML,o=h&&cur===h.t?h.o:cur,k=h&&cur===h.t?h.k:K(root.textContent);
    if(H[k]){var x=l==="id"?null:(H[k][I[l]]||H[k][0]),out=x||o;if(out!==cur)root.innerHTML=out;RH.set(root,{o:o,t:root.innerHTML,k:k});return;}}
  att(root,l);
  for(var c=root.firstChild;c;c=c.nextSibling)walk(c,l);}
var mo,q=new Set(),raf=0;
function flush(){raf=0;mo.disconnect();q.forEach(function(n){if(n.isConnected)walk(n,lang);});q.clear();watch();}
function watch(){mo.observe(document.body,{childList:true,subtree:true,characterData:true,attributes:true,attributeFilter:AT});}
mo=new MutationObserver(function(ms){ms.forEach(function(m){if(m.type==="childList")m.addedNodes.forEach(function(n){q.add(n);});else q.add(m.target);});if(!raf)raf=requestAnimationFrame(flush);});
function set(l,keep){lang=l;ZK.lang=l;document.documentElement.lang=l;document.documentElement.setAttribute("data-rtl",l==="ar"?"1":"0");if(!keep)try{localStorage.setItem("zk-lang",l);}catch(e){}
  mo.disconnect();walk(document.body,l);watch();
  var b=document.getElementById("langBtn");if(b){var cl=L.filter(function(x){return x[0]===l;})[0];b.querySelector(".c").textContent=cl[2];b.querySelector(".n").textContent=cl[1];b.setAttribute("aria-label","Language: "+L.filter(function(x){return x[0]===l;})[0][1]);}
  [].forEach.call(document.querySelectorAll(".lang-opt"),function(o){o.setAttribute("aria-checked",o.dataset.l===l?"true":"false");});
  window.dispatchEvent(new Event("zk-lang"));}
ZK.set=set;
function ui(){var th=document.getElementById("themeToggle");if(!th||document.getElementById("langBtn"))return;
  var w=document.createElement("div");w.className="lang-w";
  w.innerHTML='<button type="button" class="lang-btn" id="langBtn" aria-haspopup="menu" aria-expanded="false"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.6 2.7 3.9 5.7 3.9 9s-1.3 6.3-3.9 9c-2.6-2.7-3.9-5.7-3.9-9S9.4 5.7 12 3z"/></svg><b class="c">ID</b><b class="n">Indonesia</b><svg class="chv" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg></button><ul class="lang-menu" id="langMenu" role="menu"></ul><div class="lang-scrim"></div>';
  th.parentNode.insertBefore(w,th);
  var b=w.firstChild,m=w.querySelector(".lang-menu");
  L.forEach(function(x){var li=document.createElement("li"),o=document.createElement("button");o.type="button";o.className="lang-opt";o.setAttribute("role","menuitemradio");o.dataset.l=x[0];o.lang=x[0];
    o.innerHTML="<span>"+x[1]+"</span><small>"+x[2]+"</small>";o.onclick=function(){set(x[0]);close(true);};li.appendChild(o);m.appendChild(li);});
  var tr=w.closest(".hd");function close(f){m.classList.remove("open");tr.classList.remove("lang-on");b.setAttribute("aria-expanded","false");if(f)b.focus();}
  b.onclick=function(){if(m.classList.contains("open"))return close();m.classList.add("open");tr.classList.add("lang-on");b.setAttribute("aria-expanded","true");(m.querySelector('[aria-checked="true"]')||m.querySelector(".lang-opt")).focus();};
  w.querySelector(".lang-scrim").onclick=function(){close(true);};m.onkeydown=function(e){var os=[].slice.call(m.querySelectorAll(".lang-opt")),i=os.indexOf(document.activeElement);
    if(e.key==="ArrowDown"){e.preventDefault();os[(i+1)%os.length].focus();}else if(e.key==="ArrowUp"){e.preventDefault();os[(i+os.length-1)%os.length].focus();}else if(e.key==="Escape"){e.stopPropagation();close(true);}else if(e.key==="Tab")close();};
  document.addEventListener("pointerdown",function(e){if(!e.target.closest(".lang-w"))close();});}
function init(){ui();set(lang,true);}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init);else init();
})();


/* ============================================================
   skills.js
   ============================================================ */

/**
 * Interactive Skill System & Radial Orbit Engine
 * Data, gear mathematics, dynamic SVG orbit rings, category filters,
 * slow-motion physics, particle shockwaves, and detail modal.
 */
/* ===== Skill: data, cincin, halaman & panel penjelasan =====
   Edit teks di objek D (tool), BARS (bar keahlian) dan STEPS (cara kerja). */
window.SKR = (function(){
  var I = {"laravel": "assets/icons/laravel.webp", "vue": "assets/icons/vue.webp", "bootstrap": "assets/icons/bootstrap.webp", "gsap": "assets/icons/gsap.webp", "animejs": "assets/icons/animejs.webp", "html5": "assets/icons/html5.webp", "css3": "assets/icons/css3.webp", "tailwind": "assets/icons/tailwind.webp", "gemini": "assets/icons/gemini.webp", "deepseek": "assets/icons/deepseek.webp", "chatgpt": "assets/icons/chatgpt.webp", "react": "assets/icons/react.webp", "vscode": "assets/icons/vscode.webp", "github": "assets/icons/github.webp", "claude": "assets/icons/claude.webp"};
  var LV = ['', 'Dasar', 'Berkembang', 'Menengah', 'Mahir', 'Ahli'];
  var D = {
    html5:   { n:'HTML5', g:'fe', cat:'Markup Language', c:'#d9731f', l:4, f:'Dipakai setiap hari',
      d:'Bahasa dasar untuk menyusun isi halaman web. Heading, paragraf, gambar, tombol, dan formulir semuanya dimulai dari HTML yang tertata rapi.',
      w:'Struktur yang benar membuat halaman lebih mudah dibaca mesin pencari, pembaca layar, dan tentu saja oleh saya sendiri saat merawat kode.',
      u:['Menyusun kerangka halaman dengan tag semantik','Membuat formulir, tabel, dan daftar yang rapi','Menambahkan atribut aksesibilitas seperti alt dan aria','Menjaga struktur tetap sederhana dan mudah dirawat'],
      tip:'Pakai tag semantik seperti header, main, dan section. Hasilnya lebih rapi dan lebih ramah aksesibilitas.',
      r:['css3','tailwind','vscode'], t:['Semantik','Struktur','Aksesibilitas'] },
    css3:    { n:'CSS3', g:'fe', cat:'Styling Language', c:'#d9731f', l:4, f:'Dipakai setiap hari',
      d:'Bahasa untuk mengatur tampilan: warna, huruf, jarak, tata letak, sampai animasi. Di sinilah halaman yang polos berubah jadi tampilan yang elegan.',
      w:'Dengan Flexbox, Grid, dan animasi, sebagian besar tampilan bisa dibuat tanpa library tambahan, jadi halaman tetap ringan.',
      u:['Menata layout responsif dengan Flexbox dan Grid','Membuat animasi dan transisi yang halus','Mengatur warna dan tema terang-gelap lewat variabel','Merancang tampilan mobile-first'],
      tip:'Simpan warna dan jarak sebagai variabel CSS. Mengganti tema jadi cukup di satu tempat.',
      r:['html5','tailwind','react'], t:['Flexbox','Grid','Animasi'] },
    tailwind:{ n:'Tailwind CSS', g:'fe', cat:'CSS Framework', c:'#d9731f', l:3, f:'Untuk proyek yang butuh cepat',
      d:'Framework CSS berbasis utility class. Gaya langsung ditulis di markup lewat kelas kecil seperti flex, p-4, atau text-lg, jadi prototipe bisa dibuat dengan cepat.',
      w:'Tidak perlu bolak-balik antara file HTML dan CSS. Desain konsisten karena semua nilai jarak dan warna berasal dari satu sistem.',
      u:['Membuat prototipe tampilan dengan cepat','Menata layout responsif lewat prefix breakpoint','Menjaga jarak dan warna tetap konsisten','Memadukannya dengan komponen React'],
      tip:'Pahami dulu CSS dasarnya. Tailwind terasa jauh lebih mudah kalau konsep layout-nya sudah jelas.',
      r:['css3','react','html5'], t:['Utility-First','Responsif','Prototipe'] },
    vue:     { n:'Vue.js', g:'fe', cat:'Front-End Framework', c:'#d9731f', l:2, f:'Sedang dijelajahi',
      d:'Framework JavaScript progresif untuk membangun antarmuka. Sintaksnya ramah pemula dan cara kerjanya mirip pendekatan komponen, jadi enak dijadikan pembanding dengan React.',
      w:'Kurva belajarnya landai dan templatenya terasa dekat dengan HTML, jadi cocok untuk memahami konsep reaktivitas dari dasar.',
      u:['Mencoba membuat komponen dengan template yang sederhana','Belajar reaktivitas data lewat ref dan computed','Membandingkan cara kerja Vue dengan React','Membuat proyek kecil untuk latihan'],
      tip:'Mulai dari satu komponen kecil dulu, lalu tambahkan data reaktif sedikit demi sedikit.',
      r:['react','html5','vscode'], t:['Komponen','Reaktivitas','Template'] },
    bootstrap:{ n:'Bootstrap', g:'fe', cat:'CSS Framework', c:'#d9731f', l:3, f:'Untuk proyek yang butuh cepat',
      d:'Framework CSS dengan komponen siap pakai seperti navbar, kartu, tombol, dan sistem grid. Pas untuk menyusun halaman responsif dengan cepat.',
      w:'Grid dan komponen bawaannya sudah teruji di banyak layar, jadi pekerjaan dasar tata letak jadi jauh lebih singkat.',
      u:['Menyusun layout dengan sistem grid 12 kolom','Memakai komponen siap pakai untuk prototipe','Membuat halaman responsif dengan cepat','Menyesuaikan tampilan lewat variabel dan kelas tambahan'],
      tip:'Jangan dibiarkan bawaan. Ubah warna dan jarak supaya tampilannya punya karakter sendiri.',
      r:['css3','tailwind','html5'], t:['Grid','Komponen','Responsif'] },
    gsap:    { n:'GSAP', g:'anim', cat:'Animation Library', c:'#1f9d6b', l:2, f:'Untuk animasi yang rumit',
      d:'Library animasi JavaScript yang kuat dan halus. Cocok untuk urutan animasi yang rumit, animasi saat scroll, dan gerakan yang butuh kendali waktu yang presisi.',
      w:'Kendali timeline-nya rapi, jadi banyak gerakan bisa disusun berurutan tanpa kode yang berantakan.',
      u:['Menyusun urutan animasi dengan timeline','Membuat animasi yang bereaksi saat halaman digulir','Mengatur easing supaya gerakan terasa alami','Menghidupkan elemen halaman dengan efek halus'],
      tip:'Mulai dari satu animasi sederhana, lalu rangkai jadi timeline. Jangan langsung membuat yang rumit.',
      r:['animejs','css3','react'], t:['Timeline','ScrollTrigger','Easing'] },
    animejs: { n:'Anime.js', g:'anim', cat:'Animation Library', c:'#1f9d6b', l:2, f:'Untuk animasi ringan',
      d:'Library animasi JavaScript yang ringan dan mudah dipakai. Cocok untuk menganimasikan elemen CSS, SVG, dan objek dengan sintaks yang ringkas.',
      w:'Ukurannya kecil dan penulisannya sederhana, pas untuk animasi cepat tanpa menambah beban halaman.',
      u:['Menganimasikan elemen dengan sintaks yang ringkas','Membuat animasi SVG dan garis yang bergerak','Mengatur urutan dan jeda antaranimasi','Menambah efek kecil agar halaman terasa hidup'],
      tip:'Pilih animasi yang punya tujuan, misalnya memberi petunjuk atau umpan balik, bukan sekadar hiasan.',
      r:['gsap','css3','html5'], t:['Ringan','SVG','Sekuens'] },
    laravel: { n:'Laravel', g:'be', cat:'PHP Framework', c:'#cf3f3f', l:2, f:'Sedang dipelajari',
      d:'Framework PHP untuk membangun aplikasi web dari sisi server. Routing, database, autentikasi, dan templating sudah tersedia dengan struktur yang rapi.',
      w:'Strukturnya jelas dan fiturnya lengkap, jadi saya bisa belajar bagaimana sisi back-end bekerja di balik tampilan yang saya buat.',
      u:['Belajar routing dan controller dasar','Mengelola data lewat migration dan Eloquent','Memakai Blade untuk menyusun tampilan','Memahami alur kerja aplikasi dari server ke browser'],
      tip:'Mulai dari proyek kecil seperti catatan atau daftar tugas. Dari situ alur routing sampai database mudah dipahami.',
      r:['html5','vue','vscode'], t:['Back-End','Routing','Eloquent'] },
    react:   { n:'React', g:'fe', cat:'Front-End Library', c:'#d9731f', l:3, f:'Masih terus dipelajari',
      d:'Library JavaScript untuk membangun antarmuka berbasis komponen. Setiap bagian tampilan dipecah jadi potongan kecil yang bisa dipakai ulang, jadi proyek tetap rapi saat makin besar.',
      w:'Tampilan yang kompleks jadi lebih mudah dirawat. Ubah satu komponen, dan semua tempat yang memakainya ikut berubah.',
      u:['Membuat komponen UI yang bisa dipakai ulang','Mengelola data tampilan dengan state dan hooks','Menyusun halaman interaktif yang terasa halus','Memecah halaman besar jadi bagian-bagian kecil'],
      tip:'Mulai dari komponen terkecil seperti tombol atau kartu, lalu gabungkan jadi halaman utuh.',
      r:['vscode','github','claude'], t:['Komponen','Hooks','State'] },
    vscode:  { n:'VS Code', g:'tool', cat:'Code Editor', c:'#2c4a9e', l:4, f:'Dipakai setiap hari',
      d:'Editor kode yang jadi markas utama saya. Hampir seluruh proses menulis, merapikan, dan menguji kode terjadi di sini, lengkap dengan terminal dan debugger bawaan.',
      w:'Ringan, cepat dibuka, dan extension-nya lengkap. Satu aplikasi cukup untuk menulis, menguji, dan merapikan kode.',
      u:['Menulis HTML, CSS, dan JavaScript setiap hari','Memakai extension untuk format dan autocomplete','Mencari bug lewat debugger dan terminal terpadu','Merapikan kode otomatis setiap kali disimpan'],
      tip:'Pelajari shortcut dasar seperti multi-cursor dan pencarian global. Hematnya terasa sekali.',
      r:['github','react','claude'], t:['Extension','Terminal','Debugger'] },
    github:  { n:'GitHub', g:'tool', cat:'Version Control', c:'#2c4a9e', l:3, f:'Setiap ada perubahan',
      d:'Platform untuk menyimpan kode memakai Git sekaligus tempat proyek dipublikasikan. Setiap perubahan tercatat, jadi mudah dilacak dan dikembalikan kalau ada yang salah.',
      w:'Riwayat perubahan membuat saya berani bereksperimen, karena versi yang lama selalu bisa dikembalikan.',
      u:['Menyimpan riwayat perubahan lewat commit','Mempublikasikan demo dengan GitHub Pages','Memamerkan proyek lewat profil @trynvexa','Menyimpan cadangan semua proyek di cloud'],
      tip:'Tulis pesan commit yang jelas, misalnya menambah galeri atau memperbaiki jarak kartu. Dirimu di masa depan akan berterima kasih.',
      r:['vscode','react','claude'], t:['Git','Pages','Kolaborasi'] },
    claude:  { n:'Claude', g:'ai', cat:'AI Assistant', c:'#0891b2', l:4, f:'Hampir setiap sesi kerja',
      d:'Asisten AI dari Anthropic yang saya jadikan partner berpikir. Cocok untuk membedah kode yang rumit, menjelaskan konsep dengan bahasa sederhana, dan merapikan hasil akhir sebelum dirilis.',
      w:'Penjelasannya runtut dan mudah diikuti. Pas saat saya perlu paham kenapa sebuah kode bekerja, bukan sekadar menyalinnya.',
      u:['Mencari penyebab bug yang membingungkan','Merapikan struktur dan nama di dalam kode','Meninjau ulang hasil kerja sebelum dirilis','Menjelaskan konsep baru dengan bahasa sederhana'],
      tip:'Beri konteks selengkap mungkin: tujuan, potongan kode, dan pesan error. Jawabannya jadi jauh lebih tepat.',
      r:['chatgpt','vscode','github'], t:['Debugging','Refactor','Code Review'] },
    chatgpt: { n:'ChatGPT', g:'ai', cat:'AI Assistant', c:'#0891b2', l:4, f:'Saat butuh ide dan draf',
      d:'Teman brainstorming harian. Saya memakainya untuk melempar ide, menguji sudut pandang, dan mengubah catatan berantakan menjadi draf yang siap dikembangkan.',
      w:'Cepat untuk melempar ide mentah dan melihat beberapa kemungkinan sebelum memutuskan arah.',
      u:['Menggali ide fitur dan alur halaman','Merangkum dokumentasi yang panjang','Menyusun draf awal teks dan kode','Menguji ide dari sudut pandang pengguna'],
      tip:'Minta beberapa alternatif sekaligus, lalu pilih dan gabungkan sendiri bagian yang paling pas.',
      r:['claude','gemini','deepseek'], t:['Brainstorming','Draf Kode','Ringkasan'] },
    gemini:  { n:'Gemini', g:'ai', cat:'AI Assistant', c:'#0891b2', l:3, f:'Saat perlu riset',
      d:'AI dari Google yang terasa kuat untuk riset cepat. Berguna untuk membandingkan beberapa pendekatan sekaligus dan memastikan jawaban dari AI lain tidak melenceng.',
      w:'Membantu membandingkan banyak sumber sekaligus, jadi saya punya gambaran lebih luas sebelum memilih solusi.',
      u:['Riset cepat soal teknologi dan tren','Membandingkan beberapa solusi','Memeriksa ulang jawaban AI lain','Mencari referensi dan contoh penerapan'],
      tip:'Jangan telan mentah-mentah. Cek ulang hal yang penting lewat dokumentasi resmi.',
      r:['chatgpt','claude','deepseek'], t:['Riset','Perbandingan','Cek Ulang'] },
    deepseek:{ n:'DeepSeek', g:'ai', cat:'AI Assistant', c:'#0891b2', l:3, f:'Saat ketemu soal logika',
      d:'AI yang menonjol di penalaran dan logika. Saya memakainya saat bertemu masalah algoritma atau ingin melihat satu persoalan dari cara berpikir yang berbeda.',
      w:'Cara berpikirnya terurai langkah demi langkah, jadi saya bisa mengikuti alurnya dan menemukan celah logika.',
      u:['Memecahkan masalah logika dan algoritma','Menjelaskan langkah berpikir secara runtut','Mencari alternatif solusi yang lebih ringkas','Menguji ulang logika yang terasa janggal'],
      tip:'Minta ia menjelaskan langkah berpikirnya, bukan hanya jawaban akhirnya.',
      r:['claude','gemini','chatgpt'], t:['Logika','Algoritma','Sudut Pandang'] }
  };
  var ORDER = ['html5','css3','tailwind','bootstrap','vue','react','gsap','animejs','laravel','vscode','github','claude','chatgpt','gemini','deepseek'];
  var GR = [['all','Semua'],['fe','Front-End'],['anim','Animasi'],['be','Back-End'],['tool','Tools'],['ai','AI']];
  var BARS = [
    ['HTML & CSS',90,'Menyusun struktur halaman yang rapi, lalu menata layout responsif dengan Flexbox, Grid, dan animasi CSS.',['Flexbox','Grid','Animasi']],
    ['UI Design',80,'Merancang tampilan yang bersih dan elegan dengan hierarki jelas, spasi lega, dan warna yang konsisten.',['Layout','Tipografi','Warna']],
    ['AI Prompting',85,'Menulis instruksi yang jelas dan bertahap supaya AI memberi hasil tepat sasaran, lalu memeriksa hasilnya sendiri.',['Konteks','Iterasi','Verifikasi']],
    ['JavaScript',70,'Menambah interaksi seperti klik, gestur, dan animasi halus dengan memanipulasi tampilan langsung di browser.',['DOM','Event','Animasi']],
    ['Git & GitHub',70,'Menyimpan riwayat kerja, mencoba ide di cabang terpisah, dan mempublikasikan proyek lewat GitHub Pages.',['Commit','Branch','Pages']],
    ['React',60,'Masih tahap berkembang. Fokus saya sekarang di cara membagi komponen dan mengatur alur data.',['Komponen','State','Hooks']],
    ['Tailwind & Bootstrap',65,'Menyusun tampilan responsif dengan cepat lewat utility class dan komponen siap pakai, lalu disesuaikan supaya punya karakter sendiri.',['Utility','Grid','Komponen']],
    ['Animasi Web',50,'Menghidupkan halaman dengan GSAP dan Anime.js: urutan animasi, gerakan saat digulir, dan easing yang halus.',['GSAP','Anime.js','Timeline']],
    ['Vue.js',40,'Masih tahap belajar. Fokus saya di reaktivitas data dan cara menyusun komponen dengan template.',['Komponen','Reaktivitas','Template']],
    ['Laravel',35,'Baru mulai. Saya belajar routing, controller, dan database supaya paham sisi server di balik tampilan.',['Routing','Controller','Database']]
  ];
  var PRIN = [
    ['&#9670;','Bersih','Tampilan lega dan tidak ramai, supaya mata langsung tahu harus melihat ke mana.'],
    ['&#9650;','Ringan','Dimuat cepat dan tidak menumpuk library yang sebenarnya tidak perlu.'],
    ['&#9679;','Mobile-First','Dirancang dari layar kecil lebih dulu, lalu dilebarkan untuk layar yang besar.'],
    ['&#9632;','Nyaman Dipakai','Kontras jelas, tombol cukup besar untuk jari, dan bisa dioperasikan lewat keyboard.']
  ];
  var STEPS = [
    ['Riset','Memahami kebutuhan dan pengguna sebelum menyentuh kode.','Saya mulai dengan bertanya: siapa yang memakai, untuk apa, dan apa yang paling penting bagi mereka. Referensi dikumpulkan dulu supaya arah desain tidak meraba-raba.',['Tujuan','Pengguna','Referensi']],
    ['Desain','Menyusun tampilan yang bersih, elegan, dan mobile-first.','Sketsa kasar dibuat dulu, lalu dirapikan jadi pilihan warna, huruf, dan jarak yang konsisten. Layar ponsel jadi acuan utama.',['Sketsa','Warna','Tipografi']],
    ['Bangun','Menulis front-end yang ringan, dengan AI sebagai partner berpikir.','Kode ditulis bertahap dan diuji di setiap langkah. AI membantu menjelaskan dan meninjau, sementara keputusan akhirnya tetap di tangan saya.',['HTML & CSS','JavaScript','Review AI']],
    ['Rilis','Publikasi lewat GitHub Pages, lalu dirapikan dari masukan.','Setelah tayang, saya mengecek di beberapa ukuran layar dan perangkat, lalu memperbaiki hal kecil yang baru terlihat saat dipakai.',['GitHub Pages','Uji Layar','Revisi']]
  ];
  var LEARN = [
    ['React lanjutan','Pola komponen yang lebih rapi dan pengelolaan state di proyek yang lebih besar.'],
    ['JavaScript modern','Animasi yang halus, penanganan gestur, dan cara menjaga performa.'],
    ['Alur kerja Git','Memakai branch dan commit yang tertata supaya riwayat proyek mudah dibaca.'],
    ['Aksesibilitas web','Memastikan tampilan nyaman dipakai semua orang, termasuk lewat keyboard.'],
    ['Animasi dengan GSAP','Menyusun timeline dan animasi saat halaman digulir tanpa mengorbankan performa.'],
    ['Dasar Laravel dan Vue','Memahami alur data dari server ke tampilan, dari routing sampai komponen.']
  ];
  var FAQ = [
    ['Kenapa memakai banyak asisten AI?','Setiap AI punya kelebihan masing-masing. Saya membandingkan jawabannya, lalu memutuskan sendiri mana yang paling masuk akal untuk kasus saya.'],
    ['Apakah semua kode dibuat oleh AI?','AI membantu menjelaskan, memberi alternatif, dan meninjau. Struktur, keputusan desain, dan pengujian hasil akhirnya tetap saya yang pegang.'],
    ['Apa stack favorit untuk proyek kecil?','HTML, CSS, dan JavaScript yang dipublikasikan lewat GitHub Pages. Ringan, murah, dan mudah dirawat tanpa server database.'],
    ['Bisa diajak kolaborasi?','Bisa. Saya terbuka untuk freelance, proyek bersama, dan diskusi seputar pengembangan web dan desain antarmuka.']
  ];
  function slot(k, a, pd, ph) {
    return '<div class="sk-slot" style="--a:' + a + 'deg;--pd:' + pd.toFixed(2) + 's;--ph:' + ph.toFixed(2) + 's"><i class="sk-beam"></i><div class="sk-icw"><div class="sk-cnt">' +
      '<button type="button" class="sk-ic" data-k="' + k + '" data-g="' + D[k].g + '" aria-pressed="false" aria-label="' + D[k].n + ': lihat penjelasan">' +
      '<img alt="" draggable="false" decoding="async" src="' + I[k] + '"><span class="sk-tip">' + D[k].n + '</span></button>' +
      '</div></div></div>';
  }
  function cn(angs, step, cls) {
    var p = angs.map(function(a){ var r = a * Math.PI / 180; return [50 + 50 * Math.sin(r), 50 - 50 * Math.cos(r)]; }), d = '';
    angs.forEach(function(_, i){ var j = (i + step) % angs.length; d += 'M' + p[i][0].toFixed(2) + ' ' + p[i][1].toFixed(2) + 'L' + p[j][0].toFixed(2) + ' ' + p[j][1].toFixed(2); });
    return '<svg class="sk-cn ' + cls + '" viewBox="0 0 100 100" aria-hidden="true"><path d="' + d + '"/></svg>';
  }
  function ringOf(cls, keys, a0, gap, t0, dt, svgStep, svgCls, extra) {
    var angs = keys.map(function(_, i){ return a0 + i * gap; });
    return '<div class="sk-ring ' + cls + '">' + cn(angs, svgStep, svgCls) + (extra || '') +
      keys.map(function(k, i){ return slot(k, angs[i], t0 + i * dt, -i * .9); }).join('') + '</div>';
  }
  var ring =
    '<div class="sk-ghost" aria-hidden="true">SKILL</div>' +
    '<span class="sk-vt" aria-hidden="true">Front-End &middot; UI Design &middot; AI Workflow</span>' +
    '<span class="sk-st2" aria-hidden="true" style="left:86%;top:3%;font-size:18px">&#10022;</span>' +
    '<span class="sk-st2 b" aria-hidden="true" style="left:96%;top:22%;font-size:11px;animation-delay:-1.2s">&#10022;</span>' +
    '<span class="sk-st2" aria-hidden="true" style="left:56%;top:1%;font-size:12px;animation-delay:-2.1s">&#10022;</span>' +
    '<span class="sk-st2" aria-hidden="true" style="left:2%;top:50%;font-size:13px;animation-delay:-.6s">&#10022;</span>' +
    '<div class="sk-orbit" id="skOrbit">' +
      '<i class="sk-glow"></i><i class="sk-sat"></i><i class="sk-ticks"></i><i class="sk-ticks big"></i><i class="sk-rip"></i><i class="sk-rip b"></i><i class="sk-sweep"></i>' +
      '<i class="sk-pt p1"></i><i class="sk-pt p2"></i><i class="sk-pt p3"></i><i class="sk-pt p4"></i>' +
      ringOf('sk-out', ['html5','css3','tailwind','bootstrap','vue','react','gsap','animejs'], 0, 45, 1.1, .08, 3, '', '<div class="sk-slot" style="--a:22.5deg"><i class="sk-dot"></i></div>') +
      ringOf('sk-inn', ['claude','chatgpt','gemini','deepseek'], 22.5, 90, 1.85, .1, 1, 'r') +
      ringOf('sk-core', ['laravel','vscode','github'], 0, 120, 2.5, .12, 1, '') +
      '<i class="sk-hub"></i><i class="sk-hubring"></i>' +
    '</div>' +
    '<ul class="sk-tags" aria-hidden="true"><li><b>01</b><span><strong>Front-End</strong><em>Antarmuka rapi &amp; responsif</em></span></li><li><b>02</b><span><strong>UI Design</strong><em>Bersih, lega, konsisten</em></span></li><li><b>03</b><span><strong>AI Workflow</strong><em>AI jadi partner berpikir</em></span></li><li><b>04</b><span><strong>Web Ringan</strong><em>Cepat dimuat di HP</em></span></li></ul>';

  var mq = ORDER.map(function(k){ return '<span><img alt="" src="' + I[k] + '">' + D[k].n + '</span>'; }).join('');
  var mq2 = ORDER.slice().reverse().map(function(k){ return '<span><img alt="" src="' + I[k] + '">' + D[k].n + '</span>'; }).join('');
  function chips(a) { return '<ul class="sk-chips">' + a.map(function(t){ return '<li>' + t + '</li>'; }).join('') + '</ul>'; }
  var cards = ORDER.map(function(k, i){
    var d = D[k], dots = '';
    for (var n = 1; n <= 5; n++) dots += '<i' + (n <= d.l ? ' class="on"' : '') + '></i>';
    return '<button type="button" class="sk-card sk-rv' + (d.cat === 'AI Assistant' ? ' ai' : '') + '" data-k="' + k + '" data-g="' + d.g + '" style="--d:' + (i * .06) + 's;--c:' + d.c + '" aria-label="' + d.n + ': buka penjelasan">' +
      '<img alt="" draggable="false" src="' + I[k] + '"><b>' + d.n + '</b><em>' + d.cat + '</em><span class="sk-dots">' + dots + '</span></button>';
  }).join('');
  var bars = BARS.map(function(b, i){
    return '<li class="sk-bar sk-rv" style="--d:' + (i * .09) + 's"><div class="t"><span>' + b[0] + '</span><span>' + b[1] + '%</span></div>' +
      '<div class="sk-trk"><i class="sk-fil" style="--p:' + b[1] + '%"></i></div><p>' + b[2] + '</p>' + chips(b[3]) + '</li>';
  }).join('');
  var prin = PRIN.map(function(p, i){
    return '<div class="sk-pc sk-rv" style="--d:' + (i * .08) + 's"><i aria-hidden="true">' + p[0] + '</i><h4>' + p[1] + '</h4><p>' + p[2] + '</p></div>';
  }).join('');
  var steps = STEPS.map(function(s, i){
    return '<li class="sk-st sk-rv" style="--d:' + (i * .1) + 's"><i>0' + (i + 1) + '</i><div><h4>' + s[0] + '</h4><p>' + s[1] + '</p><p class="sk-sub">' + s[2] + '</p>' + chips(s[3]) + '</div></li>';
  }).join('');
  var learn = LEARN.map(function(l, i){
    return '<li class="sk-rv" style="--d:' + (i * .08) + 's"><div><b>' + l[0] + '</b>' + l[1] + '</div></li>';
  }).join('');
  var faq = FAQ.map(function(q, i){
    return '<details class="sk-rv" style="--d:' + (i * .07) + 's"><summary>' + q[0] + '</summary><p>' + q[1] + '</p></details>';
  }).join('');

  var ui =
    '<div class="sk-sp"></div>' +
    '<aside class="sk-panel" role="region" aria-live="polite" aria-label="Penjelasan skill">' +
      '<span class="sk-grab" aria-hidden="true"></span>' +
      '<span class="sk-gn" aria-hidden="true"></span>' +
      '<div class="sk-top"><span class="sk-ct"></span><button type="button" class="sk-x" aria-label="Tutup penjelasan"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg></button></div>' +
      '<div class="sk-in2">' +
        '<div class="sk-hd"><span class="sk-pi"><img alt="" draggable="false"></span><em class="sk-cat"></em></div>' +
        '<b class="sk-pn"></b>' +
        '<div class="sk-lv"><span class="sk-lvt"></span><span class="sk-dots"><i></i><i></i><i></i><i></i><i></i></span></div>' +
        '<span class="sk-fr"></span>' +
        '<p class="sk-pd"></p>' +
        '<div class="sk-row"><b class="sk-sh">Kenapa saya betah</b><p class="sk-why"></p></div>' +
        '<div class="sk-row"><b class="sk-sh">Yang saya kerjakan dengannya</b><ol class="sk-use"></ol></div>' +
        '<div class="sk-row"><b class="sk-sh">Tips</b><p class="sk-tp"></p></div>' +
        '<div class="sk-row"><b class="sk-sh">Teman setianya</b><div class="sk-rel"></div></div>' +
        '<ul class="sk-chips"></ul>' +
      '</div>' +
      '<div class="sk-nav"><button type="button" class="sk-pv" aria-label="Skill sebelumnya">&#8592; Sebelumnya</button><button type="button" class="sk-nx" aria-label="Skill berikutnya">Berikutnya &#8594;</button></div>' +
    '</aside>' +
    '<p class="sk-hint"><i></i>Tekan &amp; lepas ikon &middot; geser ke bawah</p>' +
    '<div class="sk-cats" role="group" aria-label="Filter kategori">' + GR.map(function(g){ return '<button type="button" class="sk-tab' + (g[0] === 'all' ? ' on' : '') + '" data-fg="' + g[0] + '" aria-pressed="' + (g[0] === 'all' ? 'true' : 'false') + '">' + g[1] + '</button>'; }).join('') + '</div>' +
    '<section class="sk-sec sk-intro"><div class="sk-eyebrow sk-rv">Skill &amp; Keahlian</div>' +
      '<h2 class="sk-h sk-rv" style="--d:.08s">Dari kode kosong<br>sampai layar yang hidup</h2>' +
      '<p class="sk-p sk-rv" style="--d:.16s">Tool dan AI yang saya pakai tiap hari untuk mengubah ide jadi halaman yang rapi dan enak dipakai.</p>' +
      '<p class="sk-p sk-rv" style="--d:.2s">Cincin di tangan itu kotak alat saya. Tekan satu ikon, lepas, lalu baca cerita saya dengannya.</p>' +
      '<div class="sk-stats sk-rv" style="--d:.24s"><div class="sk-stat"><b data-n="15">0</b><span>Tools</span></div><div class="sk-stat"><b data-n="4">0</b><span>AI Assistant</span></div><div class="sk-stat"><b data-n="8">0</b><span>Web Stack</span></div></div>' +
    '</section>' +
    '<div class="sk-marq" aria-hidden="true"><div class="sk-mt">' + mq + mq + '</div></div>' +
    '<section class="sk-sec"><div class="sk-eyebrow sk-rv">Semua tool</div>' +
      '<h3 class="sk-h2 sk-rv" style="--d:.06s">Keahlian &amp; Tools,<br>yang sering saya gunakan</h3>' +
      '<p class="sk-p2 sk-rv" style="--d:.12s">Ketuk kartu mana pun. Saya tulis apa adanya, termasuk yang masih bikin bingung.</p>' +
      '<div class="sk-tabs sk-rv" style="--d:.16s" role="group" aria-label="Filter kategori">' + GR.map(function(g){ return '<button type="button" class="sk-tab' + (g[0] === 'all' ? ' on' : '') + '" data-fg="' + g[0] + '" aria-pressed="' + (g[0] === 'all' ? 'true' : 'false') + '">' + g[1] + '</button>'; }).join('') + '</div>' +
      '<div class="sk-grid">' + cards + '</div></section>' +
    '<div class="sk-marq alt" aria-hidden="true"><div class="sk-mt">' + mq2 + mq2 + '</div></div>' +
    '<section class="sk-sec"><div class="sk-eyebrow sk-rv">Keahlian utama</div>' +
      '<h3 class="sk-h2 sk-rv" style="--d:.06s">Tingkat Kemahiran,<br>dan fokus keahlian</h3>' +
      '<p class="sk-p2 sk-rv" style="--d:.12s">Ini angka hari ini, bukan target. Akan naik seiring proyek.</p>' +
      '<ul class="sk-bars">' + bars + '</ul></section>' +
    '<section class="sk-sec"><div class="sk-eyebrow sk-rv">Prinsip kerja</div>' +
      '<h3 class="sk-h2 sk-rv" style="--d:.06s">Aturan main<br>yang tidak saya langgar</h3>' +
      '<div class="sk-pr">' + prin + '</div></section>' +
    '<section class="sk-sec"><div class="sk-eyebrow sk-rv">Cara kerja</div>' +
      '<h3 class="sk-h2 sk-rv" style="--d:.06s">Dari coretan<br>sampai tayang</h3>' +
      '<ol class="sk-steps">' + steps + '</ol></section>' +
    '<section class="sk-sec"><div class="sk-eyebrow sk-rv">Sedang dipelajari</div>' +
      '<h3 class="sk-h2 sk-rv" style="--d:.06s">Yang masih<br>bikin penasaran</h3>' +
      '<ul class="sk-learn">' + learn + '</ul></section>' +
    '<section class="sk-sec"><div class="sk-eyebrow sk-rv">Tanya jawab</div>' +
      '<h3 class="sk-h2 sk-rv" style="--d:.06s">Pertanyaan<br>yang sering mampir</h3>' +
      '<div class="sk-faq">' + faq + '</div></section>' +
    '<section class="sk-sec sk-end"><p class="sk-p sk-rv">Cukup bicaranya. Lihat hasil nyatanya.</p><button type="button" class="sk-cta sk-rv" data-go="1" style="--d:.1s">Lihat proyek &#9656;</button></section>';
  return { data: D, order: ORDER, lv: LV, ring: ring, ui: ui };
})();

(function(){
  var pg = document.getElementById('pg'), pgb = document.getElementById('pgb');
  if (!pg || !pgb) return;
  var S = window.SKR, D = S.data;
  function orbit() { return pgb.querySelector('.sk-orbit'); }
  function panel() { return pgb.querySelector('.sk-panel'); }
  function isOpen() { var p = panel(); return !!(p && p.classList.contains('show')); }
  function release() {
    var o = orbit(); if (!o) return;
    o.classList.remove('hold');
    [].forEach.call(o.querySelectorAll('.sk-ic.down'), function(b){ b.classList.remove('down'); });
    fxe('up');
  }
  function fxe(type, ic, d) { try { pg.dispatchEvent(new CustomEvent('skfx', { detail: { type: type, ic: ic, d: d } })); } catch (_) {} }
  function closeP() {
    var p = panel(), o = orbit(); if (!p) return;
    [].forEach.call(pgb.querySelectorAll('.sk-slot.is-sel'), function(x){ x.classList.remove('is-sel'); });
    if (p.classList.contains('show')) fxe('close');
    p.classList.remove('show'); pg.classList.remove('sk-sel');
    if (o) {
      o.classList.remove('has-sel');
      [].forEach.call(o.querySelectorAll('.sk-ic.sel'), function(b){ b.classList.remove('sel'); b.setAttribute('aria-pressed', 'false'); });
    }
  }
  function openP(b) {
    var p = panel(), o = orbit(), k = b.getAttribute('data-k'), d = D[k];
    if (!p || !o || !d) return;
    [].forEach.call(o.querySelectorAll('.sk-ic.sel'), function(x){ x.classList.remove('sel'); x.setAttribute('aria-pressed', 'false'); });
    [].forEach.call(o.querySelectorAll('.sk-slot.is-sel'), function(x){ x.classList.remove('is-sel'); });
    b.classList.add('sel'); b.setAttribute('aria-pressed', 'true');
    var sl = b.closest('.sk-slot'); if (sl) sl.classList.add('is-sel');
    o.classList.add('has-sel');
    fxe('open', b, d);
    p.setAttribute('data-k', k);
    p.style.setProperty('--c', d.c);
    p.querySelector('.sk-pi img').src = b.querySelector('img').src;
    p.querySelector('.sk-cat').textContent = d.cat;
    p.querySelector('.sk-pn').textContent = d.n;
    p.querySelector('.sk-lvt').textContent = 'Level: ' + S.lv[d.l];
    [].forEach.call(p.querySelectorAll('.sk-dots i'), function(i, n){ i.classList.toggle('on', n < d.l); });
    p.querySelector('.sk-pd').textContent = d.d;
    p.querySelector('.sk-fr').textContent = d.f;
    p.querySelector('.sk-why').textContent = d.w;
    p.querySelector('.sk-tp').textContent = d.tip;
    p.querySelector('.sk-rel').innerHTML = d.r.map(function(r){ return '<button type="button" class="sk-rl" data-k="' + r + '">' + D[r].n + '</button>'; }).join('');
    p.querySelector('.sk-use').innerHTML = d.u.map(function(t){ return '<li>' + t + '</li>'; }).join('');
    p.querySelector('.sk-chips').innerHTML = d.t.map(function(t){ return '<li>' + t + '</li>'; }).join('');
    var n = S.order.indexOf(k) + 1;
    p.querySelector('.sk-ct').textContent = (n < 10 ? '0' : '') + n + ' / ' + (S.order.length < 10 ? '0' : '') + S.order.length;
    p.querySelector('.sk-gn').textContent = (n < 10 ? '0' : '') + n;
    var inner = p.querySelector('.sk-in2');
    inner.scrollTop = 0;
    inner.classList.remove('swap'); void inner.offsetWidth; inner.classList.add('swap');
    p.classList.add('show'); pg.classList.add('sk-sel');
    try { if (navigator.vibrate) navigator.vibrate(8); } catch (_) {}
  }
  function step(dir) {
    var p = panel(); if (!p) return;
    var list = S.visible ? S.visible() : S.order, k0 = p.getAttribute('data-k'), i = list.indexOf(k0);
    if (i < 0) { list = S.order; i = list.indexOf(k0); }
    var L = list.length;
    var b = pgb.querySelector('.sk-ic[data-k="' + list[(i + dir + L) % L] + '"]');
    if (b) openP(b);
  }

  var press = null, tapped = 0;
  pgb.addEventListener('pointerdown', function(e){
    var b = e.target.closest && e.target.closest('.sk-ic');
    if (b) { var o = orbit(); b.classList.add('down'); if (o) o.classList.add('hold'); fxe('down', b); press = { k: b.getAttribute('data-k'), x: e.clientX, y: e.clientY }; return; }
    if (isOpen() && !e.target.closest('.sk-panel, .sk-card')) closeP();
  });
  window.addEventListener('pointerup', function(e){
    var p = press; press = null; release();
    if (!p) return;
    var ic = pgb.querySelector('.sk-ic[data-k="' + p.k + '"]');
    if (ic && Math.hypot(e.clientX - p.x, e.clientY - p.y) < 18) { tapped = performance.now(); openP(ic); }
  });
  window.addEventListener('pointercancel', function(){ press = null; release(); });
  pgb.addEventListener('click', function(e){
    var t = e.target; if (!t.closest) return;
    var go = t.closest('.sk-rl, .sk-card');
    if (go) { var ic = pgb.querySelector('.sk-ic[data-k="' + go.getAttribute('data-k') + '"]'); if (ic) openP(ic); return; }
    var b = t.closest('.sk-ic');
    if (b) { release(); if (performance.now() - tapped > 500) openP(b); return; }
    if (t.closest('.sk-x')) closeP();
    else if (t.closest('.sk-pv')) step(-1);
    else if (t.closest('.sk-nx')) step(1);
  });
  pgb.addEventListener('contextmenu', function(e){ if (e.target.closest && e.target.closest('.sk-orbit')) e.preventDefault(); });
  window.addEventListener('keydown', function(e){
    if (!isOpen()) return;
    if (e.key === 'Escape') { closeP(); e.stopImmediatePropagation(); e.preventDefault(); }
    else if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') { step(e.key === 'ArrowRight' ? 1 : -1); e.preventDefault(); }
  }, true);

  var sx = null, sy = 0;
  pgb.addEventListener('touchstart', function(e){
    if (!(e.target.closest && e.target.closest('.sk-panel'))) { sx = null; return; }
    sx = e.touches[0].clientX; sy = e.touches[0].clientY;
  }, { passive: true });
  pgb.addEventListener('touchend', function(e){
    if (sx == null || !isOpen()) return;
    var t = e.changedTouches[0], dx = t.clientX - sx, dy = t.clientY - sy; sx = null;
    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) step(dx < 0 ? 1 : -1);
    else if (dy > 80 && dy > Math.abs(dx) * 1.5 && window.matchMedia('(max-width:819px)').matches && panel().querySelector('.sk-in2').scrollTop <= 0) closeP();
  }, { passive: true });

  /* geser ke bawah: sembunyikan petunjuk, munculkan bagian satu per satu */
  pg.addEventListener('scroll', function(){ pg.classList.toggle('sk-scrolled', pg.scrollTop > 40); }, { passive: true });
  function count(el) {
    var t = +el.getAttribute('data-n'), s = performance.now();
    (function f(n){ var k = Math.min(1, (n - s) / 1100); el.textContent = Math.round(t * (1 - Math.pow(1 - k, 3))); if (k < 1) requestAnimationFrame(f); })(s);
  }
  function reveal(sec) { sec.classList.add('in'); [].forEach.call(sec.querySelectorAll('[data-n]'), count); }
  var io = 'IntersectionObserver' in window ? new IntersectionObserver(function(es){
    es.forEach(function(e){ if (e.isIntersecting) { reveal(e.target); io.unobserve(e.target); } });
  }, { root: pg, threshold: 0, rootMargin: '0px 0px -8% 0px' }) : null;
  function scan() { [].forEach.call(pgb.querySelectorAll('.sk-sec:not(.in)'), function(s){ if (io) io.observe(s); else reveal(s); }); }
  new MutationObserver(scan).observe(pgb, { childList: true });
})();

/* ===== Skill FX: slow-motion, letupan, sinematik, filter, putar manual ===== */
(function(){
  var pg = document.getElementById('pg'), pgb = document.getElementById('pgb');
  if (!pg || !pgb || !window.SKR) return;
  var S = window.SKR, D = S.data;
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  function orbit() { return pgb.querySelector('.sk-orbit'); }
  function rnd(a, b) { return a + Math.random() * (b - a); }

  /* --- kendali kecepatan putar (slow-motion halus) --- */
  var ts = { cur: 1, boost: 0, running: false, last: 0 };
  var st = { holding: false, selected: false, hover: false };
  function base() { return st.holding ? .12 : st.selected ? .07 : st.hover ? .45 : 1; }
  function apply(r) {
    var o = orbit(); if (!o || !o.getAnimations) return;
    o.getAnimations({ subtree: true }).forEach(function(a){
      var n = a.animationName;
      if (n === 'skCw' || n === 'skCcw') { try { a.playbackRate = r; } catch (_) {} }
    });
  }
  function tick(t) {
    var dt = Math.min(.05, (t - ts.last) / 1000 || .016); ts.last = t;
    ts.boost *= Math.exp(-dt * 2.6);
    if (Math.abs(ts.boost) < .02) ts.boost = 0;
    var tgt = Math.max(.03, base() + ts.boost);
    ts.cur += (tgt - ts.cur) * Math.min(1, dt * 7);
    apply(ts.cur);
    if (Math.abs(ts.cur - tgt) < .004 && ts.boost === 0) { ts.cur = tgt; apply(tgt); ts.running = false; return; }
    requestAnimationFrame(tick);
  }
  function go() { if (reduce) return; if (!ts.running) { ts.running = true; ts.last = performance.now(); requestAnimationFrame(tick); } }
  function kick(v) { ts.boost = Math.max(-14, Math.min(14, ts.boost + v)); go(); }

  /* --- letupan partikel dan gelombang kejut --- */
  function fxBox(ic) {
    var cnt = ic.parentNode, box = document.createElement('div');
    box.className = 'sk-fxc'; cnt.appendChild(box);
    setTimeout(function(){ if (box.parentNode) box.parentNode.removeChild(box); }, 1700);
    return box;
  }
  function mk(box, cls) { var e = document.createElement('i'); e.className = cls; box.appendChild(e); return e; }
  function charge(ic) {
    if (reduce || !ic.animate) return;
    var box = fxBox(ic);
    for (var i = 0; i < 3; i++) {
      mk(box, 'sw' + (i === 1 ? ' k' : '')).animate(
        [{ transform: 'scale(3.4)', opacity: 0 }, { transform: 'scale(1.1)', opacity: .85, offset: .75 }, { transform: 'scale(.95)', opacity: 0 }],
        { duration: 560, delay: i * 130, easing: 'cubic-bezier(.3,.7,.2,1)', fill: 'backwards' });
    }
  }
  function burst(ic) {
    if (reduce || !ic.animate) return;
    var box = fxBox(ic), i, a, dist, e;
    for (i = 0; i < 3; i++) {
      mk(box, 'sw' + (i === 1 ? ' k' : '')).animate(
        [{ transform: 'scale(.7)', opacity: .9 }, { transform: 'scale(' + (3.2 + i * .9) + ')', opacity: 0 }],
        { duration: 760 + i * 120, delay: i * 90, easing: 'cubic-bezier(.12,.8,.2,1)', fill: 'both' });
    }
    for (i = 0; i < 14; i++) {
      a = (i / 14) * Math.PI * 2 + rnd(-.2, .2); dist = rnd(48, 105);
      e = mk(box, 'dt' + (i % 3 === 0 ? ' k' : '') + (i % 4 === 0 ? ' d' : ''));
      e.animate([{ transform: 'translate(0,0) scale(1)', opacity: 1 },
                 { transform: 'translate(' + (Math.cos(a) * dist) + 'px,' + (Math.sin(a) * dist) + 'px) scale(.15)', opacity: 0 }],
        { duration: rnd(650, 1100), easing: 'cubic-bezier(.1,.7,.2,1)', fill: 'forwards' });
    }
    for (i = 0; i < 8; i++) {
      a = (i / 8) * Math.PI * 2 + .2; dist = rnd(60, 120);
      e = mk(box, 'st');
      e.style.transformOrigin = '0 50%';
      e.animate([{ transform: 'rotate(' + a + 'rad) translateX(14px) scaleX(.3)', opacity: 1 },
                 { transform: 'rotate(' + a + 'rad) translateX(' + dist + 'px) scaleX(1.4)', opacity: 0 }],
        { duration: rnd(520, 800), easing: 'cubic-bezier(.1,.8,.2,1)', fill: 'forwards' });
    }
  }
  function punch(o) {
    if (reduce || !o || !o.animate) return;
    o.animate([{ scale: 1, rotate: '0deg' }, { scale: .94, rotate: '-2.5deg', offset: .16 }, { scale: 1.05, rotate: '1.2deg', offset: .5 }, { scale: 1, rotate: '0deg' }],
      { duration: 780, easing: 'cubic-bezier(.22,1,.36,1)' });
    var g = o.querySelector('.sk-glow');
    if (g && g.animate) g.animate([{ opacity: 1, scale: 1.45 }, { opacity: .4, scale: 1 }], { duration: 900, easing: 'ease-out' });
  }

  /* --- lapisan sinematik --- */
  function cineEl() {
    var c = pgb.querySelector('.sk-cine');
    if (!c) {
      c = document.createElement('div'); c.className = 'sk-cine'; c.setAttribute('aria-hidden', 'true');
      c.innerHTML = '<i class="fl"></i><i class="bar t"></i><i class="bar b"></i><span class="ttl"></span>';
      pgb.appendChild(c);
    }
    return c;
  }
  function cine(ic, d) {
    if (reduce) return;
    var c = cineEl(), r = ic.getBoundingClientRect();
    c.style.setProperty('--c', d.c);
    c.style.setProperty('--fx', (r.left + r.width / 2) + 'px');
    c.style.setProperty('--fy', (r.top + r.height / 2) + 'px');
    var fl = c.querySelector('.fl'), bt = c.querySelector('.bar.t'), bb = c.querySelector('.bar.b'), tt = c.querySelector('.ttl');
    fl.getAnimations().forEach(function(a){ a.cancel(); });
    bt.getAnimations().forEach(function(a){ a.cancel(); });
    bb.getAnimations().forEach(function(a){ a.cancel(); });
    tt.getAnimations().forEach(function(a){ a.cancel(); });
    fl.animate([{ opacity: 0 }, { opacity: .9, offset: .14 }, { opacity: 0 }], { duration: 700, easing: 'ease-out' });
    var ease = 'cubic-bezier(.22,1,.36,1)';
    bt.animate([{ transform: 'translateY(-100%)' }, { transform: 'translateY(0)', offset: .2 }, { transform: 'translateY(0)', offset: .66 }, { transform: 'translateY(-100%)' }], { duration: 1200, easing: ease });
    bb.animate([{ transform: 'translateY(100%)' }, { transform: 'translateY(0)', offset: .2 }, { transform: 'translateY(0)', offset: .66 }, { transform: 'translateY(100%)' }], { duration: 1200, easing: ease });
    tt.textContent = d.n;
    var w = window.innerWidth;
    tt.style.fontSize = Math.max(34, Math.min(w * .2, (w * .94) / (d.n.length * .72))) + 'px';
    tt.animate([
      { opacity: 0, transform: 'translateX(-7%) scale(1.1)', filter: 'blur(12px)' },
      { opacity: .92, transform: 'translateX(0) scale(1)', filter: 'blur(0)', offset: .24 },
      { opacity: .92, transform: 'translateX(1.5%) scale(1.01)', filter: 'blur(0)', offset: .68 },
      { opacity: 0, transform: 'translateX(8%) scale(.97)', filter: 'blur(8px)' }
    ], { duration: 1350, easing: ease });
  }

  /* --- event dari panel skill --- */
  pg.addEventListener('skfx', function(e){
    var t = e.detail.type, o = orbit();
    if (t === 'down') { st.holding = true; go(); charge(e.detail.ic); }
    else if (t === 'up') { st.holding = false; go(); }
    else if (t === 'open') {
      st.selected = true; kick(7); go();
      burst(e.detail.ic); punch(o); cine(e.detail.ic, e.detail.d);
    }
    else if (t === 'close') { st.selected = false; kick(3); go(); }
  });

  /* --- hover, putar manual, kemiringan 3D --- */
  var lastP = null;
  pgb.addEventListener('pointerover', function(e){
    if (e.pointerType === 'mouse' && e.target.closest && e.target.closest('.sk-orbit')) { st.hover = true; go(); }
  });
  pgb.addEventListener('pointerout', function(e){
    if (e.pointerType !== 'mouse') return;
    var to = e.relatedTarget;
    if (!(to && to.closest && to.closest('.sk-orbit'))) { st.hover = false; go(); }
  });
  pgb.addEventListener('pointermove', function(e){
    var o = orbit(); if (!o) return;
    var r = o.getBoundingClientRect(), cx = r.left + r.width / 2, cy = r.top + r.height / 2;
    var inside = Math.hypot(e.clientX - cx, e.clientY - cy) < r.width * .62;
    if (e.pointerType === 'mouse' && !reduce) {
      var nx = Math.max(-1, Math.min(1, (e.clientX - cx) / (innerWidth * .6))), ny = Math.max(-1, Math.min(1, (e.clientY - cy) / (innerHeight * .6)));
      o.style.transform = 'perspective(900px) rotateX(' + (-ny * 9).toFixed(2) + 'deg) rotateY(' + (nx * 9).toFixed(2) + 'deg)';
    }
    if (lastP && inside) {
      var rx = lastP.x - cx, ry = lastP.y - cy, dx = e.clientX - lastP.x, dy = e.clientY - lastP.y, q = rx * rx + ry * ry;
      if (q > 400) { var w = Math.abs((rx * dy - ry * dx) / q); if (w > .004) kick(Math.min(2.2, w * 9)); }
    }
    lastP = { x: e.clientX, y: e.clientY };
  });
  pgb.addEventListener('pointerleave', function(){ var o = orbit(); if (o) o.style.transform = ''; lastP = null; });

  /* --- kilau acak pada ikon --- */
  setInterval(function(){
    var o = orbit(); if (!o || pg.hidden || st.selected || st.holding || document.hidden) return;
    var l = o.querySelectorAll('.sk-ic:not(.dim):not(.sel)'); if (!l.length) return;
    var ic = l[Math.floor(Math.random() * l.length)];
    ic.classList.add('glint'); setTimeout(function(){ ic.classList.remove('glint'); }, 800);
  }, 1500);

  /* --- filter kategori --- */
  var curG = 'all';
  S.visible = function(){ return curG === 'all' ? S.order : S.order.filter(function(k){ return D[k].g === curG; }); };
  function setFilter(g) {
    curG = g;
    [].forEach.call(pgb.querySelectorAll('.sk-tab'), function(b){
      var on = b.getAttribute('data-fg') === g; b.classList.toggle('on', on); b.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
    [].forEach.call(pgb.querySelectorAll('.sk-ic'), function(ic){
      var m = g === 'all' || ic.getAttribute('data-g') === g;
      ic.classList.toggle('dim', !m); ic.classList.toggle('hl', m && g !== 'all');
    });
    var n = 0;
    [].forEach.call(pgb.querySelectorAll('.sk-card'), function(c){
      var m = g === 'all' || c.getAttribute('data-g') === g;
      c.hidden = !m;
      if (m) { c.classList.add('in'); if (!reduce && c.animate) c.animate([{ opacity: 0, transform: 'translateY(12px) scale(.95)' }, { opacity: 1, transform: 'none' }], { duration: 420, delay: (n++) * 45, easing: 'cubic-bezier(.22,1,.36,1)', fill: 'backwards' }); }
    });
    kick(6);
    var o = orbit(); if (o) punch(o);
  }
  pgb.addEventListener('click', function(e){
    var b = e.target.closest && e.target.closest('.sk-tab');
    if (b) setFilter(b.getAttribute('data-fg'));
  });
})();

(function(){
  var pg = document.getElementById('pg'), pgb = document.getElementById('pgb'); if (!pg || !pgb || !window.SKR) return;
  var S = SKR, D = S.data, RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var COL = { all:'#14181f', fe:'#d9731f', anim:'#1f9d6b', be:'#cf3f3f', tool:'#2c4a9e', ai:'#0891b2' };
  var NAME = { all:'Semua', fe:'Front-End', anim:'Animasi', be:'Back-End', tool:'Tools', ai:'AI' };
  var REP = { fe:'react', anim:'gsap', be:'laravel', tool:'vscode', ai:'claude' };
  /* isi penjelasan tiap tool: [pengantar, alasan, 5 kegunaan, tips, pertama kali, pelajaran, kesalahan] */
  var X = {
    html5:["HTML adalah kerangka halaman: tag yang memberi tahu browser mana judul, navigasi, artikel, formulir, dan tombol. HTML5 menambah tag semantik (header, nav, main, section, article, footer), elemen media seperti video dan canvas, serta input bawaan untuk email, tanggal, dan slider. Tanpa HTML yang benar, CSS dan JavaScript menempel di fondasi yang goyang.","Struktur yang benar membuat halaman terbaca oleh pembaca layar, mesin pencari, dan mode baca browser tanpa kerja tambahan. CSS saya juga jadi lebih pendek, karena elemen yang tepat sudah membawa perilaku bawaan.",["Menyusun kerangka halaman dengan header, main, section, dan footer","Memakai button untuk aksi dan a untuk pindah halaman, bukan div yang diberi klik","Menulis formulir dengan label, tipe input yang pas, dan validasi bawaan","Menambahkan alt pada gambar dan aria-label pada tombol ikon","Mengatur urutan heading h1 sampai h3 agar outline halaman masuk akal"],"Sebelum menulis CSS, matikan stylesheet sebentar. Kalau halaman masih terbaca urut dan masuk akal, struktur HTML-nya sudah benar.","Biodata satu halaman dengan teks biru bergaris bawah. Jelek, tapi itu pertama kalinya sesuatu yang saya tulis hidup di browser.","Pilih tag karena artinya, bukan karena tampilannya.","Memakai div untuk semuanya, lalu bingung kenapa tombol tidak bisa difokus dengan keyboard."],
    css3:["CSS mengatur semua yang terlihat: warna, huruf, jarak, tata letak, dan gerak. Flexbox menata satu arah, Grid menata dua arah, custom property menyimpan nilai yang dipakai ulang, dan media query menyesuaikan tampilan dengan ukuran layar. Transisi dan animasi bawaan menutup banyak kebutuhan yang dulu butuh library.","Browser mengerjakan CSS langsung di engine-nya, jadi animasi transform dan opacity mulus tanpa JavaScript. Satu file gaya yang rapi juga lebih ringan daripada setumpuk dependensi.",["Menata halaman dengan Grid dan komponen dengan Flexbox","Menyimpan warna, jarak, dan tema terang-gelap sebagai variabel CSS","Membuat animasi dengan transform dan opacity supaya tetap lancar","Menulis mobile-first lalu menambah breakpoint seperlunya","Memakai clamp() agar ukuran huruf mengalir mengikuti lebar layar"],"Animasikan transform dan opacity saja. Mengubah width, top, atau box-shadow terus-menerus membuat HP kelas menengah tersendat.","Memusatkan satu kotak memakan satu sore dan tiga tab StackOverflow. Sekarang itu dua baris.","Layout itu soal alur dan ruang, bukan menghafal properti.","Memberi z-index 9999 ke mana-mana, sampai semuanya saling menimpa dan saya harus belajar stacking context."],
    tailwind:["Tailwind adalah kumpulan utility class kecil seperti flex, p-4, dan text-lg yang disusun langsung di markup. Hanya class yang terpakai yang masuk ke CSS akhir, dan ada prefix responsif seperti md: dan lg: serta varian state seperti hover: dan focus:.","Jarak dan warna datang dari satu skala yang sama, jadi desain konsisten. Saya juga tidak lagi menamai class dan tidak bolak-balik antara file HTML dan CSS.",["Membuat prototipe halaman dalam satu file tanpa pindah-pindah","Menyetel layout responsif dengan prefix sm, md, dan lg","Mengubah warna dan font di konfigurasi agar punya karakter sendiri","Memadukannya dengan komponen React supaya class berulang jadi satu komponen","Memakai varian hover, focus, dan dark untuk keadaan interaktif"],"Kalau satu rangkaian class muncul lebih dari tiga kali, jadikan komponen. Jangan salin-tempel.","Awalnya risih melihat belasan class di satu tag. Seminggu kemudian saya tidak mau kembali.","Tailwind tidak menggantikan CSS. Ia mempercepat orang yang sudah paham CSS.","Menumpuk class tanpa aturan sampai satu tombol butuh dua baris. Sejak itu saya pecah jadi komponen."],
    bootstrap:["Bootstrap adalah framework CSS dengan grid 12 kolom, breakpoint standar, dan komponen siap pakai: navbar, card, modal, accordion, dan form. Versi terbarunya memakai variabel CSS sehingga tema bisa diubah tanpa menulis ulang.","Untuk halaman yang harus cepat jadi dan aman di banyak layar, grid dan komponennya sudah teruji. Ini framework pertama yang saya pelajari, jadi cara berpikir grid saya berawal dari sini.",["Menyusun halaman dengan container, row, dan col","Memakai navbar yang otomatis melipat di layar kecil","Membuat modal dan accordion tanpa menulis JavaScript sendiri","Mengganti warna utama lewat variabel agar tidak terlihat seperti bawaan","Menyiapkan prototipe untuk klien yang ingin melihat bentuknya dulu"],"Jangan biarkan bawaan. Ganti warna utama, radius, dan font, dan hasilnya langsung tidak terlihat seperti template.","Menempel class col-md-6 dan melihat kolom otomatis turun di HP. Saat itu saya sadar responsif ternyata bisa dipelajari.","Framework mempercepat langkah, tapi karakter tampilan tetap harus saya buat sendiri.","Menimpa class bawaan dengan !important berlapis-lapis. Mengubah variabelnya jauh lebih bersih."],
    vue:["Vue adalah framework JavaScript untuk antarmuka. Data dibuat reaktif lewat ref dan computed, sehingga tampilan ikut berubah saat data berubah. Template ditulis mirip HTML dengan directive seperti v-if, v-for, dan v-model, dan satu komponen disimpan dalam satu file .vue.","Kurva belajarnya landai dan model reaktivitasnya jelas. Saya memakainya sebagai pembanding supaya paham bahwa ide komponen dan state bukan milik satu library saja.",["Membuat komponen kecil dengan props dan emit","Memakai ref dan computed untuk data yang saling bergantung","Menampilkan daftar dengan v-for dan kondisi dengan v-if","Mengikat input dengan v-model untuk formulir sederhana","Membangun proyek latihan seperti daftar tugas dan kalkulator"],"Mulai dari satu komponen dan satu ref. Tambah fitur setelah yang itu benar-benar paham.","Saya buka karena penasaran kenapa orang bilang ramah pemula. v-model langsung membuat saya paham.","Belajar framework kedua membuat saya mengerti framework pertama lebih dalam.","Lupa memakai .value pada ref di script, lalu heran kenapa datanya tidak berubah."],
    gsap:["GSAP adalah library animasi JavaScript dengan kendali waktu yang presisi. Timeline menyusun urutan animasi, ScrollTrigger mengaitkan gerak dengan posisi gulir, dan easing mengatur rasa gerakan, dari lembut sampai memantul. Ia bisa menganimasikan CSS, SVG, dan objek JavaScript biasa.","Kalau urutan animasinya banyak, CSS saja cepat berantakan. Timeline membuat semuanya bisa dijeda, diputar balik, dan diatur ulang dari satu tempat.",["Menyusun animasi masuk halaman dengan timeline berurutan","Mengaitkan gerak elemen dengan posisi gulir lewat ScrollTrigger","Memilih easing agar gerakan terasa berat, ringan, atau lentur","Menganimasikan SVG, misalnya menggambar garis dari awal sampai akhir","Membersihkan animasi saat komponen dilepas supaya memori tidak bocor"],"Pilih easing sebelum durasi. Gerakan yang kaku jarang diselamatkan oleh durasi yang lebih panjang.","Timeline pertama saya cuma tiga kotak yang masuk bergantian. Saya memutarnya ulang belasan kali.","Gerakan yang bagus terasa alami. Yang terlihat justru mengganggu.","Membuat terlalu banyak animasi sekaligus, sampai halaman sendiri kehilangan fokus."],
    animejs:["Anime.js adalah library animasi ringan untuk CSS, SVG, DOM, dan objek JavaScript. Sintaksnya pendek, ada timeline dan stagger untuk animasi berjenjang, dan ukurannya kecil.","Untuk gerak kecil seperti ikon, garis, dan hover, saya tidak perlu memuat library besar. Ini cukup, ringan, dan cepat ditulis.",["Menganimasikan jalur SVG agar tergambar perlahan","Memberi jeda berjenjang antar elemen dengan stagger","Membuat angka statistik berhitung naik","Menyusun urutan pendek dengan timeline","Menambah umpan balik kecil saat tombol ditekan"],"Pakai stagger untuk daftar. Jeda 40 sampai 80 milidetik antar item sudah cukup untuk memberi kesan mengalir.","Saya mencari yang lebih ringan dari GSAP untuk efek kecil. Ketemu ini dan langsung cocok.","Animasi kecil yang tepat sasaran lebih membekas daripada yang besar tapi berlebihan.","Menganimasikan properti layout seperti width, padahal transform sudah cukup."],
    laravel:["Laravel adalah framework PHP untuk aplikasi web sisi server. Ia menyediakan routing, controller, Eloquent ORM untuk bicara dengan database, migration untuk versi skema, Blade untuk template, serta autentikasi dan validasi yang sudah jadi.","Strukturnya jelas dan dokumentasinya baik, jadi saya bisa melihat apa yang terjadi di balik tampilan: dari permintaan browser sampai data keluar dari database.",["Membuat route dan controller untuk halaman dan aksi dasar","Mendefinisikan tabel lewat migration dan mengelolanya dengan Eloquent","Menyusun tampilan dengan Blade dan layout bersama","Memvalidasi input formulir di sisi server","Memahami alur request, middleware, dan response secara utuh"],"Bangun satu proyek kecil sampai selesai, misalnya daftar tugas dengan login. Itu menunjukkan seluruh alurnya.","Saat pertama melihat sisi server, saya sadar tampilan cuma separuh cerita.","Back-end mengajarkan sabar: satu titik koma bisa menahan seluruh aplikasi.","Mengubah migration yang sudah dijalankan, bukan membuat migration baru."],
    react:["React membangun antarmuka dari komponen: potongan kecil yang menerima props, menyimpan state, dan menggambar dirinya sendiri. Hooks seperti useState dan useEffect mengelola data dan efek samping, dan React hanya memperbarui bagian layar yang memang berubah.","Tampilan yang rumit jadi bisa dirawat. Ubah satu komponen, dan semua tempat yang memakainya ikut berubah tanpa menyisir satu per satu.",["Membuat komponen yang bisa dipakai ulang dengan props","Mengelola data tampilan dengan useState dan useReducer","Mengambil data dan menjalankan efek samping lewat useEffect","Memecah halaman besar jadi komponen kecil yang jelas tanggung jawabnya","Membuat daftar, formulir, dan tampilan bersyarat yang responsif"],"Taruh state sesedikit dan sedekat mungkin dengan yang memakainya. Naikkan hanya kalau memang perlu dibagi.","Saya bingung kenapa semuanya harus komponen. Sekarang sulit membayangkan cara lain.","Pecah kecil dulu, gabungkan belakangan.","Menaruh semua state di komponen paling atas, sampai seluruh halaman dirender ulang tiap ketikan."],
    vscode:["VS Code adalah editor kode utama saya. Ada terminal terpadu, debugger, kontrol Git, pencarian ke seluruh proyek, dan ribuan extension untuk format, linting, serta autocomplete.","Cepat dibuka, ringan, dan bisa dibentuk sesuai kebiasaan. Satu jendela cukup untuk menulis, menjalankan, menguji, dan mengirim perubahan.",["Menulis HTML, CSS, dan JavaScript sepanjang hari","Memakai multi-cursor dan pencarian global untuk mengubah banyak tempat sekaligus","Merapikan kode otomatis saat disimpan dengan Prettier","Mencari error lewat debugger dan terminal bawaan","Melihat perubahan dan commit langsung dari panel Git"],"Hafalkan lima shortcut: palet perintah, pindah file cepat, multi-cursor, cari global, dan pindah baris. Hematnya terasa dalam seminggu.","Dulu saya menulis di editor apa saja. Sejak pindah ke sini, tidak pernah kembali.","Shortcut kecil yang dipakai tiap hari menghemat jam-jam yang besar.","Memasang terlalu banyak extension sampai editor terasa berat. Sekarang saya pasang yang benar-benar dipakai."],
    github:["GitHub menyimpan repositori Git di cloud. Setiap commit tercatat dengan pesan dan pembuatnya, branch memisahkan eksperimen dari versi utama, dan pull request memberi tempat meninjau sebelum digabung. GitHub Pages juga bisa menerbitkan situs statis langsung dari repositori.","Riwayat yang lengkap membuat saya berani bereksperimen, karena versi lama selalu bisa dikembalikan. Ia juga jadi etalase proyek saya.",["Menyimpan riwayat perubahan lewat commit dengan pesan jelas","Membuat branch untuk mencoba fitur tanpa merusak versi utama","Menerbitkan demo lewat GitHub Pages","Memamerkan proyek di profil @trynvexa","Mencadangkan seluruh proyek di luar laptop"],"Commit kecil dan sering, dengan pesan yang menjawab apa yang berubah dan kenapa. Dirimu enam bulan lagi akan berterima kasih.","Saya gugup menekan push pertama kali. Ternyata tidak ada yang rusak.","Berani bereksperimen karena apa pun bisa dikembalikan.","Satu commit berpesan update berisi sepuluh perubahan, lalu tidak bisa melacak mana yang merusak."],
    claude:["Claude adalah asisten AI dari Anthropic. Ia menulis dan membaca kode, menjelaskan konsep dari nol, meninjau struktur, dan membantu menyusun tulisan, dengan jawaban yang runtut dan mampu mengikuti percakapan panjang.","Penjelasannya runtut, jadi saya bisa paham kenapa sebuah kode bekerja, bukan cuma menyalinnya. Ia juga terus terang saat tidak yakin.",["Mencari penyebab bug dari pesan error dan potongan kode","Menjelaskan konsep baru dengan bahasa yang saya pahami","Merapikan nama, struktur, dan duplikasi di kode saya","Meninjau ulang hasil kerja sebelum dirilis","Menyusun dan memperbaiki teks, termasuk tulisan di halaman ini"],"Beri tujuan, potongan kode, dan pesan error sekaligus. Jawabannya jauh lebih tepat daripada pertanyaan pendek.","Awalnya saya cuma menyalin jawabannya. Lama-lama saya mulai bertanya kenapa.","AI paling berguna ketika saya tetap memegang kemudi dan memeriksa hasilnya.","Menempel kode hasil AI tanpa dibaca. Beberapa kali itu melahirkan bug yang lebih sulit dicari."],
    chatgpt:["ChatGPT adalah asisten AI dari OpenAI untuk percakapan bebas. Saya memakainya untuk melempar ide, menguji sudut pandang, merangkum bacaan panjang, dan mengubah catatan berantakan menjadi draf.","Cepat menghasilkan banyak kemungkinan sekaligus, jadi saya bisa memilih arah sebelum membuang waktu di jalan yang salah.",["Menggali ide fitur dan alur halaman","Merangkum dokumentasi panjang jadi poin utama","Menyusun draf awal teks dan potongan kode","Menguji ide dari sudut pandang pengguna yang berbeda","Menyiapkan pertanyaan sebelum bertanya ke sumber lain"],"Minta lima alternatif sekaligus, lalu gabungkan bagian terbaiknya sendiri. Jangan ambil satu mentah-mentah.","Saya pakai pertama untuk mencari judul. Sekarang jadi teman coret-coret harian.","Draf pertama dari AI adalah bahan, bukan hasil akhir.","Mempercayai nama fungsi yang terdengar yakin padahal salah. Sekarang saya cek ke dokumentasi."],
    gemini:["Gemini adalah AI dari Google yang terhubung dengan ekosistemnya, termasuk pencarian. Saya memakainya untuk riset cepat, membandingkan beberapa pendekatan, dan mengecek ulang jawaban dari AI lain.","Memeriksa silang itu penting. Satu sumber jarang cukup, dan Gemini memberi saya pembanding yang cepat.",["Riset cepat soal teknologi dan tren terbaru","Membandingkan beberapa solusi sebelum memutuskan","Memeriksa ulang jawaban AI lain","Mencari referensi dan contoh penerapan","Menguraikan istilah baru dalam bahasa sederhana"],"Untuk hal penting, buka dokumentasi resmi yang disebut. Jawaban AI adalah petunjuk, bukan bukti.","Saya coba karena ingin pembanding. Ternyata paling berguna untuk cek silang.","Satu sumber saja jarang cukup.","Menelan rekomendasi library yang ternyata sudah tidak dirawat. Sekarang saya cek tanggal rilis terakhirnya."],
    deepseek:["DeepSeek adalah model AI yang kuat di penalaran dan logika. Ia sering memaparkan langkah berpikirnya, jadi alur jawabannya bisa diikuti dan diperiksa.","Untuk masalah algoritma, saya butuh melihat prosesnya, bukan hanya jawabannya. Di situ saya bisa menemukan celah logika.",["Memecahkan soal logika dan algoritma yang buntu","Menjelaskan langkah berpikir secara berurutan","Mencari alternatif solusi yang lebih ringkas","Menguji ulang logika yang terasa janggal","Memeriksa kasus batas yang terlewat"],"Minta ia menunjukkan langkahnya, lalu uji satu per satu dengan contoh angka kecil.","Saya pakai saat satu masalah logika buntu seharian. Langkahnya membuat saya sadar di mana saya salah.","Cara berpikir yang berbeda kadang membuka pintu yang selama ini ada di depan mata.","Percaya pada langkah yang rapi padahal ada satu asumsi keliru di awal."]
  };
  Object.keys(X).forEach(function(k){ var a = X[k], o = D[k]; if (!o) return; o.d = a[0]; o.w = a[1]; o.u = a[2]; o.tip = a[3]; o.first = a[4]; o.less = a[5]; o.pit = a[6]; });
  var curG = 'all', snd = false, ac;
  function click(){ if (!snd) return; try { ac = ac || new (window.AudioContext || window.webkitAudioContext)(); var o = ac.createOscillator(), g = ac.createGain(), t = ac.currentTime; o.frequency.setValueAtTime(520, t); o.frequency.exponentialRampToValueAtTime(880, t + .06); g.gain.setValueAtTime(.04, t); g.gain.exponentialRampToValueAtTime(.0001, t + .09); o.connect(g); g.connect(ac.destination); o.start(); o.stop(t + .1); } catch (e) {} }
  function tween(el, to, ms, suf){ var f = parseFloat(el.textContent) || 0, t0 = performance.now(); (function s(t){ var p = Math.min(1, (t - t0) / ms); el.textContent = Math.round(f + (to - f) * (1 - Math.pow(1 - p, 3))) + (suf || ''); if (p < 1) requestAnimationFrame(s); })(t0); }
  function cnt(g){ return g === 'all' ? S.order.length : S.order.filter(function(k){ return D[k].g === g; }).length; }

  /* latar ringan + garis kemajuan gulir */
  var fx = document.createElement('div'); fx.className = 'fx64'; fx.setAttribute('aria-hidden', 'true');
  fx.innerHTML = '<i class="bl b1" style="--k:-.05"></i><i class="bl b2" style="--k:-.1"></i><i class="bl b3" style="--k:-.15"></i><i class="dots" style="--k:-.03"></i>';
  var pr = document.createElement('div'); pr.className = 'prog64'; pr.setAttribute('aria-hidden', 'true');
  pg.insertBefore(fx, pg.firstChild); pg.insertBefore(pr, pg.firstChild);
  var lx = innerWidth / 2, ly = innerHeight / 2, lastC;
  document.addEventListener('pointerdown', function(e){ lx = e.clientX; ly = e.clientY; }, true);
  var SEC = { '#14181f':'#8a94a6', '#d9731f':'#f5b84a', '#1f9d6b':'#4cc9a0', '#cf3f3f':'#f08a7a', '#2c4a9e':'#6a8de8', '#0891b2':'#4fd1e5' };
  function wash(c){
    if (RM || !fx.animate || !pg.classList.contains('open')) return;
    var f = document.createElement('i'), r = document.createElement('i'); f.className = 'wsh'; r.className = 'wsh wr';
    f.style.cssText = r.style.cssText = 'left:' + lx + 'px;top:' + ly + 'px;--k:0';
    f.style.background = 'color-mix(in srgb,' + c + ' 24%,transparent)'; r.style.border = '2px solid ' + c;
    fx.appendChild(f); fx.appendChild(r);
    f.animate([{ transform: 'scale(0)', opacity: 1 }, { transform: 'scale(80)', opacity: .9, offset: .55 }, { transform: 'scale(80)', opacity: 0 }], { duration: 1500, easing: 'cubic-bezier(.2,.7,.2,1)' }).onfinish = function(){ f.remove(); };
    r.animate([{ transform: 'scale(0)', opacity: .8 }, { transform: 'scale(60)', opacity: 0 }], { duration: 1000, easing: 'cubic-bezier(.2,.7,.2,1)' }).onfinish = function(){ r.remove(); };
    [].forEach.call(fx.querySelectorAll('.bl'), function(b, n){ b.animate([{ scale: 1 }, { scale: 1.35 }, { scale: 1 }], { duration: 1600, delay: n * 120, easing: 'ease-in-out' }); });
  }
  function setC(c){ pg.style.setProperty('--cc', c); fx.style.setProperty('--bgc', c); fx.style.setProperty('--bgd', SEC[c] || c); if (lastC && lastC !== c) wash(c); lastC = c; }

  /* dok */
  function sync(g, fromClick, ox, oy){
    curG = g; if (ox != null) { lx = ox; ly = oy; } setC(COL[g]);
    var dock = pgb.querySelector('.sk-cats'); if (!dock) return;
    var on = dock.querySelector('.sk-dk[data-fg="' + g + '"]'), pill = dock.querySelector('.sk-pill');
    if (on && pill) { pill.classList.remove('mv'); void pill.offsetWidth; pill.classList.add('mv'); pill.style.top = (on.offsetTop - 4) + 'px'; pill.style.left = (on.offsetLeft - 4) + 'px'; pill.style.width = pill.style.height = (on.offsetWidth + 8) + 'px'; }
    var b = dock.querySelector('.sk-n b'); if (b) tween(b, cnt(g), 450);
    var gh = pgb.querySelector('.sk-ghost'); if (gh) { gh.textContent = g === 'all' ? 'SKILL' : NAME[g].toUpperCase(); if (!RM && gh.animate) gh.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 500, easing: 'ease-out' }); }
    if (fromClick && on && !RM) { on.classList.add('pull'); setTimeout(function(){ on.classList.remove('pull'); }, 950); }
  }
  function build(dock){
    dock.setAttribute('data-v66', '1');
    dock.insertAdjacentHTML('afterbegin', '<i class="sk-pill"></i>');
    var tabs = [].slice.call(dock.querySelectorAll('.sk-tab'));
    tabs.forEach(function(b){
      var g = b.getAttribute('data-fg'), im = REP[g] && pgb.querySelector('.sk-card[data-k="' + REP[g] + '"] img');
      b.classList.add('sk-dk'); b.setAttribute('aria-label', NAME[g]);
      b.innerHTML = (im ? '<img alt="" src="' + im.src + '">' : '<svg viewBox="0 0 24 24"><rect x="4" y="4" width="6.5" height="6.5" rx="1.5"/><rect x="13.5" y="4" width="6.5" height="6.5" rx="1.5"/><rect x="4" y="13.5" width="6.5" height="6.5" rx="1.5"/><rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1.5"/></svg>') + '<span class="sk-dl">' + NAME[g] + '</span>';
    });
    dock.insertAdjacentHTML('beforeend', '<div class="sk-n"><b>' + cnt(curG) + '</b><small>tool</small></div><button type="button" class="sk-snd" aria-pressed="false" aria-label="Suara"><svg viewBox="0 0 24 24"><path d="M4 9v6h4l5 4V5L8 9zM16.5 9a4 4 0 010 6"/></svg></button>');
    dock.querySelector('.sk-snd').addEventListener('click', function(e){ e.stopPropagation(); snd = !snd; this.setAttribute('aria-pressed', snd); click(); });
    requestAnimationFrame(function(){ sync(curG); });
  }
  pgb.addEventListener('click', function(e){
    var t = e.target.closest && e.target.closest('.sk-tab'); if (t) { var rc = t.getBoundingClientRect(); sync(t.getAttribute('data-fg'), !!t.closest('.sk-cats'), rc.left + rc.width / 2, rc.top + rc.height / 2); click(); }
    else if (e.target.closest && e.target.closest('.sk-ic,.sk-card')) click();
    else if (e.target.closest && e.target.closest('.sk-hint')) { var n = pgb.querySelector('.sk-intro'); if (n) n.scrollIntoView({ behavior: RM ? 'auto' : 'smooth', block: 'start' }); }
  });

  /* angka naik pada bar keahlian */
  var BC = { 'HTML & CSS':'fe', 'UI Design':'fe', 'AI Prompting':'ai', 'JavaScript':'fe', 'Git & GitHub':'tool', 'React':'fe', 'Tailwind & Bootstrap':'fe', 'Animasi Web':'anim', 'Vue.js':'fe', 'Laravel':'be' };
  function fill(rg, v){ var nb = rg.querySelector('b'); if (RM) { rg.style.setProperty('--rp', v); nb.textContent = v; return; } var t0 = performance.now(); (function s(t){ var p = Math.min(1, (t - t0) / 1200), e = 1 - Math.pow(1 - p, 3); rg.style.setProperty('--rp', (v * e).toFixed(1)); nb.textContent = Math.round(v * e); if (p < 1) requestAnimationFrame(s); })(t0); }
  var io = 'IntersectionObserver' in window && new IntersectionObserver(function(es){ es.forEach(function(en){ if (!en.isIntersecting) return; io.unobserve(en.target); var rg = en.target.querySelector('.sk-rg'); fill(rg, +rg.getAttribute('data-v')); }); }, { threshold: .4 });
  function rings(){ [].forEach.call(pgb.querySelectorAll('.sk-bar:not([data-o])'), function(bar){ bar.setAttribute('data-o', 1); var sp = bar.querySelectorAll('.t span'), v = parseInt(sp[1] && sp[1].textContent, 10) || 0; bar.style.setProperty('--rc', COL[BC[sp[0].textContent] || 'fe']); bar.insertAdjacentHTML('afterbegin', '<div class="sk-rg" data-v="' + v + '"><i></i><b>0</b></div>'); var rg = bar.querySelector('.sk-rg'); if (io) io.observe(bar); else fill(rg, v); }); }
  var mo = 'IntersectionObserver' in window && new IntersectionObserver(function(es){ es.forEach(function(en){ en.target.classList.toggle('vis', en.isIntersecting); }); });

  /* panel */
  function enhance(p){
    var k = p.getAttribute('data-k'), d = D[k];
    if (!p.classList.contains('show')) { setC(COL[curG]); return; }
    if (!d) return; setC(COL[d.g]);
    var pn = p.querySelector('.sk-pn'), lv = p.querySelector('.sk-lv');
    if (!p.querySelector('.sk-mtr')) { lv.insertAdjacentHTML('beforeend', '<div class="sk-mtr"><i></i></div>'); p.querySelector('.sk-why').parentNode.insertAdjacentHTML('afterend', '<div class="sk-row sk-first"><b class="sk-sh">Pertama kali pakai</b><p></p></div><div class="sk-row sk-less"><b class="sk-sh">Pelajaran terbesar</b><p></p></div><div class="sk-row sk-pit"><b class="sk-sh">Kesalahan yang pernah saya buat</b><p></p></div>'); }
    var m = p.querySelector('.sk-mtr i'); m.style.width = '0'; setTimeout(function(){ m.style.width = (d.l * 20) + '%'; }, 120);
    p.querySelector('.sk-first p').textContent = d.first || ''; p.querySelector('.sk-less p').textContent = d.less || ''; p.querySelector('.sk-pit p').textContent = d.pit || '';
    if (RM) return;
    var full = d.n, n = 0; pn.textContent = ''; pn.classList.add('typing'); clearInterval(pn._t);
    pn._t = setInterval(function(){ pn.textContent = full.slice(0, ++n); if (n >= full.length) { clearInterval(pn._t); pn.classList.remove('typing'); } }, 55);
    var im = p.querySelector('.sk-pi img'); if (im.animate) im.animate([{ transform: 'rotate(-220deg) scale(.2)', opacity: 0 }, { transform: 'none', opacity: 1 }], { duration: 700, easing: 'cubic-bezier(.22,1,.36,1)' });
    [].forEach.call(p.querySelectorAll('.sk-row'), function(r, j){ if (r.animate) r.animate([{ opacity: 0, transform: 'translateY(14px)' }, { opacity: 1, transform: 'none' }], { duration: 450, delay: 220 + j * 80, easing: 'ease-out', fill: 'backwards' }); });
  }
  function swipe(p){
    var x0, y0, ok = false;
    p.addEventListener('pointerdown', function(e){ x0 = e.clientX; y0 = e.clientY; ok = !e.target.closest('button,summary'); });
    p.addEventListener('pointerup', function(e){ if (!ok) return; ok = false; var dx = e.clientX - x0, dy = e.clientY - y0; if (Math.abs(dx) > 70 && Math.abs(dx) > Math.abs(dy) * 1.5) { var b = p.querySelector(dx < 0 ? '.sk-nx' : '.sk-pv'); if (b) b.click(); } });
  }
  function scan(){
    var dock = pgb.querySelector('.sk-cats'); if (dock && !dock.getAttribute('data-v66')) build(dock);
    var hint = pgb.querySelector('.sk-hint'); if (hint && !hint.getAttribute('data-v66')) { hint.setAttribute('data-v66', '1'); hint.innerHTML = '<span>Tekan ikon untuk membaca detailnya</span><span class="h-b">Gulir ke bawah: keahlian, cara kerja, tanya jawab</span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>'; hint.setAttribute('role', 'button'); hint.setAttribute('tabindex', '0'); }
    var p = pgb.querySelector('.sk-panel'); if (p && !p._v66) { p._v66 = 1; swipe(p); new MutationObserver(function(){ enhance(p); }).observe(p, { attributes: true, attributeFilter: ['data-k', 'class'] }); }
    rings();
    if (mo) [].forEach.call(pgb.querySelectorAll('.sk-marq:not([data-o])'), function(b){ b.setAttribute('data-o', 1); mo.observe(b); });
  }
  new MutationObserver(scan).observe(pgb, { childList: true, subtree: true }); scan();
})();


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
    im.src = src; im.alt = 'Foto ' + (i + 1);
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


/* ============================================================
   music.js
   ============================================================ */

/**
 * Vinyl Audio Player & Visualizer
 * HTML5 audio playlist, canvas ambient dust particles, progress scrub slider,
 * and responsive turntable controls.
 */
(function(){
/* ===== Daftar lagu & Web Audio Studio Synth Engine =====
   Mendukung file MP3 (jika tersedia di assets/audio/) sekaligus Mode Studio Interaktif
   berbasis Web Audio API agar pemutar musik selalu berfungsi mulus tanpa error 404. */
var TRACKS=[
{t:"BAD",a:"ATEEZ",d:"2:36",g:"Dark R&B · 118 BPM",bpm:118,notes:[220,261.63,329.63,392],src:"assets/audio/lagu-1.mp3"},
{t:"RUDE!",a:"Hearts2Hearts",d:"3:20",g:"Upbeat Pop · 126 BPM",bpm:126,notes:[261.63,329.63,392,493.88],src:"assets/audio/lagu-2.mp3"},
{t:"REDRED",a:"CORTIS",d:"2:43",g:"Alt Hip-Hop · 110 BPM",bpm:110,notes:[196,233.08,293.66,349.23],src:"assets/audio/lagu-3.mp3"},
{t:"Drip",a:"ATEEZ",d:"3:02",g:"Performance Trap · 135 BPM",bpm:135,notes:[185,220,277.18,329.63],src:"assets/audio/lagu-4.mp3"},
{t:"BANG BANG BANG",a:"BIGBANG",d:"3:40",g:"Electro Anthem · 130 BPM",bpm:130,notes:[246.94,293.66,369.99,440],src:"assets/audio/lagu-5.mp3"},
{t:"Bloody Paradise",a:"ENHYPEN",d:"2:11",g:"Dark Synth · 122 BPM",bpm:122,notes:[207.65,246.94,311.13,392],src:"assets/audio/lagu-6.mp3"}
];
var reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;
var au=new Audio(),cur=-1,ol=null,pg=null,bg=null,sim=false,simT=0,raf=0,rot=0,vel=0,last=0,cv=null,cx=null,P=[],np=null;au.preload="none";
var synthOn=true,actx=null,synthTimer=0,stepIdx=0;
function stopSynth(){
  if(synthTimer){clearInterval(synthTimer);synthTimer=0;}
}
function playSynthStep(){
  if(!synthOn||!sim||cur<0)return;
  try{
    actx=actx||new (window.AudioContext||window.webkitAudioContext)();
    if(actx.state==="suspended")actx.resume();
    var tr=TRACKS[cur],notes=tr.notes||[220,261.63,329.63,392];
    var freq=notes[stepIdx%notes.length]*(stepIdx%8===7?1.5:1);
    var now=actx.currentTime;
    var osc=actx.createOscillator(),gain=actx.createGain(),flt=actx.createBiquadFilter();
    osc.type=stepIdx%2===0?"triangle":"sine";
    osc.frequency.setValueAtTime(freq,now);
    flt.type="lowpass";
    flt.frequency.setValueAtTime(920,now);
    gain.gain.setValueAtTime(0.0001,now);
    gain.gain.linearRampToValueAtTime(0.032,now+0.025);
    gain.gain.exponentialRampToValueAtTime(0.0001,now+0.38);
    osc.connect(flt);flt.connect(gain);gain.connect(actx.destination);
    osc.start(now);osc.stop(now+0.4);
    if(stepIdx%4===0){
      var bass=actx.createOscillator(),bgain=actx.createGain();
      bass.type="sine";
      bass.frequency.setValueAtTime(notes[0]*0.5,now);
      bass.frequency.exponentialRampToValueAtTime(notes[0]*0.25,now+0.18);
      bgain.gain.setValueAtTime(0.04,now);
      bgain.gain.exponentialRampToValueAtTime(0.0001,now+0.22);
      bass.connect(bgain);bgain.connect(actx.destination);
      bass.start(now);bass.stop(now+0.24);
    }
    stepIdx++;
  }catch(e){}
}
function syncSynth(){
  stopSynth();
  if(sim&&cur>=0&&synthOn){
    var bpm=(TRACKS[cur]&&TRACKS[cur].bpm)||120;
    var iv=Math.round((60/bpm)*500);
    playSynthStep();
    synthTimer=setInterval(playSynthStep,iv);
  }
}
function esc(x){return String(x).replace(/[&<>"]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c];});}
function fmt(s){s=Math.max(0,Math.floor(s||0));return Math.floor(s/60)+":"+("0"+s%60).slice(-2);}
function secs(d){var p=d.split(":");return (+p[0]||0)*60+(+p[1]||0)||1;}
function live(){return !au.paused&&!!au.src;}
var urls={};
function srcOf(i){
  var s=TRACKS[i].src;if(!s||s.slice(0,5)!=="data:")return s;if(urls[i])return urls[i];
  try{var c=s.indexOf(","),bin=atob(s.slice(c+1)),n=bin.length,u=new Uint8Array(n);
    for(var k=0;k<n;k++)u[k]=bin.charCodeAt(k);
    urls[i]=URL.createObjectURL(new Blob([u],{type:s.slice(5,c).split(";")[0]||"audio/mpeg"}));
  }catch(e){urls[i]=s;}
  return urls[i];
}
function fallbackToStudio(){
  au.pause();au.removeAttribute("src");
  sim=true;syncSynth();mark();
}
function go(){
  var pr;try{pr=au.play();}catch(e){fallbackToStudio();return;}
  if(pr&&pr.catch)pr.catch(function(e){if(e&&e.name==="AbortError")return;fallbackToStudio();});
}
function running(){return cur>=0&&(TRACKS[cur].src&&!sim?live():sim);}
function ghost(t){var g=bg&&bg.querySelector(".ghost");if(!g)return;g.textContent=t;g.classList.remove("sw");void g.offsetWidth;g.classList.add("sw");}
function mark(){
  if(!ol)return;var run=running();
  if(pg)pg.classList.toggle("playing",run);
  if(np){
    np.classList.toggle("go",run);
    var kk=np.querySelector(".npk");
    if(kk)kk.textContent=run?"Sedang diputar":(cur>=0?"Dijeda":"Pemutar");
  }
  [].forEach.call(ol.children,function(li,i){var b=li.firstChild;
    if(i===cur)b.setAttribute("aria-current","true");else{b.removeAttribute("aria-current");b.style.removeProperty("--p");}
    b.classList.toggle("go",i===cur&&run);});
}
var ACC=[["#e0654f","#f59a72"],["#cf5f82","#ee93ad"],["#c9524f","#e98479"],["#3f8cc2","#76bde0"],["#c8832a","#e8ae55"],["#3f8f7b","#6dbfa8"]];
var SV={pv:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 5h2v14H6zM20 5v14L9.5 12z"/></svg>',nx:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M16 5h2v14h-2zM4 5v14l10.5-7z"/></svg>',pl:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>',ps:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z"/></svg>'};
function accent(i){if(!pg)return;var a=ACC[i%ACC.length];pg.style.setProperty("--acc",a[0]);pg.style.setProperty("--acc2",a[1]);pg.classList.add("started");}
function npBuild(){
  if(np&&np.parentNode)np.parentNode.removeChild(np);
  np=document.createElement("div");np.className="np";np.setAttribute("role","group");np.setAttribute("aria-label","Pemutar musik");
  np.innerHTML='<div class="npr"><span class="npd" aria-hidden="true"></span><div class="npi"><div class="np-head-row"><span class="npk">Pemutar</span></div><b class="npt">Pilih lagu</b><em class="npa">Ketuk satu lagu di playlist</em></div><div class="npc"><button type="button" class="npv pv" aria-label="Lagu sebelumnya">'+SV.pv+'</button><button type="button" class="npv npp" aria-label="Putar atau jeda"><span class="i1">'+SV.pl+'</span><span class="i2">'+SV.ps+'</span></button><button type="button" class="npv nx" aria-label="Lagu berikutnya">'+SV.nx+'</button></div></div><div class="npq"><span class="npm" aria-hidden="true">0:00</span><div class="npb" role="slider" tabindex="0" aria-label="Posisi lagu" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"><i></i><u></u></div><span class="npe" aria-hidden="true">0:00</span></div>';
  np.querySelector(".pv").addEventListener("click",function(){pick(cur<=0?TRACKS.length-1:cur-1);});
  np.querySelector(".nx").addEventListener("click",function(){pick((cur+1)%TRACKS.length);});
  np.querySelector(".npp").addEventListener("click",function(){pick(cur<0?0:cur);});
  var sk=np.querySelector(".npb"),drag=false;
  function seekTo(e){
    if(cur<0)return;
    var r=sk.getBoundingClientRect(),ratio=Math.min(1,Math.max(0,(e.clientX-r.left)/r.width));
    if(TRACKS[cur].src&&!sim&&au.duration&&isFinite(au.duration)){
      au.currentTime=au.duration*ratio;
    }else{
      var dur=secs(TRACKS[cur].d);
      simT=dur*ratio;
      if(ol&&ol.children[cur])ol.children[cur].firstChild.style.setProperty("--p",ratio);
      npTime(simT,dur);
    }
  }
  sk.addEventListener("pointerdown",function(e){drag=true;seekTo(e);try{sk.setPointerCapture(e.pointerId);}catch(x){}});
  sk.addEventListener("pointermove",function(e){if(drag)seekTo(e);});
  sk.addEventListener("pointerup",function(){drag=false;});
  sk.addEventListener("pointercancel",function(){drag=false;});
  sk.addEventListener("keydown",function(e){
    if(cur<0)return;
    if(e.key==="ArrowRight"||e.key==="ArrowLeft"){
      var delta=e.key==="ArrowRight"?5:-5;
      if(TRACKS[cur].src&&!sim&&au.duration&&isFinite(au.duration)){
        au.currentTime=Math.min(au.duration,Math.max(0,au.currentTime+delta));
      }else{
        var dur=secs(TRACKS[cur].d);
        simT=Math.min(dur,Math.max(0,simT+delta));
        npTime(simT,dur);
      }
      e.preventDefault();
    }
  });
  (ol.parentNode||pg).appendChild(np);
}
function npSet(i){if(!np)return;np.querySelector(".npt").textContent=TRACKS[i].t;np.querySelector(".npa").textContent=TRACKS[i].a+" · "+(TRACKS[i].g||"");npTime(0,secs(TRACKS[i].d));}
function npTime(t,d){
  if(!np)return;var f=d&&isFinite(d)?Math.min(1,t/d):0;np.style.setProperty("--p",f);
  var m=np.querySelector(".npm"),e=np.querySelector(".npe"),b=np.querySelector(".npb");
  if(m)m.textContent=fmt(t);if(e&&d&&isFinite(d))e.textContent=fmt(d);if(b)b.setAttribute("aria-valuenow",Math.round(f*100));
}
function pick(i){
  var x=TRACKS[i];
  if(i===cur){
    if(x.src&&!sim){if(au.paused)go();else au.pause();}
    else{sim=!sim;syncSynth();}
    mark();return;
  }
  cur=i;simT=0;stepIdx=0;au.pause();stopSynth();accent(i);npSet(i);
  if(x.src){sim=false;au.src=srcOf(i);go();}else{au.removeAttribute("src");sim=true;syncSynth();}
  ghost(x.t);mark();
}
au.addEventListener("timeupdate",function(){
  if(!ol||cur<0||!au.duration)return;ol.children[cur].firstChild.style.setProperty("--p",au.currentTime/au.duration);npTime(au.currentTime,au.duration);
});
au.addEventListener("loadedmetadata",function(){
  if(!ol||cur<0||!isFinite(au.duration))return;TRACKS[cur].d=fmt(au.duration);
  var d=ol.children[cur].querySelector(".d");if(d)d.textContent=TRACKS[cur].d;
});
au.addEventListener("play",mark);au.addEventListener("pause",mark);
au.addEventListener("error",function(){if(au.getAttribute("src")&&cur>=0)fallbackToStudio();});
au.addEventListener("ended",function(){pick((cur+1)%TRACKS.length);});

function dustInit(){
  cv=bg.querySelector(".dust");cx=cv&&cv.getContext("2d");P=[];
  for(var i=0;i<46;i++)P.push({x:Math.random(),y:Math.random(),r:.6+Math.random()*1.8,vx:(Math.random()-.5)*.03,vy:-.02-Math.random()*.04,a:.25+Math.random()*.5,ph:Math.random()*6.3});
}
function dust(t,run,dt){
  if(!cx)return;var w=cv.clientWidth,h=cv.clientHeight,d=Math.min(2,devicePixelRatio||1);
  if(cv.width!==Math.round(w*d)){cv.width=Math.round(w*d);cv.height=Math.round(h*d);}
  cx.setTransform(d,0,0,d,0,0);cx.clearRect(0,0,w,h);
  P.forEach(function(p){
    p.x+=p.vx*dt;p.y+=p.vy*dt;if(p.y<-.02)p.y=1.02;if(p.x<-.02)p.x=1.02;if(p.x>1.02)p.x=-.02;
    var a=p.a*(.55+.45*Math.sin(t*.0009+p.ph))*(run?.9:.45);
    cx.fillStyle=(run?"rgba(255,255,255,":"rgba(224,110,60,")+a.toFixed(3)+")";
    cx.beginPath();cx.arc(p.x*w,p.y*h,p.r,0,6.283);cx.fill();
  });
}
function tick(now){
  if(!ol||!ol.isConnected){stopSynth();raf=0;return;}
  var dt=Math.min(.05,(now-last)/1000||0);last=now;var run=running();
  vel+=((run?72:0)-vel)*Math.min(1,dt*(run?1.6:2.2));rot=(rot+vel*dt)%360;
  bg.style.setProperty("--rot",rot.toFixed(2));
  if(cur>=0&&sim){
    var totalDur=secs(TRACKS[cur].d);
    simT+=dt;
    var p=Math.min(1,simT/totalDur);
    if(ol.children[cur])ol.children[cur].firstChild.style.setProperty("--p",p);
    npTime(simT,totalDur);
    if(p>=1)pick((cur+1)%TRACKS.length);
  }
  dust(now,run,dt);raf=requestAnimationFrame(tick);
}
function fill(el){
  if(el.dataset.ok)return;el.dataset.ok=1;ol=el;cur=-1;sim=false;stopSynth();pg=el.closest(".pg");bg=pg.querySelector(".bg");
  el.innerHTML=TRACKS.map(function(x,i){
    return '<li style="--i:'+i+'"><button type="button" class="tk" data-i="'+i+'" aria-label="'+esc(x.t)+', '+esc(x.a)+', '+esc(x.d)+'"><span class="n">'+("0"+(i+1)).slice(-2)+'</span><span class="eqb" aria-hidden="true"><i></i><i></i><i></i></span><b>'+esc(x.t)+'</b><em>'+esc(x.a)+' <small class="tk-g">&middot; '+esc(x.g||'')+'</small></em><span class="d">'+esc(x.d)+'</span></button></li>';
  }).join("");
  el.addEventListener("click",function(e){var b=e.target.closest(".tk");if(b)pick(+b.dataset.i);});
  el.addEventListener("mousemove",function(e){var b=e.target.closest(".tk");if(!b)return;var r=b.getBoundingClientRect();b.style.setProperty("--hx",(e.clientX-r.left)+"px");b.style.setProperty("--hy",(e.clientY-r.top)+"px");});
  npBuild();mark();
  if(!reduce){dustInit();last=performance.now();if(!raf)raf=requestAnimationFrame(tick);}
}
function scan(){
  if(ol&&!ol.isConnected){au.pause();stopSynth();if(np&&np.parentNode)np.parentNode.removeChild(np);np=null;ol=null;pg=null;bg=null;cur=-1;sim=false;vel=0;}
  var e=document.getElementById("plist");if(e)fill(e);
}
new MutationObserver(scan).observe(document.body,{childList:true,subtree:true});scan();
})();


/* ============================================================
   story.js
   ============================================================ */

/**
 * Interactive Story Timeline & Dynamic SVG Wave Thread
 * Bezier curve connector that links milestones and handles multi-language chapters.
 */
(function(){
  var pg=document.getElementById("pg"),pgb=document.getElementById("pgb");if(!pg||!pgb)return;
  var DICT = {"en":{"bk":"Back","h":"My Story","sub":"A journey of growth, craft, and finding direction through web development & UI design.","lead":"From growing up in Medan to stepping into the software industry — here are the real chapters that shaped my discipline, curiosity, and craft.","c1w":"2011 · Medan","c1t":"Roots & Early Achievement","c1p1":"Born in 2011 in Medan, North Sumatra, and raised with warmth across both my father's and mother's extended families as the first grandchild on both sides.","c1p2":"One of my earliest proud milestones was winning 1st Place in the City-Level Tahfidz Championship at age six — an early lesson that consistent focus and dedication yield real results.","c2w":"School Years","c2t":"Character & Foundation","c2p1":"Completed elementary education at MIS Aisyiyah Sumatera Utara and junior high at MTs Aisyiyah Sumatera Utara.","c2p2":"Those years built my sense of discipline, resilience through challenges, lasting friendships, and an early curiosity for how digital interfaces work.","c3w":"Vocational High School","c3t":"Entering Software & Web at SMK Swasta Mandiri","c3p1":"Continued my education at SMK Swasta Mandiri in Medan, where curiosity turned into focused technical practice.","c3p2":"Here I began diving deeper into web engineering, learning to think independently, experiment boldly, and build a clear path toward front-end development.","c4w":"Self-Taught Craft","c4t":"Deepening Code, Motion & UI Design","c4p1":"Honed semantic HTML5, modern CSS3 and Tailwind CSS architecture, interactive JavaScript (ES6+), and motion choreography with GSAP and Anime.js.","c4p2":"Realized that great digital products require both visual precision and clean, fast-loading code that feels effortless on any screen.","c5w":"2nd Year SMK · Industry","c5t":"Industry Work Placement (PKL) at DigitalCODE","c5p1":"Currently in my second year of SMK, completing my first industry work placement (PKL) at DigitalCODE.","c5p2":"Working in a real production environment has sharpened my workflow — translating classroom fundamentals into practical, well-structured web interfaces.","c6w":"Today & Beyond","c6t":"Present Focus & Future Vision","c6p1":"Building responsive landing pages, interactive UI systems, and modern web experiences from Medan while continuously expanding into React, Vue, and AI-assisted workflows.","c6p2":"Open to freelance projects, creative collaborations, and building meaningful digital products.","e1":"Keep growing, keep building, and stay authentic.","e2":"Every line of code is a step toward a better craft.","ctaProj":"Explore Featured Projects ↗","ctaContact":"Start a Conversation ↗"},"zh":{"bk":"返回","h":"我的故事","sub":"一段关于成长、磨砺以及在网页开发与界面设计中探索方向的旅程。","lead":"从在棉兰成长到踏入软件行业——以下是我培养自律、好奇心与技术匠心的真实篇章。","c1w":"2011 · 棉兰","c1t":"成长根基与早期荣誉","c1p1":"2011年出生于北苏门答腊棉兰，作为父母双方家族的长孙，在两个大家庭的关爱与陪伴中成长。","c1p2":"六岁时荣获全市 Tahfidz（古兰经背诵）比赛冠军——这是我人生中第一次深刻体会到专注与坚持的力量。","c2w":"校园岁月","c2t":"品格塑造与求学基础","c2p1":"先后就读于北苏门答腊 MIS Aisyiyah 小学与 MTs Aisyiyah 初中。","c2p2":"那段岁月塑造了我的自律与韧性，收获了深厚的挚友，也点燃了我对数字界面与计算机技术的最初好奇。","c3w":"职业高中","c3t":"在 SMK Swasta Mandiri 开启编程之路","c3p1":"升入棉兰 SMK Swasta Mandiri（私立曼迪里职业高中），将对技术的好奇转化为系统的工程实践。","c3p2":"在这里我开始深入研究网页开发，学会独立思考、勇敢尝试，并锁定了前端工程与 UI 设计的发展方向。","c4w":"自主深耕","c4t":"精进代码架构、动效与界面设计","c4p1":"深入掌握语义化 HTML5、CSS3 与 Tailwind CSS 架构、JavaScript (ES6+)，以及 GSAP 和 Anime.js 交互动画。","c4p2":"深刻认识到优秀的数字作品需要兼具视觉美感与高性能、可访问的整洁代码。","c5w":"职高二年级 · 行业实践","c5t":"在 DigitalCODE 进行企业实习 (PKL)","c5p1":"目前就读职高二年级，正在 DigitalCODE 进行我的首次企业实习（PKL）。","c5p2":"在真实的生产环境中协作，将课堂所学转化为高质量的实战网页界面与工作流。","c6w":"当下与未来","c6t":"当前重心与未来愿景","c6p1":"在棉兰持续构建响应式落地页与交互式 Web 体验，同时深入探索 React、Vue 与 AI 辅助开发工作流。","c6p2":"欢迎自由职业项目、创意合作，共同打造令人难忘的数字产品。","e1":"持续成长，不断构建，保持真诚。","e2":"每一行代码都是迈向更精湛技艺的一步。","ctaProj":"查看精选项目 ↗","ctaContact":"与我联系 ↗"},"es":{"bk":"Volver","h":"Mi Historia","sub":"Un viaje de crecimiento, oficio y dirección en el desarrollo web y diseño de interfaces.","lead":"Desde mi infancia en Medan hasta mis primeros pasos en la industria del software: estos son los capítulos reales que forjaron mi disciplina y oficio.","c1w":"2011 · Medan","c1t":"Raíces y Primer Logro","c1p1":"Nací en 2011 en Medan, Sumatra Septentrional, criado con el cariño de las familias de mi padre y de mi madre como primer nieto de ambas.","c1p2":"A los seis años gané el 1.er lugar en el Campeonato Municipal de Tahfidz, aprendiendo desde temprano el valor de la constancia.","c2w":"Etapa Escolar","c2t":"Carácter y Fundamentos","c2p1":"Cursé la primaria en MIS Aisyiyah Sumatera Utara y la secundaria en MTs Aisyiyah Sumatera Utara.","c2p2":"Esos años forjaron mi disciplina, resiliencia ante los retos, grandes amistades y mi fascinación inicial por las interfaces digitales.","c3w":"Escuela Vocacional","c3t":"Entrando al Mundo Web en SMK Swasta Mandiri","c3p1":"Continué mis estudios en SMK Swasta Mandiri en Medan, donde la curiosidad se convirtió en práctica técnica constante.","c3p2":"Allí comencé a profundizar en el desarrollo web, aprendiendo a ser autónomo, experimentar y definir mi camino en el front-end.","c4w":"Exploración Autodidacta","c4t":"Código, Animación y Diseño UI","c4p1":"Perfeccioné HTML5 semántico, CSS3 moderno, Tailwind CSS, JavaScript (ES6+) y microinteracciones con GSAP y Anime.js.","c4p2":"Comprendí que la estética visual y el rendimiento del código deben ir siempre de la mano.","c5w":"2.º Año SMK · Industria","c5t":"Prácticas Profesionales (PKL) en DigitalCODE","c5p1":"Actualmente curso el segundo año de SMK y realizo mis primeras prácticas profesionales (PKL) en DigitalCODE.","c5p2":"Colaborar en un entorno laboral real ha fortalecido mi flujo de trabajo y mi capacidad de construir interfaces listas para producción.","c6w":"Hoy y Futuro","c6t":"Enfoque Actual y Visión","c6p1":"Construyendo páginas web rápidas, accesibles e interactivas desde Medan, mientras amplío mis habilidades en React, Vue y flujos con IA.","c6p2":"Abierto a proyectos freelance y colaboraciones creativas.","e1":"Seguir aprendiendo, innovando y creciendo.","e2":"Cada línea de código es un paso para mejorar.","ctaProj":"Ver Proyectos Destacados ↗","ctaContact":"Contactarme ↗"},"ar":{"bk":"رجوع","h":"قصتي","sub":"رحلة نمو وشغف في تطوير الويب وتصميم الواجهات.","lead":"من النشأة في ميدان إلى خوض تجربة العمل الفعلي في صناعة البرمجيات — هذه هي الفصول الحقيقية التي شكّلت انضباطي ومهارتي.","c1w":"2011 · ميدان","c1t":"الجذور والإنجاز المبكر","c1p1":"ولدت عام 2011 في ميدان بشمال سومطرة، ونشأت محاطًا بمحبة عائلتي والدي ووالدتي كأول حفيد في العائلتين.","c1p2":"في سن السادسة حققت المركز الأول في بطولة تحفيظ القرآن الكريم على مستوى المدينة — درس مبكر في قيمة الاجتهاد والمثابرة.","c2w":"سنوات الدراسة","c2t":"بناء الشخصية والأساس العلمي","c2p1":"أكملت المرحلة الابتدائية في MIS Aisyiyah Sumatera Utara والمتوسطة في MTs Aisyiyah Sumatera Utara.","c2p2":"غرسَت فيّ تلك السنوات الانضباط والقدرة على تجاوز الصعاب، وبداية شغفي بعالم التقنية والواجهات الرقمية.","c3w":"التعليم المهني","c3t":"دخول عالم البرمجة في SMK Swasta Mandiri","c3p1":"واصلت تعليمي في ثانوية مانديري المهنية الخاصة (SMK Swasta Mandiri) في ميدان، حيث تحول الفضول إلى ممارسة تقنية.","c3p2":"بدأت هنا التعمق في تطوير الويب والاعتماد على الذات ورسم مساري كمطور واجهات أمامية.","c4w":"التطوير الذاتي","c4t":"إتقان الكود والحركة وتصميم الواجهات","c4p1":"تعمقت في HTML5 الدلالي، وCSS3 وTailwind CSS، وجافاسكريبت الحديثة، وتحريك الواجهات باستخدام GSAP وAnime.js.","c4p2":"أدركت أن جمال التصميم وأداء الكود السريع يجب أن يسيرا معًا بتوازن تام.","c5w":"السنة الثانية · التدريب الميداني","c5t":"التدريب العملي (PKL) في شركة DigitalCODE","c5p1":"أدرس حاليًا في السنة الثانية من الثانوية المهنية وأخوض تدريبي الميداني الأول (PKL) في شركة DigitalCODE.","c5p2":"العمل في بيئة إنتاج حقيقية صقل مهاراتي وحوّل المعرفة النظرية إلى واجهات ويب عملية متقنة.","c6w":"اليوم والمستقبل","c6t":"التركيز الحالي والرؤية المستقبلية","c6p1":"أصمم وأطوّر واجهات ويب متجاوبة وحديثة من ميدان، مع التوسع المستمر في React وVue وأدوات الذكاء الاصطناعي.","c6p2":"متاح للمشاريع الحرة والتعاون الإبداعي في بناء منتجات رقمية مميزة.","e1":"مواصلة التعلّم والابتكار والنمو.","e2":"كل سطر برمجي هو خطوة نحو الإتقان.","ctaProj":"استكشف المشاريع المميزة ↗","ctaContact":"تواصل معي ↗"},"fr":{"bk":"Retour","h":"Mon Histoire","sub":"Un parcours de croissance, de rigueur et de création dans le développement web et le design UI.","lead":"De mon enfance à Medan jusqu’à mon immersion professionnelle dans le logiciel — voici les chapitres authentiques de mon parcours.","c1w":"2011 · Medan","c1t":"Racines & Première Fierté","c1p1":"Né en 2011 à Medan, au nord de Sumatra, j’ai grandi entouré de l’affection de mes familles paternelle et maternelle en tant que premier petit-enfant.","c1p2":"À six ans, j’ai remporté le 1er prix du championnat municipal de Tahfidz, une première victoire qui m’a appris la valeur de la persévérance.","c2w":"Années Scolaires","c2t":"Caractère & Fondations","c2p1":"Scolarité primaire à la MIS Aisyiyah Sumatera Utara puis au collège MTs Aisyiyah Sumatera Utara.","c2p2":"Ces années ont forgé ma discipline, ma résilience, des amitiés durables et ma fascination pour les interfaces numériques.","c3w":"Lycée Professionnel","c3t":"Cap sur le Web à la SMK Swasta Mandiri","c3p1":"Poursuite de mes études au lycée professionnel SMK Swasta Mandiri à Medan, où ma curiosité s’est transformée en pratique technique.","c3p2":"C’est là que j’ai approfondi le développement web, cultivé mon autonomie et tracé ma voie en front-end et UI design.","c4w":"Exploration Autodidacte","c4t":"Code, Motion & Design d’Interface","c4p1":"Maîtrise de HTML5 sémantique, CSS3 moderne, Tailwind CSS, JavaScript (ES6+) et des animations avec GSAP et Anime.js.","c4p2":"Convaincu que l’exigence visuelle et la performance technique doivent toujours avancer ensemble.","c5w":"2e Année SMK · Entreprise","c5t":"Stage en Entreprise (PKL) chez DigitalCODE","c5p1":"Actuellement en deuxième année de SMK, j’effectue mon premier stage professionnel (PKL) au sein de l’entreprise DigitalCODE.","c5p2":"Cette immersion en production réelle me permet d’appliquer mes compétences sur des projets concrets et exigeants.","c6w":"Aujourd’hui & Demain","c6t":"Focus Actuel & Vision","c6p1":"Conception d’interfaces web modernes, rapides et accessibles depuis Medan, tout en approfondissant React, Vue et les workflows IA.","c6p2":"Ouvert aux missions freelance et aux collaborations créatives.","e1":"Continuer d’apprendre, d’innover et de progresser.","e2":"Chaque ligne de code est un pas vers l’excellence.","ctaProj":"Voir les Projets Phares ↗","ctaContact":"Me Contacter ↗"},"ja":{"bk":"戻る","h":"私のストーリー","sub":"Web開発とUIデザインを通じて成長し、自分の道を切り拓くまでの軌跡。","lead":"メダンでの幼少期からソフトウェア業界での実務インターンシップまで——私の規律と探究心を形作った実際の歩みです。","c1w":"2011年 · メダン","c1t":"ルーツと幼少期の達成","c1p1":"2011年、北スマトラ州メダン生まれ。父方・母方双方の初孫として、二つの温かい家族の愛情に包まれて育ちました。","c1p2":"6歳の時、市レベルのコーラン暗誦大会（Tahfidz）で優勝。努力を続けることの大切さを学んだ原体験です。","c2w":"学生時代","c2t":"人格形成と基礎","c2p1":"MIS Aisyiyah Sumatera Utara 小学校、MTs Aisyiyah Sumatera Utara 中学校で学びました。","c2p2":"規律や困難から立ち上がる粘り強さ、かけがえのない友情を育みながら、デジタルの画面が動く仕組みに強い興味を持つようになりました。","c3w":"職業高校 (SMK)","c3t":"SMK Swasta Mandiri でWebの世界へ","c3p1":"メダンの私立マンディリ職業高校（SMK Swasta Mandiri）へ進学し、技術への好奇心を実践的な学びへと昇華させました。","c3p2":"自立心と挑戦する勇気を養い、フロントエンド開発とUIデザインという自分の道を見出しました。","c4w":"独学と探求","c4t":"コード設計・モーション・UIデザインの深化","c4p1":"セマンティックなHTML5、モダンなCSS3とTailwind CSS、JavaScript (ES6+)、GSAPやAnime.jsによるアニメーション表現を習得。","c4p2":"視覚的な美しさと高速でクリーンなコードは常に両立すべきだという信念を確立しました。","c5w":"高校2年 · 実務経験","c5t":"DigitalCODE での企業インターンシップ (PKL)","c5p1":"現在高校2年生として、DigitalCODE にて初めての実務インターンシップ（PKL）に取り組んでいます。","c5p2":"実際の開発現場でチームと協働し、学校で学んだ知識を実用的なWebインターフェースへと形にしています。","c6w":"現在とこれから","c6t":"現在のフォーカスと展望","c6p1":"メダンを拠点にレスポンシブで洗練されたWeb体験を構築しつつ、React、Vue、AIワークフローの探求を続けています。","c6p2":"フリーランス案件やクリエイティブなコラボレーションを歓迎しています。","e1":"学び続け、革新し、成長し続ける。","e2":"すべてのコードの一行が、より良い作り手への一歩。","ctaProj":"注目プロジェクトを見る ↗","ctaContact":"お問い合わせ ↗"},"ko":{"bk":"뒤로","h":"나의 이야기","sub":"웹 개발과 UI 디자인을 통해 성장하고 방향을 찾아가는 여정.","lead":"메단에서의 어린 시절부터 소프트웨어 업계 실무 인턴십까지 — 저의 끈기와 호기심, 기술적 장인정신을 만든 실제 이야기입니다.","c1w":"2011 · 메단","c1t":"뿌리와 첫 번째 성취","c1p1":"2011년 북수마트라 메단에서 태어나 친가와 외가 양쪽의 첫 손주로서 두 가족의 따뜻한 사랑 속에 자랐습니다.","c1p2":"여섯 살 때 시 단위 타흐피즈(Tahfidz) 경연대회에서 우승하며 꾸준한 노력이 결실을 맺는다는 것을 일찍 배웠습니다.","c2w":"학창 시절","c2t":"인성과 기초를 다진 시간","c2p1":"MIS Aisyiyah Sumatera Utara 초등학교와 MTs Aisyiyah Sumatera Utara 중학교를 졸업했습니다.","c2p2":"이 시기 동안 규율과 회복탄력성, 소중한 우정을 쌓으며 디지털 인터페이스에 대한 첫 호기심을 키웠습니다.","c3w":"직업고등학교 (SMK)","c3t":"SMK Swasta Mandiri에서 시작된 웹 개발","c3p1":"메단의 SMK Swasta Mandiri 직업고등학교에 진학해 기술에 대한 호기심을 본격적인 실습으로 연결했습니다.","c3p2":"스스로 탐구하고 도전하는 법을 배우며 프론트엔드 개발과 UI 디자인이라는 명확한 진로를 찾았습니다.","c4w":"자기주도 탐구","c4t":"코드 아키텍처, 모션 & UI 디자인 심화","c4p1":"시맨틱 HTML5, 최신 CSS3 및 Tailwind CSS, JavaScript(ES6+), 그리고 GSAP·Anime.js 인터랙션 모션을 깊이 익혔습니다.","c4p2":"시각적 완성도와 빠르고 깔끔한 코드 성능이 함께 가야 한다는 원칙을 세웠습니다.","c5w":"고2 · 산업체 실습","c5t":"DigitalCODE 실무 인턴십 (PKL)","c5p1":"현재 직업고등학교 2학년에 재학 중이며 DigitalCODE에서 첫 기업 현장실습(PKL)을 수행하고 있습니다.","c5p2":"실제 프로덕션 환경에서 협업하며 배운 지식을 실용적이고 완성도 높은 웹 인터페이스로 구현하고 있습니다.","c6w":"현재와 비전","c6t":"오늘의 집중과 앞으로의 방향","c6p1":"메단을 기반으로 반응형 웹과 인터랙티브 UI를 구축하며 React, Vue, AI 워크플로로 역량을 넓히고 있습니다.","c6p2":"프리랜스 프로젝트와 창의적인 협업을 언제나 환영합니다.","e1":"계속 배우고, 혁신하며, 성장하기.","e2":"코드 한 줄 한 줄이 더 나은 개발자가 되기 위한 발걸음입니다.","ctaProj":"주요 프로젝트 보기 ↗","ctaContact":"문의하기 ↗"}};
  var LBL={id:"Indonesia",en:"English",zh:"中文",es:"Español",ar:"العربية",fr:"Français",ja:"日本語",ko:"한국어"},
      BK={id:"Kembali ke daftar kartu",en:"Back to the card list",zh:"返回卡片列表",es:"Volver a la lista de tarjetas",ar:"العودة إلى قائمة البطاقات",fr:"Retour à la liste des cartes",ja:"カード一覧に戻る",ko:"카드 목록으로 돌아가기"},
      OL={id:"Garis waktu cerita saya",en:"Timeline of my story",zh:"我的故事时间线",es:"Línea de tiempo de mi historia",ar:"الجدول الزمني لقصتي",fr:"Chronologie de mon histoire",ja:"私のストーリーのタイムライン",ko:"나의 이야기 타임라인"},
      BTN={id:"Pilih bahasa",en:"Choose language",zh:"选择语言",es:"Elegir idioma",ar:"اختر اللغة",fr:"Choisir la langue",ja:"言語を選択",ko:"언어 선택"};
  var ICON='<svg viewBox="0 0 24 24"><path d="M4 5h9M8.5 3v2M6 5c.6 3 2.6 5.5 5.5 7M12.5 5c-.7 3.2-3 6-7 8"/><path d="M12.5 20.5l4-9 4 9M14 17.5h5"/></svg>';
  var CHEV='<svg class="st-chev" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>';
  var lang=window.ZK?ZK.lang:"id";window.addEventListener("zk-lang",function(){lang=ZK.lang;apply();});
  function apply(){
    setTimeout(function(){window.dispatchEvent(new Event("st-relayout"));},30);
    pg.setAttribute("lang",lang);
    [].forEach.call(pgb.querySelectorAll("[data-t]"),function(el){
      var k=el.getAttribute("data-t");if(!el.hasAttribute("data-id"))el.setAttribute("data-id",el.textContent);
      var i0=el.getAttribute("data-id"),d=DICT[lang];el.textContent=lang==="id"?i0:((d&&d[k])||(window.ZK&&ZK.t(i0,lang))||DICT.en[k]||i0);
    });
    var bk=pgb.querySelector(".bk");if(bk)bk.setAttribute("aria-label",BK[lang]||BK.en);
    var ol=pgb.querySelector(".st-life");if(ol)ol.setAttribute("aria-label",OL[lang]||OL.en);
    var b=pgb.querySelector(".st-lang");
    if(b){b.setAttribute("aria-label",BTN[lang]+": "+LBL[lang]);b.querySelector(".st-lt").textContent=LBL[lang];}
    [].forEach.call(pgb.querySelectorAll(".st-opt"),function(o){o.setAttribute("aria-checked",o.getAttribute("data-l")===lang?"true":"false");});
  }
  function menu(){return pgb.querySelector(".st-menu");}
  function openMenu(){
    var m=menu(),b=pgb.querySelector(".st-lang");if(!m||!b)return;
    m.classList.remove("is-right");m.classList.add("is-open");b.setAttribute("aria-expanded","true");
    var r=m.getBoundingClientRect();if(r.right>window.innerWidth-10)m.classList.add("is-right");
    var c=m.querySelector('[aria-checked="true"]')||m.querySelector(".st-opt");if(c)c.focus({preventScroll:true});
  }
  function closeMenu(back){
    var m=menu(),b=pgb.querySelector(".st-lang");if(!m)return;
    m.classList.remove("is-open");if(b){b.setAttribute("aria-expanded","false");if(back)b.focus({preventScroll:true});}
  }
  function setLang(l){if(window.ZK&&ZK.set){ZK.set(l);}else{lang=l;try{localStorage.setItem("zk-lang",l);}catch(e){}apply();}}
  function scrolled(){
    var m=pg.scrollHeight-pg.clientHeight,p=m>0?Math.min(1,pg.scrollTop/m):0;
    var pr=pgb.querySelector(".st-prog");if(pr)pr.style.setProperty("--p",p.toFixed(4));
    var bar=pgb.querySelector(".st-bar");if(bar)bar.classList.toggle("is-scrolled",pg.scrollTop>24);
  }
  function build(){
    if(!pg.classList.contains("p0"))return;
    var bk=pgb.querySelector(".bk");if(!bk||pgb.querySelector(".st-bar"))return;
    var bar=document.createElement("div");bar.className="st-bar";
    pgb.insertBefore(bar,bk);bar.appendChild(bk);
    var t=bk.querySelector(".bk-t");if(t)t.setAttribute("data-t","bk");

    var pr=document.createElement("i");pr.className="st-prog";pr.setAttribute("aria-hidden","true");pgb.appendChild(pr);
    apply();scrolled();try{bk.focus({preventScroll:true});}catch(e){}
  }
  document.addEventListener("pointerdown",function(e){var m=menu();if(m&&m.classList.contains("is-open")&&!e.target.closest(".st-lw"))closeMenu(false);});
  pg.addEventListener("scroll",scrolled,{passive:true});
  new MutationObserver(build).observe(pgb,{childList:true});
})();

(function(){
  var pg=document.getElementById("pg"),pgb=document.getElementById("pgb");if(!pg||!pgb)return;
  var NS="http://www.w3.org/2000/svg",S=null,raf=0;
  function el(n,a,p){var e=document.createElementNS(NS,n);for(var k in a)e.setAttribute(k,a[k]);if(p)p.appendChild(e);return e;}
  function r1(v){return Math.round(v*10)/10;}
  function curve(a){var d="M"+r1(a[0].x)+" "+r1(a[0].y);for(var i=1;i<a.length;i++){var p=a[i-1],q=a[i],m=r1((p.y+q.y)/2);d+=" C"+r1(p.x)+" "+m+" "+r1(q.x)+" "+m+" "+r1(q.x)+" "+r1(q.y);}return d;}
  function build(){
    var wrap=pgb.querySelector(".st-wrap");if(!wrap){S=null;return;}
    var ol=wrap.querySelector(".st-life"),svg=wrap.querySelector(".st-thread");if(!ol||!svg)return;
    var mob=window.innerWidth<=820,G=mob?54:100,cx=G*(mob?.38:.4),amp=mob?13:27,H=wrap.offsetHeight;
    svg.setAttribute("width",G);svg.setAttribute("height",H);svg.setAttribute("viewBox","0 0 "+G+" "+H);
    while(svg.firstChild)svg.removeChild(svg.firstChild);
    var lis=[].slice.call(ol.children),pts=[],nowI=-1,lastMain=0;
    lis.forEach(function(li){
      var hd=li.querySelector(".st-hd");
      pts.push({x:cx+amp*parseFloat(li.getAttribute("data-m")),y:li.offsetTop+hd.offsetTop+hd.offsetHeight/2,main:true,li:li});
      if(li.classList.contains("is-now"))nowI=pts.length-1;
      lastMain=pts.length-1;
      [].forEach.call(li.querySelectorAll("[data-m]"),function(e){
        pts.push({x:cx+amp*parseFloat(e.getAttribute("data-m")),y:li.offsetTop+e.offsetTop+16,main:false,li:li});
      });
    });
    if(nowI<0)nowI=lastMain;
    var first=pts[0],start={x:first.x,y:Math.max(0,first.y-84)},end={x:cx+amp,y:H};
    var past=[start].concat(pts.slice(0,nowI+1)),fut=pts.slice(nowI).concat([end]);
    var defs=el("defs",{},svg);
    var g1=el("linearGradient",{id:"stBaseG",gradientUnits:"userSpaceOnUse",x1:0,y1:start.y,x2:0,y2:start.y+90},defs);
    el("stop",{offset:0,"stop-color":"#f4efe8","stop-opacity":0},g1);el("stop",{offset:1,"stop-color":"#f4efe8","stop-opacity":.22},g1);
    var g2=el("linearGradient",{id:"stFutG",gradientUnits:"userSpaceOnUse",x1:0,y1:pts[nowI].y,x2:0,y2:H},defs);
    el("stop",{offset:0,"stop-color":"#f4efe8","stop-opacity":.9},g2);el("stop",{offset:1,"stop-color":"#f4efe8","stop-opacity":.2},g2);
    var dp=curve(past);
    el("path",{"class":"st-t-fut",d:curve(fut),stroke:"url(#stFutG)"},svg);
    el("path",{"class":"st-t-base",d:dp,stroke:"url(#stBaseG)"},svg);
    var nodes=[];
    pts.forEach(function(p){
      el("line",{"class":"st-leader",x1:r1(p.x+(p.main?8:5)),y1:r1(p.y),x2:G-12,y2:r1(p.y)},svg);
    });
    var halo=el("path",{"class":"st-t-halo",d:dp},svg),on=el("path",{"class":"st-t-on",d:dp},svg);
    pts.forEach(function(p,i){
      var n=el("circle",{"class":"st-node"+(p.main?"":" sm"),cx:r1(p.x),cy:r1(p.y),r:i===nowI?6:(p.main?4.6:2.8)},svg);
      nodes.push({y:p.y,el:n,main:p.main,li:p.li});
    });
    var ring=el("circle",{"class":"st-t-ring",r:9,cx:r1(start.x),cy:r1(start.y)},svg),head=el("circle",{"class":"st-t-head",r:5,cx:r1(start.x),cy:r1(start.y)},svg);
    var total=on.getTotalLength(),N=Math.max(80,Math.ceil(total/8)),sm=[];
    for(var i=0;i<=N;i++){var l=total*i/N,q=on.getPointAtLength(l);sm.push({l:l,y:q.y});}
    S={wrap:wrap,on:on,halo:halo,head:head,ring:ring,total:total,sm:sm,nodes:nodes,lis:lis,cx:cx,amp:amp,startY:start.y};
    update();
  }
  function update(){
    raf=0;if(!S||!S.wrap.isConnected)return;
    var pr=pg.getBoundingClientRect(),wr=S.wrap.getBoundingClientRect(),mark=pr.top+pr.height*.64-wr.top,sm=S.sm,l=0;
    if(mark>=sm[sm.length-1].y)l=S.total;
    else if(mark>sm[0].y){var lo=0,hi=sm.length-1;while(hi-lo>1){var mid=(lo+hi)>>1;if(sm[mid].y<mark)lo=mid;else hi=mid;}
      var t=(mark-sm[lo].y)/Math.max(.001,sm[hi].y-sm[lo].y);l=sm[lo].l+(sm[hi].l-sm[lo].l)*t;}
    var da=l.toFixed(1)+" "+(S.total+20);S.on.style.strokeDasharray=da;S.halo.style.strokeDasharray=da;
    var p=S.on.getPointAtLength(l),vis=mark>S.startY?1:0;
    [S.head,S.ring].forEach(function(c){c.setAttribute("cx",p.x.toFixed(1));c.setAttribute("cy",p.y.toFixed(1));c.style.opacity=vis;});
    S.nodes.forEach(function(n){n.el.classList.toggle("on",n.y<mark);});
    S.lis.forEach(function(li){var hd=li.querySelector(".st-hd");li.classList.toggle("is-pass",li.offsetTop+hd.offsetTop<mark);});
    var m=Math.max(-1,Math.min(1,(p.x-S.cx)/S.amp));pg.style.setProperty("--st-m",m.toFixed(3));
  }
  function ask(){if(!raf)raf=requestAnimationFrame(update);}
  function later(){build();setTimeout(build,450);setTimeout(build,1400);}
  pg.addEventListener("scroll",ask,{passive:true});
  window.addEventListener("resize",function(){build();});
  window.addEventListener("st-relayout",function(){requestAnimationFrame(build);});
  if(document.fonts&&document.fonts.ready)document.fonts.ready.then(function(){build();});
  new MutationObserver(function(){if(pgb.querySelector(".st-wrap")&&(!S||S.wrap!==pgb.querySelector(".st-wrap")))later();}).observe(pgb,{childList:true});
})();


/* ============================================================
   contact.js
   ============================================================ */

/**
 * Paper Riot — Edisi 06
 * Newspaper contact sheet: live WIB clock, kinetic headline,
 * parallax portrait, newswire ticker, and eight-language copy.
 */
(function(){
  var pg = document.getElementById("pg"), pgb = document.getElementById("pgb");
  if (!pg || !pgb) return;
  var reduce = matchMedia("(prefers-reduced-motion: reduce)");
  var fine = matchMedia("(hover: hover) and (pointer: fine)");
  var DICT = {
    kicker: {id:"EDISI 06 — KONTAK", en:"EDITION 06 — CONTACT", zh:"第 06 期 — 联系", es:"EDICIÓN 06 — CONTACTO", ar:"العدد 06 — تواصل", fr:"ÉDITION 06 — CONTACT", ja:"第06号 — コンタクト", ko:"에디션 06 — 연락"},
    loc: {id:"MEDAN, INDONESIA — WIB", en:"MEDAN, INDONESIA — WIB", zh:"印尼棉兰 — WIB", es:"MEDAN, INDONESIA — WIB", ar:"ميدان، إندونيسيا — WIB", fr:"MEDAN, INDONÉSIE — WIB", ja:"インドネシア・メダン — WIB", ko:"인도네시아 메단 — WIB"},
    h1: {id:"ADA PROYEK?", en:"GOT A PROJECT?", zh:"有项目?", es:"¿TIENES UN PROYECTO?", ar:"لديك مشروع؟", fr:"UN PROJET ?", ja:"プロジェクトありますか？", ko:"프로젝트가 있나요?"},
    h2: {id:"Mari bicara.", en:"Let’s talk.", zh:"聊聊吧。", es:"Hablemos.", ar:"لنتحدث.", fr:"Parlons-en.", ja:"話しましょう。", ko:"이야기해요."},
    p: {id:"Freelance, kolaborasi, atau sekadar bertukar pikiran soal web dan desain — semuanya terbuka. Ceritakan idemu, sekecil apa pun.", en:"Freelance work, collaboration, or just a chat about web and design — all welcome. Tell me your idea, however small.", zh:"自由职业、合作，或者只是聊聊网页与设计——全都欢迎。把你的想法告诉我，再小也可以。", es:"Trabajo freelance, colaboración o simplemente una charla sobre web y diseño: todo es bienvenido. Cuéntame tu idea, por pequeña que sea.", ar:"عمل حر، تعاون، أو مجرد حديث عن الويب والتصميم — كل ذلك مرحّب به. أخبرني بفكرتك، مهما كانت صغيرة.", fr:"Mission freelance, collaboration ou simple échange autour du web et du design — tout est bienvenu. Racontez-moi votre idée, même la plus petite.", ja:"フリーランスの仕事、コラボレーション、ウェブやデザインの雑談まで、すべて歓迎です。小さなアイデアでも聞かせてください。", ko:"프리랜스 작업, 협업, 또는 웹과 디자인에 대한 가벼운 대화까지 모두 환영합니다. 작은 아이디어라도 들려주세요."},
    status: {id:"Sedang menerima proyek", en:"Currently taking projects", zh:"正在接项目", es:"Aceptando proyectos", ar:"أستقبل مشاريع حاليًا", fr:"Disponible pour des projets", ja:"プロジェクト受付中", ko:"프로젝트 받는 중"},
    send: {id:"TULIS EMAIL", en:"WRITE AN EMAIL", zh:"写邮件", es:"ESCRIBIR UN CORREO", ar:"اكتب بريدًا", fr:"ÉCRIRE UN E-MAIL", ja:"メールを書く", ko:"이메일 쓰기"},
    find: {id:"TERBIT JUGA DI", en:"ALSO PUBLISHED ON", zh:"也发布在", es:"TAMBIÉN PUBLICADO EN", ar:"أنشر أيضًا على", fr:"AUSSI PUBLIÉ SUR", ja:"こちらでも発信中", ko:"여기서도 활동해요"},
    reply: {id:"Dibalas dalam 24 jam. Biasanya lebih cepat.", en:"Replies within 24 hours. Usually faster.", zh:"24 小时内回复，通常更快。", es:"Respondo en 24 horas. Normalmente antes.", ar:"أرد خلال 24 ساعة. غالبًا أسرع.", fr:"Réponse sous 24 h. Souvent plus vite.", ja:"24時間以内に返信します。たいていはもっと早く。", ko:"24시간 안에 답장합니다. 보통 더 빠르게."},
    quote: {id:"“Terlalu banyak ide, terlalu sedikit waktu. Mari mulai dari milikmu.”", en:"“Too many ideas, too little time. Let’s start with yours.”", zh:"“想法太多，时间太少。从你的开始吧。”", es:"“Demasiadas ideas, muy poco tiempo. Empecemos por la tuya.”", ar:"«أفكار كثيرة ووقت قليل. لنبدأ بفكرتك.»", fr:"« Trop d’idées, trop peu de temps. Commençons par la vôtre. »", ja:"「アイデアは多く、時間は少ない。あなたのアイデアから始めましょう。」", ko:"“아이디어는 많고 시간은 부족하니까. 당신의 아이디어부터 시작해요.”"},
    attrib: {id:"— Zikri, Medan", en:"— Zikri, Medan", zh:"— Zikri，棉兰", es:"— Zikri, Medan", ar:"— زكري، ميدان", fr:"— Zikri, Medan", ja:"— ズィクリ、メダン", ko:"— 지크리, 메단"},
    role: {id:"Front-End Developer · UI Designer", en:"Front-End Developer · UI Designer", zh:"前端开发者 · UI 设计师", es:"Desarrollador Front-End · Diseñador UI", ar:"مطوّر واجهات أمامية · مصمم واجهات", fr:"Développeur Front-End · Designer UI", ja:"フロントエンド開発者 · UIデザイナー", ko:"프론트엔드 개발자 · UI 디자이너"},
    ticker: {id:"ADA PROYEK? • FREELANCE • KOLABORASI • FRONT-END • UI DESIGN • MEDAN, INDONESIA • BALAS <24 JAM •", en:"GOT A PROJECT? • FREELANCE • COLLABORATION • FRONT-END • UI DESIGN • MEDAN, INDONESIA • REPLIES <24H •", zh:"有项目? • 自由职业 • 合作 • 前端 • UI 设计 • 印尼棉兰 • 24 小时内回复 •", es:"¿TIENES UN PROYECTO? • FREELANCE • COLABORACIÓN • FRONT-END • DISEÑO UI • MEDAN, INDONESIA • RESPUESTA <24 H •", ar:"لديك مشروع؟ • عمل حر • تعاون • واجهات أمامية • تصميم واجهات • ميدان، إندونيسيا • رد خلال 24 ساعة •", fr:"UN PROJET ? • FREELANCE • COLLABORATION • FRONT-END • DESIGN UI • MEDAN, INDONÉSIE • RÉPONSE <24 H •", ja:"プロジェクトありますか？ • フリーランス • コラボレーション • フロントエンド • UIデザイン • インドネシア・メダン • 24時間以内に返信 •", ko:"프로젝트가 있나요? • 프리랜스 • 협업 • 프론트엔드 • UI 디자인 • 인도네시아 메단 • 24시간 내 답장 •"},
    vtick: {id:"EDISI 06 • POTRET • ZIKRI • MEDAN • 2026 •", en:"EDITION 06 • PORTRAIT • ZIKRI • MEDAN • 2026 •", zh:"第 06 期 • 肖像 • ZIKRI • 棉兰 • 2026 •", es:"EDICIÓN 06 • RETRATO • ZIKRI • MEDAN • 2026 •", ar:"العدد 06 • صورة • زكري • ميدان • 2026 •", fr:"ÉDITION 06 • PORTRAIT • ZIKRI • MEDAN • 2026 •", ja:"第06号 • ポートレート • ズィクリ • メダン • 2026 •", ko:"에디션 06 • 포트레이트 • 지크리 • 메단 • 2026 •"},
    alt: {id:"Zikri di antara lembaran koran yang beterbangan", en:"Zikri among flying sheets of newspaper", zh:"Zikri 置身于飞舞的报纸之间", es:"Zikri entre hojas de periódico al vuelo", ar:"زكري بين أوراق صحف متطايرة", fr:"Zikri parmi des feuilles de journal qui s’envolent", ja:"舞い散る新聞紙の中に立つズィクリ", ko:"신문지가 날리는 가운데 서 있는 지크리"},
    fast: {id:"RESPONS CEPAT", en:"FAST RESPONSE", zh:"快速响应", es:"RESPUESTA RÁPIDA", ar:"استجابة سريعة", fr:"RÉPONSE RAPIDE", ja:"迅速な対応", ko:"빠른 응답"},
    waChat: {id:"Chat Langsung via WhatsApp", en:"Direct Chat via WhatsApp", zh:"通过 WhatsApp 直接聊天", es:"Chat directo por WhatsApp", ar:"محادثة مباشرة عبر واتساب", fr:"Discussion directe via WhatsApp", ja:"WhatsAppで直接チャット", ko:"WhatsApp으로 바로 대화"},
    copyMail: {id:"Salin Email", en:"Copy Email", zh:"复制邮箱", es:"Copiar correo", ar:"نسخ البريد", fr:"Copier l’e-mail", ja:"メールをコピー", ko:"이메일 복사"},
    copied: {id:"Tersalin!", en:"Copied!", zh:"已复制!", es:"¡Copiado!", ar:"تم النسخ!", fr:"Copié !", ja:"コピー完了!", ko:"복사됨!"},
    compTitle: {id:"KIRIM PESAN CEPAT", en:"QUICK INQUIRY COMPOSER", zh:"快速发送消息", es:"MENSAJE RÁPIDO", ar:"إرسال رسالة سريعة", fr:"MESSAGE RAPIDE", ja:"クイックメッセージ作成", ko:"빠른 메시지 작성"},
    compName: {id:"Nama Anda", en:"Your Name", zh:"您的姓名", es:"Tu nombre", ar:"اسمك", fr:"Votre nom", ja:"お名前", ko:"이름"},
    compMsg: {id:"Ceritakan singkat proyek atau ide Anda...", en:"Briefly describe your project or idea...", zh:"简述您的项目或想法...", es:"Describe brevemente tu proyecto o idea...", ar:"صف مشروعك أو فكرتك باختصار...", fr:"Décrivez brièvement votre projet ou idée...", ja:"プロジェクトやアイデアを簡単に教えてください...", ko:"프로젝트나 아이디어를 간단히 적어주세요..."},
    compWa: {id:"Kirim ke WhatsApp ↗", en:"Send to WhatsApp ↗", zh:"发送到 WhatsApp ↗", es:"Enviar a WhatsApp ↗", ar:"إرسال عبر واتساب ↗", fr:"Envoyer sur WhatsApp ↗", ja:"WhatsAppで送信 ↗", ko:"WhatsApp으로 보내기 ↗"},
    compMail: {id:"Kirim via Email ↗", en:"Send via Email ↗", zh:"通过邮件发送 ↗", es:"Enviar por Correo ↗", ar:"إرسال عبر البريد ↗", fr:"Envoyer par E-mail ↗", ja:"メールで送信 ↗", ko:"이메일로 보내기 ↗"},
    tWeb: {id:"Proyek Web", en:"Web Project", zh:"网站项目", es:"Proyecto Web", ar:"مشروع ويب", fr:"Projet Web", ja:"Web制作", ko:"웹 프로젝트"},
    tUi: {id:"UI/UX Design", en:"UI/UX Design", zh:"UI/UX 设计", es:"Diseño UI/UX", ar:"تصميم UI/UX", fr:"Design UI/UX", ja:"UI/UXデザイン", ko:"UI/UX 디자인"},
    tCollab: {id:"Kolaborasi", en:"Collaboration", zh:"创意合作", es:"Colaboración", ar:"تعاون", fr:"Collaboration", ja:"コラボ", ko:"협업"}
  };
  function lang(){ return (window.ZK && ZK.lang) || "id"; }
  function word(k){ var d = DICT[k]; return d ? (d[lang()] || d.id) : ""; }

  /* --- headline: pecah jadi strip huruf (Arab tetap utuh agar huruf menyambung) --- */
  var kin = [], kinRaf = 0, mx = -9999, my = -9999;
  function splitChars(el, text){
    el.textContent = "";
    kin = [];
    if (lang() === "ar" || reduce.matches) { el.textContent = text; el.classList.add("is-flat"); return; }
    el.classList.remove("is-flat");
    var n = 0, cjk = lang() === "zh" || lang() === "ja";
    text.split(/(\s+)/).forEach(function(part){
      if (!part) return;
      if (/^\s+$/.test(part)) { el.appendChild(document.createTextNode(" ")); return; }
      var w = cjk ? el : document.createElement("span");
      if (!cjk) w.className = "pr-w";
      for (var i = 0; i < part.length; i++) {
        var c = document.createElement("span");
        c.className = "pr-ch";
        c.style.setProperty("--i", n++);
        c.textContent = part.charAt(i);
        w.appendChild(c);
        kin.push({ el: c, y: 0, vy: 0, r: 0, vr: 0, ty: 0, tr: 0 });
      }
      if (!cjk) el.appendChild(w);
    });
  }
  function kinMove(){
    kinRaf = 0;
    var live = false;
    for (var i = 0; i < kin.length; i++) {
      var k = kin[i], b = k.el.getBoundingClientRect();
      var dx = mx - (b.left + b.width / 2), dy = my - (b.top + b.height / 2);
      var d = Math.hypot(dx, dy) || 1, f = Math.max(0, 1 - d / 150);
      k.ty = -12 * f;
      k.tr = (dx < 0 ? 1 : -1) * 7 * f;
      k.vy = (k.vy + (k.ty - k.y) * .26) * .7;
      k.vr = (k.vr + (k.tr - k.r) * .24) * .7;
      k.y += k.vy; k.r += k.vr;
      if (Math.abs(k.vy) > .02 || Math.abs(k.vr) > .02 || Math.abs(k.ty - k.y) > .05) live = true;
      k.el.style.transform = "translate3d(0," + k.y.toFixed(2) + "px,0) rotate(" + k.r.toFixed(2) + "deg)";
    }
    if (live) kinRaf = requestAnimationFrame(kinMove);
    else {
      // Ketika kinetik selesai, kosongkan inline transform agar animasi CSS breath berjalan mulus
      for (var j = 0; j < kin.length; j++) kin[j].el.style.transform = "";
    }
  }

  function fitTicker(root){
    var box = root.querySelector(".pr-tick"), track = box && box.querySelector(".pr-tick-track");
    if (!track) return;
    var base = track.querySelector(".pr-tick-run");
    if (!base) return;
    var vw = box.clientWidth, rw = base.getBoundingClientRect().width;
    if (!vw) return;
    if (rw < 1) { requestAnimationFrame(function(){ if (root.isConnected) fitTicker(root); }); return; }
    var k = Math.max(1, Math.ceil(vw / rw) + 1), one = base.outerHTML, half = "";
    for (var i = 0; i < k; i++) half += one;
    track.innerHTML = half + half;
    track.style.animationDuration = Math.max(12, Math.round(k * rw / 30)) + "s";
  }
  function tr(root){
    root.setAttribute("lang", lang());
    root.setAttribute("dir", lang() === "ar" ? "rtl" : "ltr");
    [].forEach.call(root.querySelectorAll("[data-kt]"), function(el){
      var t = word(el.getAttribute("data-kt"));
      if (!t) return;
      if (el.hasAttribute("data-kinetic")) splitChars(el, t);
      else if (el.textContent !== t) el.textContent = t;
    });
    [].forEach.call(root.querySelectorAll("[data-ka]"), function(el){
      var t = word(el.getAttribute("data-ka")); if (!t) return;
      if (el.tagName === "IMG") el.alt = t;
      else if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") el.placeholder = t;
      else el.setAttribute("aria-label", t);
    });
    requestAnimationFrame(function(){ if (root.isConnected) fitTicker(root); });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(function(){ if (root.isConnected) fitTicker(root); });
  }

  var fmt = null;
  try { fmt = new Intl.DateTimeFormat("en-GB", {hour: "2-digit", minute: "2-digit", second: "2-digit", hourCycle: "h23", timeZone: "Asia/Jakarta"}); } catch (e) {}
  function tick(root){
    var c = root.querySelector(".pr-clock"); if (!c || !fmt) return;
    var s = fmt.format(new Date()).replace(/:/g, ".");
    c.setAttribute("datetime", s);
    if (!c.querySelector(".pr-flap")) {
      var h = "";
      for (var i = 0; i < s.length; i++) {
        var ch = s.charAt(i);
        if (ch === ".") h += '<span class="pr-flap-sep">.</span>';
        else h += '<span class="pr-flap" data-v="' + ch + '">' + ch + '</span>';
      }
      c.innerHTML = h;
      return;
    }
    var flaps = c.querySelectorAll(".pr-flap");
    var dIdx = 0;
    for (var i = 0; i < s.length; i++) {
      var ch = s.charAt(i);
      if (ch === ".") continue;
      var flap = flaps[dIdx++];
      if (flap && flap.getAttribute("data-v") !== ch) {
        flap.setAttribute("data-v", ch);
        flap.textContent = ch;
        flap.classList.remove("flip");
        void flap.offsetWidth;
        flap.classList.add("flip");
      }
    }
  }

  var cur = null, raf = 0, px = 0, py = 0, tpx = 0, tpy = 0;
  function loop(){
    raf = 0;
    if (!cur || !cur.isConnected) return;
    px += (tpx - px) * .07; py += (tpy - py) * .07;
    pg.style.setProperty("--mx", px.toFixed(3)); pg.style.setProperty("--my", py.toFixed(3));
    if (Math.abs(tpx - px) > .002 || Math.abs(tpy - py) > .002) raf = requestAnimationFrame(loop);
  }
  function kick(){ if (!raf) raf = requestAnimationFrame(loop); }

  pg.addEventListener("pointermove", function(e){
    if (!cur || !cur.isConnected || e.pointerType === "touch") return;
    if (!reduce.matches) {
      mx = e.clientX; my = e.clientY;
      if (kin.length && !kinRaf) kinRaf = requestAnimationFrame(kinMove);
    }
    if (reduce.matches) return;
    tpx = (e.clientX / innerWidth - .5) * 2; tpy = (e.clientY / innerHeight - .5) * 2;
    var m = cur.querySelector(".pr-mail");
    if (m) {
      var b = m.getBoundingClientRect(), dx = e.clientX - (b.left + b.width / 2), dy = e.clientY - (b.top + b.height / 2), f = Math.max(0, 1 - Math.hypot(dx, dy) / 260);
      m.style.translate = f > 0 ? (dx * .05 * f).toFixed(1) + "px " + (dy * .12 * f).toFixed(1) + "px" : "";
    }
    kick();
  });
  pg.addEventListener("pointerleave", function(){
    if (!cur) return;
    mx = my = -9999;
    if (!reduce.matches && kin.length && !kinRaf) kinRaf = requestAnimationFrame(kinMove);
    var m = cur.querySelector(".pr-mail"); if (m) m.style.translate = "";
  });

  // 3D Floating Levitation Pass Controller (Bebas Melayang & Berotasi Bebas)
  function initPass3D(root) {
    var stage = root.querySelector(".pass-stage");
    var card = root.querySelector(".pass-card");
    var glare = root.querySelector(".pass-glare");
    var shadow = root.querySelector(".pass-shadow");
    if (!stage || !card) return;

    var isDragging = false;
    var startX = 0, startY = 0;
    var currentRotY = -12, currentRotX = 3;
    var targetRotY = 0, targetRotX = 0;
    var velRotY = 0, velRotX = 0;
    var lastDragX = 0, lastDragY = 0;
    var currentFloatX = 0, currentFloatY = 0;
    var targetFloatX = 0, targetFloatY = 0;
    var isFlipped = false;
    var animRaf = 0;
    var time = 0;

    function updateCard3D() {
      time += 0.032;

      // Efek melayang mengambang alami (ambient levitation)
      var levitateY = !reduce.matches ? Math.sin(time) * 8.5 : 0;
      var levitateRotZ = !reduce.matches ? Math.cos(time * 0.65) * 1.3 : 0;

      if (!isDragging) {
        velRotY *= 0.90;
        velRotX *= 0.90;
        currentRotY += (targetRotY - currentRotY) * 0.10 + velRotY;
        currentRotX += (targetRotX - currentRotX) * 0.10 + velRotX;
        currentFloatX += (targetFloatX - currentFloatX) * 0.12;
        currentFloatY += (targetFloatY - currentFloatY) * 0.12;
      }

      var totalX = currentFloatX;
      var totalY = currentFloatY + levitateY;

      // Transform kartu: rotasi 3D bebas dan pergeseran mengambang
      card.style.transform = "translate3d(" + totalX.toFixed(2) + "px, " + totalY.toFixed(2) + "px, 0) rotateY(" + currentRotY.toFixed(2) + "deg) rotateX(" + currentRotX.toFixed(2) + "deg) rotateZ(" + levitateRotZ.toFixed(2) + "deg)";

      // Update bayangan di bawah kartu sesuai ketinggian melayang
      if (shadow) {
        var shadowScale = Math.max(0.75, Math.min(1.2, 1 - (totalY / 140)));
        var shadowOpacity = Math.max(0.12, Math.min(0.48, 0.34 - (totalY / 260)));
        shadow.style.transform = "translateX(-50%) translate3d(" + (totalX * 0.35).toFixed(1) + "px, 0, 0) scale(" + shadowScale.toFixed(2) + ")";
        shadow.style.opacity = shadowOpacity.toFixed(2);
      }

      if (glare) {
        var normY = (currentRotY % 360 + 360) % 360;
        var glareAngle = (135 + currentRotY * 1.4 + currentRotX * 0.8).toFixed(1);
        var glareOpacity = Math.max(0.15, Math.min(0.85, 0.42 + Math.sin(normY * Math.PI / 180) * 0.28));
        glare.style.setProperty("--glare-angle", glareAngle + "deg");
        glare.style.opacity = glareOpacity.toFixed(2);
      }

      var diffY = Math.abs(targetRotY - currentRotY) + Math.abs(velRotY);
      var diffX = Math.abs(targetRotX - currentRotX) + Math.abs(velRotX);
      var diffF = Math.abs(targetFloatX - currentFloatX) + Math.abs(targetFloatY - currentFloatY);

      if (!reduce.matches || diffY > 0.04 || diffX > 0.04 || diffF > 0.04 || isDragging) {
        animRaf = requestAnimationFrame(updateCard3D);
      } else {
        animRaf = 0;
      }
    }

    function requestAnim() {
      if (!animRaf) animRaf = requestAnimationFrame(updateCard3D);
    }

    function onDragMove(e) {
      if (!isDragging) return;
      var dx = e.clientX - lastDragX;
      var dy = e.clientY - lastDragY;
      lastDragX = e.clientX;
      lastDragY = e.clientY;

      // Bebas berotasi 3D ke segala arah
      currentRotY += dx * 0.68;
      currentRotX -= dy * 0.45;
      currentRotX = Math.max(-48, Math.min(48, currentRotX));

      velRotY = dx * 0.40;
      velRotX = -dy * 0.28;
      targetRotY = currentRotY;
      targetRotX = currentRotX;

      // Bebas bergeser ringan mengikuti drag kursor
      var totalDx = e.clientX - startX;
      var totalDy = e.clientY - startY;
      targetFloatX = Math.max(-75, Math.min(75, totalDx * 0.32));
      targetFloatY = Math.max(-65, Math.min(65, totalDy * 0.32));
      currentFloatX = targetFloatX;
      currentFloatY = targetFloatY;

      requestAnim();
    }

    function onDragEnd(e) {
      if (!isDragging) return;
      isDragging = false;
      targetFloatX = 0;
      targetFloatY = 0;
      card.classList.remove("is-dragging");
      window.removeEventListener("pointermove", onDragMove);
      window.removeEventListener("pointerup", onDragEnd);
      window.removeEventListener("pointercancel", onDragEnd);
      try { card.releasePointerCapture(e.pointerId); } catch(err) {}

      // Snap lembut ke hadapan depan atau belakang jika putaran sudah mereda
      if (Math.abs(velRotY) < 1.4) {
        var normalizedY = (currentRotY % 360 + 360) % 360;
        if (normalizedY > 90 && normalizedY < 270) {
          isFlipped = true;
          targetRotY = Math.round(currentRotY / 360) * 360 + 180;
        } else {
          isFlipped = false;
          targetRotY = Math.round((currentRotY - (normalizedY > 270 ? 360 : 0)) / 360) * 360;
        }
      }
      targetRotX = 0;
      requestAnim();
    }

    card.addEventListener("pointerdown", function(e) {
      if (e.target.closest("a, button, .pass-act-btn, .pass-soc-pill, .pass-flip-btn, .pass-flip-hint")) return;
      isDragging = true;
      startX = e.clientX;
      startY = e.clientY;
      lastDragX = e.clientX;
      lastDragY = e.clientY;
      try { card.setPointerCapture(e.pointerId); } catch(err) {}
      card.classList.add("is-dragging");
      window.addEventListener("pointermove", onDragMove);
      window.addEventListener("pointerup", onDragEnd);
      window.addEventListener("pointercancel", onDragEnd);
      requestAnim();
    });

    [].forEach.call(card.querySelectorAll(".pass-flip-hint, .pass-flip-btn"), function(btn) {
      btn.addEventListener("click", function(e) {
        e.stopPropagation();
        isFlipped = !isFlipped;
        targetRotY += 180;
        targetRotX = 0;
        velRotY = 3.5;
        requestAnim();
      });
    });

    card.addEventListener("keydown", function(e) {
      if (e.key === "Enter" || e.key === " ") {
        if (e.target.closest("a, button")) return;
        e.preventDefault();
        isFlipped = !isFlipped;
        targetRotY += 180;
        requestAnim();
      }
    });

    stage.addEventListener("pointermove", function(e) {
      if (isDragging || reduce.matches || e.pointerType === "touch") return;
      var rect = stage.getBoundingClientRect();
      var nx = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
      var ny = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
      nx = Math.max(-1, Math.min(1, nx));
      ny = Math.max(-1, Math.min(1, ny));

      var baseAngle = isFlipped ? 180 : 0;
      targetRotY = baseAngle + nx * 20;
      targetRotX = -ny * 16;
      targetFloatX = nx * 12;
      targetFloatY = ny * 10;
      requestAnim();
    });

    stage.addEventListener("pointerleave", function() {
      if (isDragging || reduce.matches) return;
      targetRotY = isFlipped ? 180 : 0;
      targetRotX = 0;
      targetFloatX = 0;
      targetFloatY = 0;
      requestAnim();
    });

    // Initial entrance animation
    setTimeout(function() {
      targetRotY = 0;
      targetRotX = 0;
      requestAnim();
    }, 200);
  }

  function initComposer(root) {
    var copyBtn = root.querySelector("#copyEmailBtn");
    if (copyBtn) {
      copyBtn.addEventListener("click", function() {
        var email = "zikriganteng2023@gmail.com";
        var lbl = copyBtn.querySelector("span");
        function done() {
          copyBtn.classList.add("is-copied");
          if (lbl) lbl.textContent = word("copied") || "Tersalin!";
          setTimeout(function() {
            copyBtn.classList.remove("is-copied");
            if (lbl) lbl.textContent = word("copyMail") || "Salin Email";
          }, 2200);
        }
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(email).then(done).catch(done);
        } else {
          done();
        }
      });
    }
    var comp = root.querySelector(".pr-composer");
    if (!comp) return;
    var activeTopic = "Proyek Web";
    var pills = comp.querySelectorAll(".prc-topic");
    [].forEach.call(pills, function(p) {
      p.addEventListener("click", function() {
        [].forEach.call(pills, function(x) { x.classList.remove("on"); x.setAttribute("aria-pressed", "false"); });
        p.classList.add("on");
        p.setAttribute("aria-pressed", "true");
        activeTopic = p.textContent.trim();
      });
    });
    var nameIn = comp.querySelector("#prcName");
    var msgIn = comp.querySelector("#prcMsg");
    var waBtn = comp.querySelector("#prcWaBtn");
    var mailBtn = comp.querySelector("#prcMailBtn");
    function buildMessage() {
      var nm = (nameIn && nameIn.value.trim()) ? nameIn.value.trim() : "";
      var ms = (msgIn && msgIn.value.trim()) ? msgIn.value.trim() : "";
      var greeting = "Halo Zikri, saya " + (nm || "pengunjung portofolio Anda") + ".";
      var topicLine = "Topik: " + activeTopic + ".";
      var bodyLine = ms ? ("Pesan: " + ms) : "Saya tertarik berdiskusi mengenai proyek / kolaborasi.";
      return {
        subject: "[" + activeTopic + "] " + (nm ? "Dari " + nm : "Pesan dari Portofolio"),
        full: greeting + "\n" + topicLine + "\n" + bodyLine
      };
    }
    if (waBtn) {
      waBtn.addEventListener("click", function() {
        var m = buildMessage();
        var url = "https://wa.me/6281367381826?text=" + encodeURIComponent(m.full);
        window.open(url, "_blank", "noopener,noreferrer");
      });
    }
    if (mailBtn) {
      mailBtn.addEventListener("click", function() {
        var m = buildMessage();
        window.location.href = "mailto:zikriganteng2023@gmail.com?subject=" + encodeURIComponent(m.subject) + "&body=" + encodeURIComponent(m.full);
      });
    }
  }

  function init(root){
    cur = root; tpx = tpy = px = py = 0; mx = my = -9999;
    tr(root); tick(root);
    initPass3D(root);
    initComposer(root);
    var iv = setInterval(function(){ if (!root.isConnected) { clearInterval(iv); return; } tick(root); }, 1000);
  }
  new MutationObserver(function(){
    var root = pgb.querySelector(".pr-paper");
    if (root && !root.__k) { root.__k = 1; init(root); }
  }).observe(pgb, {childList: true});
  window.addEventListener("zk-lang", function(){ var r = pgb.querySelector(".pr-paper"); if (r) tr(r); });
})();


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
  if (reduce) {
    document.querySelectorAll('#warpdefs animate').forEach(function(a){ a.remove(); });
  }


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

    ring.innerHTML = [
      '<defs>',
        '<path id="rp" d="M 0,' + (-rText) + ' A ' + rText + ' ' + rText + ' 0 1 1 0,' + rText + ' A ' + rText + ' ' + rText + ' 0 1 1 0,' + (-rText) + '"/>',
      '</defs>',
      '<circle r="' + rOuter + '" fill="var(--disc)"/>',
      '<circle r="' + (rOuter - 1.5) + '" fill="none" stroke="var(--ring)" stroke-width="0.9" opacity="0.45"/>',
      '<circle r="' + rInner + '" fill="none" stroke="var(--ring)" stroke-width="0.9" stroke-dasharray="3 5" opacity="0.5"/>',
      '<g>' + ticks.join('') + '</g>',
      '<text style="font-size: ' + (isMob ? 9 : 10) + 'px; font-weight: 700; letter-spacing: 0.16em; fill: var(--ring); font-family: inherit;">',
        '<textPath href="#rp" textLength="' + (Math.PI * 2 * rText * 0.98) + '">PORTOFOLIO • PORTOFOLIO • PORTOFOLIO • PORTOFOLIO • PORTOFOLIO •</textPath>',
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

  var farC = [], zC = [], activeC = -1, opC = [], lastPos = pos;
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
      c.classList.toggle('face-down', isBack);
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

      c.style.transform = 'rotate(' + totalRot.toFixed(2) + 'deg) translateY(' + totalYShift.toFixed(1) + 'px) scale(' + totalScale.toFixed(3) + ')' + (toss ? ' rotate(' + toss.toFixed(2) + 'deg)' : '') + tiltStr;

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

  // Spring physics responsif & cepat (putaran kartu gesit dan mantap)
  var raf = null;
  var afterSettle = null;
  function animateTo(t, v0, cb) {
    if (raf) cancelAnimationFrame(raf);
    afterSettle = cb || null;
    if (reduce) { lean = 0; setPos(t); if (afterSettle) { var f0 = afterSettle; afterSettle = null; f0(); } return; }
    var v = v0 || 0, lastT = performance.now();
    // Stiffness ditingkatkan agar perputaran kartu bergerak jauh lebih cepat & responsif
    var k = 0.00042, c = 1.82 * Math.sqrt(k);
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
      [
        '<h2 class="st-h" data-t="h">Cerita Saya</h2>',
        '<p class="st-sub" data-t="sub">Perjalanan bertumbuh, belajar, dan menemukan arah di dunia web development &amp; desain antarmuka.</p>',
        '<p class="st-lead" data-t="lead">Dari masa kecil di Medan hingga terjun langsung ke dunia industri perangkat lunak — berikut adalah bab-bab nyata yang membentuk disiplin, rasa ingin tahu, dan karya saya hari ini.</p>',
        '<div class="st-wrap"><svg class="st-thread" aria-hidden="true"></svg><ol class="st-life" aria-label="Garis waktu cerita saya">' +
          '<li class="st-ch" data-m="0.18"><div class="st-hd"><span class="st-n" aria-hidden="true">01</span><span class="st-when" data-t="c1w">2011 · Medan</span></div><h3 data-t="c1t">Akar &amp; Pencapaian Awal</h3><p data-t="c1p1">Lahir pada tahun 2011 di Medan, Sumatera Utara, dan tumbuh dikelilingi kehangatan keluarga besar ayah maupun ibu sebagai cucu pertama dari kedua belah pihak.</p><p data-t="c1p2">Salah satu momen paling berkesan di masa kecil adalah meraih Juara 1 Lomba Tahfidz Tingkat Kota pada usia enam tahun — pelajaran pertama bahwa fokus dan ketekunan akan membuahkan hasil nyata.</p></li>' +
          '<li class="st-ch" data-m="-0.32"><div class="st-hd"><span class="st-n" aria-hidden="true">02</span><span class="st-when" data-t="c2w">Masa Sekolah</span></div><h3 data-t="c2t">Fondasi Karakter &amp; Akademik</h3><p data-t="c2p1">Menempuh pendidikan dasar di MIS Aisyiyah Sumatera Utara dan melanjutkan jenjang menengah pertama di MTs Aisyiyah Sumatera Utara.</p><p data-t="c2p2">Fase ini membentuk kedisiplinan, daya juang untuk bangkit dari masa-masa sulit, persahabatan yang erat, serta ketertarikan awal terhadap cara kerja antarmuka digital.</p></li>' +
          '<li class="st-ch" data-m="0.38"><div class="st-hd"><span class="st-n" aria-hidden="true">03</span><span class="st-when" data-t="c3w">Pendidikan Vokasi</span></div><h3 data-t="c3t">Melangkah ke Dunia Web di SMK Swasta Mandiri</h3><p data-t="c3p1">Melanjutkan pendidikan ke SMK Swasta Mandiri di Medan, tempat rasa penasaran berubah menjadi praktik teknis yang terarah.</p><p data-t="c3p2">Di sini saya mulai mendalami rekayasa web, belajar berpikir mandiri, berani bereksperimen, dan menemukan jalur yang ingin saya tekuni di bidang front-end development.</p></li>' +
          '<li class="st-ch" data-m="-0.25"><div class="st-hd"><span class="st-n" aria-hidden="true">04</span><span class="st-when" data-t="c4w">Eksplorasi Mandiri</span></div><h3 data-t="c4t">Mendalami Kode, Animasi &amp; Desain UI</h3><p data-t="c4p1">Mengasah struktur HTML5 semantik, arsitektur CSS3 modern dan Tailwind CSS, logika JavaScript (ES6+), serta koreografi animasi dengan GSAP dan Anime.js.</p><p data-t="c4p2">Menyadari bahwa produk digital yang baik menuntut keseimbangan antara ketajaman estetika visual dan kode yang cepat, bersih, serta nyaman diakses di setiap layar.</p></li>' +
          '<li class="st-ch is-now" data-m="0.45"><div class="st-hd"><span class="st-n" aria-hidden="true">05</span><span class="st-when" data-t="c5w">Tahun ke-2 SMK · Industri</span></div><h3 data-t="c5t">Praktik Kerja Lapangan (PKL) di DigitalCODE</h3><p data-t="c5p1">Saat ini berada di tahun kedua SMK dan tengah menjalani pengalaman Praktik Kerja Lapangan (PKL) pertama di perusahaan DigitalCODE.</p><p data-t="c5p2">Terjun ke lingkungan kerja nyata mempertajam alur kerja saya — menerjemahkan teori yang dipelajari di sekolah menjadi antarmuka web fungsional dengan standar produksi.</p></li>' +
          '<li class="st-ch is-next" data-m="1.0"><div class="st-hd"><span class="st-n" aria-hidden="true">06</span><span class="st-when" data-t="c6w">Hari Ini &amp; Visi</span></div><h3 data-t="c6t">Fokus Saat Ini &amp; Langkah Berikutnya</h3><p data-t="c6p1">Merancang landing page responsif, sistem UI interaktif, dan pengalaman web modern dari Medan sembari terus memperdalam React, Vue, serta alur kerja berbasis AI.</p><p data-t="c6p2">Terbuka untuk proyek freelance, kolaborasi kreatif, dan kontribusi dalam membangun produk digital yang berkarakter.</p></li>' +
        '</ol></div>',
        '<div class="st-end"><p><strong data-t="e1">Terus belajar, berinovasi, dan berkembang.</strong></p><p data-t="e2">Setiap baris kode adalah langkah untuk menjadi lebih baik.</p>' +
        '<div class="st-cta-row"><button type="button" class="st-cta-btn pri" data-goto="5" data-t="ctaProj">Lihat Proyek Unggulan &#8599;</button><button type="button" class="st-cta-btn sec" data-goto="6" data-t="ctaContact">Hubungi Saya &#8599;</button></div></div>'
      ].join('')
    ],

    // 1: Music -- Studio Synth + MP3 Turntable
    ['<i class="mg"></i><svg class="mw" viewBox="0 0 1200 800" preserveAspectRatio="none" aria-hidden="true"><defs><linearGradient id="mwl" x1="0" x2="1" y1="0" y2="0"><stop offset="0" stop-color="#e0463a" stop-opacity="0"/><stop offset=".25" stop-color="#e0463a" stop-opacity=".9"/><stop offset=".75" stop-color="#e0463a" stop-opacity=".55"/><stop offset="1" stop-color="#e0463a" stop-opacity="0"/></linearGradient></defs><g fill="none" stroke="url(#mwl)" vector-effect="non-scaling-stroke"><path class="ln" style="--i:0;opacity:0.35" stroke-width="1.6" d="M1250 600 C 1020 570, 860 550, 640 500 S 240 290, -60 330"/><path class="ln" style="--i:1;opacity:0.47" stroke-width="1" d="M1250 609 C 1020 579, 860 570, 640 520 S 240 324, -60 364"/><path class="ln" style="--i:2;opacity:0.59" stroke-width="1" d="M1250 618 C 1020 588, 860 590, 640 540 S 240 358, -60 398"/><path class="ln" style="--i:3;opacity:0.71" stroke-width="1.6" d="M1250 627 C 1020 597, 860 610, 640 560 S 240 392, -60 432"/><path class="ln" style="--i:4;opacity:0.35" stroke-width="1" d="M1250 636 C 1020 606, 860 630, 640 580 S 240 426, -60 466"/><path class="ln" style="--i:5;opacity:0.47" stroke-width="1" d="M1250 645 C 1020 615, 860 650, 640 600 S 240 460, -60 500"/><path class="ln" style="--i:6;opacity:0.59" stroke-width="1.6" d="M1250 654 C 1020 624, 860 670, 640 620 S 240 494, -60 534"/><path class="ln" style="--i:7;opacity:0.71" stroke-width="1" d="M1250 663 C 1020 633, 860 690, 640 640 S 240 528, -60 568"/><path class="ln" style="--i:8;opacity:0.35" stroke-width="1" d="M1250 672 C 1020 642, 860 710, 640 660 S 240 562, -60 602"/><path class="ln" style="--i:9;opacity:0.47" stroke-width="1.6" d="M1250 681 C 1020 651, 860 730, 640 680 S 240 596, -60 636"/><path class="ln" style="--i:10;opacity:0.59" stroke-width="1" d="M1250 690 C 1020 660, 860 750, 640 700 S 240 630, -60 670"/><path class="ln" style="--i:11;opacity:0.71" stroke-width="1" d="M1250 699 C 1020 669, 860 770, 640 720 S 240 664, -60 704"/><path class="ln" style="--i:12;opacity:0.35" stroke-width="1.6" d="M1250 708 C 1020 678, 860 790, 640 740 S 240 698, -60 738"/><path class="ln" style="--i:13;opacity:0.47" stroke-width="1" d="M1250 717 C 1020 687, 860 810, 640 760 S 240 732, -60 772"/></g></svg><i class="mn"></i><i class="dim"></i><span class="ghost" id="ghost" aria-hidden="true"></span><img class="cut" src="' + MUSIC_CUT + '" alt="M. Zikri bermain gitar"><i class="lamp"></i><i class="sweep"></i><canvas class="dust" aria-hidden="true"></canvas>', '<div class="me-top"><span class="me-k">Playlist · 06 lagu</span></div><h2 class="pt">Lagi sering<br><em>kuputar.</em></h2><p class="pl-sub">Enam lagu yang lagi nempel di kepala.</p><ol class="pl" id="plist"></ol>'],

    // 2: About (Zikri)
    [
      '<img src="' + PHOTO + '" alt="M. Zikri Al-Bukhori">',
      '<div class="me-top"><span class="me-k">Tentang saya</span></div>' +
      '<h2 class="pt">M. Zikri<br><em>Al-Bukhori</em></h2>' +
      '<div class="me-bio"><p class="me-lead">Halo, saya <strong>M. Zikri Al-Bukhori</strong>, seorang <strong>Front-End Developer &amp; UI Designer</strong> yang berdomisili di <strong>Medan, Sumatera Utara</strong>. Saya berfokus pada perancangan antarmuka web modern yang responsif, rapi, dan mudah digunakan.</p><p>Saat ini saya menempuh pendidikan di <strong>SMK Swasta Mandiri</strong> dan menjalani praktik industri (PKL) di <strong>DigitalCODE</strong>, menerjemahkan ide kreatif menjadi kode yang solid, cepat, dan interaktif.</p></div><blockquote class="me-q"><span>Prinsip saya:</span> Mengutamakan kualitas visual, performa kode, dan pengalaman pengguna yang optimal.</blockquote>' +
      '<div class="me-f">' +
        '<div><i class="me-ic" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M8 8l-4 4 4 4M16 8l4 4-4 4M13.5 5l-3 14"/></svg></i><p><b>Fokus</b><span>Front-end development &amp; desain antarmuka</span></p></div>' +
        '<div><i class="me-ic" aria-hidden="true"><svg viewBox="0 0 24 24"><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg></i><p><b>Pengalaman Industri</b><span>PKL di DigitalCODE (Web &amp; UI)</span></p></div>' +
        '<div><i class="me-ic" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11.5V16c0 1.2 2.7 3 6 3s6-1.8 6-3v-4.5"/></svg></i><p><b>Pendidikan</b><span>SMK Swasta Mandiri — Medan</span></p></div>' +
        '<div><i class="me-ic" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/></svg></i><p><b>Domisili</b><span>Medan, Sumatera Utara</span></p></div>' +
      '</div>' +
      '<div class="me-cw"><p class="me-ck">Keahlian &amp; Teknologi Utama</p><ul class="me-chips" aria-label="Teknologi utama">' +
        '<li><button type="button" class="me-chip" data-goto="4">HTML5 &amp; CSS3</button></li>' +
        '<li><button type="button" class="me-chip" data-goto="4">JavaScript ES6+</button></li>' +
        '<li><button type="button" class="me-chip" data-goto="4">Tailwind CSS</button></li>' +
        '<li><button type="button" class="me-chip" data-goto="4">React &amp; Vue</button></li>' +
        '<li><button type="button" class="me-chip" data-goto="4">GSAP &amp; Anime.js</button></li>' +
        '<li><button type="button" class="me-chip" data-goto="4">UI/UX Design</button></li>' +
        '<li><button type="button" class="me-chip" data-goto="4">Git &amp; GitHub</button></li>' +
        '<li><button type="button" class="me-chip" data-goto="4">AI Workflow</button></li>' +
      '</ul></div>' +
      '<div class="me-b">' +
        '<button type="button" class="me-btn-pri" data-goto="5">Lihat Proyek Unggulan <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17L17 7M8 7h9v9"/></svg></button>' +
        '<button type="button" class="me-btn-sec" data-goto="6">Hubungi saya <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17L17 7M8 7h9v9"/></svg></button>' +
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

    // 5: Proyek (Studi kasus interaktif + Grid semua proyek)
    [
      '<div class="np-bg"></div>',
      `<div class="nwrap"><i class="np-prog" id="npProg"></i><div class="np-header-bar"><div class="np-kicker-wrap"><span class="me-k" id="npKicker">Karya Pilihan · 04 Studi Kasus</span></div><nav class="np-nav" id="npNav" role="tablist" aria-label="Pilih proyek"></nav></div><section class="np-top"><div class="np-title-col"><div class="np-meta-bar" id="npMetaBar"></div><h1 class="np-name" id="npName" aria-live="polite"></h1><div class="np-stack" id="npStack" aria-label="Teknologi proyek"></div></div><div class="np-info" id="npInfo"></div></section><button type="button" class="np-shot" id="npShot" aria-label="Lihat gambar ukuran penuh"><div class="np-frame" id="npFrame"><div class="np-browser-bar" aria-hidden="true"><span class="np-dots"><i></i><i></i><i></i></span><span class="np-url-pill" id="npUrlPill">v0-mono-ecommerce.vercel.app</span><span class="np-zoom-hint">Perbesar &#8599;</span></div><div class="np-view" id="npView"></div></div></button><section class="np-sec" id="npSec"><h3 id="npCloseTitle">Dilihat dari dekat</h3><div class="np-crops" id="npCrops"></div></section><section class="np-sec np-two"><div><h3 id="npPalTitle">Warna yang dipakai <small class="np-pal-hint">(Klik untuk salin HEX)</small></h3><div class="np-pal" id="npPal"></div></div><div><h3 id="npRowsTitle">Isi halaman</h3><dl class="np-rows" id="npRows"></dl></div></section><section class="np-sec np-all-sec"><div class="np-all-head"><h3 id="npAllTitle">Indeks Semua Proyek (04)</h3><p id="npAllSub">Bandingkan keempat proyek unggulan atau buka demo langsung.</p></div><div class="np-all-grid" id="npAllGrid"></div></section><section class="np-more" id="npMore"></section><dialog class="np-dlg" id="npDlg"><button type="button" class="np-close" id="npClose">Tutup</button><img id="npBig" alt=""></dialog></div>`
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
      `<div class="pr-paper">
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
                <button type="button" class="pr-copy-btn" id="copyEmailBtn" aria-label="Salin alamat email">
                  <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                  <span data-kt="copyMail">Salin Email</span>
                </button>
              </div>
            </div>
            <div class="pr-composer pr-rev" style="--d:.5">
              <div class="prc-head">
                <span class="prc-k" data-kt="compTitle">KIRIM PESAN CEPAT</span>
                <div class="prc-topics" role="group" aria-label="Pilih topik diskusi">
                  <button type="button" class="prc-topic on" aria-pressed="true" data-kt="tWeb">Proyek Web</button>
                  <button type="button" class="prc-topic" aria-pressed="false" data-kt="tUi">UI/UX Design</button>
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
              <div class="pass-card" id="passCard" tabindex="0" role="region" aria-label="Kartu Identitas 3D Interaktif M. Zikri (Geser untuk memutar)">
                <!-- Lapisan Kilau Holografik Pelangi -->
                <div class="pass-glare" aria-hidden="true"></div>

                <!-- SISI DEPAN (FRONT) -->
                <div class="pass-face pass-front">
                  <div class="pass-hologram-bg" aria-hidden="true"></div>

                  <!-- Official Credential Header (Anti-AI-Slop: NO 'AVAILABLE') -->
                  <div class="pass-header-strip">
                    <div class="pass-accred-left">
                      <span class="pass-kicker">EDISI 06 &bull; DEV PASS</span>
                      <span class="pass-subkicker">MEDAN, ID (WIB)</span>
                    </div>
                    <div class="pass-accred-right">
                      <span class="pass-clearance">ALL-ACCESS</span>
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
                      <span class="seal-text">VERIFIED</span>
                    </div>
                  </div>

                  <!-- Data Identitas Kredensial -->
                  <div class="pass-info">
                    <div class="pass-identity-row">
                      <h3 class="pass-name">M. ZIKRI AL-BUKHORI</h3>
                      <span class="pass-id-badge">AUTH</span>
                    </div>
                    <p class="pass-role-line">FRONT-END DEVELOPER &bull; UI DESIGNER</p>

                    <!-- Technical Credential Specs Grid -->
                    <div class="pass-spec-grid">
                      <div class="pass-spec-box">
                        <span class="spec-k">INSTITUSI</span>
                        <span class="spec-v">SMK MANDIRI</span>
                      </div>
                      <div class="pass-spec-box">
                        <span class="spec-k">UNIT PKL</span>
                        <span class="spec-v">DIGITALCODE</span>
                      </div>
                      <div class="pass-spec-box">
                        <span class="spec-k">BASIS</span>
                        <span class="spec-v">MEDAN (WIB)</span>
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
                        <span class="act-btn-lbl">Surel / Email</span>
                        <span class="act-btn-sub">zikriganteng2023@gmail.com</span>
                      </div>
                      <span class="act-btn-arr">&#8599;</span>
                    </a>
                  </div>

                  <!-- Tombol Flip 3D Sisi Belakang -->
                  <button type="button" class="pass-flip-btn" aria-label="Balikkan kartu ke sisi belakang">
                    <svg class="flip-ic" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 11a8.1 8.1 0 0 0-15.5-2m-.5-4v4h4M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4"/></svg>
                    <span>BALIK KARTU &bull; SPEK & SOSIAL</span>
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
                        <span class="sig-watermark">AUTHORIZED SIGNATURE &bull; NOT TRANSFERABLE</span>
                        <span class="sig-handwritten">M. Zikri Al-Bukhori</span>
                      </div>
                      <div class="sig-cvc">
                        <span class="cvc-lbl">SEC</span>
                        <span class="cvc-val">062</span>
                      </div>
                    </div>

                    <!-- Hub Saluran Sosial & Repositori Resmi -->
                    <div class="pass-back-socials">
                      <div class="pass-back-head">
                        <span class="pass-back-lbl">JARINGAN & KODE SUMBER</span>
                        <span class="pass-back-subtag">TERHUBUNG</span>
                      </div>
                      <div class="pass-soc-links">
                        <a class="pass-soc-pill" href="https://github.com/trynvexa" target="_blank" rel="noopener noreferrer">
                          <span class="pill-ic"><svg viewBox="0 0 24 24"><path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21"/></svg></span>
                          <div class="pill-meta">
                            <span class="pill-t">GitHub</span>
                            <span class="pill-sub">@trynvexa &bull; Repositori Kode</span>
                          </div>
                          <span class="pill-ar">&#8599;</span>
                        </a>
                        <a class="pass-soc-pill" href="https://www.instagram.com/yo144484/" target="_blank" rel="noopener noreferrer">
                          <span class="pill-ic"><svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.5 6.5h.01"/></svg></span>
                          <div class="pill-meta">
                            <span class="pill-t">Instagram</span>
                            <span class="pill-sub">@yo144484 &bull; Visual & Desain</span>
                          </div>
                          <span class="pill-ar">&#8599;</span>
                        </a>
                        <a class="pass-soc-pill" href="https://www.tiktok.com/@frince_nael7" target="_blank" rel="noopener noreferrer">
                          <span class="pill-ic"><svg viewBox="0 0 24 24"><path d="M14 3v11.5a3.6 3.6 0 1 1-3.6-3.6M14 3c.3 2.7 2 4.4 4.8 4.7"/></svg></span>
                          <div class="pill-meta">
                            <span class="pill-t">TikTok</span>
                            <span class="pill-sub">@frince_nael7 &bull; Konten Kreatif</span>
                          </div>
                          <span class="pill-ar">&#8599;</span>
                        </a>
                      </div>
                    </div>

                    <!-- Dossier Spesifikasi Teknis -->
                    <div class="pass-dossier" aria-hidden="true">
                      <div class="dossier-row"><span>BUILD ENGINE</span><b>VANILLA ES6+ &bull; CSS3</b></div>
                      <div class="dossier-row"><span>PROD UNIT</span><b>PKL DIGITALCODE 2026</b></div>
                    </div>

                    <!-- Vector Barcode & Geographic Stamp -->
                    <div class="pass-barcode-wrap" aria-hidden="true">
                      <div class="pass-barcode">
                        <span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span>
                      </div>
                      <div class="pass-geo">
                        <span class="geo-code">* ZK &bull; 2026 &bull; ALL-ACCESS &bull; PORTFOLIO *</span>
                        <small>3&deg;35'24.8" N &bull; 98&deg;40'20.1" E &bull; MEDAN, SUMATERA UTARA</small>
                      </div>
                    </div>

                    <!-- Tombol Kembali ke Depan -->
                    <button type="button" class="pass-flip-btn back-btn" aria-label="Balikkan kartu ke sisi depan">
                      <svg class="flip-ic" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 11a8.1 8.1 0 0 0-15.5-2m-.5-4v4h4M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4"/></svg>
                      <span>KEMBALI KE SISI DEPAN</span>
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
    return '<div class="bg">' + PAGES[i][0] + '</div>' +
           '<button class="bk" data-close aria-label="Kembali ke daftar kartu"><span class="bk-i" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M15 5l-7 7 7 7"/></svg></span><span class="bk-t">Kembali</span></button>' +
           '<div class="bd">' + PAGES[i][1].split('__KT_IMG__').join(ktImg) + '</div>' +
           '<nav class="pnav" aria-label="Pindah kartu">' +
             '<button type="button" data-go="-1">&#9666; ' + cards[pv].getAttribute('data-n') + '</button>' +
             '<button type="button" data-go="1">' + cards[nx].getAttribute('data-n') + ' &#9656;</button>' +
           '</nav>';
  }

  var switching = false;
  window.zkGoPage = switchPage; // dipakai halaman Proyek (tombol "Hubungi saya")
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
      pg.className = 'pg sw p' + i;
      pgb.innerHTML = pageHTML(i);
      if (i === 5) { setTimeout(initProjectSpatialStage, 30); }
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
    var cols = fxSmall ? 3 : 4, rows = fxSmall ? 5 : 6, V = [], x, y, i, j, polys = [], cx = W / 2, cy = H / 2, maxD = Math.hypot(cx, cy);
    for (y = 0; y <= rows; y++) { V[y] = []; for (x = 0; x <= cols; x++) V[y][x] = [
      x / cols * 100 + (x === 0 || x === cols ? 0 : (Math.random() - .5) * 70 / cols),
      y / rows * 100 + (y === 0 || y === rows ? 0 : (Math.random() - .5) * 70 / rows)]; }
    for (j = 0; j < rows; j++) for (i = 0; i < cols; i++) {
      var p00 = V[j][i], p10 = V[j][i + 1], p11 = V[j + 1][i + 1], p01 = V[j + 1][i], q = Math.random();
      if (q < .45) polys.push([p00, p10, p11, p01]);
      else if (q < .72) { polys.push([p00, p10, p11]); polys.push([p00, p11, p01]); }
      else { polys.push([p00, p10, p01]); polys.push([p10, p11, p01]); }
    }
    polys.forEach(function(pts){
      var mx = 0, my = 0;
      pts.forEach(function(p){ mx += p[0] / pts.length; my += p[1] / pts.length; });
      var sx = mx / 100 * W, sy = my / 100 * H, sh = document.createElement('div'), cl = c.cloneNode(true);
      sh.className = 'sh';
      cl.setAttribute('aria-hidden', 'true'); cl.setAttribute('tabindex', '-1'); cl.removeAttribute('id');
      sh.style.clipPath = 'polygon(' + pts.map(function(p){ return (p[0] + (p[0] - mx) * .012) + '% ' + (p[1] + (p[1] - my) * .012) + '%'; }).join(',') + ')';
      sh.style.transformOrigin = sx + 'px ' + sy + 'px';
      sh.appendChild(cl);
      var z = Math.random(), a = Math.atan2(sy - cy, sx - cx) + (Math.random() - .5) * 1.1, d = (170 + Math.random() * 330) * (.6 + z * .8) * U, dn = Math.hypot(sx - cx, sy - cy) / maxD;
      var dx = Math.cos(a) * d, dy = Math.sin(a) * d - 40 * U, zz = (z - .4) * 520, rx = (Math.random() - .5) * 220, ry = (Math.random() - .5) * 220, rz = (Math.random() - .5) * 150;
      if (z > .85) sh.style.filter = 'blur(2px)';
      fw.appendChild(sh);
      if (rev) {
        sh.animate([
          { transform: tf(dx * 1.26, dy * 1.26, zz * 1.3, rx * 1.4, ry * 1.4, rz * 1.4, 1), opacity: 0, offset: 0, easing: 'linear' },
          { transform: tf(dx * 1.2, dy * 1.2, zz * 1.2, rx * 1.3, ry * 1.3, rz * 1.3, 1), opacity: 1, offset: .15, easing: 'cubic-bezier(.6,0,.2,1)' },
          { transform: tf(0, 0, 0, 0, 0, 0, 1), opacity: 1, offset: 1 }
        ], { duration: 1000, delay: 150 + (1 - dn) * 140 + Math.random() * 30, fill: 'both' });
      } else {
        sh.animate([
          { transform: tf(0, 0, 0, 0, 0, 0, 1), opacity: 1, offset: 0, easing: 'cubic-bezier(.1,.8,.2,1)' },
          { transform: tf(dx, dy, zz, rx, ry, rz, 1), opacity: 1, offset: .32, easing: 'ease-out' },
          { transform: tf(dx * 1.2, dy * 1.2 - 14 * U, zz * 1.2, rx * 1.35, ry * 1.35, rz * 1.35, 1), opacity: 1, offset: .78, easing: 'ease-in' },
          { transform: tf(dx * 1.32, dy * 1.32 - 24 * U, zz * 1.3, rx * 1.5, ry * 1.5, rz * 1.5, 1), opacity: 0, offset: 1 }
        ], { duration: 1300, delay: dn * 140 + Math.random() * 30, fill: 'both' });
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
    if (fxReduce) { closeCore(); return; }
    var c = cards[cur], h = fxHost();
    FX.busy = true;
    fxShards(c, true); fxHide(c);
    irisC = { x: innerWidth / 2, y: innerHeight / 2 }; closeCore(); irisC = null;
    setTimeout(function(){ fxShow(); h.remove(); FX.busy = false; c.focus({ preventScroll: true }); }, 750);
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
    pg.className = 'pg p' + i;
    if (i === 5) { setTimeout(initProjectSpatialStage, 40); }
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
    if (e.key === 'Escape') closePage();
  });

  document.getElementById('prev').onclick = function(){ go(Math.round(pos) - 1); stop(); };
  document.getElementById('next').onclick = function(){ go(Math.round(pos) + 1); stop(); };

  document.addEventListener('keydown', function(e){
    if (cur >= 0) {
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
    var lState = [], lRaf = 0, mxL = -9999, myL = -9999, lActive = false;
    var dragIdx = -1, dragY0 = 0, dragMoved = false;

    function getSt(i) {
      return lState[i] || (lState[i] = { x: 0, y: 0, r: 0, sx: 1, sy: 1, vx: 0, vy: 0, vr: 0, vsx: 0, vsy: 0 });
    }
    function startLetters() {
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
        } else if (lActive) {
          var rect = el.getBoundingClientRect();
          var lcx = rect.left + rect.width * 0.5;
          var lcy = rect.top + rect.height * 0.5;
          var dx = mxL - lcx, dy = myL - lcy;
          var dist = Math.hypot(dx, dy);
          var rad = Math.max(95, rect.width * 1.85);
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
      hdEl.addEventListener('pointermove', function(e){
        if (down) return;
        mxL = e.clientX; myL = e.clientY;
        if (dragIdx >= 0) {
          if (Math.abs(myL - dragY0) > 6) dragMoved = true;
          startLetters();
          return;
        }
        var tr = titleEl.getBoundingClientRect();
        var near = e.clientY >= tr.top - 45 && e.clientY <= tr.bottom + 45 && e.clientX >= tr.left - 45 && e.clientX <= tr.right + 45;
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

/* ============================================== */

/* Geser kiri/kanan di halaman detail untuk pindah kartu (hanya layar sentuh; tombol .pnav disembunyikan di sana) */
(function(){
  var pg = document.getElementById('pg'); if (!pg) return;
  var touchOnly = window.matchMedia('(hover: none) and (pointer: coarse)');
  var BLOCK = '.gstage,.lbx,[class*="rail"],.sk-panel,.sk-card,.sk-orbit,.sk-stage,.sk-ic,.sk-cats,.np-nav,#npShot,.np-shot,dialog,input,textarea,select,button,a';
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

/* ============================================================
   Cinematic Hybrid Background (A + B) v2:
   A. Dual-Depth Blurred Active-Card Photo Backdrop Crossfade
   B. 5-Layer 3D Fluid Silk Light Drapes, Studio Sunbeams & Bokeh Dust
   ============================================================ */
(function(){
  var cv = document.getElementById('bgField');
  var slideA = document.getElementById('bgSlideA');
  var slideB = document.getElementById('bgSlideB');
  if (!cv) return;
  var ctx = cv.getContext('2d');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var W = 0, H = 0, dpr = 1, isMob = false;
  var mx = 0.5, my = 0.35, smx = 0.5, smy = 0.35, vx = 0, vy = 0;
  var wheelPos = 2, wheelLean = 0, sWheelPos = 2, sWheelLean = 0;
  var waveBoost = 0;
  var curSlide = 0, lastCardIdx = -1;
  var mqDark = window.matchMedia('(prefers-color-scheme: dark)');

  // Warm editorial mood palettes per card (0: Story, 1: Music, 2: Me, 3: Frame, 4: Skill, 5: Proyek, 6: Kontak)
  var PALETTES = [
    { a: [224, 70, 58],   b: [185, 85, 62]  }, // 0: Story (Crimson & Warm Terracotta)
    { a: [196, 86, 68],   b: [110, 128, 165] }, // 1: Music (Vinyl Dusk & Warm Coral)
    { a: [216, 98, 72],   b: [165, 148, 120] }, // 2: Me (Editorial Amber & Sandstone)
    { a: [175, 152, 128], b: [130, 145, 138] }, // 3: Frame (Gallery Silver & Warm Linen)
    { a: [130, 162, 136], b: [204, 154, 108] }, // 4: Skill (Studio Sage & Warm Gold)
    { a: [212, 112, 58],  b: [172, 132, 96]  }, // 5: Proyek (Burnt Sienna & Ochre)
    { a: [138, 168, 142], b: [198, 142, 110] }  // 6: Kontak (Editorial Moss & Warm Clay)
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
    'assets/images/card-contact.webp'
  ];

  // Warm floating studio dust motes (lightweight count)
  var motes = [];
  for (var m = 0; m < 12; m++) {
    motes.push({
      x: Math.random(),
      y: Math.random(),
      r: 1.2 + Math.random() * 2.2,
      spX: (Math.random() - 0.5) * 0.00016,
      spY: -0.0001 - Math.random() * 0.0002,
      ph: Math.random() * Math.PI * 2,
      dp: 0.45 + Math.random() * 0.75
    });
  }

  function isDark() {
    var t = document.documentElement.getAttribute('data-theme');
    return t ? t === 'dark' : mqDark.matches;
  }

  // A. Switch blurred photo backdrop when active card changes
  window.__zkBgSetCard = function(idx, cardEl) {
    if (idx === lastCardIdx) return;
    lastCardIdx = idx;
    tgtPal = PALETTES[idx % PALETTES.length] || PALETTES[2];
    document.documentElement.style.setProperty('--bg-acc', tgtPal.a.join(', '));
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

  // Initialize first backdrop immediately
  setTimeout(function(){
    var activeCard = document.querySelector('.card.on') || document.querySelectorAll('.card')[2];
    if (lastCardIdx < 0) window.__zkBgSetCard(2, activeCard);
  }, 50);

  function resize() {
    W = window.innerWidth;
    H = window.innerHeight;
    isMob = W <= 700;
    // Render background canvas at lightweight scale (0.65x mobile, 0.8x desktop) for instant 60fps
    dpr = isMob ? 0.62 : 0.8;
    cv.width = Math.round(W * dpr);
    cv.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  resize();
  window.addEventListener('resize', resize);

  var lastBgFrame = 0;

  window.addEventListener('pointermove', function(e){
    var nmx = e.clientX / (W || 1);
    var nmy = e.clientY / (H || 1);
    var spd = Math.hypot(nmx - mx, nmy - my);
    waveBoost = Math.min(1.6, waveBoost + spd * 2.2);
    mx = nmx;
    my = nmy;
  }, { passive: true });

  window.addEventListener('pointerdown', function(e){
    mx = e.clientX / (W || 1);
    my = e.clientY / (H || 1);
    waveBoost = Math.min(1.6, waveBoost + 0.75);
  }, { passive: true });

  window.__zkBgWheelSync = function(pos, lean) {
    wheelPos = pos;
    wheelLean = lean || 0;
  };
  window.__zkBgPulse = function() {
    waveBoost = Math.min(1.6, waveBoost + 0.9);
  };

  function drawSunbeams(t, dark, colA, colB) {
    ctx.save();
    ctx.globalCompositeOperation = dark ? 'screen' : 'soft-light';
    for (var b = 0; b < 3; b++) {
      var bx = W * (0.22 + b * 0.28 + Math.sin(t * 0.22 + b * 1.7) * 0.08 + (smx - 0.5) * -0.18);
      var bw = W * (0.18 + b * 0.04);
      var beamGrad = ctx.createLinearGradient(bx - bw, 0, bx + bw * 0.8, H * 0.95);
      var cStr = (b % 2 === 0 ? colA : colB).join(',');
      var aPeak = dark ? (0.075 + waveBoost * 0.03) : (0.22 + waveBoost * 0.06);
      beamGrad.addColorStop(0, 'rgba(' + (dark ? cStr : '255, 253, 248') + ',' + aPeak.toFixed(3) + ')');
      beamGrad.addColorStop(0.55, 'rgba(' + cStr + ',' + (aPeak * 0.45).toFixed(3) + ')');
      beamGrad.addColorStop(1, 'rgba(' + cStr + ', 0)');

      ctx.fillStyle = beamGrad;
      ctx.beginPath();
      ctx.moveTo(bx - bw * 0.55, -20);
      ctx.lineTo(bx + bw * 0.55, -20);
      ctx.lineTo(bx + bw * 1.45 + sWheelLean * 14, H + 20);
      ctx.lineTo(bx - bw * 0.35 + sWheelLean * 14, H + 20);
      ctx.closePath();
      ctx.fill();
    }
    ctx.restore();
  }

  function drawSilkRibbon(t, dark, layerIdx, colRgb, alphaBase) {
    ctx.save();
    ctx.beginPath();
    var yBase = H * (0.20 + layerIdx * 0.22) + (smy - 0.5) * (layerIdx - 1) * -28;
    var amp1 = (H * (0.075 + (layerIdx % 2) * 0.02)) * (1 + waveBoost * 0.38);
    var amp2 = (H * 0.04) * (1 + Math.abs(sWheelLean) * 0.16);
    var phase = t * (0.38 + layerIdx * 0.14) + layerIdx * 1.7 + sWheelPos * 0.48;
    var stepX = Math.max(32, Math.round(W / (isMob ? 16 : 22)));
    var pts = [];

    for (var x = -40; x <= W + 40; x += stepX) {
      var nx = x / (W || 1);
      var distCursor = nx - smx;
      var cursorPull = Math.exp(-distCursor * distCursor * 7) * ((smy - 0.45) * H * 0.14 + vy * H * 0.9);
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

    var grad = ctx.createLinearGradient(
      W * (0.2 + (smx - 0.5) * 0.3),
      yBase - amp1 * 1.7,
      W * (0.8 - (smx - 0.5) * 0.3),
      H
    );
    var cStr = colRgb[0] + ',' + colRgb[1] + ',' + colRgb[2];
    if (dark) {
      grad.addColorStop(0, 'rgba(' + cStr + ',' + (alphaBase * 1.45).toFixed(3) + ')');
      grad.addColorStop(0.36, 'rgba(' + cStr + ',' + (alphaBase * 0.48).toFixed(3) + ')');
      grad.addColorStop(1, 'rgba(16, 19, 18, 0)');
    } else {
      grad.addColorStop(0, 'rgba(255, 253, 248,' + (alphaBase * 2.05).toFixed(3) + ')');
      grad.addColorStop(0.28, 'rgba(' + cStr + ',' + (alphaBase * 1.05).toFixed(3) + ')');
      grad.addColorStop(1, 'rgba(238, 235, 226, 0)');
    }
    ctx.fillStyle = grad;
    ctx.fill();

    // Rim-light silk crest highlight along the top fold of the cloth
    ctx.beginPath();
    for (var k = 0; k < pts.length; k++) {
      if (k === 0) ctx.moveTo(pts[k][0], pts[k][1]);
      else ctx.lineTo(pts[k][0], pts[k][1]);
    }
    var rimGrad = ctx.createLinearGradient(0, 0, W, 0);
    var rimPeak = Math.max(0.08, Math.min(0.92, smx + (layerIdx - 2) * 0.06));
    var rimCol = dark ? cStr : '255, 255, 255';
    var rimAlpha = dark ? (0.22 + waveBoost * 0.14) : (0.62 + waveBoost * 0.18);
    rimGrad.addColorStop(0, 'rgba(' + rimCol + ', 0)');
    rimGrad.addColorStop(Math.max(0.01, rimPeak - 0.34), 'rgba(' + rimCol + ',' + (rimAlpha * 0.38).toFixed(3) + ')');
    rimGrad.addColorStop(rimPeak, 'rgba(' + rimCol + ',' + Math.min(0.95, rimAlpha).toFixed(3) + ')');
    rimGrad.addColorStop(Math.min(0.99, rimPeak + 0.34), 'rgba(' + rimCol + ',' + (rimAlpha * 0.38).toFixed(3) + ')');
    rimGrad.addColorStop(1, 'rgba(' + rimCol + ', 0)');
    ctx.strokeStyle = rimGrad;
    ctx.lineWidth = dark ? 1.7 : 2.3;
    ctx.stroke();
    ctx.restore();
  }

  function drawDustMotes(t, dark, colA) {
    ctx.save();
    var cStr = colA.join(',');
    for (var i = 0; i < motes.length; i++) {
      var m = motes[i];
      m.x += m.spX + Math.sin(t * 0.5 + m.ph) * 0.00012 - vx * 0.018 * m.dp;
      m.y += m.spY - vy * 0.014 * m.dp;
      if (m.y < -0.05) { m.y = 1.05; m.x = Math.random(); }
      if (m.x < -0.05) m.x = 1.05;
      if (m.x > 1.05) m.x = -0.05;

      var px = m.x * W;
      var py = m.y * H;
      var twinkle = 0.45 + 0.55 * Math.sin(t * 1.4 + m.ph);
      var al = (dark ? 0.24 : 0.34) * twinkle * m.dp;

      ctx.beginPath();
      ctx.arc(px, py, m.r * (1 + waveBoost * 0.25), 0, Math.PI * 2);
      ctx.fillStyle = dark
        ? 'rgba(' + cStr + ',' + al.toFixed(3) + ')'
        : 'rgba(255, 252, 244,' + (al * 1.35).toFixed(3) + ')';
      ctx.fill();
    }
    ctx.restore();
  }

  function draw(now) {
    var pg = document.getElementById('pg');
    var hidden = document.hidden ||
                 document.documentElement.classList.contains('intro-on') ||
                 document.body.classList.contains('covered') ||
                 document.body.classList.contains('busy') ||
                 (pg && pg.classList.contains('open'));
    if (hidden) {
      requestAnimationFrame(draw);
      return;
    }
    // Cap ambient background canvas to ~32fps on mobile / ~45fps on desktop so main thread stays 100% free for 60fps UI/card physics
    if (now - lastBgFrame < (isMob ? 30 : 20)) {
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
    waveBoost *= 0.94;

    for (var i = 0; i < 3; i++) {
      curPal.a[i] += (tgtPal.a[i] - curPal.a[i]) * 0.045;
      curPal.b[i] += (tgtPal.b[i] - curPal.b[i]) * 0.045;
    }
    var colA = [Math.round(curPal.a[0]), Math.round(curPal.a[1]), Math.round(curPal.a[2])];
    var colB = [Math.round(curPal.b[0]), Math.round(curPal.b[1]), Math.round(curPal.b[2])];

    ctx.clearRect(0, 0, W, H);

    // 1. Soft Studio Spotlight following cursor & active card mood
    var spotX = W * (0.5 + (smx - 0.5) * 0.62);
    var spotY = H * (0.38 + (smy - 0.4) * 0.5);
    var spotR = Math.max(W, H) * 0.68;
    var spot = ctx.createRadialGradient(spotX, spotY, 10, spotX, spotY, spotR);
    if (dark) {
      spot.addColorStop(0, 'rgba(' + colA.join(',') + ', 0.18)');
      spot.addColorStop(0.45, 'rgba(' + colB.join(',') + ', 0.075)');
      spot.addColorStop(1, 'rgba(16, 19, 18, 0)');
    } else {
      spot.addColorStop(0, 'rgba(255, 255, 255, 0.64)');
      spot.addColorStop(0.42, 'rgba(' + colA.join(',') + ', 0.14)');
      spot.addColorStop(1, 'rgba(238, 235, 226, 0)');
    }
    ctx.fillStyle = spot;
    ctx.fillRect(0, 0, W, H);

    // 2. Diagonal Studio Sunbeams (Desktop only to keep Mobile ultra-light)
    if (!isMob) drawSunbeams(t, dark, colA, colB);

    // 3. Flowing 3D Silk Light Drapes (3 layers on Desktop, 2 on Mobile for 60fps)
    drawSilkRibbon(t, dark, 0, colB, dark ? 0.12 : 0.17);
    drawSilkRibbon(t, dark, 1, colA, dark ? 0.16 : 0.22);
    if (!isMob) drawSilkRibbon(t, dark, 2, colB, dark ? 0.12 : 0.16);

    // 4. Warm Studio Bokeh Dust Motes
    drawDustMotes(t, dark, colA);

    if (!reduce) requestAnimationFrame(draw);
  }

  requestAnimationFrame(draw);
})();