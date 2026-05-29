#!/usr/bin/env tsx
import { createClient } from "@sanity/client"
import { createCanvas } from "@napi-rs/canvas"
import { getDocument } from "pdfjs-dist/legacy/build/pdf.mjs"
import { loadEnvConfig } from "@next/env"
import { get } from "https"
import { existsSync } from "fs"
import { readFile } from "fs/promises"
import { join } from "path"

type CaseStudyDoc = {
  _id: string
  title: string
  slug?: { current?: string }
  category?: string
  pdfUrl?: string
  body?: unknown[]
  mainImage?: unknown
}

type CaseStudyCategory = "web" | "mobile" | "power-platform" | "sharepoint"

type PdfSource = {
  category: CaseStudyCategory
  filename: string
  url: string
}

type PortableTextBlock = {
  _type: "block"
  _key: string
  style: "normal" | "h2"
  children: { _type: "span"; _key: string; text: string; marks: string[] }[]
  markDefs: unknown[]
}

function key() {
  return Math.random().toString(36).slice(2, 12)
}

const SITE_ORIGIN = "https://www.softreetechnology.com"
loadEnvConfig(process.cwd())

const config = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "1zmh4sfw",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-05-21",
  token: process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_API_TOKEN || "",
}

if (!config.token) {
  console.error("Missing SANITY_API_WRITE_TOKEN or SANITY_API_TOKEN.")
  process.exit(1)
}

const client = createClient({
  projectId: config.projectId,
  dataset: config.dataset,
  apiVersion: config.apiVersion,
  token: config.token,
  useCdn: false,
})

