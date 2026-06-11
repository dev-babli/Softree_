"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CardTypography } from "./CardTypography";
import { UnderlinePhrase } from "./HandUnderline";
import { NEXUS_SLIDES } from "./data";
import { NexusCardStack, NexusPhoneFinale } from "./NexusCardStack";
import { NexusTimeline } from "./NexusTimeline";
import "./nexus-section-2.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const CARD_FACES = NEXUS_SLIDES.filter((s) => s.card).map((s) => s.card!);
const SLIDE_COUNT = NEXUS_SLIDES.length;

function PromoSlideText({
  slide,
  active,
}: {
  slide: (typeof NEXUS_SLIDES)[number];
  active: boolean;
}) {
  return (
    <p className="nexus-section-2__slide">
      {slide.prefix ? (
        <>
          {slide.prefix}{" "}
        </>
      ) : null}
      <UnderlinePhrase active={active}>{slide.highlight}</UnderlinePhrase>
      {slide.suffix ? <> {slide.suffix}</> : null}
    </p>
  );
}

export default function NexusSection2() {
  const rootRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeRef = useRef(0);

  const isCta = activeIndex >= SLIDE_COUNT - 1;
  const cardActiveIndex = Math.min(activeIndex, CARD_FACES.length - 1);
  const timelineStep = Math.min(activeIndex, 2);

  useGSAP(
    () => {
      const root = rootRef.current;
      const list = listRef.current;
      if (!root || !list) return;

      const measure = () => {
        const slide = list.querySelector<HTMLElement>(".nexus-section-2__slide");
        return slide?.offsetHeight ?? 200;
      };

      let slideHeight = measure();

      const st = ScrollTrigger.create({
        trigger: root,
        start: "top top",
        end: `+=${(SLIDE_COUNT - 1) * 100}%`,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        scrub: 0.65,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const progressSlides = self.progress * (SLIDE_COUNT - 1);
          const index = Math.round(progressSlides);
          const clamped = Math.min(SLIDE_COUNT - 1, Math.max(0, index));

          if (clamped !== activeRef.current) {
            activeRef.current = clamped;
            setActiveIndex(clamped);
          }

          gsap.set(list, { y: -progressSlides * slideHeight });
        },
      });

      const ro = new ResizeObserver(() => {
        slideHeight = measure();
        ScrollTrigger.refresh();
      });
      ro.observe(list);

      return () => {
        ro.disconnect();
        st.kill();
      };
    },
    { scope: rootRef },
  );

  return (
    <section
      ref={rootRef}
      className="nexus-section-2 nexus-ui-blue"
      aria-label="Your Card"
    >
      <div className="nexus-section-2__pin">
        <div className="nexus-section-2__row">
          <div className="nexus-section-2__visual">
            <h2 className="sr-only">Your Card</h2>
            <CardTypography />
            <div style={{ opacity: isCta ? 0 : 1, transition: "opacity 0.55s ease" }}>
              <NexusCardStack cards={CARD_FACES} activeIndex={cardActiveIndex} />
            </div>
            <NexusPhoneFinale visible={isCta} />
          </div>

          <div className="nexus-section-2__content">
            <div className="nexus-section-2__content-top">
              <Image
                src="/showcase/nexus-card/time-forward.svg"
                alt=""
                width={26}
                height={26}
                className="nexus-section-2__time-icon"
              />
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

              <div className="nexus-section-2__bottom">
                <NexusTimeline activeStep={timelineStep} hidden={isCta} />
                <div
                  className={`nexus-section-2__cta-panel${isCta ? " nexus-section-2__cta-panel--visible" : ""}`}
                >
                  <Image
                    src="/showcase/nexus-card/promo-arrow.svg"
                    alt=""
                    width={150}
                    height={100}
                    className="nexus-section-2__promo-arrow"
                  />
                  <Link href="#" className="nexus-section-2__join-btn">
                    <span className="nexus-section-2__join-icon" aria-hidden>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M13 6l6 6-6 6" />
                      </svg>
                    </span>
                    <span className="nexus-section-2__join-text">Join</span>
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
