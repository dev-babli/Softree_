export default function TrustedBy() {
  const logos = [
    { name: "GO ERP", src: "/images/logo/goerp1.jpg" },
    { name: "Nuvento", src: "/images/logo/nuvento.jpg" },
    { name: "Snapon", src: "/images/logo/snapon.jpg" },
    { name: "Jonians", src: "/images/logo/jonians.jpg" },
    { name: "Export Control Group", src: "/images/logo/ecg.png" },
    { name: "SP Marketplace", src: "/images/logo/1.jpg" },
    { name: "Bosch", src: "/images/logo/bosch.png" },

    // New Logos
    { name: "Emscale", src: "/images/logo/emscale_logo.png" },
    { name: "Link Innovation", src: "/images/logo/link-innovation.png" },
    { name: "Intellectt", src: "/images/logo/Intellectt_logo.png" },
  ];

  return (
    <section className="relative pt-24 bg-gradient-to-b from-black via-[#020d1a] to-black text-white py-10">
      <style>{`
        .logo-track-wrap {
          overflow: hidden;
          width: 100%;
          position: relative;
          padding: 1.5rem 0;
        }
        .logo-track-wrap::before,
        .logo-track-wrap::after {
          content: '';
          position: absolute;
          top: 0; bottom: 0;
          width: 120px;
          z-index: 2;
          pointer-events: none;
        }
        .logo-track-wrap::before {
          left: 0;
          background: linear-gradient(to right, #ffffff, transparent);
        }
        .logo-track-wrap::after {
          right: 0;
          background: linear-gradient(to left, #ffffff, transparent);
        }

        .logo-track {
          display: flex;
          gap: 20px;
          width: max-content;
          animation: scrollLeft 25s linear infinite;
        }
        @keyframes scrollLeft {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .logo-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 10px;
          width: 160px;
          height: 120px;
          border-radius: 18px;
          position: relative;
          overflow: hidden;
          flex-shrink: 0;

          /* ✦ Dark glass background */
          background:
            linear-gradient(
              145deg,
              rgba(30, 18, 8, 0.92) 0%,
              rgba(15, 10, 5, 0.96) 60%,
              rgba(40, 20, 5, 0.90) 100%
            );
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);

          border: 1px solid rgba(255, 140, 60, 0.18);
          animation: cardGlow 2.8s ease-in-out infinite;
        }

        .logo-card:nth-child(2n) { animation-delay: 0.3s; }
        .logo-card:nth-child(3n) { animation-delay: 0.6s; }
        .logo-card:nth-child(4n) { animation-delay: 0.9s; }
        .logo-card:nth-child(5n) { animation-delay: 1.2s; }
        .logo-card:nth-child(6n) { animation-delay: 1.5s; }
        .logo-card:nth-child(7n) { animation-delay: 1.8s; }

        @keyframes cardGlow {
          0%, 100% {
            box-shadow:
              0 0 8px 2px rgba(255, 100, 30, 0.12),
              inset 0 0 18px rgba(255, 90, 20, 0.05),
              0 4px 20px rgba(0,0,0,0.4);
            border-color: rgba(255, 140, 60, 0.18);
          }
          50% {
            box-shadow:
              0 0 28px 6px rgba(255, 110, 30, 0.38),
              0 0 60px 12px rgba(255, 70, 10, 0.14),
              inset 0 0 30px rgba(255, 100, 30, 0.12),
              0 8px 32px rgba(0,0,0,0.5);
            border-color: rgba(255, 150, 70, 0.55);
          }
        }

        /* Top-left gloss */
        .logo-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0;
          width: 100%; height: 50%;
          background: linear-gradient(
            160deg,
            rgba(255, 255, 255, 0.06) 0%,
            transparent 70%
          );
          border-radius: 18px 18px 0 0;
          pointer-events: none;
          z-index: 1;
        }

        /* Bottom inner orange bloom */
        .logo-card::after {
          content: '';
          position: absolute;
          bottom: -10px;
          left: 50%;
          transform: translateX(-50%);
          width: 70%;
          height: 45px;
          background: radial-gradient(ellipse, rgba(255, 100, 30, 0.28) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
          animation: bloomPulse 2.8s ease-in-out infinite;
        }

        .logo-card:nth-child(2n)::after { animation-delay: 0.3s; }
        .logo-card:nth-child(3n)::after { animation-delay: 0.6s; }
        .logo-card:nth-child(4n)::after { animation-delay: 0.9s; }

        @keyframes bloomPulse {
          0%, 100% { opacity: 0.35; }
          50%       { opacity: 1; }
        }

        /* Thin top highlight line */
        .logo-card .card-shine {
          position: absolute;
          top: 0; left: 12%; right: 12%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,180,100,0.45), transparent);
          border-radius: 0 0 4px 4px;
          z-index: 3;
        }

        .logo-card img {
          height: 52px;
          width: auto;
          object-fit: contain;
          position: relative;
          z-index: 2;
          animation: logoBreath 2.8s ease-in-out infinite;
        }
        .logo-card:nth-child(2n) img { animation-delay: 0.3s; }
        .logo-card:nth-child(3n) img { animation-delay: 0.6s; }
        .logo-card:nth-child(4n) img { animation-delay: 0.9s; }

        @keyframes logoBreath {
          0%, 100% {
            opacity: 0.7;
            transform: scale(1);
            filter: brightness(1) drop-shadow(0 0 4px rgba(255,120,40,0.2));
          }
          50% {
            opacity: 1;
            transform: scale(1.07);
            filter: brightness(1.25) drop-shadow(0 0 10px rgba(255,120,40,0.55));
          }
        }

        .logo-card-name {
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          position: relative;
          z-index: 2;
          animation: nameBreath 2.8s ease-in-out infinite;
        }
        .logo-card:nth-child(2n) .logo-card-name { animation-delay: 0.3s; }
        .logo-card:nth-child(3n) .logo-card-name { animation-delay: 0.6s; }
        .logo-card:nth-child(4n) .logo-card-name { animation-delay: 0.9s; }

        @keyframes nameBreath {
          0%, 100% { color: rgba(255,160,80,0.45); }
          50%       { color: rgba(255,160,80,0.95); }
        }
      `}</style>

      <div className="relative max-w-7xl mx-auto">
        <div className="relative bg-white rounded-t-[80px] shadow-[0_-30px_80px_rgba(0,0,0,0.35)] px-6 py-16 overflow-hidden">
          {/* Heading */}
          <div className="flex items-center gap-6 mb-12">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-zinc-300 to-transparent" />
            <p
              className="shrink-0 text-2xl font-semibold tracking-widest uppercase inline-block bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, #ff7a2f 0%, #c75a2a 35%, #6b5b5b 70%, #3a3a3a 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Trusted by Partners &amp; Clients
            </p>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-zinc-400 to-transparent" />
          </div>

          {/* Infinite Scrolling Logos */}
          <div className="logo-track-wrap">
            <div className="logo-track">
              {[...logos, ...logos].map((logo, index) => (
                <div key={index} className="logo-card">
                  <span className="card-shine" />
                  <img src={logo.src} alt={logo.name} />
                  <span className="logo-card-name">{logo.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
