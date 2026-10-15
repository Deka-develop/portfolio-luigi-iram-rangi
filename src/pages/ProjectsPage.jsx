import { useEffect } from 'react';
import { ArrowLeft, ChevronRight, Home } from 'lucide-react';
import { DayakShieldEmblem } from '../components/DayakMotifs';
import Projects from '../components/Projects';

export default function ProjectsPage({ onNavigate }) {
  useEffect(() => {
    const originalTitle = document.title;
    document.title = 'Karya Terpilih & Portofolio — Luigi Iram Rangi | Founder of Ddev';
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return () => {
      document.title = originalTitle;
    };
  }, []);

  return (
    <article className="relative w-full bg-[#EDEEF0] text-[#111111] overflow-x-clip min-h-screen">
      
      {/* ───────────────── 1. BREADCRUMBS & HERO HEADER BANNER ───────────────── */}
      <section className="relative w-full pt-28 md:pt-36 pb-12 px-6 md:px-12 lg:px-20 max-w-[1400px] mx-auto border-b border-[#111111]/10">
        
        {/* Navigation Breadcrumb Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-2 text-xs font-mono text-[#111111]/60">
            <button
              onClick={() => onNavigate('home')}
              className="inline-flex items-center gap-1.5 hover:text-[#111111] hover:underline cursor-pointer transition-colors"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Beranda</span>
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-[#111111]/30" />
            <span className="text-[#684AFF] font-bold">Karya Terpilih</span>
          </div>

          <button
            onClick={() => onNavigate('home')}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#111111]/15 text-[#111111] text-xs font-mono uppercase tracking-wider hover:bg-[#111111] hover:text-white transition-all shadow-sm cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Kembali ke Beranda</span>
          </button>
        </div>

        {/* Archival metadata line */}
        <div className="flex items-center justify-between mb-8 text-[10px] md:text-[11px] font-mono uppercase tracking-[0.25em] text-[#111111]/50">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#111111] text-[#EDEEF0] text-[10px] md:text-[11px] font-mono uppercase tracking-[0.2em]">
            <DayakShieldEmblem className="w-3.5 h-3.5 text-[#684AFF]" color="#684AFF" />
            Katalog Produksi &amp; Studi Kasus
          </div>
          <span className="hidden sm:inline">Ddev Studio • Pontianak, West Borneo</span>
        </div>

        {/* Cohesive Headline & Narrative */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div className="max-w-3xl">
            <h1 className="font-sans font-black text-4xl sm:text-5xl md:text-6xl lg:text-[72px] text-[#111111] tracking-[-0.03em] leading-[1.05]">
              Karya Terpilih &amp; Ekosistem Digital<span className="text-[#684AFF]">.</span>
            </h1>
          </div>
          <p className="text-[#111111]/60 text-sm md:text-base lg:text-lg max-w-xl leading-relaxed font-normal">
            Halaman arsip menyeluruh dari platform resmi berdaya jangkau internasional, e-commerce Nusantara, sistem media penerbitan, hingga arsitektur web modern skala regional.
          </p>
        </div>

      </section>

      {/* ───────────────── 2. MAIN PROJECTS CONTENT ───────────────── */}
      <div className="w-full">
        <Projects />
      </div>

    </article>
  );
}
