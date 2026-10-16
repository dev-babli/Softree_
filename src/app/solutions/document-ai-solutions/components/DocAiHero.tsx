'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Script from 'next/script';
import { HERO_DATA } from '../data/heroData';
import TrustStrip from '@/components/sections/TrustStrip';
import { typography } from '@/lib/typography';

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
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

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
      className="relative w-full bg-[#050909] overflow-hidden flex flex-col pt-24 lg:pt-28"
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
      <Script
        src="https://unpkg.com/@splinetool/viewer@1.9.59/build/spline-viewer.js"
        type="module"
        strategy="afterInteractive"
      />

      <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="grid w-full items-center gap-6 lg:grid-cols-2 lg:gap-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-start text-left"
          >
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-[#FF6B00]/40 bg-[#FF6B00]/10 mb-4 backdrop-blur-sm"
            >
              <div className="w-2 h-2 rounded-full bg-[#FF6B00] shadow-[0_0_10px_2px_rgba(255,107,0,0.6)]" />
              <span className={`${typography.caption.default} text-[#FF6B00]`}>
                {label}
              </span>
            </motion.div>

            <motion.h1
              id="document-ai-hero-heading"
              itemProp="name"
              variants={itemVariants}
              className={`${typography.title} mb-5 text-left text-white`}
            >
              Intelligent Document AI That
              <br />
              <span className="text-[#FF6B00]">Extracts, Understands &amp; Automates</span>
            </motion.h1>

            <motion.p
              id="document-ai-hero-summary"
              itemProp="description"
              variants={itemVariants}
              className={`${typography.description.default} max-w-xl text-left text-[#A0AAB5] text-balance`}
            >
              {paragraph}
            </motion.p>
          </motion.div>

          <div className="relative h-[320px] sm:h-[400px] lg:h-[460px] w-full">
            <div className="pointer-events-auto absolute inset-0 overflow-hidden">
              {isMounted &&
                React.createElement('spline-viewer', {
                  url: 'https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode',
                  style: { width: '100%', height: '100%' },
                })}
              <div className="absolute bottom-2 right-2 z-[100] h-[50px] w-[150px] rounded-md bg-[#050909] pointer-events-auto" />
            </div>
          </div>
        </div>

        <div className="relative z-10 pb-10">
          <TrustStrip theme="dark" />
        </div>
      </div>
    </section>
  );
};

export default DocumentAiHero;
