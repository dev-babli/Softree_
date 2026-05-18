import { proofItems } from "./react-web-development-data"

export function ReactWebDevelopmentProofStrip() {
  return (
    <section className="rw-proof" aria-label="React development capabilities">
      <div className="rw-proof-track">
        {proofItems.map((item) => (
          <span className="rw-proof-item" key={item}>
            {item}
          </span>
        ))}
      </div>
    </section>
  )
}
