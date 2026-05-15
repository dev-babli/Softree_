"use client";

import styles from "../avoora.module.css";

interface SectionTagProps {
  children: React.ReactNode;
}

export function SectionTag({ children }: SectionTagProps) {
  return (
    <div className={styles.sectionTag}>
      <span className={styles.brandCircle} />
      <span className={styles.tagText}>{children}</span>
    </div>
  );
}
