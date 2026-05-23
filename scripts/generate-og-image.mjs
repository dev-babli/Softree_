/**
 * Generates a static public/og-image.png for Open Graph social previews.
 * Uses @resvg/resvg-js to render SVG → PNG at exactly 1200×630.
 *
 * Run:  node scripts/generate-og-image.mjs
 *
 * Output: public/og-image.png
 */

import { Resvg } from "@resvg/resvg-js";
import { writeFileSync } from "fs";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outPath = path.join(__dirname, "../public/og-image.png");

const svg = `
<svg width="1200" height="630" viewBox="0 0 1200 630"
  xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="g1" cx="80%" cy="20%" r="55%">
      <stop offset="0%" stop-color="#1852FF" stop-opacity="0.3"/>
      <stop offset="100%" stop-color="#0a0a0f" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="g2" cx="10%" cy="80%" r="45%">
      <stop offset="0%" stop-color="#6366f1" stop-opacity="0.22"/>
      <stop offset="100%" stop-color="#0a0a0f" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="topbar" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#1852FF"/>
      <stop offset="50%" stop-color="#6366f1"/>
      <stop offset="100%" stop-color="#0a0a0f" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="textgrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#1852FF"/>
      <stop offset="100%" stop-color="#818cf8"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="630" fill="#0a0a0f"/>
  <rect width="1200" height="630" fill="url(#g1)"/>
  <rect width="1200" height="630" fill="url(#g2)"/>

  <!-- Top accent bar -->
  <rect x="0" y="0" width="1200" height="3" fill="url(#topbar)"/>

  <!-- Logo box -->
  <rect x="80" y="72" width="44" height="44" rx="10" fill="url(#textgrad)"/>
  <text x="102" y="101" text-anchor="middle" font-family="system-ui, sans-serif"
    font-size="22" font-weight="700" fill="#ffffff">S</text>

  <!-- Brand name -->
  <text x="138" y="102" font-family="system-ui, sans-serif"
    font-size="22" font-weight="600" fill="#ffffff" letter-spacing="-0.3">
    Softree Technology
  </text>

  <!-- Main headline line 1 -->
  <text x="80" y="252" font-family="system-ui, sans-serif"
    font-size="80" font-weight="700" fill="#ffffff" letter-spacing="-3">
    Build smarter.
  </text>

  <!-- Main headline line 2 — gradient -->
  <text x="80" y="348" font-family="system-ui, sans-serif"
    font-size="80" font-weight="700" fill="url(#textgrad)" letter-spacing="-3">
    Deliver faster.
  </text>

  <!-- Sub-description -->
  <text x="80" y="420" font-family="system-ui, sans-serif"
    font-size="24" fill="rgba(255,255,255,0.5)" letter-spacing="0.2">
    AI  ·  Power Platform  ·  SharePoint  ·  Modern Web Development
  </text>

  <!-- URL bottom right -->
  <text x="1120" y="578" text-anchor="end" font-family="system-ui, sans-serif"
    font-size="17" fill="rgba(255,255,255,0.28)" letter-spacing="0.3">
    softreetechnology.com
  </text>

  <!-- Decorative dots bottom left -->
  <circle cx="80" cy="576" r="5" fill="#1852FF" opacity="0.7"/>
  <circle cx="98" cy="576" r="5" fill="#6366f1" opacity="0.7"/>
  <circle cx="116" cy="576" r="5" fill="#8b5cf6" opacity="0.7"/>
</svg>
`;

const resvg = new Resvg(svg, {
  fitTo: { mode: "width", value: 1200 },
});

const pngData = resvg.render();
const pngBuffer = pngData.asPng();
writeFileSync(outPath, pngBuffer);

console.log(`✅  OG image written to ${outPath} (${pngBuffer.byteLength} bytes)`);
