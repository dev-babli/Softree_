"use client";

import * as React from "react";
import { TestimonialSlider } from "@/components/ui/testimonial-slider-1";
import { FlowButton } from "@/components/ui/flow-button";

const REVIEWS = [
  {
    id: "01",
    title: "Logistics & Transportation Companies",
    question: "Looking for a technology partner to optimize your logistics operations?",
    asking: [
      "Can we automate routing and transportation management?",
      "Do you have the engineering expertise for logistics AI solutions?",
      "How can we integrate our legacy transportation software?"
    ],
    howWeHelp: [
      "Build intelligent route optimization and transportation software.",
      "Extend your team with offshore engineering and AI specialists.",
      "Modernize logistics platforms with enterprise integration and cloud data solutions."
    ],
    outcome: "Optimized transportation operations with scalable software, automation, and reliable offshore logistics engineering.",
    imageSrc: "/images/serve/logistics/1.jpg",
    thumbnailSrc: "/images/serve/logistics/1.jpg",
  },
  {
    id: "02",
    title: "Supply Chain Organizations",
    question: "Need the engineering capacity to build end-to-end supply chain visibility?",
    asking: [
      "Can you build scalable supply chain AI solutions and data pipelines?",
      "How do we integrate disjointed supply chain systems?",
      "Can your offshore engineers work as an extension of our team?"
    ],
    howWeHelp: [
      "Develop real-time supply chain analytics and operational dashboards.",
      "Provide dedicated offshore teams for supply chain engineering and automation.",
      "Implement AI agents to streamline complex supply chain workflows."
    ],
    outcome: "Resilient and transparent supply chain ecosystems powered by modern technology and offshore engineering.",
    imageSrc: "/images/serve/logistics/2.jpg",
    thumbnailSrc: "/images/serve/logistics/2.jpg",
  },
  {
    id: "03",
    title: "Warehouse & Distribution Companies",
    question: "Looking to modernize your warehouse operations with intelligent automation?",
    asking: [
      "Can you help us integrate our WMS with other enterprise systems?",
      "Do you have experience with warehouse automation and AI?",
      "How can we improve inventory accuracy through technology?"
    ],
    howWeHelp: [
      "Engineer seamless TMS and WMS integration services.",
      "Develop logistics AI solutions for warehouse automation and document processing.",
      "Provide offshore teams specialized in high-performance distribution software."
    ],
    outcome: "Highly efficient, automated warehouse operations supported by specialized logistics software engineering.",
    imageSrc: "/images/serve/logistics/3.jpg",
    thumbnailSrc: "/images/serve/logistics/3.jpg",
  },
  {
    id: "04",
    title: "Software & Technology Companies",
    question: "Looking for an engineering partner who understands logistics technology?",
    asking: [
      "Can you help us ship logistics software features faster?",
      "Do you have deep expertise in logistics AI and data engineering?",
      "Can we trust you with our product roadmap and IP?"
    ],
    howWeHelp: [
      "Extend your product team with specialized offshore logistics engineers.",
      "Bring deep expertise across AI, cloud, Microsoft, and modern engineering.",
      "Protect your proprietary logistics software and IP with strict NDAs."
    ],
    outcome: "Accelerated logistics technology development with flexible engineering capacity to scale your product.",
    imageSrc: "/images/serve/logistics/4.jpg",
    thumbnailSrc: "/images/serve/logistics/4.jpg",
  },
  {
    id: "05",
    title: "Digital Agencies",
    question: "Need a trusted engineering partner to deliver complex logistics projects?",
    asking: [
      "Can you handle enterprise logistics integrations we don't have capacity for?",
      "Can you work securely behind the scenes on supply chain projects?",
      "Can we trust you to deliver reliable offshore engineering?"
    ],
    howWeHelp: [
      "Act as your dedicated offshore engineering team for logistics clients.",
      "Deliver complex supply chain integration, automation, and AI projects.",
      "Work seamlessly within your delivery model while protecting client relationships."
    ],
    outcome: "More logistics and supply chain projects delivered successfully without increasing your internal delivery overhead.",
    imageSrc: "/images/serve/logistics/5.jpg",
    thumbnailSrc: "/images/serve/logistics/5.jpg",
  },
];

export default function LogisticsWhoDoWeServe() {
  return (
    <section className="relative w-full bg-white pt-0 pb-8 md:pb-12 border-t border-[#0a0a1a]/[0.06] overflow-hidden">
      <div className="mx-auto w-full max-w-[1400px]">

        {/* Main Component Content */}
        <TestimonialSlider
          reviews={REVIEWS}
          eyebrow="WHO DO WE SERVE"
          heading="Who Do We Serve?"
          description="We partner with logistics and supply chain organizations that need technology expertise and engineering capacity to build, modernize, automate, and scale their operations."
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
