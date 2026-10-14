import { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, ArrowUpRight, Mail, Globe, Sparkles } from 'lucide-react';

import Hero from './components/Hero';
import GlobalBackgroundCanvas from './components/GlobalBackgroundCanvas';
import CyberDayakLogo from './components/CyberDayakLogo';

// Code-split below-the-fold sections for instant FCP/TBT
const About = lazy(() => import('./components/About'));
const Projects = lazy(() => import('./components/Projects'));
const Skills = lazy(() => import('./components/Skills'));
const Contact = lazy(() => import('./components/Contact'));

// Full-page snap only on desktop-size screens; phones scroll naturally
const isSnapViewport = () => window.matchMedia('(min-width: 768px)').matches;

const InstagramIcon = ({ className = "w-4 h-4" }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const sectionList = [
  { id: 'hero', name: 'HOME', label: 'Overview & 3D Core', Component: Hero, color: '#050505' },
  { id: 'about', name: 'ABOUT', label: 'Borneo Roots & Ddev', Component: About, color: '#0a0b0f' },
  { id: 'work', name: 'WORK', label: 'Borneo Globe & Systems', Component: Projects, color: '#070709' },
  { id: 'expertise', name: 'EXPERTISE', label: 'Creative Tech & WebGL', Component: Skills, color: '#0a0d12' },
  { id: 'contact', name: 'CONTACT', label: 'Get In Touch', Component: Contact, color: '#050505' }
];

function App() {
  const [activeSection, setActiveSection] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isNavigating = useRef(false);
  const activeSectionRef = useRef(activeSection);

  useEffect(() => {
    activeSectionRef.current = activeSection;
  }, [activeSection]);

  // Smooth Per-Section Navigation function
  const scrollToSection = (index) => {
    if (index < 0 || index >= sectionList.length) return;
    setActiveSection(index);
    setIsMenuOpen(false);
    const target = document.getElementById(sectionList[index]?.id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // 1. IntersectionObserver to detect active section
  useEffect(() => {
    const observers = [];
    sectionList.forEach((sec, index) => {
      const el = document.getElementById(sec.id);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(index);
            }
          });
        },
        // Fires when the section crosses the viewport's center line —
        // works for sections taller than the screen (mobile) too
        { rootMargin: '-50% 0px -50% 0px', threshold: 0 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, []);

  // Preload below-the-fold sections on idle for instant snap navigation
  useEffect(() => {
    const preload = () => {
      import('./components/About');
      import('./components/Projects');
      import('./components/Skills');
      import('./components/Contact');
    };
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(preload, { timeout: 3500 });
    } else {
      const timer = setTimeout(preload, 2500);
      return () => clearTimeout(timer);
    }
  }, []);

  // 2. Per-Section Wheel, Keyboard, and Touch Gesture Controller
  useEffect(() => {
    let touchStartY = 0;

    const handleWheel = (e) => {
      if (isMenuOpen) return;
      if (!isSnapViewport()) return;
      if (Math.abs(e.deltaY) < 15) return; // Ignore micro trackpad drift

      if (isNavigating.current) {
        e.preventDefault();
        return;
      }

      const direction = e.deltaY > 0 ? 1 : -1;
      const nextIndex = activeSectionRef.current + direction;

      if (nextIndex >= 0 && nextIndex < sectionList.length) {
        e.preventDefault();
        isNavigating.current = true;
        scrollToSection(nextIndex);
        setTimeout(() => {
          isNavigating.current = false;
        }, 750); // 750ms cooldown for smooth per-section glide
      }
    };

    const handleKeyDown = (e) => {
      // Press Escape to hide/close the side menu
      if (e.key === 'Escape') {
        setIsMenuOpen(false);
        return;
      }
      if (isMenuOpen) return;
      if (!isSnapViewport()) return;
      if (e.target.closest?.('input, textarea')) return;
      if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault();
        if (activeSectionRef.current < sectionList.length - 1) {
          scrollToSection(activeSectionRef.current + 1);
        }
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        if (activeSectionRef.current > 0) {
          scrollToSection(activeSectionRef.current - 1);
        }
      }
    };

    const handleTouchStart = (e) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e) => {
      if (isMenuOpen) return;
      if (!isSnapViewport()) return; // phones: native scrolling
      if (isNavigating.current) return;
      const touchEndY = e.changedTouches[0].clientY;
      const diffY = touchStartY - touchEndY;
      if (Math.abs(diffY) > 40) {
        const direction = diffY > 0 ? 1 : -1;
        const nextIndex = activeSectionRef.current + direction;
        if (nextIndex >= 0 && nextIndex < sectionList.length) {
          isNavigating.current = true;
          scrollToSection(nextIndex);
          setTimeout(() => {
            isNavigating.current = false;
          }, 750);
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isMenuOpen]);

  return (
    <main className="relative w-full text-foreground bg-black overflow-x-hidden selection:bg-cyan-500/30 selection:text-cyan-200">
      

      {/* Global Header */}
      <header className="fixed top-0 left-0 w-full z-40 flex justify-between items-center px-5 sm:px-10 py-3 md:py-5 pointer-events-none bg-black/70 backdrop-blur-md border-b border-white/5 md:bg-transparent md:backdrop-blur-none md:border-b-0">
        <div 
          className="flex items-center gap-2.5 sm:gap-3 pointer-events-auto cursor-pointer group" 
          onClick={() => scrollToSection(0)}
        >
          <div className="relative shrink-0">
            <div className="absolute inset-0 bg-cyan-400/20 blur-md rounded-full group-hover:bg-cyan-400/40 transition-all" />
            <CyberDayakLogo className="w-8 h-8 sm:w-9 sm:h-9 relative z-10 transition-transform duration-300 group-hover:scale-105" />
          </div>
          <div className="flex flex-col">
            <div className="text-sm sm:text-base font-display font-black tracking-tight text-white leading-none whitespace-nowrap group-hover:text-cyan-300 transition-colors">
              LUIGI IRAM RANGI
            </div>
            <div className="text-[9px] sm:text-[10px] font-mono tracking-[0.2em] text-cyan-400 uppercase leading-none mt-1 whitespace-nowrap">
              Ddev • Dayak Developer
            </div>
          </div>
        </div>

        {/* Sleek Side Menu Toggle Button */}
        <button 
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className={`flex items-center gap-2.5 px-4 py-2 rounded-full border backdrop-blur-xl transition-all duration-300 cursor-pointer text-white pointer-events-auto shadow-lg group ${
            isMenuOpen 
              ? 'bg-cyan-500/20 border-cyan-400/60 shadow-[0_0_20px_rgba(0,240,255,0.3)]' 
              : 'bg-neutral-900/80 hover:bg-neutral-800 border-white/15 hover:border-cyan-500/40'
          }`}
          aria-label={isMenuOpen ? "Sembunyikan Menu" : "Buka Menu Navigasi Samping"}
        >
          <span className="text-xs font-mono font-bold tracking-wider text-white/90 group-hover:text-cyan-300 transition-colors">
            {isMenuOpen ? 'TUTUP' : 'MENU'}
          </span>
          <div className={`w-5 h-5 rounded-full flex items-center justify-center transition-colors ${
            isMenuOpen ? 'bg-cyan-400 text-black' : 'bg-white/10 text-cyan-400'
          }`}>
            {isMenuOpen ? (
              <X className="w-3.5 h-3.5" />
            ) : (
              <Menu className="w-3.5 h-3.5 group-hover:rotate-90 transition-transform duration-300" />
            )}
          </div>
        </button>
      </header>

      {/* Side Navigation Drawer (Disamping & Bisa Disembunyikan) */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop Overlay - Klik di luar menu untuk menyembunyikan */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm cursor-pointer"
              aria-label="Tutup menu samping"
            />

            {/* Sidebar Panel di Samping Kanan */}
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-0 right-0 h-full w-full sm:w-[400px] max-w-[88vw] z-50 bg-[#07080d]/95 border-l border-white/15 backdrop-blur-2xl shadow-[-25px_0_60px_rgba(0,0,0,0.9)] flex flex-col justify-between overflow-hidden select-none"
            >
              {/* Pendaran Dekoratif Ambient di Dalam Sidebar */}
              <div className="absolute -top-24 -right-24 w-72 h-72 bg-cyan-500/10 rounded-full blur-[90px] pointer-events-none" />
              <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-purple-500/10 rounded-full blur-[90px] pointer-events-none" />

              {/* Header Sidebar dengan Tombol Sembunyikan */}
              <div className="p-6 border-b border-white/10 flex items-center justify-between relative z-10">
                <div className="flex items-center gap-3">
                  <CyberDayakLogo className="w-8 h-8 shrink-0" />
                  <div>
                    <div className="text-xs font-display font-bold text-white leading-none">
                      LUIGI IRAM RANGI
                    </div>
                    <div className="text-[10px] font-mono tracking-wider text-cyan-400 uppercase mt-1">
                      Ddev Studio • Navigation
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="hidden sm:inline-block px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] font-mono text-white/70">
                    ESC
                  </span>
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 text-white/80 hover:text-white transition-all cursor-pointer group"
                    aria-label="Sembunyikan menu navigasi"
                  >
                    <span className="text-xs font-mono">Tutup</span>
                    <X className="w-4 h-4 group-hover:rotate-90 transition-transform duration-200" />
                  </button>
                </div>
              </div>

              {/* Daftar Menu Navigasi Per-Section */}
              <div className="p-6 flex flex-col gap-2 relative z-10 overflow-y-auto">
                <span className="text-[10px] font-mono text-white/70 uppercase tracking-widest mb-1 px-3">
                  Index / Lompat Ke Section
                </span>
                {sectionList.map((item, idx) => {
                  const isActive = activeSection === idx;
                  return (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(idx)}
                      className={`group relative w-full text-left p-3.5 rounded-2xl border transition-all duration-300 cursor-pointer flex items-center justify-between ${
                        isActive
                          ? 'bg-white/10 border-cyan-400/50 shadow-[0_0_20px_rgba(0,240,255,0.15)] text-white'
                          : 'bg-white/[0.02] border-white/5 hover:border-white/20 hover:bg-white/[0.05] text-white/70 hover:text-white'
                      }`}
                    >
                      {/* Active indicator bar */}
                      {isActive && (
                        <motion.div
                          layoutId="activeSideNavIndicator"
                          className="absolute left-0 top-2.5 bottom-2.5 w-1 bg-gradient-to-b from-cyan-400 to-blue-500 rounded-r-full shadow-[0_0_10px_#00f0ff]"
                        />
                      )}

                      <div className="flex items-center gap-3.5 pl-1">
                        <span className={`text-xs font-mono font-bold transition-colors ${
                          isActive ? 'text-cyan-400' : 'text-white/70 group-hover:text-cyan-300'
                        }`}>
                          0{idx + 1}
                        </span>
                        <div>
                          <div className={`text-lg font-display font-black tracking-tight leading-none ${
                            isActive ? 'text-white' : 'text-white/80 group-hover:text-white'
                          }`}>
                            {item.name}
                          </div>
                          <div className="text-[11px] font-mono text-white/70 group-hover:text-white/90 mt-1">
                            {item.label}
                          </div>
                        </div>
                      </div>

                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all ${
                        isActive
                          ? 'bg-cyan-400 text-black shadow-md'
                          : 'bg-white/5 text-white/70 group-hover:bg-white/15 group-hover:text-white'
                      }`}>
                        <ArrowUpRight className="w-4 h-4" />
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Footer Sidebar: Status, Kontak Cepat & Borneo Globe */}
              <div className="p-6 border-t border-white/10 bg-black/40 relative z-10 flex flex-col gap-3.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    <span className="text-[11px] font-mono text-emerald-300 font-medium">
                      Borneo Globe Active
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-white/70">
                    West Borneo
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <a
                    href="mailto:iramrangi@gmail.com"
                    className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-white/[0.03] hover:bg-white/10 border border-white/10 text-white/80 hover:text-white text-xs font-mono transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Email Me</span>
                  </a>
                  <a
                    href="https://www.instagram.com/iramrangi_dev/"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-white/[0.03] hover:bg-white/10 border border-white/10 text-white/80 hover:text-white text-xs font-mono transition-colors"
                  >
                    <InstagramIcon className="w-3.5 h-3.5 text-pink-400" />
                    <span>Instagram</span>
                  </a>
                </div>

                <a
                  href="https://www.borneoglobe.org/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between px-3 py-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/20 text-cyan-300 text-xs font-mono transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Globe className="w-3.5 h-3.5" />
                    <span>borneoglobe.org</span>
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Global 2D Spatial Starfield Background */}
      <GlobalBackgroundCanvas activeSection={activeSection} />

      {/* Dynamic Background Ambient Tint */}
      <div 
        className="fixed inset-0 z-0 pointer-events-none transition-colors duration-1000 ease-out"
        style={{ backgroundColor: sectionList[activeSection]?.color || '#050505' }}
      >
        <div className="absolute top-1/4 -left-40 w-96 h-96 bg-cyan-500/[0.02] rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-1/4 -right-40 w-96 h-96 bg-purple-500/[0.02] rounded-full blur-[140px] pointer-events-none" />
      </div>

      {/* Full-Page Per-Section Snap Views */}
      <div className="relative z-10 w-full flex flex-col">
        {sectionList.map((section) => {
          const Component = section.Component;
          return (
            <div 
              key={section.id} 
              id={section.id} 
              className="snap-section w-full min-h-[100svh] md:h-screen md:min-h-0 shrink-0 relative flex flex-col justify-center overflow-x-clip md:overflow-hidden"
            >
              <Suspense fallback={<div className="w-full h-full min-h-[300px]" />}>
                <Component setActiveSection={scrollToSection} />
              </Suspense>
            </div>
          );
        })}
      </div>
      
      {/* Right Dots Navigation with Labels */}
      <nav 
        className="fixed right-6 sm:right-8 top-1/2 -translate-y-1/2 hidden md:flex flex-col gap-3.5 z-40"
        aria-label="Section Navigation"
      >
        {sectionList.map((sec, idx) => (
          <button 
            key={sec.id}
            onClick={() => scrollToSection(idx)}
            title={sec.name}
            aria-label={`Lompat ke bagian ${sec.name}: ${sec.label}`}
            className={`group relative flex items-center justify-end cursor-pointer p-1`}
          >
            {/* Tooltip Label on Hover */}
            <span className="hidden md:inline-block absolute right-6 px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-neutral-900/90 border border-white/10 text-white/80 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
              {sec.name}
            </span>

            {/* Dot Indicator */}
            <span className={`w-3 h-3 rounded-full transition-all block ${
              idx === activeSection 
                ? 'bg-white scale-150 shadow-[0_0_12px_rgba(255,255,255,0.9)]' 
                : 'bg-white/20 group-hover:bg-white/50'
            }`} />
          </button>
        ))}
      </nav>
    </main>
  );
}

export default App;
