import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Cpu,
  Compass,
  Globe,
  Terminal,
  MapPin,
  Gamepad2,
  Sparkles,
  Zap,
  CheckCircle2,
  Layers,
  ArrowRight
} from 'lucide-react';
import {
  DayakShieldEmblem,
  DayakBorderRibbon,
  DayakCornerAccent,
  DayakCulturalSeal
} from './DayakMotifs';

// 3 Key Dimensions of Luigi Iram Rangi
const pillars = [
  {
    id: 'pilar-arsitek',
    num: '01',
    category: 'Rekayasa Performa Tinggi',
    title: 'Zero-Bloat Web Architect',
    lead: 'Menghilangkan beban bloatware untuk kecepatan eksekusi sub-detik yang presisi.',
    description:
      'Setiap baris kode dirancang dengan filosofi kesederhanaan radikal. Tanpa ketergantungan berlebih, terstruktur secara semantik, dan dioptimasi hingga level bytecode untuk menghasilkan skor 100/100 Core Web Vitals.',
    highlights: [
      'Sub-0.6s LCP & Skor 100/100 Vitals',
      'Arsitektur Komponen Modular React 19',
      'Valid Schema.org & SEO Semantik Tinggi',
      'Aksesibilitas WCAG 2.1 AA Teruji'
    ],
    icon: Cpu,
    accent: '#684AFF',
    badge: 'Performance First'
  },
  {
    id: 'pilar-spasial',
    num: '02',
    category: 'Eksplorasi Spasial & Grafika',
    title: 'Creative WebGL & Three.js',
    lead: 'Membawa kedalaman visual 3D interaktif dan kalkulasi matematis shader ke web browser.',
    description:
      'Mengaburkan batas antara desain grafis statis dan instalasi seni digital interaktif. Menggunakan Three.js dan custom GLSL shaders yang merespons gerak kursor dan sentuhan pengguna secara kinetik pada 120 FPS.',
    highlights: [
      'Three.js Spatial Geometries & Physics Lerp',
      'Custom GPU Fragment & Vertex Shaders',
      'Interaksi Reaktif Sentuhan & Gyroscope',
      'Harmoni Geometri Modern & Ornamen Dayak'
    ],
    icon: Compass,
    accent: '#0284C7',
    badge: '120 FPS Visuals'
  },
  {
    id: 'pilar-budaya',
    num: '03',
    category: 'Pemberdayaan Regional & Studio',
    title: 'Founder of Ddev & Cultural Hub',
    lead: 'Mengakar di khatulistiwa Kalimantan Barat untuk memberi dampak digital nyata.',
    description:
      'Mendirikan Ddev Studio sebagai laboratorium rekayasa web, sekaligus memimpin pembangunan platform konservasi Borneo Globe (borneoglobe.org) yang menghubungkan riset keanekaragaman hayati Borneo dengan jejaring mitra global.',
    highlights: [
      'Founder & Lead Architect di Ddev Studio',
      'Platform Borneo Globe (2.800+ Beneficiaries)',
      'Konservasi Ekosistem Tropis & Budaya Lokal',
      'Kemitraan Komputasi Berkelanjutan'
    ],
    icon: Globe,
    accent: '#D97706',
    badge: 'Regional Impact'
  }
];

// Personal Principles & Work Ethos
const principles = [
  {
    num: '01',
    title: 'Presisi Tanpa Kompromi',
    tag: 'Code Quality',
    desc: 'Kode yang bersih, teruji, dan terdokumentasi adalah bentuk penghormatan tertinggi kepada pengguna dan sesama pengembang.'
  },
  {
    num: '02',
    title: 'Harmoni Tradisi & Teknologi Masa Depan',
    tag: 'Cultural Synthesis',
    desc: 'Budaya leluhur bukan artefak masa lalu yang beku, melainkan jiwa yang dapat diekspresikan kembali melalui sintaks komputasi kontemporer.'
  },
  {
    num: '03',
    title: 'Kecepatan Nyata Sebelum Estetika Hampa',
    tag: 'Speed First',
    desc: 'Desain visual termegah tidak ada artinya jika lambat dimuat. Kecepatan dan responsivitas instan adalah fondasi keindahan digital sejati.'
  },
  {
    num: '04',
    title: 'Daya Tahan di Lapangan Nyata',
    tag: 'Resilience',
    desc: 'Sistem harus tetap tangguh diakses di pelosok Kalimantan dengan jaringan terbatas, sama mulusnya seperti diakses di pusat kota metropolitan.'
  }
];

