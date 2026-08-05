"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Network, GitBranch, Users, ShieldCheck } from "lucide-react";

const PRINCIPLES = [
  {
    icon: Network,
    title: "Specialize, then coordinate",
    body: "Give each agent a sharp role—planning, research, execution, critique—then connect them with structured messaging.",
  },
  {
    icon: GitBranch,
    title: "Make work observable",
    body: "Expose the plan, tool calls, and handoffs so operators can audit, pause, or approve mid-flight.",
  },
  {
    icon: Users,
    title: "Keep humans in the loop",
    body: "Route high-risk or low-confidence decisions to people with full agent context—not a dead-end chat.",
  },
  {
    icon: ShieldCheck,
    title: "Govern every action",
    body: "Scoped tools, RBAC, audit trails, and evaluation loops so multi-agent systems stay production-safe.",
  },
];

export default function OrchestrationPrinciples() {
  return (
    <section
      id="orchestration"
      className="relative w-full overflow-hidden bg-[#0B0F14] py-20 text-white lg:py-28"
    >
      <div className="absolute inset-0">
        <Image
          src="/images/solutions/multi-agent-systems/process-abstract.png"
          alt=""
          fill
          className="object-cover opacity-35"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0F14] via-[#0B0F14]/85 to-[#0B0F14]" />
      </div>

      <div className="relative z-10 mx-auto max-w-[85rem] px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-3xl text-center lg:mb-16">
          <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.22em] text-[#FF6A13]">
            Design philosophy
          </p>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-[2.6rem]">
            Multi-agent done like a{" "}
            <span className="text-[#FF6A13]">control plane</span>
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-white/60 sm:text-base">
            Inspired by modern agentic UX: plan-and-execute transparency, swimlane collaboration, and governance—not another chatbot skin.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {PRINCIPLES.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: i * 0.06 }}
                className="group rounded-[24px] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-md transition hover:border-[#FF6A13]/35 hover:bg-white/[0.07] sm:p-6"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#FF6A13]/15 text-[#FF6A13] transition group-hover:scale-105">
                  <Icon className="h-5 w-5" strokeWidth={1.75} />
                </div>
                <h3 className="text-base font-bold text-white">{item.title}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-white/55">{item.body}</p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
