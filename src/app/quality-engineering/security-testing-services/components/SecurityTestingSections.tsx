"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BrainCircuit,
  Database,
  Bot,
  ShieldCheck,
  BarChart3,
  CheckCircle2,
  LockKeyhole,
  AlertTriangle,
  DatabaseZap,
  EyeOff,
  KeyRound,
  Network,
  Workflow,
  Wrench,
  RotateCcw,
  ChevronDown,
  Sparkles,
  Code2,
  Activity,
} from "lucide-react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* =====================================================
   HERO DATA
===================================================== */

const heroTopCards = [
  {
    title: "LLM",
    subtitle: "Applications",
    icon: BrainCircuit,
  },
  {
    title: "RAG",
    subtitle: "Applications",
    icon: Database,
  },
  {
    title: "AI",
    subtitle: "Agents",
    icon: Bot,
  },
];

const heroBottomCards = [
  {
    title: "AI Quality",
    icon: CheckCircle2,
  },
  {
    title: "AI Security",
    icon: ShieldCheck,
  },
  {
    title: "Reliability",
    icon: BarChart3,
  },
];

/* =====================================================
   SECURITY DATA
===================================================== */

const securityLeft = [
  {
    text: "Prompt Injection",
    icon: AlertTriangle,
  },
  {
    text: "Jailbreak Testing",
    icon: LockKeyhole,
  },
  {
    text: "Sensitive Data Leakage",
    icon: DatabaseZap,
  },
  {
    text: "System Prompt Exposure",
    icon: EyeOff,
  },
  {
    text: "RAG Data Exposure",
    icon: Database,
  },
];

const securityRight = [
  {
    text: "Unauthorized Tool Access",
    icon: Wrench,
  },
  {
    text: "Excessive Agent Permissions",
    icon: KeyRound,
  },
  {
    text: "Cross-User Data Exposure",
    icon: Network,
  },
  {
    text: "Malicious Inputs",
    icon: AlertTriangle,
  },
  {
    text: "Unsafe AI Outputs",
    icon: ShieldCheck,
  },
];

/* =====================================================
   AGENT DATA
===================================================== */

const agentSteps = [
  "User Goal",
  "Plan",
  "Reason",
  "Select Tool",
  "Execute",
  "Observe",
  "Recover",
];

const agentScenarios = [
  "Incorrect tool selection",
  "Unauthorized actions",
  "Multi-step workflow failures",
  "Agent hallucination",
  "Context loss",
  "Memory issues",
  "API failures",
  "Human approval workflow bypass",
  "Agent-to-agent interaction failures",
];

/* =====================================================
   FAQ DATA
===================================================== */

const faqs = [
  {
    question: "What is AI testing?",
    answer:
      "AI testing is the process of validating the quality, reliability, safety and security of AI-powered applications. It goes beyond traditional functional testing by evaluating model responses, hallucinations, grounding, prompt handling, retrieval quality, tool execution and unpredictable AI behaviour.",
  },
  {
    question: "How is AI testing different from traditional software testing?",
    answer:
      "Traditional software testing typically compares predictable inputs against expected outputs. AI systems can generate different answers for similar prompts, so testing also needs to measure relevance, consistency, grounding, safety and contextual accuracy.",
  },
  {
    question: "What is LLM testing?",
    answer:
      "LLM testing evaluates how a large language model responds to instructions and real-world user queries. Testing can include factual accuracy, instruction following, response relevance, hallucination detection, safety behaviour, consistency and adversarial prompt handling.",
  },
  {
    question: "How do you test a RAG application?",
    answer:
      "RAG testing covers both retrieval and generation. We evaluate whether the system retrieves the correct source content, whether the context is relevant, whether responses are grounded in that context and whether restricted or irrelevant information is exposed.",
  },
  {
    question: "How do you test AI agents?",
    answer:
      "AI agent testing evaluates the complete action loop: goal understanding, planning, reasoning, tool selection, execution, observation and recovery. It also validates permissions, external API calls, memory behaviour and human approval controls.",
  },
  {
    question: "Can AI testing be automated?",
    answer:
      "Yes. AI evaluations, regression tests, API tests, UI tests, security checks and workflow validations can be integrated into automated pipelines so teams can validate AI behaviour whenever models, prompts, code or knowledge sources change.",
  },
];

/* =====================================================
   MAIN COMPONENT
===================================================== */

