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
    compName: {id:"Nama Anda", en:"Your Name", zh:"您的姓名", es:"Tu nombre", ar:"اسمك", fr:"Votre nom", ja:"お名前", ko:"이름"},
    compMsg: {id:"Ceritakan singkat proyek atau ide Anda...", en:"Briefly describe your project or idea...", zh:"简述您的项目或想法...", es:"Describe brevemente tu proyecto o idea...", ar:"صف مشروعك أو فكرتك باختصار...", fr:"Décrivez brièvement votre projet ou idée...", ja:"プロジェクトやアイデアを簡単に教えてください...", ko:"프로젝트나 아이디어를 간단히 적어주세요..."},
    compWa: {id:"Kirim ke WhatsApp ↗", en:"Send to WhatsApp ↗", zh:"发送到 WhatsApp ↗", es:"Enviar a WhatsApp ↗", ar:"إرسال عبر واتساب ↗", fr:"Envoyer sur WhatsApp ↗", ja:"WhatsAppで送信 ↗", ko:"WhatsApp으로 보내기 ↗"},
    compMail: {id:"Kirim via Email ↗", en:"Send via Email ↗", zh:"通过邮件发送 ↗", es:"Enviar por Correo ↗", ar:"إرسال عبر البريد ↗", fr:"Envoyer par E-mail ↗", ja:"メールで送信 ↗", ko:"이메일로 보내기 ↗"},
    tWeb: {id:"Proyek Web", en:"Web Project", zh:"网站项目", es:"Proyecto Web", ar:"مشروع ويب", fr:"Projet Web", ja:"Web制作", ko:"웹 프로젝트"},
    tUi: {id:"Desain UI/UX", en:"UI/UX Design", zh:"UI/UX 设计", es:"Diseño UI/UX", ar:"تصميم UI/UX", fr:"Design UI/UX", ja:"UI/UXデザイン", ko:"UI/UX 디자인"},
    tCollab: {id:"Kolaborasi", en:"Collaboration", zh:"创意合作", es:"Colaboración", ar:"تعاون", fr:"Collaboration", ja:"コラボ", ko:"협업"},
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
    greet: {id:"Halo Zikri, saya ", en:"Hi Zikri, I'm ", zh:"你好 Zikri，我是", es:"Hola Zikri, soy ", ar:"مرحبًا زكري، أنا ", fr:"Bonjour Zikri, je suis ", ja:"こんにちはZikriさん、", ko:"안녕하세요 지크리님, 저는 "},
    guest: {id:"pengunjung portofolio Anda", en:"a visitor from your portfolio", zh:"来自您作品集的访客", es:"un visitante de tu portafolio", ar:"زائر لمعرض أعمالك", fr:"un visiteur de votre portfolio", ja:"ポートフォリオを見た者です", ko:"포트폴리오 방문자입니다"},
    topicLbl: {id:"Topik: ", en:"Topic: ", zh:"主题：", es:"Tema: ", ar:"الموضوع: ", fr:"Sujet : ", ja:"トピック：", ko:"주제: "},
    msgLbl: {id:"Pesan: ", en:"Message: ", zh:"留言：", es:"Mensaje: ", ar:"الرسالة: ", fr:"Message : ", ja:"メッセージ：", ko:"메시지: "},
    defaultBody: {id:"Saya tertarik berdiskusi mengenai proyek / kolaborasi.", en:"I'd love to discuss a project or collaboration.", zh:"我希望与您探讨项目或合作事宜。", es:"Me gustaría conversar sobre un proyecto o colaboración.", ar:"أود مناقشة مشروع أو فرصة تعاون معك.", fr:"Je souhaite discuter d’un projet ou d’une collaboration.", ja:"プロジェクトやコラボについて相談したいです。", ko:"프로젝트나 협업에 대해 이야기 나누고 싶습니다."},
    subjFrom: {id:"Dari ", en:"From ", zh:"来自 ", es:"De ", ar:"من ", fr:"De ", ja:"差出人：", ko:"보낸 이: "},
    subjDefault: {id:"Pesan dari Portofolio", en:"Message from Portfolio", zh:"来自作品集的留言", es:"Mensaje desde el Portafolio", ar:"رسالة من معرض الأعمال", fr:"Message depuis le Portfolio", ja:"ポートフォリオからの連絡", ko:"포트폴리오 문의"}
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
    [].forEach.call(pills, function(p) {
      p.addEventListener("click", function() {
        [].forEach.call(pills, function(x) { x.classList.remove("on"); x.setAttribute("aria-pressed", "false"); });
        p.classList.add("on");
        p.setAttribute("aria-pressed", "true");
      });
    });
    var nameIn = comp.querySelector("#prcName");
    var msgIn = comp.querySelector("#prcMsg");
    var waBtn = comp.querySelector("#prcWaBtn");
    var mailBtn = comp.querySelector("#prcMailBtn");
    function buildMessage() {
      var onPill = comp.querySelector(".prc-topic.on");
      var topicText = onPill ? onPill.textContent.trim() : word("tWeb");
      var nm = (nameIn && nameIn.value.trim()) ? nameIn.value.trim() : "";
      var ms = (msgIn && msgIn.value.trim()) ? msgIn.value.trim() : "";
      var greeting = word("greet") + (nm || word("guest")) + ".";
      var topicLine = word("topicLbl") + topicText + ".";
      var bodyLine = ms ? (word("msgLbl") + ms) : word("defaultBody");
      return {
        subject: "[" + topicText + "] " + (nm ? word("subjFrom") + nm : word("subjDefault")),
        full: greeting + "\n" + topicLine + "\n" + bodyLine
      };
    }
    if (waBtn) {
      waBtn.addEventListener("click", function() {
        var m = buildMessage();
        var url = "https://wa.me/6281367381826?text=" + encodeURIComponent(m.full);
        window.open(url, "_blank", "noopener,noreferrer");
      });
    }
    if (mailBtn) {
      mailBtn.addEventListener("click", function() {
        var m = buildMessage();
        window.location.href = "mailto:zikriganteng2023@gmail.com?subject=" + encodeURIComponent(m.subject) + "&body=" + encodeURIComponent(m.full);
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
  window.addEventListener("zk-lang", function(){ var r = pgb.querySelector(".pr-paper"); if (r) tr(r); });
})();
