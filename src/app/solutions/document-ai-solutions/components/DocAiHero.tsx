'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { HERO_DATA } from '../data/heroData';
import TrustStrip from '@/components/sections/TrustStrip';
import { typography } from '@/lib/typography';
import { Component as CelestialLoom } from '@/components/ui/celestial-loom';

const HERO_SEO = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://www.softreetechnology.com/solutions/document-ai-solutions#webpage",
      url: "https://www.softreetechnology.com/solutions/document-ai-solutions",
      name: "Document AI Solutions & Intelligent Document Processing",
      description:
        "Offshore Document AI engineering for intelligent document processing: OCR and layout extraction with Azure AI Document Intelligence, classification, validation, and ERP, CRM, and SharePoint integration.",
      inLanguage: "en",
      isPartOf: {
        "@type": "WebSite",
        name: "Softree Technology",
        url: "https://www.softreetechnology.com",
      },
      about: {
        "@id": "https://www.softreetechnology.com/solutions/document-ai-solutions#service",
      },
      speakable: {
        "@type": "SpeakableSpecification",
        cssSelector: ["#document-ai-hero-heading", "#document-ai-hero-summary"],
      },
      mainEntity: {
        "@id": "https://www.softreetechnology.com/solutions/document-ai-solutions#service",
      },
    },
    {
      "@type": "Service",
      "@id": "https://www.softreetechnology.com/solutions/document-ai-solutions#service",
      name: "Document AI Solutions & Intelligent Document Processing",
      serviceType: "Intelligent document processing and OCR engineering",
      url: "https://www.softreetechnology.com/solutions/document-ai-solutions",
      areaServed: "Worldwide",
      provider: {
        "@type": "Organization",
        name: "Softree Technology",
        url: "https://www.softreetechnology.com",
      },
      description:
        "Softree designs and builds document AI systems for technology companies, consultancies, agencies, and integrators. Work covers OCR and layout extraction, custom and prebuilt Azure AI Document Intelligence models, multimodal understanding of scans and complex layouts, document classification and routing, confidence scoring with human review, and posting extracted data into ERP, CRM, and SharePoint. Delivery is offshore, dedicated, or white-label.",
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Document AI engineering capabilities",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Intelligent OCR and structured data extraction",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Multimodal document understanding for scans, handwriting, and complex layouts",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Document classification, routing, and human review",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "ERP, CRM, and SharePoint workflow integration",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Validation, governance, and audit trails",
            },
          },
        ],
      },
    },
  ],
};

export const DocumentAiHero: React.FC = () => {
  const { label, paragraph } = HERO_DATA;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.215, 0.61, 0.355, 1] as const } },
  };

  return (
    <section
      aria-labelledby="document-ai-hero-heading"
      itemScope
      itemType="https://schema.org/Service"
      itemID="https://www.softreetechnology.com/solutions/document-ai-solutions#service"
      className="relative w-full bg-[#050909] overflow-hidden flex flex-col pt-24 lg:pt-32"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(HERO_SEO) }}
      />
      <meta itemProp="serviceType" content="Intelligent document processing and OCR engineering" />
      <link itemProp="url" href="https://www.softreetechnology.com/solutions/document-ai-solutions" />
      <div itemProp="provider" itemScope itemType="https://schema.org/Organization" hidden>
        <meta itemProp="name" content="Softree Technology" />
        <link itemProp="url" href="https://www.softreetechnology.com" />
      </div>

      {/* Celestial Loom: Procedural Weave Effect (Exclusively Orange, Black, and Red) */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <CelestialLoom
          className="!h-full !min-h-full"
          colors={[
            "#FF6B00", // Softree Signature Orange
            "#FF8533", // Bright Warm Orange
            "#FF4500", // Fiery Orange-Red
            "#E65100", // Deep Amber Orange
            "#E60000", // Pure Crimson Red
            "#FF1E27", // Bright Tech Red
            "#CC1100", // Deep Red
            "#FF3B30", // Scarlet Red
            "#000000", // Pure Black
            "#18181B", // Dark Obsidian Black
          ]}
        />
      </div>

      {/* Ambient gradient overlay for optimal readability of centered typography */}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-[#050909] via-transparent to-[#050909]/50" />
      <div className="pointer-events-none absolute inset-0 z-[1] [background:radial-gradient(ellipse_at_center,rgba(5,9,9,0.25)_0%,rgba(5,9,9,0.85)_100%)]" />

      {/* CENTERED CONTENT */}
      <div className="relative z-10 mx-auto w-full max-w-[1100px] px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center pt-4 pb-8 sm:pb-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center text-center w-full"
        >
          {/* Eyebrow Label */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-[#FF6B00]/40 bg-[#FF6B00]/10 mb-8 backdrop-blur-sm"
          >
            <div className="w-2.5 h-2.5 rounded-full bg-[#FF6B00] shadow-[0_0_10px_2px_rgba(255,107,0,0.6)]" />
            <span
              className={`${typography.caption.default} text-[12px] md:text-[13px] font-bold tracking-[0.15em] text-[#FF6B00] uppercase`}
            >
              {label}
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            id="document-ai-hero-heading"
            itemProp="name"
            variants={itemVariants}
            className={`${typography.heading.h1} text-3xl sm:text-5xl lg:text-[62px] leading-[1.12] font-bold text-white mb-6 tracking-tight text-center max-w-4xl`}
          >
            Build Smarter Document Automation With Our{" "}
            <span className="text-[#FF6B00]">Offshore AI Team</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            id="document-ai-hero-summary"
            itemProp="description"
            variants={itemVariants}
            className={`${typography.description.default} text-base sm:text-lg lg:text-[19px] text-[#A0AAB5] max-w-2xl leading-relaxed text-center`}
          >
            {paragraph}
          </motion.p>
        </motion.div>
      </div>

      {/* TrustStrip at the bottom */}
      <div className="w-full pb-12 relative z-10 pt-4">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <TrustStrip theme="dark" />
        </div>
      </div>
    </section>
  );
};

export default DocumentAiHero;




