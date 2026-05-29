"use client";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";

export const certifications = [
  {
    src: "https://www.softreetechnology.com/wp-content/uploads/2024/12/STPI.webp",
    alt: "STPI",
  },
  {
    src: "https://www.softreetechnology.com/wp-content/uploads/2024/12/startupindia.webp",
    alt: "Startup India",
  },
  {
    src: "https://www.softreetechnology.com/wp-content/uploads/2024/12/MCPD.webp",
    alt: "MCPD",
  },
  {
    src: "https://www.softreetechnology.com/wp-content/uploads/2024/12/MCTS.webp",
    alt: "MCTS",
  },
  {
    src: "https://www.softreetechnology.com/wp-content/uploads/2024/12/ISO-9001-2015.webp",
    alt: "ISO 9001",
  },
  {
    src: "https://www.softreetechnology.com/wp-content/uploads/2024/12/ISO-27001-2022.webp",
    alt: "ISO 27001",
  },
];

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function FallbackIcon({ alt }: { alt: string }) {
  switch (alt) {
    case "STPI":
      return (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
      );
    case "Startup India":
      return (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4.5 16.5c-1.5 1.25-2.5 3.5-2.5 5.5h20c0-2-1-4.25-2.5-5.5" />
          <path d="M12 2C7.5 7.5 6 12 6 16.5c0 3.5 2.5 5.5 6 5.5s6-2 6-5.5C18 12 16.5 7.5 12 2z" />
          <path d="M12 9v5M9 12h6" />
        </svg>
      );
    case "MCPD":
      return (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M9 3v18M15 3v18M3 9h18M3 15h18" />
        </svg>
      );
    case "MCTS":
      return (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 3a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3zM6 15a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3zM18 15a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3zM9 18h6M12 6v9" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      );
    case "ISO 9001":
      return (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="m9 11 2 2 4-4" />
        </svg>
      );
    case "ISO 27001":
      return (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <rect x="9" y="11" width="6" height="5" rx="1" />
          <path d="M10 11V9a2 2 0 1 1 4 0v2" />
        </svg>
      );
    default:
      return (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      );
  }
}

export function CertificationCard({ item, dark = true }: { item: { src: string; alt: string }; dark?: boolean }) {
  const [hasError, setHasError] = useState(false);

  return (
    <div
      className={`
        group relative rounded-3xl p-[1px] transition-all duration-500
        ${dark 
          ? "bg-gradient-to-br from-[#ff7a2f]/15 via-transparent to-[#ff7a2f]/10" 
          : "bg-gradient-to-br from-[#ff7a2f]/20 via-transparent to-[#ff7a2f]/15"
        }
      `}
    >
      {/* Inner Card */}
      <div
        className={`
          relative flex flex-col items-center justify-center
          h-[220px] rounded-3xl p-6 transition-all duration-500 ease-out
          group-hover:-translate-y-1.5
          ${dark 
            ? "bg-white/[0.05] backdrop-blur-xl border border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.3)] group-hover:shadow-[0_20px_60px_rgba(255,122,47,0.15)]" 
            : "bg-white/80 backdrop-blur-xl border border-slate-200/50 shadow-[0_4px_20px_rgba(0,0,0,0.03)] group-hover:shadow-[0_20px_60px_rgba(255,122,47,0.08)]"
          }
        `}
      >
        {/* Glow */}
        <div className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${dark ? "bg-gradient-to-t from-white/[0.04] to-transparent" : "bg-gradient-to-t from-slate-100 to-transparent"}`} />

        {hasError ? (
          <div className="relative z-10 flex flex-col items-center justify-center text-center">
            {/* Elegant Fallback SVG Logo */}
            <div className="mb-4 text-[#ff7a2f] opacity-85 group-hover:scale-110 group-hover:opacity-100 transition-all duration-300">
              <FallbackIcon alt={item.alt} />
            </div>
            <span className={`text-[13px] font-semibold tracking-wider transition-colors uppercase ${dark ? "text-white/90 group-hover:text-[#ff7a2f]" : "text-slate-800 group-hover:text-[#ff7a2f]"}`}>
              {item.alt}
            </span>
            <span className={`text-[9.5px] mt-1.5 uppercase tracking-widest font-mono ${dark ? "text-white/40" : "text-slate-400"}`}>
              Verified Partner
            </span>
          </div>
        ) : (
          <Image
            src={item.src}
            alt={item.alt}
            width={260}
            height={260}
            onError={() => setHasError(true)}
            className="
              relative z-10
              object-contain
              max-w-[240px]
              grayscale opacity-70
              transition-all duration-500 ease-out
              group-hover:grayscale-0
              group-hover:opacity-100
            "
          />
        )}
      </div>
    </div>
  );
}

export default function Certifications() {
  return (
    <section className="relative py-20 overflow-hidden bg-[#0a0a0a] text-white">
      <div className="relative max-w-7xl mx-auto px-6">
        {/* Heading */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="text-center mb-12 px-4"
        >
          <h2 className="text-3xl lg:text-5xl font-semibold tracking-tight">
            Certifications & Recognitions
          </h2>

          <p className="mt-5 text-base lg:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Trusted standards that reinforce our focus on security, compliance,
            and operational excellence.
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.08,
              },
            },
          }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-10"
        >
          {certifications.map((item, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { y: 24, opacity: 0 },
                visible: { y: 0, opacity: 1, transition: { duration: 0.55, ease: EASE } },
              }}
            >
              <CertificationCard item={item} dark={true} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
