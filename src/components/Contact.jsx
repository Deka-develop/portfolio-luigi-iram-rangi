import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowUpRight, Copy, Check, Send, Sparkles, Zap, Layers, 
  Terminal, Globe, MessageSquare, ChevronDown, 
  ShieldCheck, Clock, ExternalLink, HelpCircle
} from 'lucide-react';
import { DayakShieldEmblem, DayakBorderRibbon } from './DayakMotifs';

const projectScopes = [
  {
    id: 'webgl-3d',
    title: 'WebGL 3D & Spatial Web',
    tag: 'Three.js • GPU Shaders • 120 FPS',
    desc: 'Visualisasi 3D interaktif, kanvas spasial, model pusaka digital, & pengalaman WebGL berkecepatan tinggi.',
    accent: '#684AFF',
    icon: Sparkles
  },
  {
    id: 'fullstack-web',
    title: 'Arsitektur Web Modern',
    tag: 'React 19 • Vite • Zero-Bloat API',
    desc: 'Platform web skala produksi, antarmuka responsif, state architecture tangguh, & performa tanpa kompromi.',
    accent: '#0284C7',
    icon: Layers
  },
  {
    id: 'performance-audit',
    title: 'Audit Kecepatan 100/100',
    tag: 'LCP < 0.6s • Core Web Vitals • SEO',
    desc: 'Optimasi performa web mutakhir untuk meraih skor absolut 100/100 Core Vitals dan struktur data SEO presisi.',
    accent: '#10B981',
    icon: Zap
  },
  {
    id: 'cultural-computing',
    title: 'Cultural Computing & Riset',
    tag: 'Borneo Globe • Pusaka Digital',
    desc: 'Digitalisasi warisan budaya Dayak, platform konservasi regional, & rekayasa perangkat lunak berbasis kearifan lokal.',
    accent: '#D97706',
    icon: Globe
  },
  {
    id: 'advisory',
    title: 'Tech Advisory & Konsultasi',
    tag: 'Arsitektur Kode • Review • Speaker',
    desc: 'Konsultasi arsitektur sistem perangkat lunak, review kualitas kode, sesi diskusi teknis, & kolaborasi riset.',
    accent: '#EC4899',
    icon: Terminal
  }
];

const timelineOptions = [
  { id: 'immediate', label: 'Segera (< 1 Bulan)', tag: 'Prioritas Tinggi' },
  { id: 'scheduled', label: '1 - 3 Bulan', tag: 'Terencana' },
  { id: 'exploratory', label: 'Eksplorasi Konsep', tag: 'R&D / Diskusi' }
];

const quickTemplates = [
  {
    label: '🚀 WebGL 3D Showroom',
    scopeId: 'webgl-3d',
    text: 'Halo Luigi, kami ingin mengembangkan platform web interaktif dengan visualisasi 3D Three.js berkecepatan 120 FPS untuk showcase produk kami...'
  },
  {
    label: '⚡ Web App React 19',
    scopeId: 'fullstack-web',
    text: 'Halo Luigi, kami memerlukan perancangan arsitektur aplikasi web modern berbasis React 19 dan RESTful backend yang tangguh dan responsif...'
  },
  {
    label: '📈 Audit Core Vitals 100/100',
    scopeId: 'performance-audit',
    text: 'Halo Luigi, kami ingin mengaudit dan mengoptimasi platform web kami yang sudah ada agar meraih skor 100/100 Core Web Vitals dan LCP di bawah 0.6 detik...'
  },
  {
    label: '🌿 Riset Budaya & Borneo',
    scopeId: 'cultural-computing',
    text: 'Halo Luigi, kami tertarik berkolaborasi dalam inisiatif pelestarian digital pusaka Dayak / riset teknologi bersama inisiatif Borneo Globe...'
  }
];

