'use client';

import dynamic from "next/dynamic";

const Navigation = dynamic(
  () => import("./navigation").then((m) => m.Navigation),
  { ssr: false }
);

export default function NavigationClient() {
  return <Navigation />;
}
