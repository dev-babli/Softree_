"use client";

import Link from "next/link";
import styles from "../avoora.module.css";

export function Navigation() {
  return (
    <nav className={styles.nav}>
      <div className={styles.container}>
        <div className={styles.navInner}>
          <Link href="/avoora" className={styles.logo}>
            <span className={styles.logoMark} />
            <span>Avoora</span>
          </Link>
          <div className={styles.navLinks}>
            <Link href="#about" className={styles.navLink}>About</Link>
            <Link href="#why" className={styles.navLink}>Why Us</Link>
            <Link href="#team" className={styles.navLink}>Team</Link>
            <Link href="#awards" className={styles.navLink}>Awards</Link>
            <Link href="#contact" className={styles.navLink}>Contact</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
