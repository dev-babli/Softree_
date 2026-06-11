"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/* ------------------------------------------------------------------ */
/* data                                                                */
/* ------------------------------------------------------------------ */

const FLOW_STEPS = [
  {
    step: 1,
    number: "01",
    title: "Activation, simplified",
    description: (
      <>
        One call triggers mobilization.
        <br /> Your requirements: craft, count, and start date route directly
        to our verified crews. No hand-offs. No escalations. Just boots on the
        ground in minutes.
      </>
    ),
  },
  {
    step: 2,
    number: "02",
    title: "Cleared to count",
    description: (
      <>
        Our team handles all screening and verification before dispatch.
        Compliance, background, certifications, and fitness-for-duty — we
        enforce a zero-fail model to guarantee every worker clears the gate on
        Day 1.
      </>
    ),
  },
  {
    step: 3,
    number: "03",
    title: "Proven field match",
    description: (
      <>
        We don&apos;t just provide available workers. We deploy proven crews.
        By filtering for past performance, role fit, and reliability, we
        deliver teams engineered for endurance — ensuring your project stays
        fully manned from first break to completion.
      </>
    ),
  },
  {
    step: 4,
    number: "04",
    title: "Seamless arrival",
    description: (
      <>
        We manage the &quot;last mile&quot; of mobilization. Every crew arrives
        site-ready with finalized reporting details. With real-time arrival
        monitoring and active coordination, we ensure your shift starts on
        time, even when field conditions shift.
      </>
    ),
  },
];

const FEATURES = [
  {
    icon: "/icons/features/rapid-activation.svg",
    alt: "Rapid Activation icon",
    title: "Rapid Activation",
    description:
      "We believe speed is a skill. Our platform uses machine learning to turn staffing into instant logistics, deploying a precisely matched workforce the moment demand strikes.",
  },
  {
    icon: "/icons/features/rigorous-selection.svg",
    alt: "Rigorous Selection icon",
    title: "Rigorous Selection",
    description:
      "Geography is a core metric. Our engine uses AI to find and contact qualified talent within defined radii, securing top local contractors first, filtered for cost and skill.",
  },
  {
    icon: "/icons/features/verified.svg",
    alt: "100% Verified Before Arrival icon",
    title: "100% Verified Before Arrival",
    description:
      "We use a Zero-Trust verification model with secure API integrations to run automated background checks and drug testing, blocking dispatch access until fully cleared.",
  },
  {
    icon: "/icons/features/controlled-outcomes.svg",
    alt: "Controlled Outcomes icon",
    title: "Controlled Outcomes",
    description:
      "We guarantee controlled outcomes by managing staffing's biggest variables—cost and compliance—prioritizing local mobilization and automating safety for every dispatch.",
  },
];

const FAQS = [
  {
    question: "How fast can crews be mobilized?",
    answer:
      "We move at the speed of your schedule. Our platform maintains a deep network of verified industrial craft, eliminating the weeks wasted in traditional hiring cycles. One call activates our mobilization engine to source and deploy precision-matched crews in hours, not days, ensuring your most critical paths remain fully manned.",
  },
  {
    question: "How do you handle compliance & background checks?",
    answer:
      "We use a Zero-Fail Compliance model. Before a worker is even cleared for dispatch, our system automates the verification of background checks, drug testing (FFD), and site-specific certifications including nuclear grade requirements. We block access to the gate for anyone who isn't 100% cleared, ensuring your badging office has zero headaches on Day 1.",
  },
  {
    question: "What is the coverage during outages?",
    answer:
      'We provide 24/7 active coordination to match the 24/7 nature of an outage. Our coverage spans the full range of outage craft: from general laborers and painters to specialized repairs and schedulers. More importantly, we manage the "last mile" of arrival, monitoring deployments in real-time to ensure your night and day shifts remain fully manned, even when field conditions shift.',
  },
  {
    question: "How does Vectr differ from traditional staffing vendors?",
    answer:
      "Traditional vendors are reactive; Vectr is an operational engine. While legacy agencies rely on manual resumes and 'available' warm bodies, we use intelligent workflows and expert curation to deliver field-validated precision. We don't just find people who are looking for work; we deploy proven crews that are engineered for the high-tempo grind of a critical path environment.",
  },
];

/* ------------------------------------------------------------------ */
/* helpers                                                             */
/* ------------------------------------------------------------------ */

/** Wrap each word of a string in an overflow-hidden mask for intro reveals. */
function Words({ text }: { text: string }) {
  return (
    <>
      {text.split(" ").map((word, i) => (
        <span className="vc-word" key={i}>
          <i>{word}</i>
          {i < text.split(" ").length - 1 ? "\u00A0" : null}
        </span>
      ))}
    </>
  );
}

/* ------------------------------------------------------------------ */
/* background canvas                                                   */
/* ------------------------------------------------------------------ */

