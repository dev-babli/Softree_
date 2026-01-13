import Navigation from "@/components/sections/navigation";
import Footer from "@/components/sections/footer";
import GlobalLocations from "./global";
import ContactPage from "./form";

import Link from "next/link";
export default function Home() {
  return (
    <main>
      <Navigation />
      <section className="relative min-h-screen text-white overflow-hidden">
        {/* BEAUTIFUL GRADIENT BACKGROUND */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.12),_transparent_60%),linear-gradient(135deg,_#0a0a0a,_#111827,_#000000)]" />

        {/* SOFT AMBIENT GLOW */}
        <div className="absolute inset-0">
          <div className="absolute -top-40 -left-40 w-[700px] h-[700px] bg-white/10 rounded-full blur-[160px]" />
          <div className="absolute top-1/3 -right-40 w-[600px] h-[600px] bg-gray-400/10 rounded-full blur-[160px]" />
          <div className="absolute bottom-0 left-1/3 w-[500px] h-[500px] bg-white/5 rounded-full blur-[160px]" />
        </div>

        {/* CONTENT */}
        <div className="relative z-10 min-h-screen flex items-center justify-center px-6">
          <div className="max-w-3xl text-center">
            {/* BADGE */}
            <span className="inline-block mb-6 px-4 py-1 text-sm rounded-full bg-white/10 border border-white/20 text-gray-200">
              Let’s work together
            </span>

            {/* HEADING */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Let’s Talk About <br />
              <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                Your Next Project
              </span>
            </h1>

            {/* SUBTEXT */}
            <p className="mt-6 text-lg text-gray-300 mx-auto max-w-xl leading-relaxed">
              Whether you’re planning a new solution, modernizing an existing
              platform, or need expert guidance — our team is ready to help.
            </p>

            {/* CTAs */}
            <div className="mt-10 flex justify-center flex-wrap gap-4">
              {/* PRIMARY CTA */}
              <a
                href="/contact#form"
                className="
            inline-flex items-center justify-center
            px-8 py-4 rounded-xl
            bg-white text-black
            font-semibold
            transition
            hover:bg-gray-200
          "
              >
                Start the conversation
              </a>

              {/* SECONDARY CTA */}
              <a
                href="/services"
                className="
            inline-flex items-center justify-center
            px-8 py-4 rounded-xl
            border border-white/30
            text-white font-medium
            transition
            hover:border-white
            hover:bg-white/5
          "
              >
                Explore our services
              </a>
            </div>

            {/* TRUST INDICATORS */}
            <div className="mt-14 flex justify-center flex-wrap gap-8 text-sm text-gray-400">
              <span>✔ Enterprise-grade solutions</span>
              <span>✔ Secure & scalable delivery</span>
              <span>✔ Global engagement model</span>
            </div>
          </div>
        </div>
      </section>

      <ContactPage />
      <GlobalLocations />

      <Footer />
    </main>
  );
}
