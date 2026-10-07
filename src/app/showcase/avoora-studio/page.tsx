import type { Metadata } from "next";
import { redirect } from "next/navigation";

/** @deprecated Use /showcase/hero-intro */
export const metadata: Metadata = {
  title: "Preview / Internal | Softree Technology",
  robots: { index: false, follow: false },
};

export default function AvooraStudioRedirect() {
  redirect("/showcase/hero-intro");
}
