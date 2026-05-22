"use client";

export default function TrustedBrandsMarquee() {
  const logos = [
    { name: "GO ERP", src: "/images/logo/goerp1.jpg" },
    { name: "Nuvento", src: "/images/logo/nuvento.jpg" },
<<<<<<< HEAD
    { name: "Snapon", src: "/images/logo/snapon.jpg" },
    { name: "Jonians", src: "/images/logo/jonians.jpg" },
    { name: "Export Control Group", src: "/images/logo/ecg.png" },
    { name: "SP Marketplace", src: "/images/logo/1.jpg" },
=======
    { name: "Kwiz Com", src: "/images/logo/kwiz.png" },
    { name: "Jonians", src: "/images/logo/jonians.jpg" },
    { name: "Export Control Group", src: "/images/logo/ecg.png" },
    { name: "SP Marketplace", src: "/images/logo/sp-marketplace.png" },
>>>>>>> origin/satabdi
    { name: "Bosch", src: "/images/logo/bosch.png" },

    // New Logos
    { name: "Emscale", src: "/images/logo/emscale_logo.png" },
    { name: "Link Innovation", src: "/images/logo/link-innovation.png" },
    { name: "Intellectt", src: "/images/logo/Intellectt_logo.png" },
  ];

  return (
    <section className="relative py-2 overflow-hidden bg-gradient-to-b from-zinc-50 via-white to-zinc-50">
      <style>{`
        /* ── Scroll track ── */
        .pp-logo-wrap {
          overflow: hidden;
          width: 100%;
          position: relative;
          padding: 1.5rem 0;
        }
        .pp-logo-wrap::before,
        .pp-logo-wrap::after {
          content: '';
          position: absolute;
          top: 0; bottom: 0;
          width: 120px;
          z-index: 2;
          pointer-events: none;
        }
        
        .pp-logo-track {
          display: flex;
          gap: 16px;
          width: max-content;
          animation: ppScrollLeft 25s linear infinite;
        }
        @keyframes ppScrollLeft {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        /* ── Logo card ── */
        .pp-logo-card {
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
          background: linear-gradient(
            145deg,
            rgba(30, 18, 8, 0.92) 0%,
            rgba(15, 10, 5, 0.96) 60%,
            rgba(40, 20, 5, 0.90) 100%
          );
          border: 1px solid rgba(255, 140, 60, 0.18);
          animation: ppCardGlow 2.8s ease-in-out infinite;
          transition: transform 0.3s, box-shadow 0.3s, border-color 0.3s;
        }
        .pp-logo-card:nth-child(2n) { animation-delay: 0.3s; }
        .pp-logo-card:nth-child(3n) { animation-delay: 0.6s; }
        .pp-logo-card:nth-child(4n) { animation-delay: 0.9s; }
        .pp-logo-card:nth-child(5n) { animation-delay: 1.2s; }
        .pp-logo-card:nth-child(6n) { animation-delay: 1.5s; }
        .pp-logo-card:nth-child(7n) { animation-delay: 1.8s; }

        @keyframes ppCardGlow {
          0%, 100% {
            box-shadow:
              0 0 10px 2px rgba(255, 120, 40, 0.28),
              0 0 24px 4px rgba(255, 80, 10, 0.14),
              0 4px 16px rgba(0,0,0,0.07);
            border-color: rgba(255, 140, 60, 0.35);
          }
          50% {
            box-shadow:
              0 0 32px 8px rgba(255, 120, 40, 0.60),
              0 0 64px 16px rgba(255, 60, 10, 0.28),
              0 8px 32px rgba(0,0,0,0.14);
            border-color: rgba(255, 150, 60, 0.85);
          }
        }

        /* Top-left gloss */
        .pp-logo-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0;
          width: 100%; height: 50%;
          background: linear-gradient(160deg, rgba(255,255,255,0.06) 0%, transparent 70%);
          border-radius: 18px 18px 0 0;
          pointer-events: none;
          z-index: 1;
        }

        /* Bottom inner orange bloom */
        .pp-logo-card::after {
          content: '';
          position: absolute;
          bottom: -10px;
          left: 50%;
          transform: translateX(-50%);
          width: 70%;
          height: 45px;
          background: radial-gradient(ellipse, rgba(255,100,30,0.28) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
          animation: ppBloomPulse 2.8s ease-in-out infinite;
        }
        .pp-logo-card:nth-child(2n)::after { animation-delay: 0.3s; }
        .pp-logo-card:nth-child(3n)::after { animation-delay: 0.6s; }
        .pp-logo-card:nth-child(4n)::after { animation-delay: 0.9s; }

        @keyframes ppBloomPulse {
          0%, 100% { opacity: 0.35; }
          50%       { opacity: 1; }
        }

        /* Thin top highlight line */
        .pp-card-shine {
          position: absolute;
          top: 0; left: 12%; right: 12%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,180,100,0.45), transparent);
          border-radius: 0 0 4px 4px;
          z-index: 3;
        }

        /* Logo image */
        .pp-logo-card img {
          height: 52px;
          width: auto;
          object-fit: contain;
          position: relative;
          z-index: 2;
          animation: ppLogoBreath 2.8s ease-in-out infinite;
        }
        .pp-logo-card:nth-child(2n) img { animation-delay: 0.3s; }
        .pp-logo-card:nth-child(3n) img { animation-delay: 0.6s; }
        .pp-logo-card:nth-child(4n) img { animation-delay: 0.9s; }

        @keyframes ppLogoBreath {
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

        /* Name label */
        .pp-logo-name {
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          position: relative;
          z-index: 2;
          animation: ppNameBreath 2.8s ease-in-out infinite;
        }
        .pp-logo-card:nth-child(2n) .pp-logo-name { animation-delay: 0.3s; }
        .pp-logo-card:nth-child(3n) .pp-logo-name { animation-delay: 0.6s; }
        .pp-logo-card:nth-child(4n) .pp-logo-name { animation-delay: 0.9s; }

        @keyframes ppNameBreath {
          0%, 100% { color: rgba(255,160,80,0.45); }
          50%       { color: rgba(255,160,80,0.95); }
        }
      `}</style>

      <div className="relative max-w-7xl mx-auto">
        <div className="relative bg-gradient-to-r from-black via-[#0f2f7a] to-black rounded-t-[80px] px-6 py-16 overflow-hidden">
          {/* Heading */}
          <div className="flex items-center gap-6 mb-12">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-zinc-300 to-transparent" />
            <p className="shrink-0 text-2xl font-semibold tracking-widest uppercase bg-white bg-clip-text text-transparent">
              Trusted by Partners &amp; Clients
            </p>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-zinc-400 to-transparent" />
          </div>

          {/* Infinite Scrolling Logos */}
          <div className="pp-logo-wrap">
            <div className="pp-logo-track">
              {[...logos, ...logos].map((logo, index) => (
                <div key={index} className="pp-logo-card">
                  <span className="pp-card-shine" />
                  <img src={logo.src} alt={logo.name} />
                  <span className="pp-logo-name">{logo.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
