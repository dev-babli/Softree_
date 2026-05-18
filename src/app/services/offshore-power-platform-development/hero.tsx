"use client";

import { useState, useEffect, useRef, useCallback, CSSProperties } from "react";
import Link from "next/link";
interface Testimonial {
  text: string;
  name: string;
  role: string;
  location: string;
  company: string;
}

interface ArrowRightProps {
  stroke?: string;
}

interface TestimonialSlideProps {
  testimonial: Testimonial;
}

const testimonials: Testimonial[] = [
  {
    text: "SOFTREE staff worked with us to learn our installation automation technology and built exactly what we needed.",
    name: "Darrell Trimble",
    role: "CEO",
    location: "California",
    company: "SP Marketplace",
  },
  {
    text: "We had a very positive experience working with Softree Technology. The developers were responsive and delivery was on time. We appreciate the attention they gave our project and their great communication. The final product was exactly what we wanted and we look forward to working with Softree in the future.",
    name: "Natasha Adams",
    role: "Partner",
    location: "Virginia",
    company: "Wicked Point LLC",
  },
  {
    text: "Overall, we are satisfied with our collaboration in the past and your last action and response to our reported issue, really makes a difference.",
    name: "Arkady Fedorovtsjev",
    role: "IT Specialist",
    location: "Nederlands",
    company: "ECG International",
  },
];

const INTERVAL = 4000;
const PROGRESS_STEP = 50;

