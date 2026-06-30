"use client"

import { useEffect, useRef, useState } from "react"
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
import type { CaseStudyLayoutData, Highlight, PTBlock } from "../../types"
import LightContactSection from "@/components/homepage-light/LightContactSection"
import "./education-edtech-story.css"

const getTechIconInfo = (name: string) => {
  const n = name.toLowerCase()
  
  if (n.includes("react native") || n.includes("mobile") || n.includes("android") || n.includes("ios") || n.includes("expo") || n.includes("swift") || n.includes("kotlin")) {
    return { Icon: Smartphone, color: "#3B82F6", bg: "#EFF6FF", border: "rgba(59, 130, 246, 0.2)" }
  }
  if (n.includes("react") || n.includes("next") || n.includes("front") || n.includes("vue") || n.includes("angular") || n.includes("tailwind") || n.includes("html") || n.includes("css")) {
    return { Icon: Atom, color: "#06B6D4", bg: "#ECFEFF", border: "rgba(6, 182, 212, 0.2)" }
  }
  if (n.includes("javascript") || n.includes("typescript") || n.includes("js") || n.includes("ts") || n.includes("node") || n.includes("express")) {
    return { Icon: Terminal, color: "#D97706", bg: "#FEF3C7", border: "rgba(217, 119, 6, 0.2)" }
  }
  if (n.includes("firebase") || n.includes("database") || n.includes("sql") || n.includes("mongodb") || n.includes("dataverse") || n.includes("postgres") || n.includes("cosmos")) {
    return { Icon: Database, color: "#0EA5E9", bg: "#F0F9FF", border: "rgba(14, 165, 233, 0.2)" }
  }
  if (n.includes("powerapps") || n.includes("power apps") || n.includes("power platform") || n.includes("canvas")) {
    return { Icon: Zap, color: "#7C3AED", bg: "#F5F3FF", border: "rgba(124, 58, 237, 0.2)" }
  }
  if (n.includes("power automate") || n.includes("automate") || n.includes("flow")) {
    return { Icon: Workflow, color: "#10B981", bg: "#ECFDF5", border: "rgba(16, 185, 129, 0.2)" }
  }
  if (n.includes("power bi") || n.includes("powerbi") || n.includes("fabric") || n.includes("analytics") || n.includes("reporting") || n.includes("dashboard")) {
    return { Icon: BarChart3, color: "#F59E0B", bg: "#FEF3C7", border: "rgba(245, 158, 11, 0.2)" }
  }
  if (n.includes("sharepoint") || n.includes("spfx") || n.includes("m365") || n.includes("microsoft 365") || n.includes("teams")) {
    return { Icon: Share2, color: "#0078D4", bg: "#EFF6FF", border: "rgba(0, 120, 212, 0.2)" }
  }
  if (n.includes("azure") || n.includes("aws") || n.includes("cloud") || n.includes("serverless")) {
    return { Icon: Cloud, color: "#2563EB", bg: "#EFF6FF", border: "rgba(37, 99, 235, 0.2)" }
  }
  if (n.includes("api") || n.includes("rest") || n.includes("net") || n.includes("c#") || n.includes("java") || n.includes("graphql")) {
    return { Icon: Code2, color: "#4F46E5", bg: "#EEF2FF", border: "rgba(79, 70, 229, 0.2)" }
  }
  if (n.includes("openai") || n.includes("ai") || n.includes("ml") || n.includes("python") || n.includes("llama") || n.includes("langchain") || n.includes("gpt") || n.includes("nlp") || n.includes("learning") || n.includes("intelligence")) {
    return { Icon: Brain, color: "#8B5CF6", bg: "#F5F3FF", border: "rgba(139, 92, 246, 0.2)" }
  }
  if (n.includes("devops") || n.includes("ci/cd") || n.includes("cicd") || n.includes("git") || n.includes("docker") || n.includes("kubernetes")) {
    return { Icon: GitBranch, color: "#EF4444", bg: "#FEF2F2", border: "rgba(239, 68, 68, 0.2)" }
  }
  if (n.includes("test") || n.includes("qa") || n.includes("selenium") || n.includes("playwright") || n.includes("cypress") || n.includes("automation")) {
    return { Icon: Bot, color: "#0D9488", bg: "#F0FDFA", border: "rgba(13, 148, 136, 0.2)" }
  }
  return { Icon: Layers, color: "#4B5563", bg: "#F3F4F6", border: "rgba(75, 85, 99, 0.2)" }
}

type Props = {
  data: CaseStudyLayoutData
}

// Scoped PortableText components for the notebook styled rendering
const notebookPortableTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p>{children}</p>,
    h3: ({ children }) => <h3>{children}</h3>,
    blockquote: ({ children }) => <p className="pull-quote">{children}</p>,
  },
}

