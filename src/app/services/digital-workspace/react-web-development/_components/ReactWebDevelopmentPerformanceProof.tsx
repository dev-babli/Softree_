import { Gauge, Layers3, LineChart, ShieldCheck, type LucideIcon } from "lucide-react"
import { performanceChecks } from "./react-web-development-data"

const performanceIcons: LucideIcon[] = [Gauge, LineChart, Layers3, ShieldCheck]

export function ReactWebDevelopmentPerformanceProof() {
  return (
    <section className="rw-section rw-performance" aria-labelledby="react-web-performance-title">
      <div className="rw-container rw-performance-grid">
        <div className="rw-reveal">
          <p className="rw-eyebrow">Performance is part of the design</p>
          <h2 className="rw-heading" id="react-web-performance-title">
            The page can feel cinematic without behaving like a heavy demo.
          </h2>
          <p className="rw-copy">
            We keep the expensive animation moments rare, scoped, and purposeful. Everything else is
            readable, stable, and built to survive mobile devices.
          </p>
        </div>

        <div className="rw-vitals-board rw-reveal">
          {performanceChecks.map((check, index) => {
            const Icon = performanceIcons[index]
            return (
              <div className="rw-vital-row" key={check}>
                <div className="rw-vital-icon">
                  <Icon size={20} aria-hidden />
                </div>
                <p>{check}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
