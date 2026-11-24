# 🌟 M. Zikri Al-Bukhori — Portofolio

> **Front-End Developer & UI Designer** berbasis di Medan, Indonesia.  
> Mengubah ide jadi pengalaman web yang interaktif, dinamis, dan berkesan.

🌐 **Live Demo:** [https://trynvexa.github.io](https://trynvexa.github.io)

---

## ✨ Fitur Utama

- 🃏 **3D Cardistry Radial Wheel (8 Kartu)**: Navigasi kartu radial interaktif dengan 8 kartu (*Story, Music, Me, Frame, Skill, Proyek, Kontak, Fashion*), koreografi *3D Cardistry Deal & Flip*, punggung kartu maskot simetris, efek serpihan kaca saat membuka halaman, dan fisika kemiringan 3D (*spring-damped tilt*).
- 💻 **Me — Interactive "Laptop Dive" Hero (`p2`)**: Panggung satu layar interaktif dengan *cutout* potret, *lanyard designer card* 3D, transisi video masuk ke layar laptop, dan pratinjau studi kasus langsung di dalam layar.
- 🏗️ **Zikri's Depot — 3D Container-Crane Projects (`p5`)**: Panggung 3D Three.js dengan 7 kontainer kargo & *overhead gantry crane* berfisika nyata (mengangkat, mengayun, membuka pintu ganda 122°, menjatuhkan kontainer penyangga), dilengkapi **Case Study Modal** (cuplikan detail, salin palet HEX, spesifikasi arsitektur, & demo langsung).
- 🧥 **Fashion — 3D Runway Personal Collection (`p7`)**: Panggung *lookbook* 3D interaktif dengan 6 tampilan koleksi pribadi, inspeksi detail item, dan tampilan gaya editorial.
- 🎵 **3D Vinyl Turntable & Audio-Reactive Visualizer (`p1`)**: Pemutar piringan hitam 3D dengan lengan *tonearm* bergerak, cincin frekuensi audio WebGL/Canvas *real-time*, dan 6 track MP3 teroptimasi (`lagu-1.mp3` s/d `lagu-6.mp3`).
- ⚛️ **Hand-Anchored 3D Skill Orbit & Gyroscope (`p4`)**: Konstelasi orbit 15 teknologi interaktif yang dapat diputar di atas tangan, lengkap dengan giroskop energi WebGL Three.js dan panel penjelasan kategori.
- 🖼️ **Frame — Galeri Foto 3D Ring & Editorial Grid (`p3`)**: Panggung cincin foto 3D dengan *viewfinder HUD*, efek *shutter*, tampilan *Editorial Grid*, dan *fullscreen lightbox*.
- 🧵 **Story — Garis Waktu Benang Merah 3D (`p0`)**: Enam bab perjalanan hidup dengan garis benang merah animatif, paralaks potret, dan partikel bara api ringan.
- 🪪 **Kontak — 3D Prismatic Holographic Dev Pass (`p6`)**: Kartu identitas 3D prismatik yang dapat dimiringkan dan dibalik, tombol salin email cepat, dan *Quick Inquiry Composer* (WhatsApp & Email).
- 🤸 **Interactive Mascot & Buddy Physics**: Karakter maskot `#buddy` yang duduk di atas tipografi 3D `PORTOFOLIO`, melompat antar-huruf saat diklik, dan bereaksi terhadap kartu aktif.
- 🌓 **Tema Dinamis & Circular Wipe**: Mode terang (*Warm Editorial Paper*) dan gelap (*Deep Obsidian*) dengan transisi *View Transitions* melingkar dari tombol tema serta latar belakang foto aktif buram ringan (0% idle CPU/GPU).
- 🌍 **Multi-Language Engine (8 Bahasa + RTL)**: Terjemahan penuh tanpa celah untuk Bahasa Indonesia (ID), English (EN), 中文 (ZH), Español (ES), العربية (AR + tata letak RTL), Français (FR), 日本語 (JA), dan 한국어 (KO), ditambah jam Medan real-time (WIB).

---

## 📁 Struktur Proyek

```text
.
├── index.html                    # Markup HTML5 semantik, SEO/JSON-LD, SVG intro & 8 kartu
├── favicon.ico                   # Ikon situs utama
├── css/
│   ├── base.css                  # Variabel warna, reset, header dasar, roda kartu, & intro
│   ├── layout.css                # Layout responsif, animasi buddy, galeri Frame, & orbit Skill
│   ├── pages.css                 # Gaya halaman Story, Music, Kontak (3D Dev Pass), & mobile polish
│   ├── theme.css                 # Tema Light/Dark, 3D Cardistry, backdrop ringan, & halaman detail
│   ├── motion3d.css              # View Transitions theme wipe, 3D tilt, foil, sparks, & panggung WebGL
│   ├── me-dive.css               # Halaman Me (p2): panggung "Laptop Dive" & lanyard 3D
│   ├── projects-depot.css        # Halaman Proyek (p5): Zikri's Depot 3D & Case Study Modal
│   └── runway.css                # Halaman Fashion (p7): 3D Runway Personal Collection
├── js/
│   ├── intro.js                  # Animasi layar pembuka & pelacakan mata SVG
│   ├── theme.js                  # Pengatur mode Terang / Gelap + circular View Transition
│   ├── clock.js                  # Jam real-time Medan (WIB / Asia-Jakarta)
│   ├── mascot.js                 # Pelacakan mata maskot header
│   ├── buddy.js                  # Fisika karakter duduk, lompat pindah huruf, & reaksi kartu
│   ├── i18n.js                   # Mesin terjemahan instan 8 bahasa (+ RTL Arab)
│   ├── background.js             # Latar foto kartu aktif buram berbasis event (zero idle loop)
│   ├── carousel.js               # Mesin roda kartu radial 8 kartu, 3D Cardistry, & serpihan kaca
│   ├── motion3d.js               # Deteksi tier GPU/WebGL, siklus hidup halaman, tilt 3D, sparks & stamp
│   ├── webgl-scenes.js           # Adegan Three.js WebGL (+ fallback Canvas 2D) untuk Music & Skill
│   ├── page-enhancers.js         # Koreografi 3D per halaman (Story, Music, Frame, Skill, Kontak)
│   ├── story.js                  # Garis waktu benang merah (6 bab perjalanan)
│   ├── music.js                  # Pemutar piringan hitam MP3, Web Audio analyser, & partikel debu
│   ├── me-dive.js                # Mesin interaktif "Laptop Dive" (p2)
│   ├── gallery.js                # Galeri Frame 3D Ring, Editorial Grid, & Lightbox (p3)
│   ├── skills.js                 # Sistem orbit 15 teknologi & modal penjelasan (p4)
│   ├── projects.js               # Data & lokalisasi 8 bahasa untuk 4 studi kasus + 7 kontainer Depot
│   ├── projects-depot.js         # Mesin 3D Shipping Container & Gantry Crane + Case Study Modal (p5)
│   ├── contact.js                # Halaman Kontak Paper Riot, 3D Dev Pass, & Quick Composer (p6)
│   ├── runway-data.js            # Data koleksi & lokalisasi 8 bahasa untuk Fashion Runway (p7)
│   └── runway.js                 # Mesin panggung 3D Fashion Runway & inspeksi item (p7)
├── assets/
│   ├── images/                   # Ilustrasi karakter, potret kartu, galeri, & pratinjau proyek
│   ├── icons/                    # 15 ikon teknologi web & AI tools (.webp)
│   ├── audio/                    # 6 file lagu MP3 playlist (lagu-1.mp3 s/d lagu-6.mp3)
│   ├── me/                       # Aset panggung Me Laptop Dive (plate, cutout, video transisi)
│   └── runway/                   # Aset koleksi Fashion 3D Runway (.webp teroptimasi)
└── README.md                     # Dokumentasi proyek
```

---

## 🛠️ Teknologi yang Digunakan

- **Markup & Styling**: HTML5 Semantik, Modern CSS (CSS Grid, Flexbox, Custom Properties, CSS 3D Transforms, View Transitions API)
- **Logika & Animasi**: Vanilla JavaScript (ES6+), Three.js (WebGL 3D), Web Audio API, Web Animations API, SVG Filters
- **Hosting**: GitHub Pages (statis murni tanpa *build step*)

---

## 📬 Kontak

- **WhatsApp**: [+62 813-6738-1826](https://wa.me/6281367381826)
- **Email**: [zikriganteng2023@gmail.com](mailto:zikriganteng2023@gmail.com)
- **GitHub**: [@trynvexa](https://github.com/trynvexa)
- **Instagram**: [@yo144484](https://www.instagram.com/yo144484/)
- **TikTok**: [@frince_nael7](https://www.tiktok.com/@frince_nael7)

---

© 2026 M. Zikri Al-Bukhori. All rights reserved.
