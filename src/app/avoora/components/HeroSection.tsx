"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import styles from "../avoora.module.css";

// Exact easing from Webflow: cubic-bezier(0.23, 1, 0.32, 1)
const EASE = [0.23, 1, 0.32, 1] as const;

const STATS = [
  { prefix: "$", target: 74, suffix: "M", label: "Driving growth with strategy." },
  { target: 95, suffix: "%", label: "Building trusted partnerships." },
  { prefix: "+", target: 225, suffix: "", label: "Delivering industry success." },
  { target: 92, suffix: "%", label: "Turning traffic into growth." },
];

// Animated counter that mimics the Webflow count-up animation
function Counter({
  target,
  prefix = "",
  suffix = "",
}: {
  target: number;
  prefix?: string;
  suffix?: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!inView) return;

    const duration = 2000; // 2s animation
    const startTime = performance.now();
    let rafId = 0;

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out for smooth deceleration
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(target * eased);
      setCount(current);

      if (progress < 1) {
        rafId = requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [inView, target]);

  // Split digits for individual animation
  const digits = count.toString().padStart(target.toString().length, "0").split("");

  return (
    <span ref={ref} className={styles.home1AboutNumber}>
      {prefix && <span className={styles.textDisplayLargeParagraph}>{prefix}</span>}
      {digits.map((digit, i) => (
        <motion.span
          key={i}
          className={styles.textDisplayLarge}
          initial={{ y: 20, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ delay: i * 0.05, duration: 0.4, ease: EASE }}
          style={{ display: "inline-block" }}
        >
          {digit}
        </motion.span>
      ))}
      {suffix && <span className={styles.textDisplayLargeParagraph}>{suffix}</span>}
    </span>
  );
}

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

