import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, ExternalLink, Sparkles, Layers, ShieldCheck, Zap, Globe, Lock, X, CheckCircle2 } from 'lucide-react';

import borneoGlobeImg from '../assets/projects/borneo-globe.webp';
import anyarmartImg from '../assets/projects/anyarmart.webp';
import bukuDayakImg from '../assets/projects/buku-dayak.webp';
import pancaPalmaTropikaImg from '../assets/projects/panca-palma-tropika.webp';
import iknTimeImg from '../assets/projects/ikn-time.webp';
import indotribuneImg from '../assets/projects/indotribune.webp';
import bebasJerawatImg from '../assets/projects/bebas-jerawat.webp';
import alexanderMeringImg from '../assets/projects/alexander-mering.webp';

const projects = [
  {
    id: 'borneo-globe',
    num: '01',
    title: 'Borneo Globe',
    subtitle: 'Connecting Futures — From Local Roots to Global Reach',
    category: 'Digital Impact Platform',
    role: 'Active Role',
    status: 'CURRENTLY ENGAGED',
    statusColor: 'emerald',
    year: '2025 - Present',
    url: 'https://www.borneoglobe.org/',
    image: borneoGlobeImg,
    glow: 'from-blue-600/20 via-teal-500/15 to-transparent',
    accentColor: '#38bdf8',
    highlightMetric: '1,840+ Beneficiaries',
    description: 'Platform digital resmi Borneo Globe (borneoglobe.org) dengan visi "From Local Roots to Global Reach". Memberdayakan bisnis dan komunitas lokal dengan strategi digital pintar, pelatihan terarah, dan koneksi global berkelanjutan.',
    tech: ['Web Platform', 'Digital Strategy', 'Global Reach', 'Impact Ecosystem'],
    caseStudy: {
      client: 'Borneo Globe Regional Initiative',
      location: 'West Borneo, Indonesia',
      challenge: 'Membangun jembatan digital antara inisiatif pulau Borneo dengan mitra dan peneliti internasional melalui platform yang cepat, kredibel, dan ramah koneksi pelosok.',
      solution: 'Arsitektur web berbasis data regional dengan visualisasi infografis dinamis, UI ramah lingkungan, optimasi aset ringan, dan pemuatan tanpa lag di seluruh perangkat.',
      metrics: [
        { label: 'Beneficiaries', val: '1,840+' },
        { label: 'Accessibility', val: '100% Mobile Ready' },
        { label: 'Regional Reach', val: 'Borneo Active' }
      ],
      deliverables: ['Official Web Platform', 'Regional Impact Ecosystem', 'Cross-Device Architecture']
    }
  },
  {
    id: 'anyarmart',
    num: '02',
    title: 'Anyarmart',
    subtitle: 'Toko Online & Marketplace Buku, Kerajinan & Karya Khas Nusantara',
    category: 'E-Commerce Platform',
    role: 'Lead E-Commerce Architect',
    status: 'PRODUCTION LIVE',
    statusColor: 'cyan',
    year: '2025 - Present',
    url: 'https://www.anyarmart.com/',
    image: anyarmartImg,
    glow: 'from-cyan-500/20 via-blue-600/15 to-transparent',
    accentColor: '#00f0ff',
    highlightMetric: 'Nusantara Marketplace',
    description: 'Platform toko online dan digital bookstore independen nusantara. Menghadirkan katalog literatur budaya Dayak, riset kelapa sawit, novel sastra, lukisan etnik, hingga kerajinan khas Borneo dengan pengalaman belanja yang intuitif.',
    tech: ['E-Commerce Engine', 'Digital Catalog System', 'Payhip Checkout', 'Conversion CRO'],
    caseStudy: {
      client: 'Anyarmart Nusantara (anyarmart.com)',
      location: 'Borneo & Seluruh Indonesia',
      challenge: 'Membangun etalase e-commerce independen untuk produk literatur, ebook, dan kerajinan khas nusantara dengan navigasi katalog responsif, dark mode elegan, serta alur checkout cepat di seluruh perangkat.',
      solution: 'Arsitektur storefront modern berorientasi konversi dengan fitur multi-kategori (Buku, T-Shirt, Ebook, Lukisan), integrasi gateway checkout instan, showcase 3D book mockup, dan optimasi aset berkecepatan tinggi.',
      metrics: [
        { label: 'Katalog Produk', val: 'Buku & Etnik' },
        { label: 'Sistem Belanja', val: 'Instant Checkout' },
        { label: 'Pemuatan Laman', val: '< 0.8s' }
      ],
      deliverables: ['E-Commerce Digital Storefront', 'Integrated Payment Engine', 'Mobile-First Catalog UX']
    }
  },
  {
    id: 'buku-dayak',
    num: '03',
    title: 'Buku Dayak',
    subtitle: 'Pusat Koleksi Buku, Sejarah Borneo & Literasi Budaya Dayak',
    category: 'Cultural Literacy & Archive',
    role: 'Lead Web Architect',
    status: 'PRODUCTION LIVE',
    statusColor: 'blue',
    year: '2025 - Present',
    url: 'https://www.bukudayak.com/',
    image: bukuDayakImg,
    glow: 'from-blue-600/25 via-indigo-600/15 to-transparent',
    accentColor: '#3b82f6',
    highlightMetric: 'Borneo Heritage Archive',
    description: 'Platform literasi digital dan arsip kebudayaan terlengkap seputar suku Dayak dan sejarah pulau Kalimantan. Menghadirkan katalog buku cetak, edisi hybrid, e-book ilmiah, dan dokumentasi adat istiadat leluhur Borneo.',
    tech: ['Literacy Portal Engine', 'Digital Catalog & E-Book', 'Bilingual Support (ID/EN)', 'Cultural Archive UX'],
    caseStudy: {
      client: 'BukuDayak.com Cultural Initiative',
      location: 'Kalimantan Barat & Borneo Wide',
      challenge: 'Mendigitalkan dan melestarikan warisan literatur budaya Dayak dalam satu gerbang terpadu yang ramah pembaca lintas generasi, mudah diakses peneliti global, dan memiliki katalog multi-format.',
      solution: 'Arsitektur portal literasi budaya berkinerja tinggi dengan tipografi kurasi Outfit & Plus Jakarta Sans, sistem klasifikasi multi-format (Cetak, Ebook, Hybrid), fitur pencarian instan, dan alur belanja terstruktur.',
      metrics: [
        { label: 'Koleksi Literasi', val: 'Sejarah & Adat' },
        { label: 'Format Buku', val: 'Cetak & Ebook' },
        { label: 'Pemuatan Laman', val: '< 0.8s' }
      ],
      deliverables: ['Cultural Heritage Web Platform', 'Multi-Format Book Engine', 'Bilingual ID/EN Catalog Architecture']
    }
  },
  {
    id: 'panca-palma-tropika',
    num: '04',
    title: 'Panca Palma Tropika',
    subtitle: 'Sustainable Tropical Landscape & Agroforestry Platform',
    category: 'Environmental NGO',
    role: 'UI/UX & Web Engineer',
    status: 'PRODUCTION LIVE',
    statusColor: 'emerald',
    year: '2025 - Present',
    url: 'https://www.pancapalmatropika.org/',
    image: pancaPalmaTropikaImg,
    glow: 'from-emerald-600/25 via-teal-600/15 to-transparent',
    accentColor: '#10b981',
    highlightMetric: '2,800+ Beneficiaries',
    description: 'Platform digital resmi Yayasan Panca Palma Tropika (pancapalmatropika.org) untuk konservasi lanskap tropis berkelanjutan melalui sains multidisiplin, riset agroforestri, dan pemberdayaan masyarakat lokal di kepulauan Indonesia.',
    tech: ['Environmental NGO', 'Bilingual ID/EN', 'Agroforestry Data', 'Impact Ecosystem'],
    caseStudy: {
      client: 'Yayasan Panca Palma Tropika (YPPT)',
      location: 'Kalimantan Barat, Indonesia',
      challenge: 'Mempublikasikan riset multidisiplin dan inisiatif ekologis tropis kepada donor, peneliti internasional, dan masyarakat lokal dengan antarmuka elegan, kredibel, dan ramah multibahasa.',
      solution: 'Desain platform modern bertema lanskap tropis dengan tipografi editorial Libre Caslon Text, arsitektur dwibahasa (ID/EN), dark mode dinamis, dan showcase infografis dampak terukur.',
      metrics: [
        { label: 'Penerima Manfaat', val: '2,800+' },
        { label: 'Titik Intervensi', val: '48+ Lokasi' },
        { label: 'Publikasi & Riset', val: '108+ Dokumen' }
      ],
      deliverables: ['Official NGO Web Platform', 'Bilingual Multilingual Engine', 'Interactive Impact Showcase']
    }
  },
  {
    id: 'ikn-time',
    num: '05',
    title: 'IKN TIME',
    subtitle: 'Jaringan Berita & Media Informasi Ibu Kota Nusantara & Borneo',
    category: 'Digital News Network',
    role: 'Media Platform Architect',
    status: 'PRODUCTION LIVE',
    statusColor: 'amber',
    year: '2025 - Present',
    url: 'https://www.ikntime.com/',
    image: iknTimeImg,
    glow: 'from-amber-500/25 via-orange-600/15 to-transparent',
    accentColor: '#f59e0b',
    highlightMetric: 'Borneo News Portal',
    description: 'Portal media berita digital dan jaringan informasi independen seputar Ibu Kota Nusantara (IKN) dan pulau Borneo. Menghadirkan liputan komprehensif smart city, megaproyek infrastruktur, investasi, ekonomi, dan dinamika sosial budaya.',
    tech: ['Digital News Portal', 'High-Traffic Architecture', 'SEO Schema', 'AdSense Optimized'],
    caseStudy: {
      client: 'IKN TIME Media Network (ikntime.com)',
      location: 'Nusantara & Borneo Active',
      challenge: 'Membangun portal berita digital dengan arus pembaruan tinggi (breaking news) seputar megaproyek IKN, tetap responsif diakses ribuan pembaca serentak, serta terindeks optimal di Google News.',
      solution: 'Arsitektur web publikasi dinamis berkecepatan tinggi dengan optimasi Core Web Vitals, penataan slot periklanan non-intrusif & non-blocking, serta struktur kategori berita interaktif.',
      metrics: [
        { label: 'Jangkauan Berita', val: 'IKN & Borneo' },
        { label: 'Indeks Berita', val: 'Google News' },
        { label: 'Pemuatan Laman', val: '< 0.8s' }
      ],
      deliverables: ['Digital News Portal Engine', 'AdSense Optimized Structure', 'High-Speed Breaking News Feed']
    }
  },
  {
    id: 'indotribune',
    num: '06',
    title: 'INDOTRIBUNE',
    subtitle: 'Portal Berita Nasional, Politik, Ekonomi & Jurnal Indonesia',
    category: 'Digital Media & Journalism',
    role: 'Editorial & Web Architect',
    status: 'PRODUCTION LIVE',
    statusColor: 'rose',
    year: '2025 - Present',
    url: 'https://www.indotribune.com/',
    image: indotribuneImg,
    glow: 'from-rose-500/25 via-red-600/15 to-transparent',
    accentColor: '#f43f5e',
    highlightMetric: 'National News Network',
    description: 'Portal berita independen nasional menyajikan liputan peristiwa politik, pergerakan IHSG & pasar modal, kebijakan publik, ketenagakerjaan, olahraga internasional, dan opini mendalam secara real-time.',
    tech: ['News Portal Engine', 'High-Traffic Architecture', 'Google AdSense Ready', 'Instant CDN'],
    caseStudy: {
      client: 'INDOTRIBUNE Media Network (indotribune.com)',
      location: 'Jakarta & Nusantara Wide',
      challenge: 'Mengakomodasi lonjakan pembaca masif pada breaking news nasional dan pergerakan bursa, mempertahankan skor Core Web Vitals tinggi di tengah integrasi periklanan Google AdSense, serta indexing cepat.',
      solution: 'Engine portal berita ultra-ringan dengan pipeline cache CDN, optimasi skrip iklan non-blocking asinkron, format artikel clean-reader, serta integrasi RSS/Atom feed Google News.',
      metrics: [
        { label: 'Jangkauan Berita', val: 'Nasional RI' },
        { label: 'Indeks Berita', val: 'Google News' },
        { label: 'Pemuatan Laman', val: '< 0.7s' }
      ],
      deliverables: ['High-Performance Media Engine', 'Non-Blocking AdSense Architecture', 'Multi-Category News Taxonomy']
    }
  },
  {
    id: 'bebas-jerawat',
    num: '07',
    title: 'Bebas Jerawat',
    subtitle: 'Pusat Edukasi Dermatologi, Solusi Skincare & Literasi Kesehatan Kulit',
    category: 'Health & Dermatology Media',
    role: 'Lead Web Architect',
    status: 'PRODUCTION LIVE',
    statusColor: 'orange',
    year: '2025 - Present',
    url: 'https://www.bebasjerawat.id/',
    image: bebasJerawatImg,
    glow: 'from-orange-500/25 via-amber-600/15 to-transparent',
    accentColor: '#fb923c',
    highlightMetric: 'Dermatology Portal',
    description: 'Portal edukasi kesehatan kulit dan kurasi literatur dermatologi terpercaya di Indonesia. Menghadirkan panduan komprehensif penanganan jerawat, ulasan klinis bahan aktif skincare, serta rilis buku & jurnal perawatan kulit ilmiah.',
    tech: ['Health Portal Engine', 'Editorial CMS', 'Dermatology Schema', 'Mobile-First UX'],
    caseStudy: {
      client: 'BebasJerawat.id Health Network',
      location: 'Indonesia Active',
      challenge: 'Menyajikan informasi dermatologi dan panduan kesehatan kulit yang kredibel dengan gaya visual editorial elegan, navigasi artikel yang mudah dipahami publik awam, dan pemuatan super cepat.',
      solution: 'Arsitektur portal kesehatan berbasis konten editorial dengan palet earth-tone menenangkan, integrasi dark/light mode otomatis, direktori rilis buku kesehatan, serta optimasi SEO Schema medis/edukasi.',
      metrics: [
        { label: 'Fokus Edukasi', val: 'Dermatologi' },
        { label: 'Format Konten', val: 'Buku & Jurnal' },
        { label: 'Pemuatan Laman', val: '< 0.7s' }
      ],
      deliverables: ['Health & Wellness Web Portal', 'Editorial Publishing Engine', 'Responsive Clinical Directory']
    }
  },
  {
    id: 'alexander-mering',
    num: '08',
    title: 'Alexander Mering',
    subtitle: 'Strategic Narrative Architect for Industry Titans & Corporate Legacies',
    category: 'Executive Narrative & Brand',
    role: 'Lead Web Architect',
    status: 'PRODUCTION LIVE',
    statusColor: 'gold',
    year: '2025 - Present',
    url: 'https://www.alexandermering.com/',
    image: alexanderMeringImg,
    glow: 'from-amber-600/25 via-yellow-600/15 to-transparent',
    accentColor: '#d4af37',
    highlightMetric: 'Narrative Architecture',
    description: 'Platform narasi strategis dan repositori warisan korporat untuk eksekutif puncak dan pemimpin industri global. Merekayasa sejarah perusahaan, data analitik, dan visi korporat menjadi narasi abadi yang bernyawa.',
    tech: ['Strategic Narrative Engine', 'Executive Web Platform', 'Bento Grid System', 'Interactive Constellation'],
    caseStudy: {
      client: 'Alexander Mering Executive Brand (alexandermering.com)',
      location: 'Global & Indonesia Executive',
      challenge: 'Mentransformasi data dan rekam jejak bisnis korporasi raksasa menjadi narasi berjiwa tinggi dengan desain digital kelas dunia bertema luxury dark-aesthetic, tipografi Volkhov & Inter, serta interaktivitas responsif.',
      solution: 'Arsitektur platform executive positioning dengan particle constellation canvas interaktif, layout bento grid dinamis, showcase metodologi discovery terstruktur, dan performa pemuatan instan tanpa kompromi.',
      metrics: [
        { label: 'Target Klien', val: 'Industry Titans' },
        { label: 'Metodologi', val: 'Legacy Architecture' },
        { label: 'Pemuatan Laman', val: '< 0.6s' }
      ],
      deliverables: ['Executive Personal Brand Engine', 'Bento Architecture Showcase', 'Constellation Visual System']
    }
  }
];

