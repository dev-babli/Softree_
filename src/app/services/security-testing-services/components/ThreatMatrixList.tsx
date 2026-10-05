"use client";

import React from "react";
import { ShieldAlert, Unlock, TerminalSquare, FileWarning, Database, KeySquare } from "lucide-react";
import { motion } from "framer-motion";
import { typography } from "@/lib/typography";
import { cn } from "@/lib/utils";

const threats = [
  {
    id: "prompt-injection",
    title: "Prompt Injection",
    description: "Malicious inputs designed to manipulate the AI into executing unintended commands or overriding its core system instructions.",
    icon: ShieldAlert,
  },
  {
    id: "jailbreaks",
    title: "Jailbreaks",
    description: "Sophisticated conversational techniques used to bypass safety guardrails and force the AI model into outputting prohibited content.",
    icon: Unlock,
  },
  {
    id: "system-prompt",
    title: "System Prompt Exposure",
    description: "Targeted attacks aimed at leaking the underlying system prompt, intellectual property, or hidden instructions driving the agent.",
    icon: TerminalSquare,
  },
  {
    id: "data-leakage",
    title: "Sensitive Data Leakage",
    description: "Unintended exposure of PII, PHI, or internal company secrets through unconstrained model outputs or faulty memory retrieval.",
    icon: FileWarning,
  },
  {
    id: "rag-exposure",
    title: "RAG Data Exposure",
    description: "Exploiting retrieval-augmented generation pipelines to access, infer, or leak unauthorized documents from the vector database.",
    icon: Database,
  },
  {
    id: "unauthorized-tools",
    title: "Unauthorized Tool Access",
    description: "Manipulating an agent to execute unauthorized API calls, database writes, or highly-privileged system functions without oversight.",
    icon: KeySquare,
  },
];

export const ThreatMatrixList: React.FC = () => {
  return (
    <section className="w-full py-24 bg-gradient-to-b from-zinc-50 via-white to-zinc-50 flex justify-center">
      <div className="w-full max-w-6xl px-4 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 relative items-start">
        
        {/* Left Column (Sticky) */}
        <div className="lg:sticky lg:top-32 flex flex-col gap-6">
          <div className={cn("inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-50 border border-orange-100 text-[#FF6B2C] w-fit", typography.caption.default)}>
            <ShieldAlert className="w-4 h-4" />
            Adversarial Testing
          </div>
          <h2 className={cn("text-zinc-900", typography.heading.h2)}>
            Security Testing for <br className="hidden md:block" />
            AI Applications
          </h2>
          <p className={cn("text-zinc-600 max-w-lg", typography.description.default)}>
            LLMs introduce an entirely new attack surface. We simulate advanced adversarial techniques—from sophisticated jailbreaks to RAG poisoning—to ensure your AI agents are robust, secure, and production-ready.
          </p>
        </div>

        {/* Right Column (Scrollable List) */}
        <div className="flex flex-col gap-5">
          {threats.map((threat, index) => (
            <motion.article 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
              key={threat.id}
              className="bg-white border-l-4 border-l-[#FF6B2C] border-y border-r border-zinc-200 shadow-sm rounded-r-xl p-5 md:p-6 flex flex-col sm:flex-row items-start gap-5 hover:-translate-y-1 transition-transform"
            >
              <div className="p-3 bg-orange-50 text-[#FF6B2C] rounded-xl shrink-0">
                <threat.icon className="w-6 h-6" />
              </div>
              <div className="flex flex-col gap-2">
                <h4 className={cn("text-zinc-900", typography.heading.h4)}>
                  {threat.title}
                </h4>
                <p className={cn("text-zinc-600", typography.body.default)}>
                  {threat.description}
                </p>
              </div>
            </motion.article>
          ))}
        </div>

      </div>
    </section>
  );
};
