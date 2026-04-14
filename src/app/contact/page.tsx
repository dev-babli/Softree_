import NavigationClient from "@/components/sections/navigation-client";
import Footer from "@/components/sections/footer";
import GlobalLocations from "./global";
import ContactPage from "./form";
import Certifications from "@/app/services/business-applications/power-apps/certification";
import Chatbot from "./chat";

import Link from "next/link";
export default function Home() {
  return (
    <main>
      <NavigationClient />
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0b3ea8] via-[#1557c0] to-[#1e73d8] text-white min-h-[520px] flex items-center">
        {/* Glow accents */}
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-blue-600/20 blur-[160px] rounded-full" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-cyan-500/20 blur-[140px] rounded-full" />

        {/* ================= CONTENT ================= */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          {/* Badge */}
          <span className="inline-block mb-4 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur text-xs tracking-widest uppercase">
            Get In Touch
          </span>

          {/* Heading */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight">
            Start Your Next
            <br />
            <span className="bg-gradient-to-r from-cyan-300 to-white bg-clip-text text-transparent">
              Digital Transformation
            </span>
          </h1>

          {/* Description */}
          <p className="mt-4 text-base text-white/75 max-w-2xl mx-auto">
            Partner with Softree to build intelligent solutions across AI,
            SharePoint, Power Platform, and modern applications. Let’s discuss
            how we can transform your ideas into scalable, high-impact digital
            products.
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
      <Chatbot/>
      <Certifications />

      <Footer />
    </main>
  );
}
