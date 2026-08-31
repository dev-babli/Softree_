"use client"

import { useEffect, useRef, useState, useMemo } from "react"
import Image from "next/image"
import Link from "next/link"
import { PortableText, type PortableTextComponents } from "@portabletext/react"
import {
  Smartphone,
  Atom,
  Terminal,
  Database,
  Zap,
  BarChart3,
  Globe,
  Cloud,
  Code2,
  Bot,
  Brain,
  Workflow,
  GitBranch,
  Wrench,
  Layers,
  Share2,
  ChevronLeft,
  ChevronRight,
  Calendar
} from "lucide-react"
import type { CaseStudyLayoutData, Highlight, PTBlock, RelatedStudy } from "../../types"
import LightContactSection from "@/components/homepage-light/LightContactSection"
import { stockPackForSlug } from "@/lib/case-study-stock-images"
import "./education-edtech-story.css"



type Props = {
  data: CaseStudyLayoutData
}

// Scoped PortableText components for the notebook styled rendering
const notebookPortableTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p>{children}</p>,
    h3: ({ children }) => {
      // Avoid duplicate title rendering for generic section headers
      const text = Array.isArray(children)
        ? children.map((c) => (typeof c === "string" ? c : "")).join("").trim()
        : typeof children === "string"
          ? children.trim()
          : "";

      const lowercaseText = text.toLowerCase();
      if (
        lowercaseText === "the challenge" ||
        lowercaseText === "challenge" ||
        lowercaseText === "the outcome" ||
        lowercaseText === "outcome" ||
        lowercaseText === "the approach" ||
        lowercaseText === "approach" ||
        lowercaseText === "the solution" ||
        lowercaseText === "solution"
      ) {
        return null;
      }
      return <h3>{children}</h3>;
    },
    blockquote: ({ children }) => <p className="pull-quote">{children}</p>,
  },
}

