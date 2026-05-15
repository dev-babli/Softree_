import {
  Code2,
  Component,
  DatabaseZap,
  Gauge,
  Layers3,
  ShieldCheck,
  Workflow,
  type LucideIcon,
} from "lucide-react"
import { services, type ServiceIcon } from "./react-web-data"

const serviceIcons: Record<ServiceIcon, LucideIcon> = {
  code: Code2,
  layers: Layers3,
  component: Component,
  database: DatabaseZap,
  gauge: Gauge,
  shield: ShieldCheck,
  workflow: Workflow,
}

export function ReactServicesMatrix() {
  return (
    <section className="rw-section rw-services" aria-labelledby="react-web-services-title">
      <div className="rw-container">
        <div className="rw-services-head rw-reveal">
          <div>
            <p className="rw-eyebrow">What we build</p>
            <h2 className="rw-heading" id="react-web-services-title">
              The exact React services buyers expect from a serious web team.
            </h2>
          </div>
          <p className="rw-copy">
            Each service is designed to be useful on its own, but stronger when delivered as one
            connected frontend system.
          </p>
        </div>

        <div className="rw-service-grid">
          {services.map((service) => {
            const Icon = serviceIcons[service.icon]
            return (
              <article className={`rw-service rw-reveal ${service.span}`} key={service.title}>
                <Icon aria-hidden />
                <h3>{service.title}</h3>
                <p>{service.body}</p>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
