import { useEffect } from 'react';
import { ArrowLeft, ArrowUpRight, ChevronRight, Home } from 'lucide-react';
import { DayakShieldEmblem } from '../components/DayakMotifs';
import Contact from '../components/Contact';

export default function ContactPage({ onNavigate }) {
  useEffect(() => {
    const originalTitle = document.title;
    document.title = 'Kontak & Kolaborasi — Luigi Iram Rangi | Founder of Ddev';
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
            <span className="text-[#684AFF] font-bold">Kontak</span>
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
            <DayakShieldEmblem className="w-3.5 h-3.5 text-[#D97706]" color="#D97706" />
            Inisiasi Proyek &amp; Konsultasi Langsung
          </div>
          <span className="hidden sm:inline">Ddev Studio • Pontianak, West Borneo</span>
        </div>

        {/* Cohesive Headline & Narrative */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div className="max-w-3xl">
            <h1 className="font-sans font-black text-4xl sm:text-5xl md:text-6xl lg:text-[72px] text-[#111111] tracking-[-0.03em] leading-[1.05]">
              Kontak &amp; Mulai Kolaborasi<span className="text-[#684AFF]">.</span>
            </h1>
          </div>
          <p className="text-[#111111]/60 text-sm md:text-base lg:text-lg max-w-xl leading-relaxed font-normal">
            Halaman terdedikasi untuk konsultasi langsung, diskusi arsitektur perangkat lunak, maupun kolaborasi proyek web mutakhir bersama Luigi Iram Rangi.
          </p>
        </div>

      </section>

      {/* ───────────────── 2. MAIN CONTACT CONTENT ───────────────── */}
      <div className="w-full">
        <Contact />
      </div>

      {/* ───────────────── 3. NEXT STEPS & EXPLORE FURTHER FOOTER ───────────────── */}
      <section className="relative w-full py-20 md:py-28 px-6 md:px-12 lg:px-20 bg-white border-t border-[#111111]/10">
        <div className="max-w-[1400px] mx-auto">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.25em] text-[#684AFF] font-bold block mb-2">
                Eksplorasi Lanjutan
              </span>
              <h2 className="text-[#111111] text-3xl md:text-5xl font-black tracking-tight">
                Langkah Berikutnya<span className="text-[#684AFF]">.</span>
              </h2>
            </div>
            <p className="text-[#111111]/60 text-sm md:text-base max-w-md leading-relaxed">
              Jelajahi portofolio proyek atau lihat standar kapabilitas rekayasa kami.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <button
              onClick={() => onNavigate('karya')}
              className="p-8 rounded-[24px] bg-[#EDEEF0] border border-[#111111]/10 text-left hover:border-[#684AFF]/40 hover:bg-white hover:shadow-xl transition-all duration-300 group cursor-pointer flex flex-col justify-between min-h-[200px]"
            >
              <div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#111111]/40 block mb-2">
                  01 / Portofolio
                </span>
                <h3 className="text-xl md:text-2xl font-bold text-[#111111] group-hover:text-[#684AFF] transition-colors mb-2">
                  Karya Terpilih
                </h3>
                <p className="text-xs md:text-sm text-[#111111]/60 leading-relaxed font-normal">
                  Katalog sistem web produksi skala nasional &amp; regional dengan live demo.
                </p>
              </div>
              <div className="flex items-center gap-2 font-mono text-xs text-[#111111] font-bold uppercase tracking-wider group-hover:text-[#684AFF] mt-6">
                <span>Buka Karya</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </div>
            </button>

            <button
              onClick={() => onNavigate('milestone-3d')}
              className="p-8 rounded-[24px] bg-[#EDEEF0] border border-[#111111]/10 text-left hover:border-[#684AFF]/40 hover:bg-white hover:shadow-xl transition-all duration-300 group cursor-pointer flex flex-col justify-between min-h-[200px]"
            >
              <div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#111111]/40 block mb-2">
                  02 / Laboratorium 3D
                </span>
                <h3 className="text-xl md:text-2xl font-bold text-[#111111] group-hover:text-[#684AFF] transition-colors mb-2">
                  Milestone 3D
                </h3>
                <p className="text-xs md:text-sm text-[#111111]/60 leading-relaxed font-normal">
                  Arsip interaktif 4 model WebGL Three.js, benchmark performa, dan rekam jejak.
                </p>
              </div>
              <div className="flex items-center gap-2 font-mono text-xs text-[#111111] font-bold uppercase tracking-wider group-hover:text-[#684AFF] mt-6">
                <span>Buka Milestone 3D</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </div>
            </button>

            <button
              onClick={() => onNavigate('kapabilitas')}
              className="p-8 rounded-[24px] bg-[#EDEEF0] border border-[#111111]/10 text-left hover:border-[#684AFF]/40 hover:bg-white hover:shadow-xl transition-all duration-300 group cursor-pointer flex flex-col justify-between min-h-[200px]"
            >
              <div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#111111]/40 block mb-2">
                  03 / Spesifikasi
                </span>
                <h3 className="text-xl md:text-2xl font-bold text-[#111111] group-hover:text-[#684AFF] transition-colors mb-2">
                  Kapabilitas
                </h3>
                <p className="text-xs md:text-sm text-[#111111]/60 leading-relaxed font-normal">
                  Tolok ukur Core Web Vitals 100/100, arsitektur sistem, dan game Cyber Arcade.
                </p>
              </div>
              <div className="flex items-center gap-2 font-mono text-xs text-[#111111] font-bold uppercase tracking-wider group-hover:text-[#684AFF] mt-6">
                <span>Buka Kapabilitas</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </div>
            </button>
          </div>

          {/* Centered Return to Home Button */}
          <div className="w-full flex items-center justify-center pt-8 border-t border-[#111111]/10">
            <button
              onClick={() => onNavigate('home')}
              className="px-8 py-4 rounded-full bg-[#111111] text-[#EDEEF0] font-sans text-xs md:text-sm font-bold uppercase tracking-[0.15em] hover:bg-[#684AFF] transition-all duration-300 shadow-md hover:scale-105 cursor-pointer flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Kembali ke Halaman Utama</span>
            </button>
          </div>

        </div>
      </section>

    </article>
  );
}
