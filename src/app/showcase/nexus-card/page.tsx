"use client";

import Link from "next/link";
import { NexusSection2 } from "@/components/showcase/nexus-card";
import "@/components/showcase/nexus-card/nexus-section-2.css";

/** FOLLOW.ART nexus-section-2 scroll clone */
export default function NexusCardShowcasePage() {
  return (
    <div className="nexus-ui-blue min-h-screen">
      <Link href="/showcase" className="nexus-showcase-back">
        ← Showcase
      </Link>

      <nav className="nexus-promo-nav" aria-label="Site">
        <div>
          <p className="nexus-promo-nav__brand">FOLLOW.ART</p>
          <p className="nexus-promo-nav__tagline">One Practice. One Card.</p>
        </div>
        <ul className="nexus-promo-nav__links">
          <li>
            <a href="#">About</a>
          </li>
          <li>
            <a href="#">How it works</a>
          </li>
          <li>
            <a href="#">Pricing</a>
          </li>
        </ul>
      </nav>

      <NexusSection2 />
    </div>
  );
}
