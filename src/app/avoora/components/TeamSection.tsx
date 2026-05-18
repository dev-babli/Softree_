"use client";

import { Reveal } from "./Reveal";
import { SectionTag } from "./SectionTag";
import styles from "../avoora.module.css";

const TEAM = [
  { id: 1, name: "Sophie Laurent", role: "Frontend Developer", bg: "linear-gradient(135deg, rgba(255, 88, 18, 0.4), rgba(255, 88, 18, 0.05))" },
  { id: 2, name: "Marcus Chen", role: "Lead Designer", bg: "linear-gradient(135deg, rgba(96, 165, 250, 0.3), rgba(96, 165, 250, 0.05))" },
  { id: 3, name: "Priya Sharma", role: "AI Engineer", bg: "linear-gradient(135deg, rgba(168, 85, 247, 0.3), rgba(168, 85, 247, 0.05))" },
  { id: 4, name: "James Wilson", role: "Project Lead", bg: "linear-gradient(135deg, rgba(34, 197, 94, 0.3), rgba(34, 197, 94, 0.05))" },
];

export function TeamSection() {
  return (
    <section id="team" className={styles.section}>
      <div className={styles.container}>
        <Reveal>
          <div className={styles.sectionHeader}>
            <h2 className={styles.heading}>Creative People</h2>
            <div className={styles.headingDivider} />
            <SectionTag>Our Team</SectionTag>
          </div>
        </Reveal>

        <div className={styles.teamGrid}>
          {TEAM.map((member, i) => (
            <Reveal key={member.id} delay={i * 0.1}>
              <div className={styles.teamCard}>
                <div className={styles.teamAvatar} style={{ background: member.bg }}>
                  {member.name.charAt(0)}
                </div>
                <h3 className={styles.teamName}>{member.name}</h3>
                <p className={styles.teamRole}>{member.role}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
