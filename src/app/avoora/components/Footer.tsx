"use client";

import styles from "../avoora.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerInner}>
          <p className={styles.footerCopy}>
            © {new Date().getFullYear()} Avoora. All rights reserved.
          </p>
          <p className={styles.footerCopy}>Crafted with care.</p>
        </div>
      </div>
    </footer>
  );
}
