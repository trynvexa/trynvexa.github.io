/* ==========================================================================
   js/estate-world.js — Unified Two-Story + Rooftop Luxury Residence 3D Engine
   THE GRAND ESTATE · Zikri's Dream House (420 m² / 600 m² Lot):
   - Constructible Architecture (Travertine, Board-Formed Concrete, Cedar,
     Gravel-Ballast Parapet Roof + Bronze Scuppers, Double-Height 7.0 m Salon)
   - All 22 Furnished Spaces including Zikri's Signature Rooms:
     * L1 Dev & UI Studio (Walnut L-Desk, Dual Coding Monitors, Monograph Shelf)
     * L1 Music & Family Lounge (Acoustic Guitar, Fluted Vinyl Turntable Console)
     * L2 Full Gaming Suite (Acoustic Slats, Triple Curved Monitors, RGB PC Tower,
       Hex Wall LEDs, Platform Bed w/ Under-Bed Neon)
   - Porsche 911 Carrera S & Mercedes-Benz G 63 AMG Integrated into Grounds
   - Hollow Recessed GLSL Swimming Pool + Outward-Arching Palms + Alpha-Cutout
     Dappled Tree Shadows + Animated Pivot Front Door + Multi-Floor Colliders
   ========================================================================== */
(function () {
  'use strict';

  function clamp(v, min, max) { return v < min ? min : (v > max ? max : v); }
  function lerp(a, b, t) { return a + (b - a) * t; }
  function smoothstep(t) { t = clamp(t, 0, 1); return t * t * (3 - 2 * t); }
  function lerpRGB(a, b, t) {
    return [Math.round(lerp(a[0], b[0], t)), Math.round(lerp(a[1], b[1], t)), Math.round(lerp(a[2], b[2], t))];
  }

  function buildGrandEstateWorld(THREE, renderer, DATA) {
    var PBR = window.GE_PBR;
    var VEH = window.GE_VEHICLES;
    var geos = new Set(), mats = new Set(), texs = new Set();
    function trackGeo(g) { geos.add(g); return g; }
    function trackMat(m) { mats.add(m); return m; }
    function trackTex(t) { texs.add(t); return t; }

    var maxAniso = renderer.capabilities && renderer.capabilities.getMaxAnisotropy
      ? Math.min(8, renderer.capabilities.getMaxAnisotropy()) : 4;

    var scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0xDECBB5, 0.0068);

    /* ---------- Selective PMREM Environment (NEVER assigned to global scene.environment!) ---------- */
    var pmremGen = new THREE.PMREMGenerator(renderer);
    var envScene = new THREE.Scene();
    envScene.background = new THREE.Color(0x708298);
    var e1 = new THREE.Mesh(new THREE.SphereGeometry(7, 16, 12), new THREE.MeshBasicMaterial({ color: 0xFFF0D4 }));
    e1.position.set(18, 18, 14); envScene.add(e1);
    var e2 = new THREE.Mesh(new THREE.SphereGeometry(9, 16, 12), new THREE.MeshBasicMaterial({ color: 0x90BCE6 }));
    e2.position.set(-18, 14, -14); envScene.add(e2);
    var e3 = new THREE.Mesh(new THREE.PlaneGeometry(48, 48), new THREE.MeshBasicMaterial({ color: 0x4E5C42 }));
    e3.rotation.x = -Math.PI / 2; e3.position.y = -9; envScene.add(e3);
    var envRT = pmremGen.fromScene(envScene, 0.04);
    var envTex = envRT.texture;
    [e1, e2, e3].forEach(function (m) { m.geometry.dispose(); m.material.dispose(); });
    pmremGen.dispose();

    /* ---------- Volumetric Painted Cloud Sky Dome ---------- */
    var skyMat = trackMat(new THREE.MeshBasicMaterial({ side: THREE.BackSide, depthWrite: false, fog: false }));
    scene.add(new THREE.Mesh(trackGeo(new THREE.SphereGeometry(148, 32, 20)), skyMat));

    /* ---------- Hierarchical Architectural Level Groups ---------- */
    var root = new THREE.Group(); scene.add(root);
    var gSite = new THREE.Group();
    var gL1 = new THREE.Group();
    var gL2 = new THREE.Group();
    var gL3 = new THREE.Group();
    root.add(gSite, gL1, gL2, gL3);

    /* ---------- Multi-Floor Collision & Raycast Registries ---------- */
    var colliders = { 1: [], 2: [], 3: [] };
    function addCollider(lvl, x1, x2, z1, z2) {
      colliders[lvl || 1].push({ x1: Math.min(x1, x2), x2: Math.max(x1, x2), z1: Math.min(z1, z2), z2: Math.max(z1, z2) });
    }
    var roomHitMeshes = [], floorHitMeshes = [];

    /* ======================================================================
       1. PHOTOREALISTIC PBR MATERIAL PALETTE
       ====================================================================== */
    var plasterInS  = PBR.makePlasterSet(THREE, trackTex, '#F3EEE5', 42, 3, 2, maxAniso);
    var plasterOutS = PBR.makePlasterSet(THREE, trackTex, '#EAE3D6', 99, 4, 2, maxAniso);
    var concreteS   = PBR.makeConcreteSet(THREE, trackTex, '#C3BDB3', 3, 2, maxAniso);
    var travS       = PBR.makeStoneSet(THREE, trackTex, '#DFD5C4', '#B9AC96', 4, 4, 2.8, 2.8, maxAniso);
    var limestoneS  = PBR.makeStoneSet(THREE, trackTex, '#D6CCB9', '#ADA08B', 3, 5, 3.2, 2.4, maxAniso);
    var bathTileS   = PBR.makeStoneSet(THREE, trackTex, '#E8E3DA', '#C8C1B4', 6, 4, 2.0, 2.0, maxAniso);
    var gravelS     = PBR.makeGravelSet(THREE, trackTex, maxAniso);
    var marbleS     = PBR.makeMarbleSet(THREE, trackTex, maxAniso);
    var walnutS     = PBR.makeWoodSet(THREE, trackTex, '#644E3C', '#382A1F', 7, 2.6, 2.6, maxAniso);
    var warmOakS    = PBR.makeWoodSet(THREE, trackTex, '#BF976D', '#8A6744', 8, 3.0, 3.0, maxAniso);
    var teakS       = PBR.makeWoodSet(THREE, trackTex, '#9A6D43', '#614124', 14, 3.2, 3.2, maxAniso);
    var slateWoodS  = PBR.makeWoodSet(THREE, trackTex, '#3C404C', '#242730', 10, 2.8, 2.8, maxAniso);
    var boucleS     = PBR.makeFabricSet(THREE, trackTex, '#F2ECE0', 'rgba(135,120,100,0.16)', 6, maxAniso);
    var linenS      = PBR.makeFabricSet(THREE, trackTex, '#E5DDD0', 'rgba(120,108,92,0.14)', 7, maxAniso);
    var rugS        = PBR.makeFabricSet(THREE, trackTex, '#DED4C3', 'rgba(142,122,96,0.22)', 10, maxAniso);
    var barkS       = PBR.makeBarkSet(THREE, trackTex, maxAniso);
    var lawnS       = PBR.makeLawnSet(THREE, trackTex, maxAniso);
    var botTex      = PBR.makeBotanicalTextures(THREE, trackTex, maxAniso);
    var aoTex       = PBR.makeContactAOTexture(THREE, trackTex);

    var matPlasterIn  = trackMat(new THREE.MeshStandardMaterial({ map: plasterInS.map, normalMap: plasterInS.normalMap, normalScale: new THREE.Vector2(0.45, 0.45), roughnessMap: plasterInS.roughnessMap, roughness: 0.90 }));
    var matPlasterOut = trackMat(new THREE.MeshStandardMaterial({ map: plasterOutS.map, normalMap: plasterOutS.normalMap, normalScale: new THREE.Vector2(0.55, 0.55), roughnessMap: plasterOutS.roughnessMap, roughness: 0.92 }));
    var matConcrete   = trackMat(new THREE.MeshStandardMaterial({ map: concreteS.map, normalMap: concreteS.normalMap, normalScale: new THREE.Vector2(0.65, 0.65), roughnessMap: concreteS.roughnessMap, roughness: 0.85 }));
    var matTravertine = trackMat(new THREE.MeshStandardMaterial({ map: travS.map, normalMap: travS.normalMap, normalScale: new THREE.Vector2(0.65, 0.65), roughnessMap: travS.roughnessMap, roughness: 0.80 }));
    var matLimestone  = trackMat(new THREE.MeshStandardMaterial({ map: limestoneS.map, normalMap: limestoneS.normalMap, normalScale: new THREE.Vector2(0.70, 0.70), roughnessMap: limestoneS.roughnessMap, roughness: 0.84 }));
    var matBathTile   = trackMat(new THREE.MeshStandardMaterial({ map: bathTileS.map, normalMap: bathTileS.normalMap, normalScale: new THREE.Vector2(0.5, 0.5), roughness: 0.40, metalness: 0.04, envMap: envTex, envMapIntensity: 0.35 }));
    var matGravel     = trackMat(new THREE.MeshStandardMaterial({ map: gravelS.map, normalMap: gravelS.normalMap, normalScale: new THREE.Vector2(0.95, 0.95), roughness: 0.96 }));
    var matMarble     = trackMat(new THREE.MeshStandardMaterial({ map: marbleS.map, roughnessMap: marbleS.roughnessMap, envMap: envTex, envMapIntensity: 0.55, roughness: 0.24, metalness: 0.04 }));
    var matWalnut     = trackMat(new THREE.MeshStandardMaterial({ map: walnutS.map, normalMap: walnutS.normalMap, normalScale: new THREE.Vector2(0.45, 0.45), roughnessMap: walnutS.roughnessMap, color: 0xD2B496, roughness: 0.56 }));
    var matOak        = trackMat(new THREE.MeshStandardMaterial({ map: warmOakS.map, normalMap: warmOakS.normalMap, normalScale: new THREE.Vector2(0.45, 0.45), roughnessMap: warmOakS.roughnessMap, roughness: 0.60 }));
    var matSlateFloor = trackMat(new THREE.MeshStandardMaterial({ map: slateWoodS.map, normalMap: slateWoodS.normalMap, normalScale: new THREE.Vector2(0.42, 0.42), roughnessMap: slateWoodS.roughnessMap, roughness: 0.58 }));
    var matGamingWall = trackMat(new THREE.MeshStandardMaterial({ map: slateWoodS.map, normalMap: slateWoodS.normalMap, color: 0x5A6176, roughness: 0.76, metalness: 0.08 }));
    var matCedar      = trackMat(new THREE.MeshStandardMaterial({ map: teakS.map, normalMap: teakS.normalMap, normalScale: new THREE.Vector2(0.50, 0.50), color: 0xD4A67A, roughness: 0.62 }));
    var matTeakDeck   = trackMat(new THREE.MeshStandardMaterial({ map: teakS.map, normalMap: teakS.normalMap, normalScale: new THREE.Vector2(0.55, 0.55), roughnessMap: teakS.roughnessMap, roughness: 0.70 }));
    var matGarageFlr  = trackMat(new THREE.MeshStandardMaterial({ map: concreteS.map, color: 0x6F706E, roughness: 0.44, metalness: 0.06, envMap: envTex, envMapIntensity: 0.28 }));
    var matWallCap    = trackMat(new THREE.MeshStandardMaterial({ color: 0x35322E, roughness: 0.72, metalness: 0.10 }));
    var matBronze     = trackMat(new THREE.MeshStandardMaterial({ color: 0x2F2B27, envMap: envTex, envMapIntensity: 0.68, roughness: 0.34, metalness: 0.76 }));
    var matBrass      = trackMat(new THREE.MeshStandardMaterial({ color: 0xCAA66E, envMap: envTex, envMapIntensity: 0.95, roughness: 0.22, metalness: 0.88 }));
    var matChrome     = trackMat(new THREE.MeshStandardMaterial({ color: 0xD8DCE2, envMap: envTex, envMapIntensity: 0.98, roughness: 0.16, metalness: 0.92 }));
    var matStainless  = trackMat(new THREE.MeshStandardMaterial({ color: 0x82868D, envMap: envTex, envMapIntensity: 0.78, roughness: 0.28, metalness: 0.84 }));
    var matCharcoal   = trackMat(new THREE.MeshStandardMaterial({ color: 0x2B2D33, roughness: 0.58, metalness: 0.16 }));
    var matMatteBlack = trackMat(new THREE.MeshStandardMaterial({ color: 0x17191E, roughness: 0.46, metalness: 0.22 }));
    var matBoucle     = trackMat(new THREE.MeshStandardMaterial({ map: boucleS.map, normalMap: boucleS.normalMap, normalScale: new THREE.Vector2(0.6, 0.6), roughness: 0.95 }));
    var matLinen      = trackMat(new THREE.MeshStandardMaterial({ map: linenS.map, normalMap: linenS.normalMap, normalScale: new THREE.Vector2(0.5, 0.5), roughness: 0.92 }));
    var matRug        = trackMat(new THREE.MeshStandardMaterial({ map: rugS.map, normalMap: rugS.normalMap, normalScale: new THREE.Vector2(0.7, 0.7), roughness: 0.97 }));
    var matSheer      = trackMat(new THREE.MeshStandardMaterial({ map: linenS.map, color: 0xFAF6EE, transparent: true, opacity: 0.42, roughness: 0.92, side: THREE.DoubleSide }));
    var matTaupe      = trackMat(new THREE.MeshStandardMaterial({ map: linenS.map, normalMap: linenS.normalMap, color: 0x9C8F7E, roughness: 0.90 }));
    var matTerracotta = trackMat(new THREE.MeshStandardMaterial({ map: linenS.map, normalMap: linenS.normalMap, color: 0xBE7454, roughness: 0.88 }));
    var matOchre      = trackMat(new THREE.MeshStandardMaterial({ map: linenS.map, normalMap: linenS.normalMap, color: 0xD0A060, roughness: 0.88 }));
    var matSage       = trackMat(new THREE.MeshStandardMaterial({ map: linenS.map, normalMap: linenS.normalMap, color: 0x879882, roughness: 0.88 }));
    var matSlateBed   = trackMat(new THREE.MeshStandardMaterial({ map: boucleS.map, normalMap: boucleS.normalMap, color: 0x454A59, roughness: 0.92 }));
    var matCeramic    = trackMat(new THREE.MeshStandardMaterial({ color: 0xF6F3EC, envMap: envTex, envMapIntensity: 0.45, roughness: 0.20 }));
    var matGlass      = trackMat(new THREE.MeshPhysicalMaterial({ color: 0xBCD6E6, envMap: envTex, envMapIntensity: 1.08, transparent: true, opacity: 0.24, roughness: 0.05, metalness: 0.08 }));
    var matCrystal    = trackMat(new THREE.MeshPhysicalMaterial({ color: 0xEEF6FA, envMap: envTex, envMapIntensity: 1.2, transparent: true, opacity: 0.36, roughness: 0.04 }));
    var matMirror     = trackMat(new THREE.MeshStandardMaterial({ color: 0xE2E8EC, envMap: envTex, envMapIntensity: 1.22, roughness: 0.04, metalness: 0.96 }));
    var matPoolTile   = trackMat(new THREE.MeshStandardMaterial({ map: bathTileS.map, color: 0x1D5D6E, roughness: 0.40 }));
    var matBasalt     = trackMat(new THREE.MeshStandardMaterial({ map: concreteS.map, normalMap: concreteS.normalMap, color: 0x35373C, roughness: 0.74 }));
    var matMulch      = trackMat(new THREE.MeshStandardMaterial({ map: gravelS.map, normalMap: gravelS.normalMap, color: 0x42352A, roughness: 0.96 }));
    var matLawn       = trackMat(new THREE.MeshStandardMaterial({ map: lawnS.map, normalMap: lawnS.normalMap, normalScale: new THREE.Vector2(0.7, 0.7), roughness: 0.96 }));
    var matHills      = trackMat(new THREE.MeshStandardMaterial({ map: lawnS.map, color: 0x465F3A, roughness: 0.98 }));
    var matBark       = trackMat(new THREE.MeshStandardMaterial({ map: barkS.map, normalMap: barkS.normalMap, normalScale: new THREE.Vector2(1.0, 1.0), roughness: 0.94 }));
    var matPot        = trackMat(new THREE.MeshStandardMaterial({ map: travS.map, color: 0xC8BEB0, roughness: 0.82 }));
    var matContactAO  = trackMat(new THREE.MeshBasicMaterial({ map: aoTex, transparent: true, opacity: 0.52, depthWrite: false }));

    // Alpha-Cutout Botanical Materials + Depth Shadow Materials (Authentic Dappled Leaf Shadows!)
    var matTreeLeaf    = trackMat(new THREE.MeshStandardMaterial({ map: botTex.treeLeafTex, alphaTest: 0.42, side: THREE.DoubleSide, roughness: 0.74 }));
    var matPalmLeaf    = trackMat(new THREE.MeshStandardMaterial({ map: botTex.palmTex, alphaTest: 0.40, side: THREE.DoubleSide, roughness: 0.68 }));
    var matShrubLeaf   = trackMat(new THREE.MeshStandardMaterial({ map: botTex.shrubTex, alphaTest: 0.42, side: THREE.DoubleSide, roughness: 0.78 }));
    var matGrassTuft   = trackMat(new THREE.MeshStandardMaterial({ map: botTex.grassTex, alphaTest: 0.40, side: THREE.DoubleSide, roughness: 0.88 }));
    var depthTreeLeaf  = trackMat(new THREE.MeshDepthMaterial({ depthPacking: THREE.RGBADepthPacking, map: botTex.treeLeafTex, alphaTest: 0.42, side: THREE.DoubleSide }));
    var depthPalmLeaf  = trackMat(new THREE.MeshDepthMaterial({ depthPacking: THREE.RGBADepthPacking, map: botTex.palmTex, alphaTest: 0.40, side: THREE.DoubleSide }));
    var depthShrubLeaf = trackMat(new THREE.MeshDepthMaterial({ depthPacking: THREE.RGBADepthPacking, map: botTex.shrubTex, alphaTest: 0.42, side: THREE.DoubleSide }));

    var poolWaterMat   = PBR.createPoolWaterMaterial(THREE, trackMat);

    // Emissive Materials (Architectural Warm + Gaming Suite RGB + Screens)
    var matWarmGlow   = trackMat(new THREE.MeshStandardMaterial({ color: 0xFFF4DC, emissive: 0xFFBC6E, emissiveIntensity: 1.0, roughness: 0.30 }));
    var matGardenGlow = trackMat(new THREE.MeshStandardMaterial({ color: 0xFFEBC8, emissive: 0xFFA64C, emissiveIntensity: 0.85, roughness: 0.30 }));
    var matPoolGlow   = trackMat(new THREE.MeshStandardMaterial({ color: 0x9EF4FF, emissive: 0x3ADCF4, emissiveIntensity: 0.9, roughness: 0.20 }));
    var matCyanRGB    = trackMat(new THREE.MeshStandardMaterial({ color: 0x8AF4FF, emissive: 0x26E2FF, emissiveIntensity: 1.15, roughness: 0.20 }));
    var matVioletRGB  = trackMat(new THREE.MeshStandardMaterial({ color: 0xD9A8FF, emissive: 0xA855FF, emissiveIntensity: 1.15, roughness: 0.20 }));
    var matPinkRGB    = trackMat(new THREE.MeshStandardMaterial({ color: 0xFF9DE6, emissive: 0xFF47C2, emissiveIntensity: 1.05, roughness: 0.20 }));

    var matArtWarm      = trackMat(new THREE.MeshStandardMaterial({ map: PBR.makeScreenTex(THREE, trackTex, 'warm'), roughness: 0.82 }));
    var tvTex           = PBR.makeScreenTex(THREE, trackTex, 'tv');
    var studioScreenTex = PBR.makeScreenTex(THREE, trackTex, 'studio');
    var gamingScreenTex = PBR.makeScreenTex(THREE, trackTex, 'gaming');
    var matTV           = trackMat(new THREE.MeshStandardMaterial({ map: tvTex, emissiveMap: tvTex, emissive: 0xFFFFFF, emissiveIntensity: 0.35, roughness: 0.14, envMap: envTex, envMapIntensity: 0.7 }));
    var matStudioScreen = trackMat(new THREE.MeshStandardMaterial({ map: studioScreenTex, emissiveMap: studioScreenTex, emissive: 0xFFFFFF, emissiveIntensity: 0.85, roughness: 0.20 }));
    var matGamingScreen = trackMat(new THREE.MeshStandardMaterial({ map: gamingScreenTex, emissiveMap: gamingScreenTex, emissive: 0xFFFFFF, emissiveIntensity: 1.05, roughness: 0.18 }));

    var lightRefs = {
      reflectiveMats: [matGlass, matMirror, matBrass, matChrome, matStainless, matBronze, matMarble, matCeramic, matCrystal, matBathTile, matGarageFlr, matTV],
      headlightMats: [],
      taillightMats: [],
      rgbMats: [matCyanRGB, matVioletRGB, matPinkRGB],
      screenMats: [matStudioScreen, matGamingScreen]
    };

    /* ---------- Shared Geometry & Placement Helpers ---------- */
    var unitBox   = trackGeo(new THREE.BoxGeometry(1, 1, 1));
    var unitCyl   = trackGeo(new THREE.CylinderGeometry(0.5, 0.5, 1, 22));
    var unitPlane = trackGeo(new THREE.PlaneGeometry(1, 1));

    var vaseGeo      = PBR.makeLatheVessel(THREE, trackGeo, [[0, 0], [0.08, 0], [0.125, 0.12], [0.10, 0.26], [0.045, 0.34], [0.056, 0.38]], 22);
    var plateGeo     = PBR.makeLatheVessel(THREE, trackGeo, [[0, 0], [0.09, 0], [0.14, 0.02], [0.145, 0.026], [0.09, 0.008], [0, 0.008]], 20);
    var wineGlassGeo = PBR.makeLatheVessel(THREE, trackGeo, [[0, 0], [0.036, 0], [0.007, 0.008], [0.006, 0.085], [0.038, 0.118], [0.042, 0.168], [0.034, 0.198]], 16);
    var basinGeo     = PBR.makeLatheVessel(THREE, trackGeo, [[0, 0], [0.15, 0], [0.23, 0.06], [0.25, 0.15], [0.22, 0.15], [0.18, 0.04], [0, 0.03]], 24);
    var toiletGeo    = PBR.makeLatheVessel(THREE, trackGeo, [[0, 0], [0.12, 0.04], [0.19, 0.16], [0.20, 0.34], [0.18, 0.36], [0.14, 0.20], [0, 0.14]], 20);
    var tubGeo       = PBR.makeLatheVessel(THREE, trackGeo, [[0, 0], [0.42, 0], [0.54, 0.18], [0.56, 0.56], [0.51, 0.56], [0.47, 0.16], [0.36, 0.06], [0, 0.06]], 28);
    var potGeo       = PBR.makeLatheVessel(THREE, trackGeo, [[0, 0], [0.20, 0], [0.25, 0.15], [0.27, 0.36], [0.25, 0.48], [0.21, 0.48], [0.21, 0.40], [0, 0.40]], 20);
    var pillowStdGeo = PBR.makePillowGeo(THREE, trackGeo, 0.48, 0.38, 0.16);
    var pillowBedGeo = PBR.makePillowGeo(THREE, trackGeo, 0.74, 0.22, 0.46);

    // Outward-arching resort Areca palm frond (+Z bend matches positive rotation.x!)
    var palmFrondGeo = trackGeo(new THREE.PlaneGeometry(0.68, 1.08, 2, 6));
    (function bendFrond() {
      var fp = palmFrondGeo.attributes.position;
      for (var i = 0; i < fp.count; i++) {
        var y = fp.getY(i) + 0.54, t = y / 1.08;
        fp.setY(i, y * (1.0 - t * 0.26));
        fp.setZ(i, +(t * t) * 0.68);
      }
      palmFrondGeo.computeVertexNormals();
    })();

    function addContactAO(parent, w, d, x, y, z, opacity) {
      var m = new THREE.Mesh(unitPlane, opacity ? trackMat(matContactAO.clone()) : matContactAO);
      if (opacity) m.material.opacity = opacity;
      m.rotation.x = -Math.PI / 2; m.scale.set(w, d, 1); m.position.set(x, y + 0.006, z);
      parent.add(m); return m;
    }

    function addMesh(parent, geo, mat, x, y, z, opts) {
      opts = opts || {};
      var m = new THREE.Mesh(geo, mat);
      m.position.set(x, y, z);
      if (opts.sx || opts.sy || opts.sz) m.scale.set(opts.sx || 1, opts.sy || 1, opts.sz || 1);
      if (opts.rx) m.rotation.x = opts.rx;
      if (opts.ry) m.rotation.y = opts.ry;
      if (opts.rz) m.rotation.z = opts.rz;
      m.castShadow = opts.cast !== false;
      m.receiveShadow = opts.recv !== false;
      if (opts.roomId) { m.userData.roomId = opts.roomId; roomHitMeshes.push(m); }
      if (opts.walkFloor) { m.userData.walkFloor = opts.walkFloor; floorHitMeshes.push(m); }
      parent.add(m); return m;
    }

    function addBox(parent, w, h, d, x, y, z, mat, opts) {
      opts = opts || {};
      opts.sx = w; opts.sy = h; opts.sz = d;
      if (opts.collide) addCollider(opts.collide, x - w * 0.5, x + w * 0.5, z - d * 0.5, z + d * 0.5);
      return addMesh(parent, unitBox, mat, x, y, z, opts);
    }

    function addCyl(parent, rx, h, rz, x, y, z, mat, opts) {
      opts = opts || {};
      opts.sx = rx * 2; opts.sy = h; opts.sz = (rz || rx) * 2;
      return addMesh(parent, unitCyl, mat, x, y, z, opts);
    }

    function addWall(parent, x1, z1, x2, z2, h, t, opts) {
      opts = opts || {};
      var dx = x2 - x1, dz = z2 - z1, len = Math.hypot(dx, dz);
      if (len < 0.05) return;
      var cx = (x1 + x2) * 0.5, cz = (z1 + z2) * 0.5;
      var isZ = Math.abs(dz) > Math.abs(dx);
      var w = isZ ? t : len, d = isZ ? len : t;
      var baseY = opts.baseY || 0;
      addBox(parent, w, h, d, cx, baseY + h * 0.5, cz, opts.mat || matPlasterIn, { collide: opts.noCollide ? 0 : (opts.level || 1) });
      addBox(parent, w + 0.014, 0.05, d + 0.014, cx, baseY + h + 0.025, cz, matWallCap, { cast: false });
      if (!opts.noBaseboard && h > 1.4) {
        addBox(parent, w + 0.026, 0.11, d + 0.026, cx, baseY + 0.09, cz, matWalnut, { cast: false });
        addBox(parent, w + 0.030, 0.015, d + 0.030, cx, baseY + 0.15, cz, matBronze, { cast: false });
      }
    }

    function addPalmPlanter(parent, x, yBase, z, sc, roomId) {
      var g = new THREE.Group(); g.position.set(x, yBase, z);
      addContactAO(parent, 0.78 * sc, 0.78 * sc, x, yBase, z, 0.42);
      addMesh(g, potGeo, matPot, 0, 0, 0, { sx: sc, sy: sc, sz: sc, roomId: roomId });
      addCyl(g, 0.21 * sc, 0.04, 0.21 * sc, 0, 0.42 * sc, 0, matMulch, { cast: false });
      for (var f = 0; f < 11; f++) {
        var ring = f < 5 ? 0 : 1;
        var ang = (f / 11) * Math.PI * 2 + x * 0.7 + ring * 0.4;
        var tilt = ring === 0 ? (0.42 + (f % 3) * 0.14) : (0.86 + (f % 3) * 0.14);
        var fr = new THREE.Mesh(palmFrondGeo, matPalmLeaf);
        fr.scale.setScalar((ring === 0 ? 0.84 : 0.96) * sc);
        fr.position.set(0, (ring === 0 ? 0.46 : 0.40) * sc, 0);
        fr.rotation.order = 'YXZ'; fr.rotation.y = ang; fr.rotation.x = tilt;
        fr.castShadow = true; fr.customDepthMaterial = depthPalmLeaf;
        if (roomId) { fr.userData.roomId = roomId; roomHitMeshes.push(fr); }
        g.add(fr);
      }
      parent.add(g);
    }

    function addLuxuryBedSuite(parent, level, cx, yBase, cz, ry, bedW, bedD, accentMat, roomId) {
      var g = new THREE.Group();
      g.position.set(cx, yBase, cz); g.rotation.y = ry;
      addContactAO(parent, bedW + 0.6, bedD + 0.6, cx, yBase, cz, 0.45);
      addMesh(g, PBR.makeRoundedBoxGeo(THREE, trackGeo, bedW + 0.16, 0.28, bedD + 0.18, 0.04, 3), matWalnut, 0, 0.14, 0, { roomId: roomId });
      addMesh(g, PBR.makeRoundedBoxGeo(THREE, trackGeo, bedW, 0.24, bedD, 0.06, 3), matLinen, 0, 0.39, 0, { roomId: roomId });
      addMesh(g, PBR.makeDuvetGeo(THREE, trackGeo, bedW + 0.06, 0.16, bedD * 0.68), accentMat || matTaupe, 0, 0.47, bedD * 0.17, { roomId: roomId });
      addMesh(g, PBR.makeRoundedBoxGeo(THREE, trackGeo, bedW + 0.44, 1.18, 0.14, 0.04, 3), matTaupe, 0, 0.64, -bedD * 0.5 - 0.06, { roomId: roomId });
      addMesh(g, pillowBedGeo, matBoucle, -bedW * 0.23, 0.57, -bedD * 0.34, { rx: 0.20 });
      addMesh(g, pillowBedGeo, matBoucle,  bedW * 0.23, 0.57, -bedD * 0.34, { rx: 0.20 });
      addMesh(g, pillowStdGeo, matTerracotta, -bedW * 0.18, 0.59, -bedD * 0.19, { rx: 0.28, sx: 0.85, sy: 0.85, sz: 0.85 });
      addMesh(g, pillowStdGeo, matSage,        bedW * 0.18, 0.59, -bedD * 0.19, { rx: 0.28, sx: 0.85, sy: 0.85, sz: 0.85 });
      [-bedW * 0.5 - 0.38, bedW * 0.5 + 0.38].forEach(function (nx) {
        addMesh(g, PBR.makeRoundedBoxGeo(THREE, trackGeo, 0.48, 0.44, 0.44, 0.02, 2), matWalnut, nx, 0.22, -bedD * 0.38);
        addCyl(g, 0.08, 0.16, 0.08, nx, 0.52, -bedD * 0.38, matCeramic);
        addMesh(g, trackGeo(new THREE.SphereGeometry(0.11, 16, 12)), matWarmGlow, nx, 0.68, -bedD * 0.38, { cast: false });
      });
      parent.add(g);
      var halfX = Math.abs(Math.cos(ry)) * (bedW * 0.55) + Math.abs(Math.sin(ry)) * (bedD * 0.55);
      var halfZ = Math.abs(Math.sin(ry)) * (bedW * 0.55) + Math.abs(Math.cos(ry)) * (bedD * 0.55);
      addCollider(level, cx - halfX, cx + halfX, cz - halfZ, cz + halfZ);
    }

    function addBathroomFixtures(parent, level, b, yBase, hasTub) {
      var cx = (b.x1 + b.x2) * 0.5, cz = (b.z1 + b.z2) * 0.5;
      addBox(parent, b.x2 - b.x1 - 0.1, 0.055, b.z2 - b.z1 - 0.1, cx, yBase + 0.028, cz, matBathTile, { cast: false, walkFloor: level });
      var vx = b.x1 + 0.42;
      var vLen = Math.min(1.85, (b.z2 - b.z1) * 0.48);
      addMesh(parent, PBR.makeRoundedBoxGeo(THREE, trackGeo, 0.54, 0.44, vLen, 0.02, 2), matWalnut, vx, yBase + 0.66, b.z1 + vLen * 0.5 + 0.35);
      addMesh(parent, PBR.makeRoundedBoxGeo(THREE, trackGeo, 0.58, 0.055, vLen + 0.04, 0.012, 2), matMarble, vx, yBase + 0.90, b.z1 + vLen * 0.5 + 0.35);
      addMesh(parent, basinGeo, matCeramic, vx + 0.02, yBase + 0.93, b.z1 + vLen * 0.5 + 0.35);
      addBox(parent, 0.22, 0.026, 0.026, vx - 0.10, yBase + 1.14, b.z1 + vLen * 0.5 + 0.35, matBrass);
      addCyl(parent, 0.42, 0.025, 0.42, b.x1 + 0.12, yBase + 1.66, b.z1 + vLen * 0.5 + 0.35, matWarmGlow, { rz: Math.PI / 2, cast: false });
      addCyl(parent, 0.37, 0.032, 0.37, b.x1 + 0.14, yBase + 1.66, b.z1 + vLen * 0.5 + 0.35, matMirror, { rz: Math.PI / 2, cast: false });
      addMesh(parent, toiletGeo, matCeramic, b.x2 - 0.46, yBase + 0.16, b.z1 + 0.65, { sx: 1.2 });
      addBox(parent, 0.02, 0.14, 0.22, b.x2 - 0.14, yBase + 1.06, b.z1 + 0.65, matChrome, { cast: false });
      addBox(parent, 1.15, 2.35, 0.035, b.x2 - 0.65, yBase + 1.22, b.z2 - 1.28, matGlass, { cast: false });
      addCyl(parent, 0.14, 0.025, 0.14, b.x2 - 0.58, yBase + 2.32, b.z2 - 0.65, matBrass, { cast: false });
      addCyl(parent, 0.016, 0.45, 0.016, b.x2 - 0.58, yBase + 2.52, b.z2 - 0.65, matBrass, { cast: false });
      if (hasTub) {
        addMesh(parent, tubGeo, matCeramic, cx - 0.1, yBase + 0.05, b.z2 - 1.15, { sx: 1.58, sz: 0.88 });
        addCyl(parent, 0.018, 0.86, 0.018, cx - 0.1, yBase + 0.48, b.z2 - 0.52, matBrass);
        addBox(parent, 0.03, 0.03, 0.22, cx - 0.1, yBase + 0.88, b.z2 - 0.62, matBrass);
      }
    }

    /* ======================================================================
       2. PROFESSIONAL LANDSCAPING, HILLS, DRIVEWAY, POOL & VEHICLES
       ====================================================================== */
    (function buildSiteAndLandscape() {
      var lawn = new THREE.Mesh(trackGeo(new THREE.PlaneGeometry(240, 240)), matLawn);
      lawn.rotation.x = -Math.PI / 2; lawn.position.set(0, -0.34, 0); lawn.receiveShadow = true;
      gSite.add(lawn);

      var hillGeo = trackGeo(new THREE.RingGeometry(46, 138, 64, 8));
      hillGeo.rotateX(-Math.PI / 2);
      var hp = hillGeo.attributes.position;
      for (var hi = 0; hi < hp.count; hi++) {
        var hx = hp.getX(hi), hz = hp.getZ(hi);
        var dist = Math.hypot(hx, hz), ang = Math.atan2(hz, hx);
        var lift = smoothstep((dist - 48) / 42) * (5.4 + Math.sin(ang * 3.0) * 2.8 + Math.cos(ang * 5.0 + 1.2) * 1.9);
        hp.setY(hi, -0.36 + lift);
      }
      hillGeo.computeVertexNormals();
      var hills = new THREE.Mesh(hillGeo, matHills);
      hills.receiveShadow = true; gSite.add(hills);

      // Architectural Estate Perimeter Walls (North Z = -14.8 for generous pool camera clearance!)
      addBox(gSite, 24.4, 1.85, 0.28, 0.0, 0.58, -14.8, matPlasterOut);
      addBox(gSite, 24.5, 0.07, 0.34, 0.0, 1.54, -14.8, matBronze);
      addBox(gSite, 0.28, 1.75, 26.5, -12.0, 0.53, -1.65, matPlasterOut);
      addBox(gSite, 0.34, 0.07, 26.6, -12.0, 1.44, -1.65, matBronze);
      addBox(gSite, 0.28, 1.75, 26.5, 12.0, 0.53, -1.65, matPlasterOut);
      addBox(gSite, 0.34, 0.07, 26.6, 12.0, 1.44, -1.65, matBronze);
      addBox(gSite, 8.6, 1.55, 0.28, 7.7, 0.44, 11.5, matPlasterOut);
      addBox(gSite, 8.7, 0.07, 0.34, 7.7, 1.25, 11.5, matBronze);
      addBox(gSite, 1.8, 1.55, 0.28, -11.1, 0.44, 11.5, matPlasterOut);
      addBox(gSite, 0.56, 2.20, 0.56, -10.1, 0.76, 11.5, matLimestone);
      addBox(gSite, 0.56, 2.20, 0.56, -1.8, 0.76, 11.5, matLimestone);
      addBox(gSite, 0.56, 2.20, 0.56, 3.4, 0.76, 11.5, matLimestone);
      for (var gl = 0; gl < 9; gl++) addBox(gSite, 0.06, 1.48, 0.05, 4.0 + gl * 0.24, 0.46, 11.5, matCedar);

      // Arrival Driveway + Honed Travertine Stepping-Stone Path
      addBox(gSite, 8.2, 0.09, 10.6, -6.2, -0.30, 10.6, matConcrete, { cast: false, walkFloor: 1 });
      addBox(gSite, 8.6, 0.05, 10.9, -6.2, -0.32, 10.6, matTravertine, { cast: false });
      var stepGeo = PBR.makeRoundedBoxGeo(THREE, trackGeo, 2.95, 0.09, 0.96, 0.025, 2);
      for (var st = 0; st < 7; st++) addMesh(gSite, stepGeo, matTravertine, 1.1, -0.29, 7.2 + st * 1.18, { cast: false, walkFloor: 1 });
      addBox(gSite, 4.8, 0.16, 1.85, 1.1, -0.22, 6.25, matTravertine, { walkFloor: 1 });
      addBox(gSite, 3.9, 0.16, 1.10, 1.1, -0.07, 5.95, matTravertine, { walkFloor: 1 });

      // Rear Outdoor Poolside Terrace & Pergola
      var T = DATA.TERRACE_SPEC;
      addBox(gSite, T.x2 - T.x1, 0.34, T.z2 - T.z1, (T.x1 + T.x2) * 0.5, -0.17, (T.z1 + T.z2) * 0.5, matTravertine, { walkFloor: 1 });
      [[-8.2, -7.4], [-2.2, -7.4]].forEach(function (pp) { addBox(gSite, 0.14, 3.35, 0.14, pp[0], 1.68, pp[1], matBronze); });
      addBox(gSite, 6.2, 0.15, 0.15, -5.2, 3.36, -7.4, matBronze);
      for (var pv = 0; pv < 12; pv++) addBox(gSite, 0.10, 0.06, 2.05, -8.0 + pv * 0.51, 3.36, -6.45, matCedar);
      addMesh(gSite, PBR.makeRoundedBoxGeo(THREE, trackGeo, 2.2, 0.07, 1.05, 0.03, 2), matTeakDeck, -5.2, 0.74, -6.55);
      [[-6.0, -6.95], [-4.4, -6.95], [-6.0, -6.15], [-4.4, -6.15]].forEach(function (lg) { addCyl(gSite, 0.035, 0.72, 0.035, lg[0], 0.36, lg[1], matBronze); });

      // TRUE HOLLOW RECESSED SWIMMING POOL (4 separate coping beams, basin floor at Y = -0.34, water at Y = +0.015!)
      var P = DATA.POOL_SPEC;
      var pw = P.x2 - P.x1, pd = P.z2 - P.z1, pcx = (P.x1 + P.x2) * 0.5, pcz = (P.z1 + P.z2) * 0.5;
      addBox(gSite, pw + 2.4, 0.34, 1.45, pcx, -0.17, P.z1 - 0.85, matTravertine, { walkFloor: 1 });
      addBox(gSite, 1.65, 0.34, pd + 0.5, P.x1 - 0.94, -0.17, pcz, matTravertine, { walkFloor: 1 });
      addBox(gSite, 1.45, 0.34, pd + 0.5, P.x2 + 0.84, -0.17, pcz, matTravertine, { walkFloor: 1 });
      var cw = 0.24, ch = 0.08, cy = 0.015;
      addBox(gSite, pw + cw * 2, ch, cw, pcx, cy, P.z1 - cw * 0.5, matBasalt);
      addBox(gSite, pw + cw * 2, ch, cw, pcx, cy, P.z2 + cw * 0.5, matBasalt);
      addBox(gSite, cw, ch, pd, P.x1 - cw * 0.5, cy, pcz, matBasalt);
      addBox(gSite, cw, ch, pd, P.x2 + cw * 0.5, cy, pcz, matBasalt);
      addBox(gSite, pw + 0.06, 0.06, pd + 0.06, pcx, -0.34, pcz, matPoolTile, { cast: false });
      addBox(gSite, pw + 0.06, 0.36, 0.06, pcx, -0.16, P.z1, matPoolTile, { cast: false });
      addBox(gSite, pw + 0.06, 0.36, 0.06, pcx, -0.16, P.z2, matPoolTile, { cast: false });
      addBox(gSite, 0.06, 0.36, pd + 0.06, P.x1, -0.16, pcz, matPoolTile, { cast: false });
      addBox(gSite, 0.06, 0.36, pd + 0.06, P.x2, -0.16, pcz, matPoolTile, { cast: false });
      addBox(gSite, 0.36, 0.08, 2.2, P.x1 + 0.20, -0.10, pcz, matTravertine, { cast: false });
      addBox(gSite, 0.72, 0.08, 2.2, P.x1 + 0.38, -0.18, pcz, matTravertine, { cast: false });
      addBox(gSite, 1.08, 0.08, 2.2, P.x1 + 0.56, -0.26, pcz, matTravertine, { cast: false });
      var waterMesh = new THREE.Mesh(trackGeo(new THREE.PlaneGeometry(pw - 0.02, pd - 0.02, 34, 24)), poolWaterMat);
      waterMesh.rotation.x = -Math.PI / 2; waterMesh.position.set(pcx, 0.015, pcz);
      gSite.add(waterMesh);
      [2.0, 5.1, 8.2].forEach(function (lx) {
        addCyl(gSite, 0.09, 0.03, 0.09, lx, -0.18, P.z2 - 0.05, matPoolGlow, { rx: Math.PI / 2, cast: false });
      });
      addCollider(1, P.x1 - 0.15, P.x2 + 0.15, P.z1 - 0.15, P.z2 + 0.15);

      // Poolside Sun Loungers
      var lCushGeo = PBR.makeRoundedBoxGeo(THREE, trackGeo, 0.76, 0.11, 1.88, 0.04, 3);
      var lBackGeo = PBR.makeRoundedBoxGeo(THREE, trackGeo, 0.74, 0.46, 0.11, 0.04, 3);
      var lPilGeo  = PBR.makePillowGeo(THREE, trackGeo, 0.46, 0.24, 0.13);
      [2.2, 4.0, 5.8].forEach(function (lx) {
        addContactAO(gSite, 1.15, 2.2, lx, 0.0, -12.45, 0.40);
        addBox(gSite, 0.82, 0.08, 1.96, lx, 0.22, -12.45, matTeakDeck);
        addMesh(gSite, lCushGeo, matBoucle, lx, 0.31, -12.45);
        addMesh(gSite, lBackGeo, matBoucle, lx, 0.52, -13.15, { rx: 0.46 });
        addMesh(gSite, lPilGeo, matTerracotta, lx, 0.55, -13.02, { rx: 0.32 });
      });
      addCyl(gSite, 0.24, 0.34, 0.24, 3.1, 0.17, -12.5, matTravertine);
      addCyl(gSite, 0.24, 0.34, 0.24, 4.9, 0.17, -12.5, matTravertine);

      // Bronze Landscape Bollards
      [[-0.75, 7.6], [2.95, 7.6], [-0.75, 10.6], [2.95, 10.6], [-9.9, 8.2], [-9.9, 10.8],
       [-10.4, -7.8], [-3.2, -10.8], [0.0, -12.4], [10.4, -12.4], [10.8, -7.2]].forEach(function (bp) {
        addCyl(gSite, 0.068, 0.64, 0.068, bp[0], -0.02, bp[1], matBronze);
        addCyl(gSite, 0.056, 0.15, 0.056, bp[0], 0.20, bp[1], matGardenGlow, { cast: false });
        addCyl(gSite, 0.082, 0.03, 0.082, bp[0], 0.30, bp[1], matBronze);
      });

      // Luxury Automotive Display (Porsche 911 Carrera S + Mercedes-Benz G 63 AMG)
      var v0 = DATA.VEHICLES[0];
      var porsche = VEH.buildPorsche911(THREE, trackGeo, trackMat, trackTex, envTex, lightRefs);
      porsche.position.set(v0.pos.x, -0.25, v0.pos.z);
      porsche.rotation.y = v0.pos.ry;
      addContactAO(gSite, 2.55, 5.2, v0.pos.x, -0.25, v0.pos.z, 0.62);
      gSite.add(porsche);
      addCollider(1, v0.pos.x - 1.25, v0.pos.x + 1.25, v0.pos.z - 2.35, v0.pos.z + 2.35);

      var v1 = DATA.VEHICLES[1];
      var gclass = VEH.buildMercedesGClass(THREE, trackGeo, trackMat, trackTex, envTex, lightRefs);
      gclass.position.set(v1.pos.x, 0.05, v1.pos.z);
      gclass.rotation.y = v1.pos.ry;
      addContactAO(gL1, 2.65, 5.4, v1.pos.x, 0.05, v1.pos.z, 0.62);
      gL1.add(gclass);
      addCollider(1, v1.pos.x - 1.15, v1.pos.x + 1.15, v1.pos.z - 2.45, v1.pos.z + 2.45);

      // Organic Branching Tropical Trees + Horizon Grove + Flowering Shrubs + Grass Borders
      var leafCardGeo = trackGeo(new THREE.PlaneGeometry(1.22, 1.22));
      var leafMatrices = [], leafColors = [];
      var dummy = new THREE.Object3D(), colTmp = new THREE.Color();

      function buildOrganicTree(x, z, sc, seed) {
        var rnd = PBR.seededRnd(seed);
        var g = new THREE.Group(); g.position.set(x, -0.34, z);
        addCyl(g, 0.88 * sc, 0.14, 0.88 * sc, 0, 0.07, 0, matTravertine, { cast: false });
        addCyl(g, 0.74 * sc, 0.16, 0.74 * sc, 0, 0.08, 0, matMulch, { cast: false });
        addContactAO(gSite, 5.5 * sc, 5.5 * sc, x, -0.33, z, 0.40);
        var numStems = 2 + (seed % 2), tips = [];
        for (var s = 0; s < numStems; s++) {
          var a0 = (s / numStems) * Math.PI * 2 + rnd() * 0.9;
          var h1 = (3.2 + rnd() * 1.1) * sc, lean = (0.48 + rnd() * 0.48) * sc;
          var tc = new THREE.CatmullRomCurve3([
            new THREE.Vector3(Math.cos(a0) * 0.12 * sc, 0, Math.sin(a0) * 0.12 * sc),
            new THREE.Vector3(Math.cos(a0) * lean * 0.45, h1 * 0.5, Math.sin(a0) * lean * 0.45),
            new THREE.Vector3(Math.cos(a0) * lean, h1, Math.sin(a0) * lean)
          ]);
          var tm = new THREE.Mesh(trackGeo(new THREE.TubeGeometry(tc, 10, 0.11 * sc, 7, false)), matBark);
          tm.castShadow = true; tm.receiveShadow = true; g.add(tm);
          var limbs = 3 + Math.floor(rnd() * 2);
          for (var l = 0; l < limbs; l++) {
            var la = a0 + (l - (limbs - 1) * 0.5) * 1.18 + (rnd() - 0.5) * 0.42;
            var lLen = (1.4 + rnd() * 0.9) * sc, lRise = (0.8 + rnd() * 0.7) * sc;
            var lp0 = tc.getPoint(0.66 + rnd() * 0.30);
            var lp1 = new THREE.Vector3(lp0.x + Math.cos(la) * lLen * 0.55, lp0.y + lRise * 0.62, lp0.z + Math.sin(la) * lLen * 0.55);
            var lp2 = new THREE.Vector3(lp0.x + Math.cos(la) * lLen, lp0.y + lRise, lp0.z + Math.sin(la) * lLen);
            var lm = new THREE.Mesh(trackGeo(new THREE.TubeGeometry(new THREE.CatmullRomCurve3([lp0, lp1, lp2]), 7, 0.055 * sc, 6, false)), matBark);
            lm.castShadow = true; g.add(lm);
            tips.push({ x: x + lp2.x, y: -0.34 + lp2.y, z: z + lp2.z, r: (1.0 + rnd() * 0.45) * sc });
            tips.push({ x: x + lp1.x, y: -0.34 + lp1.y + 0.28 * sc, z: z + lp1.z, r: 0.75 * sc });
          }
        }
        gSite.add(g);
        tips.forEach(function (tip) {
          for (var c = 0; c < 14; c++) {
            var phi = rnd() * Math.PI * 2, costh = (rnd() - 0.35) * 1.4, rad = Math.pow(rnd(), 0.65) * tip.r;
            dummy.position.set(tip.x + Math.cos(phi) * rad, tip.y + costh * tip.r * 0.45, tip.z + Math.sin(phi) * rad);
            dummy.rotation.set((rnd() - 0.5) * 1.35, rnd() * Math.PI * 2, (rnd() - 0.5) * 1.1);
            var sc2 = (0.76 + rnd() * 0.58) * sc; dummy.scale.set(sc2, sc2, sc2); dummy.updateMatrix();
            leafMatrices.push(dummy.matrix.clone());
            var sm = clamp((costh + 0.5) * 0.65 + rnd() * 0.25, 0, 1);
            colTmp.setRGB(lerp(0.62, 1.08, sm), lerp(0.68, 1.06, sm), lerp(0.62, 0.96, sm));
            leafColors.push(colTmp.clone());
          }
        });
      }

      buildOrganicTree(10.2, 8.8, 1.15, 111);
      buildOrganicTree(-15.2, 7.6, 1.25, 223);
      buildOrganicTree(15.4, 1.2, 1.18, 337);
      buildOrganicTree(-15.0, -3.5, 1.12, 449);
      buildOrganicTree(-9.8, -11.4, 1.22, 563);
      buildOrganicTree(-1.8, -11.8, 0.92, 677);
      buildOrganicTree(14.8, -10.8, 1.20, 787);
      buildOrganicTree(15.6, 12.6, 1.08, 899);

      var groveRnd = PBR.seededRnd(9291);
      for (var gt = 0; gt < 28; gt++) {
        var ga = (gt / 28) * Math.PI * 2 + groveRnd() * 0.16, gd = 34 + groveRnd() * 24;
        var gx = Math.cos(ga) * gd, gz = Math.sin(ga) * gd, gsc = 1.45 + groveRnd() * 0.95;
        addCyl(gSite, 0.18 * gsc, 3.8 * gsc, 0.18 * gsc, gx, -0.34 + 1.9 * gsc, gz, matBark, { cast: false });
        for (var gc = 0; gc < 16; gc++) {
          var gphi = groveRnd() * Math.PI * 2, grd = Math.pow(groveRnd(), 0.55) * 2.3 * gsc;
          dummy.position.set(gx + Math.cos(gphi) * grd, 2.5 * gsc + groveRnd() * 2.4 * gsc, gz + Math.sin(gphi) * grd);
          dummy.rotation.set((groveRnd() - 0.5) * 1.15, groveRnd() * Math.PI * 2, (groveRnd() - 0.5) * 0.95);
          var gs2 = (1.85 + groveRnd() * 1.05) * gsc; dummy.scale.set(gs2, gs2, gs2); dummy.updateMatrix();
          leafMatrices.push(dummy.matrix.clone());
          colTmp.setRGB(0.68 + groveRnd() * 0.28, 0.76 + groveRnd() * 0.24, 0.66 + groveRnd() * 0.22);
          leafColors.push(colTmp.clone());
        }
      }

      var treeInst = new THREE.InstancedMesh(leafCardGeo, matTreeLeaf, leafMatrices.length);
      treeInst.castShadow = true; treeInst.receiveShadow = true; treeInst.customDepthMaterial = depthTreeLeaf;
      for (var li = 0; li < leafMatrices.length; li++) { treeInst.setMatrixAt(li, leafMatrices[li]); treeInst.setColorAt(li, leafColors[li]); }
      treeInst.instanceMatrix.needsUpdate = true; if (treeInst.instanceColor) treeInst.instanceColor.needsUpdate = true;
      gSite.add(treeInst);

      var beds = [
        [6.6, 6.4, 5.4, 1.10], [6.6, 10.3, 5.6, 1.05],
        [-2.2, 6.4, 2.2, 1.00], [-6.6, -12.4, 5.4, 1.10],
        [10.8, -5.0, 1.05, 5.2], [-10.9, -4.6, 1.05, 5.2]
      ];
      var shrubCardGeo = trackGeo(new THREE.PlaneGeometry(0.92, 0.86));
      var shrubMats = [], shrubCols = [];
      beds.forEach(function (bd, bi) {
        var rnd = PBR.seededRnd(bi * 151 + 29);
        addBox(gSite, bd[2] + 0.34, 0.18, bd[3] + 0.28, bd[0], -0.25, bd[1], matTravertine, { cast: false });
        addBox(gSite, bd[2] + 0.10, 0.20, bd[3] + 0.06, bd[0], -0.24, bd[1], matMulch, { cast: false });
        for (var k = 0; k < 38; k++) {
          var s = 0.65 + rnd() * 0.54;
          dummy.position.set(bd[0] + (rnd() - 0.5) * (bd[2] - 0.2), -0.14 + s * 0.34, bd[1] + (rnd() - 0.5) * (bd[3] - 0.2));
          dummy.rotation.set((rnd() - 0.5) * 0.45, rnd() * Math.PI * 2, (rnd() - 0.5) * 0.35);
          dummy.scale.set(s, s * (0.85 + rnd() * 0.35), s); dummy.updateMatrix();
          shrubMats.push(dummy.matrix.clone());
          colTmp.setRGB(0.76 + rnd() * 0.28, 0.82 + rnd() * 0.24, 0.74 + rnd() * 0.22);
          shrubCols.push(colTmp.clone());
        }
      });
      var shrubInst = new THREE.InstancedMesh(shrubCardGeo, matShrubLeaf, shrubMats.length);
      shrubInst.castShadow = true; shrubInst.receiveShadow = true; shrubInst.customDepthMaterial = depthShrubLeaf;
      for (var si = 0; si < shrubMats.length; si++) { shrubInst.setMatrixAt(si, shrubMats[si]); shrubInst.setColorAt(si, shrubCols[si]); }
      shrubInst.instanceMatrix.needsUpdate = true; if (shrubInst.instanceColor) shrubInst.instanceColor.needsUpdate = true;
      gSite.add(shrubInst);

      var grassGeo = trackGeo(new THREE.PlaneGeometry(0.42, 0.28));
      var gRnd = PBR.seededRnd(4499), gMats = [], gCols = [];
      function addGrassBorder(cx, cz, rx, rz, cnt) {
        for (var k = 0; k < cnt; k++) {
          var px = cx + (gRnd() - 0.5) * rx * 2, pz = cz + (gRnd() - 0.5) * rz * 2;
          var sc = 0.72 + gRnd() * 0.55, rot = gRnd() * Math.PI;
          var cR = 0.85 + gRnd() * 0.22, cG = 0.90 + gRnd() * 0.18, cB = 0.78 + gRnd() * 0.18;
          for (var x2 = 0; x2 < 2; x2++) {
            dummy.position.set(px, -0.34 + 0.12 * sc, pz);
            dummy.rotation.set(0, rot + x2 * Math.PI * 0.5, (gRnd() - 0.5) * 0.12);
            dummy.scale.set(sc, sc, sc); dummy.updateMatrix();
            gMats.push(dummy.matrix.clone()); colTmp.setRGB(cR, cG, cB); gCols.push(colTmp.clone());
          }
        }
      }
      addGrassBorder(-11.4, -1.0, 0.45, 11.5, 44);
      addGrassBorder(11.4, -1.0, 0.45, 11.5, 44);
      addGrassBorder(-1.0, 8.8, 0.35, 2.6, 18);
      addGrassBorder(3.2, 8.8, 0.35, 2.6, 18);
      [[10.2, 8.8], [-9.8, -11.4], [-1.8, -11.8]].forEach(function (tr) { addGrassBorder(tr[0], tr[1], 1.3, 1.3, 12); });
      var grassInst = new THREE.InstancedMesh(grassGeo, matGrassTuft, gMats.length);
      grassInst.receiveShadow = true;
      for (var gj = 0; gj < gMats.length; gj++) { grassInst.setMatrixAt(gj, gMats[gj]); grassInst.setColorAt(gj, gCols[gj]); }
      grassInst.instanceMatrix.needsUpdate = true; if (grassInst.instanceColor) grassInst.instanceColor.needsUpdate = true;
      gSite.add(grassInst);
    })();

    /* ======================================================================
       3. GROUND FLOOR (LEVEL 1 · Y = 0.00..3.60 m · 11 FURNISHED ROOMS)
       ====================================================================== */
    var H1 = 3.45, T_OUT = 0.26, T_IN = 0.16;
    var pivotDoorGroup = new THREE.Group();

    (function buildGroundFloor() {
      addBox(gL1, 20.5, 0.34, 11.5, 0.0, -0.17, 0.0, matTravertine);
      addBox(gL1, 6.4, 0.34, 1.4, -7.0, -0.17, 5.95, matConcrete);
      addContactAO(gL1, 22.8, 14.0, 0.0, -0.33, 0.0, 0.56);

      DATA.ROOMS.forEach(function (rm) {
        if (rm.level !== 1) return;
        var b = rm.bounds;
        var fm = (rm.id === 'garage') ? matGarageFlr :
                 (rm.id === 'foyer' || rm.id === 'kitchen' || rm.id === 'laundry' || rm.id === 'storage') ? matTravertine :
                 (rm.id === 'guestBath') ? matBathTile :
                 (rm.id === 'office') ? matWalnut : matOak;
        addBox(gL1, b.x2 - b.x1, 0.05, b.z2 - b.z1, (b.x1 + b.x2) * 0.5, 0.025, (b.z1 + b.z2) * 0.5, fm, { cast: false, roomId: rm.id, walkFloor: 1 });
      });

      // Exterior Structural Walls & Floor-to-Ceiling Glazing
      addWall(gL1, -10.0, 6.5, -10.0, -5.5, H1, T_OUT, { mat: matPlasterOut });
      addWall(gL1, -10.0, 6.5, -9.45, 6.5, H1, T_OUT, { mat: matLimestone });
      addWall(gL1, -4.55, 6.5, -4.0, 6.5, H1, T_OUT, { mat: matLimestone });
      addBox(gL1, 5.05, 0.65, 0.28, -7.0, 3.16, 6.5, matConcrete);
      addBox(gL1, 4.92, 0.08, 2.35, -7.0, 2.74, 5.15, matBronze);
      for (var gs = 0; gs < 11; gs++) addBox(gL1, 4.82, 0.04, 0.16, -7.0, 2.70, 4.10 + gs * 0.21, matCedar);
      addWall(gL1, -4.0, 6.5, -4.0, 5.5, H1, T_OUT, { mat: matLimestone });
      addWall(gL1, -4.0, 5.5, -1.0, 5.5, 0.92, T_OUT, { mat: matLimestone });
      addBox(gL1, 2.95, 2.45, 0.045, -2.5, 2.18, 5.5, matGlass, { cast: false });
      addBox(gL1, 3.04, 0.10, 0.16, -2.5, 3.42, 5.5, matBronze);

      // Grand Foyer Entrance Frame + Animated Walnut Pivot Front Door
      addWall(gL1, -1.0, 5.5, 0.15, 5.5, H1, T_OUT, { mat: matLimestone });
      addWall(gL1, 2.05, 5.5, 3.0, 5.5, H1, T_OUT, { mat: matLimestone });
      addBox(gL1, 2.04, 0.12, 0.32, 1.1, 2.90, 5.5, matBronze);
      addBox(gL1, 0.09, 2.90, 0.30, 0.15, 1.45, 5.5, matBronze);
      addBox(gL1, 0.09, 2.90, 0.30, 2.05, 1.45, 5.5, matBronze);
      addBox(gL1, 1.86, 0.56, 0.05, 1.1, 3.22, 5.5, matGlass, { cast: false });
      pivotDoorGroup.position.set(0.28, 0.05, 5.5);
      addMesh(pivotDoorGroup, PBR.makeRoundedBoxGeo(THREE, trackGeo, 1.72, 2.80, 0.09, 0.015, 2), matWalnut, 0.80, 1.40, 0);
      addBox(pivotDoorGroup, 0.036, 1.15, 0.12, 1.48, 1.38, 0, matBrass);
      addBox(pivotDoorGroup, 0.04, 0.14, 0.12, 0.02, 0.45, 0, matBronze);
      addBox(pivotDoorGroup, 0.04, 0.14, 0.12, 0.02, 2.35, 0, matBronze);
      gL1.add(pivotDoorGroup);

      addWall(gL1, 3.0, 5.5, 4.1, 5.5, H1, T_OUT, { mat: matPlasterOut });
      addWall(gL1, 4.1, 5.5, 6.7, 5.5, 0.88, T_OUT, { mat: matPlasterOut });
      addBox(gL1, 2.6, 2.48, 0.045, 5.4, 2.16, 5.5, matGlass, { cast: false });
      addBox(gL1, 2.66, 0.09, 0.15, 5.4, 3.42, 5.5, matBronze);
      addWall(gL1, 6.7, 5.5, 10.0, 5.5, H1, T_OUT, { mat: matPlasterOut });
      addWall(gL1, 10.0, 5.5, 10.0, -1.8, H1, T_OUT, { mat: matPlasterOut });
      addWall(gL1, 10.0, -1.8, 10.0, -5.5, 0.86, T_OUT, { mat: matPlasterOut });
      addBox(gL1, 0.045, 2.52, 3.7, 10.0, 2.16, -3.65, matGlass, { cast: false });
      addBox(gL1, 0.14, 0.10, 3.76, 10.0, 3.42, -3.65, matBronze);

      // North Poolside Panoramic Glass Elevation
      addWall(gL1, -10.0, -5.5, -6.8, -5.5, H1, T_OUT, { mat: matPlasterOut });
      addBox(gL1, 16.8, 0.12, 0.16, 1.6, 3.44, -5.5, matBronze);
      addBox(gL1, 6.4, 3.34, 0.045, -3.6, 1.72, -5.5, matGlass, { cast: false, collide: 1 });
      addBox(gL1, 5.8, 3.34, 0.045, 7.1, 1.72, -5.5, matGlass, { cast: false, collide: 1 });
      [-6.8, -4.4, -2.0, -0.4, 4.2, 6.8, 9.95].forEach(function (mx) { addBox(gL1, 0.08, 3.44, 0.12, mx, 1.72, -5.5, matBronze); });
      var tallCurtain = PBR.makeCurtainGeo(THREE, trackGeo, 1.25, 3.32, 7);
      addMesh(gL1, tallCurtain, matSheer, 6.2, 1.72, -5.28, { cast: false });
      addMesh(gL1, tallCurtain, matSheer, -6.2, 1.72, -5.28, { cast: false });

      // Interior Partitions with Wide Clear Doorways
      addWall(gL1, -10.0, 0.5, -5.6, 0.5, H1, T_IN);
      addWall(gL1, -4.3, 0.5, -3.4, 0.5, H1, T_IN);
      addWall(gL1, -2.1, 0.5, -1.0, 0.5, H1, T_IN);
      addWall(gL1, 3.0, 0.5, 4.6, 0.5, H1, T_IN);
      addWall(gL1, 5.9, 0.5, 10.0, 0.5, H1, T_IN);
      addWall(gL1, -4.0, 0.5, -4.0, 5.5, H1, T_IN);
      addWall(gL1, -1.0, 2.2, -1.0, 5.5, H1, T_IN);
      addWall(gL1, 3.0, 2.2, 3.0, 5.5, H1, T_IN);
      addWall(gL1, 7.4, 0.5, 7.4, 3.2, H1, T_IN);
      addWall(gL1, 7.4, 4.4, 7.4, 5.5, H1, T_IN);
      addWall(gL1, -7.0, -5.5, -7.0, -3.8, H1, T_IN);
      addWall(gL1, -7.0, -2.6, -7.0, -1.5, H1, T_IN);
      addWall(gL1, -10.0, -2.5, -7.0, -2.5, H1, T_IN);

      /* --- ROOM 01: GRAND FOYER & FLOATING STAIRCASE (L1 -> L2) --- */
      addMesh(gL1, PBR.makeRoundedBoxGeo(THREE, trackGeo, 1.55, 0.06, 0.44, 0.015, 2), matTravertine, 2.22, 0.84, 3.4, { ry: Math.PI / 2, roomId: 'foyer' });
      addBox(gL1, 0.40, 0.80, 0.08, 2.22, 0.42, 4.02, matWalnut);
      addBox(gL1, 0.40, 0.80, 0.08, 2.22, 0.42, 2.78, matWalnut);
      addMesh(gL1, vaseGeo, matCeramic, 2.22, 0.88, 3.4, { sx: 1.05, sy: 1.05, sz: 1.05 });
      addMesh(gL1, PBR.makeRoundedBoxGeo(THREE, trackGeo, 0.05, 1.48, 1.18, 0.015, 2), matBronze, 2.86, 1.88, 3.4);
      addBox(gL1, 0.02, 1.36, 1.06, 2.83, 1.88, 3.4, matArtWarm, { cast: false });
      var S1 = DATA.STAIR_L1_L2;
      var s1cx = (S1.x1 + S1.x2) * 0.5, s1w = S1.x2 - S1.x1;
      var s1diag = Math.hypot(S1.zEnd - S1.zStart, S1.yEnd - S1.yStart), s1p = Math.atan2(S1.yEnd - S1.yStart, Math.abs(S1.zEnd - S1.zStart));
      addBox(gL1, 0.14, 0.22, s1diag, s1cx, (S1.yStart + S1.yEnd) * 0.5 - 0.16, (S1.zStart + S1.zEnd) * 0.5, matBronze, { rx: s1p });
      var tread1Geo = PBR.makeRoundedBoxGeo(THREE, trackGeo, s1w, 0.075, 0.28, 0.014, 2);
      for (var t1 = 0; t1 < S1.steps; t1++) {
        var f1 = (t1 + 0.5) / S1.steps;
        addMesh(gL1, tread1Geo, matWalnut, s1cx, lerp(S1.yStart, S1.yEnd, f1), lerp(S1.zStart, S1.zEnd, f1), { walkFloor: 1 });
      }
      addBox(gL1, 0.038, 0.92, s1diag - 0.22, S1.x2 + 0.02, (S1.yStart + S1.yEnd) * 0.5 + 0.44, (S1.zStart + S1.zEnd) * 0.5, matGlass, { rx: s1p, cast: false });
      addBox(gL1, 0.055, 0.055, s1diag - 0.18, S1.x2 + 0.02, (S1.yStart + S1.yEnd) * 0.5 + 0.92, (S1.zStart + S1.zEnd) * 0.5, matBronze, { rx: s1p });

      /* --- ROOM 02: DOUBLE-HEIGHT LIVING ROOM (7.0 m Volume) --- */
      addBox(gL1, 4.4, 0.022, 3.8, 4.15, 0.062, -2.55, matRug, { cast: false, roomId: 'living', walkFloor: 1 });
      addBox(gL1, 3.45, 6.75, 0.24, 4.15, 3.42, 0.30, matTravertine, { roomId: 'living' });
      addMesh(gL1, PBR.makeRoundedBoxGeo(THREE, trackGeo, 2.35, 1.32, 0.06, 0.015, 2), matMatteBlack, 4.15, 1.85, 0.14);
      addBox(gL1, 2.24, 1.22, 0.02, 4.15, 1.85, 0.10, matTV, { cast: false });
      addMesh(gL1, PBR.makeRoundedBoxGeo(THREE, trackGeo, 3.1, 0.42, 0.50, 0.02, 2), matWalnut, 4.15, 0.26, -0.04);
      addBox(gL1, 1.35, 0.06, 0.12, 4.15, 0.50, -0.02, matWarmGlow, { cast: false });
      var seatG = PBR.makeRoundedBoxGeo(THREE, trackGeo, 0.96, 0.22, 0.92, 0.075, 3);
      var backG = PBR.makeRoundedBoxGeo(THREE, trackGeo, 0.94, 0.44, 0.24, 0.075, 3);
      addContactAO(gL1, 3.5, 1.3, 4.15, 0.075, -3.95, 0.45);
      addBox(gL1, 2.95, 0.12, 0.94, 4.15, 0.13, -3.95, matWalnut, { collide: 1 });
      [3.18, 4.15, 5.12].forEach(function (sx) {
        addMesh(gL1, seatG, matBoucle, sx, 0.31, -3.95, { roomId: 'living' });
        addMesh(gL1, backG, matBoucle, sx, 0.60, -4.32, { rx: -0.14, roomId: 'living' });
      });
      addBox(gL1, 0.94, 0.12, 2.05, 5.12, 0.13, -2.55, matWalnut, { collide: 1 });
      [-3.02, -2.06].forEach(function (sz) {
        addMesh(gL1, seatG, matBoucle, 5.12, 0.31, sz, { ry: Math.PI / 2, roomId: 'living' });
        addMesh(gL1, backG, matBoucle, 5.49, 0.60, sz, { ry: Math.PI / 2, rz: 0.14, roomId: 'living' });
      });
      addMesh(gL1, pillowStdGeo, matTerracotta, 3.24, 0.56, -4.08, { ry: 0.22, rx: -0.22 });
      addMesh(gL1, pillowStdGeo, matTaupe,      4.15, 0.56, -4.10, { rx: -0.22 });
      addMesh(gL1, pillowStdGeo, matSage,       5.02, 0.56, -4.06, { ry: -0.24, rx: -0.22 });
      addMesh(gL1, pillowStdGeo, matTerracotta, 5.26, 0.56, -2.28, { ry: -Math.PI * 0.5 + 0.15, rx: -0.22 });
      addContactAO(gL1, 1.8, 1.25, 3.72, 0.075, -2.42, 0.45);
      addMesh(gL1, PBR.makeRoundedBoxGeo(THREE, trackGeo, 1.52, 0.07, 0.94, 0.032, 3), matTravertine, 3.72, 0.42, -2.42, { roomId: 'living' });
      addCollider(1, 2.95, 4.48, -2.90, -1.94);
      addCyl(gL1, 0.20, 0.36, 0.20, 3.28, 0.21, -2.42, matTravertine);
      addCyl(gL1, 0.20, 0.36, 0.20, 4.16, 0.21, -2.42, matTravertine);
      addMesh(gL1, vaseGeo, matCeramic, 3.52, 0.46, -2.42, { sx: 0.85, sy: 0.85, sz: 0.85 });
      addMesh(gL1, PBR.makeRoundedBoxGeo(THREE, trackGeo, 0.36, 0.04, 0.26, 0.008, 2), matBoucle, 3.96, 0.47, -2.38, { ry: 0.18 });
      addMesh(gL1, PBR.makeRoundedBoxGeo(THREE, trackGeo, 0.78, 0.14, 0.76, 0.05, 3), matBoucle, 2.38, 0.42, -2.35, { ry: 0.72, roomId: 'living' });
      addMesh(gL1, PBR.makeRoundedBoxGeo(THREE, trackGeo, 0.76, 0.44, 0.16, 0.05, 3), matBoucle, 2.18, 0.66, -2.55, { ry: 0.72, rx: 0.18, roomId: 'living' });
      addPalmPlanter(gL1, 6.25, 0.05, -0.35, 1.05, 'living');

      /* --- ROOM 03: MUSIC & FAMILY LOUNGE (Zikri's Acoustic Guitar + Fluted Vinyl Console!) --- */
      addBox(gL1, 2.65, 0.022, 3.6, 8.4, 0.062, -2.45, matRug, { cast: false, roomId: 'family', walkFloor: 1 });
      addMesh(gL1, PBR.makeRoundedBoxGeo(THREE, trackGeo, 2.05, 0.34, 0.90, 0.06, 3), matTaupe, 8.35, 0.24, -3.85, { roomId: 'family' });
      addMesh(gL1, PBR.makeRoundedBoxGeo(THREE, trackGeo, 2.05, 0.44, 0.24, 0.06, 3), matTaupe, 8.35, 0.58, -4.22, { rx: -0.12 });
      addMesh(gL1, pillowStdGeo, matTerracotta, 7.82, 0.54, -4.02, { ry: 0.24, rx: -0.22 });
      addMesh(gL1, pillowStdGeo, matOchre,      8.86, 0.54, -4.02, { ry: -0.20, rx: -0.22 });
      addMesh(gL1, PBR.makeRoundedBoxGeo(THREE, trackGeo, 1.08, 0.065, 0.68, 0.025, 2), matTravertine, 8.35, 0.42, -2.45, { roomId: 'family' });
      addCyl(gL1, 0.14, 0.36, 0.14, 8.35, 0.22, -2.45, matWalnut);
      // Fluted Walnut Vinyl Turntable Console along South Partition
      addMesh(gL1, PBR.makeRoundedBoxGeo(THREE, trackGeo, 1.98, 0.54, 0.50, 0.02, 2), matWalnut, 8.20, 0.34, 0.02, { roomId: 'family', collide: 1 });
      for (var vf = 0; vf < 12; vf++) addBox(gL1, 0.03, 0.44, 0.02, 7.36 + vf * 0.15, 0.34, -0.23, matCedar);
      addBox(gL1, 0.50, 0.075, 0.38, 7.75, 0.65, 0.02, matMatteBlack);
      addCyl(gL1, 0.145, 0.018, 0.145, 7.73, 0.70, 0.02, matCharcoal); // Vinyl platter
      addMesh(gL1, PBR.makeRoundedBoxGeo(THREE, trackGeo, 1.18, 1.02, 0.05, 0.012, 2), matBronze, 8.20, 1.66, 0.34);
      addBox(gL1, 1.06, 0.90, 0.02, 8.20, 1.66, 0.30, matArtWarm, { cast: false });
      // Sculpted Acoustic Guitar on Walnut A-Frame Stand
      var gtr = new THREE.Group(); gtr.position.set(9.35, 0.05, -0.82); gtr.rotation.y = -0.78;
      addCyl(gtr, 0.21, 0.11, 0.21, 0, 0.31, 0.01, matCedar, { rx: Math.PI / 2 - 0.18, roomId: 'family' });
      addCyl(gtr, 0.16, 0.11, 0.16, 0, 0.52, -0.02, matCedar, { rx: Math.PI / 2 - 0.18, roomId: 'family' });
      addCyl(gtr, 0.055, 0.02, 0.055, 0, 0.46, 0.055, matMatteBlack, { rx: Math.PI / 2 - 0.18, cast: false });
      addBox(gtr, 0.068, 0.56, 0.038, 0, 0.90, -0.09, matWalnut, { rx: -0.18 });
      addBox(gtr, 0.095, 0.15, 0.036, 0, 1.20, -0.14, matMatteBlack, { rx: -0.18 });
      addBox(gtr, 0.34, 0.045, 0.32, 0, 0.10, -0.04, matBronze);
      gL1.add(gtr);
      // Curved Brass Arc Floor Lamp
      addCyl(gL1, 0.20, 0.05, 0.20, 9.48, 0.075, -4.35, matTravertine);
      var fLampArc = new THREE.CatmullRomCurve3([
        new THREE.Vector3(9.48, 0.10, -4.35), new THREE.Vector3(9.48, 1.68, -4.35),
        new THREE.Vector3(9.36, 2.00, -4.20), new THREE.Vector3(9.18, 1.94, -4.02)
      ]);
      addMesh(gL1, trackGeo(new THREE.TubeGeometry(fLampArc, 14, 0.015, 8, false)), matBrass, 0, 0, 0);
      addMesh(gL1, PBR.makeLatheVessel(THREE, trackGeo, [[0.16, 0], [0.20, 0.24], [0.19, 0.24], [0.15, 0]], 20), matWarmGlow, 9.18, 1.69, -4.02, { cast: false });

      /* --- ROOM 04: FORMAL 8-SEAT DINING ROOM --- */
      addBox(gL1, 3.2, 0.022, 3.6, -0.5, 0.062, -2.65, matRug, { cast: false, roomId: 'dining', walkFloor: 1 });
      addContactAO(gL1, 2.8, 1.65, -0.5, 0.075, -2.65, 0.48);
      addMesh(gL1, PBR.makeRoundedBoxGeo(THREE, trackGeo, 2.55, 0.08, 1.18, 0.032, 3), matWalnut, -0.5, 0.77, -2.65, { roomId: 'dining' });
      addCollider(1, -1.80, 0.80, -3.26, -2.04);
      [[-1.45, -3.08], [0.45, -3.08], [-1.45, -2.22], [0.45, -2.22]].forEach(function (lg) { addCyl(gL1, 0.045, 0.75, 0.045, lg[0], 0.37, lg[1], matWalnut); });
      addMesh(gL1, vaseGeo, matCeramic, -0.5, 0.81, -2.65, { sx: 0.95, sy: 0.95, sz: 0.95 });
      [-1.22, -0.50, 0.22].forEach(function (px) {
        addMesh(gL1, plateGeo, matCeramic, px, 0.81, -2.96, { cast: false });
        addMesh(gL1, plateGeo, matCeramic, px, 0.81, -2.34, { cast: false });
        addMesh(gL1, wineGlassGeo, matCrystal, px + 0.16, 0.81, -2.86, { cast: false });
        addMesh(gL1, wineGlassGeo, matCrystal, px + 0.16, 0.81, -2.44, { cast: false });
      });
      var dSeatG = PBR.makeRoundedBoxGeo(THREE, trackGeo, 0.46, 0.065, 0.44, 0.03, 3);
      var wishC = new THREE.CatmullRomCurve3([new THREE.Vector3(-0.22, 0.58, 0.12), new THREE.Vector3(-0.22, 0.78, -0.14), new THREE.Vector3(0, 0.82, -0.21), new THREE.Vector3(0.22, 0.78, -0.14), new THREE.Vector3(0.22, 0.58, 0.12)]);
      var wishG = trackGeo(new THREE.TubeGeometry(wishC, 16, 0.022, 8, false));
      [[-1.22, -3.38, 0], [-0.50, -3.38, 0], [0.22, -3.38, 0], [-1.22, -1.92, Math.PI], [-0.50, -1.92, Math.PI], [0.22, -1.92, Math.PI]].forEach(function (ch) {
        var cg = new THREE.Group(); cg.position.set(ch[0], 0.05, ch[1]); cg.rotation.y = ch[2];
        addMesh(cg, dSeatG, matBoucle, 0, 0.44, 0, { roomId: 'dining' });
        addMesh(cg, wishG, matWalnut, 0, 0, 0, { roomId: 'dining' });
        [[-0.18, -0.17], [0.18, -0.17], [-0.18, 0.17], [0.18, 0.17]].forEach(function (cl) { addCyl(cg, 0.018, 0.44, 0.018, cl[0], 0.22, cl[1], matWalnut); });
        gL1.add(cg);
      });
      addMesh(gL1, PBR.makeRoundedBoxGeo(THREE, trackGeo, 2.2, 0.78, 0.48, 0.02, 2), matWalnut, -0.5, 0.44, 0.10);
      addBox(gL1, 1.95, 0.05, 0.06, -0.5, 2.38, -2.65, matBrass);
      addBox(gL1, 1.85, 0.03, 0.04, -0.5, 2.35, -2.65, matWarmGlow, { cast: false });

      /* --- ROOM 05: CHEF'S LUXURY KITCHEN & COFFEE BAR --- */
      addBox(gL1, 0.72, 2.55, 1.25, -6.52, 1.32, -4.65, matCharcoal, { roomId: 'kitchen', collide: 1 });
      addMesh(gL1, PBR.makeRoundedBoxGeo(THREE, trackGeo, 0.04, 2.38, 0.56, 0.008, 2), matStainless, -6.14, 1.32, -4.94);
      addMesh(gL1, PBR.makeRoundedBoxGeo(THREE, trackGeo, 0.04, 1.18, 0.56, 0.008, 2), matStainless, -6.14, 1.92, -4.34);
      addBox(gL1, 0.05, 0.84, 0.02, -6.10, 1.56, -4.68, matBrass);
      addBox(gL1, 0.05, 0.84, 0.02, -6.10, 1.56, -4.60, matBrass);
      addBox(gL1, 0.05, 0.58, 0.54, -6.14, 0.98, -4.34, matMatteBlack);
      addBox(gL1, 0.02, 0.38, 0.40, -6.10, 0.94, -4.34, matGlass, { cast: false });
      addBox(gL1, 3.65, 0.88, 0.72, -4.85, 0.49, 0.02, matWalnut, { roomId: 'kitchen', collide: 1 });
      addMesh(gL1, PBR.makeRoundedBoxGeo(THREE, trackGeo, 3.72, 0.07, 0.78, 0.014, 2), matMarble, -4.85, 0.96, 0.02);
      addBox(gL1, 3.72, 0.88, 0.05, -4.85, 1.44, 0.36, matMarble, { cast: false });
      addBox(gL1, 3.65, 0.76, 0.38, -4.85, 2.38, 0.18, matWalnut);
      addBox(gL1, 0.86, 0.018, 0.54, -5.55, 1.005, 0.02, matMatteBlack, { cast: false });
      addBox(gL1, 0.96, 0.34, 0.58, -5.55, 2.15, 0.05, matBronze);
      addBox(gL1, 0.36, 1.05, 0.34, -5.55, 2.84, 0.12, matBronze);
      addBox(gL1, 0.68, 0.025, 0.46, -4.05, 1.00, 0.02, matStainless, { cast: false });
      addBox(gL1, 0.58, 0.03, 0.38, -4.05, 0.992, 0.02, matCharcoal, { cast: false });
      var kFaucet = new THREE.CatmullRomCurve3([new THREE.Vector3(-4.05, 0.99, 0.24), new THREE.Vector3(-4.05, 1.36, 0.24), new THREE.Vector3(-4.05, 1.40, 0.10), new THREE.Vector3(-4.05, 1.26, 0.02)]);
      addMesh(gL1, trackGeo(new THREE.TubeGeometry(kFaucet, 16, 0.016, 10, false)), matBrass, 0, 0, 0);
      addMesh(gL1, PBR.makeRoundedBoxGeo(THREE, trackGeo, 0.36, 0.36, 0.32, 0.02, 2), matChrome, -4.80, 1.18, 0.06);
      addContactAO(gL1, 3.3, 1.5, -4.75, 0.05, -2.55, 0.50);
      addBox(gL1, 2.85, 0.88, 0.96, -4.75, 0.49, -2.55, matWalnut, { roomId: 'kitchen', collide: 1 });
      addMesh(gL1, PBR.makeRoundedBoxGeo(THREE, trackGeo, 3.04, 0.08, 1.12, 0.016, 2), matMarble, -4.75, 0.96, -2.55, { roomId: 'kitchen' });
      addBox(gL1, 0.08, 0.94, 1.12, -6.24, 0.50, -2.55, matMarble);
      addBox(gL1, 0.08, 0.94, 1.12, -3.26, 0.50, -2.55, matMarble);
      var stGeo = PBR.makeRoundedBoxGeo(THREE, trackGeo, 0.42, 0.07, 0.40, 0.03, 3);
      [-5.65, -4.75, -3.85].forEach(function (sx) {
        addMesh(gL1, stGeo, matBoucle, sx, 0.68, -3.32);
        [[-0.15, -0.14], [0.15, -0.14], [-0.15, 0.14], [0.15, 0.14]].forEach(function (lg) { addCyl(gL1, 0.018, 0.64, 0.018, sx + lg[0], 0.34, -3.32 + lg[1], matBronze); });
      });

      /* --- ROOM 06: ZIKRI'S DEV & UI STUDIO (Walnut L-Desk, Dual Coding Displays & Library!) --- */
      addContactAO(gL1, 2.4, 2.2, -2.55, 0.05, 3.65, 0.44);
      addMesh(gL1, PBR.makeRoundedBoxGeo(THREE, trackGeo, 2.25, 0.068, 0.84, 0.015, 2), matWalnut, -2.45, 0.77, 3.92, { roomId: 'office' });
      addCollider(1, -3.60, -1.32, 3.48, 4.38);
      addMesh(gL1, PBR.makeRoundedBoxGeo(THREE, trackGeo, 0.78, 0.068, 1.56, 0.015, 2), matWalnut, -3.22, 0.77, 2.86, { roomId: 'office' });
      addCollider(1, -3.64, -2.80, 2.06, 3.60);
      addBox(gL1, 0.055, 0.74, 0.72, -3.50, 0.38, 3.92, matBronze);
      addBox(gL1, 0.055, 0.74, 0.72, -1.40, 0.38, 3.92, matBronze);
      addBox(gL1, 0.68, 0.74, 0.055, -3.22, 0.38, 2.14, matBronze);
      addBox(gL1, 2.05, 0.03, 0.03, -2.45, 0.85, 4.32, matWarmGlow, { cast: false });
      // Dual Slim Bezel Glowing Coding Monitors facing -Z (into room)
      addCyl(gL1, 0.028, 0.36, 0.028, -2.42, 0.96, 4.18, matBronze);
      addMesh(gL1, PBR.makeRoundedBoxGeo(THREE, trackGeo, 0.82, 0.46, 0.036, 0.01, 2), matMatteBlack, -2.86, 1.18, 4.06, { ry: -0.16, roomId: 'office' });
      addBox(gL1, 0.76, 0.41, 0.016, -2.85, 1.18, 4.03, matStudioScreen, { ry: -0.16, cast: false });
      addMesh(gL1, PBR.makeRoundedBoxGeo(THREE, trackGeo, 0.82, 0.46, 0.036, 0.01, 2), matMatteBlack, -1.98, 1.18, 4.06, { ry: 0.16, roomId: 'office' });
      addBox(gL1, 0.76, 0.41, 0.016, -1.99, 1.18, 4.03, matStudioScreen, { ry: 0.16, cast: false });
      // Dual Near-Field Studio Monitor Speakers with Brass Woofer Cones
      [-3.40, -1.48].forEach(function (sx, si) {
        var ry = si === 0 ? -0.24 : 0.24;
        addMesh(gL1, PBR.makeRoundedBoxGeo(THREE, trackGeo, 0.20, 0.32, 0.20, 0.014, 2), matCharcoal, sx, 0.96, 4.04, { ry: ry });
        addCyl(gL1, 0.058, 0.02, 0.058, sx + (si === 0 ? 0.02 : -0.02), 0.91, 3.93, matBrass, { rx: Math.PI / 2, ry: ry, cast: false });
      });
      // Mechanical Keyboard + Brass Architectural Task Lamp + Ergonomic Swivel Chair
      addBox(gL1, 0.96, 0.012, 0.36, -2.42, 0.81, 3.72, matMatteBlack, { cast: false });
      addMesh(gL1, PBR.makeRoundedBoxGeo(THREE, trackGeo, 0.42, 0.024, 0.14, 0.008, 2), matCharcoal, -2.42, 0.826, 3.72);
      addCyl(gL1, 0.09, 0.032, 0.09, -3.28, 0.82, 2.48, matBrass);
      addCyl(gL1, 0.014, 0.44, 0.014, -3.28, 1.05, 2.48, matBrass);
      addMesh(gL1, PBR.makeLatheVessel(THREE, trackGeo, [[0.03, 0], [0.14, -0.09], [0.13, -0.10], [0.02, -0.01]], 18), matBrass, -3.18, 1.32, 2.48);
      addContactAO(gL1, 0.85, 0.85, -2.42, 0.05, 2.95, 0.44);
      addCyl(gL1, 0.04, 0.36, 0.04, -2.42, 0.28, 2.95, matChrome);
      addMesh(gL1, PBR.makeRoundedBoxGeo(THREE, trackGeo, 0.56, 0.09, 0.54, 0.03, 3), matCharcoal, -2.42, 0.50, 2.95, { ry: 0.16, roomId: 'office' });
      addMesh(gL1, PBR.makeRoundedBoxGeo(THREE, trackGeo, 0.52, 0.72, 0.08, 0.03, 3), matCharcoal, -2.46, 0.90, 2.70, { ry: 0.16, rx: -0.12, roomId: 'office' });
      // Floor-to-ceiling Design Monograph Bookshelf on West wall
      addBox(gL1, 0.38, 2.45, 1.38, -3.72, 1.28, 1.35, matWalnut, { roomId: 'office', collide: 1 });
      for (var os = 0; os < 5; os++) {
        var osy = 0.42 + os * 0.46;
        addBox(gL1, 0.36, 0.035, 1.30, -3.70, osy, 1.35, matOak);
        for (var bk = 0; bk < 5; bk++) {
          addBox(gL1, 0.20, 0.22 + (bk % 2) * 0.05, 0.05, -3.68, osy + 0.13, 0.88 + bk * 0.12, bk % 2 === 0 ? matBoucle : (bk === 1 ? matTerracotta : matOchre));
        }
      }
      addPalmPlanter(gL1, -1.48, 0.05, 4.92, 0.85, 'office');

      /* --- ROOM 07 & 08: GUEST BEDROOM + GUEST BATHROOM --- */
      addLuxuryBedSuite(gL1, 1, 5.2, 0.05, 3.2, Math.PI, 1.72, 2.05, matTaupe, 'guestBed');
      addBox(gL1, 0.56, 2.45, 2.05, 3.45, 1.28, 3.25, matWalnut, { collide: 1 });
      addBathroomFixtures(gL1, 1, DATA.getRoomById('guestBath').bounds, 0.05, false);

      /* --- ROOM 09 & 10: LAUNDRY ROOM + STORAGE ROOM --- */
      addBox(gL1, 0.72, 0.90, 2.35, -9.45, 0.50, -1.0, matLinen, { roomId: 'laundry', collide: 1 });
      [-1.65, -0.85].forEach(function (wz) {
        addCyl(gL1, 0.24, 0.04, 0.24, -9.06, 0.50, wz, matChrome, { rz: Math.PI / 2 });
        addCyl(gL1, 0.18, 0.05, 0.18, -9.04, 0.50, wz, matMatteBlack, { rz: Math.PI / 2 });
      });
      addMesh(gL1, PBR.makeRoundedBoxGeo(THREE, trackGeo, 0.76, 0.05, 2.40, 0.01, 2), matMarble, -9.45, 0.98, -1.0);
      addBox(gL1, 0.42, 0.78, 2.35, -9.60, 2.15, -1.0, matWalnut);
      addBox(gL1, 0.52, 2.35, 2.45, -9.55, 1.22, -4.0, matBronze, { roomId: 'storage', collide: 1 });
      for (var sr = 0; sr < 4; sr++) {
        addBox(gL1, 0.48, 0.04, 2.40, -9.55, 0.45 + sr * 0.55, -4.0, matWalnut);
        addMesh(gL1, PBR.makeRoundedBoxGeo(THREE, trackGeo, 0.36, 0.28, 0.46, 0.02, 2), matBoucle, -9.55, 0.62 + sr * 0.55, -4.65);
        addMesh(gL1, PBR.makeRoundedBoxGeo(THREE, trackGeo, 0.36, 0.28, 0.46, 0.02, 2), matTaupe,  -9.55, 0.62 + sr * 0.55, -3.45);
      }

      /* --- ROOM 11: GARAGE CABINETS & EV CHARGER --- */
      addBox(gL1, 0.55, 2.15, 2.65, -9.55, 1.12, 2.8, matCharcoal, { roomId: 'garage', collide: 1 });
      addBox(gL1, 0.14, 0.48, 0.26, -4.22, 1.38, 3.2, matMatteBlack);
      addBox(gL1, 0.02, 0.24, 0.04, -4.14, 1.38, 3.2, matPoolGlow, { cast: false });
    })();

    /* ======================================================================
       4. SECOND FLOOR (LEVEL 2 · Y = +3.60..7.00 m · 10 FURNISHED SPACES!)
       ====================================================================== */
    var Y2 = 3.60, H2 = 3.18;
    (function buildSecondFloor() {
      addBox(gL2, 11.7, 0.28, 11.4, -4.25, Y2 - 0.14, 0.0, matConcrete);
      addBox(gL2, 11.4, 0.04, 11.0, -4.25, Y2 - 0.29, 0.0, matCedar, { cast: false });
      addBox(gL2, 8.7, 0.28, 5.2, 5.75, Y2 - 0.14, 3.0, matConcrete);
      addBox(gL2, 3.4, 0.28, 6.2, 8.4, Y2 - 0.14, -2.5, matConcrete);
      addBox(gL2, 11.7, 0.22, 1.75, -4.25, Y2 - 0.11, -6.32, matConcrete);
      addBox(gL2, 11.5, 0.05, 1.56, -4.25, Y2 + 0.025, -6.30, matTeakDeck, { cast: false, roomId: 'balcony', walkFloor: 2 });
      addBox(gL2, 6.3, 0.24, 1.35, -7.0, Y2 - 0.12, 6.05, matConcrete);

      DATA.ROOMS.forEach(function (rm) {
        if (rm.level !== 2 || rm.id === 'balcony') return;
        var b = rm.bounds;
        var fm = (rm.id === 'masterBath' || rm.id === 'bath3' || rm.id === 'bath4') ? matBathTile :
                 (rm.id === 'bedroom3') ? matSlateFloor : matOak;
        addBox(gL2, b.x2 - b.x1, 0.05, b.z2 - b.z1, (b.x1 + b.x2) * 0.5, Y2 + 0.025, (b.z1 + b.z2) * 0.5, fm, { cast: false, roomId: rm.id, walkFloor: 2 });
      });

      // Level 2 Exterior Walls, Cedar Louvers & Floor-to-Ceiling Glazing
      addWall(gL2, -10.0, 5.5, -10.0, -5.5, H2, T_OUT, { baseY: Y2, level: 2, mat: matPlasterOut });
      addWall(gL2, -10.0, 5.5, -4.0, 5.5, H2, T_OUT, { baseY: Y2, level: 2, mat: matLimestone });
      for (var lv = 0; lv < 14; lv++) addBox(gL2, 0.07, H2 - 0.1, 0.16, -3.8 + lv * 0.36, Y2 + H2 * 0.5, 5.52, matCedar);
      addBox(gL2, 5.4, H2 - 0.1, 0.045, -1.25, Y2 + H2 * 0.5, 5.42, matGlass, { cast: false, collide: 2 });
      addWall(gL2, 1.5, 5.5, 5.4, 5.5, 0.85, T_OUT, { baseY: Y2, level: 2, mat: matPlasterOut });
      addBox(gL2, 3.85, 2.25, 0.045, 3.45, Y2 + 2.0, 5.5, matGlass, { cast: false });
      addBox(gL2, 3.92, 0.10, 0.15, 3.45, Y2 + H2, 5.5, matBronze);
      addBox(gL2, 4.6, 1.05, 0.04, 7.7, Y2 + 0.55, 5.5, matGlass, { cast: false, collide: 2 });
      addBox(gL2, 4.66, 0.05, 0.07, 7.7, Y2 + 1.09, 5.5, matBronze);
      addWall(gL2, 10.0, 3.0, 10.0, -5.5, H2, T_OUT, { baseY: Y2, level: 2, mat: matPlasterOut });

      addBox(gL2, 19.9, 0.12, 0.16, 0.0, Y2 + H2, -5.5, matBronze);
      addBox(gL2, 11.4, H2 - 0.12, 0.045, -4.25, Y2 + H2 * 0.5, -5.5, matGlass, { cast: false });
      addBox(gL2, 5.3, H2 - 0.12, 0.045, 4.15, Y2 + H2 * 0.5, -5.5, matGlass, { cast: false });
      addBox(gL2, 3.2, H2 - 0.12, 0.045, 8.4, Y2 + H2 * 0.5, -5.5, matGlass, { cast: false });
      [-9.95, -6.8, -4.0, -1.2, 1.5, 4.15, 6.8, 9.95].forEach(function (mx) { addBox(gL2, 0.08, H2, 0.12, mx, Y2 + H2 * 0.5, -5.5, matBronze); });

      addBox(gL2, 11.5, 1.05, 0.04, -4.25, Y2 + 0.55, -7.08, matGlass, { cast: false, collide: 2 });
      addBox(gL2, 11.58, 0.05, 0.07, -4.25, Y2 + 1.09, -7.08, matBronze);
      addBox(gL2, 0.04, 1.05, 1.56, -9.98, Y2 + 0.55, -6.30, matGlass, { cast: false });
      addBox(gL2, 0.04, 1.05, 1.56, 1.48, Y2 + 0.55, -6.30, matGlass, { cast: false });
      addPalmPlanter(gL2, -9.4, Y2 + 0.05, -6.3, 0.88, 'balcony');
      addPalmPlanter(gL2, 0.85, Y2 + 0.05, -6.3, 0.88, 'balcony');

      addBox(gL2, 0.04, 1.08, 6.0, 1.48, Y2 + 0.56, -2.5, matGlass, { cast: false, collide: 2 });
      addBox(gL2, 0.07, 0.05, 6.06, 1.48, Y2 + 1.12, -2.5, matBronze);
      addMesh(gL2, trackGeo(new THREE.TorusGeometry(0.88, 0.032, 12, 36)), matBrass, 4.15, Y2 + 1.55, -2.45, { rx: Math.PI / 2 });
      addMesh(gL2, trackGeo(new THREE.TorusGeometry(0.84, 0.020, 8, 36)), matWarmGlow, 4.15, Y2 + 1.52, -2.45, { rx: Math.PI / 2, cast: false });
      addCyl(gL2, 0.008, 1.75, 0.008, 4.15, Y2 + 2.45, -2.45, matBronze, { cast: false });

      // Level 2 Interior Partitions
      addWall(gL2, -10.0, 0.5, -8.8, 0.5, H2, T_IN, { baseY: Y2, level: 2 });
      addWall(gL2, -7.4, 0.5, -5.8, 0.5, H2, T_IN, { baseY: Y2, level: 2 });
      addWall(gL2, -4.6, 0.5, -4.0, 0.5, H2, T_IN, { baseY: Y2, level: 2 });
      addWall(gL2, -4.0, -5.5, -4.0, -1.6, H2, T_IN, { baseY: Y2, level: 2 });
      addWall(gL2, -4.0, -0.3, -4.0, 5.5, H2, T_IN, { baseY: Y2, level: 2 });
      addWall(gL2, -6.8, 0.5, -6.8, 5.5, H2, T_IN, { baseY: Y2, level: 2 });
      addWall(gL2, 1.5, 0.5, 1.5, 2.2, H2, T_IN, { baseY: Y2, level: 2 });
      addWall(gL2, 1.5, 3.5, 1.5, 5.5, H2, T_IN, { baseY: Y2, level: 2 });
      addWall(gL2, 5.4, 0.5, 5.4, 3.0, H2, T_IN, { baseY: Y2, level: 2 });
      addWall(gL2, 7.7, 0.5, 7.7, 3.0, H2, T_IN, { baseY: Y2, level: 2 });
      addWall(gL2, 5.4, 3.0, 10.0, 3.0, H2, T_IN, { baseY: Y2, level: 2 });
      addWall(gL2, 6.8, -5.5, 6.8, 0.5, H2, T_IN, { baseY: Y2, level: 2 });
      addWall(gL2, 1.5, 0.5, 10.0, 0.5, H2, T_IN, { baseY: Y2, level: 2 });

      /* --- ROOMS 12–14: MASTER SUITE + WARDROBE + SPA BATH --- */
      addBox(gL2, 4.2, 0.022, 3.6, -7.0, Y2 + 0.062, -2.5, matRug, { cast: false, roomId: 'masterBed', walkFloor: 2 });
      addLuxuryBedSuite(gL2, 2, -7.0, Y2 + 0.05, -2.2, Math.PI, 2.15, 2.20, matSlateBed, 'masterBed');
      addMesh(gL2, PBR.makeRoundedBoxGeo(THREE, trackGeo, 1.85, 0.36, 0.48, 0.04, 3), matBoucle, -7.0, Y2 + 0.28, -3.72);
      var mCurtain = PBR.makeCurtainGeo(THREE, trackGeo, 1.15, 3.02, 6);
      addMesh(gL2, mCurtain, matSheer, -9.2, Y2 + 1.58, -5.25, { cast: false });
      addMesh(gL2, mCurtain, matSheer, -4.8, Y2 + 1.58, -5.25, { cast: false });
      addBox(gL2, 0.56, 2.75, 4.2, -9.55, Y2 + 1.42, 3.0, matWalnut, { roomId: 'wardrobe', collide: 2 });
      addBox(gL2, 0.03, 2.55, 4.0, -9.24, Y2 + 1.42, 3.0, matGlass, { cast: false });
      addBox(gL2, 0.56, 2.75, 4.2, -7.25, Y2 + 1.42, 3.0, matWalnut, { roomId: 'wardrobe', collide: 2 });
      addBox(gL2, 0.03, 2.55, 4.0, -7.56, Y2 + 1.42, 3.0, matGlass, { cast: false });
      addMesh(gL2, PBR.makeRoundedBoxGeo(THREE, trackGeo, 0.72, 0.84, 1.55, 0.02, 2), matTravertine, -8.4, Y2 + 0.46, 3.1, { roomId: 'wardrobe' });
      addBox(gL2, 0.96, 2.10, 0.04, -8.4, Y2 + 1.15, 5.26, matMirror, { cast: false });
      addBathroomFixtures(gL2, 2, DATA.getRoomById('masterBath').bounds, Y2 + 0.05, true);

      /* --- ROOMS 15–16: FAMILY LOUNGE MEZZANINE + ROOFTOP STAIRCASE (L2 -> L3) --- */
      addBox(gL2, 3.4, 0.022, 3.2, -1.3, Y2 + 0.062, -2.5, matRug, { cast: false, roomId: 'familyLounge', walkFloor: 2 });
      addMesh(gL2, PBR.makeRoundedBoxGeo(THREE, trackGeo, 2.45, 0.34, 0.92, 0.06, 3), matBoucle, -1.6, Y2 + 0.24, -1.3, { roomId: 'familyLounge' });
      addMesh(gL2, PBR.makeRoundedBoxGeo(THREE, trackGeo, 2.45, 0.44, 0.24, 0.06, 3), matBoucle, -1.6, Y2 + 0.58, -0.92, { rx: 0.14 });
      addMesh(gL2, PBR.makeRoundedBoxGeo(THREE, trackGeo, 1.25, 0.06, 0.78, 0.025, 2), matTravertine, -1.6, Y2 + 0.42, -2.55);
      addMesh(gL2, vaseGeo, matCeramic, -1.6, Y2 + 0.46, -2.55, { sx: 0.8, sy: 0.8, sz: 0.8 });
      var S2 = DATA.STAIR_L2_L3;
      var s2cx = (S2.x1 + S2.x2) * 0.5, s2w = S2.x2 - S2.x1;
      var s2diag = Math.hypot(S2.zEnd - S2.zStart, S2.yEnd - S2.yStart), s2p = Math.atan2(S2.yEnd - S2.yStart, Math.abs(S2.zEnd - S2.zStart));
      addBox(gL2, 0.14, 0.20, s2diag, s2cx, (S2.yStart + S2.yEnd) * 0.5 - 0.14, (S2.zStart + S2.zEnd) * 0.5, matBronze, { rx: s2p });
      var tread2Geo = PBR.makeRoundedBoxGeo(THREE, trackGeo, s2w, 0.072, 0.27, 0.014, 2);
      for (var t2 = 0; t2 < S2.steps; t2++) {
        var f2 = (t2 + 0.5) / S2.steps;
        addMesh(gL2, tread2Geo, matWalnut, s2cx, lerp(S2.yStart, S2.yEnd, f2), lerp(S2.zStart, S2.zEnd, f2), { walkFloor: 2 });
      }
      addBox(gL2, 0.036, 0.90, s2diag - 0.2, S2.x2 + 0.02, (S2.yStart + S2.yEnd) * 0.5 + 0.44, (S2.zStart + S2.zEnd) * 0.5, matGlass, { rx: s2p, cast: false });

      /* --- ROOMS 17–19: BEDROOM II + BATHROOMS III & IV --- */
      addLuxuryBedSuite(gL2, 2, 3.45, Y2 + 0.05, 3.1, Math.PI, 1.70, 2.05, matSage, 'bedroom2');
      addBathroomFixtures(gL2, 2, DATA.getRoomById('bath3').bounds, Y2 + 0.05, false);
      addBathroomFixtures(gL2, 2, DATA.getRoomById('bath4').bounds, Y2 + 0.05, false);

      /* --- ROOM 20: ZIKRI'S FULL GAMING SUITE (L2 · X:[6.8..10.0], Z:[-5.5..0.5]) --- */
      (function buildFullGamingSuiteL2() {
        var r = 'bedroom3', yb = Y2 + 0.05;
        // Charcoal Fluted Acoustic Slat Cladding on South & East Accent Walls
        addBox(gL2, 2.86, 2.95, 0.05, 8.40, yb + 1.48, 0.36, matGamingWall, { cast: false, roomId: r });
        addBox(gL2, 0.05, 2.95, 3.20, 9.84, yb + 1.48, -1.25, matGamingWall, { cast: false, roomId: r });
        for (var sl = 0; sl < 14; sl++) addBox(gL2, 0.048, 2.90, 0.032, 7.12 + sl * 0.195, yb + 1.48, 0.32, matMatteBlack, { cast: false });

        // Platform Bed with Cyan/Violet Under-Bed Neon in North-West Zone (Head against West wall X=7.02)
        var bedG = new THREE.Group();
        bedG.position.set(8.05, yb, -3.55); bedG.rotation.y = Math.PI / 2;
        addContactAO(gL2, 2.15, 1.90, 8.05, yb, -3.55, 0.50);
        addMesh(bedG, PBR.makeRoundedBoxGeo(THREE, trackGeo, 1.66, 0.25, 2.02, 0.04, 3), matCharcoal, 0, 0.13, 0, { roomId: r });
        addBox(bedG, 1.56, 0.036, 0.036, 0, 0.03, 1.02, matCyanRGB, { cast: false });
        addBox(bedG, 0.036, 0.036, 1.94, -0.84, 0.03, 0, matVioletRGB, { cast: false });
        addBox(bedG, 0.036, 0.036, 1.94,  0.84, 0.03, 0, matCyanRGB, { cast: false });
        addMesh(bedG, PBR.makeRoundedBoxGeo(THREE, trackGeo, 1.52, 0.22, 1.88, 0.06, 3), matLinen, 0, 0.36, 0, { roomId: r });
        addMesh(bedG, PBR.makeDuvetGeo(THREE, trackGeo, 1.58, 0.15, 1.32), matSlateBed, 0, 0.43, 0.30, { roomId: r });
        addMesh(bedG, PBR.makeRoundedBoxGeo(THREE, trackGeo, 1.76, 1.06, 0.14, 0.04, 3), matCharcoal, 0, 0.60, -0.96, { roomId: r });
        addBox(bedG, 1.60, 0.03, 0.03, 0, 1.15, -1.00, matVioletRGB, { cast: false });
        addMesh(bedG, pillowBedGeo, matBoucle, -0.36, 0.54, -0.66, { rx: 0.18, sx: 0.85 });
        addMesh(bedG, pillowBedGeo, matBoucle,  0.36, 0.54, -0.66, { rx: 0.18, sx: 0.85 });
        addMesh(bedG, pillowStdGeo, matSage, -0.28, 0.56, -0.38, { rx: 0.26, sx: 0.76, sy: 0.76, sz: 0.76 });
        addMesh(bedG, pillowStdGeo, matTerracotta, 0.28, 0.56, -0.38, { rx: 0.26, sx: 0.76, sy: 0.76, sz: 0.76 });
        gL2.add(bedG);
        addCollider(2, 7.02, 9.08, -4.42, -2.68);
        // Bedside Nightstand + Orb Lamp
        addMesh(gL2, PBR.makeRoundedBoxGeo(THREE, trackGeo, 0.44, 0.42, 0.42, 0.02, 2), matWalnut, 7.34, yb + 0.21, -4.76);
        addMesh(gL2, trackGeo(new THREE.SphereGeometry(0.10, 14, 12)), matWarmGlow, 7.34, yb + 0.54, -4.76, { cast: false });

        // Matte-Black Beveled Gaming Desk along South Acoustic Wall (Z = -0.14)
        addMesh(gL2, PBR.makeRoundedBoxGeo(THREE, trackGeo, 2.38, 0.072, 0.80, 0.016, 2), matMatteBlack, 8.36, yb + 0.74, -0.14, { roomId: r });
        addCollider(2, 7.14, 9.58, -0.56, 0.30);
        addBox(gL2, 0.055, 0.72, 0.68, 7.24, yb + 0.36, -0.14, matMatteBlack);
        addBox(gL2, 0.055, 0.72, 0.68, 9.48, yb + 0.36, -0.14, matMatteBlack);
        addBox(gL2, 2.30, 0.036, 0.036, 8.36, yb + 0.79, 0.26, matCyanRGB, { cast: false });

        // 3 Truly Curved Gaming Monitors Facing North (-Z into room!)
        var cMainGeo = PBR.makeCurvedScreenGeo(THREE, trackGeo, 0.80, 0.43, 0.052);
        var cWingGeo = PBR.makeCurvedScreenGeo(THREE, trackGeo, 0.56, 0.40, 0.040);
        addMesh(gL2, cMainGeo, matGamingScreen, 8.16, yb + 1.15, 0.02, { ry: Math.PI, cast: false, roomId: r });
        addMesh(gL2, cMainGeo, matMatteBlack,   8.16, yb + 1.15, 0.05, { cast: false });
        addMesh(gL2, cWingGeo, matGamingScreen, 7.54, yb + 1.15, -0.10, { ry: Math.PI - 0.44, cast: false, roomId: r });
        addMesh(gL2, cWingGeo, matGamingScreen, 8.78, yb + 1.15, -0.10, { ry: Math.PI + 0.44, cast: false, roomId: r });
        addCyl(gL2, 0.026, 0.36, 0.026, 8.16, yb + 0.94, 0.16, matMatteBlack);

        // Smoked-Glass RGB PC Tower with 3 Proud Luminous Fan Rings & Glowing GPU Bar!
        addMesh(gL2, PBR.makeRoundedBoxGeo(THREE, trackGeo, 0.28, 0.58, 0.54, 0.016, 2), matMatteBlack, 9.38, yb + 1.07, -0.12, { roomId: r });
        addBox(gL2, 0.02, 0.48, 0.44, 9.23, yb + 1.07, -0.12, matGlass, { cast: false });
        var fanRingGeo = trackGeo(new THREE.TorusGeometry(0.062, 0.013, 10, 22));
        for (var fn = 0; fn < 3; fn++) {
          var fm = fn === 0 ? matCyanRGB : (fn === 1 ? matVioletRGB : matPinkRGB);
          addMesh(gL2, fanRingGeo, fm, 9.38, yb + 0.90 + fn * 0.16, -0.40, { cast: false });
        }
        addBox(gL2, 0.03, 0.042, 0.36, 9.23, yb + 1.03, -0.12, matCyanRGB, { cast: false });
        addBox(gL2, 0.02, 0.48, 0.024, 9.23, yb + 1.07, -0.34, matVioletRGB, { cast: false });

        // RGB Mechanical Keyboard + Contoured Gaming Chair
        addBox(gL2, 0.98, 0.012, 0.36, 8.16, yb + 0.782, -0.34, matMatteBlack, { cast: false });
        addMesh(gL2, PBR.makeRoundedBoxGeo(THREE, trackGeo, 0.42, 0.026, 0.14, 0.008, 2), matCharcoal, 8.14, yb + 0.798, -0.34);
        addBox(gL2, 0.40, 0.01, 0.12, 8.14, yb + 0.814, -0.34, matVioletRGB, { cast: false });
        addContactAO(gL2, 0.90, 0.90, 8.18, yb, -1.16, 0.46);
        addCyl(gL2, 0.042, 0.38, 0.042, 8.18, yb + 0.24, -1.16, matChrome);
        addMesh(gL2, PBR.makeRoundedBoxGeo(THREE, trackGeo, 0.56, 0.11, 0.54, 0.04, 3), matMatteBlack, 8.18, yb + 0.46, -1.16, { ry: 0.26, roomId: r });
        addMesh(gL2, PBR.makeRoundedBoxGeo(THREE, trackGeo, 0.52, 0.84, 0.11, 0.04, 3), matMatteBlack, 8.10, yb + 0.90, -1.42, { ry: 0.26, rx: -0.12, roomId: r });
        addMesh(gL2, PBR.makePillowGeo(THREE, trackGeo, 0.32, 0.15, 0.09), matVioletRGB, 8.12, yb + 1.18, -1.36, { ry: 0.26, cast: false });

        // 6 Hexagonal RGB Wall LEDs on South Slat Wall + Diagonal Light Bars on East Wall
        var hexGeo = trackGeo(new THREE.CylinderGeometry(0.155, 0.155, 0.04, 6));
        [[7.58, 1.88, 0.28, matCyanRGB], [7.90, 2.04, 0.28, matVioletRGB], [8.22, 1.88, 0.28, matCyanRGB],
         [8.54, 2.04, 0.28, matPinkRGB], [8.22, 1.72, 0.28, matVioletRGB], [8.86, 1.88, 0.28, matCyanRGB]].forEach(function (hp) {
          addMesh(gL2, hexGeo, hp[3], hp[0], yb + hp[1], hp[2], { rx: Math.PI / 2, cast: false });
        });
        addBox(gL2, 0.04, 0.064, 0.96, 9.78, yb + 1.94, -1.05, matCyanRGB, { rx: 0.35, cast: false });
        addBox(gL2, 0.04, 0.064, 0.92, 9.78, yb + 1.72, -1.95, matVioletRGB, { rx: -0.35, cast: false });
      })();
    })();

    /* ======================================================================
       5. ROOFTOP SKY LOUNGE (LEVEL 3 · Y = +7.00 m) + CONSTRUCTED PARAPET ROOFS
       ====================================================================== */
    var Y3 = 7.00;
    (function buildRooftopAndRoofs() {
      addBox(gL3, 20.6, 0.28, 11.6, 0.0, Y3 - 0.14, 0.0, matConcrete);
      addBox(gL3, 20.1, 0.05, 11.1, 0.0, Y3 - 0.29, 0.0, matCedar, { cast: false });
      [[1.1, 6.2], [-2.5, 6.0], [5.4, 6.0], [-7.0, 6.8], [4.15, -6.2], [-4.2, -6.2]].forEach(function (dl) {
        addCyl(gL3, 0.10, 0.03, 0.10, dl[0], 3.30, dl[1], matBronze, { cast: false });
        addCyl(gL3, 0.07, 0.035, 0.07, dl[0], 3.29, dl[1], matWarmGlow, { cast: false });
      });

      function addParapetTray(cx, cz, w, d) {
        addBox(gL3, w - 0.44, 0.06, d - 0.44, cx, Y3 + 0.04, cz, matGravel, { cast: false });
        var pt = 0.24, ph = 0.32;
        addBox(gL3, w, ph, pt, cx, Y3 + ph * 0.5, cz - d * 0.5 + pt * 0.5, matPlasterOut);
        addBox(gL3, w, ph, pt, cx, Y3 + ph * 0.5, cz + d * 0.5 - pt * 0.5, matPlasterOut);
        addBox(gL3, pt, ph, d - pt * 2, cx - w * 0.5 + pt * 0.5, Y3 + ph * 0.5, cz, matPlasterOut);
        addBox(gL3, pt, ph, d - pt * 2, cx + w * 0.5 - pt * 0.5, Y3 + ph * 0.5, cz, matPlasterOut);
        addBox(gL3, w + 0.08, 0.05, pt + 0.06, cx, Y3 + ph + 0.025, cz - d * 0.5 + pt * 0.5, matBronze, { cast: false });
        addBox(gL3, w + 0.08, 0.05, pt + 0.06, cx, Y3 + ph + 0.025, cz + d * 0.5 - pt * 0.5, matBronze, { cast: false });
        addBox(gL3, pt + 0.06, 0.05, d + 0.04, cx - w * 0.5 + pt * 0.5, Y3 + ph + 0.025, cz, matBronze, { cast: false });
        addBox(gL3, pt + 0.06, 0.05, d + 0.04, cx + w * 0.5 - pt * 0.5, Y3 + ph + 0.025, cz, matBronze, { cast: false });
      }
      addParapetTray(5.85, 0.0, 8.6, 11.4);
      addParapetTray(-4.2, 3.4, 11.6, 4.6);
      addBox(gL3, 0.36, 0.14, 0.18, 10.35, Y3 + 0.10, -5.2, matBronze);
      addCyl(gL3, 0.045, 7.25, 0.045, 10.16, 3.45, -5.32, matBronze);
      addBox(gL3, 0.36, 0.14, 0.18, -10.35, Y3 + 0.10, 5.1, matBronze);
      addCyl(gL3, 0.045, 7.25, 0.045, -10.16, 3.45, 5.22, matBronze);

      var rb = DATA.getRoomById('rooftop').bounds;
      var rw = rb.x2 - rb.x1, rd = rb.z2 - rb.z1, rcx = (rb.x1 + rb.x2) * 0.5, rcz = (rb.z1 + rb.z2) * 0.5;
      addBox(gL3, rw, 0.06, rd, rcx, Y3 + 0.03, rcz, matTeakDeck, { cast: false, roomId: 'rooftop', walkFloor: 3 });
      addBox(gL3, rw, 1.06, 0.04, rcx, Y3 + 0.56, rb.z1, matGlass, { cast: false, collide: 3 });
      addBox(gL3, rw + 0.06, 0.05, 0.07, rcx, Y3 + 1.11, rb.z1, matBronze);
      addBox(gL3, 0.04, 1.06, rd, rb.x1, Y3 + 0.56, rcz, matGlass, { cast: false, collide: 3 });
      addBox(gL3, 0.07, 0.05, rd + 0.06, rb.x1, Y3 + 1.11, rcz, matBronze);
      addBox(gL3, 0.04, 1.06, rd, rb.x2, Y3 + 0.56, rcz, matGlass, { cast: false, collide: 3 });
      addBox(gL3, 0.07, 0.05, rd + 0.06, rb.x2, Y3 + 1.11, rcz, matBronze);

      [[-8.8, -4.4], [-8.8, -0.4], [-4.2, -4.4], [-4.2, -0.4]].forEach(function (cp) {
        addBox(gL3, 0.14, 2.65, 0.14, cp[0], Y3 + 1.35, cp[1], matBronze);
      });
      addBox(gL3, 4.74, 0.15, 0.15, -6.5, Y3 + 2.68, -4.4, matBronze);
      addBox(gL3, 4.74, 0.15, 0.15, -6.5, Y3 + 2.68, -0.4, matBronze);
      addBox(gL3, 0.14, 0.15, 4.14, -8.8, Y3 + 2.68, -2.4, matBronze);
      addBox(gL3, 0.14, 0.15, 4.14, -4.2, Y3 + 2.68, -2.4, matBronze);
      for (var rl = 0; rl < 13; rl++) addBox(gL3, 4.52, 0.06, 0.11, -6.5, Y3 + 2.66, -4.2 + rl * 0.30, matCedar);

      addContactAO(gL3, 3.2, 2.0, -6.6, Y3 + 0.06, -2.4, 0.48);
      addBox(gL3, 2.8, 0.30, 1.55, -6.6, Y3 + 0.21, -2.4, matTeakDeck, { roomId: 'rooftop', collide: 3 });
      addMesh(gL3, PBR.makeRoundedBoxGeo(THREE, trackGeo, 2.68, 0.20, 1.44, 0.06, 3), matBoucle, -6.6, Y3 + 0.46, -2.4, { roomId: 'rooftop' });
      addMesh(gL3, PBR.makeRoundedBoxGeo(THREE, trackGeo, 2.68, 0.42, 0.24, 0.06, 3), matBoucle, -6.6, Y3 + 0.72, -3.02);
      addMesh(gL3, pillowStdGeo, matTerracotta, -7.35, Y3 + 0.70, -2.76, { ry: 0.22, rx: -0.22 });
      addMesh(gL3, pillowStdGeo, matTaupe,      -6.60, Y3 + 0.70, -2.80, { rx: -0.20 });
      addMesh(gL3, pillowStdGeo, matSage,       -5.85, Y3 + 0.70, -2.76, { ry: -0.22, rx: -0.22 });
      var bowlGeo = PBR.makeLatheVessel(THREE, trackGeo, [[0, 0], [0.52, 0], [0.74, 0.16], [0.74, 0.38], [0.48, 0.38], [0.38, 0.26], [0, 0.26]], 28);
      addMesh(gL3, bowlGeo, matTravertine, -2.2, Y3 + 0.06, -2.3, { roomId: 'rooftop' });
      addCollider(3, -2.95, -1.45, -3.05, -1.55);
      addCyl(gL3, 0.32, 0.05, 0.32, -2.2, Y3 + 0.36, -2.3, matWarmGlow, { cast: false });
      addBox(gL3, 10.6, 0.04, 0.04, -4.1, Y3 + 0.10, rb.z1 + 0.14, matWarmGlow, { cast: false });
      addPalmPlanter(gL3, -9.0, Y3 + 0.06, -4.6, 0.96, 'rooftop');
      addPalmPlanter(gL3, -9.0, Y3 + 0.06, 0.35, 0.96, 'rooftop');
      addPalmPlanter(gL3, 0.75, Y3 + 0.06, -4.6, 0.96, 'rooftop');
      addPalmPlanter(gL3, 0.75, Y3 + 0.06, 0.35, 0.92, 'rooftop');
    })();

    /* ======================================================================
       6. PHYSICALLY-BASED LIGHTING, GAMING RGB SYNC & DAY/NIGHT ENGINE
       ====================================================================== */
    var lights = {
      ambient: new THREE.AmbientLight(0xECE6DA, 0.24),
      hemi: new THREE.HemisphereLight(0xDCEAF8, 0x625546, 0.42),
      sun: new THREE.DirectionalLight(0xFFF0D4, 1.50),
      warmPoints: [],
      gardenPoints: [],
      gamingPoint: new THREE.PointLight(0x6C96FF, 0.55, 7.5, 1.7)
    };
    lights.gamingPoint.position.set(8.35, Y2 + 2.25, -0.95);
    scene.add(lights.ambient, lights.hemi, lights.sun, lights.gamingPoint);

    lights.sun.castShadow = true;
    lights.sun.shadow.mapSize.set(2048, 2048);
    lights.sun.shadow.camera.near = 2;
    lights.sun.shadow.camera.far = 92;
    lights.sun.shadow.camera.left = -28;
    lights.sun.shadow.camera.right = 28;
    lights.sun.shadow.camera.top = 26;
    lights.sun.shadow.camera.bottom = -26;
    lights.sun.shadow.bias = -0.0005;
    lights.sun.shadow.normalBias = 0.026;

    [
      { x: 1.1,   y: 3.1, z: 3.0,  base: 1.05, dist: 12.0 },
      { x: 4.15,  y: 5.2, z: -2.4, base: 1.35, dist: 15.0 },
      { x: -0.5,  y: 2.8, z: -2.6, base: 1.05, dist: 11.0 },
      { x: -4.8,  y: 2.9, z: -2.5, base: 1.10, dist: 11.0 },
      { x: -2.5,  y: 2.7, z: 3.2,  base: 0.90, dist: 9.0  },
      { x: -7.0,  y: 6.2, z: -2.4, base: 1.05, dist: 12.0 },
      { x: -7.0,  y: 2.7, z: 3.6,  base: 0.95, dist: 10.5 },
      { x: -4.4,  y: 9.2, z: -2.3, base: 1.00, dist: 12.0 }
    ].forEach(function (cfg) {
      var pl = new THREE.PointLight(0xFFBC70, cfg.base, cfg.dist, 1.55);
      pl.position.set(cfg.x, cfg.y, cfg.z); scene.add(pl);
      lights.warmPoints.push({ light: pl, base: cfg.base });
    });

    [
      { x: 1.1,  y: 2.9, z: 7.4,  color: 0xFFB866, base: 1.15, dist: 12.0 },
      { x: -5.6, y: 2.2, z: 9.8,  color: 0xFFE4B8, base: 0.95, dist: 11.0 },
      { x: 5.0,  y: 1.4, z: -9.5, color: 0x5AD6EC, base: 1.10, dist: 14.0 }
    ].forEach(function (cfg) {
      var gl = new THREE.PointLight(cfg.color, 0, cfg.dist, 1.55);
      gl.position.set(cfg.x, cfg.y, cfg.z); scene.add(gl);
      lights.gardenPoints.push({ light: gl, base: cfg.base });
    });

    var lastSkyKey = '', currentSkyTex = null;

    function applyAtmosphere(hour, lampPct, pgEl) {
      var h = clamp(hour, 6, 23);
      var lf = clamp(lampPct, 0, 100) / 100;
      var stops = [
        { h: 6.5,  top: [98, 138, 186],  mid: [168, 194, 218], hor: [242, 214, 184], gnd: [148, 144, 132], fog: [224, 208, 188], sun: [255, 208, 154], cloud: [255, 236, 212], cA: 0.56, st: 0, sInt: 1.18, amb: 0.24, hem: 0.44, env: 0.88, exp: 1.04 },
        { h: 12.5, top: [78, 148, 216],  mid: [154, 198, 232], hor: [222, 232, 238], gnd: [142, 154, 136], fog: [214, 226, 230], sun: [255, 250, 240], cloud: [255, 255, 255], cA: 0.62, st: 0, sInt: 1.56, amb: 0.28, hem: 0.54, env: 1.08, exp: 1.05 },
        { h: 17.35,top: [64, 100, 154],  mid: [152, 148, 166], hor: [244, 182, 124], gnd: [120, 106, 90],  fog: [218, 180, 144], sun: [255, 174, 94],  cloud: [255, 210, 162], cA: 0.66, st: 0, sInt: 1.62, amb: 0.19, hem: 0.35, env: 0.92, exp: 1.06 },
        { h: 19.2, top: [18, 30, 58],    mid: [36, 52, 90],    hor: [98, 90, 120],   gnd: [22, 26, 40],    fog: [34, 42, 68],    sun: [120, 148, 212], cloud: [130, 118, 154], cA: 0.32, st: 0.35, sInt: 0.42, amb: 0.14, hem: 0.22, env: 0.42, exp: 1.05 },
        { h: 22.0, top: [8, 13, 28],     mid: [14, 22, 44],    hor: [22, 32, 60],    gnd: [9, 13, 22],     fog: [14, 20, 38],    sun: [94, 126, 206],  cloud: [44, 58, 92],    cA: 0.18, st: 0.92, sInt: 0.24, amb: 0.10, hem: 0.15, env: 0.26, exp: 1.04 }
      ];
      var a = stops[0], b = stops[stops.length - 1], t = 0;
      for (var i = 0; i < stops.length - 1; i++) {
        if (h >= stops[i].h && h <= stops[i + 1].h) { a = stops[i]; b = stops[i + 1]; t = (h - a.h) / Math.max(0.01, b.h - a.h); break; }
      }
      if (h < stops[0].h) { a = b = stops[0]; t = 0; }
      if (h > stops[stops.length - 1].h) { a = b = stops[stops.length - 1]; t = 0; }

      var topC = lerpRGB(a.top, b.top, t), midC = lerpRGB(a.mid, b.mid, t);
      var horC = lerpRGB(a.hor, b.hor, t), gndC = lerpRGB(a.gnd, b.gnd, t);
      var fogC = lerpRGB(a.fog, b.fog, t), sunC = lerpRGB(a.sun, b.sun, t), cldC = lerpRGB(a.cloud, b.cloud, t);
      var cldA = lerp(a.cA, b.cA, t), stars = lerp(a.st, b.st, t);

      var skyKey = Math.round(h * 4) + '|' + Math.round(stars * 10);
      if (skyKey !== lastSkyKey) {
        lastSkyKey = skyKey;
        var nextTex = PBR.makeCloudSkyTexture(THREE, trackTex, topC, midC, horC, gndC, cldA, cldC, stars);
        if (currentSkyTex) { texs.delete(currentSkyTex); currentSkyTex.dispose(); }
        currentSkyTex = nextTex; skyMat.map = nextTex; skyMat.needsUpdate = true;
      }

      scene.fog.color.setRGB(fogC[0] / 255, fogC[1] / 255, fogC[2] / 255);
      renderer.toneMappingExposure = lerp(a.exp, b.exp, t);

      var dayNorm = clamp((h - 6.0) / 13.0, 0, 1);
      var sunElev = Math.sin(dayNorm * Math.PI);
      if (h < 19.0) {
        var az = lerp(-1.12, 1.16, dayNorm);
        lights.sun.position.set(Math.sin(az) * 32, 6.5 + sunElev * 22, 14 + (1 - sunElev) * 10);
      } else {
        lights.sun.position.set(-18, 20, 16);
      }
      lights.sun.color.setRGB(sunC[0] / 255, sunC[1] / 255, sunC[2] / 255);
      lights.sun.intensity = lerp(a.sInt, b.sInt, t);
      lights.ambient.intensity = lerp(a.amb, b.amb, t);
      lights.hemi.intensity = lerp(a.hem, b.hem, t);

      var envScale = lerp(a.env, b.env, t);
      for (var ri = 0; ri < lightRefs.reflectiveMats.length; ri++) lightRefs.reflectiveMats[ri].envMapIntensity = envScale;

      var ev = clamp((h - 15.8) / 3.6, 0, 1);
      var warmBoost = lerp(0.18, 2.35, ev) * lf;
      for (var wi = 0; wi < lights.warmPoints.length; wi++) lights.warmPoints[wi].light.intensity = lights.warmPoints[wi].base * warmBoost;
      for (var gi = 0; gi < lights.gardenPoints.length; gi++) lights.gardenPoints[gi].light.intensity = lights.gardenPoints[gi].base * ev * (0.45 + lf * 0.75);
      lights.gamingPoint.intensity = lerp(0.28, 1.55, ev) * (0.45 + lf * 0.55);

      matWarmGlow.emissiveIntensity = 0.25 + lf * lerp(0.45, 1.95, ev);
      matGardenGlow.emissiveIntensity = 0.15 + ev * 1.85;
      matPoolGlow.emissiveIntensity = 0.20 + ev * 1.80;
      for (var bi = 0; bi < lightRefs.rgbMats.length; bi++) lightRefs.rgbMats[bi].emissiveIntensity = lerp(0.65, 2.15, ev);
      for (var si2 = 0; si2 < lightRefs.screenMats.length; si2++) lightRefs.screenMats[si2].emissiveIntensity = lerp(0.70, 1.25, ev);
      for (var hi = 0; hi < lightRefs.headlightMats.length; hi++) lightRefs.headlightMats[hi].emissiveIntensity = 0.45 + ev * 2.15;
      for (var ti = 0; ti < lightRefs.taillightMats.length; ti++) lightRefs.taillightMats[ti].emissiveIntensity = 0.55 + ev * 2.05;

      poolWaterMat.uniforms.uSkyColor.value.setRGB(horC[0] / 255, horC[1] / 255, horC[2] / 255);
      poolWaterMat.uniforms.uSunColor.value.setRGB(sunC[0] / 255, sunC[1] / 255, sunC[2] / 255);
      poolWaterMat.uniforms.uSunDir.value.copy(lights.sun.position).normalize();
      poolWaterMat.uniforms.uNightGlow.value = ev * (0.35 + lf * 0.65);

      if (pgEl) pgEl.classList.toggle('ge-is-night', h >= 19.0);
    }

    function setViewMode(mode) {
      gSite.visible = true;
      gL1.visible = true;
      gL2.visible = (mode !== 'floor1');
      gL3.visible = (mode === 'exterior' || mode === 'rooftop');
    }

    function setDoorOpen(frac) {
      pivotDoorGroup.rotation.y = -smoothstep(clamp(frac, 0, 1)) * 1.48;
    }

    function animate(now) {
      poolWaterMat.uniforms.uTime.value = now * 0.001;
    }

    function resolveWalkCollision(x, z, y, radius) {
      var r = radius || 0.32;
      x = clamp(x, -11.4, 11.4); z = clamp(z, -12.8, 10.8);
      var S1 = DATA.STAIR_L1_L2, S2 = DATA.STAIR_L2_L3;
      var onS1 = (y < 4.4) && (x >= S1.x1 - 0.15 && x <= S1.x2 + 0.15 && z >= S1.zEnd - 0.35 && z <= S1.zStart + 0.35);
      var onS2 = (y >= 3.3) && (x >= S2.x1 - 0.15 && x <= S2.x2 + 0.15 && z >= S2.zEnd - 0.35 && z <= S2.zStart + 0.35);
      var lvl = onS2 ? (y > 6.4 ? 3 : 2) : (onS1 ? (y > 3.2 ? 2 : 1) : (y > 6.4 ? 3 : (y > 3.2 ? 2 : 1)));
      var boxes = colliders[lvl] || colliders[1];
      for (var pass = 0; pass < 2; pass++) {
        for (var i = 0; i < boxes.length; i++) {
          var b = boxes[i];
          var cx = clamp(x, b.x1, b.x2), cz = clamp(z, b.z1, b.z2);
          var dx = x - cx, dz = z - cz, dSq = dx * dx + dz * dz;
          if (dSq < r * r) {
            if (dSq < 1e-6) {
              var dl = Math.abs(x - b.x1), dr = Math.abs(b.x2 - x), dt = Math.abs(z - b.z1), db = Math.abs(b.z2 - z);
              var m = Math.min(dl, dr, dt, db);
              if (m === dl) x = b.x1 - r; else if (m === dr) x = b.x2 + r; else if (m === dt) z = b.z1 - r; else z = b.z2 + r;
            } else {
              var dist = Math.sqrt(dSq), push = r - dist;
              x += (dx / dist) * push; z += (dz / dist) * push;
            }
          }
        }
      }
      var eyeY = lvl === 3 ? 8.65 : (lvl === 2 ? 5.25 : 1.65);
      if (onS1) {
        var f1 = clamp((S1.zStart - z) / (S1.zStart - S1.zEnd), 0, 1);
        eyeY = lerp(S1.yStart, S1.yEnd, f1) + 1.65;
      } else if (onS2) {
        var f2 = clamp((S2.zStart - z) / (S2.zStart - S2.zEnd), 0, 1);
        eyeY = lerp(S2.yStart, S2.yEnd, f2) + 1.65;
      } else if (lvl === 3) {
        var rb = DATA.getRoomById('rooftop').bounds;
        x = clamp(x, rb.x1 + r + 0.1, rb.x2 - r - 0.1);
        z = clamp(z, rb.z1 + r + 0.1, rb.z2 - r - 0.1);
      }
      return { x: x, z: z, eyeY: eyeY, level: eyeY > 7.2 ? 3 : (eyeY > 3.8 ? 2 : 1) };
    }

    function dispose() {
      envRT.dispose();
      texs.forEach(function (t) { try { t.dispose(); } catch (_) {} });
      mats.forEach(function (m) { try { m.dispose(); } catch (_) {} });
      geos.forEach(function (g) { try { g.dispose(); } catch (_) {} });
    }

    return {
      scene: scene,
      roomHitMeshes: roomHitMeshes,
      floorHitMeshes: floorHitMeshes,
      collidersCount: colliders[1].length + colliders[2].length + colliders[3].length,
      applyAtmosphere: applyAtmosphere,
      setViewMode: setViewMode,
      setDoorOpen: setDoorOpen,
      animate: animate,
      resolveWalkCollision: resolveWalkCollision,
      dispose: dispose
    };
  }

  window.GE_WORLD = { buildGrandEstateWorld: buildGrandEstateWorld };
})();
