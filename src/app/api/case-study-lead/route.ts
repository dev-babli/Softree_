import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { email, studyTitle, studyCategory, studyHref } = body

    if (!email || !studyTitle) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const basicEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!basicEmailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 })
    }

    // ─── Send notification email via Web3Forms (no backend needed) ───
    const w3fKey = process.env.WEB3FORMS_ACCESS_KEY
    if (w3fKey) {
      await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: w3fKey,
          subject: `Case Study Lead: ${studyTitle}`,
          from_name: "Softree Case Studies",
          email,
          message: `New case study unlock request:\n\nEmail: ${email}\nStudy: ${studyTitle}\nCategory: ${studyCategory}\nPDF: ${studyHref}\nTimestamp: ${new Date().toISOString()}`,
        }),
      }).catch(() => {
        // Non-fatal — lead still captured in logs
      })
    }

    // ─── Log to console for server-side visibility ───
    console.log("[case-study-lead]", {
      email,
      studyTitle,
      studyCategory,
      studyHref,
      timestamp: new Date().toISOString(),
    })

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
