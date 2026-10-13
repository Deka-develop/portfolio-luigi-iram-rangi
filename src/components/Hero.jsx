import { useState, useEffect, lazy, Suspense } from 'react';
import { ArrowDown, Sparkles, Code2, Cpu, Zap, Layers, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

// Three.js is heavy (~500KB) — load it after initial paint so TBT stays near 0ms
const CyberCoreCanvas = lazy(() => import('./CyberCoreCanvas'));

const CanvasPlaceholder = () => (
  <div className="relative w-full max-w-[480px] aspect-square rounded-3xl bg-neutral-950/75 border border-white/15 flex flex-col items-center justify-center gap-3 p-6 select-none shadow-2xl">
    <div className="w-12 h-12 rounded-full border-2 border-cyan-400/30 border-t-cyan-400 animate-spin" />
    <span className="text-xs font-mono text-cyan-300 font-medium tracking-wider">
      INITIALIZING QUANTUM CORE...
    </span>
  </div>
);

const Hero = ({ setActiveSection }) => {
  const [shouldLoad3D, setShouldLoad3D] = useState(false);

  useEffect(() => {
    // Let browser finish initial paint & idle before starting WebGL engine
    const timer = setTimeout(() => {
      setShouldLoad3D(true);
    }, 450);
    return () => clearTimeout(timer);
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

            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[6.2rem] font-display font-black leading-[0.9] tracking-tighter text-white mb-5 drop-shadow-2xl">
              LUIGI IRAM<br />
              <span className="text-transparent stroke-text hover:text-white transition-colors duration-300">
                RANGI
              </span>
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-white/70 max-w-xl mb-7 font-sans font-light leading-relaxed">
              Creative Developer & Founder of <span className="text-cyan-300 font-medium">Ddev (Dayak Developer)</span>, saat ini aktif berkontribusi untuk{' '}
              <a 
                href="https://www.borneoglobe.org/" 
                target="_blank" 
                rel="noreferrer" 
                className="text-white font-medium underline decoration-cyan-400 underline-offset-4 hover:text-cyan-300 transition-colors pointer-events-auto"
              >
                Borneo Globe
              </a>
              . Menggabungkan arsitektur web modern, WebGL 3D interaktif, dan template digital berakar dari tanah Borneo untuk panggung global.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => setActiveSection(2)}
                className="group relative inline-flex items-center justify-center px-8 py-3.5 font-medium tracking-wide text-black transition-all duration-300 ease-out bg-white rounded-full hover:scale-105 hover:bg-neutral-200 shadow-[0_0_30px_rgba(255,255,255,0.2)] cursor-pointer"
              >
                <span className="relative font-bold text-sm">Explore Ddev Projects</span>
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
              <Suspense fallback={<CanvasPlaceholder />}>
                <CyberCoreCanvas />
              </Suspense>
            ) : (
              <CanvasPlaceholder />
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
