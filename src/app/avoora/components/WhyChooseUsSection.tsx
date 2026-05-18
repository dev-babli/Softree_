"use client";

import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import styles from "../avoora.module.css";

// Exact easing from Webflow: cubic-bezier(0.23, 1, 0.32, 1)
const EASE = [0.23, 1, 0.32, 1] as const;

// Why Choose Us cards data
const BASE_CARDS = [
  {
    title: "Modern Stack",
    img: "https://cdn.prod.website-files.com/69a0a45220c8336fe957ccba/69b57837583a0bfd6320f1ac_About%202%20Logo%201.webp",
    sub: "Future-ready websites",
  },
  {
    title: "Craft Design",
    img: "https://cdn.prod.website-files.com/69a0a45220c8336fe957ccba/69b57b34b4c1372c1e17aa77_About%202%20Craft.webp",
    sub: "Pixel-perfect UI/UX",
  },
  {
    title: "Live Progress",
    img: "https://cdn.prod.website-files.com/69a0a45220c8336fe957ccba/69b2d32f1745c9af57365aec_About%20Mockup%2004.webp",
    sub: "Real-time visibility",
  },
  {
    title: "Built To Scale",
    img: "https://cdn.prod.website-files.com/69a0a45220c8336fe957ccba/69b2e06705826279da0e3c2a_Scale%20Image.webp",
    sub: "Adapts as you grow",
  },
  {
    title: "Trusted Teams",
    img: "https://cdn.prod.website-files.com/69a0a45220c8336fe957ccba/69b2e22d5d6d90896fd5fe14_About%20Logo%2002.webp",
    sub: "40+ companies trust us",
  },
  {
    title: "Measurable Impact",
    img: "https://cdn.prod.website-files.com/69a0a45220c8336fe957ccba/69b2e22de0df25408332b9fa_About%20Logo%2001.webp",
    sub: "Better results post-launch",
  },
];

// Duplicate for seamless rotation
const CARDS = [...BASE_CARDS, ...BASE_CARDS, ...BASE_CARDS];

/* Responsive dimension presets */
const DIMS = {
  sm: { radius: 900, cardWidth: 240, cardHeight: 168, containerH: 400, top: 110, imgH: 126 },
  md: { radius: 1200, cardWidth: 320, cardHeight: 224, containerH: 520, top: 145, imgH: 168 },
  lg: { radius: 1500, cardWidth: 400, cardHeight: 280, containerH: 640, top: 180, imgH: 210 },
} as const;
type Bp = keyof typeof DIMS;

// Reveal wrapper matching Webflow's scroll-into-view animation
function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay, ease: EASE }}
      className={className}
      style={{ willChange: "transform, opacity" }}
    >
      {children}
    </motion.div>
  );
}

// Section Tag with brand circle
function SectionTag({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.sectionTag}>
      <span className={styles.brandCircle} />
      <span className={styles.sectionTagText}>{children}</span>
    </div>
  );
}

// Section Header Component
function SectionHeader({
  title,
  tag,
}: {
  title: string;
  tag: string;
}) {
  return (
    <div className={styles.sectionHeaderWrapper}>
      <Reveal>
        <h2 className={styles.heading2InnerPage}>{title}</h2>
      </Reveal>
      <Reveal delay={0.1}>
        <div className={styles.sectionHeaderDividerWrapper}>
          <div className={styles.sectionHeaderDivider} />
        </div>
      </Reveal>
      <Reveal delay={0.2}>
        <SectionTag>{tag}</SectionTag>
      </Reveal>
    </div>
  );
}

