"use client";

import Image from "next/image";
import { StuxenOdometer, type OdometerPart } from "@/components/sections/stuxen/StuxenOdometer";
import { StuxenPrimaryButton } from "@/components/sections/stuxen/StuxenPrimaryButton";
import "./stuxen/StuxenShared.css";
import "./StuxenAboutV1Clone.css";

const CDN = "https://cdn.prod.website-files.com/68d113e98de4829d272b54f0";

const ABOUT_IMG = `${CDN}/68d1954b4fc85ac43b87b9e8_About%20V1%20img.avif`;

type StatCard = {
  icon: string;
  odometer: OdometerPart[];
  counterLabel: string;
  variant?: "_02";
};

const STAT_CARDS = {
  projectReady: {
    icon: `${CDN}/68d19866d8773304a07a6440_About%20Icon.svg`,
    odometer: [
      { type: "digit", value: 4 },
      { type: "char", value: "K" },
      { type: "char", value: "+" },
    ] as OdometerPart[],
    counterLabel: "Project ready",
    variant: "_02" as const,
  },
  awards: {
    icon: `${CDN}/68d19866a207115014fdb5ea_About%20Icon-1.svg`,
    odometer: [
      { type: "digit", value: 2 },
      { type: "digit", value: 1 },
      { type: "char", value: "+" },
    ] as OdometerPart[],
    counterLabel: "Wining awards",
  },
  experience: {
    icon: `${CDN}/68d19866c19ae988c0e62ea5_About%20Icon-2.svg`,
    odometer: [
      { type: "digit", value: 3 },
      { type: "digit", value: 2 },
      { type: "char", value: "Y" },
      { type: "char", value: "+" },
    ] as OdometerPart[],
    counterLabel: "Years experience",
  },
  customers: {
    icon: `${CDN}/68d19866131434e981ca9fc0_About%20Icon-3.svg`,
    odometer: [
      { type: "digit", value: 1 },
      { type: "char", value: "K" },
      { type: "char", value: "+" },
    ] as OdometerPart[],
    counterLabel: "Happy customers",
  },
};

function AboutStatCard({
  card,
  className = "",
}: {
  card: StatCard;
  className?: string;
}) {
  return (
    <div
      className={`about-card v1${card.variant ? ` ${card.variant}` : ""}${className ? ` ${className}` : ""}`}
    >
      <div className="about-counter-wrapper">
        <div className="about-icon-wrap">
          <Image
            src={card.icon}
            alt=""
            width={22}
            height={22}
            className="about-icon"
            unoptimized
          />
        </div>
        <div className="about-counter-wrap">
          <StuxenOdometer parts={card.odometer} />
          <div className="about-counter-text">{card.counterLabel}</div>
        </div>
      </div>
    </div>
  );
}

export type StuxenAboutV1CloneProps = {
  subTitle?: string;
  title?: string;
  ctaLabel?: string;
  ctaHref?: string;
};

const DEFAULTS = {
  subTitle: "About us",
  title:
    "Stuxen is a forward-thinking digital agency dedicated to helping brands grow and thrive in the digital era.",
  ctaLabel: "More\u00a0\u00a0about us",
  ctaHref: "/about",
};

/**
 * Webflow about-v1 — grid matches reference: 1 tall left + 2 stacked right.
 * Extra HTML nodes (21+, empower copy) kept for export parity, hidden visually.
 */
export default function StuxenAboutV1Clone({
  subTitle = DEFAULTS.subTitle,
  title = DEFAULTS.title,
  ctaLabel = DEFAULTS.ctaLabel,
  ctaHref = DEFAULTS.ctaHref,
}: StuxenAboutV1CloneProps) {
  return (
    <section
      className="stuxen-about-v1 stuxen-ui section about-v1 pd-top-0"
      aria-labelledby="stuxen-about-v1-title"
    >
      <div className="w-layout-blockcontainer container w-container">
        <div className="about-v1-grid">
          <Image
            src={ABOUT_IMG}
            alt="About V1 img"
            width={1056}
            height={1320}
            className="about-v1-img"
            sizes="(max-width: 767px) 100vw, (max-width: 991px) 728px, 940px"
            unoptimized
          />

          <div className="about-v1-wrapper">
            <div className="about-v1-title-wrap">
              <div
                data-wf--sub-title--variant="margin-bottom-24"
                className="sub-title-wrap margin-bottom-24"
              >
                <div className="sub-title-dot" aria-hidden />
                <div className="sub-title">{subTitle}</div>
              </div>
              <h2 id="stuxen-about-v1-title" className="about-title mb-30">
                {title}
              </h2>
              <StuxenPrimaryButton href={ctaHref} label={ctaLabel} />
            </div>

            <div className="about-v1-card-grid">
              {/* Left tall — 4K+ + Enhance (one card) */}
              <div className="about-v1-card-wrap">
                <AboutStatCard card={STAT_CARDS.projectReady} />
                <div className="about-card-content">
                  <div className="about-card-title">Enhance the online presence</div>
                  <p className="regular-text">
                    Creating effective landing page for a digital agency.
                  </p>
                </div>
              </div>

              {/* Right top — 32Y+ */}
              <AboutStatCard
                card={STAT_CARDS.experience}
                className="about-card--slot-tr"
              />

              {/* Right bottom — 1K+ */}
              <AboutStatCard
                card={STAT_CARDS.customers}
                className="about-card--slot-br"
              />

              {/* Webflow HTML extras (not in reference screenshot) */}
              <div className="about-v1-html-extra" aria-hidden>
                <div className="about-v1-card-wrap">
                  <AboutStatCard card={STAT_CARDS.awards} />
                </div>
                <div className="about-v1-card-wrap">
                  <div className="about-card-content">
                    <div className="about-card-title">Empowering Your Businesses</div>
                    <p className="regular-text">
                      Creating effective landing pagefor a digital agency.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
