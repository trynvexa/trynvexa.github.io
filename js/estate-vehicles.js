/* ==========================================================================
   js/estate-vehicles.js — High-Detail Luxury 3D Vehicles
   1. Porsche 911 Carrera S (992) — GT Silver Metallic
   2. Mercedes-Benz G 63 AMG (W463A) — Obsidian Black Metallic
   ========================================================================== */
(function () {
  "use strict";

  function makePlateTex(THREE, trackTex, text) {
    var cv = document.createElement("canvas");
    cv.width = 256;
    cv.height = 64;
    var ctx = cv.getContext("2d");
    ctx.fillStyle = "#F7F5F0";
    ctx.fillRect(0, 0, 256, 64);
    ctx.fillStyle = "#1E356B";
    ctx.fillRect(0, 0, 30, 64);
    ctx.strokeStyle = "#1A1917";
    ctx.lineWidth = 4;
    ctx.strokeRect(2, 2, 252, 60);
    ctx.fillStyle = "#141414";
    ctx.font = 'bold 34px "Inter Tight", Inter, sans-serif';
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(text, 142, 34);
    var t = trackTex(new THREE.CanvasTexture(cv));
    t.encoding = THREE.sRGBEncoding;
    return t;
  }

  function buildWheelAssembly(THREE, trackGeo, mats, outerR, width, spokeCount) {
    var g = new THREE.Group();
    var tireGeo = trackGeo(new THREE.CylinderGeometry(outerR, outerR, width, 28));
    tireGeo.rotateZ(Math.PI / 2);
    var tire = new THREE.Mesh(tireGeo, mats.tire);
    tire.castShadow = true;
    tire.receiveShadow = true;
    g.add(tire);

    var shoulderGeo = trackGeo(new THREE.TorusGeometry(outerR - 0.045, 0.045, 10, 28));
    shoulderGeo.rotateY(Math.PI / 2);
    var shL = new THREE.Mesh(shoulderGeo, mats.tire);
    shL.position.x = width * 0.5 - 0.035;
    g.add(shL);
    var shR = new THREE.Mesh(shoulderGeo, mats.tire);
    shR.position.x = -(width * 0.5 - 0.035);
    g.add(shR);

    var rimR = outerR * 0.68;
    var rimOuterGeo = trackGeo(new THREE.TorusGeometry(rimR, 0.022, 10, 28));
    rimOuterGeo.rotateY(Math.PI / 2);
    var rimL = new THREE.Mesh(rimOuterGeo, mats.alloy);
    rimL.position.x = width * 0.5 - 0.01;
    g.add(rimL);
    var rimR2 = new THREE.Mesh(rimOuterGeo, mats.alloy);
    rimR2.position.x = -(width * 0.5 - 0.01);
    g.add(rimR2);

    var discGeo = trackGeo(new THREE.CylinderGeometry(rimR * 0.8, rimR * 0.8, width * 0.65, 22));
    discGeo.rotateZ(Math.PI / 2);
    g.add(new THREE.Mesh(discGeo, mats.rotor));

    var calGeo = trackGeo(new THREE.BoxGeometry(width * 0.72, rimR * 0.42, rimR * 0.28));
    var cal = new THREE.Mesh(calGeo, mats.caliper);
    cal.position.set(0, rimR * 0.14, rimR * 0.46);
    g.add(cal);

    var nSpokes = spokeCount || 10;
    var spokeGeo = trackGeo(new THREE.BoxGeometry(0.028, rimR * 1.92, 0.026));
    [width * 0.5 - 0.022, -(width * 0.5 - 0.022)].forEach(function (sx) {
      for (var s = 0; s < nSpokes / 2; s++) {
        var sp = new THREE.Mesh(spokeGeo, mats.alloy);
        sp.position.x = sx;
        sp.rotation.x = (s / (nSpokes / 2)) * Math.PI;
        g.add(sp);
      }
      var hubGeo = trackGeo(new THREE.CylinderGeometry(0.068, 0.068, 0.04, 16));
      hubGeo.rotateZ(Math.PI / 2);
      var hub = new THREE.Mesh(hubGeo, mats.chrome);
      hub.position.x = sx;
      g.add(hub);
    });

    return g;
  }

  function buildInteriorCockpit(THREE, trackGeo, mats, cfg) {
    var g = new THREE.Group();
    var seatMat = cfg.seatMat || mats.leatherBlack;
    [-cfg.seatSpread, cfg.seatSpread].forEach(function (sx) {
      var pan = new THREE.Mesh(trackGeo(new THREE.BoxGeometry(0.46, 0.1, 0.48)), seatMat);
      pan.position.set(sx, cfg.seatY, cfg.seatZ);
      g.add(pan);
      var back = new THREE.Mesh(trackGeo(new THREE.BoxGeometry(0.44, 0.56, 0.11)), seatMat);
      back.position.set(sx, cfg.seatY + 0.3, cfg.seatZ - 0.22);
      back.rotation.x = -0.22;
      g.add(back);
      var head = new THREE.Mesh(trackGeo(new THREE.BoxGeometry(0.24, 0.18, 0.1)), seatMat);
      head.position.set(sx, cfg.seatY + 0.64, cfg.seatZ - 0.29);
      g.add(head);
    });
    if (cfg.rearBench) {
      var rPan = new THREE.Mesh(
        trackGeo(new THREE.BoxGeometry(cfg.dashW - 0.12, 0.12, 0.52)),
        seatMat
      );
      rPan.position.set(0, cfg.seatY + 0.02, cfg.seatZ - 0.96);
      g.add(rPan);
      var rBack = new THREE.Mesh(
        trackGeo(new THREE.BoxGeometry(cfg.dashW - 0.12, 0.56, 0.14)),
        seatMat
      );
      rBack.position.set(0, cfg.seatY + 0.32, cfg.seatZ - 1.24);
      rBack.rotation.x = -0.18;
      g.add(rBack);
    }
    var dash = new THREE.Mesh(
      trackGeo(new THREE.BoxGeometry(cfg.dashW, 0.22, 0.44)),
      mats.leatherBlack
    );
    dash.position.set(0, cfg.dashY, cfg.dashZ);
    g.add(dash);
    var consoleM = new THREE.Mesh(
      trackGeo(new THREE.BoxGeometry(0.26, 0.2, 0.85)),
      mats.leatherBlack
    );
    consoleM.position.set(0, cfg.seatY + 0.08, cfg.seatZ + 0.14);
    g.add(consoleM);
    var wheelRim = new THREE.Mesh(
      trackGeo(new THREE.TorusGeometry(0.165, 0.02, 10, 24)),
      mats.leatherBlack
    );
    wheelRim.position.set(cfg.seatSpread, cfg.dashY + 0.06, cfg.dashZ - 0.26);
    wheelRim.rotation.x = -0.35;
    g.add(wheelRim);
    var hub = new THREE.Mesh(
      trackGeo(new THREE.CylinderGeometry(0.055, 0.055, 0.04, 14)),
      mats.chrome
    );
    hub.position.set(cfg.seatSpread, cfg.dashY + 0.06, cfg.dashZ - 0.26);
    hub.rotation.x = Math.PI / 2 - 0.35;
    g.add(hub);
    return g;
  }

  function buildPorsche911(THREE, trackGeo, trackMat, trackTex, envTex, lightRefs) {
    var root = new THREE.Group();
    root.name = "Porsche_911_Carrera_S";

    var mats = {
      paint: trackMat(
        new THREE.MeshPhysicalMaterial({
          color: 0xc8ced4,
          metalness: 0.72,
          roughness: 0.16,
          clearcoat: 1.0,
          clearcoatRoughness: 0.05,
          envMap: envTex,
          envMapIntensity: 1.35,
        })
      ),
      trimBlack: trackMat(
        new THREE.MeshStandardMaterial({ color: 0x16181c, roughness: 0.42, metalness: 0.35 })
      ),
      glass: trackMat(
        new THREE.MeshPhysicalMaterial({
          color: 0x101820,
          transparent: true,
          opacity: 0.62,
          roughness: 0.04,
          metalness: 0.18,
          clearcoat: 1.0,
          envMap: envTex,
          envMapIntensity: 1.45,
        })
      ),
      alloy: trackMat(
        new THREE.MeshStandardMaterial({
          color: 0xbcc2ca,
          metalness: 0.9,
          roughness: 0.18,
          envMap: envTex,
          envMapIntensity: 1.25,
        })
      ),
      chrome: trackMat(
        new THREE.MeshStandardMaterial({
          color: 0xe2e6ec,
          metalness: 0.94,
          roughness: 0.12,
          envMap: envTex,
          envMapIntensity: 1.25,
        })
      ),
      tire: trackMat(
        new THREE.MeshStandardMaterial({ color: 0x1b1c1e, roughness: 0.86, metalness: 0.04 })
      ),
      rotor: trackMat(
        new THREE.MeshStandardMaterial({ color: 0x7a7f86, metalness: 0.82, roughness: 0.34 })
      ),
      caliper: trackMat(
        new THREE.MeshStandardMaterial({ color: 0xc81e1e, metalness: 0.35, roughness: 0.28 })
      ),
      leatherBlack: trackMat(new THREE.MeshStandardMaterial({ color: 0x222020, roughness: 0.74 })),
      headlight: trackMat(
        new THREE.MeshStandardMaterial({
          color: 0xfff9ec,
          emissive: 0xfff2d4,
          emissiveIntensity: 0.65,
          roughness: 0.08,
        })
      ),
      taillight: trackMat(
        new THREE.MeshStandardMaterial({
          color: 0xc8141a,
          emissive: 0xff1a22,
          emissiveIntensity: 0.75,
          roughness: 0.14,
        })
      ),
      plate: trackMat(
        new THREE.MeshStandardMaterial({
          map: makePlateTex(THREE, trackTex, "ZK · 911"),
          roughness: 0.38,
        })
      ),
    };
    lightRefs.reflectiveMats.push(mats.paint, mats.glass, mats.alloy, mats.chrome);
    lightRefs.headlightMats.push(mats.headlight);
    lightRefs.taillightMats.push(mats.taillight);

    var bodyShape = new THREE.Shape();
    bodyShape.moveTo(-2.22, 0.24);
    bodyShape.lineTo(2.18, 0.2);
    bodyShape.quadraticCurveTo(2.3, 0.26, 2.24, 0.44);
    bodyShape.quadraticCurveTo(2.05, 0.66, 1.56, 0.74);
    bodyShape.lineTo(0.84, 0.8);
    bodyShape.lineTo(-1.72, 0.86);
    bodyShape.quadraticCurveTo(-2.14, 0.84, -2.26, 0.62);
    bodyShape.lineTo(-2.22, 0.24);

    var bodyGeo = trackGeo(
      new THREE.ExtrudeGeometry(bodyShape, {
        depth: 1.66,
        bevelEnabled: true,
        bevelThickness: 0.11,
        bevelSize: 0.08,
        bevelSegments: 4,
      })
    );
    bodyGeo.translate(0, 0, -0.83);
    bodyGeo.rotateY(-Math.PI / 2);
    var lowerBody = new THREE.Mesh(bodyGeo, mats.paint);
    lowerBody.castShadow = true;
    lowerBody.receiveShadow = true;
    root.add(lowerBody);

    [-0.84, 0.84].forEach(function (fx) {
      var haunch = new THREE.Mesh(trackGeo(new THREE.SphereGeometry(0.42, 18, 14)), mats.paint);
      haunch.scale.set(0.32, 0.54, 1.48);
      haunch.position.set(fx, 0.58, -1.24);
      haunch.castShadow = true;
      root.add(haunch);
      var fBulge = new THREE.Mesh(trackGeo(new THREE.SphereGeometry(0.38, 16, 12)), mats.paint);
      fBulge.scale.set(0.28, 0.46, 1.25);
      fBulge.position.set(fx * 0.97, 0.54, 1.3);
      fBulge.castShadow = true;
      root.add(fBulge);
      var wellR = new THREE.Mesh(
        trackGeo(new THREE.CylinderGeometry(0.37, 0.37, 0.32, 20)),
        mats.trimBlack
      );
      wellR.rotation.z = Math.PI / 2;
      wellR.position.set(fx * 0.9, 0.36, -1.28);
      root.add(wellR);
      var wellF = new THREE.Mesh(
        trackGeo(new THREE.CylinderGeometry(0.36, 0.36, 0.3, 20)),
        mats.trimBlack
      );
      wellF.rotation.z = Math.PI / 2;
      wellF.position.set(fx * 0.9, 0.35, 1.32);
      root.add(wellF);
    });

    var roofShape = new THREE.Shape();
    roofShape.moveTo(-1.82, 0.78);
    roofShape.lineTo(0.92, 0.76);
    roofShape.quadraticCurveTo(0.45, 1.18, 0.02, 1.26);
    roofShape.quadraticCurveTo(-0.56, 1.28, -1.16, 1.06);
    roofShape.quadraticCurveTo(-1.55, 0.9, -1.82, 0.78);
    var roofGeo = trackGeo(
      new THREE.ExtrudeGeometry(roofShape, {
        depth: 1.24,
        bevelEnabled: true,
        bevelThickness: 0.07,
        bevelSize: 0.04,
        bevelSegments: 4,
      })
    );
    roofGeo.translate(0, 0, -0.62);
    roofGeo.rotateY(-Math.PI / 2);
    var greenhouse = new THREE.Mesh(roofGeo, mats.glass);
    greenhouse.castShadow = true;
    root.add(greenhouse);

    var capShape = new THREE.Shape();
    capShape.moveTo(-1.12, 1.1);
    capShape.quadraticCurveTo(-0.48, 1.35, 0.14, 1.3);
    capShape.lineTo(0.22, 1.23);
    capShape.quadraticCurveTo(-0.44, 1.26, -1.04, 1.04);
    capShape.closePath();
    var capGeo = trackGeo(
      new THREE.ExtrudeGeometry(capShape, {
        depth: 1.22,
        bevelEnabled: true,
        bevelThickness: 0.05,
        bevelSize: 0.03,
        bevelSegments: 3,
      })
    );
    capGeo.translate(0, 0, -0.61);
    capGeo.rotateY(-Math.PI / 2);
    root.add(new THREE.Mesh(capGeo, mats.paint));
    [-0.63, 0.63].forEach(function (px) {
      var aPil = new THREE.Mesh(trackGeo(new THREE.BoxGeometry(0.06, 0.06, 0.88)), mats.paint);
      aPil.position.set(px, 1.04, 0.46);
      aPil.rotation.x = 0.56;
      root.add(aPil);
      var cPil = new THREE.Mesh(trackGeo(new THREE.BoxGeometry(0.08, 0.07, 0.96)), mats.paint);
      cPil.position.set(px, 0.98, -1.32);
      cPil.rotation.x = -0.38;
      root.add(cPil);
    });

    root.add(
      buildInteriorCockpit(THREE, trackGeo, mats, {
        seatSpread: 0.34,
        seatY: 0.46,
        seatZ: -0.1,
        dashW: 1.22,
        dashY: 0.76,
        dashZ: 0.56,
        rearBench: false,
      })
    );

    [-0.64, 0.64].forEach(function (hx) {
      var hlBezel = new THREE.Mesh(trackGeo(new THREE.SphereGeometry(0.18, 18, 14)), mats.chrome);
      hlBezel.scale.set(0.76, 0.48, 1.26);
      hlBezel.position.set(hx, 0.73, 1.92);
      hlBezel.rotation.x = 0.34;
      root.add(hlBezel);
      var hlInner = new THREE.Mesh(
        trackGeo(new THREE.SphereGeometry(0.155, 16, 12)),
        mats.trimBlack
      );
      hlInner.scale.set(0.72, 0.46, 1.2);
      hlInner.position.set(hx, 0.75, 1.96);
      hlInner.rotation.x = 0.34;
      root.add(hlInner);
      var hlLens = new THREE.Mesh(
        trackGeo(new THREE.SphereGeometry(0.115, 16, 12)),
        mats.headlight
      );
      hlLens.scale.set(0.7, 0.42, 0.92);
      hlLens.position.set(hx, 0.765, 2.02);
      hlLens.rotation.x = 0.34;
      root.add(hlLens);
      var intake = new THREE.Mesh(trackGeo(new THREE.BoxGeometry(0.5, 0.16, 0.1)), mats.trimBlack);
      intake.position.set(hx * 0.96, 0.32, 2.34);
      root.add(intake);
      var drlBar = new THREE.Mesh(
        trackGeo(new THREE.BoxGeometry(0.38, 0.025, 0.06)),
        mats.headlight
      );
      drlBar.position.set(hx * 0.96, 0.43, 2.36);
      root.add(drlBar);
    });
    var centerGrille = new THREE.Mesh(
      trackGeo(new THREE.BoxGeometry(0.64, 0.14, 0.08)),
      mats.trimBlack
    );
    centerGrille.position.set(0, 0.3, 2.37);
    root.add(centerGrille);
    var splitter = new THREE.Mesh(
      trackGeo(new THREE.BoxGeometry(1.78, 0.04, 0.22)),
      mats.trimBlack
    );
    splitter.position.set(0, 0.18, 2.3);
    root.add(splitter);
    var crest = new THREE.Mesh(trackGeo(new THREE.BoxGeometry(0.06, 0.015, 0.08)), mats.caliper);
    crest.position.set(0, 0.785, 2.06);
    crest.rotation.x = 0.22;
    root.add(crest);

    var rearBar = new THREE.Mesh(trackGeo(new THREE.BoxGeometry(1.7, 0.06, 0.08)), mats.taillight);
    rearBar.position.set(0, 0.74, -2.35);
    root.add(rearBar);
    var rearGrill = new THREE.Mesh(
      trackGeo(new THREE.BoxGeometry(1.06, 0.08, 0.36)),
      mats.trimBlack
    );
    rearGrill.position.set(0, 0.94, -1.78);
    rearGrill.rotation.x = 0.22;
    root.add(rearGrill);
    var diffuser = new THREE.Mesh(trackGeo(new THREE.BoxGeometry(1.52, 0.18, 0.1)), mats.trimBlack);
    diffuser.position.set(0, 0.28, -2.32);
    root.add(diffuser);
    [-0.56, -0.44, 0.44, 0.56].forEach(function (ex) {
      var tip = new THREE.Mesh(
        trackGeo(new THREE.CylinderGeometry(0.036, 0.036, 0.12, 14)),
        mats.chrome
      );
      tip.rotation.x = Math.PI / 2;
      tip.position.set(ex, 0.29, -2.37);
      root.add(tip);
    });

    [-0.86, 0.86].forEach(function (mx) {
      var stalk = new THREE.Mesh(trackGeo(new THREE.BoxGeometry(0.14, 0.04, 0.06)), mats.paint);
      stalk.position.set(mx, 0.88, 0.52);
      root.add(stalk);
      var cap = new THREE.Mesh(trackGeo(new THREE.SphereGeometry(0.08, 12, 10)), mats.paint);
      cap.scale.set(1.3, 0.75, 1.15);
      cap.position.set(mx + (mx > 0 ? 0.08 : -0.08), 0.91, 0.5);
      root.add(cap);
      var handle = new THREE.Mesh(trackGeo(new THREE.BoxGeometry(0.03, 0.025, 0.14)), mats.chrome);
      handle.position.set(mx + (mx > 0 ? 0.09 : -0.09), 0.74, -0.22);
      root.add(handle);
    });
    var fPlate = new THREE.Mesh(trackGeo(new THREE.BoxGeometry(0.48, 0.11, 0.025)), mats.plate);
    fPlate.position.set(0, 0.44, 2.41);
    root.add(fPlate);
    var rPlate = new THREE.Mesh(trackGeo(new THREE.BoxGeometry(0.48, 0.11, 0.025)), mats.plate);
    rPlate.position.set(0, 0.52, -2.38);
    root.add(rPlate);

    [
      [-0.85, 0.34, 1.32, 0.33, 0.26],
      [0.85, 0.34, 1.32, 0.33, 0.26],
      [-0.87, 0.35, -1.28, 0.35, 0.3],
      [0.87, 0.35, -1.28, 0.35, 0.3],
    ].forEach(function (w) {
      var wh = buildWheelAssembly(THREE, trackGeo, mats, w[3], w[4], 10);
      wh.position.set(w[0], w[1], w[2]);
      root.add(wh);
    });

    return root;
  }

  function buildMercedesGClass(THREE, trackGeo, trackMat, trackTex, envTex, lightRefs) {
    var root = new THREE.Group();
    root.name = "Mercedes_Benz_G63_AMG";
    var PBR = window.GE_PBR;

    var mats = {
      paint: trackMat(
        new THREE.MeshPhysicalMaterial({
          color: 0x0c0e12,
          metalness: 0.54,
          roughness: 0.14,
          clearcoat: 1.0,
          clearcoatRoughness: 0.04,
          envMap: envTex,
          envMapIntensity: 1.2,
        })
      ),
      trimBlack: trackMat(
        new THREE.MeshStandardMaterial({ color: 0x101114, roughness: 0.52, metalness: 0.25 })
      ),
      glass: trackMat(
        new THREE.MeshPhysicalMaterial({
          color: 0x121a22,
          transparent: true,
          opacity: 0.52,
          roughness: 0.04,
          metalness: 0.14,
          clearcoat: 1.0,
          envMap: envTex,
          envMapIntensity: 1.4,
        })
      ),
      alloy: trackMat(
        new THREE.MeshStandardMaterial({
          color: 0xaeb5be,
          metalness: 0.9,
          roughness: 0.18,
          envMap: envTex,
          envMapIntensity: 1.25,
        })
      ),
      chrome: trackMat(
        new THREE.MeshStandardMaterial({
          color: 0xe6eaef,
          metalness: 0.95,
          roughness: 0.1,
          envMap: envTex,
          envMapIntensity: 1.35,
        })
      ),
      tire: trackMat(
        new THREE.MeshStandardMaterial({ color: 0x191a1c, roughness: 0.88, metalness: 0.04 })
      ),
      rotor: trackMat(
        new THREE.MeshStandardMaterial({ color: 0x7a7f86, metalness: 0.82, roughness: 0.34 })
      ),
      caliper: trackMat(
        new THREE.MeshStandardMaterial({ color: 0xc81e1e, metalness: 0.38, roughness: 0.28 })
      ),
      leatherBlack: trackMat(new THREE.MeshStandardMaterial({ color: 0x1e1c1b, roughness: 0.72 })),
      leatherTan: trackMat(new THREE.MeshStandardMaterial({ color: 0x8f5e38, roughness: 0.76 })),
      headlight: trackMat(
        new THREE.MeshStandardMaterial({
          color: 0xfffbf0,
          emissive: 0xfff4da,
          emissiveIntensity: 0.65,
          roughness: 0.08,
        })
      ),
      amberLight: trackMat(
        new THREE.MeshStandardMaterial({
          color: 0xffa432,
          emissive: 0xff8c14,
          emissiveIntensity: 0.45,
          roughness: 0.18,
        })
      ),
      taillight: trackMat(
        new THREE.MeshStandardMaterial({
          color: 0xc8141a,
          emissive: 0xff1a22,
          emissiveIntensity: 0.75,
          roughness: 0.14,
        })
      ),
      plate: trackMat(
        new THREE.MeshStandardMaterial({
          map: makePlateTex(THREE, trackTex, "ZK · 063"),
          roughness: 0.38,
        })
      ),
    };
    lightRefs.reflectiveMats.push(mats.paint, mats.glass, mats.alloy, mats.chrome);
    lightRefs.headlightMats.push(mats.headlight);
    lightRefs.taillightMats.push(mats.taillight);

    var lowerTub = new THREE.Mesh(
      PBR.makeRoundedBoxGeo(THREE, trackGeo, 1.84, 0.74, 4.44, 0.06, 3),
      mats.paint
    );
    lowerTub.position.set(0, 0.76, 0.0);
    lowerTub.castShadow = true;
    lowerTub.receiveShadow = true;
    root.add(lowerTub);

    var hoodDome = new THREE.Mesh(
      PBR.makeRoundedBoxGeo(THREE, trackGeo, 1.46, 0.12, 1.42, 0.04, 2),
      mats.paint
    );
    hoodDome.position.set(0, 1.15, 1.44);
    hoodDome.castShadow = true;
    root.add(hoodDome);

    var fBumper = new THREE.Mesh(
      PBR.makeRoundedBoxGeo(THREE, trackGeo, 1.98, 0.34, 0.34, 0.04, 2),
      mats.paint
    );
    fBumper.position.set(0, 0.5, 2.24);
    fBumper.castShadow = true;
    root.add(fBumper);
    var rBumper = new THREE.Mesh(
      PBR.makeRoundedBoxGeo(THREE, trackGeo, 1.96, 0.3, 0.28, 0.04, 2),
      mats.paint
    );
    rBumper.position.set(0, 0.5, -2.24);
    rBumper.castShadow = true;
    root.add(rBumper);
    var skid = new THREE.Mesh(trackGeo(new THREE.BoxGeometry(1.12, 0.14, 0.08)), mats.chrome);
    skid.position.set(0, 0.34, 2.38);
    root.add(skid);

    var cabinGlass = new THREE.Mesh(trackGeo(new THREE.BoxGeometry(1.74, 0.72, 2.86)), mats.glass);
    cabinGlass.position.set(0, 1.48, -0.68);
    root.add(cabinGlass);
    var roofCap = new THREE.Mesh(
      PBR.makeRoundedBoxGeo(THREE, trackGeo, 1.82, 0.1, 2.98, 0.04, 3),
      mats.paint
    );
    roofCap.position.set(0, 1.88, -0.68);
    roofCap.castShadow = true;
    root.add(roofCap);
    [
      [-0.86, 0.72],
      [0.86, 0.72],
      [-0.86, -0.24],
      [0.86, -0.24],
      [-0.86, -1.26],
      [0.86, -1.26],
      [-0.86, -2.1],
      [0.86, -2.1],
    ].forEach(function (pl) {
      var p = new THREE.Mesh(trackGeo(new THREE.BoxGeometry(0.08, 0.76, 0.1)), mats.paint);
      p.position.set(pl[0], 1.48, pl[1]);
      p.castShadow = true;
      root.add(p);
    });
    [-0.78, 0.78].forEach(function (rx) {
      var rail = new THREE.Mesh(trackGeo(new THREE.BoxGeometry(0.05, 0.05, 2.55)), mats.chrome);
      rail.position.set(rx, 1.95, -0.72);
      root.add(rail);
    });

    [-0.96, 0.96].forEach(function (fx) {
      [1.42, -1.4].forEach(function (wz) {
        var arch = new THREE.Mesh(
          PBR.makeRoundedBoxGeo(THREE, trackGeo, 0.24, 0.42, 0.98, 0.04, 2),
          mats.paint
        );
        arch.position.set(fx, 0.72, wz);
        arch.castShadow = true;
        root.add(arch);
        var liner = new THREE.Mesh(
          trackGeo(new THREE.CylinderGeometry(0.45, 0.45, 0.34, 20)),
          mats.trimBlack
        );
        liner.rotation.z = Math.PI / 2;
        liner.position.set(fx * 0.88, 0.44, wz);
        root.add(liner);
      });
      var board = new THREE.Mesh(trackGeo(new THREE.BoxGeometry(0.22, 0.06, 1.92)), mats.chrome);
      board.position.set(fx * 0.98, 0.38, 0.0);
      root.add(board);
      [-0.72, -0.56].forEach(function (ez) {
        var pipe = new THREE.Mesh(
          trackGeo(new THREE.CylinderGeometry(0.035, 0.035, 0.14, 12)),
          mats.chrome
        );
        pipe.rotation.z = Math.PI / 2;
        pipe.position.set(fx * 1.02, 0.31, ez);
        root.add(pipe);
      });
      var strip = new THREE.Mesh(trackGeo(new THREE.BoxGeometry(0.04, 0.06, 4.3)), mats.chrome);
      strip.position.set(fx * 0.96, 0.96, 0.0);
      root.add(strip);
      [0.32, -0.68].forEach(function (dz) {
        var hdl = new THREE.Mesh(trackGeo(new THREE.BoxGeometry(0.05, 0.04, 0.16)), mats.chrome);
        hdl.position.set(fx * 0.96, 1.04, dz);
        root.add(hdl);
      });
      var mCap = new THREE.Mesh(
        PBR.makeRoundedBoxGeo(THREE, trackGeo, 0.22, 0.16, 0.14, 0.03, 2),
        mats.paint
      );
      mCap.position.set(fx * 1.05, 1.24, 0.56);
      root.add(mCap);
    });

    root.add(
      buildInteriorCockpit(THREE, trackGeo, mats, {
        seatMat: mats.leatherTan,
        seatSpread: 0.42,
        seatY: 0.88,
        seatZ: -0.02,
        dashW: 1.56,
        dashY: 1.18,
        dashZ: 0.54,
        rearBench: true,
      })
    );

    var grilleBox = new THREE.Mesh(
      trackGeo(new THREE.BoxGeometry(1.1, 0.34, 0.08)),
      mats.trimBlack
    );
    grilleBox.position.set(0, 0.92, 2.21);
    root.add(grilleBox);
    for (var sl = -5; sl <= 5; sl++) {
      var slat = new THREE.Mesh(trackGeo(new THREE.BoxGeometry(0.022, 0.3, 0.09)), mats.chrome);
      slat.position.set(sl * 0.092, 0.92, 2.22);
      root.add(slat);
    }
    var starRing = new THREE.Mesh(
      trackGeo(new THREE.TorusGeometry(0.11, 0.016, 10, 24)),
      mats.chrome
    );
    starRing.position.set(0, 0.92, 2.27);
    root.add(starRing);
    for (var sp3 = 0; sp3 < 3; sp3++) {
      var stArm = new THREE.Mesh(trackGeo(new THREE.BoxGeometry(0.016, 0.1, 0.016)), mats.chrome);
      var a3 = (sp3 / 3) * Math.PI * 2;
      stArm.position.set(Math.sin(a3) * 0.048, 0.92 + Math.cos(a3) * 0.048, 2.275);
      stArm.rotation.z = -a3;
      root.add(stArm);
    }

    [-0.72, 0.72].forEach(function (hx) {
      var halo = new THREE.Mesh(
        trackGeo(new THREE.TorusGeometry(0.115, 0.018, 10, 24)),
        mats.headlight
      );
      halo.position.set(hx, 0.92, 2.25);
      root.add(halo);
      var lens = new THREE.Mesh(
        trackGeo(new THREE.CylinderGeometry(0.1, 0.1, 0.04, 18)),
        mats.headlight
      );
      lens.rotation.x = Math.PI / 2;
      lens.position.set(hx, 0.92, 2.23);
      root.add(lens);
      var pod = new THREE.Mesh(
        PBR.makeRoundedBoxGeo(THREE, trackGeo, 0.09, 0.08, 0.24, 0.02, 2),
        mats.amberLight
      );
      pod.position.set(hx * 1.04, 1.22, 1.94);
      root.add(pod);
      var tail = new THREE.Mesh(trackGeo(new THREE.BoxGeometry(0.3, 0.11, 0.06)), mats.taillight);
      tail.position.set(hx, 0.72, -2.24);
      root.add(tail);
    });

    var spareCover = new THREE.Mesh(
      trackGeo(new THREE.CylinderGeometry(0.41, 0.41, 0.24, 28)),
      mats.paint
    );
    spareCover.rotation.x = Math.PI / 2;
    spareCover.position.set(0, 1.12, -2.35);
    spareCover.castShadow = true;
    root.add(spareCover);
    var spareRing = new THREE.Mesh(
      trackGeo(new THREE.TorusGeometry(0.41, 0.028, 12, 28)),
      mats.chrome
    );
    spareRing.position.set(0, 1.12, -2.35);
    root.add(spareRing);

    var fPlate = new THREE.Mesh(trackGeo(new THREE.BoxGeometry(0.48, 0.11, 0.02)), mats.plate);
    fPlate.position.set(0, 0.48, 2.42);
    root.add(fPlate);
    var rPlate = new THREE.Mesh(trackGeo(new THREE.BoxGeometry(0.48, 0.11, 0.02)), mats.plate);
    rPlate.position.set(0, 0.5, -2.4);
    root.add(rPlate);

    [
      [-0.94, 0.42, 1.42],
      [0.94, 0.42, 1.42],
      [-0.94, 0.42, -1.4],
      [0.94, 0.42, -1.4],
    ].forEach(function (w) {
      var wh = buildWheelAssembly(THREE, trackGeo, mats, 0.42, 0.3, 12);
      wh.position.set(w[0], w[1], w[2]);
      root.add(wh);
    });

    return root;
  }

  window.GE_VEHICLES = {
    buildPorsche911: buildPorsche911,
    buildMercedesGClass: buildMercedesGClass,
  };
})();
