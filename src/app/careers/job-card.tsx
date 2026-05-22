"use client";
import { useState } from "react";
import ApplicationForm from "./form";

const CATEGORIES = [
  { label: "All Jobs", icon: "⊞" },
  { label: "AI", icon: "◈" },
  { label: "Power Apps", icon: "⚡" },
  { label: "Power BI", icon: "▣" },
  { label: "Testing", icon: "◎" },
  { label: "Marketing", icon: "◉" },
  { label: "HR", icon: "◐" },
  { label: "Web", icon: "◍" },
  { label: "Mobile", icon: "◑" },
];

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  type: string;
  experience: string;
  salary: string;
  description: string;
  tags: string[];
  badge: string;
  category: string;
}

const JOBS: Job[] = [
  {
    id: 1,
    title: "AI Engineer",
    company: "Softree",
    location: "Hybrid",
    type: "Full time",
    experience: "3+ yrs",
    salary: "$120–160k",
    description:
      "Build and deploy AI-powered enterprise applications using LLMs, RAG pipelines, and modern ML infrastructure at scale.",
    tags: ["Python", "LLMs", "Azure", "3+ yrs"],
    badge: "Hot",
    category: "AI",
  },
  {
    id: 2,
    title: "Senior Power BI Developer",
    company: "Softree",
    location: "Remote",
    type: "Full time",
    experience: "4+ yrs",
    salary: "$95–130k",
    description:
      "Design dashboards, build analytics models and deliver enterprise reporting solutions using Power BI, DAX and Azure data services.",
    tags: ["DAX", "Power BI", "SQL", "4+ yrs"],
    badge: "New",
    category: "Power BI",
  },
  {
    id: 3,
    title: "Power Apps Developer",
    company: "Softree",
    location: "Remote",
    type: "Full time",
    experience: "2+ yrs",
    salary: "$85–115k",
    description:
      "Build canvas and model-driven business applications on Microsoft Power Platform with Power Automate integration.",
    tags: ["Power FX", "Dataverse", "Power Automate"],
    badge: "Open",
    category: "Power Apps",
  },
  {
    id: 4,
    title: "QA / Testing Engineer",
    company: "Softree",
    location: "Hybrid",
    type: "Full time",
    experience: "2+ yrs",
    salary: "$75–105k",
    description:
      "Own automation testing strategy using Selenium and Cypress, plus API testing with Postman and CI/CD pipeline integration.",
    tags: ["Selenium", "Cypress", "API", "CI/CD"],
    badge: "Urgent",
    category: "Testing",
  },
];

export default function JobBoard({
  searchQuery,
  setSearchQuery,
}: {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
}) {
  const [activeCategory, setActiveCategory] = useState("All Jobs");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedJobTitle, setSelectedJobTitle] = useState("");

  const filtered = JOBS.filter((job) => {
    const matchCat =
      activeCategory === "All Jobs" || job.category === activeCategory;
    const matchSearch =
      !searchQuery ||
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchCat && matchSearch;
  });

  return (
    <div style={styles.root}>

      {/* Categories */}
      <div style={styles.catRow}>
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.label;
          return (
            <button
              key={cat.label}
              style={{
                ...styles.catPill,
                borderColor: isActive ? ORANGE : BORDER,
                background: isActive ? ORANGE : "transparent",
                color: isActive ? WHITE : GRAY_LIGHT,
              }}
              onClick={() => {
                setActiveCategory(cat.label);
                setSearchQuery("");
              }}
            >
              <span style={styles.catIcon}>{cat.icon}</span>
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Section label */}
      <div style={styles.sectionLabel}>
        <span>Featured openings</span>
        <span style={styles.sectionCount}>{filtered.length} roles</span>
      </div>

      {/* Cards */}
      <div style={styles.cardsList}>
        {filtered.length === 0 && (
          <div style={styles.empty}>No roles match your search.</div>
        )}
        {filtered.map((job, i) => (
          <JobCard
            key={job.id}
            job={job}
            index={i}
            onApply={(title) => {
              setSelectedJobTitle(title);
              setIsFormOpen(true);
            }}
          />
        ))}
      </div>

      {/* Application Form Modal */}
      <ApplicationForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        jobTitle={selectedJobTitle}
      />
    </div>
  );
}

