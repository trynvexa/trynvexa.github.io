/* ============================================================
   webgl-scenes.js — Three.js WebGL 3D Centerpieces + Canvas 2D Fallbacks
   1. Music 3D Audio-Reactive Frequency Ring & Energy Torus (p1)
   2. Skill 3D Gyroscopic Energy Constellation anchored over hand (p4)
   ============================================================ */
(function () {
  var Z = window.ZK3D;
  if (!Z) return;

  function makeGlowSprite(THREE) {
    var c = document.createElement('canvas');
    c.width = c.height = 64;
    var ctx = c.getContext('2d');
    var g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    g.addColorStop(0, 'rgba(255,255,255,1)');
    g.addColorStop(0.32, 'rgba(255,255,255,0.68)');
    g.addColorStop(0.7, 'rgba(255,255,255,0.16)');
    g.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 64, 64);
    var tex = new THREE.CanvasTexture(c);
    tex.needsUpdate = true;
    return tex;
  }

  /* Home backdrop runs purely via lightweight CSS ambient layers (no heavy WebGL wireframe) */

  /* ========================================================================
     SCENE 2: MUSIC 3D AUDIO-REACTIVE RING (WebGL + Canvas 2D Auto-Fallback)
     ======================================================================== */
  function mountMusicVisualizer(canvas, getAudioState) {
    if (!canvas || Z.isReduced) return function () {};
    var alive = true, raf = 0;

    // WebGL 3D path (throttled for cool, lightweight playback)
    if (Z.tier === 'webgl' && Z.hasThree()) {
      var THREE = window.THREE;
      var renderer;
      try {
        renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: false, powerPreference: 'low-power' });
      } catch (e) {
        renderer = null;
      }
      if (renderer) {
        var scene = new THREE.Scene();
        var camera = new THREE.PerspectiveCamera(45, 1, 0.1, 60);
        camera.position.set(0, 0, 8.6);

        var group = new THREE.Group();
        scene.add(group);

        var barCount = 48;
        var radius = 2.68;
        var bars = [];
        var barGeo = new THREE.BoxGeometry(0.075, 1, 0.11);
        barGeo.translate(0, 0.5, 0);
        var barMat = new THREE.MeshBasicMaterial({
          color: 0xe0654f,
          transparent: true,
          opacity: 0.82
        });

        for (var i = 0; i < barCount; i++) {
          var ang = (i / barCount) * Math.PI * 2;
          var m = new THREE.Mesh(barGeo, barMat);
          m.position.set(Math.cos(ang) * radius, Math.sin(ang) * radius, 0);
          m.rotation.z = ang - Math.PI / 2;
          group.add(m);
          bars.push(m);
        }

        // Outer glowing reactive halo torus
        var torusGeo = new THREE.TorusGeometry(radius + 0.12, 0.025, 8, 64);
        var torusMat = new THREE.MeshBasicMaterial({
          color: 0xf59a72,
          transparent: true,
          opacity: 0.6
        });
        var torus = new THREE.Mesh(torusGeo, torusMat);
        group.add(torus);

        // Second inner accent pulse ring
        var torus2Geo = new THREE.TorusGeometry(radius - 0.08, 0.014, 8, 56);
        var torus2Mat = new THREE.MeshBasicMaterial({
          color: 0xffffff,
          transparent: true,
          opacity: 0.35
        });
        var torus2 = new THREE.Mesh(torus2Geo, torus2Mat);
        group.add(torus2);

        var colA = new THREE.Color('#e0654f');
        var colB = new THREE.Color('#f59a72');
        var smoothBins = new Float32Array(barCount);

        function resizeGL() {
          if (!canvas.isConnected) return;
          var w = Math.min(520, Math.max(120, canvas.clientWidth));
          var h = Math.min(520, Math.max(120, canvas.clientHeight));
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
          renderer.setPixelRatio(1);
          renderer.setSize(w, h, false);
        }
        resizeGL();
        window.addEventListener('resize', resizeGL, { passive: true });

        var lastGL = 0;
        function loopGL(now) {
          if (!alive || !canvas.isConnected) return;
          raf = requestAnimationFrame(loopGL);
          if (document.hidden) return;
          var t = now * 0.001;
          var st = getAudioState ? getAudioState(t) : null;
          var playing = !!(st && st.playing);
          if (now - lastGL < (playing ? 32 : 66)) return;
          lastGL = now;
          var bass = st ? st.bass : 0;
          var bins = st ? st.bins : null;

          if (st && st.acc) colA.lerp(new THREE.Color(st.acc), 0.12);
          if (st && st.acc2) colB.lerp(new THREE.Color(st.acc2), 0.12);
          barMat.color.copy(colA);
          barMat.opacity = playing ? 0.88 : 0.32;
          torusMat.color.copy(colB);
          torusMat.opacity = playing ? (0.48 + bass * 0.45) : 0.22;

          for (var b = 0; b < barCount; b++) {
            var raw = bins && bins.length ? bins[b % bins.length] : 0;
            var targetH = playing ? (0.12 + raw * 1.18) : (0.08 + Math.sin(t * 2.2 + b * 0.35) * 0.03);
            smoothBins[b] += (targetH - smoothBins[b]) * 0.30;
            bars[b].scale.y = Math.max(0.05, smoothBins[b]);
            bars[b].scale.z = 1 + smoothBins[b] * 0.9;
          }

          group.rotation.z = t * (playing ? 0.22 : 0.05);
          group.rotation.x = Math.sin(t * 0.7) * 0.08;
          torus.scale.setScalar(1 + bass * 0.08);
          torus2.scale.setScalar(1 + bass * 0.14);

          renderer.render(scene, camera);
        }
        raf = requestAnimationFrame(loopGL);

        return function () {
          alive = false;
          if (raf) cancelAnimationFrame(raf);
          window.removeEventListener('resize', resizeGL);
          barGeo.dispose(); barMat.dispose();
          torusGeo.dispose(); torusMat.dispose();
          torus2Geo.dispose(); torus2Mat.dispose();
          renderer.dispose();
        };
      }
    }

    // Canvas 2D fallback (lite tier / WebGL unavailable)
    var ctx = canvas.getContext('2d');
    if (!ctx) return function () {};
    var smooth2d = new Float32Array(44);
    var last2d = 0;

    function loop2D(now) {
      if (!alive || !canvas.isConnected) return;
      raf = requestAnimationFrame(loop2D);
      if (document.hidden) return;
      var t = now * 0.001;
      var st = getAudioState ? getAudioState(t) : null;
      var playing = !!(st && st.playing);
      if (now - last2d < (playing ? 32 : 66)) return;
      last2d = now;
      var w = canvas.clientWidth, h = canvas.clientHeight;
      if (!w || !h) return;
      if (canvas.width !== Math.round(w) || canvas.height !== Math.round(h)) {
        canvas.width = Math.round(w);
        canvas.height = Math.round(h);
      }
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, w, h);

      var bass = st ? st.bass : 0;
      var bins = st ? st.bins : null;
      var cx = w * 0.5, cy = h * 0.5, baseR = Math.min(w, h) * 0.39;
      var acc = (st && st.acc) || '#e0654f';
      var acc2 = (st && st.acc2) || '#f59a72';

      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(t * (playing ? 0.25 : 0.05));
      ctx.strokeStyle = acc;
      ctx.lineCap = 'round';
      ctx.lineWidth = Math.max(2, baseR * 0.016);
      ctx.globalAlpha = playing ? 0.85 : 0.3;

      for (var i = 0; i < smooth2d.length; i++) {
        var ang = (i / smooth2d.length) * Math.PI * 2;
        var raw = bins && bins.length ? bins[i % bins.length] : 0;
        var tgt = playing ? (6 + raw * baseR * 0.26) : (4 + Math.sin(t * 2 + i * 0.4) * 2);
        smooth2d[i] += (tgt - smooth2d[i]) * 0.32;
        var x1 = Math.cos(ang) * baseR, y1 = Math.sin(ang) * baseR;
        var x2 = Math.cos(ang) * (baseR + smooth2d[i]), y2 = Math.sin(ang) * (baseR + smooth2d[i]);
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }
      ctx.beginPath();
      ctx.arc(0, 0, baseR * (1.01 + bass * 0.04), 0, Math.PI * 2);
      ctx.strokeStyle = acc2;
      ctx.lineWidth = 1.6;
      ctx.globalAlpha = playing ? 0.65 : 0.24;
      ctx.stroke();
      ctx.restore();
    }
    raf = requestAnimationFrame(loop2D);

    return function () {
      alive = false;
      if (raf) cancelAnimationFrame(raf);
    };
  }

  /* ========================================================================
     SCENE 3: SKILL 3D GYROSCOPIC ENERGY CONSTELLATION (p4, anchored over hand)
     ======================================================================== */
  function mountSkillWebgl(stageEl) {
    var noop = { setColor: function () {}, pulse: function () {}, setTilt: function () {}, destroy: function () {} };
    if (!stageEl || Z.isReduced || Z.tier !== 'webgl' || !Z.hasThree()) return noop;

    var THREE = window.THREE;
    var canvas = document.createElement('canvas');
    canvas.className = 'sk-webgl';
    canvas.setAttribute('aria-hidden', 'true');
    var orbitEl = stageEl.querySelector('.sk-orbit');
    if (orbitEl) stageEl.insertBefore(canvas, orbitEl);
    else stageEl.appendChild(canvas);

    var renderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: false, powerPreference: 'low-power' });
    } catch (e) {
      if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
      return noop;
    }

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(42, 1, 0.1, 40);
    camera.position.set(0, 0, 7.6);

    var root = new THREE.Group();
    scene.add(root);

    var r1Geo = new THREE.TorusGeometry(2.35, 0.022, 8, 64);
    var r1Mat = new THREE.MeshBasicMaterial({ color: 0x14181f, transparent: true, opacity: 0.34 });
    var r1 = new THREE.Mesh(r1Geo, r1Mat);
    root.add(r1);

    var r2Geo = new THREE.TorusGeometry(1.78, 0.018, 8, 56);
    var r2Mat = new THREE.MeshBasicMaterial({ color: 0xd9731f, transparent: true, opacity: 0.42 });
    var r2 = new THREE.Mesh(r2Geo, r2Mat);
    r2.rotation.x = 0.72;
    root.add(r2);

    var r3Geo = new THREE.IcosahedronGeometry(1.08, 1);
    var r3Mat = new THREE.MeshBasicMaterial({ color: 0x14181f, wireframe: true, transparent: true, opacity: 0.16 });
    var r3 = new THREE.Mesh(r3Geo, r3Mat);
    root.add(r3);

    var count = 48;
    var pts = new Float32Array(count * 3);
    for (var i = 0; i < count; i++) {
      var u = Math.random(), v = Math.random();
      var theta = u * Math.PI * 2;
      var phi = Math.acos(2 * v - 1);
      var rad = 1.5 + Math.random() * 1.15;
      pts[i * 3] = rad * Math.sin(phi) * Math.cos(theta);
      pts[i * 3 + 1] = rad * Math.sin(phi) * Math.sin(theta);
      pts[i * 3 + 2] = rad * Math.cos(phi);
    }
    var pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute('position', new THREE.BufferAttribute(pts, 3));
    var sprite = makeGlowSprite(THREE);
    var pMat = new THREE.PointsMaterial({
      color: 0xd9731f,
      size: 0.18,
      map: sprite,
      transparent: true,
      opacity: 0.62,
      depthWrite: false
    });
    var cloud = new THREE.Points(pGeo, pMat);
    root.add(cloud);

    var curCol = new THREE.Color('#14181f');
    var tgtCol = new THREE.Color('#14181f');
    var tx = 0, ty = 0, cx = 0, cy = 0, burst = 0;
    var alive = true, raf = 0, lastSk = 0;

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
    window.addEventListener('resize', syncPosition, { passive: true });
    requestAnimationFrame(function () { canvas.classList.add('is-live'); });

    var pgEl = document.getElementById('pg');
    function loop(now) {
      if (!alive || !canvas.isConnected) return;
      raf = requestAnimationFrame(loop);
      if (document.hidden || (pgEl && pgEl.classList.contains('sk-scrolled')) || now - lastSk < 32) return;
      lastSk = now;
      var t = now * 0.001;
      cx += (tx - cx) * 0.1;
      cy += (ty - cy) * 0.1;
      burst *= 0.90;
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
        try { if (hex) tgtCol.set(hex); } catch (e) {}
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
        window.removeEventListener('resize', syncPosition);
        r1Geo.dispose(); r1Mat.dispose();
        r2Geo.dispose(); r2Mat.dispose();
        r3Geo.dispose(); r3Mat.dispose();
        pGeo.dispose(); pMat.dispose(); sprite.dispose();
        renderer.dispose();
        if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
      }
    };
  }

  Z.mountMusicVisualizer = mountMusicVisualizer;
  Z.mountSkillWebgl = mountSkillWebgl;
})();
