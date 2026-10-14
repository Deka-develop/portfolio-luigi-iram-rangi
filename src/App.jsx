import { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

import Hero from './components/Hero';

// Code-split below-the-fold sections for instant first paint
const About = lazy(() => import('./components/About'));
const Projects = lazy(() => import('./components/Projects'));
const Skills = lazy(() => import('./components/Skills'));
const Contact = lazy(() => import('./components/Contact'));

const sectionList = [
  { id: 'hero', name: 'Home', Component: Hero },
  { id: 'about', name: 'About', Component: About },
  { id: 'work', name: 'Works', Component: Projects },
  { id: 'expertise', name: 'Expertise', Component: Skills },
  { id: 'contact', name: 'Contact', Component: Contact }
];

const pad = (n) => String(n).padStart(2, '0');

/* Editorial split-panel preloader with a live percentage counter */
function Preloader({ onDone }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let raf;
    const start = performance.now();
    const duration = 1500;
    const tick = (t) => {
      const p = Math.min((t - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(eased * 100));
      if (p < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setTimeout(onDone, 280);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onDone]);

  return (
    <motion.div className="fixed inset-0 z-[9999] flex flex-row pointer-events-auto" exit={{ pointerEvents: 'none' }}>
      <motion.div
        className="h-full w-1/2 bg-paper"
        exit={{ x: '-100%' }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      />
      <motion.div
        className="h-full w-1/2 bg-paper"
        exit={{ x: '100%' }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      />
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center gap-8"
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <span className="font-sans font-black text-ink text-[11px] md:text-[13px] uppercase tracking-[0.35em]">
          Luigi Iram Rangi
        </span>
        <div className="w-48 md:w-64 h-[1px] bg-ink/15 relative overflow-hidden">
          <div
            className="absolute top-0 left-0 h-full w-full bg-ink origin-left"
            style={{ transform: `scaleX(${count / 100})` }}
          />
        </div>
        <div className="flex items-baseline gap-1">
          <span className="font-sans text-[11px] md:text-[13px] font-bold text-ink leading-none tracking-[0.15em] tabular-nums">
            {String(count).padStart(3, '0')}
          </span>
          <span className="font-sans text-[11px] md:text-[13px] text-ink/40 tracking-[0.15em]">%</span>
        </div>
        <span className="font-mono text-[8px] md:text-[10px] uppercase tracking-[0.3em] text-ink/40">
          Loading Assets
        </span>
      </motion.div>
    </motion.div>
  );
}

function App() {
  const [activeSection, setActiveSection] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const activeSectionRef = useRef(activeSection);

  useEffect(() => {
    activeSectionRef.current = activeSection;
  }, [activeSection]);

  // Lock scroll while preloader is visible
  useEffect(() => {
    document.documentElement.style.overflow = isLoading ? 'hidden' : '';
    return () => {
      document.documentElement.style.overflow = '';
    };
  }, [isLoading]);

  // Smooth navigation to a section
  const scrollToSection = (index) => {
    if (index < 0 || index >= sectionList.length) return;
    setActiveSection(index);
    setIsMenuOpen(false);
    const target = document.getElementById(sectionList[index]?.id);
    if (target) {
      const top = index === 0 ? 0 : target.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  // Track which section crosses the viewport's center line
  useEffect(() => {
    const observers = [];
    const attach = () => {
      sectionList.forEach((sec, index) => {
        const el = document.getElementById(sec.id);
        if (!el) return;
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) setActiveSection(index);
            });
          },
          { rootMargin: '-50% 0px -50% 0px', threshold: 0 }
        );
        observer.observe(el);
        observers.push(observer);
      });
    };
    attach();
    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  // Header brand appears once the user starts scrolling
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 120);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Preload below-the-fold sections on idle
  useEffect(() => {
    const preload = () => {
      import('./components/About');
      import('./components/Projects');
      import('./components/Skills');
      import('./components/Contact');
    };
    if ('requestIdleCallback' in window) {
      const h = window.requestIdleCallback(preload, { timeout: 3500 });
      return () => window.cancelIdleCallback?.(h);
    }
    const timer = setTimeout(preload, 2500);
    return () => clearTimeout(timer);
  }, []);

  // ESC closes the menu
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setIsMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const activeName = sectionList[activeSection]?.name || 'Home';

  return (
    <main className="relative w-full bg-paper text-ink overflow-x-clip">

      <AnimatePresence>
        {isLoading && <Preloader onDone={() => setIsLoading(false)} />}
      </AnimatePresence>

      {/* Fixed index label (top-left) */}
      <div className="fixed top-5 md:top-8 left-5 md:left-10 z-50 mix-blend-difference pointer-events-none flex flex-col text-[10px] md:text-[11px] font-sans tracking-[0.15em] text-[#EDEEF0]">
        <span className="opacity-80">{pad(activeSection + 1)} | {activeName}</span>
        <span className="font-bold mt-[2px]">2026</span>
      </div>

      {/* Fixed brand (top-center), appears after the hero starts scrolling */}
      <button
        onClick={() => scrollToSection(0)}
        aria-label="Kembali ke atas"
        className={`fixed top-5 md:top-8 left-1/2 -translate-x-1/2 z-50 mix-blend-difference text-[#EDEEF0] font-sans font-bold text-[10px] md:text-[11px] uppercase tracking-[0.35em] transition-all duration-500 cursor-pointer ${
          scrolled && !isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'
        }`}
      >
        Rangi
      </button>

      {/* Fan-out numbered menu (top-right) */}
      <nav className="fixed top-4 md:top-7 right-4 md:right-10 z-[60]" aria-label="Navigasi utama">
        <div className="relative w-10 h-10">
          {sectionList.map((item, idx) => {
            const isActive = activeSection === idx;
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(idx)}
                aria-label={`Lompat ke ${item.name}`}
                tabIndex={isMenuOpen ? 0 : -1}
                className={`group absolute right-0 top-0 w-10 h-10 rounded-full border flex items-center justify-center font-sans text-[10px] font-bold tracking-[0.15em] shadow-lg cursor-pointer transition-all duration-500 hover:scale-105 ${
                  isActive
                    ? 'bg-violet text-ink border-ink'
                    : 'bg-ink text-[#EDEEF0] border-white/10 hover:bg-white hover:!text-black'
                }`}
                style={{
                  transform: isMenuOpen
                    ? `translate(${-(sectionList.length - idx) * 46}px, 0) scale(1)`
                    : 'translate(0px, 0px) scale(0.5)',
                  opacity: isMenuOpen ? 1 : 0,
                  pointerEvents: isMenuOpen ? 'auto' : 'none',
                  transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
                  transitionDelay: `${isMenuOpen ? idx * 30 : 0}ms`,
                  zIndex: 40 - idx
                }}
              >
                <span className="translate-x-[1px]">{pad(idx + 1)}</span>
                <span className="hidden md:block absolute top-12 left-1/2 -translate-x-1/2 bg-violet text-ink px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none scale-75 group-hover:scale-100 origin-top whitespace-nowrap shadow-lg">
                  {item.name}
                </span>
              </button>
            );
          })}

          <button
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-label={isMenuOpen ? 'Tutup menu' : 'Buka menu navigasi'}
            aria-expanded={isMenuOpen}
            className="relative z-50 w-10 h-10 bg-ink text-[#EDEEF0] border border-white/10 rounded-full flex items-center justify-center hover:bg-white hover:text-black hover:scale-105 transition-all duration-300 shadow-lg cursor-pointer"
          >
            {isMenuOpen ? <X className="w-[18px] h-[18px]" /> : <Menu className="w-[18px] h-[18px]" />}
          </button>
        </div>
      </nav>

      {/* Page sections */}
      <div className="relative z-10 w-full flex flex-col">
        {sectionList.map((section) => {
          const Component = section.Component;
          return (
            <div key={section.id} id={section.id} className="w-full relative">
              <Suspense fallback={<div className="w-full min-h-[60vh] bg-paper" />}>
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