function JobCard({
  job,
  index,
  onApply,
}: {
  job: Job;
  index: number;
  onApply: (title: string) => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{
        ...styles.card,
        ...(hovered ? styles.cardHovered : {}),
        animationDelay: `${index * 80}ms`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onApply(job.title)}
    >
      <div style={styles.cardStripe} />
      <div style={styles.cardInner}>
        {/* Row 1: identity + salary */}
        <div style={styles.cardRow1}>
          <div style={styles.cardIdentity}>
            <div style={styles.cardIconBox}>
              <span style={styles.cardIconEmoji}>
                {job.category === "AI"
                  ? "◈"
                  : job.category === "Power BI"
                  ? "▣"
                  : job.category === "Power Apps"
                  ? "⚡"
                  : "◎"}
              </span>
            </div>
            <div>
              <div style={styles.cardTitle}>{job.title}</div>
              <div style={styles.cardMeta}>
                {job.company}
                <span style={styles.metaDot}>·</span>
                {job.location}
                <span style={styles.metaDot}>·</span>
                {job.type}
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <p style={styles.cardDesc}>{job.description}</p>

        {/* Row 3: tags + button */}
        <div style={styles.cardRow3}>
          <div style={styles.tags}>
            {job.tags.map((tag) => (
              <span key={tag} style={styles.tag}>
                {tag}
              </span>
            ))}
          </div>
          <button
            style={hovered ? styles.applyBtnHovered : styles.applyBtn}
            onClick={(e) => {
              e.stopPropagation(); // Avoid card wrapper onClick double trigger
              onApply(job.title);
            }}
          >
            Apply now →
          </button>
        </div>
      </div>
    </div>
  );
}

const ORANGE = "#F97316";
const ORANGE_DARK = "#EA6C0A";
const ORANGE_LIGHT = "#FFF0E6";
const BLACK = "#0A0A0A";
const DARK = "#111111";
const DARK2 = "#1C1C1C";
const GRAY = "#3A3A3A";
const GRAY_LIGHT = "#7A7A7A";
const BORDER = "#2A2A2A";
const WHITE = "#FFFFFF";
const OFF_WHITE = "#F5F5F5";

