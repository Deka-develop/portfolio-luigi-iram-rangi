import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DayakShieldEmblem, DayakBorderRibbon, DayakCornerAccent } from './DayakMotifs';

const milestones = [
  {
    year: '2023',
    phase: 'High-Velocity Web Engines',
    title: 'Zero-Bloat Web Engineering',
    badge: '120+ Web Engines',
    points: ['120+ Web Systems Built', '100/100 PageSpeed Benchmark', 'Valid Schema SEO', 'Sub-0.6s LCP Speed']
  },
  {
    year: '2024',
    phase: 'Creative WebGL & GLSL',
    title: 'Ddev Studio Lab & 3D Shaders',
    badge: '120 FPS WebGL',
    points: ['Three.js 3D Geometries', 'Custom GLSL GPU Shaders', 'Kinetic Lerp Physics', 'Neon Cyber & Dayak Fusion']
  },
  {
    year: '2025',
    phase: 'Borneo Globe Active Hub',
    title: 'Regional Impact Ecosystem',
    badge: 'Regional Scale',
    points: ['borneoglobe.org Platform', '2,800+ Beneficiaries', 'Eco Data Monitoring', 'Global Research Partners']
  }
];

const quickStats = [
  { label: 'Spesialisasi', val: 'Creative Web & WebGL' },
  { label: 'Arsitektur', val: '100/100 Core Vitals' },
  { label: 'Studio Lab', val: 'Founder of Ddev' },
  { label: 'Dampak Nyata', val: 'Borneo Globe Hub' }
];

const reveal = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
};

