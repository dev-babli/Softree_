export function ReactWebDevelopmentLandingStyles() {
  return (
    <style>{`
        .rw-page {
          --ink: #10120f;
          --muted: #5b6158;
          --paper: #f5f2ec;
          --soft: #ebe6dc;
          --dark: #080a0c;
          --dark-2: #101412;
          --line: rgba(16, 18, 15, 0.14);
          --line-dark: rgba(245, 242, 236, 0.14);
          --accent: #b9df72;
          width: 100%;
          max-width: 100%;
          overflow-x: hidden;
          background: var(--paper);
          color: var(--ink);
          font-family:
            Geist,
            Satoshi,
            var(--font-inter),
            system-ui,
            -apple-system,
            BlinkMacSystemFont,
            "Segoe UI",
            sans-serif;
        }

        .rw-page *,
        .rw-page *::before,
        .rw-page *::after {
          box-sizing: border-box;
        }

        .rw-section {
          position: relative;
          padding: clamp(84px, 12vw, 168px) clamp(20px, 5vw, 72px);
        }

        .rw-container {
          width: min(100%, 1440px);
          margin: 0 auto;
        }

        .rw-eyebrow {
          margin: 0 0 18px;
          color: var(--muted);
          font-size: 0.86rem;
          line-height: 1.4;
        }

        .rw-heading {
          max-width: 1120px;
          margin: 0;
          font-size: clamp(2.45rem, 6vw, 5.65rem);
          font-weight: 640;
          letter-spacing: 0;
          line-height: 0.98;
          text-wrap: balance;
        }

        .rw-copy {
          max-width: 720px;
          margin: 24px 0 0;
          color: var(--muted);
          font-size: clamp(1rem, 1.4vw, 1.22rem);
          line-height: 1.7;
        }

        .rw-hero {
          position: relative;
          min-height: 250dvh;
          background: var(--dark);
          color: var(--paper);
        }

        .rw-hero-pin {
          position: relative;
          display: grid;
          min-height: 100dvh;
          overflow: hidden;
          padding: 116px clamp(20px, 5vw, 72px) 56px;
          isolation: isolate;
        }

        .rw-hero-pin::before {
          content: "";
          position: absolute;
          inset: 0;
          z-index: -3;
          background:
            linear-gradient(90deg, rgba(255, 255, 255, 0.055) 1px, transparent 1px),
            linear-gradient(180deg, rgba(255, 255, 255, 0.045) 1px, transparent 1px);
          background-size: 96px 96px;
          opacity: 0.28;
        }

        .rw-hero-pin::after {
          content: "";
          position: absolute;
          inset: auto 0 0;
          z-index: -2;
          height: 34%;
          background: linear-gradient(180deg, transparent, rgba(185, 223, 114, 0.12));
        }

        .rw-hero-word {
          position: absolute;
          left: clamp(18px, 4vw, 64px);
          right: clamp(18px, 4vw, 64px);
          bottom: clamp(28px, 6vw, 86px);
          z-index: -1;
          color: rgba(245, 242, 236, 0.18);
          font-size: clamp(5rem, 19vw, 20rem);
          font-weight: 760;
          line-height: 0.78;
          letter-spacing: 0;
          white-space: nowrap;
          user-select: none;
        }

        .rw-hero-layout {
          display: grid;
          grid-template-columns: minmax(680px, 0.98fr) minmax(340px, 0.82fr);
          align-items: center;
          gap: clamp(28px, 4vw, 60px);
          width: min(100%, 1480px);
          margin: auto;
        }

        .rw-hero-copy {
          position: relative;
          z-index: 2;
          min-width: 0;
          max-width: 760px;
        }

        .rw-hero-copy h1 {
          max-width: 1120px;
          margin: 0;
          font-size: clamp(3rem, 5vw, 5.15rem);
          font-weight: 680;
          line-height: 0.94;
          letter-spacing: 0;
          text-wrap: balance;
        }

        .rw-title-chunk {
          display: inline;
        }

        .rw-hero-copy p {
          max-width: 650px;
          margin: 28px 0 0;
          color: rgba(245, 242, 236, 0.72);
          font-size: clamp(1rem, 1.35vw, 1.2rem);
          line-height: 1.75;
        }

        .rw-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 34px;
        }

        .rw-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          min-height: 48px;
          border-radius: 8px;
          padding: 0 18px;
          font-size: 0.96rem;
          font-weight: 620;
          text-decoration: none;
          touch-action: manipulation;
          -webkit-tap-highlight-color: rgba(185, 223, 114, 0.28);
          transition:
            transform 220ms ease,
            background 220ms ease,
            border-color 220ms ease,
            color 220ms ease;
        }

        .rw-button:focus-visible,
        .rw-mobile-cta:focus-visible {
          outline: 2px solid var(--accent);
          outline-offset: 4px;
        }

        .rw-button:active {
          transform: translateY(1px) scale(0.99);
        }

        .rw-button-primary {
          background: var(--accent);
          color: #11150f;
        }

        .rw-button-primary:hover {
          background: #cdf28b;
        }

        .rw-button-secondary {
          border: 1px solid rgba(245, 242, 236, 0.24);
          color: var(--paper);
        }

        .rw-button-secondary:hover {
          border-color: rgba(245, 242, 236, 0.48);
          background: rgba(245, 242, 236, 0.06);
        }

        .rw-portal-wrap {
          position: relative;
          min-width: 0;
          max-width: 100%;
          min-height: min(680px, 72dvh);
        }

        .rw-portal-shell {
          position: relative;
          width: min(100%, 650px);
          max-width: 100%;
          margin-left: auto;
          overflow: hidden;
          border: 1px solid rgba(245, 242, 236, 0.16);
          border-radius: 8px;
          background: #141815;
          box-shadow: 0 40px 120px rgba(0, 0, 0, 0.42);
          transform-origin: center center;
          will-change: transform;
        }

        .rw-product-frame {
          position: relative;
          display: grid;
          min-height: 520px;
          overflow: hidden;
          background:
            linear-gradient(135deg, rgba(185, 223, 114, 0.18), transparent 32%),
            linear-gradient(180deg, #1a201b, #0d100f);
        }

        .rw-product-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          min-height: 52px;
          border-bottom: 1px solid rgba(245, 242, 236, 0.1);
          padding: 0 18px;
          color: rgba(245, 242, 236, 0.62);
          font-size: 0.82rem;
        }

        .rw-product-top > span {
          min-width: 0;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .rw-window-dots {
          display: flex;
          gap: 7px;
        }

        .rw-window-dots span {
          width: 9px;
          height: 9px;
          border-radius: 999px;
          background: rgba(245, 242, 236, 0.22);
        }

        .rw-product-body {
          display: grid;
          grid-template-columns: 0.8fr 1.2fr;
          gap: 24px;
          padding: 28px;
        }

        .rw-product-stack,
        .rw-product-preview {
          border: 1px solid rgba(245, 242, 236, 0.12);
          border-radius: 8px;
          background: rgba(245, 242, 236, 0.055);
        }

        .rw-product-stack {
          display: grid;
          align-content: start;
          gap: 12px;
          padding: 16px;
        }

        .rw-product-line {
          height: 10px;
          border-radius: 999px;
          background: rgba(245, 242, 236, 0.18);
        }

        .rw-product-line:nth-child(1) {
          width: 68%;
          background: var(--accent);
        }

        .rw-product-line:nth-child(2) {
          width: 88%;
        }

        .rw-product-line:nth-child(3) {
          width: 54%;
        }

        .rw-product-line:nth-child(4) {
          width: 76%;
        }

        .rw-product-preview {
          position: relative;
          min-width: 0;
          min-height: 360px;
          overflow: hidden;
          padding: 18px;
        }

        .rw-product-preview img {
          width: 100%;
          height: auto;
        }

        .rw-portal-detail {
          position: absolute;
          right: 18px;
          bottom: 18px;
          max-width: 280px;
          border: 1px solid rgba(245, 242, 236, 0.14);
          border-radius: 8px;
          background: rgba(8, 10, 12, 0.82);
          padding: 16px;
          color: var(--paper);
        }

        .rw-portal-detail strong {
          display: block;
          margin-bottom: 8px;
          font-size: 0.92rem;
        }

        .rw-portal-detail span {
          display: block;
          color: rgba(245, 242, 236, 0.68);
          font-size: 0.8rem;
          line-height: 1.55;
        }

        .rw-hero-reveal {
          position: absolute;
          left: clamp(20px, 5vw, 72px);
          bottom: clamp(28px, 5vw, 72px);
          z-index: 3;
          max-width: 520px;
          color: var(--paper);
        }

        .rw-hero-reveal p {
          margin: 0;
          color: rgba(245, 242, 236, 0.72);
          font-size: clamp(1rem, 1.4vw, 1.28rem);
          line-height: 1.65;
        }

        .rw-proof {
          border-bottom: 1px solid var(--line);
          background: #fffdf7;
          padding: 22px clamp(20px, 5vw, 72px);
        }

        .rw-proof-track {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          width: min(100%, 1440px);
          margin: 0 auto;
        }

        .rw-proof-item {
          border: 1px solid var(--line);
          border-radius: 8px;
          padding: 10px 13px;
          background: rgba(245, 242, 236, 0.64);
          color: #30352f;
          font-size: 0.9rem;
        }

        .rw-split {
          display: grid;
          grid-template-columns: minmax(0, 0.95fr) minmax(0, 1.05fr);
          gap: clamp(36px, 7vw, 112px);
          align-items: start;
        }

        .rw-pain-list {
          display: grid;
          gap: 1px;
          border: 1px solid var(--line);
          border-radius: 8px;
          overflow: hidden;
          background: var(--line);
        }

        .rw-pain-card {
          background: #fffdf7;
          padding: clamp(22px, 3vw, 34px);
        }

        .rw-pain-card h3,
        .rw-service h3,
        .rw-offer h3,
        .rw-faq-item h3 {
          margin: 0;
          font-size: clamp(1.2rem, 1.8vw, 1.62rem);
          line-height: 1.15;
          letter-spacing: 0;
        }

        .rw-pain-card p,
        .rw-service p,
        .rw-offer p,
        .rw-faq-item p {
          margin: 14px 0 0;
          color: var(--muted);
          font-size: 0.98rem;
          line-height: 1.65;
        }

        .rw-comparison {
          min-height: 100dvh;
          background: var(--dark);
          color: var(--paper);
          padding: clamp(84px, 10vw, 130px) clamp(20px, 5vw, 72px);
        }

        .rw-comparison-grid {
          display: grid;
          grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.2fr);
          gap: clamp(34px, 5vw, 72px);
          align-items: center;
          width: min(100%, 1440px);
          margin: 0 auto;
        }

        .rw-comparison .rw-eyebrow,
        .rw-comparison .rw-copy,
        .rw-build .rw-eyebrow,
        .rw-build .rw-copy,
        .rw-final .rw-copy {
          color: rgba(245, 242, 236, 0.68);
        }

        .rw-comparison-window {
          position: relative;
          min-height: 620px;
          overflow: hidden;
          border: 1px solid var(--line-dark);
          border-radius: 8px;
          background: #121614;
        }

        .rw-compare-panel {
          position: absolute;
          inset: 0;
          display: grid;
          align-content: center;
          gap: 24px;
          padding: clamp(22px, 4vw, 44px);
          overflow: hidden;
        }

        .rw-before-panel {
          background:
            linear-gradient(135deg, rgba(255, 255, 255, 0.1), transparent 35%),
            #161817;
        }

        .rw-after-shell {
          background:
            linear-gradient(135deg, rgba(185, 223, 114, 0.24), transparent 42%),
            #11180f;
          will-change: transform;
        }

        .rw-after-inner {
          display: grid;
          align-content: center;
          gap: 24px;
          height: 100%;
          will-change: transform;
        }

        .rw-before-grid,
        .rw-after-grid {
          display: grid;
          grid-template-columns: 0.8fr 1.2fr;
          gap: 22px;
          align-items: center;
        }

        .rw-comparison h3 {
          margin: 0;
          font-size: clamp(1.7rem, 3vw, 3.1rem);
          line-height: 1;
          letter-spacing: 0;
        }

        .rw-comparison p {
          max-width: 510px;
          margin: 16px 0 0;
          color: rgba(245, 242, 236, 0.68);
          line-height: 1.65;
        }

        .rw-asset-card {
          display: grid;
          place-items: center;
          min-height: 340px;
          border: 1px solid rgba(245, 242, 236, 0.13);
          border-radius: 8px;
          background: rgba(245, 242, 236, 0.055);
          padding: 24px;
        }

        .rw-asset-card img {
          width: min(100%, 440px);
          height: auto;
        }

        .rw-compare-handle {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          width: 2px;
          background: var(--accent);
          box-shadow: 0 0 0 1px rgba(8, 10, 12, 0.6);
          will-change: transform;
        }

        .rw-compare-handle::after {
          content: "";
          position: absolute;
          top: 50%;
          left: 50%;
          width: 44px;
          height: 44px;
          border: 1px solid rgba(8, 10, 12, 0.28);
          border-radius: 8px;
          background: var(--accent);
          transform: translate(-50%, -50%);
        }

        .rw-build {
          background: var(--dark);
          color: var(--paper);
        }

        .rw-build-grid {
          display: grid;
          grid-template-columns: minmax(320px, 0.78fr) minmax(0, 1.22fr);
          gap: clamp(36px, 7vw, 108px);
          align-items: start;
        }

        .rw-build-rail {
          position: sticky;
          top: 108px;
          min-height: calc(100dvh - 140px);
        }

        .rw-build-visual {
          position: relative;
          min-height: 440px;
          margin-top: 42px;
          overflow: hidden;
          border: 1px solid var(--line-dark);
          border-radius: 8px;
          background: #111513;
        }

        .rw-build-visual-card {
          position: absolute;
          inset: 0;
          display: grid;
          place-items: center;
          padding: 34px;
          opacity: 0;
          transform: translateY(22px) scale(0.98);
          transition:
            opacity 420ms ease,
            transform 420ms ease;
        }

        .rw-build-visual-card.is-active {
          opacity: 1;
          transform: translateY(0) scale(1);
        }

        .rw-build-visual-card img {
          width: min(100%, 440px);
          height: auto;
        }

        .rw-build-steps {
          display: grid;
          gap: 18px;
          padding-top: 28px;
        }

        .rw-build-step {
          border: 1px solid rgba(245, 242, 236, 0.12);
          border-radius: 8px;
          background: rgba(245, 242, 236, 0.055);
          padding: clamp(24px, 4vw, 44px);
          opacity: 0.72;
          transition:
            opacity 260ms ease,
            border-color 260ms ease,
            background 260ms ease,
            transform 260ms ease;
        }

        .rw-build-step.is-active {
          border-color: rgba(185, 223, 114, 0.58);
          background: rgba(185, 223, 114, 0.09);
          opacity: 1;
          transform: translateX(-8px);
        }

        .rw-build-step span {
          display: inline-flex;
          margin-bottom: 18px;
          color: var(--accent);
          font-size: 0.9rem;
        }

        .rw-build-step h3 {
          margin: 0;
          font-size: clamp(1.7rem, 3vw, 3rem);
          line-height: 1;
          letter-spacing: 0;
        }

        .rw-build-step p {
          max-width: 700px;
          margin: 18px 0 0;
          color: rgba(245, 242, 236, 0.68);
          font-size: 1.02rem;
          line-height: 1.7;
        }

        .rw-services {
          background: #fffdf7;
        }

        .rw-services-head {
          display: flex;
          align-items: end;
          justify-content: space-between;
          gap: 34px;
          margin-bottom: 48px;
        }

        .rw-service-grid {
          display: grid;
          grid-template-columns: repeat(12, minmax(0, 1fr));
          grid-auto-flow: dense;
          gap: 12px;
        }

        .rw-service {
          min-height: 260px;
          border: 1px solid var(--line);
          border-radius: 8px;
          background: var(--paper);
          padding: clamp(22px, 3vw, 34px);
          transition:
            transform 240ms ease,
            border-color 240ms ease,
            background 240ms ease;
        }

        .rw-service:hover {
          border-color: rgba(16, 18, 15, 0.28);
          background: #f9f6ee;
          transform: translateY(-3px);
        }

        .rw-service svg {
          width: 26px;
          height: 26px;
          margin-bottom: 28px;
          color: #53672d;
        }

        .rw-performance {
          background: var(--paper);
        }

        .rw-performance-grid {
          display: grid;
          grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
          gap: clamp(34px, 6vw, 90px);
          align-items: center;
        }

        .rw-vitals-board {
          border: 1px solid var(--line);
          border-radius: 8px;
          overflow: hidden;
          background: #fffdf7;
        }

        .rw-vital-row {
          display: grid;
          grid-template-columns: 52px 1fr;
          gap: 18px;
          border-bottom: 1px solid var(--line);
          padding: 22px;
        }

        .rw-vital-row:last-child {
          border-bottom: 0;
        }

        .rw-vital-icon {
          display: grid;
          place-items: center;
          width: 42px;
          height: 42px;
          border: 1px solid rgba(83, 103, 45, 0.26);
          border-radius: 8px;
          background: rgba(185, 223, 114, 0.18);
          color: #405020;
        }

        .rw-vital-row p {
          margin: 0;
          color: var(--muted);
          line-height: 1.6;
        }

        .rw-offers {
          background: #fffdf7;
        }

        .rw-offer-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 12px;
          margin-top: 48px;
        }

        .rw-offer {
          display: grid;
          align-content: start;
          min-height: 420px;
          border: 1px solid var(--line);
          border-radius: 8px;
          background: var(--paper);
          padding: clamp(24px, 3vw, 38px);
        }

        .rw-offer ul {
          display: grid;
          gap: 13px;
          margin: 26px 0 0;
          padding: 0;
          list-style: none;
        }

        .rw-offer li {
          display: grid;
          grid-template-columns: 22px 1fr;
          gap: 10px;
          color: #30352f;
          line-height: 1.5;
        }

        .rw-offer li svg {
          margin-top: 2px;
          color: #53672d;
        }

        .rw-faq {
          background: var(--paper);
        }

        .rw-faq-grid {
          display: grid;
          grid-template-columns: minmax(280px, 0.75fr) minmax(0, 1.25fr);
          gap: clamp(36px, 7vw, 112px);
        }

        .rw-faq-list {
          display: grid;
          gap: 1px;
          border: 1px solid var(--line);
          border-radius: 8px;
          overflow: hidden;
          background: var(--line);
        }

        .rw-faq-item {
          background: #fffdf7;
          padding: clamp(22px, 3vw, 34px);
        }

        .rw-final {
          min-height: 78dvh;
          display: grid;
          align-items: center;
          background:
            linear-gradient(180deg, rgba(185, 223, 114, 0.08), transparent 44%),
            var(--dark);
          color: var(--paper);
        }

        .rw-final-panel {
          display: grid;
          grid-template-columns: minmax(0, 1fr) auto;
          gap: 34px;
          align-items: end;
          border-top: 1px solid var(--line-dark);
          border-bottom: 1px solid var(--line-dark);
          padding: clamp(42px, 7vw, 86px) 0;
        }

        .rw-mobile-cta {
          position: fixed;
          right: 14px;
          bottom: 14px;
          z-index: 30;
          display: none;
          border-radius: 8px;
          background: var(--accent);
          color: #11150f;
          padding: 12px 14px;
          font-size: 0.9rem;
          font-weight: 650;
          text-decoration: none;
          touch-action: manipulation;
          -webkit-tap-highlight-color: rgba(185, 223, 114, 0.28);
          box-shadow: 0 12px 34px rgba(8, 10, 12, 0.22);
        }

        @media (max-width: 1099px) {
          .rw-hero-layout,
          .rw-split,
          .rw-comparison-grid,
          .rw-build-grid,
          .rw-performance-grid,
          .rw-faq-grid,
          .rw-final-panel {
            grid-template-columns: 1fr;
          }

          .rw-hero {
            min-height: auto;
          }

          .rw-hero-pin {
            min-height: auto;
            padding-top: 108px;
          }

          .rw-portal-wrap {
            min-height: auto;
          }

          .rw-portal-shell {
            margin: 24px 0 0;
          }

          .rw-hero-reveal {
            position: relative;
            left: auto;
            bottom: auto;
            margin-top: 28px;
          }

          .rw-build-rail {
            position: relative;
            top: auto;
            min-height: auto;
          }

          .rw-service-grid,
          .rw-offer-grid {
            grid-template-columns: 1fr;
          }

          .rw-service {
            grid-column: auto !important;
          }
        }

        @media (max-width: 760px) {
          .rw-section {
            padding: 72px 18px;
          }

          .rw-heading,
          .rw-hero-copy h1 {
            font-size: clamp(2.2rem, 10vw, 2.85rem);
            line-height: 1;
          }

          .rw-title-chunk {
            display: block;
          }

          .rw-hero-word {
            display: none;
          }

          .rw-product-body,
          .rw-before-grid,
          .rw-after-grid,
          .rw-vital-row {
            grid-template-columns: 1fr;
          }

          .rw-product-frame {
            min-height: 420px;
          }

          .rw-product-top {
            gap: 14px;
          }

          .rw-comparison-window {
            display: grid;
            gap: 12px;
            min-height: auto;
            border: 0;
            background: transparent;
          }

          .rw-compare-panel,
          .rw-after-inner {
            position: relative;
            inset: auto;
            height: auto;
          }

          .rw-compare-panel {
            min-height: 500px;
            border: 1px solid var(--line-dark);
            border-radius: 8px;
          }

          .rw-compare-handle {
            display: none;
          }

          .rw-offer {
            min-height: auto;
          }

          .rw-mobile-cta {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            right: 14px;
            left: 14px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .rw-page *,
          .rw-page *::before,
          .rw-page *::after {
            animation-duration: 0.001ms !important;
            animation-iteration-count: 1 !important;
            scroll-behavior: auto !important;
            transition-duration: 0.001ms !important;
          }

          .rw-portal-shell,
          .rw-after-shell,
          .rw-after-inner,
          .rw-build-step,
          .rw-build-visual-card {
            transform: none !important;
          }
        }
    `}</style>
  )
}
