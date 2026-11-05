"use client";

import React from "react";
import TestimonialsMarquee, {
  type TestimonialItem,
} from "@/components/ui/grid-testimonials-marquee";
import { typography } from "@/lib/typography";

// Exact same client testimonials preserved from previous feature
const CLIENT_TESTIMONIALS_ROW_1: TestimonialItem[] = [
  {
    id: "sp-marketplace",
    name: "Darrell Trimble",
    handle: "CEO · SP Marketplace (California)",
    content:
      "SOFTREE staff worked with us to learn our installation automation technology and built exactly what we needed.",
    highlights: ["SOFTREE", "installation automation"],
  },
  {
    id: "wicked-point",
    name: "Natasha Adams",
    handle: "Partner · Wicked Point LLC (Virginia)",
    content:
      "We had a very positive experience working with Softree Technology. The developers were responsive and delivery was on time. We appreciate the attention they gave our project and their great communication.",
    highlights: ["Softree Technology", "responsive", "on time"],
  },
  {
    id: "ecg-international",
    name: "Arkady Fedorovtsjev",
    handle: "IT Specialist · ECG International (Netherlands)",
    content:
      "Overall, we are satisfied with our collaboration in the past and your last action and response to our reported issue, really makes a difference.",
    highlights: ["collaboration", "makes a difference"],
  },
];

const CLIENT_TESTIMONIALS_ROW_2: TestimonialItem[] = [
  {
    id: "nuvento",
    name: "Rahi Radhakrishnan",
    handle: "Director of Delivery · Nuvento (USA)",
    content:
      "Softree demonstrated strong expertise in PowerApps development and delivered the project with excellent communication, responsiveness, and coordination throughout the engagement.",
    highlights: ["Softree", "PowerApps development", "excellent communication"],
  },
  {
    id: "adiva-it",
    name: "Asif Mohamed",
    handle: "CTO · Adiva Information Technology LLC (UAE)",
    content:
      "A trusted technology solutions provider with strong expertise in security, compliance, and enterprise delivery.",
    highlights: ["technology solutions provider", "security, compliance", "enterprise delivery"],
  },
  {
    id: "sp-marketplace-dup",
    name: "Darrell Trimble",
    handle: "CEO · SP Marketplace (California)",
    content:
      "SOFTREE staff worked with us to learn our installation automation technology and built exactly what we needed.",
    highlights: ["SOFTREE"],
  },
];

export function LightTestimonialFeature() {
  return (
    <section
      id="partner-testimonials"
      data-section="testimonials"
      className="bg-white py-12 md:py-16 overflow-hidden w-full border-t border-neutral-200/80"
      aria-labelledby="testimonials-heading"
    >
      <div className="max-w-[1400px] px-4 sm:px-6 lg:px-12 w-full mx-auto">
        {/* Centered Section Header */}
        <div className="text-center mb-8 md:mb-10 flex flex-col items-center max-w-4xl mx-auto px-4">
          {/* Eyebrow Pill Badge */}
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#FF5812]/20 bg-[#FF5812]/5 px-3 py-1 typo-caption text-[#FF5812] whitespace-nowrap">
            <span className="h-1.5 w-1.5 rounded-full bg-[#FF5812]" />
            Client Success Stories & Testimonials
          </span>

          {/* Heading */}
          <h2
            id="testimonials-heading"
            className={`${typography.heading.h2} text-[#0a0a1a] tracking-tight mb-4 flex flex-col items-center leading-[1.15]`}
          >
            <span className="max-w-none block w-full">
              <span className="text-[#0a0a1a]">Trusted by Clients for</span>{" "}
              <span className="text-[#FF5812] drop-shadow-[0_2px_12px_rgba(255,88,18,0.15)]">
                Technology Expertise and Reliable Delivery
              </span>
            </span>
          </h2>

          {/* Subheading Description */}
          <p className={`${typography.description.default} text-zinc-600 max-w-2xl mt-1 leading-relaxed font-normal text-center`}>
            Hear from our clients about their experience working with our team, our collaborative approach, and the value we bring to their business.
          </p>
        </div>
      </div>

      {/* Grid Testimonials Marquee Component */}
      <TestimonialsMarquee
        firstRow={CLIENT_TESTIMONIALS_ROW_1}
        secondRow={CLIENT_TESTIMONIALS_ROW_2}
        duration={55}
        pauseOnHover={true}
      />
    </section>
  );
}

export default LightTestimonialFeature;
