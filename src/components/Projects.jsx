import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, ExternalLink, Sparkles, Lock, X, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';

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
        { label: 'Manfaat', val: '1,840+' },
        { label: 'Mobile', val: '100% Ready' },
        { label: 'Wilayah', val: 'Borneo Active' }
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
        { label: 'Katalog', val: 'Buku & Etnik' },
        { label: 'Checkout', val: 'Instant Pay' },
        { label: 'Pemuatan', val: '< 0.8s' }
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
        { label: 'Koleksi', val: 'Sejarah Adat' },
        { label: 'Format', val: 'Cetak & Ebook' },
        { label: 'Pemuatan', val: '< 0.8s' }
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
        { label: 'Dampak', val: '2,800+' },
        { label: 'Lokasi', val: '48+ Titik' },
        { label: 'Riset', val: '108+ Doc' }
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
        { label: 'Liputan', val: 'IKN & Borneo' },
        { label: 'Indeks', val: 'Google News' },
        { label: 'Pemuatan', val: '< 0.8s' }
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
        { label: 'Liputan', val: 'Nasional RI' },
        { label: 'Indeks', val: 'Google News' },
        { label: 'Pemuatan', val: '< 0.7s' }
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
        { label: 'Fokus', val: 'Dermatologi' },
        { label: 'Format', val: 'Buku & Jurnal' },
        { label: 'Pemuatan', val: '< 0.7s' }
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
        { label: 'Klien', val: 'Industry Titans' },
        { label: 'Metode', val: 'Legacy Arch' },
        { label: 'Pemuatan', val: '< 0.6s' }
      ],
      deliverables: ['Executive Personal Brand Engine', 'Bento Architecture Showcase', 'Constellation Visual System']
    }
  }
];