export default function SecurityTestingSections() {
  const heroRef = useRef<HTMLElement>(null);
  const securityRef = useRef<HTMLElement>(null);
  const agentRef = useRef<HTMLElement>(null);
  const faqRef = useRef<HTMLElement>(null);

  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* ==========================
         HERO
      ========================== */

      const heroTimeline = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      heroTimeline
        .from(".hero-eyebrow", {
          opacity: 0,
          y: 20,
          duration: 0.6,
        })
        .from(
          ".hero-title-line",
          {
            opacity: 0,
            y: 60,
            rotateX: -10,
            stagger: 0.1,
            duration: 0.9,
          },
          "-=0.3"
        )
        .from(
          ".hero-description",
          {
            opacity: 0,
            y: 25,
            duration: 0.6,
          },
          "-=0.4"
        )
        .from(
          ".hero-actions",
          {
            opacity: 0,
            y: 20,
            duration: 0.6,
          },
          "-=0.35"
        )
        .from(
          ".ai-node",
          {
            opacity: 0,
            scale: 0.75,
            y: 30,
            stagger: 0.1,
            duration: 0.7,
          },
          "-=0.5"
        );

      gsap.to(".hero-orb-one", {
        x: 50,
        y: -30,
        duration: 7,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(".hero-orb-two", {
        x: -40,
        y: 35,
        duration: 9,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(".ai-core", {
        boxShadow:
          "0 0 45px rgba(0,180,255,.45), 0 0 100px rgba(88,80,255,.2)",
        duration: 1.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      /* ==========================
         SECURITY
      ========================== */

      gsap.from(".security-heading", {
        scrollTrigger: {
          trigger: securityRef.current,
          start: "top 75%",
        },
        opacity: 0,
        y: 45,
        duration: 0.8,
        ease: "power3.out",
      });

      gsap.from(".security-item", {
        scrollTrigger: {
          trigger: ".security-grid",
          start: "top 78%",
        },
        opacity: 0,
        x: (index) => (index < 5 ? -35 : 35),
        stagger: 0.08,
        duration: 0.65,
        ease: "power3.out",
      });

      gsap.from(".security-core", {
        scrollTrigger: {
          trigger: ".security-grid",
          start: "top 75%",
        },
        scale: 0.65,
        opacity: 0,
        rotate: -7,
        duration: 0.95,
        ease: "back.out(1.5)",
      });

      gsap.to(".security-ring", {
        rotate: 360,
        duration: 24,
        repeat: -1,
        ease: "none",
      });

      /* ==========================
         AGENT
      ========================== */

      gsap.from(".agent-step", {
        scrollTrigger: {
          trigger: ".agent-flow",
          start: "top 78%",
        },
        opacity: 0,
        y: 35,
        scale: 0.9,
        stagger: 0.11,
        duration: 0.65,
        ease: "power3.out",
      });

      gsap.from(".agent-scenario", {
        scrollTrigger: {
          trigger: ".agent-scenarios",
          start: "top 80%",
        },
        opacity: 0,
        x: 30,
        stagger: 0.07,
        duration: 0.5,
      });

      gsap.to(".agent-bot", {
        y: -12,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      /* ==========================
         FAQ CTA
      ========================== */

      gsap.from(".faq-item", {
        scrollTrigger: {
          trigger: faqRef.current,
          start: "top 80%",
        },
        opacity: 0,
        y: 25,
        stagger: 0.08,
        duration: 0.55,
      });

      gsap.from(".final-cta-inner", {
        scrollTrigger: {
          trigger: ".final-cta",
          start: "top 80%",
        },
        opacity: 0,
        y: 50,
        scale: 0.96,
        duration: 0.9,
        ease: "power3.out",
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* =====================================================
          01 HERO
      ====================================================== */}

      <section ref={heroRef} className="ai-hero-section">
        <div className="hero-orb hero-orb-one" />
        <div className="hero-orb hero-orb-two" />

        <div className="ai-container hero-grid">
          <div className="hero-copy">
            <div className="hero-eyebrow">
              <span className="eyebrow-dot" />
              AI TESTING SERVICES
            </div>

            <h1 className="hero-title">
              <span className="hero-title-line">AI Testing Services</span>
              <span className="hero-title-line">for Enterprise</span>
              <span className="hero-title-line hero-gradient-text">
                AI Applications
              </span>
            </h1>

            <p className="hero-description">
              Build, validate, secure and continuously test intelligent
              applications with specialists experienced in LLMs, RAG, AI
              agents, generative AI, automation and enterprise AI platforms.
            </p>

            <div className="hero-actions">
              <Link href="/contact" className="ai-primary-button">
                Talk to Our AI Testing Team
                <ArrowRight size={18} />
              </Link>

              <a href="#ai-security" className="ai-secondary-button">
                Explore Capabilities
              </a>
            </div>

            <div className="hero-trust-row">
              {[
                "LLM Testing",
                "RAG Testing",
                "AI Agents",
                "AI Security",
                "Test Automation",
              ].map((item) => (
                <span key={item}>
                  <CheckCircle2 size={14} />
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-grid-lines" />

            <div className="ai-architecture">
              <div className="top-ai-nodes">
                {heroTopCards.map(({ title, subtitle, icon: Icon }) => (
                  <div className="ai-node ai-node-small" key={title}>
                    <div className="ai-icon-box">
                      <Icon size={23} />
                    </div>

                    <strong>{title}</strong>
                    <span>{subtitle}</span>
                  </div>
                ))}
              </div>

              <div className="connection connection-top" />

              <div className="ai-core">
                <Sparkles size={23} />

                <span>AI TESTING</span>

                <small>Validate • Secure • Automate</small>
              </div>

              <div className="connection connection-bottom" />

              <div className="bottom-ai-nodes">
                {heroBottomCards.map(({ title, icon: Icon }) => (
                  <div className="ai-node result-node" key={title}>
                    <Icon size={21} />
                    <span>{title}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="hero-floating-status hero-status-one">
              <Activity size={16} />
              Continuous Validation
            </div>

            <div className="hero-floating-status hero-status-two">
              <ShieldCheck size={16} />
              Security Verified
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          05 SECURITY
      ====================================================== */}

      <section
        ref={securityRef}
        id="ai-security"
        className="ai-security-section"
      >
        <div className="security-background-grid" />

        <div className="security-glow security-glow-one" />
        <div className="security-glow security-glow-two" />

        <div className="ai-container">
          <div className="security-heading">
            <span className="section-number">05</span>

            <div>
              <div className="section-eyebrow">AI SECURITY TESTING</div>

              <h2>
                Security Testing for
                <br />
                <span>AI-Powered Applications</span>
              </h2>

              <p>
                AI introduces attack surfaces that traditional security testing
                may not detect. We validate prompts, models, retrieval systems,
                tools, permissions and AI-generated outputs.
              </p>
            </div>
          </div>

          <div className="security-grid">
            <div className="security-list">
              {securityLeft.map(({ text, icon: Icon }) => (
                <div className="security-item" key={text}>
                  <span className="security-item-icon danger">
                    <Icon size={16} />
                  </span>

                  {text}
                </div>
              ))}
            </div>

            <div className="security-center">
              <div className="security-ring">
                <span />
                <span />
                <span />
                <span />
              </div>

              <div className="security-core">
                <div className="security-shield">
                  <ShieldCheck size={58} />
                </div>

                <strong>AI</strong>
                <span>Security Validation</span>
              </div>

              <div className="security-flow-label left-label">
                Malicious
                <br />
                Input
              </div>

              <div className="security-flow-label right-label">
                Safe
                <br />
                Response
              </div>
            </div>

            <div className="security-list">
              {securityRight.map(({ text, icon: Icon }) => (
                <div className="security-item" key={text}>
                  <span className="security-item-icon safe">
                    <Icon size={16} />
                  </span>

                  {text}
                </div>
              ))}
            </div>
          </div>

          <div className="security-footer">
            <Link href="/services/security-testing-services" className="ai-primary-button">
              Secure Your AI Application
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* =====================================================
          07 AGENTIC AI
      ====================================================== */}

      <section ref={agentRef} className="agentic-section">
        <div className="ai-container">
          <div className="agent-heading">
            <div>
              <div className="section-eyebrow dark-text">
                07 / AGENTIC AI TESTING
              </div>

              <h2>
                Test AI Agents Before
                <br />
                <span>They Take Real-World Actions</span>
              </h2>

              <p>
                Validate reasoning, tool usage, multi-step execution, memory,
                approvals and recovery paths before autonomous agents interact
                with production systems.
              </p>
            </div>
          </div>

          <div className="agent-layout">
            <div className="agent-flow-card">
              <div className="agent-ambient" />

              <div className="agent-bot">
                <div className="bot-head">
                  <Bot size={46} />
                </div>

                <div className="bot-label">AI AGENT</div>
              </div>

              <div className="agent-flow">
                {agentSteps.map((step, index) => (
                  <div className="agent-flow-row" key={step}>
                    <div className="agent-step">
                      <span>{String(index + 1).padStart(2, "0")}</span>

                      {step}
                    </div>

                    {index !== agentSteps.length - 1 && (
                      <div className="agent-line">
                        <span />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="agent-tool-cloud tool-one">
                <Code2 size={18} />
              </div>

              <div className="agent-tool-cloud tool-two">
                <Database size={18} />
              </div>

              <div className="agent-tool-cloud tool-three">
                <Workflow size={18} />
              </div>
            </div>

            <div className="agent-scenarios">
              <div className="scenario-top">
                <span>
                  <ShieldCheck size={17} />
                  AGENT VALIDATION
                </span>

                <h3>Agent Testing Scenarios</h3>

                <p>
                  Test the failure paths that matter before agents are allowed
                  to take enterprise actions.
                </p>
              </div>

              <div className="scenario-list">
                {agentScenarios.map((scenario, index) => (
                  <div className="agent-scenario" key={scenario}>
                    <span className="scenario-number">{index + 1}</span>

                    <span>{scenario}</span>

                    <CheckCircle2 size={17} />
                  </div>
                ))}
              </div>

              <div className="agent-recovery-box">
                <RotateCcw size={23} />

                <div>
                  <strong>Failure Recovery Validation</strong>

                  <p>
                    Verify fallback behaviour, retry rules, human escalation and
                    safe termination.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          13 FAQ
      ====================================================== */}

      <section ref={faqRef} className="faq-section">
        <div className="ai-container">
          <div className="faq-layout">
            <div className="faq-heading">
              <div className="section-eyebrow dark-text">
                13 / FREQUENTLY ASKED QUESTIONS
              </div>

              <h2>
                Questions About
                <span> AI Testing?</span>
              </h2>

              <p>
                Understand how modern AI applications are validated across
                models, data, workflows, agents and enterprise integrations.
              </p>

              <div className="faq-decoration">
                <BrainCircuit size={54} />

                <div>
                  <strong>AI Quality Engineering</strong>
                  <span>Quality • Security • Reliability</span>
                </div>
              </div>
            </div>

            <div className="faq-list">
              {faqs.map((faq, index) => {
                const active = openFaq === index;

                return (
                  <div
                    key={faq.question}
                    className={`faq-item ${active ? "faq-active" : ""}`}
                  >
                    <button
                      type="button"
                      aria-expanded={active}
                      onClick={() => setOpenFaq(active ? null : index)}
                    >
                      <span>{faq.question}</span>

                      <ChevronDown
                        size={20}
                        className={active ? "faq-chevron-active" : ""}
                      />
                    </button>

                    <div className={`faq-answer ${active ? "open" : ""}`}>
                      <div>
                        <p>{faq.answer}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          FINAL CTA
      ====================================================== */}

      <section className="final-cta">
        <div className="final-cta-grid" />

        <div className="cta-glow cta-glow-one" />
        <div className="cta-glow cta-glow-two" />

        <div className="ai-container">
          <div className="final-cta-inner">
            <div className="cta-copy">
              <div className="section-eyebrow">BUILD • VALIDATE • SECURE</div>

              <h2>
                Build AI Applications
                <br />
                <span>You Can Trust.</span>
              </h2>

              <p>
                From LLMs and RAG applications to autonomous AI agents, Softree
                helps engineering teams test quality, security and reliability
                before production and throughout the AI lifecycle.
              </p>

              <Link href="/contact" className="cta-button">
                Talk to Our AI Testing Team
                <ArrowRight size={19} />
              </Link>
            </div>

            <div className="cta-visual">
              <div className="cta-core">
                <BrainCircuit size={44} />

                <strong>TRUSTED AI</strong>

                <small>Enterprise Quality Gate</small>
              </div>

              <div className="cta-orbit orbit-one">
                <span>Build</span>
              </div>

              <div className="cta-orbit orbit-two">
                <span>Validate</span>
              </div>

              <div className="cta-orbit orbit-three">
                <span>Secure</span>
              </div>

              <div className="cta-orbit orbit-four">
                <span>Scale</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
