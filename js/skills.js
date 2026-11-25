/* ============================================================
   skills.js
   ============================================================ */

/**
 * Interactive Skill System & Radial Orbit Engine
 * Data, gear mathematics, dynamic SVG orbit rings, category filters,
 * slow-motion physics, particle shockwaves, and detail modal.
 */
/* ===== Skill: data, cincin, halaman & panel penjelasan =====
   Edit teks di objek D (tool), BARS (bar keahlian) dan STEPS (cara kerja). */
window.SKR = (function(){
  var I = {"laravel": "assets/icons/laravel.webp", "vue": "assets/icons/vue.webp", "bootstrap": "assets/icons/bootstrap.webp", "gsap": "assets/icons/gsap.webp", "animejs": "assets/icons/animejs.webp", "html5": "assets/icons/html5.webp", "css3": "assets/icons/css3.webp", "tailwind": "assets/icons/tailwind.webp", "gemini": "assets/icons/gemini.webp", "deepseek": "assets/icons/deepseek.webp", "chatgpt": "assets/icons/chatgpt.webp", "react": "assets/icons/react.webp", "vscode": "assets/icons/vscode.webp", "github": "assets/icons/github.webp", "claude": "assets/icons/claude.webp"};
  var LV = ['', 'Dasar', 'Berkembang', 'Menengah', 'Mahir', 'Ahli'];
  var D = {
    html5:   { n:'HTML5', g:'fe', cat:'Markup Language', c:'#d9731f', l:4, f:'Dipakai setiap hari',
      d:'Bahasa dasar untuk menyusun isi halaman web. Heading, paragraf, gambar, tombol, dan formulir semuanya dimulai dari HTML yang tertata rapi.',
      w:'Struktur yang benar membuat halaman lebih mudah dibaca mesin pencari, pembaca layar, dan tentu saja oleh saya sendiri saat merawat kode.',
      u:['Menyusun kerangka halaman dengan tag semantik','Membuat formulir, tabel, dan daftar yang rapi','Menambahkan atribut aksesibilitas seperti alt dan aria','Menjaga struktur tetap sederhana dan mudah dirawat'],
      tip:'Pakai tag semantik seperti header, main, dan section. Hasilnya lebih rapi dan lebih ramah aksesibilitas.',
      r:['css3','tailwind','vscode'], t:['Semantik','Struktur','Aksesibilitas'] },
    css3:    { n:'CSS3', g:'fe', cat:'Styling Language', c:'#d9731f', l:4, f:'Dipakai setiap hari',
      d:'Bahasa untuk mengatur tampilan: warna, huruf, jarak, tata letak, sampai animasi. Di sinilah halaman yang polos berubah jadi tampilan yang elegan.',
      w:'Dengan Flexbox, Grid, dan animasi, sebagian besar tampilan bisa dibuat tanpa library tambahan, jadi halaman tetap ringan.',
      u:['Menata layout responsif dengan Flexbox dan Grid','Membuat animasi dan transisi yang halus','Mengatur warna dan tema terang-gelap lewat variabel','Merancang tampilan mobile-first'],
      tip:'Simpan warna dan jarak sebagai variabel CSS. Mengganti tema jadi cukup di satu tempat.',
      r:['html5','tailwind','react'], t:['Flexbox','Grid','Animasi'] },
    tailwind:{ n:'Tailwind CSS', g:'fe', cat:'CSS Framework', c:'#d9731f', l:3, f:'Untuk proyek yang butuh cepat',
      d:'Framework CSS berbasis utility class. Gaya langsung ditulis di markup lewat kelas kecil seperti flex, p-4, atau text-lg, jadi prototipe bisa dibuat dengan cepat.',
      w:'Tidak perlu bolak-balik antara file HTML dan CSS. Desain konsisten karena semua nilai jarak dan warna berasal dari satu sistem.',
      u:['Membuat prototipe tampilan dengan cepat','Menata layout responsif lewat prefix breakpoint','Menjaga jarak dan warna tetap konsisten','Memadukannya dengan komponen React'],
      tip:'Pahami dulu CSS dasarnya. Tailwind terasa jauh lebih mudah kalau konsep layout-nya sudah jelas.',
      r:['css3','react','html5'], t:['Utility-First','Responsif','Prototipe'] },
    vue:     { n:'Vue.js', g:'fe', cat:'Front-End Framework', c:'#d9731f', l:2, f:'Sedang dijelajahi',
      d:'Framework JavaScript progresif untuk membangun antarmuka. Sintaksnya ramah pemula dan cara kerjanya mirip pendekatan komponen, jadi enak dijadikan pembanding dengan React.',
      w:'Kurva belajarnya landai dan templatenya terasa dekat dengan HTML, jadi cocok untuk memahami konsep reaktivitas dari dasar.',
      u:['Mencoba membuat komponen dengan template yang sederhana','Belajar reaktivitas data lewat ref dan computed','Membandingkan cara kerja Vue dengan React','Membuat proyek kecil untuk latihan'],
      tip:'Mulai dari satu komponen kecil dulu, lalu tambahkan data reaktif sedikit demi sedikit.',
      r:['react','html5','vscode'], t:['Komponen','Reaktivitas','Template'] },
    bootstrap:{ n:'Bootstrap', g:'fe', cat:'CSS Framework', c:'#d9731f', l:3, f:'Untuk proyek yang butuh cepat',
      d:'Framework CSS dengan komponen siap pakai seperti navbar, kartu, tombol, dan sistem grid. Pas untuk menyusun halaman responsif dengan cepat.',
      w:'Grid dan komponen bawaannya sudah teruji di banyak layar, jadi pekerjaan dasar tata letak jadi jauh lebih singkat.',
      u:['Menyusun layout dengan sistem grid 12 kolom','Memakai komponen siap pakai untuk prototipe','Membuat halaman responsif dengan cepat','Menyesuaikan tampilan lewat variabel dan kelas tambahan'],
      tip:'Jangan dibiarkan bawaan. Ubah warna dan jarak supaya tampilannya punya karakter sendiri.',
      r:['css3','tailwind','html5'], t:['Grid','Komponen','Responsif'] },
    gsap:    { n:'GSAP', g:'anim', cat:'Animation Library', c:'#1f9d6b', l:2, f:'Untuk animasi yang rumit',
      d:'Library animasi JavaScript yang kuat dan halus. Cocok untuk urutan animasi yang rumit, animasi saat scroll, dan gerakan yang butuh kendali waktu yang presisi.',
      w:'Kendali timeline-nya rapi, jadi banyak gerakan bisa disusun berurutan tanpa kode yang berantakan.',
      u:['Menyusun urutan animasi dengan timeline','Membuat animasi yang bereaksi saat halaman digulir','Mengatur easing supaya gerakan terasa alami','Menghidupkan elemen halaman dengan efek halus'],
      tip:'Mulai dari satu animasi sederhana, lalu rangkai jadi timeline. Jangan langsung membuat yang rumit.',
      r:['animejs','css3','react'], t:['Timeline','ScrollTrigger','Easing'] },
    animejs: { n:'Anime.js', g:'anim', cat:'Animation Library', c:'#1f9d6b', l:2, f:'Untuk animasi ringan',
      d:'Library animasi JavaScript yang ringan dan mudah dipakai. Cocok untuk menganimasikan elemen CSS, SVG, dan objek dengan sintaks yang ringkas.',
      w:'Ukurannya kecil dan penulisannya sederhana, pas untuk animasi cepat tanpa menambah beban halaman.',
      u:['Menganimasikan elemen dengan sintaks yang ringkas','Membuat animasi SVG dan garis yang bergerak','Mengatur urutan dan jeda antaranimasi','Menambah efek kecil agar halaman terasa hidup'],
      tip:'Pilih animasi yang punya tujuan, misalnya memberi petunjuk atau umpan balik, bukan sekadar hiasan.',
      r:['gsap','css3','html5'], t:['Ringan','SVG','Sekuens'] },
    laravel: { n:'Laravel', g:'be', cat:'PHP Framework', c:'#cf3f3f', l:2, f:'Sedang dipelajari',
      d:'Framework PHP untuk membangun aplikasi web dari sisi server. Routing, database, autentikasi, dan templating sudah tersedia dengan struktur yang rapi.',
      w:'Strukturnya jelas dan fiturnya lengkap, jadi saya bisa belajar bagaimana sisi back-end bekerja di balik tampilan yang saya buat.',
      u:['Belajar routing dan controller dasar','Mengelola data lewat migration dan Eloquent','Memakai Blade untuk menyusun tampilan','Memahami alur kerja aplikasi dari server ke browser'],
      tip:'Mulai dari proyek kecil seperti catatan atau daftar tugas. Dari situ alur routing sampai database mudah dipahami.',
      r:['html5','vue','vscode'], t:['Back-End','Routing','Eloquent'] },
    react:   { n:'React', g:'fe', cat:'Front-End Library', c:'#d9731f', l:3, f:'Masih terus dipelajari',
      d:'Library JavaScript untuk membangun antarmuka berbasis komponen. Setiap bagian tampilan dipecah jadi potongan kecil yang bisa dipakai ulang, jadi proyek tetap rapi saat makin besar.',
      w:'Tampilan yang kompleks jadi lebih mudah dirawat. Ubah satu komponen, dan semua tempat yang memakainya ikut berubah.',
      u:['Membuat komponen UI yang bisa dipakai ulang','Mengelola data tampilan dengan state dan hooks','Menyusun halaman interaktif yang terasa halus','Memecah halaman besar jadi bagian-bagian kecil'],
      tip:'Mulai dari komponen terkecil seperti tombol atau kartu, lalu gabungkan jadi halaman utuh.',
      r:['vscode','github','claude'], t:['Komponen','Hooks','State'] },
    vscode:  { n:'VS Code', g:'tool', cat:'Code Editor', c:'#2c4a9e', l:4, f:'Dipakai setiap hari',
      d:'Editor kode yang jadi markas utama saya. Hampir seluruh proses menulis, merapikan, dan menguji kode terjadi di sini, lengkap dengan terminal dan debugger bawaan.',
      w:'Ringan, cepat dibuka, dan extension-nya lengkap. Satu aplikasi cukup untuk menulis, menguji, dan merapikan kode.',
      u:['Menulis HTML, CSS, dan JavaScript setiap hari','Memakai extension untuk format dan autocomplete','Mencari bug lewat debugger dan terminal terpadu','Merapikan kode otomatis setiap kali disimpan'],
      tip:'Pelajari shortcut dasar seperti multi-cursor dan pencarian global. Hematnya terasa sekali.',
      r:['github','react','claude'], t:['Extension','Terminal','Debugger'] },
    github:  { n:'GitHub', g:'tool', cat:'Version Control', c:'#2c4a9e', l:3, f:'Setiap ada perubahan',
      d:'Platform untuk menyimpan kode memakai Git sekaligus tempat proyek dipublikasikan. Setiap perubahan tercatat, jadi mudah dilacak dan dikembalikan kalau ada yang salah.',
      w:'Riwayat perubahan membuat saya berani bereksperimen, karena versi yang lama selalu bisa dikembalikan.',
      u:['Menyimpan riwayat perubahan lewat commit','Mempublikasikan demo dengan GitHub Pages','Memamerkan proyek lewat profil @trynvexa','Menyimpan cadangan semua proyek di cloud'],
      tip:'Tulis pesan commit yang jelas, misalnya menambah galeri atau memperbaiki jarak kartu. Dirimu di masa depan akan berterima kasih.',
      r:['vscode','react','claude'], t:['Git','Pages','Kolaborasi'] },
    claude:  { n:'Claude', g:'ai', cat:'AI Assistant', c:'#0891b2', l:4, f:'Hampir setiap sesi kerja',
      d:'Asisten AI dari Anthropic yang saya jadikan partner berpikir. Cocok untuk membedah kode yang rumit, menjelaskan konsep dengan bahasa sederhana, dan merapikan hasil akhir sebelum dirilis.',
      w:'Penjelasannya runtut dan mudah diikuti. Pas saat saya perlu paham kenapa sebuah kode bekerja, bukan sekadar menyalinnya.',
      u:['Mencari penyebab bug yang membingungkan','Merapikan struktur dan nama di dalam kode','Meninjau ulang hasil kerja sebelum dirilis','Menjelaskan konsep baru dengan bahasa sederhana'],
      tip:'Beri konteks selengkap mungkin: tujuan, potongan kode, dan pesan error. Jawabannya jadi jauh lebih tepat.',
      r:['chatgpt','vscode','github'], t:['Debugging','Refactor','Code Review'] },
    chatgpt: { n:'ChatGPT', g:'ai', cat:'AI Assistant', c:'#0891b2', l:4, f:'Saat butuh ide dan draf',
      d:'Teman brainstorming harian. Saya memakainya untuk melempar ide, menguji sudut pandang, dan mengubah catatan berantakan menjadi draf yang siap dikembangkan.',
      w:'Cepat untuk melempar ide mentah dan melihat beberapa kemungkinan sebelum memutuskan arah.',
      u:['Menggali ide fitur dan alur halaman','Merangkum dokumentasi yang panjang','Menyusun draf awal teks dan kode','Menguji ide dari sudut pandang pengguna'],
      tip:'Minta beberapa alternatif sekaligus, lalu pilih dan gabungkan sendiri bagian yang paling pas.',
      r:['claude','gemini','deepseek'], t:['Brainstorming','Draf Kode','Ringkasan'] },
    gemini:  { n:'Gemini', g:'ai', cat:'AI Assistant', c:'#0891b2', l:3, f:'Saat perlu riset',
      d:'AI dari Google yang terasa kuat untuk riset cepat. Berguna untuk membandingkan beberapa pendekatan sekaligus dan memastikan jawaban dari AI lain tidak melenceng.',
      w:'Membantu membandingkan banyak sumber sekaligus, jadi saya punya gambaran lebih luas sebelum memilih solusi.',
      u:['Riset cepat soal teknologi dan tren','Membandingkan beberapa solusi','Memeriksa ulang jawaban AI lain','Mencari referensi dan contoh penerapan'],
      tip:'Jangan telan mentah-mentah. Cek ulang hal yang penting lewat dokumentasi resmi.',
      r:['chatgpt','claude','deepseek'], t:['Riset','Perbandingan','Cek Ulang'] },
    deepseek:{ n:'DeepSeek', g:'ai', cat:'AI Assistant', c:'#0891b2', l:3, f:'Saat ketemu soal logika',
      d:'AI yang menonjol di penalaran dan logika. Saya memakainya saat bertemu masalah algoritma atau ingin melihat satu persoalan dari cara berpikir yang berbeda.',
      w:'Cara berpikirnya terurai langkah demi langkah, jadi saya bisa mengikuti alurnya dan menemukan celah logika.',
      u:['Memecahkan masalah logika dan algoritma','Menjelaskan langkah berpikir secara runtut','Mencari alternatif solusi yang lebih ringkas','Menguji ulang logika yang terasa janggal'],
      tip:'Minta ia menjelaskan langkah berpikirnya, bukan hanya jawaban akhirnya.',
      r:['claude','gemini','chatgpt'], t:['Logika','Algoritma','Sudut Pandang'] }
  };
  var ORDER = ['html5','css3','tailwind','bootstrap','vue','react','gsap','animejs','laravel','vscode','github','claude','chatgpt','gemini','deepseek'];
  var GR = [['all','Semua'],['fe','Front-End'],['anim','Animasi'],['be','Back-End'],['tool','Tools'],['ai','AI']];
  var BARS = [
    ['HTML & CSS',90,'Menyusun struktur halaman yang rapi, lalu menata layout responsif dengan Flexbox, Grid, dan animasi CSS.',['Flexbox','Grid','Animasi']],
    ['UI Design',80,'Merancang tampilan yang bersih dan elegan dengan hierarki jelas, spasi lega, dan warna yang konsisten.',['Layout','Tipografi','Warna']],
    ['AI Prompting',85,'Menulis instruksi yang jelas dan bertahap supaya AI memberi hasil tepat sasaran, lalu memeriksa hasilnya sendiri.',['Konteks','Iterasi','Verifikasi']],
    ['JavaScript',70,'Menambah interaksi seperti klik, gestur, dan animasi halus dengan memanipulasi tampilan langsung di browser.',['DOM','Event','Animasi']],
    ['Git & GitHub',70,'Menyimpan riwayat kerja, mencoba ide di cabang terpisah, dan mempublikasikan proyek lewat GitHub Pages.',['Commit','Branch','Pages']],
    ['React',60,'Masih tahap berkembang. Fokus saya sekarang di cara membagi komponen dan mengatur alur data.',['Komponen','State','Hooks']],
    ['Tailwind & Bootstrap',65,'Menyusun tampilan responsif dengan cepat lewat utility class dan komponen siap pakai, lalu disesuaikan supaya punya karakter sendiri.',['Utility','Grid','Komponen']],
    ['Animasi Web',50,'Menghidupkan halaman dengan GSAP dan Anime.js: urutan animasi, gerakan saat digulir, dan easing yang halus.',['GSAP','Anime.js','Timeline']],
    ['Vue.js',40,'Masih tahap belajar. Fokus saya di reaktivitas data dan cara menyusun komponen dengan template.',['Komponen','Reaktivitas','Template']],
    ['Laravel',35,'Baru mulai. Saya belajar routing, controller, dan database supaya paham sisi server di balik tampilan.',['Routing','Controller','Database']]
  ];
  var PRIN = [
    ['&#9670;','Bersih','Tampilan lega dan tidak ramai, supaya mata langsung tahu harus melihat ke mana.'],
    ['&#9650;','Ringan','Dimuat cepat dan tidak menumpuk library yang sebenarnya tidak perlu.'],
    ['&#9679;','Mobile-First','Dirancang dari layar kecil lebih dulu, lalu dilebarkan untuk layar yang besar.'],
    ['&#9632;','Nyaman Dipakai','Kontras jelas, tombol cukup besar untuk jari, dan bisa dioperasikan lewat keyboard.']
  ];
  var STEPS = [
    ['Riset','Memahami kebutuhan dan pengguna sebelum menyentuh kode.','Saya mulai dengan bertanya: siapa yang memakai, untuk apa, dan apa yang paling penting bagi mereka. Referensi dikumpulkan dulu supaya arah desain tidak meraba-raba.',['Tujuan','Pengguna','Referensi']],
    ['Desain','Menyusun tampilan yang bersih, elegan, dan mobile-first.','Sketsa kasar dibuat dulu, lalu dirapikan jadi pilihan warna, huruf, dan jarak yang konsisten. Layar ponsel jadi acuan utama.',['Sketsa','Warna','Tipografi']],
    ['Bangun','Menulis front-end yang ringan, dengan AI sebagai partner berpikir.','Kode ditulis bertahap dan diuji di setiap langkah. AI membantu menjelaskan dan meninjau, sementara keputusan akhirnya tetap di tangan saya.',['HTML & CSS','JavaScript','Review AI']],
    ['Rilis','Publikasi lewat GitHub Pages, lalu dirapikan dari masukan.','Setelah tayang, saya mengecek di beberapa ukuran layar dan perangkat, lalu memperbaiki hal kecil yang baru terlihat saat dipakai.',['GitHub Pages','Uji Layar','Revisi']]
  ];
  var LEARN = [
    ['React lanjutan','Pola komponen yang lebih rapi dan pengelolaan state di proyek yang lebih besar.'],
    ['JavaScript modern','Animasi yang halus, penanganan gestur, dan cara menjaga performa.'],
    ['Alur kerja Git','Memakai branch dan commit yang tertata supaya riwayat proyek mudah dibaca.'],
    ['Aksesibilitas web','Memastikan tampilan nyaman dipakai semua orang, termasuk lewat keyboard.'],
    ['Animasi dengan GSAP','Menyusun timeline dan animasi saat halaman digulir tanpa mengorbankan performa.'],
    ['Dasar Laravel dan Vue','Memahami alur data dari server ke tampilan, dari routing sampai komponen.']
  ];
  var FAQ = [
    ['Kenapa memakai banyak asisten AI?','Setiap AI punya kelebihan masing-masing. Saya membandingkan jawabannya, lalu memutuskan sendiri mana yang paling masuk akal untuk kasus saya.'],
    ['Apakah semua kode dibuat oleh AI?','AI membantu menjelaskan, memberi alternatif, dan meninjau. Struktur, keputusan desain, dan pengujian hasil akhirnya tetap saya yang pegang.'],
    ['Apa stack favorit untuk proyek kecil?','HTML, CSS, dan JavaScript yang dipublikasikan lewat GitHub Pages. Ringan, murah, dan mudah dirawat tanpa server database.'],
    ['Bisa diajak kolaborasi?','Bisa. Saya terbuka untuk freelance, proyek bersama, dan diskusi seputar pengembangan web dan desain antarmuka.']
  ];
  function slot(k, a, pd, ph) {
    return '<div class="sk-slot" style="--a:' + a + 'deg;--pd:' + pd.toFixed(2) + 's;--ph:' + ph.toFixed(2) + 's"><i class="sk-beam"></i><div class="sk-icw"><div class="sk-cnt">' +
      '<button type="button" class="sk-ic" data-k="' + k + '" data-g="' + D[k].g + '" aria-pressed="false" aria-label="' + D[k].n + ': lihat penjelasan">' +
      '<img alt="" draggable="false" decoding="async" src="' + I[k] + '"><span class="sk-tip">' + D[k].n + '</span></button>' +
      '</div></div></div>';
  }
  function cn(angs, step, cls) {
    var p = angs.map(function(a){ var r = a * Math.PI / 180; return [50 + 50 * Math.sin(r), 50 - 50 * Math.cos(r)]; }), d = '';
    angs.forEach(function(_, i){ var j = (i + step) % angs.length; d += 'M' + p[i][0].toFixed(2) + ' ' + p[i][1].toFixed(2) + 'L' + p[j][0].toFixed(2) + ' ' + p[j][1].toFixed(2); });
    return '<svg class="sk-cn ' + cls + '" viewBox="0 0 100 100" aria-hidden="true"><path d="' + d + '"/></svg>';
  }
  function ringOf(cls, keys, a0, gap, t0, dt, svgStep, svgCls, extra) {
    var angs = keys.map(function(_, i){ return a0 + i * gap; });
    return '<div class="sk-ring ' + cls + '">' + cn(angs, svgStep, svgCls) + (extra || '') +
      keys.map(function(k, i){ return slot(k, angs[i], t0 + i * dt, -i * .9); }).join('') + '</div>';
  }
  var ring =
    '<div class="sk-ghost" aria-hidden="true">SKILL</div>' +
    '<span class="sk-vt" aria-hidden="true">Front-End &middot; UI Design &middot; AI Workflow</span>' +
    '<span class="sk-st2" aria-hidden="true" style="left:86%;top:3%;font-size:18px">&#10022;</span>' +
    '<span class="sk-st2 b" aria-hidden="true" style="left:96%;top:22%;font-size:11px;animation-delay:-1.2s">&#10022;</span>' +
    '<span class="sk-st2" aria-hidden="true" style="left:56%;top:1%;font-size:12px;animation-delay:-2.1s">&#10022;</span>' +
    '<span class="sk-st2" aria-hidden="true" style="left:2%;top:50%;font-size:13px;animation-delay:-.6s">&#10022;</span>' +
    '<div class="sk-orbit" id="skOrbit">' +
      '<i class="sk-glow"></i><i class="sk-sat"></i><i class="sk-ticks"></i><i class="sk-ticks big"></i><i class="sk-rip"></i><i class="sk-rip b"></i><i class="sk-sweep"></i>' +
      '<i class="sk-pt p1"></i><i class="sk-pt p2"></i><i class="sk-pt p3"></i><i class="sk-pt p4"></i>' +
      ringOf('sk-out', ['html5','css3','tailwind','bootstrap','vue','react','gsap','animejs'], 0, 45, .45, .055, 3, '', '<div class="sk-slot" style="--a:22.5deg"><i class="sk-dot"></i></div>') +
      ringOf('sk-inn', ['claude','chatgpt','gemini','deepseek'], 22.5, 90, .85, .07, 1, 'r') +
      ringOf('sk-core', ['laravel','vscode','github'], 0, 120, 1.15, .08, 1, '') +
      '<i class="sk-hub"></i><i class="sk-hubring"></i>' +
    '</div>' +
    '<ul class="sk-tags" aria-hidden="true"><li><b>01</b><span><strong>Front-End</strong><em>Antarmuka rapi &amp; responsif</em></span></li><li><b>02</b><span><strong>UI Design</strong><em>Bersih, lega, konsisten</em></span></li><li><b>03</b><span><strong>AI Workflow</strong><em>AI jadi partner berpikir</em></span></li><li><b>04</b><span><strong>Web Ringan</strong><em>Cepat dimuat di HP</em></span></li></ul>';

  var mq = ORDER.map(function(k){ return '<span><img alt="" src="' + I[k] + '">' + D[k].n + '</span>'; }).join('');
  var mq2 = ORDER.slice().reverse().map(function(k){ return '<span><img alt="" src="' + I[k] + '">' + D[k].n + '</span>'; }).join('');
  function chips(a) { return '<ul class="sk-chips">' + a.map(function(t){ return '<li>' + t + '</li>'; }).join('') + '</ul>'; }
  var cards = ORDER.map(function(k, i){
    var d = D[k], dots = '';
    for (var n = 1; n <= 5; n++) dots += '<i' + (n <= d.l ? ' class="on"' : '') + '></i>';
    return '<button type="button" class="sk-card sk-rv' + (d.cat === 'AI Assistant' ? ' ai' : '') + '" data-k="' + k + '" data-g="' + d.g + '" style="--d:' + (i * .06) + 's;--c:' + d.c + '" aria-label="' + d.n + ': buka penjelasan">' +
      '<img alt="" draggable="false" src="' + I[k] + '"><b>' + d.n + '</b><em>' + d.cat + '</em><span class="sk-dots">' + dots + '</span></button>';
  }).join('');
  var BAR_CATS = ['fe','fe','ai','fe','tool','fe','fe','anim','fe','be'];
  var BAR_CAT_NAME = { fe:'Front-End', ai:'AI Workflow', tool:'Tools', anim:'Animasi', be:'Back-End' };
  function barTier(v) { return v >= 80 ? 'Mahir' : v >= 60 ? 'Menengah' : v >= 45 ? 'Berkembang' : 'Dasar'; }
  var bars = BARS.map(function(b, i){
    var g = BAR_CATS[i] || 'fe';
    var num = (i + 1 < 10 ? '0' : '') + (i + 1);
    return '<li class="sk-bar sk-rv" data-bg="' + g + '" style="--d:' + (i * .055) + 's">' +
      '<div class="t">' +
        '<div class="sk-bar-id">' +
          '<span class="sk-bar-kicker"><i class="sk-bar-dot" aria-hidden="true"></i><span>' + num + '</span><span>&middot;</span><span>' + BAR_CAT_NAME[g] + '</span></span>' +
          '<span class="sk-bar-name">' + b[0] + '</span>' +
        '</div>' +
        '<div class="sk-bar-score">' +
          '<span class="sk-bar-pct" data-v="' + b[1] + '">0%</span>' +
          '<span class="sk-bar-tier">' + barTier(b[1]) + '</span>' +
        '</div>' +
      '</div>' +
      '<div class="sk-trk" aria-hidden="true"><i class="sk-fil" style="--p:' + b[1] + '%"></i></div>' +
      '<p>' + b[2] + '</p>' + chips(b[3]) + '</li>';
  }).join('');
  var prin = PRIN.map(function(p, i){
    return '<div class="sk-pc sk-rv" style="--d:' + (i * .08) + 's"><i aria-hidden="true">' + p[0] + '</i><h4>' + p[1] + '</h4><p>' + p[2] + '</p></div>';
  }).join('');
  var steps = STEPS.map(function(s, i){
    return '<li class="sk-st sk-rv" style="--d:' + (i * .1) + 's"><i>0' + (i + 1) + '</i><div><h4>' + s[0] + '</h4><p>' + s[1] + '</p><p class="sk-sub">' + s[2] + '</p>' + chips(s[3]) + '</div></li>';
  }).join('');
  var learn = LEARN.map(function(l, i){
    return '<li class="sk-rv" style="--d:' + (i * .08) + 's"><div><b>' + l[0] + '</b>' + l[1] + '</div></li>';
  }).join('');
  var faq = FAQ.map(function(q, i){
    return '<details class="sk-rv" style="--d:' + (i * .07) + 's"><summary>' + q[0] + '</summary><p>' + q[1] + '</p></details>';
  }).join('');

  var ui =
    '<div class="sk-sp"></div>' +
    '<aside class="sk-panel" role="region" aria-live="polite" aria-label="Penjelasan skill">' +
      '<span class="sk-grab" aria-hidden="true"></span>' +
      '<span class="sk-gn" aria-hidden="true"></span>' +
      '<div class="sk-top"><span class="sk-ct"></span><button type="button" class="sk-x" aria-label="Tutup penjelasan"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg></button></div>' +
      '<div class="sk-in2">' +
        '<div class="sk-hd"><span class="sk-pi"><img alt="" draggable="false"></span><em class="sk-cat"></em></div>' +
        '<b class="sk-pn"></b>' +
        '<div class="sk-lv"><span class="sk-lvt"></span><span class="sk-dots"><i></i><i></i><i></i><i></i><i></i></span></div>' +
        '<span class="sk-fr"></span>' +
        '<p class="sk-pd"></p>' +
        '<div class="sk-row"><b class="sk-sh">Kenapa saya betah</b><p class="sk-why"></p></div>' +
        '<div class="sk-row"><b class="sk-sh">Yang saya kerjakan dengannya</b><ol class="sk-use"></ol></div>' +
        '<div class="sk-row"><b class="sk-sh">Tips</b><p class="sk-tp"></p></div>' +
        '<div class="sk-row"><b class="sk-sh">Teman setianya</b><div class="sk-rel"></div></div>' +
        '<ul class="sk-chips"></ul>' +
      '</div>' +
      '<div class="sk-nav"><button type="button" class="sk-pv" aria-label="Skill sebelumnya">&#8592; Sebelumnya</button><button type="button" class="sk-nx" aria-label="Skill berikutnya">Berikutnya &#8594;</button></div>' +
    '</aside>' +
    '<p class="sk-hint"><i></i>Tekan &amp; lepas ikon &middot; geser ke bawah</p>' +
    '<div class="sk-cats" role="group" aria-label="Filter kategori">' + GR.map(function(g){ return '<button type="button" class="sk-tab' + (g[0] === 'all' ? ' on' : '') + '" data-fg="' + g[0] + '" aria-pressed="' + (g[0] === 'all' ? 'true' : 'false') + '">' + g[1] + '</button>'; }).join('') + '</div>' +
    '<section class="sk-sec sk-intro"><div class="sk-eyebrow sk-rv">Skill &amp; Keahlian</div>' +
      '<h2 class="sk-h sk-rv" style="--d:.08s">Dari kode kosong<br>sampai layar yang hidup</h2>' +
      '<p class="sk-p sk-rv" style="--d:.16s">Tool dan AI yang saya pakai tiap hari untuk mengubah ide jadi halaman yang rapi dan enak dipakai.</p>' +
      '<p class="sk-p sk-rv" style="--d:.2s">Cincin di tangan itu kotak alat saya. Tekan satu ikon, lepas, lalu baca cerita saya dengannya.</p>' +
      '<div class="sk-stats sk-rv" style="--d:.24s"><div class="sk-stat"><b data-n="15">0</b><span>Tools</span></div><div class="sk-stat"><b data-n="4">0</b><span>AI Assistant</span></div><div class="sk-stat"><b data-n="8">0</b><span>Web Stack</span></div></div>' +
    '</section>' +
    '<div class="sk-marq" aria-hidden="true"><div class="sk-mt">' + mq + mq + '</div></div>' +
    '<section class="sk-sec"><div class="sk-eyebrow sk-rv">Semua tool</div>' +
      '<h3 class="sk-h2 sk-rv" style="--d:.06s">Keahlian &amp; Tools,<br>yang sering saya gunakan</h3>' +
      '<p class="sk-p2 sk-rv" style="--d:.12s">Ketuk kartu mana pun. Saya tulis apa adanya, termasuk yang masih bikin bingung.</p>' +
      '<div class="sk-tabs sk-rv" style="--d:.16s" role="group" aria-label="Filter kategori">' + GR.map(function(g){ return '<button type="button" class="sk-tab' + (g[0] === 'all' ? ' on' : '') + '" data-fg="' + g[0] + '" aria-pressed="' + (g[0] === 'all' ? 'true' : 'false') + '">' + g[1] + '</button>'; }).join('') + '</div>' +
      '<div class="sk-grid">' + cards + '</div></section>' +
    '<div class="sk-marq alt" aria-hidden="true"><div class="sk-mt">' + mq2 + mq2 + '</div></div>' +
    '<section class="sk-sec"><div class="sk-eyebrow sk-rv">Keahlian utama</div>' +
      '<h3 class="sk-h2 sk-rv" style="--d:.06s">Tingkat Kemahiran,<br>dan fokus keahlian</h3>' +
      '<p class="sk-p2 sk-rv" style="--d:.12s">Ini angka hari ini, bukan target. Akan naik seiring proyek.</p>' +
      '<ul class="sk-bars">' + bars + '</ul></section>' +
    '<section class="sk-sec"><div class="sk-eyebrow sk-rv">Prinsip kerja</div>' +
      '<h3 class="sk-h2 sk-rv" style="--d:.06s">Aturan main<br>yang tidak saya langgar</h3>' +
      '<div class="sk-pr">' + prin + '</div></section>' +
    '<section class="sk-sec"><div class="sk-eyebrow sk-rv">Cara kerja</div>' +
      '<h3 class="sk-h2 sk-rv" style="--d:.06s">Dari coretan<br>sampai tayang</h3>' +
      '<ol class="sk-steps">' + steps + '</ol></section>' +
    '<section class="sk-sec"><div class="sk-eyebrow sk-rv">Sedang dipelajari</div>' +
      '<h3 class="sk-h2 sk-rv" style="--d:.06s">Yang masih<br>bikin penasaran</h3>' +
      '<ul class="sk-learn">' + learn + '</ul></section>' +
    '<section class="sk-sec"><div class="sk-eyebrow sk-rv">Tanya jawab</div>' +
      '<h3 class="sk-h2 sk-rv" style="--d:.06s">Pertanyaan<br>yang sering mampir</h3>' +
      '<div class="sk-faq">' + faq + '</div></section>' +
    '<section class="sk-sec sk-end"><p class="sk-p sk-rv">Cukup bicaranya. Lihat hasil nyatanya.</p><button type="button" class="sk-cta sk-rv" data-go="1" style="--d:.1s">Lihat proyek &#9656;</button></section>';
  return { data: D, order: ORDER, lv: LV, ring: ring, ui: ui };
})();

