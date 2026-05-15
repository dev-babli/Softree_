import { proofItems } from "./react-web-data"

export function ReactProofStrip() {
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
