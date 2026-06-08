export type MadarAccordionItem = {
  id: string
  title: string
  description: string
  icon: MadarIconKey
}

export type MadarIconKey =
  | "transportation"
  | "fleet"
  | "communication"
  | "load"
  | "delivery"
  | "compliance"
  | "centralized"
  | "package"
  | "time"
  | "wallet"

export type MadarLayoutData = {
  eyebrow: string
  heroTitleLines: string[]
  heroLeadLines: string[]
  heroImage: string
  heroImageMobile: string
  aboutHeading: string
  aboutIntro: string
  aboutClientHeading: string
  aboutClientBody: string
  aboutBackgroundImage: string
  aboutBackgroundMobile: string
  clientLogo: string
  challengeHeading: string
  challengeItems: MadarAccordionItem[]
  assessmentHeading: string
  assessmentBody: string
  assessmentBackground: string
  assessmentBackgroundMobile: string
  integrationHeading: string
  integrationItems: MadarAccordionItem[]
}
