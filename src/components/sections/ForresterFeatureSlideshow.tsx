"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Autoplay, Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "./ForresterFeatureSlideshow.css";
import "swiper/css";
import "swiper/css/pagination";

type Stat = {
  score: string;
  label: string;
};

type CaseStudySlide = {
  company: string;
  eyebrow: string;
  title: string;
  description: string;
  ctaText: string;
  ctaHref: string;
  imageSrc: string;
  imageAlt: string;
  badgeSrc?: string;
  badgeAlt?: string;
  stats: Stat[];
};

const BG_IMAGE =
  "https://cdn.prod.website-files.com/68e69c204ba0666edacc94b1/69eb30ab7589ff9a8796b5f3_bg.jpg";
const LOGO_IMAGE =
  "https://cdn.prod.website-files.com/68e69c204ba0666edacc94b1/69e233d3e2a33cd31d95e661_5843f1680376cee950b55d9f3728be3f_forrester.webp";
const CHART_IMAGE =
  "https://cdn.prod.website-files.com/68e69c204ba0666edacc94b1/69e106edc6eec59b11d15bd4_6874bf41fa71742c28141bf091b13d82_forrester-wave-chart.webp";
const BADGE_IMAGE =
  "https://cdn.prod.website-files.com/68e69c204ba0666edacc94b1/69e106f3ffd0b2fb5acdb17d_3917a53e57bde1c14bd37e57b81feb1e_forrester-badge.webp";

const CASE_STUDY_SLIDES: CaseStudySlide[] = [
  {
    company: "Forrester Wave™",
    eyebrow: "THE FORRESTER WAVE™: CONVERSATIONAL AI PLATFORMS FOR CUSTOMER SERVICE, Q2 2026",
    title: "Strong Performer",
    description:
      "Conversational AI Platforms For Customer Service, Q2 2026 evaluated among 14 leading enterprise platforms.",
    ctaText: "Read the report",
    ctaHref: "/forrester-wave-2026",
    imageSrc: CHART_IMAGE,
    imageAlt: "The Forrester Wave chart",
    badgeSrc: BADGE_IMAGE,
    badgeAlt: "The Forrester Wave Strong Performer Q2 2026",
    stats: [
      { score: "5/5", label: "Resource Orchestration" },
      { score: "5/5", label: "App Lifecycle Management" },
      { score: "5/5", label: "Pricing Transparency" },
    ],
  },
  {
    company: "Providence Health",
    eyebrow: "CASE STUDY: HEALTHCARE EXPERIENCE MODERNIZATION",
    title: "Patient Experience at Scale",
    description:
      "Unified conversational journeys across multiple care touchpoints, improving response times and reducing service friction.",
    ctaText: "View case study",
    ctaHref: "/case-studies/ai",
    imageSrc:
      "https://cdn.prod.website-files.com/68e69c204ba0666edacc94b1/69e106edc6eec59b11d15bd4_6874bf41fa71742c28141bf091b13d82_forrester-wave-chart.webp",
    imageAlt: "Healthcare AI transformation case study visual",
    badgeSrc: BADGE_IMAGE,
    badgeAlt: "Case study badge",
    stats: [
      { score: "96%", label: "Resolution Accuracy" },
      { score: "37%", label: "Quality Improvement" },
      { score: "4w", label: "Pilot Launch" },
    ],
  },
  {
    company: "Global Retail Group",
    eyebrow: "CASE STUDY: ENTERPRISE SERVICE AUTOMATION",
    title: "Automation With Governance",
    description:
      "Scaled enterprise automation with clear controls, lifecycle governance, and measurable CX improvements across regions.",
    ctaText: "Explore outcomes",
    ctaHref: "/case-studies",
    imageSrc:
      "https://cdn.prod.website-files.com/68e69c204ba0666edacc94b1/69e106edc6eec59b11d15bd4_6874bf41fa71742c28141bf091b13d82_forrester-wave-chart.webp",
    imageAlt: "Enterprise automation case study visual",
    badgeSrc: BADGE_IMAGE,
    badgeAlt: "Case study badge",
    stats: [
      { score: "50%", label: "Ticket Deflection" },
      { score: "30%", label: "Agent Load Reduction" },
      { score: "8h", label: "Timezone Overlap" },
    ],
  },
];