function useBackgroundCanvas(canvasRef: React.RefObject<HTMLCanvasElement | null>) {
  useGSAP(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const blobs = [
      { hue: "255, 77, 0", r: 0.62, sx: 0.00021, sy: 0.00017, px: 0.78, py: 0.22, a: 0.16 },
      { hue: "255, 140, 40", r: 0.5, sx: 0.00015, sy: 0.00023, px: 0.18, py: 0.7, a: 0.1 },
      { hue: "200, 210, 200", r: 0.44, sx: 0.00011, sy: 0.00013, px: 0.55, py: 0.92, a: 0.05 },
    ];

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "#111312";
      ctx.fillRect(0, 0, w, h);

      for (const b of blobs) {
        const x = (b.px + Math.sin(t * b.sx) * 0.16) * w;
        const y = (b.py + Math.cos(t * b.sy) * 0.14) * h;
        const radius = b.r * Math.max(w, h) * 0.55;
        const g = ctx.createRadialGradient(x, y, 0, x, y, radius);
        g.addColorStop(0, `rgba(${b.hue}, ${b.a})`);
        g.addColorStop(1, `rgba(${b.hue}, 0)`);
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, w, h);
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    canvas.classList.add("is-ready");

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  });
}

/* ------------------------------------------------------------------ */
/* component                                                           */
/* ------------------------------------------------------------------ */

