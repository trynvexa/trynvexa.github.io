/* ============================================================
   webgl-scenes.js — Three.js WebGL 3D Centerpieces + Canvas 2D Fallbacks
   1. Home 3D WebGL Backdrop (#bgWebgl over #bgCinema blurred photos)
   2. Music 3D Audio-Reactive Frequency Ring & Energy Torus (p1)
   3. Skill 3D Gyroscopic Energy Constellation anchored over hand (p4)
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

  /* ========================================================================
     SCENE 1: HOME 3D WEBGL LIQUID SILK & BOKEH FIELD (#bgWebgl)
     Renders transparently over #bgCinema blurred active-card photo crossfade
     ======================================================================== */
  function initHomeWebGL(THREE) {
    var canvas = document.getElementById('bgWebgl');
    if (!canvas || !THREE || Z.tier !== 'webgl') return;

    var renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance'
      });
    } catch (e) {
      return;
    }

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(48, window.innerWidth / Math.max(1, window.innerHeight), 0.1, 100);
    camera.position.set(0, 0.4, 10.5);

    var dpr = Math.min(1.25, window.devicePixelRatio || 1);
    renderer.setPixelRatio(dpr);
    renderer.setSize(window.innerWidth, window.innerHeight, false);
    renderer.setClearColor(0x000000, 0);

    // Sculpted 3D Liquid-Silk Ribbon 1 (primary accent mesh + contour lines)
    var ribGeo1 = new THREE.PlaneGeometry(24, 7.2, 42, 12);
    var ribBase1 = ribGeo1.attributes.position.array.slice();
    var ribMat1 = new THREE.MeshBasicMaterial({
      color: 0xd86248,
      transparent: true,
      opacity: 0.17,
      side: THREE.DoubleSide,
      depthWrite: false
    });
    var ribMesh1 = new THREE.Mesh(ribGeo1, ribMat1);
    ribMesh1.position.set(0, -1.0, -1.6);
    ribMesh1.rotation.x = -0.34;
    scene.add(ribMesh1);

    var ribWireMat1 = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
      transparent: true,
      opacity: 0.13,
      depthWrite: false
    });
    var ribWire1 = new THREE.Mesh(ribGeo1, ribWireMat1);
    ribMesh1.add(ribWire1);

    // Sculpted 3D Liquid-Silk Ribbon 2 (secondary depth ribbon)
    var ribGeo2 = new THREE.PlaneGeometry(26, 6.2, 36, 10);
    var ribBase2 = ribGeo2.attributes.position.array.slice();
    var ribMat2 = new THREE.MeshBasicMaterial({
      color: 0xa59478,
      transparent: true,
      opacity: 0.12,
      side: THREE.DoubleSide,
      depthWrite: false
    });
    var ribMesh2 = new THREE.Mesh(ribGeo2, ribMat2);
    ribMesh2.position.set(0, 1.5, -3.4);
    ribMesh2.rotation.x = 0.28;
    scene.add(ribMesh2);

    // Floating 3D Soft Bokeh Glass Dust
    var pCount = 105;
    var pPos = new Float32Array(pCount * 3);
    var pMeta = [];
    for (var i = 0; i < pCount; i++) {
      pPos[i * 3] = (Math.random() - 0.5) * 20;
      pPos[i * 3 + 1] = (Math.random() - 0.5) * 12;
      pPos[i * 3 + 2] = (Math.random() - 0.5) * 8 - 1.5;
      pMeta.push({
        spX: (Math.random() - 0.5) * 0.004,
        spY: 0.002 + Math.random() * 0.005,
        ph: Math.random() * Math.PI * 2
      });
    }
    var pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    var spriteTex = makeGlowSprite(THREE);
    var pMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.28,
      map: spriteTex,
      transparent: true,
      opacity: 0.42,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });
    var points = new THREE.Points(pGeo, pMat);
    scene.add(points);

    // Subtle floating 3D geometric halo ring in far depth
    var haloGeo = new THREE.TorusGeometry(4.4, 0.018, 12, 96);
    var haloMat = new THREE.MeshBasicMaterial({
      color: 0xe0463a,
      transparent: true,
      opacity: 0.22,
      depthWrite: false
    });
    var haloMesh = new THREE.Mesh(haloGeo, haloMat);
    haloMesh.position.set(0, -0.35, -4.2);
    scene.add(haloMesh);

    var curA = new THREE.Color(216 / 255, 98 / 255, 72 / 255);
    var curB = new THREE.Color(165 / 255, 148 / 255, 120 / 255);
    var tgtA = curA.clone();
    var tgtB = curB.clone();

    var mx = 0, my = 0, smx = 0, smy = 0;
    var wheelPos = 2, wheelLean = 0, sWheelPos = 2, sWheelLean = 0;
    var boost = 0;
    var pgEl = document.getElementById('pg');

    function syncThemeColors() {
      var dark = Z.isDark();
      ribMat1.opacity = dark ? 0.22 : 0.14;
      ribMat2.opacity = dark ? 0.15 : 0.10;
      ribWireMat1.opacity = dark ? 0.15 : 0.11;
      ribWireMat1.color.setHex(dark ? 0xffd7cc : 0xffffff);
      pMat.opacity = dark ? 0.52 : 0.36;
      pMat.blending = dark ? THREE.AdditiveBlending : THREE.NormalBlending;
      pMat.needsUpdate = true;
      haloMat.opacity = dark ? 0.26 : 0.15;
    }
    syncThemeColors();
    window.addEventListener('zk-theme', syncThemeColors);

    window.__zkWebglBgSync = {
      setCard: function (idx, pal) {
        if (!pal) return;
        tgtA.setRGB(pal.a[0] / 255, pal.a[1] / 255, pal.a[2] / 255);
        tgtB.setRGB(pal.b[0] / 255, pal.b[1] / 255, pal.b[2] / 255);
        boost = Math.min(1.4, boost + 0.55);
      },
      setWheel: function (pos, lean) {
        wheelPos = pos;
        wheelLean = lean || 0;
      },
      pulse: function () {
        boost = Math.min(1.6, boost + 0.85);
      }
    };

    window.addEventListener('pointermove', function (e) {
      mx = (e.clientX / Math.max(1, window.innerWidth)) * 2 - 1;
      my = (e.clientY / Math.max(1, window.innerHeight)) * 2 - 1;
    }, { passive: true });

    window.addEventListener('resize', function () {
      var w = window.innerWidth, h = Math.max(1, window.innerHeight);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setPixelRatio(Math.min(1.5, window.devicePixelRatio || 1));
      renderer.setSize(w, h, false);
    }, { passive: true });

    // Activate WebGL flag so Canvas 2D #bgField yields cleanly
    window.__zkWebglBgActive = true;
    document.documentElement.classList.add('zk-webgl-bg');
    requestAnimationFrame(function () { canvas.classList.add('is-live'); });

    var lastFrame = 0;
    function animate(now) {
      requestAnimationFrame(animate);
      var hidden = document.hidden ||
                   document.documentElement.classList.contains('intro-on') ||
                   document.body.classList.contains('covered') ||
                   (pgEl && pgEl.classList.contains('open'));
      if (hidden) return;
      if (now - lastFrame < 24) return;
      lastFrame = now;

      var t = now * 0.001;
      smx += (mx - smx) * 0.06;
      smy += (my - smy) * 0.06;
      sWheelPos += (wheelPos - sWheelPos) * 0.08;
      sWheelLean += (wheelLean - sWheelLean) * 0.12;
      boost *= 0.94;

      curA.lerp(tgtA, 0.05);
      curB.lerp(tgtB, 0.05);
      ribMat1.color.copy(curA);
      ribMat2.color.copy(curB);
      haloMat.color.copy(curA);
      pMat.color.copy(Z.isDark() ? curA : curB).lerp(new THREE.Color(0xffffff), 0.55);

      // Displace 3D liquid-silk vertices
      var pos1 = ribGeo1.attributes.position.array;
      var phase1 = t * 0.65 + sWheelPos * 0.5;
      var amp = 0.72 + boost * 0.45;
      for (var i = 0; i < pos1.length; i += 3) {
        var bx = ribBase1[i], by = ribBase1[i + 1];
        pos1[i + 2] =
          Math.sin(bx * 0.34 + phase1) * amp +
          Math.cos(by * 0.55 - phase1 * 0.7) * 0.42 +
          Math.sin((bx + by) * 0.24 + t) * 0.25;
      }
      ribGeo1.attributes.position.needsUpdate = true;

      var pos2 = ribGeo2.attributes.position.array;
      var phase2 = t * 0.48 - sWheelPos * 0.35;
      for (var j = 0; j < pos2.length; j += 3) {
        var bx2 = ribBase2[j], by2 = ribBase2[j + 1];
        pos2[j + 2] =
          Math.cos(bx2 * 0.28 + phase2) * (0.6 + boost * 0.3) +
          Math.sin(by2 * 0.45 + phase2 * 0.8) * 0.36;
      }
      ribGeo2.attributes.position.needsUpdate = true;

      // Drift bokeh particles
      var pa = pGeo.attributes.position.array;
      for (var k = 0; k < pCount; k++) {
        var pm = pMeta[k];
        pa[k * 3] += pm.spX - sWheelLean * 0.008;
        pa[k * 3 + 1] += pm.spY + Math.sin(t + pm.ph) * 0.002;
        if (pa[k * 3 + 1] > 6.5) { pa[k * 3 + 1] = -6.5; pa[k * 3] = (Math.random() - 0.5) * 20; }
        if (pa[k * 3] > 10.5) pa[k * 3] = -10.5;
        if (pa[k * 3] < -10.5) pa[k * 3] = 10.5;
      }
      pGeo.attributes.position.needsUpdate = true;

      // Camera & ribbon spatial parallax
      camera.position.x = smx * 0.85;
      camera.position.y = 0.4 - smy * 0.52;
      camera.lookAt(0, 0, -2);

      ribMesh1.rotation.z = sWheelLean * 0.035 + smx * 0.04;
      ribMesh2.rotation.z = -sWheelLean * 0.025 - smx * 0.03;
      haloMesh.rotation.x = 0.95 + smy * 0.22 + Math.sin(t * 0.4) * 0.08;
      haloMesh.rotation.y = t * 0.16 + sWheelPos * 0.3;
      haloMesh.scale.setScalar(1 + boost * 0.08);

      renderer.render(scene, camera);
    }
    requestAnimationFrame(animate);
  }

  Z.whenThree(initHomeWebGL);

  /* ========================================================================
     SCENE 2: MUSIC 3D AUDIO-REACTIVE RING (WebGL + Canvas 2D Auto-Fallback)
     ======================================================================== */
  function mountMusicVisualizer(canvas, getAudioState) {
    if (!canvas || Z.isReduced) return function () {};
    var alive = true, raf = 0;

    // WebGL 3D path
    if (Z.tier === 'webgl' && Z.hasThree()) {
      var THREE = window.THREE;
      var renderer;
      try {
        renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true, powerPreference: 'high-performance' });
      } catch (e) {
        renderer = null;
      }
      if (renderer) {
        var scene = new THREE.Scene();
        var camera = new THREE.PerspectiveCamera(45, 1, 0.1, 60);
        camera.position.set(0, 0, 8.6);

        var group = new THREE.Group();
        scene.add(group);

        var barCount = 64;
        var radius = 2.68;
        var bars = [];
        var barGeo = new THREE.BoxGeometry(0.068, 1, 0.11);
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
        var torusGeo = new THREE.TorusGeometry(radius + 0.12, 0.025, 12, 96);
        var torusMat = new THREE.MeshBasicMaterial({
          color: 0xf59a72,
          transparent: true,
          opacity: 0.6
        });
        var torus = new THREE.Mesh(torusGeo, torusMat);
        group.add(torus);

        // Second inner accent pulse ring
        var torus2Geo = new THREE.TorusGeometry(radius - 0.08, 0.014, 10, 80);
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
          var w = Math.min(640, Math.max(120, canvas.clientWidth));
          var h = Math.min(640, Math.max(120, canvas.clientHeight));
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
          renderer.setPixelRatio(Math.min(1.25, window.devicePixelRatio || 1));
          renderer.setSize(w, h, false);
        }
        resizeGL();
        window.addEventListener('resize', resizeGL, { passive: true });

        function loopGL(now) {
          if (!alive || !canvas.isConnected) return;
          raf = requestAnimationFrame(loopGL);
          if (document.hidden) return;
          var t = now * 0.001;
          var st = getAudioState ? getAudioState(t) : null;
          var playing = !!(st && st.playing);
          var bass = st ? st.bass : 0;
          var bins = st ? st.bins : null;

          if (st && st.acc) colA.lerp(new THREE.Color(st.acc), 0.08);
          if (st && st.acc2) colB.lerp(new THREE.Color(st.acc2), 0.08);
          barMat.color.copy(colA);
          barMat.opacity = playing ? 0.88 : 0.32;
          torusMat.color.copy(colB);
          torusMat.opacity = playing ? (0.48 + bass * 0.45) : 0.22;

          for (var b = 0; b < barCount; b++) {
            var raw = bins && bins.length ? bins[b % bins.length] : 0;
            var targetH = playing ? (0.12 + raw * 1.18) : (0.08 + Math.sin(t * 2.2 + b * 0.35) * 0.03);
            smoothBins[b] += (targetH - smoothBins[b]) * 0.26;
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
    var smooth2d = new Float32Array(56);

    function loop2D(now) {
      if (!alive || !canvas.isConnected) return;
      raf = requestAnimationFrame(loop2D);
      if (document.hidden) return;
      var w = canvas.clientWidth, h = canvas.clientHeight;
      if (!w || !h) return;
      var d = Math.min(1.5, window.devicePixelRatio || 1);
      if (canvas.width !== Math.round(w * d) || canvas.height !== Math.round(h * d)) {
        canvas.width = Math.round(w * d);
        canvas.height = Math.round(h * d);
      }
      ctx.setTransform(d, 0, 0, d, 0, 0);
      ctx.clearRect(0, 0, w, h);

      var t = now * 0.001;
      var st = getAudioState ? getAudioState(t) : null;
      var playing = !!(st && st.playing);
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
        smooth2d[i] += (tgt - smooth2d[i]) * 0.28;
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
      renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true, powerPreference: 'high-performance' });
    } catch (e) {
      if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
      return noop;
    }

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(42, 1, 0.1, 40);
    camera.position.set(0, 0, 7.6);

    var root = new THREE.Group();
    scene.add(root);

    // Three nested 3D gyroscopic rings
    var r1Geo = new THREE.TorusGeometry(2.35, 0.022, 12, 96);
    var r1Mat = new THREE.MeshBasicMaterial({ color: 0x14181f, transparent: true, opacity: 0.34 });
    var r1 = new THREE.Mesh(r1Geo, r1Mat);
    root.add(r1);

    var r2Geo = new THREE.TorusGeometry(1.78, 0.018, 12, 80);
    var r2Mat = new THREE.MeshBasicMaterial({ color: 0xd9731f, transparent: true, opacity: 0.42 });
    var r2 = new THREE.Mesh(r2Geo, r2Mat);
    r2.rotation.x = 0.72;
    root.add(r2);

    var r3Geo = new THREE.IcosahedronGeometry(1.08, 1);
    var r3Mat = new THREE.MeshBasicMaterial({ color: 0x14181f, wireframe: true, transparent: true, opacity: 0.16 });
    var r3 = new THREE.Mesh(r3Geo, r3Mat);
    root.add(r3);

    // Orbiting spherical constellation sparks
    var count = 72;
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
    var alive = true, raf = 0;

    function syncPosition() {
      if (!orbitEl || !canvas.isConnected) return;
      var cs = getComputedStyle(orbitEl);
      canvas.style.left = cs.left;
      canvas.style.top = cs.top;
      var w = Math.min(560, Math.max(160, canvas.clientWidth));
      var h = Math.min(560, Math.max(160, canvas.clientHeight));
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setPixelRatio(Math.min(1.25, window.devicePixelRatio || 1));
      renderer.setSize(w, h, false);
    }
    syncPosition();
    window.addEventListener('resize', syncPosition, { passive: true });
    requestAnimationFrame(function () { canvas.classList.add('is-live'); });

    var pgEl = document.getElementById('pg');
    function loop(now) {
      if (!alive || !canvas.isConnected) return;
      raf = requestAnimationFrame(loop);
      if (document.hidden || (pgEl && pgEl.classList.contains('sk-scrolled'))) return;
      var t = now * 0.001;
      cx += (tx - cx) * 0.08;
      cy += (ty - cy) * 0.08;
      burst *= 0.92;
      curCol.lerp(tgtCol, 0.07);
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

  /* ========================================================================
     SCENE 4: ME (p2) — 3D INTERACTIVE KINETIC TORUS-KNOT & ORBITAL SCULPTURE
     ======================================================================== */
  function mountMeWebgl(hostEl) {
    var noop = { setInput: function () {}, setScroll: function () {}, pulse: function () {}, destroy: function () {} };
    if (!hostEl || Z.isReduced || Z.tier !== 'webgl' || !Z.hasThree()) return noop;

    var THREE = window.THREE;
    var canvas = document.createElement('canvas');
    canvas.className = 'me2-webgl-cv';
    canvas.setAttribute('aria-hidden', 'true');
    hostEl.appendChild(canvas);

    var renderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true, powerPreference: 'high-performance' });
    } catch (e) {
      if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
      return noop;
    }

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(44, 1, 0.1, 60);
    camera.position.set(0, 0, 8.2);

    var group = new THREE.Group();
    scene.add(group);

    // Sculptural wireframe TorusKnot centerpiece
    var knotGeo = new THREE.TorusKnotGeometry(1.72, 0.42, 96, 14, 2, 3);
    var knotMat = new THREE.MeshBasicMaterial({
      color: 0xe0463a,
      wireframe: true,
      transparent: true,
      opacity: 0.24
    });
    var knot = new THREE.Mesh(knotGeo, knotMat);
    group.add(knot);

    // Dual counter-rotating precision orbital rings
    var ring1Geo = new THREE.TorusGeometry(2.85, 0.022, 12, 96);
    var ring1Mat = new THREE.MeshBasicMaterial({ color: 0xffd000, transparent: true, opacity: 0.52 });
    var ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = 1.05;
    ring1.rotation.y = 0.4;
    group.add(ring1);

    var ring2Geo = new THREE.TorusGeometry(3.28, 0.016, 12, 96);
    var ring2Mat = new THREE.MeshBasicMaterial({ color: 0xf4efe6, transparent: true, opacity: 0.30 });
    var ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.x = -0.82;
    ring2.rotation.z = 0.5;
    group.add(ring2);

    // Orbiting luminous crimson-gold constellation dust
    var count = 90;
    var pts = new Float32Array(count * 3);
    for (var i = 0; i < count; i++) {
      var u = Math.random(), v = Math.random();
      var th = u * Math.PI * 2;
      var ph = Math.acos(2 * v - 1);
      var r = 2.0 + Math.random() * 1.9;
      pts[i * 3] = r * Math.sin(ph) * Math.cos(th);
      pts[i * 3 + 1] = r * Math.sin(ph) * Math.sin(th);
      pts[i * 3 + 2] = r * Math.cos(ph);
    }
    var pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute('position', new THREE.BufferAttribute(pts, 3));
    var sprite = makeGlowSprite(THREE);
    var pMat = new THREE.PointsMaterial({
      color: 0xffc86b,
      size: 0.22,
      map: sprite,
      transparent: true,
      opacity: 0.72,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });
    var stars = new THREE.Points(pGeo, pMat);
    group.add(stars);

    var tx = 0, ty = 0, cx = 0, cy = 0, scP = 0, burst = 0;
    var alive = true, raf = 0, lastF = 0;

    function resize() {
      if (!canvas.isConnected) return;
      var w = Math.min(580, Math.max(200, hostEl.clientWidth));
      var h = Math.min(580, Math.max(200, hostEl.clientHeight));
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setPixelRatio(Math.min(1.25, window.devicePixelRatio || 1));
      renderer.setSize(w, h, false);
    }
    resize();
    window.addEventListener('resize', resize, { passive: true });
    requestAnimationFrame(function () { canvas.classList.add('is-live'); });

    function loop(now) {
      if (!alive || !canvas.isConnected) return;
      raf = requestAnimationFrame(loop);
      if (document.hidden || now - lastF < 22) return;
      lastF = now;
      var t = now * 0.001;
      cx += (tx - cx) * 0.08;
      cy += (ty - cy) * 0.08;
      burst *= 0.92;

      knot.rotation.x = t * 0.28 + cy * 0.75 + scP * 1.1;
      knot.rotation.y = t * 0.36 + cx * 0.85;
      ring1.rotation.z = t * 0.34 + cx * 0.5;
      ring1.rotation.x = 1.05 + cy * 0.45;
      ring2.rotation.z = -t * 0.24 - cx * 0.4;
      ring2.rotation.y = scP * 1.4 + cx * 0.4;
      stars.rotation.y = -t * 0.14 + cx * 0.65;
      stars.rotation.x = cy * 0.4;
      group.scale.setScalar(1 + burst * 0.14);

      renderer.render(scene, camera);
    }
    raf = requestAnimationFrame(loop);

    return {
      setInput: function (nx, ny) { tx = nx || 0; ty = ny || 0; },
      setScroll: function (p) { scP = p || 0; },
      pulse: function (s) { burst = Math.min(1.2, burst + (s || 0.7)); },
      destroy: function () {
        alive = false;
        if (raf) cancelAnimationFrame(raf);
        window.removeEventListener('resize', resize);
        knotGeo.dispose(); knotMat.dispose();
        ring1Geo.dispose(); ring1Mat.dispose();
        ring2Geo.dispose(); ring2Mat.dispose();
        pGeo.dispose(); pMat.dispose(); sprite.dispose();
        renderer.dispose();
        if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
      }
    };
  }

  Z.mountMusicVisualizer = mountMusicVisualizer;
  Z.mountSkillWebgl = mountSkillWebgl;
  Z.mountMeWebgl = mountMeWebgl;
})();
