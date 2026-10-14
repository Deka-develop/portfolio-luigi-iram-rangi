import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';

// Words of the manifesto that reveal one-by-one while scrolling (b = emphasised)
const MANIFESTO = [
  'I', 'build', ['the', 1], ['web', 1], 'the', 'way', 'it', 'should', 'feel', '—',
  ['fast,', 1], ['honest', 1], 'and', ['rooted.', 1], 'From', 'the', 'heart', 'of', 'Borneo,',
  'I', 'turn', 'ideas', 'into', ['interactive', 1], ['platforms,', 1], ['3D', 1], ['experiences', 1],
  'and', 'brand', 'systems', 'that', 'load', 'instantly,', 'work', 'everywhere', 'and', 'are', 'remembered.',
  'Because', 'for', 'me,', 'code', 'isn’t', 'just', 'about', 'shipping', '—', 'it’s', 'about', 'making',
  'ideas', ['seen,', 1], ['felt,', 1], ['and', 1], ['trusted.', 1]
].map((w) => (Array.isArray(w) ? { t: w[0], b: true } : { t: w, b: false }));

function Word({ progress, start, end, bold, children }) {
  const opacity = useTransform(progress, [start, end], [0.12, 1]);
  return (
    <motion.span
      style={{ opacity }}
      className={`inline-block mr-[0.28em] ${bold ? 'font-black' : 'font-normal'}`}
    >
      {children}
    </motion.span>
  );
}

const STAGE_BREAKS = [0.22, 0.47, 0.77];

