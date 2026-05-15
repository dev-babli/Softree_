import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, email, company, field, _gotcha } = body

    if (_gotcha) {
      return NextResponse.json({ ok: true })
    }

    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    const RESEND_API_KEY = process.env.RESEND_API_KEY
    const TO_EMAIL = process.env.CONTACT_EMAIL ?? "contact@softreetechnology.com"

    if (!RESEND_API_KEY) {
      console.error("[contact] RESEND_API_KEY not set — falling back to console log")
      console.log("[contact form submission]", { name, email, company, message: field })
      return NextResponse.json({ ok: true })
    }

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Softree Contact Form <noreply@softree.in>",
        to: [TO_EMAIL],
        reply_to: email,
        subject: `New enquiry from ${name ?? "Website visitor"} — Softree`,
        html: `
          <table style="font-family:system-ui,sans-serif;font-size:15px;color:#111;max-width:580px">
            <tr><td style="padding-bottom:12px"><strong>Name:</strong> ${name ?? "—"}</td></tr>
            <tr><td style="padding-bottom:12px"><strong>Email:</strong> <a href="mailto:${email}">${email}</a></td></tr>
            <tr><td style="padding-bottom:12px"><strong>Company:</strong> ${company ?? "—"}</td></tr>
            <tr><td style="padding-bottom:24px"><strong>Message:</strong><br/><pre style="white-space:pre-wrap;font-family:inherit">${field ?? "—"}</pre></td></tr>
            <tr><td style="font-size:12px;color:#888">Sent from softree.in contact form</td></tr>
          </table>
        `,
      }),
    })

    if (!res.ok) {
      const err = await res.text()
      console.error("[contact] Resend error:", err)
      return NextResponse.json({ error: "Failed to send" }, { status: 500 })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error("[contact] Unexpected error:", err)
    return NextResponse.json({ error: "Internal error" }, { status: 500 })
  }
}
