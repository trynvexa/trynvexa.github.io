/* ============================================================
   webgl-scenes.js — Three.js WebGL 3D Centerpieces + Canvas 2D Fallbacks
   1. Music 3D Audio-Reactive Frequency Ring & Energy Torus (p1)
   2. Skill 3D Gyroscopic Energy Constellation anchored over hand (p4)
   ============================================================ */
(function () {
  var Z = window.ZK3D;
  if (!Z) return;

  function makeGlowSprite(THREE) {
    var c = document.createElement("canvas");
    c.width = c.height = 64;
    var ctx = c.getContext("2d");
    var g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    g.addColorStop(0, "rgba(255,255,255,1)");
    g.addColorStop(0.32, "rgba(255,255,255,0.68)");
    g.addColorStop(0.7, "rgba(255,255,255,0.16)");
    g.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 64, 64);
    var tex = new THREE.CanvasTexture(c);
    tex.needsUpdate = true;
    return tex;
  }

  /* Home backdrop runs purely via lightweight CSS ambient layers (no heavy WebGL wireframe) */

  /* ========================================================================
     SCENE 2: MUSIC ACOUSTIC RESONANCE — HiDPI Fluid Harmonic Waves & Ripples
     ======================================================================== */
  function parseHexRgb(hex, fallback) {
    if (!hex || typeof hex !== "string") return fallback;
    var h = hex.replace("#", "").trim();
    if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
    if (h.length !== 6) return fallback;
    var n = parseInt(h, 16);
    if (isNaN(n)) return fallback;
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  }

  function rgbaStr(rgb, a) {
    return (
      "rgba(" +
      Math.round(rgb[0]) +
      "," +
      Math.round(rgb[1]) +
      "," +
      Math.round(rgb[2]) +
      "," +
      a.toFixed(3) +
      ")"
    );
  }

  function traceSmoothClosedLoop(ctx, xs, ys, count) {
    var lastX = (xs[count - 1] + xs[0]) * 0.5;
    var lastY = (ys[count - 1] + ys[0]) * 0.5;
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    for (var i = 0; i < count; i++) {
      var ni = (i + 1) % count;
      var mx = (xs[i] + xs[ni]) * 0.5;
      var my = (ys[i] + ys[ni]) * 0.5;
      ctx.quadraticCurveTo(xs[i], ys[i], mx, my);
    }
    ctx.closePath();
  }

  function mountMusicVisualizer(canvas, getAudioState) {
    if (!canvas) return function () {};
    var ctx = canvas.getContext("2d");
    if (!ctx) return function () {};

    var alive = true,
      raf = 0;
    var SAMPLES = 56;
    var xs = new Float32Array(SAMPLES);
    var ys = new Float32Array(SAMPLES);
    var smoothLow = new Float32Array(SAMPLES);
    var smoothMid = new Float32Array(SAMPLES);
    var smoothHigh = new Float32Array(SAMPLES);

    var curA = [224, 101, 79];
    var curB = [245, 154, 114];
    var sBass = 0,
      sMid = 0,
      sTreble = 0,
      prevBass = 0;
    var ripples = [];
    var lastPulse = 0;
    var lastFrame = 0;
    var motes = [];
    for (var m = 0; m < 10; m++) {
      motes.push({
        ang: (m / 10) * Math.PI * 2,
        speed: (m % 2 === 0 ? 1 : -1) * (0.09 + (m % 4) * 0.035),
        band: m % 3,
        size: 1.5 + (m % 3) * 0.65,
        ph: m * 1.13,
      });
    }

    function syncSize() {
      var w = canvas.clientWidth;
      var h = canvas.clientHeight;
      if (!w || !h) return null;
      var dpr = Math.min(2, window.devicePixelRatio || 1);
      var pw = Math.round(w * dpr);
      var ph = Math.round(h * dpr);
      if (canvas.width !== pw || canvas.height !== ph) {
        canvas.width = pw;
        canvas.height = ph;
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      return { w: w, h: h };
    }

    function renderFrame(now, isStatic) {
      var sz = syncSize();
      if (!sz) return;
      var w = sz.w,
        h = sz.h;
      ctx.clearRect(0, 0, w, h);

      var t = isStatic ? 1.4 : now * 0.001;
      var st = getAudioState ? getAudioState(t) : null;
      var playing = !isStatic && !!(st && st.playing);
      var tgtA = parseHexRgb(st && st.acc, curA);
      var tgtB = parseHexRgb(st && st.acc2, curB);
      var colLerp = isStatic ? 1 : 0.09;
      for (var c = 0; c < 3; c++) {
        curA[c] += (tgtA[c] - curA[c]) * colLerp;
        curB[c] += (tgtB[c] - curB[c]) * colLerp;
      }

      var rawBass = playing && st ? st.bass : 0;
      var rawMid = playing && st ? st.mid : 0;
      var rawTreble = playing && st ? st.treble : 0;
      sBass += (rawBass - sBass) * 0.22;
      sMid += (rawMid - sMid) * 0.22;
      sTreble += (rawTreble - sTreble) * 0.24;

      var cx = w * 0.5;
      var cy = h * 0.5;
      var baseR = Math.min(w, h) * 0.36;
      var bins = st && st.bins ? st.bins : null;

      // Spawn expanding acoustic sound ripple on beat peaks
      if (playing && sBass > 0.38 && sBass - prevBass > 0.028 && now - lastPulse > 380) {
        lastPulse = now;
        if (ripples.length < 5) {
          ripples.push({ r: baseR * 0.96, maxR: baseR * 1.44, a: 0.42 });
        }
      }
      prevBass = sBass;

      // Update & draw acoustic sound ripples
      for (var rp = ripples.length - 1; rp >= 0; rp--) {
        var rip = ripples[rp];
        rip.r += (rip.maxR - rip.r) * 0.048 + 0.65;
        rip.a *= 0.952;
        if (rip.a < 0.014 || rip.r >= rip.maxR) {
          ripples.splice(rp, 1);
          continue;
        }
        ctx.beginPath();
        ctx.arc(cx, cy, rip.r, 0, Math.PI * 2);
        ctx.strokeStyle = rgbaStr(curA, rip.a);
        ctx.lineWidth = 1.15;
        ctx.stroke();
      }

      // Compute 3 smooth harmonic contours (low bass aura, mid silk wave, outer treble filament)
      var ampScale = playing ? 1 : 0.24;
      for (var i = 0; i < SAMPLES; i++) {
        var frac = i / SAMPLES;
        var ang = frac * Math.PI * 2;
        // Mirror bin sampling symmetrically so 0 and 2pi join with zero seam discontinuity
        var sym = frac < 0.5 ? frac * 2 : (1 - frac) * 2;
        var bIdx = Math.min(63, Math.floor(sym * 28));
        var binVal = playing && bins ? bins[bIdx] : 0;
        var binMid = playing && bins ? bins[Math.min(63, 12 + Math.floor(sym * 30))] : 0;
        var binHi = playing && bins ? bins[Math.min(63, 28 + Math.floor(sym * 34))] : 0;

        var lowTarget =
          (Math.sin(ang * 3 + t * 0.95) * 0.55 + Math.cos(ang * 5 - t * 0.7) * 0.45) *
            (playing ? 9 : 4.2) +
          binVal * baseR * 0.135 * ampScale +
          sBass * baseR * 0.055;
        var midTarget =
          (Math.sin(ang * 4 - t * 1.35 + 1.1) * 0.6 + Math.cos(ang * 6 + t * 0.9) * 0.4) *
            (playing ? 11 : 4.5) +
          binMid * baseR * 0.155 * ampScale +
          sMid * baseR * 0.045;
        var hiTarget =
          (Math.cos(ang * 7 + t * 1.7) * 0.55 + Math.sin(ang * 9 - t * 1.2) * 0.45) *
            (playing ? 7.5 : 3) +
          binHi * baseR * 0.12 * ampScale +
          sTreble * baseR * 0.035;

        var k = isStatic ? 1 : 0.22;
        smoothLow[i] += (lowTarget - smoothLow[i]) * k;
        smoothMid[i] += (midTarget - smoothMid[i]) * k;
        smoothHigh[i] += (hiTarget - smoothHigh[i]) * k;
      }

      // Layer 1: Soft translucent sunlit harmonic aura fill + outer bass contour
      for (var j = 0; j < SAMPLES; j++) {
        var a1 = (j / SAMPLES) * Math.PI * 2 + t * 0.04;
        var r1 = baseR * 0.99 + smoothLow[j];
        xs[j] = cx + Math.cos(a1) * r1;
        ys[j] = cy + Math.sin(a1) * r1;
      }
      traceSmoothClosedLoop(ctx, xs, ys, SAMPLES);
      var fillGrad = ctx.createRadialGradient(cx, cy, baseR * 0.38, cx, cy, baseR * 1.22);
      fillGrad.addColorStop(0, rgbaStr(curB, playing ? 0.04 : 0.02));
      fillGrad.addColorStop(0.72, rgbaStr(curB, playing ? 0.13 : 0.065));
      fillGrad.addColorStop(1, rgbaStr(curA, playing ? 0.06 : 0.02));
      ctx.fillStyle = fillGrad;
      ctx.fill();
      ctx.strokeStyle = rgbaStr(curA, playing ? 0.62 : 0.28);
      ctx.lineWidth = 1.75;
      ctx.stroke();

      // Layer 2: Mid-frequency silk melody ribbon
      for (var m1 = 0; m1 < SAMPLES; m1++) {
        var a2 = (m1 / SAMPLES) * Math.PI * 2 - t * 0.06;
        var r2 = baseR * 1.035 + smoothMid[m1];
        xs[m1] = cx + Math.cos(a2) * r2;
        ys[m1] = cy + Math.sin(a2) * r2;
      }
      traceSmoothClosedLoop(ctx, xs, ys, SAMPLES);
      ctx.strokeStyle = rgbaStr(curB, playing ? 0.76 : 0.32);
      ctx.lineWidth = 1.35;
      ctx.stroke();

      // Layer 3: Outer warm champagne / treble shimmer filament
      for (var h1 = 0; h1 < SAMPLES; h1++) {
        var a3 = (h1 / SAMPLES) * Math.PI * 2 + t * 0.09;
        var r3 = baseR * 1.08 + smoothHigh[h1];
        xs[h1] = cx + Math.cos(a3) * r3;
        ys[h1] = cy + Math.sin(a3) * r3;
      }
      traceSmoothClosedLoop(ctx, xs, ys, SAMPLES);
      ctx.strokeStyle = playing ? "rgba(255,250,242,0.72)" : "rgba(255,250,242,0.42)";
      ctx.lineWidth = 1.05;
      ctx.stroke();

      // Layer 4: Subtle luminous orbital harmonic motes
      for (var d = 0; d < motes.length; d++) {
        var mt = motes[d];
        var mAng = mt.ang + t * mt.speed * (playing ? 1.8 : 0.55);
        var norm = (((mAng % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2)) / (Math.PI * 2);
        var idx = Math.floor(norm * SAMPLES) % SAMPLES;
        var radOff =
          mt.band === 0
            ? baseR * 0.99 + smoothLow[idx]
            : mt.band === 1
              ? baseR * 1.035 + smoothMid[idx]
              : baseR * 1.08 + smoothHigh[idx];
        var mx = cx + Math.cos(mAng) * radOff;
        var my = cy + Math.sin(mAng) * radOff;
        var pulse = 0.55 + 0.45 * Math.sin(t * 2.6 + mt.ph);
        var alpha = (playing ? 0.78 : 0.34) * pulse;
        ctx.beginPath();
        ctx.arc(mx, my, mt.size + (playing ? sTreble * 1.3 : 0), 0, Math.PI * 2);
        ctx.fillStyle =
          mt.band === 2
            ? "rgba(255,252,246," + alpha.toFixed(3) + ")"
            : rgbaStr(mt.band === 0 ? curA : curB, alpha);
        ctx.fill();
      }
    }

    if (Z.isReduced) {
      renderFrame(0, true);
      var onResizeReduced = function () {
        renderFrame(0, true);
      };
      window.addEventListener("resize", onResizeReduced, { passive: true });
      return function () {
        alive = false;
        window.removeEventListener("resize", onResizeReduced);
      };
    }

    function loop(now) {
      if (!alive || !canvas.isConnected) return;
      raf = requestAnimationFrame(loop);
      if (document.hidden) return;
      var stCheck = getAudioState ? getAudioState(now * 0.001) : null;
      var isPlaying = !!(stCheck && stCheck.playing);
      if (now - lastFrame < (isPlaying ? 16 : 42)) return;
      lastFrame = now;
      renderFrame(now, false);
    }
    raf = requestAnimationFrame(loop);

    return function () {
      alive = false;
      if (raf) cancelAnimationFrame(raf);
    };
  }

  /* ========================================================================
     SCENE 3: SKILL 3D GYROSCOPIC ENERGY CONSTELLATION (p4, anchored over hand)
     ======================================================================== */
  function mountSkillWebgl(stageEl) {
    var noop = {
      setColor: function () {},
      pulse: function () {},
      setTilt: function () {},
      destroy: function () {},
    };
    if (!stageEl || Z.isReduced || Z.tier !== "webgl" || !Z.hasThree()) return noop;

    var THREE = window.THREE;
    var canvas = document.createElement("canvas");
    canvas.className = "sk-webgl";
    canvas.setAttribute("aria-hidden", "true");
    var orbitEl = stageEl.querySelector(".sk-orbit");
    if (orbitEl) stageEl.insertBefore(canvas, orbitEl);
    else stageEl.appendChild(canvas);

    var renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: false,
        powerPreference: "low-power",
      });
    } catch (e) {
      if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
      return noop;
    }

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(42, 1, 0.1, 40);
    camera.position.set(0, 0, 7.6);

    var root = new THREE.Group();
    scene.add(root);

    var r1Geo = new THREE.TorusGeometry(2.38, 0.016, 8, 72);
    var r1Mat = new THREE.MeshBasicMaterial({ color: 0x14181f, transparent: true, opacity: 0.24 });
    var r1 = new THREE.Mesh(r1Geo, r1Mat);
    root.add(r1);

    var r2Geo = new THREE.TorusGeometry(1.82, 0.014, 8, 64);
    var r2Mat = new THREE.MeshBasicMaterial({ color: 0xd9731f, transparent: true, opacity: 0.34 });
    var r2 = new THREE.Mesh(r2Geo, r2Mat);
    r2.rotation.x = 0.78;
    root.add(r2);

    var r3Geo = new THREE.TorusGeometry(1.24, 0.012, 8, 56);
    var r3Mat = new THREE.MeshBasicMaterial({ color: 0x14181f, transparent: true, opacity: 0.18 });
    var r3 = new THREE.Mesh(r3Geo, r3Mat);
    r3.rotation.y = 1.05;
    r3.rotation.x = -0.52;
    root.add(r3);

    var isMobile = window.innerWidth <= 820;
    var count = isMobile ? 28 : 40;
    var pts = new Float32Array(count * 3);
    for (var i = 0; i < count; i++) {
      var u = Math.random(),
        v = Math.random();
      var theta = u * Math.PI * 2;
      var phi = Math.acos(2 * v - 1);
      var rad = 1.48 + Math.random() * 1.1;
      pts[i * 3] = rad * Math.sin(phi) * Math.cos(theta);
      pts[i * 3 + 1] = rad * Math.sin(phi) * Math.sin(theta);
      pts[i * 3 + 2] = rad * Math.cos(phi);
    }
    var pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute("position", new THREE.BufferAttribute(pts, 3));
    var sprite = makeGlowSprite(THREE);
    var pMat = new THREE.PointsMaterial({
      color: 0xd9731f,
      size: isMobile ? 0.13 : 0.15,
      map: sprite,
      transparent: true,
      opacity: 0.5,
      depthWrite: false,
    });
    var cloud = new THREE.Points(pGeo, pMat);
    root.add(cloud);

    var curCol = new THREE.Color("#14181f");
    var tgtCol = new THREE.Color("#14181f");
    var tx = 0,
      ty = 0,
      cx = 0,
      cy = 0,
      burst = 0;
    var alive = true,
      raf = 0,
      lastSk = 0;

    function syncPosition() {
      if (!orbitEl || !canvas.isConnected) return;
      var cs = getComputedStyle(orbitEl);
      canvas.style.left = cs.left;
      canvas.style.top = cs.top;
      var w = Math.min(480, Math.max(160, canvas.clientWidth));
      var h = Math.min(480, Math.max(160, canvas.clientHeight));
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setPixelRatio(1);
      renderer.setSize(w, h, false);
    }
    syncPosition();
    window.addEventListener("resize", syncPosition, { passive: true });
    requestAnimationFrame(function () {
      canvas.classList.add("is-live");
    });

    var pgEl = document.getElementById("pg");
    function loop(now) {
      if (!alive || !canvas.isConnected) return;
      raf = requestAnimationFrame(loop);
      if (document.hidden || (pgEl && pgEl.classList.contains("sk-scrolled")) || now - lastSk < 32)
        return;
      lastSk = now;
      var t = now * 0.001;
      cx += (tx - cx) * 0.1;
      cy += (ty - cy) * 0.1;
      burst *= 0.9;
      curCol.lerp(tgtCol, 0.1);
      r1Mat.color.copy(curCol);
      r2Mat.color.copy(curCol);
      r3Mat.color.copy(curCol);
      pMat.color.copy(curCol);

      r1.rotation.x = 0.55 + cy * 0.65 + t * 0.25;
      r1.rotation.y = cx * 0.75 + t * 0.32;
      r2.rotation.x = -0.68 - cy * 0.55 - t * 0.36;
      r2.rotation.z = t * 0.28 + cx * 0.45;
      r3.rotation.y = t * 0.42 + burst * 1.4;
      r3.rotation.x = t * 0.26;
      cloud.rotation.y = -t * 0.18 + cx * 0.6;
      cloud.rotation.x = cy * 0.5;
      root.scale.setScalar(1 + burst * 0.2);

      renderer.render(scene, camera);
    }
    raf = requestAnimationFrame(loop);

    return {
      setColor: function (hex) {
        try {
          if (hex) tgtCol.set(hex);
        } catch (e) {}
      },
      pulse: function (strength) {
        burst = Math.min(1.5, burst + (strength || 0.75));
      },
      setTilt: function (nx, ny) {
        tx = nx || 0;
        ty = ny || 0;
      },
      destroy: function () {
        alive = false;
        if (raf) cancelAnimationFrame(raf);
        window.removeEventListener("resize", syncPosition);
        r1Geo.dispose();
        r1Mat.dispose();
        r2Geo.dispose();
        r2Mat.dispose();
        r3Geo.dispose();
        r3Mat.dispose();
        pGeo.dispose();
        pMat.dispose();
        sprite.dispose();
        renderer.dispose();
        if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
      },
    };
  }

  Z.mountMusicVisualizer = mountMusicVisualizer;
  Z.mountSkillWebgl = mountSkillWebgl;
})();
