"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "./Reveal";
import { SectionTag } from "./SectionTag";
import styles from "../avoora.module.css";

const TESTIMONIALS = [
  {
    id: 1,
    name: "Sarah Mitchell",
    role: "Marketing Director",
    company: "Hopin",
    quote:
      "Partnering with Avoora goes beyond a typical agency—it feels like having a dedicated creative team by your side.",
  },
  {
    id: 2,
    name: "Daniel Ross",
    role: "Startup Founder",
    company: "Upvest",
    quote:
      "Professional team with clear communication delivered fast helping us launch confidently with website built for agency growth.",
  },
  {
    id: 3,
    name: "Emily Zhang",
    role: "Product Manager",
    company: "TechFlow",
    quote:
      "The attention to detail and creative solutions provided exceeded our expectations. Highly recommend their services.",
  },
];

function Star() {
  return (
    <svg width="22" height="21" viewBox="0 0 22 21" fill="none">
      <path
        d="M10.5944 0.222889C10.7412 -0.0744096 11.1651 -0.0744102 11.3118 0.222888L14.3868 6.45341C14.445 6.57147 14.5577 6.6533 14.6879 6.67223L21.5637 7.67134C21.8918 7.71902 22.0228 8.12221 21.7854 8.35362L16.8101 13.2034C16.7158 13.2953 16.6728 13.4277 16.695 13.5575L17.8695 20.4055C17.9256 20.7322 17.5826 20.9814 17.2892 20.8271L11.1393 17.594C11.0227 17.5327 10.8835 17.5327 10.767 17.594L4.61709 20.8271C4.32364 20.9814 3.98067 20.7322 4.03671 20.4055L5.21124 13.5575C5.23349 13.4277 5.19047 13.2953 5.0962 13.2034L0.120828 8.35362C-0.116579 8.12221 0.0144242 7.71902 0.342512 7.67134L7.21831 6.67223C7.34859 6.6533 7.46122 6.57147 7.51948 6.45341L10.5944 0.222889Z"
        fill="#FF5911"
      />
    </svg>
  );
}

export function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const current = TESTIMONIALS[active];

  return (
    <section className={`${styles.section} ${styles.sectionDark}`}>
      <div className={styles.container}>
        <Reveal>
          <div className={styles.sectionHeader}>
            <h2 className={styles.heading} style={{ color: "white" }}>
              Client Stories
            </h2>
            <div className={styles.headingDivider} />
            <SectionTag>Testimonial</SectionTag>
          </div>
        </Reveal>

        <div className={styles.testimonialGrid}>
          {/* Left: Location + tabs */}
          <Reveal delay={0.1}>
            <div className={styles.testimonialLeft}>
              <div className={styles.locationBadge}>
                <span className={styles.pingDot} />
                <span className={styles.locationText}>{current.company}</span>
              </div>

              <div className={styles.testimonialTabs}>
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    aria-label={`Show testimonial ${i + 1}`}
                    onClick={() => setActive(i)}
                    data-active={i === active}
                    className={styles.testimonialTab}
                    style={{
                      width: i === active ? "48px" : "24px",
                      background: i === active ? "#FF5812" : "rgba(255,255,255,0.2)",
                    }}
                  />
                ))}
              </div>
            </div>
          </Reveal>

          {/* Right: Card */}
          <Reveal delay={0.2}>
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
                className={styles.testimonialCard}
              >
                <div className={styles.testimonialStars}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} />
                  ))}
                </div>

                <blockquote className={styles.testimonialQuote}>
                  &ldquo;{current.quote}&rdquo;
                </blockquote>

                <div className={styles.testimonialAuthor}>
                  <div className={styles.testimonialAuthorMain}>
                    <div className={styles.testimonialAvatar} />
                    <div>
                      <p className={styles.testimonialName}>{current.name}</p>
                      <p className={styles.testimonialRole}>{current.role}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
