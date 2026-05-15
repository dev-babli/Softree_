import { faqs } from "./react-web-data"

export function ReactFAQSection() {
  return (
    <section className="rw-section rw-faq" aria-labelledby="react-web-faq-title">
      <div className="rw-container rw-faq-grid">
        <div className="rw-reveal">
          <p className="rw-eyebrow">Decision support</p>
          <h2 className="rw-heading" id="react-web-faq-title">
            Clear answers before the first call.
          </h2>
        </div>

        <div className="rw-faq-list rw-reveal">
          {faqs.map((faq) => (
            <article className="rw-faq-item" key={faq.question}>
              <h3>{faq.question}</h3>
              <p>{faq.answer}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
