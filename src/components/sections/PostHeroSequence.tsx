"use client";

import { useRef } from "react";
import ClarityControlSection, {
  HOME_INTRO_SURFACE,
  useClarityCardParallax,
} from "@/components/sections/ClarityControlSection";
import { AvooraAboutBand } from "./post-hero-sequence/AvooraAboutBand";
import { PartnerMarqueeLane } from "./post-hero-sequence/PartnerMarqueeLane";

export { HOME_INTRO_SURFACE };

/**
 * Post-hero — one surface, Avoora flow, production glass cards untouched.
 *
 * 1. Partner marquee (CSS lane, same technique as AvooraHero)
 * 2. Centered about + four stats (Avoora Home A)
 * 3. ClarityControlSection — your real cards, geometry, visuals; no pillar row
 */
export default function PostHeroSequence() {
  const ref = useRef<HTMLElement>(null);
  useClarityCardParallax(ref);

  return (
    <section
      ref={ref}
      data-section="post-hero-sequence"
      data-theme-section="light"
      aria-labelledby="clarity-control-heading"
      className="relative w-full overflow-x-clip"
      style={{ backgroundColor: HOME_INTRO_SURFACE }}
    >
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <PartnerMarqueeLane />
        <AvooraAboutBand />
      </div>

      <ClarityControlSection embedded showPillarRow={false} />
    </section>
  );
}
