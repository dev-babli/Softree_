import Link from "next/link"
import { Rocket } from "lucide-react"

export function ReactWebDevelopmentFinalCTA() {
  return (
    <section className="rw-section rw-final" aria-labelledby="react-web-final-title">
      <div className="rw-container rw-final-panel">
        <div className="rw-reveal">
          <p className="rw-eyebrow">Build the page like the service deserves</p>
          <h2 className="rw-heading" id="react-web-final-title">
            Give your React service page the same engineering discipline you sell to clients.
          </h2>
          <p className="rw-copy">
            We can turn this route into a high-intent landing page with the right story, the right
            motion, and the right conversion path.
          </p>
        </div>
        <Link className="rw-button rw-button-primary rw-reveal" href="/contact">
          Start the React build <Rocket size={18} aria-hidden />
        </Link>
      </div>
    </section>
  )
}
