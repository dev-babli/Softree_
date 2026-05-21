"use client";

import { Reveal } from "./Reveal";
import { SectionTag } from "./SectionTag";
import styles from "../avoora.module.css";

const AWARDS = [
  { id: 1, title: "Site Of the Day", category: "Web Development", year: "2024", color: "rgba(255, 88, 18, 0.15)" },
  { id: 2, title: "Digital Excellence", category: "UI/UX Design", year: "2024", color: "rgba(96, 165, 250, 0.15)" },
  { id: 3, title: "Creative Agency", category: "Brand Identity", year: "2023", color: "rgba(168, 85, 247, 0.15)" },
  { id: 4, title: "Innovative Design", category: "Mobile App", year: "2023", color: "rgba(34, 197, 94, 0.15)" },
  { id: 5, title: "Top Branding", category: "Enterprise", year: "2023", color: "rgba(251, 191, 36, 0.15)" },
  { id: 6, title: "Web Innovation", category: "E-Commerce", year: "2022", color: "rgba(244, 114, 182, 0.15)" },
];

export function AwardsSection() {
  // Render the list twice for seamless infinite scroll
  const doubled = [...AWARDS, ...AWARDS];

  return (
    <section id="awards" className={styles.section}>
      <div className={styles.container}>
        <Reveal>
          <div className={styles.sectionHeader}>
            <h2 className={styles.heading}>Awards Achievement</h2>
            <div className={styles.headingDivider} />
            <SectionTag>Awards</SectionTag>
          </div>
        </Reveal>
      </div>

      <Reveal delay={0.2}>
        <div className={styles.marqueeWrap}>
          <div className={styles.marqueeTrack}>
            {doubled.map((award, i) => (
              <div
                key={`${award.id}-${i}`}
                className={styles.awardCard}
                style={{
                  background: `linear-gradient(135deg, ${award.color}, transparent)`,
                }}
              >
                <div className={styles.awardCardContent}>
                  <div className={styles.awardHeader}>
                    <span className={styles.awardYear}>{award.year}</span>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="#FF5812">
                      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                    </svg>
                  </div>
                  <h3 className={styles.awardTitle}>{award.title}</h3>
                  <p className={styles.awardCategory}>{award.category}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