function initials(name: string): string {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function PinIcon() {
  return (
    <svg
      width="11"
      height="11"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M8 1C5.24 1 3 3.24 3 6c0 4 5 9 5 9s5-5 5-9c0-2.76-2.24-5-5-5zm0 6.75a1.75 1.75 0 110-3.5 1.75 1.75 0 010 3.5z"
        fill="#7dd3fc"
      />
    </svg>
  );
}

function ArrowRight({ stroke = "#071b4d" }: ArrowRightProps) {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3 8h10M9 4l4 4-4 4"
        stroke={stroke}
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronLeft() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M10 4L6 8l4 4"
        stroke="white"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M6 4l4 4-4 4"
        stroke="white"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function TestimonialSlide({ testimonial }: TestimonialSlideProps) {
  return (
    <div style={styles.slide}>
      <div style={styles.slideTopLine} />
      <span style={styles.quoteMark}>&ldquo;</span>

      <p style={styles.quoteText}>{testimonial.text}</p>

      <div style={styles.authorRow}>
        <div style={styles.avatar}>{initials(testimonial.name)}</div>

        <div>
          <div style={styles.authorName}>{testimonial.name}</div>

          {/* ✅ UPDATED */}
          <div style={styles.authorRole}>
            {testimonial.role} • {testimonial.company}
          </div>

          <div style={styles.authorLoc}>
            <PinIcon />
            {testimonial.location}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HeroPowerApps() {
  const [idx, setIdx] = useState<number>(0);
  const [elapsed, setElapsed] = useState<number>(0);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback((i: number): void => {
    setIdx(i);
    setElapsed(0);
  }, []);

  useEffect(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (progressRef.current) clearInterval(progressRef.current);

    progressRef.current = setInterval(() => {
      setElapsed((e) => e + PROGRESS_STEP);
    }, PROGRESS_STEP);

    timerRef.current = setInterval(() => {
      setIdx((prev) => (prev + 1) % testimonials.length);
      setElapsed(0);
    }, INTERVAL);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
    };
  }, [idx]);

  const handlePrev = (): void =>
    goTo((idx - 1 + testimonials.length) % testimonials.length);
  const handleNext = (): void => goTo((idx + 1) % testimonials.length);

  const progressWidth: number = Math.min((elapsed / INTERVAL) * 100, 100);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700&family=DM+Sans:wght@400;500&display=swap');
        .cta-btn:hover { background: #7dd3fc !important; transform: translateY(-2px); box-shadow: 0 12px 40px rgba(56,189,248,0.45) !important; }
        .cta-btn:hover .cta-arrow { transform: translateX(3px); }
        .cta-arrow { transition: transform 0.2s; }
        .nav-btn:hover { background: rgba(56,189,248,0.2) !important; border-color: rgba(56,189,248,0.4) !important; transform: scale(1.08); }
        @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.5;transform:scale(.7)} }
        .eyebrow-dot { animation: pulse 2s ease-in-out infinite; }

        @media (max-width: 991px) {
          .hero-inner {
            flex-direction: column !important;
            padding: 100px 24px 60px !important;
            gap: 40px !important;
          }
          .hero-left {
            padding-right: 0 !important;
            border-right: none !important;
            width: 100% !important;
          }
          .hero-right {
            padding-left: 0 !important;
            width: 100% !important;
          }
          .hero-slider-viewport {
            width: 100% !important;
          }
        }
      `}</style>

      <section style={styles.hero} role="banner">
        <div style={styles.noise} />
        <div style={styles.gridLines} />
        <div style={styles.orb1} />
        <div style={styles.orb2} />

        <div style={styles.inner} className="hero-inner">
          {/* LEFT */}
          <div style={styles.left} className="hero-left">
            <div style={styles.eyebrow}>
              <div className="eyebrow-dot" style={styles.eyebrowDot} />
              Microsoft Power Platform
            </div>

            <h1 style={styles.headline}>
              Enterprise Power Apps
              <br />
              <span style={styles.headlineGradient}>Development Services</span>
            </h1>

            <p style={styles.subtext}>
              Build scalable Microsoft Power Apps solutions to automate
              workflows, streamline business operations, integrate Microsoft
              365, and improve enterprise productivity with modern low-code
              development.
            </p>

            <Link href="/contact" className="cta-btn" style={styles.ctaBtn}>
              Talk to a Power Apps Expert
              <span className="cta-arrow">
                <ArrowRight stroke="#071b4d" />
              </span>
            </Link>

            <div style={styles.stats}>
              <div>
                <div style={styles.statNum}>150+</div>
                <div style={styles.statLbl}>Enterprise clients</div>
              </div>
              <div>
                <div style={styles.statNum}>98%</div>
                <div style={styles.statLbl}>Satisfaction rate</div>
              </div>
              <div>
                <div style={styles.statNum}>12yr</div>
                <div style={styles.statLbl}>Platform expertise</div>
              </div>
            </div>
          </div>

          <div style={styles.right} className="hero-right">
            <div style={styles.sliderViewport} className="hero-slider-viewport">
              {testimonials.map((t, i) => (
                <div
                  key={i}
                  style={{
                    position: "absolute",
                    width: "100%",
                    opacity: i === idx ? 1 : 0,
                    transition: "opacity 0.6s ease-in-out",
                  }}
                >
                  <TestimonialSlide testimonial={t} />
                </div>
              ))}
            </div>
          </div>
        </div>

        <svg
          style={styles.wave}
          viewBox="0 0 1440 90"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M0,50 C320,90 700,10 1080,55 C1260,75 1380,50 1440,40 L1440,90 L0,90 Z"
            fill="#FAFAFA"
          />
        </svg>
      </section>
    </>
  );
}

const styles: Record<string, CSSProperties> = {
  hero: {
    position: "relative",
    overflow: "hidden",
    background: "#071b4d",
    color: "white",
    fontFamily: "'DM Sans', sans-serif",
    minHeight: "580px",
  },
  noise: {
    position: "absolute",
    inset: 0,
    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`,
    opacity: 0.5,
    pointerEvents: "none",
    zIndex: 0,
  },
  orb1: {
    position: "absolute",
    top: "-100px",
    left: "-120px",
    width: "480px",
    height: "480px",
    background:
      "radial-gradient(circle, rgba(56,189,248,0.18) 0%, transparent 70%)",
    pointerEvents: "none",
    zIndex: 0,
  },
  orb2: {
    position: "absolute",
    bottom: "-60px",
    right: "-80px",
    width: "420px",
    height: "420px",
    background:
      "radial-gradient(circle, rgba(99,102,241,0.16) 0%, transparent 70%)",
    pointerEvents: "none",
    zIndex: 0,
  },
  gridLines: {
    position: "absolute",
    inset: 0,
    backgroundImage:
      "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
    backgroundSize: "60px 60px",
    pointerEvents: "none",
    zIndex: 0,
  },
  inner: {
    position: "relative",
    zIndex: 1,
    maxWidth: "1100px",
    margin: "0 auto",
    padding: "72px 48px 100px",
    display: "flex",
    alignItems: "center",
    gap: 0,
  },
  left: {
    flex: 1,
    paddingRight: "56px",
    borderRight: "1px solid rgba(255,255,255,0.08)",
  },
  right: {
    flex: 1,
    paddingLeft: "56px",
    display: "flex",
    flexDirection: "column",
  },
  eyebrow: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    background: "rgba(56,189,248,0.12)",
    border: "1px solid rgba(56,189,248,0.25)",
    color: "#7dd3fc",
    fontSize: "12px",
    fontWeight: 500,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    padding: "5px 12px",
    borderRadius: "100px",

    marginTop: "22px",
  },
  eyebrowDot: {
    width: "6px",
    height: "6px",
    borderRadius: "50%",
    background: "#38bdf8",
  },
  headline: {
  fontFamily: "'Syne', sans-serif",
  fontSize: "clamp(18px, 3vw, 42px)",
  fontWeight: 700,
  lineHeight: 1.05,
  letterSpacing: "-0.02em",
  marginBottom: "4px",
  color: "#f0f6ff",
  wordBreak: "keep-all",
},
  headlineGradient: {
    background: "linear-gradient(135deg, #38bdf8 0%, #818cf8 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  },
  subtext: {
    color: "rgba(200,220,255,0.65)",
    fontSize: "15px",
    lineHeight: 1.7,
    marginBottom: "2px",
  },
  ctaBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: "10px",
    background: "#d8dce3ff",
    color: "#071b4d",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "15px",
    fontWeight: 500,
    padding: "13px 24px",
    borderRadius: "12px",
    border: "none",
    cursor: "pointer",
    textDecoration: "none",
    transition: "transform 0.2s, background 0.2s, box-shadow 0.2s",
    boxShadow: "0 8px 32px rgba(56,189,248,0.3)",
  },
  stats: {
    display: "flex",
    gap: "28px",
    marginTop: "4px",
    paddingTop: "12px",
    borderTop: "1px solid rgba(255,255,255,0.08)",
  },
  statNum: {
    fontFamily: "'Syne', sans-serif",
    fontSize: "22px",
    fontWeight: 700,
    color: "#f0f6ff",
  },
  statLbl: {
    fontSize: "12px",
    color: "rgba(200,220,255,0.5)",
    marginTop: "2px",
  },
  sliderViewport: {
    position: "relative",
    overflow: "hidden",
    width: "130%",
    borderRadius: "20px",
    minHeight: "305px", // ⭐ IMPORTANT (adjust as needed)
  },
  sliderTrack: {
    display: "flex",
    transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
  },
  slide: {
    minWidth: "100%",
    background: "rgba(255,255,255,0.07)",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: "20px",
    padding: "32px 28px",
    position: "relative",
    overflow: "hidden",
  },
  slideTopLine: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "1px",
    background:
      "linear-gradient(90deg, transparent, rgba(56,189,248,0.5), transparent)",
  },
  quoteMark: {
    fontFamily: "'Syne', sans-serif",
    fontSize: "56px",
    lineHeight: 0.8,
    color: "rgba(56,189,248,0.25)",
    display: "block",
  },
  quoteText: {
    fontSize: "16px",
    lineHeight: 1.65,
    color: "rgba(240,246,255,0.88)",
    marginBottom: "10px",
  },
  authorRow: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  avatar: {
    width: "42px",
    height: "42px",
    borderRadius: "50%",
    background:
      "linear-gradient(135deg, rgba(56,189,248,0.25), rgba(99,102,241,0.25))",
    border: "1px solid rgba(56,189,248,0.3)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'Syne', sans-serif",
    fontSize: "13px",
    fontWeight: 600,
    color: "#7dd3fc",
    flexShrink: 0,
  },
  authorName: {
    fontSize: "14px",
    fontWeight: 500,
    color: "#f0f6ff",
  },
  authorRole: {
    fontSize: "12px",
    color: "rgba(200,220,255,0.5)",
    marginTop: "1px",
  },
  authorLoc: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
    fontSize: "11px",
    color: "#7dd3fc",
    marginTop: "4px",
  },
  progressBar: {
    width: "100%",
    height: "2px",
    background: "rgba(255,255,255,0.08)",
    borderRadius: "2px",
    marginTop: "16px",
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    background: "#38bdf8",
    borderRadius: "2px",
    transition: "width 0.1s linear",
  },
  controls: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: "20px",
  },
  dots: {
    display: "flex",
    gap: "7px",
    alignItems: "center",
  },
  dot: {
    width: "7px",
    height: "7px",
    borderRadius: "50%",
    background: "rgba(255,255,255,0.2)",
    cursor: "pointer",
    transition: "background 0.3s, transform 0.3s, width 0.3s",
    border: "none",
    padding: 0,
  },
  dotActive: {
    background: "#38bdf8",
    width: "22px",
    borderRadius: "4px",
  },
  navBtns: {
    display: "flex",
    gap: "8px",
  },
  navBtn: {
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    background: "rgba(255,255,255,0.08)",
    border: "1px solid rgba(255,255,255,0.12)",
    color: "white",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "background 0.2s, transform 0.2s",
  },
  wave: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    pointerEvents: "none",
    zIndex: 1,
  },
};
