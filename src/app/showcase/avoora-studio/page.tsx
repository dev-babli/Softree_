import { redirect } from "next/navigation";

/** @deprecated Use /showcase/hero-intro */
export default function AvooraStudioRedirect() {
  redirect("/showcase/hero-intro");
}
