"use client";

import dynamic from "next/dynamic";

const Navigation = dynamic(() => import("./navigation"), {
  ssr: false,
});

export default function NavigationClient() {
  return <Navigation />;
}
