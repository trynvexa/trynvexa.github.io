/* ============================================================
   Halaman Proyek (P5) - Studi Kasus Interaktif, 3D Browser Stage & Indeks Proyek
   8-Language Native Localization (id, en, zh, es, ar, fr, ja, ko)
   ============================================================ */
var NP_DATA = [
  { id: "mono", num: "01", year: "2026", domain: "v0-mono-ecommerce.vercel.app", stack: ["HTML5", "CSS3", "Responsive UI", "Editorial Typography"], r: "1711/919", name: "Mono", a: "#c4622d", img: "assets/images/project-mono.webp" },
  { id: "gigi", num: "02", year: "2026", domain: "modern-gen-z-energy-drink-landi-six-eta.vercel.app", stack: ["HTML5", "Tailwind CSS", "Conversion UI", "Product Showcase"], r: "1690/931", name: "GiGi", a: "#7fc400", img: "assets/images/project-gigi.webp" },
  { id: "compute", num: "03", year: "2026", domain: "compute-the-platform-to-build-psi-tan.vercel.app", stack: ["Modern CSS", "Dark UI System", "Interactive Layout", "SaaS Landing"], r: "1707/921", name: "Compute", a: "#ff4d8d", img: "assets/images/project-compute.webp" },
  { id: "sweet", num: "04", year: "2026", domain: "trynvexa.github.io/toko-kue", stack: ["HTML5", "CSS3", "JavaScript", "E-Commerce Catalog"], r: "1901/922", name: "Sweet Heaven", a: "#c9a227", img: "assets/images/project-sweet.jpg" }
];

var NP_X = {
  mono: {
    crops: [
      { x: 0.22, y: 0, w: 0.58, h: 0.11, wide: 1 },
      { x: 0.22, y: 0.2, w: 0.6, h: 0.68 },
      { x: 0.34, y: 0.76, w: 0.32, h: 0.17 }
    ],
    pal: ["#e9d7c3", "#b4572a", "#5a5c5c", "#1d2223", "#8d8c88"]
  },
  gigi: {
    crops: [
      { x: 0.04, y: 0, w: 0.94, h: 0.1, wide: 1 },
      { x: 0.12, y: 0.25, w: 0.34, h: 0.56 },
      { x: 0.58, y: 0.1, w: 0.28, h: 0.82 }
    ],
    pal: ["#b7fc08", "#fdfdf9", "#64b102", "#060606", "#ddded9"]
  },
  compute: {
    crops: [
      { x: 0, y: 0, w: 1, h: 0.12, wide: 1 },
      { x: 0.03, y: 0.28, w: 0.6, h: 0.35 },
      { x: 0.03, y: 0.74, w: 0.42, h: 0.2 }
    ],
    pal: ["#000000", "#d94f87", "#cdc2fc", "#2e0a1a", "#fefefe"]
  },
  sweet: {
    crops: [
      { x: 0.08, y: 0.04, w: 0.86, h: 0.12, wide: 1 },
      { x: 0.18, y: 0.24, w: 0.64, h: 0.45 },
      { x: 0.08, y: 0.05, w: 0.18, h: 0.1 }
    ],
    pal: ["#e8dacd", "#fef7ef", "#caab52", "#8b6145", "#a28e83"]
  }
};

