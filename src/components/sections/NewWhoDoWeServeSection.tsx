"use client";

import * as React from "react";
import { TestimonialSlider } from "@/components/ui/testimonial-slider-1";
import { FlowButton } from "@/components/ui/flow-button";

const REVIEWS = [
  {
    id: "01",
    title: "CEOs & Business Leaders",
    question: "Looking for a technology partner you can trust with what matters most?",
    asking: [
      "Can we trust you with business-critical work?",
      "Can you prove it with clients like us",
      "What protects our data, IP, and business?"
    ],
    howWeHelp: [
      "Experienced teams with clear ownership and accountable delivery.",
      "NDAs and Intellectual Property Agreements to protect your business and IP.",
      "Relevant client experience, case studies, and references where appropriate."
    ],
    outcome: "A technology partner you can trust to deliver, adapt, and grow with your business.",
    imageSrc: "/images/serve/4.jpg",
    thumbnailSrc: "/images/serve/4.jpg",
  },
  {
    id: "02",
    title: "CTOs & Technology Leaders",
    question: "Looking for the technical expertise to solve complex challenges without compromising quality?",
    asking: [
      "Can you solve the technical challenges we can't handle in-house?",
      "Can your engineers work within our existing architecture and technology stack?",
      "Can you maintain the engineering quality we expect?"
    ],
    howWeHelp: [
      "Experienced engineers across Microsoft, AI, cloud, data, and modern engineering.",
      "Teams that integrate with your architecture, tools, standards, and ways of working.",
      "Disciplined engineering practices focused on quality and reliable delivery."
    ],
    outcome: "The technical expertise and engineering capacity to move complex initiatives forward with confidence.",
    imageSrc: "/images/serve/3.jpg",
    thumbnailSrc: "/images/serve/3.jpg",
  },
  {
    id: "03",
    title: "Microsoft Partners & Consultancies",
    question: "Looking for a trusted partner to extend your Microsoft delivery capabilities?",
    asking: [
      "Can you handle the Microsoft projects we don't have the capacity for?",
      "Do you have the expertise in Power Platform, Azure AI Foundry, and workflow migration?",
      "Can we trust you with our clients, their data, and our reputation?"
    ],
    howWeHelp: [
      "Extend your delivery capacity with experienced Microsoft engineering teams.",
      "Deliver Power Platform, Azure AI Foundry, Azure OpenAI, and workflow migration solutions.",
      "Work securely behind the scenes while protecting client information and IP."
    ],
    outcome: "More Microsoft projects delivered with the expertise and capacity to grow your business.",
    imageSrc: "/images/serve/5.jpg",
    thumbnailSrc: "/images/serve/5.jpg",
  },
  {
    id: "04",
    title: "Digital Agencies",
    question: "Looking for a trusted engineering partner to deliver more for your clients?",
    asking: [
      "Can you handle the development work we don't have the capacity for?",
      "Can you work behind the scenes without putting our client relationships at risk?",
      "Can we trust you with our clients' data, projects, and intellectual property?"
    ],
    howWeHelp: [
      "Extend your team with experienced engineers across modern technologies.",
      "Work seamlessly within your delivery model while you remain client-facing.",
      "Protect client information and IP through NDAs and Intellectual Property Agreements."
    ],
    outcome: "More projects delivered reliably—without increasing your internal delivery overhead.",
    imageSrc: "/images/serve/2.jpg",
    thumbnailSrc: "/images/serve/2.jpg",
  },
  {
    id: "05",
    title: "Product & SaaS Companies",
    question: "Looking for an engineering partner who can keep pace with your product roadmap?",
    asking: [
      "Can you help us ship product features faster without compromising quality?",
      "Do you have the engineering expertise to solve our evolving product challenges?",
      "Can we trust you with our product, IP, and roadmap?"
    ],
    howWeHelp: [
      "Extend your product team with experienced engineering talent.",
      "Bring expertise across AI, Microsoft, cloud, data, and modern engineering.",
      "Protect your product and IP through NDAs and Intellectual Property Agreements."
    ],
    outcome: "More product momentum with the engineering capacity and expertise to scale with your roadmap.",
    imageSrc: "/images/serve/1.jpg",
    thumbnailSrc: "/images/serve/1.jpg",
  },
];

export default function NewWhoDoWeServeSection() {
  return (
    <section className="relative w-full bg-[#F8F9FC] pt-0 pb-8 md:pb-12 border-t border-[#0a0a1a]/[0.06] overflow-hidden">
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
          <FlowButton href="/who-do-we-serve" text="Explore Who We Serve" className="mt-6" />
        </div>

      </div>
    </section>
  );
}
