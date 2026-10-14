import { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { DayakShieldEmblem, DayakBorderRibbon } from './components/DayakMotifs';

import Hero from './components/Hero';

// Code-split below-the-fold sections
const About = lazy(() => import('./components/About'));
const Projects = lazy(() => import('./components/Projects'));
const Skills = lazy(() => import('./components/Skills'));
const Contact = lazy(() => import('./components/Contact'));

const sectionList = [
  { id: 'hero', num: '00', name: 'Beranda', Component: Hero },
  { id: 'work', num: '01', name: 'Karya', Component: Projects },
  { id: 'about', num: '02', name: 'Akar & Visi', Component: About },
  { id: 'expertise', num: '03', name: 'Keahlian', Component: Skills },
  { id: 'contact', num: '04', name: 'Kontak', Component: Contact }
];

/* Refined Cultural Editorial Preloader */
function Preloader({ onDone }) {
  useEffect(() => {
    const timer = setTimeout(onDone, 950);
    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      className="fixed inset-0 z-[9999] bg-paper flex flex-col items-center justify-center p-6 pointer-events-auto"
    >
      <div className="flex flex-col items-center gap-4 text-center">
        <motion.div
          initial={{ scale: 0.8, rotate: -15, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <DayakShieldEmblem className="w-14 h-14 text-ochre" color="#D97706" />
        </motion.div>

        <div className="flex flex-col items-center gap-1">
          <span className="font-sans font-black text-ink text-sm uppercase tracking-[0.3em]">
            Luigi Iram Rangi
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-ink/60">
            Ddev Cultural Computing • West Borneo
          </span>
        </div>

        <div className="w-36 h-[2px] bg-ink/10 relative overflow-hidden mt-3">
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{ duration: 0.9, ease: 'easeInOut', repeat: Infinity }}
            className="absolute inset-0 bg-ochre w-full"
          />
        </div>
      </div>
    </motion.div>
  );
}

function App() {
  const [activeSection, setActiveSection] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
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
        setTimeWIB('19:00:00');
      }
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Smooth navigation to a section
  const scrollToSection = (index) => {
    if (index < 0 || index >= sectionList.length) return;
    setActiveSection(index);
    setIsMobileMenuOpen(false);
    const target = document.getElementById(sectionList[index]?.id);
    if (target) {
      const top = index === 0 ? 0 : target.getBoundingClientRect().top + window.scrollY - 70;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  // Section observer for active highlight
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
        { rootMargin: '-40% 0px -40% 0px', threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // Preload below-the-fold sections
  useEffect(() => {
    const preload = () => {
      import('./components/Projects');
      import('./components/About');
      import('./components/Skills');
      import('./components/Contact');
    };
    if ('requestIdleCallback' in window) {
      const h = window.requestIdleCallback(preload, { timeout: 3000 });
      return () => window.cancelIdleCallback?.(h);
    }
    const timer = setTimeout(preload, 2000);
    return () => clearTimeout(timer);
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
    <main className="relative w-full bg-paper text-ink overflow-x-clip min-h-screen">

      <AnimatePresence>
        {isLoading && <Preloader onDone={() => setIsLoading(false)} />}
      </AnimatePresence>

      {/* ───────── Top Editorial Masthead Header ───────── */}
      <header className="fixed top-0 left-0 w-full z-50 bg-paper/90 backdrop-blur-md border-b border-ink/10 transition-colors">
        <div className="w-full px-5 md:px-12 lg:px-20 h-16 md:h-20 flex items-center justify-between">
          
          {/* Brand Identity */}
          <button
            onClick={() => scrollToSection(0)}
            className="flex items-center gap-3 group text-left cursor-pointer"
            aria-label="Kembali ke beranda"
          >
            <div className="w-8 h-8 rounded-sm bg-ink text-paper flex items-center justify-center group-hover:bg-ochre transition-colors">
              <DayakShieldEmblem className="w-5 h-5 text-paper" color="currentColor" />
            </div>
            <div className="flex flex-col">
              <span className="font-sans font-bold text-xs md:text-sm uppercase tracking-wider text-ink leading-tight">
                Luigi Iram Rangi
              </span>
              <span className="font-mono text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-ink/60 leading-none mt-0.5">
                Ddev • West Borneo
              </span>
            </div>
          </button>

          {/* Center Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Navigasi Utama">
            {sectionList.slice(1).map((item, idx) => {
              const actualIdx = idx + 1;
              const isActive = activeSection === actualIdx;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(actualIdx)}
                  className={`relative font-sans text-xs uppercase tracking-wider py-1 font-semibold transition-colors cursor-pointer ${
                    isActive ? 'text-ink font-bold' : 'text-ink/60 hover:text-ink'
                  }`}
                >
                  <span className="font-mono text-[10px] text-ochre mr-1">{item.num}.</span>
                  <span>{item.name}</span>
                  {isActive && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute bottom-0 left-0 w-full h-[2px] bg-ochre"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right: Live Clock & Action Button */}
          <div className="flex items-center gap-4">
            {/* Live Pontianak WIB Clock */}
            <div className="hidden lg:flex items-center gap-2 font-mono text-xs text-ink/70 border-r border-ink/15 pr-4">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald animate-pulse" />
              <span>PTK {timeWIB} WIB</span>
            </div>

            {/* Quick Contact Button */}
            <a
              href="mailto:iramrangi@gmail.com"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 bg-ink text-paper font-sans text-xs font-bold uppercase tracking-wider border border-ink hover:bg-ochre hover:border-ochre transition-colors"
            >
              <span>Mulai Proyek</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-ochre" />
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              aria-label={isMobileMenuOpen ? 'Tutup menu' : 'Buka menu navigasi'}
              aria-expanded={isMobileMenuOpen}
              className="md:hidden w-10 h-10 border border-ink/20 rounded flex items-center justify-center hover:bg-ink hover:text-paper transition-colors cursor-pointer"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </header>

      {/* ───────── Mobile Full Drawer Navigation ───────── */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 z-35 bg-ink/40 md:hidden"
            />
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-x-0 top-16 z-40 bg-paper border-b-2 border-ink p-6 pb-8 shadow-2xl flex flex-col gap-6 md:hidden"
            >
            <div className="flex flex-col gap-3">
              {sectionList.map((item, idx) => {
                const isActive = activeSection === idx;
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(idx)}
                    className={`flex items-center justify-between py-3 border-b border-ink/10 text-left font-sans text-base uppercase font-bold tracking-wider cursor-pointer ${
                      isActive ? 'text-ochre' : 'text-ink'
                    }`}
                  >
                    <span>{item.name}</span>
                    <span className="font-mono text-xs text-ink/40">/{item.num}</span>
                  </button>
                );
              })}
            </div>

            <div className="flex flex-col gap-3 pt-2">
              <a
                href="mailto:iramrangi@gmail.com"
                className="w-full py-3 bg-ink text-paper text-center font-sans text-xs uppercase font-bold tracking-widest border border-ink flex items-center justify-center gap-2"
              >
                <span>Hubungi via Email</span>
                <ArrowUpRight className="w-4 h-4 text-ochre" />
              </a>
              <div className="flex items-center justify-between text-xs font-mono text-ink/60 pt-2">
                <span>0°01′S 109°20′E</span>
                <span>PTK {timeWIB} WIB</span>
              </div>
            </div>

            <DayakBorderRibbon className="w-full h-3 pt-2" color="#141413" opacity={0.3} />
          </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ───────── Main Content Sections ───────── */}
      <div className="relative z-10 w-full flex flex-col">
        {sectionList.map((section) => {
          const Component = section.Component;
          return (
            <div key={section.id} id={section.id} className="w-full relative">
              <Suspense fallback={<div className="w-full min-h-[50vh] bg-paper" />}>
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