const PDF_SOURCES: PdfSource[] = [
  { category: "web", filename: "ShoppingEcommerce.pdf", url: "https://www.softreetechnology.com/wp-content/uploads/2024/12/ShoppingEcommerce.pdf" },
  { category: "web", filename: "PET_CARE.pdf", url: "https://www.softreetechnology.com/wp-content/uploads/2024/12/PET_CARE.pdf" },
  { category: "web", filename: "Business-Consultation-App-case-study-1.pdf", url: "https://www.softreetechnology.com/wp-content/uploads/2024/12/Business-Consultation-App-case-study-1.pdf" },
  { category: "web", filename: "Public-Blogging-Website-MERN.pdf", url: "https://www.softreetechnology.com/wp-content/uploads/2024/11/Public-Blogging-Website-Using-the-MERN-Stack.pdf" },
  { category: "web", filename: "FOOD-WINE-WEBSITE.pdf", url: "https://www.softreetechnology.com/wp-content/uploads/2024/11/FOOD-WINE-WEBSITE.pdf" },
  { category: "web", filename: "AUTOREPAIR-PRO.pdf", url: "https://www.softreetechnology.com/wp-content/uploads/2024/11/AUTOREPAIR-PRO.pdf" },
  { category: "web", filename: "EdTech-Management-Information-System.pdf", url: "https://www.softreetechnology.com/wp-content/uploads/2024/11/EdTech-Management-Information-System-.pdf" },
  { category: "web", filename: "NotevedAdmin.pdf", url: "https://www.softreetechnology.com/wp-content/uploads/2024/11/NotevedAdmin.docx.pdf" },
  { category: "web", filename: "Wellkies-Admin-Website.pdf", url: "https://www.softreetechnology.com/wp-content/uploads/2024/11/Website.docx.pdf" },
  { category: "web", filename: "LIVE-appointment-bookings.pdf", url: "https://www.softreetechnology.com/wp-content/uploads/2024/11/LIVE-appointment-bookings.docx.pdf" },
  { category: "mobile", filename: "Doctor-Appointment-Booking.pdf", url: "https://www.softreetechnology.com/wp-content/uploads/2024/11/Building-a-Doctor-Appointment-Booking-System-with-React.pdf" },
  { category: "mobile", filename: "Education-App-Backend.pdf", url: "https://www.softreetechnology.com/wp-content/uploads/2024/11/Behind-the-Scenes-of-E.pdf" },
  { category: "mobile", filename: "Movie-Ticket-Booking-App.pdf", url: "https://www.softreetechnology.com/wp-content/uploads/2024/11/Movie-Ticket-Booking-App-Backend-Documentation.pdf" },
  { category: "mobile", filename: "Payment-Gateway-Integration.pdf", url: "https://www.softreetechnology.com/wp-content/uploads/2024/11/Payment-Gateway-1.pdf" },
  { category: "mobile", filename: "Education-Mobile-App.pdf", url: "https://www.softreetechnology.com/wp-content/uploads/2024/09/Education-App.pdf" },
  { category: "mobile", filename: "Resort-Management-App.pdf", url: "https://www.softreetechnology.com/wp-content/uploads/2024/09/Resort-Management-.pdf" },
  { category: "mobile", filename: "Homi-Room-Rental-App.pdf", url: "https://www.softreetechnology.com/wp-content/uploads/2024/09/Homi-App.pdf" },
  { category: "mobile", filename: "Wellkies-Doctors-App.pdf", url: "https://www.softreetechnology.com/wp-content/uploads/2024/09/Wellkies-Doctor-Document.pdf" },
  { category: "mobile", filename: "Wellkies-Clinic-App.pdf", url: "https://www.softreetechnology.com/wp-content/uploads/2024/09/Wellkies-Clinic-App.pdf" },
  { category: "power-platform", filename: "Employee-Details-Tracking-System.pdf", url: "https://www.softreetechnology.com/wp-content/uploads/2024/12/Employee-Details-tracking-System.pdf" },
  { category: "power-platform", filename: "Health-Plan-Selector.pdf", url: "https://www.softreetechnology.com/wp-content/uploads/2024/12/Health-Plan-Selector-Mobile-Application.pdf" },
  { category: "power-platform", filename: "Projects-Portfolio-Management.pdf", url: "https://www.softreetechnology.com/wp-content/uploads/2024/12/Projects-Portfolio-ManagementMicrosoft-Dataverse.pdf" },
  { category: "power-platform", filename: "Students-Portal-Mobile-App.pdf", url: "https://www.softreetechnology.com/wp-content/uploads/2024/12/Students-Portal-Mobile-App.pdf" },
  { category: "power-platform", filename: "Ticket-Generation-Mobile-App.pdf", url: "https://www.softreetechnology.com/wp-content/uploads/2024/12/Ticket-Generation-Mobile-App.pdf" },
  { category: "power-platform", filename: "Interview-Managing-System.pdf", url: "https://www.softreetechnology.com/wp-content/uploads/2024/11/Interview-Managing-System.pdf" },
  { category: "sharepoint", filename: "Custom-Copy-Move-Panel-SPFx.pdf", url: "https://www.softreetechnology.com/wp-content/uploads/2025/03/Enhancing-SharePoint-List-Management-with-a-Custom-Copy-Move-Panel-Using-SPFx-and-Fluent-UI.pdf" },
  { category: "sharepoint", filename: "Managing-SharePoint-Folders-PowerApps.pdf", url: "https://www.softreetechnology.com/wp-content/uploads/2025/03/Managing-SharePoint-Library-Folders-with-Power-Apps-Updated-.pdf" },
  { category: "sharepoint", filename: "Dynamic-Navigation-Bar-SPFx.pdf", url: "https://www.softreetechnology.com/wp-content/uploads/2024/12/Creating-a-Dynamic-Navigation-Bar-using-SPFx-Application-Customizer.pdf" },
  { category: "sharepoint", filename: "Custom-Footer-SPFx.pdf", url: "https://www.softreetechnology.com/wp-content/uploads/2024/12/Enhancing-User-Experience-with-a-Custom-Footer-using-SPFx.pdf" },
  { category: "sharepoint", filename: "Global-Notification-Banner-SPFx.pdf", url: "https://www.softreetechnology.com/wp-content/uploads/2024/12/Implementing-a-Global-Notification-Banner-with-SPFx-Application-Customizer.pdf" },
  { category: "sharepoint", filename: "Browse-Documents-Panel-SPFx.pdf", url: "https://www.softreetechnology.com/wp-content/uploads/2024/12/Inside-a-panel-Browse-Document-From-file-explorer.pdf" },
  { category: "sharepoint", filename: "Parent-Panel-List-Library-Creation.pdf", url: "https://www.softreetechnology.com/wp-content/uploads/2024/12/SPFx-1.pdf" },
  { category: "sharepoint", filename: "Custom-Command-Extension-SPFx.pdf", url: "https://www.softreetechnology.com/wp-content/uploads/2025/03/The-Implementation-of-a-Custom-Command-Extension-in-the-SharePoint-Framework-1.pdf" },
]

const REQUEST_HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
  Accept: "application/pdf,*/*",
  Referer: "https://www.softreetechnology.com/",
}

function getArgValue(flag: string): string | undefined {
  const arg = process.argv.find((item) => item.startsWith(`${flag}=`))
  return arg?.split("=").slice(1).join("=")
}

