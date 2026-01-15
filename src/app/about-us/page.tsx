import Navigation from "@/components/sections/navigation";
import Footer from "@/components/sections/footer";
import GlobalDelivery from "./global";
import InspiredByOurValues from "./inspired";
import EngagementModels from "./model";
import AgileProcessStack from "./agile";
import OurStorySection from "./story";
import AboutUsWithTestimonials from "./hero";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/* Fixed Width Config                                                  */
/* ------------------------------------------------------------------ */
const FIXED_WIDTH =
  "mx-auto max-w-8xl px-8 sm:px-10 md:px-14 lg:px-20";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#141414]">
      <Navigation />

      {/* HERO (can be full-width internally) */}
      <AboutUsWithTestimonials />

      {/* MAIN CONTENT – FIXED WIDTH */}
      <section className="bg-[#141414] py-24">
        <div className={FIXED_WIDTH}>
          <OurStorySection />
          <AgileProcessStack />
          <GlobalDelivery />
          <InspiredByOurValues />
          <EngagementModels />
        </div>
      </section>

      {/* CTA / ABOUT SUMMARY */}
      <section className="relative overflow-hidden bg-[#141414] py-24">
        {/* Top divider */}
        <div className="absolute top-0 left-0 w-full h-px bg-white/10 z-20" />

        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#141414] via-[#0f0f0f] to-[#0a0a0a]" />

        {/* Subtle glow */}
        <div className="absolute -top-24 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-white/10 blur-3xl" />

        {/* Content */}
        <div className={`relative z-10 ${FIXED_WIDTH} text-center`}>
          <h2 className="text-3xl md:text-4xl font-light text-white leading-tight">
            About{" "}
            <span className="font-medium text-white/90">
              Softree Technologies
            </span>
          </h2>

          <p className="mt-6 max-w-4xl mx-auto text-base md:text-lg text-white/70">
            Softree is a digital technology partner helping organizations build
            intelligent, scalable, and future-ready solutions. We specialize in
            modern SharePoint, Power Apps, AI-driven systems, and
            high-performance web and mobile applications that drive real
            business impact.
          </p>

          <p className="mt-4 max-w-4xl mx-auto text-base md:text-lg text-white/70">
            From enterprise intranets and workflow automation to AI-powered
            platforms and cross-platform mobile apps, our teams blend strategy,
            design, and engineering to deliver secure and user-centric digital
            experiences.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="
                inline-flex items-center justify-center
                rounded-xl bg-white
                px-8 py-4
                text-base font-semibold text-black
                transition-all duration-300
                hover:bg-white/90 hover:scale-105
              "
            >
              Talk to Our Experts
            </Link>

            <Link
              href="/services"
              className="
                inline-flex items-center justify-center
                rounded-xl border border-white/30
                px-8 py-4
                text-base font-semibold text-white/90
                transition-all duration-300
                hover:bg-white/10 hover:scale-105
              "
            >
              Explore Our Services
            </Link>
          </div>

          {/* Microcopy */}
          <p className="mt-4 text-sm text-white/50">
            SharePoint • Power Apps • AI Solutions • Web & Mobile Development
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
