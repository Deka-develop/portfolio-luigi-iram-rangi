import { useState, useEffect, lazy, Suspense } from 'react';
import { ArrowDown, Sparkles, Code2, Cpu, Zap, Layers, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

// Code-split Three.js (~540KB) — load on user interaction or idle to guarantee 0ms TBT
const CyberCoreCanvas = lazy(() => import('./CyberCoreCanvas'));

const CanvasPlaceholder = ({ onActivate }) => (
  <div 
    onClick={onActivate}
    className="relative w-full max-w-[480px] aspect-square rounded-3xl bg-neutral-950/80 border border-white/15 flex flex-col items-center justify-between p-7 select-none shadow-[0_20px_60px_rgba(0,0,0,0.8)] backdrop-blur-xl group cursor-pointer overflow-hidden"
    title="Klik untuk mengaktifkan WebGL 3D Quantum Core"
  >
    {/* Ambient Internal Glow */}
    <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 via-purple-600/10 to-transparent pointer-events-none" />
    
    {/* Top Status Bar */}
    <div className="w-full flex items-center justify-between z-10">
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
        <span className="text-[11px] font-mono font-bold tracking-wider text-cyan-300 uppercase">
          QUANTUM CORE • 3D
        </span>
      </div>
      <span className="px-2 py-0.5 rounded text-[9px] font-mono bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 uppercase tracking-widest">
        WEBGL 2.0
      </span>
    </div>

    {/* Center Cyber Hologram Rings (Pure GPU CSS) */}
    <div className="relative flex items-center justify-center my-auto">
      {/* Outer Glow Halo */}
      <div className="absolute w-44 h-44 rounded-full bg-cyan-500/15 blur-2xl animate-pulse" />
      
      {/* Outer Dashed Ring */}
      <div className="w-36 h-36 rounded-full border border-dashed border-cyan-400/40 animate-[spin_20s_linear_infinite]" />
      
      {/* Middle Solid Ring */}
      <div className="absolute w-28 h-28 rounded-full border border-purple-500/50 animate-[spin_12s_linear_infinite_reverse]" />
      
      {/* Inner Glowing Core */}
      <div className="absolute w-16 h-16 rounded-full bg-gradient-to-br from-cyan-400/30 via-purple-500/30 to-blue-600/30 border border-cyan-400/60 shadow-[0_0_25px_rgba(0,240,255,0.4)] flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
        <Sparkles className="w-6 h-6 text-cyan-300 animate-pulse" />
      </div>
    </div>

    {/* Bottom Interaction Cue */}
    <div className="w-full flex items-center justify-between z-10 pt-2 border-t border-white/10 text-[11px] font-mono text-white/60">
      <div className="flex items-center gap-1.5 text-cyan-300">
        <Zap className="w-3.5 h-3.5" />
        <span className="group-hover:text-white transition-colors">Hover / Touch to Engage</span>
      </div>
      <span className="text-white/40">120 FPS</span>
    </div>
  </div>
);

const Hero = ({ setActiveSection }) => {
  const [shouldLoad3D, setShouldLoad3D] = useState(false);

  useEffect(() => {
    let triggered = false;
    const trigger3D = () => {
      if (triggered) return;
      triggered = true;
      setShouldLoad3D(true);
      removeListeners();
    };

    const removeListeners = () => {
      window.removeEventListener('pointermove', trigger3D);
      window.removeEventListener('scroll', trigger3D);
      window.removeEventListener('touchstart', trigger3D);
      window.removeEventListener('keydown', trigger3D);
    };

    // Load immediately when user interacts
    window.addEventListener('pointermove', trigger3D, { passive: true, once: true });
    window.addEventListener('scroll', trigger3D, { passive: true, once: true });
    window.addEventListener('touchstart', trigger3D, { passive: true, once: true });
    window.addEventListener('keydown', trigger3D, { passive: true, once: true });

    // Fallback on idle for passive sessions (after main-thread metrics complete)
    let idleHandle;
    if ('requestIdleCallback' in window) {
      idleHandle = window.requestIdleCallback(trigger3D, { timeout: 3500 });
    } else {
      const timer = setTimeout(trigger3D, 3500);
      return () => {
        removeListeners();
        clearTimeout(timer);
      };
    }

    return () => {
      removeListeners();
      if (idleHandle && 'cancelIdleCallback' in window) {
        window.cancelIdleCallback(idleHandle);
      }
    };
  }, []);

  return (
    <section className="relative w-full min-h-screen bg-transparent flex flex-col justify-between">
      {/* Decorative Grid & Vignette */}
      <div className="absolute inset-0 bg-grid-pattern opacity-15 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)] pointer-events-none" />

      {/* Atmospheric Ambient Glows */}
      <div className="absolute top-1/4 -right-20 w-[550px] h-[550px] max-w-full bg-gradient-to-br from-indigo-500/15 via-purple-600/10 to-transparent rounded-full blur-[120px] pointer-events-none hidden md:block" />
      <div className="absolute -bottom-20 -left-20 w-[500px] h-[500px] bg-gradient-to-tr from-cyan-500/10 via-blue-600/10 to-transparent rounded-full blur-[120px] pointer-events-none hidden md:block" />

      {/* Main Hero Content */}
      <div className="flex-1 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-14 pt-24 md:pt-20 pb-6 relative z-10">
        
        {/* Left Column: Heading & CTA */}
        <div className="w-full lg:w-[52%] flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Availability Pill */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-xl mb-5 shadow-sm max-w-full">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
              <span className="text-[10px] sm:text-xs font-mono font-medium tracking-wider text-white/80 uppercase">
                Founder of Ddev • Currently at{' '}
                <a 
                  href="https://www.borneoglobe.org/" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="text-cyan-300 hover:text-white underline decoration-cyan-400/50 underline-offset-2 transition-colors pointer-events-auto"
                >
                  Borneo Globe
                </a>
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-black tracking-tight text-white uppercase leading-[1.05] mb-5">
              LUIGI IRAM <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-purple-500">
                RANGI
              </span>
            </h1>

            {/* Sub-Headline & Bio */}
            <p className="text-base sm:text-lg text-white/75 font-sans font-normal max-w-lg mb-8 leading-relaxed">
              Creative Developer & Founder of <span className="text-cyan-300 font-medium">Ddev</span>. Merancang web modern, visual 3D/WebGL, dan arsitektur performa tinggi dari Borneo.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => setActiveSection(2)}
                className="group relative inline-flex items-center gap-3 px-7 py-3.5 font-medium tracking-wide text-black transition-all duration-300 ease-out bg-white rounded-full hover:bg-cyan-400 hover:shadow-[0_0_25px_rgba(0,240,255,0.6)] cursor-pointer text-sm"
              >
                <span>Lihat Portofolio</span>
                <Sparkles className="w-4 h-4 transition-transform group-hover:rotate-12" />
              </button>

              <button
                onClick={() => setActiveSection(4)}
                className="inline-flex items-center justify-center px-7 py-3.5 font-medium tracking-wide text-white/80 transition-all duration-300 ease-out rounded-full border border-white/20 hover:border-white/60 hover:text-white hover:bg-white/[0.05] cursor-pointer text-sm"
              >
                Get in Touch
              </button>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Live Interactive WebGL 3D Showcase */}
        <div className="w-full lg:w-[48%] flex justify-center items-center relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut", delay: 0.15 }}
            className="w-full flex justify-center"
          >
            {shouldLoad3D ? (
              <Suspense fallback={<CanvasPlaceholder onActivate={() => setShouldLoad3D(true)} />}>
                <CyberCoreCanvas />
              </Suspense>
            ) : (
              <CanvasPlaceholder onActivate={() => setShouldLoad3D(true)} />
            )}
          </motion.div>
        </div>

      </div>

      {/* Scroll to Explore Indicator */}
      <motion.div
        onClick={() => setActiveSection(1)}
        className="w-full hidden md:flex flex-col items-center gap-2 pb-6 z-10 cursor-pointer pointer-events-auto hover:opacity-100 transition-opacity"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <span className="text-xs font-semibold tracking-[0.2em] text-white/60 drop-shadow-md">
          SCROLL TO EXPLORE
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="w-4 h-4 text-white/60 drop-shadow-md" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