var NP_I18N = {
  id: {
    kicker: "Karya Pilihan · 04 Studi Kasus",
    navAria: "Pilih proyek",
    stackAria: "Teknologi proyek",
    shotAria: "Lihat gambar ukuran penuh",
    role: "Front-End & Desain UI",
    visit: "Lihat situs",
    nextLbl: "Berikutnya:",
    closeTitle: "Dilihat dari dekat",
    palTitle: "Warna yang dipakai",
    palHint: "(Klik untuk salin HEX)",
    copyColor: "Salin warna",
    rowsTitle: "Isi halaman & spesifikasi",
    allTitle: "Indeks Semua Proyek (04)",
    allSub: "Bandingkan keempat proyek unggulan atau buka demo langsung.",
    moreNext: "Proyek berikutnya",
    moreQ: "Punya halaman yang perlu dirombak?",
    moreCta: "Hubungi saya",
    closeBtn: "Tutup",
    inspectBtn: "Baca Studi Kasus",
    zoomHint: "Perbesar ↗",
    copied: "Tersalin!",
    stacks: {
      "Responsive UI": "UI Responsif",
      "Editorial Typography": "Tipografi Editorial",
      "Conversion UI": "UI Konversi",
      "Product Showcase": "Pameran Produk",
      "Modern CSS": "CSS Modern",
      "Dark UI System": "Sistem UI Gelap",
      "Interactive Layout": "Tata Letak Interaktif",
      "SaaS Landing": "Halaman SaaS",
      "E-Commerce Catalog": "Katalog Toko Daring"
    },
    projects: {
      mono: {
        kind: "Hunian modular",
        alt: "Halaman depan Mono: huruf besar menimpa foto bangunan baja karat di tepi air",
        t: ["Halaman depan untuk produk hunian modular yang ringan dan tahan lama.", "Nama merek dibuat sebesar layar dan ditimpa foto bangunannya, jadi orang langsung tahu ini tentang apa tanpa membaca. Menu dan tombol kontak sengaja dibuat kecil supaya tidak mengganggu."],
        crops: ["Menu dan tombol kontak dibuat kecil supaya tidak menyaingi judul.", "Bangunan baja karat di depan huruf yang dibuat raksasa.", "Satu kalimat utama di atas pantulan air."],
        rows: [["Menu", "Desain, Galeri, Model, Tentang"], ["Tombol", "Kontak"], ["Kalimat utama", "Ringan, tahan lama, dan siap bertualang."], ["Fokus Desain", "Tipografi monumental, kontras material baja & air, navigasi minimalis"]]
      },
      gigi: {
        kind: "Minuman energi",
        alt: "Halaman depan GiGi: judul tebal, tombol daftar diskon, dan kaleng rasa lemon lime",
        t: ["Halaman depan minuman energi tanpa gula.", "Latar dibuat putih bersih supaya warna hijau kaleng yang bicara. Judulnya tebal dan padat, tombol diskon ada di menu dan di bawah judul, dan empat keunggulan produk diringkas dalam satu baris."],
        crops: ["Menu dengan satu tombol diskon berwarna hijau.", "Judul, deskripsi singkat, dan dua tombol dengan fungsi berbeda.", "Kaleng lemon lime jadi pusat perhatian di sisi kanan."],
        rows: [["Menu", "Beranda, Rasa, Kreator, Distributor, Karier"], ["Tombol", "Diskon 25%, Daftar & Hemat 25%, Jelajahi Rasa"], ["Keunggulan", "Tanpa Gula, Kafein 7+mg, Rasa Alami, Kaya Vitamin B"], ["Fokus Desain", "Hierarki konversi tinggi, aksen neon segar di atas kanvas putih bersih"]]
      },
      compute: {
        kind: "Layanan agen AI",
        alt: "Halaman depan Compute: judul putih di latar gelap dengan pohon bercahaya merah muda",
        t: ["Halaman depan untuk layanan agen AI yang berjalan di banyak mesin sekaligus.", "Latar gelap dengan satu gambar pohon bercahaya di kanan. Judul besar di kiri, tiga angka performa di bawahnya, dan satu tombol putih yang jelas untuk mulai memakai layanan."],
        crops: ["Menu lengkap dengan tombol masuk dan tombol putih jalankan agen.", "Judul besar, dengan kata terakhir diberi warna gradasi.", "Tiga angka performa di bagian bawah."],
        rows: [["Menu", "Kapabilitas, Proses, Infrastruktur, Integrasi, Keamanan"], ["Tombol", "Masuk, Jalankan Agen"], ["Angka", "3500+ agen aktif, 99.7% aktif, latensi < 50 md"], ["Fokus Desain", "Atmosfer mode gelap teknis, metrik performa langsung, tombol kontras tinggi"]]
      },
      sweet: {
        kind: "Toko kue artisan",
        alt: "Halaman depan Sweet Heaven: judul serif putih di latar krem dengan tombol emas",
        t: ["Halaman depan toko kue artisan.", "Warna krem dan emas, judul serif besar di tengah, dan hanya satu tombol menuju koleksi. Tidak ada elemen lain yang bersaing dengan judulnya."],
        crops: ["Menu berhuruf kapital renggang dan tombol pesan berwarna emas.", "Judul serif putih besar dan satu tombol menuju koleksi.", "Logo dua warna, cokelat dan emas."],
        rows: [["Menu", "Beranda, Filosofi, Menu, Pertanyaan, Kontak"], ["Tombol", "Pesan Sekarang, Lihat Koleksi"], ["Fokus Desain", "Editorial hangat bernuansa krem & emas, tipografi serif klasik yang elegan"]]
      }
    }
  },
  en: {
    kicker: "Selected Works · 04 Case Studies",
    navAria: "Select project",
    stackAria: "Project technologies",
    shotAria: "View full-size preview",
    role: "Front-End & UI Design",
    visit: "Live Demo",
    nextLbl: "Next:",
    closeTitle: "Closer Inspection",
    palTitle: "Color System",
    palHint: "(Click swatch to copy HEX)",
    copyColor: "Copy color",
    rowsTitle: "Architecture & Specs",
    allTitle: "All Projects Index (04)",
    allSub: "Compare all four featured projects or launch their live demos directly.",
    moreNext: "Next Project",
    moreQ: "Have a page or product that needs a redesign?",
    moreCta: "Let's Talk",
    closeBtn: "Close",
    inspectBtn: "Read Case Study",
    zoomHint: "Expand ↗",
    copied: "Copied!",
    stacks: {},
    projects: {
      mono: {
        kind: "Modular Housing",
        alt: "Mono homepage: monumental letters behind weathered steel architecture by the water",
        t: ["Landing page for a lightweight, durable modular housing concept.", "The brand name spans the full viewport behind the architectural photography so visitors grasp the scale immediately. Navigation and contact triggers stay understated to preserve visual calm."],
        crops: ["Compact navigation and contact button that never compete with the hero title.", "Weathered steel structure layered in front of monumental display typography.", "A single positioning statement anchored above the water reflection."],
        rows: [["Navigation", "Design, Gallery, Models, About"], ["Action", "Contact"], ["Key Copy", "Lightweight, durable and adventure-ready."], ["Design Focus", "Monumental typography, steel & water material contrast, minimal chrome"]]
      },
      gigi: {
        kind: "Energy Drink",
        alt: "GiGi homepage: bold headline, discount trigger, and lemon-lime energy drink can",
        t: ["High-energy landing page for a zero-sugar Gen-Z energy drink.", "A crisp white canvas lets the electric lime can command attention. Bold condensed typography, dual conversion triggers, and a four-pillar benefit strip drive immediate action."],
        crops: ["Top bar featuring a high-contrast green discount CTA.", "Punchy headline, concise copy, and dual primary/secondary action buttons.", "The lemon-lime can positioned as the unmistakable visual anchor on the right."],
        rows: [["Navigation", "Home, Flavours, Creators, Distributors, Careers"], ["Actions", "Get 25% Off, Sign Up & Save 25%, Explore Flavours"], ["Highlights", "Zero Sugar, 7+mg Caffeine, Natural Flavours, Vitamin B Rich"], ["Design Focus", "High-conversion hierarchy, fresh neon accents on a clean white stage"]]
      },
      compute: {
        kind: "AI Agent Platform",
        alt: "Compute homepage: white display headline on a dark stage with a glowing pink neural tree",
        t: ["Front page for a distributed AI agent execution platform.", "Deep obsidian background paired with a glowing neural tree on the right, left-aligned display headline, three live performance metrics, and a crisp white deployment CTA."],
        crops: ["Full product navigation with Sign in and a high-contrast white Deploy agent CTA.", "Large display headline with a gradient-accented terminal word.", "Three key infrastructure performance metrics anchored below the fold."],
        rows: [["Navigation", "Capabilities, Process, Infra, Integrations, Security"], ["Actions", "Sign in, Deploy agent"], ["Metrics", "3500+ active agents, 99.7% uptime, < 50 ms latency"], ["Design Focus", "Technical dark-mode atmosphere, real-time telemetry, clear CTA hierarchy"]]
      },
      sweet: {
        kind: "Artisan Bakery",
        alt: "Sweet Heaven homepage: white serif headline on warm cream backdrop with golden button",
        t: ["Editorial storefront for an artisan cake and pastry studio.", "Warm cream and gold palette, centered classic serif headline, and a single focused call-to-action leading into the curated pastry collection."],
        crops: ["Wide-tracked uppercase navigation paired with a golden Order Now button.", "Large white serif headline with a single focused collection trigger.", "Two-tone chocolate and gold brand mark."],
        rows: [["Navigation", "Home, Philosophy, Menu, Questions, Contact"], ["Actions", "Order Now, Discover Collection"], ["Design Focus", "Warm cream & gold editorial palette, timeless serif typography"]]
      }
    }
  },
  zh: {
    kicker: "精选作品 · 04 个案例研究",
    navAria: "选择项目",
    stackAria: "项目技术栈",
    shotAria: "查看高清大图",
    role: "前端与界面设计",
    visit: "在线演示",
    nextLbl: "下一个：",
    closeTitle: "细节近观",
    palTitle: "色彩系统",
    palHint: "（点击色块复制 HEX）",
    copyColor: "复制颜色",
    rowsTitle: "页面结构与规格",
    allTitle: "全部项目索引 (04)",
    allSub: "对比全部四个精选项目，或直接打开在线演示。",
    moreNext: "下一个项目",
    moreQ: "有需要改版升级的页面或产品吗？",
    moreCta: "联系我",
    closeBtn: "关闭",
    inspectBtn: "阅读案例",
    zoomHint: "放大预览 ↗",
    copied: "已复制！",
    stacks: {
      "Responsive UI": "响应式界面",
      "Editorial Typography": "杂志排版",
      "Conversion UI": "高转化界面",
      "Product Showcase": "产品展示",
      "Modern CSS": "现代 CSS",
      "Dark UI System": "暗色界面系统",
      "Interactive Layout": "交互式布局",
      "SaaS Landing": "SaaS 落地页",
      "E-Commerce Catalog": "电商目录"
    },
    projects: {
      mono: {
        kind: "模块化住宅",
        alt: "Mono 首页：水畔耐候钢建筑覆盖在巨幅品牌字母之上",
        t: ["面向轻量化、耐用型模块化住宅的落地页设计。", "品牌名铺满整屏并置于建筑摄影背后，让访客无需阅读即可一眼感知空间气势；导航与联系入口刻意克制，保持画面宁静。"],
        crops: ["精简的导航栏与联系按钮，绝不抢占主标题视线。", "耐候钢建筑主体层叠于巨幅展示字形前方。", "水面倒影之上仅留一句凝练的品牌主张。"],
        rows: [["导航栏", "设计、画廊、型号、关于"], ["操作按钮", "联系我们"], ["核心文案", "轻盈、坚固，随时开启探索。"], ["设计重点", "纪念碑式字体排版、钢材与水面的材质对比、极简导航"]]
      },
      gigi: {
        kind: "能量饮品",
        alt: "GiGi 首页：粗体标题、折扣按钮与青柠风味能量饮料罐",
        t: ["面向 Z 世代的零糖能量饮品高转化落地页。", "纯白画布让荧光青柠罐身成为绝对主角；紧凑粗体标题、双重折扣转化按钮以及一行四项核心卖点瞬间激发点击。"],
        crops: ["顶栏内置高对比度荧光绿折扣行动按钮。", "有力主标题、简短导语与主次分明的双按钮。", "右侧青柠风味易拉罐稳稳锚定视觉重心。"],
        rows: [["导航栏", "首页、口味、创作者、经销商、加入我们"], ["行动按钮", "立减 25%、注册享 25% 折扣、探索口味"], ["核心卖点", "零糖、7+mg 咖啡因、天然风味、富含维生素 B"], ["设计重点", "高转化信息层级、纯白舞台上的鲜活霓虹点缀"]]
      },
      compute: {
        kind: "AI 智能体平台",
        alt: "Compute 首页：深色背景上的白色大标题与发光粉紫数字树",
        t: ["面向分布式多机 AI 智能体执行平台的官网首页。", "深邃黑底搭配右侧发光数字树视觉，左侧大字标题、下方三项核心性能指标以及一枚醒目的白色部署按钮清晰利落。"],
        crops: ["完整产品导航搭配登录与高对比度白色“部署智能体”按钮。", "巨幅展示标题，末尾关键词施以渐变高光。", "首屏底部稳健呈现三项关键基础设施性能指标。"],
        rows: [["导航栏", "能力、流程、基础设施、集成、安全"], ["行动按钮", "登录、部署智能体"], ["核心数据", "3500+ 活跃智能体、99.7% 在线率、< 50 ms 延迟"], ["设计重点", "硬核暗色氛围、实时遥测指标、清晰高对比 CTA"]]
      },
      sweet: {
        kind: "手作烘焙工坊",
        alt: "Sweet Heaven 首页：奶油色背景上的白色衬线标题与金色按钮",
        t: ["手作蛋糕与甜点工坊的杂志风官网首页。", "温暖奶油与香槟金配色，居中经典白色衬线主标题，辅以唯一通往精选系列的行动按钮，毫无多余干扰。"],
        crops: ["宽字距大写导航与金色“立即预订”按钮相得益彰。", "居中大号白色衬线标题配单一焦点按钮。", "巧克力棕与金色双色品牌标识。"],
        rows: [["导航栏", "首页、理念、菜单、常见问题、联系"], ["行动按钮", "立即预订、探索精选系列"], ["设计重点", "温暖奶油与金色的杂志美学、隽永典雅的衬线排版"]]
      }
    }
  },
  es: {
    kicker: "Obras seleccionadas · 04 casos de estudio",
    navAria: "Seleccionar proyecto",
    stackAria: "Tecnologías del proyecto",
    shotAria: "Ver imagen a tamaño completo",
    role: "Front-End y Diseño UI",
    visit: "Ver sitio",
    nextLbl: "Siguiente:",
    closeTitle: "Vista en detalle",
    palTitle: "Sistema de color",
    palHint: "(Clic para copiar HEX)",
    copyColor: "Copiar color",
    rowsTitle: "Arquitectura y detalles",
    allTitle: "Índice de proyectos (04)",
    allSub: "Compara los cuatro proyectos destacados o abre sus demos en vivo.",
    moreNext: "Siguiente proyecto",
    moreQ: "¿Tienes una página o producto que necesita un rediseño?",
    moreCta: "Hablemos",
    closeBtn: "Cerrar",
    inspectBtn: "Ver caso de estudio",
    zoomHint: "Ampliar ↗",
    copied: "¡Copiado!",
    stacks: {
      "Responsive UI": "UI adaptable",
      "Editorial Typography": "Tipografía editorial",
      "Conversion UI": "UI de conversión",
      "Product Showcase": "Escaparate",
      "Modern CSS": "CSS moderno",
      "Dark UI System": "Sistema UI oscuro",
      "Interactive Layout": "Diseño interactivo",
      "SaaS Landing": "Landing SaaS",
      "E-Commerce Catalog": "Catálogo e-commerce"
    },
    projects: {
      mono: {
        kind: "Vivienda modular",
        alt: "Portada de Mono: letras monumentales detrás de arquitectura de acero junto al agua",
        t: ["Landing page para un concepto de vivienda modular ligera y duradera.", "El nombre de la marca cruza la pantalla detrás de la arquitectura para comunicar escala al instante, mientras la navegación y el contacto permanecen sobrios."],
        crops: ["Navegación compacta y botón de contacto que nunca compiten con el titular.", "Estructura de acero corten superpuesta sobre tipografía monumental.", "Una sola frase clave anclada sobre el reflejo del agua."],
        rows: [["Menú", "Diseño, Galería, Modelos, Nosotros"], ["Acción", "Contacto"], ["Frase clave", "Ligera, duradera y lista para la aventura."], ["Enfoque de diseño", "Tipografía monumental, contraste entre acero y agua, navegación mínima"]]
      },
      gigi: {
        kind: "Bebida energética",
        alt: "Portada de GiGi: titular grueso, botón de descuento y lata sabor lima-limón",
        t: ["Landing page de alto impacto para una bebida energética sin azúcar.", "El lienzo blanco puro deja que la lata lima eléctrica brille, combinando titulares densos, doble CTA de descuento y cuatro beneficios en una sola línea."],
        crops: ["Barra superior con un CTA verde de descuento de alto contraste.", "Titular directo, descripción breve y dos botones con funciones distintas.", "La lata lima-limón como foco visual inconfundible a la derecha."],
        rows: [["Menú", "Inicio, Sabores, Creadores, Distribuidores, Carreras"], ["Acciones", "25% de descuento, Regístrate y ahorra 25%, Ver sabores"], ["Ventajas", "Sin azúcar, 7+mg cafeína, Sabores naturales, Rico en vitamina B"], ["Enfoque de diseño", "Jerarquía de alta conversión, acentos neón sobre lienzo blanco"]]
      },
      compute: {
        kind: "Plataforma de agentes IA",
        alt: "Portada de Compute: titular blanco sobre fondo oscuro con árbol luminoso rosa",
        t: ["Portada para una plataforma distribuida de ejecución de agentes de IA.", "Fondo obsidiana profundo junto a un árbol luminoso a la derecha, titular amplio a la izquierda, tres métricas en vivo y un botón blanco nítido."],
        crops: ["Navegación completa con acceso y botón blanco de alto contraste.", "Titular de gran escala con degradado en la última palabra.", "Tres métricas clave de rendimiento en la parte inferior."],
        rows: [["Menú", "Capacidades, Proceso, Infraestructura, Integraciones, Seguridad"], ["Acciones", "Iniciar sesión, Desplegar agente"], ["Métricas", "3500+ agentes activos, 99.7% uptime, latencia < 50 ms"], ["Enfoque de diseño", "Atmósfera técnica oscura, telemetría en vivo y CTA nítido"]]
      },
      sweet: {
        kind: "Pastelería artesanal",
        alt: "Portada de Sweet Heaven: título serif blanco en fondo crema con botón dorado",
        t: ["Escaparate editorial para un taller artesanal de pastelería.", "Paleta cálida en crema y oro, gran titular serif centrado y un único botón hacia la colección para que nada compita con el protagonismo visual."],
        crops: ["Menú en mayúsculas espaciadas junto al botón dorado de pedido.", "Gran titular serif blanco y un único botón hacia la colección.", "Logotipo bicolor en chocolate y dorado."],
        rows: [["Menú", "Inicio, Filosofía, Menú, Preguntas, Contacto"], ["Acciones", "Pedir ahora, Descubrir colección"], ["Enfoque de diseño", "Editorial cálido en crema y oro, tipografía serif clásica"]]
      }
    }
  },
  ar: {
    kicker: "أعمال مختارة · 04 دراسات حالة",
    navAria: "اختر مشروعًا",
    stackAria: "تقنيات المشروع",
    shotAria: "عرض الصورة بالحجم الكامل",
    role: "واجهات أمامية وتصميم UI",
    visit: "معاينة الموقع",
    nextLbl: "التالي:",
    closeTitle: "نظرة عن قرب",
    palTitle: "نظام الألوان",
    palHint: "(انقر على اللون لنسخ HEX)",
    copyColor: "نسخ اللون",
    rowsTitle: "البنية والمواصفات",
    allTitle: "فهرس جميع المشاريع (04)",
    allSub: "قارن بين المشاريع الأربعة المميزة أو افتح المعاينة المباشرة.",
    moreNext: "المشروع التالي",
    moreQ: "هل لديك صفحة أو منتج يحتاج إلى إعادة تصميم؟",
    moreCta: "تواصل معي",
    closeBtn: "إغلاق",
    inspectBtn: "قراءة دراسة الحالة",
    zoomHint: "تكبير ↗",
    copied: "تم النسخ!",
    stacks: {
      "Responsive UI": "واجهة متجاوبة",
      "Editorial Typography": "طباعة تحريرية",
      "Conversion UI": "واجهة تحويل",
      "Product Showcase": "عرض منتج",
      "Modern CSS": "CSS حديث",
      "Dark UI System": "نظام واجهة داكن",
      "Interactive Layout": "تخطيط تفاعلي",
      "SaaS Landing": "صفحة SaaS",
      "E-Commerce Catalog": "كتالوج متجر"
    },
    projects: {
      mono: {
        kind: "مساكن معيارية",
        alt: "واجهة Mono: أحرف عملاقة خلف مبنى فولاذي على ضفة الماء",
        t: ["صفحة هبوط لمفهوم مساكن معيارية خفيفة ومتينة.", "يمتد اسم العلامة بعرض الشاشة خلف صورة المبنى الفولاذي ليفهم الزائر الفكرة فورًا، بينما تبقى القائمة وزر التواصل هادئين."],
        crops: ["قائمة مختصرة وزر تواصل لا ينافسان العنوان الرئيسي.", "مبنى فولاذي بارز أمام طباعة عرض عملاقة.", "جملة تعريفية واحدة فوق انعكاس الماء."],
        rows: [["القائمة", "التصميم، المعرض، النماذج، عنا"], ["الزر", "تواصل"], ["العبارة الرئيسية", "خفيفة، متينة، وجاهزة للمغامرة."], ["تركيز التصميم", "طباعة ضخمة، تباين الفولاذ والماء، تنقل بسيط"]]
      },
      gigi: {
        kind: "مشروب طاقة",
        alt: "واجهة GiGi: عنوان جريء وزر خصم وعبوة بنكهة الليمون واللايم",
        t: ["صفحة هبوط نابضة بالحيوية لمشروب طاقة خالٍ من السكر.", "خلفية بيضاء ناصعة تبرز لون العبوة الأخضر المضيء، مع عناوين قوية وأزرار خصم واضحة وأربع مزايا في صف واحد."],
        crops: ["شريط علوي يضم زر خصم أخضر عالي التباين.", "عنوان حاد ووصف موجز وزران بوظيفتين مختلفتين.", "عبوة الليمون واللايم نقطة التركيز البصري الأساسية."],
        rows: [["القائمة", "الرئيسية، النكهات، المبدعون، الموزعون، الوظائف"], ["الأزرار", "خصم 25%، سجّل ووفّر 25%، استكشف النكهات"], ["المزايا", "خالٍ من السكر، +7ملغ كافيين، نكهات طبيعية، غني بفيتامين B"], ["تركيز التصميم", "تسلسل تحويل عالٍ ولمسات نيون منعشة على خلفية بيضاء"]]
      },
      compute: {
        kind: "منصة وكلاء ذكاء اصطناعي",
        alt: "واجهة Compute: عنوان أبيض على خلفية داكنة مع شجرة مضيئة وردية",
        t: ["الصفحة الرئيسية لمنصة تشغيل وكلاء ذكاء اصطناعي موزّعين عبر عدة أجهزة.", "خلفية داكنة مع شجرة رقمية مضيئة، وعنوان كبير، وثلاثة أرقام أداء فورية، وزر أبيض واضح لبدء التشغيل."],
        crops: ["قائمة متكاملة تضم تسجيل الدخول وزر نشر الوكيل الأبيض.", "عنوان ضخم تتألق كلمته الأخيرة بتدرج لوني.", "ثلاثة مؤشرات أداء رئيسية في الجزء السفلي."],
        rows: [["القائمة", "القدرات، الآلية، البنية، التكاملات، الأمان"], ["الأزرار", "تسجيل الدخول، نشر وكيل"], ["المؤشرات", "+3500 وكيل نشط، 99.7% توافر، زمن استجابة < 50 مللي ثانية"], ["تركيز التصميم", "أجواء داكنة تقنية ومقاييس لحظية وزر إجراء واضح"]]
      },
      sweet: {
        kind: "مخبز حلويات حرفي",
        alt: "واجهة Sweet Heaven: عنوان أبيض كلاسيكي على خلفية كريمية وزر ذهبي",
        t: ["واجهة تحريرية لمتجر كيك وحلويات حرفية.", "درجات الكريمي والذهبي وعنوان سيريف كبير في المنتصف وزر واحد نحو التشكيلة دون أي تشتيت بصري."],
        crops: ["قائمة أحرف متباعدة مع زر طلب ذهبي أنيق.", "عنوان سيريف أبيض كبير مع زر واحد نحو المجموعة.", "شعار بلونين: الشوكولاتة والذهبي."],
        rows: [["القائمة", "الرئيسية، الفلسفة، القائمة، الأسئلة، تواصل"], ["الأزرار", "اطلب الآن، اكتشف التشكيلة"], ["تركيز التصميم", "طابع تحريري دافئ بالكريمي والذهبي وخط سيريف كلاسيكي"]]
      }
    }
  },
  fr: {
    kicker: "Travaux choisis · 04 études de cas",
    navAria: "Choisir un projet",
    stackAria: "Technologies du projet",
    shotAria: "Voir l’aperçu en grand",
    role: "Front-End & Design UI",
    visit: "Démo en ligne",
    nextLbl: "Suivant :",
    closeTitle: "Vue rapprochée",
    palTitle: "Palette de couleurs",
    palHint: "(Cliquer pour copier le HEX)",
    copyColor: "Copier la couleur",
    rowsTitle: "Architecture & détails",
    allTitle: "Index des projets (04)",
    allSub: "Comparez les quatre projets phares ou lancez leurs démos en direct.",
    moreNext: "Projet suivant",
    moreQ: "Un site ou un produit à repenser ?",
    moreCta: "Discutons-en",
    closeBtn: "Fermer",
    inspectBtn: "Lire l’étude de cas",
    zoomHint: "Agrandir ↗",
    copied: "Copié !",
    stacks: {
      "Responsive UI": "UI réactive",
      "Editorial Typography": "Typographie éditoriale",
      "Conversion UI": "UI de conversion",
      "Product Showcase": "Vitrine produit",
      "Modern CSS": "CSS moderne",
      "Dark UI System": "Système UI sombre",
      "Interactive Layout": "Mise en page interactive",
      "SaaS Landing": "Landing SaaS",
      "E-Commerce Catalog": "Catalogue e-commerce"
    },
    projects: {
      mono: {
        kind: "Habitat modulaire",
        alt: "Page d’accueil Mono : lettrage géant derrière une architecture en acier au bord de l’eau",
        t: ["Landing page pour un concept d’habitat modulaire léger et durable.", "Le nom de la marque s’étend sur tout l’écran derrière la photo architecturale pour frapper d’emblée, tandis que menu et contact restent discrets."],
        crops: ["Navigation compacte et bouton contact qui ne rivalisent pas avec le titre.", "Architecture en acier corten devant une typographie monumentale.", "Une seule phrase clé posée au-dessus du reflet de l’eau."],
        rows: [["Menu", "Design, Galerie, Modèles, À propos"], ["Action", "Contact"], ["Accroche", "Léger, durable et prêt pour l’aventure."], ["Axe design", "Typographie monumentale, contraste acier & eau, chrome minimal"]]
      },
      gigi: {
        kind: "Boisson énergisante",
        alt: "Page d’accueil GiGi : titre gras, bouton de remise et canette citron-vert",
        t: ["Landing page percutante pour une boisson énergisante sans sucre.", "Un fond blanc pur met en valeur la canette vert fluo, soutenue par un titre dense, deux déclencheurs de remise et quatre atouts alignés."],
        crops: ["Barre supérieure dotée d’un bouton de remise vert à fort contraste.", "Titre incisif, texte court et deux boutons aux rôles distincts.", "La canette citron-vert comme point d’ancrage visuel à droite."],
        rows: [["Menu", "Accueil, Saveurs, Créateurs, Distributeurs, Carrières"], ["Actions", "-25 %, S’inscrire & économiser 25 %, Voir les saveurs"], ["Atouts", "Zéro sucre, 7+mg caféine, Arômes naturels, Riche en vitamine B"], ["Axe design", "Hiérarchie orientée conversion, accents néon sur scène blanche"]]
      },
      compute: {
        kind: "Plateforme d’agents IA",
        alt: "Page d’accueil Compute : titre blanc sur fond sombre avec arbre lumineux rose",
        t: ["Page d’accueil pour une plateforme d’exécution d’agents IA distribués.", "Fond obsidienne profond, arbre lumineux à droite, grand titre à gauche, trois métriques temps réel et un CTA blanc net."],
        crops: ["Navigation complète avec connexion et bouton blanc Déployer un agent.", "Grand titre d’affichage avec dernier mot mis en valeur par un dégradé.", "Trois indicateurs clés de performance en bas de l’écran."],
        rows: [["Menu", "Capacités, Processus, Infra, Intégrations, Sécurité"], ["Actions", "Se connecter, Déployer un agent"], ["Chiffres", "3500+ agents actifs, 99,7 % dispo, latence < 50 ms"], ["Axe design", "Ambiance sombre technique, télémétrie en direct, CTA contrasté"]]
      },
      sweet: {
        kind: "Pâtisserie artisanale",
        alt: "Page d’accueil Sweet Heaven : titre serif blanc sur fond crème avec bouton doré",
        t: ["Vitrine éditoriale pour une maison de pâtisserie artisanale.", "Palette crème et or, grand titre serif centré et un seul appel à l’action vers la collection, sans distraction superflue."],
        crops: ["Menu en capitales espacées accompagné d’un bouton doré Commander.", "Grand titre serif blanc et unique bouton vers la collection.", "Logo bicolore chocolat et or."],
        rows: [["Menu", "Accueil, Philosophie, Carte, Questions, Contact"], ["Actions", "Commander, Découvrir la collection"], ["Axe design", "Éditorial chaleureux crème & or, typographie serif intemporelle"]]
      }
    }
  },
  ja: {
    kicker: "厳選ワーク · 04 ケーススタディ",
    navAria: "プロジェクトを選択",
    stackAria: "使用技術",
    shotAria: "画像を拡大表示",
    role: "フロントエンド & UIデザイン",
    visit: "サイトを見る",
    nextLbl: "次へ：",
    closeTitle: "ディテールを見る",
    palTitle: "カラーシステム",
    palHint: "（クリックでHEXをコピー）",
    copyColor: "色をコピー",
    rowsTitle: "構成と仕様",
    allTitle: "全プロジェクト一覧 (04)",
    allSub: "4つの注目プロジェクトを比較し、ライブデモを直接開けます。",
    moreNext: "次のプロジェクト",
    moreQ: "リニューアルしたいページやプロダクトはありますか？",
    moreCta: "お問い合わせ",
    closeBtn: "閉じる",
    inspectBtn: "詳細を見る",
    zoomHint: "拡大 ↗",
    copied: "コピー完了！",
    stacks: {
      "Responsive UI": "レスポンシブUI",
      "Editorial Typography": "エディトリアル書体",
      "Conversion UI": "コンバージョンUI",
      "Product Showcase": "製品ショーケース",
      "Modern CSS": "モダンCSS",
      "Dark UI System": "ダークUI設計",
      "Interactive Layout": "対話レイアウト",
      "SaaS Landing": "SaaSランディング",
      "E-Commerce Catalog": "ECカタログ"
    },
    projects: {
      mono: {
        kind: "モジュラー住宅",
        alt: "Monoトップページ：水辺の鋼鉄建築の背後に巨大なブランド文字",
        t: ["軽量で高耐久なモジュラー住宅のランディングページ。", "画面いっぱいのブランドロゴの前に建築写真を重ね、読まなくても世界観が伝わる構成に。メニューと連絡ボタンは控えめに抑えています。"],
        crops: ["主見出しの邪魔をしないコンパクトなナビと連絡ボタン。", "巨大なディスプレイ書体の手前に立つ耐候性鋼の建築。", "水面の反射の上に置かれた端的なタグライン。"],
        rows: [["メニュー", "デザイン、ギャラリー、モデル、概要"], ["ボタン", "お問い合わせ"], ["タグライン", "軽くて丈夫、冒険へすぐ踏み出せる。"], ["デザイン要点", "圧倒的なタイポグラフィ、鋼鉄と水の対比、最小限のナビ"]]
      },
      gigi: {
        kind: "エナジードリンク",
        alt: "GiGiトップページ：力強い見出し、割引ボタン、レモンライム缶",
        t: ["Z世代向けの無糖エナジードリンク用ランディングページ。", "真っ白なキャンバスでネオンライムの缶を主役にし、凝縮された見出し・2箇所の割引CTA・4つの特長バーで即座に訴求します。"],
        crops: ["コントラストの効いた緑色の割引CTAを備えたトップバー。", "力強い見出し・簡潔な説明・役割の異なる2つのボタン。", "右側の視覚的アンカーとして映えるレモンライム缶。"],
        rows: [["メニュー", "ホーム、フレーバー、クリエイター、販売店、採用"], ["ボタン", "25%オフ、登録して25%オフ、フレーバーを見る"], ["特長", "糖類ゼロ、カフェイン7+mg、天然香料、ビタミンB豊富"], ["デザイン要点", "高いコンバージョン階層、白背景に映えるネオンアクセント"]]
      },
      compute: {
        kind: "AIエージェント基盤",
        alt: "Computeトップページ：暗色背景に白の大きな見出しとピンクに光るデジタルツリー",
        t: ["複数マシンで分散稼働するAIエージェント基盤のフロントページ。", "深い漆黒背景と右側の光るツリー、左揃えの大見出し、3つのリアルタイム性能指標、明快な白いデプロイボタンで構成しました。"],
        crops: ["ログインと高コントラストな白のデプロイボタン付きナビ。", "末尾の単語にグラデーションを効かせた大型見出し。", "画面下部に並ぶ3つの主要パフォーマンス指標。"],
        rows: [["メニュー", "機能、プロセス、インフラ、連携、セキュリティ"], ["ボタン", "ログイン、エージェントを展開"], ["性能指標", "稼働エージェント3500+、稼働率99.7%、遅延50ms未満"], ["デザイン要点", "技術的なダークモード、リアルタイム指標、明確なCTA"]]
      },
      sweet: {
        kind: "アルチザン洋菓子店",
        alt: "Sweet Heavenトップページ：クリーム背景に白のセリフ体見出しと金色ボタン",
        t: ["アルチザンケーキ＆洋菓子店のエディトリアルサイト。", "温かなクリームとゴールドを基調に、中央のクラシックなセリフ体見出しとコレクションへの単一CTAで凛とした佇まいに仕上げました。"],
        crops: ["字間を広げた大文字メニューと金色の注文ボタン。", "白い大型セリフ体見出しとコレクションへの単一ボタン。", "チョコレートとゴールドの2色ロゴ。"],
        rows: [["メニュー", "ホーム、哲学、メニュー、よくある質問、お問い合わせ"], ["ボタン", "今すぐ注文、コレクションを見る"], ["デザイン要点", "温かなクリーム＆ゴールド配色、優雅なクラシックセリフ体"]]
      }
    }
  },
  ko: {
    kicker: "주요 작품 · 04 케이스 스터디",
    navAria: "프로젝트 선택",
    stackAria: "사용 기술",
    shotAria: "전체 크기로 보기",
    role: "프론트엔드 & UI 디자인",
    visit: "사이트 보기",
    nextLbl: "다음:",
    closeTitle: "세부 살펴보기",
    palTitle: "컬러 시스템",
    palHint: "(클릭하여 HEX 복사)",
    copyColor: "색상 복사",
    rowsTitle: "페이지 구성 & 스펙",
    allTitle: "전체 프로젝트 목록 (04)",
    allSub: "네 가지 대표 프로젝트를 비교하거나 라이브 데모를 바로 열어보세요.",
    moreNext: "다음 프로젝트",
    moreQ: "새롭게 개편이 필요한 페이지나 제품이 있나요?",
    moreCta: "문의하기",
    closeBtn: "닫기",
    inspectBtn: "케이스 스터디 보기",
    zoomHint: "크게 보기 ↗",
    copied: "복사됨!",
    stacks: {
      "Responsive UI": "반응형 UI",
      "Editorial Typography": "에디토리얼 타이포",
      "Conversion UI": "전환 중심 UI",
      "Product Showcase": "제품 쇼케이스",
      "Modern CSS": "모던 CSS",
      "Dark UI System": "다크 UI 시스템",
      "Interactive Layout": "인터랙티브 레이아웃",
      "SaaS Landing": "SaaS 랜딩",
      "E-Commerce Catalog": "이커머스 카탈로그"
    },
    projects: {
      mono: {
        kind: "모듈러 하우징",
        alt: "Mono 첫 화면: 물가의 강철 건축물 뒤로 펼쳐진 초대형 브랜드 타이포그래피",
        t: ["가볍고 견고한 모듈러 주택 제품을 위한 랜딩 페이지입니다.", "브랜드 이름을 화면 가득 채우고 그 위에 건축 사진을 겹쳐 읽지 않아도 주제가 단번에 전달되게 했으며, 메뉴와 문의 버튼은 절제했습니다."],
        crops: ["제목과 경쟁하지 않도록 절제한 상단 메뉴와 문의 버튼.", "초대형 디스플레이 서체 앞에 겹쳐진 강철 건축물.", "물결 반사 위에 놓인 단 한 줄의 핵심 카피."],
        rows: [["메뉴", "디자인, 갤러리, 모델, 소개"], ["버튼", "문의"], ["핵심 문구", "가볍고 견고하며 모험에 준비된 공간."], ["디자인 포인트", "기념비적 타이포그래피, 강철과 물의 질감 대비, 미니멀 내비게이션"]]
      },
      gigi: {
        kind: "에너지 드링크",
        alt: "GiGi 첫 화면: 굵은 제목, 할인 버튼, 레몬 라임 에너지 드링크 캔",
        t: ["Z세대를 위한 제로 슈거 에너지 드링크 랜딩 페이지입니다.", "깨끗한 흰 배경으로 네온 라임 캔이 돋보이게 하고, 밀도 높은 제목과 이중 할인 버튼, 한 줄 요약 장점으로 즉각적인 행동을 유도합니다."],
        crops: ["고대비 그린 할인 버튼을 강조한 상단 바.", "강렬한 헤드라인, 짧은 설명, 역할이 다른 두 개의 버튼.", "오른쪽 시각적 중심을 잡는 레몬 라임 캔."],
        rows: [["메뉴", "홈, 플레이버, 크리에이터, 유통, 채용"], ["버튼", "25% 할인, 가입하고 25% 절약, 맛 둘러보기"], ["핵심 장점", "제로 슈거, 카페인 7+mg, 천연 향료, 풍부한 비타민 B"], ["디자인 포인트", "높은 전환율 위계, 흰 배경 위의 선명한 네온 포인트"]]
      },
      compute: {
        kind: "AI 에이전트 플랫폼",
        alt: "Compute 첫 화면: 어두운 배경 위의 흰색 대형 제목과 분홍빛 발광 트리",
        t: ["여러 머신에서 동시에 실행되는 분산 AI 에이전트 플랫폼 첫 화면입니다.", "깊은 다크 배경과 오른쪽 발광 트리, 왼쪽 대형 제목, 하단 3가지 성능 지표, 선명한 흰색 배포 버튼으로 구성했습니다."],
        crops: ["로그인과 고대비 흰색 에이전트 배포 버튼을 갖춘 상단 메뉴.", "마지막 단어에 그라데이션 포인트를 준 대형 제목.", "하단에 배치된 세 가지 핵심 성능 지표."],
        rows: [["메뉴", "기능, 프로세스, 인프라, 연동, 보안"], ["버튼", "로그인, 에이전트 배포"], ["성능 지표", "활성 에이전트 3500+, 가동률 99.7%, 지연 50ms 미만"], ["디자인 포인트", "테크니컬 다크 모드, 실시간 지표, 명확한 고대비 CTA"]]
      },
      sweet: {
        kind: "아티잔 베이커리",
        alt: "Sweet Heaven 첫 화면: 크림색 배경 위의 흰색 세리프 제목과 골드 버튼",
        t: ["아티잔 케이크 및 페이스트리 스튜디오를 위한 에디토리얼 첫 화면입니다.", "따뜻한 크림과 골드 팔레트, 중앙의 클래식 세리프 제목, 컬렉션으로 향하는 단 하나의 버튼으로 시선을 집중시켰습니다."],
        crops: ["넓은 자간의 대문자 메뉴와 골드 주문 버튼.", "큰 흰색 세리프 제목과 컬렉션으로 이어지는 단일 버튼.", "초콜릿과 골드 투톤 브랜드 로고."],
        rows: [["메뉴", "홈, 철학, 메뉴, 자주 묻는 질문, 문의"], ["버튼", "지금 주문, 컬렉션 보기"], ["디자인 포인트", "따뜻한 크림 & 골드 에디토리얼, 클래식 세리프 타이포그래피"]]
      }
    }
  }
};

