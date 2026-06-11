"use client";

import Link from "next/link";
import { VectrHome } from "@/components/showcase/vectr/VectrHome";
import "@/components/showcase/vectr/vectr.css";

/** Vectr industrial staffing home — scroll-choreographed showcase */
export default function VectrStaffingShowcasePage() {
  return (
    <div>
      <Link href="/showcase" className="vectr-back">
        ← Showcase
      </Link>
      <VectrHome />
    </div>
  );
}
