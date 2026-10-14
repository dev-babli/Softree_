"use client";

import React, { useState, useEffect } from "react";
import { motion, LayoutGroup } from "framer-motion";
import TrustStrip from "@/components/sections/TrustStrip";

/* =========================================================
 * 1. REORDER ITEMS (ANIMATED CUBE TILES) COMPONENT
 * ========================================================= */
const initialItems = [
  "#F25022", // Microsoft Red
  "#7FBA00", // Microsoft Green
  "#00A4EF", // Microsoft Blue
  "#FFB900", // Microsoft Yellow
];

function shuffle([...items]: string[]) {
  const next = [...items];
  for (let i = next.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [next[i], next[j]] = [next[j], next[i]];
  }
  // Guarantee the order actually changes on every tick so an animation always triggers
  if (next.every((c, idx) => c === items[idx])) {
    const temp = next[0];
    next[0] = next[1];
    next[1] = temp;
  }
  return next;
}

const spring = {
  type: "spring" as const,
  damping: 20,
  stiffness: 300,
};

const list = {
  listStyle: "none" as const,
  padding: 0,
  margin: 0,
  position: "relative" as const,
  display: "flex",
  flexWrap: "wrap" as const,
  gap: 12,
  width: 228,
  flexDirection: "row" as const,
  justifyContent: "center",
  alignItems: "center",
};

const item = {
  width: 104,
  height: 104,
  borderRadius: "20px",
};

const colorStyling: Record<string, { bg: string; border: string }> = {
  "#F25022": {
    bg: "linear-gradient(135deg, #F25022 0%, #D83B01 100%)",
    border: "rgba(242, 80, 34, 0.45)",
  },
  "#7FBA00": {
    bg: "linear-gradient(135deg, #7FBA00 0%, #689900 100%)",
    border: "rgba(127, 186, 0, 0.45)",
  },
  "#00A4EF": {
    bg: "linear-gradient(135deg, #00A4EF 0%, #0078D4 100%)",
    border: "rgba(0, 164, 239, 0.45)",
  },
  "#FFB900": {
    bg: "linear-gradient(135deg, #FFB900 0%, #EAA300 100%)",
    border: "rgba(255, 185, 0, 0.45)",
  },
};

export function ReorderItems() {
  const [items, setItems] = useState(initialItems);

  useEffect(() => {
    const timeout = setTimeout(() => setItems(shuffle(items)), 1000);
    return () => clearTimeout(timeout);
  }, [items]);

  return (
    <LayoutGroup>
      <ul style={list}>
        {items.map((color) => {
          const styling = colorStyling[color] || {
            bg: color,
            border: `${color}66`,
          };
          return (
            <motion.li
              key={color}
              layout="position"
              transition={spring}
              style={{
                ...item,
                background: styling.bg,
                border: `1px solid ${styling.border}`,
              }}
              className="relative select-none cursor-pointer overflow-hidden will-change-transform"
              whileHover={{ scale: 1.04 }}
              onClick={() => setItems(shuffle(items))}
            >
              {/* Glossy ambient reflection */}
              <div className="absolute inset-0 bg-gradient-to-tr from-black/15 via-transparent to-white/30 pointer-events-none" />
            </motion.li>
          );
        })}
      </ul>
    </LayoutGroup>
  );
}

/* =========================================================
 * 2. MAIN HERO SECTION
 * ========================================================= */
export default function Hero() {
  return (
    <div className="relative flex w-full flex-col overflow-hidden bg-black pt-20 sm:pt-24 lg:pt-28 pb-0 font-sans">
      {/* Background grid */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      {/* 3-Column Split Content: Left (Eyebrow & Heading) | Middle (Cube) | Right (Description) */}
      <div className="relative z-10 w-full max-w-[1040px] xl:max-w-[1100px] mx-auto px-6 sm:px-8 pt-2 sm:pt-4 pb-0">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-8 lg:gap-12 xl:gap-14 items-center justify-center w-full">

          {/* LEFT: Eyebrow + H1 Heading */}
          <div className="flex flex-col justify-center text-left z-10 justify-self-center lg:justify-self-end w-full max-w-[360px]">
            {/* Eyebrow Pill */}
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#FF6B00]/40 bg-[#FF6B00]/10 px-3.5 py-1.5 typo-caption text-[#FF6B00] backdrop-blur-md w-fit uppercase text-[11px] sm:text-xs tracking-wider">
              <span className="h-2 w-2 rounded-full bg-[#FF6B00] animate-pulse shrink-0" />
              <span className="whitespace-nowrap">OFFSHORE AI COPILOT DEVELOPMENT</span>
            </div>

            {/* Main Headline (H1) */}
            <h1 className="text-3xl sm:text-4xl lg:text-[2.65rem] xl:text-[2.85rem] font-semibold text-white tracking-tight leading-[1.1] text-left">
              <span className="block">Build Custom</span>
              <span className="block text-[#FF6B00]">
                AI Copilots
              </span>
              <span className="block">With Your</span>
              <span className="block">Offshore Team</span>
            </h1>
          </div>

          {/* MIDDLE: The Cube (Shuffling Reorder Items) - Perfectly Centered */}
          <div className="flex items-center justify-center relative py-6 lg:py-0 shrink-0 justify-self-center">
            <ReorderItems />
          </div>

          {/* RIGHT: Description - 6 Evenly Sized Lines */}

          <div className="flex flex-col justify-center text-left z-10 justify-self-center lg:justify-self-start w-full max-w-[360px]">
            <p className="text-sm sm:text-[15px] lg:text-[15px] text-slate-300/90 leading-relaxed font-normal w-full">
              Extend your delivery capacity with Softree Technology&apos;s offshore AI engineering team. We develop custom AI copilots using Microsoft Copilot Studio, Azure AI, and business system integrations to support intelligent workflows, knowledge access, and task automation.
            </p>
          </div>


        </div>
      </div>

      {/* Bottom Trust Bar (Kept intact with tightened margin and zero bottom gap) */}
      <div className="w-full z-20 shrink-0 mt-4 sm:mt-6 lg:mt-7 pb-3">
        <TrustStrip theme="dark" />
      </div>
    </div>
  );
}
