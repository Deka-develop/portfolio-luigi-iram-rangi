import { lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, ArrowUpRight, Compass, Sparkles } from 'lucide-react';
import { DayakShieldEmblem, DayakBorderRibbon, DayakCulturalSeal, DayakCornerAccent } from './DayakMotifs';

const Dayak3DCanvas = lazy(() => import('./Dayak3DCanvas'));

export default function Hero({ setActiveSection }) {
  return (
    <section className="relative w-full min-h-[92vh] lg:min-h-screen flex flex-col justify-between pt-24 md:pt-32 pb-10 px-5 md:px-12 lg:px-20 bg-paper text-ink overflow-hidden border-b border-ink/15">

      {/* Subtle Archival Grid Background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.4]"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(20,20,19,0.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(20,20,19,0.045) 1px, transparent 1px)',
          backgroundSize: '72px 72px'
        }}
      />

      {/* Top Archival Issue Strip */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full flex flex-col gap-2 pb-6"
      >
        <div className="flex flex-wrap items-center justify-between gap-3 text-[10px] md:text-[11px] font-mono tracking-[0.2em] uppercase text-ink/70">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-ochre animate-pulse" />
            <span className="font-bold text-ink">EDISI 2026 // DDEV CULTURAL COMPUTING</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline">0°01′S 109°20′E</span>
            <span>PONTIANAK, KALBAR</span>
          </div>
        </div>
        <DayakBorderRibbon className="w-full h-3" color="#141413" opacity={0.25} />
      </motion.div>

      {/* Center Stage: Monumental Headline + 3D Three.js Artifact & Bio */}
      <div className="relative z-10 w-full my-auto py-6 md:py-10">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 md:gap-12">
          
          {/* Giant Monumental Name */}
          <div className="relative flex flex-col shrink-0">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="flex items-center gap-2 mb-2 md:mb-3"
            >
              <DayakShieldEmblem className="w-4 h-4 text-ochre" color="#D97706" />
              <span className="font-mono text-[10px] md:text-xs uppercase tracking-[0.25em] font-bold text-ochre">
                Founder of Ddev • Dayak Developer
              </span>
            </motion.div>

            <h1 className="flex flex-col font-sans text-ink font-bold uppercase leading-[0.82] tracking-tighter select-none">
              <motion.span
                initial={{ y: '30%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.25, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="inline-block text-[17vw] sm:text-[15vw] md:text-[11vw] lg:text-[8.5vw] xl:text-[9.5vw]"
              >
                LUIGI
              </motion.span>
              <motion.span
                initial={{ y: '30%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.35, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="inline-block text-[17vw] sm:text-[15vw] md:text-[11vw] lg:text-[8.5vw] xl:text-[9.5vw]"
              >
                IRAM
              </motion.span>
              <motion.span
                initial={{ y: '30%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.45, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="inline-block text-[17vw] sm:text-[15vw] md:text-[11vw] lg:text-[8.5vw] xl:text-[9.5vw]"
              >
                RANGI
              </motion.span>
            </h1>
          </div>

          {/* Right Column: Three.js 3D Artifact + Manifesto Paragraph */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex flex-col items-start lg:items-end justify-between gap-6 w-full lg:max-w-lg xl:max-w-xl"
          >
            {/* Live Three.js 3D Viewport Component */}
            <div className="w-full">
              <Suspense
                fallback={
                  <div className="w-full h-64 sm:h-72 md:h-80 bg-paper-dark border-2 border-ink shadow-[5px_5px_0_#D97706] flex flex-col items-center justify-center p-6 text-center">
                    <DayakShieldEmblem className="w-8 h-8 text-ochre animate-pulse mb-3" color="#D97706" />
                    <span className="font-mono text-[10px] uppercase tracking-widest text-ink/70">
                      Memuat Mesin WebGL 3D…
                    </span>
                  </div>
                }
              >
                <Dayak3DCanvas className="w-full" />
              </Suspense>
            </div>

            {/* Editorial Bio Statement & Seal */}
            <div className="flex flex-col sm:flex-row lg:flex-row-reverse items-start sm:items-center gap-4">
              <DayakCulturalSeal className="w-16 h-16 md:w-20 md:h-20 shrink-0" animated={true} />
              <p className="font-sans text-xs sm:text-sm md:text-[15px] leading-[1.5] text-ink/80 text-left lg:text-right font-normal">
                Merajut akar budaya <strong className="text-ink font-semibold">Dayak & Borneo</strong> dengan arsitektur web modern, visual 3D interaktif Three.js, serta sistem digital berkinerja tinggi.
              </p>
            </div>

            {/* Direct Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                onClick={() => setActiveSection(2)}
                className="group relative inline-flex items-center gap-2 px-5 py-3 bg-ink text-paper font-sans text-xs md:text-sm font-bold uppercase tracking-wider border-2 border-ink shadow-[4px_4px_0_#D97706] hover:shadow-[2px_2px_0_#D97706] hover:translate-x-[2px] hover:translate-y-[2px] transition-all cursor-pointer"
              >
                <span>Lihat Karya Terpilih</span>
                <ArrowDown className="w-4 h-4 text-ochre group-hover:translate-y-0.5 transition-transform" />
              </button>

              <a
                href="mailto:iramrangi@gmail.com"
                className="inline-flex items-center gap-2 px-5 py-3 bg-paper text-ink font-sans text-xs md:text-sm font-bold uppercase tracking-wider border-2 border-ink hover:bg-ochre hover:text-white transition-colors"
              >
                <span>Kirim Pesan</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Bottom Archival Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.65, duration: 0.7 }}
        className="relative z-10 w-full pt-6 border-t border-ink/15"
      >
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          
          <div className="relative p-3 md:p-4 bg-paper-dark border border-ink/15">
            <DayakCornerAccent position="top-right" className="absolute top-1 right-1 w-2.5 h-2.5 text-ochre" />
            <span className="block font-sans font-black text-2xl md:text-3xl text-ink leading-none">08+</span>
            <span className="block font-mono text-[10px] md:text-xs uppercase tracking-wider text-ink/70 mt-1">Platform Produksi</span>
          </div>

          <div className="relative p-3 md:p-4 bg-paper-dark border border-ink/15">
            <DayakCornerAccent position="top-right" className="absolute top-1 right-1 w-2.5 h-2.5 text-ochre" />
            <span className="block font-sans font-black text-2xl md:text-3xl text-ink leading-none">120+</span>
            <span className="block font-mono text-[10px] md:text-xs uppercase tracking-wider text-ink/70 mt-1">Sistem Web Teruji</span>
          </div>

          <div className="relative p-3 md:p-4 bg-paper-dark border border-ink/15">
            <DayakCornerAccent position="top-right" className="absolute top-1 right-1 w-2.5 h-2.5 text-ochre" />
            <span className="block font-sans font-black text-2xl md:text-3xl text-ochre leading-none">&lt; 0.6s</span>
            <span className="block font-mono text-[10px] md:text-xs uppercase tracking-wider text-ink/70 mt-1">LCP &amp; 100/100 Vitals</span>
          </div>

          <div className="relative p-3 md:p-4 bg-paper-dark border border-ink/15">
            <DayakCornerAccent position="top-right" className="absolute top-1 right-1 w-2.5 h-2.5 text-ochre" />
            <span className="block font-sans font-black text-lg md:text-xl text-ink leading-tight">BORNEO GLOBE</span>
            <span className="block font-mono text-[10px] md:text-xs uppercase tracking-wider text-ink/70 mt-1">Platform Aktif (2025–2026)</span>
          </div>

        </div>
      </motion.div>

    </section>
  );
}
