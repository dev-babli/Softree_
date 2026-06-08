"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CardTypographyDesktop, CardTypographyMobile } from "./CardTypography";
import { UnderlinePhrase } from "./HandUnderline";
import { NEXUS_SLIDES } from "./data";
import { NexusCardStack, NexusPhoneFinale } from "./NexusCardStack";
import { NexusTimeline } from "./NexusTimeline";
import "./nexus-section-2.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const CARD_FACES = NEXUS_SLIDES.filter((s) => s.card).map((s) => s.card!);
const SLIDE_COUNT = NEXUS_SLIDES.length;

function TimeForwardIcon() {
  return (
    <svg
      className="nexus-section-2__time-icon"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M12 7v5l3 2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M16 4l3-1 1 3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PromoArrowIcon() {
  return (
    <svg
      className="nexus-section-2__arrow-deco"
      viewBox="0 0 120 80"
      fill="none"
      aria-hidden
    >
      <path
        d="M8 62c28-38 52-48 88-42"
        stroke="#0c0c0c"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M88 18l8 24-24 4"
        stroke="#0c0c0c"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PromoSlideText({
  slide,
  active,
}: {
  slide: (typeof NEXUS_SLIDES)[number];
  active: boolean;
}) {
  return (
    <p className={`nexus-section-2__slide${active ? " nexus-section-2__slide--active" : ""}`}>
      {slide.prefix ? <>{slide.prefix} </> : null}
      <UnderlinePhrase active={active}>
        {slide.highlight}
      </UnderlinePhrase>
      {slide.suffix ? <> {slide.suffix}</> : null}
    </p>
  );
}

export default function NexusSection2() {
  const rootRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeRef = useRef(0);

  const isCta = activeIndex === SLIDE_COUNT - 1;
  const cardActiveIndex = Math.min(activeIndex, CARD_FACES.length - 1);
  const timelineStep = isCta ? 2 : Math.min(activeIndex, 2);

  useGSAP(
    () => {
      const root = rootRef.current;
      const list = listRef.current;
      if (!root || !list) return;

      const measureSlideHeight = () => {
        const first = list.querySelector<HTMLElement>(".nexus-section-2__slide");
        return first?.offsetHeight ?? 180;
      };

      let slideHeight = measureSlideHeight();

      const st = ScrollTrigger.create({
        trigger: root,
        start: "top top",
        end: `+=${SLIDE_COUNT * 100}%`,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        scrub: 0.8,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const raw = self.progress * SLIDE_COUNT;
          const index = Math.min(SLIDE_COUNT - 1, Math.floor(raw));
          if (index !== activeRef.current) {
            activeRef.current = index;
            setActiveIndex(index);
          }

          const fractional = raw - index;
          const baseOffset = index * slideHeight;
          const scrubOffset = fractional * slideHeight * 0.35;
          gsap.set(list, { y: -(baseOffset + scrubOffset) });
        },
      });

      const ro = new ResizeObserver(() => {
        slideHeight = measureSlideHeight();
        ScrollTrigger.refresh();
      });
      ro.observe(list);

      return () => {
        ro.disconnect();
        st.kill();
      };
    },
    { scope: rootRef, dependencies: [] },
  );

  return (
    <section ref={rootRef} className="nexus-section-2 ui-blue" aria-label="Your Card">
      <div className="nexus-section-2__pin">
        <div className="nexus-section-2__grid">
          {/* Left — typography + 3D cards / phones */}
          <div className="nexus-section-2__visual">
            <h2 className="sr-only">Your Card</h2>
            <CardTypographyDesktop />
            <CardTypographyMobile />

            <div
              className="nexus-section-2__cards-layer"
              style={{ opacity: isCta ? 0 : 1, transition: "opacity 0.6s ease" }}
            >
              <NexusCardStack cards={CARD_FACES} activeIndex={cardActiveIndex} />
            </div>
            <NexusPhoneFinale visible={isCta} />
          </div>

          {/* Right — scrolling copy + timeline + CTA */}
          <div className="nexus-section-2__content col-divider__right">
            <div className="nexus-section-2__content-top">
              <TimeForwardIcon />
            </div>
            <hr className="nexus-section-2__divider" />
            <div className="nexus-section-2__content-bottom">
              <div className="nexus-section-2__list-wrapper">
                <div ref={listRef} className="nexus-section-2__list">
                  {NEXUS_SLIDES.map((slide, i) => (
                    <PromoSlideText
                      key={slide.id}
                      slide={slide}
                      active={i === activeIndex}
                    />
                  ))}
                </div>
              </div>

              <div className="nexus-section-2__footer">
                <NexusTimeline activeStep={timelineStep} />
                <div
                  className={`nexus-section-2__cta-wrap${isCta ? " nexus-section-2__cta-wrap--visible" : ""}`}
                >
                  <PromoArrowIcon />
                  <Link href="#" className="nexus-section-2__join-btn">
                    <span>Join</span>
                    <span className="nexus-section-2__join-icon" aria-hidden>
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M13 6l6 6-6 6" />
                      </svg>
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
