"use client";

import { useState, useRef, useEffect } from "react";

type Message = {
  text: string;
  bot: boolean;
};

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Hi there! 👋 I'm the Softree Assistant. How can I help you today?",
      bot: true,
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [open]);

  const sendMessage = async (text = input) => {
  const trimmed = text.trim();
  if (!trimmed || loading) return;

  // ✅ Create updated messages FIRST
  const updatedMessages = [...messages, { text: trimmed, bot: false }];

  setMessages(updatedMessages);
  setInput("");
  setLoading(true);

  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: trimmed,
        history: updatedMessages, // ✅ FIXED
      }),
    });

    if (!res.ok) throw new Error("API error");

    const data = await res.json();

    setMessages((prev) => [
      ...prev,
      { text: data.reply, bot: true },
    ]);
  } catch {
    setMessages((prev) => [
      ...prev,
      {
        text: "⚠️ Something went wrong. Please try again or email us at sales@softreetechnology.com",
        bot: true,
      },
    ]);
  } finally {
    setLoading(false);
  }
};

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const suggestions = ["Our services", "Get a quote", "Contact us", "Pricing"];

  return (
    <>
      {/* Floating toggle button */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        style={{
          position: "fixed",
          bottom: "24px",
          right: "24px",
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          background: "#2f2727",
          border: "none",
          cursor: "pointer",
          boxShadow: "0 6px 20px rgba(0,0,0,0.2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          transition: "all 0.3s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-6px)";
          e.currentTarget.style.boxShadow = "0 12px 25px rgba(0,0,0,0.3)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.2)";
        }}
      >
        <img
          src="/images/chat.jfif"
          alt="Chatbot"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: "50%",
          }}
        />
      </button>
      {/* Chat window */}
      {open && (
        <div
          style={{
            position: "fixed",
            bottom: "92px",
            right: "24px",
            width: "360px",
            maxHeight: "560px",
            background: "#ffffff",
            borderRadius: "16px",
            boxShadow: "0 8px 40px rgba(0,0,0,0.18)",
            display: "flex",
            flexDirection: "column",
            zIndex: 999999,
            fontFamily:
              "'DM Sans', 'Segoe UI', system-ui, -apple-system, sans-serif",
            overflow: "hidden",
            animation: "slideUp 0.25s ease",
          }}
        >
          <style>{`
            @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&display=swap');
            @keyframes slideUp {
              from { opacity: 0; transform: translateY(16px); }
              to { opacity: 1; transform: translateY(0); }
            }
            @keyframes bounce {
              0%, 60%, 100% { transform: translateY(0); }
              30% { transform: translateY(-5px); }
            }
            .sc-chip:hover { background: #f0faf5 !important; border-color: #1a7a4a !important; color: #1a7a4a !important; }
            .sc-send-btn:hover { background: #155f3a !important; }
            .sc-input:focus { outline: none; border-color: #1a7a4a !important; box-shadow: 0 0 0 3px rgba(26,122,74,0.12); }
          `}</style>

          {/* Header */}
          <div
            style={{
              background: "linear-gradient(135deg, #1a7a4a 0%, #22a060 100%)",
              padding: "16px",
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                background: "rgba(255,255,255,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                <path d="M17 8C8 10 5.9 16.17 3.82 20.48L5.71 21l1-2.3A4.49 4.49 0 0 0 8 19c8 0 12-8 12-8s-4-4-3-3z" />
              </svg>
            </div>
            <div style={{ flex: 1 }}>
              <div
                style={{
                  color: "white",
                  fontWeight: 600,
                  fontSize: "15px",
                  lineHeight: 1.2,
                }}
              >
                Softree Assistant
              </div>
              <div
                style={{
                  color: "rgba(255,255,255,0.8)",
                  fontSize: "12px",
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  marginTop: "2px",
                }}
              >
                <span
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    background: "#6ee7a8",
                    display: "inline-block",
                  }}
                />
                Online now
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              style={{
                background: "rgba(255,255,255,0.15)",
                border: "none",
                borderRadius: "50%",
                width: "28px",
                height: "28px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "16px 14px",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              background: "#f8faf9",
              minHeight: "200px",
              maxHeight: "340px",
            }}
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: msg.bot ? "flex-start" : "flex-end",
                  gap: "8px",
                  alignItems: "flex-end",
                }}
              >
                {msg.bot && (
                  <div
                    style={{
                      width: "26px",
                      height: "26px",
                      borderRadius: "50%",
                      background: "#1a7a4a",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <svg
                      width="13"
                      height="13"
                      viewBox="0 0 24 24"
                      fill="white"
                    >
                      <path d="M17 8C8 10 5.9 16.17 3.82 20.48L5.71 21l1-2.3A4.49 4.49 0 0 0 8 19c8 0 12-8 12-8s-4-4-3-3z" />
                    </svg>
                  </div>
                )}
                <div
                  style={{
                    maxWidth: "75%",
                    padding: "9px 13px",
                    borderRadius: msg.bot
                      ? "4px 14px 14px 14px"
                      : "14px 4px 14px 14px",
                    background: msg.bot ? "#ffffff" : "#1a7a4a",
                    color: msg.bot ? "#1a1a1a" : "#ffffff",
                    fontSize: "13.5px",
                    lineHeight: "1.55",
                    boxShadow: msg.bot
                      ? "0 1px 4px rgba(0,0,0,0.08)"
                      : "0 2px 8px rgba(26,122,74,0.3)",
                    border: msg.bot ? "0.5px solid #e8ede9" : "none",
                  }}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {loading && (
              <div
                style={{
                  display: "flex",
                  gap: "8px",
                  alignItems: "flex-end",
                }}
              >
                <div
                  style={{
                    width: "26px",
                    height: "26px",
                    borderRadius: "50%",
                    background: "#1a7a4a",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="white">
                    <path d="M17 8C8 10 5.9 16.17 3.82 20.48L5.71 21l1-2.3A4.49 4.49 0 0 0 8 19c8 0 12-8 12-8s-4-4-3-3z" />
                  </svg>
                </div>
                <div
                  style={{
                    background: "#ffffff",
                    border: "0.5px solid #e8ede9",
                    borderRadius: "4px 14px 14px 14px",
                    padding: "11px 14px",
                    display: "flex",
                    gap: "4px",
                    alignItems: "center",
                    boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
                  }}
                >
                  {[0, 0.2, 0.4].map((delay, i) => (
                    <span
                      key={i}
                      style={{
                        width: "6px",
                        height: "6px",
                        borderRadius: "50%",
                        background: "#9bc4ae",
                        display: "inline-block",
                        animation: `bounce 1.2s ${delay}s infinite`,
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Quick suggestions — show only at start */}
          {messages.length <= 1 && (
            <div
              style={{
                padding: "8px 14px 4px",
                display: "flex",
                flexWrap: "wrap",
                gap: "6px",
                background: "#f8faf9",
                borderTop: "0.5px solid #e8ede9",
              }}
            >
              {suggestions.map((s) => (
                <button
                  key={s}
                  className="sc-chip"
                  onClick={() => sendMessage(s)}
                  style={{
                    background: "#ffffff",
                    border: "0.5px solid #c8ddd0",
                    borderRadius: "12px",
                    padding: "5px 11px",
                    fontSize: "12px",
                    color: "#3a6b50",
                    cursor: "pointer",
                    transition: "all 0.15s ease",
                    fontFamily: "inherit",
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Input area */}
          <div
            style={{
              padding: "12px 14px",
              borderTop: "0.5px solid #e8ede9",
              display: "flex",
              gap: "8px",
              alignItems: "center",
              background: "#ffffff",
            }}
          >
            <input
              ref={inputRef}
              className="sc-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a message…"
              disabled={loading}
              style={{
                flex: 1,
                padding: "9px 14px",
                borderRadius: "20px",
                border: "0.5px solid #d0ddd5",
                fontSize: "13.5px",
                fontFamily: "inherit",
                background: "#f8faf9",
                color: "#1a1a1a",
                transition: "border-color 0.2s, box-shadow 0.2s",
              }}
            />
            <button
              className="sc-send-btn"
              onClick={() => sendMessage()}
              disabled={loading || !input.trim()}
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                background: input.trim() ? "#1a7a4a" : "#c8ddd0",
                border: "none",
                cursor: input.trim() ? "pointer" : "default",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                transition: "background 0.2s ease",
              }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="white">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
              </svg>
            </button>
          </div>

          {/* Branding */}
          <div
            style={{
              textAlign: "center",
              fontSize: "11px",
              color: "#9ab0a4",
              padding: "4px 0 8px",
              background: "#ffffff",
            }}
          >
            Powered by Softree AI
          </div>
        </div>
      )}
    </>
  );
}
