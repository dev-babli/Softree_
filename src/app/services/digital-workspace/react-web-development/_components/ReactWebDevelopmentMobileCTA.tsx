import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function ReactWebDevelopmentMobileCTA() {
  return (
    <Link className="rw-mobile-cta" href="/contact" aria-label="Book a React build call">
      Book call <ArrowRight size={16} aria-hidden />
    </Link>
  )
}
