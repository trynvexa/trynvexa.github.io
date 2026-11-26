/* ==========================================================================
   js/estate.js — Editorial Architectural Monograph Controller for Card #9
   THE GRAND ESTATE · Zikri's Dream House
   - Unified Top Architectural Rail (1-row on Desktop AND 1-row on Mobile!)
   - Compact Lighting Popover (Morning / Day / Golden / Evening / Night)
   - Asymmetric Editorial Hero with Right-Side Architectural Spec Strip
   - Single Centered Bottom Command Bar (Zero pill-soup, >85% pure 3D view!)
   - Compact Monograph Floating Card with ‹ 02 / 11 › Stepper + Full Localization
   - Full-Height Architectural Side Sheet (Desktop) / Bottom Sheet (Mobile)
   - 2-Column Studio CAD Blueprint Modal (SVG + Live Room Inspector)
   - Top-Center Minimal Walkthrough HUD + Multi-Floor Collision + Cleanup
   ========================================================================== */
(function () {
  "use strict";

  function clamp(v, min, max) {
    return v < min ? min : v > max ? max : v;
  }
  function lerp(a, b, t) {
    return a + (b - a) * t;
  }
  function easeInOutSine(t) {
    t = clamp(t, 0, 1);
    return -(Math.cos(Math.PI * t) - 1) * 0.5;
  }

  function waitForThree(timeoutMs, cb) {
    var start = performance.now();
    (function poll() {
      if (window.THREE) {
        cb(window.THREE);
        return;
      }
      if (performance.now() - start >= timeoutMs) {
        cb(null);
        return;
      }
      setTimeout(poll, 50);
    })();
  }

  function lightIconSvg(id) {
    if (id === "night" || id === "evening") {
      return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true"><path d="M20.2 14.4A8.5 8.5 0 1 1 9.6 3.8a6.8 6.8 0 0 0 10.6 10.6Z"/></svg>';
    }
    if (id === "golden") {
      return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true"><path d="M3 17h18M5 20h14M12 7v-3M5.6 10.6l-2-2M18.4 10.6l2-2M7 17a5 5 0 0 1 10 0"/></svg>';
    }
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2.2M12 19.8V22M4.9 4.9l1.6 1.6M17.5 17.5l1.6 1.6M2 12h2.2M19.8 12H22M4.9 19.1l1.6-1.6M17.5 6.5l1.6-1.6"/></svg>';
  }

  function mountEstate(pg) {
    var DATA = window.GE_DATA;
    var WORLD_MOD = window.GE_WORLD;
    var stage = pg && pg.querySelector(".dh-stage");
    if (!DATA || !stage) return function () {};

    document.body.classList.add("dh-active");

    var disposed = false;
    var reducedMotion = !!(
      window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );

    function vpMetrics() {
      var w = stage.clientWidth || window.innerWidth;
      var h = stage.clientHeight || window.innerHeight;
      var mobile = w < 768;
      var compact = w < 1024;
      var shortLandscape = h <= 540 && w > h;
      return {
        w: w,
        h: h,
        aspect: w / Math.max(1, h),
        mobile: mobile,
        compact: compact,
        shortLandscape: shortLandscape,
      };
    }

    var state = {
      lang: (window.ZK && window.ZK.lang) || "id",
      webglAvailable: false,
      nav: "home", // 'home' | 'explore' | 'floorplan' | 'interior' | 'gallery' | 'details'
      viewMode: "exterior", // 'exterior' | 'floor1' | 'floor2' | 'rooftop'
      lightingId: "golden", // 'morning' | 'day' | 'golden' | 'evening' | 'night'
      lightMenuOpen: false,
      curHour: 17.35,
      tgtHour: 17.35,
      curLamp: 65,
      tgtLamp: 65,
      activeRoomId: null,
      activeCardId: "overview",
      cardVisible: false,
      interiorTab: 1,
      galleryTab: "cinematics",
      fpLevel: 1,
      walkMode: false,
      walkLevel: 1,
      doorFrac: 0.0,
      tgtDoorFrac: 0.0,
    };

    /* ---------- Inject Refined Editorial Monograph Markup inside .dh-stage ---------- */
    stage.innerHTML =
      '<div class="ge-loader" data-ge="loader" aria-live="polite">' +
      '<div class="ge-loader-inner">' +
      '<span class="ge-loader-kicker" data-ge="lKicker"></span>' +
      '<span class="ge-loader-title" data-ge="lTitle">THE GRAND ESTATE</span>' +
      '<div class="ge-loader-track"><div class="ge-loader-bar" data-ge="lBar"></div></div>' +
      '<span class="ge-loader-status" data-ge="lStatus"></span>' +
      "</div>" +
      "</div>" +
      '<canvas class="ge-canvas is-loading-blur" data-ge="canvas" aria-label="Interactive 3D Luxury Residence"></canvas>' +
      /* 1. UNIFIED TOP ARCHITECTURAL RAIL (1 thin row on Desktop AND Mobile!) */
      '<header class="ge-header" data-ge="header">' +
      '<div class="ge-rail-left">' +
      '<button type="button" class="ge-back-btn" data-ge-action="portfolio-back" aria-label="Back">' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M19 12H5M11 6l-6 6 6 6"/></svg>' +
      '<span data-ge="backTxt"></span>' +
      "</button>" +
      '<span class="ge-rail-sep" aria-hidden="true"></span>' +
      '<button type="button" class="ge-wordmark" data-ge-nav="home" data-ge="wmMain">THE GRAND ESTATE</button>' +
      "</div>" +
      '<nav class="ge-nav" data-ge="nav" role="tablist"></nav>' +
      '<div class="ge-rail-right">' +
      '<div class="ge-light-wrap">' +
      '<button type="button" class="ge-tool-btn ge-light-trigger" data-ge="lightTrigger" data-ge-action="toggle-light" aria-expanded="false"></button>' +
      '<div class="ge-light-pop" data-ge="lightPop" role="menu" aria-hidden="true"></div>' +
      "</div>" +
      '<button type="button" class="ge-tool-btn ge-menu-btn" data-ge="menuBtn" data-ge-action="open-menu" aria-label="Menu">' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h12"/></svg>' +
      "</button>" +
      "</div>" +
      "</header>" +
      /* 2. ASYMMETRIC EDITORIAL HERO WITH RIGHT-SIDE SPEC STRIP */
      '<section class="ge-hero" data-ge="hero">' +
      '<div class="ge-hero-grid">' +
      '<div class="ge-hero-content">' +
      '<span class="ge-hero-kicker" data-ge="hKicker"></span>' +
      '<h1 class="ge-hero-title" data-ge="hTitle">THE GRAND ESTATE</h1>' +
      '<p class="ge-hero-sub" data-ge="hSub"></p>' +
      '<div class="ge-hero-actions">' +
      '<button type="button" class="ge-cta-primary" data-ge="exploreCta">' +
      '<span data-ge="ctaTxt"></span>' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>' +
      "</button>" +
      '<button type="button" class="ge-cta-ghost" data-ge-nav="floorplan" data-ge="heroPlanTxt"></button>' +
      "</div>" +
      "</div>" +
      '<div class="ge-hero-specs" data-ge="hSpecs"></div>' +
      "</div>" +
      "</section>" +
      /* 3. TOP-CENTER CINEMA BANNER */
      '<div class="ge-cinema-bar" data-ge="cinemaBar" aria-live="polite">' +
      '<span class="ge-cinema-dot"></span>' +
      '<span class="ge-cinema-name" data-ge="cinemaName"></span>' +
      '<div class="ge-cinema-prog"><div class="ge-cinema-fill" data-ge="cinemaFill"></div></div>' +
      '<button type="button" class="ge-cinema-stop" data-ge="cinemaStop"></button>' +
      "</div>" +
      /* 4. COMPACT MONOGRAPH FLOATING INFO CARD (with ‹ 02 / 11 › stepper) */
      '<article class="ge-float-card" data-ge="floatCard" aria-live="polite" aria-hidden="true"></article>' +
      /* 5. FULL-HEIGHT ARCHITECTURAL SIDE SHEET / MOBILE BOTTOM SHEET */
      '<aside class="ge-drawer" data-ge="drawer" aria-label="Residence Directory"></aside>' +
      /* 6. SINGLE CENTERED BOTTOM ARCHITECTURAL COMMAND BAR */
      '<div class="ge-dock" data-ge="dock">' +
      '<div class="ge-dock-bar">' +
      '<div class="ge-dock-seg ge-view-seg" data-ge="viewGroup"></div>' +
      '<span class="ge-dock-sep" aria-hidden="true"></span>' +
      '<div class="ge-dock-seg ge-act-seg" data-ge="actionGroup"></div>' +
      "</div>" +
      "</div>" +
      /* 7. MINIMAL TOP-CENTER WALKTHROUGH HUD + BOTTOM ROOM STRIP + TOUCH D-PAD */
      '<div class="ge-walk-top" data-ge="walkTop">' +
      '<span class="ge-walk-lvl" data-ge="walkLvl"></span>' +
      '<span class="ge-walk-hint" data-ge="walkHint"></span>' +
      '<button type="button" class="ge-walk-exit" data-ge="walkExit"></button>' +
      "</div>" +
      '<div class="ge-walk-strip" data-ge="walkStrip">' +
      '<div class="ge-walk-rooms" data-ge="walkRooms"></div>' +
      "</div>" +
      '<div class="ge-dpad" data-ge="dpad" aria-label="Movement controls">' +
      '<span></span><button type="button" class="ge-dpad-btn" data-ge-move="fwd" aria-label="Forward">↑</button><span></span>' +
      '<button type="button" class="ge-dpad-btn" data-ge-move="left" aria-label="Left">←</button>' +
      '<button type="button" class="ge-dpad-btn" data-ge-move="back" aria-label="Back">↓</button>' +
      '<button type="button" class="ge-dpad-btn" data-ge-move="right" aria-label="Right">→</button>' +
      "</div>" +
      /* 8. 2-COLUMN STUDIO CAD FLOOR PLAN MODAL */
      '<div class="ge-fp-modal" data-ge="fpModal" aria-hidden="true">' +
      '<div class="ge-fp-sheet">' +
      '<div class="ge-fp-head">' +
      '<div><span class="ge-kicker" data-ge="fpKicker"></span><h2 class="ge-fp-title" data-ge="fpTitle"></h2></div>' +
      '<div class="ge-fp-head-r">' +
      '<div class="ge-fp-tabs" data-ge="fpTabs"></div>' +
      '<button type="button" class="ge-icon-close" data-ge-nav="explore" data-ge="fpClose" aria-label="Close">×</button>' +
      "</div>" +
      "</div>" +
      '<div class="ge-fp-body">' +
      '<div class="ge-fp-canvas" data-ge="fpSlot"></div>' +
      '<div class="ge-fp-aside" data-ge="fpAside"></div>' +
      "</div>" +
      "</div>" +
      "</div>";

    function q(name) {
      return stage.querySelector('[data-ge="' + name + '"]');
    }
    var loaderEl = q("loader");
    var loadBarEl = q("lBar");
    var loadStatEl = q("lStatus");
    var canvasEl = q("canvas");
    var headerEl = q("header");
    var navEl = q("nav");
    var lightTrigger = q("lightTrigger");
    var lightPop = q("lightPop");
    var heroEl = q("hero");
    var exploreCta = q("exploreCta");
    var cinemaBar = q("cinemaBar");
    var cinemaName = q("cinemaName");
    var cinemaFill = q("cinemaFill");
    var cinemaStop = q("cinemaStop");
    var floatCardEl = q("floatCard");
    var drawerEl = q("drawer");
    var dockEl = q("dock");
    var viewGroup = q("viewGroup");
    var actionGroup = q("actionGroup");
    var walkTopEl = q("walkTop");
    var walkStripEl = q("walkStrip");
    var walkLvlEl = q("walkLvl");
    var walkHintEl = q("walkHint");
    var walkExitBtn = q("walkExit");
    var walkRoomsEl = q("walkRooms");
    var dpadEl = q("dpad");
    var fpModalEl = q("fpModal");
    var fpTabsEl = q("fpTabs");
    var fpSlotEl = q("fpSlot");
    var fpAsideEl = q("fpAside");

    /* ---------- Three.js, Camera & Animation State ---------- */
    var THREE_REF = null,
      renderer = null,
      camera = null,
      world = null;
    var rafId = 0,
      lastFrameT = performance.now(),
      lastIdleRender = 0,
      cardTimer = 0,
      resizeObserver = null;

    var camCur = Object.assign({}, DATA.VIEW_PRESETS.hero);
    var camTgt = Object.assign({}, DATA.VIEW_PRESETS.hero);

    var walk = {
      x: 1.1,
      y: 1.65,
      z: 4.35,
      vx: 0,
      vz: 0,
      yaw: 0.0,
      pitch: -0.04,
      tgtYaw: 0.0,
      tgtPitch: -0.04,
      goalX: null,
      goalZ: null,
      bobPhase: 0,
      keys: { fwd: false, back: false, left: false, right: false },
    };

    var flight = {
      active: false,
      id: null,
      name: "",
      posCurve: null,
      lookCurve: null,
      startTime: 0,
      duration: 9000,
      tmpPos: null,
      tmpLook: null,
      doorOpenAt: null,
      onComplete: null,
    };

    /* ---------- Language & RTL Sync ---------- */
    function applyDirection() {
      if (state.lang === "ar") pg.setAttribute("dir", "rtl");
      else pg.removeAttribute("dir");
    }

    function applyStaticTranslations() {
      var L = DATA.getLocale(state.lang);
      q("lKicker").textContent = L.loaderKicker;
      q("lTitle").textContent = L.loaderTitle;
      q("backTxt").textContent = L.backText;
      var backBtn = stage.querySelector('[data-ge-action="portfolio-back"]');
      if (backBtn) backBtn.setAttribute("aria-label", L.backAria);
      q("wmMain").textContent = L.wmMain;
      q("hKicker").textContent = L.heroKicker;
      q("hTitle").textContent = L.heroTitle;
      q("hSub").textContent = L.heroSub;
      q("ctaTxt").textContent = L.exploreCta;
      q("heroPlanTxt").textContent = L.heroPlanCta;
      q("hSpecs").innerHTML = L.heroSpecs
        .map(function (sp) {
          return (
            '<div class="ge-hspec"><strong>' + sp.v + "</strong><span>" + sp.k + "</span></div>"
          );
        })
        .join("");
      cinemaStop.textContent = L.actions.stopFilm;
      walkHintEl.textContent = L.walk.hint;
      walkExitBtn.textContent = L.actions.exitWalk;
      q("fpKicker").textContent = L.fp.kicker;
      q("fpTitle").textContent = L.fp.title;
      q("fpClose").setAttribute("aria-label", L.actions.close);
      q("menuBtn").setAttribute("aria-label", L.actions.menu);
      applyDirection();
    }

    /* ---------- Compact Editorial Monograph Floating Card ---------- */
    function renderCardContent(cardId) {
      var c = DATA.getInfoCard(cardId, state.lang);
      if (!c) return "";
      var L = DATA.getLocale(state.lang);
      var isId = DATA.isIdLang(state.lang);
      var idx = DATA.CARD_ORDER.indexOf(cardId);
      var numStr =
        String((idx >= 0 ? idx : 0) + 1).padStart(2, "0") +
        " / " +
        String(DATA.CARD_ORDER.length).padStart(2, "0");

      var metricsHtml = "";
      if (c.metrics && c.metrics.length) {
        metricsHtml =
          '<div class="ge-fc-strip">' +
          c.metrics
            .map(function (m) {
              return (
                '<div class="ge-fc-cell"><span>' + m.k + "</span><strong>" + m.v + "</strong></div>"
              );
            })
            .join("") +
          "</div>";
      }

      var vehHtml = "";
      if (c.vehicles && c.vehicles.length) {
        vehHtml =
          '<div class="ge-veh-list">' +
          c.vehicles
            .map(function (v) {
              var cat = isId && v.categoryId ? v.categoryId : v.category;
              var loc = isId && v.locationId ? v.locationId : v.location;
              return (
                '<div class="ge-veh-item">' +
                '<span class="ge-veh-swatch" style="background:' +
                v.colorHex +
                '"></span>' +
                '<div class="ge-veh-meta"><strong>' +
                v.name +
                "</strong><span>" +
                cat +
                " · " +
                v.colorName +
                "</span><span>" +
                loc +
                "</span></div>" +
                "</div>"
              );
            })
            .join("") +
          "</div>";
      }

      var footActions =
        '<div class="ge-fc-foot">' +
        (c.focusRoom
          ? '<button type="button" class="ge-link-btn" data-ge-walk="' +
            c.focusRoom +
            '">' +
            L.actions.walkInside +
            " →</button>"
          : '<button type="button" class="ge-link-btn" data-ge-nav="interior">' +
            L.nav.interior +
            " →</button>") +
        '<button type="button" class="ge-link-btn" data-ge-nav="floorplan">' +
        L.actions.viewPlan +
        "</button>" +
        "</div>";

      return (
        '<div class="ge-fc-bar">' +
        '<span class="ge-fc-idx"><span dir="ltr">' +
        numStr +
        "</span> · " +
        c.kicker +
        "</span>" +
        '<div class="ge-fc-ctrl">' +
        '<button type="button" class="ge-step-btn" data-ge-card-step="-1" aria-label="' +
        L.actions.prevCard +
        '">‹</button>' +
        '<button type="button" class="ge-step-btn" data-ge-card-step="1" aria-label="' +
        L.actions.nextCard +
        '">›</button>' +
        '<button type="button" class="ge-step-btn" data-ge-action="close-card" aria-label="' +
        L.actions.hideCard +
        '">×</button>' +
        "</div>" +
        "</div>" +
        '<h3 class="ge-fc-title">' +
        c.title +
        "</h3>" +
        '<p class="ge-fc-sub">' +
        c.subtitle +
        "</p>" +
        '<p class="ge-fc-body">' +
        c.body +
        "</p>" +
        metricsHtml +
        vehHtml +
        footActions
      );
    }

    function showFloatingCard(cardId, forceOpen) {
      if (!DATA.INFO_CARDS[cardId]) return;
      var vp = vpMetrics();
      state.activeCardId = cardId;
      if ((vp.compact || vp.shortLandscape) && !forceOpen) {
        hideFloatingCard();
        return;
      }
      if (
        vp.compact &&
        (state.nav === "interior" || state.nav === "gallery" || state.nav === "details")
      ) {
        state.nav = "explore";
        drawerEl.classList.remove("is-open");
      }
      if (cardTimer) {
        clearTimeout(cardTimer);
        cardTimer = 0;
      }
      if (state.cardVisible && floatCardEl.dataset.cardId !== cardId) {
        floatCardEl.classList.remove("is-visible");
        floatCardEl.classList.add("is-exiting");
        cardTimer = setTimeout(
          function () {
            if (disposed) return;
            state.cardVisible = true;
            floatCardEl.dataset.cardId = cardId;
            floatCardEl.innerHTML = renderCardContent(cardId);
            floatCardEl.classList.remove("is-exiting");
            floatCardEl.setAttribute("aria-hidden", "false");
            requestAnimationFrame(function () {
              if (!disposed) floatCardEl.classList.add("is-visible");
            });
          },
          reducedMotion ? 10 : 180
        );
      } else {
        state.cardVisible = true;
        floatCardEl.dataset.cardId = cardId;
        floatCardEl.innerHTML = renderCardContent(cardId);
        floatCardEl.classList.remove("is-exiting");
        floatCardEl.setAttribute("aria-hidden", "false");
        requestAnimationFrame(function () {
          if (!disposed) floatCardEl.classList.add("is-visible");
        });
      }
    }

    function hideFloatingCard() {
      if (cardTimer) {
        clearTimeout(cardTimer);
        cardTimer = 0;
      }
      state.cardVisible = false;
      floatCardEl.classList.remove("is-visible");
      floatCardEl.classList.add("is-exiting");
      floatCardEl.setAttribute("aria-hidden", "true");
    }

    function navigateCardTopic(cardId, forceOpen) {
      var c = DATA.INFO_CARDS[cardId];
      if (!c) return;
      if (c.focusRoom) {
        focusRoom(c.focusRoom, false);
        showFloatingCard(cardId, !!forceOpen);
      } else if (c.focusView) {
        stopFlight(true);
        if (state.walkMode) exitWalk(true);
        state.viewMode = "exterior";
        if (world) world.setViewMode("exterior");
        applyOrbitPose(DATA.VIEW_PRESETS[c.focusView] || DATA.VIEW_PRESETS.exterior, false);
        showFloatingCard(cardId, !!forceOpen);
      } else {
        showFloatingCard(cardId, !!forceOpen);
      }
      renderUI();
    }

    function setLightMenuOpen(open) {
      state.lightMenuOpen = !!open;
      lightPop.classList.toggle("is-open", state.lightMenuOpen);
      lightPop.setAttribute("aria-hidden", state.lightMenuOpen ? "false" : "true");
      lightTrigger.setAttribute("aria-expanded", state.lightMenuOpen ? "true" : "false");
    }

    /* ---------- Responsive 3D Camera Sizing & Orbit Controller ---------- */
    function resizeRenderer() {
      if (!renderer || !camera) return;
      var vp = vpMetrics();
      var maxDpr = vp.mobile ? 1.5 : 1.85;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, maxDpr));
      if (state.walkMode) {
        camera.fov = vp.mobile ? 66 : vp.compact ? 62 : 58;
      } else if (vp.mobile && vp.aspect < 0.85) {
        camera.fov = 54;
      } else if (vp.shortLandscape) {
        camera.fov = 44;
      } else if (vp.compact) {
        camera.fov = 48;
      } else if (vp.w < 1280) {
        camera.fov = 42;
      } else {
        camera.fov = 38;
      }
      camera.aspect = vp.aspect;
      camera.updateProjectionMatrix();
      renderer.setSize(vp.w, vp.h, false);
    }

    function applyOrbitPose(pose, snap) {
      var vp = vpMetrics();
      var radScale = 1.0;
      if (vp.mobile && vp.aspect < 0.85)
        radScale = clamp(1.22 + (0.65 - vp.aspect) * 0.45, 1.18, 1.38);
      else if (vp.compact && vp.aspect < 1.0) radScale = 1.16;
      else if (vp.w < 1280) radScale = 1.06;

      camTgt.az = pose.az;
      camTgt.pol = vp.compact ? Math.max(0.68, pose.pol - 0.04) : pose.pol;
      camTgt.rad = clamp(pose.rad * radScale, 5.2, 46.0);
      camTgt.tx = pose.tx;
      camTgt.ty = pose.ty + (vp.mobile && vp.aspect < 0.85 ? -0.3 : 0);
      camTgt.tz = pose.tz;
      if (snap) Object.assign(camCur, camTgt);
    }

    function syncOrbitFromCamera(lookTarget) {
      if (!camera) return;
      var dx = camera.position.x - lookTarget.x;
      var dy = camera.position.y - lookTarget.y;
      var dz = camera.position.z - lookTarget.z;
      var r = clamp(Math.hypot(dx, dy, dz), 5.2, 46.0);
      camCur.tx = camTgt.tx = lookTarget.x;
      camCur.ty = camTgt.ty = lookTarget.y;
      camCur.tz = camTgt.tz = lookTarget.z;
      camCur.rad = camTgt.rad = r;
      camCur.pol = camTgt.pol = clamp(Math.acos(clamp(dy / r, -1, 1)), 0.38, 1.42);
      camCur.az = camTgt.az = Math.atan2(dx, dz);
    }

    /* ---------- Cinematic Spline Flights & EXPLORE RESIDENCE ---------- */
    function stopFlight(silent) {
      if (!flight.active) return;
      flight.active = false;
      flight.id = null;
      flight.onComplete = null;
      cinemaBar.classList.remove("is-playing");
      if (!silent) renderUI();
    }

    function startFlight(seq, onComplete) {
      if (!THREE_REF || !world || !seq || !seq.points) return;
      if (state.walkMode) exitWalk(true);
      setFloorPlanOpen(false);
      setLightMenuOpen(false);
      state.viewMode = seq.viewMode || "exterior";
      world.setViewMode(state.viewMode);
      var vp = vpMetrics();
      camera.fov = vp.mobile ? 52 : vp.compact ? 46 : 40;
      camera.updateProjectionMatrix();

      flight.posCurve = new THREE_REF.CatmullRomCurve3(
        seq.points.map(function (p) {
          return new THREE_REF.Vector3(p.pos[0], p.pos[1], p.pos[2]);
        })
      );
      flight.lookCurve = new THREE_REF.CatmullRomCurve3(
        seq.points.map(function (p) {
          return new THREE_REF.Vector3(p.look[0], p.look[1], p.look[2]);
        })
      );
      flight.tmpPos = new THREE_REF.Vector3();
      flight.tmpLook = new THREE_REF.Vector3();
      flight.duration = reducedMotion ? 900 : seq.duration || 8500;
      flight.startTime = performance.now();
      flight.active = true;
      flight.id = seq.id;
      flight.name = DATA.isIdLang(state.lang) && seq.nameId ? seq.nameId : seq.name || "";
      flight.doorOpenAt = typeof seq.doorOpenAt === "number" ? seq.doorOpenAt : null;
      flight.onComplete = onComplete || null;

      cinemaName.textContent = seq.code ? seq.code + " · " + flight.name : flight.name;
      cinemaFill.style.width = "0%";
      cinemaBar.classList.add("is-playing");
      if (vp.compact) {
        state.nav = "explore";
        drawerEl.classList.remove("is-open");
      }
      if (seq.cardId) showFloatingCard(seq.cardId, false);
    }

    function startExploreResidenceJourney() {
      heroEl.classList.add("is-hidden");
      state.nav = "explore";
      state.tgtDoorFrac = 0.0;
      headerEl.classList.add("is-visible");
      dockEl.classList.add("is-visible");
      hideFloatingCard();

      startFlight(DATA.ENTRY_JOURNEY, function () {
        state.viewMode = "exterior";
        state.activeRoomId = "living";
        syncOrbitFromCamera(new THREE_REF.Vector3(4.8, 1.4, -7.2));
        renderUI();
        showFloatingCard("living", false);
      });
      renderUI();
    }

    function returnOutsideCinematic() {
      if (state.walkMode) exitWalk(true);
      state.nav = "explore";
      state.activeRoomId = null;
      state.tgtDoorFrac = 1.0;
      startFlight(DATA.RETURN_EXTERIOR_PATH, function () {
        state.tgtDoorFrac = 0.0;
        state.viewMode = "exterior";
        applyOrbitPose(DATA.VIEW_PRESETS.exterior, false);
        showFloatingCard("overview", false);
        renderUI();
      });
      renderUI();
    }

    /* ---------- Multi-Floor First-Person Walkthrough (L1 ↔ L2 ↔ L3) ---------- */
    function enterWalk(roomId) {
      if (!world) return;
      stopFlight(true);
      setFloorPlanOpen(false);
      setLightMenuOpen(false);
      heroEl.classList.add("is-hidden");
      headerEl.classList.add("is-visible");
      dockEl.classList.remove("is-visible"); // Hide orbit dock while walking so bottom is super clean!
      hideFloatingCard();
      state.walkMode = true;
      state.nav = "explore";
      state.viewMode = "exterior";
      state.tgtDoorFrac = 1.0;
      world.setViewMode("exterior");

      var rm = roomId ? DATA.getRoomById(roomId) : DATA.getRoomById("living");
      if (rm && rm.spawn) {
        walk.x = rm.spawn.x;
        walk.y = rm.spawn.y;
        walk.z = rm.spawn.z;
        walk.yaw = walk.tgtYaw = rm.spawn.yaw;
        walk.pitch = walk.tgtPitch = -0.04;
        state.activeRoomId = rm.id;
      }
      walk.vx = walk.vz = 0;
      walk.goalX = walk.goalZ = null;
      var res = world.resolveWalkCollision(walk.x, walk.z, walk.y, 0.32);
      walk.x = res.x;
      walk.z = res.z;
      walk.y = res.eyeY;
      state.walkLevel = res.level;
      canvasEl.classList.add("is-walk");
      resizeRenderer();
      renderUI();
    }

    function exitWalk(silent) {
      if (!state.walkMode) return;
      state.walkMode = false;
      walk.keys.fwd = walk.keys.back = walk.keys.left = walk.keys.right = false;
      walk.goalX = walk.goalZ = null;
      canvasEl.classList.remove("is-walk");
      if (state.nav !== "home") dockEl.classList.add("is-visible");
      resizeRenderer();
      applyOrbitPose(DATA.VIEW_PRESETS[state.viewMode] || DATA.VIEW_PRESETS.exterior, false);
      if (!silent) renderUI();
    }

    /* ---------- Navigation, Room Focus, Lighting & Floor Plans ---------- */
    function setNav(nav) {
      stopFlight(true);
      setLightMenuOpen(false);
      if (state.walkMode) exitWalk(true);
      state.nav = nav;
      var vp = vpMetrics();

      if (nav === "home") {
        setFloorPlanOpen(false);
        hideFloatingCard();
        state.viewMode = "exterior";
        state.tgtDoorFrac = 0.0;
        if (world) world.setViewMode("exterior");
        applyOrbitPose(DATA.VIEW_PRESETS.hero, false);
        heroEl.classList.remove("is-hidden");
        dockEl.classList.remove("is-visible");
        animateHeroEntrance();
      } else {
        heroEl.classList.add("is-hidden");
        dockEl.classList.toggle("is-visible", nav !== "floorplan");
        setFloorPlanOpen(nav === "floorplan");
        if (nav === "explore") {
          if (!state.cardVisible && !vp.compact && !vp.shortLandscape) {
            showFloatingCard(state.activeCardId || "overview", false);
          }
        } else if (nav === "floorplan" || vp.compact) {
          hideFloatingCard();
        }
      }
      renderUI();
    }

    function setViewMode(mode) {
      stopFlight(true);
      setLightMenuOpen(false);
      if (state.walkMode) exitWalk(true);
      setFloorPlanOpen(false);
      heroEl.classList.add("is-hidden");
      dockEl.classList.add("is-visible");
      state.viewMode = mode;
      state.activeRoomId = mode === "rooftop" ? "rooftop" : null;
      if (world) world.setViewMode(mode);
      applyOrbitPose(DATA.VIEW_PRESETS[mode] || DATA.VIEW_PRESETS.exterior, false);
      if (mode === "exterior") showFloatingCard("overview", false);
      else if (mode === "rooftop") showFloatingCard("architecture", false);
      renderUI();
    }

    function focusRoom(roomId, snap) {
      var rm = DATA.getRoomById(roomId);
      if (!rm) return;
      stopFlight(true);
      setLightMenuOpen(false);
      setFloorPlanOpen(false);
      heroEl.classList.add("is-hidden");
      dockEl.classList.add("is-visible");
      state.activeRoomId = rm.id;
      state.fpLevel = rm.level;
      if (state.walkMode) {
        enterWalk(rm.id);
        return;
      }
      if (vpMetrics().compact) state.nav = "explore";
      state.viewMode = rm.level === 3 ? "rooftop" : rm.level === 2 ? "floor2" : "floor1";
      if (rm.id === "garage") state.viewMode = "exterior";
      if (world) world.setViewMode(state.viewMode);
      applyOrbitPose(rm.cam, !!snap);
      if (rm.cardId) showFloatingCard(rm.cardId, false);
      renderUI();
    }

    function setLighting(id, instant) {
      var sc = DATA.getLightingScene(id);
      state.lightingId = sc.id;
      state.tgtHour = sc.hour;
      state.tgtLamp = sc.lamp;
      setLightMenuOpen(false);
      if (instant) {
        state.curHour = sc.hour;
        state.curLamp = sc.lamp;
        if (world) world.applyAtmosphere(state.curHour, state.curLamp, pg);
      }
      renderUI();
    }

    function setFloorPlanOpen(open) {
      fpModalEl.classList.toggle("is-open", open);
      fpModalEl.setAttribute("aria-hidden", open ? "false" : "true");
    }

    function animateHeroEntrance() {
      var els = [
        heroEl.querySelector(".ge-hero-kicker"),
        heroEl.querySelector(".ge-hero-title"),
        heroEl.querySelector(".ge-hero-sub"),
        heroEl.querySelector(".ge-hero-actions"),
        heroEl.querySelector(".ge-hero-specs"),
      ].filter(Boolean);
      els.forEach(function (el, idx) {
        if (!reducedMotion && el.animate) {
          el.animate(
            [
              { opacity: 0, transform: "translateY(14px)" },
              { opacity: 1, transform: "translateY(0)" },
            ],
            {
              duration: 480,
              delay: idx * 50,
              easing: "cubic-bezier(0.22, 1, 0.36, 1)",
              fill: "forwards",
            }
          );
        } else {
          el.style.opacity = "1";
          el.style.transform = "none";
        }
      });
    }

    /* ---------- UI Rendering (Full-Height Sheet, 2-Column CAD, Popover, Single Dock) ---------- */
    function renderDrawer() {
      var L = DATA.getLocale(state.lang);
      var isId = DATA.isIdLang(state.lang);
      var vp = vpMetrics();
      var show = state.nav === "interior" || state.nav === "gallery" || state.nav === "details";
      drawerEl.classList.toggle("is-open", show);
      if (!show) return;

      var sheetSwitch = vp.compact
        ? '<div class="ge-sheet-handle" aria-hidden="true"><span></span></div>' +
          '<div class="ge-sheet-nav">' +
          '<button type="button" class="ge-snav-btn' +
          (state.nav === "interior" ? " is-active" : "") +
          '" data-ge-nav="interior">' +
          L.nav.interior +
          "</button>" +
          '<button type="button" class="ge-snav-btn' +
          (state.nav === "gallery" ? " is-active" : "") +
          '" data-ge-nav="gallery">' +
          L.nav.gallery +
          "</button>" +
          '<button type="button" class="ge-snav-btn' +
          (state.nav === "details" ? " is-active" : "") +
          '" data-ge-nav="details">' +
          L.nav.details +
          "</button>" +
          '<button type="button" class="ge-snav-btn" data-ge-nav="floorplan">' +
          L.nav.floorplan +
          "</button>" +
          "</div>"
        : "";

      if (state.nav === "interior") {
        var lvl = state.interiorTab;
        var rms = DATA.ROOMS.filter(function (r) {
          return r.level === lvl;
        });
        drawerEl.innerHTML =
          sheetSwitch +
          '<div class="ge-dr-head"><div><span class="ge-kicker">' +
          L.drawer.intKicker +
          '</span><h2 class="ge-dr-title">' +
          L.drawer.intTitle +
          '</h2><p class="ge-dr-sub">' +
          L.drawer.intSub +
          "</p></div>" +
          '<button type="button" class="ge-icon-close" data-ge-nav="explore" aria-label="' +
          L.actions.close +
          '">×</button></div>' +
          '<div class="ge-dr-tabs">' +
          '<button type="button" class="ge-dr-tab' +
          (lvl === 1 ? " is-active" : "") +
          '" data-ge-itab="1">' +
          L.drawer.tabL1 +
          "</button>" +
          '<button type="button" class="ge-dr-tab' +
          (lvl === 2 ? " is-active" : "") +
          '" data-ge-itab="2">' +
          L.drawer.tabL2 +
          "</button>" +
          '<button type="button" class="ge-dr-tab' +
          (lvl === 3 ? " is-active" : "") +
          '" data-ge-itab="3">' +
          L.drawer.tabL3 +
          "</button>" +
          "</div>" +
          '<div class="ge-list">' +
          rms
            .map(function (r) {
              var act = state.activeRoomId === r.id;
              return (
                '<button type="button" class="ge-row' +
                (act ? " is-active" : "") +
                '" data-ge-room="' +
                r.id +
                '">' +
                '<span class="ge-row-num">' +
                r.num +
                "</span>" +
                '<span class="ge-row-meta"><span class="ge-row-top"><span>' +
                DATA.getRoomName(r, state.lang) +
                '</span><span class="ge-row-area">' +
                r.area +
                ' m²</span></span><div class="ge-row-sub">' +
                DATA.getRoomCategory(r, state.lang) +
                "</div></span>" +
                "</button>"
              );
            })
            .join("") +
          "</div>" +
          '<div class="ge-btn-row">' +
          '<button type="button" class="ge-btn-dark" data-ge-action="walk">' +
          L.actions.enterWalk +
          "</button>" +
          '<button type="button" class="ge-btn-light" data-ge-action="return-garden">' +
          L.actions.returnOutside +
          "</button>" +
          "</div>";
        return;
      }

      if (state.nav === "gallery") {
        var gt = state.galleryTab;
        var body =
          gt === "cinematics"
            ? '<div class="ge-list">' +
              DATA.CINEMATICS.map(function (c) {
                var act = flight.active && flight.id === c.id;
                var nm = isId && c.nameId ? c.nameId : c.name;
                var ds = isId && c.descId ? c.descId : c.desc;
                return (
                  '<button type="button" class="ge-row' +
                  (act ? " is-active" : "") +
                  '" data-ge-cinema="' +
                  c.id +
                  '">' +
                  '<span class="ge-row-num">' +
                  c.code +
                  "</span>" +
                  '<span class="ge-row-meta"><span class="ge-row-top"><span>' +
                  nm +
                  '</span><span class="ge-row-area">' +
                  Math.round(c.duration / 1000) +
                  's</span></span><div class="ge-row-sub">' +
                  ds +
                  "</div></span>" +
                  "</button>"
                );
              }).join("") +
              "</div>"
            : '<div class="ge-list">' +
              DATA.GALLERY_SHOTS.map(function (s) {
                var tt = isId && s.titleId ? s.titleId : s.title;
                var sb = isId && s.subId ? s.subId : s.sub;
                return (
                  '<button type="button" class="ge-row" data-ge-shot="' +
                  s.id +
                  '">' +
                  '<span class="ge-row-num">' +
                  s.num +
                  "</span>" +
                  '<span class="ge-row-meta"><span class="ge-row-top"><span>' +
                  tt +
                  '</span><span class="ge-row-area">' +
                  (L.lighting[s.lighting] || s.lighting) +
                  '</span></span><div class="ge-row-sub">' +
                  sb +
                  "</div></span>" +
                  "</button>"
                );
              }).join("") +
              "</div>";

        drawerEl.innerHTML =
          sheetSwitch +
          '<div class="ge-dr-head"><div><span class="ge-kicker">' +
          L.drawer.galKicker +
          '</span><h2 class="ge-dr-title">' +
          L.drawer.galTitle +
          '</h2><p class="ge-dr-sub">' +
          L.drawer.galSub +
          "</p></div>" +
          '<button type="button" class="ge-icon-close" data-ge-nav="explore" aria-label="' +
          L.actions.close +
          '">×</button></div>' +
          '<div class="ge-dr-tabs">' +
          '<button type="button" class="ge-dr-tab' +
          (gt === "cinematics" ? " is-active" : "") +
          '" data-ge-gtab="cinematics">' +
          L.drawer.tabCin +
          "</button>" +
          '<button type="button" class="ge-dr-tab' +
          (gt === "shots" ? " is-active" : "") +
          '" data-ge-gtab="shots">' +
          L.drawer.tabShots +
          "</button>" +
          "</div>" +
          body;
        return;
      }

      // Details Monograph Sheet (100% localized!)
      var det = L.details || DATA.getLocale("en").details;
      drawerEl.innerHTML =
        sheetSwitch +
        '<div class="ge-dr-head"><div><span class="ge-kicker">' +
        L.drawer.detKicker +
        '</span><h2 class="ge-dr-title">' +
        DATA.PROPERTY_CONFIG.name +
        '</h2><p class="ge-dr-sub">' +
        L.heroSub +
        "</p></div>" +
        '<button type="button" class="ge-icon-close" data-ge-nav="explore" aria-label="' +
        L.actions.close +
        '">×</button></div>' +
        '<div class="ge-det-grid">' +
        det.metrics
          .map(function (m) {
            return (
              '<div class="ge-det-cell"><span>' + m.k + "</span><strong>" + m.v + "</strong></div>"
            );
          })
          .join("") +
        "</div>" +
        det.cards
          .map(function (sc) {
            return '<div class="ge-spec-row"><h4>' + sc.h + "</h4><p>" + sc.p + "</p></div>";
          })
          .join("") +
        '<div class="ge-btn-row">' +
        '<button type="button" class="ge-btn-dark" data-ge-cinema="fullTour">' +
        L.actions.playTour +
        "</button>" +
        '<button type="button" class="ge-btn-light" data-ge-card="vehicles">' +
        L.actions.inspectCars +
        "</button>" +
        "</div>" +
        (vp.compact
          ? '<button type="button" class="ge-btn-light" data-ge-nav="home">' +
            L.actions.homeHero +
            "</button>"
          : "");
    }

    function renderFloorPlanAside() {
      var L = DATA.getLocale(state.lang);
      var isId = DATA.isIdLang(state.lang);
      var selRm = state.activeRoomId ? DATA.getRoomById(state.activeRoomId) : null;
      if (selRm) {
        var card = DATA.getInfoCard(selRm.cardId, state.lang);
        fpAsideEl.innerHTML =
          '<span class="ge-kicker">' +
          selRm.num +
          " · L" +
          selRm.level +
          "</span>" +
          '<h3 class="ge-fp-rtitle">' +
          DATA.getRoomName(selRm, state.lang) +
          "</h3>" +
          '<p class="ge-fp-rcat">' +
          DATA.getRoomCategory(selRm, state.lang) +
          "</p>" +
          '<div class="ge-fp-rmeta"><div><span>' +
          (isId ? "Luas" : "Area") +
          "</span><strong>" +
          selRm.area +
          " m²</strong></div><div><span>" +
          (isId ? "Lantai" : "Level") +
          "</span><strong>L" +
          selRm.level +
          "</strong></div></div>" +
          (card ? '<p class="ge-fp-rdesc">' + card.body + "</p>" : "") +
          '<div class="ge-fp-actions">' +
          (state.webglAvailable
            ? '<button type="button" class="ge-btn-dark" data-ge-fp-go="' +
              selRm.id +
              '">' +
              L.actions.inspect3d +
              "</button>"
            : "") +
          (state.webglAvailable
            ? '<button type="button" class="ge-btn-light" data-ge-walk="' +
              selRm.id +
              '">' +
              L.actions.walkInside +
              "</button>"
            : "") +
          "</div>";
      } else {
        fpAsideEl.innerHTML =
          '<span class="ge-kicker">' +
          (isId ? "600 M² · 420 M² · 22 RUANG" : "600 M² · 420 M² · 22 SPACES") +
          "</span>" +
          '<h3 class="ge-fp-rtitle">' +
          L.fp.emptyTitle +
          "</h3>" +
          '<p class="ge-fp-rdesc">' +
          (!state.webglAvailable ? L.fp.webglNotice : L.fp.prompt) +
          "</p>" +
          (state.webglAvailable
            ? '<div class="ge-fp-actions"><button type="button" class="ge-btn-light" data-ge-nav="explore">' +
              L.actions.return3d +
              "</button></div>"
            : "");
      }
    }

    function renderUI() {
      var L = DATA.getLocale(state.lang);
      var vp = vpMetrics();

      // Desktop Top Editorial Underline Navigation (5 concise tabs)
      var navOrder = ["explore", "interior", "floorplan", "gallery", "details"];
      navEl.innerHTML = navOrder
        .map(function (id) {
          var act = state.nav === id;
          return (
            '<button type="button" class="ge-nav-btn' +
            (act ? " is-active" : "") +
            '" data-ge-nav="' +
            id +
            '" role="tab" aria-selected="' +
            (act ? "true" : "false") +
            '">' +
            L.nav[id] +
            "</button>"
          );
        })
        .join("");

      // Compact Header Lighting Trigger + 5-Time Popover
      var dots = {
        morning: "#E9C598",
        day: "#F2DE98",
        golden: "#DF944E",
        evening: "#6C7FB2",
        night: "#293552",
      };
      var caretSvg =
        '<svg class="ge-light-caret" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M4 6l4 4 4-4"/></svg>';
      lightTrigger.innerHTML =
        lightIconSvg(state.lightingId) +
        '<span class="ge-light-lbl">' +
        (L.lighting[state.lightingId] || state.lightingId) +
        "</span>" +
        caretSvg;
      lightTrigger.setAttribute(
        "aria-label",
        L.lightTitle + ": " + (L.lighting[state.lightingId] || state.lightingId)
      );
      lightPop.innerHTML =
        '<div class="ge-lp-head">' +
        L.lightTitle +
        "</div>" +
        DATA.LIGHTING_SCENES.map(function (sc) {
          var act = state.lightingId === sc.id;
          return (
            '<button type="button" class="ge-lp-row' +
            (act ? " is-active" : "") +
            '" data-ge-light="' +
            sc.id +
            '" role="menuitem">' +
            '<span class="ge-lp-l"><i class="ge-pill-dot" style="--dot:' +
            dots[sc.id] +
            '"></i>' +
            L.lighting[sc.id] +
            "</span>" +
            '<span class="ge-lp-t">' +
            sc.clock +
            "</span>" +
            "</button>"
          );
        }).join("");

      // Single Centered Bottom Architectural Command Bar
      var viewOrder = ["exterior", "floor1", "floor2", "rooftop"];
      viewGroup.innerHTML = viewOrder
        .map(function (id) {
          var act = state.viewMode === id && !state.walkMode;
          return (
            '<button type="button" class="ge-dock-btn' +
            (act ? " is-active" : "") +
            '" data-ge-view="' +
            id +
            '">' +
            L.views[id] +
            "</button>"
          );
        })
        .join("");

      actionGroup.innerHTML = vp.compact
        ? '<button type="button" class="ge-dock-btn' +
          (state.walkMode ? " is-active" : "") +
          '" data-ge-action="walk">' +
          L.actions.walk +
          "</button>" +
          '<button type="button" class="ge-dock-btn" data-ge-nav="floorplan">' +
          L.nav.floorplan +
          "</button>" +
          '<button type="button" class="ge-dock-btn" data-ge-nav="interior">' +
          L.nav.interior +
          "</button>" +
          '<button type="button" class="ge-dock-btn' +
          (state.cardVisible ? " is-active" : "") +
          '" data-ge-action="toggle-card">' +
          L.actions.infoCard +
          "</button>"
        : '<button type="button" class="ge-dock-btn' +
          (state.walkMode ? " is-active" : "") +
          '" data-ge-action="walk">' +
          L.actions.walk +
          "</button>" +
          '<button type="button" class="ge-dock-btn' +
          (state.cardVisible ? " is-active" : "") +
          '" data-ge-action="toggle-card">' +
          L.actions.infoCard +
          "</button>" +
          '<button type="button" class="ge-dock-btn" data-ge-action="return-garden">' +
          L.actions.exterior +
          "</button>";

      // Top-Center Walkthrough Bar & Bottom Jump Strip
      walkTopEl.classList.toggle("is-active", state.walkMode);
      walkStripEl.classList.toggle("is-active", state.walkMode);
      dpadEl.classList.toggle("is-visible", state.walkMode && vp.compact);
      if (state.walkMode) {
        walkLvlEl.textContent =
          state.walkLevel === 3 ? L.walk.lvl3 : state.walkLevel === 2 ? L.walk.lvl2 : L.walk.lvl1;
        var quickWalk = [
          "foyer",
          "living",
          "family",
          "dining",
          "kitchen",
          "office",
          "garage",
          "masterBed",
          "bedroom3",
          "rooftop",
        ];
        walkRoomsEl.innerHTML = quickWalk
          .map(function (id) {
            var r = DATA.getRoomById(id);
            return r
              ? '<button type="button" class="ge-walk-chip' +
                  (state.activeRoomId === r.id ? " is-active" : "") +
                  '" data-ge-walk="' +
                  r.id +
                  '">' +
                  DATA.getRoomName(r, state.lang) +
                  "</button>"
              : "";
          })
          .join("");
      }

      // 2-Column Studio CAD Modal
      fpTabsEl.innerHTML =
        '<button type="button" class="ge-fp-tab' +
        (state.fpLevel === 1 ? " is-active" : "") +
        '" data-ge-fplvl="1">' +
        L.fp.l1 +
        "</button>" +
        '<button type="button" class="ge-fp-tab' +
        (state.fpLevel === 2 ? " is-active" : "") +
        '" data-ge-fplvl="2">' +
        L.fp.l2 +
        "</button>" +
        '<button type="button" class="ge-fp-tab' +
        (state.fpLevel === 3 ? " is-active" : "") +
        '" data-ge-fplvl="3">' +
        L.fp.l3 +
        "</button>";
      fpSlotEl.innerHTML = DATA.renderFloorPlanSvg({
        level: state.fpLevel,
        activeRoomId: state.activeRoomId,
        lang: state.lang,
      });
      renderFloorPlanAside();

      if (state.cardVisible && state.activeCardId) {
        floatCardEl.innerHTML = renderCardContent(state.activeCardId);
      }

      renderDrawer();
    }

    /* ---------- Main Animation Loop ---------- */
    function tick(now) {
      if (disposed) return;
      rafId = requestAnimationFrame(tick);
      if (!renderer || !world || !camera || document.hidden) return;

      var dt = clamp((now - lastFrameT) * 0.001, 0.001, 0.05);
      lastFrameT = now;
      var needsRender = false;

      if (
        Math.abs(state.tgtHour - state.curHour) > 0.005 ||
        Math.abs(state.tgtLamp - state.curLamp) > 0.1
      ) {
        var lStep = reducedMotion ? 1.0 : clamp(dt * 3.2, 0.04, 0.35);
        state.curHour = lerp(state.curHour, state.tgtHour, lStep);
        state.curLamp = lerp(state.curLamp, state.tgtLamp, lStep);
        world.applyAtmosphere(state.curHour, state.curLamp, pg);
        needsRender = true;
      }

      if (Math.abs(state.tgtDoorFrac - state.doorFrac) > 0.002) {
        state.doorFrac = lerp(state.doorFrac, state.tgtDoorFrac, clamp(dt * 3.5, 0.04, 0.35));
        world.setDoorOpen(state.doorFrac);
        needsRender = true;
      }

      if (flight.active && flight.posCurve && flight.lookCurve) {
        var rawT = clamp((now - flight.startTime) / flight.duration, 0, 1);
        var eased = easeInOutSine(rawT);
        flight.posCurve.getPoint(eased, flight.tmpPos);
        flight.lookCurve.getPoint(eased, flight.tmpLook);
        camera.position.copy(flight.tmpPos);
        camera.lookAt(flight.tmpLook);
        cinemaFill.style.width = Math.round(rawT * 100) + "%";
        if (flight.doorOpenAt !== null && rawT >= flight.doorOpenAt) state.tgtDoorFrac = 1.0;
        needsRender = true;
        if (rawT >= 1) {
          var doneCb = flight.onComplete;
          var finalLook = flight.tmpLook.clone();
          flight.active = false;
          flight.id = null;
          flight.onComplete = null;
          cinemaBar.classList.remove("is-playing");
          if (doneCb) doneCb();
          else {
            syncOrbitFromCamera(finalLook);
            renderUI();
          }
        }
      } else if (state.walkMode) {
        var gDamp = reducedMotion ? 1.0 : clamp(dt * 12, 0.08, 0.45);
        walk.yaw += (walk.tgtYaw - walk.yaw) * gDamp;
        walk.pitch += (walk.tgtPitch - walk.pitch) * gDamp;
        var fwdX = -Math.sin(walk.yaw),
          fwdZ = -Math.cos(walk.yaw);
        var rightX = Math.cos(walk.yaw),
          rightZ = -Math.sin(walk.yaw);
        var mx = 0,
          mz = 0;
        if (walk.keys.fwd) {
          mx += fwdX;
          mz += fwdZ;
          walk.goalX = walk.goalZ = null;
        }
        if (walk.keys.back) {
          mx -= fwdX;
          mz -= fwdZ;
          walk.goalX = walk.goalZ = null;
        }
        if (walk.keys.right) {
          mx += rightX;
          mz += rightZ;
          walk.goalX = walk.goalZ = null;
        }
        if (walk.keys.left) {
          mx -= rightX;
          mz -= rightZ;
          walk.goalX = walk.goalZ = null;
        }
        if (walk.goalX !== null && walk.goalZ !== null) {
          var gx = walk.goalX - walk.x,
            gz = walk.goalZ - walk.z,
            gd = Math.hypot(gx, gz);
          if (gd < 0.28) {
            walk.goalX = walk.goalZ = null;
          } else {
            mx = gx / gd;
            mz = gz / gd;
          }
        }
        var mLen = Math.hypot(mx, mz),
          maxSpd = 3.4;
        var accel = clamp(dt * 9.5, 0.05, 0.35);
        walk.vx += ((mLen > 0.01 ? (mx / mLen) * maxSpd : 0) - walk.vx) * accel;
        walk.vz += ((mLen > 0.01 ? (mz / mLen) * maxSpd : 0) - walk.vz) * accel;
        if (Math.abs(walk.vx) < 0.01) walk.vx = 0;
        if (Math.abs(walk.vz) < 0.01) walk.vz = 0;
        var spd = Math.hypot(walk.vx, walk.vz);
        if (spd > 0.015) {
          var res = world.resolveWalkCollision(
            walk.x + walk.vx * dt,
            walk.z + walk.vz * dt,
            walk.y,
            0.32
          );
          walk.x = res.x;
          walk.z = res.z;
          walk.y += (res.eyeY - walk.y) * clamp(dt * 10, 0.1, 0.45);
          if (res.level !== state.walkLevel) {
            state.walkLevel = res.level;
            var L = DATA.getLocale(state.lang);
            walkLvlEl.textContent =
              res.level === 3 ? L.walk.lvl3 : res.level === 2 ? L.walk.lvl2 : L.walk.lvl1;
          }
          walk.bobPhase += dt * spd * 2.5;
        }
        var bob = reducedMotion ? 0 : Math.sin(walk.bobPhase) * Math.min(spd / maxSpd, 1) * 0.02;
        camera.position.set(walk.x, walk.y + bob, walk.z);
        var cosP = Math.cos(walk.pitch);
        camera.lookAt(
          walk.x - Math.sin(walk.yaw) * cosP * 3.2,
          walk.y + bob + Math.sin(walk.pitch) * 3.2,
          walk.z - Math.cos(walk.yaw) * cosP * 3.2
        );
        needsRender = true;
      } else {
        if (state.nav === "home" && !isDragging && !reducedMotion) {
          camTgt.az = DATA.VIEW_PRESETS.hero.az + Math.sin(now * 0.00022) * 0.14;
        }
        var damp = reducedMotion ? 1.0 : 0.1;
        var moving = false;
        ["az", "pol", "rad", "tx", "ty", "tz"].forEach(function (k) {
          var diff = camTgt[k] - camCur[k];
          if (Math.abs(diff) > 0.0008) {
            camCur[k] += diff * damp;
            moving = true;
          } else camCur[k] = camTgt[k];
        });
        var sinP = Math.sin(camCur.pol);
        camera.position.set(
          camCur.tx + camCur.rad * sinP * Math.sin(camCur.az),
          camCur.ty + camCur.rad * Math.cos(camCur.pol),
          camCur.tz + camCur.rad * sinP * Math.cos(camCur.az)
        );
        camera.lookAt(camCur.tx, camCur.ty, camCur.tz);
        if (moving) needsRender = true;
      }

      if (!reducedMotion && state.nav !== "floorplan") {
        if (needsRender || now - lastIdleRender >= 42) {
          world.animate(now);
          needsRender = true;
          lastIdleRender = now;
        }
      }

      if (needsRender) renderer.render(world.scene, camera);
    }

    /* ---------- Pointer, Wheel, Keyboard & Portfolio Listeners ---------- */
    var pointers = new Map(),
      isDragging = false,
      dragMoved = false,
      lastX = 0,
      lastY = 0,
      downX = 0,
      downY = 0,
      lastPinch = 0;
    var raycaster = null,
      ndc = null;

    function raycast(clientX, clientY, targets) {
      if (!THREE_REF || !camera || !targets.length) return null;
      if (!raycaster) {
        raycaster = new THREE_REF.Raycaster();
        ndc = new THREE_REF.Vector2();
      }
      var r = canvasEl.getBoundingClientRect();
      ndc.x = ((clientX - r.left) / r.width) * 2 - 1;
      ndc.y = -((clientY - r.top) / r.height) * 2 + 1;
      raycaster.setFromCamera(ndc, camera);
      var hits = raycaster.intersectObjects(targets, false);
      return hits.length ? hits[0] : null;
    }

    function onCanvasDown(e) {
      if (state.lightMenuOpen) setLightMenuOpen(false);
      pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
      try {
        canvasEl.setPointerCapture(e.pointerId);
      } catch (_) {}
      if (pointers.size === 1) {
        isDragging = true;
        dragMoved = false;
        downX = lastX = e.clientX;
        downY = lastY = e.clientY;
        canvasEl.classList.add("is-dragging");
      } else if (pointers.size === 2) {
        var pts = Array.from(pointers.values());
        lastPinch = Math.hypot(pts[1].x - pts[0].x, pts[1].y - pts[0].y);
        dragMoved = true;
        stopFlight(false);
      }
    }

    function onCanvasMove(e) {
      if (pointers.has(e.pointerId)) pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
      if (pointers.size === 2 && !state.walkMode) {
        var pts = Array.from(pointers.values());
        var d = Math.hypot(pts[1].x - pts[0].x, pts[1].y - pts[0].y);
        if (lastPinch > 0) camTgt.rad = clamp(camTgt.rad + (lastPinch - d) * 0.05, 5.2, 46.0);
        lastPinch = d;
        return;
      }
      if (isDragging) {
        var dx = e.clientX - lastX,
          dy = e.clientY - lastY;
        lastX = e.clientX;
        lastY = e.clientY;
        if (!dragMoved && Math.hypot(e.clientX - downX, e.clientY - downY) > 6) {
          dragMoved = true;
          if (flight.active) {
            syncOrbitFromCamera(flight.tmpLook);
            stopFlight(false);
          }
        }
        if (dragMoved) {
          if (state.walkMode) {
            walk.tgtYaw -= dx * 0.005;
            walk.tgtPitch = clamp(walk.tgtPitch - dy * 0.004, -0.82, 0.82);
          } else {
            camTgt.az -= dx * 0.0068;
            camTgt.pol = clamp(camTgt.pol - dy * 0.0058, 0.36, 1.4);
          }
        }
      }
    }

    function onCanvasUp(e) {
      pointers.delete(e.pointerId);
      if (pointers.size < 2) lastPinch = 0;
      if (pointers.size === 0) {
        var wasTap = isDragging && !dragMoved;
        isDragging = false;
        canvasEl.classList.remove("is-dragging");
        if (wasTap && world && state.nav !== "home") {
          if (state.walkMode) {
            var fh = raycast(e.clientX, e.clientY, world.floorHitMeshes);
            if (fh && fh.point) {
              walk.goalX = fh.point.x;
              walk.goalZ = fh.point.z;
            }
          } else {
            var rh = raycast(e.clientX, e.clientY, world.roomHitMeshes);
            if (rh && rh.object.userData.roomId) focusRoom(rh.object.userData.roomId, false);
          }
        }
      }
    }

    function onCanvasWheel(e) {
      if (state.nav === "floorplan") return;
      e.preventDefault();
      if (flight.active) {
        syncOrbitFromCamera(flight.tmpLook);
        stopFlight(false);
      }
      if (!state.walkMode) camTgt.rad = clamp(camTgt.rad + e.deltaY * 0.015, 5.2, 46.0);
    }

    function onDpadDown(e) {
      var b = e.target.closest("[data-ge-move]");
      if (!b) return;
      e.preventDefault();
      walk.keys[b.getAttribute("data-ge-move")] = true;
    }
    function onDpadUp() {
      walk.keys.fwd = walk.keys.back = walk.keys.left = walk.keys.right = false;
    }

    function onStageClick(e) {
      var t = e.target;
      if (state.lightMenuOpen && !t.closest(".ge-light-wrap")) setLightMenuOpen(false);

      var navBtn = t.closest("[data-ge-nav]");
      if (navBtn) {
        setNav(navBtn.getAttribute("data-ge-nav"));
        return;
      }

      var viewBtn = t.closest("[data-ge-view]");
      if (viewBtn) {
        setViewMode(viewBtn.getAttribute("data-ge-view"));
        return;
      }

      var lightBtn = t.closest("[data-ge-light]");
      if (lightBtn) {
        setLighting(lightBtn.getAttribute("data-ge-light"), false);
        return;
      }

      var stepBtn = t.closest("[data-ge-card-step]");
      if (stepBtn) {
        var dir = parseInt(stepBtn.getAttribute("data-ge-card-step"), 10);
        var curI = Math.max(0, DATA.CARD_ORDER.indexOf(state.activeCardId || "overview"));
        var nextI = (curI + dir + DATA.CARD_ORDER.length) % DATA.CARD_ORDER.length;
        navigateCardTopic(DATA.CARD_ORDER[nextI], true);
        return;
      }

      var cardBtn = t.closest("[data-ge-card]");
      if (cardBtn) {
        navigateCardTopic(cardBtn.getAttribute("data-ge-card"), true);
        return;
      }

      var itab = t.closest("[data-ge-itab]");
      if (itab) {
        state.interiorTab = parseInt(itab.getAttribute("data-ge-itab"), 10);
        renderUI();
        return;
      }

      var gtab = t.closest("[data-ge-gtab]");
      if (gtab) {
        state.galleryTab = gtab.getAttribute("data-ge-gtab");
        renderUI();
        return;
      }

      var cinEl = t.closest("[data-ge-cinema]");
      if (cinEl) {
        var seq = DATA.getCinematicById(cinEl.getAttribute("data-ge-cinema"));
        if (seq) {
          heroEl.classList.add("is-hidden");
          dockEl.classList.add("is-visible");
          startFlight(seq, null);
          renderUI();
        }
        return;
      }

      var shotEl = t.closest("[data-ge-shot]");
      if (shotEl) {
        var sid = shotEl.getAttribute("data-ge-shot");
        for (var i = 0; i < DATA.GALLERY_SHOTS.length; i++) {
          if (DATA.GALLERY_SHOTS[i].id === sid) {
            var s = DATA.GALLERY_SHOTS[i];
            stopFlight(true);
            heroEl.classList.add("is-hidden");
            dockEl.classList.add("is-visible");
            state.viewMode = s.viewMode;
            if (world) world.setViewMode(s.viewMode);
            setLighting(s.lighting, false);
            applyOrbitPose(s.cam, false);
            if (vpMetrics().compact) state.nav = "explore";
            if (s.cardId) showFloatingCard(s.cardId, false);
            renderUI();
            break;
          }
        }
        return;
      }

      var fpl = t.closest("[data-ge-fplvl]");
      if (fpl) {
        state.fpLevel = parseInt(fpl.getAttribute("data-ge-fplvl"), 10);
        renderUI();
        return;
      }

      var fpGo = t.closest("[data-ge-fp-go]");
      if (fpGo) {
        state.nav = "explore";
        focusRoom(fpGo.getAttribute("data-ge-fp-go"), false);
        return;
      }

      var walkEl = t.closest("[data-ge-walk]");
      if (walkEl) {
        enterWalk(walkEl.getAttribute("data-ge-walk"));
        return;
      }

      var rmEl = t.closest("[data-ge-room]");
      if (rmEl) {
        var rid = rmEl.getAttribute("data-ge-room");
        if (state.nav === "floorplan") {
          state.activeRoomId = rid;
          renderUI();
        } else focusRoom(rid, false);
        return;
      }

      var actEl = t.closest("[data-ge-action]");
      if (!actEl) return;
      var act = actEl.getAttribute("data-ge-action");
      if (act === "portfolio-back") {
        stopFlight(true);
        if (state.walkMode) exitWalk(true);
        if (typeof window.zkClosePage === "function") window.zkClosePage();
      } else if (act === "toggle-light") {
        setLightMenuOpen(!state.lightMenuOpen);
      } else if (act === "open-menu") {
        if (state.nav === "interior" || state.nav === "gallery" || state.nav === "details")
          setNav("explore");
        else setNav("interior");
      } else if (act === "walk") {
        if (state.walkMode) exitWalk(false);
        else enterWalk(state.activeRoomId || "living");
      } else if (act === "return-garden") {
        returnOutsideCinematic();
      } else if (act === "toggle-card") {
        if (state.cardVisible) hideFloatingCard();
        else showFloatingCard(state.activeCardId || "overview", true);
        renderUI();
      } else if (act === "close-card") {
        hideFloatingCard();
        renderUI();
      }
    }

    function onKeyDown(e) {
      if (state.walkMode) {
        var k = e.key.toLowerCase();
        if (k === "w" || e.key === "ArrowUp") {
          walk.keys.fwd = true;
          e.preventDefault();
        }
        if (k === "s" || e.key === "ArrowDown") {
          walk.keys.back = true;
          e.preventDefault();
        }
        if (k === "a" || e.key === "ArrowLeft") {
          walk.keys.left = true;
          e.preventDefault();
        }
        if (k === "d" || e.key === "ArrowRight") {
          walk.keys.right = true;
          e.preventDefault();
        }
      }
    }

    function onKeyUp(e) {
      var k = e.key.toLowerCase();
      if (k === "w" || e.key === "ArrowUp") walk.keys.fwd = false;
      if (k === "s" || e.key === "ArrowDown") walk.keys.back = false;
      if (k === "a" || e.key === "ArrowLeft") walk.keys.left = false;
      if (k === "d" || e.key === "ArrowRight") walk.keys.right = false;
    }

    function onLangChange(e) {
      state.lang = (e && e.detail && e.detail.lang) || (window.ZK && window.ZK.lang) || "id";
      applyStaticTranslations();
      renderUI();
    }

    function onResize() {
      resizeRenderer();
      if ((vpMetrics().compact || vpMetrics().shortLandscape) && state.cardVisible)
        hideFloatingCard();
      renderUI();
    }

    function onExploreClick() {
      startExploreResidenceJourney();
    }
    function onCinemaStop() {
      if (flight.active) {
        syncOrbitFromCamera(flight.tmpLook);
        stopFlight(false);
      }
    }
    function onWalkExit() {
      exitWalk(false);
    }

    /* ---------- Portfolio Escape & QA Introspection Hooks ---------- */
    window.__zkHouseEscape = function () {
      if (state.lightMenuOpen) {
        setLightMenuOpen(false);
        return true;
      }
      if (flight.active) {
        syncOrbitFromCamera(flight.tmpLook);
        stopFlight(false);
        return true;
      }
      if (state.walkMode) {
        exitWalk(false);
        return true;
      }
      if (state.nav === "floorplan" && state.webglAvailable) {
        setNav("explore");
        return true;
      }
      if (state.nav === "interior" || state.nav === "gallery" || state.nav === "details") {
        setNav("explore");
        return true;
      }
      return false;
    };

    window.__zkHouseInspect = function () {
      return {
        ready: !!world,
        webglAvailable: state.webglAvailable,
        lang: state.lang,
        nav: state.nav,
        viewMode: state.viewMode,
        lightingId: state.lightingId,
        lightMenuOpen: state.lightMenuOpen,
        walkMode: state.walkMode,
        walkLevel: state.walkLevel,
        flightActive: flight.active,
        cardVisible: state.cardVisible,
        activeCardId: state.activeCardId,
        isNightUI: pg.classList.contains("ge-is-night"),
        collidersCount: world ? world.collidersCount : 0,
        resolveTest: world ? world.resolveWalkCollision : null,
        setLighting: setLighting,
        setLightMenuOpen: setLightMenuOpen,
        setViewMode: setViewMode,
        setNav: setNav,
        focusRoom: focusRoom,
        showCard: showFloatingCard,
        hideCard: hideFloatingCard,
        setLang: function (code) {
          state.lang = code;
          applyStaticTranslations();
          renderUI();
        },
        setShot: function (shotId) {
          for (var i = 0; i < DATA.GALLERY_SHOTS.length; i++) {
            var s = DATA.GALLERY_SHOTS[i];
            if (s.id === shotId) {
              stopFlight(true);
              if (state.walkMode) exitWalk(true);
              setFloorPlanOpen(false);
              heroEl.classList.add("is-hidden");
              dockEl.classList.add("is-visible");
              state.nav = "explore";
              state.viewMode = s.viewMode;
              if (world) world.setViewMode(s.viewMode);
              setLighting(s.lighting, true);
              applyOrbitPose(s.cam, true);
              if (s.cardId) showFloatingCard(s.cardId, false);
              renderUI();
              if (renderer && world && camera) {
                var sinP = Math.sin(camCur.pol);
                camera.position.set(
                  camCur.tx + camCur.rad * sinP * Math.sin(camCur.az),
                  camCur.ty + camCur.rad * Math.cos(camCur.pol),
                  camCur.tz + camCur.rad * sinP * Math.cos(camCur.az)
                );
                camera.lookAt(camCur.tx, camCur.ty, camCur.tz);
                renderer.render(world.scene, camera);
              }
              return s.id;
            }
          }
          return null;
        },
        startExplore: startExploreResidenceJourney,
        enterWalk: enterWalk,
      };
    };

    /* ---------- Attach Listeners & Boot 3D Stage ---------- */
    canvasEl.addEventListener("pointerdown", onCanvasDown);
    canvasEl.addEventListener("pointermove", onCanvasMove);
    canvasEl.addEventListener("pointerup", onCanvasUp);
    canvasEl.addEventListener("pointercancel", onCanvasUp);
    canvasEl.addEventListener("wheel", onCanvasWheel, { passive: false });
    dpadEl.addEventListener("pointerdown", onDpadDown);
    window.addEventListener("pointerup", onDpadUp);
    window.addEventListener("pointercancel", onDpadUp);
    stage.addEventListener("click", onStageClick);
    exploreCta.addEventListener("click", onExploreClick);
    cinemaStop.addEventListener("click", onCinemaStop);
    walkExitBtn.addEventListener("click", onWalkExit);
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("keyup", onKeyUp);
    window.addEventListener("zk-lang", onLangChange);
    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onResize);
    if (window.ResizeObserver) {
      resizeObserver = new ResizeObserver(function () {
        resizeRenderer();
      });
      resizeObserver.observe(stage);
    }

    applyStaticTranslations();
    loadStatEl.textContent = DATA.getLocale(state.lang).loaderInit;
    loadBarEl.style.width = "34%";
    renderUI();

    waitForThree(3500, function (THREE) {
      if (disposed) return;
      if (THREE && WORLD_MOD) {
        loadBarEl.style.width = "68%";
        loadStatEl.textContent = DATA.getLocale(state.lang).loaderBuild;
        requestAnimationFrame(function () {
          if (disposed) return;
          try {
            THREE_REF = THREE;
            renderer = new THREE.WebGLRenderer({
              canvas: canvasEl,
              antialias: true,
              powerPreference: "high-performance",
            });
            renderer.shadowMap.enabled = true;
            renderer.shadowMap.type = THREE.PCFSoftShadowMap;
            renderer.outputEncoding = THREE.sRGBEncoding;
            renderer.toneMapping = THREE.ACESFilmicToneMapping;
            renderer.toneMappingExposure = 1.06;

            camera = new THREE.PerspectiveCamera(38, 1.5, 0.14, 185);
            world = WORLD_MOD.buildGrandEstateWorld(THREE, renderer, DATA);
            world.setViewMode("exterior");
            world.applyAtmosphere(state.curHour, state.curLamp, pg);
            state.webglAvailable = true;

            resizeRenderer();
            applyOrbitPose(DATA.VIEW_PRESETS.hero, true);
            renderUI();

            var sinP = Math.sin(camCur.pol);
            camera.position.set(
              camCur.tx + camCur.rad * sinP * Math.sin(camCur.az),
              camCur.ty + camCur.rad * Math.cos(camCur.pol),
              camCur.tz + camCur.rad * sinP * Math.cos(camCur.az)
            );
            camera.lookAt(camCur.tx, camCur.ty, camCur.tz);
            renderer.render(world.scene, camera);

            loadBarEl.style.width = "100%";
            loadStatEl.textContent = DATA.getLocale(state.lang).loaderReady;

            setTimeout(function () {
              if (disposed) return;
              loaderEl.classList.add("is-done");
              canvasEl.classList.remove("is-loading-blur");
              headerEl.classList.add("is-visible");
              animateHeroEntrance();
              lastFrameT = performance.now();
              rafId = requestAnimationFrame(tick);
            }, 300);
            return;
          } catch (_) {
            if (renderer) {
              try {
                renderer.dispose();
              } catch (__) {}
              renderer = null;
            }
          }
        });
        return;
      }

      state.webglAvailable = false;
      state.nav = "floorplan";
      loaderEl.classList.add("is-done");
      headerEl.classList.add("is-visible");
      heroEl.classList.add("is-hidden");
      setFloorPlanOpen(true);
      renderUI();
    });

    /* ---------- Deterministic Cleanup ---------- */
    return function cleanup() {
      disposed = true;
      stopFlight(true);
      if (cardTimer) clearTimeout(cardTimer);
      if (rafId) cancelAnimationFrame(rafId);
      if (resizeObserver) {
        try {
          resizeObserver.disconnect();
        } catch (_) {}
        resizeObserver = null;
      }

      canvasEl.removeEventListener("pointerdown", onCanvasDown);
      canvasEl.removeEventListener("pointermove", onCanvasMove);
      canvasEl.removeEventListener("pointerup", onCanvasUp);
      canvasEl.removeEventListener("pointercancel", onCanvasUp);
      canvasEl.removeEventListener("wheel", onCanvasWheel);
      dpadEl.removeEventListener("pointerdown", onDpadDown);
      window.removeEventListener("pointerup", onDpadUp);
      window.removeEventListener("pointercancel", onDpadUp);
      stage.removeEventListener("click", onStageClick);
      exploreCta.removeEventListener("click", onExploreClick);
      cinemaStop.removeEventListener("click", onCinemaStop);
      walkExitBtn.removeEventListener("click", onWalkExit);
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("keyup", onKeyUp);
      window.removeEventListener("zk-lang", onLangChange);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);

      document.body.classList.remove("dh-active");
      pg.classList.remove("ge-is-night");
      pg.removeAttribute("dir");
      delete window.__zkHouseEscape;
      delete window.__zkHouseInspect;

      if (world) {
        world.dispose();
        world = null;
      }
      if (renderer) {
        try {
          renderer.dispose();
        } catch (_) {}
        renderer = null;
      }
      camera = null;
    };
  }

  function register() {
    if (window.ZK3D && typeof window.ZK3D.registerPage === "function") {
      window.ZK3D.registerPage(8, mountEstate);
    } else {
      window.addEventListener(
        "load",
        function () {
          if (window.ZK3D && typeof window.ZK3D.registerPage === "function") {
            window.ZK3D.registerPage(8, mountEstate);
          }
        },
        { once: true }
      );
    }
  }

  register();
})();