export default function Projects() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [modalProject, setModalProject] = useState(null);
  const activeProject = projects[activeIdx] || projects[0];
  const touchStartX = useRef(0);
  const tabsContainerRef = useRef(null);

  // Auto-scroll active chip into view on mobile
  useEffect(() => {
    const rail = tabsContainerRef.current;
    if (!rail) return;
    const activeBtn = rail.children[activeIdx];
    if (activeBtn) {
      const target = activeBtn.offsetLeft - rail.clientWidth / 2 + activeBtn.clientWidth / 2;
      rail.scrollTo({ left: target, behavior: 'smooth' });
    }
  }, [activeIdx]);

  const handleCardTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleCardTouchEnd = (e) => {
    const diffX = touchStartX.current - e.changedTouches[0].clientX;
    if (diffX > 45) {
      setActiveIdx((prev) => (prev < projects.length - 1 ? prev + 1 : 0));
    } else if (diffX < -45) {
      setActiveIdx((prev) => (prev > 0 ? prev - 1 : projects.length - 1));
    }
  };

  // Press ESC to close modal & lock page scroll while open
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setModalProject(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    document.body.style.overflow = modalProject ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [modalProject]);

  const goPrev = () => setActiveIdx((prev) => (prev > 0 ? prev - 1 : projects.length - 1));
  const goNext = () => setActiveIdx((prev) => (prev < projects.length - 1 ? prev + 1 : 0));

  return (
    <section className="relative w-full bg-paper text-ink px-5 md:px-12 lg:px-20 pt-28 md:pt-40 pb-24 md:pb-36 select-none">

      {/* Section tag */}
      <div className="flex items-center gap-4 mb-8 md:mb-14">
        <span className="font-mono text-[11px] uppercase tracking-[0.25em]">03 / Works</span>
        <div className="flex-1 h-[1px] bg-ink/25" />
        <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-ink/60 hidden sm:inline">Ddev Studio · Borneo Globe Active</span>
      </div>

      {/* Giant heading */}
      <div className="flex items-start gap-3 mb-10 md:mb-16">
        <h2 className="font-sans font-black uppercase tracking-tighter leading-[0.86] text-[16vw] md:text-[10.5vw] lg:text-[9.5vw]">
          Selected<br />Works
        </h2>
        <span className="mt-2 md:mt-4 px-2.5 py-1 bg-violet border-2 border-ink font-mono text-xs md:text-sm font-bold">
          {String(projects.length).padStart(2, '0')}
        </span>
      </div>

      {/* Mobile: chip rail + stepper */}
      <div className="flex lg:hidden flex-col gap-3 mb-5 w-full">
        <div
          ref={tabsContainerRef}
          className="relative flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar select-none"
        >
          {projects.map((project, idx) => {
            const isSelected = activeIdx === idx;
            return (
              <button
                key={project.id}
                onClick={() => setActiveIdx(idx)}
                className={`shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-full border-2 border-ink text-xs font-bold uppercase tracking-wide transition-colors cursor-pointer ${
                  isSelected ? 'bg-ink text-paper' : 'bg-paper text-ink'
                }`}
              >
                <span className={`font-mono text-[10px] ${isSelected ? 'text-violet' : 'text-ink/50'}`}>{project.num}</span>
                <span className="whitespace-nowrap">{project.title}</span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center justify-between border-2 border-ink px-3 py-2">
          <div className="flex items-center gap-2 min-w-0 font-mono text-xs">
            <span className="font-bold tracking-wider">
              {activeProject.num} / {String(projects.length).padStart(2, '0')}
            </span>
            <span className="text-ink/30">•</span>
            <span className="font-medium truncate max-w-[180px]">{activeProject.title}</span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={goPrev}
              className="w-9 h-9 border-2 border-ink flex items-center justify-center hover:bg-ink hover:text-paper active:scale-95 transition-all cursor-pointer"
              aria-label="Proyek sebelumnya"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={goNext}
              className="w-9 h-9 border-2 border-ink flex items-center justify-center hover:bg-ink hover:text-paper active:scale-95 transition-all cursor-pointer"
              aria-label="Proyek berikutnya"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main layout: index list (desktop) + preview card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start w-full">

        {/* Desktop index list */}
        <ol className="hidden lg:flex lg:col-span-5 flex-col border-t-2 border-ink">
          {projects.map((project, idx) => {
            const isSelected = activeIdx === idx;
            return (
              <li key={project.id}>
                <button
                  onMouseEnter={() => setActiveIdx(idx)}
                  onFocus={() => setActiveIdx(idx)}
                  onClick={() => setModalProject(project)}
                  className={`group w-full text-left flex items-center gap-4 px-3 py-4 border-b-2 border-ink transition-all duration-300 cursor-pointer ${
                    isSelected ? 'bg-ink text-paper pl-6' : 'hover:pl-5'
                  }`}
                >
                  <span className={`font-mono text-xs font-bold w-6 shrink-0 ${isSelected ? 'text-violet' : 'text-ink/50'}`}>
                    {project.num}
                  </span>
                  <span className="flex-1 min-w-0">
                    <span className="block font-sans font-black uppercase tracking-tight text-2xl xl:text-[28px] leading-none truncate">
                      {project.title}
                    </span>
                    <span className={`block font-mono text-[10px] uppercase tracking-[0.15em] mt-1.5 truncate ${isSelected ? 'text-paper/60' : 'text-ink/50'}`}>
                      {project.role}
                    </span>
                  </span>
                  <span
                    className={`w-9 h-9 shrink-0 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                      isSelected ? 'bg-violet border-violet text-ink rotate-0' : 'border-ink/30 text-ink/60 -rotate-45 group-hover:rotate-0'
                    }`}
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </button>
              </li>
            );
          })}
        </ol>

        {/* Preview card */}
        <div
          className="w-full lg:col-span-7 relative lg:sticky lg:top-24"
          onTouchStart={handleCardTouchStart}
          onTouchEnd={handleCardTouchEnd}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProject.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="relative bg-paper border-2 border-ink shadow-[7px_7px_0_#111] md:shadow-[10px_10px_0_#111] flex flex-col"
            >
              {/* Window chrome */}
              <div className="px-3 sm:px-4 py-2 bg-paper border-b-2 border-ink flex items-center justify-between gap-3 font-mono text-[10px] sm:text-xs">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="flex items-center gap-1.5 shrink-0">
                    <span className="w-2.5 h-2.5 rounded-full border-2 border-ink" />
                    <span className="w-2.5 h-2.5 rounded-full border-2 border-ink" />
                    <span className="w-2.5 h-2.5 rounded-full bg-ink" />
                  </div>
                  <span className="hidden sm:flex items-center gap-1.5 px-3 py-0.5 border border-ink/40 text-[11px] text-ink/70 min-w-0">
                    <Lock className="w-3 h-3 shrink-0" />
                    <span className="truncate max-w-[220px]">
                      {activeProject.url !== '#' ? activeProject.url.replace(/^https?:\/\//, '') : `${activeProject.id}.ddev.studio`}
                    </span>
                  </span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="px-2 py-0.5 bg-violet border border-ink text-[9px] sm:text-[10px] font-bold uppercase tracking-wider truncate max-w-[130px] sm:max-w-none">
                    {activeProject.status}
                  </span>
                  <span className="text-ink/60 hidden sm:inline">{activeProject.year}</span>
                </div>
              </div>

              {/* Screenshot (opens case study) */}
              <div
                onClick={() => setModalProject(activeProject)}
                className="relative w-full aspect-[16/9] overflow-hidden bg-ink/5 group cursor-pointer border-b-2 border-ink"
                title="Klik untuk melihat Case Study & Spesifikasi Lengkap"
              >
                <img
                  src={activeProject.image}
                  alt={activeProject.title}
                  width="800"
                  height="450"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/55 transition-colors duration-300 flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 px-4 py-2 bg-violet border-2 border-ink font-mono text-xs font-bold uppercase tracking-wider text-ink">
                    Open Case Study ↗
                  </span>
                </div>
                <span className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 px-2.5 py-1 bg-paper border-2 border-ink font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-wide">
                  {activeProject.highlightMetric}
                </span>
              </div>

              {/* Content */}
              <div className="p-4 sm:p-6 flex flex-col gap-4">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="font-mono text-[11px] uppercase tracking-[0.2em] font-bold text-violet" style={{ WebkitTextStroke: '0.4px #111' }}>
                      {activeProject.category}
                    </span>
                    <span className="font-mono text-[10px] text-ink/50 sm:hidden">{activeProject.year}</span>
                  </div>
                  <h3 className="font-sans font-black uppercase tracking-tighter text-3xl sm:text-4xl leading-[0.95] break-words">
                    {activeProject.title}
                  </h3>
                  <p className="font-sans text-sm font-semibold text-ink/70 mt-1.5">{activeProject.subtitle}</p>
                </div>

                <p className="font-sans text-sm text-[#333] leading-relaxed line-clamp-3">
                  {activeProject.description}
                </p>

                {activeProject.caseStudy?.metrics && (
                  <div className="grid grid-cols-3 border-2 border-ink">
                    {activeProject.caseStudy.metrics.map((m, mIdx) => (
                      <div
                        key={mIdx}
                        className={`px-2.5 py-2.5 min-w-0 ${mIdx !== 2 ? 'border-r-2 border-ink' : ''}`}
                      >
                        <span className="block font-mono text-[9px] sm:text-[10px] uppercase tracking-wider text-ink/50 truncate">{m.label}</span>
                        <span className="block font-sans font-black text-sm sm:text-base truncate mt-0.5">{m.val}</span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex flex-wrap items-center gap-1.5">
                  {activeProject.tech.map((t, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-full border border-ink text-[10px] sm:text-[11px] font-mono uppercase tracking-wide"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-3 pt-1">
                  <button
                    onClick={() => setModalProject(activeProject)}
                    className="group relative flex-1 sm:flex-initial cursor-pointer"
                  >
                    <div className="absolute inset-0 bg-ink translate-x-1 translate-y-1 transition-transform duration-200 group-hover:translate-x-0 group-hover:translate-y-0" />
                    <div className="relative px-4 py-3 bg-paper border-2 border-ink flex items-center justify-center gap-2 transition-transform duration-200 group-hover:translate-x-1 group-hover:translate-y-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span className="font-sans font-black text-[11px] sm:text-xs uppercase tracking-widest whitespace-nowrap">Case Study</span>
                    </div>
                  </button>

                  {activeProject.url && activeProject.url !== '#' && (
                    <a
                      href={activeProject.url}
                      target="_blank"
                      rel="noreferrer"
                      className="group relative shrink-0"
                    >
                      <div className="absolute inset-0 bg-ink translate-x-1 translate-y-1 transition-transform duration-200 group-hover:translate-x-0 group-hover:translate-y-0" />
                      <div className="relative px-4 py-3 bg-violet border-2 border-ink flex items-center justify-center gap-2 transition-transform duration-200 group-hover:translate-x-1 group-hover:translate-y-1">
                        <span className="font-sans font-black text-[11px] sm:text-xs uppercase tracking-widest">Visit</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </div>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Deep-Dive Case Study Modal */}
      <AnimatePresence>
        {modalProject && (
          <div className="fixed inset-0 z-[70] flex items-center justify-center p-3 sm:p-6 select-text">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setModalProject(null)}
              className="absolute inset-0 bg-ink/70 cursor-pointer"
            />

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ type: 'spring', stiffness: 320, damping: 32 }}
              className="relative w-full max-w-3xl max-h-[90vh] bg-paper border-2 border-ink shadow-[10px_10px_0_#684AFF] overflow-hidden flex flex-col z-10"
            >
              {/* Header */}
              <div className="px-4 sm:px-6 py-3 bg-ink text-paper flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <span className="font-mono text-[11px] font-bold tracking-widest text-violet uppercase">
                    Case Study {modalProject.num}
                  </span>
                  <span className="text-paper/30">|</span>
                  <span className="font-sans font-black uppercase text-sm truncate">{modalProject.title}</span>
                </div>
                <button
                  onClick={() => setModalProject(null)}
                  className="w-8 h-8 shrink-0 border border-paper/40 flex items-center justify-center hover:bg-violet hover:text-ink hover:border-violet transition-colors cursor-pointer"
                  aria-label="Tutup case study"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Content */}
              <div className="p-4 sm:p-7 overflow-y-auto space-y-5">
                <div className="relative w-full aspect-[21/9] overflow-hidden border-2 border-ink bg-ink/5">
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
                  <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between gap-2">
                    <span className="px-2 py-1 bg-paper border border-ink font-mono text-[10px] sm:text-xs truncate">
                      {modalProject.caseStudy?.client}
                    </span>
                    <span className="px-2.5 py-1 bg-violet border-2 border-ink font-mono text-[10px] sm:text-xs font-bold uppercase shrink-0">
                      {modalProject.status}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 sm:p-5 border-2 border-ink">
                    <span className="font-mono text-[10px] font-bold tracking-[0.2em] uppercase block mb-2 text-ink/60">
                      The Challenge
                    </span>
                    <p className="font-sans text-sm text-[#333] leading-relaxed">{modalProject.caseStudy?.challenge}</p>
                  </div>
                  <div className="p-4 sm:p-5 border-2 border-ink bg-violet">
                    <span className="font-mono text-[10px] font-bold tracking-[0.2em] uppercase block mb-2">
                      Engineered Solution
                    </span>
                    <p className="font-sans text-sm leading-relaxed">{modalProject.caseStudy?.solution}</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 border-2 border-ink">
                  {modalProject.caseStudy?.metrics.map((m, mIdx) => (
                    <div key={mIdx} className={`p-3 sm:p-4 text-center ${mIdx !== 2 ? 'border-r-2 border-ink' : ''}`}>
                      <span className="block font-sans font-black text-lg sm:text-3xl tracking-tighter">{m.val}</span>
                      <span className="block font-mono text-[10px] sm:text-xs uppercase tracking-wider text-ink/60 mt-0.5">{m.label}</span>
                    </div>
                  ))}
                </div>

                <div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/60 block mb-2">
                    Key Deliverables &amp; Technology
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {modalProject.caseStudy?.deliverables.map((del, dIdx) => (
                      <span
                        key={dIdx}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-ink text-paper text-[11px] font-mono"
                      >
                        <CheckCircle2 className="w-3 h-3 text-violet" />
                        <span>{del}</span>
                      </span>
                    ))}
                    {modalProject.tech.map((t, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-3 py-1.5 border border-ink text-[11px] font-mono uppercase tracking-wide"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="px-4 sm:px-6 py-3 border-t-2 border-ink flex items-center justify-between gap-3">
                <span className="font-mono text-[11px] text-ink/60 hidden sm:inline">{modalProject.caseStudy?.location}</span>
                <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                  <button
                    onClick={() => setModalProject(null)}
                    className="px-4 py-2.5 border-2 border-ink font-sans font-black text-xs uppercase tracking-widest hover:bg-ink hover:text-paper transition-colors cursor-pointer"
                  >
                    Tutup
                  </button>
                  {modalProject.url && modalProject.url !== '#' && (
                    <a
                      href={modalProject.url}
                      target="_blank"
                      rel="noreferrer"
                      className="group relative"
                    >
                      <div className="absolute inset-0 bg-ink translate-x-1 translate-y-1 transition-transform duration-200 group-hover:translate-x-0 group-hover:translate-y-0" />
                      <div className="relative px-4 py-2.5 bg-violet border-2 border-ink flex items-center gap-2 transition-transform duration-200 group-hover:translate-x-1 group-hover:translate-y-1">
                        <span className="font-sans font-black text-xs uppercase tracking-widest whitespace-nowrap">Kunjungi Platform</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </div>
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