export function EducationEdTechStoryPage({ data }: Props) {
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
    client: data.client || "Confidential Client",
    projectType: data.snapshot?.projectType || "Education Management System",
    region: data.snapshot?.region || "Asia-Pacific",
    duration: data.snapshot?.duration || "4 Months",
    teamSize: data.snapshot?.teamSize || "4 Devs · 1 Designer · 1 QA",
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
      question: "What challenges does an education management app solve?",
      answer: "An education management app centralizes attendance tracking, student records, examinations, communication, and learning resources into a single platform — reducing manual administration and improving operational efficiency for institutions.",
    },
    {
      question: "Why was React Native chosen for this app?",
      answer: "React Native enabled a single codebase for both Android and iOS, reducing development time, ensuring consistency across devices, and simplifying long-term maintenance.",
    },
    {
      question: "How does the platform improve attendance management?",
      answer: "The platform digitizes attendance tracking, letting teachers record attendance in real time while giving administrators instant access to reports and analytics — significantly reducing manual processing.",
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
  const relatedCases = data.related && data.related.length > 0
    ? data.related.slice(0, 6)
    : [
        { category: "Manufacturing", title: "Employee Leave Management System for Manufacturing Enterprise", excerpt: "A U.S. manufacturing company digitized leave workflows with Power Platform, cutting approval time by 80%.", slug: "employee-leave-management" },
        { category: "Manufacturing", title: "Power Apps Automation for Ceramic Manufacturing", excerpt: "Automated product lifecycle management, reducing manual effort by 60% and eliminating data inconsistencies.", slug: "power-apps-ceramic-manufacturing" },
        { category: "Manufacturing & Distribution", title: "Global Manufacturing Enterprise Test Automation", excerpt: "Automated SharePoint and SPFx testing with Selenium, reducing defects by 50% with a 98% pass rate.", slug: "sharepoint-enterprise-test-automation" },
        { category: "Healthcare", title: "Healthcare AI Test Automation for Patient Management Platform", excerpt: "Softree Technology helped a leading healthcare provider achieve 95% test automation coverage.", slug: "healthcare-ai-test-automation-patient-management-platform" },
        { category: "AI & Automation", title: "AI-Powered Website Performance Platform", excerpt: "Discover how Softree Technology's AI Performance Intelligence Report identifies conversion blockers.", slug: "ai-powered-website-performance-platform" },
      ]



  const [isPaused, setIsPaused] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const [activeShowcaseIndex, setActiveShowcaseIndex] = useState(0)

  // Autoplay slider effect (cycles through slides unless hovered)
  useEffect(() => {
    if (isPaused) return
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % relatedCases.length)
    }, 4500)
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
      <section className="hero" id="overview" style={{ paddingBottom: 0 }}>
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
            <div className="hero-right">
              <Reveal className="hero-image-wrap">
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-[rgba(20,33,61,0.08)] shadow-lg">
                  <Image
                    src={heroImageSrc}
                    alt={data.heroImageAlt || data.title}
                    fill
                    priority
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 560px"
                  />
                </div>
              </Reveal>
            </div>
          </div>

          <div className="register">
            <div className="register-row">
              {highlights.map((h, i) => (
                <CounterCell key={i} targetValue={h.value} label={h.label} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PROJECT META GRID */}
      <section style={{ paddingTop: "64px", paddingBottom: "64px" }}>
        <div className="wrap">
          <div className="section-body">
            <div className="spacer" />
            <Reveal className="w-full">
              <div className="meta-grid">
                <div className="meta-cell">
                  <div className="meta-label">Client</div>
                  <div className="meta-value">{meta.client}</div>
                </div>
                <div className="meta-cell">
                  <div className="meta-label">Industry</div>
                  <div className="meta-value">{meta.industry}</div>
                </div>
                <div className="meta-cell">
                  <div className="meta-label">Project type</div>
                  <div className="meta-value">{meta.projectType}</div>
                </div>
                <div className="meta-cell">
                  <div className="meta-label">Duration</div>
                  <div className="meta-value">{meta.duration}</div>
                </div>
                <div className="meta-cell">
                  <div className="meta-label">Team size</div>
                  <div className="meta-value">{meta.teamSize}</div>
                </div>
                <div className="meta-cell">
                  <div className="meta-label">End users</div>
                  <div className="meta-value">{meta.endUsers}</div>
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
            <h2>{data.challengeTitle || "Three separate systems were doing one job, badly."}</h2>
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
            <h2>{data.approachSummary || "One codebase, three roles, a single source of truth."}</h2>
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
            <h2>{data.gallerySubheading || "What we shipped."}</h2>
          </Reveal>
          <Reveal className="section-body">
            <div className="spacer" />
            <div className="w-full">
              <div 
                className="p-6 md:p-10 rounded-2xl border border-orange-600/40 shadow-xl w-full"
                style={{
                  backgroundColor: "#ff5c00",
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"), linear-gradient(135deg, #ff7a2f 0%, #ff5c00 100%)`,
                  backgroundBlendMode: "overlay",
                }}
              >
                <div className={galleryItems.length === 1 ? "max-w-[800px] mx-auto w-full" : "grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-8 md:gap-12 w-full"}>
                  
                  {/* Left Side: Large Active Screenshot */}
                  <div className="w-full">
                    <div className="lg:sticky lg:top-28 self-start w-full flex flex-col items-center">
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
                              className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                              sizes="(max-width: 768px) 100vw, 800px"
                            />
                            {/* Hover Overlay with expand hint */}
                            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                              <span className="text-white bg-[#ff5c00] px-4.5 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase shadow-md flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                Click to expand
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      {galleryItems[activeShowcaseIndex].caption && (
                        <div className="showcase-caption font-semibold mt-6 text-white text-center" style={{ justifyContent: "center" }}>
                          {galleryItems[activeShowcaseIndex].caption}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right Side: Smaller Previews Stack (Clickable Thumbnails) */}
                  {galleryItems.length > 1 && (
                    <div className="flex flex-col gap-4 w-full">
                      {galleryItems.map((item, idx) => {
                        const isActive = activeShowcaseIndex === idx;
                        return (
                          <div 
                            key={idx}
                            onClick={() => setActiveShowcaseIndex(idx)}
                            className={`flex items-center gap-4.5 p-3.5 rounded-xl border transition-all duration-200 cursor-pointer ${
                              isActive 
                                ? "border-white bg-white text-slate-900 shadow-md" 
                                : "border-white/10 bg-white/10 text-white/80 hover:bg-white/20 hover:border-white/20 hover:text-white"
                            }`}
                          >
                            {/* Thumbnail device preview */}
                            <div className="relative w-28 aspect-[16/10] shrink-0 overflow-hidden rounded-md border border-white/20">
                              <Image 
                                src={item.url}
                                alt={item.alt || `Thumbnail ${idx + 1}`}
                                fill
                                className="object-cover"
                                sizes="112px"
                              />
                            </div>
                            {/* Caption details */}
                            <div className="flex flex-col gap-1 min-w-0">
                              <span className={`text-xs uppercase font-mono tracking-wider font-bold ${
                                isActive ? "text-[#ff5c00]" : "text-white/70"
                              }`}>
                                Screenshot {String(idx + 1).padStart(2, "0")}
                              </span>
                              <span className={`text-[13px] font-semibold truncate ${
                                isActive ? "text-slate-900 font-bold" : "text-white"
                              }`}>
                                {item.caption || `Engagement Mockup ${idx + 1}`}
                              </span>
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
            <div className="section-eyebrow">The Outcome</div>
            <h2>What changed for the client.</h2>
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
            <div className="section-eyebrow">Reference Tech Stack</div>
            <h2>The full integration layer.</h2>
          </Reveal>
          <Reveal className="section-body">
            <div className="spacer" />
            <div className="flex flex-wrap justify-center gap-3 md:gap-4 max-w-4xl mx-auto w-full">
              {techStack.map((item, i) => {
                const { Icon } = getTechIconInfo(item.name)
                return (
                  <div
                    key={i}
                    className="inline-flex items-center gap-2.5 px-[18px] py-2.5 rounded-full text-white shadow-xs transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
                    style={{
                      backgroundColor: "#ff5c00",
                      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                      backgroundBlendMode: "overlay"
                    }}
                  >
                    <div
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white"
                    >
                      <Icon className="h-4 w-4" style={{ color: "#ff5c00" }} />
                    </div>
                    <span className="text-[13px] font-bold tracking-wide pr-1">
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
        className="relative overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="wrap">
          <div className="mb-8">
            <Reveal className="section-head !mb-0">
              <div className="section-eyebrow">More Customer Stories</div>
              <h2>Other engagements worth a look.</h2>
            </Reveal>
          </div>

          <div className="overflow-hidden w-full -mx-3 px-3">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${currentIndex * (100 / visibleCount)}%)`,
              }}
            >
              {relatedCases.map((rc, i) => (
                <div
                  key={i}
                  className="shrink-0 px-3 flex justify-center"
                  style={{
                    flex: `0 0 ${100 / visibleCount}%`,
                  }}
                >
                  <div className="story-card h-full max-w-3xl w-full" onMouseMove={handleMouseMove}>
                    <div className="story-tag">{rc.category}</div>
                    <h3>{rc.title}</h3>
                    <p>{rc.excerpt}</p>
                    <Link
                      href={typeof rc.slug === "string" ? `/case-studies/${rc.slug}` : `/case-studies/${rc.slug?.current || ""}`}
                      className="story-link"
                    >
                      Read case study →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
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

  const [count, setCount] = useState(0)
  const [showTick, setShowTick] = useState(false)
  const cellRef = useRef<HTMLDivElement>(null)
  const animated = useRef(false)

  // Extract non-numeric prefix and suffix
  const prefix = finalValue.match(/^[^\d]+/)?.[0] || ""
  const suffix = finalValue.match(/[^\d]+$/)?.[0] || ""
  const num = parseInt(finalValue.replace(/[^0-9]/g, ""), 10) || 0

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
              setCount(Math.round(eased * num))

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
            <span className="count">{count}</span>
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
