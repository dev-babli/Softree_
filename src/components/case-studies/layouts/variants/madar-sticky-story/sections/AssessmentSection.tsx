import Image from "next/image"
import type { MadarLayoutData } from "../types"

type Props = Pick<
  MadarLayoutData,
  "assessmentHeading" | "assessmentBody" | "assessmentBackground" | "assessmentBackgroundMobile"
>

export function AssessmentSection({
  assessmentHeading,
  assessmentBody,
  assessmentBackground,
  assessmentBackgroundMobile,
}: Props) {
  return (
    <section className="madar-assessment c-assessment" data-madar-section="assessment">
      <div className="madar-assessment__bg" data-madar-parallax="assessment-bg">
        <Image
          src={assessmentBackground}
          alt=""
          fill
          sizes="100vw"
          className="hidden object-cover md:block"
        />
        <Image
          src={assessmentBackgroundMobile}
          alt=""
          fill
          sizes="100vw"
          className="object-cover md:hidden"
        />
      </div>
      <div className="madar-assessment__overlay" />
      <div className="madar-assessment__inner madar-container">
        <div className="madar-assessment__grid">
          <div className="madar-assessment__card c-assessment-card">
            <h2 className="madar-assessment__title">{assessmentHeading}</h2>
            <span className="madar-border-deco" />
            <p className="madar-assessment__text" style={{ marginTop: "1.25rem" }}>
              {assessmentBody}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
