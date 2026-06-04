/**
 * Certification & recognition logos — single source for homepage, About, and services.
 * Local assets live under `/public/images/certifications/`.
 *
 * Run `npm run fetch:certifications` after placing files, or use the browser helper
 * at `scripts/certification-download-helper.html` if automated fetch is blocked (403).
 */

export type CertificationLogo = {
  alt: string;
  /** Preferred: self-hosted path under /public */
  src: string;
  /** WordPress CDN fallback when local file is missing */
  remoteSrc: string;
};

const REMOTE_BASE =
  "https://www.softreetechnology.com/wp-content/uploads/2024/12";

export const CERTIFICATION_LOGOS: CertificationLogo[] = [
  {
    alt: "STPI",
    src: "/images/certifications/stpi.webp",
    remoteSrc: `${REMOTE_BASE}/STPI.webp`,
  },
  {
    alt: "Startup India",
    src: "/images/certifications/startup-india.webp",
    remoteSrc: `${REMOTE_BASE}/startupindia.webp`,
  },
  {
    alt: "MCPD",
    src: "/images/certifications/mcpd.webp",
    remoteSrc: `${REMOTE_BASE}/MCPD.webp`,
  },
  {
    alt: "MCTS",
    src: "/images/certifications/mcts.webp",
    remoteSrc: `${REMOTE_BASE}/MCTS.webp`,
  },
  {
    alt: "ISO 9001",
    src: "/images/certifications/iso-9001-2015.webp",
    remoteSrc: `${REMOTE_BASE}/ISO-9001-2015.webp`,
  },
  {
    alt: "ISO 27001",
    src: "/images/certifications/iso-27001-2022.webp",
    remoteSrc: `${REMOTE_BASE}/ISO-27001-2022.webp`,
  },
];
