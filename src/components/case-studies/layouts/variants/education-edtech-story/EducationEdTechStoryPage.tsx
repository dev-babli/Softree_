"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { PortableText, type PortableTextComponents } from "@portabletext/react"
import type { CaseStudyLayoutData, Highlight, PTBlock } from "../../types"
import LightContactSection from "@/components/homepage-light/LightContactSection"
import "./education-edtech-story.css"

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
    ? data.related.slice(0, 3)
    : [
        { category: "Manufacturing", title: "Employee Leave Management System for Manufacturing Enterprise", excerpt: "A U.S. manufacturing company digitized leave workflows with Power Platform, cutting approval time by 80%.", slug: "employee-leave-management" },
        { category: "Manufacturing", title: "Power Apps Automation for Ceramic Manufacturing", excerpt: "Automated product lifecycle management, reducing manual effort by 60% and eliminating data inconsistencies.", slug: "power-apps-ceramic-manufacturing" },
        { category: "Manufacturing & Distribution", title: "Global Manufacturing Enterprise Test Automation", excerpt: "Automated SharePoint and SPFx testing with Selenium, reducing defects by 50% with a 98% pass rate.", slug: "sharepoint-enterprise-test-automation" },
      ]



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
                <a href="#contact" className="btn-primary">Schedule a consultation</a>
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
      <section>
        <div className="wrap">
          <Reveal className="section-head">
            <div className="section-eyebrow">{data.galleryHeading || "Visual Proof"}</div>
            <h2>{data.gallerySubheading || "What we shipped."}</h2>
          </Reveal>
          <Reveal className="section-body">
            <div className="spacer" />
            <div className="w-full">
              <div className={galleryItems.length === 1 ? "max-w-[800px] mx-auto" : "grid gap-12 sm:grid-cols-2"}>
                {galleryItems.map((item, idx) => {
                  return (
                    <div key={idx} className="flex flex-col items-center">
                      <div className="device-frame w-full">
                        <div className="screen">
                          <div className="relative aspect-[16/10] w-full">
                            <Image
                              src={item.url}
                              alt={item.alt || `Screenshot ${idx + 1}`}
                              fill
                              className="object-cover"
                              sizes="(max-width: 768px) 100vw, 680px"
                            />
                          </div>
                        </div>
                      </div>
                      {item.caption && (
                        <div className="showcase-caption" style={{ justifyContent: "center", marginTop: "24px" }}>
                          {item.caption}
                        </div>
                      )}
                    </div>
                  );
                })}
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
            <div className="stack-list w-full" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))" }}>
              {techStack.map((item, i) => (
                <div key={i} className="stack-item">
                  <div className="stack-chip">{item.chip}</div>
                  <div>
                    <div className="stack-name">{item.name}</div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* OTHER STORIES */}
      <section>
        <div className="wrap">
          <Reveal className="section-head">
            <div className="section-eyebrow">More Customer Stories</div>
            <h2>Other engagements worth a look.</h2>
          </Reveal>
          <Reveal className="stories-grid">
            {relatedCases.map((rc, i) => (
              <div key={i} className="story-card" onMouseMove={handleMouseMove}>
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
            ))}
          </Reveal>
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
  const [count, setCount] = useState(0)
  const [showTick, setShowTick] = useState(false)
  const cellRef = useRef<HTMLDivElement>(null)
  const animated = useRef(false)

  // Extract non-numeric prefix and suffix
  const prefix = targetValue.match(/^[^\d]+/)?.[0] || ""
  const suffix = targetValue.match(/[^\d]+$/)?.[0] || ""
  const num = parseInt(targetValue.replace(/[^0-9]/g, ""), 10) || 0

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
        {prefix && <span className="prefix">{prefix}</span>}
        <span className="count">{count}</span>
        {suffix && <span className="pct">{suffix}</span>}
        <span className={`tick-mark ${showTick ? "show" : ""}`}>
          <svg viewBox="0 0 12 12" fill="none">
            <path d="M2 6.5L4.5 9L10 3" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
      <div className="register-label">{label}</div>
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
