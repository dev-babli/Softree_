"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

type QA = {
  q: string;
  a: string;
};

type Audience = {
  id: string;
  title: string;
  fullTitle: string;
  imageSrc: string;
  qas: QA[];
};

const AUDIENCES: Audience[] = [
  {
    id: "01",
    title: "CEOs &\nBusiness Leaders",
    fullTitle: "CEOs & Business Leaders",
    imageSrc: "/images/serve/4.jpg",
    qas: [
      {
        q: "Can we trust you with our business-critical initiatives?",
        a: "We build partnerships around clear ownership, experienced teams, transparent communication, and accountable delivery."
      },
      {
        q: "Can we speak with clients who have worked with you in a similar engagement?",
        a: "We can share relevant client stories, case studies, and—where appropriate—references from comparable engagements."
      },
      {
        q: "Do you have the right people and expertise to deliver what we need?",
        a: "We bring experienced engineering teams across Microsoft, AI, cloud, data, and modern software engineering."
      },
      {
        q: "Will you deliver what you commit to—and keep us informed?",
        a: "Clear scope, milestones, responsibilities, and regular communication keep delivery visible and accountable."
      },
      {
        q: "How do you protect our data, IP, and business?",
        a: "We sign NDAs and Intellectual Property Agreements to protect your confidential information, ideas, and ownership throughout the engagement."
      }
    ]
  },
  {
    id: "02",
    title: "CTOs &\nTechnology Leaders",
    fullTitle: "CTOs & Technology Leaders",
    imageSrc: "/images/serve/3.jpg",
    qas: [
      {
        q: "Do you have the technical expertise to solve our specific engineering challenges?",
        a: "We bring experienced engineers across Microsoft, AI, cloud, data, and modern software engineering to address complex technology needs."
      },
      {
        q: "Can your team integrate with our existing technology and architecture?",
        a: "We work within your existing ecosystem, aligning with your architecture, standards, tools, and engineering practices."
      },
      {
        q: "Can you maintain the engineering quality we expect?",
        a: "We establish clear engineering standards, reviews, testing, and delivery practices to maintain quality throughout the engagement."
      },
      {
        q: "Can you scale the team as our technology needs change?",
        a: "We can adjust engineering capacity and bring in the right skills as priorities, workloads, and technical requirements evolve."
      },
      {
        q: "How do you protect our systems, data, and intellectual property?",
        a: "We sign NDAs and Intellectual Property Agreements and follow appropriate access, governance, and security practices throughout the engagement."
      }
    ]
  },
  {
    id: "03",
    title: "Microsoft Partners &\nConsultancies",
    fullTitle: "Microsoft Partners & Consultancies",
    imageSrc: "/images/serve/5.jpg",
    qas: [
      {
        q: "Can you support our Power Platform and workflow modernization needs?",
        a: "We help deliver Power Apps, Power Automate, workflow migration, and modernization across the Microsoft ecosystem."
      },
      {
        q: "Can you help us deliver AI solutions with Azure AI Foundry and Azure OpenAI?",
        a: "We support AI applications, agents, copilots, and integrations using Azure AI Foundry and Azure OpenAI."
      },
      {
        q: "Can we speak with clients who have worked with you in a similar engagement?",
        a: "We can share relevant client stories, case studies, and—where appropriate—references from comparable engagements."
      },
      {
        q: "How do you protect our clients’ data and confidential information?",
        a: "We sign NDAs and Intellectual Property Agreements and follow controlled access and confidentiality practices throughout the engagement."
      },
      {
        q: "Can we rely on you to deliver to our standards and protect our client relationships?",
        a: "We work as an extension of your team, aligning with your processes, quality expectations, communication model, and client commitments."
      },
      {
        q: "Can you scale your team when our project pipeline grows?",
        a: "We provide flexible engineering capacity, helping you take on more projects without immediately expanding your internal team."
      }
    ]
  },
  {
    id: "04",
    title: "Digital Agencies",
    fullTitle: "Digital Agencies",
    imageSrc: "/images/serve/2.jpg",
    qas: [
      {
        q: "Can you extend our development capacity when projects grow?",
        a: "We provide experienced engineering teams that can plug into your existing delivery model and help you take on more work."
      },
      {
        q: "Can you handle complex technology requirements beyond our core agency capabilities?",
        a: "We bring expertise across Microsoft, Power Platform, Azure, AI, data, cloud, and modern engineering to support complex client requirements."
      },
      {
        q: "Can we speak with clients who have worked with you in a similar engagement?",
        a: "We can share relevant client stories, case studies, and—where appropriate—references from comparable engagements."
      },
      {
        q: "Can we trust you to work behind the scenes without affecting our client relationship?",
        a: "We work as an extension of your team, respecting your client ownership, communication model, and delivery processes."
      },
      {
        q: "How do you protect our clients’ data and confidential information?",
        a: "We sign NDAs and Intellectual Property Agreements and follow controlled access and confidentiality practices throughout the engagement."
      },
      {
        q: "Can we rely on you to deliver to our quality and timeline expectations?",
        a: "We align with your processes, standards, milestones, and communication practices to provide reliable and predictable delivery."
      }
    ]
  },
  {
    id: "05",
    title: "Product &\nSaaS Companies",
    fullTitle: "Product & SaaS Companies",
    imageSrc: "/images/serve/1.jpg",
    qas: [
      {
        q: "Can you help us build and evolve our product faster?",
        a: "We provide experienced product-engineering teams that can accelerate development without compromising engineering quality."
      },
      {
        q: "Can you support the technology and engineering capabilities our product needs?",
        a: "We bring expertise across AI, Microsoft, cloud, data, modern engineering, and application development to support evolving product requirements."
      },
      {
        q: "Can we speak with clients who have worked with you in a similar engagement?",
        a: "We can share relevant client stories, case studies, and—where appropriate—references from comparable engagements."
      },
      {
        q: "Can we trust you with our product, roadmap, and intellectual property?",
        a: "We sign NDAs and Intellectual Property Agreements to protect your product, confidential information, and ownership throughout the engagement."
      },
      {
        q: "Can you work as an extension of our product and engineering team?",
        a: "We integrate with your existing team, processes, tools, and ways of working while maintaining clear ownership and communication."
      },
      {
        q: "Can you scale with us as our product and engineering needs grow?",
        a: "We provide flexible engineering capacity, allowing you to add the right skills and team size as your roadmap evolves."
      }
    ]
  }
];

