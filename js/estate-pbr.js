/* ==========================================================================
   js/estate-pbr.js — Unified Physically-Based Material, Normal/Roughness Map,
   Botanical Alpha-Cutout Foliage, Volumetric Cloud Sky, GLSL Swimming Pool
   Water Shader & Sculpted Architectural/Gaming Geometry Engine
   ========================================================================== */
(function () {
  'use strict';

  function seededRnd(seed) {
    var s = (seed | 0) || 2026;
    if (s < 0) s = -s;
    return function () { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; };
  }

  function makeCanvas(w, h) {
    var cv = document.createElement('canvas');
    cv.width = w; cv.height = h;
    return cv;
  }

  /* Fast 256×256 Sobel Tangent-Space Normal Baker from 512×512 Height Field */
  function heightToNormal(THREE, trackTex, hCanvas, strength, repX, repY, maxAniso) {
    var w = Math.min(256, hCanvas.width), h = Math.min(256, hCanvas.height);
    var workCv = (w === hCanvas.width && h === hCanvas.height) ? hCanvas : makeCanvas(w, h);
    if (workCv !== hCanvas) workCv.getContext('2d').drawImage(hCanvas, 0, 0, w, h);
    var src = workCv.getContext('2d').getImageData(0, 0, w, h).data;
    var outCv = makeCanvas(w, h);
    var outCtx = outCv.getContext('2d');
    var outImg = outCtx.createImageData(w, h);
    var dst = outImg.data;
    var str = strength || 2.1;

    function s(x, y) {
      x = ((x % w) + w) % w;
      y = ((y % h) + h) % h;
      return src[(y * w + x) * 4] / 255;
    }

    for (var y = 0; y < h; y++) {
      for (var x = 0; x < w; x++) {
        var dx = (s(x + 1, y - 1) + 2 * s(x + 1, y) + s(x + 1, y + 1)) - (s(x - 1, y - 1) + 2 * s(x - 1, y) + s(x - 1, y + 1));
        var dy = (s(x - 1, y + 1) + 2 * s(x, y + 1) + s(x + 1, y + 1)) - (s(x - 1, y - 1) + 2 * s(x, y - 1) + s(x + 1, y - 1));
        var nx = -dx * str, ny = -dy * str, nz = 1.0;
        var inv = 1 / Math.sqrt(nx * nx + ny * ny + nz * nz);
        var idx = (y * w + x) * 4;
        dst[idx]     = Math.round((nx * inv * 0.5 + 0.5) * 255);
        dst[idx + 1] = Math.round((ny * inv * 0.5 + 0.5) * 255);
        dst[idx + 2] = Math.round((nz * inv * 0.5 + 0.5) * 255);
        dst[idx + 3] = 255;
      }
    }
    outCtx.putImageData(outImg, 0, 0);
    var tex = trackTex(new THREE.CanvasTexture(outCv));
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(repX || 1, repY || 1);
    if (maxAniso) tex.anisotropy = maxAniso;
    return tex;
  }

  function colorTex(THREE, trackTex, cv, repX, repY, maxAniso) {
    var t = trackTex(new THREE.CanvasTexture(cv));
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.repeat.set(repX || 1, repY || 1);
    t.encoding = THREE.sRGBEncoding;
    if (maxAniso) t.anisotropy = maxAniso;
    return t;
  }

  function linearTex(THREE, trackTex, cv, repX, repY, maxAniso) {
    var t = trackTex(new THREE.CanvasTexture(cv));
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.repeat.set(repX || 1, repY || 1);
    if (maxAniso) t.anisotropy = maxAniso;
    return t;
  }

  /* ---------- Architectural PBR Texture Sets (Base + Normal + Roughness) ---------- */
  function makePlasterSet(THREE, trackTex, baseHex, seed, repX, repY, maxAniso) {
    var sz = 512, cv = makeCanvas(sz, sz), ctx = cv.getContext('2d');
    var hCv = makeCanvas(sz, sz), hCtx = hCv.getContext('2d');
    var rCv = makeCanvas(sz, sz), rCtx = rCv.getContext('2d');
    ctx.fillStyle = baseHex || '#F1ECE2'; ctx.fillRect(0, 0, sz, sz);
    hCtx.fillStyle = '#808080'; hCtx.fillRect(0, 0, sz, sz);
    rCtx.fillStyle = '#DCDCDC'; rCtx.fillRect(0, 0, sz, sz);
    var rnd = seededRnd(seed || 77);
    for (var i = 0; i < 620; i++) {
      var x = rnd() * sz, y = rnd() * sz, rx = 14 + rnd() * 48, ry = 8 + rnd() * 24;
      ctx.save(); ctx.translate(x, y); ctx.rotate(rnd() * Math.PI);
      ctx.fillStyle = rnd() > 0.5 ? 'rgba(255,253,248,0.055)' : 'rgba(116,104,88,0.044)';
      ctx.beginPath(); ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
      var hv = Math.round(112 + rnd() * 32);
      hCtx.fillStyle = 'rgba(' + hv + ',' + hv + ',' + hv + ',0.24)';
      hCtx.beginPath(); hCtx.arc(x, y, rx * 0.44, 0, Math.PI * 2); hCtx.fill();
      var rv = Math.round(205 + rnd() * 40);
      rCtx.fillStyle = 'rgba(' + rv + ',' + rv + ',' + rv + ',0.25)';
      rCtx.beginPath(); rCtx.arc(x, y, rx * 0.48, 0, Math.PI * 2); rCtx.fill();
    }
    return {
      map: colorTex(THREE, trackTex, cv, repX || 3, repY || 2, maxAniso),
      normalMap: heightToNormal(THREE, trackTex, hCv, 1.4, repX || 3, repY || 2, maxAniso),
      roughnessMap: linearTex(THREE, trackTex, rCv, repX || 3, repY || 2, maxAniso)
    };
  }

  function makeConcreteSet(THREE, trackTex, baseHex, repX, repY, maxAniso) {
    var sz = 512, cv = makeCanvas(sz, sz), ctx = cv.getContext('2d');
    var hCv = makeCanvas(sz, sz), hCtx = hCv.getContext('2d');
    var rCv = makeCanvas(sz, sz), rCtx = rCv.getContext('2d');
    ctx.fillStyle = baseHex || '#C4BEB4'; ctx.fillRect(0, 0, sz, sz);
    hCtx.fillStyle = '#848484'; hCtx.fillRect(0, 0, sz, sz);
    rCtx.fillStyle = '#CCCCCC'; rCtx.fillRect(0, 0, sz, sz);
    var rnd = seededRnd(303);
    for (var i = 0; i < 900; i++) {
      var x = rnd() * sz, y = rnd() * sz, rad = 4 + rnd() * 24;
      ctx.fillStyle = rnd() > 0.5 ? 'rgba(255,252,246,0.06)' : 'rgba(66,62,56,0.055)';
      ctx.beginPath(); ctx.arc(x, y, rad, 0, Math.PI * 2); ctx.fill();
      var hv = Math.round(104 + rnd() * 50);
      hCtx.fillStyle = 'rgba(' + hv + ',' + hv + ',' + hv + ',0.22)';
      hCtx.fillRect(x, y, rad * 0.7, rad * 0.35);
    }
    for (var row = 0; row < 4; row++) {
      var ry = row * 128;
      ctx.fillStyle = 'rgba(72,68,62,0.34)'; ctx.fillRect(0, ry, sz, 2.2);
      hCtx.fillStyle = '#222222'; hCtx.fillRect(0, ry, sz, 2.6);
      rCtx.fillStyle = '#F0F0F0'; rCtx.fillRect(0, ry, sz, 3.0);
      [128, 384].forEach(function (tx) {
        ctx.fillStyle = 'rgba(58,54,48,0.45)';
        ctx.beginPath(); ctx.arc(tx, ry + 64, 4.2, 0, Math.PI * 2); ctx.fill();
        hCtx.fillStyle = '#181818';
        hCtx.beginPath(); hCtx.arc(tx, ry + 64, 4.5, 0, Math.PI * 2); hCtx.fill();
      });
    }
    return {
      map: colorTex(THREE, trackTex, cv, repX || 2.5, repY || 2.0, maxAniso),
      normalMap: heightToNormal(THREE, trackTex, hCv, 2.1, repX || 2.5, repY || 2.0, maxAniso),
      roughnessMap: linearTex(THREE, trackTex, rCv, repX || 2.5, repY || 2.0, maxAniso)
    };
  }

  function makeStoneSet(THREE, trackTex, baseHex, groutHex, tilesX, tilesY, repX, repY, maxAniso) {
    var sz = 512, cv = makeCanvas(sz, sz), ctx = cv.getContext('2d');
    var hCv = makeCanvas(sz, sz), hCtx = hCv.getContext('2d');
    var rCv = makeCanvas(sz, sz), rCtx = rCv.getContext('2d');
    ctx.fillStyle = baseHex; ctx.fillRect(0, 0, sz, sz);
    hCtx.fillStyle = '#8C8C8C'; hCtx.fillRect(0, 0, sz, sz);
    rCtx.fillStyle = '#C4C4C4'; rCtx.fillRect(0, 0, sz, sz);
    var rnd = seededRnd(tilesX * 83 + tilesY * 19);
    for (var i = 0; i < 820; i++) {
      var x = rnd() * sz, y = rnd() * sz, w = 12 + rnd() * 54, h = 1.6 + rnd() * 3.8;
      ctx.fillStyle = rnd() > 0.45 ? 'rgba(116,102,84,0.10)' : 'rgba(255,252,245,0.12)';
      ctx.fillRect(x, y, w, h);
      var hv = rnd() > 0.5 ? 92 : 162;
      hCtx.fillStyle = 'rgba(' + hv + ',' + hv + ',' + hv + ',0.32)';
      hCtx.fillRect(x, y, w * 0.75, h);
      var rv = Math.round(170 + rnd() * 68);
      rCtx.fillStyle = 'rgba(' + rv + ',' + rv + ',' + rv + ',0.3)';
      rCtx.fillRect(x, y, w, h * 1.4);
    }
    var tw = sz / tilesX, th = sz / tilesY;
    for (var r = 0; r < tilesY; r++) {
      var offset = (r % 2) * (tw * 0.5);
      for (var c = -1; c <= tilesX; c++) {
        var tx = c * tw + offset, ty = r * th;
        var v = (rnd() - 0.5) * 0.085;
        ctx.fillStyle = v > 0 ? 'rgba(255,250,242,' + v.toFixed(3) + ')' : 'rgba(42,35,26,' + (-v).toFixed(3) + ')';
        ctx.fillRect(tx + 2, ty + 2, tw - 4, th - 4);
        ctx.strokeStyle = groutHex; ctx.lineWidth = 2.6;
        ctx.strokeRect(tx, ty, tw, th);
        hCtx.strokeStyle = '#242424'; hCtx.lineWidth = 3.2;
        hCtx.strokeRect(tx, ty, tw, th);
        rCtx.strokeStyle = '#F2F2F2'; rCtx.lineWidth = 3.4;
        rCtx.strokeRect(tx, ty, tw, th);
      }
    }
    return {
      map: colorTex(THREE, trackTex, cv, repX || 2.5, repY || 2.5, maxAniso),
      normalMap: heightToNormal(THREE, trackTex, hCv, 2.3, repX || 2.5, repY || 2.5, maxAniso),
      roughnessMap: linearTex(THREE, trackTex, rCv, repX || 2.5, repY || 2.5, maxAniso)
    };
  }

  function makeWoodSet(THREE, trackTex, baseHex, darkHex, planks, repX, repY, maxAniso) {
    var sz = 512, cv = makeCanvas(sz, sz), ctx = cv.getContext('2d');
    var hCv = makeCanvas(sz, sz), hCtx = hCv.getContext('2d');
    var rCv = makeCanvas(sz, sz), rCtx = rCv.getContext('2d');
    ctx.fillStyle = baseHex; ctx.fillRect(0, 0, sz, sz);
    hCtx.fillStyle = '#929292'; hCtx.fillRect(0, 0, sz, sz);
    rCtx.fillStyle = '#9A9A9A'; rCtx.fillRect(0, 0, sz, sz);
    var n = planks || 8, ph = sz / n, rnd = seededRnd(n * 193 + 29);
    for (var i = 0; i < n; i++) {
      var y = i * ph;
      var tint = (rnd() - 0.5) * 0.12;
      ctx.fillStyle = tint > 0 ? 'rgba(255,244,224,' + tint.toFixed(3) + ')' : 'rgba(22,12,4,' + (-tint).toFixed(3) + ')';
      ctx.fillRect(0, y, sz, ph);
      var rTone = Math.round(135 + rnd() * 48);
      rCtx.fillStyle = 'rgb(' + rTone + ',' + rTone + ',' + rTone + ')';
      rCtx.fillRect(0, y, sz, ph);
      for (var f = 0; f < 16; f++) {
        var fy = y + 2 + (f / 16) * (ph - 4);
        ctx.strokeStyle = f % 2 ? 'rgba(20,10,2,0.075)' : 'rgba(255,245,228,0.045)';
        ctx.lineWidth = 1.0 + rnd() * 1.4;
        ctx.beginPath(); ctx.moveTo(0, fy);
        var freq = 0.012 + rnd() * 0.015, amp = 1.2 + rnd() * 2.4, phs = rnd() * 6;
        for (var x = 16; x <= sz; x += 16) ctx.lineTo(x, fy + Math.sin(x * freq + phs) * amp);
        ctx.stroke();
        hCtx.strokeStyle = f % 2 ? 'rgba(105,105,105,0.45)' : 'rgba(175,175,175,0.35)';
        hCtx.lineWidth = 1.2; hCtx.beginPath(); hCtx.moveTo(0, fy);
        for (var x2 = 24; x2 <= sz; x2 += 24) hCtx.lineTo(x2, fy + Math.sin(x2 * freq + phs) * amp);
        hCtx.stroke();
      }
      ctx.fillStyle = darkHex; ctx.fillRect(0, y, sz, 2.2);
      hCtx.fillStyle = '#202020'; hCtx.fillRect(0, y, sz, 2.8);
      rCtx.fillStyle = '#F0F0F0'; rCtx.fillRect(0, y, sz, 3.0);
      var jx = Math.round(((i * 157 + 73) % (sz - 96)) + 48);
      ctx.fillStyle = darkHex; ctx.fillRect(jx, y, 2.0, ph);
      hCtx.fillStyle = '#242424'; hCtx.fillRect(jx, y, 2.4, ph);
    }
    return {
      map: colorTex(THREE, trackTex, cv, repX || 2.5, repY || 2.5, maxAniso),
      normalMap: heightToNormal(THREE, trackTex, hCv, 2.2, repX || 2.5, repY || 2.5, maxAniso),
      roughnessMap: linearTex(THREE, trackTex, rCv, repX || 2.5, repY || 2.5, maxAniso)
    };
  }

  function makeMarbleSet(THREE, trackTex, maxAniso) {
    var sz = 512, cv = makeCanvas(sz, sz), ctx = cv.getContext('2d');
    var rCv = makeCanvas(sz, sz), rCtx = rCv.getContext('2d');
    ctx.fillStyle = '#F5F1E9'; ctx.fillRect(0, 0, sz, sz);
    rCtx.fillStyle = '#383838'; rCtx.fillRect(0, 0, sz, sz);
    var rnd = seededRnd(519);
    for (var m = 0; m < 48; m++) {
      ctx.fillStyle = 'rgba(182,172,158,0.08)';
      ctx.beginPath(); ctx.ellipse(rnd() * sz, rnd() * sz, 28 + rnd() * 68, 12 + rnd() * 28, rnd() * 2, 0, Math.PI * 2); ctx.fill();
    }
    for (var v = 0; v < 15; v++) {
      ctx.strokeStyle = v % 3 === 0 ? 'rgba(154,132,102,0.34)' : 'rgba(128,122,116,0.22)';
      ctx.lineWidth = 0.9 + rnd() * 2.8;
      ctx.beginPath();
      var y = rnd() * sz; ctx.moveTo(0, y);
      for (var x = 20; x <= sz; x += 20) { y += (rnd() - 0.48) * 30; ctx.lineTo(x, y); }
      ctx.stroke();
      rCtx.strokeStyle = 'rgba(98,98,98,0.5)'; rCtx.lineWidth = 2.4; rCtx.stroke();
    }
    return {
      map: colorTex(THREE, trackTex, cv, 1.5, 1.5, maxAniso),
      roughnessMap: linearTex(THREE, trackTex, rCv, 1.5, 1.5, maxAniso)
    };
  }

  function makeGravelSet(THREE, trackTex, maxAniso) {
    var sz = 512, cv = makeCanvas(sz, sz), ctx = cv.getContext('2d');
    var hCv = makeCanvas(sz, sz), hCtx = hCv.getContext('2d');
    ctx.fillStyle = '#847F77'; ctx.fillRect(0, 0, sz, sz);
    hCtx.fillStyle = '#505050'; hCtx.fillRect(0, 0, sz, sz);
    var rnd = seededRnd(991);
    var stones = ['#A39E94', '#6E6A63', '#B8B3A8', '#5B5851', '#8E887E'];
    for (var i = 0; i < 3000; i++) {
      var x = rnd() * sz, y = rnd() * sz, r = 1.6 + rnd() * 3.8;
      ctx.fillStyle = stones[i % stones.length];
      ctx.beginPath(); ctx.ellipse(x, y, r, r * (0.65 + rnd() * 0.45), rnd() * 3, 0, Math.PI * 2); ctx.fill();
      var hv = Math.round(130 + rnd() * 120);
      hCtx.fillStyle = 'rgb(' + hv + ',' + hv + ',' + hv + ')';
      hCtx.beginPath(); hCtx.arc(x, y, r * 0.9, 0, Math.PI * 2); hCtx.fill();
    }
    return {
      map: colorTex(THREE, trackTex, cv, 4.0, 4.0, maxAniso),
      normalMap: heightToNormal(THREE, trackTex, hCv, 3.0, 4.0, 4.0, maxAniso)
    };
  }

  function makeFabricSet(THREE, trackTex, baseHex, weaveHex, rep, maxAniso) {
    var sz = 256, cv = makeCanvas(sz, sz), ctx = cv.getContext('2d');
    var hCv = makeCanvas(sz, sz), hCtx = hCv.getContext('2d');
    ctx.fillStyle = baseHex; ctx.fillRect(0, 0, sz, sz);
    hCtx.fillStyle = '#707070'; hCtx.fillRect(0, 0, sz, sz);
    var rnd = seededRnd(221);
    for (var y = 0; y < sz; y += 4) {
      for (var x = 0; x < sz; x += 4) {
        var alt = ((x + y) / 4) % 2 === 0;
        ctx.fillStyle = alt ? weaveHex : 'rgba(255,255,255,0.08)';
        ctx.fillRect(x, y, 3, 2);
        var hv = alt ? 175 + Math.round(rnd() * 35) : 90 + Math.round(rnd() * 25);
        hCtx.fillStyle = 'rgb(' + hv + ',' + hv + ',' + hv + ')';
        hCtx.fillRect(x, y, 3, 3);
      }
    }
    return {
      map: colorTex(THREE, trackTex, cv, rep || 6, rep || 6, maxAniso),
      normalMap: heightToNormal(THREE, trackTex, hCv, 1.8, rep || 6, rep || 6, maxAniso)
    };
  }

  function makeBarkSet(THREE, trackTex, maxAniso) {
    var sz = 256, cv = makeCanvas(sz, sz), ctx = cv.getContext('2d');
    var hCv = makeCanvas(sz, sz), hCtx = hCv.getContext('2d');
    ctx.fillStyle = '#4B3B2E'; ctx.fillRect(0, 0, sz, sz);
    hCtx.fillStyle = '#787878'; hCtx.fillRect(0, 0, sz, sz);
    var rnd = seededRnd(619);
    for (var i = 0; i < 220; i++) {
      var x = rnd() * sz, y = rnd() * sz, h = 24 + rnd() * 72, w = 2 + rnd() * 5;
      ctx.fillStyle = rnd() > 0.45 ? '#35281E' : '#665342';
      ctx.fillRect(x, y, w, h);
      hCtx.fillStyle = rnd() > 0.5 ? '#2A2A2A' : '#CFCFCF';
      hCtx.fillRect(x, y, w, h);
    }
    return {
      map: colorTex(THREE, trackTex, cv, 1.5, 3.0, maxAniso),
      normalMap: heightToNormal(THREE, trackTex, hCv, 3.0, 1.5, 3.0, maxAniso)
    };
  }

  function makeLawnSet(THREE, trackTex, maxAniso) {
    var sz = 512, cv = makeCanvas(sz, sz), ctx = cv.getContext('2d');
    var hCv = makeCanvas(sz, sz), hCtx = hCv.getContext('2d');
    ctx.fillStyle = '#415934'; ctx.fillRect(0, 0, sz, sz);
    hCtx.fillStyle = '#787878'; hCtx.fillRect(0, 0, sz, sz);
    var rnd = seededRnd(707);
    for (var m = 0; m < 260; m++) {
      ctx.fillStyle = rnd() > 0.5 ? 'rgba(98,124,66,0.14)' : 'rgba(28,44,22,0.14)';
      ctx.beginPath(); ctx.arc(rnd() * sz, rnd() * sz, 16 + rnd() * 58, 0, Math.PI * 2); ctx.fill();
    }
    for (var i = 0; i < 6500; i++) {
      var x = rnd() * sz, y = rnd() * sz;
      ctx.fillStyle = i % 3 === 0 ? 'rgba(122,148,80,0.32)' : (i % 3 === 1 ? 'rgba(44,68,34,0.34)' : 'rgba(76,102,52,0.28)');
      ctx.fillRect(x, y, 1.4, 4.5);
      var hv = Math.round(65 + rnd() * 145);
      hCtx.fillStyle = 'rgb(' + hv + ',' + hv + ',' + hv + ')';
      hCtx.fillRect(x, y, 1.5, 4);
    }
    return {
      map: colorTex(THREE, trackTex, cv, 24, 24, maxAniso),
      normalMap: heightToNormal(THREE, trackTex, hCv, 2.0, 24, 24, maxAniso)
    };
  }

  /* ---------- Editorial Art, Coding Studio & Gaming Display Canvas Textures ---------- */
  function makeScreenTex(THREE, trackTex, mode) {
    var cv = makeCanvas(512, 288), ctx = cv.getContext('2d');
    if (mode === 'gaming') {
      var gr = ctx.createLinearGradient(0, 0, 512, 288);
      gr.addColorStop(0, '#0B112B'); gr.addColorStop(0.5, '#24124A'); gr.addColorStop(1, '#082942');
      ctx.fillStyle = gr; ctx.fillRect(0, 0, 512, 288);
      ctx.strokeStyle = '#38F2FF'; ctx.lineWidth = 4;
      ctx.beginPath(); ctx.arc(256, 148, 66, 0.2, Math.PI * 1.65); ctx.stroke();
      ctx.strokeStyle = '#C76DFF'; ctx.lineWidth = 4;
      ctx.beginPath(); ctx.arc(256, 148, 42, Math.PI * 0.4, Math.PI * 1.9); ctx.stroke();
      ctx.fillStyle = '#38F2FF'; ctx.fillRect(36, 36, 108, 11);
      ctx.fillStyle = '#C76DFF'; ctx.fillRect(36, 58, 74, 9);
      ctx.fillStyle = '#5CFFD1'; ctx.fillRect(362, 226, 110, 14);
    } else if (mode === 'studio') {
      ctx.fillStyle = '#141A26'; ctx.fillRect(0, 0, 512, 288);
      ctx.fillStyle = '#1E2738'; ctx.fillRect(0, 0, 96, 288);
      ctx.fillStyle = '#6EA8FF'; ctx.fillRect(120, 36, 150, 16);
      ctx.fillStyle = '#F2B872'; ctx.fillRect(120, 74, 240, 11);
      ctx.fillStyle = '#7FD4A6'; ctx.fillRect(120, 106, 192, 11);
      ctx.fillStyle = '#9BC2FF'; ctx.fillRect(120, 138, 280, 11);
      ctx.fillStyle = 'rgba(255,255,255,0.12)'; ctx.fillRect(120, 200, 340, 48);
    } else if (mode === 'tv') {
      var gt = ctx.createLinearGradient(0, 0, 512, 288);
      gt.addColorStop(0, '#182436'); gt.addColorStop(0.55, '#5E4B3E'); gt.addColorStop(1, '#1A1C22');
      ctx.fillStyle = gt; ctx.fillRect(0, 0, 512, 288);
      ctx.fillStyle = 'rgba(244,218,176,0.22)';
      ctx.beginPath(); ctx.arc(330, 118, 72, 0, Math.PI * 2); ctx.fill();
    } else {
      ctx.fillStyle = '#EFE9DD'; ctx.fillRect(0, 0, 512, 288);
      ctx.fillStyle = mode === 'cool' ? '#3C464F' : '#B7724E';
      ctx.beginPath(); ctx.arc(185, 144, 82, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#252320'; ctx.fillRect(262, 68, 172, 152);
      ctx.fillStyle = '#DCC298'; ctx.fillRect(198, 122, 122, 68);
    }
    var t = trackTex(new THREE.CanvasTexture(cv));
    t.encoding = THREE.sRGBEncoding;
    return t;
  }

  /* ---------- Botanical Alpha-Cutout Textures (Trees, Palms, Shrubs, Flowers) ---------- */
  function drawLeaf(ctx, x, y, len, wid, ang, colDark, colLight) {
    ctx.save();
    ctx.translate(x, y); ctx.rotate(ang);
    var gr = ctx.createLinearGradient(0, 0, 0, -len);
    gr.addColorStop(0, colDark); gr.addColorStop(0.65, colLight); gr.addColorStop(1, '#6E964E');
    ctx.fillStyle = gr;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(-wid, -len * 0.28, -wid * 0.85, -len * 0.75, 0, -len);
    ctx.bezierCurveTo(wid * 0.85, -len * 0.75, wid, -len * 0.28, 0, 0);
    ctx.closePath(); ctx.fill();
    ctx.strokeStyle = 'rgba(190,218,136,0.45)';
    ctx.lineWidth = Math.max(1.0, wid * 0.08);
    ctx.beginPath(); ctx.moveTo(0, -2); ctx.lineTo(0, -len * 0.88); ctx.stroke();
    ctx.restore();
  }

  function makeBotanicalTextures(THREE, trackTex, maxAniso) {
    var cv1 = makeCanvas(512, 512), c1 = cv1.getContext('2d');
    c1.strokeStyle = '#3E3325'; c1.lineWidth = 7; c1.lineCap = 'round';
    c1.beginPath(); c1.moveTo(256, 495); c1.quadraticCurveTo(248, 280, 256, 68); c1.stroke();
    var rnd1 = seededRnd(401);
    [[-130, 340], [135, 320], [-145, 220], [140, 200], [-95, 125], [95, 115]].forEach(function (sb) {
      c1.strokeStyle = '#473A2A'; c1.lineWidth = 4;
      c1.beginPath(); c1.moveTo(256, sb[1] + 55); c1.quadraticCurveTo(256 + sb[0] * 0.5, sb[1] + 22, 256 + sb[0], sb[1]); c1.stroke();
    });
    for (var i = 0; i < 28; i++) {
      var side = i % 2 === 0 ? -1 : 1, t = i / 27;
      drawLeaf(c1, 256 + side * (22 + Math.sin(t * Math.PI) * 128) + (rnd1() - 0.5) * 34, 440 - t * 365 + (rnd1() - 0.5) * 28,
        78 + rnd1() * 52, 24 + rnd1() * 14, side * (0.45 + rnd1() * 0.72), i % 3 === 0 ? '#1F3F23' : '#29502C', i % 2 === 0 ? '#3E6B38' : '#4C7A42');
    }
    drawLeaf(c1, 256, 112, 92, 28, 0.04, '#244A28', '#4E7C44');
    var treeLeafTex = trackTex(new THREE.CanvasTexture(cv1));
    treeLeafTex.encoding = THREE.sRGBEncoding; if (maxAniso) treeLeafTex.anisotropy = maxAniso;

    var cv2 = makeCanvas(512, 512), c2 = cv2.getContext('2d');
    c2.strokeStyle = '#3C5B2D'; c2.lineWidth = 7; c2.lineCap = 'round';
    c2.beginPath(); c2.moveTo(256, 502); c2.quadraticCurveTo(252, 260, 256, 26); c2.stroke();
    for (var p = 0; p < 16; p++) {
      var pt = p / 15, py = 468 - pt * 412, fLen = (0.35 + Math.sin(pt * Math.PI * 0.88 + 0.15) * 0.85) * 195;
      drawLeaf(c2, 254, py, fLen, 13, -1.08 + pt * 0.46, '#234C27', '#4B7B3F');
      drawLeaf(c2, 258, py, fLen, 13,  1.08 - pt * 0.46, '#234C27', '#4B7B3F');
    }
    var palmTex = trackTex(new THREE.CanvasTexture(cv2));
    palmTex.encoding = THREE.sRGBEncoding; if (maxAniso) palmTex.anisotropy = maxAniso;

    var cv3 = makeCanvas(512, 512), c3 = cv3.getContext('2d');
    var rnd3 = seededRnd(812);
    for (var s = 0; s < 34; s++) {
      var sx = 256 + (rnd3() - 0.5) * 240, sy = 445 - rnd3() * 270;
      drawLeaf(c3, sx, sy, 82 + rnd3() * 64, 22 + rnd3() * 14, (sx - 256) / 180 + (rnd3() - 0.5) * 0.45, '#1D3E21', '#3F6E39');
    }
    for (var fl = 0; fl < 7; fl++) {
      var fx = 140 + rnd3() * 230, fy = 150 + rnd3() * 180;
      c3.fillStyle = fl % 2 === 0 ? '#FAF5E8' : '#E8B8A2';
      for (var pet = 0; pet < 5; pet++) {
        var pa = (pet / 5) * Math.PI * 2;
        c3.beginPath(); c3.ellipse(fx + Math.cos(pa) * 9, fy + Math.sin(pa) * 9, 8, 5, pa, 0, Math.PI * 2); c3.fill();
      }
      c3.fillStyle = '#E6B84C'; c3.beginPath(); c3.arc(fx, fy, 4.5, 0, Math.PI * 2); c3.fill();
    }
    var shrubTex = trackTex(new THREE.CanvasTexture(cv3));
    shrubTex.encoding = THREE.sRGBEncoding; if (maxAniso) shrubTex.anisotropy = maxAniso;

    var cv4 = makeCanvas(256, 256), c4 = cv4.getContext('2d');
    var rnd4 = seededRnd(909);
    for (var g = 0; g < 28; g++) {
      var gx = 24 + (g / 27) * 208 + (rnd4() - 0.5) * 14, gh = 92 + rnd4() * 138, lean = (rnd4() - 0.5) * 74;
      var gr = c4.createLinearGradient(gx, 256, gx + lean, 256 - gh);
      gr.addColorStop(0, '#365229'); gr.addColorStop(0.55, '#52743D'); gr.addColorStop(1, '#84A85B');
      c4.fillStyle = gr;
      c4.beginPath();
      c4.moveTo(gx - 5.5, 256);
      c4.quadraticCurveTo(gx + lean * 0.45 - 2, 256 - gh * 0.55, gx + lean, 256 - gh);
      c4.quadraticCurveTo(gx + lean * 0.45 + 3.5, 256 - gh * 0.55, gx + 5.5, 256);
      c4.closePath(); c4.fill();
    }
    var grassTex = trackTex(new THREE.CanvasTexture(cv4));
    grassTex.encoding = THREE.sRGBEncoding; if (maxAniso) grassTex.anisotropy = maxAniso;

    return { treeLeafTex: treeLeafTex, palmTex: palmTex, shrubTex: shrubTex, grassTex: grassTex };
  }

  function makeContactAOTexture(THREE, trackTex) {
    var cv = makeCanvas(256, 256), ctx = cv.getContext('2d');
    var gr = ctx.createRadialGradient(128, 128, 22, 128, 128, 124);
    gr.addColorStop(0.0, 'rgba(14, 12, 10, 0.58)');
    gr.addColorStop(0.45, 'rgba(14, 12, 10, 0.34)');
    gr.addColorStop(0.78, 'rgba(14, 12, 10, 0.10)');
    gr.addColorStop(1.0, 'rgba(14, 12, 10, 0.0)');
    ctx.fillStyle = gr; ctx.fillRect(0, 0, 256, 256);
    return trackTex(new THREE.CanvasTexture(cv));
  }

  function makeCloudSkyTexture(THREE, trackTex, topRGB, midRGB, horRGB, gndRGB, cloudAlpha, cloudRGB, stars) {
    var cv = makeCanvas(1024, 512), ctx = cv.getContext('2d');
    var gr = ctx.createLinearGradient(0, 0, 0, 512);
    gr.addColorStop(0.0,  'rgb(' + topRGB.join(',') + ')');
    gr.addColorStop(0.32, 'rgb(' + midRGB.join(',') + ')');
    gr.addColorStop(0.50, 'rgb(' + horRGB.join(',') + ')');
    gr.addColorStop(0.58, 'rgb(' + gndRGB.join(',') + ')');
    gr.addColorStop(1.0,  'rgb(' + gndRGB.join(',') + ')');
    ctx.fillStyle = gr; ctx.fillRect(0, 0, 1024, 512);

    var rnd = seededRnd(1234);
    if (stars > 0) {
      for (var st = 0; st < 280; st++) {
        ctx.fillStyle = 'rgba(240,246,255,' + (stars * (0.25 + rnd() * 0.75)).toFixed(2) + ')';
        ctx.beginPath(); ctx.arc(rnd() * 1024, rnd() * 220, 0.6 + rnd() * 1.3, 0, Math.PI * 2); ctx.fill();
      }
    }
    if (cloudAlpha > 0.02) {
      for (var c = 0; c < 44; c++) {
        var cx = rnd() * 1024, cy = 82 + rnd() * 138, cw = 55 + rnd() * 145, ch = 12 + rnd() * 24;
        var cg = ctx.createRadialGradient(cx, cy, ch * 0.2, cx, cy, cw);
        cg.addColorStop(0, 'rgba(' + cloudRGB.join(',') + ',' + (cloudAlpha * (0.45 + rnd() * 0.55)).toFixed(2) + ')');
        cg.addColorStop(1, 'rgba(' + cloudRGB.join(',') + ',0)');
        ctx.save(); ctx.translate(cx, cy); ctx.scale(1, ch / cw); ctx.translate(-cx, -cy);
        ctx.fillStyle = cg; ctx.beginPath(); ctx.arc(cx, cy, cw, 0, Math.PI * 2); ctx.fill();
        ctx.restore();
      }
    }
    var t = trackTex(new THREE.CanvasTexture(cv));
    t.encoding = THREE.sRGBEncoding;
    return t;
  }

  /* ---------- Custom GLSL Luxury Swimming Pool Shader (Fresnel + Voronoi Caustics) ---------- */
  function createPoolWaterMaterial(THREE, trackMat) {
    return trackMat(new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      uniforms: {
        uTime: { value: 0 },
        uDeepColor: { value: new THREE.Color(0x0D4D5E) },
        uShallowColor: { value: new THREE.Color(0x2B9DB2) },
        uSkyColor: { value: new THREE.Color(0xE8D2B4) },
        uSunDir: { value: new THREE.Vector3(0.6, 0.5, 0.5).normalize() },
        uSunColor: { value: new THREE.Color(0xFFE0A8) },
        uNightGlow: { value: 0.2 }
      },
      vertexShader: [
        'uniform float uTime;',
        'varying vec2 vUv;',
        'varying vec3 vWorldPos;',
        'void main() {',
        '  vUv = uv;',
        '  vec3 p = position;',
        '  float w1 = sin(p.x * 3.4 + uTime * 1.4) * cos(p.y * 3.0 - uTime * 1.1) * 0.008;',
        '  float w2 = sin((p.x + p.y) * 6.0 - uTime * 2.0) * 0.004;',
        '  p.z += w1 + w2;',
        '  vec4 wp = modelMatrix * vec4(p, 1.0);',
        '  vWorldPos = wp.xyz;',
        '  gl_Position = projectionMatrix * viewMatrix * wp;',
        '}'
      ].join('\n'),
      fragmentShader: [
        'uniform float uTime;',
        'uniform vec3 uDeepColor;',
        'uniform vec3 uShallowColor;',
        'uniform vec3 uSkyColor;',
        'uniform vec3 uSunDir;',
        'uniform vec3 uSunColor;',
        'uniform float uNightGlow;',
        'varying vec2 vUv;',
        'varying vec3 vWorldPos;',
        'float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }',
        'float voronoi(vec2 x) {',
        '  vec2 n = floor(x), f = fract(x);',
        '  float md = 8.0;',
        '  for(int j = -1; j <= 1; j++) {',
        '    for(int i = -1; i <= 1; i++) {',
        '      vec2 g = vec2(float(i), float(j));',
        '      vec2 o = vec2(hash(n + g), hash(n + g + 17.3));',
        '      o = 0.5 + 0.42 * sin(uTime * 0.95 + 6.2831 * o);',
        '      vec2 r = g + o - f;',
        '      md = min(md, dot(r, r));',
        '    }',
        '  }',
        '  return sqrt(md);',
        '}',
        'void main() {',
        '  vec2 p = vWorldPos.xz * 1.65;',
        '  float c1 = voronoi(p + vec2(uTime * 0.12, -uTime * 0.08));',
        '  float c2 = voronoi(p * 1.45 - vec2(uTime * 0.09, uTime * 0.14));',
        '  float ridge = smoothstep(0.26, 0.78, c1) * 0.65 + smoothstep(0.28, 0.80, c2) * 0.55;',
        '  float caustic = pow(clamp(ridge, 0.0, 1.0), 2.2);',
        '  float nx = cos(p.x * 5.0 + uTime * 1.7) * 0.055 + sin((p.x - p.y) * 8.2 - uTime * 2.1) * 0.03;',
        '  float nz = sin(p.y * 5.4 - uTime * 1.5) * 0.055 + cos((p.x + p.y) * 7.6 + uTime * 1.9) * 0.03;',
        '  vec3 N = normalize(vec3(nx, 1.0, nz));',
        '  vec3 V = normalize(cameraPosition - vWorldPos);',
        '  float fresnel = pow(1.0 - max(dot(N, V), 0.0), 3.0);',
        '  vec2 tg = abs(fract(vWorldPos.xz * 2.1) - 0.5);',
        '  float tileLine = smoothstep(0.465, 0.495, max(tg.x, tg.y));',
        '  float edgeDist = min(min(vUv.x, 1.0 - vUv.x), min(vUv.y, 1.0 - vUv.y));',
        '  float edgeShallow = smoothstep(0.16, 0.0, edgeDist);',
        '  vec3 waterBody = mix(uDeepColor, uShallowColor, 0.42 + edgeShallow * 0.48);',
        '  waterBody = mix(waterBody, waterBody * 0.86, tileLine * 0.36);',
        '  waterBody += (uSunColor * 0.42 + vec3(0.22, 0.80, 0.90) * uNightGlow * 0.50) * caustic;',
        '  waterBody += vec3(0.20, 0.78, 0.90) * uNightGlow * (0.24 + edgeShallow * 0.34);',
        '  vec3 H = normalize(uSunDir + V);',
        '  float spec = pow(max(dot(N, H), 0.0), 120.0) * 1.25;',
        '  vec3 col = mix(waterBody, uSkyColor, clamp(fresnel * 0.62, 0.08, 0.66)) + uSunColor * spec;',
        '  col += vec3(smoothstep(0.022, 0.0, edgeDist) * 0.24);',
        '  col = col / (col + vec3(0.18)) * 1.15;',
        '  gl_FragColor = vec4(col, clamp(0.68 + fresnel * 0.24, 0.68, 0.90));',
        '}'
      ].join('\n')
    }));
  }

  /* ---------- Sculpted Furniture, Architectural & Curved Gaming Geometry ---------- */
  function makeRoundedBoxGeo(THREE, trackGeo, w, h, d, r, segs) {
    var rad = Math.min(r || 0.04, w * 0.30, h * 0.35, d * 0.30);
    var bSize = rad * 0.82;
    var wIn = Math.max(0.015, w - bSize * 2);
    var dIn = Math.max(0.015, d - bSize * 2);
    var cornerR = Math.min(rad * 0.65, wIn * 0.35, dIn * 0.35);
    var shape = new THREE.Shape();
    var hw = wIn * 0.5 - cornerR, hd = dIn * 0.5 - cornerR;
    shape.moveTo(-hw, -dIn * 0.5);
    shape.lineTo(hw, -dIn * 0.5);
    shape.quadraticCurveTo(wIn * 0.5, -dIn * 0.5, wIn * 0.5, -hd);
    shape.lineTo(wIn * 0.5, hd);
    shape.quadraticCurveTo(wIn * 0.5, dIn * 0.5, hw, dIn * 0.5);
    shape.lineTo(-hw, dIn * 0.5);
    shape.quadraticCurveTo(-wIn * 0.5, dIn * 0.5, -wIn * 0.5, hd);
    shape.lineTo(-wIn * 0.5, -hd);
    shape.quadraticCurveTo(-wIn * 0.5, -dIn * 0.5, -hw, -dIn * 0.5);
    var geo = new THREE.ExtrudeGeometry(shape, {
      depth: Math.max(0.01, h - rad * 2),
      bevelEnabled: true, bevelSegments: segs || 3, steps: 1,
      bevelSize: bSize, bevelThickness: rad
    });
    geo.rotateX(-Math.PI / 2);
    geo.center();
    return trackGeo(geo);
  }

  function makePillowGeo(THREE, trackGeo, w, h, d) {
    var geo = new THREE.SphereGeometry(0.5, 18, 12);
    var pos = geo.attributes.position;
    for (var i = 0; i < pos.count; i++) {
      var x = pos.getX(i), y = pos.getY(i), z = pos.getZ(i);
      var ax = Math.abs(x) * 2, ay = Math.abs(y) * 2;
      var puff = 1.0 - 0.32 * (ax * ax * ay * ay);
      var edgePinch = 1.0 - 0.28 * Math.pow(Math.max(ax, ay), 3);
      pos.setXYZ(i, x * w * (1 + 0.14 * ay * ay), y * h * (1 + 0.14 * ax * ax), z * d * puff * edgePinch);
    }
    geo.computeVertexNormals();
    return trackGeo(geo);
  }

  function makeDuvetGeo(THREE, trackGeo, w, h, d) {
    var geo = new THREE.BoxGeometry(w, h, d, 16, 4, 14);
    var pos = geo.attributes.position;
    for (var i = 0; i < pos.count; i++) {
      var x = pos.getX(i), y = pos.getY(i), z = pos.getZ(i);
      var nx = x / (w * 0.5), nz = z / (d * 0.5);
      var dome = Math.max(0, 1 - (nx * nx * 0.38 + nz * nz * 0.32));
      var fold = Math.sin(x * 7.2 + z * 2.5) * 0.014 + Math.cos(z * 5.5) * 0.012;
      if (y > 0) y += dome * 0.055 + fold;
      var edge = Math.max(Math.abs(nx), Math.abs(nz));
      if (edge > 0.85 && y > 0) y -= (edge - 0.85) * 0.35;
      pos.setXYZ(i, x, y, z);
    }
    geo.computeVertexNormals();
    return trackGeo(geo);
  }

  function makeCurtainGeo(THREE, trackGeo, w, h, folds) {
    var geo = new THREE.PlaneGeometry(w, h, (folds || 5) * 6, 8);
    var pos = geo.attributes.position;
    for (var i = 0; i < pos.count; i++) {
      var x = pos.getX(i), y = pos.getY(i);
      pos.setZ(i, Math.sin((x / w) * Math.PI * 2 * (folds || 5)) * 0.065 + Math.sin((y / h) * Math.PI) * 0.018);
    }
    geo.computeVertexNormals();
    return trackGeo(geo);
  }

  function makeCurvedScreenGeo(THREE, trackGeo, w, h, curveDepth) {
    var geo = new THREE.PlaneGeometry(w, h, 16, 2);
    var pos = geo.attributes.position;
    for (var i = 0; i < pos.count; i++) {
      var x = pos.getX(i);
      var nx = x / (w * 0.5);
      pos.setZ(i, (nx * nx) * (curveDepth || 0.06));
    }
    geo.computeVertexNormals();
    return trackGeo(geo);
  }

  function makeLatheVessel(THREE, trackGeo, profilePts, segs) {
    var pts = profilePts.map(function (p) { return new THREE.Vector2(p[0], p[1]); });
    var geo = new THREE.LatheGeometry(pts, segs || 22);
    geo.computeVertexNormals();
    return trackGeo(geo);
  }

  window.GE_PBR = {
    seededRnd: seededRnd,
    makePlasterSet: makePlasterSet,
    makeConcreteSet: makeConcreteSet,
    makeStoneSet: makeStoneSet,
    makeWoodSet: makeWoodSet,
    makeMarbleSet: makeMarbleSet,
    makeGravelSet: makeGravelSet,
    makeFabricSet: makeFabricSet,
    makeBarkSet: makeBarkSet,
    makeLawnSet: makeLawnSet,
    makeScreenTex: makeScreenTex,
    makeBotanicalTextures: makeBotanicalTextures,
    makeContactAOTexture: makeContactAOTexture,
    makeCloudSkyTexture: makeCloudSkyTexture,
    createPoolWaterMaterial: createPoolWaterMaterial,
    makeRoundedBoxGeo: makeRoundedBoxGeo,
    makePillowGeo: makePillowGeo,
    makeDuvetGeo: makeDuvetGeo,
    makeCurtainGeo: makeCurtainGeo,
    makeCurvedScreenGeo: makeCurvedScreenGeo,
    makeLatheVessel: makeLatheVessel
  };
})();
