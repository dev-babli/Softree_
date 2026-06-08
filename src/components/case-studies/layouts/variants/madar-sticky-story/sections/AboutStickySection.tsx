import Image from "next/image"
import { AccordionFeaturesList } from "../AccordionFeaturesList"
import type { MadarLayoutData } from "../types"

type Props = Pick<
  MadarLayoutData,
  | "aboutHeading"
  | "aboutIntro"
  | "aboutClientHeading"
  | "aboutClientBody"
  | "aboutBackgroundImage"
  | "aboutBackgroundMobile"
  | "clientLogo"
  | "challengeHeading"
  | "challengeItems"
>

export function AboutStickySection({
  aboutHeading,
  aboutIntro,
  aboutClientHeading,
  aboutClientBody,
  aboutBackgroundImage,
  aboutBackgroundMobile,
  clientLogo,
  challengeHeading,
  challengeItems,
}: Props) {
  return (
    <section className="madar-about c-about-sticky" id="about" data-madar-section="about">
      <div className="madar-about__sticky-wrap madar-container">
        <div className="madar-about__grid">
          <aside className="madar-about__side">
            <div className="madar-about__side-sticky" style={{ position: "relative" }}>
              <Image
                src={aboutBackgroundImage}
                alt=""
                fill
                className="madar-about__bg"
                data-madar-parallax="about-bg"
                sizes="50vw"
              />
              <div className="madar-about__logo-wrap" data-madar-parallax="about-logo">
                <Image src={clientLogo} alt="" width={100} height={100} className="madar-about__logo" />
              </div>
            </div>
          </aside>
          <div className="madar-about__content">
            <h2 className="madar-about__heading">{aboutHeading}</h2>
            <span className="madar-border-deco" />
            <p className="madar-about__intro" style={{ marginTop: "1.5rem" }}>
              {aboutIntro}
            </p>
            <div className="madar-about__mobile-visual">
              <Image
                src={aboutBackgroundMobile}
                alt=""
                width={760}
                height={740}
                className="madar-about__mobile-img"
              />
              <Image src={clientLogo} alt="" width={80} height={80} className="madar-about__mobile-logo" />
            </div>
            <h3 className="madar-about__subheading">{aboutClientHeading}</h3>
            <p className="madar-about__body">{aboutClientBody}</p>
            <h3 className="madar-about__subheading">{challengeHeading}</h3>
            <AccordionFeaturesList items={challengeItems} variant="light" />
          </div>
        </div>
      </div>
    </section>
  )
}
