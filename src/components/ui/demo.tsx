"use client";

import Component from "@/components/ui/matrix-code-rain";
import { useEffect, useState } from "react";
import { OrbitalHeroSection } from "@/components/ui/orbital-hero-section";

const settings = {
  fontSize: 15,
  speed: 0.5,
  density: 1.2,
  textColor: "#FF6B2C",
  colorMode: "orange-red" as const,
};

export default function Demo(props: Partial<typeof settings>) {
  const s = { ...settings, ...props };
  return (
    <div className="h-screen w-screen">
      <Component {...s} />
    </div>
  );
}

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

export function OrbitalHeroSectionDemo() {
  const narrow = useNarrow();

  return (
    <section className="relative min-h-[92svh] w-full md:min-h-[720px]">
      <OrbitalHeroSection
        focus={narrow ? [0.5, 0.86] : [0.74, 0.42]}
        scrim={narrow ? "top" : "left"}
        scrimStrength={narrow ? 0.94 : 0.92}
        viewRadius={narrow ? 2.1 : 3.1}
        lead={narrow ? 0.05 : 0.12}
        glow={narrow ? 0.5 : 1}
      >
        <div className="flex h-full min-h-[92svh] items-start px-6 pt-14 sm:px-10 md:min-h-[720px] md:items-center md:pt-0 lg:px-20">
          <div className="max-w-[34rem]">
            <h1 className="text-[2.5rem] font-light leading-[1.05] tracking-[-0.03em] text-white sm:text-6xl lg:text-[4.25rem]">
              Nothing here
              <br />
              stands still
            </h1>
            <p className="mt-6 max-w-md text-[0.95rem] leading-relaxed text-white/60 md:mt-7">
              The Sun is running, and the planets chase it. Every track you see
              is a helix.
            </p>
          </div>
        </div>
      </OrbitalHeroSection>
    </section>
  );
}
