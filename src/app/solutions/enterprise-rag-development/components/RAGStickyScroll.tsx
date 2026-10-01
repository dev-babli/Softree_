"use client";

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Lenis from 'lenis';
// Import original CSS to preserve EXACT styling
import '@/app/services/ai-development-services/components/ReverseStickyScroll/ReverseStickyScroll.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const RAGStickyScroll = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    // Initialize Lenis scroll smoothing
    const lenis = new Lenis();
    lenis.on('scroll', ScrollTrigger.update);

    const updateLenis = (time: number) => {
      // gsap.ticker time is in seconds, lenis expects milliseconds
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(updateLenis);

    // Grab all section elements inside our container
    const sections = gsap.utils.toArray<HTMLElement>('.rss_section');

    sections.forEach((section, i) => {
      const innerContainer = section.querySelector('.rss_container');
      if (!innerContainer) return;

      // 1. Entrance Rotation Animation (for sections after the first one)
      if (i > 0) {
        const startRotation = typeof window !== 'undefined' && window.innerWidth < 768 ? 14 : 25;
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
        // Only subtly scale/dim as the new card actually takes over the upper viewport.
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
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, { scope: containerRef });

  return (
    <>
      <div className="w-full max-w-[1340px] mx-auto px-4 mt-12 md:mt-16 mb-8 flex flex-col items-start text-left">
        <div className="shadow-[inset_2px_2px_5px_#e4e4e7,inset_-2px_-2px_5px_#ffffff] bg-zinc-50/50 px-3.5 py-1 rounded-full border border-white/60 mb-4 inline-block">
          <span className="typo-caption text-[#FF6B2C] uppercase">
            WHAT WE BUILD
          </span>
        </div>

        <h2 className="typo-heading-2 text-slate-900 mb-4">
          Build Enterprise RAG Solutions for <br />
          <span className="text-[#FF6B2C]">Secure Knowledge Retrieval</span>
        </h2>

        <p className="typo-description text-slate-500 max-w-2xl">
          Build production-ready RAG applications that connect enterprise data with intelligent retrieval and large language models with complete RAG pipeline—from data ingestion and document processing to vector search, retrieval, LLM integration, evaluation, and production deployment.
        </p>
      </div>

      <div ref={containerRef} className="rss_wrap">
        {[
          {
            num: "01",
            tag: "RAG ARCHITECTURE",
            title: "Enterprise RAG Architecture",
            titleSplit: "Enterprise RAG<br />Architecture",
            desc: "Design scalable RAG architectures around your business data, applications, security requirements, and AI workloads, creating a reliable foundation for enterprise knowledge retrieval and grounded AI experiences.",
            points: ["Retrieval pipelines designed for enterprise knowledge and business context", "Architectures built for secure, scalable production deployment"],
            bg: "#C94716",
            text: "#ffffff"
          },
          {
            num: "02",
            tag: "DATA INGESTION",
            title: "Enterprise Data Ingestion",
            titleSplit: "Enterprise Data<br />Ingestion",
            desc: "Connect and prepare information from documents, databases, business applications, and knowledge repositories so enterprise data can be continuously processed and made available to downstream RAG workflows.",
            points: ["SharePoint, PDFs, SQL/DB, Confluence, Google Drive, CRM, emails, and APIs", "Structured ingestion pipelines for reliable downstream retrieval"],
            bg: "#111111",
            text: "#f5f5f5"
          },
          {
            num: "03",
            tag: "DOCUMENT PROCESSING",
            title: "Document Processing & Chunking",
            titleSplit: "Document Processing<br />& Chunking",
            desc: "Transform enterprise documents into structured, searchable knowledge through extraction, cleaning, chunking, and metadata enrichment designed to improve retrieval quality and context relevance.",
            points: ["Document extraction, cleaning, chunking, and metadata enrichment", "Support for complex enterprise document and knowledge formats"],
            bg: "#fcfbf9",
            text: "#111111"
          },
          {
            num: "04",
            tag: "EMBEDDINGS & VECTOR SEARCH",
            title: "Embeddings & Vector Search",
            titleSplit: "Embeddings &<br />Vector Search",
            desc: "Convert enterprise knowledge into searchable vector representations and connect it to vector databases for semantic retrieval across large and diverse business information sources.",
            points: ["Embedding generation and vector database integration", "Semantic and hybrid search for more relevant knowledge retrieval"],
            bg: "#FF6B00",
            text: "#ffffff"
          },
          {
            num: "05",
            tag: "RETRIEVAL & RERANKING",
            title: "Intelligent Retrieval & Reranking",
            titleSplit: "Intelligent Retrieval<br />& Reranking",
            desc: "Improve the quality of retrieved context before it reaches the language model by combining query understanding, semantic search, filtering, retrieval, and reranking.",
            points: ["Query understanding, filtering, retrieval, and reranking", "Retrieval pipelines designed to return focused business context"],
            bg: "#18181b",
            text: "#f5f5f5"
          },
          {
            num: "06",
            tag: "LLM INTEGRATION",
            title: "Grounded LLM Responses",
            titleSplit: "Grounded LLM<br />Responses",
            desc: "Connect retrieved enterprise knowledge with leading language models to generate context-aware responses grounded in the information available to your RAG application.",
            points: ["Azure OpenAI, OpenAI, Claude, Gemini, and Llama integration", "Grounded responses with relevant enterprise context and source-aware answers"],
            bg: "#fcfbf9",
            text: "#111111"
          },
          {
            num: "07",
            tag: "SECURITY & PRODUCTION",
            title: "Secure RAG Deployment & Optimization",
            titleSplit: "Secure RAG<br />Deployment &<br />Optimization",
            desc: "Take RAG applications into production with security, evaluation, monitoring, performance optimization, and ongoing engineering support across the complete AI application lifecycle.",
            points: ["Access controls, evaluation, monitoring, performance, and production support", "Continuous improvement of retrieval quality, response relevance, and system efficiency"],
            bg: "#C94716",
            text: "#ffffff"
          }
        ].map((card, idx) => (
          <section key={idx} className={`rss_section rss_s${idx + 1}`} style={{ zIndex: idx + 1 }}>
            <div className="rss_container flex flex-col items-start text-left" style={{ backgroundColor: card.bg, color: card.text }}>
              <p className="rss_tag">{card.num} — {card.tag}</p>
              <hr className="rss_hr w-full" />
              <div className="w-full text-left">
                <h2 className="rss_big text-left" dangerouslySetInnerHTML={{ __html: card.titleSplit }}></h2>
              </div>
              <hr className="rss_hr w-full" />
              <p className="rss_sub text-left">{card.desc}</p>

              <div className="mt-8 flex flex-col gap-3">
                {card.points.map((point, pIdx) => (
                  <div key={pIdx} className="flex items-center gap-3 text-sm md:text-base font-medium opacity-90">
                    <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: card.text }} />
                    {point}
                  </div>
                ))}
              </div>
            </div>
          </section>
        ))}
      </div>
    </>
  );
};
