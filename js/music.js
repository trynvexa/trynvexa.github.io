/* ============================================================
   music.js
   ============================================================ */

/**
 * Vinyl Audio Player & Visualizer
 * HTML5 audio playlist, canvas ambient dust particles, progress scrub slider,
 * and responsive turntable controls.
 */
(function () {
  /* ===== Daftar lagu & Web Audio Studio Synth Engine =====
   Mendukung file MP3 (jika tersedia di assets/audio/) sekaligus Mode Studio Interaktif
   berbasis Web Audio API agar pemutar musik selalu berfungsi mulus tanpa error 404. */
  var TRACKS = [
    {
      t: "BAD",
      a: "ATEEZ",
      d: "2:36",
      g: "Dark R&B · 118 BPM",
      bpm: 118,
      notes: [220, 261.63, 329.63, 392],
      src: "assets/audio/lagu-1.mp3",
    },
    {
      t: "RUDE!",
      a: "Hearts2Hearts",
      d: "3:20",
      g: "Upbeat Pop · 126 BPM",
      bpm: 126,
      notes: [261.63, 329.63, 392, 493.88],
      src: "assets/audio/lagu-2.mp3",
    },
    {
      t: "REDRED",
      a: "CORTIS",
      d: "2:43",
      g: "Alt Hip-Hop · 110 BPM",
      bpm: 110,
      notes: [196, 233.08, 293.66, 349.23],
      src: "assets/audio/lagu-3.mp3",
    },
    {
      t: "Drip",
      a: "ATEEZ",
      d: "3:02",
      g: "Performance Trap · 135 BPM",
      bpm: 135,
      notes: [185, 220, 277.18, 329.63],
      src: "assets/audio/lagu-4.mp3",
    },
    {
      t: "BANG BANG BANG",
      a: "BIGBANG",
      d: "3:40",
      g: "Electro Anthem · 130 BPM",
      bpm: 130,
      notes: [246.94, 293.66, 369.99, 440],
      src: "assets/audio/lagu-5.mp3",
    },
    {
      t: "Bloody Paradise",
      a: "ENHYPEN",
      d: "2:11",
      g: "Dark Synth · 122 BPM",
      bpm: 122,
      notes: [207.65, 246.94, 311.13, 392],
      src: "assets/audio/lagu-6.mp3",
    },
  ];
  var reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  var au = new Audio(),
    cur = -1,
    ol = null,
    pg = null,
    bg = null,
    sim = false,
    simT = 0,
    raf = 0,
    rot = 0,
    vel = 0,
    last = 0,
    cv = null,
    cx = null,
    P = [],
    np = null;
  au.preload = "none";
  var synthOn = true,
    actx = null,
    synthTimer = 0,
    stepIdx = 0;
  var analyser = null,
    mediaSrc = null,
    freqBuf = null,
    vizBins = new Float32Array(64);
  function ensureAnalyser() {
    if (analyser || sim) return;
    if (location.protocol === "file:") return;
    try {
      actx = actx || new (window.AudioContext || window.webkitAudioContext)();
      if (actx.state === "suspended") actx.resume();
      if (!mediaSrc) {
        mediaSrc = actx.createMediaElementSource(au);
        analyser = actx.createAnalyser();
        analyser.fftSize = 128;
        analyser.smoothingTimeConstant = 0.78;
        mediaSrc.connect(analyser);
        analyser.connect(actx.destination);
        freqBuf = new Uint8Array(analyser.frequencyBinCount);
      }
    } catch (e) {
      analyser = null;
    }
  }
  function getAudioState(t) {
    var run = running(),
      tr = cur >= 0 ? TRACKS[cur] : null,
      bpm = (tr && tr.bpm) || 120;
    var accPair = ACC[(cur >= 0 ? cur : 0) % ACC.length];
    var bass = 0,
      mid = 0,
      treble = 0,
      hasSignal = false;
    if (run && analyser && freqBuf && !sim) {
      try {
        analyser.getByteFrequencyData(freqBuf);
        var n = freqBuf.length,
          sum = 0;
        for (var s = 0; s < n; s++) sum += freqBuf[s];
        if (sum > 24) {
          hasSignal = true;
          for (var i = 0; i < vizBins.length; i++) {
            vizBins[i] = freqBuf[i % n] / 255;
          }
          for (var b = 0; b < 6; b++) bass += freqBuf[b] / 255;
          bass /= 6;
          for (var m = 6; m < 22; m++) mid += freqBuf[m] / 255;
          mid /= 16;
          for (var h = 22; h < n; h++) treble += freqBuf[h] / 255;
          treble /= Math.max(1, n - 22);
        }
      } catch (e) {}
    }
    if (run && !hasSignal) {
      var beatPhase = (t * (bpm / 60)) % 1;
      var kick = Math.pow(Math.max(0, 1 - beatPhase * 2.6), 2);
      bass = 0.22 + kick * 0.68;
      mid = 0.18 + Math.abs(Math.sin(t * 3.8)) * 0.45;
      treble = 0.14 + Math.abs(Math.cos(t * 6.2)) * 0.35;
      for (var k = 0; k < vizBins.length; k++) {
        var wave = 0.5 + 0.5 * Math.sin(t * 5.2 + k * 0.42);
        vizBins[k] = Math.min(1, 0.12 + kick * 0.45 * (1 - k / 64) + wave * 0.36);
      }
    } else if (!run) {
      for (var z = 0; z < vizBins.length; z++) vizBins[z] *= 0.88;
    }
    return {
      playing: run,
      sim: sim,
      bpm: bpm,
      rot: rot,
      cur: cur,
      acc: accPair[0],
      acc2: accPair[1],
      bass: bass,
      mid: mid,
      treble: treble,
      bins: vizBins,
    };
  }
  window.__zkMusicAudio = { getState: getAudioState };
  function stopSynth() {
    if (synthTimer) {
      clearInterval(synthTimer);
      synthTimer = 0;
    }
  }
  function playSynthStep() {
    if (!synthOn || !sim || cur < 0) return;
    try {
      actx = actx || new (window.AudioContext || window.webkitAudioContext)();
      if (actx.state === "suspended") actx.resume();
      var tr = TRACKS[cur],
        notes = tr.notes || [220, 261.63, 329.63, 392];
      var freq = notes[stepIdx % notes.length] * (stepIdx % 8 === 7 ? 1.5 : 1);
      var now = actx.currentTime;
      var osc = actx.createOscillator(),
        gain = actx.createGain(),
        flt = actx.createBiquadFilter();
      osc.type = stepIdx % 2 === 0 ? "triangle" : "sine";
      osc.frequency.setValueAtTime(freq, now);
      flt.type = "lowpass";
      flt.frequency.setValueAtTime(920, now);
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(0.032, now + 0.025);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.38);
      osc.connect(flt);
      flt.connect(gain);
      gain.connect(actx.destination);
      osc.start(now);
      osc.stop(now + 0.4);
      if (stepIdx % 4 === 0) {
        var bass = actx.createOscillator(),
          bgain = actx.createGain();
        bass.type = "sine";
        bass.frequency.setValueAtTime(notes[0] * 0.5, now);
        bass.frequency.exponentialRampToValueAtTime(notes[0] * 0.25, now + 0.18);
        bgain.gain.setValueAtTime(0.04, now);
        bgain.gain.exponentialRampToValueAtTime(0.0001, now + 0.22);
        bass.connect(bgain);
        bgain.connect(actx.destination);
        bass.start(now);
        bass.stop(now + 0.24);
      }
      stepIdx++;
    } catch (e) {}
  }
  function syncSynth() {
    stopSynth();
    if (sim && cur >= 0 && synthOn) {
      var bpm = (TRACKS[cur] && TRACKS[cur].bpm) || 120;
      var iv = Math.round((60 / bpm) * 500);
      playSynthStep();
      synthTimer = setInterval(playSynthStep, iv);
    }
  }
  function esc(x) {
    return String(x).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }
  function fmt(s) {
    s = Math.max(0, Math.floor(s || 0));
    return Math.floor(s / 60) + ":" + ("0" + (s % 60)).slice(-2);
  }
  function secs(d) {
    var p = d.split(":");
    return (+p[0] || 0) * 60 + (+p[1] || 0) || 1;
  }
  function live() {
    return !au.paused && !!au.src;
  }
  var urls = {};
  function srcOf(i) {
    var s = TRACKS[i].src;
    if (!s || s.slice(0, 5) !== "data:") return s;
    if (urls[i]) return urls[i];
    try {
      var c = s.indexOf(","),
        bin = atob(s.slice(c + 1)),
        n = bin.length,
        u = new Uint8Array(n);
      for (var k = 0; k < n; k++) u[k] = bin.charCodeAt(k);
      urls[i] = URL.createObjectURL(
        new Blob([u], { type: s.slice(5, c).split(";")[0] || "audio/mpeg" })
      );
    } catch (e) {
      urls[i] = s;
    }
    return urls[i];
  }
  function fallbackToStudio() {
    au.pause();
    au.removeAttribute("src");
    sim = true;
    syncSynth();
    mark();
  }
  function go() {
    ensureAnalyser();
    var pr;
    try {
      pr = au.play();
    } catch (e) {
      fallbackToStudio();
      return;
    }
    if (pr && pr.catch)
      pr.catch(function (e) {
        if (e && e.name === "AbortError") return;
        fallbackToStudio();
      });
  }
  function running() {
    return cur >= 0 && (TRACKS[cur].src && !sim ? live() : sim);
  }
  function ghost(t) {
    var g = bg && bg.querySelector(".ghost");
    if (!g) return;
    g.textContent = t;
    g.classList.remove("sw");
    void g.offsetWidth;
    g.classList.add("sw");
  }
  function mark() {
    if (!ol) return;
    var run = running();
    if (pg) pg.classList.toggle("playing", run);
    if (np) {
      np.classList.toggle("go", run);
      var kk = np.querySelector(".npk");
      if (kk) {
        kk.textContent = run ? "Sedang diputar" : cur >= 0 ? "Dijeda" : "Pemutar";
        if (window.ZK && ZK.walk) ZK.walk(kk);
      }
    }
    [].forEach.call(ol.children, function (li, i) {
      var b = li.firstChild;
      if (i === cur) b.setAttribute("aria-current", "true");
      else {
        b.removeAttribute("aria-current");
        b.style.removeProperty("--p");
      }
      b.classList.toggle("go", i === cur && run);
    });
  }
  var ACC = [
    ["#e0654f", "#f59a72"],
    ["#cf5f82", "#ee93ad"],
    ["#c9524f", "#e98479"],
    ["#3f8cc2", "#76bde0"],
    ["#c8832a", "#e8ae55"],
    ["#3f8f7b", "#6dbfa8"],
  ];
  var SV = {
    pv: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 5h2v14H6zM20 5v14L9.5 12z"/></svg>',
    nx: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M16 5h2v14h-2zM4 5v14l10.5-7z"/></svg>',
    pl: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>',
    ps: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z"/></svg>',
  };
  function accent(i) {
    if (!pg) return;
    var a = ACC[i % ACC.length];
    pg.style.setProperty("--acc", a[0]);
    pg.style.setProperty("--acc2", a[1]);
    pg.classList.add("started");
  }
  function npBuild() {
    if (np && np.parentNode) np.parentNode.removeChild(np);
    np = document.createElement("div");
    np.className = "np";
    np.setAttribute("role", "group");
    np.setAttribute("aria-label", "Pemutar musik");
    np.innerHTML =
      '<div class="npr"><span class="npd" aria-hidden="true"></span><div class="npi"><div class="np-head-row"><span class="npk">Pemutar</span></div><b class="npt">Pilih lagu</b><em class="npa">Ketuk satu lagu di playlist</em></div><div class="npc"><button type="button" class="npv pv" aria-label="Lagu sebelumnya">' +
      SV.pv +
      '</button><button type="button" class="npv npp" aria-label="Putar atau jeda"><span class="i1">' +
      SV.pl +
      '</span><span class="i2">' +
      SV.ps +
      '</span></button><button type="button" class="npv nx" aria-label="Lagu berikutnya">' +
      SV.nx +
      '</button></div></div><div class="npq"><span class="npm" aria-hidden="true">0:00</span><div class="npb" role="slider" tabindex="0" aria-label="Posisi lagu" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"><i></i><u></u></div><span class="npe" aria-hidden="true">0:00</span></div>';
    np.querySelector(".pv").addEventListener("click", function () {
      pick(cur <= 0 ? TRACKS.length - 1 : cur - 1);
    });
    np.querySelector(".nx").addEventListener("click", function () {
      pick((cur + 1) % TRACKS.length);
    });
    np.querySelector(".npp").addEventListener("click", function () {
      pick(cur < 0 ? 0 : cur);
    });
    var sk = np.querySelector(".npb"),
      drag = false;
    function seekTo(e) {
      if (cur < 0) return;
      var r = sk.getBoundingClientRect(),
        ratio = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width));
      if (TRACKS[cur].src && !sim && au.duration && isFinite(au.duration)) {
        au.currentTime = au.duration * ratio;
      } else {
        var dur = secs(TRACKS[cur].d);
        simT = dur * ratio;
        if (ol && ol.children[cur]) ol.children[cur].firstChild.style.setProperty("--p", ratio);
        npTime(simT, dur);
      }
    }
    sk.addEventListener("pointerdown", function (e) {
      drag = true;
      seekTo(e);
      try {
        sk.setPointerCapture(e.pointerId);
      } catch (x) {}
    });
    sk.addEventListener("pointermove", function (e) {
      if (drag) seekTo(e);
    });
    sk.addEventListener("pointerup", function () {
      drag = false;
    });
    sk.addEventListener("pointercancel", function () {
      drag = false;
    });
    sk.addEventListener("keydown", function (e) {
      if (cur < 0) return;
      if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
        var delta = e.key === "ArrowRight" ? 5 : -5;
        if (TRACKS[cur].src && !sim && au.duration && isFinite(au.duration)) {
          au.currentTime = Math.min(au.duration, Math.max(0, au.currentTime + delta));
        } else {
          var dur = secs(TRACKS[cur].d);
          simT = Math.min(dur, Math.max(0, simT + delta));
          npTime(simT, dur);
        }
        e.preventDefault();
      }
    });
    (ol.parentNode || pg).appendChild(np);
  }
  function npSet(i) {
    if (!np) return;
    np.querySelector(".npt").textContent = TRACKS[i].t;
    np.querySelector(".npa").textContent = TRACKS[i].a + " · " + (TRACKS[i].g || "");
    npTime(0, secs(TRACKS[i].d));
  }
  function npTime(t, d) {
    if (!np) return;
    var f = d && isFinite(d) ? Math.min(1, t / d) : 0;
    np.style.setProperty("--p", f);
    var m = np.querySelector(".npm"),
      e = np.querySelector(".npe"),
      b = np.querySelector(".npb");
    if (m) m.textContent = fmt(t);
    if (e && d && isFinite(d)) e.textContent = fmt(d);
    if (b) b.setAttribute("aria-valuenow", Math.round(f * 100));
  }
  function pick(i) {
    var x = TRACKS[i];
    if (i === cur) {
      if (x.src && !sim) {
        if (au.paused) go();
        else au.pause();
      } else {
        sim = !sim;
        syncSynth();
      }
      mark();
      return;
    }
    cur = i;
    simT = 0;
    stepIdx = 0;
    au.pause();
    stopSynth();
    accent(i);
    npSet(i);
    if (x.src) {
      sim = false;
      au.src = srcOf(i);
      go();
    } else {
      au.removeAttribute("src");
      sim = true;
      syncSynth();
    }
    ghost(x.t);
    mark();
  }
  au.addEventListener("timeupdate", function () {
    if (!ol || cur < 0 || !au.duration) return;
    ol.children[cur].firstChild.style.setProperty("--p", au.currentTime / au.duration);
    npTime(au.currentTime, au.duration);
  });
  au.addEventListener("loadedmetadata", function () {
    if (!ol || cur < 0 || !isFinite(au.duration)) return;
    TRACKS[cur].d = fmt(au.duration);
    var d = ol.children[cur].querySelector(".d");
    if (d) d.textContent = TRACKS[cur].d;
  });
  au.addEventListener("play", mark);
  au.addEventListener("pause", mark);
  au.addEventListener("error", function () {
    if (au.getAttribute("src") && cur >= 0) fallbackToStudio();
  });
  au.addEventListener("ended", function () {
    pick((cur + 1) % TRACKS.length);
  });

  function dustInit() {
    cv = bg.querySelector(".dust");
    cx = cv && cv.getContext("2d");
    P = [];
    for (var i = 0; i < 46; i++)
      P.push({
        x: Math.random(),
        y: Math.random(),
        r: 0.6 + Math.random() * 1.8,
        vx: (Math.random() - 0.5) * 0.03,
        vy: -0.02 - Math.random() * 0.04,
        a: 0.25 + Math.random() * 0.5,
        ph: Math.random() * 6.3,
      });
  }
  function dust(t, run, dt) {
    if (!cx) return;
    var w = cv.clientWidth,
      h = cv.clientHeight,
      d = Math.min(2, devicePixelRatio || 1);
    if (cv.width !== Math.round(w * d)) {
      cv.width = Math.round(w * d);
      cv.height = Math.round(h * d);
    }
    cx.setTransform(d, 0, 0, d, 0, 0);
    cx.clearRect(0, 0, w, h);
    P.forEach(function (p) {
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      if (p.y < -0.02) p.y = 1.02;
      if (p.x < -0.02) p.x = 1.02;
      if (p.x > 1.02) p.x = -0.02;
      var a = p.a * (0.55 + 0.45 * Math.sin(t * 0.0009 + p.ph)) * (run ? 0.9 : 0.45);
      cx.fillStyle = (run ? "rgba(255,255,255," : "rgba(224,110,60,") + a.toFixed(3) + ")";
      cx.beginPath();
      cx.arc(p.x * w, p.y * h, p.r, 0, 6.283);
      cx.fill();
    });
  }
  function tick(now) {
    if (!ol || !ol.isConnected) {
      stopSynth();
      raf = 0;
      return;
    }
    var dt = Math.min(0.05, (now - last) / 1000 || 0);
    last = now;
    var run = running();
    vel += ((run ? 72 : 0) - vel) * Math.min(1, dt * (run ? 1.6 : 2.2));
    rot = (rot + vel * dt) % 360;
    bg.style.setProperty("--rot", rot.toFixed(2));
    if (cur >= 0 && sim) {
      var totalDur = secs(TRACKS[cur].d);
      simT += dt;
      var p = Math.min(1, simT / totalDur);
      if (ol.children[cur]) ol.children[cur].firstChild.style.setProperty("--p", p);
      npTime(simT, totalDur);
      if (p >= 1) pick((cur + 1) % TRACKS.length);
    }
    dust(now, run, dt);
    raf = requestAnimationFrame(tick);
  }
  function fill(el) {
    if (el.dataset.ok) return;
    el.dataset.ok = 1;
    ol = el;
    cur = -1;
    sim = false;
    stopSynth();
    pg = el.closest(".pg");
    bg = pg.querySelector(".bg");
    el.innerHTML = TRACKS.map(function (x, i) {
      return (
        '<li style="--i:' +
        i +
        '"><button type="button" class="tk" data-i="' +
        i +
        '" aria-label="' +
        esc(x.t) +
        ", " +
        esc(x.a) +
        ", " +
        esc(x.d) +
        '"><span class="n">' +
        ("0" + (i + 1)).slice(-2) +
        '</span><span class="eqb" aria-hidden="true"><i></i><i></i><i></i></span><b>' +
        esc(x.t) +
        "</b><em>" +
        esc(x.a) +
        ' <small class="tk-g">&middot; ' +
        esc(x.g || "") +
        '</small></em><span class="d">' +
        esc(x.d) +
        "</span></button></li>"
      );
    }).join("");
    el.addEventListener("click", function (e) {
      var b = e.target.closest(".tk");
      if (b) pick(+b.dataset.i);
    });
    el.addEventListener("mousemove", function (e) {
      var b = e.target.closest(".tk");
      if (!b) return;
      var r = b.getBoundingClientRect();
      b.style.setProperty("--hx", e.clientX - r.left + "px");
      b.style.setProperty("--hy", e.clientY - r.top + "px");
    });
    npBuild();
    mark();
    if (!reduce) {
      dustInit();
      last = performance.now();
      if (!raf) raf = requestAnimationFrame(tick);
    }
  }
  function scan() {
    if (ol && !ol.isConnected) {
      au.pause();
      stopSynth();
      if (np && np.parentNode) np.parentNode.removeChild(np);
      np = null;
      ol = null;
      pg = null;
      bg = null;
      cur = -1;
      sim = false;
      vel = 0;
    }
    var e = document.getElementById("plist");
    if (e) fill(e);
  }
  new MutationObserver(scan).observe(document.body, { childList: true, subtree: true });
  scan();
})();
