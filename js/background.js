/* ============================================================
   Ultra-Lightweight Event-Driven Home Backdrop
   Zero continuous requestAnimationFrame loops (0% idle CPU/GPU)
   Synchronizes subtle blurred active-card photo & accent aura
   ============================================================ */
(function () {
  var slideA = document.getElementById("bgSlideA");
  var slideB = document.getElementById("bgSlideB");
  var curSlide = 0;
  var lastCardIdx = -1;

  var PALETTES = [
    { a: [224, 70, 58], b: [185, 85, 62] }, // 0: Story
    { a: [196, 86, 68], b: [110, 128, 165] }, // 1: Music
    { a: [216, 98, 72], b: [165, 148, 120] }, // 2: Me
    { a: [175, 152, 128], b: [130, 145, 138] }, // 3: Frame
    { a: [130, 162, 136], b: [204, 154, 108] }, // 4: Skill
    { a: [226, 118, 87], b: [182, 122, 86] }, // 5: Proyek
    { a: [138, 168, 142], b: [198, 142, 110] }, // 6: Kontak
    { a: [128, 148, 184], b: [178, 102, 98] }, // 7: Fashion
    { a: [62, 108, 198], b: [220, 156, 98] }, // 8: Rumah (Dream House)
  ];

  var FALLBACK_IMGS = [
    "assets/images/story-portrait.webp",
    "assets/images/music-portrait.webp",
    "assets/images/profile-portrait.webp",
    "assets/images/card-gallery.webp",
    "assets/images/card-skills.webp",
    "assets/images/card-projects.webp",
    "assets/images/card-contact.webp",
    "assets/runway/card-runway.webp",
    "assets/estate/card-home.webp",
  ];

  window.__zkBgSetCard = function (idx, cardEl) {
    if (idx === lastCardIdx) return;
    lastCardIdx = idx;
    var pal = PALETTES[idx % PALETTES.length] || PALETTES[2];
    document.documentElement.style.setProperty("--bg-acc", pal.a.join(", "));
    if (!slideA || !slideB) return;
    var imgEl = cardEl && cardEl.querySelector(".portrait-img");
    var src = (imgEl && imgEl.getAttribute("src")) || FALLBACK_IMGS[idx] || FALLBACK_IMGS[2];
    var nextSlide = curSlide === 0 ? slideA : slideB;
    var prevSlide = curSlide === 0 ? slideB : slideA;
    curSlide = 1 - curSlide;
    nextSlide.style.backgroundImage = 'url("' + src + '")';
    nextSlide.classList.add("on");
    prevSlide.classList.remove("on");
  };

  setTimeout(function () {
    var activeCard = document.querySelector(".card.on") || document.querySelectorAll(".card")[2];
    if (lastCardIdx < 0) window.__zkBgSetCard(2, activeCard);
  }, 50);
})();