const Hero = ({ setActiveSection }) => {
  const ref = useRef(null);
  const [stage, setStage] = useState(0);

  const { scrollYProgress: p } = useScroll({
    target: ref,
    offset: ['start start', 'end end']
  });

  useMotionValueEvent(p, 'change', (v) => {
    const next = v < STAGE_BREAKS[0] ? 0 : v < STAGE_BREAKS[1] ? 1 : v < STAGE_BREAKS[2] ? 2 : 3;
    setStage((prev) => (prev === next ? prev : next));
  });

  // Stage A — giant name (clamped so opacity cannot go negative and invalidate CSS)
  const aOpacity = useTransform(p, [0, 0.14, 0.22], [1, 1, 0], { clamp: true });
  const aDisplay = useTransform(p, (v) => (v < 0.25 ? 'flex' : 'none'));
  const aRotate = useTransform(p, [0, 0.22], [0, 62], { clamp: true });
  const aY = useTransform(p, [0, 0.22], [0, -70], { clamp: true });
  const aScale = useTransform(p, [0, 0.22], [1, 0.88], { clamp: true });

  // Stage B — numbers
  const bOpacity = useTransform(p, [0.18, 0.27, 0.41, 0.49], [0, 1, 1, 0], { clamp: true });
  const bDisplay = useTransform(p, (v) => (v >= 0.16 && v < 0.52 ? 'block' : 'none'));
  const bLeftX = useTransform(p, [0.18, 0.3], [-80, 0], { clamp: true });
  const bRightX = useTransform(p, [0.2, 0.32], [80, 0], { clamp: true });

  // Stage C — manifesto
  const cOpacity = useTransform(p, [0.45, 0.52, 0.71, 0.79], [0, 1, 1, 0], { clamp: true });
  const cDisplay = useTransform(p, (v) => (v >= 0.43 && v < 0.82 ? 'flex' : 'none'));

  // Stage D — call to action
  const dOpacity = useTransform(p, [0.75, 0.84], [0, 1], { clamp: true });
  const dDisplay = useTransform(p, (v) => (v >= 0.73 ? 'flex' : 'none'));
  const dY = useTransform(p, [0.75, 0.86], [60, 0], { clamp: true });

  const barScale = useTransform(p, [0, 1], [0, 1], { clamp: true });

  return (
    <section ref={ref} className="relative w-full h-[520vh] bg-paper z-10">
      <div className="sticky top-0 left-0 w-full h-[100svh] overflow-hidden">

        {/* Subtle paper grid */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.5]"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(17,17,17,0.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(17,17,17,0.045) 1px, transparent 1px)',
            backgroundSize: '80px 80px'
          }}
        />

        {/* ───────── Stage A: giant name ───────── */}
        <motion.div
          style={{ opacity: aOpacity, display: aDisplay, perspective: 1500 }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <motion.div
            style={{ rotateX: aRotate, y: aY, scale: aScale, transformOrigin: '50% 100%' }}
            className="relative flex items-center justify-center"
          >
            <h1 className="font-sans text-ink text-[27vw] md:text-[21vw] lg:text-[19vw] font-bold uppercase leading-[0.78] tracking-tighter select-none">
              <motion.span
                initial={{ y: '40%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.7, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="inline-block"
              >
                RANGI
              </motion.span>
            </h1>

            {/* LUIGI IRAM label (left of the word on desktop, above on mobile) */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 2.0, duration: 0.7 }}
              className="absolute left-0 bottom-[104%] md:bottom-[6%] md:right-[101%] md:left-auto md:mr-6 flex flex-col items-start md:items-end"
            >
              <div className="w-8 md:w-14 h-[1.5px] bg-ink mb-1.5 md:mb-2" />
              <span className="font-sans font-bold text-[11px] md:text-[17px] lg:text-[20px] uppercase tracking-[0.1em] text-ink whitespace-nowrap">
                LUIGI IRAM
              </span>
            </motion.div>

            {/* Role (right under the word) */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.1, duration: 0.7 }}
              className="absolute left-0 md:left-auto md:right-0 top-[108%] mt-2 md:mt-5 flex flex-col items-start"
            >
              <h2 className="font-sans text-[12px] md:text-[16px] lg:text-[20px] font-bold uppercase tracking-widest text-ink">
                Creative Developer
              </h2>
              <p className="font-sans font-normal text-[10px] md:text-[14px] lg:text-[18px] text-[#555] tracking-wide mt-1 whitespace-nowrap">
                Web 3D · Brand Systems · Interactive Web
              </p>
            </motion.div>
          </motion.div>

          {/* Rotating Ddev sticker */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2.3, duration: 0.7, type: 'spring' }}
            className="absolute right-[7%] top-[16%] md:right-[11%] md:top-[18%] w-20 h-20 md:w-28 md:h-28"
          >
            <div className="absolute inset-0 rounded-full bg-violet border-2 border-ink animate-[spin_16s_linear_infinite]">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <defs>
                  <path id="ring" d="M50,50 m-37,0 a37,37 0 1,1 74,0 a37,37 0 1,1 -74,0" />
                </defs>
                <text className="font-mono" fontSize="9.4" fontWeight="700" letterSpacing="2.4" fill="#111">
                  <textPath href="#ring">DDEV • DAYAK DEVELOPER • BORNEO •</textPath>
                </text>
              </svg>
            </div>
            <span className="absolute inset-0 flex items-center justify-center font-sans font-black text-xl md:text-3xl text-ink">
              ✦
            </span>
          </motion.div>
        </motion.div>

        {/* ───────── Stage B: numbers ───────── */}
        <motion.div
          style={{ opacity: bOpacity, display: bDisplay }}
          className="absolute inset-0 pointer-events-none"
        >
          <motion.div
            style={{ x: bLeftX }}
            className="absolute left-[7%] md:left-[12%] lg:left-[15%] top-[28%] md:top-[36%] -translate-y-1/2 flex flex-col items-start"
          >
            <span className="font-sans font-black text-[34vw] md:text-[16vw] lg:text-[14vw] uppercase tracking-tighter text-ink leading-[0.85]">
              08+
            </span>
            <span className="font-sans font-bold text-[14px] md:text-[20px] lg:text-[22px] uppercase tracking-wide text-ink mt-2">
              Live Platforms.
            </span>
          </motion.div>

          <motion.div
            style={{ x: bRightX }}
            className="absolute right-[7%] md:right-[12%] lg:right-[15%] top-[66%] md:top-[64%] -translate-y-1/2 flex flex-col items-start"
          >
            <span className="font-sans font-black text-[34vw] md:text-[16vw] lg:text-[14vw] uppercase tracking-tighter text-violet leading-[0.85]" style={{ WebkitTextStroke: '2px #111' }}>
              120+
            </span>
            <span className="font-sans font-bold text-[14px] md:text-[20px] lg:text-[22px] uppercase tracking-wide text-ink mt-2">
              Web Systems.
            </span>
          </motion.div>

          <span className="absolute left-1/2 -translate-x-1/2 bottom-[17%] md:bottom-[20%] font-mono text-[10px] md:text-[12px] uppercase tracking-[0.25em] text-ink whitespace-nowrap">
            100 / 100 Core Vitals · &lt; 0.6s LCP
          </span>
        </motion.div>

        {/* ───────── Stage C: manifesto ───────── */}
        <motion.div
          style={{ opacity: cOpacity, display: cDisplay }}
          className="absolute inset-0 flex items-center justify-center px-6 md:px-12 lg:px-24 pointer-events-none"
        >
          <p className="font-sans text-[22px] sm:text-[28px] md:text-[34px] lg:text-[42px] leading-[1.35] text-ink text-left md:text-center max-w-[92%] md:max-w-5xl">
            {MANIFESTO.map((w, i) => {
              const start = 0.49 + (i / MANIFESTO.length) * 0.2;
              return (
                <Word key={i} progress={p} start={start} end={start + 0.025} bold={w.b}>
                  {w.t}
                </Word>
              );
            })}
          </p>
        </motion.div>

        {/* ───────── Stage D: call to action ───────── */}
        <motion.div
          style={{ opacity: dOpacity, display: dDisplay, y: dY, pointerEvents: stage === 3 ? 'auto' : 'none' }}
          className="absolute inset-0 flex flex-col md:flex-row md:items-center justify-center md:justify-between gap-10 px-6 md:px-12 lg:px-20"
        >
          <h2 className="flex flex-col font-sans font-black uppercase text-[15vw] md:text-[9vw] lg:text-[100px] leading-[0.92] tracking-tighter text-ink">
            <span>Have an</span>
            <span className="text-[#555]">idea?</span>
            <span>Let’s</span>
            <span className="text-violet" style={{ WebkitTextStroke: '2px #111' }}>build it.</span>
          </h2>

          <div className="flex flex-col items-start gap-5 md:max-w-[300px]">
            <p className="font-sans font-bold text-[#111] text-sm md:text-base lg:text-[18px] uppercase tracking-tight leading-[1.3]">
              Let’s talk<br />
              Hire / Collaborate / General inquiries
            </p>

            <a
              href="mailto:iramrangi@gmail.com"
              className="group relative inline-block mt-1"
            >
              <div className="absolute inset-0 bg-ink translate-x-1.5 translate-y-1.5 transition-transform duration-200 group-hover:translate-x-0 group-hover:translate-y-0" />
              <div className="relative px-6 py-4 bg-violet border-2 border-ink flex items-center justify-center transition-transform duration-200 group-hover:translate-x-1.5 group-hover:translate-y-1.5">
                <span className="font-sans font-black text-ink text-sm md:text-base uppercase tracking-widest whitespace-nowrap">
                  Send Email <span className="ml-1 inline-block">↗</span>
                </span>
              </div>
            </a>

            <button
              onClick={() => setActiveSection(2)}
              className="font-mono text-[11px] md:text-xs uppercase tracking-[0.2em] text-ink underline underline-offset-4 decoration-2 hover:text-violet transition-colors cursor-pointer"
            >
              See selected works ↓
            </button>
          </div>
        </motion.div>

        {/* Bottom scroll bar */}
        <div className="absolute bottom-6 md:bottom-10 left-4 md:left-12 lg:left-20 right-4 md:right-12 lg:right-20 flex items-center justify-between z-40 pointer-events-none">
          <span className="font-mono text-[8px] md:text-[10px] uppercase tracking-[0.2em] text-ink">Scroll</span>
          <div className="flex-1 mx-4 md:mx-8 h-[1px] bg-ink/20 relative overflow-hidden">
            <motion.div style={{ scaleX: barScale }} className="absolute top-0 left-0 w-full h-full bg-ink origin-left" />
          </div>
          <span className="font-mono text-[8px] md:text-[10px] uppercase tracking-[0.2em] text-ink">V. 1.0</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