function QAItem({
  num,
  q,
  a,
}: {
  num: string;
  q: string;
  a: string;
}) {
  return (
    <div className="border border-[#FF6B2C] shadow-[0_0_15px_rgba(255,107,44,0.25)] rounded-xl mb-2 bg-white overflow-hidden transition-shadow">
      <div className="w-full flex items-start gap-3.5 p-4 lg:p-5 text-left group">
        {/* Number circle */}
        <div className="flex-shrink-0 w-9 h-9 lg:w-10 lg:h-10 rounded-full bg-[#FFF5F0] text-[#FF6B2C] flex items-center justify-center font-bold text-[13px] lg:text-sm">
          {num}
        </div>
        
        {/* Content */}
        <div className="flex-1 pt-0.5 lg:pt-1">
          <span className="font-bold text-[#0A0F3C] text-[15px] lg:text-base leading-tight pr-4 block group-hover:text-[#FF6B2C] transition-colors">
            {q}
          </span>
          <div className="overflow-hidden">
            <div className="pt-2 pb-0">
              <p className="text-gray-500 text-sm lg:text-[15px] leading-relaxed">
                {a}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProfileBlock({ aud, index }: { aud: Audience; index: number }) {
  return (
    <div
      id={`audience-${aud.id}`}
      className={`flex flex-col lg:flex-row gap-8 lg:gap-14 items-stretch scroll-mt-48 lg:scroll-mt-64 ${
        index % 2 !== 0 ? 'lg:flex-row-reverse' : ''
      }`}
    >
      {/* LEFT/RIGHT: Image */}
      <div className="w-full lg:w-[40%]">
        <div className="relative w-full aspect-[4/5] lg:aspect-auto lg:h-full rounded-[1.5rem] overflow-hidden shadow-lg">
          <Image 
            src={aud.imageSrc} 
            fill 
            className="object-cover object-[center_20%]" 
            alt={aud.fullTitle}
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority={index === 0}
          />
        </div>
      </div>

      {/* RIGHT/LEFT: Content (Accordion) */}
      <div className="w-full lg:w-[60%] flex flex-col pt-1 lg:pt-0">
        <span className="text-gray-500 font-bold text-base mb-3 tracking-wide">
          {aud.id} / 05
        </span>
        
        <h3 className={`font-extrabold text-[#0A0F3C] leading-[1.1] mb-6 tracking-tight ${
          aud.id === '03' ? 'text-[1.75rem] md:text-3xl lg:text-[2rem] xl:text-[2.25rem] lg:whitespace-nowrap' : 'text-3xl lg:text-[2.75rem]'
        }`}>
          {aud.fullTitle}
        </h3>
        
        <div className="flex flex-col w-full">
          {aud.qas.map((qa, i) => {
            const numStr = (i + 1).toString().padStart(2, "0");
            return (
              <QAItem
                key={i}
                num={numStr}
                q={qa.q}
                a={qa.a}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function Audiences() {
  const scrollToAudience = (id: string) => {
    const element = document.getElementById(`audience-${id}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="relative w-full pt-8 pb-12 lg:pt-10 lg:pb-16 bg-white">
      <div className="mx-auto w-full max-w-[1300px] px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-8">
          <span className="text-[10px] lg:text-[11px] font-bold tracking-widest text-[#FF6B2C] uppercase mb-2 bg-[#FFF5F0] px-3 py-1 rounded-full">
            OUR AUDIENCES
          </span>
          <h2 className="text-2xl lg:text-[2.25rem] font-extrabold text-[#0A0F3C] mb-3 tracking-tight">
            Who We Work With
          </h2>
          <p className="text-[15px] lg:text-base text-gray-600 max-w-2xl">
            Every organization comes to us with a different challenge. Explore each group to see how we help.
          </p>
        </div>

        {/* Audience Selectors (Sticky Navigation) */}
        <div className="sticky top-[80px] lg:top-[90px] z-30 bg-white/95 backdrop-blur-md pt-2 pb-4 flex gap-3 lg:gap-4 overflow-x-auto snap-x hide-scrollbar mb-10 lg:mb-14 border-b border-gray-100">
          {AUDIENCES.map((aud) => (
            <button
              key={aud.id}
              onClick={() => scrollToAudience(aud.id)}
              className="group min-w-[160px] lg:min-w-0 flex-1 flex flex-col rounded-xl overflow-hidden border-2 text-left transition-all duration-300 snap-start border-gray-100 bg-white hover:border-[#FF6B2C] hover:shadow-md hover:bg-[#FFF9F6]"
            >
              <div className="relative w-full h-[100px] lg:h-[120px] bg-gray-200 shrink-0 overflow-hidden">
                <Image 
                  src={aud.imageSrc} 
                  fill 
                  className="object-cover object-[center_20%] transition-transform duration-500 group-hover:scale-105" 
                  alt={aud.fullTitle}
                  sizes="(max-width: 1024px) 50vw, 20vw"
                />
              </div>
              <div className="px-3 pt-2 pb-3 lg:px-4 lg:pt-3 lg:pb-4 flex-1 flex flex-col">
                <span className="text-[11px] font-bold text-gray-400 group-hover:text-[#FF6B2C] transition-colors">
                  {aud.id}
                </span>
                <h4 className="font-bold text-[13px] lg:text-sm mt-0.5 leading-tight whitespace-pre-line text-gray-600 group-hover:text-[#0A0F3C] transition-colors">
                  {aud.title}
                </h4>
              </div>
            </button>
          ))}
        </div>

        {/* All Profiles List */}
        <div className="flex flex-col gap-16 lg:gap-24 bg-white overflow-hidden">
          {AUDIENCES.map((aud, index) => (
            <ProfileBlock key={aud.id} aud={aud} index={index} />
          ))}
        </div>

      </div>
      
      {/* Hide scrollbar utility for the horizontal scroll area */}
      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
