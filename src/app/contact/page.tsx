import NavigationClient from "@/components/sections/navigation-client";
import Footer from "@/components/sections/footer";
import GlobalLocations from "./global";
import ContactPage from "./form";

import Link from "next/link";
export default function Home() {
  return (
    <main>
      <NavigationClient />
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0b3ea8] via-[#1557c0] to-[#1e73d8] text-white">
        {/* Glow accents */}
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-blue-600/20 blur-[160px] rounded-full" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-cyan-500/20 blur-[140px] rounded-full" />

        {/* ================= CONTENT ================= */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 pt-12 pb-8 text-center mt-8">
          {/* Badge */}
          <span className="inline-block mb-4 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur text-xs tracking-widest uppercase">
            Contact Softree
          </span>

          {/* Heading */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight">
            Let’s Build Something
            <br />
            <span className="bg-gradient-to-r from-cyan-300 to-white bg-clip-text text-transparent">
              Great Together
            </span>
          </h1>

          {/* Description */}
          <p className="mt-4 text-base text-white/75 max-w-2xl mx-auto">
            Have a question, idea, or challenge? Our team is ready to help you
            design, build, and scale modern digital solutions that move your
            business forward.
          </p>
        </div>

        {/* ================= PREMIUM SOFT WAVE ================= */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg
            viewBox="0 0 1440 160"
            className="w-full h-[90px]"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="contactFade" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#FAFAFA" />
              </linearGradient>
            </defs>

            <path
              d="M0,90 C300,140 900,140 1440,90 L1440,160 L0,160 Z"
              fill="url(#contactFade)"
            />
          </svg>
        </div>
      </section>

      <ContactPage />
      <GlobalLocations />

      <Footer />
    </main>
  );
}
