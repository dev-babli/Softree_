"use client";

import { motion } from "framer-motion";
import { aiSolutions } from "./data";
import { SectionHeader } from "./SectionHeader";
import { SolutionCard } from "./SolutionCard";
import { CTAButton } from "./CTAButton";

export const OurAISolutions = () => {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden bg-gradient-to-b from-zinc-50 via-white to-zinc-50">
      <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader />

        {/* Solutions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
          {aiSolutions.map((solution, index) => (
            <SolutionCard key={solution.id} solution={solution} index={index} />
          ))}
        </div>

        <CTAButton />
      </div>
    </section>
  );
};
