"use client";

import { useEffect, useState } from "react";
import { BlackHoleHeroSection } from "@/components/ui/blackhole-hero-section";
import { Rocket, FileText, Shield, Users, Cpu, Sparkles, Calendar } from "lucide-react";

/** True while the viewport is narrow. Drives the layout swap below. */
function useNarrow(query = "(max-width: 767px)") {
  const [narrow, setNarrow] = useState(false);
  useEffect(() => {
    const m = window.matchMedia(query);
    const sync = () => setNarrow(m.matches);
    sync();
    m.addEventListener("change", sync);
    return () => m.removeEventListener("change", sync);
  }, [query]);
  return narrow;
}

export function BlackHoleHero() {
  const narrow = useNarrow();

  return (
    <section className="relative w-full bg-black flex flex-col">
      <div className="relative w-full flex-grow min-h-[70svh] md:min-h-[550px]">
        <BlackHoleHeroSection
          focus={narrow ? [0.5, 0.76] : [0.75, 0.5]}
        scrim={narrow ? "top" : "left"}
        scrimStrength={0.9}
        distance={24}
        elevation={narrow ? -7 : -5.5}
        fov={narrow ? 58 : 42}
        glow={narrow ? 0.85 : 1}
        steps={narrow ? 200 : 300}
        resolution={narrow ? 0.6 : 0.7}
      >
        <div className="flex h-full min-h-[70svh] items-center px-6 pt-28 sm:px-10 md:min-h-[600px] md:pt-32 lg:px-20">
          <div className="max-w-[34rem] w-full mt-8 md:mt-12">
            <div className="mb-4 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-wider text-[#FF6B2C]">
              AI Healthcare Development Services
            </div>
            
            <h1 className="text-[2.5rem] font-medium leading-[1.05] tracking-[-0.03em] text-white sm:text-5xl lg:text-[4rem]">
              Build Secure, Intelligent &
              <br />
              Scalable Healthcare Solutions
            </h1>

            <p className="mt-6 max-w-lg text-[0.95rem] leading-relaxed text-white/70 md:mt-7">
              Custom AI solutions for healthcare providers, health-tech companies, hospitals, clinics and healthcare platforms with an offshore AI development team.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3 md:mt-10">
              <a
                href="#contact"
                className="flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition hover:bg-neutral-200"
              >
                <Rocket className="h-4 w-4" />
                <span>Talk to Our AI Experts</span>
              </a>
              <a
                href="#contact"
                className="flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-medium text-white backdrop-blur-md transition hover:bg-white/10"
              >
                <FileText className="h-4 w-4" />
                <span>Discuss Your Project</span>
              </a>
            </div>
          </div>
        </div>
      </BlackHoleHeroSection>
      </div>

      {/* Bottom Features Banner */}
      <div className="w-full bg-black py-8 px-6 lg:px-12 border-t border-white/5 relative z-20">
        <div className="max-w-[1600px] mx-auto flex flex-wrap lg:flex-nowrap items-center justify-between gap-8 lg:gap-4">
          
          <div className="flex items-center gap-4">
            <div className="flex-shrink-0 flex items-center justify-center w-[52px] h-[52px] rounded-full border border-[#FF6B2C] text-[#FF6B2C]">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-white font-bold text-sm tracking-wide mb-0.5">CUSTOM AI</h3>
              <p className="text-white/60 text-sm">Healthcare Solutions</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex-shrink-0 flex items-center justify-center w-[52px] h-[52px] rounded-full border border-[#FF6B2C] text-[#FF6B2C]">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-white font-bold text-sm tracking-wide mb-0.5">OFFSHORE</h3>
              <p className="text-white/60 text-sm">Development Team</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex-shrink-0 flex items-center justify-center w-[52px] h-[52px] rounded-full border border-[#FF6B2C] text-[#FF6B2C]">
              <Cpu className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-white font-bold text-sm tracking-wide mb-0.5">FLEXIBLE</h3>
              <p className="text-white/60 text-sm">Engagement Models</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex-shrink-0 flex items-center justify-center w-[52px] h-[52px] rounded-full border border-[#FF6B2C] text-[#FF6B2C]">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-white font-bold text-sm tracking-wide mb-0.5">END-TO-END</h3>
              <p className="text-white/60 text-sm">Development lifecycle</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex-shrink-0 flex items-center justify-center w-[52px] h-[52px] rounded-full border border-[#FF6B2C] text-[#FF6B2C]">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-white font-bold text-sm tracking-wide mb-0.5">ONGOING</h3>
              <p className="text-white/60 text-sm">Support & Maintenance</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default BlackHoleHero;