function splitScore(value: string): { primary: string; suffix: string } {
  if (value.includes("/")) {
    const [left, right] = value.split("/");
    return { primary: left, suffix: `/${right || "5"}` };
  }
  return { primary: value, suffix: "" };
}

export default function ForresterFeatureSlideshow({
  slides = CASE_STUDY_SLIDES,
}: {
  slides?: CaseStudySlide[];
}) {
  const swiperRef = useRef<SwiperType | null>(null);
  const safeSlides = slides.length > 0 ? slides : CASE_STUDY_SLIDES;

  return (
    <section className="forrester-section">
      <div className="forrester-padding">
        <div className="forrester-container">
          <div className="forrester-swiper-wrap">
            <Swiper
              modules={[Pagination, Autoplay, A11y]}
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              slidesPerView={1}
              loop
              speed={900}
              autoplay={{ delay: 5200, disableOnInteraction: false, pauseOnMouseEnter: true }}
              pagination={{
                clickable: true,
                el: ".forrester-swiper-pagination",
              }}
              className="forrester-swiper"
            >
              {safeSlides.map((slide, index) => (
                <SwiperSlide key={`${slide.company}-${index}`}>
                  <div className="forrester-feature">
                    <Image
                      src={BG_IMAGE}
                      alt=""
                      fill
                      sizes="(max-width: 767px) 100vw, 768px"
                      className="forrester-bg-image"
                    />

                    <div className="forrester-layout-2-col">
                      <div className="forrester-heading-content-wrapper">
                        <Image
                          src={LOGO_IMAGE}
                          alt="Forrester"
                          width={160}
                          height={36}
                          className="forrester-logo"
                        />

                        <div className="forrester-company">{slide.company}</div>
                        <div className="forrester-eyebrow">{slide.eyebrow}</div>
                        <h2 className="forrester-heading">{slide.title}</h2>

                        <div className="forrester-copy-wrap">
                          <p className="forrester-copy">{slide.description}</p>
                        </div>

                        <div className="forrester-spacer" />

                        <div className="forrester-feature-stats">
                          {slide.stats.map((stat) => (
                            <div key={stat.label} className="forrester-feature-stats-tile">
                              <div className="forrester-stat-text">
                                <span>{splitScore(stat.score).primary}</span>
                                {splitScore(stat.score).suffix ? (
                                  <span className="forrester-stat-suffix">{splitScore(stat.score).suffix}</span>
                                ) : null}
                              </div>
                              <div className="forrester-stat-label">{stat.label}</div>
                            </div>
                          ))}
                        </div>

                        <div className="forrester-spacer" />

                        <div className="forrester-button-group">
                          <Link href={slide.ctaHref} className="forrester-button">
                            <span>{slide.ctaText}</span>
                          </Link>
                        </div>
                      </div>

                      <div className="forrester-media-col">
                        <div className="forrester-lp-feature-image">
                          <Image
                            src={slide.imageSrc}
                            alt={slide.imageAlt}
                            width={864}
                            height={892}
                            sizes="(max-width: 864px) 100vw, 864px"
                            className="forrester-chart-image"
                          />
                          <Image
                            src={slide.badgeSrc || BADGE_IMAGE}
                            alt={slide.badgeAlt || "Case study badge"}
                            width={2048}
                            height={2048}
                            sizes="(max-width: 2048px) 100vw, 2048px"
                            className="forrester-badge-image"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            <div className="forrester-controls" aria-label="Case studies slider controls">
              <button
                type="button"
                className="forrester-nav-btn"
                onClick={() => swiperRef.current?.slidePrev()}
                aria-label="Previous case study"
              >
                Prev
              </button>
              <button
                type="button"
                className="forrester-nav-btn"
                onClick={() => swiperRef.current?.slideNext()}
                aria-label="Next case study"
              >
                Next
              </button>
              <div className="forrester-swiper-pagination" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
