import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, phone, company, message, topic, sourceUrl } = body

    if (!email || !name) {
      return NextResponse.json({ error: "Name and email are required" }, { status: 400 })
    }

    const basicEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!basicEmailRegex.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email address" }, { status: 400 })
    }

    // Forward to Web3Forms if access key configured
    const w3fKey = process.env.WEB3FORMS_ACCESS_KEY
    if (w3fKey) {
      await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: w3fKey,
          subject: `New Consultation Request from Blog: ${topic || "General Consultation"}`,
          from_name: "Softree Blog Lead",
          name,
          email,
          phone: phone || "Not provided",
          company: company || "Not provided",
          message: `Topic/Interest: ${topic || "General"}\nSource Page: ${sourceUrl || "Blog"}\nMessage: ${message || "N/A"}\nTimestamp: ${new Date().toISOString()}`,
        }),
      }).catch((err) => {
        console.warn("[blog-lead] Web3Forms forward warning:", err)
      })
    }

    // Always log on server
    console.log("[blog-lead] New consultation lead received:", {
      name,
      email,
      phone,
      company,
      topic,
      sourceUrl,
      timestamp: new Date().toISOString(),
    })

    return NextResponse.json({
      success: true,
      message: "Thank you! Our engineering team will review your inquiry and get back to you shortly.",
    })
  } catch (error) {
    console.error("[blog-lead] API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
