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

const aboutUsFaqs = [
  {
    id: 1,
    serial: "question 01",
    question: "Why do businesses choose Softree as their offshore engineering partner?",
    answer:
      "Businesses choose Softree because of our strong Microsoft ecosystem expertise, AI-driven engineering capabilities, transparent delivery approach, scalable offshore teams, and focus on long-term partnerships. We combine enterprise engineering standards with agile execution to help organizations accelerate delivery timelines while maintaining governance, quality assurance, and operational reliability.",
  },
  {
    id: 2,
    serial: "question 02",
    question: "What industries does Softree Technology work with?",
    answer:
      "Softree works with organizations across healthcare, enterprise IT, logistics, education, retail, manufacturing, service industries, consulting firms, and startups. Our solutions are tailored to industry-specific workflows, operational challenges, compliance requirements, and digital transformation objectives to help businesses improve efficiency and scalability.",
  },
  {
    id: 3,
    serial: "question 03",
    question: "How experienced is Softree with Microsoft technologies and enterprise automation?",
    answer:
      "Softree has extensive experience delivering Microsoft-based enterprise solutions including SharePoint + Power Apps, Power Automate, Power BI, Dynamics 365, Microsoft Fabric, Azure AI, Dataverse, SPFx, and Microsoft 365 integrations. Our engineering teams specialize in building scalable business applications, automation systems, enterprise collaboration platforms, and AI-powered operational workflows.",
  },
  {
    id: 4,
    serial: "question 04",
    question: "Does Softree follow enterprise security and governance standards?",
    answer:
      "Yes. Softree follows enterprise-grade security, governance, documentation, and compliance practices throughout the delivery lifecycle. Our processes are aligned with ISO/IEC 27001:2022 and ISO 9001:2015 standards and support NDA agreements, secure collaboration environments, role-based access management, structured documentation, and operational transparency for enterprise engagements.",
  },
  {
    id: 5,
    serial: "question 05",
    question: "Can Softree work as a white-label development partner for agencies and consulting firms?",
    answer:
      "Yes. Softree frequently works as a white-label offshore engineering partner for digital agencies, Microsoft consultants, ERP providers, system integrators, and enterprise technology companies requiring scalable expertise across Microsoft technologies, AI engineering, enterprise automation, and modern application development.",
  },
];

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
      <LightFAQExact faqs={aboutUsFaqs} />

      {/* 10. Footer — Homepage footer */}
      <Footer />
    </div>
  );
}
