import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, ExternalLink, Sparkles, Layers, ShieldCheck, Zap, Globe, Lock, X, CheckCircle2 } from 'lucide-react';

import borneoGlobeImg from '../assets/projects/borneo-globe.webp';
import ddevStudioImg from '../assets/projects/ddev-studio.webp';
import nebulaProImg from '../assets/projects/nebula-pro.webp';
import borneoBusinessImg from '../assets/projects/borneo-business.webp';

const projects = [
  {
    id: 'borneo-globe',
    num: '01',
    title: 'Borneo Globe',
    subtitle: 'Connecting Futures — From Local Roots to Global Reach',
    category: 'Digital Impact Platform',
    role: 'Active Role',
    status: 'CURRENTLY ENGAGED',
    statusColor: 'emerald',
    year: '2025 - Present',
    url: 'https://www.borneoglobe.org/',
    image: borneoGlobeImg,
    glow: 'from-blue-600/20 via-teal-500/15 to-transparent',
    accentColor: '#38bdf8',
    highlightMetric: '1,840+ Beneficiaries',
    description: 'Platform digital resmi Borneo Globe (borneoglobe.org) dengan visi "From Local Roots to Global Reach". Memberdayakan bisnis dan komunitas lokal dengan strategi digital pintar, pelatihan terarah, dan koneksi global berkelanjutan.',
    tech: ['Web Platform', 'Digital Strategy', 'Global Reach', 'Impact Ecosystem'],
    caseStudy: {
      client: 'Borneo Globe Regional Initiative',
      location: 'West Borneo, Indonesia',
      challenge: 'Membangun jembatan digital antara inisiatif pulau Borneo dengan mitra dan peneliti internasional melalui platform yang cepat, kredibel, dan ramah koneksi pelosok.',
      solution: 'Arsitektur web berbasis data regional dengan visualisasi infografis dinamis, UI ramah lingkungan, optimasi aset ringan, dan pemuatan tanpa lag di seluruh perangkat.',
      metrics: [
        { label: 'Beneficiaries', val: '1,840+' },
        { label: 'Accessibility', val: '100% Mobile Ready' },
        { label: 'Regional Reach', val: 'Borneo Active' }
      ],
      deliverables: ['Official Web Platform', 'Regional Impact Ecosystem', 'Cross-Device Architecture']
    }
  },
  {
    id: 'ddev-studio',
    num: '02',
    title: 'Ddev (Dayak Developer)',
    subtitle: 'Futuristic Web Design Studio & Marketplace',
    category: 'Flagship Platform',
    role: 'Founder & Lead',
    status: 'FLAGSHIP ECOSYSTEM',
    statusColor: 'cyan',
    year: '2025',
    url: 'https://www.instagram.com/iramrangi_dev/',
    image: ddevStudioImg,
    glow: 'from-cyan-500/20 via-blue-600/15 to-transparent',
    accentColor: '#00f0ff',
    highlightMetric: '120+ Templates Built',
    description: 'Studio digital dan ekosistem template modern dari Borneo Barat. Memadukan estetika futuristik neon-cyber dengan sentuhan motif orisinal Dayak.',
    tech: ['React', 'Three.js WebGL', 'Tailwind CSS', 'Framer Motion'],
    caseStudy: {
      client: 'Ddev Studio Ecosystem',
      location: 'Pontianak, West Borneo',
      challenge: 'Menghadirkan studio kreatif independen yang mampu bersaing di pasar global dengan memadukan identitas orisinal Dayak dan rekayasa web 3D mutakhir.',
      solution: 'Memproduksi 120+ template berkinerja tinggi, sistem desain modular, animasi kinetik WebGL 120 FPS, serta pasar digital untuk kreator web.',
      metrics: [
        { label: 'Templates Built', val: '120+' },
        { label: 'Render Target', val: '120 FPS WebGL' },
        { label: 'Global Clients', val: '14+ Countries' }
      ],
      deliverables: ['Custom 3D Shaders', 'Design Tokens System', 'Template Store Architecture']
    }
  },
  {
    id: 'nebula-pro',
    num: '03',
    title: 'Nebula Pro & Integrita',
    subtitle: 'High-Performance Blogger XML Template Engine',
    category: 'Template Engine',
    role: 'Core Architect',
    status: 'BEST SELLER',
    statusColor: 'purple',
    year: '2025',
    url: '#',
    image: nebulaProImg,
    glow: 'from-purple-500/20 via-pink-600/15 to-transparent',
    accentColor: '#b537f2',
    highlightMetric: '100/100 PageSpeed',
    description: 'Mesin template Blogger berkecepatan tinggi dengan skor Google PageSpeed 100/100, valid Schema markup semantik, dark-mode dinamis, dan optimasi AdSense siap pakai.',
    tech: ['Native XML', 'PageSpeed 100', 'Schema SEO', 'AdSense Ready'],
    caseStudy: {
      client: 'Blogger / Google Publishing Ecosystem',
      location: 'Global Distribution',
      challenge: 'Template Blogger konvensional sering lambat, merusak Core Web Vitals, dan menghasilkan nilai SEO serta pendapatan AdSense yang rendah.',
      solution: 'Merancang arsitektur XML murni tanpa library berat, validasi Schema.org JSON-LD semantik 100%, dan CSS non-blocking dengan pemuatan instan di bawah 0.6 detik.',
      metrics: [
        { label: 'Google PageSpeed', val: '100 / 100' },
        { label: 'LCP Speed', val: '< 0.6s' },
        { label: 'SEO Schema Score', val: '100% Valid' }
      ],
      deliverables: ['Native XML Architecture', 'Dynamic Dark Mode', 'Google AdSense Ready Layouts']
    }
  },
  {
    id: 'borneo-business',
    num: '04',
    title: 'Borneo Business & Folio',
    subtitle: 'Corporate & Creative Portfolio Showcase Suite',
    category: 'Corporate Suite',
    role: 'UI/UX Engineer',
    status: 'ENTERPRISE',
    statusColor: 'amber',
    year: '2024',
    url: '#',
    image: borneoBusinessImg,
    glow: 'from-amber-500/20 via-orange-600/15 to-transparent',
    accentColor: '#f59e0b',
    highlightMetric: 'High Conversion UX',
    description: 'Suite tampilan profesional minimalis-futuristik untuk bisnis dan kreator modern. Dilengkapi micro-interactions halus, filter galeri cerdas, dan arsitektur mobile-first.',
    tech: ['TypeScript', 'Smooth Motion', 'Luxury UI', 'Mobile First'],
    caseStudy: {
      client: 'Enterprise & Creator Clients',
      location: 'Indonesia & Southeast Asia',
      challenge: 'Perusahaan dan kreator membutuhkan portofolio digital yang tampak premium, berwibawa, dan memiliki tingkat konversi penawaran tinggi.',
      solution: 'Desain luxury gelap dengan mikro-animasi fisika presisi, struktur showcase interaktif, serta integrasi kontak yang cepat dan responsif.',
      metrics: [
        { label: 'Conversion Lift', val: '+45%' },
        { label: 'Load Time', val: '0.4s' },
        { label: 'Client Retention', val: '98%' }
      ],
      deliverables: ['Executive UI Design', 'Interactive Filter Suite', 'Lead Capture System']
    }
  }
];

