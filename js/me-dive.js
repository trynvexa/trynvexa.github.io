/* ==========================================================================
   me-dive.js — "Laptop Dive" One-Screen Interactive Controller for Me (p2)
   Registers via window.ZK3D.registerPage(2, ...) with deterministic cleanup.
   Includes future-proof ME_DIVE_CONFIG so custom Kling videos or studio photos
   can be dropped into assets/me/ without changing controller logic.
   ========================================================================== */
(function () {
  var Z = window.ZK3D;
  if (!Z) return;

  /**
   * Central asset & case configuration.
   * To upgrade later with your own Kling 3.0 transition video or studio photos,
   * simply set `customPlate`, `customCut`, `customCasePlate`, `customBadge`,
   * `transVideo`, or `cases[i].video` to your file paths!
   */
  var ME_DIVE_CONFIG = {
    studioPlate: 'assets/images/me-studio-plate.webp',
    cutout: 'assets/images/gallery-hero.webp',
    badgePhoto: 'assets/me/cut.png',
    // Custom studio photography & AI camera-dive transition assets:
    customPlate: 'assets/me/plate.png',
    customCut: 'assets/me/cut.png',
    customCasePlate: 'assets/me/case-plate.png',
    customBadge: '',
    transVideo: 'assets/me/trans.mp4',
    transRevVideo: 'assets/me/trans-rev.mp4',
    mobileHeroCenterX: 742,
    cases: [
      {
        id: 'mono',
        type: 'project',
        video: '',
        img: 'assets/images/project-mono.webp',
        url: 'https://v0-mono-ecommerce.vercel.app/',
        domain: 'v0-mono-ecommerce.vercel.app',
        title: 'MONO LIVING',
        rows: ['MODULAR HOUSING', 'FRONT-END & UI', '2026'],
        key: '// mono living',
        textId: '— landing page hunian modular dengan tipografi raksasa yang ditimpa arsitektur baja di tepi air.',
        textEn: '— a modular housing storefront where giant typography sits behind weathered steel architecture.'
      },
      {
        id: 'gigi',
        type: 'project',
        video: '',
        img: 'assets/images/project-gigi.webp',
        url: 'https://modern-gen-z-energy-drink-landi-six-eta.vercel.app/',
        domain: 'gigi-energy.vercel.app',
        title: 'GIGI ENERGY',
        rows: ['ZERO SUGAR DRINK', 'CONVERSION UI', '2026'],
        key: '// gigi energy',
        textId: '— panggung putih bersih dengan aksen neon lime, judul padat, dan alur konversi yang langsung tajam.',
        textEn: '— a crisp white stage lit by electric lime accents, dense headlines, and instant conversion cues.'
      },
      {
        id: 'compute',
        type: 'project',
        video: '',
        img: 'assets/images/project-compute.webp',
        url: 'https://compute-the-platform-to-build-psi-tan.vercel.app/',
        domain: 'compute-ai.vercel.app',
        title: 'COMPUTE AI',
        rows: ['AI AGENT PLATFORM', 'DARK UI SYSTEM', '2026'],
        key: '// compute ai',
        textId: '— halaman depan dark-mode untuk platform agen AI terdistribusi dengan metrik performa real-time.',
        textEn: '— a dark-mode launchpad for distributed AI agents with live telemetry metrics and bold contrast.'
      },
      {
        id: 'sweet',
        type: 'project',
        video: '',
        img: 'assets/images/project-sweet.jpg',
        url: 'https://trynvexa.github.io/toko-kue/',
        domain: 'trynvexa.github.io/toko-kue',
        title: 'SWEET HEAVEN',
        rows: ['ARTISAN BAKERY', 'E-COMMERCE', '2026'],
        key: '// sweet heaven',
        textId: '— katalog toko kue artisan bernuansa krem dan emas dengan judul serif klasik di tengah layar.',
        textEn: '— a warm cream-and-gold artisan bakery storefront led by centered classic serif typography.'
      }
    ]
  };

  window.ME_DIVE_CONFIG = ME_DIVE_CONFIG;

  // Module-level Blob cache so re-opening card "Me" never re-downloads transition clips
  var blobCache = {};
  var blobPromises = {};

  function getCachedBlobUrl(url) {
    if (!url) return Promise.resolve('');
    if (blobCache[url]) return Promise.resolve(blobCache[url]);
    if (!blobPromises[url]) {
      blobPromises[url] = fetch(url)
        .then(function (r) { if (!r.ok) throw new Error('fetch'); return r.blob(); })
        .then(function (b) {
          blobCache[url] = URL.createObjectURL(b);
          return blobCache[url];
        })
        .catch(function () {
          delete blobPromises[url];
          return '';
        });
    }
    return blobPromises[url];
  }

  function pad2(n) {
    return (n < 10 ? '0' : '') + n;
  }

  var MD_I18N = {
    id: {
      regionAria: 'Profil M. Zikri Al-Bukhori — Studio & Portofolio',
      logoAria: 'Kembali ke studio',
      laptopHitAria: 'Masuk ke layar laptop untuk melihat profil dan karya',
      t1Home: '← beranda',
      t1Studio: 'studio saya',
      t2: 'portofolio',
      t3: 'proyek',
      t4: 'kontak',
      hint: 'gulir ke dalam karya',
      prevLbl: 'karya <br>sebelumnya',
      prevAria: 'Karya sebelumnya',
      nextLbl: 'karya <br>berikutnya',
      nextAria: 'Karya berikutnya',
      liveDemo: 'Lihat Situs ↗',
      script: 'front-end & ui',
      cardTitle: 'KARTU<br>DESAINER',
      cardRole: 'FRONT-END // DESAINER UI',
      rowName: 'NAMA',
      rowFocus: 'FOKUS',
      rowFocusVal: 'FRONT-END & UI',
      rowWork: 'KERJA',
      rowWorkVal: 'PKL DIGITALCODE',
      rowWeb: 'WEB',
      idleTop: 'STUDIO // 2026',
      idleSub: 'masuk ke',
      idleTitle: 'KARYA ZIKRI',
      idleLoc: 'MEDAN • WIB',
      idleCases: '04 KARYA →',
      cases: {
        mono: { rows: ['HUNIAN MODULAR', 'FRONT-END & UI', '2026'], text: '— halaman depan hunian modular dengan tipografi raksasa yang ditimpa arsitektur baja di tepi air.' },
        gigi: { rows: ['MINUMAN TANPA GULA', 'DESAIN KONVERSI', '2026'], text: '— panggung putih bersih dengan aksen hijau neon, judul padat, dan alur konversi yang langsung tajam.' },
        compute: { rows: ['PLATFORM AGEN AI', 'SISTEM UI GELAP', '2026'], text: '— halaman depan mode gelap untuk platform agen AI terdistribusi dengan metrik performa langsung.' },
        sweet: { rows: ['TOKO KUE ARTISAN', 'TOKO DARING', '2026'], text: '— katalog toko kue artisan bernuansa krem dan emas dengan judul serif klasik di tengah layar.' }
      }
    },
    en: {
      regionAria: 'M. Zikri Al-Bukhori Profile — Studio & Portfolio',
      logoAria: 'Back to studio',
      laptopHitAria: 'Dive into the laptop screen to view projects',
      t1Home: '← home',
      t1Studio: 'my studio',
      t2: 'portfolio',
      t3: 'projects',
      t4: 'contacts',
      hint: 'scroll into the work',
      prevLbl: 'previous <br>case',
      prevAria: 'Previous case',
      nextLbl: 'next <br>case',
      nextAria: 'Next case',
      liveDemo: 'Live Demo ↗',
      script: 'front-end & ui',
      cardTitle: 'DESIGNER<br>CARD',
      cardRole: 'FRONT-END // UI DESIGNER',
      rowName: 'NAME',
      rowFocus: 'FOCUS',
      rowFocusVal: 'FRONT-END & UI',
      rowWork: 'WORK',
      rowWorkVal: 'DIGITALCODE INTERN',
      rowWeb: 'WEB',
      idleTop: 'STUDIO // 2026',
      idleSub: 'dive into',
      idleTitle: 'ZIKRI WORK',
      idleLoc: 'MEDAN • WIB',
      idleCases: '04 CASES →',
      cases: {
        mono: { rows: ['MODULAR HOUSING', 'FRONT-END & UI', '2026'], text: '— a modular housing storefront where giant typography sits behind weathered steel architecture.' },
        gigi: { rows: ['ZERO SUGAR DRINK', 'CONVERSION UI', '2026'], text: '— a crisp white stage lit by electric lime accents, dense headlines, and instant conversion cues.' },
        compute: { rows: ['AI AGENT PLATFORM', 'DARK UI SYSTEM', '2026'], text: '— a dark-mode launchpad for distributed AI agents with live telemetry metrics and bold contrast.' },
        sweet: { rows: ['ARTISAN BAKERY', 'E-COMMERCE', '2026'], text: '— a warm cream-and-gold artisan bakery storefront led by centered classic serif typography.' }
      }
    },
    zh: {
      regionAria: 'M. Zikri Al-Bukhori 个人简介 — 工作室与作品集',
      logoAria: '返回工作室',
      laptopHitAria: '进入笔记本屏幕浏览精选作品',
      t1Home: '← 首页',
      t1Studio: '我的工作室',
      t2: '作品集',
      t3: '项目',
      t4: '联系',
      hint: '滚动进入作品',
      prevLbl: '上一个 <br>案例',
      prevAria: '上一个案例',
      nextLbl: '下一个 <br>案例',
      nextAria: '下一个案例',
      liveDemo: '在线演示 ↗',
      script: '前端与界面设计',
      cardTitle: '设计师<br>名片',
      cardRole: '前端开发 // UI 设计师',
      rowName: '姓名',
      rowFocus: '方向',
      rowFocusVal: '前端与 UI 设计',
      rowWork: '实习',
      rowWorkVal: 'DIGITALCODE 实习',
      rowWeb: '网站',
      idleTop: '工作室 // 2026',
      idleSub: '探索',
      idleTitle: 'ZIKRI 作品',
      idleLoc: '棉兰 • WIB',
      idleCases: '04 个案例 →',
      cases: {
        mono: { rows: ['模块化住宅', '前端与界面', '2026'], text: '— 模块化住宅落地页，超大字号品牌标题掩映于水畔耐候钢建筑之后。' },
        gigi: { rows: ['零糖能量饮品', '高转化界面', '2026'], text: '— 纯白极简舞台搭配荧光青柠点缀，紧凑粗标题与直截了当的转化路径。' },
        compute: { rows: ['AI 智能体平台', '暗色界面系统', '2026'], text: '— 面向分布式 AI 智能体平台的深色首页，配备实时性能指标与高对比度按钮。' },
        sweet: { rows: ['手作烘焙工坊', '电商目录', '2026'], text: '— 奶油与金色交织的手作蛋糕工坊页面，居中经典衬线体聚焦产品系列。' }
      }
    },
    es: {
      regionAria: 'Perfil de M. Zikri Al-Bukhori — Estudio y Portafolio',
      logoAria: 'Volver al estudio',
      laptopHitAria: 'Entrar a la pantalla del portátil para ver los proyectos',
      t1Home: '← inicio',
      t1Studio: 'mi estudio',
      t2: 'portafolio',
      t3: 'proyectos',
      t4: 'contacto',
      hint: 'desliza hacia la obra',
      prevLbl: 'caso <br>anterior',
      prevAria: 'Caso anterior',
      nextLbl: 'siguiente <br>caso',
      nextAria: 'Siguiente caso',
      liveDemo: 'Demo en vivo ↗',
      script: 'front-end y ui',
      cardTitle: 'TARJETA<br>DE DISEÑO',
      cardRole: 'FRONT-END // DISEÑADOR UI',
      rowName: 'NOMBRE',
      rowFocus: 'ENFOQUE',
      rowFocusVal: 'FRONT-END Y UI',
      rowWork: 'PRÁCTICA',
      rowWorkVal: 'DIGITALCODE',
      rowWeb: 'WEB',
      idleTop: 'ESTUDIO // 2026',
      idleSub: 'explora',
      idleTitle: 'OBRA ZIKRI',
      idleLoc: 'MEDAN • WIB',
      idleCases: '04 CASOS →',
      cases: {
        mono: { rows: ['VIVIENDA MODULAR', 'FRONT-END Y UI', '2026'], text: '— página de vivienda modular donde una tipografía monumental se superpone a la arquitectura de acero.' },
        gigi: { rows: ['BEBIDA SIN AZÚCAR', 'UI DE CONVERSIÓN', '2026'], text: '— escenario blanco limpio con acentos lima neón, titulares densos y conversión inmediata.' },
        compute: { rows: ['PLATAFORMA DE IA', 'SISTEMA UI OSCURO', '2026'], text: '— portada en modo oscuro para agentes de IA distribuidos con métricas en tiempo real.' },
        sweet: { rows: ['PASTELERÍA ARTESANAL', 'COMERCIO EN LÍNEA', '2026'], text: '— escaparate artesanal en tonos crema y oro guiado por una serifa clásica centrada.' }
      }
    },
    ar: {
      regionAria: 'ملف M. Zikri Al-Bukhori — الاستوديو ومعرض الأعمال',
      logoAria: 'العودة إلى الاستوديو',
      laptopHitAria: 'ادخل إلى شاشة الحاسوب لاستعراض المشاريع',
      t1Home: 'الرئيسية ←',
      t1Studio: 'استوديوي',
      t2: 'الأعمال',
      t3: 'المشاريع',
      t4: 'تواصل',
      hint: 'مرّر لاستكشاف الأعمال',
      prevLbl: 'المشروع <br>السابق',
      prevAria: 'المشروع السابق',
      nextLbl: 'المشروع <br>التالي',
      nextAria: 'المشروع التالي',
      liveDemo: 'معاينة مباشرة ↗',
      script: 'واجهات أمامية وتصميم',
      cardTitle: 'بطاقة<br>المصمم',
      cardRole: 'واجهات أمامية // مصمم UI',
      rowName: 'الاسم',
      rowFocus: 'التخصص',
      rowFocusVal: 'واجهات أمامية وUI',
      rowWork: 'التدريب',
      rowWorkVal: 'تدريب DIGITALCODE',
      rowWeb: 'الموقع',
      idleTop: 'الاستوديو // 2026',
      idleSub: 'اكتشف',
      idleTitle: 'أعمال زكري',
      idleLoc: 'ميدان • WIB',
      idleCases: '04 مشاريع ←',
      cases: {
        mono: { rows: ['مساكن معيارية', 'واجهات أمامية وUI', '2026'], text: '— صفحة هبوط لمساكن معيارية تجمع بين طباعة ضخمة وعمارة فولاذية على ضفة الماء.' },
        gigi: { rows: ['مشروب بلا سكر', 'تصميم تحويل', '2026'], text: '— مسرح أبيض نقي بلمسات ليمونية مضيئة وعناوين جريئة ومسار تحويل فوري.' },
        compute: { rows: ['منصة وكلاء ذكاء', 'نظام واجهة داكن', '2026'], text: '— واجهة داكنة لمنصة وكلاء ذكاء اصطناعي موزّعين مع مؤشرات أداء لحظية.' },
        sweet: { rows: ['مخبز حرفي', 'متجر إلكتروني', '2026'], text: '— واجهة متجر حلويات حرفية بدرجات الكريمي والذهبي مع عنوان كلاسيكي متوسّط.' }
      }
    },
    fr: {
      regionAria: 'Profil de M. Zikri Al-Bukhori — Studio et Portfolio',
      logoAria: 'Retour au studio',
      laptopHitAria: 'Plonger dans l’écran du portable pour voir les projets',
      t1Home: '← accueil',
      t1Studio: 'mon studio',
      t2: 'portfolio',
      t3: 'projets',
      t4: 'contact',
      hint: 'défiler dans les œuvres',
      prevLbl: 'projet <br>précédent',
      prevAria: 'Projet précédent',
      nextLbl: 'projet <br>suivant',
      nextAria: 'Projet suivant',
      liveDemo: 'Démo en ligne ↗',
      script: 'front-end & ui',
      cardTitle: 'CARTE<br>DESIGNER',
      cardRole: 'FRONT-END // DESIGNER UI',
      rowName: 'NOM',
      rowFocus: 'FOCUS',
      rowFocusVal: 'FRONT-END & UI',
      rowWork: 'STAGE',
      rowWorkVal: 'DIGITALCODE',
      rowWeb: 'WEB',
      idleTop: 'STUDIO // 2026',
      idleSub: 'plonger dans',
      idleTitle: 'TRAVAUX ZIKRI',
      idleLoc: 'MEDAN • WIB',
      idleCases: '04 PROJETS →',
      cases: {
        mono: { rows: ['HABITAT MODULAIRE', 'FRONT-END & UI', '2026'], text: '— page d’habitat modulaire où une typographie monumentale s’efface derrière l’architecture d’acier.' },
        gigi: { rows: ['BOISSON ZÉRO SUCRE', 'UI DE CONVERSION', '2026'], text: '— scène blanche éclatante aux accents vert citron néon, titres denses et conversion immédiate.' },
        compute: { rows: ['PLATEFORME AGENTS IA', 'SYSTÈME UI SOMBRE', '2026'], text: '— page sombre pour agents IA distribués avec métriques temps réel et contraste affirmé.' },
        sweet: { rows: ['PÂTISSERIE ARTISANALE', 'E-COMMERCE', '2026'], text: '— vitrine de pâtisserie artisanale crème et or portée par une typographie serif centrée.' }
      }
    },
    ja: {
      regionAria: 'M. Zikri Al-Bukhori プロフィール — スタジオ＆ポートフォリオ',
      logoAria: 'スタジオに戻る',
      laptopHitAria: 'ノートPC画面に入って作品を見る',
      t1Home: '← ホーム',
      t1Studio: 'スタジオ',
      t2: 'ポートフォリオ',
      t3: 'プロジェクト',
      t4: '連絡先',
      hint: 'スクロールして作品へ',
      prevLbl: '前の <br>事例',
      prevAria: '前の事例',
      nextLbl: '次の <br>事例',
      nextAria: '次の事例',
      liveDemo: 'サイトを見る ↗',
      script: 'フロントエンド & UI',
      cardTitle: 'デザイナー<br>カード',
      cardRole: 'フロントエンド // UIデザイナー',
      rowName: '氏名',
      rowFocus: '専門',
      rowFocusVal: 'フロントエンド & UI',
      rowWork: '実習先',
      rowWorkVal: 'DIGITALCODE 実習',
      rowWeb: 'サイト',
      idleTop: 'スタジオ // 2026',
      idleSub: '作品の世界へ',
      idleTitle: 'ZIKRI WORKS',
      idleLoc: 'メダン • WIB',
      idleCases: '04 事例 →',
      cases: {
        mono: { rows: ['モジュラー住宅', 'フロントエンド & UI', '2026'], text: '— 水辺の鋼鉄建築の背後に巨大なタイポグラフィを重ねたモジュラー住宅のランディングページ。' },
        gigi: { rows: ['無糖エナジードリンク', 'コンバージョンUI', '2026'], text: '— 澄んだ白背景にネオンライムが映える、力強い見出しと明快な購入導線のステージ。' },
        compute: { rows: ['AIエージェント基盤', 'ダークUIシステム', '2026'], text: '— 分散AIエージェント基盤向けのダークモード画面。リアルタイム指標と高コントラストなCTA。' },
        sweet: { rows: ['アルチザン洋菓子店', 'ECカタログ', '2026'], text: '— クリームとゴールドの温かな洋菓子店サイト。中央のクラシックなセリフ体が視線を集めます。' }
      }
    },
    ko: {
      regionAria: 'M. Zikri Al-Bukhori 프로필 — 스튜디오 & 포트폴리오',
      logoAria: '스튜디오로 돌아가기',
      laptopHitAria: '노트북 화면으로 들어가 작품 보기',
      t1Home: '← 홈',
      t1Studio: '내 스튜디오',
      t2: '포트폴리오',
      t3: '프로젝트',
      t4: '연락처',
      hint: '스크롤하여 작품 보기',
      prevLbl: '이전 <br>사례',
      prevAria: '이전 사례',
      nextLbl: '다음 <br>사례',
      nextAria: '다음 사례',
      liveDemo: '사이트 보기 ↗',
      script: '프론트엔드 & UI',
      cardTitle: '디자이너<br>카드',
      cardRole: '프론트엔드 // UI 디자이너',
      rowName: '이름',
      rowFocus: '분야',
      rowFocusVal: '프론트엔드 & UI',
      rowWork: '실습',
      rowWorkVal: 'DIGITALCODE 실습',
      rowWeb: '웹',
      idleTop: '스튜디오 // 2026',
      idleSub: '작품 속으로',
      idleTitle: '지크리 작업물',
      idleLoc: '메단 • WIB',
      idleCases: '04 사례 →',
      cases: {
        mono: { rows: ['모듈러 하우징', '프론트엔드 & UI', '2026'], text: '— 물가의 강철 건축물 뒤로 거대한 타이포그래피를 배치한 모듈러 주택 랜딩 페이지.' },
        gigi: { rows: ['제로 슈거 음료', '전환 중심 UI', '2026'], text: '— 깨끗한 흰 무대 위에 네온 라임 포인트, 묵직한 제목, 즉각적인 전환 동선을 담았습니다.' },
        compute: { rows: ['AI 에이전트 플랫폼', '다크 UI 시스템', '2026'], text: '— 분산 AI 에이전트 플랫폼을 위한 다크 모드 첫 화면과 실시간 성능 지표.' },
        sweet: { rows: ['아티잔 베이커리', '이커머스', '2026'], text: '— 크림과 골드 톤의 아티잔 케이크 숍 카탈로그와 중앙의 클래식 세리프 타이틀.' }
      }
    }
  };

  function getMdLang() {
    var l = (window.ZK && window.ZK.lang) || 'id';
    return MD_I18N[l] ? l : 'id';
  }
  function getMdCopy() {
    return MD_I18N[getMdLang()] || MD_I18N.id;
  }

  Z.registerPage(2, function mountMeDive(pg, pgb) {
    var root = pgb.querySelector('.me-dive');
    if (!root) return function () {};

    var RM = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    var stage = root.querySelector('.md-stage');
    var frame = root.querySelector('.md-frame');
    var plate = root.querySelector('.md-plate');
    var wm = root.querySelector('.md-wm');
    var cutWrap = root.querySelector('.md-cut-wrap');
    var cutImg = root.querySelector('.md-cut');
    var scriptEl = root.querySelector('.md-script');
    var badge = root.querySelector('.md-badge');
    var badgeHit = root.querySelector('.md-hit');
    var laptopRig = root.querySelector('.md-laptop-rig');
    var laptopHeroHit = root.querySelector('.md-laptop-hero-hit');
    var transVid = root.querySelector('.md-trans');
    var transRevVid = root.querySelector('.md-trans-rev');
    var casePlate = root.querySelector('.md-caseplate');
    var screen = root.querySelector('.md-screen');
    var flash = root.querySelector('.md-flash');
    var slides = [].slice.call(root.querySelectorAll('.md-slide'));

    // UI elements
    var tags = [].slice.call(root.querySelectorAll('.md-tag'));
    var t1 = root.querySelector('.md-tag.t1');
    var t2 = root.querySelector('.md-tag.t2');
    var t3 = root.querySelector('.md-tag.t3');
    var t4 = root.querySelector('.md-tag.t4');
    var logo = root.querySelector('.md-logo');
    var hint = root.querySelector('.md-hint');
    var ticket = root.querySelector('.md-ticket');
    var ticketH2 = ticket ? ticket.querySelector('h2') : null;
    var ticketRows = ticket ? [].slice.call(ticket.querySelectorAll('.md-rows div')) : [];
    var desc = root.querySelector('.md-desc');
    var descK = desc ? desc.querySelector('.md-k') : null;
    var descP = desc ? desc.querySelector('p') : null;
    var descNum = desc ? desc.querySelector('.md-num') : null;
    var descLive = desc ? desc.querySelector('.md-desc-live') : null;
    var descKids = desc ? [].slice.call(desc.children) : [];
    var prevBtn = root.querySelector('.md-nav-case.prev');
    var nextBtn = root.querySelector('.md-nav-case.next');

    // Mobile clones
    var mWm = root.querySelector('.md-m-wm');
    var mScript = root.querySelector('.md-m-script');
    var mBadgeBox = root.querySelector('.md-m-badge');
    var mBadge = null;

    if (mBadgeBox && badge && !mBadgeBox.firstElementChild) {
      mBadge = badge.cloneNode(true);
      mBadge.classList.remove('md-pre');
      mBadge.style.left = '';
      mBadge.style.top = '';
      // Rewrite SVG defs IDs so mobile clone never references display:none desktop defs
      var mSvg = mBadge.querySelector('.md-badge-art');
      if (mSvg) {
        mSvg.innerHTML = mSvg.innerHTML
          .replace(/id="(md[A-Za-z0-9]+)"/g, 'id="$1M"')
          .replace(/url\(#(md[A-Za-z0-9]+)\)/g, 'url(#$1M)');
      }
      mBadgeBox.appendChild(mBadge);
    }

    var alive = true;
    var mode = 'hero';
    var curIdx = 0;
    var busy = false;
    var exiting = false;
    var wheelLock = false;
    var transReady = false;
    var transRevReady = false;
    var swayAnims = [];
    var activeAnims = [];
    var timers = [];
    var rafIds = [];
    var cleanups = [];

    function later(fn, ms) {
      var id = setTimeout(function () {
        if (!alive) return;
        fn();
      }, RM ? 0 : ms);
      timers.push(id);
      return id;
    }

    function wait(ms) {
      if (RM || ms <= 0) return Promise.resolve();
      return new Promise(function (res) { later(res, ms); });
    }

    function anim(el, kf, opts) {
      if (!el || !el.animate) return null;
      var o = Object.assign({ easing: 'cubic-bezier(.2,.8,.2,1)', fill: 'both' }, opts || {});
      if (RM) {
        o.duration = 0;
        o.delay = 0;
      }
      var a = el.animate(kf, o);
      activeAnims.push(a);
      return a;
    }

    function setBusy(on) {
      busy = on;
      root.classList.toggle('is-busy', on);
    }

    // Apply custom photographic & video assets from ME_DIVE_CONFIG
    var hasCustomAssets = !!(ME_DIVE_CONFIG.customPlate && ME_DIVE_CONFIG.customCasePlate);
    if (hasCustomAssets) {
      root.classList.add('has-custom-assets');
    }
    if (ME_DIVE_CONFIG.customPlate && plate) {
      plate.src = ME_DIVE_CONFIG.customPlate;
    } else if (plate) {
      plate.src = ME_DIVE_CONFIG.studioPlate;
    }
    if (ME_DIVE_CONFIG.customCut && cutImg && cutWrap) {
      cutImg.src = ME_DIVE_CONFIG.customCut;
      cutWrap.classList.add('is-custom-plate');
    } else if (cutImg) {
      cutImg.src = ME_DIVE_CONFIG.cutout;
    }
    if (ME_DIVE_CONFIG.customCasePlate && casePlate) {
      casePlate.src = ME_DIVE_CONFIG.customCasePlate;
      frame.classList.add('has-custom-caseplate');
    }
    if (ME_DIVE_CONFIG.customBadge && badge) {
      var bImg = badge.querySelector('.md-badge-img');
      if (bImg) bImg.src = ME_DIVE_CONFIG.customBadge;
      badge.classList.add('has-custom-badge');
      if (mBadge) {
        var mbImg = mBadge.querySelector('.md-badge-img');
        if (mbImg) mbImg.src = ME_DIVE_CONFIG.customBadge;
        mBadge.classList.add('has-custom-badge');
      }
    }
    // Set badge photo portrait
    [].forEach.call(root.querySelectorAll('.md-ph'), function (ph) {
      ph.style.backgroundImage = 'url("' + ME_DIVE_CONFIG.badgePhoto + '")';
    });

    // Preload forward & reverse transition clips into cached Blobs
    if (ME_DIVE_CONFIG.transVideo && transVid) {
      var markReady = function () { transReady = true; };
      bind(transVid, 'loadeddata', markReady);
      bind(transVid, 'canplay', markReady);
      getCachedBlobUrl(ME_DIVE_CONFIG.transVideo).then(function (bUrl) {
        if (!alive) return;
        transVid.src = bUrl || ME_DIVE_CONFIG.transVideo;
        transVid.load();
      });
    }
    if (ME_DIVE_CONFIG.transRevVideo && transRevVid) {
      var markRevReady = function () { transRevReady = true; };
      bind(transRevVid, 'loadeddata', markRevReady);
      bind(transRevVid, 'canplay', markRevReady);
      getCachedBlobUrl(ME_DIVE_CONFIG.transRevVideo).then(function (bUrl) {
        if (!alive) return;
        transRevVid.src = bUrl || ME_DIVE_CONFIG.transRevVideo;
        transRevVid.load();
      });
    }

    // Set all UI & designer card labels across all 8 languages
    function syncLabels() {
      var lang = getMdLang();
      var c = getMdCopy();
      var dir = lang === 'ar' ? 'rtl' : 'ltr';
      root.setAttribute('aria-label', c.regionAria);
      if (t1) t1.textContent = mode === 'case' ? c.t1Studio : c.t1Home;
      if (t2) t2.textContent = c.t2;
      if (t3) t3.textContent = c.t3;
      if (t4) t4.textContent = c.t4;
      if (logo) logo.setAttribute('aria-label', c.logoAria);
      if (laptopHeroHit) laptopHeroHit.setAttribute('aria-label', c.laptopHitAria);
      if (scriptEl) scriptEl.textContent = c.script;
      if (mScript) mScript.textContent = c.script;
      var hintSpan = hint && hint.querySelector('span');
      if (hintSpan) hintSpan.textContent = c.hint;
      if (prevBtn) {
        prevBtn.setAttribute('aria-label', c.prevAria);
        var pl = prevBtn.querySelector('.md-lbl');
        if (pl) pl.innerHTML = c.prevLbl;
      }
      if (nextBtn) {
        nextBtn.setAttribute('aria-label', c.nextAria);
        var nl = nextBtn.querySelector('.md-lbl');
        if (nl) nl.innerHTML = c.nextLbl;
      }
      // Sync designer lanyard cards (desktop + mobile clone)
      [].forEach.call(root.querySelectorAll('.md-card'), function (cardEl) {
        cardEl.setAttribute('dir', dir);
        var h4 = cardEl.querySelector('h4');
        if (h4) h4.innerHTML = c.cardTitle;
        var roleEl = cardEl.querySelector('.md-role');
        if (roleEl) roleEl.textContent = c.cardRole;
        var rows = cardEl.querySelectorAll('.md-row');
        if (rows[0]) { var s0 = rows[0].querySelector('span'); if (s0) s0.textContent = c.rowName; }
        if (rows[1]) {
          var s1 = rows[1].querySelector('span'), b1 = rows[1].querySelector('b');
          if (s1) s1.textContent = c.rowFocus;
          if (b1) b1.textContent = c.rowFocusVal;
        }
        if (rows[2]) {
          var s2 = rows[2].querySelector('span'), b2 = rows[2].querySelector('b');
          if (s2) s2.textContent = c.rowWork;
          if (b2) b2.textContent = c.rowWorkVal;
        }
        if (rows[3]) { var s3 = rows[3].querySelector('span'); if (s3) s3.textContent = c.rowWeb; }
      });
      // Sync laptop idle screen & reel Live Demo links
      var idleTop = root.querySelector('.md-idle-top span');
      if (idleTop) idleTop.textContent = c.idleTop;
      var idleMid = root.querySelector('.md-idle-mid');
      if (idleMid) idleMid.innerHTML = '<span>' + c.idleSub + '</span>' + c.idleTitle;
      var idleFootSpans = root.querySelectorAll('.md-idle-foot span');
      if (idleFootSpans[0]) idleFootSpans[0].textContent = c.idleLoc;
      if (idleFootSpans[1]) idleFootSpans[1].textContent = c.idleCases;
      [].forEach.call(root.querySelectorAll('.md-reel-live'), function (a) {
        a.textContent = c.liveDemo;
      });
      if (descLive) descLive.textContent = c.liveDemo;
      if (ticket) ticket.setAttribute('dir', dir);
      if (desc) desc.setAttribute('dir', dir);
      fillCase(curIdx);
    }

    /* ======================================================================
       §7. Precision 3-Tier Responsive Frame Fitting:
       - 'portrait'      (phones & portrait tablets: 320x568 .. 820x1180)
       - 'compact-land'  (landscape phones & narrow split-screen: 667x375, 900x700)
       - 'desktop'       (landscape tablets, laptops, monitors, ultrawide)
       ====================================================================== */
    var lastLayoutMode = '';

    function getLayoutMode() {
      var W = window.innerWidth || 1440;
      var H = window.innerHeight || 900;
      if ((W <= 820 && H > W * 0.92) || W <= 520) return 'portrait';
      if (W < 960 || H < 560) return 'compact-land';
      return 'desktop';
    }

    function isPortrait() {
      return getLayoutMode() === 'portrait';
    }

    function computePortraitMetrics(W, H) {
      var wide = W >= 560;
      var navBottom = wide ? 56 : 84;
      var bottomSafe = wide ? 60 : 54;
      var usableH = Math.max(260, H - navBottom - bottomSafe);

      // Dedicated Header Typography Band (strictly ABOVE Zikri's head!)
      var wmW = Math.min(W * 0.92, wide ? 660 : 420);
      var wmH = wmW * (310 / 1440);
      // Cap wordmark height on very short portrait phones so Zikri always has >= 60% vertical space
      var maxWmH = usableH * (wide ? 0.165 : 0.145);
      if (wmH > maxWmH) {
        wmH = maxWmH;
        wmW = wmH * (1440 / 310);
      }

      var wmTop = navBottom + Math.max(6, Math.min(20, usableH * 0.02));
      var scriptFs = Math.max(26, Math.min(wide ? 62 : 44, wmW * 0.115));
      var scriptTop = wmTop + wmH * 0.54;
      var scriptLeft = Math.max(14, (W - wmW) * 0.5 + wmW * 0.03);
      var headerBottom = Math.max(wmTop + wmH, scriptTop + scriptFs * 0.96);

      // Lanyard badge sized so its card hangs cleanly inside header band without hitting Zikri's head/laptop
      var badgeBottomTarget = headerBottom + (wide ? 24 : 10);
      var mbwFromH = (badgeBottomTarget + 8) * (582 / 952);
      var mbw = Math.max(84, Math.min(wide ? 156 : 122, W * (wide ? 0.22 : 0.28), mbwFromH));

      return {
        wide: wide,
        navBottom: navBottom,
        bottomSafe: bottomSafe,
        wmW: wmW,
        wmH: wmH,
        wmTop: wmTop,
        scriptFs: scriptFs,
        scriptTop: scriptTop,
        scriptLeft: scriptLeft,
        headerBottom: headerBottom,
        mbw: mbw
      };
    }

    function applyLayoutClasses(lm, W) {
      var isP = lm === 'portrait';
      var isPW = isP && W >= 560;
      root.classList.toggle('md-portrait', isP);
      root.classList.toggle('md-portrait-wide', isPW);
      root.classList.toggle('md-compact-land', lm === 'compact-land');
      root.classList.toggle('md-desktop', lm === 'desktop');
    }

    function updateViewportVars(lm) {
      var W = window.innerWidth || 1440;
      var H = window.innerHeight || 900;
      var layout = lm || getLayoutMode();
      var n = layout === 'portrait' ? (W / 430) : Math.min(W / 1440, H / 900);
      root.style.setProperty('--n', n.toFixed(4) + 'px');

      if (layout === 'portrait') {
        var pm = computePortraitMetrics(W, H);
        root.style.setProperty('--mwm-w', pm.wmW.toFixed(1) + 'px');
        root.style.setProperty('--mwm-top', pm.wmTop.toFixed(1) + 'px');
        root.style.setProperty('--mscr-top', pm.scriptTop.toFixed(1) + 'px');
        root.style.setProperty('--mscr-fs', pm.scriptFs.toFixed(1) + 'px');
        root.style.setProperty('--mscr-left', pm.scriptLeft.toFixed(1) + 'px');
        root.style.setProperty('--mbw', pm.mbw.toFixed(1) + 'px');
        root.style.setProperty('--mbs', (pm.mbw / 582).toFixed(4));
        if (ticket) {
          var th = ticket.offsetHeight || 140;
          root.style.setProperty('--th', th + 'px');
        }
      }
    }

    function settleAfterLayoutSwitch() {
      if (root.getAttribute('data-in') !== '1' || busy) return;
      [wm, mWm, scriptEl, mScript, badge, mBadge, hint].forEach(function (el) {
        if (!el) return;
        clearAnims(el);
        el.classList.remove('md-pre');
      });
      tags.forEach(function (tag) {
        clearAnims(tag);
        tag.classList.remove('md-pre');
        tag.style.opacity = '1';
        tag.style.transform = '';
      });
      if (mode === 'hero') {
        [wm, mWm].forEach(function (el) {
          if (!el) return;
          el.style.opacity = '1';
          el.style.transform = '';
          el.style.clipPath = '';
        });
        [scriptEl, mScript].forEach(function (el) {
          if (!el) return;
          el.style.opacity = '1';
          el.style.transform = '';
          el.style.clipPath = '';
        });
        [badge, mBadge].forEach(function (el) {
          if (!el) return;
          el.style.opacity = '1';
          el.style.transform = '';
        });
        if (hint) {
          hint.style.opacity = '0.92';
          hint.style.transform = '';
        }
        startSway();
      } else {
        [wm, mWm, scriptEl, mScript, badge, mBadge].forEach(function (el) {
          if (!el) return;
          el.style.opacity = '0';
        });
        if (ticket) {
          clearAnims(ticket);
          ticket.style.opacity = '1';
          ticket.style.transform = '';
        }
        descKids.forEach(function (kid) {
          clearAnims(kid);
          kid.style.opacity = '1';
          kid.style.transform = '';
        });
      }
    }

    function pose(m, lm) {
      var W = window.innerWidth || 1440;
      var H = window.innerHeight || 900;
      var layout = lm || getLayoutMode();

      // 1. Desktop & Compact Landscape
      if (layout !== 'portrait') {
        var u = Math.min(W / 1440, H / 900);
        if (m === 'hero') {
          // NEVER exceed H / 810 so Zikri's head (y=9.5) and shoes (y=798.1) NEVER get cropped
          // on short laptops (1280x650), ultrawide monitors (2560x1080), or landscape phones (667x375)!
          var sHero = Math.min(H / 810, W / 780);
          var xHero = (W - 1440 * sHero) / 2;
          var yHero = H - 810 * sHero;
          return { s: sHero, x: xHero, y: yHero };
        }

        // Case Mode: MacBook inside custom 16:9 case-plate (1440x810 units):
        // lidTop=208, base+reflectionBot=682 (h=474), baseW=740 (centered x=718)
        if (hasCustomAssets) {
          var isCL = layout === 'compact-land';
          var topC = isCL ? 44 : Math.max(62, 76 * u);
          var botC = isCL ? 14 : Math.max(24, 34 * u);
          var availHC = Math.max(170, H - topC - botC);
          var leftRes, rightRes;
          if (isCL) {
            leftRes = Math.max(136, Math.min(188, W * 0.215));
            rightRes = Math.max(158, Math.min(238, W * 0.245));
          } else {
            leftRes = Math.max(178, 212 * u);
            rightRes = Math.max(182, 224 * u);
          }
          var availWC = Math.max(220, W - leftRes - rightRes);
          var fitH = availHC / 474;
          var fitW = availWC / 740;
          var scD = Math.min(fitH, fitW);
          var lapHD = 474 * scD;
          var yD = topC + (availHC - lapHD) * 0.5 - 208 * scD;
          var centerX = isCL ? (leftRes + availWC * 0.5) : (W * 0.5);
          return { s: scD, x: centerX - 718 * scD, y: yD };
        }
        var top = 66 * u;
        var fit = (H - top - 28 * u) / (762 - 79);
        var cover = Math.max(W / 1440, H / 810);
        var s, y;
        if (fit >= cover) {
          s = cover;
          y = Math.min(0, Math.max(H - 810 * s, top - 79 * s));
        } else {
          s = fit;
          y = top - 79 * fit;
        }
        return { s: s, x: (W - 1440 * s) / 2, y: y };
      }

      // 2. Portrait (Phones & Portrait Tablets)
      if (m === 'hero') {
        var pm = computePortraitMetrics(W, H);
        // Subject bounds in 1440x810 frame: head top = 9.5, shoes bottom = 798.1 (height = 788.6), width = 315 (cx = 746)
        var subjTopLimit = pm.headerBottom + (pm.wide ? 12 : 8);
        var subjBotLimit = H - pm.bottomSafe;
        var subjAvailH = Math.max(220, subjBotLimit - subjTopLimit);
        var smH = subjAvailH / 788.6;
        var smW = (W * 0.88) / 345;
        var sm = hasCustomAssets ? Math.min(smH, smW) : Math.min(W / 650, (0.62 * H) / 810);
        var cx = hasCustomAssets ? 746 : (ME_DIVE_CONFIG.mobileHeroCenterX || 720);
        // Anchor shoes cleanly at subjBotLimit (strictly ABOVE "SCROLL KE DALAM KARYA" pill!)
        var anchorY = hasCustomAssets ? (subjBotLimit - 798.1 * sm) : (H - 790 * sm);
        return { s: sm, x: W / 2 - cx * sm, y: anchorY };
      }

      // Portrait Case Mode: measure LIVE ticket & desc bottom so laptop NEVER overlaps text or bottom nav
      var navH = 68;
      var ticketTop = W >= 560 ? 64 : 52;
      var th = (ticket && ticket.offsetHeight) || 140;
      var dh = (desc && desc.offsetHeight) || 92;
      var gap = W >= 560 ? 16 : 12;
      var uiBottom = ticketTop + th + gap + dh + 12;
      if (desc) {
        var db = desc.getBoundingClientRect();
        if (db.height > 20 && db.bottom > ticketTop + th) {
          uiBottom = Math.max(uiBottom, db.bottom + 12);
        }
      }
      var availH = Math.max(150, H - navH - uiBottom);
      if (hasCustomAssets) {
        var scM = Math.min((W - 18) / 748, availH / 474);
        var lapHM = 474 * scM;
        var yM = uiBottom + (availH - lapHM) * 0.5 - 208 * scM;
        return { s: scM, x: W / 2 - 718 * scM, y: yM };
      }
      var sc = Math.min((W - 22) / 1072, Math.max(0.2, availH / (762 - 80)));
      var lapH = (762 - 80) * sc;
      var yC = uiBottom + (availH - lapH) * 0.54 - 80 * sc;
      return { s: sc, x: W / 2 - 720 * sc, y: yC };
    }

    function fitHero(p, lm) {
      if ((lm || getLayoutMode()) === 'portrait') return;
      var W = window.innerWidth || 1440;
      var H = window.innerHeight || 900;
      var s = p.s, x = p.x, y = p.y;

      // Raw visible horizontal bounds in 1440x810 frame space
      var vlRaw = -x / s;
      var vrRaw = (W - x) / s;
      // Clamp horizontal composition width on ultrawide monitors (e.g. 2560x1080) for museum balance
      var compW = Math.min(W / s, 1620);
      var vl = Math.max(vlRaw, 720 - compW / 2);
      var vr = Math.min(vrRaw, 720 + compW / 2);
      var pad = Math.max(16, 20 / s);

      if (wm) {
        wm.style.left = (vl + 0.6 * pad).toFixed(2) + 'px';
        wm.style.width = Math.max(400, vr - vl - 1.2 * pad).toFixed(2) + 'px';
      }

      // Fit handwritten "front-end & ui" strictly to the LEFT of Zikri's shoulder (x = 592.6)
      if (scriptEl) {
        var leftEdge = vl + pad + 10;
        var maxRight = 576;
        var leftClear = Math.max(180, maxRight - leftEdge);
        var scriptFs = Math.min(82, Math.max(42, leftClear * 0.185));
        var estW = scriptFs * 5.15;
        var sLeft = leftEdge + Math.max(0, (leftClear - estW) * 0.35);
        scriptEl.style.fontSize = scriptFs.toFixed(1) + 'px';
        scriptEl.style.left = sLeft.toFixed(2) + 'px';
        scriptEl.style.top = (148 + (82 - scriptFs) * 0.45).toFixed(1) + 'px';
      }

      // Fit Lanyard ID Badge strictly to the RIGHT of Zikri's laptop (x = 907.5) & inside right/bottom edges
      if (badge) {
        var vb = Math.min(810, (H - y) / s);
        var minSleeveL = 930; // 22.5 frame-units clear of laptop right edge (907.5)
        var maxSleeveR = vr - pad;
        var rightClear = Math.max(180, maxSleeveR - minSleeveL);
        var bs = Math.min(1, Math.max(0.68, rightClear / 292));
        root.style.setProperty('--dbs', bs.toFixed(4));

        // With transform-origin (288, 0) and scale(bs):
        // sleeve local x is [152, 430] -> visual offset from bLeft is [288 - 136*bs, 288 + 142*bs]
        // sleeve local y is [468, 952] -> visual offset from bTop is [468*bs, 952*bs]
        var sleeveRightOffset = 288 + 142 * bs;
        var sleeveLeftOffset = 288 - 136 * bs;
        var targetSleeveR = Math.min(maxSleeveR, Math.max(minSleeveL + 278 * bs, maxSleeveR - (rightClear - 278 * bs) * 0.12));
        var bLeft = targetSleeveR - sleeveRightOffset;
        if (bLeft + sleeveLeftOffset < minSleeveL) {
          bLeft = minSleeveL - sleeveLeftOffset;
        }
        var botClear = Math.max(20, 26 / s);
        var bTop = Math.min(-150 * bs, vb - botClear - 952 * bs);
        badge.style.left = bLeft.toFixed(2) + 'px';
        badge.style.top = bTop.toFixed(2) + 'px';
      }
    }

    function place(m) {
      var W = window.innerWidth || 1440;
      var lm = getLayoutMode();
      var switched = !!(lastLayoutMode && lastLayoutMode !== lm);
      lastLayoutMode = lm;

      applyLayoutClasses(lm, W);
      updateViewportVars(lm);

      var port = lm === 'portrait';
      frame.classList.toggle('d-fade', !port);
      frame.classList.toggle('m-fade', port);

      var p = pose(m, lm);
      frame.style.transform = 'translate(' + p.x.toFixed(2) + 'px,' + p.y.toFixed(2) + 'px) scale(' + p.s.toFixed(4) + ')';

      var isC = m === 'case';
      frame.classList.toggle('m-case', isC);
      stage.classList.toggle('m-case', isC);
      // Seamlessly feather left & right plate wings when frame is narrower than viewport on wide/short screens
      frame.classList.toggle('has-side-fade', !port && !isC && (1440 * p.s < W - 2));

      if (m === 'hero') fitHero(p, lm);
      updateViewportVars(lm);

      if (switched) {
        settleAfterLayoutSwitch();
      }
    }

    /* ======================================================================
       Badge Idle Sway & Additive Hover Swing (§8)
       ====================================================================== */
    function stopSway() {
      swayAnims.forEach(function (a) { try { a.cancel(); } catch (_) {} });
      swayAnims.length = 0;
    }

    function startSway() {
      if (RM) return;
      stopSway();
      [badge, mBadge].forEach(function (el) {
        if (!el || !el.animate) return;
        var a = el.animate(
          [{ transform: 'rotate(-1.1deg)' }, { transform: 'rotate(1.1deg)' }],
          { duration: 3200, iterations: Infinity, direction: 'alternate', easing: 'ease-in-out' }
        );
        swayAnims.push(a);
      });
    }

    function swingBadge() {
      if (RM || mode !== 'hero' || busy || !badge || !badge.animate) return;
      badge.animate(
        [
          { transform: 'rotate(0deg)' },
          { transform: 'rotate(-6deg)', offset: 0.24 },
          { transform: 'rotate(4deg)', offset: 0.52 },
          { transform: 'rotate(-2deg)', offset: 0.78 },
          { transform: 'rotate(0deg)' }
        ],
        { duration: 1400, easing: 'ease-out', composite: 'add' }
      );
    }

    /* ======================================================================
       Case Data & Media Helpers (§10-11)
       ====================================================================== */
    function fillCase(i) {
      var data = ME_DIVE_CONFIG.cases[i];
      if (!data) return;
      var c = getMdCopy();
      var loc = (c.cases && c.cases[data.id]) || null;
      var rows = (loc && loc.rows) ? loc.rows : data.rows;
      if (ticketH2) ticketH2.textContent = data.title;
      ticketRows.forEach(function (row, idx) {
        row.textContent = rows[idx] || '';
      });
      if (descK) descK.textContent = data.key;
      if (descP) descP.textContent = (loc && loc.text) ? loc.text : data.textId;
      if (descNum) descNum.textContent = pad2(i + 1) + ' / ' + pad2(ME_DIVE_CONFIG.cases.length);
      if (descLive) {
        descLive.href = data.url || '#';
        descLive.textContent = c.liveDemo;
      }
      if (prevBtn) prevBtn.classList.toggle('dim', i === 0);
      if (isPortrait()) {
        updateViewportVars('portrait');
        if (mode === 'case') {
          requestAnimationFrame(function () {
            if (!alive || mode !== 'case') return;
            frame.classList.remove('glide');
            place('case');
          });
        }
      }
    }

    function pauseAllSlides() {
      slides.forEach(function (sl) {
        sl.classList.remove('is-active');
        var v = sl.querySelector('video');
        if (v) { try { v.pause(); } catch (_) {} }
      });
    }

    function playOnly(i) {
      slides.forEach(function (sl, idx) {
        var on = idx === i;
        sl.classList.toggle('is-active', on);
        var v = sl.querySelector('video');
        if (!v) return;
        if (on) {
          try { v.currentTime = 0; var pr = v.play(); if (pr && pr.catch) pr.catch(function () {}); } catch (_) {}
        } else {
          try { v.pause(); } catch (_) {}
        }
      });
    }

    function preloadCase(i) {
      var idx = (i + ME_DIVE_CONFIG.cases.length) % ME_DIVE_CONFIG.cases.length;
      var sl = slides[idx];
      if (!sl) return;
      var v = sl.querySelector('video');
      if (v && v.preload !== 'auto') { v.preload = 'auto'; try { v.load(); } catch (_) {} }
      var im = sl.querySelector('img');
      if (im && im.loading === 'lazy') im.loading = 'eager';
    }

    function runFlash(peak, dur) {
      if (!flash || RM) return;
      anim(flash, [
        { opacity: 0 },
        { opacity: peak, offset: 0.25 },
        { opacity: 0 }
      ], { duration: dur, easing: 'ease-out', fill: 'none' });
    }

    /* ======================================================================
       §8. Entrance Choreography (Once, Web Animations, Guard + Failsafe)
       ====================================================================== */
    function runEntrance() {
      if (root.getAttribute('data-in') === '1' || !alive) return;
      root.setAttribute('data-in', '1');
      root.classList.remove('md-js');

      if (RM) {
        [].forEach.call(root.querySelectorAll('.md-pre'), function (el) {
          el.classList.remove('md-pre');
          el.style.opacity = '';
        });
        return;
      }

      var port = isPortrait();

      // 4 Nav tags: springy overshoot
      tags.forEach(function (tag, i) {
        anim(tag, [
          { opacity: 0, transform: 'translateY(-40px) rotate(-4deg)' },
          { opacity: 1, transform: 'none' }
        ], { duration: 700, delay: 120 + i * 80, easing: 'cubic-bezier(.3,1.5,.5,1)' });
      });

      // Wordmark: animate active variant, snap inactive variant so resize never clips
      var activeWm = port ? mWm : wm;
      var inactiveWm = port ? wm : mWm;
      if (inactiveWm) {
        inactiveWm.classList.remove('md-pre');
        inactiveWm.style.opacity = '1';
      }
      if (activeWm) {
        anim(activeWm, [
          { opacity: 0, transform: 'translateY(60px)', clipPath: 'inset(100% 0 0 0)' },
          { opacity: 1, transform: 'translateY(0)', clipPath: 'inset(0 0 0 0)' }
        ], { duration: 1100, delay: 240 });
      }

      // Script handwriting: animate active variant, snap inactive variant
      var activeScr = port ? mScript : scriptEl;
      var inactiveScr = port ? scriptEl : mScript;
      if (inactiveScr) {
        inactiveScr.classList.remove('md-pre');
        inactiveScr.style.opacity = '1';
      }
      if (activeScr) {
        var rot = port ? 'rotate(-7deg)' : 'rotate(-8deg)';
        anim(activeScr, [
          { opacity: 0, transform: rot, clipPath: 'inset(0 100% 0 0)' },
          { opacity: 1, transform: rot, clipPath: 'inset(0 0 0 0)' }
        ], { duration: 900, delay: 980, easing: 'cubic-bezier(.5,0,.3,1)' });
      }

      // Lanyard badge: animate active variant, snap inactive variant, then start idle sway
      var activeBadge = port ? mBadge : badge;
      var inactiveBadge = port ? badge : mBadge;
      if (inactiveBadge) {
        inactiveBadge.classList.remove('md-pre');
        inactiveBadge.style.opacity = '1';
      }
      var bAnim = activeBadge ? anim(activeBadge, [
        { opacity: 0, transform: 'translateY(-120%) rotate(8deg)', offset: 0 },
        { opacity: 1, transform: 'translateY(0) rotate(-3deg)', offset: 0.6 },
        { opacity: 1, transform: 'translateY(0) rotate(1.6deg)', offset: 0.8 },
        { opacity: 1, transform: 'translateY(0) rotate(0deg)', offset: 1 }
      ], { duration: 1500, delay: 650 }) : null;
      if (bAnim && bAnim.finished) {
        bAnim.finished.then(function () {
          if (alive && mode === 'hero' && !busy) startSway();
        }).catch(function () {});
      }

      // Subject cutout & hero laptop gentle settle (skip cutout jump when pixel-aligned on plate!)
      if (cutWrap && !cutWrap.classList.contains('is-custom-plate')) {
        anim(cutWrap, [
          { opacity: 0, transform: 'translateX(-50%) translateY(34px) scale(0.98)' },
          { opacity: 1, transform: 'translateX(-50%) translateY(0) scale(1)' }
        ], { duration: 950, delay: 180 });
      } else if (cutWrap) {
        cutWrap.classList.remove('md-pre');
        cutWrap.style.opacity = '1';
      }
      if (laptopRig) {
        if (hasCustomAssets) {
          laptopRig.classList.remove('md-pre');
          laptopRig.style.opacity = '1';
        } else {
          anim(laptopRig, [
            { opacity: 0 },
            { opacity: 1 }
          ], { duration: 850, delay: 560, fill: 'forwards' });
        }
      }

      // Scroll hint
      if (hint) {
        anim(hint, [
          { opacity: 0 },
          { opacity: 0.85 }
        ], { duration: 600, delay: 1650 });
      }
    }

    /* ======================================================================
       Hero Out / Hero In Helpers
       ====================================================================== */
    function heroOut() {
      stopSway();
      var port = isPortrait();
      var easeOut = 'cubic-bezier(.5,0,.75,0)';
      var aWm = port ? mWm : wm, iWm = port ? wm : mWm;
      var aScr = port ? mScript : scriptEl, iScr = port ? scriptEl : mScript;
      var aBdg = port ? mBadge : badge, iBdg = port ? badge : mBadge;
      [iWm, iScr, iBdg].forEach(function (el) { if (el) { clearAnims(el); el.style.opacity = '0'; } });
      if (aWm) {
        anim(aWm, [
          { opacity: 1, transform: 'translateY(0)' },
          { opacity: 0, transform: 'translateY(-40px)' }
        ], { duration: 380, easing: easeOut, fill: 'forwards' });
      }
      if (aScr) {
        var rot = port ? 'rotate(-7deg)' : 'rotate(-8deg)';
        anim(aScr, [
          { opacity: 1, transform: rot },
          { opacity: 0, transform: rot + ' translateY(-18px)' }
        ], { duration: 340, easing: easeOut, fill: 'forwards' });
      }
      if (aBdg) {
        anim(aBdg, [
          { opacity: 1, transform: 'translateY(0) rotate(0deg)' },
          { opacity: 0, transform: 'translateY(-110%) rotate(-6deg)' }
        ], { duration: 380, easing: easeOut, fill: 'forwards' });
      }
    }

    function clearAnims(el) {
      if (el && el.getAnimations) {
        el.getAnimations().forEach(function (a) { try { a.cancel(); } catch (_) {} });
      }
    }

    function heroIn() {
      var port = isPortrait();
      var aWm = port ? mWm : wm, iWm = port ? wm : mWm;
      var aScr = port ? mScript : scriptEl, iScr = port ? scriptEl : mScript;
      var aBdg = port ? mBadge : badge, iBdg = port ? badge : mBadge;
      [iWm, iScr, iBdg].forEach(function (el) {
        if (!el) return;
        clearAnims(el);
        el.style.opacity = '1';
        el.style.transform = '';
        el.style.clipPath = '';
      });
      if (aWm) {
        anim(aWm, [
          { opacity: 0, transform: 'translateY(48px)', clipPath: 'inset(100% 0 0 0)' },
          { opacity: 1, transform: 'translateY(0)', clipPath: 'inset(0 0 0 0)' }
        ], { duration: 850, fill: 'forwards' });
      }
      if (aScr) {
        var rot = port ? 'rotate(-7deg)' : 'rotate(-8deg)';
        anim(aScr, [
          { opacity: 0, transform: rot, clipPath: 'inset(0 100% 0 0)' },
          { opacity: 1, transform: rot, clipPath: 'inset(0 0 0 0)' }
        ], { duration: 750, delay: 240, easing: 'cubic-bezier(.5,0,.3,1)', fill: 'forwards' });
      }
      var bAnim = aBdg ? anim(aBdg, [
        { opacity: 0, transform: 'translateY(-110%) rotate(6deg)', offset: 0 },
        { opacity: 1, transform: 'translateY(0) rotate(-2.4deg)', offset: 0.65 },
        { opacity: 1, transform: 'translateY(0) rotate(1deg)', offset: 0.84 },
        { opacity: 1, transform: 'translateY(0) rotate(0deg)', offset: 1 }
      ], { duration: 1150, delay: 110, fill: 'forwards' }) : null;
      if (bAnim && bAnim.finished) {
        bAnim.finished.then(function () {
          if (alive && mode === 'hero' && !exiting) startSway();
        }).catch(function () {});
      }
      if (hint) {
        var ht = getLayoutMode() === 'compact-land' ? '' : 'translateX(-50%) ';
        anim(hint, [
          { opacity: 0, transform: ht + 'translateY(10px)' },
          { opacity: 0.92, transform: ht + 'translateY(0)' }
        ], { duration: 520, delay: 480, fill: 'forwards' });
      }
    }

    /* ======================================================================
       Case In / Case Out Helpers (§10-11)
       ====================================================================== */
    function caseIn(i, first) {
      fillCase(i);
      if (ticket) {
        anim(ticket, [
          { opacity: 0, transform: 'translateY(-60px) rotate(-6deg)', offset: 0 },
          { opacity: 1, transform: 'translateY(6px) rotate(1.2deg)', offset: 0.7 },
          { opacity: 1, transform: 'none', offset: 1 }
        ], { duration: 800, delay: first ? 150 : 0, fill: 'forwards' });
      }
      descKids.forEach(function (kid, k) {
        anim(kid, [
          { opacity: 0, transform: 'translateY(14px)' },
          { opacity: 1, transform: 'none' }
        ], { duration: 600, delay: (first ? 250 : 80) + k * 70, fill: 'forwards' });
      });
    }

    function caseOut() {
      var ease = 'cubic-bezier(.5,0,.75,0)';
      var p1 = ticket ? anim(ticket, [
        { opacity: 1, transform: 'none' },
        { opacity: 0, transform: 'translateY(-40px) rotate(4deg)' }
      ], { duration: 380, easing: ease, fill: 'forwards' }) : null;
      descKids.forEach(function (kid, k) {
        anim(kid, [
          { opacity: 1, transform: 'none' },
          { opacity: 0, transform: 'translateY(-10px)' }
        ], { duration: 300, delay: k * 40, easing: ease, fill: 'forwards' });
      });
      return p1 && p1.finished ? p1.finished.catch(function () {}) : wait(380);
    }

    /* ======================================================================
       §9-10. Hero -> Laptop Dive (`toCase` & `arriveCase`)
       ====================================================================== */
    function playKlingClip() {
      return new Promise(function (resolve) {
        if (!transVid) { resolve(); return; }
        transVid.currentTime = 0;
        transVid.style.opacity = '1';
        requestAnimationFrame(function () {
          requestAnimationFrame(function () {
            if (plate) plate.style.visibility = 'hidden';
          });
        });
        if (cutWrap) {
          anim(cutWrap, [{ opacity: 1 }, { opacity: 0 }], { duration: 260, easing: 'ease-out', fill: 'forwards' });
        }
        var durEst = transVid.duration || 7.83;
        var glideSec = durEst > 6 ? '1.95s' : '1.6s';
        root.style.setProperty('--glide', glideSec);
        frame.classList.add('glide');
        place('case');

        var done = false;
        function finish() {
          if (done) return;
          done = true;
          try { transVid.pause(); } catch (_) {}
          if (casePlate) {
            casePlate.getAnimations && casePlate.getAnimations().forEach(function (a) { a.cancel(); });
            casePlate.style.opacity = '1';
          }
          transVid.style.opacity = '0';
          resolve();
        }
        transVid.onended = finish;
        var pr = transVid.play();
        if (pr && pr.catch) pr.catch(finish);

        // Failsafe max timeout so dive can never stall even on throttled devices
        later(finish, 3600);

        function tick() {
          if (done || !alive) return;
          var dur = transVid.duration || 7.83;
          var p = transVid.currentTime / dur;
          if (transVid.ended || p >= 0.992) { finish(); return; }
          // Scale eased speed curve proportionally to clip length (~1.9s total dive)
          var k = Math.max(1, dur / 5.04);
          var rate = (1.8 + 2.4 * Math.sin(Math.PI * Math.min(p * 1.07, 1))) * k;
          transVid.playbackRate = Math.max(1.2, Math.min(8, rate));
          var rid = requestAnimationFrame(tick);
          rafIds.push(rid);
        }
        var rid0 = requestAnimationFrame(tick);
        rafIds.push(rid0);
      });
    }

    function play3DLaptopDive() {
      if (RM || hasCustomAssets) {
        if (plate) plate.style.visibility = 'hidden';
        if (cutWrap) cutWrap.style.opacity = '0';
        place('case');
        if (hasCustomAssets && casePlate) {
          if (RM) {
            casePlate.style.opacity = '1';
            return Promise.resolve();
          }
          var fa = anim(casePlate, [{ opacity: 0 }, { opacity: 1 }], { duration: 500, fill: 'forwards' });
          return fa && fa.finished ? fa.finished.catch(function () {}) : wait(500);
        }
        return Promise.resolve();
      }
      if (laptopRig) laptopRig.classList.remove('is-hover');

      // Camera dives past Zikri & studio backdrop with cinematic depth blur
      if (cutWrap) {
        var customP = cutWrap.classList.contains('is-custom-plate');
        anim(cutWrap, [
          { opacity: 1, transform: customP ? 'scale(1)' : 'translateX(-50%) scale(1)', filter: 'blur(0px)' },
          { opacity: 0, transform: customP ? 'scale(1.26) translateY(36px)' : 'translateX(-50%) scale(1.28) translateY(52px)', filter: 'blur(12px)' }
        ], { duration: 780, easing: 'cubic-bezier(.55,0,.35,1)', fill: 'forwards' });
      }
      if (plate) {
        anim(plate, [
          { opacity: 1, transform: 'scale(1)', filter: 'blur(0px)' },
          { opacity: 0, transform: 'scale(1.16)', filter: 'blur(14px)' }
        ], { duration: 1150, easing: 'cubic-bezier(.55,0,.35,1)', fill: 'forwards' });
      }

      // Glide scene frame, edge fade masks, background gradient & 3D silver laptop together!
      root.style.setProperty('--glide', '1.55s');
      frame.classList.add('glide');
      place('case');

      return wait(1350).then(function () {
        if (plate) plate.style.visibility = 'hidden';
      });
    }

    function arriveCase() {
      mode = 'case';
      curIdx = 0;
      root.classList.add('is-case');
      syncLabels();

      if (plate) plate.style.visibility = 'hidden';
      if (cutWrap) cutWrap.style.opacity = '0';
      if (screen) {
        screen.getAnimations && screen.getAnimations().forEach(function (a) { a.cancel(); });
        screen.style.opacity = '1';
      }

      runFlash(0.55, 600);

      slides.forEach(function (sl, idx) {
        sl.style.opacity = idx === 0 ? '1' : '0';
      });
      if (slides[0]) {
        anim(slides[0], [
          { opacity: 0, transform: 'scale(1.06)' },
          { opacity: 1, transform: 'scale(1)' }
        ], { duration: 700, fill: 'forwards' });
      }

      playOnly(0);
      caseIn(0, true);
      preloadCase(1);

      later(function () {
        setBusy(false);
        frame.classList.remove('glide');
      }, 700);
    }

    function toCase() {
      if (busy || mode === 'case') return;
      setBusy(true);
      heroOut();

      wait(330).then(function () {
        if (!alive) return;
        if (ME_DIVE_CONFIG.transVideo && transReady && !RM) {
          return playKlingClip().then(arriveCase);
        }
        return play3DLaptopDive().then(arriveCase);
      });
    }

    /* ======================================================================
       §11. Switching Cases In Place (`swapTo`)
       ====================================================================== */
    function swapTo(nextIdx) {
      if (busy || mode !== 'case') return;
      var total = ME_DIVE_CONFIG.cases.length;
      if (nextIdx < 0) {
        toHero();
        return;
      }
      var target = nextIdx % total;
      if (target === curIdx) return;

      setBusy(true);
      var oldSlide = slides[curIdx];
      var newSlide = slides[target];

      var pOut = caseOut();
      var pOld = oldSlide ? anim(oldSlide, [
        { opacity: 1, transform: 'scale(1)' },
        { opacity: 0, transform: 'scale(0.98)' }
      ], { duration: 350, easing: 'ease-out', fill: 'forwards' }) : null;

      Promise.all([pOut, pOld && pOld.finished ? pOld.finished.catch(function () {}) : wait(350)]).then(function () {
        if (!alive) return;
        if (oldSlide) {
          oldSlide.classList.remove('is-active');
          var ov = oldSlide.querySelector('video');
          if (ov) { try { ov.pause(); } catch (_) {} }
        }

        curIdx = target;
        runFlash(0.35, 420);

        if (newSlide) {
          anim(newSlide, [
            { opacity: 0, transform: 'scale(1.04)' },
            { opacity: 1, transform: 'scale(1)' }
          ], { duration: 500, fill: 'forwards' });
        }

        playOnly(target);
        caseIn(target, false);
        preloadCase(target + 1);

        later(function () {
          setBusy(false);
        }, 520);
      });
    }

    /* ======================================================================
       §12. Back to Hero (`toHero`) — Real Reverse Camera Pull-Out + Hero Reveal
       ====================================================================== */
    function playReverseClip() {
      return new Promise(function (resolve) {
        if (!transRevVid) { resolve(); return; }
        clearAnims(casePlate);
        clearAnims(plate);
        clearAnims(cutWrap);

        transRevVid.currentTime = 0;
        transRevVid.style.opacity = '1';
        requestAnimationFrame(function () {
          requestAnimationFrame(function () {
            if (casePlate) casePlate.style.opacity = '0';
          });
        });

        var durEst = transRevVid.duration || 7.83;
        var glideSec = durEst > 6 ? '1.5s' : '1.25s';
        root.style.setProperty('--glide', glideSec);
        frame.classList.add('glide');
        place('hero');

        var done = false;
        function finish() {
          if (done) return;
          done = true;
          try { transRevVid.pause(); } catch (_) {}
          if (plate) {
            clearAnims(plate);
            plate.style.visibility = 'visible';
            plate.style.opacity = '1';
            plate.style.transform = '';
            plate.style.filter = '';
          }
          if (cutWrap) {
            clearAnims(cutWrap);
            cutWrap.style.opacity = '1';
            cutWrap.style.transform = '';
            cutWrap.style.filter = '';
          }
          transRevVid.style.opacity = '0';
          resolve();
        }
        transRevVid.onended = finish;
        var pr = transRevVid.play();
        if (pr && pr.catch) pr.catch(finish);

        later(finish, 3400);

        function tick() {
          if (done || !alive) return;
          var dur = transRevVid.duration || 7.83;
          var p = transRevVid.currentTime / dur;
          if (transRevVid.ended || p >= 0.992) { finish(); return; }
          var k = Math.max(1, dur / 5.04);
          var rate = (2.2 + 3.2 * Math.sin(Math.PI * Math.min(p * 1.07, 1))) * k;
          transRevVid.playbackRate = Math.max(1.5, Math.min(8, rate));
          var rid = requestAnimationFrame(tick);
          rafIds.push(rid);
        }
        var rid0 = requestAnimationFrame(tick);
        rafIds.push(rid0);
      });
    }

    function toHero() {
      if (busy || exiting || mode === 'hero') return;
      setBusy(true);
      caseOut();
      pauseAllSlides();
      runFlash(0.22, 260);

      var curSlide = slides[curIdx];
      if (curSlide) {
        anim(curSlide, [
          { opacity: 1, transform: 'scale(1)' },
          { opacity: 0, transform: 'scale(0.97)' }
        ], { duration: 280, easing: 'ease-out', fill: 'forwards' });
      }
      if (hasCustomAssets && screen) {
        anim(screen, [{ opacity: 1 }, { opacity: 0 }], { duration: 280, easing: 'ease-out', fill: 'forwards' });
      }

      mode = 'hero';
      root.classList.remove('is-case');
      syncLabels();

      // Let the ticket & laptop display cleanly power off before camera pulls back
      wait(260).then(function () {
        if (!alive || exiting) return;

        if (ME_DIVE_CONFIG.transRevVideo && transRevReady && !RM) {
          return playReverseClip().then(function () {
            if (!alive || exiting) return;
            heroIn();
            later(function () {
              setBusy(false);
              frame.classList.remove('glide');
            }, 820);
          });
        }

        // Synchronized blurred zoom-out fallback (reduced motion or before video ready)
        root.style.setProperty('--glide', '0.95s');
        frame.classList.add('glide');
        place('hero');

        if (plate) {
          clearAnims(plate);
          plate.style.visibility = 'visible';
          anim(plate, [
            { opacity: 0, transform: 'scale(1.12)', filter: 'blur(8px)' },
            { opacity: 1, transform: 'scale(1)', filter: 'blur(0px)' }
          ], { duration: 900, easing: 'cubic-bezier(.2,.8,.2,1)', fill: 'forwards' });
        }
        if (casePlate && frame.classList.contains('has-custom-caseplate')) {
          clearAnims(casePlate);
          anim(casePlate, [
            { opacity: 1, filter: 'blur(0px)' },
            { opacity: 0, filter: 'blur(12px)' }
          ], { duration: 800, easing: 'cubic-bezier(.65,0,.35,1)', fill: 'forwards' });
        }
        if (cutWrap) {
          clearAnims(cutWrap);
          var customP = cutWrap.classList.contains('is-custom-plate');
          anim(cutWrap, [
            { opacity: 0, transform: customP ? 'scale(1.12)' : 'translateX(-50%) scale(1.1)', filter: 'blur(8px)' },
            { opacity: 1, transform: customP ? 'scale(1)' : 'translateX(-50%) scale(1)', filter: 'blur(0px)' }
          ], { duration: 900, easing: 'cubic-bezier(.2,.8,.2,1)', fill: 'forwards' });
        }

        later(function () {
          heroIn();
        }, 260);

        later(function () {
          setBusy(false);
          frame.classList.remove('glide');
        }, 1050);
      });
    }

    /* ======================================================================
       Choreographed Exit from Me Studio -> Home 3D Radial Wheel (`exitToHome`)
       ====================================================================== */
    function exitToHome() {
      if (exiting || !alive) return;
      exiting = true;
      setBusy(true);
      stopSway();
      pauseAllSlides();

      if (RM) {
        if (window.zkClosePage) window.zkClosePage();
        return;
      }

      var easeOut = 'cubic-bezier(.45, 0, .75, 0)';

      // 1. Fold out all 4 nav tags cleanly upward with tight stagger
      tags.forEach(function (tag, i) {
        anim(tag, [
          { opacity: 1, transform: 'none' },
          { opacity: 0, transform: 'translateY(-44px) rotate(3deg)' }
        ], { duration: 300, delay: i * 32, easing: easeOut, fill: 'forwards' });
      });

      // 2. Fold out active mode UI (Hero typography & lanyard OR Case ticket & screen)
      if (mode === 'case') {
        caseOut();
        if (logo) anim(logo, [{ opacity: 1 }, { opacity: 0, transform: 'translateX(-50%) translateY(-18px)' }], { duration: 240, easing: easeOut, fill: 'forwards' });
        [prevBtn, nextBtn].forEach(function (b) {
          if (b) anim(b, [{ opacity: 1 }, { opacity: 0, transform: 'scale(0.86)' }], { duration: 240, easing: easeOut, fill: 'forwards' });
        });
        if (screen) anim(screen, [{ opacity: 1 }, { opacity: 0 }], { duration: 260, easing: easeOut, fill: 'forwards' });
      } else {
        [wm, mWm].forEach(function (el) {
          if (!el) return;
          anim(el, [
            { opacity: 1, transform: 'translateY(0)', clipPath: 'inset(0 0 0 0)' },
            { opacity: 0, transform: 'translateY(42px)', clipPath: 'inset(100% 0 0 0)' }
          ], { duration: 340, easing: easeOut, fill: 'forwards' });
        });
        [scriptEl, mScript].forEach(function (el, idx) {
          if (!el) return;
          var rot = idx === 0 ? 'rotate(-8deg)' : 'rotate(-7deg)';
          anim(el, [
            { opacity: 1, transform: rot, clipPath: 'inset(0 0 0 0)' },
            { opacity: 0, transform: rot, clipPath: 'inset(0 0 0 100%)' }
          ], { duration: 280, easing: easeOut, fill: 'forwards' });
        });
        [badge, mBadge].forEach(function (el) {
          if (!el) return;
          anim(el, [
            { opacity: 1, transform: 'translateY(0) rotate(0deg)' },
            { opacity: 0, transform: 'translateY(-115%) rotate(-5deg)' }
          ], { duration: 320, easing: easeOut, fill: 'forwards' });
        });
        if (hint) {
          anim(hint, [
            { opacity: 0.9, transform: 'translateX(-50%) translateY(0)' },
            { opacity: 0, transform: 'translateX(-50%) translateY(16px)' }
          ], { duration: 220, easing: easeOut, fill: 'forwards' });
        }
      }

      // 3. Subtle depth pullback & card-rounding on studio stage as it folds back into card "Me"
      if (stage) {
        anim(stage, [
          { transform: 'scale(1)', borderRadius: '0px', filter: 'brightness(1)' },
          { transform: 'scale(0.91)', borderRadius: '28px', filter: 'brightness(0.84)' }
        ], { duration: 480, easing: 'cubic-bezier(.4, 0, .2, 1)', fill: 'forwards' });
      }

      // 4. Overlap cleanly with carousel iris collapse + 3D shards reassembly + Home riffle wave
      later(function () {
        if (window.zkClosePage) window.zkClosePage();
      }, 240);
    }

    window.__zkMeExitHome = exitToHome;

    /* ======================================================================
       Event Bindings (Wheel, Touch, Keyboard, Clicks, Resize)
       ====================================================================== */
    function bind(el, ev, fn, opts) {
      if (!el) return;
      el.addEventListener(ev, fn, opts);
      cleanups.push(function () { el.removeEventListener(ev, fn, opts); });
    }

    // Wheel capture (§9, §11)
    bind(root, 'wheel', function (e) {
      e.preventDefault();
      if (busy || wheelLock) return;
      var dy = Math.abs(e.deltaY) >= Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      if (Math.abs(dy) < 18) return;
      wheelLock = true;
      later(function () { wheelLock = false; }, 900);
      if (mode === 'hero') {
        if (dy > 0) toCase();
      } else {
        if (dy > 0) swapTo(curIdx + 1);
        else swapTo(curIdx - 1);
      }
    }, { passive: false });

    // Touch swipe capture (§9, §11)
    var tsx = 0, tsy = 0, tracking = false;
    bind(root, 'touchstart', function (e) {
      if (e.touches.length !== 1) return;
      tsx = e.touches[0].clientX;
      tsy = e.touches[0].clientY;
      tracking = true;
    }, { passive: true });

    bind(root, 'touchend', function (e) {
      if (!tracking || busy) return;
      tracking = false;
      var t = e.changedTouches[0];
      var dx = t.clientX - tsx;
      var dy = t.clientY - tsy;
      if (Math.abs(dx) < 40 && Math.abs(dy) < 40) return;

      if (mode === 'hero') {
        if (dy < -40) toCase();
      } else {
        if (Math.abs(dy) >= Math.abs(dx)) {
          if (dy < -40) swapTo(curIdx + 1);
          else if (dy > 40) swapTo(curIdx - 1);
        } else {
          if (dx < -40) swapTo(curIdx + 1);
          else if (dx > 40) swapTo(curIdx - 1);
        }
      }
    }, { passive: true });

    // Keyboard capture (only while page 2 is open)
    bind(document, 'keydown', function (e) {
      if (pg.hidden || !pg.classList.contains('p2')) return;
      var k = e.key;
      if (k === 'ArrowDown' || k === 'PageDown' || k === ' ') {
        e.preventDefault();
        if (mode === 'hero') toCase();
        else swapTo(curIdx + 1);
      } else if (k === 'ArrowRight') {
        if (mode === 'case') {
          e.preventDefault();
          swapTo(curIdx + 1);
        }
      } else if (k === 'ArrowUp' || k === 'PageUp' || k === 'ArrowLeft') {
        if (mode === 'case') {
          e.preventDefault();
          swapTo(curIdx - 1);
        }
      }
    });

    // Nav tags
    bind(t1, 'click', function (e) {
      if (mode === 'case') {
        e.preventDefault();
        e.stopPropagation();
        toHero();
      } else {
        e.preventDefault();
        exitToHome();
      }
    });
    bind(t2, 'click', function (e) {
      e.preventDefault();
      if (mode === 'hero') toCase();
      else swapTo(curIdx + 1);
    });
    bind(t3, 'click', function (e) {
      e.preventDefault();
      if (window.zkJumpPage) window.zkJumpPage(5);
    });
    bind(t4, 'click', function (e) {
      e.preventDefault();
      if (window.zkJumpPage) window.zkJumpPage(6);
    });
    bind(logo, 'click', function () { toHero(); });
    bind(hint, 'click', function () { toCase(); });
    bind(prevBtn, 'click', function () { swapTo(curIdx - 1); });
    bind(nextBtn, 'click', function () { swapTo(curIdx + 1); });
    bind(screen, 'click', function (e) {
      if (mode !== 'case' || busy) return;
      if (e.target.closest('a,button')) return;
      swapTo(curIdx + 1);
    });

    // Hero laptop hover & click to dive directly!
    bind(laptopHeroHit, 'pointerenter', function () {
      if (mode === 'hero' && !busy && laptopRig) laptopRig.classList.add('is-hover');
    });
    bind(laptopHeroHit, 'pointerleave', function () {
      if (laptopRig) laptopRig.classList.remove('is-hover');
    });
    bind(laptopHeroHit, 'click', function () {
      if (mode === 'hero' && !busy) toCase();
    });

    // Badge hover & tap swing
    bind(badgeHit, 'pointerenter', swingBadge);
    bind(badgeHit, 'click', swingBadge);

    // Language sync
    bind(window, 'zk-lang', syncLabels);

    // Resize recalculation (removes glide so resize never lags)
    var rRaf = 0;
    bind(window, 'resize', function () {
      if (rRaf) return;
      rRaf = requestAnimationFrame(function () {
        rRaf = 0;
        if (!alive) return;
        frame.classList.remove('glide');
        place(mode);
      });
    }, { passive: true });

    /* ======================================================================
       Initial Layout & Guarded Entrance Trigger (§8)
       ====================================================================== */
    syncLabels();
    place('hero');

    var fontsP = (document.fonts && document.fonts.ready) ? document.fonts.ready : Promise.resolve();
    var plateP = new Promise(function (res) {
      if (!plate || plate.complete) { res(); return; }
      plate.addEventListener('load', res, { once: true });
      plate.addEventListener('error', res, { once: true });
    });

    Promise.race([
      Promise.all([fontsP, plateP]),
      wait(2500)
    ]).then(function () {
      if (!alive) return;
      requestAnimationFrame(function () {
        if (!alive) return;
        place('hero');
        runEntrance();
      });
    });

    // 4s absolute failsafe
    later(runEntrance, 4000);

    // Deterministic cleanup when leaving page 2
    return function cleanupMeDive() {
      alive = false;
      if (window.__zkMeExitHome === exitToHome) window.__zkMeExitHome = null;
      stopSway();
      activeAnims.forEach(function (a) { try { a.cancel(); } catch (_) {} });
      activeAnims.length = 0;
      timers.forEach(function (id) { clearTimeout(id); });
      timers.length = 0;
      rafIds.forEach(function (id) { cancelAnimationFrame(id); });
      rafIds.length = 0;
      if (rRaf) cancelAnimationFrame(rRaf);
      pauseAllSlides();
      cleanups.forEach(function (fn) { try { fn(); } catch (_) {} });
      cleanups.length = 0;
    };
  });
})();
