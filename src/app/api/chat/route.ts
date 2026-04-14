import OpenAI from "openai";
import { NextResponse } from "next/server";

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

export async function POST(req: Request) {
  try {
    console.log("🚀 API HIT");

    const body = await req.json();
    console.log("📩 BODY:", body);

    const { message, history } = body;

    // ❌ If no message
    if (!message) {
      console.log("❌ No message received");
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    // 🔑 Check API Key
    console.log(
      "🔑 KEY:",
      process.env.GROQ_API_KEY ? "Loaded ✅" : "Missing ❌"
    );

    // 🧠 System prompt
    const systemPrompt = {
      role: "system",
      content:
        "You are a helpful AI chatbot for a business website. Keep answers short, clear, and friendly.",
    };

    // 🔄 Convert frontend format → Groq format
    const formattedHistory = (history || []).map((msg: any) => ({
      role: msg.bot ? "assistant" : "user",
      content: msg.text,
    }));

    console.log("🧾 FORMATTED HISTORY:", formattedHistory);

    // 🗂️ Final messages
    const messages = [
      systemPrompt,
      ...formattedHistory,
      { role: "user", content: message },
    ];

    console.log("📤 FINAL MESSAGES:", messages);

    // 🤖 API Call
    const completion = await client.chat.completions.create({
      model: "llama-3.1-8b-instant", // ✅ stable model
      messages,
    });

    console.log("✅ RESPONSE:", completion);

    const reply =
      completion.choices?.[0]?.message?.content || "No response";

    return NextResponse.json({ reply });

  } catch (error: any) {
    console.error("🔥 FULL ERROR:", error);

    return NextResponse.json(
      {
        error: error?.message || "Something went wrong",
      },
      { status: 500 }
    );
  }
}