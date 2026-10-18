import { useState, useEffect } from 'react';
import { ArrowUpRight, Copy, Check } from 'lucide-react';
import { DayakShieldEmblem } from './DayakMotifs';

export default function ContactTeaser({ onNavigateToContact }) {
  const [copied, setCopied] = useState(false);
  const [timeStr, setTimeStr] = useState('');

  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date();
        const options = {
          timeZone: 'Asia/Pontianak',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false
        };
        setTimeStr(new Intl.DateTimeFormat('id-ID', options).format(now));
      } catch {
        setTimeStr('01:00:00');
      }
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('iramrangi@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative w-full bg-[#111111] text-white py-20 md:py-28 px-6 md:px-12 lg:px-20 overflow-hidden">
      
      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />

      <div className="max-w-[1400px] mx-auto relative z-10">
        
        {/* Top Header metadata */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-white text-[10px] md:text-[11px] font-mono uppercase tracking-[0.2em]">
                <DayakShieldEmblem className="w-3.5 h-3.5 text-[#D97706]" color="#D97706" />
                Inisiasi Proyek
              </span>
              <span className="px-3 py-1 rounded-full bg-[#684AFF]/20 text-[#684AFF] text-[10px] md:text-[11px] font-mono uppercase tracking-[0.15em] font-bold">
                Halaman Khusus
              </span>
            </div>

            <h2 className="font-sans font-black text-3xl sm:text-4xl md:text-5xl lg:text-[58px] text-white tracking-[-0.03em] leading-[1.05]">
              Mulai Diskusi &amp; Kolaborasi<span className="text-[#684AFF]">.</span>
            </h2>
          </div>

          <p className="text-white/60 text-sm md:text-base max-w-lg leading-relaxed font-normal">
            Siap mendiskusikan sistem web baru, platform konservasi regional, maupun visual 3D interaktif. Kunjungi halaman kontak untuk formulir konsultasi lengkap.
          </p>
        </div>

        {/* Feature Banner Box */}
        <div className="p-8 md:p-12 rounded-[28px] md:rounded-[36px] bg-[#1A1A1A] border border-white/10 flex flex-col lg:flex-row items-center justify-between gap-8 mb-10">
          <div className="flex flex-col gap-3 text-center lg:text-left">
            <span className="font-mono text-xs uppercase tracking-widest text-[#10B981] flex items-center justify-center lg:justify-start gap-2">
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
              Tersedia untuk Penugasan Terpilih
            </span>
            <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
              iramrangi@gmail.com
            </span>
            <span className="text-white/50 font-mono text-xs">
              Pontianak, Kalimantan Barat (PTK {timeStr} WIB)
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 w-full lg:w-auto">
            <button
              onClick={handleCopyEmail}
              className="px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-mono text-xs uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-[#10B981]" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Tersalin' : 'Salin Email'}</span>
            </button>

            <button
              onClick={onNavigateToContact}
              className="px-8 py-3.5 rounded-full bg-[#684AFF] text-white font-sans text-xs md:text-sm font-bold uppercase tracking-[0.15em] hover:bg-white hover:text-[#111111] transition-all duration-300 shadow-lg hover:scale-105 cursor-pointer flex items-center gap-2 group"
            >
              <span>Buka Halaman Kontak Lengkap</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