const styles: Record<string, React.CSSProperties> = {
  root: {
    fontFamily: "'Outfit', 'DM Sans', sans-serif",
    background: BLACK,
    minHeight: "100vh",
    padding: "24px",
    color: WHITE,
  },

  // Hero
  hero: {
    background: DARK,
    borderRadius: 20,
    padding: "2rem",
    marginBottom: 20,
    position: "relative",
    overflow: "hidden",
    border: `1px solid ${BORDER}`,
  },
  heroOrb1: {
    position: "absolute",
    top: -80,
    right: -80,
    width: 260,
    height: 260,
    borderRadius: "50%",
    background: ORANGE,
    opacity: 0.12,
  },
  heroOrb2: {
    position: "absolute",
    bottom: -60,
    left: "25%",
    width: 180,
    height: 180,
    borderRadius: "50%",
    background: ORANGE,
    opacity: 0.06,
  },
  heroContent: { position: "relative", zIndex: 1 },
  eyebrow: {
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    color: ORANGE,
    marginBottom: 10,
  },
  heroTitle: {
    fontFamily: "'Syne', 'Outfit', sans-serif",
    fontSize: 32,
    fontWeight: 800,
    color: WHITE,
    lineHeight: 1.1,
    marginBottom: 8,
  },
  heroAccent: { color: ORANGE },
  heroSub: {
    fontSize: 14,
    color: GRAY_LIGHT,
    fontWeight: 300,
    marginBottom: 20,
  },

  // Search
  searchBar: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    background: "#161616",
    border: `1px solid ${BORDER}`,
    borderRadius: 12,
    padding: "4px 4px 4px 14px",
    marginBottom: 20,
  },
  searchIcon: { fontSize: 18, color: GRAY_LIGHT },
  searchInput: {
    flex: 1,
    background: "transparent",
    border: "none",
    outline: "none",
    color: WHITE,
    fontSize: 14,
    fontFamily: "inherit",
  },
  searchBtn: {
    background: ORANGE,
    color: WHITE,
    border: "none",
    borderRadius: 9,
    padding: "9px 20px",
    fontSize: 13,
    fontWeight: 600,
    cursor: "pointer",
    fontFamily: "inherit",
  },

  // Stats
  statsRow: { display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8 },
  statChip: {
    background: "#161616",
    border: `1px solid ${BORDER}`,
    borderRadius: 10,
    padding: "10px 12px",
    textAlign: "center",
  },
  statNum: {
    fontFamily: "'Syne', sans-serif",
    fontSize: 20,
    fontWeight: 700,
    color: ORANGE,
  },
  statLabel: { fontSize: 11, color: GRAY_LIGHT, marginTop: 2 },

  // Categories
  catRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: 7,
    marginBottom: 20,
  },
  catPill: {
    fontFamily: "inherit",
    fontSize: 12,
    fontWeight: 500,
    padding: "7px 14px",
    borderRadius: 999,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: BORDER,
    background: "transparent",
    color: GRAY_LIGHT,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: 5,
    transition: "all 0.15s",
  },
  catIcon: { fontSize: 13 },

  // Section label
  sectionLabel: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: GRAY_LIGHT,
    marginBottom: 14,
  },
  sectionCount: {
    fontWeight: 400,
    letterSpacing: 0,
    textTransform: "none",
    color: GRAY,
  },

  // Cards list
  cardsList: { display: "flex", flexDirection: "column", gap: 10 },
  empty: { color: GRAY_LIGHT, fontSize: 14, textAlign: "center", padding: 40 },

  // Card
  card: {
    display: "flex",
    borderRadius: 14,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: BORDER,
    background: DARK,
    overflow: "hidden",
    cursor: "pointer",
    transition: "border-color 0.18s, transform 0.18s",
  },
  cardHovered: {
    borderColor: ORANGE,
    transform: "translateY(-2px)",
  },
  cardStripe: {
    width: 4,
    flexShrink: 0,
    background: ORANGE,
    borderRadius: "0",
  },
  cardInner: {
    flex: 1,
    padding: "1.1rem 1.2rem",
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },

  // Card row 1
  cardRow1: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 12,
  },
  cardIdentity: { display: "flex", alignItems: "center", gap: 12 },
  cardIconBox: {
    width: 46,
    height: 46,
    borderRadius: 11,
    background: DARK2,
    border: `1px solid ${BORDER}`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  cardIconEmoji: { fontSize: 20, color: ORANGE },
  cardTitle: {
    fontFamily: "'Syne', 'Outfit', sans-serif",
    fontSize: 16,
    fontWeight: 700,
    color: WHITE,
    lineHeight: 1.2,
  },
  cardMeta: {
    fontSize: 12,
    color: GRAY_LIGHT,
    marginTop: 3,
    display: "flex",
    alignItems: "center",
    gap: 5,
  },
  metaDot: { color: GRAY, fontSize: 14 },

  // Description
  cardDesc: {
    fontSize: 13,
    color: GRAY_LIGHT,
    lineHeight: 1.6,
    fontWeight: 300,
  },

  // Card row 3
  cardRow3: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
    flexWrap: "wrap",
  },
  tags: { display: "flex", flexWrap: "wrap", gap: 5 },
  tag: {
    fontSize: 11,
    fontWeight: 500,
    padding: "4px 10px",
    borderRadius: 6,
    background: DARK2,
    color: GRAY_LIGHT,
    border: `1px solid ${BORDER}`,
  },
  applyBtn: {
    fontFamily: "inherit",
    fontSize: 12,
    fontWeight: 600,
    padding: "8px 18px",
    borderRadius: 8,
    border: `1px solid ${ORANGE}`,
    background: "transparent",
    color: ORANGE,
    cursor: "pointer",
    whiteSpace: "nowrap",
    transition: "all 0.15s",
  },
  applyBtnHovered: {
    fontFamily: "inherit",
    fontSize: 12,
    fontWeight: 600,
    padding: "8px 18px",
    borderRadius: 8,
    border: `1px solid ${ORANGE}`,
    background: ORANGE,
    color: WHITE,
    cursor: "pointer",
    whiteSpace: "nowrap",
  },
};
