"use client"

import { Stack } from "@sanity/ui"
import { useFormValue } from "sanity"

type SeoPreviewInputProps = {
  siteUrl?: string
}

function pathForType(docType?: string, slug?: string): string {
  if (docType === "caseStudy") return slug ? `/case-studies/${slug}` : "/case-studies"
  if (docType === "marketingPage") return slug ? `/p/${slug}` : "/p"
  return slug ? `/blog/${slug}` : "/blog"
}

export default function SeoPreviewInput({ siteUrl = "https://www.softreetechnology.com" }: SeoPreviewInputProps) {
  const document = useFormValue([]) as {
    title?: string
    slug?: { current?: string }
    excerpt?: string
    metaTitle?: string
    metaDescription?: string
    ogImage?: { asset?: { url?: string } }
    mainImage?: { asset?: { url?: string } }
    mainImageUrl?: string
    _type?: string
  }

  const docType = document?._type
  const slug = document?.slug?.current
  const path = pathForType(docType, slug)
  const url = `${siteUrl.replace(/\/$/, "")}${path}`

  const title = document?.metaTitle || document?.title || "Untitled"
  const description =
    document?.metaDescription ||
    document?.excerpt ||
    "Add a meta description or excerpt to improve click-through rates."
  const image =
    document?.ogImage?.asset?.url ||
    document?.mainImage?.asset?.url ||
    document?.mainImageUrl ||
    `${siteUrl.replace(/\/$/, "")}/og-image.png`

  return (
    <Stack space={4}>
      <div
        style={{
          border: "1px solid var(--card-border-color)",
          borderRadius: 12,
          padding: 16,
          background: "var(--card-bg-color)",
        }}
      >
        <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 12, opacity: 0.7 }}>
          Google preview
        </div>
        <div style={{ color: "#1a0dab", fontSize: 18, lineHeight: 1.3 }}>{title}</div>
        <div style={{ color: "#006621", fontSize: 13, marginTop: 4 }}>{url}</div>
        <div style={{ color: "#545454", fontSize: 13, marginTop: 6, lineHeight: 1.5 }}>
          {description.slice(0, 160)}
          {description.length > 160 ? "…" : ""}
        </div>
      </div>

      <div
        style={{
          border: "1px solid var(--card-border-color)",
          borderRadius: 12,
          overflow: "hidden",
          background: "var(--card-bg-color)",
        }}
      >
        <div style={{ fontSize: 12, fontWeight: 600, padding: 16, opacity: 0.7 }}>
          Social preview
        </div>
        <img
          src={image}
          alt=""
          style={{ width: "100%", aspectRatio: "1200/630", objectFit: "cover", display: "block" }}
        />
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 11, opacity: 0.6, textTransform: "uppercase" }}>
            softreetechnology.com
          </div>
          <div style={{ fontWeight: 600, marginTop: 4 }}>{title}</div>
          <div style={{ fontSize: 13, opacity: 0.75, marginTop: 4, lineHeight: 1.5 }}>
            {description.slice(0, 120)}
            {description.length > 120 ? "…" : ""}
          </div>
        </div>
      </div>
    </Stack>
  )
}