(function(){
  var pg = document.getElementById('pg'), pgb = document.getElementById('pgb');
  if (!pg || !pgb) return;
  var S = window.SKR, D = S.data;
  function orbit() { return pgb.querySelector('.sk-orbit'); }
  function panel() { return pgb.querySelector('.sk-panel'); }
  function isOpen() { var p = panel(); return !!(p && p.classList.contains('show')); }
  function release() {
    var o = orbit(); if (!o) return;
    o.classList.remove('hold');
    [].forEach.call(o.querySelectorAll('.sk-ic.down'), function(b){ b.classList.remove('down'); });
    fxe('up');
  }
  function fxe(type, ic, d) { try { pg.dispatchEvent(new CustomEvent('skfx', { detail: { type: type, ic: ic, d: d } })); } catch (_) {} }
  function closeP() {
    var p = panel(), o = orbit(); if (!p) return;
    [].forEach.call(pgb.querySelectorAll('.sk-slot.is-sel'), function(x){ x.classList.remove('is-sel'); });
    if (p.classList.contains('show')) fxe('close');
    p.classList.remove('show'); pg.classList.remove('sk-sel');
    if (o) {
      o.classList.remove('has-sel');
      [].forEach.call(o.querySelectorAll('.sk-ic.sel'), function(b){ b.classList.remove('sel'); b.setAttribute('aria-pressed', 'false'); });
    }
  }
  function openP(b) {
    var p = panel(), o = orbit(), k = b.getAttribute('data-k'), d = D[k];
    if (!p || !o || !d) return;
    [].forEach.call(o.querySelectorAll('.sk-ic.sel'), function(x){ x.classList.remove('sel'); x.setAttribute('aria-pressed', 'false'); });
    [].forEach.call(o.querySelectorAll('.sk-slot.is-sel'), function(x){ x.classList.remove('is-sel'); });
    b.classList.add('sel'); b.setAttribute('aria-pressed', 'true');
    var sl = b.closest('.sk-slot'); if (sl) sl.classList.add('is-sel');
    o.classList.add('has-sel');
    fxe('open', b, d);
    p.setAttribute('data-k', k);
    p.style.setProperty('--c', d.c);
    p.querySelector('.sk-pi img').src = b.querySelector('img').src;
    p.querySelector('.sk-cat').textContent = d.cat;
    p.querySelector('.sk-pn').textContent = d.n;
    p.querySelector('.sk-lvt').innerHTML = '<span>Tingkat</span><span>: </span><span>' + S.lv[d.l] + '</span>';
    [].forEach.call(p.querySelectorAll('.sk-dots i'), function(i, n){ i.classList.toggle('on', n < d.l); });
    p.querySelector('.sk-pd').textContent = d.d;
    p.querySelector('.sk-fr').textContent = d.f;
    p.querySelector('.sk-why').textContent = d.w;
    p.querySelector('.sk-tp').textContent = d.tip;
    p.querySelector('.sk-rel').innerHTML = d.r.map(function(r){ return '<button type="button" class="sk-rl" data-k="' + r + '">' + D[r].n + '</button>'; }).join('');
    p.querySelector('.sk-use').innerHTML = d.u.map(function(t){ return '<li>' + t + '</li>'; }).join('');
    p.querySelector('.sk-chips').innerHTML = d.t.map(function(t){ return '<li>' + t + '</li>'; }).join('');
    if (window.ZK && ZK.walk) ZK.walk(p);
    var n = S.order.indexOf(k) + 1;
    p.querySelector('.sk-ct').textContent = (n < 10 ? '0' : '') + n + ' / ' + (S.order.length < 10 ? '0' : '') + S.order.length;
    p.querySelector('.sk-gn').textContent = (n < 10 ? '0' : '') + n;
    var inner = p.querySelector('.sk-in2');
    inner.scrollTop = 0;
    inner.classList.remove('swap'); void inner.offsetWidth; inner.classList.add('swap');
    p.classList.add('show'); pg.classList.add('sk-sel');
    try { if (navigator.vibrate) navigator.vibrate(8); } catch (_) {}
  }
  function step(dir) {
    var p = panel(); if (!p) return;
    var list = S.visible ? S.visible() : S.order, k0 = p.getAttribute('data-k'), i = list.indexOf(k0);
    if (i < 0) { list = S.order; i = list.indexOf(k0); }
    var L = list.length;
    var b = pgb.querySelector('.sk-ic[data-k="' + list[(i + dir + L) % L] + '"]');
    if (b) openP(b);
  }

  var press = null, tapped = 0;
  pgb.addEventListener('pointerdown', function(e){
    var b = e.target.closest && e.target.closest('.sk-ic');
    if (b) { var o = orbit(); b.classList.add('down'); if (o) o.classList.add('hold'); fxe('down', b); press = { k: b.getAttribute('data-k'), x: e.clientX, y: e.clientY }; return; }
    if (isOpen() && !e.target.closest('.sk-panel, .sk-card')) closeP();
  });
  window.addEventListener('pointerup', function(e){
    var p = press; press = null; release();
    if (!p) return;
    var ic = pgb.querySelector('.sk-ic[data-k="' + p.k + '"]');
    if (ic && Math.hypot(e.clientX - p.x, e.clientY - p.y) < 18) { tapped = performance.now(); openP(ic); }
  });
  window.addEventListener('pointercancel', function(){ press = null; release(); });
  pgb.addEventListener('click', function(e){
    var t = e.target; if (!t.closest) return;
    var go = t.closest('.sk-rl, .sk-card');
    if (go) { var ic = pgb.querySelector('.sk-ic[data-k="' + go.getAttribute('data-k') + '"]'); if (ic) openP(ic); return; }
    var b = t.closest('.sk-ic');
    if (b) { release(); if (performance.now() - tapped > 500) openP(b); return; }
    if (t.closest('.sk-x')) closeP();
    else if (t.closest('.sk-pv')) step(-1);
    else if (t.closest('.sk-nx')) step(1);
  });
  pgb.addEventListener('contextmenu', function(e){ if (e.target.closest && e.target.closest('.sk-orbit')) e.preventDefault(); });
  window.addEventListener('keydown', function(e){
    if (!isOpen()) return;
    if (e.key === 'Escape') { closeP(); e.stopImmediatePropagation(); e.preventDefault(); }
    else if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') { step(e.key === 'ArrowRight' ? 1 : -1); e.preventDefault(); }
  }, true);

  var sx = null, sy = 0;
  pgb.addEventListener('touchstart', function(e){
    if (!(e.target.closest && e.target.closest('.sk-panel'))) { sx = null; return; }
    sx = e.touches[0].clientX; sy = e.touches[0].clientY;
  }, { passive: true });
  pgb.addEventListener('touchend', function(e){
    if (sx == null || !isOpen()) return;
    var t = e.changedTouches[0], dx = t.clientX - sx, dy = t.clientY - sy; sx = null;
    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) step(dx < 0 ? 1 : -1);
    else if (dy > 80 && dy > Math.abs(dx) * 1.5 && window.matchMedia('(max-width:819px)').matches && panel().querySelector('.sk-in2').scrollTop <= 0) closeP();
  }, { passive: true });

  /* geser ke bawah: sembunyikan petunjuk, munculkan bagian satu per satu */
  function syncScrollState() { pg.classList.toggle('sk-scrolled', pg.scrollTop > 36); }
  pg.addEventListener('scroll', syncScrollState, { passive: true });
  function count(el) {
    var t = +el.getAttribute('data-n'), s = performance.now();
    (function f(n){ var k = Math.min(1, (n - s) / 1100); el.textContent = Math.round(t * (1 - Math.pow(1 - k, 3))); if (k < 1) requestAnimationFrame(f); })(s);
  }
  function reveal(sec) { sec.classList.add('in'); [].forEach.call(sec.querySelectorAll('[data-n]'), count); }
  var io = 'IntersectionObserver' in window ? new IntersectionObserver(function(es){
    es.forEach(function(e){ if (e.isIntersecting) { reveal(e.target); io.unobserve(e.target); } });
  }, { root: pg, threshold: 0, rootMargin: '0px 0px -4% 0px' }) : null;
  function scan() { syncScrollState(); [].forEach.call(pgb.querySelectorAll('.sk-sec:not(.in)'), function(s){ if (io) io.observe(s); else reveal(s); }); }
  new MutationObserver(scan).observe(pgb, { childList: true });
})();

