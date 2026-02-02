import NavigationClient from "@/components/sections/navigation-client";
import Footer from "@/components/sections/footer";
import MvpHero from "./hero";
import BenefitsSection from "./benefits";
import Link from "next/link";
import { CALENDLY_URL } from "@/lib/contactConfig";
import MvpProcessTimeline from "./mvp-timeline";
import MvpTechStack from "./tech";
import WhyChooseUsMVP from "./why";
import MvpServices from "./services";
import CtaMvp from "./cta";

/* ------------------------------------------------------------------ */
/* Shared Layout Spacing Config                                        */
/* ------------------------------------------------------------------ */
const SECTION_WRAPPER = "mx-auto max-w-8xl px-8 sm:px-10 md:px-14 lg:px-20";
const SECTION_GAP = "space-y-24 py-24";

export default function Home() {
  return (
    <main
      className="relative min-h-screen bg-gradient-to-b from-zinc-50 via-white to-zinc-50

 "
    >
      <NavigationClient />
      <MvpHero />
      <MvpServices />
      <BenefitsSection />
      <MvpProcessTimeline />
      <MvpTechStack />
      <WhyChooseUsMVP />

      <CtaMvp />
      <Footer />
    </main>
  );
}
