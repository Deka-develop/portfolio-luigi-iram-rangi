import { useState, useEffect, lazy, Suspense } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { DayakShieldEmblem } from './components/DayakMotifs';

import Hero from './components/Hero';

// Code-split below-the-fold sections
const Projects = lazy(() => import('./components/Projects'));
const JourneySection = lazy(() => import('./components/JourneySection'));
const Skills = lazy(() => import('./components/Skills'));
const Contact = lazy(() => import('./components/Contact'));

const sectionList = [
  { id: 'hero', name: 'Beranda', Component: Hero },
  { id: 'works', name: 'Karya Terpilih', Component: Projects },
  { id: 'journey', name: 'Milestone 3D', Component: JourneySection },
  { id: 'expertise', name: 'Kapabilitas', Component: Skills },
  { id: 'contact', name: 'Kontak', Component: Contact }
];

function App() {
  const [activeSection, setActiveSection] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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

  // Smooth scroll to section
  const scrollToSection = (index) => {
    if (index < 0 || index >= sectionList.length) return;
    setActiveSection(index);
    setIsMobileMenuOpen(false);
    const target = document.getElementById(sectionList[index]?.id);
    if (target) {
      const top = index === 0 ? 0 : target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  // Section Observer for Active Nav Link
  useEffect(() => {
    const observers = [];
    sectionList.forEach((sec, index) => {
      const el = document.getElementById(sec.id);
      if (!el) return;
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) setActiveSection(index);
          });
        },
        { rootMargin: '-35% 0px -35% 0px', threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // ESC to close mobile menu
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setIsMobileMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <main className="relative w-full bg-[#EDEEF0] text-[#111111] overflow-x-clip min-h-screen">
      
      {/* ───────────────── BESPOKE FLOATING GLASS HEADER ───────────────── */}
      <header className="fixed top-0 left-0 w-full z-50 bg-[#EDEEF0]/85 backdrop-blur-md border-b border-[#111111]/10 transition-all duration-300">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 md:px-12 h-16 md:h-20 flex items-center justify-between">
          
          {/* Left: Brand Identity with Minimalist Logo */}
          <button
            onClick={() => scrollToSection(0)}
            className="flex items-center gap-3 group text-left cursor-pointer"
            aria-label="Kembali ke beranda"
          >
            <div className="w-9 h-9 rounded-[10px] overflow-hidden flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
              <DayakShieldEmblem className="w-9 h-9" />
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

          {/* Center: Desktop Clean Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-white/70 backdrop-blur-md border border-[#111111]/10 px-3 py-1.5 rounded-full shadow-sm">
            {sectionList.map((item, idx) => {
              const isActive = activeSection === idx;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(idx)}
                  className={`relative px-4 py-1.5 rounded-full font-mono text-[11px] uppercase tracking-wider transition-all duration-300 cursor-pointer flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-[#111111] text-white font-bold shadow-sm'
                      : 'text-[#111111]/60 hover:text-[#111111] hover:bg-black/5'
                  }`}
                >
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#684AFF]" />}
                  <span>{item.name}</span>
                </button>
              );
            })}
          </nav>

          {/* Right: Live Clock & Action CTA */}
          <div className="flex items-center gap-4">
            {/* Live Pontianak Clock */}
            <div className="hidden sm:flex items-center gap-2 font-mono text-xs text-[#111111]/60 pr-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
              <span>PTK {timeWIB} WIB</span>
            </div>

            {/* Direct Contact Button */}
            <a
              href="mailto:iramrangi@gmail.com"
              className="hidden md:inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#111111] text-[#EDEEF0] font-sans text-xs font-bold uppercase tracking-wider hover:bg-[#684AFF] transition-all duration-300 shadow-sm"
            >
              <span>Mulai Proyek</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              aria-label={isMobileMenuOpen ? 'Tutup navigasi' : 'Buka navigasi'}
              className="lg:hidden w-10 h-10 rounded-full border border-[#111111]/15 bg-white flex items-center justify-center hover:bg-[#111111] hover:text-white transition-colors cursor-pointer shadow-sm"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </header>

      {/* ───────────────── MOBILE SLIDE-DOWN DRAWER ───────────────── */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
            />
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-x-4 top-20 z-50 rounded-[24px] bg-white border border-[#111111]/10 p-6 shadow-2xl flex flex-col gap-4 lg:hidden"
            >
              <div className="flex flex-col gap-1.5">
                {sectionList.map((item, idx) => {
                  const isActive = activeSection === idx;
                  return (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(idx)}
                      className={`flex items-center justify-between px-4 py-3 rounded-[14px] text-left font-mono text-xs uppercase tracking-wider transition-all cursor-pointer ${
                        isActive
                          ? 'bg-[#111111] text-white font-bold'
                          : 'text-[#111111] hover:bg-black/5'
                      }`}
                    >
                      <span>{item.name}</span>
                      {isActive && <span className="w-2 h-2 rounded-full bg-[#684AFF]" />}
                    </button>
                  );
                })}
              </div>

              <div className="pt-3 border-t border-[#111111]/10 flex flex-col gap-3">
                <a
                  href="mailto:iramrangi@gmail.com"
                  className="w-full py-3 rounded-full bg-[#684AFF] text-white text-center font-sans text-xs uppercase font-bold tracking-widest flex items-center justify-center gap-2 shadow-md"
                >
                  <span>Mulai Proyek Bersama</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>

                <div className="flex items-center justify-between font-mono text-[10px] text-[#111111]/50 px-2">
                  <span>PTK {timeWIB} WIB</span>
                  <span>0°01′S 109°20′E</span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ───────────────── MAIN CONTENT SECTIONS ───────────────── */}
      <div className="relative z-10 w-full flex flex-col">
        {sectionList.map((section) => {
          const Component = section.Component;
          return (
            <div key={section.id} id={section.id} className="w-full relative">
              <Suspense
                fallback={
                  <div className="w-full min-h-[50vh] bg-[#EDEEF0] flex items-center justify-center">
                    <span className="font-mono text-xs uppercase tracking-widest text-[#111111]/30">
                      Memuat {section.name}...
                    </span>
                  </div>
                }
              >
                <Component setActiveSection={scrollToSection} />
              </Suspense>
            </div>
          );
        })}
      </div>

    </main>
  );
}

export default App;
