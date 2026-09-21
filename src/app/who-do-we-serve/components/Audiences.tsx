"use client";

import React from "react";
import Image from "next/image";
import { 
  Shield, 
  Users, 
  Settings, 
  ClipboardCheck, 
  Lock, 
  Layers, 
  TrendingUp, 
  Grid,
  Cloud,
  MessageSquare,
  Handshake,
  BarChart2,
  Rocket,
  Package
} from "lucide-react";

type QA = {
  q: string;
  a: string;
  icon: any;
};

type Audience = {
  id: string;
  title: string;
  fullTitle: string;
  imageSrc: string;
  description: string;
  quote?: {
    text: string;
    author: string;
  };
  intro: string;
  qas: QA[];
};

const AUDIENCES: Audience[] = [
  {
    id: "01",
    title: "CEOs &\nBusiness Leaders",
    fullTitle: "CEOs & Business Leaders",
    imageSrc: "/images/serve/4.jpg",
    description: "Driving growth. Managing risk. Creating long-term value.\nAs a business leader, you need a technology partner who understands your business, solves complex challenges, and delivers with accountability.",
    quote: {
      text: "We look for partners who understand our business, take ownership, and deliver real outcomes. Softree does that.",
      author: "BUSINESS LEADER"
    },
    intro: "We know what matters when you're trusting a technology partner with a business-critical initiative. Here's how Softree approaches it.",
    qas: [
      {
        q: "Can we trust you with our business-critical initiatives?",
        a: "We build partnerships around clear ownership, experienced teams, transparent communication, and accountable delivery.",
        icon: Shield,
      },
      {
        q: "Can we speak with clients who have worked with you in a similar engagement?",
        a: "We can share relevant client stories, case studies, and—where appropriate—references from comparable engagements.",
        icon: Users,
      },
      {
        q: "Do you have the right people and expertise to deliver what we need?",
        a: "We bring experienced engineering teams across Microsoft, AI, cloud, data, and modern software engineering.",
        icon: Settings,
      },
      {
        q: "Will you deliver what you commit to—and keep us informed?",
        a: "Clear scope, milestones, responsibilities, and regular communication keep delivery visible and accountable.",
        icon: ClipboardCheck,
      },
      {
        q: "How do you protect our data, IP, and business?",
        a: "We sign NDAs and Intellectual Property Agreements to protect your confidential information, ideas, and ownership throughout the engagement.",
        icon: Lock,
      }
    ]
  },
  {
    id: "02",
    title: "CTOs &\nTechnology Leaders",
    fullTitle: "CTOs & Technology Leaders",
    imageSrc: "/images/serve/3.jpg",
    description: "Solving complex challenges. Scaling with confidence.\nAs a technology leader, you need a partner who can bring deep technical expertise, work within your architecture, and maintain the engineering quality you expect.",
    quote: {
      text: "We value partners who understand technology deeply, integrate seamlessly, and help us solve what's next.",
      author: "CTO"
    },
    intro: "We understand the technical questions that matter to you. Here's how Softree approaches them.",
    qas: [
      {
        q: "Do you have the technical expertise to solve our specific engineering challenges?",
        a: "We bring experienced engineers across Microsoft, AI, cloud, data, and modern software engineering to address complex technology needs.",
        icon: Settings,
      },
      {
        q: "Can your team integrate with our existing technology and architecture?",
        a: "We work within your existing ecosystem, aligning with your architecture, standards, tools, and engineering practices.",
        icon: Layers,
      },
      {
        q: "Can you maintain the engineering quality we expect?",
        a: "We establish clear engineering standards, reviews, testing, and delivery practices to maintain quality throughout the engagement.",
        icon: Shield,
      },
      {
        q: "Can you scale the team as our technology needs change?",
        a: "We can adjust engineering capacity and bring in the right skills as priorities, workloads, and technical requirements evolve.",
        icon: TrendingUp,
      },
      {
        q: "How do you protect our systems, data, and intellectual property?",
        a: "We sign NDAs and Intellectual Property Agreements and follow appropriate access, governance, and security practices throughout the engagement.",
        icon: Lock,
      }
    ]
  },
  {
    id: "03",
    title: "Microsoft Partners &\nConsultancies",
    fullTitle: "Microsoft Partners & Consultancies",
    imageSrc: "/images/serve/5.jpg",
    description: "Co-innovating. Co-delivering. Creating greater impact.\nAs a Microsoft partner or consultancy, you need a trusted technology partner who can complement your capabilities, bring deep expertise, and help you deliver more value to your clients.",
    quote: {
      text: "We collaborate with Microsoft partners and consultancies to co-innovate, co-deliver, and create greater impact for our mutual clients.",
      author: "MICROSOFT PARTNER"
    },
    intro: "We understand what matters to Microsoft partners and consultancies. Here's how Softree approaches it.",
    qas: [
      {
        q: "Can you support our Power Platform and workflow modernization needs?",
        a: "We help deliver Power Apps, Power Automate, workflow migration, and modernization across the Microsoft ecosystem.",
        icon: Grid,
      },
      {
        q: "Can you help us deliver AI solutions with Azure AI Foundry and Azure OpenAI?",
        a: "We support AI applications, agents, copilots, and integrations using Azure AI Foundry and Azure OpenAI.",
        icon: Cloud,
      },
      {
        q: "Can we speak with clients who have worked with you in a similar engagement?",
        a: "We can share relevant client stories, case studies, and—where appropriate—references from comparable engagements.",
        icon: Users,
      },
      {
        q: "How do you protect our clients’ data and confidential information?",
        a: "We sign NDAs and Intellectual Property Agreements and follow controlled access and confidentiality practices throughout the engagement.",
        icon: Shield,
      },
      {
        q: "Can we rely on you to deliver to our standards and protect our client relationships?",
        a: "We work as an extension of your team, aligning with your processes, quality expectations, communication model, and client commitments.",
        icon: Handshake,
      },
      {
        q: "Can you scale your team when our project pipeline grows?",
        a: "We provide flexible engineering capacity, helping you take on more projects without immediately expanding your internal team.",
        icon: BarChart2,
      }
    ]
  },
  {
    id: "04",
    title: "Digital Agencies",
    fullTitle: "Digital Agencies",
    imageSrc: "/images/serve/2.jpg",
    description: "Your extended engineering partner.\nAs a digital agency, you need a reliable partner who can plug into your team, bring deep technical expertise, and help you deliver outstanding results for your clients.",
    quote: {
      text: "We partner with digital agencies to extend capability, solve complex challenges, and help deliver exceptional outcomes for their clients.",
      author: "DIGITAL AGENCY PARTNER"
    },
    intro: "We understand the questions digital agencies have. Here's how Softree approaches them.",
    qas: [
      {
        q: "Can you extend our development capacity when projects grow?",
        a: "We provide experienced engineering teams that can plug into your existing delivery model and help you take on more work.",
        icon: Users,
      },
      {
        q: "Can you handle complex technology requirements beyond our core agency capabilities?",
        a: "We bring expertise across Microsoft, Power Platform, Azure, AI, data, cloud, and modern engineering to support complex client requirements.",
        icon: Settings,
      },
      {
        q: "Can we speak with clients who have worked with you in a similar engagement?",
        a: "We can share relevant client stories, case studies, and—where appropriate—references from comparable engagements.",
        icon: MessageSquare,
      },
      {
        q: "Can we trust you to work behind the scenes without affecting our client relationship?",
        a: "We work as an extension of your team, respecting your client ownership, communication model, and delivery processes.",
        icon: Handshake,
      },
      {
        q: "How do you protect our clients’ data and confidential information?",
        a: "We sign NDAs and Intellectual Property Agreements and follow controlled access and confidentiality practices throughout the engagement.",
        icon: Lock,
      },
      {
        q: "Can we rely on you to deliver to our quality and timeline expectations?",
        a: "We align with your processes, standards, milestones, and communication practices to provide reliable and predictable delivery.",
        icon: TrendingUp,
      }
    ]
  },
  {
    id: "05",
    title: "Product &\nSaaS Companies",
    fullTitle: "Product & SaaS Companies",
    imageSrc: "/images/serve/1.jpg",
    description: "From idea to impact. Faster.\nAs a product or SaaS company, you need a partner who can augment your team, bring deep technical expertise, and help you build, scale, and continuously evolve your product.",
    quote: {
      text: "We partner with product and SaaS companies to accelerate innovation, scale engineering, and turn ideas into impactful products.",
      author: "PRODUCT LEADER"
    },
    intro: "We understand the questions product and SaaS companies have. Here's how Softree approaches them.",
    qas: [
      {
        q: "Can you help us build and evolve our product faster?",
        a: "We provide experienced product-engineering teams that can accelerate development without compromising engineering quality.",
        icon: Rocket,
      },
      {
        q: "Can you support the technology and engineering capabilities our product needs?",
        a: "We bring expertise across AI, Microsoft, cloud, data, modern engineering, and application development to support evolving product requirements.",
        icon: Package,
      },
      {
        q: "Can we speak with clients who have worked with you in a similar engagement?",
        a: "We can share relevant client stories, case studies, and—where appropriate—references from comparable engagements.",
        icon: Users,
      },
      {
        q: "Can we trust you with our product, roadmap, and intellectual property?",
        a: "We sign NDAs and Intellectual Property Agreements to protect your product, confidential information, and ownership throughout the engagement.",
        icon: Shield,
      },
      {
        q: "Can you work as an extension of our product and engineering team?",
        a: "We integrate with your existing team, processes, tools, and ways of working while maintaining clear ownership and communication.",
        icon: Settings,
      },
      {
        q: "Can you scale with us as our product and engineering needs grow?",
        a: "We provide flexible engineering capacity, allowing you to add the right skills and team size as your roadmap evolves.",
        icon: TrendingUp,
      }
    ]
  }
];

