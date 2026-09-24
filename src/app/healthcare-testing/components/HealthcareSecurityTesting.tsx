"use client";

import React from "react";
import { motion } from "framer-motion";
import { Shield, Key, Lock, CheckCircle, ArrowDown, ShieldAlert } from "lucide-react";
import SectionBadge from "@/app/services/ai-development-services/components/SectionBadge";
import { FlowButton } from "@/components/ui/flow-button";

const processSteps = [
  {
    step: "01",
    title: "PATIENT DATA SECURITY",
    body: "Patient data leakage\nData privacy\nCross-user data exposure"
  },
  {
    step: "02",
    title: "ACCESS CONTROL",
    body: "Unauthorized data access\nAuthentication & authorization\nAccess control & permissions"
  },
  {
    step: "03",
    title: "APPLICATION SECURITY",
    body: "API security\nVulnerability testing\nMalicious input testing"
  },
  {
    step: "04",
    title: "SECURITY VALIDATION",
    body: "Security misconfigurations\nPrivacy controls\nApplication security validation"
  }
];

const icons = [ShieldAlert, Key, Lock, CheckCircle, Shield];

export default function HealthcareSecurityTesting() {
  return (
    <section id="security-testing" className="relative w-full py-16 md:py-24 bg-transparent font-sans">
      <div className="mx-auto max-w-[85rem] px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Responsive Grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* Left Column - Sticky */}
          <div className="lg:col-span-5 lg:sticky lg:top-32 flex flex-col justify-center">
            <div className="flex flex-col items-start">
              <SectionBadge text="HEALTHCARE SECURITY TESTING" variant="line" />

              <h2 className="typo-heading-2 text-[#111827] mt-4">
                Security Testing <br />
                for <span className="text-[#FF5812]">Healthcare <br />
                Applications</span>
              </h2>

              <p className="typo-description text-[#6B7280] mt-6 max-w-md">
                Healthcare applications handle sensitive patient data and require strong security and privacy controls.
              </p>

              {/* Scroll Indicator & CTA */}
              <div className="flex flex-col items-start gap-8 mt-10">
                <FlowButton 
                  href="/contact"
                  text="SECURE YOUR HEALTHCARE APPLICATION →"
                  variant="orange-filled"
                  className="shadow-lg shadow-orange-500/20"
                />

                <div className="hidden lg:flex items-center gap-3 text-zinc-400 animate-bounce">
                  <span className="typo-caption font-mono">Scroll to view security checks</span>
                  <ArrowDown size={14} className="text-[#FF5812]" />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Card Stack */}
          <div className="lg:col-span-7 flex flex-col gap-0 pb-20 mt-12 lg:mt-0">
            {processSteps.map((step, index) => {
              const Icon = icons[index % icons.length];
              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="group sticky w-full h-[280px] rounded-[32px] border border-zinc-800/80 bg-[#0B0F19] p-8 md:p-10 hover:border-[#FF5812]/50 transition-all duration-300 overflow-hidden mb-8 flex flex-col justify-between"
                  style={{
                    top: `140px`,
                    zIndex: index + 1
                  }}
                >
                  {/* Advanced Background Texture & Glows */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,88,18,0.05),transparent_60%)] pointer-events-none" />

                  {/* Subtle top indicator line on hover */}
                  <div className="absolute top-0 left-0 h-[3px] w-full bg-gradient-to-r from-[#FF6B00] to-[#FF5812] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20" />

                  {/* Top Row: Icon & Step Label */}
                  <div className="flex items-center justify-between relative z-10">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#FF5812]/10 text-[#FF5812] border border-[#FF5812]/20 transition-all duration-300 group-hover:bg-[#FF5812] group-hover:text-white">
                      <Icon size={22} strokeWidth={2} />
                    </div>
                    <span className="typo-caption text-zinc-600 group-hover:text-[#FF5812]/80 transition-colors">
                      STEP {step.step}
                    </span>
                  </div>

                  {/* Bottom Row: Text Content */}
                  <div className="relative z-10 mt-auto">
                    <h3 className="typo-heading-3 text-white mb-4 group-hover:text-[#FF5812] transition-colors">
                      {step.title}
                    </h3>
                    <p className="typo-body-sm text-zinc-400 whitespace-pre-line leading-relaxed">
                      {step.body}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
