import Image from "next/image"
import { buildSteps } from "./react-web-data"

export function ReactBuildStory() {
  return (
    <section className="rw-section rw-build" aria-labelledby="react-web-build-title">
      <div className="rw-container rw-build-grid">
        <div className="rw-build-rail">
          <p className="rw-eyebrow">How Softree builds it</p>
          <h2 className="rw-heading" id="react-web-build-title">
            A React build path that keeps strategy and engineering in the same room.
          </h2>
          <p className="rw-copy">
            The motion should make the process feel deliberate: every scroll beat advances the buyer
            from confusion to a production-ready interface.
          </p>
          <div className="rw-build-visual" aria-hidden>
            {buildSteps.map((step) => (
              <div className="rw-build-visual-card" key={step.title}>
                <Image src={step.image} alt="" width={520} height={360} />
              </div>
            ))}
          </div>
        </div>

        <div className="rw-build-steps">
          {buildSteps.map((step, index) => (
            <article className="rw-build-step" key={step.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
