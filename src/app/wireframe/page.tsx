import type { Metadata } from "next";
import ChannelCard from "@/components/ChannelCard";

export const metadata: Metadata = {
  title: "Preview / Internal | Softree Technology",
  robots: { index: false, follow: false },
};

export default function Home() {
  return (
    <main className="h-screen w-screen overflow-hidden bg-[#0a0a0a]">
      <ChannelCard />
    </main>
  );
}
