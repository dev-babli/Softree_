"use client";

import React from "react";
import { VanishRun } from "@/components/ui/hero-ascii-tunnel";
import { typography } from "@/lib/typography";

export default function SecurityTestingSilkHero() {
  return (
    <section className="relative w-full min-h-[100svh] overflow-hidden bg-black">
      <VanishRun
        color="#FF6B2C"
        className="bg-black text-[#FF6B2C]"
        contentClassName="max-w-3xl px-6 text-center"
        followCursor={false}
      >

        <h1 className={`${typography.heading.h1} text-white tracking-tight leading-tight text-center`}>
          Comprehensive <br className="hidden sm:inline" />
          <span className="text-[#FF6B2C]">
            Security Testing & QA Services
          </span>{" "}
          for Secure and Reliable Software
        </h1>

        <p className={`${typography.description.default} text-zinc-400 max-w-2xl mx-auto leading-relaxed text-center mt-2`}>
          Strengthen software security and deliver reliable applications with
          comprehensive application security testing, vulnerability assessment
          and penetration testing (VAPT), functional testing, and quality
          assurance services.
        </p>
      </VanishRun>
    </section>
  );
}
