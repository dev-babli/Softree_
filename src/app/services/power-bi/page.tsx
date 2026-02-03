import NavigationClient from "@/components/sections/navigation-client";
import Footer from "@/components/sections/footer";
import PowerBIServicesTabs from "./power-bi-tabs";
import OurProcess from "./process";
import Certifications from "./certification";
import PowerBISuccessStories from "./success";
import PowerBIHero from "./hero";
import Link from "next/link";
import { CALENDLY_URL } from "@/lib/contactConfig";
import CtaAbout from "./cta";
/* ------------------------------------------------------------------ */
/* Fixed Width Config                                                  */
/* ------------------------------------------------------------------ */
const FIXED_WIDTH = "mx-auto max-w-8xl px-8 sm:px-10 md:px-14 lg:px-20";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#141414]">
      <NavigationClient />

      {/* HERO (can stay full-width internally) */}
      <PowerBIHero />

      {/* MAIN CONTENT – FIXED WIDTH */}
      <section className="bg-gradient-to-b from-zinc-50 via-white to-zinc-50 py-24">
        <div className={FIXED_WIDTH}>
          <PowerBIServicesTabs />

          <Certifications />
        </div>
      </section>

      <CtaAbout />
      <Footer />
    </main>
  );
}