function QAItem({
  num,
  q,
  a,
  Icon
}: {
  num: string;
  q: string;
  a: string;
  Icon: any;
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-[1rem] mb-3 shadow-sm flex flex-col md:flex-row items-stretch overflow-hidden group hover:shadow-md transition-shadow">
      <div className="flex-1 p-5 md:p-6 flex gap-4 md:gap-5">
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#FFF5F0] text-[#FF6B2C] flex items-center justify-center font-bold text-sm">
          {num}
        </div>
        
        <div className="flex-shrink-0 pt-1 hidden sm:block">
          <Icon className="w-6 h-6 text-[#1A202C]" strokeWidth={1.5} />
        </div>

        <div className="flex-1 pt-1">
          <div className="flex gap-3 mb-2">
            <div className="sm:hidden pt-0.5">
              <Icon className="w-5 h-5 text-[#1A202C]" strokeWidth={1.5} />
            </div>
            <h4 className="font-bold text-[#0A0F3C] text-[15px] lg:text-[17px] leading-snug">
              {q}
            </h4>
          </div>
          <p className="text-gray-500 text-sm lg:text-[15px] leading-relaxed">
            <span className="text-[#FF6B2C] font-bold uppercase text-xs tracking-wider mr-1">Softree:</span>
            {a}
          </p>
        </div>
      </div>
    </div>
  );
}

