import type { Metadata } from "next"
import DietSodaHero from "@/components/showcase/diet-soda/DietSodaHero"

export const metadata: Metadata = {
  title: "Diet Soda | Pure Zero Refreshment",
  description: "Experience the crisp, clean taste of Diet Soda. Zero sugar, zero compromise.",
}

export default function DietSodaShowcasePage() {
  return <DietSodaHero />
}
