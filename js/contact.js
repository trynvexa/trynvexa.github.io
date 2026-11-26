/* ============================================================
   contact.js
   ============================================================ */

/**
 * Paper Riot — Edisi 06
 * Newspaper contact sheet: live WIB clock, kinetic headline,
 * parallax portrait, newswire ticker, and eight-language copy.
 */
(function(){
  var pg = document.getElementById("pg"), pgb = document.getElementById("pgb");
  if (!pg || !pgb) return;
  var reduce = matchMedia("(prefers-reduced-motion: reduce)");
  var fine = matchMedia("(hover: hover) and (pointer: fine)");
  var DICT = {
    kicker: {id:"EDISI 06 — KONTAK", en:"EDITION 06 — CONTACT", zh:"第 06 期 — 联系", es:"EDICIÓN 06 — CONTACTO", ar:"العدد 06 — تواصل", fr:"ÉDITION 06 — CONTACT", ja:"第06号 — コンタクト", ko:"에디션 06 — 연락"},
    loc: {id:"MEDAN, INDONESIA — WIB", en:"MEDAN, INDONESIA — WIB", zh:"印尼棉兰 — WIB", es:"MEDAN, INDONESIA — WIB", ar:"ميدان، إندونيسيا — WIB", fr:"MEDAN, INDONÉSIE — WIB", ja:"インドネシア・メダン — WIB", ko:"인도네시아 메단 — WIB"},
    h1: {id:"ADA PROYEK?", en:"GOT A PROJECT?", zh:"有项目?", es:"¿TIENES UN PROYECTO?", ar:"لديك مشروع؟", fr:"UN PROJET ?", ja:"プロジェクトありますか？", ko:"프로젝트가 있나요?"},
    h2: {id:"Mari bicara.", en:"Let’s talk.", zh:"聊聊吧。", es:"Hablemos.", ar:"لنتحدث.", fr:"Parlons-en.", ja:"話しましょう。", ko:"이야기해요."},
    p: {id:"Kerja lepas, kolaborasi, atau sekadar bertukar pikiran soal web dan desain — semuanya terbuka. Ceritakan idemu, sekecil apa pun.", en:"Freelance work, collaboration, or just a chat about web and design — all welcome. Tell me your idea, however small.", zh:"自由职业、合作，或者只是聊聊网页与设计——全都欢迎。把你的想法告诉我，再小也可以。", es:"Trabajo freelance, colaboración o simplemente una charla sobre web y diseño: todo es bienvenido. Cuéntame tu idea, por pequeña que sea.", ar:"عمل حر، تعاون، أو مجرد حديث عن الويب والتصميم — كل ذلك مرحّب به. أخبرني بفكرتك، مهما كانت صغيرة.", fr:"Mission freelance, collaboration ou simple échange autour du web et du design — tout est bienvenu. Racontez-moi votre idée, même la plus petite.", ja:"フリーランスの仕事、コラボレーション、ウェブやデザインの雑談まで、すべて歓迎です。小さなアイデアでも聞かせてください。", ko:"프리랜스 작업, 협업, 또는 웹과 디자인에 대한 가벼운 대화까지 모두 환영합니다. 작은 아이디어라도 들려주세요."},
    status: {id:"Sedang menerima proyek", en:"Currently taking projects", zh:"正在接项目", es:"Aceptando proyectos", ar:"أستقبل مشاريع حاليًا", fr:"Disponible pour des projets", ja:"プロジェクト受付中", ko:"프로젝트 받는 중"},
    send: {id:"TULIS EMAIL", en:"WRITE AN EMAIL", zh:"写邮件", es:"ESCRIBIR UN CORREO", ar:"اكتب بريدًا", fr:"ÉCRIRE UN E-MAIL", ja:"メールを書く", ko:"이메일 쓰기"},
    find: {id:"TERBIT JUGA DI", en:"ALSO PUBLISHED ON", zh:"也发布在", es:"TAMBIÉN PUBLICADO EN", ar:"أنشر أيضًا على", fr:"AUSSI PUBLIÉ SUR", ja:"こちらでも発信中", ko:"여기서도 활동해요"},
    reply: {id:"Dibalas dalam 24 jam. Biasanya lebih cepat.", en:"Replies within 24 hours. Usually faster.", zh:"24 小时内回复，通常更快。", es:"Respondo en 24 horas. Normalmente antes.", ar:"أرد خلال 24 ساعة. غالبًا أسرع.", fr:"Réponse sous 24 h. Souvent plus vite.", ja:"24時間以内に返信します。たいていはもっと早く。", ko:"24시간 안에 답장합니다. 보통 더 빠르게."},
    quote: {id:"“Terlalu banyak ide, terlalu sedikit waktu. Mari mulai dari milikmu.”", en:"“Too many ideas, too little time. Let’s start with yours.”", zh:"“想法太多，时间太少。从你的开始吧。”", es:"“Demasiadas ideas, muy poco tiempo. Empecemos por la tuya.”", ar:"«أفكار كثيرة ووقت قليل. لنبدأ بفكرتك.»", fr:"« Trop d’idées, trop peu de temps. Commençons par la vôtre. »", ja:"「アイデアは多く、時間は少ない。あなたのアイデアから始めましょう。」", ko:"“아이디어는 많고 시간은 부족하니까. 당신의 아이디어부터 시작해요.”"},
    attrib: {id:"— Zikri, Medan", en:"— Zikri, Medan", zh:"— Zikri，棉兰", es:"— Zikri, Medan", ar:"— زكري، ميدان", fr:"— Zikri, Medan", ja:"— ズィクリ、メダン", ko:"— 지크리, 메단"},
    role: {id:"Front-End Developer · UI Designer", en:"Front-End Developer · UI Designer", zh:"前端开发者 · UI 设计师", es:"Desarrollador Front-End · Diseñador UI", ar:"مطوّر واجهات أمامية · مصمم واجهات", fr:"Développeur Front-End · Designer UI", ja:"フロントエンド開発者 · UIデザイナー", ko:"프론트엔드 개발자 · UI 디자이너"},
    ticker: {id:"ADA PROYEK? • KERJA LEPAS • KOLABORASI • FRONT-END • DESAIN UI • MEDAN, INDONESIA • BALAS <24 JAM •", en:"GOT A PROJECT? • FREELANCE • COLLABORATION • FRONT-END • UI DESIGN • MEDAN, INDONESIA • REPLIES <24H •", zh:"有项目? • 自由职业 • 合作 • 前端 • UI 设计 • 印尼棉兰 • 24 小时内回复 •", es:"¿TIENES UN PROYECTO? • FREELANCE • COLABORACIÓN • FRONT-END • DISEÑO UI • MEDAN, INDONESIA • RESPUESTA <24 H •", ar:"لديك مشروع؟ • عمل حر • تعاون • واجهات أمامية • تصميم واجهات • ميدان، إندونيسيا • رد خلال 24 ساعة •", fr:"UN PROJET ? • FREELANCE • COLLABORATION • FRONT-END • DESIGN UI • MEDAN, INDONÉSIE • RÉPONSE <24 H •", ja:"プロジェクトありますか？ • フリーランス • コラボレーション • フロントエンド • UIデザイン • インドネシア・メダン • 24時間以内に返信 •", ko:"프로젝트가 있나요? • 프리랜스 • 협업 • 프론트엔드 • UI 디자인 • 인도네시아 메단 • 24시간 내 답장 •"},
    vtick: {id:"EDISI 06 • POTRET • ZIKRI • MEDAN • 2026 •", en:"EDITION 06 • PORTRAIT • ZIKRI • MEDAN • 2026 •", zh:"第 06 期 • 肖像 • ZIKRI • 棉兰 • 2026 •", es:"EDICIÓN 06 • RETRATO • ZIKRI • MEDAN • 2026 •", ar:"العدد 06 • صورة • زكري • ميدان • 2026 •", fr:"ÉDITION 06 • PORTRAIT • ZIKRI • MEDAN • 2026 •", ja:"第06号 • ポートレート • ズィクリ • メダン • 2026 •", ko:"에디션 06 • 포트레이트 • 지크리 • 메단 • 2026 •"},
    alt: {id:"Zikri di antara lembaran koran yang beterbangan", en:"Zikri among flying sheets of newspaper", zh:"Zikri 置身于飞舞的报纸之间", es:"Zikri entre hojas de periódico al vuelo", ar:"زكري بين أوراق صحف متطايرة", fr:"Zikri parmi des feuilles de journal qui s’envolent", ja:"舞い散る新聞紙の中に立つズィクリ", ko:"신문지가 날리는 가운데 서 있는 지크리"},
    fast: {id:"RESPONS CEPAT", en:"FAST RESPONSE", zh:"快速响应", es:"RESPUESTA RÁPIDA", ar:"استجابة سريعة", fr:"RÉPONSE RAPIDE", ja:"迅速な対応", ko:"빠른 응답"},
    waChat: {id:"Chat Langsung via WhatsApp", en:"Direct Chat via WhatsApp", zh:"通过 WhatsApp 直接聊天", es:"Chat directo por WhatsApp", ar:"محادثة مباشرة عبر واتساب", fr:"Discussion directe via WhatsApp", ja:"WhatsAppで直接チャット", ko:"WhatsApp으로 바로 대화"},
    copyMail: {id:"Salin Email", en:"Copy Email", zh:"复制邮箱", es:"Copiar correo", ar:"نسخ البريد", fr:"Copier l’e-mail", ja:"メールをコピー", ko:"이메일 복사"},
    copied: {id:"Tersalin!", en:"Copied!", zh:"已复制!", es:"¡Copiado!", ar:"تم النسخ!", fr:"Copié !", ja:"コピー完了!", ko:"복사됨!"},
    compTitle: {id:"KIRIM PESAN CEPAT", en:"QUICK INQUIRY COMPOSER", zh:"快速发送消息", es:"MENSAJE RÁPIDO", ar:"إرسال رسالة سريعة", fr:"MESSAGE RAPIDE", ja:"クイックメッセージ作成", ko:"빠른 메시지 작성"},
    compName: {id:"Nama atau instansi Anda", en:"Your name or company", zh:"您的姓名或机构", es:"Tu nombre o empresa", ar:"اسمك أو جهتك", fr:"Votre nom ou entreprise", ja:"お名前・ご所属", ko:"이름 또는 소속"},
    compMsg: {id:"Ceritakan singkat proyek, kebutuhan, atau ide Anda...", en:"Briefly share your project, goals, or idea...", zh:"简述您的项目、需求或想法...", es:"Cuéntame brevemente tu proyecto, objetivo o idea...", ar:"شاركني بإيجاز مشروعك أو هدفك أو فكرتك...", fr:"Décrivez brièvement votre projet, besoin ou idée...", ja:"プロジェクトやご相談内容を簡単に教えてください...", ko:"프로젝트나 아이디어를 간단히 적어주세요..."},
    compWa: {id:"Kirim ke WhatsApp ↗", en:"Send via WhatsApp ↗", zh:"通过 WhatsApp 发送 ↗", es:"Enviar por WhatsApp ↗", ar:"إرسال عبر واتساب ↗", fr:"Envoyer sur WhatsApp ↗", ja:"WhatsAppで送信 ↗", ko:"WhatsApp으로 보내기 ↗"},
    compMail: {id:"Kirim via Email ↗", en:"Send via Email ↗", zh:"通过邮件发送 ↗", es:"Enviar por Correo ↗", ar:"إرسال عبر البريد ↗", fr:"Envoyer par E-mail ↗", ja:"メールで送信 ↗", ko:"이메일로 보내기 ↗"},
    tWeb: {id:"Proyek Web", en:"Web Project", zh:"网站项目", es:"Proyecto Web", ar:"مشروع ويب", fr:"Projet Web", ja:"Web制作", ko:"웹 프로젝트"},
    tUi: {id:"Desain UI/UX", en:"UI/UX Design", zh:"UI/UX 设计", es:"Diseño UI/UX", ar:"تصميم UI/UX", fr:"Design UI/UX", ja:"UI/UXデザイン", ko:"UI/UX 디자인"},
    tCollab: {id:"Kolaborasi", en:"Collaboration", zh:"创意合作", es:"Colaboración", ar:"تعاون", fr:"Collaboration", ja:"コラボ", ko:"협업"},
    tChat: {id:"Sapa & Diskusi", en:"Say Hi & Chat", zh:"交流讨论", es:"Saludar y Charlar", ar:"تحية ونقاش", fr:"Échange", ja:"気軽な相談", ko:"가벼운 문의"},
    starter0: {id:"+ Tanya estimasi & jadwal", en:"+ Ask timeline & quote", zh:"+ 咨询周期与报价", es:"+ Consultar plazo y presupuesto", ar:"+ استفسار عن المدة والتكلفة", fr:"+ Délais & devis", ja:"+ 納期・見積もり相談", ko:"+ 일정·견적 문의"},
    starter1: {id:"+ Butuh landing page", en:"+ Need a landing page", zh:"+ 需要落地页设计开发", es:"+ Necesito una landing page", ar:"+ أحتاج صفحة هبوط", fr:"+ Besoin d’une landing page", ja:"+ LP制作の相談", ko:"+ 랜딩 페이지 제작"},
    starter2: {id:"+ Ajak kolaborasi", en:"+ Collaborate on a build", zh:"+ 邀请创意合作", es:"+ Proponer colaboración", ar:"+ دعوة للتعاون", fr:"+ Proposer une collaboration", ja:"+ コラボのご相談", ko:"+ 협업 제안"},
    starter0Text: {
      id:"Saya ingin bertanya mengenai ketersediaan waktu, estimasi pengerjaan, dan kisaran biaya untuk proyek web.",
      en:"I'd like to ask about your availability, estimated timeline, and pricing for a web project.",
      zh:"想咨询您近期的档期安排、预计开发周期以及网站项目的参考报价。",
      es:"Me gustaría consultar tu disponibilidad, tiempos estimados y presupuesto para un proyecto web.",
      ar:"أود الاستفسار عن توافرك، المدة التقديرية للتنفيذ، ونطاق التكلفة لمشروع ويب.",
      fr:"Je souhaiterais connaître vos disponibilités, délais estimés et tarifs pour un projet web.",
      ja:"Web制作のご対応可否、スケジュール目安、およその費用感についてご相談したいです。",
      ko:"웹 프로젝트 진행 가능 여부와 예상 일정, 대략적인 비용을 문의드리고 싶습니다."
    },
    starter1Text: {
      id:"Saya membutuhkan landing page yang modern, cepat, dan responsif untuk brand/bisnis saya.",
      en:"I need a modern, fast, responsive landing page tailored for my brand or business.",
      zh:"我需要为品牌/业务打造一个现代、轻量且响应式的落地页。",
      es:"Necesito una landing page moderna, rápida y responsive para mi marca o negocio.",
      ar:"أحتاج إلى تصميم وتطوير صفحة هبوط حديثة وسريعة ومتجاوبة لعلامتي التجارية.",
      fr:"J'ai besoin d'une landing page moderne, rapide et responsive pour ma marque ou mon activité.",
      ja:"ブランド・サービス向けにモダンで高速・レスポンシブなランディングページを制作したいです。",
      ko:"브랜드/비즈니스에 맞는 모던하고 빠른 반응형 랜딩 페이지 제작이 필요합니다."
    },
    starter2Text: {
      id:"Saya punya ide proyek kreatif dan tertarik mengajak Anda berkolaborasi di sisi front-end & UI.",
      en:"I have a creative project idea and would love to collaborate with you on front-end & UI design.",
      zh:"我有一个创意项目构想，非常希望能与您在前端开发与 UI 设计方面展开合作。",
      es:"Tengo una idea de proyecto creativo y me encantaría colaborar contigo en front-end y diseño UI.",
      ar:"لدي فكرة لمشروع إبداعي وأرغب في التعاون معك في تطوير الواجهات وتصميم تجربة المستخدم.",
      fr:"J'ai une idée de projet créatif et j'aimerais collaborer avec vous sur le front-end et le design UI.",
      ja:"クリエイティブな企画があり、フロントエンドとUIデザイン面でご一緒できたら嬉しいです。",
      ko:"창의적인 프로젝트 아이디어가 있어 프론트엔드 및 UI 디자인 협업을 제안드리고 싶습니다."
    },
    prevLbl: {id:"PRATINJAU PESAN", en:"MESSAGE PREVIEW", zh:"消息预览", es:"VISTA PREVIA", ar:"معاينة الرسالة", fr:"APERÇU DU MESSAGE", ja:"メッセージプレビュー", ko:"메시지 미리보기"},
    copyMailAria: {id:"Salin alamat email", en:"Copy email address", zh:"复制邮箱地址", es:"Copiar dirección de correo", ar:"نسخ عنوان البريد الإلكتروني", fr:"Copier l’adresse e-mail", ja:"メールアドレスをコピー", ko:"이메일 주소 복사"},
    topicAria: {id:"Pilih topik diskusi", en:"Choose discussion topic", zh:"选择讨论主题", es:"Elegir tema de conversación", ar:"اختر موضوع النقاش", fr:"Choisir le sujet", ja:"相談トピックを選択", ko:"문의 주제 선택"},
    passAria: {id:"Kartu Identitas 3D Interaktif M. Zikri (Geser untuk memutar)", en:"Interactive 3D Identity Card of M. Zikri (Drag to rotate)", zh:"M. Zikri 3D 交互身份卡（拖动旋转）", es:"Tarjeta de identidad 3D interactiva de M. Zikri (Arrastra para girar)", ar:"بطاقة الهوية التفاعلية ثلاثية الأبعاد لـ M. Zikri (اسحب للتدوير)", fr:"Carte d’identité 3D interactive de M. Zikri (Glisser pour pivoter)", ja:"M. Zikri インタラクティブ3D IDカード（ドラッグで回転）", ko:"M. Zikri 인터랙티브 3D ID 카드 (드래그하여 회전)"},
    passKicker: {id:"EDISI 06 • KARTU AKSES", en:"EDITION 06 • DEV PASS", zh:"第 06 期 • 开发者通行证", es:"EDICIÓN 06 • PASE DEV", ar:"العدد 06 • بطاقة مطوّر", fr:"ÉDITION 06 • PASS DEV", ja:"第06号 • 開発者パス", ko:"에디션 06 • 개발자 패스"},
    passSubkicker: {id:"MEDAN, ID (WIB)", en:"MEDAN, ID (WIB)", zh:"印尼棉兰 (WIB)", es:"MEDAN, ID (WIB)", ar:"ميدان، إندونيسيا (WIB)", fr:"MEDAN, ID (WIB)", ja:"インドネシア・メダン (WIB)", ko:"인도네시아 메단 (WIB)"},
    passClearance: {id:"AKSES PENUH", en:"ALL-ACCESS", zh:"全权限通行", es:"ACCESO TOTAL", ar:"دخول شامل", fr:"ACCÈS TOTAL", ja:"全アクセス", ko:"전체 액세스"},
    passVerified: {id:"TERVERIFIKASI", en:"VERIFIED", zh:"已认证", es:"VERIFICADO", ar:"موثّق", fr:"VÉRIFIÉ", ja:"認証済み", ko:"인증됨"},
    passAuth: {id:"RESMI", en:"AUTH", zh:"认证", es:"OFICIAL", ar:"معتمد", fr:"AUTH", ja:"認証", ko:"공식"},
    passRole: {id:"PENGEMBANG FRONT-END • DESAINER UI", en:"FRONT-END DEVELOPER • UI DESIGNER", zh:"前端开发者 • UI 设计师", es:"DESARROLLADOR FRONT-END • DISEÑADOR UI", ar:"مطوّر واجهات أمامية • مصمم UI", fr:"DÉVELOPPEUR FRONT-END • DESIGNER UI", ja:"フロントエンド開発者 • UIデザイナー", ko:"프론트엔드 개발자 • UI 디자이너"},
    specInst: {id:"INSTITUSI", en:"SCHOOL", zh:"学校", es:"INSTITUCIÓN", ar:"المؤسسة", fr:"ÉCOLE", ja:"所属校", ko:"소속 학교"},
    specPkl: {id:"UNIT PKL", en:"INTERNSHIP", zh:"实习单位", es:"PRÁCTICAS", ar:"التدريب", fr:"STAGE", ja:"実習先", ko:"실습 기관"},
    specBase: {id:"BASIS", en:"BASE", zh:"所在地", es:"BASE", ar:"المقر", fr:"BASE", ja:"拠点", ko:"거점"},
    specMedan: {id:"MEDAN (WIB)", en:"MEDAN (WIB)", zh:"棉兰 (WIB)", es:"MEDAN (WIB)", ar:"ميدان (WIB)", fr:"MEDAN (WIB)", ja:"メダン (WIB)", ko:"메단 (WIB)"},
    passEmailLbl: {id:"Surel", en:"Email", zh:"电子邮箱", es:"Correo", ar:"البريد الإلكتروني", fr:"E-mail", ja:"メール", ko:"이메일"},
    passFlipBack: {id:"BALIK KARTU • SPEK & SOSIAL", en:"FLIP CARD • SPECS & SOCIALS", zh:"翻转卡片 • 规格与社交", es:"GIRAR TARJETA • DATOS Y REDES", ar:"اقلب البطاقة • المواصفات والتواصل", fr:"RETOURNER • SPECS & RÉSEAUX", ja:"裏面を見る • スペック＆SNS", ko:"카드 뒤집기 • 스펙 & 소셜"},
    passFlipBackAria: {id:"Balikkan kartu ke sisi belakang", en:"Flip the card to its back side", zh:"将卡片翻到背面", es:"Girar la tarjeta al reverso", ar:"اقلب البطاقة إلى الوجه الخلفي", fr:"Retourner la carte côté verso", ja:"カードを裏面に返す", ko:"카드를 뒷면으로 뒤집기"},
    passSig: {id:"TANDA TANGAN RESMI • TIDAK DAPAT DIPINDAHTANGANKAN", en:"AUTHORIZED SIGNATURE • NOT TRANSFERABLE", zh:"授权签名 • 不可转让", es:"FIRMA AUTORIZADA • INTRANSFERIBLE", ar:"توقيع معتمد • غير قابل للتحويل", fr:"SIGNATURE AUTORISÉE • NON TRANSFÉRABLE", ja:"公式署名 • 譲渡不可", ko:"공식 서명 • 양도 불가"},
    passSec: {id:"KODE", en:"SEC", zh:"安全码", es:"SEG", ar:"الأمان", fr:"SÉC", ja:"コード", ko:"보안"},
    passNetTitle: {id:"JARINGAN & KODE SUMBER", en:"NETWORK & SOURCE CODE", zh:"社交与代码仓库", es:"REDES Y CÓDIGO FUENTE", ar:"الشبكات والشيفرة المصدرية", fr:"RÉSEAUX & CODE SOURCE", ja:"ネットワーク＆ソースコード", ko:"네트워크 & 소스 코드"},
    passNetTag: {id:"TERHUBUNG", en:"CONNECTED", zh:"已连接", es:"CONECTADO", ar:"متصل", fr:"CONNECTÉ", ja:"接続済み", ko:"연결됨"},
    socGhSub: {id:"@trynvexa • Repositori Kode", en:"@trynvexa • Code Repositories", zh:"@trynvexa • 代码仓库", es:"@trynvexa • Repositorios", ar:"@trynvexa • مستودعات الكود", fr:"@trynvexa • Dépôts de code", ja:"@trynvexa • コードリポジトリ", ko:"@trynvexa • 코드 저장소"},
    socIgSub: {id:"@yo144484 • Visual & Desain", en:"@yo144484 • Visuals & Design", zh:"@yo144484 • 视觉与设计", es:"@yo144484 • Visual y diseño", ar:"@yo144484 • البصريات والتصميم", fr:"@yo144484 • Visuels & Design", ja:"@yo144484 • ビジュアル＆デザイン", ko:"@yo144484 • 비주얼 & 디자인"},
    socTtSub: {id:"@frince_nael7 • Konten Kreatif", en:"@frince_nael7 • Creative Content", zh:"@frince_nael7 • 创意内容", es:"@frince_nael7 • Contenido creativo", ar:"@frince_nael7 • محتوى إبداعي", fr:"@frince_nael7 • Contenu créatif", ja:"@frince_nael7 • クリエイティブ発信", ko:"@frince_nael7 • 크리에이티브 콘텐츠"},
    passBuild: {id:"MESIN BANGUN", en:"BUILD ENGINE", zh:"构建引擎", es:"MOTOR DE CREACIÓN", ar:"محرك البناء", fr:"MOTEUR DE BUILD", ja:"ビルド構成", ko:"빌드 엔진"},
    passProd: {id:"UNIT PRODUKSI", en:"PROD UNIT", zh:"实习团队", es:"UNIDAD PROD.", ar:"وحدة الإنتاج", fr:"UNITÉ PROD.", ja:"実務ユニット", ko:"실무 유닛"},
    passProdVal: {id:"PKL DIGITALCODE 2026", en:"DIGITALCODE INTERNSHIP 2026", zh:"DIGITALCODE 实习 2026", es:"PRÁCTICAS DIGITALCODE 2026", ar:"تدريب DIGITALCODE 2026", fr:"STAGE DIGITALCODE 2026", ja:"DIGITALCODE 実習 2026", ko:"DIGITALCODE 실습 2026"},
    passFlipFront: {id:"KEMBALI KE SISI DEPAN", en:"BACK TO FRONT SIDE", zh:"返回正面", es:"VOLVER AL ANVERSO", ar:"العودة إلى الوجه الأمامي", fr:"RETOUR AU RECTO", ja:"表面へ戻る", ko:"앞면으로 돌아가기"},
    passFlipFrontAria: {id:"Balikkan kartu ke sisi depan", en:"Flip the card to its front side", zh:"将卡片翻到正面", es:"Girar la tarjeta al anverso", ar:"اقلب البطاقة إلى الوجه الأمامي", fr:"Retourner la carte côté recto", ja:"カードを表面に返す", ko:"카드를 앞면으로 뒤집기"},
    greet: {id:"Halo Zikri! Saya ", en:"Hi Zikri! I'm ", zh:"你好 Zikri！我是", es:"¡Hola Zikri! Soy ", ar:"مرحبًا زكري! أنا ", fr:"Bonjour Zikri ! Je suis ", ja:"こんにちはZikriさん！", ko:"안녕하세요 지크리님! 저는 "},
    guest: {id:"pengunjung dari portofolio Anda", en:"a visitor from your portfolio", zh:"来自您作品集的访客", es:"un visitante de tu portafolio", ar:"زائر من معرض أعمالك", fr:"un visiteur de votre portfolio", ja:"ポートフォリオを拝見した者です", ko:"포트폴리오를 보고 연락드린 방문자입니다"},
    waIntro: {id:"Saya baru melihat portofolio Anda dan tertarik berdiskusi mengenai", en:"I just explored your portfolio and would love to chat about", zh:"我刚浏览了您的作品集，很想和您聊聊关于", es:"Acabo de ver tu portafolio y me encantaría hablar sobre", ar:"لقد تصفحت معرض أعمالك للتو وأود التحدث معك حول", fr:"Je viens de découvrir votre portfolio et j'aimerais échanger à propos de", ja:"ポートフォリオを拝見し、以下の件についてご相談したく連絡しました：", ko:"포트폴리오를 잘 보았습니다. 아래 주제로 이야기 나누고 싶습니다:"},
    waClose: {id:"Boleh kita lanjut diskusi di sini? Terima kasih banyak!", en:"Would love to continue chatting here whenever you're free. Thanks!", zh:"方便的话我们可以在这里继续沟通吗？非常感谢！", es:"¿Podemos seguir conversando por aquí cuando tengas un momento? ¡Muchas gracias!", ar:"هل يمكننا متابعة الحديث هنا في الوقت المناسب لك؟ شكرًا جزيلًا!", fr:"Pouvons-nous en discuter ici dès que vous avez un moment ? Merci beaucoup !", ja:"お時間のある際にお返事いただけますと幸いです。よろしくお願いいたします！", ko:"편하실 때 여기서 이어서 이야기 나눌 수 있을까요? 감사합니다!"},
    mailSalute: {id:"Halo M. Zikri Al-Bukhori,", en:"Dear M. Zikri Al-Bukhori,", zh:"您好 M. Zikri Al-Bukhori：", es:"Estimado M. Zikri Al-Bukhori,", ar:"تحية طيبة أستاذ M. Zikri Al-Bukhori،", fr:"Bonjour M. Zikri Al-Bukhori,", ja:"M. Zikri Al-Bukhori 様", ko:"안녕하세요, M. Zikri Al-Bukhori 님."},
    mailIntro: {id:"Perkenalkan, saya ", en:"My name is ", zh:"您好，我是", es:"Me presento, soy ", ar:"أعرّفك بنفسي، أنا ", fr:"Je me présente, je suis ", ja:"はじめまして、", ko:"안녕하세요, 저는 "},
    mailVia: {id:"Saya menghubungi Anda melalui portofolio web terkait topik ", en:"I'm reaching out through your portfolio regarding ", zh:"我通过您的个人作品集联系您，想进一步沟通关于", es:"Me pongo en contacto contigo a través de tu portafolio en relación con ", ar:"أتواصل معك عبر معرض أعمالك بخصوص ", fr:"Je vous contacte via votre portfolio au sujet de ", ja:"ポートフォリオサイトを拝見し、次の件についてご連絡いたしました：", ko:"포트폴리오를 통해 다음 주제로 연락드립니다: "},
    mailDetail: {id:"Ringkasan pesan:", en:"Brief details:", zh:"具体说明：", es:"Detalles breves:", ar:"تفاصيل موجزة:", fr:"Détails en bref :", ja:"ご相談内容：", ko:"문의 내용:"},
    mailClose: {id:"Terima kasih atas waktu dan perhatian Anda. Saya nantikan kabar baiknya.", en:"Thank you for your time and consideration. I look forward to hearing from you.", zh:"感谢您的时间与关注，期待您的回复。", es:"Muchas gracias por tu tiempo y atención. Quedo atento a tu respuesta.", ar:"شكرًا لوقتك واهتمامك، وأتطلع إلى ردك الكريم.", fr:"Je vous remercie pour votre temps et votre attention, et reste dans l'attente de votre retour.", ja:"お忙しいところ恐れ入りますが、ご返信をお待ちしております。", ko:"시간 내어 읽어주셔서 감사합니다. 좋은 답변 기다리겠습니다."},
    mailSign: {id:"Salam hangat,", en:"Best regards,", zh:"顺祝商祺，", es:"Un cordial saludo,", ar:"مع أطيب التحيات،", fr:"Bien cordialement,", ja:"よろしくお願いいたします。", ko:"감사합니다,"},
    tplWeb: {id:"Saya sedang merencanakan pembuatan website dan ingin berdiskusi soal konsep, estimasi waktu, serta biayanya.", en:"I'm planning a website build and would like to discuss the concept, timeline, and budget.", zh:"我正在筹划一个网站项目，希望探讨设计方向、开发周期与预算方案。", es:"Estoy planificando un sitio web y me gustaría hablar sobre el concepto, plazos y presupuesto.", ar:"أخطط لبناء موقع إلكتروني وأود مناقشة الفكرة والجدول الزمني والميزانية.", fr:"Je prépare la création d'un site web et j'aimerais discuter du concept, des délais et du budget.", ja:"Webサイトの制作を検討しており、構成・スケジュール・費用感について相談したいです。", ko:"웹사이트 제작을 계획 중이며 방향성, 일정, 예산에 대해 논의하고 싶습니다."},
    tplUi: {id:"Saya membutuhkan bantuan desain UI/UX agar tampilan produk digital saya lebih rapi, modern, dan nyaman dipakai.", en:"I'm looking for UI/UX design support to make my digital product cleaner, sharper, and easier to use.", zh:"我需要 UI/UX 设计支持，让产品界面更清晰、现代且易于使用。", es:"Busco apoyo en diseño UI/UX para hacer mi producto digital más limpio, moderno e intuitivo.", ar:"أبحث عن دعم في تصميم UI/UX لجعل منتجي الرقمي أكثر أناقة وسهولة في الاستخدام.", fr:"Je recherche un accompagnement en design UI/UX pour rendre mon produit plus clair, moderne et fluide.", ja:"デジタルプロダクトのUI/UXをより洗練され使いやすい体験にブラッシュアップしたいです。", ko:"디지털 프로덕트를 더욱 깔끔하고 사용하기 편하게 개선할 UI/UX 디자인을 논의하고 싶습니다."},
    tplCollab: {id:"Saya tertarik mengajak Anda berkolaborasi dalam proyek kreatif di bidang front-end dan desain antarmuka.", en:"I'd love to invite you to collaborate on a creative front-end and interface design project.", zh:"我很希望能邀请您共同参与一个前端与界面设计方向的创意合作项目。", es:"Me encantaría invitarte a colaborar en un proyecto creativo de front-end y diseño de interfaces.", ar:"يسعدني دعوتك للتعاون في مشروع إبداعي في مجال الواجهات الأمامية وتصميم التجربة.", fr:"J'aimerais vous proposer une collaboration sur un projet créatif en front-end et design d'interface.", ja:"フロントエンドとUIデザイン領域でのクリエイティブなコラボレーションをご相談したいです。", ko:"프론트엔드와 인터페이스 디자인 분야의 창의적인 프로젝트 협업을 제안드리고 싶습니다."},
    tplChat: {id:"Saya sangat suka karya di portofolio Anda dan ingin menyapa serta bertukar pikiran seputar web & desain.", en:"I really enjoyed your portfolio and just wanted to say hi and exchange ideas about web & design.", zh:"非常喜欢您的作品集，想打个招呼并交流一下网页开发与设计的想法。", es:"Me encantó tu portafolio y quería saludarte e intercambiar ideas sobre web y diseño.", ar:"أعجبتني أعمالك في المعرض كثيرًا وأردت إلقاء التحية وتبادل الأفكار حول الويب والتصميم.", fr:"J'ai beaucoup aimé votre portfolio et je voulais simplement vous saluer et échanger autour du web et du design.", ja:"ポートフォリオがとても素敵でしたので、Webやデザインについて少しお話しできればと思い連絡しました。", ko:"포트폴리오가 인상 깊어서 인사드리고 웹·디자인 관련 이야기를 나누고 싶습니다."},
    subjFrom: {id:"Diskusi dari ", en:"Inquiry from ", zh:"来自 ", es:"Consulta de ", ar:"رسالة من ", fr:"Demande de ", ja:"お問い合わせ：", ko:"문의 — "},
    subjDefault: {id:"Diskusi dari Portofolio Web", en:"Portfolio Inquiry", zh:"来自作品集的咨询", es:"Consulta desde el Portafolio", ar:"استفسار من معرض الأعمال", fr:"Contact depuis le Portfolio", ja:"ポートフォリオからのお問い合わせ", ko:"포트폴리오 문의"}
  };
  function lang(){ return (window.ZK && ZK.lang) || "id"; }
  function word(k){ var d = DICT[k]; return d ? (d[lang()] || d.id) : ""; }

  /* --- headline: pecah jadi strip huruf (Arab tetap utuh agar huruf menyambung) --- */
  var kin = [], kinRaf = 0, mx = -9999, my = -9999;
  function splitChars(el, text){
    el.textContent = "";
    kin = [];
    if (lang() === "ar" || reduce.matches) { el.textContent = text; el.classList.add("is-flat"); return; }
    el.classList.remove("is-flat");
    var n = 0, cjk = lang() === "zh" || lang() === "ja";
    text.split(/(\s+)/).forEach(function(part){
      if (!part) return;
      if (/^\s+$/.test(part)) { el.appendChild(document.createTextNode(" ")); return; }
      var w = cjk ? el : document.createElement("span");
      if (!cjk) w.className = "pr-w";
      for (var i = 0; i < part.length; i++) {
        var c = document.createElement("span");
        c.className = "pr-ch";
        c.style.setProperty("--i", n++);
        c.textContent = part.charAt(i);
        w.appendChild(c);
        kin.push({ el: c, y: 0, vy: 0, r: 0, vr: 0, ty: 0, tr: 0 });
      }
      if (!cjk) el.appendChild(w);
    });
  }
  function kinMove(){
    kinRaf = 0;
    var live = false;
    for (var i = 0; i < kin.length; i++) {
      var k = kin[i], b = k.el.getBoundingClientRect();
      var dx = mx - (b.left + b.width / 2), dy = my - (b.top + b.height / 2);
      var d = Math.hypot(dx, dy) || 1, f = Math.max(0, 1 - d / 150);
      k.ty = -12 * f;
      k.tr = (dx < 0 ? 1 : -1) * 7 * f;
      k.vy = (k.vy + (k.ty - k.y) * .26) * .7;
      k.vr = (k.vr + (k.tr - k.r) * .24) * .7;
      k.y += k.vy; k.r += k.vr;
      if (Math.abs(k.vy) > .02 || Math.abs(k.vr) > .02 || Math.abs(k.ty - k.y) > .05) live = true;
      k.el.style.transform = "translate3d(0," + k.y.toFixed(2) + "px,0) rotate(" + k.r.toFixed(2) + "deg)";
    }
    if (live) kinRaf = requestAnimationFrame(kinMove);
    else {
      // Ketika kinetik selesai, kosongkan inline transform agar animasi CSS breath berjalan mulus
      for (var j = 0; j < kin.length; j++) kin[j].el.style.transform = "";
    }
  }

  function fitTicker(root){
    var box = root.querySelector(".pr-tick"), track = box && box.querySelector(".pr-tick-track");
    if (!track) return;
    var base = track.querySelector(".pr-tick-run");
    if (!base) return;
    var vw = box.clientWidth, rw = base.getBoundingClientRect().width;
    if (!vw) return;
    if (rw < 1) { requestAnimationFrame(function(){ if (root.isConnected) fitTicker(root); }); return; }
    var k = Math.max(1, Math.ceil(vw / rw) + 1), one = base.outerHTML, half = "";
    for (var i = 0; i < k; i++) half += one;
    track.innerHTML = half + half;
    track.style.animationDuration = Math.max(12, Math.round(k * rw / 30)) + "s";
  }
  function tr(root){
    root.setAttribute("lang", lang());
    root.setAttribute("dir", lang() === "ar" ? "rtl" : "ltr");
    [].forEach.call(root.querySelectorAll("[data-kt]"), function(el){
      var t = word(el.getAttribute("data-kt"));
      if (!t) return;
      if (el.hasAttribute("data-kinetic")) splitChars(el, t);
      else if (el.textContent !== t) el.textContent = t;
    });
    [].forEach.call(root.querySelectorAll("[data-ka]"), function(el){
      var t = word(el.getAttribute("data-ka")); if (!t) return;
      if (el.tagName === "IMG") el.alt = t;
      else if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") el.placeholder = t;
      else el.setAttribute("aria-label", t);
    });
    requestAnimationFrame(function(){ if (root.isConnected) fitTicker(root); });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(function(){ if (root.isConnected) fitTicker(root); });
  }

  var fmt = null;
  try { fmt = new Intl.DateTimeFormat("en-GB", {hour: "2-digit", minute: "2-digit", second: "2-digit", hourCycle: "h23", timeZone: "Asia/Jakarta"}); } catch (e) {}
  function tick(root){
    var c = root.querySelector(".pr-clock"); if (!c || !fmt) return;
    var s = fmt.format(new Date()).replace(/:/g, ".");
    c.setAttribute("datetime", s);
    if (!c.querySelector(".pr-flap")) {
      var h = "";
      for (var i = 0; i < s.length; i++) {
        var ch = s.charAt(i);
        if (ch === ".") h += '<span class="pr-flap-sep">.</span>';
        else h += '<span class="pr-flap" data-v="' + ch + '">' + ch + '</span>';
      }
      c.innerHTML = h;
      return;
    }
    var flaps = c.querySelectorAll(".pr-flap");
    var dIdx = 0;
    for (var i = 0; i < s.length; i++) {
      var ch = s.charAt(i);
      if (ch === ".") continue;
      var flap = flaps[dIdx++];
      if (flap && flap.getAttribute("data-v") !== ch) {
        flap.setAttribute("data-v", ch);
        flap.textContent = ch;
        flap.classList.remove("flip");
        void flap.offsetWidth;
        flap.classList.add("flip");
      }
    }
  }

  var cur = null, raf = 0, px = 0, py = 0, tpx = 0, tpy = 0;
  function loop(){
    raf = 0;
    if (!cur || !cur.isConnected) return;
    px += (tpx - px) * .07; py += (tpy - py) * .07;
    pg.style.setProperty("--mx", px.toFixed(3)); pg.style.setProperty("--my", py.toFixed(3));
    if (Math.abs(tpx - px) > .002 || Math.abs(tpy - py) > .002) raf = requestAnimationFrame(loop);
  }
  function kick(){ if (!raf) raf = requestAnimationFrame(loop); }

  pg.addEventListener("pointermove", function(e){
    if (!cur || !cur.isConnected || e.pointerType === "touch") return;
    if (!reduce.matches) {
      mx = e.clientX; my = e.clientY;
      if (kin.length && !kinRaf) kinRaf = requestAnimationFrame(kinMove);
    }
    if (reduce.matches) return;
    tpx = (e.clientX / innerWidth - .5) * 2; tpy = (e.clientY / innerHeight - .5) * 2;
    var m = cur.querySelector(".pr-mail");
    if (m) {
      var b = m.getBoundingClientRect(), dx = e.clientX - (b.left + b.width / 2), dy = e.clientY - (b.top + b.height / 2), f = Math.max(0, 1 - Math.hypot(dx, dy) / 260);
      m.style.translate = f > 0 ? (dx * .05 * f).toFixed(1) + "px " + (dy * .12 * f).toFixed(1) + "px" : "";
    }
    kick();
  });
  pg.addEventListener("pointerleave", function(){
    if (!cur) return;
    mx = my = -9999;
    if (!reduce.matches && kin.length && !kinRaf) kinRaf = requestAnimationFrame(kinMove);
    var m = cur.querySelector(".pr-mail"); if (m) m.style.translate = "";
  });

  // 3D Floating Levitation Pass Controller (Bebas Melayang & Berotasi Bebas)
  function initPass3D(root) {
    var stage = root.querySelector(".pass-stage");
    var card = root.querySelector(".pass-card");
    var glare = root.querySelector(".pass-glare");
    var shadow = root.querySelector(".pass-shadow");
    if (!stage || !card) return;

    var isDragging = false;
    var startX = 0, startY = 0;
    var currentRotY = -12, currentRotX = 3;
    var targetRotY = 0, targetRotX = 0;
    var velRotY = 0, velRotX = 0;
    var lastDragX = 0, lastDragY = 0;
    var currentFloatX = 0, currentFloatY = 0;
    var targetFloatX = 0, targetFloatY = 0;
    var isFlipped = false;
    var animRaf = 0;
    var time = 0;

    function updateCard3D() {
      if (!root.isConnected || pg.hidden || !pg.classList.contains("open")) {
        animRaf = 0;
        return;
      }
      if (document.hidden) {
        animRaf = requestAnimationFrame(updateCard3D);
        return;
      }
      time += 0.032;

      // Efek melayang mengambang alami (ambient levitation)
      var levitateY = !reduce.matches ? Math.sin(time) * 8.5 : 0;
      var levitateRotZ = !reduce.matches ? Math.cos(time * 0.65) * 1.3 : 0;

      if (!isDragging) {
        velRotY *= 0.90;
        velRotX *= 0.90;
        currentRotY += (targetRotY - currentRotY) * 0.10 + velRotY;
        currentRotX += (targetRotX - currentRotX) * 0.10 + velRotX;
        currentFloatX += (targetFloatX - currentFloatX) * 0.12;
        currentFloatY += (targetFloatY - currentFloatY) * 0.12;
      }

      var totalX = currentFloatX;
      var totalY = currentFloatY + levitateY;

      // Transform kartu: rotasi 3D bebas dan pergeseran mengambang
      card.style.transform = "translate3d(" + totalX.toFixed(2) + "px, " + totalY.toFixed(2) + "px, 0) rotateY(" + currentRotY.toFixed(2) + "deg) rotateX(" + currentRotX.toFixed(2) + "deg) rotateZ(" + levitateRotZ.toFixed(2) + "deg)";

      // Update bayangan di bawah kartu sesuai ketinggian melayang
      if (shadow) {
        var shadowScale = Math.max(0.75, Math.min(1.2, 1 - (totalY / 140)));
        var shadowOpacity = Math.max(0.12, Math.min(0.48, 0.34 - (totalY / 260)));
        shadow.style.transform = "translateX(-50%) translate3d(" + (totalX * 0.35).toFixed(1) + "px, 0, 0) scale(" + shadowScale.toFixed(2) + ")";
        shadow.style.opacity = shadowOpacity.toFixed(2);
      }

      if (glare) {
        var normY = (currentRotY % 360 + 360) % 360;
        var glareAngle = (135 + currentRotY * 1.4 + currentRotX * 0.8).toFixed(1);
        var glareOpacity = Math.max(0.15, Math.min(0.85, 0.42 + Math.sin(normY * Math.PI / 180) * 0.28));
        glare.style.setProperty("--glare-angle", glareAngle + "deg");
        glare.style.opacity = glareOpacity.toFixed(2);
      }

      var diffY = Math.abs(targetRotY - currentRotY) + Math.abs(velRotY);
      var diffX = Math.abs(targetRotX - currentRotX) + Math.abs(velRotX);
      var diffF = Math.abs(targetFloatX - currentFloatX) + Math.abs(targetFloatY - currentFloatY);

      if (!reduce.matches || diffY > 0.04 || diffX > 0.04 || diffF > 0.04 || isDragging) {
        animRaf = requestAnimationFrame(updateCard3D);
      } else {
        animRaf = 0;
      }
    }

    function requestAnim() {
      if (!animRaf) animRaf = requestAnimationFrame(updateCard3D);
    }

    function onDragMove(e) {
      if (!isDragging) return;
      var dx = e.clientX - lastDragX;
      var dy = e.clientY - lastDragY;
      lastDragX = e.clientX;
      lastDragY = e.clientY;

      // Bebas berotasi 3D ke segala arah
      currentRotY += dx * 0.68;
      currentRotX -= dy * 0.45;
      currentRotX = Math.max(-48, Math.min(48, currentRotX));

      velRotY = dx * 0.40;
      velRotX = -dy * 0.28;
      targetRotY = currentRotY;
      targetRotX = currentRotX;

      // Bebas bergeser ringan mengikuti drag kursor
      var totalDx = e.clientX - startX;
      var totalDy = e.clientY - startY;
      targetFloatX = Math.max(-75, Math.min(75, totalDx * 0.32));
      targetFloatY = Math.max(-65, Math.min(65, totalDy * 0.32));
      currentFloatX = targetFloatX;
      currentFloatY = targetFloatY;

      requestAnim();
    }

    function onDragEnd(e) {
      if (!isDragging) return;
      isDragging = false;
      targetFloatX = 0;
      targetFloatY = 0;
      card.classList.remove("is-dragging");
      window.removeEventListener("pointermove", onDragMove);
      window.removeEventListener("pointerup", onDragEnd);
      window.removeEventListener("pointercancel", onDragEnd);
      try { card.releasePointerCapture(e.pointerId); } catch(err) {}

      // Snap lembut ke hadapan depan atau belakang jika putaran sudah mereda
      if (Math.abs(velRotY) < 1.4) {
        var normalizedY = (currentRotY % 360 + 360) % 360;
        if (normalizedY > 90 && normalizedY < 270) {
          isFlipped = true;
          targetRotY = Math.round(currentRotY / 360) * 360 + 180;
        } else {
          isFlipped = false;
          targetRotY = Math.round((currentRotY - (normalizedY > 270 ? 360 : 0)) / 360) * 360;
        }
      }
      targetRotX = 0;
      requestAnim();
    }

    card.addEventListener("pointerdown", function(e) {
      if (e.target.closest("a, button, .pass-act-btn, .pass-soc-pill, .pass-flip-btn, .pass-flip-hint")) return;
      isDragging = true;
      startX = e.clientX;
      startY = e.clientY;
      lastDragX = e.clientX;
      lastDragY = e.clientY;
      try { card.setPointerCapture(e.pointerId); } catch(err) {}
      card.classList.add("is-dragging");
      window.addEventListener("pointermove", onDragMove);
      window.addEventListener("pointerup", onDragEnd);
      window.addEventListener("pointercancel", onDragEnd);
      requestAnim();
    });

    [].forEach.call(card.querySelectorAll(".pass-flip-hint, .pass-flip-btn"), function(btn) {
      btn.addEventListener("click", function(e) {
        e.stopPropagation();
        isFlipped = !isFlipped;
        targetRotY += 180;
        targetRotX = 0;
        velRotY = 3.5;
        requestAnim();
      });
    });

    card.addEventListener("keydown", function(e) {
      if (e.key === "Enter" || e.key === " ") {
        if (e.target.closest("a, button")) return;
        e.preventDefault();
        isFlipped = !isFlipped;
        targetRotY += 180;
        requestAnim();
      }
    });

    stage.addEventListener("pointermove", function(e) {
      if (isDragging || reduce.matches || e.pointerType === "touch") return;
      var rect = stage.getBoundingClientRect();
      var nx = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
      var ny = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
      nx = Math.max(-1, Math.min(1, nx));
      ny = Math.max(-1, Math.min(1, ny));

      var baseAngle = isFlipped ? 180 : 0;
      targetRotY = baseAngle + nx * 20;
      targetRotX = -ny * 16;
      targetFloatX = nx * 12;
      targetFloatY = ny * 10;
      requestAnim();
    });

    stage.addEventListener("pointerleave", function() {
      if (isDragging || reduce.matches) return;
      targetRotY = isFlipped ? 180 : 0;
      targetRotX = 0;
      targetFloatX = 0;
      targetFloatY = 0;
      requestAnim();
    });

    // Initial entrance animation
    setTimeout(function() {
      targetRotY = 0;
      targetRotX = 0;
      requestAnim();
    }, 200);
  }

  function initComposer(root) {
    var copyBtn = root.querySelector("#copyEmailBtn");
    if (copyBtn) {
      copyBtn.addEventListener("click", function() {
        var email = "zikriganteng2023@gmail.com";
        var lbl = copyBtn.querySelector("span");
        function done() {
          copyBtn.classList.add("is-copied");
          if (lbl) lbl.textContent = word("copied") || "Tersalin!";
          setTimeout(function() {
            copyBtn.classList.remove("is-copied");
            if (lbl) lbl.textContent = word("copyMail") || "Salin Email";
          }, 2200);
        }
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(email).then(done).catch(done);
        } else {
          done();
        }
      });
    }
    var comp = root.querySelector(".pr-composer");
    if (!comp) return;
    var pills = comp.querySelectorAll(".prc-topic");
    var chips = comp.querySelectorAll(".prc-chip");
    var nameIn = comp.querySelector("#prcName");
    var msgIn = comp.querySelector("#prcMsg");
    var prevEl = comp.querySelector("#prcPreview");
    var waBtn = comp.querySelector("#prcWaBtn");
    var mailBtn = comp.querySelector("#prcMailBtn");

    function topicDefault(code) {
      if (code === "ui") return word("tplUi");
      if (code === "collab") return word("tplCollab");
      if (code === "chat") return word("tplChat");
      return word("tplWeb");
    }

    function getDraft() {
      var onPill = comp.querySelector(".prc-topic.on");
      var topicCode = onPill ? (onPill.getAttribute("data-topic") || "web") : "web";
      var topicText = onPill ? onPill.textContent.trim() : word("tWeb");
      var nm = (nameIn && nameIn.value.trim()) ? nameIn.value.trim() : "";
      var ms = (msgIn && msgIn.value.trim()) ? msgIn.value.trim() : "";
      var sender = nm || word("guest");
      var body = ms || topicDefault(topicCode);
      return { topicCode: topicCode, topicText: topicText, nm: nm, sender: sender, body: body };
    }

    function buildWhatsAppMessage() {
      var d = getDraft();
      return (
        word("greet") + d.sender + ".\n\n" +
        word("waIntro") + " *" + d.topicText + "*.\n" +
        d.body + "\n\n" +
        word("waClose")
      );
    }

    function buildEmailMessage() {
      var d = getDraft();
      var subject = "[" + d.topicText + "] " + (d.nm ? (word("subjFrom") + d.nm) : word("subjDefault"));
      var body =
        word("mailSalute") + "\n\n" +
        word("mailIntro") + d.sender + ".\n" +
        word("mailVia") + d.topicText + ".\n\n" +
        word("mailDetail") + "\n" +
        d.body + "\n\n" +
        word("mailClose") + "\n\n" +
        word("mailSign") + "\n" +
        (d.nm || d.sender);
      return { subject: subject, body: body };
    }

    function syncPreview() {
      if (!prevEl) return;
      var d = getDraft();
      prevEl.textContent = "“" + word("greet") + d.sender + ". " + d.body + "”";
    }

    [].forEach.call(pills, function(p) {
      p.addEventListener("click", function() {
        [].forEach.call(pills, function(x) { x.classList.remove("on"); x.setAttribute("aria-pressed", "false"); });
        p.classList.add("on");
        p.setAttribute("aria-pressed", "true");
        syncPreview();
      });
    });

    [].forEach.call(chips, function(ch) {
      ch.addEventListener("click", function() {
        var idx = ch.getAttribute("data-starter");
        var txt = word("starter" + idx + "Text");
        if (msgIn && txt) {
          msgIn.value = txt;
          msgIn.focus();
        }
        if (idx === "2") {
          var colPill = comp.querySelector('.prc-topic[data-topic="collab"]');
          if (colPill) colPill.click();
        } else if (idx === "1") {
          var webPill = comp.querySelector('.prc-topic[data-topic="web"]');
          if (webPill) webPill.click();
        }
        syncPreview();
      });
    });

    if (nameIn) nameIn.addEventListener("input", syncPreview);
    if (msgIn) msgIn.addEventListener("input", syncPreview);
    root.__syncPreview = syncPreview;
    syncPreview();

    if (waBtn) {
      waBtn.addEventListener("click", function() {
        var text = buildWhatsAppMessage();
        var url = "https://wa.me/6281367381826?text=" + encodeURIComponent(text);
        window.open(url, "_blank", "noopener,noreferrer");
      });
    }
    if (mailBtn) {
      mailBtn.addEventListener("click", function() {
        var m = buildEmailMessage();
        window.location.href = "mailto:zikriganteng2023@gmail.com?subject=" + encodeURIComponent(m.subject) + "&body=" + encodeURIComponent(m.body);
      });
    }
  }

  function init(root){
    cur = root; tpx = tpy = px = py = 0; mx = my = -9999;
    tr(root); tick(root);
    initPass3D(root);
    initComposer(root);
    var iv = setInterval(function(){ if (!root.isConnected) { clearInterval(iv); return; } tick(root); }, 1000);
  }
  new MutationObserver(function(){
    var root = pgb.querySelector(".pr-paper");
    if (root && !root.__k) { root.__k = 1; init(root); }
  }).observe(pgb, {childList: true});
  window.addEventListener("zk-lang", function(){ var r = pgb.querySelector(".pr-paper"); if (r) { tr(r); if (r.__syncPreview) r.__syncPreview(); } });
})();
