"use client";

import { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import ParticleSphere from "./ParticleSphere";
import FourthSectionContent from "./FourthSectionContent";

export default function KoreFourthSection() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <motion.section 
      ref={containerRef}
      className="relative w-full h-screen bg-[#050505] overflow-hidden flex items-center justify-center"
    >
      <motion.div 
        className="absolute inset-0 w-full h-full"
        style={{ y }}
      >
        <ParticleSphere />
      </motion.div>
      
      <FourthSectionContent />
      
    </motion.section>
  );
}
