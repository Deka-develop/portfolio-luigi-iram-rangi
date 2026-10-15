import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowUpRight,
  ExternalLink,
  Sparkles,
  Lock,
  X,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Monitor,
  Smartphone,
  Activity,
  Layers,
  ShieldCheck,
  Zap,
  Globe,
  ShoppingBag,
  Newspaper,
  Award,
  QrCode,
  Copy,
  Check
} from 'lucide-react';
import { DayakShieldEmblem, DayakCornerAccent } from './DayakMotifs';

import borneoGlobeImg from '../assets/projects/borneo-globe.webp';
import anyarmartImg from '../assets/projects/anyarmart.webp';
import bukuDayakImg from '../assets/projects/buku-dayak.webp';
import pancaPalmaTropikaImg from '../assets/projects/panca-palma-tropika.webp';
import iknTimeImg from '../assets/projects/ikn-time.webp';
import indotribuneImg from '../assets/projects/indotribune.webp';
import bebasJerawatImg from '../assets/projects/bebas-jerawat.webp';
import alexanderMeringImg from '../assets/projects/alexander-mering.webp';

// 8 Production-grade platforms with deep engineering telemetry
const projects = [
  {
    id: 'borneo-globe',
    num: '01',
    title: 'Borneo Globe',
    subtitle: 'Connecting Futures — From Local Roots to Global Reach',
    category: 'Digital Impact Platform',
    categoryGroup: 'culture',
    role: 'Active Role',
    status: 'CURRENTLY ENGAGED',
    statusColor: 'emerald',
    year: '2025 - Present',
    url: 'https://www.borneoglobe.org/',
    image: borneoGlobeImg,
    glow: 'from-blue-600/25 via-teal-500/20 to-transparent',
    accentColor: '#38bdf8',
    highlightMetric: '1,840+ Beneficiaries',
    vitals: { lcp: '0.45s', inp: '12ms', cls: '0.00', score: 100 },
    serverTech: 'Next-Gen Edge CDN • 120 FPS Assets',
    description: 'Platform digital resmi Borneo Globe (borneoglobe.org) dengan visi "From Local Roots to Global Reach". Memberdayakan bisnis dan komunitas lokal dengan strategi digital pintar, pelatihan terarah, dan koneksi global berkelanjutan.',
    tech: ['Web Platform', 'Digital Strategy', 'Global Reach', 'Impact Ecosystem'],
    archBadges: ['Zero-Bloat DOM', 'Geo-Distributed Edge', 'Bilingual ID/EN', 'WCAG 2.1 AA'],
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
    categoryGroup: 'commerce',
    role: 'Lead E-Commerce Architect',
    status: 'PRODUCTION LIVE',
    statusColor: 'cyan',
    year: '2025 - Present',
    url: 'https://www.anyarmart.com/',
    image: anyarmartImg,
    glow: 'from-cyan-500/25 via-blue-600/20 to-transparent',
    accentColor: '#00f0ff',
    highlightMetric: 'Nusantara Marketplace',
    vitals: { lcp: '0.52s', inp: '14ms', cls: '0.00', score: 99 },
    serverTech: 'PCI-DSS Compliant • Sub-Second Cache',
    description: 'Platform toko online dan digital bookstore independen nusantara. Menghadirkan katalog literatur budaya Dayak, riset kelapa sawit, novel sastra, lukisan etnik, hingga kerajinan khas Borneo dengan pengalaman belanja yang intuitif.',
    tech: ['E-Commerce Engine', 'Digital Catalog System', 'Payhip Checkout', 'Conversion CRO'],
    archBadges: ['Conversion CRO Engine', 'Instant Checkout', 'Digital Bookstore', 'Asset Optimization'],
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
    categoryGroup: 'culture',
    role: 'Lead Web Architect',
    status: 'PRODUCTION LIVE',
    statusColor: 'blue',
    year: '2025 - Present',
    url: 'https://www.bukudayak.com/',
    image: bukuDayakImg,
    glow: 'from-blue-600/30 via-indigo-600/20 to-transparent',
    accentColor: '#3b82f6',
    highlightMetric: 'Borneo Heritage Archive',
    vitals: { lcp: '0.41s', inp: '10ms', cls: '0.00', score: 100 },
    serverTech: 'Bilingual ID/EN Engine • Instant Search',
    description: 'Platform literasi digital dan arsip kebudayaan terlengkap seputar suku Dayak dan sejarah pulau Kalimantan. Menghadirkan katalog buku cetak, edisi hybrid, e-book ilmiah, dan dokumentasi adat istiadat leluhur Borneo.',
    tech: ['Literacy Portal Engine', 'Digital Catalog & E-Book', 'Bilingual Support (ID/EN)', 'Cultural Archive UX'],
    archBadges: ['Cultural Archive Engine', 'Multi-Format Reader', 'SEO Schema Heritage', 'Cloudflare Edge'],
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
    categoryGroup: 'culture',
    role: 'UI/UX & Web Engineer',
    status: 'PRODUCTION LIVE',
    statusColor: 'emerald',
    year: '2025 - Present',
    url: 'https://www.pancapalmatropika.org/',
    image: pancaPalmaTropikaImg,
    glow: 'from-emerald-600/30 via-teal-600/20 to-transparent',
    accentColor: '#10b981',
    highlightMetric: '2,800+ Beneficiaries',
    vitals: { lcp: '0.48s', inp: '11ms', cls: '0.00', score: 100 },
    serverTech: 'Sub-0.6s LCP • Edge Deployed',
    description: 'Platform digital resmi Yayasan Panca Palma Tropika (pancapalmatropika.org) untuk konservasi lanskap tropis berkelanjutan melalui sains multidisiplin, riset agroforestri, dan pemberdayaan masyarakat lokal di kepulauan Indonesia.',
    tech: ['Environmental NGO', 'Bilingual ID/EN', 'Agroforestry Data', 'Impact Ecosystem'],
    archBadges: ['Environmental NGO Platform', 'Agroforestry Database', 'Interactive Impact Map', 'Clean Typography'],
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
    categoryGroup: 'media',
    role: 'Media Platform Architect',
    status: 'PRODUCTION LIVE',
    statusColor: 'amber',
    year: '2025 - Present',
    url: 'https://www.ikntime.com/',
    image: iknTimeImg,
    glow: 'from-amber-500/30 via-orange-600/20 to-transparent',
    accentColor: '#f59e0b',
    highlightMetric: 'Borneo News Portal',
    vitals: { lcp: '0.49s', inp: '15ms', cls: '0.00', score: 99 },
    serverTech: 'Edge Caching • Instant News Ingestion',
    description: 'Portal media berita digital dan jaringan informasi independen seputar Ibu Kota Nusantara (IKN) dan pulau Borneo. Menghadirkan liputan komprehensif smart city, megaproyek infrastruktur, investasi, ekonomi, dan dinamika sosial budaya.',
    tech: ['Digital News Portal', 'High-Traffic Architecture', 'SEO Schema', 'AdSense Optimized'],
    archBadges: ['Google News Schema', 'Non-Blocking Ads', 'High-Concurrency Feed', 'RSS/Atom Pipeline'],
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
    categoryGroup: 'media',
    role: 'Editorial & Web Architect',
    status: 'PRODUCTION LIVE',
    statusColor: 'rose',
    year: '2025 - Present',
    url: 'https://www.indotribune.com/',
    image: indotribuneImg,
    glow: 'from-rose-500/30 via-red-600/20 to-transparent',
    accentColor: '#f43f5e',
    highlightMetric: 'National News Network',
    vitals: { lcp: '0.46s', inp: '13ms', cls: '0.00', score: 100 },
    serverTech: 'CDN Anycast Network • 100/100 Core Vitals',
    description: 'Portal berita independen nasional menyajikan liputan peristiwa politik, pergerakan IHSG & pasar modal, kebijakan publik, ketenagakerjaan, olahraga internasional, dan opini mendalam secara real-time.',
    tech: ['News Portal Engine', 'High-Traffic Architecture', 'Google AdSense Ready', 'Instant CDN'],
    archBadges: ['National News Engine', 'Clean Reader Layout', 'AdSense Async Optimization', 'Real-Time Updates'],
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
    categoryGroup: 'commerce',
    role: 'Lead Web Architect',
    status: 'PRODUCTION LIVE',
    statusColor: 'orange',
    year: '2025 - Present',
    url: 'https://www.bebasjerawat.id/',
    image: bebasJerawatImg,
    glow: 'from-orange-500/30 via-amber-600/20 to-transparent',
    accentColor: '#fb923c',
    highlightMetric: 'Dermatology Portal',
    vitals: { lcp: '0.43s', inp: '11ms', cls: '0.00', score: 100 },
    serverTech: 'Mobile-First Architecture • Instant Search',
    description: 'Portal edukasi kesehatan kulit dan kurasi literatur dermatologi terpercaya di Indonesia. Menghadirkan panduan komprehensif penanganan jerawat, ulasan klinis bahan aktif skincare, serta rilis buku & jurnal perawatan kulit ilmiah.',
    tech: ['Health Portal Engine', 'Editorial CMS', 'Dermatology Schema', 'Mobile-First UX'],
    archBadges: ['Dermatology Portal', 'Dark/Light Auto-Switch', 'Editorial Medical Schema', 'Responsive Book Catalog'],
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
    categoryGroup: 'executive',
    role: 'Lead Web Architect',
    status: 'PRODUCTION LIVE',
    statusColor: 'gold',
    year: '2025 - Present',
    url: 'https://www.alexandermering.com/',
    image: alexanderMeringImg,
    glow: 'from-amber-600/30 via-yellow-600/20 to-transparent',
    accentColor: '#d4af37',
    highlightMetric: 'Narrative Architecture',
    vitals: { lcp: '0.38s', inp: '9ms', cls: '0.00', score: 100 },
    serverTech: 'Ultra-Minimal Bytecode • 100% Performance',
    description: 'Platform narasi strategis dan repositori warisan korporat untuk eksekutif puncak dan pemimpin industri global. Merekayasa sejarah perusahaan, data analitik, dan visi korporat menjadi narasi abadi yang bernyawa.',
    tech: ['Strategic Narrative Engine', 'Executive Web Platform', 'Bento Grid System', 'Interactive Constellation'],
    archBadges: ['Executive Bento Grid', 'Constellation Physics', 'Luxury Dark Aesthetic', 'Sub-400ms Delivery'],
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

const categoryFilters = [
  { id: 'all', label: 'Semua Platform', icon: Layers, count: 8 },
  { id: 'culture', label: 'Budaya & Konservasi', icon: Globe, count: 3 },
  { id: 'media', label: 'Media Nasional', icon: Newspaper, count: 2 },
  { id: 'commerce', label: 'E-Commerce & Retail', icon: ShoppingBag, count: 2 },
  { id: 'executive', label: 'Executive Legacy', icon: Award, count: 1 }
];

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeProjectIdx, setActiveProjectIdx] = useState(0);
  const [viewMode, setViewMode] = useState('desktop'); // 'desktop' | 'mobile' | 'telemetry'
  const [modalProject, setModalProject] = useState(null);
  const [qrModalProject, setQrModalProject] = useState(null);
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0, glareX: 50, glareY: 50 });

  const touchStartX = useRef(0);
  const tabsContainerRef = useRef(null);

  // Filtered projects
  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'all') return projects;
    return projects.filter((p) => p.categoryGroup === selectedCategory);
  }, [selectedCategory]);

  // Safe active project
  const activeProject = filteredProjects[activeProjectIdx] || filteredProjects[0] || projects[0];

  // Auto-scroll active pill into view on mobile
  useEffect(() => {
    if (tabsContainerRef.current) {
      const activeBtn = tabsContainerRef.current.children[activeProjectIdx];
      if (activeBtn) {
        activeBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }, [activeProjectIdx]);

  // Keyboard Navigation: Arrow Up / Down (or J / K), 1-3 View Modes, Space to Open Specs, Escape to Close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (modalProject || qrModalProject) {
        if (e.key === 'Escape') {
          setModalProject(null);
          setQrModalProject(null);
        }
        return;
      }

      if (e.key === 'ArrowDown' || e.key.toLowerCase() === 'j') {
        e.preventDefault();
        setActiveProjectIdx((prev) => (prev < filteredProjects.length - 1 ? prev + 1 : 0));
      } else if (e.key === 'ArrowUp' || e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setActiveProjectIdx((prev) => (prev > 0 ? prev - 1 : filteredProjects.length - 1));
      } else if (e.key === '1') {
        setViewMode('desktop');
      } else if (e.key === '2') {
        setViewMode('mobile');
      } else if (e.key === '3') {
        setViewMode('telemetry');
      } else if (e.key === ' ' && !e.target.matches('input, textarea, button')) {
        e.preventDefault();
        setModalProject(activeProject);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [filteredProjects, activeProject, modalProject, qrModalProject]);

  // 3D Perspective Tilt calculations
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setTilt({
      x: (y - 0.5) * -10, // -5 to +5 deg tilt
      y: (x - 0.5) * 10,
      glareX: Math.round(x * 100),
      glareY: Math.round(y * 100)
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0, glareX: 50, glareY: 50 });
  };

  const handleCardTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleCardTouchEnd = (e) => {
    const diffX = touchStartX.current - e.changedTouches[0].clientX;
    if (diffX > 45) {
      setActiveProjectIdx((prev) => (prev < filteredProjects.length - 1 ? prev + 1 : 0));
    } else if (diffX < -45) {
      setActiveProjectIdx((prev) => (prev > 0 ? prev - 1 : filteredProjects.length - 1));
    }
  };

  const copyToClipboard = (text) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedUrl(true);
      setTimeout(() => setCopiedUrl(false), 2000);
    }
  };

  return (
    <section className="w-full min-h-screen bg-[#07080B] text-white pt-24 md:pt-32 pb-20 px-4 sm:px-8 lg:px-14 flex flex-col justify-center relative overflow-hidden select-none border-y border-white/10">
      
      {/* ───────────────── 1. AMBIENT DYNAMIC ATMOSPHERE ───────────────── */}
      <div
        className={`absolute -right-20 top-1/4 w-[600px] h-[600px] bg-gradient-to-br ${activeProject.glow} rounded-full blur-[160px] pointer-events-none transition-all duration-700 opacity-60`}
      />
      <div
        className="absolute left-1/4 bottom-10 w-[450px] h-[450px] bg-gradient-to-tr from-[#684AFF]/10 via-transparent to-transparent rounded-full blur-[140px] pointer-events-none"
      />
      
      {/* Subtle Grid Lines Overlay */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none"
      />

      <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col gap-6">
        
        {/* ───────────────── 2. SECTION HEADER & TELEMETRY STATUS ───────────────── */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-white/10">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[11px] font-mono font-semibold tracking-widest uppercase text-white/90">
                <DayakShieldEmblem className="w-3.5 h-3.5 text-cyan-400" color="#38bdf8" />
                Koleksi Sistem Produksi
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-[10px] font-mono font-bold text-emerald-300">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                8 SISTEM LIVE • HTTP/3 QUIC
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-sans font-black text-white tracking-tight leading-tight">
              Karya Unggulan &amp; Solusi Produksi<span className="text-[#684AFF]">.</span>
            </h1>
            <p className="text-white/60 font-sans text-xs sm:text-sm max-w-2xl mt-2 leading-relaxed">
              Arsip sistem perangkat lunak mandiri, platform media berskala nasional, digital marketplace etnik, dan portal riset konservasi yang dibangun dengan standar performa nir-beban.
            </p>
          </div>

          {/* Quick HUD Navigation Shortcut Hint */}
          <div className="flex flex-col items-start lg:items-end gap-2 text-right">
            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/10 font-mono text-[10px] text-white/60">
              <span className="text-cyan-400 font-bold">[↑/↓ NAVIGASI]</span>
              <span>•</span>
              <span className="text-amber-400 font-bold">[1-3 VIEWPORT]</span>
              <span>•</span>
              <span className="text-emerald-400 font-bold">[SPASI DETAIL]</span>
            </div>
            <div className="flex items-center gap-3 text-xs font-mono text-white/70">
              <span>DDEV STUDIO</span>
              <span>•</span>
              <span className="text-cyan-300 font-bold">100/100 CORE VITALS</span>
            </div>
          </div>
        </div>

        {/* ───────────────── 3. CATEGORY FILTER TABS (PILLS) ───────────────── */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 custom-scrollbar">
          {categoryFilters.map((cat) => {
            const Icon = cat.icon;
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setActiveProjectIdx(0);
                }}
                className={`relative flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono font-semibold transition-all cursor-pointer whitespace-nowrap border ${
                  isActive
                    ? 'text-white border-white/30 bg-white/15 shadow-[0_0_20px_rgba(255,255,255,0.15)]'
                    : 'text-white/60 border-white/5 bg-white/[0.02] hover:bg-white/[0.06] hover:text-white'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-cyan-400' : 'text-white/40'}`} />
                <span>{cat.label}</span>
                <span
                  className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                    isActive ? 'bg-cyan-500/20 text-cyan-300' : 'bg-white/5 text-white/40'
                  }`}
                >
                  {cat.count}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="activeFilterPill"
                    className="absolute inset-0 rounded-full border border-cyan-400/40 pointer-events-none"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* ───────────────── 4. MOBILE TOP HORIZONTAL CAROUSEL TABS ───────────────── */}
        <div className="flex lg:hidden flex-col gap-2.5 w-full">
          <div
            ref={tabsContainerRef}
            className="flex items-center gap-2.5 overflow-x-auto pb-2 custom-scrollbar"
          >
            {filteredProjects.map((project, idx) => {
              const isSelected = activeProjectIdx === idx;
              return (
                <button
                  key={project.id}
                  onClick={() => setActiveProjectIdx(idx)}
                  className={`shrink-0 flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-mono font-bold border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-white/15 text-white shadow-lg'
                      : 'bg-white/[0.03] text-white/70 hover:text-white border-white/10'
                  }`}
                  style={{
                    borderColor: isSelected ? project.accentColor : undefined,
                    boxShadow: isSelected ? `0 0 16px ${project.accentColor}30` : undefined
                  }}
                >
                  <span
                    className="text-xs font-mono font-black"
                    style={{ color: isSelected ? project.accentColor : 'rgba(255,255,255,0.4)' }}
                  >
                    {project.num}
                  </span>
                  <span className="whitespace-nowrap font-semibold text-xs sm:text-sm">
                    {project.title}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Mobile Stepper Bar */}
          <div className="flex items-center justify-between py-2 px-3.5 text-xs sm:text-sm font-mono bg-white/[0.02] border border-white/5 rounded-xl">
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="font-bold tracking-wider" style={{ color: activeProject.accentColor }}>
                {activeProject.num} / {String(filteredProjects.length).padStart(2, '0')}
              </span>
              <span className="text-white/30">•</span>
              <span className="text-white/80 font-medium truncate max-w-[220px]">
                {activeProject.title}
              </span>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              <button
                onClick={() =>
                  setActiveProjectIdx((prev) => (prev > 0 ? prev - 1 : filteredProjects.length - 1))
                }
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-white/80 hover:text-white transition-all cursor-pointer"
                aria-label="Proyek sebelumnya"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() =>
                  setActiveProjectIdx((prev) => (prev < filteredProjects.length - 1 ? prev + 1 : 0))
                }
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-white/80 hover:text-white transition-all cursor-pointer"
                aria-label="Proyek berikutnya"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* ───────────────── 5. MAIN SHOWCASE GRID (5-Cols Navigator + 7-Cols Interactive Stage) ───────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start w-full">
          
          {/* LEFT COLUMN (5 Cols): Desktop Vertical Interactive System Navigator */}
          <div className="hidden lg:flex lg:col-span-5 flex-col gap-3 max-h-[780px] overflow-y-auto pr-2 custom-scrollbar">
            {filteredProjects.map((project, idx) => {
              const isSelected = activeProjectIdx === idx;
              return (
                <button
                  type="button"
                  key={project.id}
                  aria-label={`Pilih proyek ${project.title}`}
                  onClick={() => setActiveProjectIdx(idx)}
                  className={`w-full text-left group relative p-5 rounded-2xl border transition-all duration-300 cursor-pointer focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none ${
                    isSelected
                      ? 'bg-white/[0.10] border-white/30 shadow-[0_16px_40px_rgba(0,0,0,0.7)] backdrop-blur-xl scale-[1.01]'
                      : 'bg-white/[0.02] border-white/5 hover:border-white/15 hover:bg-white/[0.045]'
                  }`}
                >
                  {/* Active Highlight Accent Bar */}
                  {isSelected && (
                    <motion.div
                      layoutId="activeProjectBar"
                      className="absolute left-0 top-3.5 bottom-3.5 w-2 rounded-r-full shadow-lg"
                      style={{ backgroundColor: project.accentColor }}
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}

                  <div className="flex items-start justify-between gap-3.5">
                    <div className="flex items-start gap-3.5 min-w-0">
                      {/* Number with pulsing dot if active */}
                      <div className="flex flex-col items-center shrink-0 pt-0.5">
                        <span
                          className="text-sm font-mono font-bold tracking-wider"
                          style={{ color: isSelected ? project.accentColor : 'rgba(255,255,255,0.45)' }}
                        >
                          {project.num}
                        </span>
                        {isSelected && (
                          <span
                            className="w-2 h-2 rounded-full mt-1.5 animate-ping"
                            style={{ backgroundColor: project.accentColor }}
                          />
                        )}
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-2.5">
                          <h3
                            className={`text-lg sm:text-xl font-display font-bold leading-snug transition-colors line-clamp-1 ${
                              isSelected ? 'text-white' : 'text-white/75 group-hover:text-white'
                            }`}
                          >
                            {project.title}
                          </h3>
                          {isSelected && (
                            <span className="hidden xl:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
                              <Zap className="w-3 h-3" />
                              {project.vitals.score}/100
                            </span>
                          )}
                        </div>

                        <p className="text-xs sm:text-[13px] font-sans text-white/70 line-clamp-1 mt-1.5 font-normal leading-relaxed">
                          {project.subtitle}
                        </p>

                        {/* Architecture tags & Vitals snippet */}
                        <div className="flex items-center gap-2.5 mt-2.5 font-mono text-[11px] text-white/45">
                          <span className="font-medium text-white/60">{project.category}</span>
                          <span className="text-white/30">•</span>
                          <span className="text-cyan-300/90 font-bold">{project.vitals.lcp} LCP</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-2.5 shrink-0">
                      <span
                        className="px-2.5 py-1 rounded-md text-[10px] sm:text-[11px] font-mono uppercase tracking-wider font-bold border"
                        style={{
                          backgroundColor: `${project.accentColor}18`,
                          borderColor: `${project.accentColor}40`,
                          color: project.accentColor
                        }}
                      >
                        {project.role.split(' ')[0]}
                      </span>

                      <div
                        className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl items-center justify-center flex transition-all ${
                          isSelected
                            ? 'bg-white text-black shadow-md scale-105'
                            : 'bg-white/5 text-white/60 group-hover:bg-white/10 group-hover:text-white'
                        }`}
                      >
                        <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* RIGHT COLUMN (7 Cols): Interactive 3D Perspective Glass Stage */}
          <div
            className="w-full lg:col-span-7 relative"
            onTouchStart={handleCardTouchStart}
            onTouchEnd={handleCardTouchEnd}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProject.id}
                initial={{ opacity: 0, scale: 0.96, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: -12 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                  transform: `perspective(1100px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                  transition: 'transform 0.12s ease-out'
                }}
                className="relative rounded-3xl bg-[#0B0D13]/90 border border-white/20 backdrop-blur-2xl shadow-[0_30px_90px_rgba(0,0,0,0.85)] overflow-hidden flex flex-col justify-between group"
              >
                {/* Dynamic Cursor Light Glare Overlay */}
                <div
                  className="absolute inset-0 pointer-events-none z-30 transition-opacity duration-300"
                  style={{
                    background: `radial-gradient(circle 350px at ${tilt.glareX}% ${tilt.glareY}%, rgba(255,255,255,0.08) 0%, transparent 70%)`
                  }}
                />

                {/* Dayak Corner Accents on High-Tech Card */}
                <DayakCornerAccent position="top-right" className="absolute top-3 right-3 w-4 h-4 text-white/20 z-20 pointer-events-none" />
                <DayakCornerAccent position="bottom-left" className="absolute bottom-3 left-3 w-4 h-4 text-white/20 z-20 pointer-events-none" />

                {/* ───────────────── BROWSER WINDOW CHROME & VIEWPORT SWITCHER ───────────────── */}
                <div className="px-3 sm:px-5 py-2.5 bg-neutral-900/90 border-b border-white/10 flex flex-wrap items-center justify-between gap-2 text-xs font-mono relative z-20">
                  
                  {/* Traffic lights & URL Bar */}
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                    </div>

                    <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-lg bg-black/60 border border-white/10 text-[11px] text-white/70">
                      <Lock className="w-3 h-3 text-emerald-400 shrink-0" />
                      <span className="truncate max-w-[210px]">
                        {activeProject.url !== '#' ? activeProject.url.replace(/^https?:\/\//, '') : `${activeProject.id}.ddev.studio`}
                      </span>
                    </div>
                  </div>

                  {/* INNOVATION: Multi-Device Viewport Mode Switcher & Tools */}
                  <div className="flex items-center gap-1.5">
                    
                    {/* Viewport Modes (Desktop / Mobile / Telemetry) */}
                    <div className="flex items-center p-0.5 rounded-lg bg-black/50 border border-white/10">
                      <button
                        onClick={() => setViewMode('desktop')}
                        aria-label="Tampilan Desktop Widescreen"
                        title="Desktop Viewport"
                        className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-mono transition-all cursor-pointer ${
                          viewMode === 'desktop'
                            ? 'bg-white text-black font-bold shadow-sm'
                            : 'text-white/60 hover:text-white'
                        }`}
                      >
                        <Monitor className="w-3 h-3" />
                        <span className="hidden md:inline">Desktop</span>
                      </button>

                      <button
                        onClick={() => setViewMode('mobile')}
                        aria-label="Tampilan Smartphone Mobile"
                        title="Mobile Phone Viewport"
                        className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-mono transition-all cursor-pointer ${
                          viewMode === 'mobile'
                            ? 'bg-white text-black font-bold shadow-sm'
                            : 'text-white/60 hover:text-white'
                        }`}
                      >
                        <Smartphone className="w-3 h-3" />
                        <span className="hidden md:inline">Mobile</span>
                      </button>

                      <button
                        onClick={() => setViewMode('telemetry')}
                        aria-label="Tampilan Spesifikasi Rekayasa & Vitals"
                        title="Engineering Telemetry HUD"
                        className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-mono transition-all cursor-pointer ${
                          viewMode === 'telemetry'
                            ? 'bg-cyan-400 text-black font-bold shadow-sm'
                            : 'text-cyan-400/70 hover:text-cyan-300'
                        }`}
                      >
                        <Activity className="w-3 h-3" />
                        <span className="hidden md:inline">HUD Vitals</span>
                      </button>
                    </div>

                    {/* QR Code Quick Mobile Test */}
                    <button
                      onClick={() => setQrModalProject(activeProject)}
                      aria-label="Buka QR code untuk membuka di smartphone"
                      title="Scan QR Code to open on Mobile"
                      className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 border border-white/10 text-white/70 hover:text-white transition-all cursor-pointer"
                    >
                      <QrCode className="w-3.5 h-3.5" />
                    </button>

                    {/* Copy Link Quick Action */}
                    <button
                      onClick={() => copyToClipboard(activeProject.url)}
                      aria-label="Salin tautan web proyek"
                      title={copiedUrl ? 'Tautan Tersalin!' : 'Salin URL'}
                      className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 border border-white/10 text-white/70 hover:text-white transition-all cursor-pointer"
                    >
                      {copiedUrl ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>

                  </div>
                </div>

                {/* ───────────────── PREVIEW STAGE (DESKTOP / MOBILE / TELEMETRY HUD) ───────────────── */}
                <div className="relative w-full bg-neutral-950 flex items-center justify-center overflow-hidden border-b border-white/10 min-h-[300px] sm:min-h-[380px]">
                  
                  {/* MODE 1: DESKTOP WIDESCREEN PREVIEW */}
                  {viewMode === 'desktop' && (
                    <button
                      type="button"
                      aria-label={`Buka studi kasus dan spesifikasi untuk ${activeProject.title}`}
                      onClick={() => setModalProject(activeProject)}
                      className="w-full aspect-[16/9] relative group/img cursor-pointer text-left focus-visible:outline-none"
                    >
                      <img
                        src={activeProject.image}
                        alt={`Screenshot platform ${activeProject.title}`}
                        width="900"
                        height="506"
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover object-top transition-transform duration-700 group-hover/img:scale-[1.03]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                      {/* Hover Prompt Overlay */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                        <span className="px-4 py-2 rounded-xl bg-black/85 border border-white/30 text-xs font-mono text-white flex items-center gap-2 shadow-2xl backdrop-blur-md">
                          <Sparkles className="w-3.5 h-3.5 text-cyan-400" aria-hidden="true" />
                          <span>Buka Case Study &amp; Spesifikasi Lengkap</span>
                        </span>
                      </div>

                      {/* Live Floating Metric Pill */}
                      <div className="absolute bottom-3 right-3 pointer-events-none flex items-center gap-2">
                        <span className="px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/15 text-xs font-mono text-cyan-300 shadow-lg font-bold">
                          {activeProject.highlightMetric}
                        </span>
                      </div>
                    </button>
                  )}

                  {/* MODE 2: MOBILE SMARTPHONE VIEWPORT MOCKUP */}
                  {viewMode === 'mobile' && (
                    <div className="py-6 flex flex-col items-center justify-center w-full">
                      <div className="relative w-[280px] sm:w-[320px] aspect-[9/18] rounded-[42px] p-3 bg-neutral-900 border-4 border-neutral-700 shadow-2xl overflow-hidden flex flex-col">
                        {/* iPhone Dynamic Island */}
                        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-5 rounded-full bg-black flex items-center justify-between px-2.5 z-20">
                          <span className="w-2 h-2 rounded-full bg-neutral-800" />
                          <span className="w-2 h-2 rounded-full bg-blue-500/40" />
                        </div>

                        {/* Mobile Screen Container with crop & simulated scroll */}
                        <div className="w-full h-full rounded-[30px] overflow-hidden relative bg-neutral-950">
                          <img
                            src={activeProject.image}
                            alt={`Mobile preview platform ${activeProject.title}`}
                            className="w-full h-full object-cover object-top hover:object-bottom transition-all duration-1000 cursor-ns-resize"
                            title="Arahkan kursor ke bawah untuk simulasi gulir tampilan mobile"
                          />
                          <div className="absolute bottom-2 inset-x-0 flex justify-center pointer-events-none">
                            <span className="w-28 h-1 rounded-full bg-white/40" />
                          </div>
                        </div>
                      </div>
                      <span className="text-[11px] font-mono text-white/50 mt-2">
                        iPhone 16 Pro Viewport • Arahkan kursor untuk simulasi gulir
                      </span>
                    </div>
                  )}

                  {/* MODE 3: ENGINEERING TELEMETRY HUD OVERLAY */}
                  {viewMode === 'telemetry' && (
                    <div className="w-full p-6 sm:p-8 flex flex-col justify-between gap-6 bg-gradient-to-br from-[#0c0f17] to-[#06080d]">
                      {/* Telemetry Header */}
                      <div className="flex items-center justify-between border-b border-white/10 pb-4">
                        <div className="flex items-center gap-2">
                          <Activity className="w-4 h-4 text-cyan-400 animate-pulse" />
                          <span className="font-mono text-xs font-bold uppercase tracking-wider text-cyan-300">
                            Live Engineering Telemetry &amp; Architecture HUD
                          </span>
                        </div>
                        <span className="font-mono text-[10px] text-emerald-400 font-bold px-2 py-0.5 rounded bg-emerald-500/15 border border-emerald-500/30">
                          SCORE 100/100 AUDIT
                        </span>
                      </div>

                      {/* 4 Core Web Vitals Gauges */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col">
                          <span className="font-mono text-[10px] uppercase text-white/50">LCP (Largest Paint)</span>
                          <span className="font-mono text-2xl font-black text-emerald-400 mt-1">
                            {activeProject.vitals.lcp}
                          </span>
                          <span className="font-mono text-[9px] text-emerald-300/80 mt-0.5">Sub-0.6s Target Met</span>
                        </div>

                        <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col">
                          <span className="font-mono text-[10px] uppercase text-white/50">INP (Responsiveness)</span>
                          <span className="font-mono text-2xl font-black text-cyan-400 mt-1">
                            {activeProject.vitals.inp}
                          </span>
                          <span className="font-mono text-[9px] text-cyan-300/80 mt-0.5">Sub-50ms Ultra Low</span>
                        </div>

                        <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col">
                          <span className="font-mono text-[10px] uppercase text-white/50">CLS (Layout Shift)</span>
                          <span className="font-mono text-2xl font-black text-purple-400 mt-1">
                            {activeProject.vitals.cls}
                          </span>
                          <span className="font-mono text-[9px] text-purple-300/80 mt-0.5">Zero Shift Guarantee</span>
                        </div>

                        <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col">
                          <span className="font-mono text-[10px] uppercase text-white/50">Performance Score</span>
                          <span className="font-mono text-2xl font-black text-amber-400 mt-1">
                            {activeProject.vitals.score}/100
                          </span>
                          <span className="font-mono text-[9px] text-amber-300/80 mt-0.5">Google Lighthouse Verified</span>
                        </div>
                      </div>

                      {/* Architecture & Server Protocol Breakdown */}
                      <div className="p-4 rounded-2xl bg-black/40 border border-white/10 flex flex-col gap-2 font-mono text-xs">
                        <div className="flex items-center justify-between text-white/70">
                          <span>Infrastruktur Distribusi:</span>
                          <span className="text-white font-bold">{activeProject.serverTech}</span>
                        </div>
                        <div className="flex items-center justify-between text-white/70">
                          <span>Protokol Keamanan:</span>
                          <span className="text-emerald-400 font-bold">TLS 1.3 • HTTP/3 QUIC • Strict CSP</span>
                        </div>
                        <div className="flex items-center justify-between text-white/70">
                          <span>Standar Aksesibilitas:</span>
                          <span className="text-cyan-300 font-bold">WCAG 2.1 AA Compliant • Valid Schema.org</span>
                        </div>
                      </div>

                      {/* Architecture Badges */}
                      <div className="flex flex-wrap gap-2">
                        {activeProject.archBadges.map((badge, bIdx) => (
                          <span
                            key={bIdx}
                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white/5 border border-white/10 text-white/80 font-mono text-[11px]"
                          >
                            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                            {badge}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                </div>

                {/* ───────────────── CARD CONTENT & ACTION BAR ───────────────── */}
                <div className="p-5 sm:p-7 flex flex-col justify-between gap-4">
                  <div>
                    <div className="flex flex-col gap-1.5 mb-2">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-bold">
                          {activeProject.category}
                        </span>
                        <span className="text-xs font-mono text-white/50">
                          {activeProject.year}
                        </span>
                      </div>

                      <h3 className="text-xl sm:text-3xl font-display font-black text-white leading-tight">
                        {activeProject.title}
                      </h3>
                      <p className="text-xs sm:text-sm font-sans text-white/70 font-medium">
                        {activeProject.subtitle}
                      </p>
                    </div>

                    <p className="text-xs sm:text-sm text-white/80 font-normal leading-relaxed line-clamp-2 sm:line-clamp-3">
                      {activeProject.description}
                    </p>

                    {/* Quick Metric Points */}
                    {activeProject.caseStudy?.metrics && (
                      <div className="grid grid-cols-3 gap-2.5 mt-4 pt-3 border-t border-white/10">
                        {activeProject.caseStudy.metrics.map((m, mIdx) => (
                          <div
                            key={mIdx}
                            className="flex flex-col text-left p-2.5 rounded-xl bg-white/[0.03] border border-white/10"
                          >
                            <span className="text-[10px] font-mono text-white/50 uppercase tracking-tight truncate">
                              {m.label}
                            </span>
                            <span
                              className="text-xs sm:text-sm font-mono font-bold truncate mt-0.5"
                              style={{ color: activeProject.accentColor }}
                            >
                              {m.val}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Tech Stack Pills & CTAs */}
                  <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex flex-wrap items-center gap-1.5 flex-1 min-w-[200px]">
                      {activeProject.tech.map((t, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 rounded-md text-[10px] sm:text-[11px] font-mono bg-white/[0.05] border border-white/10 text-white/80 whitespace-nowrap"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 shrink-0">
                      <button
                        onClick={() => setModalProject(activeProject)}
                        className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono font-bold bg-white/10 hover:bg-white/20 border border-white/25 text-white transition-all shadow-md cursor-pointer hover:scale-105 active:scale-95 shrink-0 whitespace-nowrap"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        <span className="whitespace-nowrap">Case Study &amp; Specs</span>
                      </button>

                      {activeProject.url && activeProject.url !== '#' && (
                        <a
                          href={activeProject.url}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono font-bold text-black transition-all shadow-md cursor-pointer hover:scale-105 active:scale-95 shrink-0 whitespace-nowrap"
                          style={{ backgroundColor: activeProject.accentColor }}
                        >
                          <span className="whitespace-nowrap">Kunjungi Platform</span>
                          <ExternalLink className="w-3.5 h-3.5 shrink-0" />
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

      {/* ───────────────── 6. QR CODE QUICK MOBILE LAUNCH MODAL ───────────────── */}
      <AnimatePresence>
        {qrModalProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 select-text">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setQrModalProject(null)}
              className="absolute inset-0 bg-black/85 backdrop-blur-md cursor-pointer"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 15 }}
              className="relative w-full max-w-sm rounded-3xl bg-[#0e1017] border border-white/20 p-6 flex flex-col items-center text-center shadow-2xl z-10"
            >
              <div className="flex items-center justify-between w-full mb-4">
                <span className="font-mono text-xs uppercase tracking-wider text-cyan-400 font-bold">
                  Buka di Smartphone
                </span>
                <button
                  onClick={() => setQrModalProject(null)}
                  className="p-1 rounded-lg bg-white/5 hover:bg-white/15 text-white/70"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* QR Image from fast CDN */}
              <div className="p-3 rounded-2xl bg-white shadow-xl my-2">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(qrModalProject.url)}`}
                  alt={`QR Code untuk ${qrModalProject.title}`}
                  width="220"
                  height="220"
                  className="w-48 h-48"
                />
              </div>

              <span className="font-sans font-bold text-base text-white mt-3">
                {qrModalProject.title}
              </span>
              <p className="font-mono text-xs text-white/60 mt-1 break-all px-2">
                {qrModalProject.url}
              </p>

              <button
                onClick={() => copyToClipboard(qrModalProject.url)}
                className="w-full mt-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 font-mono text-xs font-bold text-white flex items-center justify-center gap-2 cursor-pointer"
              >
                {copiedUrl ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedUrl ? 'Tautan Berhasil Disalin!' : 'Salin Tautan'}</span>
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ───────────────── 7. DEEP-DIVE CASE STUDY & SPECS MODAL ───────────────── */}
      <AnimatePresence>
        {modalProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 select-text">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setModalProject(null)}
              className="absolute inset-0 bg-black/85 backdrop-blur-md cursor-pointer"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              transition={{ type: 'spring', stiffness: 350, damping: 30 }}
              className="relative w-full max-w-3xl max-h-[88vh] rounded-3xl bg-[#090a10] border border-white/20 shadow-[0_25px_80px_rgba(0,0,0,0.95)] overflow-hidden flex flex-col z-10"
            >
              {/* Modal Header */}
              <div className="px-6 py-4 bg-neutral-900/90 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
                  <span className="text-xs font-mono font-bold tracking-wider text-white/75 uppercase">
                    Studi Kasus • {modalProject.num}
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

              {/* Scrollable Content */}
              <div className="p-6 sm:p-7 overflow-y-auto space-y-6 custom-scrollbar">
                
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
                  <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10">
                    <span className="text-[10px] font-mono font-bold tracking-widest text-red-400 uppercase block mb-2">
                      Tantangan Arsitektur
                    </span>
                    <p className="text-xs sm:text-sm text-white/80 font-normal leading-relaxed">
                      {modalProject.caseStudy?.challenge}
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10">
                    <span className="text-[10px] font-mono font-bold tracking-widest text-emerald-400 uppercase block mb-2">
                      Solusi Rekayasa
                    </span>
                    <p className="text-xs sm:text-sm text-white/80 font-normal leading-relaxed">
                      {modalProject.caseStudy?.solution}
                    </p>
                  </div>
                </div>

                {/* 3 Key Metrics Cards */}
                <div className="grid grid-cols-3 gap-3">
                  {modalProject.caseStudy?.metrics.map((m, mIdx) => (
                    <div
                      key={mIdx}
                      className="p-4 rounded-2xl bg-neutral-950/60 border border-white/10 text-center flex flex-col justify-center"
                    >
                      <span
                        className="text-xl sm:text-2xl font-display font-black"
                        style={{ color: modalProject.accentColor }}
                      >
                        {m.val}
                      </span>
                      <span className="text-[10px] sm:text-xs font-mono text-white/70 mt-1">
                        {m.label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Deliverables & Technology Chips */}
                <div>
                  <span className="text-[10px] font-mono text-white/70 uppercase tracking-widest block mb-2.5">
                    Hasil Rekayasa &amp; Komponen Kunci
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {modalProject.caseStudy?.deliverables.map((del, dIdx) => (
                      <span
                        key={dIdx}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-mono"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                        <span>{del}</span>
                      </span>
                    ))}
                    {modalProject.tech.map((t, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-white/70 text-xs font-mono"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
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
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold text-black transition-all shadow-md hover:scale-105 cursor-pointer"
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
