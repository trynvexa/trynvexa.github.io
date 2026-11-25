/* ==========================================================================
   js/estate-data.js — Unified Master Architectural Data, Full Localization
   (Indonesian + English + 6 International Languages) & 3-Level 2D CAD Engine
   for THE GRAND ESTATE · Zikri's Dream House
   ========================================================================== */
(function () {
  'use strict';

  var PROPERTY_CONFIG = {
    name: 'THE GRAND ESTATE',
    collection: 'Zikri’s Dream House',
    subtitle: 'A Residence Beyond Ordinary Living.',
    tagline: 'Contemporary Luxury Residence',
    landArea: 600,
    buildingArea: 420,
    floors: 2,
    bedrooms: 4,
    bathrooms: 4,
    garageCars: 2,
    poolLabel: 'Private',
    siteDims: { width: 24.0, depth: 25.0 },
    footprintDims: { width: 20.0, depth: 11.0 }
  };

  /* ---------- Authoritative Zero-Overlap 3-Level Room Grid ---------- */
  var ROOMS = [
    /* ===== GROUND FLOOR (LEVEL 1 · Y = 0.00 m · 226 m²) ===== */
    {
      id: 'foyer', level: 1, num: '01', name: 'Grand Foyer',
      category: 'Arrival · Floating Staircase', catId: 'Penyambutan · Tangga Melayang', area: 20, cardId: 'architecture',
      bounds: { x1: -1.0, x2: 3.0, z1: 0.5, z2: 5.5 },
      spawn: { x: 1.1, y: 1.65, z: 4.35, yaw: 0.0 },
      cam: { az: 0.22, pol: 0.96, rad: 9.8, tx: 1.0, ty: 1.4, tz: 2.8 }
    },
    {
      id: 'living', level: 1, num: '02', name: 'Living Room',
      category: 'Double-Height Salon · 7.0 m', catId: 'Plafon Ganda · Tinggi 7,0 m', area: 32, cardId: 'living',
      bounds: { x1: 1.5, x2: 6.8, z1: -5.5, z2: 0.5 },
      spawn: { x: 3.8, y: 1.65, z: -1.2, yaw: 0.25 },
      cam: { az: 2.75, pol: 1.04, rad: 9.6, tx: 4.15, ty: 1.45, tz: -2.6 }
    },
    {
      id: 'family', level: 1, num: '03', name: 'Music & Family Lounge',
      category: 'Acoustic Guitar · Vinyl Console', catId: 'Gitar Akustik · Konsol Vinyl', area: 19, cardId: 'studio',
      bounds: { x1: 6.8, x2: 10.0, z1: -5.5, z2: 0.5 },
      spawn: { x: 8.1, y: 1.65, z: -1.6, yaw: 0.15 },
      cam: { az: 2.55, pol: 0.96, rad: 8.2, tx: 8.4, ty: 1.15, tz: -2.3 }
    },
    {
      id: 'dining', level: 1, num: '04', name: 'Dining Room',
      category: 'Formal 8-Seat Walnut Dining', catId: 'Meja Makan Kenari 8 Kursi', area: 24, cardId: 'kitchen',
      bounds: { x1: -2.5, x2: 1.5, z1: -5.5, z2: 0.5 },
      spawn: { x: -0.5, y: 1.65, z: -0.9, yaw: 0.05 },
      cam: { az: -2.85, pol: 0.94, rad: 8.8, tx: -0.5, ty: 1.15, tz: -2.6 }
    },
    {
      id: 'kitchen', level: 1, num: '05', name: 'Chef’s Kitchen',
      category: 'Calacatta Island & Coffee Bar', catId: 'Pulau Marmer Calacatta & Kopi', area: 27, cardId: 'kitchen',
      bounds: { x1: -7.0, x2: -2.5, z1: -5.5, z2: 0.5 },
      spawn: { x: -3.5, y: 1.65, z: -1.6, yaw: 0.72 },
      cam: { az: -2.55, pol: 0.92, rad: 8.8, tx: -4.8, ty: 1.15, tz: -2.7 }
    },
    {
      id: 'office', level: 1, num: '06', name: 'Dev & UI Studio',
      category: 'Walnut L-Desk · Dual Monitors', catId: 'Meja L Kenari · Dual Monitor', area: 15, cardId: 'studio',
      bounds: { x1: -4.0, x2: -1.0, z1: 0.5, z2: 5.5 },
      spawn: { x: -2.25, y: 1.65, z: 1.85, yaw: Math.PI },
      cam: { az: 3.06, pol: 0.64, rad: 5.5, tx: -2.48, ty: 1.02, tz: 3.45 }
    },
    {
      id: 'guestBed', level: 1, num: '07', name: 'Guest Bedroom',
      category: 'Ground Floor Private Suite', catId: 'Kamar Tamu Lantai Dasar', area: 22, cardId: 'master',
      bounds: { x1: 3.0, x2: 7.4, z1: 0.5, z2: 5.5 },
      spawn: { x: 4.3, y: 1.65, z: 1.8, yaw: -2.6 },
      cam: { az: 0.55, pol: 0.92, rad: 8.2, tx: 5.2, ty: 1.1, tz: 3.0 }
    },
    {
      id: 'guestBath', level: 1, num: '08', name: 'Guest Bathroom',
      category: 'Travertine Bath Suite', catId: 'Kamar Mandi Batu Travertine', area: 13, cardId: 'master',
      bounds: { x1: 7.4, x2: 10.0, z1: 0.5, z2: 5.5 },
      spawn: { x: 8.5, y: 1.65, z: 2.2, yaw: Math.PI },
      cam: { az: 0.45, pol: 0.86, rad: 7.0, tx: 8.7, ty: 1.1, tz: 3.0 }
    },
    {
      id: 'laundry', level: 1, num: '09', name: 'Laundry Room',
      category: 'Utility & Linen Care', catId: 'Utilitas & Perawatan Linen', area: 9, cardId: 'architecture',
      bounds: { x1: -10.0, x2: -7.0, z1: -2.5, z2: 0.5 },
      spawn: { x: -8.3, y: 1.65, z: -1.1, yaw: 1.2 },
      cam: { az: -1.15, pol: 0.88, rad: 6.4, tx: -8.5, ty: 1.1, tz: -1.0 }
    },
    {
      id: 'storage', level: 1, num: '10', name: 'Storage Room',
      category: 'Climate Archive', catId: 'Ruang Arsip & Penyimpanan', area: 9, cardId: 'architecture',
      bounds: { x1: -10.0, x2: -7.0, z1: -5.5, z2: -2.5 },
      spawn: { x: -8.3, y: 1.65, z: -3.8, yaw: 1.2 },
      cam: { az: -2.15, pol: 0.88, rad: 6.4, tx: -8.5, ty: 1.1, tz: -4.0 }
    },
    {
      id: 'garage', level: 1, num: '11', name: 'Two-Car Garage',
      category: 'Automotive Gallery', catId: 'Galeri Otomotif 2 Mobil', area: 36, cardId: 'garage',
      bounds: { x1: -10.0, x2: -4.0, z1: 0.5, z2: 6.5 },
      spawn: { x: -5.2, y: 1.65, z: 5.6, yaw: 0.45 },
      cam: { az: -0.58, pol: 1.14, rad: 12.8, tx: -6.8, ty: 1.2, tz: 4.8 }
    },

    /* ===== SECOND FLOOR (LEVEL 2 · Y = +3.60 m · 194 m²) ===== */
    {
      id: 'masterBed', level: 2, num: '12', name: 'Master Bedroom',
      category: 'Primary Suite · Pool View', catId: 'Kamar Utama · Pemandangan Kolam', area: 36, cardId: 'master',
      bounds: { x1: -10.0, x2: -4.0, z1: -5.5, z2: 0.5 },
      spawn: { x: -5.2, y: 5.25, z: -1.0, yaw: 0.72 },
      cam: { az: -2.52, pol: 0.96, rad: 10.2, tx: -7.0, ty: 4.8, tz: -2.6 }
    },
    {
      id: 'wardrobe', level: 2, num: '13', name: 'Walk-In Wardrobe',
      category: 'Bespoke Dressing Salon', catId: 'Ruang Ganti & Lemari Kaca', area: 16, cardId: 'master',
      bounds: { x1: -10.0, x2: -6.8, z1: 0.5, z2: 5.5 },
      spawn: { x: -8.4, y: 5.25, z: 1.6, yaw: Math.PI },
      cam: { az: -0.42, pol: 0.88, rad: 7.6, tx: -8.4, ty: 4.7, tz: 3.0 }
    },
    {
      id: 'masterBath', level: 2, num: '14', name: 'Master Bathroom',
      category: 'Spa Bath & Soaking Tub', catId: 'Kamar Mandi Spa & Bathtub', area: 14, cardId: 'master',
      bounds: { x1: -6.8, x2: -4.0, z1: 0.5, z2: 5.5 },
      spawn: { x: -5.4, y: 5.25, z: 1.8, yaw: Math.PI },
      cam: { az: -0.22, pol: 0.86, rad: 7.4, tx: -5.4, ty: 4.7, tz: 3.0 }
    },
    {
      id: 'familyLounge', level: 2, num: '15', name: 'Family Lounge',
      category: 'Mezzanine Gallery Overlook', catId: 'Mezzanine Menghadap Salon', area: 33, cardId: 'living',
      bounds: { x1: -4.0, x2: 1.5, z1: -5.5, z2: 0.5 },
      spawn: { x: -1.6, y: 5.25, z: -1.4, yaw: -0.95 },
      cam: { az: -2.68, pol: 0.94, rad: 10.2, tx: -1.2, ty: 4.8, tz: -2.5 }
    },
    {
      id: 'upperHall', level: 2, num: '16', name: 'Upper Gallery Hall',
      category: 'Stair Atrium & Rooftop Access', catId: 'Atrium Tangga & Akses Rooftop', area: 27, cardId: 'architecture',
      bounds: { x1: -4.0, x2: 1.5, z1: 0.5, z2: 5.5 },
      spawn: { x: -1.2, y: 5.25, z: 2.8, yaw: 0.0 },
      cam: { az: 0.35, pol: 0.92, rad: 9.8, tx: -1.2, ty: 4.8, tz: 2.8 }
    },
    {
      id: 'bedroom2', level: 2, num: '17', name: 'Bedroom II',
      category: 'South Private Suite', catId: 'Kamar Tidur Privat Selatan', area: 20, cardId: 'master',
      bounds: { x1: 1.5, x2: 5.4, z1: 0.5, z2: 5.5 },
      spawn: { x: 3.3, y: 5.25, z: 1.8, yaw: Math.PI },
      cam: { az: 0.32, pol: 0.92, rad: 8.2, tx: 3.45, ty: 4.75, tz: 3.0 }
    },
    {
      id: 'bath3', level: 2, num: '18', name: 'Bathroom III',
      category: 'En-Suite Bath', catId: 'Kamar Mandi Dalam', area: 6, cardId: 'master',
      bounds: { x1: 5.4, x2: 7.7, z1: 0.5, z2: 3.0 },
      spawn: { x: 6.5, y: 5.25, z: 1.6, yaw: -0.6 },
      cam: { az: 0.28, pol: 0.82, rad: 5.8, tx: 6.55, ty: 4.7, tz: 1.75 }
    },
    {
      id: 'bath4', level: 2, num: '19', name: 'Bathroom IV',
      category: 'East En-Suite Bath', catId: 'Kamar Mandi Timur', area: 6, cardId: 'master',
      bounds: { x1: 7.7, x2: 10.0, z1: 0.5, z2: 3.0 },
      spawn: { x: 8.8, y: 5.25, z: 1.6, yaw: 0.4 },
      cam: { az: 0.38, pol: 0.82, rad: 5.8, tx: 8.85, ty: 4.7, tz: 1.75 }
    },
    {
      id: 'bedroom3', level: 2, num: '20', name: 'Full Gaming Suite',
      category: 'Triple Curved Rig · RGB & Pool View', catId: 'Triple Monitor Lengkung · PC RGB', area: 19, cardId: 'gaming',
      bounds: { x1: 6.8, x2: 10.0, z1: -5.5, z2: 0.5 },
      spawn: { x: 8.35, y: 5.25, z: -2.25, yaw: Math.PI },
      cam: { az: 2.90, pol: 0.94, rad: 7.4, tx: 8.35, ty: 4.65, tz: -1.55 }
    },
    {
      id: 'balcony', level: 2, num: '21', name: 'Panoramic Balcony',
      category: 'Cantilevered Pool Overlook', catId: 'Balkon Kantilever Menghadap Kolam', area: 18, cardId: 'pool',
      bounds: { x1: -10.0, x2: 1.5, z1: -7.1, z2: -5.5 },
      spawn: { x: -4.2, y: 5.25, z: -6.3, yaw: 0.0 },
      cam: { az: -2.85, pol: 1.06, rad: 12.2, tx: -4.2, ty: 4.7, tz: -6.3 }
    },

    /* ===== ROOFTOP LEVEL (LEVEL 3 · Y = +7.00 m · Sky Lounge) ===== */
    {
      id: 'rooftop', level: 3, num: '22', name: 'Rooftop Sky Lounge',
      category: 'Sunset Pergola & Fire Lounge', catId: 'Pergola Senja & Fire-Bowl Lounge', area: 68, cardId: 'architecture',
      bounds: { x1: -9.6, x2: 1.4, z1: -5.2, z2: 1.0 },
      spawn: { x: -4.0, y: 8.65, z: -1.5, yaw: 0.45 },
      cam: { az: 0.65, pol: 1.04, rad: 16.5, tx: -4.1, ty: 7.9, tz: -2.1 }
    }
  ];

  var DOUBLE_HEIGHT_VOID = { x1: 1.5, x2: 6.8, z1: -5.5, z2: 0.5 };
  var STAIR_L1_L2 = { x1: -0.95, x2: 0.25, zStart: 4.55, zEnd: 0.85, yStart: 0.05, yEnd: 3.60, steps: 18 };
  var STAIR_L2_L3 = { x1: -3.65, x2: -2.55, zStart: 4.35, zEnd: 0.95, yStart: 3.65, yEnd: 7.00, steps: 16 };
  var POOL_SPEC    = { x1: 0.4, x2: 9.8, z1: -11.6, z2: -7.6 };
  var TERRACE_SPEC = { x1: -8.6, x2: 10.2, z1: -7.6, z2: -5.5 };

  var VEHICLES = [
    {
      id: 'porsche911',
      name: 'Porsche 911 Carrera S',
      brand: 'Porsche',
      category: 'Sports Coupé',
      categoryId: 'Coupé Sport',
      model: '992 Carrera S · Flat-6',
      colorName: 'GT Silver Metallic',
      colorHex: '#C8CDD2',
      location: 'South Arrival Forecourt',
      locationId: 'Halaman Kedatangan Selatan',
      pos: { x: -5.4, y: 0.02, z: 9.6, ry: -0.34 }
    },
    {
      id: 'gclass',
      name: 'Mercedes-Benz G 63 AMG',
      brand: 'Mercedes-Benz',
      category: 'Luxury Performance SUV',
      categoryId: 'SUV Performa Mewah',
      model: 'W463A AMG · Biturbo V8',
      colorName: 'Obsidian Black Metallic',
      colorHex: '#1A1C20',
      location: 'Two-Car Architectural Garage',
      locationId: 'Garasi Arsitektur 2 Mobil',
      pos: { x: -7.8, y: 0.06, z: 3.6, ry: 0.0 }
    }
  ];

  var CARD_ORDER = ['overview', 'architecture', 'living', 'kitchen', 'studio', 'gaming', 'master', 'pool', 'garden', 'garage', 'vehicles'];

  /* ---------- Contextual Floating Property Cards (English Default) ---------- */
  var INFO_CARDS = {
    overview: {
      id: 'overview', focusRoom: null, focusView: 'exterior',
      kicker: 'RESIDENCE DOSSIER',
      title: 'The Grand Estate',
      subtitle: 'Zikri’s Dream House · Contemporary Luxury',
      body: 'Two residential stories plus a rooftop sky lounge uniting honed travertine, architectural concrete, smoked walnut, a 7.0 m living salon, private pool, Dev Studio, and Full Gaming Suite.',
      metrics: [
        { k: 'Land', v: '600 m²' },
        { k: 'Building', v: '420 m²' },
        { k: 'Program', v: '22 Spaces' }
      ]
    },
    architecture: {
      id: 'architecture', focusRoom: 'foyer',
      kicker: 'ARCHITECTURE',
      title: 'Structural Clarity',
      subtitle: 'Travertine · Concrete · Warm Cedar',
      body: 'Cantilevered concrete slabs shade full-height glazing while framing gravel-ballast parapets, bronze scuppers, and floating oak staircases ascending to the rooftop.',
      metrics: [
        { k: 'Footprint', v: '20 × 11 m' },
        { k: 'Salon Height', v: '7.0 m' },
        { k: 'Rooftop', v: '68 m²' }
      ]
    },
    living: {
      id: 'living', focusRoom: 'living',
      kicker: 'LIVING SALON',
      title: 'Double-Height Salon',
      subtitle: '7.0 m Volume · Poolside Glazing',
      body: 'Anchored by a monolithic travertine fireplace wall, tailored ivory boucle sectional, fluted stone table, and floor-to-ceiling glass opening onto the pool deck.',
      metrics: [
        { k: 'Area', v: '32 m²' },
        { k: 'Ceiling', v: '7.0 m' },
        { k: 'Level', v: 'L1 / Void' }
      ]
    },
    kitchen: {
      id: 'kitchen', focusRoom: 'kitchen',
      kicker: 'CULINARY & DINING',
      title: 'Chef’s Kitchen & Dining',
      subtitle: 'Calacatta Waterfall Island · 8 Seats',
      body: 'Full-height smoked-oak millwork integrates stainless refrigeration, convection oven tower, bronze range hood, espresso bar, and an 8-seat solid walnut dining table.',
      metrics: [
        { k: 'Kitchen', v: '27 m²' },
        { k: 'Dining', v: '24 m²' },
        { k: 'Stone', v: 'Calacatta' }
      ]
    },
    studio: {
      id: 'studio', focusRoom: 'office',
      kicker: 'CREATIVE & MUSIC',
      title: 'Dev & UI Studio · Music',
      subtitle: 'Personal Atelier & Vinyl Corner',
      body: 'Zikri’s ground-floor creative wing: a solid walnut L-desk with dual coding monitors, studio speakers & monograph library paired with an acoustic guitar and vinyl lounge.',
      metrics: [
        { k: 'Studio', v: '15 m²' },
        { k: 'Music Room', v: '19 m²' },
        { k: 'Finish', v: 'Walnut' }
      ]
    },
    gaming: {
      id: 'gaming', focusRoom: 'bedroom3',
      kicker: 'GAMING SUITE · L2',
      title: 'Full Gaming Suite',
      subtitle: 'Triple Curved Monitors · RGB PC',
      body: 'Minimalist charcoal fluted acoustic slats frame Zikri’s Level 2 battlestation: triple curved displays, glass RGB PC with 3 fan rings, hex wall LEDs & under-bed neon.',
      metrics: [
        { k: 'Area', v: '19 m²' },
        { k: 'Displays', v: '3× Curved' },
        { k: 'Level', v: 'Level 2' }
      ]
    },
    master: {
      id: 'master', focusRoom: 'masterBed',
      kicker: 'PRIMARY SUITE',
      title: 'Master Suite & Spa',
      subtitle: '66 m² North-West Wing · Pool View',
      body: 'Overlooking the pool and canopy on Level 2, uniting a king platform bedroom, glass-front walk-in dressing salon, and travertine spa bath with freestanding soaking tub.',
      metrics: [
        { k: 'Bedroom', v: '36 m²' },
        { k: 'Closet', v: '16 m²' },
        { k: 'Spa Bath', v: '14 m²' }
      ]
    },
    pool: {
      id: 'pool', focusView: 'pool',
      kicker: 'WATER ARCHITECTURE',
      title: 'Reflecting Pool',
      subtitle: '9.4 × 4.0 m · Sukabumi & Basalt',
      body: 'Recessed Sukabumi stone basin with submerged travertine entry steps, crisp basalt perimeter coping, underwater LED illumination, and shaded sun loungers.',
      metrics: [
        { k: 'Size', v: '9.4 × 4 m' },
        { k: 'Surface', v: '37.6 m²' },
        { k: 'Edge', v: 'Basalt' }
      ]
    },
    garden: {
      id: 'garden', focusView: 'garden',
      kicker: 'LANDSCAPE DESIGN',
      title: 'Private Walled Grounds',
      subtitle: '600 m² Tropical Estate Garden',
      body: 'Branching tropical trees casting dappled leaf shadows, flowering shrub borders, honed travertine stepping stones, warm bronze bollards, and an outdoor dining pergola.',
      metrics: [
        { k: 'Grounds', v: '600 m²' },
        { k: 'Terrace', v: '40 m²' },
        { k: 'Lights', v: '2700K LED' }
      ]
    },
    garage: {
      id: 'garage', focusRoom: 'garage',
      kicker: 'AUTOMOTIVE WING',
      title: 'Two-Car Garage',
      subtitle: '36 m² Gallery · Slatted Cedar Door',
      body: 'Polished concrete floor with recessed strip lighting, walnut wall storage, EV charging wallbox, and direct access into the arrival forecourt and utility rooms.',
      metrics: [
        { k: 'Capacity', v: '2 Cars' },
        { k: 'Area', v: '36 m²' },
        { k: 'Door', v: 'Cedar' }
      ]
    },
    vehicles: {
      id: 'vehicles', focusView: 'vehicles',
      kicker: 'VEHICLES',
      title: 'Estate Vehicles',
      subtitle: 'Forecourt & Covered Garage',
      body: 'Two sculpted icons staged on the residence grounds with metallic clearcoat paint, detailed cabins, forged alloy wheels, and night-synced LED lights.',
      vehicles: VEHICLES
    }
  };

  /* ---------- Complete Native Indonesian Floating Info Cards ---------- */
  var INFO_CARDS_ID = {
    overview: {
      kicker: 'RINGKASAN HUNIAN',
      title: 'The Grand Estate',
      subtitle: 'Rumah Impian Zikri · Mewah Kontemporer',
      body: 'Hunian dua lantai plus rooftop yang memadukan batu travertine, beton arsitektural, kayu kenari, ruang tamu plafon 7,0 m, kolam privat, Studio Dev, dan Kamar Full Gaming.',
      metrics: [
        { k: 'Lahan', v: '600 m²' },
        { k: 'Bangunan', v: '420 m²' },
        { k: 'Total', v: '22 Ruang' }
      ]
    },
    architecture: {
      kicker: 'ARSITEKTUR',
      title: 'Struktur & Material Jujur',
      subtitle: 'Travertine · Beton Ekspos · Kayu Cedar',
      body: 'Pelat kantilever menaungi kaca setinggi lantai-ke-plafon dengan atap parapet koral, talang perunggu, dan tangga kayu melayang yang menghubungkan Lantai 1 hingga Rooftop.',
      metrics: [
        { k: 'Tapak', v: '20 × 11 m' },
        { k: 'Tinggi Salon', v: '7,0 m' },
        { k: 'Rooftop', v: '68 m²' }
      ]
    },
    living: {
      kicker: 'RUANG TAMU',
      title: 'Salon Plafon Ganda',
      subtitle: 'Volume 7,0 m · Kaca Tepi Kolam',
      body: 'Dinding perapian travertine monolitik, sofa boucle gading berprofil lembut, meja batu fluted, dan tirai linen tipis yang membuka pandangan langsung ke kolam renang.',
      metrics: [
        { k: 'Luas', v: '32 m²' },
        { k: 'Plafon', v: '7,0 m' },
        { k: 'Level', v: 'L1 / Void' }
      ]
    },
    kitchen: {
      kicker: 'KULINER & MAKAN',
      title: 'Dapur & Ruang Makan',
      subtitle: 'Pulau Marmer Calacatta · 8 Kursi',
      body: 'Kabinet kayu kenari penuh dengan kulkas ganda stainless, oven tanam, hood perunggu, bar espresso, serta ruang makan kenari solid untuk 8 orang.',
      metrics: [
        { k: 'Dapur', v: '27 m²' },
        { k: 'Makan', v: '24 m²' },
        { k: 'Batu', v: 'Calacatta' }
      ]
    },
    studio: {
      kicker: 'STUDIO & MUSIK',
      title: 'Studio Dev & Sudut Musik',
      subtitle: 'Ruang Kerja Zikri & Lounge Vinyl',
      body: 'Sayap personal di lantai dasar: meja L kenari dengan dual monitor coding, speaker studio & rak buku monograf, berdampingan dengan ruang santai gitar akustik & pemutar vinyl.',
      metrics: [
        { k: 'Studio', v: '15 m²' },
        { k: 'Musik', v: '19 m²' },
        { k: 'Kayu', v: 'Kenari' }
      ]
    },
    gaming: {
      kicker: 'KAMAR GAMING · L2',
      title: 'Kamar Full Gaming',
      subtitle: 'Triple Monitor Lengkung · PC RGB',
      body: 'Dinding slat akustik arang membingkai battlestation pribadi Zikri di Lantai 2: tiga monitor lengkung menyala, PC kaca 3 kipas RGB, LED heksagonal, & neon bawah ranjang.',
      metrics: [
        { k: 'Luas', v: '19 m²' },
        { k: 'Layar', v: '3× Lengkung' },
        { k: 'Level', v: 'Lantai 2' }
      ]
    },
    master: {
      kicker: 'KAMAR UTAMA',
      title: 'Master Suite & Spa',
      subtitle: 'Sayap Barat Laut 66 m² · View Kolam',
      body: 'Menghadap kolam dan tajuk pepohonan dari Lantai 2, menggabungkan kamar tidur king, ruang ganti berkaca (walk-in closet), dan kamar mandi spa dengan bathtub oval.',
      metrics: [
        { k: 'Kamar', v: '36 m²' },
        { k: 'Closet', v: '16 m²' },
        { k: 'Spa', v: '14 m²' }
      ]
    },
    pool: {
      kicker: 'KOLAM RENANG',
      title: 'Kolam Renang Privat',
      subtitle: '9,4 × 4,0 m · Batu Sukabumi & Basalt',
      body: 'Kolam cekung berlapis batu Sukabumi dengan tiga anak tangga terendam, tepi basalt gelap, lampu LED bawah air, dan kursi berjemur di dek travertine.',
      metrics: [
        { k: 'Dimensi', v: '9,4 × 4 m' },
        { k: 'Luas Air', v: '37,6 m²' },
        { k: 'Tepi', v: 'Basalt' }
      ]
    },
    garden: {
      kicker: 'LANSKAP TAMAN',
      title: 'Taman Depan & Belakang',
      subtitle: 'Lahan Privat 600 m² Berpagar',
      body: 'Pohon tropis bercabang alami dengan bayangan daun menyaring sinar matahari, hamparan semak berbunga, batu setapak travertine, lampu taman 2700K, & pergola makan luar.',
      metrics: [
        { k: 'Lahan', v: '600 m²' },
        { k: 'Teras', v: '40 m²' },
        { k: 'Lampu', v: '2700K LED' }
      ]
    },
    garage: {
      kicker: 'GARASI 2 MOBIL',
      title: 'Garasi 2 Mobil',
      subtitle: 'Galeri 36 m² · Pintu Kayu Cedar',
      body: 'Lantai beton poles dengan pencahayaan linear, lemari dinding kenari, charger mobil listrik (EV Wallbox), serta akses langsung ke area kedatangan dan ruang utilitas.',
      metrics: [
        { k: 'Kapasitas', v: '2 Mobil' },
        { k: 'Luas', v: '36 m²' },
        { k: 'Pintu', v: 'Cedar' }
      ]
    },
    vehicles: {
      kicker: 'KENDARAAN',
      title: 'Mobil di Hunian',
      subtitle: 'Halaman Depan & Dalam Garasi',
      body: 'Dua ikon otomotif Eropa berdetail tinggi dengan cat metalik mengilap, interior kabin utuh, pelek multi-spoke, kaliper rem, dan lampu LED yang menyala saat malam.',
      vehicles: VEHICLES
    }
  };

  /* ---------- Camera Orbit Presets ---------- */
  var VIEW_PRESETS = {
    hero:     { az: 0.42,  pol: 1.32, rad: 29.5, tx: -0.6, ty: 3.2, tz: 1.2 },
    exterior: { az: 0.56,  pol: 1.18, rad: 28.5, tx: 0.0,  ty: 2.6, tz: 0.2 },
    floor1:   { az: 0.42,  pol: 0.80, rad: 29.0, tx: 0.0,  ty: 0.6, tz: 0.0 },
    floor2:   { az: 0.45,  pol: 0.82, rad: 27.5, tx: 0.0,  ty: 4.1, tz: 0.0 },
    rooftop:  { az: 0.68,  pol: 1.02, rad: 17.5, tx: -3.5, ty: 7.6, tz: -1.8 },
    garden:   { az: 2.62,  pol: 1.18, rad: 24.5, tx: 1.8,  ty: 2.0, tz: -7.4 },
    pool:     { az: 2.58,  pol: 1.24, rad: 11.4, tx: 3.4,  ty: 1.35, tz: -7.8 },
    vehicles: { az: -0.46, pol: 1.28, rad: 12.4, tx: -6.2, ty: 1.05, tz: 7.4 }
  };

  var LIGHTING_SCENES = [
    { id: 'morning', clock: '07:30', hour: 7.5,   lamp: 18 },
    { id: 'day',     clock: '12:30', hour: 12.5,  lamp: 8  },
    { id: 'golden',  clock: '17:20', hour: 17.35, lamp: 65 },
    { id: 'evening', clock: '19:15', hour: 19.2,  lamp: 92 },
    { id: 'night',   clock: '22:00', hour: 22.0,  lamp: 100 }
  ];

  var ENTRY_JOURNEY = {
    id: 'entryJourney',
    name: 'Arrival into The Grand Estate',
    nameId: 'Kedatangan di The Grand Estate',
    viewMode: 'exterior',
    duration: 9400,
    doorOpenAt: 0.42,
    revealRoom: 'living',
    points: [
      { pos: [11.5, 6.2, 23.5],  look: [-0.8, 3.0, 1.8]  },
      { pos: [-1.8, 3.2, 16.5],  look: [-5.2, 1.3, 8.2]  },
      { pos: [-3.2, 1.85, 11.4], look: [-6.4, 1.2, 5.2]  },
      { pos: [0.8,  1.85, 9.6],  look: [1.1,  1.8, 4.6]  },
      { pos: [1.1,  1.72, 6.2],  look: [1.1,  1.7, 1.0]  },
      { pos: [1.3,  1.75, 2.2],  look: [3.2,  1.7, -3.5] },
      { pos: [2.4,  2.05, -0.4], look: [4.8,  1.4, -7.2] }
    ]
  };

  var RETURN_EXTERIOR_PATH = {
    id: 'returnExterior',
    name: 'Returning to the Grounds',
    nameId: 'Kembali ke Halaman Luar',
    viewMode: 'exterior',
    duration: 5200,
    points: [
      { pos: [2.4,  1.95, -0.6], look: [1.2, 1.7, 5.5]  },
      { pos: [1.2,  1.80, 4.4],  look: [0.5, 1.7, 11.0] },
      { pos: [2.6,  2.80, 11.8], look: [0.0, 2.4, 1.0]  },
      { pos: [13.2, 9.40, 22.8], look: [0.0, 2.6, 0.2]  }
    ]
  };

  var CINEMATICS = [
    {
      id: 'hero', code: 'A', name: 'Exterior Hero', nameId: 'Fasad Utama Eksterior', cardId: 'overview',
      desc: 'Wide sweeping reveal framing the stone facade, cantilevered upper volume and tropical canopy.',
      descId: 'Sapuan kamera lebar mengungkap fasad batu travertine, kantilever atas & taman tropis.',
      viewMode: 'exterior', duration: 9000,
      points: [
        { pos: [16.5, 8.2, 23.5],  look: [-0.5, 2.8, 0.5] },
        { pos: [6.0,  5.6, 25.2],  look: [-0.5, 3.0, 0.2] },
        { pos: [-11.5, 6.4, 22.5], look: [-0.4, 2.8, 0.0] },
        { pos: [-18.5, 8.4, 14.5], look: [0.0,  2.6, -0.8] }
      ]
    },
    {
      id: 'entrance', code: 'B', name: 'Front Entrance', nameId: 'Pendekatan Pintu Utama', cardId: 'architecture',
      desc: 'Measured architectural approach along honed travertine stepping stones toward the walnut pivot entry.',
      descId: 'Gerak perlahan menyusuri batu setapak travertine menuju pintu pivot kayu kenari.',
      viewMode: 'exterior', duration: 7400,
      points: [
        { pos: [2.6, 2.2, 16.4], look: [1.0, 2.2, 5.2] },
        { pos: [1.6, 1.9, 12.2], look: [1.1, 2.0, 5.2] },
        { pos: [1.1, 1.75, 8.2], look: [1.1, 1.8, 4.2] },
        { pos: [1.1, 1.72, 4.8], look: [1.1, 1.7, -1.5] }
      ]
    },
    {
      id: 'vehicles', code: 'C', name: 'Vehicle Showcase', nameId: 'Pameran Koleksi Mobil', cardId: 'vehicles',
      desc: 'Editorial low orbit across the GT Silver Porsche 911 Carrera S and Obsidian Mercedes-Benz G 63 AMG.',
      descId: 'Orbit rendah menyorot Porsche 911 Carrera S di halaman & Mercedes-Benz G 63 AMG di garasi.',
      viewMode: 'exterior', duration: 9000,
      points: [
        { pos: [-1.4, 1.65, 13.8], look: [-5.6, 0.95, 9.2] },
        { pos: [-6.8, 1.45, 14.2], look: [-5.5, 0.95, 9.2] },
        { pos: [-10.8, 1.85, 9.8], look: [-6.4, 1.05, 6.6] },
        { pos: [-4.2, 2.15, 9.2],  look: [-7.8, 1.20, 3.8] },
        { pos: [-5.8, 1.95, 7.6],  look: [-7.8, 1.15, 3.4] }
      ]
    },
    {
      id: 'garden', code: 'D', name: 'Garden Tour', nameId: 'Tur Lanskap Taman', cardId: 'garden',
      desc: 'Graceful sweep encircling the rear lawn, branching tropical trees, flower borders and outdoor pergola.',
      descId: 'Menyusuri taman belakang, pepohonan tropis bercabang, hamparan bunga & pergola santai.',
      viewMode: 'exterior', duration: 9200,
      points: [
        { pos: [16.8, 4.2, -9.2],  look: [1.5, 2.0, -6.5] },
        { pos: [11.2, 3.2, -16.8], look: [0.5, 2.2, -6.2] },
        { pos: [-3.5, 3.4, -17.5], look: [-1.2, 2.2, -5.8] },
        { pos: [-15.2, 4.6, -11.4], look: [-2.0, 2.4, -4.5] }
      ]
    },
    {
      id: 'pool', code: 'E', name: 'Swimming Pool', nameId: 'Kolam Renang Privat', cardId: 'pool',
      desc: 'Low skimming perspective across shimmering Sukabumi water, submerged stone steps and glass facade.',
      descId: 'Sudut rendah menyusuri kilau air batu Sukabumi, anak tangga terendam & fasad kaca belakang.',
      viewMode: 'exterior', duration: 8200,
      points: [
        { pos: [12.4, 1.55, -12.6], look: [3.2, 1.35, -7.8] },
        { pos: [6.8,  1.25, -13.4], look: [3.6, 1.55, -5.8] },
        { pos: [0.4,  1.45, -12.8], look: [4.8, 1.65, -6.4] },
        { pos: [-2.6, 2.45, -10.8], look: [5.0, 1.40, -8.8] }
      ]
    },
    {
      id: 'living', code: 'F', name: 'Living & Music Salon', nameId: 'Ruang Tamu & Musik', cardId: 'living',
      desc: 'Fluid interior passage through the 7.0 m double-height living room and acoustic music lounge.',
      descId: 'Meluncur halus melintasi ruang tamu plafon 7,0 m menuju sudut gitar akustik & vinyl.',
      viewMode: 'exterior', duration: 8200,
      points: [
        { pos: [1.8, 1.85, 1.2],  look: [4.4, 1.35, -3.4] },
        { pos: [2.4, 1.72, -1.4], look: [4.8, 1.35, -4.2] },
        { pos: [6.0, 1.95, -1.2], look: [8.4, 1.15, -2.0] },
        { pos: [5.6, 2.65, -4.8], look: [3.6, 1.55, -1.6] }
      ]
    },
    {
      id: 'kitchen', code: 'G', name: 'Kitchen, Dining & Studio', nameId: 'Dapur, Makan & Studio', cardId: 'kitchen',
      desc: 'Culinary showcase gliding from formal dining to the Calacatta island and Dev & UI Studio.',
      descId: 'Dari meja makan kenari menuju pulau marmer Calacatta hingga Studio Dev & UI Zikri.',
      viewMode: 'floor1', duration: 8400,
      points: [
        { pos: [1.2,  3.2, -0.4], look: [-1.4, 1.0, -3.0] },
        { pos: [-1.6, 2.5, -0.8], look: [-4.8, 1.05, -3.4] },
        { pos: [-4.4, 2.3, -1.2], look: [-5.6, 1.05, -3.2] },
        { pos: [-1.2, 2.4, 0.8],  look: [-2.6, 1.05, 3.6] }
      ]
    },
    {
      id: 'gaming', code: 'H', name: 'Gaming & Master Suites', nameId: 'Kamar Gaming & Utama', cardId: 'gaming',
      desc: 'Elevated Level 2 tour from Zikri’s triple-screen RGB Gaming Suite to the Master Suite & Spa.',
      descId: 'Tur Lantai 2 dari Kamar Full Gaming tiga layar lengkung menuju Master Suite & Spa.',
      viewMode: 'floor2', duration: 8800,
      points: [
        { pos: [7.6, 5.5, -5.0],  look: [8.4, 4.6, -0.2] },
        { pos: [8.6, 5.2, -3.2],  look: [8.5, 4.7, 0.2]  },
        { pos: [0.4, 5.9, -4.4],  look: [-6.8, 4.7, -2.4] },
        { pos: [-5.2, 5.4, -1.2], look: [-8.0, 4.6, -3.0] }
      ]
    },
    {
      id: 'rooftop', code: 'I', name: 'Rooftop Sky Lounge', nameId: 'Rooftop Sky Lounge', cardId: 'architecture',
      desc: 'Golden sunset reveal across the shaded cedar pergola, fire-bowl seating and estate horizon.',
      descId: 'Suasana senja di pergola kayu cedar, perapian fire-bowl & panorama perbukitan.',
      viewMode: 'exterior', duration: 8200,
      points: [
        { pos: [5.4,  10.8, 4.2],   look: [-4.4, 7.8, -2.2] },
        { pos: [1.6,  9.2,  1.2],   look: [-5.4, 7.9, -2.6] },
        { pos: [-2.2, 8.8,  2.8],   look: [-5.2, 7.8, -2.8] },
        { pos: [-10.8, 10.6, -7.8], look: [-3.6, 7.6, -1.6] }
      ]
    },
    {
      id: 'fullTour', code: 'J', name: 'Complete Residence Tour', nameId: 'Tur Lengkap Hunian', cardId: 'overview',
      desc: 'Signature architectural film uniting arrival driveway, luxury vehicles, living salon, pool & rooftop.',
      descId: 'Film arsitektur menyeluruh dari halaman depan, koleksi mobil, salon, kolam hingga rooftop.',
      viewMode: 'exterior', duration: 21000,
      points: [
        { pos: [15.0, 7.6, 22.5],  look: [-0.6, 2.6, 0.5]  },
        { pos: [-4.2, 2.2, 13.8],  look: [-6.4, 1.1, 6.5]  },
        { pos: [1.1,  1.8, 7.8],   look: [1.1,  1.7, 1.2]  },
        { pos: [2.2,  2.0, -0.6],  look: [4.6,  1.4, -4.4] },
        { pos: [4.6,  2.0, -7.2],  look: [4.8,  1.0, -10.2] },
        { pos: [12.8, 3.6, -14.2], look: [1.2,  2.6, -4.8] },
        { pos: [-8.4, 9.8, -10.2], look: [-3.6, 7.4, -2.0] },
        { pos: [16.5, 11.2, 19.5], look: [0.0,  2.6, -0.5] }
      ]
    }
  ];

  var GALLERY_SHOTS = [
    { id: 'g1',  num: '01', title: 'South Arrival Facade',       titleId: 'Fasad Kedatangan Selatan',    sub: 'Travertine, concrete & driveway forecourt',     subId: 'Batu travertine, beton & halaman depan',        viewMode: 'exterior', lighting: 'golden',  cardId: 'overview',     cam: { az: 0.42,  pol: 1.32, rad: 28.5, tx: -0.6,  ty: 3.1,  tz: 1.2   } },
    { id: 'g2',  num: '02', title: 'Porsche 911 & G-Class Bay',  titleId: 'Porsche 911 & Garasi G 63',   sub: 'GT Silver 911 & Obsidian G 63 AMG garage',      subId: 'Porsche 911 perak & Mercedes G 63 hitam',       viewMode: 'exterior', lighting: 'golden',  cardId: 'vehicles',     cam: { az: -0.42, pol: 1.28, rad: 11.8, tx: -6.2,  ty: 1.05, tz: 7.4   } },
    { id: 'g3',  num: '03', title: 'Pool & Rear Facade',         titleId: 'Kolam & Fasad Belakang',      sub: 'Sukabumi water basin & double-height glass',    subId: 'Kolam batu Sukabumi & kaca plafon ganda',       viewMode: 'exterior', lighting: 'day',     cardId: 'pool',         cam: { az: 2.58,  pol: 1.24, rad: 11.4, tx: 3.4,   ty: 1.35, tz: -7.8  } },
    { id: 'g4',  num: '04', title: 'Double-Height Living Salon', titleId: 'Ruang Tamu Plafon Ganda',     sub: 'Boucle sectional & travertine fireplace wall',  subId: 'Sofa boucle gading & dinding perapian batu',    viewMode: 'floor1',   lighting: 'golden',  cardId: 'living',       cam: { az: 2.75,  pol: 0.96, rad: 9.2,  tx: 4.15,  ty: 1.2,  tz: -2.6  } },
    { id: 'g5',  num: '05', title: 'Chef’s Kitchen & Dining',    titleId: 'Dapur & Ruang Makan',         sub: 'Calacatta waterfall island & 8-seat walnut',    subId: 'Pulau marmer Calacatta & meja makan kenari',    viewMode: 'floor1',   lighting: 'day',     cardId: 'kitchen',      cam: { az: -2.62, pol: 0.92, rad: 10.6, tx: -3.1,  ty: 1.1,  tz: -2.6  } },
    { id: 'g6',  num: '06', title: 'Dev & UI Studio',            titleId: 'Studio Dev & UI Zikri',       sub: 'Walnut L-desk, dual coding screens & library',  subId: 'Meja L kenari, dual layar coding & rak buku',   viewMode: 'floor1',   lighting: 'golden',  cardId: 'studio',       cam: { az: 3.06,  pol: 0.64, rad: 5.5,  tx: -2.48, ty: 1.02, tz: 3.45  } },
    { id: 'g7',  num: '07', title: 'Full Gaming Suite (L2)',     titleId: 'Kamar Full Gaming (L2)',      sub: 'Triple curved rig, glass RGB PC & slat wall',   subId: 'Triple layar lengkung, PC RGB & dinding slat',  viewMode: 'floor2',   lighting: 'night',   cardId: 'gaming',       cam: { az: 2.90,  pol: 0.94, rad: 7.2,  tx: 8.35,  ty: 4.65, tz: -1.55 } },
    { id: 'g8',  num: '08', title: 'Master Suite & Spa',         titleId: 'Master Suite & Spa Bath',     sub: 'Primary bedroom, wardrobe & soaking tub',       subId: 'Kamar utama, walk-in closet & bathtub spa',     viewMode: 'floor2',   lighting: 'morning', cardId: 'master',       cam: { az: -2.42, pol: 0.92, rad: 11.4, tx: -7.0,  ty: 4.7,  tz: -1.8  } },
    { id: 'g9',  num: '09', title: 'Rooftop Sky Lounge',         titleId: 'Rooftop Sky Lounge',          sub: 'Shaded pergola & fire-bowl sunset deck',        subId: 'Pergola teduh, daybed & fire-bowl senja',       viewMode: 'exterior', lighting: 'golden',  cardId: 'architecture', cam: { az: 0.68,  pol: 1.02, rad: 16.8, tx: -4.1,  ty: 7.8,  tz: -2.0  } },
    { id: 'g10', num: '10', title: 'Nocturnal Estate Glow',      titleId: 'Kilau Arsitektur Malam',      sub: 'Illuminated residence, pool & car headlights',  subId: 'Pencahayaan fasad malam, kolam & lampu mobil',  viewMode: 'exterior', lighting: 'night',   cardId: 'overview',     cam: { az: 0.56,  pol: 1.22, rad: 27.5, tx: -0.5,  ty: 2.8,  tz: 0.8   } }
  ];

  /* ---------- Complete 8-Language UI Localization ---------- */
  var I18N = {
    en: {
      backAria: 'Back to portfolio',
      backText: 'Portfolio',
      wmMain: 'THE GRAND ESTATE',
      loaderKicker: 'CONTEMPORARY LUXURY ARCHITECTURE',
      loaderTitle: 'THE GRAND ESTATE',
      loaderInit: 'INITIALIZING 3D ARCHITECTURAL STAGE',
      loaderBuild: 'BUILDING RESIDENCE, VEHICLES & LANDSCAPE',
      loaderReady: 'WELCOME TO THE GRAND ESTATE',
      heroKicker: '01 · ZIKRI’S DREAM HOUSE · PRIVATE COLLECTION',
      heroTitle: 'THE GRAND ESTATE',
      heroSub: 'A Residence Beyond Ordinary Living.',
      heroSpecs: [
        { v: '600 m²', k: 'Estate Lot' },
        { v: '420 m²', k: 'Floor Area' },
        { v: '22',     k: 'Spaces' },
        { v: '2',      k: 'Vehicles' }
      ],
      exploreCta: 'EXPLORE RESIDENCE',
      heroPlanCta: 'FLOOR PLAN',
      nav: {
        explore: 'Explore',
        interior: 'Spaces',
        floorplan: 'Floor Plan',
        gallery: 'Gallery',
        details: 'Details'
      },
      lightTitle: 'Atmosphere & Solar Time',
      views: { exterior: 'Exterior', floor1: 'Level 1', floor2: 'Level 2', rooftop: 'Rooftop' },
      lighting: { morning: 'Morning', day: 'Daylight', golden: 'Golden', evening: 'Evening', night: 'Night' },
      actions: {
        walk: 'Walk',
        exitWalk: 'Exit Walk',
        infoCard: 'Info',
        hideCard: 'Hide Card',
        exterior: 'Outside',
        stopFilm: 'Stop',
        close: 'Close',
        menu: 'Menu',
        prevCard: 'Previous topic',
        nextCard: 'Next topic',
        enterWalk: 'Walkthrough',
        returnOutside: 'Return Outside',
        inspect3d: 'Focus 3D',
        walkInside: 'Walk Inside',
        return3d: 'Back to 3D',
        playTour: 'Complete Tour',
        inspectCars: 'Vehicles',
        viewPlan: 'Floor Plan',
        homeHero: 'Cover Hero'
      },
      drawer: {
        intKicker: 'SPACE DIRECTORY',
        intTitle: '22 Curated Spaces',
        intSub: 'Select a room for a smooth camera glide or step inside at eye level.',
        galKicker: 'FILMS & PHOTOGRAPHY',
        galTitle: 'Cinematics & Views',
        galSub: '10 directed sequences (A–J) and 10 live architectural compositions.',
        detKicker: 'ARCHITECTURAL MONOGRAPH',
        tabL1: 'Ground (11)',
        tabL2: 'Second (10)',
        tabL3: 'Rooftop',
        tabCin: '10 Cinematics',
        tabShots: '10 Live Views'
      },
      details: {
        metrics: [
          { k: 'Land Area', v: '600 m²' },
          { k: 'Building Area', v: '420 m²' },
          { k: 'Levels', v: '2 + Rooftop' },
          { k: 'Suites', v: '4 Beds · 4 Baths' }
        ],
        cards: [
          { h: 'Architectural Envelope', p: 'Two residential stories plus a 68 m² shaded rooftop lounge articulated in honed travertine, board-formed concrete, smoked oak millwork, cedar louvers, and gravel-ballast parapets.' },
          { h: 'Zikri’s Personal Suites', p: 'Unites a Level 1 Dev & UI Studio (walnut L-desk & dual displays), Music & Vinyl Lounge, and Level 2 Full Gaming Suite with triple curved monitors and smoked-glass RGB PC.' },
          { h: 'Automotive & Pool Grounds', p: '36 m² two-car garage and brushed-concrete forecourt presenting a Porsche 911 Carrera S & Mercedes-Benz G 63 AMG beside a recessed 9.4 × 4.0 m Sukabumi swimming pool.' }
        ]
      },
      walk: {
        hint: 'WASD / Arrows · Drag to look · Click floor to glide · Stairs L1 ↔ L2 ↔ L3',
        lvl1: 'L1 · Ground · 0.00 m',
        lvl2: 'L2 · Upper · +3.60 m',
        lvl3: 'L3 · Rooftop · +7.00 m'
      },
      fp: {
        kicker: 'MEASURED 2D ARCHITECTURAL CAD',
        title: '3-Level Floor Plans',
        l1: 'L1 · Ground (226 m²)',
        l2: 'L2 · Upper (194 m²)',
        l3: 'L3 · Rooftop (68 m²)',
        emptyTitle: 'Select Any Space',
        prompt: 'Click a room on the measured drawing to inspect specifications, focus in 3D, or step inside at eye level.',
        webglNotice: 'Interactive 2D CAD active (WebGL unavailable on this device).'
      },
      roomNames: {
        foyer: 'Grand Foyer', living: 'Living Room', family: 'Music & Family Lounge',
        dining: 'Dining Room', kitchen: 'Chef’s Kitchen', office: 'Dev & UI Studio',
        guestBed: 'Guest Bedroom', guestBath: 'Guest Bathroom', laundry: 'Laundry Room',
        storage: 'Storage Room', garage: 'Two-Car Garage', masterBed: 'Master Bedroom',
        wardrobe: 'Walk-In Wardrobe', masterBath: 'Master Bathroom', familyLounge: 'Family Lounge',
        upperHall: 'Upper Gallery Hall', bedroom2: 'Bedroom II', bath3: 'Bathroom III',
        bath4: 'Bathroom IV', bedroom3: 'Full Gaming Suite', balcony: 'Panoramic Balcony',
        rooftop: 'Rooftop Sky Lounge'
      }
    },

    id: {
      backAria: 'Kembali ke portofolio',
      backText: 'Portofolio',
      wmMain: 'THE GRAND ESTATE',
      loaderKicker: 'ARSITEKTUR HUNIAN MEWAH KONTEMPORER',
      loaderTitle: 'THE GRAND ESTATE',
      loaderInit: 'MENYIAPKAN PANGGUNG ARSITEKTUR 3D',
      loaderBuild: 'MEMBANGUN HUNIAN, KENDARAAN & LANSKAP',
      loaderReady: 'SELAMAT DATANG DI THE GRAND ESTATE',
      heroKicker: '01 · RUMAH IMPIAN ZIKRI · KOLEKSI PRIVAT',
      heroTitle: 'THE GRAND ESTATE',
      heroSub: 'Hunian Arsitektur Melampaui Batas Biasa.',
      heroSpecs: [
        { v: '600 m²', k: 'Luas Lahan' },
        { v: '420 m²', k: 'Bangunan' },
        { v: '22',     k: 'Ruangan' },
        { v: '2',      k: 'Mobil Mewah' }
      ],
      exploreCta: 'JELAJAHI HUNIAN',
      heroPlanCta: 'LIHAT DENAH 2D',
      nav: {
        explore: 'Eksplor',
        interior: 'Ruangan',
        floorplan: 'Denah 2D',
        gallery: 'Galeri',
        details: 'Tentang'
      },
      lightTitle: 'Suasana & Waktu Matahari',
      views: { exterior: 'Eksterior', floor1: 'Lantai 1', floor2: 'Lantai 2', rooftop: 'Rooftop' },
      lighting: { morning: 'Pagi', day: 'Siang', golden: 'Senja', evening: 'Magrib', night: 'Malam' },
      actions: {
        walk: 'Jalan',
        exitWalk: 'Keluar',
        infoCard: 'Info',
        hideCard: 'Tutup Kartu',
        exterior: 'Ke Luar',
        stopFilm: 'Stop',
        close: 'Tutup',
        menu: 'Menu',
        prevCard: 'Topik sebelumnya',
        nextCard: 'Topik berikutnya',
        enterWalk: 'Walkthrough',
        returnOutside: 'Ke Halaman Luar',
        inspect3d: 'Fokus 3D',
        walkInside: 'Masuk Ruangan',
        return3d: 'Kembali ke 3D',
        playTour: 'Tur Lengkap',
        inspectCars: 'Koleksi Mobil',
        viewPlan: 'Denah 2D',
        homeHero: 'Layar Pembuka'
      },
      drawer: {
        intKicker: 'DIREKTORI RUANGAN',
        intTitle: '22 Ruang Terkurasi',
        intSub: 'Pilih ruangan untuk fokus kamera halus atau masuk berjalan sejajar mata.',
        galKicker: 'FILM & FOTOGRAFI',
        galTitle: 'Sinematik & Sudut Live',
        galSub: '10 sekuens film arsitektur (A–J) dan 10 komposisi sudut foto 3D langsung.',
        detKicker: 'MONOGRAF ARSITEKTUR',
        tabL1: 'Lantai 1 (11)',
        tabL2: 'Lantai 2 (10)',
        tabL3: 'Rooftop',
        tabCin: '10 Sinematik',
        tabShots: '10 Sudut Foto'
      },
      details: {
        metrics: [
          { k: 'Luas Lahan', v: '600 m²' },
          { k: 'Bangunan', v: '420 m²' },
          { k: 'Tingkat', v: '2 + Rooftop' },
          { k: 'Kamar', v: '4 KT · 4 KM' }
        ],
        cards: [
          { h: 'Selubung Arsitektur', p: 'Dua lantai hunian utuh ditambah rooftop lounge 68 m², dirangkai dengan batu travertine honed, beton ekspos, kayu kenari & kisi cedar, serta atap parapet koral.' },
          { h: 'Ruang Personal Zikri', p: 'Memadukan Studio Dev & UI di Lantai 1 (meja L kenari & dual monitor), Ruang Musik & Vinyl, serta Kamar Full Gaming Lantai 2 dengan tiga layar lengkung & PC kaca RGB.' },
          { h: 'Otomotif & Lanskap Kolam', p: 'Garasi dua mobil 36 m² dan halaman beton sikat memajang Porsche 911 Carrera S & Mercedes-Benz G 63 AMG di samping kolam renang batu Sukabumi 9,4 × 4,0 m.' }
        ]
      },
      walk: {
        hint: 'WASD / Panah · Seret untuk menoleh · Klik lantai untuk jalan · Tangga L1 ↔ L2 ↔ L3',
        lvl1: 'L1 · Dasar · 0,00 m',
        lvl2: 'L2 · Atas · +3,60 m',
        lvl3: 'L3 · Rooftop · +7,00 m'
      },
      fp: {
        kicker: 'DENAH CAD ARSITEKTUR 2D TERUKUR',
        title: 'Denah Sinkron 3 Lantai',
        l1: 'L1 · Dasar (226 m²)',
        l2: 'L2 · Atas (194 m²)',
        l3: 'L3 · Rooftop (68 m²)',
        emptyTitle: 'Pilih Ruangan di Denah',
        prompt: 'Klik ruangan mana saja pada gambar CAD untuk membaca detailnya, fokus langsung di 3D, atau masuk mode jalan kaki.',
        webglNotice: 'Mode Denah CAD 2D interaktif aktif (WebGL tidak tersedia di perangkat ini).'
      },
      roomNames: {
        foyer: 'Foyer Utama', living: 'Ruang Tamu Utama', family: 'Ruang Musik & Keluarga',
        dining: 'Ruang Makan', kitchen: 'Dapur & Coffee Bar', office: 'Studio Dev & UI',
        guestBed: 'Kamar Tamu', guestBath: 'Kamar Mandi Tamu', laundry: 'Ruang Cuci',
        storage: 'Ruang Simpan', garage: 'Garasi 2 Mobil', masterBed: 'Kamar Utama',
        wardrobe: 'Walk-In Closet', masterBath: 'Kamar Mandi Spa', familyLounge: 'Lounge Lantai 2',
        upperHall: 'Galeri Atas', bedroom2: 'Kamar Tidur II', bath3: 'Kamar Mandi III',
        bath4: 'Kamar Mandi IV', bedroom3: 'Kamar Full Gaming', balcony: 'Balkon Kolam',
        rooftop: 'Rooftop Sky Lounge'
      }
    }
  };

  function makeLocale(base, overrides) {
    var out = JSON.parse(JSON.stringify(base));
    Object.keys(overrides).forEach(function (k) {
      if (overrides[k] && typeof overrides[k] === 'object' && !Array.isArray(overrides[k]) && out[k] && typeof out[k] === 'object') {
        Object.assign(out[k], overrides[k]);
      } else {
        out[k] = overrides[k];
      }
    });
    return out;
  }

  I18N.zh = makeLocale(I18N.en, {
    backAria: '返回作品集', backText: '作品集',
    heroKicker: '01 · ZIKRI 理想之家 · 私人建筑臻选',
    heroSub: '超越寻常生活的当代奢华居所。',
    exploreCta: '探索豪宅', heroPlanCta: '平面图',
    nav: { explore: '探索', interior: '空间', floorplan: '平面图', gallery: '图库', details: '详情' },
    views: { exterior: '外观', floor1: '一层', floor2: '二层', rooftop: '屋顶' },
    lighting: { morning: '清晨', day: '正午', golden: '黄金', evening: '黄昏', night: '夜晚' },
    actions: { walk: '漫游', exitWalk: '退出', infoCard: '信息', exterior: '户外', stopFilm: '停止', close: '关闭', menu: '菜单' },
    roomNames: Object.assign({}, I18N.en.roomNames, {
      foyer: '挑高门厅', living: '挑高客厅', family: '音乐家庭厅', dining: '正式餐厅',
      kitchen: '主厨厨房', office: '开发与UI工作室', garage: '双车位车库',
      masterBed: '主卧套房', bedroom3: '全套电竞房', rooftop: '屋顶空中露台'
    })
  });

  I18N.es = makeLocale(I18N.en, {
    backAria: 'Volver al portafolio', backText: 'Portafolio',
    heroSub: 'Una Residencia Más Allá de lo Ordinario.',
    exploreCta: 'EXPLORAR RESIDENCIA', heroPlanCta: 'PLANOS 2D',
    nav: { explore: 'Explorar', interior: 'Espacios', floorplan: 'Planos', gallery: 'Galería', details: 'Detalles' },
    views: { exterior: 'Exterior', floor1: 'Planta 1', floor2: 'Planta 2', rooftop: 'Azotea' },
    lighting: { morning: 'Mañana', day: 'Día', golden: 'Dorada', evening: 'Tarde', night: 'Noche' },
    actions: { walk: 'Caminar', exitWalk: 'Salir', infoCard: 'Info', exterior: 'Afuera', stopFilm: 'Parar', close: 'Cerrar', menu: 'Menú' }
  });

  I18N.ar = makeLocale(I18N.en, {
    backAria: 'العودة إلى معرض الأعمال', backText: 'المعرض',
    heroKicker: '01 · منزل أحلام زكري · مجموعة خاصة',
    heroSub: 'مسكن معماري فاخر يتجاوز المألوف.',
    exploreCta: 'استكشف الفيلا', heroPlanCta: 'المخطط 2D',
    lightTitle: 'الإضاءة ووقت الشمس',
    nav: { explore: 'استكشاف', interior: 'الغرف', floorplan: 'المخطط', gallery: 'المعرض', details: 'التفاصيل' },
    views: { exterior: 'الخارج', floor1: 'الطابق 1', floor2: 'الطابق 2', rooftop: 'السطح' },
    lighting: { morning: 'صباح', day: 'نهار', golden: 'ذهبي', evening: 'مساء', night: 'ليل' },
    actions: {
      walk: 'مشي', exitWalk: 'خروج', infoCard: 'معلومات', exterior: 'للخارج',
      stopFilm: 'إيقاف', close: 'إغلاق', menu: 'القائمة',
      enterWalk: 'جولة مشي', returnOutside: 'العودة للخارج', inspect3d: 'تركيز 3D',
      walkInside: 'دخول الغرفة', return3d: 'العودة إلى 3D', playTour: 'جولة كاملة',
      inspectCars: 'السيارات', viewPlan: 'المخطط 2D'
    },
    roomNames: Object.assign({}, I18N.en.roomNames, {
      foyer: 'البهو الرئيسي', living: 'صالة المعيشة', family: 'صالة الموسيقى',
      dining: 'غرفة الطعام', kitchen: 'المطبخ الفاخر', office: 'استوديو التطوير',
      garage: 'مرآب سيارتين', masterBed: 'الجناح الرئيسي', bedroom3: 'غرفة الألعاب RGB',
      rooftop: 'تراس السطح العلوي'
    })
  });

  I18N.fr = makeLocale(I18N.en, {
    backAria: 'Retour au portfolio', backText: 'Portfolio',
    heroSub: 'Une Résidence Au-Delà de l’Ordinaire.',
    exploreCta: 'EXPLORER LA RÉSIDENCE', heroPlanCta: 'PLANS 2D',
    nav: { explore: 'Explorer', interior: 'Espaces', floorplan: 'Plans', gallery: 'Galerie', details: 'Détails' },
    views: { exterior: 'Extérieur', floor1: 'Niveau 1', floor2: 'Niveau 2', rooftop: 'Toit' },
    lighting: { morning: 'Matin', day: 'Jour', golden: 'Dorée', evening: 'Soir', night: 'Nuit' },
    actions: { walk: 'Visiter', exitWalk: 'Quitter', infoCard: 'Info', exterior: 'Dehors', stopFilm: 'Stop', close: 'Fermer', menu: 'Menu' }
  });

  I18N.ja = makeLocale(I18N.en, {
    backAria: 'ポートフォリオへ戻る', backText: '戻る',
    heroSub: '日常を超越する現代ラグジュアリー邸宅。',
    exploreCta: '邸宅を探索する', heroPlanCta: '間取り図',
    nav: { explore: '探索', interior: '空間', floorplan: '間取り', gallery: 'ギャラリー', details: '詳細' },
    views: { exterior: '外観', floor1: '1階', floor2: '2階', rooftop: '屋上' },
    lighting: { morning: '朝', day: '昼', golden: '夕暮れ', evening: '黄昏', night: '夜' },
    actions: { walk: '歩行', exitWalk: '終了', infoCard: '情報', exterior: '屋外へ', stopFilm: '停止', close: '閉じる', menu: 'メニュー' }
  });

  I18N.ko = makeLocale(I18N.en, {
    backAria: '포트폴리오로 돌아가기', backText: '포트폴리오',
    heroSub: '일상을 넘어선 컨템포러리 럭셔리 레지던스.',
    exploreCta: '레지던스 탐험하기', heroPlanCta: '평면도',
    nav: { explore: '탐색', interior: '공간', floorplan: '평면도', gallery: '갤러리', details: '상세' },
    views: { exterior: '외관', floor1: '1층', floor2: '2층', rooftop: '루프탑' },
    lighting: { morning: '아침', day: '낮', golden: '골든', evening: '저녁', night: '밤' },
    actions: { walk: '걷기', exitWalk: '나가기', infoCard: '정보', exterior: '야외', stopFilm: '정지', close: '닫기', menu: '메뉴' }
  });

  function isIdLang(lang) {
    return (lang || (window.ZK && window.ZK.lang) || 'id').toLowerCase().slice(0, 2) === 'id';
  }

  function getLocale(lang) {
    var code = (lang || (window.ZK && window.ZK.lang) || 'id').toLowerCase().slice(0, 2);
    return I18N[code] || I18N.en;
  }

  function getRoomName(roomOrId, lang) {
    var id = typeof roomOrId === 'string' ? roomOrId : (roomOrId && roomOrId.id);
    var L = getLocale(lang);
    if (L.roomNames && L.roomNames[id]) return L.roomNames[id];
    var r = getRoomById(id);
    return r ? r.name : '';
  }

  function getRoomCategory(room, lang) {
    if (!room) return '';
    return isIdLang(lang) && room.catId ? room.catId : room.category;
  }

  function getInfoCard(cardId, lang) {
    var base = INFO_CARDS[cardId];
    if (!base) return null;
    if (isIdLang(lang) && INFO_CARDS_ID[cardId]) {
      return Object.assign({}, base, INFO_CARDS_ID[cardId]);
    }
    return base;
  }

  function getRoomById(id) {
    for (var i = 0; i < ROOMS.length; i++) if (ROOMS[i].id === id) return ROOMS[i];
    return null;
  }

  function getLightingScene(id) {
    for (var i = 0; i < LIGHTING_SCENES.length; i++) if (LIGHTING_SCENES[i].id === id) return LIGHTING_SCENES[i];
    return LIGHTING_SCENES[2];
  }

  function getCinematicById(id) {
    for (var i = 0; i < CINEMATICS.length; i++) if (CINEMATICS[i].id === id) return CINEMATICS[i];
    return null;
  }

  /* ========================================================================
     ACCURATE 3-LEVEL 2D ARCHITECTURAL FLOOR PLAN SVG GENERATOR
     ======================================================================== */
  function renderFloorPlanSvg(opts) {
    opts = opts || {};
    var level = opts.level || 1;
    var activeRoomId = opts.activeRoomId || null;
    var lang = opts.lang || 'id';

    var scale = 15.2, ox = 250, oy = 216;
    function sx(x) { return (ox + x * scale).toFixed(1); }
    function sz(z) { return (oy + z * scale).toFixed(1); }
    function sw(v) { return (v * scale).toFixed(1); }

    var grid = '<g stroke="rgba(24,23,21,0.055)" stroke-width="0.6">';
    for (var gx = -12; gx <= 12; gx += 2) grid += '<line x1="' + sx(gx) + '" y1="18" x2="' + sx(gx) + '" y2="342"/>';
    for (var gz = -12; gz <= 8; gz += 2) grid += '<line x1="22" y1="' + sz(gz) + '" x2="478" y2="' + sz(gz) + '"/>';
    grid += '</g>';

    var body = '';
    if (level === 1) {
      var P = POOL_SPEC, T = TERRACE_SPEC;
      body +=
        '<rect x="' + sx(T.x1) + '" y="' + sz(T.z1) + '" width="' + sw(T.x2 - T.x1) + '" height="' + sw(T.z2 - T.z1) + '" fill="rgba(218,208,192,0.45)" stroke="rgba(120,108,90,0.45)" stroke-width="0.9"/>' +
        '<text x="' + sx(-4.5) + '" y="' + sz(-6.45) + '" text-anchor="middle" fill="#7D7364" font-size="6.2" font-family="ui-monospace,monospace" letter-spacing="0.8">TERAS KOLAM</text>' +
        '<rect x="' + sx(P.x1) + '" y="' + sz(P.z1) + '" width="' + sw(P.x2 - P.x1) + '" height="' + sw(P.z2 - P.z1) + '" rx="2" fill="rgba(68,162,184,0.22)" stroke="#3B879B" stroke-width="1.3"/>' +
        '<line x1="' + sx(P.x1 + 0.4) + '" y1="' + sz(P.z1 + 1.0) + '" x2="' + sx(P.x1 + 0.4) + '" y2="' + sz(P.z2 - 1.0) + '" stroke="#3B879B" stroke-width="0.8"/>' +
        '<line x1="' + sx(P.x1 + 0.8) + '" y1="' + sz(P.z1 + 1.0) + '" x2="' + sx(P.x1 + 0.8) + '" y2="' + sz(P.z2 - 1.0) + '" stroke="#3B879B" stroke-width="0.8"/>' +
        '<text x="' + sx((P.x1 + P.x2) * 0.5) + '" y="' + sz((P.z1 + P.z2) * 0.5 + 0.2) + '" text-anchor="middle" fill="#2A6D80" font-size="7.2" font-weight="700" font-family="ui-monospace,monospace">SWIMMING POOL · 9.4×4.0m</text>' +
        '<rect x="' + sx(-10.0) + '" y="' + sz(6.0) + '" width="' + sw(6.4) + '" height="' + sw(2.1) + '" fill="rgba(165,160,152,0.14)" stroke="rgba(90,86,80,0.32)" stroke-dasharray="3 2" stroke-width="0.8"/>' +
        '<text x="' + sx(-6.8) + '" y="' + sz(7.35) + '" text-anchor="middle" fill="#7A746B" font-size="5.5" font-family="ui-monospace,monospace">DRIVEWAY · PORSCHE 911</text>' +
        '<rect x="' + sx(-0.2) + '" y="' + sz(5.5) + '" width="' + sw(2.6) + '" height="' + sw(2.1) + '" fill="rgba(218,208,192,0.34)" stroke="rgba(120,108,90,0.36)" stroke-width="0.7"/>' +
        '<text x="' + sx(1.1) + '" y="' + sz(6.95) + '" text-anchor="middle" fill="#7A746B" font-size="5.4" font-family="ui-monospace,monospace">MAIN ENTRY</text>';
    } else if (level === 2) {
      body +=
        '<rect x="' + sx(-10.0) + '" y="' + sz(-5.5) + '" width="' + sw(20.0) + '" height="' + sw(11.0) + '" fill="none" stroke="rgba(24,23,21,0.18)" stroke-dasharray="4 3" stroke-width="0.9"/>' +
        '<rect x="' + sx(DOUBLE_HEIGHT_VOID.x1) + '" y="' + sz(DOUBLE_HEIGHT_VOID.z1) + '" width="' + sw(DOUBLE_HEIGHT_VOID.x2 - DOUBLE_HEIGHT_VOID.x1) + '" height="' + sw(DOUBLE_HEIGHT_VOID.z2 - DOUBLE_HEIGHT_VOID.z1) + '" fill="rgba(155,126,88,0.06)" stroke="rgba(155,126,88,0.5)" stroke-dasharray="3 2" stroke-width="1"/>' +
        '<line x1="' + sx(DOUBLE_HEIGHT_VOID.x1) + '" y1="' + sz(DOUBLE_HEIGHT_VOID.z1) + '" x2="' + sx(DOUBLE_HEIGHT_VOID.x2) + '" y2="' + sz(DOUBLE_HEIGHT_VOID.z2) + '" stroke="rgba(155,126,88,0.28)" stroke-width="0.7"/>' +
        '<line x1="' + sx(DOUBLE_HEIGHT_VOID.x2) + '" y1="' + sz(DOUBLE_HEIGHT_VOID.z1) + '" x2="' + sx(DOUBLE_HEIGHT_VOID.x1) + '" y2="' + sz(DOUBLE_HEIGHT_VOID.z2) + '" stroke="rgba(155,126,88,0.28)" stroke-width="0.7"/>' +
        '<text x="' + sx(4.15) + '" y="' + sz(-2.3) + '" text-anchor="middle" fill="#8B6F4B" font-size="6.4" font-weight="700" font-family="ui-monospace,monospace">OPEN TO BELOW</text>' +
        '<text x="' + sx(4.15) + '" y="' + sz(-1.4) + '" text-anchor="middle" fill="#8B6F4B" font-size="5.6" font-family="ui-monospace,monospace">DOUBLE-HEIGHT SALON</text>';
    } else {
      body +=
        '<rect x="' + sx(-10.0) + '" y="' + sz(-5.5) + '" width="' + sw(20.0) + '" height="' + sw(11.0) + '" fill="rgba(140,134,124,0.09)" stroke="rgba(24,23,21,0.32)" stroke-width="1.2"/>' +
        '<text x="' + sx(5.6) + '" y="' + sz(-2.2) + '" text-anchor="middle" fill="#7D766B" font-size="6.2" font-family="ui-monospace,monospace">GRAVEL BALLAST ROOF</text>';
    }

    for (var i = 0; i < ROOMS.length; i++) {
      var r = ROOMS[i];
      if (r.level !== level) continue;
      var b = r.bounds;
      var act = activeRoomId === r.id;
      var isGaming = r.id === 'bedroom3';
      var fill = act ? 'rgba(155,126,88,0.28)' : (isGaming ? 'rgba(92,78,162,0.10)' : 'rgba(255,253,249,0.92)');
      var stroke = act ? '#8A6A42' : (isGaming ? '#5A4A9E' : '#1E1C1A');
      var swid = act ? '2.1' : '1.45';

      var furn = '';
      if (r.id === 'living') {
        furn = '<path d="M' + sx(2.2) + ' ' + sz(-4.1) + ' H' + sx(5.6) + ' V' + sz(-1.4) + ' H' + sx(4.6) + ' V' + sz(-3.1) + ' H' + sx(2.2) + ' Z" fill="none" stroke="rgba(24,23,21,0.32)" stroke-width="0.8"/>' +
               '<rect x="' + sx(2.8) + '" y="' + sz(-2.5) + '" width="' + sw(1.5) + '" height="' + sw(0.95) + '" rx="1.5" fill="none" stroke="rgba(24,23,21,0.3)" stroke-width="0.75"/>';
      } else if (r.id === 'dining') {
        furn = '<rect x="' + sx(-1.6) + '" y="' + sz(-3.8) + '" width="' + sw(2.2) + '" height="' + sw(1.2) + '" rx="1.5" fill="none" stroke="rgba(24,23,21,0.38)" stroke-width="0.85"/>';
      } else if (r.id === 'kitchen') {
        furn = '<rect x="' + sx(-6.7) + '" y="' + sz(-5.2) + '" width="' + sw(4.0) + '" height="' + sw(0.75) + '" fill="none" stroke="rgba(24,23,21,0.35)" stroke-width="0.8"/>' +
               '<rect x="' + sx(-6.2) + '" y="' + sz(-3.1) + '" width="' + sw(2.9) + '" height="' + sw(1.1) + '" fill="none" stroke="rgba(24,23,21,0.42)" stroke-width="0.9"/>';
      } else if (r.id === 'office') {
        furn = '<path d="M' + sx(-3.75) + ' ' + sz(2.1) + ' H' + sx(-3.0) + ' V' + sz(3.4) + ' H' + sx(-1.4) + ' V' + sz(4.2) + ' H' + sx(-3.75) + ' Z" fill="none" stroke="rgba(120,90,56,0.48)" stroke-width="0.85"/>';
      } else if (r.id === 'garage') {
        furn = '<rect x="' + sx(-8.8) + '" y="' + sz(1.4) + '" width="' + sw(2.0) + '" height="' + sw(4.4) + '" rx="3" fill="rgba(24,23,21,0.06)" stroke="rgba(24,23,21,0.42)" stroke-width="0.9"/>' +
               '<rect x="' + sx(-6.2) + '" y="' + sz(1.5) + '" width="' + sw(1.9) + '" height="' + sw(4.2) + '" rx="3" fill="none" stroke="rgba(24,23,21,0.22)" stroke-dasharray="2.5 2" stroke-width="0.8"/>';
      } else if (r.id === 'bedroom3') {
        furn = '<rect x="' + sx(7.1) + '" y="' + sz(-4.4) + '" width="' + sw(1.9) + '" height="' + sw(1.6) + '" rx="2" fill="none" stroke="rgba(90,74,158,0.48)" stroke-width="0.85"/>' +
               '<rect x="' + sx(7.2) + '" y="' + sz(-0.5) + '" width="' + sw(2.3) + '" height="' + sw(0.75) + '" rx="1.5" fill="rgba(56,242,255,0.14)" stroke="rgba(90,74,158,0.55)" stroke-width="0.85"/>';
      } else if (r.id === 'masterBed' || r.id === 'guestBed' || r.id === 'bedroom2') {
        var bx = (b.x1 + b.x2) * 0.5 - 1.0, bz = (b.z1 + b.z2) * 0.5 - 1.1;
        furn = '<rect x="' + sx(bx) + '" y="' + sz(bz) + '" width="' + sw(2.0) + '" height="' + sw(2.1) + '" rx="2" fill="none" stroke="rgba(24,23,21,0.35)" stroke-width="0.85"/>';
      } else if (r.id === 'masterBath') {
        furn = '<rect x="' + sx(-6.4) + '" y="' + sz(3.4) + '" width="' + sw(1.9) + '" height="' + sw(0.9) + '" rx="6" fill="none" stroke="rgba(59,135,155,0.55)" stroke-width="0.9"/>';
      } else if (r.id === 'rooftop') {
        furn = '<rect x="' + sx(-8.6) + '" y="' + sz(-4.2) + '" width="' + sw(4.4) + '" height="' + sw(3.6) + '" fill="rgba(155,126,88,0.12)" stroke="rgba(138,106,66,0.55)" stroke-width="0.9"/>' +
               '<circle cx="' + sx(-2.2) + '" cy="' + sz(-2.2) + '" r="10" fill="none" stroke="rgba(138,106,66,0.5)" stroke-width="0.85"/>';
      }

      var cx = Number(sx((b.x1 + b.x2) * 0.5));
      var cy = Number(sz((b.z1 + b.z2) * 0.5));
      var rLabel = getRoomName(r, lang);
      var roomW = b.x2 - b.x1;
      var fs = (roomW <= 3.3 && rLabel.length > 16) ? '3.9' : (roomW < 3.3 ? '4.6' : '5.8');

      body +=
        '<g class="ge-fp-room' + (act ? ' is-active' : '') + '" data-ge-room="' + r.id + '" role="button" tabindex="0" aria-label="' + rLabel + '">' +
          '<rect x="' + sx(b.x1) + '" y="' + sz(b.z1) + '" width="' + sw(b.x2 - b.x1) + '" height="' + sw(b.z2 - b.z1) + '" fill="' + fill + '" stroke="' + stroke + '" stroke-width="' + swid + '"/>' +
          furn +
          '<text x="' + cx.toFixed(1) + '" y="' + (cy - 1.5).toFixed(1) + '" text-anchor="middle" fill="' + (act ? '#6B4E2A' : '#181715') + '" font-size="' + fs + '" font-weight="700" font-family="Inter Tight,Inter,system-ui,sans-serif">' + rLabel + '</text>' +
          '<text x="' + cx.toFixed(1) + '" y="' + (cy + 7.2).toFixed(1) + '" text-anchor="middle" fill="#777066" font-size="5.4" font-family="ui-monospace,monospace">' + r.area + ' m²</text>' +
        '</g>';
    }

    var st = level === 1 ? STAIR_L1_L2 : STAIR_L2_L3;
    var stLines = '';
    for (var ts = 0; ts < 10; ts++) {
      var tz = st.zEnd + (ts / 9) * (st.zStart - st.zEnd);
      stLines += '<line x1="' + sx(st.x1) + '" y1="' + sz(tz) + '" x2="' + sx(st.x2) + '" y2="' + sz(tz) + '" stroke="#8A6A42" stroke-width="0.75"/>';
    }
    body +=
      '<g class="ge-fp-stair">' +
        '<rect x="' + sx(st.x1) + '" y="' + sz(st.zEnd) + '" width="' + sw(st.x2 - st.x1) + '" height="' + sw(st.zStart - st.zEnd) + '" fill="rgba(155,126,88,0.18)" stroke="#8A6A42" stroke-width="1"/>' +
        stLines +
        '<text x="' + sx((st.x1 + st.x2) * 0.5) + '" y="' + sz(st.zStart + 0.65) + '" text-anchor="middle" fill="#8A6A42" font-size="5.2" font-weight="700" font-family="ui-monospace,monospace">' + (level === 3 ? 'DN ↓ L2' : ('UP ↑ L' + (level + 1))) + '</text>' +
      '</g>';

    var dims =
      '<g fill="#746D63" stroke="rgba(24,23,21,0.28)" stroke-width="0.7" font-family="ui-monospace,monospace" font-size="6.0">' +
        '<line x1="' + sx(-10.0) + '" y1="340" x2="' + sx(10.0) + '" y2="340"/>' +
        '<text x="' + sx(0.0) + '" y="350" text-anchor="middle" stroke="none">20.0 m LEBAR BANGUNAN · 24.0 m LAHAN</text>' +
        '<line x1="18" y1="' + sz(-5.5) + '" x2="18" y2="' + sz(5.5) + '"/>' +
        '<text x="12" y="' + sz(0.0) + '" text-anchor="middle" stroke="none" transform="rotate(-90 12 ' + sz(0.0) + ')">11.0 m</text>' +
        '<text x="470" y="28" text-anchor="end" stroke="none" font-weight="700">N ↑ POOL</text>' +
      '</g>';

    return '<svg class="ge-fp-svg" viewBox="0 0 500 354" xmlns="http://www.w3.org/2000/svg" aria-label="The Grand Estate Floor Plan Level ' + level + '">' + grid + body + dims + '</svg>';
  }

  window.GE_DATA = {
    PROPERTY_CONFIG: PROPERTY_CONFIG,
    ROOMS: ROOMS,
    DOUBLE_HEIGHT_VOID: DOUBLE_HEIGHT_VOID,
    STAIR_L1_L2: STAIR_L1_L2,
    STAIR_L2_L3: STAIR_L2_L3,
    POOL_SPEC: POOL_SPEC,
    TERRACE_SPEC: TERRACE_SPEC,
    VEHICLES: VEHICLES,
    CARD_ORDER: CARD_ORDER,
    INFO_CARDS: INFO_CARDS,
    VIEW_PRESETS: VIEW_PRESETS,
    LIGHTING_SCENES: LIGHTING_SCENES,
    ENTRY_JOURNEY: ENTRY_JOURNEY,
    RETURN_EXTERIOR_PATH: RETURN_EXTERIOR_PATH,
    CINEMATICS: CINEMATICS,
    GALLERY_SHOTS: GALLERY_SHOTS,
    I18N: I18N,
    isIdLang: isIdLang,
    getLocale: getLocale,
    getRoomName: getRoomName,
    getRoomCategory: getRoomCategory,
    getInfoCard: getInfoCard,
    getRoomById: getRoomById,
    getLightingScene: getLightingScene,
    getCinematicById: getCinematicById,
    renderFloorPlanSvg: renderFloorPlanSvg
  };
})();
