"use client";

import Link from "next/link";
import AvooraStudioSection from "@/components/showcase/avoora/AvooraStudioSection";

/** Premium editorial hero intro — Avoora-style full section */
export default function HeroIntroPage() {
  return (
    <>
      <div className="pointer-events-none fixed inset-x-0 top-0 z-[60] flex justify-between px-6 py-4 lg:px-12">
        <Link
          href="/showcase"
          className="pointer-events-auto text-[12px] font-medium text-[#111111]/40 transition-colors hover:text-[#111111]"
        >
          ← Showcase
        </Link>
        <Link
          href="/showcase/hero-intro/reference"
          className="pointer-events-auto text-[12px] font-medium text-[#111111]/40 transition-colors hover:text-[#111111]"
        >
          Reference PNG
        </Link>
        <Link
          href="/"
          className="pointer-events-auto text-[12px] font-medium text-[#111111]/40 transition-colors hover:text-[#111111]"
        >
          Homepage
        </Link>
      </div>

      <AvooraStudioSection />
    </>
  );
}
