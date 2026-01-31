import NavigationClient from "@/components/sections/navigation-client";
import Footer from "@/components/sections/footer";
import GlobalLocations from "./global";
import ContactPage from "./form";

import Link from "next/link";
export default function Home() {
  return (
    <main>
      <NavigationClient />
      <section className="relative overflow-hidden bg-gradient-to-br from-[#020617] via-[#020617] to-[#020617] text-white">
        {/* Glow accents */}
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-blue-600/20 blur-[160px]" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-cyan-500/20 blur-[140px]" />

        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 pt-32 pb-44 text-center">
          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight">
            Let’s Talk <span className="text-blue-500">About Your Project</span>
          </h1>

          <p className="mt-6 text-lg md:text-xl text-white/70 max-w-3xl mx-auto">
            Have a question, idea, or challenge? Softree is here to help you
            build scalable, modern digital solutions.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <button className="px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-700 transition font-medium">
              Get in Touch
            </button>
            <button className="px-8 py-4 rounded-xl border border-white/20 hover:bg-white/5 transition">
              Book a Call
            </button>
          </div>
        </div>
      </section>

      <ContactPage />
      <GlobalLocations />

      <Footer />
    </main>
  );
}