function ProfileBlock({ aud, index }: { aud: Audience; index: number }) {
  return (
    <div
      id={`audience-${aud.id}`}
      className={`flex flex-col lg:flex-row gap-10 lg:gap-14 items-stretch scroll-mt-48 lg:scroll-mt-64 pt-8 lg:pt-12 ${
        index !== 0 ? 'border-t border-gray-100' : ''
      }`}
    >
      {/* LEFT: Image Card */}
      <div className="w-full lg:w-[35%] flex flex-col">
        <div className="relative w-full h-full rounded-[1.25rem] overflow-hidden bg-gray-100 flex flex-col shadow-lg border border-gray-200">
          <div className="relative w-full flex-1 min-h-[300px] lg:min-h-0">
            <Image 
              src={aud.imageSrc} 
              fill 
              className="object-cover object-[center_20%]" 
              alt={aud.fullTitle}
              sizes="(max-width: 1024px) 100vw, 35vw"
              priority={index === 0}
            />
          </div>
          
          {/* Quote Block inside the image card */}
          {aud.quote && (
            <div className="relative z-10 bg-[#16233B] text-white p-7 lg:p-9 w-full flex-shrink-0 mt-[-1px]">
              <div className="text-[#FF6B2C] text-5xl font-serif leading-none mb-3">“</div>
              <p className="text-[17px] lg:text-[18px] leading-[1.5] font-medium mb-7 text-white/95">
                {aud.quote.text}
              </p>
              <div className="w-8 h-[2px] bg-[#FF6B2C] mb-4"></div>
              <span className="text-[11px] lg:text-xs font-bold tracking-widest uppercase text-white/70">
                — {aud.quote.author}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* RIGHT: Content */}
      <div className="w-full lg:w-[65%] flex flex-col pt-1 lg:pt-0">
        <span className="text-gray-500 font-bold text-sm mb-2 tracking-wide">
          {aud.id} / 05
        </span>
        <h3 className="text-3xl lg:text-[2.75rem] font-extrabold text-[#0A0F3C] leading-[1.1] mb-4 tracking-tight">
          {aud.fullTitle}
        </h3>
        <div className="text-gray-600 text-[15px] lg:text-[17px] leading-relaxed mb-10 whitespace-pre-line max-w-2xl">
          {aud.description}
        </div>

        <div className="mb-6">
          <span className="text-[#FF6B2C] text-[11px] font-bold tracking-widest uppercase block mb-1">
            THE QUESTIONS YOU MAY BE ASKING.
          </span>
          <h4 className="text-2xl lg:text-3xl font-extrabold text-[#0A0F3C] mb-3 tracking-tight">
            Our answers.
          </h4>
          <p className="text-gray-600 text-[15px] lg:text-base max-w-2xl">
            {aud.intro}
          </p>
        </div>

        <div className="flex flex-col w-full">
          {aud.qas.map((qa, i) => (
            <QAItem
              key={i}
              num={(i + 1).toString().padStart(2, "0")}
              q={qa.q}
              a={qa.a}
              Icon={qa.icon}
            />
          ))}
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
      <div className="mx-auto w-full max-w-[1400px] px-6 lg:px-8">
        
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
              className="group min-w-[160px] lg:min-w-0 flex-1 flex flex-col rounded-[1rem] overflow-hidden border-2 text-left transition-all duration-300 snap-start bg-white border-gray-100 hover:border-[#FF6B2C] hover:shadow-md hover:bg-[#FFF9F6]"
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
                <span className="text-[11px] font-bold transition-colors text-gray-400 group-hover:text-[#FF6B2C]">
                  {aud.id}
                </span>
                <h4 className="font-bold text-[13px] lg:text-sm mt-0.5 leading-tight whitespace-pre-line transition-colors text-gray-600 group-hover:text-[#0A0F3C]">
                  {aud.title}
                </h4>
              </div>
            </button>
          ))}
        </div>

        {/* All Profiles List */}
        <div className="flex flex-col gap-12 lg:gap-16 bg-white overflow-hidden">
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