const isDryRun = process.argv.includes("--dry-run")
const overwriteBody = process.argv.includes("--overwrite-body")
const overwriteMainImage = process.argv.includes("--overwrite-main-image")
const onlySlug = getArgValue("--slug")
const limit = Number(getArgValue("--limit") || "0")

function toSlugFromFilename(filename: string): string {
  return filename
    .replace(/\.pdf$/i, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

function toTitleFromFilename(filename: string): string {
  const raw = filename
    .replace(/\.pdf$/i, "")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/[_-]+/g, " ")
  return raw
    .split(" ")
    .filter(Boolean)
    .map((word) => {
      if (word.toUpperCase() === word && word.length <= 5) return word
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    })
    .join(" ")
}

function normalizePdfUrl(pdfUrl: string): string {
  if (pdfUrl.startsWith("http://") || pdfUrl.startsWith("https://")) return pdfUrl
  if (pdfUrl.startsWith("/")) return `${SITE_ORIGIN}${pdfUrl}`
  return `${SITE_ORIGIN}/${pdfUrl}`
}

function cleanLines(rawText: string): string[] {
  return rawText
    .replace(/\r/g, "")
    .split("\n")
    .map((line) => line.replace(/\s+/g, " ").trim())
    .filter(Boolean)
}

function looksLikeHeading(line: string): boolean {
  if (line.length < 5 || line.length > 90) return false
  if (line.endsWith(":")) return true
  const words = line.split(" ")
  const hasFewWords = words.length <= 9
  const mostlyUpper = line.replace(/[^A-Z]/g, "").length > line.length * 0.55
  return hasFewWords && mostlyUpper
}

function toPortableTextBlocks(rawText: string): PortableTextBlock[] {
  const lines = cleanLines(rawText)
  const blocks: PortableTextBlock[] = []

  for (const line of lines) {
    blocks.push({
      _type: "block",
      _key: key(),
      style: looksLikeHeading(line) ? "h2" : "normal",
      children: [
        {
          _type: "span",
          _key: key(),
          text: line,
          marks: [],
        },
      ],
      markDefs: [],
    })
  }

  return blocks.slice(0, 350)
}

function excerptFromBlocks(blocks: PortableTextBlock[]): string {
  const text = blocks
    .filter((block) => block.style === "normal")
    .slice(0, 4)
    .map((block) => block.children.map((child) => child.text).join(" "))
    .join(" ")
    .replace(/\s+/g, " ")
    .trim()

  return text.slice(0, 220)
}

async function renderFirstPagePreview(pdfBuffer: Buffer): Promise<Buffer> {
  const pdfDoc = await getDocument({ data: new Uint8Array(pdfBuffer) }).promise
  const page = await pdfDoc.getPage(1)
  const viewport = page.getViewport({ scale: 1.6 })

  const canvas = createCanvas(Math.ceil(viewport.width), Math.ceil(viewport.height))
  const context = canvas.getContext("2d")

  await page.render({
    canvasContext: context as never,
    viewport,
  }).promise

  return canvas.toBuffer("image/png")
}

async function extractPdfData(source: PdfSource) {
  const local = await readLocalPdfBuffer(source)
  const resolvedUrl = local?.resolvedUrl ?? normalizePdfUrl(source.url)
  const pdfBuffer = local?.buffer ?? (await downloadPdfBuffer(resolvedUrl))
  const extractedText = await extractTextFromPdf(pdfBuffer)
  const bodyBlocks = toPortableTextBlocks(extractedText)
  const previewBuffer = await renderFirstPagePreview(pdfBuffer)

  return { bodyBlocks, previewBuffer, resolvedUrl }
}

async function extractTextFromPdf(pdfBuffer: Buffer): Promise<string> {
  const pdfDoc = await getDocument({ data: new Uint8Array(pdfBuffer) }).promise
  const pageTexts: string[] = []

  for (let pageNumber = 1; pageNumber <= pdfDoc.numPages; pageNumber++) {
    const page = await pdfDoc.getPage(pageNumber)
    const textContent = await page.getTextContent()
    const pageText = textContent.items
      .map((item) => ("str" in item ? item.str : ""))
      .join(" ")
      .replace(/\s+/g, " ")
      .trim()

    if (pageText) {
      pageTexts.push(pageText)
    }
  }

  return pageTexts.join("\n")
}

async function readLocalPdfBuffer(
  source: PdfSource
): Promise<{ buffer: Buffer; resolvedUrl: string } | null> {
  const candidates = [
    {
      filePath: join(process.cwd(), "public", "pdf", source.category, source.filename),
      resolvedUrl: `/pdf/${source.category}/${source.filename}`,
    },
    {
      filePath: join(process.cwd(), "public", "pdf", source.filename),
      resolvedUrl: `/pdf/${source.filename}`,
    },
  ]

  for (const candidate of candidates) {
    if (!existsSync(candidate.filePath)) continue
    const buffer = await readFile(candidate.filePath)
    return { buffer, resolvedUrl: candidate.resolvedUrl }
  }

  return null
}

function downloadPdfBuffer(url: string): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    get(url, { headers: REQUEST_HEADERS }, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        const next = res.headers.location
        if (!next) {
          reject(new Error(`Redirect without location: ${url}`))
          return
        }
        downloadPdfBuffer(next).then(resolve).catch(reject)
        return
      }

      if (res.statusCode !== 200) {
        reject(new Error(`Failed to fetch PDF (${res.statusCode}): ${url}`))
        return
      }

      const chunks: Buffer[] = []
      res.on("data", (chunk) => chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk)))
      res.on("end", () => resolve(Buffer.concat(chunks)))
      res.on("error", (error) => reject(error))
    }).on("error", (error) => reject(error))
  })
}

