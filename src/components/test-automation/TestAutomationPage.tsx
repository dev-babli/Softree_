import { TestAutomationContact } from "./sections/TestAutomationContact"
import { TestAutomationFAQ } from "./sections/TestAutomationFAQ"
import { TestAutomationHero } from "./sections/TestAutomationHero"
import { TestAutomationPipeline } from "./sections/TestAutomationPipeline"
import { TestAutomationRiskLedger } from "./sections/TestAutomationRiskLedger"
import { TestAutomationServices } from "./sections/TestAutomationServices"
import { TestAutomationTrust } from "./sections/TestAutomationTrust"
import { TestAutomationWorkbench } from "./sections/TestAutomationWorkbench"
import { TestAutomationWhy } from "./sections/TestAutomationWhy"

type TestAutomationPageProps = {
  faqs: Array<{
    id: number
    serial: string
    question: string
    answer: string
  }>
}

/** AI-powered test automation service page — Narrative Workflow direction. */
export function TestAutomationPage({ faqs }: TestAutomationPageProps) {
  return (
    <div className="overflow-x-clip bg-white">
      <div className="test-automation-reveal">
        <TestAutomationHero />
      </div>
      <TestAutomationTrust />
      <TestAutomationRiskLedger />
      <TestAutomationServices />
      <TestAutomationPipeline />
      <TestAutomationWorkbench />
      <TestAutomationWhy />
      <TestAutomationFAQ faqs={faqs} />
      <TestAutomationContact />
    </div>
  )
}
