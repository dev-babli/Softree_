import type { Metadata } from "next";
import ParticleHeadHero from './ParticleHeadHero';

export const metadata: Metadata = {
  title: "Preview / Internal | Softree Technology",
  robots: { index: false, follow: false },
};

export default function HeroTestPage() {
    return (
        <main className="h-screen w-full bg-slate-950">
            <ParticleHeadHero />
        </main>
    );
}