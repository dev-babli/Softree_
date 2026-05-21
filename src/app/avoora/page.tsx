"use client";

import { Suspense } from "react";

import { Navigation } from "./components/Navigation";
import { HeroSection } from "./components/HeroSection";
import { WhyChooseUsSection } from "./components/WhyChooseUsSection";
import { TeamSection } from "./components/TeamSection";
import { AwardsSection } from "./components/AwardsSection";
import { TestimonialsSection } from "./components/TestimonialsSection";
import { CTASection } from "./components/CTASection";
import { Footer } from "./components/Footer";

import styles from "./avoora.module.css";

export default function AvooraPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className={styles.page}>
        <Navigation />
        <main>
          <HeroSection />
          <WhyChooseUsSection />
          <TeamSection />
          <AwardsSection />
          <TestimonialsSection />
          <CTASection />
        </main>
        <Footer />
      </div>
    </Suspense>
  );
}