var NP_URL = {
  mono: 'https://v0-mono-ecommerce.vercel.app/',
  gigi: 'https://modern-gen-z-energy-drink-landi-six-eta.vercel.app/',
  compute: 'https://compute-the-platform-to-build-psi-tan.vercel.app/',
  sweet: 'https://trynvexa.github.io/toko-kue/'
};
var npIdx = 0;

function initProjectSpatialStage() {
  var root = document.querySelector('.pg.p5');
  if (!root) return;
  var $ = function (id) { return root.querySelector('#' + id); };
  var nav = $('npNav'), view = $('npView'), nameEl = $('npName'), info = $('npInfo'), shot = $('npShot'), frame = $('npFrame'), dlg = $('npDlg');
  if (!nav || !view || !nameEl) return;
  var nwrap = root.querySelector('.nwrap');
  nav.innerHTML = ''; view.innerHTML = '';
  var cur = -1, z = 1;
  var motionOK = matchMedia('(prefers-reduced-motion: no-preference)').matches;

  function getLang() {
    var l = (window.ZK && ZK.lang) || 'id';
    return NP_I18N[l] ? l : 'id';
  }
  function getPack() {
    return NP_I18N[getLang()] || NP_I18N.id;
  }
  function trStack(pack, chip) {
    return (pack.stacks && pack.stacks[chip]) || chip;
  }

  NP_DATA.forEach(function (p, i) {
    var b = document.createElement('button');
    b.type = 'button';
    b.setAttribute('role', 'tab');
    b.innerHTML = '<span class="np-tab-no">' + p.num + '</span><span>' + p.name + '</span>';
    b.onclick = function () { go(i); };
    nav.appendChild(b);
    var m = document.createElement('img');
    m.src = p.img;
    m.alt = (getPack().projects[p.id] && getPack().projects[p.id].alt) || p.name;
    m.decoding = 'async';
    view.appendChild(m);
  });

  function watch() {
    [].forEach.call(root.querySelectorAll('.np-rv:not(.in), .np-pal:not(.in)'), function (el) {
      if (el.getBoundingClientRect().top < innerHeight * .95) el.classList.add('in');
    });
  }

  function cropEl(c, p, capText) {
    var rr = p.r.split('/'), W = +rr[0], H = +rr[1];
    var f = document.createElement('figure');
    f.className = 'np-cw' + (c.wide ? ' np-wide' : '');
    f.innerHTML = '<div class="np-crop np-rv" style="aspect-ratio:' + (c.w * W) + '/' + (c.h * H) + '"><img alt="" decoding="async" src="' + p.img + '" style="width:' + (100 / c.w) + '%;left:' + (-c.x / c.w * 100) + '%;top:' + (-c.y / c.h * 100) + '%"></div><figcaption>' + capText + '</figcaption>';
    return f;
  }

  function buildAllGrid(pack) {
    var grid = $('npAllGrid');
    if (!grid) return;
    grid.innerHTML = NP_DATA.map(function (item, idx) {
      var pOv = pack.projects[item.id];
      var kindTxt = pOv ? pOv.kind : '';
      var descTxt = pOv ? pOv.t[0] : '';
      var activeCls = idx === cur ? ' is-current' : '';
      return '<article class="np-all-card' + activeCls + '" style="--ca:' + item.a + '">' +
        '<div class="np-all-thumb" data-pick="' + idx + '">' +
          '<img src="' + item.img + '" alt="' + item.name + '" loading="lazy" decoding="async">' +
          '<span class="np-all-no">' + item.num + '</span>' +
        '</div>' +
        '<div class="np-all-body">' +
          '<div class="np-all-meta"><span>' + kindTxt + '</span><i>&bull;</i><span>' + item.year + '</span></div>' +
          '<h4>' + item.name + '</h4>' +
          '<p>' + descTxt + '</p>' +
          '<div class="np-all-tags">' + item.stack.map(function (s) { return '<span>' + trStack(pack, s) + '</span>'; }).join('') + '</div>' +
          '<div class="np-all-acts">' +
            '<button type="button" class="np-all-pick" data-pick="' + idx + '">' + pack.inspectBtn + '</button>' +
            '<a class="np-all-live" href="' + NP_URL[item.id] + '" target="_blank" rel="noopener noreferrer">' + pack.visit + ' &#8599;</a>' +
          '</div>' +
        '</div>' +
      '</article>';
    }).join('');
    [].forEach.call(grid.querySelectorAll('[data-pick]'), function (el) {
      el.onclick = function () {
        var idx = parseInt(el.getAttribute('data-pick'), 10);
        if (!isNaN(idx)) {
          go(idx);
          root.scrollTo({ top: 0, behavior: motionOK ? 'smooth' : 'auto' });
        }
      };
    });
  }

  function build(p, nx, pack) {
    var pOv = pack.projects[p.id];
    var x = NP_X[p.id], box = $('npCrops');
    box.innerHTML = '';
    x.crops.forEach(function (c, idx) {
      var cap = (pOv && pOv.crops && pOv.crops[idx]) || '';
      box.appendChild(cropEl(c, p, cap));
    });
    if (nwrap) nwrap.setAttribute('dir', getLang() === 'ar' ? 'rtl' : 'ltr');
    if (nav) nav.setAttribute('aria-label', pack.navAria);
    if ($('npStack')) $('npStack').setAttribute('aria-label', pack.stackAria);
    if (shot) shot.setAttribute('aria-label', pack.shotAria);
    var zh = root.querySelector('.np-zoom-hint');
    if (zh) zh.textContent = pack.zoomHint;
    if ($('npKicker')) $('npKicker').textContent = pack.kicker;
    if ($('npCloseTitle')) $('npCloseTitle').textContent = pack.closeTitle;
    if ($('npPalTitle')) $('npPalTitle').innerHTML = pack.palTitle + ' <small class="np-pal-hint">' + pack.palHint + '</small>';
    if ($('npRowsTitle')) $('npRowsTitle').textContent = pack.rowsTitle;
    if ($('npAllTitle')) $('npAllTitle').textContent = pack.allTitle;
    if ($('npAllSub')) $('npAllSub').textContent = pack.allSub;
    if ($('npClose')) $('npClose').textContent = pack.closeBtn;

    var palBox = $('npPal');
    palBox.classList.remove('in');
    palBox.innerHTML = x.pal.map(function (c, k) {
      return '<button type="button" class="np-sw-btn" data-hex="' + c.toUpperCase() + '" aria-label="' + pack.copyColor + ' ' + c.toUpperCase() + '"><i style="--k:' + k + ';background:' + c + '"></i><span>' + c.toUpperCase() + '</span></button>';
    }).join('');
    [].forEach.call(palBox.querySelectorAll('.np-sw-btn'), function (btn) {
      btn.onclick = function () {
        var hex = btn.getAttribute('data-hex');
        var sp = btn.querySelector('span');
        var copiedTxt = getPack().copied;
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(hex).catch(function () {});
        }
        if (sp) {
          sp.textContent = copiedTxt;
          btn.classList.add('copied');
          setTimeout(function () { sp.textContent = hex; btn.classList.remove('copied'); }, 1400);
        }
      };
    });

    var rowsData = (pOv && pOv.rows) ? pOv.rows : [];
    $('npRows').innerHTML = rowsData.map(function (r) {
      return '<div><dt>' + r[0] + '</dt><dd>' + r[1].replace(/&/g, '&amp;') + '</dd></div>';
    }).join('');
    var mo = $('npMore');
    mo.innerHTML = '<div><small>' + pack.moreNext + '</small><button type="button" class="np-nx2">' + nx.name + ' <span aria-hidden="true">\u2192</span></button></div><div class="np-cta-w"><p>' + pack.moreQ + '</p><button type="button" class="np-cta">' + pack.moreCta + '</button></div>';
    mo.querySelector('.np-nx2').onclick = function () { go(cur + 1); root.scrollTo({ top: 0, behavior: motionOK ? 'smooth' : 'auto' }); };
    mo.querySelector('.np-cta').onclick = function () { if (window.zkJumpPage) window.zkJumpPage(6); else if (window.zkGoPage) window.zkGoPage(1); };
    buildAllGrid(pack);
    setTimeout(watch, 80);
  }

  function fit() {
    if (!nameEl.isConnected) return;
    nameEl.style.removeProperty('font-size');
  }

  function go(i, force) {
    i = (i + NP_DATA.length) % NP_DATA.length;
    if (i === cur && !force) return;
    cur = npIdx = i;
    var p = NP_DATA[cur], nx = NP_DATA[(cur + 1) % NP_DATA.length];
    var pack = getPack(), pOv = pack.projects[p.id];
    root.style.setProperty('--a', p.a);
    [].forEach.call(nav.children, function (b, k) { b.setAttribute('aria-selected', k === cur); });
    view.style.aspectRatio = p.r;
    [].forEach.call(view.children, function (imgEl, idx) {
      var isAct = idx === cur;
      imgEl.classList.toggle('is-active', isAct);
      if (isAct) {
        imgEl.style.zIndex = ++z;
        imgEl.classList.remove('enter');
        void imgEl.offsetWidth;
        imgEl.classList.add('enter');
      }
    });
    var h = '', k = 0;
    p.name.split(' ').forEach(function (w) {
      h += '<span class="np-w">';
      w.split('').forEach(function (c) { h += '<span class="np-l"><i style="--k:' + (k++) + '">' + c + '</i></span>'; });
      h += '</span>';
    });
    nameEl.innerHTML = h;
    nameEl.setAttribute('aria-label', p.name);
    var metaBar = $('npMetaBar');
    if (metaBar) {
      metaBar.innerHTML = '<span class="np-badge-num">' + p.num + ' / 04</span><span class="np-badge-role">' + pack.role + '</span><span class="np-badge-yr">' + p.year + '</span>';
    }
    var stackEl = $('npStack');
    if (stackEl) {
      stackEl.innerHTML = p.stack.map(function (s) { return '<span class="np-chip">' + trStack(pack, s) + '</span>'; }).join('');
    }
    var urlPill = $('npUrlPill');
    if (urlPill) urlPill.textContent = p.domain;
    var kindTxt = pOv ? pOv.kind : '';
    var t0 = pOv ? pOv.t[0] : '';
    var t1 = pOv ? pOv.t[1] : '';
    info.innerHTML = '<h2>' + kindTxt + '</h2><p>' + t0 + '</p><p>' + t1 + '</p><div class="np-act-row"><a class="np-visit" href="' + NP_URL[p.id] + '" target="_blank" rel="noopener noreferrer">' + pack.visit + ' <span aria-hidden="true">\u2197</span></a><button type="button" class="np-next" id="npNx">' + pack.nextLbl + ' ' + nx.name + ' \u2192</button></div>';
    $('npNx').onclick = function () { go(cur + 1); };
    $('npBig').src = p.img;
    $('npBig').alt = (pOv && pOv.alt) || p.name;
    build(p, nx, pack);
    fit();
  }

  go(npIdx, true);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fit);
  setTimeout(fit, 350);
  if (!window.__npResize) {
    window.__npResize = true;
    window.addEventListener('zk-lang', function () {
      if (document.querySelector('.pg.p5')) initProjectSpatialStage();
    });
  }

  if (motionOK && matchMedia('(pointer: fine)').matches) {
    shot.onpointermove = function (e) {
      var rect = shot.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      var nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      var ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      frame.style.setProperty('--ry', (nx * 4.5).toFixed(2) + 'deg');
      frame.style.setProperty('--rx', (-ny * 3.5).toFixed(2) + 'deg');
    };
    shot.onpointerleave = function () {
      frame.style.setProperty('--ry', '0deg');
      frame.style.setProperty('--rx', '0deg');
    };
  }

  var tk = 0;
  var sc = function () {
    tk = 0;
    var h = root.scrollHeight - root.clientHeight, pr = $('npProg');
    watch();
    if (pr) pr.style.setProperty('--pr', h > 0 ? (root.scrollTop / h).toFixed(4) : 0);
    if (motionOK) {
      var r = shot.getBoundingClientRect(), t = Math.min(1, Math.max(0, (innerHeight - r.top) / (innerHeight * .9)));
      frame.style.setProperty('--sc', (.95 + .05 * t).toFixed(3));
    }
  };
  root.onscroll = function () { if (!tk) tk = requestAnimationFrame(sc); };
  sc();
  var sx = null, mv = false;
  shot.onpointerdown = function (e) { sx = e.clientX; mv = false; };
  shot.onpointerup = function (e) {
    if (sx === null) return;
    var d = e.clientX - sx;
    sx = null;
    if (Math.abs(d) > 50) { mv = true; go(cur + (d < 0 ? 1 : -1)); }
  };
  shot.onclick = function () { if (mv) { mv = false; return; } if (dlg.showModal) dlg.showModal(); };
  $('npClose').onclick = function () { dlg.close(); };
  dlg.onclick = function (e) { if (e.target === dlg || e.target.id === 'npBig') dlg.close(); };
}
