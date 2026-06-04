"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { PARTNER_LOGOS } from "./partners";

/** Static logo field — not a horizontal marquee */
export function LogoMosaic({ inView }: { inView: boolean }) {
  const slice = PARTNER_LOGOS.slice(0, 8);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.8 }}
      className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3"
    >
      {slice.map((p, i) => (
        <MosaicCell key={p.name} partner={p} delay={i * 0.04} />
      ))}
    </motion.div>
  );
}

function MosaicCell({
  partner,
  delay,
}: {
  partner: (typeof PARTNER_LOGOS)[number];
  delay: number;
}) {
  const [err, setErr] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.45, delay }}
      whileHover={{ y: -4, transition: { duration: 0.25 } }}
      className="group relative flex aspect-[5/3] items-center justify-center rounded-lg border border-[#0a0a1a]/6 bg-white/90 p-3 shadow-[0_8px_24px_-16px_rgba(10,10,26,0.2)]"
      style={{ rotate: `${(partner.name.length % 3) - 1}deg` }}
    >
      {!err ? (
        <Image
          src={partner.src}
          alt=""
          width={100}
          height={32}
          className="max-h-8 w-auto object-contain opacity-80 group-hover:opacity-100"
          onError={() => setErr(true)}
          unoptimized
        />
      ) : (
        <span className="text-[9px] font-semibold text-[#0a0a1a]/50">{partner.name}</span>
      )}
    </motion.div>
  );
}