export default function Projects() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [modalProject, setModalProject] = useState(null);
  const activeProject = projects[activeIdx] || projects[0];

  // Press ESC to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setModalProject(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <section className="w-full h-full min-h-screen bg-transparent pt-24 md:pt-28 pb-10 flex flex-col justify-center relative overflow-hidden select-none">
      
      {/* Background Dynamic Atmospheric Glow */}
      <div 
        className={`absolute -right-20 top-1/3 w-[500px] h-[500px] bg-gradient-to-br ${activeProject.glow} rounded-full blur-[140px] pointer-events-none transition-all duration-700`}
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 w-full relative z-10 flex flex-col justify-between">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 md:mb-8 pb-4 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-white/80 text-[11px] font-mono font-semibold tracking-widest uppercase">
                02 / Works & Ecosystem
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-black text-white uppercase tracking-tight">
              Selected Works & Engagements
            </h2>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono text-white/75">
            <span>DDEV STUDIO</span>
            <span>•</span>
            <span className="text-emerald-400">BORNEO GLOBE ACTIVE</span>
          </div>
        </div>

        {/* Main Split Showcase Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          
          {/* Left Column (5 Cols): Interactive Project Navigator List */}
          <div className="lg:col-span-5 flex flex-col gap-1.5 sm:gap-2 max-h-[660px] overflow-y-auto pr-1">
            {projects.map((project, idx) => {
              const isSelected = activeIdx === idx;
              return (
                <div
                  key={project.id}
                  onMouseEnter={() => setActiveIdx(idx)}
                  onClick={() => setActiveIdx(idx)}
                  className={`group relative p-2.5 sm:p-3 rounded-2xl border transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? 'bg-white/[0.07] border-white/30 shadow-[0_10px_30px_rgba(0,0,0,0.6)] backdrop-blur-xl'
                      : 'bg-white/[0.02] border-white/5 hover:border-white/15 hover:bg-white/[0.04]'
                  }`}
                >
                  {/* Active Highlight Bar */}
                  {isSelected && (
                    <motion.div
                      layoutId="activeProjectBar"
                      className="absolute left-0 top-2.5 bottom-2.5 w-1 rounded-r-full"
                      style={{ backgroundColor: project.accentColor }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}

                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5 sm:gap-3">
                      <span className={`text-xs font-mono font-bold transition-colors ${
                        isSelected ? 'text-cyan-300' : 'text-white/70'
                      }`}>
                        {project.num}
                      </span>
                      <div>
                        <h3 className={`text-sm sm:text-base font-display font-bold leading-tight transition-colors ${
                          isSelected ? 'text-white' : 'text-white/70 group-hover:text-white'
                        }`}>
                          {project.title}
                        </h3>
                        <p className="text-[10px] sm:text-[11px] font-sans text-white/75 line-clamp-1 mt-0.5">
                          {project.subtitle}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`hidden sm:inline-block px-2 py-0.5 rounded text-[9px] font-mono uppercase tracking-wider border ${
                        project.statusColor === 'emerald'
                          ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                          : project.statusColor === 'cyan'
                          ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-300'
                          : project.statusColor === 'blue'
                          ? 'bg-blue-500/10 border-blue-500/30 text-blue-300'
                          : project.statusColor === 'purple'
                          ? 'bg-purple-500/10 border-purple-500/30 text-purple-300'
                          : project.statusColor === 'amber'
                          ? 'bg-amber-500/10 border-amber-500/30 text-amber-300'
                          : project.statusColor === 'rose'
                          ? 'bg-rose-500/10 border-rose-500/30 text-rose-300'
                          : project.statusColor === 'gold'
                          ? 'bg-yellow-500/10 border-yellow-500/30 text-yellow-300'
                          : 'bg-orange-500/10 border-orange-500/30 text-orange-300'
                      }`}>
                        {project.role}
                      </span>

                      <div className={`w-6 h-6 sm:w-7 sm:h-7 rounded-lg flex items-center justify-center transition-all ${
                        isSelected 
                          ? 'bg-white text-black shadow-md scale-105' 
                          : 'bg-white/5 text-white/70 group-hover:bg-white/10 group-hover:text-white'
                      }`}>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column (7 Cols): High-Performance Live Project Preview Card */}
          <div className="lg:col-span-7 relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProject.id}
                initial={{ opacity: 0, scale: 0.96, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: -10 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="relative rounded-3xl bg-neutral-950/90 border border-white/15 backdrop-blur-2xl shadow-[0_25px_60px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col justify-between"
              >
                {/* Top Subtle Shimmer Border */}
                <div 
                  className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" 
                />

                {/* Sleek Browser Window Chrome */}
                <div className="px-4 py-2.5 bg-neutral-900/95 border-b border-white/10 flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                    </div>
                    <div className="ml-2 hidden sm:flex items-center gap-1.5 px-3 py-0.5 rounded-lg bg-black/50 border border-white/10 text-[11px] text-white/70">
                      <Lock className="w-3 h-3 text-emerald-400 shrink-0" />
                      <span className="truncate max-w-[200px]">
                        {activeProject.url !== '#' ? activeProject.url.replace(/^https?:\/\//, '') : `${activeProject.id}.ddev.studio`}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span 
                      className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold border"
                      style={{ 
                        color: activeProject.accentColor, 
                        borderColor: `${activeProject.accentColor}40`,
                        backgroundColor: `${activeProject.accentColor}15`
                      }}
                    >
                      {activeProject.status}
                    </span>
                    <span className="text-[10px] text-white/70 hidden sm:inline-block">
                      {activeProject.year}
                    </span>
                  </div>
                </div>

                {/* Preview Image Stage (Clickable to open Case Study) */}
                <div 
                  onClick={() => setModalProject(activeProject)}
                  className="relative w-full aspect-[16/9] overflow-hidden bg-neutral-900 group cursor-pointer"
                  title="Klik untuk melihat Case Study & Spesifikasi Lengkap"
                >
                  <img
                    src={activeProject.image}
                    alt={activeProject.title}
                    width="800"
                    height="450"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent pointer-events-none" />

                  {/* Hover Prompt Overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                    <span className="px-4 py-2 rounded-xl bg-black/80 border border-white/30 text-xs font-mono text-white flex items-center gap-2 shadow-2xl backdrop-blur-md">
                      <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Buka Case Study & Specs</span>
                    </span>
                  </div>

                  {/* Corner Metric Pill */}
                  <div className="absolute bottom-3 right-3 pointer-events-none">
                    <span className="px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/15 text-[11px] font-mono text-cyan-300 shadow-lg">
                      {activeProject.highlightMetric}
                    </span>
                  </div>
                </div>

                {/* Card Content & Action Bar */}
                <div className="p-5 sm:p-6 flex flex-col justify-between gap-4">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <h3 className="text-xl sm:text-2xl font-display font-bold text-white">
                        {activeProject.title}
                      </h3>
                      <span className="text-xs font-mono text-white/75 uppercase">
                        {activeProject.category}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed line-clamp-2">
                      {activeProject.description}
                    </p>

                    {/* Quick Metric Points */}
                    {activeProject.caseStudy?.metrics && (
                      <div className="grid grid-cols-3 gap-2 mt-3 pt-2.5 border-t border-white/10">
                        {activeProject.caseStudy.metrics.map((m, mIdx) => (
                          <div key={mIdx} className="flex flex-col text-left">
                            <span className="text-[9px] font-mono text-white/50 uppercase tracking-wider truncate">{m.label}</span>
                            <span className="text-xs font-mono font-bold truncate" style={{ color: activeProject.accentColor }}>
                              {m.val}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Tech Stack Pills & CTA */}
                  <div className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-wrap items-center gap-1.5">
                      {activeProject.tech.map((t, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-0.5 rounded-md text-[10px] font-mono bg-white/[0.04] border border-white/10 text-white/80"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setModalProject(activeProject)}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-mono font-bold bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-all duration-300 shadow-md cursor-pointer hover:scale-105"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Case Study & Specs</span>
                      </button>

                      {activeProject.url && activeProject.url !== '#' && (
                        <a
                          href={activeProject.url}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-mono font-bold text-black transition-all duration-300 shadow-md cursor-pointer hover:scale-105"
                          style={{ backgroundColor: activeProject.accentColor }}
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>Visit Site</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>

      {/* Deep-Dive Case Study & Specs Modal */}
      <AnimatePresence>
        {modalProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 select-text">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setModalProject(null)}
              className="absolute inset-0 bg-black/85 backdrop-blur-md cursor-pointer"
            />

            {/* Modal Dialog Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              transition={{ type: "spring", stiffness: 350, damping: 30 }}
              className="relative w-full max-w-3xl max-h-[88vh] rounded-3xl bg-[#090a10] border border-white/20 shadow-[0_25px_80px_rgba(0,0,0,0.95)] overflow-hidden flex flex-col z-10"
            >
              {/* Header Bar */}
              <div className="px-6 py-4 bg-neutral-900/90 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
                  <span className="text-xs font-mono font-bold tracking-wider text-white/75 uppercase">
                    Case Study • {modalProject.num}
                  </span>
                  <span className="text-white/20">|</span>
                  <span className="text-xs font-mono font-bold text-white truncate max-w-[200px] sm:max-w-none">
                    {modalProject.title}
                  </span>
                </div>

                <button
                  onClick={() => setModalProject(null)}
                  className="p-1.5 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 text-white/70 hover:text-white transition-all cursor-pointer"
                  aria-label="Tutup case study"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Scrollable Modal Content */}
              <div className="p-6 sm:p-7 overflow-y-auto space-y-5">
                {/* Banner Image Stage */}
                <div className="relative w-full aspect-[21/9] rounded-2xl overflow-hidden border border-white/10 bg-neutral-900">
                  <img
                    src={modalProject.image}
                    alt={modalProject.title}
                    width="1200"
                    height="514"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover object-top"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
                    <span className="text-xs font-mono text-white/80">
                      {modalProject.caseStudy?.client}
                    </span>
                    <span 
                      className="px-3 py-1 rounded-full text-xs font-mono font-bold text-black shadow-lg"
                      style={{ backgroundColor: modalProject.accentColor }}
                    >
                      {modalProject.status}
                    </span>
                  </div>
                </div>

                {/* Challenge & Solution Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-white/10">
                    <span className="text-[10px] font-mono font-bold tracking-widest text-red-400 uppercase block mb-1.5">
                      The Challenge
                    </span>
                    <p className="text-xs sm:text-sm text-white/80 font-light leading-relaxed">
                      {modalProject.caseStudy?.challenge}
                    </p>
                  </div>

                  <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-white/10">
                    <span className="text-[10px] font-mono font-bold tracking-widest text-emerald-400 uppercase block mb-1.5">
                      Engineered Solution
                    </span>
                    <p className="text-xs sm:text-sm text-white/80 font-light leading-relaxed">
                      {modalProject.caseStudy?.solution}
                    </p>
                  </div>
                </div>

                {/* 3 Key Metrics Cards */}
                <div className="grid grid-cols-3 gap-3">
                  {modalProject.caseStudy?.metrics.map((m, mIdx) => (
                    <div 
                      key={mIdx}
                      className="p-3 sm:p-4 rounded-2xl bg-neutral-950/60 border border-white/10 text-center flex flex-col justify-center"
                    >
                      <span className="text-lg sm:text-2xl font-display font-black text-white" style={{ color: modalProject.accentColor }}>
                        {m.val}
                      </span>
                      <span className="text-[10px] sm:text-xs font-mono text-white/75 mt-0.5">
                        {m.label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Deliverables & Tech Chips */}
                <div>
                  <span className="text-[10px] font-mono text-white/70 uppercase tracking-widest block mb-2">
                    Key Deliverables & Technology
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {modalProject.caseStudy?.deliverables.map((del, dIdx) => (
                      <span
                        key={dIdx}
                        className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-mono"
                      >
                        <CheckCircle2 className="w-3 h-3 text-cyan-400" />
                        <span>{del}</span>
                      </span>
                    ))}
                    {modalProject.tech.map((t, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-3 py-1 rounded-xl bg-white/5 border border-white/10 text-white/70 text-xs font-mono"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="px-6 py-4 bg-neutral-900/90 border-t border-white/10 flex items-center justify-between">
                <span className="text-[11px] font-mono text-white/70">
                  {modalProject.caseStudy?.location}
                </span>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setModalProject(null)}
                    className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-mono text-white transition-all cursor-pointer"
                  >
                    Tutup
                  </button>

                  {modalProject.url && modalProject.url !== '#' && (
                    <a
                      href={modalProject.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-mono font-bold text-black transition-all shadow-md hover:scale-105 cursor-pointer"
                      style={{ backgroundColor: modalProject.accentColor }}
                    >
                      <span>Kunjungi Platform</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