export default function Projects() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [modalProject, setModalProject] = useState(null);
  const activeProject = projects[activeIdx] || projects[0];

  // Press ESC to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setModalProject(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <section className="w-full h-full min-h-screen bg-transparent pt-24 md:pt-28 pb-10 flex flex-col justify-center relative overflow-hidden select-none">
      
      {/* Background Dynamic Atmospheric Glow */}
      <div 
        className={`absolute -right-20 top-1/3 w-[500px] h-[500px] bg-gradient-to-br ${activeProject.glow} rounded-full blur-[140px] pointer-events-none transition-all duration-700`}
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 w-full relative z-10 flex flex-col justify-between">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 md:mb-8 pb-4 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-white/80 text-[11px] font-mono font-semibold tracking-widest uppercase">
                02 / Works & Ecosystem
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-black text-white uppercase tracking-tight">
              Selected Works & Engagements
            </h2>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono text-white/75">
            <span>DDEV STUDIO</span>
            <span>•</span>
            <span className="text-emerald-400">BORNEO GLOBE ACTIVE</span>
          </div>
        </div>

        {/* Main Split Showcase Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          
          {/* Left Column (5 Cols): Interactive Project Navigator List */}
          <div className="lg:col-span-5 flex flex-col gap-2.5">
            {projects.map((project, idx) => {
              const isSelected = activeIdx === idx;
              return (
                <div
                  key={project.id}
                  onMouseEnter={() => setActiveIdx(idx)}
                  onClick={() => setActiveIdx(idx)}
                  className={`group relative p-3.5 sm:p-4 rounded-2xl border transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? 'bg-white/[0.07] border-white/30 shadow-[0_10px_30px_rgba(0,0,0,0.6)] backdrop-blur-xl'
                      : 'bg-white/[0.02] border-white/5 hover:border-white/15 hover:bg-white/[0.04]'
                  }`}
                >
                  {/* Active Highlight Bar */}
                  {isSelected && (
                    <motion.div
                      layoutId="activeProjectBar"
                      className="absolute left-0 top-3 bottom-3 w-1 rounded-r-full"
                      style={{ backgroundColor: project.accentColor }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}

                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className={`text-xs font-mono font-bold transition-colors ${
                        isSelected ? 'text-cyan-300' : 'text-white/70'
                      }`}>
                        {project.num}
                      </span>
                      <div>
                        <h3 className={`text-base sm:text-lg font-display font-bold leading-tight transition-colors ${
                          isSelected ? 'text-white' : 'text-white/70 group-hover:text-white'
                        }`}>
                          {project.title}
                        </h3>
                        <p className="text-[11px] font-sans text-white/75 line-clamp-1 mt-0.5">
                          {project.subtitle}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`hidden sm:inline-block px-2 py-0.5 rounded text-[9px] font-mono uppercase tracking-wider border ${
                        project.statusColor === 'emerald'
                          ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                          : project.statusColor === 'cyan'
                          ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-300'
                          : project.statusColor === 'purple'
                          ? 'bg-purple-500/10 border-purple-500/30 text-purple-300'
                          : 'bg-amber-500/10 border-amber-500/30 text-amber-300'
                      }`}>
                        {project.role}
                      </span>

                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all ${
                        isSelected 
                          ? 'bg-white text-black shadow-md scale-105' 
                          : 'bg-white/5 text-white/70 group-hover:bg-white/10 group-hover:text-white'
                      }`}>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column (7 Cols): High-Performance Live Project Preview Card */}
          <div className="lg:col-span-7 relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProject.id}
                initial={{ opacity: 0, scale: 0.96, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: -10 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="relative rounded-3xl bg-neutral-950/90 border border-white/15 backdrop-blur-2xl shadow-[0_25px_60px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col justify-between"
              >
                {/* Top Subtle Shimmer Border */}
                <div 
                  className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" 
                />

                {/* Sleek Browser Window Chrome */}
                <div className="px-4 py-2.5 bg-neutral-900/95 border-b border-white/10 flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                    </div>
                    <div className="ml-2 hidden sm:flex items-center gap-1.5 px-3 py-0.5 rounded-lg bg-black/50 border border-white/10 text-[11px] text-white/70">
                      <Lock className="w-3 h-3 text-emerald-400 shrink-0" />
                      <span className="truncate max-w-[200px]">
                        {activeProject.url !== '#' ? activeProject.url.replace(/^https?:\/\//, '') : `${activeProject.id}.ddev.studio`}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span 
                      className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold border"
                      style={{ 
                        color: activeProject.accentColor, 
                        borderColor: `${activeProject.accentColor}40`,
                        backgroundColor: `${activeProject.accentColor}15`
                      }}
                    >
                      {activeProject.status}
                    </span>
                    <span className="text-[10px] text-white/70 hidden sm:inline-block">
                      {activeProject.year}
                    </span>
                  </div>
                </div>

                {/* Preview Image Stage (Clickable to open Case Study) */}
                <div 
                  onClick={() => setModalProject(activeProject)}
                  className="relative w-full aspect-[16/9] overflow-hidden bg-neutral-900 group cursor-pointer"
                  title="Klik untuk melihat Case Study & Spesifikasi Lengkap"
                >
                  <img
                    src={activeProject.image}
                    alt={activeProject.title}
                    width="800"
                    height="450"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent pointer-events-none" />

                  {/* Hover Prompt Overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                    <span className="px-4 py-2 rounded-xl bg-black/80 border border-white/30 text-xs font-mono text-white flex items-center gap-2 shadow-2xl backdrop-blur-md">
                      <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Buka Case Study & Specs</span>
                    </span>
                  </div>

                  {/* Corner Metric Pill */}
                  <div className="absolute bottom-3 right-3 pointer-events-none">
                    <span className="px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/15 text-[11px] font-mono text-cyan-300 shadow-lg">
                      {activeProject.highlightMetric}
                    </span>
                  </div>
                </div>

                {/* Card Content & Action Bar */}
                <div className="p-5 sm:p-6 flex flex-col justify-between gap-4">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <h3 className="text-xl sm:text-2xl font-display font-bold text-white">
                        {activeProject.title}
                      </h3>
                      <span className="text-xs font-mono text-white/75 uppercase">
                        {activeProject.category}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed line-clamp-2">
                      {activeProject.description}
                    </p>
                  </div>

                  {/* Tech Stack Pills & CTA */}
                  <div className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-wrap items-center gap-1.5">
                      {activeProject.tech.map((t, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-0.5 rounded-md text-[10px] font-mono bg-white/[0.04] border border-white/10 text-white/80"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setModalProject(activeProject)}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-mono font-bold bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-all duration-300 shadow-md cursor-pointer hover:scale-105"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Case Study & Specs</span>
                      </button>

                      {activeProject.url && activeProject.url !== '#' && (
                        <a
                          href={activeProject.url}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-mono font-bold text-black transition-all duration-300 shadow-md cursor-pointer hover:scale-105"
                          style={{ backgroundColor: activeProject.accentColor }}
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>Visit Site</span>
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

      {/* Deep-Dive Case Study & Specs Modal */}
      <AnimatePresence>
        {modalProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 select-text">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setModalProject(null)}
              className="absolute inset-0 bg-black/85 backdrop-blur-md cursor-pointer"
            />

            {/* Modal Dialog Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              transition={{ type: "spring", stiffness: 350, damping: 30 }}
              className="relative w-full max-w-3xl max-h-[88vh] rounded-3xl bg-[#090a10] border border-white/20 shadow-[0_25px_80px_rgba(0,0,0,0.95)] overflow-hidden flex flex-col z-10"
            >
              {/* Header Bar */}
              <div className="px-6 py-4 bg-neutral-900/90 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
                  <span className="text-xs font-mono font-bold tracking-wider text-white/75 uppercase">
                    Case Study • {modalProject.num}
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

              {/* Scrollable Modal Content */}
              <div className="p-6 sm:p-7 overflow-y-auto space-y-5">
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
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
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
                  <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-white/10">
                    <span className="text-[10px] font-mono font-bold tracking-widest text-red-400 uppercase block mb-1.5">
                      The Challenge
                    </span>
                    <p className="text-xs sm:text-sm text-white/80 font-light leading-relaxed">
                      {modalProject.caseStudy?.challenge}
                    </p>
                  </div>

                  <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-white/10">
                    <span className="text-[10px] font-mono font-bold tracking-widest text-emerald-400 uppercase block mb-1.5">
                      Engineered Solution
                    </span>
                    <p className="text-xs sm:text-sm text-white/80 font-light leading-relaxed">
                      {modalProject.caseStudy?.solution}
                    </p>
                  </div>
                </div>

                {/* 3 Key Metrics Cards */}
                <div className="grid grid-cols-3 gap-3">
                  {modalProject.caseStudy?.metrics.map((m, mIdx) => (
                    <div 
                      key={mIdx}
                      className="p-3 sm:p-4 rounded-2xl bg-neutral-950/60 border border-white/10 text-center flex flex-col justify-center"
                    >
                      <span className="text-lg sm:text-2xl font-display font-black text-white" style={{ color: modalProject.accentColor }}>
                        {m.val}
                      </span>
                      <span className="text-[10px] sm:text-xs font-mono text-white/75 mt-0.5">
                        {m.label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Deliverables & Tech Chips */}
                <div>
                  <span className="text-[10px] font-mono text-white/70 uppercase tracking-widest block mb-2">
                    Key Deliverables & Technology
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {modalProject.caseStudy?.deliverables.map((del, dIdx) => (
                      <span
                        key={dIdx}
                        className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-mono"
                      >
                        <CheckCircle2 className="w-3 h-3 text-cyan-400" />
                        <span>{del}</span>
                      </span>
                    ))}
                    {modalProject.tech.map((t, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-3 py-1 rounded-xl bg-white/5 border border-white/10 text-white/70 text-xs font-mono"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer Actions */}
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
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-mono font-bold text-black transition-all shadow-md hover:scale-105 cursor-pointer"
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
