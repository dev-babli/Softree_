"use client";

import Link from "next/link";
import StuxenAboutV1Clone from "@/components/sections/StuxenAboutV1Clone";
import StuxenHeroClone from "@/components/sections/StuxenHeroClone";

/** Stuxen Webflow template clone stack: hero → about v1 */
export default function HomeIntroShowcasePage() {
  return (
    <div className="min-h-screen overflow-x-clip bg-white text-[#0a0a0a] antialiased">
      <div className="pointer-events-none fixed inset-x-0 top-0 z-[60] flex justify-end px-6 py-4 lg:px-12">
        <Link
          href="/"
          className="pointer-events-auto text-[12px] font-medium text-[#0a0a1a]/40 transition-colors hover:text-[#0a0a1a]"
        >
          ← Homepage
        </Link>
      </div>

      <StuxenHeroClone />
      <StuxenAboutV1Clone />
    </div>
  );
}
