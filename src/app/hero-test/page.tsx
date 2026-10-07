import type { Metadata } from "next";
import AgentCoreTabbedHero from './AgentCoreTabbedHero';

export const metadata: Metadata = {
  title: "Preview / Internal | Softree Technology",
  robots: { index: false, follow: false },
};

export default function HeroTestPage() {
  return (
    <main className="min-h-screen bg-slate-950">
      <AgentCoreTabbedHero />
    </main>
  );
}
