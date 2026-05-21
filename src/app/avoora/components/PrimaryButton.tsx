"use client";

import Link from "next/link";
import styles from "../avoora.module.css";

interface PrimaryButtonProps {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}

export function PrimaryButton({ href, children, external }: PrimaryButtonProps) {
  const inner = (
    <>
      <span>{children}</span>
      <svg width="10" height="12" viewBox="0 0 10 12" fill="none" aria-hidden>
        <path
          d="M9.61648 5.8006L0.360093 0.0358623C0.250469 -0.0329162 0.105835 0.000195883 0.0370565 0.109843C0.0155525 0.144118 0.00328985 0.183378 0.0014624 0.223799C-0.000365041 0.264221 0.00830504 0.304427 0.0266285 0.340503L2.85674 5.99955L0.0254568 11.6595C-0.0331514 11.7749 0.0128727 11.916 0.128261 11.9746C0.164336 11.9929 0.204543 12.0016 0.244965 11.9998C0.285387 11.998 0.324647 11.9857 0.358921 11.9642L9.61531 6.19944C9.7253 6.13127 9.75924 5.98683 9.69104 5.87681C9.67198 5.84605 9.64606 5.82013 9.61531 5.80107L9.61648 5.8006Z"
          fill="#FF5812"
        />
      </svg>
    </>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={styles.primaryButton}>
        {inner}
      </a>
    );
  }

  return (
    <Link href={href} className={styles.primaryButton}>
      {inner}
    </Link>
  );
}
