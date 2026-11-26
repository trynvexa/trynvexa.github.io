/* ==========================================================================
   js/runway-data.js — Card #8: Fashion (Zikri Personal Lookbook Archive)
   Full 8-Language Native Localization (id, en, zh, es, ar, fr, ja, ko):
   - Clean header: Home Mascot Head SVG (left) + minimal "← Home" (right).
   - 18 exact-matched garment detail thumbnails (look-1..6-p1..3.webp).
   - Zero mixed-language strings across all 8 languages.
   ========================================================================== */
(function () {
  "use strict";

  var COPY = {
    id: {
      brandLabel: "Kembali ke Beranda",
      navAria: "Navigasi kembali",
      navHome: "Beranda",
      title: "Fashion",
      subtitle:
        "Enam koleksi gaya pilihan, dari kepala hingga kaki. Ketuk model atau pin untuk melihat setiap detail busana.",
      stageAria: "Fashion — gunakan tombol panah atau geser untuk ganti tampilan",
      dragLabel: "Geser",
      viewLabel: "Lihat",
      prevLabel: "Tampilan sebelumnya",
      nextLabel: "Tampilan berikutnya",
      autoLabel: "Putar otomatis",
      lookWord: "Gaya",
      lookBadge: "GAYA",
      viewLookAria: "Lihat detail tampilan",
      inThisLook: "Dalam tampilan ini",
      piecesText: "3 detail",
      toggleDetailAria: "Lihat catatan gaya",
      focusPinBtn: "Fokus pin di model",
      bundleNote: "3 detail busana · Perbesar & cek pin",
      ctaOpen: "Lihat detail tampilan",
      ctaNext: "Tampilan berikutnya",
      lbAria: "Lihat detail tampilan",
      lbClose: "Tutup",
      lbHint: "Ketuk titik bernomor untuk melihat detail item",
      closeDrawer: "Tutup detail item",
      tagNew: "Baru",
    },
    en: {
      brandLabel: "Back to Home",
      navAria: "Return navigation",
      navHome: "Home",
      title: "Fashion",
      subtitle:
        "Six personal looks, styled head to toe. Tap the model or a pin to inspect every outfit detail.",
      stageAria: "Fashion — use arrow keys or swipe to change look",
      dragLabel: "Drag",
      viewLabel: "View",
      prevLabel: "Previous look",
      nextLabel: "Next look",
      autoLabel: "Autoplay",
      lookWord: "Look",
      lookBadge: "LOOK",
      viewLookAria: "View look",
      inThisLook: "In this look",
      piecesText: "3 pieces",
      toggleDetailAria: "Inspect piece notes",
      focusPinBtn: "Highlight pin on model",
      bundleNote: "3 outfit pieces · Zoom & inspect pins",
      ctaOpen: "View look details",
      ctaNext: "Next look",
      lbAria: "View look",
      lbClose: "Close",
      lbHint: "Tap a numbered dot to inspect the piece",
      closeDrawer: "Close piece details",
      tagNew: "New",
    },
    zh: {
      brandLabel: "返回首页",
      navAria: "返回导航",
      navHome: "首页",
      title: "时尚",
      subtitle: "六套个人私服穿搭档案，从头到脚完整呈现。轻触模特或数字圆点即可细看每件单品。",
      stageAria: "时尚展示 — 使用方向键或左右滑动切换造型",
      dragLabel: "拖动",
      viewLabel: "查看",
      prevLabel: "上一套造型",
      nextLabel: "下一套造型",
      autoLabel: "自动播放",
      lookWord: "造型",
      lookBadge: "造型",
      viewLookAria: "查看造型详情",
      inThisLook: "本套穿搭单品",
      piecesText: "3 件单品",
      toggleDetailAria: "查看搭配笔记",
      focusPinBtn: "在模特身上高亮标点",
      bundleNote: "3 件穿搭细节 · 放大检视标点",
      ctaOpen: "查看造型详情",
      ctaNext: "下一套造型",
      lbAria: "造型大图预览",
      lbClose: "关闭",
      lbHint: "点击数字圆点查看对应单品细节",
      closeDrawer: "关闭单品详情",
      tagNew: "新款",
    },
    es: {
      brandLabel: "Volver al inicio",
      navAria: "Navegación de regreso",
      navHome: "Inicio",
      title: "Moda",
      subtitle:
        "Seis estilismos personales, de pies a cabeza. Toca al modelo o un pin para explorar cada prenda.",
      stageAria: "Moda — usa las flechas o desliza para cambiar de estilismo",
      dragLabel: "Arrastra",
      viewLabel: "Ver",
      prevLabel: "Estilismo anterior",
      nextLabel: "Siguiente estilismo",
      autoLabel: "Reproducción automática",
      lookWord: "Estilo",
      lookBadge: "ESTILO",
      viewLookAria: "Ver detalles del estilismo",
      inThisLook: "En este estilismo",
      piecesText: "3 piezas",
      toggleDetailAria: "Ver notas de estilo",
      focusPinBtn: "Resaltar pin en el modelo",
      bundleNote: "3 detalles del conjunto · Acercar e inspeccionar",
      ctaOpen: "Ver detalles",
      ctaNext: "Siguiente estilismo",
      lbAria: "Vista detallada del estilismo",
      lbClose: "Cerrar",
      lbHint: "Toca un punto numerado para ver la prenda",
      closeDrawer: "Cerrar detalles de la prenda",
      tagNew: "Nuevo",
    },
    ar: {
      brandLabel: "العودة إلى الرئيسية",
      navAria: "تنقل العودة",
      navHome: "الرئيسية",
      title: "الأزياء",
      subtitle:
        "ست إطلالات شخصية منسّقة من الرأس حتى القدمين. المس العارض أو النقطة المرقّمة لاستكشاف كل قطعة.",
      stageAria: "الأزياء — استخدم الأسهم أو اسحب لتبديل الإطلالة",
      dragLabel: "اسحب",
      viewLabel: "عرض",
      prevLabel: "الإطلالة السابقة",
      nextLabel: "الإطلالة التالية",
      autoLabel: "تشغيل تلقائي",
      lookWord: "إطلالة",
      lookBadge: "إطلالة",
      viewLookAria: "عرض تفاصيل الإطلالة",
      inThisLook: "في هذه الإطلالة",
      piecesText: "3 قطع",
      toggleDetailAria: "عرض ملاحظات التنسيق",
      focusPinBtn: "إبراز النقطة على العارض",
      bundleNote: "3 قطع منسّقة · تكبير وفحص النقاط",
      ctaOpen: "عرض تفاصيل الإطلالة",
      ctaNext: "الإطلالة التالية",
      lbAria: "معاينة الإطلالة",
      lbClose: "إغلاق",
      lbHint: "المس نقطة مرقّمة لاستكشاف تفاصيل القطعة",
      closeDrawer: "إغلاق تفاصيل القطعة",
      tagNew: "جديد",
    },
    fr: {
      brandLabel: "Retour à l’accueil",
      navAria: "Navigation de retour",
      navHome: "Accueil",
      title: "Mode",
      subtitle:
        "Six silhouettes personnelles, pensées de la tête aux pieds. Touchez le modèle ou un repère pour explorer chaque pièce.",
      stageAria: "Mode — utilisez les flèches ou glissez pour changer de silhouette",
      dragLabel: "Glisser",
      viewLabel: "Voir",
      prevLabel: "Silhouette précédente",
      nextLabel: "Silhouette suivante",
      autoLabel: "Lecture auto",
      lookWord: "Tenue",
      lookBadge: "TENUE",
      viewLookAria: "Voir les détails de la tenue",
      inThisLook: "Dans cette tenue",
      piecesText: "3 pièces",
      toggleDetailAria: "Lire les notes de style",
      focusPinBtn: "Pointer sur le modèle",
      bundleNote: "3 pièces clés · Zoom et repères numérotés",
      ctaOpen: "Voir la tenue",
      ctaNext: "Tenue suivante",
      lbAria: "Aperçu de la tenue",
      lbClose: "Fermer",
      lbHint: "Touchez un point numéroté pour inspecter la pièce",
      closeDrawer: "Fermer les détails de la pièce",
      tagNew: "Nouveau",
    },
    ja: {
      brandLabel: "ホームへ戻る",
      navAria: "戻るナビゲーション",
      navHome: "ホーム",
      title: "ファッション",
      subtitle:
        "頭から足元まで組んだ6つの個人スタイルアーカイブ。モデルや番号ピンをタップして各アイテムを確認できます。",
      stageAria: "ファッション — 矢印キーまたはスワイプでスタイルを切り替え",
      dragLabel: "ドラッグ",
      viewLabel: "見る",
      prevLabel: "前のスタイル",
      nextLabel: "次のスタイル",
      autoLabel: "自動再生",
      lookWord: "スタイル",
      lookBadge: "スタイル",
      viewLookAria: "スタイルの詳細を見る",
      inThisLook: "着用アイテム",
      piecesText: "3アイテム",
      toggleDetailAria: "スタイリングメモを見る",
      focusPinBtn: "モデルのピンを強調",
      bundleNote: "3点の構成 · 拡大＆ピン確認",
      ctaOpen: "スタイル詳細を見る",
      ctaNext: "次のスタイルへ",
      lbAria: "スタイル拡大ビュー",
      lbClose: "閉じる",
      lbHint: "番号ピンをタップしてアイテムの詳細を表示",
      closeDrawer: "アイテム詳細を閉じる",
      tagNew: "新着",
    },
    ko: {
      brandLabel: "홈으로 돌아가기",
      navAria: "돌아가기 탐색",
      navHome: "홈",
      title: "패션",
      subtitle:
        "머리부터 발끝까지 완성한 6가지 개인 스타일 아카이브. 모델이나 번호 핀을 눌러 각 아이템을 살펴보세요.",
      stageAria: "패션 — 방향키나 스와이프로 스타일 전환",
      dragLabel: "드래그",
      viewLabel: "보기",
      prevLabel: "이전 스타일",
      nextLabel: "다음 스타일",
      autoLabel: "자동 재생",
      lookWord: "스타일",
      lookBadge: "스타일",
      viewLookAria: "스타일 자세히 보기",
      inThisLook: "착용 아이템",
      piecesText: "3개 아이템",
      toggleDetailAria: "스타일 메모 보기",
      focusPinBtn: "모델 핀 강조하기",
      bundleNote: "3가지 코디 디테일 · 확대 및 핀 확인",
      ctaOpen: "스타일 자세히 보기",
      ctaNext: "다음 스타일",
      lbAria: "스타일 확대 보기",
      lbClose: "닫기",
      lbHint: "번호가 적힌 핀을 눌러 아이템을 확인하세요",
      closeDrawer: "아이템 상세 닫기",
      tagNew: "신규",
    },
  };

  /* Base geometry & assets for the 6 runway looks and 18 matched pieces */
  var LOOKS_BASE = [
    {
      key: "bndthK",
      model640: "assets/runway/look-1-640.webp",
      model1080: "assets/runway/look-1-1080.webp",
      pieces: [
        { n: 1, image: "assets/runway/look-1-p1.webp", left: 50, top: 29, isNew: false },
        { n: 2, image: "assets/runway/look-1-p2.webp", left: 48, top: 58, isNew: false },
        { n: 3, image: "assets/runway/look-1-p3.webp", left: 53, top: 93, isNew: false },
      ],
    },
    {
      key: "XckgG6",
      model640: "assets/runway/look-2-640.webp",
      model1080: "assets/runway/look-2-1080.webp",
      pieces: [
        { n: 1, image: "assets/runway/look-2-p1.webp", left: 50, top: 30, isNew: true },
        { n: 2, image: "assets/runway/look-2-p2.webp", left: 48, top: 60, isNew: false },
        { n: 3, image: "assets/runway/look-2-p3.webp", left: 54, top: 93, isNew: false },
      ],
    },
    {
      key: "rLfAhC",
      model640: "assets/runway/look-3-640.webp",
      model1080: "assets/runway/look-3-1080.webp",
      pieces: [
        { n: 1, image: "assets/runway/look-3-p1.webp", left: 50, top: 30, isNew: true },
        { n: 2, image: "assets/runway/look-3-p2.webp", left: 69, top: 60, isNew: false },
        { n: 3, image: "assets/runway/look-3-p3.webp", left: 55, top: 93, isNew: false },
      ],
    },
    {
      key: "FKg67q",
      model640: "assets/runway/look-4-640.webp",
      model1080: "assets/runway/look-4-1080.webp",
      pieces: [
        { n: 1, image: "assets/runway/look-4-p1.webp", left: 50, top: 28, isNew: false },
        { n: 2, image: "assets/runway/look-4-p2.webp", left: 48, top: 58, isNew: false },
        { n: 3, image: "assets/runway/look-4-p3.webp", left: 54, top: 93, isNew: false },
      ],
    },
    {
      key: "8KREEE",
      model640: "assets/runway/look-5-640.webp",
      model1080: "assets/runway/look-5-1080.webp",
      pieces: [
        { n: 1, image: "assets/runway/look-5-p1.webp", left: 50, top: 30, isNew: false },
        { n: 2, image: "assets/runway/look-5-p2.webp", left: 50, top: 57, isNew: false },
        { n: 3, image: "assets/runway/look-5-p3.webp", left: 55, top: 92, isNew: false },
      ],
    },
    {
      key: "N3bfm9",
      model640: "assets/runway/look-6-640.webp",
      model1080: "assets/runway/look-6-1080.webp",
      pieces: [
        { n: 1, image: "assets/runway/look-6-p1.webp", left: 50, top: 29, isNew: false },
        { n: 2, image: "assets/runway/look-6-p2.webp", left: 48, top: 58, isNew: false },
        { n: 3, image: "assets/runway/look-6-p3.webp", left: 48, top: 93, isNew: false },
      ],
    },
  ];

  /* Complete 8-language lookbook metadata (6 looks × 3 pieces = 18 pieces per language) */
  var LOOKS_L10N = {
    id: [
      {
        name: "Edisi Rompi Hitam",
        pieces: [
          {
            category: "LUARAN & KEMEJA",
            name: "Set Rompi Hitam & Dasi",
            sub: "Rompi Hitam Rantai · Kemeja Putih",
            note: "Rompi hitam berpotongan rapi dengan rantai saku perak, dipadukan kemeja putih lengan digulung dan dasi garis monokrom.",
            tags: ["Potongan Rapi", "Rantai Perak", "Monokrom"],
          },
          {
            category: "CELANA",
            name: "Celana Lipit Ganda Hitam",
            sub: "Lipit Ganda · Potongan Lebar",
            note: "Celana hitam pinggang tinggi dengan lipit ganda yang jatuh lurus memanjangkan proporsi tubuh.",
            tags: ["Potongan Lebar", "Lipit Ganda", "Pinggang Tinggi"],
          },
          {
            category: "SEPATU",
            name: "Sepatu Derby Kulit Hitam",
            sub: "Kulit Hitam Mengkilap · Sol Tebal",
            note: "Sepatu kulit hitam mengkilap bersol tebal yang memberi bobot modern pada siluet formal klasik.",
            tags: ["Kulit Kilap", "Sol Tebal", "Aksen Formal"],
          },
        ],
      },
      {
        name: "Setelan Monokrom",
        pieces: [
          {
            category: "LUARAN",
            name: "Blazer Lilit Sabuk Gesper",
            sub: "Gesper Pinggang Perak · Serba Hitam",
            note: "Blazer lilit berstruktur tegas dengan tali pinggang gesper logam yang membentuk siluet ramping dan tajam.",
            tags: ["Potongan Lilit", "Gesper Perak", "Berstruktur"],
          },
          {
            category: "CELANA",
            name: "Celana Lebar Belah Bawah",
            sub: "Belahan Ujung Kaki · Jatuh Lembut",
            note: "Celana setelan abu gelap berpotongan lebar dengan belahan kecil di ujung kaki agar jatuhnya pas di atas sepatu.",
            tags: ["Belah Bawah", "Potongan Lebar", "Abu Gelap"],
          },
          {
            category: "SEPATU",
            name: "Derby Kulit Sol Platform",
            sub: "Sol Platform Tebal · Kulit Hitam",
            note: "Sepatu derby hitam bersol tebal yang menyatukan keseluruhan tampilan serba hitam dengan karakter kokoh.",
            tags: ["Sol Platform", "Hitam Kilap", "Tegas"],
          },
        ],
      },
      {
        name: "Gaya Kampus Seoul",
        pieces: [
          {
            category: "ATASAN & DASI",
            name: "Kemeja Kancing Simpul & Dasi",
            sub: "Kancing Simpul · Emblem Bintang · Dasi Marun",
            note: "Kemeja lengan pendek bergaris kelabu dengan kancing simpul tradisional, emblem bintang-awan, dan dasi marun garis.",
            tags: ["Kancing Simpul", "Detail Emblem", "Gaya Jalanan"],
          },
          {
            category: "AKSESORI",
            name: "Tas Jinjing Kanvas Damask",
            sub: "Kanvas Damask Cokelat · Aksen Kulit",
            note: "Tas jinjing motif damask bernuansa cokelat klasik dengan pegangan kulit gelap yang menjadi titik fokus kontras.",
            tags: ["Kanvas Damask", "Aksen Kulit", "Tas Utama"],
          },
          {
            category: "SEPATU",
            name: "Sepatu Kets Putih Gading",
            sub: "Putih Gading · Sol Hitam Kontras",
            note: "Sepatu kets rendah warna putih gading dengan sol hitam tegas yang menjaga gaya tetap santai.",
            tags: ["Potongan Rendah", "Sol Kontras", "Harian"],
          },
        ],
      },
      {
        name: "Minimalis Galeri",
        pieces: [
          {
            category: "ATASAN LAPIS",
            name: "Kemeja Luar Gading & Kaus",
            sub: "Luaran Putih Tulang · Kaus Hitam",
            note: "Kemeja luar putih tulang dipakai terbuka di atas kaus hitam polos untuk komposisi kontras bersih bergaya galeri.",
            tags: ["Kontras Bersih", "Potongan Santai", "Minimalis"],
          },
          {
            category: "CELANA",
            name: "Celana Hitam Sabuk Kulit",
            sub: "Sabuk Kulit Hitam · Lipit Rapi",
            note: "Celana lebar hitam berlipit dengan ikat pinggang kulit hitam yang menegaskan garis pinggang rapi.",
            tags: ["Potongan Lebar", "Sabuk Kulit", "Rapi"],
          },
          {
            category: "SEPATU",
            name: "Sepatu Bot Suede Hitam",
            sub: "Suede Hitam Dof · Siluet Ramping",
            note: "Sepatu bot suede hitam bertekstur lembut tanpa kilap yang menyatu mulus dengan ujung celana.",
            tags: ["Suede Dof", "Ujung Ramping", "Gaya Galeri"],
          },
        ],
      },
      {
        name: "Gaya Santai Kampus",
        pieces: [
          {
            category: "ATASAN & DASI",
            name: "Kemeja Putih Longgar & Dasi",
            sub: "Lengan Pendek · Dasi Marun · Ransel",
            note: "Kemeja putih berpotongan longgar dengan dasi marun garis dan ransel hitam untuk gaya kampus yang santai namun terstruktur.",
            tags: ["Potongan Longgar", "Dasi Garis", "Gaya Kampus"],
          },
          {
            category: "BAWAHAN",
            name: "Celana Denim Pendek Klasik",
            sub: "Denim Biru Pudar · Potongan Selutut",
            note: "Celana denim pendek lebar selutut bernuansa pudar klasik yang mencairkan formalitas kemeja dan dasi.",
            tags: ["Denim Lebar", "Biru Pudar", "Santai"],
          },
          {
            category: "SEPATU",
            name: "Sepatu Kanvas Merah Bata",
            sub: "Kanvas Merah Bata · Kaus Kaki Putih",
            note: "Sepatu kanvas merah bata yang memantulkan warna dasi marun, dipadukan kaus kaki putih berkerut.",
            tags: ["Kanvas Rendah", "Aksen Merah", "Gaya Retro"],
          },
        ],
      },
      {
        name: "Atelier Putih Gading",
        pieces: [
          {
            category: "LUARAN",
            name: "Jaket Kerah Tegak Gading",
            sub: "Kerah Asimetris · Bros Rantai Perak",
            note: "Jaket kerah tegak putih gading dengan belahan asimetris dan bros rantai perak di dada sebagai sentuhan halus.",
            tags: ["Kerah Tegak", "Bros Rantai", "Serba Gading"],
          },
          {
            category: "CELANA",
            name: "Celana Lipit Putih Gading",
            sub: "Putih Gading · Siluet Lebar Mengalir",
            note: "Celana lipit lebar serba putih yang jatuh luwes mengikuti langkah untuk kesan serasi yang bersih.",
            tags: ["Jatuh Luwes", "Lipit Ganda", "Putih Senada"],
          },
          {
            category: "SEPATU",
            name: "Sepatu Pantofel Dua Warna",
            sub: "Kulit Hitam-Putih · Siluet Klasik",
            note: "Sepatu pantofel dua warna hitam-putih yang mengikat nuansa putih gading dari atas dengan kontras tajam di pijakan.",
            tags: ["Dua Warna", "Pantofel Klasik", "Sentuhan Akhir"],
          },
        ],
      },
    ],
    en: [
      {
        name: "Noir Vest Edit",
        pieces: [
          {
            category: "OUTER & SHIRT",
            name: "Noir Waistcoat & Tie Set",
            sub: "Chained Black Vest · Crisp Shirt",
            note: "Structured black waistcoat accented with a silver pocket chain over rolled crisp white shirting and a striped tie.",
            tags: ["Tailored", "Silver Chain", "Monochrome"],
          },
          {
            category: "TROUSERS",
            name: "Black Double-Pleated Trousers",
            sub: "Double Pleat · Wide-Leg Drape",
            note: "High-waisted black wool-blend trousers with crisp double pleats and a full sweeping leg.",
            tags: ["Wide-Leg", "Double Pleat", "High Waist"],
          },
          {
            category: "FOOTWEAR",
            name: "Noir Patent Chunky Derby",
            sub: "Glossy Patent · Chunky Lug Sole",
            note: "High-shine black leather derbies grounded by a sculpted lug sole for modern formal balance.",
            tags: ["Patent Leather", "Lug Sole", "Formal Edge"],
          },
        ],
      },
      {
        name: "Monochrome Suit",
        pieces: [
          {
            category: "OUTERWEAR",
            name: "Belted Wrap Suit Blazer",
            sub: "Silver Waist Buckle · All-Black",
            note: "Architectural black wrap blazer cinched cleanly at the waist with a brushed metal buckle strap.",
            tags: ["Wrap Cut", "Silver Buckle", "Structured"],
          },
          {
            category: "TROUSERS",
            name: "Charcoal Slit Wide Trousers",
            sub: "Front Hem Slit · Fluid Drape",
            note: "Deep charcoal wide-leg suit trousers featuring a subtle front hem slit that stacks cleanly over footwear.",
            tags: ["Hem Slit", "Wide-Leg", "Charcoal"],
          },
          {
            category: "FOOTWEAR",
            name: "Chunky Black Leather Derby",
            sub: "Thick Lug Platform · Black Leather",
            note: "Heavyweight black leather derby shoes anchoring the monochrome suit with bold sole volume.",
            tags: ["Platform Lug", "Glossy Black", "Statement"],
          },
        ],
      },
      {
        name: "Seoul Preppy",
        pieces: [
          {
            category: "TOP & TIE",
            name: "Frog-Button Patch Shirt & Tie",
            sub: "Frog Closures · Star Patches · Burgundy Tie",
            note: "Striped taupe short-sleeve shirt detailed with eastern frog buttons, playful star-cloud patches, and a burgundy tie.",
            tags: ["Frog Buttons", "Patch Detail", "Preppy Street"],
          },
          {
            category: "ACCESSORY",
            name: "Damask Structured Handbag",
            sub: "Brown Damask Canvas · Leather Trim",
            note: "Vintage-patterned brown damask structured tote with dark leather handles contrasting against washed black denim.",
            tags: ["Damask Canvas", "Leather Trim", "Statement Bag"],
          },
          {
            category: "FOOTWEAR",
            name: "Ivory Contrast Low Sneakers",
            sub: "Ivory Upper · Contrast Black Sole",
            note: "Clean off-white low-top sneakers grounded by a black outsole to keep the silhouette effortless.",
            tags: ["Low-Top", "Contrast Sole", "Daily Street"],
          },
        ],
      },
      {
        name: "Gallery Minimal",
        pieces: [
          {
            category: "LAYERED TOP",
            name: "Ivory Open Overshirt & Tee",
            sub: "Broken-White Overshirt · Black Tee",
            note: "Relaxed broken-white overshirt worn open over a matte black crew tee for crisp minimalist contrast.",
            tags: ["Clean Contrast", "Relaxed Cut", "Minimal"],
          },
          {
            category: "TROUSERS",
            name: "Black Double-Pleated Trousers",
            sub: "Leather Belt · Tailored Wide-Leg",
            note: "Tailored black wide-leg trousers cinched with a sleek leather belt for an elongated minimalist line.",
            tags: ["Wide-Leg", "Leather Belt", "Tailored"],
          },
          {
            category: "FOOTWEAR",
            name: "Noir Suede Minimalist Boots",
            sub: "Matte Black Suede · Sleek Silhouette",
            note: "Understated matte black suede boots that disappear cleanly beneath the hem with refined quiet texture.",
            tags: ["Matte Suede", "Sleek Toe", "Gallery Ready"],
          },
        ],
      },
      {
        name: "Campus Edit",
        pieces: [
          {
            category: "TOP & TIE",
            name: "Oversized White Shirt & Tie",
            sub: "Short-Sleeve Boxy · Striped Tie · Pack",
            note: "Boxy white short-sleeve shirt paired with a striped burgundy tie and black backpack for relaxed academy energy.",
            tags: ["Oversized", "Striped Tie", "Academy Vibe"],
          },
          {
            category: "BOTTOM",
            name: "Washed Vintage Denim Jorts",
            sub: "Light-Wash Denim · Wide Knee-Length",
            note: "Knee-grazing wide vintage-wash denim jorts that effortlessly balance the crisp collared shirt above.",
            tags: ["Baggy Jorts", "Washed Blue", "Casual Street"],
          },
          {
            category: "FOOTWEAR",
            name: "Crimson Canvas Low Sneakers",
            sub: "Crimson Canvas · White Crew Socks",
            note: "Classic crimson canvas low-tops echoing the maroon tie, styled cleanly with scrunched white crew socks.",
            tags: ["Canvas Low", "Crimson Pop", "Retro Skate"],
          },
        ],
      },
      {
        name: "Ivory Atelier",
        pieces: [
          {
            category: "OUTERWEAR",
            name: "Ivory Mandarin Collar Jacket",
            sub: "Asymmetric Placket · Silver Chain Brooch",
            note: "All-ivory asymmetric mandarin-collar jacket finished with a double-draped silver chain brooch at the chest.",
            tags: ["Mandarin Collar", "Chain Brooch", "All-Ivory"],
          },
          {
            category: "TROUSERS",
            name: "Ivory Double-Pleated Trousers",
            sub: "Ivory Tailoring · Fluid Wide-Leg",
            note: "Fluid ivory wide-leg pleated trousers continuing the tonal monochrome silhouette from shoulder to hem.",
            tags: ["Fluid Drape", "Double Pleat", "Tonal White"],
          },
          {
            category: "FOOTWEAR",
            name: "Two-Tone Penny Loafers",
            sub: "Black & White Leather · Classic Loafer",
            note: "Sharp black-and-white two-tone penny loafers tying the all-ivory ensemble together with graphic contrast.",
            tags: ["Two-Tone", "Penny Loafer", "Atelier Finish"],
          },
        ],
      },
    ],
    zh: [
      {
        name: "暗夜马甲风尚",
        pieces: [
          {
            category: "外套与衬衫",
            name: "暗黑链条马甲领带套装",
            sub: "银链黑马甲 · 挺括白衬衫",
            note: "剪裁利落的黑色马甲点缀银色口袋链，叠穿卷袖白衬衫与黑白条纹领带。",
            tags: ["精裁版型", "银链点缀", "黑白单色"],
          },
          {
            category: "长裤",
            name: "黑色双褶阔腿西裤",
            sub: "双褶设计 · 阔腿垂坠",
            note: "高腰黑色双褶阔腿长裤，直筒垂顺线条有效拉长整体身材比例。",
            tags: ["阔腿剪裁", "双褶工艺", "高腰线条"],
          },
          {
            category: "鞋履",
            name: "黑色漆皮厚底德比鞋",
            sub: "高亮漆皮 · 锯齿厚底",
            note: "高光泽黑色漆皮厚底德比鞋，为经典正装轮廓注入摩登份量感。",
            tags: ["亮面漆皮", "厚底廓形", "摩登正装"],
          },
        ],
      },
      {
        name: "全黑解构西装",
        pieces: [
          {
            category: "外套",
            name: "金属扣绑带裹身西装",
            sub: "银色腰扣 · 全黑利落",
            note: "建筑感全黑裹身西装，以拉丝金属腰扣干净利落地收束腰身轮廓。",
            tags: ["裹身剪裁", "银色腰扣", "建筑结构"],
          },
          {
            category: "长裤",
            name: "炭黑开衩阔腿西裤",
            sub: "裤脚前开衩 · 垂坠流畅",
            note: "深炭灰阔腿西装裤，裤脚微开衩设计让裤管自然贴合鞋面。",
            tags: ["裤脚开衩", "阔腿垂坠", "炭黑色调"],
          },
          {
            category: "鞋履",
            name: "黑色厚底牛皮德比鞋",
            sub: "厚底增高 · 黑牛皮材质",
            note: "厚实黑牛皮德比鞋稳稳承托全黑套装，呈现冷峻干练的造型张力。",
            tags: ["厚底锯齿", "全黑质感", "气场单品"],
          },
        ],
      },
      {
        name: "首尔学院街头",
        pieces: [
          {
            category: "上衣与领带",
            name: "盘扣徽章条纹衬衫领带",
            sub: "中式盘扣 · 星云贴布 · 酒红领带",
            note: "灰褐细条纹短袖衬衫融合东方盘扣、趣味星云贴布与酒红条纹领带。",
            tags: ["东方盘扣", "贴布细节", "街头学院"],
          },
          {
            category: "配饰",
            name: "复古提花帆布手提包",
            sub: "棕色大马士革纹 · 皮质镶边",
            note: "复古棕色大马士革提花硬挺手提包，深色皮质手柄在水洗黑牛仔旁格外吸睛。",
            tags: ["复古提花", "皮质滚边", "点睛包袋"],
          },
          {
            category: "鞋履",
            name: "象牙白撞色低帮板鞋",
            sub: "米白鞋面 · 黑色大底",
            note: "干净的象牙白低帮运动鞋配黑色外底，让学院风造型保持轻松随性。",
            tags: ["低帮鞋型", "黑白撞色", "日常街头"],
          },
        ],
      },
      {
        name: "画廊极简主义",
        pieces: [
          {
            category: "叠穿上衣",
            name: "米白敞开衬衫与黑T恤",
            sub: "米白衬衫外套 · 哑光黑T",
            note: "宽松米白外穿衬衫敞开叠搭纯黑圆领T恤，营造画廊般克制干净的明暗对比。",
            tags: ["清爽对比", "宽松剪裁", "极简美学"],
          },
          {
            category: "长裤",
            name: "黑色皮带双褶阔腿裤",
            sub: "黑色皮带 · 精裁阔腿",
            note: "黑色精裁双褶阔腿裤系上利落黑皮带，勾勒修长克制的极简线条。",
            tags: ["阔腿裤型", "皮带收腰", "精裁质感"],
          },
          {
            category: "鞋履",
            name: "哑光黑麂皮极简短靴",
            sub: "哑光黑麂皮 · 修长鞋楦",
            note: "低调柔润的哑光黑麂皮短靴，悄然隐入裤脚之下，尽显克制质感。",
            tags: ["哑光麂皮", "修长鞋头", "画廊氛围"],
          },
        ],
      },
      {
        name: "轻松校园特辑",
        pieces: [
          {
            category: "上衣与领带",
            name: "宽松白短袖衬衫与领带",
            sub: "箱型短袖 · 酒红条纹领带 · 双肩包",
            note: "箱型宽松白短袖衬衫搭配酒红条纹领带与黑双肩包，兼具松弛感与学院秩序。",
            tags: ["宽松廓形", "条纹领带", "学院活力"],
          },
          {
            category: "下装",
            name: "复古水洗宽版牛仔短裤",
            sub: "浅蓝水洗 · 及膝宽版",
            note: "及膝宽大复古水洗牛仔短裤，自然化解上半身衬衫领带的正式感。",
            tags: ["宽版五分裤", "复古水洗", "街头休闲"],
          },
          {
            category: "鞋履",
            name: "绯红低帮帆布运动鞋",
            sub: "绯红帆布 · 白色堆堆袜",
            note: "经典绯红帆布鞋遥相呼应酒红领带，配白色堆堆中筒袜极具复古滑板气息。",
            tags: ["低帮帆布", "绯红点亮", "复古滑板"],
          },
        ],
      },
      {
        name: "象牙白工坊美学",
        pieces: [
          {
            category: "外套",
            name: "象牙白立领链条夹克",
            sub: "不对称门襟 · 双层银链胸针",
            note: "通体象牙白不对称立领夹克，胸前饰以双层垂坠银链胸针，流露高定气息。",
            tags: ["中式立领", "银链胸针", "纯白层次"],
          },
          {
            category: "长裤",
            name: "象牙白垂坠双褶阔腿裤",
            sub: "象牙白西料 · 飘逸阔腿",
            note: "流畅垂坠的象牙白双褶阔腿裤，从肩至脚延续干净纯粹的同色系美学。",
            tags: ["流畅垂感", "双褶版型", "同色象牙白"],
          },
          {
            category: "鞋履",
            name: "黑白拼色经典乐福鞋",
            sub: "黑白拼色牛皮 · 经典便士款",
            note: "利落黑白拼色便士乐福鞋以鲜明图形对比收尾，统领整套象牙白造型。",
            tags: ["黑白拼色", "便士乐福", "工坊收尾"],
          },
        ],
      },
    ],
    es: [
      {
        name: "Edición Chaleco Negro",
        pieces: [
          {
            category: "EXTERIOR Y CAMISA",
            name: "Conjunto Chaleco y Corbata",
            sub: "Chaleco con Cadena · Camisa Blanca",
            note: "Chaleco negro estructurado con cadena plateada sobre camisa blanca remangada y corbata a rayas.",
            tags: ["Sastrería", "Cadena Plata", "Monocromo"],
          },
          {
            category: "PANTALÓN",
            name: "Pantalón Negro Doble Pinza",
            sub: "Doble Pinza · Caída Ancha",
            note: "Pantalón negro de tiro alto con doble pinza y pernera amplia que estiliza la silueta.",
            tags: ["Pierna Ancha", "Doble Pinza", "Tiro Alto"],
          },
          {
            category: "CALZADO",
            name: "Derby Charol Suela Gruesa",
            sub: "Charol Brillante · Suela Dentada",
            note: "Zapatos derby negros de alto brillo con suela gruesa que modernizan el corte formal.",
            tags: ["Charol", "Suela Dentada", "Formal Moderno"],
          },
        ],
      },
      {
        name: "Traje Monocromo",
        pieces: [
          {
            category: "ABRIGO",
            name: "Blazer Cruzado con Hebilla",
            sub: "Hebilla Plateada · Negro Total",
            note: "Blazer cruzado de líneas arquitectónicas ceñido a la cintura con correa y hebilla metálica.",
            tags: ["Corte Cruzado", "Hebilla Plata", "Estructurado"],
          },
          {
            category: "PANTALÓN",
            name: "Pantalón Carbón con Abertura",
            sub: "Abertura Frontal · Caída Fluida",
            note: "Pantalón ancho tono carbón con sutil abertura en el bajo para caer con limpieza sobre el calzado.",
            tags: ["Bajo Abierto", "Pierna Ancha", "Carbón"],
          },
          {
            category: "CALZADO",
            name: "Derby Cuero Negro Plataforma",
            sub: "Plataforma Gruesa · Cuero Negro",
            note: "Zapatos derby de piel negra con volumen robusto que anclan el traje monocromático.",
            tags: ["Plataforma", "Negro Brillo", "Protagonista"],
          },
        ],
      },
      {
        name: "Preppy Seúl",
        pieces: [
          {
            category: "CAMISA Y CORBATA",
            name: "Camisa Botón Chino y Corbata",
            sub: "Botones Nudo · Parches · Corbata Burdeos",
            note: "Camisa taupe de manga corta con botones orientales de nudo, parches de estrella y corbata burdeos.",
            tags: ["Botón Nudo", "Parches", "Urbano Preppy"],
          },
          {
            category: "ACCESORIO",
            name: "Bolso Estructurado Damasco",
            sub: "Lona Damasco Marrón · Detalle Piel",
            note: "Bolso de mano estructurado en lona damasco marrón con asas de cuero oscuro en contraste.",
            tags: ["Lona Damasco", "Detalle Piel", "Bolso Clave"],
          },
          {
            category: "CALZADO",
            name: "Zapatillas Marfil Suela Negra",
            sub: "Empeine Marfil · Suela Negra",
            note: "Zapatillas bajas color marfil con suela negra limpia para mantener la silueta relajada.",
            tags: ["Caña Baja", "Suela Contraste", "Uso Diario"],
          },
        ],
      },
      {
        name: "Minimalismo de Galería",
        pieces: [
          {
            category: "CAPA SUPERIOR",
            name: "Sobrecamisa Marfil y Camiseta",
            sub: "Sobrecamisa Hueso · Camiseta Negra",
            note: "Sobrecamisa hueso llevada abierta sobre camiseta negra mate para un contraste depurado de galería.",
            tags: ["Contraste Limpio", "Corte Relajado", "Minimal"],
          },
          {
            category: "PANTALÓN",
            name: "Pantalón Negro con Cinturón",
            sub: "Cinturón de Piel · Pierna Ancha",
            note: "Pantalón negro sastre de pierna ancha ajustado con cinturón de cuero para alargar la línea.",
            tags: ["Pierna Ancha", "Cinturón Piel", "Sastrería"],
          },
          {
            category: "CALZADO",
            name: "Botines de Ante Negro Mate",
            sub: "Ante Negro Mate · Horma Estilizada",
            note: "Botines minimalistas de ante negro mate que se integran suavemente bajo el bajo del pantalón.",
            tags: ["Ante Mate", "Punta Fina", "Estilo Galería"],
          },
        ],
      },
      {
        name: "Edición Campus",
        pieces: [
          {
            category: "CAMISA Y CORBATA",
            name: "Camisa Blanca Amplia y Corbata",
            sub: "Manga Corta · Corbata Rayas · Mochila",
            note: "Camisa blanca amplia de manga corta con corbata burdeos a rayas y mochila negra de aire colegial.",
            tags: ["Corte Amplio", "Corbata Rayas", "Aire Campus"],
          },
          {
            category: "INFERIOR",
            name: "Bermuda Denim Lavado Vintage",
            sub: "Denim Claro · Corte Ancho",
            note: "Bermuda vaquera amplia por la rodilla en lavado vintage que suaviza la formalidad de la camisa.",
            tags: ["Bermuda Ancha", "Azul Lavado", "Casual Urbano"],
          },
          {
            category: "CALZADO",
            name: "Zapatillas Lona Carmesí",
            sub: "Lona Carmesí · Calcetines Blancos",
            note: "Zapatillas bajas de lona carmesí a juego con la corbata burdeos, llevadas con calcetines blancos.",
            tags: ["Lona Baja", "Toque Carmesí", "Skate Retro"],
          },
        ],
      },
      {
        name: "Atelier Marfil",
        pieces: [
          {
            category: "ABRIGO",
            name: "Chaqueta Cuello Mao Marfil",
            sub: "Solapa Asimétrica · Broche Cadena",
            note: "Chaqueta marfil de cuello mao asimétrico rematada con broche doble de cadena plateada en el pecho.",
            tags: ["Cuello Mao", "Broche Cadena", "Todo Marfil"],
          },
          {
            category: "PANTALÓN",
            name: "Pantalón Plisado Marfil",
            sub: "Sastrería Marfil · Caída Fluida",
            note: "Pantalón ancho plisado color marfil que prolonga la armonía tonal de arriba abajo.",
            tags: ["Caída Fluida", "Doble Pinza", "Blanco Tonal"],
          },
          {
            category: "CALZADO",
            name: "Mocasines Bicolor Clásicos",
            sub: "Piel Blanco y Negro · Corte Clásico",
            note: "Mocasines bicolor en blanco y negro que cierran el conjunto marfil con contraste gráfico nítido.",
            tags: ["Bicolor", "Mocasín Clásico", "Cierre Atelier"],
          },
        ],
      },
    ],
    ar: [
      {
        name: "إطلالة الصدرية السوداء",
        pieces: [
          {
            category: "سترة وقميص",
            name: "طقم صدرية سوداء وربطة عنق",
            sub: "صدرية بسلسلة فضية · قميص أبيض",
            note: "صدرية سوداء مفصّلة بإتقان مع سلسلة جيب فضية فوق قميص أبيض مطوي الأكمام وربطة مخططة.",
            tags: ["تفصيل متقن", "سلسلة فضية", "أحادي اللون"],
          },
          {
            category: "بنطال",
            name: "بنطال أسود بكسرتين واسع",
            sub: "كسرتان أماميتان · قصة واسعة",
            note: "بنطال أسود عالي الخصر بكسرتين منسدلتين تمنحان القامة طولًا وتوازنًا أنيقًا.",
            tags: ["قصة واسعة", "كسرة مزدوجة", "خصر عالٍ"],
          },
          {
            category: "أحذية",
            name: "حذاء ديربي جلد لامع",
            sub: "جلد أسود لامع · نعل سميك",
            note: "حذاء ديربي جلدي لامع بنعل سميك يمنح الإطلالة الكلاسيكية ثقلًا عصريًا.",
            tags: ["جلد لامع", "نعل سميك", "لمسة رسمية"],
          },
        ],
      },
      {
        name: "البدلة الأحادية",
        pieces: [
          {
            category: "معطف",
            name: "بليزر ملتف بحزام ومشبك",
            sub: "مشبك خصر فضي · أسود كامل",
            note: "بليزر أسود ملتف بتصميم معماري محكم عند الخصر بحزام ومشبك معدني مصقول.",
            tags: ["قصة ملتفة", "مشبك فضي", "هيكل حاد"],
          },
          {
            category: "بنطال",
            name: "بنطال فحمي واسع بشق أمامي",
            sub: "شق سفلي أمامي · انسياب ناعم",
            note: "بنطال بدلة بلون فحمي داكن وقصة واسعة مع شق سفلي لطيف ينسدل بدقة فوق الحذاء.",
            tags: ["شق سفلي", "قصة واسعة", "فحمي داكن"],
          },
          {
            category: "أحذية",
            name: "ديربي جلد أسود بنعل مرتفع",
            sub: "نعل مرتفع سميك · جلد أسود",
            note: "حذاء ديربي أسود متين يرسّخ البدلة السوداء الكاملة بحضور قوي وواثق.",
            tags: ["نعل مرتفع", "أسود لامع", "قطعة بارزة"],
          },
        ],
      },
      {
        name: "أناقة سيول الجامعية",
        pieces: [
          {
            category: "قميص وربطة",
            name: "قميص أزرار شرقية وربطة عنق",
            sub: "أزرار عقدة · تطريز نجوم · ربطة عنابية",
            note: "قميص مخطط بأكمام قصيرة مزدان بأزرار شرقية وتطريز نجوم وغيوم مع ربطة عنابية.",
            tags: ["أزرار عقدة", "تفاصيل تطريز", "أسلوب شارع"],
          },
          {
            category: "إكسسوار",
            name: "حقيبة يد قماش دمشقي",
            sub: "قماش بني منقوش · حواف جلدية",
            note: "حقيبة يد متماسكة بنقشة دمشقية بنية كلاسيكية ومقابض جلدية داكنة تمنح تباينًا لافتًا.",
            tags: ["نقشة دمشقية", "حواف جلدية", "حقيبة مميزة"],
          },
          {
            category: "أحذية",
            name: "حذاء رياضي عاجي بنعل أسود",
            sub: "جزء علوي عاجي · نعل أسود متباين",
            note: "حذاء رياضي منخفض بلون عاجي نقي مع نعل أسود يحافظ على عفوية الإطلالة.",
            tags: ["قصير الساق", "نعل متباين", "يومي عصري"],
          },
        ],
      },
      {
        name: "بساطة المعرض الفني",
        pieces: [
          {
            category: "طبقة علوية",
            name: "قميص عاجي مفتوح وتي شيرت",
            sub: "قميص أبيض مائل · تي شيرت أسود",
            note: "قميص خارجي بلون أبيض عاجي يُرتدى مفتوحًا فوق تي شيرت أسود مطفي لتباين بصري راقٍ.",
            tags: ["تباين نقي", "قصة مريحة", "تبسيطي"],
          },
          {
            category: "بنطال",
            name: "بنطال أسود بحزام جلدي",
            sub: "حزام جلد أسود · قصة مفصّلة",
            note: "بنطال أسود واسع بكسرات متقنة وحزام جلدي أنيق يبرز خط الخصر بوضوح.",
            tags: ["قصة واسعة", "حزام جلدي", "تفصيل أنيق"],
          },
          {
            category: "أحذية",
            name: "بوت سويد أسود مطفي",
            sub: "جلد مقلوب مطفي · مقدمة انسيابية",
            note: "بوت قصير من السويد الأسود المطفي يندمج بسلاسة أسفل طرف البنطال بهدوء راقٍ.",
            tags: ["سويد مطفي", "مقدمة رفيعة", "طابع معرض"],
          },
        ],
      },
      {
        name: "إطلالة الحرم الجامعي",
        pieces: [
          {
            category: "قميص وربطة",
            name: "قميص أبيض واسع وربطة عنق",
            sub: "أكمام قصيرة · ربطة عنابية · حقيبة ظهر",
            note: "قميص أبيض واسع بأكمام قصيرة مع ربطة عنابية مخططة وحقيبة ظهر سوداء بروح جامعية مريحة.",
            tags: ["قصة واسعة", "ربطة مخططة", "روح جامعية"],
          },
          {
            category: "قطعة سفلية",
            name: "شورت جينز واسع باهت",
            sub: "دنيم فاتح باهت · طول الركبة",
            note: "شورت جينز عريض يصل إلى الركبة بغسلة كلاسيكية يكسر رسمية القميص والربطة بعفوية.",
            tags: ["جينز واسع", "أزرق باهت", "كاجوال عصري"],
          },
          {
            category: "أحذية",
            name: "حذاء قماشي قرمزي منخفض",
            sub: "قماش قرمزي · جوارب بيضاء",
            note: "حذاء قماشي بلون أحمر قرمزي يعكس لون الربطة العنابية مع جوارب بيضاء منسّقة.",
            tags: ["قماش منخفض", "لمسة قرمزية", "ريترو"],
          },
        ],
      },
      {
        name: "أتيليه العاج النقي",
        pieces: [
          {
            category: "معطف",
            name: "سترة عاجية بياقة قائمة",
            sub: "إغلاق غير متماثل · بروش سلسلة فضية",
            note: "سترة بيضاء عاجية بياقة قائمة غير متماثلة تتزين ببروش سلسلة فضية مزدوجة على الصدر.",
            tags: ["ياقة قائمة", "بروش سلسلة", "عاجي كامل"],
          },
          {
            category: "بنطال",
            name: "بنطال عاجي واسع بكسرات",
            sub: "تفصيل عاجي · انسيابية كاملة",
            note: "بنطال عاجي واسع بكسرات مزدوجة يواصل الانسجام اللوني الهادئ من الكتف حتى الحافة.",
            tags: ["انسياب ناعم", "كسرة مزدوجة", "أبيض متناغم"],
          },
          {
            category: "أحذية",
            name: "حذاء لوفر كلاسيكي بلونين",
            sub: "جلد أبيض وأسود · تصميم كلاسيكي",
            note: "حذاء لوفر أنيق باللونين الأبيض والأسود يجمع الإطلالة العاجية بتباين رسومي واضح.",
            tags: ["لونان متباينان", "لوفر كلاسيكي", "لمسة أتيليه"],
          },
        ],
      },
    ],
    fr: [
      {
        name: "Silhouette Gilet Noir",
        pieces: [
          {
            category: "HAUT & CHEMISE",
            name: "Gilet Noir Chaîne & Cravate",
            sub: "Gilet Chaîne Argent · Chemise Blanche",
            note: "Gilet noir structuré rehaussé d’une chaîne de poche argentée sur chemise blanche retroussée et cravate rayée.",
            tags: ["Tailleur", "Chaîne Argent", "Monochrome"],
          },
          {
            category: "PANTALON",
            name: "Pantalon Noir Double Pince",
            sub: "Double Pince · Coupe Large",
            note: "Pantalon noir taille haute à double pince au tombé ample allongeant naturellement la ligne.",
            tags: ["Jambe Large", "Double Pince", "Taille Haute"],
          },
          {
            category: "CHAUSSURES",
            name: "Derbies Vernies Semelle Épaisse",
            sub: "Cuir Verni · Semelle Crantée",
            note: "Derbies en cuir noir verni posées sur une semelle crantée pour moderniser le registre formel.",
            tags: ["Cuir Verni", "Semelle Crantée", "Touche Formelle"],
          },
        ],
      },
      {
        name: "Costume Monochrome",
        pieces: [
          {
            category: "VESTE",
            name: "Blazer Croisé à Boucle",
            sub: "Boucle Argent · Noir Intégral",
            note: "Blazer croisé architectural cintré à la taille par une sangle à boucle en métal brossé.",
            tags: ["Coupe Croisée", "Boucle Argent", "Structuré"],
          },
          {
            category: "PANTALON",
            name: "Pantalon Anthracite Fendu",
            sub: "Fente Devant · Tombé Fluide",
            note: "Pantalon large anthracite profond muni d’une fine fente à l’ourlet pour épouser la chaussure.",
            tags: ["Ourlet Fendu", "Jambe Large", "Anthracite"],
          },
          {
            category: "CHAUSSURES",
            name: "Derbies Cuir Plateforme",
            sub: "Plateforme Épaisse · Cuir Noir",
            note: "Derbies en cuir noir massif ancrant le costume intégral avec une assise affirmée.",
            tags: ["Plateforme", "Noir Brillant", "Pièce Forte"],
          },
        ],
      },
      {
        name: "Preppy Séoul",
        pieces: [
          {
            category: "HAUT & CRAVATE",
            name: "Chemise Brandebourgs & Cravate",
            sub: "Boutons Chinois · Patchs · Cravate Bordeaux",
            note: "Chemise rayée taupe à manches courtes ornée de boutons brandebourgs, patchs étoiles et cravate bordeaux.",
            tags: ["Brandebourgs", "Détail Patch", "Preppy Urbain"],
          },
          {
            category: "ACCESSOIRE",
            name: "Sac Structuré Toile Damas",
            sub: "Toile Damas Marron · Finition Cuir",
            note: "Cabas structuré en toile damas marron vintage à poignées de cuir sombre contrastant sur denim noir.",
            tags: ["Toile Damas", "Finition Cuir", "Sac Signature"],
          },
          {
            category: "CHAUSSURES",
            name: "Baskets Basses Ivoire",
            sub: "Tige Ivoire · Semelle Noire",
            note: "Baskets basses blanc cassé à semelle noire nette pour conserver une allure décontractée.",
            tags: ["Coupe Basse", "Semelle Contraste", "Quotidien"],
          },
        ],
      },
      {
        name: "Minimalisme Galerie",
        pieces: [
          {
            category: "HAUT SUPERPOSÉ",
            name: "Surchemise Ivoire & Tee-Shirt",
            sub: "Surchemise Écru · Tee Noir Mat",
            note: "Surchemise écru portée ouverte sur un tee-shirt noir mat pour un contraste minimaliste d’exposition.",
            tags: ["Contraste Net", "Coupe Ample", "Minimal"],
          },
          {
            category: "PANTALON",
            name: "Pantalon Noir Ceinture Cuir",
            sub: "Ceinture Cuir · Jambe Large",
            note: "Pantalon noir ample à pinces souligné d’une ceinture en cuir noir affinant la taille.",
            tags: ["Jambe Large", "Ceinture Cuir", "Tailleur"],
          },
          {
            category: "CHAUSSURES",
            name: "Bottines Daim Noir Mat",
            sub: "Daim Noir Mat · Ligne Effilée",
            note: "Bottines épurées en daim noir mat se fondant discrètement sous l’ourlet du pantalon.",
            tags: ["Daim Mat", "Bout Fin", "Esprit Galerie"],
          },
        ],
      },
      {
        name: "Édition Campus",
        pieces: [
          {
            category: "HAUT & CRAVATE",
            name: "Chemise Blanche Ample & Cravate",
            sub: "Manches Courtes · Cravate Rayée · Sac à Dos",
            note: "Chemise blanche coupe carrée portée avec une cravate bordeaux rayée et un sac à dos noir.",
            tags: ["Coupe Ample", "Cravate Rayée", "Esprit Campus"],
          },
          {
            category: "BAS",
            name: "Short Denim Délavé Large",
            sub: "Denim Clair · Longueur Genou",
            note: "Bermuda en denim ample délavé vintage qui détend aussitôt l’allure structurée de la chemise.",
            tags: ["Denim Large", "Bleu Délavé", "Urbain Cool"],
          },
          {
            category: "CHAUSSURES",
            name: "Baskets Toile Cramoisi",
            sub: "Toile Cramoisi · Chaussettes Blanches",
            note: "Baskets basses en toile rouge brique en écho à la cravate bordeaux, portées avec chaussettes blanches.",
            tags: ["Toile Basse", "Accent Rouge", "Rétro Skate"],
          },
        ],
      },
      {
        name: "Atelier Ivoire",
        pieces: [
          {
            category: "VESTE",
            name: "Veste Col Officier Ivoire",
            sub: "Patte Asymétrique · Broche Chaîne",
            note: "Veste ivoire à col officier asymétrique ponctuée d’une double broche chaîne argentée sur la poitrine.",
            tags: ["Col Officier", "Broche Chaîne", "Total Ivoire"],
          },
          {
            category: "PANTALON",
            name: "Pantalon Plissé Ivoire",
            sub: "Tailleur Ivoire · Tombé Fluide",
            note: "Pantalon ample plissé ivoire prolongeant avec fluidité l’harmonie ton sur ton.",
            tags: ["Tombé Fluide", "Double Pince", "Blanc Tonal"],
          },
          {
            category: "CHAUSSURES",
            name: "Mocassins Bicolores Classiques",
            sub: "Cuir Noir & Blanc · Coupe Classique",
            note: "Mocassins penny bicolores noir et blanc fermant la silhouette ivoire d’un contraste graphique.",
            tags: ["Bicolore", "Mocassin Penny", "Finition Atelier"],
          },
        ],
      },
    ],
    ja: [
      {
        name: "ノワール・ベスト編集",
        pieces: [
          {
            category: "アウター＆シャツ",
            name: "黒チェーンベスト＆タイセット",
            sub: "銀チェーン黒ベスト · 白シャツ",
            note: "シルバーのポケットチェーンが効いた端正な黒ベストに、袖を捲った白シャツとストライプタイを合わせた構成。",
            tags: ["テーラード", "銀チェーン", "モノトーン"],
          },
          {
            category: "トラウザーズ",
            name: "黒ダブルプリーツワイドパンツ",
            sub: "ダブルタック · ワイドドレープ",
            note: "深めのダブルタックが入ったハイウエスト黒パンツ。真っ直ぐ落ちるシルエットで脚長効果を演出。",
            tags: ["ワイド脚", "ダブルタック", "ハイウエスト"],
          },
          {
            category: "フットウェア",
            name: "黒パテント厚底ダービー",
            sub: "艶パテントレザー · 厚底ラグソール",
            note: "光沢のある黒レザーに重厚なラグソールを組み合わせ、クラシックな装いに現代的な重心をプラス。",
            tags: ["パテント革", "厚底ソール", "モダン礼装"],
          },
        ],
      },
      {
        name: "モノクローム・スーツ",
        pieces: [
          {
            category: "アウター",
            name: "バックルベルト付きラップブレザー",
            sub: "銀ウエストバックル · オールブラック",
            note: "構築的な黒のラップブレザー。ヘアライン調の金属バックルベルトでウエストを鋭く引き締めます。",
            tags: ["ラップ設計", "銀バックル", "構築シルエット"],
          },
          {
            category: "トラウザーズ",
            name: "チャコール裾スリットワイドパンツ",
            sub: "フロントスリット · 滑らかな落ち感",
            note: "深いチャコールグレーのワイドスーツパンツ。裾のスリットが靴の上で綺麗に溜まります。",
            tags: ["裾スリット", "ワイド設計", "チャコール"],
          },
          {
            category: "フットウェア",
            name: "黒レザー厚底ダービーシューズ",
            sub: "厚底プラットフォーム · 黒レザー",
            note: "ボリュームのある厚底黒ダービーがオールブラックのセットアップを力強く支えます。",
            tags: ["プラットフォーム", "黒光沢", "主役シューズ"],
          },
        ],
      },
      {
        name: "ソウル・プレッピー",
        pieces: [
          {
            category: "トップス＆タイ",
            name: "チャイナボタン刺繍シャツ＆タイ",
            sub: "チャイナボタン · 星パッチ · ボルドータイ",
            note: "トープ系ストライプ半袖シャツにチャイナボタン、星と雲のパッチ、ボルドーのタイを添えた遊び心。",
            tags: ["チャイナボタン", "パッチ装飾", "プレッピー街着"],
          },
          {
            category: "アクセサリー",
            name: "ダマスク柄ストラクチャーバッグ",
            sub: "ブラウンダマスク帆布 · 革トリム",
            note: "ヴィンテージ調のブラウンダマスク柄ハンドバッグ。黒デニムとのコントラストで視線を集めます。",
            tags: ["ダマスク帆布", "革ハンドル", "主役バッグ"],
          },
          {
            category: "フットウェア",
            name: "アイボリー黒ソールスニーカー",
            sub: "アイボリーアッパー · 黒アウトソール",
            note: "クリーンな生成りローカットスニーカーに黒ソールを合わせ、プレッピーを肩の力を抜いた印象へ。",
            tags: ["ローカット", "黒ソール", "デイリー"],
          },
        ],
      },
      {
        name: "ギャラリー・ミニマル",
        pieces: [
          {
            category: "レイヤードトップス",
            name: "アイボリー羽織シャツ＆黒T",
            sub: "オフホワイトシャツ · 黒インナーT",
            note: "ゆとりあるオフホワイトのシャツをマットな黒Tの上に羽織り、美術館のように静かな対比を作ります。",
            tags: ["清潔な対比", "リラックス", "ミニマル"],
          },
          {
            category: "トラウザーズ",
            name: "黒ベルト付きプリーツパンツ",
            sub: "黒レザーベルト · 端正なワイド",
            note: "黒レザーベルトでウエストを引き締めた黒ワイドパンツが、縦のミニマルラインを際立たせます。",
            tags: ["ワイド脚", "レザーベルト", "テーラード"],
          },
          {
            category: "フットウェア",
            name: "黒スエード・ミニマルブーツ",
            sub: "マット黒スエード · 細身フォルム",
            note: "艶を抑えた黒スエードブーツがパンツの裾に溶け込み、静謐な足元を完成させます。",
            tags: ["マットスエード", "細身トゥ", "ギャラリー向け"],
          },
        ],
      },
      {
        name: "キャンパス・エディット",
        pieces: [
          {
            category: "トップス＆タイ",
            name: "オーバーサイズ白シャツ＆タイ",
            sub: "半袖ボックス型 · ボルドータイ · リュック",
            note: "ボックス型の白半袖シャツにボルドーのストライプタイと黒リュックを合わせた軽快な学園スタイル。",
            tags: ["オーバーサイズ", "ストライプタイ", "キャンパス感"],
          },
          {
            category: "ボトムス",
            name: "ヴィンテージ風ワイドデニムショーツ",
            sub: "淡色ウォッシュ · 膝丈ワイド",
            note: "膝にかかるワイドな淡色デニムショーツが、襟付きシャツとネクタイの端正さを程よく崩します。",
            tags: ["バギーショーツ", "淡色デニム", "カジュアル"],
          },
          {
            category: "フットウェア",
            name: "クリムゾン帆布ローカット",
            sub: "深紅キャンバス · 白クルーソックス",
            note: "ボルドータイと響き合う深紅のキャンバススニーカーに、くしゅっとさせた白ソックスを合わせました。",
            tags: ["帆布ローカット", "深紅アクセント", "レトロスケート"],
          },
        ],
      },
      {
        name: "アイボリー・アトリエ",
        pieces: [
          {
            category: "アウター",
            name: "アイボリー立襟チェーンジャケット",
            sub: "非対称前立て · 銀チェーンブローチ",
            note: "全身アイボリーの非対称スタンドカラージャケット。胸元の二重シルバーチェーンが端正な華やぎを添えます。",
            tags: ["スタンドカラー", "チェーンブローチ", "オールアイボリー"],
          },
          {
            category: "トラウザーズ",
            name: "アイボリー・ダブルプリーツパンツ",
            sub: "アイボリー仕立て · 流れるワイド",
            note: "歩くたびに揺れる柔らかなアイボリーワイドパンツが、肩から足元までのワントーンを美しく繋ぎます。",
            tags: ["揺れるドレープ", "ダブルタック", "ワントーン白"],
          },
          {
            category: "フットウェア",
            name: "白黒ツートン・ペニーローファー",
            sub: "モノトーンレザー · クラシック型",
            note: "シャープな白黒ツートンのペニーローファーが、全身アイボリーに引き締まったコントラストを与えます。",
            tags: ["ツートン配色", "ペニーローファー", "アトリエ仕上げ"],
          },
        ],
      },
    ],
    ko: [
      {
        name: "누아르 베스트 에딧",
        pieces: [
          {
            category: "아우터 & 셔츠",
            name: "블랙 체인 베스트 & 타이 세트",
            sub: "실버 체인 베스트 · 화이트 셔츠",
            note: "실버 포켓 체인이 더해진 정갈한 블랙 베스트에 소매를 걷은 화이트 셔츠와 스트라이프 타이를 매치했습니다.",
            tags: ["테일러드", "실버 체인", "모노크롬"],
          },
          {
            category: "팬츠",
            name: "블랙 더블 플리츠 와이드 팬츠",
            sub: "더블 플리츠 · 와이드 실루엣",
            note: "하이웨이스트 블랙 더블 플리츠 팬츠가 곧게 떨어지며 전체 비율을 길어 보이게 합니다.",
            tags: ["와이드 핏", "더블 플리츠", "하이웨이스트"],
          },
          {
            category: "슈즈",
            name: "블랙 페이턴트 청키 더비",
            sub: "유광 페이턴트 · 청키 러그 솔",
            note: "은은한 광택의 블랙 가죽 더비에 묵직한 러그 솔을 더해 클래식 포멀에 현대적 균형을 줍니다.",
            tags: ["페이턴트 가죽", "러그 솔", "포멀 포인트"],
          },
        ],
      },
      {
        name: "모노크롬 수트",
        pieces: [
          {
            category: "아우터",
            name: "벨티드 랩 수트 블레이저",
            sub: "실버 허리 버클 · 올블랙",
            note: "브러시드 메탈 버클 스트랩으로 허리선을 단정하게 잡아 주는 구조적인 블랙 랩 블레이저입니다.",
            tags: ["랩 컷", "실버 버클", "구조적 핏"],
          },
          {
            category: "팬츠",
            name: "차콜 슬릿 와이드 팬츠",
            sub: "앞밑단 슬릿 · 유연한 드레이프",
            note: "깊은 차콜 톤의 와이드 수트 팬츠로 밑단 슬릿이 슈즈 위로 깔끔하게 떨어집니다.",
            tags: ["밑단 슬릿", "와이드 핏", "차콜"],
          },
          {
            category: "슈즈",
            name: "청키 블랙 레더 더비",
            sub: "두꺼운 플랫폼 솔 · 블랙 가죽",
            note: "존재감 있는 블랙 가죽 더비 슈즈가 올블랙 수트 실루엣을 단단하게 받쳐 줍니다.",
            tags: ["플랫폼 러그", "블랙 광택", "포인트 슈즈"],
          },
        ],
      },
      {
        name: "서울 프레피",
        pieces: [
          {
            category: "상의 & 타이",
            name: "매듭 버튼 패치 셔츠 & 타이",
            sub: "동양 매듭 단추 · 별 패치 · 버건디 타이",
            note: "토프 스트라이프 반팔 셔츠에 동양 매듭 단추와 별·구름 패치, 버건디 스트라이프 타이를 조합했습니다.",
            tags: ["매듭 단추", "패치 디테일", "프레피 스트리트"],
          },
          {
            category: "액세서리",
            name: "다마스크 구조형 핸드백",
            sub: "브라운 다마스크 캔버스 · 가죽 트리밍",
            note: "빈티지 브라운 다마스크 패턴 토트백과 다크 레더 핸들이 흑청 데님 위에서 선명한 포인트가 됩니다.",
            tags: ["다마스크 원단", "가죽 트리밍", "포인트 백"],
          },
          {
            category: "슈즈",
            name: "아이보리 대비 로우 스니커즈",
            sub: "아이보리 어퍼 · 블랙 아웃솔",
            note: "깔끔한 아이보리 로우탑 스니커즈에 블랙 아웃솔을 더해 프레피 룩을 자연스럽게 풀어냈습니다.",
            tags: ["로우탑", "대비 솔", "데일리 스트리트"],
          },
        ],
      },
      {
        name: "갤러리 미니멀",
        pieces: [
          {
            category: "레이어드 상의",
            name: "아이보리 오픈 오버셔츠 & 티",
            sub: "오프화이트 오버셔츠 · 블랙 티셔츠",
            note: "여유로운 오프화이트 오버셔츠를 매트한 블랙 티셔츠 위에 열어 입어 갤러리 같은 정제된 대비를 완성했습니다.",
            tags: ["깔끔한 대비", "여유로운 핏", "미니멀"],
          },
          {
            category: "팬츠",
            name: "블랙 벨트 플리츠 와이드 팬츠",
            sub: "블랙 가죽 벨트 · 테일러드 와이드",
            note: "슬림한 블랙 가죽 벨트로 허리선을 정돈한 블랙 와이드 팬츠가 길고 단정한 실루엣을 만듭니다.",
            tags: ["와이드 핏", "가죽 벨트", "테일러드"],
          },
          {
            category: "슈즈",
            name: "블랙 스웨이드 미니멀 부츠",
            sub: "매트 블랙 스웨이드 · 날렵한 라스트",
            note: "광택을 덜어낸 블랙 스웨이드 부츠가 팬츠 밑단 아래로 차분하게 이어집니다.",
            tags: ["매트 스웨이드", "슬림 토", "갤러리 무드"],
          },
        ],
      },
      {
        name: "캠퍼스 에딧",
        pieces: [
          {
            category: "상의 & 타이",
            name: "오버사이즈 화이트 셔츠 & 타이",
            sub: "박시 반팔 · 버건디 타이 · 백팩",
            note: "박시한 화이트 반팔 셔츠에 버건디 스트라이프 타이와 블랙 백팩을 매치해 경쾌한 캠퍼스 무드를 살렸습니다.",
            tags: ["오버사이즈", "스트라이프 타이", "캠퍼스 무드"],
          },
          {
            category: "하의",
            name: "빈티지 워시드 데님 버뮤다",
            sub: "라이트 워시드 데님 · 무릎 기장 와이드",
            note: "무릎에 닿는 넉넉한 빈티지 데님 쇼츠가 셔츠와 타이의 단정함을 편안하게 중화합니다.",
            tags: ["배기 쇼츠", "워시드 블루", "캐주얼 스트리트"],
          },
          {
            category: "슈즈",
            name: "크림슨 캔버스 로우 스니커즈",
            sub: "크림슨 캔버스 · 화이트 크루 삭스",
            note: "버건디 타이와 색감을 맞춘 크림슨 캔버스 스니커즈에 화이트 양말로 레트로 감각을 더했습니다.",
            tags: ["캔버스 로우", "크림슨 포인트", "레트로 스케이트"],
          },
        ],
      },
      {
        name: "아이보리 아틀리에",
        pieces: [
          {
            category: "아우터",
            name: "아이보리 차이나칼라 재킷",
            sub: "비대칭 여밈 · 실버 체인 브로치",
            note: "올 아이보리 비대칭 차이나칼라 재킷 가슴에 더블 실버 체인 브로치를 얹어 섬세한 완성도를 높였습니다.",
            tags: ["차이나칼라", "체인 브로치", "올 아이보리"],
          },
          {
            category: "팬츠",
            name: "아이보리 더블 플리츠 팬츠",
            sub: "아이보리 테일러링 · 유연한 와이드",
            note: "걸음에 따라 부드럽게 흐르는 아이보리 와이드 팬츠가 위아래 톤온톤 실루엣을 매끄럽게 잇습니다.",
            tags: ["유연한 드레이프", "더블 플리츠", "톤온톤 화이트"],
          },
          {
            category: "슈즈",
            name: "투톤 페니 로퍼",
            sub: "블랙 & 화이트 레더 · 클래식 로퍼",
            note: "선명한 블랙 앤 화이트 투톤 페니 로퍼가 올 아이보리 룩에 그래픽적인 마무리를 더합니다.",
            tags: ["투톤 배색", "페니 로퍼", "아틀리에 마감"],
          },
        ],
      },
    ],
  };

  function esc(str) {
    return String(str == null ? "" : str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function getLang(overrideLang) {
    var l = overrideLang || (window.ZK && window.ZK.lang) || "id";
    return COPY[l] ? l : "id";
  }

  function getCopy(overrideLang) {
    return COPY[getLang(overrideLang)] || COPY.id;
  }

  function getLooks(overrideLang) {
    var lang = getLang(overrideLang);
    var l10n = LOOKS_L10N[lang] || LOOKS_L10N.id;
    return LOOKS_BASE.map(function (base, li) {
      var loc = l10n[li] || LOOKS_L10N.id[li];
      return {
        key: base.key,
        name: loc.name,
        model640: base.model640,
        model1080: base.model1080,
        pieces: base.pieces.map(function (pb, pi) {
          var pl = loc.pieces[pi] || LOOKS_L10N.id[li].pieces[pi];
          return {
            n: pb.n,
            image: pb.image,
            left: pb.left,
            top: pb.top,
            isNew: pb.isNew,
            name: pl.name,
            category: pl.category,
            sub: pl.sub,
            note: pl.note,
            tags: pl.tags,
          };
        }),
      };
    });
  }

  /* Home Mascot Head SVG with layered sclera & irises (unique IDs so zero conflict with #mascot) */
  function renderMascotBrandSVG() {
    return (
      '<svg class="rw-brand-mascot" viewBox="0 0 1330 1182" aria-hidden="true">' +
      "<defs>" +
      '<radialGradient id="rwHIr" cx=".5" cy=".45" r=".55">' +
      '<stop offset="0" stop-color="#2b2b2f"/>' +
      '<stop offset=".75" stop-color="#4a4a50"/>' +
      '<stop offset="1" stop-color="#1c1c20"/>' +
      "</radialGradient>" +
      '<linearGradient id="rwHSh" x1="0" y1="0" x2="0" y2="1">' +
      '<stop offset="0" stop-color="#000" stop-opacity=".28"/>' +
      '<stop offset=".45" stop-color="#000" stop-opacity="0"/>' +
      "</linearGradient>" +
      '<clipPath id="rwHcL"><polygon points="473,787 535,790 585,795 640,806 662,818 618,838 570,842 520,838 485,815"/></clipPath>' +
      '<clipPath id="rwHcR"><polygon points="820,815 870,813 920,816 965,822 965,829 940,851 890,859 850,857 820,842 812,830"/></clipPath>' +
      "</defs>" +
      '<g clip-path="url(#rwHcL)">' +
      '<polygon points="473,787 535,790 585,795 640,806 662,818 618,838 570,842 520,838 485,815" fill="#fafafa"/>' +
      '<g id="rwMkL"><circle cx="582" cy="800" r="47" fill="url(#rwHIr)"/><circle cx="582" cy="804" r="23" fill="#0c0c0e"/><circle cx="592" cy="806" r="6" fill="#fff"/><circle cx="570" cy="819" r="3" fill="#fff" opacity=".7"/></g>' +
      '<polygon points="473,787 535,790 585,795 640,806 662,818 618,838 570,842 520,838 485,815" fill="url(#rwHSh)"/>' +
      "</g>" +
      '<g clip-path="url(#rwHcR)">' +
      '<polygon points="820,815 870,813 920,816 965,822 965,829 940,851 890,859 850,857 820,842 812,830" fill="#fafafa"/>' +
      '<g id="rwMkR"><circle cx="872" cy="819" r="41" fill="url(#rwHIr)"/><circle cx="872" cy="823" r="20" fill="#0c0c0e"/><circle cx="881" cy="824" r="5" fill="#fff"/><circle cx="862" cy="835" r="2" fill="#fff" opacity=".7"/></g>' +
      '<polygon points="820,815 870,813 920,816 965,822 965,829 940,851 890,859 850,857 820,842 812,830" fill="url(#rwHSh)"/>' +
      "</g>" +
      '<image href="assets/images/mascot-head.webp" width="1330" height="1182"/>' +
      "</svg>"
    );
  }

  function renderPage(overrideLang) {
    var lang = getLang(overrideLang);
    var c = getCopy(lang);
    var LOOKS = getLooks(lang);
    var secId = "Runway-template--zikri__fashion_archive";

    var modelsHTML = LOOKS.map(function (look, idx) {
      var n1 = idx + 1;
      return (
        '<div class="rw__model" data-rw-model data-index="' +
        idx +
        '" aria-hidden="true">' +
        '<span class="rw__shadow" aria-hidden="true"></span>' +
        '<div class="rw__figure" style="--rw-ar:0.5625">' +
        '<div class="rw__art">' +
        '<img data-model-image src="' +
        look.model640 +
        '" srcset="' +
        look.model640 +
        " 640w, " +
        look.model1080 +
        ' 1080w" sizes="(min-width: 1800px) 540px, (min-width: 750px) 420px, 320px" loading="eager" decoding="async" width="1100" height="1956" draggable="false" alt="' +
        esc(look.name) +
        '">' +
        '<button type="button" class="rw__hit" data-rw-go="' +
        idx +
        '" aria-label="' +
        esc(c.lookWord + " " + n1 + ": " + look.name) +
        '" tabindex="-1"></button>' +
        "</div>" +
        "</div>" +
        "</div>"
      );
    }).join("");

    var heroesHTML = LOOKS.map(function (look, idx) {
      var n1 = idx + 1;
      var pinsHTML = look.pieces
        .map(function (piece) {
          return (
            '<button type="button" class="rw__pin" data-rw-pin="' +
            piece.n +
            '" data-tip="' +
            esc(piece.name) +
            '" style="left:' +
            piece.left +
            "%;top:" +
            piece.top +
            "%;--pi:" +
            piece.n +
            '" aria-label="' +
            esc(piece.n + ": " + piece.name) +
            '" tabindex="-1">' +
            '<span class="rw__pin-dot">' +
            piece.n +
            "</span>" +
            "</button>"
          );
        })
        .join("");

      return (
        '<div class="rw__hero' +
        (idx === 0 ? " is-on" : "") +
        '" data-rw-hero data-index="' +
        idx +
        '" data-name="' +
        esc(look.name) +
        '" data-label="' +
        esc(c.lookWord + " " + n1 + ": " + look.name) +
        '" data-probe="' +
        look.model640 +
        '" aria-hidden="' +
        (idx === 0 ? "false" : "true") +
        '">' +
        '<div class="rw__morph">' +
        '<span class="rw__shadow" aria-hidden="true"></span>' +
        '<div class="rw__figure" style="--rw-ar:0.5625">' +
        '<div class="rw__art">' +
        '<img data-model-image src="' +
        look.model640 +
        '" srcset="' +
        look.model640 +
        " 640w, " +
        look.model1080 +
        ' 1080w" sizes="(min-width: 1800px) 540px, (min-width: 750px) 420px, 320px" loading="eager" decoding="async" width="1100" height="1956" draggable="false" alt="' +
        esc(look.name) +
        '">' +
        '<button type="button" class="rw__zoom" data-rw-zoom aria-label="' +
        esc(c.viewLookAria + ": " + look.name) +
        '" tabindex="' +
        (idx === 0 ? "0" : "-1") +
        '"></button>' +
        '<div class="rw__pins">' +
        pinsHTML +
        "</div>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</div>"
      );
    }).join("");

    var ticksHTML = LOOKS.map(function (look, idx) {
      var pad = "0" + (idx + 1);
      return (
        '<button type="button" class="rw__tick" data-rw-tick="' +
        idx +
        '" aria-current="' +
        (idx === 0 ? "true" : "false") +
        '" aria-label="' +
        esc(c.lookWord + " " + (idx + 1) + ": " + look.name) +
        '">' +
        '<span class="rw__tick-bar" aria-hidden="true"></span>' +
        '<span class="rw__tick-label">' +
        pad +
        '<span class="rw__tick-name">&nbsp;&nbsp;' +
        esc(look.name) +
        "</span></span>" +
        "</button>"
      );
    }).join("");

    var panelsHTML = LOOKS.map(function (look, idx) {
      var pad = "0" + (idx + 1);
      var rowsHTML = look.pieces
        .map(function (piece) {
          var pickerId = "Detail-" + secId + "-look_" + look.key + "-" + piece.n;

          var tagHTML = piece.isNew
            ? '<span class="rw__tag" aria-hidden="true"><span class="rw__tag-text">' +
              esc(c.tagNew) +
              "</span></span>"
            : "";

          var pillsHTML = piece.tags
            .map(function (tg) {
              return '<span class="rw__style-pill">' + esc(tg) + "</span>";
            })
            .join("");

          return (
            '<li class="rw__item" data-rw-card="' +
            piece.n +
            '" style="--i:' +
            piece.n +
            '" data-title="' +
            esc(piece.name) +
            '">' +
            tagHTML +
            '<div class="rw__media" data-rw-focus-piece aria-hidden="true">' +
            '<img src="' +
            piece.image +
            '" width="400" height="500" loading="lazy" decoding="async" alt="">' +
            '<span class="rw__num">' +
            piece.n +
            "</span>" +
            "</div>" +
            '<div class="rw__info">' +
            '<span class="rw__type">' +
            esc(piece.category) +
            "</span>" +
            '<button type="button" class="rw__name" data-rw-focus-piece>' +
            esc(piece.name) +
            "</button>" +
            '<span class="rw__price"><span>' +
            esc(piece.sub) +
            "</span></span>" +
            "</div>" +
            '<button type="button" class="rw__add" data-rw-add aria-expanded="false" aria-controls="' +
            pickerId +
            '" aria-label="' +
            esc(c.toggleDetailAria + ": " + piece.name) +
            '">' +
            '<svg class="rw__ic-plus" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" aria-hidden="true"><path d="M12 4v16M4 12h16"/></svg>' +
            "</button>" +
            '<div class="rw__picker" id="' +
            pickerId +
            '" data-rw-picker hidden>' +
            '<div class="rw__picker-head">' +
            '<img src="' +
            piece.image +
            '" width="160" height="200" loading="lazy" decoding="async" alt="">' +
            '<div class="rw__picker-meta">' +
            '<span class="rw__picker-title">' +
            esc(piece.name) +
            "</span>" +
            '<span class="rw__picker-price">' +
            esc(piece.sub) +
            "</span>" +
            "</div>" +
            '<button type="button" class="rw__pick-close" data-rw-pick-close aria-label="' +
            esc(c.closeDrawer) +
            '">' +
            '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M5 5l14 14M19 5L5 19"/></svg>' +
            "</button>" +
            "</div>" +
            '<div class="rw__tag-pills">' +
            pillsHTML +
            "</div>" +
            '<p class="rw__note-copy">' +
            esc(piece.note) +
            "</p>" +
            '<button type="button" class="rw__confirm" data-rw-confirm data-pin="' +
            piece.n +
            '">' +
            "<span>" +
            esc(c.focusPinBtn) +
            "</span>" +
            '<span class="rw__sr"> — ' +
            esc(piece.name) +
            "</span>" +
            "</button>" +
            "</div>" +
            "</li>"
          );
        })
        .join("");

      return (
        '<div class="rw__look-panel' +
        (idx === 0 ? " is-in" : "") +
        '" data-rw-panel="' +
        idx +
        '"' +
        (idx === 0 ? "" : " hidden") +
        ">" +
        '<div class="rw__mhead">' +
        '<span class="rw__mhead-title">' +
        esc(look.name) +
        "</span>" +
        '<span class="rw__label">' +
        esc(c.piecesText) +
        "</span>" +
        "</div>" +
        '<ul class="rw__items" role="list">' +
        rowsHTML +
        "</ul>" +
        '<div class="rw__bundle has-rule">' +
        '<div class="rw__bundle-row">' +
        '<div class="rw__bundle-copy">' +
        '<span class="rw__bundle-title">' +
        esc(look.name) +
        "</span>" +
        '<span class="rw__bundle-note">' +
        esc(c.bundleNote) +
        "</span>" +
        "</div>" +
        '<div class="rw__bundle-price">' +
        "<span>" +
        esc(c.lookBadge) +
        "</span>" +
        "<strong>" +
        pad +
        " / 0" +
        LOOKS.length +
        "</strong>" +
        "</div>" +
        "</div>" +
        '<button type="button" class="rw__cta" data-rw-all>' +
        '<span class="rw__cta-add">' +
        esc(c.ctaOpen) +
        "</span>" +
        '<span class="rw__cta-m">' +
        esc(c.ctaOpen + " — " + pad + "/0" + LOOKS.length) +
        "</span>" +
        '<span class="rw__cta-done">' +
        esc(c.ctaNext) +
        "</span>" +
        '<svg class="rw__cta-arrow" width="22" height="12" viewBox="0 0 26 14" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M1 7h24M19 1l6 6-6 6"/></svg>' +
        "</button>" +
        "</div>" +
        "<template data-rw-pieces-text>" +
        esc(c.piecesText) +
        "</template>" +
        "</div>"
      );
    }).join("");

    var sectionTokens = [
      "--rw-c-stage:#ffffff",
      "--rw-c-panel:#ffffff",
      "--rw-c-text:#151413",
      "--rw-c-muted:#66625c",
      "--rw-c-accent:#0e0e0e",
      "--rw-c-on-accent:#ffffff",
      "--rw-c-line:#c8c8c8",
      "--rw-card:#DFDFDF",
      "--rw-hf:var(--font-heading--family,inherit)",
      "--rw-hw:400",
      "--rw-h-d:46px",
      "--rw-h-m:24px",
      "--rw-sub-d:12px",
      "--rw-sub-m:12px",
      "--rw-eyebrow-d:11px",
      "--rw-eyebrow-m:10px",
      "--rw-label-d:10px",
      "--rw-label-m:9px",
      "--rw-chip-d:17px",
      "--rw-chip-m:18px",
      "--rw-ph-d:18px",
      "--rw-ph-m:16px",
      "--rw-pt-size-d:13px",
      "--rw-pt-size-m:12px",
      "--rw-price-d:12px",
      "--rw-price-m:12px",
      "--rw-opt-d:11px",
      "--rw-opt-m:11px",
      "--rw-total-d:16px",
      "--rw-total-m:16px",
      "--rw-thumb-d:92px",
      "--rw-thumb-m:62px",
      "--rw-tag-top:18px",
      "--rw-tag-left:0px",
      "--rw-thumb-radius:0px",
      "--rw-morph:900ms",
      "--rw-bar-r:20px",
      "--rw-panel-w:380px",
      "--rw-panel-pad-d:32px",
      "--rw-radius:0px",
      "--rw-max:none",
      "--rw-speed:5s",
      "--rw-ax:40%",
      "--rw-btn-radius:0px",
      "--rw-pill-radius:30px",
      "--rw-add-radius:20px",
    ].join(";");

    return (
      '<header class="rw-site-header shopify-section-group-header-group" data-i18n-own="1">' +
      '<button type="button" class="rw-brand" data-rw-nav="home" aria-label="' +
      esc(c.brandLabel) +
      '">' +
      renderMascotBrandSVG() +
      "</button>" +
      '<nav aria-label="' +
      esc(c.navAria) +
      '">' +
      '<button type="button" class="rw-nav-home" data-rw-nav="home">' +
      '<svg width="16" height="10" viewBox="0 0 18 10" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17 5H1M5 1L1 5l4 4"/></svg>' +
      "<span>" +
      esc(c.navHome) +
      "</span>" +
      "</button>" +
      "</nav>" +
      "</header>" +
      '<main class="rw-main">' +
      '<runway-section id="' +
      secId +
      '" data-i18n-own="1" class="rw rw--add-icon rw--popup rw--list has-dividers has-border" ' +
      'data-feel="balanced" data-blur="true" data-mblur="true" data-style="ring" data-mstyle="classic" ' +
      'data-fit="true" data-height-mode="original" data-height-vh="100" data-mheight-mode="custom" data-mheight-vh="109" ' +
      'data-reflect="false" data-autoplay="true" data-speed="5000" ' +
      'style="' +
      sectionTokens +
      '">' +
      '<div class="rw__sticky">' +
      '<div class="rw__grid">' +
      '<div class="rw__left">' +
      '<div class="rw__head">' +
      '<div class="rw__intro">' +
      '<h2 class="rw__title">' +
      esc(c.title) +
      "</h2>" +
      '<p class="rw__sub">' +
      esc(c.subtitle) +
      "</p>" +
      "</div>" +
      '<span class="rw__sr" aria-live="polite" aria-atomic="true" data-rw-live></span>' +
      "</div>" +
      '<div class="rw__stage" dir="ltr" data-rw-stage tabindex="0" role="region" aria-roledescription="carousel" aria-label="' +
      esc(c.stageAria) +
      '">' +
      '<div class="rw__actors" data-rw-actors>' +
      modelsHTML +
      "</div>" +
      '<div class="rw__heroes" data-rw-heroes>' +
      heroesHTML +
      "</div>" +
      '<span class="rw__sweep" aria-hidden="true"></span>' +
      '<span class="rw__cursor" data-rw-cursor aria-hidden="true">' +
      '<span class="rw__cursor-in">' +
      '<span class="rw__cursor-label rw__cursor-drag">' +
      esc(c.dragLabel) +
      "</span>" +
      '<span class="rw__cursor-label rw__cursor-view">' +
      esc(c.viewLabel) +
      "</span>" +
      "</span>" +
      "</span>" +
      '<span class="rw__walk" aria-hidden="true"><span class="rw__walk-line"></span></span>' +
      "</div>" +
      '<div class="rw__controls" dir="ltr">' +
      '<button type="button" class="rw__icon" data-rw-prev aria-label="' +
      esc(c.prevLabel) +
      '">' +
      '<svg width="26" height="14" viewBox="0 0 26 14" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M25 7H1M7 1L1 7l6 6"/></svg>' +
      "</button>" +
      '<div class="rw__ticks">' +
      ticksHTML +
      "</div>" +
      '<button type="button" class="rw__icon rw__auto" data-rw-auto aria-pressed="false" aria-label="' +
      esc(c.autoLabel) +
      '">' +
      '<svg class="rw__ic-play" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 4.5v15l12.5-7.5z"/></svg>' +
      '<svg class="rw__ic-pause" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6.5 4.5h3.5v15H6.5zM14 4.5h3.5v15H14z"/></svg>' +
      "</button>" +
      '<button type="button" class="rw__icon" data-rw-next aria-label="' +
      esc(c.nextLabel) +
      '">' +
      '<svg width="26" height="14" viewBox="0 0 26 14" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M1 7h24M19 1l6 6-6 6"/></svg>' +
      "</button>" +
      "</div>" +
      '<div class="rw__lb" data-rw-lb data-word="' +
      esc(c.lookWord) +
      '" role="region" aria-label="' +
      esc(c.lbAria) +
      '" aria-hidden="true">' +
      '<div class="rw__lb-stage" dir="ltr" data-rw-lb-stage></div>' +
      '<div class="rw__lb-top">' +
      '<p class="rw__lb-cap"><span class="rw__lb-kicker" data-rw-lb-kicker></span><span class="rw__lb-name" data-rw-lb-name></span></p>' +
      '<button type="button" class="rw__lb-close" data-rw-zoom-close aria-label="' +
      esc(c.lbClose) +
      '">' +
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M5 5l14 14M19 5L5 19"/></svg>' +
      "</button>" +
      "</div>" +
      '<p class="rw__lb-hint">' +
      esc(c.lbHint) +
      "</p>" +
      "</div>" +
      "</div>" +
      '<aside class="rw__panel has-rule">' +
      '<div class="rw__panel-inner">' +
      '<div class="rw__panel-head">' +
      '<h3 class="rw__panel-title">' +
      esc(c.inThisLook) +
      "</h3>" +
      '<span class="rw__label" data-rw-pieces>' +
      esc(c.piecesText) +
      "</span>" +
      "</div>" +
      panelsHTML +
      "</div>" +
      "</aside>" +
      "</div>" +
      "</div>" +
      "</runway-section>" +
      "</main>"
    );
  }

  window.ZK_RUNWAY_DATA = {
    catalog: {
      looks: LOOKS_BASE,
    },
    getCopy: getCopy,
    getLooks: getLooks,
    renderPage: renderPage,
  };
})();
