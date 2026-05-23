"use client";
import NavigationClient from "@/components/sections/navigation-client";
import AvooraHero from "@/components/qc/homepage-light/AvooraHero";
import AboutClientLogos from "@/components/qc/homepage-light/AboutClientLogos";
import LightAboutMerged from "@/components/qc/homepage-light/LightAboutMerged";
import AboutTeamSection from "@/components/qc/homepage-light/AboutTeamSection";
import AwardsMarqueeSection from "@/components/qc/homepage-light/AwardsMarqueeSection";
import LightEngagementModels from "@/components/qc/homepage-light/LightEngagementModels";
import LightContactSection from "@/components/qc/homepage-light/LightContactSection";
import LightFAQExact from "@/components/homepage-light/LightFAQExact";
import OffshoreTestimonialsGlobe from "@/components/sections/OffshoreTestimonialsGlobe";
import Footer from "@/components/sections/footer";
/**
 * ABOUT US — Complete Component Stack
 *
 *  1. AvooraHero             → Video hero + cycling words + service cards
 *  2. LightAboutMerged        → Company intro with spotlight cards
 *  3. AboutClientLogos        → Trusted partners marquee (after about)
 *  4. LightEngagementModels   → Engagement Models accordion
 *  5. AboutTeamSection        → Leadership & team showcase
 *  6. AwardsMarqueeSection    → Awards marquee with glass trophies
 *  7. TestimonialsGlobe        → Global testimonials on world map
 *  8. LightContactSection     → Contact form CTA
 *  9. Footer                  → Homepage footer
 */

export default function AboutUsPage() {
  return (
    <div className="min-h-screen pt-[100px]">
      {/* Navigation */}
      <NavigationClient />

      {/* 1. Hero — Video hero with cycling words */}
      <AvooraHero />

      {/* 2. About — Company story with spotlight cards */}
      <LightAboutMerged />

      {/* 3. Client Logos — Trusted partners marquee */}
      <AboutClientLogos />

      {/* 4. Engagement Models — How to work with us */}
      <LightEngagementModels />

      {/* 5. Team — Leadership & people showcase */}
      <AboutTeamSection />

      {/* 6. Awards — Marquee with glass trophy cards */}
      <AwardsMarqueeSection />

      {/* 7. Testimonials — Global voices on world map */}
      <OffshoreTestimonialsGlobe variant="light" />

      {/* 8. Contact — Get in touch */}
      <LightContactSection />

      {/* 9. FAQ */}
      <LightFAQExact />

      {/* 10. Footer — Homepage footer */}
      <Footer />
    </div>
  );
}
