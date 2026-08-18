import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { Brain, Code2 } from "lucide-react";
import createGlobe from "cobe";
import Link from "next/link";
import { motion } from "framer-motion";

const MicrosoftIcon = ({ className = "h-8 w-8 shrink-0" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 23 23" fill="none">
    <rect width="10" height="10" fill="#F25022" />
    <rect x="12" width="10" height="10" fill="#7FBA00" />
    <rect y="12" width="10" height="10" fill="#00A1F1" />
    <rect x="12" y="12" width="10" height="10" fill="#FFB900" />
  </svg>
);

function MicrosoftMark({ size = 26 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 26 26" aria-hidden>
      <rect x="0" y="0" width="12" height="12" fill="#F25022" />
      <rect x="14" y="0" width="12" height="12" fill="#7FBA00" />
      <rect x="0" y="14" width="12" height="12" fill="#00A4EF" />
      <rect x="14" y="14" width="12" height="12" fill="#FFB900" />
    </svg>
  );
}

function RotatingGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    let phi = 0.12;
    let globe: ReturnType<typeof createGlobe> | null = null;
    let lastSize = 0;

    const mount = () => {
      const size = Math.round(wrap.getBoundingClientRect().width);
      if (size < 24) return;
      if (globe && Math.abs(size - lastSize) < 12) return;
      lastSize = size;
      globe?.destroy();
      globe = createGlobe(canvas, {
        devicePixelRatio: 2,
        width: size * 2,
        height: size * 2,
        phi: 0.12,
        theta: 0.22,
        dark: 0,
        diffuse: 1.25,
        mapSamples: 18000,
        mapBrightness: 9,
        baseColor: [0.72, 0.74, 0.78],
        markerColor: [1, 88 / 255, 18 / 255],
        glowColor: [1, 1, 1],
        markers: [
          { location: [20.5937, 78.9629], size: 0.06 },
          { location: [51.5074, -0.1278], size: 0.04 },
          { location: [40.7128, -74.006], size: 0.04 },
          { location: [1.3521, 103.8198], size: 0.04 },
          { location: [25.2048, 55.2708], size: 0.03 },
        ],
        onRender: (state) => {
          phi += 0.006;
          state.phi = phi;
          state.width = lastSize * 2;
          state.height = lastSize * 2;
        },
      });
      canvas.style.opacity = "1";
    };

    const timer = window.setTimeout(mount, 80);
    const ro = new ResizeObserver(mount);
    ro.observe(wrap);

    return () => {
      window.clearTimeout(timer);
      ro.disconnect();
      globe?.destroy();
    };
  }, []);

  return (
    <div className="absolute left-1/2 top-[1%] z-[1] w-[78%] -translate-x-1/2 sm:top-[0.5%] sm:w-[85%] lg:w-[88%]">
      <div
        ref={wrapRef}
        className="relative aspect-square min-h-[140px] overflow-visible"
      >
        <div
          aria-hidden
          className="about-us-globe-halo pointer-events-none absolute -inset-[22%] rounded-full"
        />
        <div className="absolute inset-0 overflow-hidden rounded-full bg-white shadow-[inset_0_8px_28px_rgba(10,10,26,0.06),0_18px_40px_-18px_rgba(10,10,26,0.2)]">
          <div
            aria-hidden
            className="absolute inset-[6%] rounded-full"
            style={{
              backgroundImage:
                "radial-gradient(circle at 50% 50%, transparent 64%, #fff 66%), radial-gradient(#0a0a1a 1.1px, transparent 1.3px)",
              backgroundSize: "100% 100%, 8px 8px",
              opacity: 0.45,
            }}
          />
          <canvas
            ref={canvasRef}
            className="relative z-[1] h-full w-full opacity-0"
          />
        </div>
      </div>
    </div>
  );
}