const About = () => {
  const [activeMilestone, setActiveMilestone] = useState(2);
  const current = milestones[activeMilestone];

  return (
    <section className="relative w-full bg-paper text-ink px-5 md:px-12 lg:px-20 pt-28 md:pt-36 pb-24 md:pb-32 overflow-hidden border-b border-ink/15">

      {/* Section tag */}
      <motion.div {...reveal} className="flex flex-col gap-2 mb-10 md:mb-14">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <DayakShieldEmblem className="w-3.5 h-3.5 text-ochre" color="#D97706" />
            <span className="font-mono text-[11px] uppercase tracking-[0.25em] font-bold">02 / Akar &amp; Visi</span>
          </div>
          <div className="flex-1 h-[1px] bg-ink/20" />
          <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-ink/60 hidden sm:inline">Pontianak, Kalimantan Barat</span>
        </div>
        <DayakBorderRibbon className="w-full h-2.5" color="#141413" opacity={0.2} />
      </motion.div>

      {/* Giant statement */}
      <motion.h2
        {...reveal}
        className="font-sans font-black uppercase tracking-tighter leading-[0.86] text-[14vw] md:text-[9.5vw] lg:text-[8.5vw] mb-14 md:mb-20"
      >
        Borneo rooted.<br />
        Code crafted.<br />
        <span className="outline-text">Cultural</span>{' '}
        <span className="text-ochre">computing.</span>
      </motion.h2>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

        {/* Left: identity */}
        <motion.div {...reveal} className="lg:col-span-5 flex flex-col gap-8">
          <div>
            <h3 className="font-sans font-black uppercase tracking-tight text-3xl md:text-4xl leading-none">
              Luigi Iram Rangi
            </h3>
            <p className="font-mono text-[11px] md:text-xs uppercase tracking-[0.2em] text-ink/60 mt-3">
              Creative Technologist · Dayak Developer
            </p>
          </div>

          <p className="font-sans text-base md:text-lg leading-relaxed text-[#333] max-w-md">
            Founder of <strong className="text-ink">Ddev</strong> and currently building at{' '}
            <a
              href="https://www.borneoglobe.org/"
              target="_blank"
              rel="noreferrer"
              className="font-bold text-ink underline decoration-2 underline-offset-4 hover:text-ochre transition-colors"
            >
              Borneo Globe
            </a>
            . Saya merancang dan merekayasa platform web berkinerja tinggi langsung dari garis khatulistiwa Pontianak, Kalimantan Barat.
          </p>

          {/* Quick stats as editorial table */}
          <dl className="border-t-2 border-ink">
            {quickStats.map((item) => (
              <div
                key={item.label}
                className="flex items-baseline justify-between gap-4 py-3.5 border-b border-ink/25 group hover:bg-ink hover:text-paper hover:px-3 transition-all duration-300 cursor-default"
              >
                <dt className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.2em] opacity-60">{item.label}</dt>
                <dd className="font-sans font-bold text-base md:text-lg text-right">{item.val}</dd>
              </div>
            ))}
          </dl>
        </motion.div>

        {/* Right: ecosystem + trajectory */}
        <div className="lg:col-span-7 flex flex-col gap-6 md:gap-8">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
            {/* Ddev card */}
            <motion.article
              {...reveal}
              className="group relative bg-ink text-paper border-2 border-ink p-5 md:p-6 transition-transform duration-200 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[8px_8px_0_#D97706]"
            >
              <DayakCornerAccent position="top-right" className="absolute top-2 right-2 w-3 h-3 text-ochre" />
              <div className="flex items-start justify-between gap-3 mb-1">
                <h4 className="font-sans font-black uppercase text-2xl md:text-3xl tracking-tight leading-none">Ddev Studio</h4>
                <span className="shrink-0 px-2.5 py-1 bg-ochre text-white font-mono text-[10px] font-bold uppercase tracking-widest">Founder</span>
              </div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-paper/60 mb-5">Creative Tech &amp; Web Lab</p>
              <ul className="flex flex-col gap-2.5">
                {[
                  '3D WebGL & Custom GLSL Shaders',
                  '100/100 Core Vitals (< 0.6s LCP)',
                  '8 Live Client Production Platforms',
                  '120+ Web Systems Architecture'
                ].map((pt) => (
                  <li key={pt} className="flex items-start gap-3 font-sans text-sm leading-snug">
                    <span className="mt-[7px] w-1.5 h-1.5 bg-ochre shrink-0" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </motion.article>

            {/* Borneo Globe card */}
            <motion.article
              {...reveal}
              transition={{ ...reveal.transition, delay: 0.1 }}
              className="group relative bg-paper-dark text-ink border-2 border-ink p-5 md:p-6 transition-transform duration-200 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[8px_8px_0_#D97706]"
            >
              <DayakCornerAccent position="top-right" className="absolute top-2 right-2 w-3 h-3 text-ochre" />
              <div className="flex items-start justify-between gap-3 mb-1">
                <h4 className="font-sans font-black uppercase text-2xl md:text-3xl tracking-tight leading-none">Borneo Globe</h4>
                <span className="mt-1 w-2.5 h-2.5 rounded-full bg-emerald animate-pulse shrink-0" />
              </div>
              <a
                href="https://www.borneoglobe.org/"
                target="_blank"
                rel="noreferrer"
                aria-label="Kunjungi situs Borneo Globe"
                className="inline-block font-mono text-[10px] uppercase tracking-[0.2em] text-ochre font-bold mb-5 underline underline-offset-4 decoration-2 hover:opacity-70 transition-opacity"
              >
                Active Role · borneoglobe.org ↗
              </a>
              <ul className="flex flex-col gap-2.5">
                {[
                  'Platform Konservasi & Riset Borneo',
                  '2,800+ Penerima Manfaat Digital',
                  'Kemitraan Konservasi Global',
                  '100% Mobile Ready & Resisten Pelosok'
                ].map((pt) => (
                  <li key={pt} className="flex items-start gap-3 font-sans text-sm leading-snug">
                    <span className="mt-[7px] w-1.5 h-1.5 bg-ochre shrink-0" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </motion.article>
          </div>

          {/* Evolution trajectory */}
          <motion.div {...reveal} className="border-2 border-ink bg-paper">
            <div className="flex items-stretch border-b-2 border-ink">
              <span className="hidden sm:flex items-center px-5 font-mono text-[10px] uppercase tracking-[0.2em] border-r-2 border-ink">
                Evolusi
              </span>
              {milestones.map((m, idx) => (
                <button
                  key={m.year}
                  onClick={() => setActiveMilestone(idx)}
                  aria-label={`Lihat milestone tahun ${m.year}: ${m.phase}`}
                  className={`flex-1 py-3 md:py-4 font-sans font-black text-xl md:text-3xl tracking-tighter transition-colors cursor-pointer ${
                    idx !== milestones.length - 1 ? 'border-r-2 border-ink' : ''
                  } ${activeMilestone === idx ? 'bg-ink text-paper' : 'hover:bg-ochre hover:text-white'}`}
                >
                  {m.year}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={current.year}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="p-5 md:p-7 flex flex-col gap-5"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h4 className="font-sans font-black text-xl md:text-2xl uppercase tracking-tight leading-tight">{current.title}</h4>
                    <span className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-ink/60">{current.phase}</span>
                  </div>
                  <span className="px-3 py-1.5 bg-ochre text-white border-2 border-ink font-mono text-[11px] font-bold uppercase tracking-wider">
                    {current.badge}
                  </span>
                </div>

                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5">
                  {current.points.map((pt) => (
                    <li key={pt} className="flex items-center gap-3 font-sans text-sm md:text-[15px] font-medium border-b border-ink/15 pb-2">
                      <span className="w-1.5 h-1.5 bg-ochre shrink-0" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
