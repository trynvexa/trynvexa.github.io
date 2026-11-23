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
