"use client";

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Lenis from 'lenis';
import { typography } from '@/lib/typography';

import './ReverseStickyScroll.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const ReverseStickyScroll = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    // Use GSAP ScrollTrigger safely without duplicating full page RAF
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    let lenis: Lenis | null = null;

    if (!isMobile) {
      lenis = new Lenis();
      lenis.on('scroll', ScrollTrigger.update);
      const raf = (time: number) => {
        lenis?.raf(time);
        requestAnimationFrame(raf);
      };
      requestAnimationFrame(raf);
    }

    // Grab all section elements inside our container
    const sections = gsap.utils.toArray<HTMLElement>(
      containerRef.current.querySelectorAll('.rss_section')
    );

    sections.forEach((section, i) => {
      const innerContainer = section.querySelector('.rss_container');
      if (!innerContainer) return;

      // 1. Entrance Rotation Animation (for sections after the first one)
      if (i > 0) {
        const startRotation = isMobile ? 8 : 20;
        gsap.set(innerContainer, {
          rotation: startRotation,
          transformOrigin: 'bottom left',
        });

        gsap.to(innerContainer, {
          rotation: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'top 25%',
            scrub: true,
          },
        });

        // Keep previous card fully visible & interactive while the new card is entering.
        const prevContainer = sections[i - 1]?.querySelector('.rss_container');
        if (prevContainer) {
          gsap.to(prevContainer, {
            scale: 0.96,
            opacity: 0.25,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top 35%',
              end: 'top top',
              scrub: true,
            },
          });
        }
      }

      // 2. Sticky Pinning Animation (for sections before the last one)
      if (i < sections.length - 1) {
        ScrollTrigger.create({
          trigger: section,
          start: 'bottom bottom',
          end: 'bottom top',
          pin: true,
          pinSpacing: false,
        });
      }
    });

    // Cleanup function
    return () => {
      lenis?.destroy();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, { scope: containerRef });

  return (
    <section className="w-full bg-white pt-10 md:pt-14 pb-8 md:pb-12">
      {/* Reverse Sticky Scroll Overall Header */}
      <div className="w-full max-w-[1340px] mx-auto px-4 mb-8 md:mb-12 flex flex-col items-start text-left">
        <div className="shadow-[inset_2px_2px_5px_#e4e4e7,inset_-2px_-2px_5px_#ffffff] bg-zinc-50/50 px-3.5 py-1 rounded-full border border-white/60 mb-4 inline-block">
          <span className={`${typography.caption.default} text-[#FF6B2C] uppercase font-semibold`}>
            AI CHATBOT DEVELOPMENT SERVICES
          </span>
        </div>

        <h2 className={`${typography.heading.h2} text-slate-900 mb-4 text-left`}>
          Custom AI Chatbot Development for <br />
          <span className="text-[#FF6B2C]">Smarter Customer Experiences</span>
        </h2>

        <p className={`${typography.description.default} text-slate-500 max-w-2xl text-left`}>
          Build conversational AI solutions with Softree Technology. Our offshore AI engineering team develops custom chatbots that answer questions, connect business knowledge, automate routine inquiries, and integrate with existing applications and support workflows.
        </p>
      </div>

      <div ref={containerRef} className="rss_wrap">
        {[
          {
            num: "01",
            title: "CUSTOM AI CHATBOT DEVELOPMENT",
            titleSplit: "Custom AI Chatbot<br />Development",
            desc: "Build tailored AI chatbots that understand user questions, provide relevant answers, and support customer service and business communication.",
            features: [
              "Develop Custom AI Chatbots",
              "Handle Natural-Language Queries",
              "Provide Contextual Responses",
              "Support Customer Self-Service"
            ],
            bg: "#C94716",
            text: "#ffffff",
          },
          {
            num: "02",
            title: "CONVERSATIONAL AI & LLM INTEGRATION",
            titleSplit: "Conversational AI<br />Development",
            desc: "Develop conversational experiences using suitable AI models and language processing capabilities to support natural interactions across customer and business workflows.",
            features: [
              "Integrate Language Models",
              "Understand User Intent",
              "Manage Multi-Turn Conversations",
              "Improve Response Relevance"
            ],
            bg: "#111111",
            text: "#f5f5f5",
          },
          {
            num: "03",
            title: "RAG-POWERED CHATBOT KNOWLEDGE INTEGRATION",
            titleSplit: "AI Chatbot Knowledge<br />Integration",
            desc: "Connect chatbots to approved documents, knowledge bases, databases, and business information using retrieval-augmented generation (RAG) where appropriate.",
            features: [
              "Integrate Business Documents",
              "Connect Knowledge Sources",
              "Retrieve Relevant Information",
              "Generate Context-Aware Answers"
            ],
            bg: "#fcfbf9",
            text: "#111111",
          },
          {
            num: "04",
            title: "OMNICHANNEL CHATBOT DEVELOPMENT",
            titleSplit: "Omnichannel AI Chatbot<br />Solutions",
            desc: "Deliver conversational experiences across supported websites, applications, and messaging channels, based on your users' needs and technology environment.",
            features: [
              "Integrate Website Chat Widgets",
              "Support Messaging Channels",
              "Connect Customer Service Platforms",
              "Maintain Consistent Conversations"
            ],
            bg: "#FF6B00",
            text: "#ffffff",
          },
          {
            num: "05",
            title: "CHATBOT WORKFLOW AUTOMATION",
            titleSplit: "AI Chatbot Integration &<br />Workflow Automation",
            desc: "Connect chatbots with supported APIs, CRM platforms, helpdesk systems, and business workflows to assist users and automate appropriate tasks.",
            features: [
              "Integrate CRM and Helpdesk Systems",
              "Automate Routine Inquiries",
              "Enable Human-Agent Handoff",
              "Streamline Support Workflows"
            ],
            bg: "#18181b",
            text: "#f5f5f5",
          }
        ].map((card, idx) => (
          <section key={idx} className={`rss_section rss_s${idx + 1}`} style={{ zIndex: idx + 1 }}>
            <div className="rss_container flex flex-col items-start text-left" style={{ backgroundColor: card.bg, color: card.text }}>
              <p className="rss_tag">{card.num} — {card.title}</p>
              <hr className="rss_hr w-full" />
              <div className="w-full text-left">
                <h3 className="rss_big text-left" dangerouslySetInnerHTML={{ __html: card.titleSplit }}></h3>
              </div>
              <hr className="rss_hr w-full" />
              <div className="w-full text-left">
                <p className="rss_sub text-left">{card.desc}</p>
                {card.features && (
                  <ul className="mt-8 space-y-4">
                    {card.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-center gap-3 text-base font-medium opacity-90">
                        <span className="w-1.5 h-1.5 rounded-full bg-current opacity-80" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </section>
        ))}
      </div>
    </section>
  );
};

export default ReverseStickyScroll;
