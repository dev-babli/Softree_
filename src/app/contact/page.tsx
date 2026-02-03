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
        <div className="relative z-10 max-w-6xl mx-auto px-6 pt-16 pb-12 text-center">
          {/* Badge */}
          <span className="inline-block mb-5 px-4 py-2 rounded-full bg-white/10 backdrop-blur text-xs tracking-widest uppercase">
            Contact Softree
          </span>

          {/* Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight">
            Let’s Build Something
            <br />
            <span className="bg-gradient-to-r from-cyan-300 to-white bg-clip-text text-transparent">
              Great Together
            </span>
          </h1>

          {/* Description */}
          <p className="mt-5 text-lg text-white/75 max-w-3xl mx-auto">
            Have a question, idea, or challenge? Our team is ready to help you
            design, build, and scale modern digital solutions that move your
            business forward.
          </p>

          {/* ================= GLASS CTA PANEL ================= */}
          <div className="mt-10 mx-auto max-w-2xl rounded-3xl border border-white/20 bg-white/10 backdrop-blur-2xl p-7 shadow-2xl">
            {/* Buttons */}
            <div className="flex flex-wrap justify-center gap-4">
              <button className="px-7 py-3 rounded-xl bg-white text-blue-700 font-medium shadow-lg hover:scale-105 transition">
                Get in Touch
              </button>

              <button className="px-7 py-3 rounded-xl border border-white/30 hover:bg-white/10 transition">
                Book a Call
              </button>
            </div>

            {/* Divider */}
            <div className="my-6 h-px bg-white/15" />

            {/* Trust Stats */}
            <div className="grid grid-cols-3 gap-4 text-center text-sm">
              <div>
                <p className="text-xl font-bold">24h</p>
                <p className="text-white/60">Response</p>
              </div>
              <div>
                <p className="text-xl font-bold">150+</p>
                <p className="text-white/60">Clients</p>
              </div>
              <div>
                <p className="text-xl font-bold">98%</p>
                <p className="text-white/60">Satisfaction</p>
              </div>
            </div>
          </div>
        </div>

        {/* ================= PREMIUM SOFT WAVE ================= */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg
            viewBox="0 0 1440 160"
            className="w-full h-[120px]"
            preserveAspectRatio="none"
          >
            <defs>
              {/* soft gradient fade */}
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
