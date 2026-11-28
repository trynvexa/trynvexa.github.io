/* ==========================================================================
   js/food-data.js — Card #10: "Food" v2 (TASTE LAB — Zikri's Favourite Food)
   Catalog of 5 dishes, high-contrast pastel palettes, marble ring & prop
   geometry, 72-frame WebP scroll-scrubbed video metadata, and 4 chronological
   editorial narrative beats localized across 8 languages (id, en, zh, es, ar,
   fr, ja, ko).
   ========================================================================== */
(function () {
  "use strict";

  var FRAME_COUNT = 72;

  var RING = {
    src: "assets/food/ring/marble-ring.webp",
    size: 1024,
    cx: 507.5,
    cy: 502.5,
    ro: 462.5,
    ri: 354,
    band: 0.8827,
  };

  // Every turntable dish is rim-normalized to R=450px (diameter 900px) on a 1024x1024 canvas
  var COUPE_FILL = 900 / 1024;

  // 5 static table props framing the draggable marble turntable
  var PROPS = [
    {
      key: "chopsticks",
      src: "assets/food/props/chopsticks.webp",
      desktop: [-34, 168, 210, -14],
      portrait: [-46, 150, 114, -14, "bowl"],
    },
    {
      key: "chili-lime",
      src: "assets/food/props/chili-lime.webp",
      desktop: [34, 340, 128, 0],
      portrait: [-24, 250, 76, 0, "bowl"],
    },
    {
      key: "herbs-tomato",
      src: "assets/food/props/herbs-tomato.webp",
      desktop: [1238, 360, 174, 0],
      portrait: [310, 170, 98, 0, "bowl"],
    },
    {
      key: "fork",
      src: "assets/food/props/fork.webp",
      desktop: [86, 760, 210, 0],
      portrait: [-44, 62, 150, 0, "title"],
    },
    {
      key: "spoon",
      src: "assets/food/props/spoon.webp",
      desktop: [1146, 760, 210, 0],
      portrait: [284, 62, 150, 0, "title"],
    },
  ];

  var DISHES = [
    {
      id: 0,
      slug: "ramen",
      lines: ["TONKOTSU /", "RAMEN"],
      fullName: "TONKOTSU RAMEN",
      bg: "#EED9C4",
      ink: "#322018",
      videoBg: "#C8B99C",
      videoBgBottom: "#DCD0B9",
      dishSrc: "assets/food/dishes/ramen.webp",
      framesDir: "assets/food/frames/ramen",
      beats: [
        {
          start: 0.0,
          end: 0.24,
          side: "left",
          texts: {
            id: {
              kicker: "01 · KALDU TONKOTSU",
              title: "Mangkuk Hitam & Tuangan Emas",
              body: "Dimulai dari mangkuk keramik hitam berbingkai emas yang langsung diisi kaldu tonkotsu kental hangat beraroma gurih mendalam.",
            },
            en: {
              kicker: "01 · TONKOTSU BROTH",
              title: "Matte Bowl & Creamy Pour",
              body: "It begins with a gold-rimmed matte black ceramic bowl receiving a velvety, slow-simmered tonkotsu broth.",
            },
            zh: {
              kicker: "01 · 豚骨高汤",
              title: "黑釉瓷碗与浓郁浇汤",
              body: "从金边哑光黑瓷碗开始，温热浓稠的豚骨高汤顺势倾入，激起细腻奶香。",
            },
            es: {
              kicker: "01 · CALDO TONKOTSU",
              title: "Cuenco Negro y Vertido Cremoso",
              body: "Todo comienza en un cuenco negro mate con borde dorado donde cae el caldo tonkotsu espeso y humeante.",
            },
            ar: {
              kicker: "01 · مرق تونكوتسو",
              title: "وعاء أسود ومرق كريمي دافئ",
              body: "تبدأ الحكاية بوعاء خزفي أسود بحافة ذهبية يستقبل مرق التونكوتسو الكثيف والغني بالنكهة.",
            },
            fr: {
              kicker: "01 · BOUILLON TONKOTSU",
              title: "Bol Noir & Coulée Veloutée",
              body: "Tout commence dans un bol noir mat bordé d’or où se déverse un bouillon tonkotsu onctueux et fumant.",
            },
            ja: {
              kicker: "01 · 豚骨スープ",
              title: "黒器に注ぐ濃厚白湯",
              body: "金縁のマットな黒丼に、じっくり炊き出したクリーミーな豚骨スープが静かに満ちていく。",
            },
            ko: {
              kicker: "01 · 돈코츠 육수",
              title: "블랙 보울과 진한 육수",
              body: "골드 림 매트 블랙 그릇에 진하고 부드러운 돈코츠 육수가 천천히 채워지며 시작됩니다.",
            },
          },
        },
        {
          start: 0.24,
          end: 0.52,
          side: "right",
          texts: {
            id: {
              kicker: "02 · MIE & CHASHU",
              title: "Cipratan Pelan Mie Kenyal",
              body: "Gulungan mie ramen al-dente dan irisan chashu panggang mendarat perlahan, menciptakan riak lembut di permukaan kaldu.",
            },
            en: {
              kicker: "02 · NOODLES & CHASHU",
              title: "Slow-Motion Splash",
              body: "Springy folded noodles and torched chashu slices drop straight into the broth, sending gentle golden ripples outward.",
            },
            zh: {
              kicker: "02 · 拉面与叉烧",
              title: "慢镜落碗与高汤涟漪",
              body: "弹牙拉面与炙烤叉烧缓缓落入汤中，在浓白汤面荡开层层金色波纹。",
            },
            es: {
              kicker: "02 · FIDEOS Y CHASHU",
              title: "Caída en Cámara Lenta",
              body: "Los fideos elásticos y las láminas de chashu dorado aterrizan en el caldo levantando delicadas ondas.",
            },
            ar: {
              kicker: "02 · النودلز والتشاشو",
              title: "هبوط بطيء في المرق",
              body: "تنزل النودلز المرنة وشرائح التشاشو المشوي برفق لتصنع تموجات ذهبية على سطح المرق.",
            },
            fr: {
              kicker: "02 · NOUILLES & CHASHU",
              title: "Plongée au Ralenti",
              body: "Les nouilles fermes et le chashu saisi plongent doucement dans le bouillon en créant de fines vagues dorées.",
            },
            ja: {
              kicker: "02 · 麺とチャーシュー",
              title: "スープに沈む旨みの層",
              body: "コシのある細麺と炙りチャーシューがゆっくり着水し、スープの表面に柔らかな波紋が広がる。",
            },
            ko: {
              kicker: "02 · 면과 차슈",
              title: "슬로우 모션 스플래시",
              body: "탱글한 라멘 면과 불향 입힌 차슈가 육수 위로 떨어지며 부드러운 물결을 일으킵니다.",
            },
          },
        },
        {
          start: 0.52,
          end: 0.77,
          side: "left",
          texts: {
            id: {
              kicker: "03 · TOPPING KLASIK",
              title: "Telur Lumer, Nori & Daun Bawang",
              body: "Telur ajitama setengah matang, lembaran nori renyah, narutomaki, dan taburan daun bawang berjatuhan membentuk komposisi sempurna.",
              tags: ["Telur Ajitama", "Nori Panggang", "Narutomaki", "Daun Bawang"],
            },
            en: {
              kicker: "03 · SIGNATURE TOPPINGS",
              title: "Ajitama, Nori & Scallion Rain",
              body: "Jammy halved ajitama eggs, crisp roasted nori, pink-swirl narutomaki, and fresh scallions cascade into place.",
              tags: ["Ajitama Egg", "Roasted Nori", "Narutomaki", "Scallions"],
            },
            zh: {
              kicker: "03 · 经典配料",
              title: "溏心蛋、海苔与葱花雨",
              body: "流心溏心蛋、酥脆烤海苔、鸣门卷与翠绿葱花依次飘落，勾勒出层次分明的拉面构图。",
              tags: ["溏心蛋", "烤海苔", "鸣门卷", "新鲜葱花"],
            },
            es: {
              kicker: "03 · TOPPINGS CLÁSICOS",
              title: "Ajitama, Nori y Lluvia de Cebollín",
              body: "Huevos ajitama cremosos, nori crujiente, narutomaki y cebollín fresco caen en perfecta armonía.",
              tags: ["Huevo Ajitama", "Nori Tostado", "Narutomaki", "Cebollín"],
            },
            ar: {
              kicker: "03 · الإضافات الكلاسيكية",
              title: "بيض أجيتاما ونوري وبصل أخضر",
              body: "تتساقط أنصاف بيض الأجيتاما الكريمي وأوراق النوري المحمصة والناروتوماكي والبصل الأخضر بتناغم مثالي.",
              tags: ["بيض أجيتاما", "نوري محمص", "ناروتوماكي", "بصل أخضر"],
            },
            fr: {
              kicker: "03 · GARNITURES CLASSIQUES",
              title: "Ajitama, Nori & Pluie de Ciboule",
              body: "Œufs ajitama coulants, feuilles de nori grillées, narutomaki et ciboule fraîche complètent le tableau.",
              tags: ["Œuf Ajitama", "Nori Grillé", "Narutomaki", "Ciboule"],
            },
            ja: {
              kicker: "03 · 仕上げの具材",
              title: "味玉・海苔・ねぎの彩り",
              body: "半熟の味玉、香ばしい焼き海苔、なると巻き、そして刻みねぎが舞い降りて一杯を完成させる。",
              tags: ["半熟味玉", "焼き海苔", "なると巻き", "刻みねぎ"],
            },
            ko: {
              kicker: "03 · 시그니처 토핑",
              title: "아지타마, 김 & 파 토핑",
              body: "반숙 아지타마 계란, 바삭한 구운 김, 나루토마키와 송송 썬 파가 내려앉아 균형을 완성합니다.",
              tags: ["아지타마 계란", "구운 김", "나루토마키", "송송 썬 파"],
            },
          },
        },
        {
          start: 0.77,
          end: 1.0,
          side: "right",
          texts: {
            id: {
              kicker: "04 · CATATAN ZIKRI",
              title: "Comfort Food Nomor Satu",
              body: "Uap hangat mengepul pelan dari kaldu kaya rasa—semangkuk ramen yang selalu berhasil mengisi ulang energi setelah sesi ngoding panjang.",
            },
            en: {
              kicker: "04 · ZIKRI’S NOTE",
              title: "The Ultimate Comfort Bowl",
              body: "Soft steam rises from the finished bowl—the one deeply savoury comfort meal that always resets my energy after a long design sprint.",
            },
            zh: {
              kicker: "04 · ZIKRI 的味觉笔记",
              title: "永远的头号治愈美食",
              body: "氤氲热气缓缓升起——每次通宵写完代码，这一碗浓郁暖胃的拉面总能让我瞬间满血复活。",
            },
            es: {
              kicker: "04 · NOTA DE ZIKRI",
              title: "Mi Plato Reconfortante #1",
              body: "El vapor sube suavemente desde el cuenco listo: la comida reconfortante perfecta tras una larga sesión diseñando y programando.",
            },
            ar: {
              kicker: "04 · ملاحظة زكري",
              title: "وجبة الراحة الأولى دائماً",
              body: "يتصاعد البخار الدافئ من الطبق المكتمل — الوجبة التي تعيد لي طاقتي دائماً بعد جلسات التصميم والبرمجة الطويلة.",
            },
            fr: {
              kicker: "04 · NOTE DE ZIKRI",
              title: "Le Plat Réconfort Ultime",
              body: "Une vapeur douce s’élève du bol terminé — le réconfort absolu qui recharge toujours mon énergie après un long sprint de code.",
            },
            ja: {
              kicker: "04 · ジクリのひとこと",
              title: "何度でも食べたい至福の一杯",
              body: "立ち上る湯気と濃厚な香り。長い制作のあとに心をほどいてくれる、僕にとって不動のナンバーワン。",
            },
            ko: {
              kicker: "04 · 지크리의 노트",
              title: "언제나 1순위 소울푸드",
              body: "따뜻한 김이 피어오르는 완성된 한 그릇. 긴 코딩 작업 끝에 늘 에너지를 채워주는 최고의 메뉴입니다.",
            },
          },
        },
      ],
    },
    {
      id: 1,
      slug: "steak",
      lines: ["GRILLED /", "STEAK"],
      fullName: "GRILLED STEAK",
      bg: "#C9D7EA",
      ink: "#182942",
      videoBg: "#708793",
      videoBgBottom: "#A6BAC6",
      dishSrc: "assets/food/dishes/steak.webp",
      framesDir: "assets/food/frames/steak",
      beats: [
        {
          start: 0.0,
          end: 0.24,
          side: "left",
          texts: {
            id: {
              kicker: "01 · PANGGANGAN MEDIUM-RARE",
              title: "Irisan Ribeye & Kentang Panggang",
              body: "Piring keramik biru tua menyambut kentang panggang keemasan, tomat ceri manis, dan irisan steak medium-rare yang juicy.",
            },
            en: {
              kicker: "01 · MEDIUM-RARE SEAR",
              title: "Ribeye Slices & Golden Potatoes",
              body: "A deep navy ceramic plate greets roasted golden potatoes, blistered cherry tomatoes, and juicy medium-rare seared steak.",
            },
            zh: {
              kicker: "01 · 炭烤三分熟",
              title: "厚切牛排与金黄烤土豆",
              body: "深蓝瓷盘上依次铺开焦香烤土豆、炙烤樱桃番茄与汁水丰盈的炭烤牛排切片。",
            },
            es: {
              kicker: "01 · SELLADO AL PUNTO",
              title: "Láminas Jugosas y Papas Doradas",
              body: "El plato azul marino recibe papas asadas crujientes, tomates cherry dulces y cortes jugosos de carne a la parrilla.",
            },
            ar: {
              kicker: "01 · شواء مثالي",
              title: "شرائح الستيك والبطاطس المشوية",
              body: "يستقبل الطبق الكحلي البطاطس الذهبية المشوية والطماطم الكرزية وشرائح الستيك الطرية المشوية بعناية.",
            },
            fr: {
              kicker: "01 · SAISIE SAIGNANTE",
              title: "Tranches de Bœuf & Pommes Rôties",
              body: "L’assiette bleu nuit accueille pommes de terre rôties, tomates cerises confites et tranches de steak saisies à point.",
            },
            ja: {
              kicker: "01 · ミディアムレア",
              title: "香ばしい焼き目と付け合わせ",
              body: "深いネイビーの皿に、黄金色のローストポテトと甘いミニトマト、肉汁あふれるステーキが並ぶ。",
            },
            ko: {
              kicker: "01 · 미디엄 레어",
              title: "육즙 가득 스테이크와 구운 감자",
              body: "네이비 세라믹 접시 위에 노릇한 구운 감자, 방울토마토, 그리고 육즙 가득한 스테이크 슬라이스가 자리 잡습니다.",
            },
          },
        },
        {
          start: 0.24,
          end: 0.52,
          side: "right",
          texts: {
            id: {
              kicker: "02 · SAUS DEMI-GLACE",
              title: "Siraman Pita Cokelat Mengilap",
              body: "Aliran saus demi-glace gelap mengilap jatuh tepat dari atas, melapisi setiap guratan panggangan dengan rasa gurih pekat.",
            },
            en: {
              kicker: "02 · DEMI-GLACE POUR",
              title: "Glossy Dark Ribbon",
              body: "A thick ribbon of dark demi-glace pours straight from above, lacquering every charred grill mark in rich savoury depth.",
            },
            zh: {
              kicker: "02 · 秘制褐酱",
              title: "丝滑亮泽的酱汁浇淋",
              body: "浓郁透亮的黑椒褐酱自上而下缓缓浇落，温柔包裹每一片焦香肉纹。",
            },
            es: {
              kicker: "02 · SALSA DEMI-GLACE",
              title: "Cinta Oscura y Brillante",
              body: "Un hilo espeso de demi-glace cae desde lo alto, cubriendo cada marca de parrilla con brillo y profundidad.",
            },
            ar: {
              kicker: "02 · صلصة ديمي غلاس",
              title: "انسياب داكن لامع",
              body: "تنساب صلصة ديمي غلاس الداكنة اللامعة من الأعلى لتغلف كل شريحة بطبقة غنية وعميقة المذاق.",
            },
            fr: {
              kicker: "02 · SAUCE DEMI-GLACE",
              title: "Ruban Sombre & Brillant",
              body: "Un généreux ruban de demi-glace s’écoule d’en haut, nappant chaque tranche d’un éclat profond et savoureux.",
            },
            ja: {
              kicker: "02 · デミグラスソース",
              title: "艶やかに落ちる濃厚ソース",
              body: "深いコクのデミグラスソースが真上から注がれ、香ばしい焼き目を艶やかに包み込む。",
            },
            ko: {
              kicker: "02 · 데미글라스 소스",
              title: "윤기 흐르는 진한 소스",
              body: "깊고 진한 데미글라스 소스가 위에서 부드럽게 흘러내리며 그릴 자국마다 깊은 풍미를 입힙니다.",
            },
          },
        },
        {
          start: 0.52,
          end: 0.77,
          side: "left",
          texts: {
            id: {
              kicker: "03 · AROMA HERBA",
              title: "Lelehan Mentega Bawang & Rosemary",
              body: "Kepingan garlic herb butter mendarat di puncak daging panas, diikuti tangkai rosemary segar dan taburan lada hitam utuh.",
              tags: ["Garlic Butter", "Rosemary Segar", "Lada Hitam", "Tomat Ceri"],
            },
            en: {
              kicker: "03 · AROMATIC FINISH",
              title: "Melting Herb Butter & Rosemary",
              body: "A pat of compound garlic herb butter lands right on the warm sear, finished with fresh rosemary sprigs and cracked peppercorns.",
              tags: ["Garlic Butter", "Fresh Rosemary", "Black Pepper", "Blistered Tomato"],
            },
            zh: {
              kicker: "03 · 香草点睛",
              title: "蒜香黄油与迷迭香飘落",
              body: "一块蒜香香草黄油轻落于滚烫牛排之上开始融化，新鲜迷迭香与黑胡椒粒随势点缀。",
              tags: ["蒜香黄油", "新鲜迷迭香", "黑胡椒粒", "烤樱桃番茄"],
            },
            es: {
              kicker: "03 · TOQUE AROMÁTICO",
              title: "Mantequilla Fundida y Romero",
              body: "La mantequilla de ajo y hierbas se funde sobre el corte caliente junto a ramas de romero fresco y pimienta negra.",
              tags: ["Mantequilla de Ajo", "Romero Fresco", "Pimienta Negra", "Tomate Asado"],
            },
            ar: {
              kicker: "03 · اللمسة العطرية",
              title: "زبدة الثوم وإكليل الجبل",
              body: "تستقر قطعة زبدة الثوم والأعشاب فوق الستيك الساخن لتذوب برفق مع أغصان إكليل الجبل وحبات الفلفل الأسود.",
              tags: ["زبدة الثوم", "إكليل الجبل", "فلفل أسود", "طماطم مشوية"],
            },
            fr: {
              kicker: "03 · FINITION AROMATIQUE",
              title: "Beurre Fondant & Romarin",
              body: "Une noix de beurre à l’ail fond sur la viande chaude, couronnée de romarin frais et de grains de poivre noir.",
              tags: ["Beurre à l’Ail", "Romarin Frais", "Poivre Noir", "Tomates Rôties"],
            },
            ja: {
              kicker: "03 · 香りの仕上げ",
              title: "とろけるバターとローズマリー",
              body: "熱々の肉の上でガーリックハーブバターがゆっくり溶け、フレッシュなローズマリーと黒胡椒が香りを引き立てる。",
              tags: ["ガーリックバター", "ローズマリー", "粗挽き黒胡椒", "焼きトマト"],
            },
            ko: {
              kicker: "03 · 허브 피니시",
              title: "녹아내리는 버터와 로즈마리",
              body: "따뜻한 스테이크 위에서 갈릭 허브 버터가 천천히 녹아들고, 생 로즈마리와 통후추가 향을 더합니다.",
              tags: ["갈릭 버터", "생 로즈마리", "통후추", "구운 방울토마토"],
            },
          },
        },
        {
          start: 0.77,
          end: 1.0,
          side: "right",
          texts: {
            id: {
              kicker: "04 · CATATAN ZIKRI",
              title: "Menu Selebrasi Terbaik",
              body: "Aroma smoky panggangan berpadu mentega hangat—hidangan spesial pilihan saya setiap kali berhasil meluncurkan proyek baru.",
            },
            en: {
              kicker: "04 · ZIKRI’S NOTE",
              title: "The Celebration Plate",
              body: "Smoky char meets melting butter and dark glaze—my go-to reward dinner whenever a big release ships cleanly.",
            },
            zh: {
              kicker: "04 · ZIKRI 的味觉笔记",
              title: "庆祝时刻的首选",
              body: "炭火烟熏香融合融化黄油与浓郁酱汁，每次重要项目顺利上线，它就是我的最佳犒劳。",
            },
            es: {
              kicker: "04 · NOTA DE ZIKRI",
              title: "El Plato de Celebración",
              body: "Aroma ahumado, mantequilla derretida y brillo intenso: mi cena favorita para celebrar cada lanzamiento importante.",
            },
            ar: {
              kicker: "04 · ملاحظة زكري",
              title: "طبق الاحتفال المفضل",
              body: "نكهة الشواء المدخنة مع الزبدة الذائبة والصلصة الداكنة — مكافأتي المفضلة كلما أنجزت إطلاق مشروع جديد بنجاح.",
            },
            fr: {
              kicker: "04 · NOTE DE ZIKRI",
              title: "L’Assiette des Grandes Occasions",
              body: "Notes fumées, beurre fondant et sauce intense — mon repas de célébration à chaque mise en ligne réussie.",
            },
            ja: {
              kicker: "04 · ジクリのひとこと",
              title: "節目を祝うご褒美の一皿",
              body: "香ばしい炭の香りと溶け合うバター。大きなプロジェクトをリリースした夜に選びたい特別な一皿。",
            },
            ko: {
              kicker: "04 · 지크리의 노트",
              title: "성취를 축하하는 한 접시",
              body: "은은한 불향과 녹아든 버터의 조화. 큰 프로젝트를 성공적으로 마쳤을 때 꼭 찾는 특별한 메뉴입니다.",
            },
          },
        },
      ],
    },
    {
      id: 2,
      slug: "ayam-geprek",
      lines: ["AYAM /", "GEPREK"],
      fullName: "AYAM GEPREK",
      bg: "#F4CCB8",
      ink: "#4D1E10",
      videoBg: "#BF9270",
      videoBgBottom: "#DBB28E",
      dishSrc: "assets/food/dishes/ayam-geprek.webp",
      framesDir: "assets/food/frames/ayam-geprek",
      beats: [
        {
          start: 0.0,
          end: 0.24,
          side: "left",
          texts: {
            id: {
              kicker: "01 · NASI HANGAT",
              title: "Piring Terakota & Bawang Goreng",
              body: "Piring keramik hangat terakota diisi kepulan nasi putih pulen lengkap dengan taburan bawang goreng renyah harum.",
            },
            en: {
              kicker: "01 · STEAMING RICE",
              title: "Terracotta Plate & Crisp Shallots",
              body: "A warm terracotta ceramic plate opens with a freshly molded dome of fluffy steamed rice crowned with crispy fried shallots.",
            },
            zh: {
              kicker: "01 · 热气白米饭",
              title: "陶土餐盘与香酥炸葱",
              body: "暖色调陶土餐盘率先盛上松软热米饭，表面洒满金黄香脆的油炸红葱酥。",
            },
            es: {
              kicker: "01 · ARROZ HUMEANTE",
              title: "Plato Terracota y Chalota Crujiente",
              body: "El plato de cerámica terracota recibe arroz blanco recién hecho coronado con chalotas fritas doradas.",
            },
            ar: {
              kicker: "01 · أرز ساخن",
              title: "طبق فخاري وبصل مقلي مقرمش",
              body: "يبدأ الطبق الفخاري الدافئ بقبّة من الأرز الأبيض الساخن المزيّن بشرائح البصل المقلي الذهبي.",
            },
            fr: {
              kicker: "01 · RIZ FUMANT",
              title: "Assiette Terracotta & Échalotes",
              body: "L’assiette en céramique terracotta s’ouvre sur un dôme de riz vapeur parfumé d’échalotes frites croustillantes.",
            },
            ja: {
              kicker: "01 · 炊きたてご飯",
              title: "テラコッタ皿と香ばしフライドオニオン",
              body: "温かみのあるテラコッタの皿に、湯気立つ白ご飯とカリッと揚げたシャロットが美しく盛られる。",
            },
            ko: {
              kicker: "01 · 따뜻한 밥",
              title: "테라코타 접시와 바삭한 샬롯",
              body: "따뜻한 테라코타 접시 위에 고슬고슬한 흰쌀밥과 바삭하게 튀긴 샬롯이 먼저 놓입니다.",
            },
          },
        },
        {
          start: 0.24,
          end: 0.52,
          side: "right",
          texts: {
            id: {
              kicker: "02 · AYAM KRISPI",
              title: "Jatuh Renyah & Remah Keemasan",
              body: "Potongan ayam goreng krispi yang baru digeprek meluncur turun dengan remah tepung keemasan yang berhamburan renyah.",
            },
            en: {
              kicker: "02 · CRISPY SMASHED CHICKEN",
              title: "Golden Crunch in Mid-Air",
              body: "Freshly smashed fried chicken drops onto the plate with shatteringly crisp golden crumbs scattering in slow motion.",
            },
            zh: {
              kicker: "02 · 香脆炸鸡",
              title: "金黄酥屑凌空飞散",
              body: "刚压酥的黄金脆皮炸鸡从高处落下，酥脆面衣与金黄碎屑在慢镜头中四溅。",
            },
            es: {
              kicker: "02 · POLLO CRUJIENTE",
              title: "Crujido Dorado en el Aire",
              body: "El pollo frito recién aplastado cae sobre el plato rodeado de migas doradas y crujientes en cámara lenta.",
            },
            ar: {
              kicker: "02 · دجاج مقرمش",
              title: "قرمشة ذهبية في الهواء",
              body: "يهبط الدجاج المقلي المقرمش على الطبق وسط تطاير الفتات الذهبي المقرمش بحركة بطيئة آسرة.",
            },
            fr: {
              kicker: "02 · POULET CROUSTILLANT",
              title: "Pluie de Miettes Dorées",
              body: "Le poulet frit fraîchement écrasé atterrit sur l’assiette dans un nuage de miettes dorées ultra-croustillantes.",
            },
            ja: {
              kicker: "02 · クリスピーチキン",
              title: "弾ける黄金の衣",
              body: "ザクッと潰した揚げたてのチキンが落ち、黄金色の衣の粒がスローモーションで舞い散る。",
            },
            ko: {
              kicker: "02 · 크리스피 치킨",
              title: "흩날리는 황금빛 튀김옷",
              body: "갓 으깬 바삭한 프라이드 치킨이 접시로 내려앉으며 황금빛 크럼블이 슬로우 모션으로 흩날립니다.",
            },
          },
        },
        {
          start: 0.52,
          end: 0.77,
          side: "left",
          texts: {
            id: {
              kicker: "03 · SAMBAL BAWANG",
              title: "Pedas Nampol, Timun & Kemangi",
              body: "Sambal geprek merah menyala mendarat mantap di atas ayam, diimbangi kesegaran irisan timun renyah dan daun kemangi wangi.",
              tags: ["Sambal Geprek", "Bawang Putih", "Timun Segar", "Daun Kemangi"],
            },
            en: {
              kicker: "03 · FIERY SAMBAL",
              title: "Crushed Chili, Cucumber & Kemangi",
              body: "Vibrant red garlic-chili sambal blankets the crust, balanced by cool sliced cucumber and fragrant lemon-basil kemangi leaves.",
              tags: ["Chili Sambal", "Crispy Crust", "Fresh Cucumber", "Kemangi Basil"],
            },
            zh: {
              kicker: "03 · 灵魂蒜蓉辣酱",
              title: "现捣红椒酱、黄瓜与罗勒",
              body: "鲜红火辣的手捣蒜蓉辣酱铺满炸鸡表面，清脆黄瓜片与柠檬罗勒叶恰到好处地平衡辣度。",
              tags: ["手捣辣酱", "蒜香脆皮", "清爽黄瓜", "柠檬罗勒"],
            },
            es: {
              kicker: "03 · SAMBAL PICANTE",
              title: "Chile Machacado, Pepino y Kemangi",
              body: "El sambal rojo intenso cubre el pollo crujiente, equilibrado por rodajas frescas de pepino y aromática albahaca kemangi.",
              tags: ["Sambal de Ajo", "Pollo Crujiente", "Pepino Fresco", "Kemangi"],
            },
            ar: {
              kicker: "03 · سامبال الفلفل الحار",
              title: "حرارة السامبال مع الخيار والريحان",
              body: "يغطي سامبال الفلفل والثوم الأحمر القشرة المقرمشة، وتوازنه شرائح الخيار المنعشة وأوراق ريحان الكيمانجي العطرية.",
              tags: ["سامبال حار", "قشرة مقرمشة", "خيار طازج", "ريحان كيمانجي"],
            },
            fr: {
              kicker: "03 · SAMBAL PIMENTÉ",
              title: "Piment Pilé, Concombre & Basilic",
              body: "Un sambal rouge vibrant à l’ail nappe la panure, équilibré par le croquant du concombre et la fraîcheur du kemangi.",
              tags: ["Sambal Pimenté", "Panure Dorée", "Concombre Frais", "Basilic Kemangi"],
            },
            ja: {
              kicker: "03 · 激辛サンバル",
              title: "にんにく唐辛子と爽やかハーブ",
              body: "真っ赤な手作りサンバルが衣を彩り、みずみずしいキュウリと香り高いケマンギが後味を引き締める。",
              tags: ["手作りサンバル", "ザクザク衣", "新鮮きゅうり", "ケマンギ"],
            },
            ko: {
              kicker: "03 · 매콤한 삼발",
              title: "마늘 고추 삼발, 오이 & 케망이",
              body: "강렬한 붉은 마늘 삼발이 치킨 위를 덮고, 아삭한 오이와 향긋한 케망이 잎이 산뜻한 균형을 더합니다.",
              tags: ["마늘 삼발", "바삭한 치킨", "신선한 오이", "케망이 바질"],
            },
          },
        },
        {
          start: 0.77,
          end: 1.0,
          side: "right",
          texts: {
            id: {
              kicker: "04 · CATATAN ZIKRI",
              title: "Juara Harian Kebanggaan Lokal",
              body: "Renyah, pedas, gurih, dan bikin nagih—menu wajib anak kuliahan dan developer Indonesia yang nggak pernah salah kapan pun dimakan.",
            },
            en: {
              kicker: "04 · ZIKRI’S NOTE",
              title: "Indonesian Everyday Champion",
              body: "Shattering crunch, garlicky heat, and steaming rice—the iconic Indonesian comfort plate that never misses at any hour.",
            },
            zh: {
              kicker: "04 · ZIKRI 的味觉笔记",
              title: "百吃不厌的印尼国民美味",
              body: "酥脆、火辣、米香交织——无论白天还是深夜，这道最具代表性的印尼日常美食永远不会出错。",
            },
            es: {
              kicker: "04 · NOTA DE ZIKRI",
              title: "El Clásico Indispensable de Casa",
              body: "Crujiente, picante y reconfortante: el plato indonesio de todos los días que nunca falla a ninguna hora.",
            },
            ar: {
              kicker: "04 · ملاحظة زكري",
              title: "بطل المائدة الإندونيسية اليومي",
              body: "قرمشة وحرارة وثوم وأرز ساخن — الطبق الإندونيسي الأصيل الذي لا يخيب الظن في أي وقت من اليوم.",
            },
            fr: {
              kicker: "04 · NOTE DE ZIKRI",
              title: "Le Champion du Quotidien",
              body: "Croustillant, pimenté et généreux — l’incontournable classique indonésien qui vise toujours juste à toute heure.",
            },
            ja: {
              kicker: "04 · ジクリのひとこと",
              title: "毎日食べたくなる地元の味",
              body: "ザクザク食感とガツンと効いた辛さ。いつでも裏切らない、インドネシアが誇る日常の最強メニュー。",
            },
            ko: {
              kicker: "04 · 지크리의 노트",
              title: "언제 먹어도 완벽한 로컬 최애",
              body: "바삭함과 매콤함, 따뜻한 밥의 조합. 언제 먹어도 실패 없는 인도네시아 대표 데일리 메뉴입니다.",
            },
          },
        },
      ],
    },
    {
      id: 3,
      slug: "spaghetti",
      lines: ["SPAGHETTI /", "MEATBALLS"],
      fullName: "SPAGHETTI MEATBALLS",
      bg: "#CBDCC8",
      ink: "#1D3523",
      videoBg: "#94A685",
      videoBgBottom: "#A8BA9F",
      dishSrc: "assets/food/dishes/spaghetti.webp",
      framesDir: "assets/food/frames/spaghetti",
      beats: [
        {
          start: 0.0,
          end: 0.24,
          side: "left",
          texts: {
            id: {
              kicker: "01 · PASTA AL-DENTE",
              title: "Mangkuk Sage & Pusaran Spaghetti",
              body: "Gulungan rapi spaghetti keemasan al-dente mendarat halus di tengah mangkuk keramik hijau sage yang bersih.",
            },
            en: {
              kicker: "01 · AL-DENTE BASE",
              title: "Sage Bowl & Twirled Spaghetti",
              body: "A tall nest of golden al-dente spaghetti lowers gracefully into the center of a smooth sage-green pasta bowl.",
            },
            zh: {
              kicker: "01 · 弹牙意面",
              title: "鼠尾草绿碗与金黄卷面",
              body: "一束卷得利落饱满的金黄意式直面，轻盈落入柔和清雅的鼠尾草绿瓷碗中央。",
            },
            es: {
              kicker: "01 · PASTA AL DENTE",
              title: "Cuenco Salvia y Nido Dorado",
              body: "Un nido perfecto de espaguetis dorados al dente desciende al centro de un cuenco cerámico verde salvia.",
            },
            ar: {
              kicker: "01 · باستا ألدينتي",
              title: "وعاء أخضر وسباغيتي ذهبية",
              body: "تستقر لفة أنيقة من السباغيتي الذهبية ألدينتي في قلب وعاء خزفي أخضر هادئ.",
            },
            fr: {
              kicker: "01 · PÂTES AL DENTE",
              title: "Bol Sauge & Nid de Spaghetti",
              body: "Un nid doré de spaghetti al dente se pose délicatement au centre d’une assiette creuse vert sauge.",
            },
            ja: {
              kicker: "01 · アルデンテ麺",
              title: "セージの器と黄金パスタ",
              body: "やさしいセージグリーンのパスタ皿の中央に、アルデンテに茹で上げた黄金のスパゲッティが渦を描く。",
            },
            ko: {
              kicker: "01 · 알덴테 파스타",
              title: "세이지 보울과 골든 스파게티",
              body: "차분한 세이지 그린 파스타 보울 중앙에 탱글하게 삶은 황금빛 스파게티가 우아하게 담깁니다.",
            },
          },
        },
        {
          start: 0.24,
          end: 0.52,
          side: "right",
          texts: {
            id: {
              kicker: "02 · SAUS MARINARA",
              title: "Siraman Tomat Merah Segar",
              body: "Saus marinara tomat merah pekat mengalir hangat membalut setiap helai pasta dengan rasa asam-manis alami yang seimbang.",
            },
            en: {
              kicker: "02 · MARINARA SWIRL",
              title: "Vibrant Tomato Cascade",
              body: "Rich crimson marinara pours generously over the nest, clinging to every golden strand with bright herb-simmered flavour.",
            },
            zh: {
              kicker: "02 · 意式红酱",
              title: "浓郁番茄红酱倾泻而下",
              body: "色泽鲜亮的意式番茄红酱缓缓浇透每一根面条，散发天然果酸与香料芬芳。",
            },
            es: {
              kicker: "02 · SALSA MARINARA",
              title: "Cascada de Tomate Vivo",
              body: "La salsa marinara rojo intenso baña la pasta con el equilibrio justo de tomate maduro y hierbas aromáticas.",
            },
            ar: {
              kicker: "02 · صلصة مارينارا",
              title: "شلال الطماطم الغني",
              body: "تنهمر صلصة المارينارا الحمراء الزاهية فوق المعكرونة لتغلف كل خيط بنكهة الطماطم والأعشاب المتوازنة.",
            },
            fr: {
              kicker: "02 · SAUCE MARINARA",
              title: "Cascade de Tomates Mûres",
              body: "Une marinara rouge intense enlace chaque brin de pâtes d’une acidité douce et parfumée aux herbes.",
            },
            ja: {
              kicker: "02 · マリナーラソース",
              title: "真っ赤な完熟トマトの波",
              body: "完熟トマトとハーブを煮込んだ鮮やかなマリナーラソースが、パスタ一本一本に豊かに絡みつく。",
            },
            ko: {
              kicker: "02 · 마리나라 소스",
              title: "진한 토마토 소스의 물결",
              body: "잘 익은 토마토와 허브로 끓인 선명한 마리나라 소스가 면발 사이사이를 촉촉하게 감쌉니다.",
            },
          },
        },
        {
          start: 0.52,
          end: 0.77,
          side: "left",
          texts: {
            id: {
              kicker: "03 · MEATBALLS & PARMESAN",
              title: "Empat Bola Daging & Hujan Keju",
              body: "Empat meatball panggang juicy mendarat melingkari pasta, disusul hujan salju parutan parmesan dan pucuk daun basil segar.",
              tags: ["4 Meatballs", "Keju Parmesan", "Saus Marinara", "Basil Segar"],
            },
            en: {
              kicker: "03 · MEATBALLS & SNOW",
              title: "Seared Meatballs & Parmesan Shower",
              body: "Four deeply seared juicy meatballs settle around the swirl, dusted in freshly grated parmesan snow and crowned with sweet basil.",
              tags: ["4 Meatballs", "Grated Parmesan", "Rich Marinara", "Sweet Basil"],
            },
            zh: {
              kicker: "03 · 牛肉丸与芝士雪",
              title: "四颗香煎肉丸与帕玛森雪花",
              body: "四颗外焦多汁的牛肉丸稳稳落位，帕玛森芝士如细雪般飘洒，最后点缀翠绿甜罗勒。",
              tags: ["香煎牛肉丸", "帕玛森芝士", "番茄红酱", "新鲜甜罗勒"],
            },
            es: {
              kicker: "03 · ALBÓNDIGAS Y PARMESANO",
              title: "Cuatro Albóndigas y Nieve de Queso",
              body: "Cuatro albóndigas doradas y jugosas coronan el plato bajo una nevada de parmesano rallado y hojas de albahaca.",
              tags: ["4 Albóndigas", "Parmesano", "Marinara", "Albahaca Fresca"],
            },
            ar: {
              kicker: "03 · كرات اللحم والبارميزان",
              title: "أربع كرات لحم ورذاذ الجبن",
              body: "تستقر أربع كرات لحم مشوية غنية بالعصارة فوق الصلصة، تليها رشّة من جبن البارميزان وأوراق الريحان الطازجة.",
              tags: ["4 كرات لحم", "جبن بارميزان", "صلصة مارينارا", "ريحان طازج"],
            },
            fr: {
              kicker: "03 · BOULETTES & PARMESAN",
              title: "Quatre Boulettes & Neige de Fromage",
              body: "Quatre boulettes saisies et juteuses s’installent au sommet, saupoudrées de parmesan râpé et d’une touche de basilic.",
              tags: ["4 Boulettes", "Parmesan Râpé", "Sauce Marinara", "Basilic Frais"],
            },
            ja: {
              kicker: "03 · ミートボールとチーズ",
              title: "肉汁ミートボールとパルメザンの雪",
              body: "香ばしく焼き上げた4つのミートボールが並び、削りたてのパルメザンと生バジルが軽やかに舞い降りる。",
              tags: ["ミートボール4個", "パルメザン", "トマトソース", "生バジル"],
            },
            ko: {
              kicker: "03 · 미트볼 & 파마산",
              title: "네 개의 미트볼과 치즈 눈꽃",
              body: "노릇하게 구운 육즙 가득 미트볼 네 알이 올라가고, 파마산 치즈 눈꽃과 생바질이 화사하게 마무리합니다.",
              tags: ["구운 미트볼", "파마산 치즈", "마리나라", "생바질"],
            },
          },
        },
        {
          start: 0.77,
          end: 1.0,
          side: "right",
          texts: {
            id: {
              kicker: "04 · CATATAN ZIKRI",
              title: "Klasik Hangat Tanpa Gagal",
              body: "Aroma basil segar dan tomat hangat yang selalu menghadirkan suasana makan malam tenang, simpel, dan penuh rasa.",
            },
            en: {
              kicker: "04 · ZIKRI’S NOTE",
              title: "Timeless Warm Classic",
              body: "Bright sweet basil over simmering tomato and savoury meatballs—effortless dinner warmth that never goes out of style.",
            },
            zh: {
              kicker: "04 · ZIKRI 的味觉笔记",
              title: "百搭温暖的经典味道",
              body: "新鲜罗勒的清香与温热番茄肉丸交织，简单纯粹，总能带来最放松的晚餐时光。",
            },
            es: {
              kicker: "04 · NOTA DE ZIKRI",
              title: "Clásico Cálido Infalible",
              body: "Albahaca fresca, tomate vibrante y albóndigas tiernas: una cena clásica que siempre se siente como en casa.",
            },
            ar: {
              kicker: "04 · ملاحظة زكري",
              title: "كلاسيكية دافئة لا تتغير",
              body: "عبير الريحان الطازج مع الطماطم الدافئة وكرات اللحم — عشاء كلاسيكي بسيط ومليء بالدفء دائماً.",
            },
            fr: {
              kicker: "04 · NOTE DE ZIKRI",
              title: "Grand Classique Chaleureux",
              body: "Basilic parfumé, tomate mijotée et boulettes fondantes — un classique simple qui apporte toujours chaleur et sourire.",
            },
            ja: {
              kicker: "04 · ジクリのひとこと",
              title: "色あせない王道の温もり",
              body: "バジルの爽やかな香りと優しいトマトの旨み。気取らずほっとできる、永遠のクラシック。",
            },
            ko: {
              kicker: "04 · 지크리의 노트",
              title: "변치 않는 클래식한 따뜻함",
              body: "향긋한 바질과 따뜻한 토마토, 육즙 가득 미트볼이 선사하는 편안하고 기분 좋은 저녁 한 끼.",
            },
          },
        },
      ],
    },
    {
      id: 4,
      slug: "chicken-katsu",
      lines: ["CHICKEN /", "KATSU"],
      fullName: "CHICKEN KATSU CURRY",
      bg: "#E9D49B",
      ink: "#441825",
      videoBg: "#9B835C",
      videoBgBottom: "#DCCEA6",
      dishSrc: "assets/food/dishes/chicken-katsu.webp",
      framesDir: "assets/food/frames/chicken-katsu",
      beats: [
        {
          start: 0.0,
          end: 0.24,
          side: "left",
          texts: {
            id: {
              kicker: "01 · NASI WIJEN HITAM",
              title: "Piring Burgundy & Nasi Pulen",
              body: "Piring keramik merah marun yang kontras menyambut nasi putih pulen bertabur wijen hitam dan irisan kol halus segar.",
            },
            en: {
              kicker: "01 · SESAME RICE",
              title: "Burgundy Plate & Fluffy Rice",
              body: "A rich burgundy ceramic plate sets the contrast for steaming white rice dotted with toasted black sesame and crisp shredded cabbage.",
            },
            zh: {
              kicker: "01 · 黑芝麻香米饭",
              title: "酒红瓷盘与松软白饭",
              body: "质感十足的酒红色瓷盘中，先盛入撒有黑芝麻的松软白米饭与清脆细切的包菜丝。",
            },
            es: {
              kicker: "01 · ARROZ CON SÉSAMO",
              title: "Plato Borgoña y Arroz Esponjoso",
              body: "Un plato cerámico color borgoña enmarca arroz blanco esponjoso con sésamo negro tostado y col fina crujiente.",
            },
            ar: {
              kicker: "01 · أرز بالسمسم الأسود",
              title: "طبق عنّابي وأرز أبيض ناعم",
              body: "يبرز الطبق العنّابي جمال الأرز الأبيض الساخن المرشوش بالسمسم الأسود إلى جانب شرائح الملفوف المقرمش.",
            },
            fr: {
              kicker: "01 · RIZ AU SÉSAME",
              title: "Assiette Bordeaux & Riz Moelleux",
              body: "L’assiette bordeaux contraste avec le riz blanc fumant parsemé de sésame noir et le chou finement émincé.",
            },
            ja: {
              kicker: "01 · ごま白ごはん",
              title: "深紅の皿とふっくらご飯",
              body: "深みのあるバーガンディの皿に、黒ごまを散らしたふっくらご飯と繊細な千切りキャベツが整う。",
            },
            ko: {
              kicker: "01 · 흑임자 밥",
              title: "버건디 접시와 고슬고슬한 밥",
              body: "깊은 버건디 접시 위에 흑임자를 솔솔 뿌린 따뜻한 흰쌀밥과 아삭한 채썬 양배추가 자리합니다.",
            },
          },
        },
        {
          start: 0.24,
          end: 0.52,
          side: "right",
          texts: {
            id: {
              kicker: "02 · KARI JEPANG",
              title: "Tuangan Kuah Kari Kental Emas",
              body: "Kuah kari Jepang cokelat keemasan yang kaya rempah lembut mengalir perlahan mengisi separuh piring dengan kilau hangat.",
            },
            en: {
              kicker: "02 · JAPANESE CURRY",
              title: "Velvety Golden Curry Pour",
              body: "Thick, glossy golden-brown Japanese curry glides into the plate in a silky ribbon of warm sweet-savoury spice.",
            },
            zh: {
              kicker: "02 · 日式咖喱",
              title: "醇厚丝滑的黄金咖喱",
              body: "浓稠亮泽的金棕色日式咖喱如绸缎般缓缓滑入盘中，释放出微甜温润的复合香料气息。",
            },
            es: {
              kicker: "02 · CURRY JAPONÉS",
              title: "Vertido Dorado Aterciopelado",
              body: "El curry japonés espeso y brillante cae con suavidad, llenando la mitad del plato con especias cálidas y dulces.",
            },
            ar: {
              kicker: "02 · الكاري الياباني",
              title: "انسياب الكاري الذهبي المخملي",
              body: "ينساب الكاري الياباني الكثيف بلونه الذهبي الدافئ ليملأ نصف الطبق برائحة التوابل الغنية والمتوازنة.",
            },
            fr: {
              kicker: "02 · CURRY JAPONAIS",
              title: "Nappage Doré & Velouté",
              body: "Un curry japonais épais et soyeux s’écoule doucement dans l’assiette, libérant ses épices douces et chaleureuses.",
            },
            ja: {
              kicker: "02 · 特製カレー",
              title: "とろりと満ちる黄金ルー",
              body: "まろやかな甘みとコクを湛えた黄金色の特製カレーが、艶やかな帯となって皿に広がる。",
            },
            ko: {
              kicker: "02 · 일본식 카레",
              title: "부드럽게 흐르는 황금빛 카레",
              body: "깊고 부드러운 일본식 카레가 윤기 있게 흘러내리며 접시 절반을 따뜻한 향신료 향으로 채웁니다.",
            },
          },
        },
        {
          start: 0.52,
          end: 0.77,
          side: "left",
          texts: {
            id: {
              kicker: "03 · KATSU RENYAH",
              title: "Irisan Katsu Melayang & Lemon",
              body: "Potongan chicken katsu berbalut panko keemasan turun perlahan di atas kari hangat, disempurnakan irisan lemon segar.",
              tags: ["Chicken Katsu", "Kari Jepang", "Kol Renyah", "Lemon Segar"],
            },
            en: {
              kicker: "03 · CRISPY KATSU DROP",
              title: "Suspended Panko Crunch & Lemon",
              body: "Sliced golden panko-crusted chicken katsu descends gently onto the warm curry pool, finished with a bright wedge of fresh lemon.",
              tags: ["Crispy Katsu", "Japanese Curry", "Crisp Cabbage", "Fresh Lemon"],
            },
            zh: {
              kicker: "03 · 酥脆鸡排落盘",
              title: "凌空切块鸡排与清新柠檬",
              body: "裹满金黄面包糠的切块炸鸡排轻落于温热咖喱之上，佐以鲜切柠檬角提亮风味。",
              tags: ["酥脆鸡排", "日式咖喱", "爽口包菜", "鲜切柠檬"],
            },
            es: {
              kicker: "03 · KATSU CRUJIENTE",
              title: "Crujido Panko y Toque de Limón",
              body: "El pollo katsu rebozado en panko dorado desciende sobre el curry caliente, rematado con un gajo fresco de limón.",
              tags: ["Pollo Katsu", "Curry Japonés", "Col Fresca", "Limón Fresco"],
            },
            ar: {
              kicker: "03 · دجاج كاتسو مقرمش",
              title: "شرائح البانكو الذهبية والليمون",
              body: "تهبط شرائح دجاج الكاتسو المغطاة بالبانكو الذهبي فوق الكاري الدافئ، وتكتمل بقطعة ليمون طازجة منعشة.",
              tags: ["دجاج كاتسو", "كاري ياباني", "ملفوف مقرمش", "ليمون طازج"],
            },
            fr: {
              kicker: "03 · KATSU CROUSTILLANT",
              title: "Tranches Panées & Citron Frais",
              body: "Les tranches de poulet katsu panées au panko doré se posent sur le curry chaud, relevées d’un quartier de citron.",
              tags: ["Poulet Katsu", "Curry Japonais", "Chou Croquant", "Citron Frais"],
            },
            ja: {
              kicker: "03 · 黄金チキンカツ",
              title: "宙を舞うサクサクカツとレモン",
              body: "黄金色に揚がった厚切りチキンカツがカレーの海へそっと着地し、フレッシュレモンが爽やかさを添える。",
              tags: ["チキンカツ", "特製カレー", "千切りキャベツ", "カットレモン"],
            },
            ko: {
              kicker: "03 · 크리스피 카츠",
              title: "바삭한 치킨 카츠와 상큼한 레몬",
              body: "황금빛 빵가루로 튀겨낸 치킨 카츠 슬라이스가 따뜻한 카레 위에 사뿐히 내려앉고 레몬 웨지가 상큼함을 더합니다.",
              tags: ["치킨 카츠", "일본식 카레", "채썬 양배추", "생레몬"],
            },
          },
        },
        {
          start: 0.77,
          end: 1.0,
          side: "right",
          texts: {
            id: {
              kicker: "04 · CATATAN ZIKRI",
              title: "Perpaduan Renyah & Lembut",
              body: "Uap kari hangat naik perlahan—kontras antara kriuk panko keemasan dan lembutnya kuah kari membuat setiap suapan selalu memuaskan.",
            },
            en: {
              kicker: "04 · ZIKRI’S NOTE",
              title: "Crisp Meets Velvety Warmth",
              body: "Gentle curry steam rises—the contrast between shatteringly crisp panko crust and comforting rich curry makes every bite effortless joy.",
            },
            zh: {
              kicker: "04 · ZIKRI 的味觉笔记",
              title: "外酥内润的绝妙平衡",
              body: "温热咖喱香气袅袅升起，金黄酥皮与醇厚咖喱的口感碰撞，让每一口都倍感满足。",
            },
            es: {
              kicker: "04 · NOTA DE ZIKRI",
              title: "Crujiente y Aterciopelado",
              body: "El vapor aromático del curry se eleva: el contraste entre el panko dorado y la salsa cremosa hace que cada bocado brille.",
            },
            ar: {
              kicker: "04 · ملاحظة زكري",
              title: "توازن القرمشة والنعومة",
              body: "يتصاعد بخار الكاري الدافئ ليجمع بين قرمشة البانكو الذهبي ونعومة الصلصة الغنية في كل لقمة.",
            },
            fr: {
              kicker: "04 · NOTE DE ZIKRI",
              title: "Croustillant & Réconfort Velouté",
              body: "La vapeur parfumée s’élève — le contraste entre la croûte panko dorée et la douceur du curry rend chaque bouchée irrésistible.",
            },
            ja: {
              kicker: "04 · ジクリのひとこと",
              title: "サクサクと濃厚の黄金比",
              body: "立ち上るスパイスの湯気。軽やかな衣の歯ざわりとコク深いルーのコントラストがたまらない一皿。",
            },
            ko: {
              kicker: "04 · 지크리의 노트",
              title: "바삭함과 부드러움의 완벽한 대비",
              body: "따뜻한 카레 김이 피어오르는 순간, 바삭한 튀김옷과 부드러운 커리의 대비가 매 한 입을 완벽하게 채워줍니다.",
            },
          },
        },
      ],
    },
  ];

  var UI = {
    eyebrow: {
      id: "FAVORIT",
      en: "FAVOURITES",
      zh: "最爱美食",
      es: "FAVORITOS",
      ar: "المفضلة",
      fr: "FAVORIS",
      ja: "お気に入り",
      ko: "최애 메뉴",
    },
    homeLabel: {
      id: "Beranda",
      en: "Home",
      zh: "首页",
      es: "Inicio",
      ar: "الرئيسية",
      fr: "Accueil",
      ja: "ホーム",
      ko: "홈",
    },
    backHome: {
      id: "Kembali ke beranda portofolio",
      en: "Back to portfolio home",
      zh: "返回作品集首页",
      es: "Volver al inicio del portafolio",
      ar: "العودة إلى الرئيسية",
      fr: "Retour à l’accueil",
      ja: "ホームに戻る",
      ko: "포트폴리오 홈으로",
    },
    scrollCue: {
      id: "Gulir ke bawah",
      en: "Scroll down",
      zh: "向下滚动",
      es: "Desliza abajo",
      ar: "مرّر للأسفل",
      fr: "Défiler vers le bas",
      ja: "下にスクロール",
      ko: "아래로 스크롤",
    },
    dragCue: {
      id: "Geser meja",
      en: "Drag table",
      zh: "拖动餐盘",
      es: "Arrastra la mesa",
      ar: "اسحب الطاولة",
      fr: "Faites glisser",
      ja: "テーブルを回す",
      ko: "테이블 돌리기",
    },
    backTopHint: {
      id: "Gulir ke atas untuk ganti menu",
      en: "Scroll up to switch dish",
      zh: "向上滚动切换菜品",
      es: "Sube para cambiar de plato",
      ar: "مرّر للأعلى لتغيير الطبق",
      fr: "Remontez pour changer de plat",
      ja: "上に戻って別のメニューへ",
      ko: "위로 올려 다른 메뉴 보기",
    },
    storyRegion: {
      id: "Animasi penyajian menu pilihan",
      en: "Selected dish cinematic sequence",
      zh: "所选菜品制作动画",
      es: "Secuencia cinematográfica del plato",
      ar: "عرض تحضير الطبق المختار",
      fr: "Séquence cinématique du plat sélectionné",
      ja: "選択した料理のアニメーション",
      ko: "선택한 요리 시네마틱 시퀀스",
    },
    turntableHint: {
      id: "Geser meja ke kiri atau kanan, atau tekan panah kiri/kanan untuk memilih menu, lalu gulir ke bawah untuk menonton animasinya.",
      en: "Drag the table left or right, or press Left/Right arrow keys to choose a dish, then scroll down to scrub its animation.",
      zh: "左右拖动餐盘或按左右方向键切换菜品，然后向下滚动观看动画。",
      es: "Arrastra la mesa a izquierda o derecha, o usa las flechas para elegir un plato y luego desplázate hacia abajo.",
      ar: "اسحب الطاولة يميناً أو يساراً أو استخدم الأسهم لاختيار طبق، ثم مرّر للأسفل لمشاهدة العرض.",
      fr: "Faites glisser la table ou utilisez les flèches pour choisir un plat, puis faites défiler vers le bas.",
      ja: "テーブルを左右にドラッグするか矢印キーで料理を選び、下にスクロールしてアニメーションをご覧ください。",
      ko: "테이블을 좌우로 드래그하거나 방향키로 메뉴를 고른 뒤 아래로 스크롤해 애니메이션을 감상하세요.",
    },
  };

  function normLang(lang) {
    return lang && UI.eyebrow[lang] ? lang : "id";
  }

  function t(lang, key) {
    var l = normLang(lang);
    var entry = UI[key];
    return entry ? entry[l] || entry.id : key;
  }

  function getBeatText(beat, lang) {
    var l = normLang(lang);
    return (beat && beat.texts && (beat.texts[l] || beat.texts.id)) || null;
  }

  window.ZK_FOOD_DATA = {
    FRAME_COUNT: FRAME_COUNT,
    RING: RING,
    COUPE_FILL: COUPE_FILL,
    PROPS: PROPS,
    DISHES: DISHES,
    UI: UI,
    t: t,
    getBeatText: getBeatText,
  };
})();
