"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  Bot,
  CheckCircle2,
  Database,
  MessageSquare,
  Brain,
  ShieldCheck,
  Sparkles,
  User,
  Zap,
} from "lucide-react";

type Stage = "ask" | "think" | "answer" | "hold";

type Conversation = {
  user: string;
  bot: string;
  resolved: string;
  source: string;
  bud: "intent" | "rag" | "crm" | "secure";
};

const CONVERSATIONS: Conversation[] = [
  {
    user: "What’s my order status for #48219?",
    bot: "Order #48219 shipped yesterday via FedEx. Expected delivery tomorrow by 5 PM.",
    resolved: "Order tracked in 1.2s",
    source: "ERP · Shipping API",
    bud: "crm",
  },
  {
    user: "How do I reset my SSO password?",
    bot: "Open Settings → Security → Reset SSO. I sent a secure reset link to your work email (valid 15 min).",
    resolved: "Self-service solved",
    source: "IT Knowledge Base",
    bud: "rag",
  },
  {
    user: "Can we refund after 30 days?",
    bot: "Yes — enterprise plans allow refunds within 45 days. I can open a refund ticket now if you want.",
    resolved: "Policy answered",
    source: "Policy RAG · Zendesk",
    bud: "intent",
  },
  {
    user: "Book a demo with your AI team",
    bot: "Booked Thursday 11:00 AM IST and added it to your calendar. A Softree specialist will join.",
    resolved: "Meeting scheduled",
    source: "Calendar · CRM",
    bud: "secure",
  },
];

const BUDS = [
  { id: "intent" as const, label: "Intent", icon: MessageSquare, tip: "Understands the ask" },
  { id: "rag" as const, label: "RAG", icon: Brain, tip: "Grounds in your docs" },
  { id: "crm" as const, label: "Systems", icon: Database, tip: "Calls live APIs" },
  { id: "secure" as const, label: "Secure", icon: ShieldCheck, tip: "Enterprise controls" },
];

function useTypewriter(text: string, enabled: boolean, speed = 16) {
  const [out, setOut] = useState("");
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!enabled) {
      setOut("");
      return;
    }
    if (reduceMotion) {
      setOut(text);
      return;
    }
    setOut("");
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setOut(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [text, enabled, speed, reduceMotion]);

  return { text: out, done: out.length >= text.length && enabled };
}

