import { CheckCircle2 } from "lucide-react"
import { offers } from "./react-web-development-data"

export function ReactWebDevelopmentOfferSection() {
  return (
    <section className="rw-section rw-offers" aria-labelledby="react-web-offers-title">
      <div className="rw-container">
        <div className="rw-reveal">
          <p className="rw-eyebrow">Engagement paths</p>
          <h2 className="rw-heading" id="react-web-offers-title">
            Start with the level of React build your business actually needs.
          </h2>
        </div>

        <div className="rw-offer-grid">
          {offers.map((offer) => (
            <article className="rw-offer rw-reveal" key={offer.name}>
              <h3>{offer.name}</h3>
              <p>{offer.fit}</p>
              <ul>
                {offer.points.map((point) => (
                  <li key={point}>
                    <CheckCircle2 size={18} aria-hidden />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
