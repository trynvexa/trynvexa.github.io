/* ============================================================
   story.js
   ============================================================ */

/**
 * Interactive Story Timeline & Dynamic SVG Wave Thread
 * Bezier curve connector that links milestones and handles multi-language chapters.
 */
(function(){
  var pg=document.getElementById("pg"),pgb=document.getElementById("pgb");if(!pg||!pgb)return;
  var DICT = {"en":{"bk":"Back","h":"My Story","sub":"A journey of growth, craft, and finding direction through web development & UI design.","lead":"From growing up in Medan to stepping into the software industry — here are the real chapters that shaped my discipline, curiosity, and craft.","c1w":"2011 · Medan","c1t":"Roots & Early Achievement","c1p1":"Born in 2011 in Medan, North Sumatra, and raised with warmth across both my father's and mother's extended families as the first grandchild on both sides.","c1p2":"One of my earliest proud milestones was winning 1st Place in the City-Level Tahfidz Championship at age six — an early lesson that consistent focus and dedication yield real results.","c2w":"School Years","c2t":"Character & Foundation","c2p1":"Completed elementary education at MIS Aisyiyah Sumatera Utara and junior high at MTs Aisyiyah Sumatera Utara.","c2p2":"Those years built my sense of discipline, resilience through challenges, lasting friendships, and an early curiosity for how digital interfaces work.","c3w":"Vocational High School","c3t":"Entering Software & Web at SMK Swasta Mandiri","c3p1":"Continued my education at SMK Swasta Mandiri in Medan, where curiosity turned into focused technical practice.","c3p2":"Here I began diving deeper into web engineering, learning to think independently, experiment boldly, and build a clear path toward front-end development.","c4w":"Self-Taught Craft","c4t":"Deepening Code, Motion & UI Design","c4p1":"Honed semantic HTML5, modern CSS3 and Tailwind CSS architecture, interactive JavaScript (ES6+), and motion choreography with GSAP and Anime.js.","c4p2":"Realized that great digital products require both visual precision and clean, fast-loading code that feels effortless on any screen.","c5w":"2nd Year SMK · Industry","c5t":"Industry Work Placement (PKL) at DigitalCODE","c5p1":"Currently in my second year of SMK, completing my first industry work placement (PKL) at DigitalCODE.","c5p2":"Working in a real production environment has sharpened my workflow — translating classroom fundamentals into practical, well-structured web interfaces.","c6w":"Today & Beyond","c6t":"Present Focus & Future Vision","c6p1":"Building responsive landing pages, interactive UI systems, and modern web experiences from Medan while continuously expanding into React, Vue, and AI-assisted workflows.","c6p2":"Open to freelance projects, creative collaborations, and building meaningful digital products.","e1":"Keep growing, keep building, and stay authentic.","e2":"Every line of code is a step toward a better craft.","ctaProj":"Explore Featured Projects ↗","ctaContact":"Start a Conversation ↗"},"zh":{"bk":"返回","h":"我的故事","sub":"一段关于成长、磨砺以及在网页开发与界面设计中探索方向的旅程。","lead":"从在棉兰成长到踏入软件行业——以下是我培养自律、好奇心与技术匠心的真实篇章。","c1w":"2011 · 棉兰","c1t":"成长根基与早期荣誉","c1p1":"2011年出生于北苏门答腊棉兰，作为父母双方家族的长孙，在两个大家庭的关爱与陪伴中成长。","c1p2":"六岁时荣获全市 Tahfidz（古兰经背诵）比赛冠军——这是我人生中第一次深刻体会到专注与坚持的力量。","c2w":"校园岁月","c2t":"品格塑造与求学基础","c2p1":"先后就读于北苏门答腊 MIS Aisyiyah 小学与 MTs Aisyiyah 初中。","c2p2":"那段岁月塑造了我的自律与韧性，收获了深厚的挚友，也点燃了我对数字界面与计算机技术的最初好奇。","c3w":"职业高中","c3t":"在 SMK Swasta Mandiri 开启编程之路","c3p1":"升入棉兰 SMK Swasta Mandiri（私立曼迪里职业高中），将对技术的好奇转化为系统的工程实践。","c3p2":"在这里我开始深入研究网页开发，学会独立思考、勇敢尝试，并锁定了前端工程与 UI 设计的发展方向。","c4w":"自主深耕","c4t":"精进代码架构、动效与界面设计","c4p1":"深入掌握语义化 HTML5、CSS3 与 Tailwind CSS 架构、JavaScript (ES6+)，以及 GSAP 和 Anime.js 交互动画。","c4p2":"深刻认识到优秀的数字作品需要兼具视觉美感与高性能、可访问的整洁代码。","c5w":"职高二年级 · 行业实践","c5t":"在 DigitalCODE 进行企业实习 (PKL)","c5p1":"目前就读职高二年级，正在 DigitalCODE 进行我的首次企业实习（PKL）。","c5p2":"在真实的生产环境中协作，将课堂所学转化为高质量的实战网页界面与工作流。","c6w":"当下与未来","c6t":"当前重心与未来愿景","c6p1":"在棉兰持续构建响应式落地页与交互式 Web 体验，同时深入探索 React、Vue 与 AI 辅助开发工作流。","c6p2":"欢迎自由职业项目、创意合作，共同打造令人难忘的数字产品。","e1":"持续成长，不断构建，保持真诚。","e2":"每一行代码都是迈向更精湛技艺的一步。","ctaProj":"查看精选项目 ↗","ctaContact":"与我联系 ↗"},"es":{"bk":"Volver","h":"Mi Historia","sub":"Un viaje de crecimiento, oficio y dirección en el desarrollo web y diseño de interfaces.","lead":"Desde mi infancia en Medan hasta mis primeros pasos en la industria del software: estos son los capítulos reales que forjaron mi disciplina y oficio.","c1w":"2011 · Medan","c1t":"Raíces y Primer Logro","c1p1":"Nací en 2011 en Medan, Sumatra Septentrional, criado con el cariño de las familias de mi padre y de mi madre como primer nieto de ambas.","c1p2":"A los seis años gané el 1.er lugar en el Campeonato Municipal de Tahfidz, aprendiendo desde temprano el valor de la constancia.","c2w":"Etapa Escolar","c2t":"Carácter y Fundamentos","c2p1":"Cursé la primaria en MIS Aisyiyah Sumatera Utara y la secundaria en MTs Aisyiyah Sumatera Utara.","c2p2":"Esos años forjaron mi disciplina, resiliencia ante los retos, grandes amistades y mi fascinación inicial por las interfaces digitales.","c3w":"Escuela Vocacional","c3t":"Entrando al Mundo Web en SMK Swasta Mandiri","c3p1":"Continué mis estudios en SMK Swasta Mandiri en Medan, donde la curiosidad se convirtió en práctica técnica constante.","c3p2":"Allí comencé a profundizar en el desarrollo web, aprendiendo a ser autónomo, experimentar y definir mi camino en el front-end.","c4w":"Exploración Autodidacta","c4t":"Código, Animación y Diseño UI","c4p1":"Perfeccioné HTML5 semántico, CSS3 moderno, Tailwind CSS, JavaScript (ES6+) y microinteracciones con GSAP y Anime.js.","c4p2":"Comprendí que la estética visual y el rendimiento del código deben ir siempre de la mano.","c5w":"2.º Año SMK · Industria","c5t":"Prácticas Profesionales (PKL) en DigitalCODE","c5p1":"Actualmente curso el segundo año de SMK y realizo mis primeras prácticas profesionales (PKL) en DigitalCODE.","c5p2":"Colaborar en un entorno laboral real ha fortalecido mi flujo de trabajo y mi capacidad de construir interfaces listas para producción.","c6w":"Hoy y Futuro","c6t":"Enfoque Actual y Visión","c6p1":"Construyendo páginas web rápidas, accesibles e interactivas desde Medan, mientras amplío mis habilidades en React, Vue y flujos con IA.","c6p2":"Abierto a proyectos freelance y colaboraciones creativas.","e1":"Seguir aprendiendo, innovando y creciendo.","e2":"Cada línea de código es un paso para mejorar.","ctaProj":"Ver Proyectos Destacados ↗","ctaContact":"Contactarme ↗"},"ar":{"bk":"رجوع","h":"قصتي","sub":"رحلة نمو وشغف في تطوير الويب وتصميم الواجهات.","lead":"من النشأة في ميدان إلى خوض تجربة العمل الفعلي في صناعة البرمجيات — هذه هي الفصول الحقيقية التي شكّلت انضباطي ومهارتي.","c1w":"2011 · ميدان","c1t":"الجذور والإنجاز المبكر","c1p1":"ولدت عام 2011 في ميدان بشمال سومطرة، ونشأت محاطًا بمحبة عائلتي والدي ووالدتي كأول حفيد في العائلتين.","c1p2":"في سن السادسة حققت المركز الأول في بطولة تحفيظ القرآن الكريم على مستوى المدينة — درس مبكر في قيمة الاجتهاد والمثابرة.","c2w":"سنوات الدراسة","c2t":"بناء الشخصية والأساس العلمي","c2p1":"أكملت المرحلة الابتدائية في MIS Aisyiyah Sumatera Utara والمتوسطة في MTs Aisyiyah Sumatera Utara.","c2p2":"غرسَت فيّ تلك السنوات الانضباط والقدرة على تجاوز الصعاب، وبداية شغفي بعالم التقنية والواجهات الرقمية.","c3w":"التعليم المهني","c3t":"دخول عالم البرمجة في SMK Swasta Mandiri","c3p1":"واصلت تعليمي في ثانوية مانديري المهنية الخاصة (SMK Swasta Mandiri) في ميدان، حيث تحول الفضول إلى ممارسة تقنية.","c3p2":"بدأت هنا التعمق في تطوير الويب والاعتماد على الذات ورسم مساري كمطور واجهات أمامية.","c4w":"التطوير الذاتي","c4t":"إتقان الكود والحركة وتصميم الواجهات","c4p1":"تعمقت في HTML5 الدلالي، وCSS3 وTailwind CSS، وجافاسكريبت الحديثة، وتحريك الواجهات باستخدام GSAP وAnime.js.","c4p2":"أدركت أن جمال التصميم وأداء الكود السريع يجب أن يسيرا معًا بتوازن تام.","c5w":"السنة الثانية · التدريب الميداني","c5t":"التدريب العملي (PKL) في شركة DigitalCODE","c5p1":"أدرس حاليًا في السنة الثانية من الثانوية المهنية وأخوض تدريبي الميداني الأول (PKL) في شركة DigitalCODE.","c5p2":"العمل في بيئة إنتاج حقيقية صقل مهاراتي وحوّل المعرفة النظرية إلى واجهات ويب عملية متقنة.","c6w":"اليوم والمستقبل","c6t":"التركيز الحالي والرؤية المستقبلية","c6p1":"أصمم وأطوّر واجهات ويب متجاوبة وحديثة من ميدان، مع التوسع المستمر في React وVue وأدوات الذكاء الاصطناعي.","c6p2":"متاح للمشاريع الحرة والتعاون الإبداعي في بناء منتجات رقمية مميزة.","e1":"مواصلة التعلّم والابتكار والنمو.","e2":"كل سطر برمجي هو خطوة نحو الإتقان.","ctaProj":"استكشف المشاريع المميزة ↗","ctaContact":"تواصل معي ↗"},"fr":{"bk":"Retour","h":"Mon Histoire","sub":"Un parcours de croissance, de rigueur et de création dans le développement web et le design UI.","lead":"De mon enfance à Medan jusqu’à mon immersion professionnelle dans le logiciel — voici les chapitres authentiques de mon parcours.","c1w":"2011 · Medan","c1t":"Racines & Première Fierté","c1p1":"Né en 2011 à Medan, au nord de Sumatra, j’ai grandi entouré de l’affection de mes familles paternelle et maternelle en tant que premier petit-enfant.","c1p2":"À six ans, j’ai remporté le 1er prix du championnat municipal de Tahfidz, une première victoire qui m’a appris la valeur de la persévérance.","c2w":"Années Scolaires","c2t":"Caractère & Fondations","c2p1":"Scolarité primaire à la MIS Aisyiyah Sumatera Utara puis au collège MTs Aisyiyah Sumatera Utara.","c2p2":"Ces années ont forgé ma discipline, ma résilience, des amitiés durables et ma fascination pour les interfaces numériques.","c3w":"Lycée Professionnel","c3t":"Cap sur le Web à la SMK Swasta Mandiri","c3p1":"Poursuite de mes études au lycée professionnel SMK Swasta Mandiri à Medan, où ma curiosité s’est transformée en pratique technique.","c3p2":"C’est là que j’ai approfondi le développement web, cultivé mon autonomie et tracé ma voie en front-end et UI design.","c4w":"Exploration Autodidacte","c4t":"Code, Motion & Design d’Interface","c4p1":"Maîtrise de HTML5 sémantique, CSS3 moderne, Tailwind CSS, JavaScript (ES6+) et des animations avec GSAP et Anime.js.","c4p2":"Convaincu que l’exigence visuelle et la performance technique doivent toujours avancer ensemble.","c5w":"2e Année SMK · Entreprise","c5t":"Stage en Entreprise (PKL) chez DigitalCODE","c5p1":"Actuellement en deuxième année de SMK, j’effectue mon premier stage professionnel (PKL) au sein de l’entreprise DigitalCODE.","c5p2":"Cette immersion en production réelle me permet d’appliquer mes compétences sur des projets concrets et exigeants.","c6w":"Aujourd’hui & Demain","c6t":"Focus Actuel & Vision","c6p1":"Conception d’interfaces web modernes, rapides et accessibles depuis Medan, tout en approfondissant React, Vue et les workflows IA.","c6p2":"Ouvert aux missions freelance et aux collaborations créatives.","e1":"Continuer d’apprendre, d’innover et de progresser.","e2":"Chaque ligne de code est un pas vers l’excellence.","ctaProj":"Voir les Projets Phares ↗","ctaContact":"Me Contacter ↗"},"ja":{"bk":"戻る","h":"私のストーリー","sub":"Web開発とUIデザインを通じて成長し、自分の道を切り拓くまでの軌跡。","lead":"メダンでの幼少期からソフトウェア業界での実務インターンシップまで——私の規律と探究心を形作った実際の歩みです。","c1w":"2011年 · メダン","c1t":"ルーツと幼少期の達成","c1p1":"2011年、北スマトラ州メダン生まれ。父方・母方双方の初孫として、二つの温かい家族の愛情に包まれて育ちました。","c1p2":"6歳の時、市レベルのコーラン暗誦大会（Tahfidz）で優勝。努力を続けることの大切さを学んだ原体験です。","c2w":"学生時代","c2t":"人格形成と基礎","c2p1":"MIS Aisyiyah Sumatera Utara 小学校、MTs Aisyiyah Sumatera Utara 中学校で学びました。","c2p2":"規律や困難から立ち上がる粘り強さ、かけがえのない友情を育みながら、デジタルの画面が動く仕組みに強い興味を持つようになりました。","c3w":"職業高校 (SMK)","c3t":"SMK Swasta Mandiri でWebの世界へ","c3p1":"メダンの私立マンディリ職業高校（SMK Swasta Mandiri）へ進学し、技術への好奇心を実践的な学びへと昇華させました。","c3p2":"自立心と挑戦する勇気を養い、フロントエンド開発とUIデザインという自分の道を見出しました。","c4w":"独学と探求","c4t":"コード設計・モーション・UIデザインの深化","c4p1":"セマンティックなHTML5、モダンなCSS3とTailwind CSS、JavaScript (ES6+)、GSAPやAnime.jsによるアニメーション表現を習得。","c4p2":"視覚的な美しさと高速でクリーンなコードは常に両立すべきだという信念を確立しました。","c5w":"高校2年 · 実務経験","c5t":"DigitalCODE での企業インターンシップ (PKL)","c5p1":"現在高校2年生として、DigitalCODE にて初めての実務インターンシップ（PKL）に取り組んでいます。","c5p2":"実際の開発現場でチームと協働し、学校で学んだ知識を実用的なWebインターフェースへと形にしています。","c6w":"現在とこれから","c6t":"現在のフォーカスと展望","c6p1":"メダンを拠点にレスポンシブで洗練されたWeb体験を構築しつつ、React、Vue、AIワークフローの探求を続けています。","c6p2":"フリーランス案件やクリエイティブなコラボレーションを歓迎しています。","e1":"学び続け、革新し、成長し続ける。","e2":"すべてのコードの一行が、より良い作り手への一歩。","ctaProj":"注目プロジェクトを見る ↗","ctaContact":"お問い合わせ ↗"},"ko":{"bk":"뒤로","h":"나의 이야기","sub":"웹 개발과 UI 디자인을 통해 성장하고 방향을 찾아가는 여정.","lead":"메단에서의 어린 시절부터 소프트웨어 업계 실무 인턴십까지 — 저의 끈기와 호기심, 기술적 장인정신을 만든 실제 이야기입니다.","c1w":"2011 · 메단","c1t":"뿌리와 첫 번째 성취","c1p1":"2011년 북수마트라 메단에서 태어나 친가와 외가 양쪽의 첫 손주로서 두 가족의 따뜻한 사랑 속에 자랐습니다.","c1p2":"여섯 살 때 시 단위 타흐피즈(Tahfidz) 경연대회에서 우승하며 꾸준한 노력이 결실을 맺는다는 것을 일찍 배웠습니다.","c2w":"학창 시절","c2t":"인성과 기초를 다진 시간","c2p1":"MIS Aisyiyah Sumatera Utara 초등학교와 MTs Aisyiyah Sumatera Utara 중학교를 졸업했습니다.","c2p2":"이 시기 동안 규율과 회복탄력성, 소중한 우정을 쌓으며 디지털 인터페이스에 대한 첫 호기심을 키웠습니다.","c3w":"직업고등학교 (SMK)","c3t":"SMK Swasta Mandiri에서 시작된 웹 개발","c3p1":"메단의 SMK Swasta Mandiri 직업고등학교에 진학해 기술에 대한 호기심을 본격적인 실습으로 연결했습니다.","c3p2":"스스로 탐구하고 도전하는 법을 배우며 프론트엔드 개발과 UI 디자인이라는 명확한 진로를 찾았습니다.","c4w":"자기주도 탐구","c4t":"코드 아키텍처, 모션 & UI 디자인 심화","c4p1":"시맨틱 HTML5, 최신 CSS3 및 Tailwind CSS, JavaScript(ES6+), 그리고 GSAP·Anime.js 인터랙션 모션을 깊이 익혔습니다.","c4p2":"시각적 완성도와 빠르고 깔끔한 코드 성능이 함께 가야 한다는 원칙을 세웠습니다.","c5w":"고2 · 산업체 실습","c5t":"DigitalCODE 실무 인턴십 (PKL)","c5p1":"현재 직업고등학교 2학년에 재학 중이며 DigitalCODE에서 첫 기업 현장실습(PKL)을 수행하고 있습니다.","c5p2":"실제 프로덕션 환경에서 협업하며 배운 지식을 실용적이고 완성도 높은 웹 인터페이스로 구현하고 있습니다.","c6w":"현재와 비전","c6t":"오늘의 집중과 앞으로의 방향","c6p1":"메단을 기반으로 반응형 웹과 인터랙티브 UI를 구축하며 React, Vue, AI 워크플로로 역량을 넓히고 있습니다.","c6p2":"프리랜스 프로젝트와 창의적인 협업을 언제나 환영합니다.","e1":"계속 배우고, 혁신하며, 성장하기.","e2":"코드 한 줄 한 줄이 더 나은 개발자가 되기 위한 발걸음입니다.","ctaProj":"주요 프로젝트 보기 ↗","ctaContact":"문의하기 ↗"}};
  var LBL={id:"Indonesia",en:"English",zh:"中文",es:"Español",ar:"العربية",fr:"Français",ja:"日本語",ko:"한국어"},
      BK={id:"Kembali ke daftar kartu",en:"Back to the card list",zh:"返回卡片列表",es:"Volver a la lista de tarjetas",ar:"العودة إلى قائمة البطاقات",fr:"Retour à la liste des cartes",ja:"カード一覧に戻る",ko:"카드 목록으로 돌아가기"},
      OL={id:"Garis waktu cerita saya",en:"Timeline of my story",zh:"我的故事时间线",es:"Línea de tiempo de mi historia",ar:"الجدول الزمني لقصتي",fr:"Chronologie de mon histoire",ja:"私のストーリーのタイムライン",ko:"나의 이야기 타임라인"},
      BTN={id:"Pilih bahasa",en:"Choose language",zh:"选择语言",es:"Elegir idioma",ar:"اختر اللغة",fr:"Choisir la langue",ja:"言語を選択",ko:"언어 선택"};
  var ICON='<svg viewBox="0 0 24 24"><path d="M4 5h9M8.5 3v2M6 5c.6 3 2.6 5.5 5.5 7M12.5 5c-.7 3.2-3 6-7 8"/><path d="M12.5 20.5l4-9 4 9M14 17.5h5"/></svg>';
  var CHEV='<svg class="st-chev" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>';
  var lang=window.ZK?ZK.lang:"id";window.addEventListener("zk-lang",function(){lang=ZK.lang;apply();});
  function apply(){
    setTimeout(function(){window.dispatchEvent(new Event("st-relayout"));},30);
    pg.setAttribute("lang",lang);
    [].forEach.call(pgb.querySelectorAll("[data-t]"),function(el){
      var k=el.getAttribute("data-t");if(!el.hasAttribute("data-id"))el.setAttribute("data-id",el.textContent);
      var i0=el.getAttribute("data-id"),d=DICT[lang];el.textContent=lang==="id"?i0:((d&&d[k])||(window.ZK&&ZK.t(i0,lang))||DICT.en[k]||i0);
    });
    var bk=pgb.querySelector(".bk");if(bk)bk.setAttribute("aria-label",BK[lang]||BK.en);
    var ol=pgb.querySelector(".st-life");if(ol)ol.setAttribute("aria-label",OL[lang]||OL.en);
    var b=pgb.querySelector(".st-lang");
    if(b){b.setAttribute("aria-label",BTN[lang]+": "+LBL[lang]);b.querySelector(".st-lt").textContent=LBL[lang];}
    [].forEach.call(pgb.querySelectorAll(".st-opt"),function(o){o.setAttribute("aria-checked",o.getAttribute("data-l")===lang?"true":"false");});
  }
  function menu(){return pgb.querySelector(".st-menu");}
  function openMenu(){
    var m=menu(),b=pgb.querySelector(".st-lang");if(!m||!b)return;
    m.classList.remove("is-right");m.classList.add("is-open");b.setAttribute("aria-expanded","true");
    var r=m.getBoundingClientRect();if(r.right>window.innerWidth-10)m.classList.add("is-right");
    var c=m.querySelector('[aria-checked="true"]')||m.querySelector(".st-opt");if(c)c.focus({preventScroll:true});
  }
  function closeMenu(back){
    var m=menu(),b=pgb.querySelector(".st-lang");if(!m)return;
    m.classList.remove("is-open");if(b){b.setAttribute("aria-expanded","false");if(back)b.focus({preventScroll:true});}
  }
  function setLang(l){if(window.ZK&&ZK.set){ZK.set(l);}else{lang=l;try{localStorage.setItem("zk-lang",l);}catch(e){}apply();}}
  function scrolled(){
    var m=pg.scrollHeight-pg.clientHeight,p=m>0?Math.min(1,pg.scrollTop/m):0;
    var pr=pgb.querySelector(".st-prog");if(pr)pr.style.setProperty("--p",p.toFixed(4));
    var bar=pgb.querySelector(".st-bar");if(bar)bar.classList.toggle("is-scrolled",pg.scrollTop>24);
  }
  function build(){
    if(!pg.classList.contains("p0"))return;
    var bk=pgb.querySelector(".bk");if(!bk||pgb.querySelector(".st-bar"))return;
    var bar=document.createElement("div");bar.className="st-bar";
    pgb.insertBefore(bar,bk);bar.appendChild(bk);
    var t=bk.querySelector(".bk-t");if(t)t.setAttribute("data-t","bk");

    var pr=document.createElement("i");pr.className="st-prog";pr.setAttribute("aria-hidden","true");pgb.appendChild(pr);
    apply();scrolled();try{bk.focus({preventScroll:true});}catch(e){}
  }
  document.addEventListener("pointerdown",function(e){var m=menu();if(m&&m.classList.contains("is-open")&&!e.target.closest(".st-lw"))closeMenu(false);});
  pg.addEventListener("scroll",scrolled,{passive:true});
  new MutationObserver(build).observe(pgb,{childList:true});
})();