export function VectrHome() {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [openFaq, setOpenFaq] = useState(0);

  useBackgroundCanvas(canvasRef);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) {
        root.querySelector(".hero")?.classList.add("show");
        return;
      }

      const hero = root.querySelector<HTMLElement>(".hero");
      const heroTitle = root.querySelector<HTMLElement>(".hero__title");
      const heroSubtitle = root.querySelector<HTMLElement>(".hero__subtitle");
      const scrollBtn = root.querySelector<HTMLElement>(".hero__scroll-btn");
      const spacer = root.querySelector<HTMLElement>(".hero-spacer");

      /* ---- hero intro: masked word reveal ---- */
      hero?.classList.add("show");
      gsap.to(root.querySelectorAll(".hero__title .vc-word > i"), {
        y: 0,
        duration: 1.1,
        ease: "power4.out",
        stagger: 0.06,
        delay: 0.15,
      });
      gsap.to(root.querySelectorAll(".hero__subtitle > span"), {
        y: 0,
        opacity: 1,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.12,
        delay: 0.55,
      });
      gsap.from(scrollBtn, { opacity: 0, y: 16, duration: 0.8, delay: 1.1, ease: "power2.out" });

      /* ---- hero scroll-out: 3D fly-away over the spacer ---- */
      if (heroTitle && heroSubtitle && spacer) {
        gsap.set([heroTitle, heroSubtitle], { xPercent: -50, transformPerspective: 1000 });

        const out = gsap.timeline({
          scrollTrigger: {
            trigger: spacer,
            start: "top top",
            end: "75% top",
            scrub: 0.6,
            onLeave: () => hero?.classList.add("hide"),
            onEnterBack: () => hero?.classList.remove("hide"),
          },
        });
        out
          .to(
            heroTitle,
            { x: 222, y: -120, rotationY: -60, rotationX: -35, opacity: 0, ease: "power1.in" },
            0
          )
          .to(
            heroSubtitle,
            { x: 222, y: -200, rotationY: -60, rotationX: -35, opacity: 0, ease: "power1.in" },
            0
          )
          .to(scrollBtn, { opacity: 0, ease: "power1.in" }, 0);
      }

      /* ---- flow: per-step track fill + visited/active states ---- */
      const steps = gsap.utils.toArray<HTMLElement>(root.querySelectorAll(".flow__step"));
      steps.forEach((step) => {
        const fill = step.querySelector(".flow__track-fill");
        if (fill) {
          gsap.fromTo(
            fill,
            { scaleY: 0 },
            {
              scaleY: 1,
              ease: "none",
              scrollTrigger: {
                trigger: step,
                start: "top 78%",
                end: "bottom 55%",
                scrub: true,
              },
            }
          );
        }
        ScrollTrigger.create({
          trigger: step,
          start: "top 78%",
          onEnter: () => {
            step.classList.add("flow__step--visited", "flow__step--active");
            steps.forEach((s) => s !== step && s.classList.remove("flow__step--active"));
          },
          onLeaveBack: () => {
            step.classList.remove("flow__step--visited", "flow__step--active");
            const prev = steps[steps.indexOf(step) - 1];
            prev?.classList.add("flow__step--active");
          },
        });
      });

      /* ---- features: scrubbed stagger while headline is pinned ---- */
      const featureCards = root.querySelectorAll(".feature-item__content");
      gsap.set(featureCards, { y: 120, opacity: 0 });
      gsap.to(featureCards, {
        y: 0,
        opacity: 1,
        stagger: 0.18,
        ease: "power2.out",
        scrollTrigger: {
          trigger: root.querySelector(".features"),
          start: "top 60%",
          end: "60% bottom",
          scrub: 0.5,
        },
      });

      /* ---- standards: line-by-line title reveal ---- */
      gsap.from(root.querySelectorAll(".standards__title span"), {
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: root.querySelector(".standards"), start: "top 65%" },
      });

      /* ---- cta reveal ---- */
      gsap.from(root.querySelectorAll(".cta-section__title span"), {
        y: 44,
        opacity: 0,
        stagger: 0.12,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: root.querySelector(".cta-section"), start: "top 70%" },
      });
    },
    { scope: rootRef }
  );

  const scrollToFlow = () => {
    rootRef.current
      ?.querySelector(".flow")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div ref={rootRef} className="vectr-root" data-taxi-view="home">
      <div className="top">
        {/* ============ HERO ============ */}
        <section className="hero">
          <div className="hero__content">
            <h1 className="hero__title">
              <span>
                <Words text="The New Standard" />
              </span>
              <span>
                <Words text="in Staffing" />
              </span>
            </h1>
            <p className="hero__subtitle">
              <span>
                AI driven speed. Expert curation.
                <br className="sp" />
              </span>
              <span>
                We mobilize verified crews to protect your schedule and your bottom line in
                high-consequence environments.
              </span>
            </p>
          </div>
          <div className="hero__scroll-btn" onClick={scrollToFlow} role="button" tabIndex={0}>
            <span>
              <span className="hsbtn-in">scroll to discover our process</span>
            </span>
          </div>
        </section>
        <div className="hero-spacer" />

        {/* ============ FLOW ============ */}
        <section className="flow">
          <div className="flow__wrapper">
            <div className="flow__steps">
              {FLOW_STEPS.map((item) => (
                <div className="flow__step" data-step={item.step} key={item.step}>
                  <div className="flow__header">
                    <div className="flow__number">
                      <span>{item.number}</span>
                    </div>
                    <h3 className="flow__title">{item.title}</h3>
                  </div>
                  <div className="flow__body">
                    <div className="flow__body-inner">
                      <div className="flow__track">
                        <div className="flow__track-bar">
                          <div className="flow__track-fill" />
                        </div>
                      </div>
                      <p className="flow__description">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============ FEATURES ============ */}
        <section className="features">
          <div className="features__sticky">
            <h2 className="features__title">
              Designed for today&apos;s operations,
              <br className="pc" /> beyond legacy staffing workflows.
            </h2>
            <div className="features__grid">
              {FEATURES.map((feature) => (
                <article className="feature-item" key={feature.title}>
                  <div className="feature-item__content">
                    <div className="feature-item__icon">
                      <img
                        src={feature.icon}
                        alt={feature.alt}
                        loading="lazy"
                        decoding="async"
                        width={96}
                        height={96}
                      />
                    </div>
                    <div className="feature-item__text">
                      <h3 className="feature-item__title">{feature.title}</h3>
                      <p className="feature-item__description">{feature.description}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ============ STANDARDS ============ */}
        <section className="standards">
          <div className="standards__container">
            <div className="standards__image">
              <picture>
                <img
                  src="/showcase/vectr/apply-door.svg"
                  alt="Workers in safety vests coordinating at industrial site"
                  loading="lazy"
                  decoding="async"
                  width={800}
                  height={400}
                />
              </picture>
            </div>
            <div className="standards__content">
              <h2 className="standards__title">
                <span>Nuclear-grade </span>
                <span>standards across </span>
                <span>every site.</span>
              </h2>
              <p className="standards__description">
                Modeled on nuclear-grade environments, our process enforces badge compliance,
                protected timelines and zero-error tolerance.
              </p>
              <div className="flx">
                <a href="#industries" className="pill-btn pill-btn--dark">
                  <span className="pill-btn-span">Explore our industries</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ============ FAQ ============ */}
        <section className="faq">
          <div className="faq__container">
            <div className="faq__left">
              <h2 className="faq__title">How we work and how we deliver industrial-grade staffing.</h2>
            </div>
            <div className="faq_split_bar" />
            <div className="faq__right">
              {FAQS.map((faq, i) => {
                const isOpen = openFaq === i;
                return (
                  <div className={`faq-item ${isOpen ? "faq-item--open" : ""}`} key={faq.question}>
                    <button
                      className="faq-item__header"
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setOpenFaq(isOpen ? -1 : i)}
                    >
                      <span className="faq-item__question">{faq.question}</span>
                      <span className="faq-item__icon">
                        <img src="/icons/chevron-down.svg" alt="" loading="lazy" decoding="async" />
                      </span>
                    </button>
                    <div
                      className="faq-item__content"
                      style={isOpen ? { maxHeight: "320px" } : undefined}
                    >
                      <p className="faq-item__answer">{faq.answer}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ============ CTA ============ */}
        <section className="cta-section">
          <h2 className="cta-section__title">
            <span>Staff your outage with fast response, </span>
            <span>and crews you can rely on.</span>
          </h2>
          <div className="flx">
            <a href="#request-crew" className="pill-btn pill-btn--light">
              <span className="pill-btn-span">Request Crews</span>
            </a>
          </div>
        </section>
      </div>

      {/* fixed background canvas */}
      <div id="app">
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
}