export function EducationEdTechStoryPage({ data }: Props) {
  const clientDetailsText = useMemo(() => {
    const details = data.clientDetails;
    const studyTitle = data.title || "AI-driven analytics and automation";
    const studyRegion = data.snapshot?.region || "multiple international markets";

    const rawText = (() => {
      if (details && details.trim()) return details;
      const size = (data.companySize || "enterprise").toLowerCase();
      const sizeDesc = size === "startup" ? "A startup" : size === "mid-market" ? "A mid-market enterprise" : "A global enterprise";
      return `${sizeDesc} in the IT services sector, operating across ${studyRegion} and managing a complex IT environment. The client partnered with Softree Technology to leverage ${studyTitle} for improved IT service management and operational efficiency.`;
    })();

    const escapeRegExp = (str: string) => {
      return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    };

    const searchTerms = [studyRegion, studyTitle].filter((t) => t && t.trim() !== "");
    if (searchTerms.length === 0) return rawText;

    const pattern = `(${searchTerms.map(escapeRegExp).join("|")})`;
    const regex = new RegExp(pattern, "gi");
    const parts = rawText.split(regex);

    return (
      <>
        {parts.map((part, idx) => {
          const isMatch = searchTerms.some((t) => t.toLowerCase() === part.toLowerCase());
          if (isMatch) {
            return (
              <span key={idx} className="font-bold text-[#ff5c00]" style={{ color: "var(--marker)" }}>
                {part}
              </span>
            );
          }
          return part;
        })}
      </>
    );
  }, [data.clientDetails, data.title, data.snapshot?.region, data.companySize]);

  const [progressWidth, setProgressWidth] = useState(0)
  const [activeSection, setActiveSection] = useState("overview")
  const [currentIndex, setCurrentIndex] = useState(0)
  const visibleCount = 1

  // Linear Scroll progress tracker
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
      setProgressWidth(pct)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Section observer for highlighting index menu
  useEffect(() => {
    const tracked = ["overview", "challenge", "approach", "outcome", "results", "faq"]
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    )

    tracked.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  // Title rendering with italic em fallback
  const renderTitle = () => {
    const titleText = data.headerTitle || data.title
    const commaIndex = titleText.indexOf(",")
    if (commaIndex !== -1) {
      const titleFirst = titleText.slice(0, commaIndex + 1)
      const titleLast = titleText.slice(commaIndex + 1).trim()
      return (
        <h1>
          {titleFirst} <br />
          <em className="title-highlight">{titleLast}</em>
        </h1>
      )
    }

    const forIndex = titleText.toLowerCase().indexOf(" for ")
    if (forIndex !== -1) {
      const titleFirst = titleText.slice(0, forIndex)
      const titleLast = titleText.slice(forIndex + 5).trim()
      return (
        <h1>
          {titleFirst} <br />
          <span className="title-preposition">for </span>
          <em className="title-highlight">{titleLast}</em>
        </h1>
      )
    }

    return <h1>{titleText}</h1>
  }

  // Related stories card movement tracking handler
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    card.style.setProperty("--mx", `${x}%`)
    card.style.setProperty("--my", `${y}%`)
  }

  // Fallbacks for layout metadata
  const meta = {
    useCase: data.useCase || "Process Automation",
    servicesProvided: data.servicesProvided || "Power Platform Development",
    scaleOfOperation: data.scaleOfOperation || data.snapshot?.users || "100+ Business Users",
    projectType: data.snapshot?.projectType || "Education Management System",
    region: data.snapshot?.region || "Asia-Pacific",
    endUsers: data.snapshot?.users || "10,000+ Students & Educators",
    industry: data.snapshot?.industry || data.industry || "EdTech",
  }

  // Highlights fallbacks (Tally counts)
  const defaultHighlights: Highlight[] = [
    { value: "60%", label: "Administrative efficiency gained" },
    { value: "75%", label: "Faster attendance processing" },
    { value: "40%", label: "Growth in student engagement" },
  ]
  const highlights = data.highlights && data.highlights.length > 0 && data.highlights.some(h => h.value && h.value !== "—" && h.value !== "-")
    ? data.highlights
    : defaultHighlights

  // Tech items list
  const defaultTechStack = [
    { chip: "RN", name: "React Native", desc: "Shared mobile layer powering both iOS and Android from one codebase." },
    { chip: "JS", name: "JavaScript", desc: "Core application logic across dashboards and workflows." },
    { chip: "RX", name: "Redux", desc: "Predictable state management across role-based views." },
    { chip: "FB", name: "Firebase", desc: "Real-time data, auth, and push notification infrastructure." },
  ]

  // Dynamic Tech stack selector matching CMS data.technologies or data.servicesProvided
  const getTechStack = () => {
    if (data.technologies && data.technologies.length > 0) {
      return data.technologies.map(t => {
        const chip = t.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 3)
        return { chip, name: t, desc: `Integrated ${t} layer in the solution architecture.` }
      })
    }
    if (data.servicesProvided) {
      return data.servicesProvided.split(",").map(s => {
        const name = s.trim()
        const chip = name.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 3)
        return { chip, name, desc: `Provided expert ${name} services to achieve project goals.` }
      })
    }
    return defaultTechStack
  }

  const techStack = getTechStack()

  // Results Ledger data mapping
  const defaultResults = [
    { num: "01", desc: "Attendance processing time reduction", stat: "75%" },
    { num: "02", desc: "Administrative efficiency improvement", stat: "60%" },
    { num: "03", desc: "Student engagement increase", stat: "40%" },
  ]
  const results = data.beforeAfter && data.beforeAfter.length > 0
    ? data.beforeAfter.map((r, i) => ({
        num: String(i + 1).padStart(2, "0"),
        desc: r.metric,
        stat: r.after,
      }))
    : data.highlights && data.highlights.length > 0 && data.highlights.some(h => h.value && h.value !== "—" && h.value !== "-")
      ? data.highlights.map((h, i) => ({
          num: String(i + 1).padStart(2, "0"),
          desc: h.label,
          stat: h.value,
        }))
      : defaultResults

  // FAQ default questions
  const defaultFaqs = [
    {
      question: "What types of custom systems and platforms does Softree develop?",
      answer: "Softree Technology designs and builds custom enterprise platforms, cloud applications, workflow automation, and analytics dashboards using modern stacks like React, Next.js, Power Platform, SharePoint, and Azure/AWS integrations.",
    },
    {
      question: "How does Softree ensure rapid project delivery without compromising quality?",
      answer: "We employ agile methodologies, pre-built design primitives, and automated test pipelines. This approach allows us to launch production-ready MVPs in 8–12 weeks while maintaining high performance, security, and scalability.",
    },
    {
      question: "Can Softree integrate new solutions with our existing database or ERP?",
      answer: "Yes, we specialize in secure integration layers and custom APIs that connect new frontends and low-code applications directly with legacy databases, ERPs, and third-party services.",
    },
    {
      question: "How does Softree manage and execute custom case study projects?",
      answer: "Softree Technology designs, builds, and maintains custom enterprise applications and integration platforms, utilizing agile sprints, low-code systems (Power Platform, SharePoint), custom web/mobile stacks, and automated testing to deliver high-quality outcomes within weeks.",
    },
  ]
  const faqs = data.faqs && data.faqs.length > 0 ? data.faqs : defaultFaqs

  // Images mapping
  const heroImageSrc = data.sectionImages?.hero || data.heroImageUrl || "https://www.softreetechnology.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2F1zmh4sfw%2Fproduction%2F515539c70439c2a345c0e88a80a943d4714fe328-1536x1024.png&w=3840&q=75"
  const galleryItems = data.gallery && data.gallery.length > 0
    ? data.gallery
    : [
        {
          url: data.sectionImages?.solutionDashboard || "https://www.softreetechnology.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2F1zmh4sfw%2Fproduction%2F913b6ae48ca38eb012a21f1811559146e4bff0be-1536x1024.png&w=3840&q=75",
          alt: "Executive Dashboard",
          caption: "Executive Dashboard — real-time attendance, exam, and engagement metrics",
        }
      ]

  // Related cases mapping
  const relatedCases: RelatedStudy[] = data.related && data.related.length > 0
    ? data.related.slice(0, 6)
    : [
        { _id: "fallback-leave-mgmt", category: "Manufacturing", title: "Employee Leave Management System for Manufacturing Enterprise", excerpt: "A U.S. manufacturing company digitized leave workflows with Power Platform, cutting approval time by 80%.", slug: { current: "enterprise-leave-management-system" } },
        { _id: "fallback-ceramic-auto", category: "Manufacturing", title: "Power Apps Automation for Ceramic Manufacturing", excerpt: "Automated product lifecycle management, reducing manual effort by 60% and eliminating data inconsistencies.", slug: { current: "power-apps-ceramic-manufacturing-automation" } },
        { _id: "fallback-test-auto", category: "Manufacturing & Distribution", title: "Global Manufacturing Enterprise Test Automation", excerpt: "Automated SharePoint and SPFx testing with Selenium, reducing defects by 50% with a 98% pass rate.", slug: { current: "sharepoint-spfx-automation-testing" } },
        { _id: "fallback-hc-qa", category: "Healthcare", title: "Healthcare AI Test Automation for Patient Management Platform", excerpt: "Softree Technology helped a leading healthcare provider achieve 95% test automation coverage.", slug: { current: "healthcare-ai-test-automation-patient-management-platform" } },
        { _id: "fallback-perf-mon", category: "AI & Automation", title: "AI-Powered Website Performance Platform", excerpt: "Discover how Softree Technology's AI Performance Intelligence Report identifies conversion blockers.", slug: { current: "ai-website-performance-monitoring" } },
      ]



  const [isPaused, setIsPaused] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const [activeShowcaseIndex, setActiveShowcaseIndex] = useState(0)

  // Autoplay slider effect (cycles through slides unless hovered)
  useEffect(() => {
    if (isPaused) return
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % relatedCases.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [isPaused, relatedCases.length])

  // Lightbox keyboard navigation handler
  useEffect(() => {
    if (lightboxIndex === null) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxIndex(null)
      if (e.key === "ArrowRight") {
        setLightboxIndex((prev) => (prev === null ? null : (prev + 1) % galleryItems.length))
      }
      if (e.key === "ArrowLeft") {
        setLightboxIndex((prev) => (prev === null ? null : (prev - 1 + galleryItems.length) % galleryItems.length))
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [lightboxIndex, galleryItems.length])

  return (
    <article className="education-edtech-story">
      {/* Scroll indicator */}
      <div className="progress-rule" style={{ width: `${progressWidth}%` }} />

      {/* Sticky Right Side Index Tracker */}
      <nav className="side-index" aria-label="Section index">
        {["overview", "challenge", "approach", "outcome", "results", "faq"].map((id) => (
          <a
            key={id}
            href={`#${id}`}
            className={activeSection === id ? "active" : ""}
            onClick={(e) => {
              e.preventDefault()
              document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
            }}
          >
            <span className="idx-label">{id.charAt(0).toUpperCase() + id.slice(1)}</span>
            <span className="dot" />
          </a>
        ))}
      </nav>

      {/* HERO */}
      <section className="hero" id="overview" style={{ paddingBottom: "72px" }}>
        <div className="wrap">
          <div className="hero-split-grid">
            <div className="hero-left">
              <Reveal className="eyebrow-row">
                <span className="tag">{data.industry || "Education Technology (EdTech)"}</span>
              </Reveal>
              <Reveal className="mt-4">{renderTitle()}</Reveal>
              <Reveal className="hero-sub mt-6">
                <p>{data.excerpt}</p>
              </Reveal>
              <Reveal className="hero-actions mt-8">
                <a href="#contact" className="btn-primary">
                  <Calendar className="h-4.5 w-4.5 shrink-0" />
                  Schedule a consultation
                </a>
                {data.pdfUrl && (
                  <a href={data.pdfUrl} download className="btn-secondary">
                    {data.pdfUrl.toLowerCase().endsWith(".pptx") ? "Download PPTX" : "Download PDF"}
                  </a>
                )}
              </Reveal>
            </div>
            <div className="hero-right w-full flex flex-col justify-center">
              <Reveal className="hero-image-wrap w-full">
                <div className="relative w-full overflow-hidden rounded-2xl border border-black/10 bg-white/90 shadow-[0_20px_50px_rgba(0,0,0,0.12)] backdrop-blur-xl transition-all duration-500 hover:shadow-[0_30px_60px_rgba(0,0,0,0.16)]">
                  {/* Window Bar Header */}
                  <div className="flex h-10 shrink-0 w-full items-center justify-between border-b border-black/[0.08] bg-neutral-100/90 px-4">
                    <div className="flex items-center gap-1.5">
                      <span className="h-3 w-3 rounded-full bg-[#ff5f56] shadow-inner" />
                      <span className="h-3 w-3 rounded-full bg-[#ffbd2e] shadow-inner" />
                      <span className="h-3 w-3 rounded-full bg-[#27c93f] shadow-inner" />
                    </div>

                    <div className="flex items-center gap-1.5 rounded-md border border-black/[0.06] bg-white/90 px-3 py-0.5 text-[11px] font-medium text-neutral-500 shadow-inner max-w-[240px] truncate">
                      <span className="truncate">softreetechnology.com/case-studies</span>
                    </div>

                    <div className="w-8" />
                  </div>

                  {/* Image Display Frame - Full Aspect Ratio Display (Zero Cropping) */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#0d0f18] p-1">
                    <Image
                      src={heroImageSrc}
                      alt={data.heroImageAlt || data.title}
                      fill
                      priority
                      className="object-contain object-center transition-transform duration-700 hover:scale-[1.02]"
                      sizes="(max-width: 900px) 100vw, 600px"
                    />

                    {/* Glass shine overlay */}
                    <div className="cs-glass-shine absolute inset-0 pointer-events-none w-1/2 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>

      </section>

      {/* METRICS REGISTER STRIP */}
      <section style={{ paddingTop: 0, paddingBottom: 0 }}>
        <div className="wrap">
          <div className="register" style={{ marginTop: "-32px", borderRadius: "16px" }}>
            <div className="register-row">
              {highlights.map((h, i) => (
                <CounterCell key={i} targetValue={h.value} label={h.label} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CLIENT DETAILS */}
      <section style={{ paddingTop: "48px", paddingBottom: "16px" }}>
        <div className="wrap">
          <Reveal>
            <div className="client-details-card" style={{
              background: "linear-gradient(to bottom, #09090b 0%, #2a0e00 50%, #000000 100%)",
              border: "1.5px solid rgba(255, 92, 0, 0.22)",
              borderRadius: "16px",
              padding: "32px",
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.35)",
              position: "relative",
              overflow: "hidden"
            }}>
              <h4 style={{
                fontFamily: "var(--mono)",
                fontSize: "0.75rem",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.18em",
                color: "rgba(255, 255, 255, 0.7)",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "16px"
              }}>
                <span style={{ display: "inline-block", width: "6px", height: "6px", borderRadius: "50%", background: "var(--marker)" }} />
                Client Profile
              </h4>
              <p style={{
                fontFamily: "var(--body)",
                fontSize: "1.1rem",
                lineHeight: "1.75",
                color: "rgba(255, 255, 255, 0.9)",
                fontWeight: 400
              }}>
                {clientDetailsText}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* PROJECT META GRID */}
      <section style={{ paddingTop: "64px", paddingBottom: "64px" }}>
        <div className="wrap">
          <div className="section-body">
            <div className="spacer" />
            <Reveal className="w-full">
              <div className="meta-bento-grid">
                {/* Use Cases (span 1) */}
                <div className="meta-bento-card">
                  <div className="meta-bento-header">
                    <div className="meta-bento-icon-wrap">
                      <Workflow className="h-4.5 w-4.5" />
                    </div>
                    <span className="meta-bento-label">Use Cases</span>
                  </div>
                  <div className="meta-bento-value">{meta.useCase}</div>
                </div>

                {/* Industry (span 1) */}
                <div className="meta-bento-card">
                  <div className="meta-bento-header">
                    <div className="meta-bento-icon-wrap">
                      <Globe className="h-4.5 w-4.5" />
                    </div>
                    <span className="meta-bento-label">Industry</span>
                  </div>
                  <div className="meta-bento-value">{meta.industry}</div>
                </div>

                {/* Project Type (span 1) */}
                <div className="meta-bento-card">
                  <div className="meta-bento-header">
                    <div className="meta-bento-icon-wrap">
                      <Smartphone className="h-4.5 w-4.5" />
                    </div>
                    <span className="meta-bento-label">Project Type</span>
                  </div>
                  <div className="meta-bento-value">{meta.projectType}</div>
                </div>

                {/* Scale of Operation (span 2) */}
                <div className="meta-bento-card span-2">
                  <div className="meta-bento-header">
                    <div className="meta-bento-icon-wrap">
                      <Zap className="h-4.5 w-4.5" />
                    </div>
                    <span className="meta-bento-label">Scale of Operation</span>
                  </div>
                  <div className="meta-bento-value">{meta.scaleOfOperation}</div>
                </div>

                {/* End Users (span 1) */}
                <div className="meta-bento-card">
                  <div className="meta-bento-header">
                    <div className="meta-bento-icon-wrap">
                      <Share2 className="h-4.5 w-4.5" />
                    </div>
                    <span className="meta-bento-label">End Users</span>
                  </div>
                  <div className="meta-bento-value">{meta.endUsers}</div>
                </div>

                {/* Service Provided (span 3) */}
                <div className="meta-bento-card span-3">
                  <div className="meta-bento-header">
                    <div className="meta-bento-icon-wrap">
                      <Wrench className="h-4.5 w-4.5" />
                    </div>
                    <span className="meta-bento-label">Service Provided</span>
                  </div>
                  <div className="meta-bento-tags-wrap">
                    {meta.servicesProvided ? meta.servicesProvided.split(",").map((s, idx) => (
                      <span key={idx} className="meta-bento-tag">
                        {s.trim()}
                      </span>
                    )) : (
                      <span className="meta-bento-tag">Custom Development</span>
                    )}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CHALLENGE */}
      <section className="band-dim ruled" id="challenge">
        <div className="wrap">
          <Reveal className="section-head">
            <div className="section-eyebrow">{data.challengeHeading || "The Client Challenge"}</div>
            <h2>{data.challengeTitle || "Business Process Challenges"}</h2>
          </Reveal>
          <Reveal className="section-body">
            <div className="spacer" />
            <div className="prose">
              {data.challengeBody && data.challengeBody.length > 0 ? (
                <PortableText value={data.challengeBody} components={notebookPortableTextComponents} />
              ) : (
                <>
                  <p>Educational institutions often struggle with fragmented systems for attendance tracking, student performance monitoring, examination management, and teacher–student communication. Administrative teams spent significant time on manual record-keeping, while students and parents lacked real-time visibility into academic progress.</p>
                  <p>The client needed a centralized mobile platform that could simplify academic operations while providing an engaging digital learning experience. Existing processes relied on spreadsheets, paper-based attendance records, and disconnected communication channels — resulting in inefficiencies and delayed decision-making.</p>
                  <p>The solution also had to work seamlessly across Android and iOS, support growing user volumes, and provide secure access to sensitive student data while staying easy to use for teachers, students, and administrators alike.</p>
                </>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* APPROACH */}
      <section id="approach">
        <div className="wrap">
          <Reveal className="section-head">
            <div className="section-eyebrow">{data.approachHeading || "Our Approach"}</div>
            <h2>{data.approachSummary || "Our Strategic Approach"}</h2>
          </Reveal>
          <Reveal className="section-body">
            <div className="spacer" />
            <div className="prose">
              {data.approachBody && data.approachBody.length > 0 ? (
                <PortableText value={data.approachBody} components={notebookPortableTextComponents} />
              ) : (
                <>
                  <p>Softree designed and developed a cross-platform education management application using React Native, enabling a single codebase for both Android and iOS deployments. The platform was built around a centralized architecture connecting attendance management, examinations, student records, notifications, and learning resources into one unified experience.</p>
                  <p>Role-based dashboards gave teachers, students, and administrators access to exactly what they needed. Real-time notifications improved communication, while integrated reporting surfaced actionable insight into attendance, academic performance, and operational metrics.</p>
                  <p>For scalability and reliability, the app was built on modern APIs, secure authentication, cloud-based data management, and responsive mobile interfaces optimized for daily educational workflows.</p>
                </>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* DELIVERY / STACK OVERVIEW */}
      <section className="band-dim">
        <div className="wrap">
          <Reveal className="section-head">
            <div className="section-eyebrow">{data.solutionHeading || "Solution Overview"}</div>
            <h2>{data.solutionTitle || "How we delivered it."}</h2>
          </Reveal>
          <Reveal className="section-body">
            <div className="spacer" />
            <div className="w-full">
              <div className="stack-list">
                {techStack.map((tech, i) => (
                  <div key={i} className="stack-item">
                    <div className="stack-chip">{tech.chip}</div>
                    <div>
                      <div className="stack-name">{tech.name}</div>
                      <div className="stack-desc">{tech.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* VISUAL PROOF (SCREENSHOT SHOWCASE) */}
      <section className="band-dim">
        <div className="wrap">
          <Reveal className="section-head">
            <div className="section-eyebrow">{data.galleryHeading || "Visual Proof"}</div>
            <h2>{data.gallerySubheading || "Explore the Solution Through visuals"}</h2>
          </Reveal>
          <Reveal className="section-body">
            <div className="spacer" />
            <div className="w-full min-w-0">
              <div 
                className="p-6 md:p-10 rounded-2xl border border-orange-600/30 shadow-2xl w-full backdrop-blur-xl"
                style={{
                  background: "linear-gradient(to bottom, #09090b 0%, #2a0e00 50%, #000000 100%)",
                  boxShadow: "0 25px 60px rgba(0, 0, 0, 0.35)",
                }}
              >
                <div className="flex flex-col gap-6 md:gap-8 w-full max-w-[800px] mx-auto">
                  
                  {/* Top: Large Active Screenshot */}
                  <div className="w-full flex flex-col items-center">
                    <div 
                      className="device-frame w-full cursor-pointer group"
                      onClick={() => setLightboxIndex(activeShowcaseIndex)}
                    >
                      <div className="screen">
                        <div className="relative aspect-[16/10] w-full overflow-hidden">
                          <Image
                            src={galleryItems[activeShowcaseIndex].url}
                            alt={galleryItems[activeShowcaseIndex].alt || `Featured Screenshot`}
                            fill
                            className="object-contain bg-white transition-transform duration-500 group-hover:scale-[1.02]"
                            sizes="(max-width: 768px) 100vw, 800px"
                          />
                          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <span className="text-white bg-[#ff5c00] px-4.5 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase shadow-md flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                              Click to expand
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    {galleryItems[activeShowcaseIndex].caption && (
                      <div className="showcase-caption font-semibold mt-4 text-white text-center" style={{ justifyContent: "center" }}>
                        {galleryItems[activeShowcaseIndex].caption}
                      </div>
                    )}
                  </div>

                  {/* Bottom: Clickable Thumbnails Horizontal Row */}
                  {galleryItems.length > 1 && (
                    <div className="flex flex-row overflow-x-auto md:flex-wrap gap-4.5 justify-start md:justify-center w-full pb-3 scrollbar-none select-none">
                      {galleryItems.map((item, idx) => {
                        const isActive = activeShowcaseIndex === idx;
                        return (
                          <div 
                            key={idx}
                            onClick={() => setActiveShowcaseIndex(idx)}
                            className={`flex flex-col gap-2.5 p-2 rounded-xl border transition-all duration-200 cursor-pointer flex-1 min-w-[130px] max-w-[160px] shrink-0 ${
                              isActive 
                                ? "border-white bg-white text-slate-900 shadow-md scale-102" 
                                : "border-white/10 bg-white/10 text-white/80 hover:bg-white/20 hover:border-white/20 hover:text-white"
                            }`}
                          >
                            {/* Thumbnail device preview */}
                            <div className="relative w-full aspect-[16/10] overflow-hidden rounded-md border border-white/10 bg-black/40">
                              <Image 
                                src={item.url}
                                alt={item.alt || `Thumbnail ${idx + 1}`}
                                fill
                                className="object-cover"
                                sizes="160px"
                              />
                            </div>
                            {/* Caption details */}
                            <div className="flex flex-col gap-1 min-w-0 text-center">
                              {(() => {
                                const captionText = item.caption || "";
                                const sep = captionText.includes("—") ? "—" : captionText.includes("-") ? "-" : "";
                                const [titlePart, ...restParts] = sep ? captionText.split(sep) : [captionText, ""];
                                const displayTitle = titlePart.trim() || `View ${String(idx + 1).padStart(2, "0")}`;
                                return (
                                  <>
                                    <span className={`text-[8px] uppercase font-mono tracking-widest font-extrabold ${
                                      isActive ? "text-[#ff5c00]" : "text-white/60"
                                    }`}>
                                      {String(idx + 1).padStart(2, "0")} // VIEW
                                    </span>
                                    <span className={`text-[11px] font-semibold truncate ${
                                      isActive ? "text-slate-900 font-bold" : "text-white"
                                    }`}>
                                      {displayTitle}
                                    </span>
                                  </>
                                );
                              })()}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  )}

                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* OUTCOME */}
      <section className="band-ink" id="outcome">
        <div className="wrap">
          <Reveal className="section-head">
            <div className="section-eyebrow">{data.outcomeHeading || "The Outcome"}</div>
            <h2>{data.outcomeTitle || "Delivering Measurable Business Outcomes"}</h2>
          </Reveal>
          <Reveal className="section-body">
            <div className="spacer" />
            <div className="prose">
              {data.outcomeBody && data.outcomeBody.length > 0 ? (
                <PortableText value={data.outcomeBody} components={notebookPortableTextComponents} />
              ) : (
                <>
                  <p>The new platform significantly streamlined administrative operations and improved collaboration across the institution. Attendance tracking became largely automated, freeing educators to spend more time on student engagement rather than record-keeping.</p>
                  <p className="pull-quote">
                    {data.testimonial?.quote ||
                      `"Key processes that once required multiple systems were consolidated into a single mobile application — improving both data accuracy and accessibility."`}
                  </p>
                  <p>Students gained real-time access to schedules, attendance records, exam updates, and learning materials — driving higher platform adoption.</p>
                  <p>Looking ahead, the client plans to expand the ecosystem with AI-powered learning recommendations, personalized progress tracking, virtual classrooms, and deeper LMS integrations — building on an architecture designed to scale with growing student populations and campuses.</p>
                </>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* RESULTS LEDGER */}
      <section id="results">
        <div className="wrap">
          <Reveal className="section-head">
            <div className="section-eyebrow">{data.resultsHeading || "Results & Business Impact"}</div>
            <h2>The numbers behind the rollout.</h2>
          </Reveal>
          <Reveal className="section-body">
            <div className="spacer" />
            <div className="ledger w-full">
              {results.map((r, i) => (
                <div key={i} className="ledger-row">
                  <div className="ledger-num">{r.num}</div>
                  <div className="ledger-desc">{r.desc}</div>
                  <div className="ledger-stat">{r.stat}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* FULL REFERENCE TECH STACK GRID */}
      <section className="band-dim">
        <div className="wrap">
          <Reveal className="section-head">
            <div className="section-eyebrow">{data.techStackHeading || "Reference Tech Stack"}</div>
            <h2>{data.techStackTitle || "The full integration layer."}</h2>
          </Reveal>
          <Reveal className="section-body">
            <div className="spacer" />
            <div className="flex flex-wrap justify-center gap-3 md:gap-4 max-w-4xl mx-auto w-full">
              {techStack.map((item, i) => {
                return (
                  <div
                    key={i}
                    className="inline-flex items-center px-6 py-2.5 rounded-full text-white shadow-sm border border-orange-600/35 backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
                    style={{
                      background: "linear-gradient(to bottom, #09090b 0%, #2a0e00 50%, #000000 100%)",
                    }}
                  >
                    <span className="text-[13px] font-bold tracking-wide">
                      {item.name}
                    </span>
                  </div>
                )
              })}
            </div>
          </Reveal>
        </div>
      </section>

      {/* OTHER STORIES */}
      <section 
        className="relative overflow-hidden py-16 sm:py-20 md:py-24"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="wrap">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-8 md:mb-12">
            <Reveal className="section-head !mb-0">
              <div className="section-eyebrow">More Customer Stories</div>
              <h2>Other engagements worth a look.</h2>
            </Reveal>
            {relatedCases.length > visibleCount && (
              <Reveal className="flex items-center gap-3 self-end sm:self-auto shrink-0 z-20">
                <button
                  type="button"
                  onClick={() => setCurrentIndex((prev) => Math.max(prev - 1, 0))}
                  disabled={currentIndex === 0}
                  className={`flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full border transition-all duration-300 shadow-sm backdrop-blur-sm 
                    ${currentIndex === 0 
                      ? "border-zinc-200 bg-zinc-100/40 text-zinc-400 cursor-not-allowed opacity-60" 
                      : "border-orange-500/20 bg-gradient-to-b from-zinc-900 to-black hover:from-orange-600 hover:to-orange-500 text-white cursor-pointer hover:border-transparent active:scale-95"
                    }`}
                  aria-label="Previous slide"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentIndex((prev) => Math.min(prev + 1, relatedCases.length - visibleCount))}
                  disabled={currentIndex === relatedCases.length - visibleCount}
                  className={`flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full border transition-all duration-300 shadow-sm backdrop-blur-sm
                    ${currentIndex === relatedCases.length - visibleCount 
                      ? "border-zinc-200 bg-zinc-100/40 text-zinc-400 cursor-not-allowed opacity-60" 
                      : "border-orange-500/20 bg-gradient-to-b from-zinc-900 to-black hover:from-orange-600 hover:to-orange-500 text-white cursor-pointer hover:border-transparent active:scale-95"
                    }`}
                  aria-label="Next slide"
                >
                  <ChevronRight size={20} />
                </button>
              </Reveal>
            )}
          </div>

          <div className="relative group/slider w-full px-0">
            {/* Carousel track wrapper */}
            <div className="overflow-hidden w-full">
              <div
                className="flex transition-transform duration-500 ease-out"
                style={{
                  transform: `translateX(-${currentIndex * (100 / visibleCount)}%)`,
                }}
              >
                {relatedCases.map((rc, i) => {
                  const slugStr = typeof rc.slug === "string" ? rc.slug : rc.slug?.current || ""
                  const img = rc.mainImage?.asset?.url || rc.mainImageUrl || stockPackForSlug(slugStr).hero
                  return (
                    <div
                      key={i}
                      className="shrink-0 px-3 flex justify-center"
                      style={{
                        flex: `0 0 ${100 / visibleCount}%`,
                      }}
                    >
                      <div className="story-card group/card h-full max-w-4xl w-full" onMouseMove={handleMouseMove}>
                        {img && (
                          <div className="story-image-wrap relative aspect-[16/10] w-full rounded-xl overflow-hidden mb-6 border border-white/10 shadow-sm">
                            <Image
                              src={img}
                              alt={rc.title || "Related Case Study"}
                              fill
                              className="object-contain bg-neutral-950 transition-transform duration-500 group-hover/card:scale-103"
                              sizes="(max-width: 768px) 100vw, 400px"
                            />
                          </div>
                        )}
                        <div className="story-content">
                          <div className="story-tag">{rc.category}</div>
                          <h3>{rc.title}</h3>
                          <p>{rc.excerpt}</p>
                          <Link
                            href={typeof rc.slug === "string" ? `/case-studies/${rc.slug}` : `/case-studies/${rc.slug?.current || ""}`}
                            className="story-link group/link"
                          >
                            Read case study
                            <span className="inline-block transition-transform duration-300 group-hover/link:translate-x-1.5 group-hover/card:translate-x-1 ml-1.5">→</span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Navigation Arrows inline above */}
          </div>

          {/* Indicator dots */}
          {relatedCases.length > visibleCount && (
            <div className="flex justify-center gap-2 mt-8">
              {Array.from({ length: relatedCases.length - visibleCount + 1 }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    currentIndex === idx ? "w-6 bg-[#ff5c00]" : "w-2.5 bg-slate-200 hover:bg-slate-300"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* FAQ ACCORDION */}
      <section className="band-dim" id="faq">
        <div className="wrap">
          <Reveal className="section-head">
            <div className="section-eyebrow">FAQ</div>
            <h2>Frequently asked questions.</h2>
          </Reveal>
          <Reveal className="section-body">
            <div className="spacer" />
            <div className="w-full">
              {faqs.map((f, i) => (
                <FaqItem key={i} question={f.question} answer={f.answer} />
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* FINAL CTA */}
      <LightContactSection />

      {/* LIGHTBOX MODAL OVERLAY */}
      {lightboxIndex !== null && (
        <div 
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/90 backdrop-blur-md p-4 transition-all duration-300"
          onClick={() => setLightboxIndex(null)}
        >
          {/* Close button */}
          <button 
            className="absolute top-6 right-6 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-all text-2xl font-light"
            onClick={(e) => {
              e.stopPropagation()
              setLightboxIndex(null)
            }}
            aria-label="Close lightbox"
          >
            &times;
          </button>

          {/* Prev button */}
          <button 
            className="absolute left-6 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            onClick={(e) => {
              e.stopPropagation()
              setLightboxIndex((prev) => (prev === null ? null : (prev - 1 + galleryItems.length) % galleryItems.length))
            }}
            aria-label="Previous image"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          {/* Image container */}
          <div 
            className="relative max-w-[85vw] max-h-[75vh] aspect-[16/10] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <Image 
              src={galleryItems[lightboxIndex].url}
              alt={galleryItems[lightboxIndex].alt || "Showcase screenshot"}
              fill
              className="object-contain rounded-lg"
              sizes="85vw"
            />
          </div>

          {/* Caption */}
          {galleryItems[lightboxIndex].caption && (
            <div 
              className="mt-6 text-center text-sm font-semibold tracking-wide text-white/90 max-w-2xl px-4"
              onClick={(e) => e.stopPropagation()}
            >
              {galleryItems[lightboxIndex].caption}
            </div>
          )}

          {/* Next button */}
          <button 
            className="absolute right-6 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            onClick={(e) => {
              e.stopPropagation()
              setLightboxIndex((prev) => (prev === null ? null : (prev + 1) % galleryItems.length))
            }}
            aria-label="Next image"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Slides counter indicator */}
          <div className="absolute bottom-6 text-sm text-white/60 font-mono">
            {lightboxIndex + 1} / {galleryItems.length}
          </div>
        </div>
      )}
    </article>
  )
}

// Inner Accordion Item Component
function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className={`faq-item ${isOpen ? "open" : ""}`}>
      <button className="faq-q" onClick={() => setIsOpen(!isOpen)}>
        <span className="faq-q-text">{question}</span>
        <span className="faq-icon">+</span>
      </button>
      <div className="faq-a">
        <div className="faq-a-inner">{answer}</div>
      </div>
    </div>
  )
}

// Inner Counter Cell Component (Tally counter counts up when visible)
function CounterCell({ targetValue, label }: { targetValue: string; label: string }) {
  const hasDigits = (str: string) => /\d/.test(str)
  
  const finalValue = !hasDigits(targetValue) && hasDigits(label) ? label : targetValue
  const finalLabel = !hasDigits(targetValue) && hasDigits(label) ? targetValue : label

  const isNumeric = hasDigits(finalValue)

  // Track decimal places if present
  const decimalMatches = finalValue.match(/\.(\d+)/)
  const decimalPlaces = decimalMatches ? decimalMatches[1].length : 0

  const [count, setCount] = useState(0)
  const [showTick, setShowTick] = useState(false)
  const cellRef = useRef<HTMLDivElement>(null)
  const animated = useRef(false)

  // Extract non-numeric prefix and suffix
  const prefix = finalValue.match(/^[^\d]+/)?.[0] || ""
  const suffix = finalValue.match(/[^\d]+$/)?.[0] || ""
  
  // Extract number including decimals
  const numericMatch = finalValue.match(/\d+(\.\d+)?/)
  const num = numericMatch ? parseFloat(numericMatch[0]) : 0

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animated.current) {
            animated.current = true
            observer.disconnect()

            if (num === 0) {
              setCount(0)
              setShowTick(true)
              return
            }

            const duration = 1100
            const startTime = performance.now()
            let frameId: number

            const step = (now: number) => {
              const elapsed = now - startTime
              const progress = Math.min(elapsed / duration, 1)
              const eased = 1 - Math.pow(1 - progress, 3) // Cubic ease-out
              setCount(eased * num)

              if (progress < 1) {
                frameId = requestAnimationFrame(step)
              } else {
                setCount(num)
                setShowTick(true)
              }
            }
            frameId = requestAnimationFrame(step)
            return () => cancelAnimationFrame(frameId)
          }
        })
      },
      { threshold: 0.5 }
    )

    if (cellRef.current) observer.observe(cellRef.current)
    return () => observer.disconnect()
  }, [num])

  return (
    <div ref={cellRef} className="register-cell">
      <div className="register-num">
        {isNumeric ? (
          <>
            {prefix && <span className="prefix">{prefix}</span>}
            <span className="count">{count.toFixed(decimalPlaces)}</span>
            {suffix && <span className="pct">{suffix}</span>}
          </>
        ) : (
          <span>{finalValue}</span>
        )}
        <span className={`tick-mark ${showTick ? "show" : ""}`}>
          <svg viewBox="0 0 12 12" fill="none">
            <path d="M2 6.5L4.5 9L10 3" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
      <div className="register-label">{finalLabel}</div>
    </div>
  )
}

// Inner Reveal Component (Trigger CSS animations when entry is intersecting)
function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.12 }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className={`reveal ${isVisible ? "in" : ""} ${className}`}>
      {children}
    </div>
  )
}
