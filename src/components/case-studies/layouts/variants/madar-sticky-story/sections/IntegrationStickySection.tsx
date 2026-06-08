import { AccordionFeaturesList } from "../AccordionFeaturesList"
import { IntegrationDiagram } from "../IntegrationDiagram"
import type { MadarLayoutData } from "../types"

type Props = Pick<MadarLayoutData, "integrationHeading" | "integrationItems">

export function IntegrationStickySection({ integrationHeading, integrationItems }: Props) {
  return (
    <section className="madar-integration c-integration-sticky" data-madar-section="integration">
      <div className="madar-container">
        <div className="madar-integration__grid">
          <aside className="madar-integration__side">
            <div className="madar-integration__side-sticky">
              <IntegrationDiagram className="madar-integration__diagram" />
            </div>
          </aside>
          <div className="madar-integration__content">
            <IntegrationDiagram className="madar-integration__diagram madar-integration__diagram--mobile" />
            <h2 className="madar-integration__title">{integrationHeading}</h2>
            <AccordionFeaturesList items={integrationItems} variant="dark" wide />
          </div>
        </div>
      </div>
    </section>
  )
}
