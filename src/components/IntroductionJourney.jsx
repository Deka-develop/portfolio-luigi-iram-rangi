import { useState, useEffect } from 'react';
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
import {
  ScrollRevealWords,
  ScrollRevealParagraph,
  ScrollShuffleCard
} from './ScrollRevealText';

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
    name: 'Portfolio',
    badge: '8+ Platform Live',
    desc: 'Eksplorasi platform web produksi berkecepatan tinggi yang telah mengudara.',
    accent: '#684AFF',
    btnText: 'Buka Halaman Portfolio'
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

// Section list for the transition navigator
const sectionsNav = [
  { id: 'intro-hero', label: '00 // HERO' },
  { id: 'intro-manifesto', label: '01 // MANIFESTO' },
  { id: 'intro-pillars', label: '02 // TIGA PILAR' },
  { id: 'intro-ethos', label: '03 // ETOS & PERSONA' },
  { id: 'intro-gateway', label: '04 // GERBANG JELAJAH' }
];

export default function IntroductionJourney({ onNavigate }) {
  const [activePilar, setActivePilar] = useState(0);
  const [activeSectionId, setActiveSectionId] = useState('intro-hero');

  // Track active section via IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSectionId(entry.target.id);
          }
        });
      },
      { threshold: 0.2, rootMargin: '-10% 0px -10% 0px' }
    );

    sectionsNav.forEach((sec) => {
      const el = document.getElementById(sec.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <article
      id="introduction-story"
      aria-label="Perjalanan Perkenalan dan Filosofi Luigi Iram Rangi"
      className="relative w-full text-[#111111]"
    >
      {/* ───────────────── FLOATING SECTION TRANSITION NAVIGATOR ───────────────── */}
      <nav
        aria-label="Navigasi Transisi Section Beranda"
        className="fixed bottom-6 right-6 z-40 hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-black/10 shadow-xl text-[10px] font-mono tracking-wider"
      >
        <span className="text-[#111111]/40 text-[9px] uppercase font-bold pl-1 pr-1.5 border-r border-black/10">
          Transisi Section:
        </span>
        {sectionsNav.map((sec) => {
          const isActive = activeSectionId === sec.id;
          return (
            <button
              key={sec.id}
              onClick={() => scrollToSection(sec.id)}
              className={`px-2.5 py-1 rounded-full transition-all cursor-pointer font-bold ${
                isActive
                  ? 'bg-[#111111] text-white shadow-sm scale-105'
                  : 'text-[#111111]/60 hover:text-[#111111] hover:bg-black/5'
              }`}
              title={`Lompat ke ${sec.label}`}
            >
              {sec.label.split(' // ')[0]}
            </button>
          );
        })}
      </nav>

      {/* ───────────────── SECTION 1: MANIFESTO & FILOSOFI ───────────────── */}
      <section
        id="intro-manifesto"
        className="relative lg:sticky lg:top-0 min-h-screen w-full flex flex-col justify-center px-5 sm:px-8 md:px-12 lg:px-20 py-12 sm:py-16 lg:py-24 bg-[#E5E6E8] text-[#111111] border-t border-[#111111]/15 z-10 rounded-t-[28px] sm:rounded-t-[36px] shadow-[0_-18px_45px_rgba(0,0,0,0.12)]"
      >
        {/* Section Index Bar */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 'some' }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-2 mb-8 md:mb-12 max-w-6xl mx-auto w-full"
        >
          <div className="flex items-center justify-between text-[10px] md:text-xs font-mono tracking-[0.25em] uppercase text-[#111111]/60">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#684AFF] animate-pulse" />
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

        {/* Big Impact Statement with Scroll Kinetic Reveal */}
        <div className="max-w-6xl mx-auto w-full">
          <h2 className="font-sans font-black text-3xl sm:text-5xl md:text-6xl lg:text-7xl uppercase tracking-[-0.03em] leading-[1.04] text-[#111111] mb-8">
            <ScrollRevealWords delay={0.05}>
              KAMI TIDAK HANYA MENULIS KODE,
            </ScrollRevealWords>
            <br className="hidden md:block" />
            <ScrollRevealWords delay={0.2} className="text-[#684AFF]">
              KAMI MERAWAT IDENTITAS
            </ScrollRevealWords>{' '}
            <ScrollRevealWords delay={0.35}>
              DI SETIAP DIMENSI DIGITAL.
            </ScrollRevealWords>
          </h2>

          {/* Narrative & Seal Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start pt-4">
            
            <div className="lg:col-span-8 flex flex-col gap-6 text-[#111111]/80 font-sans text-base sm:text-lg leading-relaxed">
              <ScrollRevealParagraph delay={0.1} className="border-l-2 border-[#684AFF]/40 pl-4 py-0.5">
                <p>
                  Halo, saya <strong className="text-[#111111] font-bold">Luigi Iram Rangi</strong>. Saya seorang pengembang perangkat lunak berdarah <strong className="text-[#111111] font-bold">Dayak</strong> yang berbasis di garis khatulistiwa Kota Pontianak, Kalimantan Barat.
                </p>
              </ScrollRevealParagraph>

              <ScrollRevealParagraph delay={0.25} className="border-l-2 border-[#D97706]/40 pl-4 py-0.5">
                <p>
                  Di tengah arus industri teknologi yang sering kali seragam dan mengesampingkan konteks lokal, saya memelopori pendekatan yang saya sebut sebagai <span className="inline-block px-2.5 py-0.5 rounded-md bg-[#684AFF]/10 text-[#684AFF] font-mono text-sm font-bold uppercase tracking-wider">Cultural Computing</span> — sebuah keyakinan bahwa filosofi bunga terong, keseimbangan spasial hutan Borneo, dan nilai kekeluargaan komunal dapat berpadu harmonis dengan komputasi grafika 3D WebGL modern, arsitektur sistem nir-beban, serta performa web berkecepatan tinggi.
                </p>
              </ScrollRevealParagraph>

              <ScrollRevealParagraph delay={0.4} className="border-l-2 border-[#10B981]/40 pl-4 py-0.5">
                <p>
                  Melalui studio yang saya dirikan, <strong className="text-[#111111] font-bold">Ddev Studio</strong>, serta keterlibatan aktif dalam inisiatif riset dan konservasi di <strong className="text-[#111111] font-bold">Borneo Globe</strong>, karya-karya yang saya rancang ditujukan untuk membuktikan bahwa karya dari pelosok khatulistiwa mampu bersaing dengan standar teknologi terbaik dunia tanpa kehilangan akar tradisinya.
                </p>
              </ScrollRevealParagraph>
            </div>

            {/* Cultural Seal Visual Card with Tactile Scroll Shuffle Entrance */}
            <ScrollShuffleCard
              delay={0.25}
              rotate={2.0}
              className="lg:col-span-4 bg-white/95 backdrop-blur-md border border-[#111111]/10 rounded-2xl p-6 sm:p-8 flex flex-col items-center text-center shadow-lg relative group"
            >
              <DayakCornerAccent position="top-right" className="absolute top-3 right-3 w-4 h-4 text-[#D97706]" />
              <DayakCornerAccent position="bottom-left" className="absolute bottom-3 left-3 w-4 h-4 text-[#684AFF]" />

              <div className="my-3">
                <DayakCulturalSeal className="w-28 h-28" animated={true} />
              </div>

              <ScrollRevealWords as="span" delay={0.4} className="font-sans font-bold text-lg text-[#111111] mt-4 uppercase tracking-tight">
                Luigi Iram Rangi
              </ScrollRevealWords>
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
            </ScrollShuffleCard>

          </div>
        </div>
      </section>

      {/* ───────────────── SECTION 2: TIGA PILAR DIRI ───────────────── */}
      <section
        id="intro-pillars"
        className="relative lg:sticky lg:top-0 min-h-screen w-full flex flex-col justify-center px-5 sm:px-8 md:px-12 lg:px-20 py-12 sm:py-16 lg:py-24 bg-[#EDEEF0] text-[#111111] border-t border-[#111111]/15 z-20 rounded-t-[28px] sm:rounded-t-[36px] shadow-[0_-25px_60px_rgba(0,0,0,0.18)] -mt-6 sm:-mt-8 lg:mt-0"
      >
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 'some' }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-2 mb-10 max-w-6xl mx-auto w-full"
        >
          <div className="flex items-center gap-3 text-[10px] md:text-xs font-mono tracking-[0.25em] uppercase text-[#111111]/60">
            <span className="w-2 h-2 rounded-full bg-[#0284C7] animate-pulse" />
            <span className="font-bold text-[#111111]">02 // TIGA PILAR EKSPLORASI DIRI</span>
          </div>
          <ScrollRevealWords
            as="h3"
            delay={0.1}
            className="font-sans font-black text-2xl sm:text-4xl md:text-5xl uppercase tracking-tight text-[#111111] mt-1"
          >
            DIMENSI REKAYASA &amp; KREASI
          </ScrollRevealWords>
          <ScrollRevealParagraph delay={0.2}>
            <p className="font-sans text-sm sm:text-base text-[#111111]/60 max-w-2xl mt-1">
              Tiga aspek fundamental yang membentuk karakter, kapabilitas teknis, dan arah karya Luigi Iram Rangi dalam lanskap digital modern.
            </p>
          </ScrollRevealParagraph>
        </motion.div>

        {/* Interactive 3-Pillar Deck with Card Shuffle Deal Entrance */}
        <div className="max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {pillars.map((p, idx) => {
            const Icon = p.icon;
            const isHovered = activePilar === idx;
            const cardRotate = idx === 0 ? -2.2 : idx === 1 ? 0 : 2.2;

            return (
              <ScrollShuffleCard
                key={p.id}
                delay={idx * 0.12}
                rotate={cardRotate}
                index={idx}
                total={pillars.length}
                onMouseEnter={() => setActivePilar(idx)}
                className={`relative flex flex-col justify-between p-7 sm:p-8 rounded-3xl transition-all duration-300 border cursor-pointer ${
                  isHovered
                    ? 'bg-[#111111] text-[#EDEEF0] shadow-2xl border-[#111111] -translate-y-2'
                    : 'bg-white text-[#111111] border-[#111111]/10 hover:border-[#111111]/30 shadow-md'
                }`}
              >
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

                  <ScrollRevealWords
                    as="h4"
                    delay={0.06 + idx * 0.08}
                    className="font-sans font-black text-xl sm:text-2xl uppercase tracking-tight leading-snug mb-3"
                  >
                    {p.title}
                  </ScrollRevealWords>

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
              </ScrollShuffleCard>
            );
          })}
        </div>
      </section>

      {/* ───────────────── SECTION 3: PRINSIP & PERSONA ───────────────── */}
      <section
        id="intro-ethos"
        className="relative lg:sticky lg:top-0 min-h-screen w-full flex flex-col justify-center px-5 sm:px-8 md:px-12 lg:px-20 py-12 sm:py-16 lg:py-24 bg-[#E8E9EC] text-[#111111] border-t border-[#111111]/15 z-30 rounded-t-[28px] sm:rounded-t-[36px] shadow-[0_-30px_70px_rgba(0,0,0,0.22)] -mt-6 sm:-mt-8 lg:mt-0"
      >
        <div className="max-w-6xl mx-auto w-full">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 'some' }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-2 mb-10"
          >
            <div className="flex items-center gap-3 text-[10px] md:text-xs font-mono tracking-[0.25em] uppercase text-[#111111]/60">
              <span className="w-2 h-2 rounded-full bg-[#D97706] animate-pulse" />
              <span className="font-bold text-[#111111]">03 // PRINSIP &amp; PERSONA DI BALIK LAYAR</span>
            </div>
            <ScrollRevealWords
              as="h3"
              delay={0.1}
              className="font-sans font-black text-2xl sm:text-4xl md:text-5xl uppercase tracking-tight text-[#111111] mt-1"
            >
              NILAI YANG SAYA PEGANG TEGUH
            </ScrollRevealWords>
            <ScrollRevealParagraph delay={0.2}>
              <p className="font-sans text-sm sm:text-base text-[#111111]/60 max-w-2xl mt-1">
                Standar arsitektur kode dan sisi manusiawi di balik layar Luigi Iram Rangi.
              </p>
            </ScrollRevealParagraph>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: 4 Work Principles with Scroll Shuffle Entrance */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {principles.map((pr, idx) => (
                <ScrollShuffleCard
                  key={pr.num}
                  delay={idx * 0.08}
                  rotate={idx % 2 === 0 ? -1.5 : 1.5}
                  index={idx}
                  total={principles.length}
                  className="group p-5 rounded-2xl bg-white border border-[#111111]/10 hover:border-[#684AFF]/40 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-mono text-xs font-bold text-[#684AFF] tracking-widest">
                        [{pr.num}]
                      </span>
                      <span className="font-mono text-[9px] uppercase tracking-widest px-2 py-0.5 rounded-full bg-[#111111]/5 text-[#111111]/70 font-semibold group-hover:bg-[#684AFF]/10 group-hover:text-[#684AFF] transition-colors">
                        {pr.tag}
                      </span>
                    </div>

                    <ScrollRevealWords
                      as="h4"
                      delay={0.05 + idx * 0.08}
                      className="font-sans font-bold text-sm sm:text-base uppercase tracking-tight text-[#111111] group-hover:text-[#684AFF] transition-colors mb-1.5 leading-snug"
                    >
                      {pr.title}
                    </ScrollRevealWords>

                    <p className="font-sans text-xs text-[#111111]/70 leading-relaxed font-normal">
                      {pr.desc}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#111111]/5 flex items-center justify-end">
                    <span className="font-mono text-[9px] text-[#111111]/40 uppercase tracking-widest flex items-center gap-1 group-hover:text-[#684AFF] transition-colors">
                      Standardized <Zap className="w-2.5 h-2.5 text-[#D97706]" />
                    </span>
                  </div>
                </ScrollShuffleCard>
              ))}
            </div>

            {/* Right Column: Persona Tidbits with Scroll Shuffle Cascade */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {personaDetails.map((item, idx) => {
                  const ItemIcon = item.icon;
                  return (
                    <ScrollShuffleCard
                      key={item.label}
                      delay={0.1 + idx * 0.08}
                      rotate={idx % 2 === 0 ? 1.5 : -1.5}
                      index={idx}
                      total={personaDetails.length}
                      className="p-5 rounded-2xl bg-white border border-[#111111]/10 hover:border-[#684AFF]/40 hover:shadow-md transition-all flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-mono text-[9px] uppercase tracking-wider text-[#111111]/50 font-bold">
                            {item.label}
                          </span>
                          <ItemIcon className="w-4 h-4 text-[#684AFF]" aria-hidden="true" />
                        </div>
                        <span className="font-sans font-bold text-sm text-[#111111] block leading-tight">
                          {item.val}
                        </span>
                      </div>
                      <span className="font-mono text-[10px] text-[#111111]/60 mt-2.5 pt-2 border-t border-[#111111]/5 block">
                        {item.sub}
                      </span>
                    </ScrollShuffleCard>
                  );
                })}
              </div>

              <ScrollRevealParagraph delay={0.4} className="p-5 rounded-2xl bg-white/70 border border-[#111111]/10 font-sans text-xs text-[#111111]/70 leading-relaxed">
                <p>
                  Bagi saya, layar komputer adalah kanvas digital khatulistiwa tempat nilai luhur Borneo dapat diekspresikan kembali dalam estetika modern berstandar dunia.
                </p>
              </ScrollRevealParagraph>
            </div>

          </div>
        </div>
      </section>

      {/* ───────────────── SECTION 4: PINTU GERBANG PENJELAJAHAN ───────────────── */}
      <section
        id="intro-gateway"
        className="relative lg:sticky lg:top-0 min-h-screen w-full flex flex-col justify-center px-5 sm:px-8 md:px-12 lg:px-20 py-12 sm:py-16 lg:py-24 bg-[#111111] text-[#EDEEF0] border-t border-white/20 z-40 rounded-t-[28px] sm:rounded-t-[36px] shadow-[0_-38px_85px_rgba(0,0,0,0.45)] -mt-6 sm:-mt-8 lg:mt-0"
      >
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 'some' }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center text-center max-w-4xl mx-auto mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-[#EDEEF0] font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em] mb-4 border border-white/10">
            <Layers className="w-3.5 h-3.5 text-[#684AFF]" aria-hidden="true" />
            04 // PINTU GERBANG PENJELAJAHAN
          </div>
          <ScrollRevealWords
            as="h3"
            delay={0.1}
            className="font-sans font-black text-3xl sm:text-5xl md:text-6xl uppercase tracking-tight text-white"
          >
            SIAP MELIHAT LEBIH JAUH?
          </ScrollRevealWords>
          <ScrollRevealParagraph delay={0.25}>
            <p className="font-sans text-sm sm:text-base md:text-lg text-white/70 max-w-2xl mt-3">
              Setelah mengenal fondasi dan filosofi saya, telusuri karya nyata, instalasi 3D, instrumen teknologi, atau mulai diskusi proyek bersama.
            </p>
          </ScrollRevealParagraph>
        </motion.div>

        {/* Portal Gateway Cards with Fanning Card Shuffle Entrance */}
        <div className="max-w-6xl mx-auto w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {portalLinks.map((p, idx) => {
            const cardRotate = idx === 0 ? -2.0 : idx === 1 ? -0.7 : idx === 2 ? 0.7 : 2.0;

            return (
              <ScrollShuffleCard
                key={p.id}
                delay={idx * 0.09}
                rotate={cardRotate}
                index={idx}
                total={portalLinks.length}
                className="group p-6 rounded-3xl bg-[#1A1A1A] border border-white/10 hover:border-[#684AFF] hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <span
                    className="inline-block font-mono text-[9px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-full mb-4"
                    style={{ backgroundColor: `${p.accent}20`, color: p.accent }}
                  >
                    {p.badge}
                  </span>

                  <ScrollRevealWords
                    as="h4"
                    delay={0.05 + idx * 0.08}
                    className="font-sans font-black text-xl uppercase tracking-tight text-white mb-2 group-hover:text-[#684AFF] transition-colors"
                  >
                    {p.name}
                  </ScrollRevealWords>

                  <p className="font-sans text-xs text-white/60 leading-relaxed font-medium">
                    {p.desc}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-white/10">
                  <button
                    onClick={() => onNavigate?.(p.id)}
                    className="w-full py-2.5 px-3 rounded-full bg-white text-[#111111] hover:bg-[#684AFF] hover:text-white transition-colors font-sans text-xs font-bold uppercase tracking-wider flex items-center justify-between cursor-pointer focus-visible:ring-2 focus-visible:ring-[#684AFF] focus-visible:outline-none"
                    aria-label={`Navigasi ke ${p.name}`}
                  >
                    <span>{p.btnText}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                  </button>
                </div>
              </ScrollShuffleCard>
            );
          })}
        </div>

        {/* Bottom Closing Seal */}
        <div className="max-w-6xl mx-auto w-full mt-14 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-white/50">
          <div className="flex items-center gap-2">
            <DayakShieldEmblem className="w-4 h-4 text-[#D97706]" color="#D97706" />
            <span className="font-bold text-white">LUIGI IRAM RANGI // FOUNDER OF DDEV</span>
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