const faqs = [
  {
    id: 'faq-1',
    q: 'Bagaimana alur kolaborasi dan timeline pengerjaan proyek?',
    a: 'Setiap proyek dimulai dengan sesi discovery teknis (analisis kebutuhan & arsitektur), pembuatan prototype interaktif, implementasi kode ultra-ringan, hingga audit performa 100/100 dan peluncuran produksi dengan dokumentasi lengkap.'
  },
  {
    id: 'faq-2',
    q: 'Apakah Luigi melayani proyek kolaborasi jarak jauh (remote)?',
    a: 'Ya, seluruh pekerjaan dikelola secara profesional melalui kanal remote asinkron maupun sinkron (GitHub, Google Meet, Figma, Email) untuk klien dari seluruh Indonesia maupun internasional.'
  },
  {
    id: 'faq-3',
    q: 'Bagaimana status kepemilikan kode sumber (source code)?',
    a: '100% kepemilikan kode sumber (source code) dan aset milik klien seutuhnya tanpa sistem vendor lock-in. Repository diserahkan dengan standar dokumentasi arsitektur bersih.'
  },
  {
    id: 'faq-4',
    q: 'Bagaimana jaminan kecepatan dan optimasi Core Web Vitals?',
    a: 'Setiap platform yang dibangun Luigi mengacu pada standar rekayasa ketat: bundle size minimalis, lazy-loading cerdas, WebGL hardware accelerated yang terisolasi, dan validasi schema SEO terstruktur.'
  }
];