async function run() {
  const allCaseStudies = await client.fetch<CaseStudyDoc[]>(
    `*[_type == "caseStudy"]{
      _id,
      title,
      slug,
      category,
      pdfUrl,
      body,
      mainImage
    } | order(_createdAt asc)`
  )

  const filteredSources = PDF_SOURCES
    .map((source) => ({
      ...source,
      slug: toSlugFromFilename(source.filename),
      title: toTitleFromFilename(source.filename),
    }))
    .filter((source) => (onlySlug ? source.slug === onlySlug : true))
    .slice(0, limit > 0 ? limit : undefined)

  if (filteredSources.length === 0) {
    console.log("No case studies matched the migration filters.")
    return
  }

  console.log(`Preparing ${filteredSources.length} PDF-backed case studies.`)

  for (const source of filteredSources) {
    const existing = allCaseStudies.find(
      (doc) =>
        doc.slug?.current === source.slug ||
        (doc.pdfUrl && normalizePdfUrl(doc.pdfUrl) === normalizePdfUrl(source.url))
    )

    const hasBody = Array.isArray(existing?.body) && existing.body.length > 0
    const hasMainImage = Boolean(existing?.mainImage)

    if (hasBody && !overwriteBody && hasMainImage && !overwriteMainImage) {
      console.log(`Skipping ${existing?.title || source.title} (already has body + image).`)
      continue
    }

    try {
      let docId = existing?._id
      console.log(`\nProcessing: ${source.title}`)
      const preferredPdfUrl = `/pdf/${source.category}/${source.filename}`

      if (!docId && !isDryRun) {
        const created = await client.create({
          _type: "caseStudy",
          title: source.title,
          slug: { _type: "slug", current: source.slug },
          category: source.category,
          pdfUrl: preferredPdfUrl,
          excerpt: `${source.title} case study`,
          publishedAt: new Date().toISOString(),
        })
        docId = created._id
      }

      const { bodyBlocks, previewBuffer, resolvedUrl } = await extractPdfData(source)

      if (bodyBlocks.length === 0) {
        console.log(`No text extracted from ${resolvedUrl}`)
      }

      if (isDryRun) {
        console.log(
          `Dry run: ${source.slug} -> ${bodyBlocks.length} text blocks extracted.`
        )
        continue
      }

      if (!docId) continue
      const patch = client.patch(docId).set({
        title: existing?.title || source.title,
        slug: { _type: "slug", current: source.slug },
        category: source.category,
        pdfUrl: resolvedUrl,
      })

      if (!hasBody || overwriteBody) {
        patch.set({ body: bodyBlocks })
        patch.setIfMissing({ excerpt: excerptFromBlocks(bodyBlocks) })
      }

      if (!hasMainImage || overwriteMainImage) {
        const uploadedImage = await client.assets.upload("image", previewBuffer, {
          filename: `${source.slug}-pdf-preview.png`,
          contentType: "image/png",
        })

        patch.set({
          mainImage: {
            _type: "image",
            asset: {
              _type: "reference",
              _ref: uploadedImage._id,
            },
            alt: `${source.title} PDF preview`,
          },
        })
      }

      await patch.commit()
      console.log(`Updated ${source.title}`)
    } catch (error) {
      if (!isDryRun && !existing?._id) {
        console.log(`Created metadata-only page for ${source.title}; PDF extraction failed.`)
      } else {
        console.error(`Failed ${source.title}:`, error)
      }
    }
  }

  console.log("\nMigration completed.")
}

run().catch((error) => {
  console.error(error)
  process.exit(1)
})
