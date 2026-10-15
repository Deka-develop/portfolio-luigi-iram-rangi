import { useState, useEffect, lazy, Suspense, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, ArrowUpRight, ArrowLeft, ChevronRight } from 'lucide-react';
import { DayakShieldEmblem } from './components/DayakMotifs';

import Hero from './components/Hero';

// Dedicated standalone pages
const ProjectsPage = lazy(() => import('./pages/ProjectsPage'));
const MilestonePage = lazy(() => import('./pages/MilestonePage'));
const SkillsPage = lazy(() => import('./pages/SkillsPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));

// Scroll-driven animated introduction journey
const IntroductionJourney = lazy(() => import('./components/IntroductionJourney'));

function getRouteFromHash() {
  if (typeof window === 'undefined') return 'home';
  const hash = window.location.hash.toLowerCase().replace(/^#\/?/, '');
  if (hash.startsWith('karya') || hash.startsWith('project') || hash.startsWith('work')) return 'karya';
  if (hash.startsWith('pusaka') || hash.startsWith('rekam-jejak') || hash.startsWith('milestone')) return 'milestone-3d';
  if (hash.startsWith('kapabilitas') || hash.startsWith('skill') || hash.startsWith('expertise')) return 'kapabilitas';
  if (hash.startsWith('kontak') || hash.startsWith('contact')) return 'kontak';
  return 'home';
}

function App() {
  const [route, setRoute] = useState(getRouteFromHash);
  const [isRightNavOpen, setIsRightNavOpen] = useState(false);
  const [timeWIB, setTimeWIB] = useState('');

  // Live Pontianak WIB Clock
  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date();
        const formatter = new Intl.DateTimeFormat('id-ID', {
          timeZone: 'Asia/Pontianak',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false
        });
        setTimeWIB(formatter.format(now));
      } catch {
        setTimeWIB('01:00:00');
      }
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Listen to hash changes (browser back/forward & direct URL links)
  useEffect(() => {
    const handleHash = () => {
      const newRoute = getRouteFromHash();
      setRoute(newRoute);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  // Synchronize dynamic SEO title, descriptions & canonical references per route
  useEffect(() => {
    const metaDescriptions = {
      home: 'Portofolio Luigi Iram Rangi — Founder of Ddev (Dayak Developer) & Creative Developer, merancang arsitektur web modern, WebGL 3D, platform interaktif, dan sistem digital berkinerja tinggi dari Kalimantan Barat.',
      karya: 'Portfolio — Luigi Iram Rangi | Founder of Ddev. Eksplorasi 8 proyek web produksi, arsitektur headless, dan studi kasus sistem skala regional & internasional.',
      'milestone-3d': 'Pusaka Spasial & Rekam Jejak — Luigi Iram Rangi | Founder of Ddev. Arsip eksklusif 4 model 3D pusaka digital Dayak (Talawang, Cyber Mandau, Bunga Terong, Batang Garing), visualisasi WebGL spasial, dan tolok ukur rekayasa berkinerja tinggi.',
      kapabilitas: 'Kapabilitas & Cyber Arcade — Luigi Iram Rangi | Founder of Ddev. Spesifikasi arsitektur performa tinggi, skor Google PageSpeed 100/100, dan simulator interaktif Cyber Arcade.',
      kontak: 'Kontak & Konsultasi — Luigi Iram Rangi | Founder of Ddev. Diskusikan arsitektur sistem baru, optimasi web vitals, atau kemitraan digital strategis.'
    };

    const titles = {
      home: 'Luigi Iram Rangi — Founder of Ddev | Creative Developer & WebGL Specialist',
      karya: 'Portfolio — Luigi Iram Rangi | Founder of Ddev',
      'milestone-3d': 'Pusaka Spasial & Rekam Jejak — Luigi Iram Rangi | Founder of Ddev',
      kapabilitas: 'Kapabilitas & Cyber Arcade — Luigi Iram Rangi | Founder of Ddev',
      kontak: 'Kontak & Kolaborasi — Luigi Iram Rangi | Founder of Ddev'
    };

    const targetTitle = titles[route] || titles.home;
    const targetDesc = metaDescriptions[route] || metaDescriptions.home;

    document.title = targetTitle;

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', targetDesc);

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', targetTitle);

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', targetDesc);

    const twTitle = document.querySelector('meta[name="twitter:title"]');
    if (twTitle) twTitle.setAttribute('content', targetTitle);

    const twDesc = document.querySelector('meta[name="twitter:description"]');
    if (twDesc) twDesc.setAttribute('content', targetDesc);
  }, [route]);

  // Unified Multi-Page Navigation Handler
  const navigateTo = (destination) => {
    setIsRightNavOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (destination === 'karya' || destination === 'works' || destination === 'projects') {
      window.location.hash = '/karya';
      setRoute('karya');
    } else if (
      destination === 'milestone-3d' ||
      destination === 'milestone' ||
      destination === 'pusaka-spasial' ||
      destination === 'pusaka' ||
      destination === 'rekam-jejak'
    ) {
      window.location.hash = '/pusaka-spasial';
      setRoute('milestone-3d');
    } else if (destination === 'kapabilitas' || destination === 'skills' || destination === 'expertise') {
      window.location.hash = '/kapabilitas';
      setRoute('kapabilitas');
    } else if (destination === 'kontak' || destination === 'contact') {
      window.location.hash = '/kontak';
      setRoute('kontak');
    } else {
      window.location.hash = '/';
      setRoute('home');
    }
  };

  // ESC to close right navigation menu
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setIsRightNavOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const navItems = useMemo(
    () => [
      { id: 'home', num: '01', name: 'Beranda', desc: 'Pengenalan & Visi Spasial Dayak', target: 'home' },
      { id: 'karya', num: '02', name: 'Portfolio', desc: 'Katalog 8 Proyek Web Produksi', target: 'karya', badge: 'Halaman Portfolio' },
      { id: 'milestone-3d', num: '03', name: 'Pusaka Spasial', desc: 'Arsip Pusaka Digital & Rekam Jejak 3D', target: 'milestone-3d', badge: 'Halaman 3D' },
      { id: 'kapabilitas', num: '04', name: 'Kapabilitas', desc: 'Spesifikasi Teknis & Cyber Arcade', target: 'kapabilitas', badge: 'Halaman Khusus' },
      { id: 'kontak', num: '05', name: 'Kontak', desc: 'Kolaborasi & Diskusi Rekayasa', target: 'kontak', badge: 'Halaman Khusus' }
    ],
    []
  );

  // Active page label for top header
  const getPageBadge = () => {
    switch (route) {
      case 'karya':
        return 'Halaman Portfolio';
      case 'milestone-3d':
        return 'Halaman Pusaka Spasial';
      case 'kapabilitas':
        return 'Halaman Kapabilitas';
      case 'kontak':
        return 'Halaman Kontak';
      default:
        return null;
    }
  };

  const pageBadge = getPageBadge();

  return (
    <div className="relative w-full bg-[#EDEEF0] text-[#111111] overflow-x-clip min-h-screen">
      {/* ───────────────── ACCESSIBILITY: SKIP TO MAIN CONTENT LINK ───────────────── */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2.5 focus:bg-[#111111] focus:text-white focus:rounded-xl focus:shadow-2xl focus:ring-2 focus:ring-[#684AFF] focus:outline-none font-mono text-xs uppercase tracking-wider font-bold transition-all"
      >
        Lewati ke konten utama
      </a>
      
      {/* ───────────────── MINIMALIST FLOATING GLASS TOPBAR ───────────────── */}
      <header className="fixed top-0 left-0 w-full z-40 bg-[#EDEEF0]/85 backdrop-blur-md border-b border-[#111111]/10 transition-all duration-300">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 md:px-12 h-16 md:h-20 flex items-center justify-between">
          
          {/* Left: Brand Identity */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigateTo('home')}
              className="flex items-center gap-3 group text-left cursor-pointer"
              aria-label="Kembali ke beranda"
            >
              <div className="w-9 h-9 rounded-[10px] overflow-hidden flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform bg-[#111111]">
                <DayakShieldEmblem className="w-7 h-7 text-[#EDEEF0]" />
              </div>
              <div className="flex flex-col">
                <span className="font-sans font-bold text-xs md:text-sm uppercase tracking-wider text-[#111111] leading-tight">
                  Luigi Iram Rangi
                </span>
                <span className="font-mono text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-[#111111]/50 leading-none mt-0.5">
                  Ddev Studio • West Borneo
                </span>
              </div>
            </button>

            {/* Current Dedicated Page Badge */}
            {pageBadge && (
              <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#684AFF]/10 border border-[#684AFF]/25 text-[#684AFF] font-mono text-[10px] uppercase tracking-wider font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#684AFF] animate-pulse" />
                {pageBadge}
              </span>
            )}
          </div>

          {/* Right: Actions & Menu Toggle Trigger Button */}
          <div className="flex items-center gap-3 md:gap-4">
            
            {/* Live Pontianak Clock */}
            <div className="hidden sm:flex items-center gap-2 font-mono text-xs text-[#111111]/60 pr-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
              <span>PTK {timeWIB} WIB</span>
            </div>

            {/* Contextual Back to Home button if on any dedicated page */}
            {route !== 'home' ? (
              <button
                onClick={() => navigateTo('home')}
                className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white border border-[#111111]/15 text-[#111111] font-sans text-xs font-bold uppercase tracking-wider hover:bg-[#111111] hover:text-white transition-all duration-300 shadow-sm cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Beranda</span>
              </button>
            ) : null}
          </div>

        </div>
      </header>

      {/* ───────────────── FLOATING RIGHT-EDGE DOCK TRIGGER (When Menu Hidden) ───────────────── */}
      {!isRightNavOpen && (
        <motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          onClick={() => setIsRightNavOpen(true)}
          aria-expanded={false}
          aria-controls="side-navigation-drawer"
          aria-label="Buka Menu Navigasi Samping"
          className="fixed right-2.5 sm:right-4 md:right-5 top-1/2 -translate-y-1/2 z-40 flex flex-col items-center gap-2.5 px-2.5 py-4 rounded-full bg-white/95 backdrop-blur-md border border-[#111111]/15 shadow-xl hover:shadow-2xl hover:border-[#684AFF] hover:scale-105 transition-all duration-300 cursor-pointer group focus-visible:ring-2 focus-visible:ring-[#684AFF] focus-visible:outline-none"
        >
          <div className="w-7 h-7 rounded-full bg-[#111111] text-white flex items-center justify-center group-hover:bg-[#684AFF] transition-colors shadow-sm">
            <Menu className="w-3.5 h-3.5" aria-hidden="true" />
          </div>
          <span className="[writing-mode:vertical-rl] font-mono text-[9px] uppercase tracking-[0.25em] text-[#111111]/70 group-hover:text-[#111111] font-bold">
            NAVIGASI
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#684AFF] animate-pulse" aria-hidden="true" />
        </motion.button>
      )}

      {/* ───────────────── COLLAPSIBLE RIGHT-SIDE NAVIGATION DRAWER ───────────────── */}
      <AnimatePresence>
        {isRightNavOpen && (
          <>
            {/* Backdrop Blur Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsRightNavOpen(false)}
              aria-hidden="true"
              className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm cursor-pointer"
            />

            {/* Sliding Panel from Right Side */}
            <motion.aside
              id="side-navigation-drawer"
              aria-label="Menu Navigasi Samping"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 260 }}
              className="fixed top-0 right-0 h-full w-full sm:w-[420px] md:w-[460px] z-50 bg-white border-l border-[#111111]/10 shadow-[-20px_0_60px_rgba(0,0,0,0.25)] flex flex-col justify-between p-6 sm:p-8 md:p-10 overflow-y-auto"
            >
              {/* Drawer Top Header */}
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-[#111111]/10">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-[8px] bg-[#111111] flex items-center justify-center">
                      <DayakShieldEmblem className="w-6 h-6 text-[#EDEEF0]" />
                    </div>
                    <div>
                      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#111111]/50 block">
                        Direktori Studio
                      </span>
                      <span className="font-sans font-bold text-xs uppercase tracking-wider text-[#111111]">
                        Pilih Halaman Mandiri
                      </span>
                    </div>
                  </div>

                  {/* Sembunyikan / Hide Button */}
                  <button
                    onClick={() => setIsRightNavOpen(false)}
                    aria-label="Sembunyikan menu navigasi samping"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#111111]/5 hover:bg-[#111111] hover:text-white transition-all text-[11px] font-mono uppercase tracking-wider text-[#111111] cursor-pointer focus-visible:ring-2 focus-visible:ring-[#684AFF] focus-visible:outline-none"
                  >
                    <span>Sembunyikan</span>
                    <X className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                </div>

                {/* Section Directory Tag */}
                <div className="mt-8 mb-4 flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.25em] text-[#111111]/40">
                  <span>// DAFTAR HALAMAN TERSENDIRI</span>
                  <span>[05 HALAMAN]</span>
                </div>

                {/* Menu Items List */}
                <nav className="flex flex-col gap-2" aria-label="Halaman Portofolio">
                  {navItems.map((item) => {
                    const isActive = route === item.target;

                    return (
                      <button
                        key={item.id}
                        onClick={() => navigateTo(item.target)}
                        aria-current={isActive ? 'page' : undefined}
                        className={`group p-4 rounded-[18px] text-left transition-all duration-300 cursor-pointer flex items-center justify-between border focus-visible:ring-2 focus-visible:ring-[#684AFF] focus-visible:outline-none ${
                          isActive
                            ? 'bg-[#111111] text-white border-[#111111] shadow-md'
                            : 'bg-[#EDEEF0]/50 hover:bg-[#EDEEF0] text-[#111111] border-transparent hover:border-[#111111]/10'
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <span
                            className={`font-mono text-xs tracking-widest ${
                              isActive ? 'text-[#684AFF] font-bold' : 'text-[#111111]/30 group-hover:text-[#684AFF]'
                            }`}
                          >
                            {item.num}
                          </span>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-sans font-bold text-base md:text-lg tracking-tight">
                                {item.name}
                              </span>
                              {item.badge && (
                                <span
                                  className={`px-2 py-0.5 rounded-full text-[9px] font-mono uppercase tracking-wider font-bold ${
                                    isActive ? 'bg-[#684AFF] text-white' : 'bg-[#684AFF]/15 text-[#684AFF]'
                                  }`}
                                >
                                  {item.badge}
                                </span>
                              )}
                            </div>
                            <span
                              className={`block font-mono text-[10px] mt-0.5 ${
                                isActive ? 'text-white/60' : 'text-[#111111]/50'
                              }`}
                            >
                              {item.desc}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          {isActive && <span className="w-2 h-2 rounded-full bg-[#684AFF] animate-pulse" aria-hidden="true" />}
                          <ChevronRight
                            className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${
                              isActive ? 'text-white' : 'text-[#111111]/30 group-hover:text-[#111111]'
                            }`}
                            aria-hidden="true"
                          />
                        </div>
                      </button>
                    );
                  })}
                </nav>
              </div>

              {/* Drawer Bottom Actions & Footer */}
              <div className="pt-6 border-t border-[#111111]/10 flex flex-col gap-4 mt-8">
                <button
                  onClick={() => navigateTo('kontak')}
                  className="w-full py-3.5 rounded-full bg-[#111111] text-white hover:bg-[#684AFF] text-center font-sans text-xs uppercase font-bold tracking-widest flex items-center justify-center gap-2 shadow-md transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-[#684AFF] focus-visible:outline-none"
                >
                  <span>Mulai Proyek Bersama</span>
                  <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                </button>

                <div className="flex items-center justify-between font-mono text-[10px] text-[#111111]/50 px-1">
                  <span>PTK {timeWIB} WIB</span>
                  <span>0°01′S 109°20′E</span>
                </div>

                <div className="text-center font-mono text-[9px] text-[#111111]/40 uppercase tracking-widest">
                  Tekan [ESC] atau klik di luar untuk menyembunyikan
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* ───────────────── MULTI-PAGE ROUTE CONTENT VIEWPORT ───────────────── */}
      <main id="main-content" tabIndex={-1} className="relative z-10 w-full outline-none">
        <Suspense
          fallback={
            <div className="w-full min-h-screen bg-[#EDEEF0] flex flex-col items-center justify-center gap-3">
              <DayakShieldEmblem className="w-10 h-10 text-[#684AFF] animate-pulse" color="#684AFF" />
              <span className="font-mono text-xs uppercase tracking-widest text-[#111111]/40">
                Memuat Halaman...
              </span>
            </div>
          }
        >
          {route === 'karya' && <ProjectsPage onNavigate={navigateTo} />}

          {route === 'milestone-3d' && <MilestonePage onNavigate={navigateTo} />}

          {route === 'kapabilitas' && <SkillsPage onNavigate={navigateTo} />}

          {route === 'kontak' && <ContactPage onNavigate={navigateTo} />}

          {route === 'home' && (
            <div className="relative w-full flex flex-col">
              {/* Monumental Hero Opening (Sticky Layer 1) */}
              <Hero
                onNavigateToProjects={() => navigateTo('karya')}
                onNavigateToMilestone={() => navigateTo('milestone-3d')}
              />

              {/* Stacked Card Section Scroll Transitions (Layers 2, 3, 4, 5) */}
              <IntroductionJourney onNavigate={navigateTo} />
            </div>
          )}
        </Suspense>
      </main>

    </div>
  );
}

export default App;