(function(){
  var pg=document.getElementById("pg"),pgb=document.getElementById("pgb");if(!pg||!pgb)return;
  var NS="http://www.w3.org/2000/svg",S=null,raf=0;
  function el(n,a,p){var e=document.createElementNS(NS,n);for(var k in a)e.setAttribute(k,a[k]);if(p)p.appendChild(e);return e;}
  function r1(v){return Math.round(v*10)/10;}
  function curve(a){var d="M"+r1(a[0].x)+" "+r1(a[0].y);for(var i=1;i<a.length;i++){var p=a[i-1],q=a[i],m=r1((p.y+q.y)/2);d+=" C"+r1(p.x)+" "+m+" "+r1(q.x)+" "+m+" "+r1(q.x)+" "+r1(q.y);}return d;}
  function build(){
    var wrap=pgb.querySelector(".st-wrap");if(!wrap){S=null;return;}
    var ol=wrap.querySelector(".st-life"),svg=wrap.querySelector(".st-thread");if(!ol||!svg)return;
    var mob=window.innerWidth<=820,G=mob?54:100,cx=G*(mob?.38:.4),amp=mob?13:27,H=wrap.offsetHeight;
    svg.setAttribute("width",G);svg.setAttribute("height",H);svg.setAttribute("viewBox","0 0 "+G+" "+H);
    while(svg.firstChild)svg.removeChild(svg.firstChild);
    var lis=[].slice.call(ol.children),pts=[],nowI=-1,lastMain=0;
    lis.forEach(function(li){
      var hd=li.querySelector(".st-hd");
      pts.push({x:cx+amp*parseFloat(li.getAttribute("data-m")),y:li.offsetTop+hd.offsetTop+hd.offsetHeight/2,main:true,li:li});
      if(li.classList.contains("is-now"))nowI=pts.length-1;
      lastMain=pts.length-1;
      [].forEach.call(li.querySelectorAll("[data-m]"),function(e){
        pts.push({x:cx+amp*parseFloat(e.getAttribute("data-m")),y:li.offsetTop+e.offsetTop+16,main:false,li:li});
      });
    });
    if(nowI<0)nowI=lastMain;
    var first=pts[0],start={x:first.x,y:Math.max(0,first.y-84)},end={x:cx+amp,y:H};
    var past=[start].concat(pts.slice(0,nowI+1)),fut=pts.slice(nowI).concat([end]);
    var defs=el("defs",{},svg);
    var g1=el("linearGradient",{id:"stBaseG",gradientUnits:"userSpaceOnUse",x1:0,y1:start.y,x2:0,y2:start.y+90},defs);
    el("stop",{offset:0,"stop-color":"#f4efe8","stop-opacity":0},g1);el("stop",{offset:1,"stop-color":"#f4efe8","stop-opacity":.22},g1);
    var g2=el("linearGradient",{id:"stFutG",gradientUnits:"userSpaceOnUse",x1:0,y1:pts[nowI].y,x2:0,y2:H},defs);
    el("stop",{offset:0,"stop-color":"#f4efe8","stop-opacity":.9},g2);el("stop",{offset:1,"stop-color":"#f4efe8","stop-opacity":.2},g2);
    var dp=curve(past);
    el("path",{"class":"st-t-fut",d:curve(fut),stroke:"url(#stFutG)"},svg);
    el("path",{"class":"st-t-base",d:dp,stroke:"url(#stBaseG)"},svg);
    var nodes=[];
    pts.forEach(function(p){
      el("line",{"class":"st-leader",x1:r1(p.x+(p.main?8:5)),y1:r1(p.y),x2:G-12,y2:r1(p.y)},svg);
    });
    var halo=el("path",{"class":"st-t-halo",d:dp},svg),on=el("path",{"class":"st-t-on",d:dp},svg);
    pts.forEach(function(p,i){
      var n=el("circle",{"class":"st-node"+(p.main?"":" sm"),cx:r1(p.x),cy:r1(p.y),r:i===nowI?6:(p.main?4.6:2.8)},svg);
      nodes.push({y:p.y,el:n,main:p.main,li:p.li});
    });
    var ring=el("circle",{"class":"st-t-ring",r:9,cx:r1(start.x),cy:r1(start.y)},svg),head=el("circle",{"class":"st-t-head",r:5,cx:r1(start.x),cy:r1(start.y)},svg);
    var total=on.getTotalLength(),N=Math.max(80,Math.ceil(total/8)),sm=[];
    for(var i=0;i<=N;i++){var l=total*i/N,q=on.getPointAtLength(l);sm.push({l:l,y:q.y});}
    S={wrap:wrap,on:on,halo:halo,head:head,ring:ring,total:total,sm:sm,nodes:nodes,lis:lis,cx:cx,amp:amp,startY:start.y};
    update();
  }
  function update(){
    raf=0;if(!S||!S.wrap.isConnected)return;
    var pr=pg.getBoundingClientRect(),wr=S.wrap.getBoundingClientRect(),mark=pr.top+pr.height*.64-wr.top,sm=S.sm,l=0;
    if(mark>=sm[sm.length-1].y)l=S.total;
    else if(mark>sm[0].y){var lo=0,hi=sm.length-1;while(hi-lo>1){var mid=(lo+hi)>>1;if(sm[mid].y<mark)lo=mid;else hi=mid;}
      var t=(mark-sm[lo].y)/Math.max(.001,sm[hi].y-sm[lo].y);l=sm[lo].l+(sm[hi].l-sm[lo].l)*t;}
    var da=l.toFixed(1)+" "+(S.total+20);S.on.style.strokeDasharray=da;S.halo.style.strokeDasharray=da;
    var p=S.on.getPointAtLength(l),vis=mark>S.startY?1:0;
    [S.head,S.ring].forEach(function(c){c.setAttribute("cx",p.x.toFixed(1));c.setAttribute("cy",p.y.toFixed(1));c.style.opacity=vis;});
    S.nodes.forEach(function(n){n.el.classList.toggle("on",n.y<mark);});
    S.lis.forEach(function(li){var hd=li.querySelector(".st-hd");li.classList.toggle("is-pass",li.offsetTop+hd.offsetTop<mark);});
    var m=Math.max(-1,Math.min(1,(p.x-S.cx)/S.amp));pg.style.setProperty("--st-m",m.toFixed(3));
  }
  function ask(){if(!raf)raf=requestAnimationFrame(update);}
  function later(){build();setTimeout(build,450);setTimeout(build,1400);}
  pg.addEventListener("scroll",ask,{passive:true});
  window.addEventListener("resize",function(){build();});
  window.addEventListener("st-relayout",function(){requestAnimationFrame(build);});
  if(document.fonts&&document.fonts.ready)document.fonts.ready.then(function(){build();});
  new MutationObserver(function(){if(pgb.querySelector(".st-wrap")&&(!S||S.wrap!==pgb.querySelector(".st-wrap")))later();}).observe(pgb,{childList:true});
})();