// Rotating Radial Carousel
function RotatingCarousel({ active }: { active: boolean }) {
  const [bp, setBp] = useState<Bp>("lg");
  const rotateControls = useAnimation();
  const [rotationStarted, setRotationStarted] = useState(false);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 640) setBp("sm");
      else if (w < 1024) setBp("md");
      else setBp("lg");
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const { radius, cardWidth, cardHeight, containerH, top, imgH } = DIMS[bp];
  const diameter = radius * 2;

  /* Timing */
  const CARD_STAGGER = 0.04;
  const CARD_DURATION = 0.45;
  const TOTAL_STAGGER_TIME = (CARDS.length / 3) * CARD_STAGGER;
  const ROTATION_START_DELAY = TOTAL_STAGGER_TIME + CARD_DURATION * 0.6;

  useEffect(() => {
    let cancelled = false;

    if (!active) {
      rotateControls.stop();
      rotateControls.set({ rotate: 0 });
      const reset = setTimeout(() => {
        if (!cancelled) setRotationStarted(false);
      }, 0);
      return () => {
        cancelled = true;
        clearTimeout(reset);
      };
    }

    const t = setTimeout(() => {
      if (cancelled) return;
      setRotationStarted(true);
      rotateControls.start({
        rotate: -360,
        transition: { repeat: Infinity, ease: "linear", duration: 120 },
      });
    }, ROTATION_START_DELAY * 1000);

    return () => {
      cancelled = true;
      clearTimeout(t);
    };
  }, [active, rotateControls, ROTATION_START_DELAY]);

  return (
    <div
      className="relative mt-4 flex w-full justify-center overflow-hidden pointer-events-none"
      style={{ height: `${containerH}px` }}
    >
      <motion.div
        className="pointer-events-auto absolute flex items-center justify-center rounded-full"
        animate={rotateControls}
        initial={{ rotate: 0 }}
        style={{
          top: `${top}px`,
          width: `${diameter}px`,
          height: `${diameter}px`,
          border: rotationStarted
            ? "1px dashed rgba(255,255,255,0.12)"
            : "1px dashed rgba(255,255,255,0)",
          transition: "border-color 0.6s cubic-bezier(0.23, 1, 0.32, 1)",
        }}
      >
        {CARDS.map((card, i) => {
          const angle = (i / CARDS.length) * 360;
          const staggerIdx = Math.min(i, CARDS.length - i);

          return (
            <div
              key={i}
              className="absolute left-0 top-0"
              style={{
                width: "100%",
                height: "100%",
                transform: `rotate(${angle}deg)`,
              }}
            >
              <motion.div
                className="group absolute flex origin-center flex-col justify-between overflow-hidden rounded-2xl shadow-xl cursor-pointer ring-2 ring-white/90"
                style={{
                  top: `-${cardHeight / 2}px`,
                  left: "50%",
                  x: "-50%",
                  width: `${cardWidth}px`,
                  height: `${cardHeight}px`,
                  padding: "6px",
                  transformOrigin: "center center",
                  background: "#1a1a1a",
                }}
                initial={{
                  opacity: 0,
                  scale: 0.92,
                  filter: "blur(8px)",
                }}
                animate={
                  active
                    ? {
                      opacity: 1,
                      scale: 1,
                      filter: "blur(0px)",
                    }
                    : {
                      opacity: 0,
                      scale: 0.92,
                      filter: "blur(8px)",
                    }
                }
                transition={{
                  duration: CARD_DURATION,
                  delay: active ? staggerIdx * CARD_STAGGER : 0,
                  ease: EASE,
                }}
                whileHover={{ scale: 1.04, transition: { duration: 0.3, ease: EASE } }}
              >
                <div
                  className="relative w-full flex-shrink-0 overflow-hidden rounded-xl"
                  style={{ height: `${imgH}px`, background: "#222" }}
                >
                  <img
                    src={card.img}
                    alt={card.title}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/10 transition-colors duration-500 group-hover:bg-transparent" />
                </div>
                <div className="flex grow items-center justify-between px-4" style={{ minHeight: "40px" }}>
                  <div>
                    <h3 className="text-[14px] font-medium tracking-wide text-white">
                      {card.title}
                    </h3>
                    <p className="text-[11px] text-white/60">{card.sub}</p>
                  </div>
                  <div className="translate-x-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </div>
                </div>
              </motion.div>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}

export function WhyChooseUsSection() {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <section id="why" className={`${styles.section} ${styles.about2}`}>
      <div className={styles.container}>
        <div className={styles.sectionWrapper}>
          <SectionHeader title="Why Choose Us" tag="AVOORA STUDIO" />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: EASE }}
            onViewportEnter={() => setIsVisible(true)}
          >
            <RotatingCarousel active={isVisible} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