function CapabilityCard({
  label,
  className,
  icons,
  style,
}: {
  label: string;
  className: string;
  icons: ReactNode;
  style?: CSSProperties;
}) {
  const words = label.split(" ");
  const width = "112px";
  const height = "168px";

  return (
    <div
      className={`relative ${className}`}
      style={{
        transformStyle: "preserve-3d",
        width,
        height,
        ...style,
      }}
    >
      {/* 3D shadow layer */}
      <div
        className="absolute inset-0 bg-[#e2e2e7] border border-zinc-300 shadow-[0_12px_28px_rgba(10,10,26,0.12)]"
        style={{
          borderRadius: "1.5rem",
          transform: "translateZ(-10px) translateY(8px) translateX(1px)",
          transformStyle: "preserve-3d",
        }}
      />
      {/* Main card layer */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-between border border-zinc-200/80 bg-linear-to-b from-[#FFFDFB] to-[#FFFEFC] px-3 pb-3.5 pt-5"
        style={{
          borderRadius: "1.5rem",
          transformStyle: "preserve-3d",
          boxShadow:
            "inset 0 1.5px 0 rgba(255,255,255,1), 0 1.5px 3px rgba(10,10,26,0.02)",
        }}
      >
        {/* Glass sheen overlay */}
        <div 
          className="pointer-events-none absolute inset-0 rounded-[1.5rem]"
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 50%)",
            mixBlendMode: "overlay"
          }}
        />

        <div
          className="flex min-h-0 flex-1 flex-col items-center justify-center gap-3.5"
          style={{ transform: "translateZ(14px)" }}
        >
          {icons}
        </div>
        <p
          className="mt-3 shrink-0 px-0.5 text-center text-[8.5px] font-black uppercase leading-[1.2] tracking-[0.08em] text-zinc-800 sm:text-[9.5px] sm:tracking-[0.1em] lg:text-[11px]"
          style={{ transform: "translateZ(10px)" }}
        >
          {words.map((word, idx) => (
            <span key={idx} className="block">
              {word}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
}

function CylinderStep({
  width,
  bottom,
  thickness,
  zIndex = 10,
}: {
  width: string;
  bottom: string;
  thickness: number;
  zIndex?: number;
}) {
  return (
    <div
      className="pointer-events-none absolute left-1/2 -translate-x-1/2"
      style={{
        width,
        bottom,
        zIndex,
        aspectRatio: "6.5/1",
      }}
    >
      <div
        className="absolute inset-0 border border-zinc-200 bg-white"
        style={{
          borderRadius: "50%",
          borderBottom: `${thickness}px solid #dcdce0`,
          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,1), 0 8px 20px -6px rgba(10,10,26,0.15)",
        }}
      />
    </div>
  );
}

/**
 * About Us page — first globe visual:
 * dotted cobe globe + 3D podium + 3 capability cards.
 */
export default function AboutUsGlobe() {
  return (
    <section className="relative isolate w-full overflow-hidden bg-white">
      {/* Premium Ambient Background Mesh Glow Bubbles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {/* Soft Blue glow bubble on the left */}
        <div 
          className="absolute -left-[10%] top-[10%] w-[45%] aspect-square rounded-full blur-[140px] opacity-[0.22]"
          style={{
            background: "radial-gradient(circle, #1852FF 0%, transparent 70%)"
          }}
        />
        {/* Warm Orange/Peach glow bubble behind the globe */}
        <div 
          className="absolute -right-[15%] top-[5%] w-[50%] aspect-square rounded-full blur-[160px] opacity-[0.3]"
          style={{
            background: "radial-gradient(circle, #FF5812 0%, #FFB889 40%, transparent 70%)"
          }}
        />
      </div>

      <div className="mx-auto w-full max-w-[1360px] px-5 sm:px-6 md:px-8 lg:px-10 relative z-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start lg:gap-8">
          
          {/* Left Column: Heading (Col Span 5) */}
          <div className="flex flex-col items-start gap-8 lg:col-span-5 lg:pt-[80px] xl:pt-[92px] 2xl:pt-[104px] lg:pr-8 xl:pr-12">
            {/* 1. Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/80 backdrop-blur-xs px-4 py-2 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500 shadow-[0_2px_12px_rgba(10,10,26,0.02)]"
            >
              <span className="h-2 w-2 rounded-full bg-[#FF5812] shadow-[0_0_8px_rgba(255,88,18,0.6)] animate-pulse" />
              YOUR OFFSHORE ENGINEERING PARTNER
            </motion.div>

            {/* Softree Technology Brand Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-[48px] xl:text-[60px] 2xl:text-[76px] font-bold tracking-tight leading-[1.05] shrink-0"
            >
              <span className="text-[#0a0a1a]">Softree</span>
              <sup className="text-xl sm:text-2xl md:text-3xl font-semibold text-slate-400 ml-0.5">®</sup>
              <br />
              <span className="bg-gradient-to-r from-[#0a0a1a] via-[#1c2c5c] to-[#FF5812] bg-clip-text text-transparent">
                Technology
              </span>
            </motion.h1>
          </div>

          {/* Middle Column: Supporting Copy & Action (Col Span 3) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-start gap-6 lg:col-span-3 lg:pt-[148px] xl:pt-[160px] 2xl:pt-[172px]"
          >
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#0a0a1a]">
              Your engineering team, extended.
            </h2>
            <p className="text-sm sm:text-base text-slate-500 leading-relaxed font-medium">
              AI, modern engineering, and Microsoft expertise — delivered by a reliable offshore team built to work as an extension of your business.
            </p>

            <Link
              href="/contact"
              className="group inline-flex items-center justify-between rounded-full bg-[#0a0a1a] pl-6 pr-2.5 py-2.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-black hover:shadow-[0_8px_32px_-4px_rgba(255,88,18,0.25)] hover:scale-[1.03] active:scale-[0.97] transition-all duration-300 shadow-md"
            >
              <span>LET'S TALK</span>
              <span className="ml-4 flex h-8 w-8 items-center justify-center rounded-full bg-white text-black transition-transform duration-300 group-hover:translate-x-0.5 shadow-xs">
                <svg className="h-4 w-4 text-[#FF5812]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </Link>
          </motion.div>

          {/* Right Column: Globe & Cards (Col Span 4) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative lg:col-span-4 w-full aspect-square max-w-[520px] mx-auto flex items-center justify-center select-none lg:pt-12"
          >
            <div className="relative w-full h-full">
              <style>{`
                @keyframes about-us-globe-halo-pulse {
                  0%, 100% { opacity: 0.25; transform: scale(1); }
                  50% { opacity: 0.5; transform: scale(1.05); }
                }
                .about-us-globe-halo {
                  background: radial-gradient(circle, rgba(255,184,137,0.3) 0%, rgba(255,88,18,0.06) 45%, transparent 70%);
                  animation: about-us-globe-halo-pulse 6s ease-in-out infinite;
                }
                @media (prefers-reduced-motion: reduce) {
                  .about-us-globe-halo { animation: none !important; }
                }
              `}</style>

              <RotatingGlobe />

              <div className="pointer-events-none absolute inset-x-0 bottom-[2%] z-10 flex h-[80px] flex-col items-center">
                <CylinderStep width="96%" bottom="2px" thickness={22} zIndex={1} />
                <CylinderStep width="82%" bottom="20px" thickness={18} zIndex={2} />
                <CylinderStep width="68%" bottom="34px" thickness={14} zIndex={3} />
              </div>

              <div
                className="absolute inset-x-0 bottom-[4%] z-20 flex origin-bottom scale-[0.82] sm:scale-[0.92] md:scale-[1.0] lg:scale-[0.80] xl:scale-[0.92] 2xl:scale-[1.0] items-end justify-center gap-2 sm:gap-4 lg:gap-3 xl:gap-4 2xl:gap-5"
                style={{ perspective: "1200px", transformStyle: "preserve-3d" }}
              >
                <motion.div
                  className="relative"
                  style={{ transformStyle: "preserve-3d" }}
                  whileHover={{ y: -6, scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  <CapabilityCard
                    label="Modern Engineering"
                    className="origin-bottom"
                    style={{
                      transform:
                        "rotateY(25deg) rotateX(10deg) rotateZ(-3deg) translateY(32px)",
                    }}
                    icons={
                      <>
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-50 border border-slate-200/50 shadow-sm text-slate-500">
                          <Code2 className="h-5.5 w-5.5" strokeWidth={1.8} />
                        </div>
                        <span className="grid h-6 w-6 place-items-center rounded-full bg-[#F3F3F1] border border-zinc-200/50 shadow-[0_1px_2px_rgba(10,10,26,0.02)]">
                          <svg width="10" height="10" viewBox="0 0 16 16" fill="none" aria-hidden>
                            <circle cx="8" cy="8" r="5.5" stroke="#8A8F9C" strokeWidth="1.6" />
                            <path d="M8 4.5v7M4.5 8h7" stroke="#8A8F9C" strokeWidth="1.6" />
                          </svg>
                        </span>
                      </>
                    }
                  />
                </motion.div>

                <motion.div
                  className="relative"
                  style={{ transformStyle: "preserve-3d" }}
                  whileHover={{ y: -6, scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  <CapabilityCard
                    label="AI & Automation"
                    className="origin-bottom"
                    style={{
                      transform:
                        "rotateY(0deg) rotateX(10deg) rotateZ(0deg) translateZ(12px) translateY(20px)",
                    }}
                    icons={
                      <>
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#FFF5EE] border border-[#FF5812]/15 shadow-sm text-[#FF5812]">
                          <Brain className="h-5.5 w-5.5" strokeWidth={1.8} />
                        </div>
                        <span className="grid h-6 w-6 place-items-center rounded-full bg-[#FFF4EE] border border-[#FF5812]/15 shadow-[0_1px_2px_rgba(255,88,18,0.02)]">
                          <svg width="10" height="10" viewBox="0 0 16 16" fill="none" aria-hidden>
                            <circle cx="8" cy="8" r="5.5" stroke="#FF5812" strokeWidth="1.6" />
                            <path d="M8 4.5v7M4.5 8h7" stroke="#FF5812" strokeWidth="1.6" />
                          </svg>
                        </span>
                      </>
                    }
                  />
                </motion.div>

                <motion.div
                  className="relative"
                  style={{ transformStyle: "preserve-3d" }}
                  whileHover={{ y: -6, scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  <CapabilityCard
                    label="Microsoft & Data"
                    className="origin-bottom"
                    style={{
                      transform:
                        "rotateY(-25deg) rotateX(10deg) rotateZ(3deg) translateY(38px)",
                    }}
                    icons={
                      <>
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white border border-slate-200/50 shadow-sm">
                          <MicrosoftMark size={24} />
                        </div>
                        <span className="grid h-6 w-6 place-items-center rounded-full bg-[#EEF4FF] border border-[#00A4EF]/20 shadow-[0_1px_2px_rgba(10,10,26,0.02)]">
                          <svg width="10" height="10" viewBox="0 0 16 16" fill="none" aria-hidden>
                            <circle cx="8" cy="8" r="5.5" stroke="#00A4EF" strokeWidth="1.6" />
                            <path d="M8 4.5v7M4.5 8h7" stroke="#00A4EF" strokeWidth="1.6" />
                          </svg>
                        </span>
                      </>
                    }
                  />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 w-full flex flex-col items-center gap-6 text-center"
        >
          <span className="text-[10px] font-extrabold uppercase tracking-[0.28em] text-slate-400/95">
            TRUSTED BY BUSINESSES AND PARTNERS WORLDWIDE
          </span>

          <div 
            className="flex flex-wrap items-center justify-center gap-2.5 lg:gap-3.5 xl:gap-4 rounded-[2rem] border border-slate-200/50 bg-[#FAF9F6]/50 p-3 sm:px-6 sm:py-4 shadow-[inset_0_1px_1px_rgba(255,255,255,1),0_8px_32px_rgba(10,10,26,0.03)] backdrop-blur-md max-w-6xl w-full"
          >
            {/* Microsoft Solutions Partner */}
            <motion.div 
              className="flex items-center gap-2.5 px-3 py-2 lg:px-4 lg:py-2.5 rounded-2xl bg-gradient-to-r from-[#FF5812] to-[#FF763F] border border-transparent shadow-[0_2px_8px_rgba(255,88,18,0.1)] transition-all duration-300 hover:shadow-[0_4px_16px_rgba(255,88,18,0.2)] cursor-pointer text-white"
              whileHover={{ y: -2, scale: 1.02 }}
            >
              <MicrosoftIcon className="h-6 w-6 lg:h-7 lg:w-7 xl:h-8 xl:w-8 shrink-0" />
              <span className="text-xs sm:text-[13px] lg:text-[14px] font-extrabold text-white tracking-tight">Microsoft Solutions Partner</span>
            </motion.div>

            {/* AI & Automation */}
            <motion.div 
              className="flex items-center gap-2.5 px-3 py-2 lg:px-4 lg:py-2.5 rounded-2xl bg-gradient-to-r from-[#FF5812] to-[#FF763F] border border-transparent shadow-[0_2px_8px_rgba(255,88,18,0.1)] transition-all duration-300 hover:shadow-[0_4px_16px_rgba(255,88,18,0.2)] cursor-pointer text-white"
              whileHover={{ y: -2, scale: 1.02 }}
            >
              <svg className="h-6 w-6 lg:h-7 lg:w-7 xl:h-8 xl:w-8 shrink-0 fill-black" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2a7 7 0 0 0-7 7v3a4 4 0 0 0-2 3.46V18c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-2.54A4 4 0 0 0 19 12V9a7 7 0 0 0-7-7zm-4 9a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm8 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm-4 5c-1.66 0-3-1.34-3-3h6c0 1.66-1.34 3-3 3z" />
              </svg>
              <span className="text-xs sm:text-[13px] lg:text-[14px] font-extrabold text-white tracking-tight">AI & Automation</span>
            </motion.div>

            {/* SharePoint */}
            <motion.div 
              className="flex items-center gap-2.5 px-3 py-2 lg:px-4 lg:py-2.5 rounded-2xl bg-gradient-to-r from-[#FF5812] to-[#FF763F] border border-transparent shadow-[0_2px_8px_rgba(255,88,18,0.1)] transition-all duration-300 hover:shadow-[0_4px_16px_rgba(255,88,18,0.2)] cursor-pointer text-white"
              whileHover={{ y: -2, scale: 1.02 }}
            >
              <img
                src="/images/sharepoint.webp"
                alt="SharePoint Logo"
                className="h-6 w-6 lg:h-7 lg:w-7 xl:h-8 xl:w-8 shrink-0 object-contain filter drop-shadow-[0_1px_2px_rgba(16,124,65,0.08)]"
              />
              <span className="text-xs sm:text-[13px] lg:text-[14px] font-extrabold text-white tracking-tight">SharePoint</span>
            </motion.div>

            {/* Power Apps */}
            <motion.div 
              className="flex items-center gap-2.5 px-3 py-2 lg:px-4 lg:py-2.5 rounded-2xl bg-gradient-to-r from-[#FF5812] to-[#FF763F] border border-transparent shadow-[0_2px_8px_rgba(255,88,18,0.1)] transition-all duration-300 hover:shadow-[0_4px_16px_rgba(255,88,18,0.2)] cursor-pointer text-white"
              whileHover={{ y: -2, scale: 1.02 }}
            >
              <img
                src="/images/power-apps.webp"
                alt="Power Apps Logo"
                className="h-6 w-6 lg:h-7 lg:w-7 xl:h-8 xl:w-8 shrink-0 object-contain filter drop-shadow-[0_1px_2px_rgba(116,39,116,0.08)]"
              />
              <span className="text-xs sm:text-[13px] lg:text-[14px] font-extrabold text-white tracking-tight">Power Apps</span>
            </motion.div>

            {/* Azure */}
            <motion.div 
              className="flex items-center gap-2.5 px-3 py-2 lg:px-4 lg:py-2.5 rounded-2xl bg-gradient-to-r from-[#FF5812] to-[#FF763F] border border-transparent shadow-[0_2px_8px_rgba(255,88,18,0.1)] transition-all duration-300 hover:shadow-[0_4px_16px_rgba(255,88,18,0.2)] cursor-pointer text-white"
              whileHover={{ y: -2, scale: 1.02 }}
            >
              <img
                src="/images/azure.svg"
                alt="Azure Logo"
                className="h-6 w-6 lg:h-7 lg:w-7 xl:h-8 xl:w-8 shrink-0 object-contain filter drop-shadow-[0_1px_2px_rgba(0,120,212,0.08)]"
              />
              <span className="text-xs sm:text-[13px] lg:text-[14px] font-extrabold text-white tracking-tight">Azure</span>
            </motion.div>

            {/* Power BI */}
            <motion.div 
              className="flex items-center gap-2.5 px-3 py-2 lg:px-4 lg:py-2.5 rounded-2xl bg-gradient-to-r from-[#FF5812] to-[#FF763F] border border-transparent shadow-[0_2px_8px_rgba(255,88,18,0.1)] transition-all duration-300 hover:shadow-[0_4px_16px_rgba(255,88,18,0.2)] cursor-pointer text-white"
              whileHover={{ y: -2, scale: 1.02 }}
            >
              <img
                src="/images/power-bi.webp"
                alt="Power BI Logo"
                className="h-6 w-6 lg:h-7 lg:w-7 xl:h-8 xl:w-8 shrink-0 object-contain filter drop-shadow-[0_1px_2px_rgba(242,200,17,0.08)]"
              />
              <span className="text-xs sm:text-[13px] lg:text-[14px] font-extrabold text-white tracking-tight">Power BI</span>
            </motion.div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
