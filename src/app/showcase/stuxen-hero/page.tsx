"use client";

import Link from "next/link";
import StuxenHeroClone from "@/components/sections/StuxenHeroClone";

/** Isolated Stuxen hero clone — matches Webflow HTML structure. */
export default function StuxenHeroShowcasePage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto flex max-w-[940px] justify-end px-4 py-4">
        <Link href="/" className="text-[12px] font-medium text-[#0a0a1a]/45 hover:text-[#0a0a1a]">
          ← Homepage
        </Link>
      </div>
      <StuxenHeroClone />
    </div>
  );
}
