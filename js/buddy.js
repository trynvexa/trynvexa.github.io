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