// Behind the Screen / Persona Tidbits
const personaDetails = [
  {
    label: 'Koordinat Markas',
    val: '0°01′S 109°20′E',
    sub: 'Pontianak, Kalimantan Barat',
    icon: MapPin
  },
  {
    label: 'Afinitas Estetika',
    val: 'Cyberpunk & Retro Arcade',
    sub: 'Inspirasi Easter Egg game di web ini',
    icon: Gamepad2
  },
  {
    label: 'Ritme Rekayasa',
    val: 'Kopi Robusta Lokal & Terminal',
    sub: 'Fokus arsitektur tanpa distorsi',
    icon: Terminal
  },
  {
    label: 'Spesialisasi Inti',
    val: 'Cultural Computing & 3D Web',
    sub: 'Pusaka Dayak bertemu Three.js',
    icon: Sparkles
  }
];

// Gateways to Dedicated Multi-Page Routes
const portalLinks = [
  {
    id: 'karya',
    name: 'Karya Terpilih',
    badge: '8+ Platform Live',
    desc: 'Eksplorasi platform web produksi berkecepatan tinggi yang telah mengudara.',
    accent: '#684AFF',
    btnText: 'Buka Halaman Karya'
  },
  {
    id: 'milestone-3d',
    name: 'Milestone 3D & Arcade',
    badge: 'WebGL Interactive',
    desc: 'Jelajahi linimasa evolusi teknologi 3D dan mainkan game Cyber Arcade rahasia.',
    accent: '#0284C7',
    btnText: 'Masuk Halaman Milestone'
  },
  {
    id: 'kapabilitas',
    name: 'Kapabilitas & Spek',
    badge: 'Tech Specs 100/100',
    desc: 'Daftar tuntas instrumen rekayasa, standar arsitektur, dan benchmark performa.',
    accent: '#D97706',
    btnText: 'Lihat Spesifikasi'
  },
  {
    id: 'kontak',
    name: 'Mulai Kolaborasi',
    badge: 'Terbuka untuk Diskusi',
    desc: 'Konsultasikan ide proyek, kerja sama arsitektur web, atau diskusi kreatif.',
    accent: '#10B981',
    btnText: 'Hubungi Luigi'
  }
];

