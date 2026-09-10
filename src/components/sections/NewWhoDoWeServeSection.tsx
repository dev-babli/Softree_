"use client";

import * as React from "react";
import { TestimonialSlider } from "@/components/ui/testimonial-slider-1";
import { FlowButton } from "@/components/ui/flow-button";

const REVIEWS = [
  {
    id: "01",
    title: "CEOs & Business Leaders",
    question: "Looking to grow your technology capabilities without growing your overhead?",
    asking: [
      "How can we scale engineering efficiently?",
      "Will offshore teams deliver quality?",
      "Can they handle modern AI and cloud tech?"
    ],
    howWeHelp: [
      "Scale delivery with an experienced offshore partner.",
      "Drive AI, automation, and application modernization."
    ],
    outcome: "We help turn technology priorities into measurable business outcomes.",
    imageSrc: "/images/serve/4.jpg",
    thumbnailSrc: "/images/serve/4.jpg",
  },
  {
    id: "02",
    title: "CTOs & Technology Leaders",
    question: "Need additional engineering capacity or specialized expertise?",
    asking: [
      "Do they have the right technical expertise?",
      "Can they scale with our project demands?",
      "Is our data and intellectual property secure?"
    ],
    howWeHelp: [
      "Extend your team with experienced specialists.",
      "Provide Microsoft, cloud, data, and AI expertise."
    ],
    outcome: "Extend your engineering organization without extending your hiring burden.",
    imageSrc: "/images/serve/3.jpg",
    thumbnailSrc: "/images/serve/3.jpg",
  },
  {
    id: "03",
    title: "Microsoft Partners & Consultancies",
    question: "Need a trusted delivery partner behind your client engagements?",
    asking: [
      "Can they act as a white-label partner?",
      "Do they have certified Microsoft expertise?",
      "Will they protect our client relationships?"
    ],
    howWeHelp: [
      "Use Softree as your offshore, white-label engineering team.",
      "Deliver Microsoft, AI, data, cloud, and app solutions."
    ],
    outcome: "Your Brand. Our Delivery.",
    imageSrc: "/images/serve/5.jpg",
    thumbnailSrc: "/images/serve/5.jpg",
  },
  {
    id: "04",
    title: "Digital Agencies",
    question: "Have more client work than your team can deliver?",
    asking: [
      "Can they integrate with our agency workflow?",
      "Do they have full-stack and AI capabilities?",
      "Can we expand capacity quickly without hiring?"
    ],
    howWeHelp: [
      "Our engineers work as an extension of your agency.",
      "Support web, apps, AI, automation, and Microsoft tech."
    ],
    outcome: "Expand your delivery capacity without expanding your internal team.",
    imageSrc: "/images/serve/2.jpg",
    thumbnailSrc: "/images/serve/2.jpg",
  },
  {
    id: "05",
    title: "Product & SaaS Companies",
    question: "Need to build faster or extend your product engineering team?",
    asking: [
      "Do they understand SaaS product development?",
      "Can they provide flexible, dedicated teams?",
      "Are they experienced in modern architectures?"
    ],
    howWeHelp: [
      "Add flexible offshore engineering capability.",
      "Access product, Agentic AI, cloud, and data expertise."
    ],
    outcome: "Scale effortlessly from individual specialists to dedicated teams.",
    imageSrc: "/images/serve/1.jpg",
    thumbnailSrc: "/images/serve/1.jpg",
  },
];

export default function NewWhoDoWeServeSection() {
  return (
    <section className="relative w-full bg-[#F3F0EE] pt-0 pb-8 md:pb-12 border-t border-[#0a0a1a]/[0.06] overflow-hidden">
      <div className="mx-auto w-full max-w-[1400px]">

        {/* Main Component Content */}
        <TestimonialSlider
          reviews={REVIEWS}
          eyebrow="WHO DO WE SERVE"
          heading="Who Do We Serve?"
          description="We help businesses, technology teams, and service providers extend their capabilities with offshore engineering, Agentic AI, and Microsoft expertise."
        />

        {/* Bottom CTA */}
        <div className="mt-0 flex flex-col items-center text-center border-t border-[#0a0a1a]/[0.06] pt-6 md:pt-8 px-6">
          <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-[#0a0a1a] w-full max-w-none md:whitespace-nowrap">
            Whatever you&apos;re building, modernizing, or scaling, we&apos;re ready to work alongside you.
          </h3>
          <FlowButton href="/contact" text="Explore Who We Serve" className="mt-6" />
        </div>

      </div>
    </section>
  );
}