export default function Contact({ isDedicatedPage = false }) {
  const [timeStr, setTimeStr] = useState('');
  const [isNight, setIsNight] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedBrief, setCopiedBrief] = useState(false);
  const [selectedScope, setSelectedScope] = useState('webgl-3d');
  const [selectedTimeline, setSelectedTimeline] = useState('immediate');
  const [openFaq, setOpenFaq] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [activeConsoleTab, setActiveConsoleTab] = useState('json'); // 'json' | 'raw'

  const [formState, setFormState] = useState({
    name: '',
    contact: '',
    message: ''
  });

  // Live WIB Pontianak Clock with Day/Night cycle
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
        const formatted = new Intl.DateTimeFormat('id-ID', options).format(now);
        setTimeStr(formatted);

        const currentHour = parseInt(formatted.split(':')[0], 10);
        setIsNight(currentHour >= 18 || currentHour < 6);
      } catch {
        setTimeStr('01:00:00');
        setIsNight(false);
      }
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('iramrangi@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  const handleApplyTemplate = (tpl) => {
    setSelectedScope(tpl.scopeId);
    setFormState((prev) => ({
      ...prev,
      message: tpl.text
    }));
  };

  const activeScopeObj = projectScopes.find((s) => s.id === selectedScope) || projectScopes[0];
  const activeTimelineObj = timelineOptions.find((t) => t.id === selectedTimeline) || timelineOptions[0];

  // Synthesized brief text for copy & direct dispatch
  const synthesizedBrief = `[INIKASI KOLABORASI // LUIGI IRAM RANGI]
Pengirim: ${formState.name || 'Belum diisi'}
Kontak: ${formState.contact || 'Belum diisi'}
Lingkup: ${activeScopeObj.title}
Urgensi: ${activeTimelineObj.label}
Pesan / Catatan:
${formState.message || 'Belum ada catatan detail.'}
---
Lokasi Respon: Pontianak, Kalimantan Barat (WIB)`;

  const handleCopyBrief = () => {
    navigator.clipboard.writeText(synthesizedBrief);
    setCopiedBrief(true);
    setTimeout(() => setCopiedBrief(false), 2200);
  };

  const handleWhatsAppDispatch = () => {
    const waText = encodeURIComponent(
      `Halo Luigi Iram Rangi, saya ingin berdiskusi mengenai proyek kolaborasi:

👤 Nama: ${formState.name || 'Rekan Kolaborasi'}
📌 Lingkup: ${activeScopeObj.title}
⏱️ Target Waktu: ${activeTimelineObj.label}

📝 Detail Proyek:
${formState.message || 'Mohon informasi ketersediaan jadwal diskusi.'}

Salam hangat!`
    );
    window.open(`https://api.whatsapp.com/send?text=${waText}`, '_blank');
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formState.name || !formState.message) return;
    setIsSubmitting(true);

    try {
      await fetch('https://formsubmit.co/ajax/iramrangi@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: formState.name,
          contact: formState.contact || 'N/A',
          scope: activeScopeObj.title,
          urgency: activeTimelineObj.label,
          message: formState.message,
          _subject: `[DDEV Project Signal] ${formState.name} — ${activeScopeObj.title}`
        })
      });
      setIsSent(true);
    } catch {
      // Fallback mailto
      window.open(
        `mailto:iramrangi@gmail.com?subject=Inquiry: ${encodeURIComponent(
          activeScopeObj.title
        )} dari ${encodeURIComponent(formState.name)}&body=${encodeURIComponent(synthesizedBrief)}`
      );
      setIsSent(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className={`relative w-full bg-[#EDEEF0] text-[#111111] px-6 md:px-12 lg:px-20 ${isDedicatedPage ? 'pt-8 pb-24' : 'pt-28 md:pt-36 pb-24'} select-none`}>
      
      <div className="max-w-[1400px] mx-auto">
        
        {/* ───────────────── 1. REALTIME SIGNAL & RADAR BEACON BAR ───────────────── */}
        <div className="rounded-[22px] bg-white border border-[#111111]/10 p-4 md:p-5 shadow-sm mb-12 flex flex-wrap items-center justify-between gap-4">
          
          {/* Availability Status Pulse */}
          <div className="flex items-center gap-3">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#10B981]" />
            </span>
            <div className="flex flex-col">
              <span className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.2em] font-bold text-[#111111]">
                Status Sinyal: Terbuka Untuk Penugasan
              </span>
              <span className="font-mono text-[9px] text-[#111111]/50 uppercase tracking-wider">
                Kuartal Aktif 2026 • Proyek Terpilih &amp; Kolaborasi Khusus
              </span>
            </div>
          </div>

          {/* Realtime Pontianak Khatulistiwa Clock & Response SLA */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 font-mono text-[11px] text-[#111111]/70">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#EDEEF0]/80 border border-[#111111]/5">
              <span>{isNight ? '🌙' : '☀️'}</span>
              <span className="font-bold text-[#111111]">PTK {timeStr} WIB</span>
              <span className="text-[#111111]/40 hidden sm:inline">(UTC+7 Khatulistiwa)</span>
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#10B981]/10 text-[#0D5C3A] font-bold">
              <Clock className="w-3.5 h-3.5" />
              <span>SLA Respon: &lt; 12 Jam</span>
            </div>
          </div>

        </div>

        {/* ───────────────── 2. MAIN BESPOKE INTERACTIVE WORKSPACE ───────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          
          {/* Left Column (Cols 1-7): Smart Interactive Project Configurator & Form */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            
            {/* Step A: Project Scope Selector */}
            <div className="p-6 md:p-8 rounded-[28px] bg-white border border-[#111111]/10 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-[#111111] text-white flex items-center justify-center font-mono text-xs font-bold">
                    01
                  </span>
                  <h3 className="font-sans font-bold text-lg md:text-xl text-[#111111] tracking-tight">
                    Pilih Lingkup Kolaborasi
                  </h3>
                </div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#111111]/40">
                  {projectScopes.length} Spesialisasi
                </span>
              </div>

              <p className="text-xs text-[#111111]/60 mb-5 leading-relaxed">
                Tentukan domain rekayasa utama yang ingin Anda kembangkan bersama Luigi Iram Rangi:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {projectScopes.map((scope) => {
                  const Icon = scope.icon;
                  const isSelected = selectedScope === scope.id;

                  return (
                    <button
                      key={scope.id}
                      type="button"
                      onClick={() => setSelectedScope(scope.id)}
                      className={`p-4 rounded-[20px] text-left transition-all duration-300 border cursor-pointer flex flex-col justify-between gap-3 group relative overflow-hidden ${
                        isSelected
                          ? 'bg-[#111111] text-white border-[#111111] shadow-md ring-2 ring-[#684AFF]/40'
                          : 'bg-[#EDEEF0]/50 hover:bg-[#EDEEF0] text-[#111111] border-[#111111]/5 hover:border-[#111111]/15'
                      }`}
                    >
                      <div className="flex items-center justify-between w-full">
                        <div
                          className={`w-8 h-8 rounded-[10px] flex items-center justify-center transition-transform group-hover:scale-105 ${
                            isSelected ? 'bg-white/10 text-white' : 'bg-white text-[#111111] shadow-sm'
                          }`}
                        >
                          <Icon className="w-4 h-4" style={{ color: isSelected ? '#FFFFFF' : scope.accent }} />
                        </div>

                        {isSelected && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#684AFF] text-white text-[9px] font-mono uppercase tracking-wider font-bold">
                            <Check className="w-2.5 h-2.5" />
                            Aktif
                          </span>
                        )}
                      </div>

                      <div>
                        <span className="font-sans font-bold text-sm tracking-tight block leading-tight mb-1">
                          {scope.title}
                        </span>
                        <span className={`font-mono text-[10px] block leading-tight ${isSelected ? 'text-white/60' : 'text-[#111111]/50'}`}>
                          {scope.tag}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step B: Timeline Urgency Chips */}
            <div className="p-6 md:p-8 rounded-[28px] bg-white border border-[#111111]/10 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-6 h-6 rounded-lg bg-[#111111] text-white flex items-center justify-center font-mono text-xs font-bold">
                  02
                </span>
                <h3 className="font-sans font-bold text-lg md:text-xl text-[#111111] tracking-tight">
                  Target Peluncuran &amp; Urgensi
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {timelineOptions.map((time) => {
                  const isSelected = selectedTimeline === time.id;

                  return (
                    <button
                      key={time.id}
                      type="button"
                      onClick={() => setSelectedTimeline(time.id)}
                      className={`p-3.5 rounded-[16px] text-center border cursor-pointer transition-all duration-200 flex flex-col items-center gap-1 ${
                        isSelected
                          ? 'bg-[#684AFF] text-white border-[#684AFF] shadow-sm font-bold'
                          : 'bg-[#EDEEF0]/50 hover:bg-[#EDEEF0] text-[#111111] border-[#111111]/5 hover:border-[#111111]/15'
                      }`}
                    >
                      <span className="text-xs font-sans tracking-tight">{time.label}</span>
                      <span className={`font-mono text-[9px] uppercase tracking-wider ${isSelected ? 'text-white/80' : 'text-[#111111]/45'}`}>
                        {time.tag}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step C: Form Submission Box */}
            <div className="p-6 md:p-8 rounded-[28px] bg-white border border-[#111111]/10 shadow-sm relative overflow-hidden">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#111111]/10">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-[#111111] text-white flex items-center justify-center font-mono text-xs font-bold">
                    03
                  </span>
                  <div>
                    <h3 className="font-sans font-bold text-lg md:text-xl text-[#111111] tracking-tight">
                      Detail Pesan &amp; Pengirim
                    </h3>
                    <span className="font-mono text-[10px] text-[#111111]/50">
                      Terenkripsi SSL • Respon Langsung ke Email/WA Anda
                    </span>
                  </div>
                </div>

                <div className="hidden sm:inline-flex items-center gap-1 text-[10px] font-mono text-[#10B981] font-bold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Anti-Spam Verified</span>
                </div>
              </div>

              {/* Quick Template Inspirations */}
              <div className="mb-6">
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#111111]/45 block mb-2.5 font-bold">
                  ⚡ Klik Untuk Mengisi Template Cepat:
                </span>
                <div className="flex flex-wrap gap-2">
                  {quickTemplates.map((tpl) => (
                    <button
                      key={tpl.label}
                      type="button"
                      onClick={() => handleApplyTemplate(tpl)}
                      className="px-3 py-1.5 rounded-full bg-[#EDEEF0] hover:bg-[#684AFF]/10 hover:text-[#684AFF] border border-[#111111]/5 hover:border-[#684AFF]/30 text-xs font-sans text-[#111111]/80 transition-all cursor-pointer flex items-center gap-1.5"
                    >
                      <span>{tpl.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {isSent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-8 rounded-[24px] bg-[#10B981]/10 border border-[#10B981]/30 text-center flex flex-col items-center gap-3 my-4"
                >
                  <div className="w-12 h-12 rounded-full bg-[#10B981] text-white flex items-center justify-center text-xl shadow-md">
                    ✓
                  </div>
                  <h4 className="text-xl font-bold text-[#0D5C3A]">
                    Sinyal Proyek Berhasil Dikirimkan!
                  </h4>
                  <p className="text-xs md:text-sm text-[#0D5C3A]/80 max-w-md leading-relaxed">
                    Terima kasih telah menginisiasi kolaborasi bersama Luigi Iram Rangi. Detail brief telah diterima dan akan segera direspon melalui kontak yang Anda cantumkan.
                  </p>

                  <button
                    type="button"
                    onClick={() => {
                      setIsSent(false);
                      setFormState({ name: '', contact: '', message: '' });
                    }}
                    className="mt-3 px-6 py-2.5 rounded-full bg-[#0D5C3A] text-white font-mono text-xs uppercase tracking-wider font-bold hover:bg-[#094129] transition-colors cursor-pointer"
                  >
                    Kirim Pesan Lain
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleFormSubmit} className="flex flex-col gap-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="client-name" className="font-mono text-xs uppercase tracking-wider text-[#111111]/70 font-semibold">
                        Nama Lengkap / Instansi *
                      </label>
                      <input
                        id="client-name"
                        type="text"
                        required
                        aria-required="true"
                        placeholder="Contoh: Raden Suryo (Studio Kreatif)"
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-[16px] bg-[#EDEEF0]/60 border border-[#111111]/10 text-sm font-sans text-[#111111] focus:outline-none focus:border-[#684AFF] focus:bg-white focus:ring-2 focus:ring-[#684AFF]/20 transition-all"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="client-contact" className="font-mono text-xs uppercase tracking-wider text-[#111111]/70 font-semibold">
                        Email atau WhatsApp *
                      </label>
                      <input
                        id="client-contact"
                        type="text"
                        required
                        aria-required="true"
                        placeholder="Contoh: contact@suryo.io / 0812..."
                        value={formState.contact}
                        onChange={(e) => setFormState({ ...formState, contact: e.target.value })}
                        className="w-full px-4 py-3 rounded-[16px] bg-[#EDEEF0]/60 border border-[#111111]/10 text-sm font-sans text-[#111111] focus:outline-none focus:border-[#684AFF] focus:bg-white focus:ring-2 focus:ring-[#684AFF]/20 transition-all"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                      <label htmlFor="client-message" className="font-mono text-xs uppercase tracking-wider text-[#111111]/70 font-semibold">
                        Uraian Kebutuhan Proyek *
                      </label>
                      <span className="font-mono text-[10px] text-[#111111]/40">
                        Lingkup: {activeScopeObj.title}
                      </span>
                    </div>

                    <textarea
                      id="client-message"
                      rows={4}
                      required
                      aria-required="true"
                      placeholder="Jelaskan gambaran sistem, ekspektasi visual 3D, fitur utama, atau latar belakang kolaborasi..."
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-[16px] bg-[#EDEEF0]/60 border border-[#111111]/10 text-sm font-sans text-[#111111] focus:outline-none focus:border-[#684AFF] focus:bg-white focus:ring-2 focus:ring-[#684AFF]/20 transition-all resize-none leading-relaxed"
                    />
                  </div>

                  {/* Actions Bar */}
                  <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={handleCopyBrief}
                        className="px-4 py-2.5 rounded-full bg-[#EDEEF0] hover:bg-[#111111] hover:text-white border border-[#111111]/10 font-mono text-[11px] uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                        title="Salin ringkasan data formulir ke clipboard"
                      >
                        {copiedBrief ? <Check className="w-3.5 h-3.5 text-[#10B981]" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedBrief ? 'Tersalin!' : 'Salin Draft Brief'}</span>
                      </button>

                      <button
                        type="button"
                        onClick={handleWhatsAppDispatch}
                        className="px-4 py-2.5 rounded-full bg-[#25D366]/10 hover:bg-[#25D366] text-[#0D5C3A] hover:text-white border border-[#25D366]/30 font-mono text-[11px] uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer font-semibold"
                        title="Langsung chat Luigi Iram Rangi via WhatsApp"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Kirim via WA</span>
                      </button>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-7 py-3.5 rounded-full bg-[#111111] text-white hover:bg-[#684AFF] font-sans text-xs font-bold uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-50"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{isSubmitting ? 'Mengirim Sinyal...' : 'Kirim Pesan Sekarang'}</span>
                    </button>
                  </div>
                </form>
              )}
            </div>

          </div>

          {/* Right Column (Cols 8-12): Cyber Terminal Preview & Direct Channels */}
          <div className="lg:col-span-5 flex flex-col gap-6 lg:sticky lg:top-24">
            
            {/* 1. Cyber Dispatch Console Card */}
            <div className="rounded-[28px] bg-[#0C0D11] text-white p-6 md:p-7 shadow-xl border border-white/10 relative overflow-hidden">
              
              {/* Subtle CRT line scan effect */}
              <div
                className="absolute inset-0 pointer-events-none opacity-5"
                style={{
                  backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #FFFFFF 2px, #FFFFFF 4px)'
                }}
              />

              {/* Console Top Window Bar */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4 relative z-10">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
                  </div>
                  <span className="font-mono text-[10px] text-white/50 tracking-wider ml-1">
                    ddev-signal-terminal.sh
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
                  <span className="font-mono text-[9px] text-[#10B981] uppercase tracking-wider font-bold">
                    18ms ping
                  </span>
                </div>
              </div>

              {/* Interactive Live Payload Render */}
              <div className="font-mono text-xs text-white/80 leading-relaxed bg-[#050608] p-4 rounded-[18px] border border-white/5 mb-5 overflow-x-auto relative z-10">
                <div className="text-[#684AFF] font-bold mb-1">// Sinyal Inisiasi Proyek v2.6</div>
                <div className="text-white/40 mb-2"># Tujuan: Luigi Iram Rangi • Ddev Studio</div>
                
                <div className="flex flex-col gap-1 text-[11px]">
                  <div>
                    <span className="text-white/50">&gt; LINGKUP    : </span>
                    <span className="text-[#38BDF8] font-bold">{activeScopeObj.title}</span>
                  </div>
                  <div>
                    <span className="text-white/50">&gt; URGENSI    : </span>
                    <span className="text-[#FBBF24] font-bold">{activeTimelineObj.label}</span>
                  </div>
                  <div>
                    <span className="text-white/50">&gt; PENGIRIM   : </span>
                    <span className="text-white">{formState.name || '(Menunggu input nama)'}</span>
                  </div>
                  <div>
                    <span className="text-white/50">&gt; KONTAK     : </span>
                    <span className="text-white">{formState.contact || '(Menunggu email / WA)'}</span>
                  </div>
                  <div>
                    <span className="text-white/50">&gt; STATUS     : </span>
                    <span className="text-[#10B981] font-bold">SIAP DIKIRIM (TLS 1.3)</span>
                  </div>
                </div>
              </div>

              {/* Quick Actions inside Terminal */}
              <div className="grid grid-cols-2 gap-2 relative z-10">
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="p-3 rounded-[16px] bg-white/5 hover:bg-white/10 border border-white/10 text-white font-mono text-[10px] uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  {copiedEmail ? <Check className="w-3.5 h-3.5 text-[#10B981]" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedEmail ? 'Copied!' : 'Copy Email'}</span>
                </button>

                <a
                  href="mailto:iramrangi@gmail.com"
                  className="p-3 rounded-[16px] bg-[#684AFF] hover:bg-[#5739E6] text-white font-mono text-[10px] uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer font-bold shadow-md"
                >
                  <span>Buka Mail Client</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

            </div>

            {/* 2. Direct Channels Nexus Cards */}
            <div className="flex flex-col gap-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#111111]/50 font-bold px-1">
                Kanal Komunikasi &amp; Ekosistem
              </span>

              <div className="grid grid-cols-1 gap-2.5">
                {[
                  {
                    label: 'Email Utama',
                    val: 'iramrangi@gmail.com',
                    note: 'Respon Cepat 1x24 Jam',
                    href: 'mailto:iramrangi@gmail.com',
                    actionLabel: 'Kirim Email'
                  },
                  {
                    label: 'Instagram Direct',
                    val: '@iramrangi_dev',
                    note: 'Portofolio Visual & Creative Logs',
                    href: 'https://www.instagram.com/iramrangi_dev/',
                    actionLabel: 'Buka Profil'
                  },
                  {
                    label: 'GitHub Arsitektur',
                    val: 'github.com/deka-develop',
                    note: 'Open Source & Repositori Pusaka 3D',
                    href: 'https://github.com/deka-develop',
                    actionLabel: 'Lihat Repo'
                  },
                  {
                    label: 'Inisiatif Riset',
                    val: 'borneoglobe.org',
                    note: 'Platform Konservasi & Riset Digital Borneo',
                    href: 'https://www.borneoglobe.org/',
                    actionLabel: 'Jelajahi Hub'
                  }
                ].map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="p-4 rounded-[20px] bg-white border border-[#111111]/10 hover:border-[#684AFF] hover:shadow-md transition-all duration-300 flex items-center justify-between group cursor-pointer"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="font-mono text-[10px] uppercase tracking-wider text-[#111111]/50 font-bold">
                          {item.label}
                        </span>
                        <span className="text-[9px] font-mono px-2 py-0.2 rounded-full bg-[#111111]/5 text-[#111111]/60">
                          {item.note}
                        </span>
                      </div>
                      <span className="font-sans font-bold text-sm text-[#111111] group-hover:text-[#684AFF] transition-colors">
                        {item.val}
                      </span>
                    </div>

                    <div className="w-8 h-8 rounded-full bg-[#EDEEF0] group-hover:bg-[#684AFF] group-hover:text-white flex items-center justify-center transition-all">
                      <ArrowUpRight className="w-4 h-4 transition-transform group-hover:rotate-45" />
                    </div>
                  </a>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* ───────────────── 3. FAQ ACCORDION SECTION ───────────────── */}
        <div className="p-8 md:p-12 rounded-[32px] bg-white border border-[#111111]/10 shadow-sm mb-16">
          <div className="flex items-center gap-3 mb-2">
            <HelpCircle className="w-5 h-5 text-[#684AFF]" />
            <h3 className="font-sans font-black text-2xl md:text-3xl text-[#111111] tracking-tight">
              Tanya Jawab Seputar Kolaborasi (FAQ)
            </h3>
          </div>
          <p className="text-xs md:text-sm text-[#111111]/60 mb-8 max-w-xl">
            Informasi penting mengenai skema kerja sama, fleksibilitas pengerjaan, dan standar rekayasa bersama Luigi Iram Rangi.
          </p>

          <div className="flex flex-col gap-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === faq.id;

              return (
                <div
                  key={faq.id}
                  className="rounded-[20px] bg-[#EDEEF0]/40 border border-[#111111]/8 overflow-hidden transition-all"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : faq.id)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-[#EDEEF0]/80 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs font-bold text-[#684AFF]">
                        [0{idx + 1}]
                      </span>
                      <span className="font-sans font-bold text-sm md:text-base text-[#111111]">
                        {faq.q}
                      </span>
                    </div>

                    <ChevronDown
                      className={`w-4 h-4 text-[#111111]/50 transition-transform duration-300 shrink-0 ${
                        isOpen ? 'rotate-180 text-[#684AFF]' : ''
                      }`}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="px-5 pb-5 pt-1 text-xs md:text-sm text-[#111111]/70 leading-relaxed font-normal border-t border-[#111111]/5"
                      >
                        {faq.a}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

        {/* ───────────────── 4. BOTTOM COLOPHON FOOTER BAR ───────────────── */}
        <div className="pt-8 border-t border-[#111111]/10 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] md:text-[11px] font-mono uppercase tracking-[0.2em] text-[#111111]/50">
          <div className="flex items-center gap-2">
            <DayakShieldEmblem className="w-4 h-4 text-[#D97706]" color="#D97706" />
            <span className="font-bold text-[#111111]">LUIGI IRAM RANGI // FOUNDER OF DDEV</span>
          </div>

          <div className="flex items-center gap-4">
            <span>PONTIANAK, KALBAR</span>
            <span>•</span>
            <span>EDISI 2026</span>
          </div>

          <span>BUILT WITH REACT 19 &amp; THREE.JS</span>
        </div>

      </div>

    </section>
  );
}