export default function HeroChatDemo() {
  const reduceMotion = useReducedMotion();
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [stage, setStage] = useState<Stage>("ask");
  const [history, setHistory] = useState<
    { id: string; user: string; bot?: string; resolved?: string; source?: string; bud?: Conversation["bud"] }[]
  >([]);
  const [activeBud, setActiveBud] = useState<Conversation["bud"] | null>(null);

  const current = CONVERSATIONS[index % CONVERSATIONS.length];
  const { text: typedBot, done: typingDone } = useTypewriter(
    current.bot,
    stage === "answer",
    reduceMotion ? 0 : 14
  );

  // Drive conversation timeline
  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    const wait = (ms: number, fn: () => void) => {
      timers.push(setTimeout(fn, reduceMotion ? Math.min(ms, 200) : ms));
    };

    setStage("ask");
    setActiveBud(null);

    const id = `c-${index}-${Date.now()}`;
    wait(350, () => {
      setHistory((prev) => {
        const next = [...prev, { id, user: current.user }];
        return next.slice(-3);
      });
      setActiveBud("intent");
    });

    wait(1100, () => {
      setStage("think");
      setActiveBud(current.bud === "intent" ? "rag" : current.bud);
    });

    wait(2400, () => {
      setStage("answer");
      setActiveBud(current.bud);
      setHistory((prev) =>
        prev.map((m) =>
          m.id === id
            ? {
                ...m,
                bot: current.bot,
                resolved: current.resolved,
                source: current.source,
                bud: current.bud,
              }
            : m
        )
      );
    });

    wait(7200, () => {
      setStage("hold");
      setIndex((i) => (i + 1) % CONVERSATIONS.length);
    });

    return () => timers.forEach(clearTimeout);
  }, [index, current, reduceMotion]);

  // Keep latest messages in view
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: reduceMotion ? "auto" : "smooth" });
  }, [history, stage, typedBot, reduceMotion]);

  const liveId = history[history.length - 1]?.id;
  const composerHint = useMemo(() => {
    if (stage === "think") return "Grounding answer from knowledge + systems…";
    if (stage === "answer" && !typingDone) return "Writing a verified reply…";
    if (stage === "hold" || (stage === "answer" && typingDone)) return "Resolved — ask the next question";
    return "Customer asks · Softree chatbot solves";
  }, [stage, typingDone]);

  return (
    <div className="relative mx-auto w-full max-w-[340px] sm:max-w-[380px] lg:max-w-[400px]">
      {/* Phone / chat shell — fixed desktop footprint, scales down on small screens */}
      <div className="relative flex h-[520px] w-full flex-col overflow-hidden rounded-[24px] border border-black/[0.06] bg-white shadow-[0_28px_70px_-32px_rgba(255,88,18,0.45),0_16px_40px_-24px_rgba(15,23,42,0.28)] ring-1 ring-orange-500/10 sm:h-[560px] sm:rounded-[28px] lg:h-[580px] lg:rounded-[32px]">
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between bg-gradient-to-r from-[#FFF4EC] via-white to-[#FFF8F3] px-3 py-2.5 sm:px-4 sm:py-3">
          <div className="flex min-w-0 items-center gap-2.5 sm:gap-3">
            <div className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#FF7A2F] to-[#FF5812] shadow-md shadow-orange-500/35 sm:h-11 sm:w-11 sm:rounded-2xl">
              <Bot className="h-4 w-4 text-white sm:h-5 sm:w-5" />
              <span className="absolute -right-0.5 -bottom-0.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-emerald-400 sm:h-3 sm:w-3" />
            </div>
            <div className="min-w-0">
              <p className="truncate text-[13px] font-bold text-[#0A0F3C] sm:text-sm">AI Chatbot</p>
              <p className="flex items-center gap-1.5 text-[10px] font-semibold text-emerald-600 sm:text-[11px]">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Online · solving in real time
              </p>
            </div>
          </div>
          <div className="hidden items-center gap-1 rounded-full border border-orange-100 bg-white px-2.5 py-1 text-[10px] font-bold tracking-wide text-[#FF5812] uppercase sm:inline-flex">
            <Zap className="h-3 w-3" />
            Live demo
          </div>
        </div>

        {/* Capability buds */}
        <div className="flex shrink-0 gap-1 overflow-x-auto border-b border-orange-50/80 bg-white px-3 py-2 scrollbar-none sm:flex-wrap sm:gap-1.5 sm:overflow-visible sm:px-4 sm:py-2.5">
          {BUDS.map((bud) => {
            const Icon = bud.icon;
            const on = activeBud === bud.id;
            return (
              <div
                key={bud.id}
                className={`inline-flex shrink-0 items-center gap-1 rounded-full border px-2 py-1 text-[9px] font-bold tracking-wide uppercase transition-all duration-300 sm:text-[10px] ${
                  on
                    ? "border-[#FF5812]/35 bg-[#FF5812] text-white shadow-sm shadow-orange-500/25"
                    : "border-orange-100 bg-orange-50/60 text-[#FF5812]"
                }`}
              >
                <Icon className="h-3 w-3" />
                {bud.label}
              </div>
            );
          })}
        </div>

        {/* Message stream — fills remaining height */}
        <div
          ref={scrollerRef}
          className="relative min-h-0 flex-1 space-y-3 overflow-y-auto overscroll-contain px-3 py-3 [scrollbar-width:none] sm:space-y-3.5 sm:px-4 sm:py-4 [&::-webkit-scrollbar]:hidden"
          style={{
            backgroundImage:
              "radial-gradient(ellipse at top, #FFF8F2 0%, #FFFFFF 58%), radial-gradient(circle at 1px 1px, rgba(255,88,18,0.08) 1px, transparent 0)",
            backgroundSize: "auto, 16px 16px",
          }}
        >
          <div className="mb-1 flex justify-center">
            <span className="rounded-full border border-orange-100 bg-white/80 px-3 py-1 text-[10px] font-semibold tracking-wide text-slate-500 uppercase">
              Today · enterprise support
            </span>
          </div>

          <AnimatePresence initial={false}>
            {history.map((msg, msgIdx) => {
              const isLive = msg.id === liveId;
              const showBotBody =
                !!msg.bot &&
                (!isLive || stage === "answer" || stage === "hold");
              const botDisplay =
                isLive && stage === "answer" && !reduceMotion
                  ? typedBot || msg.bot || ""
                  : msg.bot ?? "";

              return (
                <motion.div
                  key={msg.id}
                  layout
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ type: "spring", stiffness: 340, damping: 28 }}
                  className="space-y-3"
                >
                  <div className="flex items-end justify-end gap-2">
                    <div className="max-w-[85%] rounded-[18px] rounded-br-md bg-gradient-to-br from-[#FF6A13] to-[#E84E0C] px-3 py-2 text-[12px] leading-relaxed font-medium text-white shadow-[0_10px_24px_-8px_rgba(255,88,18,0.55)] sm:max-w-[82%] sm:rounded-[20px] sm:px-3.5 sm:py-2.5 sm:text-[13px]">
                      {msg.user}
                    </div>
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-500 ring-2 ring-white sm:h-8 sm:w-8">
                      <User className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                    </div>
                  </div>

                  {isLive && stage === "think" && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-end gap-2"
                    >
                      <AvatarBot />
                      <div className="rounded-[18px] rounded-bl-md border border-orange-100 bg-white px-3 py-2.5 shadow-sm sm:rounded-[20px] sm:px-4 sm:py-3">
                        <div className="mb-1.5 flex items-center gap-1.5 text-[10px] font-bold tracking-wide text-[#FF5812] uppercase">
                          <Sparkles className="h-3 w-3" />
                          Solving
                        </div>
                        <TypingDots />
                      </div>
                    </motion.div>
                  )}

                  {showBotBody && (
                    <div className="flex items-end gap-2">
                      <AvatarBot />
                      <div className="max-w-[88%] space-y-2">
                        <div className="rounded-[18px] rounded-bl-md border border-orange-100/90 bg-white px-3 py-2 text-[12px] leading-relaxed font-medium text-[#0A0F3C] shadow-[0_12px_28px_-16px_rgba(15,23,42,0.35)] sm:rounded-[20px] sm:px-3.5 sm:py-2.5 sm:text-[13px]">
                          {botDisplay}
                          {isLive && stage === "answer" && !typingDone && !reduceMotion && (
                            <span className="ml-0.5 inline-block h-3.5 w-[2px] animate-pulse bg-[#FF5812] align-middle" />
                          )}
                        </div>

                        {((isLive && (typingDone || reduceMotion || stage === "hold")) ||
                          !isLive) &&
                          msg.resolved && (
                          <motion.div
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex flex-wrap items-center gap-1.5 sm:gap-2"
                          >
                            <span className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 sm:gap-1.5 sm:px-2.5 sm:py-1 sm:text-[11px]">
                              <CheckCircle2 className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                              {msg.resolved}
                            </span>
                            {msg.source && (
                              <span className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-[9px] font-semibold text-slate-500 sm:px-2.5 sm:py-1 sm:text-[10px]">
                                <Database className="h-3 w-3 text-[#FF5812]" />
                                {msg.source}
                              </span>
                            )}
                          </motion.div>
                        )}
                      </div>
                    </div>
                  )}

                  {msgIdx < history.length - 1 && showBotBody && (
                    <div className="mx-auto h-px w-10 bg-orange-100/80" />
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Composer */}
        <div className="shrink-0 border-t border-orange-50/80 bg-white px-3 py-2.5 sm:px-4 sm:py-3">
          <div className="mb-2 flex gap-1.5 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {["Track order", "Reset SSO", "Refund policy"].map((chip, i) => (
              <span
                key={chip}
                className={`shrink-0 rounded-full border px-2.5 py-1 text-[10px] font-semibold transition-colors ${
                  index % 3 === i
                    ? "border-[#FF5812]/30 bg-orange-50 text-[#FF5812]"
                    : "border-slate-100 bg-slate-50 text-slate-400"
                }`}
              >
                {chip}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-2 rounded-2xl border border-slate-100 bg-[#FAFAF8] px-3 py-2 sm:py-2.5">
            <span className="min-w-0 flex-1 truncate text-[11px] text-slate-400 sm:text-[12px]">
              {composerHint}
            </span>
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#FF6A13] to-[#FF5812] text-white shadow-md shadow-orange-500/30 sm:h-9 sm:w-9">
              <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </span>
          </div>

          <div className="mt-2.5 flex items-center justify-center gap-1.5 sm:mt-3">
            {CONVERSATIONS.map((_, i) => (
              <span
                key={i}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  i === index % CONVERSATIONS.length
                    ? "w-6 bg-[#FF5812]"
                    : "w-1.5 bg-orange-200"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function AvatarBot() {
  return (
    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#FF6A13] to-[#FF5812] text-white shadow-sm shadow-orange-500/35 ring-2 ring-white">
      <Bot className="h-3.5 w-3.5" />
    </div>
  );
}

function TypingDots() {
  return (
    <div className="flex items-center gap-1.5 py-0.5">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="h-1.5 w-1.5 rounded-full bg-[#FF5812]"
          animate={{ y: [0, -5, 0], opacity: [0.35, 1, 0.35] }}
          transition={{
            duration: 0.65,
            repeat: Infinity,
            delay: i * 0.14,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
