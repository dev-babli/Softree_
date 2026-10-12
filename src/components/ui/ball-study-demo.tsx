"use client";

import BallStudy from "@/components/ui/ball-study";

export default function BallStudyDemo() {
  return (
    <div className="h-[520px] w-full overflow-hidden rounded-xl bg-[#08090a]">
      <BallStudy mode="dark" className="block h-full w-full" />
    </div>
  );
}
