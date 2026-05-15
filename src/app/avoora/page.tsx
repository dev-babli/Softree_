"use client";

import { Navigation } from "./components/Navigation";
import { HeroSection } from "./components/HeroSection";
import { WhyChooseUsSection } from "./components/WhyChooseUsSection";
import { TeamSection } from "./components/TeamSection";
import { AwardsSection } from "./components/AwardsSection";
import { TestimonialsSection } from "./components/TestimonialsSection";
import { CTASection } from "./components/CTASection";
import { Footer } from "./components/Footer";
import styles from "./avoora.module.css";

/**
 * AVOORA — Complete React conversion of avoora.html
 *
 * Sections (in order, matching the source HTML):
 *   1. Navigation       — sticky, blurred, brand mark + links
 *   2. HeroSection      — "Behind Avoora" + section tags + video lightbox + animated stats
 *   3. WhyChooseUsSection — "Why Choose Us" tech-stack slider with dots & arrows
 *   4. TeamSection      — "Creative People" 4-column team grid
 *   5. AwardsSection    — "Awards Achievement" infinite marquee
 *   6. TestimonialsSection — "Client Stories" dark testimonial tabs
 *   7. CTASection       — "Let's Talk" CTA block with form
 *   8. Footer           — copyright
 *
 * All animations recreated with Framer Motion + CSS keyframes.
 * No external CSS dependencies — fully self-contained module.
 */
export default function AvooraPage() {
  return (
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
  );
}