export default function IntroductionJourney({ onNavigate }) {
  const [activePilar, setActivePilar] = useState(0);

  return (
    <article
      id="introduction-story"
      aria-label="Perjalanan Perkenalan dan Filosofi Luigi Iram Rangi"
      className="relative w-full bg-transparent text-[#111111] overflow-hidden border-t border-[#111111]/15"
    >
      {/* Background Subtle Ambient Gradients */}
      <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] bg-[#684AFF]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-[45%] right-[-10%] w-[600px] h-[600px] bg-[#D97706]/6 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[15%] left-[20%] w-[550px] h-[550px] bg-[#0284C7]/5 rounded-full blur-[140px] pointer-events-none" />

      {/* ───────────────── CHAPTER 1: MANIFESTO & FILOSOFI ───────────────── */}
      <section className="relative w-full px-6 md:px-12 lg:px-20 pt-20 md:pt-28 pb-16 md:pb-24 border-b border-[#111111]/10">
        
        {/* Section Index Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-2 mb-8 md:mb-12"
        >
          <div className="flex items-center justify-between text-[10px] md:text-xs font-mono tracking-[0.25em] uppercase text-[#111111]/60">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#684AFF]" />
              <span className="font-bold text-[#111111]">01 // MANIFESTO &amp; AKAR BUDAYA</span>
            </div>
            <div className="hidden sm:flex items-center gap-3">
              <span>BORNEO GROUNDED</span>
              <span>•</span>
              <span>GLOBAL RECEPTIVE</span>
            </div>
            <span className="text-[#111111] font-semibold">PONTIANAK, KALBAR</span>
          </div>
          <DayakBorderRibbon className="w-full h-2.5" color="#111111" opacity={0.2} />
        </motion.div>

        {/* Big Impact Statement */}
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="font-sans font-black text-3xl sm:text-5xl md:text-6xl lg:text-7xl uppercase tracking-[-0.03em] leading-[1.02] text-[#111111] mb-8"
          >
            <span>KAMI TIDAK HANYA MENULIS KODE, </span>
            <br className="hidden md:block" />
            <span className="text-[#684AFF]">KAMI MERAWAT IDENTITAS </span>
            <span>DI SETIAP DIMENSI DIGITAL.</span>
          </motion.h2>

          {/* Narrative & Seal Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start pt-4">
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: 0.15, duration: 0.7 }}
              className="lg:col-span-8 flex flex-col gap-6 text-[#111111]/80 font-sans text-base sm:text-lg leading-relaxed"
            >
              <p>
                Halo, saya <strong className="text-[#111111] font-bold">Luigi Iram Rangi</strong>. Saya seorang pengembang perangkat lunak berdarah <strong className="text-[#111111] font-bold">Dayak</strong> yang berbasis di garis khatulistiwa Kota Pontianak, Kalimantan Barat.
              </p>
              <p>
                Di tengah arus industri teknologi yang sering kali seragam dan mengesampingkan konteks lokal, saya memelopori pendekatan yang saya sebut sebagai <span className="inline-block px-2.5 py-0.5 rounded-md bg-[#684AFF]/10 text-[#684AFF] font-mono text-sm font-bold uppercase tracking-wider">Cultural Computing</span> — sebuah keyakinan bahwa filosofi ornamen ukir perisai Dayak, keseimbangan spasial hutan Borneo, dan nilai kekeluargaan komunal dapat berpadu harmonis dengan komputasi grafika 3D WebGL modern, arsitektur sistem nir-beban, serta performa web berkecepatan tinggi.
              </p>
              <p>
                Melalui studio yang saya dirikan, <strong className="text-[#111111]">Ddev Studio</strong>, serta keterlibatan aktif dalam inisiatif riset dan konservasi di <strong className="text-[#111111]">Borneo Globe</strong>, karya-karya yang saya rancang ditujukan untuk membuktikan bahwa karya dari pelosok khatulistiwa mampu bersaing dengan standar teknologi terbaik dunia tanpa kehilangan akar tradisinya.
              </p>
            </motion.div>

            {/* Cultural Seal Visual Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="lg:col-span-4 bg-white/80 backdrop-blur-md border border-[#111111]/10 rounded-2xl p-6 sm:p-8 flex flex-col items-center text-center shadow-lg relative group"
            >
              <DayakCornerAccent position="top-right" className="absolute top-3 right-3 w-4 h-4 text-[#D97706]" />
              <DayakCornerAccent position="bottom-left" className="absolute bottom-3 left-3 w-4 h-4 text-[#684AFF]" />

              <div className="my-3">
                <DayakCulturalSeal className="w-28 h-28" animated={true} />
              </div>

              <span className="font-sans font-bold text-lg text-[#111111] mt-4 uppercase tracking-tight">
                Luigi Iram Rangi
              </span>
              <span className="font-mono text-xs uppercase tracking-widest text-[#684AFF] font-bold mt-1">
                Founder &amp; Creative Dev
              </span>
              <p className="font-mono text-[11px] text-[#111111]/50 mt-3 leading-relaxed">
                Menghubungkan kearifan lokal Borneo dengan masa depan Web 3D &amp; High-Velocity Engineering.
              </p>

              <div className="w-full mt-6 pt-4 border-t border-[#111111]/10 flex items-center justify-between font-mono text-[10px] text-[#111111]/60">
                <span>EST. 2023</span>
                <span>•</span>
                <span>KALBAR, INDONESIA</span>
              </div>
            </motion.div>

          </div>
        </div>

      </section>

      {/* ───────────────── CHAPTER 2: TIGA PILAR DIRI ───────────────── */}
      <section className="relative w-full px-6 md:px-12 lg:px-20 py-20 md:py-28 border-b border-[#111111]/10 bg-white/20 backdrop-blur-[2px]">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-2 mb-12 max-w-6xl mx-auto"
        >
          <div className="flex items-center gap-3 text-[10px] md:text-xs font-mono tracking-[0.25em] uppercase text-[#111111]/60">
            <span className="w-2 h-2 rounded-full bg-[#0284C7]" />
            <span className="font-bold text-[#111111]">02 // TIGA PILAR EKSPLORASI DIRI</span>
          </div>
          <h3 className="font-sans font-black text-2xl sm:text-4xl md:text-5xl uppercase tracking-tight text-[#111111] mt-1">
            DIMENSI REKAYASA &amp; KREASI
          </h3>
          <p className="font-sans text-sm sm:text-base text-[#111111]/60 max-w-2xl mt-1">
            Tiga aspek fundamental yang membentuk karakter, kapabilitas teknis, dan arah karya Luigi Iram Rangi dalam lanskap digital modern.
          </p>
        </motion.div>

        {/* Interactive 3-Pillar Deck */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {pillars.map((p, idx) => {
            const Icon = p.icon;
            const isHovered = activePilar === idx;

            return (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: idx * 0.15, duration: 0.6 }}
                onMouseEnter={() => setActivePilar(idx)}
                className={`relative flex flex-col justify-between p-7 sm:p-8 rounded-3xl transition-all duration-300 border cursor-pointer ${
                  isHovered
                    ? 'bg-[#111111] text-[#EDEEF0] shadow-2xl border-[#111111] -translate-y-2'
                    : 'bg-white/90 text-[#111111] border-[#111111]/10 hover:border-[#111111]/30 shadow-md'
                }`}
              >
                {/* Top Badge & Number */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span
                      className={`font-mono text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full ${
                        isHovered
                          ? 'bg-white/10 text-white'
                          : 'bg-[#111111]/5 text-[#111111]/80'
                      }`}
                    >
                      {p.num} // {p.badge}
                    </span>
                    <div
                      className="w-10 h-10 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110"
                      style={{
                        backgroundColor: isHovered ? p.accent : `${p.accent}15`,
                        color: isHovered ? '#FFFFFF' : p.accent
                      }}
                    >
                      <Icon className="w-5 h-5" aria-hidden="true" />
                    </div>
                  </div>

                  <span
                    className={`block font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-semibold mb-2 ${
                      isHovered ? 'text-white/60' : 'text-[#111111]/50'
                    }`}
                  >
                    {p.category}
                  </span>

                  <h4 className="font-sans font-black text-xl sm:text-2xl uppercase tracking-tight leading-snug mb-3">
                    {p.title}
                  </h4>

                  <p
                    className={`font-sans text-xs sm:text-sm font-medium leading-relaxed mb-4 ${
                      isHovered ? 'text-white/80' : 'text-[#111111]/70'
                    }`}
                  >
                    {p.lead}
                  </p>

                  <p
                    className={`font-sans text-xs leading-relaxed mb-6 ${
                      isHovered ? 'text-white/60' : 'text-[#111111]/55'
                    }`}
                  >
                    {p.description}
                  </p>
                </div>

                {/* Highlights List */}
                <div
                  className={`pt-5 border-t flex flex-col gap-2.5 ${
                    isHovered ? 'border-white/15' : 'border-[#111111]/10'
                  }`}
                >
                  <span
                    className={`font-mono text-[10px] uppercase tracking-widest font-bold ${
                      isHovered ? 'text-white/40' : 'text-[#111111]/40'
                    }`}
                  >
                    Sorotan Utama:
                  </span>
                  {p.highlights.map((h) => (
                    <div key={h} className="flex items-center gap-2">
                      <CheckCircle2
                        className="w-3.5 h-3.5 shrink-0"
                        style={{ color: p.accent }}
                        aria-hidden="true"
                      />
                      <span
                        className={`font-sans text-xs font-semibold ${
                          isHovered ? 'text-white/90' : 'text-[#111111]/80'
                        }`}
                      >
                        {h}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

      </section>

      {/* ───────────────── CHAPTER 3: PRINSIP & ETOS KERJA ───────────────── */}
      <section className="relative w-full px-6 md:px-12 lg:px-20 py-20 md:py-28 border-b border-[#111111]/10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-2 mb-12 max-w-6xl mx-auto"
        >
          <div className="flex items-center gap-3 text-[10px] md:text-xs font-mono tracking-[0.25em] uppercase text-[#111111]/60">
            <span className="w-2 h-2 rounded-full bg-[#D97706]" />
            <span className="font-bold text-[#111111]">03 // PRINSIP &amp; ETOS REKAYASA</span>
          </div>
          <h3 className="font-sans font-black text-2xl sm:text-4xl md:text-5xl uppercase tracking-tight text-[#111111] mt-1">
            NILAI YANG SAYA PEGANG TEGUH
          </h3>
          <p className="font-sans text-sm sm:text-base text-[#111111]/60 max-w-2xl mt-1">
            Standar non-negosiasi dalam setiap arsitektur kode, visual grafis, maupun kolaborasi kemitraan yang saya bangun.
          </p>
        </motion.div>

        {/* Animated Principles Grid */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6">
          {principles.map((pr, idx) => (
            <motion.div
              key={pr.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="group p-6 sm:p-8 rounded-3xl bg-white/80 border border-[#111111]/10 hover:border-[#684AFF]/40 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-sm sm:text-base font-bold text-[#684AFF] tracking-widest">
                    [{pr.num}]
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full bg-[#111111]/5 text-[#111111]/70 font-semibold group-hover:bg-[#684AFF]/10 group-hover:text-[#684AFF] transition-colors">
                    {pr.tag}
                  </span>
                </div>

                <h4 className="font-sans font-bold text-lg sm:text-xl uppercase tracking-tight text-[#111111] group-hover:text-[#684AFF] transition-colors mb-2">
                  {pr.title}
                </h4>

                <p className="font-sans text-sm text-[#111111]/70 leading-relaxed font-normal">
                  {pr.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#111111]/5 flex items-center justify-end">
                <span className="font-mono text-[10px] text-[#111111]/40 uppercase tracking-widest flex items-center gap-1 group-hover:text-[#684AFF] transition-colors">
                  Standardized <Zap className="w-3 h-3 text-[#D97706]" />
                </span>
              </div>
            </motion.div>
          ))}
        </div>

      </section>

      {/* ───────────────── CHAPTER 4: PERSONA DI BALIK LAYAR ───────────────── */}
      <section className="relative w-full px-6 md:px-12 lg:px-20 py-20 md:py-28 border-b border-[#111111]/10 bg-white/20 backdrop-blur-[2px]">
        
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Narrative Column */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-6 flex flex-col gap-6"
            >
              <div className="flex items-center gap-3 text-[10px] md:text-xs font-mono tracking-[0.25em] uppercase text-[#111111]/60">
                <span className="w-2 h-2 rounded-full bg-[#10B981]" />
                <span className="font-bold text-[#111111]">04 // DI BALIK LAYAR &amp; PERSONA</span>
              </div>

              <h3 className="font-sans font-black text-2xl sm:text-4xl md:text-5xl uppercase tracking-tight text-[#111111] leading-tight">
                MANUSIA DI BALIK KUMPULAN SINTAKS.
              </h3>

              <p className="font-sans text-base text-[#111111]/70 leading-relaxed">
                Di luar penulisan kode dan kalkulasi matematis grafika, saya adalah seorang pembelajar seumur hidup yang gemar mengeksplorasi estetika retro game arcade, fiksi ilmiah cyberpunk, dan tradisi lisan Kalimantan Barat.
              </p>

              <p className="font-sans text-base text-[#111111]/70 leading-relaxed">
                Bagi saya, komputer dan layar bukanlah sekadar alat mekanis, melainkan kanvas modern di mana budaya, seni visual, dan rekayasa cerdas dapat bertemu untuk menyentuh kehidupan manusia secara positif.
              </p>

              <div className="flex items-center gap-3 pt-2">
                <span className="px-3 py-1.5 rounded-full bg-[#111111] text-white font-mono text-[10px] uppercase tracking-wider font-bold">
                  Dayak Technologist
                </span>
                <span className="px-3 py-1.5 rounded-full bg-[#684AFF]/10 text-[#684AFF] font-mono text-[10px] uppercase tracking-wider font-bold">
                  WebGL Artisan
                </span>
                <span className="px-3 py-1.5 rounded-full bg-[#10B981]/10 text-[#10B981] font-mono text-[10px] uppercase tracking-wider font-bold">
                  Available for High-End Projects
                </span>
              </div>
            </motion.div>

            {/* Right Tidbits Grid */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {personaDetails.map((item) => {
                const ItemIcon = item.icon;
                return (
                  <div
                    key={item.label}
                    className="p-5 rounded-2xl bg-white border border-[#111111]/10 hover:border-[#684AFF]/40 hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-mono text-[10px] uppercase tracking-wider text-[#111111]/50 font-bold">
                          {item.label}
                        </span>
                        <ItemIcon className="w-4 h-4 text-[#684AFF]" aria-hidden="true" />
                      </div>
                      <span className="font-sans font-bold text-base text-[#111111] block leading-tight">
                        {item.val}
                      </span>
                    </div>
                    <span className="font-mono text-[10px] text-[#111111]/60 mt-3 pt-2 border-t border-[#111111]/5 block">
                      {item.sub}
                    </span>
                  </div>
                );
              })}
            </motion.div>

          </div>
        </div>

      </section>

      {/* ───────────────── CHAPTER 5: GERBANG PENJELAJAHAN (NEXT STEPS) ───────────────── */}
      <section className="relative w-full px-6 md:px-12 lg:px-20 py-20 md:py-28">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center max-w-4xl mx-auto mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#111111] text-[#EDEEF0] font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em] mb-4">
            <Layers className="w-3.5 h-3.5 text-[#684AFF]" aria-hidden="true" />
            05 // PINTU GERBANG PENJELAJAHAN
          </div>
          <h3 className="font-sans font-black text-3xl sm:text-5xl md:text-6xl uppercase tracking-tight text-[#111111]">
            SIAP MELIHAT LEBIH JAUH?
          </h3>
          <p className="font-sans text-sm sm:text-base md:text-lg text-[#111111]/70 max-w-2xl mt-3">
            Setelah mengenal fondasi dan filosofi saya, telusuri karya nyata, instalasi 3D, instrumen teknologi, atau mulai diskusi proyek bersama.
          </p>
        </motion.div>

        {/* Portal Gateway Cards */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {portalLinks.map((p, idx) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="group p-6 rounded-3xl bg-white border border-[#111111]/10 hover:border-[#111111] hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <span
                  className="inline-block font-mono text-[9px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-full mb-4"
                  style={{ backgroundColor: `${p.accent}15`, color: p.accent }}
                >
                  {p.badge}
                </span>

                <h4 className="font-sans font-black text-xl uppercase tracking-tight text-[#111111] mb-2 group-hover:text-[#684AFF] transition-colors">
                  {p.name}
                </h4>

                <p className="font-sans text-xs text-[#111111]/60 leading-relaxed font-medium">
                  {p.desc}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-[#111111]/10">
                <button
                  onClick={() => onNavigate?.(p.id)}
                  className="w-full py-2.5 px-3 rounded-full bg-[#111111] text-white hover:bg-[#684AFF] transition-colors font-sans text-xs font-bold uppercase tracking-wider flex items-center justify-between cursor-pointer focus-visible:ring-2 focus-visible:ring-[#684AFF] focus-visible:outline-none"
                  aria-label={`Navigasi ke ${p.name}`}
                >
                  <span>{p.btnText}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Closing Seal */}
        <div className="max-w-6xl mx-auto mt-16 pt-8 border-t border-[#111111]/10 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-[#111111]/50">
          <div className="flex items-center gap-2">
            <DayakShieldEmblem className="w-4 h-4 text-[#D97706]" color="#D97706" />
            <span className="font-bold text-[#111111]">LUIGI IRAM RANGI // FOUNDER OF DDEV</span>
          </div>
          <div>
            <span>0°01′S 109°20′E • PONTIANAK, KALIMANTAN BARAT</span>
          </div>
          <div>
            <span>© {new Date().getFullYear()} ALL RIGHTS RESERVED</span>
          </div>
        </div>

      </section>

    </article>
  );
}
