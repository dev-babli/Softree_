"use client";

import Component from "@/components/ui/matrix-code-rain";

const settings = {
  fontSize: 15,
  speed: 0.5,
  density: 1.2,
  textColor: "#FF6B2C",
  colorMode: "orange-red" as const,
};

export default function Demo(props: Partial<typeof settings>) {
  const s = { ...settings, ...props };
  return (
    <div className="h-screen w-screen bg-black">
      <Component {...s} />
    </div>
  );
}
export { Demo as MatrixCodeRainDemo };
