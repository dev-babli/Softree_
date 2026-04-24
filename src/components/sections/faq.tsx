"use client";

import { useState } from "react";

const faqs = [
  {
    question: "What is Softree?",
    answer:
      "Softree is a technology solutions company that helps organizations design, build, and scale secure digital platforms using Microsoft, cloud, AI, and modern web technologies.",
  },
  {
    question: "What services does Softree offer?",
    answer:
      "Softree provides custom software development, web and mobile applications, SharePoint and Power Platform solutions, cloud and Azure services, AI-driven automation, and enterprise system integration.",
  },
  {
    question: "Which industries does Softree serve?",
    answer:
      "Softree works with clients across IT services, healthcare, finance, manufacturing, education, and enterprise organizations seeking digital transformation.",
  },
  {
    question: "Does Softree work with Microsoft technologies?",
    answer:
      "Yes. Softree specializes in SharePoint, Power Apps, Power Automate, Power Pages, Microsoft 365, Azure, SPFx, and Microsoft Graph integrations.",
  },
  {
    question: "Can Softree integrate with existing systems?",
    answer:
      "Absolutely. Softree designs solutions that integrate seamlessly with existing enterprise systems, databases, APIs, and third-party platforms.",
  },
  {
    question: "Is Softree suitable for enterprise-scale projects?",
    answer:
      "Yes. Softree follows enterprise-grade architecture, security best practices, and scalable design principles to support large teams and complex workflows.",
  },
  {
    question: "How does Softree ensure security?",
    answer:
      "Softree implements role-based access control, secure authentication, data protection standards, and compliance best practices tailored to enterprise environments.",
  },
  {
    question: "Can Softree scale solutions as our business grows?",
    answer:
      "Yes. All Softree solutions are designed to scale with increasing users, data, and evolving business requirements.",
  },
];

export default function SoftreeFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="relative w-full py-12 px-4 md:px-6 bg-gradient-to-b from-black via-[#020d1a] to-black">
      {/* Background Glow */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-cyan-500/5 via-transparent to-transparent" />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-15">
          <p
            className="text-sm uppercase tracking-widest font-semibold mb-3 inline-block bg-clip-text text-transparent"
            style={{
              backgroundImage:
                "linear-gradient(90deg, #ff7a2f 0%, #c75a2a 35%, #6b5b5b 70%, #3a3a3a 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Softree FAQ
          </p>

          <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Everything You Need to Know
          </h2>

          <p className="text-slate-500 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
            Clear answers to common questions about Softree’s enterprise-grade
            digital solutions, platforms, and capabilities.
          </p>
        </div>

        {/* FAQ Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className={`
          relative
          rounded-2xl
          border border-white/10
          bg-gradient-to-br from-white/[0.08] via-white/[0.04] to-black/[0.4]
          backdrop-blur-2xl
          p-6
          shadow-[0_20px_60px_rgba(0,0,0,0.6)]
          transition-all
          duration-300
          hover:-translate-y-1
          hover:shadow-[0_30px_80px_rgba(0,0,0,0.8)]
          ${isOpen ? "ring-1 ring-cyan-400/40" : ""}
        `}
              >
                {/* Mirror Shine */}
                <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-tr from-white/10 via-transparent to-transparent opacity-40" />

                {/* Top Accent Line */}

                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="relative z-10 flex w-full items-start justify-between gap-4 text-left"
                >
                  <h3 className="text-lg md:text-xl font-semibold text-white">
                    {faq.question}
                  </h3>

                  {/* Icon */}
                  <span
                    className={`
              mt-1
              flex h-9 w-9 items-center justify-center
              rounded-full
              border
              text-base
              font-semibold
              transition-all
              duration-300
              ${
                isOpen
                  ? "rotate-180 bg-cyan-500 text-black border-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.8)]"
                  : "border-white/30 text-white/70 hover:bg-white/10"
              }
            `}
                  >
                    +
                  </span>
                </button>

                {/* Answer */}
                <div
                  className={`
            grid
            transition-all
            duration-300
            ease-in-out
            ${isOpen ? "grid-rows-[1fr] mt-4" : "grid-rows-[0fr]"}
          `}
                >
                  <div className="overflow-hidden">
                    <p className="text-white/70 text-sm md:text-base leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
