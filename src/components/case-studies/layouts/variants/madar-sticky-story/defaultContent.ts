import type { MadarLayoutData } from "./types"

/** Yamama / Madar reference copy — matches madarplatform.com case study */
export const YAMAMA_MADAR_DEFAULT: MadarLayoutData = {
  eyebrow: "Case Studies",
  heroTitleLines: ["Madar", "& Yamama", "Cement Company"],
  heroLeadLines: ["A Giant Leap in", "Productivity"],
  heroImage: "/Gallery/Image.jpg",
  heroImageMobile: "/Gallery/Image.jpg",
  aboutHeading: "Smart Logistics for YCC",
  aboutIntro:
    "Madar empowers Yamama Cement Company (YCC), the leading cement producer in the Kingdom of Saudi Arabia, to streamline logistics operations far beyond standard transportation management. By leveraging deep product integration, YCC has automated shipment scheduling, load permit generation, accurate load data input, and digital payment management — resulting in a significant boost to operational efficiency.",
  aboutClientHeading: "About YCC",
  aboutClientBody:
    "Yamama Cement Company is one of the leading cement companies in the Kingdom of Saudi Arabia. With a massive output of more than 21,800 tons of cement daily, YCC required a reliable logistics management platform that would effectively organize and optimize a multitude of transportation providers and mission-critical operations.",
  aboutBackgroundImage: "/Gallery/Image.jpg",
  aboutBackgroundMobile: "/Gallery/Image.jpg",
  clientLogo: "/images/logo/bayer.svg",
  challengeHeading: "YCC Challenges",
  challengeItems: [
    {
      id: "c1",
      title: "High truck volume demand",
      description:
        "Transporting the plant's output to construction sites requires hundreds of truckloads each day",
      icon: "transportation",
    },
    {
      id: "c2",
      title: "Fleet availability and reliability",
      description: "Sourcing, contracting, and managing multiple fleet providers efficiently",
      icon: "fleet",
    },
    {
      id: "c3",
      title: "Standardized communication",
      description:
        "Establishing a unified communication protocol for all providers. Precise loading and unloading times — cement must be picked up from the plant and delivered on time, making accurate scheduling critical",
      icon: "communication",
    },
    {
      id: "c4",
      title: "Accurate load weighing",
      description:
        "Even a slight error in weighing daily output can lead to significant losses over time, so precision is essential",
      icon: "load",
    },
    {
      id: "c5",
      title: "Proof of delivery",
      description: "Timely delivery must be properly registered to prevent disputes or claims",
      icon: "delivery",
    },
  ],
  assessmentHeading: "Madar's Team Business Assessment",
  assessmentBody:
    "Through requirements gathering and integration design, Madar's team delivered a comprehensive solution that identified and addressed key areas for improvement in YCC's transportation management. As a result, YCC received a clear and actionable vision for streamlining transportation processes with minimal investment and minimal changes to existing IT systems and business workflows — all while significantly boosting business performance.",
  assessmentBackground: "/Gallery/Image.jpg",
  assessmentBackgroundMobile: "/Gallery/Image.jpg",
  integrationHeading: "Madar's Integration",
  integrationItems: [
    {
      id: "i1",
      title: "Automated Fleet Provider Compliance Verification",
      description:
        "YCC eliminates delays in carrier vetting by leveraging Madar's platform, where every fleet provider is pre-vetted using seamless eGovernment services integration. This ensures that only compliant, qualified carriers are engaged — without manual verification efforts.",
      icon: "compliance",
    },
    {
      id: "i2",
      title: "Centralized Contracting and Communication",
      description:
        "All providers operate under standardized contract conditions and communicate through unified, agreed-upon tools. This centralization significantly reduces friction, improves coordination, and simplifies fleet management across multiple vendors.",
      icon: "centralized",
    },
    {
      id: "i3",
      title: "Full System Interoperability",
      description:
        "Through deep integration between Madar and YCC's internal systems, both platforms operate under a single order ID. This shared identifier reduces operational complexity and minimizes human error during order execution and tracking.",
      icon: "package",
    },
    {
      id: "i4",
      title: "Smart Data Exchange",
      description:
        "Cement loads are precisely weighed on YCC's certified load scales and transmitted directly to the digital waybill via Madar's API. This real-time data exchange eliminates discrepancies, prevents product loss, and ensures full accountability per load.",
      icon: "communication",
    },
    {
      id: "i5",
      title: "Precise Scheduling and Yard Management",
      description:
        "Madar automatically calculates optimized truck arrival and loading schedules. This prevents yard congestion, ensures timely loading, and secures on-time deliveries, all of which enhance operational efficiency and service reliability.",
      icon: "time",
    },
    {
      id: "i6",
      title: "Automated Entry Permit Generation",
      description:
        "Integrated scheduling enables the automatic issuance of entry permits for both plant and delivery sites. This improves security, eliminates manual paperwork, and ensures that only authorized trucks are granted access — all in real time.",
      icon: "delivery",
    },
    {
      id: "i7",
      title: "Seamless eWallet Integration for Provider Payments",
      description:
        "YCC compensates its fleet providers via the Madar eWallet platform, eliminating paper invoicing and manual processing. Payments are securely and instantly distributed from YCC's eWallet account, shortening the payment cycle and reducing administrative overhead and errors.",
      icon: "wallet",
    },
  ],
}
