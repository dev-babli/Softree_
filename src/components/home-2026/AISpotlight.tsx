"use client";

/**
 * AISpotlight — Avoora demonstrated, not decorated. Story-spec §6.
 * - Fixed-height terminal card (zero CLS) plays ONE scripted exchange on
 *   first IO enter; replay button; reduced-motion/coarse pointer → final state.
 * - Ember spotlight follows the cursor over the card (CSS var position,
 *   rAF-throttled, pointer:fine only).
 * - Glow parallax yPercent ±6 scrub on the glow layer only.
 * - Permitted contained exception to the typewriter ban (brief §9.6).
 */
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";

import Reveal from "./lib/Reveal";
import { prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

// TODO(verify): align claims with real Avoora capability copy (src/app/avoora).
const CAPABILITIES = [
  "AVOORA — PARTNER-PORTAL AI, LIVE",
  "LLM RETRIEVAL PIPELINES (RAG)",
  "DOCUMENT INTELLIGENCE — PDF → DECISIONS",
  "AI COPILOTS FOR ENTERPRISE WORKFLOWS",
] as const;

const PROMPT = "> summarize the Q2 delivery risks for the Nexora account";
const ANSWER_LINES = [
  "3 risks found: API migration slippage (wk 6), unstaffed QA rotation,",
  "pending SSO scope sign-off. Highest impact: API migration — blocks 2 squads.",
  "Suggested action: pull forward the contract test suite. [3 sources]",
] as const;

type Phase = "idle" | "typing" | "answering" | "done";

export default function AISpotlight() {
  const scope = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<Phase>("idle");
  const [typedChars, setTypedChars] = useState(0);
  const [answerLines, setAnswerLines] = useState(0);
  const timers = useRef<number[]>([]);

  const clearTimers = () => {
    for (const t of timers.current) window.clearTimeout(t);
    timers.current = [];
  };

  const play = () => {
    clearTimers();
    if (prefersReducedMotion() || !window.matchMedia("(pointer: fine)").matches) {
      setTypedChars(PROMPT.length);
      setAnswerLines(ANSWER_LINES.length);
      setPhase("done");
      return;
    }
    setPhase("typing");
    setTypedChars(0);
    setAnswerLines(0);
    for (let i = 1; i <= PROMPT.length; i++) {
      timers.current.push(window.setTimeout(() => setTypedChars(i), i * 18));
    }
    const answerStart = PROMPT.length * 18 + 300;
    timers.current.push(window.setTimeout(() => setPhase("answering"), answerStart));
    ANSWER_LINES.forEach((_, i) => {
      timers.current.push(window.setTimeout(() => setAnswerLines(i + 1), answerStart + (i + 1) * 260));
    });
    timers.current.push(
      window.setTimeout(() => setPhase("done"), answerStart + ANSWER_LINES.length * 260 + 120),
    );
  };

  // Play once on first enter.
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    let played = false;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !played) {
          played = true;
          play();
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      clearTimers();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useGSAP(
    () => {
      const root = scope.current;
      const card = cardRef.current;
      if (!root || !card) return;
      if (prefersReducedMotion()) return;

      // Glow parallax — glow layer only, transform-only.
      gsap.to(root.querySelector("[data-glow]"), {
        yPercent: 6,
        ease: "none",
        scrollTrigger: { trigger: root, start: "top bottom", end: "bottom top", scrub: true },
      });

      // Ember spotlight follows cursor (pointer:fine, rAF-throttled CSS vars).
      if (!window.matchMedia("(pointer: fine)").matches) return;
      let raf: number | null = null;
      const onMove = (e: MouseEvent) => {
        if (raf !== null) return;
        raf = requestAnimationFrame(() => {
          const r = card.getBoundingClientRect();
          card.style.setProperty("--ember-x", `${((e.clientX - r.left) / r.width) * 100}%`);
          card.style.setProperty("--ember-y", `${((e.clientY - r.top) / r.height) * 100}%`);
          raf = null;
        });
      };
      card.addEventListener("mousemove", onMove, { passive: true });
      return () => {
        card.removeEventListener("mousemove", onMove);
        if (raf !== null) cancelAnimationFrame(raf);
      };
    },
    { scope },
  );

  return (
    <section ref={scope} id="ai" aria-labelledby="ai-heading" className="ember-grain relative overflow-hidden px-6 py-28 sm:px-10 lg:px-24">
      <div data-glow aria-hidden className="ember-glow" style={{ ["--ember-x" as string]: "20%", ["--ember-y" as string]: "30%" }} />

      <Reveal as="h2" className="font-mono-meta text-white/55">
        <span id="ai-heading">Our edge isn't a deck. It's deployed.</span>
      </Reveal>

      <div className="mt-10 grid gap-12 lg:grid-cols-12">
        {/* Demo artifact — fixed height, zero CLS */}
        <div className="lg:col-span-7">
          <div
            ref={cardRef}
            className="hairline relative h-[360px] overflow-hidden bg-[#141414] p-6"
          >
            <div aria-hidden className="ember-glow" />
            <div className="font-mono-meta relative flex h-full flex-col text-white/75">
              <div className="hairline-b flex items-center justify-between pb-3 text-white/35">
                <span>AVOORA · LIVE SESSION</span>
                <span aria-hidden>● ● ●</span>
              </div>

              <div className="flex-1 overflow-hidden pt-4 normal-case tracking-normal" aria-live="polite">
                <p className="text-[#ff7a2f]">{PROMPT.slice(0, typedChars)}
                  {phase === "typing" ? <span aria-hidden className="animate-pulse">▌</span> : null}
                </p>
                <div className="mt-4 space-y-2 text-white/75">
                  {ANSWER_LINES.slice(0, answerLines).map((l) => (
                    <p key={l}>{l}</p>
                  ))}
                </div>
              </div>

              <div className="hairline-t flex items-center justify-between pt-3 text-white/35">
                <span>{phase === "done" ? "AVOORA · RESPONSE 1.2s" : "AVOORA · WORKING…"}</span>
                <button
                  type="button"
                  onClick={play}
                  aria-label="Run the Avoora demo again"
                  className="font-mono-meta min-h-11 px-3 text-white/55 transition-colors duration-200 hover:text-[#ff7a2f] focus-visible:text-[#ff7a2f] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#ff7a2f]"
                >
                  ↻ RUN AGAIN
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Changelog-style capability list — renders instantly */}
        <ul className="font-mono-meta list-none space-y-4 self-center text-white/55 lg:col-span-5">
          {CAPABILITIES.map((c) => (
            <li key={c} className="hairline-b flex items-baseline gap-3 pb-3">
              <span aria-hidden className="text-[#ff7a2f]">＋</span>
              {c}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