// Primary Button with text slide animation (exact Webflow behavior)
function PrimaryButton({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} className={styles.primaryButton}>
      <div className={styles.primaryButtonTextWrapper}>
        <span className={`${styles.primaryButtonText} ${styles.isAbsolute}`}>{children}</span>
        <span className={`${styles.primaryButtonText} ${styles.isRelative}`}>{children}</span>
      </div>
      <div className={styles.primaryButtonIconWrapper}>
        <span className={`${styles.primaryButtonIcon} ${styles.isAbsolute}`}>
          <svg width="10" height="12" viewBox="0 0 10 12" fill="none">
            <path d="M9.61648 5.8006L0.360093 0.0358623C0.250469 -0.0329162 0.105835 0.000195883 0.0370565 0.109843C0.0155525 0.144118 0.00328985 0.183378 0.0014624 0.223799C-0.000365041 0.264221 0.00830504 0.304427 0.0266285 0.340503L2.85674 5.99955L0.0254568 11.6595C-0.0331514 11.7749 0.0128727 11.916 0.128261 11.9746C0.164336 11.9929 0.204543 12.0016 0.244965 11.9998C0.285387 11.998 0.324647 11.9857 0.358921 11.9642L9.61531 6.19944C9.7253 6.13127 9.75924 5.98683 9.69104 5.87681C9.67198 5.84605 9.64606 5.82013 9.61531 5.80107L9.61648 5.8006Z" fill="#FF5812" />
          </svg>
        </span>
        <span className={`${styles.primaryButtonIcon} ${styles.isRelative}`}>
          <svg width="10" height="12" viewBox="0 0 10 12" fill="none">
            <path d="M9.61648 5.8006L0.360093 0.0358623C0.250469 -0.0329162 0.105835 0.000195883 0.0370565 0.109843C0.0155525 0.144118 0.00328985 0.183378 0.0014624 0.223799C-0.000365041 0.264221 0.00830504 0.304427 0.0266285 0.340503L2.85674 5.99955L0.0254568 11.6595C-0.0331514 11.7749 0.0128727 11.916 0.128261 11.9746C0.164336 11.9929 0.204543 12.0016 0.244965 11.9998C0.285387 11.998 0.324647 11.9857 0.358921 11.9642L9.61531 6.19944C9.7253 6.13127 9.75924 5.98683 9.69104 5.87681C9.67198 5.84605 9.64606 5.82013 9.61531 5.80107L9.61648 5.8006Z" fill="#FF5812" />
          </svg>
        </span>
      </div>
    </a>
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

export function HeroSection() {
  return (
    <section id="about" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.sectionWrapper}>
          <div className={styles.about2Wrapper}>
            {/* Hero Header */}
            <div className={styles.about2HeroWrapper}>
              <div className={styles.about2HeroHeadingWrapper}>
                <Reveal>
                  <h1 className={styles.about2Hero}>Behind Avoora</h1>
                </Reveal>
              </div>

              <div className={styles.about2HeroDividerWrapper}>
                <Reveal delay={0.1}>
                  <div className={styles.about2HeroDivider} />
                </Reveal>
              </div>

              <div className={styles.about2HeroContentWrapper}>
                <Reveal delay={0.2}>
                  <SectionTag>ABOUT US</SectionTag>
                </Reveal>
                <Reveal delay={0.25}>
                  <p className={styles.innerPageSubtitleLeftAlign}>
                    Avoora blends strategic UX, modern systems, and Webflow
                    expertise for scalable experiences.
                  </p>
                </Reveal>
              </div>
            </div>

            {/* Divider */}
            <Reveal delay={0.3}>
              <div className={styles.about2Divider} />
            </Reveal>

            {/* Hero Grid */}
            <div className={styles.about2Holder}>
              <div className={styles.about2HeroGrid}>
                {/* Left: Tag + Button */}
                <div className={styles.about2ButtonWrapper}>
                  <Reveal delay={0.35}>
                    <SectionTag>ABOUT US</SectionTag>
                  </Reveal>
                  <Reveal delay={0.4}>
                    <div className={`${styles.about2ButtonHolder} ${styles.hideTablet}`}>
                      <PrimaryButton href="#contact">LET&apos;S TALK</PrimaryButton>
                    </div>
                  </Reveal>
                </div>

                {/* Right: Big Text + Video */}
                <div className={styles.about2ContentHolder}>
                  <div className={styles.about2TextWrapper}>
                    <Reveal delay={0.45}>
                      <div className={styles.about2TextHolder}>
                        <div className={styles.home1AboutBigText}>
                          Avoora combines strategy, design, and development{" "}
                          <span className={styles.home1AboutBigTextBg3}>
                            to build websites that look great, work flawlessly.
                          </span>
                        </div>
                      </div>
                    </Reveal>
                  </div>

                  <Reveal delay={0.5}>
                    <div className={styles.home2AboutVideoWrapper}>
                      <a
                        href="https://www.youtube.com/watch?v=Pp1KqU7swGg"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.home2AboutLightbox}
                        aria-label="open lightbox"
                      >
                        <img
                          src="https://cdn.prod.website-files.com/69a0a45220c8336fe957ccba/69a593a1e9f940b95bf1cdb3_Home%202%20About%20Reel.webp"
                          loading="lazy"
                          alt="Person with short curly hair and glasses looking upward against a gradient orange and pink background."
                          className={styles.home2AboutThumbnail}
                        />
                        <div className={styles.home2AboutVideoButton}>
                          <img
                            src="https://cdn.prod.website-files.com/69a0a45220c8336fe957ccba/69a5952aa164aac427312498_Video%20Button.webp"
                            loading="lazy"
                            alt="Button with text 'Watch reel' and a play icon."
                            className={styles.home2AboutVideoButtonImage}
                          />
                        </div>
                      </a>
                    </div>
                  </Reveal>
                </div>
              </div>
            </div>

            {/* Divider */}
            <Reveal delay={0.55}>
              <div className={styles.about2Divider} />
            </Reveal>

            {/* Stats Row */}
            <Reveal delay={0.6}>
              <div className={styles.home1AboutUsNumberWrapper}>
                {STATS.map((stat, index) => (
                  <div key={index} className={styles.home1AboutNumberCard}>
                    <Counter target={stat.target} prefix={stat.prefix} suffix={stat.suffix} />
                    <div className={styles.numberSubtitle}>{stat.label}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
