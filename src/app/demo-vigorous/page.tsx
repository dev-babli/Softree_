import type { Metadata } from "next"
import ClientExactPage from "@/components/client-exact/ClientExactPage"
import { seo } from "@/components/client-exact/vigorousContent"

/** Private lead-magnet page — direct URL only; excluded from sitemap and search. */
export const metadata: Metadata = {
  title: seo.title,
  description: seo.description,
  robots: {
    index: false,
    follow: false,
    nocache: true,
    noarchive: true,
    nosnippet: true,
    noimageindex: true,
    googleBot: {
      index: false,
      follow: false,
      noarchive: true,
      nosnippet: true,
      noimageindex: true,
    },
  },
}

export default function DemoVigorousRoute() {
  return <ClientExactPage />
}