/* ===== Skill FX: slow-motion, letupan, sinematik, filter, putar manual ===== */
(function(){
  var pg = document.getElementById('pg'), pgb = document.getElementById('pgb');
  if (!pg || !pgb || !window.SKR) return;
  var S = window.SKR, D = S.data;
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  function orbit() { return pgb.querySelector('.sk-orbit'); }
  function rnd(a, b) { return a + Math.random() * (b - a); }

  /* --- kendali kecepatan putar (slow-motion halus) --- */
  var ts = { cur: 1, boost: 0, running: false, last: 0 };
  var st = { holding: false, selected: false, hover: false };
  function base() { return st.holding ? .12 : st.selected ? .07 : st.hover ? .45 : 1; }
  function apply(r) {
    var o = orbit(); if (!o || !o.getAnimations) return;
    o.getAnimations({ subtree: true }).forEach(function(a){
      var n = a.animationName;
      if (n === 'skCw' || n === 'skCcw') { try { a.playbackRate = r; } catch (_) {} }
    });
  }
  function tick(t) {
    var dt = Math.min(.05, (t - ts.last) / 1000 || .016); ts.last = t;
    ts.boost *= Math.exp(-dt * 2.6);
    if (Math.abs(ts.boost) < .02) ts.boost = 0;
    var tgt = Math.max(.03, base() + ts.boost);
    ts.cur += (tgt - ts.cur) * Math.min(1, dt * 7);
    apply(ts.cur);
    if (Math.abs(ts.cur - tgt) < .004 && ts.boost === 0) { ts.cur = tgt; apply(tgt); ts.running = false; return; }
    requestAnimationFrame(tick);
  }
  function go() { if (reduce) return; if (!ts.running) { ts.running = true; ts.last = performance.now(); requestAnimationFrame(tick); } }
  function kick(v) { ts.boost = Math.max(-14, Math.min(14, ts.boost + v)); go(); }

  /* --- letupan partikel dan gelombang kejut --- */
  function fxBox(ic) {
    var cnt = ic.parentNode, box = document.createElement('div');
    box.className = 'sk-fxc'; cnt.appendChild(box);
    setTimeout(function(){ if (box.parentNode) box.parentNode.removeChild(box); }, 1700);
    return box;
  }
  function mk(box, cls) { var e = document.createElement('i'); e.className = cls; box.appendChild(e); return e; }
  function charge(ic) {
    if (reduce || !ic.animate) return;
    var box = fxBox(ic);
    for (var i = 0; i < 3; i++) {
      mk(box, 'sw' + (i === 1 ? ' k' : '')).animate(
        [{ transform: 'scale(3.4)', opacity: 0 }, { transform: 'scale(1.1)', opacity: .85, offset: .75 }, { transform: 'scale(.95)', opacity: 0 }],
        { duration: 560, delay: i * 130, easing: 'cubic-bezier(.3,.7,.2,1)', fill: 'backwards' });
    }
  }
  function burst(ic) {
    if (reduce || !ic.animate) return;
    var box = fxBox(ic), i, a, dist, e;
    for (i = 0; i < 3; i++) {
      mk(box, 'sw' + (i === 1 ? ' k' : '')).animate(
        [{ transform: 'scale(.7)', opacity: .9 }, { transform: 'scale(' + (3.2 + i * .9) + ')', opacity: 0 }],
        { duration: 760 + i * 120, delay: i * 90, easing: 'cubic-bezier(.12,.8,.2,1)', fill: 'both' });
    }
    for (i = 0; i < 14; i++) {
      a = (i / 14) * Math.PI * 2 + rnd(-.2, .2); dist = rnd(48, 105);
      e = mk(box, 'dt' + (i % 3 === 0 ? ' k' : '') + (i % 4 === 0 ? ' d' : ''));
      e.animate([{ transform: 'translate(0,0) scale(1)', opacity: 1 },
                 { transform: 'translate(' + (Math.cos(a) * dist) + 'px,' + (Math.sin(a) * dist) + 'px) scale(.15)', opacity: 0 }],
        { duration: rnd(650, 1100), easing: 'cubic-bezier(.1,.7,.2,1)', fill: 'forwards' });
    }
    for (i = 0; i < 8; i++) {
      a = (i / 8) * Math.PI * 2 + .2; dist = rnd(60, 120);
      e = mk(box, 'st');
      e.style.transformOrigin = '0 50%';
      e.animate([{ transform: 'rotate(' + a + 'rad) translateX(14px) scaleX(.3)', opacity: 1 },
                 { transform: 'rotate(' + a + 'rad) translateX(' + dist + 'px) scaleX(1.4)', opacity: 0 }],
        { duration: rnd(520, 800), easing: 'cubic-bezier(.1,.8,.2,1)', fill: 'forwards' });
    }
  }
  function punch(o) {
    if (reduce || !o || !o.animate) return;
    o.animate([{ scale: 1, rotate: '0deg' }, { scale: .94, rotate: '-2.5deg', offset: .16 }, { scale: 1.05, rotate: '1.2deg', offset: .5 }, { scale: 1, rotate: '0deg' }],
      { duration: 780, easing: 'cubic-bezier(.22,1,.36,1)' });
    var g = o.querySelector('.sk-glow');
    if (g && g.animate) g.animate([{ opacity: 1, scale: 1.45 }, { opacity: .4, scale: 1 }], { duration: 900, easing: 'ease-out' });
  }

  /* --- lapisan sinematik --- */
  function cineEl() {
    var c = pgb.querySelector('.sk-cine');
    if (!c) {
      c = document.createElement('div'); c.className = 'sk-cine'; c.setAttribute('aria-hidden', 'true');
      c.innerHTML = '<i class="fl"></i><i class="bar t"></i><i class="bar b"></i><span class="ttl"></span>';
      pgb.appendChild(c);
    }
    return c;
  }
  function cine(ic, d) {
    if (reduce) return;
    var c = cineEl(), r = ic.getBoundingClientRect();
    c.style.setProperty('--c', d.c);
    c.style.setProperty('--fx', (r.left + r.width / 2) + 'px');
    c.style.setProperty('--fy', (r.top + r.height / 2) + 'px');
    var fl = c.querySelector('.fl'), bt = c.querySelector('.bar.t'), bb = c.querySelector('.bar.b'), tt = c.querySelector('.ttl');
    fl.getAnimations().forEach(function(a){ a.cancel(); });
    bt.getAnimations().forEach(function(a){ a.cancel(); });
    bb.getAnimations().forEach(function(a){ a.cancel(); });
    tt.getAnimations().forEach(function(a){ a.cancel(); });
    fl.animate([{ opacity: 0 }, { opacity: .9, offset: .14 }, { opacity: 0 }], { duration: 700, easing: 'ease-out' });
    var ease = 'cubic-bezier(.22,1,.36,1)';
    bt.animate([{ transform: 'translateY(-100%)' }, { transform: 'translateY(0)', offset: .2 }, { transform: 'translateY(0)', offset: .66 }, { transform: 'translateY(-100%)' }], { duration: 1200, easing: ease });
    bb.animate([{ transform: 'translateY(100%)' }, { transform: 'translateY(0)', offset: .2 }, { transform: 'translateY(0)', offset: .66 }, { transform: 'translateY(100%)' }], { duration: 1200, easing: ease });
    tt.textContent = d.n;
    var w = window.innerWidth;
    tt.style.fontSize = Math.max(34, Math.min(w * .2, (w * .94) / (d.n.length * .72))) + 'px';
    tt.animate([
      { opacity: 0, transform: 'translateX(-7%) scale(1.1)', filter: 'blur(12px)' },
      { opacity: .92, transform: 'translateX(0) scale(1)', filter: 'blur(0)', offset: .24 },
      { opacity: .92, transform: 'translateX(1.5%) scale(1.01)', filter: 'blur(0)', offset: .68 },
      { opacity: 0, transform: 'translateX(8%) scale(.97)', filter: 'blur(8px)' }
    ], { duration: 1350, easing: ease });
  }

  /* --- event dari panel skill --- */
  pg.addEventListener('skfx', function(e){
    var t = e.detail.type, o = orbit();
    if (t === 'down') { st.holding = true; go(); charge(e.detail.ic); }
    else if (t === 'up') { st.holding = false; go(); }
    else if (t === 'open') {
      st.selected = true; kick(7); go();
      burst(e.detail.ic); punch(o); cine(e.detail.ic, e.detail.d);
    }
    else if (t === 'close') { st.selected = false; kick(3); go(); }
  });

  /* --- hover, putar manual, kemiringan 3D --- */
  var lastP = null;
  pgb.addEventListener('pointerover', function(e){
    if (e.pointerType === 'mouse' && e.target.closest && e.target.closest('.sk-orbit')) { st.hover = true; go(); }
  });
  pgb.addEventListener('pointerout', function(e){
    if (e.pointerType !== 'mouse') return;
    var to = e.relatedTarget;
    if (!(to && to.closest && to.closest('.sk-orbit'))) { st.hover = false; go(); }
  });
  pgb.addEventListener('pointermove', function(e){
    if (e.pointerType !== 'mouse' || pg.classList.contains('sk-scrolled')) return;
    var o = orbit(); if (!o) return;
    var r = o.getBoundingClientRect(), cx = r.left + r.width / 2, cy = r.top + r.height / 2;
    var inside = Math.hypot(e.clientX - cx, e.clientY - cy) < r.width * .62;
    if (!reduce) {
      var nx = Math.max(-1, Math.min(1, (e.clientX - cx) / (innerWidth * .6))), ny = Math.max(-1, Math.min(1, (e.clientY - cy) / (innerHeight * .6)));
      o.style.transform = 'perspective(900px) rotateX(' + (-ny * 9).toFixed(2) + 'deg) rotateY(' + (nx * 9).toFixed(2) + 'deg)';
    }
    if (lastP && inside) {
      var rx = lastP.x - cx, ry = lastP.y - cy, dx = e.clientX - lastP.x, dy = e.clientY - lastP.y, q = rx * rx + ry * ry;
      if (q > 400) { var w = Math.abs((rx * dy - ry * dx) / q); if (w > .004) kick(Math.min(2.2, w * 9)); }
    }
    lastP = { x: e.clientX, y: e.clientY };
  }, { passive: true });
  pgb.addEventListener('pointerleave', function(){ var o = orbit(); if (o) o.style.transform = ''; lastP = null; });

  /* --- kilau acak pada ikon --- */
  setInterval(function(){
    var o = orbit(); if (!o || pg.hidden || st.selected || st.holding || document.hidden) return;
    var l = o.querySelectorAll('.sk-ic:not(.dim):not(.sel)'); if (!l.length) return;
    var ic = l[Math.floor(Math.random() * l.length)];
    ic.classList.add('glint'); setTimeout(function(){ ic.classList.remove('glint'); }, 800);
  }, 1500);

  /* --- filter kategori --- */
  var curG = 'all';
  S.visible = function(){ return curG === 'all' ? S.order : S.order.filter(function(k){ return D[k].g === curG; }); };
  function setFilter(g) {
    curG = g;
    [].forEach.call(pgb.querySelectorAll('.sk-tab'), function(b){
      var on = b.getAttribute('data-fg') === g; b.classList.toggle('on', on); b.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
    [].forEach.call(pgb.querySelectorAll('.sk-ic'), function(ic){
      var m = g === 'all' || ic.getAttribute('data-g') === g;
      ic.classList.toggle('dim', !m); ic.classList.toggle('hl', m && g !== 'all');
    });
    var n = 0;
    [].forEach.call(pgb.querySelectorAll('.sk-card'), function(c){
      var m = g === 'all' || c.getAttribute('data-g') === g;
      c.hidden = !m;
      if (m) { c.classList.add('in'); if (!reduce && c.animate) c.animate([{ opacity: 0, transform: 'translateY(12px) scale(.95)' }, { opacity: 1, transform: 'none' }], { duration: 420, delay: (n++) * 45, easing: 'cubic-bezier(.22,1,.36,1)', fill: 'backwards' }); }
    });
    kick(6);
    var o = orbit(); if (o) punch(o);
  }
  pgb.addEventListener('click', function(e){
    var b = e.target.closest && e.target.closest('.sk-tab');
    if (b) setFilter(b.getAttribute('data-fg'));
  });
})();

(function(){
  var pg = document.getElementById('pg'), pgb = document.getElementById('pgb'); if (!pg || !pgb || !window.SKR) return;
  var S = SKR, D = S.data, RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var COL_LIGHT = { all:'#14181f', fe:'#d9731f', anim:'#1f9d6b', be:'#cf3f3f', tool:'#2c4a9e', ai:'#0891b2' };
  var COL_DARK  = { all:'#f4f1ea', fe:'#f5923e', anim:'#34d399', be:'#f87171', tool:'#60a5fa', ai:'#22d3ee' };
  function isDark() {
    var t = document.documentElement.getAttribute('data-theme');
    if (t === 'dark') return true;
    if (t === 'light') return false;
    return !!(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
  }
  function catCol(g) { var map = isDark() ? COL_DARK : COL_LIGHT; return map[g] || map.all; }
  var NAME = { all:'Semua', fe:'Front-End', anim:'Animasi', be:'Back-End', tool:'Tools', ai:'AI' };
  var REP = { fe:'react', anim:'gsap', be:'laravel', tool:'vscode', ai:'claude' };
  /* isi penjelasan tiap tool: [pengantar, alasan, 5 kegunaan, tips, pertama kali, pelajaran, kesalahan] */
  var X = {
    html5:["HTML adalah kerangka halaman: tag yang memberi tahu browser mana judul, navigasi, artikel, formulir, dan tombol. HTML5 menambah tag semantik (header, nav, main, section, article, footer), elemen media seperti video dan canvas, serta input bawaan untuk email, tanggal, dan slider. Tanpa HTML yang benar, CSS dan JavaScript menempel di fondasi yang goyang.","Struktur yang benar membuat halaman terbaca oleh pembaca layar, mesin pencari, dan mode baca browser tanpa kerja tambahan. CSS saya juga jadi lebih pendek, karena elemen yang tepat sudah membawa perilaku bawaan.",["Menyusun kerangka halaman dengan header, main, section, dan footer","Memakai button untuk aksi dan a untuk pindah halaman, bukan div yang diberi klik","Menulis formulir dengan label, tipe input yang pas, dan validasi bawaan","Menambahkan alt pada gambar dan aria-label pada tombol ikon","Mengatur urutan heading h1 sampai h3 agar outline halaman masuk akal"],"Sebelum menulis CSS, matikan stylesheet sebentar. Kalau halaman masih terbaca urut dan masuk akal, struktur HTML-nya sudah benar.","Biodata satu halaman dengan teks biru bergaris bawah. Jelek, tapi itu pertama kalinya sesuatu yang saya tulis hidup di browser.","Pilih tag karena artinya, bukan karena tampilannya.","Memakai div untuk semuanya, lalu bingung kenapa tombol tidak bisa difokus dengan keyboard."],
    css3:["CSS mengatur semua yang terlihat: warna, huruf, jarak, tata letak, dan gerak. Flexbox menata satu arah, Grid menata dua arah, custom property menyimpan nilai yang dipakai ulang, dan media query menyesuaikan tampilan dengan ukuran layar. Transisi dan animasi bawaan menutup banyak kebutuhan yang dulu butuh library.","Browser mengerjakan CSS langsung di engine-nya, jadi animasi transform dan opacity mulus tanpa JavaScript. Satu file gaya yang rapi juga lebih ringan daripada setumpuk dependensi.",["Menata halaman dengan Grid dan komponen dengan Flexbox","Menyimpan warna, jarak, dan tema terang-gelap sebagai variabel CSS","Membuat animasi dengan transform dan opacity supaya tetap lancar","Menulis mobile-first lalu menambah breakpoint seperlunya","Memakai clamp() agar ukuran huruf mengalir mengikuti lebar layar"],"Animasikan transform dan opacity saja. Mengubah width, top, atau box-shadow terus-menerus membuat HP kelas menengah tersendat.","Memusatkan satu kotak memakan satu sore dan tiga tab StackOverflow. Sekarang itu dua baris.","Layout itu soal alur dan ruang, bukan menghafal properti.","Memberi z-index 9999 ke mana-mana, sampai semuanya saling menimpa dan saya harus belajar stacking context."],
    tailwind:["Tailwind adalah kumpulan utility class kecil seperti flex, p-4, dan text-lg yang disusun langsung di markup. Hanya class yang terpakai yang masuk ke CSS akhir, dan ada prefix responsif seperti md: dan lg: serta varian state seperti hover: dan focus:.","Jarak dan warna datang dari satu skala yang sama, jadi desain konsisten. Saya juga tidak lagi menamai class dan tidak bolak-balik antara file HTML dan CSS.",["Membuat prototipe halaman dalam satu file tanpa pindah-pindah","Menyetel layout responsif dengan prefix sm, md, dan lg","Mengubah warna dan font di konfigurasi agar punya karakter sendiri","Memadukannya dengan komponen React supaya class berulang jadi satu komponen","Memakai varian hover, focus, dan dark untuk keadaan interaktif"],"Kalau satu rangkaian class muncul lebih dari tiga kali, jadikan komponen. Jangan salin-tempel.","Awalnya risih melihat belasan class di satu tag. Seminggu kemudian saya tidak mau kembali.","Tailwind tidak menggantikan CSS. Ia mempercepat orang yang sudah paham CSS.","Menumpuk class tanpa aturan sampai satu tombol butuh dua baris. Sejak itu saya pecah jadi komponen."],
    bootstrap:["Bootstrap adalah framework CSS dengan grid 12 kolom, breakpoint standar, dan komponen siap pakai: navbar, card, modal, accordion, dan form. Versi terbarunya memakai variabel CSS sehingga tema bisa diubah tanpa menulis ulang.","Untuk halaman yang harus cepat jadi dan aman di banyak layar, grid dan komponennya sudah teruji. Ini framework pertama yang saya pelajari, jadi cara berpikir grid saya berawal dari sini.",["Menyusun halaman dengan container, row, dan col","Memakai navbar yang otomatis melipat di layar kecil","Membuat modal dan accordion tanpa menulis JavaScript sendiri","Mengganti warna utama lewat variabel agar tidak terlihat seperti bawaan","Menyiapkan prototipe untuk klien yang ingin melihat bentuknya dulu"],"Jangan biarkan bawaan. Ganti warna utama, radius, dan font, dan hasilnya langsung tidak terlihat seperti template.","Menempel class col-md-6 dan melihat kolom otomatis turun di HP. Saat itu saya sadar responsif ternyata bisa dipelajari.","Framework mempercepat langkah, tapi karakter tampilan tetap harus saya buat sendiri.","Menimpa class bawaan dengan !important berlapis-lapis. Mengubah variabelnya jauh lebih bersih."],
    vue:["Vue adalah framework JavaScript untuk antarmuka. Data dibuat reaktif lewat ref dan computed, sehingga tampilan ikut berubah saat data berubah. Template ditulis mirip HTML dengan directive seperti v-if, v-for, dan v-model, dan satu komponen disimpan dalam satu file .vue.","Kurva belajarnya landai dan model reaktivitasnya jelas. Saya memakainya sebagai pembanding supaya paham bahwa ide komponen dan state bukan milik satu library saja.",["Membuat komponen kecil dengan props dan emit","Memakai ref dan computed untuk data yang saling bergantung","Menampilkan daftar dengan v-for dan kondisi dengan v-if","Mengikat input dengan v-model untuk formulir sederhana","Membangun proyek latihan seperti daftar tugas dan kalkulator"],"Mulai dari satu komponen dan satu ref. Tambah fitur setelah yang itu benar-benar paham.","Saya buka karena penasaran kenapa orang bilang ramah pemula. v-model langsung membuat saya paham.","Belajar framework kedua membuat saya mengerti framework pertama lebih dalam.","Lupa memakai .value pada ref di script, lalu heran kenapa datanya tidak berubah."],
    gsap:["GSAP adalah library animasi JavaScript dengan kendali waktu yang presisi. Timeline menyusun urutan animasi, ScrollTrigger mengaitkan gerak dengan posisi gulir, dan easing mengatur rasa gerakan, dari lembut sampai memantul. Ia bisa menganimasikan CSS, SVG, dan objek JavaScript biasa.","Kalau urutan animasinya banyak, CSS saja cepat berantakan. Timeline membuat semuanya bisa dijeda, diputar balik, dan diatur ulang dari satu tempat.",["Menyusun animasi masuk halaman dengan timeline berurutan","Mengaitkan gerak elemen dengan posisi gulir lewat ScrollTrigger","Memilih easing agar gerakan terasa berat, ringan, atau lentur","Menganimasikan SVG, misalnya menggambar garis dari awal sampai akhir","Membersihkan animasi saat komponen dilepas supaya memori tidak bocor"],"Pilih easing sebelum durasi. Gerakan yang kaku jarang diselamatkan oleh durasi yang lebih panjang.","Timeline pertama saya cuma tiga kotak yang masuk bergantian. Saya memutarnya ulang belasan kali.","Gerakan yang bagus terasa alami. Yang terlihat justru mengganggu.","Membuat terlalu banyak animasi sekaligus, sampai halaman sendiri kehilangan fokus."],
    animejs:["Anime.js adalah library animasi ringan untuk CSS, SVG, DOM, dan objek JavaScript. Sintaksnya pendek, ada timeline dan stagger untuk animasi berjenjang, dan ukurannya kecil.","Untuk gerak kecil seperti ikon, garis, dan hover, saya tidak perlu memuat library besar. Ini cukup, ringan, dan cepat ditulis.",["Menganimasikan jalur SVG agar tergambar perlahan","Memberi jeda berjenjang antar elemen dengan stagger","Membuat angka statistik berhitung naik","Menyusun urutan pendek dengan timeline","Menambah umpan balik kecil saat tombol ditekan"],"Pakai stagger untuk daftar. Jeda 40 sampai 80 milidetik antar item sudah cukup untuk memberi kesan mengalir.","Saya mencari yang lebih ringan dari GSAP untuk efek kecil. Ketemu ini dan langsung cocok.","Animasi kecil yang tepat sasaran lebih membekas daripada yang besar tapi berlebihan.","Menganimasikan properti layout seperti width, padahal transform sudah cukup."],
    laravel:["Laravel adalah framework PHP untuk aplikasi web sisi server. Ia menyediakan routing, controller, Eloquent ORM untuk bicara dengan database, migration untuk versi skema, Blade untuk template, serta autentikasi dan validasi yang sudah jadi.","Strukturnya jelas dan dokumentasinya baik, jadi saya bisa melihat apa yang terjadi di balik tampilan: dari permintaan browser sampai data keluar dari database.",["Membuat route dan controller untuk halaman dan aksi dasar","Mendefinisikan tabel lewat migration dan mengelolanya dengan Eloquent","Menyusun tampilan dengan Blade dan layout bersama","Memvalidasi input formulir di sisi server","Memahami alur request, middleware, dan response secara utuh"],"Bangun satu proyek kecil sampai selesai, misalnya daftar tugas dengan login. Itu menunjukkan seluruh alurnya.","Saat pertama melihat sisi server, saya sadar tampilan cuma separuh cerita.","Back-end mengajarkan sabar: satu titik koma bisa menahan seluruh aplikasi.","Mengubah migration yang sudah dijalankan, bukan membuat migration baru."],
    react:["React membangun antarmuka dari komponen: potongan kecil yang menerima props, menyimpan state, dan menggambar dirinya sendiri. Hooks seperti useState dan useEffect mengelola data dan efek samping, dan React hanya memperbarui bagian layar yang memang berubah.","Tampilan yang rumit jadi bisa dirawat. Ubah satu komponen, dan semua tempat yang memakainya ikut berubah tanpa menyisir satu per satu.",["Membuat komponen yang bisa dipakai ulang dengan props","Mengelola data tampilan dengan useState dan useReducer","Mengambil data dan menjalankan efek samping lewat useEffect","Memecah halaman besar jadi komponen kecil yang jelas tanggung jawabnya","Membuat daftar, formulir, dan tampilan bersyarat yang responsif"],"Taruh state sesedikit dan sedekat mungkin dengan yang memakainya. Naikkan hanya kalau memang perlu dibagi.","Saya bingung kenapa semuanya harus komponen. Sekarang sulit membayangkan cara lain.","Pecah kecil dulu, gabungkan belakangan.","Menaruh semua state di komponen paling atas, sampai seluruh halaman dirender ulang tiap ketikan."],
    vscode:["VS Code adalah editor kode utama saya. Ada terminal terpadu, debugger, kontrol Git, pencarian ke seluruh proyek, dan ribuan extension untuk format, linting, serta autocomplete.","Cepat dibuka, ringan, dan bisa dibentuk sesuai kebiasaan. Satu jendela cukup untuk menulis, menjalankan, menguji, dan mengirim perubahan.",["Menulis HTML, CSS, dan JavaScript sepanjang hari","Memakai multi-cursor dan pencarian global untuk mengubah banyak tempat sekaligus","Merapikan kode otomatis saat disimpan dengan Prettier","Mencari error lewat debugger dan terminal bawaan","Melihat perubahan dan commit langsung dari panel Git"],"Hafalkan lima shortcut: palet perintah, pindah file cepat, multi-cursor, cari global, dan pindah baris. Hematnya terasa dalam seminggu.","Dulu saya menulis di editor apa saja. Sejak pindah ke sini, tidak pernah kembali.","Shortcut kecil yang dipakai tiap hari menghemat jam-jam yang besar.","Memasang terlalu banyak extension sampai editor terasa berat. Sekarang saya pasang yang benar-benar dipakai."],
    github:["GitHub menyimpan repositori Git di cloud. Setiap commit tercatat dengan pesan dan pembuatnya, branch memisahkan eksperimen dari versi utama, dan pull request memberi tempat meninjau sebelum digabung. GitHub Pages juga bisa menerbitkan situs statis langsung dari repositori.","Riwayat yang lengkap membuat saya berani bereksperimen, karena versi lama selalu bisa dikembalikan. Ia juga jadi etalase proyek saya.",["Menyimpan riwayat perubahan lewat commit dengan pesan jelas","Membuat branch untuk mencoba fitur tanpa merusak versi utama","Menerbitkan demo lewat GitHub Pages","Memamerkan proyek di profil @trynvexa","Mencadangkan seluruh proyek di luar laptop"],"Commit kecil dan sering, dengan pesan yang menjawab apa yang berubah dan kenapa. Dirimu enam bulan lagi akan berterima kasih.","Saya gugup menekan push pertama kali. Ternyata tidak ada yang rusak.","Berani bereksperimen karena apa pun bisa dikembalikan.","Satu commit berpesan update berisi sepuluh perubahan, lalu tidak bisa melacak mana yang merusak."],
    claude:["Claude adalah asisten AI dari Anthropic. Ia menulis dan membaca kode, menjelaskan konsep dari nol, meninjau struktur, dan membantu menyusun tulisan, dengan jawaban yang runtut dan mampu mengikuti percakapan panjang.","Penjelasannya runtut, jadi saya bisa paham kenapa sebuah kode bekerja, bukan cuma menyalinnya. Ia juga terus terang saat tidak yakin.",["Mencari penyebab bug dari pesan error dan potongan kode","Menjelaskan konsep baru dengan bahasa yang saya pahami","Merapikan nama, struktur, dan duplikasi di kode saya","Meninjau ulang hasil kerja sebelum dirilis","Menyusun dan memperbaiki teks, termasuk tulisan di halaman ini"],"Beri tujuan, potongan kode, dan pesan error sekaligus. Jawabannya jauh lebih tepat daripada pertanyaan pendek.","Awalnya saya cuma menyalin jawabannya. Lama-lama saya mulai bertanya kenapa.","AI paling berguna ketika saya tetap memegang kemudi dan memeriksa hasilnya.","Menempel kode hasil AI tanpa dibaca. Beberapa kali itu melahirkan bug yang lebih sulit dicari."],
    chatgpt:["ChatGPT adalah asisten AI dari OpenAI untuk percakapan bebas. Saya memakainya untuk melempar ide, menguji sudut pandang, merangkum bacaan panjang, dan mengubah catatan berantakan menjadi draf.","Cepat menghasilkan banyak kemungkinan sekaligus, jadi saya bisa memilih arah sebelum membuang waktu di jalan yang salah.",["Menggali ide fitur dan alur halaman","Merangkum dokumentasi panjang jadi poin utama","Menyusun draf awal teks dan potongan kode","Menguji ide dari sudut pandang pengguna yang berbeda","Menyiapkan pertanyaan sebelum bertanya ke sumber lain"],"Minta lima alternatif sekaligus, lalu gabungkan bagian terbaiknya sendiri. Jangan ambil satu mentah-mentah.","Saya pakai pertama untuk mencari judul. Sekarang jadi teman coret-coret harian.","Draf pertama dari AI adalah bahan, bukan hasil akhir.","Mempercayai nama fungsi yang terdengar yakin padahal salah. Sekarang saya cek ke dokumentasi."],
    gemini:["Gemini adalah AI dari Google yang terhubung dengan ekosistemnya, termasuk pencarian. Saya memakainya untuk riset cepat, membandingkan beberapa pendekatan, dan mengecek ulang jawaban dari AI lain.","Memeriksa silang itu penting. Satu sumber jarang cukup, dan Gemini memberi saya pembanding yang cepat.",["Riset cepat soal teknologi dan tren terbaru","Membandingkan beberapa solusi sebelum memutuskan","Memeriksa ulang jawaban AI lain","Mencari referensi dan contoh penerapan","Menguraikan istilah baru dalam bahasa sederhana"],"Untuk hal penting, buka dokumentasi resmi yang disebut. Jawaban AI adalah petunjuk, bukan bukti.","Saya coba karena ingin pembanding. Ternyata paling berguna untuk cek silang.","Satu sumber saja jarang cukup.","Menelan rekomendasi library yang ternyata sudah tidak dirawat. Sekarang saya cek tanggal rilis terakhirnya."],
    deepseek:["DeepSeek adalah model AI yang kuat di penalaran dan logika. Ia sering memaparkan langkah berpikirnya, jadi alur jawabannya bisa diikuti dan diperiksa.","Untuk masalah algoritma, saya butuh melihat prosesnya, bukan hanya jawabannya. Di situ saya bisa menemukan celah logika.",["Memecahkan soal logika dan algoritma yang buntu","Menjelaskan langkah berpikir secara berurutan","Mencari alternatif solusi yang lebih ringkas","Menguji ulang logika yang terasa janggal","Memeriksa kasus batas yang terlewat"],"Minta ia menunjukkan langkahnya, lalu uji satu per satu dengan contoh angka kecil.","Saya pakai saat satu masalah logika buntu seharian. Langkahnya membuat saya sadar di mana saya salah.","Cara berpikir yang berbeda kadang membuka pintu yang selama ini ada di depan mata.","Percaya pada langkah yang rapi padahal ada satu asumsi keliru di awal."]
  };
  Object.keys(X).forEach(function(k){ var a = X[k], o = D[k]; if (!o) return; o.d = a[0]; o.w = a[1]; o.u = a[2]; o.tip = a[3]; o.first = a[4]; o.less = a[5]; o.pit = a[6]; });
  var curG = 'all', snd = false, ac;
  function click(){ if (!snd) return; try { ac = ac || new (window.AudioContext || window.webkitAudioContext)(); var o = ac.createOscillator(), g = ac.createGain(), t = ac.currentTime; o.frequency.setValueAtTime(520, t); o.frequency.exponentialRampToValueAtTime(880, t + .06); g.gain.setValueAtTime(.04, t); g.gain.exponentialRampToValueAtTime(.0001, t + .09); o.connect(g); g.connect(ac.destination); o.start(); o.stop(t + .1); } catch (e) {} }
  function tween(el, to, ms, suf){ var f = parseFloat(el.textContent) || 0, t0 = performance.now(); (function s(t){ var p = Math.min(1, (t - t0) / ms); el.textContent = Math.round(f + (to - f) * (1 - Math.pow(1 - p, 3))) + (suf || ''); if (p < 1) requestAnimationFrame(s); })(t0); }
  function cnt(g){ return g === 'all' ? S.order.length : S.order.filter(function(k){ return D[k].g === g; }).length; }

  /* latar ringan + garis kemajuan gulir */
  var fx = document.createElement('div'); fx.className = 'fx64'; fx.setAttribute('aria-hidden', 'true');
  fx.innerHTML = '<i class="bl b1" style="--k:-.05"></i><i class="bl b2" style="--k:-.1"></i><i class="bl b3" style="--k:-.15"></i><i class="dots" style="--k:-.03"></i>';
  var pr = document.createElement('div'); pr.className = 'prog64'; pr.setAttribute('aria-hidden', 'true');
  pg.insertBefore(fx, pg.firstChild); pg.insertBefore(pr, pg.firstChild);
  var lx = innerWidth / 2, ly = innerHeight / 2, lastC;
  document.addEventListener('pointerdown', function(e){ lx = e.clientX; ly = e.clientY; }, true);
  var SEC = { '#14181f':'#8a94a6', '#d9731f':'#f5b84a', '#1f9d6b':'#4cc9a0', '#cf3f3f':'#f08a7a', '#2c4a9e':'#6a8de8', '#0891b2':'#4fd1e5' };
  function wash(c){
    if (RM || !fx.animate || !pg.classList.contains('open')) return;
    var f = document.createElement('i'), r = document.createElement('i'); f.className = 'wsh'; r.className = 'wsh wr';
    f.style.cssText = r.style.cssText = 'left:' + lx + 'px;top:' + ly + 'px;--k:0';
    f.style.background = 'color-mix(in srgb,' + c + ' 24%,transparent)'; r.style.border = '2px solid ' + c;
    fx.appendChild(f); fx.appendChild(r);
    f.animate([{ transform: 'scale(0)', opacity: 1 }, { transform: 'scale(80)', opacity: .9, offset: .55 }, { transform: 'scale(80)', opacity: 0 }], { duration: 1500, easing: 'cubic-bezier(.2,.7,.2,1)' }).onfinish = function(){ f.remove(); };
    r.animate([{ transform: 'scale(0)', opacity: .8 }, { transform: 'scale(60)', opacity: 0 }], { duration: 1000, easing: 'cubic-bezier(.2,.7,.2,1)' }).onfinish = function(){ r.remove(); };
    [].forEach.call(fx.querySelectorAll('.bl'), function(b, n){ b.animate([{ scale: 1 }, { scale: 1.35 }, { scale: 1 }], { duration: 1600, delay: n * 120, easing: 'ease-in-out' }); });
  }
  function setC(c){ pg.style.setProperty('--cc', c); fx.style.setProperty('--bgc', c); fx.style.setProperty('--bgd', SEC[c] || c); if (lastC && lastC !== c) wash(c); lastC = c; }

  /* dok & highlight kategori pada kartu Keahlian Utama */
  var toastTimer = 0;
  function showToast(dock, label) {
    var t = dock && dock.querySelector('.sk-dock-toast');
    if (!t) return;
    t.textContent = label;
    t.classList.add('is-show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function(){ t.classList.remove('is-show'); }, 1500);
  }
  function syncPill(dock, g) {
    if (!dock) return;
    var on = dock.querySelector('.sk-dk[data-fg="' + g + '"]'), pill = dock.querySelector('.sk-pill');
    if (!on || !pill) return;
    pill.style.top = on.offsetTop + 'px';
    pill.style.left = on.offsetLeft + 'px';
    pill.style.width = on.offsetWidth + 'px';
    pill.style.height = on.offsetHeight + 'px';
  }
  function applyBarFilter(g) {
    [].forEach.call(pgb.querySelectorAll('.sk-bar[data-bg]'), function(bar){
      var bg = bar.getAttribute('data-bg');
      bar.style.setProperty('--rc', catCol(bg));
      bar.classList.toggle('is-dim', g !== 'all' && bg !== g);
      bar.classList.toggle('is-hl', g !== 'all' && bg === g);
    });
  }
  function sync(g, fromClick, ox, oy){
    curG = g; if (ox != null) { lx = ox; ly = oy; } setC(catCol(g));
    applyBarFilter(g);
    var dock = pgb.querySelector('.sk-cats'); if (!dock) return;
    var on = dock.querySelector('.sk-dk[data-fg="' + g + '"]'), pill = dock.querySelector('.sk-pill');
    if (on && pill) {
      pill.classList.remove('mv'); void pill.offsetWidth; pill.classList.add('mv');
      syncPill(dock, g);
    }
    var b = dock.querySelector('.sk-n b'); if (b) tween(b, cnt(g), 450);
    var rawG = g === 'all' ? 'SKILL' : NAME[g];
    var trG = (window.ZK && ZK.t && ZK.t(rawG, ZK.lang)) || rawG;
    var gh = pgb.querySelector('.sk-ghost'); if (gh) { gh.textContent = trG.toUpperCase(); if (!RM && gh.animate) gh.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 420, easing: 'ease-out' }); }
    if (fromClick) {
      var lbl = (window.ZK && ZK.t && ZK.t(NAME[g], ZK.lang)) || NAME[g];
      showToast(dock, lbl + ' · ' + cnt(g));
      if (on && !RM) { on.classList.add('pull'); setTimeout(function(){ on.classList.remove('pull'); }, 850); }
    }
  }
  function build(dock){
    dock.setAttribute('data-v66', '1');
    dock.insertAdjacentHTML('afterbegin', '<i class="sk-pill" aria-hidden="true"></i><span class="sk-dock-toast" aria-live="polite"></span>');
    var tabs = [].slice.call(dock.querySelectorAll('.sk-tab'));
    tabs.forEach(function(b){
      var g = b.getAttribute('data-fg'), im = REP[g] && pgb.querySelector('.sk-card[data-k="' + REP[g] + '"] img');
      b.classList.add('sk-dk'); b.setAttribute('aria-label', NAME[g]);
      b.innerHTML = (im ? '<img alt="" src="' + im.src + '">' : '<svg viewBox="0 0 24 24"><rect x="4" y="4" width="6.5" height="6.5" rx="1.5"/><rect x="13.5" y="4" width="6.5" height="6.5" rx="1.5"/><rect x="4" y="13.5" width="6.5" height="6.5" rx="1.5"/><rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1.5"/></svg>') + '<span class="sk-dl">' + NAME[g] + '</span>';
    });
    dock.insertAdjacentHTML('beforeend', '<div class="sk-n"><b>' + cnt(curG) + '</b><small>tool</small></div><button type="button" class="sk-snd" aria-pressed="false" aria-label="Suara"><svg viewBox="0 0 24 24"><path d="M4 9v6h4l5 4V5L8 9zM16.5 9a4 4 0 010 6"/></svg></button>');
    dock.querySelector('.sk-snd').addEventListener('click', function(e){ e.stopPropagation(); snd = !snd; this.setAttribute('aria-pressed', snd); click(); });
    requestAnimationFrame(function(){ sync(curG); });
  }
  window.addEventListener('resize', function(){
    var dock = pgb.querySelector('.sk-cats');
    if (dock && dock.getAttribute('data-v66')) syncPill(dock, curG);
  }, { passive: true });
  new MutationObserver(function(){
    if (pg.classList.contains('p4') && pg.classList.contains('open')) {
      setC(catCol(curG));
      applyBarFilter(curG);
    }
  }).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  pgb.addEventListener('click', function(e){
    var t = e.target.closest && e.target.closest('.sk-tab'); if (t) { var rc = t.getBoundingClientRect(); sync(t.getAttribute('data-fg'), !!t.closest('.sk-cats'), rc.left + rc.width / 2, rc.top + rc.height / 2); click(); }
    else if (e.target.closest && e.target.closest('.sk-ic,.sk-card')) click();
    else if (e.target.closest && e.target.closest('.sk-hint')) { var n = pgb.querySelector('.sk-intro'); if (n) n.scrollIntoView({ behavior: RM ? 'auto' : 'smooth', block: 'start' }); }
  });

  /* angka naik + meter bar presisi pada Keahlian Utama (root: pg, tidak pernah macet di 0%) */
  function fillBar(bar){
    if (!bar || bar.getAttribute('data-filled')) return;
    bar.setAttribute('data-filled', '1');
    bar.classList.add('is-filled');
    var pct = bar.querySelector('.sk-bar-pct');
    if (!pct) return;
    var v = parseInt(pct.getAttribute('data-v'), 10) || 0;
    if (RM) { pct.textContent = v + '%'; return; }
    tween(pct, v, 980, '%');
  }
  var io = 'IntersectionObserver' in window && new IntersectionObserver(function(es){
    es.forEach(function(en){
      if (!en.isIntersecting) return;
      io.unobserve(en.target);
      if (en.target.classList.contains('sk-bars')) {
        [].forEach.call(en.target.querySelectorAll('.sk-bar'), fillBar);
      } else {
        fillBar(en.target);
      }
    });
  }, { root: pg, threshold: 0.05, rootMargin: '0px 0px -8px 0px' });
  function rings(){
    var list = pgb.querySelector('.sk-bars');
    if (list && !list.getAttribute('data-io') && io) { list.setAttribute('data-io', '1'); io.observe(list); }
    [].forEach.call(pgb.querySelectorAll('.sk-bar:not([data-o])'), function(bar){
      bar.setAttribute('data-o', '1');
      var bg = bar.getAttribute('data-bg') || 'fe';
      bar.style.setProperty('--rc', catCol(bg));
      if (io) io.observe(bar); else fillBar(bar);
    });
  }
  pg.addEventListener('scroll', function(){
    if (!pg.classList.contains('p4')) return;
    var vh = pg.clientHeight || window.innerHeight;
    [].forEach.call(pgb.querySelectorAll('.sk-bar:not([data-filled])'), function(bar){
      var r = bar.getBoundingClientRect();
      if (r.top < vh - 20 && r.bottom > 0) fillBar(bar);
    });
  }, { passive: true });
  var mo = 'IntersectionObserver' in window && new IntersectionObserver(function(es){ es.forEach(function(en){ en.target.classList.toggle('vis', en.isIntersecting); }); });

  /* panel */
  function enhance(p){
    var k = p.getAttribute('data-k'), d = D[k];
    if (!p.classList.contains('show')) { setC(catCol(curG)); return; }
    if (!d) return; setC(catCol(d.g));
    var pn = p.querySelector('.sk-pn'), lv = p.querySelector('.sk-lv');
    if (!p.querySelector('.sk-mtr')) { lv.insertAdjacentHTML('beforeend', '<div class="sk-mtr"><i></i></div>'); p.querySelector('.sk-why').parentNode.insertAdjacentHTML('afterend', '<div class="sk-row sk-first"><b class="sk-sh">Pertama kali pakai</b><p></p></div><div class="sk-row sk-less"><b class="sk-sh">Pelajaran terbesar</b><p></p></div><div class="sk-row sk-pit"><b class="sk-sh">Kesalahan yang pernah saya buat</b><p></p></div>'); }
    var m = p.querySelector('.sk-mtr i'); m.style.width = '0'; setTimeout(function(){ m.style.width = (d.l * 20) + '%'; }, 120);
    p.querySelector('.sk-first p').textContent = d.first || ''; p.querySelector('.sk-less p').textContent = d.less || ''; p.querySelector('.sk-pit p').textContent = d.pit || '';
    if (window.ZK && ZK.walk) ZK.walk(p);
    if (RM) return;
    var full = d.n, n = 0; pn.textContent = ''; pn.classList.add('typing'); clearInterval(pn._t);
    pn._t = setInterval(function(){ pn.textContent = full.slice(0, ++n); if (n >= full.length) { clearInterval(pn._t); pn.classList.remove('typing'); } }, 55);
    var im = p.querySelector('.sk-pi img'); if (im.animate) im.animate([{ transform: 'rotate(-220deg) scale(.2)', opacity: 0 }, { transform: 'none', opacity: 1 }], { duration: 700, easing: 'cubic-bezier(.22,1,.36,1)' });
    [].forEach.call(p.querySelectorAll('.sk-row'), function(r, j){ if (r.animate) r.animate([{ opacity: 0, transform: 'translateY(14px)' }, { opacity: 1, transform: 'none' }], { duration: 450, delay: 220 + j * 80, easing: 'ease-out', fill: 'backwards' }); });
  }
  function swipe(p){
    var x0, y0, ok = false;
    p.addEventListener('pointerdown', function(e){ x0 = e.clientX; y0 = e.clientY; ok = !e.target.closest('button,summary'); });
    p.addEventListener('pointerup', function(e){ if (!ok) return; ok = false; var dx = e.clientX - x0, dy = e.clientY - y0; if (Math.abs(dx) > 70 && Math.abs(dx) > Math.abs(dy) * 1.5) { var b = p.querySelector(dx < 0 ? '.sk-nx' : '.sk-pv'); if (b) b.click(); } });
  }
  function scan(){
    var dock = pgb.querySelector('.sk-cats'); if (dock && !dock.getAttribute('data-v66')) build(dock);
    var hint = pgb.querySelector('.sk-hint'); if (hint && !hint.getAttribute('data-v66')) { hint.setAttribute('data-v66', '1'); hint.innerHTML = '<span>Tekan ikon untuk membaca detailnya</span><span class="h-b">Gulir ke bawah: keahlian, cara kerja, tanya jawab</span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>'; hint.setAttribute('role', 'button'); hint.setAttribute('tabindex', '0'); }
    var p = pgb.querySelector('.sk-panel'); if (p && !p._v66) { p._v66 = 1; swipe(p); new MutationObserver(function(){ enhance(p); }).observe(p, { attributes: true, attributeFilter: ['data-k', 'class'] }); }
    rings();
    if (mo) [].forEach.call(pgb.querySelectorAll('.sk-marq:not([data-o])'), function(b){ b.setAttribute('data-o', 1); mo.observe(b); });
  }
  new MutationObserver(scan).observe(pgb, { childList: true, subtree: true }); scan();
  window.addEventListener('zk-lang', function(){ var gh = pgb.querySelector('.sk-ghost'); if (gh) { var rawG = curG === 'all' ? 'SKILL' : NAME[curG]; var trG = (window.ZK && ZK.t && ZK.t(rawG, ZK.lang)) || rawG; gh.textContent = trG.toUpperCase(); } });
})();
