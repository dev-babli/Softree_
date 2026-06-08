"use client";

import Link from "next/link";
import { NexusSection2 } from "@/components/showcase/nexus-card";
import "@/components/showcase/nexus-card/nexus-section-2.css";

/** FOLLOW.ART nexus-section-2 scroll clone — Your Card promo */
export default function NexusCardShowcasePage() {
  return (
    <div className="min-h-screen" style={{ background: "#8fa3b3" }}>
      <nav className="nexus-promo-nav" aria-label="Promo navigation">
        <div>
          <p className="nexus-promo-nav__brand">FOLLOW.ART</p>
          <p className="nexus-promo-nav__tagline">One Practice. One Card.</p>
        </div>
        <ul className="nexus-promo-nav__links">
          <li>
            <a href="#">About</a>
          </li>
          <li>
            <a href="#" className="is-active">
              Our Product
            </a>
          </li>
          <li>
            <a href="#">Community Board</a>
          </li>
          <li>
            <a href="#">Pricing</a>
          </li>
          <li>
            <a href="#">FAQ</a>
          </li>
          <li>
            <a href="#">Login</a>
          </li>
          <li>
            <a href="#">Join</a>
          </li>
        </ul>
      </nav>

      <div className="nexus-showcase-header">
        <Link href="/showcase">← Showcase</Link>
        <Link href="/">Homepage</Link>
      </div>

      <main>
        <NexusSection2 />
        <p className="nexus-scroll-hint">Scroll to step through each card state</p>
      </main>
    </div>
  );
}
